import { INestApplication, ExceptionFilter } from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';

export interface IInterceptor {

}

export interface IExceptionFilter extends ExceptionFilter {
	setup?(adapter: AbstractHttpAdapter): Promise<void>
}

export interface IExtension {
	setup(application: INestApplication): Promise<void | INestApplication>;
}

/**
 *
 */
export interface IApplicationExtension {
	interceptors?: IInterceptor[],
	filters?: IExceptionFilter[],
	setup(application: INestApplication): Promise<void | INestApplication>;
}
