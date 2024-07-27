import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { BaseEntity } from '@entities/base.entity';
import { BaseDto } from '@dtos/base.dto';

@Injectable()
export class BaseMapper extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}

	override get profile() {
		return (mapper) => {
			createMap(
				mapper,
				BaseEntity,
				BaseDto,
				forMember(dto => dto.id, mapFrom((entity) => {
					return entity.id;
				})),
				forMember(dto => dto.uuid, mapFrom((entity) => entity.uuid))
			);
			createMap(
				mapper,
				BaseDto,
				BaseEntity,
				forMember(dto => dto.id, mapFrom((entity) => {
					return entity.id;
				})),
				forMember(dto => dto.uuid, mapFrom((entity) => entity.uuid))
			)
		};
	}
}
