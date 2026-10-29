import type { Page } from "@/lib/types";

// =============================================================================
// ไฟล์: simple-bank/pages/05-testing.ts
// หน้าที่: บทที่ 3.2 และ 5.3 การเขียน Unit Test พื้นฐาน และ Concurrent Stress Test ด้วย Goroutines
// =============================================================================

export const testingPages: Record<string, Page> = {
  "bank-unit-testing": {
    "slug": "bank-unit-testing",
    "title": {
      "th": "3.2 เขียน Unit Test ระบบธนาคารด้วย Testify",
      "en": "3.2 Unit Testing with Go and Testify"
    },
    "lead": {
      "th": "พิสูจน์ความถูกต้องของฟังก์ชัน CRUD ทั้งหมดด้วยแพ็กเกจ testing และ testify/require พร้อมสร้างระบบสุ่มข้อมูลจำลอง (Random Data Generators) ให้เทสต์รันซ้ำได้ไม่จำกัด",
      "en": "Writing comprehensive unit tests for account CRUD operations using Go's testing package and testify/require."
    },
    "group": "3. เชื่อมต่อฐานข้อมูลด้วย Go & พิสูจน์ด้วย Unit Test",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: เขียนโค้ด CRUD สำหรับตาราง `accounts`, `entries`, และ `transfers` ในโฟลเดอร์ `simplebank/db/` เสร็จแล้ว\n• **ภารกิจในบทนี้**: สร้างตัวสุ่มข้อมูลจำลอง (`util/random.go`), ตั้งค่าการเชื่อมต่อสำหรับเทสต์ (`db/main_test.go`), และเขียน Unit Test ตรวจสอบ CRUD ทุกฟังก์ชัน (`db/account_test.go`)\n• **ไวยากรณ์ Go ที่จะได้ใช้จริง**: แพ็กเกจ `testing` (`*testing.T`, `*testing.M`), ฟังก์ชัน `init()`, และไลบรารี `testify/require`"
        },
        {
          "t": "h2",
          "c": "1. ทำไมต้องใช้ testify/require แทนการเขียน if err != nil ในไฟล์เทสต์?"
        },
        {
          "t": "p",
          "c": "หากใช้แพ็กเกจ `testing` มาตรฐานของ Go เพียงอย่างเดียว เราต้องเขียน `if err != nil { t.Fatalf(...) }` ทุกๆ 2 บรรทัด ทำให้โค้ดเทสต์รกและอ่านยากมาก เราจึงใช้ไลบรารีมาตรฐานสากลชื่อ **`github.com/stretchr/testify`** ซึ่งมีแพ็กเกจย่อย 2 ตัวที่ต้องรู้ความต่าง:"
        },
        {
          "t": "table",
          "head": [
            "แพ็กเกจย่อยใน Testify",
            "พฤติกรรมเมื่อตรวจเจอข้อผิดพลาด",
            "ควรใช้เมื่อไหร่?"
          ],
          "rows": [
            [
              "testify/assert",
              "แจ้งเตือนว่าเทสต์พัง แต่ **ยังปล่อยให้โค้ดบรรทัดถัดไปในฟังก์ชันนั้นรันต่อ**",
              "ใช้ตรวจค่าทั่วไปที่ไม่ได้มีผลต่อบรรทัดถัดไป"
            ],
            [
              "testify/require (ที่เราใช้)",
              "แจ้งเตือนว่าเทสต์พัง และ **สั่งหยุดฟังก์ชันเทสต์นั้นทันที (`t.FailNow()`)**",
              "**ใช้กับงานฐานข้อมูลเสมอ!** เพราะถ้าขั้นสร้างบัญชีพัง เราต้องหยุดทันที ไม่ให้บรรทัดถัดไปพยายามอ่านบัญชีที่ไม่มีอยู่จริงจนเกิด Panic"
            ]
          ]
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "ติดตั้งไลบรารี testify ลงในโปรเจกต์",
          "c": "go get github.com/stretchr/testify"
        },
        {
          "t": "h2",
          "c": "2. สร้างตัวสุ่มข้อมูลจำลองใน simplebank/util/random.go"
        },
        {
          "t": "p",
          "c": "เวลาเขียนเทสต์ฐานข้อมูล ห้ามใส่ชื่อเดิมซ้ำๆ (Hardcode) เช่น `owner: \"alice\"` เพราะเมื่อรันเทสต์รอบที่สอง ข้อมูลอาจชนกับข้อมูลเก่าที่ค้างอยู่ในฐานข้อมูล เราจึงสร้างยูทิลิตี้สำหรับสุ่มชื่อ, สุ่มจำนวนเงิน, และสุ่มสกุลเงินใหม่ทุกครั้งที่รันเทสต์:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/random.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/util/random.go\n// หน้าที่: สุ่มสร้างข้อมูลจำลอง (ชื่อผู้ใช้, จำนวนเงิน, สกุลเงิน) สำหรับใช้ใน Unit Test\n// แก้ปัญหา: ทำให้การรันเทสต์แต่ละครั้งได้ข้อมูลใหม่เสมอ ไม่ชนกับข้อมูลเดิมในฐานข้อมูล\n// =============================================================================\npackage util\n\nimport (\n\t\"math/rand\"\n\t\"strings\"\n\t\"time\"\n)\n\nconst alphabet = \"abcdefghijklmnopqrstuvwxyz\"\n\n// init จะถูก Go เรียกทำงานอัตโนมัติ 1 ครั้งเมื่อแพ็กเกจ util ถูกโหลดขึ้นมา\nfunc init() {\n\t// ตั้งค่า Seed ด้วยเวลาปัจจุบัน (ระดับนาโนวินาที) เพื่อให้เลขที่สุ่มได้ไม่ซ้ำเดิม\n\trand.Seed(time.Now().UnixNano())\n}\n\n// RandomString สุ่มสร้างข้อความภาษาอังกฤษความยาว n ตัวอักษร\nfunc RandomString(n int) string {\n\tvar sb strings.Builder\n\tk := len(alphabet)\n\n\tfor i := 0; i < n; i++ {\n\t\tc := alphabet[rand.Intn(k)]\n\t\tsb.WriteByte(c)\n\t}\n\treturn sb.String()\n}\n\n// RandomOwner สุ่มสร้างชื่อเจ้าของบัญชีความยาว 6 ตัวอักษร\nfunc RandomOwner() string {\n\treturn RandomString(6)\n}\n\n// RandomMoney สุ่มจำนวนเงินระหว่าง 100 ถึง 1,099 หน่วย\nfunc RandomMoney() int64 {\n\treturn int64(rand.Intn(1000) + 100)\n}\n\n// RandomCurrency สุ่มเลือกสกุลเงินจากรายการที่ระบบรองรับ (USD, EUR, THB)\nfunc RandomCurrency() string {\n\tcurrencies := []string{\"USD\", \"EUR\", \"THB\"}\n\treturn currencies[rand.Intn(len(currencies))]\n}"
        },
        {
          "t": "h2",
          "c": "3. สร้างจุดเริ่มต้นของชุดทดสอบใน simplebank/db/main_test.go"
        },
        {
          "t": "p",
          "c": "ในภาษา Go ไฟล์ที่ลงท้ายด้วย `_test.go` จะถูกรันเมื่อสั่ง `go test` เท่านั้น และฟังก์ชันชื่อพิเศษ **`TestMain(m *testing.M)`** จะถูกรันเป็นด่านแรกสุดก่อนฟังก์ชันเทสต์ตัวอื่นๆ เสมอ เราจึงใช้ `TestMain` เปิดการเชื่อมต่อฐานข้อมูลเตรียมไว้ให้ทุกเทสต์ใช้ร่วมกัน:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/main_test.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/main_test.go\n// หน้าที่: เตรียมการเชื่อมต่อฐานข้อมูลกลาง (testDB และ testQueries) ก่อนเริ่มรันเทสต์ทุกตัว\n// แก้ปัญหา: ไม่ต้องเขียนโค้ด sql.Open ซ้ำในทุกฟังก์ชันเทสต์\n// =============================================================================\npackage db\n\nimport (\n\t\"database/sql\"\n\t\"log\"\n\t\"os\"\n\t\"testing\"\n\n\t_ \"github.com/lib/pq\"\n)\n\nconst (\n\tdbDriver = \"postgres\"\n\tdbSource = \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\"\n)\n\n// ประกาศตัวแปรระดับแพ็กเกจเพื่อให้ทุกไฟล์ _test.go ใน package db เรียกใช้งานได้\nvar testQueries *Queries\nvar testDB *sql.DB\n\n// TestMain คือ Entry Point ของระบบการทดสอบใน package db\nfunc TestMain(m *testing.M) {\n\tvar err error\n\t// ขั้นตอนที่ 1: เปิด Connection Pool เชื่อมต่อกับ PostgreSQL ใน Docker\n\ttestDB, err = sql.Open(dbDriver, dbSource)\n\tif err != nil {\n\t\tlog.Fatal(\"ไม่สามารถเชื่อมต่อฐานข้อมูลสำหรับรันเทสต์:\", err)\n\t}\n\n\t// ขั้นตอนที่ 2: สร้าง testQueries เตรียมไว้ให้ฟังก์ชันเทสต์อื่นๆ เรียกใช้\n\ttestQueries = New(testDB)\n\n\t// ขั้นตอนที่ 3: สั่งรันฟังก์ชัน Test* ทั้งหมดในแพ็กเกจ แล้วส่งรหัสผลลัพธ์กลับให้ OS\n\tos.Exit(m.Run())\n}"
        },
        {
          "t": "h2",
          "c": "4. เขียน Unit Test ทดสอบ CRUD บัญชีใน simplebank/db/account_test.go"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account_test.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/account_test.go\n// หน้าที่: ทดสอบการทำงานของฟังก์ชัน CreateAccount, GetAccount, DeleteAccount, และ ListAccounts\n// แก้ปัญหา: ยืนยันว่าคำสั่ง SQL CRUD ทุกตัวทำงานถูกต้องและป้องกันบั๊กย้อนหลัง (Regression)\n// =============================================================================\npackage db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"testing\"\n\t\"time\"\n\n\t\"github.com/stretchr/testify/require\"\n\t\"simplebank/util\"\n)\n\n// createRandomAccount เป็นฟังก์ชันผู้ช่วย (Helper) สร้างบัญชีสุ่ม 1 บัญชีและตรวจความถูกต้องทันที\n// สังเกต: ชื่อขึ้นต้นด้วยตัวพิมพ์เล็กเพื่อไม่ให้ Go รันเป็นเทสต์เดี่ยวๆ แต่ให้ฟังก์ชัน Test อื่นเรียกใช้\nfunc createRandomAccount(t *testing.T) Account {\n\targ := CreateAccountParams{\n\t\tOwner:    util.RandomOwner(),\n\t\tBalance:  util.RandomMoney(),\n\t\tCurrency: util.RandomCurrency(),\n\t}\n\n\t// ขั้นตอนที่ 1: เรียก CreateAccount และตรวจว่าต้องไม่มี Error\n\taccount, err := testQueries.CreateAccount(context.Background(), arg)\n\trequire.NoError(t, err)\n\trequire.NotEmpty(t, account)\n\n\t// ขั้นตอนที่ 2: ตรวจว่าข้อมูลที่บันทึกตรงกับพารามิเตอร์ที่ส่งเข้าไปทุกฟิลด์\n\trequire.Equal(t, arg.Owner, account.Owner)\n\trequire.Equal(t, arg.Balance, account.Balance)\n\trequire.Equal(t, arg.Currency, account.Currency)\n\n\t// ขั้นตอนที่ 3: ตรวจว่า PostgreSQL สร้างเลข ID และเวลา CreatedAt ให้จริง\n\trequire.NotZero(t, account.ID)\n\trequire.NotZero(t, account.CreatedAt)\n\n\treturn account\n}\n\nfunc TestCreateAccount(t *testing.T) {\n\tcreateRandomAccount(t)\n}\n\nfunc TestGetAccount(t *testing.T) {\n\t// ขั้นตอนที่ 1: สร้างบัญชีใหม่ขึ้นมา 1 บัญชี\n\tacc1 := createRandomAccount(t)\n\n\t// ขั้นตอนที่ 2: ดึงข้อมูลบัญชีตาม ID ที่เพิ่งสร้าง\n\tacc2, err := testQueries.GetAccount(context.Background(), acc1.ID)\n\trequire.NoError(t, err)\n\trequire.NotEmpty(t, acc2)\n\n\t// ขั้นตอนที่ 3: ยืนยันว่าข้อมูลที่อ่านได้ตรงกับตอนสร้างทุกประการ\n\trequire.Equal(t, acc1.ID, acc2.ID)\n\trequire.Equal(t, acc1.Owner, acc2.Owner)\n\trequire.Equal(t, acc1.Balance, acc2.Balance)\n\trequire.Equal(t, acc1.Currency, acc2.Currency)\n\trequire.WithinDuration(t, acc1.CreatedAt, acc2.CreatedAt, time.Second)\n}\n\nfunc TestDeleteAccount(t *testing.T) {\n\t// ขั้นตอนที่ 1: สร้างบัญชีแล้วสั่งลบทันที\n\tacc1 := createRandomAccount(t)\n\terr := testQueries.DeleteAccount(context.Background(), acc1.ID)\n\trequire.NoError(t, err)\n\n\t// ขั้นตอนที่ 2: ลองค้นหาบัญชีที่ถูกลบไปแล้ว ต้องได้รับ Error ว่า sql.ErrNoRows\n\tacc2, err := testQueries.GetAccount(context.Background(), acc1.ID)\n\trequire.Error(t, err)\n\trequire.EqualError(t, err, sql.ErrNoRows.Error())\n\trequire.Empty(t, acc2)\n}\n\nfunc TestListAccounts(t *testing.T) {\n\t// ขั้นตอนที่ 1: สร้างบัญชีจำลอง 10 บัญชี\n\tfor i := 0; i < 10; i++ {\n\t\tcreateRandomAccount(t)\n\t}\n\n\t// ขั้นตอนที่ 2: ทดสอบดึงข้อมูลแบบแบ่งหน้า (ข้าม 5 แถวแรก และดึงมา 5 แถว)\n\targ := ListAccountsParams{\n\t\tLimit:  5,\n\t\tOffset: 5,\n\t}\n\n\taccounts, err := testQueries.ListAccounts(context.Background(), arg)\n\trequire.NoError(t, err)\n\trequire.Len(t, accounts, 5)\n\n\tfor _, account := range accounts {\n\t\trequire.NotEmpty(t, account)\n\t}\n}"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**ทำไมต้องสร้าง `createRandomAccount(t)` แยกออกมา?**: เพราะในเทสต์ของการอ่าน (`TestGetAccount`), การลบ (`TestDeleteAccount`), และการโอนเงิน เราจำเป็นต้องมีบัญชีตั้งต้นในฐานข้อมูลก่อน การแยกเป็นฟังก์ชันช่วยทำให้ทุกเทสต์สร้างบัญชีของตัวเองได้อย่างอิสระ ไม่กวนกัน",
            "**`require.WithinDuration(..., time.Second)`**: เวลา `timestamptz` จากฐานข้อมูลอาจมีความละเอียดระดับไมโครวินาทีที่ต่างจากเวลาใน Go เล็กน้อย การเช็กว่าเวลาทั้งสองห่างกันไม่เกิน 1 วินาทีจึงแม่นยำและปลอดภัยที่สุด"
          ]
        },
        {
          "t": "h2",
          "c": "5. รันคำสั่งทดสอบ Unit Test ใน Terminal"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "รันชุดทดสอบ CRUD ของ Account ทั้งหมด",
          "code": "go test -v -run 'TestCreateAccount|TestGetAccount|TestDeleteAccount|TestListAccounts' ./db",
          "out": "=== RUN   TestCreateAccount\n--- PASS: TestCreateAccount (0.01s)\n=== RUN   TestGetAccount\n--- PASS: TestGetAccount (0.01s)\n=== RUN   TestDeleteAccount\n--- PASS: TestDeleteAccount (0.01s)\n=== RUN   TestListAccounts\n--- PASS: TestListAccounts (0.01s)\nPASS\nok      simplebank/db   0.142s"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• คุณได้พิสูจน์ด้วย Automated Unit Test แล้วว่า Data Access Layer ของคุณสามารถสร้าง, อ่าน, ลบ, และแบ่งหน้ารายการบัญชีใน PostgreSQL ได้อย่างถูกต้อง 100%\n• **ก้าวต่อไป (บทที่ 4.1)**: เมื่อคำสั่งเดี่ยวๆ ทำงานถูกต้องแล้ว เราจะก้าวเข้าสู่การมัดรวมหลายคำสั่งด้วย **ACID Transaction Manager (`execTx`)** เพื่อสร้างระบบโอนเงินกันครับ!"
        }
      ],
      "en": []
    }
  },
  "bank-concurrency-testing": {
    "slug": "bank-concurrency-testing",
    "title": {
      "th": "5.3 ทดสอบ Concurrency & Deadlock ด้วย Goroutines",
      "en": "5.3 Stress Testing Concurrency & Deadlocks with Goroutines"
    },
    "lead": {
      "th": "เขียนโค้ด Go ปล่อยฝูง Goroutines ยิงโอนเงินพร้อมกันในเสี้ยววินาทีเดียวกัน ส่งผลลัพธ์ผ่าน Channels เพื่อพิสูจน์ว่ายอดเงินไม่เพี้ยนและไม่มี Deadlock 100%",
      "en": "Writing parallel stress tests with goroutines and channels to prove data consistency and zero deadlocks."
    },
    "group": "5. รับมือคนกดพร้อมกัน: Race Condition & Deadlock",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: อัปเกรด `TransferTx` เป็น Version 2 ที่มีทั้ง Row Locking และ Resource Ordering เรียบร้อยแล้ว\n• **ภารกิจในบทนี้**: สร้างไฟล์ `simplebank/db/tx_transfer_test.go` เพื่อจำลองการยิงโอนเงินพร้อมกันด้วย Goroutines ทั้งแบบโอนทางเดียว (`TestTransferTx`) และแบบโอนสวนทางกัน (`TestTransferTxDeadlock`)\n• **ไวยากรณ์ Go ที่จะได้ใช้จริง**: Goroutines (`go func()`), Unbuffered Channels (`make(chan error)`), การรอผลแบบ Blocking (`<-errs`), และ Map (`make(map[int]bool)`)"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "p",
          "c": "ในไฟล์ `tx_transfer_test.go` เราจะใช้กลไก Concurrency ของ Go ที่เรียนไว้ในบทที่ 1.2 มาทำงานร่วมกัน มาดูแผนผังการทำงานของโค้ดชุดนี้ให้ชัดเจนก่อนเริ่มเขียน:"
        },
        {
          "t": "table",
          "head": [
            "คำสั่งในเทสต์",
            "ทำหน้าที่อะไร?",
            "ทำไมต้องเขียนแบบนี้?"
          ],
          "rows": [
            [
              "errs := make(chan error)\nresults := make(chan TransferTxResult)",
              "สร้างท่อ Channel 2 ท่อสำหรับรับค่าจาก Goroutines",
              "เพราะ Goroutine ที่รันเบื้องหลังไม่สามารถ `return` ค่ากลับมาที่ฟังก์ชันหลักตรงๆ ได้ และห้ามเรียก `require.NoError(t, err)` ข้างใน Goroutine โดยตรง จึงต้องส่งค่าผ่านท่อกลับมาตรวจที่ฟังก์ชันหลัก"
            ],
            [
              "for i := 0; i < n; i++ {\n    go func() {\n        res, err := store.TransferTx(...)\n        errs <- err\n        results <- res\n    }()\n}",
              "ปล่อย Goroutine จำนวน `n` ตัวออกไปยิงโอนเงินพร้อมกันทันที",
              "ทุกรอบของลูปจะแตก Goroutine ใหม่ไปยิงเข้าฐานข้อมูลในเวลาเดียวกัน เพื่อจำลองสถานการณ์คนกดโอนเงินพร้อมกัน"
            ],
            [
              "for i := 0; i < n; i++ {\n    err := <-errs\n    result := <-results\n}",
              "วนลูปดึงผลลัพธ์ออกจากท่อให้ครบ `n` รอบ (ทำหน้าที่รอ Goroutine อัตโนมัติ)",
              "คำสั่ง `<-errs` จะ **หยุดรอ (Block)** จนกว่าจะมี Goroutine ส่งค่าเข้ามา การวนลูปรอรับครบ `n` ครั้งจึงการันตีว่า Goroutine ทั้ง `n` ตัวทำงานเสร็จครบทุกตัวโดยไม่ต้องใช้ `sync.WaitGroup`!"
            ],
            [
              "k := int(diff1 / amount)\nrequire.NotContains(t, existed, k)\nexisted[k] = true",
              "ตรวจสอบว่ายอดเงินลดลงทีละขั้น (รอบที่ 1, 2, 3, 4, 5) โดยไม่ซ้ำยอดกัน",
              "ถ้าเกิด Race Condition สอง Goroutine จะเห็นยอดเงินเท่ากัน ทำให้ค่า `k` ซ้ำกัน (เช่น ได้ `k = 1` ซ้ำสองครั้ง) บรรทัด `NotContains` จะจับบั๊กได้ทันที!"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. ลงมือสร้างไฟล์ simplebank/db/tx_transfer_test.go"
        },
        {
          "t": "p",
          "c": "สร้างไฟล์ `simplebank/db/tx_transfer_test.go` ซึ่งประกอบด้วย 2 ฟังก์ชันทดสอบหลัก คือ `TestTransferTx` (โอนทางเดียวพร้อมกัน 5 รายการ) และ `TestTransferTxDeadlock` (โอนสวนทางกันพร้อมกัน 10 รายการ):"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/tx_transfer_test.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/tx_transfer_test.go\n// หน้าที่: ทดสอบความถูกต้องของธุรกรรมการโอนเงินแบบคู่ขนาน (Concurrency & Deadlock Tests)\n// แก้ปัญหา: พิสูจน์ด้วย Goroutines ว่าไม่เกิด Race Condition (เงินเพี้ยน) และไม่เกิด Deadlock\n// =============================================================================\npackage db\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"testing\"\n\n\t\"github.com/stretchr/testify/require\"\n)\n\n// TestTransferTx จำลองการปล่อย 5 Goroutines โอนเงินจากบัญชี 1 ไปยังบัญชี 2 พร้อมกัน\nfunc TestTransferTx(t *testing.T) {\n\tstore := NewStore(testDB)\n\n\t// ขั้นตอนที่ 1: สร้างบัญชีทดสอบ 2 บัญชีและพิมพ์ยอดเงินตั้งต้น\n\taccount1 := createRandomAccount(t)\n\taccount2 := createRandomAccount(t)\n\tfmt.Println(\">> ยอดเงินก่อนโอน:\", account1.Balance, account2.Balance)\n\n\t// ขั้นตอนที่ 2: กำหนดจำนวน Goroutines (n = 5) และยอดโอนต่อครั้ง (amount = 10)\n\tn := 5\n\tamount := int64(10)\n\n\t// สร้างท่อ Channel สำหรับรับ error และผลลัพธ์จากแต่ละ Goroutine\n\terrs := make(chan error)\n\tresults := make(chan TransferTxResult)\n\n\t// ขั้นตอนที่ 3: แตก Goroutines ทั้ง 5 ตัวให้ยิงคำสั่ง TransferTx พร้อมกันทันที\n\tfor i := 0; i < n; i++ {\n\t\tgo func() {\n\t\t\tresult, err := store.TransferTx(context.Background(), TransferTxParams{\n\t\t\t\tFromAccountID: account1.ID,\n\t\t\t\tToAccountID:   account2.ID,\n\t\t\t\tAmount:        amount,\n\t\t\t})\n\n\t\t\t// ส่ง error และผลลัพธ์กลับเข้าท่อ Channel\n\t\t\terrs <- err\n\t\t\tresults <- result\n\t\t}()\n\t}\n\n\t// ขั้นตอนที่ 4: วนลูปดึงผลลัพธ์จากท่อ Channel ทั้ง 5 รอบมาตรวจสอบความถูกต้อง\n\texisted := make(map[int]bool)\n\tfor i := 0; i < n; i++ {\n\t\terr := <-errs\n\t\trequire.NoError(t, err)\n\n\t\tresult := <-results\n\t\trequire.NotEmpty(t, result)\n\n\t\t// 4.1 ตรวจข้อมูลประวัติการโอน (Transfer)\n\t\ttransfer := result.Transfer\n\t\trequire.NotEmpty(t, transfer)\n\t\trequire.Equal(t, account1.ID, transfer.FromAccountID)\n\t\trequire.Equal(t, account2.ID, transfer.ToAccountID)\n\t\trequire.Equal(t, amount, transfer.Amount)\n\t\trequire.NotZero(t, transfer.ID)\n\n\t\t// 4.2 ตรวจข้อมูลสมุดบัญชีแยกประเภทฝั่งออกและฝั่งเข้า (Entries)\n\t\tfromEntry := result.FromEntry\n\t\trequire.NotEmpty(t, fromEntry)\n\t\trequire.Equal(t, account1.ID, fromEntry.AccountID)\n\t\trequire.Equal(t, -amount, fromEntry.Amount)\n\n\t\ttoEntry := result.ToEntry\n\t\trequire.NotEmpty(t, toEntry)\n\t\trequire.Equal(t, account2.ID, toEntry.AccountID)\n\t\trequire.Equal(t, amount, toEntry.Amount)\n\n\t\t// 4.3 ตรวจผลต่างยอดเงินในแต่ละรอบว่าลดลงและเพิ่มขึ้นเป็นขั้นบันได (k = 1..5 ไม่ซ้ำกัน)\n\t\tdiff1 := account1.Balance - result.FromAccount.Balance\n\t\tdiff2 := result.ToAccount.Balance - account2.Balance\n\t\trequire.Equal(t, diff1, diff2)\n\t\trequire.True(t, diff1 > 0)\n\t\trequire.True(t, diff1%amount == 0)\n\n\t\tk := int(diff1 / amount)\n\t\trequire.True(t, k >= 1 && k <= n)\n\t\trequire.NotContains(t, existed, k)\n\t\texisted[k] = true\n\t}\n\n\t// ขั้นตอนที่ 5: ดึงยอดเงินล่าสุดจากฐานข้อมูลมาตรวจว่ายอดสุทธิถูกต้อง 100%\n\tupdatedAccount1, err := testQueries.GetAccount(context.Background(), account1.ID)\n\trequire.NoError(t, err)\n\n\tupdatedAccount2, err := testQueries.GetAccount(context.Background(), account2.ID)\n\trequire.NoError(t, err)\n\n\tfmt.Println(\">> ยอดเงินหลังโอน:\", updatedAccount1.Balance, updatedAccount2.Balance)\n\trequire.Equal(t, account1.Balance-int64(n)*amount, updatedAccount1.Balance)\n\trequire.Equal(t, account2.Balance+int64(n)*amount, updatedAccount2.Balance)\n}\n\n// TestTransferTxDeadlock จำลองการโอนเงินสวนทางกันพร้อมกัน 10 รายการ (1->2 ห้ารายการ และ 2->1 ห้ารายการ)\nfunc TestTransferTxDeadlock(t *testing.T) {\n\tstore := NewStore(testDB)\n\n\taccount1 := createRandomAccount(t)\n\taccount2 := createRandomAccount(t)\n\n\t// ขั้นตอนที่ 1: เตรียมปล่อย 10 Goroutines โอนสวนทางกัน\n\tn := 10\n\tamount := int64(10)\n\terrs := make(chan error)\n\n\tfor i := 0; i < n; i++ {\n\t\tfromAccountID := account1.ID\n\t\ttoAccountID := account2.ID\n\n\t\t// ถ้ารอบที่เป็นเลขคี่ (i%2 == 1) ให้สลับทิศทางเป็น บัญชี 2 โอนกลับหา บัญชี 1\n\t\tif i%2 == 1 {\n\t\t\tfromAccountID = account2.ID\n\t\t\ttoAccountID = account1.ID\n\t\t}\n\n\t\tgo func() {\n\t\t\t// ใช้ _ ทิ้งผลลัพธ์การโอน เพราะเทสต์นี้ต้องการตรวจเฉพาะว่ามี error deadlock หรือไม่\n\t\t\t_, err := store.TransferTx(context.Background(), TransferTxParams{\n\t\t\t\tFromAccountID: fromAccountID,\n\t\t\t\tToAccountID:   toAccountID,\n\t\t\t\tAmount:        amount,\n\t\t\t})\n\t\t\terrs <- err\n\t\t}()\n\t}\n\n\t// ขั้นตอนที่ 2: ดึง error ทั้ง 10 รอบมาตรวจ ต้องไม่มี pq: deadlock detected เลยแม้แต่ตัวเดียว!\n\tfor i := 0; i < n; i++ {\n\t\terr := <-errs\n\t\trequire.NoError(t, err)\n\t}\n\n\t// ขั้นตอนที่ 3: โอนไป 5 ครั้ง โอนกลับ 5 ครั้ง ยอดเงินสุทธิของทั้งสองบัญชีต้องกลับมาเท่าเดิมเป๊ะ!\n\tupdatedAccount1, err := testQueries.GetAccount(context.Background(), account1.ID)\n\trequire.NoError(t, err)\n\n\tupdatedAccount2, err := testQueries.GetAccount(context.Background(), account2.ID)\n\trequire.NoError(t, err)\n\n\trequire.Equal(t, account1.Balance, updatedAccount1.Balance)\n\trequire.Equal(t, account2.Balance, updatedAccount2.Balance)\n}"
        },
        {
          "t": "h2",
          "c": "3. รันทดสอบพร้อมเปิด Race Detector (-race)"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "รันเทสต์โอนเงินคู่ขนานและเทสต์ป้องกัน Deadlock",
          "code": "go test -v -race -run 'TestTransferTx|TestTransferTxDeadlock' ./db",
          "out": "=== RUN   TestTransferTx\n>> ยอดเงินก่อนโอน: 520 840\n>> ยอดเงินหลังโอน: 470 890\n--- PASS: TestTransferTx (0.08s)\n=== RUN   TestTransferTxDeadlock\n--- PASS: TestTransferTxDeadlock (0.13s)\nPASS\nok      simplebank/db   0.452s"
        },
        {
          "t": "callout",
          "title": "🧪 แบบฝึกหัดท้าให้ลองแกล้งทำโค้ดพัง (Break-It Lab)",
          "c": "หากคุณอยากเห็นกับตาตัวเองว่า Deadlock หน้าตาเป็นอย่างไร ให้ลองเข้าไปในไฟล์ `simplebank/db/tx_transfer.go` แล้วแก้เงื่อนไข `if arg.FromAccountID < arg.ToAccountID` ให้ล็อก `FromAccountID` ก่อนเสมอ (เหมือน Version 1) แล้วรันคำสั่ง `go test -v -run TestTransferTxDeadlock ./db` คุณจะเห็นข้อความ **`pq: deadlock detected (SQLSTATE 40P01)`** ทันที! ทดลองเสร็จแล้วอย่าลืมแก้กลับเป็น Version 2 นะครับ"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• ตอนนี้ระบบฐานข้อมูลและระบบโอนเงินของเราผ่านการพิสูจน์ด้วย Stress Test ระดับ Goroutines แล้วว่าปลอดภัยจากทั้ง Race Condition และ Deadlock 100%\n• **ก้าวต่อไป (บทที่ 6.1)**: ถึงเวลาเปิดประตูให้โลกภายนอกสั่งสร้างบัญชีและโอนเงินผ่านเว็บได้ ด้วยการสร้าง **RESTful API Server ด้วย Gin Framework** ในโฟลเดอร์ `simplebank/api/` กันครับ!"
        }
      ],
      "en": []
    }
  }
};
