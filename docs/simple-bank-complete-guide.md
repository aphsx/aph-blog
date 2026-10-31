# Simple Bank: Complete End-to-End Go Backend Masterclass
> **คู่มือและหลักสูตรฉบับยกเครื่องใหม่**: ปูพื้นฐานตั้งแต่ไวยากรณ์ Go ขั้นต่ำ (Zero to Hero) สู่ระบบธนาคารระดับ Production ด้วย Go, PostgreSQL, Gin และ Docker

---

## สารบัญหลักสูตร (Curriculum Overview)

1. [Module 0: ปูพื้นฐาน Go Primitives สำหรับงาน Backend](#module-0-ปูพื้นฐาน-go-primitives-สำหรับงาน-backend)
   - 0.1 Struct, Memory Layout และ Pointers (`*` vs `&`)
   - 0.2 Functions vs Methods และ Method Receivers
   - 0.3 Interfaces และการนำไปทำ Dependency Injection / Mocking
   - 0.4 Concurrency Primitives: Goroutines, Channels, `sync.WaitGroup`, และ `sync.Mutex`
   - 0.5 Error Handling, `defer`, และ `context.Context`
2. [Module 1: สถาปัตยกรรมระบบธนาคารและฐานข้อมูล (Ledger Architecture)](#module-1-สถาปัตยกรรมระบบธนาคารและฐานข้อมูล-ledger-architecture)
   - 1.1 ทำไมห้าม `UPDATE accounts SET balance = balance - 100` โดยตรง
   - 1.2 ออกแบบตาราง `accounts`, `entries`, `transfers` และ Foreign Keys
   - 1.3 ดัชนี (Indexes) และ Constraints ใน PostgreSQL
3. [Module 2: เชื่อมต่อฐานข้อมูลและ Transaction Store Pattern](#module-2-เชื่อมต่อฐานข้อมูลและ-transaction-store-pattern)
   - 2.1 ทำงานกับ `database/sql` และ Connection Pooling
   - 2.2 การจัดการ Transaction (`*sql.Tx`) ใน Go
   - 2.3 ออกแบบ `Store` Pattern สำหรับจัดการ Database Operations
4. [Module 3: Concurrency, Race Conditions และการแก้ Deadlock](#module-3-concurrency-race-conditions-และการแก้-deadlock)
   - 3.1 การเกิด Race Condition เมื่อโอนเงินพร้อมกัน
   - 3.2 Pessimistic Row Locking (`SELECT ... FOR UPDATE` vs `FOR NO KEY UPDATE`)
   - 3.3 ปัญหา Deadlock (Tx 1: A -> B, Tx 2: B -> A)
   - 3.4 วิธีแก้ Deadlock ด้วย Consistent Order of Locking
5. [Module 4: การเขียน Automated Unit & Concurrent Tests](#module-4-การเขียน-automated-unit--concurrent-tests)
   - 4.1 การใช้แพ็กเกจ `testing` และ `testify/require`
   - 4.2 การจำลอง 10 Goroutines โอนเงินพร้อมกันด้วย Channels & `sync.WaitGroup`
   - 4.3 ตรวจสอบความถูกต้องของยอดเงินรวม (Conservation of Money)
6. [Module 5: พัฒนา RESTful API ด้วย Gin Web Framework](#module-5-พัฒนา-restful-api-ด้วย-gin-web-framework)
   - 5.1 โครงสร้างโฟลเดอร์แบบ Clean Architecture
   - 5.2 Server Struct และ Dependency Injection
   - 5.3 Request Binding และ Validation ด้วย `go-playground/validator`
7. [Module 6: ระบบความปลอดภัย ยืนยันตัวตน และ Deploy](#module-6-ระบบความปลอดภัย-ยืนยันตัวตน-และ-deploy)
   - 6.1 แฮชรหัสผ่านอย่างปลอดภัยด้วย Bcrypt
   - 6.2 Token Authentication: ทำไมโปรเจกต์นี้ใช้ PASETO แทน JWT
   - 6.3 Authentication Middleware ใน Gin
   - 6.4 จัดการ Configuration ด้วย Viper และ Docker Compose

---

## Module 0: ปูพื้นฐาน Go Primitives สำหรับงาน Backend

> ส่วนนี้คือสิ่งที่ Simple Bank ดั้งเดิมไม่ได้สอน แต่เป็น "หัวใจสำคัญ" ที่ทำให้คุณอ่านโค้ดโปรเจกต์นี้ไม่รู้เรื่อง

### 0.1 Struct, Memory Layout และ Pointers (`*` vs `&`)

ในภาษา Go ข้อมูลแบ่งออกเป็นสองลักษณะการส่งต่อ:
1. **Pass by Value (คัดลอกค่า)**: Go เป็นภาษา pass-by-value โดยค่าเริ่มต้น ถ้าคุณส่ง struct เข้าฟังก์ชัน Go จะ copy ข้อมูลทั้งชุดไปไว้ที่ memory ก้อนใหม่
2. **Pass by Reference (ส่ง Memory Address ผ่าน Pointer)**: ส่งที่อยู่บน RAM ไป เพื่อไม่ให้เปลือง memory และเพื่อให้ฟังก์ชันนั้นสามารถแก้ไขค่าต้นทางได้

```go
package main

import "fmt"

type Account struct {
    Owner   string
    Balance int64
}

// ❌ รับค่าแบบ Pass-by-value: แก้แล้วไม่มีผลกับตัวแปรเดิม
func deductFeeWrong(acc Account, fee int64) {
    acc.Balance -= fee
}

// ✅ รับค่าแบบ Pointer (*Account): แก้ไขข้อมูลที่ address นั้นโดยตรง
func deductFeeCorrect(acc *Account, fee int64) {
    acc.Balance -= fee
}

func main() {
    acc := Account{Owner: "Alice", Balance: 1000}
    
    deductFeeWrong(acc, 50)
    fmt.Println(acc.Balance) // ยังคงเป็น 1000!

    // ส่ง address ไปด้วยเครื่องหมาย &
    deductFeeCorrect(&acc, 50)
    fmt.Println(acc.Balance) // เหลือ 950 เรียบร้อย
}
```

* **กฎสำหรับ Simple Bank**: โครงสร้างขนาดใหญ่ เช่น Database Connection Pool (`*sql.DB`), Transaction (`*sql.Tx`), หรือ Server instance (`*Server`) จะต้องส่งผ่าน Pointer (`*`) เสมอ

---

### 0.2 Functions vs Methods และ Method Receivers

ใน Go ไม่มีคลาส (Class) แต่ใช้ **Struct + Method Receiver** แทน:

```go
type Server struct {
    store *Store // ต่อฐานข้อมูล
    router *gin.Engine
}

// Method Receiver: ฟังก์ชันนี้ผูกติดกับ struct Server
// s *Server เรียกว่า "Pointer Receiver"
func (s *Server) Start(address string) error {
    return s.router.Run(address)
}
```

* **ทำไมต้องใช้ Pointer Receiver `(s *Server)`?**
  1. เพื่อให้ method สามารถเข้าถึงและแชร์ field ภายใน struct เดียวกันได้โดยไม่ถูกก๊อบปี้ใหม่ทุกครั้งที่เรียก
  2. การเรียกใช้: `server := &Server{...}; server.Start(":8080")`

---

### 0.3 Interfaces และ Dependency Injection

Interface ใน Go กำหนดเฉพาะ "สัญญาการทำงาน (Contract)" ว่าต้องมีฟังก์ชันอะไรบ้าง โดย struct ไม่ต้องพิมพ์คีย์เวิร์ด `implements` (เป็น Implicit Implementation):

```go
// นิยามว่า "อะไรก็ตามที่มี Method CreateAccount และ GetAccount จะถือว่าเป็น Store"
type Store interface {
    CreateAccount(owner string, balance int64) (*Account, error)
    GetAccount(id int64) (*Account, error)
}

// Controller ของเราจะไม่ยึดติดกับ PostgreSQL โดยตรง แต่ขึ้นกับ Interface
type AccountHandler struct {
    store Store
}

func NewAccountHandler(store Store) *AccountHandler {
    return &AccountHandler{store: store}
}
```

* **ประโยชน์ใน Simple Bank**: ทำให้เราสามารถเขียน Mock Database ใน Unit Test ได้ โดยไม่ต้องเปิด PostgreSQL จริงขณะรันเทสต์

---

### 0.4 Concurrency: Goroutines, Channels, WaitGroup และ Mutex

นี่คือจุดเด่นที่สุดของภาษา Go และเป็นหัวใจของการทดสอบระบบธนาคาร:

#### 1. Goroutine
การรันฟังก์ชันคู่ขนานกัน โดยใช้ทรัพยากรน้อยมาก (กินแรมเริ่มต้นเพียง ~2KB เทียบกับ OS Thread ทั่วไปที่ใช้ ~1MB):
```go
go doTransfer(fromAccount, toAccount, 100) // ทำงานเบื้องหลังทันที
```

#### 2. `sync.WaitGroup` (นับจำนวนงานคู่ขนาน)
เมื่อสั่ง `go func()` ฟังก์ชันหลัก `main()` อาจทำงานเสร็จก่อนที่ Goroutine จะรันเสร็จ เราจึงต้องใช้ `WaitGroup` เพื่อรอ:
```go
var wg sync.WaitGroup

for i := 0; i < 5; i++ {
    wg.Add(1) // แจ้งว่ามี 1 งานใหม่
    go func(id int) {
        defer wg.Done() // เมื่อฟังก์ชันย่อยจบ ให้ลบงานออก 1
        fmt.Printf("Worker %d finished\n", id)
    }(i)
}

wg.Wait() // หยุดรอจนกว่างานจะเหลือ 0
```

#### 3. Channel (`chan`) (ส่งข้อความข้าม Goroutines)
ใน Go มีปรัชญาว่า *"Do not communicate by sharing memory; instead, share memory by communicating"*
```go
errs := make(chan error, 5) // Channel รองรับ error ได้ 5 ตัว

go func() {
    err := processPayment()
    errs <- err // ส่งค่าเข้าไปใน channel
}()

err := <-errs // ดึงค่าออกจาก channel มาตรวจสอบ
```

---

### 0.5 Error Handling และ `defer`

Go ไม่ใช้ `try-catch` แต่ใช้ Explicit Error Return:
```go
res, err := db.Exec("DELETE FROM accounts WHERE id = $1", 1)
if err != nil {
    // จัดการ error ทันที
    return fmt.Errorf("failed to delete account: %w", err)
}
```

คำสั่ง `defer` จะทำงานเมื่อฟังก์ชันนั้นกำลังจะ Return เสมอ เหมาะสำหรับปิด Resource:
```go
tx, err := db.BeginTx(ctx, nil)
if err != nil {
    return err
}
// ถ้าฟังก์ชัน return ก่อน tx.Commit() คำสั่ง Rollback จะทำงานอัตโนมัติ ป้องกัน Transaction ค้าง
defer tx.Rollback()

// ทำการโอนเงิน...

return tx.Commit() // เมื่อ Commit สำเร็จ Rollback จะไม่มีผลเสียใดๆ
```

---

## Module 1: สถาปัตยกรรมระบบธนาคารและฐานข้อมูล (Ledger Architecture)

### 1.1 ทำไมห้าม `UPDATE balance` โดยตรง?
ในระบบการเงินจริง การเขียน:
```sql
-- ❌ ผิดมหันต์ในระบบบัญชีธนาคาร
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
```
ถ้าข้อมูลสูญหาย หรือมีการโกง เราจะไม่สามารถตรวจสอบย้อนหลังได้เลยว่าเงิน 100 บาทหายไปไหน ใครเป็นคนโอน และโอนตอนกี่โมง

**หลักการ Double-Entry Bookkeeping (ระบบบัญชีคู่):**
ทุกธุรกรรมต้องมี 3 องค์ประกอบเสมอ:
1. **Transfers**: บันทึกสัญญาการโอนว่า ID 1 โอนให้ ID 2 จำนวน 100 บาท
2. **Entries**: บันทึกความเคลื่อนไหว (Ledger Record):
   - Entry 1: Account ID 1 โดนหัก `-100`
   - Entry 2: Account ID 2 ได้รับ `+100`
3. **Accounts**: เก็บยอดสรุปสุดท้าย (`balance`)

---

### 1.2 Schema ออกแบบใน PostgreSQL

```sql
CREATE TABLE "accounts" (
  "id" bigserial PRIMARY KEY,
  "owner" varchar NOT NULL,
  "balance" bigint NOT NULL CHECK ("balance" >= 0),
  "currency" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "entries" (
  "id" bigserial PRIMARY KEY,
  "account_id" bigint NOT NULL REFERENCES "accounts" ("id"),
  "amount" bigint NOT NULL, -- ติดลบถ้าเงินออก เป็นบวกถ้าเงินเข้า
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "transfers" (
  "id" bigserial PRIMARY KEY,
  "from_account_id" bigint NOT NULL REFERENCES "accounts" ("id"),
  "to_account_id" bigint NOT NULL REFERENCES "accounts" ("id"),
  "amount" bigint NOT NULL CHECK ("amount" > 0), -- ต้องมากกว่า 0 เสมอ
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

-- สร้าง Index เพื่อให้ Query ข้อมูลของแต่ละบัญชีได้อย่างรวดเร็ว
CREATE INDEX ON "accounts" ("owner");
CREATE INDEX ON "entries" ("account_id");
CREATE INDEX ON "transfers" ("from_account_id");
CREATE INDEX ON "transfers" ("to_account_id");
CREATE INDEX ON "transfers" ("from_account_id", "to_account_id");
```

---

## Module 2: เชื่อมต่อฐานข้อมูลและ Transaction Store Pattern

### 2.1 โครงสร้าง Store Struct ใน Go

```go
package db

import (
    "context"
    "database/sql"
    "fmt"
)

// SQLStore จัดการการเรียกใช้ Database และ Transactions
type SQLStore struct {
    db *sql.DB
}

func NewStore(db *sql.DB) *SQLStore {
    return &SQLStore{db: db}
}

// execTx เป็น Helper สำหรับครอบ Transaction
func (store *SQLStore) execTx(ctx context.Context, fn func(*sql.Tx) error) error {
    tx, err := store.db.BeginTx(ctx, nil)
    if err != nil {
        return err
    }

    // ส่ง *sql.Tx ให้ฟังก์ชันการทำงานด้านใน
    if err := fn(tx); err != nil {
        if rbErr := tx.Rollback(); rbErr != nil {
            return fmt.Errorf("tx err: %v, rollback err: %v", err, rbErr)
        }
        return err
    }

    return tx.Commit()
}
```

---

## Module 3: Concurrency, Race Conditions และการแก้ Deadlock

นี่คือบทเรียนระดับสูงที่เป็นจุดขายของ Simple Bank:

### 3.1 ปัญหา Race Condition
สมมติ Account 1 มีเงิน 1,000 บาท
- Goroutine A: ต้องการโอนให้ Account 2 จำนวน 200 บาท
- Goroutine B: ต้องการโอนให้ Account 2 จำนวน 300 บาท

ถ้าทั้งสองทำงานพร้อมกันและอ่านค่า `balance = 1000` พร้อมกัน:
- Goroutine A คำนวณ: 1000 - 200 = 800 แล้วเขียนลง DB
- Goroutine B คำนวณ: 1000 - 300 = 700 แล้วเขียนทับลง DB
**ผลลัพธ์**: ยอดเงินคงเหลือกลายเป็น 700 ทั้งที่ควรจะเป็น 500! เงิน 200 บาทหายไปในอากาศ

### 3.2 การล็อกแถวข้อมูล (Pessimistic Row Locking)
เราต้องล็อกแถวบัญชีที่กำลังทำรายการไม่ให้ Transaction อื่นอ่านหรือแก้ไขได้จนกว่าจะเสร็จ:
```sql
-- ❌ ห้ามใช้ SELECT FOR UPDATE แบบลอยๆ เพราะอาจเกิด deadlock กับตาราง foreign key
SELECT * FROM accounts WHERE id = $1 FOR UPDATE;

-- ✅ ใน Simple Bank ถ้าไม่มีการเปลี่ยน Foreign Key ให้ใช้ FOR NO KEY UPDATE
SELECT * FROM accounts WHERE id = $1 FOR NO KEY UPDATE;
```

### 3.3 ปัญหา Deadlock (การแยกล็อกแบบไขว้กัน)
- Transaction 1: โอนเงินจาก **Account 1** ไป **Account 2** (ล็อก 1 ก่อน แล้วพยายามขอล็อก 2)
- Transaction 2: โอนเงินจาก **Account 2** ไป **Account 1** (ล็อก 2 ก่อน แล้วพยายามขอล็อก 1)

**เกิดวงจรติดล็อก (Circular Wait)**: ต่างฝ่ายต่างรอทรัพยากรของกันและกัน ระบบจะล่มและ PostgreSQL จะยิงข้อผิดพลาด `pq: deadlock detected`

### 3.4 ทางแก้: Consistent Lock Ordering
วิธีแก้ที่ง่ายและทรงพลังที่สุด: **"เรียงลำดับ ID จากน้อยไปมากเสมอ ไม่ว่าจะโอนไปทิศทางใด"**

```go
func transferMoney(ctx context.Context, q *Queries, accountID1, accountID2 int64, amount int64) error {
    if accountID1 < accountID2 {
        // ล็อก ID น้อยก่อน
        if err := updateBalance(q, accountID1, -amount); err != nil { return err }
        if err := updateBalance(q, accountID2, amount); err != nil { return err }
    } else {
        // ถ้า ID2 น้อยกว่า ให้ล็อก ID2 ก่อนเสมอ
        if err := updateBalance(q, accountID2, amount); err != nil { return err }
        if err := updateBalance(q, accountID1, -amount); err != nil { return err }
    }
    return nil
}
```
เมื่อทั้งสอง Transaction พยายามแย่งล็อก ID เดียวกันก่อน ตัวใดตัวหนึ่งจะชนะและทำรายการจนเสร็จ ส่วนอีกตัวจะรอคิวอย่างเป็นระเบียบ ทำให้ Deadlock ไม่เกิดขึ้น 100%

---

## Module 4: การเขียน Automated Concurrent Unit Tests

เราใช้ Goroutines และ Channels ในการจำลองการโอนเงินคู่ขนาน:

```go
package db_test

import (
    "context"
    "testing"
    "github.com/stretchr/testify/require"
)

func TestTransferTxConcurrent(t *testing.T) {
    store := NewStore(testDB)

    account1 := createRandomAccount(t)
    account2 := createRandomAccount(t)

    // รันการโอนพร้อมกัน 10 ครั้ง
    n := 10
    amount := int64(10)

    errs := make(chan error, n)
    results := make(chan TransferTxResult, n)

    for i := 0; i < n; i++ {
        go func() {
            res, err := store.TransferTx(context.Background(), TransferTxParams{
                FromAccountID: account1.ID,
                ToAccountID:   account2.ID,
                Amount:        amount,
            })
            errs <- err
            results <- res
        }()
    }

    // ตรวจสอบผลลัพธ์ว่าไม่มีตัวใดล้มเหลวหรือเกิด deadlock
    for i := 0; i < n; i++ {
        err := <-errs
        require.NoError(t, err)

        res := <-results
        require.NotEmpty(t, res)
    }

    // ตรวจสอบยอดเงินสุดท้าย
    updatedAccount1, err := store.GetAccount(context.Background(), account1.ID)
    require.NoError(t, err)
    require.Equal(t, account1.Balance - int64(n)*amount, updatedAccount1.Balance)
}
```

---

## Module 5: พัฒนา RESTful API ด้วย Gin Web Framework

### 5.1 โครงสร้าง Router และ Controller

```go
type Server struct {
    store  Store
    router *gin.Engine
}

func NewServer(store Store) *Server {
    server := &Server{store: store}
    router := gin.Default()

    router.POST("/accounts", server.createAccount)
    router.GET("/accounts/:id", server.getAccount)
    router.POST("/transfers", server.createTransfer)

    server.router = router
    return server
}

type createAccountRequest struct {
    Owner    string `json:"owner" binding:"required"`
    Currency string `json:"currency" binding:"required,oneof=USD EUR THB"`
}

func (server *Server) createAccount(ctx *gin.Context) {
    var req createAccountRequest
    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    account, err := server.store.CreateAccount(ctx, req.Owner, req.Currency)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    ctx.JSON(http.StatusOK, account)
}
```

---

## Module 6: ความปลอดภัย และ Production Deployment

### 6.1 ทำไมต้อง PASETO แทน JWT?
* **JWT (JSON Web Token)** มีปัญหาด้านความปลอดภัยเชิงสถาปัตยกรรม (เช่น `alg: none` vulnerability, การสับสนระหว่าง Symmetric/Asymmetric key)
* **PASETO (Platform-Agnostic Security Tokens)** ปิดช่องโหว่เหล่านี้โดยบังคับใช้อัลกอริทึมมาตรฐานที่ทันสมัยระดับ Cryptographic Hardened (เช่น ChaCha20-Poly1305 หรือ Ed25519)

### 6.2 Docker Compose สำหรับ Local Development
```yaml
version: "3.8"
services:
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=simple_bank
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

---

## สรุปแนวทางการฝึกฝน (Next Steps)

1. ทบทวน **Module 0** ให้คล่อง: ฝึกเขียน Struct และ Method ด้วยตนเอง
2. เริ่มต้นรัน PostgreSQL บน Docker และสร้างตารางตาม **Module 1**
3. เขียนไฟล์ `store.go` ตาม **Module 2 และ 3** เพื่อทำความเข้าใจการล็อกแถวข้อมูล
4. ลองรันคำสั่ง `go test -v -run TestTransferTxConcurrent` เพื่อดู Goroutines ทำงานจริง
