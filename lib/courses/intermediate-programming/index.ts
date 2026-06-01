import type { Course, Page } from "@/lib/types";
import { intermediateProgrammingNav } from "./nav";
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
  id: "intermediate-programming",
  title: "เขียนโปรแกรมเชิงลึก",
  description:
    "คอร์สเขียนโปรแกรมแบบลงลึก ต่อยอดจากคอร์สพื้นฐาน — เจาะลึกทุกหัวข้อให้ละเอียดกว่าเดิม: Python เชิงลึก, debugging, testing, git, clean code, ฐานข้อมูล, web API และ Data Structures & Algorithms",
  badge: "🚀",
  overviewSlug: "intermediate",
  nav: intermediateProgrammingNav,
  pages,
  order: intermediateProgrammingNav.flatMap((c) => c.items.map((i) => i.slug)),
};
