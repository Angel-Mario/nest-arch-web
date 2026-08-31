import {
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  CircleDashed,
  Clock,
  FileText,
  MessageSquare,
  Package,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

type RoadmapItem = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const ROADMAP: {
  title: string;
  subtitle: string;
  accent: string;
  icon: React.ElementType;
  items: RoadmapItem[];
}[] = [
  {
    title: "On the horizon",
    subtitle: "Actively planned and next up.",
    accent: "border-red-500/40 text-red-500",
    icon: Sparkles,
    items: [
      {
        icon: Sparkles,
        title: "Prettier support",
        description:
          "Format output with Prettier out of the box for clean, consistent generated code.",
      },
      {
        icon: Boxes,
        title: "Generate NestJS components",
        description:
          "Core CLI generation of resolvers, resources, controllers, and services — like nest generate, but driven by the nest-arch metadata file for custom generation.",
      },
      {
        icon: MessageSquare,
        title: "Create a Discord server",
        description:
          "A community space for questions, feedback, and collaboration around nest-arch.",
      },
      {
        icon: FileText,
        title: "Documentation for nest-arch",
        description:
          "Comprehensive docs covering the CLI, TUI, templates, and the metadata file for custom generation.",
      },
      {
        icon: GithubIcon,
        title: "Open-source on GitHub",
        description:
          "Open up the project for collaboration, issues, and community contributions.",
      },
    ],
  },
  {
    title: "On hold",
    subtitle: "Waiting on releases.",
    accent: "border-amber-500/40 text-amber-500",
    icon: Clock,
    items: [
      {
        icon: Package,
        title: "Wait for NestJS 12",
        description:
          "Pending the official stable release before upgrading the generator's baseline.",
      },
    ],
  },
  {
    title: "Unsupported",
    subtitle: "Flagged for later. Not ready yet.",
    accent: "border-rose-500/40 text-rose-500",
    icon: AlertTriangle,
    items: [
      {
        icon: CircleDashed,
        title: "NestJS GraphQL support",
        description:
          "Still pending for @nestjs/graphql v14 — currently on dev, not prepared for ESM compatibility.",
      },
      {
        icon: CircleDashed,
        title: "Prisma v7 + MongoDB",
        description:
          "Prisma v7 doesn't support Mongo yet. 6.19 is the last supported version, and the next Prisma release will add Mongo support.",
      },
    ],
  },
];

const statusRow = (
  icon: React.ElementType,
  label: string,
  className: string
) => {
  const Icon = icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium ${className}`}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
};

const BACK_LINK = {
  href: "/" as const,
  label: "Back to home",
};

export const metadata: Metadata = {
  title: "Roadmap — Nest Arch",
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-red-500/30 selection:text-red-100">
      <main className="mx-auto max-w-7xl space-y-12 px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <Link
          href={BACK_LINK.href}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowUpRight className="size-4" aria-hidden="true" />
          {BACK_LINK.label}
        </Link>

        <div className="max-w-2xl space-y-3">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-red-400 uppercase">
            Roadmap
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Where nest/arch is headed.
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            A living view of what we are building, what we are waiting on, and
            what is intentionally left for later.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {ROADMAP.map((group) => {
            const GroupIcon = group.icon;
            return (
              <section
                key={group.title}
                className="rounded-2xl border border-border bg-muted/20 p-6"
                aria-label={group.title}
              >
                <header className="mb-6 flex items-center gap-3">
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${group.accent} bg-background`}
                  >
                    <GroupIcon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-mono text-sm font-semibold text-foreground">
                      {group.title}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {group.subtitle}
                    </p>
                  </div>
                </header>

                <ul className="space-y-3">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <li
                        key={item.title}
                        className="rounded-xl border border-border bg-background p-4 transition-colors hover:border-red-500/30"
                      >
                        {group.title === "Unsupported"
                          ? statusRow(
                              AlertTriangle,
                              "Not ready",
                              "border-rose-500/40 bg-rose-500/10 text-rose-500"
                            )
                          : group.title === "On hold"
                            ? statusRow(
                                Clock,
                                "Waiting",
                                "border-amber-500/40 bg-amber-500/10 text-amber-500"
                              )
                            : statusRow(
                                CheckCircle2,
                                "Planned",
                                "border-red-500/40 bg-red-500/10 text-red-500"
                              )}
                        <div className="mt-2.5 flex items-start gap-2.5">
                          <ItemIcon
                            className="mt-0.5 size-4 shrink-0 text-foreground/60"
                            aria-hidden="true"
                          />
                          <div>
                            <h3 className="font-mono text-sm font-semibold text-foreground">
                              {item.title}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
