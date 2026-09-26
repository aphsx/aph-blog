import type { Page } from "@/lib/types";

export const testingPages: Record<string, Page> = {
  "bank-unit-testing": {
    slug: "bank-unit-testing",
    title: {
      th: "Unit Test ระบบธนาคารด้วย Testify",
      en: "Unit Testing with Go and Testify",
    },
    lead: {
      th: "เขียน Unit Test ทดสอบฟังก์ชัน CRUD ของบัญชีธนาคารอย่างเป็นระบบ ด้วย testing package และ testify/require พร้อมสร้างฟังก์ชันสุ่มข้อมูลจำลอง",
      en: "Writing comprehensive unit tests for account CRUD operations using Go's testing package and testify/require.",
    },
    group: "5. Automated Testing & Concurrency Test",
    blocks: {
      th: [
        {
          t: "p",
          c: "ในระบบการเงิน คำพูดที่ว่า 'โค้ดของฉันเขียนเสร็จแล้ว ลองกดเล่นดูก็ปกติดี' เป็นสิ่งที่ไม่เพียงพอ คุณไม่สามารถปล่อยระบบขึ้น Production ได้โดยปราศจาก **Automated Tests (ชุดทดสอบอัตโนมัติ)** ที่ครอบคลุมทุกกรณี เพราะการแก้โค้ดเพียงบรรทัดเดียวในอนาคต อาจไปพังส่วนอื่นของระบบโดยไม่รู้ตัว (Regression)",
        },

        { t: "h2", c: "1. ติดตั้ง `testify` และทำไมต้องใช้ `require`" },
        {
          t: "p",
          c: "แม้ว่า Go จะมีแพ็กเกจ `testing` ติดมาในตัว แต่การเขียนเช็ก `if err != nil { t.Errorf(...) }` ซ้ำๆ ทุกบรรทัดทำให้โค้ดเทสต์ยาวเหยียดและอ่านยาก ไลบรารียอดนิยมอันดับ 1 ของโลกคือ `github.com/stretchr/testify`:",
        },
        {
          t: "code",
          lang: "bash",
          label: "ติดตั้ง testify",
          c: `go get github.com/stretchr/testify`,
        },
        {
          t: "callout",
          title: "💡 assert VS require ต่างกันอย่างไร?",
          c: "ใน `testify` มีสองแพ็กเกจหลักคือ `assert` และ `require`:\n- `assert`: หากการตรวจสอบไม่ผ่าน จะพิมพ์เตือนว่าผิด แต่ยังปล่อยให้โค้ดบรรทัดถัดไปทำงานต่อ\n- `require`: หากไม่ผ่าน จะสั่งหยุดการรันเทสต์ของฟังก์ชันนั้นทันที (`t.FailNow()`)\n\nในงานเขียนเทสต์ระบบฐานข้อมูล เราควรใช้ **`require`** เสมอ เพราะหากสร้างบัญชีไม่สำเร็จ การปล่อยให้โค้ดไปรันบรรทัดถัดไปที่พยายามอ่าน ID ของบัญชี จะทำให้เกิด `nil pointer dereference panic` ทันที",
        },

        { t: "h2", c: "2. ตั้งค่าการเชื่อมต่อใน `main_test.go`" },
        {
          t: "p",
          c: "เราจะใช้ฟังก์ชันพิเศษ `TestMain` ซึ่ง Go จะสั่งให้รันเป็นจุดเริ่มต้นก่อนรันเทสต์ทุกตัวในแพ็กเกจ เพื่อเตรียมตัวแปร `testQueries` ให้พร้อมใช้งาน:",
        },
        {
          t: "code",
          lang: "go",
          label: "db/main_test.go",
          c: `package db

import (
	"database/sql"
	"log"
	"os"
	"testing"

	_ "github.com/lib/pq"
)

const (
	dbDriver = "postgres"
	dbSource = "postgresql://root:secret@localhost:5432/simple_bank?sslmode=disable"
)

var testQueries *Queries
var testDB *sql.DB

func TestMain(m *testing.M) {
	var err error
	testDB, err = sql.Open(dbDriver, dbSource)
	if err != nil {
		log.Fatal("ไม่สามารถเชื่อมต่อฐานข้อมูลสำหรับเทสต์:", err)
	}

	testQueries = New(testDB)

	// รันเทสต์ทุกตัวในแพ็กเกจ แล้วคืน status code ออกไป
	os.Exit(m.Run())
}`,
        },

        { t: "h2", c: "3. ตัวช่วยสร้างข้อมูลจำลอง (Random Generators)" },
        {
          t: "p",
          c: "การเขียนเทสต์ที่ดีต้องไม่ Hardcode ข้อมูลเดิมซ้ำๆ เพราะอาจไปชนกับ Primary Key ของการรันรอบก่อนหน้า เราจะสร้างฟังก์ชันสุ่มข้อมูลใน `util/random.go`:",
        },
        {
          t: "code",
          lang: "go",
          label: "util/random.go",
          c: `package util

import (
	"math/rand"
	"strings"
	"time"
)

const alphabet = "abcdefghijklmnopqrstuvwxyz"

func init() {
	rand.Seed(time.Now().UnixNano())
}

// RandomString สุ่มตัวอักษรความยาว n ตัว
func RandomString(n int) string {
	var sb strings.Builder
	k := len(alphabet)
	for i := 0; i < n; i++ {
		c := alphabet[rand.Intn(k)]
		sb.WriteByte(c)
	}
	return sb.String()
}

// RandomOwner สุ่มชื่อเจ้าของบัญชี
func RandomOwner() string {
	return RandomString(6)
}

// RandomMoney สุ่มยอดเงินตั้งแต่ min ถึง max
func RandomMoney() int64 {
	return int64(rand.Intn(1000) + 100)
}

// RandomCurrency สุ่มสกุลเงิน
func RandomCurrency() string {
	currencies := []string{"USD", "EUR", "THB"}
	return currencies[rand.Intn(len(currencies))]
}`,
        },

        { t: "h2", c: "4. เขียน Unit Test สำหรับ Create, Get, และ Delete Account" },
        {
          t: "p",
          c: "ดูการนำ `require` และข้อมูลสุ่มมาประกอบกันเป็นชุดทดสอบคุณภาพสูง:",
        },
        {
          t: "code",
          lang: "go",
          label: "db/account_test.go",
          c: `package db

import (
	"context"
	"database/sql"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"simplebank/util"
)

// createRandomAccount เป็น helper function ช่วยสร้างบัญชีสุ่มขึ้นมา 1 บัญชี
func createRandomAccount(t *testing.T) Account {
	arg := CreateAccountParams{
		Owner:    util.RandomOwner(),
		Balance:  util.RandomMoney(),
		Currency: util.RandomCurrency(),
	}

	account, err := testQueries.CreateAccount(context.Background(), arg)
	require.NoError(t, err) // ต้องไม่มี error
	require.NotEmpty(t, account) // ข้อมูลต้องไม่เป็นค่าว่าง

	require.Equal(t, arg.Owner, account.Owner)
	require.Equal(t, arg.Balance, account.Balance)
	require.Equal(t, arg.Currency, account.Currency)

	require.NotZero(t, account.ID) // ID ต้องถูกรันจากฐานข้อมูล
	require.NotZero(t, account.CreatedAt)

	return account
}

func TestCreateAccount(t *testing.T) {
	createRandomAccount(t)
}

func TestGetAccount(t *testing.T) {
	acc1 := createRandomAccount(t)
	acc2, err := testQueries.GetAccount(context.Background(), acc1.ID)

	require.NoError(t, err)
	require.NotEmpty(t, acc2)

	require.Equal(t, acc1.ID, acc2.ID)
	require.Equal(t, acc1.Owner, acc2.Owner)
	require.Equal(t, acc1.Balance, acc2.Balance)
	require.Equal(t, acc1.Currency, acc2.Currency)
	require.WithinDuration(t, acc1.CreatedAt, acc2.CreatedAt, time.Second)
}

func TestDeleteAccount(t *testing.T) {
	acc1 := createRandomAccount(t)
	err := testQueries.DeleteAccount(context.Background(), acc1.ID)
	require.NoError(t, err)

	// เมื่อลบแล้ว พอไปค้นหาอีกรอบ ต้องได้ sql.ErrNoRows กลับมา
	acc2, err := testQueries.GetAccount(context.Background(), acc1.ID)
	require.Error(t, err)
	require.EqualError(t, err, sql.ErrNoRows.Error())
	require.Empty(t, acc2)
}`,
        },
        {
          t: "h3", c: "อธิบายจุดสำคัญในการตรวจสอบ (Assertions)" },
        {
          t: "ul",
          c: [
            "**`require.NoError(t, err)`**: เช็กว่าคำสั่งทำงานสำเร็จ ถ้ามี error เทสต์จะหยุดทันทีพร้อมแสดงสาเหตุ",
            "**`require.WithinDuration(...)`**: วันเวลา `CreatedAt` ที่ผ่านการแปลงไปกลับระหว่าง Go และ PostgreSQL อาจมีความคลาดเคลื่อนในระดับไมโครวินาที การใช้ `WithinDuration(..., time.Second)` ช่วยให้การเทียบเวลาไม่พังจากความละเอียดของนาฬิกา",
            "**`require.EqualError(t, err, sql.ErrNoRows.Error())`**: พิสูจน์ว่าเมื่อลบบัญชีไปแล้ว ฐานข้อมูลต้องคืนข้อผิดพลาด 'ไม่พบแถวข้อมูล' ออกมาจริงๆ ตามที่ควรจะเป็น",
          ],
        },
        {
          t: "codeout",
          lang: "bash",
          label: "คำสั่งรัน Unit Test ใน Terminal และผลลัพธ์ที่ได้",
          code: `go test -v -run TestAccount ./db`,
          out: `=== RUN   TestCreateAccount
--- PASS: TestCreateAccount (0.01s)
=== RUN   TestGetAccount
--- PASS: TestGetAccount (0.01s)
=== RUN   TestDeleteAccount
--- PASS: TestDeleteAccount (0.01s)
PASS
ok      simplebank/db   0.142s`,
        },
      ],
      en: [],
    },
  },

  "bank-concurrency-testing": {
    slug: "bank-concurrency-testing",
    title: {
      th: "ทดสอบ Concurrency & Deadlock ด้วย Goroutines",
      en: "Stress Testing Concurrency & Deadlocks with Goroutines",
    },
    lead: {
      th: "เขียนโค้ด Go จำลองเหตุการณ์ยิงถล่มโอนเงินพร้อมกัน 5-10 คำสั่งขนาน พิสูจน์ Data Consistency และทดสอบว่าระบบทนทานต่อ Deadlock จริง 100%",
      en: "Writing parallel stress tests with goroutines and channels to prove consistency and verify zero deadlocks.",
    },
    group: "5. Automated Testing & Concurrency Test",
    blocks: {
      th: [
        {
          t: "p",
          c: "นี่คือบททดสอบที่สำคัญที่สุดของระบบธนาคาร! Unit Test ปกติจะรันทีละคำสั่งตามลำดับ (Sequential) ซึ่งไม่สามารถตรวจจับ Race Condition หรือ Deadlock ได้เลย เราต้องจำลองสถานการณ์จริงโดยการปล่อย **หลาย Goroutines ยิงคำสั่งโอนเงินเข้าฐานข้อมูลในเสี้ยววินาทีเดียวกัน**",
        },

        { t: "h2", c: "1. การทดสอบการโอนเงินคู่ขนาน (TestTransferTx)" },
        {
          t: "p",
          c: "เราจะปล่อย 5 Goroutines ให้โอนเงินจาก Account 1 ไป Account 2 คนละ 10 บาทพร้อมๆ กัน แล้วส่งผลลัพธ์ผ่าน Channel กลับมารวมที่จุดเดียว:",
        },
        {
          t: "code",
          lang: "go",
          label: "db/store_test.go",
          c: `package db

import (
	"context"
	"fmt"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestTransferTx(t *testing.T) {
	store := NewStore(testDB)

	account1 := createRandomAccount(t)
	account2 := createRandomAccount(t)
	fmt.Println(">> ยอดเงินก่อนโอน:", account1.Balance, account2.Balance)

	// รันการโอนเงินพร้อมกัน 5 ครั้ง ครั้งละ 10 บาท
	n := 5
	amount := int64(10)

	errs := make(chan error)
	results := make(chan TransferTxResult)

	for i := 0; i < n; i++ {
		go func() {
			result, err := store.TransferTx(context.Background(), TransferTxParams{
				FromAccountID: account1.ID,
				ToAccountID:   account2.ID,
				Amount:        amount,
			})

			errs <- err
			results <- result
		}()
	}

	// ตรวจสอบผลลัพธ์จากแต่ละ Goroutine
	existed := make(map[int]bool)
	for i := 0; i < n; i++ {
		err := <-errs
		require.NoError(t, err)

		result := <-results
		require.NotEmpty(t, result)

		// เช็กตาราง Transfer
		transfer := result.Transfer
		require.NotEmpty(t, transfer)
		require.Equal(t, account1.ID, transfer.FromAccountID)
		require.Equal(t, account2.ID, transfer.ToAccountID)
		require.Equal(t, amount, transfer.Amount)
		require.NotZero(t, transfer.ID)

		// เช็ก Entries
		fromEntry := result.FromEntry
		require.NotEmpty(t, fromEntry)
		require.Equal(t, account1.ID, fromEntry.AccountID)
		require.Equal(t, -amount, fromEntry.Amount)

		toEntry := result.ToEntry
		require.NotEmpty(t, toEntry)
		require.Equal(t, account2.ID, toEntry.AccountID)
		require.Equal(t, amount, toEntry.Amount)

		// เช็กการลด/เพิ่มของ Balance ในแต่ละก้าว
		diff1 := account1.Balance - result.FromAccount.Balance
		diff2 := result.ToAccount.Balance - account2.Balance
		require.Equal(t, diff1, diff2)
		require.True(t, diff1 > 0)
		require.True(t, diff1%amount == 0) // ผลต่างต้องหารด้วยจำนวนเงินโอนลงตัว

		k := int(diff1 / amount)
		require.True(t, k >= 1 && k <= n)
		require.NotContains(t, existed, k) // แต่ละรอบ k ต้องไม่ซ้ำกันเด็ดขาด!
		existed[k] = true
	}

	// ตรวจสอบยอดเงินคงเหลือสุดท้ายในฐานข้อมูล
	updatedAccount1, err := testQueries.GetAccount(context.Background(), account1.ID)
	require.NoError(t, err)

	updatedAccount2, err := testQueries.GetAccount(context.Background(), account2.ID)
	require.NoError(t, err)

	fmt.Println(">> ยอดเงินหลังโอน:", updatedAccount1.Balance, updatedAccount2.Balance)
	require.Equal(t, account1.Balance-int64(n)*amount, updatedAccount1.Balance)
	require.Equal(t, account2.Balance+int64(n)*amount, updatedAccount2.Balance)
}`,
        },
        {
          t: "h3", c: "ทำไมการเช็ก `k` ถึงอัจฉริยะมาก?" },
        {
          t: "p",
          c: "ในการโอนเงิน 5 ครั้ง ครั้งละ 10 บาท เงินที่ลดลงในแต่ละรอบต้องเป็น 10, 20, 30, 40, 50 บาทตามลำดับ ดังนั้นตัวแปร `k` (จำนวนรอบที่สะสม) จะต้องครอบคลุมเลข 1 ถึง 5 พอดี หากมีบั๊กเรื่อง Race Condition จะเกิดกรณีที่เงินลดซ้ำยอดเดิม (เช่น มี 2 รอบที่เงินลดลง 20 บาทเท่ากัน) ซึ่งคำสั่ง `require.NotContains(t, existed, k)` จะดักจับได้ทันที!",
        },
        {
          t: "codeout",
          lang: "bash",
          label: "คำสั่งรัน Concurrency Test และ Terminal Output ยอดเงินก่อน/หลังโอน",
          code: `go test -v -run TestTransferTx ./db`,
          out: `=== RUN   TestTransferTx
>> ยอดเงินก่อนโอน: 100 100
>> ยอดเงินหลังโอน: 50 150
--- PASS: TestTransferTx (0.07s)
PASS
ok      simplebank/db   0.198s`,
        },

        { t: "h2", c: "2. การทดสอบปราบ Deadlock ด้วยการโอนสวนทาง (TestTransferTxDeadlock)" },
        {
          t: "p",
          c: "ตอนนี้มาถึงการทดสอบขั้นสุดยอด: เราจะสั่งให้ Account 1 โอนให้ 2 จำนวน 5 ครั้ง พร้อมๆ กับที่ Account 2 โอนกลับคืนให้ 1 อีก 5 ครั้ง ในเสี้ยววินาทีเดียวกัน เพื่อพิสูจน์ว่า Resource Ordering ที่เราเขียนไว้สามารถสยบ Deadlock ได้จริง:",
        },
        {
          t: "code",
          lang: "go",
          label: "db/store_deadlock_test.go",
          c: `func TestTransferTxDeadlock(t *testing.T) {
	store := NewStore(testDB)

	account1 := createRandomAccount(t)
	account2 := createRandomAccount(t)

	n := 10 // ทั้งหมด 10 ธุรกรรม
	amount := int64(10)
	errs := make(chan error)

	for i := 0; i < n; i++ {
		fromAccountID := account1.ID
		toAccountID := account2.ID

		// ครึ่งหนึ่งให้โอนสลับทิศทาง (2 โอนให้ 1)
		if i%2 == 1 {
			fromAccountID = account2.ID
			toAccountID = account1.ID
		}

		go func() {
			_, err := store.TransferTx(context.Background(), TransferTxParams{
				FromAccountID: fromAccountID,
				ToAccountID:   toAccountID,
				Amount:        amount,
			})
			errs <- err
		}()
	}

	// รอรับผลลัพธ์จากทั้ง 10 คำสั่ง
	for i := 0; i < n; i++ {
		err := <-errs
		require.NoError(t, err) // ต้องไม่มี error แม้แต่อันเดียว! ไม่มี Deadlock เกิดขึ้น!
	}

	// ตรวจสอบยอดเงินสุดท้าย: โอนไป 5 ครั้ง โอนกลับ 5 ครั้ง ยอดต้องเท่าเดิมเป๊ะ!
	updatedAccount1, err := testQueries.GetAccount(context.Background(), account1.ID)
	require.NoError(t, err)

	updatedAccount2, err := testQueries.GetAccount(context.Background(), account2.ID)
	require.NoError(t, err)

	require.Equal(t, account1.Balance, updatedAccount1.Balance)
	require.Equal(t, account2.Balance, updatedAccount2.Balance)
}`,
        },
        {
          t: "h2",
          c: "3. คำสั่งรันเทสต์พร้อมเปิด Race Detector",
        },
        {
          t: "p",
          c: "Go มีเครื่องมือในตัวที่ทรงพลังมากชื่อว่า Race Detector ซึ่งสามารถเปิดใช้งานได้ผ่านแฟล็ก `-race`:",
        },
        {
          t: "codeout",
          lang: "bash",
          label: "คำสั่งรัน Concurrency & Deadlock Test พร้อมเปิด Race Detector",
          code: `go test -v -race -run 'TestTransferTx|TestTransferTxDeadlock' ./db`,
          out: `=== RUN   TestTransferTx
>> ยอดเงินก่อนโอน: 100 100
>> ยอดเงินหลังโอน: 50 150
--- PASS: TestTransferTx (0.08s)
=== RUN   TestTransferTxDeadlock
--- PASS: TestTransferTxDeadlock (0.13s)
PASS
ok      simplebank/db   0.452s
(ตรวจไม่พบ Data Race และไม่มีคำสั่งใดติด Deadlock แม้แต่ตัวเดียว)`,
        },
        {
          t: "p",
          c: "ลองเปรียบเทียบกับภาพด้านล่าง หากเราไม่ได้ใช้ Resource Ordering ในการป้องกัน Deadlock เทสต์จะพังลงในทันทีด้วยข้อผิดพลาด SQLSTATE 40P01:",
        },
        {
          t: "codeout",
          lang: "bash",
          label: "เปรียบเทียบผลลัพธ์ใน Terminal กรณีไม่ได้ป้องกัน Deadlock (FAIL)",
          code: `# เมื่อยังไม่ได้ใส่ Resource Ordering (รันโอนเงินสวนทางชนกัน)
go test -v -run TestTransferTxDeadlock ./db`,
          out: `=== RUN   TestTransferTxDeadlock
    store_deadlock_test.go:400: 
        	Error Trace:	store_deadlock_test.go:400
        	Error:      	Received unexpected error:
        	            	pq: deadlock detected (SQLSTATE 40P01)
        	Test:       	TestTransferTxDeadlock
--- FAIL: TestTransferTxDeadlock (0.05s)
FAIL
FAIL	simplebank/db	0.185s`,
        },
      ],
      en: [],
    },
  },
};
