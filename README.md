# Mono Repository

## Overview

This mono-repository is providing a some proof-of-concept exercises about NX and Nest technologies.

## Install dependency

```shell
npm install --save @nestjs/swagger
npm install --save class-validator # required
npm install --save class-transformer # Required
npm install --save @nestjs/cqrs # required
npm install --save @nestjs/typeorm typeorm
```

## Create a projest

```shell
# Create a service
npx nx g @nx/nest:app <name>

# Create a library
npx nx g @nx/nest:lib <name>
```

## Run a project

```shell
npx nx run <service>:<target>

```

## Development server

Run `nx serve CS Arcus` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## References

Visit the [Nx Documentation](https://nx.dev) to learn more.


## Known Issues

- [Unsupported Generics on NEST](https://github.com/nestjs/swagger/issues/191)
- TypeORM supports mongodb 3.7.1 ony. TODO: Create a wrapper ex: `typeorm/mongodb-plugin`


## Dev Notes

<application: api-service>
/source/<endpoint>/
REST (ENTITY-DTO)
- dto(s)
- controllers, queries, commands
- data-service
- guards, pipes, interceptors, exceptions
- multi-threading | multi-processing | concurrency | parallelism

<library: api-core>
BUSINESS-LOGIC (ENTITY)
- queries, commands
- entities
- repository-service
- error handlers
DATABASE (ENTITY-SCHEMA)
- migrations
- repositories
- error handlers


library: swagger
- responses | request | queries | parameters | generate documentation
library: open-api
- generate a client based on a Swagger Schema
library: database
- driver | wrapper
library: logger
- transports
