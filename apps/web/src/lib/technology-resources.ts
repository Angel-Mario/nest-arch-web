export interface TechnologyResource {
  name: string;
  website: string;
  documentation: string;
  repository?: string;
}

const resource = (
  name: string,
  website: string,
  documentation: string,
  repository?: string
): TechnologyResource => ({ documentation, name, repository, website });

export const technologyResources = {
  api: [
    resource(
      "REST / NestJS Controllers",
      "https://nestjs.com",
      "https://docs.nestjs.com/controllers",
      "https://github.com/nestjs/nest"
    ),
    resource(
      "GraphQL",
      "https://graphql.org",
      "https://graphql.org/learn",
      "https://github.com/graphql/graphql-js"
    ),
    resource(
      "tRPC",
      "https://trpc.io",
      "https://trpc.io/docs",
      "https://github.com/trpc/trpc"
    ),
    resource(
      "Express",
      "https://expressjs.com",
      "https://expressjs.com/en/guide/routing.html",
      "https://github.com/expressjs/express"
    ),
    resource(
      "Fastify",
      "https://fastify.dev",
      "https://fastify.dev/docs/latest",
      "https://github.com/fastify/fastify"
    ),
  ],
  auth: [
    resource(
      "Passport",
      "https://www.passportjs.org",
      "https://www.passportjs.org/concepts/authentication",
      "https://github.com/jaredhanson/passport"
    ),
    resource(
      "Better Auth",
      "https://www.better-auth.com",
      "https://www.better-auth.com/docs",
      "https://github.com/better-auth/better-auth"
    ),
  ],
  database: [
    resource(
      "MongoDB",
      "https://www.mongodb.com",
      "https://www.mongodb.com/docs",
      "https://github.com/mongodb/mongo"
    ),
    resource(
      "PostgreSQL",
      "https://www.postgresql.org",
      "https://www.postgresql.org/docs",
      "https://github.com/postgres/postgres"
    ),
    resource(
      "MySQL",
      "https://www.mysql.com",
      "https://dev.mysql.com/doc",
      "https://github.com/mysql/mysql-server"
    ),
    resource(
      "SQL Server",
      "https://www.microsoft.com/en-us/sql-server",
      "https://learn.microsoft.com/en-us/sql/sql-server"
    ),
    resource(
      "SQLite",
      "https://sqlite.org",
      "https://sqlite.org/docs.html",
      "https://github.com/sqlite/sqlite"
    ),
    resource(
      "better-sqlite3",
      "https://github.com/WiseLibs/better-sqlite3",
      "https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md",
      "https://github.com/WiseLibs/better-sqlite3"
    ),
    resource(
      "Prisma",
      "https://www.prisma.io",
      "https://www.prisma.io/docs",
      "https://github.com/prisma/prisma"
    ),
    resource(
      "TypeORM",
      "https://typeorm.io",
      "https://typeorm.io/docs/getting-started",
      "https://github.com/typeorm/typeorm"
    ),
    resource(
      "Drizzle ORM",
      "https://orm.drizzle.team",
      "https://orm.drizzle.team/docs/overview",
      "https://github.com/drizzle-team/drizzle-orm"
    ),
  ],
  foundation: [
    resource(
      "NestJS",
      "https://nestjs.com",
      "https://docs.nestjs.com",
      "https://github.com/nestjs/nest"
    ),
    resource(
      "NestJS Microservices / API Gateway",
      "https://nestjs.com",
      "https://docs.nestjs.com/microservices/basics",
      "https://github.com/nestjs/nest"
    ),
    resource(
      "Turborepo",
      "https://turborepo.com",
      "https://turborepo.com/docs",
      "https://github.com/vercel/turborepo"
    ),
    resource(
      "TypeScript / TypeScript 7",
      "https://www.typescriptlang.org",
      "https://www.typescriptlang.org/docs",
      "https://github.com/microsoft/typescript-go"
    ),
    resource(
      "Node.js",
      "https://nodejs.org",
      "https://nodejs.org/en/docs",
      "https://github.com/nodejs/node"
    ),
  ],
  messaging: [
    resource(
      "Redis",
      "https://redis.io",
      "https://redis.io/docs/latest",
      "https://github.com/redis/redis"
    ),
    resource("MQTT", "https://mqtt.org", "https://mqtt.org/mqtt-specification"),
    resource(
      "MQTT.js",
      "https://github.com/mqttjs/MQTT.js",
      "https://github.com/mqttjs/MQTT.js#readme",
      "https://github.com/mqttjs/MQTT.js"
    ),
    resource(
      "NATS",
      "https://nats.io",
      "https://docs.nats.io",
      "https://github.com/nats-io/nats-server"
    ),
    resource(
      "RabbitMQ",
      "https://www.rabbitmq.com",
      "https://www.rabbitmq.com/docs",
      "https://github.com/rabbitmq/rabbitmq-server"
    ),
    resource(
      "Apache Kafka",
      "https://kafka.apache.org",
      "https://kafka.apache.org/documentation",
      "https://github.com/apache/kafka"
    ),
    resource(
      "gRPC",
      "https://grpc.io",
      "https://grpc.io/docs/languages/node",
      "https://github.com/grpc/grpc-node"
    ),
  ],
  packages: [
    resource(
      "pnpm",
      "https://pnpm.io",
      "https://pnpm.io/motivation",
      "https://github.com/pnpm/pnpm"
    ),
    resource(
      "npm",
      "https://www.npmjs.com",
      "https://docs.npmjs.com",
      "https://github.com/npm/cli"
    ),
    resource(
      "Yarn",
      "https://yarnpkg.com",
      "https://yarnpkg.com/getting-started",
      "https://github.com/yarnpkg/berry"
    ),
    resource(
      "Bun",
      "https://bun.sh",
      "https://bun.sh/docs",
      "https://github.com/oven-sh/bun"
    ),
    resource(
      "Docker",
      "https://www.docker.com",
      "https://docs.docker.com",
      "https://github.com/docker/cli"
    ),
    resource(
      "Git",
      "https://git-scm.com",
      "https://git-scm.com/doc",
      "https://github.com/git/git"
    ),
    resource(
      "Shared Packages / NestJS Libraries",
      "https://nestjs.com",
      "https://docs.nestjs.com/cli/libraries",
      "https://github.com/nestjs/nest"
    ),
    resource(
      "Todo Example / NestJS CRUD",
      "https://nestjs.com",
      "https://docs.nestjs.com/recipes/crud-generator",
      "https://github.com/nestjs/nest"
    ),
  ],
  tooling: [
    resource(
      "Biome",
      "https://biomejs.dev",
      "https://biomejs.dev/guides/getting-started",
      "https://github.com/biomejs/biome"
    ),
    resource(
      "ESLint",
      "https://eslint.org",
      "https://eslint.org/docs/latest",
      "https://github.com/eslint/eslint"
    ),
    resource(
      "Prettier",
      "https://prettier.io",
      "https://prettier.io/docs",
      "https://github.com/prettier/prettier"
    ),
    resource(
      "Oxlint",
      "https://oxc.rs",
      "https://oxc.rs/docs/guide/usage/linter",
      "https://github.com/oxc-project/oxc"
    ),
    resource(
      "Oxfmt",
      "https://oxc.rs",
      "https://oxc.rs/docs/guide/usage/formatter",
      "https://github.com/oxc-project/oxc"
    ),
    resource(
      "Ultracite",
      "https://www.ultracite.ai",
      "https://www.ultracite.ai/docs",
      "https://github.com/haydenbleasel/ultracite"
    ),
    resource(
      "Husky",
      "https://typicode.github.io/husky",
      "https://typicode.github.io/husky/get-started.html",
      "https://github.com/typicode/husky"
    ),
    resource(
      "Zod",
      "https://zod.dev",
      "https://zod.dev/basics",
      "https://github.com/colinhacks/zod"
    ),
    resource(
      "nestjs-zod",
      "https://github.com/BenLorantfy/nestjs-zod",
      "https://github.com/BenLorantfy/nestjs-zod#readme",
      "https://github.com/BenLorantfy/nestjs-zod"
    ),
    resource(
      "Scalar",
      "https://scalar.com",
      "https://scalar.com/products/api-references",
      "https://github.com/scalar/scalar"
    ),
    resource(
      "Swagger / NestJS OpenAPI",
      "https://swagger.io",
      "https://docs.nestjs.com/openapi/introduction",
      "https://github.com/nestjs/swagger"
    ),
    resource(
      "Health Check / Terminus",
      "https://nestjs.com",
      "https://docs.nestjs.com/recipes/terminus",
      "https://github.com/nestjs/terminus"
    ),
    resource(
      "Rate Limiting / Throttler",
      "https://nestjs.com",
      "https://docs.nestjs.com/security/rate-limiting",
      "https://github.com/nestjs/throttler"
    ),
    resource(
      "Agent Skills",
      "https://agentskills.io",
      "https://agentskills.io/specification",
      "https://github.com/agentskills/agentskills"
    ),
  ],
} satisfies Record<string, TechnologyResource[]>;
