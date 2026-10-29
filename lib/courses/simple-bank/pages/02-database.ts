import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/02-database.ts
// หน้าที่: บทที่ 2 ออกแบบฐานข้อมูลสมุดบัญชีแยกประเภท (Ledger) และจัดการ Migration ด้วย Docker
// =============================================================================

export const databasePages: Record<string, Page> = {
  "bank-schema-design": {
    "slug": "bank-schema-design",
    "title": {
      "th": "2.1 ออกแบบ Schema & สมุดบัญชีแยกประเภท (Ledger Architecture)",
      "en": "2.1 Database Schema & Ledger Architecture"
    },
    "lead": {
      "th": "ทำไมระบบธนาคารห้ามแก้ไขตัวเลขยอดเงินตรงๆ ในตาราง Account อย่างเดียว — เจาะลึกระบบ Ledger ที่ห้ามแก้ไขประวัติย้อนหลัง (Immutable) และออกแบบ 3 ตารางหลัก",
      "en": "Why real banking systems never mutate account balances directly — mastering immutable ledgers and designing accounts, entries, and transfers tables."
    },
    "group": "2. ออกแบบฐานข้อมูล & สมุดบัญชีแยกประเภท",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: ปูพื้นฐานสถาปัตยกรรม 3 เลเยอร์ และเข้าใจไวยากรณ์ภาษา Go ทั้ง 10 กลไกหลัก\n• **ภารกิจในบทนี้**: ออกแบบโครงสร้างตารางฐานข้อมูล PostgreSQL ทั้ง 3 ตาราง (`accounts`, `entries`, `transfers`) ตามหลักสมุดบัญชีแยกประเภท (Immutable Ledger) และพิสูจน์ว่าทำไมห้ามใช้ `float` เก็บเงิน\n• **ไวยากรณ์ & Best Practices ที่ใช้ในบทนี้**: ชนิดข้อมูล `int64` เทียบกับ `float64` ใน Go และคำสั่ง SQL DDL (`CREATE TABLE`, `FOREIGN KEY`, `CHECK`, `CREATE INDEX`)"
        },
        {
          "t": "p",
          "c": "ถ้าเราให้โปรแกรมเมอร์มือใหม่มาออกแบบระบบธนาคาร สิ่งแรกที่พวกเขามักจะทำคือ สร้างตาราง `accounts` มีคอลัมน์ `id` กับ `balance` แล้วเวลาโอนเงิน ก็เขียนคำสั่งง่ายๆ แบบนี้:"
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "คำสั่งที่ห้ามทำในระบบธนาคารจริง! (❌ ห้ามใช้ Direct Mutation โดยไร้ Ledger)",
          "c": "-- แบบที่ผิดมหันต์!\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;"
        },
        {
          "t": "callout",
          "title": "⚠️ ทำไมการทำแบบนี้ถึงเป็นหายนะ?",
          "c": "เพราะมันไม่มี 'หลักฐาน (Audit Trail)' หลงเหลืออยู่เลย! ถ้ายอดเงินของลูกค้าหายไป 100 บาท ธนาคารจะไม่สามารถตอบได้เลยว่าเงินนั้นหายไปไหน? ใครเป็นคนโอน? โอนไปหาใคร? เวลาใด? หรือระบบเกิดคำนวณผิดพลาดตรงไหน?",
          "warn": true
        },
        {
          "t": "p",
          "c": "ในระบบการเงินมาตรฐานสากล ทุกครั้งที่ยอดเงินขยับจะต้องมีการ `INSERT` แถวประวัติใหม่ไว้เป็นหลักฐานเสมอ โดยแถวที่บันทึกไปแล้วห้าม `UPDATE` และห้าม `DELETE` ย้อนหลังเด็ดขาด (เรียกว่า **Immutable Ledger** หรือสมุดบัญชีที่เพิ่มได้อย่างเดียว) เมื่อฝั่งหนึ่งมีเงินออก (`-100`) อีกฝั่งต้องมีเงินเข้า (`+100`) ที่สมดุลกันเสมอตามหลักการบัญชีคู่ (**Double-Entry Bookkeeping**)"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go & Best Practices ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "กลไก & กฎเหล็กในบทนี้",
            "คำสั่งที่ใช้",
            "ทำไมถึงเป็น Best Practice ระดับโลก?"
          ],
          "rows": [
            [
              "1. Immutable Double-Entry Ledger",
              "ตาราง `entries` และ `transfers` แบบ Append-Only",
              "ห้ามแก้ไขยอดเงินใน `accounts` ลอยๆ โดยไม่มีประวัติเด็ดขาด ทุกการขยับของเงินต้องมีใบเสร็จ (`transfers`) และรายการเดินบัญชีคู่ (`entries` ฝั่งลบและฝั่งบวก) เสมอ"
            ],
            [
              "2. เก็บเงินด้วยจำนวนเต็ม 64 บิต",
              "SQL: `bigint` / Go: `int64`",
              "เลขทศนิยม `float64` มีความเพี้ยนจากเลขฐานสอง (`0.1 + 0.2 != 0.3`) จึงต้องเก็บเป็นหน่วยย่อยที่สุด (สตางค์/เซนต์) ด้วยจำนวนเต็ม 64 บิตเสมอ"
            ],
            [
              "3. กฎห้ามยอดเงินติดลบระดับ DB",
              "`CHECK (\"balance\" >= 0)`",
              "แม้โค้ด Go จะมีบั๊ก แต่ฐานข้อมูล PostgreSQL จะทำหน้าที่เป็นปราการด่านสุดท้าย ปฏิเสธทุกคำสั่งที่ทำให้ยอดเงินต่ำกว่า 0 ทันที"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. โครงสร้าง 3 ตารางหลักของ Simple Bank"
        },
        {
          "t": "p",
          "c": "ระบบธนาคารของเราจะประกอบด้วย 3 ตารางที่ร้อยเรียงกันอย่างเหนียวแน่น:"
        },
        {
          "t": "table",
          "head": [
            "ชื่อตาราง",
            "บทบาทหน้าที่ในระบบ",
            "พฤติกรรมของข้อมูล (Data Behavior)"
          ],
          "rows": [
            [
              "1. accounts",
              "เก็บข้อมูลบัญชีและยอดคงเหลือปัจจุบันของลูกค้า (เช่น นาย John มีเงิน 5,000 บาท)",
              "มีการ `INSERT` ตอนเปิดบัญชี และมีการ `UPDATE` ยอดเงิน (balance) เมื่อมีการโอนหรือฝากถอนสำเร็จ"
            ],
            [
              "2. entries",
              "ทำหน้าที่เป็น Ledger บันทึกทุกยอดเงินที่เข้า-ออกของแต่ละบัญชี (เงินเข้าเป็นบวก เงินออกเป็นลบ)",
              "**Append-Only เด็ดขาด!** มีแต่คำสั่ง `INSERT` เท่านั้น ห้ามมี `UPDATE` หรือ `DELETE` เพื่อใช้เป็นหลักฐานตรวจสอบย้อนหลัง"
            ],
            [
              "3. transfers",
              "บันทึกประวัติการทำธุรกรรมการโอนเงิน ระหว่างบัญชีต้นทาง (From) และบัญชีปลายทาง (To)",
              "**Append-Only เช่นกัน!** บันทึกว่าใครโอนให้ใคร เป็นจำนวนเงินเท่าใด ณ เวลาใด"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "3. ทำไมห้ามใช้ FLOAT หรือ DOUBLE เก็บเงินเด็ดขาด?"
        },
        {
          "t": "p",
          "c": "นี่คือกฎเหล็กข้อสำคัญที่สุดของวิศวกรซอฟต์แวร์: **ห้ามใช้ชนิดข้อมูลทศนิยมแบบ Floating-Point (เช่น float, double) ในการเก็บเงินเด็ดขาด!** มาดูการพิสูจน์จริงด้วยโค้ด Go:"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "float_vs_bigint.go",
          "code": "// =============================================================================\n// ไฟล์: float_vs_bigint.go\n// หน้าที่: สาธิตความแตกต่างระหว่างการใช้ Floating-Point (float64) เทียบกับ Integer (int64)\n// แก้ปัญหา: มาตรฐาน IEEE 754 ของ Float ทำให้เกิดความคลาดเคลื่อนในการคำนวณเงิน\n// =============================================================================\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\t// 1. ความคลาดเคลื่อนของ Float ในคอมพิวเตอร์ (IEEE 754 แทนเลขฐาน 10 เป็นฐาน 2 ไม่ลงตัว)\n\tvar floatA, floatB float64 = 0.1, 0.2\n\tfloatSum := floatA + floatB\n\tfmt.Printf(\">> คำนวณด้วย Float: 0.1 + 0.2 = %.17f\\n\", floatSum)\n\tfmt.Printf(\"   เปรียบเทียบว่าเท่ากับ 0.3 หรือไม่: %t (เงินเพี้ยนทันที!)\\n\\n\", floatSum == 0.3)\n\n\t// 2. การเก็บเป็นจำนวนเต็ม (Bigint) ในหน่วยย่อยที่สุด (สตางค์ หรือ เซนต์)\n\t// 10 เซนต์ + 20 เซนต์ = 30 เซนต์ ($0.10 + $0.20 = $0.30)\n\tvar centA, centB int64 = 10, 20\n\tcentSum := centA + centB\n\tfmt.Printf(\">> คำนวณด้วย Bigint: 10 เซนต์ + 20 เซนต์ = %d เซนต์\\n\", centSum)\n\tfmt.Printf(\"   เปรียบเทียบว่าเท่ากับ 30 เซนต์หรือไม่: %t (แม่นยำ 100%% ไร้การปัดเศษ!)\\n\", centSum == 30)\n}",
          "out": ">> คำนวณด้วย Float: 0.1 + 0.2 = 0.30000000000000004\n   เปรียบเทียบว่าเท่ากับ 0.3 หรือไม่: false (เงินเพี้ยนทันที!)\n\n>> คำนวณด้วย Bigint: 10 เซนต์ + 20 เซนต์ = 30 เซนต์\n   เปรียบเทียบว่าเท่ากับ 30 เซนต์หรือไม่: true (แม่นยำ 100% ไร้การปัดเศษ!)"
        },
        {
          "t": "p",
          "c": "หากระบบธนาคารรันคำนวณดอกเบี้ยหรือโอนเงินเป็นล้านๆ ครั้งต่อวัน เศษทศนิยมที่เพี้ยนจะสะสมจนทำให้ยอดเงินรวมของธนาคารไม่ตรงกับความเป็นจริง"
        },
        {
          "t": "callout",
          "title": "💡 ทางออกที่ถูกต้อง",
          "c": "เราจะใช้ชนิดข้อมูล `BIGINT` (จำนวนเต็ม 64-bit) และเก็บตัวเลขเป็น **'หน่วยย่อยที่สุด (Smallest Monetary Unit)'** เสมอ เช่น ในไทยเก็บเป็น 'สตางค์' (1 บาท = 100 สตางค์) หรือดอลลาร์เก็บเป็น 'เซนต์' (1 USD = 100 Cents) เช่น ยอด $10.50 จะถูกเก็บเป็นตัวเลขจำนวนเต็ม `1050` เสมอ ทำให้คำนวณได้แม่นยำ 100% ไร้ข้อผิดพลาด"
        },
        {
          "t": "h2",
          "c": "4. คำสั่ง SQL ออกแบบโครงสร้างตาราง (DDL)"
        },
        {
          "t": "p",
          "c": "ด้านล่างนี้คือโค้ด SQL ที่เราจะใช้สร้างตารางทั้ง 3 พร้อม Foreign Keys และ Indexes (ซึ่งในหัวข้อถัดไป เราจะนำโค้ดชุดนี้ไปบันทึกไว้ในไฟล์ Migration `simplebank/db/migration/000001_init_schema.up.sql`):"
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/migration/000001_init_schema.up.sql",
          "c": "-- =============================================================================\n-- ไฟล์: simplebank/db/migration/000001_init_schema.up.sql\n-- หน้าที่: สร้างตารางหลักทั้ง 3 (accounts, entries, transfers) พร้อม Foreign Keys & Indexes\n-- แก้ปัญหา: บังคับความถูกต้องของข้อมูลระดับ Database (ห้ามยอดเงินติดลบ และห้ามมีข้อมูลกำพร้า)\n-- =============================================================================\n-- 1. ตาราง Accounts\nCREATE TABLE \"accounts\" (\n  \"id\" bigserial PRIMARY KEY,\n  \"owner\" varchar NOT NULL,\n  \"balance\" bigint NOT NULL CHECK (\"balance\" >= 0), -- บังคับยอดเงินห้ามติดลบเด็ดขาด (No Overdraft)\n  \"currency\" varchar(3) NOT NULL,\n  \"created_at\" timestamptz NOT NULL DEFAULT (now())\n);\n\n-- 2. ตาราง Entries (Ledger เงินเข้า-ออก)\nCREATE TABLE \"entries\" (\n  \"id\" bigserial PRIMARY KEY,\n  \"account_id\" bigint NOT NULL,\n  \"amount\" bigint NOT NULL, -- บวกคือเงินเข้า, ลบคือเงินออก\n  \"created_at\" timestamptz NOT NULL DEFAULT (now())\n);\n\n-- 3. ตาราง Transfers (ประวัติการโอนเงิน)\nCREATE TABLE \"transfers\" (\n  \"id\" bigserial PRIMARY KEY,\n  \"from_account_id\" bigint NOT NULL,\n  \"to_account_id\" bigint NOT NULL,\n  \"amount\" bigint NOT NULL, -- ต้องมากกว่า 0 เสมอ\n  \"created_at\" timestamptz NOT NULL DEFAULT (now())\n);\n\n-- กำหนด Foreign Key ผูกความสัมพันธ์\nALTER TABLE \"entries\" ADD FOREIGN KEY (\"account_id\") REFERENCES \"accounts\" (\"id\") ON DELETE CASCADE;\nALTER TABLE \"transfers\" ADD FOREIGN KEY (\"from_account_id\") REFERENCES \"accounts\" (\"id\") ON DELETE CASCADE;\nALTER TABLE \"transfers\" ADD FOREIGN KEY (\"to_account_id\") REFERENCES \"accounts\" (\"id\") ON DELETE CASCADE;\n\n-- สร้าง Index เพื่อความเร็วสูงสุดในการค้นหา (Query Performance)\nCREATE INDEX ON \"accounts\" (\"owner\");\nCREATE INDEX ON \"entries\" (\"account_id\");\nCREATE INDEX ON \"transfers\" (\"from_account_id\");\nCREATE INDEX ON \"transfers\" (\"to_account_id\");\nCREATE INDEX ON \"transfers\" (\"from_account_id\", \"to_account_id\");"
        },
        {
          "t": "h3",
          "c": "1. เจาะลึกกฎเหล็กระดับคอลัมน์ (Column Constraints & Types)"
        },
        {
          "t": "ul",
          "c": [
            "**`bigserial PRIMARY KEY`**: กำหนดให้ id เป็นเลขจำนวนเต็ม 64-bit ที่รันเพิ่มขึ้นอัตโนมัติ (Auto-increment) รองรับธุรกรรมได้หลายล้านล้านแถวโดยไม่ต้องกลัว id เต็ม",
            "**`CHECK (balance >= 0)`**: กฎเหล็กระดับฐานข้อมูลที่ป้องกันไม่ให้ยอดเงินในบัญชีติดลบเด็ดขาด (No Overdraft) หากมีคำสั่งใดพยายามตัดเงินเกินยอดคงเหลือ PostgreSQL จะ Reject คำสั่งทันทีและทำให้ Transaction เข้าสู่ Auto Rollback ตามหลัก Consistency",
            "**`timestamptz`**: เก็บวันเวลาพร้อม Timezone ป้องกันปัญหาเรื่องเวลาสับสนเมื่อระบบขยายไปหลายประเทศ"
          ]
        },
        {
          "t": "h3",
          "c": "2. การผูกความสัมพันธ์ระดับตาราง (Foreign Keys & Cascade Rules)"
        },
        {
          "t": "p",
          "c": "เพื่อป้องกัน 'ข้อมูลกำพร้า (Orphan Data)' หรือการบันทึกประวัติเงินลอยๆ โดยไม่มีบัญชีอยู่จริง เราจะใช้ Foreign Key ผูกความสัมพันธ์แบบ Strict:"
        },
        {
          "t": "table",
          "head": [
            "ตารางลูก (Child Table)",
            "คอลัมน์ Foreign Key",
            "อ้างอิงตารางแม่ (Parent Table)",
            "เงื่อนไข Cascade (ON DELETE CASCADE)"
          ],
          "rows": [
            [
              "entries",
              "account_id",
              "accounts (id)",
              "หากบัญชีถูกลบ ประวัติเงินเข้า-ออกของบัญชีนั้นจะถูกลบตามทันที"
            ],
            [
              "transfers",
              "from_account_id",
              "accounts (id)",
              "บัญชีต้นทางที่โอนเงินต้องมีตัวตนอยู่จริงในระบบ"
            ],
            [
              "transfers",
              "to_account_id",
              "accounts (id)",
              "บัญชีปลายทางที่รับเงินต้องมีตัวตนอยู่จริงในระบบ"
            ]
          ]
        },
        {
          "t": "h3",
          "c": "3. แผนผัง Index และความเร็วในการค้นหา (Query Performance Matrix)"
        },
        {
          "t": "p",
          "c": "การสร้าง Index ช่วยเปลี่ยนความเร็วในการค้นหาจาก Full Table Scan ($O(N)$) ให้เป็น Binary Search Tree ($O(\\log N)$) ด้านล่างนี้คือตารางแจกแจง Index ทั้ง 5 ตัวในระบบ พร้อมเหตุผลและ Use Case:"
        },
        {
          "t": "table",
          "head": [
            "ลำดับ",
            "ตาราง",
            "คอลัมน์ที่สร้าง Index",
            "ประเภท Index",
            "คำสั่ง SQL ที่ได้รับประโยชน์สูงสุด (Query Use Case)"
          ],
          "rows": [
            [
              "1",
              "accounts",
              "owner",
              "Single B-Tree",
              "WHERE owner = 'alice' (ค้นหาบัญชีทั้งหมดของลูกค้าคนใดคนหนึ่ง)"
            ],
            [
              "2",
              "entries",
              "account_id",
              "Single B-Tree",
              "WHERE account_id = 1 (ดึง Statement รายการเงินเข้า-ออกของบัญชี)"
            ],
            [
              "3",
              "transfers",
              "from_account_id",
              "Single B-Tree",
              "WHERE from_account_id = 1 (ดึงประวัติการโอนเงินออกจากบัญชีนี้)"
            ],
            [
              "4",
              "transfers",
              "to_account_id",
              "Single B-Tree",
              "WHERE to_account_id = 1 (ดึงประวัติการรับเงินโอนเข้าสู่บัญชีนี้)"
            ],
            [
              "5",
              "transfers",
              "from_account_id, to_account_id",
              "Composite B-Tree",
              "WHERE from_account_id = 1 AND to_account_id = 2 (ดึงประวัติการโอนระหว่าง 2 คนที่เจาะจง)"
            ]
          ]
        },
        {
          "t": "h3",
          "c": "4. ตรวจสอบ Schema จริงผ่าน psql (\\d accounts)"
        },
        {
          "t": "p",
          "c": "ในบทถัดไป เมื่อเราเริ่มรัน Docker PostgreSQL และรัน Migration เราจะสามารถใช้คำสั่ง `\\d accounts` ใน `psql` เพื่อตรวจสอบโครงสร้างตารางจริง ซึ่งจะแสดงผลลัพธ์แยกเป็น 4 โซนสำคัญ:"
        },
        {
          "t": "codeout",
          "lang": "sql",
          "label": "ตัวอย่าง Schema ตาราง accounts ที่ได้เมื่อตรวจสอบด้วย psql (\\d accounts)",
          "code": "\\d accounts",
          "out": "                                         Table \"public.accounts\"\n   Column   |           Type           | Collation | Nullable |               Default                \n------------+--------------------------+-----------+----------+--------------------------------------\n id         | bigint                   |           | not null | nextval('accounts_id_seq'::regclass)\n owner      | character varying        |           | not null | \n balance    | bigint                   |           | not null | \n currency   | character varying(3)     |           | not null | \n created_at | timestamp with time zone |           | not null | now()\nIndexes:\n    \"accounts_pkey\" PRIMARY KEY, btree (id)\n    \"accounts_owner_idx\" btree (owner)\nCheck constraints:\n    \"accounts_balance_check\" CHECK (balance >= 0)\nReferenced by:\n    TABLE \"entries\" CONSTRAINT \"entries_account_id_fkey\" FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE\n    TABLE \"transfers\" CONSTRAINT \"transfers_from_account_id_fkey\" FOREIGN KEY (from_account_id) REFERENCES accounts(id) ON DELETE CASCADE\n    TABLE \"transfers\" CONSTRAINT \"transfers_to_account_id_fkey\" FOREIGN KEY (to_account_id) REFERENCES accounts(id) ON DELETE CASCADE"
        },
        {
          "t": "callout",
          "title": "🔍 สรุป 4 โซนสำคัญที่มองเห็นในผลลัพธ์ psql",
          "c": "1. **Columns:** รายการฟิลด์และ Data Types (`bigint`, `varchar`, `timestamptz`)\n2. **Indexes:** มีทั้ง `accounts_pkey` (สร้างอัตโนมัติจาก Primary Key) และ `accounts_owner_idx` ที่เราสั่งสร้าง\n3. **Check constraints:** มี `accounts_balance_check` คอย Guard ยอดเงินไม่ให้ติดลบ\n4. **Referenced by:** แสดงความสัมพันธ์ย้อนกลับว่ามีตาราง `entries` และ `transfers` ผูก Foreign Key มาที่ตารางนี้"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• คุณได้ออกแบบ Schema มาตรฐานระบบการเงินครบทั้ง 3 ตาราง (`accounts`, `entries`, `transfers`) พร้อมกำหนดชนิดข้อมูล `bigint`, กฎห้ามติดลบ `CHECK (balance >= 0)`, Foreign Keys และ Indexes ครบถ้วนแล้ว\n• **ก้าวต่อไป (บทที่ 2.2)**: เราจะนำโค้ด SQL ชุดนี้ไปสร้างเป็นตารางจริงใน PostgreSQL ที่รันผ่าน Docker Container พร้อมควบคุมเวอร์ชันด้วย `golang-migrate` และ `Makefile` กันครับ!"
        }
      ],
      "en": []
    }
  },
  "bank-db-migration": {
    "slug": "bank-db-migration",
    "title": {
      "th": "2.2 จัดการ Database Migration & Docker",
      "en": "2.2 Database Migration with golang-migrate & Docker"
    },
    "lead": {
      "th": "ติดตั้ง PostgreSQL ด้วย Docker และใช้ golang-migrate ควบคุมเวอร์ชันโครงสร้างฐานข้อมูลแบบ Code-as-Configuration แทนการเปิด GUI เข้าไปกดสร้างเอง",
      "en": "Running PostgreSQL with Docker and version-controlling schemas with golang-migrate instead of manual GUI clicks."
    },
    "group": "2. ออกแบบฐานข้อมูล & สมุดบัญชีแยกประเภท",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: ออกแบบคำสั่ง SQL สำหรับตาราง `accounts`, `entries`, และ `transfers` เรียบร้อยแล้ว\n• **ภารกิจในบทนี้**: สร้างโฟลเดอร์โปรเจกต์ `simplebank`, เปิดรัน PostgreSQL 16 ใน Docker, สร้างไฟล์ Migration (`up.sql` / `down.sql`), และสร้างไฟล์ `Makefile` เพื่อรันคำสั่งทั้งหมดอย่างรวดเร็ว\n• **เครื่องมือ & Best Practices ที่ใช้ในบทนี้**: `go mod init`, `docker run`, `golang-migrate` (Schema as Code), และ `Makefile`"
        },
        {
          "t": "p",
          "c": "หลังจากที่เราออกแบบโครงสร้างทั้ง 3 ตารางเสร็จแล้ว คำถามสำคัญถัดมาคือ: **เราจะนำคำสั่ง SQL เหล่านี้ไปสร้างเป็นตารางจริงใน PostgreSQL ได้อย่างไร** เพื่อให้ทุกคนในทีมและเซิร์ฟเวอร์ Production ได้โครงสร้างตารางที่ตรงกัน 100% โดยไม่ต้องเปิดโปรแกรม GUI ไปนั่งกดสร้างตารางด้วยมือ?"
        },
        {
          "t": "p",
          "c": "คำตอบคือการใช้ **Database Migration (การควบคุมเวอร์ชันของโครงสร้างฐานข้อมูลด้วยโค้ด)** โดยเราจะบันทึกคำสั่งเปลี่ยนแปลงตารางลงในไฟล์ `.sql` ที่มีเลขลำดับกำกับและเก็บไว้ใน Git คู่กับโค้ด Go จากนั้นใช้เครื่องมือชื่อ **`golang-migrate`** คอยสั่งรันอัปเกรดโครงสร้างตารางตามลำดับ วิธีนี้ช่วยป้องกันปัญหา **Schema Drift** (โครงสร้างตารางในแต่ละเครื่องไม่ตรงกัน) ได้อย่างสมบูรณ์"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go & Best Practices ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "คำสั่งและไฟล์สำคัญ",
            "รูปแบบคำสั่ง",
            "คำอธิบายและเหตุผลเชิงวิศวกรรม"
          ],
          "rows": [
            [
              "1. เริ่มต้น Go Module",
              "`go mod init simplebank`",
              "สร้างไฟล์ `go.mod` เพื่อกำหนดชื่อโมดูลหลักของโปรเจกต์ ทำให้การ import ข้ามโฟลเดอร์เขียนเป็น `\"simplebank/db\"` ได้ชัดเจน"
            ],
            [
              "2. คู่ไฟล์ Up / Down Migration",
              "`000001_init_schema.up.sql`\n`000001_init_schema.down.sql`",
              "`up.sql` ใช้เดินหน้าสร้างตาราง ส่วน `down.sql` ใช้ถอยกลับลบตาราง (ต้องลบตารางลูก `entries`, `transfers` ก่อนตารางแม่ `accounts` เสมอเพื่อไม่ให้ติด Foreign Key)"
            ],
            [
              "3. การรวมคำสั่งใน Makefile",
              "`make postgres`, `make createdb`, `make migrateup`",
              "ลดความผิดพลาดจากการพิมพ์คำสั่ง CLI ยาวๆ ด้วยมือ และทำให้ทีมนักพัฒนาใช้คำสั่งชุดเดียวกันทั้งหมด"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. ตรวจสอบสภาพแวดล้อม & เตรียมเครื่องมือ (Prerequisites)"
        },
        {
          "t": "p",
          "c": "สำหรับคนที่เพิ่งเริ่มต้นเขียน Go หรือเพิ่งเคยใช้ Docker ให้ตรวจสอบความพร้อมของเครื่องมือใน Terminal ก่อนเริ่มต้น:"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "ตรวจสอบเวอร์ชันของ Go และ Docker บนเครื่อง",
          "c": "# 1. ตรวจสอบว่าติดตั้ง Go แล้วหรือยัง (แนะนำ Go 1.21 ขึ้นไป)\ngo version\n\n# 2. ตรวจสอบว่าติดตั้ง Docker แล้วหรือยัง\ndocker --version"
        },
        {
          "t": "callout",
          "title": "⚠️ ปัญหาคลาสสิกที่มือใหม่เจอบ่อย & วิธีแก้",
          "c": "1. **\"Cannot connect to the Docker daemon\"**: เกิดจากยังไม่ได้เปิดโปรแกรม Docker Desktop ให้เปิดแอป Docker Desktop ขึ้นมาแล้วรอจนสถานะที่มุมซ้ายล่างขึ้นเป็นสีเขียว (Engine running)\n2. **\"Bind for 0.0.0.0:5432 failed: port is already allocated\"**: แปลว่าในเครื่องมี PostgreSQL รันค้างอยู่ ให้สั่งปิด service เก่า หรือแก้พอร์ตตอนสั่งรันเป็น `-p 5433:5432`\n3. **การติดตั้ง golang-migrate**: หากใช้ Mac สามารถสั่ง `brew install golang-migrate` ได้ทันที หรือหากใช้ Windows/Linux สามารถติดตั้งผ่านคำสั่ง Go ได้โดยตรง:\n   `go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest`\n4. **\"command not found: migrate\" หลังรัน go install**: เกิดจากโฟลเดอร์ไบนารีของ Go ยังไม่ได้ถูกเพิ่มใน PATH ให้รันคำสั่ง `export PATH=$PATH:$(go env GOPATH)/bin` ใน Terminal (หรือบันทึกลงใน `~/.zshrc` หรือ `~/.bashrc`) แล้วทดสอบด้วย `migrate -version` อีกครั้ง",
          "warn": true
        },
        {
          "t": "h2",
          "c": "3. เริ่มต้นสร้างโฟลเดอร์โปรเจกต์ & Go Module"
        },
        {
          "t": "p",
          "c": "เปิด Terminal ขึ้นมา สร้างโฟลเดอร์หลักสำหรับโปรเจกต์ชื่อ `simplebank` และสั่งเริ่มต้น Go Module (คล้ายกับการรัน `npm init` ใน Node.js เพื่อสร้างไฟล์ `go.mod` มาคอยบันทึกแพ็กเกจ Dependencies ทั้งหมดของระบบ):"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "สร้างโฟลเดอร์โปรเจกต์และเริ่ม Go Module",
          "c": "mkdir -p simplebank && cd simplebank\ngo mod init simplebank"
        },
        {
          "t": "h2",
          "c": "4. รัน PostgreSQL บนเครื่องด้วย Docker"
        },
        {
          "t": "p",
          "c": "แทนที่จะต้องติดตั้งโปรแกรม PostgreSQL ลงบนเครื่องตรงๆ เราจะรันผ่าน Docker Container ซึ่งแยกสภาพแวดล้อมออกจากระบบปฏิบัติการอย่างสมบูรณ์ และพร้อมเริ่มใหม่ได้ทันทีในคำสั่งเดียว:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "คำสั่งเปิด Docker Container สำหรับ PostgreSQL",
          "code": "docker run --name postgres16 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:16-alpine",
          "out": "c39f0d1487ea8a462b404d70b55169a68fa91e0a297e268615ff28b5774a3f5a\n(Container รันสำเร็จในโหมด Background พร้อมใช้งานบนพอร์ต 5432)"
        },
        {
          "t": "ul",
          "c": [
            "**`--name postgres16`**: ตั้งชื่อ Container ให้เรียกใช้งานง่าย",
            "**`-p 5432:5432`**: ทำการ Map พอร์ต 5432 ของเครื่องเรา เข้ากับพอร์ต 5432 ภายใน Docker Container",
            "**`-e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret`**: กำหนด Username และ Password เริ่มต้น",
            "**`-d postgres:16-alpine`**: ให้รันในโหมด Background (`-d`) โดยใช้ Base Image ตัวเล็กพิเศษ (`alpine`) ซึ่งกินเนื้อที่น้อยมาก"
          ]
        },
        {
          "t": "h2",
          "c": "5. ติดตั้งและสร้างไฟล์ Migration ด้วย `golang-migrate`"
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ Migration คู่แรกสำหรับโปรเจกต์ของเรา ด้วยคำสั่ง:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "สร้างไฟล์ migration",
          "code": "migrate create -ext sql -dir db/migration -seq init_schema",
          "out": "simplebank/db/migration/000001_init_schema.up.sql\nsimplebank/db/migration/000001_init_schema.down.sql"
        },
        {
          "t": "p",
          "c": "ระบบจะสร้างไฟล์ขึ้นมา 2 ไฟล์ในโฟลเดอร์ `simplebank/db/migration`:"
        },
        {
          "t": "ul",
          "c": [
            "**`000001_init_schema.up.sql`**: บันทึกคำสั่ง SQL สำหรับ **สร้างหรืออัปเกรด** โครงสร้างตาราง (ใส่คำสั่ง `CREATE TABLE` ทั้งหมดลงในไฟล์นี้)",
            "**`000001_init_schema.down.sql`**: บันทึกคำสั่ง SQL สำหรับ **ย้อนกลับ (Rollback)** หากเกิดปัญหา (ใส่คำสั่ง `DROP TABLE` ย้อนกลับลำดับ)"
          ]
        },
        {
          "t": "h2",
          "c": "6. เขียนไฟล์ Down Migration"
        },
        {
          "t": "p",
          "c": "ในไฟล์ `simplebank/db/migration/000001_init_schema.down.sql` เราต้องเขียนคำสั่งลบตาราง โดยต้องลบตารางที่มี Foreign Key อ้างอิงก่อนเสมอ (ลบย้อนศร):"
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/migration/000001_init_schema.down.sql",
          "c": "-- =============================================================================\n-- ไฟล์: simplebank/db/migration/000001_init_schema.down.sql\n-- หน้าที่: ย้อนกลับการสร้างตาราง (Rollback Schema) โดยลบตารางลูกก่อนตารางแม่เสมอ\n-- =============================================================================\nDROP TABLE IF EXISTS \"entries\";\nDROP TABLE IF EXISTS \"transfers\";\nDROP TABLE IF EXISTS \"accounts\";"
        },
        {
          "t": "h2",
          "c": "7. สร้าง `Makefile` รวมคำสั่งจัดการระบบ"
        },
        {
          "t": "p",
          "c": "เพื่อไม่ให้เราต้องพิมพ์คำสั่ง Docker และ Migration ยาวๆ ซ้ำๆ ทุกวัน เราจะสร้างไฟล์ `Makefile` ไว้ที่ Root ของโปรเจกต์ (`simplebank/Makefile`) เพื่อเป็นศูนย์รวมคำสั่งสั้นๆ ที่เรียกใช้ง่าย:"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "simplebank/Makefile",
          "c": "# =============================================================================\n# ไฟล์: simplebank/Makefile\n# หน้าที่: รวมคำสั่งทางลัดสำหรับจัดการ Docker PostgreSQL, Migration, และการรัน Unit Test\n# =============================================================================\nDB_URL=postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\n\npostgres:\n\tdocker run --name postgres16 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:16-alpine\n\ncreatedb:\n\tdocker exec -it postgres16 createdb --username=root --owner=root simple_bank\n\ndropdb:\n\tdocker exec -it postgres16 dropdb simple_bank\n\nmigrateup:\n\tmigrate -path db/migration -database \"$(DB_URL)\" -verbose up\n\nmigratedown:\n\tmigrate -path db/migration -database \"$(DB_URL)\" -verbose down\n\n.PHONY: postgres createdb dropdb migrateup migratedown"
        },
        {
          "t": "h3",
          "c": "ทดสอบรัน Migration จริง"
        },
        {
          "t": "p",
          "c": "เมื่อเขียน `Makefile` เสร็จแล้ว เราสามารถสร้างฐานข้อมูลและรัน Migration ขึ้นระบบได้ทันที สังเกต Terminal Output ที่แสดงความคืบหน้าของการสร้าง Schema:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ทดสอบรัน make createdb และ make migrateup",
          "code": "make createdb\nmake migrateup",
          "out": "$ make createdb\ndocker exec -it postgres16 createdb --username=root --owner=root simple_bank\n\n$ make migrateup\nmigrate -path db/migration -database \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\" -verbose up\n2026/09/26 10:00:00 reading entries from db/migration\n2026/09/26 10:00:00 Applying migration: 1\n2026/09/26 10:00:00 Applied migration: 1 in 14.851ms"
        },
        {
          "t": "p",
          "c": "มาตรวจสอบตารางที่ถูกสร้างขึ้นใน PostgreSQL ด้วยคำสั่ง `psql \\dt`:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ตรวจสอบตารางทั้งหมดในฐานข้อมูลด้วย psql (\\dt)",
          "code": "docker exec -it postgres16 psql -U root -d simple_bank -c \"\\dt\"",
          "out": "                 List of relations\n Schema |       Name        | Type  | Owner \n--------+-------------------+-------+-------\n public | accounts          | table | root\n public | entries           | table | root\n public | schema_migrations | table | root\n public | transfers         | table | root\n(4 rows)"
        },
        {
          "t": "p",
          "c": "สังเกตว่ามีตาราง `schema_migrations` เพิ่มเข้ามาโดยอัตโนมัติ ซึ่ง `golang-migrate` ใช้จดจำเลขเวอร์ชันและสถานะว่า migration ใดถูกรันไปแล้ว หากเราต้องการทดสอบ Rollback ถอยหลัง ก็สามารถรัน `make migratedown` ได้อย่างปลอดภัย:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ทดสอบคำสั่ง Rollback (make migratedown)",
          "code": "make migratedown",
          "out": "migrate -path db/migration -database \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\" -verbose down\nAre you sure you want to apply all down migrations? [y/N]: y\n2026/09/26 10:01:00 Applying migration: 1\n2026/09/26 10:01:00 Applied migration: 1 in 11.230ms"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• ตอนนี้ฐานข้อมูล PostgreSQL 16 รันอยู่บน Docker พร้อมตาราง `accounts`, `entries`, `transfers` และระบบควบคุมเวอร์ชันผ่าน `Makefile` เรียบร้อยแล้ว\n• **ก้าวต่อไป (บทที่ 3.1)**: เราจะเริ่มเขียนโค้ดภาษา Go ในโฟลเดอร์ `simplebank/db/` เพื่อเชื่อมต่อฐานข้อมูลและเขียนคำสั่ง CRUD สร้างและดึงข้อมูลบัญชีจริงกันครับ!"
        }
      ],
      "en": []
    }
  }
};
