import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/04-concurrency.ts
// หน้าที่: บทที่ 5.1 และ 5.2 การป้องกัน Race Condition ด้วย Row Lock และการแก้ Deadlock
// =============================================================================

export const concurrencyPages: Record<string, Page> = {
  "bank-concurrency-race-condition": {
    "slug": "bank-concurrency-race-condition",
    "title": {
      "th": "5.1 Race Condition & Row Locking (SELECT FOR UPDATE)",
      "en": "5.1 Race Condition & Pessimistic Row Locking"
    },
    "lead": {
      "th": "race condition ทำให้สองคนอ่านยอดเก่าพร้อมกันแล้วเงินงอก กันด้วย row lock และบน PostgreSQL เลือกความหนักของ lock ให้พอดีกับงาน",
      "en": "Unraveling race conditions under concurrent requests and applying PostgreSQL pessimistic row locking."
    },
    "group": "5. รับมือคนกดพร้อมกัน: Race Condition & Deadlock",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: เขียนฟังก์ชันโอนเงิน 5 ขั้นตอน (`TransferTx` Version 1) ที่หุ้มด้วย Transaction `execTx` เรียบร้อยแล้ว\n• **ภารกิจในบทนี้**: ทำความเข้าใจว่าทำไม `BEGIN ... COMMIT` ธรรมดาถึงยังไม่พอกันคนกดโอนพร้อมกัน และเรียนรู้การใช้ Row-Level Locking ของ PostgreSQL\n• **กลไกที่จะได้เรียนรู้**: Stale Read, Pessimistic Locking (`SELECT FOR UPDATE` vs `FOR NO KEY UPDATE`), และ Atomic SQL Update (`balance = balance + $1`)"
        },
        {
          "t": "p",
          "c": "ลองจินตนาการถึงสถานการณ์จริงในวันเงินเดือนออก หรือจังหวะกดแย่งซื้อตั๋วคอนเสิร์ต: มีผู้ใช้งานกดยิงคำขอพร้อมกันเป็นร้อยๆ คำขอในเสี้ยววินาทีเดียวกัน หากระบบหลังบ้านของเราไม่มีการป้องกัน ข้อมูลตัวเลขในฐานข้อมูลจะพังพินาศทันทีจากปรากฏการณ์ที่เรียกว่า **Race Condition**"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go & Best Practices ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "กลไกการล็อกใน PostgreSQL",
            "คำสั่ง SQL",
            "ความแตกต่างและผลกระทบต่อระบบธนาคาร"
          ],
          "rows": [
            [
              "1. SELECT ธรรมดา (ไม่ล็อก)",
              "`SELECT * FROM accounts WHERE id = $1;`",
              "❌ เสี่ยงเกิด Stale Read & Double Spending เพราะสอง Transaction อ่านยอดเงินเก่าพร้อมกันได้"
            ],
            [
              "2. SELECT FOR UPDATE",
              "`SELECT * FROM accounts WHERE id = $1 FOR UPDATE;`",
              "⚠️ ล็อกแถวแบบแรงสุด (สมมติว่าจะแก้ Primary Key `id` ด้วย) ทำให้ไปบล็อกการตรวจ Foreign Key ตอน `INSERT INTO transfers` จนเกิด Deadlock ได้ง่าย"
            ],
            [
              "3. SELECT FOR NO KEY UPDATE",
              "`SELECT * FROM accounts WHERE id = $1 FOR NO KEY UPDATE;`",
              "✅ ล็อกแถวเพื่อแก้เฉพาะคอลัมน์ที่ไม่ใช่ Key (เช่น `balance`) กันคนอื่นแก้ยอดเงินซ้อนได้ 100% โดยไม่บล็อกการตรวจ Foreign Key"
            ],
            [
              "4. Atomic SQL Update (ที่เราใช้)",
              "`UPDATE accounts SET balance = balance + $1 WHERE id = $2 RETURNING ...`",
              "🏆 **Best Practice!** บวกลบยอดเงินและได้ Row Lock ระดับ `FOR NO KEY UPDATE` จบในคำสั่งเดียว ลดการวิ่งไปกลับผ่าน Network ครึ่งหนึ่ง!"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. Race condition จาก stale read"
        },
        {
          "t": "p",
          "c": "สมมตินาย Bob มีเงินในบัญชีเพียง 100 บาท แล้วเขากดสั่งโอนเงิน 100 บาทพร้อมกัน 2 เครื่องในเวลาเดียวกันเป๊ะ:"
        },
        {
          "t": "table",
          "head": [
            "เวลา (Time)",
            "Transaction 1 (เครื่องที่ 1)",
            "Transaction 2 (เครื่องที่ 2)",
            "ผลลัพธ์ในฐานข้อมูล"
          ],
          "rows": [
            [
              "T1",
              "อ่านยอดเงิน Bob (ได้ 100 บาท)",
              "รอประมวลผล",
              "ยอดเงินจริง = 100 บาท"
            ],
            [
              "T2",
              "กำลังคำนวณ",
              "อ่านยอดเงิน Bob (ได้ 100 บาทเช่นกัน!)",
              "ยอดเงินจริง = 100 บาท"
            ],
            [
              "T3",
              "หักเงิน 100 บาท: 100 - 100 = 0",
              "กำลังคำนวณ",
              "ยอดเงินจริง = 0 บาท"
            ],
            [
              "T4",
              "Commit สำเร็จ (เงินออก 100)",
              "หักเงิน 100 บาท: 100 - 100 = 0",
              "ยอดเงินจริง = 0 บาท"
            ],
            [
              "T5",
              "-",
              "Commit สำเร็จ (เงินออกอีก 100)",
              "Bob ได้เงินออกไป 200 บาท ทั้งที่มีเงินแค่ 100 บาท!"
            ]
          ]
        },
        {
          "t": "callout",
          "title": "🚨 เกิดอะไรขึ้น?",
          "c": "Transaction 2 ทำการอ่านค่ายอดเงิน (Read) ก่อนที่ Transaction 1 จะทันได้บันทึกการหักเงิน (Commit) ทำให้ Transaction 2 มองเห็นข้อมูลเก่า (Stale Read) และยอมให้เงินไหลออกจากระบบซ้ำสอง! ในโลกการเงิน ปัญหานี้เรียกว่า 'Double Spending' ซึ่งธนาคารต้องเป็นผู้รับผิดชอบความเสียหายทั้งหมด",
          "warn": true
        },
        {
          "t": "codeout",
          "lang": "text",
          "label": "จำลองภาพสิ่งที่เกิดขึ้นจริงใน Terminal เมื่อเกิด Stale Read (ไม่มี Lock)",
          "code": "// Goroutine 1 & 2 ยิงคำขอถอนเงิน 100 บาทพร้อมกันในเสี้ยววินาทีเดียว\ngo withdrawWithoutLock(accID, 100)\ngo withdrawWithoutLock(accID, 100)",
          "out": "[Goroutine 1] SELECT balance FROM accounts WHERE id = 1 -> ได้ 100 บาท (อนุมัติถอน)\n[Goroutine 2] SELECT balance FROM accounts WHERE id = 1 -> ได้ 100 บาท (Stale Read! อนุมัติถอน)\n[Goroutine 1] UPDATE accounts SET balance = 0 WHERE id = 1 -> ส่งมอบเงินสด 100 บาท\n[Goroutine 2] UPDATE accounts SET balance = 0 WHERE id = 1 -> ส่งมอบเงินสด 100 บาท\n[สรุปหายนะ] บัญชีมีเงิน 100 บาท แต่ถูกถอนออกไปได้ 200 บาท! (Double Spending ขาดทุน 100 บาท)"
        },
        {
          "t": "h2",
          "c": "3. ทางออก: pessimistic locking ด้วย row lock"
        },
        {
          "t": "p",
          "c": "เราจะป้องกันไม่ให้ Transaction ที่สองเข้ามาอ่านยอดเงินเก่า (100 บาท) ในขณะที่ Transaction แรกกำลังจะตัดเงินได้อย่างไร? คำตอบมาตรฐานในระบบฐานข้อมูลคือการทำ **Pessimistic Row Locking (การล็อกแถวข้อมูลไว้ก่อนแก้ไข)** โดยบังคับว่าใครที่ต้องการอ่านยอดเงินเพื่อนำไปอัปเดต จะต้องขอจองสิทธิ์ล็อกแถวนั้นไว้ก่อน คนถัดไปที่เข้ามาแตะแถวเดียวกันจะต้อง **หยุดรอคิว (Block)** จนกว่าคนแรกจะ `COMMIT` หรือ `ROLLBACK` เสร็จสิ้น ซึ่งใน PostgreSQL ใช้คำสั่ง `SELECT ... FOR UPDATE`:"
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "การใช้ SELECT FOR UPDATE",
          "c": "-- เมื่อ Transaction แรกสั่งล็อกแถว\nSELECT id, owner, balance, currency FROM accounts\nWHERE id = 1 FOR UPDATE;\n\n-- Transaction อื่นๆ ที่พยายามจะอ่านแถว id = 1 ด้วย FOR UPDATE เหมือนกัน\n-- จะต้อง 'หยุดรอ (Block)' จนกว่า Transaction แรกจะสั่ง COMMIT หรือ ROLLBACK!"
        },
        {
          "t": "h2",
          "c": "4. ล็อกให้หนักเท่าที่งานต้องใช้"
        },
        {
          "t": "p",
          "c": "แม้ว่า `SELECT ... FOR UPDATE` จะหยุดปัญหา Race Condition ได้ แต่ยังมีคำถามระดับลึกที่วิศวกรต้องรู้: **`FOR UPDATE` ล็อกแรงเกินความจำเป็นจนไปขัดขวางตารางอื่นหรือไม่?** สังเกตว่าการโอนเงินไม่ได้ลบบัญชีและไม่ได้เปลี่ยนเลขรหัส `id` ของบัญชี (มันเปลี่ยนแค่คอลัมน์ `balance`) แต่ในจังหวะที่เรายิง `INSERT INTO transfers` และ `INSERT INTO entries` ฐานข้อมูลจะต้องทำการตรวจสอบ **Foreign Key** ว่ารหัสบัญชี `accounts.id` นั้นยังมีตัวตนอยู่จริง"
        },
        {
          "t": "p",
          "c": "ใน PostgreSQL คำสั่ง `FOR UPDATE` คือการล็อกแถวที่เข้มงวดที่สุด (เพราะสมมติว่าคุณอาจแก้ไขคอลัมน์ Primary Key `id` ด้วย) จึงไปบล็อกการตรวจ Foreign Key ของตารางลูกจนเสี่ยงเกิด Deadlock! ทางออกที่เป็น **Best Practice ของ PostgreSQL** คือการใช้ **`SELECT ... FOR NO KEY UPDATE`** ซึ่งบอกฐานข้อมูลว่า *'เราจะแก้ไขเฉพาะคอลัมน์ทั่วไป (เช่น `balance`) แต่จะไม่เปลี่ยนค่า Primary Key `id` แน่นอน'* ทำให้กันคนอื่นมาแก้ยอดเงินซ้อนได้ 100% โดยไม่บล็อกการตรวจ Foreign Key ของตาราง `transfers` และ `entries`!"
        },
        {
          "t": "h2",
          "c": "5. ท่าที่กระชับและเร็วยิ่งขึ้น: Atomic Update ในตัว SQL"
        },
        {
          "t": "p",
          "c": "และข่าวดีที่สุดก็คือ ในฟังก์ชัน `AddAccountBalance` ที่เราเขียนไว้ใน `simplebank/db/account.go` เราไม่จำเป็นต้องยิง `SELECT ... FOR NO KEY UPDATE` แยกกับ `UPDATE` ให้เสียเวลาวิ่งผ่านเครือข่าย 2 รอบ! เพราะการยิงคำสั่ง **`UPDATE accounts SET balance = balance + $1 WHERE id = $2 RETURNING ...`** ใน PostgreSQL จะทำการ **จอง Row Lock ระดับเดียวกับ `FOR NO KEY UPDATE` พร้อมบวกลบยอดเงินและคืนค่าใหม่กลับมาในคำสั่งเดียวจบ (Atomic Update)** ทันที:"
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "simplebank/db/account.go",
          "c": "UPDATE accounts\nSET balance = balance + $1\nWHERE id = $2\nRETURNING id, owner, balance, currency, created_at;"
        },
        {
          "t": "p",
          "c": "หากเราส่ง `$1` เป็น `-100` เงินจะลดลง 100 บาท หากส่ง `+100` เงินจะเพิ่มขึ้น 100 บาท การสั่ง `balance = balance + $1` ในระดับ SQL จะการันตีความถูกต้องในระดับหน่วยย่อยที่สุดของ Database และประหยัด Network Round-trip ไปได้ถึงครึ่งหนึ่ง!"
        },
        {
          "t": "codeout",
          "lang": "text",
          "label": "เปรียบเทียบพฤติกรรมในระดับ Database เมื่อใช้ Atomic Update",
          "code": "-- คำสั่ง 2 ตัวยิงเข้าฐานข้อมูลพร้อมกัน\nTx 1: UPDATE accounts SET balance = balance - 100 WHERE id = 1;\nTx 2: UPDATE accounts SET balance = balance - 100 WHERE id = 1;",
          "out": "[Tx 1] ได้รับ Exclusive Row Lock บนแถว id = 1 ทันที -> balance 100 - 100 = 0\n[Tx 2] พยายามแก้ไขแถว id = 1 -> ถูก PostgreSQL สั่งให้ \"หยุดรอ (Block)\"\n[Tx 1] COMMIT ธุรกรรมสำเร็จ -> ปลด Row Lock\n[Tx 2] ได้รับ Row Lock ต่อมา -> พยายามทำ 0 - 100 = -100 -> ละเมิด Check Constraint \"accounts_balance_check\"\n[PostgreSQL] ERROR: new row for relation \"accounts\" violates check constraint \"accounts_balance_check\"\n[execTx in Go] ตรวจพบ error จากฐานข้อมูล -> สั่ง tx.Rollback() คืนค่าอัตโนมัติ 100%!\n[สรุปความปลอดภัย] ข้อมูลเงินคงเส้นคงวา (Consistent) ปราศจาก Double Spending และยอดเงินไม่มีวันติดลบ"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• คุณเข้าใจแล้วว่าทำไมการใช้ `UPDATE accounts SET balance = balance + $1` ใน `AddAccountBalance` ถึงช่วยล็อกแถวระดับ `FOR NO KEY UPDATE` ให้อัตโนมัติและป้องกัน Race Condition ได้อย่างสมบูรณ์\n• **ก้าวต่อไป (บทที่ 5.2)**: เมื่อมีการล็อกแถวเกิดขึ้น ศัตรูตัวถัดไปที่จะตามมาทันทีคือ **Deadlock** เมื่อสองคนโอนเงินสวนทางกัน (1 โอนให้ 2 พร้อมกับ 2 โอนให้ 1) เราไปดูวิธีแก้ปัญหา Deadlock ให้หายขาดในบทถัดไปกันครับ!"
        }
      ],
      "en": []
    }
  },
  "bank-deadlock-prevention": {
    "slug": "bank-deadlock-prevention",
    "title": {
      "th": "5.2 ไขปริศนา Deadlock & แก้ด้วย Resource Ordering",
      "en": "5.2 Deadlock Analysis & Resource Ordering Prevention"
    },
    "lead": {
      "th": "ทำไมบัญชี A โอนหา B พร้อมกับ B โอนหา A ถึงทำให้ระบบค้าง? — วิเคราะห์วงจร Deadlock และพิสูจน์วิธีแก้ปัญหาเชิงคณิตศาสตร์ด้วยการจัดลำดับ Account ID",
      "en": "Why concurrent bidirectional transfers cause deadlocks and how strict resource ordering mathematically guarantees a cycle-free DAG."
    },
    "group": "5. รับมือคนกดพร้อมกัน: Race Condition & Deadlock",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: เข้าใจกลไกการล็อกแถว (Row Locking) ของ PostgreSQL เพื่อกัน Race Condition แล้ว\n• **ภารกิจในบทนี้**: วิเคราะห์สาเหตุของ Deadlock เมื่อโอนเงินสวนทางกัน และอัปเกรดไฟล์ `simplebank/db/tx_transfer.go` จาก Version 1 เป็น **Version 2 (Deadlock-Free)**\n• **ไวยากรณ์ Go ที่จะได้ใช้จริง**: Named Return Values `(account1 Account, account2 Account, err error)` และ Naked `return` ในฟังก์ชันผู้ช่วย `addMoney`"
        },
        {
          "t": "p",
          "c": "แม้เราจะใส่การล็อกแถวข้อมูลเพื่อแก้ Race Condition แล้ว แต่เราอาจกำลังเดินเข้าสู่กับดักที่ร้ายแรงกว่าเดิม นั่นคือ **Deadlock (ภาวะติดหล่มมรณะ)** ซึ่งเป็นอาการที่โปรเซสสองตัวต่างคนต่างรอให้โปรเซสอีกฝั่งปล่อยทรัพยากร จนไม่มีใครสามารถทำงานต่อได้"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go & Best Practices ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "ไวยากรณ์ Go & อัลกอริทึมในบทนี้",
            "โค้ดใน tx_transfer.go",
            "แกะความหมายให้เข้าใจง่าย"
          ],
          "rows": [
            [
              "1. Named Return Values",
              "`func addMoney(...) (account1 Account, account2 Account, err error)`",
              "ตั้งชื่อตัวแปรขาออกทั้ง 3 ตัวไว้ที่หัวฟังก์ชัน Go จะสร้างตัวแปรทั้ง 3 รอไว้ให้ทันที"
            ],
            [
              "2. Naked Return (return เปล่าๆ)",
              "`if err != nil { return }`",
              "เมื่อตั้งชื่อตัวแปรขาออกไว้ที่หัวฟังก์ชันแล้ว การพิมพ์ `return` เปล่าๆ จะส่งค่าล่าสุดของ `account1`, `account2`, และ `err` ออกไปทันที"
            ],
            [
              "3. Strict Resource Ordering",
              "`if arg.FromAccountID < arg.ToAccountID { ... } else { ... }`",
              "เปรียบเทียบรหัสบัญชีทั้งสองฝั่ง บัญชีไหนมีเลข ID น้อยกว่า ให้ส่งเข้าไปอัปเดต (และขอล็อกแถว) เป็นลำดับแรกเสมอ เพื่อทำลายวงจร Circular Wait"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. จุดกำเนิดของ Deadlock: การโอนเงินสวนทางกัน"
        },
        {
          "t": "p",
          "c": "สมมตินาย 1 ต้องการโอนเงินให้นาย 2 ในจังหวะเดียวกับที่นาย 2 ต้องการโอนเงินให้นาย 1:"
        },
        {
          "t": "ul",
          "c": [
            "**Transaction 1 (1 โอนให้ 2):** ล็อกบัญชี 1 สำเร็จ จากนั้นพยายามจะขอสิทธิ์ล็อกบัญชี 2",
            "**Transaction 2 (2 โอนให้ 1):** ล็อกบัญชี 2 สำเร็จ จากนั้นพยายามจะขอสิทธิ์ล็อกบัญชี 1"
          ]
        },
        {
          "t": "p",
          "c": "ดูสิ่งที่เกิดขึ้น: Transaction 1 ถือบัญชี 1 แล้วรอขอบัญชี 2... แต่บัญชี 2 ถูก Transaction 2 ถือครองอยู่ และ Transaction 2 ก็กำลังรอขอบัญชี 1 จาก Transaction 1 เช่นกัน!"
        },
        {
          "t": "code",
          "lang": "text",
          "label": "ภาพแสดงวงจรปิดของ Deadlock (Circular Wait)",
          "c": "Tx 1 (ถือ Lock บัญชี 1) --------------> รอขอ Lock บัญชี 2\n         ^                                        |\n         |                                        |\n         |                                        v\n   รอขอ Lock บัญชี 1 <-------------- Tx 2 (ถือ Lock บัญชี 2)"
        },
        {
          "t": "p",
          "c": "ต่างคนต่างไม่ยอมปล่อย และต่างคนต่างรออีกฝั่ง เกิดเป็นวงรอบแบบงูกินหาง (Circular Dependency) หลังจากรอไปครู่หนึ่ง PostgreSQL จะตรวจพบวงจรนี้และสั่งฆ่าคำสั่งใดคำสั่งหนึ่งทิ้ง พร้อมพ่น Error สีแดงแจ๋ออกมา:"
        },
        {
          "t": "codeout",
          "lang": "text",
          "label": "PostgreSQL Deadlock Log ใน Terminal Server",
          "code": "-- Tx 1 (โอน 1 -> 2) และ Tx 2 (โอน 2 -> 1) ยิงชนกัน\nUPDATE accounts SET balance = balance - 10 WHERE id = 2; -- (Tx 1 รอล็อก 2)\nUPDATE accounts SET balance = balance - 10 WHERE id = 1; -- (Tx 2 รอล็อก 1)",
          "out": "ERROR: deadlock detected (SQLSTATE 40P01)\nDETAIL: Process 1421 waits for ExclusiveLock on tuple (0,2) of relation \"accounts\"; blocked by process 1422.\nProcess 1422 waits for ExclusiveLock on tuple (0,1) of relation \"accounts\"; blocked by process 1421.\nHINT: See server log for query details.\nSTATEMENT: UPDATE accounts SET balance = balance + $1 WHERE id = $2 RETURNING id, owner, balance, currency, created_at;"
        },
        {
          "t": "h2",
          "c": "3. วิธีแก้ปัญหาที่ถูกต้อง: Strict Resource Ordering (การบังคับลำดับทรัพยากร)"
        },
        {
          "t": "p",
          "c": "ในทฤษฎี Computer Science ปัญหา Deadlock จะเกิดขึ้นได้ก็ต่อเมื่อมี **Circular Wait (การรอคอยเป็นวงกลม)** เท่านั้น หากเราสามารถกำจัดการรอเป็นวงกลมทิ้งไปได้ Deadlock จะไม่มีวันเกิดขึ้นในระบบของเราอีกเลย 100%!"
        },
        {
          "t": "callout",
          "title": "🔑 กฎทองคำแห่งการจัดลำดับ (Resource Ordering Rule)",
          "c": "ไม่ว่าใครจะเป็นคนโอน หรือใครจะเป็นคนรับโอน ให้ระบบทำการ 'ล็อกบัญชีที่มี ID น้อยกว่าก่อนเสมอ' แล้วค่อยตามด้วยบัญชีที่มี ID มากกว่า!"
        },
        {
          "t": "p",
          "c": "มาดูลำดับใหม่ภายใต้กฎนี้:"
        },
        {
          "t": "ul",
          "c": [
            "**Tx 1 (บัญชี 1 โอนให้ 2):** เปรียบเทียบ ID พบว่า 1 < 2 -> ทำการล็อกบัญชี 1 ก่อน แล้วค่อยล็อกบัญชี 2",
            "**Tx 2 (บัญชี 2 โอนให้ 1):** เปรียบเทียบ ID พบว่า 1 < 2 -> **ต้องไปต่อคิวขอล็อกบัญชี 1 ก่อนเช่นกัน!**"
          ]
        },
        {
          "t": "p",
          "c": "เมื่อ Tx 2 ถูกบังคับให้ขอล็อกบัญชี 1 ก่อน Tx 2 จะหยุดรอตั้งแต่ก้าวแรก ไม่มีการไปแย่งล็อกบัญชี 2 ไว้ก่อน ทำให้ Tx 1 ทำงานจนจบและปล่อย Lock ทั้งหมด จากนั้น Tx 2 จึงค่อยเริ่มทำงานต่อตามคิว วงจร Deadlock จึงถูกทำลายจนหมดสิ้น!"
        },
        {
          "t": "h2",
          "c": "4. แนวทางการอัปเกรด simplebank/db/tx_transfer.go จาก Version 1 เป็น Version 2 (Deadlock-Free)"
        },
        {
          "t": "p",
          "c": "ในบทที่ 3 เราได้สร้างไฟล์ `simplebank/db/tx_transfer.go` (Version 1: พื้นฐาน 5 ขั้นตอน) เอาไว้เรียบร้อยแล้ว\n\nสังเกตความงดงามของ Clean Architecture ที่เราออกแบบไว้: **เราไม่ต้องแตะต้องไฟล์ `simplebank/db/store.go` เลยแม้แต่บรรทัดเดียว!** เพราะ `store.go` ทำหน้าที่เป็น Transaction Engine กลางที่สมบูรณ์แบบอยู่แล้ว\n\nสิ่งที่เราจะทำในบทนี้ คือการ **อัปเกรดเฉพาะไฟล์ `simplebank/db/tx_transfer.go` ให้กลายเป็น Version 2 (Deadlock-Free)** โดยการจัดลำดับการขอล็อกแถวตาม Account ID ผ่าน 2 ขั้นตอนง่ายๆ ดังนี้:"
        },
        {
          "t": "callout",
          "title": "💡 ทำไมฟังก์ชัน addMoney ถึงควรอยู่ใน tx_transfer.go (ไม่ใช่ store.go)?",
          "c": "มีเหตุผลเชิงสถาปัตยกรรม 3 ข้อหลักที่ทำให้ `addMoney` ต้องอยู่ใน `tx_transfer.go`:\n1. **Unexported Private Helper (ฟังก์ชันช่วยงานเฉพาะตัว)**: ชื่อฟังก์ชันขึ้นต้นด้วยตัวพิมพ์เล็ก `addMoney` แปลว่าเป็นฟังก์ชันส่วนตัวที่เรียกใช้เฉพาะในไฟล์นี้เท่านั้น ไม่มีส่วนอื่นของระบบต้องมายุ่งเกี่ยว\n2. **ไม่ทำให้ store.go รก (No God Object)**: `store.go` มีหน้าที่คุม Transaction ระดับภาพรวม ไม่ควรต้องมารู้รายละเอียดว่าการโอนเงินต้องบวกลบคอลัมน์ไหนก่อนหลัง\n3. **Encapsulation & High Cohesion**: วางตรรกะการจัดลำดับ Lock (`addMoney` + `TransferTx`) ไว้ด้วยกันใน `tx_transfer.go` ทำให้โค้ดอ่านง่าย ตรวจสอบง่าย และเวลาแก้ไขระบบโอนเงินก็จัดการจบในไฟล์นี้ไฟล์เดียว 100%!"
        },
        {
          "t": "h3",
          "c": "ขั้นตอนที่ 1: เพิ่มฟังก์ชันผู้ช่วย addMoney ใน tx_transfer.go"
        },
        {
          "t": "p",
          "c": "เปิดไฟล์ `simplebank/db/tx_transfer.go` แล้ววางฟังก์ชัน `addMoney` นี้ไว้เหนือฟังก์ชัน `TransferTx` เพื่อทำหน้าที่อัปเดตยอดเงินของ 2 บัญชีตามลำดับ Account ID ที่ส่งเข้ามา:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/tx_transfer.go",
          "c": "// addMoney ทำหน้าที่อัปเดตยอดเงินของทั้ง 2 บัญชีตามลำดับที่ส่งเข้ามา\nfunc addMoney(\n\tctx context.Context,\n\tq *Queries,\n\taccountID1 int64,\n\tamount1 int64,\n\taccountID2 int64,\n\tamount2 int64,\n) (account1 Account, account2 Account, err error) {\n\t// 1. อัปเดตยอดเงินบัญชีแรก (ระบบจะล็อกแถวของ accountID1 ก่อน)\n\taccount1, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\tID:     accountID1,\n\t\tAmount: amount1,\n\t})\n\tif err != nil {\n\t\treturn\n\t}\n\n\t// 2. อัปเดตยอดเงินบัญชีที่สอง (ระบบจะล็อกแถวของ accountID2 ตามมา)\n\taccount2, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\tID:     accountID2,\n\t\tAmount: amount2,\n\t})\n\treturn\n}"
        },
        {
          "t": "h3",
          "c": "ขั้นตอนที่ 2: จุดที่แก้ไขใน TransferTx (เปรียบเทียบ Before vs After)"
        },
        {
          "t": "p",
          "c": "ในฟังก์ชัน `TransferTx` ขั้นตอนที่ 1, 2, 3 (สร้าง Transfer และ Entries) ยังคงทำงานเหมือนเดิมทุกประการ สิ่งที่ต้องเปลี่ยนมีเพียงจุดเดียวคือ **ลบขั้นตอนที่ 4 และ 5 เดิมออก (ไฮไลต์สีแดง -) แล้วแทนที่ด้วยการจัดลำดับขอล็อก Account ID (ไฮไลต์สีเขียว +)** ดังนี้:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/db/tx_transfer.go",
          "c": "-\t\t// 4. ตัดยอดเงินคงเหลือจากบัญชีต้นทาง (หักเงินออก)\n-\t\tresult.FromAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n-\t\t\tID:     arg.FromAccountID,\n-\t\t\tAmount: -arg.Amount,\n-\t\t})\n-\t\tif err != nil {\n-\t\t\treturn err\n-\t\t}\n-\n-\t\t// 5. เพิ่มยอดเงินคงเหลือให้บัญชีปลายทาง (โอนเงินเข้า)\n-\t\tresult.ToAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n-\t\t\tID:     arg.ToAccountID,\n-\t\t\tAmount: arg.Amount,\n-\t\t})\n-\t\tif err != nil {\n-\t\t\treturn err\n-\t\t}\n+\t\t// 4. หัวใจสำคัญ: ตรวจสอบว่า ID ไหนน้อยกว่า ให้อัปเดตและล็อกบัญชีนั้นก่อนเสมอ!\n+\t\t// ไม่ว่าใครจะเป็นผู้โอนหรือผู้รับ ลำดับการขอ Lock ในฐานข้อมูลจะวิ่งจาก ID น้อย -> ID มากเสมอ\n+\t\tif arg.FromAccountID < arg.ToAccountID {\n+\t\t\t// เคสที่ 1: From ID น้อยกว่า To ID -> หักเงินบัญชี From ก่อน แล้วค่อยเพิ่มเงินบัญชี To\n+\t\t\tresult.FromAccount, result.ToAccount, err = addMoney(\n+\t\t\t\tctx, q, arg.FromAccountID, -arg.Amount, arg.ToAccountID, arg.Amount,\n+\t\t\t)\n+\t\t} else {\n+\t\t\t// เคสที่ 2: To ID น้อยกว่า From ID -> เพิ่มเงินบัญชี To ก่อน แล้วค่อยหักเงินบัญชี From\n+\t\t\tresult.ToAccount, result.FromAccount, err = addMoney(\n+\t\t\t\tctx, q, arg.ToAccountID, arg.Amount, arg.FromAccountID, -arg.Amount,\n+\t\t\t)\n+\t\t}\n+\t\tif err != nil {\n+\t\t\treturn err\n+\t\t}"
        },
        {
          "t": "callout",
          "title": "⚡ ระวังเครื่องหมายบวกลบในเคสที่ 2 (else)!",
          "c": "สังเกตพารามิเตอร์ของ `addMoney` ในเคสที่ 2 ให้ดี:\n- `arg.ToAccountID` เป็นบัญชีปลายทาง (คนรับเงิน) จึงต้องส่งยอดเงินเป็น **`+arg.Amount`**\n- `arg.FromAccountID` เป็นบัญชีต้นทาง (คนโอนเงิน) จึงต้องส่งยอดเงินเป็น **`-arg.Amount`**\nอย่าเผลอใส่เครื่องหมายลบที่ `ToAccountID` เด็ดขาด เพราะจะทำให้เงินเข้าผิดบัญชีทันที!",
          "warn": true
        },
        {
          "t": "h3",
          "c": "โค้ดเต็มฟังก์ชัน TransferTx เวอร์ชันป้องกัน Deadlock"
        },
        {
          "t": "p",
          "c": "ภาพรวมฟังก์ชัน `TransferTx` หลังนำโค้ดขั้นตอนที่ 1 และ 2 มาประกอบร่างกันเสร็จสมบูรณ์:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/tx_transfer.go",
          "c": "// TransferTx เวอร์ชันปรับปรุงที่ป้องกัน Deadlock ได้อย่างสมบูรณ์\nfunc (store *Store) TransferTx(ctx context.Context, arg TransferTxParams) (TransferTxResult, error) {\n\tvar result TransferTxResult\n\n\terr := store.execTx(ctx, func(q *Queries) error {\n\t\tvar err error\n\n\t\t// 1. สร้างประวัติการโอนเงินลงในตาราง transfers\n\t\tresult.Transfer, err = q.CreateTransfer(ctx, CreateTransferParams{\n\t\t\tFromAccountID: arg.FromAccountID,\n\t\t\tToAccountID:   arg.ToAccountID,\n\t\t\tAmount:        arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 2. สร้าง Entry เงินออกของบัญชีต้นทาง (Ledger บันทึกยอดลบ)\n\t\tresult.FromEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.FromAccountID,\n\t\t\tAmount:    -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 3. สร้าง Entry เงินเข้าของบัญชีปลายทาง (Ledger บันทึกยอดบวก)\n\t\tresult.ToEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.ToAccountID,\n\t\t\tAmount:    arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 4. หัวใจสำคัญ: ตรวจสอบว่า ID ไหนน้อยกว่า ให้อัปเดตและล็อกบัญชีนั้นก่อนเสมอ!\n\t\t// ไม่ว่าใครจะเป็นผู้โอนหรือผู้รับ ลำดับการขอ Lock ในฐานข้อมูลจะวิ่งจาก ID น้อย -> ID มากเสมอ\n\t\tif arg.FromAccountID < arg.ToAccountID {\n\t\t\t// เคสที่ 1: From ID น้อยกว่า To ID -> หักเงินบัญชี From ก่อน แล้วค่อยเพิ่มเงินบัญชี To\n\t\t\tresult.FromAccount, result.ToAccount, err = addMoney(\n\t\t\t\tctx, q, arg.FromAccountID, -arg.Amount, arg.ToAccountID, arg.Amount,\n\t\t\t)\n\t\t} else {\n\t\t\t// เคสที่ 2: To ID น้อยกว่า From ID -> เพิ่มเงินบัญชี To ก่อน แล้วค่อยหักเงินบัญชี From\n\t\t\tresult.ToAccount, result.FromAccount, err = addMoney(\n\t\t\t\tctx, q, arg.ToAccountID, arg.Amount, arg.FromAccountID, -arg.Amount,\n\t\t\t)\n\t\t}\n\n\t\treturn err\n\t})\n\n\treturn result, err\n}"
        },
        {
          "t": "h3",
          "c": "📁 โค้ดเต็มของ simplebank/db/tx_transfer.go (Version 2 สมบูรณ์พร้อมรัน 100%)"
        },
        {
          "t": "p",
          "c": "คุณสามารถตรวจสอบความถูกต้อง หรือคัดลอกโค้ดฉบับเต็มด้านล่างนี้ไปวางทับไฟล์ `simplebank/db/tx_transfer.go` ทั้งไฟล์ได้ทันที (สะอาด กระชับ แยกหมวดหมู่ชัดเจน และคง `store.go` ไว้เหมือนเดิม 100%):"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/tx_transfer.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/tx_transfer.go\n// หน้าที่: โครงสร้างข้อมูลและฟังก์ชัน TransferTx เวอร์ชัน 2 ป้องกัน Deadlock\n// แก้ปัญหา: บัญชี A โอนหา B สวนทางกับ B โอนหา A พร้อมกันทำให้เกิด Circular Wait (Deadlock)\n// =============================================================================\npackage db\n\nimport \"context\"\n\n// TransferTxParams ข้อมูลที่ต้องใช้ในการสั่งโอนเงินระหว่าง 2 บัญชี\ntype TransferTxParams struct {\n\tFromAccountID int64 `json:\"from_account_id\"`\n\tToAccountID   int64 `json:\"to_account_id\"`\n\tAmount        int64 `json:\"amount\"`\n}\n\n// TransferTxResult ผลลัพธ์ที่ได้หลังจากโอนเงินสำเร็จ\ntype TransferTxResult struct {\n\tTransfer    Transfer `json:\"transfer\"`\n\tFromAccount Account  `json:\"from_account\"`\n\tToAccount   Account  `json:\"to_account\"`\n\tFromEntry   Entry    `json:\"from_entry\"`\n\tToEntry     Entry    `json:\"to_entry\"`\n}\n\n// addMoney ฟังก์ชันผู้ช่วยสำหรับ Update ยอดเงินตามลำดับ ID เพื่อป้องกัน Deadlock\nfunc addMoney(\n\tctx context.Context,\n\tq *Queries,\n\taccountID1 int64,\n\tamount1 int64,\n\taccountID2 int64,\n\tamount2 int64,\n) (account1 Account, account2 Account, err error) {\n\taccount1, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\tID:     accountID1,\n\t\tAmount: amount1,\n\t})\n\tif err != nil {\n\t\treturn\n\t}\n\n\taccount2, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\tID:     accountID2,\n\t\tAmount: amount2,\n\t})\n\treturn\n}\n\n// TransferTx รันการโอนเงินจากบัญชีหนึ่งไปยังอีกบัญชีหนึ่งใน 1 Transaction อย่างปลอดภัย ไร้ Deadlock\nfunc (store *Store) TransferTx(ctx context.Context, arg TransferTxParams) (TransferTxResult, error) {\n\tvar result TransferTxResult\n\n\terr := store.execTx(ctx, func(q *Queries) error {\n\t\tvar err error\n\n\t\t// 1. บันทึกหลักฐานประวัติการโอน\n\t\tresult.Transfer, err = q.CreateTransfer(ctx, CreateTransferParams{\n\t\t\tFromAccountID: arg.FromAccountID,\n\t\t\tToAccountID:   arg.ToAccountID,\n\t\t\tAmount:        arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 2. บันทึก Ledger เงินออก (ยอดลบ)\n\t\tresult.FromEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.FromAccountID,\n\t\t\tAmount:    -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 3. บันทึก Ledger เงินเข้า (ยอดบวก)\n\t\tresult.ToEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.ToAccountID,\n\t\t\tAmount:    arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 4. ล็อกแถวและอัปเดตยอดเงินตามลำดับ ID น้อย -> ID มาก เพื่อแก้ Deadlock 100%\n\t\tif arg.FromAccountID < arg.ToAccountID {\n\t\t\tresult.FromAccount, result.ToAccount, err = addMoney(\n\t\t\t\tctx, q, arg.FromAccountID, -arg.Amount, arg.ToAccountID, arg.Amount,\n\t\t\t)\n\t\t} else {\n\t\t\tresult.ToAccount, result.FromAccount, err = addMoney(\n\t\t\t\tctx, q, arg.ToAccountID, arg.Amount, arg.FromAccountID, -arg.Amount,\n\t\t\t)\n\t\t}\n\n\t\treturn err\n\t})\n\n\treturn result, err\n}"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`if arg.FromAccountID < arg.ToAccountID`**: ตรวจสอบว่า ID ผู้โอนน้อยกว่าผู้รับหรือไม่",
            "**กรณี ID ผู้โอนน้อยกว่า (1 < 2)**: เรียก `addMoney` โดยส่ง `FromAccountID` (-amount) ก่อน แล้วตามด้วย `ToAccountID` (+amount)",
            "**กรณี ID ผู้รับน้อยกว่า (2 < 1)**: เรียก `addMoney` โดยส่ง `ToAccountID` (+amount) ก่อน แล้วตามด้วย `FromAccountID` (-amount)",
            "**ผลลัพธ์ในหน่วยความจำ**: ตัวแปร `result.FromAccount` และ `result.ToAccount` ยังคงเก็บค่าบัญชีผู้โอนและผู้รับอย่างถูกต้องตามเดิม แต่ในแง่ของฐานข้อมูล ลำดับการยิงคำสั่ง `UPDATE` ถูกการันตีว่าจะวิ่งจาก ID น้อยไปมากเสมอ ปราศจากโอกาสเกิด Deadlock ตลอดกาล!"
          ]
        },
        {
          "t": "codeout",
          "lang": "text",
          "label": "จำลองการทำงานจริงใน Terminal หลังใช้ Resource Ordering (ไม่มี Deadlock อีกต่อไป)",
          "code": "// ปล่อยคำสั่งโอนเงินสวนทางกันพร้อมกัน\ngo TransferTx(1 -> 2, 10 USD) // Tx 1\ngo TransferTx(2 -> 1, 10 USD) // Tx 2",
          "out": "[Tx 1] เปรียบเทียบ ID: 1 < 2 -> ขอล็อกแถว 1 ก่อน (สำเร็จ) -> กำลังขอล็อกแถว 2...\n[Tx 2] เปรียบเทียบ ID: 1 < 2 -> ขอล็อกแถว 1 ก่อนเช่นกัน! -> พบ Tx 1 ถือครองอยู่ -> \"หยุดรอตามคิว\"\n[Tx 1] ได้รับ Lock แถว 2 -> โอนเงินสำเร็จ -> Commit ธุรกรรม -> ปลด Lock ทั้งหมด\n[Tx 2] หลุดจากการหยุดรอ -> เข้าครอบครอง Lock แถว 1 -> ได้รับ Lock แถว 2 -> Commit สำเร็จ!\nผลลัพธ์: การโอนเงินสวนทางกัน 10 รายการสำเร็จครบถ้วน ไร้ข้อผิดพลาด Deadlock (0 Deadlocks Detected)"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• คุณได้อัปเกรด `simplebank/db/tx_transfer.go` เป็น Version 2 ที่ป้องกันทั้ง Race Condition และ Deadlock ด้วย Resource Ordering เรียบร้อยแล้ว\n• **ก้าวต่อไป (บทที่ 5.3)**: เราจะนำ Goroutines และ Channels มาเขียนชุดทดสอบจำลองการยิงโอนเงินพร้อมกัน 10 คำสั่ง (ทั้งแบบทางเดียวและสวนทางกัน) เพื่อพิสูจน์ด้วยตาตัวเองว่าระบบของเราไม่เกิด Deadlock จริง 100%!"
        }
      ],
      "en": []
    }
  }
};
