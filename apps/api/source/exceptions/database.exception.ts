import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
// import { HttpAdapterHost } from '@nestjs/core';
import { QueryFailedError, MongoServerError } from 'typeorm';

@Catch(MongoServerError)
export class DatabaseException implements ExceptionFilter {
	// constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	catch(exception: any, host: ArgumentsHost) {
		console.log('DatabaseException::catch', exception);
		// const { httpAdapter } = this.httpAdapterHost;
		// const context = host.switchToHttp();
		// const response = context.getResponse<Response>();
		// const request = context.getRequest<Request>();
		// const status = exception.getStatus();

		// console.log('DatabaseException::catch');

		// console.log(JSON.stringify(exception));

		// const httpStatus =
    //   exception instanceof HttpException
    //     ? exception.getStatus()
    //     : HttpStatus.INTERNAL_SERVER_ERROR;

		// const responseBody = {
    //   statusCode: httpStatus,
    //   timestamp: new Date().toISOString(),
    //   path: httpAdapter.getRequestUrl(context.getRequest()),
    // };

		// httpAdapter.reply(context.getResponse(), responseBody, httpStatus);
	}
}

// @Catch(QueryFailedError)
// export class DatabaseException implements ExceptionFilter {
// 	catch(exception: QueryFailedError, host: ArgumentsHost) {
// 		console.log('DatabaseException::catch');

// 		console.log(JSON.stringify(exception));
// 	}
// }

export default [
	new DatabaseException(),
];
