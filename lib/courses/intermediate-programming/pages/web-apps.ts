import type { Page } from "@/lib/types";

const GROUP = "บทที่ 10: สร้างเว็บแอป & API";

export const webAppsPages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "web2-http": {
    slug: "web2-http",
    title: { th: "HTTP เจาะลึก", en: "" },
    lead: { th: "เข้าใจ request/response, methods, status code และหลัก REST — รากฐานของทุก web API", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "ก่อนสร้าง web API เองต้องเข้าใจ HTTP — โพรโทคอลที่เว็บทั้งหมดใช้คุยกัน คุณเคยเรียก API ด้วย requests (บท 8) มาแล้ว หัวข้อนี้เจาะลึกฝั่งทฤษฎีเพื่อให้ออกแบบ API เองได้" },

        { t: "h2", c: "Request / Response" },
        { t: "p", c: "เว็บทำงานแบบ client ส่ง request ไปหา server แล้ว server ตอบ response กลับ แต่ละ request มี method, path, headers และอาจมี body" },
        { t: "code", lang: "text", c: "Request:                          Response:\nGET /users/1 HTTP/1.1             HTTP/1.1 200 OK\nHost: api.example.com            Content-Type: application/json\nAuthorization: Bearer xxx\n                                 {\"id\": 1, \"name\": \"Aph\"}" },

        { t: "h2", c: "HTTP Methods" },
        { t: "p", c: "method บอก \"เจตนา\" ของ request — REST ใช้ method ให้ตรงกับการกระทำกับ resource" },
        {
          t: "table",
          head: ["Method", "ใช้ทำ", "ตัวอย่าง"],
          rows: [
            ["GET", "ดึงข้อมูล", "GET /users (เอารายชื่อ)"],
            ["POST", "สร้างใหม่", "POST /users (เพิ่มผู้ใช้)"],
            ["PUT/PATCH", "แก้ไข", "PUT /users/1"],
            ["DELETE", "ลบ", "DELETE /users/1"],
          ],
        },

        { t: "h2", c: "Status Code" },
        {
          t: "table",
          head: ["ช่วง", "หมายถึง", "ที่เจอบ่อย"],
          rows: [
            ["2xx", "สำเร็จ", "200 OK, 201 Created"],
            ["3xx", "เปลี่ยนเส้นทาง", "301, 304"],
            ["4xx", "ผู้เรียกผิด", "400 Bad Request, 401, 403, 404"],
            ["5xx", "เซิร์ฟเวอร์ผิด", "500 Internal Error"],
          ],
        },

        { t: "h2", c: "หลัก REST" },
        { t: "p", c: "REST คือแนวทางออกแบบ API รอบ \"resource\" (สิ่งของ) แล้วใช้ HTTP method กับมันให้ตรงความหมาย ทำให้ API คาดเดาได้และสม่ำเสมอ" },
        { t: "code", lang: "text", c: "GET    /posts          # เอาโพสต์ทั้งหมด\nGET    /posts/1        # เอาโพสต์ id 1\nPOST   /posts          # สร้างโพสต์ใหม่\nPUT    /posts/1        # แก้โพสต์ 1\nDELETE /posts/1        # ลบโพสต์ 1" },
        { t: "callout", title: "ใช้ method ให้ตรงความหมาย", c: "อย่าใช้ GET สร้าง/ลบข้อมูล (GET ควรอ่านอย่างเดียว ไม่เปลี่ยนแปลงอะไร) การออกแบบ REST ที่ดีทำให้คนอื่นเดา API ของเราถูกโดยไม่ต้องอ่าน doc มาก" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "เว็บ = client ส่ง request → server ตอบ response",
            "method: GET (อ่าน) / POST (สร้าง) / PUT-PATCH (แก้) / DELETE (ลบ)",
            "status: 2xx สำเร็จ, 4xx ผู้เรียกผิด, 5xx server ผิด",
            "REST = ออกแบบรอบ resource + ใช้ method ตรงความหมาย",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) ออกแบบ endpoint ของ blog API (resource posts) ครบ CRUD พร้อม method  2) บอก status code ที่เหมาะกับ: สร้างสำเร็จ / ไม่พบ / ไม่ได้ล็อกอิน  3) อธิบายว่าทำไมไม่ควรใช้ GET ลบข้อมูล  4) ออกแบบ endpoint สำหรับ comment ของแต่ละโพสต์" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: เริ่มกับ FastAPI →", slug: "web2-framework", desc: "สร้าง API ตัวแรกด้วย framework" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "web2-framework": {
    slug: "web2-framework",
    title: { th: "เริ่มกับ FastAPI", en: "" },
    lead: { th: "สร้าง web API ตัวแรกด้วย FastAPI — framework สมัยใหม่ที่ใช้ type hint สร้าง validation + docs ให้", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "framework ช่วยจัดการเรื่อง HTTP, routing, validation ให้เรา ไม่ต้องเขียนเอง FastAPI เป็น framework Python ที่นิยมมาก จุดเด่นคือใช้ type hint (จากบท 2) สร้าง validation และเอกสาร API ให้อัตโนมัติ" },

        { t: "h2", c: "ติดตั้งและ API ตัวแรก" },
        { t: "code", lang: "bash", c: "pip install fastapi uvicorn" },
        { t: "code", lang: "python", c: "# main.py\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get(\"/\")             # ผูก GET / กับฟังก์ชันนี้ (decorator!)\ndef read_root():\n    return {\"message\": \"สวัสดี\"}\n\n@app.get(\"/hello/{name}\")  # path parameter\ndef greet(name: str):\n    return {\"greeting\": f\"สวัสดี {name}\"}" },
        { t: "code", lang: "bash", c: "uvicorn main:app --reload\n# รันที่ http://127.0.0.1:8000\n# เปิด /docs จะเห็นเอกสาร API อัตโนมัติ ลองยิงได้เลย!" },
        { t: "callout", title: "@app.get คือ decorator", c: "สังเกตว่า route ใช้ decorator (จากบท 1) ผูก URL กับฟังก์ชัน — นี่คือตัวอย่างจริงของ decorator ที่เกริ่นไว้ และ type hint name: str ทำให้ FastAPI ตรวจชนิดให้อัตโนมัติ" },

        { t: "h2", c: "auto docs — ของแถมที่ทรงพลัง" },
        { t: "p", c: "FastAPI สร้างหน้า /docs (Swagger UI) ให้อัตโนมัติจากโค้ด — เห็น endpoint ทั้งหมด ลองยิง request ได้จากเบราว์เซอร์ ไม่ต้องเขียน doc เอง" },

        { t: "h2", c: "path parameter" },
        { t: "code", lang: "python", c: "@app.get(\"/users/{user_id}\")\ndef get_user(user_id: int):     # FastAPI แปลงเป็น int ให้ + ตรวจชนิด\n    return {\"user_id\": user_id}\n\n# GET /users/5    -> {\"user_id\": 5}\n# GET /users/abc  -> error 422 อัตโนมัติ (ไม่ใช่ int)" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "pip install fastapi uvicorn; รันด้วย uvicorn main:app --reload",
            "@app.get/post ผูก URL กับฟังก์ชัน (decorator)",
            "type hint ทำให้ FastAPI ตรวจชนิด + สร้าง validation ให้",
            "เปิด /docs เห็นเอกสาร API อัตโนมัติ ลองยิงได้",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง API ที่มี GET / คืนข้อความ  2) เพิ่ม endpoint /hello/{name}  3) เพิ่ม /users/{user_id} ที่รับ int แล้วลองส่ง abc ดู error  4) เปิด /docs แล้วยิง request จากเบราว์เซอร์" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: รับ Request & Validation →", slug: "web2-request", desc: "รับ query/body และตรวจข้อมูลด้วย Pydantic" },
            { title: "← ก่อนหน้า: HTTP เจาะลึก", slug: "web2-http" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "web2-request": {
    slug: "web2-request",
    title: { th: "รับ Request & Validation", en: "" },
    lead: { th: "รับ query parameter และ request body พร้อมตรวจสอบข้อมูลอัตโนมัติด้วย Pydantic", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "API ต้องรับข้อมูลจากผู้เรียก ทั้งผ่าน URL (query) และเนื้อหา request (body) FastAPI ใช้ Pydantic ตรวจสอบข้อมูลให้อัตโนมัติ ทำให้ไม่ต้องเขียน validate เองทุกฟิลด์" },

        { t: "h2", c: "Query parameter" },
        { t: "code", lang: "python", c: "@app.get(\"/search\")\ndef search(q: str, limit: int = 10):   # q จำเป็น, limit มี default\n    return {\"query\": q, \"limit\": limit}\n\n# GET /search?q=python&limit=5\n# -> {\"query\": \"python\", \"limit\": 5}" },

        { t: "h2", c: "Request body ด้วย Pydantic model" },
        { t: "p", c: "สำหรับ POST/PUT เรานิยามรูปแบบข้อมูลด้วย Pydantic model (คล้าย dataclass จากบท 2) FastAPI จะ validate ให้อัตโนมัติว่า body ตรงรูปแบบ" },
        { t: "code", lang: "python", c: "from fastapi import FastAPI\nfrom pydantic import BaseModel, Field\n\napp = FastAPI()\n\nclass UserCreate(BaseModel):\n    name: str\n    age: int = Field(gt=0, lt=150)    # ต้อง 0 < age < 150\n    email: str\n\n@app.post(\"/users\", status_code=201)\ndef create_user(user: UserCreate):    # FastAPI parse + validate ให้\n    return {\"created\": user.name, \"age\": user.age}\n\n# ส่ง body ที่ age=200 -> error 422 อัตโนมัติ (ไม่ผ่าน validation)" },

        { t: "h2", c: "validation อัตโนมัติ + error ชัดเจน" },
        { t: "p", c: "ถ้าข้อมูลไม่ตรงรูปแบบ FastAPI ตอบ 422 พร้อมบอกว่า field ไหนผิดเพราะอะไร — ไม่ต้องเขียน if ตรวจเอง" },
        { t: "code", lang: "text", c: "POST /users  body: {\"name\": \"Aph\", \"age\": 200, \"email\": \"x\"}\n-> 422 Unprocessable Entity\n{\"detail\": [{\"loc\": [\"body\", \"age\"], \"msg\": \"ensure value is less than 150\"}]}" },
        { t: "callout", title: "อย่าเชื่อ input จาก client", c: "นี่คือหลัก defensive programming (บท 2) ในโลกเว็บ — input จากภายนอกเชื่อไม่ได้ ต้อง validate เสมอ Pydantic + FastAPI ทำให้ validation เป็นเรื่องง่ายและประกาศชัดในตัว model" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "query param: รับผ่านพารามิเตอร์ฟังก์ชัน (มี default = optional)",
            "request body: นิยาม Pydantic BaseModel แล้วรับเป็นพารามิเตอร์",
            "Field(gt=, lt=, ...) ใส่กฎ validation; FastAPI ตอบ 422 อัตโนมัติถ้าผิด",
            "เป็น defensive programming ฝั่งเว็บ — validate input เสมอ",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง endpoint /search รับ q และ limit  2) นิยาม Pydantic model สำหรับสร้าง product (name, price>0)  3) สร้าง POST /products ที่ validate ด้วย model  4) ลองส่ง price ติดลบแล้วดู error 422" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: เชื่อม API กับ DB →", slug: "web2-db", desc: "ทำ CRUD API จริงเชื่อมฐานข้อมูล" },
            { title: "← ก่อนหน้า: เริ่มกับ FastAPI", slug: "web2-framework" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "web2-db": {
    slug: "web2-db",
    title: { th: "เชื่อม API กับ DB (CRUD API)", en: "" },
    lead: { th: "ต่อ API เข้ากับฐานข้อมูล (บท 9) ทำ endpoint CRUD ครบ พร้อมแยก layer ให้เทสต์ง่าย", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "API ที่มีประโยชน์จริงต้องเก็บข้อมูลถาวร หัวข้อนี้รวม FastAPI (บทนี้) เข้ากับฐานข้อมูล (บท 9) เป็น CRUD API ที่ใช้งานได้จริง พร้อมแนวคิดการแยก layer ให้โค้ดสะอาดและเทสต์ง่าย" },

        { t: "h2", c: "CRUD API เชื่อม DB" },
        { t: "p", c: "ตัวอย่างย่อ (ใช้ sqlite3 จากบท 9) แต่ละ endpoint map กับการกระทำกับ DB" },
        { t: "code", lang: "python", c: "from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\nimport sqlite3\n\napp = FastAPI()\n\nclass Item(BaseModel):\n    name: str\n    price: float\n\ndef db():\n    conn = sqlite3.connect(\"shop.db\")\n    conn.row_factory = sqlite3.Row   # ให้ผลเป็น dict-like\n    return conn\n\n@app.post(\"/items\", status_code=201)\ndef create_item(item: Item):\n    conn = db()\n    cur = conn.execute(\n        \"INSERT INTO items (name, price) VALUES (?, ?)\",  # ? กัน injection\n        (item.name, item.price),\n    )\n    conn.commit()\n    return {\"id\": cur.lastrowid, **item.model_dump()}\n\n@app.get(\"/items/{item_id}\")\ndef get_item(item_id: int):\n    row = db().execute(\"SELECT * FROM items WHERE id = ?\", (item_id,)).fetchone()\n    if row is None:\n        raise HTTPException(status_code=404, detail=\"ไม่พบสินค้า\")\n    return dict(row)" },

        { t: "h2", c: "HTTPException — ตอบ error ให้ถูก status" },
        { t: "p", c: "เมื่อไม่พบข้อมูลหรือ input ผิด ให้ raise HTTPException พร้อม status code ที่เหมาะ (404, 400) แทนการคืน None เงียบ ๆ" },
        { t: "code", lang: "python", c: "from fastapi import HTTPException\n\nif row is None:\n    raise HTTPException(status_code=404, detail=\"ไม่พบ\")" },

        { t: "h2", c: "แยก layer: route / service / db" },
        { t: "p", c: "อย่ายัด logic ทั้งหมดใน route — แยกเป็นชั้น ทำให้เทสต์และดูแลง่าย (เชื่อม clean code บท 7 + testing บท 6)" },
        {
          t: "ul",
          c: [
            "Route layer — รับ request, ตอบ response (บาง ๆ)",
            "Service layer — business logic (เทสต์ได้โดยไม่ต้องมี HTTP)",
            "DB layer — คุยกับฐานข้อมูล",
          ],
        },
        { t: "callout", title: "แยก logic ออกจาก route = เทสต์ง่าย", c: "ถ้า logic อยู่ใน service ธรรมดา (ไม่ผูกกับ FastAPI) เราเขียน unit test เรียกตรง ๆ ได้โดยไม่ต้องสตาร์ท server — ต่อยอดจากหลัก Dependency Inversion (บท 7) และการเทสต์ (บท 6)" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "CRUD API: map endpoint กับ INSERT/SELECT/UPDATE/DELETE",
            "ใช้ ? placeholder กัน SQL injection เหมือนเดิม",
            "raise HTTPException(404/400) ตอบ error ให้ถูก status",
            "แยก route/service/db layer — เทสต์ service ได้โดยไม่ต้องมี HTTP",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) ทำ CRUD API ของ resource สักตัว (เช่น tasks) เชื่อม sqlite3  2) ใส่ HTTPException 404 เมื่อไม่พบ  3) แยก logic การบันทึกออกเป็นฟังก์ชัน service  4) เขียน unit test ให้ service โดยไม่ต้องสตาร์ท server" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: Authentication →", slug: "web2-auth", desc: "ทำให้แอปรู้ว่าใครเป็นใคร" },
            { title: "← ก่อนหน้า: รับ Request & Validation", slug: "web2-request" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "web2-auth": {
    slug: "web2-auth",
    title: { th: "Authentication", en: "" },
    lead: { th: "ทำให้แอป \"รู้ว่าใครเป็นใคร\" — login, hash รหัสผ่าน, และป้องกัน endpoint ด้วย token", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "แอปจริงเกือบทุกตัวต้องรู้ว่าผู้ใช้คนไหนกำลังเรียก เพื่อแสดงข้อมูลของเขาและจำกัดสิทธิ์ หัวข้อนี้ปูพื้นฐาน authentication: เก็บรหัสผ่านอย่างปลอดภัย, login, และป้องกัน endpoint" },

        { t: "h2", c: "session vs token" },
        {
          t: "table",
          head: ["แบบ", "หลักการ", "เก็บที่"],
          rows: [
            ["Session", "server จำว่าใคร login ผ่าน session id", "server (+cookie)"],
            ["Token (JWT)", "client ถือ token ที่ลงนามไว้ ส่งมาทุก request", "client"],
          ],
        },
        { t: "p", c: "API สมัยใหม่นิยม token (JWT) เพราะ stateless — server ไม่ต้องจำ session แค่ตรวจลายเซ็น token ที่ client ส่งมา" },

        { t: "h2", c: "hash รหัสผ่าน — ห้ามเก็บ plaintext" },
        { t: "p", c: "เก็บรหัสผ่านเป็นข้อความตรง ๆ คือหายนะ ถ้า DB หลุดผู้ใช้ทุกคนซวย ต้อง hash (แปลงทางเดียว) + salt เสมอ — ตอน login เอารหัสที่กรอกมา hash แล้วเทียบ" },
        { t: "code", lang: "python", c: "from passlib.hash import bcrypt   # pip install passlib bcrypt\n\n# ตอนสมัคร: hash ก่อนเก็บ\nhashed = bcrypt.hash(\"my_password\")\nprint(hashed)   # $2b$12$....  (เก็บค่านี้ใน DB ไม่ใช่รหัสจริง)\n\n# ตอน login: ตรวจรหัสที่กรอกกับ hash ที่เก็บไว้\nbcrypt.verify(\"my_password\", hashed)   # True\nbcrypt.verify(\"wrong\", hashed)         # False" },
        { t: "callout", title: "อย่าเก็บรหัสผ่านเป็น plaintext เด็ดขาด", warn: true, c: "ห้ามเก็บรหัสผ่านตรง ๆ และห้าม hash แบบธรรมดา (เช่น md5/sha1 เปล่า ๆ) ใช้ bcrypt/argon2 ที่ออกแบบมาเพื่อรหัสผ่านโดยเฉพาะ (ช้าโดยตั้งใจ + มี salt) นี่คือมาตรฐานขั้นต่ำที่ละเมิดไม่ได้" },

        { t: "h2", c: "login flow & ป้องกัน endpoint" },
        { t: "p", c: "ภาพรวม: ผู้ใช้ส่ง user/pass → server ตรวจ → ออก token → client เก็บ token แล้วแนบใน header ทุก request → server ตรวจ token ก่อนให้เข้า endpoint ที่ป้องกันไว้" },
        { t: "code", lang: "python", c: "from fastapi import FastAPI, Depends, HTTPException\nfrom fastapi.security import OAuth2PasswordBearer\n\napp = FastAPI()\noauth2 = OAuth2PasswordBearer(tokenUrl=\"login\")\n\ndef get_current_user(token: str = Depends(oauth2)):\n    user = verify_token(token)        # ตรวจ/ถอด token\n    if user is None:\n        raise HTTPException(status_code=401, detail=\"ยังไม่ได้ล็อกอิน\")\n    return user\n\n@app.get(\"/me\")\ndef read_me(user = Depends(get_current_user)):   # endpoint ที่ต้อง login\n    return {\"user\": user}" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "authentication = รู้ว่าใครเป็นใคร; API นิยม token (JWT, stateless)",
            "hash รหัสผ่านด้วย bcrypt/argon2 + salt เสมอ — ห้ามเก็บ plaintext",
            "ตอน login เทียบรหัสที่กรอกกับ hash (verify) ไม่ถอดรหัสกลับ",
            "ป้องกัน endpoint ด้วย dependency ที่ตรวจ token (401 ถ้าไม่ผ่าน)",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) เขียนฟังก์ชัน register ที่ hash รหัสผ่านด้วย bcrypt ก่อนเก็บ  2) เขียน login ที่ verify รหัสกับ hash  3) ทำ endpoint /me ที่ต้องมี token  4) อธิบายว่าทำไมห้ามเก็บรหัสผ่านเป็น plaintext" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: Security พื้นฐาน →", slug: "web2-security", desc: "ช่องโหว่ที่เจอบ่อยและวิธีกัน" },
            { title: "← ก่อนหน้า: เชื่อม API กับ DB", slug: "web2-db" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "web2-security": {
    slug: "web2-security",
    title: { th: "Security พื้นฐาน", en: "" },
    lead: { th: "ช่องโหว่ความปลอดภัยที่เจอบ่อย (มากกว่าแค่ SQL injection) และวิธีป้องกัน", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "ทุกแอปที่ออกสู่อินเทอร์เน็ตเป็นเป้าโจมตี การรู้ช่องโหว่ที่เจอบ่อยและวิธีกันเป็นความรับผิดชอบพื้นฐานของคนเขียนโปรแกรม หัวข้อนี้รวมช่องโหว่หลัก ๆ พร้อมหลักคิดที่ใช้ได้ทุกที่" },

        { t: "h2", c: "หลักเดียวที่ครอบทุกอย่าง: อย่าเชื่อ input จากภายนอก" },
        { t: "p", c: "ช่องโหว่ส่วนใหญ่เกิดจากการเชื่อข้อมูลจากผู้ใช้/ภายนอกโดยไม่ตรวจ — ทุกอย่างที่มาจากนอกระบบต้อง validate และจัดการอย่างระมัดระวัง (ต่อยอด defensive programming บท 2)" },

        { t: "h2", c: "SQL Injection (ทบทวน)" },
        { t: "p", c: "ผู้โจมตีแทรกโค้ด SQL ผ่าน input — กันด้วย parameterized query (? placeholder จากบท 9) หรือ ORM อย่าต่อ string เข้า SQL เอง" },
        { t: "code", lang: "python", c: "# ❌ ' OR '1'='1 หลุดเข้ามาได้\ncur.execute(f\"SELECT * FROM users WHERE name = '{name}'\")\n# ✅\ncur.execute(\"SELECT * FROM users WHERE name = ?\", (name,))" },

        { t: "h2", c: "XSS — Cross-Site Scripting" },
        { t: "p", c: "ผู้โจมตีฝัง JavaScript ผ่าน input (เช่น คอมเมนต์) แล้วโค้ดนั้นรันในเบราว์เซอร์ของผู้ใช้คนอื่น — กันด้วยการ escape/sanitize ข้อมูลก่อนแสดงผล" },
        { t: "code", lang: "text", c: "ผู้ใช้พิมพ์คอมเมนต์:  <script>steal_cookie()</script>\n❌ ถ้าแสดงตรง ๆ -> script รันในเบราว์เซอร์คนอื่น\n✅ escape ก่อนแสดง -> แสดงเป็นข้อความธรรมดา ไม่รัน" },

        { t: "h2", c: "ช่องโหว่อื่นที่ควรรู้จัก" },
        {
          t: "table",
          head: ["ช่องโหว่", "คือ", "ป้องกัน"],
          rows: [
            ["CSRF", "หลอกให้ผู้ใช้ส่ง request ที่ไม่ตั้งใจ", "CSRF token, SameSite cookie"],
            ["Secret หลุด", "API key/รหัสใน git", "env vars + .gitignore (บท 4)"],
            ["ไม่ใช้ HTTPS", "ข้อมูลถูกดักระหว่างทาง", "ใช้ HTTPS เสมอ"],
            ["Mass assignment", "แก้ field ที่ไม่ควรแก้ได้", "รับเฉพาะ field ที่อนุญาต"],
          ],
        },
        { t: "callout", title: "อย่า commit secret + ใช้ HTTPS เสมอ", warn: true, c: "สองข้อพลาดที่เจอบ่อยสุด: (1) เผลอ commit API key/รหัสผ่านขึ้น git — ใช้ env vars (บท 4) (2) ส่งข้อมูลผ่าน HTTP ธรรมดาให้ดักได้ — production ต้อง HTTPS เสมอ" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "หลักเดียว: อย่าเชื่อ input จากภายนอก — validate/escape เสมอ",
            "SQL injection: ใช้ ? placeholder / ORM",
            "XSS: escape/sanitize ข้อมูลก่อนแสดงผล",
            "อย่า commit secret (ใช้ env), ใช้ HTTPS, ระวัง CSRF/mass assignment",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) หาช่องโหว่ SQL injection ในโค้ดที่ให้แล้วแก้  2) อธิบายว่า XSS เกิดยังไงและกันยังไง  3) ตรวจโปรเจกต์ตัวเองว่ามี secret หลุดใน git ไหม  4) ยกตัวอย่าง field ที่ไม่ควรให้ผู้ใช้แก้ผ่าน API (mass assignment)" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: ประกอบ API จริง end-to-end →", slug: "web2-project", desc: "รวมทุกอย่างเป็น API ที่รันได้จริง" },
            { title: "← ก่อนหน้า: Authentication", slug: "web2-auth" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "web2-project": {
    slug: "web2-project",
    title: { th: "ประกอบ API จริง end-to-end", en: "" },
    lead: { th: "รวมทุกอย่างในบทนี้เป็น API ที่มีโครงสร้างดี ปลอดภัย และเทสต์ได้ — ตัวอย่างย่อของ capstone", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "หัวข้อนี้รวมทุกชิ้นที่เรียนมา (โครงสร้างโปรเจกต์, validation, DB, auth, security, testing) เป็น API ที่ใช้งานได้จริง — เป็นการซ้อมย่อ ๆ ก่อนทำ capstone เต็มในบทสุดท้าย" },

        { t: "h2", c: "โครงสร้างโปรเจกต์ API" },
        { t: "p", c: "จัด layout ตามบท 4 แยกส่วนชัดเจน" },
        { t: "code", lang: "text", c: "task-api/\n├── README.md\n├── requirements.txt\n├── .env                 # secret (อยู่ใน .gitignore)\n├── src/\n│   └── app/\n│       ├── main.py       # สร้าง FastAPI app + routes\n│       ├── models.py     # Pydantic models\n│       ├── db.py         # เชื่อมฐานข้อมูล\n│       └── auth.py       # authentication\n└── tests/\n    └── test_api.py" },

        { t: "h2", c: "เทสต์ API ด้วย TestClient" },
        { t: "p", c: "FastAPI มี TestClient ให้ยิง request ใส่ app ในเทสต์ได้โดยไม่ต้องสตาร์ท server จริง (เชื่อมบท Testing)" },
        { t: "code", lang: "python", c: "from fastapi.testclient import TestClient\nfrom app.main import app\n\nclient = TestClient(app)\n\ndef test_create_and_get_item():\n    # สร้าง\n    resp = client.post(\"/items\", json={\"name\": \"ปากกา\", \"price\": 15})\n    assert resp.status_code == 201\n    item_id = resp.json()[\"id\"]\n\n    # อ่านกลับ\n    resp = client.get(f\"/items/{item_id}\")\n    assert resp.status_code == 200\n    assert resp.json()[\"name\"] == \"ปากกา\"\n\ndef test_get_missing_item():\n    assert client.get(\"/items/99999\").status_code == 404" },

        { t: "h2", c: "checklist API ที่ดี" },
        {
          t: "ul",
          c: [
            "โครงสร้างแยก layer ชัด (main/models/db/auth) — บท 4, 7",
            "validate input ทุก endpoint ด้วย Pydantic — บท 2",
            "ใช้ ? / ORM กัน SQL injection — บท 9",
            "endpoint ที่ต้องล็อกอินป้องกันด้วย token — auth",
            "secret อยู่ใน env ไม่ commit — บท 4",
            "มีเทสต์ครอบ endpoint หลักด้วย TestClient — บท 6",
          ],
        },
        { t: "callout", title: "นี่คือตัวอย่างย่อของ Capstone", c: "API ตัวนี้รวมแทบทุกบทเข้าด้วยกัน — ในบทสุดท้าย (Capstone) คุณจะทำโปรเจกต์เต็มแบบนี้ตั้งแต่วางแผน เขียน เทสต์ จนถึง deploy" },

        { t: "h2", c: "ภาพรวม deploy" },
        { t: "p", c: "เมื่อ API พร้อม ขั้นต่อไปคือนำขึ้น production (เช่น Railway, Render) ซึ่งจะลงรายละเอียดในบท Capstone" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "API จริง = โครงสร้างแยก layer + validation + DB + auth + security + tests",
            "TestClient ยิง request ใส่ app ในเทสต์โดยไม่ต้องสตาร์ท server",
            "ทุกชิ้นมาจากบทก่อน ๆ — บทนี้คือการประกอบร่าง",
            "เป็นตัวอย่างย่อของ capstone ในบทสุดท้าย",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง task API (CRUD) จัดโครงสร้างแยก layer  2) เพิ่ม validation ด้วย Pydantic ทุก endpoint  3) เขียนเทสต์ด้วย TestClient ครอบ create/get/404  4) ตรวจ checklist API ที่ดีว่าโปรเจกต์ทำครบไหม" },
        {
          t: "links",
          c: [
            { title: "จบบทที่ 10 แล้ว 🎉 — กลับหน้าภาพรวมคอร์ส", slug: "intermediate", desc: "บทที่ 11: Data Structures & Algorithms (บทเด่น ⭐) กำลังจัดทำ" },
            { title: "← ก่อนหน้า: Security พื้นฐาน", slug: "web2-security" },
            { title: "ทบทวน: HTTP เจาะลึก (ต้นบท)", slug: "web2-http" },
          ],
        },
      ],
      en: [],
    },
  },
};
