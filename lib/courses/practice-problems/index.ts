import type { Course, Page } from "@/lib/types";
import { practiceProblemsNav } from "./nav";
import { overviewPages } from "./pages/overview";
import { basicsPages } from "./pages/basics";
import { stringsPages } from "./pages/strings";
import { arraysPages } from "./pages/arrays";
import { dictSetPages } from "./pages/dict-set";
import { mathPages } from "./pages/math";
import { recursionPages } from "./pages/recursion";
import { patternsPages } from "./pages/patterns";

const pages: Record<string, Page> = {
  ...overviewPages,
  ...basicsPages,
  ...stringsPages,
  ...arraysPages,
  ...dictSetPages,
  ...mathPages,
  ...recursionPages,
  ...patternsPages,
};

export const practiceProblems: Course = {
  id: "practice-problems",
  title: "โจทย์ฝึกเขียนโปรแกรม",
  description:
    "โจทย์ฝึกพร้อมเฉลยละเอียดเป็นภาษา Python — ลองทำเองก่อนเปิดเฉลย ฝึกตั้งแต่พื้นฐานจนถึงเทคนิคที่เจอในสัมภาษณ์",
  badge: "🧩",
  overviewSlug: "practice",
  nav: practiceProblemsNav,
  pages,
  order: practiceProblemsNav.flatMap((c) => c.items.map((i) => i.slug)),
};
