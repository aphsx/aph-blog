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

export const NAV: { group: string; items: { slug: string; title: string }[] }[] = [
  {
    group: "เริ่มต้น",
    items: [
      { slug: "overview", title: "ภาพรวม & Roadmap" },
      { slug: "timeline", title: "แผนเตรียมตัว (Timeline)" },
    ],
  },
  {
    group: "Resume & สมัครงาน",
    items: [
      { slug: "resume", title: "เขียน Resume ให้ผ่าน ATS" },
      { slug: "job-application", title: "หางาน & ยื่นสมัคร" },
    ],
  },
  {
    group: "Coding Interview",
    items: [
      { slug: "interview-formats", title: "รูปแบบการสัมภาษณ์" },
      { slug: "picking-language", title: "เลือกภาษาโปรแกรม" },
      { slug: "study-plan", title: "แผนฝึก Coding (Study Plan)" },
      { slug: "best-practices", title: "เทคนิคระหว่างสัมภาษณ์" },
      { slug: "algorithms", title: "หัวข้อ Algorithms & DS" },
    ],
  },
  {
    group: "รอบอื่น ๆ",
    items: [
      { slug: "system-design", title: "System Design" },
      { slug: "behavioral", title: "Behavioral Interview" },
      { slug: "negotiation", title: "ต่อรอง Offer" },
    ],
  },
];

// ลำดับหน้าแบบ flat สำหรับปุ่ม prev/next
export const ORDER: string[] = NAV.flatMap((g) => g.items.map((i) => i.slug));
