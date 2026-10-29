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
      "th": "เจาะลึกกลไก Race Condition ที่ทำให้สองคำสั่งอ่านยอดเงินเก่าพร้อมกันจนเงินงอก (Double Spending) และวิธีป้องกันด้วย Pessimistic Row Locking (FOR NO KEY UPDATE) และ Atomic Update",
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
          "t": "h2",
          "c": "1. ปัญหา Race Condition จากการอ่านข้อมูลเก่า (Stale Read)"
        },
        {
          "t": "p",
          "c": "สมมตินาย Bob มีเงินในบัญชีเพียง **100 บาท** แล้วเขากดสั่งโอนเงิน 100 บาทพร้อมกันจาก 2 อุปกรณ์ในเสี้ยววินาทีเดียวกัน หากระบบของเราใช้ขั้นตอน 'อ่านยอดเงินมาเช็กก่อน (`SELECT`) แล้วค่อยสั่งอัปเดต (`UPDATE`)' โดยไม่มีการล็อกแถว มาดูลำดับเวลาที่เกิดขึ้นจริงในฐานข้อมูล:"
        },
        {
          "t": "table",
          "head": [
            "ลำดับเวลา",
            "Goroutine #1 (อุปกรณ์ที่ 1)",
            "Goroutine #2 (อุปกรณ์ที่ 2)",
            "ยอดเงินในฐานข้อมูลจริง"
          ],
          "rows": [
            [
              "T1",
              "ยิง `SELECT balance` -> อ่านได้ **100 บาท**",
              "เริ่มทำงาน",
              "100 บาท"
            ],
            [
              "T2",
              "กำลังคำนวณ 100 - 100 = 0",
              "ยิง `SELECT balance` -> อ่านได้ **100 บาท** (Stale Read!)",
              "100 บาท (เพราะ #1 ยังไม่ Commit)"
            ],
            [
              "T3",
              "ยิง `UPDATE balance = 0` และ `COMMIT`",
              "กำลังคำนวณ 100 - 100 = 0",
              "0 บาท (เงินออกไปแล้ว 100 บาท)"
            ],
            [
              "T4",
              "จบการทำงาน",
              "ยิง `UPDATE balance = 0` และ `COMMIT` สำเร็จ!",
              "0 บาท (แต่เงินถูกโอนออกไปรวม **200 บาท**!)"
            ]
          ]
        },
        {
          "t": "callout",
          "title": "🚨 ทำไมมี Transaction (BEGIN/COMMIT) แล้วยังเกิดปัญหานี้ได้?",
          "c": "เพราะค่าเริ่มต้นของ PostgreSQL ใช้ระดับการแยกตัวแบบ **Read Committed** ซึ่งอนุญาตให้หลาย Transaction อ่านแถวเดียวกันพร้อมกันได้ ตราบใดที่ยังไม่มีการสั่งล็อกแถว! ทำให้ Goroutine #2 อ่านเห็นยอดเงินเก่า (Stale Read) ก่อนที่ Goroutine #1 จะบันทึกเสร็จ เกิดเป็นช่องโหว่ **Double Spending** ทันที",
          "warn": true
        },
        {
          "t": "h2",
          "c": "2. ทางออกที่ 1: สั่งจองแถวด้วย Pessimistic Row Locking"
        },
        {
          "t": "p",
          "c": "หากต้องการอ่านค่ามาคำนวณแล้วห้ามใครแทรก เราต้องสั่งให้ PostgreSQL **ล็อกแถวข้อมูลนั้นตั้งแต่วินาทีที่อ่าน** ด้วยคำสั่ง `SELECT ... FOR UPDATE` (หรือ `FOR NO KEY UPDATE`):"
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "เปรียบเทียบ SELECT ธรรมดา กับ SELECT ที่ล็อกแถวข้อมูล",
          "c": "-- ❌ 1. SELECT ธรรมดา: ไม่มีการล็อกแถว ใครๆ ก็เข้ามาอ่านค่าเก่าพร้อมกันได้\nSELECT id, owner, balance, currency FROM accounts WHERE id = 1;\n\n-- ⚠️ 2. SELECT FOR UPDATE: ล็อกแถวแบบเข้มงวดสูงสุด (แต่จะไปบล็อกการตรวจ Foreign Key ของตารางอื่นด้วย)\nSELECT id, owner, balance, currency FROM accounts WHERE id = 1 FOR UPDATE;\n\n-- ✅ 3. SELECT FOR NO KEY UPDATE: ล็อกแถวเพื่อแก้ไขเฉพาะคอลัมน์ที่ไม่ใช่ Primary Key (เช่น balance)\n-- ช่วยให้ตาราง transfers สามารถตรวจ Foreign Key (references accounts.id) ได้โดยไม่ติด Deadlock!\nSELECT id, owner, balance, currency FROM accounts WHERE id = 1 FOR NO KEY UPDATE;"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกความต่างระหว่าง FOR UPDATE กับ FOR NO KEY UPDATE"
        },
        {
          "t": "ul",
          "c": [
            "**ทำไม `FOR UPDATE` ถึงแรงเกินจำเป็นในระบบธนาคารของเรา?**: ในตาราง `transfers` มี Foreign Key ชี้มาที่ `accounts(id)` เวลาที่เราสั่ง `INSERT INTO transfers` PostgreSQL จะต้องแอบขอ Lock เบาๆ บนแถว `accounts` เพื่อยืนยันว่า `id` บัญชีนั้นมีอยู่จริงและไม่มีใครกำลังเปลี่ยนเลข `id` หากเราใช้ `FOR UPDATE` มันจะบล็อกการตรวจ Foreign Key จนเกิด Deadlock ได้ง่ายมาก",
            "**ทำไม `FOR NO KEY UPDATE` ถึงตอบโจทย์?**: เพราะการโอนเงินเปลี่ยนแค่คอลัมน์ `balance` ไม่เคยเปลี่ยนคอลัมน์ `id` (Primary Key) การใช้ `FOR NO KEY UPDATE` จึงป้องกันคนอื่นมาแก้ `balance` ซ้อนกันได้ 100% โดยไม่ไปขัดขวางการตรวจ Foreign Key ของตาราง `transfers`!"
          ]
        },
        {
          "t": "h2",
          "c": "3. ทางออกที่ 2 (ที่เราใช้ใน AddAccountBalance): Atomic SQL Update"
        },
        {
          "t": "p",
          "c": "จำฟังก์ชัน `AddAccountBalance` ที่เราเขียนไว้ใน `simplebank/db/account.go` (บทที่ 3.1) ได้ไหมครับ? แทนที่เราจะยิง `SELECT` มาที่ Go แล้วค่อยยิง `UPDATE` กลับไป เราสั่งให้ PostgreSQL บวกลบยอดเงินในตัวด้วยคำสั่งเดียว:"
        },
        {
          "t": "codeout",
          "lang": "sql",
          "label": "การทำงานของ Atomic Update ใน simplebank/db/account.go",
          "code": "-- คำสั่งใน AddAccountBalance ที่เรามีอยู่แล้ว:\nUPDATE accounts\nSET balance = balance + $1\nWHERE id = $2\nRETURNING id, owner, balance, currency, created_at;",
          "out": "[การทำงานอัตโนมัติใน PostgreSQL เมื่อ 2 Goroutines ยิงพร้อมกัน]\n1. Goroutine #1 ยิง UPDATE แถว id=1 -> ได้รับ Exclusive Row Lock (ระดับ FOR NO KEY UPDATE) ทันที\n2. Goroutine #2 ยิง UPDATE แถว id=1 -> ถูก PostgreSQL สั่งให้ \"หยุดรอคิว (Block)\" ทันที!\n3. Goroutine #1 หักเงิน 100 เหลือ 0 -> สั่ง COMMIT -> ปลด Lock แถว id=1\n4. Goroutine #2 ได้รับคิวทำงานต่อบนยอดเงินล่าสุด (0 บาท) -> พยายามหักอีก 100 (กลายเป็น -100)\n5. PostgreSQL ปฏิเสธทันทีเพราะผิดกฎ CHECK (balance >= 0) -> Go สั่ง Rollback อัตโนมัติ!"
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
      "th": "ทำไมบัญชี 1 โอนหา 2 พร้อมกับบัญชี 2 โอนหา 1 ถึงทำให้ฐานข้อมูลค้าง? — ผ่าวงจร Circular Wait และอัปเกรด tx_transfer.go เป็น Version 2 ด้วยการจัดลำดับ Account ID",
      "en": "Why concurrent bidirectional transfers cause deadlocks and how strict resource ordering guarantees zero deadlocks."
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
          "t": "h2",
          "c": "1. ผ่ากลไกการเกิด Deadlock เมื่อโอนเงินสวนทางกัน"
        },
        {
          "t": "p",
          "c": "สมมติว่าในเสี้ยววินาทีเดียวกัน **นาย 1 โอนเงินให้นาย 2** (Transaction 1) พร้อมๆ กับที่ **นาย 2 โอนเงินกลับให้นาย 1** (Transaction 2) ในโค้ด `TransferTx` Version 1 ของเรา ขั้นตอนที่ 4 จะล็อกบัญชีผู้โอนก่อน แล้วขั้นตอนที่ 5 ค่อยล็อกบัญชีผู้รับ มาดูสิ่งที่เกิดขึ้น:"
        },
        {
          "t": "table",
          "head": [
            "จังหวะเวลา",
            "Transaction 1 (โอนจาก 1 -> 2)",
            "Transaction 2 (โอนจาก 2 -> 1)",
            "สถานะของระบบ"
          ],
          "rows": [
            [
              "จังหวะที่ 1",
              "สั่งหักเงินบัญชี 1 -> **ถือ Lock บัญชี 1 สำเร็จ**",
              "สั่งหักเงินบัญชี 2 -> **ถือ Lock บัญชี 2 สำเร็จ**",
              "ต่างฝ่ายต่างถือ Lock ของฝั่งตัวเองคนละใบ"
            ],
            [
              "จังหวะที่ 2",
              "พยายามเพิ่มเงินบัญชี 2 -> **หยุดรอ Lock บัญชี 2 (ซึ่ง Tx 2 ถืออยู่!)**",
              "พยายามเพิ่มเงินบัญชี 1 -> **หยุดรอ Lock บัญชี 1 (ซึ่ง Tx 1 ถืออยู่!)**",
              "🚨 **ติดกับดักวงกลม (Circular Wait / Deadlock)!**"
            ]
          ]
        },
        {
          "t": "codeout",
          "lang": "text",
          "label": "แผนภาพวงจรติดหล่มมรณะ (Circular Wait) และ Error จริงจาก PostgreSQL",
          "code": "Tx 1 (ถือ Lock บัญชี 1) --------------> รอขอ Lock บัญชี 2\n         ^                                        |\n         |                                        v\n   รอขอ Lock บัญชี 1 <-------------- Tx 2 (ถือ Lock บัญชี 2)",
          "out": "ERROR: deadlock detected (SQLSTATE 40P01)\nDETAIL: Process 1421 waits for ShareLock on transaction 984; blocked by process 1422.\nProcess 1422 waits for ShareLock on transaction 983; blocked by process 1421.\nHINT: See server log for query details."
        },
        {
          "t": "h2",
          "c": "2. วิธีแก้ปัญหาแบบ 100%: กฎการจัดลำดับทรัพยากร (Resource Ordering)"
        },
        {
          "t": "p",
          "c": "ในทางทฤษฎีวิทยาการคอมพิวเตอร์ Deadlock จะเกิดขึ้นได้ก็ต่อเมื่อมีการรอกันเป็นวงกลม (Circular Wait) เท่านั้น วิธีทำลายวงกลมนี้ทิ้งอย่างถาวรทำได้ด้วยกฎเพียงข้อเดียว:"
        },
        {
          "t": "callout",
          "title": "🔑 กฎทองคำ: ล็อกบัญชีที่มีรหัส ID น้อยกว่าก่อนเสมอ!",
          "c": "ไม่ว่าใครจะเป็นผู้โอนหรือใครจะเป็นผู้รับ ให้เปรียบเทียบเลข `Account ID` ก่อนเสมอ แล้ว **สั่งอัปเดต (ขอล็อก) บัญชีที่มีเลข ID น้อยกว่าเป็นอันดับแรก ตามด้วยบัญชีที่มีเลข ID มากกว่าเป็นอันดับที่สองเสมอ!**\n• **Tx 1 (1 โอนให้ 2)**: เห็นว่า `1 < 2` -> ขอล็อก **บัญชี 1** ก่อน แล้วค่อยล็อก **บัญชี 2**\n• **Tx 2 (2 โอนให้ 1)**: เห็นว่า `1 < 2` -> ต้องไปต่อคิวขอล็อก **บัญชี 1** ก่อนเช่นกัน! (ทำให้ Tx 2 หยุดรอตั้งแต่ก้าวแรก ไม่ไปแย่งล็อกบัญชี 2 มาขวางทาง Tx 1)"
        },
        {
          "t": "h2",
          "c": "3. แกะไวยากรณ์ Go ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "p",
          "c": "ในการเขียนฟังก์ชันผู้ช่วย `addMoney` เพื่อลดความซ้ำซ้อนของโค้ด เราจะใช้ไวยากรณ์ **Named Return Values** ที่เรียนไว้ในบทที่ 1.2:"
        },
        {
          "t": "table",
          "head": [
            "บรรทัดโค้ดใน addMoney",
            "คำอธิบายการทำงาน"
          ],
          "rows": [
            [
              ") (account1 Account, account2 Account, err error) {",
              "ประกาศชื่อตัวแปรขาออกทั้ง 3 ตัวไว้ที่หัวฟังก์ชัน Go จะสร้างตัวแปร `account1`, `account2`, และ `err` รอไว้ให้ทันทีโดยไม่ต้องพิมพ์ `var` ข้างในอีก"
            ],
            [
              "if err != nil {\n    return\n}",
              "เมื่อเกิด Error ในการอัปเดตบัญชีแรก คำสั่ง `return` เปล่าๆ (Naked return) จะส่งค่า `account1`, `account2`, และ `err` ออกไปจากฟังก์ชันทันที ช่วยให้โค้ดสั้นและอ่านง่ายมาก"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "4. อัปเกรดไฟล์ simplebank/db/tx_transfer.go เป็น Version 2 (Deadlock-Free)"
        },
        {
          "t": "p",
          "c": "มาดูจุดที่เปลี่ยนแปลงจาก Version 1 เป็น Version 2 แบบเปรียบเทียบบรรทัดต่อบรรทัด (Diff) ตามด้วยโค้ดฉบับเต็มพร้อมใช้งาน:"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "จุดที่แก้ไขใน simplebank/db/tx_transfer.go (เปลี่ยนขั้นตอนที่ 4-5 เป็นการจัดลำดับ ID)",
          "c": "- // ขั้นตอนที่ 4-5 เดิม: ล็อกผู้โอนก่อนเสมอ (ทำให้เกิด Deadlock เมื่อโอนสวนทางกัน)\n- result.FromAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n-     ID:     arg.FromAccountID,\n-     Amount: -arg.Amount,\n- })\n- result.ToAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n-     ID:     arg.ToAccountID,\n-     Amount: arg.Amount,\n- })\n+ // ขั้นตอนที่ 4 ใหม่: ล็อกและอัปเดตบัญชีที่มี ID น้อยกว่าก่อนเสมอผ่านฟังก์ชัน addMoney!\n+ if arg.FromAccountID < arg.ToAccountID {\n+     result.FromAccount, result.ToAccount, err = addMoney(\n+         ctx, q, arg.FromAccountID, -arg.Amount, arg.ToAccountID, arg.Amount,\n+     )\n+ } else {\n+     result.ToAccount, result.FromAccount, err = addMoney(\n+         ctx, q, arg.ToAccountID, arg.Amount, arg.FromAccountID, -arg.Amount,\n+     )\n+ }"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/tx_transfer.go (Version 2 ฉบับเต็ม: ป้องกัน Deadlock 100%)",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/tx_transfer.go\n// หน้าที่: ดำเนินธุรกรรมการโอนเงินภายใต้ ACID Transaction พร้อมป้องกัน Deadlock (Version 2)\n// แก้ปัญหา: จัดลำดับการล็อกแถว (Resource Ordering) จาก Account ID น้อยไปมากเสมอ\n// =============================================================================\npackage db\n\nimport \"context\"\n\n// TransferTxParams เก็บข้อมูลขาเข้าสำหรับการสั่งโอนเงินระหว่าง 2 บัญชี\ntype TransferTxParams struct {\n\tFromAccountID int64 `json:\"from_account_id\"`\n\tToAccountID   int64 `json:\"to_account_id\"`\n\tAmount        int64 `json:\"amount\"`\n}\n\n// TransferTxResult เก็บผลลัพธ์ทั้ง 5 ส่วนหลังจากโอนเงินสำเร็จ\ntype TransferTxResult struct {\n\tTransfer    Transfer `json:\"transfer\"`\n\tFromAccount Account  `json:\"from_account\"`\n\tToAccount   Account  `json:\"to_account\"`\n\tFromEntry   Entry    `json:\"from_entry\"`\n\tToEntry     Entry    `json:\"to_entry\"`\n}\n\n// addMoney เป็นฟังก์ชันผู้ช่วย (Private Helper) สำหรับอัปเดตยอดเงิน 2 บัญชีตามลำดับที่กำหนด\nfunc addMoney(\n\tctx context.Context,\n\tq *Queries,\n\taccountID1 int64,\n\tamount1 int64,\n\taccountID2 int64,\n\tamount2 int64,\n) (account1 Account, account2 Account, err error) {\n\t// ขั้นตอนที่ 1: อัปเดตและล็อกแถวของบัญชีลำดับที่ 1 ก่อน\n\taccount1, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\tID:     accountID1,\n\t\tAmount: amount1,\n\t})\n\tif err != nil {\n\t\treturn // คืนค่า account1, account2, และ err ออกไปทันที (Named Return)\n\t}\n\n\t// ขั้นตอนที่ 2: อัปเดตและล็อกแถวของบัญชีลำดับที่ 2 ตามมา\n\taccount2, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\tID:     accountID2,\n\t\tAmount: amount2,\n\t})\n\treturn\n}\n\n// TransferTx รันธุรกรรมการโอนเงินแบบปลอด Deadlock 100%\nfunc (store *Store) TransferTx(ctx context.Context, arg TransferTxParams) (TransferTxResult, error) {\n\tvar result TransferTxResult\n\n\terr := store.execTx(ctx, func(q *Queries) error {\n\t\tvar err error\n\n\t\t// ขั้นตอนที่ 1: บันทึกประวัติการโอนเงินลงตาราง transfers\n\t\tresult.Transfer, err = q.CreateTransfer(ctx, CreateTransferParams{\n\t\t\tFromAccountID: arg.FromAccountID,\n\t\t\tToAccountID:   arg.ToAccountID,\n\t\t\tAmount:        arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// ขั้นตอนที่ 2: บันทึกสมุดบัญชี Ledger เงินออกของบัญชีต้นทาง (-arg.Amount)\n\t\tresult.FromEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.FromAccountID,\n\t\t\tAmount:    -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// ขั้นตอนที่ 3: บันทึกสมุดบัญชี Ledger เงินเข้าของบัญชีปลายทาง (+arg.Amount)\n\t\tresult.ToEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.ToAccountID,\n\t\t\tAmount:    arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// ขั้นตอนที่ 4: ล็อกและปรับยอดเงินโดยเรียงจาก Account ID น้อยไปหามากเสมอ!\n\t\tif arg.FromAccountID < arg.ToAccountID {\n\t\t\t// กรณีผู้โอนมี ID น้อยกว่าผู้รับ: หักเงินผู้โอนก่อน แล้วค่อยเพิ่มเงินผู้รับ\n\t\t\tresult.FromAccount, result.ToAccount, err = addMoney(\n\t\t\t\tctx, q, arg.FromAccountID, -arg.Amount, arg.ToAccountID, arg.Amount,\n\t\t\t)\n\t\t} else {\n\t\t\t// กรณีผู้รับมี ID น้อยกว่าผู้โอน: เพิ่มเงินผู้รับก่อน แล้วค่อยหักเงินผู้โอน\n\t\t\tresult.ToAccount, result.FromAccount, err = addMoney(\n\t\t\t\tctx, q, arg.ToAccountID, arg.Amount, arg.FromAccountID, -arg.Amount,\n\t\t\t)\n\t\t}\n\n\t\treturn err\n\t})\n\n\treturn result, err\n}"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**สังเกตการสลับตัวแปรรับค่าในบล็อก `else`**: ในบล็อก `else` เราส่ง `arg.ToAccountID` เข้าไปเป็นอาร์กิวเมนต์ตัวแรกของ `addMoney` ดังนั้นค่าตัวแรกที่คืนกลับมาจึงต้องเก็บลงใน **`result.ToAccount`** ส่วนตัวที่สองเก็บลงใน **`result.FromAccount`**",
            "**สังเกตเครื่องหมายบวกลบของยอดเงิน**: ไม่ว่าจะเข้า `if` หรือ `else` ยอดเงินที่คู่กับ `FromAccountID` จะติดลบ (`-arg.Amount`) เสมอ และยอดเงินที่คู่กับ `ToAccountID` จะเป็นบวก (`arg.Amount`) เสมอ"
          ]
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
