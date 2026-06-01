import type { Page } from "@/lib/types";

const GROUP = "บทที่ 9: ฐานข้อมูล & SQL";

export const databasesPages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "db-model": {
    slug: "db-model",
    title: "Relational Model & ออกแบบตาราง",
    lead: "เข้าใจตาราง แถว คอลัมน์ key และความสัมพันธ์ — รากฐานของการออกแบบฐานข้อมูลที่ดี",
    group: GROUP,
    blocks: [
      { t: "p", c: "เกือบทุกแอปจริงต้องเก็บข้อมูลถาวรในฐานข้อมูล (database) ชนิดที่นิยมสุดคือ relational database ที่เก็บข้อมูลเป็นตาราง หัวข้อนี้สอนวิธีคิดเรื่องการออกแบบตารางให้ดีตั้งแต่ต้น ก่อนเขียน SQL จริง" },

      { t: "h2", c: "ตาราง แถว คอลัมน์ และ key" },
      { t: "p", c: "ข้อมูลเก็บเป็นตาราง แต่ละแถว (row) คือหนึ่งรายการ แต่ละคอลัมน์ (column) คือคุณสมบัติหนึ่ง" },
      {
        t: "table",
        head: ["คำ", "ความหมาย"],
        rows: [
          ["Table", "ตารางเก็บข้อมูลชนิดเดียวกัน (เช่น users)"],
          ["Row", "หนึ่งรายการ (ผู้ใช้หนึ่งคน)"],
          ["Column", "คุณสมบัติหนึ่ง (name, email)"],
          ["Primary Key", "คอลัมน์ที่ระบุแต่ละแถวไม่ซ้ำ (id)"],
          ["Foreign Key", "คอลัมน์ที่ชี้ไป primary key ของอีกตาราง"],
        ],
      },
      { t: "code", lang: "text", c: "ตาราง users                    ตาราง posts\n+----+--------+              +----+---------+----------+\n| id | name   |              | id | title   | user_id  |  <- FK ชี้ไป users.id\n+----+--------+              +----+---------+----------+\n|  1 | Aph    |              |  1 | Hello   |    1     |\n|  2 | Bee    |              |  2 | World   |    1     |\n+----+--------+              +----+---------+----------+" },

      { t: "h2", c: "ความสัมพันธ์ระหว่างตาราง" },
      {
        t: "table",
        head: ["แบบ", "ตัวอย่าง", "ทำยังไง"],
        rows: [
          ["One-to-Many", "ผู้ใช้ 1 คน มีหลายโพสต์", "posts มี FK user_id"],
          ["Many-to-Many", "นักเรียน-วิชา (ลงได้หลายวิชา)", "ตารางกลาง (enrollment)"],
          ["One-to-One", "ผู้ใช้ 1 คน มี 1 profile", "FK + unique"],
        ],
      },

      { t: "h2", c: "Normalization — อย่าเก็บข้อมูลซ้ำ" },
      { t: "p", c: "หลักการคือไม่เก็บข้อมูลเดียวกันซ้ำหลายที่ เพราะแก้ยากและเสี่ยงไม่ตรงกัน แยกข้อมูลออกเป็นตารางแล้วเชื่อมด้วย key แทน" },
      { t: "code", lang: "text", c: "# ❌ เก็บชื่อผู้ใช้ซ้ำในทุกโพสต์ (แก้ชื่อต้องตามแก้ทุกแถว)\nposts: | id | title | user_name |\n\n# ✅ เก็บ user_id ชี้ไปตาราง users (แก้ชื่อที่เดียว)\nposts: | id | title | user_id |  ->  users: | id | name |" },
      { t: "callout", title: "ออกแบบดีตั้งแต่ต้น = แก้ทีหลังน้อย", c: "การวาง schema ให้ดีตั้งแต่แรก (แยกตารางตามชนิดข้อมูล, ตั้ง key ให้ถูก) ช่วยลดปัญหามหาศาลในอนาคต — เปลี่ยน schema ของระบบที่มีข้อมูลแล้วยุ่งยากกว่าเขียนโค้ดมาก" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "ข้อมูลเก็บเป็นตาราง: row (รายการ) × column (คุณสมบัติ)",
          "Primary Key ระบุแถวไม่ซ้ำ; Foreign Key เชื่อมไปตารางอื่น",
          "ความสัมพันธ์: 1-many (FK), many-many (ตารางกลาง), 1-1",
          "Normalization: อย่าเก็บซ้ำ แยกตาราง+เชื่อมด้วย key",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ออกแบบ schema ระบบยืม-คืนหนังสือ (members, books, loans)  2) ระบุ primary key และ foreign key ของแต่ละตาราง  3) ระบุว่าความสัมพันธ์ member-loan เป็นแบบไหน  4) ชี้จุดที่ออกแบบผิดถ้าเก็บชื่อสมาชิกซ้ำในตาราง loans" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: SQL เจาะลึก →", slug: "db-sql", desc: "คำสั่งดึง/แก้/รวมข้อมูล" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "db-sql": {
    slug: "db-sql",
    title: "SQL เจาะลึก",
    lead: "ภาษาสำหรับคุยกับฐานข้อมูล — สร้าง ดึง แก้ ลบ และรวมข้อมูลข้ามตารางด้วย JOIN",
    group: GROUP,
    blocks: [
      { t: "p", c: "SQL (Structured Query Language) คือภาษาที่ใช้สั่งงานฐานข้อมูล relational ทุกตัว หัวข้อนี้ครอบคลุมตั้งแต่คำสั่งพื้นฐานจนถึง JOIN และ GROUP BY ที่ใช้บ่อยในงานจริง" },

      { t: "h2", c: "CRUD พื้นฐาน" },
      { t: "code", lang: "sql", c: "-- สร้างตาราง\nCREATE TABLE users (\n    id INTEGER PRIMARY KEY,\n    name TEXT NOT NULL,\n    age INTEGER\n);\n\n-- เพิ่มข้อมูล\nINSERT INTO users (name, age) VALUES ('Aph', 25);\n\n-- ดึงข้อมูล\nSELECT * FROM users;\nSELECT name, age FROM users WHERE age >= 18;\n\n-- แก้ไข\nUPDATE users SET age = 26 WHERE name = 'Aph';\n\n-- ลบ\nDELETE FROM users WHERE id = 1;" },
      { t: "callout", title: "DELETE/UPDATE ต้องมี WHERE", warn: true, c: "DELETE FROM users; (ไม่มี WHERE) = ลบทุกแถวในตาราง! เช่นเดียวกับ UPDATE ที่ไม่มี WHERE จะแก้ทุกแถว — ตรวจ WHERE ให้ดีก่อนรันเสมอ โดยเฉพาะบนฐานข้อมูลจริง" },

      { t: "h2", c: "WHERE, ORDER BY, LIMIT" },
      { t: "code", lang: "sql", c: "SELECT * FROM users\nWHERE age >= 18 AND name LIKE 'A%'   -- เงื่อนไข (LIKE = คล้าย)\nORDER BY age DESC                     -- เรียงจากมากไปน้อย\nLIMIT 10;                             -- เอาแค่ 10 แถว" },

      { t: "h2", c: "JOIN — รวมข้อมูลข้ามตาราง" },
      { t: "p", c: "JOIN เชื่อมตารางเข้าด้วยกันผ่าน key เช่น เอาโพสต์มาแสดงพร้อมชื่อเจ้าของ INNER JOIN เอาเฉพาะที่จับคู่ได้, LEFT JOIN เอาฝั่งซ้ายทั้งหมด" },
      { t: "code", lang: "sql", c: "-- เอาโพสต์พร้อมชื่อผู้เขียน\nSELECT posts.title, users.name\nFROM posts\nINNER JOIN users ON posts.user_id = users.id;\n\n-- LEFT JOIN: เอา users ทุกคน แม้ไม่มีโพสต์ (โพสต์เป็น NULL)\nSELECT users.name, posts.title\nFROM users\nLEFT JOIN posts ON users.id = posts.user_id;" },

      { t: "h2", c: "GROUP BY + aggregate" },
      { t: "p", c: "จัดกลุ่มแล้วสรุปด้วยฟังก์ชันรวม: COUNT, SUM, AVG, MAX, MIN" },
      { t: "code", lang: "sql", c: "-- นับจำนวนโพสต์ของแต่ละผู้ใช้\nSELECT user_id, COUNT(*) AS post_count\nFROM posts\nGROUP BY user_id;\n\n-- อายุเฉลี่ยแยกตามเมือง (เฉพาะกลุ่มที่เกิน 1 คน)\nSELECT city, AVG(age) AS avg_age\nFROM users\nGROUP BY city\nHAVING COUNT(*) > 1;   -- HAVING = WHERE สำหรับหลัง GROUP BY" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "CRUD: CREATE/INSERT/SELECT/UPDATE/DELETE — DELETE/UPDATE ต้องมี WHERE",
          "WHERE กรอง, ORDER BY เรียง, LIMIT จำกัดจำนวน",
          "JOIN รวมตารางผ่าน key: INNER (จับคู่ได้) / LEFT (ซ้ายทั้งหมด)",
          "GROUP BY + COUNT/SUM/AVG สรุปตามกลุ่ม; HAVING กรองหลังกลุ่ม",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน SELECT ดึงผู้ใช้อายุ >= 20 เรียงตามชื่อ  2) JOIN posts กับ users เอา title + ชื่อผู้เขียน  3) นับจำนวนโพสต์ต่อผู้ใช้ด้วย GROUP BY  4) หาเมืองที่มีผู้ใช้มากกว่า 2 คน (HAVING)" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Index, Transaction & Constraint →", slug: "db-advanced", desc: "ทำให้เร็วและถูกต้องเมื่อข้อมูลเยอะ" },
          { title: "← ก่อนหน้า: Relational Model", slug: "db-model" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "db-advanced": {
    slug: "db-advanced",
    title: "Index, Transaction & Constraint",
    lead: "ทำให้ query เร็วขึ้นด้วย index, รับประกันความถูกต้องด้วย transaction และ constraint",
    group: GROUP,
    blocks: [
      { t: "p", c: "เมื่อข้อมูลเยอะและมีหลายคนเขียนพร้อมกัน เราต้องรู้จักเครื่องมือที่ทำให้ฐานข้อมูล \"เร็ว\" และ \"ถูกต้อง\" — index, transaction และ constraint" },

      { t: "h2", c: "Index — ทำให้ค้นหาเร็ว" },
      { t: "p", c: "index เหมือนสารบัญหนังสือ ช่วยให้ฐานข้อมูลกระโดดไปหาแถวที่ต้องการได้เร็ว แทนการไล่ดูทุกแถว (เชื่อมแนวคิด O(log n) vs O(n) จากบท DSA)" },
      { t: "code", lang: "sql", c: "-- สร้าง index บนคอลัมน์ที่ค้นบ่อย\nCREATE INDEX idx_users_email ON users(email);\n\n-- query ที่ค้นด้วย email จะเร็วขึ้นมากเมื่อข้อมูลเยอะ\nSELECT * FROM users WHERE email = 'aph@example.com';" },
      { t: "callout", title: "index เร็วตอนอ่าน ช้าตอนเขียน", warn: true, c: "index เร่งการค้นหา แต่ทำให้การ INSERT/UPDATE ช้าลงนิด (ต้องอัปเดต index ด้วย) และกินพื้นที่ — ใส่ index เฉพาะคอลัมน์ที่ค้น/JOIN บ่อยจริง ๆ ไม่ใช่ทุกคอลัมน์" },

      { t: "h2", c: "Transaction — กลุ่มคำสั่งที่ต้องสำเร็จพร้อมกัน" },
      { t: "p", c: "บางงานต้องทำหลายคำสั่งให้ \"สำเร็จทั้งหมด หรือไม่ทำเลย\" เช่นโอนเงิน (หักบัญชี A + เพิ่มบัญชี B) ถ้าครึ่งทางพัง ต้องย้อนทั้งหมด — นี่คือ transaction" },
      { t: "code", lang: "sql", c: "BEGIN;                                          -- เริ่ม transaction\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;                                         -- ยืนยันทั้งหมด\n\n-- ถ้าระหว่างทางมีปัญหา:\n-- ROLLBACK;   -- ย้อนกลับทุกอย่าง เหมือนไม่เคยทำ" },
      { t: "callout", title: "ACID โดยย่อ", c: "transaction รับประกันคุณสมบัติ ACID: Atomicity (ทำครบหรือไม่ทำเลย), Consistency (ข้อมูลคงความถูกต้อง), Isolation (ไม่กวนกันเมื่อทำพร้อมกัน), Durability (commit แล้วอยู่ถาวร) — หัวใจคือ atomicity: โอนเงินต้องไม่หักแล้วไม่เพิ่ม" },

      { t: "h2", c: "Constraint — กฎที่ฐานข้อมูลบังคับ" },
      { t: "code", lang: "sql", c: "CREATE TABLE users (\n    id INTEGER PRIMARY KEY,\n    email TEXT NOT NULL UNIQUE,      -- ห้ามว่าง + ห้ามซ้ำ\n    age INTEGER CHECK (age >= 0),    -- ต้อง >= 0\n    country TEXT DEFAULT 'TH'        -- ค่าเริ่มต้น\n);" },
      {
        t: "table",
        head: ["Constraint", "บังคับว่า"],
        rows: [
          ["NOT NULL", "ห้ามเป็นค่าว่าง"],
          ["UNIQUE", "ห้ามซ้ำในคอลัมน์"],
          ["CHECK", "ต้องผ่านเงื่อนไข"],
          ["FOREIGN KEY", "ต้องมีอยู่ในตารางที่ชี้ไป"],
        ],
      },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "index = สารบัญ ทำให้ค้นเร็ว แต่ช้าตอนเขียน — ใส่เท่าที่ค้นบ่อย",
          "transaction: BEGIN...COMMIT ทำครบหรือ ROLLBACK ย้อนทั้งหมด",
          "ACID — หัวใจคือ atomicity (ทำครบหรือไม่ทำเลย)",
          "constraint บังคับความถูกต้องระดับ DB: NOT NULL/UNIQUE/CHECK/FK",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง index บนคอลัมน์ที่ใช้ค้นบ่อย แล้วอธิบายข้อดี/ข้อเสีย  2) เขียน transaction โอนเงินที่ต้อง atomic  3) ออกแบบตารางที่ใช้ NOT NULL, UNIQUE, CHECK  4) อธิบายว่าทำไมการโอนเงินต้องเป็น transaction" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: เชื่อม Python กับ DB (sqlite3) →", slug: "db-python", desc: "สั่งงาน DB จากโค้ด Python" },
          { title: "← ก่อนหน้า: SQL เจาะลึก", slug: "db-sql" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "db-python": {
    slug: "db-python",
    title: "เชื่อม Python กับ DB (sqlite3)",
    lead: "สั่งงานฐานข้อมูลจากโค้ด Python ด้วย sqlite3 ที่มากับ Python — และกัน SQL injection",
    group: GROUP,
    blocks: [
      { t: "p", c: "sqlite3 เป็นฐานข้อมูลที่มากับ Python อยู่แล้ว (ไม่ต้องติดตั้ง server) เก็บทั้งฐานข้อมูลเป็นไฟล์เดียว เหมาะมากสำหรับเรียนรู้และโปรเจกต์เล็ก หัวข้อนี้สอนเชื่อม Python กับ DB และเรื่องสำคัญที่สุด: กัน SQL injection" },

      { t: "h2", c: "connect, cursor, execute, commit" },
      { t: "code", lang: "python", c: "import sqlite3\n\nconn = sqlite3.connect(\"app.db\")   # เปิด (สร้างไฟล์ถ้ายังไม่มี)\ncur = conn.cursor()\n\ncur.execute(\"\"\"\n    CREATE TABLE IF NOT EXISTS users (\n        id INTEGER PRIMARY KEY,\n        name TEXT NOT NULL,\n        age INTEGER\n    )\n\"\"\")\n\ncur.execute(\"INSERT INTO users (name, age) VALUES (?, ?)\", (\"Aph\", 25))\nconn.commit()          # ต้อง commit ถึงจะบันทึกจริง\nconn.close()" },

      { t: "h2", c: "ดึงข้อมูล (fetch)" },
      { t: "code", lang: "python", c: "import sqlite3\n\nconn = sqlite3.connect(\"app.db\")\ncur = conn.cursor()\n\ncur.execute(\"SELECT id, name, age FROM users WHERE age >= ?\", (18,))\nrows = cur.fetchall()      # คืน list ของ tuple\nfor row in rows:\n    print(row)             # (1, 'Aph', 25)\n\none = cur.execute(\"SELECT * FROM users WHERE id = ?\", (1,)).fetchone()\nconn.close()" },

      { t: "h2", c: "SQL Injection — เรื่องที่สำคัญที่สุด" },
      { t: "p", c: "อย่าต่อค่าจากผู้ใช้เข้า SQL ด้วย string เด็ดขาด เพราะผู้ใช้ที่ประสงค์ร้ายส่งโค้ด SQL เข้ามาได้ ใช้ ? placeholder ให้ไลบรารีจัดการแทน (เชื่อมหลัก \"อย่าเชื่อ input\" จากบท defensive)" },
      { t: "code", lang: "python", c: "name = input(\"ชื่อ: \")\n\n# ❌ อันตรายมาก — SQL injection\ncur.execute(f\"SELECT * FROM users WHERE name = '{name}'\")\n# ถ้าผู้ใช้พิมพ์:  ' OR '1'='1   จะดึงทุกแถว / หรือลบตารางได้\n\n# ✅ ใช้ ? placeholder — ปลอดภัย ไลบรารี escape ให้\ncur.execute(\"SELECT * FROM users WHERE name = ?\", (name,))" },
      { t: "callout", title: "ใช้ ? placeholder เสมอ", warn: true, c: "ไม่ว่าค่าจะมาจากไหน (ผู้ใช้, ไฟล์, API) อย่าต่อ string เข้า SQL เอง — ส่งค่าผ่าน parameter (?) ทุกครั้ง นี่คือช่องโหว่ความปลอดภัยอันดับต้น ๆ ที่ป้องกันได้ง่ายแต่คนพลาดบ่อย" },
      { t: "callout", title: "ใช้ with กับ connection ได้", c: "sqlite3 connection ใช้กับ with ได้ (จากบท Context Manager) เพื่อ commit/rollback อัตโนมัติ: with sqlite3.connect(\"app.db\") as conn:" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "sqlite3 มากับ Python เก็บ DB เป็นไฟล์เดียว",
          "connect → cursor → execute → commit (ต้อง commit ถึงบันทึก)",
          "fetchall() คืนหลายแถว, fetchone() คืนแถวเดียว",
          "กัน SQL injection ด้วย ? placeholder เสมอ — อย่าต่อ string เอง",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง DB sqlite + ตาราง แล้ว insert ข้อมูล 3 แถว  2) ดึงข้อมูลด้วย WHERE + ? placeholder  3) เขียน CRUD ครบ (เพิ่ม/อ่าน/แก้/ลบ)  4) ลองเขียนแบบต่อ string แล้วอธิบายว่าทำไมอันตราย แล้วแก้เป็น ?" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: ORM (SQLAlchemy) →", slug: "db-orm", desc: "map class กับตาราง ไม่ต้องเขียน SQL ดิบ" },
          { title: "← ก่อนหน้า: Index & Transaction", slug: "db-advanced" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "db-orm": {
    slug: "db-orm",
    title: "ORM (SQLAlchemy)",
    lead: "map class ของ Python เข้ากับตารางในฐานข้อมูล เขียน CRUD ด้วยโค้ด Python แทน SQL ดิบ",
    group: GROUP,
    blocks: [
      { t: "p", c: "ORM (Object-Relational Mapping) คือเครื่องมือที่ทำให้เราทำงานกับฐานข้อมูลผ่าน object/class ของ Python แทนการเขียน SQL ดิบทุกครั้ง — แต่ละแถวกลายเป็น object หนึ่งตัว ทำให้โค้ดอ่านง่ายและจัดการง่ายขึ้น" },

      { t: "h2", c: "ORM map class ↔ table" },
      { t: "p", c: "หลักการ: 1 class = 1 ตาราง, 1 object = 1 แถว, attribute = คอลัมน์ ตัวอย่างใช้ SQLAlchemy (ORM ยอดนิยมของ Python)" },
      { t: "code", lang: "python", c: "from sqlalchemy import create_engine, String\nfrom sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session\n\nclass Base(DeclarativeBase):\n    pass\n\nclass User(Base):                       # class = ตาราง\n    __tablename__ = \"users\"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    name: Mapped[str] = mapped_column(String(50))\n    age: Mapped[int]\n\nengine = create_engine(\"sqlite:///app.db\")\nBase.metadata.create_all(engine)        # สร้างตารางจาก class" },

      { t: "h2", c: "CRUD ผ่าน ORM" },
      { t: "code", lang: "python", c: "from sqlalchemy import select\n\nwith Session(engine) as session:\n    # Create — สร้าง object แล้ว add\n    user = User(name=\"Aph\", age=25)\n    session.add(user)\n    session.commit()\n\n    # Read — query ด้วย object ไม่ใช่ SQL\n    result = session.scalars(select(User).where(User.age >= 18))\n    for u in result:\n        print(u.name, u.age)\n\n    # Update — แก้ attribute แล้ว commit\n    u = session.get(User, 1)\n    u.age = 26\n    session.commit()\n\n    # Delete\n    session.delete(u)\n    session.commit()" },

      { t: "h2", c: "ORM vs raw SQL — เลือกยังไง" },
      {
        t: "table",
        head: ["", "ORM", "raw SQL"],
        rows: [
          ["เขียน", "โค้ด Python (object)", "SQL string"],
          ["อ่านง่าย", "ดีกับงานทั่วไป", "ดีกับ query ซับซ้อน"],
          ["ปลอดภัย", "กัน injection ให้", "ต้องระวังเอง (?)"],
          ["ควบคุม", "น้อยกว่า", "เต็มที่"],
        ],
      },
      { t: "callout", title: "ORM สะดวก แต่ต้องเข้าใจ SQL ข้างใต้", c: "ORM ช่วยให้เขียนเร็วและกัน injection ให้ แต่ถ้าไม่เข้าใจ SQL ที่มันสร้างขึ้น อาจเขียนโค้ดที่ยิง query ซ้ำ ๆ จนช้าโดยไม่รู้ตัว (เช่นปัญหา N+1 query) — เรียน SQL ให้แม่นก่อน (หัวข้อก่อนหน้า) แล้ว ORM จะเป็นเครื่องทุ่นแรงที่ดี" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "ORM map class↔ตาราง, object↔แถว — ทำงานผ่าน Python ไม่ต้องเขียน SQL ดิบ",
          "SQLAlchemy: นิยาม class, create_all, ใช้ Session ทำ CRUD",
          "ORM กัน injection + เขียนเร็ว; raw SQL คุมได้เต็มที่กับ query ซับซ้อน",
          "ต้องเข้าใจ SQL ข้างใต้ ไม่งั้นเสี่ยงเขียนช้า (N+1)",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) นิยาม model User ด้วย SQLAlchemy แล้ว create ตาราง  2) เขียน CRUD ครบผ่าน ORM  3) แปลง CRUD ที่เขียนด้วย sqlite3 ดิบ(หัวข้อก่อน) มาเป็น ORM  4) อธิบายข้อดี/ข้อเสียของ ORM เทียบ raw SQL" },
      {
        t: "links",
        c: [
          { title: "จบบทที่ 9 แล้ว 🎉 — กลับหน้าภาพรวมคอร์ส", slug: "intermediate", desc: "บทที่ 10: สร้างเว็บแอป & API กำลังจัดทำ" },
          { title: "← ก่อนหน้า: เชื่อม Python กับ DB", slug: "db-python" },
          { title: "ทบทวน: Relational Model (ต้นบท)", slug: "db-model" },
        ],
      },
    ],
  },
};
