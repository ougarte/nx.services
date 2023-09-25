
// TODO: Implements a generic get-query for each entity
import { QueryHandler } from '@nestjs/cqrs';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { SortDirection } from '@interfaces/enums';
import { DataService } from '@services/data.service';
import { QueryDto } from '@dtos/query.dto';
import { IQueryProperties, IPaginationProperties } from '@interfaces/types';

export abstract class GetBaseQuery<TEntity> implements IQueryProperties<TEntity> {
	readonly pagination?: IPaginationProperties;
	readonly filter?: Record<keyof TEntity, unknown>;
	readonly sort?: Record<keyof TEntity, SortDirection> | Record<keyof TEntity, SortDirection>[];

	constructor(properties?: QueryDto<TEntity>) {
		this.pagination = properties?.pagination;
		this.filter = properties?.filter;
		this.sort = properties?.sort;
	}
}

export abstract class GetByIdBaseQuery {
	readonly id: string;

	constructor(id: string) {
		this.id = id;
	}
}

@QueryHandler({})
export abstract class BaseQueryHandler {
	protected readonly service: DataService;
	protected readonly mapper: Mapper;

	constructor(service: DataService, @InjectMapper() mapper: Mapper) {
		this.service = service;
		this.mapper = mapper;
	}
}
