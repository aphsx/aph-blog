import type { Page } from "@/lib/types";

export const oopBasicsPages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "oop-class": {
    slug: "oop-class",
    title: { th: "Class & Object", en: "" },
    lead: { th: "พิมพ์เขียว (class) กับของจริง (object), attribute, method, self และ __init__ — รากฐานของ OOP", en: "" },
    group: "บทที่ 5: OOP & การออกแบบโปรแกรม",
    blocks: {
      th: [
        { t: "p", c: "เมื่อโปรแกรมใหญ่ขึ้น ตัวแปรและฟังก์ชันที่กระจัดกระจายเริ่มจัดการยาก Object-Oriented Programming (OOP) คือวิธีจัดระเบียบโค้ดโดยมัด \"ข้อมูล\" กับ \"การกระทำกับข้อมูลนั้น\" ไว้ด้วยกันเป็น object เหมือนของในโลกจริง บทนี้เป็นหนึ่งใน prerequisite ที่ระบุไว้ใน roadmap" },

        { t: "h2", c: "Class คือพิมพ์เขียว Object คือของจริง" },
        { t: "p", c: "Class คือ \"แม่แบบ\" ที่บอกว่าสิ่งหนึ่งมีข้อมูลอะไรและทำอะไรได้ ส่วน Object คือ \"ของจริง\" ที่สร้างจากแม่แบบนั้น เช่น class \"สุนัข\" เป็นแบบ ส่วนเจ้าไข่ดาวกับเจ้าโมจิคือ object 2 ตัวที่สร้างจาก class เดียวกัน" },
        { t: "code", lang: "python", c: "class Dog:\n    # __init__ ทำงานอัตโนมัติตอนสร้าง object ใช้ตั้งค่าเริ่มต้น\n    def __init__(self, name, age):\n        self.name = name      # attribute (ข้อมูลของ object)\n        self.age = age\n\n    def bark(self):           # method (การกระทำของ object)\n        return f\"{self.name} เห่า: โฮ่ง!\"\n\n# สร้าง object จาก class\nd1 = Dog(\"ไข่ดาว\", 3)\nd2 = Dog(\"โมจิ\", 5)\n\nprint(d1.name)      # ไข่ดาว     (เข้าถึง attribute ด้วยจุด)\nprint(d1.bark())    # ไข่ดาว เห่า: โฮ่ง!\nprint(d2.age)       # 5\nd1.age = 4          # แก้ attribute ได้\nprint(d1.age)       # 4" },

        { t: "h2", c: "ทำความเข้าใจ self" },
        { t: "p", c: "self หมายถึง \"ตัว object นั้นเอง\" ทุก method ต้องมี self เป็น parameter แรก เพื่อให้เข้าถึงข้อมูลของ object ตัวที่กำลังทำงานอยู่ เวลาเรียกใช้ (d1.bark()) ไม่ต้องส่ง self เอง Python ใส่ให้อัตโนมัติ" },
        { t: "code", lang: "python", c: "class Counter:\n    def __init__(self):\n        self.count = 0        # ทุก object มี count ของตัวเอง\n\n    def increment(self):\n        self.count += 1       # แก้ count ของ object ตัวนี้\n\n    def show(self):\n        print(f\"นับได้ {self.count}\")\n\nc1 = Counter()\nc2 = Counter()\nc1.increment()\nc1.increment()\nc2.increment()\nc1.show()   # นับได้ 2\nc2.show()   # นับได้ 1   (แยกกันคนละ object)" },
        { t: "callout", title: "__init__ คืออะไร", c: "__init__ (อ่านว่า \"dunder init\" — double underscore) คือ constructor ที่ทำงานทันทีตอนสร้าง object ใช้ตั้งค่าเริ่มต้นให้ attribute เวลาเขียน Dog(\"ไข่ดาว\", 3) ค่าทั้งสองจะถูกส่งเข้า __init__ โดย Python เรียก __init__ ให้เองอัตโนมัติ" },

        { t: "h2", c: "attribute vs method" },
        {
          t: "table",
          head: ["", "attribute", "method"],
          rows: [
            ["คืออะไร", "ข้อมูลของ object", "การกระทำของ object"],
            ["เปรียบเทียบ", "คำนาม (ชื่อ, อายุ)", "คำกริยา (เห่า, วิ่ง)"],
            ["เข้าถึง", "d1.name", "d1.bark()"],
            ["นิยามที่", "ใน __init__ (self.x = ...)", "เป็น def ใน class"],
          ],
        },

        { t: "h2", c: "ตัวอย่างที่สมบูรณ์: BankAccount" },
        { t: "code", lang: "python", c: "class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n        return self.balance\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            return \"ยอดเงินไม่พอ\"\n        self.balance -= amount\n        return self.balance\n\nacc = BankAccount(\"Aphisit\", 1000)\nacc.deposit(500)\nprint(acc.withdraw(2000))   # ยอดเงินไม่พอ\nprint(acc.balance)          # 1500" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "Class = พิมพ์เขียว (แม่แบบ), Object = ของจริงที่สร้างจาก class",
            "attribute = ข้อมูลของ object (self.x), method = การกระทำ (def ใน class)",
            "self = ตัว object เอง ต้องเป็น parameter แรกของทุก method",
            "__init__ คือ constructor ทำงานตอนสร้าง object ใช้ตั้งค่าเริ่มต้น",
            "แต่ละ object เก็บข้อมูลของตัวเองแยกกัน",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง class Student เก็บชื่อ คะแนน และ method grade() คืนเกรด  2) สร้าง class Rectangle ที่มี method area() และ perimeter()  3) สร้าง class Counter ที่ increment/decrement/reset ได้  4) สร้าง class Circle รับรัศมี มี method หาพื้นที่และเส้นรอบวง  5) ขยาย BankAccount ให้เก็บประวัติการทำรายการในลิสต์" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: 4 เสาหลักของ OOP →", slug: "oop-pillars", desc: "Encapsulation, Inheritance, Polymorphism, Abstraction" },
            { title: "← กลับหน้าภาพรวมคอร์ส", slug: "learn" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "oop-pillars": {
    slug: "oop-pillars",
    title: { th: "4 เสาหลักของ OOP", en: "" },
    lead: { th: "Encapsulation, Inheritance, Polymorphism, Abstraction — แนวคิดหลักที่มักถูกถามในสัมภาษณ์ พร้อมตัวอย่าง", en: "" },
    group: "บทที่ 5: OOP & การออกแบบโปรแกรม",
    blocks: {
      th: [
        { t: "p", c: "OOP มีแนวคิดหลัก 4 อย่างที่เรียกว่า \"4 เสาหลัก\" (four pillars) เป็นคำถามสัมภาษณ์ยอดฮิต เราจะดูทีละข้อพร้อมตัวอย่างโค้ดที่เข้าใจง่าย" },

        { t: "h2", c: "1) Encapsulation — ห่อหุ้มข้อมูล" },
        { t: "p", c: "รวมข้อมูลและ method ที่เกี่ยวข้องไว้ด้วยกัน และซ่อนรายละเอียดภายในไม่ให้ภายนอกแก้ตรง ๆ บังคับให้แก้ผ่าน method ที่ควบคุมได้ ใน Python ใช้ขีดล่าง _ (บอกว่า \"ภายใน\") หรือ __ (ซ่อนแรงขึ้น) นำหน้าชื่อ" },
        { t: "code", lang: "python", c: "class BankAccount:\n    def __init__(self):\n        self.__balance = 0        # __ = private (ซ่อน)\n\n    def deposit(self, amount):\n        if amount > 0:            # ควบคุมเงื่อนไขผ่าน method\n            self.__balance += amount\n\n    def get_balance(self):\n        return self.__balance\n\nacc = BankAccount()\nacc.deposit(1000)\nacc.deposit(-50)              # ถูกปฏิเสธเพราะติดลบ\nprint(acc.get_balance())     # 1000\n# acc.__balance = 999999     # แก้ตรง ๆ ไม่ได้" },
        { t: "callout", title: "ทำไมต้องซ่อน", c: "ถ้าใครก็แก้ balance ได้ตรง ๆ อาจตั้งเป็นค่าติดลบหรือค่าที่ผิดกติกา การบังคับให้ผ่าน deposit/withdraw ทำให้เราควบคุมเงื่อนไขได้ ข้อมูลจึงอยู่ในสถานะที่ถูกต้องเสมอ" },

        { t: "h2", c: "2) Inheritance — การสืบทอด" },
        { t: "p", c: "class ลูก (subclass) รับคุณสมบัติจาก class แม่ (superclass) มาใช้ต่อได้ ไม่ต้องเขียนซ้ำ และเพิ่มหรือแก้เฉพาะส่วนที่ต่าง ช่วยลดโค้ดซ้ำซ้อนมาก" },
        { t: "code", lang: "python", c: "class Animal:\n    def __init__(self, name):\n        self.name = name\n    def eat(self):\n        return f\"{self.name} กำลังกิน\"\n\nclass Cat(Animal):              # Cat สืบทอดจาก Animal\n    def meow(self):             # เพิ่ม method ของตัวเอง\n        return f\"{self.name} ร้อง: เมี้ยว\"\n\nclass Dog(Animal):\n    def eat(self):              # เขียนทับ (override) ของแม่\n        return f\"{self.name} กินอย่างตะกละ\"\n\nc = Cat(\"มะลิ\")\nprint(c.eat())   # มะลิ กำลังกิน      (ได้จาก Animal)\nprint(c.meow())  # มะลิ ร้อง: เมี้ยว\nprint(Dog(\"ไข่ดาว\").eat())  # ไข่ดาว กินอย่างตะกละ (override)" },
        { t: "code", lang: "python", c: "# เรียก method ของแม่ด้วย super()\nclass Puppy(Dog):\n    def __init__(self, name, age):\n        super().__init__(name)   # เรียก __init__ ของแม่\n        self.age = age" },

        { t: "h2", c: "3) Polymorphism — หลายรูปแบบ" },
        { t: "p", c: "object ต่างชนิดตอบสนอง method ชื่อเดียวกันได้ในแบบของตัวเอง ทำให้เขียนโค้ดที่ทำงานกับหลายชนิดได้โดยไม่ต้องแยกเคส" },
        { t: "code", lang: "python", c: "class Dog:\n    def sound(self):\n        return \"โฮ่ง\"\n\nclass Cat:\n    def sound(self):\n        return \"เมี้ยว\"\n\nclass Cow:\n    def sound(self):\n        return \"มอ\"\n\n# ฟังก์ชันเดียว ใช้ได้กับทุก object ที่มี sound()\nanimals = [Dog(), Cat(), Cow(), Dog()]\nfor a in animals:\n    print(a.sound())   # โฮ่ง เมี้ยว มอ โฮ่ง" },
        { t: "callout", title: "ทำไม polymorphism ดี", c: "ถ้าไม่มี เราต้องเขียน if แยกทุกชนิด (ถ้าเป็นหมา...ถ้าเป็นแมว...) แต่ polymorphism ให้เราเรียก a.sound() เหมือนกันหมด เพิ่มสัตว์ชนิดใหม่ก็ไม่ต้องแก้ loop เดิม" },

        { t: "h2", c: "4) Abstraction — ซ่อนความซับซ้อน" },
        { t: "p", c: "เปิดเผยเฉพาะสิ่งที่จำเป็นต้องใช้ ซ่อนรายละเอียดยุ่งยากไว้ภายใน เหมือนขับรถโดยไม่ต้องรู้ว่าเครื่องยนต์ทำงานอย่างไร แค่รู้ว่าเหยียบคันเร่งแล้วไป method ที่ผู้ใช้เรียกคือ \"หน้าบ้าน\" ส่วนตรรกะซับซ้อนซ่อนอยู่ \"หลังบ้าน\"" },
        { t: "code", lang: "python", c: "class CoffeeMachine:\n    def make_coffee(self):       # ผู้ใช้เรียกแค่อันนี้\n        self.__boil_water()\n        self.__grind_beans()\n        return \"กาแฟพร้อมแล้ว\"\n\n    def __boil_water(self):      # รายละเอียดภายใน ซ่อนไว้\n        pass\n    def __grind_beans(self):\n        pass\n\nprint(CoffeeMachine().make_coffee())  # กาแฟพร้อมแล้ว" },

        { t: "h2", c: "สรุป 4 เสาหลัก" },
        {
          t: "table",
          head: ["เสาหลัก", "ความหมายสั้น ๆ"],
          rows: [
            ["Encapsulation", "ห่อหุ้ม+ซ่อนข้อมูล ควบคุมการเข้าถึงผ่าน method"],
            ["Inheritance", "class ลูกรับคุณสมบัติจาก class แม่ ลดโค้ดซ้ำ"],
            ["Polymorphism", "object ต่างชนิดตอบสนอง method ชื่อเดียวกันในแบบตัวเอง"],
            ["Abstraction", "ซ่อนความซับซ้อน เปิดเผยเฉพาะที่จำเป็น"],
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) ทำ BankAccount ที่ซ่อน balance และฝาก-ถอนผ่าน method (ห้ามถอนเกิน)  2) สร้าง Animal แม่ แล้วให้ Dog, Bird สืบทอด พร้อม override sound()  3) เขียนฟังก์ชันรับลิสต์ของรูปทรง (Circle, Rectangle) แล้วเรียก area() ของแต่ละตัว (polymorphism)  4) ใช้ super() เรียก __init__ ของแม่ใน subclass" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: Inheritance vs Composition →", slug: "oop-relationships", desc: "เลือกระหว่างสืบทอด กับ ประกอบจากชิ้นส่วน" },
            { title: "← Class & Object", slug: "oop-class" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "oop-relationships": {
    slug: "oop-relationships",
    title: { th: "Inheritance vs Composition", en: "" },
    lead: { th: "ความสัมพันธ์ \"เป็น\" (is-a) กับ \"มี\" (has-a) และเมื่อไหร่ควรเลือกแบบไหน", en: "" },
    group: "บทที่ 5: OOP & การออกแบบโปรแกรม",
    blocks: {
      th: [
        { t: "p", c: "เมื่อออกแบบ class เรามักเชื่อมโยง class เข้าด้วยกัน 2 แบบหลัก: inheritance (สืบทอด — ความสัมพันธ์ \"เป็น\") และ composition (ประกอบ — ความสัมพันธ์ \"มี\") เลือกถูกทำให้โค้ดยืดหยุ่นและดูแลง่าย" },

        { t: "h2", c: "Inheritance = ความสัมพันธ์ \"เป็น\" (is-a)" },
        { t: "p", c: "ใช้เมื่อสิ่งหนึ่ง \"เป็นชนิดหนึ่งของ\" อีกสิ่ง เช่น แมว เป็น สัตว์, รถยนต์ เป็น ยานพาหนะ ถ้าพูดว่า \"A เป็น B\" แล้วฟังขึ้น ก็เหมาะกับ inheritance" },
        { t: "code", lang: "python", c: "class Vehicle:\n    def __init__(self, brand):\n        self.brand = brand\n    def move(self):\n        return f\"{self.brand} กำลังเคลื่อนที่\"\n\nclass Car(Vehicle):      # Car \"เป็น\" Vehicle\n    def honk(self):\n        return \"ปี๊น ปี๊น\"\n\nc = Car(\"Toyota\")\nprint(c.move())  # Toyota กำลังเคลื่อนที่\nprint(c.honk())  # ปี๊น ปี๊น" },

        { t: "h2", c: "Composition = ความสัมพันธ์ \"มี\" (has-a)" },
        { t: "p", c: "ใช้เมื่อสิ่งหนึ่ง \"มี\" อีกสิ่งเป็นส่วนประกอบ เช่น รถยนต์ มี เครื่องยนต์, คอมพิวเตอร์ มี ซีพียู เราให้ object หนึ่งถือ object อื่นไว้เป็น attribute" },
        { t: "code", lang: "python", c: "class Engine:\n    def start(self):\n        return \"ติดเครื่อง\"\n\nclass Car:\n    def __init__(self, brand):\n        self.brand = brand\n        self.engine = Engine()    # Car \"มี\" Engine\n    def drive(self):\n        return f\"{self.brand}: {self.engine.start()} แล้วออกตัว\"\n\nprint(Car(\"Honda\").drive())  # Honda: ติดเครื่อง แล้วออกตัว" },

        { t: "h2", c: "เลือกแบบไหนดี" },
        { t: "p", c: "หลักง่าย ๆ ที่นิยมกันคือ \"prefer composition over inheritance\" (เลือกประกอบมากกว่าสืบทอดเมื่อทำได้) เพราะ composition ยืดหยุ่นกว่าและลดการผูกมัดที่แน่นเกินไป" },
        {
          t: "table",
          head: ["", "Inheritance (is-a)", "Composition (has-a)"],
          rows: [
            ["ความสัมพันธ์", "A เป็นชนิดของ B", "A มี B เป็นส่วนประกอบ"],
            ["ตัวอย่าง", "แมว เป็น สัตว์", "รถ มี เครื่องยนต์"],
            ["ความยืดหยุ่น", "น้อยกว่า (ผูกแน่น)", "มากกว่า (สลับชิ้นส่วนได้)"],
            ["เมื่อไหร่ใช้", "is-a ฟังขึ้นจริง ๆ", "ส่วนใหญ่ใช้อันนี้ได้"],
          ],
        },
        { t: "callout", title: "กับดักของ inheritance ที่ลึกเกินไป", warn: true, c: "การสืบทอดหลายชั้น (A → B → C → D) ทำให้ตามโค้ดยาก แก้ class แม่ทีกระทบลูกหลานทั้งหมด ถ้าไม่ใช่ is-a จริง ๆ ให้ใช้ composition แทน จะแยกส่วนชัดและทดสอบง่ายกว่า" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "Inheritance = ความสัมพันธ์ \"เป็น\" (is-a) เช่น Car เป็น Vehicle",
            "Composition = ความสัมพันธ์ \"มี\" (has-a) เช่น Car มี Engine",
            "เลือก inheritance เมื่อ is-a ฟังขึ้นจริง ๆ นอกนั้นมักใช้ composition",
            "หลักนิยม: prefer composition over inheritance — ยืดหยุ่นและดูแลง่ายกว่า",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) ออกแบบ class Computer ที่ \"มี\" CPU และ RAM (composition)  2) ออกแบบ Shape แม่ แล้ว Circle/Square สืบทอด (inheritance)  3) ตัดสินใจ: Library กับ Book ควรเป็น is-a หรือ has-a?  4) ลองเขียน Playlist ที่ \"มี\" ลิสต์ของ Song" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: หลักการออกแบบโค้ดที่ดี →", slug: "oop-design", desc: "DRY, Single Responsibility, KISS และเมื่อไหร่ควรใช้ OOP" },
            { title: "← 4 เสาหลักของ OOP", slug: "oop-pillars" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "oop-design": {
    slug: "oop-design",
    title: { th: "หลักการออกแบบโค้ดที่ดี", en: "" },
    lead: { th: "DRY, Single Responsibility, KISS, ตั้งชื่อให้ดี และเมื่อไหร่ควร (หรือไม่ควร) ใช้ OOP", en: "" },
    group: "บทที่ 5: OOP & การออกแบบโปรแกรม",
    blocks: {
      th: [
        { t: "p", c: "OOP เป็นเครื่องมือ แต่จะเขียนให้ดีต้องมีหลักการกำกับ หัวข้อปิดท้ายบทนี้รวมหลักการออกแบบที่ใช้ได้ทั้งกับ OOP และโค้ดทั่วไป จำไว้ตั้งแต่เริ่มจะติดเป็นนิสัยที่ดี" },

        { t: "h2", c: "DRY — Don't Repeat Yourself" },
        { t: "p", c: "อย่าเขียนโค้ดซ้ำ ถ้าเห็นโค้ดเหมือนกันหลายที่ ให้แยกเป็นฟังก์ชันหรือ class เพราะถ้าต้องแก้ จะได้แก้ที่เดียว ไม่ใช่ไล่แก้ทุกที่ (และเสี่ยงลืม)" },
        { t: "code", lang: "python", c: "# แย่: คำนวณภาษีซ้ำหลายที่\nprice1 = 100 + 100 * 0.07\nprice2 = 250 + 250 * 0.07\n\n# ดี: แยกเป็นฟังก์ชัน แก้สูตรที่เดียว\ndef with_vat(price):\n    return price + price * 0.07\nprint(with_vat(100), with_vat(250))" },

        { t: "h2", c: "Single Responsibility — หนึ่งหน้าที่ต่อหนึ่งสิ่ง" },
        { t: "p", c: "แต่ละฟังก์ชัน/class ควรทำหน้าที่เดียวและทำให้ดี ฟังก์ชันที่ทำหลายอย่างปนกันจะทดสอบยากและแก้ยาก ถ้าอธิบายฟังก์ชันแล้วต้องใช้คำว่า \"และ\" หลายครั้ง อาจถึงเวลาแยก" },
        { t: "code", lang: "python", c: "# แย่: ฟังก์ชันเดียวทำทั้งคำนวณ แสดงผล และบันทึก\n# ดี: แยกหน้าที่\ndef calculate_total(items):\n    return sum(items)\n\ndef format_receipt(total):\n    return f\"ยอดรวม: {total:,} บาท\"\n\ndef save_to_file(text):\n    pass   # บันทึกลงไฟล์\n\ntotal = calculate_total([100, 250, 80])\nprint(format_receipt(total))" },

        { t: "h2", c: "KISS — Keep It Simple" },
        { t: "p", c: "เลือกวิธีที่เรียบง่ายที่สุดที่แก้ปัญหาได้ก่อน อย่าออกแบบซับซ้อนเกินจำเป็นเผื่ออนาคตที่ยังไม่มาถึง (over-engineering) โค้ดที่เรียบง่ายอ่านง่าย บั๊กน้อย และแก้ง่ายกว่า" },

        { t: "h2", c: "ตั้งชื่อให้สื่อความหมาย" },
        { t: "p", c: "โค้ดถูกอ่านบ่อยกว่าถูกเขียน ชื่อที่ดีคือเอกสารในตัว ลดความจำเป็นในการเขียนคอมเมนต์อธิบาย" },
        {
          t: "table",
          head: ["แย่", "ดี"],
          rows: [
            ["d", "days_since_login"],
            ["calc()", "calculate_total_price()"],
            ["temp / data / x", "user_input / filtered_users"],
            ["flag", "is_active / has_permission"],
          ],
        },

        { t: "h2", c: "เมื่อไหร่ควร (และไม่ควร) ใช้ OOP" },
        { t: "p", c: "OOP ไม่ใช่คำตอบของทุกอย่าง สคริปต์สั้น ๆ เขียนเป็นฟังก์ชันก็เพียงพอและอ่านง่ายกว่า OOP เปล่งประกายเมื่อโปรแกรมมีหลาย \"สิ่ง\" ที่มีทั้งข้อมูลและพฤติกรรม และมีหลายประเภทที่คล้ายกัน" },
        {
          t: "ul",
          c: [
            "ใช้ OOP: ระบบจัดการผู้ใช้, เกม (ตัวละคร/ศัตรู/ไอเทม), ระบบที่มีหลายชนิดของวัตถุคล้ายกัน",
            "ไม่ต้อง OOP: สคริปต์คำนวณสั้น ๆ, แปลงไฟล์ครั้งเดียว, งานที่ฟังก์ชันไม่กี่ตัวก็จบ",
          ],
        },

        { t: "h2", c: "สรุปบทที่ 5" },
        {
          t: "ul",
          c: [
            "DRY: อย่าเขียนซ้ำ แยกเป็นฟังก์ชัน/class แก้ที่เดียว",
            "Single Responsibility: แต่ละส่วนทำหน้าที่เดียว",
            "KISS: เรียบง่ายที่สุดเท่าที่แก้ปัญหาได้ เลี่ยง over-engineering",
            "ตั้งชื่อให้สื่อความหมาย = เอกสารในตัว",
            "ใช้ OOP เมื่อมีหลาย \"สิ่ง\" ที่มีข้อมูล+พฤติกรรม ไม่ใช่ทุกงาน",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) หาโค้ดซ้ำในโปรแกรมเก่าของคุณ แล้วแยกเป็นฟังก์ชัน (DRY)  2) เปลี่ยนชื่อตัวแปร x, d, temp ให้สื่อความหมาย  3) แยกฟังก์ชันที่ทำหลายอย่างออกเป็นฟังก์ชันย่อย  4) ตัดสินใจว่าโปรแกรม To-do list ควรใช้ OOP ไหม เพราะอะไร" },
        { t: "callout", title: "จบบทที่ 5", warn: false, c: "ตอนนี้คุณจัดระเบียบโค้ดด้วย OOP และยึดหลักการออกแบบที่ดีได้แล้ว บทสุดท้ายจะเชื่อมทุกอย่างเข้ากับโลกจริง: เว็บ, API และฐานข้อมูล" },
        {
          t: "links",
          c: [
            { title: "บทที่ 6: เว็บ, API & ฐานข้อมูล →", slug: "web-how", desc: "เว็บทำงานอย่างไร — ก้าวสู่การสร้างแอปจริง" },
            { title: "← Inheritance vs Composition", slug: "oop-relationships" },
          ],
        },
      ],
      en: [],
    },
  },
};
