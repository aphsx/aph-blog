import type { Page } from "@/lib/types";

const GROUP = "บทที่ 7: Clean Code & การออกแบบ";

export const cleanCodePages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "clean-naming": {
    slug: "clean-naming",
    title: "Naming, ฟังก์ชันที่ดี & Docstring",
    lead: "เขียนโค้ดให้คน \"อ่าน\" เข้าใจ ไม่ใช่แค่ให้เครื่อง \"รัน\" ได้ — เริ่มที่ชื่อและฟังก์ชัน",
    group: GROUP,
    blocks: [
      { t: "p", c: "โค้ดถูกอ่านบ่อยกว่าถูกเขียนหลายเท่า การตั้งชื่อดีและแบ่งฟังก์ชันให้เหมาะจึงสำคัญมาก หัวข้อนี้คือพื้นฐานของ clean code ที่ส่งผลต่อทุกบรรทัดที่คุณเขียน" },

      { t: "h2", c: "ตั้งชื่อให้สื่อความหมาย" },
      { t: "p", c: "ชื่อที่ดีบอกได้เลยว่าตัวแปร/ฟังก์ชันคืออะไร โดยไม่ต้องเดาหรืออ่านโค้ดข้างใน" },
      { t: "code", lang: "python", c: "# ❌ ต้องเดาว่าอะไรคืออะไร\nd = 86400\nfor x in lst:\n    if x[2] > 18:\n        r.append(x)\n\n# ✅ อ่านแล้วเข้าใจทันที\nSECONDS_PER_DAY = 86400\nfor user in users:\n    if user[\"age\"] > ADULT_AGE:\n        adults.append(user)" },
      { t: "callout", title: "เลี่ยง magic number", c: "ตัวเลขลอย ๆ ในโค้ด (เช่น 18, 86400, 0.07) ทำให้คนอ่านไม่รู้ความหมาย ตั้งเป็นค่าคงที่ชื่อสื่อความหมาย เช่น ADULT_AGE = 18, VAT_RATE = 0.07 แล้วใช้ชื่อแทน" },

      { t: "h2", c: "ฟังก์ชันทำอย่างเดียว (Single Responsibility)" },
      { t: "p", c: "ฟังก์ชันที่ดีทำหน้าที่เดียว สั้น และชื่อบอกชัดว่าทำอะไร ถ้าฟังก์ชันยาวหรือทำหลายเรื่อง ให้แตกเป็นฟังก์ชันย่อย" },
      { t: "code", lang: "python", c: "# ❌ ฟังก์ชันเดียวทำหลายเรื่อง\ndef process(users):\n    for u in users:\n        if \"@\" in u[\"email\"]:        # validate\n            u[\"email\"] = u[\"email\"].lower()   # normalize\n            send_email(u[\"email\"])    # ส่งเมล\n\n# ✅ แตกเป็นฟังก์ชันที่ทำอย่างเดียว ชื่อบอกหน้าที่\ndef is_valid_email(email):\n    return \"@\" in email\n\ndef normalize_email(email):\n    return email.lower()\n\ndef notify_users(users):\n    for u in users:\n        if is_valid_email(u[\"email\"]):\n            send_email(normalize_email(u[\"email\"]))" },

      { t: "h2", c: "Docstring & การอ่าน documentation" },
      { t: "p", c: "docstring คือคำอธิบายฟังก์ชัน/คลาส/โมดูล เขียนในสามเครื่องหมายคำพูด บอกว่าทำอะไร รับอะไร คืนอะไร — เครื่องมือและ help() อ่านได้" },
      { t: "code", lang: "python", c: "def calculate_discount(price, percent):\n    \"\"\"คำนวณราคาหลังหักส่วนลด\n\n    Args:\n        price: ราคาเต็ม (บาท)\n        percent: เปอร์เซ็นต์ส่วนลด (0-100)\n    Returns:\n        ราคาหลังหักส่วนลด\n    \"\"\"\n    return price * (1 - percent / 100)\n\nhelp(calculate_discount)   # แสดง docstring" },
      { t: "callout", title: "ถ้าต้องคอมเมนต์อธิบายว่าโค้ดทำอะไร แปลว่าตั้งชื่อยังไม่ดีพอ", c: "comment ที่ดีอธิบาย \"ทำไม\" (เหตุผล/บริบท) ไม่ใช่ \"อะไร\" (ซึ่งโค้ดที่ตั้งชื่อดีควรบอกเองอยู่แล้ว) ส่วน docstring ใช้บอก contract ของฟังก์ชัน — คนละเรื่องกับ comment อธิบายบรรทัด" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "ตั้งชื่อสื่อความหมาย เลี่ยง magic number (ตั้งเป็นค่าคงที่)",
          "ฟังก์ชันทำอย่างเดียว สั้น ชื่อบอกหน้าที่ — ยาว/หลายเรื่องให้แตกย่อย",
          "docstring บอก contract (ทำอะไร/รับ/คืน); comment บอก \"ทำไม\"",
          "ถ้าต้องคอมเมนต์อธิบายว่าโค้ดทำอะไร = ตั้งชื่อยังไม่ดีพอ",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) refactor โค้ดที่ตั้งชื่อแย่ (a, x, tmp) ให้สื่อความหมาย  2) หา magic number ในโค้ดแล้วตั้งเป็นค่าคงที่  3) แตกฟังก์ชันที่ทำหลายเรื่องเป็นฟังก์ชันย่อย  4) เขียน docstring ให้ฟังก์ชันพร้อม Args/Returns" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: DRY, KISS, YAGNI & Code Smells →", slug: "clean-principles", desc: "หลักการเขียนโค้ดที่ดีและกลิ่นโค้ดเสีย" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "clean-principles": {
    slug: "clean-principles",
    title: "DRY, KISS, YAGNI & Code Smells",
    lead: "หลักการคิดที่ทำให้โค้ดดูแลง่าย และสัญญาณเตือน (code smell) ว่าโค้ดเริ่มมีปัญหา",
    group: GROUP,
    blocks: [
      { t: "p", c: "มีหลักการสั้น ๆ ไม่กี่ข้อที่ช่วยให้ตัดสินใจได้ว่าโค้ดควรเป็นแบบไหน และมี \"กลิ่น\" บางอย่างที่บอกว่าโค้ดกำลังจะมีปัญหา — รู้จักไว้แล้วจะมองโค้ดออกว่าตรงไหนควรปรับ" },

      { t: "h2", c: "DRY — Don't Repeat Yourself" },
      { t: "p", c: "อย่าเขียนตรรกะเดียวกันซ้ำหลายที่ เพราะเวลาแก้ต้องตามแก้ทุกจุด (และมักลืม) ถ้าเห็นโค้ดซ้ำ ให้ดึงเป็นฟังก์ชัน" },
      { t: "code", lang: "python", c: "# ❌ ซ้ำ — แก้สูตรต้องตามแก้ 2 ที่\ntotal_a = price_a + price_a * 0.07\ntotal_b = price_b + price_b * 0.07\n\n# ✅ ดึงเป็นฟังก์ชันเดียว\ndef with_vat(price):\n    return price + price * 0.07\n\ntotal_a = with_vat(price_a)\ntotal_b = with_vat(price_b)" },

      { t: "h2", c: "KISS & YAGNI" },
      {
        t: "table",
        head: ["หลัก", "ย่อมาจาก", "ความหมาย"],
        rows: [
          ["DRY", "Don't Repeat Yourself", "อย่าเขียนซ้ำ ดึงเป็นจุดเดียว"],
          ["KISS", "Keep It Simple, Stupid", "ทำให้เรียบง่ายที่สุดเท่าที่ได้"],
          ["YAGNI", "You Aren't Gonna Need It", "อย่าทำเผื่ออนาคตที่ยังไม่มา"],
        ],
      },
      { t: "callout", title: "over-engineering แย่พอ ๆ กับ under-engineering", warn: true, c: "มือใหม่ที่อยากโชว์มักทำโค้ดซับซ้อนเกินจำเป็น เผื่อเคสที่ไม่มีวันเกิด (ละเมิด KISS/YAGNI) — โค้ดที่เรียบง่ายและแก้ปัญหาตรงหน้าได้ ดีกว่าโค้ดยืดหยุ่นเกินจนไม่มีใครเข้าใจ" },

      { t: "h2", c: "Code Smells — สัญญาณว่าโค้ดเริ่มเสีย" },
      { t: "p", c: "code smell คือลักษณะที่ \"ส่อ\" ว่าโค้ดอาจมีปัญหา ไม่ใช่ bug แต่เป็นสัญญาณว่าควรปรับ:" },
      {
        t: "ul",
        c: [
          "ฟังก์ชันยาวมาก (เกินจอ) — ทำหลายเรื่อง ควรแตก",
          "พารามิเตอร์เยอะเกิน (4-5 ตัวขึ้น) — อาจรวมเป็น object",
          "โค้ดซ้ำหลายที่ — ละเมิด DRY",
          "ชื่อกำกวม (data, temp, info, manager)",
          "comment เยอะผิดปกติ — มักเพราะโค้ดอ่านไม่รู้เรื่อง",
          "nested ลึกหลายชั้น (if ใน if ใน for) — อ่านยาก",
        ],
      },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "DRY: อย่าเขียนตรรกะซ้ำ ดึงเป็นฟังก์ชันเดียว",
          "KISS: เรียบง่ายไว้ก่อน; YAGNI: อย่าทำเผื่ออนาคตที่ยังไม่มา",
          "code smell = สัญญาณเตือน (ฟังก์ชันยาว, พารามิเตอร์เยอะ, ซ้ำ, ชื่อกำกวม, nested ลึก)",
          "over-engineering แย่พอ ๆ กับทำน้อยเกิน",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) หาโค้ดซ้ำในโปรเจกต์เก่าแล้วดึงเป็นฟังก์ชัน (DRY)  2) หา code smell ในโค้ดที่ให้มา 3 จุด  3) ยกตัวอย่างโค้ดที่ over-engineer แล้วทำให้ง่ายลง  4) อธิบาย KISS กับ YAGNI ด้วยคำตัวเอง" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: SOLID 5 ข้อ →", slug: "clean-solid", desc: "หลักการออกแบบ class/module ที่ดี" },
          { title: "← ก่อนหน้า: Naming & Docstring", slug: "clean-naming" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "clean-solid": {
    slug: "clean-solid",
    title: "SOLID 5 ข้อ",
    lead: "หลักการออกแบบ class/module 5 ข้อที่ทำให้โค้ดยืดหยุ่น แก้ง่าย และทดสอบง่าย",
    group: GROUP,
    blocks: [
      { t: "p", c: "SOLID คือชุดหลักการออกแบบ 5 ข้อสำหรับเขียนโค้ดเชิงวัตถุ (OOP) ที่ดูแลและต่อยอดง่าย ไม่ต้องท่องตายตัว แต่เข้าใจแนวคิดแล้วจะออกแบบโค้ดได้ดีขึ้น" },

      { t: "h2", c: "S — Single Responsibility" },
      { t: "p", c: "แต่ละ class ควรมีเหตุผลให้เปลี่ยนแค่เรื่องเดียว (รับผิดชอบเรื่องเดียว)" },
      { t: "code", lang: "python", c: "# ❌ class เดียวทำทั้งคำนวณและบันทึกไฟล์ (2 เหตุผลที่จะเปลี่ยน)\nclass Report:\n    def calculate(self): ...\n    def save_to_file(self): ...\n\n# ✅ แยกความรับผิดชอบ\nclass Report:\n    def calculate(self): ...\n\nclass ReportSaver:\n    def save(self, report): ..." },

      { t: "h2", c: "O — Open/Closed" },
      { t: "p", c: "เปิดให้ \"ขยาย\" (เพิ่มพฤติกรรมใหม่) แต่ปิดการ \"แก้ของเดิม\" — เพิ่มฟีเจอร์โดยไม่ต้องไปรื้อโค้ดที่ทำงานอยู่" },
      { t: "code", lang: "python", c: "# ✅ เพิ่มรูปร่างใหม่ได้โดยไม่แก้โค้ดเดิม\nclass Shape:\n    def area(self): raise NotImplementedError\n\nclass Circle(Shape):\n    def __init__(self, r): self.r = r\n    def area(self): return 3.14159 * self.r ** 2\n\nclass Square(Shape):\n    def __init__(self, s): self.s = s\n    def area(self): return self.s ** 2\n\ndef total_area(shapes):       # ไม่ต้องแก้เมื่อเพิ่มรูปใหม่\n    return sum(s.area() for s in shapes)" },

      { t: "h2", c: "L, I, D โดยย่อ" },
      {
        t: "table",
        head: ["ตัวอักษร", "หลักการ", "ใจความ"],
        rows: [
          ["L", "Liskov Substitution", "subclass ต้องใช้แทน parent ได้โดยไม่พัง"],
          ["I", "Interface Segregation", "อย่าบังคับให้ implement method ที่ไม่ใช้"],
          ["D", "Dependency Inversion", "พึ่ง abstraction ไม่ใช่ implementation ตายตัว"],
        ],
      },
      { t: "code", lang: "python", c: "# D — Dependency Inversion: รับ dependency เข้ามา (ไม่สร้างเองตายตัว)\n# ❌ ผูกกับ implementation\nclass Service:\n    def __init__(self):\n        self.db = MySQLDatabase()    # ผูกตาย\n\n# ✅ รับเข้ามา (inject) — สลับ/mock ได้ง่าย\nclass Service:\n    def __init__(self, db):\n        self.db = db                  # จะเป็น MySQL หรือ mock ก็ได้" },
      { t: "callout", title: "SOLID เป็นแนวทาง ไม่ใช่กฎตายตัว", c: "อย่ายึด SOLID จนทำโค้ดซับซ้อนเกินจำเป็น (ละเมิด KISS/YAGNI) ใช้เมื่อมันแก้ปัญหาจริง โดยเฉพาะ Dependency Inversion ช่วยให้ mock ในเทสต์ได้ง่าย (เชื่อมบท Testing)" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "S: class รับผิดชอบเรื่องเดียว",
          "O: เพิ่มพฤติกรรมใหม่ได้โดยไม่แก้ของเดิม",
          "L: subclass แทน parent ได้; I: อย่าบังคับ method ที่ไม่ใช้",
          "D: พึ่ง abstraction รับ dependency เข้ามา — ทำให้ mock/สลับง่าย",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) หา class ที่ทำหลายหน้าที่แล้วแยกตาม SRP  2) ออกแบบ Shape ที่เพิ่มรูปใหม่ได้โดยไม่แก้ total_area (OCP)  3) แก้ class ที่สร้าง db เองให้รับเข้ามาแทน (DIP)  4) อธิบายว่า DIP ช่วยการเขียนเทสต์อย่างไร" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Refactoring →", slug: "clean-refactor", desc: "ปรับโครงโค้ดให้ดีขึ้นโดยไม่เปลี่ยนพฤติกรรม" },
          { title: "← ก่อนหน้า: DRY, KISS, YAGNI", slug: "clean-principles" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "clean-refactor": {
    slug: "clean-refactor",
    title: "Refactoring",
    lead: "ปรับปรุงโครงสร้างโค้ดให้ดีขึ้นโดยไม่เปลี่ยนพฤติกรรม — ทำได้อย่างปลอดภัยเมื่อมีเทสต์",
    group: GROUP,
    blocks: [
      { t: "p", c: "refactoring คือการปรับโครงโค้ดให้สะอาด/อ่านง่ายขึ้น โดย \"พฤติกรรมเหมือนเดิม\" ผลลัพธ์ไม่เปลี่ยน เป็นการลงทุนเพื่อให้แก้ต่อง่ายในอนาคต และทำได้อย่างมั่นใจเมื่อมีเทสต์รองรับ" },

      { t: "h2", c: "refactor ต้องมีเทสต์ก่อน" },
      { t: "p", c: "ก่อนปรับโครงสร้าง ต้องมีเทสต์ที่ยืนยันว่าโค้ดทำงานถูก (จากบท Testing) เพื่อให้รู้ทันทีว่าการปรับทำให้พฤติกรรมเปลี่ยนหรือไม่ — refactor โดยไม่มีเทสต์คือเดินบนเส้นลวดไม่มีตาข่าย" },

      { t: "h2", c: "Guard Clause — ลด nesting" },
      { t: "p", c: "เทคนิคที่ใช้บ่อยสุด: เช็คเงื่อนไขที่ไม่ผ่านแล้ว return ออกก่อน (early return) แทนการห่อทุกอย่างใน if ลึก ๆ" },
      { t: "code", lang: "python", c: "# ❌ nested ลึก อ่านยาก\ndef get_discount(user):\n    if user is not None:\n        if user.is_active:\n            if user.is_member:\n                return 0.1\n            else:\n                return 0.05\n    return 0\n\n# ✅ guard clause: จัดการเคสที่ไม่ผ่านก่อน แล้วโฟลว์หลักแบนราบ\ndef get_discount(user):\n    if user is None:\n        return 0\n    if not user.is_active:\n        return 0\n    if user.is_member:\n        return 0.1\n    return 0.05" },

      { t: "h2", c: "Extract Function / Variable" },
      { t: "p", c: "ดึงโค้ดที่ซับซ้อนหรือซ้ำออกเป็นฟังก์ชัน/ตัวแปรที่มีชื่อ ทำให้อ่านเข้าใจขึ้นทันที" },
      { t: "code", lang: "python", c: "# ❌ เงื่อนไขซับซ้อนอ่านยาก\nif user.age >= 18 and user.country == \"TH\" and user.verified:\n    approve()\n\n# ✅ extract เป็นตัวแปร/ฟังก์ชันที่มีชื่อ\ndef is_eligible(user):\n    return user.age >= 18 and user.country == \"TH\" and user.verified\n\nif is_eligible(user):\n    approve()" },

      { t: "h2", c: "เทคนิค refactor ที่ใช้บ่อย" },
      {
        t: "ul",
        c: [
          "Extract Function — ดึงโค้ดเป็นฟังก์ชันที่มีชื่อ",
          "Extract Variable — ตั้งชื่อให้นิพจน์ซับซ้อน",
          "Rename — เปลี่ยนชื่อให้สื่อความหมาย",
          "Guard Clause — early return ลด nesting",
          "Replace Magic Number — ใช้ค่าคงที่แทนตัวเลขลอย",
        ],
      },
      { t: "callout", title: "refactor ทีละขั้น + รันเทสต์", c: "อย่า refactor หลายอย่างรวดเดียว — ปรับทีละขั้นเล็ก ๆ แล้วรันเทสต์ยืนยันว่ายังเขียว ถ้าพังจะรู้ทันทีว่าขั้นไหนทำพัง (เชื่อมกลยุทธ์ debug บท 3: แก้ทีละอย่าง)" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "refactor = ปรับโครงให้ดีขึ้น พฤติกรรมเหมือนเดิม",
          "ต้องมีเทสต์ก่อนเสมอ — เป็นตาข่ายว่าไม่ทำพฤติกรรมพัง",
          "guard clause (early return) ลด nesting ให้อ่านง่าย",
          "extract function/variable, rename — ปรับทีละขั้นแล้วรันเทสต์",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) refactor ฟังก์ชันที่ if ซ้อนลึกด้วย guard clause  2) extract เงื่อนไขซับซ้อนเป็นฟังก์ชันที่มีชื่อ  3) หาโค้ดที่ตั้งชื่อแย่แล้ว rename  4) อธิบายว่าทำไมต้องมีเทสต์ก่อน refactor" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Design Patterns พื้นฐาน →", slug: "clean-patterns", desc: "วิธีแก้ปัญหาที่เจอซ้ำ ๆ แบบมีแบบแผน" },
          { title: "← ก่อนหน้า: SOLID 5 ข้อ", slug: "clean-solid" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "clean-patterns": {
    slug: "clean-patterns",
    title: "Design Patterns พื้นฐาน",
    lead: "วิธีแก้ปัญหาการออกแบบที่เจอซ้ำ ๆ แบบมีแบบแผน — รู้จักไว้และใช้เมื่อมันแก้ปัญหาจริง",
    group: GROUP,
    blocks: [
      { t: "p", c: "design pattern คือ \"สูตรสำเร็จ\" ของวิธีแก้ปัญหาการออกแบบที่เจอบ่อย ๆ ทำให้สื่อสารกับเพื่อนร่วมทีมได้ด้วยชื่อที่เข้าใจตรงกัน หัวข้อนี้แนะนำ pattern ที่เจอบ่อยพอให้รู้จัก ไม่ใช่ท่องทุกตัว" },

      { t: "h2", c: "Strategy — สลับวิธีทำงานได้" },
      { t: "p", c: "เมื่อมีหลายวิธีทำงานเดียวกัน (เช่นหลายวิธีคำนวณค่าส่ง) ทำให้สลับได้โดยไม่ต้องเขียน if ยาว ๆ" },
      { t: "code", lang: "python", c: "# แต่ละวิธีส่งเป็นฟังก์ชัน แล้วเลือกใช้\ndef standard_shipping(weight): return weight * 10\ndef express_shipping(weight): return weight * 25\n\ndef checkout(weight, shipping_strategy):\n    return shipping_strategy(weight)    # สลับวิธีได้\n\nprint(checkout(2, standard_shipping))   # 20\nprint(checkout(2, express_shipping))    # 50" },

      { t: "h2", c: "Factory — รวมที่สร้าง object ไว้จุดเดียว" },
      { t: "p", c: "เมื่อต้องสร้าง object ต่างชนิดตามเงื่อนไข ใช้ factory function รวมตรรกะการสร้างไว้ที่เดียว" },
      { t: "code", lang: "python", c: "def create_notifier(kind):\n    if kind == \"email\":\n        return EmailNotifier()\n    elif kind == \"sms\":\n        return SMSNotifier()\n    raise ValueError(f\"ไม่รู้จัก: {kind}\")\n\nnotifier = create_notifier(\"email\")   # ผู้เรียกไม่ต้องรู้ว่าสร้างยังไง" },

      { t: "h2", c: "Observer & Singleton (รู้จักไว้)" },
      {
        t: "table",
        head: ["Pattern", "แก้ปัญหา", "ตัวอย่างที่เจอ"],
        rows: [
          ["Strategy", "สลับ algorithm ได้", "วิธีคำนวณ/เรียงลำดับหลายแบบ"],
          ["Factory", "รวมการสร้าง object", "สร้าง object ตาม config/type"],
          ["Observer", "แจ้งเตือนเมื่อมีการเปลี่ยน", "event, subscribe/publish"],
          ["Singleton", "มี instance เดียวทั้งระบบ", "config, connection pool"],
        ],
      },
      { t: "callout", title: "อย่ายัด pattern เพราะอยากใช้", warn: true, c: "pattern เป็นเครื่องมือแก้ปัญหา ไม่ใช่เป้าหมาย — มือใหม่มักยัด pattern ใส่โค้ดง่าย ๆ จนซับซ้อนเกิน (ละเมิด KISS) ใช้เมื่อเจอปัญหาที่ pattern นั้นแก้จริงเท่านั้น หลายครั้งฟังก์ชันธรรมดาก็พอแล้ว" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "design pattern = สูตรแก้ปัญหาออกแบบที่เจอซ้ำ + ภาษากลางในทีม",
          "Strategy: สลับวิธีทำงาน; Factory: รวมการสร้าง object",
          "Observer: แจ้งเตือนการเปลี่ยน; Singleton: instance เดียว",
          "ใช้เมื่อแก้ปัญหาจริง — อย่ายัดจนซับซ้อนเกิน (KISS)",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ใช้ Strategy เลือกวิธีคำนวณค่าส่ง 2-3 แบบ  2) เขียน factory function สร้าง object ตาม type  3) ยกตัวอย่างสถานการณ์จริงที่เหมาะกับ Singleton  4) อธิบายว่าทำไมการยัด pattern เกินจำเป็นเป็นปัญหา" },
      {
        t: "links",
        c: [
          { title: "จบบทที่ 7 แล้ว 🎉 — กลับหน้าภาพรวมคอร์ส", slug: "intermediate", desc: "บทที่ 8: ทำงานกับข้อมูลจริง กำลังจัดทำ" },
          { title: "← ก่อนหน้า: Refactoring", slug: "clean-refactor" },
          { title: "ทบทวน: Naming & Docstring (ต้นบท)", slug: "clean-naming" },
        ],
      },
    ],
  },
};
