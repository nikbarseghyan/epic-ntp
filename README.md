<p align="center">
   EPIC-NTP

  [![Node](https://img.shields.io/badge/node--lts-v16.15.1-brightgreen)]()
  [![PG](https://img.shields.io/badge/pg-v8.4.0-blue)]()
  [![Testing](https://img.shields.io/badge/Total%20tests-2-blue)]()
</p>

## Installation and Running

```sh
$ npm install
$ npm run start:dev
##
# Run docker-compose
$ docker-compose up -d
##
```

## Project structure

## Postman Request

```sh
# ::1:3022 or localhost:3022
# Need Bearer token
> curl -X GET ::1:3022/token
# Bearer eyJhbGciOiJUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJ0bmFtZSI6IlNlbGVuYSIsImxhc3ROYW1lIjoiU2VsZW5hIiwiaWF0IjoxNjU1NjY0ODQ4LCJleHAiOjE2NTU2Njg0NDh9.BhGXzcqILxK5iI-KAin84eRAbYfxnFOD8JsgGalfReE

> curl -X GET ::1:3022/users
> curl -X GET ::1:3022/users/{id}
> curl -X POST ::1:3022/users
# Request Body
  {
      "firstName": "Vanessa",
      "lastName": 'Jonson',
      "age": 22
  }

> curl -X PUT ::1:3022/users/{id}
  {
      "firstName": "Vanessa",
      "lastName": 'Jonson',
      "age": 22
  }
> curl -X DELETE ::1:3022/users/{id}
```

## Authentication

<h4>
  This applications uses JSON Web Token (JWT) to handle authentication.
  The JWT authentication middleware handles the validation and authentication of the token.
</h4>

## Swagger API docs

```
  http://localhost:3022/api-docs/#/
```
