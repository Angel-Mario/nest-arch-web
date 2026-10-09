"use client";

import { cn } from "@nest-arch-web/ui/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BuilderSectionNav = ({
  sections,
  label,
}: {
  sections: { id: string; label: string }[];
  label: string;
}) => {
  const [active, setActive] = useState(sections[0]?.id);
  const nav = useRef<HTMLElement>(null);
  const sectionIds = sections.map(({ id }) => id).join(",");

  useEffect(() => {
    const elements = sectionIds
      .split(",")
      .map((id) => document.querySelector(`#${id}`))
      .filter((element) => element !== null);
    const update = () => {
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      const visibleSection = elements.find(
        (element) => element.getBoundingClientRect().bottom > 145
      );
      const current = atBottom ? elements.at(-1) : visibleSection;
      if (current) {
        setActive(current.id);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionIds]);

  useEffect(() => {
    const link = nav.current?.querySelector<HTMLElement>(`[href="#${active}"]`);
    if (link && nav.current) {
      nav.current.scrollTo({
        left:
          link.offsetLeft - nav.current.clientWidth / 2 + link.clientWidth / 2,
      });
    }
  }, [active]);

  return (
    <nav
      ref={nav}
      aria-label={label}
      className="builder-section-nav preview-scrollbar bg-background/95 border-border sticky top-16 z-20 flex gap-2 overflow-x-auto border-b px-4 py-3 backdrop-blur-xl sm:px-6"
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={active === section.id ? "location" : undefined}
          className={cn(
            "focus-visible:outline-ring shrink-0 rounded-lg border px-2.5 py-1.5 font-mono text-[10px] uppercase transition-colors focus-visible:outline-2",
            active === section.id
              ? "border-primary/30 bg-primary/5 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
          )}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
};
