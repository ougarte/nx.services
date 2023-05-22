import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller()
export abstract class BaseController<TEntity> {
	protected readonly query: QueryBus;
	protected readonly command: CommandBus;

	constructor(query: QueryBus, command: CommandBus) {
		this.query = query;
		this.command = command;
	}
}
