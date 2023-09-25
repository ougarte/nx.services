import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntity } from '@entities/user.entity';
import { UserDTO } from '@dtos/user.dto';
import { BaseQueryHandler, GetBaseQuery, GetByIdBaseQuery } from './query';

export class GetUserQuery extends GetBaseQuery<UserEntity> { }
export class GetUserByIdQuery extends GetByIdBaseQuery { }

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler extends BaseQueryHandler implements IQueryHandler<GetUserQuery> {
	async execute(query?: GetUserQuery): Promise<UserDTO[]> {
		const entities = await this.service.users.read(query);
		const items = this.mapper.mapArray(entities, UserEntity, UserDTO);

		return items;
	}
}

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler extends BaseQueryHandler implements IQueryHandler<GetUserByIdQuery> {
	async execute(query: GetUserByIdQuery): Promise<UserDTO> {
		const entity = await this.service.users.readById(query.id);
		const item = this.mapper.map(entity, UserEntity, UserDTO);

		if (!item) {
			throw new NotFoundException(`Unable to find 'User' ${query.id}`);
		}

		return item
	}
}
