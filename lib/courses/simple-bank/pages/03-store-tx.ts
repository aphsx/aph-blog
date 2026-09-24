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
          c: `package db

import (
	"database/sql"
	"time"

	_ "github.com/lib/pq" // postgres driver
)

func NewDB(dataSourceName string) (*sql.DB, error) {
	db, err := sql.Open("postgres", dataSourceName)
	if err != nil {
		return nil, err
	}

	// ตั้งค่า Connection Pool
	db.SetMaxOpenConns(25)                  // จำนวน connection สูงสุดที่เปิดพร้อมกันได้
	db.SetMaxIdleConns(25)                  // จำนวน connection ที่รอสแตนด์บายไว้ใน pool
	db.SetConnMaxLifetime(5 * time.Minute)  // อายุสูงสุดของแต่ละ connection ก่อนจะถูกรีเฟรชใหม่

	// ทดสอบว่าเชื่อมต่อฐานข้อมูลได้จริงหรือไม่
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
          c: `package db

import "time"

type Account struct {
	ID        int64     \`json:"id"\`
	Owner     string    \`json:"owner"\`
	Balance   int64     \`json:"balance"\`
	Currency  string    \`json:"currency"\`
	CreatedAt time.Time \`json:"created_at"\`
}

type Entry struct {
	ID        int64     \`json:"id"\`
	AccountID int64     \`json:"account_id"\`
	Amount    int64     \`json:"amount"\` // บวก = เงินเข้า, ลบ = เงินออก
	CreatedAt time.Time \`json:"created_at"\`
}

type Transfer struct {
	ID            int64     \`json:"id"\`
	FromAccountID int64     \`json:"from_account_id"\`
	ToAccountID   int64     \`json:"to_account_id"\`
	Amount        int64     \`json:"amount"\`
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
          c: `package db

import (
	"context"
	"database/sql"
)

// DBTX เป็นอินเทอร์เฟซที่รวมฟังก์ชันที่มีทั้งใน *sql.DB และ *sql.Tx
type DBTX interface {
	ExecContext(context.Context, string, ...interface{}) (sql.Result, error)
	PrepareContext(context.Context, string) (*sql.Stmt, error)
	QueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)
	QueryRowContext(context.Context, string, ...interface{}) *sql.Row
}

type Queries struct {
	db DBTX
}

func New(db DBTX) *Queries {
	return &Queries{db: db}
}

// WithTx ช่วยให้เปลี่ยนตัวรันคิวรีไปเป็น Transaction ชั่วคราวได้
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
          c: `package db

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

func (q *Queries) CreateAccount(ctx context.Context, arg CreateAccountParams) (Account, error) {
	row := q.db.QueryRowContext(ctx, createAccount, arg.Owner, arg.Balance, arg.Currency)
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

func (q *Queries) GetAccount(ctx context.Context, id int64) (Account, error) {
	row := q.db.QueryRowContext(ctx, getAccount, id)
	var i Account
	err := row.Scan(
		&i.ID,
		&i.Owner,
		&i.Balance,
		&i.Currency,
		&i.CreatedAt,
	)
	return i, err
}`,
        },
        {
          t: "h3", c: "อธิบายโค้ดทีละบรรทัดอย่างละเอียด" },
        {
          t: "ul",
          c: [
            "**`$1, $2, $3` (Placeholder)**: เป็นการส่งตัวแปรเข้าไปในคำสั่ง SQL แบบ Parameterized Query ซึ่ง PostgreSQL จะแยกตัวคำสั่งออกจากข้อมูล ทำให้ปลอดภัยจากการโจมตีแบบ **SQL Injection 100%** (ห้ามต่อ String แบบ `fmt.Sprintf` เด็ดขาด!)",
            "**`RETURNING id, owner, ...`**: เป็นคำสั่งพิเศษของ PostgreSQL ที่ช่วยให้เราดึงข้อมูลแถวที่เพิ่งถูก `INSERT` กลับมาได้ทันทีในรอบเดียว โดยไม่ต้องยิงคำสั่ง `SELECT` ซ้ำอีกรอบ",
            "**`q.db.QueryRowContext(ctx, ...)`**: ยิงคำสั่ง SQL ที่คาดหวังผลลัพธ์กลับมาเพียงแถวเดียว พร้อมส่ง Context เพื่อให้ยกเลิกการทำงานได้หากเกิด Timeout",
            "**`row.Scan(&i.ID, ...)`**: อ่านค่าจากแต่ละคอลัมน์ของแถวที่ได้จากฐานข้อมูล นำมาแม็ปใส่ในฟิลด์ของ struct ผ่าน Pointer (`&`) หากไม่พบคอลัมน์หรือชนิดข้อมูลไม่ตรง จะส่ง Error ออกมาทันที",
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
          c: `package db

import (
	"context"
	"database/sql"
	"fmt"
)

// Store ครอบคลุมทั้งฟังก์ชันการคิวรีรายตัว และการทำงานร่วมกันเป็น Transaction
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

// execTx เป็นฟังก์ชันภายในที่ควบคุมรอบชีวิตของ Transaction อย่างปลอดภัย
func (store *Store) execTx(ctx context.Context, fn func(*Queries) error) error {
	tx, err := store.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	q := New(tx) // สร้าง Queries ชุดใหม่ที่รันอยู่บน Transaction นี้
	err = fn(q)  // รัน Callback Function ที่ส่งเข้ามา
	if err != nil {
		// หากเกิด Error ให้สั่งย้อนกลับทันที
		if rbErr := tx.Rollback(); rbErr != nil {
			return fmt.Errorf("tx err: %v, rollback err: %v", err, rbErr)
		}
		return err
	}

	// หากคำสั่งทุกอย่างสำเร็จ ไม่มี Error ให้สั่งยืนยันบันทึกข้อมูล
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
          c: `package db

// TransferTxParams คือข้อมูลที่ต้องใช้ในการสั่งโอนเงิน
type TransferTxParams struct {
	FromAccountID int64 \`json:"from_account_id"\`
	ToAccountID   int64 \`json:"to_account_id"\`
	Amount        int64 \`json:"amount"\`
}

// TransferTxResult คือผลลัพธ์ที่ได้หลังจากโอนเงินสำเร็จ
type TransferTxResult struct {
	Transfer    Transfer \`json:"transfer"\`
	FromAccount Account  \`json:"from_account"\`
	ToAccount   Account  \`json:"to_account"\`
	FromEntry   Entry    \`json:"from_entry"\`
	ToEntry     Entry    \`json:"to_entry"\`
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
          c: `package db

import "context"

// TransferTx รันการโอนเงินจากบัญชีหนึ่งไปยังอีกบัญชีหนึ่งใน 1 Transaction
func (store *Store) TransferTx(ctx context.Context, arg TransferTxParams) (TransferTxResult, error) {
	var result TransferTxResult

	err := store.execTx(ctx, func(q *Queries) error {
		var err error

		// สเต็ปที่ 1: สร้างแถวในตาราง transfers
		result.Transfer, err = q.CreateTransfer(ctx, CreateTransferParams{
			FromAccountID: arg.FromAccountID,
			ToAccountID:   arg.ToAccountID,
			Amount:        arg.Amount,
		})
		if err != nil {
			return err
		}

		// สเต็ปที่ 2: สร้าง entry เงินออกของบัญชีต้นทาง (ลบเงิน)
		result.FromEntry, err = q.CreateEntry(ctx, CreateEntryParams{
			AccountID: arg.FromAccountID,
			Amount:    -arg.Amount,
		})
		if err != nil {
			return err
		}

		// สเต็ปที่ 3: สร้าง entry เงินเข้าของบัญชีปลายทาง (บวกเงิน)
		result.ToEntry, err = q.CreateEntry(ctx, CreateEntryParams{
			AccountID: arg.ToAccountID,
			Amount:    arg.Amount,
		})
		if err != nil {
			return err
		}

		// สเต็ปที่ 4: หักเงินจากบัญชี A (ต้นทาง)
		result.FromAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{
			ID:     arg.FromAccountID,
			Amount: -arg.Amount,
		})
		if err != nil {
			return err
		}

		// สเต็ปที่ 5: เพิ่มเงินเข้าบัญชี B (ปลายทาง)
		result.ToAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{
			ID:     arg.ToAccountID,
			Amount: arg.Amount,
		})
		if err != nil {
			return err
		}

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
