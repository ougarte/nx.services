import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper, } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { UserEntity } from '@entities/user.entity';
import { UserDTO } from '@dtos/user.dto';

@Injectable()
export class UserMapper extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}

	override get profile() {
		return (mapper) => {
			createMap(mapper, UserEntity, UserDTO);
			createMap(mapper, UserDTO, UserEntity);
		};
	}
}
