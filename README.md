# Analytics

Example Application for consuming Magento Event Driven Analytics

## Prerequisites

- Docker
- NodeJS

## Server

- Typescript
- Express (REST API)
- Apollo Server (GraphQl)
- Redis for Session Storage
- Postgres
- TypeORM

## Client

- Apollo Client
- Cypress
- NextJS
- TailwindCSS
- GraphQL Code Generator
- React

## Installation

Server

```
cd server
yarn install
docker-compose up -d
cp .env.example .env
yarn dev
```

Client

```
cd client
yarn install
yarn dev
```
