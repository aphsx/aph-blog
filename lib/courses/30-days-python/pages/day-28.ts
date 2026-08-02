import type { Page } from "@/lib/types";

const IMG =
  "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day28Page: Record<string, Page> = {
  "py30-day28": {
    slug: "py30-day28",
    title: { th: "วันที่ 28 — API", en: "" },
    lead: { th: "เรียนรู้พื้นฐาน API และโปรโตคอล HTTP เพื่อเตรียมพร้อมสร้าง RESTful API ด้วย Python", en: "" },
    group: "สัปดาห์ที่ 6: เว็บ & API",
    blocks: {
      th: [
        {
          t: "image",
          src: `${IMG}/30DaysOfPython_banner3@2x.png`,
          alt: "30 Days of Python banner",
          caption: "30 Days of Python — วันที่ 28: API",
        },
        { t: "h2", c: "Application Programming Interface (API)" },
        { t: "h2", c: "API" },
        {
          t: "p",
          c: "API ย่อมาจาก Application Programming Interface ประเภทของ API ที่เราจะครอบคลุมในส่วนนี้คือ Web APIs ซึ่งเป็น interface ที่กำหนดไว้สำหรับการโต้ตอบระหว่างองค์กรและแอปพลิเคชันที่ใช้ทรัพยากรขององค์กรนั้น ซึ่งยังเป็น Service Level Agreement (SLA) เพื่อระบุ functional provider และเปิดเผย service path หรือ URL สำหรับผู้ใช้ API",
        },
        {
          t: "p",
          c: "ในบริบทของการพัฒนาเว็บ API หมายถึงชุดของ specifications เช่น Hypertext Transfer Protocol (HTTP) request messages พร้อมกับนิยามของโครงสร้าง response messages ซึ่งมักอยู่ในรูปแบบ XML หรือ JavaScript Object Notation (JSON)",
        },
        {
          t: "p",
          c: "Web API ได้ย้ายออกจาก Simple Object Access Protocol (SOAP) based web services และ service-oriented architecture (SOA) มาสู่รูปแบบ representational state transfer (REST) style web resources ที่ตรงไปตรงมากกว่า",
        },
        {
          t: "p",
          c: "บริการ Social media และ Web APIs ช่วยให้ชุมชนเว็บสามารถแชร์เนื้อหาและข้อมูลระหว่างชุมชนและ platform ต่าง ๆ ได้",
        },
        {
          t: "p",
          c: "การใช้ API ทำให้เนื้อหาที่สร้างในที่หนึ่งสามารถ post และอัปเดตไปยังหลาย ๆ ตำแหน่งบนเว็บได้แบบ dynamic",
        },
        {
          t: "p",
          c: "ตัวอย่างเช่น Twitter REST API ช่วยให้นักพัฒนาสามารถเข้าถึงข้อมูลหลักของ Twitter และ Search API ให้เมธอดสำหรับนักพัฒนาในการโต้ตอบกับ Twitter Search และข้อมูล trends",
        },
        {
          t: "p",
          c: "แอปพลิเคชันมากมายมี API endpoints ตัวอย่าง API ได้แก่ countries API และ cat's breed API ในส่วนนี้เราจะครอบคลุม RESTful API ที่ใช้ HTTP request methods เพื่อ GET, PUT, POST และ DELETE ข้อมูล",
        },
        { t: "h2", c: "การสร้าง API" },
        {
          t: "p",
          c: "RESTful API คือ application program interface (API) ที่ใช้ HTTP requests เพื่อ GET, PUT, POST และ DELETE ข้อมูล ในส่วนก่อนหน้านี้เราได้เรียนรู้เกี่ยวกับ Python, Flask และ MongoDB แล้ว เราจะนำความรู้ที่ได้มาพัฒนา RESTful API โดยใช้ Python Flask และฐานข้อมูล MongoDB ทุกแอปพลิเคชันที่มีการทำ CRUD (Create, Read, Update, Delete) จะมี API สำหรับสร้างข้อมูล ดึงข้อมูล อัปเดตข้อมูล หรือลบข้อมูลออกจากฐานข้อมูล",
        },
        {
          t: "p",
          c: "เพื่อสร้าง API ควรเข้าใจ HTTP protocol และวงจร HTTP request และ response",
        },
        { t: "h2", c: "HTTP (Hypertext Transfer Protocol)" },
        {
          t: "p",
          c: "HTTP เป็น communication protocol ที่กำหนดไว้ระหว่าง client และ server โดย client ในกรณีนี้คือ browser และ server คือที่ที่คุณเข้าถึงข้อมูล HTTP เป็น network protocol ที่ใช้ส่ง resources ซึ่งอาจเป็นไฟล์บน World Wide Web ไม่ว่าจะเป็น HTML files, image files, query results, scripts หรือ file types อื่น ๆ",
        },
        {
          t: "p",
          c: "Browser เป็น HTTP client เพราะมันส่ง requests ไปยัง HTTP server (Web server) ซึ่งจะส่ง responses กลับมายัง client",
        },
        { t: "h2", c: "โครงสร้างของ HTTP" },
        {
          t: "p",
          c: "HTTP ใช้ client-server model โดย HTTP client เปิด connection และส่ง request message ไปยัง HTTP server และ HTTP server จะส่ง response message กลับมาซึ่งประกอบด้วย resources ที่ร้องขอ เมื่อวงจร request-response เสร็จสิ้น server จะปิด connection",
        },
        {
          t: "image",
          src: `${IMG}/http_request_response_cycle.png`,
          alt: "HTTP request response cycle",
          caption: "วงจร HTTP request และ response",
        },
        {
          t: "p",
          c: "รูปแบบของ request และ response messages จะคล้ายกัน ทั้งสองประเภทมี:",
        },
        {
          t: "ul",
          c: [
            "บรรทัดเริ่มต้น (initial line)",
            "header lines ศูนย์บรรทัดหรือมากกว่า",
            "บรรทัดว่าง (เช่น CRLF โดยตัวมันเอง)",
            "message body ที่ไม่บังคับ (เช่น ไฟล์ หรือ query data หรือ query output)",
          ],
        },
        {
          t: "p",
          c: "มาดูตัวอย่าง request และ response messages โดยการนำทางไปที่ site: https://thirtydaysofpython-v1-final.herokuapp.com/ site นี้ถูก deploy บน Heroku free dyno และในบางเดือนอาจไม่ทำงานเนื่องจาก request จำนวนมาก สนับสนุนงานนี้เพื่อให้ server ทำงานตลอดเวลา",
        },
        {
          t: "image",
          src: `${IMG}/request_response_header.png`,
          alt: "Request and Response header",
          caption: "ตัวอย่าง Request และ Response header",
        },
        { t: "h2", c: "Initial Request Line (Status Line)" },
        {
          t: "p",
          c: "Initial request line แตกต่างจาก response โดย request line มีสามส่วนคั่นด้วยช่องว่าง:",
        },
        {
          t: "ul",
          c: [
            "ชื่อ method (GET, POST, HEAD)",
            "path ของ resource ที่ร้องขอ",
            "version ของ HTTP ที่ใช้ เช่น GET / HTTP/1.1",
          ],
        },
        {
          t: "p",
          c: "GET เป็น HTTP ที่ใช้บ่อยที่สุดช่วยให้ get หรือ read resource และ POST เป็น request method ทั่วไปสำหรับสร้าง resource",
        },
        { t: "h3", c: "Initial Response Line (Status Line)" },
        {
          t: "p",
          c: "Initial response line ที่เรียกว่า status line ก็มีสามส่วนคั่นด้วยช่องว่างเช่นกัน:",
        },
        {
          t: "ul",
          c: [
            "HTTP version",
            "Response status code ที่แสดงผลลัพธ์ของ request และเหตุผลที่อธิบาย status code เช่น HTTP/1.0 200 OK หรือ HTTP/1.0 404 Not Found",
          ],
        },
        {
          t: "p",
          c: "Status codes ที่พบบ่อยที่สุด:",
        },
        {
          t: "ul",
          c: [
            "200 OK: request สำเร็จ และ resource ที่ได้รับ (เช่น ไฟล์หรือ script output) จะถูกคืนค่าใน message body",
            "500 Server Error",
          ],
        },
        {
          t: "p",
          c: "สามารถดูรายการ HTTP status code ทั้งหมดได้ที่ https://httpstatuses.com/ หรือ https://httpstatusdogs.com/",
        },
        { t: "h3", c: "Header Fields" },
        {
          t: "p",
          c: "จากภาพหน้าจอข้างต้น header lines ให้ข้อมูลเกี่ยวกับ request หรือ response หรือ object ที่ส่งใน message body",
        },
        {
          t: "code",
          lang: "shell",
          c: "GET / HTTP/1.1\nHost: thirtydaysofpython-v1-final.herokuapp.com\nConnection: keep-alive\nPragma: no-cache\nCache-Control: no-cache\nUpgrade-Insecure-Requests: 1\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36\nSec-Fetch-User: ?1\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\nSec-Fetch-Site: same-origin\nSec-Fetch-Mode: navigate\nReferer: https://thirtydaysofpython-v1-final.herokuapp.com/post\nAccept-Encoding: gzip, deflate, br\nAccept-Language: en-GB,en;q=0.9,fi-FI;q=0.8,fi;q=0.7,en-CA;q=0.6,en-US;q=0.5,fr;q=0.4",
        },
        { t: "h3", c: "Message Body" },
        {
          t: "p",
          c: "HTTP message อาจมี data body ที่ส่งหลัง header lines ใน response นี่คือที่ที่ requested resource ถูกคืนค่าไปยัง client (การใช้งาน message body ที่พบบ่อยที่สุด) หรืออาจเป็นข้อความอธิบายถ้ามีข้อผิดพลาด ใน request นี่คือที่ที่ข้อมูลที่ผู้ใช้กรอกหรือไฟล์ที่อัปโหลดถูกส่งไปยัง server",
        },
        {
          t: "p",
          c: "ถ้า HTTP message มี body จะมี header lines ใน message นั้นที่อธิบาย body โดยเฉพาะ:",
        },
        {
          t: "ul",
          c: [
            "Content-Type: header บอก MIME-type ของข้อมูลใน body (text/html, application/json, text/plain, text/css, image/gif)",
            "Content-Length: header บอกจำนวน bytes ใน body",
          ],
        },
        { t: "h3", c: "Request Methods" },
        {
          t: "p",
          c: "GET, POST, PUT และ DELETE คือ HTTP request methods ที่เราจะนำไปใช้ implement API หรือแอปพลิเคชัน CRUD operation",
        },
        {
          t: "ol",
          c: [
            "GET: GET method ใช้เพื่อ retrieve และรับข้อมูลจาก server ที่กำหนดโดยใช้ URI ที่ระบุ Requests ที่ใช้ GET ควร retrieve ข้อมูลเท่านั้นและไม่ควรมีผลกระทบอื่น ๆ ต่อข้อมูล",
            "POST: POST request ใช้เพื่อสร้างข้อมูลและส่งข้อมูลไปยัง server เช่น การสร้าง post ใหม่ การอัปโหลดไฟล์ เป็นต้น โดยใช้ HTML forms",
            "PUT: แทนที่ representation ปัจจุบันทั้งหมดของ target resource ด้วยเนื้อหาที่อัปโหลด และเราใช้มันเพื่อแก้ไขหรืออัปเดตข้อมูล",
            "DELETE: ลบข้อมูล",
          ],
        },
        { t: "h2", c: "แบบฝึกหัด: วันที่ 28" },
        {
          t: "ol",
          c: ["อ่านเกี่ยวกับ API และ HTTP"],
        },
      ],
      en: [],
    },
  },
};
