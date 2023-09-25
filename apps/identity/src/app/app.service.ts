import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
	constructor(private readonly configuration: ConfigService) {
		console.log('AppService', this.configuration.get('SERVER_PORT'));
	}
	getData(): { message: string } {
		return { message: 'Hello API' };
	}
}
