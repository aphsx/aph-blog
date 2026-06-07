import type { Page } from "@/lib/types";

export const day12Page: Record<string, Page> = {
  "py30-day12": {
    slug: "py30-day12",
    title: "วันที่ 12 — โมดูล (Modules)",
    lead: "เรียนรู้การสร้างและนำเข้า Module ใน Python ทั้ง custom modules และ built-in modules เช่น os, sys, math, statistics, string และ random",
    group: "สัปดาห์ที่ 3: ฟังก์ชัน & Functional",
    blocks: [
      { t: "h2", c: "โมดูล (Modules)" },

      { t: "h3", c: "Module คืออะไร" },
      { t: "p", c: "Module คือไฟล์ที่มีชุดของโค้ดหรือ functions ที่นำมาใช้งานใน application ได้ Module อาจเป็นไฟล์ที่มีแค่ตัวแปรเดียว, function เดียว หรือโค้ดขนาดใหญ่ก็ได้" },

      { t: "h3", c: "การสร้าง Module" },
      { t: "p", c: "ในการสร้าง module เราเขียนโค้ดใน Python script แล้วบันทึกเป็นไฟล์ .py สร้างไฟล์ชื่อ mymodule.py ในโฟลเดอร์ project:" },
      { t: "code", lang: "python", c: "# mymodule.py file\ndef generate_full_name(firstname, lastname):\n    return firstname + ' ' + lastname" },
      { t: "p", c: "สร้างไฟล์ main.py ในโฟลเดอร์ project แล้ว import ไฟล์ mymodule.py" },

      { t: "h3", c: "การนำเข้า Module" },
      { t: "p", c: "ในการนำเข้าไฟล์เราใช้ keyword import และชื่อของไฟล์เท่านั้น:" },
      { t: "code", lang: "python", c: "# main.py file\nimport mymodule\nprint(mymodule.generate_full_name('Asabeneh', 'Yetayeh')) # Asabeneh Yetayeh" },

      { t: "h3", c: "การนำเข้า Functions จาก Module" },
      { t: "p", c: "เราสามารถมี functions หลายตัวในไฟล์และนำเข้าได้หลายแบบ:" },
      { t: "code", lang: "python", c: "# main.py file\nfrom mymodule import generate_full_name, sum_two_nums, person, gravity\nprint(generate_full_name('Asabneh','Yetayeh'))\nprint(sum_two_nums(1,9))\nmass = 100\nweight = mass * gravity\nprint(weight)\nprint(person['firstname'])" },

      { t: "h3", c: "การนำเข้า Functions และเปลี่ยนชื่อ" },
      { t: "p", c: "ตอนนำเข้าเราสามารถเปลี่ยนชื่อของ module ได้:" },
      { t: "code", lang: "python", c: "# main.py file\nfrom mymodule import generate_full_name as fullname, sum_two_nums as total, person as p, gravity as g\nprint(fullname('Asabneh','Yetayeh'))\nprint(total(1, 9))\nmass = 100\nweight = mass * g\nprint(weight)\nprint(p)\nprint(p['firstname'])" },

      { t: "h2", c: "การนำเข้า Built-in Modules" },
      { t: "p", c: "เช่นเดียวกับภาษาโปรแกรมอื่น เราสามารถนำเข้า modules โดยใช้ keyword import built-in modules ที่ใช้บ่อย: math, datetime, os, sys, random, statistics, collections, json, re" },

      { t: "h3", c: "OS Module" },
      { t: "p", c: "Python os module ช่วยให้ทำงาน operating system ต่าง ๆ โดยอัตโนมัติ มี functions สำหรับสร้าง, เปลี่ยน working directory, ลบ directory และดึงเนื้อหา:" },
      { t: "code", lang: "python", c: "# import the module\nimport os\n# Creating a directory\nos.mkdir('directory_name')\n# Changing the current directory\nos.chdir('path')\n# Getting current working directory\nos.getcwd()\n# Removing directory\nos.rmdir()" },

      { t: "h3", c: "Sys Module" },
      { t: "p", c: "sys module มี functions และตัวแปรสำหรับจัดการ Python runtime environment sys.argv return list ของ command line arguments ที่ส่งให้ Python script โดย index 0 คือชื่อ script และ index 1 คือ argument แรก:" },
      { t: "code", lang: "python", c: "import sys\n#print(sys.argv[0], argv[1],sys.argv[2])  # this line would print out: filename argument1 argument2\nprint('Welcome {}. Enjoy  {} challenge!'.format(sys.argv[1], sys.argv[2]))" },
      { t: "p", c: "รันด้วย command line:" },
      { t: "code", lang: "sh", c: "python script.py Asabeneh 30DaysOfPython" },
      { t: "p", c: "ผลลัพธ์:" },
      { t: "code", lang: "sh", c: "Welcome Asabeneh. Enjoy  30DayOfPython challenge!" },
      { t: "p", c: "คำสั่ง sys ที่มีประโยชน์:" },
      { t: "code", lang: "python", c: "# to exit sys\nsys.exit()\n# To know the largest integer variable it takes\nsys.maxsize\n# To know environment path\nsys.path\n# To know the version of python you are using\nsys.version" },

      { t: "h3", c: "Statistics Module" },
      { t: "p", c: "statistics module มี functions สำหรับสถิติทางคณิตศาสตร์ของข้อมูลตัวเลข functions ที่นิยมคือ mean, median, mode, stdev:" },
      { t: "code", lang: "python", c: "from statistics import * # importing all the statistics modules\nages = [20, 20, 4, 24, 25, 22, 26, 20, 23, 22, 26]\nprint(mean(ages))       # ~22.9\nprint(median(ages))     # 23\nprint(mode(ages))       # 20\nprint(stdev(ages))      # ~2.3" },

      { t: "h3", c: "Math Module" },
      { t: "p", c: "module ที่มีการดำเนินการทางคณิตศาสตร์และค่าคงที่ต่าง ๆ:" },
      { t: "code", lang: "python", c: "import math\nprint(math.pi)           # 3.141592653589793, pi constant\nprint(math.sqrt(2))      # 1.4142135623730951, square root\nprint(math.pow(2, 3))    # 8.0, exponential function\nprint(math.floor(9.81))  # 9, rounding to the lowest\nprint(math.ceil(9.81))   # 10, rounding to the highest\nprint(math.log10(100))   # 2, logarithm with 10 as base" },
      { t: "p", c: "ใช้ help(math) หรือ dir(math) เพื่อดู functions ทั้งหมดใน module นำเข้า function เฉพาะ:" },
      { t: "code", lang: "python", c: "from math import pi\nprint(pi)" },
      { t: "p", c: "นำเข้าหลาย functions พร้อมกัน:" },
      { t: "code", lang: "python", c: "from math import pi, sqrt, pow, floor, ceil, log10\nprint(pi)                 # 3.141592653589793\nprint(sqrt(2))            # 1.4142135623730951\nprint(pow(2, 3))          # 8.0\nprint(floor(9.81))        # 9\nprint(ceil(9.81))         # 10\nprint(log10(100))         # 2" },
      { t: "p", c: "นำเข้าทุก function ด้วย *:" },
      { t: "code", lang: "python", c: "from math import *\nprint(pi)            # 3.141592653589793, pi constant\nprint(sqrt(2))       # 1.4142135623730951, square root\nprint(pow(2, 3))     # 8.0, exponential function\nprint(floor(9.81))   # 9, rounding to the lowest\nprint(ceil(9.81))    # 10, rounding to the highest\nprint(log10(100))    # 2, logarithm with 10 as base" },
      { t: "p", c: "หรือเปลี่ยนชื่อเมื่อ import:" },
      { t: "code", lang: "python", c: "from math import pi as PI\nprint(PI) # 3.141592653589793" },

      { t: "h3", c: "String Module" },
      { t: "p", c: "string module มีประโยชน์หลายอย่าง:" },
      { t: "code", lang: "python", c: "import string\nprint(string.ascii_letters) # abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\nprint(string.digits)        # 0123456789\nprint(string.punctuation)   # !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" },

      { t: "h3", c: "Random Module" },
      { t: "p", c: "random module ใช้สร้างตัวเลขสุ่ม ฟังก์ชัน random() return ค่าระหว่าง 0 ถึง 0.9999 ส่วน randint() return เลขจำนวนเต็มสุ่มใน range ที่กำหนด:" },
      { t: "code", lang: "python", c: "from random import random, randint\nprint(random())   # it doesn't take any arguments; it returns a value between 0 and 0.9999\nprint(randint(5, 20)) # it returns a random integer number between [5, 20] inclusive" },

      { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 12" },

      { t: "h3", c: "ระดับ 1" },
      { t: "ol", c: ["เขียน function ที่สร้าง random_user_id ความยาว 6 ตัวอักษร/ตัวเลข:"] },
      { t: "code", lang: "python", c: "print(random_user_id())\n'1ee33d'" },
      { t: "ol", c: ["แก้ไข task ก่อนหน้า ประกาศ function ชื่อ user_id_gen_by_user ไม่รับ parameters แต่รับ 2 inputs จาก input() โดย input แรกคือจำนวนตัวอักษรและ input ที่สองคือจำนวน IDs ที่ต้องการสร้าง:"], start: 2 },
      { t: "code", lang: "python", c: "print(user_id_gen_by_user()) # user input: 5 5\n#output:\n#kcsy2\n#SMFYb\n#bWmeq\n#ZXOYh\n#2Rgxf\n\nprint(user_id_gen_by_user()) # 16 5\n#1GCSgPLMaBAVQZ26\n#YD7eFwNQKNs7qXaT\n#ycArC5yrRupyG00S\n#UbGxOFI7UXSWAyKN\n#dIV0SSUTgAdKwStr" },
      { t: "ol", c: ["เขียน function ชื่อ rgb_color_gen ที่สร้างสี RGB (ค่า 3 ตัวในช่วง 0-255 แต่ละตัว):"], start: 3 },
      { t: "code", lang: "python", c: "print(rgb_color_gen())\n# rgb(125,244,255) - the output should be in this form" },

      { t: "h3", c: "ระดับ 2" },
      { t: "ol", c: [
        "เขียน function list_of_hexa_colors ที่ return จำนวนสีแบบ hexadecimal ที่ต้องการในรูปแบบ array (6 ตัวอักษรหลังจาก # โดยใช้เลข 0-9 และตัวอักษร a-f)",
        "เขียน function list_of_rgb_colors ที่ return จำนวนสี RGB ที่ต้องการในรูปแบบ array",
        "เขียน function generate_colors ที่สร้างสีแบบ hexa หรือ rgb ตามจำนวนที่ต้องการ:",
      ]},
      { t: "code", lang: "python", c: "generate_colors('hexa', 3) # ['#a3e12f','#03ed55','#eb3d2b']\ngenerate_colors('hexa', 1) # ['#b334ef']\ngenerate_colors('rgb', 3)  # ['rgb(5, 55, 175','rgb(50, 105, 100','rgb(15, 26, 80']\ngenerate_colors('rgb', 1)  # ['rgb(33,79, 176)']" },

      { t: "h3", c: "ระดับ 3" },
      { t: "ol", c: [
        "เรียก function ของคุณว่า shuffle_list รับ list เป็น parameter แล้ว return list ที่สับเปลี่ยนลำดับแล้ว",
        "เขียน function ที่ return array ของตัวเลขสุ่ม 7 ตัวในช่วง 0-9 โดยทุกตัวต้อง unique",
      ]},
    ],
  },
};
