import { Entity, Column } from 'typeorm';
import { IsInt, IsString, IsEmail, Min } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '@entities/base.entity';
import { IsUnique } from '@validators/is.unique';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {

	@Column({ type: 'string' })
	@IsString()
	@IsUnique()
	@AutoMap()
	username!: string;

	@Column({ type: 'string' })
	@IsEmail()
	@IsUnique()
	@AutoMap()
	email!: string;

	@Column({ type: 'string' })
	@IsString()
	@AutoMap()
	firstName?: string = 'default first name';

	@Column({ type: 'string' })
	@IsString()
	@AutoMap()
	lastName?: string = 'default last name';

	@Column({ type: 'number' })
	@Min(0)
	@IsInt()
	@AutoMap()
	age?: number = 0;
}
