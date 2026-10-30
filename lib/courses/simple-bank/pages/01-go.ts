import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/01-go.ts
// โมดูล 1: ปูพื้นฐานภาษา Go สำหรับ Backend
// บทเรียน: 1.1 bank-go-basics, 1.2 bank-go-backend-primer
// =============================================================================

export const goPages: Record<string, Page> = {
  "bank-go-basics": {
    slug: "bank-go-basics",
    title: {
      th: "1.1 ไวยากรณ์ Go พื้นฐาน: Struct, Pointer & Error",
      en: "1.1 Go Basics: Struct, Pointer & Error Handling",
    },
    lead: {
      th: "ปูพื้นฐานไวยากรณ์ Go ที่ระบบ Backend ต้องใช้จริง: ทำไมระบบเงินห้ามใช้ float, การทำงานของ Pointer ผ่านตัวอย่างกระเป๋าเงิน และการจัดการ Error แบบ Go",
      en: "Essential Go mechanics for backend systems: why floats fail for money, pointers via wallet analogy, and idiomatic error handling.",
    },
    group: "1. ปูพื้นฐานภาษา Go สำหรับ Backend",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• เข้าใจว่าทำไมระบบการเงินระดับโลกถึงเก็บยอดเงินเป็นจำนวนเต็ม (`int64`) ห้ามใช้ `float` เด็ดขาด\n• เชี่ยวชาญการส่งค่าแบบ Pass by Value vs Pass by Pointer ในภาษา Go ผ่านตัวอย่างคลาสสิก\n• รู้วิธีจัดการ Error แบบ Idiomatic Go ด้วย Sentinel Errors (`errors.New`) และ Error Wrapping (`%w`, `errors.Is`)\n\n⏱ **เวลาในการเรียนรู้**: ~20 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านบท 0.2 ติดตั้ง Go เรียบร้อยแล้ว",
        },
        {
          "t": "h2",
          "c": "1. ทำไมระบบการเงินห้ามใช้ Float เด็ดขาด?",
        },
        {
          "t": "p",
          "c": "สำหรับคนที่เขียนโปรแกรมทั่วไป เวลาต้องการเก็บตัวเลขทศนิยม เรามักจะนึกถึงชนิดข้อมูล `float32` หรือ `float64` ทันที แต่ในระบบการเงินและระบบธนาคาร **นี่คือข้อห้ามร้ายแรงอันดับหนึ่ง** มาดูตัวอย่างคลาสสิกที่ทำให้ระบบพังกันครับ:",
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างคลาสสิก: ความคลาดเคลื่อนของเลข Floating-Point",
          "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ta := 0.1\n\tb := 0.2\n\tfmt.Println(\"0.1 + 0.2 =\", a+b)\n\tfmt.Println(\"เท่ากับ 0.3 หรือไม่?\", a+b == 0.3)\n}",
          "out": "0.1 + 0.2 = 0.30000000000000004\nเท่ากับ 0.3 หรือไม่? false",
        },
        {
          "t": "p",
          "c": "เพราะคอมพิวเตอร์เก็บข้อมูลเป็นเลขฐานสอง (Binary IEEE 754) จึงไม่สามารถแทนค่าทศนิยมฐานสิบอย่าง 0.1 หรือ 0.2 ได้อย่างแม่นยำ 100% ถ้าเราใช้ float ในระบบธนาคาร เมื่อมีธุรกรรมหมุนเวียนหลักล้านครั้งต่อวัน ยอดเงินของธนาคารจะขาดหรือเกินไปทีละนิดจนระบบบัญชีไม่ลงตัวทันที",
        },
        {
          "t": "callout",
          "title": "💡 ทางออกระดับสากล: เก็บเงินเป็นจำนวนเต็มในหน่วยย่อยที่สุด (Smallest Unit)",
          "c": "แทนที่จะเก็บ 10.50 บาท (float) ระบบธนาคารและ Payment Gateway ชั้นนำอย่าง Stripe จะแปลงหน่วยเป็น **สตางค์** (หรือ Cent) เสมอ:\n• 10.50 THB → เก็บเป็น `1050` (สตางค์) ด้วยชนิดข้อมูล `int64`\n• 0.10 THB + 0.20 THB → `10` + `20` = `30` สตางค์ (เท่ากับ 30 เป๊ะ 100% ไร้ความคลาดเคลื่อน)",
        },
        {
          "t": "h2",
          "c": "2. Struct: แม่แบบข้อมูลของบัญชีธนาคาร",
        },
        {
          "t": "p",
          "c": "ใน Go ไม่มีคำว่า `class` แต่เราใช้ `struct` ในการจัดกลุ่มตัวแปรที่สัมพันธ์กันเข้าด้วยกันเพื่อสร้าง Data Model เช่น โมเดลของบัญชีธนาคาร (Account):",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "ตัวอย่างนิยาม Struct บัญชีธนาคาร",
          "c": "type Account struct {\n\tID       int64  // รหัสบัญชี\n\tOwner    string // ชื่อเจ้าของบัญชี\n\tBalance  int64  // ยอดเงินคงเหลือในหน่วยสตางค์/เซนต์\n\tCurrency string // สกุลเงิน เช่น USD, EUR, THB\n}",
        },
        {
          "t": "h2",
          "c": "3. Pointer: ส่งสำเนา (Copy) หรือส่งตัวจริง (Pointer)?",
        },
        {
          "t": "p",
          "c": "ภาษา Go เป็นภาษาแบบ **Pass by Value (ส่งค่าแบบทำสำเนา)** โดยค่าเริ่มต้นเสมอ ถ้าเราส่งตัวแปรเข้าไปในฟังก์ชัน ฟังก์ชันจะได้แค่ 'สำเนา' ไปใช้งาน การแก้ไขค่าในสำเนาจะไม่มีผลกระทบต่อตัวแปรต้นทางเลย",
        },
        {
          "t": "p",
          "c": "ลองดูตัวอย่างคลาสสิกของการฝากเงิน 2 ฟังก์ชันนี้:",
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "เปรียบเทียบ Pass by Value vs Pass by Pointer",
          "code": "package main\n\nimport \"fmt\"\n\ntype Account struct {\n\tOwner   string\n\tBalance int64\n}\n\n// รับเป็น Account ธรรมดา (Copy สำเนามา)\nfunc depositCopy(a Account, amount int64) {\n\ta.Balance += amount\n}\n\n// รับเป็น *Account (Pointer ชี้ไปยังที่อยู่ Address ของตัวแปรจริง)\nfunc depositPointer(a *Account, amount int64) {\n\ta.Balance += amount\n}\n\nfunc main() {\n\tacc := Account{Owner: \"alice\", Balance: 100}\n\n\tdepositCopy(acc, 50)\n\tfmt.Println(\"หลังเรียก depositCopy:   \", acc.Balance)\n\n\tdepositPointer(&acc, 50) // ส่ง & (Memory Address) เข้าไป\n\tfmt.Println(\"หลังเรียก depositPointer:\", acc.Balance)\n}",
          "out": "หลังเรียก depositCopy:    100\nหลังเรียก depositPointer: 150",
        },
        {
          "t": "callout",
          "title": "📌 สรุปกฎเหล็กเรื่อง Pointer",
          "c": "• `&acc` คือการหาตำแหน่งที่อยู่ในหน่วยความจำ (Memory Address) ของ `acc`\n• `*Account` คือชนิดข้อมูลที่บอกว่าเป็น 'Pointer ที่ชี้ไปยัง Account'\n• ถ้าต้องการให้ฟังก์ชันแก้ไขข้อมูลใน Struct ตัวจริง หรือ Struct มีขนาดใหญ่และไม่อยากเสียเวลาคัดลอกข้อมูลซ้ำซ้อน ให้ส่งเป็น Pointer เสมอ",
        },
        {
          "t": "h2",
          "c": "4. การจัดการ Error แบบ Idiomatic Go",
        },
        {
          "t": "p",
          "c": "ในภาษาอื่นๆ เช่น Java, Python หรือ TypeScript เมื่อเกิดข้อผิดพลาดจะใช้กลไก `try / catch / throw` แต่ในภาษา Go **Error คือค่าธรรมดาค่าหนึ่ง (Values are Values)** ที่ฟังก์ชันจะส่งกลับมาเป็นค่าสุดท้ายเสมอ:",
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "การสร้าง Sentinel Error และตรวจสอบด้วย errors.Is",
          "code": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\n// ประกาศ Sentinel Error ระดับแพ็กเกจ เพื่อให้ผู้เรียกใช้นำไปเปรียบเทียบได้\nvar ErrInsufficientFunds = errors.New(\"insufficient funds\")\n\nfunc withdraw(balance, amount int64) (int64, error) {\n\tif amount > balance {\n\t\treturn balance, ErrInsufficientFunds\n\t}\n\treturn balance - amount, nil\n}\n\nfunc main() {\n\tbalance, err := withdraw(100, 500)\n\tif err != nil {\n\t\tif errors.Is(err, ErrInsufficientFunds) {\n\t\t\tfmt.Println(\"ตรวจพบเงินไม่พอ:\", err)\n\t\t}\n\t}\n\n\t// ห่อข้อมูลบริบทเพิ่มเติมด้วย %w (Error Wrapping)\n\twrappedErr := fmt.Errorf(\"ธุรกรรมหมายเลข 42 ล้มเหลว: %w\", err)\n\tfmt.Println(\"Error เต็ม:\", wrappedErr)\n\tfmt.Println(\"ยังเป็น ErrInsufficientFunds อยู่ไหม?:\", errors.Is(wrappedErr, ErrInsufficientFunds))\n}",
          "out": "ตรวจพบเงินไม่พอ: insufficient funds\nError เต็ม: ธุรกรรมหมายเลข 42 ล้มเหลว: insufficient funds\nยังเป็น ErrInsufficientFunds อยู่ไหม?: true",
        },
        {
          "t": "h2",
          "c": "5. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "details",
          "summary": "❓ คำถามที่ 1: ถ้าต้องการเก็บยอดเงิน 25.75 ดอลลาร์สหรัฐใน Struct ควรใช้ชนิดข้อมูลใด?",
          "c": [
            {
              "t": "p",
              "c": "**คำตอบ**: ควรใช้ `int64` และเก็บค่าเป็น `2575` (หน่วยเซนต์) เพื่อป้องกันปัญหาความคลาดเคลื่อนของเลขฐานสองใน Floating-Point (IEEE 754)",
            },
          ],
        },
        {
          "t": "details",
          "summary": "❓ คำถามที่ 2: เครื่องหมาย `%w` ใน `fmt.Errorf` มีประโยชน์อย่างไรเทียบกับ `%v`?",
          "c": [
            {
              "t": "p",
              "c": "**คำตอบ**: `%w` คือการทำ **Wrap Error** ซึ่งเป็นการห่อ Error เดิมไว้ข้างใน ทำให้ฟังก์ชันระดับบนยังสามารถใช้ `errors.Is(err, TargetErr)` เจาะเข้าไปตรวจสอบ Error ต้นฉบับได้ ในขณะที่ `%v` จะแปลง Error ให้กลายเป็นข้อความ String ธรรมดา ทำให้สูญเสียความสามารถในการใช้ `errors.Is` ไป",
            },
          ],
        },
        {
          "t": "h2",
          "c": "6. โจทย์ฝึกฝน (Hands-on Challenge)",
        },
        {
          "t": "p",
          "c": "เขียนฟังก์ชัน `Transfer(from, to *Account, amount int64) error` ที่ทำการหักเงินจาก `from` และเพิ่มเงินให้ `to` หากยอดเงินใน `from` ไม่พอ ให้ส่งกลับ `ErrInsufficientFunds` โดยยอดเงินของทั้งสองบัญชีต้องไม่เปลี่ยนแปลง",
        },
        {
          "t": "solution",
          "summary": "เฉลยวิธีทำโจทย์ Transfer ด้วย Pointer",
          "c": [
            {
              "t": "code",
              "lang": "go",
              "label": "solution.go",
              "c": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nvar ErrInsufficientFunds = errors.New(\"insufficient funds\")\n\ntype Account struct {\n\tOwner   string\n\tBalance int64\n}\n\nfunc Transfer(from, to *Account, amount int64) error {\n\tif from.Balance < amount {\n\t\treturn ErrInsufficientFunds\n\t}\n\tfrom.Balance -= amount\n\tto.Balance += amount\n\treturn nil\n}\n\nfunc main() {\n\talice := &Account{Owner: \"Alice\", Balance: 1000}\n\tbob := &Account{Owner: \"Bob\", Balance: 500}\n\n\terr := Transfer(alice, bob, 300)\n\tfmt.Printf(\"ผลการโอน: err=%v | Alice=%d, Bob=%d\\n\", err, alice.Balance, bob.Balance)\n}",
            },
          ],
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "พื้นฐานแน่นแล้ว! ในบทที่ **1.2 Go สำหรับ Backend** เราจะมาต่อยอดสู่หัวใจของระบบขนาดใหญ่: Method Receivers, Interfaces, Defer และ Context กันครับ",
        },
      ],
      en: [],
    },
  },

  "bank-go-backend-primer": {
    slug: "bank-go-backend-primer",
    title: {
      th: "1.2 Go สำหรับ Backend: Method, Interface, Defer & Context",
      en: "1.2 Go for Backend: Method, Interface, Defer & Context",
    },
    lead: {
      th: "เจาะลึก 4 เสาหลักที่ระบบ Backend ต้องพึ่งพา: การเขียน Method Receiver, Interface และ DBTX, การคืนทรัพยากรด้วย Defer และการจัดการ Timeout ด้วย Context",
      en: "The 4 pillars of Go backend development: Method receivers, Interfaces & DBTX pattern, Defer cleanup, and Context timeouts.",
    },
    group: "1. ปูพื้นฐานภาษา Go สำหรับ Backend",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• เข้าใจความแตกต่างระหว่าง Value Receiver และ Pointer Receiver ใน Method\n• เข้าใจปรัชญาของ Interface ใน Go ผ่านตัวอย่างคลาสสิก Shape และเห็นภาพการนำไปใช้สร้าง DBTX Interface\n• รู้วิธีใช้ `defer` คืนทรัพยากรแบบ LIFO และการใช้ `context.WithTimeout` จัดการคิวรีที่ช้าผิดปกติ\n\n⏱ **เวลาในการเรียนรู้**: ~25 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านบท 1.1 ไวยากรณ์ Go พื้นฐาน",
        },
        {
          "t": "h2",
          "c": "1. Method Receiver: การผูกฟังก์ชันเข้ากับ Struct",
        },
        {
          "t": "p",
          "c": "ใน Go เราสามารถเพิ่มพฤติกรรม (Method) ให้กับ Struct ได้โดยการใส่ **Receiver** ไว้ข้างหน้าชื่อฟังก์ชัน ซึ่งมี 2 รูปแบบที่ต้องระวังอย่างยิ่ง:",
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างคลาสสิก: บั๊กเมื่อลืมใส่ Pointer ใน Receiver",
          "code": "package main\n\nimport \"fmt\"\n\ntype Account struct {\n\tOwner   string\n\tBalance int64\n}\n\n// ❌ Value Receiver: ทำงานบนสำเนา การเปลี่ยนค่า Balance จะหายไปทันทีเมื่อจบฟังก์ชัน!\nfunc (a Account) DepositBug(amount int64) {\n\ta.Balance += amount\n}\n\n// ✅ Pointer Receiver: ชี้ไปยังตัวจริง ยอดเงินจะเพิ่มขึ้นจริง\nfunc (a *Account) Deposit(amount int64) {\n\ta.Balance += amount\n}\n\nfunc main() {\n\tacc := Account{Owner: \"bob\", Balance: 100}\n\n\tacc.DepositBug(50)\n\tfmt.Println(\"เรียก DepositBug (Value):  \", acc.Balance)\n\n\tacc.Deposit(50)\n\tfmt.Println(\"เรียก Deposit (Pointer):   \", acc.Balance)\n}",
          "out": "เรียก DepositBug (Value):   100\nเรียก Deposit (Pointer):    150",
        },
        {
          "t": "callout",
          "title": "💡 กฎการเลือกใช้ Receiver",
          "c": "• ถ้าเมธอดนั้นต้อง **แก้ไขข้อมูล (Mutate)** ใน Struct → **ต้องใช้ Pointer Receiver `(a *Account)`**\n• ถ้าเมธอดนั้นแค่ **อ่านข้อมูล (Read-only)** หรือแสดงผลข้อความ String → สามารถใช้ Value Receiver `(a Account)` ได้",
        },
        {
          "t": "h2",
          "c": "2. Interface: ไม่ต้องมีคำว่า implements",
        },
        {
          "t": "p",
          "c": "Interface ในภาษา Go มีเอกลักษณ์ที่พิเศษมาก คือเป็นการทำ **Implicit Implementation (การผูกแบบอัตโนมัติ)** ขอเพียงแค่ Struct นั้นมี Method ครบตามที่ Interface ระบุไว้ ก็จะถือว่าใช้งาน Interface นั้นได้ทันทีโดยไม่ต้องเขียนคีย์เวิร์ด `implements`:",
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างคลาสสิก: Interface รูปทรงเรขาคณิต (Shape)",
          "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"math\"\n)\n\n// กำหนดสัญญา (Contract) ว่าใครมีเมธอด Area() จะถือว่าเป็น Shape ทั้งหมด\nttype Shape interface {\n\tArea() float64\n}\n\ntype Rect struct{ W, H float64 }\ntype Circle struct{ R float64 }\n\nfunc (r Rect) Area() float64   { return r.W * r.H }\nfunc (c Circle) Area() float64 { return math.Pi * c.R * c.R }\n\nfunc printArea(s Shape) {\n\tfmt.Printf(\"%T คำนวณพื้นที่ได้ = %.2f\\n\", s, s.Area())\n}\n\nfunc main() {\n\tprintArea(Rect{W: 3, H: 4})\n\tprintArea(Circle{R: 2})\n}",
          "out": "main.Rect คำนวณพื้นที่ได้ = 12.00\nmain.Circle คำนวณพื้นที่ได้ = 12.57",
        },
        {
          "t": "callout",
          "title": "🏦 แล้วสิ่งนี้ไปใช้ตรงไหนในโปรเจกต์ Simple Bank?",
          "c": "ในบทที่ 3 เราจะต้องเขียนฟังก์ชันยิงคำสั่ง SQL ซึ่งบางครั้งเราต้องการยิงผ่านการเชื่อมต่อฐานข้อมูลปกติ (`*sql.DB`) แต่บางครั้งในขั้นตอนโอนเงิน เราต้องการยิงคำสั่งเหล่านั้นผ่าน Transaction (`*sql.Tx`)\n\nด้วยพลังของ Interface เราสามารถสร้าง Interface ชื่อ `DBTX` ขึ้นมา:\n```go\ntype DBTX interface {\n    ExecContext(ctx context.Context, query string, args ...any) (sql.Result, error)\n    QueryContext(ctx context.Context, query string, args ...any) (*sql.Rows, error)\n    QueryRowContext(ctx context.Context, query string, args ...any) *sql.Row\n}\n```\nทั้ง `*sql.DB` และ `*sql.Tx` ใน Go ต่างมีทั้ง 3 เมธอดนี้อยู่แล้ว ทำให้ฟังก์ชัน CRUD ของเราสามารถรับ `DBTX` เข้ามา แล้วนำไปรันได้ทั้งแบบธรรมดาและแบบ Transaction ได้อย่างไร้รอยต่อโดยไม่ต้องเขียนโค้ดซ้ำ!",
        },
        {
          "t": "h2",
          "c": "3. Defer: การคืนทรัพยากรแบบ LIFO",
        },
        {
          "t": "p",
          "c": "คำสั่ง `defer` ใช้สำหรับสั่งให้ฟังก์ชันทำงานในจังหวะสุดท้าย **ก่อนที่ฟังก์ชันแม่จะจบการทำงาน (Return)** เสมอ ไม่ว่าฟังก์ชันนั้นจะจบแบบปกติหรือเกิด Error กลางทางก็ตาม โดยทำงานแบบ Last-In, First-Out (LIFO - ตัวที่สั่ง defer ทีหลังสุดจะทำงานก่อน):",
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างคลาสสิก: ลำดับการทำงานของ defer (LIFO)",
          "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"เริ่มต้นทำงาน\")\n\tfor i := 1; i <= 3; i++ {\n\t\tdefer fmt.Println(\"defer หมายเลข:\", i)\n\t}\n\tfmt.Println(\"จบการทำงานของ main\")\n}",
          "out": "เริ่มต้นทำงาน\nจบการทำงานของ main\ndefer หมายเลข: 3\ndefer หมายเลข: 2\ndefer หมายเลข: 1",
        },
        {
          "t": "callout",
          "title": "📌 การใช้งานจริงใน Backend",
          "c": "เราจะใช้ `defer` ทันทีหลังเปิดทรัพยากรเสมอ เพื่อรับประกันว่าจะไม่มี Connection รั่วไหล (Connection Leak):\n```go\nconn, err := db.Open(dsn)\nif err != nil {\n    return err\n}\ndefer conn.Close() // รับประกันว่าจะถูกปิดแน่นอนเมื่อจบฟังก์ชัน\n```",
        },
        {
          "t": "h2",
          "c": "4. Context: ควบคุม Lifecycle และ Timeout ของ Request",
        },
        {
          "t": "p",
          "c": "ในระบบเครือข่ายและฐานข้อมูล เราไม่สามารถปล่อยให้คำสั่ง SQL ค้างรอได้ตลอดไป ถ้าฐานข้อมูลช้าหรือเน็ตเวิร์กหลุด คำสั่งควรจะตัดจบภายในเวลาที่กำหนด (Timeout) เราใช้ `context.Context` ในการควบคุมเรื่องนี้:",
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างคลาสสิก: การตั้ง Timeout ด้วย context.WithTimeout",
          "code": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc slowQuery(ctx context.Context, d time.Duration) error {\n\tselect {\n\tcase <-time.After(d):\n\t\treturn nil // คิวรีเสร็จทันเวลา\n\tcase <-ctx.Done():\n\t\treturn ctx.Err() // หมดเวลาก่อน หรือถูกยกเลิก\n\t}\n}\n\nfunc main() {\n\t// กำหนดเพดานเวลา 1 วินาที\n\tctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)\n\tdefer cancel()\n\n\tfmt.Println(\"คิวรีเร็ว (100ms):\", slowQuery(ctx, 100*time.Millisecond))\n\tfmt.Println(\"คิวรียาว (3s):   \", slowQuery(ctx, 3*time.Second))\n}",
          "out": "คิวรีเร็ว (100ms): <nil>\nคิวรียาว (3s):    context deadline exceeded",
        },
        {
          "t": "h2",
          "c": "5. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "details",
          "summary": "❓ คำถาม: ถ้าเราสั่ง defer a(); defer b(); defer c(); ฟังก์ชันไหนจะถูกเรียกทำงานเป็นลำดับแรกเมื่อจบฟังก์ชัน?",
          "c": [
            {
              "t": "p",
              "c": "**คำตอบ**: ฟังก์ชัน `c()` จะทำงานเป็นลำดับแรก ตามด้วย `b()` และ `a()` ตามลำดับ เพราะกลไกของ `defer` ทำงานแบบ Stack คือ Last-In, First-Out (LIFO)",
            },
          ],
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "ไวยากรณ์และกลไก Go พร้อมลุยโปรเจกต์แล้ว! ในโมดูลที่ 2 บทที่ **2.1 ออกแบบ Schema & สมุดบัญชีแยกประเภท (Ledger)** เราจะเริ่มออกแบบโครงสร้างตารางฐานข้อมูลของธนาคารกันครับ",
        },
      ],
      en: [],
    },
  },
};
