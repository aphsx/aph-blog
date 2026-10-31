import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/02-database.ts
// โมดูล 2: ออกแบบฐานข้อมูล & สมุดบัญชีแยกประเภท
// บทเรียน: 2.1 bank-schema-design, 2.2 bank-db-migration
// =============================================================================

export const databasePages: Record<string, Page> = {
  "bank-schema-design": {
    slug: "bank-schema-design",
    title: {
      th: "2.1 ออกแบบ Schema & สมุดบัญชีแยกประเภท (Ledger)",
      en: "2.1 Database Schema & Immutable Ledger",
    },
    lead: {
      th: "ทำไมระบบธนาคารห้ามแก้ตัวเลขยอดเงินตรงๆ โดยไร้ประวัติ — เจาะลึกหลักการ Double-Entry Bookkeeping และออกแบบ 3 ตารางหลัก",
      en: "Why banking backends never mutate balances without an audit trail — mastering immutable ledgers and designing core SQL tables.",
    },
    group: "2. ออกแบบฐานข้อมูล & สมุดบัญชีแยกประเภท",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• เข้าใจหลักการสมุดบัญชีแยกประเภท (Double-Entry Ledger) ที่ใช้ในระบบธนาคารและ Payment Gateway ทั่วโลก\n• ออกแบบ Schema 3 ตารางหลัก (`accounts`, `entries`, `transfers`) พร้อม Constraints ป้องกันเงินติดลบ\n• กำหนด Foreign Keys และ Indexes เพื่อเพิ่มประสิทธิภาพการค้นหาของระบบ\n\n⏱ **เวลาในการเรียนรู้**: ~15 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านโมดูล 1 พื้นฐาน Go และความรู้ SQL เบื้องต้น",
        },
        {
          "t": "h2",
          "c": "1. ทำไมห้ามแก้ตัวเลขยอดเงินตรงๆ ในตาราง Account?",
        },
        {
          "t": "p",
          "c": "หากเราให้มือใหม่มาออกแบบระบบโอนเงิน สิ่งแรกที่พวกเขามักจะคิดคือการเขียนคำสั่ง SQL แบบนี้:",
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "❌ คำสั่งที่ห้ามทำเด็ดขาดในระบบธนาคารจริง",
          "c": "-- แบบที่อันตรายมาก!\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;",
        },
        {
          "t": "callout",
          "title": "⚠️ ทำไมการทำแบบนี้ถึงเป็นข้อผิดพลาดร้ายแรง?",
          "c": "เพราะมันไม่มี **'หลักฐาน (Audit Trail)'** หลงเหลืออยู่เลย! ถ้ายอดเงินในบัญชีลูกค้าหายไป 100 บาท ธนาคารจะไม่สามารถตอบคำถามของผู้ตรวจการ (Auditor) หรือตอบลูกค้าได้เลยว่า:\n• เงินนั้นหายไปไหน?\n• ใครเป็นคนกดทำรายการ?\n• โอนออกไปที่บัญชีไหน เวลาใด?\n• หรือระบบเซิร์ฟเวอร์เกิดคำนวณผิดพลาดเองตรงไหน?",
          "warn": true,
        },
        {
          "t": "p",
          "c": "ในระบบการเงิน ทุกครั้งที่ยอดเงินขยับจะต้องมีการสร้าง 'ใบเสร็จ' และ 'บันทึกรายการเดินบัญชี' เสมอ โดยข้อมูลที่บันทึกแล้วห้ามลบหรือแก้ไขย้อนหลัง (เรียกว่า **Immutable Ledger** หรือสมุดบัญชีที่เพิ่มได้อย่างเดียวแบบ Append-Only) ตามหลักการบัญชีคู่ (**Double-Entry Bookkeeping**) ที่เงินออกจากที่หนึ่ง (`-100`) จะต้องมีเงินเข้าอีกที่หนึ่ง (`+100`) ที่สมดุลกันเสมอ",
        },
        {
          "t": "h2",
          "c": "2. โครงสร้าง 3 ตารางหลักของ Simple Bank",
        },
        {
          "t": "p",
          "c": "เราจะออกแบบฐานข้อมูล PostgreSQL โดยใช้ 3 ตารางที่สอดประสานกันอย่างรัดกุม:",
        },
        {
          "t": "table",
          "head": ["ตาราง", "หน้าที่และความรับผิดชอบ", "พฤติกรรมข้อมูล"],
          "rows": [
            [
              "1. accounts",
              "เก็บข้อมูลบัญชีและยอดคงเหลือปัจจุบันของลูกค้า (เช่น Alice มีเงิน 1,000 USD)",
              "มีการ INSERT เมื่อเปิดบัญชี และ UPDATE ยอดเงินเมื่อมีรายการฝากถอน/โอนสำเร็จ",
            ],
            [
              "2. entries",
              "สมุดบัญชีแยกประเภท (Ledger) บันทึกทุกยอดเงินเข้า-ออกของแต่ละบัญชี",
              "**Append-Only เด็ดขาด!** เงินเข้าเป็นบวก เงินออกเป็นลบ ห้าม UPDATE และห้าม DELETE",
            ],
            [
              "3. transfers",
              "บันทึกประวัติการโอนเงินระหว่าง 2 บัญชี (From -> To)",
              "**Append-Only เช่นกัน!** ระบุว่าใครโอนให้ใคร จำนวนเท่าใด ณ เวลาใด",
            ],
          ],
        },
        {
          "t": "h2",
          "c": "3. กฎเหล็กระดับคอลัมน์ (Constraints & Safety)",
        },
        {
          "t": "ul",
          "c": [
            "**`balance bigint NOT NULL CHECK (balance >= 0)`**: บังคับว่ายอดเงินในบัญชีต้องเป็นจำนวนเต็มบวกหรือศูนย์เสมอ แม้โค้ด Go จะมีบั๊ก แต่ฐานข้อมูลจะเป็นปราการด่านสุดท้ายที่จะยกเลิกคำสั่งทันทีถ้ายอดเงินจะติดลบ (No Overdraft)",
            "**`amount bigint NOT NULL CHECK (amount > 0)`**: ยอดเงินในการโอน (`transfers`) ต้องมากกว่าศูนย์เสมอ ป้องกันคนยิงโอนเงิน 0 บาทหรือติดลบเข้ามาก่อกวน",
            "**`currency varchar NOT NULL`**: สกุลเงินของบัญชี เช่น USD, EUR, THB",
          ],
        },
        {
          "t": "h2",
          "c": "4. ความสัมพันธ์ระหว่างตาราง (Foreign Keys) และดัชนี (Indexes)",
        },
        {
          "t": "p",
          "c": "นอกจากการตั้งกฎในแต่ละคอลัมน์แล้ว ระบบฐานข้อมูลที่ดีต้องมีการเชื่อมความสัมพันธ์และเร่งความเร็วในการค้นหาด้วย 2 กลไกสำคัญ:",
        },
        {
          "t": "ul",
          "c": [
            "**Foreign Key (`REFERENCES accounts (id)`)**: บังคับว่าทุกแถวใน `entries` และ `transfers` ต้องอ้างอิงไปยัง `id` ของบัญชีที่มีอยู่จริงในตาราง `accounts` เท่านั้น ห้ามมีรายการเดินบัญชีลอยๆ ที่ไม่มีเจ้าของเด็ดขาด และสังเกตว่าเรา **ไม่ใส่ `ON DELETE CASCADE`** เพื่อป้องกันไม่ให้ประวัติธุรกรรมทางการเงินถูกลบหายไปหากมีใครเผลอสั่งลบบัญชี",
            "**Database Index (`CREATE INDEX ON ...`)**: หากไม่มี Index เวลาลูกค้าเปิดแอปดูรายการเดินบัญชีของตัวเอง ฐานข้อมูลจะต้องไล่อ่านข้อมูลตั้งแต่แถวแรกยันแถวสุดท้าย (เรียกว่า **Full Table Scan** หรือ `O(N)`) ซึ่งถ้าธนาคารมี 100 ล้านรายการ ระบบจะค้างทันที การสร้าง **B-Tree Index** บนคอลัมน์ที่ใช้ค้นหาบ่อยๆ เช่น `owner`, `account_id`, `from_account_id`, `to_account_id` จะช่วยให้ฐานข้อมูลกระโดดไปยังข้อมูลที่ต้องการได้ทันทีด้วยความเร็วระดับ `O(log N)`",
            "**Composite Index (`CREATE INDEX ON transfers (from_account_id, to_account_id)`)**: ดัชนีแบบจับคู่ 2 คอลัมน์ ช่วยให้การค้นหาประวัติว่า 'บัญชี A เคยโอนเงินให้บัญชี B กี่ครั้ง' ทำงานได้รวดเร็วขึ้นอย่างมหาศาล",
          ],
        },
        {
          "t": "h2",
          "c": "5. เขียนคำสั่ง SQL สร้างตาราง (DDL)",
        },
        {
          "t": "p",
          "c": "เรานำข้อกำหนดทั้งหมดมาเขียนเป็นไฟล์ SQL Schema ที่พร้อมนำไปใช้ใน Migration:",
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/migration/000001_init_schema.up.sql",
          "c": "CREATE TABLE accounts (\n  id         bigserial   PRIMARY KEY,\n  owner      varchar     NOT NULL,\n  balance    bigint      NOT NULL CHECK (balance >= 0),\n  currency   varchar     NOT NULL,\n  created_at timestamptz NOT NULL DEFAULT now()\n);\n\nCREATE TABLE entries (\n  id         bigserial   PRIMARY KEY,\n  account_id bigint      NOT NULL REFERENCES accounts (id),\n  amount     bigint      NOT NULL,\n  created_at timestamptz NOT NULL DEFAULT now()\n);\n\nCREATE TABLE transfers (\n  id              bigserial   PRIMARY KEY,\n  from_account_id bigint      NOT NULL REFERENCES accounts (id),\n  to_account_id   bigint      NOT NULL REFERENCES accounts (id),\n  amount          bigint      NOT NULL CHECK (amount > 0),\n  created_at      timestamptz NOT NULL DEFAULT now()\n);\n\nCREATE INDEX ON accounts (owner);\nCREATE INDEX ON entries (account_id);\nCREATE INDEX ON transfers (from_account_id);\nCREATE INDEX ON transfers (to_account_id);\nCREATE INDEX ON transfers (from_account_id, to_account_id);",
        },
        {
          "t": "h2",
          "c": "6. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ทำไมเราต้องสร้าง INDEX บนคอลัมน์ owner ของตาราง accounts และ account_id ของตาราง entries?",
              "options": [
                {
                  "text": "เพื่อให้ฐานข้อมูลค้นหาข้อมูลได้เร็วระดับ O(log N) แทนที่จะต้องสแกนอ่านข้อมูลทั้งตาราง (Full Table Scan O(N))",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! บัญชีมักถูกค้นหาด้วย owner และรายการเดินบัญชีถูกค้นหาด้วย account_id การสร้าง B-Tree Index จะทำให้ค้นหาได้ทันทีในระดับ O(log N)",
                },
                {
                  "text": "เพื่อป้องกันไม่ให้มีการลบข้อมูลในตาราง",
                  "isCorrect": false,
                  "explain": "Index ช่วยเรื่องความเร็วในการค้นหา ไม่ได้ทำหน้าที่ป้องกันการลบข้อมูล",
                },
                {
                  "text": "เพื่อบังคับให้ค่าของ owner ห้ามซ้ำกัน",
                  "isCorrect": false,
                  "explain": "การห้ามซ้ำต้องสร้าง UNIQUE INDEX ไม่ใช่ INDEX ธรรมดา",
                },
              ],
            },
          ],
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "มีไฟล์ SQL แล้ว! ในบทที่ **2.2 จัดการ Database Migration & Docker** เราจะมารัน PostgreSQL 16 บน Docker Container และใช้เครื่องมือ `golang-migrate` รันสร้างตารางอัตโนมัติกันครับ",
        },
      ],
      en: [],
    },
  },

  "bank-db-migration": {
    slug: "bank-db-migration",
    title: {
      th: "2.2 จัดการ Database Migration & Docker",
      en: "2.2 Database Migration & Docker Setup",
    },
    lead: {
      th: "ควบคุมโครงสร้างฐานข้อมูลอย่างมืออาชีพ: รัน PostgreSQL 16 ด้วย Docker และเขียนคำสั่ง Migration Up / Down ด้วย golang-migrate พร้อม Makefile",
      en: "Professional database versioning: Run PostgreSQL 16 in Docker, write Up/Down migrations, and automate tasks with Makefile.",
    },
    group: "2. ออกแบบฐานข้อมูล & สมุดบัญชีแยกประเภท",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• รัน PostgreSQL 16 Container บน Docker ด้วยคำสั่งเดียว\n• เข้าใจหลักการ Version Control ของฐานข้อมูลด้วย Migration (Up และ Down Scripts)\n• ใช้งาน Makefile เพื่อสร้างคำสั่งลัดที่สะดวกและไม่ผิดพลาดซ้ำซ้อน\n\n⏱ **เวลาในการเรียนรู้**: ~20 นาที | **สิ่งที่ต้องมี**: Docker Desktop กำลังเปิดใช้งาน",
        },
        {
          "t": "h2",
          "c": "1. ทำไมต้องใช้ Database Migration?",
        },
        {
          "t": "p",
          "c": "เวลาทำงานคนเดียว เราอาจจะเปิดโปรแกรมต่อฐานข้อมูล เช่น DBeaver หรือ pgAdmin แล้วคลิกสร้างตารางด้วยมือ แต่เมื่อทำงานในทีมหรือเตรียมนำระบบขึ้นเซิร์ฟเวอร์จริง:",
        },
        {
          "t": "ul",
          "c": [
            "เพื่อนร่วมทีมไม่รู้ว่าเราไปแก้คอลัมน์ไหนเพิ่มบ้าง",
            "เซิร์ฟเวอร์ Staging และ Production ไม่มีใครจำได้ว่าต้องรัน SQL คำสั่งใดบ้างตามลำดับ",
            "หากโครงสร้างตารางใหม่มีปัญหา ไม่สามารถย้อนกลับ (Rollback) สู่เวอร์ชันก่อนหน้าได้อย่างปลอดภัย",
          ],
        },
        {
          "t": "p",
          "c": "เครื่องมือ **Migration** จึงทำหน้าที่เป็นเหมือน Git สำหรับฐานข้อมูล โดยทุกการเปลี่ยนแปลงจะถูกบันทึกเป็นคู่ไฟล์เสมอ คือไฟล์ `.up.sql` (สร้างหรือปรับปรุง) และ `.down.sql` (ย้อนกลับสิ่งที่ไฟล์ up ทำ)",
        },
        {
          "t": "h2",
          "c": "2. รัน PostgreSQL 16 ด้วย Docker",
        },
        {
          "t": "p",
          "c": "เราไม่จำเป็นต้องติดตั้ง PostgreSQL ลงบนเครื่องตรงๆ เพราะอาจจะชนกับเวอร์ชันอื่น เราสามารถสั่งให้ Docker รัน PostgreSQL 16 ที่แยกสภาพแวดล้อมอย่างสมบูรณ์ได้ทันที:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "คำสั่งสตาร์ต PostgreSQL Container และสร้างฐานข้อมูล simple_bank",
          "code": "docker run --name postgres16 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:16-alpine\ndocker exec -it postgres16 createdb --username=root --owner=root simple_bank",
          "out": "f3b890a8274191c95b4c483a99e120f2b3c10a11e2f98124\n(database simple_bank created successfully)",
        },
        {
          "t": "p",
          "c": "**แกะความหมายของพารามิเตอร์แต่ละตัวในคำสั่ง Docker ข้างต้น:**",
        },
        {
          "t": "ul",
          "c": [
            "**`--name postgres16`**: ตั้งชื่อ Container ว่า `postgres16` เพื่อให้อ้างอิงชื่อนี้ในคำสั่งถัดไปได้ง่ายๆ ไม่ต้องจำรหัส Container ID ยาวๆ",
            "**`-p 5432:5432`**: ทำการเชื่อมโยงพอร์ต (Port Mapping) จากพอร์ต `5432` ของเครื่องเรา (Host) เข้าไปยังพอร์ต `5432` ภายใน Container เพื่อให้โค้ด Go บนเครื่องเราเชื่อมต่อเข้าไปหาฐานข้อมูลได้",
            "**`-e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret`**: ส่งค่าตัวแปรสภาพแวดล้อม (Environment Variables) เข้าไปกำหนดชื่อผู้ใช้สูงสุดเป็น `root` และรหัสผ่านเป็น `secret`",
            "**`-d postgres:16-alpine`**: แฟล็ก `-d` (Detached Mode) สั่งให้รันอยู่เบื้องหลังโดยไม่ยึดหน้าจอ Terminal ค้างไว้ และเลือกใช้อิมเมจ `postgres:16-alpine` ที่มีขนาดเล็กและประหยัดแรม",
            "**`docker exec -it postgres16 createdb ...`**: สั่งให้เข้าไปรันคำสั่ง `createdb` ข้างใน Container `postgres16` ที่กำลังทำงานอยู่ เพื่อสร้างฐานข้อมูลเปล่าที่ชื่อว่า `simple_bank`",
          ],
        },
        {
          "t": "h2",
          "c": "3. เตรียมไฟล์ Migration Up และ Down",
        },
        {
          "t": "p",
          "c": "ก่อนอื่นให้ติดตั้งเครื่องมือ CLI ของ **`golang-migrate`** สำหรับรันไฟล์ Migration (บน macOS ใช้ `brew install golang-migrate` หรือบน Windows ใช้ `scoop install migrate` หรือดาวน์โหลดผ่าน Go ด้วย `go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest`)\n\nจากนั้นสร้างโฟลเดอร์ `simplebank/db/migration/` และสร้างไฟล์คู่แรกดังนี้:",
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/migration/000001_init_schema.up.sql",
          "c": "CREATE TABLE accounts (\n  id         bigserial   PRIMARY KEY,\n  owner      varchar     NOT NULL,\n  balance    bigint      NOT NULL CHECK (balance >= 0),\n  currency   varchar     NOT NULL,\n  created_at timestamptz NOT NULL DEFAULT now()\n);\n\nCREATE TABLE entries (\n  id         bigserial   PRIMARY KEY,\n  account_id bigint      NOT NULL REFERENCES accounts (id),\n  amount     bigint      NOT NULL,\n  created_at timestamptz NOT NULL DEFAULT now()\n);\n\nCREATE TABLE transfers (\n  id              bigserial   PRIMARY KEY,\n  from_account_id bigint      NOT NULL REFERENCES accounts (id),\n  to_account_id   bigint      NOT NULL REFERENCES accounts (id),\n  amount          bigint      NOT NULL CHECK (amount > 0),\n  created_at      timestamptz NOT NULL DEFAULT now()\n);\n\nCREATE INDEX ON accounts (owner);\nCREATE INDEX ON entries (account_id);\nCREATE INDEX ON transfers (from_account_id);\nCREATE INDEX ON transfers (to_account_id);\nCREATE INDEX ON transfers (from_account_id, to_account_id);",
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/migration/000001_init_schema.down.sql",
          "c": "DROP TABLE IF EXISTS transfers;\nDROP TABLE IF EXISTS entries;\nDROP TABLE IF EXISTS accounts;",
        },
        {
          "t": "callout",
          "title": "⚠️ กฎเหล็กลำดับการ DROP TABLE",
          "c": "ในไฟล์ `.down.sql` ต้องลบตารางลูกที่มี Foreign Key (`transfers` และ `entries`) ก่อนเสมอ! หากคุณพยายาม `DROP TABLE accounts;` ซึ่งเป็นตารางแม่ก่อน PostgreSQL จะปฏิเสธและพ่น Error ทันที เพราะตารางลูกยังอ้างอิง ID ของ `accounts` อยู่",
          "warn": true,
        },
        {
          "t": "h2",
          "c": "4. รู้จักกับ Makefile: รวมคำสั่งยาวให้สั้นนิดเดียว",
        },
        {
          "t": "p",
          "c": "สังเกตไหมครับว่าคำสั่ง `docker run`, `docker exec` หรือคำสั่ง `migrate` นั้นยาวมากและจำยาก ถ้าต้องพิมพ์เองทุกครั้งมีโอกาสพิมพ์ผิดสูงมาก วิศวกรซอฟต์แวร์จึงนิยมใช้ไฟล์ชื่อ **`Makefile`** มาเก็บชุดคำสั่งที่ใช้บ่อยไว้เป็นคำสั่งลัดสั้นๆ",
        },
        {
          "t": "p",
          "c": "**โครงสร้างพื้นฐานของ Makefile ที่ต้องรู้ก่อนเขียน:**",
        },
        {
          "t": "ul",
          "c": [
            "**ตัวแปร (Variables)**: เช่น `DB_URL=...` สามารถประกาศไว้ด้านบนสุด แล้วเรียกใช้ในคำสั่งด้านล่างด้วยไวยากรณ์ `$(DB_URL)` เพื่อไม่ต้องพิมพ์ Connection String ซ้ำหลายรอบ",
            "**เป้าหมาย (Target)**: เขียนในรูปแบบ `ชื่อคำสั่ง:` แล้วขึ้นบรรทัดใหม่ด้วยการกดปุ่ม **Tab (ห้ามเคาะ Spacebar เด็ดขาด)** ตามด้วยคำสั่ง CLI ที่ต้องการให้รัน เวลาเรียกใช้ก็แค่พิมพ์ `make <ชื่อคำสั่ง>` เช่น `make postgres` หรือ `make migrateup`",
            "**`.PHONY`**: ปกติแล้วโปรแกรม `make` ถูกออกแบบมาในยุคภาษา C เพื่อเช็กว่ามี 'ไฟล์' ชื่อเดียวกับ Target ถูกสร้างขึ้นมาหรือยัง ถ้าบังเอิญในโปรเจกต์ของเรามีโฟลเดอร์หรือไฟล์ที่ชื่อว่า `test` หรือ `server` อยู่จริง ตัว `make` จะเข้าใจผิดว่างานเสร็จแล้วและไม่ยอมรันคำสั่งให้! เราจึงต้องประกาศ `.PHONY: postgres createdb ...` กำกับไว้เสมอ เพื่อบอก `make` อย่างชัดเจนว่าชื่อเหล่านี้คือ **'ชื่อคำสั่งลัด (Action)'** ไม่ใช่ชื่อไฟล์ ให้รันคำสั่งข้างในทุกครั้งที่เรียกเสมอ",
          ],
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/Makefile` ไว้ที่รูทของโปรเจกต์ดังนี้:",
        },
        {
          "t": "code",
          "lang": "makefile",
          "label": "simplebank/Makefile",
          "c": "DB_URL=postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\n\npostgres:\n\tdocker run --name postgres16 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:16-alpine\n\ncreatedb:\n\tdocker exec -it postgres16 createdb --username=root --owner=root simple_bank\n\ndropdb:\n\tdocker exec -it postgres16 dropdb simple_bank\n\nmigrateup:\n\tmigrate -path db/migration -database \"$(DB_URL)\" -verbose up\n\nmigratedown:\n\tmigrate -path db/migration -database \"$(DB_URL)\" -verbose down 1\n\ntest:\n\tgo test -v -cover -count=1 ./...\n\nserver:\n\tgo run main.go\n\n.PHONY: postgres createdb dropdb migrateup migratedown test server",
        },
        {
          "t": "h2",
          "c": "5. สั่งรัน Migration และตรวจสอบผล",
        },
        {
          "t": "p",
          "c": "ตอนนี้เราสามารถสั่งรัน `make migrateup` สั้นๆ ใน Terminal ได้เลย ตัว `make` จะไปเรียกคำสั่ง `migrate` เต็มๆ เพื่ออ่านไฟล์ในโฟลเดอร์ `db/migration` และสร้างตารางทั้ง 3 ลงใน PostgreSQL ทันที:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ผลลัพธ์การรันคำสั่ง make migrateup",
          "code": "make migrateup",
          "out": "migrate -path db/migration -database \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\" -verbose up\n2026/10/30 14:00:00 Starting version 1\n2026/10/30 14:00:00 Applied 1/u 000001_init_schema.up.sql (15.2ms)\n2026/10/30 14:00:00 Finished in 20.1ms",
        },
        {
          "t": "h2",
          "c": "6. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ทำไมใน Makefile จึงต้องใส่ .PHONY กำกับเป้าหมายอย่าง test, postgres, server ไว้?",
              "options": [
                {
                  "text": "เพื่อบอก Make ว่าชื่อเหล่านี้คือคำสั่ง (Action) ป้องกันไม่ให้ Make สับสนหากมีไฟล์หรือโฟลเดอร์ชื่อเดียวกันอยู่ในโปรเจกต์",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! หากมีโฟลเดอร์ชื่อ test อยู่จริง Make จะคิดว่าเป้าหมายเสร็จแล้วและไม่ยอมรันคำสั่ง .PHONY จึงจำเป็นเพื่อบังคับให้รันเสมอ",
                },
                {
                  "text": "เพื่อให้คำสั่งเหล่านั้นรันในโหมด Background เสมอ",
                  "isCorrect": false,
                  "explain": ".PHONY ไม่เกี่ยวกับ Background process ครับ",
                },
                {
                  "text": "เพื่อซ่อนคำสั่งไม่ให้คนอื่นมองเห็นใน Makefile",
                  "isCorrect": false,
                  "explain": ".PHONY ไม่ได้เป็นการซ่อนคำสั่ง แต่เป็นการประกาศ Non-file targets",
                },
              ],
            },
            {
              "question": "ในไฟล์ .down.sql ทำไมเราต้องลบตาราง transfers และ entries ก่อนที่จะลบตาราง accounts?",
              "options": [
                {
                  "text": "เพราะตาราง transfers และ entries มี Foreign Key อ้างอิง ID ของ accounts อยู่ ถ้าลบ accounts ก่อน PostgreSQL จะปฏิเสธทันที",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! Foreign Key ป้องกันไม่ให้ตารางแม่ถูกลบในขณะที่ตารางลูกยังคงอ้างอิงอยู่ ดังนั้นการ rollback ต้องลบตารางลูกก่อนเสมอ",
                },
                {
                  "text": "เพราะตาราง accounts มีขนาดไฟล์ใหญ่ที่สุด",
                  "isCorrect": false,
                  "explain": "ลำดับการ DROP TABLE ขึ้นอยู่กับ Dependency (Foreign Key) ไม่เกี่ยวกับขนาดของตาราง",
                },
              ],
            },
          ],
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "ตารางใน PostgreSQL พร้อมแล้ว! ในโมดูลที่ 3 บทที่ **3.1 Data Store & การเขียน Raw SQL CRUD** เราจะมาเขียนโค้ด Go เชื่อมต่อ database/sql และเขียนคำสั่ง CRUD กันครับ",
        },
      ],
      en: [],
    },
  },
};
