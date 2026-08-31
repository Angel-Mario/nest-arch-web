import { Box, Layers, Puzzle, Server, Terminal } from "lucide-react";

const FEATURES = [
  {
    desc: "Guided, intuitive, and beautiful terminal experience with smart prompts.",
    icon: Terminal,
    title: "A guided CLI",
  },
  {
    desc: "Handlebars templates with smart resolution and dynamic scaffolding options.",
    icon: Box,
    title: "Composable templates",
  },
  {
    desc: "ORMs, auth, Docker, testing, linting, and modern tooling out of the box.",
    icon: Server,
    title: "Production defaults",
  },
  {
    desc: "TurboRepo powered workspaces for scalable architectures and shared packages.",
    icon: Layers,
    title: "Monorepo-ready",
  },
  {
    desc: "Pluggable engine, custom templates, and limitless architecture possibilities.",
    icon: Puzzle,
    title: "Room to adapt",
  },
] as const;

export function FeaturesGrid() {
  return (
    <section id="features" className="space-y-10">
      <div className="max-w-2xl space-y-3">
        <p className="font-mono text-xs font-medium tracking-[0.18em] text-red-400 uppercase">
          Designed around choices
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          The pieces that shape a real project.
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Start with the decisions that are difficult to retrofit later, not a
          generic starter and a long cleanup.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-muted/20 p-6 transition-all duration-300 hover:border-red-500/30 hover:bg-muted/40 hover:shadow-lg hover:shadow-red-500/5 hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex size-10 items-center justify-center rounded-xl border border-border bg-background text-red-400 transition-colors duration-300 group-hover:border-red-500/50 group-hover:bg-red-500/10 group-hover:text-red-500">
                <Icon className="size-5" />
              </div>

              <div className="relative">
                <h3 className="mb-2 font-mono text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
