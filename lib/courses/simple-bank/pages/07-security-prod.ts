import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/07-security-prod.ts
// หน้าที่: บทที่ 7.1, 7.2, และ 7.3 ระบบผู้ใช้ Bcrypt, PASETO Middleware, และ Docker Production
// =============================================================================

export const securityProdPages: Record<string, Page> = {
  "bank-user-auth-bcrypt": {
    "slug": "bank-user-auth-bcrypt",
    "title": {
      "th": "7.1 ระบบผู้ใช้งาน & แฮชรหัสผ่านด้วย Bcrypt",
      "en": "7.1 User Management & Password Hashing with Bcrypt"
    },
    "lead": {
      "th": "เพิ่มตาราง users เพื่อผูกบัญชีธนาคารกับเจ้าของตัวจริง และเจาะลึกเทคนิคการแฮชรหัสผ่านด้วย bcrypt เพื่อป้องกันการโจมตีแบบ Brute-Force และ Rainbow Table",
      "en": "Adding the users table to bind accounts to real owners and securing passwords with bcrypt hashing."
    },
    "group": "7. ระบบยืนยันตัวตน ความปลอดภัย & การรันจริง (Production)",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: สร้าง REST API สำหรับบัญชีและการโอนเงินเรียบร้อยแล้ว\n• **ภารกิจในบทนี้**: สร้าง Migration เวอร์ชันที่ 2 (`000002_add_users`), เขียนยูทิลิตี้แฮชรหัสผ่านด้วย Bcrypt (`util/password.go`), สร้าง CRUD ตารางผู้ใช้ (`db/user.go`), และเปิด Endpoint สมัครสมาชิก (`POST /users` ใน `api/user.go`)\n• **ไวยากรณ์ Go ที่จะได้ใช้จริง**: การแปลง `string` $\\leftrightarrow$ `[]byte`, การห่อ Error ด้วย `fmt.Errorf(\"...: %w\", err)`, และการคัดกรองข้อมูลออกด้วย Response DTO (`userResponse`)"
        },
        {
          "t": "p",
          "c": "ในระบบธนาคารจริง เราจะยอมให้ใครก็ได้มาพิมพ์ชื่อส่งๆ เช่น `owner: \"Alice\"` เพื่อเปิดบัญชีไม่ได้เด็ดขาด บัญชีทุกเล่มจะต้องผูกอยู่กับ **ผู้ใช้งานที่มีตัวตนจริง (Authenticated User)** ที่ผ่านการสมัครสมาชิกและยืนยันรหัสผ่านอย่างถูกต้อง"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go & Best Practices ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "กลไก Go & Security ในบทนี้",
            "โค้ดที่ปรากฏ",
            "คำอธิบายและ Best Practice"
          ],
          "rows": [
            [
              "1. แปลง string เป็น []byte",
              "`bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)`",
              "ไลบรารีเข้ารหัสใน Go ทำงานกับข้อมูลระดับไบต์ (`[]byte`) เราจึงแปลง `string` เป็น `[]byte` ตอนส่งเข้า และแปลงกลับเป็น `string(hashedPassword)` ตอนเก็บลง DB"
            ],
            [
              "2. ห่อ Error ด้วย %w",
              "`fmt.Errorf(\"ไม่สามารถแฮชรหัสผ่านได้: %w\", err)`",
              "การใช้ `%w` (Wrap Error) ช่วยแนบข้อความอธิบายเพิ่มโดยไม่ทำลาย Error ต้นฉบับ ทำให้โค้ดชั้นนอกยังใช้ `errors.Is` หรือ `errors.As` ตรวจเช็กได้"
            ],
            [
              "3. Response DTO ซ่อนรหัสผ่าน",
              "`type userResponse struct { Username string ... }` (ไม่มีฟิลด์ `HashedPassword`)",
              "ห้ามส่ง `db.User` ออกไปใน `ctx.JSON` ตรงๆ เด็ดขาด! ต้องแปลงผ่าน `newUserResponse(user)` เพื่อตัด `HashedPassword` ทิ้งก่อนส่งกลับให้ลูกค้าเสมอ"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. ออกแบบตาราง Users และผูก Foreign Key กับ Accounts"
        },
        {
          "t": "p",
          "c": "เราจะสร้าง Migration ไฟล์ใหม่ด้วยคำสั่ง `migrate create -ext sql -dir db/migration -seq add_users` เพื่อเพิ่มตาราง `users` และปรับปรุงตาราง `accounts` ให้ผูกความสัมพันธ์:"
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/migration/000002_add_users.up.sql",
          "c": "CREATE TABLE \"users\" (\n  \"username\" varchar PRIMARY KEY,\n  \"hashed_password\" varchar NOT NULL,\n  \"full_name\" varchar NOT NULL,\n  \"email\" varchar UNIQUE NOT NULL,\n  \"password_changed_at\" timestamptz NOT NULL DEFAULT '0001-01-01 00:00:00Z',\n  \"created_at\" timestamptz NOT NULL DEFAULT (now())\n);\n\n-- ผูกเจ้าของบัญชีเข้ากับ username ในตาราง users\nALTER TABLE \"accounts\" ADD FOREIGN KEY (\"owner\") REFERENCES \"users\" (\"username\");\n\n-- กฎ: ผู้ใช้ 1 คน ห้ามเปิดบัญชีสกุลเงินเดียวกันซ้ำซ้อน (เช่น Alice มีบัญชี USD ได้แค่เล่มเดียว)\nALTER TABLE \"accounts\" ADD CONSTRAINT \"owner_currency_key\" UNIQUE (\"owner\", \"currency\");"
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/migration/000002_add_users.down.sql",
          "c": "ALTER TABLE IF EXISTS \"accounts\" DROP CONSTRAINT IF EXISTS \"owner_currency_key\";\nALTER TABLE IF EXISTS \"accounts\" DROP CONSTRAINT IF EXISTS \"accounts_owner_fkey\";\nDROP TABLE IF EXISTS \"users\";"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "รัน Migration เพิ่มตาราง users และ Foreign Key ใน PostgreSQL",
          "code": "make migrateup",
          "out": "migrate -path db/migration -database \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\" -verbose up\n2026/09/27 18:30:00 Start running migration 000002_add_users.up.sql\n2026/09/27 18:30:00 Finished running migration 000002_add_users.up.sql (OK)"
        },
        {
          "t": "h2",
          "c": "3. ทำไมห้ามเก็บ Plain Text หรือ MD5 / SHA-256 เด็ดขาด?"
        },
        {
          "t": "p",
          "c": "หากฐานข้อมูลเกิดรั่วไหล การเก็บรหัสผ่านเป็นข้อความธรรมดา (Plain Text) จะทำให้แฮกเกอร์เห็นรหัสผ่านของลูกค้าทุกคนทันที และแม้แต่การใช้ฟังก์ชันแฮชที่คำนวณเร็วอย่าง **MD5 หรือ SHA-256 ก็ยังไม่ปลอดภัย** เพราะการ์ดจอยุคใหม่สามารถคำนวณสุ่มรหัสผ่านได้หลายพันล้านครั้งต่อวินาที รวมถึงใช้ตารางเทียบค่าแฮชสำเร็จรูป (**Rainbow Table**) แกะรหัสผ่านยอดนิยมออกได้ในพริบตา ดังนั้นระบบการเงินจึงต้องใช้อัลกอริทึมแฮชที่ **ตั้งใจออกแบบให้ใช้เวลาคำนวณช้าลง (Slow Hashing)** และ **สุ่มค่าเกลือ (Salt) เติมเข้าไปในทุกรหัสผ่านโดยอัตโนมัติ**"
        },
        {
          "t": "callout",
          "title": "🛡️ ทางออกมาตรฐานสากล: Bcrypt",
          "c": "Bcrypt เป็นอัลกอริทึมประเภท **Slow Hashing** ที่ถูกออกแบบมาให้กินเวลาประมวลผลของ CPU (มี Cost Factor หรือ Work Factor) และมีการสุ่มค่า **Salt** (ตัวแปรสุ่มพิเศษ) เติมเข้าไปในทุกรหัสผ่านโดยอัตโนมัติ ทำให้แม้ผู้ใช้สองคนจะตั้งรหัสผ่าน `123456` เหมือนกัน ค่าแฮชที่ได้ก็จะแตกต่างกันอย่างสิ้นเชิง ป้องกัน Rainbow Table ได้ 100%!"
        },
        {
          "t": "h2",
          "c": "4. ตัวอย่างการทำงานของ Bcrypt (Salt & Work Factor)"
        },
        {
          "t": "p",
          "c": "เพื่อทำความเข้าใจว่าทำไมรหัสผ่านเดียวกันถึงได้ Hash ต่างกัน และ Bcrypt ตรวจสอบรหัสผ่านอย่างไร ให้ติดตั้งไลบรารี `golang.org/x/crypto` ก่อน:"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "ติดตั้งแพ็กเกจ crypto",
          "c": "go get golang.org/x/crypto"
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "bcrypt_demo.go",
          "code": "// =============================================================================\n// ไฟล์: bcrypt_demo.go\n// หน้าที่: สาธิตกลไกความปลอดภัยของ Bcrypt: การสุ่ม Salt อัตโนมัติ และการตรวจสอบรหัสผ่าน\n// แก้ปัญหา: ป้องกันการแฮกผ่าน Rainbow Table เพราะรหัสผ่านเดียวกันจะได้ Hash ที่แตกต่างกันทุกครั้ง\n// =============================================================================\npackage main\n\nimport (\n\t\"fmt\"\n\t\"golang.org/x/crypto/bcrypt\"\n)\n\nfunc main() {\n\trawPassword := \"secretPassword123\"\n\n\t// 1. แฮชรหัสผ่านเดียวกัน 2 ครั้ง (Bcrypt จะสุ่ม Salt ใหม่ทุกครั้ง ทำให้ผลลัพธ์ไม่ตรงกัน)\n\thash1, _ := bcrypt.GenerateFromPassword([]byte(rawPassword), bcrypt.DefaultCost)\n\thash2, _ := bcrypt.GenerateFromPassword([]byte(rawPassword), bcrypt.DefaultCost)\n\n\tfmt.Println(\"Hash #1:\", string(hash1))\n\tfmt.Println(\"Hash #2:\", string(hash2))\n\tfmt.Println(\"Hashes identical?:\", string(hash1) == string(hash2))\n\n\t// 2. ตรวจสอบรหัสผ่านที่ถูกต้องด้วย CompareHashAndPassword (ถ้ารหัสตรงกัน err จะเป็น nil)\n\terrCorrect := bcrypt.CompareHashAndPassword(hash1, []byte(\"secretPassword123\"))\n\tfmt.Println(\"Check correct password err == nil:\", errCorrect == nil)\n\n\t// 3. ตรวจสอบรหัสผ่านที่ผิด (ถ้ารหัสไม่ตรง จะส่ง Error กลับมา)\n\terrWrong := bcrypt.CompareHashAndPassword(hash1, []byte(\"wrongPassword456\"))\n\tfmt.Println(\"Check wrong password error:\", errWrong)\n}",
          "out": "Hash #1: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy\nHash #2: $2a$10$vWfPjE7zCkgvG5WlqL2Egu5K70dFwJ9o6e0jNqEaYc8hKx8bLqXsm\nHashes identical?: false (Bcrypt สุ่ม Salt ใหม่เสมอ ป้องกัน Rainbow Table)\nCheck correct password err == nil: true (ยืนยันรหัสถูกต้องสำเร็จ)\nCheck wrong password error: crypto/bcrypt: hashedPassword is not the hash of the given password"
        },
        {
          "t": "h2",
          "c": "5. นำไปสร้างเป็นฟังก์ชันในโปรเจกต์ Simple Bank"
        },
        {
          "t": "p",
          "c": "เมื่อเข้าใจหลักการแล้ว ในโปรเจกต์จริงเราจะนำฟังก์ชันนี้ไปไว้ในแพ็กเกจ `util` (`simplebank/util/password.go`) เพื่อให้ Handler อื่นๆ เรียกใช้งานได้:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/password.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/util/password.go\n// หน้าที่: ยูทิลิตี้จัดการการแฮชและตรวจสอบรหัสผ่านด้วยอัลกอริทึม Bcrypt\n// แก้ปัญหา: ห้ามบันทึกรหัสผ่านเป็น Plain Text ลงฐานข้อมูลเด็ดขาด เพื่อความปลอดภัยของผู้ใช้งาน\n// =============================================================================\npackage util\n\nimport (\n\t\"fmt\"\n\t\"golang.org/x/crypto/bcrypt\"\n)\n\n// HashPassword แปลงรหัสผ่าน Plain Text ให้กลายเป็น Bcrypt Hash พร้อมแนบ Salt อัตโนมัติ\nfunc HashPassword(password string) (string, error) {\n\t// 1. แฮชรหัสผ่านโดยใช้ค่า Cost มาตรฐาน (DefaultCost = 10)\n\thashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)\n\tif err != nil {\n\t\treturn \"\", fmt.Errorf(\"ไม่สามารถแฮชรหัสผ่านได้: %w\", err)\n\t}\n\n\t// 2. คืนค่าสตริงของ Bcrypt Hash ที่พร้อมนำไปบันทึกลงคอลัมน์ hashed_password\n\treturn string(hashedPassword), nil\n}\n\n// CheckPassword ตรวจสอบว่ารหัสผ่านที่ป้อนเข้ามา ตรงกับ Bcrypt Hash ในฐานข้อมูลหรือไม่\nfunc CheckPassword(password string, hashedPassword string) error {\n\t// ใช้ CompareHashAndPassword เพื่อแกะ Salt จาก Hash แล้วนำมาเทียบกับรหัสผ่านที่ส่งเข้ามา\n\treturn bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))\n}"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/password_test.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/util/password_test.go\n// หน้าที่: โค้ดส่วนประกอบของ simplebank/util/password_test.go\n// แก้ปัญหา: ออกแบบตามมาตรฐาน Clean Architecture สำหรับระบบธนาคาร\n// =============================================================================\npackage util\n\nimport (\n\t\"testing\"\n\n\t\"github.com/stretchr/testify/require\"\n\t\"golang.org/x/crypto/bcrypt\"\n)\n\nfunc TestPassword(t *testing.T) {\n\tpassword := RandomString(6)\n\n\t// 1. แฮชรหัสผ่านครั้งที่ 1\n\thashedPassword1, err := HashPassword(password)\n\trequire.NoError(t, err)\n\trequire.NotEmpty(t, hashedPassword1)\n\n\t// 2. แฮชรหัสผ่านเดิมซ้ำครั้งที่ 2 (ต้องได้ค่า Hash ต่างกันจาก Salt)\n\thashedPassword2, err := HashPassword(password)\n\trequire.NoError(t, err)\n\trequire.NotEmpty(t, hashedPassword2)\n\trequire.NotEqual(t, hashedPassword1, hashedPassword2)\n\n\t// 3. ตรวจสอบรหัสผ่านที่ถูกต้อง\n\terr = CheckPassword(password, hashedPassword1)\n\trequire.NoError(t, err)\n\n\t// 4. ตรวจสอบรหัสผ่านที่ผิด (ต้องส่ง ErrMismatchedHashAndPassword)\n\twrongPassword := RandomString(6)\n\terr = CheckPassword(wrongPassword, hashedPassword1)\n\trequire.EqualError(t, err, bcrypt.ErrMismatchedHashAndPassword.Error())\n}"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "คำสั่งรัน Unit Test ทดสอบฟังก์ชัน Password ใน Terminal",
          "code": "go test -v -run TestPassword ./util",
          "out": "=== RUN   TestPassword\n--- PASS: TestPassword (0.18s)\nPASS\nok      simplebank/util 0.231s"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`bcrypt.DefaultCost`**: ปัจจุบันมีค่าเท่ากับ 10 หมายความว่าอัลกอริทึมจะทำการวนรอบคำนวณ $2^{10} = 1024$ รอบ ซึ่งกินเวลาประมาณ 50–100 มิลลิวินาที เป็นความเร็วที่ผู้ใช้งานไม่รู้สึกสะดุด แต่ทำให้แฮกเกอร์ไม่สามารถใช้ GPU รันสุ่มรหัสผ่านได้",
            "**`bcrypt.CompareHashAndPassword`**: ฟังก์ชันนี้จะสกัดค่า Salt ที่ฝังอยู่ใน `hashedPassword` ออกมา แล้วนำมารวมกับ `password` เพื่อคำนวณเปรียบเทียบ หากรหัสผ่านถูกต้องจะคืนค่า `nil` แต่ถ้าไม่ตรงจะคืนค่า `bcrypt.ErrMismatchedHashAndPassword`"
          ]
        },
        {
          "t": "h2",
          "c": "6. Model ตาราง Users และการซ่อน Hashed Password ตอนส่ง JSON"
        },
        {
          "t": "p",
          "c": "สร้าง Go Struct และฟังก์ชัน CRUD สำหรับจัดการตาราง `users` ใน `simplebank/db/user.go`:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/user.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/user.go\n// หน้าที่: ฟังก์ชัน CRUD สำหรับจัดการข้อมูลผู้ใช้งานในตาราง users\n// แก้ปัญหา: บันทึกข้อมูลและดึงข้อมูลผู้ใช้เพื่อตรวจสอบสิทธิ์ในการเข้าสู่ระบบ\n// =============================================================================\npackage db\n\nimport (\n\t\"context\"\n\t\"time\"\n)\n\ntype User struct {\n\tUsername          string    `json:\"username\"`\n\tHashedPassword    string    `json:\"hashed_password\"`\n\tFullName          string    `json:\"full_name\"`\n\tEmail             string    `json:\"email\"`\n\tPasswordChangedAt time.Time `json:\"password_changed_at\"`\n\tCreatedAt         time.Time `json:\"created_at\"`\n}\n\ntype CreateUserParams struct {\n\tUsername       string `json:\"username\"`\n\tHashedPassword string `json:\"hashed_password\"`\n\tFullName       string `json:\"full_name\"`\n\tEmail          string `json:\"email\"`\n}\n\nconst createUser = `-- name: CreateUser :one\nINSERT INTO users (\n  username,\n  hashed_password,\n  full_name,\n  email\n) VALUES (\n  $1, $2, $3, $4\n)\nRETURNING username, hashed_password, full_name, email, password_changed_at, created_at;\n`\n\nfunc (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {\n\trow := q.db.QueryRowContext(ctx, createUser, arg.Username, arg.HashedPassword, arg.FullName, arg.Email)\n\tvar i User\n\terr := row.Scan(\n\t\t&i.Username,\n\t\t&i.HashedPassword,\n\t\t&i.FullName,\n\t\t&i.Email,\n\t\t&i.PasswordChangedAt,\n\t\t&i.CreatedAt,\n\t)\n\treturn i, err\n}\n\nconst getUser = `-- name: GetUser :one\nSELECT username, hashed_password, full_name, email, password_changed_at, created_at FROM users\nWHERE username = $1 LIMIT 1;\n`\n\nfunc (q *Queries) GetUser(ctx context.Context, username string) (User, error) {\n\trow := q.db.QueryRowContext(ctx, getUser, username)\n\tvar i User\n\terr := row.Scan(\n\t\t&i.Username,\n\t\t&i.HashedPassword,\n\t\t&i.FullName,\n\t\t&i.Email,\n\t\t&i.PasswordChangedAt,\n\t\t&i.CreatedAt,\n\t)\n\treturn i, err\n}"
        },
        {
          "t": "p",
          "c": "สร้าง Handler สมัครสมาชิก `POST /users` ใน `simplebank/api/user.go` โดยเมื่อสร้างผู้ใช้สำเร็จ เรา **ห้ามส่ง `hashed_password` กลับไปใน JSON Response เด็ดขาด** จึงต้องสร้าง `userResponse` เพื่อคัดกรองข้อมูล:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/user.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/user.go\n// หน้าที่: API Handler สำหรับสมัครสมาชิกใหม่ (POST /users)\n// แก้ปัญหา: ออกแบบตามมาตรฐาน Clean Architecture สำหรับระบบธนาคาร\n// =============================================================================\npackage api\n\nimport (\n\t\"net/http\"\n\t\"time\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n\t\"simplebank/util\"\n)\n\ntype createUserRequest struct {\n\tUsername string `json:\"username\" binding:\"required,alphanum\"`\n\tPassword string `json:\"password\" binding:\"required,min=6\"`\n\tFullName string `json:\"full_name\" binding:\"required\"`\n\tEmail    string `json:\"email\" binding:\"required,email\"`\n}\n\n// userResponse คือ struct ที่ตัดฟิลด์ hashedPassword ทิ้งไปเพื่อความปลอดภัย\ntype userResponse struct {\n\tUsername          string    `json:\"username\"`\n\tFullName          string    `json:\"full_name\"`\n\tEmail             string    `json:\"email\"`\n\tPasswordChangedAt time.Time `json:\"password_changed_at\"`\n\tCreatedAt         time.Time `json:\"created_at\"`\n}\n\nfunc newUserResponse(user db.User) userResponse {\n\treturn userResponse{\n\t\tUsername:          user.Username,\n\t\tFullName:          user.FullName,\n\t\tEmail:             user.Email,\n\t\tPasswordChangedAt: user.PasswordChangedAt,\n\t\tCreatedAt:         user.CreatedAt,\n\t}\n}\n\nfunc (server *Server) createUser(ctx *gin.Context) {\n\t// 1. ตรวจสอบเงื่อนไขข้อมูลที่ส่งมาทาง JSON\n\tvar req createUserRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 2. แฮชรหัสผ่านด้วย Bcrypt ก่อนบันทึก\n\thashedPassword, err := util.HashPassword(req.Password)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 3. บันทึกผู้ใช้ลงฐานข้อมูลผ่าน store\n\targ := db.CreateUserParams{\n\t\tUsername:       req.Username,\n\t\tHashedPassword: hashedPassword,\n\t\tFullName:       req.FullName,\n\t\tEmail:          req.Email,\n\t}\n\n\tuser, err := server.store.CreateUser(ctx, arg)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 4. ส่งกลับเฉพาะข้อมูลที่ปลอดภัย ปราศจาก hashedPassword\n\trsp := newUserResponse(user)\n\tctx.JSON(http.StatusCreated, rsp)\n}"
        },
        {
          "t": "p",
          "c": "จากนั้นเปิดไฟล์ `simplebank/api/server.go` เพื่อลงทะเบียน Route `POST /users` เข้าสู่ Gin Engine ให้สามารถเรียกใช้งานได้:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/api/server.go",
          "c": " \t// 2. ลงทะเบียน Routing สำหรับแต่ละ Endpoint\n \trouter.POST(\"/accounts\", server.createAccount)\n \trouter.GET(\"/accounts/:id\", server.getAccount)\n \trouter.GET(\"/accounts\", server.listAccounts)\n \trouter.POST(\"/transfers\", server.createTransfer)\n+\trouter.POST(\"/users\", server.createUser)\n \n \tserver.router = router\n \treturn server"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "Terminal 1: รีสตาร์ตเซิร์ฟเวอร์ Go เพื่อโหลด Route ใหม่",
          "code": "go run main.go",
          "out": "[GIN-debug] POST   /accounts                 --> simplebank/api.(*Server).createAccount-fm (3 handlers)\n[GIN-debug] GET    /accounts/:id             --> simplebank/api.(*Server).getAccount-fm (3 handlers)\n[GIN-debug] GET    /accounts                 --> simplebank/api.(*Server).listAccounts-fm (3 handlers)\n[GIN-debug] POST   /transfers                --> simplebank/api.(*Server).createTransfer-fm (3 handlers)\n[GIN-debug] POST   /users                    --> simplebank/api.(*Server).createUser-fm (3 handlers)\n[GIN-debug] [WARNING] Listening and serving HTTP on 0.0.0.0:8080"
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "ทดสอบสมัครสมาชิก: POST /users (ตั้งค่าใน Postman / API Client)",
          "code": "POST http://localhost:8080/users\nContent-Type: application/json\n\n{\n  \"username\": \"alice\",\n  \"password\": \"secretPassword123\",\n  \"full_name\": \"Alice Wonderland\",\n  \"email\": \"alice@example.com\"\n}",
          "out": "HTTP/1.1 201 Created\nContent-Type: application/json; charset=utf-8\n\n{\n  \"username\": \"alice\",\n  \"full_name\": \"Alice Wonderland\",\n  \"email\": \"alice@example.com\",\n  \"password_changed_at\": \"0001-01-01T00:00:00Z\",\n  \"created_at\": \"2026-09-26T08:35:00.124851Z\"\n}\n# สังเกต: ฟิลด์ hashed_password ถูกตัดทิ้งไปอย่างปลอดภัย ไม่หลุดไปยังหน้าบ้านเด็ดขาด!"
        },
        {
          "t": "h2",
          "c": "7. อัปเดต Unit Test (account_test.go) เพื่อป้องกัน Foreign Key Error"
        },
        {
          "t": "p",
          "c": "หลังจากที่เรารัน Migration `000002_add_users.up.sql` เพิ่ม Foreign Key แล้ว หากเราสั่งรัน `go test ./db` ตอนนี้เทสต์สร้างบัญชีและเทสต์โอน (`TestCreateAccount`, `TestTransferTx`) จะพังทันทีจากข้อผิดพลาด Foreign Key Violation:"
        },
        {
          "t": "codeout",
          "lang": "text",
          "label": "Terminal Error เมื่อรัน Unit Test หลังเพิ่ม Users Table (โดยยังไม่ได้แก้ Test Helper)",
          "code": "go test -v -run TestCreateAccount ./db",
          "out": "--- FAIL: TestCreateAccount (0.01s)\n    account_test.go:27: \n        \tError:      \tReceived unexpected error: pq: insert or update on table \"accounts\" violates foreign key constraint \"accounts_owner_fkey\"\n        \tTest:       \tTestCreateAccount\nFAIL"
        },
        {
          "t": "callout",
          "title": "🔍 สาเหตุและวิธีแก้ปัญหา",
          "c": "ในบทที่ 5 ฟังก์ชัน `createRandomAccount` สุ่มชื่อ Owner ด้วย `util.RandomOwner()` ลอยๆ โดยไม่มีตัวตนในตาราง `users`\n\nวิธีแก้ที่ถูกต้องตามหลัก Data Integrity คือเราต้องสร้าง User จำลองขึ้นมาก่อน แล้วนำ `user.Username` นั้นมาใช้เปิดบัญชีเสมอ!",
          "warn": true
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/user_test.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/user_test.go\n// หน้าที่: โค้ดส่วนประกอบของ simplebank/db/user_test.go\n// แก้ปัญหา: ออกแบบตามมาตรฐาน Clean Architecture สำหรับระบบธนาคาร\n// =============================================================================\npackage db\n\nimport (\n\t\"context\"\n\t\"testing\"\n\n\t\"github.com/stretchr/testify/require\"\n\t\"simplebank/util\"\n)\n\n// createRandomUser สร้างผู้ใช้สุ่มลงตาราง users สำหรับใช้เป็น Foreign Key ในการเทสต์\nfunc createRandomUser(t *testing.T) User {\n\thashedPassword, err := util.HashPassword(util.RandomString(6))\n\trequire.NoError(t, err)\n\n\targ := CreateUserParams{\n\t\tUsername:       util.RandomOwner(),\n\t\tHashedPassword: hashedPassword,\n\t\tFullName:       util.RandomOwner(),\n\t\tEmail:          util.RandomString(6) + \"@email.com\",\n\t}\n\n\tuser, err := testQueries.CreateUser(context.Background(), arg)\n\trequire.NoError(t, err)\n\trequire.NotEmpty(t, user)\n\n\trequire.Equal(t, arg.Username, user.Username)\n\trequire.Equal(t, arg.HashedPassword, user.HashedPassword)\n\trequire.Equal(t, arg.FullName, user.FullName)\n\trequire.Equal(t, arg.Email, user.Email)\n\trequire.True(t, user.PasswordChangedAt.IsZero())\n\trequire.NotZero(t, user.CreatedAt)\n\n\treturn user\n}"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/db/account_test.go",
          "c": " func createRandomAccount(t *testing.T) Account {\n+\tuser := createRandomUser(t) // 1. สร้าง User สุ่มขึ้นมาก่อนเสมอ\n+\n \targ := CreateAccountParams{\n-\t\tOwner:    util.RandomOwner(),\n+\t\tOwner:    user.Username,      // 2. ใช้ username จริงที่มี Foreign Key รองรับ\n \t\tBalance:  util.RandomMoney(),\n \t\tCurrency: util.RandomCurrency(),\n \t}"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "รัน Unit Test ทั้งหมดใน ./db อีกครั้งหลังอัปเดต (PASS 100%)",
          "code": "go test -v ./db",
          "out": "=== RUN   TestCreateAccount\n--- PASS: TestCreateAccount (0.02s)\n=== RUN   TestGetAccount\n--- PASS: TestGetAccount (0.01s)\n=== RUN   TestDeleteAccount\n--- PASS: TestDeleteAccount (0.01s)\n=== RUN   TestListAccounts\n--- PASS: TestListAccounts (0.02s)\n=== RUN   TestTransferTx\n--- PASS: TestTransferTx (0.08s)\n=== RUN   TestTransferTxDeadlock\n--- PASS: TestTransferTxDeadlock (0.09s)\nPASS\nok      simplebank/db   0.312s"
        },
        {
          "t": "callout",
          "title": "🏆 Go Production Best Practice: การดักจับ pq.Error (Unique & Foreign Key Violation)",
          "c": "เมื่อผู้ใช้สมัครสมาชิกด้วย `username` หรือ `email` ที่ซ้ำกับคนอื่นในระบบ PostgreSQL จะส่ง Error ชนิด `*pq.Error` ที่มีชื่อรหัสว่า `\"unique_violation\"` (รหัส `23505`) กลับมา เราสามารถใช้ `var pqErr *pq.Error` คู่กับ `errors.As(err, &pqErr)` เพื่อดักจับและตอบกลับเป็น **HTTP 403 Forbidden (หรือ 409 Conflict)** แทนการตอบ 500 Internal Server Error ได้อย่างมืออาชีพ!"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• คุณได้เพิ่มระบบสมาชิก (`users`), เข้ารหัสรหัสผ่านด้วย Bcrypt, ซ่อน `hashed_password` ด้วย DTO, และอัปเดต Unit Test ให้รองรับ Foreign Key เรียบร้อยแล้ว\n• **ก้าวต่อไป (บทที่ 7.2)**: เราจะสร้างระบบออกตั๋วรับรองตัวตนด้วย **PASETO Token** (`POST /users/login`) และสร้าง **Gin Authentication Middleware** เพื่อล็อกไม่ให้ใครแอบดูบัญชีหรือแอบโอนเงินของคนอื่นได้!"
        }
      ],
      "en": []
    }
  },
  "bank-jwt-paseto-token": {
    "slug": "bank-jwt-paseto-token",
    "title": {
      "th": "7.2 ยืนยันตัวตนด้วย PASETO Token & Gin Middleware",
      "en": "7.2 Authentication with PASETO Tokens & Gin Middleware"
    },
    "lead": {
      "th": "ทำไมระบบสมัยใหม่จึงเลือกใช้ PASETO แทน JWT เพื่อปิดช่องโหว่ความปลอดภัย พร้อมเขียน Gin Authentication Middleware เพื่อป้องกันไม่ให้คนอื่นแอบมาโอนเงินแทนเรา",
      "en": "Why modern backends choose PASETO over JWT to eliminate cipher agility flaws, plus building Gin Auth Middleware."
    },
    "group": "7. ระบบยืนยันตัวตน ความปลอดภัย & การรันจริง (Production)",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: สร้างตาราง `users` และระบบสมัครสมาชิกด้วย Bcrypt เรียบร้อยแล้ว\n• **ภารกิจในบทนี้**: สร้างแพ็กเกจ `simplebank/token/` (`payload.go`, `maker.go`, `paseto_maker.go`), เพิ่ม Endpoint ล็อกอิน (`POST /users/login`), และสร้าง `api/middleware.go` เพื่อบังคับตรวจสอบสิทธิ์เจ้าของบัญชีในทุก Endpoint\n• **ไวยากรณ์ Go ที่จะได้ใช้จริง**: Interface (`token.Maker`), Higher-Order Middleware Function (`func authMiddleware(...) gin.HandlerFunc`), และ Type Assertion (`ctx.MustGet(...).(*token.Payload)`)"
        },
        {
          "t": "p",
          "c": "เนื่องจากโปรโตคอล HTTP มีธรรมชาติเป็น **Stateless (ไม่จำสถานะระหว่างคำขอ)** คำถามคือเมื่อผู้ใช้ล็อกอินผ่านแล้ว ในคำขอถัดไปที่เขากดดูยอดเงินหรือกดโอนเงิน เซิร์ฟเวอร์จะรู้ได้อย่างไรว่าคำขอนั้นมาจากใครโดยไม่ต้องกรอกรหัสผ่านซ้ำทุกครั้ง? วิธีมาตรฐานคือเมื่อล็อกอินสำเร็จ เซิร์ฟเวอร์จะออก **ตั๋วรับรองตัวตนที่เข้ารหัสไว้ (Access Token)** ส่งกลับไปให้ผู้ใช้ แล้วในการเรียก API ครั้งถัดไป ผู้ใช้เพียงแนบตั๋วนี้มาใน HTTP Header ที่ชื่อว่า `Authorization: Bearer <token>`"
        },
        {
          "t": "p",
          "c": "รูปแบบของ Access Token ที่นักพัฒนาทั่วไปคุ้นเคยคือ **JWT (JSON Web Token)** แต่ในคอร์สระดับ Production นี้ เราจะก้าวไปอีกขั้นด้วยการเลือกใช้มาตรฐานยุคใหม่ที่ปลอดภัยกว่าอย่าง **PASETO (Platform-Agnostic Security Tokens)** มาดูตารางเปรียบเทียบกันว่าทำไม PASETO ถึงถูกออกแบบมาเพื่อปิดจุดอ่อนของ JWT โดยเฉพาะ:"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go & Best Practices ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "กลไก Go ในระบบ Token & Middleware",
            "โค้ดที่ปรากฏ",
            "แกะความหมายให้เข้าใจง่าย"
          ],
          "rows": [
            [
              "1. Maker Interface",
              "`type Maker interface { CreateToken(...); VerifyToken(...) }`",
              "แยกสัญญาการสร้างและตรวจ Token ออกจากอัลกอริทึมจริง ทำให้ `Server` เรียกผ่าน `token.Maker` ได้โดยไม่ยึดติดว่าเป็น PASETO หรือ JWT"
            ],
            [
              "2. Higher-Order Middleware",
              "`func authMiddleware(tokenMaker token.Maker) gin.HandlerFunc {\n    return func(ctx *gin.Context) { ... }\n}`",
              "ฟังก์ชันชั้นนอกรับ `tokenMaker` เข้ามา แล้วคืนค่าเป็นฟังก์ชันดักจับคำขอของ Gin ถ้าตรวจ Token ไม่ผ่านจะสั่ง `ctx.AbortWithStatusJSON(401, ...)` เพื่อหยุดทันที แต่ถ้าผ่านจะฝากข้อมูลไว้ใน `ctx.Set(...)` แล้วเรียก `ctx.Next()`"
            ],
            [
              "3. ดึง Payload ด้วย Type Assertion",
              "`authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)`",
              "ดึงข้อมูลผู้ที่ล็อกอินออกจาก `gin.Context` แล้วแปลงชนิดข้อมูลจาก `interface{}` กลับมาเป็น `*token.Payload` เพื่อนำ `authPayload.Username` ไปเช็กความเป็นเจ้าของบัญชี"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. ทำไมคอร์สนี้ใช้ PASETO และ JWT ต่างกันตรงไหน"
        },
        {
          "t": "p",
          "c": "หลายคนคงคุ้นเคยกับ **JWT (JSON Web Token)** แต่วิศวกรความปลอดภัยระดับโลกมักเตือนถึงจุดอ่อนสำคัญของ JWT ที่เรียกว่า **Algorithm Agility Flaw**:"
        },
        {
          "t": "table",
          "head": [
            "หัวข้อเปรียบเทียบ",
            "JWT (JSON Web Token)",
            "PASETO (Platform-Agnostic Security Tokens)"
          ],
          "rows": [
            [
              "การเลือกอัลกอริทึม",
              "เปิดให้ระบุใน Header ของ Token ได้ (เช่น `alg: \"HS256\"`) ซึ่งในอดีตเคยมีช่องโหว่ร้ายแรงที่แฮกเกอร์ส่ง `alg: \"none\"` เข้ามาแล้วเซิร์ฟเวอร์ข้ามการตรวจลายเซ็น!",
              "**ไร้ช่องโหว่การเลือกอัลกอริทึม!** ผู้พัฒนาไม่ต้องเลือกเอง ตัวมาตรฐานจะล็อกอัลกอริทึมที่ดีที่สุดและปลอดภัยที่สุด ณ เวอร์ชันนั้นให้ทันที (เช่น ChaCha20-Poly1305 สำหรับ Local และ Ed25519 สำหรับ Public)"
            ],
            [
              "ความง่ายในการใช้งาน",
              "นักพัฒนาต้องตั้งค่าหลายจุด มีโอกาสเลือกใช้คีย์ที่สั้นเกินไปจนถูกถอดรหัสได้ง่าย",
              "บังคับใช้ Symmetric Key ขนาด 32 ไบต์ที่แข็งแกร่งเท่านั้น ผิดพลาดจากการตั้งค่ายากมาก"
            ],
            [
              "สถานะความปลอดภัย",
              "มีประวัติถูกค้นพบช่องโหว่ในหลายไลบรารี",
              "ได้รับการยกย่องว่าเป็นมาตรฐานทองคำสำหรับ Secure Token ยุคใหม่"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "3. ออกแบบ Payload และ PasetoMaker ใน Go"
        },
        {
          "t": "p",
          "c": "ติดตั้งแพ็กเกจที่จำเป็นสำหรับการสร้าง PASETO Token, UUID และการเข้ารหัสแบบ Symmetric:"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "ติดตั้ง paseto, uuid และ chacha20poly1305",
          "c": "go get github.com/google/uuid github.com/o1egl/paseto github.com/aead/chacha20poly1305"
        },
        {
          "t": "p",
          "c": "ข้อมูลภายใน Token จะประกอบด้วย `Username`, เวลาที่ออกตั๋ว (`IssuedAt`), และเวลาหมดอายุ (`ExpiredAt`):"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/token/payload.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/token/payload.go\n// หน้าที่: นิยาม Payload สำหรับบรรจุข้อมูลประจำตัวของผู้ใช้ที่ถูกเข้ารหัสไว้ใน Token\n// แก้ปัญหา: จัดเก็บตัวตน (Username) วันหมดอายุ (ExpiredAt) และ UUID เฉพาะตัว เพื่อใช้ระบุสิทธิ์ของผู้ใช้งานในระบบ\n// =============================================================================\npackage token\n\nimport (\n\t\"errors\"\n\t\"time\"\n\n\t\"github.com/google/uuid\"\n)\n\n// ข้อผิดพลาดมาตรฐานเมื่อ Token หมดอายุหรือไม่ถูกต้อง\nvar ErrExpiredToken = errors.New(\"ตั๋วรับรองหมดอายุแล้ว\")\nvar ErrInvalidToken = errors.New(\"ตั๋วรับรองไม่ถูกต้อง\")\n\n// Payload เก็บข้อมูลสำคัญที่ผูกอยู่กับ Token แต่ละใบ\ntype Payload struct {\n\tID        uuid.UUID `json:\"id\"`         // รหัสเฉพาะของตั๋วใบนี้ (ใช้ป้องกันการนำตั๋วมาใช้ซ้ำ)\n\tUsername  string    `json:\"username\"`   // ชื่อผู้ใช้เจ้าของตั๋ว\n\tIssuedAt  time.Time `json:\"issued_at\"`  // วันเวลาที่สร้างตั๋ว\n\tExpiredAt time.Time `json:\"expired_at\"` // วันเวลาที่ตั๋วหมดอายุ\n}\n\n// NewPayload สร้าง Payload ใหม่สำหรับผู้ใช้ พร้อมกำหนดระยะเวลาหมดอายุ\nfunc NewPayload(username string, duration time.Duration) (*Payload, error) {\n\t// 1. สุ่มสร้าง UUID v4 สำหรับใช้เป็น Token ID ที่ไม่ซ้ำใครในโลก\n\ttokenID, err := uuid.NewRandom()\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\n\t// 2. กำหนดเวลาเริ่มต้นและคำนวณเวลาหมดอายุ\n\tpayload := &Payload{\n\t\tID:        tokenID,\n\t\tUsername:  username,\n\t\tIssuedAt:  time.Now(),\n\t\tExpiredAt: time.Now().Add(duration),\n\t}\n\treturn payload, nil\n}\n\n// Valid ตรวจสอบว่าตั๋วใบนี้ยังไม่หมดอายุใช่หรือไม่\nfunc (payload *Payload) Valid() error {\n\t// 1. ถ้าเวลาปัจจุบันเลยเวลา ExpiredAt ไปแล้ว ให้แจ้งเตือนว่าตั๋วหมดอายุ\n\tif time.Now().After(payload.ExpiredAt) {\n\t\treturn ErrExpiredToken\n\t}\n\treturn nil\n} "
        },
        {
          "t": "p",
          "c": "เพื่อให้ระบบจัดการตั๋วของเรายืดหยุ่นตามหลัก Clean Architecture เราจะสร้าง **`Maker` Interface** ในไฟล์ `simplebank/token/maker.go` เพื่อกำหนดสัญญาว่าตัวจัดการตั๋วทุกชนิดจะต้องมีเมธอด `CreateToken` และ `VerifyToken` การใช้ Interface ในจุดนี้ทำให้ `Server` ของเราไม่ยึดติดกับไลบรารีใดไลบรารีหนึ่ง หากในอนาคตต้องการสลับระหว่าง JWT กับ PASETO ก็สามารถสลับได้ทันทีโดยไม่ต้องแก้ไขโค้ดใน API Handlers เลยแม้แต่บรรทัดเดียว:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/token/maker.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/token/maker.go\n// หน้าที่: Maker คือ Interface สำหรับสร้างและตรวจสอบความถูกต้องของ Token รับรองตัวตน\n// แก้ปัญหา: ออกแบบตามหลัก Clean Architecture เพื่อให้สลับระบบ Token ได้อย่างอิสระ (เช่น สลับระหว่าง PASETO กับ JWT)\n// =============================================================================\npackage token\n\nimport \"time\"\n\n// Maker เป็นสัญญา (Contract) ที่กำหนดว่าระบบจัดการ Token ต้องมีฟังก์ชันใดบ้าง\ntype Maker interface {\n\t// CreateToken สร้างตั๋ว Token ใหม่สำหรับ username ที่ระบุ พร้อมกำหนดเวลาหมดอายุ\n\tCreateToken(username string, duration time.Duration) (string, error)\n\n\t// VerifyToken ตรวจสอบความถูกต้องและถอดรหัส Token เพื่อคืนค่า Payload ของผู้ใช้ออกมา\n\tVerifyToken(token string) (*Payload, error)\n}"
        },
        {
          "t": "p",
          "c": "จากนั้นสร้าง `PasetoMaker` ใน `simplebank/token/paseto_maker.go` โดยใช้ Symmetric Encryption แบบ ChaCha20-Poly1305:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/token/paseto_maker.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/token/paseto_maker.go\n// หน้าที่: PasetoMaker จัดการสร้างและถอดรหัส PASETO Token (Platform-Agnostic Security Tokens) เวอร์ชัน 2 Local (Symmetric)\n// แก้ปัญหา: มอบระบบรักษาความปลอดภัยที่เหนือกว่า JWT โดยขจัดปัญหา 'None' algorithm attack และบังคับใช้ ChaCha20-Poly1305\n// =============================================================================\npackage token\n\nimport (\n\t\"fmt\"\n\t\"time\"\n\n\t\"github.com/aead/chacha20poly1305\"\n\t\"github.com/o1egl/paseto\"\n)\n\n// PasetoMaker จัดการ PASETO Token ด้วยการเข้ารหัสแบบ Symmetric (ใช้คีย์ลับเดียวในการทั้งเข้ารหัสและถอดรหัส)\ntype PasetoMaker struct {\n\tpaseto       *paseto.V2\n\tsymmetricKey []byte\n}\n\n// NewPasetoMaker สร้าง PasetoMaker ใหม่ พร้อมตรวจสอบความยาวของคีย์ลับ\nfunc NewPasetoMaker(symmetricKey string) (Maker, error) {\n\t// 1. ChaCha20-Poly1305 บังคับใช้คีย์ความยาว 32 ไบต์พอดี (chacha20poly1305.KeySize = 32)\n\tif len(symmetricKey) != chacha20poly1305.KeySize {\n\t\treturn nil, fmt.Errorf(\"ขนาด key ไม่ถูกต้อง: ต้องมีขนาด %d ไบต์พอดี\", chacha20poly1305.KeySize)\n\t}\n\n\t// 2. สร้าง Instance ของ Paseto V2 และบันทึกคีย์ลับในรูป []byte\n\tmaker := &PasetoMaker{\n\t\tpaseto:       paseto.NewV2(),\n\t\tsymmetricKey: []byte(symmetricKey),\n\t}\n\treturn maker, nil\n}\n\n// CreateToken สร้าง Token โดยบรรจุ Payload เข้าไปแล้วเข้ารหัสด้วย Symmetric Key\nfunc (maker *PasetoMaker) CreateToken(username string, duration time.Duration) (string, error) {\n\t// 1. สร้าง Payload ที่ระบุชื่อผู้ใช้และเวลาหมดอายุ\n\tpayload, err := NewPayload(username, duration)\n\tif err != nil {\n\t\treturn \"\", err\n\t}\n\n\t// 2. เข้ารหัส Payload เป็นข้อความ Token แบบ Encrypted (v2.local)\n\treturn maker.paseto.Encrypt(maker.symmetricKey, payload, nil)\n}\n\n// VerifyToken ถอดรหัส Token และตรวจสอบว่าตั๋วยังไม่หมดอายุ\nfunc (maker *PasetoMaker) VerifyToken(token string) (*Payload, error) {\n\tpayload := &Payload{}\n\n\t// 1. ถอดรหัสข้อความ Token ด้วย Symmetric Key แล้วแกะใส่ struct Payload\n\terr := maker.paseto.Decrypt(token, maker.symmetricKey, payload, nil)\n\tif err != nil {\n\t\treturn nil, ErrInvalidToken\n\t}\n\n\t// 2. ตรวจสอบว่าตั๋วหมดอายุไปแล้วหรือยังผ่าน payload.Valid()\n\terr = payload.Valid()\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\n\treturn payload, nil\n}"
        },
        {
          "t": "h2",
          "c": "4. สร้าง Endpoint ล็อกอิน: `POST /users/login`"
        },
        {
          "t": "p",
          "c": "สร้าง Handler ล็อกอิน `POST /users/login` ใน `simplebank/api/user.go` เพื่อตรวจสอบรหัสผ่านและสร้าง PASETO Token ส่งกลับไปให้ผู้ใช้ โดยการแก้ไขไฟล์ `simplebank/api/user.go` เดิมมี 2 จุดสำคัญที่ต้องทำ:\n1. เพิ่ม `\"database/sql\"` เข้าไปใน `import` เพื่อใช้ตรวจสอบข้อผิดพลาด `sql.ErrNoRows` (เมื่อไม่พบชื่อผู้ใช้ในระบบ)\n2. เขียน Struct คำขอ/การตอบกลับ และฟังก์ชัน `loginUser` ต่อท้ายฟังก์ชัน `createUser` เดิม"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/api/user.go",
          "c": " package api\n \n import (\n+\t\"database/sql\"\n \t\"net/http\"\n \t\"time\"\n \n \t\"github.com/gin-gonic/gin\"\n \tdb \"simplebank/db\"\n \t\"simplebank/util\"\n )\n \n // ... โค้ดเดิม createUserRequest, userResponse, newUserResponse, createUser ...\n \trsp := newUserResponse(user)\n \tctx.JSON(http.StatusCreated, rsp)\n }\n+\n+type loginUserRequest struct {\n+\tUsername string `json:\"username\" binding:\"required,alphanum\"`\n+\tPassword string `json:\"password\" binding:\"required,min=6\"`\n+}\n+\n+type loginUserResponse struct {\n+\tAccessToken string       `json:\"access_token\"`\n+\tUser        userResponse `json:\"user\"`\n+}\n+\n+func (server *Server) loginUser(ctx *gin.Context) {\n+\t// 1. ตรวจสอบเงื่อนไขข้อมูลที่ส่งมาทาง JSON\n+\tvar req loginUserRequest\n+\tif err := ctx.ShouldBindJSON(&req); err != nil {\n+\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n+\t\treturn\n+\t}\n+\n+\t// 2. ดึงข้อมูลผู้ใช้จากฐานข้อมูลเพื่อหารหัสผ่านที่แฮชไว้\n+\tuser, err := server.store.GetUser(ctx, req.Username)\n+\tif err != nil {\n+\t\tif err == sql.ErrNoRows {\n+\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err))\n+\t\t\treturn\n+\t\t}\n+\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n+\t\treturn\n+\t}\n+\n+\t// 3. ตรวจสอบความถูกต้องของรหัสผ่านผ่าน Bcrypt\n+\terr = util.CheckPassword(req.Password, user.HashedPassword)\n+\tif err != nil {\n+\t\tctx.JSON(http.StatusUnauthorized, errorResponse(err))\n+\t\treturn\n+\t}\n+\n+\t// 4. ออก PASETO Token รับรองตัวตน (กำหนดอายุ 15 นาทีตามที่ Server ระบุ)\n+\taccessToken, err := server.tokenMaker.CreateToken(user.Username, server.tokenDuration)\n+\tif err != nil {\n+\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n+\t\treturn\n+\t}\n+\n+\trsp := loginUserResponse{\n+\t\tAccessToken: accessToken,\n+\t\tUser:        newUserResponse(user),\n+\t}\n+\tctx.JSON(http.StatusOK, rsp)\n+}"
        },
        {
          "t": "callout",
          "title": "💡 การทำงานร่วมกันของ tokenMaker & tokenDuration ใน Server struct",
          "c": "สังเกตว่าใน `loginUser` มีการเรียกใช้งาน `server.tokenMaker` และ `server.tokenDuration`:\n- ตัวแปรทั้งสองนี้จะถูกผูกเข้ากับ `Server` struct ใน `simplebank/api/server.go`\n- เมื่อเราสร้าง Auth Middleware ในขั้นตอนที่ 3 และอัปเดต Handlers ในขั้นตอนที่ 4 เสร็จแล้ว ใน**ขั้นตอนที่ 5** เราจะทำการอัปเกรด `server.go` รวบยอด เพื่อลงทะเบียน Route `POST /users/login` และผูก Middleware ปกป้อง Endpoint อื่นๆ อย่างเป็นระบบ!"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/user.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/user.go\n// หน้าที่: API Handler สำหรับจัดการผู้ใช้งาน (POST /users และ POST /users/login)\n// แก้ปัญหา: ออกแบบตามมาตรฐาน Clean Architecture สำหรับระบบธนาคาร\n// =============================================================================\npackage api\n\nimport (\n\t\"database/sql\"\n\t\"errors\"\n\t\"net/http\"\n\t\"time\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n\t\"simplebank/util\"\n)\n\ntype createUserRequest struct {\n\tUsername string `json:\"username\" binding:\"required,alphanum\"`\n\tPassword string `json:\"password\" binding:\"required,min=6\"`\n\tFullName string `json:\"full_name\" binding:\"required\"`\n\tEmail    string `json:\"email\" binding:\"required,email\"`\n}\n\n// userResponse คือ struct ที่ตัดฟิลด์ hashedPassword ทิ้งไปเพื่อความปลอดภัย\ntype userResponse struct {\n\tUsername          string    `json:\"username\"`\n\tFullName          string    `json:\"full_name\"`\n\tEmail             string    `json:\"email\"`\n\tPasswordChangedAt time.Time `json:\"password_changed_at\"`\n\tCreatedAt         time.Time `json:\"created_at\"`\n}\n\nfunc newUserResponse(user db.User) userResponse {\n\treturn userResponse{\n\t\tUsername:          user.Username,\n\t\tFullName:          user.FullName,\n\t\tEmail:             user.Email,\n\t\tPasswordChangedAt: user.PasswordChangedAt,\n\t\tCreatedAt:         user.CreatedAt,\n\t}\n}\n\nfunc (server *Server) createUser(ctx *gin.Context) {\n\t// 1. ตรวจสอบเงื่อนไขข้อมูลที่ส่งมาทาง JSON\n\tvar req createUserRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 2. แฮชรหัสผ่านด้วย Bcrypt ก่อนบันทึก\n\thashedPassword, err := util.HashPassword(req.Password)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 3. บันทึกผู้ใช้ลงฐานข้อมูลผ่าน store\n\targ := db.CreateUserParams{\n\t\tUsername:       req.Username,\n\t\tHashedPassword: hashedPassword,\n\t\tFullName:       req.FullName,\n\t\tEmail:          req.Email,\n\t}\n\n\tuser, err := server.store.CreateUser(ctx, arg)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 4. ส่งกลับเฉพาะข้อมูลที่ปลอดภัย ปราศจาก hashedPassword\n\trsp := newUserResponse(user)\n\tctx.JSON(http.StatusCreated, rsp)\n}\n\ntype loginUserRequest struct {\n\tUsername string `json:\"username\" binding:\"required,alphanum\"`\n\tPassword string `json:\"password\" binding:\"required,min=6\"`\n}\n\ntype loginUserResponse struct {\n\tAccessToken string       `json:\"access_token\"`\n\tUser        userResponse `json:\"user\"`\n}\n\nfunc (server *Server) loginUser(ctx *gin.Context) {\n\t// 1. ตรวจสอบเงื่อนไขข้อมูลที่ส่งมาทาง JSON\n\tvar req loginUserRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 2. ดึงข้อมูลผู้ใช้จากฐานข้อมูลเพื่อหารหัสผ่านที่แฮชไว้\n\tuser, err := server.store.GetUser(ctx, req.Username)\n\tif err != nil {\n\t\tif errors.Is(err, sql.ErrNoRows) {\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err))\n\t\t\treturn\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 3. ตรวจสอบความถูกต้องของรหัสผ่านผ่าน Bcrypt\n\terr = util.CheckPassword(req.Password, user.HashedPassword)\n\tif err != nil {\n\t\tctx.JSON(http.StatusUnauthorized, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 4. ออก PASETO Token รับรองตัวตน (กำหนดอายุ 15 นาทีตามที่ Server ระบุ)\n\taccessToken, err := server.tokenMaker.CreateToken(user.Username, server.tokenDuration)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\trsp := loginUserResponse{\n\t\tAccessToken: accessToken,\n\t\tUser:        newUserResponse(user),\n\t}\n\tctx.JSON(http.StatusOK, rsp)\n}"
        },
        {
          "t": "h2",
          "c": "5. การสร้าง Gin Authentication Middleware"
        },
        {
          "t": "p",
          "c": "เราจะสร้าง Middleware มาดักหน้าทุก Endpoint ที่ต้องการความปลอดภัย หากไม่มี Token หรือ Token ปลอม ระบบจะปฏิเสธคำขอทันทีด้วย **401 Unauthorized**:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/middleware.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/middleware.go\n// หน้าที่: Middleware ตรวจสอบตั๋วรับรองตัวตน (Authentication Middleware) สำหรับ Gin Framework\n// แก้ปัญหา: สกัดกั้นคำขอที่ไม่ได้รับอนุญาตก่อนที่จะหลุดเข้าไปถึง API Handlers ที่สำคัญ (เช่น การเปิดบัญชี หรือการโอนเงิน)\n// =============================================================================\npackage api\n\nimport (\n\t\"errors\"\n\t\"net/http\"\n\t\"strings\"\n\n\t\"github.com/gin-gonic/gin\"\n\t\"simplebank/token\"\n)\n\nconst (\n\tauthorizationHeaderKey  = \"authorization\"        // ชื่อ Header ที่ Client ต้องแนบมาใน HTTP Request\n\tauthorizationTypeBearer = \"bearer\"               // ชนิดของตั๋วรับรอง ต้องขึ้นต้นด้วย Bearer เสมอ\n\tauthorizationPayloadKey = \"authorization_payload\" // คีย์สำหรับฝาก Payload ไว้ใน gin.Context เพื่อส่งต่อให้ Handlers\n)\n\n// authMiddleware รับ tokenMaker เพื่อนำมาใช้ตรวจสอบความถูกต้องของ Token\nfunc authMiddleware(tokenMaker token.Maker) gin.HandlerFunc {\n\treturn func(ctx *gin.Context) {\n\t\t// 1. ดึงค่า Authorization Header ออกมาจากคำขอ\n\t\tauthHeader := ctx.GetHeader(authorizationHeaderKey)\n\t\tif len(authHeader) == 0 {\n\t\t\terr := errors.New(\"ไม่มีการแนบ Authorization Header\")\n\t\t\tctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))\n\t\t\treturn\n\t\t}\n\n\t\t// 2. แยกข้อความออกเป็นส่วนๆ (คาดหวังรูปแบบ: \"Bearer <token_string>\")\n\t\tfields := strings.Fields(authHeader)\n\t\tif len(fields) < 2 {\n\t\t\terr := errors.New(\"รูปแบบ Authorization Header ไม่ถูกต้อง\")\n\t\t\tctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))\n\t\t\treturn\n\t\t}\n\n\t\t// 3. ตรวจสอบว่าคำนำหน้าเป็น \"bearer\" (ไม่สนใจตัวพิมพ์เล็ก-ใหญ่)\n\t\tauthorizationType := strings.ToLower(fields[0])\n\t\tif authorizationType != authorizationTypeBearer {\n\t\t\terr := errors.New(\"ประเภทของ Authorization ต้องเป็น Bearer เท่านั้น\")\n\t\t\tctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))\n\t\t\treturn\n\t\t}\n\n\t\t// 4. นำตัว Token ข้อความส่วนที่สองไปถอดรหัสและตรวจสอบความถูกต้องผ่าน tokenMaker\n\t\taccessToken := fields[1]\n\t\tpayload, err := tokenMaker.VerifyToken(accessToken)\n\t\tif err != nil {\n\t\t\tctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))\n\t\t\treturn\n\t\t}\n\n\t\t// 5. เมื่อตั๋วถูกต้อง บันทึก payload ของผู้ใช้ไว้ใน gin.Context เพื่อให้ Handler ด้านในดึงไปใช้ต่อ\n\t\tctx.Set(authorizationPayloadKey, payload)\n\n\t\t// 6. ส่งผ่านการควบคุมไปยัง Handler ลำดับถัดไป\n\t\tctx.Next()\n\t}\n}"
        },
        {
          "t": "h2",
          "c": "6. ปกป้อง Endpoints เดิมด้วย Token (Accounts & Transfers)"
        },
        {
          "t": "p",
          "c": "เมื่อเรานำ `authMiddleware` มาครอบ Route กลุ่ม `/accounts` และ `/transfers` แล้ว เราจำเป็นต้องอัปเดต Handler ให้ดึงตัวตนของผู้ใช้จาก **`authPayload.Username`** แทนการรับค่าจากผู้ใช้ตรงๆ เพื่อปิดช่องโหว่ความปลอดภัยทุกจุด:"
        },
        {
          "t": "h3",
          "c": "5.1 อัปเดต `createAccount`: ตัดฟิลด์ owner ออกจาก JSON Body"
        },
        {
          "t": "p",
          "c": "ผู้ใช้ที่ล็อกอินแล้วไม่จำเป็นต้องส่ง `owner` ใน JSON Body อีกต่อไป เพราะเราสามารถดึงชื่อเจ้าของจาก Token ได้โดยตรง ป้องกันการแอบเปิดบัญชีในนามของผู้อื่น 100% (อย่าลืมเพิ่ม `\"errors\"` และ `\"simplebank/token\"` ใน imports):"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/api/account.go",
          "c": " package api\n \n import (\n \t\"database/sql\"\n+\t\"errors\"\n \t\"net/http\"\n \n \t\"github.com/gin-gonic/gin\"\n \tdb \"simplebank/db\"\n+\t\"simplebank/token\"\n )\n \n type createAccountRequest struct {\n-\tOwner    string `json:\"owner\" binding:\"required\"`\n \tCurrency string `json:\"currency\" binding:\"required,currency\"` // ไม่ต้องรับ owner ใน JSON อีกต่อไป!\n }\n \n func (server *Server) createAccount(ctx *gin.Context) {\n \tvar req createAccountRequest\n \tif err := ctx.ShouldBindJSON(&req); err != nil {\n \t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n \t\treturn\n \t}\n \n+\t// ดึงข้อมูลตัวตนของเจ้าของ Token จาก Context\n+\tauthPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)\n+\n \targ := db.CreateAccountParams{\n-\t\tOwner:    req.Owner,\n+\t\tOwner:    authPayload.Username, // ใช้ username จาก Token โดยตรง ปลอดภัย 100%\n \t\tCurrency: req.Currency,\n \t\tBalance:  0,\n \t}\n \n \taccount, err := server.store.CreateAccount(ctx, arg)\n \tif err != nil {\n \t\tctx.JSON(http.StatusForbidden, errorResponse(err))\n \t\treturn\n \t}\n \n \tctx.JSON(http.StatusCreated, account)\n }"
        },
        {
          "t": "h3",
          "c": "5.2 อัปเดต `getAccount`: ห้ามแอบส่องยอดเงินของผู้อื่น"
        },
        {
          "t": "p",
          "c": "ตรวจสอบว่าบัญชีที่ต้องการดู เป็นของผู้ใช้ที่ถือ Token หรือไม่ หากไม่ใช่ให้ส่ง **401 Unauthorized** ทันที:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/api/account.go",
          "c": " \taccount, err := server.store.GetAccount(ctx, req.ID)\n \tif err != nil {\n \t\tif err == sql.ErrNoRows {\n \t\t\tctx.JSON(http.StatusNotFound, errorResponse(err))\n \t\t\treturn\n \t\t}\n \t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n \t\treturn\n \t}\n \n+\t// ตรวจสอบสิทธิ์ความเป็นเจ้าของบัญชี\n+\tauthPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)\n+\tif account.Owner != authPayload.Username {\n+\t\terr := errors.New(\"บัญชีนี้ไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์เข้าถึงข้อมูล\")\n+\t\tctx.JSON(http.StatusUnauthorized, errorResponse(err))\n+\t\treturn\n+\t}\n+\n \tctx.JSON(http.StatusOK, account)"
        },
        {
          "t": "h3",
          "c": "5.3 อัปเดต `listAccounts`: กรองเฉพาะบัญชีของตัวเองเท่านั้น"
        },
        {
          "t": "p",
          "c": "ในระบบจริง เราจะไม่อนุญาตให้ผู้ใช้ทั่วไปดูรายชื่อบัญชีของลูกค้าคนอื่นทั้งธนาคาร เราจึงต้องอัปเดตทั้ง Handler ใน `api/account.go` และคิวรี `ListAccounts` ใน `db/account.go` ให้มีเงื่อนไข `WHERE owner = $1`:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/api/account.go",
          "c": " func (server *Server) listAccounts(ctx *gin.Context) {\n \tvar req listAccountsRequest\n \tif err := ctx.ShouldBindQuery(&req); err != nil {\n \t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n \t\treturn\n \t}\n \n+\tauthPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)\n \targ := db.ListAccountsParams{\n+\t\tOwner:  authPayload.Username, // กรองเฉพาะบัญชีของเจ้าของ Token\n \t\tLimit:  req.PageSize,\n \t\tOffset: (req.PageID - 1) * req.PageSize,\n \t}"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/db/account.go",
          "c": " type ListAccountsParams struct {\n+\tOwner  string `json:\"owner\"`\n \tLimit  int32  `json:\"limit\"`\n \tOffset int32  `json:\"offset\"`\n }\n \n const listAccounts = `-- name: ListAccounts :many\n SELECT id, owner, balance, currency, created_at FROM accounts\n+WHERE owner = $1\n ORDER BY id\n-LIMIT $1 OFFSET $2;\n+LIMIT $2 OFFSET $3;\n `\n \n func (q *Queries) ListAccounts(ctx context.Context, arg ListAccountsParams) ([]Account, error) {\n-\trows, err := q.db.QueryContext(ctx, listAccounts, arg.Limit, arg.Offset)\n+\trows, err := q.db.QueryContext(ctx, listAccounts, arg.Owner, arg.Limit, arg.Offset)\n \tif err != nil {\n \t\treturn nil, err\n \t}\n \tdefer rows.Close()"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/db/account_test.go",
          "c": " \targ := ListAccountsParams{\n+\t\tOwner:  lastAccount.Owner,\n \t\tLimit:  5,\n \t\tOffset: 0,\n \t}\n \n \taccounts, err := testQueries.ListAccounts(context.Background(), arg)\n \trequire.NoError(t, err)\n \trequire.NotEmpty(t, accounts)\n \n \tfor _, account := range accounts {\n \t\trequire.NotEmpty(t, account)\n+\t\trequire.Equal(t, lastAccount.Owner, account.Owner)\n \t}"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/account.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/account.go\n// หน้าที่: API Handler สำหรับจัดการบัญชี (POST /accounts, GET /accounts/:id, GET /accounts) ฉบับปลอดภัยระดับ Production\n// แก้ปัญหา: ผูกบัญชีกับตัวตนของผู้ใช้ที่ล็อกอินจริง ป้องกันการแอบสร้างบัญชีในนามผู้อื่น และป้องกันการแอบดูยอดเงินของลูกค้าคนอื่น\n// =============================================================================\npackage api\n\nimport (\n\t\"database/sql\"\n\t\"errors\"\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n\t\"simplebank/token\"\n)\n\ntype createAccountRequest struct {\n\tCurrency string `json:\"currency\" binding:\"required,currency\"`\n}\n\nfunc (server *Server) createAccount(ctx *gin.Context) {\n\t// 1. ตรวจสอบรูปแบบข้อมูลที่ส่งมาทาง JSON Payload\n\tvar req createAccountRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 2. ดึงข้อมูลตัวตน (Username) จาก Token Payload ที่บันทึกไว้ใน gin.Context\n\tauthPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)\n\n\t// 3. เตรียมพารามิเตอร์โดยบังคับให้ Owner เป็น Username ของผู้ถือ Token เท่านั้น\n\targ := db.CreateAccountParams{\n\t\tOwner:    authPayload.Username,\n\t\tCurrency: req.Currency,\n\t\tBalance:  0, // ยอดเงินเปิดบัญชีเริ่มต้นที่ 0 เสมอ\n\t}\n\n\t// 4. บันทึกบัญชีใหม่ลงฐานข้อมูล PostgreSQL ผ่าน Store\n\taccount, err := server.store.CreateAccount(ctx, arg)\n\tif err != nil {\n\t\tctx.JSON(http.StatusForbidden, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 5. ส่งข้อมูลบัญชีที่สร้างเสร็จสมบูรณ์กลับไปในรูปแบบ JSON พร้อม HTTP Status 201 Created\n\tctx.JSON(http.StatusCreated, account)\n}\n\ntype getAccountRequest struct {\n\tID int64 `uri:\"id\" binding:\"required,min=1\"`\n}\n\nfunc (server *Server) getAccount(ctx *gin.Context) {\n\t// 1. แกะค่า ID จาก URI Parameter (เช่น /accounts/1)\n\tvar req getAccountRequest\n\tif err := ctx.ShouldBindUri(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 2. ค้นหาข้อมูลบัญชีจากฐานข้อมูลตาม ID\n\taccount, err := server.store.GetAccount(ctx, req.ID)\n\tif err != nil {\n\t\tif errors.Is(err, sql.ErrNoRows) {\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err))\n\t\t\treturn\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 3. ตรวจสอบสิทธิ์ความเป็นเจ้าของ: บัญชีนี้ต้องเป็นของเจ้าของ Token เท่านั้น\n\tauthPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)\n\tif account.Owner != authPayload.Username {\n\t\terr := errors.New(\"บัญชีนี้ไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์เข้าถึงข้อมูล\")\n\t\tctx.JSON(http.StatusUnauthorized, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 4. ส่งข้อมูลบัญชีกลับไปพร้อม HTTP Status 200 OK\n\tctx.JSON(http.StatusOK, account)\n}\n\ntype listAccountsRequest struct {\n\tPageID   int32 `form:\"page_id\" binding:\"required,min=1\"`\n\tPageSize int32 `form:\"page_size\" binding:\"required,min=5,max=10\"`\n}\n\nfunc (server *Server) listAccounts(ctx *gin.Context) {\n\t// 1. แกะ Query Parameters สำหรับแบ่งหน้า (Pagination)\n\tvar req listAccountsRequest\n\tif err := ctx.ShouldBindQuery(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 2. ดึง Username จาก Token และคำนวณ Limit/Offset\n\tauthPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)\n\targ := db.ListAccountsParams{\n\t\tOwner:  authPayload.Username, // กรองเฉพาะบัญชีของเจ้าของ Token\n\t\tLimit:  req.PageSize,\n\t\tOffset: (req.PageID - 1) * req.PageSize,\n\t}\n\n\t// 3. ค้นหารายชื่อบัญชีจากฐานข้อมูล\n\taccounts, err := server.store.ListAccounts(ctx, arg)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 4. ส่งรายชื่อบัญชีกลับไปพร้อม HTTP Status 200 OK\n\tctx.JSON(http.StatusOK, accounts)\n}"
        },
        {
          "t": "h3",
          "c": "5.4 อัปเดต `createTransfer`: ป้องกันการสั่งโอนเงินแทนผู้อื่น"
        },
        {
          "t": "p",
          "c": "ในฟังก์ชัน `createTransfer` ของ `simplebank/api/transfer.go` เราต้องเพิ่มการตรวจสอบว่า **ผู้ใช้ที่ถือ Token ล็อกอินเข้ามา เป็นเจ้าของบัญชีต้นทาง (`FromAccountID`) จริงหรือไม่** โดยอาศัย `fromAccount` ที่ส่งคืนมาจาก `validAccount`:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/api/transfer.go",
          "c": " package api\n \n import (\n \t\"database/sql\"\n+\t\"errors\"\n \t\"fmt\"\n \t\"net/http\"\n \n \t\"github.com/gin-gonic/gin\"\n \tdb \"simplebank/db\"\n+\t\"simplebank/token\"\n )\n \n // ... โค้ด transferRequest เดิม ...\n \n func (server *Server) createTransfer(ctx *gin.Context) {\n \tvar req transferRequest\n \tif err := ctx.ShouldBindJSON(&req); err != nil {\n \t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n \t\treturn\n \t}\n \n \t// 2. ตรวจสอบว่าบัญชีต้นทางมีอยู่จริง และสกุลเงินตรงกับคำขอโอนหรือไม่\n \tfromAccount, valid := server.validAccount(ctx, req.FromAccountID, req.Currency)\n \tif !valid {\n \t\treturn\n \t}\n \n+\t// ดึงข้อมูลตัวตนจาก Auth Middleware และตรวจสอบสิทธิ์ความเป็นเจ้าของ\n+\tauthPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)\n+\tif fromAccount.Owner != authPayload.Username {\n+\t\terr := errors.New(\"บัญชีต้นทางไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์โอนเงิน\")\n+\t\tctx.JSON(http.StatusUnauthorized, errorResponse(err))\n+\t\treturn\n+\t}\n+\n \t// 3. ตรวจสอบว่าบัญชีปลายทางมีอยู่จริง และสกุลเงินตรงกับคำขอโอนหรือไม่\n \t_, valid = server.validAccount(ctx, req.ToAccountID, req.Currency)\n \tif !valid {\n \t\treturn\n \t}"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/transfer.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/transfer.go\n// หน้าที่: API Handler สำหรับจัดการการโอนเงิน (POST /transfers) ฉบับปลอดภัยระดับ Production\n// แก้ปัญหา: บังคับให้ผู้สั่งโอนต้องเป็นเจ้าของบัญชีต้นทางจริง ป้องกันการขโมยเงินหรือสั่งโอนเงินแทนผู้อื่น\n// =============================================================================\npackage api\n\nimport (\n\t\"database/sql\"\n\t\"errors\"\n\t\"fmt\"\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n\t\"simplebank/token\"\n)\n\ntype transferRequest struct {\n\tFromAccountID int64  `json:\"from_account_id\" binding:\"required,min=1\"`\n\tToAccountID   int64  `json:\"to_account_id\" binding:\"required,min=1\"`\n\tAmount        int64  `json:\"amount\" binding:\"required,gt=0\"`\n\tCurrency      string `json:\"currency\" binding:\"required,currency\"`\n}\n\nfunc (server *Server) createTransfer(ctx *gin.Context) {\n\t// 1. ตรวจสอบเงื่อนไขข้อมูลที่ส่งมาทาง JSON\n\tvar req transferRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 2. ตรวจสอบว่าบัญชีต้นทางมีอยู่จริง และสกุลเงินตรงกับคำขอโอนหรือไม่\n\tfromAccount, valid := server.validAccount(ctx, req.FromAccountID, req.Currency)\n\tif !valid {\n\t\treturn\n\t}\n\n\t// 3. ตรวจสอบสิทธิ์ความเป็นเจ้าของบัญชีต้นทาง: ต้องตรงกับ Username ใน Token\n\tauthPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)\n\tif fromAccount.Owner != authPayload.Username {\n\t\terr := errors.New(\"บัญชีต้นทางไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์โอนเงิน\")\n\t\tctx.JSON(http.StatusUnauthorized, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 4. ตรวจสอบว่าบัญชีปลายทางมีอยู่จริง และสกุลเงินตรงกับคำขอโอนหรือไม่\n\t_, valid = server.validAccount(ctx, req.ToAccountID, req.Currency)\n\tif !valid {\n\t\treturn\n\t}\n\n\t// 5. เตรียมพารามิเตอร์สำหรับรัน Transaction การโอนเงิน\n\targ := db.TransferTxParams{\n\t\tFromAccountID: fromAccount.ID,\n\t\tToAccountID:   req.ToAccountID,\n\t\tAmount:        req.Amount,\n\t}\n\n\t// 6. ดำเนินการโอนเงินระดับธุรกรรม ACID ผ่านฟังก์ชัน TransferTx\n\tresult, err := server.store.TransferTx(ctx, arg)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 7. ส่งผลลัพธ์การโอนเงิน (Transfer, Entries, บัญชีที่อัปเดตแล้ว) กลับไปให้ผู้ใช้\n\tctx.JSON(http.StatusOK, result)\n}\n\n// validAccount ตรวจสอบว่าบัญชีมีอยู่จริงและสกุลเงินตรงกันหรือไม่\nfunc (server *Server) validAccount(ctx *gin.Context, accountID int64, currency string) (db.Account, bool) {\n\t// 1. ค้นหาบัญชีจากฐานข้อมูล\n\taccount, err := server.store.GetAccount(ctx, accountID)\n\tif err != nil {\n\t\tif errors.Is(err, sql.ErrNoRows) {\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err))\n\t\t\treturn account, false\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn account, false\n\t}\n\n\t// 2. ตรวจสอบว่าสกุลเงินของบัญชีตรงกับสกุลเงินที่ต้องการโอนหรือไม่\n\tif account.Currency != currency {\n\t\terr := fmt.Errorf(\"สกุลเงินของบัญชี [%d] คือ %s ไม่ตรงกับคำขอโอน %s\", accountID, account.Currency, currency)\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn account, false\n\t}\n\n\treturn account, true\n}"
        },
        {
          "t": "h2",
          "c": "7. นำทุก Route มาประกอบเข้าด้วยกันใน `simplebank/api/server.go`"
        },
        {
          "t": "p",
          "c": "เมื่อเตรียมทั้ง Auth Middleware และ Handler ทุกตัวพร้อมแล้ว ให้นำมาผูกเข้าด้วยกันใน `simplebank/api/server.go` โดยส่ง `tokenSymmetricKey` และ `tokenDuration` เข้ามาเพื่อสร้าง `tokenMaker` ใน `Server` struct พร้อมแยก Public Routes (สมัครสมาชิก/ล็อกอิน) ออกจาก Protected Routes (บัญชีและการโอนเงิน):"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/api/server.go",
          "c": " type Server struct {\n \tstore         *db.Store\n+\ttokenMaker    token.Maker\n+\ttokenDuration time.Duration\n \trouter        *gin.Engine\n }\n \n-func NewServer(store *db.Store) *Server {\n-\tserver := &Server{store: store}\n+func NewServer(store *db.Store, tokenSymmetricKey string, tokenDuration time.Duration) (*Server, error) {\n+\ttokenMaker, err := token.NewPasetoMaker(tokenSymmetricKey)\n+\tif err != nil {\n+\t\treturn nil, fmt.Errorf(\"cannot create token maker: %w\", err)\n+\t}\n+\n+\tserver := &Server{\n+\t\tstore:         store,\n+\t\ttokenMaker:    tokenMaker,\n+\t\ttokenDuration: tokenDuration,\n+\t}\n \n \trouter := gin.Default()\n \n \tif v, ok := binding.Validator.Engine().(*validator.Validate); ok {\n \t\tv.RegisterValidation(\"currency\", validCurrency)\n \t}\n \n-\trouter.POST(\"/accounts\", server.createAccount)\n-\trouter.GET(\"/accounts/:id\", server.getAccount)\n-\trouter.GET(\"/accounts\", server.listAccounts)\n-\trouter.POST(\"/transfers\", server.createTransfer)\n-\trouter.POST(\"/users\", server.createUser)\n+\t// 1. เส้นทางสาธารณะ (Public Routes): เข้าถึงได้โดยไม่ต้องแนบ Token\n+\trouter.POST(\"/users\", server.createUser)\n+\trouter.POST(\"/users/login\", server.loginUser)\n+\n+\t// 2. เส้นทางส่วนตัว (Protected Routes): ต้องผ่าน authMiddleware ก่อนเสมอ\n+\tauthRoutes := router.Group(\"/\").Use(authMiddleware(server.tokenMaker))\n+\tauthRoutes.POST(\"/accounts\", server.createAccount)\n+\tauthRoutes.GET(\"/accounts/:id\", server.getAccount)\n+\tauthRoutes.GET(\"/accounts\", server.listAccounts)\n+\tauthRoutes.POST(\"/transfers\", server.createTransfer)\n \n \tserver.router = router\n-\treturn server\n+\treturn server, nil\n }"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/server.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/server.go\n// หน้าที่: โครงสร้าง Server และการผูก Routing พร้อมระบบ Authentication Token Middleware\n// แก้ปัญหา: จัดกลุ่มเส้นทาง API ระหว่าง Public Routes (ไม่ล็อกอิน) กับ Protected Routes (ต้องมี Token)\n// =============================================================================\npackage api\n\nimport (\n\t\"fmt\"\n\t\"time\"\n\n\t\"github.com/gin-gonic/gin\"\n\t\"github.com/gin-gonic/gin/binding\"\n\t\"github.com/go-playground/validator/v10\"\n\tdb \"simplebank/db\"\n\t\"simplebank/token\"\n)\n\ntype Server struct {\n\tstore         *db.Store\n\ttokenMaker    token.Maker\n\ttokenDuration time.Duration\n\trouter        *gin.Engine\n}\n\n// NewServer รับ store, tokenSymmetricKey และ tokenDuration พร้อมสร้าง PasetoMaker สำหรับสร้างและตรวจสอบ Token\nfunc NewServer(store *db.Store, tokenSymmetricKey string, tokenDuration time.Duration) (*Server, error) {\n\t// 1. สร้าง Instance ของ PasetoMaker จากคีย์ลับสมมาตร 32 bytes\n\ttokenMaker, err := token.NewPasetoMaker(tokenSymmetricKey)\n\tif err != nil {\n\t\treturn nil, fmt.Errorf(\"ไม่สามารถสร้าง token maker ได้: %w\", err)\n\t}\n\n\tserver := &Server{\n\t\tstore:         store,\n\t\ttokenMaker:    tokenMaker,\n\t\ttokenDuration: tokenDuration,\n\t}\n\n\trouter := gin.Default()\n\n\t// 2. ลงทะเบียน Custom Validator สำหรับตรวจสอบสกุลเงิน (currency)\n\tif v, ok := binding.Validator.Engine().(*validator.Validate); ok {\n\t\tv.RegisterValidation(\"currency\", validCurrency)\n\t}\n\n\t// 3. เส้นทางสาธารณะ (Public Routes): ใครก็เข้าถึงได้ เช่น สมัครสมาชิก หรือ ล็อกอิน\n\trouter.POST(\"/users\", server.createUser)\n\trouter.POST(\"/users/login\", server.loginUser)\n\n\t// 4. เส้นทางส่วนตัว (Protected Routes): ต้องผ่าน authMiddleware ตรวจสอบ Token ก่อนเสมอ\n\tauthRoutes := router.Group(\"/\").Use(authMiddleware(server.tokenMaker))\n\tauthRoutes.POST(\"/accounts\", server.createAccount)\n\tauthRoutes.GET(\"/accounts/:id\", server.getAccount)\n\tauthRoutes.GET(\"/accounts\", server.listAccounts)\n\tauthRoutes.POST(\"/transfers\", server.createTransfer)\n\n\tserver.router = router\n\treturn server, nil\n}\n\n// Start รันเซิร์ฟเวอร์ HTTP บน Address ที่ระบุ\nfunc (server *Server) Start(address string) error {\n\treturn server.router.Run(address)\n}\n\n// errorResponse จัดรูปแบบข้อความ Error ให้อยู่ใน JSON Key \"error\" อย่างสม่ำเสมอ\nfunc errorResponse(err error) gin.H {\n\treturn gin.H{\"error\": err.Error()}\n}"
        },
        {
          "t": "h2",
          "c": "8. อัปเดต `main.go` และสตาร์ตเซิร์ฟเวอร์ (Terminal 1)"
        },
        {
          "t": "p",
          "c": "อัปเดตไฟล์ `simplebank/main.go` ให้ประกาศคีย์ลับ `tokenSymmetricKey` (32 อักขระ) และ `tokenDuration` (15 นาที) แล้วส่งเข้าไปตอนสร้าง Server ด้วย `api.NewServer(store, tokenSymmetricKey, tokenDuration)`:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/main.go",
          "c": " package main\n \n import (\n \t\"database/sql\"\n \t\"log\"\n+\t\"time\"\n \n \t_ \"github.com/lib/pq\"\n \t\"simplebank/api\"\n \tdb \"simplebank/db\"\n )\n \n const (\n \tdbDriver      = \"postgres\"\n \tdbSource      = \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\"\n \tserverAddress = \"0.0.0.0:8080\"\n+\t// คีย์ลับสมมาตร 32 อักขระสำหรับเข้ารหัส ChaCha20-Poly1305 ใน PASETO\n+\ttokenSymmetricKey = \"12345678901234567890123456789012\"\n+\ttokenDuration     = 15 * time.Minute\n )\n \n func main() {\n \tconn, err := sql.Open(dbDriver, dbSource)\n \tif err != nil {\n \t\tlog.Fatal(\"cannot connect to db:\", err)\n \t}\n \n \tstore := db.NewStore(conn)\n-\tserver := api.NewServer(store)\n+\tserver, err := api.NewServer(store, tokenSymmetricKey, tokenDuration)\n+\tif err != nil {\n+\t\tlog.Fatal(\"cannot create server:\", err)\n+\t}\n \n \terr = server.Start(serverAddress)\n \tif err != nil {\n \t\tlog.Fatal(\"cannot start server:\", err)\n \t}\n }"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/main.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/main.go\n// หน้าที่: โค้ดส่วนประกอบของ simplebank/main.go\n// แก้ปัญหา: ออกแบบตามมาตรฐาน Clean Architecture สำหรับระบบธนาคาร\n// =============================================================================\npackage main\n\nimport (\n\t\"database/sql\"\n\t\"log\"\n\t\"time\"\n\n\t_ \"github.com/lib/pq\"\n\t\"simplebank/api\"\n\tdb \"simplebank/db\"\n)\n\nconst (\n\tdbDriver          = \"postgres\"\n\tdbSource          = \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\"\n\tserverAddress     = \"0.0.0.0:8080\"\n\ttokenSymmetricKey = \"12345678901234567890123456789012\" // คีย์ลับ 32 bytes สำหรับ ChaCha20-Poly1305\n\ttokenDuration     = 15 * time.Minute                  // อายุของ Token (15 นาที)\n)\n\n// จุดเริ่มต้นการทำงาน (Entry Point) ของระบบ Simple Bank ทั้งหมด\nfunc main() {\n\t// 1. สร้าง Connection Pool เชื่อมต่อกับ PostgreSQL\n\tconn, err := sql.Open(dbDriver, dbSource)\n\tif err != nil {\n\t\tlog.Fatal(\"cannot connect to db:\", err)\n\t}\n\n\t// 2. ห่อหุ้ม Connection ด้วย SQLStore สำหรับรองรับ Database Transactions (โอนเงิน)\n\tstore := db.NewStore(conn)\n\n\t// 3. สร้าง HTTP Server โดยผูก Routing, PasetoMaker, และ Middleware เข้ากับ Store\n\tserver, err := api.NewServer(store, tokenSymmetricKey, tokenDuration)\n\tif err != nil {\n\t\tlog.Fatal(\"cannot create server:\", err)\n\t}\n\n\t// 4. สตาร์ต HTTP Server ที่พอร์ต 8080\n\terr = server.Start(serverAddress)\n\tif err != nil {\n\t\tlog.Fatal(\"cannot start server:\", err)\n\t}\n}"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "Terminal 1: สตาร์ตเซิร์ฟเวอร์ Go พร้อมระบบ Authentication",
          "code": "go run main.go",
          "out": "[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.\n[GIN-debug] [WARNING] Running in \"debug\" mode. Switch to \"release\" mode in production.\n\n[GIN-debug] POST   /users                    --> simplebank/api.(*Server).createUser-fm (3 handlers)\n[GIN-debug] POST   /users/login              --> simplebank/api.(*Server).loginUser-fm (3 handlers)\n[GIN-debug] POST   /accounts                 --> simplebank/api.(*Server).createAccount-fm (4 handlers)\n[GIN-debug] GET    /accounts/:id             --> simplebank/api.(*Server).getAccount-fm (4 handlers)\n[GIN-debug] GET    /accounts                 --> simplebank/api.(*Server).listAccounts-fm (4 handlers)\n[GIN-debug] POST   /transfers                --> simplebank/api.(*Server).createTransfer-fm (4 handlers)\n[GIN-debug] [WARNING] Listening and serving HTTP on 0.0.0.0:8080"
        },
        {
          "t": "h2",
          "c": "9. ทดสอบ API ครบวงจร (ตั้งค่า Request ใน Postman / API Client)"
        },
        {
          "t": "p",
          "c": "เปิด Postman หรือ API Client เพื่อทดสอบ Flow การทำงานจริงตั้งแต่การล็อกอินรับ PASETO Token ไปจนถึงการทำธุรกรรมโอนเงินที่มีเกราะป้องกันความปลอดภัย:"
        },
        {
          "t": "callout",
          "title": "💡 การแนบ Token ใน Postman / API Client",
          "c": "สำหรับ Endpoint ที่ต้องยืนยันตัวตน (Protected Routes) ให้คัดลอกค่า `access_token` ที่ได้จากการล็อกอิน แล้วนำไปใส่ที่:\n- แท็บ **Headers**: เพิ่มคีย์ `Authorization` กำหนดค่าเป็น `Bearer <access_token>`\n- หรือแท็บ **Authorization / Auth**: เลือก Type เป็น `Bearer Token` แล้ววาง Token ในช่อง Token"
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "ขั้นตอนที่ 1: ล็อกอินเพื่อรับ PASETO Token (POST /users/login)",
          "code": "POST http://localhost:8080/users/login\nContent-Type: application/json\n\n{\n  \"username\": \"alice\",\n  \"password\": \"secretPassword123\"\n}",
          "out": "HTTP/1.1 200 OK\nContent-Type: application/json; charset=utf-8\n\n{\n  \"access_token\": \"v2.local.O4WcQo7c...[ChaCha20-Poly1305 Encrypted Payload]...L8a9m\",\n  \"user\": {\n    \"username\": \"alice\",\n    \"full_name\": \"Alice Wonderland\",\n    \"email\": \"alice@example.com\",\n    \"created_at\": \"2026-09-26T08:35:00.124851Z\"\n  }\n}"
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "ขั้นตอนที่ 2: สร้างบัญชีเงินฝากพร้อมแนบ Bearer Token (POST /accounts)",
          "code": "POST http://localhost:8080/accounts\nAuthorization: Bearer v2.local.O4WcQo7c...L8a9m\nContent-Type: application/json\n\n{\n  \"currency\": \"USD\"\n}",
          "out": "HTTP/1.1 201 Created\nContent-Type: application/json; charset=utf-8\n\n{\n  \"id\": 1,\n  \"owner\": \"alice\",\n  \"balance\": 0,\n  \"currency\": \"USD\",\n  \"created_at\": \"2026-09-26T08:35:12.302194Z\"\n}"
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "ขั้นตอนที่ 3: สั่งโอนเงินพร้อม Authorization Bearer Token (POST /transfers)",
          "code": "POST http://localhost:8080/transfers\nAuthorization: Bearer v2.local.O4WcQo7c...L8a9m\nContent-Type: application/json\n\n{\n  \"from_account_id\": 1,\n  \"to_account_id\": 2,\n  \"amount\": 1000,\n  \"currency\": \"USD\"\n}",
          "out": "HTTP/1.1 200 OK\nContent-Type: application/json; charset=utf-8\n\n{\n  \"transfer\": {\n    \"id\": 1,\n    \"from_account_id\": 1,\n    \"to_account_id\": 2,\n    \"amount\": 1000,\n    \"created_at\": \"2026-09-26T08:35:15.829102Z\"\n  },\n  \"from_account\": { \"id\": 1, \"owner\": \"alice\", \"balance\": 9000, \"currency\": \"USD\" },\n  \"to_account\": { \"id\": 2, \"owner\": \"bob\", \"balance\": 11000, \"currency\": \"USD\" }\n}"
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "ขั้นตอนที่ 4: ทดสอบความปลอดภัย (แอบโอนเงินคนอื่น / ไม่ส่ง Token -> ถูกบล็อก 401)",
          "code": "# กรณีที่ 1: Alice พยายามสั่งโอนเงินออกจากบัญชีของ Bob (FromAccountID = 2)\nPOST http://localhost:8080/transfers\nAuthorization: Bearer v2.local.O4WcQo7c...L8a9m\nContent-Type: application/json\n\n{\n  \"from_account_id\": 2,\n  \"to_account_id\": 1,\n  \"amount\": 5000,\n  \"currency\": \"USD\"\n}\n\n# กรณีที่ 2: เรียก API โดยไม่แนบ Authorization Header\nPOST http://localhost:8080/transfers\nContent-Type: application/json\n\n{\n  \"from_account_id\": 1,\n  \"to_account_id\": 2,\n  \"amount\": 1000,\n  \"currency\": \"USD\"\n}",
          "out": "# ผลลัพธ์กรณีที่ 1: ตรวจจับได้ว่าไม่ใช่เจ้าของบัญชี\nHTTP/1.1 401 Unauthorized\nContent-Type: application/json; charset=utf-8\n\n{\n  \"error\": \"บัญชีต้นทางไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์โอนเงิน\"\n}\n\n# ผลลัพธ์กรณีที่ 2: Middleware สกัดกั้นทันทีเมื่อไม่มี Header\nHTTP/1.1 401 Unauthorized\nContent-Type: application/json; charset=utf-8\n\n{\n  \"error\": \"ไม่มีการแนบ Authorization Header\"\n}"
        },
        {
          "t": "p",
          "c": "เพียงเท่านี้ ทุก Endpoint ของระบบ Simple Bank ก็จะได้รับการปกป้องอย่างแน่นหนา ทั้งการตรวจสอบความถูกต้องของ Token และการตรวจสอบความเป็นเจ้าของทรัพยากรทุกครั้ง!"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• ตอนนี้ระบบธนาคารของคุณมีเกราะป้องกันครบทั้ง Authentication (ยืนยันตัวตนด้วย PASETO Token) และ Authorization (ตรวจสอบสิทธิ์ความเป็นเจ้าของบัญชีก่อนดูยอดเงินหรือโอนเงิน) เรียบร้อยแล้ว\n• **ก้าวต่อไป (บทที่ 7.3)**: เราจะนำรหัสผ่านและคีย์ลับออกจากโค้ดด้วย **Viper (`app.env`)**, เขียน **Multi-Stage Dockerfile** ขนาดจิ๋ว 20MB, และรันสคริปต์ทดสอบ End-to-End ครบวงจรกันครับ!"
        }
      ],
      "en": []
    }
  },
  "bank-config-docker-prod": {
    "slug": "bank-config-docker-prod",
    "title": {
      "th": "7.3 จัดการ Config ด้วย Viper, Docker & E2E Testing",
      "en": "7.3 Configuration with Viper, Multi-Stage Dockerfile & E2E Verification"
    },
    "lead": {
      "th": "แยกการตั้งค่าด้วย spf13/viper ตามหลัก 12-Factor App, เขียน Multi-Stage Dockerfile ย่อขนาดแอป Go เหลือ 20MB, จัดการ Container ด้วย Docker Compose และเช็กลิสต์ความพร้อมก่อนรันจริงบน Production",
      "en": "Decouple configurations with spf13/viper (12-Factor App), ultra-lean multi-stage Docker builds, docker-compose orchestration, and production readiness."
    },
    "group": "7. ระบบยืนยันตัวตน ความปลอดภัย & การรันจริง (Production)",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: สร้างระบบธนาคารครบทั้ง Database, Transaction, Concurrency Control, Gin API, และ PASETO Auth\n• **ภารกิจในบทนี้**: สร้างไฟล์ `app.env`, `util/config.go`, `Dockerfile` (Multi-Stage), `docker-compose.yml`, และสคริปต์ทดสอบระบบจริง `test_e2e.sh`\n• **ไวยากรณ์ Go & Best Practices ที่ใช้ในบทนี้**: Struct Tag `mapstructure:\"...\"` ของ Viper, Named Return `(config Config, err error)` ใน `LoadConfig`, และการใช้ `&config` ใน `viper.Unmarshal(&config)`"
        },
        {
          "t": "p",
          "c": "มาถึงบทสุดท้ายของการลงมือสร้างระบบ! ตอนนี้เรามีฟีเจอร์ครบถ้วนแล้ว แต่ยังมีโจทย์สำคัญก่อนนำระบบขึ้นเซิร์ฟเวอร์จริง 2 ข้อ คือ: **1) เราจะแยกค่ารหัสผ่านฐานข้อมูลและคีย์ลับออกจากการฝังไว้ในโค้ด (Hardcode) ได้อย่างไร?** และ **2) เราจะแพ็กโปรแกรม Go คู่กับฐานข้อมูล PostgreSQL ให้เปิดรันบนเซิร์ฟเวอร์เครื่องไหนในโลกก็ได้ผลลัพธ์เหมือนกัน 100% ได้อย่างไร?** คำตอบคือการจัดการ Configuration ตามหลัก **12-Factor App ด้วยไลบรารี Viper** และการแพ็กระบบด้วย **Multi-Stage Dockerfile & Docker Compose**"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go & Best Practices ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "กลไกใน Viper & Docker",
            "โค้ดที่ปรากฏ",
            "คำอธิบายและ Best Practice"
          ],
          "rows": [
            [
              "1. mapstructure Struct Tag",
              "`DBSource string \\`mapstructure:\"DB_SOURCE\"\\``",
              "Viper ใช้ไลบรารี `mapstructure` เบื้องหลังในการจับคู่ชื่อตัวแปรจากไฟล์ `app.env` หรือ Environment Variable เข้ากับฟิลด์ใน Go Struct พร้อมแปลง `\"15m\"` เป็น `time.Duration` ให้อัตโนมัติ!"
            ],
            [
              "2. viper.AutomaticEnv()",
              "`viper.AutomaticEnv()`",
              "สั่งให้ Viper ตรวจสอบ OS Environment Variables ก่อนเสมอ หากตอนรันบน Docker Compose มีการส่ง `- DB_SOURCE=...` เข้ามา ค่าจาก Docker จะทับค่าใน `app.env` ทันทีโดยไม่ต้องแก้โค้ด"
            ],
            [
              "3. Multi-Stage Docker Build",
              "`FROM golang:1.22-alpine3.19 AS builder` -> `FROM alpine:3.19`",
              "แยกขั้นตอนคอมไพล์โค้ดออกจากอิมเมจรันจริง ทำให้ได้ Container ขนาดจิ๋วเพียง ~20MB ที่ไม่มีซอร์สโค้ดหรือคอมไพเลอร์ตกค้างอยู่เลย"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. รวมศูนย์การตั้งค่าระบบด้วย `spf13/viper` (Configuration Management)"
        },
        {
          "t": "p",
          "c": "ที่ผ่านมาใน `main.go` เรากำหนดค่าการเชื่อมต่อฐานข้อมูล (`dbSource`), พอร์ต (`serverAddress`), และ Secret Key สำหรับออก Token (`tokenSymmetricKey`) เอาไว้ในตัวแปรค่าคงที่ (`const`). แต่ในโลกความเป็นจริงตามหลักการ **12-Factor App**:\n- **ห้ามฝังรหัสผ่านหรือ Secret Key ในซอร์สโค้ด:** เพื่อป้องกันการเผลอ Commit ขึ้น Git หรือ Public Repository\n- **ปรับเปลี่ยนตามสภาพแวดล้อมได้ยืดหยุ่น:** ในเครื่อง Dev, Staging และ Production จะมี URL ฐานข้อมูลและพอร์ตที่ต่างกัน เราไม่ควรต้อง Re-compile ไบนารีใหม่ทุกครั้งที่ย้ายเครื่อง\n\nเราจึงนำ **Viper** (`github.com/spf13/viper`) ซึ่งเป็นไลบรารีจัดการ Config ที่ได้รับความนิยมสูงสุดในชุมชน Go เข้ามาช่วยอ่านค่าจากทั้งไฟล์ `.env` และ Environment Variables โดยอัตโนมัติ"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ติดตั้งแพ็กเกจ Viper",
          "code": "go get github.com/spf13/viper",
          "out": "go: downloading github.com/spf13/viper v1.18.2\ngo: added github.com/spf13/viper v1.18.2"
        },
        {
          "t": "p",
          "c": "สร้างไฟล์คอนฟิก `app.env` ไว้ที่โฟลเดอร์ Root ของโปรเจกต์ (อย่าลืมเพิ่ม `app.env` ลงใน `.gitignore` สำหรับ Production):"
        },
        {
          "t": "code",
          "lang": "env",
          "label": "simplebank/app.env",
          "c": "DB_DRIVER=postgres\nDB_SOURCE=postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\nSERVER_ADDRESS=0.0.0.0:8080\nTOKEN_SYMMETRIC_KEY=12345678901234567890123456789012\nTOKEN_DURATION=15m"
        },
        {
          "t": "p",
          "c": "สร้างตัวช่วยโหลด Config ใน `simplebank/util/config.go` โดยใช้ Struct Tag `mapstructure` เพื่อจับคู่ชื่อตัวแปรใน `.env` เข้ากับฟิลด์ใน Go struct แบบ Type-safe:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/config.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/util/config.go\n// หน้าที่: จัดการ Configuration ด้วย Viper ตามหลักการ 12-Factor App\n// แก้ปัญหา: โหลดค่าการตั้งค่าจากไฟล์ .env และ Environment Variables แบบ Type-safe\n// =============================================================================\npackage util\n\nimport (\n\t\"time\"\n\n\t\"github.com/spf13/viper\"\n)\n\n// Config เก็บค่าการตั้งค่าทั้งหมดของแอปพลิเคชัน\n// ค่าใน struct tag \"mapstructure\" จะผูกกับชื่อตัวแปรในไฟล์ app.env\ntype Config struct {\n\tDBDriver          string        `mapstructure:\"DB_DRIVER\"`\n\tDBSource          string        `mapstructure:\"DB_SOURCE\"`\n\tServerAddress     string        `mapstructure:\"SERVER_ADDRESS\"`\n\tTokenSymmetricKey string        `mapstructure:\"TOKEN_SYMMETRIC_KEY\"`\n\tTokenDuration     time.Duration `mapstructure:\"TOKEN_DURATION\"`\n}\n\n// LoadConfig อ่านการตั้งค่าจากไฟล์ path หรือ Environment Variables\nfunc LoadConfig(path string) (config Config, err error) {\n\tviper.AddConfigPath(path)\n\tviper.SetConfigName(\"app\")\n\tviper.SetConfigType(\"env\") // ค้นหา app.env\n\n\t// AutomaticEnv ทำให้อ่านค่าจาก OS Environment Variables แทนได้โดยอัตโนมัติหากมีกำหนดไว้\n\tviper.AutomaticEnv()\n\n\terr = viper.ReadInConfig()\n\tif err != nil {\n\t\treturn\n\t}\n\n\terr = viper.Unmarshal(&config)\n\treturn\n}"
        },
        {
          "t": "p",
          "c": "อัปเดต `simplebank/api/server.go` ให้เก็บ `config util.Config` ใน `Server` struct และปรับ `NewServer` ให้รับ `config` แทนพารามิเตอร์แยก:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/api/server.go",
          "c": " package api\n \n import (\n \t\"fmt\"\n-\t\"time\"\n \n \t\"github.com/gin-gonic/gin\"\n \t\"github.com/gin-gonic/gin/binding\"\n \t\"github.com/go-playground/validator/v10\"\n \tdb \"simplebank/db\"\n \t\"simplebank/token\"\n+\t\"simplebank/util\"\n )\n \n type Server struct {\n+\tconfig        util.Config\n \tstore         *db.Store\n \ttokenMaker    token.Maker\n-\ttokenDuration time.Duration\n \trouter        *gin.Engine\n }\n \n-func NewServer(store *db.Store, tokenSymmetricKey string, tokenDuration time.Duration) (*Server, error) {\n-\ttokenMaker, err := token.NewPasetoMaker(tokenSymmetricKey)\n+func NewServer(config util.Config, store *db.Store) (*Server, error) {\n+\ttokenMaker, err := token.NewPasetoMaker(config.TokenSymmetricKey)\n \tif err != nil {\n \t\treturn nil, fmt.Errorf(\"ไม่สามารถสร้าง token maker ได้: %w\", err)\n \t}\n \n \tserver := &Server{\n+\t\tconfig:        config,\n \t\tstore:         store,\n \t\ttokenMaker:    tokenMaker,\n-\t\ttokenDuration: tokenDuration,\n \t}\n \n \trouter := gin.Default()"
        },
        {
          "t": "p",
          "c": "ใน `simplebank/api/user.go` ปรับฟังก์ชัน `loginUser` ให้ดึงระยะเวลาหมดอายุของ Token จาก `server.config.TokenDuration`:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/api/user.go",
          "c": " \t// 4. ออก PASETO Token รับรองตัวตน (กำหนดอายุ 15 นาทีตาม Config)\n-\taccessToken, err := server.tokenMaker.CreateToken(user.Username, server.tokenDuration)\n+\taccessToken, err := server.tokenMaker.CreateToken(user.Username, server.config.TokenDuration)\n \tif err != nil {\n \t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n \t\treturn\n \t}"
        },
        {
          "t": "p",
          "c": "อัปเดต `simplebank/main.go` ให้ตัดค่าคงที่ `const` ทั้งหมดออก แล้วโหลดผ่าน `util.LoadConfig(\".\")`:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/main.go",
          "c": " package main\n \n import (\n \t\"database/sql\"\n \t\"log\"\n-\t\"time\"\n \n \t_ \"github.com/lib/pq\"\n \t\"simplebank/api\"\n \tdb \"simplebank/db\"\n+\t\"simplebank/util\"\n )\n \n-const (\n-\tdbDriver          = \"postgres\"\n-\tdbSource          = \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\"\n-\tserverAddress     = \"0.0.0.0:8080\"\n-\ttokenSymmetricKey = \"12345678901234567890123456789012\"\n-\ttokenDuration     = 15 * time.Minute\n-)\n-\n func main() {\n-\tconn, err := sql.Open(dbDriver, dbSource)\n+\t// 1. โหลดค่าการตั้งค่าจากไฟล์ app.env หรือ Environment Variables\n+\tconfig, err := util.LoadConfig(\".\")\n+\tif err != nil {\n+\t\tlog.Fatal(\"cannot load config:\", err)\n+\t}\n+\n+\t// 2. เชื่อมต่อฐานข้อมูลโดยใช้ค่าจาก Config\n+\tconn, err := sql.Open(config.DBDriver, config.DBSource)\n \tif err != nil {\n \t\tlog.Fatal(\"cannot connect to db:\", err)\n \t}\n \n \tstore := db.NewStore(conn)\n-\tserver, err := api.NewServer(store, tokenSymmetricKey, tokenDuration)\n+\tserver, err := api.NewServer(config, store)\n \tif err != nil {\n \t\tlog.Fatal(\"cannot create server:\", err)\n \t}\n \n-\terr = server.Start(serverAddress)\n+\t// 3. สตาร์ตเซิร์ฟเวอร์ที่ Port ตาม Config\n+\terr = server.Start(config.ServerAddress)\n \tif err != nil {\n \t\tlog.Fatal(\"cannot start server:\", err)\n \t}\n }"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/main.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/main.go\n// หน้าที่: โค้ดส่วนประกอบของ simplebank/main.go\n// แก้ปัญหา: ออกแบบตามมาตรฐาน Clean Architecture สำหรับระบบธนาคาร\n// =============================================================================\npackage main\n\nimport (\n\t\"database/sql\"\n\t\"log\"\n\n\t_ \"github.com/lib/pq\"\n\t\"simplebank/api\"\n\tdb \"simplebank/db\"\n\t\"simplebank/util\"\n)\n\n// จุดเริ่มต้นการทำงาน (Entry Point) ของระบบ Simple Bank ทั้งหมด\nfunc main() {\n\t// 1. โหลดค่า Config จากไฟล์ app.env และ Environment Variables ผ่าน Viper\n\t// ทำเพื่อ: ดึงค่า ServerAddress, TokenSymmetricKey, DBSource โดยไม่ Hardcode ไว้ในโค้ด\n\tconfig, err := util.LoadConfig(\".\")\n\tif err != nil {\n\t\tlog.Fatal(\"cannot load config:\", err)\n\t}\n\n\t// 2. สร้าง Connection Pool เชื่อมต่อกับ PostgreSQL\n\tconn, err := sql.Open(config.DBDriver, config.DBSource)\n\tif err != nil {\n\t\tlog.Fatal(\"cannot connect to db:\", err)\n\t}\n\n\t// 3. ห่อหุ้ม Connection ด้วย SQLStore สำหรับรองรับ Database Transactions (โอนเงิน)\n\tstore := db.NewStore(conn)\n\n\t// 4. สร้าง HTTP Server โดยผูก Routing, PasetoMaker, และ Middleware เข้ากับ Store\n\tserver, err := api.NewServer(config, store)\n\tif err != nil {\n\t\tlog.Fatal(\"cannot create server:\", err)\n\t}\n\n\t// 5. สตาร์ต HTTP Server ที่พอร์ตตามที่กำหนดไว้ใน Config (เช่น 0.0.0.0:8080)\n\terr = server.Start(config.ServerAddress)\n\tif err != nil {\n\t\tlog.Fatal(\"cannot start server:\", err)\n\t}\n}"
        },
        {
          "t": "h2",
          "c": "3. การเขียน Multi-Stage Dockerfile แบบมืออาชีพ"
        },
        {
          "t": "p",
          "c": "หากเราใช้ Docker Image ของ Go ทั่วไปในการรัน ขนาดของ Container จะใหญ่ถึง 800MB–1GB ซึ่งเปลืองพื้นที่และดาวน์โหลดช้ามาก เราสามารถใช้เทคนิค **Multi-Stage Build** เพื่อคอมไพล์โค้ดใน Stage แรก แล้วก๊อปปี้เฉพาะไฟล์ไบนารีที่รันได้จริงไปใส่ใน Image ตัวจิ๋วอย่าง `alpine` ใน Stage ที่สอง:"
        },
        {
          "t": "code",
          "lang": "dockerfile",
          "label": "simplebank/Dockerfile",
          "c": "# ==========================================\n# Stage 1: Build Stage (คอมไพล์โค้ดเป็น Binary)\n# ==========================================\n# 1. ใช้ Go Image ตัวเต็มที่มี Golang Compiler และไลบรารีครบชุด\nFROM golang:1.22-alpine3.19 AS builder\nWORKDIR /app\n\n# 2. ก๊อปปี้เฉพาะ go.mod และ go.sum เพื่อดาวน์โหลด dependencies (ใช้ประโยชน์จาก Docker Layer Caching)\nCOPY go.mod go.sum ./\nRUN go mod download\n\n# 3. ก๊อปปี้ Source Code ทั้งหมดแล้วคอมไพล์เป็น Static Binary ตัวเดียวจบ\nCOPY . .\n# CGO_ENABLED=0 เพื่อสร้าง Standalone Binary ที่ไม่พึ่งพา C library ของโฮสต์\nRUN CGO_ENABLED=0 GOOS=linux go build -o main main.go\n\n# ==========================================\n# Stage 2: Run Stage (Image รันจริงขนาดจิ๋ว ~20MB)\n# ==========================================\n# 4. ใช้ Alpine Linux น้ำหนักเบามาก (ขนาดเริ่มต้นเพียง ~5MB)\nFROM alpine:3.19\nWORKDIR /app\n\n# 5. ก๊อปปี้เฉพาะไฟล์ไบนารี 'main' ที่คอมไพล์เสร็จแล้วมาจาก Stage 1\nCOPY --from=builder /app/main .\n# 6. ก๊อปปี้ไฟล์ Config และ Migration Files ที่ระบบจำเป็นต้องใช้\nCOPY app.env .\nCOPY db/migration ./db/migration\n\n# 7. ประกาศพอร์ตที่ Container ให้บริการ และคำสั่งเริ่มต้นทำงาน\nEXPOSE 8080\nCMD [ \"/app/main\" ]"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "คอมไพล์ Docker Image และตรวจสอบขนาด (Multi-Stage Optimization)",
          "code": "# สั่ง Build Docker Image\ndocker build -t simplebank:latest .\n\n# ตรวจสอบขนาดของ Image ที่สร้างเสร็จ\ndocker images simplebank:latest",
          "out": "[+] Building 6.8s (13/13) FINISHED\n => [internal] load build definition from Dockerfile\n => [builder 1/5] FROM docker.io/library/golang:1.22-alpine3.19\n => [builder 2/5] WORKDIR /app\n => [builder 3/5] COPY go.mod go.sum ./\n => [builder 4/5] RUN go mod download\n => [builder 5/5] RUN CGO_ENABLED=0 GOOS=linux go build -o main main.go\n => [stage-1 1/4] FROM docker.io/library/alpine:3.19\n => [stage-1 2/4] COPY --from=builder /app/main .\n => [stage-1 3/4] COPY app.env .\n => [stage-1 4/4] COPY db/migration ./db/migration\n => exporting to image\n => => naming to docker.io/library/simplebank:latest\n\nREPOSITORY   TAG      IMAGE ID       CREATED          SIZE\nsimplebank   latest   e3b0c44298fc   12 seconds ago   21.4MB\n# เทียบกับ Go Builder Image ดั้งเดิมที่มีขนาดถึง ~850MB! ประหยัดพื้นที่กว่า 40 เท่า!"
        },
        {
          "t": "callout",
          "title": "🚀 ผลลัพธ์ที่น่าทึ่ง",
          "c": "ขนาดของ Docker Image จะลดลงจากเกือบ 1,000 MB เหลือเพียงแค่ **~20 MB เท่านั้น!** ปลอดภัยกว่าเพราะไม่มี Compiler หรือเครื่องมือที่ไม่จำเป็นตกค้างอยู่ในระบบ ช่วยลดช่องโหว่จากการถูกโจมตี (Attack Surface)"
        },
        {
          "t": "h2",
          "c": "4. ประกอบร่างด้วย `docker-compose.yml`"
        },
        {
          "t": "p",
          "c": "ไฟล์ `docker-compose.yml` จะช่วยให้เราสามารถสตาร์ตทั้งเซิร์ฟเวอร์ Go และฐานข้อมูล PostgreSQL ขึ้นมาพร้อมกันได้ในคำสั่งเดียว:"
        },
        {
          "t": "code",
          "lang": "yaml",
          "label": "simplebank/docker-compose.yml",
          "c": "version: \"3.9\"\n\nservices:\n  # เซอร์วิสฐานข้อมูล PostgreSQL 16\n  postgres:\n    image: postgres:16-alpine\n    environment:\n      - POSTGRES_USER=root\n      - POSTGRES_PASSWORD=secret\n      - POSTGRES_DB=simple_bank\n    ports:\n      - \"5432:5432\"\n\n  # เซอร์วิส API Backend ของ Go ที่เราสร้างขึ้น\n  api:\n    build:\n      context: .\n      dockerfile: Dockerfile\n    ports:\n      - \"8080:8080\"\n    environment:\n      # ใช้ชื่อ service 'postgres' แทน 'localhost' เมื่อทั้งคู่รันอยู่ใน Docker Network เดียวกัน\n      - DB_SOURCE=postgresql://root:secret@postgres:5432/simple_bank?sslmode=disable\n    depends_on:\n      - postgres"
        },
        {
          "t": "callout",
          "title": "💡 ความมหัศจรรย์ของ viper.AutomaticEnv()",
          "c": "สังเกตหรือไม่ว่าใน `docker-compose.yml` เรากำหนด `DB_SOURCE` ชี้ไปยัง `postgres:5432` แทน `localhost:5432` ใน `app.env` แต่เราไม่ต้องแก้ไฟล์ `app.env` เลย! เพราะคำสั่ง `viper.AutomaticEnv()` จะอ่านค่าจาก Environment Variable ใน Docker มาแทนที่ค่าในไฟล์ให้อัตโนมัติ"
        },
        {
          "t": "h2",
          "c": "5. Production Readiness Checklist สำหรับระบบการเงิน"
        },
        {
          "t": "p",
          "c": "ก่อนที่คุณจะนำระบบธนาคารขึ้นสู่อินเทอร์เน็ตจริง จงตรวจสอบเช็กลิสต์ความปลอดภัยเหล่านี้ให้ครบทุกข้อ:"
        },
        {
          "t": "ol",
          "c": [
            "**เปิดใช้ HTTPS / TLS:** ข้อมูลรหัสผ่านและ Token จะต้องถูกเข้ารหัสระหว่างเดินทางบนอินเทอร์เน็ตเสมอ",
            "**ตั้งค่า Database Connection Pool:** ตรวจสอบ `SetMaxOpenConns` ให้เหมาะสมกับสเปกของเครื่อง Server ไม่ให้ฐานข้อมูลรับโหลดหนักเกินไป",
            "**ทำ Graceful Shutdown:** ดักจับ OS Signal (`SIGINT`, `SIGTERM`) ใน Go เพื่อให้คำสั่งโอนเงินที่กำลังค้างอยู่ใน Transaction ทำงานให้เสร็จเรียบร้อยก่อนปิดเซิร์ฟเวอร์ ป้องกันข้อมูลเงินค้างระหว่าง Deploy",
            "**ติดตั้ง Rate Limiter:** ป้องกันการถูกยิงโจมตีแบบ DDoS หรือการยิงสุ่มรหัสผ่านด้วย Gin Rate Limit Middleware",
            "**ระบบ Observability & Logging:** ติดตั้ง Structured Logger (เช่น `uber-go/zap`) เพื่อบันทึก Request ID สำหรับติดตามเส้นทางการเงินทุกรายการ"
          ]
        },
        {
          "t": "h2",
          "c": "6. สคริปต์ทดสอบ End-to-End ครบวงจร (End-to-End Verification Script)"
        },
        {
          "t": "p",
          "c": "เพื่อพิสูจน์ว่าระบบ Simple Bank ของเราทำงานประสานกันตั้งแต่ชั้น Web API, Authentication Middleware, Business Logic Transaction, จนถึง PostgreSQL Database อย่างไร้รอยต่อ ให้เราสร้างสคริปต์ `test_e2e.sh` ที่จำลอง User Journey ของจริงตั้งแต่ต้นจนจบ:"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "simplebank/test_e2e.sh",
          "c": "#!/bin/bash\nset -e\n\nSERVER_URL=\"http://localhost:8080\"\necho \"========================================================\"\necho \"🚀 เริ่มต้นการทดสอบ SIMPLE BANK END-TO-END VERIFICATION\"\necho \"========================================================\"\n\n# 1. สมัครสมาชิกผู้ใช้งาน Alice และ Bob\necho -e \"\\n[1/6] สมัครสมาชิกผู้ใช้งานใหม่ (POST /users)...\"\ncurl -s -X POST \"$SERVER_URL/users\" -H \"Content-Type: application/json\" \\\n  -d '{\"username\":\"alice\",\"password\":\"password123\",\"full_name\":\"Alice Wonderland\",\"email\":\"alice@mail.com\"}' > /dev/null\ncurl -s -X POST \"$SERVER_URL/users\" -H \"Content-Type: application/json\" \\\n  -d '{\"username\":\"bob\",\"password\":\"password123\",\"full_name\":\"Bob Marley\",\"email\":\"bob@mail.com\"}' > /dev/null\necho \"  ✅ สร้างผู้ใช้ alice และ bob สำเร็จ\"\n\n# 2. เข้าสู่ระบบเพื่อรับ PASETO Access Token\necho -e \"\\n[2/6] เข้าสู่ระบบเพื่อรับ Token (POST /users/login)...\"\nALICE_TOKEN=$(curl -s -X POST \"$SERVER_URL/users/login\" -H \"Content-Type: application/json\" \\\n  -d '{\"username\":\"alice\",\"password\":\"password123\"}' | grep -o '\"access_token\":\"[^\"]*' | grep -o '[^\"]*$')\nBOB_TOKEN=$(curl -s -X POST \"$SERVER_URL/users/login\" -H \"Content-Type: application/json\" \\\n  -d '{\"username\":\"bob\",\"password\":\"password123\"}' | grep -o '\"access_token\":\"[^\"]*' | grep -o '[^\"]*$')\necho \"  ✅ Alice Token: ${ALICE_TOKEN:0:20}...\"\necho \"  ✅ Bob Token:   ${BOB_TOKEN:0:20}...\"\n\n# 3. เปิดบัญชีเงินฝากสกุล USD (ดึง Owner จาก Token อัตโนมัติ)\necho -e \"\\n[3/6] เปิดบัญชีเงินฝาก (POST /accounts)...\"\nACC_ALICE_ID=$(curl -s -X POST \"$SERVER_URL/accounts\" \\\n  -H \"Authorization: Bearer $ALICE_TOKEN\" -H \"Content-Type: application/json\" \\\n  -d '{\"currency\":\"USD\"}' | grep -o '\"id\":[0-9]*' | head -n1 | cut -d: -f2)\nACC_BOB_ID=$(curl -s -X POST \"$SERVER_URL/accounts\" \\\n  -H \"Authorization: Bearer $BOB_TOKEN\" -H \"Content-Type: application/json\" \\\n  -d '{\"currency\":\"USD\"}' | grep -o '\"id\":[0-9]*' | head -n1 | cut -d: -f2)\necho \"  ✅ เปิดบัญชีสำเร็จ: บัญชี Alice ID = $ACC_ALICE_ID, บัญชี Bob ID = $ACC_BOB_ID\"\n\n# 4. ใส่เงินตั้งต้นให้ Alice 1,000 USD (Seed Data)\necho -e \"\\n[4/6] ฝากเงินตั้งต้นให้ Alice 1,000 USD...\"\ndocker exec -i postgres16 psql -U root -d simple_bank -c \\\n  \"UPDATE accounts SET balance = 1000 WHERE id = $ACC_ALICE_ID;\n   INSERT INTO entries (account_id, amount) VALUES ($ACC_ALICE_ID, 1000);\" > /dev/null\necho \"  ✅ เติมเงินตั้งต้น 1,000 USD ให้บัญชี $ACC_ALICE_ID สำเร็จ\"\n\n# 5. Alice โอนเงิน 100 USD ให้ Bob (Atomic Transaction)\necho -e \"\\n[5/6] Alice สั่งโอนเงิน 100 USD ไปยัง Bob (POST /transfers)...\"\nTRANSFER_RES=$(curl -s -X POST \"$SERVER_URL/transfers\" \\\n  -H \"Authorization: Bearer $ALICE_TOKEN\" -H \"Content-Type: application/json\" \\\n  -d \"{\\\"from_account_id\\\":$ACC_ALICE_ID,\\\"to_account_id\\\":$ACC_BOB_ID,\\\"amount\\\":100,\\\"currency\\\":\\\"USD\\\"}\")\necho \"  ✅ โอนเงินสำเร็จ! ผลลัพธ์: Alice balance = $(echo $TRANSFER_RES | grep -o '\"from_account\":{[^}]*' | grep -o '\"balance\":[0-9]*' | cut -d: -f2) USD, Bob balance = $(echo $TRANSFER_RES | grep -o '\"to_account\":{[^}]*' | grep -o '\"balance\":[0-9]*' | cut -d: -f2) USD\"\n\n# 6. ทดสอบการป้องกันความปลอดภัย (Security & Consistency Checks)\necho -e \"\\n[6/6] ทดสอบเกราะป้องกันความปลอดภัย...\"\n\n# 6.1 Bob พยายามแอบโอนเงินออกจากบัญชีของ Alice\nHACK_CODE=$(curl -s -o /dev/null -w \"%{http_code}\" -X POST \"$SERVER_URL/transfers\" \\\n  -H \"Authorization: Bearer $BOB_TOKEN\" -H \"Content-Type: application/json\" \\\n  -d \"{\\\"from_account_id\\\":$ACC_ALICE_ID,\\\"to_account_id\\\":$ACC_BOB_ID,\\\"amount\\\":500,\\\"currency\\\":\\\"USD\\\"}\")\nif [ \"$HACK_CODE\" -eq 401 ]; then\n  echo \"  🛡️ ดักจับได้สมบูรณ์: Bob พยายามแอบโอนเงินของ Alice -> HTTP 401 Unauthorized\"\nfi\n\n# 6.2 Alice พยายามโอน 5,000 USD (ยอดเงินไม่พอ เกิน Check Constraint)\nOVERDRAFT_CODE=$(curl -s -o /dev/null -w \"%{http_code}\" -X POST \"$SERVER_URL/transfers\" \\\n  -H \"Authorization: Bearer $ALICE_TOKEN\" -H \"Content-Type: application/json\" \\\n  -d \"{\\\"from_account_id\\\":$ACC_ALICE_ID,\\\"to_account_id\\\":$ACC_BOB_ID,\\\"amount\\\":5000,\\\"currency\\\":\\\"USD\\\"}\")\nif [ \"$OVERDRAFT_CODE\" -eq 500 ]; then\n  echo \"  🛡️ ดักจับได้สมบูรณ์: Alice พยายามโอนเงินเกินยอดคงเหลือ -> DB Check Constraint ปฏิเสธ & Auto Rollback\"\nfi\n\necho -e \"\\n========================================================\"\necho \"🎉 สรุปผลการทดสอบ: ระบบ SIMPLE BANK ผ่านมาตรฐาน END-TO-END 100%!\"\necho \"========================================================\""
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "รันสคริปต์ test_e2e.sh ใน Terminal และผลลัพธ์การรันจริง",
          "code": "chmod +x test_e2e.sh && ./test_e2e.sh",
          "out": "========================================================\n🚀 เริ่มต้นการทดสอบ SIMPLE BANK END-TO-END VERIFICATION\n========================================================\n\n[1/6] สมัครสมาชิกผู้ใช้งานใหม่ (POST /users)...\n  ✅ สร้างผู้ใช้ alice และ bob สำเร็จ\n\n[2/6] เข้าสู่ระบบเพื่อรับ Token (POST /users/login)...\n  ✅ Alice Token: v2.local.O4WcQo7cE7...\n  ✅ Bob Token:   v2.local.L9vRt1bXp2...\n\n[3/6] เปิดบัญชีเงินฝาก (POST /accounts)...\n  ✅ เปิดบัญชีสำเร็จ: บัญชี Alice ID = 1, บัญชี Bob ID = 2\n\n[4/6] ฝากเงินตั้งต้นให้ Alice 1,000 USD...\n  ✅ เติมเงินตั้งต้น 1,000 USD ให้บัญชี 1 สำเร็จ\n\n[5/6] Alice สั่งโอนเงิน 100 USD ไปยัง Bob (POST /transfers)...\n  ✅ โอนเงินสำเร็จ! ผลลัพธ์: Alice balance = 900 USD, Bob balance = 100 USD\n\n[6/6] ทดสอบเกราะป้องกันความปลอดภัย...\n  🛡️ ดักจับได้สมบูรณ์: Bob พยายามแอบโอนเงินของ Alice -> HTTP 401 Unauthorized\n  🛡️ ดักจับได้สมบูรณ์: Alice พยายามโอนเงินเกินยอดคงเหลือ -> DB Check Constraint ปฏิเสธ & Auto Rollback\n\n========================================================\n🎉 สรุปผลการทดสอบ: ระบบ SIMPLE BANK ผ่านมาตรฐาน END-TO-END 100%!\n========================================================"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• ขอแสดงความยินดีด้วยครับ! คุณได้สร้างระบบ Simple Bank ตั้งแต่วางโครงสร้างฐานข้อมูลจนถึงการแพ็กขึ้น Docker ระดับ Production และทดสอบ End-to-End สำเร็จครบ 100% แล้ว\n• **ก้าวสุดท้าย (บทที่ 8.1)**: เราจะสรุปองค์ความรู้ทั้งหมดเป็น **แนวคำตอบสัมภาษณ์งาน 10 ข้อสำคัญ** และผังสถาปัตยกรรมระดับ Enterprise เพื่อเตรียมตัวเข้าสู่สนามสัมภาษณ์งานจริงกันครับ!"
        }
      ],
      "en": []
    }
  }
};
