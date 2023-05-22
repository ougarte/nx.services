import { Injectable } from '@nestjs/common';
import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
@ValidatorConstraint({ name: 'isUnique', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
	private readonly dataSource: DataSource;

	constructor(dataSource: DataSource) {
		this.dataSource = dataSource;
	}

	async validate(value: unknown, args: ValidationArguments) {
		if (args.targetName.endsWith('DTO')) return true;

		const query = {
			where: {
				[args.property]: value,
			},
		};
		const repository = this.dataSource.getRepository(args.targetName);
		const entity = await repository.findOne(query);

		return _.isEmpty(entity);
	}
}

export function IsUnique(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		const options = _.defaults({}, validationOptions, {
			message: `[${propertyName}] already exist`,
		});

		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: options,
			constraints: [],
			validator: IsUniqueConstraint,
		});
	};
}
