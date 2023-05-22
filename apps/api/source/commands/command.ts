import { CommandHandler } from '@nestjs/cqrs';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DataService } from '@services/data.service';
import { UUID } from 'crypto';

export class BaseCommand { }

export class BaseCreateCommand<TDto> {
	public dto?: TDto;

	constructor(dto?: TDto) {
		this.dto = dto;
	}
}

export class BaseUpdateCommand<TDto> {
	public readonly uuid: UUID;
	public readonly dto: TDto;

	constructor(uuid: UUID, dto?: TDto) {
		this.uuid = uuid;
		this.dto = dto;
	}
}

export class BasePartialUpdateCommand<TDto> {
	public dto?: TDto;

	constructor(dto?: TDto) {
		this.dto = dto;
	}
}

export class BaseDeleteCommand<TDto> {
	public id: string;
	public dto?: TDto;

	constructor(id: string) {
		this.id = id;
	}
}

export class BaseBulkCreateCommand<TDto> {
	public dto?: TDto[];

	constructor(dto?: TDto[]) {
		this.dto = dto;
	}
}

@CommandHandler({})
export abstract class BaseCommandHandler {
	protected readonly service: DataService;
	protected readonly mapper: Mapper;

	constructor(service: DataService, @InjectMapper() mapper: Mapper) {
		this.service = service;
		this.mapper = mapper;
	}
}
