import type { Page } from "./types";

export type Locale = "en" | "th";

/** Site default language. */
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALES: readonly Locale[] = ["en", "th"] as const;

export const LOCALE_STORAGE_KEY = "aph-locale";

export const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  th: "TH",
};

/**
 * Resolve which title/lead/blocks to show for a locale.
 * Base page fields are Thai (existing content). English lives on `page.en`.
 * Missing translation → fall back to Thai so untranslated pages still render.
 */
export function resolvePage(
  page: Page,
  locale: Locale,
): Pick<Page, "title" | "lead" | "blocks"> {
  if (locale === "en" && page.en) {
    return {
      title: page.en.title,
      lead: page.en.lead,
      blocks: page.en.blocks,
    };
  }
  return {
    title: page.title,
    lead: page.lead,
    blocks: page.blocks,
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
