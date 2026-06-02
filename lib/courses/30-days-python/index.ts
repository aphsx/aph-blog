import type { Course, Page } from "@/lib/types";
import { thirtyDaysPythonNav } from "./nav";
import { overviewPages } from "./pages/overview";
import { days0105Pages } from "./pages/days-01-05";
import { days0610Pages } from "./pages/days-06-10";
import { days1115Pages } from "./pages/days-11-15";
import { days1620Pages } from "./pages/days-16-20";
import { days2125Pages } from "./pages/days-21-25";
import { days2630Pages } from "./pages/days-26-30";

const pages: Record<string, Page> = {
  ...overviewPages,
  ...days0105Pages,
  ...days0610Pages,
  ...days1115Pages,
  ...days1620Pages,
  ...days2125Pages,
  ...days2630Pages,
};

export const thirtyDaysPython: Course = {
  id: "30-days-python",
  title: "30 วัน Python",
  description:
    "เรียน Python จากศูนย์ถึงสร้าง API ใน 30 วัน — แปลและเรียบเรียงจาก 30 Days of Python โดย Asabeneh เนื้อหาครบทุกบทไม่มีตัดทอน",
  badge: "🐍",
  overviewSlug: "py30-overview",
  nav: thirtyDaysPythonNav,
  pages,
  order: thirtyDaysPythonNav.flatMap((c) => c.items.map((i) => i.slug)),
};
