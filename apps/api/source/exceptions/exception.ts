import {
	Catch,
	ArgumentsHost,
	ExceptionFilter,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { IExceptionFilter } from '@interfaces/extension';

export class Exception extends Error {
	message: string;

	constructor(message: string) {
		super(message);

		this.message = message;
	}
}

@Catch()
export class ExceptionsFilter implements IExceptionFilter {
	private adapter: AbstractHttpAdapter

	// constructor(httpAdapterHost: HttpAdapterHost) {
	// 	this.httpAdapterHost = httpAdapterHost;
	// }

	async setup(adapter: AbstractHttpAdapter): Promise<void> {
		this.adapter = adapter;
	}

	catch(exception: unknown, host: ArgumentsHost): void {
		const context = host.switchToHttp();
		const responseBody = {
			statusCode: '400',
			timestamp: new Date().toISOString(),
			path: this.adapter.getRequestUrl(context.getRequest()),
		};

		this.adapter.reply(context.getResponse(), responseBody, 400);
	}
}
