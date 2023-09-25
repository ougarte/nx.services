import { ApiPropertyOptional } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { defaults } from 'lodash';
import { IQueryProperties, IPaginationProperties } from '@interfaces/types';
import { SortDirection } from '@interfaces/enums';

export class PaginationDto implements IPaginationProperties {
	@ApiPropertyOptional({ name: 'pagination[limit]' })
	readonly limit: number = 20;

	@ApiPropertyOptional({ name: 'pagination[offset]' })
	readonly offset: number = 0;
}

export class QueryDto<IEntity> implements IQueryProperties<IEntity> {
	@ApiPropertyOptional({ type: () => PaginationDto, name: 'pagination' })
	@ValidateNested()
	readonly pagination?: PaginationDto;

	// TODO: There is not a way to generate documentation for dynamic Record<key, value>.
	@ApiPropertyOptional({ name: 'filter' })
	@ValidateNested()
	readonly filter?: Record<keyof IEntity, unknown>;

	// TODO: There is not a way to generate documentation for dynamic Record<key, value>.
	@ApiPropertyOptional({ name: 'sort' })
	@ValidateNested()
	readonly sort?: Record<keyof IEntity, SortDirection> | Record<keyof IEntity, SortDirection>[];

	constructor(properties?: IQueryProperties<IEntity>) {
		this.pagination = defaults(properties?.pagination, new PaginationDto());
	}
}
