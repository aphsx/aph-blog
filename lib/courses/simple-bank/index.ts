import type { Course, Page } from "@/lib/types";
import { COURSE_META_MAP } from "../metadata";
import { startPages } from "./pages/00-start";
import { goPages } from "./pages/01-go";
import { databasePages } from "./pages/02-database";
import { dbCodePages } from "./pages/03-db-code";
import { transactionPages } from "./pages/04-transactions";
import { concurrencyPages } from "./pages/05-concurrency";
import { apiPages } from "./pages/06-api";
import { securityProdPages } from "./pages/07-security-prod";
import { wrapupPages } from "./pages/08-wrapup";

// =============================================================================
// ไฟล์: simple-bank/index.ts
// หน้าที่: รวมหน้าบทเรียนทั้งหมดของคอร์ส Simple Bank เข้ากับ Metadata ของระบบ
// =============================================================================

const pages: Record<string, Page> = {
  ...startPages,
  ...goPages,
  ...databasePages,
  ...dbCodePages,
  ...transactionPages,
  ...concurrencyPages,
  ...apiPages,
  ...securityProdPages,
  ...wrapupPages,
};

export const simpleBankCourse: Course = {
  ...COURSE_META_MAP["simple-bank"],
  pages,
};
