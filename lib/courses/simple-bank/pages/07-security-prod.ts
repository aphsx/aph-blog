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
      "th": "เพิ่มตาราง users ผูกบัญชีเข้ากับเจ้าของตัวจริง, แฮชรหัสผ่านด้วยอัลกอริทึม Slow Hashing (Bcrypt + Salt), และซ่อนรหัสผ่านออกจาก JSON Response ด้วย DTO Struct",
      "en": "Adding the users table, securing passwords with bcrypt slow hashing, and filtering sensitive fields in JSON responses."
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
          "t": "h2",
          "c": "1. สร้าง Migration เวอร์ชันที่ 2 เพิ่มตาราง users"
        },
        {
          "t": "p",
          "c": "รันคำสั่ง `migrate create -ext sql -dir db/migration -seq add_users` เพื่อสร้างไฟล์ Migration คู่ที่สองสำหรับเพิ่มตาราง `users` และผูก Foreign Key เข้ากับคอลัมน์ `owner` ของตาราง `accounts`:"
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/migration/000002_add_users.up.sql",
          "c": "-- =============================================================================\n-- ไฟล์: simplebank/db/migration/000002_add_users.up.sql\n-- หน้าที่: สร้างตาราง users และผูกความสัมพันธ์กับตาราง accounts\n-- แก้ปัญหา: บังคับให้ทุกบัญชีต้องมีเจ้าของที่มีตัวตนจริง และ 1 คนมีได้ 1 บัญชีต่อสกุลเงิน\n-- =============================================================================\nCREATE TABLE \"users\" (\n  \"username\" varchar PRIMARY KEY,\n  \"hashed_password\" varchar NOT NULL,\n  \"full_name\" varchar NOT NULL,\n  \"email\" varchar UNIQUE NOT NULL,\n  \"password_changed_at\" timestamptz NOT NULL DEFAULT '0001-01-01 00:00:00Z',\n  \"created_at\" timestamptz NOT NULL DEFAULT (now())\n);\n\n-- ผูกคอลัมน์ owner ของตาราง accounts เข้ากับ username ในตาราง users\nALTER TABLE \"accounts\" ADD FOREIGN KEY (\"owner\") REFERENCES \"users\" (\"username\");\n\n-- บังคับว่าผู้ใช้ 1 คน เปิดบัญชีสกุลเงินเดียวกันซ้ำไม่ได้ (เช่น Alice มีบัญชี USD ได้เล่มเดียว)\nALTER TABLE \"accounts\" ADD CONSTRAINT \"owner_currency_key\" UNIQUE (\"owner\", \"currency\");"
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/migration/000002_add_users.down.sql",
          "c": "-- =============================================================================\n-- ไฟล์: simplebank/db/migration/000002_add_users.down.sql\n-- หน้าที่: ย้อนกลับการสร้างตาราง users โดยปลด Constraints ที่ตาราง accounts ก่อน\n-- =============================================================================\nALTER TABLE IF EXISTS \"accounts\" DROP CONSTRAINT IF EXISTS \"owner_currency_key\";\nALTER TABLE IF EXISTS \"accounts\" DROP CONSTRAINT IF EXISTS \"accounts_owner_fkey\";\nDROP TABLE IF EXISTS \"users\";"
        },
        {
          "t": "h2",
          "c": "2. ทำไมต้องใช้ Bcrypt แทนการเก็บ Plain Text หรือ SHA-256?"
        },
        {
          "t": "table",
          "head": [
            "วิธีเก็บรหัสผ่าน",
            "ระดับความปลอดภัย",
            "ทำไมถึงอันตรายหรือปลอดภัย?"
          ],
          "rows": [
            [
              "1. Plain Text (ข้อความตรงๆ)",
              "❌ อันตรายร้ายแรง",
              "ถ้าฐานข้อมูลรั่วไหล แฮกเกอร์เห็นรหัสผ่านของลูกค้าทุกคนทันที"
            ],
            [
              "2. Fast Hash (MD5 / SHA-256)",
              "⚠️ อันตราย",
              "คำนวณเร็วเกินไป การ์ดจอ (GPU) สมัยใหม่สุ่มเดาได้หลายพันล้านคำต่อวินาที และเทียบจากตารางสำเร็จรูป (Rainbow Table) ได้ทันที"
            ],
            [
              "3. Bcrypt (ที่เราใช้)",
              "✅ มาตรฐานสากล",
              "1) มี **Cost Factor** ถ่วงเวลาให้คำนวณช้าลงในระดับมิลลิวินาทีเพื่อกันการสุ่มรัวๆ\n2) สุ่ม **Salt** เติมเข้าไปทุกครั้ง ทำให้รหัสผ่านเดียวกันได้ค่า Hash ไม่เหมือนกันเลย ป้องกัน Rainbow Table 100%"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "3. สร้างไฟล์ util/password.go และ util/password_test.go"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "ติดตั้งแพ็กเกจ golang.org/x/crypto",
          "c": "go get golang.org/x/crypto"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/password.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/util/password.go\n// หน้าที่: แฮชรหัสผ่านและตรวจสอบรหัสผ่านด้วยอัลกอริทึม Bcrypt\n// แก้ปัญหา: ป้องกันรหัสผ่านรั่วไหลและป้องกันการโจมตีด้วย Rainbow Table\n// =============================================================================\npackage util\n\nimport (\n\t\"fmt\"\n\t\"golang.org/x/crypto/bcrypt\"\n)\n\n// HashPassword แปลงรหัสผ่านข้อความธรรมดาให้เป็น Bcrypt Hash ที่มี Salt ในตัว\nfunc HashPassword(password string) (string, error) {\n\t// ขั้นตอนที่ 1: แปลง string เป็น []byte แล้วส่งเข้า GenerateFromPassword\n\thashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)\n\tif err != nil {\n\t\treturn \"\", fmt.Errorf(\"ไม่สามารถแฮชรหัสผ่านได้: %w\", err)\n\t}\n\n\t// ขั้นตอนที่ 2: แปลง []byte กลับมาเป็น string เพื่อเก็บลงฐานข้อมูล\n\treturn string(hashedPassword), nil\n}\n\n// CheckPassword ตรวจสอบว่ารหัสผ่านที่ป้อนเข้ามาตรงกับค่า Bcrypt Hash ที่เก็บไว้หรือไม่\nfunc CheckPassword(password string, hashedPassword string) error {\n\treturn bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))\n}"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/password_test.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/util/password_test.go\n// หน้าที่: ทดสอบว่า HashPassword สุ่ม Salt ใหม่ทุกครั้ง และ CheckPassword ตรวจได้แม่นยำ\n// =============================================================================\npackage util\n\nimport (\n\t\"testing\"\n\n\t\"github.com/stretchr/testify/require\"\n\t\"golang.org/x/crypto/bcrypt\"\n)\n\nfunc TestPassword(t *testing.T) {\n\tpassword := RandomString(6)\n\n\t// ขั้นตอนที่ 1: แฮชรหัสผ่านครั้งที่ 1 และตรวจความถูกต้อง\n\thashedPassword1, err := HashPassword(password)\n\trequire.NoError(t, err)\n\trequire.NotEmpty(t, hashedPassword1)\n\n\terr = CheckPassword(password, hashedPassword1)\n\trequire.NoError(t, err)\n\n\t// ขั้นตอนที่ 2: ทดสอบใส่รหัสผ่านผิด ต้องได้ Error ว่า ErrMismatchedHashAndPassword\n\twrongPassword := RandomString(6)\n\terr = CheckPassword(wrongPassword, hashedPassword1)\n\trequire.EqualError(t, err, bcrypt.ErrMismatchedHashAndPassword.Error())\n\n\t// ขั้นตอนที่ 3: แฮชรหัสผ่านตัวเดิมซ้ำครั้งที่ 2 ค่า Hash ที่ได้ต้องไม่ซ้ำกัน (เพราะมี Salt ใหม่)\n\thashedPassword2, err := HashPassword(password)\n\trequire.NoError(t, err)\n\trequire.NotEmpty(t, hashedPassword2)\n\trequire.NotEqual(t, hashedPassword1, hashedPassword2)\n}"
        },
        {
          "t": "h2",
          "c": "4. สร้างไฟล์ db/user.go และ api/user.go (พร้อมซ่อน HashedPassword)"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/user.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/user.go\n// หน้าที่: จัดการคำสั่ง SQL สำหรับสร้างและดึงข้อมูลผู้ใช้งานในตาราง users\n// =============================================================================\npackage db\n\nimport (\n\t\"context\"\n\t\"time\"\n)\n\n// User แทนข้อมูล 1 แถวในตาราง users\ntype User struct {\n\tUsername          string    `json:\"username\"`\n\tHashedPassword    string    `json:\"hashed_password\"`\n\tFullName          string    `json:\"full_name\"`\n\tEmail             string    `json:\"email\"`\n\tPasswordChangedAt time.Time `json:\"password_changed_at\"`\n\tCreatedAt         time.Time `json:\"created_at\"`\n}\n\ntype CreateUserParams struct {\n\tUsername       string `json:\"username\"`\n\tHashedPassword string `json:\"hashed_password\"`\n\tFullName       string `json:\"full_name\"`\n\tEmail          string `json:\"email\"`\n}\n\nconst createUser = `-- name: CreateUser :one\nINSERT INTO users (\n  username,\n  hashed_password,\n  full_name,\n  email\n) VALUES (\n  $1, $2, $3, $4\n)\nRETURNING username, hashed_password, full_name, email, password_changed_at, created_at;\n`\n\nfunc (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {\n\trow := q.db.QueryRowContext(ctx, createUser, arg.Username, arg.HashedPassword, arg.FullName, arg.Email)\n\tvar i User\n\terr := row.Scan(\n\t\t&i.Username,\n\t\t&i.HashedPassword,\n\t\t&i.FullName,\n\t\t&i.Email,\n\t\t&i.PasswordChangedAt,\n\t\t&i.CreatedAt,\n\t)\n\treturn i, err\n}\n\nconst getUser = `-- name: GetUser :one\nSELECT username, hashed_password, full_name, email, password_changed_at, created_at FROM users\nWHERE username = $1 LIMIT 1;\n`\n\nfunc (q *Queries) GetUser(ctx context.Context, username string) (User, error) {\n\trow := q.db.QueryRowContext(ctx, getUser, username)\n\tvar i User\n\terr := row.Scan(\n\t\t&i.Username,\n\t\t&i.HashedPassword,\n\t\t&i.FullName,\n\t\t&i.Email,\n\t\t&i.PasswordChangedAt,\n\t\t&i.CreatedAt,\n\t)\n\treturn i, err\n}"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/user.go (ส่วนการสมัครสมาชิก POST /users)",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/user.go\n// หน้าที่: HTTP Handler สำหรับสมัครสมาชิกใหม่ (POST /users)\n// แก้ปัญหา: แฮชรหัสผ่านด้วย Bcrypt ก่อนลง DB และตัดฟิลด์ hashed_password ออกจาก JSON ขาออก\n// =============================================================================\npackage api\n\nimport (\n\t\"net/http\"\n\t\"time\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n\t\"simplebank/util\"\n)\n\ntype createUserRequest struct {\n\tUsername string `json:\"username\" binding:\"required,alphanum\"`\n\tPassword string `json:\"password\" binding:\"required,min=6\"`\n\tFullName string `json:\"full_name\" binding:\"required\"`\n\tEmail    string `json:\"email\" binding:\"required,email\"`\n}\n\n// userResponse คือ DTO (Data Transfer Object) ที่ตัดฟิลด์ HashedPassword ทิ้งเพื่อความปลอดภัย\ntype userResponse struct {\n\tUsername          string    `json:\"username\"`\n\tFullName          string    `json:\"full_name\"`\n\tEmail             string    `json:\"email\"`\n\tPasswordChangedAt time.Time `json:\"password_changed_at\"`\n\tCreatedAt         time.Time `json:\"created_at\"`\n}\n\n// newUserResponse แปลง db.User ให้เป็น userResponse ที่ปลอดภัยสำหรับส่งกลับเป็น JSON\nfunc newUserResponse(user db.User) userResponse {\n\treturn userResponse{\n\t\tUsername:          user.Username,\n\t\tFullName:          user.FullName,\n\t\tEmail:             user.Email,\n\t\tPasswordChangedAt: user.PasswordChangedAt,\n\t\tCreatedAt:         user.CreatedAt,\n\t}\n}\n\nfunc (server *Server) createUser(ctx *gin.Context) {\n\t// ขั้นตอนที่ 1: แกะและตรวจสอบ JSON ขาเข้า\n\tvar req createUserRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\t// ขั้นตอนที่ 2: แฮชรหัสผ่านด้วย Bcrypt\n\thashedPassword, err := util.HashPassword(req.Password)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\t// ขั้นตอนที่ 3: บันทึกข้อมูลผู้ใช้ลงฐานข้อมูล\n\targ := db.CreateUserParams{\n\t\tUsername:       req.Username,\n\t\tHashedPassword: hashedPassword,\n\t\tFullName:       req.FullName,\n\t\tEmail:          req.Email,\n\t}\n\n\tuser, err := server.store.CreateUser(ctx, arg)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\t// ขั้นตอนที่ 4: แปลงเป็น userResponse เพื่อไม่ให้ hashed_password หลุดออกไปใน JSON\n\trsp := newUserResponse(user)\n\tctx.JSON(http.StatusCreated, rsp)\n}"
        },
        {
          "t": "h2",
          "c": "5. อัปเดต db/user_test.go และ db/account_test.go ให้รองรับ Foreign Key"
        },
        {
          "t": "p",
          "c": "เนื่องจากตอนนี้ตาราง `accounts` บังคับว่า `owner` ต้องมีตัวตนอยู่ในตาราง `users` ก่อนเสมอ เราจึงต้องสร้างฟังก์ชัน `createRandomUser(t)` ใน `db/user_test.go` แล้วให้ `createRandomAccount(t)` ใน `db/account_test.go` เรียกสร้าง User ก่อนเปิดบัญชี:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/user_test.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/user_test.go\n// หน้าที่: ทดสอบการสร้างและดึงข้อมูลผู้ใช้ พร้อมเป็น Helper ให้กับ account_test.go\n// =============================================================================\npackage db\n\nimport (\n\t\"context\"\n\t\"testing\"\n\n\t\"github.com/stretchr/testify/require\"\n\t\"simplebank/util\"\n)\n\nfunc createRandomUser(t *testing.T) User {\n\thashedPassword, err := util.HashPassword(util.RandomString(6))\n\trequire.NoError(t, err)\n\n\targ := CreateUserParams{\n\t\tUsername:       util.RandomOwner(),\n\t\tHashedPassword: hashedPassword,\n\t\tFullName:       util.RandomOwner(),\n\t\tEmail:          util.RandomString(6) + \"@email.com\",\n\t}\n\n\tuser, err := testQueries.CreateUser(context.Background(), arg)\n\trequire.NoError(t, err)\n\trequire.NotEmpty(t, user)\n\n\trequire.Equal(t, arg.Username, user.Username)\n\trequire.Equal(t, arg.HashedPassword, user.HashedPassword)\n\trequire.Equal(t, arg.FullName, user.FullName)\n\trequire.Equal(t, arg.Email, user.Email)\n\trequire.True(t, user.PasswordChangedAt.IsZero())\n\trequire.NotZero(t, user.CreatedAt)\n\n\treturn user\n}"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "อัปเดต simplebank/db/account_test.go ให้สร้าง User ก่อนสร้าง Account",
          "c": " func createRandomAccount(t *testing.T) Account {\n+\tuser := createRandomUser(t) // สร้าง User จริงก่อนเพื่อให้ผ่าน Foreign Key\n+\n \targ := CreateAccountParams{\n-\t\tOwner:    util.RandomOwner(),\n+\t\tOwner:    user.Username,\n \t\tBalance:  util.RandomMoney(),\n \t\tCurrency: util.RandomCurrency(),\n \t}"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• คุณได้เพิ่มระบบสมาชิก (`users`), เข้ารหัสรหัสผ่านด้วย Bcrypt, และผูก Foreign Key เข้ากับบัญชีธนาคารเรียบร้อยแล้ว\n• **ก้าวต่อไป (บทที่ 7.2)**: เราจะสร้างระบบออกตั๋วรับรองตัวตนด้วย **PASETO Token** (`POST /users/login`) และสร้าง **Gin Authentication Middleware** เพื่อล็อกไม่ให้ใครแอบดูบัญชีหรือแอบโอนเงินของคนอื่นได้!"
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
      "th": "เจาะลึกว่าทำไม PASETO ถึงปลอดภัยกว่า JWT, ออกแบบ Token Maker Interface, สร้าง Endpoint ล็อกอิน, และเขียน Gin Middleware ป้องกันการสวมรอยโอนเงิน",
      "en": "Why modern backends choose PASETO over JWT, designing the Maker interface, and building Gin Auth Middleware."
    },
    "group": "7. ระบบยืนยันตัวตน ความปลอดภัย & การรันจริง (Production)",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: สร้างตาราง `users` และระบบสมัครสมาชิกด้วย Bcrypt เรียบร้อยแล้ว\n• **ภารกิจในบทนี้**: สร้างแพ็กเกจ `simplebank/token/` (`payload.go`, `maker.go`, `paseto_maker.go`), เพิ่ม Endpoint ล็อกอิน (`POST /users/login`), และสร้าง `api/middleware.go` เพื่อล็อกสิทธิ์ทุก Endpoint\n• **ไวยากรณ์ Go ที่จะได้ใช้จริง**: Interface (`token.Maker`), Higher-Order Middleware Function (`func authMiddleware(...) gin.HandlerFunc`), และ Type Assertion (`ctx.MustGet(...).(*token.Payload)`)"
        },
        {
          "t": "h2",
          "c": "1. ทำไมระบบยุคใหม่ถึงเลือกใช้ PASETO แทน JWT?"
        },
        {
          "t": "table",
          "head": [
            "ประเด็นเปรียบเทียบ",
            "JWT (JSON Web Token)",
            "PASETO (Platform-Agnostic Security Tokens)"
          ],
          "rows": [
            [
              "ช่องโหว่การเลือกอัลกอริทึม",
              "ยอมให้ผู้ส่งระบุ `alg` ใน Header ได้ (เคยเกิดช่องโหว่ `alg: \"none\"` ที่แฮกเกอร์ส่ง Token เปล่าผ่านการตรวจได้)",
              "**ปิดช่องโหว่ 100%!** ล็อกอัลกอริทึมที่ปลอดภัยที่สุดไว้ตามเวอร์ชัน (เช่น v2.local ใช้ ChaCha20-Poly1305)"
            ],
            [
              "การปกป้องข้อมูลข้างใน (Payload)",
              "เป็นเพียง Base64 ที่ใครๆ ก็ถอดรหัสอ่านข้อความข้างในได้ (แค่แก้ไขไม่ได้)",
              "ในโหมด Local (`v2.local`) ข้อมูล Payload **ถูกเข้ารหัสลับ (Encrypted)** คนนอกไม่สามารถแกะอ่านได้เลย"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. แกะไวยากรณ์ Go ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "กลไก Go ในระบบ Auth",
            "โค้ดที่ปรากฏ",
            "คำอธิบายแบบเข้าใจง่าย"
          ],
          "rows": [
            [
              "1. Higher-Order Middleware",
              "func authMiddleware(tokenMaker token.Maker) gin.HandlerFunc {\n    return func(ctx *gin.Context) {\n        ...\n        ctx.Set(authorizationPayloadKey, payload)\n        ctx.Next()\n    }\n}",
              "`authMiddleware` เป็นฟังก์ชันชั้นนอกที่รับ `tokenMaker` เข้ามา แล้ว **คืนค่าเป็นฟังก์ชัน Handler ของ Gin** เมื่อตรวจสอบ Token ผ่านจะฝาก `payload` ไว้ใน `ctx.Set(...)` แล้วเรียก `ctx.Next()` เพื่อส่งต่อไปยัง Handler ถัดไป"
            ],
            [
              "2. ดึงค่าจาก Context ด้วย Type Assertion",
              "authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)",
              "`ctx.MustGet(...)` คืนค่าเป็น `interface{}` เราจึงต่อท้ายด้วย `.(*token.Payload)` (Type Assertion) เพื่อแปลงกลับมาเป็น `*token.Payload` แล้วอ่านชื่อผู้ใช้ `authPayload.Username` ได้ทันที"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "3. สร้างแพ็กเกจ simplebank/token/ (payload.go, maker.go, paseto_maker.go)"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "ติดตั้งไลบรารีสำหรับสร้าง UUID และ PASETO Token",
          "c": "go get github.com/google/uuid github.com/o1egl/paseto github.com/aead/chacha20poly1305"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/token/payload.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/token/payload.go\n// หน้าที่: นิยามโครงสร้างข้อมูล Payload ที่บรรจุอยู่ใน Token และตรวจสอบวันหมดอายุ\n// =============================================================================\npackage token\n\nimport (\n\t\"errors\"\n\t\"time\"\n\n\t\"github.com/google/uuid\"\n)\n\nvar (\n\tErrInvalidToken = errors.New(\"ตั๋วรับรองตัวตนไม่ถูกต้อง\")\n\tErrExpiredToken = errors.New(\"ตั๋วรับรองตัวตนหมดอายุแล้ว\")\n)\n\n// Payload เก็บข้อมูลตัวตนของผู้ใช้และวันเวลาหมดอายุของ Token\ntype Payload struct {\n\tID        uuid.UUID `json:\"id\"`\n\tUsername  string    `json:\"username\"`\n\tIssuedAt  time.Time `json:\"issued_at\"`\n\tExpiredAt time.Time `json:\"expired_at\"`\n}\n\n// NewPayload สร้าง Payload ใหม่พร้อมสุ่มรหัส UUID เฉพาะตัว\nfunc NewPayload(username string, duration time.Duration) (*Payload, error) {\n\ttokenID, err := uuid.NewRandom()\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\n\tpayload := &Payload{\n\t\tID:        tokenID,\n\t\tUsername:  username,\n\t\tIssuedAt:  time.Now(),\n\t\tExpiredAt: time.Now().Add(duration),\n\t}\n\treturn payload, nil\n}\n\n// Valid ตรวจสอบว่าเวลาปัจจุบันเลยกำหนด ExpiredAt ไปแล้วหรือยัง\nfunc (payload *Payload) Valid() error {\n\tif time.Now().After(payload.ExpiredAt) {\n\t\treturn ErrExpiredToken\n\t}\n\treturn nil\n}"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/token/maker.go และ simplebank/token/paseto_maker.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/token/maker.go\n// หน้าที่: นิยาม Maker Interface สำหรับสร้างและตรวจสอบ Token\n// =============================================================================\npackage token\n\nimport \"time\"\n\ntype Maker interface {\n\tCreateToken(username string, duration time.Duration) (string, error)\n\tVerifyToken(token string) (*Payload, error)\n}\n\n// =============================================================================\n// ไฟล์: simplebank/token/paseto_maker.go\n// หน้าที่: สร้างและถอดรหัส PASETO Token (v2.local) ด้วย ChaCha20-Poly1305\n// =============================================================================\npackage token\n\nimport (\n\t\"fmt\"\n\t\"time\"\n\n\t\"github.com/aead/chacha20poly1305\"\n\t\"github.com/o1egl/paseto\"\n)\n\ntype PasetoMaker struct {\n\tpaseto       *paseto.V2\n\tsymmetricKey []byte\n}\n\n// NewPasetoMaker สร้าง PasetoMaker โดยบังคับขนาดคีย์ลับต้องเท่ากับ 32 ไบต์พอดี\nfunc NewPasetoMaker(symmetricKey string) (Maker, error) {\n\tif len(symmetricKey) != chacha20poly1305.KeySize {\n\t\treturn nil, fmt.Errorf(\"ขนาดคีย์ไม่ถูกต้อง: ต้องมีความยาว %d ไบต์พอดี\", chacha20poly1305.KeySize)\n\t}\n\n\tmaker := &PasetoMaker{\n\t\tpaseto:       paseto.NewV2(),\n\t\tsymmetricKey: []byte(symmetricKey),\n\t}\n\treturn maker, nil\n}\n\n// CreateToken สร้าง Payload แล้วเข้ารหัสเป็นสตริง PASETO Token\nfunc (maker *PasetoMaker) CreateToken(username string, duration time.Duration) (string, error) {\n\tpayload, err := NewPayload(username, duration)\n\tif err != nil {\n\t\treturn \"\", err\n\t}\n\treturn maker.paseto.Encrypt(maker.symmetricKey, payload, nil)\n}\n\n// VerifyToken ถอดรหัส PASETO Token และตรวจสอบว่ายังไม่หมดอายุ\nfunc (maker *PasetoMaker) VerifyToken(token string) (*Payload, error) {\n\tpayload := &Payload{}\n\n\terr := maker.paseto.Decrypt(token, maker.symmetricKey, payload, nil)\n\tif err != nil {\n\t\treturn nil, ErrInvalidToken\n\t}\n\n\tif err := payload.Valid(); err != nil {\n\t\treturn nil, err\n\t}\n\treturn payload, nil\n}"
        },
        {
          "t": "h2",
          "c": "4. สร้าง Gin Auth Middleware ใน simplebank/api/middleware.go"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/middleware.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/middleware.go\n// หน้าที่: ดักตรวจสอบ Authorization Bearer Token ก่อนอนุญาตให้เข้าถึง Protected Endpoints\n// แก้ปัญหา: ป้องกันผู้ที่ไม่ได้ล็อกอินหรือใช้ Token ปลอมเข้ามาทำรายการทางการเงิน\n// =============================================================================\npackage api\n\nimport (\n\t\"errors\"\n\t\"net/http\"\n\t\"strings\"\n\n\t\"github.com/gin-gonic/gin\"\n\t\"simplebank/token\"\n)\n\nconst (\n\tauthorizationHeaderKey  = \"authorization\"\n\tauthorizationTypeBearer = \"bearer\"\n\tauthorizationPayloadKey = \"authorization_payload\"\n)\n\n// authMiddleware คืนค่าฟังก์ชันดักจับคำขอของ Gin ที่ตรวจสอบความถูกต้องของ Token\nfunc authMiddleware(tokenMaker token.Maker) gin.HandlerFunc {\n\treturn func(ctx *gin.Context) {\n\t\t// ขั้นตอนที่ 1: ดึงค่า Header \"Authorization\" ออกมาจาก HTTP Request\n\t\tauthHeader := ctx.GetHeader(authorizationHeaderKey)\n\t\tif len(authHeader) == 0 {\n\t\t\terr := errors.New(\"ไม่มีการแนบ Authorization Header\")\n\t\t\tctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))\n\t\t\treturn\n\t\t}\n\n\t\t// ขั้นตอนที่ 2: แยกข้อความด้วยช่องว่าง (ต้องได้ 2 ส่วนคือ \"Bearer\" และ \"<token>\")\n\t\tfields := strings.Fields(authHeader)\n\t\tif len(fields) < 2 {\n\t\t\terr := errors.New(\"รูปแบบ Authorization Header ไม่ถูกต้อง\")\n\t\t\tctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))\n\t\t\treturn\n\t\t}\n\n\t\t// ขั้นตอนที่ 3: ตรวจว่าชนิดของ Token เป็นคำว่า \"bearer\"\n\t\tauthorizationType := strings.ToLower(fields[0])\n\t\tif authorizationType != authorizationTypeBearer {\n\t\t\terr := errors.New(\"รองรับเฉพาะ Authorization ประเภท Bearer เท่านั้น\")\n\t\t\tctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))\n\t\t\treturn\n\t\t}\n\n\t\t// ขั้นตอนที่ 4: ถอดรหัสและตรวจสอบวันหมดอายุของ Token\n\t\taccessToken := fields[1]\n\t\tpayload, err := tokenMaker.VerifyToken(accessToken)\n\t\tif err != nil {\n\t\t\tctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))\n\t\t\treturn\n\t\t}\n\n\t\t// ขั้นตอนที่ 5: ฝาก payload ไว้ใน gin.Context แล้วเปิดทางให้ Handler ถัดไปทำงาน\n\t\tctx.Set(authorizationPayloadKey, payload)\n\t\tctx.Next()\n\t}\n}"
        },
        {
          "t": "h2",
          "c": "5. อัปเกรด Handlers (user.go, account.go, transfer.go, server.go) ให้บังคับสิทธิ์เจ้าของบัญชี"
        },
        {
          "t": "p",
          "c": "เมื่อมี `authMiddleware` แล้ว เราจะเพิ่ม `loginUser` ใน `api/user.go` และปรับให้ `createAccount`, `getAccount`, `listAccounts`, และ `createTransfer` ตรวจสอบว่าผู้ที่ถือ Token เป็นเจ้าของบัญชีตัวจริงเท่านั้น:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "เพิ่ม loginUser ใน simplebank/api/user.go และตรวจสิทธิ์ใน account.go & transfer.go",
          "c": "// =============================================================================\n// 1. เพิ่มใน simplebank/api/user.go (POST /users/login)\n// =============================================================================\ntype loginUserRequest struct {\n\tUsername string `json:\"username\" binding:\"required,alphanum\"`\n\tPassword string `json:\"password\" binding:\"required,min=6\"`\n}\n\ntype loginUserResponse struct {\n\tAccessToken string       `json:\"access_token\"`\n\tUser        userResponse `json:\"user\"`\n}\n\nfunc (server *Server) loginUser(ctx *gin.Context) {\n\tvar req loginUserRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\tuser, err := server.store.GetUser(ctx, req.Username)\n\tif err != nil {\n\t\tif err == sql.ErrNoRows {\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err))\n\t\t\treturn\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tif err := util.CheckPassword(req.Password, user.HashedPassword); err != nil {\n\t\tctx.JSON(http.StatusUnauthorized, errorResponse(err))\n\t\treturn\n\t}\n\n\taccessToken, err := server.tokenMaker.CreateToken(user.Username, server.tokenDuration)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, loginUserResponse{\n\t\tAccessToken: accessToken,\n\t\tUser:        newUserResponse(user),\n\t})\n}\n\n// =============================================================================\n// 2. จุดสำคัญที่ตรวจสิทธิ์เจ้าของบัญชีใน api/transfer.go (createTransfer)\n// =============================================================================\n\tfromAccount, valid := server.validAccount(ctx, req.FromAccountID, req.Currency)\n\tif !valid {\n\t\treturn\n\t}\n\n\t// ดึง Payload ของผู้ที่ล็อกอินออกจาก Context ด้วย Type Assertion\n\tauthPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)\n\tif fromAccount.Owner != authPayload.Username {\n\t\terr := errors.New(\"บัญชีต้นทางไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์สั่งโอนเงิน\")\n\t\tctx.JSON(http.StatusUnauthorized, errorResponse(err))\n\t\treturn\n\t}"
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
      "th": "แยกการตั้งค่าด้วย spf13/viper ตามหลัก 12-Factor App, เขียน Multi-Stage Dockerfile ย่อขนาดอิมเมจเหลือ 20MB, ประกอบร่างด้วย Docker Compose และรันสคริปต์ทดสอบ End-to-End",
      "en": "Decoupling configurations with Viper, building lean multi-stage Docker images, and running end-to-end verification."
    },
    "group": "7. ระบบยืนยันตัวตน ความปลอดภัย & การรันจริง (Production)",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: สร้างระบบธนาคารครบทั้ง Database, Transaction, Concurrency Control, Gin API, และ PASETO Auth\n• **ภารกิจในบทนี้**: สร้างไฟล์ `app.env`, `util/config.go`, `Dockerfile`, `docker-compose.yml`, และสคริปต์ทดสอบระบบจริง `test_e2e.sh`\n• **ไวยากรณ์ Go ที่จะได้ใช้จริง**: Struct Tag `mapstructure:\"...\"` ของ Viper และ Named Return `(config Config, err error)` ใน `LoadConfig`"
        },
        {
          "t": "h2",
          "c": "1. จัดการ Configuration ด้วย Viper (util/config.go และ app.env)"
        },
        {
          "t": "p",
          "c": "ตามหลักการพัฒนาซอฟต์แวร์ระดับ Production (**12-Factor App**) เราห้ามฝังรหัสผ่านฐานข้อมูลหรือคีย์ลับไว้ในโค้ด (Hardcode) แต่ต้องแยกออกมาไว้ในไฟล์ `.env` หรือ Environment Variables โดยใช้ไลบรารี **`github.com/spf13/viper`**:"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "ติดตั้งแพ็กเกจ Viper",
          "c": "go get github.com/spf13/viper"
        },
        {
          "t": "code",
          "lang": "env",
          "label": "simplebank/app.env",
          "c": "DB_DRIVER=postgres\nDB_SOURCE=postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\nSERVER_ADDRESS=0.0.0.0:8080\nTOKEN_SYMMETRIC_KEY=12345678901234567890123456789012\nTOKEN_DURATION=15m"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/config.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/util/config.go\n// หน้าที่: อ่านค่าการตั้งค่าจากไฟล์ app.env หรือ Environment Variables ด้วย Viper\n// แก้ปัญหา: แยกข้อมูลความลับและพารามิเตอร์ระบบออกจากซอร์สโค้ดตามหลัก 12-Factor App\n// =============================================================================\npackage util\n\nimport (\n\t\"time\"\n\n\t\"github.com/spf13/viper\"\n)\n\n// Config เก็บค่าการตั้งค่าทั้งหมดของระบบ โดยจับคู่ชื่อผ่านแท็ก mapstructure\ntype Config struct {\n\tDBDriver          string        `mapstructure:\"DB_DRIVER\"`\n\tDBSource          string        `mapstructure:\"DB_SOURCE\"`\n\tServerAddress     string        `mapstructure:\"SERVER_ADDRESS\"`\n\tTokenSymmetricKey string        `mapstructure:\"TOKEN_SYMMETRIC_KEY\"`\n\tTokenDuration     time.Duration `mapstructure:\"TOKEN_DURATION\"`\n}\n\n// LoadConfig โหลดค่าจากไฟล์ app.env ในโฟลเดอร์ path และอนุญาตให้ใช้ Env Var ทับได้อัตโนมัติ\nfunc LoadConfig(path string) (config Config, err error) {\n\t// ขั้นตอนที่ 1: กำหนดตำแหน่งและชื่อไฟล์ที่ต้องการให้ Viper ค้นหา (app.env)\n\tviper.AddConfigPath(path)\n\tviper.SetConfigName(\"app\")\n\tviper.SetConfigType(\"env\")\n\n\t// ขั้นตอนที่ 2: เปิดให้ Environment Variables บนเครื่อง/Docker มีสิทธิ์ทับค่าในไฟล์ได้ทันที\n\tviper.AutomaticEnv()\n\n\t// ขั้นตอนที่ 3: อ่านไฟล์และแปลงค่าทั้งหมดเข้าสู่ตัวแปร struct config\n\tif err = viper.ReadInConfig(); err != nil {\n\t\treturn\n\t}\n\n\terr = viper.Unmarshal(&config)\n\treturn\n}"
        },
        {
          "t": "h2",
          "c": "2. สร้าง Multi-Stage Dockerfile (ย่อขนาดจาก 850MB เหลือ ~20MB)"
        },
        {
          "t": "code",
          "lang": "dockerfile",
          "label": "simplebank/Dockerfile",
          "c": "# =============================================================================\n# Stage 1: Build Stage (ใช้ Go Image ตัวเต็มเพื่อคอมไพล์โค้ดเป็นไฟล์ไบนารี)\n# =============================================================================\nFROM golang:1.22-alpine3.19 AS builder\nWORKDIR /app\n\nCOPY go.mod go.sum ./\nRUN go mod download\n\nCOPY . .\nRUN CGO_ENABLED=0 GOOS=linux go build -o main main.go\n\n# =============================================================================\n# Stage 2: Run Stage (ใช้ Alpine Linux ขนาดจิ๋ว พกไปเฉพาะไฟล์ไบนารีที่คอมไพล์เสร็จแล้ว)\n# =============================================================================\nFROM alpine:3.19\nWORKDIR /app\n\nCOPY --from=builder /app/main .\nCOPY app.env .\nCOPY db/migration ./db/migration\n\nEXPOSE 8080\nCMD [ \"/app/main\" ]"
        },
        {
          "t": "h2",
          "c": "3. สร้างไฟล์ docker-compose.yml เพื่อรันทั้งระบบในคำสั่งเดียว"
        },
        {
          "t": "code",
          "lang": "yaml",
          "label": "simplebank/docker-compose.yml",
          "c": "version: \"3.9\"\n\nservices:\n  postgres:\n    image: postgres:16-alpine\n    environment:\n      - POSTGRES_USER=root\n      - POSTGRES_PASSWORD=secret\n      - POSTGRES_DB=simple_bank\n    ports:\n      - \"5432:5432\"\n\n  api:\n    build:\n      context: .\n      dockerfile: Dockerfile\n    ports:\n      - \"8080:8080\"\n    environment:\n      - DB_SOURCE=postgresql://root:secret@postgres:5432/simple_bank?sslmode=disable\n    depends_on:\n      - postgres"
        },
        {
          "t": "h2",
          "c": "4. พิสูจน์การทำงานครบวงจรด้วยสคริปต์ End-to-End Verification"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "รันทดสอบระบบตั้งแต่สมัครสมาชิก ล็อกอิน เปิดบัญชี โอนเงิน และดักจับการแอบโอนเงิน",
          "code": "chmod +x test_e2e.sh && ./test_e2e.sh",
          "out": "========================================================\n🚀 เริ่มต้นการทดสอบ SIMPLE BANK END-TO-END VERIFICATION\n========================================================\n[1/6] สมัครสมาชิกผู้ใช้งานใหม่ (POST /users)...\n  ✅ สร้างผู้ใช้ alice และ bob สำเร็จ\n[2/6] เข้าสู่ระบบเพื่อรับ Token (POST /users/login)...\n  ✅ Alice และ Bob ได้รับ PASETO Token สำเร็จ\n[3/6] เปิดบัญชีเงินฝากสกุล USD (POST /accounts)...\n  ✅ เปิดบัญชีสำเร็จ: บัญชี Alice ID = 1, บัญชี Bob ID = 2\n[4/6] ฝากเงินตั้งต้นให้ Alice 1,000 USD...\n  ✅ เติมเงินตั้งต้น 1,000 USD สำเร็จ\n[5/6] Alice สั่งโอนเงิน 100 USD ไปยัง Bob (POST /transfers)...\n  ✅ โอนเงินสำเร็จ! Alice balance = 900 USD, Bob balance = 100 USD\n[6/6] ทดสอบเกราะป้องกันความปลอดภัย...\n  🛡️ ดักจับได้สมบูรณ์: Bob พยายามแอบโอนเงินของ Alice -> HTTP 401 Unauthorized\n  🛡️ ดักจับได้สมบูรณ์: Alice พยายามโอนเกินยอดคงเหลือ -> Auto Rollback สำเร็จ\n========================================================\n🎉 สรุปผลการทดสอบ: ระบบ SIMPLE BANK ผ่านมาตรฐาน END-TO-END 100%!\n========================================================"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• ขอแสดงความยินดีด้วยครับ! คุณได้สร้างระบบ Simple Bank ตั้งแต่วางโครงสร้างฐานข้อมูลจนถึงการแพ็กขึ้น Docker ระดับ Production สำเร็จครบ 100% แล้ว\n• **ก้าวสุดท้าย (บทที่ 8.1)**: เราจะสรุปองค์ความรู้ทั้งหมดเป็น **แนวคำตอบสัมภาษณ์งาน 10 ข้อสำคัญ** และผังสถาปัตยกรรมระดับ Enterprise เพื่อเตรียมตัวเข้าสู่สนามสัมภาษณ์งานจริงกันครับ!"
        }
      ],
      "en": []
    }
  }
};
