import { Catch, ArgumentsHost, BadRequestException, ValidationPipe } from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import * as _ from 'lodash';
import { ValidationError } from 'class-validator';
import { IExceptionFilter } from '@interfaces/extension';
import { Exception } from "./exception";

interface Properties {
	message?: string,
	errors?: ValidationError[]
}

interface Reason {
	property: string;
	value: string;
	reason: string;
}

function toDefaults(properties: Properties): Required<Properties> {
	return _.defaults({}, properties, {
		message: 'Validation exception',
		errors: [],
	});
}

export class ValidationException extends Exception {
	private static readonly title: string = 'Validation exception';
	readonly reasons: Reason[];

	constructor(properties?: Properties) {
		super(ValidationException.title);

		const defaults = toDefaults(properties);

		this.message = defaults.message || this.message;
		this.reasons = defaults.errors.map((validation) => this.normalize(validation));
	}

	private normalize(error: ValidationError): Reason {
		const { value, property, constraints } = error;
		const reason = _.first(_.values(constraints));

		return { property, value, reason };
	}
}

@Catch(ValidationException)
export class ValidationExceptionFilter implements IExceptionFilter {
	async setup(host: AbstractHttpAdapter): Promise<void> {
		return;
	}

	catch(exception: ValidationException, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<any>();
		const request = context.getRequest<Request>();
		const httpException = new BadRequestException({
			type: 'ValidationException',
			message: exception.message,
			path: request.url,
			errors: exception.reasons,
		});
		const body = httpException.getResponse();

		response.status(httpException.getStatus()).json(body);
	}
}
