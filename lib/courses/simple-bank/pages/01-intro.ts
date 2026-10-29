import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/01-intro.ts
// หน้าที่: บทที่ 1 ปูพื้นฐานสถาปัตยกรรมระบบการเงิน และไวยากรณ์ภาษา Go จากศูนย์ครบ 10 กลไก
// =============================================================================

export const introPages: Record<string, Page> = {
  "bank-overview": {
    "slug": "bank-overview",
    "title": {
      "th": "1.1 ภาพรวมระบบ Simple Bank & สถาปัตยกรรมระบบการเงิน",
      "en": "1.1 Simple Bank Architecture & System Overview"
    },
    "lead": {
      "th": "ทำไมโปรเจกต์ธนาคารจำลอง (Simple Bank) ถึงเป็นข้อสอบวัดกึ๋นของ Backend Engineer ระดับสากล — เจาะลึกโจทย์ปัญหา Data Consistency, ACID, และ Concurrency ที่ระบบจริงต้องเจอ",
      "en": "Why building a Bank Simulation is the ultimate test for Backend Engineers — mastering Data Consistency, ACID, and Concurrency in Go."
    },
    "group": "1. ปูพื้นฐานระบบการเงิน & ภาษา Go จากศูนย์",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **จุดเริ่มต้นของคุณ**: นี่คือบทแรกสุดของคอร์ส ไม่จำเป็นต้องมีพื้นฐานภาษา Go หรือระบบธนาคารมาก่อน\n• **ภารกิจในบทนี้**: ทำความเข้าใจภาพรวมสถาปัตยกรรม 3 เลเยอร์ของ Simple Bank และ 3 ภัยพิบัติทางการเงินที่เราต้องเขียนโค้ดป้องกัน\n• **ก้าวถัดไป**: ในบทที่ 1.2 เราจะปูพื้นฐานไวยากรณ์ภาษา Go ทั้ง 10 กลไกที่ใช้จริงในโปรเจกต์นี้แบบจับมือทำ"
        },
        {
          "t": "h2",
          "c": "1. ทำไมระบบการเงินถึงผิดพลาดไม่ได้แม้แต่สตางค์เดียว?"
        },
        {
          "t": "p",
          "c": "เวลาที่เราสร้างเว็บทั่วไป เช่น บล็อก, โซเชียลมีเดีย หรือเว็บบอร์ด ถ้ามีบั๊กเล็กๆ โผล่มา เช่น จำนวนไลก์นับเกินไป 1 ครั้ง หรือคอมเมนต์แสดงผลสลับลำดับ ผู้ใช้อาจจะไม่สังเกตเห็น หรืออย่างมากก็แค่กดรีเฟรชหน้าจอ"
        },
        {
          "t": "callout",
          "title": "⚠️ แต่ในระบบการเงิน (Financial System)... ผิดแม้แต่สตางค์เดียวไม่ได้!",
          "c": "ถ้ามีบั๊กที่ทำให้ผู้ใช้กดถอนเงิน 1,000 บาทพร้อมกันสองครั้ง แล้วเงินในบัญชีถูกตัดไปแค่ 1,000 บาท แต่ได้เงินสดออกมา 2,000 บาท (Double Spending) ธนาคารจะขาดทุนทันที หรือถ้าเงินถูกหักจากบัญชีต้นทางแล้วระบบล่มก่อนจะเข้าบัญชีปลายทาง เงินของลูกค้าจะหายไปในอากาศ ความน่าเชื่อถือของธุรกิจจะพังทลายทันที",
          "warn": true
        },
        {
          "t": "p",
          "c": "ด้วยเหตุนี้ บริษัทเทคโนโลยีชั้นนำระดับโลกจึงนิยมใช้โจทย์ **ระบบธนาคาร (Bank Simulation)** ในการฝึกสอนและสัมภาษณ์งาน เพื่อพิสูจน์ว่าวิศวกรเข้าใจเรื่อง **Data Consistency (ความถูกต้องของข้อมูล)**, **Database Locking (การล็อกแถวข้อมูล)**, และ **Concurrency Control (การควบคุมคำสั่งที่ยิงเข้ามาพร้อมกัน)** อย่างแท้จริง"
        },
        {
          "t": "h2",
          "c": "2. สถาปัตยกรรมของ Simple Bank (3-Layer Clean Architecture)"
        },
        {
          "t": "p",
          "c": "ระบบที่เราจะสร้างขึ้นมาตั้งแต่ศูนย์จนรันใช้งานได้จริง ถูกออกแบบตามมาตรฐาน Clean Backend Architecture โดยแบ่งออกเป็น 3 เลเยอร์หลักที่แยกหน้าที่กันอย่างชัดเจน:"
        },
        {
          "t": "table",
          "head": [
            "เลเยอร์ (Layer)",
            "โฟลเดอร์ในโปรเจกต์",
            "เทคโนโลยีที่ใช้",
            "หน้าที่และความรับผิดชอบหลัก"
          ],
          "rows": [
            [
              "1. API Transport Layer",
              "simplebank/api/",
              "Go + Gin Framework",
              "รับ HTTP Request (JSON), ตรวจสอบความถูกต้องของข้อมูลขาเข้า (Validation), ตรวจสอบสิทธิ์ด้วย Token (PASETO), และตอบกลับเป็น JSON Response พร้อม HTTP Status Code"
            ],
            [
              "2. Business Logic & Store Layer",
              "simplebank/db/",
              "Go database/sql + Store Engine",
              "ควบคุมกฎทางธุรกิจ, บริหารจัดการ Database Transaction (BEGIN / COMMIT / Auto ROLLBACK), และจัดลำดับการล็อกบัญชีเพื่อป้องกัน Deadlock"
            ],
            [
              "3. Database Storage Layer",
              "simplebank/db/migration/",
              "PostgreSQL 16 + Docker",
              "จัดเก็บข้อมูลแบบ Relational Database ด้วยระบบบัญชีแยกประเภท (Double-Entry Ledger), บังคับ Foreign Key & Check Constraints, และจัดการ Row-Level Locks"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "3. สามภัยพิบัติคลาสสิกที่ระบบธนาคารต้องเอาชนะ"
        },
        {
          "t": "p",
          "c": "ก่อนที่เราจะเริ่มเขียนโค้ด เราต้องเห็นภาพก่อนว่าศัตรูตัวร้ายของวิศวกรซอฟต์แวร์สาย Backend คืออะไร และทำไมการเขียนคำสั่ง SQL พื้นฐานแบบทั่วไปถึงเอาไม่อยู่:"
        },
        {
          "t": "ol",
          "c": [
            "**Race Condition & Double Spending (การใช้เงินซ้ำซ้อน):** สมมติว่านาย Bob มีเงิน 1,000 บาท เขากดยิงคำสั่งโอนเงิน 1,000 บาทพร้อมกัน 2 เครื่องในเสี้ยววินาทีเดียวกัน ถ้าเซิร์ฟเวอร์อ่านยอดเงินพร้อมกันทั้งสองคำสั่ง มันจะเห็นว่ามีเงิน 1,000 บาททั้งคู่ และยอมให้โอนออกทั้งสองยอด กลายเป็นว่าโอนออกได้ 2,000 บาททั้งที่มีเงินแค่ 1,000 บาท!",
            "**Partial Failure (เงินหายระหว่างทาง):** การโอนเงินประกอบด้วยการกระทำย่อยหลายขั้นตอน คือ 'บันทึกประวัติ', 'หักเงินผู้โอน', และ 'เพิ่มเงินผู้รับ' หากเซิร์ฟเวอร์หักเงินผู้โอนสำเร็จ แต่เกิดไฟดับหรือเน็ตเวิร์กตัดก่อนจะเพิ่มเงินให้ผู้รับ เงินจำนวนนั้นจะสาบสูญไปทันทีหากไม่มีระบบ Transaction Rollback",
            "**Deadlock Freeze (ระบบล็อกค้างเป็นวงกลม):** เมื่อนาย A พยายามโอนเงินให้นาย B ในจังหวะเดียวกับที่นาย B พยายามโอนเงินสวนกลับมาให้นาย A หากคำสั่งแรกล็อกบัญชี A แล้วรอจะล็อกบัญชี B ส่วนคำสั่งที่สองล็อกบัญชี B แล้วรอจะล็อกบัญชี A ทั้งสองคำสั่งจะติดกับดักรอซึ่งกันและกันจนฐานข้อมูลพ่น Error แครช!"
          ]
        },
        {
          "t": "codeout",
          "lang": "text",
          "label": "จำลอง Terminal Log เมื่อเกิดหายนะ Double Spending (กรณีไม่ได้ใส่ Row Lock)",
          "code": "[API Gateway] 10:00:00.100 POST /transfers - From: Acc 1 (Bob), Amount: 1,000 THB -> Goroutine #1\n[API Gateway] 10:00:00.101 POST /transfers - From: Acc 1 (Bob), Amount: 1,000 THB -> Goroutine #2\n[Goroutine #1] SELECT balance FROM accounts WHERE id = 1 -> อ่านได้ 1,000 THB (อนุมัติโอน)\n[Goroutine #2] SELECT balance FROM accounts WHERE id = 1 -> อ่านได้ 1,000 THB (Stale Read! ยังเห็นค่าเก่า)\n[Goroutine #1] UPDATE accounts SET balance = 0 WHERE id = 1 -> โอนออกสำเร็จ 1,000 THB\n[Goroutine #2] UPDATE accounts SET balance = 0 WHERE id = 1 -> โอนออกสำเร็จอีก 1,000 THB",
          "out": "[FATAL ALERT] ตรวจพบ Double Spending ในระบบ!\nยอดเงินตั้งต้นของ Bob: 1,000 THB\nยอดเงินที่ถูกโอนออกไปจริง: 2,000 THB (เงินงอกเกินจริงไป 1,000 THB!)\nสถานะระบบ: ยอดเงินรวมของธนาคารขาดดุลทันที"
        },
        {
          "t": "h2",
          "c": "4. แผนผังการเรียนแบบ End-to-End (8 หมวด 16 บทเรียน)"
        },
        {
          "t": "p",
          "c": "คอร์สนี้ถูกจัดเรียงใหม่ทั้งหมดให้เป็นรูปแบบเดียวกันทุกบท (Unified Learning Pattern) โดยเรียงจากพื้นฐานไวยากรณ์ Go ไปสู่ฐานข้อมูล, การเขียนเทสต์พิสูจน์ผล, การจัดการ Concurrency, การเปิด HTTP API, ระบบความปลอดภัย จนถึงการนำขึ้น Production:"
        },
        {
          "t": "table",
          "head": [
            "หมวดการเรียนรู้",
            "โจทย์ปัญหาที่บทนั้นตอบ",
            "สิ่งที่คุณจะสร้างสำเร็จ (Deliverables)"
          ],
          "rows": [
            [
              "หมวดที่ 1: ปูพื้นฐานระบบ & Go จากศูนย์",
              "ระบบธนาคารต้องระวังอะไร และต้องรู้ไวยากรณ์ Go เรื่องไหนบ้างก่อนเริ่ม?",
              "เข้าใจ Struct, Pointer, Receiver, Interface, Goroutine, Channel, Defer และ Context"
            ],
            [
              "หมวดที่ 2: ออกแบบฐานข้อมูล & Ledger",
              "ทำไมห้ามแก้ยอดเงินลอยๆ และจะสร้างตารางบน Docker ได้อย่างไร?",
              "Schema 3 ตาราง (accounts, entries, transfers) และระบบ Migration ด้วย golang-migrate"
            ],
            [
              "หมวดที่ 3: Go คุยกับ DB & Unit Test",
              "จะเขียน Go ยิง SQL อย่างไรให้ปลอดภัย และพิสูจน์ว่าโค้ดถูกได้อย่างไร?",
              "โค้ด CRUD (db/account.go) และชุดทดสอบอัตโนมัติด้วย testify/require"
            ],
            [
              "หมวดที่ 4: มัดรวมธุรกรรมด้วย ACID",
              "ทำอย่างไรให้ 5 ขั้นตอนของการโอนเงินสำเร็จพร้อมกัน หรือยกเลิกทั้งหมด?",
              "Transaction Engine (store.go) และฟังก์ชันโอนเงิน 5 ขั้นตอน (tx_transfer.go)"
            ],
            [
              "หมวดที่ 5: รับมือคนกดพร้อมกัน",
              "ป้องกัน Race Condition และแก้ปัญหาโอนเงินสวนทางกันแล้วติด Deadlock อย่างไร?",
              "Row Locking, การจัดลำดับล็อก (Resource Ordering), และ Concurrent Stress Tests"
            ],
            [
              "หมวดที่ 6: เปิดประตูด้วย REST API",
              "ให้ผู้ใช้สั่งเปิดบัญชีและโอนเงินผ่าน HTTP JSON พร้อมดักสกุลเงินผิดได้อย่างไร?",
              "HTTP Server ด้วย Gin Framework และ Custom Currency Validator"
            ],
            [
              "หมวดที่ 7: ความปลอดภัย & Production",
              "แฮชรหัสผ่าน, ออก Token ยืนยันตัวตน และแพ็กขึ้น Docker อย่างไร?",
              "Bcrypt Password, PASETO Token Middleware, Viper Config, และ Dockerfile ขนาด 20MB"
            ],
            [
              "หมวดที่ 8: สรุป & เตรียมสัมภาษณ์งาน",
              "นำความรู้ทั้งหมดไปตอบคำถามสัมภาษณ์ระดับ Junior ถึง Senior อย่างไร?",
              "คำตอบเจาะลึก 10 ข้อสอบสัมภาษณ์ยอดฮิต และผัง Enterprise System Design"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "5. สารบัญบทเรียนทั้งหมด (คลิกเพื่อข้ามไปยังบทที่ต้องการ)"
        },
        {
          "t": "links",
          "c": [
            {
              "title": "1.2 Go จากศูนย์สำหรับระบบ Backend (ครบทุกกลไก) →",
              "slug": "bank-go-backend-primer",
              "desc": "ปูพื้นฐานไวยากรณ์ Go ครบ 10 เรื่อง: Struct, Pointer, Method Receiver, Interface, Embedding, Slice/Map, Closure, Defer, Context, Goroutine และ Channel"
            },
            {
              "title": "2.1 ออกแบบ Schema & สมุดบัญชีแยกประเภท (Ledger) →",
              "slug": "bank-schema-design",
              "desc": "หลักการ Double-Entry Bookkeeping, ตาราง accounts, entries, transfers และทำไมห้ามใช้ float เก็บเงิน"
            },
            {
              "title": "2.2 จัดการ Database Migration & Docker →",
              "slug": "bank-db-migration",
              "desc": "รัน PostgreSQL 16 ด้วย Docker และควบคุมเวอร์ชันฐานข้อมูลด้วย golang-migrate และ Makefile"
            },
            {
              "title": "3.1 Data Store & การเขียน Raw SQL CRUD →",
              "slug": "bank-db-store-crud",
              "desc": "เชื่อมต่อ database/sql, ตั้งค่า Connection Pool, สร้าง DBTX Interface และเขียน CRUD ป้องกัน SQL Injection"
            },
            {
              "title": "3.2 เขียน Unit Test ระบบธนาคารด้วย Testify →",
              "slug": "bank-unit-testing",
              "desc": "พิสูจน์การทำงานของ CRUD ทันทีด้วย testify/require พร้อมตัวสุ่มข้อมูลทดสอบ"
            },
            {
              "title": "4.1 กลไก ACID & การสร้าง Transaction Manager (execTx) →",
              "slug": "bank-acid-and-tx",
              "desc": "เจาะลึก 4 คุณสมบัติ ACID และสร้าง Store.execTx ด้วย Callback Pattern พร้อมระบบ Auto Rollback"
            },
            {
              "title": "4.2 โค้ดระบบโอนเงิน 5 ขั้นตอน (TransferTx) →",
              "slug": "bank-money-transfer-logic",
              "desc": "ร้อยเรียง 5 ขั้นตอนของการโอนเงินใน 1 Transaction และส่งผลลัพธ์ยอดคงเหลือใหม่กลับทันที"
            },
            {
              "title": "5.1 Race Condition & Row Locking (SELECT FOR UPDATE) →",
              "slug": "bank-concurrency-race-condition",
              "desc": "วิเคราะห์ปัญหา Stale Read, การล็อกแถวแบบ Pessimistic (FOR NO KEY UPDATE) และ Atomic SQL Update"
            },
            {
              "title": "5.2 ไขปริศนา Deadlock & แก้ด้วย Resource Ordering →",
              "slug": "bank-deadlock-prevention",
              "desc": "ผ่าโครงสร้าง Circular Wait ตอนโอนเงินสวนทางกัน และแก้ Deadlock แบบ 100% ด้วยการจัดลำดับ Account ID"
            },
            {
              "title": "5.3 ทดสอบ Concurrency & Deadlock ด้วย Goroutines →",
              "slug": "bank-concurrency-testing",
              "desc": "จำลอง Goroutines ยิงโอนเงินพร้อมกัน ส่งผลลัพธ์ผ่าน Channel และตรวจจับ Data Race ด้วย go test -race"
            },
            {
              "title": "6.1 สร้าง REST API Server ด้วย Gin Framework →",
              "slug": "bank-rest-api-gin",
              "desc": "วางโครงสร้าง Dependency Injection ใน Server Struct, สร้าง HTTP Handlers และจัดการ HTTP Status Codes"
            },
            {
              "title": "6.2 Data Validation & ป้องกันโอนข้ามสกุลเงิน →",
              "slug": "bank-api-validation",
              "desc": "เขียน Custom Validator ลงทะเบียนกับ Gin และตรวจจับการโอนเงินต่างสกุลกัน"
            },
            {
              "title": "7.1 ระบบผู้ใช้งาน & แฮชรหัสผ่านด้วย Bcrypt →",
              "slug": "bank-user-auth-bcrypt",
              "desc": "สร้างตาราง users, แฮชรหัสผ่านด้วย Slow Hashing (Bcrypt + Salt) และซ่อนรหัสผ่านออกจาก JSON Response"
            },
            {
              "title": "7.2 ยืนยันตัวตนด้วย PASETO Token & Gin Middleware →",
              "slug": "bank-jwt-paseto-token",
              "desc": "เปรียบเทียบ PASETO กับ JWT, สร้าง Token Maker Interface และเขียน Auth Middleware ปกป้องทุก Endpoint"
            },
            {
              "title": "7.3 จัดการ Config ด้วย Viper, Docker & E2E Testing →",
              "slug": "bank-config-docker-prod",
              "desc": "แยก Config ด้วย Viper, เขียน Multi-Stage Dockerfile ขนาด 20MB, Docker Compose และสคริปต์ทดสอบ E2E"
            },
            {
              "title": "8.1 เจาะลึก 10 คำถามสัมภาษณ์ & System Design →",
              "slug": "bank-interview-system-design",
              "desc": "สรุปแนวทางตอบคำถามสัมภาษณ์สาย Backend: Idempotency, Saga Pattern, Hot Accounts และ Isolation Levels"
            }
          ]
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณได้เรียนรู้ในบทนี้ & ก้าวต่อไป",
          "c": "• คุณเห็นภาพรวมแล้วว่าระบบธนาคารแบ่งเป็น 3 เลเยอร์ (API, Store/Transaction, Database) และต้องรับมือกับ 3 ปัญหาหลักคือ Race Condition, Partial Failure, และ Deadlock\n• **ก้าวต่อไป (บทที่ 1.2)**: เราจะไปปูพื้นฐานภาษา Go ตั้งแต่ศูนย์ครบทั้ง 10 กลไกสำคัญ (เช่น Method Receiver, Pointer, Interface, Goroutine, และ Channel) เพื่อให้คุณอ่านและเขียนโค้ดในบทถัดไปเข้าใจทุกบรรทัด!"
        }
      ],
      "en": []
    }
  },
  "bank-go-backend-primer": {
    "slug": "bank-go-backend-primer",
    "title": {
      "th": "1.2 Go จากศูนย์สำหรับระบบ Backend (ครบทุกกลไกที่ใช้ในโปรเจกต์)",
      "en": "1.2 Go from Zero for Backend Systems (Complete Mechanics Guide)"
    },
    "lead": {
      "th": "คู่มือปูพื้นฐานภาษา Go ฉบับสมบูรณ์สำหรับผู้เริ่มต้น: เจาะลึกครบทั้ง 10 กลไกสำคัญ ตั้งแต่ Struct, Pointer, Method Receiver, Interface, Embedding, Slice/Map, Closure, Defer, Context ไปจนถึง Goroutines และ Channels",
      "en": "Complete beginner-friendly guide to all 10 Go mechanics used in Simple Bank: Structs, Pointers, Method Receivers, Interfaces, Embedding, Slices/Maps, Closures, Defer, Context, Goroutines, and Channels."
    },
    "group": "1. ปูพื้นฐานระบบการเงิน & ภาษา Go จากศูนย์",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: เข้าใจภาพรวมสถาปัตยกรรม 3 เลเยอร์ของ Simple Bank และโจทย์ปัญหาของระบบการเงิน\n• **ภารกิจในบทนี้**: ทำความเข้าใจไวยากรณ์และกลไกของภาษา Go ทั้ง 10 เรื่องที่ถูกใช้งานจริงในโปรเจกต์ Simple Bank พร้อมโค้ดตัวอย่างที่รันได้จริงทุกหัวข้อ\n• **วิธีเรียนบทนี้ให้ได้ผลที่สุด**: อ่านหัวข้อที่ 1–6 ให้เข้าใจภาพรวมก่อนเริ่มบทฐานข้อมูล ส่วนหัวข้อที่ 7–10 (Closure, Defer, Context, Goroutine & Channel) สามารถอ่านทำความคุ้นเคยไว้ก่อน แล้วกลับมาทบทวนซ้ำเมื่อถึงบท Transaction และ Concurrency ได้เลย"
        },
        {
          "t": "h2",
          "c": "พจนานุกรมไวยากรณ์ Go 12 คำสำคัญที่คุณจะเจอตลอดทั้งคอร์ส"
        },
        {
          "t": "p",
          "c": "หากคุณไม่เคยเขียนภาษา Go มาก่อน ตารางสรุปด้านล่างนี้คือ 'แผนที่คำแปล' ของสัญลักษณ์และคีย์เวิร์ดทั้งหมดที่จะปรากฏในโค้ดระบบธนาคารของเรา:"
        },
        {
          "t": "table",
          "head": [
            "ไวยากรณ์ในโค้ด",
            "ชื่อเรียกทางเทคนิค",
            "ความหมายแบบเข้าใจง่าย",
            "จุดที่นำไปใช้จริงใน Simple Bank"
          ],
          "rows": [
            [
              "name := value",
              "Short Variable Declaration",
              "สร้างตัวแปรใหม่พร้อมกำหนดค่าและให้ Go เดาชนิดข้อมูลให้อัตโนมัติ",
              "ใช้ประกาศตัวแปรภายในฟังก์ชันทุกไฟล์"
            ],
            [
              "(Account, error)",
              "Multiple Return Values",
              "ฟังก์ชันใน Go คืนค่าผลลัพธ์คู่กับก้อนรายงานปัญหา (error) พร้อมกันได้",
              "ใช้ในฟังก์ชัน CRUD และ Transaction ทุกตัว"
            ],
            [
              "_, err := fn()",
              "Blank Identifier (_)",
              "เครื่องหมาย _ คือถังขยะ ใช้รับค่าที่ไม่ได้ใช้ทิ้งไป (เพราะ Go ห้ามประกาศตัวแปรทิ้งไว้เฉยๆ)",
              "ใช้ใน ExecContext และเทสต์ที่สนเฉพาะ error"
            ],
            [
              "*Account และ &acc",
              "Pointer & Address-of",
              "* คือตัวชี้ตำแหน่งหน่วยความจำ, & คือการดึงตำแหน่งหน่วยความจำของตัวแปร",
              "ใช้ส่ง *sql.DB, *Server และรับค่าใน row.Scan(&i.ID)"
            ],
            [
              "func (s *Server) Start()",
              "Method & Pointer Receiver",
              "ผูกฟังก์ชันเข้ากับ Struct (ทำหน้าที่แทน Class Method ในภาษาอื่น)",
              "ใช้สร้างเมธอดของ Queries, Store, และ Server"
            ],
            [
              "type Store struct { *Queries }",
              "Struct Embedding",
              "วาง Struct ซ้อนใน Struct เพื่อยกเมธอดข้างในขึ้นมาเรียกใช้โดยตรง (แทน Inheritance)",
              "ใช้ใน db/store.go เพื่อให้ Store เรียกเมธอดของ Queries ได้"
            ],
            [
              "type Maker interface",
              "Interface (Implicit)",
              "สัญญาว่าต้องมีเมธอดอะไรบ้าง ไม่ต้องพิมพ์คำว่า implements",
              "ใช้ทำ DBTX Interface และ Token Maker Interface"
            ],
            [
              "[]Account และ append()",
              "Slice (Dynamic Array)",
              "รายการข้อมูลที่ยืดหยุ่นเพิ่มขนาดได้ด้วยคำสั่ง append()",
              "ใช้เก็บรายการบัญชีในฟังก์ชัน ListAccounts"
            ],
            [
              "map[int]bool",
              "Map (Key-Value Hash Table)",
              "ตารางเก็บคู่ Key และ Value สำหรับค้นหาข้อมูลด้วยความเร็วสูง",
              "ใช้เช็กในเทสต์ว่าการโอนเงินแต่ละรอบไม่ซ้ำกัน"
            ],
            [
              "v, ok := x.(string)",
              "Type Assertion (Comma-ok)",
              "แกะค่าออกจากตัวแปรชนิดครอบจักรวาล (interface{}) อย่างปลอดภัย",
              "ใช้ดึงค่า Currency ใน Validator และดึง Token Payload ใน Gin"
            ],
            [
              "fn func(*Queries) error",
              "Higher-Order Function / Closure",
              "การส่ง 'ฟังก์ชันทั้งก้อน' เข้าไปเป็นพารามิเตอร์ของอีกฟังก์ชันหนึ่ง",
              "ใช้ใน execTx เพื่อห่อหุ้มคำสั่ง SQL ด้วย Transaction"
            ],
            [
              "go fn() และ ch <- v",
              "Goroutine & Channel",
              "go คือสั่งรันงานคู่ขนานเบื้องหลัง, <- คือส่งหรือดึงข้อมูลผ่านท่อ Channel",
              "ใช้ยิงทดสอบการโอนเงินพร้อมกัน 10 คำสั่งในบทที่ 5"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "กลไกที่ 1: โครงสร้างไฟล์ Go, การสร้างตัวแปร (:=) และชนิดข้อมูล (int64)"
        },
        {
          "t": "p",
          "c": "ไฟล์ภาษา Go ทุกไฟล์จะต้องเริ่มต้นด้วย `package` (บอกชื่อหมวดหมู่ของไฟล์) ตามด้วย `import` (ดึงเครื่องมือมาตรฐานหรือไลบรารีอื่นมาใช้) และตามด้วยฟังก์ชันการทำงาน เครื่องหมายที่สำคัญที่สุดคือ `:=` กับ `=`:"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างที่ 1: read_a_file.go",
          "code": "// =============================================================================\n// ไฟล์: read_a_file.go\n// หน้าที่: แสดงโครงสร้างพื้นฐานของไฟล์ Go และการประกาศตัวแปรด้วย := เทียบกับ =\n// =============================================================================\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\t// ขั้นตอนที่ 1: ใช้ := สำหรับ \"สร้างตัวแปรใหม่ครั้งแรก\" พร้อมกำหนดค่าเริ่มต้น\n\towner := \"Alice\"\n\tbalance := int64(1000) // ใช้ int64 (จำนวนเต็ม 64 บิต) เก็บเงินเสมอ\n\n\tfmt.Println(\"ก่อนฝากเงิน:\", owner, \"มียอดคงเหลือ\", balance, \"สตางค์\")\n\n\t// ขั้นตอนที่ 2: เมื่อตัวแปรมีอยู่แล้ว การเปลี่ยนค่าในภายหลังต้องใช้ = ตัวเดียว (ห้ามใช้ := ซ้ำ)\n\tbalance = balance + 500\n\tfmt.Println(\"หลังฝากเงิน:\", owner, \"มียอดคงเหลือ\", balance, \"สตางค์\")\n}",
          "out": "ก่อนฝากเงิน: Alice มียอดคงเหลือ 1000 สตางค์\nหลังฝากเงิน: Alice มียอดคงเหลือ 1500 สตางค์"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`package main`**: บอกว่าไฟล์นี้คือจุดเริ่มต้นของโปรแกรมที่สั่งรันได้เอง ในโปรเจกต์ธนาคารจริงเราจะแยกไฟล์ตามโฟลเดอร์ เช่น โฟลเดอร์ `db/` จะใช้หัวไฟล์ว่า `package db` และโฟลเดอร์ `api/` จะใช้ `package api`",
            "**`:=` vs `=`**: ใช้ `:=` เมื่อต้องการประกาศตัวแปรใหม่เท่านั้น หากต้องการอัปเดตค่าตัวแปรที่มีอยู่แล้วต้องใช้ `=` เสมอ",
            "**`int64` สำหรับเก็บเงิน**: ใน Go มีทั้ง `int`, `int32`, และ `int64` เนื่องจากฐานข้อมูล PostgreSQL เก็บยอดเงินและรหัส ID เป็น `BIGINT` (64 บิต) เราจึงต้องใช้ `int64` เสมอเพื่อให้ชนิดข้อมูลตรงกัน 100%"
          ]
        },
        {
          "t": "h2",
          "c": "กลไกที่ 2: ฟังก์ชันคืนหลายค่า, การจัดการ Error, Blank Identifier (_) และ Named Return"
        },
        {
          "t": "p",
          "c": "ภาษา Go ไม่มี `try / catch` เหมือนภาษาอื่น แต่บังคับให้ฟังก์ชันที่อาจเกิดข้อผิดพลาดต้อง **คืนค่าผลลัพธ์คู่กับ `error` ออกมาพร้อมกัน** เพื่อให้ผู้เขียนโค้ดตรวจสอบข้อผิดพลาดทุกครั้งอย่างชัดเจน นอกจากนี้ยังมีรูปแบบการเขียนรับค่าและการคืนค่าที่ต้องรู้ 4 รูปแบบ:"
        },
        {
          "t": "table",
          "head": [
            "รูปแบบคำสั่ง",
            "ความหมายและการทำงาน",
            "ใช้เมื่อไหร่ใน Simple Bank"
          ],
          "rows": [
            [
              "left, err := Withdraw(1000, 400)",
              "รับทั้งค่าผลลัพธ์ตัวแรก (left) และตัวรายงานปัญหา (err)",
              "เมื่อต้องนำผลลัพธ์ (เช่น ข้อมูลบัญชีที่สร้างเสร็จ) ไปใช้งานต่อ"
            ],
            [
              "_, err := Withdraw(1000, 400)",
              "ใช้ _ ทิ้งผลลัพธ์ตัวแรก และเก็บมาเฉพาะ err",
              "เมื่อไม่ต้องการใช้ค่าตัวแรก สนใจแค่ว่าคำสั่งทำงานสำเร็จหรือพัง"
            ],
            [
              "if err := Ping(); err != nil { ... }",
              "เรียกฟังก์ชันและเช็ก err จบในบรรทัดเดียว (err มีผลเฉพาะในบล็อก if)",
              "เมื่อฟังก์ชันคืนค่า error ตัวเดียว เช่น db.Ping() หรือ ctx.ShouldBindJSON()"
            ],
            [
              "func add(...) (acc Account, err error)",
              "Named Return Values: ตั้งชื่อตัวแปรขาออกไว้ที่หัวฟังก์ชัน ใช้คำสั่ง return เปล่าๆ ได้",
              "ใช้ในฟังก์ชัน addMoney (บทที่ 5) และ LoadConfig (บทที่ 7)"
            ]
          ]
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างที่ 2: error_and_named_return.go",
          "code": "// =============================================================================\n// ไฟล์: error_and_named_return.go\n// หน้าที่: สาธิตการคืนค่าคู่กับ error, การใช้ _, และการคืนค่าแบบ Named Return\n// =============================================================================\npackage main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\n// Withdraw คืนค่า 2 ตัวโดยตั้งชื่อตัวแปรขาออกไว้ล่วงหน้า (Named Return: newBalance และ err)\nfunc Withdraw(balance int64, amount int64) (newBalance int64, err error) {\n\t// ขั้นตอนที่ 1: ตรวจสอบว่ายอดเงินพอหรือไม่\n\tif balance < amount {\n\t\terr = errors.New(\"ยอดเงินคงเหลือไม่เพียงพอ\")\n\t\treturn // Naked return: ส่งค่า newBalance (0) และ err ปัจจุบันออกไปทันที\n\t}\n\n\t// ขั้นตอนที่ 2: คำนวณยอดเงินใหม่ (err เป็น nil โดยอัตโนมัติ)\n\tnewBalance = balance - amount\n\treturn\n}\n\nfunc main() {\n\t// รูปแบบที่ 1: เก็บทั้งยอดเงินใหม่และ error\n\tbal, err := Withdraw(1000, 400)\n\tif err != nil {\n\t\tfmt.Println(\"เกิดข้อผิดพลาด:\", err)\n\t} else {\n\t\tfmt.Println(\"1) ถอนสำเร็จ ยอดคงเหลือ:\", bal)\n\t}\n\n\t// รูปแบบที่ 2: ใช้ _ ทิ้งยอดเงิน เพราะต้องการตรวจสอบแค่ error\n\t_, err = Withdraw(1000, 1500)\n\tif err != nil {\n\t\tfmt.Println(\"2) ดักจับข้อผิดพลาดสำเร็จ:\", err)\n\t}\n}",
          "out": "1) ถอนสำเร็จ ยอดคงเหลือ: 600\n2) ดักจับข้อผิดพลาดสำเร็จ: ยอดเงินคงเหลือไม่เพียงพอ"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างเพิ่มเติม 2.1: blank_and_err.go (เปรียบเทียบการรับค่าทั้ง 3 รูปแบบ)",
          "code": "// =============================================================================\n// ไฟล์: blank_and_err.go\n// หน้าที่: โค้ดส่วนประกอบของ blank_and_err.go\n// แก้ปัญหา: ออกแบบตามมาตรฐาน Clean Architecture สำหรับระบบธนาคาร\n// =============================================================================\npackage main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\n// คืนสองค่า: ยอดคงเหลือใหม่ และ error\nfunc Withdraw(balance int64, amount int64) (int64, error) {\n\tif balance < amount {\n\t\treturn 0, errors.New(\"ยอดเงินไม่พอ\")\n\t}\n\treturn balance - amount, nil\n}\n\nfunc Ping() error {\n\treturn errors.New(\"ต่อฐานข้อมูลไม่ได้\")\n}\n\nfunc main() {\n\t// ช่องที่ 1 = ยอดเงิน, ช่องที่ 2 = error\n\tleft, err := Withdraw(1000, 400)\n\tfmt.Println(\"1) เก็บทั้งสองค่า:\", left, err)\n\n\t// _ ทิ้งช่องที่ 1 เหลือแค่ err\n\t// err มีอยู่แล้วจากบรรทัดบน จึงใช้ = ไม่ใช่ :=\n\t_, err = Withdraw(1000, 1500)\n\tfmt.Println(\"2) ทิ้งยอดเงิน เหลือแค่ err:\", err)\n\n\t// สร้าง err เฉพาะในเงื่อนไข ใช้ข้างนอก if ไม่ได้\n\tif err := Ping(); err != nil {\n\t\tfmt.Println(\"3) if err := ... :\", err)\n\t}\n}",
          "out": "1) เก็บทั้งสองค่า: 600 <nil>\n2) ทิ้งยอดเงิน เหลือแค่ err: ยอดเงินไม่พอ\n3) if err := ... : ต่อฐานข้อมูลไม่ได้"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างเพิ่มเติม 2.1: blank_and_err.go (เปรียบเทียบการรับค่าทั้ง 3 รูปแบบ)",
          "code": "// =============================================================================\n// ไฟล์: blank_and_err.go\n// หน้าที่: โค้ดส่วนประกอบของ blank_and_err.go\n// แก้ปัญหา: ออกแบบตามมาตรฐาน Clean Architecture สำหรับระบบธนาคาร\n// =============================================================================\npackage main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\n// คืนสองค่า: ยอดคงเหลือใหม่ และ error\nfunc Withdraw(balance int64, amount int64) (int64, error) {\n\tif balance < amount {\n\t\treturn 0, errors.New(\"ยอดเงินไม่พอ\")\n\t}\n\treturn balance - amount, nil\n}\n\nfunc Ping() error {\n\treturn errors.New(\"ต่อฐานข้อมูลไม่ได้\")\n}\n\nfunc main() {\n\t// ช่องที่ 1 = ยอดเงิน, ช่องที่ 2 = error\n\tleft, err := Withdraw(1000, 400)\n\tfmt.Println(\"1) เก็บทั้งสองค่า:\", left, err)\n\n\t// _ ทิ้งช่องที่ 1 เหลือแค่ err\n\t// err มีอยู่แล้วจากบรรทัดบน จึงใช้ = ไม่ใช่ :=\n\t_, err = Withdraw(1000, 1500)\n\tfmt.Println(\"2) ทิ้งยอดเงิน เหลือแค่ err:\", err)\n\n\t// สร้าง err เฉพาะในเงื่อนไข ใช้ข้างนอก if ไม่ได้\n\tif err := Ping(); err != nil {\n\t\tfmt.Println(\"3) if err := ... :\", err)\n\t}\n}",
          "out": "1) เก็บทั้งสองค่า: 600 <nil>\n2) ทิ้งยอดเงิน เหลือแค่ err: ยอดเงินไม่พอ\n3) if err := ... : ต่อฐานข้อมูลไม่ได้"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`nil`**: คือค่าว่างของ `error` หาก `err == nil` แปลว่าทำงานสำเร็จไร้ปัญหา แต่ถ้า `err != nil` แปลว่าเกิดข้อผิดพลาด ต้องหยุดและจัดการทันที",
            "**`_` (Blank Identifier)**: ใน Go ถ้าคุณประกาศตัวแปรรับค่ามาแล้วไม่ได้นำไปใช้ คอมไพเลอร์จะฟ้อง Error ไม่ยอมให้คอมไพล์ เครื่องหมาย `_` จึงทำหน้าที่บอกคอมไพเลอร์ว่า 'จงใจทิ้งค่านี้'",
            "**`_ \"github.com/lib/pq\"`**: หากเห็น `_` อยู่หน้า `import` แปลว่าเราต้องการโหลดแพ็กเกจนั้นให้ทำงานเบื้องหลังตอนเปิดโปรแกรม (เช่น ลงทะเบียนไดรเวอร์ PostgreSQL) โดยที่เราไม่ได้เรียกชื่อแพ็กเกจ `pq` ตรงๆ ในโค้ด",
            "**Named Return & Naked `return`**: เมื่อเราระบุชื่อตัวแปรไว้ที่หัวฟังก์ชัน เช่น `(newBalance int64, err error)` Go จะสร้างตัวแปรทั้งสองรอไว้ให้ทันที เมื่อพิมพ์ `return` เปล่าๆ Go จะส่งค่าล่าสุดของตัวแปรทั้งสองออกไปโดยอัตโนมัติ"
          ]
        },
        {
          "t": "h2",
          "c": "กลไกที่ 3: Struct, Pointer (* vs &) และ Method Receiver"
        },
        {
          "t": "p",
          "c": "นี่คือเรื่องที่ผู้เริ่มต้นสับสนมากที่สุดเวลาอ่านโค้ด Go: **เมื่อไหร่ต้องใส่ `*` เมื่อไหร่ต้องใส่ `&` และทำไมหน้าชื่อฟังก์ชันถึงมีวงเล็บ `(a *Account)`?**"
        },
        {
          "t": "p",
          "c": "โดยค่าเริ่มต้น Go ส่งข้อมูลแบบ **Pass-by-Value (ถ่ายเอกสารสำเนาใหม่ทุกครั้ง)** หากคุณส่ง Struct เข้าฟังก์ชันธรรมดา ฟังก์ชันนั้นจะได้กระดาษสำเนาไปขีดเขียน ซึ่งไม่มีผลกับเอกสารต้นฉบับเลย หากต้องการแก้ไขข้อมูลต้นฉบับ หรือต้องการส่งออบเจกต์ขนาดใหญ่ (เช่น Database Pool) โดยไม่ก๊อบปี้ซ้ำ เราต้องส่ง **Pointer (ตำแหน่งที่อยู่บนหน่วยความจำ RAM)**:"
        },
        {
          "t": "table",
          "head": [
            "สัญลักษณ์",
            "ชื่อเรียก",
            "เปรียบเทียบให้เห็นภาพ",
            "ตัวอย่างการใช้งานจริงใน Simple Bank"
          ],
          "rows": [
            [
              "Account",
              "Struct Value (ข้อมูลก้อนจริง)",
              "ตัวบ้านจริงที่เก็บข้อมูลอยู่ข้างใน",
              "var i Account (สร้างกล่องเปล่าเตรียมรับข้อมูลแถวจาก DB)"
            ],
            [
              "&i",
              "Address-of Operator (&)",
              "การเขียน 'พิกัดที่อยู่บ้าน' ของตัวแปร i ลงบนกระดาษ",
              "row.Scan(&i.ID, &i.Balance) ส่งพิกัดให้ DB เอาข้อมูลมาหยอดใส่ตัวแปร i"
            ],
            [
              "*Account",
              "Pointer Type (*)",
              "ชนิดข้อมูลที่เก็บ 'พิกัดที่อยู่' เพื่อชี้ไปยังตัวบ้านจริง",
              "func (s *Server) Start() เมธอดที่ชี้ไปยัง Server ตัวจริงโดยไม่ก๊อบปี้"
            ]
          ]
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างที่ 3: struct_pointer_receiver.go",
          "code": "// =============================================================================\n// ไฟล์: struct_pointer_receiver.go\n// หน้าที่: เปรียบเทียบการทำงานระหว่าง Value Receiver (สำเนา) กับ Pointer Receiver (ตัวจริง)\n// แก้ปัญหา: เข้าใจว่าทำไมเมธอดของ Server, Store, และ Queries ต้องใช้เครื่องหมาย *\n// =============================================================================\npackage main\n\nimport \"fmt\"\n\n// Account คือ Struct (กล่องเก็บข้อมูลบัญชี) พร้อม Struct Tag สำหรับแปลงเป็น JSON\ntype Account struct {\n\tID      int64  `json:\"id\"`\n\tOwner   string `json:\"owner\"`\n\tBalance int64  `json:\"balance\"`\n}\n\n// ❌ 1. Value Receiver (a Account): รับค่าเป็น \"สำเนา\" การแก้ไขข้างในไม่กระทบตัวจริง\nfunc (a Account) DepositCopy(amount int64) {\n\ta.Balance += amount\n}\n\n// ✅ 2. Pointer Receiver (a *Account): รับ \"พิกัดหน่วยความจำ\" แก้ไขยอดเงินตัวจริงได้ทันที\nfunc (a *Account) DepositReal(amount int64) {\n\ta.Balance += amount\n}\n\n// ScanRow จำลองการทำงานของ row.Scan ในฐานข้อมูล ที่รับพิกัด (&) ไปเติมค่า\nfunc ScanRow(idPtr *int64, balancePtr *int64) {\n\t*idPtr = 99       // เอาเลข 99 ไปใส่ที่พิกัดของ ID\n\t*balancePtr = 500 // เอาเลข 500 ไปใส่ที่พิกัดของ Balance\n}\n\nfunc main() {\n\t// ขั้นตอนที่ 1: สร้างตัวแปร Account และทดสอบส่งพิกัด (&) ให้ฟังก์ชันเติมค่าให้\n\tvar acc Account\n\tScanRow(&acc.ID, &acc.Balance)\n\tfmt.Printf(\"1) หลัง ScanRow(&acc): ID=%d, Balance=%d\\n\", acc.ID, acc.Balance)\n\n\t// ขั้นตอนที่ 2: เรียกเมธอดแบบ Value Receiver (ยอดเงินต้นฉบับไม่เปลี่ยน)\n\tacc.DepositCopy(1000)\n\tfmt.Printf(\"2) หลัง DepositCopy(1000): Balance=%d (ไม่เปลี่ยน เพราะแก้ในสำเนา!)\\n\", acc.Balance)\n\n\t// ขั้นตอนที่ 3: เรียกเมธอดแบบ Pointer Receiver (ยอดเงินต้นฉบับเปลี่ยนจริง)\n\tacc.DepositReal(1000)\n\tfmt.Printf(\"3) หลัง DepositReal(1000): Balance=%d (เปลี่ยนจริง!)\\n\", acc.Balance)\n}",
          "out": "1) หลัง ScanRow(&acc): ID=99, Balance=500\n2) หลัง DepositCopy(1000): Balance=500 (ไม่เปลี่ยน เพราะแก้ในสำเนา!)\n3) หลัง DepositReal(1000): Balance=1500 (เปลี่ยนจริง!)"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างเพิ่มเติม 3.1: struct_pointer.go (เปรียบเทียบ DepositCopy vs Deposit บน Struct)",
          "code": "// =============================================================================\n// ไฟล์: struct_pointer.go\n// หน้าที่: นิยาม Account struct และเปรียบเทียบการทำงานระหว่าง Value Receiver กับ Pointer Receiver\n// แก้ปัญหา: เข้าใจว่าเมื่อไหร่ต้องส่ง Pointer เพื่อแก้ไขข้อมูลในก้อนเดิม และเมื่อไหร่ส่ง Value ที่เป็นการคัดลอกสำเนา\n// =============================================================================\npackage main\n\nimport \"fmt\"\n\n// Account คือโครงสร้างข้อมูลจำลองบัญชีธนาคาร\ntype Account struct {\n\tID      int64  `json:\"id\"`\n\tOwner   string `json:\"owner\"`\n\tBalance int64  `json:\"balance\"`\n}\n\n// DepositCopy รับค่าแบบสำเนา (Value Receiver)\n// ข้อจำกัด: การเปลี่ยนแปลงตัวแปร a ภายในฟังก์ชันนี้จะกระทบแค่สำเนา ก้อนต้นฉบับในหน่วยความจำจะไม่เปลี่ยน\nfunc (a Account) DepositCopy(amount int64) {\n\ta.Balance += amount\n}\n\n// Deposit รับค่าแบบ Pointer (*Account) เพื่อเข้าถึงตำแหน่งหน่วยความจำโดยตรง\n// ประโยชน์: แก้ไข Balance ของบัญชีต้นฉบับได้โดยตรง ไม่ต้องคัดลอกข้อมูลทั้งก้อน\nfunc (a *Account) Deposit(amount int64) {\n\ta.Balance += amount\n}\n\n// GetBalance รับค่าสำเนา (Account) เพื่อเข้ามาอ่านข้อมูลเพียงอย่างเดียว โดยไม่แก้ไขค่าใดๆ\nfunc (a Account) GetBalance() int64 {\n\treturn a.Balance\n}\n\nfunc main() {\n\t// 1. สร้างบัญชีใหม่พร้อมยอดเงินเริ่มต้น 1,000 บาท\n\tacc := &Account{ID: 1, Owner: \"Alice\", Balance: 1000}\n\n\t// 2. ทดสอบ Value Receiver (ส่งสำเนา): ยอดเงินก้อนเดิมต้องไม่ขยับ\n\tfmt.Println(\">> 1. ทดสอบ Value Receiver (ส่งสำเนา):\")\n\tacc.DepositCopy(500)\n\tfmt.Printf(\"   ยอดเงินหลัง DepositCopy: %d บาท (ก้อนเดิมไม่เปลี่ยน!)\\n\\n\", acc.GetBalance())\n\n\t// 3. ทดสอบ Pointer Receiver (ส่ง Pointer): ยอดเงินก้อนเดิมจะถูกอัปเดตจริงเป็น 1,500 บาท\n\tfmt.Println(\">> 2. ทดสอบ Pointer Receiver (ส่ง Pointer):\")\n\tacc.Deposit(500)\n\tfmt.Printf(\"   ยอดเงินหลัง Deposit: %d บาท (ก้อนเดิมเปลี่ยนสำเร็จ!)\\n\", acc.GetBalance())\n}",
          "out": ">> 1. ทดสอบ Value Receiver (ส่งสำเนา):\n   ยอดเงินหลัง DepositCopy: 1000 บาท (ก้อนเดิมไม่เปลี่ยน!)\n\n>> 2. ทดสอบ Pointer Receiver (ส่ง Pointer):\n   ยอดเงินหลัง Deposit: 1500 บาท (ก้อนเดิมเปลี่ยนสำเร็จ!)"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างเพิ่มเติม 3.1: struct_pointer.go (เปรียบเทียบ DepositCopy vs Deposit บน Struct)",
          "code": "// =============================================================================\n// ไฟล์: struct_pointer.go\n// หน้าที่: นิยาม Account struct และเปรียบเทียบการทำงานระหว่าง Value Receiver กับ Pointer Receiver\n// แก้ปัญหา: เข้าใจว่าเมื่อไหร่ต้องส่ง Pointer เพื่อแก้ไขข้อมูลในก้อนเดิม และเมื่อไหร่ส่ง Value ที่เป็นการคัดลอกสำเนา\n// =============================================================================\npackage main\n\nimport \"fmt\"\n\n// Account คือโครงสร้างข้อมูลจำลองบัญชีธนาคาร\ntype Account struct {\n\tID      int64  `json:\"id\"`\n\tOwner   string `json:\"owner\"`\n\tBalance int64  `json:\"balance\"`\n}\n\n// DepositCopy รับค่าแบบสำเนา (Value Receiver)\n// ข้อจำกัด: การเปลี่ยนแปลงตัวแปร a ภายในฟังก์ชันนี้จะกระทบแค่สำเนา ก้อนต้นฉบับในหน่วยความจำจะไม่เปลี่ยน\nfunc (a Account) DepositCopy(amount int64) {\n\ta.Balance += amount\n}\n\n// Deposit รับค่าแบบ Pointer (*Account) เพื่อเข้าถึงตำแหน่งหน่วยความจำโดยตรง\n// ประโยชน์: แก้ไข Balance ของบัญชีต้นฉบับได้โดยตรง ไม่ต้องคัดลอกข้อมูลทั้งก้อน\nfunc (a *Account) Deposit(amount int64) {\n\ta.Balance += amount\n}\n\n// GetBalance รับค่าสำเนา (Account) เพื่อเข้ามาอ่านข้อมูลเพียงอย่างเดียว โดยไม่แก้ไขค่าใดๆ\nfunc (a Account) GetBalance() int64 {\n\treturn a.Balance\n}\n\nfunc main() {\n\t// 1. สร้างบัญชีใหม่พร้อมยอดเงินเริ่มต้น 1,000 บาท\n\tacc := &Account{ID: 1, Owner: \"Alice\", Balance: 1000}\n\n\t// 2. ทดสอบ Value Receiver (ส่งสำเนา): ยอดเงินก้อนเดิมต้องไม่ขยับ\n\tfmt.Println(\">> 1. ทดสอบ Value Receiver (ส่งสำเนา):\")\n\tacc.DepositCopy(500)\n\tfmt.Printf(\"   ยอดเงินหลัง DepositCopy: %d บาท (ก้อนเดิมไม่เปลี่ยน!)\\n\\n\", acc.GetBalance())\n\n\t// 3. ทดสอบ Pointer Receiver (ส่ง Pointer): ยอดเงินก้อนเดิมจะถูกอัปเดตจริงเป็น 1,500 บาท\n\tfmt.Println(\">> 2. ทดสอบ Pointer Receiver (ส่ง Pointer):\")\n\tacc.Deposit(500)\n\tfmt.Printf(\"   ยอดเงินหลัง Deposit: %d บาท (ก้อนเดิมเปลี่ยนสำเร็จ!)\\n\", acc.GetBalance())\n}",
          "out": ">> 1. ทดสอบ Value Receiver (ส่งสำเนา):\n   ยอดเงินหลัง DepositCopy: 1000 บาท (ก้อนเดิมไม่เปลี่ยน!)\n\n>> 2. ทดสอบ Pointer Receiver (ส่ง Pointer):\n   ยอดเงินหลัง Deposit: 1500 บาท (ก้อนเดิมเปลี่ยนสำเร็จ!)"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**Method Receiver คืออะไร?**: สังเกตวงเล็บ `(a *Account)` ที่อยู่ระหว่างคีย์เวิร์ด `func` กับชื่อเมธอด `DepositReal` นี่คือวิธีที่ Go ใช้ผูกฟังก์ชันเข้ากับ Struct เพื่อให้เรียกใช้งานแบบ `acc.DepositReal(1000)` ได้เหมือน Object-Oriented",
            "**ทำไม `row.Scan(&i.ID, ...)` ในบทที่ 3 ต้องใส่ `&` ทุกตัว?**: เพราะฟังก์ชัน `Scan` ของไลบรารี `database/sql` ต้องการนำข้อมูลที่อ่านได้จากฐานข้อมูลไป **ยัดใส่ตัวแปร `i` ของเรา** เราจึงต้องส่งพิกัดที่อยู่ (`&i.ID`, `&i.Balance`) เข้าไปให้ `Scan` เขียนข้อมูลลงในตัวแปรของเราได้โดยตรง",
            "**กฎเหล็กใน Simple Bank**: ออบเจกต์ควบคุมระบบทุกตัว เช่น `*Queries`, `*Store`, `*Server`, `*sql.DB`, และ `*gin.Context` จะใช้ Pointer (`*`) เสมอเพื่ออ้างอิงตัวจริงตัวเดียวกันทั้งโปรแกรม"
          ]
        },
        {
          "t": "h2",
          "c": "กลไกที่ 4: Go ไม่มี Class Inheritance — การใช้ Struct Embedding"
        },
        {
          "t": "p",
          "c": "ในภาษาอย่าง Java หรือ Python เราคุ้นเคยกับการสืบทอดคลาส (`class Store extends Queries`) แต่ภาษา Go **ตัดระบบ Inheritance ทิ้งทั้งหมด** เพื่อลดความซับซ้อน แล้วใช้กลไกที่เรียกว่า **Composition / Struct Embedding (การฝัง Struct ซ้อนเข้าไปตรงๆ)** แทน:"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างที่ 4: struct_embedding.go",
          "code": "// =============================================================================\n// ไฟล์: struct_embedding.go\n// หน้าที่: สาธิตการฝัง Struct (Embedding) เพื่อให้ Store เรียกเมธอดของ Queries ได้ทันที\n// =============================================================================\npackage main\n\nimport \"fmt\"\n\n// Queries ทำหน้าที่รันคำสั่ง SQL พื้นฐานรายตาราง\ntype Queries struct{}\n\nfunc (q *Queries) GetAccount(id int64) string {\n\treturn fmt.Sprintf(\"ดึงข้อมูลบัญชี ID=%d จาก Queries สำเร็จ\", id)\n}\n\n// Store ฝัง *Queries เข้าไปโดยไม่ตั้งชื่อฟิลด์ (เรียกว่า Struct Embedding)\ntype Store struct {\n\t*Queries // เมธอดทั้งหมดของ Queries จะถูกยกขึ้นมาให้ Store เรียกใช้ได้โดยตรง!\n\tdbName   string\n}\n\n// TransferTx เป็นเมธอดระดับ Transaction ที่เพิ่มเข้ามาใน Store\nfunc (s *Store) TransferTx() string {\n\treturn \"รันธุรกรรมโอนเงิน 5 ขั้นตอนผ่าน Store\"\n}\n\nfunc main() {\n\tstore := &Store{\n\t\tQueries: &Queries{},\n\t\tdbName:  \"simple_bank_db\",\n\t}\n\n\t// เรียกเมธอดของ Queries ผ่านตัวแปร store ได้โดยตรง เสมือนเป็นเมธอดของตัวเอง!\n\tfmt.Println(\"1)\", store.GetAccount(1))\n\t// และเรียกเมธอดของ Store เองได้ตามปกติ\n\tfmt.Println(\"2)\", store.TransferTx())\n}",
          "out": "1) ดึงข้อมูลบัญชี ID=1 จาก Queries สำเร็จ\n2) รันธุรกรรมโอนเงิน 5 ขั้นตอนผ่าน Store"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`type Store struct { *Queries }`**: การวางชนิดข้อมูล `*Queries` ลงใน Struct โดยไม่เขียนชื่อฟิลด์ข้างหน้า คือการสั่งให้ Go **ยกเมธอดทั้งหมดของ `Queries` ขึ้นมาอยู่บน `Store` (Method Promotion)**",
            "**ผลลัพธ์ในโปรเจกต์จริง**: ในบทที่ 4 เราจะสร้าง `Store` ที่ฝัง `*Queries` เอาไว้ ทำให้ตัว `Server` ในบทที่ 6 ถือก้อน `store` เพียงตัวเดียว แต่สามารถเรียกได้ทั้ง `store.GetAccount()` (มาจาก `Queries`) และ `store.TransferTx()` (มาจาก `Store`) ได้อย่างไร้รอยต่อ!"
          ]
        },
        {
          "t": "h2",
          "c": "กลไกที่ 5: Interface, Implicit Implementation และ Dependency Injection"
        },
        {
          "t": "p",
          "c": "ในภาษา Go `interface` คือ **'ใบสัญญา (Contract)'** ที่ระบุเฉพาะชื่อเมธอด พารามิเตอร์ และค่าที่คืนกลับ ความพิเศษของ Go คือ **ไม่ต้องพิมพ์คำว่า `implements`** ขอแค่ Struct ใดก็ตามมีเมธอดครบตามที่ระบุในสัญญา Struct นั้นจะถือว่าผ่านเกณฑ์ของ Interface นั้นโดยอัตโนมัติ (Implicit Implementation):"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างที่ 5: interface_di.go",
          "code": "// =============================================================================\n// ไฟล์: interface_di.go\n// หน้าที่: สาธิตการใช้ Interface เพื่อรองรับการทำงานหลายรูปแบบ (เช่น DBTX และ Token Maker)\n// =============================================================================\npackage main\n\nimport \"fmt\"\n\n// DBTX คือ Interface สัญญาว่า \"ใครที่มีเมธอด QueryRow จะสามารถส่งเข้ามาใช้งานกับ Queries ได้\"\ntype DBTX interface {\n\tQueryRow(sql string) string\n}\n\n// 1. PoolDB จำลอง *sql.DB (การเชื่อมต่อปกติ)\ntype PoolDB struct{}\n\nfunc (p *PoolDB) QueryRow(sql string) string {\n\treturn \"[PoolDB] รันคำสั่งปกติ: \" + sql\n}\n\n// 2. TxDB จำลอง *sql.Tx (การเชื่อมต่อภายใน Transaction)\ntype TxDB struct{}\n\nfunc (t *TxDB) QueryRow(sql string) string {\n\treturn \"[TxDB ใน Transaction] รันคำสั่งแบบล็อก ACID: \" + sql\n}\n\n// Queries รับ DBTX Interface ทำให้รับได้ทั้ง PoolDB และ TxDB โดยไม่ต้องเขียนโค้ดซ้ำสองชุด!\ntype Queries struct {\n\tdb DBTX\n}\n\nfunc (q *Queries) CreateAccount() {\n\tfmt.Println(q.db.QueryRow(\"INSERT INTO accounts...\"))\n}\n\nfunc main() {\n\t// ใช้งานกับ Connection Pool ปกติ\n\tnormalQueries := &Queries{db: &PoolDB{}}\n\tnormalQueries.CreateAccount()\n\n\t// ใช้งานกับ Transaction โดยใช้โค้ด Queries ตัวเดิมเป๊ะ!\n\ttxQueries := &Queries{db: &TxDB{}}\n\ttxQueries.CreateAccount()\n}",
          "out": "[PoolDB] รันคำสั่งปกติ: INSERT INTO accounts...\n[TxDB ใน Transaction] รันคำสั่งแบบล็อก ACID: INSERT INTO accounts..."
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**แก้ปัญหาใหญ่ในบทที่ 3 (`DBTX`)**: ในไลบรารีมาตรฐานของ Go ตัวเชื่อมต่อปกติ (`*sql.DB`) กับตัวทรานแซกชัน (`*sql.Tx`) เป็นคนละชนิดข้อมูลกัน แต่ทั้งคู่มีเมธอดชื่อเดียวกันเป๊ะ คือ `ExecContext`, `QueryContext`, และ `QueryRowContext` เราจึงสร้าง `type DBTX interface` ขึ้นมารับ ทำให้โค้ด SQL CRUD ทุกไฟล์เขียนแค่ครั้งเดียว แต่รันได้ทั้งแบบปกติและแบบอยู่ใน Transaction!",
            "**แก้ปัญหาใหญ่ในบทที่ 7 (`token.Maker`)**: เราสร้าง `type Maker interface` ที่มีเมธอด `CreateToken` และ `VerifyToken` ทำให้ระบบ API ไม่ยึดติดว่าเบื้องหลังใช้ JWT หรือ PASETO"
          ]
        },
        {
          "t": "h2",
          "c": "กลไกที่ 6: Slice ([]T), Map (map[K]V), Variadic (...) และ Type Assertion"
        },
        {
          "t": "p",
          "c": "ในการจัดการชุดข้อมูลหลายแถวและการตรวจสอบชนิดข้อมูลตอนรันไทม์ โปรเจกต์ Simple Bank จะใช้โครงสร้างข้อมูล 4 ตัวนี้:"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างที่ 6: slice_map_assertion.go",
          "code": "// =============================================================================\n// ไฟล์: slice_map_assertion.go\n// หน้าที่: สาธิต Slice (append), Map, Variadic (...interface{}), และ Type Assertion\n// =============================================================================\npackage main\n\nimport \"fmt\"\n\n// PrintArgs รับค่ากี่ตัวก็ได้และเป็นชนิดใดก็ได้ผ่าน ...interface{} (Variadic Empty Interface)\nfunc PrintArgs(query string, args ...interface{}) {\n\tfmt.Printf(\"1) คำสั่ง SQL: %s | จำนวนพารามิเตอร์ที่ส่งมา: %d ตัว -> %v\\n\", query, len(args), args)\n}\n\nfunc main() {\n\t// 1. ทดสอบ Variadic (...interface{})\n\tPrintArgs(\"SELECT * FROM accounts WHERE owner=$1 AND balance>$2\", \"alice\", 1000)\n\n\t// 2. ทดสอบ Slice ([]string) และการต่อท้ายด้วย append()\n\tvar owners []string\n\towners = append(owners, \"alice\")\n\towners = append(owners, \"bob\")\n\tfmt.Println(\"2) รายชื่อใน Slice:\", owners, \"(จำนวน:\", len(owners), \"คน)\")\n\n\t// 3. ทดสอบ Map (map[int]bool) ใช้เช็กว่าเลขรอบการโอนเงินเคยปรากฏหรือยัง\n\texisted := make(map[int]bool)\n\texisted[1] = true\n\tfmt.Println(\"3) รอบที่ 1 เคยทำหรือยัง?:\", existed[1], \"| รอบที่ 2 เคยทำหรือยัง?:\", existed[2])\n\n\t// 4. ทดสอบ Type Assertion (แกะค่าจาก interface{} ออกมาเป็นชนิดข้อมูลจริง)\n\tvar rawValue interface{} = \"USD\"\n\tif currency, ok := rawValue.(string); ok {\n\t\tfmt.Println(\"4) แกะค่า Type Assertion สำเร็จ สกุลเงินคือ:\", currency)\n\t}\n}",
          "out": "1) คำสั่ง SQL: SELECT * FROM accounts WHERE owner=$1 AND balance>$2 | จำนวนพารามิเตอร์ที่ส่งมา: 2 ตัว -> [alice 1000]\n2) รายชื่อใน Slice: [alice bob] (จำนวน: 2 คน)\n3) รอบที่ 1 เคยทำหรือยัง?: true | รอบที่ 2 เคยทำหรือยัง?: false\n4) แกะค่า Type Assertion สำเร็จ สกุลเงินคือ: USD"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`...interface{}` (Variadic Empty Interface)**: จุดสามจุด `...` แปลว่ารับพารามิเตอร์ได้ตั้งแต่ 0 ถึงหลายตัว ส่วน `interface{}` (หรือ `any`) แปลว่ารับข้อมูลชนิดใดก็ได้ (ทั้ง `int64`, `string`, `time.Time`) คุณจะเห็นสิ่งนี้ใน `DBTX` ตอนส่งค่าเข้า Placeholder `$1, $2, $3`",
            "**`var items []Account` และ `append(items, i)`**: ใช้ในฟังก์ชัน `ListAccounts` (บทที่ 3.1) เพื่อวนลูปเก็บแถวบัญชีทีละแถวใส่รายการแล้วส่งกลับเป็น JSON Array",
            "**`existed := make(map[int]bool)`**: ใช้ใน `TestTransferTx` (บทที่ 5.3) เพื่อบันทึกว่าลำดับการหักเงินรอบที่ `k` เคยเกิดขึ้นไปแล้วหรือยัง",
            "**`rawValue.(string)` และ `ctx.MustGet(...).(*token.Payload)`**: เรียกว่า **Type Assertion** คือการแปลงข้อมูลจากกล่องกลาง (`interface{}`) กลับมาเป็นชนิดข้อมูลจริง เพื่อนำฟิลด์ข้างในไปใช้งานต่อ"
          ]
        },
        {
          "t": "h2",
          "c": "กลไกที่ 7: Higher-Order Functions & Closures (ฟังก์ชันซ้อนฟังก์ชัน)"
        },
        {
          "t": "p",
          "c": "ในภาษา Go ฟังก์ชันถือเป็นข้อมูลชั้นหนึ่ง (First-Class Citizen) แปลว่าเราสามารถ **ส่งฟังก์ชันทั้งก้อนเข้าไปเป็นพารามิเตอร์ของอีกฟังก์ชันหนึ่ง (Callback)** หรือ **สร้างฟังก์ชันที่คืนค่าออกมาเป็นฟังก์ชันอีกตัว (Closure)** ได้ ซึ่ง Simple Bank ใช้ท่านี้ใน 2 จุดที่สำคัญที่สุดของระบบ:"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างที่ 7: closure_and_callback.go",
          "code": "// =============================================================================\n// ไฟล์: closure_and_callback.go\n// หน้าที่: สาธิต Callback Function (ต้นแบบของ execTx) และ Closure (ต้นแบบของ Middleware)\n// =============================================================================\npackage main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\n// execTx จำลอง Transaction Manager ที่รับฟังก์ชัน fn เข้ามารันตรงกลางระหว่าง BEGIN และ COMMIT/ROLLBACK\nfunc execTx(fn func() error) error {\n\tfmt.Println(\"[DB] 1. BEGIN TRANSACTION\")\n\n\t// รันฟังก์ชันงานย่อยที่ผู้เรียกส่งเข้ามา\n\terr := fn()\n\tif err != nil {\n\t\tfmt.Println(\"[DB] 2. ตรวจพบ Error -> สั่ง ROLLBACK อัตโนมัติ!\")\n\t\treturn err\n\t}\n\n\tfmt.Println(\"[DB] 2. งานสำเร็จครบถ้วน -> สั่ง COMMIT!\")\n\treturn nil\n}\n\nfunc main() {\n\tfmt.Println(\"--- เคสที่ 1: โอนเงินสำเร็จ ---\")\n\t_ = execTx(func() error {\n\t\tfmt.Println(\"   -> หักเงิน Alice 100 บาท และเพิ่มเงิน Bob 100 บาท\")\n\t\treturn nil\n\t})\n\n\tfmt.Println(\"\\n--- เคสที่ 2: โอนเงินล้มเหลวกลางคัน ---\")\n\t_ = execTx(func() error {\n\t\tfmt.Println(\"   -> หักเงิน Alice 100 บาทแล้ว แต่บัญชีปลายทางล่ม!\")\n\t\treturn errors.New(\"ปลายทางไม่พร้อมใช้งาน\")\n\t})\n}",
          "out": "--- เคสที่ 1: โอนเงินสำเร็จ ---\n[DB] 1. BEGIN TRANSACTION\n   -> หักเงิน Alice 100 บาท และเพิ่มเงิน Bob 100 บาท\n[DB] 2. งานสำเร็จครบถ้วน -> สั่ง COMMIT!\n\n--- เคสที่ 2: โอนเงินล้มเหลวกลางคัน ---\n[DB] 1. BEGIN TRANSACTION\n   -> หักเงิน Alice 100 บาทแล้ว แต่บัญชีปลายทางล่ม!\n[DB] 2. ตรวจพบ Error -> สั่ง ROLLBACK อัตโนมัติ!"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`fn func() error`**: พารามิเตอร์ `fn` ไม่ใช่ตัวแปรธรรมดา แต่เป็นฟังก์ชันที่ผู้เรียกส่งเข้ามาให้ `execTx` ช่วยครอบ `BEGIN` และ `ROLLBACK/COMMIT` ให้",
            "**Closure (การมองเห็นตัวแปรด้านนอก)**: สังเกตว่าในบทที่ 4.2 ตอนที่เราเขียน `store.execTx(ctx, func(q *Queries) error { result.Transfer, err = ... })` ตัวฟังก์ชันด้านในสามารถเข้าถึงและเขียนค่าลงในตัวแปร `result` และ `arg` ที่อยู่นอกตัวเองได้โดยตรง คุณสมบัตินี้เรียกว่า **Closure**"
          ]
        },
        {
          "t": "h2",
          "c": "กลไกที่ 8: คำสั่ง defer (การเก็บกวาดทรัพยากรแบบ LIFO)"
        },
        {
          "t": "p",
          "c": "คำสั่ง `defer` ใช้สั่งให้ Go จดจำคำสั่งบรรทัดนั้นไว้ แล้วนำมารัน **ในจังหวะสุดท้ายก่อนที่ฟังก์ชันกำลังจะจบลง (return)** เสมอ ไม่ว่าฟังก์ชันจะจบแบบปกติหรือจบเพราะเกิด Error กลางทาง:"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างที่ 8: defer_lifo.go",
          "code": "// =============================================================================\n// ไฟล์: defer_lifo.go\n// หน้าที่: สาธิตการทำงานของ defer ในการคืนทรัพยากรตามลำดับ LIFO (Last-In, First-Out)\n// =============================================================================\npackage main\n\nimport \"fmt\"\n\nfunc QueryAccounts() {\n\tfmt.Println(\"1. เปิดการเชื่อมต่อฐานข้อมูล (rows)\")\n\t// ทันทีที่เปิด Resource สำเร็จ ให้สั่ง defer ปิดไว้ล่วงหน้าทันที ป้องกันการลืมปิด!\n\tdefer fmt.Println(\"4. [defer #1] ปิด rows.Close() คืน Connection เข้าสระ (รันทีหลังสุด)\")\n\tdefer fmt.Println(\"3. [defer #2] บันทึกเวลาจบการทำงาน (ประกาศทีหลัง รันก่อนแบบ LIFO)\")\n\n\tfmt.Println(\"2. กำลังอ่านข้อมูลบัญชี Alice และ Bob...\")\n}\n\nfunc main() {\n\tQueryAccounts()\n}",
          "out": "1. เปิดการเชื่อมต่อฐานข้อมูล (rows)\n2. กำลังอ่านข้อมูลบัญชี Alice และ Bob...\n3. [defer #2] บันทึกเวลาจบการทำงาน (ประกาศทีหลัง รันก่อนแบบ LIFO)\n4. [defer #1] ปิด rows.Close() คืน Connection เข้าสระ (รันทีหลังสุด)"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**ใช้จริงใน `ListAccounts` (บทที่ 3.1)**: ทันทีที่เราเรียก `rows, err := q.db.QueryContext(...)` ผ่าน เราจะบรรทัดถัดไปว่า `defer rows.Close()` ทันที เพื่อการันตีว่า Connection จะถูกคืนกลับเข้า Pool 100% แม้ระหว่างอ่านข้อมูลจะเกิด Error ก็ตาม",
            "**ใช้จริงใน `Worker` (บทที่ 5.3)**: ใช้ `defer wg.Done()` เพื่อการันตีว่าเมื่อ Goroutine ทำงานจบ ตัวนับงานจะถูกลดลงเสมอ"
          ]
        },
        {
          "t": "h2",
          "c": "กลไกที่ 9: context.Context — ใบสั่งควบคุมเวลา (Timeout & Cancellation)"
        },
        {
          "t": "p",
          "c": "ในโค้ดของ Simple Bank แทบทุกฟังก์ชันจะมีพารามิเตอร์ตัวแรกสุดคือ `ctx context.Context` เสมอ หน้าที่ของมันคือเป็น **'สายสัญญาณควบคุมเวลาและการยกเลิกงาน'** เช่น ถ้าลูกค้ากดปิดแอปมือถือไปแล้ว หรือคิวรีฐานข้อมูลค้างนานเกินเวลาที่กำหนด `ctx` จะส่งสัญญาณสั่งยกเลิกคำสั่ง SQL ทันทีเพื่อไม่ให้เซิร์ฟเวอร์ค้าง:"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างที่ 9: context_timeout.go",
          "code": "// =============================================================================\n// ไฟล์: context_timeout.go\n// หน้าที่: สาธิตการใช้ context.Context ตัดการทำงานอัตโนมัติเมื่อคิวรีใช้เวลานานเกินกำหนด\n// =============================================================================\npackage main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc SlowQuery(ctx context.Context) error {\n\tfmt.Println(\">> เริ่มต้นคิวรีข้อมูลขนาดใหญ่ (ต้องใช้เวลา 200ms)...\")\n\tselect {\n\tcase <-time.After(200 * time.Millisecond):\n\t\tfmt.Println(\"   คิวรีสำเร็จ!\")\n\t\treturn nil\n\tcase <-ctx.Done(): // สัญญาณแจ้งเตือนเมื่อหมดเวลา (Timeout) หรือถูกสั่งยกเลิก\n\t\treturn ctx.Err()\n\t}\n}\n\nfunc main() {\n\t// ตั้งเวลา Timeout สูงสุดไว้ที่ 50ms เท่านั้น\n\tctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)\n\tdefer cancel()\n\n\tif err := SlowQuery(ctx); err != nil {\n\t\tfmt.Println(\">> ระบบตัดการทำงานอัตโนมัติ:\", err)\n\t}\n}",
          "out": ">> เริ่มต้นคิวรีข้อมูลขนาดใหญ่ (ต้องใช้เวลา 200ms)...\n>> ระบบตัดการทำงานอัตโนมัติ: context deadline exceeded"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`context.Background()`**: คือ Context ตั้งต้นแบบเปล่าๆ (ไม่มีวันหมดอายุ) มักใช้ใน `main.go` หรือในไฟล์ Unit Test (`account_test.go`)",
            "**`*gin.Context` ในบทที่ 6**: เมื่อคำขอวิ่งเข้ามาทาง HTTP ผ่าน Gin ตัวแปร `ctx *gin.Context` จะบรรจุทั้งข้อมูล HTTP Request และเป็น `context.Context` ในตัวเดียวกัน จึงส่งต่อเข้า `server.store.CreateAccount(ctx, arg)` ได้โดยตรง!"
          ]
        },
        {
          "t": "h2",
          "c": "กลไกที่ 10: Concurrency ครบวงจร — Goroutines, Channels และทำไม <-chan ถึงรอ Goroutine ได้โดยไม่ต้องง้อ WaitGroup"
        },
        {
          "t": "p",
          "c": "นี่คือหัวใจสำคัญที่สุดที่จะทำให้คุณเข้าใจบทที่ 5 (Concurrency & Deadlock Testing) อย่างทะลุปรุโปร่ง! มาทำความเข้าใจเครื่องมือทั้ง 3 ตัวและการทำงานร่วมกัน:"
        },
        {
          "t": "table",
          "head": [
            "เครื่องมือ Concurrency",
            "คำสั่งในโค้ด",
            "กลไกการทำงานจริงในหน่วยความจำ"
          ],
          "rows": [
            [
              "1. Goroutine",
              "go func() { ... }()",
              "แตกเธรดขนาดจิ๋ว (เริ่มต้นเพียง ~2KB) ไปรันฟังก์ชันนั้นแบบคู่ขนานใน Background ทันทีโดยไม่บล็อกบรรทัดถัดไป"
            ],
            [
              "2. Unbuffered Channel",
              "errs := make(chan error)",
              "ท่อส่งข้อมูลแบบไม่มีที่พัก: คนส่ง (errs <- err) และคนรับ (<-errs) จะต้องมาเจอกันพร้อมกัน ถ้าคนส่งยังส่งไม่มา คนรับจะ 'หยุดรอ (Block)' อัตโนมัติ!"
            ],
            [
              "3. Buffered Channel",
              "ch := make(chan string, 3)",
              "ท่อส่งข้อมูลที่มีกล่องพัก 3 ช่อง: คนส่งสามารถหย่อนข้อมูลใส่ท่อได้ทันที 3 ชิ้นโดยไม่ต้องรอคนรับ"
            ],
            [
              "4. sync.WaitGroup",
              "wg.Add(1) / wg.Done() / wg.Wait()",
              "ตัวนับจำนวนงานคู่ขนาน ใช้เมื่อเราต้องการรอให้ทุก Goroutine ทำงานจบโดยไม่ได้ดึงค่าผ่าน Channel ทีละรอบ"
            ]
          ]
        },
        {
          "t": "callout",
          "title": "💡 คำถามที่มือใหม่งงบ่อยที่สุด: ทำไมใน TestTransferTx (บทที่ 5.3) ถึงไม่ใช้ sync.WaitGroup?",
          "c": "ในบทที่ 5.3 เวลาเราปล่อย Goroutine 5 ตัวไปโอนเงินพร้อมกัน (`n := 5`) เราสร้างท่อ `errs := make(chan error)` และ `results := make(chan TransferTxResult)`\n\nจากนั้นในฟังก์ชันหลัก เราเขียนลูป `for i := 0; i < n; i++` แล้วสั่งดึงค่าจากท่อด้วย `err := <-errs` และ `result := <-results` จำนวน 5 รอบ!\n\nเนื่องจากคำสั่งดึงค่าจากท่อ (`<-errs`) มีคุณสมบัติ **Blocking (หยุดรอจนกว่าจะมีของส่งออกมาจากท่อ)** การวนลูปดึงค่าให้ครบ `n` รอบจึงทำหน้าที่ **บังคับให้ฟังก์ชันหลักหยุดรอจนกว่า Goroutine ทั้ง 5 ตัวจะส่งผลลัพธ์กลับมาครบทุกตัวโดยอัตโนมัติ** จึงไม่จำเป็นต้องเขียน `sync.WaitGroup` ซ้ำซ้อนนั่นเอง!"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างที่ 10: goroutines_and_channels.go (รูปแบบเดียวกับที่ใช้ใน TestTransferTx)",
          "code": "// =============================================================================\n// ไฟล์: goroutines_and_channels.go\n// หน้าที่: สาธิตการปล่อยหลาย Goroutines ทำงานพร้อมกัน และใช้ Channel รวบรวมผลลัพธ์\n// แก้ปัญหา: เข้าใจกลไก Blocking ของ Channel (<-ch) ที่ใช้ในชุดทดสอบการโอนเงินคู่ขนาน\n// =============================================================================\npackage main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tn := 3\n\t// ขั้นตอนที่ 1: สร้างท่อ Channel สำหรับรับ error และผลลัพธ์ยอดเงิน\n\terrs := make(chan error)\n\tresults := make(chan int64)\n\n\tfmt.Println(\">> ปล่อย 3 Goroutines โอนเงินพร้อมกันในเสี้ยววินาทีเดียวกัน...\")\n\n\t// ขั้นตอนที่ 2: วนลูปแตก Goroutine 3 ตัวด้วย Anonymous Function: go func(i int) { ... }(i)\n\tfor i := 1; i <= n; i++ {\n\t\tgo func(workerID int) {\n\t\t\t// จำลองการคุยกับฐานข้อมูล\n\t\t\ttime.Sleep(10 * time.Millisecond)\n\n\t\t\t// ส่ง error (nil = สำเร็จ) และยอดเงินที่โอนสำเร็จเข้าท่อ Channel\n\t\t\terrs <- nil\n\t\t\tresults <- int64(workerID * 100)\n\t\t}(i)\n\t}\n\n\t// ขั้นตอนที่ 3: วนลูปดึงข้อมูลออกจากท่อให้ครบ n รอบ\n\t// บรรทัด <-errs และ <-results จะหยุดรอ (Block) จนกว่า Goroutine จะส่งค่ามาครบทั้ง 3 ตัว!\n\tfor i := 1; i <= n; i++ {\n\t\terr := <-errs\n\t\tamount := <-results\n\t\tfmt.Printf(\"   [รอบรับผลที่ %d] err=%v | ยอดโอนที่เสร็จ=%d บาท\\n\", i, err, amount)\n\t}\n\n\tfmt.Println(\">> รับผลลัพธ์ครบทั้ง 3 Goroutines อย่างปลอดภัย!\")\n}",
          "out": ">> ปล่อย 3 Goroutines โอนเงินพร้อมกันในเสี้ยววินาทีเดียวกัน...\n   [รอบรับผลที่ 1] err=<nil> | ยอดโอนที่เสร็จ=100 บาท\n   [รอบรับผลที่ 2] err=<nil> | ยอดโอนที่เสร็จ=200 บาท\n   [รอบรับผลที่ 3] err=<nil> | ยอดโอนที่เสร็จ=300 บาท\n>> รับผลลัพธ์ครบทั้ง 3 Goroutines อย่างปลอดภัย!"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างเพิ่มเติม 10.1: concurrency_demo.go (การใช้ Goroutine คู่กับ sync.WaitGroup และ Buffered Channel)",
          "code": "// =============================================================================\n// ไฟล์: concurrency_demo.go\n// หน้าที่: สาธิตการทำงานคู่ขนานด้วย Goroutines, Channels, และ sync.WaitGroup\n// แก้ปัญหา: การประมวลผลงานหลายชิ้นพร้อมกันโดยไม่บล็อก และส่งข้อมูลผลลัพธ์กลับมาอย่างปลอดภัยโดยไม่ต้องใช้ Lock\n// =============================================================================\npackage main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n\t\"time\"\n)\n\n// Worker จำลองคนงานที่ทำงานแบบ Asynchronous ใน Goroutine\nfunc Worker(id int, ch chan<- string, wg *sync.WaitGroup) {\n\t// 1. แจ้งเตือน WaitGroup เมื่องานเสร็จสิ้น (รันผ่าน defer เพื่อความแน่นอน)\n\tdefer wg.Done()\n\n\t// 2. จำลองเวลาประมวลผลธุรกรรม\n\ttime.Sleep(time.Duration(id*10) * time.Millisecond)\n\n\t// 3. ส่งข้อมูลผลลัพธ์ผ่าน Channel ไปยังฟังก์ชันหลัก\n\tch <- fmt.Sprintf(\"Goroutine #%d: ประมวลผลธุรกรรมสำเร็จ\", id)\n}\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tresultChan := make(chan string, 3) // สร้าง Channel แบบ Buffered ขนาด 3 ช่อง\n\n\t// 1. ปล่อย 3 Goroutines ให้ทำงานคู่ขนานกันในเวลาเดียวกัน\n\tfmt.Println(\">> ปล่อย 3 Goroutines ทำงานคู่ขนานพร้อมกัน...\")\n\tfor i := 1; i <= 3; i++ {\n\t\twg.Add(1) // เพิ่มตัวนับงานใน WaitGroup ทีละ 1\n\t\tgo Worker(i, resultChan, &wg)\n\t}\n\n\t// 2. รอจนกว่าคนงานทั้ง 3 คนจะทำงานเสร็จ (ตัวนับลดลงเหลือ 0)\n\twg.Wait()\n\tclose(resultChan) // ปิด Channel เมื่อส่งข้อมูลครบถ้วน ป้องกัน Deadlock\n\n\t// 3. วนลูปอ่านข้อมูลผลลัพธ์ทั้งหมดที่ส่งออกมาจาก Channel\n\tfmt.Println(\">> ได้รับผลลัพธ์จาก Channel ครบทั้งหมด:\")\n\tfor msg := range resultChan {\n\t\tfmt.Println(\"  \", msg)\n\t}\n}",
          "out": ">> ปล่อย 3 Goroutines ทำงานคู่ขนานพร้อมกัน...\n>> ได้รับผลลัพธ์จาก Channel ครบทั้งหมด:\n   Goroutine #1: ประมวลผลธุรกรรมสำเร็จ\n   Goroutine #2: ประมวลผลธุรกรรมสำเร็จ\n   Goroutine #3: ประมวลผลธุรกรรมสำเร็จ"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างเพิ่มเติม 10.1: concurrency_demo.go (การใช้ Goroutine คู่กับ sync.WaitGroup และ Buffered Channel)",
          "code": "// =============================================================================\n// ไฟล์: concurrency_demo.go\n// หน้าที่: สาธิตการทำงานคู่ขนานด้วย Goroutines, Channels, และ sync.WaitGroup\n// แก้ปัญหา: การประมวลผลงานหลายชิ้นพร้อมกันโดยไม่บล็อก และส่งข้อมูลผลลัพธ์กลับมาอย่างปลอดภัยโดยไม่ต้องใช้ Lock\n// =============================================================================\npackage main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n\t\"time\"\n)\n\n// Worker จำลองคนงานที่ทำงานแบบ Asynchronous ใน Goroutine\nfunc Worker(id int, ch chan<- string, wg *sync.WaitGroup) {\n\t// 1. แจ้งเตือน WaitGroup เมื่องานเสร็จสิ้น (รันผ่าน defer เพื่อความแน่นอน)\n\tdefer wg.Done()\n\n\t// 2. จำลองเวลาประมวลผลธุรกรรม\n\ttime.Sleep(time.Duration(id*10) * time.Millisecond)\n\n\t// 3. ส่งข้อมูลผลลัพธ์ผ่าน Channel ไปยังฟังก์ชันหลัก\n\tch <- fmt.Sprintf(\"Goroutine #%d: ประมวลผลธุรกรรมสำเร็จ\", id)\n}\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tresultChan := make(chan string, 3) // สร้าง Channel แบบ Buffered ขนาด 3 ช่อง\n\n\t// 1. ปล่อย 3 Goroutines ให้ทำงานคู่ขนานกันในเวลาเดียวกัน\n\tfmt.Println(\">> ปล่อย 3 Goroutines ทำงานคู่ขนานพร้อมกัน...\")\n\tfor i := 1; i <= 3; i++ {\n\t\twg.Add(1) // เพิ่มตัวนับงานใน WaitGroup ทีละ 1\n\t\tgo Worker(i, resultChan, &wg)\n\t}\n\n\t// 2. รอจนกว่าคนงานทั้ง 3 คนจะทำงานเสร็จ (ตัวนับลดลงเหลือ 0)\n\twg.Wait()\n\tclose(resultChan) // ปิด Channel เมื่อส่งข้อมูลครบถ้วน ป้องกัน Deadlock\n\n\t// 3. วนลูปอ่านข้อมูลผลลัพธ์ทั้งหมดที่ส่งออกมาจาก Channel\n\tfmt.Println(\">> ได้รับผลลัพธ์จาก Channel ครบทั้งหมด:\")\n\tfor msg := range resultChan {\n\t\tfmt.Println(\"  \", msg)\n\t}\n}",
          "out": ">> ปล่อย 3 Goroutines ทำงานคู่ขนานพร้อมกัน...\n>> ได้รับผลลัพธ์จาก Channel ครบทั้งหมด:\n   Goroutine #1: ประมวลผลธุรกรรมสำเร็จ\n   Goroutine #2: ประมวลผลธุรกรรมสำเร็จ\n   Goroutine #3: ประมวลผลธุรกรรมสำเร็จ"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`go func(workerID int) { ... }(i)`**: คือการประกาศฟังก์ชันไร้ชื่อ (Anonymous Function) แล้วสั่งรันเป็น Goroutine ทันทีด้วยวงเล็บ `(i)` ด้านท้ายสุด",
            "**`errs <- nil` (ส่งค่าเข้าท่อ)**: ลูกศรชี้เข้าหาชื่อตัวแปรท่อ แปลว่าหย่อนข้อมูลจากขวาเข้าไปในท่อด้านซ้าย",
            "**`err := <-errs` (ดึงค่าออกจากท่อ)**: ลูกศรชี้ออกจากท่อไปหาตัวแปรซ้ายมือ แปลว่าดึงข้อมูลออกจากท่อมาเก็บไว้ในตัวแปร `err`"
          ]
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• ตอนนี้คุณมีอาวุธครบมือทั้ง 10 กลไกของภาษา Go แล้ว ไม่ว่าจะเป็น `_, err`, Struct & Pointer (`*`, `&`), Method Receiver, Embedding, Interface, Slice/Map, Closure, `defer`, `context.Context`, และ `Goroutine + Channel`\n• **ก้าวต่อไป (บทที่ 2.1)**: เราจะเริ่มเข้าสู่โปรเจกต์ Simple Bank ของจริง โดยเริ่มจากการออกแบบโครงสร้างฐานข้อมูลบัญชีแยกประเภท (Immutable Double-Entry Ledger) ทั้ง 3 ตารางกันครับ!"
        }
      ],
      "en": []
    }
  }
};
