import { PartialType } from '@nestjs/swagger';
import { BaseEntity } from '@entities/base.entity';

export class BaseDto extends PartialType(BaseEntity) { }
