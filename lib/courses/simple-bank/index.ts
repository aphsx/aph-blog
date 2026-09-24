import type { Course, Page } from "@/lib/types";
import { simpleBankNav } from "./nav";
import { introPages } from "./pages/01-intro";
import { databasePages } from "./pages/02-database";
import { storeTxPages } from "./pages/03-store-tx";
import { concurrencyPages } from "./pages/04-concurrency";
import { testingPages } from "./pages/05-testing";
import { apiPages } from "./pages/06-api";
import { securityProdPages } from "./pages/07-security-prod";

const pages: Record<string, Page> = {
  ...introPages,
  ...databasePages,
  ...storeTxPages,
  ...concurrencyPages,
  ...testingPages,
  ...apiPages,
  ...securityProdPages,
};

export const simpleBankCourse: Course = {
  id: "simple-bank",
  title: "Simple Bank in Go — สร้างระบบธนาคารจำลองด้วย Go & PostgreSQL",
  description:
    "เรียนรู้การสร้างระบบ Backend ธนาคารระดับ Production ด้วยภาษา Go, PostgreSQL, ACID Transactions, Row Locking, Deadlock Prevention, Concurrency Testing, และ RESTful API",
  badge: "🏦",
  overviewSlug: "bank-overview",
  nav: simpleBankNav,
  pages,
  order: simpleBankNav.flatMap((c) => c.items.map((i) => i.slug)),
};
