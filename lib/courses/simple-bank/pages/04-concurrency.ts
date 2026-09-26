import type { Page } from "@/lib/types";

export const concurrencyPages: Record<string, Page> = {
  "bank-concurrency-race-condition": {
    slug: "bank-concurrency-race-condition",
    title: {
      th: "Race Condition & Row Locking (SELECT FOR UPDATE)",
      en: "Race Condition & Pessimistic Row Locking",
    },
    lead: {
      th: "เจาะลึกปัญหา Race Condition เมื่อเงินถูกถอนพร้อมกันในเสี้ยววินาที และวิธีใช้คำสั่ง SELECT FOR UPDATE / NO KEY UPDATE ของ PostgreSQL เพื่อล็อกแถวข้อมูล",
      en: "Unraveling race conditions under concurrent requests and applying PostgreSQL pessimistic row locking.",
    },
    group: "4. Concurrency & Deadlock Prevention",
    blocks: {
      th: [
        {
          t: "p",
          c: "ลองจินตนาการถึงสถานการณ์จริงในวันเงินเดือนออก หรือจังหวะกดแย่งซื้อตั๋วคอนเสิร์ต: มีผู้ใช้งานกดยิงคำขอพร้อมกันเป็นร้อยๆ คำขอในเสี้ยววินาทีเดียวกัน หากระบบหลังบ้านของเราไม่มีการป้องกัน ข้อมูลตัวเลขในฐานข้อมูลจะพังพินาศทันทีจากปรากฏการณ์ที่เรียกว่า **Race Condition**",
        },

        { t: "h2", c: "วิเคราะห์ภาพจำลอง: เงินงอกจากการอ่านข้อมูลเก่า (Stale Read)" },
        {
          t: "p",
          c: "สมมตินาย Bob มีเงินในบัญชีเพียง 100 บาท แล้วเขากดสั่งโอนเงิน 100 บาทพร้อมกัน 2 เครื่องในเวลาเดียวกันเป๊ะ:",
        },
        {
          t: "table",
          head: ["เวลา (Time)", "Transaction 1 (เครื่องที่ 1)", "Transaction 2 (เครื่องที่ 2)", "ผลลัพธ์ในฐานข้อมูล"],
          rows: [
            ["T1", "อ่านยอดเงิน Bob (ได้ 100 บาท)", "รอประมวลผล", "ยอดเงินจริง = 100 บาท"],
            ["T2", "กำลังคำนวณ", "อ่านยอดเงิน Bob (ได้ 100 บาทเช่นกัน!)", "ยอดเงินจริง = 100 บาท"],
            ["T3", "หักเงิน 100 บาท: 100 - 100 = 0", "กำลังคำนวณ", "ยอดเงินจริง = 0 บาท"],
            ["T4", "Commit สำเร็จ (เงินออก 100)", "หักเงิน 100 บาท: 100 - 100 = 0", "ยอดเงินจริง = 0 บาท"],
            ["T5", "-", "Commit สำเร็จ (เงินออกอีก 100)", "Bob ได้เงินออกไป 200 บาท ทั้งที่มีเงินแค่ 100 บาท!"],
          ],
        },
        {
          t: "callout",
          title: "🚨 เกิดอะไรขึ้น?",
          c: "Transaction 2 ทำการอ่านค่ายอดเงิน (Read) ก่อนที่ Transaction 1 จะทันได้บันทึกการหักเงิน (Commit) ทำให้ Transaction 2 มองเห็นข้อมูลเก่า (Stale Read) และยอมให้เงินไหลออกจากระบบซ้ำสอง! ในโลกการเงิน ปัญหานี้เรียกว่า 'Double Spending' ซึ่งธนาคารต้องเป็นผู้รับผิดชอบความเสียหายทั้งหมด",
          warn: true,
        },
        {
          t: "codeout",
          lang: "text",
          label: "จำลองภาพสิ่งที่เกิดขึ้นจริงใน Terminal เมื่อเกิด Stale Read (ไม่มี Lock)",
          code: `// Goroutine 1 & 2 ยิงคำขอถอนเงิน 100 บาทพร้อมกันในเสี้ยววินาทีเดียว
go withdrawWithoutLock(accID, 100)
go withdrawWithoutLock(accID, 100)`,
          out: `[Goroutine 1] SELECT balance FROM accounts WHERE id = 1 -> ได้ 100 บาท (อนุมัติถอน)
[Goroutine 2] SELECT balance FROM accounts WHERE id = 1 -> ได้ 100 บาท (Stale Read! อนุมัติถอน)
[Goroutine 1] UPDATE accounts SET balance = 0 WHERE id = 1 -> ส่งมอบเงินสด 100 บาท
[Goroutine 2] UPDATE accounts SET balance = 0 WHERE id = 1 -> ส่งมอบเงินสด 100 บาท
[สรุปหายนะ] บัญชีมีเงิน 100 บาท แต่ถูกถอนออกไปได้ 200 บาท! (Double Spending ขาดทุน 100 บาท)`,
        },

        { t: "h2", c: "ทางออก: Pessimistic Row Locking (การล็อกแถวข้อมูล)" },
        {
          t: "p",
          c: "วิธีแก้ปัญหาที่เด็ดขาดและปลอดภัยที่สุดใน Relational Database คือการใช้ **Pessimistic Locking (การล็อกแบบมองโลกในแง่ร้าย)** โดยสั่งให้คำสั่ง SQL ขอสิทธิ์ครอบครองแถวข้อมูลนั้นแต่เพียงผู้เดียว ผ่านคำสั่ง `SELECT ... FOR UPDATE`",
        },
        {
          t: "code",
          lang: "sql",
          label: "การใช้ SELECT FOR UPDATE",
          c: `-- เมื่อ Transaction แรกสั่งล็อกแถว
SELECT id, owner, balance, currency FROM accounts
WHERE id = 1 FOR UPDATE;

-- Transaction อื่นๆ ที่พยายามจะอ่านแถว id = 1 ด้วย FOR UPDATE เหมือนกัน
-- จะต้อง 'หยุดรอ (Block)' จนกว่า Transaction แรกจะสั่ง COMMIT หรือ ROLLBACK!`,
        },

        { t: "h2", c: "กับดัก Foreign Key & `NO KEY UPDATE` ใน PostgreSQL" },
        {
          t: "p",
          c: "นี่คือจุดที่แยกระหว่าง Junior Developer กับ Senior Developer! ใน PostgreSQL คำสั่ง `FOR UPDATE` มีพลังในการล็อกสูงมาก มันจะล็อกทั้งตัวข้อมูลและ Primary Key",
        },
        {
          t: "p",
          c: "แต่ในระบบของเรา ตาราง `transfers` มี Foreign Key อ้างอิงกลับมาที่ `accounts.id` เมื่อมีคำสั่งแทรกข้อมูลลงตาราง `transfers` ฐานข้อมูลจำเป็นต้องแอบมาส่องดู `accounts` เพื่อเช็ก Foreign Key หากเราใช้ `FOR UPDATE` ตัวเต็ม มันอาจจะไปขัดขวางการเช็ก Foreign Key จนเกิดอาการค้างหรือ Deadlock โดยไม่จำเป็น",
        },
        {
          t: "callout",
          title: "⚡ ท่าไม้ตาย: SELECT ... FOR NO KEY UPDATE",
          c: "ใน PostgreSQL มีคำสั่งพิเศษคือ `FOR NO KEY UPDATE` ซึ่งเป็นการบอกฐานข้อมูลว่า 'ฉันต้องการล็อกแถวนี้เพื่อแก้คอลัมน์ balance นะ แต่ฉันสัญญาว่าจะไม่แตะต้องคอลัมน์ที่เป็น Key (id)' ทำให้คำสั่งอื่นๆ ที่ต้องการเช็ก Foreign Key สามารถทำงานคู่ขนานกันได้อย่างราบรื่น ไร้ข้อติดขัด!",
        },

        { t: "h2", c: "ท่าที่กระชับและเร็วยิ่งขึ้น: Atomic Update ในตัว SQL" },
        {
          t: "p",
          c: "แทนที่จะต้องยิง 2 คำสั่ง (SELECT FOR UPDATE ก่อน แล้วค่อย UPDATE) เราสามารถรวมเหลือเพียงคำสั่งเดียวได้โดยตรง เพราะในฐานข้อมูล PostgreSQL เมื่อเรารันคำสั่ง `UPDATE` บนแถวใดๆ ระบบจะทำการล็อกแถวนั้น (Exclusive Lock) ให้อัตโนมัติอยู่แล้ว:",
        },
        {
          t: "code",
          lang: "sql",
          label: "db/query/account.sql",
          c: `-- name: AddAccountBalance :one
UPDATE accounts
SET balance = balance + $1
WHERE id = $2
RETURNING id, owner, balance, currency, created_at;`,
        },
        {
          t: "p",
          c: "หากเราส่ง `$1` เป็น `-100` เงินจะลดลง 100 บาท หากส่ง `+100` เงินจะเพิ่มขึ้น 100 บาท การสั่ง `balance = balance + $1` ในระดับ SQL จะการันตีความถูกต้องในระดับหน่วยย่อยที่สุดของ Database และประหยัด Network Round-trip ไปได้ถึงครึ่งหนึ่ง!",
        },
        {
          t: "codeout",
          lang: "text",
          label: "เปรียบเทียบพฤติกรรมในระดับ Database เมื่อใช้ Atomic Update",
          code: `-- คำสั่ง 2 ตัวยิงเข้าฐานข้อมูลพร้อมกัน
Tx 1: UPDATE accounts SET balance = balance - 100 WHERE id = 1;
Tx 2: UPDATE accounts SET balance = balance - 100 WHERE id = 1;`,
          out: `[Tx 1] ได้รับ Exclusive Row Lock บนแถว id = 1 ทันที -> balance 100 - 100 = 0
[Tx 2] พยายามแก้ไขแถว id = 1 -> ถูก PostgreSQL สั่งให้ "หยุดรอ (Block)"
[Tx 1] COMMIT ธุรกรรมสำเร็จ -> ปลด Row Lock
[Tx 2] ได้รับ Row Lock ต่อมา -> อ่านค่ายอดเงินล่าสุดพบว่าเป็น 0 บาท -> ตรวจสอบว่าไม่พอถอน ปฏิเสธคำสั่ง!
[สรุปความปลอดภัย] ข้อมูลเงินคงเส้นคงวา (Consistent) ปราศจาก Double Spending 100%`,
        },
      ],
      en: [],
    },
  },

  "bank-deadlock-prevention": {
    slug: "bank-deadlock-prevention",
    title: {
      th: "ไขปริศนา Deadlock & วิธีแก้ด้วย Resource Ordering",
      en: "Deadlock Analysis & Resource Ordering Prevention",
    },
    lead: {
      th: "ทำไมบัญชี A โอนหา B พร้อมกับ B โอนหา A ถึงทำให้ระบบค้าง? — วิเคราะห์วงจร Deadlock และพิสูจน์วิธีแก้ปัญหาเชิงคณิตศาสตร์ด้วยการจัดลำดับ Account ID",
      en: "Why concurrent bidirectional transfers cause deadlocks and how strict resource ordering mathematically guarantees a cycle-free DAG.",
    },
    group: "4. Concurrency & Deadlock Prevention",
    blocks: {
      th: [
        {
          t: "p",
          c: "แม้เราจะใส่การล็อกแถวข้อมูลเพื่อแก้ Race Condition แล้ว แต่เราอาจกำลังเดินเข้าสู่กับดักที่ร้ายแรงกว่าเดิม นั่นคือ **Deadlock (ภาวะติดหล่มมรณะ)** ซึ่งเป็นอาการที่โปรเซสสองตัวต่างคนต่างรอให้โปรเซสอีกฝั่งปล่อยทรัพยากร จนไม่มีใครสามารถทำงานต่อได้",
        },

        { t: "h2", c: "จุดกำเนิดของ Deadlock: การโอนเงินสวนทางกัน" },
        {
          t: "p",
          c: "สมมตินาย 1 ต้องการโอนเงินให้นาย 2 ในจังหวะเดียวกับที่นาย 2 ต้องการโอนเงินให้นาย 1:",
        },
        {
          t: "ul",
          c: [
            "**Transaction 1 (1 โอนให้ 2):** ล็อกบัญชี 1 สำเร็จ จากนั้นพยายามจะขอสิทธิ์ล็อกบัญชี 2",
            "**Transaction 2 (2 โอนให้ 1):** ล็อกบัญชี 2 สำเร็จ จากนั้นพยายามจะขอสิทธิ์ล็อกบัญชี 1",
          ],
        },
        {
          t: "p",
          c: "ดูสิ่งที่เกิดขึ้น: Transaction 1 ถือบัญชี 1 แล้วรอขอบัญชี 2... แต่บัญชี 2 ถูก Transaction 2 ถือครองอยู่ และ Transaction 2 ก็กำลังรอขอบัญชี 1 จาก Transaction 1 เช่นกัน!",
        },
        {
          t: "code",
          lang: "text",
          label: "ภาพแสดงวงจรปิดของ Deadlock (Circular Wait)",
          c: `Tx 1 (ถือ Lock บัญชี 1) --------------> รอขอ Lock บัญชี 2
         ^                                        |
         |                                        |
         |                                        v
   รอขอ Lock บัญชี 1 <-------------- Tx 2 (ถือ Lock บัญชี 2)`,
        },
        {
          t: "p",
          c: "ต่างคนต่างไม่ยอมปล่อย และต่างคนต่างรออีกฝั่ง เกิดเป็นวงรอบแบบงูกินหาง (Circular Dependency) หลังจากรอไปครู่หนึ่ง PostgreSQL จะตรวจพบวงจรนี้และสั่งฆ่าคำสั่งใดคำสั่งหนึ่งทิ้ง พร้อมพ่น Error สีแดงแจ๋ออกมา:",
        },
        {
          t: "codeout",
          lang: "text",
          label: "PostgreSQL Deadlock Log ใน Terminal Server",
          code: `-- Tx 1 (โอน 1 -> 2) และ Tx 2 (โอน 2 -> 1) ยิงชนกัน
UPDATE accounts SET balance = balance - 10 WHERE id = 2; -- (Tx 1 รอล็อก 2)
UPDATE accounts SET balance = balance - 10 WHERE id = 1; -- (Tx 2 รอล็อก 1)`,
          out: `ERROR: deadlock detected (SQLSTATE 40P01)
DETAIL: Process 1421 waits for ExclusiveLock on tuple (0,2) of relation "accounts"; blocked by process 1422.
Process 1422 waits for ExclusiveLock on tuple (0,1) of relation "accounts"; blocked by process 1421.
HINT: See server log for query details.
STATEMENT: UPDATE accounts SET balance = balance + $1 WHERE id = $2 RETURNING id, owner, balance, currency, created_at;`,
        },

        { t: "h2", c: "วิธีแก้ปัญหาที่ถูกต้อง: Strict Resource Ordering (การบังคับลำดับทรัพยากร)" },
        {
          t: "p",
          c: "ในทฤษฎี Computer Science ปัญหา Deadlock จะเกิดขึ้นได้ก็ต่อเมื่อมี **Circular Wait (การรอคอยเป็นวงกลม)** เท่านั้น หากเราสามารถกำจัดการรอเป็นวงกลมทิ้งไปได้ Deadlock จะไม่มีวันเกิดขึ้นในระบบของเราอีกเลย 100%!",
        },
        {
          t: "callout",
          title: "🔑 กฎทองคำแห่งการจัดลำดับ (Resource Ordering Rule)",
          c: "ไม่ว่าใครจะเป็นคนโอน หรือใครจะเป็นคนรับโอน ให้ระบบทำการ 'ล็อกบัญชีที่มี ID น้อยกว่าก่อนเสมอ' แล้วค่อยตามด้วยบัญชีที่มี ID มากกว่า!",
        },
        {
          t: "p",
          c: "มาดูลำดับใหม่ภายใต้กฎนี้:",
        },
        {
          t: "ul",
          c: [
            "**Tx 1 (บัญชี 1 โอนให้ 2):** เปรียบเทียบ ID พบว่า 1 < 2 -> ทำการล็อกบัญชี 1 ก่อน แล้วค่อยล็อกบัญชี 2",
            "**Tx 2 (บัญชี 2 โอนให้ 1):** เปรียบเทียบ ID พบว่า 1 < 2 -> **ต้องไปต่อคิวขอล็อกบัญชี 1 ก่อนเช่นกัน!**",
          ],
        },
        {
          t: "p",
          c: "เมื่อ Tx 2 ถูกบังคับให้ขอล็อกบัญชี 1 ก่อน Tx 2 จะหยุดรอตั้งแต่ก้าวแรก ไม่มีการไปแย่งล็อกบัญชี 2 ไว้ก่อน ทำให้ Tx 1 ทำงานจนจบและปล่อย Lock ทั้งหมด จากนั้น Tx 2 จึงค่อยเริ่มทำงานต่อตามคิว วงจร Deadlock จึงถูกทำลายจนหมดสิ้น!",
        },

        { t: "h2", c: "เขียนโค้ด Go จัดลำดับการโอนเงิน" },
        {
          t: "p",
          c: "เราจะสร้างฟังก์ชันผู้ช่วยชื่อ `addMoney` เพื่อสลับลำดับการอัปเดตยอดเงินตาม Account ID ให้ถูกต้องอัตโนมัติ:",
        },
        {
          t: "code",
          lang: "go",
          label: "db/store.go (อัปเดตฟังก์ชัน TransferTx ให้ปลอด Deadlock)",
          c: `package db

import "context"

// addMoney ทำการตัดเงินและเพิ่มเงินระหว่างสองบัญชี โดยล็อกบัญชีที่มี ID น้อยกว่าก่อนเสมอ
func addMoney(
	ctx context.Context,
	q *Queries,
	accountID1 int64,
	amount1 int64,
	accountID2 int64,
	amount2 int64,
) (account1 Account, account2 Account, err error) {
	account1, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{
		ID:     accountID1,
		Amount: amount1,
	})
	if err != nil {
		return
	}

	account2, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{
		ID:     accountID2,
		Amount: amount2,
	})
	return
}

// TransferTx เวอร์ชันป้องกัน Deadlock 100%
func (store *Store) TransferTx(ctx context.Context, arg TransferTxParams) (TransferTxResult, error) {
	var result TransferTxResult

	err := store.execTx(ctx, func(q *Queries) error {
		var err error

		// บันทึก Transfer และ Entries ตามปกติ
		result.Transfer, err = q.CreateTransfer(ctx, CreateTransferParams(arg))
		if err != nil {
			return err
		}

		result.FromEntry, err = q.CreateEntry(ctx, CreateEntryParams{
			AccountID: arg.FromAccountID,
			Amount:    -arg.Amount,
		})
		if err != nil {
			return err
		}

		result.ToEntry, err = q.CreateEntry(ctx, CreateEntryParams{
			AccountID: arg.ToAccountID,
			Amount:    arg.Amount,
		})
		if err != nil {
			return err
		}

		// พระเอกของเรา: เช็กว่า ID ไหนน้อยกว่า ให้อัปเดตบัญชีนั้นก่อนเสมอ!
		if arg.FromAccountID < arg.ToAccountID {
			result.FromAccount, result.ToAccount, err = addMoney(
				ctx, q, arg.FromAccountID, -arg.Amount, arg.ToAccountID, arg.Amount,
			)
		} else {
			result.ToAccount, result.FromAccount, err = addMoney(
				ctx, q, arg.ToAccountID, arg.Amount, arg.FromAccountID, -arg.Amount,
			)
		}

		return err
	})

	return result, err
}`,
        },
        {
          t: "h3", c: "อธิบายโค้ดทีละบรรทัด" },
        {
          t: "ul",
          c: [
            "**`if arg.FromAccountID < arg.ToAccountID`**: ตรวจสอบว่า ID ผู้โอนน้อยกว่าผู้รับหรือไม่",
            "**กรณี ID ผู้โอนน้อยกว่า (1 < 2)**: เรียก `addMoney` โดยส่ง `FromAccountID` (-amount) ก่อน แล้วตามด้วย `ToAccountID` (+amount)",
            "**กรณี ID ผู้รับน้อยกว่า (2 < 1)**: เรียก `addMoney` โดยส่ง `ToAccountID` (+amount) ก่อน แล้วตามด้วย `FromAccountID` (-amount)",
            "**ผลลัพธ์ในหน่วยความจำ**: ตัวแปร `result.FromAccount` และ `result.ToAccount` ยังคงเก็บค่าบัญชีผู้โอนและผู้รับอย่างถูกต้องตามเดิม แต่ในแง่ของฐานข้อมูล ลำดับการยิงคำสั่ง `UPDATE` ถูกการันตีว่าจะวิ่งจาก ID น้อยไปมากเสมอ ปราศจากโอกาสเกิด Deadlock ตลอดกาล!",
          ],
        },
        {
          t: "codeout",
          lang: "text",
          label: "จำลองการทำงานจริงใน Terminal หลังใช้ Resource Ordering (ไม่มี Deadlock อีกต่อไป)",
          code: `// ปล่อยคำสั่งโอนเงินสวนทางกันพร้อมกัน
go TransferTx(1 -> 2, 10 USD) // Tx 1
go TransferTx(2 -> 1, 10 USD) // Tx 2`,
          out: `[Tx 1] เปรียบเทียบ ID: 1 < 2 -> ขอล็อกแถว 1 ก่อน (สำเร็จ) -> กำลังขอล็อกแถว 2...
[Tx 2] เปรียบเทียบ ID: 1 < 2 -> ขอล็อกแถว 1 ก่อนเช่นกัน! -> พบ Tx 1 ถือครองอยู่ -> "หยุดรอตามคิว"
[Tx 1] ได้รับ Lock แถว 2 -> โอนเงินสำเร็จ -> Commit ธุรกรรม -> ปลด Lock ทั้งหมด
[Tx 2] หลุดจากการหยุดรอ -> เข้าครอบครอง Lock แถว 1 -> ได้รับ Lock แถว 2 -> Commit สำเร็จ!
ผลลัพธ์: การโอนเงินสวนทางกัน 10 รายการสำเร็จครบถ้วน ไร้ข้อผิดพลาด Deadlock (0 Deadlocks Detected)`,
        },
      ],
      en: [],
    },
  },
};
