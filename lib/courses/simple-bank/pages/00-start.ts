import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/00-start.ts
// โมดูล 0: เตรียมความพร้อม & เริ่มต้นโปรเจกต์
// บทเรียน: 0.1 bank-overview, 0.2 bank-setup
// =============================================================================

export const startPages: Record<string, Page> = {
  "bank-overview": {
    slug: "bank-overview",
    title: {
      th: "0.1 ภาพรวมระบบ Simple Bank & สถาปัตยกรรมระบบการเงิน",
      en: "0.1 Simple Bank Architecture & System Overview",
    },
    lead: {
      th: "ทำไมระบบธนาคารจึงเป็นโปรเจกต์วัดกึ๋นอันดับ 1 ของวิศวกร Backend ระดับสากล — ทำความรู้จักโจทย์ Data Consistency, ACID และ Clean Architecture",
      en: "Why building a Bank Backend is the ultimate test for software engineers — mastering Data Consistency, ACID, and Clean Architecture.",
    },
    group: "0. เตรียมความพร้อม & เริ่มต้นโปรเจกต์",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• เข้าใจว่าทำไมระบบการเงินถึงยอมให้เกิดข้อผิดพลาดไม่ได้แม้แต่สตางค์เดียว\n• เห็นภาพรวมสถาปัตยกรรม 3 เลเยอร์ (Clean Architecture) ของโปรเจกต์ Simple Bank\n• รู้จัก 3 ภัยพิบัติทางการเงิน (Race Condition, Partial Failure, Deadlock) ที่เราจะต้องเขียนโค้ดป้องกันตลอดคอร์สนี้\n\n⏱ **เวลาในการเรียนรู้**: ~15 นาที | **สิ่งที่ต้องรู้มาก่อน**: พื้นฐานการเขียนโปรแกรมทั่วไปภาษาใดก็ได้",
        },
        {
          "t": "h2",
          "c": "1. ทำไมระบบการเงินถึงผิดพลาดไม่ได้แม้แต่สตางค์เดียว?",
        },
        {
          "t": "p",
          "c": "เวลาที่เราพัฒนาเว็บแอปพลิเคชันทั่วไป เช่น โซเชียลมีเดีย เว็บบล็อก หรือระบบแสดงความคิดเห็น ถ้าเกิดบั๊กเล็กๆ น้อยๆ เช่น จำนวนผู้ติดตามนับขาดไป 1 คน หรือคอมเมนต์แสดงผลสลับลำดับ ผู้ใช้งานอาจจะแค่กดรีเฟรชหน้าจอใหม่ ทุกอย่างก็กลับมาปกติ และไม่มีใครเสียหายร้ายแรง",
        },
        {
          "t": "callout",
          "title": "⚠️ แต่ในระบบการเงิน (Financial Backend)... ข้อผิดพลาด = หายนะทันที!",
          "c": "ลองจินตนาการกรณีเหล่านี้:\n1. **เงินงอกเกินจริง (Double Spending)**: ลูกค้ามีเงิน 1,000 บาท กดยิงคำสั่งโอนเงิน 1,000 บาทพร้อมกัน 2 เครื่องในเสี้ยววินาที ระบบยอมให้โอนออกทั้งสองยอด กลายเป็นเงินออกไป 2,000 บาท ธนาคารขาดทุนทันที\n2. **เงินหายกลางอากาศ (Partial Failure)**: ระบบตัดเงินจากบัญชีต้นทางสำเร็จ แต่สายเคเบิลเน็ตเวิร์กขาดก่อนจะเพิ่มเงินให้บัญชีปลายทาง เงินของลูกค้าสาบสูญไปในอากาศ\n3. **ระบบค้างตาย (Deadlock)**: ลูกค้าสองคนโอนเงินสวนทางกันในจังหวะเดียวกัน เซิร์ฟเวอร์ล็อกค้าง ไม่สามารถประมวลผลธุรกรรมของลูกค้าคนอื่นๆ ในระบบได้อีกเลย",
          "warn": true,
        },
        {
          "t": "p",
          "c": "ด้วยเหตุนี้ บริษัทเทคโนโลยีชั้นนำทั่วโลกจึงนิยมใช้โจทย์ **ระบบธนาคาร (Bank Simulation)** ในการฝึกอบรมและสัมภาษณ์งานวิศวกร Backend เพื่อวัดความเข้าใจในเรื่อง **Data Integrity (ความถูกต้องสมบูรณ์ของข้อมูล)**, **Database Transactions (ACID)** และ **Concurrency Control (การควบคุมคำสั่งที่ยิงเข้ามาพร้อมๆ กัน)**",
        },
        {
          "t": "h2",
          "c": "2. สถาปัตยกรรม 3 เลเยอร์ของ Simple Bank",
        },
        {
          "t": "p",
          "c": "ระบบที่เราจะลงมือสร้างตั้งแต่บรรทัดแรกจนถึงการ Deploy ขึ้น Production ถูกออกแบบตามแนวคิด **Clean Backend Architecture** โดยแบ่งโครงสร้างออกเป็น 3 เลเยอร์ที่แยกความรับผิดชอบกันอย่างชัดเจน:",
        },
        {
          "t": "table",
          "head": [
            "เลเยอร์ (Layer)",
            "โฟลเดอร์ในโปรเจกต์",
            "เทคโนโลยีหลัก",
            "หน้าที่และความรับผิดชอบ",
          ],
          "rows": [
            [
              "1. Transport Layer (API)",
              "simplebank/api/",
              "Go + Gin Web Framework",
              "รับ HTTP Request (JSON), ตรวจสอบความถูกต้องของข้อมูล (Validation), ตรวจสอบสิทธิ์ด้วย PASETO Token และตอบกลับ HTTP Status Code",
            ],
            [
              "2. Business & Store Layer",
              "simplebank/db/",
              "Go database/sql + Store Engine",
              "จัดการ Business Rules, ดำเนินการ Database Transaction (BEGIN/COMMIT/Auto-ROLLBACK) และป้องกัน Deadlock ด้วย Lock Ordering",
            ],
            [
              "3. Persistence Layer (DB)",
              "simplebank/db/migration/",
              "PostgreSQL 16 + Docker",
              "จัดเก็บข้อมูลแบบ Double-entry Ledger, บังคับ Foreign Keys & Constraints และจัดการ Row-Level Locks ในระดับฐานข้อมูล",
            ],
          ],
        },
        {
          "t": "h2",
          "c": "3. สามภัยพิบัติคลาสสิกที่ระบบธนาคารต้องเอาชนะ",
        },
        {
          "t": "p",
          "c": "ก่อนจะเริ่มเขียนโค้ด เราต้องเห็นภาพศัตรูตัวฉกาจที่วิศวกร Backend ต้องเจอในโลกแห่งความเป็นจริงเสียก่อน:"
        },
        {
          "t": "ol",
          "c": [
            "**Race Condition & Double Spending**: ลูกค้าส่งคำสั่งตัดเงินเข้ามาพร้อมกัน 2 Goroutines ในมิลลิวินาทีเดียวกัน หากไม่มีการล็อกแถวข้อมูล ทั้งสองคำสั่งจะอ่านยอดเงินเก่า (Stale Read) และยอมให้เงินไหลออกจากระบบเกินยอดจริง",
            "**Partial Failure**: การโอนเงินประกอบด้วย 5 ขั้นตอนย่อย (บันทึก Transfer -> บันทึก From Entry -> บันทึก To Entry -> หักเงิน A -> เพิ่มเงิน B) ถ้าขั้นตอนใดขั้นตอนหนึ่งพัง ทุกอย่างต้อง Rollback กลับสู่สภาพเดิม 100% เสมือนไม่เคยเกิดขึ้น (Atomic)",
            "**Deadlock**: เมื่อ Transaction 1 ล็อกบัญชี A เพื่อโอนไป B ในขณะที่ Transaction 2 ล็อกบัญชี B เพื่อโอนกลับมา A ทั้งสองตัวจะยืนรอซึ่งกันและกันจนระบบไม่สามารถเดินหน้าต่อไปได้",
          ],
        },
        {
          "t": "codeout",
          "lang": "text",
          "label": "จำลอง Log เมื่อเกิด Double Spending ในระบบที่ไม่มีการป้องกัน",
          "code": "[API] 10:00:00.001 POST /transfers - From: Acc 1 (Bob), Amount: 1,000 THB -> Goroutine #1\n[API] 10:00:00.002 POST /transfers - From: Acc 1 (Bob), Amount: 1,000 THB -> Goroutine #2\n[Tx #1] SELECT balance FROM accounts WHERE id = 1 -> พบเงิน 1,000 THB (อนุมัติ)\n[Tx #2] SELECT balance FROM accounts WHERE id = 1 -> พบเงิน 1,000 THB (Stale Read! ยังเห็นเงินเดิม)\n[Tx #1] UPDATE accounts SET balance = 0 WHERE id = 1 -> สำเร็จ\n[Tx #2] UPDATE accounts SET balance = 0 WHERE id = 1 -> สำเร็จอีกยอด!",
          "out": "[CRITICAL ALERT] ตรวจพบยอดเงินขาดดุล!\nยอดเงินตั้งต้นของ Bob: 1,000 THB\nยอดเงินที่โอนออกไปจริง: 2,000 THB\nผลลัพธ์: ธนาคารสูญเสียเงิน 1,000 THB จาก Race Condition",
        },
        {
          "t": "h2",
          "c": "4. แผนที่การเดินทางทั้งคอร์ส (Roadmap)",
        },
        {
          "t": "p",
          "c": "เราจะค่อยๆ สร้างระบบนี้ขึ้นมาทีละก้าว โดยแบ่งเนื้อหาออกเป็น 9 โมดูลที่ร้อยเรียงกันอย่างเป็นธรรมชาติ:",
        },
        {
          "t": "table",
          "head": ["โมดูล", "หัวใจสำคัญ", "ผลลัพธ์ที่คุณจะสร้างได้"],
          "rows": [
            ["0. เตรียมความพร้อม", "เข้าใจปัญหาภาพรวม & เซ็ตอัปเครื่องมือ", "Environment พร้อมรัน Go, Docker, PostgreSQL"],
            ["1. Go สำหรับ Backend", "ปูพื้นฐานไวยากรณ์ด้วยตัวอย่างคลาสสิก", "เข้าใจ Struct, Pointer, Interface, Defer, Context"],
            ["2. ออกแบบฐานข้อมูล", "สมุดบัญชีแยกประเภท (Ledger) & Migration", "Postgres Schema 3 ตารางบน Docker พร้อม Makefile"],
            ["3. เชื่อมต่อ Go กับ DB", "เขียน Raw SQL CRUD & Unit Test", "โมดูล Data Store ที่มี Unit Test ครอบคลุมด้วย testify"],
            ["4. รวมธุรกรรมด้วย ACID", "Transaction Manager & Logic โอนเงิน", "ฟังก์ชัน TransferTx ที่การันตีความปลอดภัย 5 ขั้นตอน"],
            ["5. รับมือ Concurrency", "พิสูจน์บั๊กด้วย Test แล้วแก้ Deadlock", "Stress Test ด้วย 10+ Goroutines แบบไร้ Deadlock"],
            ["6. เปิด RESTful API", "Gin Framework & Custom Validation", "HTTP Endpoints พร้อมตัวตรวจเช็กสกุลเงิน (Currency Validator)"],
            ["7. ปลอดภัย & Production", "Bcrypt, PASETO Token & Docker Compose", "ระบบ Authentication และ Image เล็กเพียง 20MB"],
            ["8. สรุป & สัมภาษณ์งาน", "Top 10 Interview Questions & Architecture", "ความมั่นใจพร้อมตอบคำถามสัมภาษณ์ระดับวิศวกรอาวุโส"],
          ],
        },
        {
          "t": "h2",
          "c": "5. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ทำไมการเขียนคำสั่งโอนเงินด้วย UPDATE accounts SET balance = balance - 100 แบบเดี่ยวๆ ถึงไม่เพียงพอสำหรับระบบธนาคารจริง?",
              "options": [
                {
                  "text": "เพราะคำสั่ง UPDATE ไม่รองรับการใส่ WHERE clause",
                  "isCorrect": false,
                  "explain": "คำสั่ง UPDATE ใส่ WHERE ได้ตามปกติ แต่ปัญหาไม่ได้อยู่ที่ไวยากรณ์ SQL",
                },
                {
                  "text": "เพราะขาด Audit Trail (ไม่มีประวัติบันทึกว่าเงินไปไหน) และไม่การันตี Atomicity หากระบบล่มกลางคัน",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! การโอนเงินต้องมีบันทึกประวัติ (Ledger Entries) เพื่อตรวจสอบย้อนหลัง และต้องทำงานแบบ Atomic ภายใน Transaction เพื่อป้องกันเงินสูญหายหากไฟดับ",
                },
                {
                  "text": "เพราะคำสั่ง UPDATE ช้ากว่าคำสั่ง INSERT เสมอ",
                  "isCorrect": false,
                  "explain": "ความเร็วไม่ใช่ประเด็นหลักในเรื่องความปลอดภัยของข้อมูลการเงิน",
                },
              ],
            },
            {
              "question": "อะไรคือความแตกต่างที่สำคัญที่สุดระหว่าง Race Condition และ Deadlock?",
              "options": [
                {
                  "text": "Race Condition คือคำสั่งแย่งกันเขียนข้อมูลจนผลลัพธ์เพี้ยน ส่วน Deadlock คือคำสั่งรอทรัพยากรซึ่งกันและกันจนระบบหยุดชะงัก",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! Race Condition ทำให้ข้อมูลผิดพลาดเพราะไม่มีการล็อก ส่วน Deadlock เกิดจากการล็อกที่ติดกับดักการรอเป็นวงกลม",
                },
                {
                  "text": "Race Condition เกิดขึ้นเฉพาะในฐานข้อมูล ส่วน Deadlock เกิดขึ้นเฉพาะในโค้ด Go",
                  "isCorrect": false,
                  "explain": "ทั้งสองปัญหาเกิดขึ้นได้ทั้งในหน่วยความจำของโค้ด Go และในฐานข้อมูล PostgreSQL",
                },
                {
                  "text": "ทั้งสองคำคือชื่อเรียกของปัญหาเดียวกัน สามารถสลับใช้แทนกันได้",
                  "isCorrect": false,
                  "explain": "เป็นคนละปัญหากันอย่างสิ้นเชิง ทั้งสาเหตุและวิธีแก้ไขแตกต่างกัน",
                },
              ],
            },
          ],
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "ในบทที่ **0.2 ติดตั้งเครื่องมือ & รันโปรแกรมแรก** เราจะมาติดตั้ง Go 1.27, Docker และทดสอบรันโปรแกรม Hello World รวมถึงทดลองรัน PostgreSQL container บนเครื่องของคุณกันครับ",
        },
      ],
      en: [],
    },
  },

  "bank-setup": {
    slug: "bank-setup",
    title: {
      th: "0.2 ติดตั้งเครื่องมือ & รันโปรแกรมแรก",
      en: "0.2 Environment Setup & First Program",
    },
    lead: {
      th: "เซ็ตอัปสภาพแวดล้อมการพัฒนาให้พร้อม 100%: ติดตั้ง Go 1.27, Docker, Make และเริ่มต้นโปรเจกต์ Go Module แรกอย่างถูกต้อง",
      en: "Prepare your complete development environment: Go 1.27, Docker, Make, and initial Go Module setup.",
    },
    group: "0. เตรียมความพร้อม & เริ่มต้นโปรเจกต์",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• ตรวจสอบและติดตั้ง Go 1.27+, Docker และเครื่องมือสนับสนุนที่จำเป็น\n• เริ่มต้น Go Module ด้วยคำสั่ง `go mod init simplebank`\n• เขียนโปรแกรมทดสอบตัวแรกเพื่อยืนยันว่าคอมไพเลอร์พร้อมทำงาน\n\n⏱ **เวลาในการเรียนรู้**: ~10 นาที | **สิ่งที่ต้องมี**: สิทธิ์ Admin หรือ Terminal บนเครื่องของคุณ",
        },
        {
          "t": "h2",
          "c": "1. ตรวจสอบเครื่องมือในเครื่องของคุณ",
        },
        {
          "t": "p",
          "c": "โปรเจกต์ Simple Bank ใช้เทคโนโลยีมาตรฐานระดับอุตสาหกรรม ก่อนเริ่มต้น ให้เปิด Terminal (หรือ PowerShell บน Windows) แล้วรันคำสั่งตรวจสอบเวอร์ชันดังต่อไปนี้:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "คำสั่งตรวจสอบเวอร์ชัน Go และ Docker",
          "code": "go version\ndocker --version",
          "out": "go version go1.27.2 windows/amd64\nDocker version 29.9.2, build a82e528",
        },
        {
          "t": "callout",
          "title": "💡 หากคุณยังไม่ได้ติดตั้งเครื่องมือ",
          "c": "• **Go**: ดาวน์โหลดตัวติดตั้งอย่างเป็นทางการได้ที่ [go.dev/dl](https://go.dev/dl) (แนะนำ Go 1.27 ขึ้นไป)\n• **Docker Desktop**: ดาวน์โหลดได้ที่ [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) เพื่อใช้รัน PostgreSQL และเครื่องมือ Migration\n• **Git**: ใช้จัดการ Source Control",
        },
        {
          "t": "h2",
          "c": "2. สร้างโฟลเดอร์โปรเจกต์ & เริ่มต้น Go Module",
        },
        {
          "t": "p",
          "c": "ในภาษา Go โปรเจกต์ทุกโปรเจกต์จะถูกบริหารจัดการผ่าน **Go Module** ซึ่งเป็นไฟล์กำหนดชื่อโปรเจกต์และติดตาม Dependencies ภายนอก สร้างโฟลเดอร์และเริ่มต้นโมดูลด้วยคำสั่ง:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "สร้างโฟลเดอร์โปรเจกต์และสร้าง go.mod",
          "code": "mkdir simplebank\ncd simplebank\ngo mod init simplebank",
          "out": "go: creating new go.mod: module simplebank\ngo: to add module requirements and sums:\n\tgo mod tidy",
        },
        {
          "t": "p",
          "c": "หลังจากรันคำสั่งเสร็จ คุณจะได้ไฟล์ `go.mod` ที่มีเนื้อหาเรียบง่ายระบุเวอร์ชัน Go ที่ใช้งาน:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/go.mod",
          "c": "module simplebank\n\ngo 1.27",
        },
        {
          "t": "h2",
          "c": "3. เขียนโปรแกรมทดสอบตัวแรก (Sanity Check)",
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `main.go` ในโฟลเดอร์โปรเจกต์ เพื่อทดสอบการทำงานของ Go toolchain:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/main.go",
          "c": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"🏦 Simple Bank System Engine Ready!\")\n}",
        },
        {
          "t": "p",
          "c": "สั่งรันโปรแกรมทันทีด้วยคำสั่ง `go run`:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ทดสอบสั่งรันโปรแกรม",
          "code": "go run main.go",
          "out": "🏦 Simple Bank System Engine Ready!",
        },
        {
          "t": "h2",
          "c": "4. โครงสร้างโฟลเดอร์เป้าหมายของ Simple Bank",
        },
        {
          "t": "p",
          "c": "เมื่อเราพัฒนาโปรเจกต์ไปจนจบคอร์ส โฟลเดอร์ในโปรเจกต์ของเราจะมีความเป็นระเบียบตามมาตรฐานดังนี้:"
        },
        {
          "t": "code",
          "lang": "text",
          "label": "โครงสร้างไดเรกทอรีของโปรเจกต์ Simple Bank ทั้งหมด",
          "c": "simplebank/\n├── api/             # HTTP Handlers, Routing & Middleware (Gin)\n│   ├── account.go\n│   ├── middleware.go\n│   ├── server.go\n│   ├── transfer.go\n│   ├── user.go\n│   └── validator.go\n├── db/              # Database Storage, CRUD & Transaction Engine\n│   ├── migration/   # SQL Migration Scripts (Up/Down)\n│   ├── account.go\n│   ├── db.go\n│   ├── models.go\n│   ├── store.go\n│   ├── tx_transfer.go\n│   └── user.go\n├── token/           # PASETO Token Maker & Security\n│   └── paseto_maker.go\n├── util/            # Configuration (Viper), Hashing (Bcrypt) & Helpers\n│   ├── config.go\n│   ├── currency.go\n│   ├── password.go\n│   └── random.go\n├── app.env          # Environment Variables Config\n├── docker-compose.yml\n├── Dockerfile\n├── go.mod\n├── go.sum\n├── Makefile\n└── main.go          # Application Entry Point",
        },
        {
          "t": "h2",
          "c": "5. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ความแตกต่างสำคัญระหว่างคำสั่ง go run main.go และ go build คืออะไร?",
              "options": [
                {
                  "text": "go run ใช้สำหรับรันโค้ดชั่วคราวในเครื่อง ส่วน go build จะคอมไพล์เป็นไฟล์ไบนารีเดี่ยวๆ สำหรับนำไปแจกจ่ายหรือรันบน Production",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! go run จะคอมไพล์ในหน่วยความจำชั่วคราวเพื่อทดสอบโค้ดเร็วๆ ส่วน go build จะสร้าง Executable Binary พร้อมรันโดยไม่ต้องมี Go ติดตั้งบนเซิร์ฟเวอร์",
                },
                {
                  "text": "go run จะรันเร็วกว่า go build เพราะไม่มีการตรวจเช็ก Type",
                  "isCorrect": false,
                  "explain": "Go เป็นภาษา Statically Typed มีการตรวจ Type เสมอไม่ว่าจะใช้คำสั่งใด",
                },
                {
                  "text": "go build สามารถคอมไพล์ได้เฉพาะไฟล์เดียว แต่ go run รันได้ทั้งโปรเจกต์",
                  "isCorrect": false,
                  "explain": "go build สามารถคอมไพล์ทั้งแพ็กเกจ เช่น go build ./... หรือระบุเฉพาะจุดได้",
                },
              ],
            },
          ],
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "สภาพแวดล้อมพร้อมแล้ว! ในโมดูลที่ 1 บทที่ **1.1 ไวยากรณ์ Go พื้นฐาน** เราจะมาเรียนรู้เรื่อง Struct, Pointer, และ Error Handling ด้วยตัวอย่างคลาสสิกที่เข้าใจง่ายกันครับ",
        },
      ],
      en: [],
    },
  },
};
