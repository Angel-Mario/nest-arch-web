import { ArrowUpRight, BookOpen, Globe } from "lucide-react";
import type { Metadata } from "next";

import { GithubLogo, ResourceLogo } from "@/components/resource-logo";
import { locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { resourceDetails } from "@/lib/resource-details";
import { resourceMessages } from "@/lib/resource-messages";
import { technologyResources } from "@/lib/technology-resources";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = resourceMessages[locale];
  return { description: t.description, title: `${t.title} — Nest Arch` };
};

const ResourcesPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;
  const t = resourceMessages[locale];
  const categories = [
    "foundation",
    "api",
    "database",
    "auth",
    "messaging",
    "tooling",
    "packages",
  ] as const;

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="mb-4 font-mono text-xs tracking-widest text-red-400 uppercase">
          Nest Arch / {t.title}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {t.title}
        </h1>
        <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
          {t.description}
        </p>
      </header>
      <nav aria-label={t.contents} className="my-10 flex flex-wrap gap-2">
        {categories.map((category) => (
          <a
            key={category}
            href={`#${category}`}
            className="border-border text-muted-foreground hover:text-foreground rounded-lg border px-3 py-2 text-sm transition-colors hover:border-red-500/50"
          >
            {t.categories[category]}
          </a>
        ))}
      </nav>
      <div className="space-y-12">
        {categories.map((category) => (
          <section
            key={category}
            id={category}
            aria-labelledby={`${category}-heading`}
            className="scroll-mt-24"
          >
            <h2
              id={`${category}-heading`}
              className="mb-5 font-mono text-xl font-semibold"
            >
              {t.categories[category]}
            </h2>
            <ul className="divide-border border-border divide-y border-y">
              {technologyResources[category].map((technology) => (
                <li
                  key={technology.name}
                  className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <ResourceLogo
                      icon={resourceDetails[technology.name].icon}
                    />
                    <div>
                      <h3 className="font-mono text-sm font-semibold">
                        {technology.name}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                        {resourceDetails[technology.name].description[locale]}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-x-5 gap-y-3">
                    {[
                      {
                        Icon: Globe,
                        href: technology.website,
                        label: t.website,
                      },
                      {
                        Icon: BookOpen,
                        href: technology.documentation,
                        label: t.documentation,
                      },
                      ...(technology.repository
                        ? [
                            {
                              Icon: GithubLogo,
                              href: technology.repository,
                              label: "GitHub",
                            },
                          ]
                        : []),
                    ].map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${technology.name} — ${label}`}
                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs transition-colors"
                      >
                        <Icon className="size-3.5" aria-hidden="true" />
                        {label}
                        <ArrowUpRight className="size-3" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="text-muted-foreground border-border mt-12 border-t pt-6 text-sm leading-relaxed">
        {t.note}
      </p>
    </main>
  );
};

export default ResourcesPage;
