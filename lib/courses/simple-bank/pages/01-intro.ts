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
      "th": "1.2 Go จากศูนย์สำหรับระบบ Backend (Core Mechanics & Mental Models)",
      "en": "1.2 Go from Zero for Backend Systems (Core Mechanics & Mental Models)"
    },
    "lead": {
      "th": "คู่มือเปลี่ยนวิธีคิดสู่ภาษา Go สำหรับวิศวกรระบบ Backend: เจาะลึกโมเดลหน่วยความจำ Pointer, สถาปัตยกรรมไร้ Class (Struct Embedding), ปรัชญา Error ไร้ Try-Catch, ไปจนถึง Concurrency 10,000 คำขอพร้อมกันอย่างปลอดภัย",
      "en": "Master Go's core mechanics through a backend engineering lens: Memory mental models, Pointer mechanics, Class-free composition, explicit error handling, and high-concurrency Goroutines."
    },
    "group": "1. ปูพื้นฐานระบบการเงิน & ภาษา Go จากศูนย์",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 เข็มทิศวิธีคิด & แผนที่การเรียนรู้ (Backend Engineer's Mental Compass)",
          "c": "• **ลบภาพจำเดิม**: ภาษา Go ไม่ได้ถูกสร้างมาให้เหมือน Python, Java หรือ Node.js การเขียน Go ให้เข้าใจต้องเริ่มจากการเปลี่ยน **'วิธีคิด (Mental Model)'** จากระบบ OOP แบบคลาสและระบบ Exception ที่ซ่อนความผิดพลาด มาเป็นระบบที่ **ชัดเจน ตรงไปตรงมา คาดเดาง่าย (Explicit & Predictable)**\n• **ภารกิจในบทนี้**: เราจะเจาะลึก 10 กลไกสำคัญของ Go ผ่านมุมมองของวิศวกร Backend โดยแบ่งเป็น 4 องก์ (Acts) ตั้งแต่หน่วยความจำบน RAM จนถึงระบบ Concurrency ระดับหมื่นคำขอพร้อมกัน\n• **วิธีเรียนรู้**: โค้ดทุกตัวอย่างในบทนี้เป็นโค้ดที่รันได้จริง พร้อมผลลัพธ์ Terminal และคำอธิบายเชื่อมโยงสู่ไฟล์จริงในโปรเจกต์ Simple Bank ที่เราจะได้ลงมือเขียนในบทถัดไป"
        },
        {
          "t": "h2",
          "c": "0. ปรัชญาภาษา Go: ทำไมระบบ Backend & Cloud ระดับโลกถึงสร้างด้วย Go?"
        },
        {
          "t": "p",
          "c": "Google ออกแบบภาษา Go ขึ้นมาเพื่อแก้ปัญหาของระบบ Backend สเกลยักษ์ที่ภาษาในอดีตสร้างภาระไว้: C++ คอมไพล์ช้าและจัดการหน่วยความจำยาก, Java มีความซับซ้อนของ Class Hierarchy สูงและกินแรมมหาศาล, ส่วน Python / Node.js ก็ติดคอขวดด้าน CPU และขาด Type Safety ในระดับคอมไพเลอร์\n\nหัวใจของ Go คือ **'No Magic (ไม่มีเวทมนตร์แอบแฝง)'** — ไม่มี Inheritance ซับซ้อน, ไม่มี Exception กระโดดข้ามหัว, ไม่มี Runtime VM หนักๆ ทุกอย่างคอมไพล์เป็น Single Binary ไฟล์เดียวที่สตาร์ตเร็วระดับมิลลิวินาที และกินแรมเริ่มต้นเพียงไม่กี่เมกะไบต์:"
        },
        {
          "t": "table",
          "head": [
            "มิติการทำงาน",
            "ภาษาอื่น (Python / Java / Node.js)",
            "ภาษา Go (ทำไมถึงเหมาะกับ Backend?)"
          ],
          "rows": [
            [
              "รูปแบบการทำงาน (Runtime)",
              "ต้องพึ่งพา Interpreter / JVM / V8 Engine มี Warm-up time",
              "คอมไพล์ตรงเป็น Native Machine Code ไฟล์เดียว รันได้ทันที ไม่ต้องลง Runtime ใน Docker"
            ],
            [
              "โมเดล Concurrency",
              "Java ใช้ OS Thread (กินแรม ~1-2MB/เธรด), Node.js เป็น Single-Thread Event Loop",
              "Goroutine ขนาดจิ๋ว (~2KB) รันพร้อมกันได้หลักหมื่นถึงแสนตัวบนเครื่องเดียว"
            ],
            [
              "การจัดการข้อผิดพลาด",
              "ใช้ Exception (`try / catch`) ที่อาจระเบิดข้ามฟังก์ชันโดยไม่รู้ตัว",
              "Explicit Error Value (`val, err`) บังคับให้ตรวจสอบข้อผิดพลาดอย่างชัดเจนทุกจุด"
            ],
            [
              "โครงสร้างสถาปัตยกรรม",
              "Class Inheritance (`extends`) ลึกหลายชั้น เกิดปัญหา Fragile Base Class",
              "Composition (`Struct Embedding`) และ Implicit Interface ยืดหยุ่นและ Mock เทสต์ง่าย"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "องก์ที่ 1: หน่วยความจำ & โครงสร้างข้อมูล (Memory & Structs)"
        },
        {
          "t": "h3",
          "c": "กลไกที่ 1: Pass-by-Value vs Pointer (* vs &) — ถ่ายเอกสารสำเนา หรือ ส่งพิกัดจริง?"
        },
        {
          "t": "p",
          "c": "นี่คือจุดที่ทำให้ผู้เริ่มต้นเขียน Go สับสนมากที่สุด หากคุณเข้าใจภาพนี้ โค้ด Go ทั้งหมดจะกระจ่างทันที:\n\nตามค่าเริ่มต้น ภาษา Go ทำงานแบบ **Pass-by-Value (ส่งสำเนาเสมอ)** เมื่อคุณส่งตัวแปรหรือ Struct เข้าไปในฟังก์ชัน Go จะ **ถ่ายเอกสารก๊อบปี้ข้อมูลขึ้นมาใหม่อีกชุดหนึ่งบนหน่วยความจำ RAM** ฟังก์ชันปลายทางจะได้แค่กระดาษสำเนาไปขีดเขียน ซึ่งไม่มีผลกระทบใดๆ กับเอกสารต้นฉบับเลย!\n\nหากคุณต้องการให้ฟังก์ชันแก้ไขข้อมูลต้นฉบับได้ หรือต้องการส่งก้อนข้อมูลขนาดใหญ่ (เช่น ข้อมูลการเชื่อมต่อฐานข้อมูล `*sql.DB`) โดยไม่ต้องเปลืองแรมถ่ายเอกสารซ้ำ คุณต้องส่ง **Pointer (พิกัดที่อยู่บน RAM)**:"
        },
        {
          "t": "callout",
          "title": "💡 ปริศนาที่ทุกคนเคยสงสัย: ทำไม row.Scan(&i.ID, &i.Balance) ในบทที่ 3 ต้องใส่ & ทุกตัว?",
          "c": "ลองนึกภาพ: ฟังก์ชัน `row.Scan` คือพนักงานไปรษณีย์ที่ถือข้อมูลจากฐานข้อมูลมาส่งให้คุณ\n\n• ถ้าคุณเขียน `row.Scan(i.ID, i.Balance)`: คุณกำลังยื่น **'ภาพถ่ายกล่องเปล่า'** ให้พนักงานไปรษณีย์ พนักงานก็หยอดของใส่ภาพถ่ายนั้น เมื่อฟังก์ชันจบลง ตัวแปร `i.ID` ตัวจริงของคุณก็ยังคงเป็นเลข 0 ว่างเปล่าเหมือนเดิม!\n• แต่เมื่อคุณเขียน `row.Scan(&i.ID, &i.Balance)`: เครื่องหมาย `&` แปลว่าคุณยื่น **'พิกัดที่อยู่บ้านบน GPS'** ให้พนักงาน พนักงานจึงสามารถเดินไปยังตำแหน่งตู้จดหมายจริงบน RAM ของคุณ และหยอดข้อมูลจาก Database ใส่ลงในตัวแปรตัวจริงของคุณได้อย่างถูกต้อง 100%!"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "01_pointer_and_scan.go",
          "code": "// =============================================================================\n// ไฟล์: 01_pointer_and_scan.go\n// หน้าที่: เปรียบเทียบ Pass-by-Value กับ Pass-by-Pointer และจำลองกลไก row.Scan\n// =============================================================================\npackage main\n\nimport \"fmt\"\n\ntype Account struct {\n\tID      int64\n\tBalance int64\n}\n\n// 1. Pass-by-Value: ส่งสำเนา การแก้ไขไม่มีผลกับตัวแปรต้นฉบับ\nfunc UpdateByValue(acc Account) {\n\tacc.Balance += 500\n}\n\n// 2. Pass-by-Pointer: ส่งพิกัดหน่วยความจำ (&) แก้ไขตัวแปรต้นฉบับได้โดยตรง\nfunc UpdateByPointer(acc *Account) {\n\tacc.Balance += 500\n}\n\n// 3. จำลองการทำงานของ row.Scan ใน database/sql\n// รับพิกัดหน่วยความจำ (*int64) เพื่อนำค่าจากฐานข้อมูลไปหยอดใส่ตัวแปรต้นฉบับ\nfunc SimulateDbScan(idDest *int64, balanceDest *int64) {\n\t*idDest = 101       // หยอด ID จากแถวข้อมูลใน DB\n\t*balanceDest = 2500 // หยอด Balance จากแถวข้อมูลใน DB\n}\n\nfunc main() {\n\tuserAcc := Account{ID: 1, Balance: 1000}\n\n\t// ทดสอบ Pass-by-Value\n\tUpdateByValue(userAcc)\n\tfmt.Printf(\"1) หลัง UpdateByValue: Balance = %d (ไม่เปลี่ยน เพราะแก้ในสำเนา!)\\n\", userAcc.Balance)\n\n\t// ทดสอบ Pass-by-Pointer (ส่ง &userAcc)\n\tUpdateByPointer(&userAcc)\n\tfmt.Printf(\"2) หลัง UpdateByPointer(&userAcc): Balance = %d (เปลี่ยนจริง!)\\n\", userAcc.Balance)\n\n\t// ทดสอบ SimulateDbScan (เสมือน row.Scan(&dest.ID, &dest.Balance))\n\tvar scannedAcc Account\n\tSimulateDbScan(&scannedAcc.ID, &scannedAcc.Balance)\n\tfmt.Printf(\"3) หลัง SimulateDbScan(&ID, &Balance): ID = %d, Balance = %d\\n\", scannedAcc.ID, scannedAcc.Balance)\n}",
          "out": "1) หลัง UpdateByValue: Balance = 1000 (ไม่เปลี่ยน เพราะแก้ในสำเนา!)\n2) หลัง UpdateByPointer(&userAcc): Balance = 1500 (เปลี่ยนจริง!)\n3) หลัง SimulateDbScan(&ID, &Balance): ID = 101, Balance = 2500"
        },
        {
          "t": "h3",
          "c": "🔍 ถอดรหัสสัญลักษณ์ * vs & และกฎเหล็กสำหรับ Backend"
        },
        {
          "t": "ul",
          "c": [
            "**`&` (Address-of Operator)**: วางหน้าตัวแปรเพื่อขอ \"พิกัดที่อยู่บน RAM\" (เช่น `&acc` คือขอพิกัดของตัวแปร `acc`)",
            "**`*` ในการประกาศชนิดข้อมูล (`*Account`)**: ระบุว่าตัวแปรนี้ไม่ใช่ก้อนข้อมูลธรรมดา แต่เป็นตัวแปรที่ใช้เก็บ \"พิกัดที่อยู่\" เพื่อชี้ไปยัง Struct `Account`",
            "**`*` ในการเข้าถึงค่า (`*ptr = value`)**: เรียกว่า Dereferencing คือการเดินตามพิกัดไปเปิดกล่องจริงบน RAM เพื่ออ่านหรือเขียนค่า",
            "**กฎเหล็กในโปรเจกต์ Simple Bank**: ออบเจกต์จัดการระบบที่เป็นตัวควบคุมกลาง เช่น `*sql.DB`, `*Queries`, `*Store`, `*Server`, และ `*gin.Context` เราจะส่งต่อด้วย Pointer (`*`) เสมอ เพื่อให้ทุกเลเยอร์ทำงานกับตัวควบคุมตัวจริงร่วมกันทั้งระบบ"
          ]
        },
        {
          "t": "h3",
          "c": "กลไกที่ 2: Struct & Method Receiver — Go ทำงานแบบ OOP ได้อย่างไรโดยไร้ class?"
        },
        {
          "t": "p",
          "c": "ในภาษา Go **ไม่มีคีย์เวิร์ด `class`** แต่ Go ใช้ `type ... struct` เป็นกล่องเก็บข้อมูล (State) แล้วผูกฟังก์ชันเข้ากับ Struct นั้นด้วยกลไกที่เรียกว่า **Method Receiver (ตัวรับเมธอด)** ซึ่งสังเกตได้จากวงเล็บหน้าชื่อฟังก์ชัน เช่น `func (a *Account) Deposit(...)`:"
        },
        {
          "t": "table",
          "head": [
            "รูปแบบ Receiver",
            "ตัวอย่างไวยากรณ์",
            "พฤติกรรมในหน่วยความจำ",
            "เลือกใช้เมื่อไหร่?"
          ],
          "rows": [
            [
              "Value Receiver",
              "func (a Account) GetBalance()",
              "Go ถ่ายเอกสารสำเนาของ Struct เข้ามาในเมธอด",
              "เมื่อต้องการ 'อ่านข้อมูลอย่างเดียว' และ Struct มีขนาดเล็กมาก ป้องกันไม่ให้ใครเผลอแก้ไขค่าต้นฉบับ"
            ],
            [
              "Pointer Receiver",
              "func (a *Account) Deposit()",
              "Go ส่งพิกัดหน่วยความจำ (&) ของ Struct เข้ามาโดยตรง",
              "เมื่อต้องการ 'แก้ไขค่าใน Struct' (เช่น ฝากเงิน, เปลี่ยนสถานะ) หรือเมื่อ Struct มีฟิลด์เยอะเพื่อหลีกเลี่ยงต้นทุนการคัดลอกข้อมูล"
            ]
          ]
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "02_struct_and_receiver.go",
          "code": "// =============================================================================\n// ไฟล์: 02_struct_and_receiver.go\n// หน้าที่: นิยาม Struct, สร้างเมธอดแบบ Value vs Pointer Receiver และ Struct Tags\n// =============================================================================\npackage main\n\nimport (\n\t\"encoding/json\"\n\t\"fmt\"\n)\n\n// Account นิยามโครงสร้างข้อมูล พร้อม Struct Tags สำหรับแปลงเป็น JSON\ntype Account struct {\n\tID       int64  `json:\"id\"`\n\tOwner    string `json:\"owner\"`\n\tBalance  int64  `json:\"balance\"`\n\tCurrency string `json:\"currency\"`\n}\n\n// Value Receiver (a Account): อ่านข้อมูลอย่างเดียว ไม่แก้ไขสถานะ\nfunc (a Account) GetBalance() int64 {\n\treturn a.Balance\n}\n\n// Pointer Receiver (a *Account): แก้ไขยอดเงินในบัญชีตัวจริง\nfunc (a *Account) Deposit(amount int64) {\n\ta.Balance += amount\n}\n\nfunc main() {\n\tacc := &Account{ID: 1, Owner: \"alice\", Balance: 1000, Currency: \"THB\"}\n\n\tfmt.Printf(\"ยอดเงินเริ่มต้น: %d %s\\n\", acc.GetBalance(), acc.Currency)\n\n\t// เรียก Pointer Receiver เพื่อฝากเงิน\n\tacc.Deposit(500)\n\tfmt.Printf(\"ยอดเงินหลังฝาก (Deposit 500): %d %s\\n\", acc.GetBalance(), acc.Currency)\n\n\t// แปลง Struct เป็น JSON อัตโนมัติตาม Struct Tag\n\tjsonData, _ := json.Marshal(acc)\n\tfmt.Println(\"JSON Output:\", string(jsonData))\n}",
          "out": "ยอดเงินเริ่มต้น: 1000 THB\nยอดเงินหลังฝาก (Deposit 500): 1500 THB\nJSON Output: {\"id\":1,\"owner\":\"alice\",\"balance\":1500,\"currency\":\"THB\"}"
        },
        {
          "t": "h3",
          "c": "🔍 Struct Tags: สะพานเชื่อมระหว่าง Go กับ JSON และ Database"
        },
        {
          "t": "ul",
          "c": [
            "**Struct Tag (ข้อความใน Backticks)**: สังเกตด้านหลังฟิลด์ เช่น `` `json:\"balance\"` `` นี่คือ Metadata ที่บอกแพ็กเกจ JSON ของ Go ว่า เวลาแปลง Struct เป็น JSON (Serialization) ให้ตั้งชื่อคีย์ใน JSON ว่า `balance` ตัวพิมพ์เล็กตามมาตรฐาน REST API",
            "**การกำหนดสิทธิ์การมองเห็น (Public vs Private)**: ใน Go ตัวแปรหรือฟิลด์ที่ขึ้นต้นด้วย **ตัวพิมพ์ใหญ่ (Capital letter)** เช่น `Balance`, `Owner` จะเป็น Public (แพ็กเกจอื่นมองเห็นและแปลงเป็น JSON ได้) หากขึ้นต้นด้วยตัวพิมพ์เล็กจะเป็น Private (มีผลเฉพาะภายในแพ็กเกจนั้น)"
          ]
        },
        {
          "t": "h2",
          "c": "องก์ที่ 2: ความน่าเชื่อถือระดับระบบการเงิน (Errors & Resource Safety)"
        },
        {
          "t": "h3",
          "c": "กลไกที่ 3: ปรัชญา Error ของ Go — ทำไม Go ถึงปฏิเสธ try / catch?"
        },
        {
          "t": "p",
          "c": "ในภาษาอย่าง Java, Python หรือ TypeScript เมื่อเกิดข้อผิดพลาด โปรแกรมจะขว้าง Exception (`throw new Error()`) ซึ่งเปรียบเสมือน 'ลูกระเบิดล่องหน' ที่กระโดดข้ามบรรทัดโค้ดข้ามเลเยอร์ไปหาบล็อก `catch` ที่ไหนสักแห่ง หากวิศวกรลืมครอบ `catch` ไว้ โปรแกรมจะแครชทันที หรือที่เลวร้ายกว่านั้นคือ มันกระโดดข้ามคำสั่งบันทึกบัญชี ทำให้ระบบการเงินเสียสมดุล\n\nGo ออกแบบด้วยแนวคิดว่า: **'ข้อผิดพลาดไม่ใช่ข้อยกเว้น แต่คือผลลัพธ์ปกติของการทำงาน (Errors are Values)'** ฟังก์ชันใน Go จึงคืนค่าผลลัพธ์คู่กับ `error` เสมอในรูปแบบ `(Value, error)`:"
        },
        {
          "t": "callout",
          "title": "⚠️ กฎเหล็กของระบบธนาคาร: เช็ก Error ก่อนจับต้องข้อมูลเสมอ!",
          "c": "ใน Simple Bank ทุกคำสั่งที่คุยกับฐานข้อมูล (SQL) หรือคุยข้ามเครือข่าย (HTTP) จะคืนค่า `error` ออกมาด้วยเสมอ หาก `err != nil` (ไม่เท่ากับว่างเปล่า) แปลว่าเกิดข้อผิดพลาด คุณต้องหยุดการทำงานทันทีแล้วส่งรายงานปัญหาออกไป ห้ามนำข้อมูลในช่องแรกไปใช้งานต่อเด็ดขาด!",
          "warn": true
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "03_explicit_error_handling.go",
          "code": "// =============================================================================\n// ไฟล์: 03_explicit_error_handling.go\n// หน้าที่: แสดงกลไก Multiple Return Values, การดักจับ error และ blank identifier (_)\n// =============================================================================\npackage main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\n// Withdraw หักเงินจากบัญชี โดยคืนค่าทั้งยอดเงินคงเหลือใหม่ และก้อน error\nfunc Withdraw(balance int64, amount int64) (int64, error) {\n\tif amount <= 0 {\n\t\treturn 0, errors.New(\"จำนวนเงินที่ถอนต้องมากกว่า 0\")\n\t}\n\tif balance < amount {\n\t\treturn 0, errors.New(\"ยอดเงินคงเหลือไม่เพียงพอสำหรับการถอน\")\n\t}\n\treturn balance - amount, nil\n}\n\nfunc main() {\n\tcurrentBalance := int64(1000)\n\n\t// กรณีที่ 1: ถอนเงินสำเร็จ (err เป็น nil)\n\tnewBal, err := Withdraw(currentBalance, 400)\n\tif err != nil {\n\t\tfmt.Println(\"ถอนเงินล้มเหลว:\", err)\n\t\treturn\n\t}\n\tfmt.Printf(\"1) ถอนเงินสำเร็จ ยอดคงเหลือใหม่: %d บาท\\n\", newBal)\n\n\t// กรณีที่ 2: ถอนเกินวงเงิน (err != nil ตรวจสอบทันทีก่อนให้เงินออก)\n\t_, err = Withdraw(newBal, 1500)\n\tif err != nil {\n\t\tfmt.Printf(\"2) ระบบดักจับข้อผิดพลาดสำเร็จ: %v\\n\", err)\n\t}\n\n\t// กรณีที่ 3: Short statement if เช็ก error จบในบรรทัดเดียว\n\tif _, err := Withdraw(newBal, -50); err != nil {\n\t\tfmt.Printf(\"3) ตรวจสอบพารามิเตอร์ผิดพลาด: %v\\n\", err)\n\t}\n}",
          "out": "1) ถอนเงินสำเร็จ ยอดคงเหลือใหม่: 600 บาท\n2) ระบบดักจับข้อผิดพลาดสำเร็จ: ยอดเงินคงเหลือไม่เพียงพอสำหรับการถอน\n3) ตรวจสอบพารามิเตอร์ผิดพลาด: จำนวนเงินที่ถอนต้องมากกว่า 0"
        },
        {
          "t": "h3",
          "c": "🔍 Blank Identifier (_) และ Blank Import ในการใช้งานจริง"
        },
        {
          "t": "ul",
          "c": [
            "**เครื่องหมายถังขยะ `_` (Blank Identifier)**: คอมไพเลอร์ของ Go เข้มงวดมาก หากคุณประกาศตัวแปรขึ้นมาแล้วไม่ได้นำไปใช้ โค้ดจะไม่ยอมคอมไพล์เด็ดขาด เครื่องหมาย `_` จึงมีไว้บอกคอมไพเลอร์ว่า 'ฉันจงใจทิ้งค่านั้นไป' เช่น `_, err = Withdraw(...)` เมื่อเราสนใจแค่ว่าถอนเงินสำเร็จหรือไม่ แต่ไม่ต้องการเก็บยอดเงินใหม่",
            "**Blank Import (`_ \"github.com/lib/pq\"`)**: ในบทที่ 3 เราจะเห็นคำสั่งนี้ที่หัวไฟล์ `db.go` เครื่องหมาย `_` หน้าแพ็กเกจหมายถึง เราต้องการโหลดแพ็กเกจนี้เข้ามาเพื่อให้ฟังก์ชัน `init()` ภายในของมันทำงานเพื่อลงทะเบียน PostgreSQL Driver เข้าสู่ระบบ แต่เราไม่ได้ต้องการเรียกใช้ฟังก์ชันในแพ็กเกจ `pq` โดยตรง"
          ]
        },
        {
          "t": "h3",
          "c": "กลไกที่ 4: คำสั่ง defer — กฎเหล็กป้องกัน Connection รั่วในระบบ Production"
        },
        {
          "t": "p",
          "c": "ในระบบ Backend สิ่งที่น่ากลัวที่สุดคือ **'Resource Leak'** เช่น คุณเปิดการเชื่อมต่อฐานข้อมูล (`rows, err := db.QueryContext(...)`) หรือเปิดไฟล์ แต่ลืมสั่งปิด (`rows.Close()`) เมื่อมีคำขอเข้ามาหลายพันครั้ง Connection Pool ของฐานข้อมูลจะเต็มและเซิร์ฟเวอร์จะค้างสนิทตอนตี 3!\n\nคำสั่ง `defer` ถูกสร้างมาเพื่อแก้ปัญหานี้โดยเฉพาะ โดยมันจะ **จดจำคำสั่งบรรทัดนั้นไว้ แล้วนำไปรันในจังหวะสุดท้ายก่อนที่ฟังก์ชันจะส่งค่ากลับ (return) เสมอ** ไม่ว่าฟังก์ชันจะจบแบบปกติหรือพังกลางคันเพราะเกิด Error ก็ตาม:"
        },
        {
          "t": "callout",
          "title": "🧠 Mental Model ของ defer: 'ซื้อตั๋วรถไฟปุ๊บ จองตั๋วขากลับใส่กระเป๋าทันที'",
          "c": "หลักปฏิบัติที่ดีที่สุด (Best Practice) ของ Go คือ: **ทันทีที่คุณเปิดใช้งาน Resource สำเร็จ ให้เขียนคำสั่ง `defer Resource.Close()` ในบรรทัดถัดไปทันที!** คุณจะได้ไม่ต้องกังวลว่าจะลืมปิดที่ท้ายฟังก์ชันอีกต่อไป"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "04_defer_lifo_safety.go",
          "code": "// =============================================================================\n// ไฟล์: 04_defer_lifo_safety.go\n// หน้าที่: สาธิตการทำงานของ defer ในการเก็บกวาด Resource และพฤติกรรม LIFO\n// =============================================================================\npackage main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\n// SimulateQueryDatabase จำลองฟังก์ชันที่เปิด Connection แล้วอาจพังกลางคัน\nfunc SimulateQueryDatabase(shouldFail bool) error {\n\tfmt.Println(\"1. เปิด Connection เชื่อมต่อฐานข้อมูลสำเร็จ\")\n\n\t// สั่ง defer ปิด Connection ทันทีที่เปิดได้ ป้องกันการลืมปิด 100%!\n\tdefer fmt.Println(\"4. [defer #1] คืน Connection กลับเข้าสระ (รันทีหลังสุด)\")\n\tdefer fmt.Println(\"3. [defer #2] บันทึก Audit Log จบการทำงาน (รันก่อนแบบ LIFO)\")\n\n\tfmt.Println(\"2. กำลังประมวลผลคำสั่ง SQL คิวรียอดเงิน...\")\n\n\tif shouldFail {\n\t\treturn errors.New(\"เกิด Timeout ระหว่างดึงข้อมูล!\")\n\t}\n\n\treturn nil\n}\n\nfunc main() {\n\tfmt.Println(\"--- กรณีคำสั่งเกิด Error กลางทาง ---\")\n\terr := SimulateQueryDatabase(true)\n\tif err != nil {\n\t\tfmt.Println(\"5. ผลลัพธ์ฟังก์ชันหลัก:\", err)\n\t}\n}",
          "out": "--- กรณีคำสั่งเกิด Error กลางทาง ---\n1. เปิด Connection เชื่อมต่อฐานข้อมูลสำเร็จ\n2. กำลังประมวลผลคำสั่ง SQL คิวรียอดเงิน...\n3. [defer #2] บันทึก Audit Log จบการทำงาน (รันก่อนแบบ LIFO)\n4. [defer #1] คืน Connection กลับเข้าสระ (รันทีหลังสุด)\n5. ผลลัพธ์ฟังก์ชันหลัก: เกิด Timeout ระหว่างดึงข้อมูล!"
        },
        {
          "t": "h3",
          "c": "🔍 พฤติกรรมแบบ LIFO (กองจาน) ของ defer"
        },
        {
          "t": "ul",
          "c": [
            "**LIFO (Last-In, First-Out)**: หากมีคำสั่ง `defer` หลายตัวในฟังก์ชันเดียวกัน Go จะรันคำสั่งที่ประกาศ 'ทีหลังสุด' ให้ทำงาน 'ก่อนเพื่อน' เหมือนกองจานที่จานใบบนสุดถูกหยิบออกก่อน",
            "**จุดใช้งานจริงในโปรเจกต์**: ใช้ `defer rows.Close()` ในการคิวรีฐานข้อมูล (บทที่ 3.1), ใช้ `defer cancel()` ในการจัดการ Timeout ของ Context (บทที่ 4), และใช้ `defer wg.Done()` ในการนับงานของ Goroutine (บทที่ 5.3)"
          ]
        },
        {
          "t": "h2",
          "c": "องก์ที่ 3: สถาปัตยกรรมระบบแบบ Clean & Decoupled"
        },
        {
          "t": "h3",
          "c": "กลไกที่ 5: ไร้ Inheritance — ออกแบบระบบด้วย Struct Embedding (Composition)"
        },
        {
          "t": "p",
          "c": "ในภาษาเชิงวัตถุดั้งเดิม การแชร์โค้ดมักใช้การสืบทอดคลาส (`class Store extends Queries`) แต่วิศวกรพบว่าการสืบทอดลึกๆ ทำให้ระบบเปราะบาง แก้ไขคลาสแม่แล้วคลาสด้านล่างพังทั้งยวง (Fragile Base Class)\n\nภาษา Go ตัดระบบ Inheritance ทิ้งทั้งหมด แล้วยึดหลัก **'Composition over Inheritance (ประกอบร่างแทนการสืบทอด)'** ผ่านกลไกที่เรียกว่า **Struct Embedding** คือการนำ Struct อื่นมาฝังไว้ข้างในโดยไม่ตั้งชื่อฟิลด์ ทำให้เมธอดทั้งหมดของก้อนข้างในถูกยกขึ้นมาเป็นของตัวนอกโดยอัตโนมัติ (Method Promotion):"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "05_struct_embedding_store.go",
          "code": "// =============================================================================\n// ไฟล์: 05_struct_embedding_store.go\n// หน้าที่: แสดงการฝัง Struct Embedding (Method Promotion) ที่ใช้จริงใน Store Layer\n// =============================================================================\npackage main\n\nimport \"fmt\"\n\n// Queries รับผิดชอบคำสั่ง CRUD ทั่วไปรายตาราง\ntype Queries struct{}\n\nfunc (q *Queries) GetAccount(id int64) string {\n\treturn fmt.Sprintf(\"ดึงข้อมูลบัญชี ID = %d จาก Queries สำเร็จ\", id)\n}\n\nfunc (q *Queries) UpdateBalance(id int64, amount int64) string {\n\treturn fmt.Sprintf(\"อัปเดตยอดเงินบัญชี ID = %d ด้วยจำนวน %d\", id, amount)\n}\n\n// Store ฝัง *Queries เข้ามาแบบ Struct Embedding (ไม่ต้องตั้งชื่อฟิลด์)\ntype Store struct {\n\t*Queries // เมธอดทั้งหมดของ Queries จะถูกยกขึ้นมาเป็นของ Store โดยอัตโนมัติ!\n\tdbName   string\n}\n\n// TransferTx เมธอดระดับธุรกรรมที่ Store เพิ่มเติมเข้ามา\nfunc (s *Store) TransferTx(fromID, toID int64, amount int64) string {\n\treturn fmt.Sprintf(\"[Transaction ACID] โอนเงิน %d บาท จาก ID %d -> ID %d\", amount, fromID, toID)\n}\n\nfunc main() {\n\tstore := &Store{\n\t\tQueries: &Queries{},\n\t\tdbName:  \"simple_bank\",\n\t}\n\n\t// 1. เรียกใช้เมธอดของ Queries ผ่านตัวแปร store ได้โดยตรง (Method Promotion)!\n\tfmt.Println(\"1)\", store.GetAccount(1))\n\tfmt.Println(\"2)\", store.UpdateBalance(1, -200))\n\n\t// 2. เรียกใช้เมธอดระดับ Transaction ของ Store เอง\n\tfmt.Println(\"3)\", store.TransferTx(1, 2, 200))\n}",
          "out": "1) ดึงข้อมูลบัญชี ID = 1 จาก Queries สำเร็จ\n2) อัปเดตยอดเงินบัญชี ID = 1 ด้วยจำนวน -200\n3) [Transaction ACID] โอนเงิน 200 บาท จาก ID 1 -> ID 2"
        },
        {
          "t": "h3",
          "c": "🔍 การนำ Struct Embedding ไปใช้ใน Simple Bank (บทที่ 4)"
        },
        {
          "t": "ul",
          "c": [
            "**โครงสร้างของ Store**: ในบทที่ 4 เราจะสร้าง `type Store struct { *Queries; db *sql.DB }`",
            "**ทำไมถึงยอดเยี่ยม?**: ตัวแปร `store` จะได้รับเมธอด CRUD รายตารางทั้งหมดจาก `*Queries` (เช่น `store.CreateAccount`, `store.GetAccount`) โดยที่เราไม่ต้องเขียนโค้ด Forwarding ซ้ำแม้แต่บรรทัดเดียว ในขณะเดียวกัน `Store` ก็สามารถสร้างเมธอดระดับสูงอย่าง `store.TransferTx` เพิ่มเติมเข้าไปได้โดยตรง"
          ]
        },
        {
          "t": "h3",
          "c": "กลไกที่ 6: Implicit Interface — มนต์เสน่ห์ของการ Decouple & Test Mocking"
        },
        {
          "t": "p",
          "c": "ในภาษาอย่าง Java คุณต้องเขียน `class PostgreSQLStore implements StoreInterface` อย่างชัดเจน แต่ในภาษา Go **ไม่มีคีย์เวิร์ด `implements`**!\n\nGo ใช้ระบบ **Implicit Interface (การปฏิบัติตามสัญญาโดยนัย)** ตามสุภาษิตที่ว่า *'ถ้ามันเดินเหมือนเป็ด และร้องเหมือนเป็ด Go จะถือว่ามันคือเป็ด!'* ขอเพียงแค่ Struct ของคุณมีเมธอดที่มีชื่อ พารามิเตอร์ และค่าคืนกลับตรงกับที่ Interface ระบุไว้ Go จะถือว่า Struct นั้นผ่านเกณฑ์ของ Interface นั้นทันที:"
        },
        {
          "t": "callout",
          "title": "🎯 โจทย์ใหญ่ระดับสถาปัตยกรรมในบทที่ 3: ปัญหาของ *sql.DB เทียบกับ *sql.Tx",
          "c": "ในไลบรารีมาตรฐานของ Go ตัวจัดการการเชื่อมต่อปกติ (`*sql.DB`) กับตัวจัดการธุรกรรมการโอนเงิน (`*sql.Tx`) เป็น Struct คนละตัวกันโดยสิ้นเชิง!\n\nแต่ทั้งคู่มีเมธอดหน้าตาเหมือนกันเป๊ะ คือ `QueryRowContext`, `ExecContext`, และ `QueryContext`\n\nถ้าไม่มี Interface คุณจะต้องเขียนโค้ด CRUD สองชุดซ้ำซ้อนกัน: ชุดหนึ่งสำหรับรันแบบปกติ และอีกชุดสำหรับรันใน Transaction!\n\n**วิธีแก้ระดับเซียน**: เราสร้าง `type DBTX interface` ขึ้นมาตัวเดียว ทำให้ `Queries` รับ `DBTX` เข้าไป และสามารถทำงานร่วมกับทั้ง `*sql.DB` และ `*sql.Tx` ได้อย่างไร้รอยต่อโดยใช้โค้ดชุดเดียวกัน 100%!"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "06_implicit_interface_dbtx.go",
          "code": "// =============================================================================\n// ไฟล์: 06_implicit_interface_dbtx.go\n// หน้าที่: แสดงการใช้ DBTX Interface เพื่อรวม Connection Pool เข้ากับ Transaction\n// =============================================================================\npackage main\n\nimport \"fmt\"\n\n// DBTX คือ Interface กลางที่ระบุเฉพาะเมธอด QueryRow ที่ทั้ง Pool และ Tx มีเหมือนกัน\ntype DBTX interface {\n\tQueryRow(sql string) string\n}\n\n// 1. ConnectionPool จำลอง *sql.DB (การเชื่อมต่อปกติ)\ntype ConnectionPool struct{}\n\nfunc (p *ConnectionPool) QueryRow(sql string) string {\n\treturn \"[Pool ปกติ] รันคำสั่งเดี่ยว: \" + sql\n}\n\n// 2. TransactionRunner จำลอง *sql.Tx (การเชื่อมต่อภายใน Transaction)\ntype TransactionRunner struct{}\n\nfunc (t *TransactionRunner) QueryRow(sql string) string {\n\treturn \"[Transaction ล็อกข้อมูล] รันคำสั่งภายใต้ ACID: \" + sql\n}\n\n// Queries ถือ DBTX Interface ทำให้รับได้ทั้ง ConnectionPool และ TransactionRunner\ntype Queries struct {\n\tdb DBTX\n}\n\nfunc (q *Queries) GetAccountBalance(id int64) {\n\tresult := q.db.QueryRow(fmt.Sprintf(\"SELECT balance FROM accounts WHERE id = %d\", id))\n\tfmt.Println(result)\n}\n\nfunc main() {\n\t// รันแบบคำสั่งเดี่ยวผ่าน Connection Pool\n\tnormalQueries := &Queries{db: &ConnectionPool{}}\n\tfmt.Print(\"1) \")\n\tnormalQueries.GetAccountBalance(1)\n\n\t// รันแบบคำสั่งภายใน Transaction โดยใช้โค้ด Queries ตัวเดียวกัน 100%!\n\ttxQueries := &Queries{db: &TransactionRunner{}}\n\tfmt.Print(\"2) \")\n\ttxQueries.GetAccountBalance(1)\n}",
          "out": "1) [Pool ปกติ] รันคำสั่งเดี่ยว: SELECT balance FROM accounts WHERE id = 1\n2) [Transaction ล็อกข้อมูล] รันคำสั่งภายใต้ ACID: SELECT balance FROM accounts WHERE id = 1"
        },
        {
          "t": "h3",
          "c": "🔍 ประโยชน์ของ Interface ในการทำ Unit Testing & Security"
        },
        {
          "t": "ul",
          "c": [
            "**Mocking Database (บทที่ 6)**: เมื่อเขียน Gin API เราสามารถสร้าง `MockStore` ที่จำลองการตอบกลับของฐานข้อมูลโดยไม่ต้องต่อ PostgreSQL จริง ทำให้รัน Unit Test ได้เร็วระดับเสี้ยววินาที",
            "**Token Maker (บทที่ 7)**: เรานิยาม `type Maker interface` ที่มีฟังก์ชันสร้างและตรวจ Token ทำให้ระบบ API สลับไปมาระหว่าง JWT กับ PASETO ได้อย่างง่ายดายโดยไม่ต้องแก้โค้ด Business Logic"
          ]
        },
        {
          "t": "h3",
          "c": "กลไกที่ 7: Slices, Maps, Variadic (...any), และ Type Assertion"
        },
        {
          "t": "p",
          "c": "ในการจัดการข้อมูลแบบกลุ่มและการรับส่งค่าใน API Backend เราจะใช้งาน 4 โครงสร้างข้อมูลพื้นฐานนี้อย่างเข้มข้น:"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "07_slices_maps_assertions.go",
          "code": "// =============================================================================\n// ไฟล์: 07_slices_maps_assertions.go\n// หน้าที่: แสดงการใช้งาน Slice (append), Map, และ Type Assertion (Comma-ok)\n// =============================================================================\npackage main\n\nimport \"fmt\"\n\n// GetContextValue จำลองการดึงค่าออกจาก Gin Context (ctx.MustGet คืนค่าเป็น any / interface{})\nfunc GetContextValue(key string) any {\n\tif key == \"auth_role\" {\n\t\treturn \"bank_manager\"\n\t}\n\treturn nil\n}\n\nfunc main() {\n\t// 1. Slice ([]string): รายการข้อมูลยืดหยุ่นขยายขนาดอัตโนมัติด้วย append\n\tvar accounts []string\n\taccounts = append(accounts, \"ACC-001\")\n\taccounts = append(accounts, \"ACC-002\", \"ACC-003\")\n\tfmt.Println(\"1) Slice รายการบัญชี:\", accounts, \"| ความยาว:\", len(accounts))\n\n\t// 2. Map (map[string]int64): Hash Table ค้นหาข้อมูลด้วยความเร็ว O(1)\n\tbalances := make(map[string]int64)\n\tbalances[\"ACC-001\"] = 5000\n\tbalances[\"ACC-002\"] = 1200\n\tfmt.Println(\"2) Map ยอดเงิน ACC-001:\", balances[\"ACC-001\"], \"บาท\")\n\n\t// 3. Type Assertion ด้วย comma-ok: แกะข้อมูลออกจาก any อย่างปลอดภัย 100%\n\trawVal := GetContextValue(\"auth_role\")\n\tif role, ok := rawVal.(string); ok {\n\t\tfmt.Printf(\"3) Type Assertion สำเร็จ: ผู้ใช้มีสิทธิ์ระดับ '%s'\\n\", role)\n\t} else {\n\t\tfmt.Println(\"3) Type Assertion ล้มเหลว ข้อมูลไม่ใช่ string!\")\n\t}\n}",
          "out": "1) Slice รายการบัญชี: [ACC-001 ACC-002 ACC-003] | ความยาว: 3\n2) Map ยอดเงิน ACC-001: 5000 บาท\n3) Type Assertion สำเร็จ: ผู้ใช้มีสิทธิ์ระดับ 'bank_manager'"
        },
        {
          "t": "h3",
          "c": "🔍 ถอดรหัส Type Assertion และ Comma-ok Idiom"
        },
        {
          "t": "ul",
          "c": [
            "**`any` (หรือ `interface{}`)**: คือชนิดข้อมูลครอบจักรวาลใน Go ที่สามารถเก็บข้อมูลชนิดใดก็ได้ (เปรียบเหมือนกล่องพัสดุปิดผนึก)",
            "**Type Assertion (`v.(Type)`)**: คือการแกะกล่องพัสดุเพื่อแปลงข้อมูลกลับมาเป็นชนิดข้อมูลจริง เช่น `payload := raw.(*token.Payload)`",
            "**Comma-ok Pattern**: สังเกตตัวแปร `ok` ใน `role, ok := rawVal.(string)` หากข้อมูลตรงชนิดจริง `ok` จะเป็น `true` แต่ถ้าไม่ตรง `ok` จะเป็น `false` ช่วยป้องกันไม่ให้โปรแกรม Panic แครชกลางคัน!"
          ]
        },
        {
          "t": "h2",
          "c": "องก์ที่ 4: Concurrency & Request Lifecycle (ขุมพลังความเร็วสูง)"
        },
        {
          "t": "h3",
          "c": "กลไกที่ 8: context.Context — สายสัญญาณควบคุมชีวิตของคำขอ (Timeout & Cancellation)"
        },
        {
          "t": "p",
          "c": "ถ้าคุณสังเกตโค้ดของ Go Backend คุณจะพบว่าพารามิเตอร์ตัวแรกของแทบทุกฟังก์ชันคือ `ctx context.Context` เสมอ!\n\nทำไมต้องส่ง `ctx` ไปทุกหนทุกแห่ง? ลองจินตนาการสถานการณ์จริง:\nลูกค้าเปิดแอปธนาคารแล้วกดยิงคำขอดึงรายการเดินบัญชีย้อนหลัง 5 ปี (คำสั่ง SQL นี้ต้องใช้เวลาประมวลผล 3 วินาที) แต่หลังจากผ่านไป 0.5 วินาที ลูกค้าเกิดเปลี่ยนใจกดปิดแอปไปแล้ว\n\n• **ถ้าไม่มี Context**: เซิร์ฟเวอร์และ PostgreSQL จะยังคงก้มหน้าก้มตารันคำสั่ง SQL ต่อไปจนครบ 3 วินาที เปลืองทั้ง CPU, RAM และค้าง Lock แถวข้อมูลอย่างไร้ประโยชน์!\n• **เมื่อมี Context**: เว็บเซิร์ฟเวอร์จะตรวจพบว่าการเชื่อมต่อหลุด และส่งสัญญาณ `ctx.Done()` ไปยังฐานข้อมูลทันที PostgreSQL จะยกเลิกคำสั่ง SQL กลางคันและคืนทรัพยากรทันที!"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "08_context_timeout_lifecycle.go",
          "code": "// =============================================================================\n// ไฟล์: 08_context_timeout_lifecycle.go\n// หน้าที่: แสดงการใช้ context.Context ในการตัดคำสั่ง SQL ที่ใช้เวลานานเกินกำหนด\n// =============================================================================\npackage main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\n// HeavyDatabaseQuery จำลองคำสั่งค้นหาข้อมูลที่ต้องใช้เวลา 100ms\nfunc HeavyDatabaseQuery(ctx context.Context) error {\n\tfmt.Println(\">> เริ่มค้นหาข้อมูลรายงานบัญชีขนาดใหญ่ (ใช้เวลา 100ms)...\")\n\n\tselect {\n\tcase <-time.After(100 * time.Millisecond):\n\t\tfmt.Println(\"   ค้นหาข้อมูลสำเร็จสมบูรณ์!\")\n\t\treturn nil\n\tcase <-ctx.Done(): // รับสัญญาณยกเลิกเมื่อครบกำหนดเวลา (Timeout) หรือลูกค้ายกเลิกคำขอ\n\t\treturn ctx.Err()\n\t}\n}\n\nfunc main() {\n\t// ตั้งเวลา Deadline สูงสุดของคำขอไว้ที่ 40ms เท่านั้น (น้อยกว่าเวลาทำงานจริง 100ms)\n\tctx, cancel := context.WithTimeout(context.Background(), 40*time.Millisecond)\n\tdefer cancel() // คืนทรัพยากรตัวจับเวลาเมื่อเสร็จสิ้น\n\n\terr := HeavyDatabaseQuery(ctx)\n\tif err != nil {\n\t\tfmt.Printf(\">> ระบบสั่งตัดการทำงานอัตโนมัติ: %v\\n\", err)\n\t\tfmt.Println(\">> PostgreSQL หยุดคำสั่งทันที ไม่สิ้นเปลือง CPU หรือค้าง Lock ในฐานข้อมูล!\")\n\t}\n}",
          "out": ">> เริ่มค้นหาข้อมูลรายงานบัญชีขนาดใหญ่ (ใช้เวลา 100ms)...\n>> ระบบสั่งตัดการทำงานอัตโนมัติ: context deadline exceeded\n>> PostgreSQL หยุดคำสั่งทันที ไม่สิ้นเปลือง CPU หรือค้าง Lock ในฐานข้อมูล!"
        },
        {
          "t": "h3",
          "c": "🔍 การส่งต่อ Context ใน Simple Bank จาก API สู่ฐานข้อมูล"
        },
        {
          "t": "ul",
          "c": [
            "**`context.Background()`**: Context ตั้งต้นที่ไม่มีวันหมดอายุ ใช้ใน `main.go` หรือในชุดทดสอบ Unit Test (`account_test.go`)",
            "**การส่งต่อในระบบจริง**: เมื่อ HTTP Request วิ่งเข้ามาที่ Gin (`ctx *gin.Context`) ตัว Gin Context สามารถทำหน้าที่เป็น `context.Context` ได้ทันที เราจึงส่งต่อเข้า `store.TransferTx(ctx, arg)` และส่งต่อไปถึงคำสั่ง SQL ใน `q.db.ExecContext(ctx, ...)` เป็นลูกโซ่ที่คอยคุ้มกันคำขอตลอดทั้งเส้นทาง"
          ]
        },
        {
          "t": "h3",
          "c": "กลไกที่ 9: Goroutines & Channels — รับมือ 10,000 คำขอพร้อมกันอย่างปลอดภัย"
        },
        {
          "t": "p",
          "c": "นี่คือจุดขายที่แข็งแกร่งที่สุดของภาษา Go: การประมวลผลคำขอคู่ขนาน (Concurrency) ด้วย **Goroutine** ร่วมกับ **Channel**\n\n• **Goroutine**: คือเธรดขนาดจิ๋วที่บริหารโดย Go Runtime กินแรมเริ่มต้นเพียงประมาณ **2KB** (เทียบกับ OS Thread ปกติที่กิน 1–2MB) ทำให้เซิร์ฟเวอร์ Go สามารถสร้างงานคู่ขนานได้เป็นแสนตัวพร้อมกันโดยเครื่องไม่หน่วง\n• **Channel (`chan`)**: คือท่อส่งข้อมูลระหว่าง Goroutines ตามคติประจำใจของ Go ที่ว่า: *'อย่าสื่อสารด้วยการแชร์หน่วยความจำ แต่จงแชร์หน่วยความจำด้วยการสื่อสาร (Do not communicate by sharing memory; instead, share memory by communicating)'*"
        },
        {
          "t": "callout",
          "title": "💡 คำถามที่ผู้เรียนสงสัยมากที่สุด: ทำไมใน TestTransferTx (บทที่ 5.3) ถึงไม่ใช้ sync.WaitGroup?",
          "c": "ในบทที่ 5.3 เราจะเขียนเทสต์เพื่อทดสอบว่า เมื่อมีคนสั่งโอนเงินพร้อมกัน 5 ครั้งในเสี้ยววินาทีเดียวกัน ระบบจะต้องไม่มี Deadlock และยอดเงินต้องถูกต้อง 100%\n\nผู้เริ่มต้นมักสงสัยว่า: *'ทำไมในโค้ดถึงสั่ง `go func() { ... }` 5 รอบ แล้วตามด้วยลูป `for i := 0; i < n; i++` เพื่ออ่าน Channel โดยไม่มี `sync.WaitGroup` เลย โปรแกรมไม่ปิดไปก่อนหรือ?'*\n\n**คำตอบคือ**: เพราะคำสั่งอ่านข้อมูลจาก Channel (`<-errs` และ `<-results`) มีคุณสมบัติ **Blocking (หยุดรอ)** เสมอ! ลูปอ่านข้อมูลจะหยุดรออัตโนมัติจนกว่า Goroutine แต่ละตัวจะส่งผลลัพธ์เข้ามา การวนลูปให้ครบ `n` ครั้งจึงเป็นการการันตี 100% ว่า Goroutine ทุกตัวทำงานเสร็จสิ้นแล้วโดยสมบูรณ์!"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "09_goroutine_channel_blocking.go",
          "code": "// =============================================================================\n// ไฟล์: 09_goroutine_channel_blocking.go\n// หน้าที่: แสดงการรัน Goroutines คู่ขนาน และใช้ Blocking Channel รวบรวมผลลัพธ์\n// =============================================================================\npackage main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tn := 3\n\t// สร้าง Channel แบบ Unbuffered สำหรับรับ error และผลลัพธ์ยอดเงิน\n\terrs := make(chan error)\n\tresults := make(chan int64)\n\n\tfmt.Printf(\">> ปล่อย %d Goroutines โอนเงินพร้อมกันในเสี้ยววินาทีเดียวกัน...\\n\", n)\n\n\t// แตก Goroutine 3 ตัวไปทำงานคู่ขนานกันใน Background\n\tfor i := 1; i <= n; i++ {\n\t\tgo func(workerID int) {\n\t\t\ttime.Sleep(10 * time.Millisecond) // จำลองเวลาประมวลผลคำสั่งโอนเงิน\n\n\t\t\t// ส่งผลลัพธ์เข้าท่อ Channel ด้วยลูกศรชี้เข้า (ch <- value)\n\t\t\terrs <- nil\n\t\t\tresults <- int64(workerID * 200)\n\t\t}(i)\n\t}\n\n\t// วนลูปอ่านข้อมูลออกจากท่อ Channel จำนวน n รอบ\n\t// บรรทัด <-errs และ <-results มีพฤติกรรม Blocking (หยุดรออัตโนมัติจนกว่าจะมีข้อมูลส่งมา)\n\t// จึงทำให้ฟังก์ชันหลักรอจน Goroutine ทุกตัวทำงานเสร็จ โดยไม่ต้องง้อ sync.WaitGroup!\n\tfor i := 1; i <= n; i++ {\n\t\terr := <-errs\n\t\tamount := <-results\n\t\tfmt.Printf(\"   [รับผลลัพธ์รอบที่ %d] err = %v | ยอดเงินที่ประมวลผล = %d บาท\\n\", i, err, amount)\n\t}\n\n\tfmt.Println(\">> สิ้นสุด: ได้รับผลลัพธ์จากทุก Goroutine ครบถ้วนและปลอดภัย!\")\n}",
          "out": ">> ปล่อย 3 Goroutines โอนเงินพร้อมกันในเสี้ยววินาทีเดียวกัน...\n   [รับผลลัพธ์รอบที่ 1] err = <nil> | ยอดเงินที่ประมวลผล = 200 บาท\n   [รับผลลัพธ์รอบที่ 2] err = <nil> | ยอดเงินที่ประมวลผล = 400 บาท\n   [รับผลลัพธ์รอบที่ 3] err = <nil> | ยอดเงินที่ประมวลผล = 600 บาท\n>> สิ้นสุด: ได้รับผลลัพธ์จากทุก Goroutine ครบถ้วนและปลอดภัย!"
        },
        {
          "t": "h3",
          "c": "🔍 ถอดรหัสทิศทางลูกศรของ Channel"
        },
        {
          "t": "ul",
          "c": [
            "**`ch <- value` (ลูกศรพุ่งเข้าหาชื่อ Channel)**: นำข้อมูลจากขวามือหย่อนลงไปในท่อ Channel ด้านซ้าย",
            "**`value := <-ch` (ลูกศรพุ่งออกจากชื่อ Channel)**: ดึงข้อมูลที่ไหลออกมาจากท่อ Channel มาเก็บไว้ในตัวแปรซ้ายมือ",
            "**Unbuffered Channel (`make(chan T)`)**: ท่อแบบไม่มีที่พัก ผู้ส่งและผู้รับต้องมาถึงพร้อมกันจึงจะส่งของได้",
            "**Buffered Channel (`make(chan T, 3)`)**: ท่อที่มีกล่องพักข้อมูลได้ 3 ชิ้น ผู้ส่งสามารถหย่อนของทิ้งไว้ได้ทันที 3 ชิ้นโดยไม่ต้องรอผู้รับ"
          ]
        },
        {
          "t": "h3",
          "c": "กลไกที่ 10: Closures & Higher-Order Functions ใน Transaction Manager"
        },
        {
          "t": "p",
          "c": "ในภาษา Go ฟังก์ชันถือเป็นข้อมูลชนิดหนึ่ง (First-Class Citizen) ทำให้เราสามารถส่งฟังก์ชันเข้าไปเป็นพารามิเตอร์ของอีกฟังก์ชันหนึ่งได้ ซึ่งโปรเจกต์ Simple Bank ใช้คุณสมบัตินี้สร้างระบบ **Transaction Sandwich** ในบทที่ 4:\n\n• ขนมปังแผ่นบน: สั่ง `BEGIN TRANSACTION`\n• ไส้แซนด์วิชตรงกลาง: รันคำสั่งโอนเงินตามที่ผู้เรียกส่งเข้ามา (Callback Function)\n• ขนมปังแผ่นล่าง: ถ้ามี Error ให้สั่ง `ROLLBACK` อัตโนมัติ แต่ถ้าสำเร็จครบทุกคำสั่งให้สั่ง `COMMIT`\n\nความมหัศจรรย์คือฟังก์ชันไส้ในที่ส่งเข้าไป สามารถมองเห็นและแก้ไขตัวแปร `result` ที่อยู่นอกตัวเองได้โดยตรง คุณสมบัตินี้เรียกว่า **Closure**:"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "10_closure_transaction_manager.go",
          "code": "// =============================================================================\n// ไฟล์: 10_closure_transaction_manager.go\n// หน้าที่: แสดงการใช้ Closure สร้าง Transaction Sandwich (BEGIN -> Callback -> COMMIT/ROLLBACK)\n// =============================================================================\npackage main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\n// execTx ทำหน้าที่เป็น Sandwich Manager ดูแล BEGIN และ COMMIT / ROLLBACK ให้อัตโนมัติ\nfunc execTx(fn func() error) error {\n\tfmt.Println(\"[Store Engine] 1. เริ่มต้นคำสั่ง: BEGIN TRANSACTION\")\n\n\t// รันฟังก์ชันไส้ในที่ผู้เรียกส่งเข้ามา (Callback)\n\terr := fn()\n\tif err != nil {\n\t\tfmt.Println(\"[Store Engine] 2. ตรวจพบข้อผิดพลาด -> ดำเนินการ ROLLBACK อัตโนมัติ!\")\n\t\treturn err\n\t}\n\n\tfmt.Println(\"[Store Engine] 2. ทุกคำสั่งผ่านฉลุย -> สั่ง COMMIT บันทึกข้อมูลถาวร!\")\n\treturn nil\n}\n\nfunc main() {\n\tvar transferResult string\n\n\tfmt.Println(\"--- 1. ทดสอบธุรกรรมโอนเงินที่ทำงานสำเร็จ ---\")\n\terr := execTx(func() error {\n\t\t// ฟังก์ชันด้านในสามารถเขียนค่าใส่ตัวแปร transferResult ที่อยู่ด้านนอกได้ (Closure)\n\t\tfmt.Println(\"   [SQL] หักเงินบัญชี A 500 บาท และเพิ่มเงินบัญชี B 500 บาท\")\n\t\ttransferResult = \"โอนสำเร็จ 500 บาท\"\n\t\treturn nil\n\t})\n\tfmt.Printf(\"ผลลัพธ์ธุรกรรม: %s (err = %v)\\n\\n\", transferResult, err)\n\n\tfmt.Println(\"--- 2. ทดสอบธุรกรรมที่พังกลางคัน (Auto Rollback) ---\")\n\terr = execTx(func() error {\n\t\tfmt.Println(\"   [SQL] หักเงินบัญชี A 500 บาท สำเร็จ\")\n\t\tfmt.Println(\"   [SQL] บัญชีปลายทาง B ไม่พร้อมใช้งาน!\")\n\t\treturn errors.New(\"บัญชีปลายทางถูกระงับ\")\n\t})\n\tfmt.Printf(\"ผลลัพธ์ธุรกรรม: ล้มเหลวและถูกคืนค่าทั้งหมด (err = %v)\\n\", err)\n}",
          "out": "--- 1. ทดสอบธุรกรรมโอนเงินที่ทำงานสำเร็จ ---\n[Store Engine] 1. เริ่มต้นคำสั่ง: BEGIN TRANSACTION\n   [SQL] หักเงินบัญชี A 500 บาท และเพิ่มเงินบัญชี B 500 บาท\n[Store Engine] 2. ทุกคำสั่งผ่านฉลุย -> สั่ง COMMIT บันทึกข้อมูลถาวร!\nผลลัพธ์ธุรกรรม: โอนสำเร็จ 500 บาท (err = <nil>)\n\n--- 2. ทดสอบธุรกรรมที่พังกลางคัน (Auto Rollback) ---\n[Store Engine] 1. เริ่มต้นคำสั่ง: BEGIN TRANSACTION\n   [SQL] หักเงินบัญชี A 500 บาท สำเร็จ\n   [SQL] บัญชีปลายทาง B ไม่พร้อมใช้งาน!\n[Store Engine] 2. ตรวจพบข้อผิดพลาด -> ดำเนินการ ROLLBACK อัตโนมัติ!\nผลลัพธ์ธุรกรรม: ล้มเหลวและถูกคืนค่าทั้งหมด (err = บัญชีปลายทางถูกระงับ)"
        },
        {
          "t": "h3",
          "c": "🔍 เบื้องหลังของ store.execTx ในบทที่ 4.2"
        },
        {
          "t": "ul",
          "c": [
            "**ป้องกัน Human Error 100%**: ด้วยแพทเทิร์น `execTx` นี้ ผู้พัฒนาในทีมจะไม่ต้องเขียนคำสั่ง `BEGIN`, `COMMIT`, หรือ `ROLLBACK` ด้วยตัวเองซ้ำๆ อีกต่อไป ลดความเสี่ยงที่คนจะลืม Rollback เมื่อเกิดข้อผิดพลาดได้อย่างสมบูรณ์แบบ",
            "**Closure เก็บผลลัพธ์**: สังเกตว่าใน `TransferTx` ตัวฟังก์ชัน callback ด้านในจะกำหนดค่าให้ `result.Transfer = ...` และ `result.FromAccount = ...` ซึ่งตัวแปร `result` เป็นตัวแปรที่ประกาศไว้ในฟังก์ชันภายนอก เมื่อ `execTx` ทำงานเสร็จ ตัวแปร `result` นั้นก็จะมีข้อมูลครบถ้วนพร้อมส่งกลับไปให้ API ทันที"
          ]
        },
        {
          "t": "callout",
          "title": "✅ เช็กลิสต์ความพร้อม & แผนผังกลไก Go ในโปรเจกต์ Simple Bank",
          "c": "ขอแสดงความยินดีด้วย! ตอนนี้คุณมีโมเดลความคิดของวิศวกร Go Backend ครบทั้ง 10 กลไกแล้ว:\n\n1. **Pointer & Address-of (`*`, `&`)**: เข้าใจแล้วว่าทำไม `row.Scan(&i.ID)` ต้องส่งพิกัด RAM\n2. **Struct & Method Receiver**: เข้าใจแล้วว่าทำไมเมธอดระบบต้องใช้ `func (s *Store)`\n3. **Explicit Error Handling**: เข้าใจแล้วว่าทำไมเราเช็ก `if err != nil` ทุกจุดแทน try/catch\n4. **คำสั่ง `defer`**: เข้าใจแล้วว่าทำไมต้อง `defer rows.Close()` ทันทีหลังเปิด connection\n5. **Struct Embedding**: เข้าใจแล้วว่า `Store` ยกเมธอดของ `Queries` ขึ้นมาได้อย่างไร\n6. **Implicit Interface**: เข้าใจแล้วว่า `DBTX` interface ช่วยรวมโค้ด CRUD กับ Transaction ได้อย่างไร\n7. **Slices, Maps, Type Assertion**: เข้าใจการจัดการ Array, Hash table, และการแกะข้อมูลจาก Gin Context\n8. **`context.Context`**: เข้าใจแล้วว่าสายสัญญาณ Timeout & Cancellation ช่วยตัด Zombie Query ในฐานข้อมูลอย่างไร\n9. **Goroutines & Channels**: เข้าใจโมเดล 2KB เธรดและกลไก Blocking ของ Channel ในชุดทดสอบการโอนเงิน\n10. **Transaction Closures**: เข้าใจการทำ Sandwich Pattern ด้วย `execTx`\n\n🎯 **ก้าวต่อไป (บทที่ 2.1)**: พื้นฐานพร้อม อาวุธพร้อม! เราจะเริ่มลงมือสร้างโปรเจกต์ Simple Bank ของจริง โดยเริ่มจากการออกแบบโครงสร้างฐานข้อมูลบัญชีแยกประเภทคู่ (Immutable Double-Entry Ledger) ทั้ง 3 ตารางกันครับ!"
        }
      ],
      "en": []
    }
  }
};
