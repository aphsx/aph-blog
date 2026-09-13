import type { Course, Page } from "@/lib/types";
import { dsaNav } from "./nav";
import { overviewPages } from "./pages/overview";
import { chapter01Pages } from "./pages/chapter-01";
import { chapter02Pages } from "./pages/chapter-02";
import { chapter03Pages } from "./pages/chapter-03";
import { chapter04Pages } from "./pages/chapter-04";
import { chapter05Pages } from "./pages/chapter-05";
import { chapter06Pages } from "./pages/chapter-06";
import { chapter07Pages } from "./pages/chapter-07";
import { chapter08Pages } from "./pages/chapter-08";
import { chapter09Pages } from "./pages/chapter-09";
import { chapter10Pages } from "./pages/chapter-10";
import { chapter11Pages } from "./pages/chapter-11";
import { chapter12Pages } from "./pages/chapter-12";

const rawPages: Record<string, Page> = {
  ...overviewPages,
  ...chapter01Pages,
  ...chapter02Pages,
  ...chapter03Pages,
  ...chapter04Pages,
  ...chapter05Pages,
  ...chapter06Pages,
  ...chapter07Pages,
  ...chapter08Pages,
  ...chapter09Pages,
  ...chapter10Pages,
  ...chapter11Pages,
  ...chapter12Pages,
};

/**
 * Backward compatibility alias mappings:
 * Ensures any previously bookmarked URLs continue to work seamlessly.
 */
const legacyAliases: Record<string, Page> = {
  "dsa-ch7-intro": rawPages["dsa-ch2-intro"],
  "dsa-ch7-big-o-type": rawPages["dsa-ch2-big-o-type"],
  "dsa-ch7-complexity": rawPages["dsa-ch2-complexity"],
  "dsa-ch7-leetcode": rawPages["dsa-ch2-leetcode"],
  "dsa-ch5-graph": rawPages["dsa-ch12-representation"],
};

const pages: Record<string, Page> = {
  ...legacyAliases,
  ...rawPages,
};

export const dsaCourse: Course = {
  id: "dsa",
  title: "Data Structures & Algorithms (DSA)",
  description:
    "เรียนรู้โครงสร้างข้อมูลและอัลกอริทึมครบ 12 ตอน 49 บทเรียน ถอดรหัสวิธีคิดเชิงสถาปัตยกรรมสู่การทำงานจริงและการสัมภาษณ์งานระดับสากลด้วย Python และ C++",
  badge: "⚡",
  overviewSlug: "dsa-overview",
  nav: dsaNav,
  pages,
  order: dsaNav.flatMap((c) => c.items.map((i) => i.slug)),
};
