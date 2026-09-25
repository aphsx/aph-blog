import type { Course, Page } from "@/lib/types";
import { COURSE_META_MAP } from "../metadata";
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
  ...COURSE_META_MAP["basic-programming"],
  pages,
};
