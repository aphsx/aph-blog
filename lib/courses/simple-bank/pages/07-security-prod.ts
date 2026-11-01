import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/07-security-prod.ts
// โมดูล 7: ความปลอดภัย & รันจริงระดับ Production
// บทเรียน: 7.1 bank-user-auth-bcrypt, 7.2 bank-jwt-paseto-token, 7.3 bank-config-docker-prod
// =============================================================================

export const securityProdPages: Record<string, Page> = {
  "bank-user-auth-bcrypt": {
    slug: "bank-user-auth-bcrypt",
    title: {
      th: "7.1 ระบบผู้ใช้งาน & แฮชรหัสผ่านด้วย Bcrypt",
      en: "7.1 User System & Password Hashing with Bcrypt",
    },
    lead: {
      th: "ยกระดับระบบธนาคารให้ปลอดภัยด้วยตาราง Users — เรียนรู้การเก็บรหัสผ่านอย่างถูกวิธีด้วย Bcrypt (Salt & Work Factor) และผูกความเป็นเจ้าของบัญชีด้วย Foreign Key",
      en: "Why MD5/SHA fail for credentials — master Bcrypt salts and work factors, create Users table, and link accounts via foreign keys.",
    },
    group: "7. ความปลอดภัย & รันจริงระดับ Production",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• เข้าใจหลักการเก็บรหัสผ่านที่ปลอดภัย (ทำไมห้ามเก็บแบบ Plaintext หรือใช้ MD5/SHA-256 และทำไมต้องใช้ Bcrypt)\n• ใช้งาน `golang.org/x/crypto/bcrypt` แฮชรหัสผ่านด้วย Salt สุ่มและปรับระดับ Work Factor\n• สร้างตาราง `users` พร้อม Migration ผูก Foreign Key กับ `accounts` และบังคับ 1 คนมีได้ 1 บัญชีต่อสกุลเงิน\n\n⏱ **เวลาในการเรียนรู้**: ~25 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านโมดูล 6 เปิด REST API",
        },
        {
          "t": "h2",
          "c": "1. จากชื่อลอยๆ สู่ระบบ Users และการเก็บรหัสผ่านที่ปลอดภัย",
        },
        {
          "t": "p",
          "c": "ในโมดูลที่ 1–6 ที่ผ่านมา ตาราง `accounts` ของเรามีแค่ฟิลด์ `owner` ที่ใครจะพิมพ์ชื่อใครลงไปก็ได้ (`\"alice\"`, `\"bob\"`) โดยไม่มีระบบสมาชิกหรือรหัสผ่านยืนยันตัวตนเลย ทำให้ตอนนี้ **ใครๆ ก็สามารถยิง API สั่งโอนเงินออกจากบัญชีของคนอื่นได้!**\n\nดังนั้น ก้าวแรกของการทำระบบ Security คือเราต้องสร้างตาราง **`users`** เพื่อเก็บข้อมูลผู้ใช้งานและ **รหัสผ่าน (Password)** แต่กฎเหล็กอันดับหนึ่งของโลก Backend คือ **ห้ามเก็บรหัสผ่านเป็นข้อความธรรมดา (Plaintext) ลงฐานข้อมูลเด็ดขาด** เพราะถ้าฐานข้อมูลรั่วไหล รหัสผ่านของลูกค้าทุกคนจะหลุดทันที!\n\nวิธีที่ถูกต้องคือต้องนำรหัสผ่านไปแปลงเป็นรหัสยึกยือที่ไม่สามารถย้อนกลับได้ หรือที่เรียกว่า **การแฮช (Hashing)** เสียก่อน — แต่คำถามสำคัญคือ *\"เราควรใช้อัลกอริทึมตัวไหนแฮชรหัสผ่าน?\"*",
        },
        {
          "t": "callout",
          "title": "⚠️ ทำไมถึงห้ามใช้ MD5 หรือ SHA-256 แล้วต้องใช้ Bcrypt แทน?",
          "c": "หลายคนอาจนึกถึงฟังก์ชันแฮชคุ้นหูอย่าง **MD5** หรือ **SHA-256** แต่ฟังก์ชันเหล่านั้นถูกออกแบบมาเพื่อ **'คำนวณให้เร็วที่สุด'** สำหรับตรวจเช็กความสมบูรณ์ของไฟล์ (Checksum) ซึ่งเมื่อนำมาใช้กับรหัสผ่าน **ยิ่งคำนวณเร็ว = ยิ่งอันตราย** เพราะแฮกเกอร์สามารถใช้การ์ดจอ (GPU) สุ่มเดารหัสผ่าน (Brute-force) ได้เป็นพันล้านครั้งต่อวินาที หรือเทียบกับตารางแฮชสำเร็จรูป (Rainbow Table) ได้ทันที\n\nสำหรับรหัสผ่าน เราจึงต้องใช้ **Bcrypt (Slow Hashing Algorithm)** ที่ออกแบบมาเพื่อแก้ปัญหานี้โดยเฉพาะด้วย 2 กลไกหลัก:\n1. **Cryptographic Salt (เกลือสุ่ม)**: Bcrypt จะสุ่มสตริงความยาว 16 ไบต์ผสมเข้าไปในรหัสผ่านทุกครั้งก่อนแฮช ต่อให้ผู้ใช้ 2 คนตั้งรหัสผ่านว่า `123456` เหมือนกันเป๊ะ ค่า Hash ที่เก็บลงฐานข้อมูลก็จะออกมาไม่เหมือนกันเลย ป้องกัน Rainbow Table ได้ 100%\n2. **Configurable Work Factor (Cost / ความหน่วงที่ปรับได้)**: เราตั้งค่าได้ว่าต้องวนลูปคำนวณซ้ำกี่รอบ (ค่ามาตรฐานคือ Cost 10 หรือ $2^{10} = 1,024$ รอบ) ทำให้การแฮช 1 ครั้งใช้เวลาราว ~100 มิลลิวินาที ซึ่งผู้ใช้ทั่วไปกดล็อกอินจะไม่รู้สึกช้าเลย แต่ถ้าแฮกเกอร์จะสุ่มเดาพันล้านครั้ง จะต้องใช้เวลาหลายร้อยปี!",
        },
        {
          "t": "h2",
          "c": "2. เขียนฟังก์ชันแฮชรหัสผ่าน (util/password.go)",
        },
        {
          "t": "p",
          "c": "ติดตั้งแพ็กเกจ `golang.org/x/crypto/bcrypt` แล้วสร้างไฟล์ `simplebank/util/password.go`:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ติดตั้งไลบรารี bcrypt",
          "code": "go get golang.org/x/crypto/bcrypt",
          "out": "go: added golang.org/x/crypto v0.45.0",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/password.go",
          "c": "package util\n\nimport (\n\t\"fmt\"\n\n\t\"golang.org/x/crypto/bcrypt\"\n)\n\n// HashPassword hashes password using bcrypt\nfunc HashPassword(password string) (string, error) {\n\thashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)\n\tif err != nil {\n\t\treturn \"\", fmt.Errorf(\"failed to hash password: %w\", err)\n\t}\n\treturn string(hashed), nil\n}\n\n// CheckPassword compares password with hash\nfunc CheckPassword(password, hashed string) error {\n\treturn bcrypt.CompareHashAndPassword([]byte(hashed), []byte(password))\n}",
        },
        {
          "t": "ul",
          "c": [
            "**`bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)`**: คำสั่งของแพ็กเกจ `bcrypt` ที่รับรหัสผ่านแบบ `[]byte` เข้าไปสุ่มผสม Salt และแฮชตามระดับความยากมาตรฐาน (`bcrypt.DefaultCost` คือ Cost 10)",
            "**`bcrypt.CompareHashAndPassword([]byte(hashed), []byte(password))`**: คำสั่งสำหรับตรวจสอบตอนล็อกอิน โดยมันจะดึงค่า Salt ที่ฝังอยู่ใน `hashed` ออกมาคำนวณเทียบกับ `password` ที่ผู้ใช้กรอก หากตรงกันจะคืนค่า `nil` (ไม่มี Error)",
          ],
        },
        {
          "t": "h2",
          "c": "3. เพิ่มตาราง Users ด้วย Migration",
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ Migration คู่ที่ 2 (`000002_add_users.up.sql` และ `000002_add_users.down.sql`) เพื่อสร้างตาราง `users` และผูก Foreign Key เข้ากับ `accounts`:",
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/migration/000002_add_users.up.sql",
          "c": "CREATE TABLE users (\n  username        varchar     PRIMARY KEY,\n  hashed_password varchar     NOT NULL,\n  full_name       varchar     NOT NULL,\n  email           varchar     UNIQUE NOT NULL,\n  created_at      timestamptz NOT NULL DEFAULT now()\n);\n\n-- link account ownership to users table\nALTER TABLE accounts ADD FOREIGN KEY (owner) REFERENCES users (username);\n\n-- ensure one account per currency for each owner\nALTER TABLE accounts ADD CONSTRAINT owner_currency_key UNIQUE (owner, currency);",
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/migration/000002_add_users.down.sql",
          "c": "ALTER TABLE IF EXISTS accounts DROP CONSTRAINT IF EXISTS owner_currency_key;\nALTER TABLE IF EXISTS accounts DROP CONSTRAINT IF EXISTS accounts_owner_fkey;\nDROP TABLE IF EXISTS users;",
        },
        {
          "t": "callout",
          "title": "⚠️ ข้อควรระวัง: ล้างข้อมูลทดสอบเก่าก่อนรัน make migrateup",
          "c": "เนื่องจากในโมดูลที่ 3–6 เราสร้างบัญชีทดสอบไว้ในฐานข้อมูล ซึ่งชื่อเจ้าของบัญชีเหล่านั้นยังไม่มีตัวตนอยู่ในตาราง `users` ใหม่ หากสั่ง `make migrateup` ทันที PostgreSQL จะปฏิเสธและฟ้อง Error ว่า `violates foreign key constraint \"accounts_owner_fkey\"` ทันที!\n\nให้เปิด Terminal แล้วสั่งล้างข้อมูลเก่า (พร้อมรีเซ็ตเลข `id` ด้วย `RESTART IDENTITY`) ออกก่อนรัน Migrate เสมอ:\n```bash\ndocker exec -it postgres16 psql -U root -d simple_bank -c \"TRUNCATE TABLE entries, transfers, accounts RESTART IDENTITY CASCADE;\"\nmake migrateup\n```",
        },
        {
          "t": "h2",
          "c": "4. สร้างชั้นฐานข้อมูล (db/user.go) และเปิด API สมัครสมาชิก (api/user.go)",
        },
        {
          "t": "p",
          "c": "เมื่อมีตาราง `users` ในฐานข้อมูลแล้ว เราจะไล่สร้างโค้ดตามโครงสร้าง 3 เลเยอร์เดิม คือเริ่มจากนิยาม Struct ใน `db/models.go` → เขียนคำสั่ง SQL ใน `db/user.go` → สร้าง HTTP Handler ใน `api/user.go` → และลงทะเบียน Route `POST /users` ใน `api/server.go`\n\nเริ่มจากเพิ่ม Struct `User` ต่อท้ายในไฟล์ `simplebank/db/models.go` โดยมีจุดสำคัญด้านความปลอดภัยคือ **ห้ามส่ง Hashed Password ออกไปใน JSON Response เด็ดขาด** (ใช้แท็ก `json:\"-\"`):",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/models.go (ฉบับสมบูรณ์: เพิ่ม User struct ต่อท้าย)",
          "c": "package db\n\nimport \"time\"\n\ntype Account struct {\n\tID        int64     `json:\"id\"`\n\tOwner     string    `json:\"owner\"`\n\tBalance   int64     `json:\"balance\"`\n\tCurrency  string    `json:\"currency\"`\n\tCreatedAt time.Time `json:\"created_at\"`\n}\n\ntype Entry struct {\n\tID        int64     `json:\"id\"`\n\tAccountID int64     `json:\"account_id\"`\n\tAmount    int64     `json:\"amount\"`\n\tCreatedAt time.Time `json:\"created_at\"`\n}\n\ntype Transfer struct {\n\tID            int64     `json:\"id\"`\n\tFromAccountID int64     `json:\"from_account_id\"`\n\tToAccountID   int64     `json:\"to_account_id\"`\n\tAmount        int64     `json:\"amount\"`\n\tCreatedAt     time.Time `json:\"created_at\"`\n}\n\ntype User struct {\n\tUsername       string    `json:\"username\"`\n\tHashedPassword string    `json:\"-\"` // exclude from JSON\n\tFullName       string    `json:\"full_name\"`\n\tEmail          string    `json:\"email\"`\n\tCreatedAt      time.Time `json:\"created_at\"`\n}",
        },
        {
          "t": "p",
          "c": "ขั้นต่อมา สร้างไฟล์ `simplebank/db/user.go` เพื่อผูกฟังก์ชัน SQL `CreateUser` และ `GetUser` เข้ากับ `*Queries` (ซึ่งจะทำให้ `server.store` เรียกใช้ทั้งสองฟังก์ชันนี้ได้ทันทีผ่าน Struct Embedding ใน `Store`):",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/user.go",
          "c": "package db\n\nimport \"context\"\n\ntype CreateUserParams struct {\n\tUsername       string\n\tHashedPassword string\n\tFullName       string\n\tEmail          string\n}\n\nfunc (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {\n\tconst query = `\n\t\tINSERT INTO users (username, hashed_password, full_name, email)\n\t\tVALUES ($1, $2, $3, $4)\n\t\tRETURNING username, hashed_password, full_name, email, created_at\n\t`\n\n\trow := q.db.QueryRowContext(ctx, query, arg.Username, arg.HashedPassword, arg.FullName, arg.Email)\n\tvar u User\n\terr := row.Scan(&u.Username, &u.HashedPassword, &u.FullName, &u.Email, &u.CreatedAt)\n\treturn u, err\n}\n\nfunc (q *Queries) GetUser(ctx context.Context, username string) (User, error) {\n\tconst query = `\n\t\tSELECT username, hashed_password, full_name, email, created_at\n\t\tFROM users\n\t\tWHERE username = $1\n\t`\n\n\trow := q.db.QueryRowContext(ctx, query, username)\n\tvar u User\n\terr := row.Scan(&u.Username, &u.HashedPassword, &u.FullName, &u.Email, &u.CreatedAt)\n\treturn u, err\n}",
        },
        {
          "t": "p",
          "c": "จากนั้น สร้างไฟล์ `simplebank/api/user.go` เพื่อเป็นด่านหน้ารับ JSON จากผู้สมัคร นำรหัสผ่านไปแฮชด้วย `util.HashPassword` แล้วเรียก `server.store.CreateUser` จาก `db/user.go` ให้บันทึกลงฐานข้อมูล:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/user.go (ส่วน createUser)",
          "c": "package api\n\nimport (\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n\t\"simplebank/util\"\n)\n\ntype createUserRequest struct {\n\tUsername string `json:\"username\" binding:\"required,alphanum\"`\n\tPassword string `json:\"password\" binding:\"required,min=6\"`\n\tFullName string `json:\"full_name\" binding:\"required\"`\n\tEmail    string `json:\"email\" binding:\"required,email\"`\n}\n\nfunc (server *Server) createUser(ctx *gin.Context) {\n\tvar req createUserRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\thashedPassword, err := util.HashPassword(req.Password)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tuser, err := server.store.CreateUser(ctx, db.CreateUserParams{\n\t\tUsername:       req.Username,\n\t\tHashedPassword: hashedPassword,\n\t\tFullName:       req.FullName,\n\t\tEmail:          req.Email,\n\t})\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, user)\n}",
        },
        {
          "t": "ul",
          "c": [
            "**แท็ก Validation สำหรับข้อมูลผู้ใช้**:\n  • `binding:\"required,alphanum\"`: บังคับว่า `username` ต้องเป็นตัวอักษรภาษาอังกฤษหรือตัวเลขเท่านั้น (ห้ามมีเว้นวรรคหรืออักขระพิเศษ)\n  • `binding:\"required,min=6\"`: บังคับรหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร\n  • `binding:\"required,email\"`: ตรวจสอบรูปแบบอีเมลมาตรฐาน (ต้องมี `@` และโดเมนถูกต้อง)",
            "**การทำงานร่วมกันของ `api/user.go` และ `db/user.go`**: เช่นเดียวกับระบบบัญชี ไฟล์ `api/user.go` ทำหน้าที่รับ JSON และนำรหัสผ่านไปแฮชด้วย `util.HashPassword` ก่อนส่งต่อให้ `server.store.CreateUser(...)` (ซึ่งก็คือฟังก์ชันใน `db/user.go` ที่สืบทอดมาอยู่ใน `Store`) บันทึกลง PostgreSQL",
            "**ความปลอดภัยตอนส่งกลับ `ctx.JSON(http.StatusOK, user)`**: เนื่องจากใน `db/models.go` เราใส่แท็ก `` `json:\"-\"` `` ไว้ที่ฟิลด์ `HashedPassword` ตอนที่ Gin แปลง `user` เป็น JSON ส่งกลับไปหาลูกค้า ฟิลด์รหัสผ่านจึงถูกตัดทิ้งโดยอัตโนมัติ 100%",
          ],
        },
        {
          "t": "p",
          "c": "**ผูกเส้นทาง `POST /users` ในไฟล์ `simplebank/api/server.go`:**\nเปิดไฟล์ `simplebank/api/server.go` แล้วเพิ่มบรรทัด **`router.POST(\"/users\", server.createUser)`** เข้าไปใน `NewServer` เพื่อให้เปิดรับการสมัครสมาชิกผ่าน API ได้ทันที:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/server.go (เพิ่ม router.POST(\"/users\", server.createUser))",
          "c": "package api\n\nimport (\n\t\"github.com/gin-gonic/gin\"\n\t\"github.com/gin-gonic/gin/binding\"\n\t\"github.com/go-playground/validator/v10\"\n\tdb \"simplebank/db\"\n)\n\ntype Server struct {\n\tstore  *db.Store\n\trouter *gin.Engine\n}\n\nfunc NewServer(store *db.Store) *Server {\n\tserver := &Server{store: store}\n\trouter := gin.Default()\n\n\tif v, ok := binding.Validator.Engine().(*validator.Validate); ok {\n\t\tv.RegisterValidation(\"currency\", validCurrency)\n\t}\n\n\trouter.POST(\"/users\", server.createUser)\n\trouter.POST(\"/accounts\", server.createAccount)\n\trouter.GET(\"/accounts/:id\", server.getAccount)\n\trouter.GET(\"/accounts\", server.listAccounts)\n\trouter.POST(\"/transfers\", server.createTransfer)\n\n\tserver.router = router\n\treturn server\n}\n\nfunc (server *Server) Start(address string) error {\n\treturn server.router.Run(address)\n}\n\nfunc errorResponse(err error) gin.H {\n\treturn gin.H{\"error\": err.Error()}\n}",
        },
        {
          "t": "callout",
          "title": "🧪 อัปเดต createRandomAccount ใน db/account_test.go ให้รองรับ Foreign Key ใหม่",
          "c": "เมื่อเราเพิ่มกฎ Foreign Key บังคับว่า `accounts.owner` ต้องมีตัวตนอยู่ในตาราง `users` เสมอ หากเราสั่งรัน `make test` ตอนนี้ ฟังก์ชัน `createRandomAccount` เดิมใน `simplebank/db/account_test.go` ที่สุ่มชื่อลอยๆ (`util.RandomOwner()`) จะพังด้วย Error `violates foreign key constraint` ทันที!\n\nเปิดไฟล์ `simplebank/db/account_test.go` แล้วแก้ไข **2 จุด** ดังนี้ครับ:\n1. **➕ เพิ่มฟังก์ชัน `createRandomUser(t *testing.T) User`**: สำหรับสุ่มสร้างผู้ใช้ใหม่ (พร้อมแฮชรหัสผ่านด้วย `util.HashPassword`) ลงตาราง `users` จริงเสียก่อน\n2. **✏️ แก้ฟังก์ชัน `createRandomAccount`**: เพิ่มบรรทัด `user := createRandomUser(t)` ด้านบนสุด แล้วเปลี่ยนตรง `CreateAccountParams` จากเดิม `Owner: util.RandomOwner()` ให้กลายเป็น **`Owner: user.Username`** (ส่วนฟังก์ชันเทสต์ตัวอื่นๆ ด้านล่างคงไว้เหมือนเดิมทั้งหมด):",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account_test.go (ฉบับสมบูรณ์: รองรับ Foreign Key ของตาราง users)",
          "c": "package db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"testing\"\n\n\t\"github.com/stretchr/testify/require\"\n\t\"simplebank/util\"\n)\n\nfunc createRandomUser(t *testing.T) User {\n\thashedPassword, err := util.HashPassword(util.RandomString(6))\n\trequire.NoError(t, err)\n\n\targ := CreateUserParams{\n\t\tUsername:       util.RandomOwner(),\n\t\tHashedPassword: hashedPassword,\n\t\tFullName:       util.RandomOwner(),\n\t\tEmail:          util.RandomString(6) + \"@email.com\",\n\t}\n\n\tuser, err := testQueries.CreateUser(context.Background(), arg)\n\trequire.NoError(t, err)\n\treturn user\n}\n\nfunc createRandomAccount(t *testing.T) Account {\n\tuser := createRandomUser(t)\n\n\targ := CreateAccountParams{\n\t\tOwner:    user.Username, // ผูกกับ user ที่สร้างจริงในตาราง users\n\t\tBalance:  util.RandomMoney(),\n\t\tCurrency: util.RandomCurrency(),\n\t}\n\n\taccount, err := testQueries.CreateAccount(context.Background(), arg)\n\trequire.NoError(t, err)\n\trequire.NotEmpty(t, account)\n\trequire.Equal(t, arg.Owner, account.Owner)\n\trequire.Equal(t, arg.Balance, account.Balance)\n\trequire.Equal(t, arg.Currency, account.Currency)\n\trequire.NotZero(t, account.ID)\n\trequire.NotZero(t, account.CreatedAt)\n\treturn account\n}\n\nfunc TestCreateAccount(t *testing.T) {\n\tcreateRandomAccount(t)\n}\n\nfunc TestGetAccount(t *testing.T) {\n\tacc1 := createRandomAccount(t)\n\tacc2, err := testQueries.GetAccount(context.Background(), acc1.ID)\n\trequire.NoError(t, err)\n\trequire.Equal(t, acc1.ID, acc2.ID)\n\trequire.Equal(t, acc1.Owner, acc2.Owner)\n\trequire.Equal(t, acc1.Balance, acc2.Balance)\n}\n\nfunc TestAddAccountBalance(t *testing.T) {\n\tacc1 := createRandomAccount(t)\n\tacc2, err := testQueries.AddAccountBalance(context.Background(), AddAccountBalanceParams{\n\t\tID:     acc1.ID,\n\t\tAmount: 10,\n\t})\n\trequire.NoError(t, err)\n\trequire.Equal(t, acc1.Balance+10, acc2.Balance)\n}\n\nfunc TestDeleteAccount(t *testing.T) {\n\tacc1 := createRandomAccount(t)\n\terr := testQueries.DeleteAccount(context.Background(), acc1.ID)\n\trequire.NoError(t, err)\n\n\tacc2, err := testQueries.GetAccount(context.Background(), acc1.ID)\n\trequire.ErrorIs(t, err, sql.ErrNoRows)\n\trequire.Empty(t, acc2)\n}",
        },
        {
          "t": "h2",
          "c": "5. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ทำไมเราจึงไม่สามารถตรวจสอบรหัสผ่านโดยการเอา plaintext password ไปแฮชใหม่แล้วเทียบ hashed1 == hashed2 ตรงๆ ได้?",
              "options": [
                {
                  "text": "เพราะ Bcrypt สุ่ม Salt ใหม่ทุกครั้งที่แฮช ทำให้สตริงแฮชที่ได้เปลี่ยนไปเสมอ จึงต้องใช้ bcrypt.CompareHashAndPassword",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! Bcrypt ฝัง Salt และ Cost เอาไว้ในผลลัพธ์แฮช การเทียบรหัสต้องใช้ CompareHashAndPassword เพื่อดึง Salt เดิมมาประมวลผลเทียบกัน"
                },
                {
                  "text": "เพราะสตริงในภาษา Go ไม่รองรับการเปรียบเทียบด้วยเครื่องหมาย ==",
                  "isCorrect": false,
                  "explain": "ผิด ภาษา Go สามารถเทียบสตริงด้วย == ได้ตามปกติ"
                },
                {
                  "text": "เพราะ Bcrypt แฮชได้เฉพาะตัวเลข ไม่รองรับตัวอักษร",
                  "isCorrect": false,
                  "explain": "ไม่จริง Bcrypt รับรหัสผ่านเป็น []byte ซึ่งรองรับตัวอักษรและอักขระพิเศษทุกรูปแบบ"
                }
              ],
              "explain": "การใส่ Salt ช่วยป้องกันการโจมตีแบบ Rainbow Table ได้อย่างมีประสิทธิภาพสูงสุด"
            }
          ]
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "ผู้ใช้สมัครสมาชิกได้แล้ว! ในบทที่ **7.2 ยืนยันตัวตนด้วย PASETO Token & Gin Middleware** เราจะมาสร้างระบบล็อกอิน ออก Token และสร้าง Middleware ป้องกันไม่ให้ใครมาแอบดึงข้อมูลบัญชีคนอื่นกันครับ",
        },
      ],
      en: [],
    },
  },

  "bank-jwt-paseto-token": {
    slug: "bank-jwt-paseto-token",
    title: {
      th: "7.2 ยืนยันตัวตนด้วย PASETO Token & Gin Middleware",
      en: "7.2 Authentication with PASETO Tokens & Gin Middleware",
    },
    lead: {
      th: "สร้างระบบล็อกอินและบัตรผ่านดิจิทัล — ทำความเข้าใจ Token-based Authentication ด้วย PASETO (และทำไมถึงปลอดภัยกว่า JWT) พร้อมสร้าง Gin Middleware ป้องกันสิทธิ์การโอนเงิน",
      en: "Why modern backends prefer PASETO over JWT — build a secure PasetoMaker, login endpoint, and Gin auth middleware.",
    },
    group: "7. ความปลอดภัย & รันจริงระดับ Production",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• เข้าใจหลักการทำงานของ Token-based Authentication และเหตุผลที่ PASETO ปลอดภัยกว่า JWT\n• สร้าง `PasetoMaker` เพื่อเข้ารหัสและถอดรหัสบัตรผ่าน (`Payload`) ด้วยกุญแจ Symmetric Key 32 ไบต์\n• สร้าง Gin Middleware สกัด Token จาก Header `Authorization: Bearer <token>` และป้องกันไม่ให้ผู้ใช้เข้าถึงหรือโอนเงินจากบัญชีของคนอื่น\n\n⏱ **เวลาในการเรียนรู้**: ~25 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านบท 7.1 การแฮชรหัสผ่านด้วย Bcrypt",
        },
        {
          "t": "h2",
          "c": "1. จากการสมัครสมาชิก สู่ระบบล็อกอินและบัตรผ่านดิจิทัล (Token)",
        },
        {
          "t": "p",
          "c": "ในบทที่ 7.1 เราสร้างตาราง `users` และเปิด API ให้ลูกค้าสมัครสมาชิก (`POST /users`) พร้อมแฮชรหัสผ่านเก็บลงฐานข้อมูลเรียบร้อยแล้ว แต่คำถามต่อมาคือ **เวลาลูกค้าจะกดเปิดบัญชี ดูยอดเงิน หรือสั่งโอนเงิน ระบบจะรู้ได้อย่างไรว่าใครเป็นคนยิงคำขอเข้ามา?**\n\nครั้นจะให้ผู้ใช้ส่ง `username` กับ `password` แนบมากับทุกๆ คำขอโอนเงินก็คงอันตรายและไม่สะดวกอย่างยิ่ง ในระบบ Backend สมัยใหม่เราจึงใช้แนวคิด **Token-based Authentication (บัตรผ่านดิจิทัล)** ซึ่งทำงานเป็น 2 จังหวะ:\n1. **จังหวะล็อกอิน (`POST /users/login`)**: ผู้ใช้ส่ง `username` และ `password` มาตรวจสอบแค่ครั้งเดียว ถ้ารหัสผ่านถูกต้อง เซิร์ฟเวอร์จะออก **'บัตรผ่านดิจิทัล (Access Token)'** ที่มีการเข้ารหัสชื่อผู้ใช้และวันหมดอายุไว้ข้างในส่งกลับไปให้\n2. **จังหวะใช้งานจริง (`/accounts`, `/transfers`)**: ทุกครั้งที่ผู้ใช้จะทำรายการสำคัญ ให้แนบบัตรผ่านนี้มาใน HTTP Header (`Authorization: Bearer <token>`) โดยมีด่านตรวจหน้าประตู (**Middleware**) คอยตรวจความถูกต้องของบัตรก่อนอนุญาตให้เข้าถึงข้อมูล",
        },
        {
          "t": "callout",
          "title": "🛡️ ทำไมเราถึงเลือกใช้ PASETO แทนที่จะเป็น JWT?",
          "c": "เมื่อพูดถึง Token หลายคนมักนึกถึง **JWT (JSON Web Token)** เป็นชื่อแรก แต่ในความจริง JWT มีจุดอ่อนด้านการออกแบบที่ทำให้ระบบเสี่ยงต่อการถูกเจาะได้ง่าย:\n• **JWT เปิดให้ Client เลือก Algorithm เองได้**: ใน Header ของ JWT มีฟิลด์ `\"alg\"` ซึ่งในอดีตเคยเกิดช่องโหว่คลาสสิกที่แฮกเกอร์แอบแก้เป็น `\"alg\": \"none\"` (ไม่ต้องตรวจลายเซ็น) หรือสลับระหว่าง RSA กับ HMAC จนเซิร์ฟเวอร์หลงเชื่อว่าบัตรปลอมเป็นบัตรจริง\n• **ข้อมูลใน JWT ไม่ได้ถูกเข้ารหัส**: Payload ของ JWT เป็นเพียงการแปลง Base64 ธรรมดา ใครที่ดักจับ Token ได้สามารถถอดรหัสส่องดูข้อมูลข้างในได้ทันทีโดยไม่ต้องมีกุญแจลับ\n\nในโปรเจกต์นี้เราจึงเลือกใช้มาตรฐานใหม่อย่าง **PASETO (Platform-Agnostic Security Tokens)** ที่ถูกสร้างขึ้นมาเพื่ออุดช่องโหว่ของ JWT โดยเฉพาะ:\n1. **บังคับมาตรฐานการเข้ารหัสที่ปลอดภัยตายตัว**: ไม่เปิดช่องให้ผู้ใช้งานเลือก `alg` เอง ตัดปัญหาช่องโหว่ `alg: none` ทิ้ง 100%\n2. **เข้ารหัสข้อมูลทั้งก้อน (Encrypted Payload)**: ในโหมด Local (`v4.local`) ตัว Token จะถูกเข้ารหัสด้วยอัลกอริทึม **XChaCha20-Poly1305** ทำให้ไม่มีใครสามารถปลอมแปลงหรือแอบเปิดดูข้อมูลข้างในบัตรผ่านได้เลยหากไม่มีกุญแจลับของเซิร์ฟเวอร์!",
        },
        {
          "t": "h2",
          "c": "2. สร้าง PasetoMaker (token/paseto_maker.go)",
        },
        {
          "t": "p",
          "c": "ใน PASETO เวอร์ชัน 4 โหมด Local (`v4.local`) ระบบใช้อัลกอริทึมเข้ารหัสแบบสมมาตร **XChaCha20-Poly1305** ซึ่งมีกฎเหล็กด้านความปลอดภัยว่า **กุญแจลับ (Symmetric Key) จะต้องมีความยาวเท่ากับ 32 ไบต์ (256 บิต) พอดีเป๊ะ!** หากส่งคีย์ที่สั้นหรือยาวกว่า 32 ไบต์เข้าไป ฟังก์ชัน `V4SymmetricKeyFromBytes` จะปฏิเสธและคืนค่า Error ทันทีเพื่อป้องกันการใช้คีย์ที่อ่อนแอ",
        },
        {
          "t": "p",
          "c": "ติดตั้งแพ็กเกจ `aidanwoods.dev/go-paseto` แล้วสร้างไฟล์ `simplebank/token/paseto_maker.go` โดยแบ่งออกเป็น 2 ส่วน:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ติดตั้งไลบรารี go-paseto",
          "code": "go get aidanwoods.dev/go-paseto",
          "out": "go: added aidanwoods.dev/go-paseto v1.6.0",
        },
        {
          "t": "p",
          "c": "**ส่วนที่ 2.1: โครงสร้าง `Payload` และฟังก์ชัน `NewPasetoMaker`**\nตรวจสอบความยาวกุญแจลับให้ครบ 32 ไบต์ตั้งแต่วินาทีแรกที่สร้าง:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/token/paseto_maker.go (ส่วนที่ 1: Payload และ NewPasetoMaker)",
          "c": "package token\n\nimport (\n\t\"errors\"\n\t\"time\"\n\n\t\"aidanwoods.dev/go-paseto\"\n)\n\nvar (\n\tErrInvalidToken = errors.New(\"token is invalid\")\n\tErrExpiredToken = errors.New(\"token has expired\")\n)\n\ntype Payload struct {\n\tUsername  string    `json:\"username\"`\n\tIssuedAt  time.Time `json:\"issued_at\"`\n\tExpiredAt time.Time `json:\"expired_at\"`\n}\n\ntype PasetoMaker struct {\n\tkey paseto.V4SymmetricKey\n}\n\nfunc NewPasetoMaker(symmetricKey string) (*PasetoMaker, error) {\n\tkey, err := paseto.V4SymmetricKeyFromBytes([]byte(symmetricKey))\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\treturn &PasetoMaker{key: key}, nil\n}",
        },
        {
          "t": "p",
          "c": "**ส่วนที่ 2.2: เมธอด `CreateToken` (เข้ารหัสออกบัตรผ่าน) และ `VerifyToken` (ถอดรหัสและเช็กวันหมดอายุ)**\nเขียนต่อท้ายลงในไฟล์ `simplebank/token/paseto_maker.go`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/token/paseto_maker.go (ส่วนที่ 2: CreateToken และ VerifyToken)",
          "c": "func (m *PasetoMaker) CreateToken(username string, duration time.Duration) (string, *Payload, error) {\n\tnow := time.Now()\n\tpayload := &Payload{\n\t\tUsername:  username,\n\t\tIssuedAt:  now,\n\t\tExpiredAt: now.Add(duration),\n\t}\n\n\tt := paseto.NewToken()\n\tt.SetIssuedAt(payload.IssuedAt)\n\tt.SetExpiration(payload.ExpiredAt)\n\tt.SetString(\"username\", username)\n\n\treturn t.V4Encrypt(m.key, nil), payload, nil\n}\n\nfunc (m *PasetoMaker) VerifyToken(tokenString string) (*Payload, error) {\n\tparser := paseto.NewParserWithoutExpiryCheck()\n\tt, err := parser.ParseV4Local(m.key, tokenString, nil)\n\tif err != nil {\n\t\treturn nil, ErrInvalidToken\n\t}\n\n\tusername, err := t.GetString(\"username\")\n\tif err != nil {\n\t\treturn nil, ErrInvalidToken\n\t}\n\texpiredAt, _ := t.GetExpiration()\n\tif time.Now().After(expiredAt) {\n\t\treturn nil, ErrExpiredToken\n\t}\n\tissuedAt, _ := t.GetIssuedAt()\n\n\treturn &Payload{\n\t\tUsername:  username,\n\t\tIssuedAt:  issuedAt,\n\t\tExpiredAt: expiredAt,\n\t}, nil\n}",
        },
        {
          "t": "ul",
          "c": [
            "**`paseto.NewToken()` และ `t.V4Encrypt(m.key, nil)`**: คำสั่งของไลบรารี `go-paseto` สำหรับสร้างก้อนข้อมูล บรรจุเวลาออกบัตร (`SetIssuedAt`), วันหมดอายุ (`SetExpiration`), และชื่อผู้ใช้ (`SetString`) จากนั้นสั่ง `V4Encrypt` เข้ารหัสด้วยกุญแจ `m.key` ออกมาเป็นสตริง `v4.local...`",
            "**`paseto.NewParserWithoutExpiryCheck()` และ `parser.ParseV4Local(...)`**: สั่งถอดรหัสสตริง Token ด้วยกุญแจลับ โดยที่เราเลือกใช้ตัวถอดรหัสแบบยังไม่เช็กวันหมดอายุอัตโนมัติ เพื่อให้เราสามารถแยกแยะ Error ได้ชัดเจน 2 กรณี คือ ถอดรหัสไม่ผ่านเลย = **บัตรปลอม (`ErrInvalidToken`)** แต่ถ้าถอดรหัสผ่านแล้วค่อยมาเช็ก `time.Now().After(expiredAt)` เอง = **บัตรจริงแต่หมดอายุแล้ว (`ErrExpiredToken`)**",
          ],
        },
        {
          "t": "p",
          "c": "📄 **โค้ดฉบับเต็มของไฟล์ `simplebank/token/paseto_maker.go` (รวมทั้ง 2 ส่วน พร้อมคัดลอกใช้งาน):**",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/token/paseto_maker.go (ฉบับสมบูรณ์)",
          "c": "package token\n\nimport (\n\t\"errors\"\n\t\"time\"\n\n\t\"aidanwoods.dev/go-paseto\"\n)\n\nvar (\n\tErrInvalidToken = errors.New(\"token is invalid\")\n\tErrExpiredToken = errors.New(\"token has expired\")\n)\n\ntype Payload struct {\n\tUsername  string    `json:\"username\"`\n\tIssuedAt  time.Time `json:\"issued_at\"`\n\tExpiredAt time.Time `json:\"expired_at\"`\n}\n\ntype PasetoMaker struct {\n\tkey paseto.V4SymmetricKey\n}\n\nfunc NewPasetoMaker(symmetricKey string) (*PasetoMaker, error) {\n\tkey, err := paseto.V4SymmetricKeyFromBytes([]byte(symmetricKey))\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\treturn &PasetoMaker{key: key}, nil\n}\n\nfunc (m *PasetoMaker) CreateToken(username string, duration time.Duration) (string, *Payload, error) {\n\tnow := time.Now()\n\tpayload := &Payload{\n\t\tUsername:  username,\n\t\tIssuedAt:  now,\n\t\tExpiredAt: now.Add(duration),\n\t}\n\n\tt := paseto.NewToken()\n\tt.SetIssuedAt(payload.IssuedAt)\n\tt.SetExpiration(payload.ExpiredAt)\n\tt.SetString(\"username\", username)\n\n\treturn t.V4Encrypt(m.key, nil), payload, nil\n}\n\nfunc (m *PasetoMaker) VerifyToken(tokenString string) (*Payload, error) {\n\tparser := paseto.NewParserWithoutExpiryCheck()\n\tt, err := parser.ParseV4Local(m.key, tokenString, nil)\n\tif err != nil {\n\t\treturn nil, ErrInvalidToken\n\t}\n\n\tusername, err := t.GetString(\"username\")\n\tif err != nil {\n\t\treturn nil, ErrInvalidToken\n\t}\n\texpiredAt, _ := t.GetExpiration()\n\tif time.Now().After(expiredAt) {\n\t\treturn nil, ErrExpiredToken\n\t}\n\tissuedAt, _ := t.GetIssuedAt()\n\n\treturn &Payload{\n\t\tUsername:  username,\n\t\tIssuedAt:  issuedAt,\n\t\tExpiredAt: expiredAt,\n\t}, nil\n}",
        },
        {
          "t": "h2",
          "c": "3. สร้าง Authentication Middleware ใน Gin",
        },
        {
          "t": "p",
          "c": "สร้าง Middleware ทำหน้าที่เป็น 'ยามเฝ้าประตู' สกัดอ่าน Header `Authorization: Bearer <token>` หาก Token ไม่ถูกต้องหรือหมดอายุจะตัดจบด้วย HTTP 401 Unauthorized ทันทีใน `simplebank/api/middleware.go`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/middleware.go",
          "c": "package api\n\nimport (\n\t\"errors\"\n\t\"net/http\"\n\t\"strings\"\n\n\t\"github.com/gin-gonic/gin\"\n\t\"simplebank/token\"\n)\n\nconst authPayloadKey = \"auth_payload\"\n\nfunc authMiddleware(tokenMaker *token.PasetoMaker) gin.HandlerFunc {\n\treturn func(ctx *gin.Context) {\n\t\theader := ctx.GetHeader(\"Authorization\")\n\t\tfields := strings.Fields(header)\n\n\t\tif len(fields) != 2 || strings.ToLower(fields[0]) != \"bearer\" {\n\t\t\tctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(errors.New(\"authorization header missing or malformed\")))\n\t\t\treturn\n\t\t}\n\n\t\tpayload, err := tokenMaker.VerifyToken(fields[1])\n\t\tif err != nil {\n\t\t\tctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))\n\t\t\treturn\n\t\t}\n\n\t\t// store payload in context\n\t\tctx.Set(authPayloadKey, payload)\n\t\tctx.Next()\n\t}\n}",
        },
        {
          "t": "ul",
          "c": [
            "**`ctx.GetHeader(\"Authorization\")` และ `strings.Fields(header)`**: อ่านค่า Header ที่ส่งมา (เช่น `\"Bearer v4.local.xxx\"`) แล้วใช้ `strings.Fields` (แพ็กเกจ `strings` มาตรฐานของ Go) หั่นข้อความตามช่องว่างออกเป็น 2 ท่อน คือคำว่า `\"Bearer\"` และตัว Token",
            "**`ctx.AbortWithStatusJSON(http.StatusUnauthorized, ...)`**: คำสั่งของ Gin สำหรับ **'สั่งสกัดกั้นทันที'** หากบัตรผ่านไม่ถูกต้อง โดยจะส่ง HTTP 401 กลับไปหาผู้ใช้และหยุดไม่ให้คำขอนี้วิ่งทะลุเข้าไปถึง Handler ด้านในเด็ดขาด",
            "**`ctx.Set(authPayloadKey, payload)` และ `ctx.Next()`**: เมื่อตรวจบัตรผ่านแล้ว เราใช้ `ctx.Set` ฝากข้อมูลผู้ใช้งาน (`payload`) เก็บไว้ในกระเป๋าของ `gin.Context` ภายใต้ชื่อคีย์ `\"auth_payload\"` แล้วเรียก `ctx.Next()` เพื่อเปิดประตูให้วิ่งเข้าสู่ฟังก์ชัน Handler หลักต่อไป",
          ],
        },
        {
          "t": "viz",
          "id": "bank-auth-middleware-flow",
        },
        {
          "t": "h2",
          "c": "4. ระบบล็อกอิน (POST /users/login) & ปกป้อง Endpoints สำคัญ",
        },
        {
          "t": "p",
          "c": "เมื่อเรามีทั้งโรงงานผลิตบัตรผ่าน (`PasetoMaker`) และยามเฝ้าประตู (`authMiddleware`) พร้อมแล้ว ขั้นตอนต่อไปคือการเปิดประตูให้ผู้ใช้เข้ามาล็อกอินรับบัตรผ่านที่ `POST /users/login` ในไฟล์ `simplebank/api/user.go`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/user.go (เพิ่มระบบล็อกอิน loginUser)",
          "c": "package api\n\nimport (\n+\t\"database/sql\"\n+\t\"errors\"\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n\t\"simplebank/util\"\n)\n\ntype createUserRequest struct {\n\tUsername string `json:\"username\" binding:\"required,alphanum\"`\n\tPassword string `json:\"password\" binding:\"required,min=6\"`\n\tFullName string `json:\"full_name\" binding:\"required\"`\n\tEmail    string `json:\"email\" binding:\"required,email\"`\n}\n\nfunc (server *Server) createUser(ctx *gin.Context) {\n\tvar req createUserRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\thashedPassword, err := util.HashPassword(req.Password)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tuser, err := server.store.CreateUser(ctx, db.CreateUserParams{\n\t\tUsername:       req.Username,\n\t\tHashedPassword: hashedPassword,\n\t\tFullName:       req.FullName,\n\t\tEmail:          req.Email,\n\t})\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, user)\n}\n+\n+type loginUserRequest struct {\n+\tUsername string `json:\"username\" binding:\"required,alphanum\"`\n+\tPassword string `json:\"password\" binding:\"required,min=6\"`\n+}\n+\n+type loginUserResponse struct {\n+\tAccessToken string  `json:\"access_token\"`\n+\tUser        db.User `json:\"user\"`\n+}\n+\n+func (server *Server) loginUser(ctx *gin.Context) {\n+\tvar req loginUserRequest\n+\tif err := ctx.ShouldBindJSON(&req); err != nil {\n+\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n+\t\treturn\n+\t}\n+\n+\tuser, err := server.store.GetUser(ctx, req.Username)\n+\tif err != nil {\n+\t\tif errors.Is(err, sql.ErrNoRows) {\n+\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err))\n+\t\t\treturn\n+\t\t}\n+\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n+\t\treturn\n+\t}\n+\n+\tif err := util.CheckPassword(req.Password, user.HashedPassword); err != nil {\n+\t\tctx.JSON(http.StatusUnauthorized, errorResponse(err))\n+\t\treturn\n+\t}\n+\n+\taccessToken, _, err := server.tokenMaker.CreateToken(user.Username, server.tokenDuration)\n+\tif err != nil {\n+\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n+\t\treturn\n+\t}\n+\n+\tctx.JSON(http.StatusOK, loginUserResponse{\n+\t\tAccessToken: accessToken,\n+\t\tUser:        user,\n+\t})\n+}",
        },
        {
          "t": "ul",
          "c": [
            "**ดึงข้อมูลผู้ใช้ (`server.store.GetUser`)**: ค้นหาผู้ใช้จากฐานข้อมูลด้วย `req.Username` หากไม่มีชื่อผู้ใช้นี้ในระบบ (`sql.ErrNoRows`) จะตอบกลับ `404 Not Found`",
            "**ตรวจสอบรหัสผ่าน (`util.CheckPassword`)**: นำรหัสผ่านที่ผู้ใช้กรอกไปเทียบกับ `user.HashedPassword` ในฐานข้อมูลด้วย Bcrypt หากไม่ตรงกันจะตีกลับด้วยรหัส `401 Unauthorized` ทันที",
            "**ออกบัตรผ่าน (`server.tokenMaker.CreateToken`)**: เมื่อรหัสผ่านถูกต้อง เซิร์ฟเวอร์จะเรียก `tokenMaker` สร้าง PASETO Token ที่มีอายุตาม `server.tokenDuration` แล้วส่งกลับไปพร้อมข้อมูล `user` ใน `loginUserResponse`",
          ],
        },
        {
          "t": "p",
          "c": "ขั้นต่อมา เราอัปเดตไฟล์ `simplebank/api/server.go` เพื่อติดตั้ง `tokenMaker` เข้าไปใน `Server` และจัดกลุ่มเส้นทาง (Route Grouping) แยกระหว่างเส้นทางสาธารณะกับเส้นทางที่ต้องมีบัตรผ่าน:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/server.go (ผูก PasetoMaker และแยกกลุ่ม Protected Routes)",
          "c": "package api\n\nimport (\n+\t\"fmt\"\n+\t\"time\"\n+\n\t\"github.com/gin-gonic/gin\"\n\t\"github.com/gin-gonic/gin/binding\"\n\t\"github.com/go-playground/validator/v10\"\n\tdb \"simplebank/db\"\n+\t\"simplebank/token\"\n)\n\ntype Server struct {\n-\tstore  *db.Store\n-\trouter *gin.Engine\n+\tstore         *db.Store\n+\ttokenMaker    *token.PasetoMaker\n+\ttokenDuration time.Duration\n+\trouter        *gin.Engine\n}\n\n-func NewServer(store *db.Store) *Server {\n-\tserver := &Server{store: store}\n+func NewServer(symmetricKey string, tokenDuration time.Duration, store *db.Store) (*Server, error) {\n+\ttokenMaker, err := token.NewPasetoMaker(symmetricKey)\n+\tif err != nil {\n+\t\treturn nil, fmt.Errorf(\"cannot create token maker: %w\", err)\n+\t}\n+\n+\tserver := &Server{\n+\t\tstore:         store,\n+\t\ttokenMaker:    tokenMaker,\n+\t\ttokenDuration: tokenDuration,\n+\t}\n\trouter := gin.Default()\n\n\tif v, ok := binding.Validator.Engine().(*validator.Validate); ok {\n\t\tv.RegisterValidation(\"currency\", validCurrency)\n\t}\n\n+\t// public routes\n\trouter.POST(\"/users\", server.createUser)\n-\trouter.POST(\"/accounts\", server.createAccount)\n-\trouter.GET(\"/accounts/:id\", server.getAccount)\n-\trouter.GET(\"/accounts\", server.listAccounts)\n-\trouter.POST(\"/transfers\", server.createTransfer)\n+\trouter.POST(\"/users/login\", server.loginUser)\n+\n+\t// protected routes\n+\tauth := router.Group(\"/\").Use(authMiddleware(server.tokenMaker))\n+\tauth.POST(\"/accounts\", server.createAccount)\n+\tauth.GET(\"/accounts/:id\", server.getAccount)\n+\tauth.GET(\"/accounts\", server.listAccounts)\n+\tauth.POST(\"/transfers\", server.createTransfer)\n\n\tserver.router = router\n-\treturn server\n+\treturn server, nil\n}\n\nfunc (server *Server) Start(address string) error {\n\treturn server.router.Run(address)\n}\n\nfunc errorResponse(err error) gin.H {\n\treturn gin.H{\"error\": err.Error()}\n}",
        },
        {
          "t": "ul",
          "c": [
            "**ทำไม `NewServer` ถึงเปลี่ยนมาคืนค่า `(*Server, error)`?**: เพราะภายใน `NewServer` มีการเรียก `token.NewPasetoMaker(symmetricKey)` ซึ่งจะตรวจสอบว่ากุญแจลับมีความยาวครบ 32 ไบต์หรือไม่ หากส่งกุญแจผิดขนาดเข้ามา เซิร์ฟเวอร์จะปฏิเสธการสร้างและคืนค่า `error` ออกไปตั้งแต่ตอนเริ่มต้นโปรแกรมทันที",
            "**Public Routes vs Protected Routes (`router.Group(\"/\").Use(...)`)**: เส้นทางสมัครสมาชิก (`/users`) และล็อกอิน (`/users/login`) ถูกลงทะเบียนไว้กับ `router` หลักโดยตรงเพื่อให้คนทั่วไปเรียกใช้ได้โดยยังไม่ต้องมีบัตรผ่าน ส่วนคำสั่งเกี่ยวกับบัญชีและการโอนเงินทั้งหมดถูกย้ายมาลงทะเบียนผ่านกลุ่ม `auth` ที่มี `authMiddleware` ยืนเฝ้าหน้าประตู",
          ],
        },
        {
          "t": "callout",
          "title": "🔒 Authentication vs Authorization: ล็อกอินผ่านแล้ว แต่ทำไมยังต้องเช็กสิทธิ์ใน Handler?",
          "c": "การมี `authMiddleware` เฝ้าหน้าประตู ช่วยยืนยันแค่ว่า **\"ผู้เรียกคือใครและล็อกอินเข้ามาแล้ว\" (Authentication)** แต่ยังไม่ได้ตรวจสอบว่า **\"เขามีสิทธิ์เข้าถึงข้อมูลชิ้นนั้นหรือไม่\" (Authorization)**!\n\nลองจินตนาการว่าถ้า `alice` ล็อกอินเข้ามาอย่างถูกต้อง เธอย่อมมี Token จริงที่วิ่งผ่านด่าน Middleware ได้สบายๆ แต่ถ้าข้างใน Handler ไม่มีการเช็กความเป็นเจ้าของบัญชี:\n• เธอสามารถยิง `POST /accounts` โดยส่ง `\"owner\": \"bob\"` เพื่อแอบสร้างบัญชีในชื่อคนอื่นได้\n• เธอสามารถยิง `GET /accounts/2` เพื่อแอบดูยอดเงินในบัญชีของ `bob` ได้\n• เธอสามารถยิง `POST /transfers` สั่งตัดเงินออกจากบัญชีของ `bob` มาเข้าบัญชีตัวเองได้!\n\nดังนั้น ภายใน Handler ของ `api/account.go` และ `api/transfer.go` เราจึงต้องดึงชื่อผู้ใช้งานที่ Middleware แกะไว้ใน `gin.Context` ออกมาด้วยคำสั่ง:\n```go\nauthPayload := ctx.MustGet(authPayloadKey).(*token.Payload)\n```\n• **`ctx.MustGet(authPayloadKey)`**: หยิบก้อนข้อมูลที่ `authMiddleware` ฝากไว้ผ่าน `ctx.Set(authPayloadKey, payload)` ออกมา (ซึ่ง Gin คืนค่ากลับมาเป็นชนิดกลาง `any`)\n• **`.(*token.Payload)` (Type Assertion)**: แปลงชนิดข้อมูลจาก `any` กลับมาเป็น Struct `*token.Payload` ของเรา เพื่อให้นำชื่อคนที่ล็อกอิน (`authPayload.Username`) ไปตรวจเช็กสิทธิ์ความเป็นเจ้าของในแต่ละฟังก์ชันได้ทันที",
        },
        {
          "t": "p",
          "c": "อัปเดตไฟล์ `simplebank/api/account.go` เพื่อบังคับใช้กฎความเป็นเจ้าของบัญชีในทั้ง 3 ฟังก์ชัน (`createAccount`, `getAccount`, และ `listAccounts`):",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/account.go (อัปเดตระบบสิทธิ์เจ้าของบัญชี Authorization)",
          "c": "package api\n\nimport (\n\t\"database/sql\"\n\t\"errors\"\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n+\t\"simplebank/token\"\n)\n\ntype createAccountRequest struct {\n-\tOwner    string `json:\"owner\" binding:\"required\"`\n\tCurrency string `json:\"currency\" binding:\"required,currency\"`\n}\n\nfunc (server *Server) createAccount(ctx *gin.Context) {\n\tvar req createAccountRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n+\tauthPayload := ctx.MustGet(authPayloadKey).(*token.Payload)\n\taccount, err := server.store.CreateAccount(ctx, db.CreateAccountParams{\n-\t\tOwner:    req.Owner,\n+\t\tOwner:    authPayload.Username,\n\t\tBalance:  0,\n\t\tCurrency: req.Currency,\n\t})\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, account)\n}\n\ntype getAccountRequest struct {\n\tID int64 `uri:\"id\" binding:\"required,min=1\"`\n}\n\nfunc (server *Server) getAccount(ctx *gin.Context) {\n\tvar req getAccountRequest\n\tif err := ctx.ShouldBindUri(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\taccount, err := server.store.GetAccount(ctx, req.ID)\n\tif err != nil {\n\t\tif errors.Is(err, sql.ErrNoRows) {\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err))\n\t\t\treturn\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n+\tauthPayload := ctx.MustGet(authPayloadKey).(*token.Payload)\n+\tif account.Owner != authPayload.Username {\n+\t\terr := errors.New(\"account doesn't belong to the authenticated user\")\n+\t\tctx.JSON(http.StatusUnauthorized, errorResponse(err))\n+\t\treturn\n+\t}\n+\n\tctx.JSON(http.StatusOK, account)\n}\n\ntype listAccountsRequest struct {\n\tPageID   int32 `form:\"page_id\" binding:\"required,min=1\"`\n\tPageSize int32 `form:\"page_size\" binding:\"required,min=5,max=10\"`\n}\n\nfunc (server *Server) listAccounts(ctx *gin.Context) {\n\tvar req listAccountsRequest\n\tif err := ctx.ShouldBindQuery(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n+\tauthPayload := ctx.MustGet(authPayloadKey).(*token.Payload)\n\taccounts, err := server.store.ListAccounts(ctx, db.ListAccountsParams{\n-\t\tOwner:  \"\",\n+\t\tOwner:  authPayload.Username,\n\t\tLimit:  req.PageSize,\n\t\tOffset: (req.PageID - 1) * req.PageSize,\n\t})\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, accounts)\n}",
        },
        {
          "t": "ul",
          "c": [
            "**ใน `createAccount` (เลิกเชื่อชื่อ Owner จาก Client)**: เราตัดฟิลด์ `Owner` ออกจาก `createAccountRequest` ทิ้งไปเลย เพราะระบบไม่ควรอนุญาตให้ผู้ใช้ระบุชื่อเจ้าของบัญชีผ่าน JSON เองอีกต่อไป แต่บังคับดึง `authPayload.Username` จากบัตรผ่านของคนที่กำลังล็อกอินมาเป็นเจ้าของบัญชีโดยอัตโนมัติ",
            "**ใน `getAccount` (ป้องกันการแอบส่องบัญชีคนอื่น)**: เมื่อดึงข้อมูล `account` มาจากฐานข้อมูลแล้ว เราเช็กทันทีว่า `account.Owner != authPayload.Username` หรือไม่ หากบัญชีที่ขอดูไม่ใช่ของคนที่ล็อกอินอยู่ จะถูกตัดจบด้วย `401 Unauthorized` ทันที",
            "**ใน `listAccounts` (เติมจิ๊กซอว์คำสั่ง SQL `WHERE owner = $1`)**: จำในบทที่ 3 (`db/account.go`) ที่คำสั่ง `ListAccounts` ของเรากรองด้วย `WHERE owner = $1` แต่ในบทที่ 6 เรายังไม่มีระบบล็อกอินจึงส่งค่าว่าง `Owner: \"\"` ทิ้งไว้ได้ไหมครับ? ตอนนี้เราส่ง `Owner: authPayload.Username` เข้าไปแทน ทำให้ `GET /accounts` กวาดมาเฉพาะรายการบัญชีของผู้ใช้ที่กำลังล็อกอินอยู่ได้อย่างสมบูรณ์",
          ],
        },
        {
          "t": "p",
          "c": "เช่นเดียวกัน ในไฟล์ `simplebank/api/transfer.go` เราต้องเพิ่มกฎป้องกันไม่ให้ผู้ใช้แอบสั่งโอนเงินออกจากบัญชีของคนอื่น:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/transfer.go (ตรวจสอบสิทธิ์เจ้าของบัญชีต้นทางก่อนโอนเงิน)",
          "c": "package api\n\nimport (\n\t\"database/sql\"\n\t\"errors\"\n\t\"fmt\"\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\t\"github.com/jackc/pgx/v5/pgconn\"\n\tdb \"simplebank/db\"\n+\t\"simplebank/token\"\n)\n\ntype transferRequest struct {\n\tFromAccountID int64  `json:\"from_account_id\" binding:\"required,min=1\"`\n\tToAccountID   int64  `json:\"to_account_id\" binding:\"required,min=1,nefield=FromAccountID\"`\n\tAmount        int64  `json:\"amount\" binding:\"required,gt=0\"`\n\tCurrency      string `json:\"currency\" binding:\"required,currency\"`\n}\n\nfunc (server *Server) createTransfer(ctx *gin.Context) {\n\tvar req transferRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n-\tif _, ok := server.validAccount(ctx, req.FromAccountID, req.Currency); !ok {\n+\tfromAccount, ok := server.validAccount(ctx, req.FromAccountID, req.Currency)\n\tif !ok {\n\t\treturn\n\t}\n\n+\tauthPayload := ctx.MustGet(authPayloadKey).(*token.Payload)\n+\tif fromAccount.Owner != authPayload.Username {\n+\t\terr := errors.New(\"from account doesn't belong to the authenticated user\")\n+\t\tctx.JSON(http.StatusUnauthorized, errorResponse(err))\n+\t\treturn\n+\t}\n+\n\tif _, ok := server.validAccount(ctx, req.ToAccountID, req.Currency); !ok {\n\t\treturn\n\t}\n\n\tresult, err := server.store.TransferTx(ctx, db.TransferTxParams{\n\t\tFromAccountID: req.FromAccountID,\n\t\tToAccountID:   req.ToAccountID,\n\t\tAmount:        req.Amount,\n\t})\n\tif err != nil {\n\t\tvar pgErr *pgconn.PgError\n\t\tif errors.As(err, &pgErr) && pgErr.Code == \"23514\" {\n\t\t\tctx.JSON(http.StatusBadRequest, errorResponse(errors.New(\"เงินในบัญชีไม่พอสำหรับการโอน\")))\n\t\t\treturn\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, result)\n}\n\nfunc (server *Server) validAccount(ctx *gin.Context, accountID int64, currency string) (db.Account, bool) {\n\taccount, err := server.store.GetAccount(ctx, accountID)\n\tif err != nil {\n\t\tif errors.Is(err, sql.ErrNoRows) {\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(fmt.Errorf(\"ไม่พบบัญชีหมายเลข %d\", accountID)))\n\t\t\treturn account, false\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn account, false\n\t}\n\n\tif account.Currency != currency {\n\t\terr := fmt.Errorf(\"สกุลเงินของบัญชี [%d] ไม่ตรงกัน: %s vs %s\", account.ID, account.Currency, currency)\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn account, false\n\t}\n\treturn account, true\n}",
        },
        {
          "t": "ul",
          "c": [
            "**ทำไมถึงเช็ก `Owner` เฉพาะ `fromAccount` แต่ไม่เช็ก `toAccount`?**: ฟังก์ชัน `server.validAccount` คืนค่า `(db.Account, bool)` กลับมา สำหรับ **บัญชีต้นทาง (`FromAccountID`)** เราเปลี่ยนจาก `_` มารับค่าใส่ตัวแปร `fromAccount` เพื่อตรวจสอบว่าคนกดสั่งโอน (`authPayload.Username`) คือเจ้าของบัญชีที่จะถูกหักเงินจริงๆ ส่วน **บัญชีปลายทาง (`ToAccountID`)** เราใช้ `_, ok` เช็กแค่ว่ามีบัญชีอยู่จริงและสกุลเงินตรงกันเหมือนเดิม เพราะการโอนเงินย่อมต้องโอนข้ามไปให้บัญชีของคนอื่นได้ตามปกติ",
          ],
        },
        {
          "t": "p",
          "c": "สุดท้าย เนื่องจากเราปรับฟังก์ชัน `api.NewServer` ใน `api/server.go` ให้รับกุญแจลับและอายุของ Token เพิ่มเข้ามา (และคืนค่า `(*Server, error)`) ไฟล์ `simplebank/main.go` เดิมที่ส่งแค่ `store` ตัวเดียวจึงยังคอมไพล์ไม่ผ่าน ให้เราอัปเดต `simplebank/main.go` เพื่อส่งค่าทั้ง 3 ตัวและดักเช็ก `error` ดังนี้ครับ (ก่อนที่เราจะย้ายค่าคงที่เหล่านี้ไปไว้ในไฟล์ `app.env` ในบทที่ 7.3):",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/main.go (อัปเดตส่งคีย์ PASETO และอายุ Token เข้า NewServer)",
          "c": "package main\n\nimport (\n\t\"log\"\n+\t\"time\"\n\n\t\"simplebank/api\"\n\t\"simplebank/db\"\n)\n\nconst (\n-\tdbSource      = \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\"\n-\tserverAddress = \"0.0.0.0:8080\"\n+\tdbSource            = \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\"\n+\tserverAddress       = \"0.0.0.0:8080\"\n+\ttokenSymmetricKey   = \"12345678901234567890123456789012\" // 32 bytes\n+\taccessTokenDuration = 15 * time.Minute\n)\n\nfunc main() {\n\tconn, err := db.Open(dbSource)\n\tif err != nil {\n\t\tlog.Fatal(\"cannot connect to db:\", err)\n\t}\n\tdefer conn.Close()\n\n\tstore := db.NewStore(conn)\n-\tserver := api.NewServer(store)\n+\tserver, err := api.NewServer(tokenSymmetricKey, accessTokenDuration, store)\n+\tif err != nil {\n+\t\tlog.Fatal(\"cannot create server:\", err)\n+\t}\n\n\tif err := server.Start(serverAddress); err != nil {\n\t\tlog.Fatal(\"cannot start server:\", err)\n\t}\n}",
        },
        {
          "t": "h2",
          "c": "5. ทดสอบระบบจริงด้วย Postman ทีละขั้นตอน (สมัคร → ล็อกอิน → เปิดบัญชี)",
        },
        {
          "t": "p",
          "c": "มาทดสอบระบบความปลอดภัยที่เราเพิ่งสร้างขึ้นด้วย **Postman** กันครับ เพื่อให้การทดสอบราบรื่นและเลข `id` บัญชีเริ่มต้นที่ `1` สวยงาม ให้ทำเรียงตาม **4 ขั้นตอน** ด้านล่างนี้ทีละขั้นครับ:",
        },
        {
          "t": "p",
          "c": "**ขั้นที่ 1: ล้างข้อมูลเก่าในฐานข้อมูล และรีสตาร์ต API Server**\nหากก่อนหน้านี้คุณเคยรัน Unit Test (`make test`) หรือมีข้อมูลเก่าค้างอยู่ ให้เปิด Terminal รันคำสั่งล้างตารางทั้งหมด **ก่อนเริ่มทำขั้นอื่นๆ** จากนั้นกด `Ctrl + C` หยุดเซิร์ฟเวอร์ตัวเก่า แล้วสั่ง `go mod tidy` ตามด้วย `make server` เพื่อรันโค้ดชุดใหม่ล่าสุด:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ล้างตารางทั้งหมดให้สะอาด แล้วรันเซิร์ฟเวอร์ใหม่",
          "code": "docker exec -it postgres16 psql -U root -d simple_bank -c \"TRUNCATE TABLE entries, transfers, accounts, users RESTART IDENTITY CASCADE;\"\ngo mod tidy\nmake server",
          "out": "TRUNCATE TABLE\ngo run main.go\n[GIN-debug] POST   /users                    --> simplebank/api.(*Server).createUser-fm (3 handlers)\n[GIN-debug] POST   /users/login              --> simplebank/api.(*Server).loginUser-fm (3 handlers)\n[GIN-debug] POST   /accounts                 --> simplebank/api.(*Server).createAccount-fm (4 handlers)\n[GIN-debug] Listening and serving HTTP on 0.0.0.0:8080",
        },
        {
          "t": "p",
          "c": "**ขั้นที่ 2 (Postman 1): สมัครสมาชิกผู้ใช้ `alice` (`POST /users`)**\nเปิดโปรแกรม **Postman** เลือก Method เป็น **`POST`** ใส่ URL `http://localhost:8080/users` ไปที่แท็บ **Body** → เลือก **raw** → เปลี่ยนชนิดเป็น **JSON** แล้ววางข้อมูลด้านล่างเพื่อสร้างผู้ใช้ชื่อ `alice` ลงในตาราง `users` (เส้นทางนี้เป็น Public Route จึงยังไม่ต้องใส่ Token):",
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "Postman 1: POST http://localhost:8080/users (สมัครสมาชิก alice)",
          "code": "POST /users HTTP/1.1\nHost: localhost:8080\nContent-Type: application/json\n\n{\n  \"username\": \"alice\",\n  \"password\": \"secret123\",\n  \"full_name\": \"Alice Wonderland\",\n  \"email\": \"alice@example.com\"\n}",
          "out": "HTTP/1.1 200 OK\nContent-Type: application/json; charset=utf-8\n\n{\n  \"username\": \"alice\",\n  \"full_name\": \"Alice Wonderland\",\n  \"email\": \"alice@example.com\",\n  \"created_at\": \"2026-10-30T15:00:00Z\"\n}",
        },
        {
          "t": "p",
          "c": "**ขั้นที่ 3 (Postman 2): ล็อกอินเพื่อขอรับบัตรผ่าน (`POST /users/login`)**\nเปลี่ยน URL เป็น `http://localhost:8080/users/login` แล้วส่ง `username` กับ `password` ของ `alice` เข้าไปในแท็บ **Body (raw → JSON)** แล้วกด **Send**\n\n👉 **จุดสำคัญที่สุด**: เมื่อได้ผลลัพธ์ `200 OK` กลับมาในช่อง Response ด้านล่าง ให้ **คัดลอก (Copy) ข้อความรหัสยาวๆ ที่อยู่หลัง `\"access_token\":`** (ที่ขึ้นต้นด้วย `v4.local...` เฉพาะข้อความข้างในเครื่องหมายคำพูด) เก็บไว้สำหรับใช้ในขั้นถัดไป!",
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "Postman 2: POST http://localhost:8080/users/login (ล็อกอินเพื่อรับ access_token)",
          "code": "POST /users/login HTTP/1.1\nHost: localhost:8080\nContent-Type: application/json\n\n{\n  \"username\": \"alice\",\n  \"password\": \"secret123\"\n}",
          "out": "HTTP/1.1 200 OK\nContent-Type: application/json; charset=utf-8\n\n{\n  \"access_token\": \"v4.local.xxx...\",\n  \"user\": {\n    \"username\": \"alice\",\n    \"full_name\": \"Alice Wonderland\",\n    \"email\": \"alice@example.com\",\n    \"created_at\": \"2026-10-30T15:00:00Z\"\n  }\n}",
        },
        {
          "t": "p",
          "c": "**ขั้นที่ 4 (Postman 3): เปิดบัญชีธนาคารโดยแนบ Bearer Token (`POST /accounts`)**\nเนื่องจาก `POST /accounts` ถูกย้ายเข้าไปอยู่ในกลุ่ม Protected Routes ที่มี `authMiddleware` เฝ้าหน้าประตูแล้ว ในขั้นนี้เราจึงต้องตั้งค่าใน Postman **2 จุด** ก่อนกด Send ดังนี้ครับ:\n\n1. **จุดที่ 1 — แนบบัตรผ่านในแท็บ `Authorization`**:\n   • คลิกที่แท็บ **Authorization** (แถบเมนูใต้ช่อง URL ข้างๆ Params)\n   • ในช่อง **Auth Type** ให้เลือกเป็น **`Bearer Token`**\n   • ในช่อง **Token** ด้านขวา ให้วางรหัส `v4.local...` ที่ก๊อปปี้มาจากขั้นที่ 3 ลงไป *(วางเฉพาะตัวรหัส `v4.local...` ไม่ต้องพิมพ์คำว่า `Bearer` นำหน้า เพราะ Postman เติมให้เอง)*\n2. **จุดที่ 2 — ระบุสกุลเงินในแท็บ `Body`**:\n   • คลิกกลับมาที่แท็บ **Body** → เลือก **raw** → **JSON**\n   • พิมพ์แค่ `{\"currency\": \"USD\"}` เท่านั้น **(ไม่ต้องใส่ฟิลด์ `\"owner\"` เหมือนในบทที่ 6 แล้ว)** เพราะโค้ด `createAccount` ใหม่ของเราจะแกะชื่อ `\"alice\"` ออกมาจาก Bearer Token ในจุดที่ 1 มาตั้งเป็นเจ้าของบัญชีให้อัตโนมัติ!\n\n*(คุณสามารถกดสลับดูแท็บ **Authorization** และ **Body** ในกล่องจำลอง Postman ด้านล่างเพื่อดูตัวอย่างการตั้งค่าทั้ง 2 แท็บได้เลยครับ)*",
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "Postman 3: POST http://localhost:8080/accounts (ใส่ Bearer Token ในแท็บ Authorization หรือ Headers)",
          "code": "POST /accounts HTTP/1.1\nHost: localhost:8080\nAuthorization: Bearer v4.local.xxx...\nContent-Type: application/json\n\n{\n  \"currency\": \"USD\"\n}",
          "out": "HTTP/1.1 200 OK\nContent-Type: application/json; charset=utf-8\n\n{\n  \"id\": 1,\n  \"owner\": \"alice\",\n  \"balance\": 0,\n  \"currency\": \"USD\",\n  \"created_at\": \"2026-10-30T15:01:00Z\"\n}",
        },
        {
          "t": "callout",
          "title": "🛠️ เจอ Error 500 หรือ 401 ตอนยิง Postman 3 (POST /accounts) แก้ยังไง?",
          "c": "หากคุณกด Send ใน **Postman 3 (`POST /accounts`)** แล้วไม่ได้ `200 OK` ให้ดูที่ข้อความในช่อง **Response Body** (`{\"error\": \"...\"}`) ด้านล่างของ Postman เพื่อเช็กสาเหตุและวิธีแก้ดังนี้ครับ:\n\n**กรณีที่ 1: ได้ `Status: 500 Internal Server Error` พร้อมข้อความ `duplicate key value violates unique constraint \"owner_currency_key\"`**\n• **สาเหตุ**: ในบทที่ 7.1 เราเพิ่มกฎเหล็กในฐานข้อมูลว่า **ผู้ใช้ 1 คน เปิดบัญชีสกุลเงินเดียวกันได้แค่ 1 บัญชีเท่านั้น** (`UNIQUE (owner, currency)`) แปลว่า `alice` มีบัญชีสกุลเงิน `USD` ถูกสร้างสำเร็จไปแล้วก่อนหน้านี้ (เช่น เผลอกดปุ่ม Send ซ้ำเป็นครั้งที่ 2)\n• **วิธีแก้**: บัญชี `USD` ของ `alice` ถูกสร้างเรียบร้อยแล้ว! หากอยากทดลองกดสร้างบัญชีเพิ่มอีกใบ ให้เปลี่ยนค่าใน Body เป็นสกุลเงินอื่น เช่น `{\"currency\": \"THB\"}` หรือ `{\"currency\": \"EUR\"}` แทน\n\n**กรณีที่ 2: ได้ `Status: 500 Internal Server Error` พร้อมข้อความ `violates foreign key constraint \"accounts_owner_fkey\"`**\n• **สาเหตุ**: ชื่อเจ้าของบัญชี (`alice`) ไม่มีตัวตนอยู่ในตาราง `users`! มักเกิดจาก **2 จุด** นี้:\n  1. คุณเผลอไปรันคำสั่ง `TRUNCATE TABLE ... users` **หลังจาก** ที่กดล็อกอินรับ Token มาแล้ว ทำให้ข้อมูล `alice` ในตาราง `users` ถูกลบทิ้งไป แต่ตัว Token ในมือยังไม่หมดอายุ พอยิงสร้างบัญชีฐานข้อมูลจึงหาชื่อ `alice` ไม่เจอ → **วิธีแก้**: กลับไปกด Send ที่ **Postman 1 (`POST /users`)** เพื่อสมัคร `alice` ใหม่ แล้วค่อยมายิง Postman 3 อีกครั้ง\n  2. ในไฟล์ `simplebank/api/account.go` ฟังก์ชัน `createAccount` ลืมแก้บรรทัด `Owner: req.Owner` ให้เป็น **`Owner: authPayload.Username`** (หรือแก้ไขไฟล์แล้วแต่ลืมกด `Ctrl + C` แล้วรัน `make server` ใหม่) ทำให้ส่งชื่อว่าง `\"\"` เข้าไปในฐานข้อมูล\n\n**กรณีที่ 3: ได้ `Status: 401 Unauthorized`**\n• **สาเหตุ**: ลืมใส่ Token ในแท็บ **Authorization** (เลือก `Bearer Token`), เผลอวางรหัสผิด (เช่น เอา `v4.local.xxx...` จากหน้าเว็บไปวางแทนที่จะก๊อปปี้ของจริงจาก Postman 2), หรือ Token หมดอายุเกิน 15 นาทีแล้ว (ให้กลับไปกด Send ใน Postman 2 เพื่อรับ `access_token` ตัวใหม่)",
          "warn": true,
        },
        {
          "t": "h2",
          "c": "6. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ขนาดความยาวของ Symmetric Key สำหรับ PASETO v4.local ตามมาตรฐาน ChaCha20-Poly1305 ต้องมีขนาดกี่ไบต์?",
              "options": [
                {
                  "text": "32 ไบต์ (256 บิต) พอดี",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! ChaCha20-Poly1305 กำหนดขนาด symmetric key ไว้ที่ 32 ไบต์ หากสั้นหรือยาวกว่านั้น library จะ error ทันทีเพื่อความปลอดภัย"
                },
                {
                  "text": "16 ไบต์ (128 บิต)",
                  "isCorrect": false,
                  "explain": "16 ไบต์เป็นขนาดของ AES-128 หรือ nonce ไม่ใช่คีย์ของ PASETO v4.local"
                },
                {
                  "text": "ไม่จำกัดความยาว ยิ่งยาวกี่ไบต์ก็ได้",
                  "isCorrect": false,
                  "explain": "ผิด PASETO ออกแบบมาเพื่อปิดช่องโหว่ด้าน crypto agility จึงบังคับขนาดคีย์ที่แน่นอนตายตัว"
                }
              ],
              "explain": "PASETO ป้องกันช่องโหว่ alg: 'none' ของ JWT โดยการระบุอัลกอริทึมที่ปลอดภัยไว้ในโปรโตคอลตั้งแต่ต้น"
            }
          ]
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "ระบบมีทั้งฟังก์ชันการทำงานและความปลอดภัยครบถ้วนแล้ว! ในบทที่ **7.3 จัดการ Config ด้วย Viper & Multi-stage Docker** เราจะมาแพ็กทุกอย่างขึ้น Production ในขนาดเบาหวิวเพียง 20MB กันครับ",
        },
      ],
      en: [],
    },
  },

  "bank-config-docker-prod": {
    slug: "bank-config-docker-prod",
    title: {
      th: "7.3 จัดการ Config ด้วย Viper & Multi-stage Docker",
      en: "7.3 Viper Configuration & Multi-stage Docker Production",
    },
    lead: {
      th: "ก้าวสู่ Production อย่างมืออาชีพ: บริหาร Environment Variables ด้วย Viper, เขียน Multi-stage Dockerfile ขนาดเพียง 20MB และรันทั้งระบบด้วย Docker Compose",
      en: "Production-ready deployment: Manage configs with Viper, build a lean 20MB multi-stage Docker image, and run the stack with Compose.",
    },
    group: "7. ความปลอดภัย & รันจริงระดับ Production",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• ใช้ `spf13/viper` โหลดการตั้งค่าจากไฟล์ `app.env` และรองรับการ Override ด้วย Environment Variables บน Production\n• สร้าง Multi-stage Dockerfile ลดขนาด Container Image จาก 800MB เหลือเพียง ~20MB\n• เขียน `docker-compose.yml` สั่งรัน Database, Migration, และ Go API Server ร่วมกันด้วยคำสั่งเดียว\n\n⏱ **เวลาในการเรียนรู้**: ~20 นาที | **สิ่งที่ต้องมี**: Docker Desktop",
        },
        {
          "t": "h2",
          "c": "1. จากค่าคงที่ในโค้ด (Hardcode) สู่การจัดการ Config ด้วย Viper",
        },
        {
          "t": "p",
          "c": "ย้อนกลับไปดูไฟล์ `simplebank/main.go` ที่เราเพิ่งอัปเดตในบทที่ 7.2 จะเห็นว่าเราเขียนฝังค่าสำคัญไว้ในโค้ดโดยตรง (`const`) ทั้งรหัสผ่านฐานข้อมูล (`dbSource`) และกุญแจลับ 32 ไบต์ (`tokenSymmetricKey`):\n• **ปัญหาด้านความปลอดภัย**: ทันทีที่เรา `git push` โค้ดขึ้น GitHub กุญแจลับและรหัสผ่านฐานข้อมูลจะหลุดสู่สาธารณะทันที!\n• **ปัญหาตอนย้ายสภาพแวดล้อม (Environment)**: ตอนรันบนเครื่องตัวเองเราต่อฐานข้อมูลที่ `localhost:5432` แต่พอนำไปรันใน Docker หรือขึ้นเซิร์ฟเวอร์จริง (Production) ที่อยู่ของฐานข้อมูลและกุญแจลับย่อมเปลี่ยนไป หากฝังตายตัวไว้ในโค้ด เราจะต้องคอยแก้โค้ดแล้วสั่งคอมไพล์ใหม่ทุกครั้งที่ย้ายเครื่อง\n\nตามมาตรฐานสากล **The Twelve-Factor App (กฎข้อที่ 3: Config)** จึงมีกฎเหล็กว่า **\"ห้ามฝังค่าตั้งค่าหรือความลับลงใน Source Code เด็ดขาด แต่ต้องแยกออกมาอ่านจากไฟล์ตั้งค่าหรือ Environment Variables แทน\"**",
        },
        {
          "t": "callout",
          "title": "🐍 รู้จักกับ Viper: ทำไมไม่ใช้แค่ os.Getenv มาตรฐานของ Go?",
          "c": "โดยปกติภาษา Go มีคำสั่งพื้นฐานอย่าง `os.Getenv(\"DB_SOURCE\")` สำหรับอ่านค่าตัวแปรจากเครื่องอยู่แล้ว แต่ในการทำงานจริงจะมีข้อจำกัดหลายอย่าง จึงนิยมใช้ไลบรารีมาตรฐานของวงการ Go ที่ชื่อว่า **Viper (`github.com/spf13/viper`)** เข้ามาจัดการแทนด้วย 3 เหตุผลหลัก:\n1. **อ่านไฟล์ `.env` ตอนพัฒนาบนเครื่องให้อัตโนมัติ**: คำสั่ง `os.Getenv` ของ Go ไม่สามารถอ่านไฟล์ `.env` เองได้ (ต้องคอยพิมพ์ `export` ใน Terminal ทุกครั้งก่อนรัน) แต่ Viper สามารถอ่านค่าเริ่มต้นจากไฟล์ `app.env` บนเครื่องเราขึ้นมาได้เลย\n2. **เขียนทับด้วยค่าจริงบน Production ได้ทันที (`AutomaticEnv`)**: เมื่อนำโปรแกรมไปรันบน Docker หรือ Cloud เราสามารถส่ง Environment Variable ของระบบเข้าไปทับค่าในไฟล์ `app.env` ได้อัตโนมัติโดยไม่ต้องแก้โค้ดแม้แต่บรรทัดเดียว\n3. **แปลงชนิดข้อมูลเข้า Struct ให้อัตโนมัติ (`Unmarshal`)**: แทนที่จะอ่านได้แค่ข้อความ `string` ธรรมดา Viper สามารถแปลงค่าจากไฟล์ตั้งค่าเข้าไปเก็บใน Go Struct ได้โดยตรง แถมแปลงข้อความเวลาอย่าง `\"15m\"` ให้กลายเป็นชนิด `time.Duration` (15 นาที) พร้อมใช้งานทันที!",
        },
        {
          "t": "p",
          "c": "เริ่มจากสร้างไฟล์ `simplebank/app.env` ที่โฟลเดอร์นอกสุดของโปรเจกต์ เพื่อเก็บค่าตั้งต้นสำหรับใช้งานบนเครื่องของเรา (ย้ายค่าจากบล็อก `const` เดิมใน `main.go` ออกมาไว้ที่นี่):",
        },
        {
          "t": "code",
          "lang": "ini",
          "label": "simplebank/app.env",
          "c": "DB_SOURCE=postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\nHTTP_SERVER_ADDRESS=0.0.0.0:8080\nTOKEN_SYMMETRIC_KEY=12345678901234567890123456789012\nACCESS_TOKEN_DURATION=15m",
        },
        {
          "t": "p",
          "c": "จากนั้นติดตั้งไลบรารี `github.com/spf13/viper` แล้วสร้างไฟล์ `simplebank/util/config.go` เพื่อทำหน้าที่โหลดค่าจาก `app.env` (และเปิดรับการ Override จาก Environment Variables จริง):",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ติดตั้งไลบรารี Viper",
          "code": "go get github.com/spf13/viper",
          "out": "go: added github.com/spf13/viper v1.21.0",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/config.go",
          "c": "package util\n\nimport (\n\t\"time\"\n\n\t\"github.com/spf13/viper\"\n)\n\ntype Config struct {\n\tDBSource            string        `mapstructure:\"DB_SOURCE\"`\n\tHTTPServerAddress   string        `mapstructure:\"HTTP_SERVER_ADDRESS\"`\n\tTokenSymmetricKey   string        `mapstructure:\"TOKEN_SYMMETRIC_KEY\"`\n\tAccessTokenDuration time.Duration `mapstructure:\"ACCESS_TOKEN_DURATION\"`\n}\n\nfunc LoadConfig(path string) (config Config, err error) {\n\tviper.AddConfigPath(path)\n\tviper.SetConfigName(\"app\")\n\tviper.SetConfigType(\"env\")\n\n\tviper.AutomaticEnv() // read from environment variables\n\n\tif err = viper.ReadInConfig(); err != nil {\n\t\treturn\n\t}\n\terr = viper.Unmarshal(&config)\n\treturn\n}",
        },
        {
          "t": "ul",
          "c": [
            "**ทำไมถึงใช้แท็ก `` `mapstructure:\"...\"` `` แทนที่จะเป็น `json`?**: เพราะเบื้องหลังของไลบรารี **Viper** ใช้แพ็กเกจย่อยที่ชื่อว่า `mapstructure` ในการแปลงค่าจากไฟล์ตั้งค่าทุกรูปแบบ (ทั้ง `.env`, `.yaml`, `.json`) ให้เข้าสู่ตัวแปร Go Struct เราจึงต้องระบุชื่อแท็กตามที่ Viper กำหนด",
            "**`viper.AddConfigPath(path)` / `SetConfigName(\"app\")` / `SetConfigType(\"env\")`**: บอกให้ Viper ไปค้นหาไฟล์ที่ชื่อว่า `app.env` ในโฟลเดอร์ที่ระบุ",
            "**`viper.AutomaticEnv()`**: คำสั่งสำคัญที่บอกให้ Viper ตรวจสอบตัวแปร Environment Variables ของเครื่องเซิร์ฟเวอร์ด้วย หากบนเซิร์ฟเวอร์จริงมีการตั้งค่าตัวแปรชื่อตรงกัน (เช่น `DB_SOURCE`) ให้ใช้ค่าของเซิร์ฟเวอร์ทับค่าในไฟล์ `app.env` ทันที",
            "**`viper.ReadInConfig()` และ `viper.Unmarshal(&config)`**: สั่งอ่านไฟล์ตั้งค่าขึ้นมา แล้วเทค่าทั้งหมดลงในฟิลด์ของตัวแปร `config` (แถมแปลงข้อความ `\"15m\"` ให้กลายเป็น `time.Duration` 15 นาทีให้อัตโนมัติ)",
          ],
        },
        {
          "t": "viz",
          "id": "bank-viper-config-flow",
        },
        {
          "t": "p",
          "c": "**อัปเดตไฟล์ `simplebank/main.go` (ลบทิ้ง `const` และเปลี่ยนมาใช้ `util.LoadConfig`)**\nเปิดไฟล์ `simplebank/main.go` แล้วแก้ไข **3 จุด** ดังนี้ครับ:\n1. **✂️ ลบบล็อก `const (...)` ทั้งหมดออก** (และลบ `\"time\"` ออกจาก `import` เพราะไม่ได้ใช้แล้ว)\n2. **➕ เพิ่ม `\"simplebank/util\"` ใน `import`** แล้วเรียก `config, err := util.LoadConfig(\".\")` ที่บรรทัดแรกของ `main()` เพื่อโหลดค่าจาก `app.env`\n3. **✏️ เปลี่ยนค่าที่ส่งเข้าฟังก์ชันต่างๆ** ให้ดึงจาก `config.DBSource`, `config.TokenSymmetricKey`, `config.AccessTokenDuration`, และ `config.HTTPServerAddress` แทนค่าคงที่เดิม:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/main.go (ฉบับ Production)",
          "c": "package main\n\nimport (\n\t\"log\"\n\n\t\"simplebank/api\"\n\t\"simplebank/db\"\n\t\"simplebank/util\"\n)\n\nfunc main() {\n\tconfig, err := util.LoadConfig(\".\")\n\tif err != nil {\n\t\tlog.Fatal(\"cannot load config:\", err)\n\t}\n\n\tconn, err := db.Open(config.DBSource)\n\tif err != nil {\n\t\tlog.Fatal(\"cannot connect to db:\", err)\n\t}\n\tdefer conn.Close()\n\n\tstore := db.NewStore(conn)\n\tserver, err := api.NewServer(config.TokenSymmetricKey, config.AccessTokenDuration, store)\n\tif err != nil {\n\t\tlog.Fatal(\"cannot create server:\", err)\n\t}\n\n\tif err := server.Start(config.HTTPServerAddress); err != nil {\n\t\tlog.Fatal(\"cannot start server:\", err)\n\t}\n}",
        },
        {
          "t": "h2",
          "c": "2. แพ็กแอป Go ลง Container ด้วย Multi-Stage Dockerfile (เล็กเพียง 20MB)",
        },
        {
          "t": "p",
          "c": "ตั้งแต่บทที่ 2 จนถึงตอนนี้ เราใช้ Docker รันแค่ฐานข้อมูล PostgreSQL ส่วนตัวโค้ด Go API เรายังสั่งรันสดๆ บนเครื่องตัวเองด้วย `go run main.go` อยู่เลย ซึ่งในการนำขึ้นเซิร์ฟเวอร์จริง (Production) เราต้องแพ็กตัวแอป Go ของเราใส่ลงใน **Docker Image** ด้วยเช่นกัน เพื่อให้นำไปรันที่ไหนก็ได้โดยไม่ต้องลง Go บนเซิร์ฟเวอร์\n\nแต่ปัญหาคลาสสิกคือ ถ้าเราเขียน `Dockerfile` แบบชั้นเดียว (Single-Stage) โดยใช้ Image มาตรฐาน `golang:1.27-alpine` รันแอปตรงๆ ตัว Image ที่ได้จะมีขนาดใหญ่ถึง **~500MB–800MB** เพราะมันแบกเอา Go Compiler และเครื่องมือพัฒนาทั้งหมดติดไปด้วย! เราจึงใช้เทคนิคระดับ Production ที่เรียกว่า **Multi-Stage Build** แยกการสร้างออกเป็น 2 จังหวะ:",
        },
        {
          "t": "ol",
          "c": [
            "**Stage 1 (`builder` — โรงงานคอมไพล์)**: ใช้ Image `golang:1.27-alpine` ที่มีเครื่องมือครบครันเข้ามาดาวน์โหลดไลบรารีและคอมไพล์ซอร์สโค้ด `.go` ทั้งหมดให้ออกมาเป็นไฟล์โปรแกรมเดี่ยวๆ (Executable Binary) ที่ชื่อว่า `simplebank`",
            "**Stage 2 (`runner` — กล่องรันจริง)**: เริ่มต้นใหม่ด้วย Image ลีนุกซ์เปล่าๆ อย่าง `alpine:3.22` (ที่มีขนาดแค่ ~5MB) แล้วสั่ง **หยิบเฉพาะไฟล์ `simplebank` และ `app.env`** จาก Stage แรกมาวาง ทิ้งตัวแปลภาษาและซอร์สโค้ดทั้งหมดไว้ข้างหลัง ทำให้ได้ Image สุดท้ายที่เล็กเพียง **~20MB** เท่านั้น!",
          ],
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/Dockerfile` ที่โฟลเดอร์นอกสุดของโปรเจกต์:",
        },
        {
          "t": "code",
          "lang": "dockerfile",
          "label": "simplebank/Dockerfile",
          "c": "# Stage 1: Build\nFROM golang:1.27-alpine AS builder\nWORKDIR /app\nCOPY go.mod go.sum ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 go build -o simplebank main.go\n\n# Stage 2: Run (Production Runner)\nFROM alpine:3.22\nWORKDIR /app\nCOPY --from=builder /app/simplebank .\nCOPY app.env .\nEXPOSE 8080\nCMD [\"/app/simplebank\"]",
        },
        {
          "t": "ul",
          "c": [
            "**`COPY go.mod go.sum ./` และ `RUN go mod download` ก่อน `COPY . .`**: เทคนิคทำ **Docker Layer Caching** เพื่อให้ Docker ดาวน์โหลดไลบรารีเก็บไว้ในแคชก่อน หากวันหน้าเราแก้ไขเฉพาะไฟล์โค้ด `.go` โดยไม่ได้เพิ่มไลบรารีใหม่ ตอนสั่งบิลด์รอบถัดไป Docker จะข้ามขั้นดาวน์โหลดไลบรารีทันที ทำให้บิลด์เสร็จในไม่กี่วินาที",
            "**`CGO_ENABLED=0 go build -o simplebank main.go`**: ปิดการใช้งาน C-binding (`CGO_ENABLED=0`) เพื่อบังคับให้ Go คอมไพล์ทุกอย่างรวมเป็นไฟล์ไบนารีเดี่ยวแบบ Static (`simplebank`) ที่นำไปรันบน Linux เปล่าๆ ได้โดยไม่ต้องพึ่งไลบรารีภาษา C ของระบบ",
            "**`COPY --from=builder /app/simplebank .`**: ใน Stage ที่ 2 (`alpine:3.22`) เราคัดลอกเฉพาะไฟล์ไบนารี `simplebank` ที่คอมไพล์เสร็จแล้วจาก Stage `builder` มาวาง พร้อมไฟล์ `app.env` แล้วสั่งรันด้วย `CMD [\"/app/simplebank\"]`",
          ],
        },
        {
          "t": "h2",
          "c": "3. มัดรวมทั้งระบบด้วย Docker Compose: เครือข่ายภายใน & ลำดับการสตาร์ต",
        },
        {
          "t": "p",
          "c": "ตอนนี้ระบบของเรามีส่วนประกอบ 3 ชิ้น คือ **1) ฐานข้อมูล PostgreSQL**, **2) ตัวสร้างตาราง Migrate**, และ **3) เซิร์ฟเวอร์ Go API** แทนที่เราจะต้องมานั่งพิมพ์คำสั่ง `docker run` ทีละตัวให้วุ่นวาย เราสามารถใช้ **Docker Compose** เขียนไฟล์ `docker-compose.yml` เพียงไฟล์เดียวเพื่อสั่งรันและเชื่อมทั้ง 3 บริการเข้าด้วยกันโดยอัตโนมัติ\n\nแต่ก่อนจะเขียนไฟล์ `docker-compose.yml` มีกลไกสำคัญ 2 เรื่องที่ต้องเข้าใจเมื่อทุกอย่างเข้าไปอยู่ในโลกของ Container:",
        },
        {
          "t": "ul",
          "c": [
            "**1. Docker Internal DNS (`postgres:5432` vs `localhost:5432`) และการ Override ค่าด้วย Viper**: ตอนรันโค้ด Go บนเครื่องตัวเอง ในไฟล์ `app.env` เราตั้งค่าฐานข้อมูลไว้ที่ `localhost:5432` แต่เมื่อ Go API เข้าไปรันใน Container ของตัวเอง คำว่า `localhost` จะหมายถึงตัว Container `api` เอง ไม่ใช่ฐานข้อมูล! ใน Docker Compose ทุกบริการจะอยู่ในวงแลนเดียวกันและแปลงชื่อ Service เป็น IP ให้อัตโนมัติ เราจึงส่ง `environment: DB_SOURCE: ...@postgres:5432/...` เข้าไปที่บริการ `api` เพื่อให้ **`viper.AutomaticEnv()`** ที่เราเขียนไว้ในข้อ 1 นำค่านี้ไป **เขียนทับ (Override)** ค่า `localhost` ใน `app.env` ทันทีโดยไม่ต้องแก้โค้ด!",
            "**2. การควบคุมลำดับการสตาร์ตด้วย `healthcheck` และ `depends_on`**: หากสั่งรันทั้ง 3 ตัวพร้อมกัน ตัว `migrate` และ `api` มักจะบูตเสร็จภายในเสี้ยววินาที ในขณะที่ `postgres` ยังเตรียมระบบไฟล์ไม่เสร็จ ทำให้เกิด Error เชื่อมต่อไม่ได้ เราจึงต้องตั้ง `healthcheck` ใช้คำสั่ง `pg_isready` เช็กจนกว่าฐานข้อมูลจะพร้อมรับคำสั่งจริงๆ (`service_healthy`) แล้วจึงให้ `migrate` เริ่มรันสร้างตาราง และเมื่อ `migrate` ทำงานจบด้วยรหัส 0 (`service_completed_successfully`) จึงค่อยอนุญาตให้ `api` สตาร์ตขึ้นมาเป็นลำดับสุดท้าย",
          ],
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/docker-compose.yml` ดังนี้:",
        },
        {
          "t": "code",
          "lang": "yaml",
          "label": "simplebank/docker-compose.yml",
          "c": "services:\n  postgres:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_USER: root\n      POSTGRES_PASSWORD: secret\n      POSTGRES_DB: simple_bank\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U root -d simple_bank\"]\n      interval: 2s\n      retries: 10\n\n  migrate:\n    image: migrate/migrate:v4.19.0\n    volumes:\n      - ./db/migration:/migrations\n    command: [\"-path\", \"/migrations\", \"-database\", \"postgresql://root:secret@postgres:5432/simple_bank?sslmode=disable\", \"up\"]\n    depends_on:\n      postgres:\n        condition: service_healthy\n\n  api:\n    build: .\n    ports:\n      - \"8080:8080\"\n    environment:\n      DB_SOURCE: postgresql://root:secret@postgres:5432/simple_bank?sslmode=disable\n    depends_on:\n      migrate:\n        condition: service_completed_successfully",
        },
        {
          "t": "h2",
          "c": "4. สั่งรันทั้งระบบด้วยคำสั่งเดียว",
        },
        {
          "t": "p",
          "c": "ก่อนสั่งบิลด์ Docker Compose อย่าลืม **กด `Ctrl + C` เพื่อปิด `make server`** ที่รันค้างไว้บนเครื่องก่อนหน้านี้ (เพื่อไม่ให้พอร์ต `8080` ชนกัน) และรัน `go mod tidy` เพื่อให้ไฟล์ `go.sum` อัปเดตไลบรารี Viper ให้ครบถ้วน จากนั้นสั่งรัน `docker compose up --build` แล้วดูบริการทั้ง 3 รันขึ้นมาพร้อมเพรียงกัน:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "อัปเดต go.sum และสั่งรัน docker compose up",
          "code": "go mod tidy\ndocker compose up --build",
          "out": "[+] Building 4.2s (13/13) FINISHED\n[+] Running 3/3\n ✔ Container simplebank-postgres-1  Healthy\n ✔ Container simplebank-migrate-1   Exited (0)\n ✔ Container simplebank-api-1       Started\nsimplebank-api-1  | [GIN-debug] [WARNING] Running in \"debug\" mode. Switch to \"release\" mode in production.\nsimplebank-api-1  | 2026/10/30 14:40:00 server listening on 0.0.0.0:8080",
        },
        {
          "t": "h2",
          "c": "5. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ใน docker-compose.yml ทำไมใน service api ถึงต้องชี้ DB_SOURCE ไปที่ postgres:5432 แทน localhost:5432?",
              "options": [
                {
                  "text": "เพราะแต่ละ container มี localhost แยกเป็นของตนเอง การคุยข้าม container ต้องใช้ชื่อ service ที่ Docker DNS จัดการ resolve IP ให้",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! ภายใน Docker Network ชื่อ service 'postgres' จะถูกแปลงเป็น IP ภายในของ container ตัวนั้นโดยอัตโนมัติ"
                },
                {
                  "text": "เพราะ localhost ถูกจองไว้เฉพาะสำหรับเว็บเบราว์เซอร์เท่านั้น",
                  "isCorrect": false,
                  "explain": "ผิด localhost หมายถึง loopback interface 127.0.0.1 ภายใน container นั้นๆ"
                },
                {
                  "text": "เพราะ PostgreSQL ไม่อนุญาตให้เชื่อมต่อผ่าน localhost",
                  "isCorrect": false,
                  "explain": "ไม่จริง PostgreSQL รองรับ localhost ปกติเมื่อรันบน host เดียวกัน"
                }
              ],
              "explain": "Service discovery ผ่าน Docker DNS เป็นหัวใจสำคัญของการเชื่อมต่อ microservices ใน Docker Network"
            }
          ]
        },
        {
          "t": "callout",
          "title": "🎉 ยินดีด้วยครับ! คุณสร้างระบบธนาคารสำเร็จสมบูรณ์ 100%",
          "c": "โปรเจกต์ Simple Bank ของคุณถูกสร้างขึ้นมาอย่างประณีต ครบถ้วนทั้งความถูกต้องของข้อมูล (ACID), การรับมือ Concurrency ไร้ Deadlock, REST API พร้อม Validation, และความปลอดภัยระดับ Production!\n\nในโมดูลที่ 8 บทสุดท้าย เราจะมารวบรวม 10 คำถามสัมภาษณ์งานยอดฮิต และสรุปคำสั่งสำคัญทั้งหมดไว้ทบทวนกันครับ",
        },
      ],
      en: [],
    },
  },
};
