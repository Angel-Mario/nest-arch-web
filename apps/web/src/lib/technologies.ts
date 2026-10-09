import type { CSSProperties } from "react";

interface Technology {
  icon: string;
  darkIcon?: string;
  color: string;
}

const asset = (name: string) => `/icons/technologies/${name}.svg`;

export const technologies: Record<string, Technology> = {
  "amazon-q-cli": { color: "#A855F7", icon: asset("amazon-q") },
  "better-auth": {
    color: "#9B8AFB",
    darkIcon: asset("better-auth_dark"),
    icon: asset("better-auth_light"),
  },
  "better-auth:stateless": {
    color: "#9B8AFB",
    darkIcon: asset("better-auth_dark"),
    icon: asset("better-auth_light"),
  },
  biome: { color: "#60A5FA", icon: "/icons/biomejs.svg" },
  bun: { color: "#C5A57E", icon: asset("bun") },
  claude: { color: "#D97757", icon: asset("claude-ai-icon") },
  cursor: {
    color: "#929292",
    darkIcon: asset("cursor_dark"),
    icon: asset("cursor_light"),
  },
  docker: { color: "#2496ED", icon: "/icons/docker.svg" },
  drizzle: {
    color: "#8FAE38",
    darkIcon: asset("drizzle-orm_dark"),
    icon: asset("drizzle-orm_light"),
  },
  "eslint-prettier-no-stylelint": { color: "#8C78E8", icon: asset("eslint") },
  express: {
    color: "#909090",
    darkIcon: asset("expressjs_dark"),
    icon: asset("expressjs"),
  },
  fastify: {
    color: "#909090",
    darkIcon: asset("fastify_dark"),
    icon: asset("fastify"),
  },
  gemini: { color: "#8E75E5", icon: asset("gemini") },
  graphql: { color: "#E10098", icon: asset("graphql") },
  grpc: { color: "#2B9A9B", icon: asset("grpc") },
  kafka: {
    color: "#AB85DB",
    darkIcon: asset("apache-kafka-dark"),
    icon: asset("apache-kafka-light"),
  },
  mongodb: {
    color: "#47A248",
    darkIcon: asset("mongodb-icon-dark"),
    icon: asset("mongodb-icon-light"),
  },
  monorepo: {
    color: "#EF4444",
    darkIcon: "/icons/turborepo-icon-dark.svg",
    icon: "/icons/turborepo-icon-light.svg",
  },
  mqtt: { color: "#A660B5", icon: asset("mqtt") },
  mysql: {
    color: "#E48E00",
    darkIcon: asset("mysql-icon-dark"),
    icon: asset("mysql-icon-light"),
  },
  nats: { color: "#27AAE1", icon: asset("natsdotio") },
  "nest-api": { color: "#E0234E", icon: "/icons/nestjs.svg" },
  "nest-microservice": { color: "#E0234E", icon: "/icons/nestjs.svg" },
  "nestjs-zod": { color: "#3E67B1", icon: "/icons/zod.svg" },
  npm: { color: "#CB3837", icon: asset("npm") },
  "oxlint-oxfmt": { color: "#D9A04D", icon: asset("oxc") },
  passport: { color: "#34B27A", icon: asset("passport") },
  pnpm: { color: "#F69220", icon: asset("pnpm") },
  postgresql: { color: "#336791", icon: "/icons/postgresql.svg" },
  prisma: {
    color: "#5A67D8",
    darkIcon: "/icons/prisma_dark.svg",
    icon: "/icons/prisma.svg",
  },
  rabbitmq: { color: "#FF6600", icon: asset("rabbitmq") },
  redis: { color: "#FF4438", icon: asset("redis") },
  replit: { color: "#F26207", icon: asset("replit") },
  "scalar-ui": { color: "#B18CF1", icon: asset("scalar") },
  single: { color: "#E0234E", icon: "/icons/nestjs.svg" },
  sqlite: { color: "#149FDB", icon: asset("sqlite") },
  sqlserver: { color: "#CC2927", icon: asset("sql-server") },
  swagger: { color: "#69A930", icon: asset("swagger") },
  trpc: { color: "#398CCB", icon: asset("trpc") },
  typeorm: { color: "#EF4423", icon: asset("typeorm") },
  "typescript-7": { color: "#3178C6", icon: "/icons/typescript.svg" },
  ultracite: {
    color: "#9B8AFB",
    darkIcon: asset("ultracite-dark"),
    icon: asset("ultracite-light"),
  },
  windsurf: {
    color: "#2EB89F",
    darkIcon: asset("windsurf-dark"),
    icon: asset("windsurf-light"),
  },
  yarn: { color: "#2C8EBB", icon: asset("yarn") },
  zed: {
    color: "#70A5FC",
    darkIcon: asset("zed-logo_dark"),
    icon: asset("zed-logo"),
  },
};

interface TechnologyStyle extends CSSProperties {
  "--technology-color": string;
}

export const technologyStyle = (value: string): TechnologyStyle => ({
  "--technology-color": technologies[value]?.color ?? "var(--primary)",
});
