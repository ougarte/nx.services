/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';

async function bootstrap() {
	try {
		const app = await NestFactory.create(AppModule);
		const globalPrefix = 'api';
		app.setGlobalPrefix(globalPrefix);



		// const configService = app.get(ConfigService);

		// await ConfigModule.envVariablesLoaded;

		const port = process.env.SERVER_PORT || 3000;
		console.log('SERVER_PORT', process.env.SERVER_PORT); // configService.get('SERVER_PORT')
		await app.listen(port);
		Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
	} catch (error) {
		console.log(error);
	}
}

bootstrap();
