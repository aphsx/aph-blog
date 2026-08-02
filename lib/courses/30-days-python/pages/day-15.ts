import type { Page } from "@/lib/types";

export const day15Page: Record<string, Page> = {
  "py30-day15": {
    slug: "py30-day15",
    title: { th: "วันที่ 15 — ประเภทข้อผิดพลาด (Python Type Errors)", en: "" },
    lead: { th: "เรียนรู้ประเภทข้อผิดพลาดที่พบบ่อยใน Python ตั้งแต่ SyntaxError จนถึง ZeroDivisionError พร้อมวิธีแก้ไขแต่ละประเภท", en: "" },
    group: "สัปดาห์ที่ 3: ฟังก์ชัน & Functional",
    blocks: {
      th: [
        { t: "h2", c: "ประเภทข้อผิดพลาดใน Python" },
        { t: "p", c: "เมื่อเราเขียนโค้ดเป็นเรื่องปกติที่จะพิมพ์ผิดหรือเกิดข้อผิดพลาดอื่น ๆ ถ้าโค้ดรันไม่ได้ Python interpreter จะแสดงข้อความแจ้งตำแหน่งที่เกิดปัญหาและประเภทของข้อผิดพลาด บางครั้งยังแนะนำวิธีแก้ไขด้วย การเข้าใจประเภทข้อผิดพลาดต่าง ๆ จะช่วยให้ debug โค้ดได้เร็วขึ้นและเป็นโปรแกรมเมอร์ที่ดีขึ้น" },

        { t: "h3", c: "SyntaxError" },
        { t: "p", c: "เกิดขึ้นเมื่อ syntax ไม่ถูกต้อง เช่น ลืมใส่วงเล็บ:" },
        { t: "code", lang: "python", c: ">>> print 'hello world'\n  File \"<stdin>\", line 1\n    print 'hello world'\n                      ^\nSyntaxError: Missing parentheses in call to 'print'. Did you mean print('hello world')?" },
        { t: "p", c: "ลืมใส่ parenthesis รอบ string Python แนะนำวิธีแก้ไขให้ด้วย แก้ได้ดังนี้:" },
        { t: "code", lang: "python", c: ">>> print('hello world')\nhello world" },

        { t: "h3", c: "NameError" },
        { t: "p", c: "เกิดขึ้นเมื่อใช้ชื่อตัวแปรหรือ function ที่ยังไม่ได้ประกาศ:" },
        { t: "code", lang: "python", c: ">>> print(age)\nTraceback (most recent call last):\n  File \"<stdin>\", line 1, in <module>\nNameError: name 'age' is not defined" },
        { t: "p", c: "ตัวแปร age ยังไม่ได้ประกาศ แก้ได้โดยประกาศและกำหนดค่าก่อน:" },
        { t: "code", lang: "python", c: ">>> age = 25\n>>> print(age)\n25" },

        { t: "h3", c: "IndexError" },
        { t: "p", c: "เกิดขึ้นเมื่อใช้ index ที่เกินขอบเขตของ list:" },
        { t: "code", lang: "python", c: ">>> numbers = [1, 2, 3, 4, 5]\n>>> numbers[5]\nTraceback (most recent call last):\n  File \"<stdin>\", line 1, in <module>\nIndexError: list index out of range" },
        { t: "p", c: "List นี้มี index แค่ 0 ถึง 4 การใช้ index 5 จึงเกิน range" },

        { t: "h3", c: "ModuleNotFoundError" },
        { t: "p", c: "เกิดขึ้นเมื่อ import module ที่ไม่มีอยู่หรือพิมพ์ชื่อผิด:" },
        { t: "code", lang: "python", c: ">>> import maths\nTraceback (most recent call last):\n  File \"<stdin>\", line 1, in <module>\nModuleNotFoundError: No module named 'maths'" },
        { t: "p", c: "พิมพ์ชื่อ module ผิด มี s ต่อท้ายที่ไม่ควรมี แก้โดยลบ s ออก:" },
        { t: "code", lang: "python", c: ">>> import math\n>>>" },

        { t: "h3", c: "AttributeError" },
        { t: "p", c: "เกิดขึ้นเมื่อเรียกใช้ attribute หรือ method ที่ไม่มีอยู่ใน object นั้น:" },
        { t: "code", lang: "python", c: ">>> import math\n>>> math.PI\nTraceback (most recent call last):\n  File \"<stdin>\", line 1, in <module>\nAttributeError: module 'math' has no attribute 'PI'" },
        { t: "p", c: "ค่าคงที่ pi ใน math module เขียนเป็นตัวเล็กว่า pi ไม่ใช่ PI แก้ได้ดังนี้:" },
        { t: "code", lang: "python", c: ">>> math.pi\n3.141592653589793" },

        { t: "h3", c: "KeyError" },
        { t: "p", c: "เกิดขึ้นเมื่อใช้ key ที่ไม่มีอยู่ใน dictionary:" },
        { t: "code", lang: "python", c: ">>> users = {'name':'Asab', 'age':250, 'country':'Finland'}\n>>> users['name']\n'Asab'\n>>> users['county']\nTraceback (most recent call last):\n  File \"<stdin>\", line 1, in <module>\nKeyError: 'county'" },
        { t: "p", c: "พิมพ์ key ผิด 'county' ควรเป็น 'country' แก้ดังนี้:" },
        { t: "code", lang: "python", c: ">>> users['country']\n'Finland'" },

        { t: "h3", c: "TypeError" },
        { t: "p", c: "เกิดขึ้นเมื่อใช้ operation กับ data type ที่ไม่รองรับ:" },
        { t: "code", lang: "python", c: ">>> 4 + '3'\nTraceback (most recent call last):\n  File \"<stdin>\", line 1, in <module>\nTypeError: unsupported operand type(s) for +: 'int' and 'str'" },
        { t: "p", c: "ไม่สามารถบวก number กับ string ได้โดยตรง วิธีแก้คือแปลง string เป็น int หรือ float ก่อน:" },
        { t: "code", lang: "python", c: ">>> 4 + int('3')\n7\n>>> 4 + float('3')\n7.0" },

        { t: "h3", c: "ImportError" },
        { t: "p", c: "เกิดขึ้นเมื่อ import function ที่ไม่มีอยู่ใน module นั้น:" },
        { t: "code", lang: "python", c: ">>> from math import power\nTraceback (most recent call last):\n  File \"<stdin>\", line 1, in <module>\nImportError: cannot import name 'power' from 'math'" },
        { t: "p", c: "ไม่มี function ชื่อ power ใน math module ชื่อที่ถูกต้องคือ pow แก้ดังนี้:" },
        { t: "code", lang: "python", c: ">>> from math import pow\n>>> pow(2,3)\n8.0" },

        { t: "h3", c: "ValueError" },
        { t: "p", c: "เกิดขึ้นเมื่อ function ได้รับ argument ที่มี type ถูกต้องแต่ค่าไม่เหมาะสม:" },
        { t: "code", lang: "python", c: ">>> int('12a')\nTraceback (most recent call last):\n  File \"<stdin>\", line 1, in <module>\nValueError: invalid literal for int() with base 10: '12a'" },
        { t: "p", c: "ไม่สามารถแปลง string '12a' เป็น integer ได้เพราะมีตัวอักษร 'a' ปนอยู่" },

        { t: "h3", c: "ZeroDivisionError" },
        { t: "p", c: "เกิดขึ้นเมื่อหารด้วยศูนย์:" },
        { t: "code", lang: "python", c: ">>> 1/0\nTraceback (most recent call last):\n  File \"<stdin>\", line 1, in <module>\nZeroDivisionError: division by zero" },
        { t: "p", c: "ไม่สามารถหารตัวเลขด้วยศูนย์ได้" },

        { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 15" },
        { t: "ol", c: [
          "เปิด Python interactive shell แล้วลองรันตัวอย่างทั้งหมดที่เรียนมาในบทนี้",
        ]},
      ],
      en: [],
    },
  },
};
