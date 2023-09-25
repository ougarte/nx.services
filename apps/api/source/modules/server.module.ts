import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import {
	INestApplication,
	NestApplicationOptions,
	VersioningType,
	NestInterceptor,
	// ExceptionFilter,
	PipeTransform,
	DynamicModule,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { defaults, union } from 'lodash';
import { useContainer } from 'class-validator';
import { IExtension, IExceptionFilter } from '@interfaces/extension';
import { ConfigType } from '../settings';

/**
 *
 */
export interface IServerSettings extends NestApplicationOptions {
	port?: number;
	path?: string;
	version?: number;
}

export interface IServerProperties {
	name?: string;
	module?: DynamicModule;
	settings?: IServerSettings;
	extensions?: IExtension[];
	interceptors?: NestInterceptor[];
	filters?: IExceptionFilter[];
	pipes?: PipeTransform[];
}

/**
 *
 */
export interface IServer {
	initialize(): Promise<INestApplication>;
	toString(): Promise<string>;
}

/**
 *
 */
export class Server implements IServer {
	private readonly name: string;
	private readonly module: DynamicModule;
	private readonly extensions: IExtension[] = [];
	private readonly interceptors: NestInterceptor[] = [];
	private readonly filters: IExceptionFilter[] = [];
	private readonly pipes: PipeTransform[] = [];
	private instance: INestApplication;
	private settings: IServerSettings;

	/**
	 *
	 * @param parameters
	 */
	constructor(parameters: IServerProperties) {
		const {
			name,
			module,
			settings,
			extensions,
			interceptors,
			filters,
			pipes,
		} = parameters;

		this.name = name;
		this.module = module;
		this.settings = settings || {};

		// TODO: Validates uniqueness of each instance.
		this.extensions = union(this.extensions, extensions);
		this.interceptors = union(this.interceptors, interceptors);
		this.filters = union(this.filters, filters);
		this.pipes = union(this.pipes, pipes);
	}

	/**
	 *
	 * @returns
	 */
	async initialize(): Promise<INestApplication> {
		this.instance = await NestFactory.create(this.module, this.settings);

		const { httpAdapter } = this.instance.get(HttpAdapterHost);

		await this.updateSettings();

		this.enableAPI();

		// INFO: Enable interceptors
		this.instance.useGlobalInterceptors(...this.interceptors);

		// INFO: Enable filters
		const filters = this.filters.map(async (filter) => {
			await filter.setup(httpAdapter);

			return filter;
		});
		const operations = await Promise.allSettled(filters);
		const results = operations
			.filter((operation) => operation.status === 'fulfilled')
			.map((operation: any) => operation.value);
		this.instance.useGlobalFilters(...results);

		// INFO: Enable pipes
		this.instance.useGlobalPipes(...this.pipes);

		// INFO: Enable extensions
		const loaders = this.extensions.map((extension) => {
			return extension.setup(this.instance);
		});

		// TODO: Moves to extensions implementation
		useContainer(this.instance.select(this.module), { fallbackOnErrors: true });

		// TODO: Support handle exception(s)
		await Promise.all(loaders);
		await this.instance.listen(this.settings.port);

		return this.instance;
	}

	async toString(): Promise<string> {
		return JSON.stringify({ name: this.name, port: this.settings.port });
	}

	private async updateSettings() {
		const service = await this.instance.get(ConfigService);
		const server = service.get(ConfigType.Server);
		const api = service.get(ConfigType.Api);

		this.settings = defaults(this.settings, { ...server, ...api });
	}

	private enableAPI() {
		if (this.settings.path) {
			this.instance.setGlobalPrefix(this.settings.path);
		}

		if (this.settings.version) {
			this.instance.enableVersioning({
				defaultVersion: `${this.settings.version}`,
				type: VersioningType.URI,
			});
		}
	}
}
