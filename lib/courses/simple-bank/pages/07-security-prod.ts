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
      th: "ทำไมห้ามใช้ MD5 หรือ SHA-256 เก็บพาสเวิร์ดเด็ดขาด — เจาะลึกกลไก Salt & Work Factor ของ Bcrypt และสร้างตาราง Users เชื่อมความสัมพันธ์กับ Accounts",
      en: "Why MD5/SHA fail for credentials — master Bcrypt salts and work factors, create Users table, and link accounts via foreign keys.",
    },
    group: "7. ความปลอดภัย & รันจริงระดับ Production",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• เข้าใจว่าทำไมฟังก์ชันแฮชเร็วๆ อย่าง MD5 หรือ SHA-256 ถึงอันตรายเมื่อใช้เก็บรหัสผ่าน\n• ใช้งาน `golang.org/x/crypto/bcrypt` แฮชรหัสผ่านด้วย Salt สุ่มและปรับระดับ Work Factor\n• สร้างตาราง `users` พร้อม Migration ผูก Foreign Key กับ `accounts` และบังคับ 1 คนมีได้ 1 บัญชีต่อสกุลเงิน\n\n⏱ **เวลาในการเรียนรู้**: ~25 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านโมดูล 6 เปิด REST API",
        },
        {
          "t": "h2",
          "c": "1. ทำไมห้ามใช้ MD5 หรือ SHA-256 เก็บพาสเวิร์ด?",
        },
        {
          "t": "p",
          "c": "ฟังก์ชันแฮชตระกูล MD5 หรือ SHA-256 ถูกออกแบบมาเพื่อ **'คำนวณให้เร็วที่สุด'** สำหรับการตรวจสอบความสมบูรณ์ของไฟล์ (Checksum) แต่สำหรับรหัสผ่าน **ยิ่งเร็ว = ยิ่งอันตราย** เพราะแฮกเกอร์สามารถใช้การ์ดจอ (GPU) ลองสุ่มรหัสผ่านได้เป็นพันล้านครั้งต่อวินาที (Brute-force) หรือเปิดตารางรหัสผ่านยอดฮิตที่เตรียมไว้ล่วงหน้า (Rainbow Table)",
        },
        {
          "t": "callout",
          "title": "🛡️ ทางรอด: Slow Hashing Algorithm ด้วย Bcrypt",
          "c": "Bcrypt มี 2 จุดแข็งที่แก้ปัญหาข้างต้นได้ 100%:\n1. **Cryptographic Salt**: Bcrypt จะสุ่มสตริงความยาว 16 ไบต์ (Salt) ผสมเข้าไปในรหัสผ่านทุกครั้ง แม้คนสองคนจะตั้งพาสเวิร์ดเหมือนกันเป๊ะ ผลลัพธ์ Hash ที่ได้จะไม่เหมือนกันเลย ป้องกันการโจมตีด้วย Rainbow Table ได้ทันที\n2. **Configurable Work Factor (Cost)**: เราสามารถกำหนดได้ว่าต้องวนลูปคำนวณกี่รอบ (ค่าเริ่มต้นคือ Cost 10 หรือ 2^10 = 1,024 รอบ) ทำให้การแฮช 1 ครั้งใช้เวลาประมาณ 100 มิลลิวินาที ซึ่งคนทั่วไปกดล็อกอินจะไม่รู้สึกช้า แต่ถ้าแฮกเกอร์จะ Brute-force พันล้านครั้ง จะต้องใช้เวลาหลายร้อยปี!",
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
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/password.go",
          "c": "package util\n\nimport (\n\t\"fmt\"\n\t\"golang.org/x/crypto/bcrypt\"\n)\n\n// HashPassword แปลงรหัสผ่าน Plaintext ให้เป็น Bcrypt Hash\nfunc HashPassword(password string) (string, error) {\n\thashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)\n\tif err != nil {\n\t\treturn \"\", fmt.Errorf(\"failed to hash password: %w\", err)\n\t}\n\treturn string(hashed), nil\n}\n\n// CheckPassword เปรียบเทียบรหัสผ่านที่ส่งมากับ Hash ในฐานข้อมูล\nfunc CheckPassword(password, hashed string) error {\n\treturn bcrypt.CompareHashAndPassword([]byte(hashed), []byte(password))\n}",
        },
        {
          "t": "h2",
          "c": "3. เพิ่มตาราง Users ด้วย Migration",
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ Migration คู่ที่ 2 `000002_add_users.up.sql` เพื่อสร้างตาราง `users` และผูก Foreign Key เข้ากับ `accounts`:",
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/migration/000002_add_users.up.sql",
          "c": "CREATE TABLE users (\n  username        varchar     PRIMARY KEY,\n  hashed_password varchar     NOT NULL,\n  full_name       varchar     NOT NULL,\n  email           varchar     UNIQUE NOT NULL,\n  created_at      timestamptz NOT NULL DEFAULT now()\n);\n\n-- ผูกบัญชีเข้ากับผู้ใช้งานจริง\nALTER TABLE accounts ADD FOREIGN KEY (owner) REFERENCES users (username);\n\n-- บังคับว่า 1 คนจะมีได้แค่ 1 บัญชีต่อสกุลเงินเท่านั้น (เช่น มีบัญชี USD ได้แค่บัญชีเดียว)\nALTER TABLE accounts ADD CONSTRAINT owner_currency_key UNIQUE (owner, currency);",
        },
        {
          "t": "h2",
          "c": "4. สร้าง Endpoint สมัครสมาชิก (POST /users)",
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/api/user.go` โดยมีจุดที่ต้องระวังคือ **ห้ามส่ง Hashed Password กลับไปใน JSON Response เด็ดขาด**:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/models.go (ส่วน User Model)",
          "c": "type User struct {\n\tUsername       string    `json:\"username\"`\n\tHashedPassword string    `json:\"-\"` // แท็ก json:\"-\" จะตัดฟิลด์นี้ทิ้งอัตโนมัติเมื่อ Serialize ออกเป็น JSON\n\tFullName       string    `json:\"full_name\"`\n\tEmail          string    `json:\"email\"`\n\tCreatedAt      time.Time `json:\"created_at\"`\n}",
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
      th: "ทำไมระบบรุ่นใหม่ถึงหนีจาก JWT สู่ PASETO — สร้างตัวสร้าง Token (PasetoMaker), ระบบล็อกอิน และ Gin Authentication Middleware ป้องกันสิทธิ์การโอนเงิน",
      en: "Why modern backends prefer PASETO over JWT — build a secure PasetoMaker, login endpoint, and Gin auth middleware.",
    },
    group: "7. ความปลอดภัย & รันจริงระดับ Production",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• เข้าใจข้อบกพร่องด้านความปลอดภัยของ JWT (ช่องโหว่ `alg: none` และ Algorithm Confusion) และเหตุผลที่ PASETO ปลอดภัยกว่า\n• สร้าง `PasetoMaker` เพื่อเข้ารหัสและถอดรหัส Payload ด้วยกุญแจ Symmetric Key 32 ไบต์\n• สร้าง Gin Middleware สกัด Token จาก Header `Authorization: Bearer <token>` และป้องกันไม่ให้ผู้ใช้เข้าถึงบัญชีของคนอื่น\n\n⏱ **เวลาในการเรียนรู้**: ~25 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านบท 7.1 การแฮชรหัสผ่านด้วย Bcrypt",
        },
        {
          "t": "h2",
          "c": "1. PASETO คืออะไร และทำไมถึงดีกว่า JWT?",
        },
        {
          "t": "p",
          "c": "**JWT (JSON Web Token)** เป็นมาตรฐานที่ได้รับความนิยมอย่างแพร่หลาย แต่มีจุดอ่อนด้านการออกแบบที่ร้ายแรงหลายประการ:",
        },
        {
          "t": "ul",
          "c": [
            "**เปิดให้ Client เลือก Algorithm เองได้**: ใน Header ของ JWT อนุญาตให้ระบุฟิลด์ `\"alg\"` ซึ่งในอดีตเคยเกิดช่องโหว่คลาสสิกที่แฮกเกอร์ส่ง `\"alg\": \"none\"` หรือสลับระหว่าง RSA กับ HMAC ทำให้เซิร์ฟเวอร์หลงเชื่อว่า Token ปลอมถูกต้อง",
            "**Payload ของ JWT เป็นแค่ Base64 ธรรมดา**: ใครๆ ก็สามารถถอดรหัสดูข้อมูลข้างในได้โดยไม่ต้องมีกุญแจลับ",
          ],
        },
        {
          "t": "p",
          "c": "**PASETO (Platform-Agnostic Security Tokens)** ถูกสร้างขึ้นมาเพื่อแก้ปัญหานี้โดยเฉพาะ โดยไม่มีช่องให้ Client เลือกระบุ Algorithm เอง ตัว Token ถูกเข้ารหัสทั้งก้อน (Encrypted Payload ในเวอร์ชัน Local) ด้วยมาตรฐานการเข้ารหัสสมัยใหม่อย่าง ChaCha20-Poly1305 ทำให้ไม่มีทางถูกปลอมแปลงหรือส่องดูข้อมูลข้างในได้เลย",
        },
        {
          "t": "h2",
          "c": "2. สร้าง PasetoMaker (token/paseto_maker.go)",
        },
        {
          "t": "p",
          "c": "ติดตั้งแพ็กเกจ `aidanwoods.dev/go-paseto` แล้วสร้างตัวสร้างและตรวจสอบ Token ใน `simplebank/token/paseto_maker.go`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/token/paseto_maker.go",
          "c": "package token\n\nimport (\n\t\"errors\"\n\t\"time\"\n\t\"aidanwoods.dev/go-paseto\"\n)\n\nvar (\n\tErrInvalidToken = errors.New(\"token is invalid\")\n\tErrExpiredToken = errors.New(\"token has expired\")\n)\n\ntype Payload struct {\n\tUsername  string    `json:\"username\"`\n\tIssuedAt  time.Time `json:\"issued_at\"`\n\tExpiredAt time.Time `json:\"expired_at\"`\n}\n\ntype PasetoMaker struct {\n\tkey paseto.V4SymmetricKey\n}\n\nfunc NewPasetoMaker(symmetricKey string) (*PasetoMaker, error) {\n\tkey, err := paseto.V4SymmetricKeyFromBytes([]byte(symmetricKey))\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\treturn &PasetoMaker{key: key}, nil\n}\n\nfunc (m *PasetoMaker) CreateToken(username string, duration time.Duration) (string, *Payload, error) {\n\tnow := time.Now()\n\tpayload := &Payload{Username: username, IssuedAt: now, ExpiredAt: now.Add(duration)}\n\n\tt := paseto.NewToken()\n\tt.SetIssuedAt(payload.IssuedAt)\n\tt.SetExpiration(payload.ExpiredAt)\n\tt.SetString(\"username\", username)\n\n\treturn t.V4Encrypt(m.key, nil), payload, nil\n}\n\nfunc (m *PasetoMaker) VerifyToken(tokenString string) (*Payload, error) {\n\tparser := paseto.NewParserWithoutExpiryCheck()\n\tt, err := parser.ParseV4Local(m.key, tokenString, nil)\n\tif err != nil {\n\t\treturn nil, ErrInvalidToken\n\t}\n\n\tusername, err := t.GetString(\"username\")\n\tif err != nil {\n\t\treturn nil, ErrInvalidToken\n\t}\n\texpiredAt, _ := t.GetExpiration()\n\tif time.Now().After(expiredAt) {\n\t\treturn nil, ErrExpiredToken\n\t}\n\tissuedAt, _ := t.GetIssuedAt()\n\n\treturn &Payload{Username: username, IssuedAt: issuedAt, ExpiredAt: expiredAt}, nil\n}",
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
          "c": "package api\n\nimport (\n\t\"errors\"\n\t\"net/http\"\n\t\"strings\"\n\t\"github.com/gin-gonic/gin\"\n\t\"simplebank/token\"\n)\n\nconst authPayloadKey = \"auth_payload\"\n\nfunc authMiddleware(tokenMaker *token.PasetoMaker) gin.HandlerFunc {\n\treturn func(ctx *gin.Context) {\n\t\theader := ctx.GetHeader(\"Authorization\")\n\t\tfields := strings.Fields(header)\n\n\t\tif len(fields) != 2 || strings.ToLower(fields[0]) != \"bearer\" {\n\t\t\tctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(errors.New(\"authorization header missing or malformed\")))\n\t\t\treturn\n\t\t}\n\n\t\tpayload, err := tokenMaker.VerifyToken(fields[1])\n\t\tif err != nil {\n\t\t\tctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))\n\t\t\treturn\n\t\t}\n\n\t\t// ฝาก Payload ไว้ใน Context เพื่อให้ Handler ตัวถัดไปดึงไปดูได้ว่าใครกำลังล็อกอินอยู่\n\t\tctx.Set(authPayloadKey, payload)\n\t\tctx.Next()\n\t}\n}",
        },
        {
          "t": "h2",
          "c": "4. ปกป้อง Endpoints สำคัญ (Accounts & Transfers)",
        },
        {
          "t": "p",
          "c": "ใน `server.go` เราจัดกลุ่ม Route ที่ต้องล็อกอินไว้ภายใต้ Middleware นี้:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/server.go (ส่วนจัดกลุ่ม Route ปลอดภัย)",
          "c": "// Route สาธารณะ\nrouter.POST(\"/users\", server.createUser)\nrouter.POST(\"/users/login\", server.loginUser)\n\n// Route ที่ต้องมี Token ยืนยันตัวตนเสมอ\nauth := router.Group(\"/\").Use(authMiddleware(server.tokenMaker))\nauth.POST(\"/accounts\", server.createAccount)\nauth.GET(\"/accounts/:id\", server.getAccount)\nauth.GET(\"/accounts\", server.listAccounts)\nauth.POST(\"/transfers\", server.createTransfer)",
        },
        {
          "t": "callout",
          "title": "🔒 กฎความปลอดภัยระดับบัญชี (Authorization Rule)",
          "c": "เมื่อ Alice ส่งคำสั่งโอนเงิน ตัว Handler `createTransfer` จะตรวจสอบว่า `fromAccount.Owner == payload.Username` เสมอ ทำให้ Alice ไม่มีทางแอบยิงคำสั่งสั่งตัดเงินออกจากบัญชีของ Bob ได้อีกต่อไป!",
        },
        {
          "t": "h2",
          "c": "5. เช็กความเข้าใจ (Quick Quiz)",
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
          "c": "1. บริหาร Config ตามหลัก 12-Factor App ด้วย Viper",
        },
        {
          "t": "p",
          "c": "ตามกฎข้อที่ 3 ของ **The Twelve-Factor App** (มาตรฐานสากลสำหรับ Cloud-Native Apps): **ห้าม Hardcode ค่า Connection String หรือ Security Key ลงใน Source Code เด็ดขาด!** ค่าเหล่านี้ต้องถูกอ่านจาก Environment Variables เสมอ",
        },
        {
          "t": "p",
          "c": "เราใช้ไลบรารี **Viper** ในการอ่านค่าจากไฟล์ `app.env` ในระหว่างพัฒนา และยอมให้ Environment Variable จริงในเซิร์ฟเวอร์เขียนทับ (Override) ได้อัตโนมัติใน `simplebank/util/config.go`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/config.go",
          "c": "package util\n\nimport (\n\t\"time\"\n\t\"github.com/spf13/viper\"\n)\n\ntype Config struct {\n\tDBSource            string        `mapstructure:\"DB_SOURCE\"`\n\tHTTPServerAddress   string        `mapstructure:\"HTTP_SERVER_ADDRESS\"`\n\tTokenSymmetricKey   string        `mapstructure:\"TOKEN_SYMMETRIC_KEY\"`\n\tAccessTokenDuration time.Duration `mapstructure:\"ACCESS_TOKEN_DURATION\"`\n}\n\nfunc LoadConfig(path string) (config Config, err error) {\n\tviper.AddConfigPath(path)\n\tviper.SetConfigName(\"app\")\n\tviper.SetConfigType(\"env\")\n\n\tviper.AutomaticEnv() // อ่าน Environment Variables จริงมาทับได้ทันที\n\n\tif err = viper.ReadInConfig(); err != nil {\n\t\treturn\n\t}\n\terr = viper.Unmarshal(&config)\n\treturn\n}",
        },
        {
          "t": "h2",
          "c": "2. Multi-Stage Dockerfile: เล็กเพียง 20MB",
        },
        {
          "t": "p",
          "c": "ถ้าเราใช้ Dockerfile ธรรมดาที่มี Go Compiler อยู่ข้างใน อิมเมจจะมีขนาดใหญ่เกือบ 1 GB! แต่ด้วยเทคนิค **Multi-Stage Build** เราแบ่งการสร้างออกเป็น 2 จังหวะ:",
        },
        {
          "t": "ol",
          "c": [
            "**Stage 1 (Builder)**: ใช้ `golang:1.27-alpine` คอมไพล์ซอร์สโค้ดออกมาเป็น Executable Binary ก้อนเดียว",
            "**Stage 2 (Runner)**: ใช้ `alpine` เพียวๆ และหยิบเอา **เฉพาะไฟล์ Binary** จาก Stage แรกมาใส่ ทำให้ขนาดอิมเมจสุดท้ายเหลือเพียง ~20 MB เท่านั้น ทั้งโหลดเร็วและปลอดภัยไร้เครื่องมือส่วนเกิน",
          ],
        },
        {
          "t": "code",
          "lang": "dockerfile",
          "label": "simplebank/Dockerfile",
          "c": "# Stage 1: Build\nFROM golang:1.27-alpine AS builder\nWORKDIR /app\nCOPY go.mod go.sum ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 go build -o simplebank main.go\n\n# Stage 2: Run (Production Runner)\nFROM alpine:3.22\nWORKDIR /app\nCOPY --from=builder /app/simplebank .\nCOPY app.env .\nEXPOSE 8080\nCMD [\"/app/simplebank\"]",
        },
        {
          "t": "h2",
          "c": "3. รวมระบบด้วย Docker Compose",
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `docker-compose.yml` เพื่อให้ทุก Service (Postgres, Migration, และ Go API) สตาร์ตร่วมกันตามลำดับที่ถูกต้องด้วย Healthcheck:",
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
          "c": "สั่งรัน `docker compose up --build` แล้วดูบริการทั้ง 3 รันขึ้นมาพร้อมเพรียงกัน:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ผลลัพธ์การสั่งรัน docker compose up",
          "code": "docker compose up --build",
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
