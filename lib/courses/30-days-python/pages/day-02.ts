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
      { t: "p", c: "ใน Python มีฟังก์ชันพื้นฐานจำนวนมากที่พร้อมใช้งานได้เลย ซึ่งหมายความว่าเราสามารถใช้ฟังก์ชันพื้นฐานได้โดยไม่ต้อง import หรือ configure อะไรเพิ่มเติม ฟังก์ชันพื้นฐานที่ใช้บ่อยที่สุดได้แก่: print(), len(), type(), int(), float(), str(), input(), list(), dict(), min(), max(), sum(), sorted(), open(), file(), help() และ dir() ดูรายการฟังก์ชันทั้งหมดได้ที่ python documentation: https://docs.python.org/3.9/library/functions.html" },
      { t: "image", src: `${IMG}/builtin-functions.png`, alt: "Built-in Functions", caption: "ฟังก์ชันพื้นฐานที่มีใน Python" },
      { t: "p", c: "เปิด Python Shell แล้วลองใช้ฟังก์ชันพื้นฐานเหล่านี้ดู:" },
      { t: "image", src: `${IMG}/builtin-functions_practice.png`, alt: "Built-in functions practice", caption: "ฝึกใช้ฟังก์ชันพื้นฐานใน Python Shell" },
      { t: "p", c: "ลองใช้ help() และ dir() เพิ่มเติม:" },
      { t: "image", src: `${IMG}/help_and_dir_builtin.png`, alt: "Help and Dir built-in functions", caption: "การใช้ help() และ dir() ใน Python Shell" },
      { t: "p", c: "ตัวอย่างเพิ่มเติมของฟังก์ชัน min(), max() และ sum():" },
      { t: "image", src: `${IMG}/builtin-functional-final.png`, alt: "min max sum functions", caption: "ตัวอย่างการใช้ min(), max(), sum() ใน Python Shell" },

      { t: "h2", c: "ตัวแปร (Variables)" },
      { t: "p", c: "ตัวแปรเก็บข้อมูลไว้ในหน่วยความจำของคอมพิวเตอร์ แนะนำให้ใช้ตัวแปรที่ตั้งชื่อเพื่อช่วยจำ (mnemonic variables) ในภาษาโปรแกรมหลาย ๆ ภาษา ตัวแปรที่ตั้งชื่อได้จำง่ายคือตัวแปรที่จำได้ง่ายและเชื่อมโยงกับค่าที่เก็บได้ ตัวแปรอ้างถึงที่อยู่ในหน่วยความจำที่เก็บข้อมูลนั้นไว้" },

      { t: "h3", c: "กฎการตั้งชื่อตัวแปร" },
      { t: "ul", c: [
        "ชื่อตัวแปรต้องขึ้นต้นด้วยตัวอักษรหรือ underscore (_)",
        "ชื่อตัวแปรห้ามขึ้นต้นด้วยตัวเลข",
        "ชื่อตัวแปรประกอบด้วยตัวอักษร ตัวเลข และ underscore เท่านั้น (A-z, 0-9, _)",
        "ชื่อตัวแปร case-sensitive — firstname, Firstname, FirstName และ FIRSTNAME คือตัวแปรคนละตัว",
      ]},
      { t: "p", c: "ตัวอย่างชื่อตัวแปรที่ถูกต้อง (valid):" },
      { t: "code", lang: "shell", c: "firstname\nlastname\nage\ncountry\ncity\nfirst_name\nlast_name\ncapital_city\n_if          # ถ้าต้องการใช้ keyword เป็นชื่อตัวแปร\nyear_2021\nyear2021\ncurrent_year_2021\nbirth_year\nnum1\nnum2" },
      { t: "p", c: "ตัวอย่างชื่อตัวแปรที่ไม่ถูกต้อง (invalid):" },
      { t: "code", lang: "shell", c: "first-name\nfirst@name\nfirst$name\nnum-1\n1num" },
      { t: "p", c: "นักพัฒนา Python ใช้รูปแบบ snake_case ในการตั้งชื่อตัวแปร เมื่อกำหนดค่าให้ตัวแปร เครื่องหมาย = คือ assignment operator ไม่ใช่เครื่องหมายเท่ากับในทางคณิตศาสตร์" },
      { t: "code", lang: "python", c: "# Variables in Python\nfirst_name = 'Asabeneh'\nlast_name  = 'Yetayeh'\ncountry    = 'Finland'\ncity       = 'Helsinki'\nage        = 250\nis_married = True\nskills     = ['HTML', 'CSS', 'JS', 'React', 'Python']\nperson_info = {\n   'firstname':'Asabeneh',\n   'lastname':'Yetayeh',\n   'country':'Finland',\n   'city':'Helsinki'\n   }" },
      { t: "code", lang: "python", c: "print('Hello, World!') # The text Hello, World! is an argument\nprint('Hello',',', 'World','!') # it can take multiple arguments, four arguments have been passed\nprint(len('Hello, World!')) # it takes only one argument" },
      { t: "code", lang: "python", c: "# Printing the values stored in the variables\n\nprint('First name:', first_name)\nprint('First name length:', len(first_name))\nprint('Last name: ', last_name)\nprint('Last name length: ', len(last_name))\nprint('Country: ', country)\nprint('City: ', city)\nprint('Age: ', age)\nprint('Married: ', is_married)\nprint('Skills: ', skills)\nprint('Person information: ', person_info)" },

      { t: "h3", c: "การประกาศตัวแปรหลายตัวในบรรทัดเดียว (Declaring Multiple Variable in a Line)" },
      { t: "p", c: "ตัวแปรหลายตัวสามารถประกาศพร้อมกันในบรรทัดเดียวได้:" },
      { t: "code", lang: "python", c: "first_name, last_name, country, age, is_married = 'Asabeneh', 'Yetayeh', 'Helsink', 250, True\n\nprint(first_name, last_name, country, age, is_married)\nprint('First name:', first_name)\nprint('Last name: ', last_name)\nprint('Country: ', country)\nprint('Age: ', age)\nprint('Married: ', is_married)" },
      { t: "p", c: "รับข้อมูลจากผู้ใช้ด้วย input() built-in function:" },
      { t: "code", lang: "python", c: "first_name = input('What is your name: ')\nage = input('How old are you? ')\n\nprint(first_name)\nprint(age)" },

      { t: "h2", c: "ชนิดข้อมูล (Data Types)" },
      { t: "p", c: "ใน Python มีชนิดข้อมูลหลายประเภท ในการระบุชนิดข้อมูลเราใช้ฟังก์ชัน type() แต่ละชนิดข้อมูลจะถูกเรียนในบทของตัวเองโดยละเอียด" },

      { t: "h2", c: "เช็คชนิดข้อมูลและการแปลง (Checking Data types and Casting)" },
      { t: "p", c: "เช็คชนิดข้อมูล: ใช้ฟังก์ชัน type() เพื่อตรวจสอบชนิดข้อมูลของตัวแปรหรือค่าที่ต้องการ" },
      { t: "code", lang: "python", c: "# Different python data types\n# Let's declare variables with various data types\n\nfirst_name = 'Asabeneh'     # str\nlast_name  = 'Yetayeh'      # str\ncountry    = 'Finland'      # str\ncity       = 'Helsinki'     # str\nage        = 250            # int, it is not my real age, don't worry about it\n\n# Printing out types\nprint(type('Asabeneh'))          # str\nprint(type(first_name))          # str\nprint(type(10))                  # int\nprint(type(3.14))                # float\nprint(type(1 + 1j))              # complex\nprint(type(True))                # bool\nprint(type([1, 2, 3, 4]))        # list\nprint(type({'name':'Asabeneh'})) # dict\nprint(type((1,2)))               # tuple\nprint(type(zip([1,2],[3,4])))    # zip" },
      { t: "code", lang: "python", c: "# int to float\nnum_int = 10\nprint('num_int',num_int)         # 10\nnum_float = float(num_int)\nprint('num_float:', num_float)   # 10.0\n\n# float to int\ngravity = 9.81\nprint(int(gravity))              # 9\n\n# int to str\nnum_int = 10\nprint(num_int)                   # 10\nnum_str = str(num_int)\nprint(num_str)                   # '10'\n\n# str to int or float\nnum_str = '10.6'\nnum_float = float(num_str)  # Convert the string to a float first\nnum_int = int(num_float)    # Then convert the float to an integer\nprint('num_int', int(num_str))      # 10\nprint('num_float', float(num_str))  # 10.6\nnum_int = int(num_float)\nprint('num_int', int(num_int))      # 10\n\n# str to list\nfirst_name = 'Asabeneh'\nprint(first_name)                    # 'Asabeneh'\nfirst_name_to_list = list(first_name)\nprint(first_name_to_list)            # ['A', 's', 'a', 'b', 'e', 'n', 'e', 'h']" },

      { t: "h2", c: "ตัวเลข (Numbers)" },
      { t: "p", c: "ชนิดข้อมูลตัวเลขใน Python ได้แก่ integers, floating-point numbers และ complex numbers" },
      { t: "ol", c: [
        "Integers: จำนวนเต็ม (บวก ลบ ศูนย์) เช่น ..., -3, -2, -1, 0, 1, 2, 3, ...",
        "Floating Point Numbers (Floats): ตัวเลขทศนิยม เช่น ..., -3.5, -2.25, -1.0, 0.0, 1.1, 2.2, 3.5, ...",
        "Complex Numbers: จำนวนเชิงซ้อน เช่น 1 + j, 2 + 4j, 1 - 1j",
      ]},

      { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 2" },

      { t: "h3", c: "ระดับ 1" },
      { t: "ol", c: [
        "สร้างโฟลเดอร์ชื่อ day_2 ใน 30DaysOfPython แล้วสร้างไฟล์ชื่อ variables.py",
        "เขียน Python comment ว่า 'Day 2: 30 Days of python programming'",
        "ประกาศตัวแปร first name และกำหนดค่าให้",
        "ประกาศตัวแปร last name และกำหนดค่าให้",
        "ประกาศตัวแปร full name และกำหนดค่าให้",
        "ประกาศตัวแปร country และกำหนดค่าให้",
        "ประกาศตัวแปร city และกำหนดค่าให้",
        "ประกาศตัวแปร age และกำหนดค่าให้",
        "ประกาศตัวแปร year และกำหนดค่าให้",
        "ประกาศตัวแปร is_married และกำหนดค่าให้",
        "ประกาศตัวแปร is_true และกำหนดค่าให้",
        "ประกาศตัวแปร is_light_on และกำหนดค่าให้",
        "ประกาศตัวแปรหลายตัวในบรรทัดเดียว",
      ]},

      { t: "h3", c: "ระดับ 2" },
      { t: "ol", c: [
        "เช็คชนิดข้อมูลของตัวแปรทั้งหมดด้วย type() built-in function",
        "ใช้ len() built-in function หาความยาวของ first name",
        "เปรียบเทียบความยาวของ first name กับ last name",
        "กำหนด 5 ให้กับ num_one และ 4 ให้กับ num_two",
        "บวก num_one กับ num_two แล้วเก็บผลลัพธ์ในตัวแปร total",
        "ลบ num_two จาก num_one แล้วเก็บผลลัพธ์ในตัวแปร diff",
        "คูณ num_two กับ num_one แล้วเก็บผลลัพธ์ในตัวแปร product",
        "หาร num_one ด้วย num_two แล้วเก็บผลลัพธ์ในตัวแปร division",
        "ใช้ modulus division หา num_two หาร num_one แล้วเก็บผลลัพธ์ในตัวแปร remainder",
        "คำนวณ num_one ยกกำลัง num_two แล้วเก็บผลลัพธ์ในตัวแปร exp",
        "หาผลการหารทิ้งเศษของ num_one ด้วย num_two แล้วเก็บผลลัพธ์ในตัวแปร floor_division",
        "วงกลมมีรัศมี 30 เมตร:\n   1. คำนวณพื้นที่วงกลมและเก็บในตัวแปร area_of_circle\n   2. คำนวณเส้นรอบวงและเก็บในตัวแปร circum_of_circle\n   3. รับรัศมีจาก input() แล้วคำนวณพื้นที่",
        "ใช้ built-in input function รับ first name, last name, country และ age จากผู้ใช้แล้วเก็บในตัวแปรที่สอดคล้องกัน",
        "รัน help('keywords') ใน Python Shell หรือในไฟล์ เพื่อดูคำสงวน (reserved words) ของ Python",
      ]},
    ],
  },
};
