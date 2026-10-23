# NestJS REST API

A property-listing REST API built with [NestJS](https://nestjs.com), TypeORM and PostgreSQL. It includes JWT authentication with refresh tokens, role-based access control and request validation.

## Features

- **Property CRUD** with pagination (`skip` / `limit`)
- **Users** with an owner relation to properties and "liked properties"
- **Authentication** via Passport: local (email + password) login, JWT access tokens and refresh tokens
- **Refresh token rotation**: refresh tokens are hashed with argon2, stored on the user, and revoked on sign-out
- **Global auth guard**: every route requires a valid access token unless it is marked `@Public()`
- **Role-based access control** with `@Roles()` and the roles `ADMIN`, `EDITOR` and `USER`
- **Validation** with `class-validator` (global `ValidationPipe` with whitelisting) and Zod
- **Database seeding** with `typeorm-extension` and Faker

## Tech stack

| Area        | Library                                   |
| ----------- | ----------------------------------------- |
| Framework   | NestJS 11                                 |
| Database    | PostgreSQL, TypeORM                       |
| Auth        | Passport (local, JWT), `@nestjs/jwt`      |
| Hashing     | bcrypt (passwords), argon2 (refresh tokens) |
| Validation  | class-validator, class-transformer, Zod   |
| Testing     | Jest, Supertest                           |

## Getting started

### Prerequisites

- Node.js 20+
- A running PostgreSQL instance

### Install

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
# Database
url=postgres://postgres:postgres@localhost:5432/nestjs_rest_api
PORT=5432

# App
APP_PORT=3000
NODE_ENV=development

# Access token
JWT_SECRET=change-me
JWT_EXPIRE_IN=15m

# Refresh token
REFRESH_JWT_SECRET=change-me-too
REFRESH_JWT_EXPIRE_IN=7d
```

| Variable                | Description                                                          |
| ----------------------- | -------------------------------------------------------------------- |
| `url`                   | PostgreSQL connection string                                         |
| `PORT`                  | PostgreSQL port                                                      |
| `APP_PORT`              | Port the API listens on (defaults to `3000`)                         |
| `NODE_ENV`              | `production` turns off TypeORM `synchronize`                         |
| `JWT_SECRET`            | Secret used to sign access tokens                                    |
| `JWT_EXPIRE_IN`         | Access token lifetime, e.g. `15m`                                    |
| `REFRESH_JWT_SECRET`    | Secret used to sign refresh tokens                                   |
| `REFRESH_JWT_EXPIRE_IN` | Refresh token lifetime, e.g. `7d`                                    |

In development, TypeORM `synchronize` is on, so the schema is created from the entities automatically.

### Run

```bash
# development
npm run start

# watch mode
npm run start:dev

# production
npm run build
npm run start:prod
```

### Seed the database

```bash
npm run seed
```

> **Warning:** seeding drops and recreates the schema before inserting fake users and properties. The seed script reads the database variables from the shell environment, not from `.env`.

## API

All routes require an `Authorization: Bearer <accessToken>` header unless marked **public**.

### Auth

| Method | Route           | Description                                                     |
| ------ | --------------- | --------------------------------------------------------------- |
| POST   | `/auth/login`   | **Public.** Log in with `{ "email", "password" }`. Returns `id`, `accessToken` and `refreshToken` |
| POST   | `/auth/refresh` | Send the **refresh token** as the bearer token. Returns a new token pair |
| POST   | `/auth/signout` | Revokes the stored refresh token                                |

### Users

| Method | Route           | Roles   | Description                  |
| ------ | --------------- | ------- | ---------------------------- |
| POST   | `/user`         | `USER`  | Create a user                |
| GET    | `/user/profile` | `USER`  | Get the current user         |
| PATCH  | `/user/:id`     | `USER`  | Update a user                |
| DELETE | `/user/:id`     | `ADMIN` | Delete a user                |

### Properties

| Method | Route           | Description                                      |
| ------ | --------------- | ------------------------------------------------ |
| GET    | `/property`     | List properties. Query: `?skip=0&limit=10`       |
| GET    | `/property/:id` | Get one property                                 |
| POST   | `/property`     | Create a property: `{ "name", "description", "price" }` |
| PATCH  | `/property/:id` | Update a property                                |
| DELETE | `/property/:id` | Delete a property                                |

### Example

```bash
# log in
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'

# call a protected route
curl http://localhost:3000/property \
  -H "Authorization: Bearer <accessToken>"
```

## Project structure

```
src/
├── auth/        # login, refresh, sign-out, guards, strategies, @Public() and @Roles()
├── user/        # user CRUD and profile
├── property/    # property CRUD, DTOs, custom pipes (ParseIdPipe, ZodValidationPipe)
├── entities/    # User, Property, PropertyFeature, PropertyType
├── config/      # database config (development and production)
├── seeding/     # factories and seeder
└── main.ts      # bootstrap and global ValidationPipe
```

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# coverage
npm run test:cov
```

## Scripts

| Script              | Description                     |
| ------------------- | ------------------------------- |
| `npm run start:dev` | Start in watch mode             |
| `npm run build`     | Compile to `dist/`              |
| `npm run lint`      | Lint and auto-fix               |
| `npm run format`    | Format with Prettier            |
| `npm run seed`      | Reset and seed the database     |

## License

UNLICENSED. This is a private practice project.
