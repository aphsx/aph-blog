import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/03-store-tx.ts
// หน้าที่: บทที่ 3.1, 4.1, และ 4.2 การเชื่อมต่อฐานข้อมูล CRUD, ACID Transaction และ TransferTx
// =============================================================================

export const storeTxPages: Record<string, Page> = {
  "bank-db-store-crud": {
    "slug": "bank-db-store-crud",
    "title": {
      "th": "3.1 Data Store & การเขียน Raw SQL CRUD ในภาษา Go",
      "en": "3.1 Data Store & Raw SQL CRUD in Go"
    },
    "lead": {
      "th": "เชื่อมต่อ PostgreSQL ด้วย database/sql, จัดการ Connection Pool, และเขียน CRUD ผ่าน Parameterized Raw SQL เพื่อป้องกัน SQL Injection โดยไม่อิงกับ ORM เวทมนตร์",
      "en": "Connecting to PostgreSQL with database/sql, managing connection pooling, and writing clean parameterized SQL CRUD without ORM magic."
    },
    "group": "3. เชื่อมต่อฐานข้อมูลด้วย Go & พิสูจน์ด้วย Unit Test",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: สร้างตาราง `accounts`, `entries`, และ `transfers` บน PostgreSQL ใน Docker สำเร็จแล้ว\n• **ภารกิจในบทนี้**: เขียนโค้ด Go ในโฟลเดอร์ `simplebank/db/` เพื่อเปิด Connection Pool (`db.go`), นิยาม Struct (`models.go`), เขียนฟังก์ชัน CRUD ของทั้ง 3 ตาราง (`account.go`, `entry.go`, `transfer.go`), และทดสอบรันจริงครั้งแรกด้วย `main.go`\n• **ไวยากรณ์ Go ที่จะได้ใช้จริง**: Blank Import (`_ \"github.com/lib/pq\"`), Interface (`DBTX`), Pointer Receiver (`func (q *Queries)`), Address-of (`&i.ID` ใน `row.Scan`), และ Slice (`[]Account`)"
        },
        {
          "t": "p",
          "c": "เมื่อตารางในฐานข้อมูลพร้อมแล้ว ในบทนี้เราจะเขียนโค้ดภาษา Go เพื่อทำหน้าที่ 3 อย่างคือ: **1) เปิดสระการเชื่อมต่อ (Connection Pool) ไปยัง PostgreSQL**, **2) ส่งคำสั่ง SQL พร้อมพารามิเตอร์อย่างปลอดภัย**, และ **3) แกะข้อมูลแถวที่ได้กลับมาใส่ใน Go Struct** โดยเราจะเขียน SQL ผ่านแพ็กเกจมาตรฐาน `database/sql` ของ Go โดยตรงแทนการใช้ ORM สำเร็จรูป เพื่อให้คุณเห็นการทำงานจริงทุกบรรทัดและควบคุมคำสั่งล็อกแถวข้อมูลระดับลึกในบทถัดไปได้อย่างแม่นยำ"
        },
        {
          "t": "callout",
          "title": "🗺️ แผนผังโฟลเดอร์ของโปรเจกต์ simplebank ในบทนี้",
          "c": "เพื่อให้เห็นภาพตรงกันตลอดทั้งคอร์ส เราจะกำหนดให้ Root Directory ของโปรเจกต์ชื่อว่า `simplebank` โดยในบทที่ 3 นี้ ไฟล์หลักทั้งหมดของ Data Access Layer จะถูกสร้างและจัดเก็บไว้ใต้โฟลเดอร์ `simplebank/db/` แยกหน้าที่กันอย่างชัดเจนตามหลัก Clean Architecture ดังนี้:\n```text\nsimplebank/\n├── db/\n│   ├── db.go          # ตัวเชื่อมต่อ Connection Pool & DBTX Interface & Queries\n│   ├── models.go      # Go Struct ของตาราง accounts, entries, transfers\n│   ├── account.go     # ฟังก์ชัน CRUD ของตาราง accounts\n│   ├── entry.go       # ฟังก์ชันบันทึกสมุดบัญชีแยกประเภท (Ledger)\n│   ├── transfer.go    # ฟังก์ชันบันทึกประวัติการโอนเงิน\n│   ├── store.go       # Transaction Manager กลาง (Store struct, NewStore, execTx จบในตัว)\n│   └── tx_transfer.go # โค้ดระบบโอนเงินระดับธุรกรรม (TransferTxParams, Result, TransferTx)\n├── go.mod\n└── ...\n```"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go & Best Practices ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "ไวยากรณ์ Go ที่เจอในบทนี้",
            "โค้ดในโปรเจกต์",
            "แกะความหมายให้เข้าใจง่าย"
          ],
          "rows": [
            [
              "1. Blank Import (_)",
              "`_ \"github.com/lib/pq\"`",
              "สั่งให้แพ็กเกจ `pq` ทำงานเบื้องหลังตอนเริ่มโปรแกรมเพื่อลงทะเบียนไดรเวอร์ `\"postgres\"` เข้ากับ `database/sql` โดยที่เราไม่ต้องพิมพ์เรียก `pq.` ในโค้ด"
            ],
            [
              "2. DBTX Interface",
              "`type DBTX interface { ExecContext(...); QueryRowContext(...) }`",
              "สร้างสัญญากลางเพื่อให้ `Queries` รับได้ทั้ง `*sql.DB` (การเชื่อมต่อปกติ) และ `*sql.Tx` (การเชื่อมต่อใน Transaction บทที่ 4) โดยไม่ต้องเขียนโค้ด CRUD ซ้ำสองรอบ"
            ],
            [
              "3. ส่งพิกัด (&) เข้า row.Scan",
              "`err := row.Scan(&i.ID, &i.Owner, &i.Balance, ...)`",
              "ส่งพิกัดตำแหน่งหน่วยความจำ (`&`) ของแต่ละฟิลด์เข้าไป เพื่อให้ `Scan` นำข้อมูลที่อ่านได้จากฐานข้อมูลไปหยอดใส่ตัวแปร `i` ของเราได้โดยตรง"
            ],
            [
              "4. Slice & defer rows.Close()",
              "`var items []Account` และ `defer rows.Close()`",
              "ใน `ListAccounts` เราสั่ง `defer rows.Close()` ทันทีเพื่อกันลืมคืน Connection เข้า Pool แล้ววนลูป `rows.Next()` นำแต่ละแถวต่อท้ายเข้า Slice ด้วย `append(items, i)`"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. การเชื่อมต่อฐานข้อมูล & Connection Pooling"
        },
        {
          "t": "p",
          "c": "ใน Go ออบเจกต์ `*sql.DB` ไม่ใช่การเชื่อมต่อไปยังฐานข้อมูลแค่ 1 ท่อเดี่ยวๆ แต่ตัวมันคือ **Connection Pool (สระรวมการเชื่อมต่อ)** ที่ Go บริหารจัดการเปิด-ปิดท่อเชื่อมต่อให้เราอัตโนมัติเบื้องหลัง การตั้งค่า Pool ให้เหมาะสมจึงสำคัญมากต่อความเสถียรของระบบ ก่อนเริ่มเขียนโค้ด ให้ติดตั้งไดรเวอร์ PostgreSQL ด้วยคำสั่ง:"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "ติดตั้ง PostgreSQL Driver (lib/pq)",
          "c": "go get github.com/lib/pq"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/db.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/db.go\n// หน้าที่: จัดการการเชื่อมต่อฐานข้อมูล PostgreSQL ผ่าน database/sql พร้อมระบบ Connection Pooling\n// แก้ปัญหา: หากเปิด-ปิด Connection ทุกครั้งที่ยิงคิวรี เซิร์ฟเวอร์จะกินทรัพยากรสูงและช้ามาก\n// =============================================================================\npackage db\n\nimport (\n\t\"database/sql\"\n\t\"time\"\n\n\t_ \"github.com/lib/pq\" // ลงทะเบียน postgres driver ให้กับ database/sql\n)\n\n// NewDB ทำหน้าที่เปิดสระรวมการเชื่อมต่อ (Connection Pool) และตั้งค่าขีดจำกัดที่เหมาะสมสำหรับ Production\nfunc NewDB(dataSourceName string) (*sql.DB, error) {\n\t// 1. ตรวจสอบรูปแบบ Connection String และสร้าง Pool (คำสั่งนี้ยังไม่ได้ต่อฐานข้อมูลจริง)\n\tdb, err := sql.Open(\"postgres\", dataSourceName)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\n\t// 2. กำหนดขนาด Connection Pool เพื่อควบคุมการใช้ทรัพยากร\n\tdb.SetMaxOpenConns(25)                 // จำนวน Connection สูงสุดที่เปิดใช้งานพร้อมกันได้ (ป้องกัน DB รับโหลดเกิน)\n\tdb.SetMaxIdleConns(25)                 // จำนวน Connection ที่เปิดสแตนด์บายไว้ใน Pool พร้อมหยิบไปใช้ทันที\n\tdb.SetConnMaxLifetime(5 * time.Minute) // อายุขัยสูงสุดของ Connection ก่อนถูกปิดแล้วสร้างใหม่ (ป้องกัน Stale Connection)\n\n\t// 3. ทดสอบส่งคำสั่ง ping ไปยังฐานข้อมูลจริง เพื่อการันตีว่าเชื่อมต่อได้สำเร็จก่อนคืนค่า\n\tif err := db.Ping(); err != nil {\n\t\treturn nil, err\n\t}\n\n\treturn db, nil\n}"
        },
        {
          "t": "ul",
          "c": [
            "**`_ \"github.com/lib/pq\"`**: ขีดล่างตัวเดียวกับใน `_, err` ตรงนี้แปลว่าดึงแพ็กเกจมาให้มันลงทะเบียนไดรเวอร์ PostgreSQL ตอนโปรแกรมเริ่ม แต่เราจะไม่เขียนชื่อ `pq` ในโค้ด ถ้าไม่ใส่ขีดล่าง Go จะฟ้องว่า import แล้วไม่ใช้",
            "**`db, err := sql.Open(...)`**: รับสองค่า ฟังก์ชันนี้แค่ตรวจว่าสายเชื่อมต่อเขียนถูกแบบหรือไม่ ยังไม่ได้คุยกับฐานข้อมูล ถ้าพลาด `err` ไม่ใช่ nil แล้วเราคืน `nil, err` ทันที",
            "**`if err := db.Ping(); err != nil`**: เรียก Ping แล้วเช็ค error ในบรรทัดเดียว ตัว `err` ตัวนี้ใช้ได้แค่ในบล็อก if Ping คือตัวที่สะกิดฐานข้อมูลจริง ถ้าไม่ผ่านแปลว่ายังต่อไม่ได้"
          ]
        },
        {
          "t": "h2",
          "c": "3. นิยาม Model และโครงสร้าง Queries"
        },
        {
          "t": "p",
          "c": "เราจะแปลงตารางในฐานข้อมูลมาเป็น Go Struct ในไฟล์ `db/models.go`:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/models.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/models.go\n// หน้าที่: นิยาม Go Struct สำหรับเป็นพิมพ์เขียว (Model) ที่ตรงกับโครงสร้างตารางใน PostgreSQL\n// แก้ปัญหา: แปลงข้อมูลจากตารางฐานข้อมูล (Rows) ให้กลายเป็นตัวแปร Strong-type ใน Go ที่ตรวจสอบประเภทข้อมูลได้ตั้งแต่ตอนคอมไพล์\n// =============================================================================\npackage db\n\nimport \"time\"\n\n// Account แทนโครงสร้างตาราง accounts (บัญชีผู้ใช้งาน)\ntype Account struct {\n\tID        int64     `json:\"id\"`\n\tOwner     string    `json:\"owner\"`\n\tBalance   int64     `json:\"balance\"` // เก็บเป็นหน่วยย่อยที่สุด (สตางค์/เซนต์) ห้ามใช้ทศนิยม\n\tCurrency  string    `json:\"currency\"`\n\tCreatedAt time.Time `json:\"created_at\"`\n}\n\n// Entry แทนโครงสร้างตาราง entries (สมุดบัญชีแยกประเภท Ledger บันทึกเงินเข้า-ออก)\ntype Entry struct {\n\tID        int64     `json:\"id\"`\n\tAccountID int64     `json:\"account_id\"`\n\tAmount    int64     `json:\"amount\"` // บวก = เงินเข้าบัญชี, ลบ = เงินออกจากบัญชี\n\tCreatedAt time.Time `json:\"created_at\"`\n}\n\n// Transfer แทนโครงสร้างตาราง transfers (ประวัติธุรกรรมการโอนเงินระหว่าง 2 บัญชี)\ntype Transfer struct {\n\tID            int64     `json:\"id\"`\n\tFromAccountID int64     `json:\"from_account_id\"` // บัญชีต้นทาง (ผู้โอน)\n\tToAccountID   int64     `json:\"to_account_id\"`   // บัญชีปลายทาง (ผู้รับ)\n\tAmount        int64     `json:\"amount\"`          // จำนวนเงินที่โอน (ต้องเป็นค่าบวกเสมอ)\n\tCreatedAt     time.Time `json:\"created_at\"`\n}"
        },
        {
          "t": "h2",
          "c": "4. อินเทอร์เฟซ DBTX และ Queries Struct"
        },
        {
          "t": "p",
          "c": "ในระบบของเรา คำสั่ง SQL CRUD (เช่น การสร้างบัญชีหรือการปรับยอดเงิน) จะต้องถูกเรียกใช้ใน 2 สถานการณ์ คือ **1) เรียกผ่านการเชื่อมต่อปกติ (`*sql.DB`)** และ **2) เรียกภายในก้อนธุรกรรม (`*sql.Tx`)** เนื่องจากทั้ง `*sql.DB` และ `*sql.Tx` มีเมธอดยิงคำสั่ง SQL ทั้ง 4 ตัวเหมือนกันเป๊ะ เราจึงสร้าง **`DBTX` Interface** ขึ้นมาเป็นสัญญากลางในไฟล์ `simplebank/db/db.go` เพื่อให้ `Queries` รับได้ทั้งสองแบบโดยไม่ต้องเขียนโค้ดซ้ำ:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/db/db.go",
          "c": " package db\n \n import (\n+\t\"context\"\n \t\"database/sql\"\n \t\"time\"\n \n \t_ \"github.com/lib/pq\"\n )\n \n // ... ฟังก์ชัน NewDB เดิม ...\n \treturn db, nil\n }\n+\n+// DBTX รวบรวมฟังก์ชันมาตรฐานสำหรับการยิงคำสั่ง SQL ที่มีร่วมกันใน *sql.DB และ *sql.Tx\n+type DBTX interface {\n+\tExecContext(context.Context, string, ...interface{}) (sql.Result, error)\n+\tPrepareContext(context.Context, string) (*sql.Stmt, error)\n+\tQueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)\n+\tQueryRowContext(context.Context, string, ...interface{}) *sql.Row\n+}\n+\n+// Queries ทำหน้าที่รันคำสั่ง SQL ทั้งหมด โดยผูกอยู่กับ DBTX\n+type Queries struct {\n+\tdb DBTX\n+}\n+\n+func New(db DBTX) *Queries {\n+\treturn &Queries{db: db}\n+}\n+\n+// WithTx สร้าง Queries ชุดใหม่ที่ผูกเข้ากับ Transaction (tx) ชั่วคราว\n+func (q *Queries) WithTx(tx *sql.Tx) *Queries {\n+\treturn &Queries{db: tx}\n+}"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/db.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/db.go\n// หน้าที่: จัดการการเชื่อมต่อฐานข้อมูล PostgreSQL พร้อม DBTX Interface สำหรับรองรับ Transaction\n// แก้ปัญหา: ออกแบบตามมาตรฐาน Clean Architecture สำหรับระบบธนาคาร\n// =============================================================================\npackage db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"time\"\n\n\t_ \"github.com/lib/pq\" // ลงทะเบียน postgres driver ให้กับ database/sql\n)\n\n// NewDB ทำหน้าที่เปิดสระรวมการเชื่อมต่อ (Connection Pool) และตั้งค่าขีดจำกัดที่เหมาะสมสำหรับ Production\nfunc NewDB(dataSourceName string) (*sql.DB, error) {\n\tdb, err := sql.Open(\"postgres\", dataSourceName)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\n\tdb.SetMaxOpenConns(25)                 // จำนวน Connection สูงสุดที่เปิดใช้งานพร้อมกันได้\n\tdb.SetMaxIdleConns(25)                 // จำนวน Connection ที่เปิดสแตนด์บายไว้ใน Pool\n\tdb.SetConnMaxLifetime(5 * time.Minute) // อายุขัยสูงสุดของ Connection\n\n\tif err := db.Ping(); err != nil {\n\t\treturn nil, err\n\t}\n\n\treturn db, nil\n}\n\n// DBTX รวบรวมฟังก์ชันมาตรฐานสำหรับการยิงคำสั่ง SQL ที่มีร่วมกันใน *sql.DB และ *sql.Tx\ntype DBTX interface {\n\tExecContext(context.Context, string, ...interface{}) (sql.Result, error)\n\tPrepareContext(context.Context, string) (*sql.Stmt, error)\n\tQueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)\n\tQueryRowContext(context.Context, string, ...interface{}) *sql.Row\n}\n\n// Queries ทำหน้าที่รันคำสั่ง SQL ทั้งหมด โดยผูกอยู่กับ DBTX\ntype Queries struct {\n\tdb DBTX\n}\n\nfunc New(db DBTX) *Queries {\n\treturn &Queries{db: db}\n}\n\n// WithTx สร้าง Queries ชุดใหม่ที่ผูกเข้ากับ Transaction (tx) ชั่วคราว\nfunc (q *Queries) WithTx(tx *sql.Tx) *Queries {\n\treturn &Queries{db: tx}\n}"
        },
        {
          "t": "h2",
          "c": "5. การเขียนฟังก์ชัน CRUD สำหรับ Account"
        },
        {
          "t": "p",
          "c": "มาดูตัวอย่างการเขียนฟังก์ชันสร้างบัญชี (CreateAccount) และดึงข้อมูลบัญชี (GetAccount):"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/account.go\n// หน้าที่: ฟังก์ชัน CRUD สำหรับจัดการตาราง accounts ด้วย Parameterized Query\n// แก้ปัญหา: แยกคำสั่ง SQL ออกจากตัวแปรข้อมูล ป้องกัน SQL Injection ได้ 100%\n// =============================================================================\npackage db\n\nimport \"context\"\n\ntype CreateAccountParams struct {\n\tOwner    string `json:\"owner\"`\n\tBalance  int64  `json:\"balance\"`\n\tCurrency string `json:\"currency\"`\n}\n\nconst createAccount = `-- name: CreateAccount :one\nINSERT INTO accounts (\n  owner,\n  balance,\n  currency\n) VALUES (\n  $1, $2, $3\n)\nRETURNING id, owner, balance, currency, created_at;\n`\n\n// CreateAccount สร้างบัญชีใหม่และดึงข้อมูลแถวที่เพิ่งสร้างกลับมาทันที\nfunc (q *Queries) CreateAccount(ctx context.Context, arg CreateAccountParams) (Account, error) {\n\t// 1. ส่งคำสั่ง INSERT พร้อมตัวแปรผ่าน Placeholder ($1, $2, $3)\n\trow := q.db.QueryRowContext(ctx, createAccount, arg.Owner, arg.Balance, arg.Currency)\n\n\t// 2. นำข้อมูลแถวที่คืนกลับมาจาก RETURNING มาแกะใส่ตัวแปร Account\n\tvar i Account\n\terr := row.Scan(\n\t\t&i.ID,\n\t\t&i.Owner,\n\t\t&i.Balance,\n\t\t&i.Currency,\n\t\t&i.CreatedAt,\n\t)\n\treturn i, err\n}\n\nconst getAccount = `-- name: GetAccount :one\nSELECT id, owner, balance, currency, created_at FROM accounts\nWHERE id = $1 LIMIT 1;\n`\n\n// GetAccount ดึงข้อมูลบัญชีตาม ID\nfunc (q *Queries) GetAccount(ctx context.Context, id int64) (Account, error) {\n\t// 1. ยิงคำสั่ง SELECT ค้นหาตาม ID ผ่าน Placeholder $1\n\trow := q.db.QueryRowContext(ctx, getAccount, id)\n\n\t// 2. แกะผลลัพธ์ใส่ตัวแปร Account ผ่าน Pointer\n\tvar i Account\n\terr := row.Scan(\n\t\t&i.ID,\n\t\t&i.Owner,\n\t\t&i.Balance,\n\t\t&i.Currency,\n\t\t&i.CreatedAt,\n\t)\n\treturn i, err\n}\n\ntype AddAccountBalanceParams struct {\n\tID     int64 `json:\"id\"`\n\tAmount int64 `json:\"amount\"` // บวก = เพิ่มเงิน, ลบ = หักเงิน\n}\n\nconst addAccountBalance = `-- name: AddAccountBalance :one\nUPDATE accounts\nSET balance = balance + $1\nWHERE id = $2\nRETURNING id, owner, balance, currency, created_at;\n`\n\n// AddAccountBalance ปรับยอดเงินคงเหลือในระดับ SQL อย่างเป็น Atomic (balance = balance + amount)\n// รองรับทั้งการฝากเงิน (Amount เป็นบวก) และการตัดเงิน (Amount เป็นลบ)\nfunc (q *Queries) AddAccountBalance(ctx context.Context, arg AddAccountBalanceParams) (Account, error) {\n\t// 1. ส่งคำสั่ง UPDATE โดยให้ฐานข้อมูลบวก/ลบยอดเงินในตัว (Atomic Update)\n\trow := q.db.QueryRowContext(ctx, addAccountBalance, arg.Amount, arg.ID)\n\n\t// 2. แกะข้อมูลแถวที่อัปเดตแล้วใส่ตัวแปร Account\n\tvar i Account\n\terr := row.Scan(\n\t\t&i.ID,\n\t\t&i.Owner,\n\t\t&i.Balance,\n\t\t&i.Currency,\n\t\t&i.CreatedAt,\n\t)\n\treturn i, err\n}\n\nconst deleteAccount = `-- name: DeleteAccount :exec\nDELETE FROM accounts\nWHERE id = $1;\n`\n\n// DeleteAccount ลบบัญชีตาม ID ออกจากฐานข้อมูล\nfunc (q *Queries) DeleteAccount(ctx context.Context, id int64) error {\n\t// 1. ส่งคำสั่ง DELETE ผ่าน ExecContext เมื่อไม่ต้องการข้อมูลแถวกลับมา\n\t_, err := q.db.ExecContext(ctx, deleteAccount, id)\n\treturn err\n}\n\ntype ListAccountsParams struct {\n\tLimit  int32 `json:\"limit\"`\n\tOffset int32 `json:\"offset\"`\n}\n\nconst listAccounts = `-- name: ListAccounts :many\nSELECT id, owner, balance, currency, created_at FROM accounts\nORDER BY id\nLIMIT $1 OFFSET $2;\n`\n\n// ListAccounts ดึงรายชื่อบัญชีแบบแบ่งหน้า (Pagination)\nfunc (q *Queries) ListAccounts(ctx context.Context, arg ListAccountsParams) ([]Account, error) {\n\t// 1. ส่งคำสั่ง SELECT ค้นหาหลายแถวด้วย QueryContext\n\trows, err := q.db.QueryContext(ctx, listAccounts, arg.Limit, arg.Offset)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\tdefer rows.Close()\n\n\t// 2. วนลูปอ่านข้อมูลทีละแถวด้วย rows.Next() และ Scan ค่าใส่ struct\n\tvar items []Account\n\tfor rows.Next() {\n\t\tvar i Account\n\t\tif err := rows.Scan(\n\t\t\t&i.ID,\n\t\t\t&i.Owner,\n\t\t\t&i.Balance,\n\t\t\t&i.Currency,\n\t\t\t&i.CreatedAt,\n\t\t); err != nil {\n\t\t\treturn nil, err\n\t\t}\n\t\titems = append(items, i)\n\t}\n\tif err := rows.Close(); err != nil {\n\t\treturn nil, err\n\t}\n\tif err := rows.Err(); err != nil {\n\t\treturn nil, err\n\t}\n\treturn items, nil\n}"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`$1, $2, $3` (Placeholder)**: เป็นการส่งตัวแปรเข้าไปในคำสั่ง SQL แบบ Parameterized Query ซึ่ง PostgreSQL จะแยกตัวคำสั่งออกจากข้อมูล ทำให้ปลอดภัยจากการโจมตีแบบ **SQL Injection 100%** (ห้ามต่อ String แบบ `fmt.Sprintf` เด็ดขาด!)",
            "**`RETURNING id, owner, ...`**: เป็นคำสั่งพิเศษของ PostgreSQL ที่ช่วยให้เราดึงข้อมูลแถวที่เพิ่งถูก `INSERT` หรือ `UPDATE` กลับมาได้ทันทีในรอบเดียว โดยไม่ต้องยิงคำสั่ง `SELECT` ซ้ำอีกรอบ",
            "**`q.db.QueryRowContext(ctx, ...)`**: ยิงคำสั่ง SQL ที่คาดหวังผลลัพธ์กลับมาเพียงแถวเดียว พร้อมส่ง Context เพื่อให้ยกเลิกการทำงานได้หากเกิด Timeout",
            "**`AddAccountBalance`**: ใช้ `balance = balance + $1` เพื่อให้ PostgreSQL ทำการคำนวณและอัปเดตเงินในระดับ Database Atomic ทันที",
            "**`DeleteAccount`**: ใช้ `q.db.ExecContext` ยิงคำสั่ง `DELETE` โดยไม่ต้องดึงข้อมูลแถวกลับมา เหมาะสำหรับงานลบข้อมูล",
            "**`ListAccounts`**: ใช้ `q.db.QueryContext` ค้นหาข้อมูลแบบแบ่งหน้า (Pagination) ด้วย `LIMIT` และ `OFFSET` พร้อมใช้ `rows.Next()` วนลูปอ่านข้อมูล"
          ]
        },
        {
          "t": "h2",
          "c": "6. การเขียนฟังก์ชัน CRUD สำหรับ Entries และ Transfers"
        },
        {
          "t": "p",
          "c": "นอกจากฟังก์ชันจัดการบัญชีใน `db/account.go` แล้ว ให้เราสร้างไฟล์ `db/entry.go` สำหรับบันทึกสมุดบัญชีแยกประเภท (`entries`) และไฟล์ `db/transfer.go` สำหรับบันทึกประวัติการโอนเงิน (`transfers`) เตรียมไว้ให้ครบทั้ง 3 ตารางตั้งแต่วันนี้ เพื่อที่ในบทที่ 4 เราจะได้นำฟังก์ชันทั้งหมดมาร้อยเรียงเป็นระบบโอนเงินได้ทันที:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/entry.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/entry.go\n// หน้าที่: ฟังก์ชันจัดการบันทึกข้อมูลสมุดบัญชีแยกประเภท (Ledger) ในตาราง entries\n// แก้ปัญหา: บันทึกหลักฐานเงินเข้า-ออกของแต่ละบัญชีอย่างละเอียดทุกครั้งที่มีธุรกรรม\n// =============================================================================\npackage db\n\nimport \"context\"\n\ntype CreateEntryParams struct {\n\tAccountID int64 `json:\"account_id\"` // รหัสบัญชีที่เป็นเจ้าของ Entry\n\tAmount    int64 `json:\"amount\"`     // ยอดเงิน: บวก = เงินเข้า, ลบ = เงินออก\n}\n\nconst createEntry = `-- name: CreateEntry :one\nINSERT INTO entries (\n  account_id,\n  amount\n) VALUES (\n  $1, $2\n)\nRETURNING id, account_id, amount, created_at;\n`\n\n// CreateEntry สร้างบันทึก Entry เงินเข้าหรือเงินออกลงในตาราง entries\nfunc (q *Queries) CreateEntry(ctx context.Context, arg CreateEntryParams) (Entry, error) {\n\t// 1. ส่งคำสั่ง INSERT ข้อมูล Entry ลงตาราง\n\trow := q.db.QueryRowContext(ctx, createEntry, arg.AccountID, arg.Amount)\n\n\t// 2. แกะผลลัพธ์ใส่ตัวแปร Entry\n\tvar i Entry\n\terr := row.Scan(\n\t\t&i.ID,\n\t\t&i.AccountID,\n\t\t&i.Amount,\n\t\t&i.CreatedAt,\n\t)\n\treturn i, err\n}"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/transfer.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/transfer.go\n// หน้าที่: ฟังก์ชันจัดการบันทึกข้อมูลธุรกรรมการโอนเงินในตาราง transfers\n// แก้ปัญหา: บันทึกประวัติการโอนเงินระหว่าง 2 บัญชี พร้อมสร้าง Transfer ID สำหรับใช้เป็นเลขอ้างอิง\n// =============================================================================\npackage db\n\nimport \"context\"\n\ntype CreateTransferParams struct {\n\tFromAccountID int64 `json:\"from_account_id\"` // บัญชีผู้โอน (ต้นทาง)\n\tToAccountID   int64 `json:\"to_account_id\"`   // บัญชีผู้รับ (ปลายทาง)\n\tAmount        int64 `json:\"amount\"`          // จำนวนเงินที่โอน (ต้องเป็นค่าบวกเสมอ)\n}\n\nconst createTransfer = `-- name: CreateTransfer :one\nINSERT INTO transfers (\n  from_account_id,\n  to_account_id,\n  amount\n) VALUES (\n  $1, $2, $3\n)\nRETURNING id, from_account_id, to_account_id, amount, created_at;\n`\n\n// CreateTransfer สร้างบันทึกประวัติการโอนเงินลงในตาราง transfers\nfunc (q *Queries) CreateTransfer(ctx context.Context, arg CreateTransferParams) (Transfer, error) {\n\t// 1. ส่งคำสั่ง INSERT บันทึกธุรกรรมการโอนเงิน\n\trow := q.db.QueryRowContext(ctx, createTransfer, arg.FromAccountID, arg.ToAccountID, arg.Amount)\n\n\t// 2. แกะผลลัพธ์ใส่ตัวแปร Transfer\n\tvar i Transfer\n\terr := row.Scan(\n\t\t&i.ID,\n\t\t&i.FromAccountID,\n\t\t&i.ToAccountID,\n\t\t&i.Amount,\n\t\t&i.CreatedAt,\n\t)\n\treturn i, err\n}"
        },
        {
          "t": "h2",
          "c": "7. ทดสอบเชื่อมต่อและรัน CRUD จริงครั้งแรกด้วย `main.go`"
        },
        {
          "t": "p",
          "c": "สำหรับคนที่เพิ่งเริ่มเขียน Go ครั้งแรก การเขียนโค้ด Data Layer มาหลายไฟล์ย่อมอยากเห็นผลลัพธ์ว่าโค้ดที่เขียนเชื่อมต่อกับ PostgreSQL ใน Docker และยิงคำสั่งได้จริงหรือไม่! เราจะสร้างไฟล์ `main.go` แผ่นแรกไว้ที่ Root Directory (`simplebank/main.go`) เพื่อทดสอบรันดูผลลัพธ์จริงทันที:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/main.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/main.go\n// หน้าที่: ทดสอบเชื่อมต่อ PostgreSQL และยิงคำสั่ง CreateAccount + GetAccount ครั้งแรก\n// แก้ปัญหา: ให้ผู้เรียนเห็นการทำงานจริงของโค้ด Go ที่เพิ่งเขียน ก่อนจะไปต่อในบทที่ซับซ้อนขึ้น\n// =============================================================================\npackage main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"log\"\n\t\"time\"\n\n\t\"simplebank/db\"\n)\n\nconst (\n\tdbSource = \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\"\n)\n\nfunc main() {\n\t// 1. เชื่อมต่อฐานข้อมูลผ่าน NewDB ที่เราเขียนไว้ใน db/db.go\n\tconn, err := db.NewDB(dbSource)\n\tif err != nil {\n\t\tlog.Fatal(\"❌ ไม่สามารถเชื่อมต่อฐานข้อมูลได้:\", err)\n\t}\n\tdefer conn.Close()\n\n\tfmt.Println(\">> 1. เชื่อมต่อ PostgreSQL สำเร็จ (Connection Pool พร้อมใช้งาน)!\")\n\n\t// 2. สร้างตัวแปร Queries สำหรับเรียกใช้ฟังก์ชัน CRUD\n\tqueries := db.New(conn)\n\n\t// 3. กำหนด Context พร้อม Timeout 5 วินาทีเพื่อความปลอดภัย\n\tctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)\n\tdefer cancel()\n\n\t// 4. ทดลองสร้างบัญชีแรกของ Alice\n\targ := db.CreateAccountParams{\n\t\tOwner:    \"alice\",\n\t\tBalance:  1000, // เก็บ 1,000 หน่วยย่อย (เช่น 1,000 USD)\n\t\tCurrency: \"USD\",\n\t}\n\n\taccount, err := queries.CreateAccount(ctx, arg)\n\tif err != nil {\n\t\tlog.Fatal(\"❌ สร้างบัญชีล้มเหลว:\", err)\n\t}\n\n\tfmt.Println(\">> 2. สร้างบัญชีแรกของ Alice สำเร็จในตาราง accounts!\")\n\tfmt.Printf(\"      ID: %d | Owner: %s | Balance: %d %s\n\n\",\n\t\taccount.ID, account.Owner, account.Balance, account.Currency)\n\n\t// 5. ทดลองดึงข้อมูลบัญชีเดิมกลับมาตรวจสอบ (GetAccount)\n\tfetchedAccount, err := queries.GetAccount(ctx, account.ID)\n\tif err != nil {\n\t\tlog.Fatal(\"❌ ค้นหาบัญชีล้มเหลว:\", err)\n\t}\n\n\tfmt.Println(\">> 3. ดึงข้อมูลบัญชีเดิมกลับมาตรวจสอบ (GetAccount):\")\n\tfmt.Printf(\"      ยืนยันยอดเงินคงเหลือถูกต้อง: %d %s (ตรงกับที่บันทึกไว้ 100%%)\n\",\n\t\tfetchedAccount.Balance, fetchedAccount.Currency)\n}"
        },
        {
          "t": "p",
          "c": "เปิด Terminal ที่โฟลเดอร์ `simplebank` แล้วสั่งรันด้วยคำสั่ง `go run main.go`:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "คำสั่งรัน go run main.go และผลลัพธ์ใน Terminal",
          "code": "go run main.go",
          "out": ">> 1. เชื่อมต่อ PostgreSQL สำเร็จ (Connection Pool พร้อมใช้งาน)!\n>> 2. สร้างบัญชีแรกของ Alice สำเร็จในตาราง accounts!\n      ID: 1 | Owner: alice | Balance: 1000 USD\n\n>> 3. ดึงข้อมูลบัญชีเดิมกลับมาตรวจสอบ (GetAccount):\n      ยืนยันยอดเงินคงเหลือถูกต้อง: 1000 USD (ตรงกับที่บันทึกไว้ 100%)"
        },
        {
          "t": "p",
          "c": "ลองเข้าไปส่องดูข้อมูลจริงใน PostgreSQL Container ด้วยคำสั่ง `psql`:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ตรวจสอบแถวข้อมูลจริงใน PostgreSQL ผ่าน docker exec",
          "code": "docker exec -it postgres16 psql -U root -d simple_bank -c \"SELECT * FROM accounts;\"",
          "out": " id | owner | balance | currency |          created_at           \n----+-------+---------+----------+-------------------------------\n  1 | alice |    1000 | USD      | 2026-10-06 12:00:00.123456+00\n(1 row)"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• คุณได้สร้าง Data Access Layer ครบทั้ง 5 ไฟล์ (`db.go`, `models.go`, `account.go`, `entry.go`, `transfer.go`) ด้วย Parameterized Raw SQL ที่ปลอดภัยจาก SQL Injection และทดสอบรันผ่าน `main.go` สำเร็จแล้ว\n• **ก้าวต่อไป (บทที่ 3.2)**: เราจะเปลี่ยนจากการรันเช็กด้วยมือใน `main.go` มาเป็นการเขียน **Automated Unit Tests** ด้วย `testify/require` เพื่อพิสูจน์ว่าทุกฟังก์ชัน CRUD ทำงานถูกต้อง 100%"
        }
      ],
      "en": []
    }
  },
  "bank-acid-and-tx": {
    "slug": "bank-acid-and-tx",
    "title": {
      "th": "4.1 กลไก ACID & การสร้าง Transaction Manager (execTx)",
      "en": "4.1 ACID Properties & Transaction Manager in Go"
    },
    "lead": {
      "th": "ถอดรหัสคุณสมบัติ ACID ทั้ง 4 ประการ และสร้าง Database Transaction Manager ในภาษา Go พร้อมระบบ Auto Rollback ที่ปลอดภัยเมื่อเกิดข้อผิดพลาด",
      "en": "Deconstructing the 4 ACID guarantees and building a bulletproof Go Transaction Manager with automatic rollback."
    },
    "group": "4. มัดรวมธุรกรรมโอนเงินด้วย ACID Transaction",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: เขียนคำสั่ง SQL CRUD รายตารางเสร็จสมบูรณ์ และพิสูจน์ด้วย Unit Test ผ่านครบทุกฟังก์ชันแล้ว\n• **ภารกิจในบทนี้**: สร้างไฟล์ `simplebank/db/store.go` เพื่อทำหน้าที่เป็น Transaction Engine กลางที่มัดรวมหลายคำสั่ง SQL ให้ทำงานแบบ 'สำเร็จทั้งหมด หรือ ยกเลิกทั้งหมด (All or Nothing)'\n• **ไวยากรณ์ Go ที่จะได้ใช้จริง**: Struct Embedding (`type Store struct { *Queries }`) และ Higher-Order Callback Function (`fn func(*Queries) error`)"
        },
        {
          "t": "p",
          "c": "ในระบบธนาคาร ไม่มีคำว่า 'สำเร็จครึ่งเดียว' ถ้าคุณโอนเงิน 500 บาท การหักเงินจากบัญชีคุณ และการเพิ่มเงินในบัญชีเพื่อน **จะต้องเกิดขึ้นพร้อมกันอย่างสมบูรณ์ หรือไม่เกิดขึ้นเลยทั้งคู่** นี่คือที่มาของมาตรฐาน **ACID** ในระบบฐานข้อมูล"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go & Best Practices ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "กลไก Go ใน store.go",
            "โค้ดที่ปรากฏ",
            "แกะความหมายให้เข้าใจง่าย"
          ],
          "rows": [
            [
              "1. Struct Embedding",
              "`type Store struct { *Queries; db *sql.DB }`",
              "ฝัง `*Queries` ไว้ใน `Store` โดยไม่ตั้งชื่อฟิลด์ ทำให้ `store` เรียกเมธอด CRUD เดิมทั้งหมด (เช่น `store.GetAccount()`) ได้ทันที พร้อมทั้งถือ `db *sql.DB` ไว้สั่งเปิด Transaction"
            ],
            [
              "2. Callback Function (fn)",
              "`func (store *Store) execTx(ctx context.Context, fn func(*Queries) error) error`",
              "`execTx` รับฟังก์ชัน `fn` เข้ามารันตรงกลาง: เริ่มจากเปิด `tx`, สร้าง `q := New(tx)` ส่งให้ `fn(q)` ทำงาน, ถ้า `fn(q)` คืน error จะสั่ง `tx.Rollback()` ทันที แต่ถ้าผ่านจะสั่ง `tx.Commit()`"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. เจาะลึก 4 คุณสมบัติของ ACID ในโลกการเงินจริง"
        },
        {
          "t": "table",
          "head": [
            "คุณสมบัติ",
            "ชื่อเต็ม",
            "ความหมายและการประยุกต์ใช้ในระบบธนาคาร"
          ],
          "rows": [
            [
              "A",
              "Atomicity (ความเป็นหนึ่งเดียว)",
              "การทำงานทุกคำสั่งย่อยใน Transaction ถือเป็นเนื้อเดียวกัน ('All or Nothing') หากคำสั่งใดคำสั่งหนึ่งพัง ระบบจะยกเลิกการกระทำทั้งหมดกลับสู่จุดเริ่มต้นทันที (Rollback)"
            ],
            [
              "C",
              "Consistency (ความถูกต้องเสมอต้นเสมอปลาย)",
              "ข้อมูลในฐานข้อมูลต้องสอดคล้องกับกฎเกณฑ์ของระบบตลอดเวลา เช่น ผลรวมเงินทั้งหมดในระบบต้องเท่าเดิมเสมอ (เงินไม่ได้เสกขึ้นมาและไม่ได้หายไปไหน) และยอดเงินต้องไม่ติดลบตาม Foreign Key และ Check Constraints"
            ],
            [
              "I",
              "Isolation (การแยกส่วนโดดเดี่ยว)",
              "เมื่อมีผู้ใช้โอนเงินพร้อมกันหลายคน คำสั่งของแต่ละคนจะต้องไม่เห็นข้อมูลครึ่งๆ กลางๆ ของกันและกัน เสมือนว่าคำสั่งถูกรันเรียงแถวทีละคน"
            ],
            [
              "D",
              "Durability (ความคงทนถาวร)",
              "เมื่อระบบตอบว่า 'โอนเงินสำเร็จ' (Commit) ข้อมูลนั้นจะต้องถูกบันทึกลงใน Hard Disk อย่างถาวร แม้ไฟจะดับหรือเซิร์ฟเวอร์จะระเบิดหลังจากนั้น เสี้ยววินาทีถัดมารีสตาร์ตเครื่องใหม่ ข้อมูลเงินก็ต้องไม่สูญหาย"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "3. การออกแบบ Store Struct & Transaction Manager ใน Go"
        },
        {
          "t": "p",
          "c": "โจทย์สำคัญของบทนี้คือ: **หากขั้นตอนการหักเงินต้นทางสำเร็จแล้ว แต่ขั้นตอนการเพิ่มเงินให้เพื่อนเกิดพังกลางคัน เราจะสั่งยกเลิก (Rollback) เงินที่หักไปแล้วให้กลับมาเหมือนเดิมอัตโนมัติได้อย่างไร?** แทนที่จะเขียนโค้ดเปิดและปิด Transaction ซ้ำๆ ในทุกฟังก์ชัน เราจะสร้างฟังก์ชันแม่แบบกลางชื่อ **`execTx`** ที่รับฟังก์ชันงานย่อย (`fn func(*Queries) error`) เข้ามารันตรงกลาง หากงานย่อยคืนค่า `err` ออกมา `execTx` จะสั่ง `Rollback()` คืนค่าให้ทันที!"
        },
        {
          "t": "p",
          "c": "ในการออกแบบโครงสร้าง เราจะสร้าง `Store` Struct ในไฟล์ `simplebank/db/store.go` โดยใช้เทคนิค **Struct Embedding** ฝัง `*Queries` เข้าไปข้างใน (ทำให้ `Store` เรียกใช้เมธอด CRUD เดิมทั้งหมดได้ทันที) พร้อมทั้งถือตัวแปร `db *sql.DB` ไว้สำหรับสั่งเปิด Transaction (`BeginTx`), ยืนยันผล (`Commit`), และยกเลิกเมื่อเกิดปัญหา (`Rollback`):"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/store.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/store.go\n// หน้าที่: Store ฝัง *Queries ไว้ข้างใน เมธอด SQL เดิมจึงเรียกผ่าน store ได้\n// แก้ปัญหา: แล้วเพิ่มการเปิด Transaction เพื่อคุม BEGIN, COMMIT, และ ROLLBACK\n// =============================================================================\npackage db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"fmt\"\n)\n\n// Store ครอบคลุมทั้งฟังก์ชันการคิวรีรายตัว และการทำงานร่วมกันเป็น Transaction\n// สร้าง Store struct มาให้มัดรวมตัวแปรเชื่อมฐานข้อมูล db กับคำสั่งคิวรี (Queries) เป็นก้อนเดียวกัน\ntype Store struct {\n\t*Queries\n\tdb *sql.DB\n}\n\nfunc NewStore(db *sql.DB) *Store {\n\treturn &Store{\n\t\tdb:      db,\n\t\tQueries: New(db),\n\t}\n}\n\n// execTx เป็นฟังก์ชันภายในที่ควบคุมรอบชีวิต (Cycle) ของ Transaction อย่างปลอดภัย\n// สร้าง execTx มาทำหน้าที่เป็น Template ในการรัน Transaction โดยที่เราไม่ต้องมานั่งเขียนคำสั่ง\n// db.BeginTx, tx.Rollback, tx.Commit ซ้ำๆ ทุกครั้งเวลาจะทำระบบอะไรก็ตาม\nfunc (store *Store) execTx(ctx context.Context, fn func(*Queries) error) error {\n\t// 1. สั่งให้ฐานข้อมูลเปิด Transaction (เริ่มกระบวนการคุมข้อมูลแบบ ACID)\n\ttx, err := store.db.BeginTx(ctx, nil)\n\tif err != nil {\n\t\treturn err\n\t}\n\n\t// 2. สร้างตัว Query ชุดใหม่ q โดยให้ทำงานอยู่ภายใต้ Transaction (tx) ที่เพิ่งเปิดไปด้านบน\n\tq := New(tx)\n\n\t// 3. รันฟังก์ชันคำสั่งที่เราส่งเข้ามา (เช่น Withdraw, Transfers) โดยส่งตัว Query (q) ให้มันไปใช้รันต่อ\n\terr = fn(q)\n\n\t// 4. เช็กว่าฟังก์ชันที่รันไปมี Error หรือไม่\n\tif err != nil {\n\t\t// ถ้ามี Error ให้ Rollback ทันที เพื่อยกเลิกทุกอย่างที่ทำไปใน Transaction\n\t\tif rbErr := tx.Rollback(); rbErr != nil {\n\t\t\treturn fmt.Errorf(\"tx err: %v, rollback err: %v\", err, rbErr)\n\t\t}\n\t\treturn err // ส่ง Error ออกไปบอกตัวเรียกใช้งาน\n\t}\n\n\t// 5. ถ้าไม่มี Error เลย แปลว่าผ่าน ให้สั่ง Commit เพื่อบันทึกข้อมูลลงไปถาวร\n\treturn tx.Commit()\n}"
        },
        {
          "t": "ul",
          "c": [
            "**`type Store struct { *Queries }`**: ฟิลด์ที่ไม่มีชื่อ คือการฝัง `Queries` ไว้ใน `Store` เมธอดของ `Queries` เลยถูกยกขึ้นมาให้เรียกเป็น `store.CreateAccount(...)` ได้ Store ไม่ได้กลายเป็น Queries",
            "**`Queries: New(db)`**: ตอนสร้าง ต้องยัดก้อน Queries เข้าช่องที่ฝังไว้ ชื่อช่องคือชื่อชนิด `Queries`",
            "**`func (store *Store) execTx`**: เมธอดของ Store เอง ตัว `store` เป็น pointer จึงแก้ของก้อนเดิมได้ ลายเซ็น `fn func(*Queries) error` แปลว่าคนเรียกต้องส่งฟังก์ชันที่รับ `*Queries` แล้วคืน `error` เข้ามา",
            "**`tx, err :=` แล้ว `if err != nil { return err }`**: รับสองค่า ถ้าเปิด transaction ไม่ได้ ก็ส่ง error กลับทันที ไม่ทำขั้นต่อไป",
            "**`if rbErr := tx.Rollback(); rbErr != nil`**: ชื่อ `rbErr` ไม่ใช่ `err` เพราะ `err` ตัวนอกยังต้องใช้อยู่ รูปแบบนี้คือ `if err :=` จากบทพื้นฐาน แค่ตั้งชื่อใหม่เพื่อไม่ทับตัวแปรเดิม"
          ]
        },
        {
          "t": "h3",
          "c": "ทำไม Callback Pattern นี้ถึงยอดเยี่ยม?"
        },
        {
          "t": "ul",
          "c": [
            "**ไร้ความผิดพลาดจากการลืม Rollback**: หากเขียน `tx.Begin()` และจัดการ Rollback แบบกระจายในทุกจุดของโค้ด โปรแกรมเมอร์มีโอกาสสูงมากที่จะลืมใส่ Rollback ในบางกิ่งเงื่อนไข แต่ฟังก์ชัน `execTx` จะรับผิดชอบการ Rollback ในที่เดียวเสมอ",
            "**แยกหน้าที่ชัดเจน (Separation of Concerns)**: โค้ด Business Logic มีหน้าที่แค่เขียนคำสั่งว่าต้องการทำอะไรบ้าง ถ้ามีปัญหาก็แค่ `return err` ออกมา แล้ว `execTx` จะเก็บกวาดให้เรียบร้อย",
            "**ความปลอดภัยสูง**: คำสั่งทั้งหมดใน `fn(q)` จะทำงานบน `*sql.Tx` เดียวกัน ทำให้ได้รับคุณสมบัติ Atomicity ครบถ้วน"
          ]
        },
        {
          "t": "callout",
          "title": "🛡️ กลไก Auto Rollback ทำงานอย่างไร?",
          "c": "เมื่อมีขั้นตอนใดก็ตามภายใน `fn(q)` ส่งคืน `err != nil` (เช่น บัญชีปลายทางไม่มีอยู่จริง หรือยอดเงินไม่พอ) ฟังก์ชัน `execTx` จะกระโดดเข้าบล็อก `tx.Rollback()` ทันที ทำให้ทุกคำสั่ง SQL ที่รันไปก่อนหน้านั้นถูกยกเลิกทั้งหมด ข้อมูลเงินในฐานข้อมูลจึงกลับคืนสู่สภาพเดิม 100% เสมือนว่าไม่เคยมีธุรกรรมนี้เกิดขึ้น ปลอดภัยตามหลักการ Atomicity"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• คุณได้สร้าง Transaction Engine (`Store` และ `execTx`) ที่รับประกันคุณสมบัติ Atomicity (สำเร็จทั้งหมดหรือยกเลิกทั้งหมด) เรียบร้อยแล้ว\n• **ก้าวต่อไป (บทที่ 4.2)**: เราจะนำ `store.execTx` ไปใช้เขียนฟังก์ชันหัวใจหลักของธนาคาร คือ **`TransferTx` (การโอนเงิน 5 ขั้นตอน)** ในไฟล์ `simplebank/db/tx_transfer.go` กันครับ!"
        }
      ],
      "en": []
    }
  },
  "bank-money-transfer-logic": {
    "slug": "bank-money-transfer-logic",
    "title": {
      "th": "4.2 โค้ดระบบโอนเงิน 5 ขั้นตอน (TransferTx)",
      "en": "4.2 Money Transfer Logic — 5-Step Atomic Transaction"
    },
    "lead": {
      "th": "ลงมือเขียนฟังก์ชัน TransferTx ที่ร้อยเรียง 5 ขั้นตอนของการโอนเงินจริงเข้าด้วยกันใน 1 Transaction พร้อมส่งคืนข้อมูลบัญชีใหม่ให้ผู้ใช้ทราบทันที",
      "en": "Implementing the 5-step atomic TransferTx method and returning updated balances in a single transaction."
    },
    "group": "4. มัดรวมธุรกรรมโอนเงินด้วย ACID Transaction",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: สร้าง Transaction Manager (`store.execTx`) ในไฟล์ `db/store.go` เรียบร้อยแล้ว\n• **ภารกิจในบทนี้**: สร้างไฟล์ `simplebank/db/tx_transfer.go` เพื่อเขียนฟังก์ชัน `TransferTx` ที่มัดรวม 5 ขั้นตอนของการโอนเงินไว้ใน Transaction เดียว\n• **ไวยากรณ์ Go ที่จะได้ใช้จริง**: การประกาศ Method ของ Struct ข้ามไฟล์ใน Package เดียวกัน และการส่ง Anonymous Closure เข้า `store.execTx`"
        },
        {
          "t": "p",
          "c": "มาถึงหัวใจหลักของระบบธนาคารแล้ว! การโอนเงินจากบัญชี A ไปยังบัญชี B ไม่ใช่แค่การเปลี่ยนตัวเลข แต่ต้องสร้างหลักฐานใน Ledger และบันทึกประวัติให้ครบถ้วน ซึ่งประกอบด้วย **5 ขั้นตอนที่ต้องสำเร็จพร้อมกัน** ดังนี้:"
        },
        {
          "t": "ol",
          "c": [
            "**สร้างแถวประวัติการโอนเงิน** ในตาราง `transfers` (บันทึกว่าจาก A ไป B จำนวนเท่าไหร่)",
            "**สร้าง Entry ฝั่งเงินออก** ในตาราง `entries` ของบัญชี A (amount ติดลบ เช่น -100)",
            "**สร้าง Entry ฝั่งเงินเข้า** ในตาราง `entries` ของบัญชี B (amount เป็นบวก เช่น +100)",
            "**หักเงินจากบัญชี A** ในตาราง `accounts` (balance ลดลง)",
            "**เพิ่มเงินเข้าบัญชี B** ในตาราง `accounts` (balance เพิ่มขึ้น)"
          ]
        },
        {
          "t": "p",
          "c": "เราจะนำทั้ง 5 ขั้นตอนนี้ไปเขียนรวมกันไว้ในเมธอด `TransferTx` แล้วส่งเข้าไปให้ `store.execTx` ดูแล หากขั้นตอนที่ 5 เกิดคืนค่า `error` ออกมา (เช่น บัญชีปลายทางไม่มีอยู่จริง) ทั้ง 4 ขั้นตอนก่อนหน้าจะถูกสั่ง `Rollback` ยกเลิกพร้อมกันทันที! และเนื่องจากทั้ง `store.go` และ `tx_transfer.go` อยู่ใน `package db` เดียวกัน เราจึงสามารถแยกเขียนเมธอด `func (store *Store) TransferTx(...)` ไว้ในไฟล์ `tx_transfer.go` ได้อย่างเป็นระเบียบ"
        },
        {
          "t": "callout",
          "title": "🏗️ ทำไมเราถึงแยกไฟล์ tx_transfer.go ออกจาก store.go?",
          "c": "ในภาษา Go และการออกแบบซอฟต์แวร์ระดับโปรดักชันที่ดี (Clean Architecture):\n- **`store.go`** ทำหน้าที่เป็น **Transaction Engine กลาง** มีหน้าที่เปิด-ปิด-Rollback ทรานแซกชันเท่านั้น ไม่ควรยัดเยียดโค้ด Business Logic เฉพาะทางเข้าไปจนกลายเป็น \"God File\" ที่ยาวนับพันบรรทัด\n- **`tx_transfer.go`** ทำหน้าที่รับผิดชอบ **Business Logic ของการโอนเงิน (Transfer Transaction Domain)** โดยเฉพาะ\n- **Go รองรับการประกาศ Method ของ Struct ข้ามไฟล์ใน Package เดียวกัน**:\n  ในภาษา Go เราสามารถเขียน `func (store *Store) TransferTx(...)` ไว้ในไฟล์ `tx_transfer.go` ได้อย่างสมบูรณ์แบบ ตราบใดที่ทั้งคู่อยู่ใน `package db`\n  ทำให้ในอนาคต หากเราต้องการเพิ่มระบบธุรกรรมใหม่อย่างการสร้างผู้ใช้พร้อมเปิดบัญชี (`tx_create_user.go`) เราก็แค่สร้างไฟล์ใหม่ขึ้นมา โดยไม่ต้องแตะต้องหรือเสี่ยงทำไฟล์ `store.go` พังเลยแม้แต่น้อย!"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go & Best Practices ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "กลไก Go ใน tx_transfer.go",
            "โค้ดที่ปรากฏ",
            "ทำไมถึงเขียนแบบนี้ได้?"
          ],
          "rows": [
            [
              "1. แยก Method ข้ามไฟล์ใน Package เดียวกัน",
              "`func (store *Store) TransferTx(...)` อยู่ในไฟล์ `tx_transfer.go`",
              "ใน Go ทุกไฟล์ที่อยู่ในโฟลเดอร์ `db/` และประกาศ `package db` จะเชื่อมถึงกันทั้งหมด เราจึงแยกเมธอด `TransferTx` ออกมาไว้ใน `tx_transfer.go` ได้โดยไม่ทำให้ `store.go` รก"
            ],
            [
              "2. Closure เข้าถึงตัวแปรด้านนอก",
              "`var result TransferTxResult`\n`err := store.execTx(ctx, func(q *Queries) error { result.Transfer, err = ... })`",
              "ฟังก์ชันไร้ชื่อที่ส่งเข้าไปใน `execTx` สามารถเข้าถึงและบันทึกค่าลงในตัวแปร `result` และอ่านค่าจาก `arg` ที่อยู่นอกตัวเองได้โดยตรง (เรียกว่า Closure)"
            ],
            [
              "3. เรียกผ่าน q ไม่ใช่ store",
              "`q.CreateTransfer(...)`, `q.AddAccountBalance(...)`",
              "ภายใน `execTx` ต้องเรียกคำสั่ง SQL ผ่านตัวแปร `q` เท่านั้น เพราะ `q` ผูกอยู่กับ `*sql.Tx` (หากเผลอเรียก `store.CreateTransfer` คำสั่งนั้นจะหลุดออกไปรันนอก Transaction ทันที!)"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. เขียน Struct สำหรับ Request และ Result ใน tx_transfer.go"
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ใหม่ชื่อว่า `simplebank/db/tx_transfer.go` เพื่อเก็บข้อมูลพารามิเตอร์ขาเข้าและผลลัพธ์ของการโอนเงิน:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/tx_transfer.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/tx_transfer.go\n// หน้าที่: นิยาม Struct สำหรับพารามิเตอร์ขาเข้า (Input) และผลลัพธ์ขาออก (Output) ของธุรกรรมการโอนเงิน\n// แก้ปัญหา: มัดรวมข้อมูลที่เกี่ยวข้องกับการโอนเงินเป็นก้อนเดียว เพื่อให้ส่งผ่านและตรวจสอบข้อมูลได้ง่ายและปลอดภัย\n// =============================================================================\npackage db\n\n// TransferTxParams คือข้อมูลที่ต้องใช้ในการสั่งโอนเงินระหว่าง 2 บัญชี\ntype TransferTxParams struct {\n\tFromAccountID int64 `json:\"from_account_id\"` // รหัสบัญชีผู้โอน (ต้นทาง)\n\tToAccountID   int64 `json:\"to_account_id\"`   // รหัสบัญชีผู้รับ (ปลายทาง)\n\tAmount        int64 `json:\"amount\"`          // จำนวนเงินที่ต้องการโอน (หน่วยย่อยที่สุด: สตางค์/เซนต์)\n}\n\n// TransferTxResult คือผลลัพธ์ที่ได้หลังจากโอนเงินสำเร็จ เพื่อส่งกลับให้หน้าบ้านแสดงผล\ntype TransferTxResult struct {\n\tTransfer    Transfer `json:\"transfer\"`     // ข้อมูลบันทึกประวัติการโอนเงิน (มี Transfer ID ไว้อ้างอิง)\n\tFromAccount Account  `json:\"from_account\"` // บัญชีต้นทางพร้อมยอดเงินคงเหลือใหม่ล่าสุด (หลังหักเงิน)\n\tToAccount   Account  `json:\"to_account\"`   // บัญชีปลายทางพร้อมยอดเงินคงเหลือใหม่ล่าสุด (หลังรับเงิน)\n\tFromEntry   Entry    `json:\"from_entry\"`   // หลักฐาน Ledger เงินออกจากบัญชีต้นทาง (ยอดลบ)\n\tToEntry     Entry    `json:\"to_entry\"`     // หลักฐาน Ledger เงินเข้าบัญชีปลายทาง (ยอดบวก)\n}"
        },
        {
          "t": "h2",
          "c": "3. ทบทวน Structs ของ Queries ที่เรียกใช้ใน TransferTx (ระวัง Data Type: int64)"
        },
        {
          "t": "p",
          "c": "ภายในฟังก์ชัน `TransferTx` เราจะเรียกใช้งานคำสั่ง Queries ที่เตรียมไว้จากบทก่อนหน้า ได้แก่ `CreateTransfer`, `CreateEntry` และ `AddAccountBalance` ซึ่งรับ Struct Parameters ดังนี้:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account.go & db/entry.go & db/transfer.go",
          "c": "// ตรวจสอบ Data Type ของพารามิเตอร์ทั้งหมดใน Data Access Layer\n// จุดสำคัญมาก: ทุกฟิลด์ที่เกี่ยวกับยอดเงิน (Amount) และรหัส (ID) ต้องเป็น int64 ให้ตรงกับคอลัมน์ BIGINT ในฐานข้อมูล\n// ห้ามประกาศ Amount เป็น int ธรรมดาเด็ดขาด เพราะ arg.Amount เป็น int64\n\n// 1. จาก db/transfer.go\ntype CreateTransferParams struct {\n\tFromAccountID int64 `json:\"from_account_id\"`\n\tToAccountID   int64 `json:\"to_account_id\"`\n\tAmount        int64 `json:\"amount\"` // int64: ยอดเงินโอน (ค่าบวกเสมอ)\n}\n\n// 2. จาก db/entry.go\ntype CreateEntryParams struct {\n\tAccountID int64 `json:\"account_id\"`\n\tAmount    int64 `json:\"amount\"` // int64: บวก = เงินเข้า, ลบ = เงินออก (-arg.Amount)\n}\n\n// 3. จาก db/account.go\ntype AddAccountBalanceParams struct {\n\tID     int64 `json:\"id\"`\n\tAmount int64 `json:\"amount\"` // int64: บวก = ฝากเงิน, ลบ = ตัดเงิน (-arg.Amount)\n}"
        },
        {
          "t": "callout",
          "title": "⚠️ จุดผิดพลาดยอดฮิต: Type Mismatch (int vs int64)",
          "c": "ในภาษา Go ชนิดข้อมูล `int` กับ `int64` เป็นคนละ Type กันอย่างสิ้นเชิง (แม้จะรันบน OS 64-bit ก็ตาม) เนื่องจาก `TransferTxParams.Amount` ถูกกำหนดเป็น `int64` เพื่อรองรับ `BIGINT` ใน PostgreSQL\n\nหากใน `AddAccountBalanceParams` หรือ `CreateEntryParams` คุณเผลอประกาศ `Amount int` ตอนส่ง `-arg.Amount` หรือ `arg.Amount` เข้าไป Go จะแจ้งเตือน Type Mismatch ทันที:\n`cannot use -arg.Amount (variable of type int64) as int value in struct literal`\nดังนั้นจงตรวจสอบให้มั่นใจว่าฟิลด์ Amount ทุกตัวในโปรเจกต์ของคุณเป็น **`int64`** เสมอ!",
          "warn": true
        },
        {
          "t": "h2",
          "c": "4. โค้ดของฟังก์ชัน `TransferTx` (Version 1: โครงสร้างพื้นฐาน)"
        },
        {
          "t": "p",
          "c": "เขียนฟังก์ชัน `TransferTx` ต่อท้ายลงในไฟล์ `simplebank/db/tx_transfer.go` โดยสังเกตการเรียกใช้ `store.execTx` เพื่อรวม 5 ขั้นตอนของการโอนเงินเข้าด้วยกันใน 1 Transaction:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/tx_transfer.go",
          "c": "// TransferTx รวม 5 ขั้นตอนของการโอนเงินจริงเข้าด้วยกันใน 1 Transaction\n// ทำเพื่อแก้ปัญหา: ป้องกันเงินสูญหายระหว่างทาง (Partial Failure) หากตัดเงินต้นทางได้แต่ปลายทางล้มเหลว\n// ทุกขั้นตอนจะถูกครอบด้วย execTx หากขั้นตอนใดมี Error ระบบจะ Rollback คืนค่าเดิมทันที\n\n// TransferTx รันการโอนเงินจากบัญชีหนึ่งไปยังอีกบัญชีหนึ่งใน 1 Transaction อย่างปลอดภัย\nfunc (store *Store) TransferTx(ctx context.Context, arg TransferTxParams) (TransferTxResult, error) {\n\tvar result TransferTxResult\n\n\t// เรียกใช้ execTx จาก Store เพื่อเปิด Transaction และครอบทุกขั้นตอนไว้ด้วยกัน\n\terr := store.execTx(ctx, func(q *Queries) error {\n\t\tvar err error\n\n\t\t// 1. สร้างแถวในตาราง transfers เพื่อบันทึกหลักฐานประวัติการโอนเงิน\n\t\tresult.Transfer, err = q.CreateTransfer(ctx, CreateTransferParams{\n\t\t\tFromAccountID: arg.FromAccountID,\n\t\t\tToAccountID:   arg.ToAccountID,\n\t\t\tAmount:        arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 2. สร้าง Entry เงินออกของบัญชีต้นทาง (ยอดเงินติดลบใน Ledger)\n\t\tresult.FromEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.FromAccountID,\n\t\t\tAmount:    -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 3. สร้าง Entry เงินเข้าของบัญชีปลายทาง (ยอดเงินเป็นบวกใน Ledger)\n\t\tresult.ToEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.ToAccountID,\n\t\t\tAmount:    arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 4. ตัดยอดเงินคงเหลือจากบัญชีต้นทาง (หักเงินออก)\n\t\tresult.FromAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\t\tID:     arg.FromAccountID,\n\t\t\tAmount: -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 5. เพิ่มยอดเงินคงเหลือให้บัญชีปลายทาง (โอนเงินเข้า)\n\t\tresult.ToAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\t\tID:     arg.ToAccountID,\n\t\t\tAmount: arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// ทุกขั้นตอนสำเร็จ ไม่มี Error ให้คืนค่า nil เพื่อสั่ง Commit\n\t\treturn nil\n\t})\n\n\treturn result, err\n}"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`store.execTx(...)`**: เรียกใช้งาน Transaction Engine จาก `store.go` เพื่อเปิด Transaction หากเกิด error ในขั้นตอนใดขั้นตอนหนึ่ง ระบบจะสั่ง Rollback คืนค่าข้อมูลทุกอย่างอัตโนมัติ",
            "**`CreateTransfer(...)`**: สร้างบันทึกประวัติการโอนเงินทันที ทำให้เราได้ `Transfer.ID` มาเป็นหลักฐานอ้างอิง",
            "**`-arg.Amount`**: สังเกตเครื่องหมายลบหน้า `arg.Amount` ในตอนสร้าง FromEntry และ AddAccountBalance บัญชี A เป็นการตัดเงินออกอย่างชัดเจน",
            "**`result.ToAccount`**: เราบันทึกสถานะล่าสุดของบัญชีที่อัปเดตแล้วลงในตัวแปร `result` เพื่อส่งกลับไปให้หน้าบ้านแสดงผลได้ทันทีว่า ยอดเงินคงเหลือใหม่เป็นเท่าใด"
          ]
        },
        {
          "t": "callout",
          "title": "📌 แผนวิวัฒนาการของโค้ด (Version 1 vs Version 2)",
          "c": "โค้ดในบทนี้คือ **Version 1 (แบบพื้นฐาน 5 ขั้นตอน)** ซึ่งทำงานได้สมบูรณ์ในการโอนเงินแบบปกติ แต่เมื่อมีธุรกรรมโอนเงินสวนทางพร้อมๆ กัน (A โอนหา B ขณะที่ B โอนหา A) โค้ดชุดนี้จะติด **Deadlock** ใน Database ทันที!\n\nดังนั้นในบทที่ 4 (Concurrency) เราจะนำโค้ดชุดนี้ไปจำลองบั๊ก Deadlock และทำการ **Diff แก้ไขเฉพาะขั้นตอนที่ 4 และ 5 เพื่ออัปเกรดเป็น Version 2 (Deadlock-Free)** โดยการจัดลำดับการขอล็อกตาม Account ID!"
        },
        {
          "t": "h3",
          "c": "📁 โค้ดเต็มของ simplebank/db/tx_transfer.go (Version 1: โครงสร้างพื้นฐานพร้อมใช้งาน)"
        },
        {
          "t": "p",
          "c": "เมื่อนำโค้ดทั้ง 2 ส่วนมารวมกัน ไฟล์ `simplebank/db/tx_transfer.go` ในบทนี้จะได้หน้าตาฉบับเต็มดังนี้ (สามารถใช้ตรวจเช็กความถูกต้อง เพื่อเตรียมนำไปทดสอบและอัปเกรดในบทถัดไป):"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/tx_transfer.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/tx_transfer.go\n// หน้าที่: โค้ดส่วนประกอบของ simplebank/db/tx_transfer.go\n// แก้ปัญหา: ออกแบบตามมาตรฐาน Clean Architecture สำหรับระบบธนาคาร\n// =============================================================================\npackage db\n\nimport \"context\"\n\n// TransferTxParams คือข้อมูลที่ต้องใช้ในการสั่งโอนเงินระหว่าง 2 บัญชี\ntype TransferTxParams struct {\n\tFromAccountID int64 `json:\"from_account_id\"`\n\tToAccountID   int64 `json:\"to_account_id\"`\n\tAmount        int64 `json:\"amount\"`\n}\n\n// TransferTxResult คือผลลัพธ์ที่ได้หลังจากโอนเงินสำเร็จ\ntype TransferTxResult struct {\n\tTransfer    Transfer `json:\"transfer\"`\n\tFromAccount Account  `json:\"from_account\"`\n\tToAccount   Account  `json:\"to_account\"`\n\tFromEntry   Entry    `json:\"from_entry\"`\n\tToEntry     Entry    `json:\"to_entry\"`\n}\n\n// TransferTx รวม 5 ขั้นตอนของการโอนเงินจริงเข้าด้วยกันใน 1 Transaction (Version 1)\nfunc (store *Store) TransferTx(ctx context.Context, arg TransferTxParams) (TransferTxResult, error) {\n\tvar result TransferTxResult\n\n\terr := store.execTx(ctx, func(q *Queries) error {\n\t\tvar err error\n\n\t\t// 1. สร้างแถวในตาราง transfers เพื่อบันทึกหลักฐานประวัติการโอนเงิน\n\t\tresult.Transfer, err = q.CreateTransfer(ctx, CreateTransferParams{\n\t\t\tFromAccountID: arg.FromAccountID,\n\t\t\tToAccountID:   arg.ToAccountID,\n\t\t\tAmount:        arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 2. สร้าง Entry เงินออกของบัญชีต้นทาง (ยอดเงินติดลบใน Ledger)\n\t\tresult.FromEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.FromAccountID,\n\t\t\tAmount:    -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 3. สร้าง Entry เงินเข้าของบัญชีปลายทาง (ยอดเงินเป็นบวกใน Ledger)\n\t\tresult.ToEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.ToAccountID,\n\t\t\tAmount:    arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 4. ตัดยอดเงินคงเหลือจากบัญชีต้นทาง (หักเงินออก)\n\t\tresult.FromAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\t\tID:     arg.FromAccountID,\n\t\t\tAmount: -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 5. เพิ่มยอดเงินคงเหลือให้บัญชีปลายทาง (โอนเงินเข้า)\n\t\tresult.ToAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\t\tID:     arg.ToAccountID,\n\t\t\tAmount: arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\treturn nil\n\t})\n\n\treturn result, err\n}"
        },
        {
          "t": "callout",
          "title": "🚨 สัญญาณเตือน: โค้ดนี้ดูสมบูรณ์แบบแล้ว... หรือยัง?",
          "c": "ถ้าเรารันโค้ดนี้ในสภาพแวดล้อมที่มีผู้ใช้คนเดียว ทุกอย่างจะทำงานได้ราบรื่น 100% แต่ถ้ามีผู้ใช้ 100 คน กดยิงโอนเงินพร้อมกันในเสี้ยววินาทีเดียวกัน ระบบนี้จะเกิดปัญหา 'Race Condition' และ 'Deadlock' ทันที! มาดูกันว่าทำไมในบทถัดไป",
          "warn": true
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• คุณได้เขียนฟังก์ชัน `TransferTx` (Version 1) ที่รวม 5 ขั้นตอนของการโอนเงินเข้าไว้ใน 1 ACID Transaction เรียบร้อยแล้ว\n• **ก้าวต่อไป (บทที่ 5.1 & 5.2)**: โค้ด Version 1 นี้ทำงานได้ดีเมื่อโอนทีละคน แต่ถ้ามีคนกดโอนพร้อมกัน หรือ **บัญชี 1 โอนให้ 2 พร้อมกับที่บัญชี 2 โอนสวนให้ 1** จะเกิดอะไรขึ้น? ไปเจาะลึก Row Locking และการแก้ Deadlock ในบทถัดไปกันครับ!"
        }
      ],
      "en": []
    }
  }
};
