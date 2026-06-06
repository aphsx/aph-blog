import type { Page } from "@/lib/types";

export const day14Page: Record<string, Page> = {
  "py30-day14": {
    slug: "py30-day14",
    title: "วันที่ 14 — Higher Order Functions",
    lead: "เรียนรู้ Higher Order Functions, Closures, Decorators และ Built-in functions อย่าง map, filter และ reduce ใน Python",
    group: "สัปดาห์ที่ 3: ฟังก์ชัน & Functional",
    blocks: [
      { t: "h2", c: "Higher Order Functions" },
      { t: "p", c: "ใน Python functions ถูกมองว่าเป็น first class citizens ทำให้ทำสิ่งเหล่านี้ได้:" },
      { t: "ul", c: [
        "Function สามารถรับ functions อื่นเป็น parameters ได้",
        "Function สามารถ return function เป็นผลลัพธ์ได้",
        "Function สามารถแก้ไขได้",
        "Function สามารถกำหนดให้กับตัวแปรได้",
      ]},
      { t: "p", c: "ในส่วนนี้จะเรียน: การจัดการ functions เป็น parameters, การ return functions จาก functions อื่น และการใช้ Python closures กับ decorators" },

      { t: "h3", c: "Function เป็น Parameter" },
      { t: "code", lang: "python", c: "def sum_numbers(nums):  # normal function\n    return sum(nums)    # a sad function abusing the built-in sum function :<\n\ndef higher_order_function(f, lst):  # function as a parameter\n    summation = f(lst)\n    return summation\nresult = higher_order_function(sum_numbers, [1, 2, 3, 4, 5])\nprint(result)       # 15" },

      { t: "h3", c: "Function เป็น Return Value" },
      { t: "code", lang: "python", c: "def square(x):          # a square function\n    return x ** 2\n\ndef cube(x):            # a cube function\n    return x ** 3\n\ndef absolute(x):        # an absolute value function\n    if x >= 0:\n        return x\n    else:\n        return -(x)\n\ndef higher_order_function(type): # a higher order function returning a function\n    if type == 'square':\n        return square\n    elif type == 'cube':\n        return cube\n    elif type == 'absolute':\n        return absolute\n\nresult = higher_order_function('square')\nprint(result(3))       # 9\nresult = higher_order_function('cube')\nprint(result(3))       # 27\nresult = higher_order_function('absolute')\nprint(result(-3))      # 3" },

      { t: "h2", c: "Python Closures" },
      { t: "p", c: "Python อนุญาตให้ nested function เข้าถึง outer scope ของ enclosing function ซึ่งเรียกว่า Closure Closure สร้างได้โดยการซ้อน function ไว้ใน function อื่นแล้ว return inner function:" },
      { t: "code", lang: "python", c: "def add_ten():\n    ten = 10\n    def add(num):\n        return num + ten\n    return add\n\nclosure_result = add_ten()\nprint(closure_result(5))  # 15\nprint(closure_result(10))  # 20" },

      { t: "h2", c: "Python Decorators" },
      { t: "p", c: "Decorator คือ design pattern ใน Python ที่ให้ผู้ใช้เพิ่มความสามารถใหม่ให้กับ object ที่มีอยู่โดยไม่ต้องแก้ไขโครงสร้างเดิม Decorators มักจะถูกเรียกก่อน definition ของ function ที่ต้องการ decorate" },

      { t: "h3", c: "การสร้าง Decorators" },
      { t: "p", c: "ในการสร้าง decorator function เราต้องมี outer function ที่มี inner wrapper function:" },
      { t: "code", lang: "python", c: "# Normal function\ndef greeting():\n    return 'Welcome to Python'\ndef uppercase_decorator(function):\n    def wrapper():\n        func = function()\n        make_uppercase = func.upper()\n        return make_uppercase\n    return wrapper\ng = uppercase_decorator(greeting)\nprint(g())          # WELCOME TO PYTHON\n\n## Let us implement the example above with a decorator\n\ndef uppercase_decorator(function):\n    def wrapper():\n        func = function()\n        make_uppercase = func.upper()\n        return make_uppercase\n    return wrapper\n@uppercase_decorator\ndef greeting():\n    return 'Welcome to Python'\nprint(greeting())   # WELCOME TO PYTHON" },

      { t: "h3", c: "การใช้ Decorators หลายตัวกับ Function เดียว" },
      { t: "code", lang: "python", c: "# First Decorator\ndef uppercase_decorator(function):\n    def wrapper():\n        func = function()\n        make_uppercase = func.upper()\n        return make_uppercase\n    return wrapper\n\n# Second decorator\ndef split_string_decorator(function):\n    def wrapper():\n        func = function()\n        splitted_string = func.split()\n        return splitted_string\n    return wrapper\n\n#Decorators will be executed from bottom to top\n@split_string_decorator\n@uppercase_decorator     # order with decorators is important in this case - .upper() function does not work with lists\ndef greeting():\n    return 'Welcome to Python'\nprint(greeting())   # ['WELCOME', 'TO', 'PYTHON']" },

      { t: "h3", c: "การรับ Parameters ใน Decorator Functions" },
      { t: "code", lang: "python", c: "def decorator_with_parameters(function):\n    def wrapper_accepting_parameters(para1, para2, para3):\n        function(para1, para2, para3)\n        print(\"I live in {}\".format(para3))\n    return wrapper_accepting_parameters\n\n@decorator_with_parameters\ndef print_full_name(first_name, last_name, country):\n    print(\"I am {} {}. I love to teach.\".format(\n        first_name, last_name))\n\nprint_full_name(\"Asabeneh\", \"Yetayeh\",'Finland')" },

      { t: "h2", c: "Built-in Higher Order Functions" },
      { t: "p", c: "Built-in higher order functions ที่จะเรียนคือ map(), filter และ reduce Lambda function สามารถส่งเป็น parameter ได้และเหมาะมากกับ functions เหล่านี้" },

      { t: "h3", c: "Python — Map Function" },
      { t: "p", c: "map() function รับ function และ iterable เป็น parameters:" },
      { t: "code", lang: "python", c: "    # syntax\n    map(function, iterable)" },
      { t: "p", c: "ตัวอย่างที่ 1:" },
      { t: "code", lang: "python", c: "numbers = [1, 2, 3, 4, 5] # iterable\ndef square(x):\n    return x ** 2\nnumbers_squared = map(square, numbers)\nprint(list(numbers_squared))    # [1, 4, 9, 16, 25]\n# Lets apply it with a lambda function\nnumbers_squared = map(lambda x : x ** 2, numbers)\nprint(list(numbers_squared))    # [1, 4, 9, 16, 25]" },
      { t: "p", c: "ตัวอย่างที่ 2:" },
      { t: "code", lang: "python", c: "numbers_str = ['1', '2', '3', '4', '5']  # iterable\nnumbers_int = map(int, numbers_str)\nprint(list(numbers_int))    # [1, 2, 3, 4, 5]" },
      { t: "p", c: "ตัวอย่างที่ 3:" },
      { t: "code", lang: "python", c: "names = ['Asabeneh', 'Lidiya', 'Ermias', 'Abraham']  # iterable\n\ndef change_to_upper(name):\n    return name.upper()\n\nnames_upper_cased = map(change_to_upper, names)\nprint(list(names_upper_cased))    # ['ASABENEH', 'LIDIYA', 'ERMIAS', 'ABRAHAM']\n\n# Let us apply it with a lambda function\nnames_upper_cased = map(lambda name: name.upper(), names)\nprint(list(names_upper_cased))    # ['ASABENEH', 'LIDIYA', 'ERMIAS', 'ABRAHAM']" },

      { t: "h3", c: "Python — Filter Function" },
      { t: "p", c: "filter() function เรียก function ที่กำหนดซึ่ง return boolean สำหรับแต่ละ item ใน iterable และกรอง items ที่ผ่านเงื่อนไขออกมา:" },
      { t: "code", lang: "python", c: "    # syntax\n    filter(function, iterable)" },
      { t: "p", c: "ตัวอย่างที่ 1:" },
      { t: "code", lang: "python", c: "# Lets filter only even nubers\nnumbers = [1, 2, 3, 4, 5]  # iterable\n\ndef is_even(num):\n    if num % 2 == 0:\n        return True\n    return False\n\neven_numbers = filter(is_even, numbers)\nprint(list(even_numbers))       # [2, 4]" },
      { t: "p", c: "ตัวอย่างที่ 2:" },
      { t: "code", lang: "python", c: "numbers = [1, 2, 3, 4, 5]  # iterable\n\ndef is_odd(num):\n    if num % 2 != 0:\n        return True\n    return False\n\nodd_numbers = filter(is_odd, numbers)\nprint(list(odd_numbers))       # [1, 3, 5]" },
      { t: "code", lang: "python", c: "# Filter long name\nnames = ['Asabeneh', 'Lidiya', 'Ermias', 'Abraham']  # iterable\ndef is_name_long(name):\n    if len(name) > 7:\n        return True\n    return False\n\nlong_names = filter(is_name_long, names)\nprint(list(long_names))         # ['Asabeneh']" },

      { t: "h3", c: "Python — Reduce Function" },
      { t: "p", c: "reduce() function ถูก define ใน functools module ต้อง import จาก module นี้ รับ function และ iterable เป็น parameters แต่ return ค่าเดียวแทน iterable:" },
      { t: "code", lang: "python", c: "numbers_str = ['1', '2', '3', '4', '5']  # iterable\ndef add_two_nums(x, y):\n    return int(x) + int(y)\n\ntotal = reduce(add_two_nums, numbers_str)\nprint(total)    # 15" },

      { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 14" },
      { t: "code", lang: "python", c: "countries = ['Estonia', 'Finland', 'Sweden', 'Denmark', 'Norway', 'Iceland']\nnames = ['Asabeneh', 'Lidiya', 'Ermias', 'Abraham']\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" },

      { t: "h3", c: "ระดับ 1" },
      { t: "ol", c: [
        "อธิบายความแตกต่างระหว่าง map, filter และ reduce",
        "อธิบายความแตกต่างระหว่าง higher order function, closure และ decorator",
        "กำหนด call function ก่อน map, filter หรือ reduce ดูตัวอย่าง",
        "ใช้ for loop print แต่ละประเทศใน countries list",
        "ใช้ for loop print แต่ละชื่อใน names list",
        "ใช้ for loop print แต่ละตัวเลขใน numbers list",
      ]},

      { t: "h3", c: "ระดับ 2" },
      { t: "ol", c: [
        "ใช้ map สร้าง list ใหม่โดยเปลี่ยนแต่ละประเทศเป็นตัวพิมพ์ใหญ่ใน countries list",
        "ใช้ map สร้าง list ใหม่โดยเปลี่ยนแต่ละตัวเลขเป็น square ใน numbers list",
        "ใช้ map เปลี่ยนแต่ละชื่อเป็นตัวพิมพ์ใหญ่ใน names list",
        "ใช้ filter กรองประเทศที่มีคำว่า 'land' ออกมา",
        "ใช้ filter กรองประเทศที่มีตัวอักษรพอดี 6 ตัว",
        "ใช้ filter กรองประเทศที่มีตัวอักษร 6 ตัวขึ้นไปจาก country list",
        "ใช้ filter กรองประเทศที่ขึ้นต้นด้วย 'E'",
        "เชื่อมต่อ list iterators สองตัวขึ้นไป เช่น arr.map(callback).filter(callback).reduce(callback)",
        "ประกาศ function ชื่อ get_string_lists รับ list เป็น parameter แล้ว return list ที่มีแค่ string items",
        "ใช้ reduce รวมตัวเลขทั้งหมดใน numbers list",
        "ใช้ reduce ต่อชื่อประเทศทั้งหมดและสร้างประโยค: Estonia, Finland, Sweden, Denmark, Norway, and Iceland are north European countries",
        "ประกาศ function ชื่อ categorize_countries ที่ return list ของประเทศที่มี pattern บางอย่าง (เช่น 'land', 'ia', 'island', 'stan')",
        "สร้าง function ที่ return dictionary โดย keys คือตัวอักษรแรกของประเทศ และ values คือจำนวนประเทศที่ขึ้นต้นด้วยตัวอักษรนั้น",
        "ประกาศ function get_first_ten_countries — return list ของ 10 ประเทศแรกจาก countries list ใน data folder",
        "ประกาศ function get_last_ten_countries ที่ return 10 ประเทศสุดท้ายใน countries list",
      ]},

      { t: "h3", c: "ระดับ 3" },
      { t: "ol", c: [
        "ใช้ไฟล์ countries_data.py แล้วทำ tasks ต่อไปนี้:\n- Sort ประเทศตามชื่อ, ตามเมืองหลวง, ตามประชากร\n- Sort 10 ภาษาที่มีคนพูดมากที่สุดตาม location\n- Sort 10 ประเทศที่มีประชากรมากที่สุด",
      ]},
    ],
  },
};
