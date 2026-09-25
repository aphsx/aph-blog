import type { Course, Page } from "@/lib/types";
import { COURSE_META_MAP } from "../metadata";
import { introPages } from "./pages/01-intro";
import { databasePages } from "./pages/02-database";
import { storeTxPages } from "./pages/03-store-tx";
import { concurrencyPages } from "./pages/04-concurrency";
import { testingPages } from "./pages/05-testing";
import { apiPages } from "./pages/06-api";
import { securityProdPages } from "./pages/07-security-prod";
import { interviewPages } from "./pages/08-interview";

const pages: Record<string, Page> = {
  ...introPages,
  ...databasePages,
  ...storeTxPages,
  ...concurrencyPages,
  ...testingPages,
  ...apiPages,
  ...securityProdPages,
  ...interviewPages,
};

export const simpleBankCourse: Course = {
  ...COURSE_META_MAP["simple-bank"],
  pages,
};
