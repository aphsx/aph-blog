import type { Course, Page } from "@/lib/types";
import { seRoadmapNav } from "./nav";
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
  id: "se-roadmap",
  title: "เตรียมสัมภาษณ์ Software Engineer",
  description:
    "Roadmap เตรียมสมัครงาน SE ตั้งแต่ Resume, Coding, System Design, Behavioral จนถึงต่อรอง Offer — ภาษาไทย ทำตามทีละขั้น",
  badge: "💼",
  overviewSlug: "overview",
  nav: seRoadmapNav,
  pages,
  order: seRoadmapNav.flatMap((c) => c.items.map((i) => i.slug)),
};
