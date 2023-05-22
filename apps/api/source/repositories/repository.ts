import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class Repository {
	readonly users: UserRepository;

	constructor(users: UserRepository) {
		this.users = users;
	}
}
