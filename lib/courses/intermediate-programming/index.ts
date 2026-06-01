import type { Course, Page } from "@/lib/types";
import { intermediateProgrammingNav } from "./nav";
import { overviewPages } from "./pages/overview";
import { pythonDeepPages } from "./pages/python-deep";
import { robustCodePages } from "./pages/robust-code";
import { debuggingPages } from "./pages/debugging";
// บทเรียนแต่ละบท import เพิ่มที่นี่ทีละ step (ดู docs/intermediate-programming-plan)

const pages: Record<string, Page> = {
  ...overviewPages,
  ...pythonDeepPages,
  ...robustCodePages,
  ...debuggingPages,
  // ...spread บทเรียนแต่ละบทที่นี่ทีละ step
};

export const intermediateProgramming: Course = {
  id: "intermediate-programming",
  title: "เขียนโปรแกรมระดับกลาง",
  description:
    "ต่อยอดจากพื้นฐานสู่ระดับ mid-level — Python ลึก, testing, git, clean code, ฐานข้อมูล, web API และ Data Structures & Algorithms ที่ใช้ทำงานและสัมภาษณ์จริง",
  badge: "🚀",
  overviewSlug: "intermediate",
  nav: intermediateProgrammingNav,
  pages,
  order: intermediateProgrammingNav.flatMap((c) => c.items.map((i) => i.slug)),
};
