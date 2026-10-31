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
          "c": "• เข้าใจว่า **Database Transaction** คืออะไร และทำไมการรันคำสั่ง SQL แยกทีละบรรทัดแบบปกติถึงทำให้เงินลูกค้าสูญหายได้\n• เข้าใจคุณสมบัติทั้ง 4 ของ ACID (Atomicity, Consistency, Isolation, Durability) ผ่านสถานการณ์โอนเงินจริง\n• เข้าใจโครงสร้าง `Store` struct ว่าทำไมต้องประกอบร่าง `*Queries` (Struct Embedding) คู่กับ `db *sql.DB`\n• เขียนฟังก์ชัน `execTx` โดยใช้ Go Closure เพื่อจัดการ Begin, Commit และ Auto-Rollback อย่างปลอดภัยในที่เดียว\n\n⏱ **เวลาในการเรียนรู้**: ~20 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านโมดูล 3 การเขียน CRUD",
        },
        {
          "t": "h2",
          "c": "1. Database Transaction คืออะไร และทำไมถึงจำเป็น?",
        },
        {
          "t": "p",
          "c": "ในบทที่ 3 เวลาเราเรียกฟังก์ชันอย่าง `CreateAccount` หรือ `AddAccountBalance` แต่ละคำสั่งจะทำงานแบบ **Auto-Commit (บันทึกผลลงฐานข้อมูลทันทีที่รันจบบรรทัดนั้น)** ซึ่งเหมาะกับงานเดี่ยวๆ ที่จบในคำสั่งเดียว",
        },
        {
          "t": "p",
          "c": "แต่สำหรับ **'การโอนเงิน'** มันไม่ใช่คำสั่ง SQL บรรทัดเดียวจบ! ในระบบธนาคาร การโอนเงิน 1 ครั้งต้องรันคำสั่ง SQL ถึง **5 ขั้นตอนติดต่อกัน** (สร้างใบเสร็จ Transfer -> ลงสมุดบัญชีฝั่งคนโอน `-10` -> ลงสมุดบัญชีฝั่งคนรับ `+10` -> หักยอดเงินคนโอน -> เพิ่มยอดเงินคนรับ) ลองจินตนาการดูว่า **ถ้าไม่มี Transaction แล้วเกิดเหตุไม่คาดฝันขึ้นกลางทางจะเกิดอะไรขึ้น?**",
        },
        {
          "t": "code",
          "lang": "text",
          "label": "💥 จำลองหายนะเมื่อรัน 5 ขั้นตอนแบบไม่มี Transaction (Auto-Commit ทีละบรรทัด)",
          "c": "ขั้นที่ 1: INSERT INTO transfers (from: Alice, to: Bob, amount: 100)  --> ✅ บันทึกสำเร็จ!\nขั้นที่ 2: INSERT INTO entries (account: Alice, amount: -100)         --> ✅ บันทึกสำเร็จ!\nขั้นที่ 3: INSERT INTO entries (account: Bob, amount: +100)           --> ✅ บันทึกสำเร็จ!\nขั้นที่ 4: UPDATE accounts SET balance = balance - 100 (Alice)        --> ✅ หักเงิน Alice สำเร็จ!\n⚡ [ทันใดนั้น! สายเน็ตเวิร์กกระตุก หรือ Database เซิร์ฟเวอร์รีสตาร์ตพอดี]\nขั้นที่ 5: UPDATE accounts SET balance = balance + 100 (Bob)          --> ❌ ล้มเหลว! คำสั่งไปไม่ถึง DB\n\nสรุปผลลัพธ์: เงินของ Alice ถูกหักหายไป 100 บาทถาวร แต่เงินไม่เคยเข้าบัญชีของ Bob เลย!",
        },
        {
          "t": "p",
          "c": "เพื่อป้องกันหายนะนี้ ฐานข้อมูลจึงมีกลไกที่เรียกว่า **Database Transaction (การมัดรวมธุรกรรม)** คือการเอาคำสั่ง SQL หลายๆ คำสั่งมาใส่ไว้ใน **'กล่องนิรภัยใบเดียวกัน'** โดยเปิดกล่องด้วยคำสั่ง **`BEGIN`** จากนั้นรันคำสั่งย่อยทั้ง 5 ขั้นตอนข้างใน:",
        },
        {
          "t": "ul",
          "c": [
            "**ถ้าผ่านครบทั้ง 5 ขั้นตอน**: เราจะสั่ง **`COMMIT`** เพื่อประทับตรายืนยันและบันทึกทุกอย่างลงฮาร์ดดิสก์พร้อมกันในเสี้ยววินาทีเดียว",
            "**แต่ถ้าพังแม้แต่ขั้นตอนเดียว (หรือไฟดับกลางคัน)**: เราจะสั่ง **`ROLLBACK`** (หรือฐานข้อมูลทำให้เองอัตโนมัติ) เพื่อย้อนเวลาล้างสิ่งที่ทำไปในขั้นที่ 1–4 ทิ้งทั้งหมด ให้ข้อมูลทุกตารางกลับสู่สภาพเดิม 100% เสมือนไม่เคยมีการกดโอนเงินเกิดขึ้นเลย!",
          ],
        },
        {
          "t": "h2",
          "c": "2. กฎเหล็ก 4 ข้อของ Transaction: คุณสมบัติ ACID",
        },
        {
          "t": "p",
          "c": "คำว่า **ACID** คือมาตรฐานสากล 4 ข้อของระบบฐานข้อมูล Relational Database (เช่น PostgreSQL) ที่รับประกันว่ากล่อง Transaction ของเราจะปลอดภัยไร้ที่ติในทุกสถานการณ์:",
        },
        {
          "t": "table",
          "head": ["คุณสมบัติ", "ความหมาย", "ตัวอย่างในระบบ Simple Bank"],
          "rows": [
            [
              "A - Atomicity (เป็นเนื้อเดียว แบ่งแยกไม่ได้)",
              "All or Nothing: สำเร็จทั้งหมด 100% หรือไม่เกิดขึ้นเลย (0%)",
              "หากหักเงินจาก Alice สำเร็จ แต่เกิด Error ก่อนจะเพิ่มเงินให้ Bob ระบบต้องยกเลิก (Rollback) ทุกอย่างกลับสู่จุดเริ่มต้น เสมือนไม่เคยมีอะไรเกิดขึ้น",
            ],
            [
              "C - Consistency (ความถูกต้องสอดคล้องตามกฎ)",
              "ข้อมูลก่อนและหลังจบ Transaction ต้องเป็นไปตามกฎและ Constraints เสมอ",
              "ยอดเงินรวมในระบบก่อนโอนกับหลังโอนต้องเท่ากันเป๊ะ และยอดเงินห้ามติดลบตามกฎ `CHECK (balance >= 0)`",
            ],
            [
              "I - Isolation (แยกส่วนไม่กวนกัน)",
              "ธุรกรรมที่รันพร้อมกันต้องไม่เห็นข้อมูลครึ่งๆ กลางๆ ของกันและกัน",
              "ในระหว่างที่ Alice กำลังโอนเงินให้ Bob (ทำไปได้ 3 จาก 5 ขั้นตอน) คนอื่นที่ดึงข้อมูลยอดเงินจะต้องยังไม่เห็นยอดที่ถูกตัดครึ่งๆ กลางๆ จนกว่าจะ Commit เสร็จสมบูรณ์",
            ],
            [
              "D - Durability (คงทนถาวร)",
              "เมื่อตอบว่า Commit สำเร็จแล้ว ข้อมูลต้องอยู่ตลอดไปแม้เซิร์ฟเวอร์จะไฟดับ",
              "เมื่อคำสั่ง Commit เสร็จสิ้น ข้อมูลถูกบันทึกลงดิสก์ (Write-Ahead Log: WAL) เรียบร้อยแล้ว แม้ปลั๊กไฟจะถูกดึงในมิลลิวินาทีถัดมา เงินก็ไม่สูญหาย",
            ],
          ],
        },
        {
          "t": "h2",
          "c": "3. ทำไมต้องสร้าง Store struct? (เบื้องหลังการรวมร่าง *Queries กับ *sql.DB)",
        },
        {
          "t": "p",
          "c": "คำถามสำคัญที่หลายคนสงสัยคือ: **'ในเมื่อเรามี `Queries` จากบทที่ 3 อยู่แล้ว ทำไมเราถึงใช้ `Queries` เปิด Transaction เลยไม่ได้ และต้องสร้าง `Store` struct ขึ้นมาทำไม?'** มาดูข้อจำกัดของ `Queries` กันครับ:",
        },
        {
          "t": "ul",
          "c": [
            "**ข้อจำกัดของ `Queries` ตัวเดิม**: ย้อนกลับไปดูในไฟล์ `db.go` ตัว `Queries` เก็บฟิลด์ `db DBTX` ซึ่งเป็นเพียง Interface ที่มีแค่ 3 เมธอดสำหรับยิงคำสั่ง SQL เดี่ยวๆ (`ExecContext`, `QueryContext`, `QueryRowContext`) **แต่มันไม่มีเมธอด `BeginTx()` สำหรับสั่งเปิด Transaction!**",
            "**ใครคือคนที่มีเมธอด `BeginTx()`?**: คนที่สั่งเปิดกล่อง Transaction ได้คือตัวจัดการฐานข้อมูลตัวจริงอย่าง **`*sql.DB`** เท่านั้น",
          ],
        },
        {
          "t": "p",
          "c": "ดังนั้น เพื่อให้ชั้นฐานข้อมูลของเราเก่งครบเครื่อง ทั้ง **'ยิงคำสั่ง CRUD เดี่ยวๆ ได้เหมือนเดิม'** และ **'สั่งเปิด Transaction มัดรวมหลายคำสั่งได้ด้วย'** เราจึงสร้าง Struct ใหม่ชื่อ **`Store`** ที่นำทั้ง 2 ชิ้นส่วนมาประกอบร่างกัน:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "โครงสร้างของ Store struct (ประกอบร่าง *Queries คู่กับ *sql.DB)",
          "c": "type Store struct {\n\t*Queries         // 1. Struct Embedding: สืบทอดคำสั่ง SQL เดี่ยวๆ ทั้งหมดมาไว้ที่ Store โดยตรง\n\tdb       *sql.DB // 2. Real DB Pool: เก็บสายเชื่อมต่อตัวจริงไว้สำหรับสั่ง db.BeginTx() เปิด Transaction\n}",
        },
        {
          "t": "ul",
          "c": [
            "**ชิ้นที่ 1: `*Queries` (เขียนแบบไม่ตั้งชื่อฟิลด์ = Struct Embedding)**: ตามที่เราเรียนในบทที่ 1.2 การฝัง `*Queries` ลงไปแบบนี้ ทำให้เมธอด CRUD ทุกตัวของ `Queries` (เช่น `CreateAccount`, `GetAccount`, `AddAccountBalance`) **ถูกเลื่อนขั้นขึ้นมาเป็นเมธอดของ `Store` โดยอัตโนมัติ** เวลาใช้งานโหมดปกติจึงเรียก `store.GetAccount(...)` ได้ทันที",
            "**ชิ้นที่ 2: `db *sql.DB` (ตัวเปิด Transaction)**: เก็บตัวเชื่อมต่อฐานข้อมูลหลักไว้ข้างใน เพื่อให้ `Store` สามารถเรียกคำสั่ง `s.db.BeginTx(ctx, nil)` เพื่อเปิดโหมด Transaction (`*sql.Tx`) ได้เมื่อต้องการโอนเงิน",
          ],
        },
        {
          "t": "callout",
          "title": "🔄 ภาพรวมการทำงานร่วมกัน: โหมดปกติ vs โหมด Transaction ใน Store",
          "c": "เมื่อเราสร้าง `store := NewStore(conn)` ขึ้นมา 1 ตัว มันจะทำงานได้ 2 โหมดอย่างลงตัว:\n• **โหมดที่ 1 (รันคำสั่งเดี่ยว เช่น เปิดบัญชี/ดูยอดเงิน)**: เรียก `store.CreateAccount(...)` → วิ่งผ่าน `*Queries` ตัวหลักที่ฝังอยู่ → ยิงลง `*sql.DB` ตรงๆ (Auto-Commit ทันที)\n• **โหมดที่ 2 (มัดรวมหลายคำสั่ง เช่น โอนเงิน)**: เรียก `store.execTx(...)` → ใช้ `store.db.BeginTx()` เปิดกล่องธุรกรรม ได้ตัวแปร `tx` (`*sql.Tx`) ออกมา → นำ `tx` ไปห่อเป็น **`q := New(tx)`** (`*Queries` ตัวใหม่เฉพาะกิจที่ผูกกับ Transaction นี้) → คำสั่ง SQL ทุกตัวที่เรียกผ่าน `q` จะวิ่งอยู่ใน Transaction เดียวกันทั้งหมด!",
        },
        {
          "t": "h2",
          "c": "4. สร้างฟังก์ชัน execTx ด้วย Callback Closure Pattern (store.go)",
        },
        {
          "t": "p",
          "c": "แทนที่เราจะต้องเขียนโค้ดเปิด `BeginTx`, คอยเช็ก `if err != nil` เพื่อสั่ง `Rollback()`, และสั่ง `Commit()` ซ้ำๆ ในทุกฟังก์ชันที่มีการทำธุรกรรม เราจะเขียนฟังก์ชันแม่ชื่อ **`execTx`** ไว้เพียงจุดเดียวในไฟล์ `simplebank/db/store.go` แล้วรับขั้นตอนการทำงานเข้ามาเป็นฟังก์ชัน Callback (`fn func(*Queries) error`):",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/store.go",
          "c": "package db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"fmt\"\n)\n\n// Store provides all functions to execute db queries and transactions\ntype Store struct {\n\t*Queries\n\tdb *sql.DB\n}\n\nfunc NewStore(db *sql.DB) *Store {\n\treturn &Store{\n\t\tQueries: New(db),\n\t\tdb:      db,\n\t}\n}\n\n// execTx executes a function within a database transaction with automatic rollback\nfunc (s *Store) execTx(ctx context.Context, fn func(*Queries) error) error {\n\ttx, err := s.db.BeginTx(ctx, nil)\n\tif err != nil {\n\t\treturn err\n\t}\n\n\t// Create a new Queries instance bound to the active transaction\n\tq := New(tx)\n\n\tif err := fn(q); err != nil {\n\t\tif rbErr := tx.Rollback(); rbErr != nil {\n\t\t\treturn fmt.Errorf(\"tx err: %v, rollback err: %v\", err, rbErr)\n\t\t}\n\t\treturn err\n\t}\n\n\treturn tx.Commit()\n}",
        },
        {
          "t": "p",
          "c": "**แกะรอยการทำงานทีละบรรทัดภายใน `execTx`:**",
        },
        {
          "t": "ul",
          "c": [
            "**`tx, err := s.db.BeginTx(ctx, nil)`**: สั่งเปิดกล่อง Transaction ใหม่ผ่าน `s.db` (`*sql.DB`) โดยคืนค่าตัวแปรธุรกรรม `tx` ชนิด `*sql.Tx` กลับมา (พารามิเตอร์ตัวที่สองที่ใส่ `nil` คือ `*sql.TxOptions` แปลว่าให้ใช้ระดับ Isolation Level มาตรฐานของ PostgreSQL คือ `Read Committed` โดยไม่ต้องตั้งค่าพิเศษ)",
            "**`q := New(tx)`**: **บรรทัดพระเอกของสถาปัตยกรรมนี้!** เรานำตัวแปร `tx` (`*sql.Tx`) ที่เพิ่งเปิดได้ ส่งเข้าไปใน `New(tx)` เพื่อสร้างตัวหุ้มคำสั่ง SQL (`*Queries`) ตัวใหม่เฉพาะกิจขึ้นมา เนื่องจากทั้ง `*sql.DB` และ `*sql.Tx` ต่างอิมพลีเมนต์ `DBTX` Interface เหมือนกันเป๊ะ จึงเสียบ `tx` เข้าไปแทน `db` ได้ทันที! ผลลัพธ์คือทุกคำสั่ง SQL ที่เรียกผ่าน `q` ตัวนี้จะถูกบังคับให้วิ่งอยู่ภายใต้ Transaction `tx` เดียวกันทั้งหมด",
            "**`if err := fn(q); err != nil` และ `tx.Rollback()`**: โยน `q` ตัวใหม่นี้เข้าไปให้ฟังก์ชัน `fn(q)` ทำงาน (เช่น รัน 5 ขั้นตอนของการโอนเงิน) หากมีขั้นตอนใดขั้นตอนหนึ่งส่ง Error กลับมา จะสั่ง **`tx.Rollback()`** เพื่อยกเลิกสิ่งที่ทำไปแล้วทั้งหมดให้กลับสู่สภาพเดิมทันที (และถ้าเกิดเหตุสุดวิสัยที่แม้แต่คำสั่ง Rollback เองก็ยังพัง เช่น เน็ตหลุดพอดี ก็จะรวบทั้ง `err` ต้นเหตุและ `rbErr` ส่งกลับไปให้ครบถ้วน)",
            "**`return tx.Commit()`**: หากทุกขั้นตอนใน `fn(q)` ทำงานผ่านฉลุย (คืนค่า `nil`) จะสั่ง **`tx.Commit()`** เพื่อยืนยันและบันทึกข้อมูลทั้งหมดลงฐานข้อมูลอย่างถาวร",
          ],
        },
        {
          "t": "h2",
          "c": "5. เช็กความเข้าใจ (Quick Quiz)",
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
          "c": "package db\n\nimport \"context\"\n\ntype CreateEntryParams struct {\n\tAccountID int64\n\tAmount    int64\n}\n\nfunc (q *Queries) CreateEntry(ctx context.Context, arg CreateEntryParams) (Entry, error) {\n\tconst query = `\n\t\tINSERT INTO entries (account_id, amount)\n\t\tVALUES ($1, $2)\n\t\tRETURNING id, account_id, amount, created_at\n\t`\n\n\trow := q.db.QueryRowContext(ctx, query, arg.AccountID, arg.Amount)\n\tvar e Entry\n\terr := row.Scan(&e.ID, &e.AccountID, &e.Amount, &e.CreatedAt)\n\treturn e, err\n}",
        },
        {
          "t": "p",
          "c": "และสร้างไฟล์ `simplebank/db/transfer.go` เพื่อบันทึกประวัติธุรกรรมการโอน:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/transfer.go",
          "c": "package db\n\nimport \"context\"\n\ntype CreateTransferParams struct {\n\tFromAccountID int64\n\tToAccountID   int64\n\tAmount        int64\n}\n\nfunc (q *Queries) CreateTransfer(ctx context.Context, arg CreateTransferParams) (Transfer, error) {\n\tconst query = `\n\t\tINSERT INTO transfers (from_account_id, to_account_id, amount)\n\t\tVALUES ($1, $2, $3)\n\t\tRETURNING id, from_account_id, to_account_id, amount, created_at\n\t`\n\n\trow := q.db.QueryRowContext(ctx, query, arg.FromAccountID, arg.ToAccountID, arg.Amount)\n\tvar t Transfer\n\terr := row.Scan(&t.ID, &t.FromAccountID, &t.ToAccountID, &t.Amount, &t.CreatedAt)\n\treturn t, err\n}",
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
          "c": "// TransferTx performs a money transfer from one account to another.\n// It creates a transfer record, adds account entries, and updates accounts balance within a single transaction.\nfunc (s *Store) TransferTx(ctx context.Context, arg TransferTxParams) (TransferTxResult, error) {\n\tvar result TransferTxResult\n\n\terr := s.execTx(ctx, func(q *Queries) error {\n\t\tvar err error\n\n\t\t// 1. Create transfer record\n\t\tresult.Transfer, err = q.CreateTransfer(ctx, CreateTransferParams{\n\t\t\tFromAccountID: arg.FromAccountID,\n\t\t\tToAccountID:   arg.ToAccountID,\n\t\t\tAmount:        arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 2. Create debit entry for sender (negative amount)\n\t\tresult.FromEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.FromAccountID,\n\t\t\tAmount:    -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 3. Create credit entry for receiver (positive amount)\n\t\tresult.ToEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.ToAccountID,\n\t\t\tAmount:    arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 4. Deduct amount from sender account\n\t\tresult.FromAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\t\tID:     arg.FromAccountID,\n\t\t\tAmount: -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 5. Add amount to receiver account\n\t\tresult.ToAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\t\tID:     arg.ToAccountID,\n\t\t\tAmount: arg.Amount,\n\t\t})\n\t\treturn err\n\t})\n\n\treturn result, err\n}",
        },
        {
          "t": "callout",
          "title": "⚠️ กฎเหล็กใน Closure ของ execTx: ต้องเรียกผ่านตัวแปร q เท่านั้น!",
          "c": "สังเกตภายใน `s.execTx(ctx, func(q *Queries) error { ... })` เราต้องเรียกคำสั่ง SQL ทั้ง 5 ขั้นตอนผ่านตัวแปร **`q`** (เช่น `q.CreateTransfer`, `q.AddAccountBalance`) เสมอ เพราะ `q` คือตัวที่ผูกอยู่กับ Transaction (`*sql.Tx`) ที่เพิ่งเปิดขึ้นมา\n\n**ห้ามเผลอเรียกผ่าน `s.` (เช่น `s.CreateTransfer`) ข้างในนี้เด็ดขาด!** เพราะ `s.` จะวิ่งไปใช้ `*sql.DB` ตัวนอก (Auto-Commit) ทำให้คำสั่งนั้นหลุดออกไปอยู่นอกกล่อง Transaction และไม่ถูก Rollback เมื่อเกิดข้อผิดพลาดครับ",
          "warn": true,
        },
        {
          "t": "p",
          "c": "📄 **โค้ดฉบับเต็มของไฟล์ `simplebank/db/tx_transfer.go` (รวมทั้ง 2 ส่วน พร้อมคัดลอกใช้งาน):**",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/tx_transfer.go (ฉบับสมบูรณ์)",
          "c": "package db\n\nimport \"context\"\n\ntype TransferTxParams struct {\n\tFromAccountID int64 `json:\"from_account_id\"`\n\tToAccountID   int64 `json:\"to_account_id\"`\n\tAmount        int64 `json:\"amount\"`\n}\n\ntype TransferTxResult struct {\n\tTransfer    Transfer `json:\"transfer\"`\n\tFromAccount Account  `json:\"from_account\"`\n\tToAccount   Account  `json:\"to_account\"`\n\tFromEntry   Entry    `json:\"from_entry\"`\n\tToEntry     Entry    `json:\"to_entry\"`\n}\n\n// TransferTx performs a money transfer from one account to another.\n// It creates a transfer record, adds account entries, and updates accounts balance within a single transaction.\nfunc (s *Store) TransferTx(ctx context.Context, arg TransferTxParams) (TransferTxResult, error) {\n\tvar result TransferTxResult\n\n\terr := s.execTx(ctx, func(q *Queries) error {\n\t\tvar err error\n\n\t\t// 1. Create transfer record\n\t\tresult.Transfer, err = q.CreateTransfer(ctx, CreateTransferParams{\n\t\t\tFromAccountID: arg.FromAccountID,\n\t\t\tToAccountID:   arg.ToAccountID,\n\t\t\tAmount:        arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 2. Create debit entry for sender (negative amount)\n\t\tresult.FromEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.FromAccountID,\n\t\t\tAmount:    -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 3. Create credit entry for receiver (positive amount)\n\t\tresult.ToEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.ToAccountID,\n\t\t\tAmount:    arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 4. Deduct amount from sender account\n\t\tresult.FromAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\t\tID:     arg.FromAccountID,\n\t\t\tAmount: -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 5. Add amount to receiver account\n\t\tresult.ToAccount, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{\n\t\t\tID:     arg.ToAccountID,\n\t\t\tAmount: arg.Amount,\n\t\t})\n\t\treturn err\n\t})\n\n\treturn result, err\n}",
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
