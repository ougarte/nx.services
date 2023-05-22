import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, MongoRepository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { UserReportBuilder } from '@reports/user.report';
import { UserReport } from '@interfaces/enums';

@Injectable()
export class UserRepository {
	private repository: Repository<UserEntity>;

	/**
	 *
	 * @param repository
	 */
	constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
		this.repository = repository;
	}

	/**
	 *
	 * @param parameters
	 * @returns
	 */
	public async find(parameters?: FindManyOptions): Promise<UserEntity[]> {
		if (parameters?.take === 0) return [];

		const items = await this.repository.find(parameters);

		return items;
	}

	public async findByReport(report: UserReport, parameters?: FindManyOptions): Promise<UserEntity[]> {
		const repository = this.repository as MongoRepository<UserEntity>;
		const aggregate = UserReportBuilder.create(report, parameters);

		const cursor = await repository.aggregate(aggregate);

		const items = cursor.toArray();

		return items;
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	public async findById(id: string): Promise<UserEntity> {
		const item = await this.repository.findOneBy({ uuid: id } as any);

		return item;
	}

	/**
	 *
	 * @param model
	 * @returns
	 */
	public async create(model: UserEntity): Promise<UserEntity> {
		const entity = await this.repository.create(model);
		const instance = await this.repository.save(entity);

		return instance;
	}

	public async update(model: UserEntity): Promise<UserEntity> {
		// TODO: Force update because `@UpdateDateColumn` does not with `update()` method.
		await this.repository.save(model);

		// TODO: Force to call `findById` because `save` returns the previous changes.
		const instance = await this.findById(model.uuid);

		return instance;
	}

	public async remove(model?: UserEntity): Promise<UserEntity> {
		const instance = await this.findById(model.uuid);
		const result = await this.repository.softRemove(instance);

		return instance;
	}
}
