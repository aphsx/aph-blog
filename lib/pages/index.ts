import type { Page } from "../types";
import { introPages } from "./intro";
import { gettingInterviewPages } from "./getting-interview";
import { portfolioPages } from "./portfolio";
import { fundamentalsPages } from "./fundamentals";
import { codingPages } from "./coding";
import { algorithmsPages } from "./algorithms";
import { systemDesignPages } from "./system-design";
import { behavioralPages } from "./behavioral";
import { negotiationPages } from "./negotiation";
import { finalPrepPages } from "./final-prep";
import { coursePages } from "./course";
import { lessonPages } from "./lessons";

/** All pages, aggregated from per-category modules. Add new pages in the
 * matching module file; routing/TOC/nav pick them up automatically. */
export const PAGES: Record<string, Page> = {
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
  ...coursePages,
  ...lessonPages,
};
