import type { NavCategory } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/nav.ts
// หน้าที่: โครงสร้างสารบัญนำทาง (Navigation Bar) เรียงตามลำดับการเรียนรู้ 9 โมดูล 21 บทเรียน
// =============================================================================

export const simpleBankNav: NavCategory[] = [
  {
    label: "0. เตรียมความพร้อม & เริ่มต้นโปรเจกต์",
    items: [
      { slug: "bank-overview", title: "0.1 ภาพรวมระบบ Simple Bank & สถาปัตยกรรม" },
      { slug: "bank-setup", title: "0.2 ติดตั้งเครื่องมือ & รันโปรแกรมแรก" },
    ],
  },
  {
    label: "1. ปูพื้นฐานภาษา Go สำหรับ Backend",
    items: [
      { slug: "bank-go-basics", title: "1.1 ไวยากรณ์ Go พื้นฐาน: Struct, Pointer & Error" },
      { slug: "bank-go-backend-primer", title: "1.2 Go สำหรับ Backend: Method, Interface, Defer & Context" },
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
    label: "3. เชื่อมต่อฐานข้อมูล & Unit Test",
    items: [
      { slug: "bank-db-store-crud", title: "3.1 Data Store & การเขียน Raw SQL CRUD" },
      { slug: "bank-unit-testing", title: "3.2 เขียน Unit Test ระบบธนาคารด้วย Testify" },
    ],
  },
  {
    label: "4. มัดรวมธุรกรรมโอนเงินด้วย ACID",
    items: [
      { slug: "bank-acid-and-tx", title: "4.1 กลไก ACID & การสร้าง Transaction Manager (execTx)" },
      { slug: "bank-money-transfer-logic", title: "4.2 โค้ดระบบโอนเงิน 5 ขั้นตอน (TransferTx)" },
    ],
  },
  {
    label: "5. รับมือคนกดพร้อมกัน: Concurrency & Deadlock",
    items: [
      { slug: "bank-concurrency-testing", title: "5.1 เขียน Concurrent Test ด้วย Goroutines & Channels" },
      { slug: "bank-concurrency-race-condition", title: "5.2 แก้ Race Condition & Stale Read ด้วย Atomic Updates" },
      { slug: "bank-deadlock-prevention", title: "5.3 ไขปริศนา Deadlock & ป้องกันด้วย Lock Ordering" },
    ],
  },
  {
    label: "6. เปิดประตูสู่โลกภายนอกด้วย REST API (Gin)",
    items: [
      { slug: "bank-rest-api-gin", title: "6.1 สร้าง REST API Server ด้วย Gin Framework" },
      { slug: "bank-api-validation", title: "6.2 Data Validation & ป้องกันโอนข้ามสกุลเงิน" },
    ],
  },
  {
    label: "7. ความปลอดภัย & รันจริงระดับ Production",
    items: [
      { slug: "bank-user-auth-bcrypt", title: "7.1 ระบบผู้ใช้งาน & แฮชรหัสผ่านด้วย Bcrypt" },
      { slug: "bank-jwt-paseto-token", title: "7.2 ยืนยันตัวตนด้วย PASETO Token & Gin Middleware" },
      { slug: "bank-config-docker-prod", title: "7.3 จัดการ Config ด้วย Viper & Multi-stage Docker" },
    ],
  },
  {
    label: "8. สรุปความรู้ & เตรียมสัมภาษณ์งาน",
    items: [
      { slug: "bank-interview-system-design", title: "8.1 10 คำถามสัมภาษณ์ยอดฮิต & System Design" },
      { slug: "bank-cheatsheet", title: "8.2 สรุปคำสั่ง Cheat Sheet & ท้าทายต่อยอด (Capstone)" },
    ],
  },
];
