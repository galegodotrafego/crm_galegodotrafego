"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LOCALES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "pt-BR", label: "Português", flag: "🇧🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
] as const;

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const t = useTranslations("Header");
  const router = useRouter();

  const handleLocaleChange = useCallback(
    (newLocale: string) => {
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${365 * 24 * 60 * 60}`;
      router.refresh();
    },
    [router],
  );

  const current = LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex h-9 items-center gap-1.5 rounded-lg px-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus:bg-muted/50 focus:outline-none data-popup-open:bg-muted/50"
        aria-label={t("language")}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden text-xs font-medium sm:inline">{current.flag}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6}>
        {LOCALES.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => handleLocaleChange(locale.code)}
            className={currentLocale === locale.code ? "bg-accent text-accent-foreground" : ""}
          >
            <span className="mr-2">{locale.flag}</span>
            <span>{locale.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
