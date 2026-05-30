import type { NavCategory } from "./types";

/**
 * Sidebar navigation — the single source of truth for what appears in the
 * sidebar AND the order pages are read in (prev/next derive from ORDER below).
 * Add a page here to make it appear in the roadmap; omit it to keep it
 * reachable only via direct links (e.g. the course lessons).
 */
export const NAV: NavCategory[] = [
  {
    label: "Introduction",
    items: [
      { slug: "overview", title: "คู่มือเตรียมสัมภาษณ์ SE" },
      { slug: "timeline", title: "แผนเตรียมตัว (Timeline)" },
    ],
  },
  {
    label: "Getting an interview",
    items: [
      { slug: "resume", title: "Resume" },
      { slug: "linkedin", title: "LinkedIn" },
      { slug: "job-application", title: "หางาน & ยื่นสมัคร" },
      { slug: "thai-job-market", title: "ตลาดงานไอทีในไทย" },
    ],
  },
  {
    label: "Portfolio & projects",
    items: [
      { slug: "portfolio", title: "Portfolio & Projects" },
      { slug: "ai-tools-2026", title: "AI Tools 2026" },
    ],
  },
  {
    label: "Technical fundamentals",
    items: [{ slug: "fundamentals", title: "พื้นฐานที่ต้องแม่น" }],
  },
  {
    label: "Coding interview preparation",
    items: [
      { slug: "interview-formats", title: "Coding Interview คืออะไร" },
      { slug: "picking-language", title: "เลือกภาษาโปรแกรม" },
      { slug: "study-plan", title: "แผนฝึก (Study Plan)" },
      { slug: "best-practices", title: "เทคนิค & Cheatsheet" },
      { slug: "practical-interview", title: "สัมภาษณ์เชิงปฏิบัติ (Take-home)" },
    ],
  },
  {
    label: "Algorithms study cheatsheets",
    items: [{ slug: "algorithms", title: "Algorithms Cheatsheet" }],
  },
  {
    label: "System design interview preparation",
    items: [{ slug: "system-design", title: "System Design" }],
  },
  {
    label: "Behavioral interview preparation",
    items: [{ slug: "behavioral", title: "Behavioral Interview" }],
  },
  {
    label: "Salary and offer negotiation",
    items: [{ slug: "negotiation", title: "ต่อรอง Offer" }],
  },
  {
    label: "Final prep & mock interview",
    items: [{ slug: "checklist", title: "เช็กลิสต์ & Mock Interview" }],
  },
  {
    label: "อยากเริ่มจากศูนย์?",
    items: [{ slug: "learn", title: "🎓 คอร์สเรียนเขียนโปรแกรม" }],
  },
];

/** Top navbar links. */
export const NAVBAR_LINKS = [
  { label: "เริ่มอ่าน", slug: "overview" },
  { label: "Coding", slug: "interview-formats" },
  { label: "Algorithms", slug: "algorithms" },
] as const;

/** Slugs under the "Coding" navbar group — used for active-state highlighting. */
export const CODING_SLUGS = [
  "interview-formats",
  "picking-language",
  "study-plan",
  "best-practices",
  "practical-interview",
] as const;

/** Flat reading order for prev/next pagination, derived from NAV. */
export const ORDER: string[] = [
  ...NAV.flatMap((c) => c.items.map((i) => i.slug)),
];
