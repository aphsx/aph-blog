import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/08-wrapup.ts
// โมดูล 8: สรุปความรู้ & เตรียมสัมภาษณ์งาน
// บทเรียน: 8.1 bank-interview-system-design, 8.2 bank-cheatsheet
// =============================================================================

export const wrapupPages: Record<string, Page> = {
  "bank-interview-system-design": {
    slug: "bank-interview-system-design",
    title: {
      th: "8.1 10 คำถามสัมภาษณ์ยอดฮิต & System Design",
      en: "8.1 Top 10 Interview Questions & System Design",
    },
    lead: {
      th: "ถอดรหัส 10 คำถามสัมภาษณ์งานวิศวกร Backend ระดับ Mid-Senior พร้อมแนวทางการตอบแบบมืออาชีพ และผังภาพสถาปัตยกรรมระดับองค์กร (System Design)",
      en: "Ace your backend interview: Top 10 banking & Go interview questions with expert answers, plus enterprise system design architecture.",
    },
    group: "8. สรุปความรู้ & เตรียมสัมภาษณ์งาน",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• เตรียมความพร้อมตอบคำถามสัมภาษณ์งาน Backend Engineer ในหัวข้อ Data Consistency, Concurrency และ Go\n• เข้าใจมุมมองเชิงสถาปัตยกรรม (System Design) เมื่อต้องขยายระบบ Simple Bank สู่ระดับ Distributed Systems\n• รู้วิธีสื่อสาร Trade-offs ของการตัดสินใจเชิงเทคนิคแต่ละจุดอย่างน่าประทับใจ\n\n⏱ **เวลาในการเรียนรู้**: ~25 นาที",
        },
        {
          "t": "h2",
          "c": "1. Top 10 คำถามสัมภาษณ์ยอดฮิต & แนวทางการตอบ",
        },
        {
          "t": "details",
          "summary": "1. ทำไมระบบการเงินถึงห้ามใช้ Float และโปรเจกต์ของคุณจัดการอย่างไร?",
          "c": [
            {
              "t": "p",
              "c": "**แนวทางการตอบ**:\n• **ปัญหา**: อธิบายว่าตัวเลขทศนิยมแบบ Floating-Point (IEEE 754) แปลงเลขฐานสิบเป็นฐานสองได้ไม่ลงตัว ทำให้เกิดความคลาดเคลื่อนสะสม เช่น `0.1 + 0.2 != 0.3`\n• **วิธีแก้ในระบบ**: เราเก็บเงินเป็นจำนวนเต็ม 64-bit (`int64` ใน Go และ `bigint` ใน PostgreSQL) ใน **'หน่วยย่อยที่สุด'** เช่น สตางค์ หรือ เซนต์ โดย $10.50 จะเก็บเป็น `1050` เสมอ ทำให้การบวก ลบ และคำนวณทั้งหมดแม่นยำ 100% ไร้การปัดเศษผิดพลาด",
            },
          ],
        },
        {
          "t": "details",
          "summary": "2. อธิบายคุณสมบัติ ACID และยกตัวอย่างที่เกิดขึ้นจริงในคำสั่งโอนเงิน?",
          "c": [
            {
              "t": "p",
              "c": "**แนวทางการตอบ**:\n• **Atomicity (A)**: การโอนเงิน 5 ขั้นตอน (Transfer record, 2 Entries, 2 Account balance updates) ถูกมัดรวมด้วย `store.execTx` ถ้าขั้นตอนใดพัง ทุกอย่างจะถูก Rollback กลับสู่สภาพเดิม 100%\n• **Consistency (C)**: ยอดเงินรวมของทั้งสองบัญชีก่อนและหลังโอนต้องเท่าเดิมเสมอ และถูกบังคับด้วย Database Constraint `CHECK (balance >= 0)` ไม่ให้เงินติดลบ\n• **Isolation (I)**: ในระหว่างที่กำลังโอนเงิน Transaction อื่นๆ จะไม่สามารถเห็นยอดเงินที่ถูกตัดไปครึ่งๆ กลางๆ ได้\n• **Durability (D)**: เมื่อคำสั่ง Commit สำเร็จ ข้อมูลถูกบันทึกลง Write-Ahead Log (WAL) บนดิสก์อย่างถาวร แม้ไฟจะดับทันทีข้อมูลก็ไม่สูญหาย",
            },
          ],
        },
        {
          "t": "details",
          "summary": "3. Deadlock ในระบบธนาคารเกิดขึ้นได้อย่างไร และทำไม Resource Ordering ถึงแก้ได้ 100%?",
          "c": [
            {
              "t": "p",
              "c": "**แนวทางการตอบ**:\n• **สาเหตุ**: เกิดขึ้นเมื่อ Alice โอนไป Bob (ล็อก Acc 1 แล้วรอ Acc 2) พร้อมกับที่ Bob โอนกลับมา Alice (ล็อก Acc 2 แล้วรอ Acc 1) ทำให้เกิดการรอแบบวนเป็นวงกลม (Circular Wait)\n• **การแก้ปัญหา**: เราใช้หลักการ **Resource Ordering** โดยกำหนดกฎเหล็กว่า 'จงอัปเดตบัญชีที่มี ID น้อยกว่าก่อนเสมอ' ไม่ว่าทิศทางการโอนจะเป็นอย่างไร ทำให้ทั้งสองธุรกรรมต้องแย่งกันล็อก Acc 1 ก่อนเสมอ ผู้ที่มาทีหลังจะต้องยืนรอหน้าประตูตั้งแต่แรก โดยไม่ได้ถือ Acc 2 ค้างไว้ ทำให้การรอวนเป็นวงกลมเป็นไปไม่ได้ทางคณิตศาสตร์ 100%",
            },
          ],
        },
        {
          "t": "details",
          "summary": "4. ทำไมถึงเลือกใช้ Raw SQL ร่วมกับ DBTX Interface แทนที่จะใช้ ORM อย่าง GORM?",
          "c": [
            {
              "t": "p",
              "c": "**แนวทางการตอบ**:\n• **Zero Overhead**: Raw SQL ไม่มีค่าใช้จ่ายของการทำ Reflection แปลงโค้ดไปมา ทำให้รองรับ Throughput ได้สูงกว่า\n• **Full Visibility & Locking Control**: เราควบคุมคำสั่ง SQL และกลไก Row Locking (`SELECT FOR UPDATE`) ได้อย่างแม่นยำโดยไม่มีคำสั่งแอบแฝง\n• **DBTX Flexibility**: ด้วย Interface `DBTX` ทำให้ฟังก์ชัน CRUD ของเราสามารถรับได้ทั้ง `*sql.DB` ธรรมดา หรือรับ `*sql.Tx` ในขั้นตอนการโอนเงินเข้ามาประมวลผลได้อย่างราบรื่นโดยไม่ต้องเขียนโค้ดซ้ำ",
            },
          ],
        },
        {
          "t": "details",
          "summary": "5. ทำไมถึงเลือกใช้ PASETO Token แทน JWT?",
          "c": [
            {
              "t": "p",
              "c": "**แนวทางการตอบ**:\nJWT มีจุดอ่อนด้านการออกแบบที่เปิดให้ Client กำหนดอัลกอริทึมเอง (`alg`) ซึ่งในอดีตทำให้เกิดช่องโหว่ร้ายแรง เช่น Algorithm Confusion และ `alg: none` ในขณะที่ PASETO (Platform-Agnostic Security Tokens) มีการเข้ารหัสทั้งก้อน (Encrypted Payload สำหรับ Local Token ด้วย ChaCha20-Poly1305) และไม่มีการเปิดให้ผู้ใช้เลือกอัลกอริทึมเอง ทำให้ปลอดภัยจากการโจมตีเชิงรหัสลับและป้องกันข้อมูลรั่วไหลได้อย่างสมบูรณ์",
            },
          ],
        },
        {
          "t": "details",
          "summary": "6. การออกแบบ Ledger แบบ Append-Only ในตาราง entries มีประโยชน์อย่างไรเทียบกับการแก้ balance ลอยๆ?",
          "c": [
            {
              "t": "p",
              "c": "**แนวทางการตอบ**:\nการแก้ `balance` ลอยๆ ขาด 'Audit Trail' ทำให้ไม่สามารถตรวจสอบย้อนหลังได้ว่าเงินเข้าออกเมื่อใดและเกิดจากสาเหตุใด การใช้ Append-Only Ledger ที่ห้าม UPDATE และห้าม DELETE ทำให้เราสามารถคำนวณยอดเงินคงเหลือใหม่ได้เสมอจากการทำ `SUM(amount)` ของตาราง entries เพื่อตรวจสอบความถูกต้อง (Reconciliation) ป้องกันการทุจริตและการคำนวณผิดพลาดของระบบ",
            },
          ],
        },
        {
          "t": "details",
          "summary": "7. ใน Go คำสั่ง defer ทำงานอย่างไร และมี Use Case สำคัญอะไรบ้างในโปรเจกต์นี้?",
          "c": [
            {
              "t": "p",
              "c": "**แนวทางการตอบ**:\n`defer` จะสั่งให้ฟังก์ชันทำงานในจังหวะสุดท้ายก่อนที่ฟังก์ชันแม่จะ Return เสมอ โดยทำงานแบบ Last-In, First-Out (LIFO) ในโปรเจกต์นี้เราใช้ `defer` สำหรับ:\n1. ปิด Connection ฐานข้อมูล (`defer conn.Close()`)\n2. ปิดแถวข้อมูลเพื่อคืน Connection เข้า Pool ป้องกัน Memory & Connection Leak (`defer rows.Close()`)\n3. ยกเลิก Context Timeout (`defer cancel()`)\n4. ปลดล็อก Mutex (`defer mu.Unlock()`)",
            },
          ],
        },
        {
          "t": "details",
          "summary": "8. หากระบบต้องรองรับการโอนเงินข้ามฐานข้อมูล (Microservices ต่าง Database) ACID Transaction ตัวเดียวจะเอาอยู่หรือไม่?",
          "c": [
            {
              "t": "p",
              "c": "**แนวทางการตอบ**:\nเอาไม่อยู่ครับ เพราะ ACID แบบดั้งเดิมทำงานบนฐานข้อมูลก้อนเดียว เมื่อขยายเป็น Microservices ข้ามฐานข้อมูล เราต้องเปลี่ยนไปใช้ **Distributed Transactions** เช่น:\n• **2-Phase Commit (2PC)**: ปลอดภัยแต่ Latency สูงและเกิด Single Point of Failure ง่าย\n• **Saga Pattern (แนะนำ)**: แบ่งการโอนเงินออกเป็น Local Transactions ย่อยๆ และมี Compensating Transaction สำหรับสั่งคืนเงินย้อนกลับหากขั้นตอนปลายทางล้มเหลว ควบคุมด้วย Event-Driven Message Broker เช่น Apache Kafka หรือ RabbitMQ",
            },
          ],
        },
        {
          "t": "details",
          "summary": "9. ทำไมในตาราง accounts ถึงต้องมีทั้ง Foreign Key และ Composite Unique Constraint (owner, currency)?",
          "c": [
            {
              "t": "p",
              "c": "**แนวทางการตอบ**:\n• **Foreign Key**: รับประกันว่าบัญชีทุกบัญชีต้องผูกอยู่กับผู้ใช้งานที่มีตัวตนจริงในตาราง `users` ห้ามมีบัญชีกำพร้า\n• **Composite Unique Constraint**: บังคับทางกฎธุรกิจว่าผู้ใช้ 1 คน จะมีบัญชีในแต่ละสกุลเงินได้เพียง 1 บัญชีเท่านั้น (เช่น มีบัญชี USD ได้ 1 บัญชี, THB ได้ 1 บัญชี) เพื่อป้องกันการเปิดบัญชีซ้ำซ้อนโดยไม่ตั้งใจ",
            },
          ],
        },
        {
          "t": "details",
          "summary": "10. คุณมีเทคนิคอย่างไรในการทำให้ Docker Image ของ Go เล็กเพียง 20MB?",
          "c": [
            {
              "t": "p",
              "c": "**แนวทางการตอบ**:\nเราใช้เทคนิค **Multi-Stage Build**:\n• **Stage 1 (Builder)**: ใช้ `golang:1.27-alpine` ซึ่งมี Go SDK และ Build Tools ขนาด ~800MB ทำการคอมไพล์โค้ดเป็น Static Binary เดี่ยวๆ ด้วยคำสั่ง `CGO_ENABLED=0 go build`\n• **Stage 2 (Runner)**: ใช้ Base Image เบาหวิวอย่าง `alpine:3.22` (~7MB) แล้วหยิบเอาเฉพาะไฟล์ Binary ที่คอมไพล์เสร็จจาก Stage 1 มาใส่ ทำให้ Image สุดท้ายมีขนาดเพียง ~20MB ไร้เครื่องมือ Compiler ช่วยลดช่องโหว่ความปลอดภัย (Attack Surface) และ Deploy ได้เร็วมาก",
            },
          ],
        },
        {
          "t": "h2",
          "c": "2. ภาพรวมสถาปัตยกรรมระดับ Production (High-Level Architecture)",
        },
        {
          "t": "p",
          "c": "เมื่อระบบ Simple Bank ของเราถูกนำไป Deploy บน Cloud (เช่น AWS หรือ GCP) โครงสร้างภาพรวมจะมีลักษณะดังนี้:"
        },
        {
          "t": "code",
          "lang": "text",
          "label": "สถาปัตยกรรมระดับองค์กร (Production Architecture)",
          "c": "[ Internet Users ]\n       │\n       ▼\n[ Cloudflare / AWS CloudFront ]  (DDoS Protection, SSL Termination)\n       │\n       ▼\n[ AWS Application Load Balancer ]\n       │\n   ┌───┴───────────────────────┐\n   ▼                           ▼\n[ Simple Bank API Pod #1 ]  [ Simple Bank API Pod #2 ] (K8s Horizontal Pod Autoscaler)\n   │                           │\n   └───────────┬───────────────┘\n               │ Connection Pooling (pgx)\n               ▼\n       [ AWS RDS PostgreSQL 16 Multi-AZ ]\n        ├── Primary DB (Read/Write - Row-level Locks)\n        └── Read Replica (Read-only for Analytics / Reports)",
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "บทสุดท้ายในหน้าถัดไป: **8.2 สรุปคำสั่ง Cheat Sheet & ท้าทายต่อยอด (Capstone)** สรุปทุกคำสั่งและโจทย์ท้าทายเพื่ออัปเลเวลต่อไปครับ",
        },
      ],
      en: [],
    },
  },

  "bank-cheatsheet": {
    slug: "bank-cheatsheet",
    title: {
      th: "8.2 สรุปคำสั่ง Cheat Sheet & ท้าทายต่อยอด (Capstone)",
      en: "8.2 CLI Cheat Sheet & Capstone Challenges",
    },
    lead: {
      th: "คู่มือสรุปคำสั่งใช้งานด่วนตลอดทั้งโปรเจกต์: Go, Docker, Migration, และแนวทางการต่อยอดสู่ระบบ Production ขนาดใหญ่ระดับโลก",
      en: "Quick command cheat sheet for Go, Docker, and migrations, plus advanced capstone challenges to level up your engineering skills.",
    },
    group: "8. สรุปความรู้ & เตรียมสัมภาษณ์งาน",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• รวบรวมคำสั่งลัด CLI ทั้งหมดในชีวิตประจำวันของโปรเจกต์ไว้ในหน้าเดียว\n• ทบทวนโครงสร้างโปรเจกต์ Simple Bank และความสัมพันธ์ของแต่ละโฟลเดอร์\n• 3 โจทย์ท้าทายระดับ Advanced (Capstone Challenges) เพื่อฝึกฝนต่อยอด\n\n⏱ **เวลาในการเรียนรู้**: ~15 นาที",
        },
        {
          "t": "h2",
          "c": "1. Command Cheat Sheet (คำสั่งที่ใช้บ่อย)",
        },
        {
          "t": "table",
          "head": ["การกระทำ", "คำสั่ง CLI", "คำอธิบาย"],
          "rows": [
            [
              "สตาร์ต PostgreSQL Container",
              "`make postgres`",
              "รัน Docker Container postgres:16-alpine บนพอร์ต 5432",
            ],
            [
              "สร้างฐานข้อมูล",
              "`make createdb`",
              "สร้างฐานข้อมูลชื่อ simple_bank บนคอนเทนเนอร์",
            ],
            [
              "รัน Migration ไปข้างหน้า",
              "`make migrateup`",
              "อ่านไฟล์ up.sql ทั้งหมดและสร้างตารางลง DB",
            ],
            [
              "ย้อนกลับ Migration ล่าสุด",
              "`make migratedown`",
              "รัน down.sql ถอยหลังกลับ 1 ขั้นตอน",
            ],
            [
              "รัน Unit Test ทั้งหมด",
              "`make test`",
              "รัน go test -v -cover -count=1 ./...",
            ],
            [
              "ตรวจสอบ Race Condition",
              "`go test -race ./...`",
              "เปิดใช้งาน Go Race Detector ตรวจจับการเข้าถึงข้อมูลพร้อมกัน",
            ],
            [
              "สตาร์ต API Server ท้องถิ่น",
              "`make server`",
              "สั่ง go run main.go เปิดพอร์ต 8080",
            ],
            [
              "บิลด์และรันด้วย Docker Compose",
              "`docker compose up --build`",
              "สตาร์ตทั้ง DB, Migration และ API พร้อมกัน",
            ],
          ],
        },
        {
          "t": "h2",
          "c": "2. โครงสร้างไฟล์ฉบับสมบูรณ์ (Reference Project Structure)",
        },
        {
          "t": "code",
          "lang": "text",
          "label": "โครงสร้างไดเรกทอรีโปรเจกต์ Simple Bank",
          "c": "simplebank/\n├── api/\n│   ├── account.go      # Handlers: createAccount, getAccount, listAccounts\n│   ├── middleware.go   # authMiddleware: verify PASETO tokens\n│   ├── server.go       # Server struct & Gin router setup\n│   ├── transfer.go     # Handler: createTransfer with currency validation\n│   ├── user.go         # Handlers: createUser, loginUser\n│   └── validator.go    # Custom currency validator\n├── db/\n│   ├── migration/      # Database migrations (000001_init, 000002_add_users)\n│   ├── account.go      # Account CRUD operations (Create, Get, List, AddBalance, Delete)\n│   ├── account_test.go # Unit tests for Account CRUD\n│   ├── db.go           # Connection pool initialization & DBTX interface\n│   ├── entry.go        # Entry CRUD (ledger records)\n│   ├── main_test.go    # TestMain setup: global db connection for test suite\n│   ├── models.go       # Data models: Account, Entry, Transfer, User\n│   ├── store.go        # Store struct & execTx transaction manager\n│   ├── store_test.go   # Concurrency & deadlock test suite (Goroutines & Channels)\n│   ├── transfer.go     # Transfer CRUD\n│   ├── tx_transfer.go  # TransferTx: 5-step money transfer logic with deadlock prevention\n│   ├── user.go         # User CRUD\n│   └── user_test.go    # Unit tests for User CRUD\n├── token/\n│   ├── paseto_maker.go      # PasetoMaker: CreateToken, VerifyToken\n│   └── paseto_maker_test.go # Unit tests for token lifecycle\n├── util/\n│   ├── config.go       # LoadConfig: configuration management with Viper\n│   ├── currency.go     # Supported currency constants: USD, EUR, THB\n│   ├── password.go     # HashPassword & CheckPassword using Bcrypt\n│   ├── password_test.go# Unit tests for password hashing\n│   └── random.go       # Random data generators for testing\n├── app.env             # Local environment configuration\n├── docker-compose.yml  # Multi-service stack: Postgres + Migrate + API\n├── Dockerfile          # Multi-stage production Dockerfile (~20MB)\n├── go.mod\n├── go.sum\n├── Makefile            # Project command shortcuts\n└── main.go             # Application entry point",
        },
        {
          "t": "h2",
          "c": "3. สามโจทย์ท้าทายระดับ Advanced (Capstone Challenges)",
        },
        {
          "t": "p",
          "c": "หากคุณต้องการฝึกฝนทักษะเพื่อก้าวสู่วิศวกรระดับ Senior ลองต่อยอดฟีเจอร์เหล่านี้ด้วยตัวเอง:",
        },
        {
          "t": "ol",
          "c": [
            "**ระบบโอนเงินข้ามสกุลเงิน (Multi-Currency Exchange Transfer)**: อนุญาตให้โอนเงินจากบัญชี USD ไปเข้าบัญชี THB ได้ โดยสร้างตาราง `exchange_rates` และคำนวณอัตราแลกเปลี่ยน ณ วินาทีที่ทำรายการอย่างแม่นยำ",
            "**ป้องกันการกดย้ำด้วย Idempotency Key**: เมื่อเน็ตเวิร์กของลูกค้ากระตุก ลูกค้าอาจจะกดปุ่ม 'โอนเงิน' ซ้ำ 2 ครั้ง จงออกแบบระบบ Idempotency โดยรับ Header `Idempotency-Key: <UUID>` เพื่อรับประกันว่าแม้จะยิงคำสั่งเดิมซ้ำ 10 ครั้ง ธุรกรรมจะถูกตัดเงินเพียงครั้งเดียวเท่านั้น",
            "**เพิ่ม gRPC API Transport Layer**: สถาปัตยกรรม Clean Architecture ของเราอนุญาตให้เพิ่มช่องทางสื่อสารได้ง่าย ลองใช้ Protocol Buffers (protobuf) สร้าง gRPC Server รันคู่ขนานไปกับ Gin REST API",
          ],
        },
        {
          "t": "callout",
          "title": "🎓 บทสรุปสุดท้าย",
          "c": "คุณได้เดินทางผ่านหัวใจสำคัญที่สุดของระบบ Backend สมัยใหม่: จากการออกแบบ Schema ที่รัดกุม, การเขียน Raw SQL ที่มีประสิทธิภาพ, การรับประกัน ACID, การพิสูจน์และแก้ปัญหา Concurrency & Deadlock ด้วยคณิตศาสตร์, จนถึงระบบความปลอดภัยระดับสากล\n\nนำความรู้และโค้ดโปรเจกต์นี้ไปใส่ลงใน Portfolio และใช้เป็นฐานที่มั่นอันแข็งแกร่งในการทำงานจริงและการสัมภาษณ์งาน ขอให้ประสบความสำเร็จในเส้นทางวิศวกรซอฟต์แวร์ครับ! 🚀",
        },
      ],
      en: [],
    },
  },
};
