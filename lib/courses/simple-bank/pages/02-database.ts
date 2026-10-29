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
      "th": "ทำไมระบบธนาคารห้ามแก้ไขตัวเลขยอดเงินตรงๆ ในตาราง Account อย่างเดียว — เจาะลึกระบบ Double-Entry Ledger ที่ห้ามแก้ไขประวัติย้อนหลัง (Immutable) และออกแบบ 3 ตารางหลักด้วย SQL",
      "en": "Why real banking systems never mutate account balances directly — mastering immutable ledgers and designing accounts, entries, and transfers tables."
    },
    "group": "2. ออกแบบฐานข้อมูล & สมุดบัญชีแยกประเภท",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: ปูพื้นฐานสถาปัตยกรรม 3 เลเยอร์ และเข้าใจไวยากรณ์ภาษา Go ทั้ง 10 กลไกหลัก\n• **ภารกิจในบทนี้**: ออกแบบโครงสร้างตารางฐานข้อมูล PostgreSQL ทั้ง 3 ตาราง (`accounts`, `entries`, `transfers`) ตามหลักสมุดบัญชีแยกประเภท (Immutable Ledger) และพิสูจน์ว่าทำไมห้ามใช้ `float` เก็บเงิน\n• **ไวยากรณ์ที่ใช้ในบทนี้**: ชนิดข้อมูล `int64` เทียบกับ `float64` ใน Go และคำสั่ง SQL DDL (`CREATE TABLE`, `FOREIGN KEY`, `CHECK`, `CREATE INDEX`)"
        },
        {
          "t": "h2",
          "c": "1. ทำไมห้าม UPDATE balance ลอยๆ โดยไม่มีสมุดบัญชี (Ledger)?"
        },
        {
          "t": "p",
          "c": "ถ้าเราให้โปรแกรมเมอร์ที่ยังไม่เคยทำระบบการเงินมาออกแบบฐานข้อมูลธนาคาร สิ่งแรกที่มักจะทำคือสร้างตาราง `accounts` ที่มีแค่คอลัมน์ `id` กับ `balance` แล้วเวลาโอนเงินก็สั่งบวกลบเลขทับลงไปตรงๆ แบบนี้:"
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "❌ ตัวอย่างคำสั่งที่ห้ามทำเด็ดขาดในระบบการเงินจริง (Direct Mutation โดยไร้ Ledger)",
          "c": "-- ❌ แบบที่ผิดมหันต์: แก้ไขยอดเงินทับลงไปตรงๆ โดยไม่สร้างแถวบันทึกประวัติ!\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;"
        },
        {
          "t": "callout",
          "title": "⚠️ ทำไมการอัปเดตตัวเลขทับลงไปเฉยๆ ถึงเป็นหายนะ?",
          "c": "เพราะมันไม่มี **'ร่องรอยหลักฐาน (Audit Trail)'** หลงเหลืออยู่เลย! หากวันพรุ่งนี้ลูกค้าโทรมาแจ้งว่าเงินในบัญชีหายไป 100 บาท ธนาคารจะไม่สามารถตรวจสอบย้อนหลังได้เลยว่าเงิน 100 บาทนั้นหายไปตอนกี่โมง โอนไปให้ใคร หรือเกิดจากบั๊กของระบบ ในทางบัญชีและการเงิน ทุกการขยับของเงินจะต้องถูกบันทึกเป็นแถวใหม่แบบ **Append-Only (เพิ่มได้อย่างเดียว ห้ามแก้ไขและห้ามลบย้อนหลัง)** เสมอ!",
          "warn": true
        },
        {
          "t": "h2",
          "c": "2. โครงสร้าง 3 ตารางหลักตามหลัก Double-Entry Bookkeeping"
        },
        {
          "t": "p",
          "c": "เพื่อให้ตรวจสอบย้อนหลังได้ 100% ระบบ Simple Bank ของเราจึงแบ่งฐานข้อมูลออกเป็น 3 ตารางที่ทำงานสอดประสานกัน:"
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
              "เก็บข้อมูลบัญชีและยอดเงินคงเหลือปัจจุบันของลูกค้า (เช่น Alice มีเงิน 1,000 USD)",
              "สร้างแถวใหม่ (`INSERT`) ตอนเปิดบัญชี และอัปเดตยอดคงเหลือ (`UPDATE balance`) เมื่อมีธุรกรรมสำเร็จ"
            ],
            [
              "2. entries",
              "ทำหน้าที่เป็นสมุดบัญชีแยกประเภท (Ledger) บันทึกทุกความเคลื่อนไหวของแต่ละบัญชี (เงินออกติดลบ `-100`, เงินเข้าเป็นบวก `+100`)",
              "**Immutable / Append-Only เด็ดขาด!** มีเฉพาะคำสั่ง `INSERT` เท่านั้น ห้าม `UPDATE` หรือ `DELETE`"
            ],
            [
              "3. transfers",
              "บันทึกสัญญาธุรกรรมการโอนเงินระหว่าง 2 บัญชี (ระบุบัญชีต้นทาง `from_account_id`, ปลายทาง `to_account_id`, และจำนวนเงิน `amount`)",
              "**Immutable / Append-Only เช่นกัน!** ใช้เป็นใบเสร็จอ้างอิงว่าใครโอนเงินให้ใครจำนวนเท่าใดและเมื่อไหร่"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "3. กฎเหล็กทางการเงิน: ทำไมห้ามใช้ FLOAT หรือ DOUBLE เก็บเงินเด็ดขาด?"
        },
        {
          "t": "p",
          "c": "คอมพิวเตอร์เก็บตัวเลขทศนิยม (`float32`, `float64`) ด้วยระบบเลขฐานสองตามมาตรฐาน IEEE 754 ซึ่งไม่สามารถแทนค่าเศษส่วนฐานสิบอย่าง `0.1` หรือ `0.2` ได้อย่างลงตัว มาดูการพิสูจน์ด้วยโค้ดภาษา Go ของจริง:"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "float_vs_bigint.go (พิสูจน์ความเพี้ยนของทศนิยม Float เทียบกับจำนวนเต็ม int64)",
          "code": "// =============================================================================\n// ไฟล์: float_vs_bigint.go\n// หน้าที่: เปรียบเทียบความแม่นยำระหว่าง float64 กับ int64 ในการคำนวณตัวเลขทางการเงิน\n// แก้ปัญหา: ป้องกันเศษทศนิยมคลาดเคลื่อนสะสม (Floating-Point Precision Loss)\n// =============================================================================\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\t// ขั้นตอนที่ 1: ทดลองบวกเลขทศนิยมด้วย float64 (0.1 + 0.2)\n\tvar floatA, floatB float64 = 0.1, 0.2\n\tfloatSum := floatA + floatB\n\tfmt.Printf(\">> 1) คำนวณด้วย float64: 0.1 + 0.2 = %.17f\\n\", floatSum)\n\tfmt.Printf(\"      เช็กว่าเท่ากับ 0.3 พอดีหรือไม่: %t (เงินเพี้ยนทันที!)\\n\\n\", floatSum == 0.3)\n\n\t// ขั้นตอนที่ 2: เก็บเป็นจำนวนเต็ม (int64) ในหน่วยย่อยที่สุด (เช่น สตางค์ หรือ เซนต์)\n\t// แทนที่จะเก็บ 0.10 และ 0.20 ดอลลาร์ เราเก็บเป็น 10 เซนต์ และ 20 เซนต์\n\tvar centA, centB int64 = 10, 20\n\tcentSum := centA + centB\n\tfmt.Printf(\">> 2) คำนวณด้วย int64: 10 เซนต์ + 20 เซนต์ = %d เซนต์\\n\", centSum)\n\tfmt.Printf(\"      เช็กว่าเท่ากับ 30 เซนต์พอดีหรือไม่: %t (แม่นยำ 100%% ไร้เศษเพี้ยน!)\\n\", centSum == 30)\n}",
          "out": ">> 1) คำนวณด้วย float64: 0.1 + 0.2 = 0.30000000000000004\n      เช็กว่าเท่ากับ 0.3 พอดีหรือไม่: false (เงินเพี้ยนทันที!)\n\n>> 2) คำนวณด้วย int64: 10 เซนต์ + 20 เซนต์ = 30 เซนต์\n      เช็กว่าเท่ากับ 30 เซนต์พอดีหรือไม่: true (แม่นยำ 100% ไร้เศษเพี้ยน!)"
        },
        {
          "t": "callout",
          "title": "💡 มาตรฐานสากลในการเก็บข้อมูลเงิน",
          "c": "ในฐานข้อมูล PostgreSQL เราจะใช้ชนิดข้อมูล **`BIGINT`** และในโค้ดภาษา Go เราจะใช้ **`int64`** โดยเก็บตัวเลขเป็น **หน่วยเงินย่อยที่สุด (Smallest Currency Unit)** เสมอ เช่น เงินบาทเก็บเป็น 'สตางค์' (100.50 บาท เก็บเป็น `10050`) ทำให้การบวกลบเงินแม่นยำ 100% ไม่มีการปัดเศษผิดพลาด"
        },
        {
          "t": "h2",
          "c": "4. เขียนคำสั่ง SQL สร้างตารางทั้ง 3 (DDL Schema)"
        },
        {
          "t": "p",
          "c": "ด้านล่างนี้คือโค้ด SQL ฉบับสมบูรณ์สำหรับสร้างตารางทั้ง 3 พร้อมกำหนด Check Constraint, Foreign Keys, และ Indexes (ซึ่งเราจะนำไปวางในไฟล์ `simplebank/db/migration/000001_init_schema.up.sql` ในบทถัดไป):"
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/migration/000001_init_schema.up.sql",
          "c": "-- =============================================================================\n-- ไฟล์: simplebank/db/migration/000001_init_schema.up.sql\n-- หน้าที่: สร้างตารางหลักทั้ง 3 ของระบบธนาคาร พร้อม Foreign Keys และ Indexes\n-- แก้ปัญหา: บังคับความถูกต้องของข้อมูลระดับ Database (ห้ามยอดเงินติดลบ และห้ามมีข้อมูลกำพร้า)\n-- =============================================================================\n\n-- ขั้นตอนที่ 1: สร้างตาราง accounts เก็บข้อมูลบัญชีและยอดคงเหลือปัจจุบัน\nCREATE TABLE \"accounts\" (\n  \"id\" bigserial PRIMARY KEY,\n  \"owner\" varchar NOT NULL,\n  \"balance\" bigint NOT NULL CHECK (\"balance\" >= 0), -- กฎเหล็ก: ยอดเงินห้ามติดลบเด็ดขาด!\n  \"currency\" varchar(3) NOT NULL,\n  \"created_at\" timestamptz NOT NULL DEFAULT (now())\n);\n\n-- ขั้นตอนที่ 2: สร้างตาราง entries (สมุดบัญชีแยกประเภท บันทึกเงินเข้า + / เงินออก -)\nCREATE TABLE \"entries\" (\n  \"id\" bigserial PRIMARY KEY,\n  \"account_id\" bigint NOT NULL,\n  \"amount\" bigint NOT NULL, -- ค่าบวก = เงินเข้า, ค่าลบ = เงินออก\n  \"created_at\" timestamptz NOT NULL DEFAULT (now())\n);\n\n-- ขั้นตอนที่ 3: สร้างตาราง transfers (ประวัติธุรกรรมการโอนเงินระหว่าง 2 บัญชี)\nCREATE TABLE \"transfers\" (\n  \"id\" bigserial PRIMARY KEY,\n  \"from_account_id\" bigint NOT NULL,\n  \"to_account_id\" bigint NOT NULL,\n  \"amount\" bigint NOT NULL CHECK (\"amount\" > 0), -- ยอดโอนต้องมากกว่า 0 เสมอ\n  \"created_at\" timestamptz NOT NULL DEFAULT (now())\n);\n\n-- ขั้นตอนที่ 4: ผูกความสัมพันธ์ Foreign Key ป้องกันการอ้างอิงรหัสบัญชีที่ไม่มีอยู่จริง\nALTER TABLE \"entries\" ADD FOREIGN KEY (\"account_id\") REFERENCES \"accounts\" (\"id\") ON DELETE CASCADE;\nALTER TABLE \"transfers\" ADD FOREIGN KEY (\"from_account_id\") REFERENCES \"accounts\" (\"id\") ON DELETE CASCADE;\nALTER TABLE \"transfers\" ADD FOREIGN KEY (\"to_account_id\") REFERENCES \"accounts\" (\"id\") ON DELETE CASCADE;\n\n-- ขั้นตอนที่ 5: สร้าง B-Tree Indexes เพื่อเร่งความเร็วในการค้นหาข้อมูล (Query Performance)\nCREATE INDEX ON \"accounts\" (\"owner\");\nCREATE INDEX ON \"entries\" (\"account_id\");\nCREATE INDEX ON \"transfers\" (\"from_account_id\");\nCREATE INDEX ON \"transfers\" (\"to_account_id\");\nCREATE INDEX ON \"transfers\" (\"from_account_id\", \"to_account_id\");"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`bigserial PRIMARY KEY`**: คือเลขจำนวนเต็ม 64 บิต (`bigint`) ที่ PostgreSQL รันเพิ่มค่าให้อัตโนมัติ (1, 2, 3, ...) เมื่อมีการสร้างแถวใหม่",
            "**`CHECK (\"balance\" >= 0)`**: เกราะป้องกันชั้นสุดท้ายในฐานข้อมูล หากมีคำสั่งใดพยายามหักเงินจนยอดคงเหลือต่ำกว่า 0 PostgreSQL จะปฏิเสธคำสั่งนั้นทันทีและส่ง Error กลับมาให้ Go สั่ง Rollback",
            "**`timestamptz NOT NULL DEFAULT (now())`**: บันทึกเวลาปัจจุบันพร้อมโซนเวลา (Timezone) อัตโนมัติทันทีที่แถวถูกสร้าง",
            "**`REFERENCES \"accounts\" (\"id\") ON DELETE CASCADE`**: บังคับว่า `account_id` ที่บันทึกใน `entries` และ `transfers` จะต้องมีตัวตนอยู่จริงในตาราง `accounts` เท่านั้น และหากบัญชีถูกลบ ประวัติที่ผูกอยู่จะถูกลบตามอัตโนมัติ",
            "**`CREATE INDEX ON ...`**: เปลี่ยนการค้นหาข้อมูลจากแบบไล่เปิดดูทุกแถว ($O(N)$) ให้เป็นการค้นหาผ่านโครงสร้างต้นไม้ B-Tree ($O(\\log N)$) ที่รวดเร็วแม้มีข้อมูลหลายสิบล้านแถว"
          ]
        },
        {
          "t": "h2",
          "c": "5. ตารางสรุปหน้าที่ของ B-Tree Indexes ทั้ง 5 ตัว"
        },
        {
          "t": "table",
          "head": [
            "ลำดับ",
            "ตาราง",
            "คอลัมน์ที่สร้าง Index",
            "ชนิด Index",
            "คำสั่งค้นหา (Query) ที่ได้ประโยชน์โดยตรง"
          ],
          "rows": [
            [
              "1",
              "accounts",
              "owner",
              "Single-Column B-Tree",
              "ค้นหาบัญชีทั้งหมดของลูกค้าคนหนึ่ง (`WHERE owner = 'alice'`)"
            ],
            [
              "2",
              "entries",
              "account_id",
              "Single-Column B-Tree",
              "ดึงรายการเดินบัญชี Statement ของบัญชีนั้น (`WHERE account_id = 1`)"
            ],
            [
              "3",
              "transfers",
              "from_account_id",
              "Single-Column B-Tree",
              "ดึงประวัติการโอนเงินออกทั้งหมดของบัญชี (`WHERE from_account_id = 1`)"
            ],
            [
              "4",
              "transfers",
              "to_account_id",
              "Single-Column B-Tree",
              "ดึงประวัติการรับเงินโอนเข้าทั้งหมดของบัญชี (`WHERE to_account_id = 1`)"
            ],
            [
              "5",
              "transfers",
              "(from_account_id, to_account_id)",
              "Composite B-Tree",
              "ค้นหาประวัติการโอนเงินระหว่างคู่บัญชีที่เจาะจง (`WHERE from_account_id = 1 AND to_account_id = 2`)"
            ]
          ]
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
      "th": "รัน PostgreSQL 16 บน Docker Container และใช้ golang-migrate ควบคุมเวอร์ชันของโครงสร้างฐานข้อมูลแบบเป็นระบบ พร้อมสร้าง Makefile รวมคำสั่งทำงานในบรรทัดเดียว",
      "en": "Running PostgreSQL 16 with Docker and version-controlling database schemas with golang-migrate and Makefile."
    },
    "group": "2. ออกแบบฐานข้อมูล & สมุดบัญชีแยกประเภท",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: ออกแบบคำสั่ง SQL สำหรับตาราง `accounts`, `entries`, และ `transfers`\n• **ภารกิจในบทนี้**: สร้างโฟลเดอร์โปรเจกต์ `simplebank`, เปิดรัน PostgreSQL 16 ใน Docker, สร้างไฟล์ Migration (`up.sql` / `down.sql`), และสร้างไฟล์ `Makefile` เพื่อรันคำสั่งทั้งหมดอย่างรวดเร็ว\n• **เครื่องมือที่ใช้ในบทนี้**: `go mod init`, `docker run`, `golang-migrate`, และ `Makefile`"
        },
        {
          "t": "h2",
          "c": "1. ทำไมต้องใช้ Database Migration แทนการกดสร้างตารางด้วยมือ?"
        },
        {
          "t": "p",
          "c": "หากคุณเปิดโปรแกรมจัดการฐานข้อมูล (เช่น pgAdmin หรือ DBeaver) แล้วกดคลิกสร้างตารางด้วยตัวเอง เวลาเพื่อนร่วมทีมดึงโค้ดไปรันบนเครื่องอื่น หรือเวลานำระบบขึ้นเซิร์ฟเวอร์จริง (Production) โครงสร้างตารางในแต่ละเครื่องจะไม่ตรงกัน (เรียกว่าปัญหา **Schema Drift**)"
        },
        {
          "t": "p",
          "c": "ทางออกระดับมาตรฐานอุตสาหกรรมคือการเก็บคำสั่งเปลี่ยนแปลงฐานข้อมูลไว้เป็นไฟล์ `.sql` ที่มีหมายเลขเวอร์ชันกำกับและเก็บไว้ใน Git คู่กับโค้ด Go โดยใช้เครื่องมือ **`golang-migrate`** คอยสั่งอัปเกรด (`up`) หรือย้อนกลับ (`down`) อย่างเป็นระบบ"
        },
        {
          "t": "h2",
          "c": "2. ตรวจสอบเครื่องมือและเริ่มต้นสร้างโปรเจกต์ Go Module"
        },
        {
          "t": "p",
          "c": "เปิดโปรแกรม Terminal ขึ้นมา แล้วตรวจสอบความพร้อมของ Go, Docker และติดตั้ง `golang-migrate` ตามขั้นตอนด้านล่างนี้:"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "ตรวจสอบเครื่องมือและติดตั้ง golang-migrate CLI",
          "c": "# ขั้นตอนที่ 1: ตรวจสอบเวอร์ชันของ Go และ Docker\ngo version\ndocker --version\n\n# ขั้นตอนที่ 2: ติดตั้ง golang-migrate (เลือกคำสั่งตามระบบปฏิบัติการของคุณ)\n# สำหรับ macOS (Homebrew):\nbrew install golang-migrate\n\n# สำหรับ Windows / Linux (ติดตั้งผ่าน Go CLI โดยตรง):\ngo install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest"
        },
        {
          "t": "callout",
          "title": "⚠️ วิธีแก้ปัญหาที่พบบ่อยตอนเริ่มต้น (Troubleshooting)",
          "c": "1. **\"Cannot connect to the Docker daemon\"**: เกิดจากยังไม่ได้เปิดโปรแกรม Docker Desktop ให้เปิดแอป Docker Desktop แล้วรอจนสถานะขึ้นว่า Engine running\n2. **\"Bind for 0.0.0.0:5432 failed: port is already allocated\"**: มี PostgreSQL ตัวอื่นรันแย่งพอร์ต 5432 อยู่ ให้หยุดบริการตัวเก่าก่อน\n3. **\"command not found: migrate\" หลังรัน go install**: ให้รันคำสั่ง `export PATH=$PATH:$(go env GOPATH)/bin` ใน Terminal เพื่อให้ระบบมองเห็นคำสั่ง `migrate`",
          "warn": true
        },
        {
          "t": "p",
          "c": "เมื่อเครื่องมือพร้อมแล้ว ให้สร้างโฟลเดอร์โปรเจกต์ `simplebank` และสั่ง `go mod init simplebank` เพื่อสร้างไฟล์ `go.mod` สำหรับเก็บรายชื่อไลบรารีทั้งหมดของโปรเจกต์:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "สร้างโฟลเดอร์ simplebank และเริ่มต้น Go Module",
          "code": "mkdir -p simplebank && cd simplebank\ngo mod init simplebank",
          "out": "go: creating new go.mod: module simplebank"
        },
        {
          "t": "h2",
          "c": "3. เปิดรันฐานข้อมูล PostgreSQL 16 ด้วย Docker"
        },
        {
          "t": "p",
          "c": "รันคำสั่งด้านล่างเพื่อดาวน์โหลดและเปิดใช้งาน PostgreSQL 16 ใน Docker Container:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "คำสั่งเปิด Docker Container สำหรับ PostgreSQL 16",
          "code": "docker run --name postgres16 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:16-alpine",
          "out": "c39f0d1487ea8a462b404d70b55169a68fa91e0a297e268615ff28b5774a3f5a\n(Container ชื่อ postgres16 ทำงานสำเร็จในโหมด Background บนพอร์ต 5432)"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของคำสั่งทีละจุด (Command Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`--name postgres16`**: ตั้งชื่อ Container ว่า `postgres16` เพื่อให้อ้างอิงในคำสั่งถัดไปได้ง่าย",
            "**`-p 5432:5432`**: เชื่อมต่อพอร์ต 5432 ของเครื่องคอมพิวเตอร์เรา เข้ากับพอร์ต 5432 ข้างใน Container",
            "**`-e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret`**: กำหนดชื่อผู้ใช้เป็น `root` และรหัสผ่านเป็น `secret`",
            "**`-d postgres:16-alpine`**: รันแบบเบื้องหลัง (`-d`) โดยใช้อิมเมจรุ่นเล็กพิเศษ (`alpine`) ที่ใช้พื้นที่น้อยและเปิดทำงานเร็ว"
          ]
        },
        {
          "t": "h2",
          "c": "4. สร้างไฟล์ Migration คู่แรก (up.sql และ down.sql)"
        },
        {
          "t": "p",
          "c": "ใช้คำสั่ง `migrate create` เพื่อสร้างไฟล์ SQL คู่แรกในโฟลเดอร์ `db/migration`:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "สร้างไฟล์ Migration เวอร์ชัน 000001",
          "code": "migrate create -ext sql -dir db/migration -seq init_schema",
          "out": "simplebank/db/migration/000001_init_schema.up.sql\nsimplebank/db/migration/000001_init_schema.down.sql"
        },
        {
          "t": "ul",
          "c": [
            "**ไฟล์ที่ 1 (`000001_init_schema.up.sql`)**: ให้คัดลอกโค้ด `CREATE TABLE` ทั้ง 3 ตารางจากบทที่ 2.1 มาวางลงในไฟล์นี้",
            "**ไฟล์ที่ 2 (`000001_init_schema.down.sql`)**: ใช้สำหรับสั่งยกเลิกตารางเมื่อต้องการถอยเวอร์ชันกลับ (ต้องลบตารางลูก `entries` และ `transfers` ก่อนลบตารางแม่ `accounts` เสมอ):"
          ]
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/migration/000001_init_schema.down.sql",
          "c": "-- =============================================================================\n-- ไฟล์: simplebank/db/migration/000001_init_schema.down.sql\n-- หน้าที่: ย้อนกลับการสร้างตาราง (Rollback Schema) โดยลบตารางลูกก่อนตารางแม่เสมอ\n-- =============================================================================\nDROP TABLE IF EXISTS \"entries\";\nDROP TABLE IF EXISTS \"transfers\";\nDROP TABLE IF EXISTS \"accounts\";"
        },
        {
          "t": "h2",
          "c": "5. สร้างไฟล์ Makefile เพื่อรวมคำสั่งจัดการระบบ"
        },
        {
          "t": "p",
          "c": "เพื่อไม่ต้องพิมพ์คำสั่งยาวๆ ซ้ำทุกครั้ง เราจะสร้างไฟล์ `simplebank/Makefile` ไว้ที่โฟลเดอร์นอกสุดของโปรเจกต์:"
        },
        {
          "t": "code",
          "lang": "makefile",
          "label": "simplebank/Makefile",
          "c": "# =============================================================================\n# ไฟล์: simplebank/Makefile\n# หน้าที่: รวมคำสั่งทางลัดสำหรับจัดการ Docker PostgreSQL, Migration, และการรัน Unit Test\n# =============================================================================\nDB_URL=postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\n\npostgres:\n\tdocker run --name postgres16 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:16-alpine\n\ncreatedb:\n\tdocker exec -it postgres16 createdb --username=root --owner=root simple_bank\n\ndropdb:\n\tdocker exec -it postgres16 dropdb simple_bank\n\nmigrateup:\n\tmigrate -path db/migration -database \"$(DB_URL)\" -verbose up\n\nmigratedown:\n\tmigrate -path db/migration -database \"$(DB_URL)\" -verbose down\n\ntest:\n\tgo test -v -cover ./...\n\n.PHONY: postgres createdb dropdb migrateup migratedown test"
        },
        {
          "t": "h2",
          "c": "6. ทดสอบสร้างฐานข้อมูลและรัน Migration จริง"
        },
        {
          "t": "p",
          "c": "สั่งรัน `make createdb` ตามด้วย `make migrateup` แล้วตรวจสอบว่าตารางทั้ง 3 ถูกสร้างขึ้นใน PostgreSQL เรียบร้อยแล้ว:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "รัน make createdb, make migrateup และตรวจสอบตารางด้วย psql",
          "code": "make createdb\nmake migrateup\ndocker exec -it postgres16 psql -U root -d simple_bank -c \"\\dt\"",
          "out": "$ make createdb\ndocker exec -it postgres16 createdb --username=root --owner=root simple_bank\n\n$ make migrateup\nmigrate -path db/migration -database \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\" -verbose up\n2026/09/26 10:00:00 Start running migration 000001_init_schema.up.sql\n2026/09/26 10:00:00 Applied migration 1 in 14.851ms\n\n                 List of relations\n Schema |       Name        | Type  | Owner \n--------+-------------------+-------+-------\n public | accounts          | table | root\n public | entries           | table | root\n public | schema_migrations | table | root\n public | transfers         | table | root\n(4 rows)"
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
