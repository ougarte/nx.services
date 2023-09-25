import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { DataSource } from 'typeorm';
import { UserEntity } from '@entities/user.entity';

@Module({
	imports: [TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: async (config: ConfigService) => {
			const settings = config.get('database');

			return {
				type: settings.type,
				host: settings.host,
				port: settings.port,
				username: settings.username,
				password: settings.password,
				database: settings.name,
				authSource: settings.auth,
				// TODO: Moves to configuration as "**/*.entity.ts"
				entities: [UserEntity],
				logging: true,
				synchronize: true,
				useNewUrlParser: true,
			};
		},
		// dataSourceFactory: async (options) => {
		// 	let dataSource = new DataSource(options);
		// 	dataSource = await dataSource.initialize();
		// 	return dataSource;
		// },
	})]
})
export class Database {
	private readonly logger: Logger = new Logger(Database.name);

	constructor() {
		this.logger.log('Initialing module');
	}
}
