import type { Page } from "@/lib/types";

const GROUP = "บทที่ 2: Error handling & โค้ดที่แข็งแรง";

export const robustCodePages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "err-exceptions": {
    slug: "err-exceptions",
    title: { th: "Exception เจาะลึก", en: "" },
    lead: { th: "จัดการข้อผิดพลาดให้ถูกวิธีด้วย try/except/else/finally — ไม่ใช่แค่ครอบ try กว้าง ๆ แล้วเงียบ", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "โปรแกรมจริงต้องเจอสถานการณ์ที่ผิดพลาด: ไฟล์ไม่มี, ผู้ใช้กรอกผิด, เน็ตหลุด การจัดการ exception ที่ดีทำให้โค้ด \"พังอย่างสง่างาม\" บอกได้ว่าพังเพราะอะไร แทนที่จะ crash เงียบ ๆ หรือกลืน error จนหา bug ไม่เจอ" },
        { t: "callout", title: "ทบทวนจากคอร์สพื้นฐาน", c: "คุณเคยเห็น try/except มาแล้ว หัวข้อนี้ลงลึกกว่า: จับเฉพาะชนิด, ลำดับ else/finally, exception hierarchy และวิธีที่มืออาชีพใช้จริง" },

        { t: "h2", c: "โครงสร้างเต็ม: try / except / else / finally" },
        { t: "p", c: "ทั้ง 4 ส่วนมีหน้าที่ต่างกันชัดเจน — try คือโค้ดเสี่ยง, except จับเมื่อพัง, else รันเมื่อไม่พัง, finally รันเสมอ" },
        { t: "code", lang: "python", c: "try:\n    x = int(input(\"กรอกเลข: \"))   # โค้ดที่อาจพัง\nexcept ValueError:\n    print(\"นั่นไม่ใช่เลข\")        # ทำเมื่อเกิด ValueError\nelse:\n    print(f\"ดีมาก ได้ {x}\")        # ทำเมื่อ try ไม่พัง\nfinally:\n    print(\"จบการทำงาน\")            # ทำเสมอ ไม่ว่าพังหรือไม่" },
        {
          t: "table",
          head: ["ส่วน", "ทำงานเมื่อ", "ใช้ทำ"],
          rows: [
            ["try", "เริ่มเสมอ", "โค้ดที่อาจเกิด error"],
            ["except", "เกิด error ตรงชนิด", "จัดการ error"],
            ["else", "try สำเร็จ ไม่พัง", "โค้ดต่อที่ขึ้นกับ try สำเร็จ"],
            ["finally", "เสมอ (พังหรือไม่ก็ตาม)", "คืน resource / ปิดของ"],
          ],
        },

        { t: "h2", c: "จับเฉพาะชนิด — อย่าจับกว้างเกินไป" },
        { t: "p", c: "จับ exception ให้ตรงชนิดที่คาดไว้ และเก็บตัว exception ด้วย as เพื่อดูรายละเอียด จับหลายชนิดได้ทั้งแบบแยกและรวม" },
        { t: "code", lang: "python", c: "def divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        print(\"หารด้วยศูนย์ไม่ได้\")\n    except TypeError as e:\n        print(f\"ชนิดข้อมูลผิด: {e}\")\n\n# จับหลายชนิดพร้อมกันด้วย tuple\ntry:\n    risky()\nexcept (ValueError, KeyError) as e:\n    print(f\"เกิดข้อผิดพลาด: {e}\")" },

        { t: "h2", c: "Exception Hierarchy" },
        { t: "p", c: "exception ทุกตัวสืบทอดจาก Exception การจับ exception แม่จะจับลูกทั้งหมดด้วย — มีประโยชน์แต่ต้องระวังไม่ให้กว้างเกิน" },
        { t: "code", lang: "python", c: "# ValueError และ KeyError เป็นลูกของ Exception\n# จับ Exception = จับเกือบทุกอย่าง (กว้างมาก ใช้เท่าที่จำเป็น)\ntry:\n    risky()\nexcept Exception as e:\n    print(f\"ผิดพลาด: {type(e).__name__}: {e}\")\n    # log ไว้แล้วอาจ re-raise ต่อ\n    raise          # โยน exception เดิมต่อ (re-raise)" },

        { t: "callout", title: "ห้าม: except เปล่า ๆ", warn: true, c: "อย่าเขียน except: เปล่า ๆ หรือ except Exception แล้ว pass เฉย ๆ เพราะมันกลืน error ทุกอย่างรวมถึง bug ของเราเอง ทำให้โปรแกรมผิดแบบเงียบ ๆ หา bug ไม่เจอ — จับให้ตรงชนิด และอย่างน้อยต้อง log" },
        { t: "code", lang: "python", c: "# ❌ ห้ามทำ: กลืนทุก error เงียบ ๆ\ntry:\n    do_something()\nexcept:\n    pass        # bug ซ่อนอยู่ตรงนี้ไม่มีวันเจอ\n\n# ✅ จับตรงชนิด + จัดการชัดเจน\ntry:\n    do_something()\nexcept FileNotFoundError as e:\n    print(f\"ไม่พบไฟล์: {e}\")" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "try (เสี่ยง) / except (จับ) / else (สำเร็จ) / finally (เสมอ)",
            "จับเฉพาะชนิดที่คาดไว้ เก็บด้วย as e เพื่อดูรายละเอียด",
            "exception สืบทอดกัน — จับแม่ = จับลูกทั้งหมด",
            "ห้าม except เปล่าหรือ pass เงียบ ๆ — มันซ่อน bug",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) เขียนฟังก์ชันหารที่จัดการทั้ง ZeroDivisionError และ TypeError  2) เขียนโค้ดอ่านเลขจาก input ที่ใช้ครบ try/except/else/finally  3) ลองจับ (ValueError, KeyError) ด้วย tuple เดียว  4) อธิบายว่าทำไม except: pass เป็นอันตราย" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: สร้าง Exception เอง & raise →", slug: "err-custom", desc: "นิยาม error ของตัวเองให้สื่อความหมาย" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "err-custom": {
    slug: "err-custom",
    title: { th: "สร้าง Exception เอง & raise", en: "" },
    lead: { th: "นิยามข้อผิดพลาดของโดเมนงานเอง เพื่อให้ผู้เรียกจับและจัดการได้ตรงจุด", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "บางครั้ง error ที่มีอยู่ใน Python ไม่สื่อความหมายของปัญหาในงานเรา เช่น \"เงินไม่พอ\" หรือ \"อายุไม่ถึง\" การสร้าง exception ของตัวเองทำให้โค้ดอ่านง่ายและให้ผู้เรียกจับเฉพาะ error ของเราได้" },

        { t: "h2", c: "raise — โยน exception ออกมาเอง" },
        { t: "p", c: "เมื่อเจอสถานการณ์ที่ไม่ควรดำเนินต่อ ให้ raise เพื่อหยุดและส่งสัญญาณว่าเกิดอะไร แทนที่จะคืนค่าแปลก ๆ เช่น -1 หรือ None ที่ผู้เรียกอาจลืมเช็ค" },
        { t: "code", lang: "python", c: "def set_age(age):\n    if age < 0:\n        raise ValueError(f\"อายุติดลบไม่ได้: {age}\")\n    return age\n\nset_age(-5)   # ValueError: อายุติดลบไม่ได้: -5" },

        { t: "h2", c: "สร้าง custom exception class" },
        { t: "p", c: "สร้างคลาสที่สืบทอดจาก Exception ก็ได้ exception ใหม่แล้ว ตั้งชื่อให้สื่อความหมาย ลงท้ายด้วย Error ตามธรรมเนียม" },
        { t: "code", lang: "python", c: "class InsufficientFundsError(Exception):\n    \"\"\"ยอดเงินไม่พอสำหรับการถอน\"\"\"\n    pass\n\nclass Account:\n    def __init__(self, balance):\n        self.balance = balance\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            raise InsufficientFundsError(\n                f\"ถอน {amount} ไม่ได้ มีแค่ {self.balance}\"\n            )\n        self.balance -= amount\n        return self.balance\n\nacc = Account(100)\ntry:\n    acc.withdraw(500)\nexcept InsufficientFundsError as e:\n    print(f\"ถอนไม่สำเร็จ: {e}\")   # จับเฉพาะ error ของเรา" },
        { t: "callout", title: "ทำไมไม่ใช้ ValueError เฉย ๆ", c: "custom exception ทำให้ผู้เรียกจับเฉพาะปัญหาของโดเมนได้ (เช่น except InsufficientFundsError) แยกออกจาก ValueError ทั่วไป โค้ดสื่อความหมายขึ้น และเพิ่มข้อมูลในคลาสได้ภายหลัง" },

        { t: "h2", c: "เก็บข้อมูลเพิ่มใน exception" },
        { t: "code", lang: "python", c: "class ValidationError(Exception):\n    def __init__(self, field, message):\n        self.field = field            # เก็บว่า field ไหนผิด\n        super().__init__(f\"{field}: {message}\")\n\ntry:\n    raise ValidationError(\"email\", \"รูปแบบไม่ถูกต้อง\")\nexcept ValidationError as e:\n    print(e.field)    # email  (เข้าถึงข้อมูลเพิ่มได้)\n    print(e)          # email: รูปแบบไม่ถูกต้อง" },

        { t: "h2", c: "Exception Chaining (raise ... from ...)" },
        { t: "p", c: "เมื่อจับ error หนึ่งแล้วโยน error อีกตัว ใช้ from เพื่อบอกที่มา ทำให้ traceback แสดงต้นตอเดิมด้วย — ดีต่อการ debug (เจอใน traceback บทถัดไป)" },
        { t: "code", lang: "python", c: "def load_config(path):\n    try:\n        with open(path) as f:\n            return f.read()\n    except FileNotFoundError as e:\n        raise RuntimeError(\"โหลด config ไม่ได้\") from e\n        # traceback จะแสดงทั้ง RuntimeError และต้นตอ FileNotFoundError" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "raise หยุดและส่งสัญญาณข้อผิดพลาด ดีกว่าคืนค่าแปลก ๆ ที่อาจลืมเช็ค",
            "custom exception = class สืบจาก Exception ตั้งชื่อลงท้าย Error",
            "เก็บข้อมูลเพิ่มใน exception ได้ผ่าน __init__",
            "raise ... from ... ระบุที่มา ช่วย debug",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง custom exception ชื่อ AgeTooYoungError แล้วใช้ในฟังก์ชันสมัครสมาชิก (ต้องอายุ >= 18)  2) เพิ่มข้อมูล field ใน ValidationError  3) เขียนฟังก์ชันโหลดไฟล์ที่ใช้ raise ... from ...  4) อธิบายข้อดีของ custom exception เทียบกับ ValueError ทั่วไป" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: Logging →", slug: "err-logging", desc: "เลิก print debug — ใช้ logging แบบมืออาชีพ" },
            { title: "← ก่อนหน้า: Exception เจาะลึก", slug: "err-exceptions" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "err-logging": {
    slug: "err-logging",
    title: { th: "Logging (เลิก print debug)", en: "" },
    lead: { th: "บันทึกสิ่งที่โปรแกรมทำด้วย logging — ควบคุมระดับ เปิด/ปิด และเขียนลงไฟล์ได้ ต่างจาก print", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "มือใหม่ debug ด้วย print() แล้วลบทิ้งทีหลัง แต่ในงานจริงเราต้องการบันทึกถาวรที่เปิด/ปิด/กรองระดับได้ และเขียนลงไฟล์ในระบบ production — นั่นคือหน้าที่ของโมดูล logging" },

        { t: "h2", c: "ทำไม print ไม่พอ" },
        {
          t: "table",
          head: ["ประเด็น", "print", "logging"],
          rows: [
            ["ระดับความสำคัญ", "ไม่มี", "DEBUG/INFO/WARNING/ERROR/CRITICAL"],
            ["เปิด/ปิดได้", "ต้องลบโค้ด", "ปรับ level ทีเดียว"],
            ["เขียนลงไฟล์", "ต้องเขียนเอง", "ตั้งค่าได้"],
            ["บอกเวลา/ที่มา", "ไม่มี", "ใส่ใน format ได้"],
          ],
        },

        { t: "h2", c: "ระดับของ log (Levels)" },
        { t: "p", c: "log มี 5 ระดับเรียงตามความรุนแรง การตั้ง level = X หมายถึงแสดงตั้งแต่ X ขึ้นไป (ต่ำกว่านั้นถูกซ่อน)" },
        { t: "code", lang: "python", c: "import logging\n\nlogging.basicConfig(level=logging.DEBUG)  # แสดงตั้งแต่ DEBUG ขึ้นไป\n\nlogging.debug(\"รายละเอียดสำหรับ debug\")     # ละเอียดสุด\nlogging.info(\"เหตุการณ์ปกติ เช่น เริ่มทำงาน\")\nlogging.warning(\"เตือน แต่ยังทำงานต่อได้\")\nlogging.error(\"เกิดข้อผิดพลาด\")\nlogging.critical(\"ร้ายแรง ระบบอาจล่ม\")" },
        {
          t: "table",
          head: ["Level", "ใช้เมื่อ"],
          rows: [
            ["DEBUG", "ข้อมูลละเอียดตอนพัฒนา/หา bug"],
            ["INFO", "เหตุการณ์ปกติ (เริ่ม/จบงาน)"],
            ["WARNING", "ผิดปกติแต่ยังไปต่อได้"],
            ["ERROR", "ทำงานส่วนนั้นไม่สำเร็จ"],
            ["CRITICAL", "ร้ายแรง ระบบอาจหยุด"],
          ],
        },

        { t: "h2", c: "ตั้งค่า format และเขียนลงไฟล์" },
        { t: "code", lang: "python", c: "import logging\n\nlogging.basicConfig(\n    level=logging.INFO,\n    format=\"%(asctime)s [%(levelname)s] %(name)s: %(message)s\",\n    filename=\"app.log\",       # เขียนลงไฟล์ (ตัดออก = ขึ้นจอ)\n)\n\nlogging.info(\"ระบบเริ่มทำงาน\")\n# 2026-06-01 10:00:00,123 [INFO] root: ระบบเริ่มทำงาน" },

        { t: "h2", c: "logger ต่อ module + log exception" },
        { t: "p", c: "งานจริงสร้าง logger ต่อไฟล์ด้วย getLogger(__name__) เพื่อรู้ว่า log มาจากไหน และใช้ logging.exception ในบล็อก except เพื่อบันทึก traceback อัตโนมัติ" },
        { t: "code", lang: "python", c: "import logging\nlogger = logging.getLogger(__name__)   # logger ประจำ module นี้\n\ndef process(data):\n    try:\n        return 100 / data\n    except ZeroDivisionError:\n        logger.exception(\"process ล้มเหลว\")   # log พร้อม traceback\n        raise" },
        { t: "callout", title: "logging.exception ใช้ในบล็อก except เท่านั้น", c: "logger.exception() จะแนบ traceback ของ error ปัจจุบันให้อัตโนมัติ — เรียกได้เฉพาะตอนอยู่ใน except เท่านั้น นอกบล็อกใช้ logger.error() แทน" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "logging แทน print: ควบคุม level, เปิด/ปิด, เขียนลงไฟล์ได้",
            "5 levels: DEBUG < INFO < WARNING < ERROR < CRITICAL",
            "ตั้ง level = X แสดงตั้งแต่ X ขึ้นไป; ตั้ง format ใส่เวลา/ที่มา",
            "getLogger(__name__) ต่อ module; logger.exception() log traceback ใน except",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) ตั้งค่า logging ให้แสดงตั้งแต่ INFO พร้อมเวลา  2) แปลงสคริปต์ที่ใช้ print debug ให้ใช้ logging แทน  3) เขียนฟังก์ชันที่ใช้ logger.exception() ในบล็อก except  4) ลองเปลี่ยน level เป็น WARNING แล้วสังเกตว่า debug/info หายไป" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: Type Hints & mypy →", slug: "err-typing", desc: "บอกชนิดข้อมูลให้เครื่องมือช่วยจับ bug" },
            { title: "← ก่อนหน้า: สร้าง Exception เอง", slug: "err-custom" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "err-typing": {
    slug: "err-typing",
    title: { th: "Type Hints & mypy", en: "" },
    lead: { th: "บอกชนิดข้อมูลในโค้ดเพื่อให้ editor และเครื่องมือช่วยจับ bug ก่อนรัน — มาตรฐานทีมสมัยใหม่", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "Python ไม่บังคับประกาศชนิดข้อมูล แต่ type hint ให้เรา \"เขียนบอก\" ได้ว่าตัวแปร/พารามิเตอร์/ค่าคืนเป็นชนิดอะไร มันไม่บังคับตอนรัน แต่ช่วยให้ editor autocomplete แม่นและเครื่องมืออย่าง mypy จับ bug ได้ก่อนโปรแกรมรันจริง" },

        { t: "h2", c: "type hint พื้นฐาน" },
        { t: "code", lang: "python", c: "def greet(name: str, times: int = 1) -> str:\n    return (f\"สวัสดี {name} \") * times\n\nage: int = 25\nprice: float = 19.99\nis_active: bool = True\n\n# hint ไม่บังคับตอนรัน — ใส่ผิดชนิดก็ยังรันได้\n# แต่ mypy/editor จะเตือน" },
        { t: "p", c: "อ่านว่า: name เป็น str, times เป็น int (default 1), ฟังก์ชันคืน str (-> str)" },

        { t: "h2", c: "ชนิดของ collection" },
        { t: "code", lang: "python", c: "# Python 3.9+ ใช้ตัวพิมพ์เล็กได้เลย\nnames: list[str] = [\"Aph\", \"Bee\"]\nscores: dict[str, int] = {\"Aph\": 90}\ncoords: tuple[int, int] = (3, 4)\n\ndef average(nums: list[float]) -> float:\n    return sum(nums) / len(nums)" },

        { t: "h2", c: "ค่าที่อาจเป็น None (Optional)" },
        { t: "p", c: "ถ้าค่าอาจเป็นชนิดหนึ่งหรือ None ใช้ X | None (สมัยใหม่) หรือ Optional[X] — บอกชัดว่าต้องเช็ค None ก่อนใช้" },
        { t: "code", lang: "python", c: "def find_user(user_id: int) -> str | None:\n    users = {1: \"Aph\", 2: \"Bee\"}\n    return users.get(user_id)    # คืน str หรือ None\n\nname = find_user(99)\nif name is not None:             # ต้องเช็คก่อนใช้\n    print(name.upper())" },

        { t: "h2", c: "dataclass — class สำหรับเก็บข้อมูล" },
        { t: "p", c: "ถ้าต้องการ class ที่มีแต่ข้อมูล @dataclass สร้าง __init__, __repr__, การเปรียบเทียบให้อัตโนมัติ พร้อมใช้ type hint เต็ม — สั้นและชัด" },
        { t: "code", lang: "python", c: "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\np = Point(3, 4)\nprint(p)            # Point(x=3, y=4)  (__repr__ ให้ฟรี)\nprint(p.x + p.y)    # 7\nprint(p == Point(3, 4))   # True  (เทียบค่าให้ฟรี)" },

        { t: "h2", c: "ตรวจด้วย mypy" },
        { t: "p", c: "mypy คือเครื่องมือที่อ่าน type hint แล้วเตือน bug เรื่องชนิดก่อนรันโปรแกรม" },
        { t: "code", lang: "bash", c: "pip install mypy\nmypy myfile.py\n# error: Argument 1 to \"greet\" has incompatible type \"int\"; expected \"str\"" },
        { t: "callout", title: "type hint คุ้มค่าตรงไหน", c: "ในโปรเจกต์เล็กอาจไม่เห็นผลชัด แต่พอโค้ดใหญ่/ทำงานเป็นทีม type hint ช่วยมหาศาล: autocomplete แม่นขึ้น, จับ bug ก่อนรัน, และเป็นเอกสารในตัว FastAPI (บท Web) ใช้ type hint สร้าง validation + docs อัตโนมัติด้วย" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "type hint บอกชนิด: name: str, -> int — ไม่บังคับตอนรันแต่ช่วยมาก",
            "collection: list[str], dict[str, int], tuple[int, int]",
            "ค่าที่อาจเป็น None: X | None แล้วต้องเช็คก่อนใช้",
            "@dataclass สร้าง __init__/__repr__/เทียบค่าให้; mypy ตรวจชนิดก่อนรัน",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) ใส่ type hint เต็มให้ฟังก์ชัน average(nums) -> float  2) เขียนฟังก์ชันที่คืน str | None แล้วเช็ค None ก่อนใช้  3) แปลง class ที่มีแต่ข้อมูลให้เป็น @dataclass  4) ติดตั้ง mypy แล้วลองรันกับไฟล์ที่จงใจใส่ชนิดผิด" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: Defensive Programming →", slug: "err-defensive", desc: "ตรวจ input ที่ขอบระบบ ป้องกันก่อนพัง" },
            { title: "← ก่อนหน้า: Logging", slug: "err-logging" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "err-defensive": {
    slug: "err-defensive",
    title: { th: "Defensive Programming", en: "" },
    lead: { th: "ตรวจสอบ input ที่ขอบระบบและเขียนโค้ดที่ \"พังเร็ว พังชัด\" แทนที่จะคำนวณผิดเงียบ ๆ", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "defensive programming คือการคิดล่วงหน้าว่า \"อะไรพังได้บ้าง\" แล้วป้องกันไว้ที่จุดที่ข้อมูลเข้าระบบ หลักการคือ fail fast — ถ้าข้อมูลผิดให้หยุดทันทีที่จุดเกิดเหตุ ดีกว่าปล่อยให้ค่าผิดไหลไปพังที่อื่นซึ่งหายากกว่า" },

        { t: "h2", c: "ตรวจ input ที่ขอบระบบ (validate)" },
        { t: "p", c: "ข้อมูลจากภายนอก (ผู้ใช้, ไฟล์, API) เชื่อถือไม่ได้ ให้ตรวจที่จุดรับเข้าก่อนนำไปใช้ — ภายในระบบที่ตรวจแล้วค่อยไว้ใจได้" },
        { t: "code", lang: "python", c: "def create_account(name: str, age: int):\n    if not name or not name.strip():\n        raise ValueError(\"ชื่อต้องไม่ว่าง\")\n    if not isinstance(age, int):\n        raise TypeError(\"อายุต้องเป็นจำนวนเต็ม\")\n    if not 0 < age < 150:\n        raise ValueError(f\"อายุไม่สมเหตุสมผล: {age}\")\n    return {\"name\": name.strip(), \"age\": age}\n\ncreate_account(\"\", 25)    # ValueError: ชื่อต้องไม่ว่าง (พังทันทีตรงจุด)" },

        { t: "h2", c: "EAFP vs LBYL — สองสไตล์การตรวจ" },
        { t: "p", c: "มี 2 แนวคิด: LBYL (เช็คก่อนทำ) และ EAFP (ลองทำเลย แล้วจับ error) — Python นิยม EAFP เพราะอ่านง่ายกว่าและเลี่ยง race condition" },
        { t: "code", lang: "python", c: "data = {\"name\": \"Aph\"}\n\n# LBYL — Look Before You Leap (เช็คก่อน)\nif \"age\" in data:\n    age = data[\"age\"]\nelse:\n    age = 0\n\n# EAFP — Easier to Ask Forgiveness than Permission (ลองเลย จับทีหลัง)\ntry:\n    age = data[\"age\"]\nexcept KeyError:\n    age = 0\n\n# จริง ๆ เคสนี้ Pythonic สุดคือ:\nage = data.get(\"age\", 0)" },
        {
          t: "table",
          head: ["สไตล์", "แนวคิด", "เหมาะกับ"],
          rows: [
            ["LBYL", "เช็คเงื่อนไขก่อนลงมือ", "เงื่อนไขชัดเจน ไม่ซับซ้อน"],
            ["EAFP", "ลองทำแล้วจับ error", "งาน I/O, dict/attribute access (Pythonic)"],
          ],
        },

        { t: "h2", c: "assert — ตรวจสมมติฐานระหว่างพัฒนา" },
        { t: "p", c: "assert ใช้ตรวจสิ่งที่ \"ควรจะเป็นจริงเสมอ\" ในโค้ด ถ้าไม่จริงจะ raise AssertionError ทันที เหมาะตรวจ logic ภายในระหว่างพัฒนา" },
        { t: "code", lang: "python", c: "def apply_discount(price, percent):\n    assert 0 <= percent <= 100, f\"เปอร์เซ็นต์ผิด: {percent}\"\n    return price * (1 - percent / 100)\n\napply_discount(100, 150)   # AssertionError: เปอร์เซ็นต์ผิด: 150" },
        { t: "callout", title: "อย่าใช้ assert ตรวจ input ผู้ใช้", warn: true, c: "assert ถูก \"ปิด\" ทั้งหมดเมื่อรันด้วย python -O (optimized mode) ดังนั้นถ้าใช้ assert ตรวจ input จากผู้ใช้ พอรันโหมด -O การตรวจจะหายไปและข้อมูลผิดจะหลุดเข้าระบบ — ใช้ assert กับ \"สมมติฐานภายในของโปรแกรมเมอร์\" เท่านั้น ส่วน input ผู้ใช้ให้ใช้ if + raise" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "validate ข้อมูลจากภายนอกที่ขอบระบบ — fail fast พังตรงจุดเกิดเหตุ",
            "LBYL เช็คก่อนทำ, EAFP ลองแล้วจับ — Python นิยม EAFP",
            "assert ตรวจสมมติฐานภายในระหว่างพัฒนา",
            "ห้ามใช้ assert ตรวจ input ผู้ใช้ (ถูกปิดด้วย python -O) — ใช้ if + raise",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) เขียนฟังก์ชัน register(email, password) ที่ validate: email มี @, password ยาว >= 8  2) เขียนการเข้าถึง dict ทั้งแบบ LBYL และ EAFP แล้วเทียบ  3) ใช้ assert ตรวจว่าผลลัพธ์ภายในฟังก์ชันไม่ติดลบ  4) อธิบายว่าทำไมไม่ควรใช้ assert ตรวจ input ผู้ใช้" },
        {
          t: "links",
          c: [
            { title: "จบบทที่ 2 แล้ว 🎉 — กลับหน้าภาพรวมคอร์ส", slug: "intermediate", desc: "บทที่ 3: Debugging, Profiling & Performance กำลังจัดทำ" },
            { title: "← ก่อนหน้า: Type Hints & mypy", slug: "err-typing" },
            { title: "ทบทวน: Exception เจาะลึก (ต้นบท)", slug: "err-exceptions" },
          ],
        },
      ],
      en: [],
    },
  },
};
