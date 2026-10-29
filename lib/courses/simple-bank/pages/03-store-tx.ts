import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/03-store-tx.ts
// หน้าที่: บทที่ 3 และ 4 การเชื่อมต่อฐานข้อมูลด้วย database/sql, ACID Transaction และ TransferTx
// =============================================================================

export const storeTxPages: Record<string, Page> = {
  "bank-db-store-crud": {
    "slug": "bank-db-store-crud",
    "title": {
      "th": "3.1 Data Store & การเขียน Raw SQL CRUD ในภาษา Go",
      "en": "3.1 Data Store & Raw SQL CRUD in Go"
    },
    "lead": {
      "th": "เชื่อมต่อ PostgreSQL ด้วย database/sql, จัดการ Connection Pool, ออกแบบ DBTX Interface, และเขียน CRUD ด้วย Parameterized Raw SQL เพื่อป้องกัน SQL Injection 100%",
      "en": "Connecting to PostgreSQL with database/sql, managing connection pooling, designing the DBTX interface, and writing parameterized SQL CRUD."
    },
    "group": "3. เชื่อมต่อฐานข้อมูลด้วย Go & พิสูจน์ด้วย Unit Test",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: สร้างตาราง `accounts`, `entries`, และ `transfers` บน PostgreSQL ใน Docker สำเร็จแล้ว\n• **ภารกิจในบทนี้**: เขียนโค้ด Go ในโฟลเดอร์ `simplebank/db/` เพื่อเปิด Connection Pool (`db.go`), นิยาม Struct (`models.go`), และเขียนฟังก์ชัน CRUD ของทั้ง 3 ตาราง (`account.go`, `entry.go`, `transfer.go`)\n• **ไวยากรณ์ Go ที่จะได้ใช้จริง**: Blank Import (`_ \"github.com/lib/pq\"`), Interface (`DBTX`), Pointer Receiver (`func (q *Queries)`), Address-of (`&i.ID` ใน `row.Scan`), และ Slice (`[]Account`)"
        },
        {
          "t": "h2",
          "c": "1. แผนผังไฟล์ในโฟลเดอร์ simplebank/db/ ที่เราจะสร้าง"
        },
        {
          "t": "p",
          "c": "เพื่อให้โค้ดสะอาดและดูแลรักษาง่าย เราจะแยกไฟล์ในโฟลเดอร์ `simplebank/db/` ตามหน้าที่รับผิดชอบอย่างชัดเจน:"
        },
        {
          "t": "code",
          "lang": "text",
          "label": "โครงสร้างโฟลเดอร์ simplebank/db/",
          "c": "simplebank/\n├── db/\n│   ├── db.go          # เปิด Connection Pool, นิยาม DBTX Interface และ Queries Struct (สร้างในบทนี้)\n│   ├── models.go      # นิยาม Go Struct ของ Account, Entry, และ Transfer (สร้างในบทนี้)\n│   ├── account.go     # ฟังก์ชัน SQL CRUD ของตาราง accounts (สร้างในบทนี้)\n│   ├── entry.go       # ฟังก์ชัน SQL บันทึกสมุดบัญชีแยกประเภท entries (สร้างในบทนี้)\n│   ├── transfer.go    # ฟังก์ชัน SQL บันทึกประวัติการโอนเงิน transfers (สร้างในบทนี้)\n│   ├── store.go       # Transaction Manager กลาง (สร้างในบทที่ 4.1)\n│   └── tx_transfer.go # ธุรกรรมการโอนเงิน 5 ขั้นตอน (สร้างในบทที่ 4.2)\n└── go.mod"
        },
        {
          "t": "h2",
          "c": "2. แกะไวยากรณ์ Go ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "คำสั่งที่จะเจอในบทนี้",
            "ทำไมต้องเขียนแบบนี้?",
            "การทำงานเบื้องหลัง"
          ],
          "rows": [
            [
              "_ \"github.com/lib/pq\"",
              "ทำไมมี _ หน้า import?",
              "สั่งให้แพ็กเกจ `pq` ลงทะเบียนไดรเวอร์ชื่อ `\"postgres\"` เข้ากับ `database/sql` ตอนเริ่มโปรแกรม โดยที่เราไม่ต้องเรียกชื่อ `pq.` ในโค้ด"
            ],
            [
              "type DBTX interface",
              "ทำไมไม่ใช้ *sql.DB ตรงๆ ใน Queries?",
              "เพราะตอนทำ Transaction ในบทที่ 4 เราต้องส่ง `*sql.Tx` เข้ามาแทน การใช้ `DBTX` Interface ทำให้ `Queries` รับได้ทั้ง `*sql.DB` และ `*sql.Tx`"
            ],
            [
              "row.Scan(&i.ID, &i.Owner, ...)",
              "ทำไมต้องใส่เครื่องหมาย & หน้าฟิลด์ทุกตัว?",
              "ส่ง 'พิกัดตำแหน่งหน่วยความจำ' ของตัวแปร `i` เข้าไป เพื่อให้ฟังก์ชัน `Scan` เขียนข้อมูลจากฐานข้อมูลลงในตัวแปร `i` ของเราได้โดยตรง"
            ],
            [
              "defer rows.Close()",
              "ทำไมต้องสั่ง defer ปิด rows?",
              "เมื่อค้นหาข้อมูลหลายแถว (`QueryContext`) ต้องคืนท่อเชื่อมต่อกลับเข้า Connection Pool เสมอเมื่อจบฟังก์ชัน"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "3. สร้างไฟล์ db/db.go (Connection Pool & DBTX Interface)"
        },
        {
          "t": "p",
          "c": "ก่อนอื่นให้ติดตั้งไดรเวอร์ PostgreSQL (`github.com/lib/pq`) ลงในโปรเจกต์ แล้วสร้างไฟล์ `simplebank/db/db.go`:"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "ติดตั้งไดรเวอร์ PostgreSQL สำหรับ Go",
          "c": "go get github.com/lib/pq"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/db.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/db.go\n// หน้าที่: จัดการ Connection Pool ของ PostgreSQL และนิยาม DBTX Interface คู่กับ Queries\n// แก้ปัญหา: ให้โค้ด SQL ชุดเดียวกันรันได้ทั้งบน Connection ปกติ (*sql.DB) และใน Transaction (*sql.Tx)\n// =============================================================================\npackage db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"time\"\n\n\t_ \"github.com/lib/pq\" // โหลดไดรเวอร์ postgres ให้ลงทะเบียนกับ database/sql อัตโนมัติ\n)\n\n// NewDB เปิดสระรวมการเชื่อมต่อ (Connection Pool) และตรวจสอบว่าคุยกับ PostgreSQL ได้จริง\nfunc NewDB(dataSourceName string) (*sql.DB, error) {\n\t// ขั้นตอนที่ 1: ตรวจสอบรูปแบบ Connection String และเตรียมโครงสร้าง Pool\n\tdb, err := sql.Open(\"postgres\", dataSourceName)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\n\t// ขั้นตอนที่ 2: ตั้งค่าขีดจำกัดของ Connection Pool สำหรับระดับ Production\n\tdb.SetMaxOpenConns(25)                 // จำกัดการเชื่อมต่อพร้อมกันสูงสุดไม่เกิน 25 ท่อ\n\tdb.SetMaxIdleConns(25)                 // เตรียมท่อสแตนด์บายที่พร้อมใช้งานทันที 25 ท่อ\n\tdb.SetConnMaxLifetime(5 * time.Minute) // รีเซตท่อเชื่อมต่อทุก 5 นาทีป้องกันท่อค้าง\n\n\t// ขั้นตอนที่ 3: ส่งสัญญาณ Ping ไปยังฐานข้อมูลจริงเพื่อยืนยันว่าเชื่อมต่อสำเร็จ\n\tif err := db.Ping(); err != nil {\n\t\treturn nil, err\n\t}\n\n\treturn db, nil\n}\n\n// DBTX คือ Interface สัญญาร่วมกันของ *sql.DB และ *sql.Tx\ntype DBTX interface {\n\tExecContext(context.Context, string, ...interface{}) (sql.Result, error)\n\tPrepareContext(context.Context, string) (*sql.Stmt, error)\n\tQueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)\n\tQueryRowContext(context.Context, string, ...interface{}) *sql.Row\n}\n\n// Queries คือตัวถือ DBTX สำหรับใช้เรียกเมธอด CRUD ทั้งหมดของระบบ\ntype Queries struct {\n\tdb DBTX\n}\n\n// New สร้างออบเจกต์ Queries ใหม่จากตัวเชื่อมต่อฐานข้อมูลที่ส่งเข้ามา\nfunc New(db DBTX) *Queries {\n\treturn &Queries{db: db}\n}\n\n// WithTx สร้างออบเจกต์ Queries ตัวใหม่ที่ผูกกับ Transaction (*sql.Tx) โดยเฉพาะ\nfunc (q *Queries) WithTx(tx *sql.Tx) *Queries {\n\treturn &Queries{db: tx}\n}"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`*sql.DB` คือ Connection Pool**: ตัวแปรที่คืนมาจาก `sql.Open` ไม่ใช่สายเชื่อมต่อเส้นเดียว แต่เป็นสระรวมสายเชื่อมต่อที่ปลอดภัยต่อการเรียกใช้พร้อมกันจากหลาย Goroutines",
            "**`sql.Open` vs `db.Ping()`**: คำสั่ง `sql.Open` ยังไม่ได้ต่อฐานข้อมูลจริง แค่เตรียมตัวแปรในหน่วยความจำ เราจึงต้องเรียก `db.Ping()` เพื่อทดสอบเคาะประตูฐานข้อมูลจริงทันที",
            "**`New(db DBTX) *Queries`**: ฟังก์ชันสร้าง (Constructor) ที่รับอะไรก็ได้ที่ผ่านสัญญา `DBTX` แล้วคืนค่าเป็น Pointer `*Queries`"
          ]
        },
        {
          "t": "h2",
          "c": "4. สร้างไฟล์ db/models.go (นิยาม Go Struct ให้ตรงกับตาราง SQL)"
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/db/models.go` เพื่อแปลงโครงสร้างตารางทั้ง 3 ในฐานข้อมูลให้เป็น Go Struct:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/models.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/models.go\n// หน้าที่: นิยามโครงสร้างข้อมูล (Data Models) ให้ตรงกับคอลัมน์ในตาราง PostgreSQL\n// แก้ปัญหา: ให้ Go ตรวจสอบชนิดข้อมูลได้ตั้งแต่ตอนคอมไพล์ และแปลงเป็น JSON ได้ทันทีผ่าน Struct Tag\n// =============================================================================\npackage db\n\nimport \"time\"\n\n// Account แทนข้อมูล 1 แถวในตาราง accounts\ntype Account struct {\n\tID        int64     `json:\"id\"`\n\tOwner     string    `json:\"owner\"`\n\tBalance   int64     `json:\"balance\"` // หน่วยเงินย่อยที่สุด (สตางค์/เซนต์)\n\tCurrency  string    `json:\"currency\"`\n\tCreatedAt time.Time `json:\"created_at\"`\n}\n\n// Entry แทนข้อมูล 1 แถวในตาราง entries (สมุดบัญชีแยกประเภท Ledger)\ntype Entry struct {\n\tID        int64     `json:\"id\"`\n\tAccountID int64     `json:\"account_id\"`\n\tAmount    int64     `json:\"amount\"` // บวก = เงินเข้า, ลบ = เงินออก\n\tCreatedAt time.Time `json:\"created_at\"`\n}\n\n// Transfer แทนข้อมูล 1 แถวในตาราง transfers (ประวัติธุรกรรมการโอนเงิน)\ntype Transfer struct {\n\tID            int64     `json:\"id\"`\n\tFromAccountID int64     `json:\"from_account_id\"`\n\tToAccountID   int64     `json:\"to_account_id\"`\n\tAmount        int64     `json:\"amount\"` // ต้องมากกว่า 0 เสมอ\n\tCreatedAt     time.Time `json:\"created_at\"`\n}"
        },
        {
          "t": "h2",
          "c": "5. สร้างไฟล์ db/account.go (ฟังก์ชัน CRUD สำหรับตาราง accounts)"
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/db/account.go` ซึ่งรวบรวมคำสั่งสร้างบัญชี, ดึงบัญชี, ปรับยอดเงินแบบ Atomic, ลบบัญชี, และดึงรายการบัญชีแบบแบ่งหน้า (Pagination):"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/account.go\n// หน้าที่: รวมเมธอด CRUD สำหรับจัดการตาราง accounts ด้วย Parameterized SQL Queries\n// แก้ปัญหา: ป้องกันช่องโหว่ SQL Injection 100% ด้วยการใช้ Placeholder ($1, $2, $3)\n// =============================================================================\npackage db\n\nimport \"context\"\n\n// CreateAccountParams เก็บพารามิเตอร์ขาเข้าสำหรับการเปิดบัญชีใหม่\ntype CreateAccountParams struct {\n\tOwner    string `json:\"owner\"`\n\tBalance  int64  `json:\"balance\"`\n\tCurrency string `json:\"currency\"`\n}\n\nconst createAccount = `-- name: CreateAccount :one\nINSERT INTO accounts (\n  owner,\n  balance,\n  currency\n) VALUES (\n  $1, $2, $3\n)\nRETURNING id, owner, balance, currency, created_at;\n`\n\n// CreateAccount สร้างแถวบัญชีใหม่และคืนข้อมูลแถวที่เพิ่งสร้างเสร็จกลับมาทันที\nfunc (q *Queries) CreateAccount(ctx context.Context, arg CreateAccountParams) (Account, error) {\n\t// ขั้นตอนที่ 1: ยิงคำสั่ง INSERT พร้อมส่งค่าผ่าน Placeholder $1, $2, $3\n\trow := q.db.QueryRowContext(ctx, createAccount, arg.Owner, arg.Balance, arg.Currency)\n\n\t// ขั้นตอนที่ 2: แกะข้อมูลจาก RETURNING ใส่ตัวแปร Account ผ่าน Pointer (&)\n\tvar i Account\n\terr := row.Scan(\n\t\t&i.ID,\n\t\t&i.Owner,\n\t\t&i.Balance,\n\t\t&i.Currency,\n\t\t&i.CreatedAt,\n\t)\n\treturn i, err\n}\n\nconst getAccount = `-- name: GetAccount :one\nSELECT id, owner, balance, currency, created_at FROM accounts\nWHERE id = $1 LIMIT 1;\n`\n\n// GetAccount ค้นหาและดึงข้อมูลบัญชี 1 รายการตามรหัส ID\nfunc (q *Queries) GetAccount(ctx context.Context, id int64) (Account, error) {\n\t// ขั้นตอนที่ 1: ยิงคำสั่ง SELECT ค้นหาตาม ID ($1)\n\trow := q.db.QueryRowContext(ctx, getAccount, id)\n\n\t// ขั้นตอนที่ 2: แกะข้อมูลแถวที่ได้ใส่ตัวแปร Account\n\tvar i Account\n\terr := row.Scan(\n\t\t&i.ID,\n\t\t&i.Owner,\n\t\t&i.Balance,\n\t\t&i.Currency,\n\t\t&i.CreatedAt,\n\t)\n\treturn i, err\n}\n\n// AddAccountBalanceParams เก็บรหัสบัญชีและยอดเงินที่ต้องการบวกเพิ่มหรือหักออก\ntype AddAccountBalanceParams struct {\n\tID     int64 `json:\"id\"`\n\tAmount int64 `json:\"amount\"` // ค่าบวก = เพิ่มเงิน, ค่าลบ = หักเงิน\n}\n\nconst addAccountBalance = `-- name: AddAccountBalance :one\nUPDATE accounts\nSET balance = balance + $1\nWHERE id = $2\nRETURNING id, owner, balance, currency, created_at;\n`\n\n// AddAccountBalance ปรับยอดเงินคงเหลือในระดับ SQL แบบ Atomic (balance = balance + $1)\nfunc (q *Queries) AddAccountBalance(ctx context.Context, arg AddAccountBalanceParams) (Account, error) {\n\t// ขั้นตอนที่ 1: สั่งให้ PostgreSQL คำนวณบวก/ลบยอดเงินในตัวพร้อมล็อกแถวอัตโนมัติ\n\trow := q.db.QueryRowContext(ctx, addAccountBalance, arg.Amount, arg.ID)\n\n\t// ขั้นตอนที่ 2: แกะข้อมูลบัญชีหลังอัปเดตยอดเงินเสร็จสิ้น\n\tvar i Account\n\terr := row.Scan(\n\t\t&i.ID,\n\t\t&i.Owner,\n\t\t&i.Balance,\n\t\t&i.Currency,\n\t\t&i.CreatedAt,\n\t)\n\treturn i, err\n}\n\nconst deleteAccount = `-- name: DeleteAccount :exec\nDELETE FROM accounts\nWHERE id = $1;\n`\n\n// DeleteAccount ลบบัญชีตามรหัส ID ออกจากตาราง accounts\nfunc (q *Queries) DeleteAccount(ctx context.Context, id int64) error {\n\t// ใช้ ExecContext เพราะคำสั่ง DELETE ไม่มีการคืนแถวข้อมูลกลับมา (ใช้ _ ทิ้ง sql.Result)\n\t_, err := q.db.ExecContext(ctx, deleteAccount, id)\n\treturn err\n}\n\n// ListAccountsParams เก็บค่า Limit และ Offset สำหรับการดึงข้อมูลแบบแบ่งหน้า (Pagination)\ntype ListAccountsParams struct {\n\tLimit  int32 `json:\"limit\"`\n\tOffset int32 `json:\"offset\"`\n}\n\nconst listAccounts = `-- name: ListAccounts :many\nSELECT id, owner, balance, currency, created_at FROM accounts\nORDER BY id\nLIMIT $1 OFFSET $2;\n`\n\n// ListAccounts ดึงรายการบัญชีหลายแถวตามจำนวน Limit และข้ามแถวตาม Offset\nfunc (q *Queries) ListAccounts(ctx context.Context, arg ListAccountsParams) ([]Account, error) {\n\t// ขั้นตอนที่ 1: ยิงคำสั่ง QueryContext ซึ่งคืนค่าเป็นชุดแถวข้อมูล (*sql.Rows)\n\trows, err := q.db.QueryContext(ctx, listAccounts, arg.Limit, arg.Offset)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\t// ลงทะเบียนปิด rows ล่วงหน้าด้วย defer เพื่อคืน Connection กลับเข้า Pool เสมอ\n\tdefer rows.Close()\n\n\t// ขั้นตอนที่ 2: วนลูปอ่านข้อมูลทีละแถวด้วย rows.Next() แล้วเก็บเข้า Slice\n\tvar items []Account\n\tfor rows.Next() {\n\t\tvar i Account\n\t\tif err := rows.Scan(\n\t\t\t&i.ID,\n\t\t\t&i.Owner,\n\t\t\t&i.Balance,\n\t\t\t&i.Currency,\n\t\t\t&i.CreatedAt,\n\t\t); err != nil {\n\t\t\treturn nil, err\n\t\t}\n\t\titems = append(items, i)\n\t}\n\n\t// ขั้นตอนที่ 3: ตรวจสอบว่าไม่มีข้อผิดพลาดเกิดขึ้นระหว่างการวนลูปอ่านแถวข้อมูล\n\tif err := rows.Close(); err != nil {\n\t\treturn nil, err\n\t}\n\tif err := rows.Err(); err != nil {\n\t\treturn nil, err\n\t}\n\treturn items, nil\n}"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**ทำไมห้ามต่อสตริง SQL เอง แต่ต้องใช้ `$1, $2, $3`?**: หากเราเอาข้อความของผู้ใช้มาต่อกับคำสั่ง SQL ตรงๆ แฮกเกอร์สามารถส่งชื่อ `alice'; DROP TABLE accounts; --` เข้ามาทำลายฐานข้อมูลได้ (SQL Injection) การใช้ `$1, $2` จะแยกคำสั่ง SQL ออกจากข้อมูล 100%",
            "**เลือกใช้เมธอดทั้ง 3 ของ `DBTX` เมื่อไหร่?**:\n  1. `QueryRowContext`: ใช้เมื่อต้องการข้อมูลกลับมา **1 แถวพอดี** (เช่น `INSERT ... RETURNING` หรือ `SELECT ... WHERE id = $1`)\n  2. `QueryContext`: ใช้เมื่อต้องการข้อมูลกลับมา **หลายแถว** (เช่น `ListAccounts`)\n  3. `ExecContext`: ใช้เมื่อ **ไม่ต้องการแถวข้อมูลกลับมา** (เช่น `DELETE`)"
          ]
        },
        {
          "t": "h2",
          "c": "6. สร้างไฟล์ db/entry.go และ db/transfer.go"
        },
        {
          "t": "p",
          "c": "สร้างไฟล์สำหรับบันทึกสมุดบัญชีแยกประเภท (`db/entry.go`) และบันทึกประวัติการโอนเงิน (`db/transfer.go`) เพื่อเตรียมพร้อมสำหรับระบบโอนเงิน:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/entry.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/entry.go\n// หน้าที่: จัดการการบันทึกข้อมูลสมุดบัญชีแยกประเภท (Ledger) ลงในตาราง entries\n// แก้ปัญหา: สร้างหลักฐานความเคลื่อนไหวทางการเงินแบบ Append-Only ทุกครั้งที่ยอดเงินขยับ\n// =============================================================================\npackage db\n\nimport \"context\"\n\n// CreateEntryParams เก็บรหัสบัญชีและจำนวนเงินที่เปลี่ยนแปลง\ntype CreateEntryParams struct {\n\tAccountID int64 `json:\"account_id\"`\n\tAmount    int64 `json:\"amount\"` // บวก = เงินเข้า, ลบ = เงินออก\n}\n\nconst createEntry = `-- name: CreateEntry :one\nINSERT INTO entries (\n  account_id,\n  amount\n) VALUES (\n  $1, $2\n)\nRETURNING id, account_id, amount, created_at;\n`\n\n// CreateEntry เพิ่มแถวบันทึกความเคลื่อนไหวของเงินลงในตาราง entries\nfunc (q *Queries) CreateEntry(ctx context.Context, arg CreateEntryParams) (Entry, error) {\n\t// ขั้นตอนที่ 1: ยิงคำสั่ง INSERT ลงตาราง entries\n\trow := q.db.QueryRowContext(ctx, createEntry, arg.AccountID, arg.Amount)\n\n\t// ขั้นตอนที่ 2: แกะข้อมูลแถวที่สร้างเสร็จใส่ตัวแปร Entry\n\tvar i Entry\n\terr := row.Scan(\n\t\t&i.ID,\n\t\t&i.AccountID,\n\t\t&i.Amount,\n\t\t&i.CreatedAt,\n\t)\n\treturn i, err\n}"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/transfer.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/transfer.go\n// หน้าที่: จัดการการบันทึกข้อมูลประวัติการโอนเงินลงในตาราง transfers\n// แก้ปัญหา: เก็บหลักฐานอ้างอิงว่าบัญชีต้นทางใดโอนเงินให้บัญชีปลายทางใด เป็นจำนวนเท่าไหร่\n// =============================================================================\npackage db\n\nimport \"context\"\n\n// CreateTransferParams เก็บข้อมูลบัญชีต้นทาง บัญชีปลายทาง และจำนวนเงินที่โอน\ntype CreateTransferParams struct {\n\tFromAccountID int64 `json:\"from_account_id\"`\n\tToAccountID   int64 `json:\"to_account_id\"`\n\tAmount        int64 `json:\"amount\"` // ต้องเป็นค่าบวก (> 0) เสมอ\n}\n\nconst createTransfer = `-- name: CreateTransfer :one\nINSERT INTO transfers (\n  from_account_id,\n  to_account_id,\n  amount\n) VALUES (\n  $1, $2, $3\n)\nRETURNING id, from_account_id, to_account_id, amount, created_at;\n`\n\n// CreateTransfer เพิ่มแถวประวัติการโอนเงินลงในตาราง transfers\nfunc (q *Queries) CreateTransfer(ctx context.Context, arg CreateTransferParams) (Transfer, error) {\n\t// ขั้นตอนที่ 1: ยิงคำสั่ง INSERT ลงตาราง transfers\n\trow := q.db.QueryRowContext(ctx, createTransfer, arg.FromAccountID, arg.ToAccountID, arg.Amount)\n\n\t// ขั้นตอนที่ 2: แกะข้อมูลแถวที่สร้างเสร็จใส่ตัวแปร Transfer\n\tvar i Transfer\n\terr := row.Scan(\n\t\t&i.ID,\n\t\t&i.FromAccountID,\n\t\t&i.ToAccountID,\n\t\t&i.Amount,\n\t\t&i.CreatedAt,\n\t)\n\treturn i, err\n}"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• คุณได้สร้าง Data Access Layer ครบทั้ง 5 ไฟล์ (`db.go`, `models.go`, `account.go`, `entry.go`, `transfer.go`) ด้วย Parameterized Raw SQL ที่ปลอดภัยจาก SQL Injection เรียบร้อยแล้ว\n• **ก้าวต่อไป (บทที่ 3.2)**: เราจะไม่เขียนโค้ดทิ้งไว้โดยไม่พิสูจน์! ในบทถัดไปเราจะเขียน **Automated Unit Tests** ด้วย `testify/require` เพื่อทดสอบว่าฟังก์ชัน CRUD ทุกตัวทำงานกับ PostgreSQL ได้ถูกต้อง 100%"
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
      "th": "ถอดรหัสคุณสมบัติ ACID ทั้ง 4 ประการ และสร้าง Database Transaction Manager (Store.execTx) ในภาษา Go ด้วย Struct Embedding และ Callback Function พร้อมระบบ Auto Rollback",
      "en": "Deconstructing the 4 ACID guarantees and building a bulletproof Go Transaction Manager with struct embedding and automatic rollback."
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
          "t": "h2",
          "c": "1. ทำไมการโอนเงินถึงรันคำสั่ง SQL แยกทีละตัวไม่ได้?"
        },
        {
          "t": "p",
          "c": "ในระบบธนาคาร การโอนเงินประกอบด้วยการเขียนข้อมูลหลายตารางต่อเนื่องกัน (สร้างประวัติโอน, จดสมุดบัญชีฝั่งออก, จดสมุดบัญชีฝั่งเข้า, หักเงินต้นทาง, เพิ่มเงินปลายทาง) ลองนึกภาพว่าถ้าเซิร์ฟเวอร์ทำงานไปถึงขั้นที่ 4 (หักเงินผู้โอนไปแล้ว) แต่จังหวะที่จะทำขั้นที่ 5 เกิดเน็ตเวิร์กหลุดหรือฐานข้อมูลขัดข้อง ถ้าไม่ได้หุ้มด้วย **Database Transaction** เงินของผู้โอนจะหายสาบสูญไปทันที!"
        },
        {
          "t": "h2",
          "c": "2. เจาะลึก 4 คุณสมบัติของ ACID ในระบบการเงิน"
        },
        {
          "t": "table",
          "head": [
            "ตัวย่อ",
            "ชื่อเต็ม",
            "ความหมายและการทำงานในระบบ Simple Bank"
          ],
          "rows": [
            [
              "A",
              "Atomicity (ความเป็นหนึ่งเดียว)",
              "ทุกคำสั่งย่อยใน Transaction ถือเป็นก้อนเดียวกัน ('All or Nothing') หากพังแม้แต่ขั้นตอนเดียว ระบบจะสั่ง `ROLLBACK` ย้อนข้อมูลทุกตารางกลับสู่สภาพก่อนเริ่มทันที"
            ],
            [
              "C",
              "Consistency (ความสอดคล้องตามกฎ)",
              "ข้อมูลหลังจบ Transaction ต้องไม่ละเมิดกฎของฐานข้อมูล เช่น ยอดเงินห้ามติดลบ (`CHECK balance >= 0`) และผลรวมเงินทั้งระบบต้องเท่าเดิมเสมอ"
            ],
            [
              "I",
              "Isolation (การแยกส่วนไม่กวนกัน)",
              "ธุรกรรมที่รันพร้อมกันหลายรายการต้องไม่เห็นข้อมูลครึ่งๆ กลางๆ ของกันและกัน"
            ],
            [
              "D",
              "Durability (ความคงทนถาวร)",
              "เมื่อสั่ง `COMMIT` สำเร็จแล้ว ข้อมูลต้องถูกบันทึกลงดิสก์อย่างถาวร แม้ไฟดับทันทีหลังจากนั้น ข้อมูลการโอนเงินก็ต้องไม่หาย"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "3. แกะไวยากรณ์ Go ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "กลไก Go ใน store.go",
            "โค้ดที่ปรากฏ",
            "คำอธิบายแบบเข้าใจง่าย"
          ],
          "rows": [
            [
              "1. Struct Embedding",
              "type Store struct {\n    *Queries\n    db *sql.DB\n}",
              "ฝัง `*Queries` ไว้ใน `Store` เพื่อให้ตัวแปร `store` สามารถเรียกเมธอด CRUD เดิมทั้งหมด (เช่น `store.GetAccount()`) ได้โดยตรง พร้อมทั้งมี `db *sql.DB` ไว้สั่งเปิด Transaction (`BeginTx`)"
            ],
            [
              "2. Callback Function",
              "func (store *Store) execTx(\n    ctx context.Context,\n    fn func(*Queries) error,\n) error",
              "รับฟังก์ชัน `fn` เข้ามาทำงานตรงกลาง: `execTx` จะเป็นคนเปิด `BeginTx`, สร้าง `q := New(tx)` ส่งเข้าไปให้ `fn(q)` ทำงาน, แล้วตรวจผลว่าถ้ามี error ให้ `Rollback()` แต่ถ้าผ่านให้ `Commit()`"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "4. ลงมือสร้างไฟล์ simplebank/db/store.go"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/store.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/store.go\n// หน้าที่: จัดการ Database Transaction กลาง (BEGIN, COMMIT, และ Auto ROLLBACK)\n// แก้ปัญหา: ป้องกันข้อมูลสูญหายครึ่งทาง (Partial Failure) เมื่อรันหลายคำสั่ง SQL ต่อเนื่องกัน\n// =============================================================================\npackage db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"fmt\"\n)\n\n// Store มัดรวมความสามารถในการคิวรีรายตาราง (*Queries) เข้ากับความสามารถในการเปิด Transaction (*sql.DB)\ntype Store struct {\n\t*Queries         // Struct Embedding: ยกเมธอดทั้งหมดของ Queries ขึ้นมาอยู่บน Store\n\tdb       *sql.DB // เก็บ Connection Pool สำหรับใช้สั่งเปิด Transaction (db.BeginTx)\n}\n\n// NewStore สร้างออบเจกต์ Store ตัวใหม่ที่พร้อมใช้งานทั้ง CRUD และ Transaction\nfunc NewStore(db *sql.DB) *Store {\n\treturn &Store{\n\t\tdb:      db,\n\t\tQueries: New(db),\n\t}\n}\n\n// execTx เป็นฟังก์ชันแม่แบบ (Template) สำหรับรันชุดคำสั่ง SQL ภายใต้ 1 ACID Transaction\nfunc (store *Store) execTx(ctx context.Context, fn func(*Queries) error) error {\n\t// ขั้นตอนที่ 1: สั่งฐานข้อมูลเปิด Transaction ใหม่ (BEGIN)\n\ttx, err := store.db.BeginTx(ctx, nil)\n\tif err != nil {\n\t\treturn err\n\t}\n\n\t// ขั้นตอนที่ 2: สร้างตัว Queries ชุดใหม่ที่ผูกกับ Transaction (tx) ตัวนี้โดยเฉพาะ\n\tq := New(tx)\n\n\t// ขั้นตอนที่ 3: เรียกฟังก์ชัน Business Logic (fn) ให้ทำงานผ่านตัว Queries (q)\n\terr = fn(q)\n\n\t// ขั้นตอนที่ 4: หากเกิดข้อผิดพลาดในขั้นตอนใดก็ตาม ให้สั่ง Rollback ยกเลิกทั้งหมดทันที!\n\tif err != nil {\n\t\tif rbErr := tx.Rollback(); rbErr != nil {\n\t\t\treturn fmt.Errorf(\"tx err: %v, rollback err: %v\", err, rbErr)\n\t\t}\n\t\treturn err\n\t}\n\n\t// ขั้นตอนที่ 5: หากทุกขั้นตอนสำเร็จไร้ข้อผิดพลาด สั่ง Commit เพื่อบันทึกข้อมูลอย่างถาวร\n\treturn tx.Commit()\n}"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**ทำไม `execTx` ถึงขึ้นต้นด้วยตัวพิมพ์เล็ก `e`?**: ในภาษา Go ชื่อฟังก์ชันที่ขึ้นต้นด้วยตัวพิมพ์เล็กหมายถึง **Private / Unexported (ใช้ได้เฉพาะภายใน `package db` เท่านั้น)** เพราะเราไม่ต้องการให้โค้ดภายนอก (เช่น API Layer) มาสั่งเปิด Transaction สะเปะสะปะเอง แต่ให้เรียกผ่านเมธอดมาตรฐานอย่าง `store.TransferTx()` เท่านั้น",
            "**ทำไมตั้งชื่อตัวแปรว่า `rbErr` ในบรรทัด `if rbErr := tx.Rollback()`?**: เพราะตัวแปร `err` ด้านนอกเก็บสาเหตุที่ทำให้การโอนเงินล้มเหลวอยู่ เราจึงใช้ชื่อ `rbErr` (Rollback Error) เพื่อไม่ให้ไปทับค่า `err` ต้นเหตุ หากการ Rollback ล้มเหลวซ้ำ เราจะได้รวมข้อความ Error ทั้งสองตัวส่งออกไปพร้อมกันได้"
          ]
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
      "th": "ลงมือเขียนฟังก์ชัน TransferTx ในไฟล์ tx_transfer.go ที่ร้อยเรียง 5 ขั้นตอนของการโอนเงินเข้าด้วยกันใน 1 Transaction พร้อมส่งคืนข้อมูลยอดเงินคงเหลือใหม่ทันที",
      "en": "Implementing the 5-step atomic TransferTx method in tx_transfer.go and returning updated balances."
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
          "t": "h2",
          "c": "1. องค์ประกอบ 5 ขั้นตอนของการโอนเงินในระบบธนาคาร"
        },
        {
          "t": "p",
          "c": "เมื่อลูกค้าสั่งโอนเงินจากบัญชีต้นทาง (`FromAccountID`) ไปยังบัญชีปลายทาง (`ToAccountID`) ด้วยจำนวนเงิน `Amount` ระบบจะต้องทำ 5 ขั้นตอนนี้เรียงกันภายใต้ 1 Transaction เสมอ:"
        },
        {
          "t": "ol",
          "c": [
            "**ขั้นตอนที่ 1 (CreateTransfer)**: บันทึกใบเสร็จประวัติการโอนเงินลงตาราง `transfers`",
            "**ขั้นตอนที่ 2 (CreateEntry ฝั่งผู้โอน)**: บันทึกสมุดบัญชีแยกประเภทลงตาราง `entries` ของผู้โอน ด้วยยอดติดลบ (`-arg.Amount`)",
            "**ขั้นตอนที่ 3 (CreateEntry ฝั่งผู้รับ)**: บันทึกสมุดบัญชีแยกประเภทลงตาราง `entries` ของผู้รับ ด้วยยอดเป็นบวก (`+arg.Amount`)",
            "**ขั้นตอนที่ 4 (AddAccountBalance ฝั่งผู้โอน)**: หักยอดเงินคงเหลือในตาราง `accounts` ของผู้โอน (`-arg.Amount`)",
            "**ขั้นตอนที่ 5 (AddAccountBalance ฝั่งผู้รับ)**: เพิ่มยอดเงินคงเหลือในตาราง `accounts` ของผู้รับ (`+arg.Amount`)"
          ]
        },
        {
          "t": "h2",
          "c": "2. แกะไวยากรณ์ Go ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "callout",
          "title": "🏗️ ทำไมเราแยกไฟล์ tx_transfer.go ออกจาก store.go ได้?",
          "c": "ในภาษา Go **ทุกไฟล์ที่อยู่ในโฟลเดอร์เดียวกันและประกาศหัวไฟล์ว่า `package db` เหมือนกัน จะมองเห็นกันทั้งหมดและสามารถเขียนเมธอดของ `Store` แยกคนละไฟล์ได้!**\n• `store.go` เก็บเฉพาะโครงสร้างกลาง (`Store` และ `execTx`)\n• `tx_transfer.go` เก็บเมธอด `func (store *Store) TransferTx(...)` โดยเฉพาะ ทำให้โค้ดไม่ปนกันเป็นไฟล์ยักษ์ (No God Object)"
        },
        {
          "t": "h2",
          "c": "3. ลงมือสร้างไฟล์ simplebank/db/tx_transfer.go (Version 1)"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/tx_transfer.go (Version 1: โครงสร้างพื้นฐาน 5 ขั้นตอน)",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/tx_transfer.go\n// หน้าที่: ดำเนินธุรกรรมการโอนเงิน 5 ขั้นตอนภายใต้ 1 Database Transaction (Version 1)\n// แก้ปัญหา: รับประกันว่าประวัติการโอน, สมุดบัญชี Ledger, และยอดคงเหลือทั้งสองฝั่งจะถูกต้องตรงกันเสมอ\n// =============================================================================\npackage db\n\nimport \"context\"\n\n// TransferTxParams เก็บข้อมูลขาเข้าสำหรับการสั่งโอนเงินระหว่าง 2 บัญชี\ntype TransferTxParams struct {\n\tFromAccountID int64 `json:\"from_account_id\"` // รหัสบัญชีผู้โอน (ต้นทาง)\n\tToAccountID   int64 `json:\"to_account_id\"`   // รหัสบัญชีผู้รับ (ปลายทาง)\n\tAmount        int64 `json:\"amount\"`          // จำนวนเงินที่โอน (หน่วยสตางค์/เซนต์)\n}\n\n// TransferTxResult เก็บข้อมูลผลลัพธ์ทั้ง 5 ส่วนหลังจากโอนเงินสำเร็จ เพื่อส่งกลับให้ผู้ใช้\ntype TransferTxResult struct {\n\tTransfer    Transfer `json:\"transfer\"`     // 1. ประวัติการโอนเงินที่สร้างเสร็จ\n\tFromAccount Account  `json:\"from_account\"` // 2. ข้อมูลบัญชีผู้โอนหลังหักเงินแล้ว\n\tToAccount   Account  `json:\"to_account\"`   // 3. ข้อมูลบัญชีผู้รับหลังได้รับเงินแล้ว\n\tFromEntry   Entry    `json:\"from_entry\"`   // 4. บันทึก Ledger เงินออก (-Amount)\n\tToEntry     Entry    `json:\"to_entry\"`     // 5. บันทึก Ledger เงินเข้า (+Amount)\n}\n\n// TransferTx รัน 5 ขั้นตอนของการโอนเงินภายใน Transaction เดียวผ่าน store.execTx\nfunc (store *Store) TransferTx(ctx context.Context, arg TransferTxParams) (TransferTxResult, error) {\n\tvar result TransferTxResult\n\n\t// เรียกใช้ execTx และส่ง Closure ฟังก์ชันการทำงานเข้าไป\n\terr := store.execTx(ctx, func(q *Queries) error {\n\t\tvar err error\n\n\t\t// ขั้นตอนที่ 1: สร้างแถวประวัติการโอนเงินในตาราง transfers\n\t\tresult.Transfer, err = q.CreateTransfer(ctx, CreateTransferParams{\n\t\t\tFromAccountID: arg.FromAccountID,\n\t\t\tToAccountID:   arg.ToAccountID,\n\t\t\tAmount:        arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// ขั้นตอนที่ 2: สร้างแถว Entry ฝั่งเงินออกของบัญชีต้นทาง (ยอดติดลบ -arg.Amount)\n\t\tresult.FromEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.FromAccountID,\n\t\t\tAmount:    -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// ขั้นตอนที่ 3: สร้างแถว Entry ฝั่งเงินเข้าของบัญชีปลายทาง (ยอดเป็นบวก +arg.Amount)\n\t\tresult.ToEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.ToAccountID,\n\t\t\tAmount:    arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// ขั้นตอนที่ 4: หักยอดเงินคงเหลือจากบัญชีต้นทาง (-arg.Amount)\n\t\tresult.FromAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\t\tID:     arg.FromAccountID,\n\t\t\tAmount: -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// ขั้นตอนที่ 5: เพิ่มยอดเงินคงเหลือให้บัญชีปลายทาง (+arg.Amount)\n\t\tresult.ToAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\t\tID:     arg.ToAccountID,\n\t\t\tAmount: arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// ทุกขั้นตอนสำเร็จ คืนค่า nil เพื่อให้ execTx สั่ง Commit\n\t\treturn nil\n\t})\n\n\treturn result, err\n}"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**การเข้าถึงตัวแปร `result` จากภายใน Closure**: สังเกตว่าตัวแปร `var result TransferTxResult` ถูกประกาศอยู่นอก `store.execTx` แต่ฟังก์ชันข้างในสามารถเติมค่า `result.Transfer`, `result.FromEntry`, `result.FromAccount` ได้โดยตรงผ่านคุณสมบัติ Closure ของภาษา Go",
            "**ทำไมต้องใช้ `q.CreateTransfer` ไม่ใช่ `store.CreateTransfer` ข้างใน `execTx`?**: เพราะตัวแปร `q` คือ `*Queries` ที่ผูกติดกับ `*sql.Tx` (Transaction ที่เพิ่งเปิดใหม่) หากเผลอไปเรียก `store.CreateTransfer` คำสั่งนั้นจะไปรันนอก Transaction ทันที!",
            "**ระวังชนิดข้อมูล `int64`**: ฟิลด์ `Amount` และ `ID` ทุกตัวใน `TransferTxParams`, `CreateTransferParams`, `CreateEntryParams`, และ `AddAccountBalanceParams` ต้องเป็น `int64` เหมือนกันทั้งหมด"
          ]
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• คุณได้เขียนฟังก์ชัน `TransferTx` (Version 1) ที่รวม 5 ขั้นตอนของการโอนเงินเข้าไว้ใน 1 ACID Transaction เรียบร้อยแล้ว\n• **คำถามท้าทายสู่ก้าวต่อไป (บทที่ 5.1 & 5.2)**: โค้ด Version 1 นี้ทำงานได้สมบูรณ์หากมีคนโอนทีละคน แต่ถ้ามีคนกดโอนพร้อมกัน หรือ **บัญชี 1 โอนให้ 2 พร้อมกับที่บัญชี 2 โอนสวนให้ 1** จะเกิดอะไรขึ้น? ไปดูกลไก Row Locking และการแก้ Deadlock ในบทถัดไปกันครับ!"
        }
      ],
      "en": []
    }
  }
};
