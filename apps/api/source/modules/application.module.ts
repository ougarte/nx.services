import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AutomapperModule as AutoMapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { Rest } from '@modules/rest.module';
import { Database } from '@modules/database.module';
import { MapperModule } from '@modules/mapper.module';
import { IsUniqueConstraint } from '@validators/is.unique';

import { server, api, database } from '../settings';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
			load: [server, api, database],
		}),
		AutoMapperModule.forRoot({
			strategyInitializer: classes(),
		}),
		Database,
		Rest,
		MapperModule,
	],
	providers: [IsUniqueConstraint]
})
export class ApplicationModule {
	private readonly logger: Logger = new Logger(ApplicationModule.name);

	constructor() {
		this.logger.log('Initialing module');
	}
}
