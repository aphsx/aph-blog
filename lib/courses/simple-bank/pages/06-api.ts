import type { Page } from "@/lib/types";

export const apiPages: Record<string, Page> = {
  "bank-rest-api-gin": {
    slug: "bank-rest-api-gin",
    title: {
      th: "สร้าง REST API Server ด้วย Gin Framework",
      en: "Building a RESTful API with Gin Framework",
    },
    lead: {
      th: "เชื่อมต่อ Data Store เข้ากับเว็บเซิร์ฟเวอร์ความเร็วสูงด้วย Gin Gonic, วางโครงสร้าง Dependency Injection, จัดการ HTTP Status Codes และทำ JSON Error Handling",
      en: "Connecting the store layer to a blazing-fast HTTP server with Gin Gonic, dependency injection, and clean error handling.",
    },
    group: "6. RESTful Web API & Validation",
    blocks: {
      th: [
        {
          t: "p",
          c: "หลังจากที่เราสร้าง Data Store Layer และทดสอบจนมั่นใจแล้ว ขั้นตอนต่อไปคือการเปิดประตูให้โลกภายนอก (Web Browser, Mobile App, Microservices อื่นๆ) สามารถเข้ามาใช้งานระบบธนาคารของเราได้ผ่าน **RESTful HTTP API**",
        },
        {
          t: "p",
          c: "เราจะเลือกใช้ **Gin Web Framework (`github.com/gin-gonic/gin`)** ซึ่งเป็น Web Framework ที่ได้รับความนิยมสูงสุดในภาษา Go โดดเด่นเรื่องความเร็ว ประหยัดหน่วยความจำ และมีระบบ Middleware ที่ยืดหยุ่นมาก",
        },

        { t: "h2", c: "1. โครงสร้าง Server และการทำ Dependency Injection" },
        {
          t: "p",
          c: "เราจะสร้าง `Server` struct ในแพ็กเกจ `api` โดยฉีด (Inject) `*db.Store` เข้าไปใน Server เพื่อให้ทุก API Handler สามารถเข้าถึงฐานข้อมูลได้โดยไม่ต้องใช้ Global Variable:",
        },
        {
          t: "code",
          lang: "go",
          label: "api/server.go",
          c: `// โครงสร้าง Server และการผูก Routing ผ่าน Gin Web Framework พร้อม Dependency Injection
// ทำเพื่อแก้ปัญหา: หลีกเลี่ยงการใช้ Global Variable ในการเข้าถึง Database
// การ Inject db.Store เข้าไปใน Server struct ทำให้โค้ดเป็นระเบียบ และสามารถ Mock ได้ง่ายตอนทำ Unit Test
package api

import (
	"github.com/gin-gonic/gin"
	db "simplebank/db"
)

// Server ทำหน้าที่จัดการ HTTP requests ทั้งหมดของระบบธนาคาร
type Server struct {
	store  *db.Store   // ที่เก็บตัวเชื่อมต่อฐานข้อมูลและทรานแซกชัน
	router *gin.Engine // ตัวจัดการเส้นทาง HTTP Routing ของ Gin
}

// NewServer ทำหน้าที่กำหนดค่าเริ่มต้น สร้าง Router และลงทะเบียนเส้นทาง API ทั้งหมด
func NewServer(store *db.Store) *Server {
	// 1. สร้าง Instance ของ Server พร้อมแนบ store เข้าไป
	server := &Server{store: store}
	router := gin.Default()

	// 2. ลงทะเบียน Routing สำหรับแต่ละ Endpoint
	router.POST("/accounts", server.createAccount)
	router.GET("/accounts/:id", server.getAccount)
	router.GET("/accounts", server.listAccounts)
	router.POST("/transfers", server.createTransfer)

	// 3. แนบ Router กลับเข้าไปใน Server
	server.router = router
	return server
}

// Start เปิดรันเซิร์ฟเวอร์บน Address ที่กำหนด (เช่น ":8080")
func (server *Server) Start(address string) error {
	return server.router.Run(address)
}

// errorResponse จัดรูปแบบข้อความ Error ให้อยู่ใน JSON Key "error" อย่างสม่ำเสมอ
func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}`,
        },

        { t: "h2", c: "2. การสร้าง Handler: `POST /accounts`" },
        {
          t: "p",
          c: "เมื่อมีคำขอส่ง JSON เข้ามาเพื่อเปิดบัญชีใหม่ เราจะใช้ `ctx.ShouldBindJSON` เพื่อแกะข้อมูลและตรวจสอบเงื่อนไขเบื้องต้นอัตโนมัติ:",
        },
        {
          t: "code",
          lang: "go",
          label: "api/account.go (CreateAccount)",
          c: `// API Handler สำหรับจัดการการเปิดบัญชีใหม่ (POST /accounts)
// ทำเพื่อแก้ปัญหา: แกะ JSON Payload ตรวจสอบความถูกต้อง (Validation) ก่อนส่งไปบันทึกลงในฐานข้อมูล
package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	db "simplebank/db"
)

// createAccountRequest กำหนดโครงสร้าง JSON ขาเข้า พร้อมกฎการตรวจสอบความถูกต้อง (Binding Tags)
type createAccountRequest struct {
	Owner    string \`json:"owner" binding:"required"\`
	Currency string \`json:"currency" binding:"required,oneof=USD EUR THB"\` // สกุลเงินต้องตรงตามที่อนุญาต
}

func (server *Server) createAccount(ctx *gin.Context) {
	// 1. แกะ JSON Payload และตรวจสอบเงื่อนไขความถูกต้อง
	var req createAccountRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err)) // ส่ง 400 Bad Request หากข้อมูลผิดรูปแบบ
		return
	}

	// 2. เตรียมพารามิเตอร์สำหรับบันทึกลงฐานข้อมูล (ยอดเงินเปิดบัญชีเริ่มต้นที่ 0 เสมอ)
	arg := db.CreateAccountParams{
		Owner:    req.Owner,
		Currency: req.Currency,
		Balance:  0,
	}

	// 3. ยิงคำสั่งสร้างบัญชีผ่าน store
	account, err := server.store.CreateAccount(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err)) // ส่ง 500 หากฐานข้อมูลมีปัญหา
		return
	}

	// 4. ส่งข้อมูลบัญชีที่สร้างเสร็จสมบูรณ์กลับไปในรูปแบบ JSON พร้อม HTTP Status 201 Created
	ctx.JSON(http.StatusCreated, account)
}`,
        },
        {
          t: "ul",
          c: [
            "**`binding:\"required,oneof=USD EUR THB\"`**: เป็นการสั่งให้ Gin ตรวจสอบว่าต้องมีค่าส่งมา และต้องเป็น 1 ใน 3 สกุลเงินนี้เท่านั้น หากส่งค่าว่างหรือส่งสกุลเงินอื่นมา Gin จะตอบกลับ HTTP 400 Bad Request ทันทีโดยไม่ต้องเขียน `if-else` เอง",
            "**`http.StatusCreated` (201)**: เป็น Status Code มาตรฐานสำหรับการสร้างทรัพยากรใหม่ในระบบ",
          ],
        },
        {
          t: "codeout",
          lang: "bash",
          label: "ทดสอบยิง curl POST /accounts สร้างบัญชีใหม่ใน Terminal",
          code: `curl -i -X POST http://localhost:8080/accounts \\
  -H "Content-Type: application/json" \\
  -d '{
    "owner": "alice",
    "currency": "USD"
  }'`,
          out: `HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Date: Sat, 26 Sep 2026 10:00:00 GMT
Content-Length: 104

{
  "id": 1,
  "owner": "alice",
  "balance": 0,
  "currency": "USD",
  "created_at": "2026-09-26T10:00:00.123456Z"
}`,
        },

        { t: "h2", c: "3. การสร้าง Handler: `GET /accounts/:id`" },
        {
          t: "p",
          c: "การดึงข้อมูลบัญชีรายตัวผ่าน URI Parameter เช่น `/accounts/42`:",
        },
        {
          t: "code",
          lang: "go",
          label: "api/account.go (GetAccount)",
          c: `type getAccountRequest struct {
	ID int64 \`uri:"id" binding:"required,min=1"\`
}

func (server *Server) getAccount(ctx *gin.Context) {
	var req getAccountRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	account, err := server.store.GetAccount(ctx, req.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			// หากไม่พบบัญชี ให้ตอบ 404 Not Found
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		// หากฐานข้อมูลล่ม ให้ตอบ 500 Internal Server Error
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, account) // ส่ง HTTP 200 OK
}`,
        },
        {
          t: "callout",
          title: "🎯 หลักการกำหนด HTTP Status Code ที่ดี",
          c: "แยกแยะข้อผิดพลาดให้ชัดเจนเสมอ:\n- ลูกค้าส่งข้อมูลผิด (เช่น ID ติดลบ, ส่ง JSON ไม่ครบ) -> ใช้ **400 Bad Request**\n- ข้อมูลไม่มีในระบบ -> ใช้ **404 Not Found**\n- เซิร์ฟเวอร์หรือฐานข้อมูลพัง -> ใช้ **500 Internal Server Error**",
        },
        {
          t: "codeout",
          lang: "bash",
          label: "ทดสอบยิง curl GET /accounts/:id (เปรียบเทียบ 200 OK vs 404 Not Found)",
          code: `# 1. ดึงข้อมูลบัญชี ID = 1 ที่มีอยู่จริง
curl -i http://localhost:8080/accounts/1

# 2. ดึงข้อมูลบัญชี ID = 99999 ที่ไม่มีอยู่จริง
curl -i http://localhost:8080/accounts/99999`,
          out: `[เคสที่ 1: พบบัญชีในระบบ]
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "id": 1,
  "owner": "alice",
  "balance": 0,
  "currency": "USD",
  "created_at": "2026-09-26T10:00:00.123456Z"
}

[เคสที่ 2: ไม่พบบัญชีในระบบ]
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{
  "error": "sql: no rows in result set"
}`,
        },

        { t: "h2", c: "4. การสร้าง Handler: `GET /accounts` (Pagination)" },
        {
          t: "p",
          c: "การดึงข้อมูลรายการบัญชีทั้งหมดแบบแบ่งหน้า (Pagination) เพื่อไม่ให้เซิร์ฟเวอร์โหลดข้อมูลมากเกินไปในคำขอเดียว โดยรับ Query Parameters ผ่าน `ctx.ShouldBindQuery`:",
        },
        {
          t: "code",
          lang: "go",
          label: "api/account.go (ListAccounts)",
          c: `// listAccountsRequest กำหนด Query Parameters สำหรับการแบ่งหน้า (Pagination)
type listAccountsRequest struct {
	PageID   int32 \`form:"page_id" binding:"required,min=1"\`
	PageSize int32 \`form:"page_size" binding:"required,min=5,max=10"\`
}

func (server *Server) listAccounts(ctx *gin.Context) {
	// 1. แกะ Query Parameters จาก URL (?page_id=1&page_size=5) ผ่าน ShouldBindQuery
	var req listAccountsRequest
	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// 2. คำนวณ Limit และ Offset สำหรับส่งให้คำสั่ง SQL (Offset = (PageID - 1) * PageSize)
	arg := db.ListAccountsParams{
		Limit:  req.PageSize,
		Offset: (req.PageID - 1) * req.PageSize,
	}

	// 3. ดึงรายชื่อบัญชีจากฐานข้อมูลผ่าน store
	accounts, err := server.store.ListAccounts(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// 4. ส่ง JSON Array ของบัญชีกลับไปพร้อม HTTP 200 OK
	ctx.JSON(http.StatusOK, accounts)
}`,
        },
        {
          t: "ul",
          c: [
            "**`form:\"page_id\"`**: Gin จะอ่านค่าจาก URL Query String เช่น `?page_id=1&page_size=5`",
            "**`binding:\"required,min=5,max=10\"`**: บังคับให้ขนาดหน้าต้องอยู่ระหว่าง 5 ถึง 10 แถว เพื่อป้องกันผู้ใช้ขอข้อมูลครั้งละ 1,000,000 แถวจนหน่วยความจำเซิร์ฟเวอร์เต็ม (DoS Protection)",
            "**`Offset = (PageID - 1) * PageSize`**: สูตรคำนวณตำแหน่งเริ่มต้นของข้อมูลในฐานข้อมูล เช่น หน้าที่ 2 ขนาด 5 แถว จะได้ Offset = 5 (ข้าม 5 แถวแรกไป)",
          ],
        },
        {
          t: "codeout",
          lang: "bash",
          label: "ทดสอบยิง curl GET /accounts แบบแบ่งหน้า (Pagination) ใน Terminal",
          code: `curl -i "http://localhost:8080/accounts?page_id=1&page_size=5"`,
          out: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
  {
    "id": 1,
    "owner": "alice",
    "balance": 0,
    "currency": "USD",
    "created_at": "2026-09-26T10:00:00.123456Z"
  },
  {
    "id": 2,
    "owner": "bob",
    "balance": 1000,
    "currency": "USD",
    "created_at": "2026-09-26T10:01:00.654321Z"
  }
]`,
        },
      ],
      en: [],
    },
  },

  "bank-api-validation": {
    slug: "bank-api-validation",
    title: {
      th: "Data Validation & ป้องกันการโอนข้ามสกุลเงิน",
      en: "Data Validation & Cross-Currency Safety",
    },
    lead: {
      th: "สร้าง Custom Validator ใน Gin ตรวจสอบสกุลเงิน และเขียนกฎทางธุรกิจป้องกันความเสียหายจากการโอนเงินต่างสกุลโดยไม่มีอัตราแลกเปลี่ยน",
      en: "Implementing custom validators in Gin and enforcing currency-matching business rules.",
    },
    group: "6. RESTful Web API & Validation",
    blocks: {
      th: [
        {
          t: "p",
          c: "ลองคิดดูว่าจะเกิดอะไรขึ้นถ้ามีคนพยายามโอนเงิน **100 USD ไปยังบัญชีที่เก็บเป็นสกุล THB**? หากระบบของเราเพียงแค่นำตัวเลข 100 ไปตัดบัญชีต้นทางแล้วเพิ่ม 100 ในบัญชีปลายทาง ผู้รับจะได้เงินเพียง 100 บาท (ขาดทุนมหาศาล) หรือหากโอนกลับกัน ผู้รับจะได้ 100 ดอลลาร์ทั้งที่โอนมาแค่ 100 บาท! นี่คือช่องโหว่ร้ายแรงที่ระบบธนาคารต้องดักจับตั้งแต่ประตูหน้าบ้าน",
        },

        { t: "h2", c: "1. การสร้าง Custom Validator สำหรับ Currency ใน Go" },
        {
          t: "p",
          c: "เราจะสร้างฟังก์ชันตรวจสอบสกุลเงินที่รองรับ โดยใช้อินเทอร์เฟซ `validator.Func`:",
        },
        {
          t: "code",
          lang: "go",
          label: "api/validator.go",
          c: `package api

import (
	"github.com/go-playground/validator/v10"
	"simplebank/util"
)

// validCurrency ตรวจสอบว่าสกุลเงินที่ส่งมาอยู่ในกลุ่มที่ระบบรองรับหรือไม่
var validCurrency validator.Func = func(fieldLevel validator.FieldLevel) bool {
	if currency, ok := fieldLevel.Field().Interface().(string); ok {
		return util.IsSupportedCurrency(currency)
	}
	return false
}`,
        },
        {
          t: "p",
          c: "และใน `util/currency.go` เรานิยามสกุลเงินที่รองรับ:",
        },
        {
          t: "code",
          lang: "go",
          label: "util/currency.go",
          c: `package util

const (
	USD = "USD"
	EUR = "EUR"
	THB = "THB"
)

func IsSupportedCurrency(currency string) bool {
	switch currency {
	case USD, EUR, THB:
		return true
	}
	return false
}`,
        },

        { t: "h2", c: "2. ลงทะเบียน Custom Validator เข้ากับ Gin Engine" },
        {
          t: "p",
          c: "ในฟังก์ชัน `NewServer` ให้เราดึง Validator Engine ของ Gin ออกมา แล้วลงทะเบียนแท็กชื่อ `currency`:",
        },
        {
          t: "code",
          lang: "go",
          label: "api/server.go (Register Validator)",
          c: `import (
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

func NewServer(store *db.Store) *Server {
	server := &Server{store: store}
	router := gin.Default()

	// ลงทะเบียน validator tag ใหม่
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterValidation("currency", validCurrency)
	}

	// ... routing อื่นๆ
	return server
}`,
        },
        {
          t: "codeout",
          lang: "bash",
          label: "ทดสอบ Custom Currency Validator เมื่อส่งสกุลเงินที่ไม่รองรับ (XYZ)",
          code: `curl -i -X POST http://localhost:8080/accounts \\
  -H "Content-Type: application/json" \\
  -d '{
    "owner": "alice",
    "currency": "XYZ"
  }'`,
          out: `HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "error": "Key: 'createAccountRequest.Currency' Error:Field validation for 'Currency' failed on the 'oneof' tag"
}`,
        },

        { t: "h2", c: "3. Endpoint โอนเงิน: `POST /transfers` พร้อมกฎ Currency Match" },
        {
          t: "p",
          c: "มาดูโค้ดของ Handler โอนเงิน ซึ่งต้องเช็กทั้งรูปแบบข้อมูล และตรวจสอบว่าบัญชีทั้งสองฝั่งใช้สกุลเงินเดียวกันกับที่ระบุในคำขอโอนหรือไม่:",
        },
        {
          t: "code",
          lang: "go",
          label: "api/transfer.go",
          c: `// API Handler สำหรับจัดการการโอนเงิน (POST /transfers)
// ทำเพื่อแก้ปัญหา: ตรวจสอบความถูกต้องของบัญชีต้นทาง-ปลายทาง และสกุลเงิน ก่อนส่งคำสั่งเข้า Transaction
// ป้องกันการเปิด Transaction เสียเที่ยว และป้องกันการแฮกด้วยยอดเงินติดลบ
package api

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	db "simplebank/db"
)

// transferRequest กำหนดโครงสร้าง JSON สำหรับคำขอโอนเงิน พร้อมเงื่อนไขความปลอดภัย
type transferRequest struct {
	FromAccountID int64  \`json:"from_account_id" binding:"required,min=1"\`
	ToAccountID   int64  \`json:"to_account_id" binding:"required,min=1"\`
	Amount        int64  \`json:"amount" binding:"required,gt=0"\`         // จำนวนเงินต้องมากกว่า 0 ห้ามติดลบเด็ดขาด
	Currency      string \`json:"currency" binding:"required,currency"\`
}

func (server *Server) createTransfer(ctx *gin.Context) {
	// 1. แกะ JSON Payload และตรวจสอบความถูกต้องของข้อมูล
	var req transferRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// 2. ตรวจสอบว่าบัญชีต้นทางมีอยู่จริง และสกุลเงินตรงกับคำขอโอนหรือไม่
	if !server.validAccount(ctx, req.FromAccountID, req.Currency) {
		return
	}

	// 3. ตรวจสอบว่าบัญชีปลายทางมีอยู่จริง และสกุลเงินตรงกับคำขอโอนหรือไม่
	if !server.validAccount(ctx, req.ToAccountID, req.Currency) {
		return
	}

	// 4. เตรียมพารามิเตอร์ส่งต่อไปยัง Transaction Manager
	arg := db.TransferTxParams{
		FromAccountID: req.FromAccountID,
		ToAccountID:   req.ToAccountID,
		Amount:        req.Amount,
	}

	// 5. สั่งรันการโอนเงินแบบ Atomic ผ่าน TransferTx
	result, err := server.store.TransferTx(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	// 6. ส่งผลลัพธ์การโอนเงินสำเร็จกลับไปให้หน้าบ้าน
	ctx.JSON(http.StatusOK, result)
}

// validAccount ตรวจสอบความมีอยู่จริงและสกุลเงินของบัญชีก่อนเริ่มทำ Transaction
func (server *Server) validAccount(ctx *gin.Context, accountID int64, currency string) bool {
	// ค้นหาข้อมูลบัญชีจากฐานข้อมูล
	account, err := server.store.GetAccount(ctx, accountID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err)) // ไม่พบบัญชี ส่ง 404
			return false
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err)) // ข้อผิดพลาดฝั่งเซิร์ฟเวอร์ ส่ง 500
		return false
	}

	// ตรวจสอบความสอดคล้องของสกุลเงิน ป้องกันการโอนข้ามสกุลเงินโดยไม่แปลงค่า
	if account.Currency != currency {
		err := fmt.Errorf("สกุลเงินของบัญชี [%d] คือ %s ไม่ตรงกับคำขอโอน %s", accountID, account.Currency, currency)
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return false
	}

	return true
}`,
        },
        {
          t: "h3", c: "อธิบายความปลอดภัยของโค้ดนี้" },
        {
          t: "ul",
          c: [
            "**`binding:\"required,gt=0\"`**: ป้องกันการส่งจำนวนเงินติดลบ เช่น โอนเงิน `-500` บาท ซึ่งอาจถูกใช้เป็นช่องโหว่ในการดูดเงินจากปลายทางกลับเข้ากระเป๋าตัวเอง",
            "**`validAccount(...)`**: ตรวจสอบบัญชีก่อนส่งคำสั่งเข้า Transaction ช่วยลดภาระของฐานข้อมูล (Database Load) ไม่ต้องเปิด Transaction โดยเปล่าประโยชน์หากบัญชีไม่มีอยู่จริงหรือสกุลเงินไม่ตรงกัน",
            "**Currency Consistency**: การันตีว่าไม่มีการโอนข้ามสกุลเงินเกิดขึ้น ข้อมูลเงินในระบบจะถูกต้องตรงตามความเป็นจริง 100%",
          ],
        },
        {
          t: "codeout",
          lang: "bash",
          label: "ทดสอบยิง curl POST /transfers (โอนเงินสำเร็จ 200 OK)",
          code: `curl -i -X POST http://localhost:8080/transfers \\
  -H "Content-Type: application/json" \\
  -d '{
    "from_account_id": 1,
    "to_account_id": 2,
    "amount": 100,
    "currency": "USD"
  }'`,
          out: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "transfer": {
    "id": 1,
    "from_account_id": 1,
    "to_account_id": 2,
    "amount": 100,
    "created_at": "2026-09-26T10:05:00.654321Z"
  },
  "from_account": {
    "id": 1,
    "owner": "alice",
    "balance": 900,
    "currency": "USD",
    "created_at": "2026-09-26T10:00:00.123456Z"
  },
  "to_account": {
    "id": 2,
    "owner": "bob",
    "balance": 600,
    "currency": "USD",
    "created_at": "2026-09-26T10:01:00.123456Z"
  },
  "from_entry": {
    "id": 1,
    "account_id": 1,
    "amount": -100,
    "created_at": "2026-09-26T10:05:00.654321Z"
  },
  "to_entry": {
    "id": 2,
    "account_id": 2,
    "amount": 100,
    "created_at": "2026-09-26T10:05:00.654321Z"
  }
}`,
        },
        {
          t: "codeout",
          lang: "bash",
          label: "ทดสอบกรณีโอนข้ามสกุลเงิน (ตรวจพบ Currency Mismatch -> HTTP 400)",
          code: `curl -i -X POST http://localhost:8080/transfers \\
  -H "Content-Type: application/json" \\
  -d '{
    "from_account_id": 1,
    "to_account_id": 2,
    "amount": 100,
    "currency": "THB"
  }'`,
          out: `HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "error": "สกุลเงินของบัญชี [1] คือ USD ไม่ตรงกับคำขอโอน THB"
}`,
        },

        { t: "h2", c: "ประกอบร่างและเปิดรันเซิร์ฟเวอร์ด้วย `main.go`" },
        {
          t: "p",
          c: "เมื่อเขียน API Handlers และตัวตรวจสอบความถูกต้อง (Validation) ครบทุกส่วนแล้ว ตอนนี้ถึงเวลาสร้างไฟล์ `main.go` ที่ Root ของโปรเจกต์ เพื่อเชื่อมต่อ Database เข้ากับ Gin Server และเปิดให้บริการจริง:",
        },
        {
          t: "code",
          lang: "go",
          label: "main.go (Root Directory)",
          c: `package main

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
	"simplebank/api"
	db "simplebank/db"
)

const (
	dbDriver      = "postgres"
	dbSource      = "postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable"
	serverAddress = "0.0.0.0:8080"
)

func main() {
	conn, err := sql.Open(dbDriver, dbSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}

	store := db.NewStore(conn)
	server := api.NewServer(store)

	err = server.Start(serverAddress)
	if err != nil {
		log.Fatal("cannot start server:", err)
	}
}`,
        },
        {
          t: "codeout",
          lang: "bash",
          label: "คำสั่งเปิดเซิร์ฟเวอร์ Gin และ Log การลงทะเบียน Route ครบทุกตัว",
          code: `go run main.go`,
          out: `[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.
[GIN-debug] POST   /accounts                 --> simplebank/api.(*Server).createAccount-fm (3 handlers)
[GIN-debug] GET    /accounts/:id             --> simplebank/api.(*Server).getAccount-fm (3 handlers)
[GIN-debug] GET    /accounts                 --> simplebank/api.(*Server).listAccounts-fm (3 handlers)
[GIN-debug] POST   /transfers                --> simplebank/api.(*Server).createTransfer-fm (3 handlers)
[GIN-debug] Listening and serving HTTP on 0.0.0.0:8080`,
        },
      ],
      en: [],
    },
  },
};
