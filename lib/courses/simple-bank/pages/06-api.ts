import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/06-api.ts
// หน้าที่: บทที่ 6.1 และ 6.2 การสร้าง REST API ด้วย Gin Framework และ Custom Validation
// =============================================================================

export const apiPages: Record<string, Page> = {
  "bank-rest-api-gin": {
    "slug": "bank-rest-api-gin",
    "title": {
      "th": "6.1 สร้าง REST API Server ด้วย Gin Framework",
      "en": "6.1 Building a RESTful API with Gin Framework"
    },
    "lead": {
      "th": "เชื่อมต่อ Data Store เข้ากับเว็บเซิร์ฟเวอร์ความเร็วสูงด้วย Gin Gonic, วางโครงสร้าง Dependency Injection, จัดการ HTTP Status Codes และทำ JSON Error Handling",
      "en": "Connecting the store layer to a blazing-fast HTTP server with Gin Gonic, dependency injection, and clean error handling."
    },
    "group": "6. เปิดประตูสู่โลกภายนอกด้วย RESTful API (Gin)",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: สร้างและทดสอบชั้นฐานข้อมูล (`simplebank/db/`) ทั้ง CRUD และระบบโอนเงินปลอด Deadlock เสร็จสมบูรณ์แล้ว\n• **ภารกิจในบทนี้**: สร้างโฟลเดอร์ `simplebank/api/` เพื่อเปิด HTTP Server ด้วย Gin Framework (`api/server.go`, `api/account.go`) และอัปเกรด `main.go` ให้รันเว็บเซิร์ฟเวอร์\n• **ไวยากรณ์ Go & Best Practices ที่ใช้ในบทนี้**: Dependency Injection ใน `Server` Struct, Binding Tags (`json`, `uri`, `form`, `binding`), และการใช้ `errors.Is(err, sql.ErrNoRows)`"
        },
        {
          "t": "p",
          "c": "ตอนนี้ชั้นฐานข้อมูลและระบบโอนเงินของเราทำงานได้อย่างถูกต้องและปลอดภัย 100% แล้ว ก้าวต่อไปคือการสร้าง **API Transport Layer** เพื่อเปิดให้แอปมือถือหรือเว็บไซต์ด้านนอกสามารถส่งคำขอในรูปแบบ **HTTP JSON (RESTful API)** เข้ามาสร้างบัญชี ดูยอดเงิน และสั่งโอนเงินได้ โดยเราจะใช้ไลบรารีเว็บเซิร์ฟเวอร์ที่เร็วและได้รับความนิยมสูงสุดในภาษา Go คือ **Gin Web Framework (`github.com/gin-gonic/gin`)**"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go & Best Practices ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "กลไกใน Gin API",
            "โค้ดที่ปรากฏ",
            "คำอธิบายและ Best Practice"
          ],
          "rows": [
            [
              "1. Dependency Injection",
              "`type Server struct { store *db.Store; router *gin.Engine }`",
              "ส่ง `*db.Store` เข้ามาเก็บไว้ใน `Server` ตอนสร้าง `NewServer(store)` แทนการใช้ Global Variable ทำให้โค้ดแยกส่วนชัดเจนและดูแลง่าย"
            ],
            [
              "2. Binding Struct Tags",
              "`json:\"owner\"` (Body), `uri:\"id\"` (URL Path), `form:\"page_id\"` (Query String)",
              "Gin จะอ่าน Struct Tag เพื่อดึงข้อมูลจากจุดที่กำหนดและตรวจสอบเงื่อนไข `binding:\"required,...\"` ให้อัตโนมัติ"
            ],
            [
              "3. ส่ง &req เข้า ShouldBind",
              "`if err := ctx.ShouldBindJSON(&req); err != nil`",
              "ส่งพิกัด `&req` เข้าไปเพื่อให้ Gin แกะข้อมูลจาก JSON ไปใส่ในตัวแปร `req` ของเรา"
            ],
            [
              "4. errors.Is & pq.Error Best Practice",
              "`errors.Is(err, sql.ErrNoRows)`",
              "ใน Go ยุคใหม่ (Go 1.13+) การใช้ `errors.Is(err, sql.ErrNoRows)` ปลอดภัยกว่า `err == sql.ErrNoRows` เพราะตรวจจับได้แม้ Error จะถูกห่อ (Wrap) มาหลายชั้น"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. โครงสร้าง Server และการทำ Dependency Injection"
        },
        {
          "t": "p",
          "c": "ในการออกแบบโครงสร้าง HTTP Server ที่ดี เราจะไม่เปิดการเชื่อมต่อฐานข้อมูลใหม่ทุกครั้งที่มี Request วิ่งเข้ามา และจะไม่ใช้ตัวแปร Global แต่เราจะสร้าง `Server` Struct ที่ถือตัวแปร `store *db.Store` เอาไว้ข้างใน โดยส่ง `store` เข้ามาตั้งค่าตั้งแต่ตอนเรียกฟังก์ชัน `NewServer(store)` ครั้งแรกสุด รูปแบบการส่งออบเจกต์ที่จำเป็นเข้ามาประกอบร่างแบบนี้เรียกว่า **Dependency Injection** มาเริ่มต้นด้วยการติดตั้ง Gin กันเลย:"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "ติดตั้ง Gin Web Framework",
          "c": "go get github.com/gin-gonic/gin"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/server.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/server.go\n// หน้าที่: โครงสร้าง Server และการผูก Routing ผ่าน Gin Web Framework พร้อม Dependency Injection\n// แก้ปัญหา: หลีกเลี่ยงการใช้ Global Variable ในการเข้าถึง Database\n// =============================================================================\npackage api\n\nimport (\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n)\n\n// Server ทำหน้าที่จัดการ HTTP requests ทั้งหมดของระบบธนาคาร\ntype Server struct {\n\tstore  *db.Store   // ที่เก็บตัวเชื่อมต่อฐานข้อมูลและทรานแซกชัน\n\trouter *gin.Engine // ตัวจัดการเส้นทาง HTTP Routing ของ Gin\n}\n\n// NewServer ทำหน้าที่กำหนดค่าเริ่มต้น สร้าง Router และลงทะเบียนเส้นทาง API ทั้งหมด\nfunc NewServer(store *db.Store) *Server {\n\t// 1. สร้าง Instance ของ Server พร้อมแนบ store เข้าไป\n\tserver := &Server{store: store}\n\trouter := gin.Default()\n\n\t// 2. ลงทะเบียน Routing สำหรับ Endpoint บัญชี\n\trouter.POST(\"/accounts\", server.createAccount)\n\trouter.GET(\"/accounts/:id\", server.getAccount)\n\trouter.GET(\"/accounts\", server.listAccounts)\n\t// (หมายเหตุ: เส้นทาง /transfers จะถูกลงทะเบียนในบทถัดไปพร้อมตัวตรวจสอบสกุลเงิน)\n\n\t// 3. แนบ Router กลับเข้าไปใน Server\n\tserver.router = router\n\treturn server\n}\n\n// Start เปิดรันเซิร์ฟเวอร์บน Address ที่กำหนด (เช่น \":8080\")\nfunc (server *Server) Start(address string) error {\n\treturn server.router.Run(address)\n}\n\n// errorResponse จัดรูปแบบข้อความ Error ให้อยู่ใน JSON Key \"error\" อย่างสม่ำเสมอ\nfunc errorResponse(err error) gin.H {\n\treturn gin.H{\"error\": err.Error()}\n}"
        },
        {
          "t": "h2",
          "c": "3. การสร้าง Handler: `POST /accounts`"
        },
        {
          "t": "p",
          "c": "เมื่อมีคำขอส่ง JSON เข้ามาเพื่อเปิดบัญชีใหม่ เราจะใช้ `ctx.ShouldBindJSON` เพื่อแกะข้อมูลและตรวจสอบเงื่อนไขเบื้องต้นอัตโนมัติ:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/account.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/account.go\n// หน้าที่: API Handler สำหรับจัดการการเปิดบัญชีใหม่ (POST /accounts)\n// แก้ปัญหา: แกะ JSON Payload ตรวจสอบความถูกต้อง (Validation) ก่อนส่งไปบันทึกลงในฐานข้อมูล\n// =============================================================================\npackage api\n\nimport (\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n)\n\n// createAccountRequest กำหนดโครงสร้าง JSON ขาเข้า พร้อมกฎการตรวจสอบความถูกต้อง (Binding Tags)\ntype createAccountRequest struct {\n\tOwner    string `json:\"owner\" binding:\"required\"`\n\tCurrency string `json:\"currency\" binding:\"required,oneof=USD EUR THB\"` // สกุลเงินต้องตรงตามที่อนุญาต\n}\n\nfunc (server *Server) createAccount(ctx *gin.Context) {\n\t// 1. แกะ JSON Payload และตรวจสอบเงื่อนไขความถูกต้อง\n\tvar req createAccountRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err)) // ส่ง 400 Bad Request หากข้อมูลผิดรูปแบบ\n\t\treturn\n\t}\n\n\t// 2. เตรียมพารามิเตอร์สำหรับบันทึกลงฐานข้อมูล (ยอดเงินเปิดบัญชีเริ่มต้นที่ 0 เสมอ)\n\targ := db.CreateAccountParams{\n\t\tOwner:    req.Owner,\n\t\tCurrency: req.Currency,\n\t\tBalance:  0,\n\t}\n\n\t// 3. ยิงคำสั่งสร้างบัญชีผ่าน store\n\taccount, err := server.store.CreateAccount(ctx, arg)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err)) // ส่ง 500 หากฐานข้อมูลมีปัญหา\n\t\treturn\n\t}\n\n\t// 4. ส่งข้อมูลบัญชีที่สร้างเสร็จสมบูรณ์กลับไปในรูปแบบ JSON พร้อม HTTP Status 201 Created\n\tctx.JSON(http.StatusCreated, account)\n}"
        },
        {
          "t": "ul",
          "c": [
            "**`if err := ctx.ShouldBindJSON(&req); err != nil`**: รูปแบบสั้นจากบท Go จากศูนย์ เรียกฟังก์ชันแล้วเช็ค error ในบรรทัดเดียว ถ้า JSON ผิดจะตอบ 400 แล้ว `return` ทันที บรรทัด `account, err :=` ด้านล่างเป็นอีกรูป เก็บทั้งบัญชีที่สร้างได้และ error",
            "**`binding:\"required,oneof=USD EUR THB\"`**: เป็นการสั่งให้ Gin ตรวจสอบว่าต้องมีค่าส่งมา และต้องเป็น 1 ใน 3 สกุลเงินนี้เท่านั้น หากส่งค่าว่างหรือส่งสกุลเงินอื่นมา Gin จะตอบกลับ HTTP 400 Bad Request ทันทีโดยไม่ต้องเขียน `if-else` เอง",
            "**`http.StatusCreated` (201)**: เป็น Status Code มาตรฐานสำหรับการสร้างทรัพยากรใหม่ในระบบ"
          ]
        },
        {
          "t": "h2",
          "c": "4. การสร้าง Handler: `GET /accounts/:id`"
        },
        {
          "t": "p",
          "c": "การดึงข้อมูลบัญชีรายตัวผ่าน URI Parameter เช่น `/accounts/42` โดยเปิดไฟล์ `simplebank/api/account.go` เพื่อเพิ่ม `\"database/sql\"` ใน import และเขียนฟังก์ชัน `getAccount` ต่อท้าย:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/api/account.go",
          "c": " package api\n \n import (\n+\t\"database/sql\"\n \t\"net/http\"\n \n \t\"github.com/gin-gonic/gin\"\n \tdb \"simplebank/db\"\n )\n \n // ... โค้ดเดิม createAccountRequest และ createAccount ...\n \tctx.JSON(http.StatusCreated, account)\n }\n+\n+type getAccountRequest struct {\n+\tID int64 `uri:\"id\" binding:\"required,min=1\"`\n+}\n+\n+func (server *Server) getAccount(ctx *gin.Context) {\n+\tvar req getAccountRequest\n+\tif err := ctx.ShouldBindUri(&req); err != nil {\n+\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n+\t\treturn\n+\t}\n+\n+\taccount, err := server.store.GetAccount(ctx, req.ID)\n+\tif err != nil {\n+\t\tif err == sql.ErrNoRows {\n+\t\t\t// หากไม่พบบัญชี ให้ตอบ 404 Not Found\n+\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err))\n+\t\t\treturn\n+\t\t}\n+\t\t// หากฐานข้อมูลล่ม ให้ตอบ 500 Internal Server Error\n+\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n+\t\treturn\n+\t}\n+\n+\tctx.JSON(http.StatusOK, account) // ส่ง HTTP 200 OK\n+}"
        },
        {
          "t": "callout",
          "title": "🎯 หลักการกำหนด HTTP Status Code ที่ดี",
          "c": "แยกแยะข้อผิดพลาดให้ชัดเจนเสมอ:\n- ลูกค้าส่งข้อมูลผิด (เช่น ID ติดลบ, ส่ง JSON ไม่ครบ) -> ใช้ **400 Bad Request**\n- ข้อมูลไม่มีในระบบ -> ใช้ **404 Not Found**\n- เซิร์ฟเวอร์หรือฐานข้อมูลพัง -> ใช้ **500 Internal Server Error**"
        },
        {
          "t": "h2",
          "c": "5. การสร้าง Handler: `GET /accounts` (Pagination)"
        },
        {
          "t": "p",
          "c": "การดึงข้อมูลรายการบัญชีทั้งหมดแบบแบ่งหน้า (Pagination) เพื่อไม่ให้เซิร์ฟเวอร์โหลดข้อมูลมากเกินไปในคำขอเดียว โดยเขียน Struct และ Handler `listAccounts` ต่อท้ายลงในไฟล์ `simplebank/api/account.go`:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/api/account.go",
          "c": " // ... โค้ดเดิม createAccount และ getAccount ...\n \tctx.JSON(http.StatusOK, account)\n }\n+\n+// listAccountsRequest กำหนด Query Parameters สำหรับการแบ่งหน้า (Pagination)\n+type listAccountsRequest struct {\n+\tPageID   int32 `form:\"page_id\" binding:\"required,min=1\"`\n+\tPageSize int32 `form:\"page_size\" binding:\"required,min=5,max=10\"`\n+}\n+\n+func (server *Server) listAccounts(ctx *gin.Context) {\n+\t// 1. แกะ Query Parameters จาก URL (?page_id=1&page_size=5) ผ่าน ShouldBindQuery\n+\tvar req listAccountsRequest\n+\tif err := ctx.ShouldBindQuery(&req); err != nil {\n+\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n+\t\treturn\n+\t}\n+\n+\t// 2. คำนวณ Limit และ Offset สำหรับส่งให้คำสั่ง SQL (Offset = (PageID - 1) * PageSize)\n+\targ := db.ListAccountsParams{\n+\t\tLimit:  req.PageSize,\n+\t\tOffset: (req.PageID - 1) * req.PageSize,\n+\t}\n+\n+\t// 3. ดึงรายชื่อบัญชีจากฐานข้อมูลผ่าน store\n+\taccounts, err := server.store.ListAccounts(ctx, arg)\n+\tif err != nil {\n+\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n+\t\treturn\n+\t}\n+\n+\t// 4. ส่ง JSON Array ของบัญชีกลับไปพร้อม HTTP 200 OK\n+\tctx.JSON(http.StatusOK, accounts)\n+}"
        },
        {
          "t": "ul",
          "c": [
            "**`form:\"page_id\"`**: Gin จะอ่านค่าจาก URL Query String เช่น `?page_id=1&page_size=5`",
            "**`binding:\"required,min=5,max=10\"`**: บังคับให้ขนาดหน้าต้องอยู่ระหว่าง 5 ถึง 10 แถว เพื่อป้องกันผู้ใช้ขอข้อมูลครั้งละ 1,000,000 แถวจนหน่วยความจำเซิร์ฟเวอร์เต็ม (DoS Protection)",
            "**`Offset = (PageID - 1) * PageSize`**: สูตรคำนวณตำแหน่งเริ่มต้นของข้อมูลในฐานข้อมูล เช่น หน้าที่ 2 ขนาด 5 แถว จะได้ Offset = 5 (ข้าม 5 แถวแรกไป)"
          ]
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/account.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/account.go\n// หน้าที่: API Handler สำหรับจัดการบัญชี (POST /accounts, GET /accounts/:id, GET /accounts)\n// แก้ปัญหา: ออกแบบตามมาตรฐาน Clean Architecture สำหรับระบบธนาคาร\n// =============================================================================\npackage api\n\nimport (\n\t\"database/sql\"\n\t\"errors\"\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n)\n\ntype createAccountRequest struct {\n\tOwner    string `json:\"owner\" binding:\"required\"`\n\tCurrency string `json:\"currency\" binding:\"required,oneof=USD EUR THB\"`\n}\n\nfunc (server *Server) createAccount(ctx *gin.Context) {\n\tvar req createAccountRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\targ := db.CreateAccountParams{\n\t\tOwner:    req.Owner,\n\t\tCurrency: req.Currency,\n\t\tBalance:  0,\n\t}\n\n\taccount, err := server.store.CreateAccount(ctx, arg)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusCreated, account)\n}\n\ntype getAccountRequest struct {\n\tID int64 `uri:\"id\" binding:\"required,min=1\"`\n}\n\nfunc (server *Server) getAccount(ctx *gin.Context) {\n\tvar req getAccountRequest\n\tif err := ctx.ShouldBindUri(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\taccount, err := server.store.GetAccount(ctx, req.ID)\n\tif err != nil {\n\t\tif errors.Is(err, sql.ErrNoRows) {\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err))\n\t\t\treturn\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, account)\n}\n\ntype listAccountsRequest struct {\n\tPageID   int32 `form:\"page_id\" binding:\"required,min=1\"`\n\tPageSize int32 `form:\"page_size\" binding:\"required,min=5,max=10\"`\n}\n\nfunc (server *Server) listAccounts(ctx *gin.Context) {\n\tvar req listAccountsRequest\n\tif err := ctx.ShouldBindQuery(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\targ := db.ListAccountsParams{\n\t\tLimit:  req.PageSize,\n\t\tOffset: (req.PageID - 1) * req.PageSize,\n\t}\n\n\taccounts, err := server.store.ListAccounts(ctx, arg)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, accounts)\n}"
        },
        {
          "t": "h2",
          "c": "6. ประกอบร่างและเปิดรันเซิร์ฟเวอร์ด้วย `main.go`"
        },
        {
          "t": "p",
          "c": "ในบทที่ 3 เราเคยสร้างไฟล์ `simplebank/main.go` ไว้เป็นสคริปต์สั้นๆ เพื่อทดสอบต่อ DB และยิง CRUD แต่ในบทนี้ ถึงเวลา **อัปเกรด `main.go`** ให้กลายเป็น Web Server เต็มรูปแบบ โดยการมัดรวม Store ส่งต่อให้ Gin ผ่าน `api.NewServer(store)` และสั่งเปิดบริการ HTTP บนพอร์ต 8080:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/main.go",
          "c": " package main\n\n import (\n+\t\"database/sql\"\n \t\"log\"\n\n \t_ \"github.com/lib/pq\"\n+\t\"simplebank/api\"\n \tdb \"simplebank/db\"\n )\n\n const (\n+\tdbDriver      = \"postgres\"\n \tdbSource      = \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\"\n+\tserverAddress = \"0.0.0.0:8080\"\n )\n\n func main() {\n-\t// 1. เชื่อมต่อฐานข้อมูลผ่าน NewDB\n-\tconn, err := db.NewDB(dbSource)\n+\tconn, err := sql.Open(dbDriver, dbSource)\n \tif err != nil {\n-\t\tlog.Fatal(\"❌ ไม่สามารถเชื่อมต่อฐานข้อมูลได้:\", err)\n+\t\tlog.Fatal(\"cannot connect to db:\", err)\n \t}\n\n-\t// โค้ดเดิมในบทที่ 3: ทดลองยิง CreateAccount และ GetAccount ตรงๆ\n-\tqueries := db.New(conn)\n-\t...\n+\t// โค้ดใหม่: ส่ง Store เข้า Gin Server แล้วเปิดบริการ HTTP\n+\tstore := db.NewStore(conn)\n+\tserver := api.NewServer(store)\n+\n+\terr = server.Start(serverAddress)\n+\tif err != nil {\n+\t\tlog.Fatal(\"cannot start server:\", err)\n+\t}\n }"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/main.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/main.go\n// หน้าที่: โค้ดส่วนประกอบของ simplebank/main.go\n// แก้ปัญหา: ออกแบบตามมาตรฐาน Clean Architecture สำหรับระบบธนาคาร\n// =============================================================================\npackage main\n\nimport (\n\t\"database/sql\"\n\t\"log\"\n\n\t_ \"github.com/lib/pq\"\n\t\"simplebank/api\"\n\tdb \"simplebank/db\"\n)\n\nconst (\n\tdbDriver      = \"postgres\"\n\tdbSource      = \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\"\n\tserverAddress = \"0.0.0.0:8080\"\n)\n\nfunc main() {\n\tconn, err := sql.Open(dbDriver, dbSource)\n\tif err != nil {\n\t\tlog.Fatal(\"cannot connect to db:\", err)\n\t}\n\n\tstore := db.NewStore(conn)\n\tserver := api.NewServer(store)\n\n\terr = server.Start(serverAddress)\n\tif err != nil {\n\t\tlog.Fatal(\"cannot start server:\", err)\n\t}\n}"
        },
        {
          "t": "p",
          "c": "เปิด Terminal ขึ้นมา แล้วสั่งรันเซิร์ฟเวอร์ด้วยคำสั่ง:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "Terminal ที่ 1: คำสั่งสตาร์ตเซิร์ฟเวอร์ Gin (Listening on :8080)",
          "code": "go run main.go",
          "out": "[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.\n[GIN-debug] POST   /accounts                 --> simplebank/api.(*Server).createAccount-fm (3 handlers)\n[GIN-debug] GET    /accounts/:id             --> simplebank/api.(*Server).getAccount-fm (3 handlers)\n[GIN-debug] GET    /accounts                 --> simplebank/api.(*Server).listAccounts-fm (3 handlers)\n[GIN-debug] Listening and serving HTTP on 0.0.0.0:8080\n(เซิร์ฟเวอร์เปิดทำงานสำเร็จ พร้อมรับคำขอ HTTP แล้ว!)"
        },
        {
          "t": "h2",
          "c": "7. ทดสอบเรียกใช้งาน API (Postman / API Client)"
        },
        {
          "t": "callout",
          "title": "💡 จุดที่ต้องตั้งค่าใน Postman / API Client",
          "c": "ในการทดสอบ API ให้เปิด Postman (หรือ REST Client) แล้วตั้งค่าตาม 3 จุดหลักดังนี้:\n- **Method & URL:** เลือก Method (`POST`, `GET`) และใส่ URL ปลายทาง\n- **Headers:** ในแท็บ `Headers` กำหนด `Content-Type`: `application/json`\n- **Body:** เลือกแท็บ `Body` → ติ๊ก `raw` → เลือกประเภทเป็น `JSON` แล้ววางข้อมูล Payload"
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "1. สร้างบัญชีใหม่: POST /accounts",
          "code": "POST http://localhost:8080/accounts\nContent-Type: application/json\n\n{\n  \"owner\": \"alice\",\n  \"currency\": \"USD\"\n}",
          "out": "HTTP/1.1 201 Created\nContent-Type: application/json; charset=utf-8\n\n{\n  \"id\": 1,\n  \"owner\": \"alice\",\n  \"balance\": 0,\n  \"currency\": \"USD\",\n  \"created_at\": \"2026-09-26T10:00:00.123456Z\"\n}"
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "2. ดึงข้อมูลบัญชีตาม ID: GET /accounts/:id",
          "code": "# เคสที่ 1: ดึงบัญชี ID = 1 ที่มีอยู่จริง (URL: http://localhost:8080/accounts/1)\nGET http://localhost:8080/accounts/1\n\n# เคสที่ 2: ดึงบัญชี ID = 99999 ที่ไม่มีอยู่จริง (URL: http://localhost:8080/accounts/99999)\nGET http://localhost:8080/accounts/99999",
          "out": "# ผลลัพธ์เคสที่ 1: 200 OK\nHTTP/1.1 200 OK\nContent-Type: application/json; charset=utf-8\n\n{\n  \"id\": 1,\n  \"owner\": \"alice\",\n  \"balance\": 0,\n  \"currency\": \"USD\",\n  \"created_at\": \"2026-09-26T10:00:00.123456Z\"\n}\n\n# ผลลัพธ์เคสที่ 2: 404 Not Found\nHTTP/1.1 404 Not Found\nContent-Type: application/json; charset=utf-8\n\n{\n  \"error\": \"sql: no rows in result set\"\n}"
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "3. ดึงรายการบัญชีแบบแบ่งหน้า: GET /accounts (Query Params)",
          "code": "GET http://localhost:8080/accounts?page_id=1&page_size=5",
          "out": "HTTP/1.1 200 OK\nContent-Type: application/json; charset=utf-8\n\n[\n  {\n    \"id\": 1,\n    \"owner\": \"alice\",\n    \"balance\": 0,\n    \"currency\": \"USD\",\n    \"created_at\": \"2026-09-26T10:00:00.123456Z\"\n  }\n]"
        },
        {
          "t": "callout",
          "title": "🏆 Go Production Best Practice: ใช้ errors.Is และจัดการ PostgreSQL Constraint Error",
          "c": "1. **ใช้ `errors.Is(err, sql.ErrNoRows)` แทน `err == sql.ErrNoRows`**: ใน Go 1.13+ หาก Error ถูกห่อด้วย `fmt.Errorf(\"...: %w\", err)` การใช้ `==` จะตรวจไม่เจอ แต่ `errors.Is` จะแกะเช็กให้ถึงต้นตออย่างปลอดภัย\n2. **ใช้ `db.NewDB` ที่ตั้งค่า Connection Pool เสมอ**: ในระบบ Production จริง แนะนำให้เรียก `db.NewDB(dbSource)` ที่เราสร้างไว้ในบทที่ 3.1 (ซึ่งตั้งค่า `SetMaxOpenConns`, `SetMaxIdleConns`, และ `db.Ping()`) แทนการเรียก `sql.Open` เปล่าๆ"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• คุณได้เปิดประตู HTTP API สำหรับสร้างและดึงข้อมูลบัญชีด้วย Gin Framework พร้อมระบบตรวจสอบข้อมูลขาเข้าและจัดการ HTTP Status Code อย่างเป็นระบบแล้ว\n• **ก้าวต่อไป (บทที่ 6.2)**: เราจะสร้าง Endpoint ที่สำคัญที่สุดคือ **`POST /transfers` (การโอนเงินผ่าน API)** พร้อมสร้าง **Custom Currency Validator** เพื่อป้องกันการโอนเงินข้ามสกุลเงิน!"
        }
      ],
      "en": []
    }
  },
  "bank-api-validation": {
    "slug": "bank-api-validation",
    "title": {
      "th": "6.2 Data Validation & ป้องกันการโอนข้ามสกุลเงิน",
      "en": "6.2 Data Validation & Cross-Currency Safety"
    },
    "lead": {
      "th": "สร้าง Custom Validator ใน Gin ตรวจสอบสกุลเงิน และเขียนกฎทางธุรกิจป้องกันความเสียหายจากการโอนเงินต่างสกุลโดยไม่มีอัตราแลกเปลี่ยน",
      "en": "Implementing custom validators in Gin and enforcing currency-matching business rules."
    },
    "group": "6. เปิดประตูสู่โลกภายนอกด้วย RESTful API (Gin)",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: สร้าง HTTP Server และ Endpoints ของบัญชี (`/accounts`) เรียบร้อยแล้ว\n• **ภารกิจในบทนี้**: สร้างไฟล์ `util/currency.go`, `api/validator.go`, และ `api/transfer.go` เพื่อเปิดบริการ `POST /transfers` ที่ตรวจสอบว่าบัญชีทั้งสองฝั่งใช้สกุลเงินเดียวกัน\n• **ไวยากรณ์ Go ที่จะได้ใช้จริง**: Type Assertion แบบ Comma-ok (`v, ok := x.(Type)`) ใน `validator.go` และ `server.go`"
        },
        {
          "t": "p",
          "c": "ลองคิดดูว่าจะเกิดอะไรขึ้นถ้ามีคนพยายามโอนเงิน **100 USD ไปยังบัญชีที่เก็บเป็นสกุล THB**? หากระบบของเราเพียงแค่นำตัวเลข 100 ไปตัดบัญชีต้นทางแล้วเพิ่ม 100 ในบัญชีปลายทาง ผู้รับจะได้เงินเพียง 100 บาท (ขาดทุนมหาศาล) หรือหากโอนกลับกัน ผู้รับจะได้ 100 ดอลลาร์ทั้งที่โอนมาแค่ 100 บาท! นี่คือช่องโหว่ร้ายแรงที่ระบบธนาคารต้องดักจับตั้งแต่ประตูหน้าบ้าน"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go & Best Practices ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "ไวยากรณ์ Go ในบทนี้",
            "โค้ดที่ปรากฏ",
            "แกะความหมายให้เข้าใจง่าย"
          ],
          "rows": [
            [
              "1. Type Assertion (.(string))",
              "`if currency, ok := fieldLevel.Field().Interface().(string); ok`",
              "`Interface()` คืนค่าเป็นชนิดกลาง `interface{}` เราจึงใช้ `.(string)` คู่กับตัวแปร `ok` เพื่อตรวจว่าค่าที่ส่งมาเป็น `string` จริงหรือไม่ ก่อนส่งไปเช็กสกุลเงิน"
            ],
            [
              "2. ลงทะเบียน Custom Validator",
              "`if v, ok := binding.Validator.Engine().(*validator.Validate); ok {\n    v.RegisterValidation(\"currency\", validCurrency)\n}`",
              "ดึงตัวตรวจคำขอของ Gin ออกมาด้วย Type Assertion `.(*validator.Validate)` แล้วผูกคำว่า `\"currency\"` เข้ากับฟังก์ชัน `validCurrency`"
            ],
            [
              "3. ฟังก์ชัน validAccount คืน 2 ค่า",
              "`fromAccount, valid := server.validAccount(ctx, req.FromAccountID, req.Currency)`",
              "คืนทั้งข้อมูล `db.Account` (เพื่อนำไปเช็กเจ้าของบัญชีต่อในบทที่ 7.2) และค่า `bool` ว่าผ่านการตรวจสอบหรือไม่"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. การสร้าง Custom Validator สำหรับ Currency ใน Go"
        },
        {
          "t": "p",
          "c": "เราจะสร้างฟังก์ชันตรวจสอบสกุลเงินที่รองรับ โดยใช้อินเทอร์เฟซ `validator.Func`:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/validator.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/validator.go\n// หน้าที่: โค้ดส่วนประกอบของ simplebank/api/validator.go\n// แก้ปัญหา: ออกแบบตามมาตรฐาน Clean Architecture สำหรับระบบธนาคาร\n// =============================================================================\npackage api\n\nimport (\n\t\"github.com/go-playground/validator/v10\"\n\t\"simplebank/util\"\n)\n\n// validCurrency ตรวจสอบว่าสกุลเงินที่ส่งมาอยู่ในกลุ่มที่ระบบรองรับหรือไม่\nvar validCurrency validator.Func = func(fieldLevel validator.FieldLevel) bool {\n\tif currency, ok := fieldLevel.Field().Interface().(string); ok {\n\t\treturn util.IsSupportedCurrency(currency)\n\t}\n\treturn false\n}"
        },
        {
          "t": "p",
          "c": "และใน `util/currency.go` เรานิยามสกุลเงินที่รองรับ:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/currency.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/util/currency.go\n// หน้าที่: โค้ดส่วนประกอบของ simplebank/util/currency.go\n// แก้ปัญหา: ออกแบบตามมาตรฐาน Clean Architecture สำหรับระบบธนาคาร\n// =============================================================================\npackage util\n\nconst (\n\tUSD = \"USD\"\n\tEUR = \"EUR\"\n\tTHB = \"THB\"\n)\n\nfunc IsSupportedCurrency(currency string) bool {\n\tswitch currency {\n\tcase USD, EUR, THB:\n\t\treturn true\n\t}\n\treturn false\n}"
        },
        {
          "t": "h2",
          "c": "3. ลงทะเบียน Custom Validator เข้ากับ Gin Engine"
        },
        {
          "t": "p",
          "c": "ในฟังก์ชัน `NewServer` ให้เราดึง Validator Engine ของ Gin ออกมา แล้วลงทะเบียนแท็กชื่อ `currency`:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/api/server.go",
          "c": " package api\n\n import (\n \t\"github.com/gin-gonic/gin\"\n+\t\"github.com/gin-gonic/gin/binding\"\n+\t\"github.com/go-playground/validator/v10\"\n \tdb \"simplebank/db\"\n )\n\n func NewServer(store *db.Store) *Server {\n \tserver := &Server{store: store}\n \trouter := gin.Default()\n\n+\t// ลงทะเบียน custom validator tag \"currency\"\n+\tif v, ok := binding.Validator.Engine().(*validator.Validate); ok {\n+\t\tv.RegisterValidation(\"currency\", validCurrency)\n+\t}\n+\n \t// 2. ลงทะเบียน Routing สำหรับแต่ละ Endpoint\n \trouter.POST(\"/accounts\", server.createAccount)"
        },
        {
          "t": "p",
          "c": "จากนั้นให้เปิดไฟล์ `api/account.go` เพื่อเปลี่ยนแท็ก Validation ของฟิลด์ `Currency` จากเดิมที่เป็น `oneof=USD EUR THB` มาใช้ Custom Tag `currency` ที่เราเพิ่งสร้างขึ้น:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/api/account.go",
          "c": " type createAccountRequest struct {\n \tOwner    string `json:\"owner\" binding:\"required\"`\n-\tCurrency string `json:\"currency\" binding:\"required,oneof=USD EUR THB\"`\n+\tCurrency string `json:\"currency\" binding:\"required,currency\"`\n }"
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "ทดสอบส่งสกุลเงินที่ไม่รองรับ (XYZ) ใน Postman / API Client -> ได้รับ HTTP 400",
          "code": "POST http://localhost:8080/accounts\nContent-Type: application/json\n\n{\n  \"owner\": \"alice\",\n  \"currency\": \"XYZ\"\n}",
          "out": "HTTP/1.1 400 Bad Request\nContent-Type: application/json; charset=utf-8\n\n{\n  \"error\": \"Key: 'createAccountRequest.Currency' Error:Field validation for 'Currency' failed on the 'currency' tag\"\n}"
        },
        {
          "t": "h2",
          "c": "4. Endpoint โอนเงิน: `POST /transfers` พร้อมกฎ Currency Match"
        },
        {
          "t": "p",
          "c": "มาดูโค้ดของ Handler โอนเงิน ซึ่งต้องเช็กทั้งรูปแบบข้อมูล และตรวจสอบว่าบัญชีทั้งสองฝั่งใช้สกุลเงินเดียวกันกับที่ระบุในคำขอโอนหรือไม่:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/transfer.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/transfer.go\n// หน้าที่: API Handler สำหรับจัดการการโอนเงิน (POST /transfers)\n// แก้ปัญหา: ตรวจสอบความถูกต้องของบัญชีต้นทาง-ปลายทาง และสกุลเงิน ก่อนส่งคำสั่งเข้า Transaction\n// =============================================================================\npackage api\n\nimport (\n\t\"database/sql\"\n\t\"errors\"\n\t\"fmt\"\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n)\n\n// transferRequest กำหนดโครงสร้าง JSON สำหรับคำขอโอนเงิน พร้อมเงื่อนไขความปลอดภัย\ntype transferRequest struct {\n\tFromAccountID int64  `json:\"from_account_id\" binding:\"required,min=1\"`\n\tToAccountID   int64  `json:\"to_account_id\" binding:\"required,min=1\"`\n\tAmount        int64  `json:\"amount\" binding:\"required,gt=0\"`         // จำนวนเงินต้องมากกว่า 0 ห้ามติดลบเด็ดขาด\n\tCurrency      string `json:\"currency\" binding:\"required,currency\"`\n}\n\nfunc (server *Server) createTransfer(ctx *gin.Context) {\n\t// 1. แกะ JSON Payload และตรวจสอบความถูกต้องของข้อมูล\n\tvar req transferRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 2. ตรวจสอบว่าบัญชีต้นทางมีอยู่จริง และสกุลเงินตรงกับคำขอโอนหรือไม่\n\tfromAccount, valid := server.validAccount(ctx, req.FromAccountID, req.Currency)\n\tif !valid {\n\t\treturn\n\t}\n\n\t// 3. ตรวจสอบว่าบัญชีปลายทางมีอยู่จริง และสกุลเงินตรงกับคำขอโอนหรือไม่\n\t_, valid = server.validAccount(ctx, req.ToAccountID, req.Currency)\n\tif !valid {\n\t\treturn\n\t}\n\n\t// 4. เตรียมพารามิเตอร์ส่งต่อไปยัง Transaction Manager\n\targ := db.TransferTxParams{\n\t\tFromAccountID: fromAccount.ID,\n\t\tToAccountID:   req.ToAccountID,\n\t\tAmount:        req.Amount,\n\t}\n\n\t// 5. สั่งรันการโอนเงินแบบ Atomic ผ่าน TransferTx\n\tresult, err := server.store.TransferTx(ctx, arg)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 6. ส่งผลลัพธ์การโอนเงินสำเร็จกลับไปให้หน้าบ้าน\n\tctx.JSON(http.StatusOK, result)\n}\n\n// validAccount ตรวจสอบความมีอยู่จริงและสกุลเงินของบัญชีก่อนเริ่มทำ Transaction พร้อมคืนค่า Account เพื่อนำไปใช้งานต่อ\nfunc (server *Server) validAccount(ctx *gin.Context, accountID int64, currency string) (db.Account, bool) {\n\t// ค้นหาข้อมูลบัญชีจากฐานข้อมูล\n\taccount, err := server.store.GetAccount(ctx, accountID)\n\tif err != nil {\n\t\tif errors.Is(err, sql.ErrNoRows) {\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err)) // ไม่พบบัญชี ส่ง 404\n\t\t\treturn account, false\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err)) // ข้อผิดพลาดฝั่งเซิร์ฟเวอร์ ส่ง 500\n\t\treturn account, false\n\t}\n\n\t// ตรวจสอบความสอดคล้องของสกุลเงิน ป้องกันการโอนข้ามสกุลเงินโดยไม่แปลงค่า\n\tif account.Currency != currency {\n\t\terr := fmt.Errorf(\"สกุลเงินของบัญชี [%d] คือ %s ไม่ตรงกับคำขอโอน %s\", accountID, account.Currency, currency)\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn account, false\n\t}\n\n\treturn account, true\n}"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`binding:\"required,gt=0\"`**: ป้องกันการส่งจำนวนเงินติดลบ เช่น โอนเงิน `-500` บาท ซึ่งอาจถูกใช้เป็นช่องโหว่ในการดูดเงินจากปลายทางกลับเข้ากระเป๋าตัวเอง",
            "**`validAccount(...)`**: ตรวจสอบบัญชีก่อนส่งคำสั่งเข้า Transaction ช่วยลดภาระของฐานข้อมูล (Database Load) ไม่ต้องเปิด Transaction โดยเปล่าประโยชน์หากบัญชีไม่มีอยู่จริงหรือสกุลเงินไม่ตรงกัน",
            "**Currency Consistency**: การันตีว่าไม่มีการโอนข้ามสกุลเงินเกิดขึ้น ข้อมูลเงินในระบบจะถูกต้องตรงตามความเป็นจริง 100%"
          ]
        },
        {
          "t": "h2",
          "c": "5. ลงทะเบียน Route `/transfers` และรีสตาร์ตเซิร์ฟเวอร์"
        },
        {
          "t": "p",
          "c": "เปิดไฟล์ `api/server.go` เพื่อลงทะเบียน Route `POST /transfers` เข้าสู่ Gin Engine ให้ครบสมบูรณ์:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/api/server.go",
          "c": " \t// ลงทะเบียน Routing สำหรับแต่ละ Endpoint\n \trouter.POST(\"/accounts\", server.createAccount)\n \trouter.GET(\"/accounts/:id\", server.getAccount)\n \trouter.GET(\"/accounts\", server.listAccounts)\n+\trouter.POST(\"/transfers\", server.createTransfer)\n \n \tserver.router = router\n \treturn server"
        },
        {
          "t": "p",
          "c": "กลับไปที่ **Terminal หน้าต่างที่ 1** กด `Ctrl + C` เพื่อหยุดเซิร์ฟเวอร์เดิม แล้วสั่งรันใหม่อีกครั้งเพื่อโหลด Route ล่าสุด:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "Terminal ที่ 1: สั่งรันเซิร์ฟเวอร์ใหม่ (จะเห็น Route /transfers ปรากฏขึ้น)",
          "code": "go run main.go",
          "out": "[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.\n[GIN-debug] POST   /accounts                 --> simplebank/api.(*Server).createAccount-fm (3 handlers)\n[GIN-debug] GET    /accounts/:id             --> simplebank/api.(*Server).getAccount-fm (3 handlers)\n[GIN-debug] GET    /accounts                 --> simplebank/api.(*Server).listAccounts-fm (3 handlers)\n[GIN-debug] POST   /transfers                --> simplebank/api.(*Server).createTransfer-fm (3 handlers)\n[GIN-debug] Listening and serving HTTP on 0.0.0.0:8080"
        },
        {
          "t": "h2",
          "c": "6. เติมเงินตั้งต้นและทดสอบยิงโอนเงินจริง"
        },
        {
          "t": "callout",
          "title": "💡 การเตรียมเงินทดสอบก่อนสั่งโอน (Initial Balance Seeding)",
          "c": "เนื่องจากตอนเปิดบัญชีผ่าน `POST /accounts` ระบบจะกำหนดยอดเงินเริ่มต้นเป็น 0 บาท (`balance = 0`) เสมอตามหลักความปลอดภัย\nก่อนที่เราจะทดสอบยิงโอนเงิน 100 USD จากบัญชี 1 (Alice) ไปยังบัญชี 2 (Bob) ให้เราทำการใส่เงินตั้งต้น 1,000 USD ให้บัญชี 1 และ 500 USD ให้บัญชี 2 ผ่านคำสั่ง SQL ใน Terminal ดังนี้:\n```bash\ndocker exec -it postgres16 psql -U root -d simple_bank -c \"\nUPDATE accounts SET balance = 1000 WHERE id = 1;\nUPDATE accounts SET balance = 500 WHERE id = 2;\nINSERT INTO entries (account_id, amount) VALUES (1, 1000), (2, 500);\n\"\n```\n*(ในระบบธนาคารจริง ยอดเงินตั้งต้นนี้จะมาจากการฝากเงินสดที่สาขา หรือการเติมเงินผ่าน Payment Gateway/PromptPay)*"
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "1. สั่งโอนเงินสำเร็จ: POST /transfers (ตั้งค่าใน Postman / API Client)",
          "code": "POST http://localhost:8080/transfers\nContent-Type: application/json\n\n{\n  \"from_account_id\": 1,\n  \"to_account_id\": 2,\n  \"amount\": 100,\n  \"currency\": \"USD\"\n}",
          "out": "HTTP/1.1 200 OK\nContent-Type: application/json; charset=utf-8\n\n{\n  \"transfer\": {\n    \"id\": 1,\n    \"from_account_id\": 1,\n    \"to_account_id\": 2,\n    \"amount\": 100,\n    \"created_at\": \"2026-09-26T10:05:00.654321Z\"\n  },\n  \"from_account\": {\n    \"id\": 1,\n    \"owner\": \"alice\",\n    \"balance\": 900,\n    \"currency\": \"USD\",\n    \"created_at\": \"2026-09-26T10:00:00.123456Z\"\n  },\n  \"to_account\": {\n    \"id\": 2,\n    \"owner\": \"bob\",\n    \"balance\": 600,\n    \"currency\": \"USD\",\n    \"created_at\": \"2026-09-26T10:01:00.123456Z\"\n  },\n  \"from_entry\": {\n    \"id\": 1,\n    \"account_id\": 1,\n    \"amount\": -100,\n    \"created_at\": \"2026-09-26T10:05:00.654321Z\"\n  },\n  \"to_entry\": {\n    \"id\": 2,\n    \"account_id\": 2,\n    \"amount\": 100,\n    \"created_at\": \"2026-09-26T10:05:00.654321Z\"\n  }\n}"
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "2. ทดสอบกรณีโอนข้ามสกุลเงิน (ตรวจพบ Currency Mismatch) -> ได้รับ HTTP 400",
          "code": "POST http://localhost:8080/transfers\nContent-Type: application/json\n\n{\n  \"from_account_id\": 1,\n  \"to_account_id\": 2,\n  \"amount\": 100,\n  \"currency\": \"THB\"\n}",
          "out": "HTTP/1.1 400 Bad Request\nContent-Type: application/json; charset=utf-8\n\n{\n  \"error\": \"สกุลเงินของบัญชี [1] คือ USD ไม่ตรงกับคำขอโอน THB\"\n}"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• ตอนนี้ API ของคุณสามารถสร้างบัญชี, ดึงบัญชี, และโอนเงินพร้อมตรวจสอบสกุลเงินได้อย่างครบถ้วนแล้ว\n• **ก้าวต่อไป (บทที่ 7.1 & 7.2)**: เพื่อปิดช่องโหว่ไม่ให้ใครแอบอ้างชื่อคนอื่นเปิดบัญชีหรือโอนเงิน ในหมวดที่ 7 เราจะสร้างระบบสมาชิก (`users`), เข้ารหัสรหัสผ่านด้วย **Bcrypt**, และล็อกทุก Endpoint ด้วย **PASETO Token Middleware** กันครับ!"
        }
      ],
      "en": []
    }
  }
};
