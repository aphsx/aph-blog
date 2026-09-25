import type { Course, Page } from "@/lib/types";
import { COURSE_META_MAP } from "../metadata";
import { overviewPages } from "./pages/overview";
import { pythonDeepPages } from "./pages/python-deep";
import { robustCodePages } from "./pages/robust-code";
import { debuggingPages } from "./pages/debugging";
import { projectToolingPages } from "./pages/project-tooling";
import { gitDeepPages } from "./pages/git-deep";
import { testingPages } from "./pages/testing";
import { cleanCodePages } from "./pages/clean-code";
import { realDataPages } from "./pages/real-data";
import { databasesPages } from "./pages/databases";
import { webAppsPages } from "./pages/web-apps";
import { dsaMidPages } from "./pages/dsa-mid";
import { concurrencyPages } from "./pages/concurrency";
import { capstonePages } from "./pages/capstone";

const pages: Record<string, Page> = {
  ...overviewPages,
  ...pythonDeepPages,
  ...robustCodePages,
  ...debuggingPages,
  ...projectToolingPages,
  ...gitDeepPages,
  ...testingPages,
  ...cleanCodePages,
  ...realDataPages,
  ...databasesPages,
  ...webAppsPages,
  ...dsaMidPages,
  ...concurrencyPages,
  ...capstonePages,
};

export const intermediateProgramming: Course = {
  ...COURSE_META_MAP["intermediate-programming"],
  pages,
};
