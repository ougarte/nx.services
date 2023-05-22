import { Get, Post, Put, Patch, Delete, Param, Body, Query, Controller, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@decorators/api.response';
import { GetUserQuery, GetUserByIdQuery } from '@queries/users.query';
import { CreateUserCommand, UpdateUserCommand, PartialUpdateUserCommand, DeleteUserCommand } from '@commands/users.command';
import { PageDto } from '@dtos/response.dto';
import { UserDTO, CreateUserDTO, UpdateUserDTO, PartialUpdateUserDTO } from '@dtos/user.dto';
import { QueryDto } from '@dtos/query.dto';
import { BaseController } from '@controllers/base.controller';
import { UUID } from 'crypto';

@ApiTags('/users')
@Controller('users')
export class UsersController extends BaseController<UserDTO> {

	@Get()
	@ApiPaginatedResponse(UserDTO)
	public async get(@Query() parameters?: QueryDto<UserDTO>): Promise<PageDto<UserDTO>> {
		const query = new GetUserQuery(parameters);
		const result = await this.query.execute(query);

		return new PageDto(result, query);
	}

	@Get('/:uuid')
	@ApiOkResponse({ type: UserDTO })
	public async getById(@Param('uuid', new ParseUUIDPipe()) id: UUID): Promise<UserDTO> {
		const query = new GetUserByIdQuery(id);
		const result = await this.query.execute(query);

		return result;
	}

	@Put('/:uuid')
	@ApiOkResponse({ type: UserDTO })
	async put(@Param('uuid', new ParseUUIDPipe()) uuid: UUID, @Body() dto: UpdateUserDTO): Promise<UserDTO> {
		const command = new UpdateUserCommand(uuid, dto);
		const result = await this.command.execute(command);

		return result
	}

	@Patch('/:uuid')
	@ApiOkResponse({ type: UserDTO })
	async patch(@Param('uuid', new ParseUUIDPipe()) uuid: UUID, @Body() dto: PartialUpdateUserDTO): Promise<UserDTO> {
		const command = new PartialUpdateUserCommand(uuid, dto);
		const result = await this.command.execute(command);

		return result
	}

	@Delete('/:uuid')
	@ApiOkResponse({ type: UserDTO })
	public async delete(@Param('uuid', new ParseUUIDPipe()) uuid: UUID): Promise<UserDTO> {
		const command = new DeleteUserCommand(uuid);
		const result = await this.command.execute(command);

		return result;
	}

	@Post()
	@ApiOkResponse({ type: UserDTO })
	public async post(@Body() dto: CreateUserDTO): Promise<UserDTO> {
		const command = new CreateUserCommand(dto);
		const result = await this.command.execute(command);

		return result;
	}

	@Post('/bulk')
	@ApiBody({ type: [CreateUserDTO] })
	@ApiPaginatedResponse(UserDTO)
	async bulk(@Body() dtos: CreateUserDTO[]): Promise<UserDTO[]> {
		return [];
	}
}
