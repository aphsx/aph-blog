import type { Localized, Page } from "./types";
import type { Block } from "./types";

export type Locale = "en" | "th";

/** Site default language. */
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALES: readonly Locale[] = ["en", "th"] as const;

export const LOCALE_STORAGE_KEY = "aph-locale";

export const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  th: "TH",
};

function isLocalized<T>(value: T | Localized<T>): value is Localized<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "en" in value &&
    "th" in value
  );
}

function isEmptyLocalizedValue(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return value == null;
}

/**
 * Pick a locale field from a `{ en, th }` map (or a plain Thai-only value).
 * Empty English → fall back to Thai so untranslated pages still render.
 */
export function pickLocalized<T>(
  value: T | Localized<T>,
  locale: Locale,
): T {
  if (!isLocalized(value)) return value;
  const chosen = value[locale];
  if (locale === "en" && isEmptyLocalizedValue(chosen)) return value.th;
  return chosen;
}

/** Resolved view-model for rendering a page. */
export type ResolvedPage = {
  title: string;
  lead: string;
  blocks: Block[];
};

export function resolvePage(page: Page, locale: Locale): ResolvedPage {
  return {
    title: pickLocalized(page.title, locale),
    lead: pickLocalized(page.lead, locale),
    blocks: pickLocalized(page.blocks, locale),
  };
}

/** Chrome / chrome-adjacent UI copy. Content pages use resolvePage. */
export const UI: Record<
  Locale,
  {
    banner: string;
    home: string;
    courses: string;
    topics: (n: number) => string;
    openSidebar: string;
    langAria: string;
  }
> = {
  en: {
    banner: "Notes & software courses · Free to learn",
    home: "Home",
    courses: "Courses",
    topics: (n) => `${n} topics`,
    openSidebar: "Open sidebar menu",
    langAria: "Language",
  },
  th: {
    banner: "บันทึกและคอร์สเรียนพัฒนาซอฟต์แวร์ · ภาษาไทย · เรียนฟรี",
    home: "หน้าแรก",
    courses: "คอร์ส",
    topics: (n) => `${n} หัวข้อ`,
    openSidebar: "เปิดเมนู sidebar",
    langAria: "ภาษา",
  },
};
