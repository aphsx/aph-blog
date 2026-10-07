import type { Page } from "@/lib/types";

export const introPages: Record<string, Page> = {
  "bank-overview": {
    slug: "bank-overview",
    title: {
      th: "ภาพรวมระบบ Simple Bank & สถาปัตยกรรมระบบการเงิน",
      en: "Simple Bank Architecture & System Overview",
    },
    lead: {
      th: "ทำไมโปรเจกต์ธนาคารจำลอง (Simple Bank) ถึงเป็นข้อสอบวัดกึ๋นของ Backend Engineer ระดับสากล — เจาะลึกโจทย์ปัญหา Data Consistency, ACID, และ Concurrency ที่ระบบจริงต้องเจอ",
      en: "Why building a Bank Simulation is the ultimate test for Backend Engineers — mastering Data Consistency, ACID, and Concurrency in Go.",
    },
    group: "1. บทนำ & รากฐาน",
    blocks: {
      th: [
        {
          t: "p",
          c: "เวลาที่เราสร้างเว็บทั่วไป เช่น บล็อก, โซเชียลมีเดีย หรือเว็บบอร์ด ถ้ามีบั๊กเล็กๆ โผล่มา เช่น จำนวนไลก์นับเกินไป 1 ครั้ง หรือคอมเมนต์แสดงผลสลับลำดับ ผู้ใช้อาจจะไม่สังเกตเห็น หรืออย่างมากก็แค่กดรีเฟรชหน้าจอ",
        },
        {
          t: "callout",
          title: "แต่ในระบบการเงิน (Financial System)... ผิดแม้แต่สตางค์เดียวไม่ได้!",
          c: "ถ้ามีบั๊กที่ทำให้ผู้ใช้กดถอนเงิน 1,000 บาทพร้อมกันสองครั้ง แล้วเงินในบัญชีถูกตัดไปแค่ 1,000 บาท แต่ได้เงินสดออกมา 2,000 บาท (Double Spending) ธนาคารจะขาดทุนทันที หรือถ้าเงินถูกหักจากบัญชีต้นทางแล้วระบบล่มก่อนจะเข้าบัญชีปลายทาง เงินของลูกค้าจะหายไปในอากาศ ความน่าเชื่อถือของธุรกิจจะพังทลายทันที",
          warn: true,
        },
        {
          t: "p",
          c: "ด้วยเหตุนี้ บริษัทเทคโนโลยีชั้นนำระดับโลก จึงนิยมใช้โจทย์ **ระบบธนาคาร (Bank Simulation)** ในการสัมภาษณ์งาน เพื่อดูว่าผู้สมัครเข้าใจเรื่อง **Data Consistency (ความถูกต้องของข้อมูล)**, **Database Locking (การล็อกแถวข้อมูล)**, และ **Concurrency Control (การควบคุมคำสั่งที่ยิงเข้ามาพร้อมกัน)** อย่างแท้จริงหรือไม่",
        },

        { t: "h2", c: "สถาปัตยกรรมของ Simple Bank (System Architecture)" },
        {
          t: "p",
          c: "ระบบที่เราจะสร้างขึ้นมาในคอร์สนี้ถูกออกแบบตามมาตรฐาน Clean Backend Architecture แบ่งออกเป็น 3 เลเยอร์หลักที่ทำงานร่วมกันอย่างเป็นเอกเทศ:",
        },
        {
          t: "table",
          head: ["เลเยอร์ (Layer)", "เทคโนโลยีที่ใช้", "หน้าที่และความรับผิดชอบ"],
          rows: [
            [
              "1. API Transport Layer",
              "Go + Gin Framework",
              "รับ HTTP Request (JSON), ตรวจสอบความถูกต้องของ Input (Validation), ตรวจสอบสิทธิ์ด้วย Token (PASETO/JWT), และตอบกลับเป็น JSON Response พร้อม HTTP Status Code ที่ถูกต้อง",
            ],
            [
              "2. Business Logic & Store Layer",
              "Go Store Engine",
              "ควบคุมกฎเกณฑ์ทางธุรกิจ เช่น ตรวจสอบยอดเงิน, ตรวจสอบสกุลเงิน, บริหารจัดการ Database Transaction (BEGIN / COMMIT / ROLLBACK), และจัดการลำดับการล็อกเพื่อป้องกัน Deadlock",
            ],
            [
              "3. Database Storage Layer",
              "PostgreSQL",
              "จัดเก็บข้อมูลแบบ Relational Database ด้วยระบบ Double-Entry Ledger (บัญชีแยกประเภท), บังคับ Foreign Key Constraints, และรองรับ ACID Transaction พร้อม Row-Level Locks",
            ],
          ],
        },

        { t: "h2", c: "3 ภัยพิบัติคลาสสิกที่ระบบธนาคารต้องเอาชนะ" },
        {
          t: "p",
          c: "ก่อนที่เราจะเริ่มเขียนโค้ด เราต้องเข้าใจก่อนว่าศัตรูตัวร้ายของวิศวกรซอฟต์แวร์สาย Backend คืออะไร ทำไมการเขียนคำสั่ง SQL ทั่วไปถึงไม่เพียงพอ:",
        },
        {
          t: "ol",
          c: [
            "**Race Condition & Double Spending (การใช้เงินซ้ำซ้อน):** สมมติว่านาย A มีเงิน 1,000 บาท เขากดยิงคำสั่งโอนเงิน 1,000 บาทพร้อมกัน 2 ครั้งในเสี้ยววินาทีเดียวกัน ถ้าเซิร์ฟเวอร์อ่านยอดเงินพร้อมกันทั้งสองคำสั่ง มันจะเห็นว่ามีเงิน 1,000 บาททั้งคู่ และยอมให้เงินออกทั้งสองยอด กลายเป็นว่าถอนได้ 2,000 บาททั้งที่มีเงินแค่ 1,000 บาท!",
            "**Partial Failure (เงินหายระหว่างทาง):** การโอนเงินประกอบด้วย 2 ส่วนเสมอ คือ 'หักเงินจากผู้โอน' และ 'เพิ่มเงินให้ผู้รับ' หากเซิร์ฟเวอร์หักเงินผู้โอนสำเร็จ แต่เกิดไฟดับหรือเน็ตเวิร์กขาดก่อนจะเพิ่มเงินให้ผู้รับ เงินจำนวนนั้นจะสาบสูญไปทันที",
            "**Deadlock Freeze (ระบบล็อกค้าง):** เมื่อนาย A พยายามโอนเงินให้นาย B ในจังหวะเดียวกับที่นาย B พยายามโอนเงินให้นาย A หากคำสั่งแรกทำการล็อกบัญชี A แล้วรอจะล็อกบัญชี B ส่วนคำสั่งที่สองทำการล็อกบัญชี B แล้วรอจะล็อกบัญชี A ทั้งสองคำสั่งจะติดกับดักรอซึ่งกันและกันชั่วกาลนาน เซิร์ฟเวอร์จะค้างและระบบฐานข้อมูลจะแครช!",
          ],
        },
        {
          t: "codeout",
          lang: "text",
          label: "ตัวอย่าง Terminal Log จำลองหายนะ Double Spending บนเซิร์ฟเวอร์จริง",
          code: `[API Gateway] 10:00:00.100 POST /transfers - From: Acc 1 (Bob), Amount: 1,000 THB -> Worker #1
[API Gateway] 10:00:00.101 POST /transfers - From: Acc 1 (Bob), Amount: 1,000 THB -> Worker #2
[Worker #1] SELECT balance FROM accounts WHERE id = 1 -> ได้ 1,000 THB (อนุมัติโอน)
[Worker #2] SELECT balance FROM accounts WHERE id = 1 -> ได้ 1,000 THB (Stale Read! ยังไม่อัปเดต)
[Worker #1] UPDATE accounts SET balance = 0 WHERE id = 1 -> โอนออกสำเร็จ 1,000 THB
[Worker #2] UPDATE accounts SET balance = 0 WHERE id = 1 -> โอนออกสำเร็จ 1,000 THB`,
          out: `[FATAL ALERT] ตรวจพบ Double Spending ในระบบ!
ยอดเงินตั้งต้น: 1,000 THB
ยอดเงินที่ถูกตัดออกจริง: 2,000 THB (เงินงอกเกินจริงไป 1,000 THB!)
สถานะเงินในระบบ: ยอดเงินรวมของธนาคารติดลบ ขาดทุนทันที`,
        },

        { t: "h2", c: "เส้นทางและสิ่งที่คุณจะได้ลงมือสร้างจริง" },
        {
          t: "p",
          c: "ตลอดทั้งคอร์สนี้ คุณจะไม่ได้แค่ท่องทฤษฎี แต่จะเขียนโค้ด Go และ SQL ด้วยมือตัวเองทุกบรรทัด โดยมีขั้นตอนดังนี้:",
        },
        {
          t: "ul",
          c: [
            "**ออกแบบ Database Schema:** สร้างตาราง accounts, entries, และ transfers ด้วยหลักการ Double-Entry Ledger",
            "**ควบคุมเวอร์ชันด้วย Migration:** ใช้เครื่องมือ `golang-migrate` คู่กับ Docker จัดการโครงสร้างฐานข้อมูลแบบมืออาชีพ",
            "**เขียน Data Access Layer:** จัดการเชื่อมต่อ PostgreSQL ผ่าน Raw SQL และ Connection Pool",
            "**ทำ ACID Transaction:** ห่อหุ้ม 5 สเต็ปของการโอนเงินไว้ใน 1 Transaction เดียวกัน",
            "**แก้ปัญหา Race Condition ด้วย Row Lock:** ใช้ `SELECT ... FOR UPDATE` เพื่อล็อกแถวบัญชี",
            "**ปลดล็อก Deadlock ด้วย Resource Ordering:** ใช้วิธีจัดเรียง Account ID ก่อนทำการล็อกแถวเสมอ",
            "**เขียน Automated Concurrency Test:** ใช้ Goroutines ยิงถล่มโอนเงินพร้อมกัน 10-100 รายการ เพื่อทดสอบความทนทาน",
            "**สร้าง RESTful Web API ด้วย Gin:** เขียน Endpoint รองรับการทำงานจริง พร้อมระบบ Data Validation",
            "**เสริมเกราะความปลอดภัย:** ทำระบบสมัครสมาชิก แฮชรหัสผ่านด้วย Bcrypt และทำ Authentication ด้วย PASETO Token",
            "**Deploy บน Docker:** เขียน Multi-Stage Dockerfile เพื่อย่อขนาด Container ให้พร้อมรันบน Cloud",
          ],
        },

        {
          t: "callout",
          title: "💡 สไตล์การสอนของคอร์สนี้",
          c: "บทถัดไปเริ่มภาษา Go จากศูนย์ ไม่ต้องเคยเขียนมาก่อน เราจะแปลคำที่เจอซ้ำทั้งคอร์สให้ก่อน โดยเฉพาะ `_, err`, struct, interface และการฝัง struct ซึ่งไม่ใช่ inheritance แล้วค่อยเอาของพวกนี้ไปใช้ในโค้ดธนาคารทีละจุด",
        },
        { t: "h2", c: "สารบัญและบทเรียนทั้งหมด" },
        {
          t: "links",
          c: [
            {
              title: "1. Go จากศูนย์สำหรับระบบ Backend →",
              slug: "bank-go-backend-primer",
              desc: "อ่านไฟล์ Go, `_, err`, struct และเหตุผลที่ Go ไม่มี inheritance ก่อนแตะธนาคาร",
            },
            {
              title: "2. ออกแบบ Schema & สมุดบัญชีแยกประเภท →",
              slug: "bank-schema-design",
              desc: "หลักการ Double-Entry Ledger, ตาราง accounts, entries, transfers และทำไมห้ามใช้ float เก็บเงิน",
            },
            {
              title: "3. จัดการ Database Migration & Docker →",
              slug: "bank-db-migration",
              desc: "รัน PostgreSQL ด้วย Docker และคุมเวอร์ชันฐานข้อมูลด้วย golang-migrate",
            },
            {
              title: "4. Data Store & การเขียน Raw SQL CRUD →",
              slug: "bank-db-store-crud",
              desc: "เชื่อมต่อ database/sql, Connection Pool, DBTX Interface และ CRUD สำหรับ Account",
            },
            {
              title: "5. กลไก ACID & Transaction Manager →",
              slug: "bank-acid-and-tx",
              desc: "เจาะลึก 4 คุณสมบัติ ACID และสร้าง Store.execTx พร้อมระบบ Auto Rollback ใน Go",
            },
            {
              title: "6. โค้ดระบบโอนเงิน 5 ขั้นตอน (TransferTx) →",
              slug: "bank-money-transfer-logic",
              desc: "ร้อยเรียง 5 ขั้นตอนของการโอนเงินใน 1 Transaction พร้อมส่งผลลัพธ์ใหม่กลับให้ผู้ใช้",
            },
            {
              title: "7. Race Condition & Row Locking (SELECT FOR UPDATE) →",
              slug: "bank-concurrency-race-condition",
              desc: "ดักจับเงินงอกจาก Stale Read และการใช้ FOR NO KEY UPDATE ใน PostgreSQL",
            },
            {
              title: "8. ไขปริศนา Deadlock & แก้ด้วย Resource Ordering →",
              slug: "bank-deadlock-prevention",
              desc: "วิเคราะห์การโอนเงินสวนทาง และพิสูจน์วิธีแก้ Deadlock ด้วยการจัดลำดับ Account ID",
            },
            {
              title: "9. Unit Test ระบบธนาคารด้วย Testify →",
              slug: "bank-unit-testing",
              desc: "เขียน Test ครอบคลุม CRUD ด้วย testify/require และ Random Data Generators",
            },
            {
              title: "10. ทดสอบ Concurrency & Deadlock ด้วย Goroutines →",
              slug: "bank-concurrency-testing",
              desc: "ปล่อย Goroutines ยิงโอนเงินคู่ขนาน พิสูจน์ Consistency และรัน go test -race",
            },
            {
              title: "11. สร้าง REST API Server ด้วย Gin Framework →",
              slug: "bank-rest-api-gin",
              desc: "วาง Clean Architecture, HTTP Handlers, Status Codes และ JSON Error Responses",
            },
            {
              title: "12. Data Validation & ป้องกันโอนข้ามสกุลเงิน →",
              slug: "bank-api-validation",
              desc: "เขียน Custom Validator ใน Gin และกฎ Currency-Matching ป้องกันเงินเพี้ยน",
            },
            {
              title: "13. ระบบผู้ใช้งาน & แฮชรหัสผ่านด้วย Bcrypt →",
              slug: "bank-user-auth-bcrypt",
              desc: "ตาราง users, ความปลอดภัยของ Slow Hashing และการซ่อน hashed_password ใน API",
            },
            {
              title: "14. ระบบยืนยันตัวตนด้วย PASETO Token & Middleware →",
              slug: "bank-jwt-paseto-token",
              desc: "ทำไม PASETO ถึงปลอดภัยกว่า JWT พร้อมสร้าง Gin Auth Middleware ป้องกันการสวมรอย",
            },
            {
              title: "15. จัดการ Config ด้วย Viper, Docker & Production Checklist →",
              slug: "bank-config-docker-prod",
              desc: "รวมศูนย์ Config ด้วย Viper, Multi-Stage Dockerfile ย่อเหลือ 20MB, Docker Compose และ Production Checklist สำหรับระบบจริง",
            },
            {
              title: "16. เจาะลึกคำถามสัมภาษณ์ & สถาปัตยกรรมระดับสูง →",
              slug: "bank-interview-system-design",
              desc: "รวม 10 คำถามสัมภาษณ์ยอดฮิต, Idempotency, Saga Pattern, Hot Accounts และ System Design สเกลล้านผู้ใช้",
            },
          ],
        },
      ],
      en: [],
    },
  },

  "bank-go-backend-primer": {
    slug: "bank-go-backend-primer",
    title: {
      th: "Go จากศูนย์สำหรับระบบ Backend",
      en: "Go from Zero for Backend Systems",
    },
    lead: {
      th: "ยังไม่เคยเขียน Go ก็เริ่มบทนี้ได้: อ่านไฟล์ทีละคำ, ฟังก์ชันที่คืนค่าคู่กับ error, ขีดล่างใน `_, err` คืออะไร, และทำไม Go ไม่มี inheritance",
      en: "Go from zero: how to read a file, why functions return a value plus error, what the blank identifier in `_, err` means, and why Go has no class inheritance.",
    },
    group: "1. บทนำ & รากฐาน",
    blocks: {
      th: [
        {
          t: "p",
          c: "บทนี้สมมติว่าคุณยังไม่เคยเขียน Go เป้าหมายไม่ใช่ท่องไวยากรณ์ทั้งภาษา แต่ให้อ่านโค้ดธนาคารในบทถัดไปแล้วรู้ว่าแต่ละคำแปลว่าอะไร ตัวอย่างทุกก้อนด้านล่างรันได้จริง และผลในกล่อง Output คือสิ่งที่โปรแกรมพิมพ์ออกมา",
        },
        {
          t: "table",
          head: ["คำที่เจอทั้งคอร์ส", "แปลสั้น ๆ", "หน้าตาในโค้ด"],
          rows: [
            ["package / import / func", "แฟ้มนี้ชื่ออะไร, ดึงเครื่องมืออะไรมาใช้, และก้อนคำสั่งชื่ออะไร", "package db"],
            ["name := value", "สร้างตัวแปรชื่อ name แล้วใส่ค่าให้ทันที", "balance := 1000"],
            ["(int64, error)", "ฟังก์ชันคืนค่าได้สองตัว พร้อมกัน", "func Withdraw(...) (int64, error)"],
            ["err และ nil", "err คือกล่องรายงานปัญหา nil แปลว่าไม่มีปัญหา", "if err != nil"],
            ["_", "ถังขยะ รับค่ามาแล้วทิ้ง เพราะ Go บังคับให้รับทุกค่าที่ฟังก์ชันคืน", "_, err :="],
            ["struct", "กล่องข้อมูล มีชื่อฟิลด์ ไม่ใช่คลาส", "type Account struct"],
            ["interface", "สัญญาว่าต้องมีเมธอดชุดนี้ ไม่ใช่คลาสแม่", "type Maker interface"],
            ["embedding", "วาง struct ซ้อนใน struct เมธอดของข้างในถูกยกขึ้นมาเรียกได้ ไม่ใช่การสืบทอด", "type Store struct { *Queries }"],
          ],
        },

        { t: "h2", c: "1. อ่านไฟล์ Go ทีละคำ" },
        {
          t: "p",
          c: "ไฟล์ Go ทุกไฟล์เริ่มด้วยชื่อแพ็กเกจ แล้วตามด้วยของที่ดึงมาใช้ แล้วตามด้วยฟังก์ชัน โปรแกรมเล็ก ๆ ที่รันเองได้ต้องมี `package main` และฟังก์ชันชื่อ `main` เครื่องหมาย `:=` อ่านว่า \"สร้างตัวแปรนี้แล้วใส่ค่า\" Go จะเดาชนิดข้อมูลจากค่าที่ใส่ให้",
        },
        {
          t: "codeout",
          lang: "go",
          label: "read_a_file.go",
          code: `package main

import "fmt"

func main() {
	owner := "Alice" // string สร้างใหม่ชื่อ owner
	balance := 1000  // int สร้างใหม่ชื่อ balance
	fmt.Println(owner, "มียอด", balance, "บาท")
}`,
          out: `Alice มียอด 1000 บาท`,
        },
        {
          t: "ul",
          c: [
            "**`package main`**: บอกว่าไฟล์นี้อยู่ในแพ็กเกจ `main` ไฟล์ในโฟลเดอร์เดียวกันต้องใช้ชื่อแพ็กเกจเดียวกัน ในโปรเจกต์ธนาคารจะเห็น `package db` และ `package api` แทน",
            "**`import \"fmt\"`**: ดึงแพ็กเกจ `fmt` มาใช้พิมพ์ข้อความ ถ้า import แล้วไม่ใช้ โปรแกรมคอมไพล์ไม่ผ่าน",
            "**`func main()`**: จุดเริ่มของโปรแกรม `func` คือคำประกาศฟังก์ชัน",
            "**`:=`**: สร้างตัวแปรครั้งแรก ครั้งถัดไปที่เปลี่ยนค่าตัวเดิมใช้ `=` ตัวเดียว เช่น `balance = 500`",
            "**ชนิดที่ใช้กับเงินในคอร์สนี้**: `int64` คือจำนวนเต็ม 64 บิต เราเก็บเงินเป็นสตางค์ใน `int64` ไม่ใช้ทศนิยม `string` คือข้อความ",
          ],
        },

        { t: "h2", c: "2. ฟังก์ชันคืนได้สองค่า และ `_, err` คืออะไร" },
        {
          t: "p",
          c: "Go ไม่มี `try/catch` ฟังก์ชันที่อาจพังจะคืนค่าผลลัพธ์ตัวหนึ่ง คู่กับค่า `error` อีกตัว ถ้าสำเร็จ `error` จะเป็น `nil` (ว่าง ไม่มีปัญหา) ถ้าพัง `error` จะเป็นข้อความปัญหา และผลลัพธ์ตัวแรกมักใช้ไม่ได้",
        },
        {
          t: "p",
          c: "เวลาเรียก ต้องรับให้ครบทุกตัวที่ฟังก์ชันคืน ถ้าไม่อยากเก็บตัวไหน ให้ใส่ `_` ตรงช่องนั้น `_` อ่านว่า blank identifier แปลว่า \"รับมาแล้วทิ้ง\" นี่คือบรรทัดที่คุณจะเห็นทั้งคอร์ส:",
        },
        {
          t: "table",
          head: ["บรรทัด", "อ่านว่า", "ใช้เมื่อไหร่"],
          rows: [
            ["`left, err := Withdraw(1000, 400)`", "เก็บทั้งยอดเงินใหม่และ error", "ต้องใช้ยอดเงินต่อ"],
            ["`_, err := Withdraw(1000, 400)`", "ทิ้งยอดเงิน เก็บแค่ error", "สนแค่ว่าพังหรือไม่ เช่นในเทสต์"],
            ["`if err := db.Ping(); err != nil {`", "เรียก Ping สร้าง err ไว้ใช้แค่ใน if นี้", "เช็คแล้วจบ ไม่ต้องมีตัวแปร err นอกบล็อก"],
          ],
        },
        {
          t: "codeout",
          lang: "go",
          label: "blank_and_err.go",
          code: `package main

import (
	"errors"
	"fmt"
)

// คืนสองค่า: ยอดคงเหลือใหม่ และ error
func Withdraw(balance int64, amount int64) (int64, error) {
	if balance < amount {
		return 0, errors.New("ยอดเงินไม่พอ")
	}
	return balance - amount, nil
}

func Ping() error {
	return errors.New("ต่อฐานข้อมูลไม่ได้")
}

func main() {
	// ช่องที่ 1 = ยอดเงิน, ช่องที่ 2 = error
	left, err := Withdraw(1000, 400)
	fmt.Println("1) เก็บทั้งสองค่า:", left, err)

	// _ ทิ้งช่องที่ 1 เหลือแค่ err
	// err มีอยู่แล้วจากบรรทัดบน จึงใช้ = ไม่ใช่ :=
	_, err = Withdraw(1000, 1500)
	fmt.Println("2) ทิ้งยอดเงิน เหลือแค่ err:", err)

	// สร้าง err เฉพาะในเงื่อนไข ใช้ข้างนอก if ไม่ได้
	if err := Ping(); err != nil {
		fmt.Println("3) if err := ... :", err)
	}
}`,
          out: `1) เก็บทั้งสองค่า: 600 <nil>
2) ทิ้งยอดเงิน เหลือแค่ err: ยอดเงินไม่พอ
3) if err := ... : ต่อฐานข้อมูลไม่ได้`,
        },
        {
          t: "ul",
          c: [
            "**`(int64, error)`**: วงเล็บหลังชื่อฟังก์ชันคือสิ่งที่คืนกลับมา ตัวท้ายของฟังก์ชันในคอร์สนี้มักเป็น `error`",
            "**`nil`**: ค่าว่าง เมื่อพิมพ์ออกมาจะเห็น `<nil>` แปลว่าไม่มี error",
            "**`if err != nil`**: แปลว่า \"ถ้ามีปัญหา\" ต้องเช็คทันที อย่ารันต่อทั้งที่ err ไม่ใช่ nil",
            "**`_, err :=`**: ขีดล่างไม่ใช่ชื่อตัวแปรพิเศษที่เก็บค่าลับ มันคือการบอกคอมไพเลอร์ว่าช่องนี้ตั้งใจไม่ใช้ ถ้าเขียนชื่อตัวแปรแล้วไม่ใช้ โปรแกรมคอมไพล์ไม่ผ่าน",
            "**`if err := Ping(); err != nil`**: เครื่องหมาย `;` แยกสองขั้นในบรรทัดเดียว ขั้นแรกเรียกฟังก์ชันแล้วเก็บ error ขั้นหลังเช็คว่ามีปัญหาไหม ตัว `err` ตัวนี้มีชีวิตแค่ในบล็อก if",
            "**`_ \"github.com/lib/pq\"`**: อีกรูปของขีดล่าง อยู่หน้า import แปลว่าดึงแพ็กเกจมาเพื่อให้มันทำงานตอนเปิดโปรแกรม (ลงทะเบียนไดรเวอร์ฐานข้อมูล) แต่เราจะไม่เขียนชื่อแพ็กเกจนั้นในโค้ด บทเชื่อมต่อฐานข้อมูลใช้แบบนี้",
          ],
        },
        {
          t: "codeout",
          lang: "go",
          label: "error_handling.go",
          code: `package main

import (
	"errors"
	"fmt"
)

var ErrInsufficientBalance = errors.New("ยอดเงินคงเหลือไม่เพียงพอ")

func Withdraw(balance int64, amount int64) (int64, error) {
	if amount <= 0 {
		return balance, errors.New("จำนวนเงินที่ถอนต้องมากกว่า 0")
	}
	if balance < amount {
		return balance, ErrInsufficientBalance
	}
	return balance - amount, nil
}

func main() {
	currentBalance := int64(1000)

	fmt.Println(">> ถอน 1,500 จาก 1,000")
	newBalance, err := Withdraw(currentBalance, 1500)
	if err != nil {
		fmt.Println("   เกิดข้อผิดพลาด:", err)
	} else {
		fmt.Println("   ถอนเงินสำเร็จ ยอดคงเหลือ:", newBalance)
	}

	fmt.Println(">> ถอน 400 จาก 1,000")
	newBalance, err = Withdraw(currentBalance, 400)
	if err != nil {
		fmt.Println("   เกิดข้อผิดพลาด:", err)
	} else {
		fmt.Println("   ถอนเงินสำเร็จ ยอดคงเหลือ:", newBalance)
	}
}`,
          out: `>> ถอน 1,500 จาก 1,000
   เกิดข้อผิดพลาด: ยอดเงินคงเหลือไม่เพียงพอ
>> ถอน 400 จาก 1,000
   ถอนเงินสำเร็จ ยอดคงเหลือ: 600`,
        },
        {
          t: "callout",
          title: "ทำไมตัวอย่างที่สองถึงคืนยอดเดิมตอนพัง แต่ตัวอย่างแรกคืน 0",
          c: "ไม่มีกฎตายตัวว่าช่องแรกต้องเป็นอะไรตอน error สิ่งที่ผู้เรียกต้องเชื่อคือช่อง `err` เท่านั้น ถ้า `err != nil` อย่าเอาช่องแรกไปใช้ต่อ ในระบบธนาคารเราจะเช็ค `err` ก่อนเสมอ แล้วค่อยอ่านยอดเงิน",
        },

        { t: "h2", c: "3. Go ไม่มี inheritance" },
        {
          t: "p",
          c: "ถ้าเคยเขียน Java, C#, หรือ Python แบบมีคลาสแม่กับคลาสลูก ให้วางภาพนั้นลงก่อน Go ไม่มีคีย์เวิร์ด `class` และไม่มีการสืบทอด (inheritance) แบบ `class Store extends Queries` ของที่ใช้แทนมีสามชิ้น และชิ้นที่คนสับสนบ่อยที่สุดคือการฝัง struct",
        },
        {
          t: "table",
          head: ["ในภาษาที่มีคลาส", "ใน Go", "ความต่างที่ต้องจำ"],
          rows: [
            ["class Account { fields }", "type Account struct { fields }", "struct คือกล่องข้อมูลล้วน ๆ ยังไม่มีพฤติกรรม"],
            ["method อยู่ในคลาส", "func (a *Account) Deposit(amount int64)", "เมธอดคือฟังก์ชันธรรมดาที่ประกาศว่าตัวมันผูกกับ Account"],
            ["class Dog extends Animal", "ไม่มี", "ไม่มีคลาสลูกที่ได้ฟิลด์และเมธอดของแม่มาโดยอัตโนมัติแบบลำดับชั้น"],
            ["interface ที่คลาสต้องเขียนว่า implements", "type Maker interface { CreateToken(...) }", "ไม่ต้องเขียนคำว่า implements แค่มีเมธอดครบตามสัญญา ก็ใช้แทน interface นั้นได้"],
            ["extends เพื่อเอาเมธอดของอีกคลาสมาใช้", "type Store struct { *Queries }", "นี่เรียก embedding วาง Queries ไว้ใน Store แล้วเรียก store.GetAccount() ได้ เพราะเมธอดถูกยกขึ้นมา ไม่ใช่เพราะ Store สืบทอดจาก Queries"],
          ],
        },
        {
          t: "codeout",
          lang: "go",
          label: "no_inheritance.go",
          code: `package main

import "fmt"

type Queries struct{}

func (q *Queries) GetAccount() string {
	return "อ่านบัญชีจาก Queries"
}

// ฝัง *Queries ไว้ใน Store ไม่ได้แปลว่า Store สืบทอด Queries
type Store struct {
	*Queries
	name string
}

// สัญญา: ใครมีเมธอด Notify ก็เป็น Notifier ได้
type Notifier interface {
	Notify(msg string)
}

type LogNotifier struct{}

func (LogNotifier) Notify(msg string) {
	fmt.Println("log:", msg)
}

func main() {
	store := &Store{
		Queries: &Queries{},
		name:    "simple-bank",
	}
	fmt.Println(store.name)
	fmt.Println(store.GetAccount())

	var n Notifier = LogNotifier{}
	n.Notify("โอนสำเร็จ")
}`,
          out: `simple-bank
อ่านบัญชีจาก Queries
log: โอนสำเร็จ`,
        },
        {
          t: "ul",
          c: [
            "**`type Store struct { *Queries }`**: ฟิลด์ไม่มีชื่อ แบบนี้เรียกว่าฝัง (embed) เมธอดของ `Queries` เช่น `GetAccount` โผล่มาให้เรียกผ่าน `store.GetAccount()` ได้เลย",
            "**ทำไมไม่เรียกว่า inheritance**: Store ไม่ได้กลายเป็นชนิด Queries คลาสลูกในภาษาอื่นมักถูกมองว่า \"เป็น\" คลาสแม่ ใน Go `Store` \"มี\" `Queries` อยู่ข้างใน แล้วภาษาช่วยยกเมธอดขึ้นมาให้เรียกสั้นลง",
            "**`type Notifier interface`**: รายการเมธอดที่ต้องมี `LogNotifier` ไม่ได้เขียนว่ามัน implements อะไร พอมันมี `Notify` อยู่แล้ว ตัวแปรชนิด `Notifier` จึงรับมันได้",
            "**บทถัดไปใช้ของนี้ตรงไหน**: `DBTX` และ `Maker` เป็น interface `Store` ฝัง `*Queries` เพื่อเรียกคำสั่ง SQL เดิมได้ แล้วเติมความสามารถเปิด transaction เข้าไป",
          ],
        },

        { t: "h2", c: "4. Struct, Pointer และ Value vs Pointer Receiver" },
        {
          t: "p",
          c: "หัวข้อที่แล้วบอกว่า struct คือกล่องข้อมูล และเมธอดคือฟังก์ชันที่ผูกกับกล่องนั้น ตอนนี้ดูว่ากล่องที่ส่งเข้าเมธอดเป็นสำเนา หรือเป็นตัวชี้ไปที่ก้อนเดิม Pointer (`*`) ใช้เมื่อต้องแก้ข้อมูลก้อนเดิมโดยไม่คัดลอกทั้งก้อน:",
        },
        {
          t: "codeout",
          lang: "go",
          label: "struct_pointer.go",
          code: `// นิยาม Account struct และเปรียบเทียบการทำงานระหว่าง Value Receiver กับ Pointer Receiver
// ทำเพื่อแก้ปัญหา: เข้าใจว่าเมื่อไหร่ต้องส่ง Pointer เพื่อแก้ไขข้อมูลในก้อนเดิม และเมื่อไหร่ส่ง Value ที่เป็นการคัดลอกสำเนา

package main

import "fmt"

// Account คือโครงสร้างข้อมูลจำลองบัญชีธนาคาร
type Account struct {
	ID      int64  \`json:"id"\`
	Owner   string \`json:"owner"\`
	Balance int64  \`json:"balance"\`
}

// DepositCopy รับค่าแบบสำเนา (Value Receiver)
// ข้อจำกัด: การเปลี่ยนแปลงตัวแปร a ภายในฟังก์ชันนี้จะกระทบแค่สำเนา ก้อนต้นฉบับในหน่วยความจำจะไม่เปลี่ยน
func (a Account) DepositCopy(amount int64) {
	a.Balance += amount
}

// Deposit รับค่าแบบ Pointer (*Account) เพื่อเข้าถึงตำแหน่งหน่วยความจำโดยตรง
// ประโยชน์: แก้ไข Balance ของบัญชีต้นฉบับได้โดยตรง ไม่ต้องคัดลอกข้อมูลทั้งก้อน
func (a *Account) Deposit(amount int64) {
	a.Balance += amount
}

// GetBalance รับค่าสำเนา (Account) เพื่อเข้ามาอ่านข้อมูลเพียงอย่างเดียว โดยไม่แก้ไขค่าใดๆ
func (a Account) GetBalance() int64 {
	return a.Balance
}

func main() {
	// 1. สร้างบัญชีใหม่พร้อมยอดเงินเริ่มต้น 1,000 บาท
	acc := &Account{ID: 1, Owner: "Alice", Balance: 1000}

	// 2. ทดสอบ Value Receiver (ส่งสำเนา): ยอดเงินก้อนเดิมต้องไม่ขยับ
	fmt.Println(">> 1. ทดสอบ Value Receiver (ส่งสำเนา):")
	acc.DepositCopy(500)
	fmt.Printf("   ยอดเงินหลัง DepositCopy: %d บาท (ก้อนเดิมไม่เปลี่ยน!)\\n\\n", acc.GetBalance())

	// 3. ทดสอบ Pointer Receiver (ส่ง Pointer): ยอดเงินก้อนเดิมจะถูกอัปเดตจริงเป็น 1,500 บาท
	fmt.Println(">> 2. ทดสอบ Pointer Receiver (ส่ง Pointer):")
	acc.Deposit(500)
	fmt.Printf("   ยอดเงินหลัง Deposit: %d บาท (ก้อนเดิมเปลี่ยนสำเร็จ!)\\n", acc.GetBalance())
}`,
          out: `>> 1. ทดสอบ Value Receiver (ส่งสำเนา):
   ยอดเงินหลัง DepositCopy: 1000 บาท (ก้อนเดิมไม่เปลี่ยน!)

>> 2. ทดสอบ Pointer Receiver (ส่ง Pointer):
   ยอดเงินหลัง Deposit: 1500 บาท (ก้อนเดิมเปลี่ยนสำเร็จ!)`,
        },
        {
          t: "ul",
          c: [
            "**`type Account struct`**: แม่แบบของกล่องข้อมูล ไม่ใช่คลาส และไม่ได้สืบทอดจากใคร",
            "**`json:\"id\"`**: เรียกว่า Struct Tag ใช้บอกไลบรารี JSON ว่าเวลาแปลงเป็น JSON ให้ใช้คีย์ชื่ออะไร",
            "**`(a *Account) Deposit(...)`**: ใช้ `*Account` เป็น Receiver หมายความว่าฟังก์ชันนี้ได้รับ Pointer มา ทำให้เวลาเราเปลี่ยนค่า `a.Balance` บัญชีต้นฉบับจะเปลี่ยนตามไปด้วย",
            "**`acc := &Account{...}`**: เครื่องหมาย `&` ใช้เพื่อดึง Address ของ struct นั้นมา ทำให้ตัวแปร `acc` มีชนิดข้อมูลเป็น `*Account` (Pointer to Account)",
          ],
        },

        { t: "h2", c: "5. `defer` ทำงานตอนฟังก์ชันกำลังจะจบ" },
        {
          t: "p",
          c: "คำสั่ง `defer` จะสั่งให้โค้ดบรรทัดนั้นรอทำงาน **ตอนที่ฟังก์ชันกำลังจะจบลง** เสมอ ไม่ว่าฟังก์ชันจะจบลงตามปกติ หรือจบด้วยการ return error ทันที เหมาะอย่างยิ่งสำหรับการปิดการเชื่อมต่อ Database, ปิด File, หรือการสั่ง Rollback Transaction และคำสั่ง defer จะทำงานแบบ LIFO (Last-In, First-Out):",
        },
        {
          t: "codeout",
          lang: "go",
          label: "defer_demo.go",
          code: `// สาธิตการทำงานของ defer ในการเก็บกวาด Resource และลำดับการทำงานแบบ LIFO
// ทำเพื่อแก้ปัญหา: ป้องกันการลืมปิด Connection หรือลืมปลด Lock เมื่อเกิด Error กลางทาง
// แม้ฟังก์ชันจะ Return ก่อนเวลา คำสั่ง defer จะการันตีทำงานเสมอ

package main

import "fmt"

func ProcessTransaction() {
	// 1. เริ่มต้นเชื่อมต่อฐานข้อมูล
	fmt.Println("1. เริ่มต้นเชื่อมต่อฐานข้อมูล")

	// 2. ลงทะเบียนคำสั่ง defer ล่วงหน้าไว้สำหรับทำความสะอาด Resource
	// สังเกต: defer ทำงานแบบ LIFO (Last-In, First-Out) คำสั่งที่ประกาศทีหลังจะทำงานก่อน
	defer fmt.Println(">> [defer 1] ปิดการเชื่อมต่อฐานข้อมูล (LIFO: รันลำดับสุดท้าย)")
	defer fmt.Println(">> [defer 2] ปลด Row Lock ของบัญชี (LIFO: รันก่อน)")

	// 3. ทำงาน Business Logic โอนเงิน
	fmt.Println("2. ตรวจสอบยอดเงินในบัญชี")
	fmt.Println("3. โอนเงิน 500 บาทสำเร็จ")
	fmt.Println("4. กำลังจะออกจากฟังก์ชัน...")
	// เมื่อฟังก์ชันจบลงที่บรรทัดนี้ คำสั่ง defer 2 และ defer 1 จะถูกรันย้อนหลังตามลำดับ
}

func main() {
	ProcessTransaction()
}`,
          out: `1. เริ่มต้นเชื่อมต่อฐานข้อมูล
2. ตรวจสอบยอดเงินในบัญชี
3. โอนเงิน 500 บาทสำเร็จ
4. กำลังจะออกจากฟังก์ชัน...
>> [defer 2] ปลด Row Lock ของบัญชี (LIFO: รันก่อน)
>> [defer 1] ปิดการเชื่อมต่อฐานข้อมูล (LIFO: รันลำดับสุดท้าย)`,
        },
        {
          t: "callout",
          title: "📌 กฎเหล็กของ defer",
          c: "defer จะทำงานตามหลัก LIFO (Last-In, First-Out) คือคำสั่ง defer ตัวล่าสุดที่ถูกเรียก จะทำงานเป็นตัวแรกสุดตอนฟังก์ชันจบลง และแม้จะเกิด Panic หรือ Return ก่อนเวลา defer ก็จะถูกรันแน่นอน 100%",
        },

        { t: "h2", c: "6. `context.Context` คือใบสั่งให้ยกเลิกงานที่ช้าเกิน" },
        {
          t: "p",
          c: "เวลาที่เซิร์ฟเวอร์ Go รับคำสั่งเข้ามา เรามักจะส่งต่อ `ctx context.Context` ไปให้ทุกฟังก์ชันที่คุยกับฐานข้อมูลหรือยิง Network ภายนอก หน้าที่ของ Context คือการส่งสัญญาณ **Timeout (ตัดการทำงานถ้าช้าเกินไป)** หรือ **Cancellation (ลูกค้ายกเลิกคำขอ)** ลองดูผลการทำงานเมื่อคิวรีใช้เวลา 2 วินาที แต่ Timeout กำหนดไว้ 1 วินาที:",
        },
        {
          t: "codeout",
          lang: "go",
          label: "context_demo.go",
          code: `// สาธิตการใช้งาน context.Context ในการควบคุมเวลาทำงาน (Timeout) และการยกเลิกคำขอ
// ทำเพื่อแก้ปัญหา: ป้องกันไม่ให้คำสั่งคิวรี Database ที่ค้างหรือช้าบล็อกการทำงานของเซิร์ฟเวอร์จนทรัพยากรหมด

package main

import (
	"context"
	"fmt"
	"time"
)

// QueryDatabase จำลองฟังก์ชันคิวรีฐานข้อมูลที่รับ context เข้ามาตรวจสอบการ Timeout
func QueryDatabase(ctx context.Context) error {
	fmt.Println(">> เริ่มต้นค้นหาข้อมูลใน Database...")

	// ใช้ select เพื่อดักฟังสัญญาณระหว่างงานเสร็จ กับ Context หมดเวลาก่อน
	select {
	case <-time.After(2 * time.Second): // จำลองการคิวรีที่ใช้เวลาประมวลผล 2 วินาที
		fmt.Println("   ค้นหาข้อมูลสำเร็จ")
		return nil
	case <-ctx.Done(): // กรณี Context ตัดเวลาก่อนที่งานจะเสร็จ
		return ctx.Err() // ส่งคืน error เช่น context deadline exceeded
	}
}

func main() {
	// 1. สร้าง Context พร้อมกำหนด Timeout สูงสุดไม่เกิน 1 วินาที
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel() // คืนทรัพยากรของ Context เสมอเมื่อจบฟังก์ชัน

	// 2. เรียกฟังก์ชันที่มีงาน 2 วินาที (เกินกว่าเวลาที่ Context ยอมรับได้)
	err := QueryDatabase(ctx)
	if err != nil {
		fmt.Println(">> การทำงานล้มเหลว:", err)
		fmt.Println("   (สาเหตุ: ระบบตัดการทำงานอัตโนมัติเนื่องจากเกินเวลา 1 วินาทีที่กำหนด)")
	}
}`,
          out: `>> เริ่มต้นค้นหาข้อมูลใน Database...
>> การทำงานล้มเหลว: context deadline exceeded
   (สาเหตุ: ระบบตัดการทำงานอัตโนมัติเนื่องจากเกินเวลา 1 วินาทีที่กำหนด)`,
        },

        { t: "h2", c: "7. Goroutine คือฟังก์ชันที่แยกไปรันคู่ขนาน" },
        {
          t: "p",
          c: "หัวใจที่ทำให้ Go โด่งดังไปทั่วโลกคือ **Goroutine** ซึ่งเป็น Lightweight Thread ที่ใช้หน่วยความจำเริ่มต้นเพียงแค่ 2 KB (เทียบกับ OS Thread ปกติที่กิน 1–2 MB) ทำให้ Go สามารถรัน 10,000 ถึง 100,000 goroutines พร้อมกันบนเครื่องเดียวได้สบายๆ ลองดูตัวอย่างการปล่อยคนงาน 3 ตัวทำงานคู่ขนานและส่งผลผ่าน Channel:",
        },
        {
          t: "codeout",
          lang: "go",
          label: "concurrency_demo.go",
          code: `// สาธิตการทำงานคู่ขนานด้วย Goroutines, Channels, และ sync.WaitGroup
// ทำเพื่อแก้ปัญหา: การประมวลผลงานหลายชิ้นพร้อมกันโดยไม่บล็อก และส่งข้อมูลผลลัพธ์กลับมาอย่างปลอดภัยโดยไม่ต้องใช้ Lock

package main

import (
	"fmt"
	"sync"
	"time"
)

// Worker จำลองคนงานที่ทำงานแบบ Asynchronous ใน Goroutine
func Worker(id int, ch chan<- string, wg *sync.WaitGroup) {
	// 1. แจ้งเตือน WaitGroup เมื่องานเสร็จสิ้น (รันผ่าน defer เพื่อความแน่นอน)
	defer wg.Done()

	// 2. จำลองเวลาประมวลผลธุรกรรม
	time.Sleep(time.Duration(id*10) * time.Millisecond)

	// 3. ส่งข้อมูลผลลัพธ์ผ่าน Channel ไปยังฟังก์ชันหลัก
	ch <- fmt.Sprintf("Goroutine #%d: ประมวลผลธุรกรรมสำเร็จ", id)
}

func main() {
	var wg sync.WaitGroup
	resultChan := make(chan string, 3) // สร้าง Channel แบบ Buffered ขนาด 3 ช่อง

	// 1. ปล่อย 3 Goroutines ให้ทำงานคู่ขนานกันในเวลาเดียวกัน
	fmt.Println(">> ปล่อย 3 Goroutines ทำงานคู่ขนานพร้อมกัน...")
	for i := 1; i <= 3; i++ {
		wg.Add(1) // เพิ่มตัวนับงานใน WaitGroup ทีละ 1
		go Worker(i, resultChan, &wg)
	}

	// 2. รอจนกว่าคนงานทั้ง 3 คนจะทำงานเสร็จ (ตัวนับลดลงเหลือ 0)
	wg.Wait()
	close(resultChan) // ปิด Channel เมื่อส่งข้อมูลครบถ้วน ป้องกัน Deadlock

	// 3. วนลูปอ่านข้อมูลผลลัพธ์ทั้งหมดที่ส่งออกมาจาก Channel
	fmt.Println(">> ได้รับผลลัพธ์จาก Channel ครบทั้งหมด:")
	for msg := range resultChan {
		fmt.Println("  ", msg)
	}
}`,
          out: `>> ปล่อย 3 Goroutines ทำงานคู่ขนานพร้อมกัน...
>> ได้รับผลลัพธ์จาก Channel ครบทั้งหมด:
   Goroutine #1: ประมวลผลธุรกรรมสำเร็จ
   Goroutine #2: ประมวลผลธุรกรรมสำเร็จ
   Goroutine #3: ประมวลผลธุรกรรมสำเร็จ`,
        },
        {
          t: "ul",
          c: [
            "**`go Worker(...)`**: การใส่คีย์เวิร์ด `go` นำหน้าฟังก์ชัน จะทำให้ฟังก์ชันนั้นแยกไปรันแบบ Asynchronous ทันทีใน Background",
            "**`sync.WaitGroup`**: ตัวนับงาน (Counter) — เรียก `wg.Add(1)` ก่อนเริ่ม, เรียก `wg.Done()` เมื่อจบงาน, และเรียก `wg.Wait()` ในฟังก์ชันหลักเพื่อรอจนกว่านับถอยหลังถึง 0",
            "**`chan string`**: ท่อส่งข้อมูล (Channel) ที่ปลอดภัยในการส่งผ่านค่าระหว่าง Goroutines โดยไม่ต้องใช้ Mutex ล็อก",
          ],
        },
        {
          t: "callout",
          title: "ก้าวต่อไปสู่การสร้างโปรเจกต์จริง",
          c: "พออ่านเจ็ดเรื่องนี้ได้แล้ว บทถัดไปจะเข้าโปรเจกต์ Simple Bank จริง โค้ดจะถูกแบ่งเป็นแพ็กเกจ `db/`, `api/`, `util/` เวลาเจอ `_, err` หรือ `type Store struct { *Queries }` ให้ย้อนมาที่หัวข้อ 2 กับ 3 ของบทนี้",
        },
      ],
      en: [],
    },
  },
};
