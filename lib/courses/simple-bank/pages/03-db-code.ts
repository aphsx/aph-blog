import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/03-db-code.ts
// โมดูล 3: เชื่อมต่อฐานข้อมูล & Unit Test
// บทเรียน: 3.1 bank-db-store-crud, 3.2 bank-unit-testing
// =============================================================================

export const dbCodePages: Record<string, Page> = {
  "bank-db-store-crud": {
    slug: "bank-db-store-crud",
    title: {
      th: "3.1 Data Store & การเขียน Raw SQL CRUD",
      en: "3.1 Data Store & Raw SQL CRUD in Go",
    },
    lead: {
      th: "เชื่อมต่อ PostgreSQL ด้วย database/sql และไดรเวอร์ pgx v5 พร้อม Connection Pool และสร้าง DBTX Interface สำหรับรัน CRUD อย่างปลอดภัย ไร้ SQL Injection",
      en: "Connect Go to PostgreSQL with database/sql and pgx v5 driver, configure connection pools, and build safe CRUD with DBTX interface.",
    },
    group: "3. เชื่อมต่อฐานข้อมูล & Unit Test",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• เชื่อมต่อ PostgreSQL ด้วย `database/sql` ผ่านไดรเวอร์ประสิทธิภาพสูง `pgx/v5`\n• ตั้งค่า Connection Pooling เพื่อรองรับ Concurrency สูงอย่างปลอดภัย\n• เข้าใจแพทเทิร์น `DBTX` Interface และเขียนคำสั่ง CRUD แบบ Parameterized Query ป้องกัน SQL Injection 100%\n\n⏱ **เวลาในการเรียนรู้**: ~25 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านโมดูล 2 รัน PostgreSQL สำเร็จแล้ว",
        },
        {
          "t": "h2",
          "c": "1. ทำไมเราถึงเลือกใช้ Raw SQL แทน ORM?",
        },
        {
          "t": "p",
          "c": "ในวงการพัฒนาระบบ Backend ระดับสูงและระบบการเงิน วิศวกรส่วนใหญ่นิยมใช้ **Raw SQL (Parameterized Query)** มากกว่า ORM ตัวหนาๆ (เช่น GORM) ด้วยเหตุผลสำคัญ 3 ประการ:",
        },
        {
          "t": "ol",
          "c": [
            "**Performance & Zero Overhead**: ไม่มี Layer แปลงโค้ดที่แอบทำ Reflection ช้าๆ ซ้อนอยู่ คำสั่ง SQL ถูกส่งตรงไปยังฐานข้อมูลทันที",
            "**Total Control over Queries**: เราเห็นชัดเจนว่าฐานข้อมูลกำลังทำอะไร มี Index Scan หรือไม่ และล็อกแถวข้อมูลอย่างไร ไม่มีคำสั่งซ่อนเร้นที่ไม่คาดฝัน",
            "**Easier Concurrency Tuning**: เมื่อต้องเขียนคำสั่งล็อกระดับแถว (`SELECT FOR UPDATE`) หรือปรับระดับ Transaction Isolation ในโมดูลที่ 4 และ 5 การเขียน Raw SQL จะตรงไปตรงมาและตรวจสอบได้ง่ายที่สุด",
          ],
        },
        {
          "t": "h2",
          "c": "2. ติดตั้งไดรเวอร์ pgx v5",
        },
        {
          "t": "p",
          "c": "ใน Go ไลบรารีมาตรฐาน `database/sql` จะทำหน้าที่เป็นตัวกลาง และเราต้องติดตั้ง Driver ของ PostgreSQL โดยตัวที่ได้รับความนิยมและมีประสิทธิภาพสูงสุดในปัจจุบันคือ `jackc/pgx/v5`:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ดาวน์โหลดไลบรารี pgx v5 เข้าสู่โปรเจกต์",
          "code": "go get github.com/jackc/pgx/v5\ngo mod tidy",
          "out": "go: added github.com/jackc/pgx/v5 v5.11.0",
        },
        {
          "t": "h2",
          "c": "3. เชื่อมต่อฐานข้อมูล & Connection Pooling (db.go)",
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/db/db.go` โดยเขียนฟังก์ชัน `Open` ที่ทำการตั้งค่า Connection Pool ให้พร้อมรองรับทราฟฟิกสูง และนิยาม `DBTX` Interface:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/db.go",
          "c": "package db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"time\"\n\n\t_ \"github.com/jackc/pgx/v5/stdlib\" // ลงทะเบียนไดรเวอร์ \"pgx\" เข้ากับ database/sql\n)\n\n// Open เปิดการเชื่อมต่อไปยัง PostgreSQL พร้อมกำหนดค่า Connection Pool\nfunc Open(dsn string) (*sql.DB, error) {\n\tconn, err := sql.Open(\"pgx\", dsn)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\n\tconn.SetMaxOpenConns(25)\n\tconn.SetMaxIdleConns(25)\n\tconn.SetConnMaxLifetime(5 * time.Minute)\n\n\tif err := conn.Ping(); err != nil {\n\t\treturn nil, err\n\t}\n\treturn conn, nil\n}\n\n// DBTX คือ Interface กลางที่รวมเมธอดรันคำสั่ง SQL ที่มีทั้งใน *sql.DB และ *sql.Tx\ntype DBTX interface {\n\tExecContext(ctx context.Context, query string, args ...any) (sql.Result, error)\n\tQueryContext(ctx context.Context, query string, args ...any) (*sql.Rows, error)\n\tQueryRowContext(ctx context.Context, query string, args ...any) *sql.Row\n}\n\n// Queries เป็นตัวรวมคำสั่ง SQL ทั้งหมด โดยสามารถรับได้ทั้ง DB ปกติ หรือ Tx ก็ได้\ntype Queries struct {\n\tdb DBTX\n}\n\nfunc New(db DBTX) *Queries {\n\treturn &Queries{db: db}\n}",
        },
        {
          "t": "h2",
          "c": "4. สร้างโมเดลข้อมูล (models.go)",
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/db/models.go` เพื่อให้ตรงกับ Schema ในฐานข้อมูล:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/models.go",
          "c": "package db\n\nimport \"time\"\n\ntype Account struct {\n\tID        int64     `json:\"id\"`\n\tOwner     string    `json:\"owner\"`\n\tBalance   int64     `json:\"balance\"`\n\tCurrency  string    `json:\"currency\"`\n\tCreatedAt time.Time `json:\"created_at\"`\n}\n\ntype Entry struct {\n\tID        int64     `json:\"id\"`\n\tAccountID int64     `json:\"account_id\"`\n\tAmount    int64     `json:\"amount\"`\n\tCreatedAt time.Time `json:\"created_at\"`\n}\n\ntype Transfer struct {\n\tID            int64     `json:\"id\"`\n\tFromAccountID int64     `json:\"from_account_id\"`\n\tToAccountID   int64     `json:\"to_account_id\"`\n\tAmount        int64     `json:\"amount\"`\n\tCreatedAt     time.Time `json:\"created_at\"`\n}",
        },
        {
          "t": "h2",
          "c": "5. เขียนคำสั่ง CRUD สำหรับ Account (account.go)",
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/db/account.go` โดยใช้คำสั่งแบบ Parameterized (`$1, $2, ...`) ป้องกัน SQL Injection เสมอ:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account.go",
          "c": "package db\n\nimport \"context\"\n\nconst accountColumns = \"id, owner, balance, currency, created_at\"\n\ntype CreateAccountParams struct {\n\tOwner    string\n\tBalance  int64\n\tCurrency string\n}\n\nfunc (q *Queries) CreateAccount(ctx context.Context, arg CreateAccountParams) (Account, error) {\n\tquery := `INSERT INTO accounts (owner, balance, currency)\nVALUES ($1, $2, $3)\nRETURNING ` + accountColumns\n\n\trow := q.db.QueryRowContext(ctx, query, arg.Owner, arg.Balance, arg.Currency)\n\tvar a Account\n\terr := row.Scan(&a.ID, &a.Owner, &a.Balance, &a.Currency, &a.CreatedAt)\n\treturn a, err\n}\n\nfunc (q *Queries) GetAccount(ctx context.Context, id int64) (Account, error) {\n\tquery := `SELECT ` + accountColumns + ` FROM accounts WHERE id = $1`\n\trow := q.db.QueryRowContext(ctx, query, id)\n\tvar a Account\n\terr := row.Scan(&a.ID, &a.Owner, &a.Balance, &a.Currency, &a.CreatedAt)\n\treturn a, err\n}\n\ntype ListAccountsParams struct {\n\tOwner  string\n\tLimit  int32\n\tOffset int32\n}\n\nfunc (q *Queries) ListAccounts(ctx context.Context, arg ListAccountsParams) ([]Account, error) {\n\tquery := `SELECT ` + accountColumns + ` FROM accounts\nWHERE owner = $1\nORDER BY id\nLIMIT $2 OFFSET $3`\n\n\trows, err := q.db.QueryContext(ctx, query, arg.Owner, arg.Limit, arg.Offset)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\tdefer rows.Close()\n\n\taccounts := []Account{}\n\tfor rows.Next() {\n\t\tvar a Account\n\t\tif err := rows.Scan(&a.ID, &a.Owner, &a.Balance, &a.Currency, &a.CreatedAt); err != nil {\n\t\t\treturn nil, err\n\t\t}\n\t\taccounts = append(accounts, a)\n\t}\n\treturn accounts, rows.Err()\n}\n\ntype AddAccountBalanceParams struct {\n\tID     int64\n\tAmount int64\n}\n\n// AddAccountBalance เพิ่มหรือลดยอดเงินแบบ Atomic ด้วยคำสั่ง SQL ในแถวเดียว\nfunc (q *Queries) AddAccountBalance(ctx context.Context, arg AddAccountBalanceParams) (Account, error) {\n\tquery := `UPDATE accounts\nSET balance = balance + $2\nWHERE id = $1\nRETURNING ` + accountColumns\n\n\trow := q.db.QueryRowContext(ctx, query, arg.ID, arg.Amount)\n\tvar a Account\n\terr := row.Scan(&a.ID, &a.Owner, &a.Balance, &a.Currency, &a.CreatedAt)\n\treturn a, err\n}\n\nfunc (q *Queries) DeleteAccount(ctx context.Context, id int64) error {\n\t_, err := q.db.ExecContext(ctx, `DELETE FROM accounts WHERE id = $1`, id)\n\treturn err\n}",
        },
        {
          "t": "h2",
          "c": "6. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ทำไมเราต้องใส่ defer rows.Close() ทันทีหลังจากที่ q.db.QueryContext สำเร็จ?",
              "options": [
                {
                  "text": "เพื่อคืน Connection กลับเข้าสู่ Connection Pool ป้องกันปัญหา Connection Leak ที่ทำให้เซิร์ฟเวอร์ค้างเมื่อมีทราฟฟิกสูง",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! ขณะที่อ่าน rows ตัว Connection จะถูกจองไว้คนเดียว หากลืมปิด Connection ใน Pool จะหมดลงอย่างรวดเร็ว",
                },
                {
                  "text": "เพื่อลบแถวข้อมูลออกจากฐานข้อมูล",
                  "isCorrect": false,
                  "explain": "rows.Close() เป็นการปิดตัวอ่านใน Go ไม่ได้ลบข้อมูลใน DB",
                },
                {
                  "text": "เพื่อบันทึกการเปลี่ยนแปลง Transaction",
                  "isCorrect": false,
                  "explain": "การบันทึก Transaction ใช้ tx.Commit() ไม่ใช่ rows.Close()",
                },
              ],
            },
          ],
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "เขียนฟังก์ชัน CRUD เสร็จแล้ว แต่เราจะมั่นใจได้อย่างไรว่ามันทำงานถูกต้องจริง? ในบทที่ **3.2 เขียน Unit Test ระบบธนาคารด้วย Testify** เราจะมาเขียนชุดทดสอบอัตโนมัติพิสูจน์โค้ดกันครับ",
        },
      ],
      en: [],
    },
  },

  "bank-unit-testing": {
    slug: "bank-unit-testing",
    title: {
      th: "3.2 เขียน Unit Test ระบบธนาคารด้วย Testify",
      en: "3.2 Unit Testing Bank Operations with Testify",
    },
    lead: {
      th: "พิสูจน์ความถูกต้องของโค้ด CRUD ทุกฟังก์ชันด้วย Testify/Require พร้อมสร้างระบบ Random Data Generator และ TestMain Lifecycle",
      en: "Verify every CRUD operation with testify/require, random data generators, and TestMain lifecycle management.",
    },
    group: "3. เชื่อมต่อฐานข้อมูล & Unit Test",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• ใช้ `github.com/stretchr/testify/require` เขียน Assertion ที่อ่านง่ายและหยุดทำงานทันทีเมื่อผิดพลาด\n• เข้าใจฟังก์ชัน `TestMain(m *testing.M)` ในการเปิด Connection DB เพียงครั้งเดียวเพื่อใช้ร่วมกันในทุก Test\n• สร้างฟังก์ชันสุ่มข้อมูลทดสอบ (`util/random.go`) เพื่อไม่ให้ข้อมูลใน Test ชนกัน\n\n⏱ **เวลาในการเรียนรู้**: ~20 นาที | **สิ่งที่ต้องมี**: PostgreSQL กำลังรันอยู่บน Docker",
        },
        {
          "t": "h2",
          "c": "1. ติดตั้ง Testify",
        },
        {
          "t": "p",
          "c": "แพ็กเกจ `testing` ดั้งเดิมของ Go บังคับให้เขียน `if err != nil { t.Errorf(...) }` ซ้ำๆ ทุกบรรทัด ในโปรเจกต์ระดับมืออาชีพจึงนิยมใช้ **Testify** ซึ่งมีฟังก์ชันช่วยตรวจสอบ (Assertion) เช่น `require.NoError`, `require.Equal` ที่กระชับและชัดเจน:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ติดตั้ง Testify",
          "code": "go get github.com/stretchr/testify\ngo mod tidy",
          "out": "go: added github.com/stretchr/testify v1.11.1",
        },
        {
          "t": "h2",
          "c": "2. ตัวสุ่มข้อมูลสำหรับ Test (util/random.go)",
        },
        {
          "t": "p",
          "c": "การรันเทสต์ซ้ำๆ ไม่ควรใช้ชื่อบัญชีเดิม (เช่น `alice` หรือ `bob`) ซ้ำๆ เพราะข้อมูลจะปนกันและทำให้การทดสอบคลาดเคลื่อน เราสร้างตัวสุ่มข้อมูลขึ้นมาใช้งานใน `simplebank/util/random.go`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/random.go",
          "c": "package util\n\nimport (\n\t\"math/rand/v2\"\n\t\"strings\"\n)\n\nconst alphabet = \"abcdefghijklmnopqrstuvwxyz\"\n\n// RandomInt สุ่มเลขระหว่าง min ถึง max\nfunc RandomInt(min, max int64) int64 {\n\treturn min + rand.Int64N(max-min+1)\n}\n\n// RandomString สุ่มตัวอักษรภาษาอังกฤษความยาว n ตัว\nfunc RandomString(n int) string {\n\tvar sb strings.Builder\n\tfor range n {\n\t\tsb.WriteByte(alphabet[rand.IntN(len(alphabet))])\n\t}\n\treturn sb.String()\n}\n\nfunc RandomOwner() string    { return RandomString(6) }\nfunc RandomMoney() int64    { return RandomInt(0, 1000) }\nfunc RandomCurrency() string {\n\tcurrencies := []string{\"USD\", \"EUR\", \"THB\"}\n\treturn currencies[rand.IntN(len(currencies))]\n}",
        },
        {
          "t": "h2",
          "c": "3. เตรียมฐานข้อมูลก่อนเริ่มรันเทสต์ (main_test.go)",
        },
        {
          "t": "p",
          "c": "ใน Go หากเราตั้งชื่อฟังก์ชันว่า `TestMain(m *testing.M)` Go จะเรียกฟังก์ชันนี้เป็นอันดับแรกก่อนเทสต์ใดๆ ในแพ็กเกจจะเริ่มรัน ทำให้เราเปิด Connection สู่ฐานข้อมูลเพียงครั้งเดียวได้:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/main_test.go",
          "c": "package db\n\nimport (\n\t\"database/sql\"\n\t\"log\"\n\t\"os\"\n\t\"testing\"\n)\n\nconst defaultTestDBSource = \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\"\n\nvar testDB *sql.DB\nvar testQueries *Queries\n\nfunc TestMain(m *testing.M) {\n\tdsn := os.Getenv(\"DB_SOURCE\")\n\tif dsn == \"\" {\n\t\tdsn = defaultTestDBSource\n\t}\n\n\tvar err error\n\ttestDB, err = Open(dsn)\n\tif err != nil {\n\t\tlog.Fatal(\"cannot connect to db: \", err)\n\t}\n\ttestQueries = New(testDB)\n\n\tos.Exit(m.Run())\n}",
        },
        {
          "t": "h2",
          "c": "4. เขียน Unit Test สำหรับ Account (account_test.go)",
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/db/account_test.go` โดยเขียนฟังก์ชันตัวช่วย `createRandomAccount` เพื่อนำไปใช้ทดสอบทั้ง Create, Get, AddBalance, Delete, และ List:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account_test.go",
          "c": "package db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"testing\"\n\n\t\"github.com/stretchr/testify/require\"\n\t\"simplebank/util\"\n)\n\nfunc createRandomAccount(t *testing.T) Account {\n\targ := CreateAccountParams{\n\t\tOwner:    util.RandomOwner(),\n\t\tBalance:  util.RandomMoney(),\n\t\tCurrency: util.RandomCurrency(),\n\t}\n\n\taccount, err := testQueries.CreateAccount(context.Background(), arg)\n\trequire.NoError(t, err)\n\trequire.NotEmpty(t, account)\n\trequire.Equal(t, arg.Owner, account.Owner)\n\trequire.Equal(t, arg.Balance, account.Balance)\n\trequire.Equal(t, arg.Currency, account.Currency)\n\trequire.NotZero(t, account.ID)\n\trequire.NotZero(t, account.CreatedAt)\n\treturn account\n}\n\nfunc TestCreateAccount(t *testing.T) {\n\tcreateRandomAccount(t)\n}\n\nfunc TestGetAccount(t *testing.T) {\n\tacc1 := createRandomAccount(t)\n\tacc2, err := testQueries.GetAccount(context.Background(), acc1.ID)\n\trequire.NoError(t, err)\n\trequire.Equal(t, acc1.ID, acc2.ID)\n\trequire.Equal(t, acc1.Owner, acc2.Owner)\n\trequire.Equal(t, acc1.Balance, acc2.Balance)\n}\n\nfunc TestAddAccountBalance(t *testing.T) {\n\tacc1 := createRandomAccount(t)\n\tacc2, err := testQueries.AddAccountBalance(context.Background(), AddAccountBalanceParams{\n\t\tID:     acc1.ID,\n\t\tAmount: 10,\n\t})\n\trequire.NoError(t, err)\n\trequire.Equal(t, acc1.Balance+10, acc2.Balance)\n}\n\nfunc TestDeleteAccount(t *testing.T) {\n\tacc1 := createRandomAccount(t)\n\terr := testQueries.DeleteAccount(context.Background(), acc1.ID)\n\trequire.NoError(t, err)\n\n\tacc2, err := testQueries.GetAccount(context.Background(), acc1.ID)\n\trequire.ErrorIs(t, err, sql.ErrNoRows)\n\trequire.Empty(t, acc2)\n}",
        },
        {
          "t": "h2",
          "c": "5. สั่งรัน Unit Test และดูผลลัพธ์จริง",
        },
        {
          "t": "p",
          "c": "สั่งรันเทสต์ด้วยคำสั่ง `go test -v -cover`:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ผลลัพธ์การรัน Unit Test ของแพ็กเกจ db",
          "code": "go test -v -cover ./db",
          "out": "=== RUN   TestCreateAccount\n--- PASS: TestCreateAccount (0.01s)\n=== RUN   TestGetAccount\n--- PASS: TestGetAccount (0.01s)\n=== RUN   TestAddAccountBalance\n--- PASS: TestAddAccountBalance (0.01s)\n=== RUN   TestDeleteAccount\n--- PASS: TestDeleteAccount (0.01s)\nPASS\ncoverage: 85.7% of statements\nok      simplebank/db   0.082s",
        },
        {
          "t": "h2",
          "c": "6. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ความแตกต่างสำคัญระหว่าง require.NoError(t, err) กับ assert.NoError(t, err) คืออะไร?",
              "options": [
                {
                  "text": "require สั่งหยุดการรันเทสต์ทันที (t.FailNow) เมื่อเงื่อนไขไม่ผ่าน ส่วน assert แค่บันทึกข้อผิดพลาดแต่รันบรรทัดต่อไปเรื่อยๆ จนจบ",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! ในการเทสต์ฐานข้อมูล หากขั้นเตรียมข้อมูลล้มเหลว (เช่น CreateAccount fail) ควรใช้ require เพื่อหยุดทันที ไม่ให้รันต่อจนเกิด nil pointer panic ใน assert ถัดไป"
                },
                {
                  "text": "require ทำงานช้ากว่า assert เพราะต้องรอ network roundtrip",
                  "isCorrect": false,
                  "explain": "ไม่เกี่ยวข้องกัน ทั้งสองฟังก์ชันเป็นเพียง helper assertion ในหน่วยความจำของ testify"
                },
                {
                  "text": "assert จะ rollback transaction ใน DB ให้อัตโนมัติ",
                  "isCorrect": false,
                  "explain": "ไม่มีการแตะต้องฐานข้อมูลทั้งสิ้น เป็นเพียงการตรวจสอบตัวแปร err != nil"
                }
              ],
              "explain": "ข้อสอบจริงในการเขียน Unit Test: ใช้ require กับ Pre-requisite step ที่ห้ามพลาดเด็ดขาด และใช้ assert กับการตรวจสอบค่าผลลัพธ์ย่อยๆ ได้"
            }
          ]
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "CRUD ผ่านการทดสอบเรียบร้อย! แต่การโอนเงินไม่ใช่แค่ CRUD บรรทัดเดียว ในโมดูลที่ 4 บทที่ **4.1 กลไก ACID & การสร้าง Transaction Manager** เราจะมามัดรวม 5 ขั้นตอนให้ปลอดภัย 100% กันครับ",
        },
      ],
      en: [],
    },
  },
};
