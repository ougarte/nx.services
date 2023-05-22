import { Module } from '@nestjs/common';

import { UserMapper } from '@mappers/user.mapper';
import { BaseMapper } from '@mappers/base.mapper';

@Module({
	imports: [],
	exports: [],
	providers: [BaseMapper, UserMapper],
})
export class MapperModule { }
