import { applyDecorators, Type } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';
import { SuccessResponseDto, ExceptionResponseDto, PageDto } from '@dtos/response.dto';

/**
 *
 * @param model
 * @returns
 */
function toSuccessSchema<TEntity extends Type<any>>(model: TEntity): unknown {
	return {
		title: `SuccessResponseOf${model.name}`,
		allOf: [
			{ $ref: getSchemaPath(SuccessResponseDto) },
			{
				properties: {
					results: {
						type: 'array',
						items: { $ref: getSchemaPath(model) },
					}
				}
			}
		]
	};
}

/**
 *
 * @param model
 * @returns
 */
function toExceptionSchema<TEntity extends Type<any>>(model: TEntity): unknown {
	return {
		title: `ErrorResponseOf${model.name}`,
		allOf: [
			{ $ref: getSchemaPath(ExceptionResponseDto) },
		]
	};
}

/**
 * Generates documentation on SwaggerUI response structure
 * @param {TEntity} model refers to dynamic entity definition
 * @returns
 */
export function ApiResponse<TEntity extends Type<any>>(model: TEntity) {
	const success = ApiOkResponse({ schema: toSuccessSchema(model) });
	const fail = ApiBadRequestResponse({ schema: toExceptionSchema(model) });

	return applyDecorators(success, fail);
}

export function ApiPaginatedResponse<TEntity extends Type<any>>(model: TEntity) {
	const success = ApiOkResponse({
		schema: {
			title: `SuccessResponse${model.name}`,
			allOf: [
				{
					$ref: getSchemaPath(PageDto<TEntity>),
				},
				{
					properties: {
						data: {
							type: 'array',
							items: {
								$ref: getSchemaPath(model),
							},
						}
					}
				}
			]
		}
	});
	const fail = ApiBadRequestResponse({ schema: toExceptionSchema(model) });

	return applyDecorators(ApiExtraModels(PageDto), success, fail);
}
