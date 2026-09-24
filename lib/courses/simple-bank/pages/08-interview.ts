import type { Page } from "@/lib/types";

export const interviewPages: Record<string, Page> = {
  "bank-interview-system-design": {
    slug: "bank-interview-system-design",
    title: {
      th: "เจาะลึกคำถามสัมภาษณ์ & สถาปัตยกรรมระดับสูง (System Design & Interview Masterclass)",
      en: "System Design & Backend Interview Masterclass",
    },
    lead: {
      th: "รวม 10 คำถามสัมภาษณ์ยอดฮิตของบริษัทชั้นนำเกี่ยวกับระบบธนาคาร, Concurrency, Deadlock, Idempotency, และการขยายระบบสู่ Distributed Architecture สเกลล้านผู้ใช้",
      en: "Mastering top 10 backend interview questions on banking systems, concurrency, deadlocks, idempotency, and distributed architectures.",
    },
    group: "8. เตรียมตัวสัมภาษณ์งาน",
    blocks: {
      th: [
        {
          t: "p",
          c: "ในการสัมภาษณ์งานตำแหน่ง Backend Engineer (ตั้งแต่ระดับ Junior, Mid-Level จนถึง Senior/Staff) บริษัทเทคโนโลยีชั้นนำ เช่น Shopee, Grab, Agoda, LINE, ธนาคาร หรือแม้กระทั่ง Big Tech ระดับโลก มักจะหยิบยกโจทย์ **'ระบบโอนเงิน / การจัดการยอดเงิน (Money Transfer & Balance Management)'** มาเป็นข้อสอบหลักเสมอ",
        },
        {
          t: "callout",
          title: "🎯 ทำไมผู้สัมภาษณ์ถึงชอบโจทย์นี้มาก?",
          c: "เพราะมันเป็นโจทย์ที่ 'คัดกรองโปรแกรมเมอร์ที่เขียนโค้ดเป็น ออกจากวิศวกรที่เข้าใจระบบจริง' โปรแกรมเมอร์ทั่วไปจะตอบได้แค่การเขียน CRUD หรือใช้ ORM พื้นฐาน แต่คำถามเรื่อง Race Condition, Deadlock, และ Data Consistency จะวัดได้ทันทีว่าคุณเข้าใจสิ่งที่เกิดขึ้นในระดับหน่วยความจำและฐานข้อมูลจริงหรือไม่",
        },

        { t: "h2", c: "Top 10 คำถามสัมภาษณ์ยอดฮิต & แนวทางการตอบให้ได้คะแนนเต็ม" },

        { t: "h3", c: "ข้อที่ 1: ถ้าบัญชี 1 โอนให้บัญชี 2 พร้อมกับบัญชี 2 โอนให้บัญชี 1 เกิดอะไรขึ้น และแก้อย่างไร?" },
        {
          t: "p",
          c: "**จุดที่คนทั่วไปตอบผิด:** 'ให้ใช้ `sync.Mutex` ในภาษา Go ล็อกฟังก์ชันโอนเงินครับ'\n*เหตุผลที่ผิด:* หากเซิร์ฟเวอร์รันอยู่หลายเครื่อง (Horizontal Scaling เช่น รัน 5 Pods ใน Kubernetes) ตัว `sync.Mutex` จะล็อกได้เฉพาะ Goroutine ในเครื่องตัวเองเท่านั้น แต่คำขอที่วิ่งไปเครื่องอื่นจะยังชนกันและเกิดปัญหาอยู่ดี",
        },
        {
          t: "p",
          c: "**คำตอบระดับ Senior:**\n'จะเกิดปัญหา **Circular Wait Deadlock** ที่ระดับ Database ครับ เพราะ Transaction A ล็อกแถวบัญชี 1 แล้วรอล็อกบัญชี 2 ส่วน Transaction B ล็อกบัญชี 2 แล้วรอล็อกบัญชี 1 ทำให้ทั้งคู่รอซึ่งกันและกัน\n\nทางแก้ที่ถูกต้องและยั่งยืนที่สุดคือ **Strict Resource Ordering (การจัดลำดับทรัพยากร)** โดยในโค้ด Go เราจะเปรียบเทียบ Account ID เสมอ หากบัญชีใดมี ID น้อยกว่า ให้ระบบทำการล็อกหรืออัปเดตบัญชีนั้นก่อนเสมอ ไม่ว่าบัญชีนั้นจะเป็นผู้โอนหรือผู้รับโอน ซึ่งจะทำให้กราฟการรอคอยเป็น **Directed Acyclic Graph (DAG)** ปราศจากวงกลม (No Cycle) ส่งผลให้ Deadlock ไม่มีทางเกิดขึ้นในระบบได้ 100% ครับ'",
        },

        { t: "h3", c: "ข้อที่ 2: Pessimistic Locking VS Optimistic Locking ต่างกันอย่างไร และควรเลือกใช้เมื่อไหร่?" },
        {
          t: "table",
          head: ["หัวข้อ", "Pessimistic Locking (มองโลกในแง่ร้าย)", "Optimistic Locking (มองโลกในแง่ดี)"],
          rows: [
            [
              "กลไกการทำงาน",
              "ใช้คำสั่ง `SELECT ... FOR UPDATE` หรือล็อกแถวที่ระดับ Database ทันที ใครจะมาแตะต้องรอคิวก่อน",
              "ไม่ล็อกแถวตอนอ่าน แต่เพิ่มคอลัมน์ `version` หรือ `updated_at` ตอนบันทึกจะเช็ก `WHERE id = $1 AND version = $2` ถ้าเลขเวอร์ชันเปลี่ยนไปแล้ว จะถือว่าล้มเหลวและสั่ง Retry",
            ],
            [
              "กรณีที่เหมาะสม",
              "**ระบบการเงิน บัญชีธนาคาร หรือสินค้า Flash Sale ที่มีการแย่งกันสูงมาก (High Contention)** เพราะหากใช้ Optimistic Locking คำสั่งส่วนใหญ่จะชนกันและล้มเหลวจนต้อง Retry ซ้ำๆ เปลือง CPU",
              "**ระบบที่การชนกันต่ำ (Low Contention)** เช่น การแก้ไขข้อมูลโปรไฟล์ผู้ใช้, โพสต์บทความ, หรือระบบที่เน้นการอ่านเป็นหลัก (Read-Heavy)",
            ],
          ],
        },

        { t: "h3", c: "ข้อที่ 3: ทำไมใน PostgreSQL ถึงควรใช้ `SELECT ... FOR NO KEY UPDATE` แทน `FOR UPDATE`?" },
        {
          t: "p",
          c: "**แนวทางการตอบ:**\n'ใน PostgreSQL คำสั่ง `FOR UPDATE` จะทำการล็อกแถวแบบ Exclusive สูงสุด ซึ่งรวมไปถึงการบล็อกคำสั่งอื่นๆ ที่ต้องการเข้ามาตรวจสอบ Foreign Key ด้วย ในระบบธนาคาร ตาราง `transfers` มี Foreign Key อ้างอิงกลับมาที่ `accounts.id` หากเราใช้ `FOR UPDATE` ตัวเต็ม อาจทำให้เกิดการบล็อกการแทรกประวัติการโอนเงินโดยไม่จำเป็น\n\nการใช้ `FOR NO KEY UPDATE` เป็นการส่งสัญญาณบอก Database ว่า เราจะแก้ไขเฉพาะข้อมูลทั่วไป (เช่น balance) แต่จะไม่แตะต้อง Primary Key ทำให้การเช็ก Foreign Key จากตารางอื่นยังทำงานคู่ขนานกันได้อย่างมีประสิทธิภาพครับ'",
        },

        { t: "h3", c: "ข้อที่ 4: ป้องกันปัญหาผู้ใช้งานกดปุ่มโอนเงินซ้ำ 2 ครั้งติดกัน (Double Submit) อย่างไร?" },
        {
          t: "p",
          c: "**แนวทางการตอบ:**\n'เราจะใช้หลักการ **Idempotency (การกระทำซ้ำแล้วได้ผลลัพธ์เดิม)** โดยให้ Client ส่ง **Idempotency Key** (เช่น UUID v4) แนบมาใน HTTP Header ทุกครั้งที่มีการกดยืนยันโอนเงิน:\n\n1. เมื่อเซิร์ฟเวอร์ได้รับคำขอ จะนำ Idempotency Key ไปทำ `SET key value NX EX 120` ใน **Redis** (ล็อกไว้ชั่วคราว 2 นาที)\n2. หาก Redis คืนค่าว่า Key นี้มีอยู่แล้ว แสดงว่าเป็นคำขอซ้ำ ระบบจะปฏิเสธหรือคืนค่าผลลัพธ์เดิมกลับไปโดยไม่ตัดเงินซ้ำสอง\n3. เมื่อ Database Transaction บันทึกสำเร็จ จึงบันทึกผลลัพธ์ลงใน Database พร้อม Idempotency Key นั้นอย่างถาวรครับ'",
        },

        { t: "h3", c: "ข้อที่ 5: หากระบบถูกแยกเป็น Microservices และบัญชีอยู่คนละ Database จะจัดการโอนเงินอย่างไร?" },
        {
          t: "p",
          c: "**แนวทางการตอบ:**\n'เมื่อข้ามฐานข้อมูล เราไม่สามารถใช้ Local ACID Transaction (`BEGIN...COMMIT`) ได้อีกต่อไป ทางเลือกในการจัดการมี 2 รูปแบบหลัก:\n\n1. **Two-Phase Commit (2PC):** มี Coordinator คอยสั่ง Prepare และ Commit ข้าม Database แต่ข้อเสียคือประสิทธิภาพต่ำและเสี่ยงต่อการค้างหาก Coordinator ล่ม\n2. **Saga Pattern (แนะนำ):** แบ่งการทำงานเป็น Local Transaction ย่อยๆ ของแต่ละ Service และใช้ **Compensating Transaction (ทรานแซกชันชดเชย)** ในการย้อนเงินกลับหากสเต็ปปลายทางล้มเหลว โดยสื่อสารผ่าน Message Queue (เช่น Apache Kafka) และประยุกต์ใช้ **Transactional Outbox Pattern** เพื่อการันตีว่าข้อความจะไม่สูญหายครับ'",
        },

        { t: "h3", c: "ข้อที่ 6: ปัญหา Hot Account (เช่น บัญชีรับบริจาคที่มีคนโอนเข้าวินาทีละ 10,000 ครั้ง) จะแก้คอขวดอย่างไร?" },
        {
          t: "p",
          c: "**แนวทางการตอบ:**\n'หากมีคนโอนเงินเข้าบัญชีเดียวพร้อมกัน 10,000 คำสั่งต่อวินาที การล็อกแถวเดิมใน PostgreSQL จะกลายเป็นคอขวดทันที (Lock Contention) วิธีแก้มีดังนี้:\n\n1. **ฝั่งเงินเข้าไม่ต้องแย่งกันล็อก:** บันทึกประวัติเงินเข้าลงในตาราง `entries` ทันทีแบบ Append-Only (เพราะการ `INSERT` แถวใหม่ไม่แย่ง Lock กัน)\n2. **Sharded Counters / Distributed Sub-accounts:** แตกบัญชีหลักออกเป็นบัญชีย่อยในระบบภายใน เช่น บัญชี 101_A, 101_B, ... แล้วสุ่มกระจายเงินเข้าบัญชีย่อย จากนั้นค่อยมี Background Worker ทำการรวมยอด (Reconciliation) สรุปยอดรวมกลับมายังบัญชีหลักในภายหลัง\n3. **Batch Aggregation:** นำรายการเงินเข้าเข้าสู่ Queue (Kafka/Redis Stream) แล้วทำการรวบยอด (Batch) ทุกๆ 1 วินาที เช่น รวม 5,000 รายการ แล้วยิงคำสั่ง `UPDATE` เพิ่มยอดเงินทีเดียวครับ'",
        },

        { t: "h3", c: "ข้อที่ 7: อธิบาย Transaction Isolation Levels ทั้ง 4 ระดับ และปรากฏการณ์ความผิดพลาด" },
        {
          t: "table",
          head: ["ระดับ (Isolation Level)", "Dirty Read (อ่านข้อมูลที่ยังไม่ commit)", "Non-Repeatable Read (อ่านซ้ำแล้วค่าเปลี่ยน)", "Phantom Read (อ่านซ้ำแล้วเจอแถวใหม่โผล่มา)"],
          rows: [
            ["Read Uncommitted", "เกิดได้", "เกิดได้", "เกิดได้"],
            ["Read Committed (Default ของ Postgres)", "ป้องกันได้", "เกิดได้", "เกิดได้"],
            ["Repeatable Read", "ป้องกันได้", "ป้องกันได้", "เกิดได้ (ใน Postgres ป้องกันได้เกือบหมด)"],
            ["Serializable (เข้มงวดสูงสุด)", "ป้องกันได้", "ป้องกันได้", "ป้องกันได้ 100% (แต่แลกกับความช้า)"],
          ],
        },

        { t: "h3", c: "ข้อที่ 8: ทำไมระบบธนาคารถึงต้องเก็บเงินเป็นจำนวนเต็ม (Integer) และห้ามใช้ Float?" },
        {
          t: "p",
          c: "**แนวทางการตอบ:**\n'เนื่องจากมาตรฐาน IEEE 754 ของคอมพิวเตอร์ แทนค่าเลขทศนิยมด้วยฐานสอง ซึ่งไม่สามารถแทนค่าทศนิยมฐานสิบอย่าง 0.1 หรือ 0.2 ได้อย่างแม่นยำ (เช่น `0.1 + 0.2 = 0.30000000000000004`)\n\nในระบบการเงินระดับสากล เราจะเก็บตัวเลขเป็น **Smallest Currency Unit (หน่วยเงินย่อยที่สุด)** เสมอ เช่น บาทเก็บเป็นสตางค์ หรือดอลลาร์เก็บเป็นเซนต์ โดยใช้ชนิดข้อมูล `BIGINT` (64-bit integer) ซึ่งการันตีความถูกต้องแม่นยำ 100% ไร้ข้อผิดพลาดจากการปัดเศษครับ'",
        },

        { t: "h3", c: "ข้อที่ 9: ทำไมใน Go ถึงนิยมใช้ `testify/require` มากกว่า `testify/assert` ในการทดสอบ Database?" },
        {
          t: "p",
          c: "**แนวทางการตอบ:**\n'`assert` เมื่อการตรวจสอบล้มเหลว จะเพียงแค่พ่นข้อความเตือน แต่จะปล่อยให้โค้ดบรรทัดถัดไปทำงานต่อ ซึ่งหากขั้นตอนการสร้างบัญชีล้มเหลว ตัวแปรบัญชีจะมีค่าเป็น nil การปล่อยให้โค้ดรันต่อไปจะทำให้โปรแกรมเกิด `panic: runtime error: invalid memory address or nil pointer dereference`\n\nส่วน `require` จะทำการเรียก `t.FailNow()` เพื่อหยุดการรันเทสต์ของฟังก์ชันนั้นทันที ทำให้ผลลัพธ์ของเทสต์ชัดเจนและไม่เกิด Panic ซ้อนครับ'",
        },

        { t: "h3", c: "ข้อที่ 10: Graceful Shutdown ในระบบเซิร์ฟเวอร์การเงินสำคัญอย่างไร?" },
        {
          t: "p",
          c: "**แนวทางการตอบ:**\n'เวลาที่เรา Deploy โค้ดเวอร์ชันใหม่บน Kubernetes เซิร์ฟเวอร์ตัวเก่าจะได้รับสัญญาณ `SIGTERM` หากเราสั่งปิดโปรเซสทันที คำสั่งโอนเงินที่กำลังค้างอยู่ใน Transaction อาจถูกตัดกลางคัน\n\nการทำ Graceful Shutdown ใน Go ด้วย `server.Shutdown(ctx)` จะสั่งให้เซิร์ฟเวอร์หยุดรับ Request ใหม่ แต่จะรอให้ Request เดิมที่กำลังประมวลผลอยู่ทำงานให้เสร็จสิ้นและ Commit ลง Database เรียบร้อยก่อนที่จะปิดโปรเซสลงอย่างปลอดภัยครับ'",
        },

        { t: "h2", c: "ภาพรวมสถาปัตยกรรมระดับ Production (High-Level Architecture)" },
        {
          t: "p",
          c: "นี่คือภาพจำลองสถาปัตยกรรมระดับสากลที่คุณสามารถนำไปใช้วาดบนไวท์บอร์ดเวลาสอบสัมภาษณ์รอบ System Design:",
        },
        {
          t: "code",
          lang: "text",
          label: "Enterprise Banking System Design",
          c: `                      [ Clients (Web / Mobile Apps) ]
                                     |
                                     v
                        [ Cloudflare / AWS CloudFront ]
                            (DDoS Protection & SSL)
                                     |
                                     v
                          [ API Gateway / Envoy ]
                      (Rate Limiting & Authentication)
                                     |
                    +----------------+----------------+
                    |                                 |
                    v                                 v
        [ Go API Pod 1 (Gin) ]            [ Go API Pod 2 (Gin) ]
                    |                                 |
                    +----------------+----------------+
                                     |
               +---------------------+---------------------+
               |                                           |
               v                                           v
       [ Redis Cluster ]                          [ PostgreSQL Primary ]
 (Idempotency, Token Blacklist,               (ACID Transactions, Row Locks,
        Rate Limit Cache)                          Strict Ledger Tables)
                                                           |
                                                (Streaming Replication)
                                                           |
                                                           v
                                                  [ PostgreSQL Replica ]
                                                   (Read-Only Analytics)`,
        },

        {
          t: "callout",
          title: "🏆 สรุปความพร้อมสู่สนามสัมภาษณ์",
          c: "หากคุณเข้าใจและสามารถอธิบายตั้งแต่ระดับ Low-Level (Row Locks, Goroutines, Resource Ordering) ไปจนถึง High-Level (Idempotency, System Design, Saga Pattern) ได้อย่างเป็นขั้นเป็นตอน คุณจะมีความพร้อมเหนือกว่าผู้สมัครทั่วไปในตลาดกว่า 90% แน่นอนครับ ขอให้มั่นใจในองค์ความรู้ชุดนี้และลุยได้อย่างเต็มที่!",
        },
      ],
      en: [],
    },
  },
};
