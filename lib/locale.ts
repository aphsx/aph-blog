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
    collapseSidebars: string;
    expandSidebars: string;
    allCourses: string;
    langAria: string;
    coursesHeading: string;
    coursesBlurb: string;
    startCourse: string;
    featuredHeading: string;
    featuredBlurb: string;
    onThisPage: string;
    previous: string;
    next: string;
    shoutout: string;
    copyCode: string;
    copied: string;
    loadingVisualizer: string;
    output: string;
    pageNotFound: string;
    solutionDefaultSummary: string;
    solutionFoldedHint: string;
    solutionOpenedHint: string;
    constraintsTitle: string;
    collapseSidebarsTooltip: string;
    expandSidebarsTooltip: string;
    breadcrumbsAria: string;
    homeAria: string;
  }
> = {
  en: {
    banner: "Notes & software courses · Free to learn",
    home: "Home",
    courses: "Courses",
    topics: (n) => `${n} topics`,
    openSidebar: "Open sidebar menu",
    collapseSidebars: "Collapse sidebars",
    expandSidebars: "Expand sidebars",
    allCourses: "All courses",
    langAria: "Language",
    coursesHeading: "Courses",
    coursesBlurb: "Pick a path and start whenever you’re ready.",
    startCourse: "Start course",
    featuredHeading: "Start reading here",
    featuredBlurb: "Recommended pages from each course",
    onThisPage: "On this page",
    previous: "Previous",
    next: "Next",
    shoutout:
      "👋 Aph's Blog is free and open to everyone — follow along chapter-by-chapter in the sidebar. Feedback and topic requests are always welcome!",
    copyCode: "Copy code",
    copied: "Copied!",
    loadingVisualizer: "Loading visualizer...",
    output: "Output",
    pageNotFound: "Page not found",
    solutionDefaultSummary: "Full solution · Hidden for self-practice",
    solutionFoldedHint: "Folded inside — click when ready to check",
    solutionOpenedHint: "Opened · click again to fold back",
    constraintsTitle: "Constraints",
    collapseSidebarsTooltip: "Collapse sidebars (Focus mode) · Press [",
    expandSidebarsTooltip: "Expand sidebars · Press [",
    breadcrumbsAria: "Breadcrumb navigation",
    homeAria: "Aph's Blog Home",
  },
  th: {
    banner: "บันทึกและคอร์สเรียนพัฒนาซอฟต์แวร์ · ภาษาไทย · เรียนฟรี",
    home: "หน้าแรก",
    courses: "คอร์ส",
    topics: (n) => `${n} หัวข้อ`,
    openSidebar: "เปิดเมนู sidebar",
    collapseSidebars: "หุบแถบข้าง",
    expandSidebars: "แสดงแถบข้าง",
    allCourses: "คอร์สทั้งหมด",
    langAria: "ภาษา",
    coursesHeading: "คอร์สเรียน",
    coursesBlurb: "เลือกเส้นทางที่อยากเริ่มได้เลย",
    startCourse: "เริ่มคอร์ส",
    featuredHeading: "เริ่มอ่านจากตรงนี้",
    featuredBlurb: "บทความแนะนำจากแต่ละคอร์ส",
    onThisPage: "ในหน้านี้",
    previous: "ก่อนหน้า",
    next: "ถัดไป",
    shoutout:
      "👋 อ่านฟรีทั้งหมดบน Aph's Blog — ทำตามทีละหน้าใน sidebar ได้เลย หากมีข้อเสนอแนะหรืออยากให้เพิ่มหัวข้อไหน บอกได้เสมอ",
    copyCode: "คัดลอกโค้ด",
    copied: "คัดลอกแล้ว!",
    loadingVisualizer: "กำลังโหลด Visualizer...",
    output: "ผลลัพธ์ (Output)",
    pageNotFound: "ไม่พบหน้า",
    solutionDefaultSummary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
    solutionFoldedHint: "พับไว้ด้านใน — คลิกเมื่อพร้อมดู",
    solutionOpenedHint: "เปิดแล้ว · คลิกอีกครั้งเพื่อพับกลับ",
    constraintsTitle: "Constraints (ข้อจำกัด)",
    collapseSidebarsTooltip: "หุบแถบข้างซ้ายและขวา (โหมดโฟกัส) · กด [",
    expandSidebarsTooltip: "แสดงแถบข้างซ้ายและขวา · กด [",
    breadcrumbsAria: "เส้นทางนำทาง (Breadcrumb)",
    homeAria: "หน้าแรก Aph's Blog",
  },
};

