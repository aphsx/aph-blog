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
          c: "เราจะสร้าง Migration ไฟล์ใหม่เพื่อเพิ่มตาราง `users` และปรับปรุงตาราง `accounts` ให้ผูกความสัมพันธ์:",
        },
        {
          t: "code",
          lang: "sql",
          label: "db/migration/000002_add_users.up.sql",
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

        { t: "h2", c: "3. ฟังก์ชันแฮชและตรวจสอบรหัสผ่านใน Go" },
        {
          t: "p",
          c: "เราจะใช้แพ็กเกจ `golang.org/x/crypto/bcrypt` ในการจัดการรหัสผ่าน:",
        },
        {
          t: "code",
          lang: "go",
          label: "util/password.go",
          c: `package util

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
)

// HashPassword แปลงรหัสผ่าน Plain Text ให้กลายเป็น Bcrypt Hash
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("ไม่สามารถแฮชรหัสผ่านได้: %w", err)
	}
	return string(hashedPassword), nil
}

// CheckPassword ตรวจสอบว่ารหัสผ่านที่ป้อนเข้ามา ตรงกับ Bcrypt Hash ในฐานข้อมูลหรือไม่
func CheckPassword(password string, hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}`,
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

        { t: "h2", c: "4. การซ่อน Hashed Password ตอนส่ง JSON กลับไป" },
        {
          t: "p",
          c: "ใน API สมัครสมาชิก `POST /users` เมื่อสร้างผู้ใช้สำเร็จ เรา **ห้ามส่ง `hashed_password` กลับไปใน JSON Response เด็ดขาด** เพื่อสุขอนามัยที่ดีของระบบความปลอดภัย:",
        },
        {
          t: "code",
          lang: "go",
          label: "api/user.go",
          c: `type createUserRequest struct {
	Username string \`json:"username" binding:"required,alphanum"\`
	Password string \`json:"password" binding:"required,min=6"\`
	FullName string \`json:"full_name" binding:"required"\`
	Email    string \`json:"email" binding:"required,email"\`
}

// userResponse คือ struct ที่ตัดฟิลด์ hashedPassword ทิ้งไป
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
}`,
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
          c: "ข้อมูลภายใน Token จะประกอบด้วย `Username`, เวลาที่ออกตั๋ว (`IssuedAt`), และเวลาหมดอายุ (`ExpiredAt`):",
        },
        {
          t: "code",
          lang: "go",
          label: "token/payload.go",
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

        { t: "h2", c: "2. การสร้าง Gin Authentication Middleware" },
        {
          t: "p",
          c: "เราจะสร้าง Middleware มาดักหน้าทุก Endpoint ที่ต้องการความปลอดภัย หากไม่มี Token หรือ Token ปลอม ระบบจะปฏิเสธคำขอทันทีด้วย **401 Unauthorized**:",
        },
        {
          t: "code",
          lang: "go",
          label: "api/middleware.go",
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

        { t: "h2", c: "3. ปกป้องคำสั่งโอนเงิน: ป้องกันคนอื่นมาแอบสั่งโอนแทนเรา" },
        {
          t: "p",
          c: "ในฟังก์ชัน `createTransfer` เราต้องเพิ่มการตรวจสอบว่า **ผู้ใช้ที่ถือ Token ล็อกอินเข้ามา เป็นเจ้าของบัญชีต้นทาง (`FromAccountID`) จริงหรือไม่**:",
        },
        {
          t: "code",
          lang: "go",
          label: "api/transfer.go (Authorization Check)",
          c: `// ดึงข้อมูลตัวตนของผู้ใช้ที่ผ่านการตรวจสอบจาก Auth Middleware
authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

fromAccount, err := server.store.GetAccount(ctx, req.FromAccountID)
if err != nil {
	// ... จัดการกรณีไม่พบบัญชี
}

// ตรวจสอบสิทธิ์: คุณไม่ใช่เจ้าของบัญชีนี้ คุณไม่มีสิทธิ์สั่งโอนเงินออก!
if fromAccount.Owner != authPayload.Username {
	err := errors.New("บัญชีต้นทางไม่ได้เป็นของคุณ คุณไม่มีสิทธิ์โอนเงิน")
	ctx.JSON(http.StatusUnauthorized, errorResponse(err))
	return
}`,
        },
        {
          t: "p",
          c: "เพียงเท่านี้ ระบบธนาคารของเราก็จะมีเกราะป้องกัน 2 ชั้น ทั้งการเข้ารหัสตั๋วที่แน่นหนา และการตรวจสอบความเป็นเจ้าของทรัพยากรทุกครั้งก่อนตัดเงิน!",
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
          c: "เราจะใช้ไลบรารี **Viper** ซึ่งสามารถอ่านค่าคอนฟิกได้ทั้งจากไฟล์ `.env` ในช่วงพัฒนาบนเครื่องตัวเอง และดึงค่าจาก System Environment Variables อัตโนมัติเมื่อรันบน Docker หรือ Kubernetes:",
        },
        {
          t: "code",
          lang: "go",
          label: "util/config.go",
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

        { t: "h2", c: "2. การเขียน Multi-Stage Dockerfile แบบมืออาชีพ" },
        {
          t: "p",
          c: "หากเราใช้ Docker Image ของ Go ทั่วไปในการรัน ขนาดของ Container จะใหญ่ถึง 800MB–1GB ซึ่งเปลืองพื้นที่และดาวน์โหลดช้ามาก เราสามารถใช้เทคนิค **Multi-Stage Build** เพื่อคอมไพล์โค้ดใน Stage แรก แล้วก๊อปปี้เฉพาะไฟล์ไบนารีที่รันได้จริงไปใส่ใน Image ตัวจิ๋วอย่าง `alpine` ใน Stage ที่สอง:",
        },
        {
          t: "code",
          lang: "dockerfile",
          label: "Dockerfile (Multi-Stage)",
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
          label: "docker-compose.yml",
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
