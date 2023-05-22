import { Module } from '@nestjs/common';
import { DataService } from "@services/data.service";
import { UserService } from "@services/user.service";
import { Repository } from '@repositories/repository';
import { UserRepository } from '@repositories/user.repository';
import { Entities } from '@modules/entity.module';

const repositories = [Repository, UserRepository];
const services = [DataService, UserService];

@Module({
	imports: [Entities],
	providers: [
		...repositories,
		...services,
	],
	exports: [UserService, DataService],
})
export class StoreModule { }
