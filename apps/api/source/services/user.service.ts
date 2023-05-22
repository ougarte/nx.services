import { Injectable } from '@nestjs/common';
import { defaultsDeep, omit } from 'lodash';
import { UserEntity } from '@entities/user.entity';
import { Repository } from '@repositories/repository';
import { IQueryProperties } from '@interfaces/types';
import { toOrder, toWhere } from '@helpers/mongo';

/**
 *
 */
@Injectable()
export class UserService {
	private repository: Repository;

	/**
	 *
	 * @param repository
	 */
	constructor(repository: Repository) {
		this.repository = repository;
	}

	/**
	 *
	 * @param query
	 * @returns
	 */
	public async read(query?: IQueryProperties<UserEntity>): Promise<UserEntity[]> {
		const { pagination, sort, filter } = query || {};
		const report = filter && filter['report'];
		const options = {
			skip: pagination.offset,
			take: pagination.limit,
			where: toWhere(omit(filter, 'report')),
			order: toOrder<UserEntity>(sort),
		};

		const results = report
			? await this.repository.users.findByReport(report, options)
			: await this.repository.users.find(options);

		return results;
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	public async readById(id: string): Promise<UserEntity> {
		const result = await this.repository.users.findById(id);

		return result;
	}

	/**
	 *
	 * @param model
	 * @returns
	 */
	public async create(model: UserEntity): Promise<UserEntity> {
		const result = await this.repository.users.create(model);

		return result;
	}

	public async update(model: UserEntity): Promise<UserEntity> {
		const instance = await this.repository.users.findById(model.uuid);

		if (!instance) throw new Error(`Invalid Entity. Unable to find entityId: ${model.uuid}`);
		if (instance.deletedAt) throw new Error(`Invalid Entity. Unable to update a deleted entityId: ${model.uuid}`);

		const updated = defaultsDeep(model, instance);

		const result = await this.repository.users.update(updated);

		return result;
	}

	/**
	 *
	 * @param model
	 * @returns
	 */
	public async remove(model?: UserEntity): Promise<UserEntity> {
		const result = await this.repository.users.remove(model);

		return result;
	}
}
