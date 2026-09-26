import type { Page } from "@/lib/types";

export const storeTxPages: Record<string, Page> = {
  "bank-db-store-crud": {
    slug: "bank-db-store-crud",
    title: {
      th: "Data Store & การเขียน Raw SQL CRUD ในภาษา Go",
      en: "Data Store & Raw SQL CRUD in Go",
    },
    lead: {
      th: "เชื่อมต่อ PostgreSQL ด้วย database/sql, จัดการ Connection Pool, และเขียน CRUD ผ่าน Parameterized Raw SQL เพื่อป้องกัน SQL Injection โดยไม่อิงกับ ORM เวทมนตร์",
      en: "Connecting to PostgreSQL with database/sql, managing connection pooling, and writing clean parameterized SQL CRUD without ORM magic.",
    },
    group: "3. Data Store & ACID Transactions",
    blocks: {
      th: [
        {
          t: "p",
          c: "ในการพัฒนาระบบที่มีความสำคัญระดับสูง เช่น ระบบธนาคารหรือระบบชำระเงิน หลายองค์กรเลือกที่จะ **ไม่ใช้ ORM (Object-Relational Mapping)** ตัวใหญ่ๆ เพราะ ORM มักสร้างคำสั่ง SQL เบื้องหลังที่เราควบคุมได้ยาก และซ่อนกลไกการล็อกฐานข้อมูลเอาไว้ การเขียน Raw SQL ใน Go ร่วมกับแพ็กเกจมาตรฐาน `database/sql` จะทำให้เราเห็นการทำงานทุกกระเบียดนิ้ว และสามารถรีดประสิทธิภาพออกมาได้สูงสุด",
        },

        { t: "h2", c: "1. การเชื่อมต่อฐานข้อมูล & Connection Pooling" },
        {
          t: "p",
          c: "ใน Go ออบเจกต์ `*sql.DB` ไม่ใช่การเชื่อมต่อไปยังฐานข้อมูลแค่ 1 ท่อเดี่ยวๆ แต่ตัวมันคือ **Connection Pool (สระรวมการเชื่อมต่อ)** ที่ Go บริหารจัดการเปิด-ปิดท่อเชื่อมต่อให้เราอัตโนมัติเบื้องหลัง การตั้งค่า Pool ให้เหมาะสมจึงสำคัญมากต่อความเสถียรของระบบ:",
        },
        {
          t: "code",
          lang: "go",
          label: "db/db.go",
          c: `// จัดการการเชื่อมต่อฐานข้อมูล PostgreSQL ผ่าน database/sql พร้อมระบบ Connection Pooling
// ทำเพื่อแก้ปัญหา: หากเปิด-ปิด Connection ทุกครั้งที่ยิงคิวรี เซิร์ฟเวอร์จะกินทรัพยากรสูงและช้ามาก
// Connection Pool จะเตรียมท่อเชื่อมต่อสแตนด์บายไว้ล่วงหน้า ทำให้ยิงคิวรีได้รวดเร็วทันที
package db

import (
	"database/sql"
	"time"

	_ "github.com/lib/pq" // ลงทะเบียน postgres driver ให้กับ database/sql
)

// NewDB ทำหน้าที่เปิดสระรวมการเชื่อมต่อ (Connection Pool) และตั้งค่าขีดจำกัดที่เหมาะสมสำหรับ Production
func NewDB(dataSourceName string) (*sql.DB, error) {
	// 1. ตรวจสอบรูปแบบ Connection String และสร้าง Pool (คำสั่งนี้ยังไม่ได้ต่อฐานข้อมูลจริง)
	db, err := sql.Open("postgres", dataSourceName)
	if err != nil {
		return nil, err
	}

	// 2. กำหนดขนาด Connection Pool เพื่อควบคุมการใช้ทรัพยากร
	db.SetMaxOpenConns(25)                 // จำนวน Connection สูงสุดที่เปิดใช้งานพร้อมกันได้ (ป้องกัน DB รับโหลดเกิน)
	db.SetMaxIdleConns(25)                 // จำนวน Connection ที่เปิดสแตนด์บายไว้ใน Pool พร้อมหยิบไปใช้ทันที
	db.SetConnMaxLifetime(5 * time.Minute) // อายุขัยสูงสุดของ Connection ก่อนถูกปิดแล้วสร้างใหม่ (ป้องกัน Stale Connection)

	// 3. ทดสอบส่งคำสั่ง ping ไปยังฐานข้อมูลจริง เพื่อการันตีว่าเชื่อมต่อได้สำเร็จก่อนคืนค่า
	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}`,
        },
        {
          t: "ul",
          c: [
            "**`_ \"github.com/lib/pq\"`**: เครื่องหมาย `_` (Blank Identifier) หมายถึงเรา Import แพ็กเกจนี้เข้ามาเพื่อให้มันรันฟังก์ชัน `init()` ลงทะเบียน PostgreSQL Driver ให้กับ `database/sql` โดยที่เราไม่ได้เรียกใช้ตัวแปรจากแพ็กเกจนี้ตรงๆ",
            "**`sql.Open(...)`**: ฟังก์ชันนี้แค่ตรวจสอบว่ารูปแบบ URL ถูกต้องไหม แต่ยังไม่ได้คุยกับฐานข้อมูลจริง",
            "**`db.Ping()`**: เป็นคำสั่งที่ส่งคำขอไปสะกิดฐานข้อมูลจริง เพื่อพิสูจน์ว่าเชื่อมต่อได้จริง ไม่ล่ม",
          ],
        },

        { t: "h2", c: "2. นิยาม Model และโครงสร้าง Queries" },
        {
          t: "p",
          c: "เราจะแปลงตารางในฐานข้อมูลมาเป็น Go Struct ในไฟล์ `db/models.go`:",
        },
        {
          t: "code",
          lang: "go",
          label: "db/models.go",
          c: `// นิยาม Go Struct สำหรับเป็นพิมพ์เขียว (Model) ที่ตรงกับโครงสร้างตารางใน PostgreSQL
// ทำเพื่อแก้ปัญหา: แปลงข้อมูลจากตารางฐานข้อมูล (Rows) ให้กลายเป็นตัวแปร Strong-type ใน Go ที่ตรวจสอบประเภทข้อมูลได้ตั้งแต่ตอนคอมไพล์
package db

import "time"

// Account แทนโครงสร้างตาราง accounts (บัญชีผู้ใช้งาน)
type Account struct {
	ID        int64     \`json:"id"\`
	Owner     string    \`json:"owner"\`
	Balance   int64     \`json:"balance"\` // เก็บเป็นหน่วยย่อยที่สุด (สตางค์/เซนต์) ห้ามใช้ทศนิยม
	Currency  string    \`json:"currency"\`
	CreatedAt time.Time \`json:"created_at"\`
}

// Entry แทนโครงสร้างตาราง entries (สมุดบัญชีแยกประเภท Ledger บันทึกเงินเข้า-ออก)
type Entry struct {
	ID        int64     \`json:"id"\`
	AccountID int64     \`json:"account_id"\`
	Amount    int64     \`json:"amount"\` // บวก = เงินเข้าบัญชี, ลบ = เงินออกจากบัญชี
	CreatedAt time.Time \`json:"created_at"\`
}

// Transfer แทนโครงสร้างตาราง transfers (ประวัติธุรกรรมการโอนเงินระหว่าง 2 บัญชี)
type Transfer struct {
	ID            int64     \`json:"id"\`
	FromAccountID int64     \`json:"from_account_id"\` // บัญชีต้นทาง (ผู้โอน)
	ToAccountID   int64     \`json:"to_account_id"\`   // บัญชีปลายทาง (ผู้รับ)
	Amount        int64     \`json:"amount"\`          // จำนวนเงินที่โอน (ต้องเป็นค่าบวกเสมอ)
	CreatedAt     time.Time \`json:"created_at"\`
}`,
        },

        { t: "h2", c: "3. อินเทอร์เฟซ DBTX และ Queries Struct" },
        {
          t: "p",
          c: "เพื่อให้โค้ดค้นหาข้อมูลสามารถใช้ได้ทั้งกับ `*sql.DB` (คิวรีทั่วไป) และ `*sql.Tx` (คิวรีภายใน Transaction) เราจะสร้าง Interface กลางชื่อว่า `DBTX` ขึ้นมา:",
        },
        {
          t: "code",
          lang: "go",
          label: "db/db.go (DBTX Interface)",
          c: `// กำหนด DBTX Interface กลางเพื่อให้คิวรีทำงานได้ทั้งแบบเดี่ยว (*sql.DB) และแบบทรานแซกชัน (*sql.Tx)
// ทำเพื่อแก้ปัญหา: ฟังก์ชัน CRUD ทั่วไปเขียนครั้งเดียว แต่สามารถนำไปใช้ใน Transaction ได้ทันทีโดยไม่ต้องเขียนโค้ดซ้ำ
package db

import (
	"context"
	"database/sql"
)

// DBTX รวบรวมฟังก์ชันมาตรฐานสำหรับการยิงคำสั่ง SQL ที่มีร่วมกันใน *sql.DB และ *sql.Tx
type DBTX interface {
	ExecContext(context.Context, string, ...interface{}) (sql.Result, error)
	PrepareContext(context.Context, string) (*sql.Stmt, error)
	QueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)
	QueryRowContext(context.Context, string, ...interface{}) *sql.Row
}

// Queries ทำหน้าที่รันคำสั่ง SQL ทั้งหมด โดยผูกอยู่กับ DBTX
type Queries struct {
	db DBTX
}

func New(db DBTX) *Queries {
	return &Queries{db: db}
}

// WithTx สร้าง Queries ชุดใหม่ที่ผูกเข้ากับ Transaction (tx) ชั่วคราว
func (q *Queries) WithTx(tx *sql.Tx) *Queries {
	return &Queries{db: tx}
}`,
        },

        { t: "h2", c: "4. การเขียนฟังก์ชัน CRUD สำหรับ Account" },
        {
          t: "p",
          c: "มาดูตัวอย่างการเขียนฟังก์ชันสร้างบัญชี (CreateAccount) และดึงข้อมูลบัญชี (GetAccount):",
        },
        {
          t: "code",
          lang: "go",
          label: "db/account.go",
          c: `// ฟังก์ชัน CRUD สำหรับจัดการตาราง accounts ด้วย Parameterized Query
// ทำเพื่อแก้ปัญหา: แยกคำสั่ง SQL ออกจากตัวแปรข้อมูล ป้องกัน SQL Injection ได้ 100%
package db

import "context"

type CreateAccountParams struct {
	Owner    string \`json:"owner"\`
	Balance  int64  \`json:"balance"\`
	Currency string \`json:"currency"\`
}

const createAccount = \`-- name: CreateAccount :one
INSERT INTO accounts (
  owner,
  balance,
  currency
) VALUES (
  $1, $2, $3
)
RETURNING id, owner, balance, currency, created_at;
\`

// CreateAccount สร้างบัญชีใหม่และดึงข้อมูลแถวที่เพิ่งสร้างกลับมาทันที
func (q *Queries) CreateAccount(ctx context.Context, arg CreateAccountParams) (Account, error) {
	// 1. ส่งคำสั่ง INSERT พร้อมตัวแปรผ่าน Placeholder ($1, $2, $3)
	row := q.db.QueryRowContext(ctx, createAccount, arg.Owner, arg.Balance, arg.Currency)

	// 2. นำข้อมูลแถวที่คืนกลับมาจาก RETURNING มาแกะใส่ตัวแปร Account
	var i Account
	err := row.Scan(
		&i.ID,
		&i.Owner,
		&i.Balance,
		&i.Currency,
		&i.CreatedAt,
	)
	return i, err
}

const getAccount = \`-- name: GetAccount :one
SELECT id, owner, balance, currency, created_at FROM accounts
WHERE id = $1 LIMIT 1;
\`

// GetAccount ดึงข้อมูลบัญชีตาม ID
func (q *Queries) GetAccount(ctx context.Context, id int64) (Account, error) {
	// 1. ยิงคำสั่ง SELECT ค้นหาตาม ID ผ่าน Placeholder $1
	row := q.db.QueryRowContext(ctx, getAccount, id)

	// 2. แกะผลลัพธ์ใส่ตัวแปร Account ผ่าน Pointer
	var i Account
	err := row.Scan(
		&i.ID,
		&i.Owner,
		&i.Balance,
		&i.Currency,
		&i.CreatedAt,
	)
	return i, err
}

type AddAccountBalanceParams struct {
	ID     int64 \`json:"id"\`
	Amount int64 \`json:"amount"\` // บวก = เพิ่มเงิน, ลบ = หักเงิน
}

const addAccountBalance = \`-- name: AddAccountBalance :one
UPDATE accounts
SET balance = balance + $1
WHERE id = $2
RETURNING id, owner, balance, currency, created_at;
\`

// AddAccountBalance ปรับยอดเงินคงเหลือในระดับ SQL อย่างเป็น Atomic (balance = balance + amount)
// รองรับทั้งการฝากเงิน (Amount เป็นบวก) และการตัดเงิน (Amount เป็นลบ)
func (q *Queries) AddAccountBalance(ctx context.Context, arg AddAccountBalanceParams) (Account, error) {
	// 1. ส่งคำสั่ง UPDATE โดยให้ฐานข้อมูลบวก/ลบยอดเงินในตัว (Atomic Update)
	row := q.db.QueryRowContext(ctx, addAccountBalance, arg.Amount, arg.ID)

	// 2. แกะข้อมูลแถวที่อัปเดตแล้วใส่ตัวแปร Account
	var i Account
	err := row.Scan(
		&i.ID,
		&i.Owner,
		&i.Balance,
		&i.Currency,
		&i.CreatedAt,
	)
	return i, err
}

const deleteAccount = \`-- name: DeleteAccount :exec
DELETE FROM accounts
WHERE id = $1;
\`

// DeleteAccount ลบบัญชีตาม ID ออกจากฐานข้อมูล
func (q *Queries) DeleteAccount(ctx context.Context, id int64) error {
	// 1. ส่งคำสั่ง DELETE ผ่าน ExecContext เมื่อไม่ต้องการข้อมูลแถวกลับมา
	_, err := q.db.ExecContext(ctx, deleteAccount, id)
	return err
}

type ListAccountsParams struct {
	Limit  int32 \`json:"limit"\`
	Offset int32 \`json:"offset"\`
}

const listAccounts = \`-- name: ListAccounts :many
SELECT id, owner, balance, currency, created_at FROM accounts
ORDER BY id
LIMIT $1 OFFSET $2;
\`

// ListAccounts ดึงรายชื่อบัญชีแบบแบ่งหน้า (Pagination)
func (q *Queries) ListAccounts(ctx context.Context, arg ListAccountsParams) ([]Account, error) {
	// 1. ส่งคำสั่ง SELECT ค้นหาหลายแถวด้วย QueryContext
	rows, err := q.db.QueryContext(ctx, listAccounts, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// 2. วนลูปอ่านข้อมูลทีละแถวด้วย rows.Next() และ Scan ค่าใส่ struct
	var items []Account
	for rows.Next() {
		var i Account
		if err := rows.Scan(
			&i.ID,
			&i.Owner,
			&i.Balance,
			&i.Currency,
			&i.CreatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}`,
        },
        {
          t: "h3", c: "อธิบายโค้ดทีละบรรทัดอย่างละเอียด" },
        {
          t: "ul",
          c: [
            "**`$1, $2, $3` (Placeholder)**: เป็นการส่งตัวแปรเข้าไปในคำสั่ง SQL แบบ Parameterized Query ซึ่ง PostgreSQL จะแยกตัวคำสั่งออกจากข้อมูล ทำให้ปลอดภัยจากการโจมตีแบบ **SQL Injection 100%** (ห้ามต่อ String แบบ `fmt.Sprintf` เด็ดขาด!)",
            "**`RETURNING id, owner, ...`**: เป็นคำสั่งพิเศษของ PostgreSQL ที่ช่วยให้เราดึงข้อมูลแถวที่เพิ่งถูก `INSERT` หรือ `UPDATE` กลับมาได้ทันทีในรอบเดียว โดยไม่ต้องยิงคำสั่ง `SELECT` ซ้ำอีกรอบ",
            "**`q.db.QueryRowContext(ctx, ...)`**: ยิงคำสั่ง SQL ที่คาดหวังผลลัพธ์กลับมาเพียงแถวเดียว พร้อมส่ง Context เพื่อให้ยกเลิกการทำงานได้หากเกิด Timeout",
            "**`AddAccountBalance`**: ใช้ `balance = balance + $1` เพื่อให้ PostgreSQL ทำการคำนวณและอัปเดตเงินในระดับ Database Atomic ทันที",
            "**`DeleteAccount`**: ใช้ `q.db.ExecContext` ยิงคำสั่ง `DELETE` โดยไม่ต้องดึงข้อมูลแถวกลับมา เหมาะสำหรับงานลบข้อมูล",
            "**`ListAccounts`**: ใช้ `q.db.QueryContext` ค้นหาข้อมูลแบบแบ่งหน้า (Pagination) ด้วย `LIMIT` และ `OFFSET` พร้อมใช้ `rows.Next()` วนลูปอ่านข้อมูล",
          ],
        },

        { t: "h2", c: "5. การเขียนฟังก์ชัน CRUD สำหรับ Entries และ Transfers" },
        {
          t: "p",
          c: "เพื่อให้ระบบพร้อมสำหรับการทำธุรกรรมโอนเงินแบบครบวงจรในบทถัดไป เราจำเป็นต้องมีฟังก์ชันสร้างบันทึก Ledger (`entries`) และประวัติการโอน (`transfers`):",
        },
        {
          t: "code",
          lang: "go",
          label: "db/entry.go",
          c: `// ฟังก์ชันจัดการบันทึกข้อมูลสมุดบัญชีแยกประเภท (Ledger) ในตาราง entries
// ทำเพื่อแก้ปัญหา: บันทึกหลักฐานเงินเข้า-ออกของแต่ละบัญชีอย่างละเอียดทุกครั้งที่มีธุรกรรม
package db

import "context"

type CreateEntryParams struct {
	AccountID int64 \`json:"account_id"\` // รหัสบัญชีที่เป็นเจ้าของ Entry
	Amount    int64 \`json:"amount"\`     // ยอดเงิน: บวก = เงินเข้า, ลบ = เงินออก
}

const createEntry = \`-- name: CreateEntry :one
INSERT INTO entries (
  account_id,
  amount
) VALUES (
  $1, $2
)
RETURNING id, account_id, amount, created_at;
\`

// CreateEntry สร้างบันทึก Entry เงินเข้าหรือเงินออกลงในตาราง entries
func (q *Queries) CreateEntry(ctx context.Context, arg CreateEntryParams) (Entry, error) {
	// 1. ส่งคำสั่ง INSERT ข้อมูล Entry ลงตาราง
	row := q.db.QueryRowContext(ctx, createEntry, arg.AccountID, arg.Amount)

	// 2. แกะผลลัพธ์ใส่ตัวแปร Entry
	var i Entry
	err := row.Scan(
		&i.ID,
		&i.AccountID,
		&i.Amount,
		&i.CreatedAt,
	)
	return i, err
}`,
        },
        {
          t: "code",
          lang: "go",
          label: "db/transfer.go",
          c: `// ฟังก์ชันจัดการบันทึกข้อมูลธุรกรรมการโอนเงินในตาราง transfers
// ทำเพื่อแก้ปัญหา: บันทึกประวัติการโอนเงินระหว่าง 2 บัญชี พร้อมสร้าง Transfer ID สำหรับใช้เป็นเลขอ้างอิง
package db

import "context"

type CreateTransferParams struct {
	FromAccountID int64 \`json:"from_account_id"\` // บัญชีผู้โอน (ต้นทาง)
	ToAccountID   int64 \`json:"to_account_id"\`   // บัญชีผู้รับ (ปลายทาง)
	Amount        int64 \`json:"amount"\`          // จำนวนเงินที่โอน (ต้องเป็นค่าบวกเสมอ)
}

const createTransfer = \`-- name: CreateTransfer :one
INSERT INTO transfers (
  from_account_id,
  to_account_id,
  amount
) VALUES (
  $1, $2, $3
)
RETURNING id, from_account_id, to_account_id, amount, created_at;
\`

// CreateTransfer สร้างบันทึกประวัติการโอนเงินลงในตาราง transfers
func (q *Queries) CreateTransfer(ctx context.Context, arg CreateTransferParams) (Transfer, error) {
	// 1. ส่งคำสั่ง INSERT บันทึกธุรกรรมการโอนเงิน
	row := q.db.QueryRowContext(ctx, createTransfer, arg.FromAccountID, arg.ToAccountID, arg.Amount)

	// 2. แกะผลลัพธ์ใส่ตัวแปร Transfer
	var i Transfer
	err := row.Scan(
		&i.ID,
		&i.FromAccountID,
		&i.ToAccountID,
		&i.Amount,
		&i.CreatedAt,
	)
	return i, err
}`,
        },
        {
          t: "ul",
          c: [
            "**ความพร้อมของ Data Access Layer**: ตอนนี้เรามีฟังก์ชันพื้นฐานครบทั้ง 3 ตารางแล้ว (`accounts`, `entries`, `transfers`) พร้อมสำหรับการนำไปร้อยเรียงกันในระดับ Transaction ในบทถัดไป!",
          ],
        },
      ],
      en: [],
    },
  },

  "bank-acid-and-tx": {
    slug: "bank-acid-and-tx",
    title: {
      th: "กลไก ACID & Transaction Manager ในระบบธนาคาร",
      en: "ACID Properties & Transaction Manager in Go",
    },
    lead: {
      th: "ถอดรหัสคุณสมบัติ ACID ทั้ง 4 ประการ และสร้าง Database Transaction Manager ในภาษา Go พร้อมระบบ Auto Rollback ที่ปลอดภัยเมื่อเกิดข้อผิดพลาด",
      en: "Deconstructing the 4 ACID guarantees and building a bulletproof Go Transaction Manager with automatic rollback.",
    },
    group: "3. Data Store & ACID Transactions",
    blocks: {
      th: [
        {
          t: "p",
          c: "ในระบบธนาคาร ไม่มีคำว่า 'สำเร็จครึ่งเดียว' ถ้าคุณโอนเงิน 500 บาท การหักเงินจากบัญชีคุณ และการเพิ่มเงินในบัญชีเพื่อน **จะต้องเกิดขึ้นพร้อมกันอย่างสมบูรณ์ หรือไม่เกิดขึ้นเลยทั้งคู่** นี่คือที่มาของมาตรฐาน **ACID** ในระบบฐานข้อมูล",
        },

        { t: "h2", c: "เจาะลึก 4 คุณสมบัติของ ACID ในโลกการเงินจริง" },
        {
          t: "table",
          head: ["คุณสมบัติ", "ชื่อเต็ม", "ความหมายและการประยุกต์ใช้ในระบบธนาคาร"],
          rows: [
            [
              "A",
              "Atomicity (ความเป็นหนึ่งเดียว)",
              "การทำงานทุกคำสั่งย่อยใน Transaction ถือเป็นเนื้อเดียวกัน ('All or Nothing') หากคำสั่งใดคำสั่งหนึ่งพัง ระบบจะยกเลิกการกระทำทั้งหมดกลับสู่จุดเริ่มต้นทันที (Rollback)",
            ],
            [
              "C",
              "Consistency (ความถูกต้องเสมอต้นเสมอปลาย)",
              "ข้อมูลในฐานข้อมูลต้องสอดคล้องกับกฎเกณฑ์ของระบบตลอดเวลา เช่น ผลรวมเงินทั้งหมดในระบบต้องเท่าเดิมเสมอ (เงินไม่ได้เสกขึ้นมาและไม่ได้หายไปไหน) และยอดเงินต้องไม่ติดลบตาม Foreign Key และ Check Constraints",
            ],
            [
              "I",
              "Isolation (การแยกส่วนโดดเดี่ยว)",
              "เมื่อมีผู้ใช้โอนเงินพร้อมกันหลายคน คำสั่งของแต่ละคนจะต้องไม่เห็นข้อมูลครึ่งๆ กลางๆ ของกันและกัน เสมือนว่าคำสั่งถูกรันเรียงแถวทีละคน",
            ],
            [
              "D",
              "Durability (ความคงทนถาวร)",
              "เมื่อระบบตอบว่า 'โอนเงินสำเร็จ' (Commit) ข้อมูลนั้นจะต้องถูกบันทึกลงใน Hard Disk อย่างถาวร แม้ไฟจะดับหรือเซิร์ฟเวอร์จะระเบิดหลังจากนั้น เสี้ยววินาทีถัดมารีสตาร์ตเครื่องใหม่ ข้อมูลเงินก็ต้องไม่สูญหาย",
            ],
          ],
        },

        { t: "h2", c: "การออกแบบ Store Struct & Transaction Manager ใน Go" },
        {
          t: "p",
          c: "เราจะสร้าง `Store` struct ที่สืบทอดความสามารถของ `Queries` มาทั้งหมด และเพิ่มความสามารถในการเปิด Transaction จัดการ `BEGIN`, `COMMIT`, และ `ROLLBACK`:",
        },
        {
          t: "code",
          lang: "go",
          label: "db/store.go",
          c: `// สร้าง Store struct สืบทอดความสามารถของ Queries มาทั้งหมด
// และเพิ่มความสามารถในการเปิด Transaction จัดการ BEGIN, COMMIT, และ ROLLBACK

// ทำเพื่อแก้ปัญหา: เวลาเขียนคำสั่ง Query หลายๆ ตัวเรียงกัน เราต้องการระบบเปิด-ปิด Transaction มาครอบไว้
// เพื่อความปลอดภัยของข้อมูลตามหลัก ACID

package db

import (
	"context"
	"database/sql"
	"fmt"
)

// Store ครอบคลุมทั้งฟังก์ชันการคิวรีรายตัว และการทำงานร่วมกันเป็น Transaction
// สร้าง Store struct มาให้มัดรวมตัวแปรเชื่อมฐานข้อมูล db กับคำสั่งคิวรี (Queries) เป็นก้อนเดียวกัน
type Store struct {
	*Queries
	db *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{
		db:      db,
		Queries: New(db),
	}
}

// execTx เป็นฟังก์ชันภายในที่ควบคุมรอบชีวิต (Cycle) ของ Transaction อย่างปลอดภัย
// สร้าง execTx มาทำหน้าที่เป็น Template ในการรัน Transaction โดยที่เราไม่ต้องมานั่งเขียนคำสั่ง
// db.BeginTx, tx.Rollback, tx.Commit ซ้ำๆ ทุกครั้งเวลาจะทำระบบอะไรก็ตาม
func (store *Store) execTx(ctx context.Context, fn func(*Queries) error) error {
	// 1. สั่งให้ฐานข้อมูลเปิด Transaction (เริ่มกระบวนการคุมข้อมูลแบบ ACID)
	tx, err := store.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	// 2. สร้างตัว Query ชุดใหม่ q โดยให้ทำงานอยู่ภายใต้ Transaction (tx) ที่เพิ่งเปิดไปด้านบน
	q := New(tx)

	// 3. รันฟังก์ชันคำสั่งที่เราส่งเข้ามา (เช่น Withdraw, Transfers) โดยส่งตัว Query (q) ให้มันไปใช้รันต่อ
	err = fn(q)

	// 4. เช็กว่าฟังก์ชันที่รันไปมี Error หรือไม่
	if err != nil {
		// ถ้ามี Error ให้ Rollback ทันที เพื่อยกเลิกทุกอย่างที่ทำไปใน Transaction
		if rbErr := tx.Rollback(); rbErr != nil {
			return fmt.Errorf("tx err: %v, rollback err: %v", err, rbErr)
		}
		return err // ส่ง Error ออกไปบอกตัวเรียกใช้งาน
	}

	// 5. ถ้าไม่มี Error เลย แปลว่าผ่าน ให้สั่ง Commit เพื่อบันทึกข้อมูลลงไปถาวร
	return tx.Commit()
}`,
        },
        {
          t: "h3", c: "ทำไม Callback Pattern นี้ถึงยอดเยี่ยม?" },
        {
          t: "ul",
          c: [
            "**ไร้ความผิดพลาดจากการลืม Rollback**: หากเขียน `tx.Begin()` และจัดการ Rollback แบบกระจายในทุกจุดของโค้ด โปรแกรมเมอร์มีโอกาสสูงมากที่จะลืมใส่ Rollback ในบางกิ่งเงื่อนไข แต่ฟังก์ชัน `execTx` จะรับผิดชอบการ Rollback ในที่เดียวเสมอ",
            "**แยกหน้าที่ชัดเจน (Separation of Concerns)**: โค้ด Business Logic มีหน้าที่แค่เขียนคำสั่งว่าต้องการทำอะไรบ้าง ถ้ามีปัญหาก็แค่ `return err` ออกมา แล้ว `execTx` จะเก็บกวาดให้เรียบร้อย",
            "**ความปลอดภัยสูง**: คำสั่งทั้งหมดใน `fn(q)` จะทำงานบน `*sql.Tx` เดียวกัน ทำให้ได้รับคุณสมบัติ Atomicity ครบถ้วน",
          ],
        },
        {
          t: "callout",
          title: "🛡️ กลไก Auto Rollback ทำงานอย่างไร?",
          c: "เมื่อมีขั้นตอนใดก็ตามภายใน `fn(q)` ส่งคืน `err != nil` (เช่น บัญชีปลายทางไม่มีอยู่จริง หรือยอดเงินไม่พอ) ฟังก์ชัน `execTx` จะกระโดดเข้าบล็อก `tx.Rollback()` ทันที ทำให้ทุกคำสั่ง SQL ที่รันไปก่อนหน้านั้นถูกยกเลิกทั้งหมด ข้อมูลเงินในฐานข้อมูลจึงกลับคืนสู่สภาพเดิม 100% เสมือนว่าไม่เคยมีธุรกรรมนี้เกิดขึ้น ปลอดภัยตามหลักการ Atomicity",
        },
      ],
      en: [],
    },
  },

  "bank-money-transfer-logic": {
    slug: "bank-money-transfer-logic",
    title: {
      th: "โค้ดระบบโอนเงิน 5 ขั้นตอน (TransferTx)",
      en: "Money Transfer Logic — 5-Step Atomic Transaction",
    },
    lead: {
      th: "ลงมือเขียนฟังก์ชัน TransferTx ที่ร้อยเรียง 5 ขั้นตอนของการโอนเงินจริงเข้าด้วยกันใน 1 Transaction พร้อมส่งคืนข้อมูลบัญชีใหม่ให้ผู้ใช้ทราบทันที",
      en: "Implementing the 5-step atomic TransferTx method and returning updated balances in a single transaction.",
    },
    group: "3. Data Store & ACID Transactions",
    blocks: {
      th: [
        {
          t: "p",
          c: "มาถึงหัวใจหลักของระบบธนาคารแล้ว! การโอนเงินจากบัญชี A ไปยังบัญชี B ไม่ใช่แค่การเปลี่ยนตัวเลข แต่ต้องสร้างหลักฐานใน Ledger และบันทึกประวัติให้ครบถ้วน ซึ่งประกอบด้วย **5 ขั้นตอนที่ต้องสำเร็จพร้อมกัน** ดังนี้:",
        },
        {
          t: "ol",
          c: [
            "**สร้างแถวประวัติการโอนเงิน** ในตาราง `transfers` (บันทึกว่าจาก A ไป B จำนวนเท่าไหร่)",
            "**สร้าง Entry ฝั่งเงินออก** ในตาราง `entries` ของบัญชี A (amount ติดลบ เช่น -100)",
            "**สร้าง Entry ฝั่งเงินเข้า** ในตาราง `entries` ของบัญชี B (amount เป็นบวก เช่น +100)",
            "**หักเงินจากบัญชี A** ในตาราง `accounts` (balance ลดลง)",
            "**เพิ่มเงินเข้าบัญชี B** ในตาราง `accounts` (balance เพิ่มขึ้น)",
          ],
        },

        { t: "h2", c: "เขียน Struct สำหรับ Request และ Result" },
        {
          t: "p",
          c: "เราจะนิยามพารามิเตอร์ที่ต้องรับเข้ามา และผลลัพธ์ที่ต้องส่งกลับออกไปให้ผู้ใช้งาน:",
        },
        {
          t: "code",
          lang: "go",
          label: "db/transfer_types.go",
          c: `// นิยาม Struct สำหรับพารามิเตอร์ขาเข้า (Input) และผลลัพธ์ขาออก (Output) ของธุรกรรมการโอนเงิน
// ทำเพื่อแก้ปัญหา: มัดรวมข้อมูลที่เกี่ยวข้องกับการโอนเงินเป็นก้อนเดียว เพื่อให้ส่งผ่านและตรวจสอบข้อมูลได้ง่ายและปลอดภัย
package db

// TransferTxParams คือข้อมูลที่ต้องใช้ในการสั่งโอนเงินระหว่าง 2 บัญชี
type TransferTxParams struct {
	FromAccountID int64 \`json:"from_account_id"\` // รหัสบัญชีผู้โอน (ต้นทาง)
	ToAccountID   int64 \`json:"to_account_id"\`   // รหัสบัญชีผู้รับ (ปลายทาง)
	Amount        int64 \`json:"amount"\`          // จำนวนเงินที่ต้องการโอน (หน่วยย่อยที่สุด: สตางค์/เซนต์)
}

// TransferTxResult คือผลลัพธ์ที่ได้หลังจากโอนเงินสำเร็จ เพื่อส่งกลับให้หน้าบ้านแสดงผล
type TransferTxResult struct {
	Transfer    Transfer \`json:"transfer"\`     // ข้อมูลบันทึกประวัติการโอนเงิน (มี Transfer ID ไว้อ้างอิง)
	FromAccount Account  \`json:"from_account"\` // บัญชีต้นทางพร้อมยอดเงินคงเหลือใหม่ล่าสุด (หลังหักเงิน)
	ToAccount   Account  \`json:"to_account"\`   // บัญชีปลายทางพร้อมยอดเงินคงเหลือใหม่ล่าสุด (หลังรับเงิน)
	FromEntry   Entry    \`json:"from_entry"\`   // หลักฐาน Ledger เงินออกจากบัญชีต้นทาง (ยอดลบ)
	ToEntry     Entry    \`json:"to_entry"\`     // หลักฐาน Ledger เงินเข้าบัญชีปลายทาง (ยอดบวก)
}`,
        },

        { t: "h2", c: "โค้ดเต็มของฟังก์ชัน `TransferTx`" },
        {
          t: "p",
          c: "ดูโค้ดด้านล่าง และสังเกตการเรียกใช้ `execTx` เพื่อรวมทุกขั้นตอนเข้าด้วยกัน:",
        },
        {
          t: "code",
          lang: "go",
          label: "db/store_transfer.go",
          c: `// TransferTx รวม 5 ขั้นตอนของการโอนเงินจริงเข้าด้วยกันใน 1 Transaction
// ทำเพื่อแก้ปัญหา: ป้องกันเงินสูญหายระหว่างทาง (Partial Failure) หากตัดเงินต้นทางได้แต่ปลายทางล้มเหลว
// ทุกขั้นตอนจะถูกครอบด้วย execTx หากขั้นตอนใดมี Error ระบบจะ Rollback คืนค่าเดิมทันที

package db

import "context"

// TransferTx รันการโอนเงินจากบัญชีหนึ่งไปยังอีกบัญชีหนึ่งใน 1 Transaction อย่างปลอดภัย
func (store *Store) TransferTx(ctx context.Context, arg TransferTxParams) (TransferTxResult, error) {
	var result TransferTxResult

	// เรียกใช้ execTx เพื่อเปิด Transaction และครอบทุกขั้นตอนไว้ด้วยกัน
	err := store.execTx(ctx, func(q *Queries) error {
		var err error

		// 1. สร้างแถวในตาราง transfers เพื่อบันทึกหลักฐานประวัติการโอนเงิน
		result.Transfer, err = q.CreateTransfer(ctx, CreateTransferParams{
			FromAccountID: arg.FromAccountID,
			ToAccountID:   arg.ToAccountID,
			Amount:        arg.Amount,
		})
		if err != nil {
			return err
		}

		// 2. สร้าง Entry เงินออกของบัญชีต้นทาง (ยอดเงินติดลบใน Ledger)
		result.FromEntry, err = q.CreateEntry(ctx, CreateEntryParams{
			AccountID: arg.FromAccountID,
			Amount:    -arg.Amount,
		})
		if err != nil {
			return err
		}

		// 3. สร้าง Entry เงินเข้าของบัญชีปลายทาง (ยอดเงินเป็นบวกใน Ledger)
		result.ToEntry, err = q.CreateEntry(ctx, CreateEntryParams{
			AccountID: arg.ToAccountID,
			Amount:    arg.Amount,
		})
		if err != nil {
			return err
		}

		// 4. ตัดยอดเงินคงเหลือจากบัญชีต้นทาง (หักเงินออก)
		result.FromAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{
			ID:     arg.FromAccountID,
			Amount: -arg.Amount,
		})
		if err != nil {
			return err
		}

		// 5. เพิ่มยอดเงินคงเหลือให้บัญชีปลายทาง (โอนเงินเข้า)
		result.ToAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{
			ID:     arg.ToAccountID,
			Amount: arg.Amount,
		})
		if err != nil {
			return err
		}

		// ทุกขั้นตอนสำเร็จ ไม่มี Error ให้คืนค่า nil เพื่อสั่ง Commit
		return nil
	})

	return result, err
}`,
        },
        {
          t: "h3", c: "อธิบายโค้ดทีละบรรทัด" },
        {
          t: "ul",
          c: [
            "**`store.execTx(...)`**: เปิด Transaction ขึ้นมา หากเกิด error ในขั้นตอนใดขั้นตอนหนึ่ง ตัว Transaction Manager จะสั่ง Rollback คืนค่าข้อมูลทุกอย่างอัตโนมัติ",
            "**`CreateTransfer(...)`**: สร้างบันทึกประวัติการโอนเงินทันที ทำให้เราได้ `Transfer.ID` มาเป็นหลักฐานอ้างอิง",
            "**`-arg.Amount`**: สังเกตเครื่องหมายลบหน้า `arg.Amount` ในตอนสร้าง FromEntry และ AddAccountBalance บัญชี A เป็นการตัดเงินออกอย่างชัดเจน",
            "**`result.ToAccount`**: เราบันทึกสถานะล่าสุดของบัญชีที่อัปเดตแล้วลงในตัวแปร `result` เพื่อส่งกลับไปให้หน้าบ้านแสดงผลได้ทันทีว่า ยอดเงินคงเหลือใหม่เป็นเท่าใด",
          ],
        },
        {
          t: "callout",
          title: "🚨 สัญญาณเตือน: โค้ดนี้ดูสมบูรณ์แบบแล้ว... หรือยัง?",
          c: "ถ้าเรารันโค้ดนี้ในสภาพแวดล้อมที่มีผู้ใช้คนเดียว ทุกอย่างจะทำงานได้ราบรื่น 100% แต่ถ้ามีผู้ใช้ 100 คน กดยิงโอนเงินพร้อมกันในเสี้ยววินาทีเดียวกัน ระบบนี้จะเกิดปัญหา 'Race Condition' และ 'Deadlock' ทันที! มาดูกันว่าทำไมในบทถัดไป",
          warn: true,
        },
      ],
      en: [],
    },
  },
};
