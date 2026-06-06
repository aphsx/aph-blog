import type { Page } from "@/lib/types";

export const day11Page: Record<string, Page> = {
  "py30-day11": {
    slug: "py30-day11",
    title: "วันที่ 11 — ฟังก์ชัน (Functions)",
    lead: "เรียนรู้การสร้างและใช้งาน Function ใน Python ตั้งแต่พื้นฐาน parameters, return values, default args, *args และ higher-order functions",
    group: "สัปดาห์ที่ 3: ฟังก์ชัน & Functional",
    blocks: [
      { t: "h2", c: "ฟังก์ชัน (Functions)" },
      { t: "p", c: "Function คือ block ของโค้ดที่นำมาใช้ซ้ำได้ หรือ programming statements ที่ออกแบบมาเพื่อทำงานอย่างใดอย่างหนึ่ง ใน Python เราใช้ keyword def เพื่อประกาศ function ส่วน block ของ code จะรันเมื่อมีการเรียกใช้งาน function" },

      { t: "h3", c: "การประกาศและเรียกใช้ Function" },
      { t: "p", c: "เมื่อเราสร้าง function เราใช้ keyword def ต่อไปนี้คือ syntax:" },
      { t: "code", lang: "python", c: "# syntax\n# Declaring a function\ndef function_name():\n    codes\n    codes\n# Calling a function\nfunction_name()" },

      { t: "h3", c: "Function ที่ไม่มี Parameters" },
      { t: "p", c: "Function สามารถประกาศโดยไม่มี parameters ได้" },
      { t: "code", lang: "python", c: "def generate_full_name ():\n    first_name = 'Asabeneh'\n    last_name = 'Yetayeh'\n    space = ' '\n    full_name = first_name + space + last_name\n    print(full_name)\ngenerate_full_name () # calling a function\n\ndef add_two_numbers ():\n    num_one = 2\n    num_two = 3\n    total = num_one + num_two\n    print(total)\nadd_two_numbers()" },

      { t: "h3", c: "Function ที่มีการ Return ค่า" },
      { t: "p", c: "Function สามารถ return ค่าได้ ถ้าไม่มี return statement function จะ return ค่า None โดย default:" },
      { t: "code", lang: "python", c: "def generate_full_name ():\n    first_name = 'Asabeneh'\n    last_name = 'Yetayeh'\n    space = ' '\n    full_name = first_name + space + last_name\n    return full_name\nprint(generate_full_name())\n\ndef add_two_numbers ():\n    num_one = 2\n    num_two = 3\n    total = num_one + num_two\n    return total\nprint(add_two_numbers())" },

      { t: "h3", c: "Function ที่มี Parameters" },
      { t: "p", c: "ใน function เราสามารถรับข้อมูลผ่าน parameters ได้ — single parameter:" },
      { t: "code", lang: "python", c: "  # syntax\n  # Declaring a function\n  def function_name(parameter):\n    codes\n    codes\n  # Calling function\n  print(function_name(argument))" },
      { t: "code", lang: "python", c: "def greetings (name):\n    message = name + ', welcome to Python for Everyone!'\n    return message\nprint(greetings('Asabeneh'))\n\ndef add_ten(num):\n    ten = 10\n    return num + ten\nprint(add_ten(90))\n\ndef square_number(x):\n    return x * x\nprint(square_number(2))\n\ndef area_of_circle (r):\n    PI = 3.14\n    area = PI * r ** 2\n    return area\nprint(area_of_circle(10))" },
      { t: "p", c: "Multiple parameters:" },
      { t: "code", lang: "python", c: "  # syntax\n  # Declaring a function\n  def function_name(para1, para2):\n    codes\n    codes\n  # Calling function\n  print(function_name(arg1, arg2))" },
      { t: "code", lang: "python", c: "def generate_full_name (first_name, last_name):\n    space = ' '\n    full_name = first_name + space + last_name\n    return full_name\nprint('Full Name: ', generate_full_name('Asabeneh','Yetayeh'))\n\ndef sum_two_numbers (num_one, num_two):\n    sum = num_one + num_two\n    return sum\nprint('Sum of two numbers: ', sum_two_numbers(1, 9))\n\ndef calculate_age (current_year, birth_year):\n    age = current_year - birth_year\n    return age \nprint('Age: ', calculate_age(2021, 1819))" },

      { t: "h3", c: "การส่ง Arguments ด้วย Key และ Value" },
      { t: "p", c: "ถ้าเราส่ง arguments ด้วย key และ value ลำดับของ arguments จะไม่สำคัญ:" },
      { t: "code", lang: "python", c: "# syntax\n# Declaring a function\ndef function_name(para1, para2):\n    codes\n    codes\n# Calling function\nprint(function_name(para1 = 'John', para2 = 'Doe')) # the order of arguments does not matter here" },
      { t: "code", lang: "python", c: "def print_fullname(firstname, lastname):\n    space = ' '\n    full_name = firstname  + space + lastname\n    print(full_name)\nprint_fullname(firstname = 'Asabeneh', lastname = 'Yetayeh')\n\ndef add_two_numbers (num1, num2):\n    total = num1 + num2\n    return total\nprint(add_two_numbers(num2 = 3, num1 = 2)) # Order does not matter" },

      { t: "h3", c: "Function ที่มี Default Parameters" },
      { t: "p", c: "บางครั้งเราส่ง default values ให้ parameters ถ้าเราไม่ส่ง arguments ตอนเรียกใช้ function ค่า default จะถูกใช้:" },
      { t: "code", lang: "python", c: "# syntax\n# Declaring a function\ndef function_name(param = value):\n    codes\n    codes\n# Calling function\nfunction_name()\nfunction_name(arg)" },
      { t: "code", lang: "python", c: "def greetings (name = 'Peter'):\n    message = name + ', welcome to Python for Everyone!'\n    return message\nprint(greetings())\nprint(greetings('Asabeneh'))\n\ndef generate_full_name (first_name = 'Asabeneh', last_name = 'Yetayeh'):\n    space = ' '\n    full_name = first_name + space + last_name\n    return full_name\n\nprint(generate_full_name())\nprint(generate_full_name('David','Smith'))\n\ndef calculate_age (birth_year,current_year = 2021):\n    age = current_year - birth_year\n    return age \nprint('Age: ', calculate_age(1821))\n\ndef weight_of_object (mass, gravity = 9.81):\n    weight = str(mass * gravity)+ ' N' # the value has to be changed to string first\n    return weight\nprint('Weight of an object in Newtons: ', weight_of_object(100)) # 9.81 - average gravity on Earth's surface\nprint('Weight of an object in Newtons: ', weight_of_object(100, 1.62)) # gravity on the surface of the Moon" },

      { t: "h3", c: "Arbitrary Number of Arguments" },
      { t: "p", c: "ถ้าเราไม่รู้จำนวน arguments ที่จะส่งเข้ามา เราสามารถสร้าง function ที่รับ arguments จำนวนไม่แน่นอนได้ โดยเพิ่ม * ไว้หน้าชื่อ parameter:" },
      { t: "code", lang: "python", c: "# syntax\n# Declaring a function\ndef function_name(*args):\n    codes\n    codes\n# Calling function\nfunction_name(param1, param2, param3,..)" },
      { t: "code", lang: "python", c: "def sum_all_nums(*nums):\n    total = 0\n    for num in nums:\n        total += num     # same as total = total + num \n    return total\nprint(sum_all_nums(2, 3, 5)) # 10" },

      { t: "h3", c: "Default และ Arbitrary Number of Parameters" },
      { t: "code", lang: "python", c: "def generate_groups (team,*args):\n    print(team)\n    for i in args:\n        print(i) \ngenerate_groups('Team-1','Asabeneh','Brook','David','Eyob')" },

      { t: "h3", c: "Function เป็น Parameter ของอีก Function หนึ่ง" },
      { t: "code", lang: "python", c: "#You can pass functions around as parameters\ndef square_number (n):\n    return n ** n\ndef do_something(f, x):\n    return f(x)\nprint(do_something(square_number, 3)) # 27" },

      { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 11" },

      { t: "h3", c: "ระดับ 1" },
      { t: "ol", c: [
        "ประกาศ function ชื่อ add_two_numbers รับ 2 parameters แล้ว return ผลรวม",
        "พื้นที่วงกลมคำนวณได้จาก area = π x r x r เขียน function ที่คำนวณ area_of_circle",
        "เขียน function ชื่อ add_all_nums รับ arguments จำนวนไม่แน่นอนแล้วรวมทุก arguments เช็คว่า list items ทั้งหมดเป็น number type หรือไม่ ถ้าไม่ใช่ให้แสดง feedback ที่เหมาะสม",
        "อุณหภูมิหน่วย °C แปลงเป็น °F ได้ด้วยสูตร: °F = (°C x 9/5) + 32 เขียน function แปลง °C เป็น °F ชื่อ convert_celsius_to_fahrenheit",
        "เขียน function ชื่อ check_season รับ month parameter แล้ว return ฤดูกาล: Autumn, Winter, Spring หรือ Summer",
        "เขียน function ชื่อ calculate_slope ที่ return ค่า slope ของสมการเส้นตรง",
        "สมการ Quadratic คือ ax² + bx + c = 0 เขียน function ที่คำนวณ solution set ของสมการ ชื่อ solve_quadratic_eqn",
        "ประกาศ function ชื่อ print_list รับ list เป็น parameter แล้ว print แต่ละ element ของ list",
        "ประกาศ function ชื่อ reverse_list รับ array เป็น parameter แล้ว return array ที่กลับลำดับแล้ว (ใช้ loop)",
        "ประกาศ function ชื่อ capitalize_list_items รับ list เป็น parameter แล้ว return list ที่ capitalize items แล้ว",
        "ประกาศ function ชื่อ add_item รับ list และ item เป็น parameters แล้ว return list ที่เพิ่ม item ต่อท้ายแล้ว",
        "ประกาศ function ชื่อ remove_item รับ list และ item เป็น parameters แล้ว return list ที่ลบ item ออกแล้ว",
        "ประกาศ function ชื่อ sum_of_numbers รับตัวเลข n เป็น parameter แล้วรวมตัวเลขทั้งหมดใน range นั้น",
        "ประกาศ function ชื่อ sum_of_odds รับตัวเลข n เป็น parameter แล้วรวมเลขคี่ทั้งหมดใน range นั้น",
        "ประกาศ function ชื่อ sum_of_even รับตัวเลข n เป็น parameter แล้วรวมเลขคู่ทั้งหมดใน range นั้น",
      ]},

      { t: "h3", c: "ระดับ 2" },
      { t: "ol", c: [
        "ประกาศ function ชื่อ evens_and_odds รับ positive integer เป็น parameter แล้วนับจำนวนเลขคู่และเลขคี่ในตัวเลขนั้น",
        "เรียก function ของคุณว่า factorial รับ whole number เป็น parameter แล้ว return factorial ของตัวเลขนั้น",
        "เรียก function ของคุณว่า is_empty รับ parameter แล้วเช็คว่าว่างเปล่าหรือไม่",
        "เขียน functions ต่าง ๆ ที่รับ list เป็น parameter: calculate_mean, calculate_median, calculate_mode, calculate_range, calculate_variance, calculate_std (standard deviation)",
        "เขียน function ชื่อ greet ที่มี default argument ชื่อ name ถ้าไม่มี argument ให้ print 'Hello, Guest!' ถ้ามีให้ greet ด้วยชื่อนั้น",
        "สร้าง function ชื่อ show_args ที่รับ named arguments จำนวนไม่แน่นอนแล้ว print ชื่อและค่าของแต่ละ argument",
      ]},

      { t: "h3", c: "ระดับ 3" },
      { t: "ol", c: [
        "เขียน function ชื่อ is_prime ที่เช็คว่าตัวเลขนั้นเป็น prime หรือไม่",
        "เขียน function ที่เช็คว่า items ทั้งหมดใน list มีค่า unique หรือไม่",
        "เขียน function ที่เช็คว่า items ทั้งหมดใน list เป็น data type เดียวกันหรือไม่",
        "เขียน function ที่เช็คว่า variable ที่ส่งมาเป็น valid Python variable name หรือไม่",
        "ไปที่โฟลเดอร์ data แล้วเปิดไฟล์ countries-data.py สร้าง function ชื่อ most_spoken_languages ที่ return 10 หรือ 20 ภาษาที่มีคนพูดมากที่สุดในโลกตามลำดับจากมากไปน้อย สร้าง function ชื่อ most_populated_countries ที่ return 10 หรือ 20 ประเทศที่มีประชากรมากที่สุดตามลำดับ",
      ]},
    ],
  },
};
