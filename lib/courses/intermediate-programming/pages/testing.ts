import type { Page } from "@/lib/types";

const GROUP = "บทที่ 6: การเขียนเทสต์";

export const testingPages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "test-why": {
    slug: "test-why",
    title: "ทำไมต้องเทสต์ & ประเภทของเทสต์",
    lead: "เทสต์อัตโนมัติคือตาข่ายนิรภัยที่ทำให้คุณกล้าแก้โค้ดโดยไม่กลัวพังโดยไม่รู้ตัว",
    group: GROUP,
    blocks: [
      { t: "p", c: "การเขียนเทสต์เป็นทักษะที่ทำให้โค้ดของคุณเชื่อถือได้และกล้าแก้ไขต่อยอด หัวข้อนี้อธิบายว่าทำไมเทสต์มือ (รันแล้วดูผลเอง) ถึงไม่พอ และประเภทของเทสต์ที่ควรรู้จัก" },

      { t: "h2", c: "ปัญหาของการเทสต์ด้วยมือ" },
      { t: "p", c: "เทสต์มือคือรันโปรแกรมแล้วดูผลด้วยตา — ปัญหาคือทำซ้ำทุกครั้งที่แก้โค้ดไม่ไหว พอโปรเจกต์โต การแก้จุดหนึ่งอาจทำอีกจุดพังโดยไม่รู้ (regression) เทสต์อัตโนมัติรันซ้ำได้ทันทีทุกครั้ง" },
      { t: "code", lang: "python", c: "# เทสต์มือ: รันแล้วเพ่งดูเอง (ทำซ้ำทุกครั้งไม่ไหว)\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))    # ต้องนั่งดูเองว่าได้ 5 ไหม\n\n# เทสต์อัตโนมัติ: assert บอกทันทีถ้าผิด\nassert add(2, 3) == 5\nassert add(-1, 1) == 0\nprint(\"ผ่านทุกเคส\")   # ถ้าไม่ขึ้น = มีเคสพัง" },

      { t: "h2", c: "เทสต์ช่วยอะไร" },
      {
        t: "ul",
        c: [
          "จับ regression — รู้ทันทีถ้าแก้ของใหม่แล้วของเก่าพัง",
          "กล้า refactor — มีตาข่ายรองรับ (เชื่อมบท Clean Code)",
          "เป็นเอกสาร — เทสต์บอกว่าโค้ดควรทำงานยังไง",
          "ออกแบบดีขึ้น — โค้ดที่เทสต์ง่ายมักออกแบบดี",
        ],
      },

      { t: "h2", c: "ประเภทของเทสต์ (Test Pyramid)" },
      { t: "p", c: "เทสต์มีหลายระดับ พีระมิดบอกว่าควรมี unit test เยอะสุด (ฐาน) แล้วลดหลั่นขึ้นไป" },
      {
        t: "table",
        head: ["ระดับ", "ทดสอบอะไร", "ความเร็ว/จำนวน"],
        rows: [
          ["Unit", "ฟังก์ชัน/หน่วยเล็ก ๆ แยกเดี่ยว", "เร็วมาก / เยอะสุด"],
          ["Integration", "หลายส่วนทำงานร่วมกัน (เช่น code + DB)", "ปานกลาง"],
          ["End-to-End (E2E)", "ทั้งระบบเหมือนผู้ใช้จริง", "ช้า / น้อยสุด"],
        ],
      },
      { t: "callout", title: "เทสต์ = ตาข่ายนิรภัย", c: "หัวใจของเทสต์ไม่ใช่ \"พิสูจน์ว่าโค้ดถูก\" แต่คือ \"ทำให้กล้าเปลี่ยนโค้ด\" เพราะถ้าเผลอทำอะไรพัง เทสต์จะร้องทันที คุณจึง refactor และเพิ่มฟีเจอร์ได้อย่างมั่นใจ" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "เทสต์มือทำซ้ำไม่ไหว — เทสต์อัตโนมัติรันซ้ำได้ทุกครั้ง",
          "ช่วยจับ regression, กล้า refactor, เป็นเอกสาร",
          "Test Pyramid: unit (เยอะสุด) > integration > e2e (น้อยสุด)",
          "เป้าหมายหลักคือ \"กล้าเปลี่ยนโค้ดอย่างมั่นใจ\"",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียนฟังก์ชัน is_even(n) แล้วเขียน assert 3 เคสตรวจ  2) จงใจแก้ฟังก์ชันให้ผิดแล้วดูว่า assert จับได้  3) ยกตัวอย่างงานที่ควรเป็น unit test กับงานที่ควรเป็น integration test  4) อธิบายว่าทำไมเทสต์ทำให้กล้า refactor" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: เริ่มต้นกับ pytest →", slug: "test-pytest", desc: "เครื่องมือเทสต์มาตรฐานของ Python" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "test-pytest": {
    slug: "test-pytest",
    title: "เริ่มต้นกับ pytest",
    lead: "เขียนและรันเทสต์อัตโนมัติด้วย pytest — เครื่องมือเทสต์ที่นิยมที่สุดใน Python",
    group: GROUP,
    blocks: [
      { t: "p", c: "pytest คือ framework เทสต์ที่ใช้กันมากที่สุดใน Python จุดเด่นคือเขียนง่าย ใช้ assert ธรรมดา ไม่ต้องจำ method แปลก ๆ หัวข้อนี้พาเขียนเทสต์แรกและรันให้เป็น" },

      { t: "h2", c: "ติดตั้งและกฎการตั้งชื่อ" },
      { t: "code", lang: "bash", c: "pip install pytest" },
      { t: "p", c: "pytest หาเทสต์อัตโนมัติจากชื่อ: ไฟล์ขึ้นต้น test_ หรือลงท้าย _test และฟังก์ชันขึ้นต้น test_" },
      { t: "code", lang: "python", c: "# ไฟล์ mathutils.py\ndef add(a, b):\n    return a + b\n\ndef divide(a, b):\n    return a / b" },
      { t: "code", lang: "python", c: "# ไฟล์ test_mathutils.py\nfrom mathutils import add, divide\n\ndef test_add():\n    assert add(2, 3) == 5\n\ndef test_add_negative():\n    assert add(-1, -1) == -2\n\ndef test_divide():\n    assert divide(10, 2) == 5.0" },

      { t: "h2", c: "รันเทสต์" },
      { t: "code", lang: "bash", c: "pytest                  # รันทุกเทสต์ในโปรเจกต์\npytest test_mathutils.py   # รันไฟล์เดียว\npytest -v               # แสดงรายละเอียดแต่ละเทสต์\npytest -k add           # รันเฉพาะเทสต์ที่ชื่อมี 'add'" },
      { t: "code", lang: "text", c: "test_mathutils.py ...                    [100%]\n3 passed in 0.01s\n\n# ถ้าพัง pytest บอกชัดว่าเคสไหน บรรทัดไหน ค่าที่ได้ vs ที่คาด\n# assert add(2, 3) == 6\n# E  assert 5 == 6" },
      { t: "callout", title: "pytest ใช้ assert ธรรมดา", c: "ต่างจาก framework อื่น (เช่น unittest ที่ต้องใช้ self.assertEqual) pytest ใช้ assert ของ Python ตรง ๆ แล้วมันฉลาดพอจะบอกค่าที่ได้กับค่าที่คาดให้เห็นเมื่อพัง — เขียนง่าย อ่านง่าย" },

      { t: "h2", c: "จัดโครงสร้างเทสต์" },
      { t: "p", c: "นิยมแยกเทสต์ไว้โฟลเดอร์ tests/ (จากบทโครงสร้างโปรเจกต์) แต่ละไฟล์ test_ ทดสอบ module ที่คู่กัน" },
      { t: "code", lang: "text", c: "my-project/\n├── src/myapp/mathutils.py\n└── tests/test_mathutils.py" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "pip install pytest; ตั้งชื่อไฟล์ test_*.py ฟังก์ชัน test_*",
          "ใช้ assert ธรรมดา — pytest บอกค่าที่ได้ vs คาดเมื่อพัง",
          "รันด้วย pytest, -v ละเอียด, -k กรองชื่อ",
          "แยกเทสต์ไว้ tests/ ทดสอบแต่ละ module",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียนฟังก์ชัน + ไฟล์ test_ แล้วรัน pytest ให้ผ่าน  2) เขียนเทสต์ 3 เคส: ปกติ / ขอบ (เช่น 0) / กรณีพิเศษ  3) จงใจทำเทสต์พังแล้วอ่านข้อความ pytest  4) ลอง pytest -v และ -k" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Fixture & Parametrize →", slug: "test-fixtures", desc: "ลดความซ้ำซ้อนและเทสต์หลายเคส" },
          { title: "← ก่อนหน้า: ทำไมต้องเทสต์", slug: "test-why" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "test-fixtures": {
    slug: "test-fixtures",
    title: "Fixture & Parametrize",
    lead: "เตรียมข้อมูลซ้ำ ๆ ด้วย fixture และทดสอบหลายชุดข้อมูลด้วยโค้ดเดียวด้วย parametrize",
    group: GROUP,
    blocks: [
      { t: "p", c: "เมื่อเทสต์หลายตัวต้องการข้อมูลเตรียมเหมือนกัน หรืออยากทดสอบฟังก์ชันเดียวด้วยหลายชุด input pytest มีเครื่องมือ fixture และ parametrize ที่ลดโค้ดซ้ำได้มาก" },

      { t: "h2", c: "fixture — เตรียมของให้เทสต์" },
      { t: "p", c: "fixture คือฟังก์ชันที่เตรียมข้อมูล/สถานะให้เทสต์ใช้ร่วมกัน เทสต์ไหนต้องการก็รับชื่อ fixture เป็นพารามิเตอร์ pytest จะเรียกให้เอง" },
      { t: "code", lang: "python", c: "import pytest\n\n@pytest.fixture\ndef sample_users():\n    return [\n        {\"name\": \"Aph\", \"age\": 25},\n        {\"name\": \"Bee\", \"age\": 30},\n    ]\n\ndef test_count(sample_users):       # รับชื่อ fixture\n    assert len(sample_users) == 2\n\ndef test_first_name(sample_users):  # ใช้ข้อมูลชุดเดียวกัน\n    assert sample_users[0][\"name\"] == \"Aph\"" },

      { t: "h2", c: "parametrize — เทสต์หลายเคสด้วยโค้ดเดียว" },
      { t: "p", c: "แทนที่จะเขียนเทสต์ซ้ำหลายตัวสำหรับหลาย input ใช้ parametrize ใส่ชุด (input, expected) แล้ว pytest รันให้ครบทุกชุด" },
      { t: "code", lang: "python", c: "import pytest\n\ndef is_even(n):\n    return n % 2 == 0\n\n@pytest.mark.parametrize(\"number, expected\", [\n    (2, True),\n    (3, False),\n    (0, True),\n    (-4, True),\n    (7, False),\n])\ndef test_is_even(number, expected):\n    assert is_even(number) == expected\n# รัน 5 เคส จากเทสต์เดียว" },

      { t: "h2", c: "pytest.raises — ทดสอบว่า raise error" },
      { t: "p", c: "บางครั้งพฤติกรรมที่ถูกต้องคือ \"ต้อง raise exception\" ใช้ pytest.raises ตรวจว่าโค้ด raise ตามคาด" },
      { t: "code", lang: "python", c: "import pytest\n\ndef divide(a, b):\n    return a / b\n\ndef test_divide_by_zero():\n    with pytest.raises(ZeroDivisionError):\n        divide(10, 0)        # ถ้าไม่ raise = เทสต์พัง" },
      { t: "callout", title: "parametrize ลดโค้ดมหาศาล", c: "แทนการ copy-paste เทสต์ 5 ตัวที่ต่างกันแค่ตัวเลข ใช้ parametrize เขียนครั้งเดียวรันหลายชุด — เพิ่มเคสใหม่แค่เติมบรรทัดใน list อ่านง่ายและครอบคลุมกว่า" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "fixture เตรียมข้อมูล/สถานะให้เทสต์ใช้ร่วม — รับเป็นพารามิเตอร์",
          "parametrize รันเทสต์เดียวด้วยหลายชุด (input, expected)",
          "pytest.raises ตรวจว่าโค้ด raise exception ตามคาด",
          "ทั้งหมดช่วยลดโค้ดซ้ำและครอบคลุมเคสมากขึ้น",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน fixture เตรียม list ข้อมูลแล้วใช้ใน 2 เทสต์  2) ใช้ parametrize ทดสอบฟังก์ชันด้วย 5 ชุด input/output  3) เขียนเทสต์ที่ตรวจว่าฟังก์ชัน raise ValueError ด้วย pytest.raises  4) เพิ่มเคสใหม่ใน parametrize แล้วรันดู" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Mock & แยก dependency →", slug: "test-mock", desc: "เทสต์โดยไม่ต้องยิง API/แตะ DB จริง" },
          { title: "← ก่อนหน้า: เริ่มต้นกับ pytest", slug: "test-pytest" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "test-mock": {
    slug: "test-mock",
    title: "Mock & แยก dependency",
    lead: "เทสต์โค้ดที่พึ่งของภายนอก (API, DB, เวลา) โดยใช้ของปลอมแทน เพื่อให้เทสต์เร็วและเสถียร",
    group: GROUP,
    blocks: [
      { t: "p", c: "เทสต์ที่ดีต้องเร็วและให้ผลเหมือนเดิมทุกครั้ง แต่ถ้าโค้ดไปยิง API จริงหรือแตะ DB จริง เทสต์จะช้าและไม่เสถียร (เน็ตหลุด, ข้อมูลเปลี่ยน) การ mock คือแทนของภายนอกด้วย \"ของปลอม\" ที่เราคุมได้" },

      { t: "h2", c: "ทำไมต้อง mock" },
      {
        t: "ul",
        c: [
          "เร็ว — ไม่ต้องรอ network จริง",
          "เสถียร — ผลไม่ขึ้นกับเซิร์ฟเวอร์/ข้อมูลภายนอก",
          "ทดสอบเคสยาก — จำลอง error เช่น API ล่ม, timeout ได้",
          "ไม่กระทบของจริง — ไม่เผลอลบข้อมูล/ส่งอีเมลจริงตอนเทสต์",
        ],
      },

      { t: "h2", c: "mock การเรียก API" },
      { t: "p", c: "สมมติฟังก์ชันเราเรียก requests.get ไปดึงข้อมูล เราไม่อยากให้เทสต์ยิงเน็ตจริง จึงแทน requests.get ด้วย mock ที่คืนค่าที่เรากำหนด" },
      { t: "code", lang: "python", c: "# code.py\nimport requests\n\ndef get_user_name(user_id):\n    resp = requests.get(f\"https://api.example.com/users/{user_id}\")\n    return resp.json()[\"name\"]" },
      { t: "code", lang: "python", c: "# test_code.py\nfrom unittest.mock import patch\nfrom code import get_user_name\n\n@patch(\"code.requests.get\")\ndef test_get_user_name(mock_get):\n    # กำหนดให้ของปลอมคืนค่าที่เราต้องการ\n    mock_get.return_value.json.return_value = {\"name\": \"Aph\"}\n\n    assert get_user_name(1) == \"Aph\"   # ไม่ยิงเน็ตจริง\n    mock_get.assert_called_once()      # ตรวจว่าถูกเรียกจริง" },

      { t: "h2", c: "monkeypatch — fixture ของ pytest" },
      { t: "p", c: "pytest มี fixture ชื่อ monkeypatch ใช้แทนค่า/ฟังก์ชันชั่วคราวระหว่างเทสต์ได้ง่าย เช่นแทนค่าเวลาหรือ env var" },
      { t: "code", lang: "python", c: "def get_mode():\n    import os\n    return os.environ.get(\"MODE\", \"dev\")\n\ndef test_get_mode(monkeypatch):\n    monkeypatch.setenv(\"MODE\", \"prod\")   # ตั้ง env ชั่วคราว\n    assert get_mode() == \"prod\"\n    # พ้นเทสต์ค่าคืนเดิมอัตโนมัติ" },
      { t: "callout", title: "เทสต์ที่ยิงเน็ตจริงคือเทสต์ที่ไม่ดี", warn: true, c: "เทสต์ที่ต้องต่อ network/DB จริงจะช้า ล้มเมื่อเน็ตหลุด และอาจกระทบข้อมูลจริง — แยก dependency ภายนอกออกด้วย mock ให้ unit test รันเดี่ยว ๆ เร็วและเสถียร (เก็บการต่อของจริงไว้ที่ integration test จำนวนน้อย)" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "mock = แทนของภายนอก (API/DB/เวลา) ด้วยของปลอมที่คุมได้",
          "ทำให้เทสต์เร็ว เสถียร จำลอง error ได้ ไม่กระทบของจริง",
          "unittest.mock.patch แทนฟังก์ชัน + กำหนด return_value",
          "monkeypatch (pytest) แทนค่า/env ชั่วคราวในเทสต์",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียนฟังก์ชันที่เรียก requests.get แล้ว mock ไม่ให้ยิงเน็ตจริง  2) ใช้ assert_called_once ตรวจว่าถูกเรียก  3) ใช้ monkeypatch.setenv แทน env var ในเทสต์  4) อธิบายว่าทำไมไม่ควรให้ unit test ยิง API จริง" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: TDD & Coverage →", slug: "test-tdd", desc: "เขียนเทสต์ก่อนโค้ด + วัดความครอบคลุม" },
          { title: "← ก่อนหน้า: Fixture & Parametrize", slug: "test-fixtures" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "test-tdd": {
    slug: "test-tdd",
    title: "TDD & Coverage",
    lead: "เขียนเทสต์ก่อนโค้ด (Red → Green → Refactor) และวัดว่าเทสต์ครอบคลุมโค้ดแค่ไหน",
    group: GROUP,
    blocks: [
      { t: "p", c: "Test-Driven Development (TDD) คือแนวทางเขียน \"เทสต์ก่อน\" แล้วค่อยเขียนโค้ดให้ผ่าน ฟังดูกลับด้านแต่ช่วยให้คิดชัดว่าโค้ดควรทำอะไร และได้เทสต์ครบเป็นของแถม" },

      { t: "h2", c: "วงจร TDD: Red → Green → Refactor" },
      {
        t: "ol",
        c: [
          "🔴 Red — เขียนเทสต์สำหรับสิ่งที่ยังไม่มี รันแล้วต้องแดง (พัง) เพราะยังไม่มีโค้ด",
          "🟢 Green — เขียนโค้ดน้อยที่สุดที่ทำให้เทสต์ผ่าน (เขียว)",
          "🔵 Refactor — ปรับโค้ดให้สะอาดขึ้น โดยเทสต์ยังเขียวอยู่",
        ],
      },
      { t: "code", lang: "python", c: "# 1. 🔴 เขียนเทสต์ก่อน (ยังไม่มีฟังก์ชัน is_palindrome)\ndef test_is_palindrome():\n    assert is_palindrome(\"racecar\") is True\n    assert is_palindrome(\"hello\") is False\n    assert is_palindrome(\"\") is True\n\n# 2. 🟢 เขียนโค้ดให้ผ่าน\ndef is_palindrome(s):\n    return s == s[::-1]\n\n# 3. 🔵 refactor ถ้าจำเป็น (เทสต์ยังเขียว = ปลอดภัย)" },
      { t: "callout", title: "ทำไม TDD ช่วย", c: "การเขียนเทสต์ก่อนบังคับให้คุณคิดว่า \"ฟังก์ชันนี้ควรรับอะไร คืนอะไร\" ก่อนลงมือ ทำให้ออกแบบ interface ชัดขึ้น และได้เทสต์ครบโดยไม่ต้องมาตามเขียนทีหลัง (ซึ่งมักถูกข้าม)" },

      { t: "h2", c: "Coverage — วัดความครอบคลุม" },
      { t: "p", c: "coverage บอกว่าเทสต์ของเรา \"แตะ\" โค้ดไปกี่เปอร์เซ็นต์ ช่วยหาส่วนที่ยังไม่มีเทสต์" },
      { t: "code", lang: "bash", c: "pip install pytest-cov\npytest --cov=myapp           # แสดง % coverage\npytest --cov=myapp --cov-report=html   # รายงาน HTML ดูบรรทัดที่ยังไม่ถูกเทสต์" },
      { t: "callout", title: "100% coverage ≠ ไม่มี bug", warn: true, c: "coverage สูงดี แต่ \"แตะโค้ด\" ไม่เท่ากับ \"ทดสอบถูกต้อง\" — อาจรันทุกบรรทัดแต่ไม่ได้ตรวจผลที่สำคัญ เน้นเขียนเทสต์ที่มีความหมาย (เคสปกติ/ขอบ/ผิด) มากกว่าไล่ตัวเลข coverage ให้ครบ 100%" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "TDD: 🔴 เขียนเทสต์ให้พังก่อน → 🟢 เขียนโค้ดให้ผ่าน → 🔵 refactor",
          "เขียนเทสต์ก่อนช่วยออกแบบ interface ชัดและได้เทสต์ครบ",
          "pytest-cov วัด coverage หาส่วนที่ยังไม่มีเทสต์",
          "coverage สูง ≠ ไม่มี bug — เน้นเทสต์ที่มีความหมาย",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ใช้ TDD สร้างฟังก์ชัน count_vowels(s): เขียนเทสต์ให้พังก่อน แล้วค่อยเขียนโค้ด  2) เพิ่มเคสขอบ (string ว่าง, ตัวพิมพ์ใหญ่) แล้วทำให้ผ่าน  3) รัน pytest --cov ดู %  4) อธิบายว่าทำไม 100% coverage ไม่การันตีว่าไม่มี bug" },
      {
        t: "links",
        c: [
          { title: "จบบทที่ 6 แล้ว 🎉 — กลับหน้าภาพรวมคอร์ส", slug: "intermediate", desc: "บทที่ 7: Clean Code & การออกแบบ กำลังจัดทำ" },
          { title: "← ก่อนหน้า: Mock & แยก dependency", slug: "test-mock" },
          { title: "ทบทวน: ทำไมต้องเทสต์ (ต้นบท)", slug: "test-why" },
        ],
      },
    ],
  },
};
