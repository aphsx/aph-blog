import type { Page } from "@/lib/types";

export const webApiDbPages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "web-how": {
    slug: "web-how",
    title: "เว็บทำงานอย่างไร",
    lead: "Client/Server, HTTP, HTTP methods และ status code — ภาพรวมการสื่อสารเบื้องหลังทุกเว็บที่คุณใช้",
    group: "บทที่ 6: เว็บ, API & ฐานข้อมูล",
    blocks: [
      { t: "p", c: "ถึงตอนนี้คุณเขียนโปรแกรมที่ทำงานในเครื่องเดียวได้แล้ว บทสุดท้ายนี้เชื่อมทุกอย่างเข้ากับโลกจริง: เว็บและแอปทำงานอย่างไร โปรแกรมคุยกันผ่าน API อย่างไร และเก็บข้อมูลถาวรอย่างไร นี่คือพื้นฐานก่อนสร้าง Portfolio project ในส่วน roadmap" },

      { t: "h2", c: "Client และ Server" },
      { t: "p", c: "เมื่อเปิดเว็บ เครื่องของเรา (client) ส่งคำขอ (request) ไปยังเครื่องที่เก็บเว็บนั้น (server) server ประมวลผลแล้วส่งคำตอบ (response) กลับมา client จึงแสดงผลให้เราเห็น การสนทนานี้ใช้โพรโทคอลกลางชื่อ HTTP" },
      {
        t: "ul",
        c: [
          "Client — เครื่องที่ร้องขอ เช่นเบราว์เซอร์หรือแอปมือถือ",
          "Server — เครื่องที่ให้บริการ เก็บข้อมูลและประมวลผล",
          "IP address — เลขที่อยู่ของแต่ละเครื่องบนเครือข่าย",
          "DNS — สมุดที่อยู่ที่แปลงชื่อเว็บ (google.com) เป็น IP",
        ],
      },

      { t: "h2", c: "Frontend และ Backend" },
      { t: "p", c: "งานพัฒนาเว็บแบ่งเป็น 2 ฝั่ง Frontend (สิ่งที่ผู้ใช้เห็นและโต้ตอบ ทำงานในเบราว์เซอร์) และ Backend (เบื้องหลังบน server จัดการข้อมูล ตรรกะ ความปลอดภัย) สองฝั่งคุยกันผ่าน API" },
      {
        t: "table",
        head: ["ภาษา/ฝั่ง", "หน้าที่", "เปรียบเทียบ"],
        rows: [
          ["HTML (frontend)", "โครงสร้างเนื้อหา (หัวข้อ ปุ่ม รูป)", "โครงกระดูก"],
          ["CSS (frontend)", "หน้าตาและการจัดวาง (สี ขนาด)", "เสื้อผ้า"],
          ["JavaScript (frontend)", "การโต้ตอบ (กดปุ่มแล้วเกิดอะไร)", "กล้ามเนื้อ"],
          ["Backend (server)", "ตรรกะ จัดการข้อมูล ความปลอดภัย", "สมองหลังบ้าน"],
        ],
      },

      { t: "h2", c: "HTTP Methods — กริยาของคำขอ" },
      { t: "p", c: "ทุก request มี \"กริยา\" บอกว่าต้องการทำอะไรกับข้อมูล สี่ตัวหลักนี้ตรงกับงาน CRUD (สร้าง อ่าน แก้ ลบ) ที่จะเจอในเรื่องฐานข้อมูล" },
      {
        t: "table",
        head: ["Method", "ใช้ทำ", "ตัวอย่าง"],
        rows: [
          ["GET", "ขอข้อมูล", "ดูรายชื่อสินค้า"],
          ["POST", "สร้างข้อมูลใหม่", "สมัครสมาชิก"],
          ["PUT / PATCH", "แก้ไขข้อมูล", "แก้โปรไฟล์"],
          ["DELETE", "ลบข้อมูล", "ลบโพสต์"],
        ],
      },

      { t: "h2", c: "Status Code — รหัสสถานะของคำตอบ" },
      { t: "p", c: "response ทุกครั้งมีรหัสตัวเลขบอกว่าผลเป็นอย่างไร จำเป็นกลุ่ม ๆ ไว้ก็พอ" },
      {
        t: "table",
        head: ["กลุ่ม", "ความหมาย", "ตัวอย่าง"],
        rows: [
          ["2xx", "สำเร็จ", "200 OK, 201 Created"],
          ["3xx", "เปลี่ยนเส้นทาง", "301 Moved, 302 Found"],
          ["4xx", "ผิดที่ฝั่งผู้ขอ", "400 Bad Request, 401 Unauthorized, 404 Not Found"],
          ["5xx", "ผิดที่ฝั่ง server", "500 Internal Error, 503 Unavailable"],
        ],
      },
      { t: "callout", title: "404 และ 500 ที่คุ้นเคย", c: "เลข 404 Not Found ที่เคยเจอตอนเปิดเว็บไม่เจอ ก็คือ HTTP status code นั่นเอง ส่วน 500 คือ server พังภายใน เมื่อเป็นนักพัฒนา คุณจะใช้ code เหล่านี้บอกว่าปัญหาอยู่ฝั่ง client (4xx) หรือ server (5xx)" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "client ส่ง request, server ตอบ response ผ่านโพรโทคอล HTTP",
          "Frontend (HTML/CSS/JS ในเบราว์เซอร์) + Backend (ตรรกะบน server)",
          "HTTP methods: GET (อ่าน), POST (สร้าง), PUT/PATCH (แก้), DELETE (ลบ)",
          "Status code: 2xx สำเร็จ, 3xx เปลี่ยนเส้นทาง, 4xx ผิดฝั่ง client, 5xx ผิดฝั่ง server",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เปิด DevTools (กด F12) แท็บ Network แล้วโหลดเว็บ ดู request/response และ status code  2) จับคู่งานเหล่านี้กับ HTTP method: ดูโพสต์ / เขียนโพสต์ใหม่ / แก้โพสต์ / ลบโพสต์  3) อธิบายว่า 404 ต่างจาก 500 อย่างไร  4) ลองเข้าเว็บที่ไม่มีอยู่จริงแล้วสังเกต status code" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: API, JSON & REST →", slug: "web-api", desc: "ช่องทางให้โปรแกรมคุยกัน" },
          { title: "← กลับหน้าภาพรวมคอร์ส", slug: "learn" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "web-api": {
    slug: "web-api",
    title: "API, JSON & REST",
    lead: "ช่องทางให้โปรแกรมคุยกัน, รูปแบบข้อมูล JSON และแนวทางออกแบบ REST — พร้อมเรียก API จริงด้วย Python",
    group: "บทที่ 6: เว็บ, API & ฐานข้อมูล",
    blocks: [
      { t: "p", c: "API (Application Programming Interface) คือ \"ช่องทาง\" ให้โปรแกรมคุยและขอข้อมูลกัน เช่นแอปสภาพอากาศเรียก API ของกรมอุตุฯ เพื่อขอข้อมูล หัวข้อนี้สอนรูปแบบข้อมูล JSON แนวทาง REST และวิธีเรียก API จริง" },

      { t: "h2", c: "JSON — รูปแบบข้อมูลมาตรฐาน" },
      { t: "p", c: "JSON (JavaScript Object Notation) คือรูปแบบข้อความที่นิยมใช้ส่งข้อมูลระหว่างโปรแกรม หน้าตาคล้าย dictionary ของ Python มาก จึงเข้าใจได้ทันที" },
      { t: "code", lang: "json", c: "{\n  \"name\": \"Aphisit\",\n  \"age\": 25,\n  \"skills\": [\"Python\", \"SQL\"],\n  \"is_student\": true,\n  \"address\": {\n    \"city\": \"Bangkok\",\n    \"zip\": \"10110\"\n  }\n}" },
      { t: "code", lang: "python", c: "import json\n\n# แปลง JSON (ข้อความ) -> dict ของ Python\ntext = '{\"name\": \"Aphisit\", \"age\": 25}'\ndata = json.loads(text)\nprint(data[\"name\"])     # Aphisit  (ใช้เหมือน dict)\n\n# แปลง dict -> JSON (ข้อความ)\nperson = {\"name\": \"Mali\", \"age\": 22}\nprint(json.dumps(person))  # {\"name\": \"Mali\", \"age\": 22}" },

      { t: "h2", c: "เรียก API จริงด้วย Python" },
      { t: "p", c: "ใช้ไลบรารี requests (ติดตั้งด้วย pip install requests) ลองเรียก API ฟรีที่คืนข้อมูลตัวอย่าง" },
      { t: "code", lang: "python", c: "import requests\n\nres = requests.get(\"https://jsonplaceholder.typicode.com/users/1\")\nprint(res.status_code)      # 200  (สำเร็จ)\n\ndata = res.json()           # แปลง JSON response เป็น dict\nprint(data[\"name\"])         # ชื่อผู้ใช้\nprint(data[\"email\"])        # อีเมล\n\n# ส่งข้อมูลด้วย POST\nnew_post = {\"title\": \"สวัสดี\", \"body\": \"โพสต์แรก\", \"userId\": 1}\nres = requests.post(\"https://jsonplaceholder.typicode.com/posts\",\n                    json=new_post)\nprint(res.status_code)      # 201  (สร้างสำเร็จ)" },

      { t: "h2", c: "REST — แนวทางออกแบบ API ที่นิยมที่สุด" },
      { t: "p", c: "REST เป็นชุดแนวทางการออกแบบ API หลักคือมองทุกอย่างเป็น \"ทรัพยากร\" (resource) เข้าถึงผ่าน URL และใช้ HTTP method สื่อความหมายของการกระทำ ทำให้ API คาดเดาได้และเป็นระเบียบ" },
      {
        t: "table",
        head: ["Method + URL", "ความหมาย"],
        rows: [
          ["GET /users", "ดึงผู้ใช้ทั้งหมด"],
          ["GET /users/1", "ดึงผู้ใช้ id 1"],
          ["POST /users", "สร้างผู้ใช้ใหม่"],
          ["PUT /users/1", "แก้ไขผู้ใช้ id 1"],
          ["DELETE /users/1", "ลบผู้ใช้ id 1"],
        ],
      },
      { t: "callout", title: "สังเกตความเป็นระเบียบ", c: "URL บอก \"ทรัพยากรอะไร\" (users) ส่วน method บอก \"ทำอะไรกับมัน\" (ดู/สร้าง/แก้/ลบ) เมื่อรู้แค่ชื่อทรัพยากร ก็เดา URL ได้ทันที นี่คือเสน่ห์ของ REST รายละเอียดเชิงลึกอยู่ในหน้าพื้นฐานที่ต้องแม่นของส่วนเตรียมสัมภาษณ์" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "API คือช่องทางให้โปรแกรมคุย/ขอข้อมูลกัน",
          "JSON คือรูปแบบข้อมูลมาตรฐาน หน้าตาคล้าย dict — แปลงด้วย json.loads/dumps",
          "เรียก API ด้วย requests.get()/post() แล้วใช้ .json() แปลงผลเป็น dict",
          "REST ใช้ URL ระบุทรัพยากร + HTTP method ระบุการกระทำ ทำให้ API คาดเดาได้",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ใช้ requests เรียก https://jsonplaceholder.typicode.com/todos/1 แล้วพิมพ์ค่า title  2) ดึงรายชื่อผู้ใช้ทั้งหมดจาก /users แล้ววนพิมพ์เฉพาะชื่อ  3) แปลง dict เป็น JSON ด้วย json.dumps  4) ออกแบบ REST endpoint สำหรับระบบบล็อก (ดู/สร้าง/แก้/ลบ โพสต์)" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: ฐานข้อมูล & SQL →", slug: "web-sql", desc: "เก็บข้อมูลถาวรและสั่งงานด้วย SQL" },
          { title: "← เว็บทำงานอย่างไร", slug: "web-how" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "web-sql": {
    slug: "web-sql",
    title: "ฐานข้อมูล & SQL",
    lead: "เก็บข้อมูลถาวรเป็นตาราง และสั่งงานด้วย SQL — SELECT, INSERT, UPDATE, DELETE และพื้นฐานที่ต้องรู้",
    group: "บทที่ 6: เว็บ, API & ฐานข้อมูล",
    blocks: [
      { t: "p", c: "ตัวแปรในโปรแกรมหายไปเมื่อปิดเครื่อง ถ้าต้องการเก็บข้อมูลถาวร (รายชื่อผู้ใช้ คำสั่งซื้อ โพสต์) ต้องใช้ฐานข้อมูล (database) ชนิดที่พบบ่อยที่สุดคือ relational database ที่เก็บข้อมูลเป็นตาราง (เหมือน Excel) และสั่งงานด้วยภาษา SQL" },

      { t: "h2", c: "ข้อมูลเก็บเป็นตาราง" },
      { t: "p", c: "ตารางมีคอลัมน์ (เขตข้อมูล) และแถว (แต่ละรายการ) มักมีคอลัมน์ id เป็นตัวระบุเฉพาะของแต่ละแถว (primary key)" },
      {
        t: "table",
        head: ["id", "name", "age", "city"],
        rows: [
          ["1", "Aphisit", "25", "Bangkok"],
          ["2", "Mali", "22", "Chiang Mai"],
          ["3", "Mochi", "30", "Bangkok"],
        ],
      },

      { t: "h2", c: "CRUD — งานกับข้อมูล 4 อย่าง" },
      { t: "p", c: "การทำงานกับข้อมูลมี 4 อย่างหลักเรียกว่า CRUD: Create, Read, Update, Delete ตรงกับคำสั่ง SQL และ HTTP method ที่เรียนไปแล้ว" },
      {
        t: "table",
        head: ["CRUD", "คำสั่ง SQL", "HTTP method"],
        rows: [
          ["Create (สร้าง)", "INSERT", "POST"],
          ["Read (อ่าน)", "SELECT", "GET"],
          ["Update (แก้)", "UPDATE", "PUT/PATCH"],
          ["Delete (ลบ)", "DELETE", "DELETE"],
        ],
      },

      { t: "h2", c: "SELECT — ดึงข้อมูล (ใช้บ่อยที่สุด)" },
      { t: "code", lang: "sql", c: "SELECT * FROM users;                    -- ทุกคอลัมน์ ทุกแถว\nSELECT name, age FROM users;            -- เฉพาะบางคอลัมน์\nSELECT * FROM users WHERE age > 24;     -- มีเงื่อนไข\nSELECT * FROM users WHERE city = 'Bangkok';\nSELECT * FROM users ORDER BY age DESC;  -- เรียงมากไปน้อย\nSELECT * FROM users LIMIT 10;           -- เอาแค่ 10 แถว\nSELECT COUNT(*) FROM users;             -- นับจำนวนแถว\nSELECT city, COUNT(*) FROM users GROUP BY city;  -- นับตามเมือง" },

      { t: "h2", c: "INSERT, UPDATE, DELETE" },
      { t: "code", lang: "sql", c: "-- CREATE: เพิ่มแถวใหม่\nINSERT INTO users (name, age, city)\nVALUES ('Nim', 28, 'Phuket');\n\n-- UPDATE: แก้ไข (อย่าลืม WHERE ไม่งั้นแก้ทุกแถว!)\nUPDATE users SET age = 26 WHERE name = 'Aphisit';\n\n-- DELETE: ลบ (อย่าลืม WHERE!)\nDELETE FROM users WHERE id = 3;" },
      { t: "callout", title: "อย่าลืม WHERE!", warn: true, c: "UPDATE หรือ DELETE ที่ไม่มี WHERE จะกระทำกับ \"ทุกแถว\" ในตาราง เช่น DELETE FROM users; ลบข้อมูลทั้งหมด เป็นความผิดพลาดร้ายแรงที่เกิดขึ้นจริงในงาน ตรวจ WHERE ทุกครั้งก่อนรัน" },

      { t: "h2", c: "SQL vs NoSQL" },
      { t: "p", c: "ฐานข้อมูลมี 2 ตระกูลใหญ่ มือใหม่แนะนำเริ่มจาก SQL ก่อนเพราะเป็นพื้นฐานที่เกือบทุกที่ต้องใช้" },
      {
        t: "table",
        head: ["", "SQL (Relational)", "NoSQL"],
        rows: [
          ["ตัวอย่าง", "PostgreSQL, MySQL, SQLite", "MongoDB, Redis"],
          ["เก็บเป็น", "ตารางมีโครงสร้างชัด", "เอกสารคล้าย JSON / คู่ key-value"],
          ["เหมาะกับ", "ข้อมูลมีความสัมพันธ์ชัดเจน", "ข้อมูลยืดหยุ่น/โครงสร้างไม่ตายตัว"],
        ],
      },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "ฐานข้อมูลเก็บข้อมูลถาวร — relational database เก็บเป็นตาราง (คอลัมน์ + แถว + id)",
          "CRUD = Create/Read/Update/Delete ตรงกับ INSERT/SELECT/UPDATE/DELETE",
          "SELECT ดึงข้อมูล: WHERE (กรอง), ORDER BY (เรียง), LIMIT, COUNT, GROUP BY",
          "UPDATE/DELETE ต้องมี WHERE เสมอ ไม่งั้นกระทบทุกแถว",
          "SQL เหมาะกับข้อมูลมีโครงสร้าง, NoSQL ยืดหยุ่นกว่า — มือใหม่เริ่มที่ SQL",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน SQL ดึงผู้ใช้ที่อายุมากกว่า 20 เรียงจากมากไปน้อย  2) เขียน SQL นับจำนวนผู้ใช้ในแต่ละเมือง  3) เขียน INSERT เพิ่มผู้ใช้ใหม่  4) เขียน UPDATE แก้เมืองของผู้ใช้ id 2  5) ฝึก SQL ฟรีที่ sqlbolt.com หรือ sql-practice.com" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: ภาพรวม Full-stack →", slug: "web-fullstack", desc: "ชิ้นส่วนทั้งหมดประกอบกันเป็นแอป + ไปต่อที่ไหน" },
          { title: "← API, JSON & REST", slug: "web-api" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "web-fullstack": {
    slug: "web-fullstack",
    title: "ภาพรวม Full-stack & ไปต่อที่ไหน",
    lead: "ชิ้นส่วนทั้งหมด — Frontend + Backend + Database — ประกอบกันเป็นแอปจริงอย่างไร และเส้นทางต่อจากนี้",
    group: "บทที่ 6: เว็บ, API & ฐานข้อมูล",
    blocks: [
      { t: "p", c: "เราเรียนชิ้นส่วนครบแล้ว: เว็บ/HTTP, API/JSON, ฐานข้อมูล/SQL หัวข้อปิดท้ายนี้จะประกอบทุกอย่างเข้าด้วยกันให้เห็นภาพแอปจริง และชี้เส้นทางต่อไปสู่การสมัครงาน" },

      { t: "h2", c: "เกิดอะไรขึ้นเมื่อเปิดแอปหนึ่งครั้ง" },
      { t: "p", c: "ลองนึกถึงตอนกด \"โพสต์\" ในแอปโซเชียล ชิ้นส่วนที่เรียนมาทำงานประสานกันตามนี้" },
      {
        t: "ol",
        c: [
          "ผู้ใช้กดปุ่มบน Frontend (HTML/CSS/JS ในเบราว์เซอร์)",
          "Frontend ส่ง request ผ่าน API ไปยัง Backend (เช่น POST /posts พร้อมข้อมูล JSON)",
          "Backend รับ ตรวจสอบสิทธิ์/ความถูกต้อง แล้วสั่ง SQL บันทึกลงฐานข้อมูล (INSERT)",
          "ฐานข้อมูลบันทึกแล้วตอบกลับ Backend",
          "Backend จัดรูปผลเป็น JSON ส่ง response (status 201) กลับ Frontend",
          "Frontend รับ JSON มาอัปเดตหน้าจอให้ผู้ใช้เห็นโพสต์ใหม่",
        ],
      },
      { t: "callout", title: "Full-stack คืออะไร", c: "นักพัฒนาที่ทำได้ทั้ง Frontend และ Backend เรียกว่า full-stack developer คุณไม่จำเป็นต้องเก่งทุกอย่างเท่ากันตั้งแต่แรก หลายคนเริ่มถนัดด้านหนึ่งก่อน แล้วค่อยขยาย" },

      { t: "h2", c: "Tech Stack แนะนำสำหรับมือใหม่ (2026)" },
      {
        t: "table",
        head: ["ส่วน", "แนะนำเริ่มต้น"],
        rows: [
          ["Frontend", "HTML/CSS/JS → React หรือ Next.js"],
          ["Backend", "Python (FastAPI/Flask) หรือ Node.js (Express)"],
          ["Database", "PostgreSQL หรือ SQLite (ฝึก) + Redis (cache)"],
          ["เครื่องมือ", "Git/GitHub, Docker, Vercel (deploy ฟรี)"],
        ],
      },

      { t: "h2", c: "โปรเจกต์ฝึกมือที่แนะนำ" },
      {
        t: "ul",
        c: [
          "เริ่ม: To-do app (CRUD พื้นฐาน), เครื่องคิดเลข, แอปดูสภาพอากาศ (เรียก API)",
          "กลาง: บล็อก/CMS ง่าย ๆ (frontend + backend + database), ระบบสมาชิก (login)",
          "ต่อยอด: REST API พร้อม authentication, แอป AI เรียก LLM",
        ],
      },

      { t: "h2", c: "สรุปบทที่ 6 และจบคอร์ส" },
      {
        t: "ul",
        c: [
          "Frontend + Backend + Database ประกอบกันเป็นแอปเต็มรูปแบบ",
          "การกดปุ่มหนึ่งครั้ง = request → backend → SQL → database → response → แสดงผล",
          "full-stack คือทำได้ทั้งสองฝั่ง — เริ่มถนัดด้านหนึ่งก่อนได้",
          "ฝึกด้วยโปรเจกต์จริงตั้งแต่เล็กไปใหญ่ คือวิธีเรียนรู้ที่ดีที่สุด",
        ],
      },
      { t: "callout", title: "🎉 จบคอร์สเรียนจากศูนย์แล้ว!", warn: false, c: "คุณได้พื้นฐานครบทั้ง 6 บท: CS เบื้องต้น → เขียนโปรแกรม → โครงสร้างข้อมูล → อัลกอริทึม → OOP → เว็บ/API/DB ถึงเวลาต่อยอดสู่การเตรียมสมัครงานจริง ทำโปรเจกต์ ฝึกโจทย์ และสร้าง Portfolio" },
      {
        t: "links",
        c: [
          { title: "ไปต่อ: พื้นฐานที่ต้องแม่น (Git, REST, SQL เชิงลึก)", slug: "fundamentals", desc: "เครื่องมือและพื้นฐานที่นักพัฒนาทุกคนต้องใช้ในงานจริง" },
          { title: "เริ่มเตรียม Coding Interview", slug: "interview-formats", desc: "รูปแบบการสัมภาษณ์ ฝึก LeetCode และเทคนิคแก้โจทย์" },
          { title: "สร้าง Portfolio & Projects", slug: "portfolio", desc: "นำพื้นฐานทั้งหมดมาสร้างผลงานจริงเพื่อสมัครงาน" },
          { title: "← ฐานข้อมูล & SQL", slug: "web-sql" },
        ],
      },
    ],
  },
};
