"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@nest-arch-web/ui/components/dropdown-menu";
import { ChevronDown } from "lucide-react";
import type { Route } from "next";
import { usePathname, useRouter } from "next/navigation";

import { useUi } from "@/components/locale-provider";
import { getLocaleLabel, localeCodes, locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface LocaleSelectProps {
  className?: string;
}

const LocaleSelect = ({ className }: LocaleSelectProps) => {
  const { t } = useUi();
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter(Boolean);
  const activeLocale = locales.includes(segments[0] as Locale)
    ? (segments[0] as Locale)
    : "en";
  const rest = segments.slice(1).join("/");

  const navigate = (locale: Locale) => {
    if (locale === activeLocale) {
      return;
    }
    const path = rest ? `/${locale}/${rest}` : `/${locale}`;
    router.push(path as Route);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`text-foreground/85 hover:bg-foreground/6 focus-visible:ring-ring/50 data-open:bg-foreground/8 flex h-8 shrink-0 cursor-pointer items-center gap-1 rounded-full px-2.5 text-xs font-medium outline-none select-none focus-visible:ring-2 ${className}`}
        aria-label={t.header.language}
      >
        <span className="font-mono tracking-wider uppercase tabular-nums">
          {localeCodes[activeLocale]}
        </span>
        <ChevronDown className="size-3.5 opacity-55" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40 rounded-2xl p-1.5">
        <DropdownMenuRadioGroup
          value={activeLocale}
          onValueChange={(v) => navigate(v as Locale)}
        >
          {locales.map((locale) => (
            <DropdownMenuRadioItem
              key={locale}
              value={locale}
              className="rounded-md py-2 pr-8 pl-2.5 text-sm"
            >
              {getLocaleLabel(locale)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LocaleSelect };
