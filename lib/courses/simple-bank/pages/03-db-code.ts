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
            "**Easier Concurrency Tuning**: เมื่อต้องเขียนคำสั่งล็อกระดับแถว (`SELECT FOR UPDATE`) หรือควบคุม Transaction Isolation การเขียน Raw SQL จะตรงไปตรงมาและตรวจสอบได้ง่ายที่สุด",
          ],
        },
        {
          "t": "h2",
          "c": "2. แปลงตาราง SQL เป็น Go Struct (models.go)",
        },
        {
          "t": "p",
          "c": "จากตาราง `accounts`, `entries`, และ `transfers` ที่เราสร้างไว้ใน PostgreSQL ก้าวแรกที่ง่ายที่สุดคือการสร้าง Go Struct มารองรับข้อมูลของทั้ง 3 ตารางนี้ในไฟล์ `simplebank/db/models.go`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/models.go",
          "c": "package db\n\nimport \"time\"\n\ntype Account struct {\n\tID        int64     `json:\"id\"`\n\tOwner     string    `json:\"owner\"`\n\tBalance   int64     `json:\"balance\"`\n\tCurrency  string    `json:\"currency\"`\n\tCreatedAt time.Time `json:\"created_at\"`\n}\n\ntype Entry struct {\n\tID        int64     `json:\"id\"`\n\tAccountID int64     `json:\"account_id\"`\n\tAmount    int64     `json:\"amount\"`\n\tCreatedAt time.Time `json:\"created_at\"`\n}\n\ntype Transfer struct {\n\tID            int64     `json:\"id\"`\n\tFromAccountID int64     `json:\"from_account_id\"`\n\tToAccountID   int64     `json:\"to_account_id\"`\n\tAmount        int64     `json:\"amount\"`\n\tCreatedAt     time.Time `json:\"created_at\"`\n}",
        },
        {
          "t": "ul",
          "c": [
            "**ชนิดข้อมูลตรงกันเป๊ะ**: คอลัมน์ `bigserial` และ `bigint` ใน SQL จับคู่กับ `int64` ใน Go, `varchar` จับคู่กับ `string`, และ `timestamptz` จับคู่กับ `time.Time`",
            "**Struct Tag `` `json:\"...\"` ``**: กำหนดชื่อคีย์เมื่อแปลง Struct นี้เป็นข้อมูล JSON ส่งออกทาง API (เช่น แปลงชื่อฟิลด์ `CreatedAt` ของ Go ให้กลายเป็นคีย์ `\"created_at\"` แบบ snake_case ตามมาตรฐานสากล)",
          ],
        },
        {
          "t": "h2",
          "c": "3. ติดตั้งไดรเวอร์ pgx v5: ทำไมมี database/sql แล้วยังต้องลงเพิ่ม?",
        },
        {
          "t": "p",
          "c": "แม้ภาษา Go จะมีแพ็กเกจมาตรฐานชื่อ `database/sql` มาให้ในตัว แต่เราจำเป็นต้องติดตั้ง **Database Driver** เพิ่มเติมเพราะมีการแบ่งหน้าที่กันอย่างชัดเจน:",
        },
        {
          "t": "ul",
          "c": [
            "**`database/sql` (โครงสร้างคำสั่งกลางของ Go)**: เปรียบเสมือน **'พวงมาลัยและแป้นเหยียบรถยนต์'** ที่มีฟังก์ชันมาตรฐานอย่าง `Query`, `Exec`, `BeginTx` และระบบจัดการ Connection Pool มาให้พร้อมสรรพ **แต่มันพูดภาษาเครือข่ายเฉพาะตัวของฐานข้อมูลแต่ละยี่ห้อ (เช่น PostgreSQL, MySQL, Oracle) ไม่เป็น!**",
            "**`pgx v5` (`github.com/jackc/pgx/v5` — Database Driver)**: เปรียบเสมือน **'ล่ามแปลภาษาและเครื่องยนต์สำหรับ PostgreSQL โดยเฉพาะ'** ทำหน้าที่แปลงคำสั่งจาก `database/sql` ให้กลายเป็นสัญญาณเครือข่ายยิงไปที่พอร์ต `5432` แล้วแปลข้อมูลที่ PostgreSQL ตอบกลับมาให้เป็นตัวแปร Go (ปัจจุบัน `pgx/v5` คือมาตรฐานอันดับ 1 แทนที่ `lib/pq` ตัวเก่าที่ยุติการพัฒนาไปแล้ว)",
          ],
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ดาวน์โหลดไดรเวอร์ pgx v5 stdlib เข้าสู่โปรเจกต์",
          "code": "go get github.com/jackc/pgx/v5/stdlib",
          "out": "go: added github.com/jackc/pgpassfile v1.0.0\ngo: added github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761\ngo: added github.com/jackc/pgx/v5 v5.12.0\ngo: added github.com/jackc/puddle/v2 v2.2.3\ngo: added golang.org/x/sync v0.22.0\ngo: added golang.org/x/text v0.41.0",
        },
        {
          "t": "callout",
          "title": "💡 ทำไมต้องระบุ /stdlib ต่อท้ายตอน go get?",
          "c": "หากเรารันแค่ `go get github.com/jackc/pgx/v5` ตัว Go จะดึงเฉพาะแพ็กเกจหลัก แต่จะยังไม่ได้ดาวน์โหลด `puddle/v2` (ไลบรารีสระเชื่อมต่อที่ `stdlib` ต้องใช้ภายใน) ลงใน `go.sum` ทำให้เวลาเขียน `import .../stdlib` ในโค้ด VS Code จะฟ้องสีแดงว่า `missing go.sum entry for puddle/v2` ทันที การระบุ `/stdlib` ให้ตรงกับแพ็กเกจที่เราจะใช้งานจริงจึงช่วยดึง dependencies ย่อยทั้งหมดมาให้อย่างครบถ้วน 100% ตั้งแต่แรกครับ",
        },
        {
          "t": "h2",
          "c": "4. เปิดสายเชื่อมต่อและสร้างตัวหุ้มคำสั่ง SQL (db.go)",
        },
        {
          "t": "p",
          "c": "ในไฟล์ `simplebank/db/db.go` มีโค้ดสำคัญ 2 ส่วนย่อย มาดูโค้ดและคำอธิบายทีละส่วนกันครับ",
        },
        {
          "t": "p",
          "c": "**ส่วนที่ 4.1: ฟังก์ชัน `Open(dsn string)` (Template มาตรฐาน 3 ขั้นตอนของการเปิด Database ใน Go)**",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/db.go (ส่วนที่ 1: เปิด Connection Pool)",
          "c": "package db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"time\"\n\n\t_ \"github.com/jackc/pgx/v5/stdlib\" // Register \"pgx\" driver with standard database/sql\n)\n\nfunc Open(dsn string) (*sql.DB, error) {\n\t// Step 1: Initialize driver with connection string (DSN)\n\tconn, err := sql.Open(\"pgx\", dsn)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\n\t// Step 2: Configure connection pool parameters\n\tconn.SetMaxOpenConns(25)\n\tconn.SetMaxIdleConns(25)\n\tconn.SetConnMaxLifetime(5 * time.Minute)\n\n\t// Step 3: Verify physical database connectivity\n\tif err := conn.Ping(); err != nil {\n\t\treturn nil, err\n\t}\n\treturn conn, nil\n}",
        },
        {
          "t": "ul",
          "c": [
            "**`_ \"github.com/jackc/pgx/v5/stdlib\"` (Blank Import)**: ขีดล่าง `_` หน้า import บอก Go ให้รันฟังก์ชันเริ่มต้นของ `pgx` เบื้องหลัง เพื่อลงทะเบียนตัวเองเข้ากับ `database/sql` ในชื่อ `\"pgx\"`",
            "**ขั้นที่ 1 (`sql.Open`)**: รับค่า **`dsn` (Data Source Name)** ซึ่งก็คือ URL ที่อยู่ฐานข้อมูล (เช่น `postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable`) แต่ระวังว่าคำสั่งนี้ **ยังไม่ได้ต่อสายไปหา Database จริงๆ** แค่เตรียมตัวแปรในหน่วยความจำเท่านั้น",
            "**ขั้นที่ 2 (`SetMax...` Connection Pool)**: เพื่อไม่ให้เสียเวลาต่อสายใหม่ทุกครั้งที่มีคนโอนเงิน เราตั้งค่าสระเก็บสายให้เปิดพร้อมกันสูงสุด 25 สาย (`MaxOpenConns`), เก็บสายว่างรอใช้ซ้ำ 25 สาย (`MaxIdleConns`), และรีไซเคิลสายทุก 5 นาที (`ConnMaxLifetime`)",
            "**ขั้นที่ 3 (`conn.Ping()`)**: ยิงสัญญาณไปเคาะประตูเช็ก PostgreSQL จริงๆ ว่าเปิดทำงานอยู่และรหัสผ่านถูกต้อง",
          ],
        },
        {
          "t": "p",
          "c": "**ส่วนที่ 4.2: โครงสร้าง `DBTX` และ `Queries` (ตัวหุ้มคำสั่ง SQL ที่ใช้ได้ทั้งโหมดปกติและ Transaction)**\nเขียนต่อท้ายลงในไฟล์ `simplebank/db/db.go` เดียวกันเลย:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/db.go (ส่วนที่ 2: DBTX Interface และ Queries)",
          "c": "// DBTX defines database execution methods implemented by both *sql.DB and *sql.Tx\ntype DBTX interface {\n\tExecContext(ctx context.Context, query string, args ...any) (sql.Result, error)\n\tQueryContext(ctx context.Context, query string, args ...any) (*sql.Rows, error)\n\tQueryRowContext(ctx context.Context, query string, args ...any) *sql.Row\n}\n\n// Queries wraps DBTX to provide typed CRUD methods\ntype Queries struct {\n\tdb DBTX\n}\n\nfunc New(db DBTX) *Queries {\n\treturn &Queries{db: db}\n}",
        },
        {
          "t": "ul",
          "c": [
            "**ทำไมต้องมี 3 เมธอดใน `DBTX`?**: เพราะใน `database/sql` เวลาสั่งรัน SQL จะแยกใช้ตามผลลัพธ์ที่ต้องการ:\n  1. `QueryRowContext`: ดึงข้อมูลกลับมา **แถวเดียว** (เช่น `SELECT ... WHERE id = $1` หรือ `INSERT ... RETURNING`)\n  2. `QueryContext`: ดึงข้อมูลกลับมา **หลายแถว** (เช่น ดึงรายการบัญชีหลายแถว)\n  3. `ExecContext`: รันคำสั่งโดย **ไม่ต้องการอ่านแถวข้อมูลกลับมา** (เช่น `DELETE` ลบบัญชี)",
            "**ทำไมต้องสร้าง `DBTX` มาคั่นกลาง?**: เพราะทั้ง `*sql.DB` (การเชื่อมต่อปกติ) และ `*sql.Tx` (โหมดมัดรวมหลายคำสั่งเป็น Transaction เดียว) ต่างมีเมธอดทั้ง 3 ตัวนี้เหมือนกันเป๊ะ! การรับผ่าน Interface `DBTX` (ซึ่งเป็นแพทเทิร์นเดียวกับที่เครื่องมือระดับโลกอย่าง `sqlc` ใช้) ทำให้เราเขียนฟังก์ชัน CRUD แค่ครั้งเดียว แต่นำไปรันได้ทั้งในโหมดปกติและโหมดโอนเงิน!",
          ],
        },
        {
          "t": "p",
          "c": "📄 **โค้ดฉบับเต็มของไฟล์ `simplebank/db/db.go` (รวมทั้ง 2 ส่วน พร้อมคัดลอกใช้งาน):**",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/db.go (ฉบับสมบูรณ์)",
          "c": "package db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"time\"\n\n\t_ \"github.com/jackc/pgx/v5/stdlib\" // Register \"pgx\" driver with standard database/sql\n)\n\n// Open establishes a PostgreSQL connection pool with production-ready settings\nfunc Open(dsn string) (*sql.DB, error) {\n\tconn, err := sql.Open(\"pgx\", dsn)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\n\tconn.SetMaxOpenConns(25)\n\tconn.SetMaxIdleConns(25)\n\tconn.SetConnMaxLifetime(5 * time.Minute)\n\n\tif err := conn.Ping(); err != nil {\n\t\treturn nil, err\n\t}\n\treturn conn, nil\n}\n\n// DBTX defines database execution methods implemented by both *sql.DB and *sql.Tx\ntype DBTX interface {\n\tExecContext(ctx context.Context, query string, args ...any) (sql.Result, error)\n\tQueryContext(ctx context.Context, query string, args ...any) (*sql.Rows, error)\n\tQueryRowContext(ctx context.Context, query string, args ...any) *sql.Row\n}\n\n// Queries wraps DBTX to provide typed CRUD methods across standard and transaction modes\ntype Queries struct {\n\tdb DBTX\n}\n\nfunc New(db DBTX) *Queries {\n\treturn &Queries{db: db}\n}",
        },
        {
          "t": "callout",
          "title": "⚡ ทำไม VS Code ถึงฟ้อง missing go.sum entry (puddle/v2)?",
          "c": "เมื่อบันทึกไฟล์ที่มี `import _ \"github.com/jackc/pgx/v5/stdlib\"` ตัว Go Compiler / Language Server อาจแสดงเส้นสีแดงว่า:\n> `missing go.sum entry for module providing package github.com/jackc/puddle/v2`\n\nนี่เป็นเรื่องปกติ! เพราะ `stdlib` มีแพ็กเกจย่อยที่ต้องพึ่งพา เช่น `puddle/v2` (ระบบ Connection Pool ภายในของ pgx) ซึ่งยังไม่ได้ถูกดาวน์โหลดบันทึก Hash ลงใน `go.sum` ให้เราสั่งรัน **`go mod tidy`** ใน Terminal ทันที:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "สั่งรันเพื่อดึง dependencies ย่อยทั้งหมดและอัปเดต go.sum",
          "code": "go mod tidy",
          "out": "go: downloading github.com/jackc/puddle/v2 v2.2.2\ngo: downloading github.com/jackc/pgpassfile v1.0.0\ngo: downloading github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761",
        },
        {
          "t": "h2",
          "c": "5. เขียนคำสั่ง CRUD สำหรับ Account (account.go)",
        },
        {
          "t": "p",
          "c": "เราจะสร้างไฟล์ `simplebank/db/account.go` โดยไล่เขียนทีละส่วนตามลำดับ **C → R → U → D** จากบนลงล่าง เมื่อเข้าใจครบทั้ง 3 ส่วนย่อยแล้ว นำมาวางต่อกันจะได้ไฟล์ฉบับสมบูรณ์ที่มีลำดับตรงกันเป๊ะ 100% ครับ",
        },
        {
          "t": "p",
          "c": "**ส่วนที่ 5.1: [C] Create — สร้างบัญชีใหม่ (`CreateAccount`)**\nเริ่มจากส่วนหัวของไฟล์และฟังก์ชันแรกสำหรับเพิ่มแถวบัญชีใหม่ลงตาราง `accounts`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account.go (ส่วนที่ 1/3: Create — สร้างบัญชีใหม่)",
          "c": "package db\n\nimport \"context\"\n\ntype CreateAccountParams struct {\n\tOwner    string\n\tBalance  int64\n\tCurrency string\n}\n\nfunc (q *Queries) CreateAccount(ctx context.Context, arg CreateAccountParams) (Account, error) {\n\tconst query = `\n\t\tINSERT INTO accounts (owner, balance, currency)\n\t\tVALUES ($1, $2, $3)\n\t\tRETURNING id, owner, balance, currency, created_at\n\t`\n\n\trow := q.db.QueryRowContext(ctx, query, arg.Owner, arg.Balance, arg.Currency)\n\tvar a Account\n\terr := row.Scan(&a.ID, &a.Owner, &a.Balance, &a.Currency, &a.CreatedAt)\n\treturn a, err\n}",
        },
        {
          "t": "p",
          "c": "**แกะรอยโครงสร้างสำคัญในฟังก์ชันแรก (ซึ่งจะใช้เป็นแม่แบบในทุกฟังก์ชันถัดไป):**",
        },
        {
          "t": "ul",
          "c": [
            "**`(q *Queries)` (Method Receiver)**: ผูกฟังก์ชันนี้เข้ากับ Struct `Queries` (จากไฟล์ `db.go`) เพื่อให้เรียกใช้งานสายเชื่อมต่อฐานข้อมูลผ่าน `q.db` ได้",
            "**`ctx context.Context`**: สายสัญญาณควบคุมเวลาและการยกเลิกคำสั่ง (วางเป็นพารามิเตอร์ตัวแรกเสมอ)\n  • **เมื่อเรียกจาก API จริง**: หากผู้ใช้เน็ตหลุดหรือกดปิดแอปหนีกลางคัน สัญญาณยกเลิกใน `ctx` จะวิ่งไปสั่ง PostgreSQL ให้หยุดรันคำสั่ง SQL ทันที ไม่ปล่อยให้กิน CPU ค้าง\n  • **เมื่อรันใน Unit Test**: ใช้ `context.Background()` สร้าง Context ตั้งต้นเปล่าๆ ส่งเข้ามาแทน",
            "**`arg CreateAccountParams` (Parameter Struct)**: แทนที่จะรับ `(owner string, balance int64, currency string)` เรียงกัน ซึ่งเสี่ยงส่งค่าสลับตำแหน่งเวลาเรียกใช้ การมัดรวมเป็น Struct บังคับให้คนเรียกต้องระบุชื่อฟิลด์ชัดเจน (เช่น `Owner: \"alice\", Balance: 100`) ซึ่งเป็นมาตรฐานเดียวกับเครื่องมือ `sqlc`",
            "**`$1, $2, $3` (Parameterized Query)**: ใช้ตัวเลขแทนตำแหน่งตัวแปรเสมอเพื่อป้องกัน **SQL Injection 100%** (ห้ามใช้ `+` หรือ `fmt.Sprintf` ต่อสตริง SQL เองเด็ดขาด)",
            "**`RETURNING` + `row.Scan(&a.ID, ...)`**: สั่งให้ PostgreSQL คืนค่าแถวที่เพิ่งสร้างเสร็จ (รวมถึง `id` และ `created_at` ที่ DB สร้างให้อัตโนมัติ) กลับมาในคำสั่งเดียว แล้วใช้ `row.Scan` กวาดค่าลงตัวแปร Pointer (`&a.ID`, ...) ตามลำดับคอลัมน์",
          ],
        },
        {
          "t": "p",
          "c": "**ส่วนที่ 5.2: [R] Read — ดึงข้อมูลแถวเดียว (`GetAccount`) และดึงหลายแถว (`ListAccounts`)**\nเขียนต่อท้ายลงในไฟล์เดิม โดยเปรียบเทียบการดึงข้อมูล **1 แถว** กับ **หลายแถว (Pagination)**:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account.go (ส่วนที่ 2/3: Read — ดึงบัญชีเดี่ยวและดึงรายการแบบแบ่งหน้า)",
          "c": "func (q *Queries) GetAccount(ctx context.Context, id int64) (Account, error) {\n\tconst query = `\n\t\tSELECT id, owner, balance, currency, created_at\n\t\tFROM accounts\n\t\tWHERE id = $1\n\t`\n\n\trow := q.db.QueryRowContext(ctx, query, id)\n\tvar a Account\n\terr := row.Scan(&a.ID, &a.Owner, &a.Balance, &a.Currency, &a.CreatedAt)\n\treturn a, err\n}\n\ntype ListAccountsParams struct {\n\tOwner  string\n\tLimit  int32\n\tOffset int32\n}\n\nfunc (q *Queries) ListAccounts(ctx context.Context, arg ListAccountsParams) ([]Account, error) {\n\tconst query = `\n\t\tSELECT id, owner, balance, currency, created_at\n\t\tFROM accounts\n\t\tWHERE owner = $1\n\t\tORDER BY id\n\t\tLIMIT $2 OFFSET $3\n\t`\n\n\trows, err := q.db.QueryContext(ctx, query, arg.Owner, arg.Limit, arg.Offset)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\tdefer rows.Close() // Crucial: release connection back to pool when done\n\n\taccounts := []Account{}\n\tfor rows.Next() {\n\t\tvar a Account\n\t\tif err := rows.Scan(&a.ID, &a.Owner, &a.Balance, &a.Currency, &a.CreatedAt); err != nil {\n\t\t\treturn nil, err\n\t\t}\n\t\taccounts = append(accounts, a)\n\t}\n\treturn accounts, rows.Err()\n}",
        },
        {
          "t": "ul",
          "c": [
            "**`GetAccount` vs `ListAccounts`**: ดึงบัญชีเดียวด้วย ID ใช้ `QueryRowContext` (คืนค่า `Account` ตัวเดียว) ส่วนดึงหลายแถวใช้ `QueryContext` (คืนค่า Slice `[]Account`)",
            "**`LIMIT $2 OFFSET $3`**: ใช้ทำระบบแบ่งหน้า (Pagination) โดย `LIMIT` คือจำนวนรายการสูงสุดต่อหน้า และ `OFFSET` คือจำนวนแถวที่จะข้ามไป",
            "**ทำไม `ListAccounts` ต้องมี `defer rows.Close()`?**: ขณะวนลูป `for rows.Next()` สายเชื่อมต่อ (Connection) เส้นนั้นจะถูกจองไว้กับตัวแปร `rows` ตลอดเวลา การใส่ `defer rows.Close()` ทันทีหลังเช็ก `err != nil` จะรับประกันว่าเมื่อจบฟังก์ชัน สายเชื่อมต่อจะถูกคืนกลับเข้า Connection Pool เสมอ หากลืมบรรทัดนี้ สายทั้ง 25 เส้นใน Pool จะถูกยึดค้างจนหมด (**Connection Leak**) และเซิร์ฟเวอร์จะค้างทันที!",
          ],
        },
        {
          "t": "p",
          "c": "**ส่วนที่ 5.3: [U & D] Update & Delete — ปรับยอดเงิน (`AddAccountBalance`) และลบบัญชี (`DeleteAccount`)**\nเขียนส่วนสุดท้ายต่อท้ายลงในไฟล์ `simplebank/db/account.go`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account.go (ส่วนที่ 3/3: Update & Delete — ปรับยอดเงินและลบบัญชี)",
          "c": "type AddAccountBalanceParams struct {\n\tID     int64\n\tAmount int64\n}\n\n// AddAccountBalance updates an account balance atomically in a single SQL statement\nfunc (q *Queries) AddAccountBalance(ctx context.Context, arg AddAccountBalanceParams) (Account, error) {\n\tconst query = `\n\t\tUPDATE accounts\n\t\tSET balance = balance + $2\n\t\tWHERE id = $1\n\t\tRETURNING id, owner, balance, currency, created_at\n\t`\n\n\trow := q.db.QueryRowContext(ctx, query, arg.ID, arg.Amount)\n\tvar a Account\n\terr := row.Scan(&a.ID, &a.Owner, &a.Balance, &a.Currency, &a.CreatedAt)\n\treturn a, err\n}\n\nfunc (q *Queries) DeleteAccount(ctx context.Context, id int64) error {\n\tconst query = `DELETE FROM accounts WHERE id = $1`\n\t_, err := q.db.ExecContext(ctx, query, id)\n\treturn err\n}",
        },
        {
          "t": "ul",
          "c": [
            "**`SET balance = balance + $2` ใน `AddAccountBalance`**: สั่งให้ PostgreSQL บวกหรือลบยอดเงินจากค่าปัจจุบันในระดับฐานข้อมูลโดยตรง (ส่ง `Amount` เป็นบวกเมื่อฝากเงิน และเป็นลบเมื่อถอนเงิน) พร้อม `RETURNING` คืนยอดเงินใหม่กลับมาทันที",
            "**`q.db.ExecContext` ใน `DeleteAccount`**: เนื่องจากคำสั่ง `DELETE` ไม่ต้องการอ่านแถวข้อมูลใดๆ กลับมา เราจึงใช้ `ExecContext` แทน `QueryRowContext` และตรวจสอบเฉพาะค่า `err`",
          ],
        },
        {
          "t": "p",
          "c": "📄 **ประกอบร่าง: โค้ดฉบับเต็มของไฟล์ `simplebank/db/account.go` (รวมส่วนที่ 1 + 2 + 3 เรียงตามลำดับ C → R → U → D พร้อมคัดลอกใช้งาน):**",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account.go (ฉบับสมบูรณ์)",
          "c": "package db\n\nimport \"context\"\n\ntype CreateAccountParams struct {\n\tOwner    string\n\tBalance  int64\n\tCurrency string\n}\n\nfunc (q *Queries) CreateAccount(ctx context.Context, arg CreateAccountParams) (Account, error) {\n\tconst query = `\n\t\tINSERT INTO accounts (owner, balance, currency)\n\t\tVALUES ($1, $2, $3)\n\t\tRETURNING id, owner, balance, currency, created_at\n\t`\n\n\trow := q.db.QueryRowContext(ctx, query, arg.Owner, arg.Balance, arg.Currency)\n\tvar a Account\n\terr := row.Scan(&a.ID, &a.Owner, &a.Balance, &a.Currency, &a.CreatedAt)\n\treturn a, err\n}\n\nfunc (q *Queries) GetAccount(ctx context.Context, id int64) (Account, error) {\n\tconst query = `\n\t\tSELECT id, owner, balance, currency, created_at\n\t\tFROM accounts\n\t\tWHERE id = $1\n\t`\n\n\trow := q.db.QueryRowContext(ctx, query, id)\n\tvar a Account\n\terr := row.Scan(&a.ID, &a.Owner, &a.Balance, &a.Currency, &a.CreatedAt)\n\treturn a, err\n}\n\ntype ListAccountsParams struct {\n\tOwner  string\n\tLimit  int32\n\tOffset int32\n}\n\nfunc (q *Queries) ListAccounts(ctx context.Context, arg ListAccountsParams) ([]Account, error) {\n\tconst query = `\n\t\tSELECT id, owner, balance, currency, created_at\n\t\tFROM accounts\n\t\tWHERE owner = $1\n\t\tORDER BY id\n\t\tLIMIT $2 OFFSET $3\n\t`\n\n\trows, err := q.db.QueryContext(ctx, query, arg.Owner, arg.Limit, arg.Offset)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\tdefer rows.Close() // Crucial: release connection back to pool when done\n\n\taccounts := []Account{}\n\tfor rows.Next() {\n\t\tvar a Account\n\t\tif err := rows.Scan(&a.ID, &a.Owner, &a.Balance, &a.Currency, &a.CreatedAt); err != nil {\n\t\t\treturn nil, err\n\t\t}\n\t\taccounts = append(accounts, a)\n\t}\n\treturn accounts, rows.Err()\n}\n\ntype AddAccountBalanceParams struct {\n\tID     int64\n\tAmount int64\n}\n\n// AddAccountBalance updates an account balance atomically in a single SQL statement\nfunc (q *Queries) AddAccountBalance(ctx context.Context, arg AddAccountBalanceParams) (Account, error) {\n\tconst query = `\n\t\tUPDATE accounts\n\t\tSET balance = balance + $2\n\t\tWHERE id = $1\n\t\tRETURNING id, owner, balance, currency, created_at\n\t`\n\n\trow := q.db.QueryRowContext(ctx, query, arg.ID, arg.Amount)\n\tvar a Account\n\terr := row.Scan(&a.ID, &a.Owner, &a.Balance, &a.Currency, &a.CreatedAt)\n\treturn a, err\n}\n\nfunc (q *Queries) DeleteAccount(ctx context.Context, id int64) error {\n\tconst query = `DELETE FROM accounts WHERE id = $1`\n\t_, err := q.db.ExecContext(ctx, query, id)\n\treturn err\n}",
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
          "c": "1. ติดตั้ง Testify: รู้จักกับ assert vs require",
        },
        {
          "t": "p",
          "c": "แพ็กเกจ `testing` ดั้งเดิมของ Go บังคับให้เขียน `if err != nil { t.Errorf(...) }` ซ้ำๆ ทุกบรรทัด ในโปรเจกต์ระดับมืออาชีพจึงนิยมใช้ไลบรารี **Testify** ซึ่งมีแพ็กเกจย่อยสำหรับตรวจสอบผลลัพธ์ (Assertion) อยู่ 2 ตัวที่ต้องเลือกใช้ให้ถูกจังหวะ:",
        },
        {
          "t": "ul",
          "c": [
            "**`github.com/stretchr/testify/assert`**: เมื่อตรวจพบว่าค่าไม่ตรงตามเงื่อนไข จะทำเครื่องหมายว่าเทสต์ตก (Fail) **แต่ยังคงรันบรรทัดถัดไปในฟังก์ชันเทสต์นั้นต่อจนจบ** เหมาะกับการเช็กค่าหลายๆ ฟิลด์พร้อมกันโดยไม่ต้องการให้หยุดกลางคัน",
            "**`github.com/stretchr/testify/require`**: เมื่อตรวจพบว่าเงื่อนไขไม่ผ่าน จะสั่ง **`t.FailNow()` เพื่อหยุดรันฟังก์ชันเทสต์นั้นทันที!** ในการทดสอบฐานข้อมูลเรานิยมใช้ `require` เป็นหลัก เพราะถ้าขั้นตอนแรกอย่างการสร้างบัญชี (`CreateAccount`) พังตั้งแต่ต้น หรือเกิด Error จากฐานข้อมูล การฝืนรันบรรทัดต่อไปเพื่อเช็กยอดเงินก็ไม่มีประโยชน์และอาจทำให้เกิด Panic ซ้ำซ้อนได้",
          ],
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ติดตั้ง Testify",
          "code": "go get github.com/stretchr/testify",
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
          "c": "package util\n\nimport (\n\t\"math/rand/v2\"\n\t\"strings\"\n)\n\nconst alphabet = \"abcdefghijklmnopqrstuvwxyz\"\n\n// RandomInt generates a random integer between min and max inclusive\nfunc RandomInt(min, max int64) int64 {\n\treturn min + rand.Int64N(max-min+1)\n}\n\n// RandomString generates a random lowercase alphabetic string of length n\nfunc RandomString(n int) string {\n\tvar sb strings.Builder\n\tfor range n {\n\t\tsb.WriteByte(alphabet[rand.IntN(len(alphabet))])\n\t}\n\treturn sb.String()\n}\n\nfunc RandomOwner() string    { return RandomString(6) }\nfunc RandomMoney() int64    { return RandomInt(0, 1000) }\nfunc RandomCurrency() string {\n\tcurrencies := []string{\"USD\", \"EUR\", \"THB\"}\n\treturn currencies[rand.IntN(len(currencies))]\n}",
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
          "c": "เราจะสร้างไฟล์ `simplebank/db/account_test.go` โดยแบ่งออกเป็น 2 ส่วนเพื่อให้ดูแลรักษาง่าย:",
        },
        {
          "t": "p",
          "c": "**ส่วนที่ 4.1: ฟังก์ชันตัวช่วย `createRandomAccount(t *testing.T)`**\nเนื่องจากไม่ว่าเราจะทดสอบดึงข้อมูล (`Get`), แก้ไขยอดเงิน (`AddBalance`), หรือลบบัญชี (`Delete`) เราจำเป็นต้องมีบัญชีตั้งต้นในฐานข้อมูลก่อนเสมอ แทนที่จะเขียนโค้ดสร้างบัญชีซ้ำๆ ในทุกเทสต์ เราจึงแยกออกมาเป็นฟังก์ชันตัวช่วยตัวเดียว:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account_test.go (ส่วนที่ 1: ฟังก์ชันสร้างบัญชีสุ่ม)",
          "c": "package db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"testing\"\n\n\t\"github.com/stretchr/testify/require\"\n\t\"simplebank/util\"\n)\n\nfunc createRandomAccount(t *testing.T) Account {\n\targ := CreateAccountParams{\n\t\tOwner:    util.RandomOwner(),\n\t\tBalance:  util.RandomMoney(),\n\t\tCurrency: util.RandomCurrency(),\n\t}\n\n\taccount, err := testQueries.CreateAccount(context.Background(), arg)\n\trequire.NoError(t, err)\n\trequire.NotEmpty(t, account)\n\n\trequire.Equal(t, arg.Owner, account.Owner)\n\trequire.Equal(t, arg.Balance, account.Balance)\n\trequire.Equal(t, arg.Currency, account.Currency)\n\n\trequire.NotZero(t, account.ID)        // Primary key generated by database\n\trequire.NotZero(t, account.CreatedAt) // Auto-generated timestamp\n\treturn account\n}\n\nfunc TestCreateAccount(t *testing.T) {\n\tcreateRandomAccount(t)\n}",
        },
        {
          "t": "p",
          "c": "**ส่วนที่ 4.2: ทดสอบการดึงข้อมูล บวกเงิน และลบบัญชี (`TestGetAccount`, `TestAddAccountBalance`, `TestDeleteAccount`)**\nเขียนต่อท้ายในไฟล์ `simplebank/db/account_test.go` โดยเรียกใช้ `createRandomAccount(t)` เพื่อสร้างบัญชีใหม่สดๆ ในทุกการทดสอบ:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account_test.go (ส่วนที่ 2: ทดสอบ Get, AddBalance, Delete)",
          "c": "func TestGetAccount(t *testing.T) {\n\tacc1 := createRandomAccount(t)\n\tacc2, err := testQueries.GetAccount(context.Background(), acc1.ID)\n\trequire.NoError(t, err)\n\trequire.Equal(t, acc1.ID, acc2.ID)\n\trequire.Equal(t, acc1.Owner, acc2.Owner)\n\trequire.Equal(t, acc1.Balance, acc2.Balance)\n}\n\nfunc TestAddAccountBalance(t *testing.T) {\n\tacc1 := createRandomAccount(t)\n\tacc2, err := testQueries.AddAccountBalance(context.Background(), AddAccountBalanceParams{\n\t\tID:     acc1.ID,\n\t\tAmount: 10,\n\t})\n\trequire.NoError(t, err)\n\trequire.Equal(t, acc1.Balance+10, acc2.Balance)\n}\n\nfunc TestDeleteAccount(t *testing.T) {\n\tacc1 := createRandomAccount(t)\n\terr := testQueries.DeleteAccount(context.Background(), acc1.ID)\n\trequire.NoError(t, err)\n\n\t// Verify the deleted account cannot be found\n\tacc2, err := testQueries.GetAccount(context.Background(), acc1.ID)\n\trequire.ErrorIs(t, err, sql.ErrNoRows)\n\trequire.Empty(t, acc2)\n}",
        },
        {
          "t": "p",
          "c": "📄 **โค้ดฉบับเต็มของไฟล์ `simplebank/db/account_test.go` (รวมทุก Test Cases พร้อมคัดลอกใช้งาน):**",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account_test.go (ฉบับสมบูรณ์)",
          "c": "package db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"testing\"\n\n\t\"github.com/stretchr/testify/require\"\n\t\"simplebank/util\"\n)\n\nfunc createRandomAccount(t *testing.T) Account {\n\targ := CreateAccountParams{\n\t\tOwner:    util.RandomOwner(),\n\t\tBalance:  util.RandomMoney(),\n\t\tCurrency: util.RandomCurrency(),\n\t}\n\n\taccount, err := testQueries.CreateAccount(context.Background(), arg)\n\trequire.NoError(t, err)\n\trequire.NotEmpty(t, account)\n\trequire.Equal(t, arg.Owner, account.Owner)\n\trequire.Equal(t, arg.Balance, account.Balance)\n\trequire.Equal(t, arg.Currency, account.Currency)\n\trequire.NotZero(t, account.ID)\n\trequire.NotZero(t, account.CreatedAt)\n\treturn account\n}\n\nfunc TestCreateAccount(t *testing.T) {\n\tcreateRandomAccount(t)\n}\n\nfunc TestGetAccount(t *testing.T) {\n\tacc1 := createRandomAccount(t)\n\tacc2, err := testQueries.GetAccount(context.Background(), acc1.ID)\n\trequire.NoError(t, err)\n\trequire.Equal(t, acc1.ID, acc2.ID)\n\trequire.Equal(t, acc1.Owner, acc2.Owner)\n\trequire.Equal(t, acc1.Balance, acc2.Balance)\n}\n\nfunc TestAddAccountBalance(t *testing.T) {\n\tacc1 := createRandomAccount(t)\n\tacc2, err := testQueries.AddAccountBalance(context.Background(), AddAccountBalanceParams{\n\t\tID:     acc1.ID,\n\t\tAmount: 10,\n\t})\n\trequire.NoError(t, err)\n\trequire.Equal(t, acc1.Balance+10, acc2.Balance)\n}\n\nfunc TestDeleteAccount(t *testing.T) {\n\tacc1 := createRandomAccount(t)\n\terr := testQueries.DeleteAccount(context.Background(), acc1.ID)\n\trequire.NoError(t, err)\n\n\tacc2, err := testQueries.GetAccount(context.Background(), acc1.ID)\n\trequire.ErrorIs(t, err, sql.ErrNoRows)\n\trequire.Empty(t, acc2)\n}",
        },
        {
          "t": "h2",
          "c": "5. สั่งรัน Unit Test และดูผลลัพธ์จริง",
        },
        {
          "t": "p",
          "c": "ก่อนเริ่มรันเทสต์ ให้สั่ง **`go mod tidy`** หนึ่งครั้งเพื่อให้ Go จัดระเบียบและดึง dependencies ย่อยของ Testify ลงใน `go.sum` ให้ครบถ้วน จากนั้นสั่งรันเทสต์ด้วยคำสั่ง `go test -v -cover ./db`:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "จัดระเบียบ dependencies และสั่งรัน Unit Test ของแพ็กเกจ db",
          "code": "go mod tidy\ngo test -v -cover ./db",
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
