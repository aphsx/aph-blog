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
      "th": "เชื่อมต่อ Data Store เข้ากับเว็บเซิร์ฟเวอร์ความเร็วสูงด้วย Gin Gonic, วางโครงสร้าง Dependency Injection ใน Server Struct, และสร้าง HTTP Handlers สำหรับบัญชีธนาคาร",
      "en": "Connecting the store layer to a blazing-fast HTTP server with Gin Gonic, dependency injection, and clean error handling."
    },
    "group": "6. เปิดประตูสู่โลกภายนอกด้วย RESTful API (Gin)",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: สร้างและทดสอบชั้นฐานข้อมูล (`simplebank/db/`) ทั้ง CRUD และระบบโอนเงินปลอด Deadlock เสร็จสมบูรณ์แล้ว\n• **ภารกิจในบทนี้**: สร้างโฟลเดอร์ `simplebank/api/` เพื่อเปิด HTTP Server ด้วย Gin Framework (`api/server.go`, `api/account.go`) และสร้างจุดเริ่มต้นของโปรแกรม (`main.go`)\n• **ไวยากรณ์ Go ที่จะได้ใช้จริง**: Dependency Injection ใน Struct (`Server`), Struct Tags (`json`, `uri`, `form`, `binding`), และการใช้ `&req` ใน `ctx.ShouldBindJSON(&req)`"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "กลไกใน Gin API",
            "โค้ดที่ปรากฏ",
            "คำอธิบายแบบเข้าใจง่าย"
          ],
          "rows": [
            [
              "1. Dependency Injection",
              "type Server struct {\n    store  *db.Store\n    router *gin.Engine\n}",
              "แทนที่จะสร้างตัวแปร Global เชื่อมต่อฐานข้อมูล เราส่ง `*db.Store` เข้ามาเก็บไว้ใน Struct `Server` ตอนเรียก `NewServer(store)` ทำให้ทุก Handler เรียก `server.store` ได้อย่างเป็นระเบียบ"
            ],
            [
              "2. Binding Struct Tags",
              "`json:\"owner\" binding:\"required\"`\n`uri:\"id\" binding:\"required,min=1\"`\n`form:\"page_id\" binding:\"required,min=1\"`",
              "บอกให้ Gin รู้ว่าจะดึงค่าจากที่ไหน: `json` ดึงจาก HTTP Body, `uri` ดึงจาก Path เช่น `/accounts/1`, `form` ดึงจาก Query String เช่น `?page_id=1` พร้อมตรวจเงื่อนไข `binding` อัตโนมัติ"
            ],
            [
              "3. ส่ง &req เข้า ShouldBind",
              "var req createAccountRequest\nif err := ctx.ShouldBindJSON(&req); err != nil",
              "ต้องส่งพิกัด `&req` (Pointer) เข้าไป เพื่อให้ Gin แกะข้อมูลจาก JSON ไปเขียนใส่ตัวแปร `req` ของเราได้ (เหมือนตอนใช้ `row.Scan(&i.ID)` ในบทที่ 3)"
            ],
            [
              "4. gin.H คืออะไร?",
              "func errorResponse(err error) gin.H {\n    return gin.H{\"error\": err.Error()}\n}",
              "`gin.H` คือชื่อย่อของ `map[string]interface{}` ช่วยให้เราสร้างก้อน JSON อย่างรวดเร็ว เช่น `{\"error\": \"ข้อความปัญหา\"}`"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. ติดตั้ง Gin และสร้างไฟล์ simplebank/api/server.go"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "ติดตั้งไลบรารี Gin Web Framework",
          "c": "go get github.com/gin-gonic/gin"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/server.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/server.go\n// หน้าที่: นิยาม Server Struct, ผูกเส้นทาง HTTP Routing, และเริ่มต้นรันเว็บเซิร์ฟเวอร์\n// แก้ปัญหา: เชื่อมต่อ HTTP Transport Layer เข้ากับ Database Store Layer ด้วย Dependency Injection\n// =============================================================================\npackage api\n\nimport (\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n)\n\n// Server ทำหน้าที่จัดการคำขอ HTTP ทั้งหมดของระบบธนาคาร\ntype Server struct {\n\tstore  *db.Store   // ตัวจัดการฐานข้อมูลและ Transaction\n\trouter *gin.Engine // ตัวกระจายเส้นทาง HTTP (Router) ของ Gin\n}\n\n// NewServer สร้าง Server instance พร้อมลงทะเบียนเส้นทาง API ทั้งหมด\nfunc NewServer(store *db.Store) *Server {\n\t// ขั้นตอนที่ 1: สร้าง Server พร้อมแนบ store เข้าไป\n\tserver := &Server{store: store}\n\trouter := gin.Default()\n\n\t// ขั้นตอนที่ 2: ลงทะเบียน HTTP Endpoints สำหรับจัดการบัญชี\n\trouter.POST(\"/accounts\", server.createAccount)\n\trouter.GET(\"/accounts/:id\", server.getAccount)\n\trouter.GET(\"/accounts\", server.listAccounts)\n\n\t// ขั้นตอนที่ 3: เก็บ router เข้าใน server แล้วคืนค่าออกไป\n\tserver.router = router\n\treturn server\n}\n\n// Start เปิดรัน HTTP Server บนที่อยู่และพอร์ตที่กำหนด (เช่น \"0.0.0.0:8080\")\nfunc (server *Server) Start(address string) error {\n\treturn server.router.Run(address)\n}\n\n// errorResponse แปลง error ให้เป็นโครงสร้าง JSON มาตรฐาน {\"error\": \"...\"}\nfunc errorResponse(err error) gin.H {\n\treturn gin.H{\"error\": err.Error()}\n}"
        },
        {
          "t": "h2",
          "c": "3. สร้างไฟล์ simplebank/api/account.go (ครบทั้ง 3 Endpoints)"
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/api/account.go` เพื่อจัดการคำขอเปิดบัญชีใหม่ (`POST /accounts`), ดึงข้อมูลบัญชีรายตัว (`GET /accounts/:id`), และดึงรายการบัญชีแบบแบ่งหน้า (`GET /accounts`):"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/account.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/account.go\n// หน้าที่: HTTP Handlers สำหรับเปิดบัญชี, ดึงบัญชีตาม ID, และดึงรายการบัญชีแบบแบ่งหน้า\n// แก้ปัญหา: ตรวจสอบความถูกต้องของข้อมูลขาเข้า (Input Validation) และคืน HTTP Status Code ที่เหมาะสม\n// =============================================================================\npackage api\n\nimport (\n\t\"database/sql\"\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n)\n\n// createAccountRequest กำหนดโครงสร้าง JSON ขาเข้าสำหรับเปิดบัญชีใหม่\ntype createAccountRequest struct {\n\tOwner    string `json:\"owner\" binding:\"required\"`\n\tCurrency string `json:\"currency\" binding:\"required,oneof=USD EUR THB\"`\n}\n\n// createAccount จัดการคำขอ POST /accounts\nfunc (server *Server) createAccount(ctx *gin.Context) {\n\t// ขั้นตอนที่ 1: แกะ JSON Body และตรวจเงื่อนไข binding\n\tvar req createAccountRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err)) // ตอบ 400 Bad Request หากส่งข้อมูลผิด\n\t\treturn\n\t}\n\n\t// ขั้นตอนที่ 2: เตรียมพารามิเตอร์สำหรับสร้างบัญชีในฐานข้อมูล (ยอดเริ่มต้นเป็น 0 เสมอ)\n\targ := db.CreateAccountParams{\n\t\tOwner:    req.Owner,\n\t\tCurrency: req.Currency,\n\t\tBalance:  0,\n\t}\n\n\t// ขั้นตอนที่ 3: เรียกใช้ Store เพื่อบันทึกบัญชีลง PostgreSQL\n\taccount, err := server.store.CreateAccount(ctx, arg)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err)) // ตอบ 500 หากฐานข้อมูลมีปัญหา\n\t\treturn\n\t}\n\n\t// ขั้นตอนที่ 4: ตอบกลับข้อมูลบัญชีที่สร้างเสร็จด้วย HTTP 201 Created\n\tctx.JSON(http.StatusCreated, account)\n}\n\n// getAccountRequest กำหนดโครงสร้าง URI Parameter สำหรับดึงบัญชีตาม ID\ntype getAccountRequest struct {\n\tID int64 `uri:\"id\" binding:\"required,min=1\"`\n}\n\n// getAccount จัดการคำขอ GET /accounts/:id\nfunc (server *Server) getAccount(ctx *gin.Context) {\n\t// ขั้นตอนที่ 1: แกะเลข ID จาก URL Path และตรวจว่าต้องมีค่าตั้งแต่ 1 ขึ้นไป\n\tvar req getAccountRequest\n\tif err := ctx.ShouldBindUri(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\t// ขั้นตอนที่ 2: ค้นหาบัญชีในฐานข้อมูลตาม ID\n\taccount, err := server.store.GetAccount(ctx, req.ID)\n\tif err != nil {\n\t\tif err == sql.ErrNoRows {\n\t\t\t// หากไม่พบบัญชีหมายเลขนี้ ให้ตอบ 404 Not Found\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err))\n\t\t\treturn\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\t// ขั้นตอนที่ 3: ตอบกลับข้อมูลบัญชีด้วย HTTP 200 OK\n\tctx.JSON(http.StatusOK, account)\n}\n\n// listAccountsRequest กำหนดโครงสร้าง Query String สำหรับแบ่งหน้า (?page_id=1&page_size=5)\ntype listAccountsRequest struct {\n\tPageID   int32 `form:\"page_id\" binding:\"required,min=1\"`\n\tPageSize int32 `form:\"page_size\" binding:\"required,min=5,max=10\"`\n}\n\n// listAccounts จัดการคำขอ GET /accounts\nfunc (server *Server) listAccounts(ctx *gin.Context) {\n\t// ขั้นตอนที่ 1: แกะค่า page_id และ page_size จาก URL Query String\n\tvar req listAccountsRequest\n\tif err := ctx.ShouldBindQuery(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\t// ขั้นตอนที่ 2: คำนวณ Limit และ Offset จากหมายเลขหน้า\n\targ := db.ListAccountsParams{\n\t\tLimit:  req.PageSize,\n\t\tOffset: (req.PageID - 1) * req.PageSize,\n\t}\n\n\t// ขั้นตอนที่ 3: ดึงรายการบัญชีจากฐานข้อมูลแล้วส่งกลับด้วย HTTP 200 OK\n\taccounts, err := server.store.ListAccounts(ctx, arg)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, accounts)\n}"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**หลักการเลือกใช้ HTTP Status Code**:\n  • `201 Created`: สร้างข้อมูลใหม่สำเร็จ (`POST /accounts`)\n  • `200 OK`: ดึงข้อมูลหรือทำรายการสำเร็จ (`GET /accounts`)\n  • `400 Bad Request`: ลูกค้าส่งพารามิเตอร์มาผิดกติกา (ไม่ผ่าน `binding`)\n  • `404 Not Found`: ค้นหา ID ที่ไม่มีอยู่ในฐานข้อมูล (`err == sql.ErrNoRows`)\n  • `500 Internal Server Error`: เกิดข้อผิดพลาดภายในฝั่งเซิร์ฟเวอร์หรือฐานข้อมูล",
            "**สูตรคำนวณ `Offset: (req.PageID - 1) * req.PageSize`**: ถ้าขอดูหน้าที่ 1 (`PageID = 1`) จะได้ `(1 - 1) * 5 = 0` (ไม่ข้ามแถวแรก) ถ้าขอดูหน้าที่ 2 (`PageID = 2`) จะได้ `(2 - 1) * 5 = 5` (ข้าม 5 แถวแรกไปดึงแถวที่ 6–10)"
          ]
        },
        {
          "t": "h2",
          "c": "4. สร้างไฟล์ simplebank/main.go และทดสอบรันเซิร์ฟเวอร์จริง"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/main.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/main.go\n// หน้าที่: จุดเริ่มต้นของโปรแกรม (Entry Point) เชื่อมต่อ PostgreSQL และเปิดรัน Gin HTTP Server\n// =============================================================================\npackage main\n\nimport (\n\t\"database/sql\"\n\t\"log\"\n\n\t_ \"github.com/lib/pq\"\n\t\"simplebank/api\"\n\tdb \"simplebank/db\"\n)\n\nconst (\n\tdbDriver      = \"postgres\"\n\tdbSource      = \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\"\n\tserverAddress = \"0.0.0.0:8080\"\n)\n\nfunc main() {\n\t// ขั้นตอนที่ 1: เปิดการเชื่อมต่อฐานข้อมูล PostgreSQL\n\tconn, err := sql.Open(dbDriver, dbSource)\n\tif err != nil {\n\t\tlog.Fatal(\"ไม่สามารถเชื่อมต่อฐานข้อมูลได้:\", err)\n\t}\n\n\t// ขั้นตอนที่ 2: สร้าง Store และฉีด (Inject) เข้าไปใน Gin HTTP Server\n\tstore := db.NewStore(conn)\n\tserver := api.NewServer(store)\n\n\t// ขั้นตอนที่ 3: เริ่มต้นรับคำขอ HTTP บนพอร์ต 8080\n\tif err := server.Start(serverAddress); err != nil {\n\t\tlog.Fatal(\"ไม่สามารถเปิดรัน HTTP Server ได้:\", err)\n\t}\n}"
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "ทดสอบยิง POST /accounts หลังรัน go run main.go",
          "code": "POST http://localhost:8080/accounts\nContent-Type: application/json\n\n{\n  \"owner\": \"alice\",\n  \"currency\": \"USD\"\n}",
          "out": "HTTP/1.1 201 Created\nContent-Type: application/json; charset=utf-8\n\n{\n  \"id\": 1,\n  \"owner\": \"alice\",\n  \"balance\": 0,\n  \"currency\": \"USD\",\n  \"created_at\": \"2026-09-26T10:00:00.123456Z\"\n}"
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
      "th": "สร้าง Custom Validator ใน Gin เพื่อรวมศูนย์การตรวจสอบสกุลเงิน และสร้าง Endpoint POST /transfers ที่ป้องกันการโอนเงินต่างสกุลกัน",
      "en": "Implementing custom validators in Gin and enforcing currency-matching business rules on money transfers."
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
          "t": "h2",
          "c": "1. ทำไมต้องป้องกันการโอนเงินข้ามสกุลเงิน และทำไมต้องเขียน Custom Validator?"
        },
        {
          "t": "p",
          "c": "1. **ปัญหาการโอนข้ามสกุลเงิน**: ถ้าบัญชีที่ 1 เก็บเงินสกุล `USD` แต่บัญชีที่ 2 เก็บสกุล `THB` แล้วเราสั่งโอนตัวเลข `100` ไปตรงๆ เงิน 100 ดอลลาร์จะกลายเป็น 100 บาททันที! ดังนั้นก่อนเรียก `TransferTx` เราต้องตรวจว่าทั้งสองบัญชีใช้สกุลเงินเดียวกันกับคำขอโอนเสมอ\n2. **ปัญหาการเขียน `oneof=USD EUR THB` ซ้ำหลายที่**: ถ้าวันหน้าธนาคารรองรับสกุลเงินใหม่ (เช่น `JPY`, `GBP`) เราต้องตามไปแก้ Struct Tag ในทุกไฟล์ เราจึงควรสร้าง **Custom Validator Tag ชื่อ `currency`** ไว้ที่จุดเดียว!"
        },
        {
          "t": "h2",
          "c": "2. แกะไวยากรณ์ Go ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "บรรทัดโค้ดในบทนี้",
            "ทำหน้าที่อะไร?",
            "อธิบายไวยากรณ์ Go"
          ],
          "rows": [
            [
              "if currency, ok := fieldLevel.Field().Interface().(string); ok",
              "แกะค่าที่ผู้ใช้ส่งเข้ามาว่าใช่ `string` หรือไม่",
              "`Interface()` คืนค่าเป็น `interface{}` (กล่องครอบจักรวาล) เราจึงใช้ **Type Assertion `.(string)`** คู่กับตัวแปร `ok` (ถ้าเป็น `string` จริง `ok` จะเป็น `true`)"
            ],
            [
              "if v, ok := binding.Validator.Engine().(*validator.Validate); ok",
              "ดึงตัวตรวจคำขอของ Gin ออกมาเพื่อลงทะเบียนกฎ `currency`",
              "ใช้ Type Assertion `.(*validator.Validate)` เพื่อแปลงตัวแปร Engine กลางของ Gin ให้เป็นตัวแปร Validator ที่เรียก `v.RegisterValidation(...)` ได้"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "3. สร้างไฟล์ util/currency.go และ api/validator.go"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/currency.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/util/currency.go\n// หน้าที่: รวมศูนย์รายชื่อสกุลเงินทั้งหมดที่ระบบธนาคารรองรับ\n// แก้ปัญหา: หากต้องการเพิ่มสกุลเงินใหม่ในอนาคต สามารถเพิ่มที่ไฟล์นี้จุดเดียวได้ทันที\n// =============================================================================\npackage util\n\nconst (\n\tUSD = \"USD\"\n\tEUR = \"EUR\"\n\tTHB = \"THB\"\n)\n\n// IsSupportedCurrency ตรวจสอบว่ารหัสสกุลเงินที่ส่งมาอยู่ในรายการที่ระบบรองรับหรือไม่\nfunc IsSupportedCurrency(currency string) bool {\n\tswitch currency {\n\tcase USD, EUR, THB:\n\t\treturn true\n\t}\n\treturn false\n}"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/validator.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/validator.go\n// หน้าที่: นิยาม Custom Validator สำหรับตรวจสอบ Struct Tag binding:\"currency\"\n// แก้ปัญหา: เชื่อมต่อฟังก์ชัน util.IsSupportedCurrency เข้ากับระบบตรวจคำขอของ Gin\n// =============================================================================\npackage api\n\nimport (\n\t\"github.com/go-playground/validator/v10\"\n\t\"simplebank/util\"\n)\n\n// validCurrency เป็นฟังก์ชันตรวจสอบค่าของฟิลด์ที่ติดแท็ก binding:\"currency\"\nvar validCurrency validator.Func = func(fieldLevel validator.FieldLevel) bool {\n\t// ขั้นตอนที่ 1: ใช้ Type Assertion แกะค่าจากฟิลด์ออกมาเป็น string\n\tif currency, ok := fieldLevel.Field().Interface().(string); ok {\n\t\t// ขั้นตอนที่ 2: ตรวจสอบว่าเป็นสกุลเงินที่รองรับหรือไม่\n\t\treturn util.IsSupportedCurrency(currency)\n\t}\n\treturn false\n}"
        },
        {
          "t": "h2",
          "c": "4. สร้างไฟล์ simplebank/api/transfer.go (Endpoint โอนเงิน)"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/transfer.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/api/transfer.go\n// หน้าที่: HTTP Handler สำหรับคำขอโอนเงิน (POST /transfers) พร้อมตรวจสอบสกุลเงิน\n// แก้ปัญหา: ป้องกันการโอนเงินด้วยยอดติดลบ และป้องกันการโอนเงินข้ามสกุลเงิน\n// =============================================================================\npackage api\n\nimport (\n\t\"database/sql\"\n\t\"fmt\"\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n)\n\n// transferRequest กำหนดโครงสร้าง JSON ขาเข้าสำหรับคำขอโอนเงิน\ntype transferRequest struct {\n\tFromAccountID int64  `json:\"from_account_id\" binding:\"required,min=1\"`\n\tToAccountID   int64  `json:\"to_account_id\" binding:\"required,min=1\"`\n\tAmount        int64  `json:\"amount\" binding:\"required,gt=0\"`         // ต้องมากกว่า 0 เสมอ\n\tCurrency      string `json:\"currency\" binding:\"required,currency\"`   // ใช้ Custom Tag \"currency\"\n}\n\n// createTransfer จัดการคำขอ POST /transfers\nfunc (server *Server) createTransfer(ctx *gin.Context) {\n\t// ขั้นตอนที่ 1: แกะ JSON Body และตรวจเงื่อนไขเบื้องต้น\n\tvar req transferRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\t// ขั้นตอนที่ 2: ตรวจว่าบัญชีต้นทางมีอยู่จริง และมีสกุลเงินตรงกับที่ระบุในคำขอโอน\n\tfromAccount, valid := server.validAccount(ctx, req.FromAccountID, req.Currency)\n\tif !valid {\n\t\treturn\n\t}\n\n\t// ขั้นตอนที่ 3: ตรวจว่าบัญชีปลายทางมีอยู่จริง และมีสกุลเงินตรงกับที่ระบุในคำขอโอน\n\t_, valid = server.validAccount(ctx, req.ToAccountID, req.Currency)\n\tif !valid {\n\t\treturn\n\t}\n\n\t// ขั้นตอนที่ 4: เรียกใช้ TransferTx เพื่อรันธุรกรรมโอนเงิน 5 ขั้นตอนแบบปลอด Deadlock\n\targ := db.TransferTxParams{\n\t\tFromAccountID: fromAccount.ID,\n\t\tToAccountID:   req.ToAccountID,\n\t\tAmount:        req.Amount,\n\t}\n\n\tresult, err := server.store.TransferTx(ctx, arg)\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\t// ขั้นตอนที่ 5: ส่งผลลัพธ์การโอนเงินกลับด้วย HTTP 200 OK\n\tctx.JSON(http.StatusOK, result)\n}\n\n// validAccount ตรวจสอบว่าบัญชีมีตัวตนอยู่จริงและใช้สกุลเงินตรงกับคำขอโอนหรือไม่\nfunc (server *Server) validAccount(ctx *gin.Context, accountID int64, currency string) (db.Account, bool) {\n\t// ขั้นตอนที่ 1: ดึงข้อมูลบัญชีจากฐานข้อมูล\n\taccount, err := server.store.GetAccount(ctx, accountID)\n\tif err != nil {\n\t\tif err == sql.ErrNoRows {\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err))\n\t\t\treturn account, false\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn account, false\n\t}\n\n\t// ขั้นตอนที่ 2: ตรวจว่าสกุลเงินของบัญชีตรงกับสกุลเงินที่จะโอนหรือไม่\n\tif account.Currency != currency {\n\t\terr := fmt.Errorf(\"สกุลเงินของบัญชี [%d] คือ %s ไม่ตรงกับคำขอโอน %s\", accountID, account.Currency, currency)\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn account, false\n\t}\n\n\treturn account, true\n}"
        },
        {
          "t": "h2",
          "c": "5. อัปเดต api/server.go และ api/account.go ให้ใช้ Custom Validator"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "อัปเดต simplebank/api/server.go และ simplebank/api/account.go",
          "c": " // ใน simplebank/api/server.go:\n import (\n \t\"github.com/gin-gonic/gin\"\n+\t\"github.com/gin-gonic/gin/binding\"\n+\t\"github.com/go-playground/validator/v10\"\n \tdb \"simplebank/db\"\n )\n\n func NewServer(store *db.Store) *Server {\n \tserver := &Server{store: store}\n \trouter := gin.Default()\n\n+\t// ลงทะเบียน Custom Validator Tag ชื่อ \"currency\"\n+\tif v, ok := binding.Validator.Engine().(*validator.Validate); ok {\n+\t\tv.RegisterValidation(\"currency\", validCurrency)\n+\t}\n+\n \trouter.POST(\"/accounts\", server.createAccount)\n \trouter.GET(\"/accounts/:id\", server.getAccount)\n \trouter.GET(\"/accounts\", server.listAccounts)\n+\trouter.POST(\"/transfers\", server.createTransfer)\n\n // ใน simplebank/api/account.go:\n type createAccountRequest struct {\n \tOwner    string `json:\"owner\" binding:\"required\"`\n-\tCurrency string `json:\"currency\" binding:\"required,oneof=USD EUR THB\"`\n+\tCurrency string `json:\"currency\" binding:\"required,currency\"`\n }"
        },
        {
          "t": "codeout",
          "lang": "http",
          "label": "ทดสอบยิงโอนเงินข้ามสกุลเงิน (USD โอนเป็น THB) -> ระบบดักจับและตอบ 400 ทันที",
          "code": "POST http://localhost:8080/transfers\nContent-Type: application/json\n\n{\n  \"from_account_id\": 1,\n  \"to_account_id\": 2,\n  \"amount\": 100,\n  \"currency\": \"THB\"\n}",
          "out": "HTTP/1.1 400 Bad Request\nContent-Type: application/json; charset=utf-8\n\n{\n  \"error\": \"สกุลเงินของบัญชี [1] คือ USD ไม่ตรงกับคำขอโอน THB\"\n}"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• ตอนนี้ API ของคุณสามารถสร้างบัญชี, ดึงบัญชี, และโอนเงินพร้อมตรวจสอบสกุลเงินได้อย่างครบถ้วนแล้ว\n• **ช่องโหว่สำคัญที่จะไปปิดในบทถัดไป (บทที่ 7.1 & 7.2)**: ตอนนี้ใครๆ ก็สามารถส่งคำขอสั่งโอนเงินออกจากบัญชีของคนอื่นได้โดยไม่ต้องล็อกอิน! ในหมวดที่ 7 เราจะสร้างระบบสมาชิก (`users`), เข้ารหัสรหัสผ่านด้วย **Bcrypt**, และล็อกทุก Endpoint ด้วย **PASETO Token Middleware** กันครับ!"
        }
      ],
      "en": []
    }
  }
};
