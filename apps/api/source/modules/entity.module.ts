import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@entities/user.entity';

const entities = [
	UserEntity,
];

@Module({
	imports: [TypeOrmModule.forFeature(entities)],
	exports: [TypeOrmModule],
})
export class Entities { }
