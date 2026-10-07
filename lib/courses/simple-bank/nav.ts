import type { NavCategory } from "@/lib/types";

export const simpleBankNav: NavCategory[] = [
  {
    label: "1. ทำไมเงินถึงผิดไม่ได้",
    items: [
      { slug: "bank-overview", title: "ภาพรวมระบบ Simple Bank & สถาปัตยกรรม" },
      { slug: "bank-go-backend-primer", title: "Go จากศูนย์สำหรับระบบ Backend" },
    ],
  },
  {
    label: "2. เงินถูกเก็บยังไง",
    items: [
      { slug: "bank-schema-design", title: "ออกแบบ Schema & สมุดบัญชีแยกประเภท" },
      { slug: "bank-db-migration", title: "จัดการ Database Migration & Docker" },
    ],
  },
  {
    label: "3. ให้ Go คุยกับฐานข้อมูล แล้วพิสูจน์",
    items: [
      { slug: "bank-db-store-crud", title: "Data Store & การเขียน Raw SQL CRUD" },
      { slug: "bank-unit-testing", title: "Unit Test ระบบธนาคารด้วย Testify" },
    ],
  },
  {
    label: "4. โอนให้สำเร็จทั้งก้อน",
    items: [
      { slug: "bank-acid-and-tx", title: "กลไก ACID & Transaction Manager" },
      { slug: "bank-money-transfer-logic", title: "โค้ดระบบโอนเงิน 5 ขั้นตอน (TransferTx)" },
    ],
  },
  {
    label: "5. สองคนกดพร้อมกัน",
    items: [
      { slug: "bank-concurrency-race-condition", title: "Race Condition & Row Locking (SELECT FOR UPDATE)" },
      { slug: "bank-deadlock-prevention", title: "ไขปริศนา Deadlock & แก้ด้วย Resource Ordering" },
      { slug: "bank-concurrency-testing", title: "ทดสอบ Concurrency & Deadlock ด้วย Goroutines" },
    ],
  },
  {
    label: "6. เปิดประตูให้เรียกผ่านเว็บ",
    items: [
      { slug: "bank-rest-api-gin", title: "สร้าง REST API Server ด้วย Gin Framework" },
      { slug: "bank-api-validation", title: "Data Validation & ป้องกันโอนข้ามสกุลเงิน" },
    ],
  },
  {
    label: "7. รู้ว่าใครกด และรันบนเครื่องจริง",
    items: [
      { slug: "bank-user-auth-bcrypt", title: "ระบบผู้ใช้งาน & แฮชรหัสผ่านด้วย Bcrypt" },
      { slug: "bank-jwt-paseto-token", title: "ระบบยืนยันตัวตนด้วย PASETO Token & Middleware" },
      { slug: "bank-config-docker-prod", title: "จัดการ Config ด้วย Viper, Docker & Production Checklist" },
    ],
  },
  {
    label: "8. เล่าตอนสัมภาษณ์",
    items: [
      { slug: "bank-interview-system-design", title: "เจาะลึกคำถามสัมภาษณ์ & สถาปัตยกรรมระดับสูง" },
    ],
  },
];
