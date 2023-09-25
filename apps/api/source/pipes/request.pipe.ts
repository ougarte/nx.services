import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import toTyped from '@helpers/to.typed';
import { QueryDto } from '@dtos/query.dto';

@Injectable()
export class ParseQueryPipe implements PipeTransform {
	transform(value: unknown, metadata: ArgumentMetadata) {
		if (!(value instanceof QueryDto)) return value;

		const query = toTyped(value);

		return query;
	}
}
