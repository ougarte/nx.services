import { Injectable, Scope, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions, SwaggerCustomOptions } from '@nestjs/swagger';
import _ from 'lodash';
import { IExtension } from '@interfaces/extension';
import { SuccessResponseDto, ExceptionResponseDto } from '@dtos/response.dto';

export interface SwaggerSettings extends SwaggerCustomOptions, SwaggerDocumentOptions {
	path?: string;
	title?: string;
	description?: string;
	version?: string;
	tag?: string;
}

@Injectable({ scope: Scope.TRANSIENT })
export class Swagger implements IExtension {
	private settings: SwaggerSettings;
	private get defaults(): SwaggerSettings {
		return {
			path: 'api/ui',
			title: '[REST API] Alpha Service',
			description: 'The Alpha Service API',
			version: '1',
			tag: 'alpha',
			extraModels: [SuccessResponseDto, ExceptionResponseDto],
		}
	}

	/**
	 *
	 * @param settings
	 */
	constructor(settings?: SwaggerSettings) {
		// TODO: Merge values
		this.settings = _.defaults(settings, this.defaults);
	}

	/**
	 *
	 * @param application
	 * @returns
	 */
	public setup(application: INestApplication): Promise<INestApplication> {
		if (!application) {
			// TODO: Throw an error
			console.warn('unable to setup swagger documentation');
			return;
		}

		const config = new DocumentBuilder()
			.setTitle(this.settings.title)
			.setDescription(this.settings.description)
			.setVersion(this.settings.version)
			.addTag(this.settings.tag)
			.build();
		const express: SwaggerCustomOptions = {
			explorer: true,
		};
		const options: SwaggerDocumentOptions = {
			extraModels: this.settings.extraModels,
		}

		const document = SwaggerModule.createDocument(application, config, options);

		// TODO! export JSON to ./assets/openapi.json
		console.log(JSON.stringify(document));

		SwaggerModule.setup(this.settings.path, application, document, express);

		return Promise.resolve(application);
	}
}
