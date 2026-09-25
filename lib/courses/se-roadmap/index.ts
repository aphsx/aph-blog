import type { Course, Page } from "@/lib/types";
import { COURSE_META_MAP } from "../metadata";
import { introPages } from "./pages/intro";
import { gettingInterviewPages } from "./pages/getting-interview";
import { portfolioPages } from "./pages/portfolio";
import { fundamentalsPages } from "./pages/fundamentals";
import { codingPages } from "./pages/coding";
import { algorithmsPages } from "./pages/algorithms";
import { systemDesignPages } from "./pages/system-design";
import { behavioralPages } from "./pages/behavioral";
import { negotiationPages } from "./pages/negotiation";
import { finalPrepPages } from "./pages/final-prep";
import { lessonPages } from "./pages/lessons";

const pages: Record<string, Page> = {
  ...introPages,
  ...gettingInterviewPages,
  ...portfolioPages,
  ...fundamentalsPages,
  ...codingPages,
  ...algorithmsPages,
  ...systemDesignPages,
  ...behavioralPages,
  ...negotiationPages,
  ...finalPrepPages,
  ...lessonPages,
};

export const seRoadmap: Course = {
  ...COURSE_META_MAP["se-roadmap"],
  pages,
};
