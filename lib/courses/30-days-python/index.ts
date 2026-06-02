import type { Course, Page } from "@/lib/types";
import { thirtyDaysPythonNav } from "./nav";
import { overviewPages } from "./pages/overview";
import { day01Page } from "./pages/day-01";
import { day02Page } from "./pages/day-02";
import { day03Page } from "./pages/day-03";
import { day04Page } from "./pages/day-04";
import { day05Page } from "./pages/day-05";
import { day06Page } from "./pages/day-06";
import { day07Page } from "./pages/day-07";
import { day08Page } from "./pages/day-08";
import { day09Page } from "./pages/day-09";
import { day10Page } from "./pages/day-10";
import { day11Page } from "./pages/day-11";
import { day12Page } from "./pages/day-12";
import { day13Page } from "./pages/day-13";
import { day14Page } from "./pages/day-14";
import { day15Page } from "./pages/day-15";
import { day16Page } from "./pages/day-16";
import { day17Page } from "./pages/day-17";
import { day18Page } from "./pages/day-18";
import { day19Page } from "./pages/day-19";
import { day20Page } from "./pages/day-20";
import { day21Page } from "./pages/day-21";
import { day22Page } from "./pages/day-22";
import { day23Page } from "./pages/day-23";
import { day24Page } from "./pages/day-24";
import { day25Page } from "./pages/day-25";
import { day26Page } from "./pages/day-26";
import { day27Page } from "./pages/day-27";
import { day28Page } from "./pages/day-28";
import { day29Page } from "./pages/day-29";
import { day30Page } from "./pages/day-30";

const pages: Record<string, Page> = {
  ...overviewPages,
  ...day01Page,
  ...day02Page,
  ...day03Page,
  ...day04Page,
  ...day05Page,
  ...day06Page,
  ...day07Page,
  ...day08Page,
  ...day09Page,
  ...day10Page,
  ...day11Page,
  ...day12Page,
  ...day13Page,
  ...day14Page,
  ...day15Page,
  ...day16Page,
  ...day17Page,
  ...day18Page,
  ...day19Page,
  ...day20Page,
  ...day21Page,
  ...day22Page,
  ...day23Page,
  ...day24Page,
  ...day25Page,
  ...day26Page,
  ...day27Page,
  ...day28Page,
  ...day29Page,
  ...day30Page,
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
