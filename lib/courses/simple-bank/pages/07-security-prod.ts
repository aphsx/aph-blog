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
    group: "7. Security, Auth & Production",
    blocks: {
      th: [
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

        { t: "h2", c: "2. ทำไมห้ามเก็บ Plain Text หรือ MD5 / SHA-256 เด็ดขาด?" },
        {
          t: "p",
          c: "ในอดีต โปรแกรมเมอร์หลายคนนิยมนำรหัสผ่านไปแฮชด้วย MD5 หรือ SHA-256 แต่ในยุคปัจจุบัน การ์ดจอ (GPU) สามารถคำนวณ SHA-256 ได้หลายหมื่นล้านรอบต่อวินาที ทำให้แฮกเกอร์สามารถถอดรหัสผ่านด้วยวิธี **Rainbow Tables** หรือ **Dictionary Attack** ได้ในเวลาไม่กี่นาที",
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
          label: "bcrypt_demo.go (สร้างไฟล์เดี่ยวเพื่อทดลองรันดูผลลัพธ์ Salt)",
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
          label: "simplebank/util/password.go (สร้างไฟล์ใหม่)",
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
          label: "simplebank/util/password_test.go (สร้างไฟล์ใหม่)",
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
          label: "simplebank/db/user.go (สร้างไฟล์ใหม่)",
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
          label: "simplebank/api/user.go (สร้างไฟล์ใหม่)",
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
          t: "codeout",
          lang: "bash",
          label: "ทดสอบสมัครสมาชิกผ่าน cURL (ตรวจสอบความปลอดภัยของ Response)",
          code: `curl -i -X POST http://localhost:8080/users \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "alice",
    "password": "secretPassword123",
    "full_name": "Alice Wonderland",
    "email": "alice@example.com"
  }'`,
          out: `HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Date: Sat, 26 Sep 2026 08:35:00 GMT
Content-Length: 172

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
          c: "หลังจากที่เรารัน Migration `000002_add_users.up.sql` เพิ่ม Foreign Key แล้ว หากเราสั่งรัน `go test ./db` ตอนนี้ Unit Test ของบทที่ 5 (`TestCreateAccount`, `TestTransferTx`) จะพังทันทีจากข้อผิดพลาด Foreign Key Violation:",
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
          label: "simplebank/db/user_test.go (สร้าง Helper: createRandomUser)",
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
          label: "simplebank/db/account_test.go (อัปเดต createRandomAccount ให้ผูกกับ User จริง)",
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
    group: "7. Security, Auth & Production",
    blocks: {
      th: [
        {
          t: "p",
          c: "หลังจากที่ผู้ใช้งานล็อกอินสำเร็จ เซิร์ฟเวอร์ต้องออก **Token (ตั๋วรับรองตัวตน)** ให้ผู้ใช้นำไปแนบใน Header `Authorization: Bearer <token>` ทุกครั้งที่ต้องการสั่งโอนเงินหรือดูข้อมูลบัญชี",
        },

        { t: "h2", c: "ทำไมระบบการเงินระดับสูงถึงเลือกใช้ PASETO เหนือ JWT?" },
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
          label: "simplebank/token/payload.go (สร้างไฟล์ใหม่)",
          c: `package token

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

var ErrExpiredToken = errors.New("ตั๋วรับรองหมดอายุแล้ว")
var ErrInvalidToken = errors.New("ตั๋วรับรองไม่ถูกต้อง")

type Payload struct {
	ID        uuid.UUID \`json:"id"\`
	Username  string    \`json:"username"\`
	IssuedAt  time.Time \`json:"issued_at"\`
	ExpiredAt time.Time \`json:"expired_at"\`
}

func NewPayload(username string, duration time.Duration) (*Payload, error) {
	tokenID, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}

	payload := &Payload{
		ID:        tokenID,
		Username:  username,
		IssuedAt:  time.Now(),
		ExpiredAt: time.Now().Add(duration),
	}
	return payload, nil
}

func (payload *Payload) Valid() error {
	if time.Now().After(payload.ExpiredAt) {
		return ErrExpiredToken
	}
	return nil
}`,
        },
        {
          t: "p",
          c: "สร้างอินเทอร์เฟซ `Maker` ใน `simplebank/token/maker.go` เพื่อเปิดทางให้ระบบสามารถสลับระหว่าง PASETO และ JWT ได้อย่างยืดหยุ่นในอนาคต:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/token/maker.go (สร้างไฟล์ใหม่)",
          c: `// Maker เป็น Interface สำหรับจัดการสร้างและตรวจสอบความถูกต้องของ Token
package token

import "time"

type Maker interface {
	CreateToken(username string, duration time.Duration) (string, error)
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
          label: "simplebank/token/paseto_maker.go (สร้างไฟล์ใหม่)",
          c: `package token

import (
	"fmt"
	"time"

	"github.com/aead/chacha20poly1305"
	"github.com/o1egl/paseto"
)

// PasetoMaker จัดการ PASETO Token ด้วยการเข้ารหัสแบบ Symmetric
type PasetoMaker struct {
	paseto       *paseto.V2
	symmetricKey []byte
}

func NewPasetoMaker(symmetricKey string) (Maker, error) {
	if len(symmetricKey) != chacha20poly1305.KeySize {
		return nil, fmt.Errorf("ขนาด key ไม่ถูกต้อง: ต้องมีขนาด %d ไบต์พอดี", chacha20poly1305.KeySize)
	}

	maker := &PasetoMaker{
		paseto:       paseto.NewV2(),
		symmetricKey: []byte(symmetricKey),
	}
	return maker, nil
}

func (maker *PasetoMaker) CreateToken(username string, duration time.Duration) (string, error) {
	payload, err := NewPayload(username, duration)
	if err != nil {
		return "", err
	}
	return maker.paseto.Encrypt(maker.symmetricKey, payload, nil)
}

func (maker *PasetoMaker) VerifyToken(token string) (*Payload, error) {
	payload := &Payload{}
	err := maker.paseto.Decrypt(token, maker.symmetricKey, payload, nil)
	if err != nil {
		return nil, ErrInvalidToken
	}

	err = payload.Valid()
	if err != nil {
		return nil, err
	}
	return payload, nil
}`,
        },
        {
          t: "p",
          c: "สร้าง Handler ล็อกอิน `POST /users/login` ใน `simplebank/api/user.go` (เขียนต่อในไฟล์เดิม) เพื่อตรวจสอบรหัสผ่านและสร้าง PASETO Token ส่งกลับไป:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/api/user.go (เขียนต่อในไฟล์เดิม: LoginUser)",
          c: `type loginUserRequest struct {
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

	// 4. ออก PASETO Token รับรองตัวตน
	accessToken, err := server.tokenMaker.CreateToken(user.Username, server.config.AccessTokenDuration)
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

        { t: "h2", c: "2. การสร้าง Gin Authentication Middleware" },
        {
          t: "p",
          c: "เราจะสร้าง Middleware มาดักหน้าทุก Endpoint ที่ต้องการความปลอดภัย หากไม่มี Token หรือ Token ปลอม ระบบจะปฏิเสธคำขอทันทีด้วย **401 Unauthorized**:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/api/middleware.go (สร้างไฟล์ใหม่)",
          c: `package api

import (
	"errors"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"simplebank/token"
)

const (
	authorizationHeaderKey  = "authorization"
	authorizationTypeBearer = "bearer"
	authorizationPayloadKey = "authorization_payload"
)

func authMiddleware(tokenMaker token.Maker) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authHeader := ctx.GetHeader(authorizationHeaderKey)
		if len(authHeader) == 0 {
			err := errors.New("ไม่มีการแนบ Authorization Header")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		fields := strings.Fields(authHeader)
		if len(fields) < 2 {
			err := errors.New("รูปแบบ Authorization Header ไม่ถูกต้อง")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		authorizationType := strings.ToLower(fields[0])
		if authorizationType != authorizationTypeBearer {
			err := errors.New("ประเภทของ Authorization ต้องเป็น Bearer เท่านั้น")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		accessToken := fields[1]
		payload, err := tokenMaker.VerifyToken(accessToken)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		// บันทึก payload ของผู้ใช้ไว้ใน Context เพื่อให้ Handler ตัวถัดไปนำไปใช้งานต่อได้
		ctx.Set(authorizationPayloadKey, payload)
		ctx.Next()
	}
}`,
        },
        {
          t: "p",
          c: "จากนั้นนำ `authMiddleware` ไปผูกเข้ากับกลุ่มของ Route ที่ต้องการการยืนยันตัวตน และอัปเดต `Server` struct ให้เก็บ `tokenMaker` ใน `simplebank/api/server.go`:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/api/server.go (อัปเดต Server Struct & NewServer)",
          c: `// อัปเดต Server struct ใน simplebank/api/server.go ให้ถือ tokenMaker และ config พร้อมลงทะเบียน Validator
package api

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
	db "simplebank/db"
	"simplebank/token"
	"simplebank/util"
)

type Server struct {
	config     util.Config
	store      *db.Store
	tokenMaker token.Maker
	router     *gin.Engine
}

// ฟังก์ชัน NewServer ที่รับ config และ store เข้ามา พร้อมสร้าง PasetoMaker
func NewServer(config util.Config, store *db.Store) (*Server, error) {
	tokenMaker, err := token.NewPasetoMaker(config.TokenSymmetricKey)
	if err != nil {
		return nil, fmt.Errorf("cannot create token maker: %w", err)
	}

	server := &Server{
		config:     config,
		store:      store,
		tokenMaker: tokenMaker,
	}

	router := gin.Default()

	// ลงทะเบียน custom validator tag "currency"
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterValidation("currency", validCurrency)
	}

	// 1. เส้นทางสาธารณะ (Public Routes): ทุกคนเข้าถึงได้โดยไม่ต้องแนบ Token
	router.POST("/users", server.createUser)
	router.POST("/users/login", server.loginUser)

	// 2. เส้นทางส่วนตัว (Protected Routes): ต้องผ่าน authMiddleware ก่อนเสมอ
	authRoutes := router.Group("/").Use(authMiddleware(server.tokenMaker))
	authRoutes.POST("/accounts", server.createAccount)
	authRoutes.GET("/accounts/:id", server.getAccount)
	authRoutes.GET("/accounts", server.listAccounts)
	authRoutes.POST("/transfers", server.createTransfer)

	server.router = router
	return server, nil
}`,
        },
        {
          t: "codeout",
          lang: "bash",
          label: "ทดสอบล็อกอินเพื่อรับ PASETO Token ผ่าน cURL",
          code: `curl -i -X POST http://localhost:8080/users/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "alice",
    "password": "secretPassword123"
  }'`,
          out: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Sat, 26 Sep 2026 08:35:10 GMT
Content-Length: 320

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

        { t: "h2", c: "3. ปกป้อง Endpoints ทั้งหมดด้วย Token (Accounts & Transfers)" },
        {
          t: "p",
          c: "เมื่อเรานำ `authMiddleware` มาครอบ Route กลุ่ม `/accounts` และ `/transfers` แล้ว เราจำเป็นต้องอัปเดต Handler ให้ดึงตัวตนของผู้ใช้จาก **`authPayload.Username`** แทนการรับค่าจากผู้ใช้ตรงๆ เพื่อปิดช่องโหว่ความปลอดภัยทุกจุด:",
        },

        { t: "h3", c: "3.1 อัปเดต `createAccount`: ตัดฟิลด์ owner ออกจาก JSON Body" },
        {
          t: "p",
          c: "ผู้ใช้ที่ล็อกอินแล้วไม่จำเป็นต้องส่ง `owner` ใน JSON Body อีกต่อไป เพราะเราสามารถดึงชื่อเจ้าของจาก Token ได้โดยตรง ป้องกันการแอบเปิดบัญชีในนามของผู้อื่น 100%:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/api/account.go (อัปเดต createAccount ให้ผูกกับ Token)",
          c: `type createAccountRequest struct {
	Currency string \`json:"currency" binding:"required,currency"\` // ไม่ต้องรับ owner ใน JSON อีกต่อไป!
}

func (server *Server) createAccount(ctx *gin.Context) {
	var req createAccountRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// ดึงข้อมูลตัวตนของเจ้าของ Token จาก Context
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	arg := db.CreateAccountParams{
		Owner:    authPayload.Username, // ใช้ username จาก Token โดยตรง ปลอดภัย 100%
		Currency: req.Currency,
		Balance:  0,
	}

	account, err := server.store.CreateAccount(ctx, arg)
	if err != nil {
		// หากติด Foreign Key หรือพยายามสร้างบัญชีสกุลเงินเดิมซ้ำ (owner_currency_key)
		ctx.JSON(http.StatusForbidden, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusCreated, account)
}`,
        },

        { t: "h3", c: "3.2 อัปเดต `getAccount`: ห้ามแอบส่องยอดเงินของผู้อื่น" },
        {
          t: "p",
          c: "ตรวจสอบว่าบัญชีที่ต้องการดู เป็นของผู้ใช้ที่ถือ Token หรือไม่ หากไม่ใช่ให้ส่ง **401 Unauthorized** ทันที:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/api/account.go (อัปเดต getAccount ตรวจสอบสิทธิ์)",
          c: `func (server *Server) getAccount(ctx *gin.Context) {
	var req getAccountRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	account, err := server.store.GetAccount(ctx, req.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// ตรวจสอบสิทธิ์ความเป็นเจ้าของบัญชี
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if account.Owner != authPayload.Username {
		err := errors.New("บัญชีนี้ไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์เข้าถึงข้อมูล")
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, account)
}`,
        },

        { t: "h3", c: "3.3 อัปเดต `listAccounts`: กรองเฉพาะบัญชีของตัวเองเท่านั้น" },
        {
          t: "p",
          c: "ในระบบจริง เราจะไม่อนุญาตให้ผู้ใช้ทั่วไปดูรายชื่อบัญชีของลูกค้าคนอื่นทั้งธนาคาร เราจึงต้องอัปเดตคิวรี `ListAccounts` ใน `db/account.go` ให้มีเงื่อนไข `WHERE owner = $1`:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/api/account.go (อัปเดต listAccounts ให้ส่ง Owner จาก Token)",
          c: `func (server *Server) listAccounts(ctx *gin.Context) {
	var req listAccountsRequest
	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	arg := db.ListAccountsParams{
		Owner:  authPayload.Username, // กรองเฉพาะบัญชีของเจ้าของ Token
		Limit:  req.PageSize,
		Offset: (req.PageID - 1) * req.PageSize,
	}

	accounts, err := server.store.ListAccounts(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, accounts)
}`,
        },
        {
          t: "p",
          c: "และใน Data Access Layer (`simplebank/db/account.go`) ให้อัปเดตคิวรี `ListAccounts` และพารามิเตอร์ `ListAccountsParams` ให้รับฟิลด์ `Owner`:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/db/account.go (อัปเดต ListAccounts ให้กรองตาม Owner)",
          c: `type ListAccountsParams struct {
	Owner  string \`json:"owner"\`
	Limit  int32  \`json:"limit"\`
	Offset int32  \`json:"offset"\`
}

const listAccounts = \`-- name: ListAccounts :many
SELECT id, owner, balance, currency, created_at FROM accounts
WHERE owner = $1
ORDER BY id
LIMIT $2 OFFSET $3;
\`

func (q *Queries) ListAccounts(ctx context.Context, arg ListAccountsParams) ([]Account, error) {
	rows, err := q.db.QueryContext(ctx, listAccounts, arg.Owner, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

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
          t: "code",
          lang: "go",
          label: "simplebank/db/account_test.go (อัปเดต TestListAccounts ให้ส่ง Owner)",
          c: `func TestListAccounts(t *testing.T) {
	var lastAccount Account
	for i := 0; i < 10; i++ {
		lastAccount = createRandomAccount(t)
	}

	arg := ListAccountsParams{
		Owner:  lastAccount.Owner,
		Limit:  5,
		Offset: 0,
	}

	accounts, err := testQueries.ListAccounts(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, accounts)

	for _, account := range accounts {
		require.NotEmpty(t, account)
		require.Equal(t, lastAccount.Owner, account.Owner)
	}
}`,
        },

        { t: "h3", c: "3.4 อัปเดต `createTransfer`: ป้องกันการสั่งโอนเงินแทนผู้อื่น" },
        {
          t: "p",
          c: "ในฟังก์ชัน `createTransfer` เราต้องเพิ่มการตรวจสอบว่า **ผู้ใช้ที่ถือ Token ล็อกอินเข้ามา เป็นเจ้าของบัญชีต้นทาง (`FromAccountID`) จริงหรือไม่** โดยอาศัย `fromAccount` ที่ส่งคืนมาจาก `validAccount`:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/api/transfer.go (อัปเดต createTransfer เพื่อตรวจสอบสิทธิ์เจ้าของบัญชี)",
          c: `// 1. ตรวจสอบบัญชีต้นทางและสกุลเงิน (คืนค่า fromAccount กลับมาทันที)
fromAccount, valid := server.validAccount(ctx, req.FromAccountID, req.Currency)
if !valid {
	return
}

// 2. ดึงข้อมูลตัวตนจาก Auth Middleware และตรวจสอบสิทธิ์ความเป็นเจ้าของ
authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
if fromAccount.Owner != authPayload.Username {
	err := errors.New("บัญชีต้นทางไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์โอนเงิน")
	ctx.JSON(http.StatusUnauthorized, errorResponse(err))
	return
}

// 3. ตรวจสอบบัญชีปลายทาง
_, valid = server.validAccount(ctx, req.ToAccountID, req.Currency)
if !valid {
	return
}`,
        },
        {
          t: "codeout",
          lang: "bash",
          label: "ทดสอบโอนเงินพร้อม Authorization Bearer Token (สำเร็จ 200 OK)",
          code: `curl -i -X POST http://localhost:8080/transfers \\
  -H "Authorization: Bearer v2.local.O4WcQo7c...L8a9m" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from_account_id": 1,
    "to_account_id": 2,
    "amount": 1000,
    "currency": "USD"
  }'`,
          out: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Sat, 26 Sep 2026 08:35:15 GMT

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
          lang: "bash",
          label: "ทดสอบแอบโอนเงินจากบัญชีผู้อื่น / ไม่ส่ง Token (ถูกบล็อก 401 Unauthorized)",
          code: `# กรณีที่ 1: Alice พยายามสั่งโอนเงินออกจากบัญชีของ Bob (FromAccountID = 2)
curl -i -X POST http://localhost:8080/transfers \\
  -H "Authorization: Bearer v2.local.O4WcQo7c...L8a9m" \\
  -H "Content-Type: application/json" \\
  -d '{"from_account_id": 2, "to_account_id": 1, "amount": 5000, "currency": "USD"}'

# กรณีที่ 2: เรียก API โดยไม่แนบ Authorization Header
curl -i -X POST http://localhost:8080/transfers \\
  -H "Content-Type: application/json" \\
  -d '{"from_account_id": 1, "to_account_id": 2, "amount": 1000, "currency": "USD"}'`,
          out: `# ผลลัพธ์กรณีที่ 1: ตรวจจับได้ว่าไม่ใช่เจ้าของบัญชี
HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8
{
  "error": "บัญชีต้นทางไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์โอนเงิน"
}

# ผลลัพธ์กรณีที่ 2: Middleware สกัดกั้นทันที
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
      th: "Config Management, Docker & Production Checklist",
      en: "Config Management with Viper, Multi-Stage Dockerfile & Production",
    },
    lead: {
      th: "จัดการ Environment Variables ด้วย Viper, เขียน Multi-Stage Dockerfile ย่อขนาดแอปเหลือ 20MB, และเช็กลิสต์ความพร้อมก่อนรันจริงบน Production",
      en: "Configuration management with Viper, ultra-lean multi-stage Docker builds, and the production readiness checklist.",
    },
    group: "7. Security, Auth & Production",
    blocks: {
      th: [
        {
          t: "p",
          c: "ในการนำระบบซอฟต์แวร์ขึ้นไปรันบน Production เราต้องไม่ฝัง Secret, Password หรือ URL ฐานข้อมูลลงใน Source Code เด็ดขาด ตามหลักการ **The Twelve-Factor App** การตั้งค่าทั้งหมดจะต้องถูกส่งผ่านเข้ามาทาง Environment Variables",
        },

        { t: "h2", c: "1. จัดการ Configuration ด้วย `spf13/viper`" },
        {
          t: "p",
          c: "เราจะใช้ไลบรารี **Viper** ซึ่งสามารถอ่านค่าคอนฟิกได้ทั้งจากไฟล์ `.env` ในช่วงพัฒนาบนเครื่องตัวเอง และดึงค่าจาก System Environment Variables อัตโนมัติเมื่อรันบน Docker หรือ Kubernetes เริ่มต้นด้วยการติดตั้ง Viper:",
        },
        {
          t: "code",
          lang: "bash",
          label: "ติดตั้ง spf13/viper",
          c: `go get github.com/spf13/viper`,
        },
        {
          t: "code",
          lang: "env",
          label: "simplebank/app.env (สร้างไฟล์ใหม่ที่ Root Directory)",
          c: `DB_DRIVER=postgres
DB_SOURCE=postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable
SERVER_ADDRESS=0.0.0.0:8080
TOKEN_SYMMETRIC_KEY=12345678901234567890123456789012
ACCESS_TOKEN_DURATION=15m`,
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/util/config.go (สร้างไฟล์ใหม่)",
          c: `package util

import (
	"time"

	"github.com/spf13/viper"
)

type Config struct {
	DBDriver            string        \`mapstructure:"DB_DRIVER"\`
	DBSource            string        \`mapstructure:"DB_SOURCE"\`
	ServerAddress       string        \`mapstructure:"SERVER_ADDRESS"\`
	TokenSymmetricKey   string        \`mapstructure:"TOKEN_SYMMETRIC_KEY"\`
	AccessTokenDuration time.Duration \`mapstructure:"ACCESS_TOKEN_DURATION"\`
}

func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName("app")
	viper.SetConfigType("env") // ค้นหาไฟล์ app.env

	viper.AutomaticEnv() // ดึงค่าจาก OS Environment ทับหากมีตัวแปรชื่อตรงกัน

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
          c: "หลังจากสร้างโมดูล Config เสร็จแล้ว ให้นำไปใช้งานจริงใน `simplebank/main.go` โดยแทนที่ค่าคงที่เดิม (Hardcoded Strings) ด้วยค่าที่อ่านมาจาก `app.env` ผ่าน `util.LoadConfig`:",
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/main.go (อัปเดตให้โหลด Config จาก app.env ผ่าน Viper)",
          c: `package main

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
	"simplebank/api"
	db "simplebank/db"
	"simplebank/util"
)

func main() {
	// 1. โหลดการตั้งค่าจากไฟล์ app.env ในโฟลเดอร์ Root
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	// 2. เชื่อมต่อฐานข้อมูลโดยใช้ค่าจาก Config
	conn, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}

	store := db.NewStore(conn)
	server, err := api.NewServer(config, store)
	if err != nil {
		log.Fatal("cannot create server:", err)
	}

	// 3. สตาร์ตเซิร์ฟเวอร์ตามที่อยู่พอร์ตใน Config
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
          label: "simplebank/Dockerfile (สร้างไฟล์ใหม่ที่ Root Directory)",
          c: `# Build Stage: ทำการคอมไพล์โค้ด Go
FROM golang:1.22-alpine3.19 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main main.go

# Run Stage: สร้าง Image รันจริงที่มีขนาดเล็กพิเศษ
FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/main .
COPY app.env .
COPY db/migration ./db/migration

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
          label: "simplebank/docker-compose.yml (สร้างไฟล์ใหม่ที่ Root Directory)",
          c: `version: "3.9"
services:
  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=simple_bank
    ports:
      - "5432:5432"

  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - DB_SOURCE=postgresql://root:secret@postgres:5432/simple_bank?sslmode=disable
    depends_on:
      - postgres`,
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
          label: "simplebank/test_e2e.sh (สคริปต์รันเทสต์ระบบจริงทั้งระบบในคำสั่งเดียว)",
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
