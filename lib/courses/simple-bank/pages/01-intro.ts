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
          c: "เราจะสอนโดยสมมติว่าคุณมีเพียงพื้นฐานภาษา Go ทั่วไป ดังนั้นทุกฟีเจอร์สำคัญ ไม่ว่าจะเป็น Pointer, Interface, Goroutine, Channel, หรือ Transaction Callback เราจะอธิบายว่าคืออะไร ทำงานยังไง และอธิบายโค้ดทีละบรรทัดอย่างละเอียดเหมือนการเฉลยโจทย์ระดับโลก!",
        },
        { t: "h2", c: "สารบัญและบทเรียนทั้งหมด" },
        {
          t: "links",
          c: [
            {
              title: "1. Go พื้นฐานสำหรับระบบ Backend →",
              slug: "bank-go-backend-primer",
              desc: "ทบทวน Pointers, Structs, Errors, defer, Context และ Goroutines/Channels",
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
              title: "15. Config Management, Docker & Production Checklist →",
              slug: "bank-config-docker-prod",
              desc: "โหลดคอนฟิกด้วย Viper, Multi-Stage Dockerfile ย่อเหลือ 20MB และ Production Checklist",
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
      th: "Go พื้นฐานสำหรับระบบ Backend — ทบทวนและเตรียมพร้อม",
      en: "Go Backend Primer — Core Concepts for Production Systems",
    },
    lead: {
      th: "ปูพื้นฐานกลไกสำคัญของ Go ที่ใช้ในงาน Backend: Pointers, Structs, Error Handling สไตล์ Go, defer, Context, Goroutines, Channels, และ WaitGroup พร้อมผลลัพธ์ Terminal Output ให้เห็นการทำงานจริง",
      en: "Essential Go mechanics for backend systems: pointers, structs, explicit error handling, defer, context, goroutines, and channels with executable terminal outputs.",
    },
    group: "1. บทนำ & รากฐาน",
    blocks: {
      th: [
        {
          t: "p",
          c: "ภาษา Go ถูกสร้างขึ้นโดยทีมวิศวกรของ Google (Robert Griesemer, Rob Pike, Ken Thompson) เพื่อแก้ปัญหาการพัฒนาระบบเครือข่ายและระบบ Backend ขนาดใหญ่ จุดเด่นของ Go คือความเรียบง่าย (Simplicity), ทำงานได้เร็วเทียบเท่า C/C++, และมีระบบ Concurrency ระดับเทพที่ติดมากับตัวภาษา",
        },
        {
          t: "p",
          c: "ในบทนี้ เราจะมาทบทวน 5 คอนเซปต์สำคัญของ Go ที่เราจำเป็นต้องใช้ในการสร้างระบบ Simple Bank ตลอดทั้งคอร์ส โดยทุกตัวอย่างจะแสดงโค้ดพร้อมผลลัพธ์การรันใน Terminal เพื่อให้เห็นชัดเจนว่าแต่ละคำสั่งส่งผลอย่างไรต่อตัวแปรและระบบ",
        },

        { t: "h2", c: "1. Struct, Pointer และ Value vs Pointer Receiver" },
        {
          t: "p",
          c: "ใน Go ไม่มีคลาส (Class) แต่เราใช้ `struct` ในการจัดกลุ่มข้อมูล และใช้ Pointer (`*`) เมื่อเราต้องการส่งผ่านการอ้างอิงตำแหน่งในหน่วยความจำโดยไม่ต้องคัดลอกข้อมูลทั้งก้อน ลองสังเกตความแตกต่างเมื่อใช้ Value Receiver (สำเนา) เทียบกับ Pointer Receiver (ชี้ไปยังก้อนจริง):",
        },
        {
          t: "codeout",
          lang: "go",
          label: "struct_pointer_example.go",
          code: `package main

import "fmt"

// Account คือโครงสร้างข้อมูลแทนบัญชีธนาคาร
type Account struct {
	ID      int64  \`json:"id"\`
	Owner   string \`json:"owner"\`
	Balance int64  \`json:"balance"\`
}

// DepositCopy รับค่าสำเนา (Value Receiver) แก้ไขแล้วก้อนเดิมในหน่วยความจำไม่เปลี่ยน
func (a Account) DepositCopy(amount int64) {
	a.Balance += amount
}

// Deposit รับ pointer (*Account) เพื่อแก้ไขข้อมูลของก้อนเดิมในหน่วยความจำโดยตรง
func (a *Account) Deposit(amount int64) {
	a.Balance += amount
}

// GetBalance รับค่าสำเนา (Account) เข้ามาอ่านค่าเฉยๆ โดยไม่แก้ไขต้นฉบับ
func (a Account) GetBalance() int64 {
	return a.Balance
}

func main() {
	acc := &Account{ID: 1, Owner: "Alice", Balance: 1000}

	fmt.Println(">> 1. ทดสอบ Value Receiver (ส่งสำเนา):")
	acc.DepositCopy(500)
	fmt.Printf("   ยอดเงินหลัง DepositCopy: %d บาท (ก้อนเดิมไม่เปลี่ยน!)\\n\\n", acc.GetBalance())

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
            "**`type Account struct`**: เป็นการนิยามแม่แบบข้อมูล คล้าย Object ในภาษาอื่น",
            "**`json:\"id\"`**: เรียกว่า Struct Tag ใช้บอกไลบรารี JSON ว่าเวลาแปลงเป็น JSON ให้ใช้คีย์ชื่ออะไร",
            "**`(a *Account) Deposit(...)`**: ใช้ `*Account` เป็น Receiver หมายความว่าฟังก์ชันนี้ได้รับ Pointer มา ทำให้เวลาเราเปลี่ยนค่า `a.Balance` บัญชีต้นฉบับจะเปลี่ยนตามไปด้วย",
            "**`acc := &Account{...}`**: เครื่องหมาย `&` ใช้เพื่อดึง Address ของ struct นั้นมา ทำให้ตัวแปร `acc` มีชนิดข้อมูลเป็น `*Account` (Pointer to Account)",
          ],
        },

        { t: "h2", c: "2. การจัดการ Error แบบ Go (Explicit Error Handling)" },
        {
          t: "p",
          c: "ในภาษาอื่นๆ เราอาจจะคุ้นชินกับการใช้ `try...catch` แต่ในภาษา Go **ไม่มี try-catch** ปรัชญาของ Go คือ Error ถือเป็น 'ค่าข้อมูลธรรมดาตัวหนึ่ง (Normal Value)' ที่ฟังก์ชันสามารถ return ออกมาได้คู่กับผลลัพธ์ ลองดูตัวอย่างทั้งเคสที่เงินพอและเคสที่เงินไม่พอ:",
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

// ErrInsufficientBalance เป็นข้อผิดพลาดมาตรฐานเมื่อเงินไม่พอ
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

	fmt.Println(">> ทดสอบเคสที่ 1: ถอนเงินเกินยอดคงเหลือ (ถอน 1,500 บาท จาก 1,000 บาท)")
	newBalance, err := Withdraw(currentBalance, 1500)
	if err != nil {
		fmt.Println("   [X] เกิดข้อผิดพลาด:", err)
	} else {
		fmt.Println("   [✓] ถอนเงินสำเร็จ ยอดคงเหลือ:", newBalance)
	}

	fmt.Println("\\n>> ทดสอบเคสที่ 2: ถอนเงินปกติ (ถอน 400 บาท จาก 1,000 บาท)")
	newBalance, err = Withdraw(currentBalance, 400)
	if err != nil {
		fmt.Println("   [X] เกิดข้อผิดพลาด:", err)
	} else {
		fmt.Println("   [✓] ถอนเงินสำเร็จ ยอดคงเหลือ:", newBalance)
	}
}`,
          out: `>> ทดสอบเคสที่ 1: ถอนเงินเกินยอดคงเหลือ (ถอน 1,500 บาท จาก 1,000 บาท)
   [X] เกิดข้อผิดพลาด: ยอดเงินคงเหลือไม่เพียงพอ

>> ทดสอบเคสที่ 2: ถอนเงินปกติ (ถอน 400 บาท จาก 1,000 บาท)
   [✓] ถอนเงินสำเร็จ ยอดคงเหลือ: 600`,
        },
        {
          t: "ul",
          c: [
            "**`(int64, error)`**: ฟังก์ชันใน Go สามารถ return ค่าได้หลายตัว โดยตัวสุดท้ายมักจะเป็น `error` เสมอ",
            "**`nil`**: หากการทำงานสำเร็จ ไร้ข้อผิดพลาด เราจะส่งค่า `nil` กลับไปแทน error",
            "**`if err != nil`**: เป็น pattern มาตรฐานของ Go ที่เราต้องตรวจเช็กทันทีหลังจากเรียกฟังก์ชัน เพื่อจัดการปัญหาก่อนที่โค้ดจะรันต่อ ป้องกันการเกิดบั๊กแอบแฝงในระบบธนาคาร",
          ],
        },

        { t: "h2", c: "3. การใช้ `defer` สำหรับทำความสะอาด Resource" },
        {
          t: "p",
          c: "คำสั่ง `defer` จะสั่งให้โค้ดบรรทัดนั้นรอทำงาน **ตอนที่ฟังก์ชันกำลังจะจบลง** เสมอ ไม่ว่าฟังก์ชันจะจบลงตามปกติ หรือจบด้วยการ return error ทันที เหมาะอย่างยิ่งสำหรับการปิดการเชื่อมต่อ Database, ปิด File, หรือการสั่ง Rollback Transaction และคำสั่ง defer จะทำงานแบบ LIFO (Last-In, First-Out):",
        },
        {
          t: "codeout",
          lang: "go",
          label: "defer_example.go",
          code: `package main

import "fmt"

func ProcessTransaction() {
	fmt.Println("1. เริ่มต้นเชื่อมต่อฐานข้อมูล")
	defer fmt.Println(">> [defer 1] ปิดการเชื่อมต่อฐานข้อมูล (LIFO: รันลำดับสุดท้าย)")
	defer fmt.Println(">> [defer 2] ปลด Row Lock ของบัญชี (LIFO: รันก่อน)")

	fmt.Println("2. ตรวจสอบยอดเงินในบัญชี")
	fmt.Println("3. โอนเงิน 500 บาทสำเร็จ")
	fmt.Println("4. กำลังจะออกจากฟังก์ชัน...")
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

        { t: "h2", c: "4. บริบทการทำงาน: `context.Context`" },
        {
          t: "p",
          c: "เวลาที่เซิร์ฟเวอร์ Go รับคำสั่งเข้ามา เรามักจะส่งต่อ `ctx context.Context` ไปให้ทุกฟังก์ชันที่คุยกับฐานข้อมูลหรือยิง Network ภายนอก หน้าที่ของ Context คือการส่งสัญญาณ **Timeout (ตัดการทำงานถ้าช้าเกินไป)** หรือ **Cancellation (ลูกค้ายกเลิกคำขอ)** ลองดูผลการทำงานเมื่อคิวรีใช้เวลา 2 วินาที แต่ Timeout กำหนดไว้ 1 วินาที:",
        },
        {
          t: "codeout",
          lang: "go",
          label: "context_example.go",
          code: `package main

import (
	"context"
	"fmt"
	"time"
)

func QueryDatabase(ctx context.Context) error {
	fmt.Println(">> เริ่มต้นค้นหาข้อมูลใน Database...")
	select {
	case <-time.After(2 * time.Second): // จำลองการคิวรีที่ใช้เวลา 2 วินาที
		fmt.Println("   ค้นหาข้อมูลสำเร็จ")
		return nil
	case <-ctx.Done(): // หาก Context สั่งตัดเวลาหรือถูกยกเลิก
		return ctx.Err()
	}
}

func main() {
	// ตั้ง Timeout สูงสุดไม่เกิน 1 วินาที (แต่งานจริงใช้ 2 วินาที)
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

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

        { t: "h2", c: "5. การทำงานแบบคู่ขนาน: Goroutines, Channels และ WaitGroup" },
        {
          t: "p",
          c: "หัวใจที่ทำให้ Go โด่งดังไปทั่วโลกคือ **Goroutine** ซึ่งเป็น Lightweight Thread ที่ใช้หน่วยความจำเริ่มต้นเพียงแค่ 2 KB (เทียบกับ OS Thread ปกติที่กิน 1–2 MB) ทำให้ Go สามารถรัน 10,000 ถึง 100,000 goroutines พร้อมกันบนเครื่องเดียวได้สบายๆ ลองดูตัวอย่างการปล่อยคนงาน 3 ตัวทำงานคู่ขนานและส่งผลผ่าน Channel:",
        },
        {
          t: "codeout",
          lang: "go",
          label: "concurrency_example.go",
          code: `package main

import (
	"fmt"
	"sync"
	"time"
)

func Worker(id int, ch chan<- string, wg *sync.WaitGroup) {
	defer wg.Done() // สั่งบอก WaitGroup เมื่องานเสร็จสิ้น
	time.Sleep(time.Duration(id*10) * time.Millisecond) // จำลองเวลาประมวลผล
	ch <- fmt.Sprintf("Goroutine #%d: ประมวลผลธุรกรรมสำเร็จ", id)
}

func main() {
	var wg sync.WaitGroup
	resultChan := make(chan string, 3)

	fmt.Println(">> ปล่อย 3 Goroutines ทำงานคู่ขนานพร้อมกัน...")
	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go Worker(i, resultChan, &wg)
	}

	wg.Wait()         // รอจนกว่าคนงานทุกคนจะเรียก wg.Done() ครบ
	close(resultChan) // ปิด channel เมื่อส่งข้อมูลครบ

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
          title: "🎯 สรุปก่อนไปต่อ",
          c: "ตอนนี้เราเห็นการทำงานจริงของอาวุธพื้นฐาน Go ครบมือแล้ว! ในบทถัดไป เราจะนำทักษะเหล่านี้ไปใช้ออกแบบฐานข้อมูล และสร้างตาราง Ledger เพื่อป้องกันข้อมูลเงินพังในระบบธนาคารจริง",
        },
      ],
      en: [],
    },
  },
};
