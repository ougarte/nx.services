import { ValidationPipe } from '@nestjs/common';
import { Server, IServer, IServerSettings } from '@modules/server.module';
import { Swagger } from '@modules/swagger.module';
import { ApplicationModule } from '@modules/application.module';
import { ResponseInterceptor } from '@interceptors/response.interceptor';
// import DatabaseFilters, { DatabaseException } from '@exceptions/database.exception';
import { ValidationException, ValidationExceptionFilter } from '@exceptions/validation.exception';
import { ExceptionsFilter } from '@exceptions/exception';
import { ParseQueryPipe } from '@pipes/request.pipe';
import '@helpers/polyfills';

/**
 * Self running `bootstrap` function
 */
(async function bootstrap() {
	try {
		// TODO: Move this configuration to Environment Variables ex: `options`
		const settings: IServerSettings = { abortOnError: true };
		const server: IServer = new Server({
			name: 'API Service',
			module: ApplicationModule as any,
			extensions: [new Swagger()],
			interceptors: [new ResponseInterceptor()],
			filters: [new ExceptionsFilter(), new ValidationExceptionFilter()],
			pipes: [new ValidationPipe({
				transform: true,
				exceptionFactory: (errors) => new ValidationException({ errors }),
			}), new ParseQueryPipe()],
			settings: settings,
		});

		await server.initialize();

		console.log('Server Running...', await server.toString());
	} catch (error: unknown) {
		console.log('GENERIC ERROR', error);
	}
})();
