# [NestJS] Arcus Service

## NX Commands

```shell
npx nx run api:migrations name=initial
```

## Database

### Migrations

```json
// package.json
{
	"scripts": {
		"typeorm": "typeorm-ts-node-esm"
	}
}

// review apps/api/project.json
{
	"migrations": {
		"executor": "nx:run-commands",
		"options": {
			"cwd": "apps/api/",
			"commands": [
				"typeorm migration:generate -d source/migrations -n {args.name}"
			]
		},
		"configurations": {
			"generate": {}
		}
	}
}
```

```js
// /migrations/datasource.js
const path = require('path');
const { DataSource } = require("typeorm");

module.exports.DataSource = new DataSource({
	type: "mongodb",
	host: "localhost",
	port: 27017,
	username: "root",
	password: "secret",
	database: "api",
	authSource: 'admin',
	migrationsTableName: 'migrations',
	useUnifiedTopology: true,
	entities: [path.join(__dirname, '../entities/**/*.entity.ts')],
});
```

```shell
# command
npm run typeorm migration:generate -- ./apps/api/source/migrations/initialize -d ./apps/api/source/migrations/datasource.js;
```

## TODO(s)

- [X] Configuration
  - [X] Add Environment variables
  - [X] Integrate `'@nestjs/config'`
- [ ] REST API
  - [X] Add Swagger
  - [ ] Add Generic Response DTO
  - [ ] Add Generic Query DTO
  - [ ] Add Generic UrlParameters DTO
  - [ ] Add Error Handler
- [ ] Database
  - [X] Add TypeORM, and configure it to use mongo-db
  - [ ] Add Model(s)
  - [ ] Add migrations
    - [ ] Support only at CLI level. Typeorm required transpiled JS at all leves :(
  - [ ] Add validators
  - [ ] Add soft-delete
  - [ ] Add Error Handler
- [ ] Logger
- [ ] Authentication and Authorization
- [ ] Realtime
  - [ ] SignalR middleware
- [ ] Concurrency
  - [ ] Add
- [ ] Microservices
  - [ ] Integrate KeyClock (Auth)
  - [ ] Integrate RabbitMQ
  - [ ] Integrate Kafka
- [ ] Error Handling
  - [ ] Initializing Dynamic Modules
  - [ ] Unhandled Exceptions
- [ ] Deployment

```js
const message = alert('Hello, world!');
```
