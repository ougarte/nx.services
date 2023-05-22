import { Logger, BadRequestException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { validate } from 'class-validator';
import { isEmpty } from 'lodash';
import { UserDTO, CreateUserDTO, UpdateUserDTO, PartialUpdateUserDTO, DeleteUserDTO } from '@dtos/user.dto';
import { UserEntity } from '@entities/user.entity';
import { ValidationException } from '@exceptions/validation.exception';
import { BaseCreateCommand, BaseDeleteCommand, BaseCommandHandler, BaseUpdateCommand } from './command';

// TODO: Support bulk create users
// TODO: Support update user

export class CreateUserCommand extends BaseCreateCommand<CreateUserDTO> { }
export class UpdateUserCommand extends BaseUpdateCommand<UpdateUserDTO> { }
export class PartialUpdateUserCommand extends BaseUpdateCommand<PartialUpdateUserDTO> { }
export class DeleteUserCommand extends BaseDeleteCommand<DeleteUserDTO> { }

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler extends BaseCommandHandler implements ICommandHandler<CreateUserCommand> {
	private readonly logger: Logger = new Logger(CreateUserCommandHandler.name);

	async execute(command?: CreateUserCommand): Promise<UserDTO> {
		this.logger.log(`Creating 'User' instance.`);

		const instance = this.mapper.map(command?.dto, UserDTO, UserEntity);

		const errors = await validate(instance);

		if (!isEmpty(errors)) {
			throw new ValidationException({ message: `Unable to create ${UserEntity.name}`, errors });
		}

		const entity = await this.service.users.create(instance);
		const dto = this.mapper.map(entity, UserEntity, UserDTO);

		return dto;
	}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler extends BaseCommandHandler implements ICommandHandler<UpdateUserCommand> {
	private readonly logger: Logger = new Logger(UpdateUserCommandHandler.name);

	async execute(command: UpdateUserCommand): Promise<UserDTO> {
		this.logger.log(`Updating 'User' instance.`, command);

		if (command.dto.uuid !== command.uuid) {
			throw new BadRequestException({
				message: 'Invalid `entity.uuid` and `parameter.uuid`'
			});
		}

		const instance = this.mapper.map(command?.dto, UserDTO, UserEntity);
		const entity = await this.service.users.update(instance);
		const dto = this.mapper.map(entity, UserEntity, UserDTO);

		return dto;
	}
}

@CommandHandler(PartialUpdateUserCommand)
export class PartialUpdateUserCommandHandler extends BaseCommandHandler implements ICommandHandler<PartialUpdateUserCommand> {
	private readonly logger: Logger = new Logger(PartialUpdateUserCommandHandler.name);

	async execute(command: PartialUpdateUserCommand): Promise<UserDTO> {
		this.logger.log(`Partial updating 'User' instance.`);

		const instance = this.mapper.map(command?.dto, UserDTO, UserEntity);

		instance.uuid = command.uuid;

		const entity = await this.service.users.update(instance);
		const dto = this.mapper.map(entity, UserEntity, UserDTO);

		return dto;
	}
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler extends BaseCommandHandler implements ICommandHandler<DeleteUserCommand> {
	async execute(command?: DeleteUserCommand): Promise<UserDTO> {
		const { id } = command;
		const entity = await this.service.users.remove({ uuid: id } as UserEntity);
		const dto = this.mapper.map(entity, UserEntity, UserDTO);

		return dto;
	}
}
