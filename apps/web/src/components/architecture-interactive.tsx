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

export function ArchitectureInteractive({
  className,
}: ArchitectureInteractiveProps) {
  const [selectedId, setSelectedId] = React.useState("web");

  const selectedCategory =
    CATEGORIES.find((cat) => cat.id === selectedId) || CATEGORIES[0];

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-[#0d0e16]/80 p-4 sm:p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.1)]",
        className
      )}
    >
      <div className="grid gap-6 lg:grid-cols-12 items-center">
        {/* Left Sidebar Menu */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = cat.id === selectedId;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedId(cat.id)}
                type="button"
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-sm transition-all",
                  isSelected
                    ? "bg-gradient-to-r from-rose-500/20 to-purple-500/20 border border-pink-500/40 text-white shadow-[0_0_15px_rgba(236,72,153,0.2)]"
                    : "border border-transparent text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg border",
                    isSelected
                      ? "border-pink-500/50 bg-pink-500/20 text-rose-300"
                      : "border-white/10 bg-white/5 text-zinc-400"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="flex-1 font-mono text-xs sm:text-sm">
                  {cat.label}
                </span>
                {isSelected && <ArrowRight className="h-4 w-4 text-pink-400" />}
              </button>
            );
          })}
        </div>

        {/* Center Node Visual Diagram */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center py-6 px-2 relative">
          {/* Central Logo Node */}
          <div className="relative z-10 flex flex-col items-center justify-center h-28 w-28 rounded-2xl border border-pink-500/50 bg-[#161724] shadow-[0_0_30px_rgba(236,72,153,0.3)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 text-white font-mono font-bold text-xs">
              NA
            </div>
            <span className="mt-2 font-mono text-xs font-semibold text-rose-300">
              nest arch
            </span>
          </div>

          {/* Outer connected nodes visual representation */}
          <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-xs">
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border p-2 text-xs font-mono transition-all",
                selectedId === "web"
                  ? "border-pink-500/60 bg-pink-500/10 text-white"
                  : "border-white/10 bg-white/5 text-zinc-400"
              )}
            >
              <Globe className="h-3.5 w-3.5 text-rose-400" />
              <span>Web Frontend</span>
            </div>
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border p-2 text-xs font-mono transition-all",
                selectedId === "backend"
                  ? "border-pink-500/60 bg-pink-500/10 text-white"
                  : "border-white/10 bg-white/5 text-zinc-400"
              )}
            >
              <Server className="h-3.5 w-3.5 text-purple-400" />
              <span>APIs & Backends</span>
            </div>
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border p-2 text-xs font-mono transition-all",
                selectedId === "microservices"
                  ? "border-pink-500/60 bg-pink-500/10 text-white"
                  : "border-white/10 bg-white/5 text-zinc-400"
              )}
            >
              <Cpu className="h-3.5 w-3.5 text-indigo-400" />
              <span>Microservices</span>
            </div>
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border p-2 text-xs font-mono transition-all",
                selectedId === "database"
                  ? "border-pink-500/60 bg-pink-500/10 text-white"
                  : "border-white/10 bg-white/5 text-zinc-400"
              )}
            >
              <Database className="h-3.5 w-3.5 text-pink-400" />
              <span>Databases</span>
            </div>
          </div>
        </div>

        {/* Right Output / Feature List */}
        <div className="lg:col-span-4 flex flex-col justify-center rounded-xl border border-white/10 bg-[#090a10] p-5">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
            <Terminal className="h-4 w-4 text-pink-400" />
            <span className="font-mono text-xs font-semibold text-rose-300">
              $ npx nest-arch --type={selectedCategory.id}
            </span>
          </div>

          <p className="text-xs text-zinc-400 mb-4 leading-relaxed font-mono">
            {selectedCategory.desc}
          </p>

          <div className="space-y-2.5">
            {selectedCategory.details.map((detail, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs text-zinc-300"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
