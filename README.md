<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>

</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NestJS RESTful API + Postgres + Docker + Kubernetes

## Description

This is a project that dockerizes a simple Dogs and Trainers API service.

It also contains a Kubernetes configuration to deploy it with
2 app servers and an external Postgres master on NeonDB. All these
numbers are arbitrary and are defined for the sake of experimentation.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Requirements

If you wish to play with it without locally installing Postgres and
Node you can take advantage of `docker` and `docker-build` which
would help you build the container images and setup a working
environment for you:

- Docker: https://docs.docker.com/engine/installation/
- Docker Compose: https://docs.docker.com/compose/install/

If you want to try this out within a Kubernetes environment this is
all you need:

- Kubectl: https://kubernetes.io/docs/tasks/tools/install-kubectl/
- Minikube: https://kubernetes.io/docs/tasks/tools/install-minikube/

## Usage with Docker

Once `docker` is installed run `docker build -t Dockerfile`.

This will trigger the pulling and building of the necessary images and
will use `docker` to setup the app.

Once the Postgres container starts up (note that it may take a few
minutes until it starts accepting connections the first time) you can
run the database migrations with the `make migrate` command.

After everything is up and running you can start hitting the API
server via port `3000` like so:

    curl -X POST http://localhost:3000/api/trainers \
        -H 'Content-Type: application/json'


# Project structure

## API server files

Just the usual `package.js`and everything inside the
`migrations` and `api` directories.

## Docker files

The app server image has been split in two images: first is the
dependencies image defined in the `Dockerfile.dependencies` file which
only gets rebuilt whenever `package.json` is changed; the second is
the image for the app code itself which is defined in `Dockerfile.app`
which re-uses the dependencies image and starts the server.

## Kubernetes

All deployment YAML files live under the `k8s/` directory and are
named with a suffix matching the type they define.

The command `kubectl apply -f <filename>` applies all YAML deployment files through `kubectl`.

# API endpoints

all endpoints start with prefix `/api`

## List

    GET /trainers


    Returns a list of trainer objects

    [
        {
        "id": 1,
        "name": "Chuck",
        "age": 21,
        "role": "SERVICE_DOG_TRAINER",
        "createdAt": "2024-02-09T08:35:28.731Z",
        "updatedAt": "2024-02-09T08:35:28.731Z"
      }
    ]

## Create

    POST /trainer
    Content-Type: application/json

    {"name": "Guy Fierri", "age": 31, "role": "BEHAVIOR_SPECIALIST"}


    Returns the trainer object if created

    {
    "id": 8,
    "name": "Guy Fierri",
    "age": 31,
    "role": "BEHAVIOR_SPECIALIST",
    "createdAt": "2024-02-11T18:27:53.810Z",
    "updatedAt": "2024-02-11T18:27:53.810Z"
}

## Read

    GET /trainer/<id>


    Returns the trainer object if it exists (otherwise 404)

    {
    "id": 6,
    "name": "kion",
    "age": 25,
    "role": "SERVICE_DOG_TRAINER",
    "createdAt": "2024-02-09T08:41:09.609Z",
    "updatedAt": "2024-02-09T08:41:09.609Z"
}

## Update

    PUT /trainer/<id>
    Content-Type: application/json

    {"name": "Larry David"}


    Returns the updated trainer object if it exists (otherwise 404)

    {
    "id": 4,
    "name": "Larry David",
    "age": 22,
    "role": "BEHAVIOR_SPECIALIST",
    "createdAt": "2024-02-09T08:40:33.397Z",
    "updatedAt": "2024-02-11T18:32:22.039Z"
    }

## Delete

    DELETE /trainer/<slug>
    Content-Type: application/json


    Returns the deleted trainer object if it existed (otherwise 404)

    {
    "id": 4,
    "name": "Larry David",
    "age": 22,
    "role": "BEHAVIOR_SPECIALIST",
    "createdAt": "2024-02-09T08:40:33.397Z",
    "updatedAt": "2024-02-11T18:32:22.039Z"
    }

## License

Nest is [MIT licensed](LICENSE).
