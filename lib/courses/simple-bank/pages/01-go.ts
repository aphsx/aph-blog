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
          "t": "quiz",
          "c": [
            {
              "question": "ถ้าต้องการเก็บยอดเงิน 25.75 ดอลลาร์สหรัฐใน Struct ของระบบธนาคาร ควรใช้ชนิดข้อมูลใดจึงจะถูกต้องตามมาตรฐาน?",
              "options": [
                {
                  "text": "float64 โดยเก็บเป็นค่า 25.75",
                  "isCorrect": false,
                  "explain": "float64 มีความเพี้ยนของเลขฐานสอง (IEEE 754) ห้ามใช้เก็บเงินเด็ดขาด",
                },
                {
                  "text": "int64 โดยแปลงเป็นหน่วยย่อยที่สุด (2575 เซนต์)",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! การแปลงเป็นหน่วยเซนต์/สตางค์และเก็บด้วย int64 รับประกันความแม่นยำ 100% ไร้การปัดเศษเพี้ยน",
                },
                {
                  "text": "string โดยเก็บเป็นข้อความ \"25.75\"",
                  "isCorrect": false,
                  "explain": "string ไม่สามารถนำไปคำนวณ บวก ลบ หรือสร้าง Constraint ใน Database ได้อย่างมีประสิทธิภาพ",
                },
              ],
            },
            {
              "question": "เครื่องหมาย %w ใน fmt.Errorf มีจุดเด่นแตกต่างจาก %v อย่างไร?",
              "options": [
                {
                  "text": "%w ทำการ Wrap Error ไว้ข้างใน ทำให้ฟังก์ชันระดับบนยังใช้ errors.Is ตรวจสอบ Error ต้นฉบับได้",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! %w จะคงสายสัมพันธ์ของ Error ไว้ให้ errors.Is และ errors.As แกะดูได้ ในขณะที่ %v จะตัดทอนกลายเป็น string ธรรมดา",
                },
                {
                  "text": "%w ช่วยเพิ่มความเร็วในการคอมไพล์โค้ดให้เร็วขึ้น 2 เท่า",
                  "isCorrect": false,
                  "explain": "%w เป็นฟอร์แมตจัดรูปแบบสตริง ไม่เกี่ยวข้องกับความเร็วของคอมไพเลอร์",
                },
                {
                  "text": "%w ใช้สำหรับพิมพ์ Pointer Address เท่านั้น",
                  "isCorrect": false,
                  "explain": "การพิมพ์ Pointer Address ใน Go ใช้ %p",
                },
              ],
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
      th: "เจาะลึก 4 เสาหลักที่ระบบ Backend ต้องพึ่งพา: การเขียน Method Receiver, Interface สำหรับสลับโหมด DB/Transaction, การคืนสายเชื่อมต่อด้วย Defer และการส่งต่อ Context",
      en: "The 4 pillars of Go backend development: Method receivers, Interfaces & DBTX pattern, Defer cleanup, and Context propagation.",
    },
    group: "1. ปูพื้นฐานภาษา Go สำหรับ Backend",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• เข้าใจความแตกต่างระหว่าง Value Receiver และ Pointer Receiver เวลาผูกฟังก์ชันเข้ากับ Struct\n• เข้าใจการทำงานของ Interface ใน Go ผ่านการจำลอง `Queries` ที่รับได้ทั้ง DB ปกติและ Transaction (`DBTX`)\n• รู้วิธีใช้ `defer` เพื่อรับประกันการคืนสายเชื่อมต่อฐานข้อมูลเสมอแม้เกิด Error กลางทาง\n• เข้าใจว่า `ctx context.Context` คืออะไร ส่งมาจากต้นทางไหน และทำไมต้องเป็นพารามิเตอร์ตัวแรกของฟังก์ชันเสมอ\n\n⏱ **เวลาในการเรียนรู้**: ~25 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านบท 1.1 ไวยากรณ์ Go พื้นฐาน",
        },
        {
          "t": "h2",
          "c": "1. Method Receiver: การผูกฟังก์ชันให้เป็นความสามารถของ Struct",
        },
        {
          "t": "p",
          "c": "ในภาษา Go เราสามารถผูกฟังก์ชันให้กลายเป็น **เมธอด (Method)** ของ Struct ได้โดยการใส่ **Receiver** ไว้ข้างหน้าชื่อฟังก์ชัน เช่น `func (a *Account) Deposit(...)` ซึ่งมี 2 รูปแบบที่ต้องระวัง:",
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "เปรียบเทียบ Value Receiver vs Pointer Receiver",
          "code": "package main\n\nimport \"fmt\"\n\ntype Account struct {\n\tOwner   string\n\tBalance int64\n}\n\n// ❌ Value Receiver (a Account): ทำงานบนสำเนา การเปลี่ยนค่าจะหายไปเมื่อจบฟังก์ชัน!\nfunc (a Account) DepositBug(amount int64) {\n\ta.Balance += amount\n}\n\n// ✅ Pointer Receiver (a *Account): ชี้ไปยังตัวจริง ยอดเงินเพิ่มขึ้นจริง\nfunc (a *Account) Deposit(amount int64) {\n\ta.Balance += amount\n}\n\nfunc main() {\n\tacc := Account{Owner: \"bob\", Balance: 100}\n\n\tacc.DepositBug(50)\n\tfmt.Println(\"เรียก DepositBug (Value):  \", acc.Balance)\n\n\tacc.Deposit(50)\n\tfmt.Println(\"เรียก Deposit (Pointer):   \", acc.Balance)\n}",
          "out": "เรียก DepositBug (Value):   100\nเรียก Deposit (Pointer):    150",
        },
        {
          "t": "callout",
          "title": "🏦 ในบทที่ 3 เราจะใช้สิ่งนี้ตรงไหน?",
          "c": "ในบทที่ 3 เราจะสร้างตัวรวมคำสั่ง SQL ชื่อ `Queries` แล้วผูกฟังก์ชัน CRUD ทั้งหมดเข้ากับ `*Queries` ด้วย Pointer Receiver เช่น:\n```go\nfunc (q *Queries) CreateAccount(...) (Account, error)\nfunc (q *Queries) GetAccount(...) (Account, error)\n```\nเพื่อให้ทุกฟังก์ชันสามารถหยิบสายเชื่อมต่อฐานข้อมูลที่เก็บไว้ข้างใน `q` ออกมาใช้งานได้ทันทีโดยไม่ต้องส่งสายเชื่อมต่อเป็นพารามิเตอร์ซ้ำๆ ทุกครั้งครับ",
        },
        {
          "t": "h2",
          "c": "2. Interface: สลับโหมด DB ปกติกับ Transaction ได้โดยไม่ต้องเขียนโค้ดซ้ำ",
        },
        {
          "t": "p",
          "c": "โจทย์ใหญ่ของระบบธนาคารคือ: เรามีฟังก์ชันคำสั่ง SQL เช่น `CreateAccount` หรือ `AddAccountBalance` ซึ่งบางครั้งเราอยากรันผ่าน **การเชื่อมต่อฐานข้อมูลปกติ (`NormalDB`)** แต่ในจังหวะโอนเงิน 5 ขั้นตอน เราอยากรันฟังก์ชันเดิมนี้ผ่าน **โหมดมัดรวมธุรกรรม (`TxDB`)** แทน",
        },
        {
          "t": "p",
          "c": "ถ้าไม่มี **Interface** เราจะต้องก๊อปปี้ฟังก์ชัน SQL ทุกตัวแยกเป็น 2 เวอร์ชัน! แต่ใน Go ขอเพียงแค่ Struct สองตัวมีชื่อเมธอดเหมือนกันเป๊ะ เราสามารถสร้าง `interface` มาเป็น **'ปลั๊กกลาง'** ที่เสียบตัวไหนเข้ามาก็ทำงานได้ทันที (โดยไม่ต้องพิมพ์คำว่า `implements`):",
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "จำลองสถาปัตยกรรม DBTX และ Queries ของ Simple Bank แบบย่อส่วน",
          "code": "package main\n\nimport \"fmt\"\n\n// 1. สร้างปลั๊กกลาง (Interface): ใครที่มีเมธอด ExecSQL ถือว่าเป็น DBTX ทั้งหมด\ntype DBTX interface {\n\tExecSQL(query string)\n}\n\n// 2. โหมดเชื่อมต่อฐานข้อมูลปกติ มีเมธอด ExecSQL\ntype NormalDB struct{}\n\nfunc (db NormalDB) ExecSQL(query string) {\n\tfmt.Println(\"[โหมด DB ปกติ]      รันคำสั่ง:\", query)\n}\n\n// 3. โหมด Transaction (โอนเงิน) ก็มีเมธอด ExecSQL เหมือนกันเป๊ะ\ntype TxDB struct{}\n\nfunc (tx TxDB) ExecSQL(query string) {\n\tfmt.Println(\"[โหมด Transaction] รันคำสั่ง:\", query)\n}\n\n// 4. Queries เก็บปลั๊กกลาง DBTX เอาไว้ ไม่ผูกติดกับตัวใดตัวหนึ่ง\ntype Queries struct {\n\tdb DBTX\n}\n\nfunc (q *Queries) CreateAccount(owner string) {\n\tq.db.ExecSQL(\"INSERT INTO accounts VALUES (\" + owner + \")\")\n}\n\nfunc main() {\n\t// ใช้งานในโหมดปกติ\n\tnormalQueries := &Queries{db: NormalDB{}}\n\tnormalQueries.CreateAccount(\"alice\")\n\n\t// นำฟังก์ชัน CreateAccount ตัวเดิมไปรันในโหมด Transaction ได้ทันที!\n\ttxQueries := &Queries{db: TxDB{}}\n\ttxQueries.CreateAccount(\"bob\")\n}",
          "out": "[โหมด DB ปกติ]      รันคำสั่ง: INSERT INTO accounts VALUES (alice)\n[โหมด Transaction] รันคำสั่ง: INSERT INTO accounts VALUES (bob)",
        },
        {
          "t": "callout",
          "title": "💡 จำโครงสร้างในโค้ดข้างบนไว้ให้ดี!",
          "c": "โค้ดจำลอง 30 บรรทัดข้างบนนี้คือ **โครงสร้างเดียวกับที่เราจะเขียนจริงในบทที่ 3 และบทที่ 4 แบบ 100%**! ในของจริง ของในไลบรารีมาตรฐาน Go ทั้ง `*sql.DB` (โหมดปกติ) และ `*sql.Tx` (โหมด Transaction) ต่างมีเมธอดรัน SQL ชื่อ `ExecContext`, `QueryContext`, และ `QueryRowContext` เหมือนกันเป๊ะ เราจึงสร้าง `type DBTX interface` มารับได้ทั้งคู่โดยเขียนโค้ด CRUD แค่ชุดเดียวครับ",
        },
        {
          "t": "h2",
          "c": "3. Defer: รับประกันการคืนสายเชื่อมต่อฐานข้อมูลเสมอ (LIFO)",
        },
        {
          "t": "p",
          "c": "ในระบบฐานข้อมูลจะมีสระเก็บสายเชื่อมต่อ (Connection Pool) ที่มีจำนวนจำกัด เช่น 25 เส้น เมื่อฟังก์ชันใดยืมสายไปดึงข้อมูลหลายแถว แล้วเกิด Error กลางคันจนเผลอ `return` ออกไปก่อนปิดสาย สายเส้นนั้นจะค้างเติ่งไม่ถูกคืนเข้าสระ (เรียกว่า **Connection Leak**) จนเซิร์ฟเวอร์ล่มทั้งระบบ",
        },
        {
          "t": "p",
          "c": "คำสั่ง **`defer`** จึงมีไว้เพื่อสั่งว่า: **'ไม่ว่าฟังก์ชันนี้จะจบลงแบบปกติ หรือพังเพราะ Error ตรงบรรทัดไหนก็ตาม ให้รันคำสั่งปิดทรัพยากรนี้เป็นสิ่งสุดท้ายก่อนออกจากฟังก์ชันเสมอ!'** (หากมีหลาย `defer` จะทำงานย้อนกลับแบบ **LIFO: Last-In, First-Out** คือตัวที่สั่งทีหลังสุดจะทำงานก่อน):",
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "การใช้ defer เพื่อรับประกันการคืนสายเชื่อมต่อแม้เกิด Error กลางทาง",
          "code": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nfunc listAccounts(shouldFail bool) error {\n\tfmt.Println(\"1. ยืมสายเชื่อมต่อจาก Pool มาเริ่มอ่านข้อมูล (rows)\")\n\n\t// จองคิวคืนสายเชื่อมต่อไว้ล่วงหน้าทันที!\n\tdefer fmt.Println(\"3. [defer ทำงานอัตโนมัติ] ปิด rows และคืนสายเชื่อมต่อกลับเข้า Pool สำเร็จ!\")\n\n\tif shouldFail {\n\t\tfmt.Println(\"2. ❌ เกิดข้อผิดพลาดระหว่างอ่านข้อมูล! สั่ง return ออกทันที\")\n\t\treturn errors.New(\"scan error\")\n\t}\n\n\tfmt.Println(\"2. ✅ อ่านข้อมูลครบทุกแถวสำเร็จ\")\n\treturn nil\n}\n\nfunc main() {\n\tfmt.Println(\"--- กรณีทำงานเกิด Error กลางคัน ---\")\n\t_ = listAccounts(true)\n}",
          "out": "--- กรณีทำงานเกิด Error กลางคัน ---\n1. ยืมสายเชื่อมต่อจาก Pool มาเริ่มอ่านข้อมูล (rows)\n2. ❌ เกิดข้อผิดพลาดระหว่างอ่านข้อมูล! สั่ง return ออกทันที\n3. [defer ทำงานอัตโนมัติ] ปิด rows และคืนสายเชื่อมต่อกลับเข้า Pool สำเร็จ!",
        },
        {
          "t": "h2",
          "c": "4. Context (ctx): สายสัญญาณควบคุมเวลาที่ส่งต่อจากต้นน้ำสู่ฐานข้อมูล",
        },
        {
          "t": "p",
          "c": "เมื่อคุณเปิดอ่านโค้ด Go Backend หรือโค้ดในบทที่ 3 คุณจะเห็นว่าแทบทุกฟังก์ชันต้องรับพารามิเตอร์ตัวแรกสุดหน้าตาแบบนี้เสมอ:\n`func (q *Queries) CreateAccount(ctx context.Context, arg CreateAccountParams)`",
        },
        {
          "t": "p",
          "c": "หลายคนสงสัยว่า **`ctx context.Context` คืออะไร และใครเป็นคนส่งเข้ามา?**\nให้จินตนาการว่า `ctx` คือ **'สายสัญญาณควบคุมเวลาและการยกเลิกคำสั่ง'** ที่ผูกติดไปกับคำขอของลูกค้าตั้งแต่ก้าวแรกที่เข้ามาในเซิร์ฟเวอร์:",
        },
        {
          "t": "ul",
          "c": [
            "**ถ้าไม่มี `ctx`**: สมมติลูกค้ากดดูรายการเดินบัญชีผ่านมือถือ แต่จังหวะนั้นเน็ตลูกค้าหลุดหรือลูกค้ากดปิดแอปหนีไปแล้ว ถ้าไม่มี `ctx` ฐานข้อมูล PostgreSQL จะไม่รู้เรื่องเลยและยังคงก้มหน้าก้มตารันคำสั่ง SQL ค้นหาข้อมูลต่อไปเรื่อยๆ จนเปลือง CPU ฟรี",
            "**เมื่อส่ง `ctx` ต่อไปให้ทุกฟังก์ชัน**: ทันทีที่ลูกค้าปิดแอป หรือคำสั่ง SQL ใช้เวลานานเกินกำหนด (Timeout เช่น เกิน 2 วินาที) สายสัญญาณ `ctx` จะส่งสัญญาณ **ยกเลิก (Cancel)** ทะลุไปถึงฐานข้อมูลเพื่อให้หยุดทำงานทันที!",
          ],
        },
        {
          "t": "p",
          "c": "**แล้วต้นทางของ `ctx` สร้างมาจากไหน? มี 2 ต้นทางหลักที่เราจะได้ใช้จริง:**",
        },
        {
          "t": "ol",
          "c": [
            "**`context.Background()` (Context ตั้งต้นเปล่าๆ ไม่มีวันหมดเวลา)**: ใช้เมื่อเราเป็นคนเริ่มรันโปรแกรมเองโดยยังไม่มีกำหนดเวลา เช่น ตอนเริ่มต้นฟังก์ชัน `main()` หรือตอนรัน **Unit Test ในบทที่ 3.2**",
            "**`context.WithTimeout(parentCtx, เวลา)` หรือ Context จาก HTTP Request (บทที่ 6)**: ใช้ห่อ Context ตั้งต้นเพื่อกำหนดเพดานเวลาตายตัว เช่น ห้ามรันคำสั่งฐานข้อมูลเกิน 2 วินาที",
          ],
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "จำลองการส่งต่อ ctx และ Parameter Struct เข้าสู่ฟังก์ชัน CreateAccount",
          "code": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\n// มัดรวมข้อมูลขาเข้าไว้ใน Struct (Parameter Struct) เพื่อให้ตอนเรียกใช้ระบุชื่อฟิลด์ชัดเจน\ntype CreateAccountParams struct {\n\tOwner    string\n\tBalance  int64\n\tCurrency string\n}\n\n// ฟังก์ชันรับ ctx เป็นตัวแรกเสมอ ตามด้วยก้อนข้อมูล arg\nfunc CreateAccount(ctx context.Context, arg CreateAccountParams) error {\n\t// ตรวจสอบว่าสายสัญญาณ ctx ถูกยกเลิกหรือหมดเวลาไปหรือยัง\n\tif err := ctx.Err(); err != nil {\n\t\treturn fmt.Errorf(\"ยกเลิกการสร้างบัญชีของ %s เพราะ: %w\", arg.Owner, err)\n\t}\n\n\tfmt.Printf(\"✅ สร้างบัญชีสำเร็จ -> เจ้าของ: %s, ยอดเงิน: %d %s\\n\", arg.Owner, arg.Balance, arg.Currency)\n\treturn nil\n}\n\nfunc main() {\n\t// กรณีที่ 1: ส่ง context.Background() (เช่น ตอนรัน Unit Test ในบทที่ 3.2)\n\tbgCtx := context.Background()\n\t_ = CreateAccount(bgCtx, CreateAccountParams{\n\t\tOwner:    \"alice\",\n\t\tBalance:  1000,\n\t\tCurrency: \"USD\",\n\t})\n\n\t// กรณีที่ 2: ตั้งเวลา Timeout ไว้แค่ 10 มิลลิวินาที แต่ระบบช้าไป 50 มิลลิวินาที\n\ttimeoutCtx, cancel := context.WithTimeout(context.Background(), 10*time.Millisecond)\n\tdefer cancel()\n\n\ttime.Sleep(50 * time.Millisecond) // จำลองว่าเซิร์ฟเวอร์ทำงานช้าจนเกินเวลา\n\terr := CreateAccount(timeoutCtx, CreateAccountParams{\n\t\tOwner:    \"bob\",\n\t\tBalance:  500,\n\t\tCurrency: \"THB\",\n\t})\n\tfmt.Println(\"❌ ผลลัพธ์เมื่อเกินเวลา:\", err)\n}",
          "out": "✅ สร้างบัญชีสำเร็จ -> เจ้าของ: alice, ยอดเงิน: 1000 USD\n❌ ผลลัพธ์เมื่อเกินเวลา: ยกเลิกการสร้างบัญชีของ bob เพราะ: context deadline exceeded",
        },
        {
          "t": "h2",
          "c": "5. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ถ้าเราเขียนคำสั่ง defer a(); defer b(); defer c(); ฟังก์ชันไหนจะถูกเรียกทำงานเป็นลำดับแรกสุดเมื่อฟังก์ชันแม่จบการทำงาน?",
              "options": [
                {
                  "text": "ฟังก์ชัน c() จะทำงานก่อนเพื่อน เพราะ defer ทำงานแบบ LIFO (Last-In, First-Out)",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! defer ทำงานแบบ Stack คือคำสั่งที่ถูกสั่งทีหลังสุด (LIFO) จะถูก Pop ออกมาทำงานก่อน",
                },
                {
                  "text": "ฟังก์ชัน a() จะทำงานก่อนเพื่อน เพราะถูกประกาศเป็นบรรทัดแรก (FIFO)",
                  "isCorrect": false,
                  "explain": "defer ไม่ได้ทำงานแบบคิว FIFO แต่ทำงานแบบ Stack LIFO ครับ",
                },
                {
                  "text": "ทั้ง 3 ฟังก์ชันจะทำงานพร้อมกันแบบคู่ขนาน (Concurrent)",
                  "isCorrect": false,
                  "explain": "defer ทำงานเรียงตามลำดับใน Goroutine เดิม ไม่ได้เปิด Goroutine ใหม่",
                },
              ],
            },
            {
              "question": "ทำไม Method ที่ต้องการแก้ไขข้อมูล (Mutate) ใน Struct ต้องใช้ Pointer Receiver (a *Account) เสมอ?",
              "options": [
                {
                  "text": "เพราะถ้าใช้ Value Receiver (a Account) ตัว Go จะทำสำเนาข้อมูลขึ้นมาใหม่ การเปลี่ยนแปลงจะหายไปเมื่อจบฟังก์ชัน",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! Go ส่งค่าแบบ Pass by Value เสมอ ถ้าไม่ใช้ Pointer Receiver เราจะกำลังแก้ไขแค่สำเนาชั่วคราว",
                },
                {
                  "text": "เพราะ Value Receiver จะทำให้โปรแกรมคอมไพล์ไม่ผ่าน",
                  "isCorrect": false,
                  "explain": "Value Receiver คอมไพล์ผ่านและรันได้ปกติ แต่ข้อมูลตัวจริงจะไม่ถูกแก้ไข กลายเป็น Logic Bug ที่ตรวจจับยาก",
                },
              ],
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
