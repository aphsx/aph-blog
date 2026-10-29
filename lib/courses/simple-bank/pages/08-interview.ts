import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/08-interview.ts
// หน้าที่: บทที่ 8.1 สรุปเจาะลึก 10 คำถามสัมภาษณ์สาย Backend และสถาปัตยกรรมระดับสูง
// =============================================================================

export const interviewPages: Record<string, Page> = {
  "bank-interview-system-design": {
    "slug": "bank-interview-system-design",
    "title": {
      "th": "8.1 เจาะลึก 10 คำถามสัมภาษณ์ & สถาปัตยกรรมระดับสูง (System Design)",
      "en": "8.1 System Design & Backend Interview Masterclass"
    },
    "lead": {
      "th": "สรุป 10 คำถามสัมภาษณ์ยอดฮิตเกี่ยวกับระบบธนาคาร, Concurrency, Deadlock, Idempotency, Saga Pattern, และการออกแบบสถาปัตยกรรมสเกลล้านผู้ใช้",
      "en": "Mastering top 10 backend interview questions on banking systems, concurrency, deadlocks, idempotency, and distributed architectures."
    },
    "group": "8. สรุปสถาปัตยกรรม & เตรียมสอบสัมภาษณ์",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: สร้าง ทดสอบ และแพ็กระบบ Simple Bank ขึ้น Docker ครบสมบูรณ์ทั้งโปรเจกต์แล้ว\n• **ภารกิจในบทนี้**: ถอดบทเรียนจากโค้ดที่คุณเพิ่งเขียนทั้งหมด ให้กลายเป็นคำตอบสัมภาษณ์งานระดับมืออาชีพ 10 ข้อ พร้อมศึกษาแนวทางขยายระบบสู่ระดับ Distributed Microservices"
        },
        {
          "t": "h2",
          "c": "1. หมวด Concurrency, Locking & Database Consistency (คำถามข้อที่ 1–4)"
        },
        {
          "t": "h3",
          "c": "คำถามที่ 1: ถ้าบัญชี A โอนให้ B พร้อมกับบัญชี B โอนให้ A ในเวลาเดียวกัน จะเกิดอะไรขึ้น และแก้ไขอย่างไร?"
        },
        {
          "t": "p",
          "c": "• **ปัญหาที่เกิดขึ้น**: เกิด **Deadlock แบบ Circular Wait (การรอกันเป็นวงกลม)** เพราะ Transaction แรกล็อกบัญชี A แล้วรอขอล็อกบัญชี B ในขณะที่ Transaction ที่สองล็อกบัญชี B แล้วรอขอล็อกบัญชี A\n• **วิธีแก้ไขระดับ Production**: ใช้หลักการ **Strict Resource Ordering (การจัดลำดับการขอล็อกทรัพยากร)** โดยบังคับให้ทุก Transaction ต้องล็อกบัญชีที่มีรหัส `Account ID` น้อยกว่าก่อนเสมอ ไม่ว่าใครจะเป็นผู้โอนหรือผู้รับ ทำให้ไม่มีทางเกิดวงจรการรอแบบงูกินหางได้ 100%"
        },
        {
          "t": "h3",
          "c": "คำถามที่ 2: Pessimistic Locking กับ Optimistic Locking ต่างกันอย่างไร และระบบธนาคารควรเลือกแบบไหน?"
        },
        {
          "t": "table",
          "head": [
            "หัวข้อเปรียบเทียบ",
            "Pessimistic Locking (ล็อกก่อนแก้)",
            "Optimistic Locking (แก้ก่อนค่อยเช็กเวอร์ชัน)"
          ],
          "rows": [
            [
              "กลไกการทำงาน",
              "ใช้ `SELECT ... FOR NO KEY UPDATE` หรือ Atomic `UPDATE` เพื่อล็อกแถวทันที คนที่มาทีหลังต้องเข้าคิวรอจนกว่าจะ Commit",
              "ไม่ล็อกแถวตอนอ่าน แต่ใช้คอลัมน์ `version` เช็กตอนอัปเดต (`WHERE id = $1 AND version = $2`) ถ้าเวอร์ชันเปลี่ยนไปแล้วให้ล้มเหลวแล้วสั่ง Retry"
            ],
            [
              "เหมาะกับงานแบบใด?",
              "**เหมาะกับระบบการเงินและคลังสินค้าที่มีการแย่งสูง (High Contention)** เพราะไม่ต้องเสียทรัพยากร CPU รันคำสั่งแล้วล้มเหลวซ้ำๆ",
              "**เหมาะกับระบบที่โอกาสชนกันต่ำ (Low Contention)** เช่น การแก้ไขข้อมูลโปรไฟล์หรือการตั้งค่าทั่วไป"
            ]
          ]
        },
        {
          "t": "h3",
          "c": "คำถามที่ 3: ทำไมใน PostgreSQL ถึงเลือกใช้ FOR NO KEY UPDATE แทน FOR UPDATE?"
        },
        {
          "t": "p",
          "c": "เพราะตาราง `transfers` และ `entries` มี **Foreign Key** ชี้มายัง `accounts(id)` เวลาที่เราสั่ง `INSERT INTO transfers` ฐานข้อมูลจะต้องขอ Lock เบาๆ เพื่อตรวจว่า `id` ของบัญชียังอยู่จริง หากเราใช้ `FOR UPDATE` (ซึ่งเป็น Lock ที่แรงที่สุด) มันจะไปบล็อกการตรวจ Foreign Key จนเกิดคอขวดและ Deadlock ได้ง่าย แต่การโอนเงินแก้ไขเฉพาะคอลัมน์ `balance` ไม่ได้แก้คอลัมน์ `id` การใช้ `FOR NO KEY UPDATE` จึงป้องกันการแก้ `balance` ซ้อนกันได้ครบถ้วนโดยไม่บล็อกการตรวจ Foreign Key"
        },
        {
          "t": "h3",
          "c": "คำถามที่ 4: ทำไมห้ามใช้ sync.Mutex ของภาษา Go ล็อกยอดเงินแทนการล็อกในฐานข้อมูล?"
        },
        {
          "t": "p",
          "c": "เพราะ `sync.Mutex` ล็อกได้เฉพาะ Goroutines ที่รันอยู่ **ภายในโปรเซสของเซิร์ฟเวอร์เครื่องเดียวกัน (In-Memory Process)** เท่านั้น ในระบบจริงที่รัน Go API Server หลายเครื่องคู่ขนานกันหลัง Load Balancer (เช่น 5 Pods บน Kubernetes) คำขอที่วิ่งไปคนละเครื่องจะไม่เห็น `sync.Mutex` ของอีกเครื่องเลย ดังนั้นการล็อกข้อมูลเงินจึงต้องทำที่ระดับฐานข้อมูล (Database Row Lock) ที่ทุกเครื่องเชื่อมต่อร่วมกันเสมอ"
        },
        {
          "t": "h2",
          "c": "2. หมวดสถาปัตยกรรมขยายระบบ & ความปลอดภัย (คำถามข้อที่ 5–10)"
        },
        {
          "t": "h3",
          "c": "คำถามที่ 5: จะป้องกันปัญหาลูกค้ากดปุ่มโอนเงินซ้ำ 2 ครั้งติดกัน (Double Submit / Network Retry) ได้อย่างไร?"
        },
        {
          "t": "p",
          "c": "ใช้กลไก **Idempotency Key** โดยให้แอปฝั่งหน้าบ้านสุ่มรหัส `Idempotency-Key` (UUID v4) แนบมาใน HTTP Header ทุกครั้งที่กดปุ่มโอนเงิน เซิร์ฟเวอร์จะนำคีย์นี้ไปบันทึกใน Redis ด้วยคำสั่ง `SET idempotency:<key> PROCESSING NX EX 120` หากมีคำขอซ้ำด้วยคีย์เดิมยิงเข้ามาอีก Redis จะปฏิเสธทันที ทำให้เซิร์ฟเวอร์ไม่ตัดเงินซ้ำสอง"
        },
        {
          "t": "h3",
          "c": "คำถามที่ 6: ถ้าบัญชีต้นทางกับบัญชีปลายทางอยู่คนละ Database (ข้ามธนาคารหรือแยก Microservices) จะจัดการอย่างไร?"
        },
        {
          "t": "p",
          "c": "เมื่อข้ามฐานข้อมูลจะใช้ `BEGIN ... COMMIT` ก้อนเดียวไม่ได้ ต้องเปลี่ยนมาใช้ **Saga Pattern** ร่วมกับ **Transactional Outbox Pattern** โดยแบ่งเป็น Local Transaction ย่อยของแต่ละฝั่ง สื่อสารกันผ่าน Message Broker (เช่น Kafka) และหากการเพิ่มเงินฝั่งปลายทางล้มเหลว ระบบจะส่งคำสั่ง **Compensating Transaction (ทรานแซกชันชดเชย)** เพื่อคืนเงินกลับเข้าบัญชีต้นทางโดยอัตโนมัติ"
        },
        {
          "t": "h3",
          "c": "คำถามที่ 7: หากมีบัญชีรับบริจาคที่มีคนโอนเงินเข้าพร้อมกันวินาทีละ 10,000 ครั้ง (Hot Account) จะแก้ปัญหาคอขวดจากการแย่งล็อกแถวเดียวอย่างไร?"
        },
        {
          "t": "p",
          "c": "ใช้เทคนิค **Sub-Accounts (Sharded Counters)** หรือ **Batch Aggregation** โดยแทนที่จะอัปเดตแถวบัญชีหลักแถวเดียวทุกครั้งที่มีคนโอนเข้า ให้กระจายยอดเงินเข้าสู่บัญชีย่อยหลายๆ แถว (เช่น `acc_1_shard_01` ถึง `acc_1_shard_20`) หรือบันทึกเฉพาะแถว `entries` แบบ Append-Only แล้วรวบยอดอัปเดต `balance` ทุกๆ 1 วินาที"
        },
        {
          "t": "h3",
          "c": "คำถามที่ 8: อธิบายระดับการแยกตัวของ Transaction (Isolation Levels) ทั้ง 4 ระดับ"
        },
        {
          "t": "table",
          "head": [
            "Isolation Level",
            "Dirty Read (อ่านค่าที่ยังไม่ Commit)",
            "Non-Repeatable Read (อ่านซ้ำค่าเปลี่ยน)",
            "Phantom Read (อ่านซ้ำเจอแถวใหม่)"
          ],
          "rows": [
            [
              "1. Read Uncommitted",
              "เกิดได้",
              "เกิดได้",
              "เกิดได้"
            ],
            [
              "2. Read Committed (ค่าเริ่มต้นของ Postgres)",
              "ป้องกันได้",
              "เกิดได้ (จึงต้องใช้ Row Lock ช่วย)",
              "เกิดได้"
            ],
            [
              "3. Repeatable Read",
              "ป้องกันได้",
              "ป้องกันได้",
              "ป้องกันได้ใน PostgreSQL (MVCC)"
            ],
            [
              "4. Serializable",
              "ป้องกันได้ 100%",
              "ป้องกันได้ 100%",
              "ป้องกันได้ 100% (แต่ต้องเขียนโค้ดรองรับการ Retry)"
            ]
          ]
        },
        {
          "t": "h3",
          "c": "คำถามที่ 9: ทำไมจึงห้ามใช้ชนิดข้อมูล FLOAT เก็บเงิน และทำไมต้องใช้ PASETO แทน JWT?"
        },
        {
          "t": "p",
          "c": "• **ห้ามใช้ FLOAT**: เพราะเลขทศนิยมฐานสองตามมาตรฐาน IEEE 754 มีความคลาดเคลื่อนในการปัดเศษ (เช่น `0.1 + 0.2 = 0.30000000000000004`) จึงต้องเก็บเป็นจำนวนเต็ม `BIGINT` (`int64`) ในหน่วยย่อยที่สุด (สตางค์/เซนต์) เสมอ\n• **ใช้ PASETO แทน JWT**: เพราะ PASETO บังคับใช้อัลกอริทึมเข้ารหัสที่ปลอดภัยตามเวอร์ชัน (เช่น ChaCha20-Poly1305) ปิดช่องโหว่ `alg: none` และเข้ารหัสลับข้อมูลภายใน Payload ไม่ให้คนนอกแอบอ่านได้"
        },
        {
          "t": "h3",
          "c": "คำถามที่ 10: Graceful Shutdown สำคัญต่อระบบการเงินอย่างไรเวลา Deploy โค้ดใหม่?"
        },
        {
          "t": "p",
          "c": "เวลาอัปเดตเวอร์ชันใหม่บนเซิร์ฟเวอร์ หากสั่งตัดโปรเซสทิ้งทันที คำสั่งโอนเงินที่กำลังรันอยู่กลางทางจะถูกตัดขาด การทำ **Graceful Shutdown** ด้วยการดักสัญญาณ `SIGTERM` แล้วเรียก `httpServer.Shutdown(ctx)` จะสั่งให้เซิร์ฟเวอร์หยุดรับคำขอใหม่ แต่รอให้คำขอโอนเงินที่ค้างอยู่ทำงานจน `COMMIT` เสร็จเรียบร้อยก่อนจึงค่อยปิดตัวลง"
        },
        {
          "t": "h2",
          "c": "3. แผนผังสถาปัตยกรรมระดับ Enterprise เมื่อขยายสู่สเกลใหญ่"
        },
        {
          "t": "code",
          "lang": "text",
          "label": "Enterprise Banking System Design Architecture",
          "c": "                      [ Clients (Web / Mobile Apps) ]\n                                     |\n                                     v\n                        [ Cloudflare / AWS CloudFront ]\n                            (DDoS Protection & TLS)\n                                     |\n                                     v\n                          [ API Gateway / Envoy ]\n                      (Rate Limiting & Idempotency Key)\n                                     |\n                    +----------------+----------------+\n                    |                                 |\n                    v                                 v\n        [ Go API Pod 1 (Gin) ]            [ Go API Pod 2 (Gin) ]\n                    |                                 |\n                    +----------------+----------------+\n                                     |\n               +---------------------+---------------------+\n               |                                           |\n               v                                           v\n       [ Redis Cluster ]                          [ PostgreSQL Primary ]\n (Idempotency Lock, Rate Limit,               (ACID Transactions, Row Locks,\n       Session Blacklist)                         Double-Entry Ledger)\n                                                           |\n                                                (Streaming Replication)\n                                                           |\n                                                           v\n                                                  [ PostgreSQL Replica ]\n                                                   (Read-Only Statement)"
        },
        {
          "t": "callout",
          "title": "🏆 บทสรุปส่งท้ายคอร์ส Simple Bank Masterclass",
          "c": "คุณได้เดินทางตั้งแต่การปูพื้นฐานไวยากรณ์ภาษา Go ทั้ง 10 กลไก, การออกแบบฐานข้อมูลบัญชีแยกประเภท, การเขียน Raw SQL CRUD และ Unit Tests, การสร้าง Transaction Manager, การปราบ Race Condition และ Deadlock ด้วย Goroutines, ไปจนถึงการสร้าง Gin REST API, ระบบความปลอดภัย PASETO, และการแพ็กขึ้น Docker ครบทุกขั้นตอน ขอให้คุณนำความเข้าใจเชิงลึกชุดนี้ไปต่อยอดสร้างระบบจริงและประสบความสำเร็จในการทำงานสาย Backend Engineer ครับ!"
        }
      ],
      "en": []
    }
  }
};
