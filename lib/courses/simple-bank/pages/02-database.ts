import type { Page } from "@/lib/types";

export const databasePages: Record<string, Page> = {
  "bank-schema-design": {
    slug: "bank-schema-design",
    title: {
      th: "ออกแบบ Schema & สมุดบัญชีแยกประเภท (Ledger Architecture)",
      en: "Database Schema & Ledger Architecture",
    },
    lead: {
      th: "ทำไมระบบธนาคารห้ามแก้ไขตัวเลขยอดเงินตรงๆ ในตาราง Account อย่างเดียว — เจาะลึกระบบ Ledger ที่ห้ามแก้ไขประวัติย้อนหลัง (Immutable) และออกแบบ 3 ตารางหลัก",
      en: "Why real banking systems never mutate account balances directly — mastering immutable ledgers and designing accounts, entries, and transfers tables.",
    },
    group: "2. การออกแบบฐานข้อมูล & Ledger",
    blocks: {
      th: [
        {
          t: "p",
          c: "ถ้าเราให้โปรแกรมเมอร์มือใหม่มาออกแบบระบบธนาคาร สิ่งแรกที่พวกเขามักจะทำคือ สร้างตาราง `accounts` มีคอลัมน์ `id` กับ `balance` แล้วเวลาโอนเงิน ก็เขียนคำสั่งง่ายๆ แบบนี้:",
        },
        {
          t: "code",
          lang: "sql",
          label: "คำสั่งที่ห้ามทำในระบบธนาคารจริง!",
          c: `-- แบบที่ผิดมหันต์!
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;`,
        },
        {
          t: "callout",
          title: "⚠️ ทำไมการทำแบบนี้ถึงเป็นหายนะ?",
          c: "เพราะมันไม่มี 'หลักฐาน (Audit Trail)' หลงเหลืออยู่เลย! ถ้ายอดเงินของลูกค้าหายไป 100 บาท ธนาคารจะไม่สามารถตอบได้เลยว่าเงินนั้นหายไปไหน? ใครเป็นคนโอน? โอนไปหาใคร? เวลาใด? หรือระบบเกิดคำนวณผิดพลาดตรงไหน?",
          warn: true,
        },
        {
          t: "p",
          c: "ในโลกการเงินที่แท้จริง ระบบต้องปฏิบัติตามหลักการ **Double-Entry Bookkeeping (ระบบบัญชีคู่)** และ **Immutable Ledger (สมุดบัญชีแยกประเภทที่ห้ามแก้ไขย้อนหลัง)** ทุกๆ การเคลื่อนไหวของเงิน จะต้องถูกบันทึกเป็นแถวใหม่ (Append-Only) เสมอ และห้ามมีการรันคำสั่ง `UPDATE` หรือ `DELETE` กับประวัติที่บันทึกไปแล้วเป็นอันขาด!",
        },

        { t: "h2", c: "โครงสร้าง 3 ตารางหลักของ Simple Bank" },
        {
          t: "p",
          c: "ระบบธนาคารของเราจะประกอบด้วย 3 ตารางที่ร้อยเรียงกันอย่างเหนียวแน่น:",
        },
        {
          t: "table",
          head: ["ชื่อตาราง", "บทบาทหน้าที่ในระบบ", "พฤติกรรมของข้อมูล (Data Behavior)"],
          rows: [
            [
              "1. accounts",
              "เก็บข้อมูลบัญชีและยอดคงเหลือปัจจุบันของลูกค้า (เช่น นาย John มีเงิน 5,000 บาท)",
              "มีการ `INSERT` ตอนเปิดบัญชี และมีการ `UPDATE` ยอดเงิน (balance) เมื่อมีการโอนหรือฝากถอนสำเร็จ",
            ],
            [
              "2. entries",
              "ทำหน้าที่เป็น Ledger บันทึกทุกยอดเงินที่เข้า-ออกของแต่ละบัญชี (เงินเข้าเป็นบวก เงินออกเป็นลบ)",
              "**Append-Only เด็ดขาด!** มีแต่คำสั่ง `INSERT` เท่านั้น ห้ามมี `UPDATE` หรือ `DELETE` เพื่อใช้เป็นหลักฐานตรวจสอบย้อนหลัง",
            ],
            [
              "3. transfers",
              "บันทึกประวัติการทำธุรกรรมการโอนเงิน ระหว่างบัญชีต้นทาง (From) และบัญชีปลายทาง (To)",
              "**Append-Only เช่นกัน!** บันทึกว่าใครโอนให้ใคร เป็นจำนวนเงินเท่าใด ณ เวลาใด",
            ],
          ],
        },

        { t: "h2", c: "ทำไมห้ามใช้ FLOAT หรือ DOUBLE เก็บเงินเด็ดขาด?" },
        {
          t: "p",
          c: "นี่คือกฎเหล็กข้อสำคัญที่สุดของวิศวกรซอฟต์แวร์: **ห้ามใช้ชนิดข้อมูลทศนิยมแบบ Floating-Point (เช่น float, double) ในการเก็บเงินเด็ดขาด!** มาดูการพิสูจน์จริงด้วยโค้ด Go:",
        },
        {
          t: "codeout",
          lang: "go",
          label: "float_vs_bigint.go (รันเดี่ยวด้วย: go run float_vs_bigint.go)",
          code: `// บันทึกเป็นไฟล์ float_vs_bigint.go แล้วรันด้วย: go run float_vs_bigint.go
package main

import "fmt"

func main() {
	// 1. ความคลาดเคลื่อนของ Float ในคอมพิวเตอร์ (IEEE 754)
	var floatA, floatB float64 = 0.1, 0.2
	floatSum := floatA + floatB
	fmt.Printf(">> คำนวณด้วย Float: 0.1 + 0.2 = %.17f\\n", floatSum)
	fmt.Printf("   เปรียบเทียบว่าเท่ากับ 0.3 หรือไม่: %t (เงินเพี้ยนทันที!)\\n\\n", floatSum == 0.3)

	// 2. การเก็บเป็นจำนวนเต็ม (Bigint) ในหน่วยย่อยที่สุด (สตางค์ หรือ เซนต์)
	var centA, centB int64 = 10, 20 // 10 เซนต์ + 20 เซนต์
	centSum := centA + centB
	fmt.Printf(">> คำนวณด้วย Bigint: 10 เซนต์ + 20 เซนต์ = %d เซนต์\\n", centSum)
	fmt.Printf("   เปรียบเทียบว่าเท่ากับ 30 เซนต์หรือไม่: %t (แม่นยำ 100%% ไร้การปัดเศษ!)\\n", centSum == 30)
}`,
          out: `>> คำนวณด้วย Float: 0.1 + 0.2 = 0.30000000000000004
   เปรียบเทียบว่าเท่ากับ 0.3 หรือไม่: false (เงินเพี้ยนทันที!)

>> คำนวณด้วย Bigint: 10 เซนต์ + 20 เซนต์ = 30 เซนต์
   เปรียบเทียบว่าเท่ากับ 30 เซนต์หรือไม่: true (แม่นยำ 100% ไร้การปัดเศษ!)`,
        },
        {
          t: "p",
          c: "หากระบบธนาคารรันคำนวณดอกเบี้ยหรือโอนเงินเป็นล้านๆ ครั้งต่อวัน เศษทศนิยมที่เพี้ยนจะสะสมจนทำให้ยอดเงินรวมของธนาคารไม่ตรงกับความเป็นจริง",
        },
        {
          t: "callout",
          title: "💡 ทางออกที่ถูกต้อง",
          c: "เราจะใช้ชนิดข้อมูล `BIGINT` (จำนวนเต็ม 64-bit) และเก็บตัวเลขเป็น **'หน่วยย่อยที่สุด (Smallest Monetary Unit)'** เสมอ เช่น ในไทยเก็บเป็น 'สตางค์' (1 บาท = 100 สตางค์) หรือดอลลาร์เก็บเป็น 'เซนต์' (1 USD = 100 Cents) เช่น ยอด $10.50 จะถูกเก็บเป็นตัวเลขจำนวนเต็ม `1050` เสมอ ทำให้คำนวณได้แม่นยำ 100% ไร้ข้อผิดพลาด",
        },

        { t: "h2", c: "คำสั่ง SQL ออกแบบโครงสร้างตาราง (DDL)" },
        {
          t: "p",
          c: "ด้านล่างนี้คือโค้ด SQL ที่เราจะใช้สร้างตารางทั้ง 3 พร้อม Foreign Keys และ Indexes:",
        },
        {
          t: "code",
          lang: "sql",
          label: "init_schema.sql",
          c: `-- 1. ตาราง Accounts
CREATE TABLE "accounts" (
  "id" bigserial PRIMARY KEY,
  "owner" varchar NOT NULL,
  "balance" bigint NOT NULL,
  "currency" varchar(3) NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

-- 2. ตาราง Entries (Ledger เงินเข้า-ออก)
CREATE TABLE "entries" (
  "id" bigserial PRIMARY KEY,
  "account_id" bigint NOT NULL,
  "amount" bigint NOT NULL, -- บวกคือเงินเข้า, ลบคือเงินออก
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

-- 3. ตาราง Transfers (ประวัติการโอนเงิน)
CREATE TABLE "transfers" (
  "id" bigserial PRIMARY KEY,
  "from_account_id" bigint NOT NULL,
  "to_account_id" bigint NOT NULL,
  "amount" bigint NOT NULL, -- ต้องมากกว่า 0 เสมอ
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

-- กำหนด Foreign Key ผูกความสัมพันธ์
ALTER TABLE "entries" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON DELETE CASCADE;
ALTER TABLE "transfers" ADD FOREIGN KEY ("from_account_id") REFERENCES "accounts" ("id") ON DELETE CASCADE;
ALTER TABLE "transfers" ADD FOREIGN KEY ("to_account_id") REFERENCES "accounts" ("id") ON DELETE CASCADE;

-- สร้าง Index เพื่อความเร็วสูงสุดในการค้นหา (Query Performance)
CREATE INDEX ON "accounts" ("owner");
CREATE INDEX ON "entries" ("account_id");
CREATE INDEX ON "transfers" ("from_account_id");
CREATE INDEX ON "transfers" ("to_account_id");
CREATE INDEX ON "transfers" ("from_account_id", "to_account_id");`,
        },

        { t: "h3", c: "อธิบายโครงสร้างและ Index แต่ละส่วน" },
        {
          t: "ul",
          c: [
            "**`bigserial PRIMARY KEY`**: กำหนดให้ id เป็นเลขจำนวนเต็ม 64-bit ที่รันเพิ่มขึ้นอัตโนมัติ (Auto-increment) รองรับธุรกรรมได้หลายล้านล้านแถวโดยไม่ต้องกลัว id เต็ม",
            "**`timestamptz`**: เก็บวันเวลาพร้อม Timezone ป้องกันปัญหาเรื่องเวลาสับสนเมื่อระบบขยายไปหลายประเทศ",
            "**`FOREIGN KEY (...) REFERENCES ...`**: ป้องกันการบันทึกประวัติลอยๆ เช่น จะบันทึกการโอนเงินได้ บัญชีต้นทางและปลายทางต้องมีตัวตนอยู่จริงในตาราง `accounts` เท่านั้น",
            "**`CREATE INDEX ON accounts (owner)`**: ช่วยให้การค้นหาบัญชีทั้งหมดของลูกค้าคนใดคนหนึ่ง (เช่น ค้นหาว่านาย Alice มีบัญชีกี่เล่ม) ทำงานได้เร็วระดับ $O(\\log N)$ แทนที่จะต้องสแกนตารางทั้งหมด ($O(N)$)",
            "**`CREATE INDEX ON transfers (from_account_id, to_account_id)`**: Composite Index สำหรับสืบค้นประวัติการโอนเงินระหว่าง 2 บัญชีที่เจาะจงได้อย่างรวดเร็ว",
          ],
        },
        {
          t: "codeout",
          lang: "sql",
          label: "ตรวจสอบ Schema ใน Terminal ด้วยคำสั่ง psql (\\d accounts)",
          code: `\\d accounts`,
          out: `                                         Table "public.accounts"
   Column   |           Type           | Collation | Nullable |               Default                
------------+--------------------------+-----------+----------+--------------------------------------
 id         | bigint                   |           | not null | nextval('accounts_id_seq'::regclass)
 owner      | character varying        |           | not null | 
 balance    | bigint                   |           | not null | 
 currency   | character varying(3)     |           | not null | 
 created_at | timestamp with time zone |           | not null | now()
Indexes:
    "accounts_pkey" PRIMARY KEY, btree (id)
    "accounts_owner_idx" btree (owner)
Referenced by:
    TABLE "entries" CONSTRAINT "entries_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
    TABLE "transfers" CONSTRAINT "transfers_from_account_id_fkey" FOREIGN KEY (from_account_id) REFERENCES accounts(id) ON DELETE CASCADE
    TABLE "transfers" CONSTRAINT "transfers_to_account_id_fkey" FOREIGN KEY (to_account_id) REFERENCES accounts(id) ON DELETE CASCADE`,
        },
      ],
      en: [],
    },
  },

  "bank-db-migration": {
    slug: "bank-db-migration",
    title: {
      th: "จัดการ Database Migration & Docker",
      en: "Database Migration with golang-migrate & Docker",
    },
    lead: {
      th: "ติดตั้ง PostgreSQL ด้วย Docker และใช้ golang-migrate ควบคุมเวอร์ชันโครงสร้างฐานข้อมูลแบบ Code-as-Configuration แทนการเปิด GUI เข้าไปกดสร้างเอง",
      en: "Running PostgreSQL with Docker and version-controlling schemas with golang-migrate instead of manual GUI clicks.",
    },
    group: "2. การออกแบบฐานข้อมูล & Ledger",
    blocks: {
      th: [
        {
          t: "p",
          c: "เวลาที่ทำงานในบริษัทซอฟต์แวร์ระดับมืออาชีพ จะไม่มีวิศวกรคนไหนเปิดโปรแกรมอย่าง DBeaver หรือ pgAdmin เข้าไปกดสร้างตารางหรือแก้คอลัมน์ใน Production Database ตรงๆ เด็ดขาด เพราะหากเพื่อนร่วมทีมต้องการรันโปรเจกต์บนเครื่องตัวเอง หรือเวลาต้อง Deploy ขึ้น Server ใหม่ ทุกคนจะไม่รู้เลยว่าโครงสร้างฐานข้อมูลมีอะไรเปลี่ยนไปบ้าง (เกิดปัญหา Schema Drift)",
        },
        {
          t: "callout",
          title: "🚀 แนวทางที่ถูกต้อง: Database Migration",
          c: "เราจะเขียนการเปลี่ยนแปลงของตารางลงในไฟล์ `.sql` ที่มีเลขเวอร์ชันกำกับ และเก็บไว้ใน Git เช่นเดียวกับ Source Code ทั่วไป โดยใช้เครื่องมือระดับสากลที่ชื่อว่า **golang-migrate**",
        },

        { t: "h2", c: "1. รัน PostgreSQL บนเครื่องด้วย Docker" },
        {
          t: "p",
          c: "แทนที่จะต้องติดตั้งโปรแกรม PostgreSQL ลงบนเครื่องตรงๆ เราจะรันผ่าน Docker Container ซึ่งแยกสภาพแวดล้อมออกจากระบบปฏิบัติการอย่างสมบูรณ์ และพร้อมเริ่มใหม่ได้ทันทีในคำสั่งเดียว:",
        },
        {
          t: "codeout",
          lang: "bash",
          label: "คำสั่งเปิด Docker Container สำหรับ PostgreSQL",
          code: `docker run --name postgres16 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:16-alpine`,
          out: `c39f0d1487ea8a462b404d70b55169a68fa91e0a297e268615ff28b5774a3f5a
(Container รันสำเร็จในโหมด Background พร้อมใช้งานบนพอร์ต 5432)`,
        },
        {
          t: "ul",
          c: [
            "**`--name postgres16`**: ตั้งชื่อ Container ให้เรียกใช้งานง่าย",
            "**`-p 5432:5432`**: ทำการ Map พอร์ต 5432 ของเครื่องเรา เข้ากับพอร์ต 5432 ภายใน Docker Container",
            "**`-e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret`**: กำหนด Username และ Password เริ่มต้น",
            "**`-d postgres:16-alpine`**: ให้รันในโหมด Background (`-d`) โดยใช้ Base Image ตัวเล็กพิเศษ (`alpine`) ซึ่งกินเนื้อที่น้อยมาก",
          ],
        },

        { t: "h2", c: "2. ติดตั้งและใช้งาน `golang-migrate`" },
        {
          t: "p",
          c: "ติดตั้งเครื่องมือ `migrate` CLI บนเครื่องของคุณ:",
        },
        {
          t: "code",
          lang: "bash",
          label: "คำสั่งติดตั้ง golang-migrate",
          c: `# สำหรับ macOS (ผ่าน Homebrew)
brew install golang-migrate

# หรือดาวน์โหลด Binary โดยตรงสำหรับ Linux/Windows
# https://github.com/golang-migrate/migrate/releases`,
        },
        {
          t: "p",
          c: "สร้างไฟล์ Migration คู่แรกสำหรับโปรเจกต์ของเรา ด้วยคำสั่ง:",
        },
        {
          t: "codeout",
          lang: "bash",
          label: "สร้างไฟล์ migration",
          code: `migrate create -ext sql -dir db/migration -seq init_schema`,
          out: `/Users/simple_bank/db/migration/000001_init_schema.up.sql
/Users/simple_bank/db/migration/000001_init_schema.down.sql`,
        },
        {
          t: "p",
          c: "ระบบจะสร้างไฟล์ขึ้นมา 2 ไฟล์ในโฟลเดอร์ `db/migration`:",
        },
        {
          t: "ul",
          c: [
            "**`000001_init_schema.up.sql`**: บันทึกคำสั่ง SQL สำหรับ **สร้างหรืออัปเกรด** โครงสร้างตาราง (ใส่คำสั่ง `CREATE TABLE` ทั้งหมดลงในไฟล์นี้)",
            "**`000001_init_schema.down.sql`**: บันทึกคำสั่ง SQL สำหรับ **ย้อนกลับ (Rollback)** หากเกิดปัญหา (ใส่คำสั่ง `DROP TABLE` ย้อนกลับลำดับ)",
          ],
        },

        { t: "h2", c: "3. เขียนไฟล์ Down Migration" },
        {
          t: "p",
          c: "ในไฟล์ `000001_init_schema.down.sql` เราต้องเขียนคำสั่งลบตาราง โดยต้องลบตารางที่มี Foreign Key อ้างอิงก่อนเสมอ (ลบย้อนศร):",
        },
        {
          t: "code",
          lang: "sql",
          label: "db/migration/000001_init_schema.down.sql",
          c: `DROP TABLE IF EXISTS "entries";
DROP TABLE IF EXISTS "transfers";
DROP TABLE IF EXISTS "accounts";`,
        },

        { t: "h2", c: "4. สร้าง `Makefile` รวมคำสั่งจัดการระบบ" },
        {
          t: "p",
          c: "เพื่อไม่ให้เราต้องพิมพ์คำสั่ง Docker และ Migration ยาวๆ ซ้ำๆ ทุกวัน เราจะสร้างไฟล์ `Makefile` ไว้ที่ Root ของโปรเจกต์ เพื่อเป็นศูนย์รวมคำสั่งสั้นๆ ที่เรียกใช้ง่าย:",
        },
        {
          t: "code",
          lang: "bash",
          label: "Makefile",
          c: `DB_URL=postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable

postgres:
	docker run --name postgres16 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:16-alpine

createdb:
	docker exec -it postgres16 createdb --username=root --owner=root simple_bank

dropdb:
	docker exec -it postgres16 dropdb simple_bank

migrateup:
	migrate -path db/migration -database "$(DB_URL)" -verbose up

migratedown:
	migrate -path db/migration -database "$(DB_URL)" -verbose down

.PHONY: postgres createdb dropdb migrateup migratedown`,
        },
        {
          t: "h3", c: "ทดสอบรัน Migration จริง" },
        {
          t: "p",
          c: "เมื่อเขียน `Makefile` เสร็จแล้ว เราสามารถสร้างฐานข้อมูลและรัน Migration ขึ้นระบบได้ทันที สังเกต Terminal Output ที่แสดงความคืบหน้าของการสร้าง Schema:",
        },
        {
          t: "codeout",
          lang: "bash",
          label: "ทดสอบรัน make createdb และ make migrateup",
          code: `make createdb
make migrateup`,
          out: `$ make createdb
docker exec -it postgres16 createdb --username=root --owner=root simple_bank

$ make migrateup
migrate -path db/migration -database "postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable" -verbose up
2026/09/26 10:00:00 reading entries from db/migration
2026/09/26 10:00:00 Applying migration: 1
2026/09/26 10:00:00 Applied migration: 1 in 14.851ms`,
        },
        {
          t: "p",
          c: "มาตรวจสอบตารางที่ถูกสร้างขึ้นใน PostgreSQL ด้วยคำสั่ง `psql \\dt`:",
        },
        {
          t: "codeout",
          lang: "bash",
          label: "ตรวจสอบตารางทั้งหมดในฐานข้อมูลด้วย psql (\\dt)",
          code: `docker exec -it postgres16 psql -U root -d simple_bank -c "\\dt"`,
          out: `                 List of relations
 Schema |       Name        | Type  | Owner 
--------+-------------------+-------+-------
 public | accounts          | table | root
 public | entries           | table | root
 public | schema_migrations | table | root
 public | transfers         | table | root
(4 rows)`,
        },
        {
          t: "p",
          c: "สังเกตว่ามีตาราง `schema_migrations` เพิ่มเข้ามาโดยอัตโนมัติ ซึ่ง `golang-migrate` ใช้จดจำเลขเวอร์ชันและสถานะว่า migration ใดถูกรันไปแล้ว หากเราต้องการทดสอบ Rollback ถอยหลัง ก็สามารถรัน `make migratedown` ได้อย่างปลอดภัย:",
        },
        {
          t: "codeout",
          lang: "bash",
          label: "ทดสอบคำสั่ง Rollback (make migratedown)",
          code: `make migratedown`,
          out: `migrate -path db/migration -database "postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable" -verbose down
Are you sure you want to apply all down migrations? [y/N]: y
2026/09/26 10:01:00 Applying migration: 1
2026/09/26 10:01:00 Applied migration: 1 in 11.230ms`,
        },
      ],
      en: [],
    },
  },
};
