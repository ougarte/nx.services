import { ApiResponseProperty } from "@nestjs/swagger";
import { IQueryProperties } from '@interfaces/types';

export class SuccessResponseDto<TResult> {
	total: number;
	limit: number;
	offset: number;
}

export class ExceptionResponseDto {
	message: string;
	statusCode: number;
	errors: Error[]
}

export class PageDto<TEntity> {
	@ApiResponseProperty()
	readonly data: TEntity[];

	@ApiResponseProperty()
	readonly total: number;

	@ApiResponseProperty()
	readonly limit: number;

	@ApiResponseProperty()
	readonly offset: number;

	constructor(data: TEntity[], query: IQueryProperties<TEntity>) {
		this.data = data;
		this.total = data.length;
		this.limit = query.pagination.limit;
		this.offset = query.pagination.offset;
	}
}
