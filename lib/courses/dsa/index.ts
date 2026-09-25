import type { Course, Page } from "@/lib/types";
import { COURSE_META_MAP } from "../metadata";
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
  ...COURSE_META_MAP["dsa"],
  pages,
};
