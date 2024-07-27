import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from "@nestjs/common";
import { map, Observable, throwError, catchError } from "rxjs";

interface IResponse<TEntity> {
	// on Success
	total?: number;
	limit?: number;
	offset?: number;

	// TODO: Gets circular dependency error at compile-time
	data?: TEntity[];

	// on Fail
	message?: string;
	statusCode?: number;
	errors?: Error[]
}

@Injectable()
export class ResponseInterceptor<TEntity> implements NestInterceptor {
	private readonly logger: Logger = new Logger(ResponseInterceptor.name);

	/**
	 * Intercepts any operation coming from a `Controller` instance
	 * @param {ExecutionContext} context refers to current context execution
	 * @param {CallHandler} next refers to next operation to be run
	 * @returns {Observable} operation
	 */
	intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse<TEntity>> {
		return next.handle()
			.pipe(map(response => response))
			.pipe(catchError((error) => {
				// console.log(JSON.stringify(error, null, 2));

				// const { name, errors, message, response } = error;
				// let exception;

				// this.logger.error(`Error instance of '${name}'`, JSON.stringify(error, null, 2));

				// switch (name) {
				// 	case 'TypeError':
				// 		exception = new HttpException({
				// 			code: HttpStatus.INTERNAL_SERVER_ERROR,
				// 			reason: message,
				// 		}, HttpStatus.INTERNAL_SERVER_ERROR);
				// 		break;
				// 	case 'MongoError':
				// 		exception = new HttpException({
				// 			code: HttpStatus.INTERNAL_SERVER_ERROR,
				// 			reason: message,
				// 		}, HttpStatus.INTERNAL_SERVER_ERROR);
				// 		break;
				// 	case 'ValidationError':
				// 		exception = new HttpException({
				// 			code: HttpStatus.BAD_REQUEST,
				// 			reason: message,
				// 			errors: errors,
				// 		}, HttpStatus.BAD_REQUEST);
				// 		break;
				// 	case 'BadRequestException':
				// 		console.log(response);
				// 		exception = new HttpException({
				// 			code: HttpStatus.BAD_REQUEST,
				// 			reason: message || response?.error,
				// 			errors: errors || response?.message,
				// 		}, HttpStatus.BAD_REQUEST);
				// 		break;
				// 	case 'NotFoundException':
				// 		exception = new HttpException({
				// 			code: HttpStatus.NOT_FOUND,
				// 			reason: response?.message || message,
				// 			errors: response?.error || errors,
				// 		}, HttpStatus.NOT_FOUND);
				// 		break;
				// 	default:
				// 		exception = new HttpException({
				// 			code: HttpStatus.INTERNAL_SERVER_ERROR,
				// 			reason: 'Something went wrong'
				// 		}, HttpStatus.INTERNAL_SERVER_ERROR);
				// 		break;
				// }

				return throwError(() => error);
			}));
	}
}
