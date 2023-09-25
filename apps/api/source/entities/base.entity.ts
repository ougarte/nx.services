import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	BeforeInsert,
	ObjectIdColumn,
	VersionColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator'
import { AutoMap } from '@automapper/classes';
import { v4 as uuid } from 'uuid'

@Entity()
export class BaseEntity {
	// TODO: `mongodb` driver does not support 'uuid'. So that using 'ObjectIdColumn' only for `mongodb`.
	@ObjectIdColumn({ name: '_id' })
	@IsNotEmpty()
	// @AutoMap({ type: () => HackObjectId }) // TODO: Unable to map MongoDB ObjectId easy. `class HackObjectId { }`
	id: string;

	@Column()
	@IsNotEmpty()
	@AutoMap()
	uuid: string;

	@CreateDateColumn()
	@IsDate()
	@IsNotEmpty()
	@AutoMap()
	readonly createdAt!: Date

	@UpdateDateColumn()
	@IsDate()
	@IsNotEmpty()
	@AutoMap()
	updatedAt!: Date

	@DeleteDateColumn()
	@IsOptional()
	@IsDate()
	@AutoMap()
	deletedAt?: Date

	// TODO: Not working on 'mongodb'
	@VersionColumn()
	@AutoMap()
	version: number

	@BeforeInsert()
	async beforeInsert() {
		this.uuid = uuid();
	}

	constructor() {
		console.log('BaseEntity')
		this.id = `${new ObjectId()}`;
		this.uuid = uuid();
		this.createdAt = new Date();
		this.updatedAt = new Date();
		console.log('BaseEntity', JSON.stringify(this, null , 2))
	}
}
