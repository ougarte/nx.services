import { PartialType, IntersectionType } from '@nestjs/swagger';
import { UserEntity } from '@entities/user.entity';
import { BaseDto } from '@dtos/base.dto';

/**
 *
 */
export class UserDTO extends UserEntity { }

/**
 *
 */
export class CreateUserDTO extends IntersectionType(BaseDto, UserDTO) { }

/**
 *
 */
export class UpdateUserDTO extends IntersectionType(BaseDto, UserDTO) { }

/**
 *
 */
export class PartialUpdateUserDTO extends PartialType(IntersectionType(BaseDto, UserDTO)) { }

/**
 *
 */
export class DeleteUserDTO extends IntersectionType(BaseDto, UserDTO) { }
