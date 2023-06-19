<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">IoT REST API</p>

## Description

This project implements a REST API that provides functionalities for registering, editing, deleting, and retrieving users, devices, and the ownership relationships between them.

## Installation

To install the dependencies required for the project, which utilizes Node.js, NestJS, and TypeORM, you can use the following command:

```bash
yarn install
```

## Enviroment

The project employs an environment file to configure various settings. Please create a file named .env and populate it with the following information, ensuring to fill in the necessary values as required.

```bash
PASSPHRASE=PALAVRASCRETA
JWT_TOKEN=JWTTOKEN
DB_NAME=db
DB_HOST=localhost
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
```

## Initializing the Data Bank

The project employs Docker as a containerization platform. To initiate the container, please execute the following command:

```bash
yarn start:db
```

## Running the app

To initiate the application, you can execute the subsequent commands:

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

## License

Nest is [MIT licensed](LICENSE).
