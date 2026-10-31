import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/04-transactions.ts
// โมดูล 4: มัดรวมธุรกรรมโอนเงินด้วย ACID
// บทเรียน: 4.1 bank-acid-and-tx, 4.2 bank-money-transfer-logic
// =============================================================================

export const transactionPages: Record<string, Page> = {
  "bank-acid-and-tx": {
    slug: "bank-acid-and-tx",
    title: {
      th: "4.1 กลไก ACID & การสร้าง Transaction Manager (execTx)",
      en: "4.1 ACID Properties & Store Transaction Manager",
    },
    lead: {
      th: "ถอดรหัส 4 คุณสมบัติ ACID ที่รับประกันความปลอดภัยของเงิน และสร้าง Transaction Manager (execTx) ด้วย Callback Closure Pattern พร้อม Auto-Rollback",
      en: "Deconstruct ACID guarantees and build an idiomatic Go Transaction Manager (execTx) with closures and automatic rollback.",
    },
    group: "4. มัดรวมธุรกรรมโอนเงินด้วย ACID",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• เข้าใจคุณสมบัติทั้ง 4 ของ ACID (Atomicity, Consistency, Isolation, Durability) ผ่านสถานการณ์โอนเงินจริง\n• สร้าง `Store` struct ที่ผสานคำสั่ง SQL ของ `Queries` เข้ากับความสามารถเปิด Transaction ของ `*sql.DB`\n• เขียนฟังก์ชัน `execTx` โดยใช้ Go Closure เพื่อจัดการ Begin, Commit และ Auto-Rollback อย่างปลอดภัยในที่เดียว\n\n⏱ **เวลาในการเรียนรู้**: ~20 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านโมดูล 3 การเขียน CRUD",
        },
        {
          "t": "h2",
          "c": "1. ACID คืออะไร และปกป้องเงินของเราอย่างไร?",
        },
        {
          "t": "p",
          "c": "การโอนเงินไม่ใช่คำสั่ง SQL บรรทัดเดียว แต่เป็นการทำงานร่วมกันของ 5 คำสั่งย่อย ถ้าเซิร์ฟเวอร์เกิดไฟดับหรือสาย LAN หลุดตอนที่ทำไปได้ 3 คำสั่ง เงินจะหายไปทันที คุณสมบัติ **ACID** คือพันธสัญญาของฐานข้อมูล Relational Database ที่เข้ามารับประกันความปลอดภัยนี้:",
        },
        {
          "t": "table",
          "head": ["คุณสมบัติ", "ความหมาย", "ตัวอย่างในระบบ Simple Bank"],
          "rows": [
            [
              "A - Atomicity (เป็นเนื้อเดียว แบ่งแยกไม่ได้)",
              "All or Nothing: สำเร็จทั้งหมด หรือไม่เกิดขึ้นเลย",
              "หากหักเงินจาก Alice สำเร็จ แต่เกิด Error ก่อนจะเพิ่มเงินให้ Bob ระบบต้องยกเลิก (Rollback) ทุกอย่างกลับสู่จุดเริ่มต้น เสมือนไม่เคยมีอะไรเกิดขึ้น",
            ],
            [
              "C - Consistency (ความถูกต้องสอดคล้องตามกฎ)",
              "ข้อมูลต้องเป็นไปตามกฎและ Constraints เสมอ",
              "ยอดเงินรวมก่อนโอนกับหลังโอนต้องเท่ากันเสมอ และยอดเงินห้ามติดลบตามกฎ `CHECK (balance >= 0)`",
            ],
            [
              "I - Isolation (แยกส่วนไม่กวนกัน)",
              "ธุรกรรมที่รันพร้อมกันต้องไม่เห็นข้อมูลครึ่งๆ กลางๆ ของกันและกัน",
              "ในระหว่างที่ Alice กำลังโอนเงินให้ Bob คนอื่นที่ดึงข้อมูลยอดเงินจะต้องเห็นยอดเดิม จนกว่าธุรกรรมจะ Commit เสร็จสมบูรณ์",
            ],
            [
              "D - Durability (คงทนถาวร)",
              "เมื่อตอบว่าสำเร็จแล้ว ข้อมูลต้องอยู่ตลอดไปแม้เซิร์ฟเวอร์จะดับ",
              "เมื่อคำสั่ง Commit เสร็จสิ้น ข้อมูลถูกบันทึกลงดิสก์ (WAL) เรียบร้อยแล้ว แม้ปลั๊กไฟจะถูกดึงในมิลลิวินาทีถัดมา ข้อมูลก็ไม่สูญหาย",
            ],
          ],
        },
        {
          "t": "h2",
          "c": "2. แพทเทิร์น Store & Transaction Manager",
        },
        {
          "t": "p",
          "c": "ในบทที่ 3 เรามี `Queries` สำหรับรันคำสั่ง CRUD ทั่วไป แต่ `Queries` มีแค่ `DBTX` ตัวเดียว มันไม่สามารถสั่ง `BeginTx` ได้ ดังนั้น เราจึงสร้าง Struct ใหม่ชื่อ `Store` ขึ้นมา ซึ่งรวบรวมทั้งสองสิ่งเข้าด้วยกัน:",
        },
        {
          "t": "ul",
          "c": [
            "**`*Queries` (Struct Embedding)**: ทำให้ `Store` มีเมธอดทุกตัวของ `Queries` โดยอัตโนมัติ (เช่น `store.GetAccount(...)`)",
            "**`db *sql.DB`**: ตัวเชื่อมต่อฐานข้อมูลหลัก ที่มีความสามารถในการเปิด Transaction (`db.BeginTx`)",
          ],
        },
        {
          "t": "h2",
          "c": "3. สร้าง execTx ด้วย Callback Closure Pattern",
        },
        {
          "t": "p",
          "c": "แทนที่จะต้องเขียน `tx.Begin()`, ตรวจสอบ Error, สั่ง `tx.Rollback()`, และ `tx.Commit()` ซ้ำๆ ทุกที่ เราจะรวมตรรกะนี้ไว้ในฟังก์ชันตัวช่วย `execTx` เพียงแห่งเดียวใน `simplebank/db/store.go`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/store.go",
          "c": "package db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"fmt\"\n)\n\n// Store รวมความสามารถของ Queries และการจัดการ Transaction\ntype Store struct {\n\t*Queries\n\tdb *sql.DB\n}\n\nfunc NewStore(db *sql.DB) *Store {\n\treturn &Store{\n\t\tQueries: New(db),\n\t\tdb:      db,\n\t}\n}\n\n// execTx จัดการ Transaction Lifecycle: Begin -> ทำงานใน fn -> Rollback หรือ Commit\nfunc (s *Store) execTx(ctx context.Context, fn func(*Queries) error) error {\n\ttx, err := s.db.BeginTx(ctx, nil)\n\tif err != nil {\n\t\treturn err\n\t}\n\n\t// สร้าง Queries ใหม่ที่ผูกเข้ากับ tx แทน db\n\tq := New(tx)\n\n\tif err := fn(q); err != nil {\n\t\tif rbErr := tx.Rollback(); rbErr != nil {\n\t\t\treturn fmt.Errorf(\"tx err: %v, rollback err: %v\", err, rbErr)\n\t\t}\n\t\treturn err\n\t}\n\n\treturn tx.Commit()\n}",
        },
        {
          "t": "callout",
          "title": "💡 ทำไม New(tx) ถึงใช้งานกับ New(db) ได้?",
          "c": "ย้อนกลับไปที่บทเรียน 1.2 เรื่อง **Interface**!\nเพราะฟังก์ชัน `New(db DBTX)` รับ Interface `DBTX` เข้ามา และทั้ง `*sql.DB` และ `*sql.Tx` ต่างมีเมธอด `ExecContext`, `QueryContext`, `QueryRowContext` ครบถ้วน ทำให้เราส่ง `tx` เข้าไปใน `New(tx)` ได้ทันทีอย่างสวยงาม",
        },
        {
          "t": "h2",
          "c": "4. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ถ้าฟังก์ชัน callback ภายใน execTx ทำงานสำเร็จทุกบรรทัด แต่จังหวะสุดท้ายเกิดเน็ตเวิร์กขาดตอนเรียก tx.Commit() ฐานข้อมูลจะทำอย่างไร?",
              "options": [
                {
                  "text": "ฐานข้อมูลจะ Rollback การเปลี่ยนแปลงทั้งหมด ข้อมูลกลับสู่สภาพเดิมก่อนเริ่ม Transaction",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! เพราะตามหลัก Atomicity ของ ACID ข้อมูลจะมีผลถาวรเมื่อคำสั่ง COMMIT ไปถึงและบันทึกลง WAL เท่านั้น เมื่อ connection หลุดกลางคัน PostgreSQL จะทำการ rollback ให้ทันที"
                },
                {
                  "text": "ฐานข้อมูลจะบันทึกข้อมูลไว้ครึ่งหนึ่งเฉพาะคำสั่งที่รันผ่านแล้ว",
                  "isCorrect": false,
                  "explain": "ผิด! นี่คือสิ่งที่ผิดกฎ Atomicity ('All or Nothing') ข้อมูลจะไม่ถูกบันทึกครึ่งๆ กลางๆ เด็ดขาด"
                },
                {
                  "text": "ฐานข้อมูลจะค้างรอนาน 24 ชั่วโมงจนกว่า network จะต่อกลับมา",
                  "isCorrect": false,
                  "explain": "ไม่จริง PostgreSQL จะ timeout หรือตัด idle transaction ทิ้งและ rollback"
                }
              ],
              "explain": "หลักการสำคัญของ ACID: ไม่สำเร็จ 100% ก็ต้องเป็น 0% เท่านั้น ห้ามมีสถานะกึ่งกลาง"
            }
          ]
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "Transaction Engine พร้อมใช้งานแล้ว! ในบทที่ **4.2 โค้ดระบบโอนเงิน 5 ขั้นตอน (TransferTx)** เราจะนำ `execTx` ไปสร้างฟังก์ชันการโอนเงินจริงกันครับ",
        },
      ],
      en: [],
    },
  },

  "bank-money-transfer-logic": {
    slug: "bank-money-transfer-logic",
    title: {
      th: "4.2 โค้ดระบบโอนเงิน 5 ขั้นตอน (TransferTx)",
      en: "4.2 Money Transfer Business Logic (TransferTx)",
    },
    lead: {
      th: "ร้อยเรียง 5 ขั้นตอนของการโอนเงินเข้าด้วยกัน: สร้างใบเสร็จ Transfer, ลงบัญชี Entries ฝั่งลบและบวก, และปรับยอดเงิน Balance อย่างรัดกุม",
      en: "Implement the 5-step money transfer operation inside an atomic transaction: Transfer record, Entries, and Balance updates.",
    },
    group: "4. มัดรวมธุรกรรมโอนเงินด้วย ACID",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• ออกแบบ Struct พารามิเตอร์ขาเข้า (`TransferTxParams`) และผลลัพธ์ขาออก (`TransferTxResult`)\n• เขียนโค้ดระบบโอนเงินครบ 5 ขั้นตอนภายใน `store.execTx` เดียวกัน\n• เขียนฟังก์ชัน CRUD สำหรับตาราง `entries` และ `transfers` ให้พร้อมใช้งาน\n\n⏱ **เวลาในการเรียนรู้**: ~25 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านบท 4.1 เข้าใจการทำงานของ execTx",
        },
        {
          "t": "h2",
          "c": "1. ห้าขั้นตอนศักดิ์สิทธิ์ของการโอนเงิน",
        },
        {
          "t": "p",
          "c": "เมื่อมีคำสั่งโอนเงิน 10 ดอลลาร์จากบัญชี 1 (Alice) ไปยังบัญชี 2 (Bob) ภายใน 1 Transaction จะต้องเกิด 5 สิ่งนี้ขึ้นอย่างพร้อมเพรียงกัน:",
        },
        {
          "t": "ol",
          "c": [
            "**สร้างแถวประวัติในตาราง `transfers`**: บันทึกว่า From: 1, To: 2, Amount: 10",
            "**สร้างแถวในตาราง `entries` ฝั่งผู้โอน**: AccountID: 1, Amount: -10 (เงินออก)",
            "**สร้างแถวในตาราง `entries` ฝั่งผู้รับ**: AccountID: 2, Amount: +10 (เงินเข้า)",
            "**ปรับยอดเงินในตาราง `accounts` ฝั่งผู้โอน**: ลดลง 10",
            "**ปรับยอดเงินในตาราง `accounts` ฝั่งผู้รับ**: เพิ่มขึ้น 10",
          ],
        },
        {
          "t": "h2",
          "c": "2. เตรียมคำสั่ง CRUD สำหรับ entries และ transfers",
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/db/entry.go` เพื่อบันทึกประวัติการเดินบัญชี:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/entry.go",
          "c": "package db\n\nimport \"context\"\n\ntype CreateEntryParams struct {\n\tAccountID int64\n\tAmount    int64\n}\n\nfunc (q *Queries) CreateEntry(ctx context.Context, arg CreateEntryParams) (Entry, error) {\n\tconst query = `INSERT INTO entries (account_id, amount)\nVALUES ($1, $2)\nRETURNING id, account_id, amount, created_at`\n\n\trow := q.db.QueryRowContext(ctx, query, arg.AccountID, arg.Amount)\n\tvar e Entry\n\terr := row.Scan(&e.ID, &e.AccountID, &e.Amount, &e.CreatedAt)\n\treturn e, err\n}",
        },
        {
          "t": "p",
          "c": "และสร้างไฟล์ `simplebank/db/transfer.go` เพื่อบันทึกประวัติธุรกรรมการโอน:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/transfer.go",
          "c": "package db\n\nimport \"context\"\n\ntype CreateTransferParams struct {\n\tFromAccountID int64\n\tToAccountID   int64\n\tAmount        int64\n}\n\nfunc (q *Queries) CreateTransfer(ctx context.Context, arg CreateTransferParams) (Transfer, error) {\n\tconst query = `INSERT INTO transfers (from_account_id, to_account_id, amount)\nVALUES ($1, $2, $3)\nRETURNING id, from_account_id, to_account_id, amount, created_at`\n\n\trow := q.db.QueryRowContext(ctx, query, arg.FromAccountID, arg.ToAccountID, arg.Amount)\n\tvar t Transfer\n\terr := row.Scan(&t.ID, &t.FromAccountID, &t.ToAccountID, &t.Amount, &t.CreatedAt)\n\treturn t, err\n}",
        },
        {
          "t": "h2",
          "c": "3. เขียนฟังก์ชัน TransferTx (tx_transfer.go)",
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/db/tx_transfer.go` โดยแบ่งออกเป็น 2 ส่วนคือ **โครงสร้างข้อมูลขาเข้า/ขาออก** และ **ฟังก์ชันดำเนินการโอนเงิน**:",
        },
        {
          "t": "p",
          "c": "**ส่วนที่ 3.1: นิยาม `TransferTxParams` (ขาเข้า) และ `TransferTxResult` (ขาออก)**\nเราออกแบบให้ผลลัพธ์ส่งกลับทั้งใบเสร็จ `Transfer`, รายการเดินบัญชี `FromEntry`/`ToEntry`, และข้อมูลบัญชีล่าสุด `FromAccount`/`ToAccount` เพื่อให้ API นำไปตอบกลับลูกค้าได้ทันทีในครั้งเดียวโดยไม่ต้องคิวรีซ้ำ:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/tx_transfer.go (ส่วนที่ 1: Struct ขาเข้าและผลลัพธ์ขาออก)",
          "c": "package db\n\nimport \"context\"\n\ntype TransferTxParams struct {\n\tFromAccountID int64 `json:\"from_account_id\"`\n\tToAccountID   int64 `json:\"to_account_id\"`\n\tAmount        int64 `json:\"amount\"`\n}\n\ntype TransferTxResult struct {\n\tTransfer    Transfer `json:\"transfer\"`\n\tFromAccount Account  `json:\"from_account\"`\n\tToAccount   Account  `json:\"to_account\"`\n\tFromEntry   Entry    `json:\"from_entry\"`\n\tToEntry     Entry    `json:\"to_entry\"`\n}",
        },
        {
          "t": "p",
          "c": "**ส่วนที่ 3.2: ฟังก์ชัน `TransferTx` มัดรวม 5 ขั้นตอนภายใต้ `s.execTx`**\nเขียนต่อท้ายในไฟล์ `simplebank/db/tx_transfer.go` หากขั้นตอนใดขั้นตอนหนึ่งคืนค่า `err != nil` ฟังก์ชันจะหยุดทันทีและ `execTx` จะสั่ง `Rollback()` ข้อมูลทั้งหมดกลับสู่สภาพเดิมอัตโนมัติ:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/tx_transfer.go (ส่วนที่ 2: ฟังก์ชัน TransferTx)",
          "c": "// TransferTx ดำเนินการโอนเงิน 5 ขั้นตอนภายใน 1 Transaction\nfunc (s *Store) TransferTx(ctx context.Context, arg TransferTxParams) (TransferTxResult, error) {\n\tvar result TransferTxResult\n\n\terr := s.execTx(ctx, func(q *Queries) error {\n\t\tvar err error\n\n\t\t// ขั้นที่ 1: บันทึกใบเสร็จโอนเงิน (Transfer)\n\t\tresult.Transfer, err = q.CreateTransfer(ctx, CreateTransferParams{\n\t\t\tFromAccountID: arg.FromAccountID,\n\t\t\tToAccountID:   arg.ToAccountID,\n\t\t\tAmount:        arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// ขั้นที่ 2: บันทึกสมุดบัญชีฝั่งผู้โอน (เงินออกเป็นค่าลบ -Amount)\n\t\tresult.FromEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.FromAccountID,\n\t\t\tAmount:    -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// ขั้นที่ 3: บันทึกสมุดบัญชีฝั่งผู้รับ (เงินเข้าเป็นค่าบวก +Amount)\n\t\tresult.ToEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.ToAccountID,\n\t\t\tAmount:    arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// ขั้นที่ 4: หักยอดเงินในบัญชีผู้โอน\n\t\tresult.FromAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\t\tID:     arg.FromAccountID,\n\t\t\tAmount: -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// ขั้นที่ 5: เพิ่มยอดเงินในบัญชีผู้รับ\n\t\tresult.ToAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\t\tID:     arg.ToAccountID,\n\t\t\tAmount: arg.Amount,\n\t\t})\n\t\treturn err\n\t})\n\n\treturn result, err\n}",
        },
        {
          "t": "h2",
          "c": "4. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ทำไม TransferTxResult จึงต้องส่งทั้ง Transfer, FromEntry, ToEntry และ Accounts ล่าสุดกลับมาให้ caller?",
              "options": [
                {
                  "text": "เพื่อให้ API layer ตอบ JSON กลับ client ได้ทันทีโดยไม่ต้องยิง SELECT ซ้ำ ช่วยลดภาระ DB และ latency",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! เนื่องจากคำสั่ง SQL เช่น AddAccountBalance หรือ CreateTransfer ใช้ RETURNING * ได้ข้อมูลล่าสุดทันที การส่งกลับก้อนผลลัพธ์ทำให้ API ไม่ต้อง query ซ้ำ"
                },
                {
                  "text": "เพราะ Go ไม่อนุญาตให้คืนค่า struct ที่มีข้อมูลไม่ครบทุก field",
                  "isCorrect": false,
                  "explain": "ไม่เกี่ยวกัน Go คืน struct ที่เป็น zero-value ได้ตามปกติ"
                },
                {
                  "text": "เพื่อบังคับให้ database ตรวจสอบ foreign key เพิ่มเติม",
                  "isCorrect": false,
                  "explain": "foreign key ตรวจสอบใน DB engine ระหว่างรัน query ไม่ได้ขึ้นกับ struct ฝั่ง Go"
                }
              ],
              "explain": "การออกแบบ Transaction Result ที่ครบถ้วนทำให้ Frontend/Mobile ได้ยอดเงินคงเหลือและเลขอ้างอิงสลิปทันทีใน response เดียว"
            }
          ]
        },
        {
          "t": "callout",
          "title": "🚨 ข้อสังเกตสำคัญ & สิ่งที่จะเจอในโมดูลถัดไป",
          "c": "โค้ดข้างต้นดูเรียบร้อยดีเมื่อมีคนโอนเงินทีละคน... **แต่ถ้ามีคน 10 คนกดยิงโอนเงินพร้อมกันในเสี้ยววินาทีเดียวกันล่ะ?** หรือถ้า Alice โอนให้ Bob พร้อมกับที่ Bob โอนให้ Alice ล่ะ? ระบบจะทำงานถูกต้องไหม? หรือจะเกิด Deadlock พังทั้งระบบ?\n\nในโมดูลที่ 5 เราจะมาเขียน Concurrency Test พิสูจน์บั๊กนี้กันครับ!",
        },
      ],
      en: [],
    },
  },
};
