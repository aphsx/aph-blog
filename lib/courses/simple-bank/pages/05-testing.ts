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
      "th": "เขียน Unit Test ทดสอบฟังก์ชัน CRUD ของบัญชีธนาคารอย่างเป็นระบบ ด้วย testing package และ testify/require พร้อมสร้างฟังก์ชันสุ่มข้อมูลจำลอง",
      "en": "Writing comprehensive unit tests for account CRUD operations using Go's testing package and testify/require."
    },
    "group": "3. เชื่อมต่อฐานข้อมูลด้วย Go & พิสูจน์ด้วย Unit Test",
    "blocks": {
      "th": [
        {
          "t": "callout",
          "title": "🧭 แผนที่การเรียนรู้ (Where You Are & What You'll Build)",
          "c": "• **สิ่งที่ทำสำเร็จแล้ว**: เขียนโค้ด CRUD สำหรับตาราง `accounts`, `entries`, และ `transfers` ในโฟลเดอร์ `simplebank/db/` เสร็จแล้ว\n• **ภารกิจในบทนี้**: สร้างตัวสุ่มข้อมูลจำลอง (`util/random.go`), ตั้งค่าการเชื่อมต่อสำหรับเทสต์ (`db/main_test.go`), และเขียน Unit Test ตรวจสอบ CRUD ทุกฟังก์ชัน (`db/account_test.go`)\n• **ไวยากรณ์ Go & Best Practices ที่ใช้ในบทนี้**: แพ็กเกจ `testing` (`*testing.T`, `*testing.M`), การสุ่มค่าด้วย `math/rand` มาตรฐาน Go ยุคใหม่, และไลบรารี `testify/require`"
        },
        {
          "t": "p",
          "c": "หลังจากที่เราเขียนฟังก์ชัน CRUD ทั้งหมดเสร็จแล้ว ในงานวิศวกรรมซอฟต์แวร์ระดับมืออาชีพ เราจะไม่ใช้วิธีรัน `main.go` แล้วนั่งไล่อ่านผลบนหน้าจอด้วยตาเปล่าทุกครั้งที่แก้โค้ด แต่เราจะเขียน **Automated Unit Tests** เพื่อสั่งให้โปรแกรมทดสอบตัวเองและตรวจเทียบผลลัพธ์โดยอัตโนมัติ หากวันหน้าเราเผลอแก้โค้ดแล้วทำให้ฟีเจอร์เดิมพัง (เรียกว่าเกิด **Regression Bug**) ชุดทดสอบจะแจ้งเตือนสีแดงทันที โดยในคอร์สนี้เราจะใช้ไลบรารี **`testify/require`** มาช่วยให้โค้ดเทสต์สั้น กระชับ และอ่านเข้าใจง่าย"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go & Best Practices ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "กลไกการเขียนเทสต์ใน Go",
            "โค้ดที่ปรากฏ",
            "ทำไมต้องทำแบบนี้? (Best Practice)"
          ],
          "rows": [
            [
              "1. TestMain(m *testing.M)",
              "`func TestMain(m *testing.M) { ... os.Exit(m.Run()) }`",
              "เป็นฟังก์ชันด่านแรกที่ Go เรียกก่อนรันเทสต์ทุกตัวในแพ็กเกจ ใช้เปิด `testDB` และ `testQueries` ครั้งเดียวแล้วแชร์ให้ทุกเทสต์ใช้ร่วมกัน"
            ],
            [
              "2. Helper Function ตัวพิมพ์เล็ก",
              "`func createRandomAccount(t *testing.T) Account`",
              "ฟังก์ชันที่ขึ้นต้นด้วย `Test...` จะถูก Go รันเป็นเทสต์อัตโนมัติ ส่วนฟังก์ชันช่วยเตรียมข้อมูลต้องขึ้นต้นด้วยตัวพิมพ์เล็ก (`createRandomAccount`) เพื่อให้เทสต์อื่นเรียกใช้และคืนค่า `Account` ที่สร้างเสร็จกลับมา"
            ],
            [
              "3. Go 1.20+ math/rand Best Practice",
              "ไม่ต้องใช้ `rand.Seed` ที่ถูก Deprecated แล้ว (หรือใช้ `rand.New(rand.NewSource(...))`)",
              "ตั้งแต่ Go 1.20 เป็นต้นมา แพ็กเกจ `math/rand` จะสุ่ม Seed จากระบบให้อัตโนมัติตั้งแต่เริ่มโปรแกรม ทำให้ไม่ต้องกังวลเรื่องลืมตั้งค่า Seed อีกต่อไป"
            ],
            [
              "4. testify/require แทน assert",
              "`require.NoError(t, err)`",
              "หากคำสั่ง SQL พัง `require` จะสั่งหยุดเทสต์นั้นทันที (`t.FailNow()`) ป้องกันไม่ให้บรรทัดถัดไปพยายามอ่านค่าว่างจนเกิด Panic"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. ติดตั้ง `testify` และทำไมต้องใช้ `require`"
        },
        {
          "t": "p",
          "c": "แม้ว่า Go จะมีแพ็กเกจ `testing` ติดมาในตัว แต่การเขียนเช็ก `if err != nil { t.Errorf(...) }` ซ้ำๆ ทุกบรรทัดทำให้โค้ดเทสต์ยาวเหยียดและอ่านยาก ไลบรารียอดนิยมอันดับ 1 ของโลกคือ `github.com/stretchr/testify`:"
        },
        {
          "t": "code",
          "lang": "bash",
          "label": "ติดตั้ง testify",
          "c": "go get github.com/stretchr/testify"
        },
        {
          "t": "callout",
          "title": "💡 assert VS require ต่างกันอย่างไร?",
          "c": "ใน `testify` มีสองแพ็กเกจหลักคือ `assert` และ `require`:\n- `assert`: หากการตรวจสอบไม่ผ่าน จะพิมพ์เตือนว่าผิด แต่ยังปล่อยให้โค้ดบรรทัดถัดไปทำงานต่อ\n- `require`: หากไม่ผ่าน จะสั่งหยุดการรันเทสต์ของฟังก์ชันนั้นทันที (`t.FailNow()`)\n\nในงานเขียนเทสต์ระบบฐานข้อมูล เราควรใช้ **`require`** เสมอ เพราะหากสร้างบัญชีไม่สำเร็จ การปล่อยให้โค้ดไปรันบรรทัดถัดไปที่พยายามอ่าน ID ของบัญชี จะทำให้เกิด `nil pointer dereference panic` ทันที"
        },
        {
          "t": "h2",
          "c": "3. ตั้งค่าการเชื่อมต่อใน `main_test.go`"
        },
        {
          "t": "p",
          "c": "เราจะใช้ฟังก์ชันพิเศษ `TestMain` ซึ่ง Go จะสั่งให้รันเป็นจุดเริ่มต้นก่อนรันเทสต์ทุกตัวในแพ็กเกจ เพื่อเตรียมตัวแปร `testQueries` ให้พร้อมใช้งาน:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/main_test.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/main_test.go\n// หน้าที่: ฟังก์ชัน TestMain สำหรับเตรียมการเชื่อมต่อฐานข้อมูลสำหรับชุดทดสอบทั้งหมดใน package db\n// แก้ปัญหา: ป้องกันการเปิด-ปิด database connection ซ้ำซ้อนในทุก test function และเตรียม testQueries ให้พร้อมใช้งาน\n// =============================================================================\npackage db\n\nimport (\n\t\"database/sql\"\n\t\"log\"\n\t\"os\"\n\t\"testing\"\n\n\t_ \"github.com/lib/pq\"\n)\n\nconst (\n\tdbDriver = \"postgres\"\n\tdbSource = \"postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable\"\n)\n\nvar testQueries *Queries\nvar testDB *sql.DB\n\nfunc TestMain(m *testing.M) {\n\tvar err error\n\ttestDB, err = sql.Open(dbDriver, dbSource)\n\tif err != nil {\n\t\tlog.Fatal(\"ไม่สามารถเชื่อมต่อฐานข้อมูลสำหรับเทสต์:\", err)\n\t}\n\n\ttestQueries = New(testDB)\n\n\t// รันเทสต์ทุกตัวในแพ็กเกจ แล้วคืน status code ออกไป\n\tos.Exit(m.Run())\n}"
        },
        {
          "t": "h2",
          "c": "4. ตัวช่วยสร้างข้อมูลจำลอง (Random Generators)"
        },
        {
          "t": "p",
          "c": "การเขียนเทสต์ที่ดีต้องไม่ Hardcode ข้อมูลเดิมซ้ำๆ เพราะอาจไปชนกับ Primary Key ของการรันรอบก่อนหน้า เราจะสร้างฟังก์ชันสุ่มข้อมูลใน `util/random.go`:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/util/random.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/util/random.go\n// หน้าที่: ฟังก์ชันช่วยสุ่มข้อมูลจำลอง (Random Generators) สำหรับใช้งานในชุดทดสอบ\n// แก้ปัญหา: ป้องกันข้อมูลซ้ำชนกับ Unique/Primary Key ในฐานข้อมูล และทำให้แต่ละการทดสอบเป็นอิสระต่อกัน (Independent)\n// =============================================================================\npackage util\n\nimport (\n\t\"math/rand\"\n\t\"strings\"\n)\n\nconst alphabet = \"abcdefghijklmnopqrstuvwxyz\"\n\n// หมายเหตุ Best Practice (Go 1.20+):\n// ตั้งแต่ Go 1.20 เป็นต้นมา math/rand จะสุ่ม Seed อัตโนมัติโดยไม่ต้องเรียก rand.Seed() ที่ถูก Deprecated แล้ว\n// หรือหากต้องการตัวสุ่มเฉพาะส่วน สามารถใช้ rand.New(rand.NewSource(time.Now().UnixNano())) ได้เช่นกัน\n\n// RandomString สุ่มตัวอักษรความยาว n ตัว\nfunc RandomString(n int) string {\n\tvar sb strings.Builder\n\tk := len(alphabet)\n\tfor i := 0; i < n; i++ {\n\t\tc := alphabet[rand.Intn(k)]\n\t\tsb.WriteByte(c)\n\t}\n\treturn sb.String()\n}\n\n// RandomOwner สุ่มชื่อเจ้าของบัญชี\nfunc RandomOwner() string {\n\treturn RandomString(6)\n}\n\n// RandomMoney สุ่มยอดเงินตั้งแต่ min ถึง max\nfunc RandomMoney() int64 {\n\treturn int64(rand.Intn(1000) + 100)\n}\n\n// RandomCurrency สุ่มสกุลเงิน\nfunc RandomCurrency() string {\n\tcurrencies := []string{\"USD\", \"EUR\", \"THB\"}\n\treturn currencies[rand.Intn(len(currencies))]\n}"
        },
        {
          "t": "h2",
          "c": "5. เขียน Unit Test สำหรับ Create, Get, และ Delete Account"
        },
        {
          "t": "p",
          "c": "ดูการนำ `require` และข้อมูลสุ่มมาประกอบกันเป็นชุดทดสอบคุณภาพสูง:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/account_test.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/account_test.go\n// หน้าที่: ชุดทดสอบ Unit Test สำหรับ CRUD Operations ของ Account (Create, Get, Delete, List)\n// แก้ปัญหา: ตรวจสอบความถูกต้องของการทำงานกับฐานข้อมูล และป้องกันการเกิด Regression เมื่อมีการแก้ไขโค้ด\n// =============================================================================\npackage db\n\nimport (\n\t\"context\"\n\t\"database/sql\"\n\t\"testing\"\n\t\"time\"\n\n\t\"github.com/stretchr/testify/require\"\n\t\"simplebank/util\"\n)\n\n// createRandomAccount เป็น helper function ช่วยสร้างบัญชีสุ่มขึ้นมา 1 บัญชี\nfunc createRandomAccount(t *testing.T) Account {\n\targ := CreateAccountParams{\n\t\tOwner:    util.RandomOwner(),\n\t\tBalance:  util.RandomMoney(),\n\t\tCurrency: util.RandomCurrency(),\n\t}\n\n\taccount, err := testQueries.CreateAccount(context.Background(), arg)\n\trequire.NoError(t, err) // ต้องไม่มี error\n\trequire.NotEmpty(t, account) // ข้อมูลต้องไม่เป็นค่าว่าง\n\n\trequire.Equal(t, arg.Owner, account.Owner)\n\trequire.Equal(t, arg.Balance, account.Balance)\n\trequire.Equal(t, arg.Currency, account.Currency)\n\n\trequire.NotZero(t, account.ID) // ID ต้องถูกรันจากฐานข้อมูล\n\trequire.NotZero(t, account.CreatedAt)\n\n\treturn account\n}\n\nfunc TestCreateAccount(t *testing.T) {\n\tcreateRandomAccount(t)\n}\n\nfunc TestGetAccount(t *testing.T) {\n\tacc1 := createRandomAccount(t)\n\tacc2, err := testQueries.GetAccount(context.Background(), acc1.ID)\n\n\trequire.NoError(t, err)\n\trequire.NotEmpty(t, acc2)\n\n\trequire.Equal(t, acc1.ID, acc2.ID)\n\trequire.Equal(t, acc1.Owner, acc2.Owner)\n\trequire.Equal(t, acc1.Balance, acc2.Balance)\n\trequire.Equal(t, acc1.Currency, acc2.Currency)\n\trequire.WithinDuration(t, acc1.CreatedAt, acc2.CreatedAt, time.Second)\n}\n\nfunc TestDeleteAccount(t *testing.T) {\n\tacc1 := createRandomAccount(t)\n\terr := testQueries.DeleteAccount(context.Background(), acc1.ID)\n\trequire.NoError(t, err)\n\n\t// เมื่อลบแล้ว พอไปค้นหาอีกรอบ ต้องได้ sql.ErrNoRows กลับมา\n\tacc2, err := testQueries.GetAccount(context.Background(), acc1.ID)\n\trequire.Error(t, err)\n\trequire.EqualError(t, err, sql.ErrNoRows.Error())\n\trequire.Empty(t, acc2)\n}\n\nfunc TestListAccounts(t *testing.T) {\n\tfor i := 0; i < 10; i++ {\n\t\tcreateRandomAccount(t)\n\t}\n\n\targ := ListAccountsParams{\n\t\tLimit:  5,\n\t\tOffset: 5,\n\t}\n\n\taccounts, err := testQueries.ListAccounts(context.Background(), arg)\n\trequire.NoError(t, err)\n\trequire.Len(t, accounts, 5)\n\n\tfor _, account := range accounts {\n\t\trequire.NotEmpty(t, account)\n\t}\n}"
        },
        {
          "t": "h3",
          "c": "🔍 เจาะลึกการทำงานของโค้ดทีละจุด (Code Breakdown)"
        },
        {
          "t": "ul",
          "c": [
            "**`require.NoError(t, err)`**: เช็กว่าคำสั่งทำงานสำเร็จ ถ้ามี error เทสต์จะหยุดทันทีพร้อมแสดงสาเหตุ",
            "**`require.WithinDuration(...)`**: วันเวลา `CreatedAt` ที่ผ่านการแปลงไปกลับระหว่าง Go และ PostgreSQL อาจมีความคลาดเคลื่อนในระดับไมโครวินาที การใช้ `WithinDuration(..., time.Second)` ช่วยให้การเทียบเวลาไม่พังจากความละเอียดของนาฬิกา",
            "**`require.EqualError(t, err, sql.ErrNoRows.Error())`**: พิสูจน์ว่าเมื่อลบบัญชีไปแล้ว ฐานข้อมูลต้องคืนข้อผิดพลาด 'ไม่พบแถวข้อมูล' ออกมาจริงๆ ตามที่ควรจะเป็น",
            "**`require.Len(t, accounts, 5)`**: ตรวจสอบว่าระบบแบ่งหน้า (Pagination) ดึงข้อมูลมาตามจำนวน Limit ที่ระบุจริง"
          ]
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "คำสั่งรัน Unit Test ใน Terminal และผลลัพธ์ที่ได้",
          "code": "go test -v -run TestAccount ./db",
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
      "th": "เขียนโค้ด Go จำลองเหตุการณ์ยิงถล่มโอนเงินพร้อมกัน 5-10 คำสั่งขนาน พิสูจน์ Data Consistency และทดสอบว่าระบบทนทานต่อ Deadlock จริง 100%",
      "en": "Writing parallel stress tests with goroutines and channels to prove consistency and verify zero deadlocks."
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
          "t": "p",
          "c": "นี่คือบททดสอบที่สำคัญที่สุดของระบบธนาคาร! Unit Test ปกติจะรันทีละคำสั่งตามลำดับ (Sequential) ซึ่งไม่สามารถตรวจจับ Race Condition หรือ Deadlock ได้เลย เราต้องจำลองสถานการณ์จริงโดยการปล่อย **หลาย Goroutines ยิงคำสั่งโอนเงินเข้าฐานข้อมูลในเสี้ยววินาทีเดียวกัน**"
        },
        {
          "t": "h2",
          "c": "1. แกะไวยากรณ์ Go & Best Practices ก่อนลุยโค้ดจริง (Go Mechanics Unpacked)"
        },
        {
          "t": "table",
          "head": [
            "กลไก Concurrency ในไฟล์เทสต์",
            "โค้ดที่ปรากฏ",
            "คำอธิบายว่าทำไมต้องเขียนแบบนี้"
          ],
          "rows": [
            [
              "1. สร้างท่อ Unbuffered Channel",
              "`errs := make(chan error)`\n`results := make(chan TransferTxResult)`",
              "ใช้ส่งค่า `err` และ `result` ข้ามจาก Goroutines เบื้องหลังกลับมาตรวจด้วย `require` ที่ฟังก์ชันหลัก"
            ],
            [
              "2. ทำไมไม่ต้องใช้ sync.WaitGroup?",
              "`for i := 0; i < n; i++ {\n    err := <-errs\n    result := <-results\n}`",
              "เพราะคำสั่งดึงค่าจากท่อ (`<-errs`) จะ **หยุดรอ (Block)** จนกว่า Goroutine จะส่งค่าเข้ามา การวนลูปดึงค่าครบ `n` รอบจึงทำหน้าที่รอให้ Goroutines ทั้ง `n` ตัวทำงานเสร็จครบทุกตัวโดยอัตโนมัติ!"
            ],
            [
              "3. ส่งค่าเข้า Goroutine Closure",
              "`go func(fromID, toID int64) { ... }(fromAccountID, toAccountID)`",
              "การส่งตัวแปรในลูปผ่านพารามิเตอร์ของฟังก์ชัน Goroutine เป็น Best Practice ที่ป้องกันบั๊ก Closure จับค่าตัวแปรลูปตัวสุดท้ายซ้ำกัน"
            ],
            [
              "4. เช็กลำดับขั้นด้วย Map",
              "`k := int(diff1 / amount)`\n`require.NotContains(t, existed, k)`",
              "ถ้ายอดโอนครั้งละ 10 บาท 5 ครั้ง ผลต่างยอดเงิน (`diff1`) ต้องเป็น 10, 20, 30, 40, 50 (`k = 1, 2, 3, 4, 5` ไม่ซ้ำกันเลย) พิสูจน์ว่าไม่มีสอง Goroutine ใดอ่านทับยอดเงินเดียวกัน!"
            ]
          ]
        },
        {
          "t": "h2",
          "c": "2. การทดสอบการโอนเงินคู่ขนาน (TestTransferTx)"
        },
        {
          "t": "p",
          "c": "เราจะปล่อย 5 Goroutines ให้โอนเงินจาก Account 1 ไป Account 2 คนละ 10 บาทพร้อมๆ กัน แล้วส่งผลลัพธ์ผ่าน Channel กลับมารวมที่จุดเดียว โดยสร้างไฟล์ `simplebank/db/tx_transfer_test.go` เพื่อทดสอบฟังก์ชัน `TransferTx` โดยเฉพาะ:"
        },
        {
          "t": "code",
          "lang": "go",
          "label": "simplebank/db/tx_transfer_test.go",
          "c": "// =============================================================================\n// ไฟล์: simplebank/db/tx_transfer_test.go\n// หน้าที่: ชุดทดสอบ TestTransferTx สำหรับพิสูจน์ความถูกต้องของการโอนเงินแบบคู่ขนาน (Concurrent Transactions)\n// แก้ปัญหา: ป้องกันบั๊ก Race Condition และเงินสูญหายระหว่างทาง เมื่อมีคำสั่งโอนเงินเข้ามารัวๆ พร้อมกัน\n// =============================================================================\npackage db\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"testing\"\n\n\t\"github.com/stretchr/testify/require\"\n)\n\nfunc TestTransferTx(t *testing.T) {\n\tstore := NewStore(testDB)\n\n\t// 1. สร้างบัญชีทดสอบ 2 บัญชีพร้อมบันทึกยอดเงินตั้งต้น\n\taccount1 := createRandomAccount(t)\n\taccount2 := createRandomAccount(t)\n\tfmt.Println(\">> ยอดเงินก่อนโอน:\", account1.Balance, account2.Balance)\n\n\t// 2. ปล่อย Goroutines โอนเงินพร้อมกัน 5 ครั้ง ครั้งละ 10 บาท\n\tn := 5\n\tamount := int64(10)\n\n\terrs := make(chan error)\n\tresults := make(chan TransferTxResult)\n\n\tfor i := 0; i < n; i++ {\n\t\tgo func() {\n\t\t\t// ส่งคำสั่งโอนเงินพร้อมกันใน Background แล้วส่งผลเข้าท่อ Channel\n\t\t\tresult, err := store.TransferTx(context.Background(), TransferTxParams{\n\t\t\t\tFromAccountID: account1.ID,\n\t\t\t\tToAccountID:   account2.ID,\n\t\t\t\tAmount:        amount,\n\t\t\t})\n\n\t\t\terrs <- err\n\t\t\tresults <- result\n\t\t}()\n\t}\n\n\t// 3. ตรวจสอบผลลัพธ์จากแต่ละ Goroutine ผ่าน Channels\n\texisted := make(map[int]bool)\n\tfor i := 0; i < n; i++ {\n\t\terr := <-errs\n\t\trequire.NoError(t, err) // ต้องไม่มี error เกิดขึ้นในขั้นตอนใดเลย\n\n\t\tresult := <-results\n\t\trequire.NotEmpty(t, result)\n\n\t\t// 3.1 ตรวจสอบข้อมูลแถวในตาราง Transfer\n\t\ttransfer := result.Transfer\n\t\trequire.NotEmpty(t, transfer)\n\t\trequire.Equal(t, account1.ID, transfer.FromAccountID)\n\t\trequire.Equal(t, account2.ID, transfer.ToAccountID)\n\t\trequire.Equal(t, amount, transfer.Amount)\n\t\trequire.NotZero(t, transfer.ID)\n\n\t\t// 3.2 ตรวจสอบสมุดบัญชีแยกประเภท Entries (เงินเข้า/เงินออก)\n\t\tfromEntry := result.FromEntry\n\t\trequire.NotEmpty(t, fromEntry)\n\t\trequire.Equal(t, account1.ID, fromEntry.AccountID)\n\t\trequire.Equal(t, -amount, fromEntry.Amount)\n\n\t\ttoEntry := result.ToEntry\n\t\trequire.NotEmpty(t, toEntry)\n\t\trequire.Equal(t, account2.ID, toEntry.AccountID)\n\t\trequire.Equal(t, amount, toEntry.Amount)\n\n\t\t// 3.3 ตรวจสอบยอดเงินคงเหลือของแต่ละบัญชีในแต่ละรอบ\n\t\tdiff1 := account1.Balance - result.FromAccount.Balance\n\t\tdiff2 := result.ToAccount.Balance - account2.Balance\n\t\trequire.Equal(t, diff1, diff2) // ยอดเงินที่หักออก ต้องเท่ากับยอดเงินที่เพิ่มเข้า\n\t\trequire.True(t, diff1 > 0)\n\t\trequire.True(t, diff1%amount == 0) // ผลต่างต้องหารด้วยจำนวนเงินโอนลงตัว\n\n\t\tk := int(diff1 / amount)\n\t\trequire.True(t, k >= 1 && k <= n)\n\t\trequire.NotContains(t, existed, k) // แต่ละรอบ k ต้องไม่ซ้ำกันเด็ดขาด (พิสูจน์ว่าไม่มี Race Condition)\n\t\texisted[k] = true\n\t}\n\n\t// 4. ตรวจสอบยอดเงินคงเหลือสุทธิสุดท้ายในฐานข้อมูลจริง\n\tupdatedAccount1, err := testQueries.GetAccount(context.Background(), account1.ID)\n\trequire.NoError(t, err)\n\n\tupdatedAccount2, err := testQueries.GetAccount(context.Background(), account2.ID)\n\trequire.NoError(t, err)\n\n\tfmt.Println(\">> ยอดเงินหลังโอน:\", updatedAccount1.Balance, updatedAccount2.Balance)\n\trequire.Equal(t, account1.Balance-int64(n)*amount, updatedAccount1.Balance)\n\trequire.Equal(t, account2.Balance+int64(n)*amount, updatedAccount2.Balance)\n}"
        },
        {
          "t": "h3",
          "c": "ทำไมการเช็ก `k` ถึงอัจฉริยะมาก?"
        },
        {
          "t": "p",
          "c": "ในการโอนเงิน 5 ครั้ง ครั้งละ 10 บาท เงินที่ลดลงในแต่ละรอบต้องเป็น 10, 20, 30, 40, 50 บาทตามลำดับ ดังนั้นตัวแปร `k` (จำนวนรอบที่สะสม) จะต้องครอบคลุมเลข 1 ถึง 5 พอดี หากมีบั๊กเรื่อง Race Condition จะเกิดกรณีที่เงินลดซ้ำยอดเดิม (เช่น มี 2 รอบที่เงินลดลง 20 บาทเท่ากัน) ซึ่งคำสั่ง `require.NotContains(t, existed, k)` จะดักจับได้ทันที!"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "คำสั่งรัน Concurrency Test และ Terminal Output ยอดเงินก่อน/หลังโอน",
          "code": "go test -v -run TestTransferTx ./db",
          "out": "=== RUN   TestTransferTx\n>> ยอดเงินก่อนโอน: 100 100\n>> ยอดเงินหลังโอน: 50 150\n--- PASS: TestTransferTx (0.07s)\nPASS\nok      simplebank/db   0.198s"
        },
        {
          "t": "h2",
          "c": "3. การทดสอบปราบ Deadlock ด้วยการโอนสวนทาง (TestTransferTxDeadlock)"
        },
        {
          "t": "p",
          "c": "ตอนนี้มาถึงการทดสอบขั้นสุดยอด: เราจะเขียนฟังก์ชัน `TestTransferTxDeadlock` ต่อท้ายลงในไฟล์ `simplebank/db/tx_transfer_test.go` โดยสั่งให้ Account 1 โอนให้ 2 จำนวน 5 ครั้ง พร้อมๆ กับที่ Account 2 โอนกลับคืนให้ 1 อีก 5 ครั้ง ในเสี้ยววินาทีเดียวกัน เพื่อพิสูจน์ว่า Resource Ordering ที่เราเขียนไว้สามารถสยบ Deadlock ได้จริง ในลูปมีบรรทัด `_, err := store.TransferTx(...)` ฟังก์ชันนี้คืนสองค่า (ผลโอน, error) เทสต์นี้สนแค่ว่าโอนพังหรือไม่ จึงใช้ `_` ทิ้งผลโอน แล้วส่งเฉพาะ `err` เข้า channel"
        },
        {
          "t": "code",
          "lang": "diff",
          "label": "simplebank/db/tx_transfer_test.go",
          "c": " \tfmt.Println(\">> ยอดเงินหลังโอน:\", updatedAccount1.Balance, updatedAccount2.Balance)\n \trequire.Equal(t, account1.Balance-int64(n)*amount, updatedAccount1.Balance)\n \trequire.Equal(t, account2.Balance+int64(n)*amount, updatedAccount2.Balance)\n }\n+\n+// TestTransferTxDeadlock พิสูจน์ว่าการโอนเงินสวนทางกันจะไม่ทำให้เกิด Deadlock\n+func TestTransferTxDeadlock(t *testing.T) {\n+\tstore := NewStore(testDB)\n+\n+\taccount1 := createRandomAccount(t)\n+\taccount2 := createRandomAccount(t)\n+\n+\t// 1. จำลองการโอนเงินสวนทางกันทั้งหมด 10 ธุรกรรม\n+\tn := 10\n+\tamount := int64(10)\n+\terrs := make(chan error)\n+\n+\tfor i := 0; i < n; i++ {\n+\t\tfromAccountID := account1.ID\n+\t\ttoAccountID := account2.ID\n+\n+\t\t// สลับทิศทางครึ่งหนึ่ง: ให้บัญชี 2 โอนกลับคืนให้บัญชี 1\n+\t\tif i%2 == 1 {\n+\t\t\tfromAccountID = account2.ID\n+\t\t\ttoAccountID = account1.ID\n+\t\t}\n+\n+\t\tgo func() {\n+\t\t\t_, err := store.TransferTx(context.Background(), TransferTxParams{\n+\t\t\t\tFromAccountID: fromAccountID,\n+\t\t\t\tToAccountID:   toAccountID,\n+\t\t\t\tAmount:        amount,\n+\t\t\t})\n+\t\t\terrs <- err\n+\t\t}()\n+\t}\n+\n+\t// 2. ตรวจสอบผลลัพธ์: ทุก Transaction ต้องสำเร็จ ไร้ปัญหา Deadlock 100%\n+\tfor i := 0; i < n; i++ {\n+\t\terr := <-errs\n+\t\trequire.NoError(t, err) // ต้องไม่มีข้อผิดพลาด pq: deadlock detected แม้แต่ครั้งเดียว\n+\t}\n+\n+\t// 3. ตรวจสอบยอดเงินคงเหลือสุดท้าย: โอนไป 5 ครั้ง โอนกลับ 5 ครั้ง ยอดเงินต้องเท่าเดิมเป๊ะ\n+\tupdatedAccount1, err := testQueries.GetAccount(context.Background(), account1.ID)\n+\trequire.NoError(t, err)\n+\n+\tupdatedAccount2, err := testQueries.GetAccount(context.Background(), account2.ID)\n+\trequire.NoError(t, err)\n+\n+\trequire.Equal(t, account1.Balance, updatedAccount1.Balance)\n+\trequire.Equal(t, account2.Balance, updatedAccount2.Balance)\n+}"
        },
        {
          "t": "h2",
          "c": "4. คำสั่งรันเทสต์พร้อมเปิด Race Detector"
        },
        {
          "t": "p",
          "c": "Go มีเครื่องมือในตัวที่ทรงพลังมากชื่อว่า Race Detector ซึ่งสามารถเปิดใช้งานได้ผ่านแฟล็ก `-race`:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "คำสั่งรัน Concurrency & Deadlock Test พร้อมเปิด Race Detector",
          "code": "go test -v -race -run 'TestTransferTx|TestTransferTxDeadlock' ./db",
          "out": "=== RUN   TestTransferTx\n>> ยอดเงินก่อนโอน: 100 100\n>> ยอดเงินหลังโอน: 50 150\n--- PASS: TestTransferTx (0.08s)\n=== RUN   TestTransferTxDeadlock\n--- PASS: TestTransferTxDeadlock (0.13s)\nPASS\nok      simplebank/db   0.452s\n(ตรวจไม่พบ Data Race และไม่มีคำสั่งใดติด Deadlock แม้แต่ตัวเดียว)"
        },
        {
          "t": "p",
          "c": "ลองเปรียบเทียบกับภาพด้านล่าง หากเราไม่ได้ใช้ Resource Ordering ในการป้องกัน Deadlock เทสต์จะพังลงในทันทีด้วยข้อผิดพลาด SQLSTATE 40P01:"
        },
        {
          "t": "codeout",
          "lang": "bash",
          "label": "เปรียบเทียบผลลัพธ์ใน Terminal กรณีไม่ได้ป้องกัน Deadlock (FAIL)",
          "code": "# เมื่อยังไม่ได้ใส่ Resource Ordering (รันโอนเงินสวนทางชนกัน)\ngo test -v -run TestTransferTxDeadlock ./db",
          "out": "=== RUN   TestTransferTxDeadlock\n    tx_transfer_test.go:120: \n        \tError Trace:\ttx_transfer_test.go:120\n        \tError:      \tReceived unexpected error:\n        \t            \tpq: deadlock detected (SQLSTATE 40P01)\n        \tTest:       \tTestTransferTxDeadlock\n--- FAIL: TestTransferTxDeadlock (0.05s)\nFAIL\nFAIL\tsimplebank/db\t0.185s"
        },
        {
          "t": "callout",
          "title": "✅ สรุปสิ่งที่คุณทำสำเร็จในบทนี้ & ก้าวต่อไป",
          "c": "• ตอนนี้ระบบฐานข้อมูลและระบบโอนเงินของเราผ่านการพิสูจน์ด้วย Stress Test ระดับ Goroutines และ `-race` แล้วว่าปลอดภัยจากทั้ง Race Condition และ Deadlock 100%\n• **ก้าวต่อไป (บทที่ 6.1)**: ถึงเวลาเปิดประตูให้โลกภายนอกสั่งสร้างบัญชีและโอนเงินผ่านเว็บได้ ด้วยการสร้าง **RESTful API Server ด้วย Gin Framework** ในโฟลเดอร์ `simplebank/api/` กันครับ!"
        }
      ],
      "en": []
    }
  }
};
