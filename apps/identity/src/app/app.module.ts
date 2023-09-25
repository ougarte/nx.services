import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
			// envFilePath: '.env',
			// envFilePath: join(__dirname, `.env.${process.env.NX_TASK_TARGET_PROJECT}.${process.env.NX_TASK_TARGET_CONFIGURATION}`),
		}),
		// TypeOrmModule.forRoot({
		// 	retryAttempts: 1,
		// 	// url: 'mongodb://root:secret@localhost:27017',
		// 	type: 'mongodb',
		// 	// ssl: true,
		// 	host: 'localhost',
		// 	port: 27017,
		// 	username: 'root',
		// 	password: 'secret',
		// 	database: 'api',
		// 	authSource: 'admin',
		// 	entities: [],
		// 	logging: true,
		// 	useNewUrlParser: true,
		// 	// synchronize: true,
		// 	// authMechanism: 'SCRAM-SHA-1',
		// }),
	],
	// controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
