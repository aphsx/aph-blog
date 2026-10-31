import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/05-concurrency.ts
// โมดูล 5: รับมือคนกดพร้อมกัน: Concurrency & Deadlock
// บทเรียน: 5.1 bank-concurrency-testing, 5.2 bank-concurrency-race-condition, 5.3 bank-deadlock-prevention
// =============================================================================

export const concurrencyPages: Record<string, Page> = {
  "bank-concurrency-testing": {
    slug: "bank-concurrency-testing",
    title: {
      th: "5.1 เขียน Concurrent Test ด้วย Goroutines & Channels",
      en: "5.1 Concurrent Testing with Goroutines & Channels",
    },
    lead: {
      th: "เรียนรู้ Goroutine และ Channel จากตัวอย่างคลาสสิกของ Go Tour แล้วนำไปสร้างชุดทดสอบจำลองคน 5 คนกดยิงโอนเงินในเสี้ยววินาทีเดียวกัน",
      en: "Learn Goroutines and Channels from classic Go Tour examples, then build a concurrent stress test simulating simultaneous money transfers.",
    },
    group: "5. รับมือคนกดพร้อมกัน: Concurrency & Deadlock",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• เข้าใจการทำงานของ Goroutine ผ่านตัวอย่างคลาสสิก `say(\"hello\")` / `say(\"world\")`\n• ส่งและรับข้อมูลข้ามเธรดอย่างปลอดภัยด้วย Channel ผ่านตัวอย่างคำนวณผลรวม `sum`\n• นำความรู้ไปเขียน `TestTransferTx` รัน 5 Goroutines เพื่อทดสอบการโอนเงินพร้อมกันจริง\n\n⏱ **เวลาในการเรียนรู้**: ~25 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านโมดูล 4 ฟังก์ชัน TransferTx",
        },
        {
          "t": "h2",
          "c": "1. Goroutine: ทำงานคู่ขนานแบบกินแรมน้อยนิด",
        },
        {
          "t": "p",
          "c": "ในภาษาอื่นๆ การสร้าง OS Thread หนึ่งตัวอาจกินหน่วยความจำถึง 1-2 MB แต่ในภาษา Go เรามี **Goroutine** ซึ่งเป็น Lightweight Thread ที่กินแรมเริ่มต้นเพียง ~2 KB ทำให้เราสามารถเปิด Goroutine หลักหมื่นหรือหลักแสนตัวได้พร้อมกันโดยเครื่องไม่กระตุก",
        },
        {
          "t": "p",
          "c": "มาดูตัวอย่างคลาสสิกอันโด่งดังจาก **A Tour of Go**:",
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างคลาสสิกจาก A Tour of Go: go say(\"world\")",
          "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc say(s string) {\n\tfor i := 0; i < 3; i++ {\n\t\ttime.Sleep(100 * time.Millisecond)\n\t\tfmt.Println(s)\n\t}\n}\n\nfunc main() {\n\tgo say(\"world\") // สั่งให้ทำงานใน Goroutine ใหม่ทันที ไม่ต้องยืนรอ\n\tsay(\"hello\")    // ทำงานใน Goroutine หลัก (main)\n}",
          "out": "hello\nworld\nworld\nhello\nhello\nworld",
        },
        {
          "t": "p",
          "c": "สังเกตว่าคำว่า `hello` และ `world` สลับกันแสดงผลออกมา เพราะทั้งสองฟังก์ชันทำงานขนานกันในเวลาเดียวกันอย่างแท้จริง",
        },
        {
          "t": "h2",
          "c": "2. Channel: ทางด่วนส่งข้อมูลข้าม Goroutine",
        },
        {
          "t": "p",
          "c": "เมื่อเราเปิด Goroutine ทำงานแยกออกไป เราจะส่งผลลัพธ์หรือข้อผิดพลาดกลับมาหา Goroutine หลักได้อย่างไร? ปรัชญาของ Go คือ **'อย่าสื่อสารด้วยการแชร์หน่วยความจำ แต่จงแชร์หน่วยความจำด้วยการสื่อสาร (Channel)'**:",
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างคลาสสิกจาก A Tour of Go: แบ่งครึ่งคำนวณผลรวมด้วย Channel",
          "code": "package main\n\nimport \"fmt\"\n\nfunc sum(nums []int, c chan int) {\n\ttotal := 0\n\tfor _, n := range nums {\n\t\ttotal += n\n\t}\n\tc <- total // ส่งค่า total เข้าไปใน Channel c\n}\n\nfunc main() {\n\tnums := []int{7, 2, 8, -9, 4, 0}\n\n\tc := make(chan int)\n\tgo sum(nums[:len(nums)/2], c) // ครึ่งแรก:  7 + 2 + 8 = 17\n\tgo sum(nums[len(nums)/2:], c) // ครึ่งหลัง: -9 + 4 + 0 = -5\n\n\tx, y := <-c, <-c // รอรับข้อมูล 2 ตัวจาก Channel\n\tfmt.Println(x, y, x+y)\n}",
          "out": "-5 17 12",
        },
        {
          "t": "h2",
          "c": "3. นำมาสร้าง Concurrent Test สำหรับระบบโอนเงิน (store_test.go)",
        },
        {
          "t": "p",
          "c": "เรานำ Goroutine และ Channel มาเขียนชุดทดสอบ `TestTransferTx` ในไฟล์ `simplebank/db/store_test.go` โดยแบ่งออกเป็น 2 จังหวะคือ **จังหวะยิงคำสั่งโอนพร้อมกัน** และ **จังหวะตรวจสอบความถูกต้องของผลลัพธ์**:",
        },
        {
          "t": "p",
          "c": "**ส่วนที่ 3.1: เปิด 5 Goroutines ยิงคำสั่งโอนเงินพร้อมกันและส่งผลลัพธ์เข้า Channel**",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/store_test.go (ส่วนที่ 1: ยิงคำสั่งโอนเงินคู่ขนาน)",
          "c": "package db\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"testing\"\n\n\t\"github.com/stretchr/testify/require\"\n)\n\n// topUp เติมเงินเริ่มต้นให้บัญชีเพื่อความแน่ใจว่ามียอดเงินเพียงพอสำหรับการทดสอบโอนหลายครั้ง\nfunc topUp(t *testing.T, acc Account, amount int64) Account {\n\tupdated, err := testQueries.AddAccountBalance(context.Background(), AddAccountBalanceParams{\n\t\tID:     acc.ID,\n\t\tAmount: amount,\n\t})\n\trequire.NoError(t, err)\n\treturn updated\n}\n\nfunc TestTransferTx(t *testing.T) {\n\tstore := NewStore(testDB)\n\n\taccount1 := topUp(t, createRandomAccount(t), 1000)\n\taccount2 := createRandomAccount(t)\n\tfmt.Println(\">> ก่อนโอน:\", account1.Balance, account2.Balance)\n\n\tn := 5\n\tamount := int64(10)\n\n\terrs := make(chan error)\n\tresults := make(chan TransferTxResult)\n\n\t// 1. ยิงคำสั่งโอนเงิน 5 ครั้งพร้อมกันผ่าน Goroutines\n\tfor range n {\n\t\tgo func() {\n\t\t\tresult, err := store.TransferTx(context.Background(), TransferTxParams{\n\t\t\t\tFromAccountID: account1.ID,\n\t\t\t\tToAccountID:   account2.ID,\n\t\t\t\tAmount:        amount,\n\t\t\t})\n\t\t\terrs <- err\n\t\t\tresults <- result\n\t\t}()\n\t}",
        },
        {
          "t": "ul",
          "c": [
            "**Unbuffered Channel (`make(chan error)`)**: ใช้เป็นท่อประสานงาน (Synchronization) เมื่อ Goroutine ย่อยแต่ละตัวโอนเงินเสร็จ มันจะส่ง `err` และ `result` เข้าท่อมาให้ Goroutine หลัก",
          ],
        },
        {
          "t": "p",
          "c": "**ส่วนที่ 3.2: วนลูปรอรับผลลัพธ์ทั้ง 5 รายการและตรวจสอบขั้นบันไดของยอดเงิน**\nเขียนต่อท้ายภายในฟังก์ชัน `TestTransferTx`:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/store_test.go (ส่วนที่ 2: ตรวจสอบผลลัพธ์และขั้นบันไดยอดเงิน)",
          "c": "\t// 2. รอรับผลลัพธ์ครบ 5 รอบ และตรวจสอบความถูกต้องของแต่ละธุรกรรม\n\texisted := make(map[int]bool)\n\tfor range n {\n\t\terr := <-errs\n\t\trequire.NoError(t, err)\n\t\tresult := <-results\n\n\t\trequire.NotEmpty(t, result)\n\t\trequire.Equal(t, account1.ID, result.Transfer.FromAccountID)\n\t\trequire.Equal(t, account2.ID, result.Transfer.ToAccountID)\n\t\trequire.Equal(t, -amount, result.FromEntry.Amount)\n\t\trequire.Equal(t, amount, result.ToEntry.Amount)\n\n\t\t// ตรวจสอบว่ายอดเงินในแต่ละธุรกรรมลดลงทีละ 10, 20, 30, 40, 50 อย่างถูกต้อง\n\t\tfmt.Println(\">> tx:\", result.FromAccount.Balance, result.ToAccount.Balance)\n\t\tdiff1 := account1.Balance - result.FromAccount.Balance\n\t\tdiff2 := result.ToAccount.Balance - account2.Balance\n\t\trequire.Equal(t, diff1, diff2)\n\t\trequire.True(t, diff1 > 0)\n\t\trequire.True(t, diff1%amount == 0)\n\n\t\tk := int(diff1 / amount)\n\t\trequire.True(t, k >= 1 && k <= n)\n\t\trequire.NotContains(t, existed, k)\n\t\texisted[k] = true\n\t}\n\n\t// 3. ตรวจสอบยอดเงินสุทธิสุดท้ายในฐานข้อมูล\n\tupdated1, err := testQueries.GetAccount(context.Background(), account1.ID)\n\trequire.NoError(t, err)\n\tupdated2, err := testQueries.GetAccount(context.Background(), account2.ID)\n\trequire.NoError(t, err)\n\n\tfmt.Println(\">> หลังโอน:\", updated1.Balance, updated2.Balance)\n\trequire.Equal(t, account1.Balance-int64(n)*amount, updated1.Balance)\n\trequire.Equal(t, account2.Balance+int64(n)*amount, updated2.Balance)\n}",
        },
        {
          "t": "ul",
          "c": [
            "**ทำไมต้องเช็ก `diff1`, `diff2` และ `k`?**: เมื่อโอนเงินครั้งละ `10` จำนวน 5 ครั้ง ยอดเงินของบัญชีต้นทางจะต้องลดลงเป็นขั้นบันได คือหายไป `10, 20, 30, 40, 50` ดอลลาร์ตามลำดับ เมื่อนำ `k := int(diff1 / amount)` มาหารด้วย 10 ค่า `k` ที่ได้จะต้องเป็นเลข `1, 2, 3, 4, 5` ไม่ซ้ำกันเลย เราจึงใช้ `existed[k]` เช็กว่าไม่มีธุรกรรมไหนแอบอ่านยอดเงินเก่ามาทับกัน!",
          ],
        },
        {
          "t": "details",
          "summary": "📄 ดูโค้ดฉบับเต็มของไฟล์ simplebank/db/store_test.go (ณ จุดนี้ พร้อมคัดลอก)",
          "c": [
            {
              "t": "code",
              "lang": "go",
              "label": "simplebank/db/store_test.go",
              "c": "package db\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"testing\"\n\n\t\"github.com/stretchr/testify/require\"\n)\n\nfunc topUp(t *testing.T, acc Account, amount int64) Account {\n\tupdated, err := testQueries.AddAccountBalance(context.Background(), AddAccountBalanceParams{\n\t\tID:     acc.ID,\n\t\tAmount: amount,\n\t})\n\trequire.NoError(t, err)\n\treturn updated\n}\n\nfunc TestTransferTx(t *testing.T) {\n\tstore := NewStore(testDB)\n\n\taccount1 := topUp(t, createRandomAccount(t), 1000)\n\taccount2 := createRandomAccount(t)\n\tfmt.Println(\">> ก่อนโอน:\", account1.Balance, account2.Balance)\n\n\tn := 5\n\tamount := int64(10)\n\n\terrs := make(chan error)\n\tresults := make(chan TransferTxResult)\n\n\tfor range n {\n\t\tgo func() {\n\t\t\tresult, err := store.TransferTx(context.Background(), TransferTxParams{\n\t\t\t\tFromAccountID: account1.ID,\n\t\t\t\tToAccountID:   account2.ID,\n\t\t\t\tAmount:        amount,\n\t\t\t})\n\t\t\terrs <- err\n\t\t\tresults <- result\n\t\t}()\n\t}\n\n\texisted := make(map[int]bool)\n\tfor range n {\n\t\terr := <-errs\n\t\trequire.NoError(t, err)\n\t\tresult := <-results\n\n\t\trequire.NotEmpty(t, result)\n\t\trequire.Equal(t, account1.ID, result.Transfer.FromAccountID)\n\t\trequire.Equal(t, account2.ID, result.Transfer.ToAccountID)\n\t\trequire.Equal(t, -amount, result.FromEntry.Amount)\n\t\trequire.Equal(t, amount, result.ToEntry.Amount)\n\n\t\tfmt.Println(\">> tx:\", result.FromAccount.Balance, result.ToAccount.Balance)\n\t\tdiff1 := account1.Balance - result.FromAccount.Balance\n\t\tdiff2 := result.ToAccount.Balance - account2.Balance\n\t\trequire.Equal(t, diff1, diff2)\n\t\trequire.True(t, diff1 > 0)\n\t\trequire.True(t, diff1%amount == 0)\n\n\t\tk := int(diff1 / amount)\n\t\trequire.True(t, k >= 1 && k <= n)\n\t\trequire.NotContains(t, existed, k)\n\t\texisted[k] = true\n\t}\n\n\tupdated1, err := testQueries.GetAccount(context.Background(), account1.ID)\n\trequire.NoError(t, err)\n\tupdated2, err := testQueries.GetAccount(context.Background(), account2.ID)\n\trequire.NoError(t, err)\n\n\tfmt.Println(\">> หลังโอน:\", updated1.Balance, updated2.Balance)\n\trequire.Equal(t, account1.Balance-int64(n)*amount, updated1.Balance)\n\trequire.Equal(t, account2.Balance+int64(n)*amount, updated2.Balance)\n}",
            },
          ],
        },
        {
          "t": "h2",
          "c": "4. รันเทสต์และดูผลลัพธ์จริง",
        },
        {
          "t": "p",
          "c": "สั่งรัน `go test -v -run TestTransferTx ./db` เพื่อดูการขยับของยอดเงินในแต่ละ Transaction:",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ผลลัพธ์การรัน Concurrent Transfer Test",
          "code": "go test -v -run TestTransferTx ./db",
          "out": "=== RUN   TestTransferTx\n>> ก่อนโอน: 1200 450\n>> tx: 1190 460\n>> tx: 1180 470\n>> tx: 1170 480\n>> tx: 1160 490\n>> tx: 1150 500\n>> หลังโอน: 1150 500\n--- PASS: TestTransferTx (0.04s)\nPASS\nok      simplebank/db   0.125s",
        },
        {
          "t": "h2",
          "c": "5. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ในโค้ด Concurrency Test ที่ยิง goroutine พร้อมกัน n ตัว ทำไมเราจึงส่งผลลัพธ์ผ่าน unbuffered channel แล้ว for-loop รออ่านค่า n ครั้ง?",
              "options": [
                {
                  "text": "เพื่อทำ Synchronization ให้ goroutine หลักรอจนกระทั่ง goroutine ย่อยทั้ง n ตัวทำงานเสร็จสิ้นทั้งหมดก่อนปิดฟังก์ชันทดสอบ",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! Goroutine หลักจะบล็อกรอรับค่าจาก channel ทีละตัวจนครบ n รอบ เป็นการประสานงาน (sync) โดยไม่ต้องใช้ sleep เดาเวลา"
                },
                {
                  "text": "เพราะ unbuffered channel ช่วยเร่งความเร็วของ network ให้ทำงานเร็วขึ้น 10 เท่า",
                  "isCorrect": false,
                  "explain": "ไม่จริง Channel เป็นกลไก IPC ภายใน Go process ไม่เกี่ยวกับความเร็ว network ของ database"
                },
                {
                  "text": "เพื่อป้องกันไม่ให้ PostgreSQL รันเกิน 1 transaction",
                  "isCorrect": false,
                  "explain": "ผิด วัตถุประสงค์ของการทดสอบนี้คือต้องการให้ transaction วิ่งพร้อมกัน (concurrently) จริงๆ"
                }
              ],
              "explain": "ใน Go การ sync goroutine สามารถทำได้ทั้ง sync.WaitGroup และ Channel แต่ Channel ได้เปรียบตรงที่ส่ง error หรือผลลัพธ์กลับมาตรวจได้ด้วย"
            }
          ]
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "การโอนไปในทิศทางเดียวกันผ่านฉลุย! แต่ถ้าเจอกรณี **สองคนโอนเงินสวนทางกันในจังหวะเดียวกันล่ะ?** ในบทที่ **5.2 และ 5.3** เราจะมาเจาะลึก Race Condition และ Deadlock กันครับ",
        },
      ],
      en: [],
    },
  },

  "bank-concurrency-race-condition": {
    slug: "bank-concurrency-race-condition",
    title: {
      th: "5.2 แก้ Race Condition & Stale Read ด้วย Atomic Updates",
      en: "5.2 Fixing Race Conditions & Stale Reads with Atomic SQL",
    },
    lead: {
      th: "เข้าใจ Race Condition ผ่านตัวอย่าง counter++ ที่ผลลัพธ์หายไป และวิธีแก้ปัญหา Stale Read ในฐานข้อมูลด้วย Atomic Update ใน SQL",
      en: "Demystify Race Conditions using a classic counter example, and prevent database stale reads with atomic SQL updates.",
    },
    group: "5. รับมือคนกดพร้อมกัน: Concurrency & Deadlock",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• สังเกตปรากฏการณ์ Race Condition ในโปรแกรมผ่านตัวอย่างคลาสสิกที่ยอดนับผิดเพี้ยน\n• เข้าใจปัญหา Stale Read เมื่อโปรแกรมอ่านยอดเงินเก่าก่อนจะเขียนทับ\n• แก้ปัญหาอย่างเด็ดขาดด้วย Atomic Update ในระดับ SQL (`SET balance = balance + $2`)\n\n⏱ **เวลาในการเรียนรู้**: ~20 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านบท 5.1 เข้าใจ Goroutine เบื้องต้น",
        },
        {
          "t": "h2",
          "c": "1. ตัวอย่างคลาสสิก: ตัวนับเลขที่ยอดหายไป (The Disappearing Counter)",
        },
        {
          "t": "p",
          "c": "สมมติว่าเรามีตัวแปร `counter = 0` และเปิด Goroutine 1,000 ตัว โดยแต่ละตัวสั่ง `counter++` หนึ่งครั้ง ตามทฤษฎี ผลลัพธ์สุดท้ายควรเป็น `1000` ใช่หรือไม่? มาดูผลลัพธ์จริงกันครับ:",
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างคลาสสิก: เกิด Race Condition ในคำสั่ง counter++",
          "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tcounter := 0\n\tvar wg sync.WaitGroup\n\n\tfor i := 0; i < 1000; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tcounter++ // หลาย Goroutine แย่งกันเขียนตัวแปรเดียวกันโดยไม่มีการล็อก\n\t\t}()\n\t}\n\n\twg.Wait()\n\tfmt.Println(\"counter =\", counter, \"(ค่าที่ควรจะเป็นคือ 1000)\")\n}",
          "out": "counter = 991 (ค่าที่ควรจะเป็นคือ 1000)",
        },
        {
          "t": "callout",
          "title": "⚠️ ทำไม counter ถึงได้แค่ 991?",
          "c": "เพราะคำสั่ง `counter++` ในระดับ CPU ไม่ใช่คำสั่งเดียว แต่ประกอบด้วย 3 ขั้นตอน (Read-Modify-Write):\n1. อ่านค่า `counter` ปัจจุบันเข้า CPU Register (เช่น อ่านได้ 50)\n2. เพิ่มค่าขึ้น 1 เป็น 51\n3. เขียน 51 กลับลงหน่วยความจำ\n\nเมื่อ Goroutine 2 ตัวอ่านค่า 50 พร้อมกัน ทั้งคู่จะบวกเป็น 51 และเขียน 51 ทับกันเอง ทำให้การนับเพิ่มอีก 1 ครั้ง **สูญหายไปในอากาศ**!",
          "warn": true,
        },
        {
          "t": "h2",
          "c": "2. หายนะแบบเดียวกันในฐานข้อมูล: Stale Read",
        },
        {
          "t": "p",
          "c": "ในระบบธนาคาร หากเราเขียนโค้ด Go แบบนี้:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "❌ โค้ดที่อันตรายมาก (ห้ามทำในระบบธนาคาร)",
          "c": "// อ่านยอดเงินเก่าออกมาก่อน\nacc, _ := queries.GetAccount(ctx, id)\n\n// คำนวณใน Go\nnewBalance := acc.Balance + amount\n\n// เขียนทับกลับลงไป\nqueries.UpdateAccount(ctx, UpdateAccountParams{ID: id, Balance: newBalance})",
        },
        {
          "t": "p",
          "c": "ถ้ามีคนโอนเงินเข้าบัญชีนี้พร้อมกัน 2 รายการ ทั้งสองคำสั่งจะเห็นยอดเงินเก่าก้อนเดียวกัน (Stale Read) และเขียนยอดเงินทับกัน ทำให้เงินก้อนหนึ่งสูญหายไปจากระบบทันที!",
        },
        {
          "t": "h2",
          "c": "3. สองวิธีมาตรฐานในการล็อกแถวข้อมูลระดับ SQL (Pessimistic Locking)",
        },
        {
          "t": "p",
          "c": "ในระบบฐานข้อมูลอย่าง PostgreSQL การป้องกันไม่ให้หลาย Transaction อ่านค่าเก่ามาทับกัน สามารถทำได้ 2 แนวทางหลัก:",
        },
        {
          "t": "ul",
          "c": [
            "**วิธีที่ 1: ล็อกตอนอ่านด้วย `SELECT ... FOR UPDATE` (หรือ `FOR NO KEY UPDATE`)**: หากธุรกิจของคุณจำเป็นต้องดึงข้อมูลบัญชีมาตรวจสอบเงื่อนไขซับซ้อนในโค้ด Go ก่อนแล้วค่อยอัปเดต ห้ามใช้ `SELECT` ธรรมดาเด็ดขาด แต่ต้องต่อท้ายด้วย `FOR UPDATE` หรือ `FOR NO KEY UPDATE` เพื่อสั่งให้ PostgreSQL **ล็อกแถวนั้นไว้ทันทีที่อ่าน** หากมี Transaction อื่นพยายามจะเข้ามาอ่านเพื่อแก้ไขแถวเดียวกัน มันจะถูกบล็อกให้ยืนรอจนกว่า Transaction แรกจะ `COMMIT` หรือ `ROLLBACK`\n  *(หมายเหตุ: ใน PostgreSQL แนะนำให้ใช้ `SELECT ... FOR NO KEY UPDATE` หากเราไม่ได้แก้ไขค่า Primary Key `id` ของบัญชี เพราะจะไม่ไปชนกับการเช็ก Foreign Key ของตาราง `transfers` หรือ `entries`)*",
            "**วิธีที่ 2: รวบการอ่านและบวกลบไว้ในคำสั่ง `UPDATE` เดียว (Atomic Update — วิธีที่เราใช้ใน Simple Bank)**: แทนที่จะดึงยอดเงินออกมาบวกลบใน Go แล้วค่อยส่งกลับไปเขียน เราสั่งให้ PostgreSQL เป็นผู้บวกหรือลบด้วยตัวเองในคำสั่งเดียว:",
          ],
        },
        {
          "t": "code",
          "lang": "sql",
          "label": "คำสั่ง Atomic Balance Update (ที่ใช้ใน AddAccountBalance)",
          "c": "UPDATE accounts\nSET balance = balance + $2\nWHERE id = $1\nRETURNING id, owner, balance, currency, created_at;",
        },
        {
          "t": "p",
          "c": "ขณะรันคำสั่ง `UPDATE` นี้ PostgreSQL จะทำการล็อกแถวนั้นในระดับ Row-Level Lock โดยอัตโนมัติและคำนวณจากค่า `balance` ล่าสุดเสมอ ทำให้คำสั่งอื่นๆ ต้องยืนรอคิวอย่างเป็นระเบียบ ทั้งลดจำนวนรอบการคุยผ่าน Network (เหลือแค่ 1 Query แทนที่จะเป็น SELECT + UPDATE) และรับประกันความถูกต้อง 100% ไร้ Stale Read อย่างแน่นอน",
        },
        {
          "t": "h2",
          "c": "4. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "นอกจากคำสั่ง Atomic SQL Update (UPDATE ... SET balance = balance + $1) แล้ว สามารถใช้คำสั่ง SQL ใดในการอ่านยอดเงินพร้อมล็อกแถวนั้นเพื่อป้องกัน Race Condition ได้?",
              "options": [
                {
                  "text": "SELECT ... FOR UPDATE (หรือ FOR NO KEY UPDATE)",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! SELECT ... FOR UPDATE จะใส่ Row-level lock ทำให้ Transaction อื่นที่พยายามจะอ่านเพื่อแก้ไขแถวเดียวกันต้องรอจนกว่าเราจะ COMMIT หรือ ROLLBACK"
                },
                {
                  "text": "SELECT DISTINCT ...",
                  "isCorrect": false,
                  "explain": "SELECT DISTINCT เป็นการตัดแถวที่ซ้ำซ้อน ไม่มีการล็อกข้อมูลใดๆ"
                },
                {
                  "text": "SELECT ... ORDER BY balance DESC",
                  "isCorrect": false,
                  "explain": "ORDER BY เป็นเพียงการเรียงลำดับผลลัพธ์ ไม่ช่วยป้องกัน Race Condition"
                }
              ],
              "explain": "ใน PostgreSQL แนะนำ SELECT ... FOR NO KEY UPDATE หากไม่มีการเปลี่ยนค่า Primary Key เพราะจะไม่ขัดแย้งกับ Foreign Key lock ของตารางลูก"
            }
          ]
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "แต่เมื่อมีการล็อกข้อมูล... ก็ย่อมมีโอกาสเกิด **การรอซึ่งกันและกันจนระบบค้าง (Deadlock)** ในบทที่ **5.3** เราจะมาไขปริศนา Deadlock และแก้ด้วย Lock Ordering กันครับ",
        },
      ],
      en: [],
    },
  },

  "bank-deadlock-prevention": {
    slug: "bank-deadlock-prevention",
    title: {
      th: "5.3 ไขปริศนา Deadlock & ป้องกันด้วย Lock Ordering",
      en: "5.3 Cracking Deadlocks & Prevention with Lock Ordering",
    },
    lead: {
      th: "จำลองสถานการณ์โอนเงินสวนทางกันจนเกิด Deadlock และปลดล็อกระบบด้วยคณิตศาสตร์: จัดลำดับการล็อกบัญชีตาม ID (Resource Ordering)",
      en: "Simulate bidirectional transfer deadlocks and solve them permanently with strict resource ordering by account ID.",
    },
    group: "5. รับมือคนกดพร้อมกัน: Concurrency & Deadlock",
    blocks: {
      th: [
        {
          "t": "callout",
          "title": "🎯 เป้าหมายของบทนี้ (Learning Objectives)",
          "c": "• เข้าใจกลไกการเกิด Deadlock จากตัวอย่างคลาสสิกของคนสองคนถือครองกุญแจคนละดอก\n• เขียนเทสต์ `TestTransferTxDeadlock` เพื่อจำลองการโอนเงินสวนทางกันและพบ Error จริงจาก PostgreSQL\n• แก้ปัญหา Deadlock ให้หายไป 100% ด้วยหลักการจัดลำดับล็อก (Resource Ordering)\n\n⏱ **เวลาในการเรียนรู้**: ~25 นาที | **สิ่งที่ต้องรู้มาก่อน**: ผ่านบท 5.2 เข้าใจการล็อกแถวข้อมูล",
        },
        {
          "t": "h2",
          "c": "1. ตัวอย่างคลาสสิก: ปัญหากุญแจ 2 ดอก (Two-Key Deadlock)",
        },
        {
          "t": "p",
          "c": "จินตนาการว่าห้องเก็บของต้องใช้กุญแจ 2 ดอก (กุญแจ A และ กุญแจ B) ในการเปิด:",
        },
        {
          "t": "ul",
          "c": [
            "**Alice**: เดินไปหยิบกุญแจ A มาถือไว้ในมือ แล้วยืนรอกุญแจ B",
            "**Bob**: เดินไปหยิบกุญแจ B มาถือไว้ในมือ แล้วยืนรอกุญแจ A",
          ],
        },
        {
          "t": "p",
          "c": "ผลลัพธ์คือ ทั้งสองคนต่างถือของคนละชิ้น และต่างฝ่ายต่างรอให้อีกฝ่ายปล่อยของ ไม่มีใครยอมปล่อยก่อน ทำให้เกิดการยืนรอค้างไปชั่วกัลปาวสาน (Deadlock)! มาดูโค้ดที่ทำให้ Go Runtime พ่น Fatal Error กันครับ:",
        },
        {
          "t": "codeout",
          "lang": "go",
          "label": "ตัวอย่างคลาสสิก: Deadlock ของ Goroutine 2 ตัว",
          "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n\t\"time\"\n)\n\nfunc main() {\n\tvar keyA, keyB sync.Mutex\n\tvar wg sync.WaitGroup\n\twg.Add(2)\n\n\tgo func() { // Alice หยิบ A ก่อน แล้วรอ B\n\t\tdefer wg.Done()\n\t\tkeyA.Lock()\n\t\tfmt.Println(\"Alice: ได้กุญแจ A กำลังรอกุญแจ B...\")\n\t\ttime.Sleep(100 * time.Millisecond)\n\t\tkeyB.Lock()\n\t\tkeyB.Unlock()\n\t\tkeyA.Unlock()\n\t}()\n\n\tgo func() { // Bob หยิบ B ก่อน แล้วรอ A\n\t\tdefer wg.Done()\n\t\tkeyB.Lock()\n\t\tfmt.Println(\"Bob:   ได้กุญแจ B กำลังรอกุญแจ A...\")\n\t\ttime.Sleep(100 * time.Millisecond)\n\t\tkeyA.Lock()\n\t\tkeyA.Unlock()\n\t\tkeyB.Unlock()\n\t}()\n\n\twg.Wait()\n}",
          "out": "Alice: ได้กุญแจ A กำลังรอกุญแจ B...\nBob:   ได้กุญแจ B กำลังรอกุญแจ A...\nfatal error: all goroutines are asleep - deadlock!\ngoroutine 1 [sync.WaitGroup.Wait]:\ngoroutine 7 [sync.Mutex.Lock]:",
        },
        {
          "t": "h2",
          "c": "2. สิ่งเดียวกันนี้เกิดขึ้นในระบบธนาคารได้อย่างไร?",
        },
        {
          "t": "p",
          "c": "ในขั้นตอนการโอนเงิน หากเราหักเงินบัญชีต้นทาง (From) ก่อน แล้วค่อยเพิ่มเงินบัญชีปลายทาง (To) เสมอ:",
        },
        {
          "t": "table",
          "head": ["เวลา (Timeline)", "ธุรกรรมที่ 1 (Alice โอนไป Bob: 1 -> 2)", "ธุรกรรมที่ 2 (Bob โอนกลับมา Alice: 2 -> 1)"],
          "rows": [
            ["T1", "ล็อกบัญชีหมายเลข 1 (Alice)", "—"],
            ["T2", "—", "ล็อกบัญชีหมายเลข 2 (Bob)"],
            ["T3", "พยายามจะล็อกบัญชี 2 (ติด! เพราะ Tx 2 ถืออยู่)", "—"],
            ["T4", "—", "พยายามจะล็อกบัญชี 1 (ติด! เพราะ Tx 1 ถืออยู่)"],
            ["ผลลัพธ์", "🔥 PostgreSQL ตรวจพบวงกลมการรอ (Cycle) และพ่น Error: deadlock detected", "🔥"],
          ],
        },
        {
          "t": "h2",
          "c": "3. ทฤษฎี Coffman Conditions & ทางแก้ด้วยการจัดลำดับล็อก (Resource Ordering)",
        },
        {
          "t": "p",
          "c": "ในทางวิทยาการคอมพิวเตอร์ มีทฤษฎีคลาสสิกที่ชื่อว่า **Coffman Conditions** ซึ่งระบุว่าการเกิด Deadlock จะเกิดขึ้นได้ก็ต่อเมื่อมีเงื่อนไขครบทั้ง 4 ข้อนี้พร้อมกัน:",
        },
        {
          "t": "ol",
          "c": [
            "**Mutual Exclusion**: ทรัพยากร (แถวข้อมูลบัญชี) ถูกถือครองได้ทีละ 1 Transaction เท่านั้น ห้ามแก้พร้อมกัน",
            "**Hold and Wait**: ถือครองล็อกตัวที่หนึ่งคาไว้ในมือ แล้วไปยืนรอล็อกตัวที่สองต่อ",
            "**No Preemption**: ไม่มีใครสามารถไปบังคับแย่งล็อกจากมือคนอื่นที่กำลังถืออยู่ได้ ต้องรอให้เขาทำเสร็จและปล่อยเอง",
            "**Circular Wait (การรอต่อกันเป็นวงกลม)**: A รอ B และ B ก็วนกลับมารอ A จนเกิดเป็นวงจรปิด",
          ],
        },
        {
          "t": "p",
          "c": "ในการแก้ Deadlock เราแค่ต้อง **ทำลายเงื่อนไขข้อใดข้อหนึ่ง** ใน 4 ข้อนี้ทิ้งไป ซึ่งในฐานข้อมูลเราไม่สามารถยกเลิกข้อ 1-3 ได้ (เพราะต้องรักษาความปลอดภัยของ ACID) ดังนั้นเป้าหมายของเราคือการ **ทำลายข้อที่ 4 (Circular Wait)**!",
        },
        {
          "t": "p",
          "c": "วิธีทำลาย Circular Wait ในปัญหากุญแจ 2 ดอก คือการตั้ง **'กฎการจัดลำดับทรัพยากร (Resource Ordering / Lock Ordering)'** ร่วมกันว่า:\n> **ไม่ว่าใครจะโอนไปหาใคร ทุกคนต้องล็อกและปรับปรุงยอดเงินของบัญชีที่มีหมายเลข `ID` น้อยกว่าก่อนเสมอ!**",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/tx_transfer.go (ส่วนปรับปรุงยอดเงินแบบ Deadlock-Free)",
          "c": "// 4 & 5: ปรับปรุงยอดเงินทั้งสองบัญชี โดยล็อกบัญชีที่มี ID น้อยกว่าก่อนเสมอ\nif arg.FromAccountID < arg.ToAccountID {\n\tresult.FromAccount, result.ToAccount, err = addMoney(ctx, q, arg.FromAccountID, -arg.Amount, arg.ToAccountID, arg.Amount)\n} else {\n\tresult.ToAccount, result.FromAccount, err = addMoney(ctx, q, arg.ToAccountID, arg.Amount, arg.FromAccountID, -arg.Amount)\n}\n\n// addMoney ฟังก์ชันตัวช่วยที่จะทำการรันคำสั่ง SQL ตามลำดับบัญชีที่ 1 แล้วตามด้วยบัญชีที่ 2 เสมอ\nfunc addMoney(ctx context.Context, q *Queries, accountID1, amount1, accountID2, amount2 int64) (account1, account2 Account, err error) {\n\taccount1, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{ID: accountID1, Amount: amount1})\n\tif err != nil {\n\t\treturn\n\t}\n\taccount2, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{ID: accountID2, Amount: amount2})\n\treturn\n}",
        },
        {
          "t": "details",
          "summary": "📄 ดูโค้ดฉบับเต็มของไฟล์ simplebank/db/tx_transfer.go (หลังแก้ Deadlock แล้ว พร้อมคัดลอก)",
          "c": [
            {
              "t": "code",
              "lang": "go",
              "label": "simplebank/db/tx_transfer.go",
              "c": "package db\n\nimport \"context\"\n\ntype TransferTxParams struct {\n\tFromAccountID int64 `json:\"from_account_id\"`\n\tToAccountID   int64 `json:\"to_account_id\"`\n\tAmount        int64 `json:\"amount\"`\n}\n\ntype TransferTxResult struct {\n\tTransfer    Transfer `json:\"transfer\"`\n\tFromAccount Account  `json:\"from_account\"`\n\tToAccount   Account  `json:\"to_account\"`\n\tFromEntry   Entry    `json:\"from_entry\"`\n\tToEntry     Entry    `json:\"to_entry\"`\n}\n\n// TransferTx ดำเนินการโอนเงิน 5 ขั้นตอนภายใน 1 Transaction พร้อมป้องกัน Deadlock\nfunc (s *Store) TransferTx(ctx context.Context, arg TransferTxParams) (TransferTxResult, error) {\n\tvar result TransferTxResult\n\n\terr := s.execTx(ctx, func(q *Queries) error {\n\t\tvar err error\n\n\t\t// 1. บันทึก Transfer\n\t\tresult.Transfer, err = q.CreateTransfer(ctx, CreateTransferParams{\n\t\t\tFromAccountID: arg.FromAccountID,\n\t\t\tToAccountID:   arg.ToAccountID,\n\t\t\tAmount:        arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 2. บันทึก From Entry (เงินออกเป็นลบ)\n\t\tresult.FromEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.FromAccountID,\n\t\t\tAmount:    -arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 3. บันทึก To Entry (เงินเข้าเป็นบวก)\n\t\tresult.ToEntry, err = q.CreateEntry(ctx, CreateEntryParams{\n\t\t\tAccountID: arg.ToAccountID,\n\t\t\tAmount:    arg.Amount,\n\t\t})\n\t\tif err != nil {\n\t\t\treturn err\n\t\t}\n\n\t\t// 4 & 5: ปรับปรุงยอดเงินทั้งสองบัญชี โดยล็อกบัญชีที่มี ID น้อยกว่าก่อนเสมอ (Lock Ordering)\n\t\tif arg.FromAccountID < arg.ToAccountID {\n\t\t\tresult.FromAccount, result.ToAccount, err = addMoney(ctx, q, arg.FromAccountID, -arg.Amount, arg.ToAccountID, arg.Amount)\n\t\t} else {\n\t\t\tresult.ToAccount, result.FromAccount, err = addMoney(ctx, q, arg.ToAccountID, arg.Amount, arg.FromAccountID, -arg.Amount)\n\t\t}\n\t\treturn err\n\t})\n\n\treturn result, err\n}\n\nfunc addMoney(ctx context.Context, q *Queries, accountID1, amount1, accountID2, amount2 int64) (account1, account2 Account, err error) {\n\taccount1, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{ID: accountID1, Amount: amount1})\n\tif err != nil {\n\t\treturn\n\t}\n\taccount2, err = q.AddAccountBalance(ctx, AddAccountBalanceParams{ID: accountID2, Amount: amount2})\n\treturn\n}",
            },
          ],
        },
        {
          "t": "callout",
          "title": "🎉 ผลลัพธ์ทางคณิตศาสตร์",
          "c": "เมื่อทั้งสองธุรกรรมถูกบังคับให้ล็อกบัญชีหมายเลข 1 ก่อนเสมอ:\n• ใครมาถึงบัญชี 1 ก่อน จะได้ล็อกบัญชี 1 และไปล็อกบัญชี 2 ต่อจนเสร็จ\n• ใครมาถึงทีหลัง จะต้องยืนรอที่หน้าบัญชี 1 ตั้งแต่แรก โดยไม่มีการถือบัญชี 2 ค้างไว้\n\nการรอแบบวนเป็นวงกลม (Circular Wait) จึง **เป็นไปไม่ได้ทางคณิตศาสตร์ 100%**!",
        },
        {
          "t": "h2",
          "c": "4. เขียนเทสต์พิสูจน์ Deadlock (TestTransferTxDeadlock)",
        },
        {
          "t": "p",
          "c": "เพิ่มฟังก์ชันทดสอบใน `simplebank/db/store_test.go` โดยสั่งให้มีการโอนเงิน 10 ครั้งพร้อมกัน โดยครึ่งหนึ่งโอนจาก 1->2 และอีกครึ่งโอนจาก 2->1:",
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/store_test.go (ส่วน TestTransferTxDeadlock)",
          "c": "func TestTransferTxDeadlock(t *testing.T) {\n\tstore := NewStore(testDB)\n\n\taccount1 := topUp(t, createRandomAccount(t), 1000)\n\taccount2 := topUp(t, createRandomAccount(t), 1000)\n\tfmt.Println(\">> ก่อนรันเทสต์ Deadlock:\", account1.Balance, account2.Balance)\n\n\tn := 10\n\tamount := int64(10)\n\terrs := make(chan error)\n\n\tfor i := range n {\n\t\tfromID, toID := account1.ID, account2.ID\n\t\tif i%2 == 1 {\n\t\t\tfromID, toID = account2.ID, account1.ID // สลับทิศทางโอนสวนกัน!\n\t\t}\n\n\t\tgo func() {\n\t\t\t_, err := store.TransferTx(context.Background(), TransferTxParams{\n\t\t\t\tFromAccountID: fromID,\n\t\t\t\tToAccountID:   toID,\n\t\t\t\tAmount:        amount,\n\t\t\t})\n\t\t\terrs <- err\n\t\t}()\n\t}\n\n\tfor range n {\n\t\trequire.NoError(t, <-errs)\n\t}\n\n\t// โอนไป 5 ครั้ง และโอนกลับ 5 ครั้ง ยอดเงินสุดท้ายต้องเท่าเดิมเป๊ะ\n\tupdated1, _ := testQueries.GetAccount(context.Background(), account1.ID)\n\tupdated2, _ := testQueries.GetAccount(context.Background(), account2.ID)\n\n\tfmt.Println(\">> หลังรันเทสต์ Deadlock:\", updated1.Balance, updated2.Balance)\n\trequire.Equal(t, account1.Balance, updated1.Balance)\n\trequire.Equal(t, account2.Balance, updated2.Balance)\n}",
        },
        {
          "t": "h2",
          "c": "5. รันเทสต์และดูผลลัพธ์จริง",
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "ผลลัพธ์การรัน TestTransferTxDeadlock",
          "code": "go test -v -run TestTransferTxDeadlock ./db",
          "out": "=== RUN   TestTransferTxDeadlock\n>> ก่อนรันเทสต์ Deadlock: 1000 1000\n>> หลังรันเทสต์ Deadlock: 1000 1000\n--- PASS: TestTransferTxDeadlock (0.06s)\nPASS\nok      simplebank/db   0.142s",
        },
        {
          "t": "h2",
          "c": "6. เช็กความเข้าใจ (Quick Quiz)",
        },
        {
          "t": "quiz",
          "c": [
            {
              "question": "ตามทฤษฎี Coffman Conditions การเรียงลำดับการล็อกตาม ID (Lock Ordering / Resource Ordering) เข้าไปทำลายเงื่อนไขข้อใดเพื่อกำจัด Deadlock อย่างถาวร?",
              "options": [
                {
                  "text": "Circular Wait (การรอต่อกันเป็นวงกลม)",
                  "isCorrect": true,
                  "explain": "ถูกต้อง! เมื่อทุกคนต้องขอทรัพยากรชิ้นหมายเลขน้อยก่อนหมายเลขมากเสมอ จะไม่มีทางเกิดวงกลมของลูกศรการรอ (Wait-for Graph Cycle) ได้อย่างเด็ดขาด"
                },
                {
                  "text": "Mutual Exclusion (การห้ามใช้ทรัพยากรร่วมกัน)",
                  "isCorrect": false,
                  "explain": "ผิด Mutual Exclusion ยังคงอยู่ เพราะ Row lock ยังคงห้ามคนอื่นแก้พร้อมกัน"
                },
                {
                  "text": "No Preemption (การไม่สามารถแย่งของจากมือคนอื่นได้)",
                  "isCorrect": false,
                  "explain": "ผิด Lock Ordering ไม่ได้ไปบังคับแย่ง lock จากใคร"
                }
              ],
              "explain": "Deadlock จะเกิดได้ต้องครบทั้ง 4 เงื่อนไขของ Coffman: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait เพียงแค่ทำลาย Circular Wait ข้อเดียว Deadlock ก็หายไปทันที"
            }
          ]
        },
        {
          "t": "callout",
          "title": "🚀 ก้าวต่อไป",
          "c": "Core Banking Engine ของเราทั้งเร็ว ปลอดภัย และไร้ Deadlock 100% แล้ว! ในโมดูลที่ 6 บทที่ **6.1 สร้าง REST API Server ด้วย Gin** เราจะมาเปิด HTTP Server ให้โลกภายนอกสั่งเปิดบัญชีและโอนเงินกันครับ",
        },
      ],
      en: [],
    },
  },
};
