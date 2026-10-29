import type { NavCategory } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/nav.ts
// หน้าที่: โครงสร้างสารบัญนำทาง (Navigation Bar) เรียงตามลำดับการเรียนรู้จากศูนย์ถึง Production
// =============================================================================

export const simpleBankNav: NavCategory[] = [
  {
    label: "1. ปูพื้นฐานระบบการเงิน & ภาษา Go จากศูนย์",
    items: [
      { slug: "bank-overview", title: "1.1 ภาพรวมระบบ Simple Bank & สถาปัตยกรรม" },
      { slug: "bank-go-backend-primer", title: "1.2 Go จากศูนย์สำหรับระบบ Backend (ครบทุกกลไก)" },
    ],
  },
  {
    label: "2. ออกแบบฐานข้อมูล & สมุดบัญชีแยกประเภท",
    items: [
      { slug: "bank-schema-design", title: "2.1 ออกแบบ Schema & สมุดบัญชีแยกประเภท (Ledger)" },
      { slug: "bank-db-migration", title: "2.2 จัดการ Database Migration & Docker" },
    ],
  },
  {
    label: "3. เชื่อมต่อฐานข้อมูลด้วย Go & พิสูจน์ด้วย Unit Test",
    items: [
      { slug: "bank-db-store-crud", title: "3.1 Data Store & การเขียน Raw SQL CRUD" },
      { slug: "bank-unit-testing", title: "3.2 เขียน Unit Test ระบบธนาคารด้วย Testify" },
    ],
  },
  {
    label: "4. มัดรวมธุรกรรมโอนเงินด้วย ACID Transaction",
    items: [
      { slug: "bank-acid-and-tx", title: "4.1 กลไก ACID & การสร้าง Transaction Manager (execTx)" },
      { slug: "bank-money-transfer-logic", title: "4.2 โค้ดระบบโอนเงิน 5 ขั้นตอน (TransferTx)" },
    ],
  },
  {
    label: "5. รับมือคนกดพร้อมกัน: Race Condition & Deadlock",
    items: [
      { slug: "bank-concurrency-race-condition", title: "5.1 Race Condition & Row Locking (SELECT FOR UPDATE)" },
      { slug: "bank-deadlock-prevention", title: "5.2 ไขปริศนา Deadlock & แก้ด้วย Resource Ordering" },
      { slug: "bank-concurrency-testing", title: "5.3 ทดสอบ Concurrency & Deadlock ด้วย Goroutines" },
    ],
  },
  {
    label: "6. เปิดประตูสู่โลกภายนอกด้วย RESTful API (Gin)",
    items: [
      { slug: "bank-rest-api-gin", title: "6.1 สร้าง REST API Server ด้วย Gin Framework" },
      { slug: "bank-api-validation", title: "6.2 Data Validation & ป้องกันโอนข้ามสกุลเงิน" },
    ],
  },
  {
    label: "7. ระบบยืนยันตัวตน ความปลอดภัย & การรันจริง (Production)",
    items: [
      { slug: "bank-user-auth-bcrypt", title: "7.1 ระบบผู้ใช้งาน & แฮชรหัสผ่านด้วย Bcrypt" },
      { slug: "bank-jwt-paseto-token", title: "7.2 ยืนยันตัวตนด้วย PASETO Token & Gin Middleware" },
      { slug: "bank-config-docker-prod", title: "7.3 จัดการ Config ด้วย Viper, Docker & E2E Testing" },
    ],
  },
  {
    label: "8. สรุปสถาปัตยกรรม & เตรียมสอบสัมภาษณ์",
    items: [
      { slug: "bank-interview-system-design", title: "8.1 เจาะลึก 10 คำถามสัมภาษณ์ & System Design" },
    ],
  },
];
