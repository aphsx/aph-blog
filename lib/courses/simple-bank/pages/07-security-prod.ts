import type { Page } from "@/lib/types";

export const securityProdPages: Record<string, Page> = {
  "bank-user-auth-bcrypt": {
    slug: "bank-user-auth-bcrypt",
    title: {
      th: "ระบบผู้ใช้งาน & แฮชรหัสผ่านด้วย Bcrypt",
      en: "User Management & Password Hashing with Bcrypt",
    },
    lead: {
      th: "เพิ่มตาราง users เพื่อผูกบัญชีธนาคารกับเจ้าของตัวจริง และเจาะลึกเทคนิคการแฮชรหัสผ่านด้วย bcrypt เพื่อป้องกันการโจมตีแบบ Brute-Force และ Rainbow Table",
      en: "Adding the users table to bind accounts to real owners and securing passwords with bcrypt hashing.",
    },
    group: "7. รู้ว่าใครกด และรันบนเครื่องจริง",
    blocks: {
      th: [
        {
          t: "callout",
          title: "บทนี้อยู่ตรงไหนของทาง",
          c: "API รับคำสั่งได้แล้ว แต่ใครก็อ้างชื่อเจ้าของบัญชีได้ บทนี้มีผู้ใช้จริง และรหัสผ่านเก็บเป็นผลแฮชที่อ่านกลับเป็นรหัสเดิมไม่ได้",
        },
        {
          t: "p",
          c: "ในระบบธนาคารจริง เราจะยอมให้ใครก็ได้มาพิมพ์ชื่อส่งๆ เช่น `owner: \"Alice\"` เพื่อเปิดบัญชีไม่ได้เด็ดขาด บัญชีทุกเล่มจะต้องผูกอยู่กับ **ผู้ใช้งานที่มีตัวตนจริง (Authenticated User)** ที่ผ่านการสมัครสมาชิกและยืนยันรหัสผ่านอย่างถูกต้อง",
        },

        { t: "h2", c: "1. ออกแบบตาราง Users และผูก Foreign Key กับ Accounts" },
        {
          t: "p",
          c: "เราจะสร้าง Migration ไฟล์ใหม่ด้วยคำสั่ง `migrate create -ext sql -dir db/migration -seq add_users` เพื่อเพิ่มตาราง `users` และปรับปรุงตาราง `accounts` ให้ผูกความสัมพันธ์:",
        },
        {
          t: "code",
          lang: "sql",
          label: "simplebank/db/migration/000002_add_users.up.sql",
          c: `CREATE TABLE "users" (
  "username" varchar PRIMARY KEY,
  "hashed_password" varchar NOT NULL,
  "full_name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password_changed_at" timestamptz NOT NULL DEFAULT '0001-01-01 00:00:00Z',
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

-- ผูกเจ้าของบัญชีเข้ากับ username ในตาราง users
ALTER TABLE "accounts" ADD FOREIGN KEY ("owner") REFERENCES "users" ("username");

-- กฎ: ผู้ใช้ 1 คน ห้ามเปิดบัญชีสกุลเงินเดียวกันซ้ำซ้อน (เช่น Alice มีบัญชี USD ได้แค่เล่มเดียว)
ALTER TABLE "accounts" ADD CONSTRAINT "owner_currency_key" UNIQUE ("owner", "currency");`,
        },
        {
          t: "code",
          lang: "sql",
          label: "simplebank/db/migration/000002_add_users.down.sql",
          c: `ALTER TABLE IF EXISTS "accounts" DROP CONSTRAINT IF EXISTS "owner_currency_key";
ALTER TABLE IF EXISTS "accounts" DROP CONSTRAINT IF EXISTS "accounts_owner_fkey";
DROP TABLE IF EXISTS "users";`,
        },
        {
          t: "codeout",
          lang: "bash",
          label: "รัน Migration เพิ่มตาราง users และ Foreign Key ใน PostgreSQL",
          code: `make migrateup`,
          out: `migrate -path db/migration -database "postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable" -verbose up
2026/09/27 18:30:00 Start running migration 000002_add_users.up.sql
2026/09/27 18:30:00 Finished running migration 000002_add_users.up.sql (OK)`,
        },

        { t: "h2", c: "2. ทำไมห้ามเก็บ Plain Text หรือ MD5 / SHA-256 เด็ดขาด?" },
        {
          t: "p",
          c: "ถ้าฐานข้อมูลหลุด รหัสที่เก็บเป็นข้อความตรง ๆ อ่านออกทันที แฮชที่คำนวณเร็วอย่าง MD5 หรือ SHA-256 ก็เดารหัสยอดนิยมได้เร็ว เพราะเครื่องคำนวณแฮชแบบนั้นได้มหาศาลต่อวินาที ตารางรหัสที่เดาไว้ล่วงหน้าเรียกว่า rainbow table เราจึงต้องใช้แฮชที่ตั้งใจให้ช้า และเติมค่าสุ่มคนละค่าต่อรหัส แม้สองคนตั้งรหัสเดียวกัน ผลที่เก็บก็ไม่เหมือนกัน",
        },
        {
          t: "callout",
          title: "🛡️ ทางออกมาตรฐานสากล: Bcrypt",
          c: "Bcrypt เป็นอัลกอริทึมประเภท **Slow Hashing** ที่ถูกออกแบบมาให้กินเวลาประมวลผลของ CPU (มี Cost Factor หรือ Work Factor) และมีการสุ่มค่า **Salt** (ตัวแปรสุ่มพิเศษ) เติมเข้าไปในทุกรหัสผ่านโดยอัตโนมัติ ทำให้แม้ผู้ใช้สองคนจะตั้งรหัสผ่าน `123456` เหมือนกัน ค่าแฮชที่ได้ก็จะแตกต่างกันอย่างสิ้นเชิง ป้องกัน Rainbow Table ได้ 100%!",
        },

        { t: "h2", c: "3. ตัวอย่างการทำงานของ Bcrypt (Salt & Work Factor)" },
        {
          t: "p",
          c: "เพื่อทำความเข้าใจว่าทำไมรหัสผ่านเดียวกันถึงได้ Hash ต่างกัน และ Bcrypt ตรวจสอบรหัสผ่านอย่างไร ให้ติดตั้งไลบรารี `golang.org/x/crypto` ก่อน:",
        },
        {
          t: "code",
          lang: "bash",
          label: "ติดตั้งแพ็กเกจ crypto",
          c: `go get golang.org/x/crypto`,
        },
        {
          t: "codeout",
          lang: "go",
          label: "bcrypt_demo.go",
          code: `// สาธิตกลไกความปลอดภัยของ Bcrypt: การสุ่ม Salt อัตโนมัติ และการตรวจสอบรหัสผ่าน
// ทำเพื่อแก้ปัญหา: ป้องกันการแฮกผ่าน Rainbow Table เพราะรหัสผ่านเดียวกันจะได้ Hash ที่แตกต่างกันทุกครั้ง
package main

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	rawPassword := "secretPassword123"

	// 1. แฮชรหัสผ่านเดียวกัน 2 ครั้ง (Bcrypt จะสุ่ม Salt ใหม่ทุกครั้ง ทำให้ผลลัพธ์ไม่ตรงกัน)
	hash1, _ := bcrypt.GenerateFromPassword([]byte(rawPassword), bcrypt.DefaultCost)
	hash2, _ := bcrypt.GenerateFromPassword([]byte(rawPassword), bcrypt.DefaultCost)

	fmt.Println("Hash #1:", string(hash1))
	fmt.Println("Hash #2:", string(hash2))
	fmt.Println("Hashes identical?:", string(hash1) == string(hash2))

	// 2. ตรวจสอบรหัสผ่านที่ถูกต้องด้วย CompareHashAndPassword (ถ้ารหัสตรงกัน err จะเป็น nil)
	errCorrect := bcrypt.CompareHashAndPassword(hash1, []byte("secretPassword123"))
	fmt.Println("Check correct password err == nil:", errCorrect == nil)

	// 3. ตรวจสอบรหัสผ่านที่ผิด (ถ้ารหัสไม่ตรง จะส่ง Error กลับมา)
	errWrong := bcrypt.CompareHashAndPassword(hash1, []byte("wrongPassword456"))
	fmt.Println("Check wrong password error:", errWrong)
}`,
          out: `Hash #1: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
Hash #2: $2a$10$vWfPjE7zCkgvG5WlqL2Egu5K70dFwJ9o6e0jNqEaYc8hKx8bLqXsm
Hashes identical?: false (Bcrypt สุ่ม Salt ใหม่เสมอ ป้องกัน Rainbow Table)
Check correct password err == nil: true (ยืนยันรหัสถูกต้องสำเร็จ)
Check wrong password error: crypto/bcrypt: hashedPassword is not the hash of the given password`,
        },

        { t: "h2", c: "4. นำไปสร้างเป็นฟังก์ชันในโปรเจกต์ Simple Bank" },
        {
          t: "p",
          c: "เมื่อเข้าใจหลักการแล้ว ในโปรเจกต์จริงเราจะนำฟังก์ชันนี้ไปไว้ในแพ็กเกจ `util` (`simplebank/util/password.go`) เพื่อให้ Handler อื่นๆ เรียกใช้งานได้:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/util/password.go",
          c: `// ยูทิลิตี้จัดการการแฮชและตรวจสอบรหัสผ่านด้วยอัลกอริทึม Bcrypt
// ทำเพื่อแก้ปัญหา: ห้ามบันทึกรหัสผ่านเป็น Plain Text ลงฐานข้อมูลเด็ดขาด เพื่อความปลอดภัยของผู้ใช้งาน
package util

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
)

// HashPassword แปลงรหัสผ่าน Plain Text ให้กลายเป็น Bcrypt Hash พร้อมแนบ Salt อัตโนมัติ
func HashPassword(password string) (string, error) {
	// 1. แฮชรหัสผ่านโดยใช้ค่า Cost มาตรฐาน (DefaultCost = 10)
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("ไม่สามารถแฮชรหัสผ่านได้: %w", err)
	}

	// 2. คืนค่าสตริงของ Bcrypt Hash ที่พร้อมนำไปบันทึกลงคอลัมน์ hashed_password
	return string(hashedPassword), nil
}

// CheckPassword ตรวจสอบว่ารหัสผ่านที่ป้อนเข้ามา ตรงกับ Bcrypt Hash ในฐานข้อมูลหรือไม่
func CheckPassword(password string, hashedPassword string) error {
	// ใช้ CompareHashAndPassword เพื่อแกะ Salt จาก Hash แล้วนำมาเทียบกับรหัสผ่านที่ส่งเข้ามา
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}`,
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/util/password_test.go",
          c: `package util

import (
	"testing"

	"github.com/stretchr/testify/require"
	"golang.org/x/crypto/bcrypt"
)

func TestPassword(t *testing.T) {
	password := RandomString(6)

	// 1. แฮชรหัสผ่านครั้งที่ 1
	hashedPassword1, err := HashPassword(password)
	require.NoError(t, err)
	require.NotEmpty(t, hashedPassword1)

	// 2. แฮชรหัสผ่านเดิมซ้ำครั้งที่ 2 (ต้องได้ค่า Hash ต่างกันจาก Salt)
	hashedPassword2, err := HashPassword(password)
	require.NoError(t, err)
	require.NotEmpty(t, hashedPassword2)
	require.NotEqual(t, hashedPassword1, hashedPassword2)

	// 3. ตรวจสอบรหัสผ่านที่ถูกต้อง
	err = CheckPassword(password, hashedPassword1)
	require.NoError(t, err)

	// 4. ตรวจสอบรหัสผ่านที่ผิด (ต้องส่ง ErrMismatchedHashAndPassword)
	wrongPassword := RandomString(6)
	err = CheckPassword(wrongPassword, hashedPassword1)
	require.EqualError(t, err, bcrypt.ErrMismatchedHashAndPassword.Error())
}`,
        },
        {
          t: "codeout",
          lang: "bash",
          label: "คำสั่งรัน Unit Test ทดสอบฟังก์ชัน Password ใน Terminal",
          code: `go test -v -run TestPassword ./util`,
          out: `=== RUN   TestPassword
--- PASS: TestPassword (0.18s)
PASS
ok      simplebank/util 0.231s`,
        },
        {
          t: "h3", c: "อธิบายการทำงาน" },
        {
          t: "ul",
          c: [
            "**`bcrypt.DefaultCost`**: ปัจจุบันมีค่าเท่ากับ 10 หมายความว่าอัลกอริทึมจะทำการวนรอบคำนวณ $2^{10} = 1024$ รอบ ซึ่งกินเวลาประมาณ 50–100 มิลลิวินาที เป็นความเร็วที่ผู้ใช้งานไม่รู้สึกสะดุด แต่ทำให้แฮกเกอร์ไม่สามารถใช้ GPU รันสุ่มรหัสผ่านได้",
            "**`bcrypt.CompareHashAndPassword`**: ฟังก์ชันนี้จะสกัดค่า Salt ที่ฝังอยู่ใน `hashedPassword` ออกมา แล้วนำมารวมกับ `password` เพื่อคำนวณเปรียบเทียบ หากรหัสผ่านถูกต้องจะคืนค่า `nil` แต่ถ้าไม่ตรงจะคืนค่า `bcrypt.ErrMismatchedHashAndPassword`",
          ],
        },

        { t: "h2", c: "5. Model ตาราง Users และการซ่อน Hashed Password ตอนส่ง JSON" },
        {
          t: "p",
          c: "สร้าง Go Struct และฟังก์ชัน CRUD สำหรับจัดการตาราง `users` ใน `simplebank/db/user.go`:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/db/user.go",
          c: `// ฟังก์ชัน CRUD สำหรับจัดการข้อมูลผู้ใช้งานในตาราง users
// ทำเพื่อแก้ปัญหา: บันทึกข้อมูลและดึงข้อมูลผู้ใช้เพื่อตรวจสอบสิทธิ์ในการเข้าสู่ระบบ
package db

import (
	"context"
	"time"
)

type User struct {
	Username          string    \`json:"username"\`
	HashedPassword    string    \`json:"hashed_password"\`
	FullName          string    \`json:"full_name"\`
	Email             string    \`json:"email"\`
	PasswordChangedAt time.Time \`json:"password_changed_at"\`
	CreatedAt         time.Time \`json:"created_at"\`
}

type CreateUserParams struct {
	Username       string \`json:"username"\`
	HashedPassword string \`json:"hashed_password"\`
	FullName       string \`json:"full_name"\`
	Email          string \`json:"email"\`
}

const createUser = \`-- name: CreateUser :one
INSERT INTO users (
  username,
  hashed_password,
  full_name,
  email
) VALUES (
  $1, $2, $3, $4
)
RETURNING username, hashed_password, full_name, email, password_changed_at, created_at;
\`

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, createUser, arg.Username, arg.HashedPassword, arg.FullName, arg.Email)
	var i User
	err := row.Scan(
		&i.Username,
		&i.HashedPassword,
		&i.FullName,
		&i.Email,
		&i.PasswordChangedAt,
		&i.CreatedAt,
	)
	return i, err
}

const getUser = \`-- name: GetUser :one
SELECT username, hashed_password, full_name, email, password_changed_at, created_at FROM users
WHERE username = $1 LIMIT 1;
\`

func (q *Queries) GetUser(ctx context.Context, username string) (User, error) {
	row := q.db.QueryRowContext(ctx, getUser, username)
	var i User
	err := row.Scan(
		&i.Username,
		&i.HashedPassword,
		&i.FullName,
		&i.Email,
		&i.PasswordChangedAt,
		&i.CreatedAt,
	)
	return i, err
}`,
        },
        {
          t: "p",
          c: "สร้าง Handler สมัครสมาชิก `POST /users` ใน `simplebank/api/user.go` โดยเมื่อสร้างผู้ใช้สำเร็จ เรา **ห้ามส่ง `hashed_password` กลับไปใน JSON Response เด็ดขาด** จึงต้องสร้าง `userResponse` เพื่อคัดกรองข้อมูล:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/api/user.go",
          c: `// API Handler สำหรับสมัครสมาชิกใหม่ (POST /users)
package api

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	db "simplebank/db"
	"simplebank/util"
)

type createUserRequest struct {
	Username string \`json:"username" binding:"required,alphanum"\`
	Password string \`json:"password" binding:"required,min=6"\`
	FullName string \`json:"full_name" binding:"required"\`
	Email    string \`json:"email" binding:"required,email"\`
}

// userResponse คือ struct ที่ตัดฟิลด์ hashedPassword ทิ้งไปเพื่อความปลอดภัย
type userResponse struct {
	Username          string    \`json:"username"\`
	FullName          string    \`json:"full_name"\`
	Email             string    \`json:"email"\`
	PasswordChangedAt time.Time \`json:"password_changed_at"\`
	CreatedAt         time.Time \`json:"created_at"\`
}

func newUserResponse(user db.User) userResponse {
	return userResponse{
		Username:          user.Username,
		FullName:          user.FullName,
		Email:             user.Email,
		PasswordChangedAt: user.PasswordChangedAt,
		CreatedAt:         user.CreatedAt,
	}
}

func (server *Server) createUser(ctx *gin.Context) {
	// 1. ตรวจสอบเงื่อนไขข้อมูลที่ส่งมาทาง JSON
	var req createUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// 2. แฮชรหัสผ่านด้วย Bcrypt ก่อนบันทึก
	hashedPassword, err := util.HashPassword(req.Password)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// 3. บันทึกผู้ใช้ลงฐานข้อมูลผ่าน store
	arg := db.CreateUserParams{
		Username:       req.Username,
		HashedPassword: hashedPassword,
		FullName:       req.FullName,
		Email:          req.Email,
	}

	user, err := server.store.CreateUser(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// 4. ส่งกลับเฉพาะข้อมูลที่ปลอดภัย ปราศจาก hashedPassword
	rsp := newUserResponse(user)
	ctx.JSON(http.StatusCreated, rsp)
}`,
        },
        {
          t: "p",
          c: "จากนั้นเปิดไฟล์ `simplebank/api/server.go` เพื่อลงทะเบียน Route `POST /users` เข้าสู่ Gin Engine ให้สามารถเรียกใช้งานได้:",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/api/server.go",
          c: ` 	// 2. ลงทะเบียน Routing สำหรับแต่ละ Endpoint
 	router.POST("/accounts", server.createAccount)
 	router.GET("/accounts/:id", server.getAccount)
 	router.GET("/accounts", server.listAccounts)
 	router.POST("/transfers", server.createTransfer)
+	router.POST("/users", server.createUser)
 
 	server.router = router
 	return server`,
        },
        {
          t: "codeout",
          lang: "bash",
          label: "Terminal 1: รีสตาร์ตเซิร์ฟเวอร์ Go เพื่อโหลด Route ใหม่",
          code: `go run main.go`,
          out: `[GIN-debug] POST   /accounts                 --> simplebank/api.(*Server).createAccount-fm (3 handlers)
[GIN-debug] GET    /accounts/:id             --> simplebank/api.(*Server).getAccount-fm (3 handlers)
[GIN-debug] GET    /accounts                 --> simplebank/api.(*Server).listAccounts-fm (3 handlers)
[GIN-debug] POST   /transfers                --> simplebank/api.(*Server).createTransfer-fm (3 handlers)
[GIN-debug] POST   /users                    --> simplebank/api.(*Server).createUser-fm (3 handlers)
[GIN-debug] [WARNING] Listening and serving HTTP on 0.0.0.0:8080`,
        },
        {
          t: "codeout",
          lang: "http",
          label: "ทดสอบสมัครสมาชิก: POST /users (ตั้งค่าใน Postman / API Client)",
          code: `POST http://localhost:8080/users
Content-Type: application/json

{
  "username": "alice",
  "password": "secretPassword123",
  "full_name": "Alice Wonderland",
  "email": "alice@example.com"
}`,
          out: `HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "username": "alice",
  "full_name": "Alice Wonderland",
  "email": "alice@example.com",
  "password_changed_at": "0001-01-01T00:00:00Z",
  "created_at": "2026-09-26T08:35:00.124851Z"
}
# สังเกต: ฟิลด์ hashed_password ถูกตัดทิ้งไปอย่างปลอดภัย ไม่หลุดไปยังหน้าบ้านเด็ดขาด!`,
        },

        {
          t: "h2",
          c: "6. อัปเดต Unit Test (account_test.go) เพื่อป้องกัน Foreign Key Error",
        },
        {
          t: "p",
          c: "หลังจากที่เรารัน Migration `000002_add_users.up.sql` เพิ่ม Foreign Key แล้ว หากเราสั่งรัน `go test ./db` ตอนนี้เทสต์สร้างบัญชีและเทสต์โอน (`TestCreateAccount`, `TestTransferTx`) จะพังทันทีจากข้อผิดพลาด Foreign Key Violation:",
        },
        {
          t: "codeout",
          lang: "text",
          label: "Terminal Error เมื่อรัน Unit Test หลังเพิ่ม Users Table (โดยยังไม่ได้แก้ Test Helper)",
          code: `go test -v -run TestCreateAccount ./db`,
          out: `--- FAIL: TestCreateAccount (0.01s)
    account_test.go:27: 
        	Error:      	Received unexpected error: pq: insert or update on table "accounts" violates foreign key constraint "accounts_owner_fkey"
        	Test:       	TestCreateAccount
FAIL`,
        },
        {
          t: "callout",
          title: "🔍 สาเหตุและวิธีแก้ปัญหา",
          c: "ในบทที่ 5 ฟังก์ชัน `createRandomAccount` สุ่มชื่อ Owner ด้วย `util.RandomOwner()` ลอยๆ โดยไม่มีตัวตนในตาราง `users`\n\nวิธีแก้ที่ถูกต้องตามหลัก Data Integrity คือเราต้องสร้าง User จำลองขึ้นมาก่อน แล้วนำ `user.Username` นั้นมาใช้เปิดบัญชีเสมอ!",
          warn: true,
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/db/user_test.go",
          c: `package db

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
	"simplebank/util"
)

// createRandomUser สร้างผู้ใช้สุ่มลงตาราง users สำหรับใช้เป็น Foreign Key ในการเทสต์
func createRandomUser(t *testing.T) User {
	hashedPassword, err := util.HashPassword(util.RandomString(6))
	require.NoError(t, err)

	arg := CreateUserParams{
		Username:       util.RandomOwner(),
		HashedPassword: hashedPassword,
		FullName:       util.RandomOwner(),
		Email:          util.RandomString(6) + "@email.com",
	}

	user, err := testQueries.CreateUser(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, user)

	require.Equal(t, arg.Username, user.Username)
	require.Equal(t, arg.HashedPassword, user.HashedPassword)
	require.Equal(t, arg.FullName, user.FullName)
	require.Equal(t, arg.Email, user.Email)
	require.True(t, user.PasswordChangedAt.IsZero())
	require.NotZero(t, user.CreatedAt)

	return user
}`,
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/db/account_test.go",
          c: ` func createRandomAccount(t *testing.T) Account {
+	user := createRandomUser(t) // 1. สร้าง User สุ่มขึ้นมาก่อนเสมอ
+
 	arg := CreateAccountParams{
-		Owner:    util.RandomOwner(),
+		Owner:    user.Username,      // 2. ใช้ username จริงที่มี Foreign Key รองรับ
 		Balance:  util.RandomMoney(),
 		Currency: util.RandomCurrency(),
 	}`,
        },
        {
          t: "codeout",
          lang: "bash",
          label: "รัน Unit Test ทั้งหมดใน ./db อีกครั้งหลังอัปเดต (PASS 100%)",
          code: `go test -v ./db`,
          out: `=== RUN   TestCreateAccount
--- PASS: TestCreateAccount (0.02s)
=== RUN   TestGetAccount
--- PASS: TestGetAccount (0.01s)
=== RUN   TestDeleteAccount
--- PASS: TestDeleteAccount (0.01s)
=== RUN   TestListAccounts
--- PASS: TestListAccounts (0.02s)
=== RUN   TestTransferTx
--- PASS: TestTransferTx (0.08s)
=== RUN   TestTransferTxDeadlock
--- PASS: TestTransferTxDeadlock (0.09s)
PASS
ok      simplebank/db   0.312s`,
        },
      ],
      en: [],
    },
  },

  "bank-jwt-paseto-token": {
    slug: "bank-jwt-paseto-token",
    title: {
      th: "ระบบยืนยันตัวตนด้วย PASETO Token & Middleware",
      en: "Authentication with PASETO Tokens & Gin Middleware",
    },
    lead: {
      th: "ทำไมระบบสมัยใหม่จึงเลือกใช้ PASETO แทน JWT เพื่อปิดช่องโหว่ความปลอดภัย พร้อมเขียน Gin Authentication Middleware เพื่อป้องกันไม่ให้คนอื่นแอบมาโอนเงินแทนเรา",
      en: "Why modern backends choose PASETO over JWT to eliminate cipher agility flaws, plus building Gin Auth Middleware.",
    },
    group: "7. รู้ว่าใครกด และรันบนเครื่องจริง",
    blocks: {
      th: [
        {
          t: "callout",
          title: "บทนี้อยู่ตรงไหนของทาง",
          c: "สมัครสมาชิกได้แล้ว บทนี้แจก token หลังล็อกอิน แล้วบังคับให้คำสั่งบัญชีส่ง token มาด้วย `Maker` เป็น interface จากบท Go จากศูนย์ คือสัญญาว่าต้องมีเมธอดสร้าง token กับตรวจ token ไม่ใช่ inheritance",
        },
        {
          t: "p",
          c: "ล็อกอินครั้งเดียว แล้ว request ถัดไปเซิร์ฟเวอร์รู้ได้ไงว่าเป็นคนเดิม โดยไม่ต้องส่งรหัสผ่านทุกครั้ง วิธีคือแจก token หลังล็อกอิน แล้วให้ส่งมาใน header `Authorization: Bearer <token>` เซิร์ฟเวอร์ตรวจ token แล้วจึงยอมให้โอน",
        },
        {
          t: "p",
          c: "token เป็นข้อความที่เซิร์ฟเวอร์ออกให้และตรวจเองได้ รูปแบบมีหลายแบบ ในคอร์สนี้ใช้ PASETO ตารางด้านล่างเทียบกับ JWT ซึ่งเป็นรูปแบบที่เจอบ่อย ของที่ใช้ได้ทุกที่คือมี token หลังล็อกอิน และตรวจ token ก่อนแตะเงิน PASETO เป็นตัวเลือกของโปรเจกต์นี้",
        },

        { t: "h2", c: "ทำไมคอร์สนี้ใช้ PASETO และ JWT ต่างกันตรงไหน" },
        {
          t: "p",
          c: "หลายคนคงคุ้นเคยกับ **JWT (JSON Web Token)** แต่วิศวกรความปลอดภัยระดับโลกมักเตือนถึงจุดอ่อนสำคัญของ JWT ที่เรียกว่า **Algorithm Agility Flaw**:",
        },
        {
          t: "table",
          head: ["หัวข้อเปรียบเทียบ", "JWT (JSON Web Token)", "PASETO (Platform-Agnostic Security Tokens)"],
          rows: [
            [
              "การเลือกอัลกอริทึม",
              "เปิดให้ระบุใน Header ของ Token ได้ (เช่น `alg: \"HS256\"`) ซึ่งในอดีตเคยมีช่องโหว่ร้ายแรงที่แฮกเกอร์ส่ง `alg: \"none\"` เข้ามาแล้วเซิร์ฟเวอร์ข้ามการตรวจลายเซ็น!",
              "**ไร้ช่องโหว่การเลือกอัลกอริทึม!** ผู้พัฒนาไม่ต้องเลือกเอง ตัวมาตรฐานจะล็อกอัลกอริทึมที่ดีที่สุดและปลอดภัยที่สุด ณ เวอร์ชันนั้นให้ทันที (เช่น ChaCha20-Poly1305 สำหรับ Local และ Ed25519 สำหรับ Public)",
            ],
            [
              "ความง่ายในการใช้งาน",
              "นักพัฒนาต้องตั้งค่าหลายจุด มีโอกาสเลือกใช้คีย์ที่สั้นเกินไปจนถูกถอดรหัสได้ง่าย",
              "บังคับใช้ Symmetric Key ขนาด 32 ไบต์ที่แข็งแกร่งเท่านั้น ผิดพลาดจากการตั้งค่ายากมาก",
            ],
            [
              "สถานะความปลอดภัย",
              "มีประวัติถูกค้นพบช่องโหว่ในหลายไลบรารี",
              "ได้รับการยกย่องว่าเป็นมาตรฐานทองคำสำหรับ Secure Token ยุคใหม่",
            ],
          ],
        },

        { t: "h2", c: "1. ออกแบบ Payload และ PasetoMaker ใน Go" },
        {
          t: "p",
          c: "ติดตั้งแพ็กเกจที่จำเป็นสำหรับการสร้าง PASETO Token, UUID และการเข้ารหัสแบบ Symmetric:",
        },
        {
          t: "code",
          lang: "bash",
          label: "ติดตั้ง paseto, uuid และ chacha20poly1305",
          c: `go get github.com/google/uuid github.com/o1egl/paseto github.com/aead/chacha20poly1305`,
        },
        {
          t: "p",
          c: "ข้อมูลภายใน Token จะประกอบด้วย `Username`, เวลาที่ออกตั๋ว (`IssuedAt`), และเวลาหมดอายุ (`ExpiredAt`):",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/token/payload.go",
          c: `// นิยาม Payload สำหรับบรรจุข้อมูลประจำตัวของผู้ใช้ที่ถูกเข้ารหัสไว้ใน Token
// ทำเพื่อแก้ปัญหา: จัดเก็บตัวตน (Username) วันหมดอายุ (ExpiredAt) และ UUID เฉพาะตัว เพื่อใช้ระบุสิทธิ์ของผู้ใช้งานในระบบ
package token

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

// ข้อผิดพลาดมาตรฐานเมื่อ Token หมดอายุหรือไม่ถูกต้อง
var ErrExpiredToken = errors.New("ตั๋วรับรองหมดอายุแล้ว")
var ErrInvalidToken = errors.New("ตั๋วรับรองไม่ถูกต้อง")

// Payload เก็บข้อมูลสำคัญที่ผูกอยู่กับ Token แต่ละใบ
type Payload struct {
	ID        uuid.UUID \`json:"id"\`         // รหัสเฉพาะของตั๋วใบนี้ (ใช้ป้องกันการนำตั๋วมาใช้ซ้ำ)
	Username  string    \`json:"username"\`   // ชื่อผู้ใช้เจ้าของตั๋ว
	IssuedAt  time.Time \`json:"issued_at"\`  // วันเวลาที่สร้างตั๋ว
	ExpiredAt time.Time \`json:"expired_at"\` // วันเวลาที่ตั๋วหมดอายุ
}

// NewPayload สร้าง Payload ใหม่สำหรับผู้ใช้ พร้อมกำหนดระยะเวลาหมดอายุ
func NewPayload(username string, duration time.Duration) (*Payload, error) {
	// 1. สุ่มสร้าง UUID v4 สำหรับใช้เป็น Token ID ที่ไม่ซ้ำใครในโลก
	tokenID, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}

	// 2. กำหนดเวลาเริ่มต้นและคำนวณเวลาหมดอายุ
	payload := &Payload{
		ID:        tokenID,
		Username:  username,
		IssuedAt:  time.Now(),
		ExpiredAt: time.Now().Add(duration),
	}
	return payload, nil
}

// Valid ตรวจสอบว่าตั๋วใบนี้ยังไม่หมดอายุใช่หรือไม่
func (payload *Payload) Valid() error {
	// 1. ถ้าเวลาปัจจุบันเลยเวลา ExpiredAt ไปแล้ว ให้แจ้งเตือนว่าตั๋วหมดอายุ
	if time.Now().After(payload.ExpiredAt) {
		return ErrExpiredToken
	}
	return nil
} `,
        },
        {
          t: "p",
          c: "สร้างอินเทอร์เฟซ `Maker` ใน `simplebank/token/maker.go` เป็นสัญญาว่าต้องมี `CreateToken` กับ `VerifyToken` `PasetoMaker` ไม่ได้สืบทอดจาก `Maker` แค่มีสองเมธอดนี้ครบ จึงใส่ในตัวแปรชนิด `Maker` ได้ และสลับไปใช้ JWT ทีหลังได้โดยไม่แก้คนเรียก:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/token/maker.go",
          c: `// Maker คือ Interface สำหรับสร้างและตรวจสอบความถูกต้องของ Token รับรองตัวตน
// ทำเพื่อแก้ปัญหา: ออกแบบตามหลัก Clean Architecture เพื่อให้สลับระบบ Token ได้อย่างอิสระ (เช่น สลับระหว่าง PASETO กับ JWT)
// และช่วยให้ Mock ตัว Maker ได้อย่างง่ายดายในการเขียน Unit Test สำหรับ API Handlers
package token

import "time"

// Maker เป็นสัญญา (Contract) ที่กำหนดว่าระบบจัดการ Token ต้องมีฟังก์ชันใดบ้าง
type Maker interface {
	// CreateToken สร้างตั๋ว Token ใหม่สำหรับ username ที่ระบุ พร้อมกำหนดเวลาหมดอายุ
	CreateToken(username string, duration time.Duration) (string, error)

	// VerifyToken ตรวจสอบความถูกต้องและถอดรหัส Token เพื่อคืนค่า Payload ของผู้ใช้ออกมา
	VerifyToken(token string) (*Payload, error)
}`,
        },
        {
          t: "p",
          c: "จากนั้นสร้าง `PasetoMaker` ใน `simplebank/token/paseto_maker.go` โดยใช้ Symmetric Encryption แบบ ChaCha20-Poly1305:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/token/paseto_maker.go",
          c: `// PasetoMaker จัดการสร้างและถอดรหัส PASETO Token (Platform-Agnostic Security Tokens) เวอร์ชัน 2 Local (Symmetric)
// ทำเพื่อแก้ปัญหา: มอบระบบรักษาความปลอดภัยที่เหนือกว่า JWT โดยขจัดปัญหา 'None' algorithm attack และบังคับใช้ ChaCha20-Poly1305
package token

import (
	"fmt"
	"time"

	"github.com/aead/chacha20poly1305"
	"github.com/o1egl/paseto"
)

// PasetoMaker จัดการ PASETO Token ด้วยการเข้ารหัสแบบ Symmetric (ใช้คีย์ลับเดียวในการทั้งเข้ารหัสและถอดรหัส)
type PasetoMaker struct {
	paseto       *paseto.V2
	symmetricKey []byte
}

// NewPasetoMaker สร้าง PasetoMaker ใหม่ พร้อมตรวจสอบความยาวของคีย์ลับ
func NewPasetoMaker(symmetricKey string) (Maker, error) {
	// 1. ChaCha20-Poly1305 บังคับใช้คีย์ความยาว 32 ไบต์พอดี (chacha20poly1305.KeySize = 32)
	if len(symmetricKey) != chacha20poly1305.KeySize {
		return nil, fmt.Errorf("ขนาด key ไม่ถูกต้อง: ต้องมีขนาด %d ไบต์พอดี", chacha20poly1305.KeySize)
	}

	// 2. สร้าง Instance ของ Paseto V2 และบันทึกคีย์ลับในรูป []byte
	maker := &PasetoMaker{
		paseto:       paseto.NewV2(),
		symmetricKey: []byte(symmetricKey),
	}
	return maker, nil
}

// CreateToken สร้าง Token โดยบรรจุ Payload เข้าไปแล้วเข้ารหัสด้วย Symmetric Key
func (maker *PasetoMaker) CreateToken(username string, duration time.Duration) (string, error) {
	// 1. สร้าง Payload ที่ระบุชื่อผู้ใช้และเวลาหมดอายุ
	payload, err := NewPayload(username, duration)
	if err != nil {
		return "", err
	}

	// 2. เข้ารหัส Payload เป็นข้อความ Token แบบ Encrypted (v2.local)
	return maker.paseto.Encrypt(maker.symmetricKey, payload, nil)
}

// VerifyToken ถอดรหัส Token และตรวจสอบว่าตั๋วยังไม่หมดอายุ
func (maker *PasetoMaker) VerifyToken(token string) (*Payload, error) {
	payload := &Payload{}

	// 1. ถอดรหัสข้อความ Token ด้วย Symmetric Key แล้วแกะใส่ struct Payload
	err := maker.paseto.Decrypt(token, maker.symmetricKey, payload, nil)
	if err != nil {
		return nil, ErrInvalidToken
	}

	// 2. ตรวจสอบว่าตั๋วหมดอายุไปแล้วหรือยังผ่าน payload.Valid()
	err = payload.Valid()
	if err != nil {
		return nil, err
	}

	return payload, nil
}`,
        },
        { t: "h2", c: "2. สร้าง Endpoint ล็อกอิน: `POST /users/login`" },
        {
          t: "p",
          c: "สร้าง Handler ล็อกอิน `POST /users/login` ใน `simplebank/api/user.go` เพื่อตรวจสอบรหัสผ่านและสร้าง PASETO Token ส่งกลับไปให้ผู้ใช้ โดยการแก้ไขไฟล์ `simplebank/api/user.go` เดิมมี 2 จุดสำคัญที่ต้องทำ:\n1. เพิ่ม `\"database/sql\"` เข้าไปใน `import` เพื่อใช้ตรวจสอบข้อผิดพลาด `sql.ErrNoRows` (เมื่อไม่พบชื่อผู้ใช้ในระบบ)\n2. เขียน Struct คำขอ/การตอบกลับ และฟังก์ชัน `loginUser` ต่อท้ายฟังก์ชัน `createUser` เดิม",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/api/user.go",
          c: ` package api
 
 import (
+	"database/sql"
 	"net/http"
 	"time"
 
 	"github.com/gin-gonic/gin"
 	db "simplebank/db"
 	"simplebank/util"
 )
 
 // ... โค้ดเดิม createUserRequest, userResponse, newUserResponse, createUser ...
 	rsp := newUserResponse(user)
 	ctx.JSON(http.StatusCreated, rsp)
 }
+
+type loginUserRequest struct {
+	Username string \`json:"username" binding:"required,alphanum"\`
+	Password string \`json:"password" binding:"required,min=6"\`
+}
+
+type loginUserResponse struct {
+	AccessToken string       \`json:"access_token"\`
+	User        userResponse \`json:"user"\`
+}
+
+func (server *Server) loginUser(ctx *gin.Context) {
+	// 1. ตรวจสอบเงื่อนไขข้อมูลที่ส่งมาทาง JSON
+	var req loginUserRequest
+	if err := ctx.ShouldBindJSON(&req); err != nil {
+		ctx.JSON(http.StatusBadRequest, errorResponse(err))
+		return
+	}
+
+	// 2. ดึงข้อมูลผู้ใช้จากฐานข้อมูลเพื่อหารหัสผ่านที่แฮชไว้
+	user, err := server.store.GetUser(ctx, req.Username)
+	if err != nil {
+		if err == sql.ErrNoRows {
+			ctx.JSON(http.StatusNotFound, errorResponse(err))
+			return
+		}
+		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
+		return
+	}
+
+	// 3. ตรวจสอบความถูกต้องของรหัสผ่านผ่าน Bcrypt
+	err = util.CheckPassword(req.Password, user.HashedPassword)
+	if err != nil {
+		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
+		return
+	}
+
+	// 4. ออก PASETO Token รับรองตัวตน (กำหนดอายุ 15 นาทีตามที่ Server ระบุ)
+	accessToken, err := server.tokenMaker.CreateToken(user.Username, server.tokenDuration)
+	if err != nil {
+		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
+		return
+	}
+
+	rsp := loginUserResponse{
+		AccessToken: accessToken,
+		User:        newUserResponse(user),
+	}
+	ctx.JSON(http.StatusOK, rsp)
+}`,
        },
        {
          t: "callout",
          title: "💡 การทำงานร่วมกันของ tokenMaker & tokenDuration ใน Server struct",
          c: "สังเกตว่าใน `loginUser` มีการเรียกใช้งาน `server.tokenMaker` และ `server.tokenDuration`:\n- ตัวแปรทั้งสองนี้จะถูกผูกเข้ากับ `Server` struct ใน `simplebank/api/server.go`\n- เมื่อเราสร้าง Auth Middleware ในขั้นตอนที่ 3 และอัปเดต Handlers ในขั้นตอนที่ 4 เสร็จแล้ว ใน**ขั้นตอนที่ 5** เราจะทำการอัปเกรด `server.go` รวบยอด เพื่อลงทะเบียน Route `POST /users/login` และผูก Middleware ปกป้อง Endpoint อื่นๆ อย่างเป็นระบบ!",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/api/user.go",
          c: `// API Handler สำหรับจัดการผู้ใช้งาน (POST /users และ POST /users/login)
package api

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	db "simplebank/db"
	"simplebank/util"
)

type createUserRequest struct {
	Username string \`json:"username" binding:"required,alphanum"\`
	Password string \`json:"password" binding:"required,min=6"\`
	FullName string \`json:"full_name" binding:"required"\`
	Email    string \`json:"email" binding:"required,email"\`
}

// userResponse คือ struct ที่ตัดฟิลด์ hashedPassword ทิ้งไปเพื่อความปลอดภัย
type userResponse struct {
	Username          string    \`json:"username"\`
	FullName          string    \`json:"full_name"\`
	Email             string    \`json:"email"\`
	PasswordChangedAt time.Time \`json:"password_changed_at"\`
	CreatedAt         time.Time \`json:"created_at"\`
}

func newUserResponse(user db.User) userResponse {
	return userResponse{
		Username:          user.Username,
		FullName:          user.FullName,
		Email:             user.Email,
		PasswordChangedAt: user.PasswordChangedAt,
		CreatedAt:         user.CreatedAt,
	}
}

func (server *Server) createUser(ctx *gin.Context) {
	// 1. ตรวจสอบเงื่อนไขข้อมูลที่ส่งมาทาง JSON
	var req createUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// 2. แฮชรหัสผ่านด้วย Bcrypt ก่อนบันทึก
	hashedPassword, err := util.HashPassword(req.Password)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// 3. บันทึกผู้ใช้ลงฐานข้อมูลผ่าน store
	arg := db.CreateUserParams{
		Username:       req.Username,
		HashedPassword: hashedPassword,
		FullName:       req.FullName,
		Email:          req.Email,
	}

	user, err := server.store.CreateUser(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// 4. ส่งกลับเฉพาะข้อมูลที่ปลอดภัย ปราศจาก hashedPassword
	rsp := newUserResponse(user)
	ctx.JSON(http.StatusCreated, rsp)
}

type loginUserRequest struct {
	Username string \`json:"username" binding:"required,alphanum"\`
	Password string \`json:"password" binding:"required,min=6"\`
}

type loginUserResponse struct {
	AccessToken string       \`json:"access_token"\`
	User        userResponse \`json:"user"\`
}

func (server *Server) loginUser(ctx *gin.Context) {
	// 1. ตรวจสอบเงื่อนไขข้อมูลที่ส่งมาทาง JSON
	var req loginUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// 2. ดึงข้อมูลผู้ใช้จากฐานข้อมูลเพื่อหารหัสผ่านที่แฮชไว้
	user, err := server.store.GetUser(ctx, req.Username)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// 3. ตรวจสอบความถูกต้องของรหัสผ่านผ่าน Bcrypt
	err = util.CheckPassword(req.Password, user.HashedPassword)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}

	// 4. ออก PASETO Token รับรองตัวตน (กำหนดอายุ 15 นาทีตามที่ Server ระบุ)
	accessToken, err := server.tokenMaker.CreateToken(user.Username, server.tokenDuration)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := loginUserResponse{
		AccessToken: accessToken,
		User:        newUserResponse(user),
	}
	ctx.JSON(http.StatusOK, rsp)
}`,
        },

        { t: "h2", c: "3. การสร้าง Gin Authentication Middleware" },
        {
          t: "p",
          c: "เราจะสร้าง Middleware มาดักหน้าทุก Endpoint ที่ต้องการความปลอดภัย หากไม่มี Token หรือ Token ปลอม ระบบจะปฏิเสธคำขอทันทีด้วย **401 Unauthorized**:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/api/middleware.go",
          c: `// Middleware ตรวจสอบตั๋วรับรองตัวตน (Authentication Middleware) สำหรับ Gin Framework
// ทำเพื่อแก้ปัญหา: สกัดกั้นคำขอที่ไม่ได้รับอนุญาตก่อนที่จะหลุดเข้าไปถึง API Handlers ที่สำคัญ (เช่น การเปิดบัญชี หรือการโอนเงิน)
// โดยจะดักจับ Authorization Header, ตรวจสอบประเภท Bearer, และถอดรหัส PASETO Token
package api

import (
	"errors"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"simplebank/token"
)

const (
	authorizationHeaderKey  = "authorization"        // ชื่อ Header ที่ Client ต้องแนบมาใน HTTP Request
	authorizationTypeBearer = "bearer"               // ชนิดของตั๋วรับรอง ต้องขึ้นต้นด้วย Bearer เสมอ
	authorizationPayloadKey = "authorization_payload" // คีย์สำหรับฝาก Payload ไว้ใน gin.Context เพื่อส่งต่อให้ Handlers
)

// authMiddleware รับ tokenMaker เพื่อนำมาใช้ตรวจสอบความถูกต้องของ Token
func authMiddleware(tokenMaker token.Maker) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// 1. ดึงค่า Authorization Header ออกมาจากคำขอ
		authHeader := ctx.GetHeader(authorizationHeaderKey)
		if len(authHeader) == 0 {
			err := errors.New("ไม่มีการแนบ Authorization Header")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		// 2. แยกข้อความออกเป็นส่วนๆ (คาดหวังรูปแบบ: "Bearer <token_string>")
		fields := strings.Fields(authHeader)
		if len(fields) < 2 {
			err := errors.New("รูปแบบ Authorization Header ไม่ถูกต้อง")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		// 3. ตรวจสอบว่าคำนำหน้าเป็น "bearer" (ไม่สนใจตัวพิมพ์เล็ก-ใหญ่)
		authorizationType := strings.ToLower(fields[0])
		if authorizationType != authorizationTypeBearer {
			err := errors.New("ประเภทของ Authorization ต้องเป็น Bearer เท่านั้น")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		// 4. นำตัว Token ข้อความส่วนที่สองไปถอดรหัสและตรวจสอบความถูกต้องผ่าน tokenMaker
		accessToken := fields[1]
		payload, err := tokenMaker.VerifyToken(accessToken)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		// 5. เมื่อตั๋วถูกต้อง บันทึก payload ของผู้ใช้ไว้ใน gin.Context เพื่อให้ Handler ด้านในดึงไปใช้ต่อ
		ctx.Set(authorizationPayloadKey, payload)

		// 6. ส่งผ่านการควบคุมไปยัง Handler ลำดับถัดไป
		ctx.Next()
	}
}`,
        },
        { t: "h2", c: "5. ปกป้อง Endpoints เดิมด้วย Token (Accounts & Transfers)" },
        {
          t: "p",
          c: "เมื่อเรานำ `authMiddleware` มาครอบ Route กลุ่ม `/accounts` และ `/transfers` แล้ว เราจำเป็นต้องอัปเดต Handler ให้ดึงตัวตนของผู้ใช้จาก **`authPayload.Username`** แทนการรับค่าจากผู้ใช้ตรงๆ เพื่อปิดช่องโหว่ความปลอดภัยทุกจุด:",
        },

        { t: "h3", c: "5.1 อัปเดต `createAccount`: ตัดฟิลด์ owner ออกจาก JSON Body" },
        {
          t: "p",
          c: "ผู้ใช้ที่ล็อกอินแล้วไม่จำเป็นต้องส่ง `owner` ใน JSON Body อีกต่อไป เพราะเราสามารถดึงชื่อเจ้าของจาก Token ได้โดยตรง ป้องกันการแอบเปิดบัญชีในนามของผู้อื่น 100% (อย่าลืมเพิ่ม `\"errors\"` และ `\"simplebank/token\"` ใน imports):",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/api/account.go",
          c: ` package api
 
 import (
 	"database/sql"
+	"errors"
 	"net/http"
 
 	"github.com/gin-gonic/gin"
 	db "simplebank/db"
+	"simplebank/token"
 )
 
 type createAccountRequest struct {
-	Owner    string \`json:"owner" binding:"required"\`
 	Currency string \`json:"currency" binding:"required,currency"\` // ไม่ต้องรับ owner ใน JSON อีกต่อไป!
 }
 
 func (server *Server) createAccount(ctx *gin.Context) {
 	var req createAccountRequest
 	if err := ctx.ShouldBindJSON(&req); err != nil {
 		ctx.JSON(http.StatusBadRequest, errorResponse(err))
 		return
 	}
 
+	// ดึงข้อมูลตัวตนของเจ้าของ Token จาก Context
+	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
+
 	arg := db.CreateAccountParams{
-		Owner:    req.Owner,
+		Owner:    authPayload.Username, // ใช้ username จาก Token โดยตรง ปลอดภัย 100%
 		Currency: req.Currency,
 		Balance:  0,
 	}
 
 	account, err := server.store.CreateAccount(ctx, arg)
 	if err != nil {
 		ctx.JSON(http.StatusForbidden, errorResponse(err))
 		return
 	}
 
 	ctx.JSON(http.StatusCreated, account)
 }`,
        },

        { t: "h3", c: "5.2 อัปเดต `getAccount`: ห้ามแอบส่องยอดเงินของผู้อื่น" },
        {
          t: "p",
          c: "ตรวจสอบว่าบัญชีที่ต้องการดู เป็นของผู้ใช้ที่ถือ Token หรือไม่ หากไม่ใช่ให้ส่ง **401 Unauthorized** ทันที:",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/api/account.go",
          c: ` 	account, err := server.store.GetAccount(ctx, req.ID)
 	if err != nil {
 		if err == sql.ErrNoRows {
 			ctx.JSON(http.StatusNotFound, errorResponse(err))
 			return
 		}
 		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
 		return
 	}
 
+	// ตรวจสอบสิทธิ์ความเป็นเจ้าของบัญชี
+	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
+	if account.Owner != authPayload.Username {
+		err := errors.New("บัญชีนี้ไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์เข้าถึงข้อมูล")
+		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
+		return
+	}
+
 	ctx.JSON(http.StatusOK, account)`,
        },

        { t: "h3", c: "5.3 อัปเดต `listAccounts`: กรองเฉพาะบัญชีของตัวเองเท่านั้น" },
        {
          t: "p",
          c: "ในระบบจริง เราจะไม่อนุญาตให้ผู้ใช้ทั่วไปดูรายชื่อบัญชีของลูกค้าคนอื่นทั้งธนาคาร เราจึงต้องอัปเดตทั้ง Handler ใน `api/account.go` และคิวรี `ListAccounts` ใน `db/account.go` ให้มีเงื่อนไข `WHERE owner = $1`:",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/api/account.go",
          c: ` func (server *Server) listAccounts(ctx *gin.Context) {
 	var req listAccountsRequest
 	if err := ctx.ShouldBindQuery(&req); err != nil {
 		ctx.JSON(http.StatusBadRequest, errorResponse(err))
 		return
 	}
 
+	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
 	arg := db.ListAccountsParams{
+		Owner:  authPayload.Username, // กรองเฉพาะบัญชีของเจ้าของ Token
 		Limit:  req.PageSize,
 		Offset: (req.PageID - 1) * req.PageSize,
 	}`,
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/db/account.go",
          c: ` type ListAccountsParams struct {
+	Owner  string \`json:"owner"\`
 	Limit  int32  \`json:"limit"\`
 	Offset int32  \`json:"offset"\`
 }
 
 const listAccounts = \`-- name: ListAccounts :many
 SELECT id, owner, balance, currency, created_at FROM accounts
+WHERE owner = $1
 ORDER BY id
-LIMIT $1 OFFSET $2;
+LIMIT $2 OFFSET $3;
 \`
 
 func (q *Queries) ListAccounts(ctx context.Context, arg ListAccountsParams) ([]Account, error) {
-	rows, err := q.db.QueryContext(ctx, listAccounts, arg.Limit, arg.Offset)
+	rows, err := q.db.QueryContext(ctx, listAccounts, arg.Owner, arg.Limit, arg.Offset)
 	if err != nil {
 		return nil, err
 	}
 	defer rows.Close()`,
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/db/account_test.go",
          c: ` 	arg := ListAccountsParams{
+		Owner:  lastAccount.Owner,
 		Limit:  5,
 		Offset: 0,
 	}
 
 	accounts, err := testQueries.ListAccounts(context.Background(), arg)
 	require.NoError(t, err)
 	require.NotEmpty(t, accounts)
 
 	for _, account := range accounts {
 		require.NotEmpty(t, account)
+		require.Equal(t, lastAccount.Owner, account.Owner)
 	}`,
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/api/account.go",
          c: `// API Handler สำหรับจัดการบัญชี (POST /accounts, GET /accounts/:id, GET /accounts) ฉบับปลอดภัยระดับ Production
// ทำเพื่อแก้ปัญหา: ผูกบัญชีกับตัวตนของผู้ใช้ที่ล็อกอินจริง ป้องกันการแอบสร้างบัญชีในนามผู้อื่น และป้องกันการแอบดูยอดเงินของลูกค้าคนอื่น
package api

import (
	"database/sql"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	db "simplebank/db"
	"simplebank/token"
)

type createAccountRequest struct {
	Currency string \`json:"currency" binding:"required,currency"\`
}

func (server *Server) createAccount(ctx *gin.Context) {
	// 1. ตรวจสอบรูปแบบข้อมูลที่ส่งมาทาง JSON Payload
	var req createAccountRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// 2. ดึงข้อมูลตัวตน (Username) จาก Token Payload ที่บันทึกไว้ใน gin.Context
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	// 3. เตรียมพารามิเตอร์โดยบังคับให้ Owner เป็น Username ของผู้ถือ Token เท่านั้น
	arg := db.CreateAccountParams{
		Owner:    authPayload.Username,
		Currency: req.Currency,
		Balance:  0, // ยอดเงินเปิดบัญชีเริ่มต้นที่ 0 เสมอ
	}

	// 4. บันทึกบัญชีใหม่ลงฐานข้อมูล PostgreSQL ผ่าน Store
	account, err := server.store.CreateAccount(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusForbidden, errorResponse(err))
		return
	}

	// 5. ส่งข้อมูลบัญชีที่สร้างเสร็จสมบูรณ์กลับไปในรูปแบบ JSON พร้อม HTTP Status 201 Created
	ctx.JSON(http.StatusCreated, account)
}

type getAccountRequest struct {
	ID int64 \`uri:"id" binding:"required,min=1"\`
}

func (server *Server) getAccount(ctx *gin.Context) {
	// 1. แกะค่า ID จาก URI Parameter (เช่น /accounts/1)
	var req getAccountRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// 2. ค้นหาข้อมูลบัญชีจากฐานข้อมูลตาม ID
	account, err := server.store.GetAccount(ctx, req.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// 3. ตรวจสอบสิทธิ์ความเป็นเจ้าของ: บัญชีนี้ต้องเป็นของเจ้าของ Token เท่านั้น
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if account.Owner != authPayload.Username {
		err := errors.New("บัญชีนี้ไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์เข้าถึงข้อมูล")
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}

	// 4. ส่งข้อมูลบัญชีกลับไปพร้อม HTTP Status 200 OK
	ctx.JSON(http.StatusOK, account)
}

type listAccountsRequest struct {
	PageID   int32 \`form:"page_id" binding:"required,min=1"\`
	PageSize int32 \`form:"page_size" binding:"required,min=5,max=10"\`
}

func (server *Server) listAccounts(ctx *gin.Context) {
	// 1. แกะ Query Parameters สำหรับแบ่งหน้า (Pagination)
	var req listAccountsRequest
	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// 2. ดึง Username จาก Token และคำนวณ Limit/Offset
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	arg := db.ListAccountsParams{
		Owner:  authPayload.Username, // กรองเฉพาะบัญชีของเจ้าของ Token
		Limit:  req.PageSize,
		Offset: (req.PageID - 1) * req.PageSize,
	}

	// 3. ค้นหารายชื่อบัญชีจากฐานข้อมูล
	accounts, err := server.store.ListAccounts(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// 4. ส่งรายชื่อบัญชีกลับไปพร้อม HTTP Status 200 OK
	ctx.JSON(http.StatusOK, accounts)
}`,
        },

        { t: "h3", c: "5.4 อัปเดต `createTransfer`: ป้องกันการสั่งโอนเงินแทนผู้อื่น" },
        {
          t: "p",
          c: "ในฟังก์ชัน `createTransfer` ของ `simplebank/api/transfer.go` เราต้องเพิ่มการตรวจสอบว่า **ผู้ใช้ที่ถือ Token ล็อกอินเข้ามา เป็นเจ้าของบัญชีต้นทาง (`FromAccountID`) จริงหรือไม่** โดยอาศัย `fromAccount` ที่ส่งคืนมาจาก `validAccount`:",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/api/transfer.go",
          c: ` package api
 
 import (
 	"database/sql"
+	"errors"
 	"fmt"
 	"net/http"
 
 	"github.com/gin-gonic/gin"
 	db "simplebank/db"
+	"simplebank/token"
 )
 
 // ... โค้ด transferRequest เดิม ...
 
 func (server *Server) createTransfer(ctx *gin.Context) {
 	var req transferRequest
 	if err := ctx.ShouldBindJSON(&req); err != nil {
 		ctx.JSON(http.StatusBadRequest, errorResponse(err))
 		return
 	}
 
 	// 2. ตรวจสอบว่าบัญชีต้นทางมีอยู่จริง และสกุลเงินตรงกับคำขอโอนหรือไม่
 	fromAccount, valid := server.validAccount(ctx, req.FromAccountID, req.Currency)
 	if !valid {
 		return
 	}
 
+	// ดึงข้อมูลตัวตนจาก Auth Middleware และตรวจสอบสิทธิ์ความเป็นเจ้าของ
+	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
+	if fromAccount.Owner != authPayload.Username {
+		err := errors.New("บัญชีต้นทางไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์โอนเงิน")
+		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
+		return
+	}
+
 	// 3. ตรวจสอบว่าบัญชีปลายทางมีอยู่จริง และสกุลเงินตรงกับคำขอโอนหรือไม่
 	_, valid = server.validAccount(ctx, req.ToAccountID, req.Currency)
 	if !valid {
 		return
 	}`,
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/api/transfer.go",
          c: `// API Handler สำหรับจัดการการโอนเงิน (POST /transfers) ฉบับปลอดภัยระดับ Production
// ทำเพื่อแก้ปัญหา: บังคับให้ผู้สั่งโอนต้องเป็นเจ้าของบัญชีต้นทางจริง ป้องกันการขโมยเงินหรือสั่งโอนเงินแทนผู้อื่น
package api

import (
	"database/sql"
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	db "simplebank/db"
	"simplebank/token"
)

type transferRequest struct {
	FromAccountID int64  \`json:"from_account_id" binding:"required,min=1"\`
	ToAccountID   int64  \`json:"to_account_id" binding:"required,min=1"\`
	Amount        int64  \`json:"amount" binding:"required,gt=0"\`
	Currency      string \`json:"currency" binding:"required,currency"\`
}

func (server *Server) createTransfer(ctx *gin.Context) {
	// 1. ตรวจสอบเงื่อนไขข้อมูลที่ส่งมาทาง JSON
	var req transferRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// 2. ตรวจสอบว่าบัญชีต้นทางมีอยู่จริง และสกุลเงินตรงกับคำขอโอนหรือไม่
	fromAccount, valid := server.validAccount(ctx, req.FromAccountID, req.Currency)
	if !valid {
		return
	}

	// 3. ตรวจสอบสิทธิ์ความเป็นเจ้าของบัญชีต้นทาง: ต้องตรงกับ Username ใน Token
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if fromAccount.Owner != authPayload.Username {
		err := errors.New("บัญชีต้นทางไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์โอนเงิน")
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}

	// 4. ตรวจสอบว่าบัญชีปลายทางมีอยู่จริง และสกุลเงินตรงกับคำขอโอนหรือไม่
	_, valid = server.validAccount(ctx, req.ToAccountID, req.Currency)
	if !valid {
		return
	}

	// 5. เตรียมพารามิเตอร์สำหรับรัน Transaction การโอนเงิน
	arg := db.TransferTxParams{
		FromAccountID: fromAccount.ID,
		ToAccountID:   req.ToAccountID,
		Amount:        req.Amount,
	}

	// 6. ดำเนินการโอนเงินระดับธุรกรรม ACID ผ่านฟังก์ชัน TransferTx
	result, err := server.store.TransferTx(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// 7. ส่งผลลัพธ์การโอนเงิน (Transfer, Entries, บัญชีที่อัปเดตแล้ว) กลับไปให้ผู้ใช้
	ctx.JSON(http.StatusOK, result)
}

// validAccount ตรวจสอบว่าบัญชีมีอยู่จริงและสกุลเงินตรงกันหรือไม่
func (server *Server) validAccount(ctx *gin.Context, accountID int64, currency string) (db.Account, bool) {
	// 1. ค้นหาบัญชีจากฐานข้อมูล
	account, err := server.store.GetAccount(ctx, accountID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return account, false
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return account, false
	}

	// 2. ตรวจสอบว่าสกุลเงินของบัญชีตรงกับสกุลเงินที่ต้องการโอนหรือไม่
	if account.Currency != currency {
		err := fmt.Errorf("สกุลเงินของบัญชี [%d] คือ %s ไม่ตรงกับคำขอโอน %s", accountID, account.Currency, currency)
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return account, false
	}

	return account, true
}`,
        },

        { t: "h2", c: "5. นำทุก Route มาประกอบเข้าด้วยกันใน `simplebank/api/server.go`" },
        {
          t: "p",
          c: "เมื่อเตรียมทั้ง Auth Middleware และ Handler ทุกตัวพร้อมแล้ว ให้นำมาผูกเข้าด้วยกันใน `simplebank/api/server.go` โดยส่ง `tokenSymmetricKey` และ `tokenDuration` เข้ามาเพื่อสร้าง `tokenMaker` ใน `Server` struct พร้อมแยก Public Routes (สมัครสมาชิก/ล็อกอิน) ออกจาก Protected Routes (บัญชีและการโอนเงิน):",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/api/server.go",
          c: ` type Server struct {
 	store         *db.Store
+	tokenMaker    token.Maker
+	tokenDuration time.Duration
 	router        *gin.Engine
 }
 
-func NewServer(store *db.Store) *Server {
-	server := &Server{store: store}
+func NewServer(store *db.Store, tokenSymmetricKey string, tokenDuration time.Duration) (*Server, error) {
+	tokenMaker, err := token.NewPasetoMaker(tokenSymmetricKey)
+	if err != nil {
+		return nil, fmt.Errorf("cannot create token maker: %w", err)
+	}
+
+	server := &Server{
+		store:         store,
+		tokenMaker:    tokenMaker,
+		tokenDuration: tokenDuration,
+	}
 
 	router := gin.Default()
 
 	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
 		v.RegisterValidation("currency", validCurrency)
 	}
 
-	router.POST("/accounts", server.createAccount)
-	router.GET("/accounts/:id", server.getAccount)
-	router.GET("/accounts", server.listAccounts)
-	router.POST("/transfers", server.createTransfer)
-	router.POST("/users", server.createUser)
+	// 1. เส้นทางสาธารณะ (Public Routes): เข้าถึงได้โดยไม่ต้องแนบ Token
+	router.POST("/users", server.createUser)
+	router.POST("/users/login", server.loginUser)
+
+	// 2. เส้นทางส่วนตัว (Protected Routes): ต้องผ่าน authMiddleware ก่อนเสมอ
+	authRoutes := router.Group("/").Use(authMiddleware(server.tokenMaker))
+	authRoutes.POST("/accounts", server.createAccount)
+	authRoutes.GET("/accounts/:id", server.getAccount)
+	authRoutes.GET("/accounts", server.listAccounts)
+	authRoutes.POST("/transfers", server.createTransfer)
 
 	server.router = router
-	return server
+	return server, nil
 }`,
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/api/server.go",
          c: `// โครงสร้าง Server และการผูก Routing พร้อมระบบ Authentication Token Middleware
// ทำเพื่อแก้ปัญหา: จัดกลุ่มเส้นทาง API ระหว่าง Public Routes (ไม่ล็อกอิน) กับ Protected Routes (ต้องมี Token)
package api

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
	db "simplebank/db"
	"simplebank/token"
)

type Server struct {
	store         *db.Store
	tokenMaker    token.Maker
	tokenDuration time.Duration
	router        *gin.Engine
}

// NewServer รับ store, tokenSymmetricKey และ tokenDuration พร้อมสร้าง PasetoMaker สำหรับสร้างและตรวจสอบ Token
func NewServer(store *db.Store, tokenSymmetricKey string, tokenDuration time.Duration) (*Server, error) {
	// 1. สร้าง Instance ของ PasetoMaker จากคีย์ลับสมมาตร 32 bytes
	tokenMaker, err := token.NewPasetoMaker(tokenSymmetricKey)
	if err != nil {
		return nil, fmt.Errorf("ไม่สามารถสร้าง token maker ได้: %w", err)
	}

	server := &Server{
		store:         store,
		tokenMaker:    tokenMaker,
		tokenDuration: tokenDuration,
	}

	router := gin.Default()

	// 2. ลงทะเบียน Custom Validator สำหรับตรวจสอบสกุลเงิน (currency)
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterValidation("currency", validCurrency)
	}

	// 3. เส้นทางสาธารณะ (Public Routes): ใครก็เข้าถึงได้ เช่น สมัครสมาชิก หรือ ล็อกอิน
	router.POST("/users", server.createUser)
	router.POST("/users/login", server.loginUser)

	// 4. เส้นทางส่วนตัว (Protected Routes): ต้องผ่าน authMiddleware ตรวจสอบ Token ก่อนเสมอ
	authRoutes := router.Group("/").Use(authMiddleware(server.tokenMaker))
	authRoutes.POST("/accounts", server.createAccount)
	authRoutes.GET("/accounts/:id", server.getAccount)
	authRoutes.GET("/accounts", server.listAccounts)
	authRoutes.POST("/transfers", server.createTransfer)

	server.router = router
	return server, nil
}

// Start รันเซิร์ฟเวอร์ HTTP บน Address ที่ระบุ
func (server *Server) Start(address string) error {
	return server.router.Run(address)
}

// errorResponse จัดรูปแบบข้อความ Error ให้อยู่ใน JSON Key "error" อย่างสม่ำเสมอ
func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}`,
        },

        { t: "h2", c: "6. อัปเดต `main.go` และสตาร์ตเซิร์ฟเวอร์ (Terminal 1)" },
        {
          t: "p",
          c: "อัปเดตไฟล์ `simplebank/main.go` ให้ประกาศคีย์ลับ `tokenSymmetricKey` (32 อักขระ) และ `tokenDuration` (15 นาที) แล้วส่งเข้าไปตอนสร้าง Server ด้วย `api.NewServer(store, tokenSymmetricKey, tokenDuration)`:",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/main.go",
          c: ` package main
 
 import (
 	"database/sql"
 	"log"
+	"time"
 
 	_ "github.com/lib/pq"
 	"simplebank/api"
 	db "simplebank/db"
 )
 
 const (
 	dbDriver      = "postgres"
 	dbSource      = "postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable"
 	serverAddress = "0.0.0.0:8080"
+	// คีย์ลับสมมาตร 32 อักขระสำหรับเข้ารหัส ChaCha20-Poly1305 ใน PASETO
+	tokenSymmetricKey = "12345678901234567890123456789012"
+	tokenDuration     = 15 * time.Minute
 )
 
 func main() {
 	conn, err := sql.Open(dbDriver, dbSource)
 	if err != nil {
 		log.Fatal("cannot connect to db:", err)
 	}
 
 	store := db.NewStore(conn)
-	server := api.NewServer(store)
+	server, err := api.NewServer(store, tokenSymmetricKey, tokenDuration)
+	if err != nil {
+		log.Fatal("cannot create server:", err)
+	}
 
 	err = server.Start(serverAddress)
 	if err != nil {
 		log.Fatal("cannot start server:", err)
 	}
 }`,
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/main.go",
          c: `package main

import (
	"database/sql"
	"log"
	"time"

	_ "github.com/lib/pq"
	"simplebank/api"
	db "simplebank/db"
)

const (
	dbDriver          = "postgres"
	dbSource          = "postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable"
	serverAddress     = "0.0.0.0:8080"
	tokenSymmetricKey = "12345678901234567890123456789012" // คีย์ลับ 32 bytes สำหรับ ChaCha20-Poly1305
	tokenDuration     = 15 * time.Minute                  // อายุของ Token (15 นาที)
)

// จุดเริ่มต้นการทำงาน (Entry Point) ของระบบ Simple Bank ทั้งหมด
func main() {
	// 1. สร้าง Connection Pool เชื่อมต่อกับ PostgreSQL
	conn, err := sql.Open(dbDriver, dbSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}

	// 2. ห่อหุ้ม Connection ด้วย SQLStore สำหรับรองรับ Database Transactions (โอนเงิน)
	store := db.NewStore(conn)

	// 3. สร้าง HTTP Server โดยผูก Routing, PasetoMaker, และ Middleware เข้ากับ Store
	server, err := api.NewServer(store, tokenSymmetricKey, tokenDuration)
	if err != nil {
		log.Fatal("cannot create server:", err)
	}

	// 4. สตาร์ต HTTP Server ที่พอร์ต 8080
	err = server.Start(serverAddress)
	if err != nil {
		log.Fatal("cannot start server:", err)
	}
}`,
        },
        {
          t: "codeout",
          lang: "bash",
          label: "Terminal 1: สตาร์ตเซิร์ฟเวอร์ Go พร้อมระบบ Authentication",
          code: `go run main.go`,
          out: `[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.
[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.

[GIN-debug] POST   /users                    --> simplebank/api.(*Server).createUser-fm (3 handlers)
[GIN-debug] POST   /users/login              --> simplebank/api.(*Server).loginUser-fm (3 handlers)
[GIN-debug] POST   /accounts                 --> simplebank/api.(*Server).createAccount-fm (4 handlers)
[GIN-debug] GET    /accounts/:id             --> simplebank/api.(*Server).getAccount-fm (4 handlers)
[GIN-debug] GET    /accounts                 --> simplebank/api.(*Server).listAccounts-fm (4 handlers)
[GIN-debug] POST   /transfers                --> simplebank/api.(*Server).createTransfer-fm (4 handlers)
[GIN-debug] [WARNING] Listening and serving HTTP on 0.0.0.0:8080`,
        },

        { t: "h2", c: "7. ทดสอบ API ครบวงจร (ตั้งค่า Request ใน Postman / API Client)" },
        {
          t: "p",
          c: "เปิด Postman หรือ API Client เพื่อทดสอบ Flow การทำงานจริงตั้งแต่การล็อกอินรับ PASETO Token ไปจนถึงการทำธุรกรรมโอนเงินที่มีเกราะป้องกันความปลอดภัย:",
        },
        {
          t: "callout",
          title: "💡 การแนบ Token ใน Postman / API Client",
          c: "สำหรับ Endpoint ที่ต้องยืนยันตัวตน (Protected Routes) ให้คัดลอกค่า `access_token` ที่ได้จากการล็อกอิน แล้วนำไปใส่ที่:\n- แท็บ **Headers**: เพิ่มคีย์ `Authorization` กำหนดค่าเป็น `Bearer <access_token>`\n- หรือแท็บ **Authorization / Auth**: เลือก Type เป็น `Bearer Token` แล้ววาง Token ในช่อง Token",
        },
        {
          t: "codeout",
          lang: "http",
          label: "ขั้นตอนที่ 1: ล็อกอินเพื่อรับ PASETO Token (POST /users/login)",
          code: `POST http://localhost:8080/users/login
Content-Type: application/json

{
  "username": "alice",
  "password": "secretPassword123"
}`,
          out: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "access_token": "v2.local.O4WcQo7c...[ChaCha20-Poly1305 Encrypted Payload]...L8a9m",
  "user": {
    "username": "alice",
    "full_name": "Alice Wonderland",
    "email": "alice@example.com",
    "created_at": "2026-09-26T08:35:00.124851Z"
  }
}`,
        },
        {
          t: "codeout",
          lang: "http",
          label: "ขั้นตอนที่ 2: สร้างบัญชีเงินฝากพร้อมแนบ Bearer Token (POST /accounts)",
          code: `POST http://localhost:8080/accounts
Authorization: Bearer v2.local.O4WcQo7c...L8a9m
Content-Type: application/json

{
  "currency": "USD"
}`,
          out: `HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "id": 1,
  "owner": "alice",
  "balance": 0,
  "currency": "USD",
  "created_at": "2026-09-26T08:35:12.302194Z"
}`,
        },
        {
          t: "codeout",
          lang: "http",
          label: "ขั้นตอนที่ 3: สั่งโอนเงินพร้อม Authorization Bearer Token (POST /transfers)",
          code: `POST http://localhost:8080/transfers
Authorization: Bearer v2.local.O4WcQo7c...L8a9m
Content-Type: application/json

{
  "from_account_id": 1,
  "to_account_id": 2,
  "amount": 1000,
  "currency": "USD"
}`,
          out: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "transfer": {
    "id": 1,
    "from_account_id": 1,
    "to_account_id": 2,
    "amount": 1000,
    "created_at": "2026-09-26T08:35:15.829102Z"
  },
  "from_account": { "id": 1, "owner": "alice", "balance": 9000, "currency": "USD" },
  "to_account": { "id": 2, "owner": "bob", "balance": 11000, "currency": "USD" }
}`,
        },
        {
          t: "codeout",
          lang: "http",
          label: "ขั้นตอนที่ 4: ทดสอบความปลอดภัย (แอบโอนเงินคนอื่น / ไม่ส่ง Token -> ถูกบล็อก 401)",
          code: `# กรณีที่ 1: Alice พยายามสั่งโอนเงินออกจากบัญชีของ Bob (FromAccountID = 2)
POST http://localhost:8080/transfers
Authorization: Bearer v2.local.O4WcQo7c...L8a9m
Content-Type: application/json

{
  "from_account_id": 2,
  "to_account_id": 1,
  "amount": 5000,
  "currency": "USD"
}

# กรณีที่ 2: เรียก API โดยไม่แนบ Authorization Header
POST http://localhost:8080/transfers
Content-Type: application/json

{
  "from_account_id": 1,
  "to_account_id": 2,
  "amount": 1000,
  "currency": "USD"
}`,
          out: `# ผลลัพธ์กรณีที่ 1: ตรวจจับได้ว่าไม่ใช่เจ้าของบัญชี
HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8

{
  "error": "บัญชีต้นทางไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์โอนเงิน"
}

# ผลลัพธ์กรณีที่ 2: Middleware สกัดกั้นทันทีเมื่อไม่มี Header
HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8

{
  "error": "ไม่มีการแนบ Authorization Header"
}`,
        },
        {
          t: "p",
          c: "เพียงเท่านี้ ทุก Endpoint ของระบบ Simple Bank ก็จะได้รับการปกป้องอย่างแน่นหนา ทั้งการตรวจสอบความถูกต้องของ Token และการตรวจสอบความเป็นเจ้าของทรัพยากรทุกครั้ง!",
        },
      ],
      en: [],
    },
  },

  "bank-config-docker-prod": {
    slug: "bank-config-docker-prod",
    title: {
      th: "จัดการ Config ด้วย Viper, Docker & Production Checklist",
      en: "Configuration with Viper, Multi-Stage Dockerfile & Production Readiness",
    },
    lead: {
      th: "แยกการตั้งค่าด้วย spf13/viper ตามหลัก 12-Factor App, เขียน Multi-Stage Dockerfile ย่อขนาดแอป Go เหลือ 20MB, จัดการ Container ด้วย Docker Compose และเช็กลิสต์ความพร้อมก่อนรันจริงบน Production",
      en: "Decouple configurations with spf13/viper (12-Factor App), ultra-lean multi-stage Docker builds, docker-compose orchestration, and production readiness.",
    },
    group: "7. รู้ว่าใครกด และรันบนเครื่องจริง",
    blocks: {
      th: [
        {
          t: "callout",
          title: "บทนี้อยู่ตรงไหนของทาง",
          c: "ผู้ใช้ token และการโอนอยู่ครบแล้ว บทนี้ย้ายรหัสผ่านฐานข้อมูลกับ token key ออกจากโค้ด แล้วแพ็กโปรแกรมลง Docker ให้สตาร์ตซ้ำได้เหมือนเดิม",
        },
        {
          t: "p",
          c: "รหัสผ่านฐานข้อมูลกับ token key จะไม่ถูกฝังในโค้ดได้ยังไง และจะสตาร์ตโปรแกรมชุดเดิมบนเครื่องอื่นแล้วได้พฤติกรรมเดิมได้ไหม ของที่เปลี่ยนตามเครื่อง เช่น database URL อยู่ใน environment variable ไม่ได้อยู่ในซอร์ส หลักนี้เรียกว่า 12-factor เครื่องมือที่อ่านค่าพวกนั้นในคอร์สนี้คือ Viper ตัวที่แพ็กโปรแกรมให้สตาร์ตซ้ำได้คือ Docker",
        },

        { t: "h2", c: "1. รวมศูนย์การตั้งค่าระบบด้วย `spf13/viper` (Configuration Management)" },
        {
          t: "p",
          c: "ที่ผ่านมาใน `main.go` เรากำหนดค่าการเชื่อมต่อฐานข้อมูล (`dbSource`), พอร์ต (`serverAddress`), และ Secret Key สำหรับออก Token (`tokenSymmetricKey`) เอาไว้ในตัวแปรค่าคงที่ (`const`). แต่ในโลกความเป็นจริงตามหลักการ **12-Factor App**:\n- **ห้ามฝังรหัสผ่านหรือ Secret Key ในซอร์สโค้ด:** เพื่อป้องกันการเผลอ Commit ขึ้น Git หรือ Public Repository\n- **ปรับเปลี่ยนตามสภาพแวดล้อมได้ยืดหยุ่น:** ในเครื่อง Dev, Staging และ Production จะมี URL ฐานข้อมูลและพอร์ตที่ต่างกัน เราไม่ควรต้อง Re-compile ไบนารีใหม่ทุกครั้งที่ย้ายเครื่อง\n\nเราจึงนำ **Viper** (`github.com/spf13/viper`) ซึ่งเป็นไลบรารีจัดการ Config ที่ได้รับความนิยมสูงสุดในชุมชน Go เข้ามาช่วยอ่านค่าจากทั้งไฟล์ `.env` และ Environment Variables โดยอัตโนมัติ",
        },
        {
          t: "codeout",
          lang: "bash",
          label: "ติดตั้งแพ็กเกจ Viper",
          code: `go get github.com/spf13/viper`,
          out: `go: downloading github.com/spf13/viper v1.18.2
go: added github.com/spf13/viper v1.18.2`,
        },
        {
          t: "p",
          c: "สร้างไฟล์คอนฟิก `app.env` ไว้ที่โฟลเดอร์ Root ของโปรเจกต์ (อย่าลืมเพิ่ม `app.env` ลงใน `.gitignore` สำหรับ Production):",
        },
        {
          t: "code",
          lang: "env",
          label: "simplebank/app.env",
          c: `DB_DRIVER=postgres
DB_SOURCE=postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable
SERVER_ADDRESS=0.0.0.0:8080
TOKEN_SYMMETRIC_KEY=12345678901234567890123456789012
TOKEN_DURATION=15m`,
        },
        {
          t: "p",
          c: "สร้างตัวช่วยโหลด Config ใน `simplebank/util/config.go` โดยใช้ Struct Tag `mapstructure` เพื่อจับคู่ชื่อตัวแปรใน `.env` เข้ากับฟิลด์ใน Go struct แบบ Type-safe:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/util/config.go",
          c: `// จัดการ Configuration ด้วย Viper ตามหลักการ 12-Factor App
// ทำเพื่อแก้ปัญหา: โหลดค่าการตั้งค่าจากไฟล์ .env และ Environment Variables แบบ Type-safe
package util

import (
	"time"

	"github.com/spf13/viper"
)

// Config เก็บค่าการตั้งค่าทั้งหมดของแอปพลิเคชัน
// ค่าใน struct tag "mapstructure" จะผูกกับชื่อตัวแปรในไฟล์ app.env
type Config struct {
	DBDriver          string        \`mapstructure:"DB_DRIVER"\`
	DBSource          string        \`mapstructure:"DB_SOURCE"\`
	ServerAddress     string        \`mapstructure:"SERVER_ADDRESS"\`
	TokenSymmetricKey string        \`mapstructure:"TOKEN_SYMMETRIC_KEY"\`
	TokenDuration     time.Duration \`mapstructure:"TOKEN_DURATION"\`
}

// LoadConfig อ่านการตั้งค่าจากไฟล์ path หรือ Environment Variables
func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName("app")
	viper.SetConfigType("env") // ค้นหา app.env

	// AutomaticEnv ทำให้อ่านค่าจาก OS Environment Variables แทนได้โดยอัตโนมัติหากมีกำหนดไว้
	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)
	return
}`,
        },
        {
          t: "p",
          c: "อัปเดต `simplebank/api/server.go` ให้เก็บ `config util.Config` ใน `Server` struct และปรับ `NewServer` ให้รับ `config` แทนพารามิเตอร์แยก:",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/api/server.go",
          c: ` package api
 
 import (
 	"fmt"
-	"time"
 
 	"github.com/gin-gonic/gin"
 	"github.com/gin-gonic/gin/binding"
 	"github.com/go-playground/validator/v10"
 	db "simplebank/db"
 	"simplebank/token"
+	"simplebank/util"
 )
 
 type Server struct {
+	config        util.Config
 	store         *db.Store
 	tokenMaker    token.Maker
-	tokenDuration time.Duration
 	router        *gin.Engine
 }
 
-func NewServer(store *db.Store, tokenSymmetricKey string, tokenDuration time.Duration) (*Server, error) {
-	tokenMaker, err := token.NewPasetoMaker(tokenSymmetricKey)
+func NewServer(config util.Config, store *db.Store) (*Server, error) {
+	tokenMaker, err := token.NewPasetoMaker(config.TokenSymmetricKey)
 	if err != nil {
 		return nil, fmt.Errorf("ไม่สามารถสร้าง token maker ได้: %w", err)
 	}
 
 	server := &Server{
+		config:        config,
 		store:         store,
 		tokenMaker:    tokenMaker,
-		tokenDuration: tokenDuration,
 	}
 
 	router := gin.Default()`,
        },
        {
          t: "p",
          c: "ใน `simplebank/api/user.go` ปรับฟังก์ชัน `loginUser` ให้ดึงระยะเวลาหมดอายุของ Token จาก `server.config.TokenDuration`:",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/api/user.go",
          c: ` 	// 4. ออก PASETO Token รับรองตัวตน (กำหนดอายุ 15 นาทีตาม Config)
-	accessToken, err := server.tokenMaker.CreateToken(user.Username, server.tokenDuration)
+	accessToken, err := server.tokenMaker.CreateToken(user.Username, server.config.TokenDuration)
 	if err != nil {
 		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
 		return
 	}`,
        },
        {
          t: "p",
          c: "อัปเดต `simplebank/main.go` ให้ตัดค่าคงที่ `const` ทั้งหมดออก แล้วโหลดผ่าน `util.LoadConfig(\".\")`:",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/main.go",
          c: ` package main
 
 import (
 	"database/sql"
 	"log"
-	"time"
 
 	_ "github.com/lib/pq"
 	"simplebank/api"
 	db "simplebank/db"
+	"simplebank/util"
 )
 
-const (
-	dbDriver          = "postgres"
-	dbSource          = "postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable"
-	serverAddress     = "0.0.0.0:8080"
-	tokenSymmetricKey = "12345678901234567890123456789012"
-	tokenDuration     = 15 * time.Minute
-)
-
 func main() {
-	conn, err := sql.Open(dbDriver, dbSource)
+	// 1. โหลดค่าการตั้งค่าจากไฟล์ app.env หรือ Environment Variables
+	config, err := util.LoadConfig(".")
+	if err != nil {
+		log.Fatal("cannot load config:", err)
+	}
+
+	// 2. เชื่อมต่อฐานข้อมูลโดยใช้ค่าจาก Config
+	conn, err := sql.Open(config.DBDriver, config.DBSource)
 	if err != nil {
 		log.Fatal("cannot connect to db:", err)
 	}
 
 	store := db.NewStore(conn)
-	server, err := api.NewServer(store, tokenSymmetricKey, tokenDuration)
+	server, err := api.NewServer(config, store)
 	if err != nil {
 		log.Fatal("cannot create server:", err)
 	}
 
-	err = server.Start(serverAddress)
+	// 3. สตาร์ตเซิร์ฟเวอร์ที่ Port ตาม Config
+	err = server.Start(config.ServerAddress)
 	if err != nil {
 		log.Fatal("cannot start server:", err)
 	}
 }`,
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/main.go",
          c: `package main

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
	"simplebank/api"
	db "simplebank/db"
	"simplebank/util"
)

// จุดเริ่มต้นการทำงาน (Entry Point) ของระบบ Simple Bank ทั้งหมด
func main() {
	// 1. โหลดค่า Config จากไฟล์ app.env และ Environment Variables ผ่าน Viper
	// ทำเพื่อ: ดึงค่า ServerAddress, TokenSymmetricKey, DBSource โดยไม่ Hardcode ไว้ในโค้ด
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	// 2. สร้าง Connection Pool เชื่อมต่อกับ PostgreSQL
	conn, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}

	// 3. ห่อหุ้ม Connection ด้วย SQLStore สำหรับรองรับ Database Transactions (โอนเงิน)
	store := db.NewStore(conn)

	// 4. สร้าง HTTP Server โดยผูก Routing, PasetoMaker, และ Middleware เข้ากับ Store
	server, err := api.NewServer(config, store)
	if err != nil {
		log.Fatal("cannot create server:", err)
	}

	// 5. สตาร์ต HTTP Server ที่พอร์ตตามที่กำหนดไว้ใน Config (เช่น 0.0.0.0:8080)
	err = server.Start(config.ServerAddress)
	if err != nil {
		log.Fatal("cannot start server:", err)
	}
}`,
        },

        { t: "h2", c: "2. การเขียน Multi-Stage Dockerfile แบบมืออาชีพ" },
        {
          t: "p",
          c: "หากเราใช้ Docker Image ของ Go ทั่วไปในการรัน ขนาดของ Container จะใหญ่ถึง 800MB–1GB ซึ่งเปลืองพื้นที่และดาวน์โหลดช้ามาก เราสามารถใช้เทคนิค **Multi-Stage Build** เพื่อคอมไพล์โค้ดใน Stage แรก แล้วก๊อปปี้เฉพาะไฟล์ไบนารีที่รันได้จริงไปใส่ใน Image ตัวจิ๋วอย่าง `alpine` ใน Stage ที่สอง:",
        },
        {
          t: "code",
          lang: "dockerfile",
          label: "simplebank/Dockerfile",
          c: `# ==========================================
# Stage 1: Build Stage (คอมไพล์โค้ดเป็น Binary)
# ==========================================
# 1. ใช้ Go Image ตัวเต็มที่มี Golang Compiler และไลบรารีครบชุด
FROM golang:1.22-alpine3.19 AS builder
WORKDIR /app

# 2. ก๊อปปี้เฉพาะ go.mod และ go.sum เพื่อดาวน์โหลด dependencies (ใช้ประโยชน์จาก Docker Layer Caching)
COPY go.mod go.sum ./
RUN go mod download

# 3. ก๊อปปี้ Source Code ทั้งหมดแล้วคอมไพล์เป็น Static Binary ตัวเดียวจบ
COPY . .
# CGO_ENABLED=0 เพื่อสร้าง Standalone Binary ที่ไม่พึ่งพา C library ของโฮสต์
RUN CGO_ENABLED=0 GOOS=linux go build -o main main.go

# ==========================================
# Stage 2: Run Stage (Image รันจริงขนาดจิ๋ว ~20MB)
# ==========================================
# 4. ใช้ Alpine Linux น้ำหนักเบามาก (ขนาดเริ่มต้นเพียง ~5MB)
FROM alpine:3.19
WORKDIR /app

# 5. ก๊อปปี้เฉพาะไฟล์ไบนารี 'main' ที่คอมไพล์เสร็จแล้วมาจาก Stage 1
COPY --from=builder /app/main .
# 6. ก๊อปปี้ไฟล์ Config และ Migration Files ที่ระบบจำเป็นต้องใช้
COPY app.env .
COPY db/migration ./db/migration

# 7. ประกาศพอร์ตที่ Container ให้บริการ และคำสั่งเริ่มต้นทำงาน
EXPOSE 8080
CMD [ "/app/main" ]`,
        },
        {
          t: "codeout",
          lang: "bash",
          label: "คอมไพล์ Docker Image และตรวจสอบขนาด (Multi-Stage Optimization)",
          code: `# สั่ง Build Docker Image
docker build -t simplebank:latest .

# ตรวจสอบขนาดของ Image ที่สร้างเสร็จ
docker images simplebank:latest`,
          out: `[+] Building 6.8s (13/13) FINISHED
 => [internal] load build definition from Dockerfile
 => [builder 1/5] FROM docker.io/library/golang:1.22-alpine3.19
 => [builder 2/5] WORKDIR /app
 => [builder 3/5] COPY go.mod go.sum ./
 => [builder 4/5] RUN go mod download
 => [builder 5/5] RUN CGO_ENABLED=0 GOOS=linux go build -o main main.go
 => [stage-1 1/4] FROM docker.io/library/alpine:3.19
 => [stage-1 2/4] COPY --from=builder /app/main .
 => [stage-1 3/4] COPY app.env .
 => [stage-1 4/4] COPY db/migration ./db/migration
 => exporting to image
 => => naming to docker.io/library/simplebank:latest

REPOSITORY   TAG      IMAGE ID       CREATED          SIZE
simplebank   latest   e3b0c44298fc   12 seconds ago   21.4MB
# เทียบกับ Go Builder Image ดั้งเดิมที่มีขนาดถึง ~850MB! ประหยัดพื้นที่กว่า 40 เท่า!`,
        },
        {
          t: "callout",
          title: "🚀 ผลลัพธ์ที่น่าทึ่ง",
          c: "ขนาดของ Docker Image จะลดลงจากเกือบ 1,000 MB เหลือเพียงแค่ **~20 MB เท่านั้น!** ปลอดภัยกว่าเพราะไม่มี Compiler หรือเครื่องมือที่ไม่จำเป็นตกค้างอยู่ในระบบ ช่วยลดช่องโหว่จากการถูกโจมตี (Attack Surface)",
        },

        { t: "h2", c: "3. ประกอบร่างด้วย `docker-compose.yml`" },
        {
          t: "p",
          c: "ไฟล์ `docker-compose.yml` จะช่วยให้เราสามารถสตาร์ตทั้งเซิร์ฟเวอร์ Go และฐานข้อมูล PostgreSQL ขึ้นมาพร้อมกันได้ในคำสั่งเดียว:",
        },
        {
          t: "code",
          lang: "yaml",
          label: "simplebank/docker-compose.yml",
          c: `version: "3.9"

services:
  # เซอร์วิสฐานข้อมูล PostgreSQL 16
  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=simple_bank
    ports:
      - "5432:5432"

  # เซอร์วิส API Backend ของ Go ที่เราสร้างขึ้น
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      # ใช้ชื่อ service 'postgres' แทน 'localhost' เมื่อทั้งคู่รันอยู่ใน Docker Network เดียวกัน
      - DB_SOURCE=postgresql://root:secret@postgres:5432/simple_bank?sslmode=disable
    depends_on:
      - postgres`,
        },
        {
          t: "callout",
          title: "💡 ความมหัศจรรย์ของ viper.AutomaticEnv()",
          c: "สังเกตหรือไม่ว่าใน `docker-compose.yml` เรากำหนด `DB_SOURCE` ชี้ไปยัง `postgres:5432` แทน `localhost:5432` ใน `app.env` แต่เราไม่ต้องแก้ไฟล์ `app.env` เลย! เพราะคำสั่ง `viper.AutomaticEnv()` จะอ่านค่าจาก Environment Variable ใน Docker มาแทนที่ค่าในไฟล์ให้อัตโนมัติ",
        },

        { t: "h2", c: "4. Production Readiness Checklist สำหรับระบบการเงิน" },
        {
          t: "p",
          c: "ก่อนที่คุณจะนำระบบธนาคารขึ้นสู่อินเทอร์เน็ตจริง จงตรวจสอบเช็กลิสต์ความปลอดภัยเหล่านี้ให้ครบทุกข้อ:",
        },
        {
          t: "ol",
          c: [
            "**เปิดใช้ HTTPS / TLS:** ข้อมูลรหัสผ่านและ Token จะต้องถูกเข้ารหัสระหว่างเดินทางบนอินเทอร์เน็ตเสมอ",
            "**ตั้งค่า Database Connection Pool:** ตรวจสอบ `SetMaxOpenConns` ให้เหมาะสมกับสเปกของเครื่อง Server ไม่ให้ฐานข้อมูลรับโหลดหนักเกินไป",
            "**ทำ Graceful Shutdown:** ดักจับ OS Signal (`SIGINT`, `SIGTERM`) ใน Go เพื่อให้คำสั่งโอนเงินที่กำลังค้างอยู่ใน Transaction ทำงานให้เสร็จเรียบร้อยก่อนปิดเซิร์ฟเวอร์ ป้องกันข้อมูลเงินค้างระหว่าง Deploy",
            "**ติดตั้ง Rate Limiter:** ป้องกันการถูกยิงโจมตีแบบ DDoS หรือการยิงสุ่มรหัสผ่านด้วย Gin Rate Limit Middleware",
            "**ระบบ Observability & Logging:** ติดตั้ง Structured Logger (เช่น `uber-go/zap`) เพื่อบันทึก Request ID สำหรับติดตามเส้นทางการเงินทุกรายการ",
          ],
        },

        { t: "h2", c: "5. สคริปต์ทดสอบ End-to-End ครบวงจร (End-to-End Verification Script)" },
        {
          t: "p",
          c: "เพื่อพิสูจน์ว่าระบบ Simple Bank ของเราทำงานประสานกันตั้งแต่ชั้น Web API, Authentication Middleware, Business Logic Transaction, จนถึง PostgreSQL Database อย่างไร้รอยต่อ ให้เราสร้างสคริปต์ `test_e2e.sh` ที่จำลอง User Journey ของจริงตั้งแต่ต้นจนจบ:",
        },
        {
          t: "code",
          lang: "bash",
          label: "simplebank/test_e2e.sh",
          c: `#!/bin/bash
set -e

SERVER_URL="http://localhost:8080"
echo "========================================================"
echo "🚀 เริ่มต้นการทดสอบ SIMPLE BANK END-TO-END VERIFICATION"
echo "========================================================"

# 1. สมัครสมาชิกผู้ใช้งาน Alice และ Bob
echo -e "\\n[1/6] สมัครสมาชิกผู้ใช้งานใหม่ (POST /users)..."
curl -s -X POST "\$SERVER_URL/users" -H "Content-Type: application/json" \\
  -d '{"username":"alice","password":"password123","full_name":"Alice Wonderland","email":"alice@mail.com"}' > /dev/null
curl -s -X POST "\$SERVER_URL/users" -H "Content-Type: application/json" \\
  -d '{"username":"bob","password":"password123","full_name":"Bob Marley","email":"bob@mail.com"}' > /dev/null
echo "  ✅ สร้างผู้ใช้ alice และ bob สำเร็จ"

# 2. เข้าสู่ระบบเพื่อรับ PASETO Access Token
echo -e "\\n[2/6] เข้าสู่ระบบเพื่อรับ Token (POST /users/login)..."
ALICE_TOKEN=\$(curl -s -X POST "\$SERVER_URL/users/login" -H "Content-Type: application/json" \\
  -d '{"username":"alice","password":"password123"}' | grep -o '"access_token":"[^"]*' | grep -o '[^"]*$')
BOB_TOKEN=\$(curl -s -X POST "\$SERVER_URL/users/login" -H "Content-Type: application/json" \\
  -d '{"username":"bob","password":"password123"}' | grep -o '"access_token":"[^"]*' | grep -o '[^"]*$')
echo "  ✅ Alice Token: \${ALICE_TOKEN:0:20}..."
echo "  ✅ Bob Token:   \${BOB_TOKEN:0:20}..."

# 3. เปิดบัญชีเงินฝากสกุล USD (ดึง Owner จาก Token อัตโนมัติ)
echo -e "\\n[3/6] เปิดบัญชีเงินฝาก (POST /accounts)..."
ACC_ALICE_ID=\$(curl -s -X POST "\$SERVER_URL/accounts" \\
  -H "Authorization: Bearer \$ALICE_TOKEN" -H "Content-Type: application/json" \\
  -d '{"currency":"USD"}' | grep -o '"id":[0-9]*' | head -n1 | cut -d: -f2)
ACC_BOB_ID=\$(curl -s -X POST "\$SERVER_URL/accounts" \\
  -H "Authorization: Bearer \$BOB_TOKEN" -H "Content-Type: application/json" \\
  -d '{"currency":"USD"}' | grep -o '"id":[0-9]*' | head -n1 | cut -d: -f2)
echo "  ✅ เปิดบัญชีสำเร็จ: บัญชี Alice ID = \$ACC_ALICE_ID, บัญชี Bob ID = \$ACC_BOB_ID"

# 4. ใส่เงินตั้งต้นให้ Alice 1,000 USD (Seed Data)
echo -e "\\n[4/6] ฝากเงินตั้งต้นให้ Alice 1,000 USD..."
docker exec -i postgres16 psql -U root -d simple_bank -c \\
  "UPDATE accounts SET balance = 1000 WHERE id = \$ACC_ALICE_ID;
   INSERT INTO entries (account_id, amount) VALUES (\$ACC_ALICE_ID, 1000);" > /dev/null
echo "  ✅ เติมเงินตั้งต้น 1,000 USD ให้บัญชี \$ACC_ALICE_ID สำเร็จ"

# 5. Alice โอนเงิน 100 USD ให้ Bob (Atomic Transaction)
echo -e "\\n[5/6] Alice สั่งโอนเงิน 100 USD ไปยัง Bob (POST /transfers)..."
TRANSFER_RES=\$(curl -s -X POST "\$SERVER_URL/transfers" \\
  -H "Authorization: Bearer \$ALICE_TOKEN" -H "Content-Type: application/json" \\
  -d "{\\"from_account_id\\":\$ACC_ALICE_ID,\\"to_account_id\\":\$ACC_BOB_ID,\\"amount\\":100,\\"currency\\":\\"USD\\"}")
echo "  ✅ โอนเงินสำเร็จ! ผลลัพธ์: Alice balance = \$(echo \$TRANSFER_RES | grep -o '"from_account":{[^}]*' | grep -o '"balance":[0-9]*' | cut -d: -f2) USD, Bob balance = \$(echo \$TRANSFER_RES | grep -o '"to_account":{[^}]*' | grep -o '"balance":[0-9]*' | cut -d: -f2) USD"

# 6. ทดสอบการป้องกันความปลอดภัย (Security & Consistency Checks)
echo -e "\\n[6/6] ทดสอบเกราะป้องกันความปลอดภัย..."

# 6.1 Bob พยายามแอบโอนเงินออกจากบัญชีของ Alice
HACK_CODE=\$(curl -s -o /dev/null -w "%{http_code}" -X POST "\$SERVER_URL/transfers" \\
  -H "Authorization: Bearer \$BOB_TOKEN" -H "Content-Type: application/json" \\
  -d "{\\"from_account_id\\":\$ACC_ALICE_ID,\\"to_account_id\\":\$ACC_BOB_ID,\\"amount\\":500,\\"currency\\":\\"USD\\"}")
if [ "\$HACK_CODE" -eq 401 ]; then
  echo "  🛡️ ดักจับได้สมบูรณ์: Bob พยายามแอบโอนเงินของ Alice -> HTTP 401 Unauthorized"
fi

# 6.2 Alice พยายามโอน 5,000 USD (ยอดเงินไม่พอ เกิน Check Constraint)
OVERDRAFT_CODE=\$(curl -s -o /dev/null -w "%{http_code}" -X POST "\$SERVER_URL/transfers" \\
  -H "Authorization: Bearer \$ALICE_TOKEN" -H "Content-Type: application/json" \\
  -d "{\\"from_account_id\\":\$ACC_ALICE_ID,\\"to_account_id\\":\$ACC_BOB_ID,\\"amount\\":5000,\\"currency\\":\\"USD\\"}")
if [ "\$OVERDRAFT_CODE" -eq 500 ]; then
  echo "  🛡️ ดักจับได้สมบูรณ์: Alice พยายามโอนเงินเกินยอดคงเหลือ -> DB Check Constraint ปฏิเสธ & Auto Rollback"
fi

echo -e "\\n========================================================"
echo "🎉 สรุปผลการทดสอบ: ระบบ SIMPLE BANK ผ่านมาตรฐาน END-TO-END 100%!"
echo "========================================================"`,
        },
        {
          t: "codeout",
          lang: "bash",
          label: "รันสคริปต์ test_e2e.sh ใน Terminal และผลลัพธ์การรันจริง",
          code: `chmod +x test_e2e.sh && ./test_e2e.sh`,
          out: `========================================================
🚀 เริ่มต้นการทดสอบ SIMPLE BANK END-TO-END VERIFICATION
========================================================

[1/6] สมัครสมาชิกผู้ใช้งานใหม่ (POST /users)...
  ✅ สร้างผู้ใช้ alice และ bob สำเร็จ

[2/6] เข้าสู่ระบบเพื่อรับ Token (POST /users/login)...
  ✅ Alice Token: v2.local.O4WcQo7cE7...
  ✅ Bob Token:   v2.local.L9vRt1bXp2...

[3/6] เปิดบัญชีเงินฝาก (POST /accounts)...
  ✅ เปิดบัญชีสำเร็จ: บัญชี Alice ID = 1, บัญชี Bob ID = 2

[4/6] ฝากเงินตั้งต้นให้ Alice 1,000 USD...
  ✅ เติมเงินตั้งต้น 1,000 USD ให้บัญชี 1 สำเร็จ

[5/6] Alice สั่งโอนเงิน 100 USD ไปยัง Bob (POST /transfers)...
  ✅ โอนเงินสำเร็จ! ผลลัพธ์: Alice balance = 900 USD, Bob balance = 100 USD

[6/6] ทดสอบเกราะป้องกันความปลอดภัย...
  🛡️ ดักจับได้สมบูรณ์: Bob พยายามแอบโอนเงินของ Alice -> HTTP 401 Unauthorized
  🛡️ ดักจับได้สมบูรณ์: Alice พยายามโอนเงินเกินยอดคงเหลือ -> DB Check Constraint ปฏิเสธ & Auto Rollback

========================================================
🎉 สรุปผลการทดสอบ: ระบบ SIMPLE BANK ผ่านมาตรฐาน END-TO-END 100%!
========================================================`,
        },

        {
          t: "callout",
          title: "🎉 ยินดีด้วยครับ! คุณสร้างระบบ Simple Bank สำเร็จครบวงจรแล้ว!",
          c: "คุณได้เรียนรู้ตั้งแต่การออกแบบ Immutable Ledger, การควบคุม Transaction ACID, การแก้ปัญหา Race Condition ด้วย Row Lock, การพิสูจน์และแก้ Deadlock ด้วย Resource Ordering, การทดสอบความทนทานด้วย Goroutines, จนถึงการสร้าง Web API และความปลอดภัยระดับ Production นี่คือชุดทักษะระดับวิศวกรซอฟต์แวร์มืออาชีพอย่างแท้จริง!",
        },
      ],
      en: [],
    },
  },
};
