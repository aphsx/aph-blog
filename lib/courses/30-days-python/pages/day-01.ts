import type { Page } from "@/lib/types";

export const day01Page: Record<string, Page> = {
  "py30-day01": {
    slug: "py30-day01",
    title: "วันที่ 1 — บทนำ (Introduction)",
    lead: "รู้จัก Python, ติดตั้งให้พร้อม แล้วเขียนโปรแกรมแรก — เริ่มต้นการเดินทาง 30 วัน",
    group: "สัปดาห์ที่ 1: พื้นฐาน Python",
    blocks: [
      { t: "p", c: "ยินดีที่คุณตัดสินใจเข้าร่วม challenge 30 วัน Python ในระหว่างนี้คุณจะได้เรียนทุกอย่างที่จำเป็นสำหรับการเป็นโปรแกรมเมอร์ Python รวมถึงแนวคิดพื้นฐานของการเขียนโปรแกรม" },

      { t: "h2", c: "Python คืออะไร" },
      { t: "p", c: "Python เป็นภาษาโปรแกรมระดับสูง (high-level programming language) สำหรับงานทั่วไป เป็น open source, interpreted และ object-oriented Python ถูกสร้างโดย Guido van Rossum โปรแกรมเมอร์ชาวดัตช์ ชื่อ Python มาจากรายการตลก Monty Python's Flying Circus เวอร์ชันแรกเปิดตัวเมื่อ 20 กุมภาพันธ์ 1991" },
      { t: "p", c: "challenge 30 วัน Python นี้จะช่วยให้คุณเรียน Python 3 ทีละขั้น หัวข้อถูกแบ่งเป็น 30 วัน แต่ละวันมีหลายหัวข้อพร้อมคำอธิบายที่เข้าใจง่าย ตัวอย่างจากโลกจริง และแบบฝึกหัดมากมาย" },

      { t: "h2", c: "ทำไมต้อง Python" },
      { t: "p", c: "Python เป็นภาษาที่ใกล้เคียงภาษามนุษย์ที่สุด จึงเรียนรู้และใช้งานได้ง่าย Python ถูกใช้โดยบริษัทและอุตสาหกรรมต่าง ๆ รวมถึง Google ใช้พัฒนาเว็บแอปพลิเคชัน, เดสก์ท็อปแอป, การจัดการระบบ และ machine learning libraries Python ได้รับความนิยมมากในวงการ data science และ machine learning" },

      { t: "h2", c: "ติดตั้งสภาพแวดล้อม (Environment Setup)" },

      { t: "h3", c: "ติดตั้ง Python" },
      { t: "p", c: "ดาวน์โหลด Python ได้ที่ python.org เลือก Python 3.x (เวอร์ชัน 3.6 ขึ้นไป) หลังติดตั้งแล้วตรวจสอบด้วยคำสั่งในเทอร์มินัล:" },
      { t: "code", lang: "shell", c: "python3 --version" },
      { t: "p", c: "ถ้าเห็น Python 3.x.x แสดงว่าติดตั้งสำเร็จแล้ว" },

      { t: "h3", c: "Python Shell" },
      { t: "p", c: "Python เป็น interpreted language หมายความว่าไม่ต้องคอมไพล์ก่อน มันรันโค้ดทีละบรรทัด Python มาพร้อมกับ Python Shell (Python Interactive Shell) สำหรับทดลองรันคำสั่งเดี่ยว ๆ และดูผลทันที เปิดเทอร์มินัลแล้วพิมพ์:" },
      { t: "code", lang: "shell", c: "python" },
      { t: "p", c: "Python Shell จะเปิดขึ้นพร้อมสัญลักษณ์ >>> รอรับคำสั่ง พิมพ์โค้ดแล้วกด Enter เพื่อดูผลทันที ถ้าต้องการปิด Shell ให้พิมพ์ exit() แล้วกด Enter" },
      { t: "p", c: "Python จะคืนผลลัพธ์ถ้าเขียน script ที่มันเข้าใจ ถ้าไม่ได้จะ return error เช่น SyntaxError ซึ่งบอกว่าต้องแก้ตรงไหน กระบวนการค้นหาและแก้ error เรียกว่า debugging" },
      { t: "p", c: "ลองทำคณิตศาสตร์พื้นฐานใน Python Shell:" },
      { t: "code", lang: "python", c: "# comment ขึ้นต้นด้วย hash (#)\n# Python จะไม่ประมวลผลบรรทัดนี้\n# Python is eating the world\n\n2 + 3   # 5\n3 - 2   # 1\n3 * 2   # 6\n3 / 2   # 1.5\n3 ** 2  # 9  (ยกกำลัง: 3 x 3)\n3 % 2   # 1  (หาเศษ)\n3 // 2  # 1  (หารทิ้งเศษ)" },

      { t: "h3", c: "ติดตั้ง Visual Studio Code" },
      { t: "p", c: "Python Shell เหมาะสำหรับทดสอบโค้ดเล็ก ๆ แต่สำหรับโปรเจกต์จริงต้องใช้ code editor ดาวน์โหลด Visual Studio Code ได้ที่ code.visualstudio.com เป็น open source text editor ที่ได้รับความนิยมมากที่สุด" },
      { t: "p", c: "สร้างโฟลเดอร์ 30DaysOfPython บน desktop แล้วเปิดด้วย VS Code จากนั้นสร้างไฟล์ helloworld.py เพื่อเริ่มเขียนโค้ด รันไฟล์ด้วยการกดปุ่ม play สีเขียวใน VS Code หรือพิมพ์ python helloworld.py ในเทอร์มินัล" },

      { t: "h2", c: "พื้นฐาน Python" },

      { t: "h3", c: "Syntax ของ Python" },
      { t: "p", c: "Python script เขียนได้ใน Python Shell หรือใน code editor ไฟล์ Python มีนามสกุล .py" },

      { t: "h3", c: "การเยื้อง (Indentation)" },
      { t: "p", c: "การเยื้อง (indentation) คือช่องว่างหน้าบรรทัดโค้ด ในหลายภาษาการเยื้องทำเพื่อให้อ่านง่าย แต่ใน Python การเยื้องใช้สร้างบล็อกโค้ด ภาษาอื่น ๆ ใช้วงเล็บปีกกา {} แต่ Python ใช้ indentation แทน การเยื้องผิดจะทำให้เกิด IndentationError ซึ่งเป็นข้อผิดพลาดที่พบบ่อยมากในหมู่มือใหม่" },

      { t: "h3", c: "คอมเมนต์ (Comments)" },
      { t: "p", c: "คอมเมนต์คือข้อความในโค้ดที่ Python ไม่ประมวลผล มีบทบาทสำคัญในการเพิ่มความสามารถในการอ่านโค้ดและให้นักพัฒนาฝากข้อความในโค้ดได้ ข้อความที่ขึ้นต้นด้วย hash (#) คือคอมเมนต์" },
      { t: "code", lang: "python", c: "# This is the first comment\n# This is the second comment\n# Python is eating the world" },
      { t: "p", c: "สำหรับคอมเมนต์หลายบรรทัด ใช้เครื่องหมายคำพูดสาม (ถ้าไม่ได้กำหนดให้ตัวแปร Python จะข้ามไป):" },
      { t: "code", lang: "python", c: "\"\"\"This is multiline comment\nmultiline comment takes multiple lines.\npython is eating the world\n\"\"\"" },

      { t: "h2", c: "ชนิดข้อมูล (Data Types)" },
      { t: "p", c: "Python มีชนิดข้อมูลหลายประเภท ต่อไปนี้คือชนิดที่พบบ่อย แต่ละชนิดจะถูกเจาะลึกในบทถัด ๆ ไป ตอนนี้รู้จักภาพรวมไว้ก่อน" },

      { t: "h3", c: "ตัวเลข (Number)" },
      { t: "ul", c: [
        "Integer (จำนวนเต็ม) — ตัวอย่าง: ..., -3, -2, -1, 0, 1, 2, 3, ...",
        "Float (ทศนิยม) — ตัวอย่าง: ..., -3.5, -2.25, -1.0, 0.0, 1.1, 2.2, 3.5, ...",
        "Complex (จำนวนเชิงซ้อน) — ตัวอย่าง: 1 + j, 2 + 4j",
      ]},

      { t: "h3", c: "สตริง (String)" },
      { t: "p", c: "ชุดตัวอักษรหนึ่งตัวขึ้นไปที่อยู่ในเครื่องหมายคำพูดเดี่ยวหรือคู่ ถ้ามีมากกว่าหนึ่งประโยคใช้เครื่องหมายสาม:" },
      { t: "code", lang: "python", c: "'Asabeneh'\n'Finland'\n'Python'\n'I love teaching'\n'I hope you are enjoying the first day of 30DaysOfPython Challenge'" },

      { t: "h3", c: "บูลีน (Boolean)" },
      { t: "p", c: "ชนิดข้อมูลที่มีค่าได้แค่สองค่า: True หรือ False โดย T และ F ต้องเป็นตัวพิมพ์ใหญ่เสมอ:" },
      { t: "code", lang: "python", c: "True   #  Is the light on? If it is on, then the value is True\nFalse  # Is the light on? If it is off, then the value is False" },

      { t: "h3", c: "ลิสต์ (List)" },
      { t: "p", c: "ลิสต์ใน Python คือชุดข้อมูลที่เรียงลำดับ แก้ไขได้ และอนุญาตให้มีข้อมูลซ้ำ สามารถเก็บชนิดข้อมูลที่ต่างกันได้ (คล้าย array ใน JavaScript):" },
      { t: "code", lang: "python", c: "[0, 1, 2, 3, 4, 5]                            # all are the same data types - a list of numbers\n['Banana', 'Orange', 'Mango', 'Avocado']      # all the same data types - a list of strings (fruits)\n['Finland', 'Estonia', 'Sweden', 'Norway']    # all the same data types - a list of strings (countries)\n['Banana', 10, False, 9.81]                   # different data types in the list" },

      { t: "h3", c: "ดิกชันนารี (Dictionary)" },
      { t: "p", c: "ดิกชันนารีเก็บข้อมูลในรูปแบบ key-value pairs ไม่มีลำดับ:" },
      { t: "code", lang: "python", c: "{\n    'first_name': 'Asabeneh',\n    'last_name':  'Yetayeh',\n    'country':    'Finland',\n    'age':        250,\n    'is_married': True,\n    'skills':     ['JS', 'React', 'Node', 'Python']\n}" },

      { t: "h3", c: "ทูเพิล (Tuple)" },
      { t: "p", c: "ทูเพิลเหมือนลิสต์แต่ไม่สามารถแก้ไขได้หลังสร้าง (immutable):" },
      { t: "code", lang: "python", c: "('Asabeneh', 'Pawel', 'Brook', 'Abraham', 'Lidiya')  # Names\n\n('Earth', 'Jupiter', 'Neptune', 'Mars', 'Venus', 'Saturn', 'Uranus', 'Mercury')  # planets" },

      { t: "h3", c: "เซต (Set)" },
      { t: "p", c: "เซตเหมือนลิสต์แต่ไม่มีลำดับ ไม่มีดัชนี และไม่มีข้อมูลซ้ำ (เหมือนเซตในคณิตศาสตร์):" },
      { t: "code", lang: "python", c: "{2, 4, 3, 5}\n{3.14, 9.81, 2.7}  # order is not important in set" },

      { t: "h2", c: "เช็คชนิดข้อมูล" },
      { t: "p", c: "ใช้ฟังก์ชัน type() เพื่อเช็คชนิดข้อมูลของตัวแปรหรือค่าต่าง ๆ ลองพิมพ์ใน Python Shell:" },
      { t: "code", lang: "python", c: "print(type(10))                   # <class 'int'>\nprint(type(3.14))                 # <class 'float'>\nprint(type(1 + 3j))               # <class 'complex'>\nprint(type('Asabeneh'))           # <class 'str'>\nprint(type([1, 2, 3]))            # <class 'list'>\nprint(type({'name': 'Asabeneh'})) # <class 'dict'>\nprint(type({9.8, 3.14, 2.7}))    # <class 'set'>\nprint(type((9.8, 3.14, 2.7)))    # <class 'tuple'>" },

      { t: "h2", c: "ไฟล์ Python (helloworld.py)" },
      { t: "p", c: "เปิดโฟลเดอร์ 30DaysOfPython และสร้างไฟล์ helloworld.py เมื่อเขียนโค้ดในไฟล์ต้องใช้ print() เพื่อแสดงผล (ต่างจากใน Shell ที่แสดงผลอัตโนมัติ)" },
      { t: "code", lang: "python", c: "# Day 1 - 30DaysOfPython Challenge\n\nprint(2 + 3)             # addition(+)\nprint(3 - 1)             # subtraction(-)\nprint(2 * 3)             # multiplication(*)\nprint(3 / 2)             # division(/)\nprint(3 ** 2)            # exponential(**)\nprint(3 % 2)             # modulus(%)\nprint(3 // 2)            # Floor division operator(//)\n\n# Checking data types\nprint(type(10))                     # Int\nprint(type(3.14))                   # Float\nprint(type(1 + 3j))                 # Complex number\nprint(type('Asabeneh'))             # String\nprint(type([1, 2, 3]))              # List\nprint(type({'name': 'Asabeneh'}))   # Dictionary\nprint(type({9.8, 3.14, 2.7}))      # Set\nprint(type((9.8, 3.14, 2.7)))      # Tuple" },

      { t: "h2", c: "แบบฝึกหัด — วันที่ 1" },

      { t: "h3", c: "ระดับ 1" },
      { t: "ol", c: [
        "เช็คเวอร์ชัน Python ที่คุณใช้อยู่",
        "เปิด Python Shell แล้วทำการคำนวณต่อไปนี้ โดยใช้ตัวเลข 3 และ 4: บวก (+), ลบ (-), คูณ (*), หาเศษ (%), หาร (/), ยกกำลัง (**), หารทิ้งเศษ (//)",
        "เขียนสตริงต่อไปนี้ใน Python Shell: ชื่อของคุณ, นามสกุล, ประเทศ, 'I am enjoying 30 days of python'",
        "เช็คชนิดข้อมูลต่อไปนี้ด้วย type(): 10, 9.8, 3.14, 4 - 4j, ['Asabeneh', 'Python', 'Finland'], ชื่อ, นามสกุล, ประเทศของคุณ",
      ]},

      { t: "h3", c: "ระดับ 2" },
      { t: "ol", c: [
        "สร้างโฟลเดอร์ day_1 ใน 30DaysOfPython แล้วสร้างไฟล์ helloworld.py ทำแบบฝึกหัดระดับ 1 ซ้ำในไฟล์นี้โดยใช้ print() ทุกครั้ง จากนั้น navigate ไปที่โฟลเดอร์แล้วรันไฟล์",
      ]},

      { t: "h3", c: "ระดับ 3" },
      { t: "ol", c: [
        "เขียนตัวอย่างของชนิดข้อมูลแต่ละประเภท: Number (Integer, Float, Complex), String, Boolean, List, Tuple, Set, Dictionary",
        "คำนวณ Euclidean distance ระหว่างจุด (2, 3) และ (10, 8) — สูตร: √((x2-x1)² + (y2-y1)²)",
      ]},
    ],
  },
};
