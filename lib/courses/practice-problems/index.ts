import type { Course, Page } from "@/lib/types";
import { COURSE_META_MAP } from "../metadata";
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
  ...COURSE_META_MAP["practice-problems"],
  pages,
};
