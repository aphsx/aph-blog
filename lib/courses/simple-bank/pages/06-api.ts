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
          c: `package api

import (
	"github.com/gin-gonic/gin"
	db "simplebank/db"
)

// Server ทำหน้าที่จัดการ HTTP requests ทั้งหมดของระบบธนาคาร
type Server struct {
	store  *db.Store
	router *gin.Engine
}

func NewServer(store *db.Store) *Server {
	server := &Server{store: store}
	router := gin.Default()

	// ลงทะเบียน Routing
	router.POST("/accounts", server.createAccount)
	router.GET("/accounts/:id", server.getAccount)
	router.GET("/accounts", server.listAccounts)
	router.POST("/transfers", server.createTransfer)

	server.router = router
	return server
}

// Start เปิดรันเซิร์ฟเวอร์บน Address ที่กำหนด (เช่น ":8080")
func (server *Server) Start(address string) error {
	return server.router.Run(address)
}

// errorResponse จัดรูปแบบ Error ข้อความให้อยู่ใน JSON key "error"
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
          c: `package api

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	db "simplebank/db"
)

type createAccountRequest struct {
	Owner    string \`json:"owner" binding:"required"\`
	Currency string \`json:"currency" binding:"required,oneof=USD EUR THB"\`
}

func (server *Server) createAccount(ctx *gin.Context) {
	var req createAccountRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.CreateAccountParams{
		Owner:    req.Owner,
		Currency: req.Currency,
		Balance:  0, // เปิดบัญชีใหม่เริ่มต้นที่ 0 บาท
	}

	account, err := server.store.CreateAccount(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusCreated, account) // ส่ง HTTP 201 Created
}`,
        },
        {
          t: "ul",
          c: [
            "**`binding:\"required,oneof=USD EUR THB\"`**: เป็นการสั่งให้ Gin ตรวจสอบว่าต้องมีค่าส่งมา และต้องเป็น 1 ใน 3 สกุลเงินนี้เท่านั้น หากส่งค่าว่างหรือส่งสกุลเงินอื่นมา Gin จะตอบกลับ HTTP 400 Bad Request ทันทีโดยไม่ต้องเขียน `if-else` เอง",
            "**`http.StatusCreated` (201)**: เป็น Status Code มาตรฐานสำหรับการสร้างทรัพยากรใหม่ในระบบ",
          ],
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

        { t: "h2", c: "3. Endpoint โอนเงิน: `POST /transfers` พร้อมกฎ Currency Match" },
        {
          t: "p",
          c: "มาดูโค้ดของ Handler โอนเงิน ซึ่งต้องเช็กทั้งรูปแบบข้อมูล และตรวจสอบว่าบัญชีทั้งสองฝั่งใช้สกุลเงินเดียวกันกับที่ระบุในคำขอโอนหรือไม่:",
        },
        {
          t: "code",
          lang: "go",
          label: "api/transfer.go",
          c: `package api

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	db "simplebank/db"
)

type transferRequest struct {
	FromAccountID int64  \`json:"from_account_id" binding:"required,min=1"\`
	ToAccountID   int64  \`json:"to_account_id" binding:"required,min=1"\`
	Amount        int64  \`json:"amount" binding:"required,gt=0"\`
	Currency      string \`json:"currency" binding:"required,currency"\`
}

func (server *Server) createTransfer(ctx *gin.Context) {
	var req transferRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// ตรวจสอบบัญชีต้นทางว่ามีอยู่จริงและสกุลเงินตรงกันไหม
	if !server.validAccount(ctx, req.FromAccountID, req.Currency) {
		return
	}

	// ตรวจสอบบัญชีปลายทางว่ามีอยู่จริงและสกุลเงินตรงกันไหม
	if !server.validAccount(ctx, req.ToAccountID, req.Currency) {
		return
	}

	arg := db.TransferTxParams{
		FromAccountID: req.FromAccountID,
		ToAccountID:   req.ToAccountID,
		Amount:        req.Amount,
	}

	result, err := server.store.TransferTx(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, result)
}

func (server *Server) validAccount(ctx *gin.Context, accountID int64, currency string) bool {
	account, err := server.store.GetAccount(ctx, accountID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return false
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return false
	}

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
      ],
      en: [],
    },
  },
};
