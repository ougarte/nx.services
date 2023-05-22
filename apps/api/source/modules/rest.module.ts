import { Module, Logger } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from '@controllers/users.controller';
import { GetUserQueryHandler, GetUserByIdQueryHandler } from '@queries/users.query';
import { CreateUserCommandHandler, UpdateUserCommandHandler, PartialUpdateUserCommandHandler, DeleteUserCommandHandler } from '@commands/users.command';
import { StoreModule } from '@modules/store.module';

@Module({
	imports: [
		CqrsModule,
		StoreModule,
	],
	controllers: [
		UsersController,
	],
	providers: [
		// endpoint: users
		GetUserQueryHandler,
		GetUserByIdQueryHandler,
		CreateUserCommandHandler,
		UpdateUserCommandHandler,
		PartialUpdateUserCommandHandler,
		DeleteUserCommandHandler,
	],
})
export class Rest {
	private readonly logger: Logger = new Logger(Rest.name);
	constructor() {
		this.logger.log('Initializing module')
	}
}
