import type { Page } from "@/lib/types";

const IMG = "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day02Page: Record<string, Page> = {
  "py30-day02": {
    slug: "py30-day02",
    title: "วันที่ 2 — ตัวแปร & ฟังก์ชันพื้นฐาน (Variables & Built-in Functions)",
    lead: "เรียนรู้การสร้างตัวแปร, ชนิดข้อมูล และฟังก์ชันในตัวที่ Python มีให้ใช้งานทันที",
    group: "สัปดาห์ที่ 1: พื้นฐาน Python",
    blocks: [
      { t: "h2", c: "ฟังก์ชันพื้นฐาน (Built-in Functions)" },
      { t: "p", c: "ใน Python มีฟังก์ชันพื้นฐาน (built-in functions) จำนวนมากที่พร้อมใช้งานทั่วโลก ฟังก์ชันเหล่านี้คือฟังก์ชันที่ถูกสร้างมาพร้อมกับ Python เราสามารถใช้งานได้โดยไม่ต้อง import หรือ configure อะไรเพิ่มเติม ฟังก์ชันพื้นฐานที่พบบ่อย ได้แก่: print(), len(), type(), int(), float(), str(), input(), list(), dict(), min(), max(), sum(), sorted(), open(), file(), help() และ dir() ดูรายการฟังก์ชันใน Python ทั้งหมดได้ที่ลิงก์นี้: https://docs.python.org/3.9/library/functions.html" },
      { t: "image", src: `${IMG}/builtin-functions.png`, alt: "ฟังก์ชันพื้นฐานใน Python", caption: "ฟังก์ชันพื้นฐานที่มีใน Python" },
      { t: "p", c: "เปิด Python Shell แล้วลองใช้ฟังก์ชันพื้นฐานเหล่านี้ดู:" },
      { t: "image", src: `${IMG}/builtin-functions_practice.png`, alt: "ฝึกใช้ฟังก์ชันพื้นฐาน", caption: "ฝึกใช้ฟังก์ชันพื้นฐานใน Python Shell" },
      { t: "p", c: "ลองใช้ help() และ dir() เพื่อสำรวจ Python เพิ่มเติม:" },
      { t: "image", src: `${IMG}/help_and_dir_builtin.png`, alt: "help() และ dir()", caption: "การใช้ help() และ dir() ใน Python Shell" },
      { t: "image", src: `${IMG}/builtin-functional-final.png`, alt: "ผลลัพธ์ฟังก์ชันพื้นฐาน", caption: "ตัวอย่างผลลัพธ์จากฟังก์ชันพื้นฐาน" },

      { t: "h2", c: "ตัวแปร (Variables)" },
      { t: "p", c: "ตัวแปร (Variables) คือที่เก็บข้อมูลในหน่วยความจำของคอมพิวเตอร์ ตัวแปรที่ตั้งชื่อเพื่อช่วยจำ (mnemonic variables) แนะนำให้ใช้ เนื่องจากจะทำให้โค้ดอ่านง่ายขึ้น ตัวแปรคืออ้างอิงไปยังตำแหน่งที่เก็บข้อมูลในหน่วยความจำ ห้ามใช้เลขนำหน้าชื่อตัวแปร ห้ามใช้อักขระพิเศษ และห้ามใช้ยัติภังค์ในชื่อตัวแปร ตัวแปรมีชื่อสั้นเช่น x, y, z แต่ควรตั้งชื่อที่สื่อความหมายมากกว่าเสมอ เช่น firstname, lastname, age, country" },

      { t: "h3", c: "กฎการตั้งชื่อตัวแปร Python" },
      { t: "ul", c: [
        "ชื่อตัวแปรต้องขึ้นต้นด้วยตัวอักษรหรือ underscore (_)",
        "ชื่อตัวแปรห้ามขึ้นต้นด้วยตัวเลข",
        "ชื่อตัวแปรประกอบด้วยตัวอักษร ตัวเลข และ underscore เท่านั้น (A-z, 0-9, _)",
        "ชื่อตัวแปร case-sensitive — firstname, Firstname, FirstName และ FIRSTNAME คือตัวแปรคนละตัว",
      ]},
      { t: "p", c: "ชื่อตัวแปรที่ถูกต้อง (valid):" },
      { t: "code", lang: "shell", c: "firstname\nlastname\nage\ncountry\ncity\nfirst_name\nlast_name\ncapital_city\n_if          # ถ้าต้องการใช้คำสงวนเป็นชื่อตัวแปร\nyear_2021\nyear2021\ncurrent_year_2021\nbirth_year\nnum1\nnum2" },
      { t: "p", c: "ชื่อตัวแปรที่ไม่ถูกต้อง (invalid):" },
      { t: "code", lang: "shell", c: "first-name\nfirst@name\nfirst$name\nnum-1\n1num" },
      { t: "p", c: "นักพัฒนา Python หลายคนใช้รูปแบบ snake_case (snake_case_variable_name) เมื่อกำหนดค่าให้ตัวแปร เครื่องหมาย = คือ assignment operator ไม่ใช่สัญลักษณ์ \"เท่ากับ\" ทางคณิตศาสตร์ ตัวอย่างด้านล่างแสดงให้เห็นการกำหนดค่าตัวแปรใน Python" },
      { t: "code", lang: "python", c: "# Variables in Python\nfirst_name  = 'Asabeneh'\nlast_name   = 'Yetayeh'\ncountry     = 'Finland'\ncity        = 'Helsinki'\nage         = 250\nis_married  = True\nskills      = ['HTML', 'CSS', 'JS', 'React', 'Python']\nperson_info = {\n    'firstname': 'Asabeneh',\n    'lastname':  'Yetayeh',\n    'country':   'Finland',\n    'city':      'Helsinki'\n}" },
      { t: "p", c: "มาลองใช้ฟังก์ชัน print() และ len() กับตัวแปรที่ประกาศไว้:" },
      { t: "code", lang: "python", c: "print('Hello, World!')                 # Hello, World!\nprint('Hello',',','World','!')         # Hello , World !\nprint(len('Hello, World!'))            # 13\n\nprint('First name:', first_name)\nprint('First name length:', len(first_name))\nprint('Last name: ', last_name)\nprint('Last name length: ', len(last_name))\nprint('Country: ', country)\nprint('City: ', city)\nprint('Age: ', age)\nprint('Married: ', is_married)\nprint('Skills: ', skills)\nprint('Person information: ', person_info)" },

      { t: "h3", c: "กำหนดตัวแปรหลายตัวพร้อมกัน (Multiple Assignment)" },
      { t: "code", lang: "python", c: "first_name, last_name, country, age, is_married = 'Asabeneh', 'Yetayeh', 'Helsinki', 250, True\n\nprint(first_name, last_name, country, age, is_married)\nprint('First name:', first_name)\nprint('Last name: ', last_name)\nprint('Country: ', country)\nprint('Age: ', age)\nprint('Married: ', is_married)" },
      { t: "p", c: "รับข้อมูลจากผู้ใช้ด้วย input() built-in function:" },
      { t: "code", lang: "python", c: "first_name = input('What is your name: ')\nage        = input('How old are you? ')\n\nprint(first_name)\nprint(age)" },

      { t: "h2", c: "ชนิดข้อมูล (Data Types)" },
      { t: "p", c: "ใน Python มีชนิดข้อมูลหลายประเภท เมื่อพูดถึงการเขียนโปรแกรม ทุกอย่างล้วนเกี่ยวข้องกับชนิดข้อมูล ชนิดข้อมูลจะถูกอธิบายอย่างละเอียดในบทของตัวเอง แต่ตอนนี้เรามาทำความเข้าใจคร่าว ๆ กันก่อน:" },
      { t: "ul", c: [
        "ตัวเลข (Numbers): integers, floats, complex numbers",
        "สตริง (String): ชุดตัวอักษรใต้ single, double หรือ triple quotes",
        "Boolean: True หรือ False",
        "ลิสต์ (List): ชุดของค่าหลายประเภท เรียงลำดับและแก้ไขได้",
        "Dictionary: ชุดของ key-value pairs ไม่มีลำดับ",
        "Tuple: ชุดของค่าหลายประเภท เรียงลำดับแต่แก้ไขไม่ได้",
        "Set: ชุดของค่าที่ไม่ซ้ำกัน",
      ]},

      { t: "h2", c: "เช็คชนิดข้อมูลและการแปลง (Checking Data types and Casting)" },

      { t: "h3", c: "เช็คชนิดข้อมูล" },
      { t: "p", c: "เราสามารถเช็คชนิดข้อมูลของข้อมูลได้ด้วยฟังก์ชัน type() ดังตัวอย่าง:" },
      { t: "code", lang: "python", c: "# Different python data types\nfirst_name = 'Asabeneh'   # str\nlast_name  = 'Yetayeh'    # str\ncountry    = 'Finland'    # str\ncity       = 'Helsinki'   # str\nage        = 250          # int, not my real age, don't worry about it\n\n# Printing out types\nprint(type('Asabeneh'))           # <class 'str'>\nprint(type(first_name))           # <class 'str'>\nprint(type(10))                   # <class 'int'>\nprint(type(3.14))                 # <class 'float'>\nprint(type(1 + 1j))               # <class 'complex'>\nprint(type(True))                 # <class 'bool'>\nprint(type([1, 2, 3, 4]))         # <class 'list'>\nprint(type({'name':'Asabeneh'}))  # <class 'dict'>\nprint(type((1, 2)))               # <class 'tuple'>\nprint(type(zip([1,2],[3,4])))     # <class 'zip'>" },

      { t: "h3", c: "การแปลงชนิดข้อมูล (Casting)" },
      { t: "p", c: "เราสามารถแปลงชนิดข้อมูลหนึ่งไปเป็นอีกชนิดได้ เรียกว่า casting หรือ type conversion การแปลงใช้ฟังก์ชัน int(), float(), str(), list(), set() เมื่อทำการคำนวณเลขที่เป็น string เราต้องแปลงให้เป็น int หรือ float ก่อน และถ้าต้องการต่อสตริงกับตัวเลข ต้องแปลงตัวเลขเป็น str ก่อน" },
      { t: "code", lang: "python", c: "# int to float\nnum_int = 10\nprint('num_int',num_int)         # 10\nnum_float = float(num_int)\nprint('num_float:', num_float)   # 10.0\n\n# float to int\ngravity = 9.81\nprint(int(gravity))              # 9\n\n# int to str\nnum_int = 10\nprint(num_int)                   # 10\nnum_str = str(num_int)\nprint(num_str)                   # '10'\n\n# str to int or float\nnum_str = '10.6'\nnum_float = float(num_str)\nprint('num_int', int(num_str))       # 10\nprint('num_float', float(num_str))   # 10.6\nnum_int = int(num_float)\nprint('num_int', int(num_int))       # 10\n\n# str to list\nfirst_name = 'Asabeneh'\nprint(first_name)                    # 'Asabeneh'\nfirst_name_to_list = list(first_name)\nprint(first_name_to_list)            # ['A', 's', 'a', 'b', 'e', 'n', 'e', 'h']" },

      { t: "h2", c: "ตัวเลข (Numbers)" },
      { t: "p", c: "ชนิดตัวเลขใน Python:" },
      { t: "ol", c: [
        "Integers: จำนวนเต็ม (บวก ลบ และศูนย์) เช่น ..., -3, -2, -1, 0, 1, 2, 3, ...",
        "Floating Point Numbers (Floats): ทศนิยม เช่น ..., -3.5, -2.25, -1.0, 0.0, 1.1, 2.2, 3.5, ...",
        "Complex Numbers: จำนวนเชิงซ้อน เช่น 1 + j, 2 + 4j, 1 - 1j",
      ]},

      { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 2" },

      { t: "h3", c: "ระดับ 1" },
      { t: "ol", c: [
        "สร้างโฟลเดอร์ชื่อ day_2 ใน 30DaysOfPython แล้วสร้างไฟล์ชื่อ variables.py",
        "เขียน Python comment ว่า 'Day 2: 30 Days of python programming'",
        "ประกาศตัวแปร first_name และกำหนดค่าเป็นชื่อของคุณ",
        "ประกาศตัวแปร last_name และกำหนดค่าเป็นนามสกุลของคุณ",
        "ประกาศตัวแปร full_name และกำหนดค่าเป็นชื่อ-นามสกุล",
        "ประกาศตัวแปร country และกำหนดค่าเป็นชื่อประเทศ",
        "ประกาศตัวแปร city และกำหนดค่าเป็นชื่อเมือง",
        "ประกาศตัวแปร age และกำหนดค่าเป็นอายุ",
        "ประกาศตัวแปร year และกำหนดค่าเป็นปีปัจจุบัน",
        "ประกาศตัวแปร is_married และกำหนดค่าเป็น boolean",
        "ประกาศตัวแปร is_true และกำหนดค่าเป็น boolean",
        "ประกาศตัวแปร is_light_on และกำหนดค่าเป็น boolean",
        "ประกาศตัวแปรหลายตัวในบรรทัดเดียว",
      ]},

      { t: "h3", c: "ระดับ 2" },
      { t: "ol", c: [
        "เช็คชนิดข้อมูลของตัวแปรทั้งหมดด้วย type()",
        "ใช้ len() หาความยาวของ first_name",
        "เปรียบเทียบความยาวของ first_name กับ last_name",
        "กำหนด 5 ให้กับ num_one และ 4 ให้กับ num_two",
        "บวก num_one กับ num_two แล้วเก็บผลในตัวแปร total",
        "ลบ num_two จาก num_one แล้วเก็บผลในตัวแปร diff",
        "คูณ num_two กับ num_one แล้วเก็บผลในตัวแปร product",
        "หาร num_one ด้วย num_two แล้วเก็บผลในตัวแปร division",
        "หาเศษของ num_two หาร num_one แล้วเก็บผลในตัวแปร remainder",
        "คำนวณ num_one ยกกำลัง num_two แล้วเก็บผลในตัวแปร exp",
        "หาผลการหารทิ้งเศษของ num_one ด้วย num_two แล้วเก็บผลในตัวแปร floor_division",
        "วงกลมมีรัศมี 30 เมตร: (1) คำนวณพื้นที่วงกลมและเก็บในตัวแปร area_of_circle (2) คำนวณเส้นรอบวงและเก็บในตัวแปร circum_of_circle (3) รับรัศมีจาก input() แล้วคำนวณพื้นที่",
        "ใช้ input() รับ first_name, last_name, country, age จากผู้ใช้แล้วเก็บในตัวแปร",
        "รัน help('keywords') ใน Python Shell เพื่อดูคำสงวนทั้งหมดของ Python",
      ]},
    ],
  },
};
