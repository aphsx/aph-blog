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

function isEmptyLocalizedValue(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return value == null;
}

/**
 * Pick a locale field from a `{ th, en }` map.
 * Empty English → fall back to Thai so untranslated pages still render.
 */
export function pickLocalized<T>(value: Localized<T>, locale: Locale): T {
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
    coursesHeading: string;
    coursesBlurb: string;
    startCourse: string;
    featuredHeading: string;
    featuredBlurb: string;
  }
> = {
  en: {
    banner: "Notes & software courses · Free to learn",
    home: "Home",
    courses: "Courses",
    topics: (n) => `${n} topics`,
    openSidebar: "Open sidebar menu",
    langAria: "Language",
    coursesHeading: "Courses",
    coursesBlurb: "Pick a path and start whenever you’re ready.",
    startCourse: "Start course",
    featuredHeading: "Start reading here",
    featuredBlurb: "Recommended pages from each course",
  },
  th: {
    banner: "บันทึกและคอร์สเรียนพัฒนาซอฟต์แวร์ · ภาษาไทย · เรียนฟรี",
    home: "หน้าแรก",
    courses: "คอร์ส",
    topics: (n) => `${n} หัวข้อ`,
    openSidebar: "เปิดเมนู sidebar",
    langAria: "ภาษา",
    coursesHeading: "คอร์สเรียน",
    coursesBlurb: "เลือกเส้นทางที่อยากเริ่มได้เลย",
    startCourse: "เริ่มคอร์ส",
    featuredHeading: "เริ่มอ่านจากตรงนี้",
    featuredBlurb: "บทความแนะนำจากแต่ละคอร์ส",
  },
};
