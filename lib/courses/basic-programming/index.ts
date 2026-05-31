import type { Course, Page } from "@/lib/types";
import { basicProgrammingNav } from "./nav";
import { overviewPages } from "./pages/overview";
import { csBasicsPages } from "./pages/cs-basics";
import { programmingBasicsPages } from "./pages/programming-basics";
import { dataStructuresPages } from "./pages/data-structures";
import { algorithmsBigoPages } from "./pages/algorithms-bigo";
import { oopBasicsPages } from "./pages/oop-basics";
import { webApiDbPages } from "./pages/web-api-db";

const pages: Record<string, Page> = {
  ...overviewPages,
  ...csBasicsPages,
  ...programmingBasicsPages,
  ...dataStructuresPages,
  ...algorithmsBigoPages,
  ...oopBasicsPages,
  ...webApiDbPages,
};

export const basicProgramming: Course = {
  id: "basic-programming",
  title: "เขียนโปรแกรมจากศูนย์",
  description:
    "เริ่มจากไม่มีพื้นฐานเลย — เข้าใจคอมพิวเตอร์, เขียนโปรแกรม และ Computer Science ทีละขั้น พร้อมโค้ดตัวอย่างให้ลองทำตาม",
  badge: "🎓",
  overviewSlug: "learn",
  nav: basicProgrammingNav,
  pages,
  order: basicProgrammingNav.flatMap((c) => c.items.map((i) => i.slug)),
};
