import type { Page } from "@/lib/types";

export const day09Page: Record<string, Page> = {
  "py30-day09": {
    slug: "py30-day09",
    title: "วันที่ 9 — เงื่อนไข (Conditionals)",
    lead: "เรียนรู้การควบคุมทิศทางของโปรแกรมด้วย if, elif, else และ logical operators",
    group: "สัปดาห์ที่ 2: โครงสร้างข้อมูล & การควบคุม",
    blocks: [
      { t: "h2", c: "เงื่อนไข (Conditionals)" },
      { t: "p", c: "โดย default คำสั่งใน Python script จะถูกรันเรียงตามลำดับจากบนลงล่าง ถ้า processing logic ต้องการ การรันตามลำดับสามารถเปลี่ยนได้สองวิธี:" },
      { t: "ul", c: [
        "Conditional execution: block ของคำสั่งหนึ่งตัวหรือมากกว่าจะถูกรันถ้า expression หนึ่งเป็น true",
        "Repetitive execution: block ของคำสั่งจะถูกรันซ้ำตราบเท่าที่ expression หนึ่งยังเป็น true ในส่วนนี้จะเรียน if, else, elif statements ตัวดำเนินการเปรียบเทียบและ logical operators ที่เรียนมาแล้วจะมีประโยชน์มากที่นี่",
      ]},

      { t: "h3", c: "If Condition" },
      { t: "p", c: "ใน Python และภาษาโปรแกรมอื่น keyword if ใช้ตรวจสอบว่าเงื่อนไขเป็น true หรือไม่แล้วรัน block code จำ indentation หลัง colon:" },
      { t: "code", lang: "python", c: "# syntax\nif condition:\n    this part of code runs for truthy conditions" },
      { t: "p", c: "ตัวอย่าง 1:" },
      { t: "code", lang: "python", c: "a = 3\nif a > 0:\n    print('A is a positive number')\n# A is a positive number" },
      { t: "p", c: "จากตัวอย่างข้างต้น 3 มากกว่า 0 เงื่อนไขเป็น true และ block code ถูกรัน แต่ถ้าเงื่อนไขเป็น false เราจะไม่เห็นผลลัพธ์ เพื่อให้เห็นผลลัพธ์เมื่อเงื่อนไขเป็น false เราต้องใช้ else" },

      { t: "h3", c: "If Else" },
      { t: "p", c: "ถ้าเงื่อนไขเป็น true block แรกจะถูกรัน ถ้าไม่ใช่ else block จะรัน:" },
      { t: "code", lang: "python", c: "# syntax\nif condition:\n    this part of code runs for truthy conditions\nelse:\n     this part of code runs for false conditions" },
      { t: "code", lang: "python", c: "a = 3\nif a < 0:\n    print('A is a negative number')\nelse:\n    print('A is a positive number')" },
      { t: "p", c: "เงื่อนไขข้างต้นเป็น false ดังนั้น else block จึงถูกรัน ถ้าเงื่อนไขมีมากกว่าสองแบบเราใช้ elif" },

      { t: "h3", c: "If Elif Else" },
      { t: "p", c: "ในชีวิตประจำวันเราตัดสินใจโดยตรวจสอบหลายเงื่อนไข เช่นเดียวกับชีวิต การเขียนโปรแกรมก็เต็มไปด้วยเงื่อนไข เราใช้ elif เมื่อมีหลายเงื่อนไข:" },
      { t: "code", lang: "python", c: "# syntax\nif condition:\n    code\nelif condition:\n    code\nelse:\n    code" },
      { t: "code", lang: "python", c: "a = 0\nif a > 0:\n    print('A is a positive number')\nelif a < 0:\n    print('A is a negative number')\nelse:\n    print('A is zero')" },

      { t: "h3", c: "Short Hand" },
      { t: "code", lang: "python", c: "# syntax\ncode if condition else code" },
      { t: "code", lang: "python", c: "a = 3\nprint('A is positive') if a > 0 else print('A is negative') # first condition met, 'A is positive' will be printed" },

      { t: "h3", c: "Nested Conditions" },
      { t: "p", c: "เงื่อนไขสามารถซ้อนกันได้:" },
      { t: "code", lang: "python", c: "# syntax\nif condition:\n    code\n    if condition:\n    code" },
      { t: "code", lang: "python", c: "a = 0\nif a > 0:\n    if a % 2 == 0:\n        print('A is a positive and even integer')\n    else:\n        print('A is a positive number')\nelif a == 0:\n    print('A is zero')\nelse:\n    print('A is a negative number')" },
      { t: "p", c: "เราหลีกเลี่ยง nested condition ได้โดยใช้ logical operator and:" },

      { t: "h3", c: "If Condition และ Logical Operators" },
      { t: "code", lang: "python", c: "# syntax\nif condition and condition:\n    code" },
      { t: "code", lang: "python", c: "a = 0\nif a > 0 and a % 2 == 0:\n        print('A is an even and positive integer')\nelif a > 0 and a % 2 !=  0:\n     print('A is a positive integer')\nelif a == 0:\n    print('A is zero')\nelse:\n    print('A is negative')" },

      { t: "h3", c: "If และ Or Logical Operators" },
      { t: "code", lang: "python", c: "# syntax\nif condition or condition:\n    code" },
      { t: "code", lang: "python", c: "user = 'James'\naccess_level = 3\nif user == 'admin' or access_level >= 4:\n        print('Access granted!')\nelse:\n    print('Access denied!')" },

      { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 9" },

      { t: "h3", c: "ระดับ 1" },
      { t: "ol", c: [
        "รับ input อายุจากผู้ใช้ด้วย input(\"Enter your age: \") ถ้าผู้ใช้อายุ 18 ปีขึ้นไปให้แสดง: You are old enough to drive. ถ้าต่ำกว่า 18 ให้แสดงว่าต้องรออีกกี่ปี",
      ]},
      { t: "code", lang: "sh", c: "Enter your age: 30\nYou are old enough to learn to drive.\n\nEnter your age: 15\nYou need 3 more years to learn to drive." },
      { t: "ol", c: [
        "เปรียบเทียบค่า my_age กับ your_age ด้วย if…else ใครอายุมากกว่ากัน? ใช้ input(\"Enter your age: \") รับอายุ ใช้ nested condition เพื่อ print 'year' ถ้าต่างกัน 1 ปี 'years' ถ้าต่างกันมากกว่า และข้อความ custom ถ้าอายุเท่ากัน",
      ], start: 2 },
      { t: "code", lang: "sh", c: "Enter your age: 30\nYou are 5 years older than me." },
      { t: "ol", c: [
        "รับตัวเลขสองตัวจากผู้ใช้ ถ้า a มากกว่า b ให้แสดง a is greater than b ถ้า a น้อยกว่า b ให้แสดง a is smaller than b ไม่งั้นให้แสดง a is equal to b",
      ], start: 3 },
      { t: "code", lang: "sh", c: "Enter number one: 4\nEnter number two: 3\n4 is greater than 3" },

      { t: "h3", c: "ระดับ 2" },
      { t: "ol", c: [
        "เขียนโค้ดที่ให้เกรดนักเรียนตามคะแนน:",
      ]},
      { t: "code", lang: "sh", c: "90-100, A\n80-89, B\n70-79, C\n60-69, D\n0-59, F" },
      { t: "ol", c: [
        "รับเดือนจาก input แล้วเช็คว่าเป็นฤดูอะไร:\nSeptember, October หรือ November = Autumn\nDecember, January หรือ February = Winter\nMarch, April หรือ May = Spring\nJune, July หรือ August = Summer",
      ], start: 2 },
      { t: "ol", c: [
        "List ต่อไปนี้มีผลไม้:",
      ], start: 3 },
      { t: "code", lang: "python", c: "fruits = ['banana', 'orange', 'mango', 'lemon']" },
      { t: "p", c: "ถ้าผลไม้ไม่มีใน list ให้เพิ่มแล้ว print list ที่แก้ไขแล้ว ถ้ามีอยู่แล้วให้ print: That fruit already exist in the list" },

      { t: "h3", c: "ระดับ 3" },
      { t: "ol", c: [
        "Person dictionary ต่อไปนี้ (แก้ไขได้ตามต้องการ):",
      ]},
      { t: "code", lang: "python", c: "person={\n    'first_name': 'Asabeneh',\n    'last_name': 'Yetayeh',\n    'age': 250,\n    'country': 'Finland',\n    'is_married': True,\n    'skills': ['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],\n    'address': {\n        'street': 'Space street',\n        'zipcode': '02210'\n    }\n}" },
      { t: "ul", c: [
        "เช็คว่า person dictionary มี key skills หรือไม่ ถ้ามีให้ print middle skill ใน skills list",
        "เช็คว่า person มี skill 'Python' หรือไม่แล้ว print ผลลัพธ์",
        "ถ้า skills มีแค่ JavaScript กับ React ให้ print 'He is a front end developer' ถ้ามี Node, Python, MongoDB ให้ print 'He is a backend developer' ถ้ามี React, Node และ MongoDB ให้ print 'He is a fullstack developer' ไม่งั้นให้ print 'unknown title'",
        "ถ้า person แต่งงานแล้วและอยู่ใน Finland ให้ print ข้อมูลในรูปแบบ: Asabeneh Yetayeh lives in Finland. He is married.",
      ]},
    ],
  },
};
