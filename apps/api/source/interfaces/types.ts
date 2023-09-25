import { SortDirection } from '@interfaces/enums';

export interface IPaginationProperties {
	readonly limit: number;
	readonly offset: number;
}

export interface ISortProperties {
	readonly field: string;
	readonly direction: SortDirection;
}

export interface IQueryProperties<TEntity> {
	readonly pagination?: IPaginationProperties;
	readonly filter?: Record<keyof TEntity, unknown>;
	readonly sort?: Record<keyof TEntity, SortDirection> | Record<keyof TEntity, SortDirection>[];
}
