"use client";

import { ChevronRight, FileCode2, Folder, FolderOpen } from "lucide-react";
import type { ReactNode } from "react";

import { useUi } from "@/components/locale-provider";

const CardNumber = ({ value }: { value: number }) => (
  <span className="font-mono text-sm font-semibold text-red-400 tabular-nums">
    {String(value).padStart(2, "0")}
  </span>
);

const TerminalPreview = () => (
  <div className="border-border/80 bg-background/70 text-muted-foreground mt-5 overflow-hidden rounded-xl border font-mono text-xs leading-6 shadow-inner shadow-black/5">
    <div className="border-border/70 flex items-center gap-1.5 border-b px-3 py-2">
      <span className="size-2.5 rounded-full bg-red-400" />
      <span className="size-2.5 rounded-full bg-amber-400" />
      <span className="size-2.5 rounded-full bg-emerald-400" />
    </div>
    <div className="space-y-0.5 p-3">
      <p>? Select a database</p>
      <p className="pl-4">No database</p>
      <p className="flex items-center gap-1 text-red-400">
        <ChevronRight className="size-3" /> PostgreSQL
      </p>
      <p className="pl-4">Better Sqlite</p>
      <p className="pl-4">Mysql</p>
      <p className="pl-4">MongoDB</p>
    </div>
  </div>
);

const TreePreview = () => (
  <div className="border-border/70 text-muted-foreground mt-5 border-t pt-3 font-mono text-xs leading-6">
    <p className="text-foreground flex items-center gap-2">
      <FolderOpen className="text-foreground/80 size-4" /> src
    </p>
    <div className="border-border/60 ml-2 border-l pl-4">
      {["api", "auth", "config", "database"].map((folder) => (
        <p key={folder} className="flex items-center gap-2">
          <Folder className="text-foreground/70 size-4" /> {folder}
        </p>
      ))}
      <p className="text-foreground/90 flex items-center gap-2">
        <FileCode2 className="text-foreground/80 size-4" /> app.module.ts
      </p>
      <p className="text-foreground/90 flex items-center gap-2">
        <FileCode2 className="text-foreground/80 size-4" /> main.ts
      </p>
    </div>
  </div>
);

const ConfigPreview = () => (
  <div className="border-border/80 bg-background/70 mt-5 grid grid-cols-[2.25rem_1fr] overflow-hidden rounded-xl border font-mono text-xs leading-6 shadow-inner shadow-black/5">
    <div className="border-border/70 text-muted-foreground/70 border-r py-2 text-center">
      {[1, 2, 3, 4, 5, 6, 7].map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
    <div className="text-muted-foreground p-2.5">
      <p className="text-red-400">services:</p>
      <p className="pl-3 text-red-400">api:</p>
      <p className="pl-6">build: .</p>
      <p className="pl-6 text-red-400">environment:</p>
      <p className="pl-9">- NODE_ENV=development</p>
      <p className="pl-6 text-red-400">depends_on:</p>
      <p className="pl-9">- postgres</p>
    </div>
  </div>
);

const FooterPreview = ({ children }: { children: ReactNode }) => (
  <div className="border-border/70 text-muted-foreground mt-5 border-t pt-3 font-mono text-xs leading-5">
    {children}
  </div>
);

export const FeaturesGrid = () => {
  const { t } = useUi();

  return (
    <section id="features" className="space-y-8 sm:space-y-10">
      <div className="max-w-2xl space-y-3">
        <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-red-400 uppercase">
          <span className="h-px w-14 bg-current/70" aria-hidden="true" />
          {t.features.sectionLabel}
        </p>
        <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.05em] sm:text-5xl">
          {t.features.heading}
          <span className="text-red-400">.</span>
        </h2>
        <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
          {t.features.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
        {t.features.items.map((feature, index) => {
          const cardClassName = index < 3 ? "lg:col-span-2" : "lg:col-span-3";

          return (
            <article
              key={feature.title}
              className={[
                "group border-border/80 bg-card/45 hover:border-red-400/35 relative min-h-72 overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-card/75 hover:shadow-xl hover:shadow-red-950/10",
                cardClassName,
              ].join(" ")}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,113,113,0.09),transparent_34%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col">
                <CardNumber value={index + 1} />
                <div className="mt-2">
                  <h3 className="text-lg leading-tight font-semibold tracking-[-0.025em]">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {index === 0 ? <TerminalPreview /> : null}
                {index === 1 ? <TreePreview /> : null}
                {index === 2 ? <ConfigPreview /> : null}
                {index === 3 ? (
                  <FooterPreview>
                    apps/ <span className="mx-2">·</span> packages/{" "}
                    <span className="mx-2">·</span> turbo.json{" "}
                    <span className="mx-2">·</span> shared configs
                  </FooterPreview>
                ) : null}
                {index === 4 ? (
                  <FooterPreview>
                    Custom templates <span className="mx-2">·</span> Multiple
                    API types <span className="mx-2">·</span> Microservices{" "}
                    <span className="mx-2">·</span> and more
                  </FooterPreview>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
