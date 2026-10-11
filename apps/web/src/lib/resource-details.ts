import type { Locale } from "@/lib/i18n";

interface ResourceDetails {
  icon: string;
  description: Record<Locale, string>;
}

const detail = (
  icon: string,
  en: string,
  es: string,
  pt: string
): ResourceDetails => ({ description: { en, es, pt }, icon });

export const resourceDetails: Record<string, ResourceDetails> = {
  "Agent Skills": detail(
    "agent-skills",
    "Reusable instructions and resources for coding agents.",
    "Instrucciones y recursos reutilizables para agentes de programación.",
    "Instruções e recursos reutilizáveis para agentes de programação."
  ),
  "Apache Kafka": detail(
    "kafka",
    "Distributed event streaming platform.",
    "Plataforma distribuida de transmisión de eventos.",
    "Plataforma distribuída de streaming de eventos."
  ),
  "Better Auth": detail(
    "better-auth",
    "Authentication library for sessions, accounts and identity providers.",
    "Biblioteca de autenticación para sesiones, cuentas y proveedores de identidad.",
    "Biblioteca de autenticação para sessões, contas e provedores de identidade."
  ),
  Biome: detail(
    "biome",
    "Integrated formatter and linter for web projects.",
    "Formateador y linter integrados para proyectos web.",
    "Formatador e linter integrados para projetos web."
  ),
  Bun: detail(
    "bun",
    "JavaScript runtime with a package manager, bundler and test runner.",
    "Entorno JavaScript con gestor de paquetes, bundler y ejecutor de pruebas.",
    "Ambiente JavaScript com gerenciador de pacotes, bundler e executor de testes."
  ),
  Docker: detail(
    "docker",
    "Containers for packaging applications and their services.",
    "Contenedores para empaquetar aplicaciones y sus servicios.",
    "Contêineres para empacotar aplicações e seus serviços."
  ),
  "Drizzle ORM": detail(
    "drizzle",
    "TypeScript ORM with queries close to SQL.",
    "ORM de TypeScript con consultas cercanas a SQL.",
    "ORM TypeScript com consultas próximas de SQL."
  ),
  ESLint: detail(
    "/icons/technologies/eslint.svg",
    "Configurable static analysis for JavaScript and TypeScript.",
    "Análisis estático configurable para JavaScript y TypeScript.",
    "Análise estática configurável para JavaScript e TypeScript."
  ),
  Express: detail(
    "express",
    "Minimal web framework for HTTP servers and middleware.",
    "Framework web minimalista para servidores HTTP y middleware.",
    "Framework web minimalista para servidores HTTP e middleware."
  ),
  Fastify: detail(
    "fastify",
    "Web framework with a plugin system and schema validation.",
    "Framework web con sistema de plugins y validación de esquemas.",
    "Framework web com sistema de plugins e validação de esquemas."
  ),
  Git: detail(
    "/icons/git.svg",
    "Distributed version control for tracking source code changes.",
    "Control de versiones distribuido para registrar cambios del código.",
    "Controle de versões distribuído para registrar alterações no código."
  ),
  GraphQL: detail(
    "graphql",
    "Query language for APIs with a typed schema.",
    "Lenguaje de consultas para APIs con un esquema tipado.",
    "Linguagem de consultas para APIs com um esquema tipado."
  ),
  "Health Check / Terminus": detail(
    "/icons/nestjs.svg",
    "Health endpoints for checking application dependencies.",
    "Endpoints de salud para comprobar las dependencias de la aplicación.",
    "Endpoints de saúde para verificar as dependências da aplicação."
  ),
  Husky: detail(
    "husky",
    "Git hooks for automating tasks before commits and pushes.",
    "Hooks de Git para automatizar tareas antes de commits y pushes.",
    "Hooks Git para automatizar tarefas antes de commits e pushes."
  ),
  MQTT: detail(
    "mqtt",
    "Lightweight publish/subscribe messaging protocol.",
    "Protocolo ligero de mensajería basado en publicación y suscripción.",
    "Protocolo leve de mensagens baseado em publicação e assinatura."
  ),
  "MQTT.js": detail(
    "mqtt",
    "MQTT client for Node.js and browser applications.",
    "Cliente MQTT para aplicaciones Node.js y navegador.",
    "Cliente MQTT para aplicações Node.js e navegador."
  ),
  MongoDB: detail(
    "mongodb",
    "Document database that stores flexible BSON records.",
    "Base de datos documental que almacena registros BSON flexibles.",
    "Banco de dados documental que armazena registros BSON flexíveis."
  ),
  MySQL: detail(
    "mysql",
    "Relational database for applications that use SQL.",
    "Base de datos relacional para aplicaciones que utilizan SQL.",
    "Banco de dados relacional para aplicações que utilizam SQL."
  ),
  NATS: detail(
    "nats",
    "Messaging system for communication between distributed services.",
    "Sistema de mensajería para comunicar servicios distribuidos.",
    "Sistema de mensagens para comunicação entre serviços distribuídos."
  ),
  NestJS: detail(
    "/icons/nestjs.svg",
    "Framework for modular server applications with TypeScript.",
    "Framework para aplicaciones de servidor modulares con TypeScript.",
    "Framework para aplicações de servidor modulares com TypeScript."
  ),
  "NestJS Microservices / API Gateway": detail(
    "/icons/nestjs.svg",
    "Messaging and gateway patterns for distributed NestJS services.",
    "Mensajería y patrones de gateway para servicios distribuidos con NestJS.",
    "Mensageria e padrões de gateway para serviços distribuídos com NestJS."
  ),
  "Node.js": detail(
    "/icons/nodejs.svg",
    "Runtime for running JavaScript outside the browser.",
    "Entorno de ejecución de JavaScript fuera del navegador.",
    "Ambiente de execução JavaScript fora do navegador."
  ),
  Oxfmt: detail(
    "oxlint-oxfmt",
    "Code formatter from the Oxc toolchain.",
    "Formateador de código del conjunto de herramientas Oxc.",
    "Formatador de código do conjunto de ferramentas Oxc."
  ),
  Oxlint: detail(
    "oxlint-oxfmt",
    "JavaScript and TypeScript linter built in Rust.",
    "Linter de JavaScript y TypeScript desarrollado en Rust.",
    "Linter JavaScript e TypeScript desenvolvido em Rust."
  ),
  Passport: detail(
    "passport",
    "Authentication middleware with interchangeable strategies.",
    "Middleware de autenticación con estrategias intercambiables.",
    "Middleware de autenticação com estratégias intercambiáveis."
  ),
  PostgreSQL: detail(
    "postgresql",
    "Relational database with SQL and extensible data types.",
    "Base de datos relacional con SQL y tipos de datos extensibles.",
    "Banco de dados relacional com SQL e tipos de dados extensíveis."
  ),
  Prettier: detail(
    "/icons/technologies/prettier.svg",
    "Automatic code formatter with consistent output.",
    "Formateador automático que mantiene un estilo de código uniforme.",
    "Formatador automático que mantém um estilo de código uniforme."
  ),
  Prisma: detail(
    "prisma",
    "ORM with a generated client, schema modeling and migrations.",
    "ORM con cliente generado, modelado de esquemas y migraciones.",
    "ORM com cliente gerado, modelagem de esquemas e migrações."
  ),
  "REST / NestJS Controllers": detail(
    "/icons/nestjs.svg",
    "HTTP endpoints organized into NestJS controllers.",
    "Endpoints HTTP organizados en controladores de NestJS.",
    "Endpoints HTTP organizados em controladores NestJS."
  ),
  RabbitMQ: detail(
    "rabbitmq",
    "Message broker with queues and flexible routing.",
    "Broker de mensajes con colas y enrutamiento flexible.",
    "Broker de mensagens com filas e roteamento flexível."
  ),
  "Rate Limiting / Throttler": detail(
    "/icons/nestjs.svg",
    "Request limits to control how often clients access an API.",
    "Límites de solicitudes para controlar la frecuencia de acceso a una API.",
    "Limites de requisições para controlar a frequência de acesso a uma API."
  ),
  Redis: detail(
    "redis",
    "In-memory data store used for caching and pub/sub messaging.",
    "Almacén de datos en memoria para caché y mensajería pub/sub.",
    "Armazenamento de dados em memória para cache e mensagens pub/sub."
  ),
  "SQL Server": detail(
    "sqlserver",
    "Microsoft's relational database platform with T-SQL.",
    "Plataforma de bases de datos relacionales de Microsoft con T-SQL.",
    "Plataforma de bancos de dados relacionais da Microsoft com T-SQL."
  ),
  SQLite: detail(
    "sqlite",
    "Embedded SQL database stored in a local file.",
    "Base de datos SQL embebida que se guarda en un archivo local.",
    "Banco de dados SQL embarcado armazenado em um arquivo local."
  ),
  Scalar: detail(
    "scalar-ui",
    "Interactive API references generated from OpenAPI specifications.",
    "Documentación interactiva de APIs a partir de especificaciones OpenAPI.",
    "Documentação interativa de APIs a partir de especificações OpenAPI."
  ),
  "Shared Packages / NestJS Libraries": detail(
    "/icons/nestjs.svg",
    "Reusable modules and code shared between project applications.",
    "Módulos y código reutilizables entre las aplicaciones del proyecto.",
    "Módulos e código reutilizáveis entre as aplicações do projeto."
  ),
  "Swagger / NestJS OpenAPI": detail(
    "swagger",
    "OpenAPI documentation generated from NestJS endpoints.",
    "Documentación OpenAPI generada a partir de endpoints de NestJS.",
    "Documentação OpenAPI gerada a partir de endpoints NestJS."
  ),
  "Todo Example / NestJS CRUD": detail(
    "/icons/nestjs.svg",
    "Example resource with create, read, update and delete operations.",
    "Recurso de ejemplo con operaciones de creación, lectura, actualización y eliminación.",
    "Recurso de exemplo com operações de criação, leitura, atualização e exclusão."
  ),
  Turborepo: detail(
    "monorepo",
    "Build orchestration and caching for JavaScript monorepos.",
    "Orquestación de compilaciones y caché para monorepos de JavaScript.",
    "Orquestração de builds e cache para monorepos JavaScript."
  ),
  TypeORM: detail(
    "typeorm",
    "ORM that maps TypeScript entities to database records.",
    "ORM que relaciona entidades TypeScript con registros de la base de datos.",
    "ORM que mapeia entidades TypeScript para registros do banco de dados."
  ),
  "TypeScript / TypeScript 7": detail(
    "typescript-7",
    "JavaScript with static types and a native compiler in development.",
    "JavaScript con tipos estáticos y un compilador nativo en desarrollo.",
    "JavaScript com tipos estáticos e um compilador nativo em desenvolvimento."
  ),
  Ultracite: detail(
    "ultracite",
    "Shared linting and formatting presets for consistent code standards.",
    "Presets de lint y formato para mantener estándares de código uniformes.",
    "Presets de lint e formatação para manter padrões de código uniformes."
  ),
  Yarn: detail(
    "yarn",
    "Package manager with workspace and dependency management tools.",
    "Gestor de paquetes con herramientas para workspaces y dependencias.",
    "Gerenciador de pacotes com ferramentas para workspaces e dependências."
  ),
  Zod: detail(
    "/icons/zod.svg",
    "Schema validation with inferred TypeScript types.",
    "Validación de esquemas con inferencia de tipos TypeScript.",
    "Validação de esquemas com inferência de tipos TypeScript."
  ),
  "better-sqlite3": detail(
    "sqlite",
    "Synchronous SQLite driver for Node.js.",
    "Driver de SQLite con API síncrona para Node.js.",
    "Driver SQLite com API síncrona para Node.js."
  ),
  gRPC: detail(
    "grpc",
    "Remote procedure calls with Protocol Buffers and HTTP/2.",
    "Llamadas a procedimientos remotos con Protocol Buffers y HTTP/2.",
    "Chamadas de procedimentos remotos com Protocol Buffers e HTTP/2."
  ),
  "nestjs-zod": detail(
    "nestjs-zod",
    "Zod integration for NestJS validation, DTOs and serialization.",
    "Integración de Zod en NestJS para validación, DTOs y serialización.",
    "Integração Zod no NestJS para validação, DTOs e serialização."
  ),
  npm: detail(
    "npm",
    "Package manager and registry for JavaScript dependencies.",
    "Gestor de paquetes y registro de dependencias JavaScript.",
    "Gerenciador de pacotes e registro de dependências JavaScript."
  ),
  pnpm: detail(
    "pnpm",
    "Package manager with shared dependency storage and workspace support.",
    "Gestor de paquetes con almacenamiento compartido y soporte de workspaces.",
    "Gerenciador de pacotes com armazenamento compartilhado e suporte a workspaces."
  ),
  tRPC: detail(
    "trpc",
    "Type-safe communication between TypeScript clients and servers.",
    "Comunicación con tipos seguros entre clientes y servidores TypeScript.",
    "Comunicação com tipos seguros entre clientes e servidores TypeScript."
  ),
};
