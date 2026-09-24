import type { NavCategory } from "@/lib/types";

export const simpleBankNav: NavCategory[] = [
  {
    label: "1. บทนำ & รากฐาน",
    items: [
      { slug: "bank-overview", title: "ภาพรวมระบบ Simple Bank & สถาปัตยกรรม" },
      { slug: "bank-go-backend-primer", title: "Go พื้นฐานสำหรับระบบ Backend" },
    ],
  },
  {
    label: "2. การออกแบบฐานข้อมูล & Ledger",
    items: [
      { slug: "bank-schema-design", title: "ออกแบบ Schema & สมุดบัญชีแยกประเภท" },
      { slug: "bank-db-migration", title: "จัดการ Database Migration & Docker" },
    ],
  },
  {
    label: "3. Data Store & ACID Transactions",
    items: [
      { slug: "bank-db-store-crud", title: "Data Store & การเขียน Raw SQL CRUD" },
      { slug: "bank-acid-and-tx", title: "กลไก ACID & Transaction Manager" },
      { slug: "bank-money-transfer-logic", title: "โค้ดระบบโอนเงิน 5 ขั้นตอน (TransferTx)" },
    ],
  },
  {
    label: "4. Concurrency & Deadlock Prevention",
    items: [
      { slug: "bank-concurrency-race-condition", title: "Race Condition & Row Locking (SELECT FOR UPDATE)" },
      { slug: "bank-deadlock-prevention", title: "ไขปริศนา Deadlock & แก้ด้วย Resource Ordering" },
    ],
  },
  {
    label: "5. Automated Testing & Concurrency Test",
    items: [
      { slug: "bank-unit-testing", title: "Unit Test ระบบธนาคารด้วย Testify" },
      { slug: "bank-concurrency-testing", title: "ทดสอบ Concurrency & Deadlock ด้วย Goroutines" },
    ],
  },
  {
    label: "6. RESTful Web API & Validation",
    items: [
      { slug: "bank-rest-api-gin", title: "สร้าง REST API Server ด้วย Gin Framework" },
      { slug: "bank-api-validation", title: "Data Validation & ป้องกันโอนข้ามสกุลเงิน" },
    ],
  },
  {
    label: "7. Security, Auth & Production",
    items: [
      { slug: "bank-user-auth-bcrypt", title: "ระบบผู้ใช้งาน & แฮชรหัสผ่านด้วย Bcrypt" },
      { slug: "bank-jwt-paseto-token", title: "ระบบยืนยันตัวตนด้วย PASETO Token & Middleware" },
      { slug: "bank-config-docker-prod", title: "Config Management, Docker & Production Checklist" },
    ],
  },
  {
    label: "8. เตรียมตัวสัมภาษณ์งาน",
    items: [
      { slug: "bank-interview-system-design", title: "เจาะลึกคำถามสัมภาษณ์ & สถาปัตยกรรมระดับสูง" },
    ],
  },
];
