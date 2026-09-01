"use client";

import { cn } from "@nest-arch-web/ui/lib/utils";
import {
  Globe,
  Server,
  Layers,
  Database,
  Cpu,
  CheckCircle2,
  Terminal,
  ArrowRight,
} from "lucide-react";
import * as React from "react";

interface ArchitectureInteractiveProps {
  className?: string;
}

const CATEGORIES = [
  {
    desc: "Next.js, Vite & React frontends configured with SSR, Tailwind and type-safe APIs.",
    details: [
      "Next.js App Router or Vite React SPA",
      "Tailwind CSS v4 + shadcn/ui components",
      "TanStack Query & Convex/Trpc integrations",
      "Built-in Dark Mode & SEO optimization",
    ],
    icon: Globe,
    id: "web",
    label: "Web Applications",
  },
  {
    desc: "Event-driven NestJS microservices with gRPC, RabbitMQ, Kafka & Redis transport.",
    details: [
      "NestJS Microservices transport layer",
      "gRPC & Protocol Buffers pre-configured",
      "RabbitMQ / Kafka event publishing",
      "Health checks & Prometheus metrics",
    ],
    icon: Cpu,
    id: "microservices",
    label: "Microservices",
  },
  {
    desc: "Turborepo workspace setups with shared UI packages, configs & zero-config linting.",
    details: [
      "Turborepo task pipeline optimization",
      "Shared @ui, @config, and @env packages",
      "Ultracite zero-config linting & oxlint",
      "Fast cached builds & CI/CD workflows",
    ],
    icon: Layers,
    id: "monorepos",
    label: "Monorepos",
  },
  {
    desc: "Production-ready NestJS REST & GraphQL backend services with OpenAPI docs.",
    details: [
      "NestJS REST API + Swagger/OpenAPI",
      "Prisma / TypeORM / Drizzle ORM setup",
      "JWT & AuthGuard authentication",
      "Zod schema validation & pipe filters",
    ],
    icon: Server,
    id: "backend",
    label: "APIs & Backends",
  },
  {
    desc: "PostgreSQL, MongoDB, and Redis setups with Docker Compose environments.",
    details: [
      "Postgres / Mongo / Redis Docker Compose",
      "Automated migration & seeding scripts",
      "Connection pooling & caching layer",
      "Strict typed schema definitions",
    ],
    icon: Database,
    id: "database",
    label: "Databases & Storage",
  },
];

export const ArchitectureInteractive = ({
  className,
}: ArchitectureInteractiveProps) => {
  const [selectedId, setSelectedId] = React.useState("web");

  const selectedCategory =
    CATEGORIES.find((cat) => cat.id === selectedId) || CATEGORIES[0];

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/60 p-4 shadow-[0_0_50px_rgba(236,72,153,0.08)] backdrop-blur-xl sm:p-6 dark:bg-[#0d0e16]/80",
        className
      )}
    >
      <div className="grid items-center gap-6 lg:grid-cols-12">
        {/* Left Sidebar Menu */}
        <div className="flex flex-col gap-2 lg:col-span-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = cat.id === selectedId;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedId(cat.id)}
                type="button"
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all",
                  isSelected
                    ? "border border-red-500/40 bg-red-500/15 text-white shadow-[0_0_15px_rgba(239,68,68,0.18)]"
                    : "border border-transparent text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg border",
                    isSelected
                      ? "border-red-500/50 bg-red-500/20 text-red-300"
                      : "border-white/10 bg-white/5 text-zinc-400"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="flex-1 font-mono text-xs sm:text-sm">
                  {cat.label}
                </span>
                {isSelected && <ArrowRight className="h-4 w-4 text-red-400" />}
              </button>
            );
          })}
        </div>

        {/* Center Node Visual Diagram */}
        <div className="relative flex flex-col items-center justify-center px-2 py-6 lg:col-span-4">
          {/* Central Logo Node */}
          <div className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-2xl border border-red-500/40 bg-white/5 shadow-[0_0_30px_rgba(239,68,68,0.2)] dark:bg-[#161724]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-red-500 to-red-600 font-mono text-xs font-bold text-white">
              NA
            </div>
            <span className="mt-2 font-mono text-xs font-semibold text-red-300">
              nest arch
            </span>
          </div>

          {/* Outer connected nodes visual representation */}
          <div className="mt-6 grid w-full max-w-xs grid-cols-2 gap-3">
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border p-2 font-mono text-xs transition-all",
                selectedId === "web"
                  ? "border-red-500/60 bg-red-500/10 text-white"
                  : "border-white/10 bg-white/5 text-zinc-400"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/nextjs_icon_dark.svg"
                alt="Next.js"
                className="h-3.5 w-3.5"
              />
              <span>Web Frontend</span>
            </div>
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border p-2 font-mono text-xs transition-all",
                selectedId === "backend"
                  ? "border-red-500/60 bg-red-500/10 text-white"
                  : "border-white/10 bg-white/5 text-zinc-400"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/nestjs.svg"
                alt="NestJS"
                className="h-3.5 w-3.5"
              />
              <span>APIs & Backends</span>
            </div>
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border p-2 font-mono text-xs transition-all",
                selectedId === "microservices"
                  ? "border-red-500/60 bg-red-500/10 text-white"
                  : "border-white/10 bg-white/5 text-zinc-400"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/docker.svg"
                alt="Docker"
                className="h-3.5 w-3.5"
              />
              <span>Microservices</span>
            </div>
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border p-2 font-mono text-xs transition-all",
                selectedId === "database"
                  ? "border-red-500/60 bg-red-500/10 text-white"
                  : "border-white/10 bg-white/5 text-zinc-400"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/postgresql.svg"
                alt="PostgreSQL"
                className="h-3.5 w-3.5"
              />
              <span>Databases</span>
            </div>
          </div>
        </div>

        {/* Right Output / Feature List */}
        <div className="flex flex-col justify-center rounded-xl border border-white/10 bg-black/40 p-5 lg:col-span-4 dark:bg-[#090a10]">
          <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
            <Terminal className="h-4 w-4 text-red-400" />
            <span className="font-mono text-xs font-semibold text-red-300">
              $ npx @nest-arch/tui --type={selectedCategory.id}
            </span>
          </div>

          <p className="mb-4 font-mono text-xs leading-relaxed text-zinc-400">
            {selectedCategory.desc}
          </p>

          <div className="space-y-2.5">
            {selectedCategory.details.map((detail, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs text-zinc-300"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
