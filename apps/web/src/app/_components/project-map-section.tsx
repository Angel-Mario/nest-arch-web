import { ArchitectureInteractive } from "@/components/architecture-interactive";

export function ProjectMapSection() {
  return (
    <section id="architecture" className="space-y-8">
      <div className="max-w-2xl space-y-2">
        <p className="font-mono text-xs font-medium tracking-[0.18em] text-red-400 uppercase">
          Project map
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          One starting point. Several deliberate paths.
        </h2>
      </div>

      <ArchitectureInteractive />

      <section className="grid border-y border-border md:grid-cols-3">
        {[
          [
            "Runtime",
            "NestJS with Express or Fastify, selected before the first file is generated.",
          ],
          [
            "Data layer",
            "Prisma, TypeORM or Drizzle with the project structure prepared for it.",
          ],
          [
            "Tooling",
            "Linting, tests, Docker and workspace conventions added only when you choose them.",
          ],
        ].map(([label, description]) => (
          <div
            key={label}
            className="border-border px-0 py-7 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0"
          >
            <p className="font-mono text-xs font-medium text-red-400">
              {label}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </section>
    </section>
  );
}
