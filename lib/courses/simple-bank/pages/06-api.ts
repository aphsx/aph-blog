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
    group: "6. เปิดประตูให้เรียกผ่านเว็บ",
    blocks: {
      th: [
        {
          t: "callout",
          title: "บทนี้อยู่ตรงไหนของทาง",
          c: "เงินในฐานข้อมูลถูก และเทสต์โอนพร้อมกันผ่านแล้ว บทนี้เปิดประตู HTTP ให้คนนอกเรียก บรรทัด `if err := ctx.ShouldBindJSON(&req); err != nil` คือรูปแบบสั้นจากบท Go จากศูนย์ บทนี้ยังไม่รู้ว่าใครเป็นคนกด เรื่องผู้ใช้กับตั๋วอยู่ช่วงถัดไป",
        },
        {
          t: "p",
          c: "เงินในฐานข้อมูลถูกแล้ว คำถามคือคนส่งข้อความ JSON มาที่เซิร์ฟเวอร์ แล้วข้อความนั้นกลายเป็นแถวในตาราง `accounts` ตรงไหน ทางที่ข้อความเดินเข้ามาคือ HTTP รูปแบบที่ตกลงกันว่าที่อยู่แบบไหนแปลว่าสร้างหรืออ่านคือ REST ไลบรารีที่รับทางนั้นในคอร์สนี้ชื่อ Gin",
        },

        { t: "h2", c: "1. โครงสร้าง Server และการทำ Dependency Injection" },
        {
          t: "p",
          c: "ตัวรับคำขอต้องหยิบ `Store` ที่คุยกับฐานข้อมูลได้ โดยไม่ไปสร้างตัวเชื่อมฐานข้อมูลเองทุกครั้งที่มีคนเรียก เราจึงใส่ `*db.Store` เข้าไปใน struct `Server` ตอนสร้างเซิร์ฟเวอร์ครั้งเดียว ท่าใส่ของที่ต้องใช้เข้าไปตอนสร้างเรียกว่า dependency injection เริ่มจากติดตั้ง Gin:",
        },
        {
          t: "code",
          lang: "bash",
          label: "ติดตั้ง Gin Web Framework",
          c: `go get github.com/gin-gonic/gin`,
        },
        {
          t: "code",
          lang: "go",
          label: "simplebank/api/server.go",
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

	// 2. ลงทะเบียน Routing สำหรับ Endpoint บัญชี
	router.POST("/accounts", server.createAccount)
	router.GET("/accounts/:id", server.getAccount)
	router.GET("/accounts", server.listAccounts)
	// (หมายเหตุ: เส้นทาง /transfers จะถูกลงทะเบียนในบทถัดไปพร้อมตัวตรวจสอบสกุลเงิน)

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
          label: "simplebank/api/account.go",
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
            "**`if err := ctx.ShouldBindJSON(&req); err != nil`**: รูปแบบสั้นจากบท Go จากศูนย์ เรียกฟังก์ชันแล้วเช็ค error ในบรรทัดเดียว ถ้า JSON ผิดจะตอบ 400 แล้ว `return` ทันที บรรทัด `account, err :=` ด้านล่างเป็นอีกรูป เก็บทั้งบัญชีที่สร้างได้และ error",
            "**`binding:\"required,oneof=USD EUR THB\"`**: เป็นการสั่งให้ Gin ตรวจสอบว่าต้องมีค่าส่งมา และต้องเป็น 1 ใน 3 สกุลเงินนี้เท่านั้น หากส่งค่าว่างหรือส่งสกุลเงินอื่นมา Gin จะตอบกลับ HTTP 400 Bad Request ทันทีโดยไม่ต้องเขียน `if-else` เอง",
            "**`http.StatusCreated` (201)**: เป็น Status Code มาตรฐานสำหรับการสร้างทรัพยากรใหม่ในระบบ",
          ],
        },
        { t: "h2", c: "3. การสร้าง Handler: `GET /accounts/:id`" },
        {
          t: "p",
          c: "การดึงข้อมูลบัญชีรายตัวผ่าน URI Parameter เช่น `/accounts/42` โดยเปิดไฟล์ `simplebank/api/account.go` เพื่อเพิ่ม `\"database/sql\"` ใน import และเขียนฟังก์ชัน `getAccount` ต่อท้าย:",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/api/account.go",
          c: ` package api
 
 import (
+	"database/sql"
 	"net/http"
 
 	"github.com/gin-gonic/gin"
 	db "simplebank/db"
 )
 
 // ... โค้ดเดิม createAccountRequest และ createAccount ...
 	ctx.JSON(http.StatusCreated, account)
 }
+
+type getAccountRequest struct {
+	ID int64 \`uri:"id" binding:"required,min=1"\`
+}
+
+func (server *Server) getAccount(ctx *gin.Context) {
+	var req getAccountRequest
+	if err := ctx.ShouldBindUri(&req); err != nil {
+		ctx.JSON(http.StatusBadRequest, errorResponse(err))
+		return
+	}
+
+	account, err := server.store.GetAccount(ctx, req.ID)
+	if err != nil {
+		if err == sql.ErrNoRows {
+			// หากไม่พบบัญชี ให้ตอบ 404 Not Found
+			ctx.JSON(http.StatusNotFound, errorResponse(err))
+			return
+		}
+		// หากฐานข้อมูลล่ม ให้ตอบ 500 Internal Server Error
+		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
+		return
+	}
+
+	ctx.JSON(http.StatusOK, account) // ส่ง HTTP 200 OK
+}`,
        },
        {
          t: "callout",
          title: "🎯 หลักการกำหนด HTTP Status Code ที่ดี",
          c: "แยกแยะข้อผิดพลาดให้ชัดเจนเสมอ:\n- ลูกค้าส่งข้อมูลผิด (เช่น ID ติดลบ, ส่ง JSON ไม่ครบ) -> ใช้ **400 Bad Request**\n- ข้อมูลไม่มีในระบบ -> ใช้ **404 Not Found**\n- เซิร์ฟเวอร์หรือฐานข้อมูลพัง -> ใช้ **500 Internal Server Error**",
        },

        { t: "h2", c: "4. การสร้าง Handler: `GET /accounts` (Pagination)" },
        {
          t: "p",
          c: "การดึงข้อมูลรายการบัญชีทั้งหมดแบบแบ่งหน้า (Pagination) เพื่อไม่ให้เซิร์ฟเวอร์โหลดข้อมูลมากเกินไปในคำขอเดียว โดยเขียน Struct และ Handler `listAccounts` ต่อท้ายลงในไฟล์ `simplebank/api/account.go`:",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/api/account.go",
          c: ` // ... โค้ดเดิม createAccount และ getAccount ...
 	ctx.JSON(http.StatusOK, account)
 }
+
+// listAccountsRequest กำหนด Query Parameters สำหรับการแบ่งหน้า (Pagination)
+type listAccountsRequest struct {
+	PageID   int32 \`form:"page_id" binding:"required,min=1"\`
+	PageSize int32 \`form:"page_size" binding:"required,min=5,max=10"\`
+}
+
+func (server *Server) listAccounts(ctx *gin.Context) {
+	// 1. แกะ Query Parameters จาก URL (?page_id=1&page_size=5) ผ่าน ShouldBindQuery
+	var req listAccountsRequest
+	if err := ctx.ShouldBindQuery(&req); err != nil {
+		ctx.JSON(http.StatusBadRequest, errorResponse(err))
+		return
+	}
+
+	// 2. คำนวณ Limit และ Offset สำหรับส่งให้คำสั่ง SQL (Offset = (PageID - 1) * PageSize)
+	arg := db.ListAccountsParams{
+		Limit:  req.PageSize,
+		Offset: (req.PageID - 1) * req.PageSize,
+	}
+
+	// 3. ดึงรายชื่อบัญชีจากฐานข้อมูลผ่าน store
+	accounts, err := server.store.ListAccounts(ctx, arg)
+	if err != nil {
+		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
+		return
+	}
+
+	// 4. ส่ง JSON Array ของบัญชีกลับไปพร้อม HTTP 200 OK
+	ctx.JSON(http.StatusOK, accounts)
+}`,
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
          t: "code",
          lang: "go",
          label: "simplebank/api/account.go",
          c: `// API Handler สำหรับจัดการบัญชี (POST /accounts, GET /accounts/:id, GET /accounts)
package api

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
		Balance:  0,
	}

	account, err := server.store.CreateAccount(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusCreated, account)
}

type getAccountRequest struct {
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
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, account)
}

type listAccountsRequest struct {
	PageID   int32 \`form:"page_id" binding:"required,min=1"\`
	PageSize int32 \`form:"page_size" binding:"required,min=5,max=10"\`
}

func (server *Server) listAccounts(ctx *gin.Context) {
	var req listAccountsRequest
	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	arg := db.ListAccountsParams{
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

        { t: "h2", c: "5. ประกอบร่างและเปิดรันเซิร์ฟเวอร์ด้วย `main.go`" },
        {
          t: "p",
          c: "ในบทที่ 3 เราเคยสร้างไฟล์ `simplebank/main.go` ไว้เป็นสคริปต์สั้นๆ เพื่อทดสอบต่อ DB และยิง CRUD แต่ในบทนี้ ถึงเวลา **อัปเกรด `main.go`** ให้กลายเป็น Web Server เต็มรูปแบบ โดยการมัดรวม Store ส่งต่อให้ Gin ผ่าน `api.NewServer(store)` และสั่งเปิดบริการ HTTP บนพอร์ต 8080:",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/main.go",
          c: ` package main

 import (
+	"database/sql"
 	"log"

 	_ "github.com/lib/pq"
+	"simplebank/api"
 	db "simplebank/db"
 )

 const (
+	dbDriver      = "postgres"
 	dbSource      = "postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable"
+	serverAddress = "0.0.0.0:8080"
 )

 func main() {
-	// 1. เชื่อมต่อฐานข้อมูลผ่าน NewDB
-	conn, err := db.NewDB(dbSource)
+	conn, err := sql.Open(dbDriver, dbSource)
 	if err != nil {
-		log.Fatal("❌ ไม่สามารถเชื่อมต่อฐานข้อมูลได้:", err)
+		log.Fatal("cannot connect to db:", err)
 	}

-	// โค้ดเดิมในบทที่ 3: ทดลองยิง CreateAccount และ GetAccount ตรงๆ
-	queries := db.New(conn)
-	...
+	// โค้ดใหม่: ส่ง Store เข้า Gin Server แล้วเปิดบริการ HTTP
+	store := db.NewStore(conn)
+	server := api.NewServer(store)
+
+	err = server.Start(serverAddress)
+	if err != nil {
+		log.Fatal("cannot start server:", err)
+	}
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
          t: "p",
          c: "เปิด Terminal ขึ้นมา แล้วสั่งรันเซิร์ฟเวอร์ด้วยคำสั่ง:",
        },
        {
          t: "codeout",
          lang: "bash",
          label: "Terminal ที่ 1: คำสั่งสตาร์ตเซิร์ฟเวอร์ Gin (Listening on :8080)",
          code: `go run main.go`,
          out: `[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.
[GIN-debug] POST   /accounts                 --> simplebank/api.(*Server).createAccount-fm (3 handlers)
[GIN-debug] GET    /accounts/:id             --> simplebank/api.(*Server).getAccount-fm (3 handlers)
[GIN-debug] GET    /accounts                 --> simplebank/api.(*Server).listAccounts-fm (3 handlers)
[GIN-debug] Listening and serving HTTP on 0.0.0.0:8080
(เซิร์ฟเวอร์เปิดทำงานสำเร็จ พร้อมรับคำขอ HTTP แล้ว!)`,
        },

        { t: "h2", c: "6. ทดสอบเรียกใช้งาน API (Postman / API Client)" },
        {
          t: "callout",
          title: "💡 จุดที่ต้องตั้งค่าใน Postman / API Client",
          c: "ในการทดสอบ API ให้เปิด Postman (หรือ REST Client) แล้วตั้งค่าตาม 3 จุดหลักดังนี้:\n- **Method & URL:** เลือก Method (`POST`, `GET`) และใส่ URL ปลายทาง\n- **Headers:** ในแท็บ `Headers` กำหนด `Content-Type`: `application/json`\n- **Body:** เลือกแท็บ `Body` → ติ๊ก `raw` → เลือกประเภทเป็น `JSON` แล้ววางข้อมูล Payload",
        },
        {
          t: "codeout",
          lang: "http",
          label: "1. สร้างบัญชีใหม่: POST /accounts",
          code: `POST http://localhost:8080/accounts
Content-Type: application/json

{
  "owner": "alice",
  "currency": "USD"
}`,
          out: `HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "id": 1,
  "owner": "alice",
  "balance": 0,
  "currency": "USD",
  "created_at": "2026-09-26T10:00:00.123456Z"
}`,
        },
        {
          t: "codeout",
          lang: "http",
          label: "2. ดึงข้อมูลบัญชีตาม ID: GET /accounts/:id",
          code: `# เคสที่ 1: ดึงบัญชี ID = 1 ที่มีอยู่จริง (URL: http://localhost:8080/accounts/1)
GET http://localhost:8080/accounts/1

# เคสที่ 2: ดึงบัญชี ID = 99999 ที่ไม่มีอยู่จริง (URL: http://localhost:8080/accounts/99999)
GET http://localhost:8080/accounts/99999`,
          out: `# ผลลัพธ์เคสที่ 1: 200 OK
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "id": 1,
  "owner": "alice",
  "balance": 0,
  "currency": "USD",
  "created_at": "2026-09-26T10:00:00.123456Z"
}

# ผลลัพธ์เคสที่ 2: 404 Not Found
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{
  "error": "sql: no rows in result set"
}`,
        },
        {
          t: "codeout",
          lang: "http",
          label: "3. ดึงรายการบัญชีแบบแบ่งหน้า: GET /accounts (Query Params)",
          code: `GET http://localhost:8080/accounts?page_id=1&page_size=5`,
          out: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
  {
    "id": 1,
    "owner": "alice",
    "balance": 0,
    "currency": "USD",
    "created_at": "2026-09-26T10:00:00.123456Z"
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
    group: "6. เปิดประตูให้เรียกผ่านเว็บ",
    blocks: {
      th: [
        {
          t: "callout",
          title: "บทนี้อยู่ตรงไหนของทาง",
          c: "ประตู HTTP เปิดแล้ว บทนี้กันค่าที่ไม่มีทางถูก โดยเฉพาะการโอนคนละสกุลเงิน เพราะตัวเลข 100 ของดอลลาร์กับ 100 ของบาทไม่ใช่เงินจำนวนเดียวกัน",
        },
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
          label: "simplebank/api/validator.go",
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
          label: "simplebank/util/currency.go",
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
          lang: "diff",
          label: "simplebank/api/server.go",
          c: ` package api

 import (
 	"github.com/gin-gonic/gin"
+	"github.com/gin-gonic/gin/binding"
+	"github.com/go-playground/validator/v10"
 	db "simplebank/db"
 )

 func NewServer(store *db.Store) *Server {
 	server := &Server{store: store}
 	router := gin.Default()

+	// ลงทะเบียน custom validator tag "currency"
+	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
+		v.RegisterValidation("currency", validCurrency)
+	}
+
 	// 2. ลงทะเบียน Routing สำหรับแต่ละ Endpoint
 	router.POST("/accounts", server.createAccount)`,
        },
        {
          t: "p",
          c: "จากนั้นให้เปิดไฟล์ `api/account.go` เพื่อเปลี่ยนแท็ก Validation ของฟิลด์ `Currency` จากเดิมที่เป็น `oneof=USD EUR THB` มาใช้ Custom Tag `currency` ที่เราเพิ่งสร้างขึ้น:",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/api/account.go",
          c: ` type createAccountRequest struct {
 	Owner    string \`json:"owner" binding:"required"\`
-	Currency string \`json:"currency" binding:"required,oneof=USD EUR THB"\`
+	Currency string \`json:"currency" binding:"required,currency"\`
 }`,
        },
        {
          t: "codeout",
          lang: "http",
          label: "ทดสอบส่งสกุลเงินที่ไม่รองรับ (XYZ) ใน Postman / API Client -> ได้รับ HTTP 400",
          code: `POST http://localhost:8080/accounts
Content-Type: application/json

{
  "owner": "alice",
  "currency": "XYZ"
}`,
          out: `HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "error": "Key: 'createAccountRequest.Currency' Error:Field validation for 'Currency' failed on the 'currency' tag"
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
          label: "simplebank/api/transfer.go",
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
	fromAccount, valid := server.validAccount(ctx, req.FromAccountID, req.Currency)
	if !valid {
		return
	}

	// 3. ตรวจสอบว่าบัญชีปลายทางมีอยู่จริง และสกุลเงินตรงกับคำขอโอนหรือไม่
	_, valid = server.validAccount(ctx, req.ToAccountID, req.Currency)
	if !valid {
		return
	}

	// 4. เตรียมพารามิเตอร์ส่งต่อไปยัง Transaction Manager
	arg := db.TransferTxParams{
		FromAccountID: fromAccount.ID,
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

// validAccount ตรวจสอบความมีอยู่จริงและสกุลเงินของบัญชีก่อนเริ่มทำ Transaction พร้อมคืนค่า Account เพื่อนำไปใช้งานต่อ
func (server *Server) validAccount(ctx *gin.Context, accountID int64, currency string) (db.Account, bool) {
	// ค้นหาข้อมูลบัญชีจากฐานข้อมูล
	account, err := server.store.GetAccount(ctx, accountID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err)) // ไม่พบบัญชี ส่ง 404
			return account, false
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err)) // ข้อผิดพลาดฝั่งเซิร์ฟเวอร์ ส่ง 500
		return account, false
	}

	// ตรวจสอบความสอดคล้องของสกุลเงิน ป้องกันการโอนข้ามสกุลเงินโดยไม่แปลงค่า
	if account.Currency != currency {
		err := fmt.Errorf("สกุลเงินของบัญชี [%d] คือ %s ไม่ตรงกับคำขอโอน %s", accountID, account.Currency, currency)
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return account, false
	}

	return account, true
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

        { t: "h2", c: "4. ลงทะเบียน Route `/transfers` และรีสตาร์ตเซิร์ฟเวอร์" },
        {
          t: "p",
          c: "เปิดไฟล์ `api/server.go` เพื่อลงทะเบียน Route `POST /transfers` เข้าสู่ Gin Engine ให้ครบสมบูรณ์:",
        },
        {
          t: "code",
          lang: "diff",
          label: "simplebank/api/server.go",
          c: ` 	// ลงทะเบียน Routing สำหรับแต่ละ Endpoint
 	router.POST("/accounts", server.createAccount)
 	router.GET("/accounts/:id", server.getAccount)
 	router.GET("/accounts", server.listAccounts)
+	router.POST("/transfers", server.createTransfer)
 
 	server.router = router
 	return server`,
        },
        {
          t: "p",
          c: "กลับไปที่ **Terminal หน้าต่างที่ 1** กด `Ctrl + C` เพื่อหยุดเซิร์ฟเวอร์เดิม แล้วสั่งรันใหม่อีกครั้งเพื่อโหลด Route ล่าสุด:",
        },
        {
          t: "codeout",
          lang: "bash",
          label: "Terminal ที่ 1: สั่งรันเซิร์ฟเวอร์ใหม่ (จะเห็น Route /transfers ปรากฏขึ้น)",
          code: `go run main.go`,
          out: `[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.
[GIN-debug] POST   /accounts                 --> simplebank/api.(*Server).createAccount-fm (3 handlers)
[GIN-debug] GET    /accounts/:id             --> simplebank/api.(*Server).getAccount-fm (3 handlers)
[GIN-debug] GET    /accounts                 --> simplebank/api.(*Server).listAccounts-fm (3 handlers)
[GIN-debug] POST   /transfers                --> simplebank/api.(*Server).createTransfer-fm (3 handlers)
[GIN-debug] Listening and serving HTTP on 0.0.0.0:8080`,
        },

        { t: "h2", c: "5. เติมเงินตั้งต้นและทดสอบยิงโอนเงินจริง" },
        {
          t: "callout",
          title: "💡 การเตรียมเงินทดสอบก่อนสั่งโอน (Initial Balance Seeding)",
          c: `เนื่องจากตอนเปิดบัญชีผ่าน \`POST /accounts\` ระบบจะกำหนดยอดเงินเริ่มต้นเป็น 0 บาท (\`balance = 0\`) เสมอตามหลักความปลอดภัย
ก่อนที่เราจะทดสอบยิงโอนเงิน 100 USD จากบัญชี 1 (Alice) ไปยังบัญชี 2 (Bob) ให้เราทำการใส่เงินตั้งต้น 1,000 USD ให้บัญชี 1 และ 500 USD ให้บัญชี 2 ผ่านคำสั่ง SQL ใน Terminal ดังนี้:
\`\`\`bash
docker exec -it postgres16 psql -U root -d simple_bank -c "
UPDATE accounts SET balance = 1000 WHERE id = 1;
UPDATE accounts SET balance = 500 WHERE id = 2;
INSERT INTO entries (account_id, amount) VALUES (1, 1000), (2, 500);
"
\`\`\`
*(ในระบบธนาคารจริง ยอดเงินตั้งต้นนี้จะมาจากการฝากเงินสดที่สาขา หรือการเติมเงินผ่าน Payment Gateway/PromptPay)*`,
        },
        {
          t: "codeout",
          lang: "http",
          label: "1. สั่งโอนเงินสำเร็จ: POST /transfers (ตั้งค่าใน Postman / API Client)",
          code: `POST http://localhost:8080/transfers
Content-Type: application/json

{
  "from_account_id": 1,
  "to_account_id": 2,
  "amount": 100,
  "currency": "USD"
}`,
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
          lang: "http",
          label: "2. ทดสอบกรณีโอนข้ามสกุลเงิน (ตรวจพบ Currency Mismatch) -> ได้รับ HTTP 400",
          code: `POST http://localhost:8080/transfers
Content-Type: application/json

{
  "from_account_id": 1,
  "to_account_id": 2,
  "amount": 100,
  "currency": "THB"
}`,
          out: `HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "error": "สกุลเงินของบัญชี [1] คือ USD ไม่ตรงกับคำขอโอน THB"
}`,
        },
        {
          t: "callout",
          title: "🎉 สรุปความพร้อมระดับ Production ของ RESTful API",
          c: "ถึงจุดนี้มีประตู HTTP ที่สร้างบัญชี ดูรายการ และโอนเงินได้ พร้อมกันโอนคนละสกุลเงิน บทถัดไปยังไม่ทดสอบ API ด้วย mock แต่ทำให้รู้ว่าใครเป็นคนกด โดยมีผู้ใช้จริงและรหัสผ่านที่อ่านกลับไม่ได้",
        },
      ],
      en: [],
    },
  },
};
