import { Box, Layers, Puzzle, Server, Terminal } from "lucide-react";

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

      <div className="grid grid-cols-1 border-y border-border sm:grid-cols-2 lg:grid-cols-5">
        {[
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
        ].map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group flex min-h-56 flex-col justify-between border-border p-6 transition-colors hover:bg-muted/35 sm:border-r lg:last:border-r-0"
            >
              <div className="flex size-10 items-center justify-center border border-border bg-background text-red-400 transition-colors group-hover:border-red-500/50 group-hover:bg-red-500/10">
                <Icon className="size-5" />
              </div>
              <div>
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
