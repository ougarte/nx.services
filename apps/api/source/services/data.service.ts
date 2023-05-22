import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';

export abstract class IDataService {
	//
}

@Injectable()
export class DataService implements IDataService {
	readonly users: UserService;

	constructor(users: UserService) {
		this.users = users;
	}
}
