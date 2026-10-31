import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/06-api.ts
// โมดูล 6: เปิดประตูสู่โลกภายนอกด้วย REST API (Gin)
// บทเรียน: 6.1 bank-rest-api-gin, 6.2 bank-api-validation
// =============================================================================

export const apiPages: Record<string, Page> = {
  "bank-rest-api-gin": {
    slug: "bank-rest-api-gin",
    title: {
      th: "6.1 สร้าง REST API Server ด้วย Gin Framework",
      en: "6.1 Building REST API Server with Gin Framework",
    },
    lead: {
      th: "เปิดประตูเชื่อมต่อโลกภายนอก: ออกแบบ Server Struct ด้วย Dependency Injection และสร้าง HTTP Handlers สำหรับจัดการ Accounts ด้วย Gin Framework",
      en: "Expose your bank to the web: Design a Server struct with Dependency Injection and build Gin HTTP handlers for accounts.",
    },
    group: "6. เปิดประตูสู่โลกภายนอกด้วย REST API (Gin)",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• ติดตั้งและเข้าใจการทำงานของ Gin Web Framework (Radix Tree Router & JSON Binding)\n• ออกแบบ `Server` struct ตามหลัก Dependency Injection เพื่อให้เขียน Unit Test ม็อกได้ง่ายในอนาคต\n• สร้าง HTTP Endpoints สำหรับบัญชี: เปิดบัญชี (`POST /accounts`), ดูรายละเอียด (`GET /accounts/:id`) และ Pagination (`GET /accounts`)\n\n⏱ **เวลาในการเรียนรู้**: ~25 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านโมดูล 3 การเขียน CRUD",
        },
        {
          "t": "h2",
          "c": "1. ทำไมเราถึงเลือก Gin Web Framework?",
        },
        {
          "t": "p",
          "c": "ในระบบนิเวศของภาษา Go มีเฟรมเวิร์กยอดนิยมหลายตัว เช่น Fiber, Echo, Chi แต่ **Gin** คือตัวเลือกอันดับ 1 สำหรับระบบ Production ขนาดใหญ่ด้วยจุดเด่นเหล่านี้:",
        },
        {
          "t": "ul",
          "c": [
            "**Fast Routing**: ใช้ Radix Tree ในการจับคู่ URL Path ทำให้ Route แมทช์ได้รวดเร็วและใช้หน่วยความจำน้อยมาก",
            "**Powerful JSON Binding**: แปลง JSON Request เป็น Go Struct พร้อมตรวจสอบเงื่อนไข (Validation) อัตโนมัติด้วยแท็ก `binding:\"required\"`",
            "**Zero Reflection at Runtime**: ประสิทธิภาพสูงมาก สามารถรองรับ Request หลักหมื่นต่อวินาทีได้อย่างสบายๆ",
          ],
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ดาวน์โหลดไลบรารี Gin",
          "code": "go get github.com/gin-gonic/gin",
          "out": "go: added github.com/gin-gonic/gin v1.11.0",
        },
        {
          "t": "h2",
          "c": "2. ออกแบบ Server Struct ด้วย Dependency Injection",
        },
        {
          "t": "p",
          "c": "แทนที่จะสร้างตัวแปร Global DB ลอยๆ เราจะห่อหุ้มทรัพยากรทั้งหมด (Store, Router, Config) ไว้ใน `Server` struct เดียวใน `simplebank/api/server.go`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/server.go",
          "c": "package api\n\nimport (\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n)\n\ntype Server struct {\n\tstore  *db.Store\n\trouter *gin.Engine\n}\n\nfunc NewServer(store *db.Store) *Server {\n\tserver := &Server{store: store}\n\trouter := gin.Default()\n\n\trouter.POST(\"/accounts\", server.createAccount)\n\trouter.GET(\"/accounts/:id\", server.getAccount)\n\trouter.GET(\"/accounts\", server.listAccounts)\n\n\tserver.router = router\n\treturn server\n}\n\nfunc (server *Server) Start(address string) error {\n\treturn server.router.Run(address)\n}\n\nfunc errorResponse(err error) gin.H {\n\treturn gin.H{\"error\": err.Error()}\n}",
        },
        {
          "t": "h2",
          "c": "3. เขียน Handlers สำหรับ Accounts (account.go): 3 ช่องทางรับข้อมูลของ Gin",
        },
        {
          "t": "p",
          "c": "เวลาที่ Client ส่ง HTTP Request เข้ามา ข้อมูลจะถูกส่งมาใน 3 ช่องทาง ซึ่งในไฟล์ `simplebank/api/account.go` เราจะใช้ฟังก์ชัน **Binder** ของ Gin แยกตามช่องทางดังนี้ครับ",
        },
        {
          "t": "p",
          "c": "**ช่องทางที่ 3.1: รับข้อมูลจาก JSON Body (`ShouldBindJSON` + แท็ก `` `json:\"...\"` ``)**\nใช้กับคำสั่ง `POST /accounts` เมื่อลูกค้าส่ง JSON มาขอเปิดบัญชีใหม่:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/account.go (ส่วนที่ 1: เปิดบัญชีใหม่ด้วย ShouldBindJSON)",
          "c": "package api\n\nimport (\n\t\"database/sql\"\n\t\"errors\"\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n)\n\ntype createAccountRequest struct {\n\tOwner    string `json:\"owner\" binding:\"required\"`\n\tCurrency string `json:\"currency\" binding:\"required,oneof=USD EUR THB\"`\n}\n\nfunc (server *Server) createAccount(ctx *gin.Context) {\n\tvar req createAccountRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\taccount, err := server.store.CreateAccount(ctx, db.CreateAccountParams{\n\t\tOwner:    req.Owner,\n\t\tBalance:  0,\n\t\tCurrency: req.Currency,\n\t})\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, account)\n}",
        },
        {
          "t": "p",
          "c": "**ช่องทางที่ 3.2: รับข้อมูลจาก URL Path (`ShouldBindUri` + แท็ก `` `uri:\"...\"` ``) และ Query String (`ShouldBindQuery` + แท็ก `` `form:\"...\"` ``)**\nเขียนต่อท้ายลงในไฟล์ `simplebank/api/account.go` สำหรับดูข้อมูลบัญชีรายตัว (`GET /accounts/:id`) และดึงรายการบัญชีแบบแบ่งหน้า (`GET /accounts?page_id=1&page_size=5`):",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/account.go (ส่วนที่ 2: ดึงบัญชีด้วย ShouldBindUri และ ShouldBindQuery)",
          "c": "type getAccountRequest struct {\n\tID int64 `uri:\"id\" binding:\"required,min=1\"`\n}\n\nfunc (server *Server) getAccount(ctx *gin.Context) {\n\tvar req getAccountRequest\n\tif err := ctx.ShouldBindUri(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\taccount, err := server.store.GetAccount(ctx, req.ID)\n\tif err != nil {\n\t\tif errors.Is(err, sql.ErrNoRows) {\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err)) // 404 Not Found เมื่อไม่พบบัญชี\n\t\t\treturn\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, account)\n}\n\ntype listAccountsRequest struct {\n\tPageID   int32 `form:\"page_id\" binding:\"required,min=1\"`\n\tPageSize int32 `form:\"page_size\" binding:\"required,min=5,max=10\"`\n}\n\nfunc (server *Server) listAccounts(ctx *gin.Context) {\n\tvar req listAccountsRequest\n\tif err := ctx.ShouldBindQuery(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\taccounts, err := server.store.ListAccounts(ctx, db.ListAccountsParams{\n\t\tOwner:  \"\", // กรองตามชื่อเจ้าของบัญชีเมื่อเปิดใช้งานระบบยืนยันตัวตน\n\t\tLimit:  req.PageSize,\n\t\tOffset: (req.PageID - 1) * req.PageSize,\n\t})\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, accounts)\n}",
        },
        {
          "t": "p",
          "c": "📄 **โค้ดฉบับเต็มของไฟล์ `simplebank/api/account.go` (รวมทั้ง 2 ส่วน พร้อมคัดลอกใช้งาน):**",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/account.go (ฉบับสมบูรณ์)",
          "c": "package api\n\nimport (\n\t\"database/sql\"\n\t\"errors\"\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n)\n\ntype createAccountRequest struct {\n\tOwner    string `json:\"owner\" binding:\"required\"`\n\tCurrency string `json:\"currency\" binding:\"required,oneof=USD EUR THB\"`\n}\n\nfunc (server *Server) createAccount(ctx *gin.Context) {\n\tvar req createAccountRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\taccount, err := server.store.CreateAccount(ctx, db.CreateAccountParams{\n\t\tOwner:    req.Owner,\n\t\tBalance:  0,\n\t\tCurrency: req.Currency,\n\t})\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, account)\n}\n\ntype getAccountRequest struct {\n\tID int64 `uri:\"id\" binding:\"required,min=1\"`\n}\n\nfunc (server *Server) getAccount(ctx *gin.Context) {\n\tvar req getAccountRequest\n\tif err := ctx.ShouldBindUri(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\taccount, err := server.store.GetAccount(ctx, req.ID)\n\tif err != nil {\n\t\tif errors.Is(err, sql.ErrNoRows) {\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err))\n\t\t\treturn\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, account)\n}\n\ntype listAccountsRequest struct {\n\tPageID   int32 `form:\"page_id\" binding:\"required,min=1\"`\n\tPageSize int32 `form:\"page_size\" binding:\"required,min=5,max=10\"`\n}\n\nfunc (server *Server) listAccounts(ctx *gin.Context) {\n\tvar req listAccountsRequest\n\tif err := ctx.ShouldBindQuery(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\taccounts, err := server.store.ListAccounts(ctx, db.ListAccountsParams{\n\t\tOwner:  \"\",\n\t\tLimit:  req.PageSize,\n\t\tOffset: (req.PageID - 1) * req.PageSize,\n\t})\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, accounts)\n}",
        },
        {
          "t": "h2",
          "c": "4. เชื่อมต่อ API Server ใน main.go และทดสอบยิง API",
        },
        {
          "t": "p",
          "c": "อัปเดตไฟล์ `simplebank/main.go` เพื่อเชื่อมต่อฐานข้อมูล สร้าง Store และสั่งรัน HTTP Server บนพอร์ต 8080:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/main.go",
          "c": "package main\n\nimport (\n\t\"log\"\n\n\t\"simplebank/api\"\n\t\"simplebank/db\"\n)\n\nconst (\n\tdbSource      = \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\"\n\tserverAddress = \"0.0.0.0:8080\"\n)\n\nfunc main() {\n\tconn, err := db.Open(dbSource)\n\tif err != nil {\n\t\tlog.Fatal(\"cannot connect to db:\", err)\n\t}\n\tdefer conn.Close()\n\n\tstore := db.NewStore(conn)\n\tserver := api.NewServer(store)\n\n\tif err := server.Start(serverAddress); err != nil {\n\t\tlog.Fatal(\"cannot start server:\", err)\n\t}\n}",
        },
        {
          "t": "p",
          "c": "สั่งรันเซิร์ฟเวอร์ด้วย `make server` (หรือ `go run main.go`) แล้วทดสอบสั่งเปิดบัญชีใหม่ผ่าน HTTP POST:",
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "POST /accounts - เปิดบัญชีใหม่",
          "code": "POST /accounts HTTP/1.1\nHost: localhost:8080\nContent-Type: application/json\n\n{\n  \"owner\": \"alice\",\n  \"currency\": \"USD\"\n}",
          "out": "HTTP/1.1 200 OK\nContent-Type: application/json; charset=utf-8\n\n{\n  \"id\": 1,\n  \"owner\": \"alice\",\n  \"balance\": 0,\n  \"currency\": \"USD\",\n  \"created_at\": \"2026-10-30T14:30:00Z\"\n}",
        },
        {
          "t": "h2",
          "c": "5. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "หากต้องการอ่านค่า path parameter เช่น /accounts/:id ใน Gin ควรใช้เมธอดใด?",
              "options": [
                {
                  "text": "c.ShouldBindUri(&req)",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! ShouldBindUri จะผูกค่าจาก URL path เช่น /accounts/:id ตาม tag `uri:\"id\"` ใน struct"
                },
                {
                  "text": "c.ShouldBindJSON(&req)",
                  "isCorrect": false,
                  "explain": "ShouldBindJSON ใช้สำหรับ parse HTTP Request Body ที่ส่งมาในรูปแบบ JSON (เช่น POST / PUT)"
                },
                {
                  "text": "c.ShouldBindQuery(&req)",
                  "isCorrect": false,
                  "explain": "ShouldBindQuery ใช้สำหรับ query string เช่น ?page_id=1&page_size=5 ตาม tag `form:\"...\"`"
                }
              ],
              "explain": "Gin มี binder 3 แบบหลักที่ใช้บ่อย: ShouldBindJSON (Body), ShouldBindUri (Path), ShouldBindQuery (Query String)"
            }
          ]
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "เปิดบัญชีได้แล้ว! แต่ถ้ามีคนพยายามโอนเงินข้ามสกุลเงิน (เช่น โอนจาก USD เข้าบัญชี THB) หรือส่งสกุลเงินประหลาดเข้ามาล่ะ? ในบทที่ **6.2 Data Validation & ป้องกันโอนข้ามสกุลเงิน** เราจะมาสร้าง Custom Validator กันครับ",
        },
      ],
      en: [],
    },
  },

  "bank-api-validation": {
    slug: "bank-api-validation",
    title: {
      th: "6.2 Data Validation & ป้องกันโอนข้ามสกุลเงิน",
      en: "6.2 Custom Validation & Safe Transfer API",
    },
    lead: {
      th: "ปกป้องระบบก่อนข้อมูลถึงฐานข้อมูล: สร้าง Custom Currency Validator ใน Gin และเปิด Endpoint โอนเงิน (POST /transfers) ที่ตรวจเช็กสกุลเงินอย่างเข้มงวด",
      en: "Shield your database with custom validators: Build a currency validator in Gin and expose the safe POST /transfers endpoint.",
    },
    group: "6. เปิดประตูสู่โลกภายนอกด้วย REST API (Gin)",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• สร้าง Custom Validator ใน Go ด้วย `validator/v10` เพื่อตรวจสอบสกุลเงินที่ระบบรองรับ\n• ลงทะเบียน Validator เข้ากับ Gin Engine ด้วยแท็ก `binding:\"currency\"`\n• สร้าง Endpoint `POST /transfers` ที่ตรวจสอบว่าบัญชีทั้งสองมีอยู่จริงและใช้สกุลเงินเดียวกันก่อนทำการโอน\n\n⏱ **เวลาในการเรียนรู้**: ~20 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านบท 6.1 เข้าใจ Gin Handler",
        },
        {
          "t": "h2",
          "c": "1. ทำไมต้องมี Custom Validator?",
        },
        {
          "t": "p",
          "c": "ในบทที่แล้ว เราใช้แท็ก `binding:\"oneof=USD EUR THB\"` แต่ถ้าในอนาคตธนาคารของเราขยายไปเปิดบริการใน 20 ประเทศ การต้องคอยตามแก้สตริง `oneof=...` ในทุกๆ Struct เป็นเรื่องที่เสี่ยงต่อการผิดพลาดอย่างมาก",
        },
        {
          "t": "p",
          "c": "ทางออกที่เป็นระเบียบที่สุดคือการนิยามฟังก์ชันตรวจสอบสกุลเงินไว้ที่ส่วนกลาง (`util/currency.go`) แล้วนำมาลงทะเบียนเป็น Custom Tag ชื่อ `currency` เพียงจุดเดียว:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/currency.go",
          "c": "package util\n\nconst (\n\tUSD = \"USD\"\n\tEUR = \"EUR\"\n\tTHB = \"THB\"\n)\n\nfunc IsSupportedCurrency(currency string) bool {\n\tswitch currency {\n\tcase USD, EUR, THB:\n\t\treturn true\n\t}\n\treturn false\n}",
        },
        {
          "t": "h2",
          "c": "2. สร้าง Custom Validator ใน Gin (validator.go)",
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/api/validator.go` เพื่อเชื่อมต่อฟังก์ชันตรวจสอบเข้ากับระบบ Binding ของ Gin:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/validator.go",
          "c": "package api\n\nimport (\n\t\"github.com/go-playground/validator/v10\"\n\t\"simplebank/util\"\n)\n\n// validCurrency คือฟังก์ชันตรวจสอบว่าสกุลเงินที่ส่งมาอยู่ในรายการที่ระบบรองรับหรือไม่\nvar validCurrency validator.Func = func(fl validator.FieldLevel) bool {\n\tif currency, ok := fl.Field().Interface().(string); ok {\n\t\treturn util.IsSupportedCurrency(currency)\n\t}\n\treturn false\n}",
        },
        {
          "t": "p",
          "c": "จากนั้นในฟังก์ชัน `NewServer` ใน `simplebank/api/server.go` ให้ทำการลงทะเบียนตัวตรวจเช็กนี้เข้ากับ Gin และเพิ่ม Route `POST /transfers` (พร้อมเปลี่ยนแท็กสกุลเงินใน `createAccountRequest` จาก `oneof=USD EUR THB` เป็น `currency`):",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/server.go (ลงทะเบียน Validator และ Route โอนเงิน)",
          "c": "func NewServer(store *db.Store) *Server {\n\tserver := &Server{store: store}\n\trouter := gin.Default()\n\n\tif v, ok := binding.Validator.Engine().(*validator.Validate); ok {\n\t\tv.RegisterValidation(\"currency\", validCurrency)\n\t}\n\n\trouter.POST(\"/accounts\", server.createAccount)\n\trouter.GET(\"/accounts/:id\", server.getAccount)\n\trouter.GET(\"/accounts\", server.listAccounts)\n\trouter.POST(\"/transfers\", server.createTransfer)\n\n\tserver.router = router\n\treturn server\n}",
        },
        {
          "t": "h2",
          "c": "3. สร้าง Endpoint โอนเงิน (transfer.go)",
        },
        {
          "t": "p",
          "c": "ในไฟล์ `simplebank/api/transfer.go` เราจะวางปราการป้องกันความผิดพลาด 3 จุดสำคัญ:",
        },
        {
          "t": "ul",
          "c": [
            "**1. ป้องกันการโอนเงินเข้าบัญชีตัวเองด้วย `nefield=FromAccountID`**: ในแท็ก Validation ของ `ToAccountID` เราใส่ `binding:\"required,min=1,nefield=FromAccountID\"` ซึ่งคำว่า **`nefield` (Not Equal Field)** จะบังคับให้ค่าของ `ToAccountID` ต้องไม่ซ้ำกับค่าในฟิลด์ `FromAccountID` ตั้งแต่ด่านหน้าสุดก่อนถึงฐานข้อมูล",
            "**2. ตรวจสอบสกุลเงินของทั้ง 2 บัญชี (`validAccount`)**: ก่อนเรียก `TransferTx` เราเขียนฟังก์ชัน `validAccount` ดึงข้อมูลบัญชีต้นทางและปลายทางมาเช็กว่ามีอยู่จริง และทั้งคู่ใช้สกุลเงินตรงกับที่ระบุมาใน Request (เช่น ห้ามโอนเงิน USD เข้าบัญชี THB ข้ามสกุลโดยตรง)",
            "**3. ดักจับ PostgreSQL Error Code `\"23514\"` (`check_violation`)**: จำกฎเหล็ก `CHECK (balance >= 0)` ในตาราง `accounts` ตอนบทที่ 2 ได้ไหมครับ? หากลูกค้าพยายามโอนเงินเกินยอดคงเหลือในบัญชี PostgreSQL จะปฏิเสธคำสั่งและส่งรหัสข้อผิดพลาดมาตรฐาน SQLSTATE **`23514` (`check_violation`)** กลับมา เราสามารถใช้ `errors.As(err, &pgErr)` แกะรหัสนี้เพื่อตอบกลับเป็น `400 Bad Request (เงินในบัญชีไม่พอ)` แทนที่จะเป็น `500 Internal Server Error`",
          ],
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/api/transfer.go` ดังนี้:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/transfer.go",
          "c": "package api\n\nimport (\n\t\"database/sql\"\n\t\"errors\"\n\t\"fmt\"\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\t\"github.com/jackc/pgx/v5/pgconn\"\n\tdb \"simplebank/db\"\n)\n\ntype transferRequest struct {\n\tFromAccountID int64  `json:\"from_account_id\" binding:\"required,min=1\"`\n\tToAccountID   int64  `json:\"to_account_id\" binding:\"required,min=1,nefield=FromAccountID\"`\n\tAmount        int64  `json:\"amount\" binding:\"required,gt=0\"`\n\tCurrency      string `json:\"currency\" binding:\"required,currency\"`\n}\n\nfunc (server *Server) createTransfer(ctx *gin.Context) {\n\tvar req transferRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\t// ตรวจสอบความถูกต้องของบัญชีต้นทาง\n\tif _, ok := server.validAccount(ctx, req.FromAccountID, req.Currency); !ok {\n\t\treturn\n\t}\n\n\t// ตรวจสอบความถูกต้องของบัญชีปลายทาง\n\tif _, ok := server.validAccount(ctx, req.ToAccountID, req.Currency); !ok {\n\t\treturn\n\t}\n\n\tresult, err := server.store.TransferTx(ctx, db.TransferTxParams{\n\t\tFromAccountID: req.FromAccountID,\n\t\tToAccountID:   req.ToAccountID,\n\t\tAmount:        req.Amount,\n\t})\n\tif err != nil {\n\t\tvar pgErr *pgconn.PgError\n\t\tif errors.As(err, &pgErr) && pgErr.Code == \"23514\" { // check_violation: ยอดเงินจะติดลบ\n\t\t\tctx.JSON(http.StatusBadRequest, errorResponse(errors.New(\"เงินในบัญชีไม่พอสำหรับการโอน\")))\n\t\t\treturn\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, result)\n}\n\nfunc (server *Server) validAccount(ctx *gin.Context, accountID int64, currency string) (db.Account, bool) {\n\taccount, err := server.store.GetAccount(ctx, accountID)\n\tif err != nil {\n\t\tif errors.Is(err, sql.ErrNoRows) {\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(fmt.Errorf(\"ไม่พบบัญชีหมายเลข %d\", accountID)))\n\t\t\treturn account, false\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn account, false\n\t}\n\n\tif account.Currency != currency {\n\t\terr := fmt.Errorf(\"สกุลเงินของบัญชี [%d] ไม่ตรงกัน: %s vs %s\", account.ID, account.Currency, currency)\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn account, false\n\t}\n\treturn account, true\n}",
        },
        {
          "t": "h2",
          "c": "4. ทดสอบยิงคำสั่งโอนเงินผ่าน API",
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "POST /transfers - โอนเงินสำเร็จ",
          "code": "POST /transfers HTTP/1.1\nHost: localhost:8080\nContent-Type: application/json\n\n{\n  \"from_account_id\": 1,\n  \"to_account_id\": 2,\n  \"amount\": 100,\n  \"currency\": \"USD\"\n}",
          "out": "HTTP/1.1 200 OK\nContent-Type: application/json; charset=utf-8\n\n{\n  \"transfer\": {\n    \"id\": 1,\n    \"from_account_id\": 1,\n    \"to_account_id\": 2,\n    \"amount\": 100,\n    \"created_at\": \"2026-10-30T14:35:00Z\"\n  },\n  \"from_account\": {\n    \"id\": 1,\n    \"owner\": \"alice\",\n    \"balance\": 900,\n    \"currency\": \"USD\",\n    \"created_at\": \"2026-10-30T14:30:00Z\"\n  },\n  \"to_account\": {\n    \"id\": 2,\n    \"owner\": \"bob\",\n    \"balance\": 600,\n    \"currency\": \"USD\",\n    \"created_at\": \"2026-10-30T14:31:00Z\"\n  }\n}",
        },
        {
          "t": "h2",
          "c": "5. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ใน validator tag ของ struct เช่น binding:\"required,nefield=FromAccountID\" คำว่า nefield มีหน้าที่อะไร?",
              "options": [
                {
                  "text": "ย่อมาจาก Not Equal Field บังคับให้ค่าฟิลด์นี้ต้องไม่เท่ากับฟิลด์เป้าหมาย (ป้องกันการโอนเงินเข้าบัญชีเดียวกัน)",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! nefield=FromAccountID ป้องกันไม่ให้ to_account_id มีค่าซ้ำกับ from_account_id ตั้งแต่ขั้นตอน HTTP request validation ก่อนถึง DB"
                },
                {
                  "text": "ย่อมาจาก Non-Empty Field บังคับให้ห้ามเป็นค่าว่าง",
                  "isCorrect": false,
                  "explain": "การห้ามเป็นค่าว่างใช้ tag required"
                },
                {
                  "text": "ย่อมาจาก Numeric Exponent Field บังคับให้เป็นเลขยกกำลัง",
                  "isCorrect": false,
                  "explain": "ไม่ใช่ validator tag ของ validator.v10"
                }
              ],
              "explain": "การกรองข้อมูลตั้งแต่ Request Body Validation ด้วย tag เช่น min, max, nefield ช่วยลดภาระ DB และดักจับ logic error ได้ตั้งแต่หน้าประตู API"
            }
          ]
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "API โอนเงินทำงานสมบูรณ์แล้ว! แต่ในตอนนี้ **ใครๆ ก็สั่งโอนเงินออกจากบัญชีของใครก็ได้** เพราะยังไม่มีระบบล็อกอินและยืนยันตัวตน! ในโมดูลที่ 7 เราจะมาสร้างระบบ Users, แฮชรหัสผ่านด้วย Bcrypt และออก Token ยืนยันสิทธิ์ด้วย PASETO กันครับ",
        },
      ],
      en: [],
    },
  },
};
