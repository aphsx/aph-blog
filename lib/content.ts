// โครงสร้างเนื้อหา Roadmap สาย Software Engineer
// Block types ที่ใช้ render
export type Block =
  | { t: "p"; c: string }
  | { t: "h2"; c: string }
  | { t: "h3"; c: string }
  | { t: "ul"; c: string[] }
  | { t: "ol"; c: string[] }
  | { t: "code"; c: string; lang?: string }
  | { t: "callout"; title?: string; c: string; warn?: boolean }
  | { t: "table"; head: string[]; rows: string[][] };

export type Page = {
  slug: string;
  title: string;
  lead: string;
  group: string;
  blocks: Block[];
};

export type Heading = { id: string; text: string; level: 2 | 3 };

export type NavLink = { slug: string; title: string };

export type NavCategory = {
  label: string;
  items: NavLink[];
  /** หมวดย่อย (เช่น Algorithms > Basics) */
  subcategories?: { label: string; items: NavLink[] }[];
};

export function extractHeadings(blocks: Block[]): Heading[] {
  const headings: Heading[] = [];
  blocks.forEach((b, i) => {
    if (b.t === "h2") headings.push({ id: `h-${i}`, text: b.c, level: 2 });
    if (b.t === "h3") headings.push({ id: `h-${i}`, text: b.c, level: 3 });
  });
  return headings;
}

/** Sidebar — จัดหมวดตาม Tech Interview Handbook */
export const NAV: NavCategory[] = [
  {
    label: "Introduction",
    items: [{ slug: "overview", title: "คู่มือเตรียมสัมภาษณ์ SE" }],
  },
  {
    label: "Getting an interview",
    items: [
      { slug: "resume", title: "Resume" },
      { slug: "job-application", title: "หางาน & ยื่นสมัคร" },
    ],
  },
  {
    label: "Coding interview preparation",
    items: [
      { slug: "interview-formats", title: "Coding Interview คืออะไร" },
      { slug: "picking-language", title: "เลือกภาษาโปรแกรม" },
      { slug: "study-plan", title: "แผนฝึก (Study Plan)" },
      { slug: "best-practices", title: "เทคนิค & Cheatsheet" },
    ],
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
    label: "Algorithms study cheatsheets",
    items: [{ slug: "algorithms", title: "Algorithms Cheatsheet" }],
  },
  {
    label: "Beyond the interview",
    items: [{ slug: "timeline", title: "แผนเตรียมตัว (Timeline)" }],
  },
];

/** Navbar บน — ตรงกับ TIH */
export const NAVBAR_LINKS = [
  { label: "เริ่มอ่าน", href: "/guide/overview" },
  { label: "Coding", href: "/guide/interview-formats" },
  { label: "Algorithms", href: "/guide/algorithms" },
];

/** ลำดับหน้าแบบ flat สำหรับ prev/next */
export const ORDER: string[] = [
  ...NAV.flatMap((c) => c.items.map((i) => i.slug)),
];
