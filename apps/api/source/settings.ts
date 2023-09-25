import { registerAs } from '@nestjs/config'

export enum ConfigType {
	Server = 'server',
	Api = 'api',
	Database = 'database'
}

export const server = registerAs(ConfigType.Server, () => ({
	port: parseInt(process.env.SERVER_PORT),
	logger: process.env.SERVER_LOGGER,
}));

export const api = registerAs(ConfigType.Api, () => ({
	path: process.env.API_PATH,
	version: parseInt(process.env.API_VERSION),
}));

export const database = registerAs(ConfigType.Database, () => ({
	type: process.env.DATABASE_TYPE,
	host: process.env.DATABASE_HOST,
	port: parseInt(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	auth: process.env.DATABASE_AUTH,
	name: process.env.DATABASE_NAME,
	loggerLevel: 'debug',
}));
