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
          "c": "1. บทบาทของแพ็กเกจ api และทำไมถึงเลือกใช้ Gin Framework?",
        },
        {
          "t": "p",
          "c": "ตลอดโมดูลที่ 3–5 ที่ผ่านมา เราได้สร้างหัวใจหลักของธนาคารไว้ในโฟลเดอร์ `simplebank/db/` จนครบถ้วน ทั้งฟังก์ชันจัดการบัญชีใน `db/account.go` (`CreateAccount`, `GetAccount`, `ListAccounts`) และฟังก์ชันโอนเงิน 5 ขั้นตอนใน `db/tx_transfer.go` (`TransferTx`)\n\nแต่ฟังก์ชันเหล่านั้นเป็นโค้ดภาษา Go ที่รับส่งค่าเป็น Go Struct และคุยภาษา SQL กับฐานข้อมูลโดยตรง แอปมือถือ เว็บเบราว์เซอร์ หรือโปรแกรมภายนอกยังไม่สามารถสั่งงานฟังก์ชันเหล่านี้ผ่านอินเทอร์เน็ตได้ เราจึงต้องสร้างโฟลเดอร์ใหม่ชื่อ **`simplebank/api/` (`package api`)** ขึ้นมาทำหน้าที่เป็น **ชั้นรับส่งข้อมูลผ่านเว็บ (HTTP Transport Layer)** โดยมีลำดับการทำงานดังนี้:",
        },
        {
          "t": "ol",
          "c": [
            "**รับคำขอและตรวจสอบข้อมูลหน้าด่าน (`api/`)**: เปิดพอร์ต HTTP รอรับข้อมูล JSON หรือพารามิเตอร์จาก URL ที่ลูกค้าส่งเข้ามา แล้วตรวจเช็กว่าข้อมูลครบถ้วนตามกฎหรือไม่",
            "**เรียกใช้ฟังก์ชันฐานข้อมูลเดิม (`db/`)**: เมื่อข้อมูลถูกต้อง ตัว Handler ใน `api/` จะไม่เขียนคำสั่ง SQL เองใหม่ แต่จะ **เรียกใช้เมธอดใน `server.store`** (ซึ่งก็คือฟังก์ชันใน `db/account.go` และ `db/tx_transfer.go` ที่เราเขียนไว้แล้ว) ให้ไปจัดการข้อมูลใน PostgreSQL",
            "**แปลผลลัพธ์กลับเป็น HTTP Response**: นำข้อมูลที่ได้จาก `db/` (หรือ Error ที่เกิดขึ้น) มาแปลงเป็น JSON พร้อมรหัสสถานะมาตรฐาน เช่น `200 OK`, `400 Bad Request`, `404 Not Found` หรือ `500 Internal Server Error` ส่งกลับไปให้ผู้เรียก",
          ],
        },
        {
          "t": "p",
          "c": "ในการสร้างชั้น `api/` นี้ เราเลือกใช้ **Gin Web Framework** ซึ่งเป็นเฟรมเวิร์กอันดับ 1 สำหรับสร้าง REST API ในภาษา Go ด้วยจุดเด่นสำคัญ 3 ข้อ:",
        },
        {
          "t": "ul",
          "c": [
            "**Fast Routing**: ใช้โครงสร้างข้อมูล Radix Tree ในการจับคู่ URL Path ทำให้ค้นหาเส้นทาง API ได้รวดเร็วและใช้หน่วยความจำน้อยมาก",
            "**Powerful JSON Binding & Validation**: แปลงข้อมูลจาก HTTP Request (ทั้ง JSON Body, URL Path, และ Query String) ให้กลายเป็น Go Struct พร้อมตรวจสอบเงื่อนไขความถูกต้องอัตโนมัติด้วยแท็ก `binding:\"...\"`",
            "**High Throughput**: ประสิทธิภาพสูง รองรับคำขอระดับหลายหมื่น Request ต่อวินาทีได้อย่างสบาย",
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
          "c": "2. ออกแบบ Server Struct และผูกเส้นทาง API (api/server.go)",
        },
        {
          "t": "p",
          "c": "เพื่อให้ชั้น `api/` สามารถเรียกใช้งานฟังก์ชันฐานข้อมูลใน `db/` ได้ เราจะออกแบบ `Server` struct ในไฟล์ `simplebank/api/server.go` โดยใช้หลักการ **Dependency Injection (DI)**:\n• **ถ้าไม่ใช้ DI**: ฟังก์ชันสร้าง Server แอบไปเปิดต่อ Database เองข้างในแบบตายตัว ทำให้เวลาเขียน Unit Test เราไม่สามารถสลับฐานข้อมูลจำลองเข้าไปทดสอบได้เลย\n• **การใช้ DI**: คือการ **รับตัวจัดการฐานข้อมูล (`store *db.Store` จาก `db/store.go`) เข้ามาทางพารามิเตอร์ตอนสร้าง `NewServer(store)`** แล้วเก็บไว้ในฟิลด์ `server.store` เพื่อให้ทุกฟังก์ชันของ Server เรียกใช้คำสั่งฐานข้อมูลได้ทันที",
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/api/server.go` เพื่อนิยาม `Server` struct และผูกเส้นทาง URL (Routing) ดังนี้:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/server.go",
          "c": "package api\n\nimport (\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n)\n\ntype Server struct {\n\tstore  *db.Store\n\trouter *gin.Engine\n}\n\nfunc NewServer(store *db.Store) *Server {\n\tserver := &Server{store: store}\n\trouter := gin.Default()\n\n\trouter.POST(\"/accounts\", server.createAccount)\n\trouter.GET(\"/accounts/:id\", server.getAccount)\n\trouter.GET(\"/accounts\", server.listAccounts)\n\n\tserver.router = router\n\treturn server\n}\n\nfunc (server *Server) Start(address string) error {\n\treturn server.router.Run(address)\n}\n\nfunc errorResponse(err error) gin.H {\n\treturn gin.H{\"error\": err.Error()}\n}",
        },
        {
          "t": "ul",
          "c": [
            "**`store *db.Store` ใน `Server`**: เก็บตัวแปร `Store` ที่เรานำเข้ามาจากแพ็กเกจ `simplebank/db` ซึ่งข้างในบรรจุคำสั่ง SQL ทั้งหมดที่เราสร้างไว้ในโมดูลที่ 3 และ 4",
            "**`gin.Default()`**: คำสั่งของ Gin สำหรับสร้างตัวจัดการเส้นทาง (`*gin.Engine`) ที่ติดตั้ง Middleware พื้นฐานมาให้พร้อมสรรพ ทั้งตัวพิมพ์ Log ทุกครั้งที่มีคนยิง API และตัวป้องกันเซิร์ฟเวอร์ดับเมื่อเกิด Panic (Recovery)",
            "**`router.POST(...)` / `router.GET(...)`**: ผูกเส้นทาง URL และ HTTP Method เข้ากับฟังก์ชัน Handler ของเรา (ซึ่งเราจะไปเขียนในไฟล์ `api/account.go` ถัดไป) โดยเครื่องหมาย `:` เช่น `/accounts/:id` คือการบอก Gin ว่าตำแหน่งนี้เป็นพารามิเตอร์บน URL",
            "**`server.router.Run(address)`**: สั่งเปิด HTTP Server เพื่อรอรับคำขอตามพอร์ตที่ระบุ (เช่น `0.0.0.0:8080`)",
            "**`gin.H` ใน `errorResponse`**: `gin.H` คือชนิดข้อมูลทางลัดของ Gin (ย่อมาจาก `map[string]any`) ช่วยให้เราสร้างก้อนข้อมูล JSON สำหรับแจ้งข้อผิดพลาด เช่น `{\"error\": \"...\"}` ได้โดยไม่ต้องประกาศ Struct ใหม่",
          ],
        },
        {
          "t": "h2",
          "c": "3. สร้าง HTTP Handlers สำหรับจัดการบัญชี (api/account.go)",
        },
        {
          "t": "p",
          "c": "ตอนนี้เราจะสร้างไฟล์ `simplebank/api/account.go` เพื่อเขียนฟังก์ชัน Handler ทั้ง 3 ตัว (`createAccount`, `getAccount`, `listAccounts`) ที่เราลงทะเบียนไว้กับ Router ในหัวข้อที่แล้ว โดยแต่ละฟังก์ชันจะทำหน้าที่รับข้อมูลจาก HTTP Request ใน 3 ช่องทางที่ต่างกัน ตรวจสอบความถูกต้อง แล้วส่งต่อไปเรียกฟังก์ชันใน `simplebank/db/account.go` ครับ",
        },
        {
          "t": "p",
          "c": "**ช่องทางที่ 3.1: รับข้อมูลจาก JSON Body (`ShouldBindJSON` + แท็ก `` `json:\"...\"` ``)**\nใช้กับคำสั่ง `POST /accounts` เมื่อลูกค้าส่ง JSON มาขอเปิดบัญชีใหม่:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/account.go (ส่วนที่ 1: เปิดบัญชีใหม่ด้วย ShouldBindJSON)",
          "c": "package api\n\nimport (\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\tdb \"simplebank/db\"\n)\n\ntype createAccountRequest struct {\n\tOwner    string `json:\"owner\" binding:\"required\"`\n\tCurrency string `json:\"currency\" binding:\"required,oneof=USD EUR THB\"`\n}\n\nfunc (server *Server) createAccount(ctx *gin.Context) {\n\tvar req createAccountRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\taccount, err := server.store.CreateAccount(ctx, db.CreateAccountParams{\n\t\tOwner:    req.Owner,\n\t\tBalance:  0,\n\t\tCurrency: req.Currency,\n\t})\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, account)\n}",
        },
        {
          "t": "ul",
          "c": [
            "**`createAccountRequest` และแท็ก `binding:\"...\"`**: โครงสร้างสำหรับกรอง JSON ขาเข้า โดย `binding:\"required\"` บังคับว่าห้ามส่งค่าว่าง ส่วน `oneof=USD EUR THB` (คั่นด้วยช่องว่าง) บังคับว่าสกุลเงินที่ส่งมาต้องตรงกับ 1 ใน 3 ค่านี้เท่านั้น และสังเกตว่า **เราไม่เปิดรับฟิลด์ `Balance` จาก JSON ขาเข้า** เพราะการเปิดบัญชีใหม่ต้องเริ่มต้นที่ยอดเงิน `0` เสมอเพื่อไม่ให้ผู้ใช้นำตัวเลขยอดเงินมาตั้งเอง",
            "**`ctx *gin.Context`**: ตัวแปรหลักของ Gin ที่บรรจุทั้งข้อมูลคำขอขาเข้า (Request) และเมธอดสำหรับส่งคำตอบขาออก (Response) ไว้ในตัวเดียว และเนื่องจาก `*gin.Context` อิมพลีเมนต์ `context.Context` มาตรฐานของ Go ในตัว เราจึงส่ง `ctx` ตัวนี้ต่อไปยังฟังก์ชันฐานข้อมูลได้เลย",
            "**`ctx.ShouldBindJSON(&req)`**: อ่าน JSON Body ขาเข้าแล้วแปลงใส่ตัวแปร `req` (ส่งเป็น Pointer `&req` เพื่อให้เขียนค่าลงในตัวแปรได้) พร้อมตรวจเช็กกฎในแท็ก `binding` ทั้งหมด หากข้อมูลผิดกฎจะคืนค่า `err` และตอบกลับด้วยรหัส `http.StatusBadRequest` (**400 Bad Request** — ข้อมูลจากผู้เรียกไม่ถูกต้อง) แล้ว `return` หยุดทำงานทันที",
            "**`server.store.CreateAccount(ctx, db.CreateAccountParams{...})`**: เมื่อข้อมูลผ่านการตรวจสอบแล้ว Handler จะนำ `req.Owner` และ `req.Currency` (พร้อมกำหนด `Balance: 0`) ส่งต่อไปเรียกฟังก์ชัน `CreateAccount` ที่เราเขียนไว้ในไฟล์ `simplebank/db/account.go` เพื่อรันคำสั่ง `INSERT INTO accounts` ลงฐานข้อมูลจริง หากขั้นตอนนี้เกิด Error (เช่น ฐานข้อมูลล่ม) จะตอบกลับด้วย `http.StatusInternalServerError` (**500 Internal Server Error**)",
            "**`ctx.JSON(http.StatusOK, account)`**: นำข้อมูล `account` ที่ฐานข้อมูลสร้างเสร็จ (ซึ่งมีเลข `id` และเวลา `created_at` ติดกลับมาด้วย) แปลงเป็น JSON ตอบกลับไปพร้อมรหัส `http.StatusOK` (**200 OK**)",
          ],
        },
        {
          "t": "p",
          "c": "**ช่องทางที่ 3.2: รับข้อมูลจาก URL Path (`ShouldBindUri` + แท็ก `` `uri:\"...\"` ``) และ Query String (`ShouldBindQuery` + แท็ก `` `form:\"...\"` ``)**\nเขียนต่อท้ายลงในไฟล์ `simplebank/api/account.go` (พร้อมเพิ่ม `\"database/sql\"` และ `\"errors\"` ใน `import` ด้านบนของไฟล์) เพื่อเชื่อมต่อไปยังฟังก์ชัน `GetAccount` และ `ListAccounts` ของ `db/account.go`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/account.go (ส่วนที่ 2: ดึงบัญชีด้วย ShouldBindUri และ ShouldBindQuery)",
          "c": "type getAccountRequest struct {\n\tID int64 `uri:\"id\" binding:\"required,min=1\"`\n}\n\nfunc (server *Server) getAccount(ctx *gin.Context) {\n\tvar req getAccountRequest\n\tif err := ctx.ShouldBindUri(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\taccount, err := server.store.GetAccount(ctx, req.ID)\n\tif err != nil {\n\t\tif errors.Is(err, sql.ErrNoRows) {\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(err)) // 404 if account not found\n\t\t\treturn\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, account)\n}\n\ntype listAccountsRequest struct {\n\tPageID   int32 `form:\"page_id\" binding:\"required,min=1\"`\n\tPageSize int32 `form:\"page_size\" binding:\"required,min=5,max=10\"`\n}\n\nfunc (server *Server) listAccounts(ctx *gin.Context) {\n\tvar req listAccountsRequest\n\tif err := ctx.ShouldBindQuery(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\taccounts, err := server.store.ListAccounts(ctx, db.ListAccountsParams{\n\t\tOwner:  \"\", // filter by owner (to be filled by auth)\n\t\tLimit:  req.PageSize,\n\t\tOffset: (req.PageID - 1) * req.PageSize,\n\t})\n\tif err != nil {\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, accounts)\n}",
        },
        {
          "t": "ul",
          "c": [
            "**`uri:\"id\" binding:\"required,min=1\"` + `ctx.ShouldBindUri(&req)`**: ดึงค่าจากตัวแปร `:id` บน URL Path (เช่น `/accounts/5`) มาแปลงเป็นตัวเลข `int64` พร้อมบังคับด้วย `min=1` ว่าเลขบัญชีต้องตั้งแต่ 1 ขึ้นไป (ห้ามส่ง 0 หรือเลขติดลบ)",
            "**`errors.Is(err, sql.ErrNoRows)` ใน `getAccount`**: `sql.ErrNoRows` คือตัวแปร Error มาตรฐานของแพ็กเกจ `database/sql` ที่จะถูกส่งออกมาเมื่อเราสั่งคิวรีหาแถวเดียว (`QueryRowContext`) แล้วไม่มีหมายเลขบัญชีนั้นอยู่ในฐานข้อมูล เราจึงดักจับเพื่อตอบกลับเป็น `404 Not Found` (หาบัญชีไม่เจอ) แทนที่จะปล่อยให้กลายเป็น `500 Internal Server Error` (เซิร์ฟเวอร์พัง)",
            "**`form:\"page_id\"` + `ctx.ShouldBindQuery(&req)` และสูตรคำนวณ `Offset`**: ดึงค่าจาก Query String หลังเครื่องหมาย `?` (เช่น `?page_id=2&page_size=5` โดยบังคับขนาดหน้า `min=5,max=10` ไม่ให้ดึงทีละล้านแถวจน DB ค้าง) ส่วนสูตร **`Offset: (req.PageID - 1) * req.PageSize`** คือการคำนวณจำนวนแถวที่ต้องข้ามไป เช่น หน้า 1 ข้าม `(1-1)*5 = 0` แถว, หน้า 2 ข้าม `(2-1)*5 = 5` แถวแรก",
          ],
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
          "c": "4. ประกอบร่างทุกเลเยอร์ใน main.go และทดสอบยิง API",
        },
        {
          "t": "p",
          "c": "ขั้นตอนสุดท้ายคือการนำแพ็กเกจ `db` และแพ็กเกจ `api` มาเชื่อมต่อเข้าด้วยกันที่จุดเริ่มต้นของโปรแกรมในไฟล์ `simplebank/main.go`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/main.go",
          "c": "package main\n\nimport (\n\t\"log\"\n\n\t\"simplebank/api\"\n\t\"simplebank/db\"\n)\n\nconst (\n\tdbSource      = \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\"\n\tserverAddress = \"0.0.0.0:8080\"\n)\n\nfunc main() {\n\tconn, err := db.Open(dbSource)\n\tif err != nil {\n\t\tlog.Fatal(\"cannot connect to db:\", err)\n\t}\n\tdefer conn.Close()\n\n\tstore := db.NewStore(conn)\n\tserver := api.NewServer(store)\n\n\tif err := server.Start(serverAddress); err != nil {\n\t\tlog.Fatal(\"cannot start server:\", err)\n\t}\n}",
        },
        {
          "t": "ul",
          "c": [
            "**`conn, err := db.Open(dbSource)`**: เรียกฟังก์ชันใน `db/db.go` เพื่อเปิดสระสายเชื่อมต่อ (Connection Pool) ไปยัง PostgreSQL",
            "**`store := db.NewStore(conn)`**: สร้างตัวจัดการฐานข้อมูลจาก `db/store.go` ที่รวบรวมคำสั่ง CRUD (`db/account.go`) และระบบโอนเงิน (`db/tx_transfer.go`) ไว้ข้างใน",
            "**`server := api.NewServer(store)` และ `server.Start(...)`**: ส่ง `store` เข้าไปให้ `api/server.go` ถือไว้ใช้งาน แล้วสั่งเปิด HTTP Server รอรับคำขอที่พอร์ต `8080`",
          ],
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
          "c": "เบื้องหลังระบบตรวจเช็กแท็ก `binding:\"...\"` ของ Gin นั้น ใช้ไลบรารีชื่อ **`github.com/go-playground/validator/v10`** เป็นเครื่องยนต์หลักอยู่แล้ว (ถูกดาวน์โหลดติดมาพร้อมกับ Gin ตั้งแต่วันแรก จึงเรียก `import` ได้เลยโดยไม่ต้องสั่ง `go get` เพิ่ม)\n\nสร้างไฟล์ `simplebank/api/validator.go` เพื่อเขียนฟังก์ชันตรวจสอบสกุลเงินตามรูปแบบ `validator.Func`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/validator.go",
          "c": "package api\n\nimport (\n\t\"github.com/go-playground/validator/v10\"\n\t\"simplebank/util\"\n)\n\n// validCurrency validates supported currencies\nvar validCurrency validator.Func = func(fl validator.FieldLevel) bool {\n\tif currency, ok := fl.Field().Interface().(string); ok {\n\t\treturn util.IsSupportedCurrency(currency)\n\t}\n\treturn false\n}",
        },
        {
          "t": "ul",
          "c": [
            "**`fl validator.FieldLevel`**: ตัวแปรที่ `validator/v10` ส่งเข้ามาให้เพื่อใช้ดึงข้อมูลของฟิลด์ที่กำลังถูกตรวจสอบ",
            "**`fl.Field().Interface().(string)`**: ดึงค่าที่ผู้ใช้ส่งเข้ามาแล้วแปลงชนิดข้อมูล (Type Assertion) ให้เป็น `string` หากเป็นข้อความสตริงจริงก็จะส่งต่อไปเช็กใน `util.IsSupportedCurrency(currency)`",
          ],
        },
        {
          "t": "p",
          "c": "จากนั้นในฟังก์ชัน `NewServer` ใน `simplebank/api/server.go` ให้ดึงตัว Validator Engine ของ Gin ออกมาลงทะเบียนกฎชื่อ `\"currency\"` และเพิ่ม Route `POST /transfers`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/server.go (ลงทะเบียน Validator และ Route โอนเงิน)",
          "c": "import (\n\t\"github.com/gin-gonic/gin\"\n\t\"github.com/gin-gonic/gin/binding\"\n\t\"github.com/go-playground/validator/v10\"\n\tdb \"simplebank/db\"\n)\n\nfunc NewServer(store *db.Store) *Server {\n\tserver := &Server{store: store}\n\trouter := gin.Default()\n\n\tif v, ok := binding.Validator.Engine().(*validator.Validate); ok {\n\t\tv.RegisterValidation(\"currency\", validCurrency)\n\t}\n\n\trouter.POST(\"/accounts\", server.createAccount)\n\trouter.GET(\"/accounts/:id\", server.getAccount)\n\trouter.GET(\"/accounts\", server.listAccounts)\n\trouter.POST(\"/transfers\", server.createTransfer)\n\n\tserver.router = router\n\treturn server\n}",
        },
        {
          "t": "ul",
          "c": [
            "**`binding.Validator.Engine().(*validator.Validate)`**: ขอดึงเครื่องยนต์ `validator/v10` ที่ซ่อนอยู่ข้างใน `gin/binding` ออกมา แล้วใช้คำสั่ง **`v.RegisterValidation(\"currency\", validCurrency)`** เพื่อผูกชื่อแท็ก `currency` เข้ากับฟังก์ชัน `validCurrency` ของเรา",
          ],
        },
        {
          "t": "p",
          "c": "และกลับไปอัปเดต `createAccountRequest` ในไฟล์ `simplebank/api/account.go` ให้เปลี่ยนจาก `oneof=USD EUR THB` มาใช้แท็ก `currency` ใหม่ของเราได้เลย:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/api/account.go (อัปเดตแท็กสกุลเงินเป็น currency)",
          "c": "type createAccountRequest struct {\n\tOwner    string `json:\"owner\" binding:\"required\"`\n\tCurrency string `json:\"currency\" binding:\"required,currency\"`\n}",
        },
        {
          "t": "h2",
          "c": "3. สร้าง Endpoint โอนเงิน (transfer.go)",
        },
        {
          "t": "p",
          "c": "ในไฟล์ `simplebank/api/transfer.go` จะทำหน้าที่เป็นด่านหน้า HTTP ที่รับคำสั่งโอนเงินมาตรวจสอบความถูกต้อง 3 ด่านสำคัญ ก่อนส่งต่อไปเรียก **`server.store.TransferTx`** (โค้ด Transaction 5 ขั้นตอนแบบไร้ Deadlock ที่เราสร้างไว้ใน `db/tx_transfer.go` โมดูลที่ 4–5):",
        },
        {
          "t": "ul",
          "c": [
            "**1. ป้องกันการโอนเงินเข้าบัญชีตัวเองด้วย `nefield=FromAccountID`**: ในแท็ก Validation ของ `ToAccountID` เราใส่ `binding:\"required,min=1,nefield=FromAccountID\"` ซึ่งคำว่า **`nefield` (Not Equal Field)** จะบังคับให้ค่าของ `ToAccountID` ต้องไม่ซ้ำกับค่าในฟิลด์ `FromAccountID` ตั้งแต่ด่านหน้าสุดก่อนถึงฐานข้อมูล",
            "**2. ตรวจสอบสกุลเงินของทั้ง 2 บัญชี (`validAccount`)**: ก่อนเรียก `TransferTx` เราเขียนฟังก์ชัน `validAccount` ดึงข้อมูลบัญชีต้นทางและปลายทางมาเช็กว่ามีอยู่จริง และทั้งคู่ใช้สกุลเงินตรงกับที่ระบุมาใน Request (เช่น ห้ามโอนเงิน USD เข้าบัญชี THB ข้ามสกุลโดยตรง)",
            "**3. ดักจับ PostgreSQL Error Code `\"23514\"` ผ่าน `pgconn.PgError` (ของ `pgx/v5`)**: จำกฎเหล็ก `CHECK (balance >= 0)` ในตาราง `accounts` ตอนบทที่ 2 ได้ไหมครับ? หากลูกค้าโอนเงินเกินยอดคงเหลือ PostgreSQL จะตีกลับรหัสข้อผิดพลาดมาตรฐาน SQLSTATE **`23514` (`check_violation`)** แต่เนื่องจากแพ็กเกจกลาง `database/sql` ของ Go ไม่รู้จักโครงสร้างรหัส Error เฉพาะของ PostgreSQL และโปรเจกต์ของเราใช้ไดรเวอร์ **`pgx/v5`** เชื่อมต่อกับ PostgreSQL อยู่เบื้องหลัง ตัว Error ที่ส่งกลับมาจึงถูกห่อมาในชนิด **`*pgconn.PgError`** (จากแพ็กเกจ `github.com/jackc/pgx/v5/pgconn` ที่ติดมาตอนเราลง `pgx/v5`) เราจึงใช้ `errors.As(err, &pgErr)` แกะรหัส `pgErr.Code == \"23514\"` ออกมาเพื่อตอบกลับเป็น `400 Bad Request (เงินในบัญชีไม่พอ)` ได้อย่างแม่นยำ",
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
          "c": "package api\n\nimport (\n\t\"database/sql\"\n\t\"errors\"\n\t\"fmt\"\n\t\"net/http\"\n\n\t\"github.com/gin-gonic/gin\"\n\t\"github.com/jackc/pgx/v5/pgconn\"\n\tdb \"simplebank/db\"\n)\n\ntype transferRequest struct {\n\tFromAccountID int64  `json:\"from_account_id\" binding:\"required,min=1\"`\n\tToAccountID   int64  `json:\"to_account_id\" binding:\"required,min=1,nefield=FromAccountID\"`\n\tAmount        int64  `json:\"amount\" binding:\"required,gt=0\"`\n\tCurrency      string `json:\"currency\" binding:\"required,currency\"`\n}\n\nfunc (server *Server) createTransfer(ctx *gin.Context) {\n\tvar req transferRequest\n\tif err := ctx.ShouldBindJSON(&req); err != nil {\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn\n\t}\n\n\t// 1. Validate sender account and currency\n\tif _, ok := server.validAccount(ctx, req.FromAccountID, req.Currency); !ok {\n\t\treturn\n\t}\n\n\t// 2. Validate receiver account and currency\n\tif _, ok := server.validAccount(ctx, req.ToAccountID, req.Currency); !ok {\n\t\treturn\n\t}\n\n\tresult, err := server.store.TransferTx(ctx, db.TransferTxParams{\n\t\tFromAccountID: req.FromAccountID,\n\t\tToAccountID:   req.ToAccountID,\n\t\tAmount:        req.Amount,\n\t})\n\tif err != nil {\n\t\tvar pgErr *pgconn.PgError\n\t\tif errors.As(err, &pgErr) && pgErr.Code == \"23514\" { // check_violation: insufficient funds\n\t\t\tctx.JSON(http.StatusBadRequest, errorResponse(errors.New(\"เงินในบัญชีไม่พอสำหรับการโอน\")))\n\t\t\treturn\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn\n\t}\n\n\tctx.JSON(http.StatusOK, result)\n}\n\nfunc (server *Server) validAccount(ctx *gin.Context, accountID int64, currency string) (db.Account, bool) {\n\taccount, err := server.store.GetAccount(ctx, accountID)\n\tif err != nil {\n\t\tif errors.Is(err, sql.ErrNoRows) {\n\t\t\tctx.JSON(http.StatusNotFound, errorResponse(fmt.Errorf(\"ไม่พบบัญชีหมายเลข %d\", accountID)))\n\t\t\treturn account, false\n\t\t}\n\t\tctx.JSON(http.StatusInternalServerError, errorResponse(err))\n\t\treturn account, false\n\t}\n\n\tif account.Currency != currency {\n\t\terr := fmt.Errorf(\"สกุลเงินของบัญชี [%d] ไม่ตรงกัน: %s vs %s\", account.ID, account.Currency, currency)\n\t\tctx.JSON(http.StatusBadRequest, errorResponse(err))\n\t\treturn account, false\n\t}\n\treturn account, true\n}",
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
