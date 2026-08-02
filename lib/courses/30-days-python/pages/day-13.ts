import type { Page } from "@/lib/types";

export const day13Page: Record<string, Page> = {
  "py30-day13": {
    slug: "py30-day13",
    title: { th: "วันที่ 13 — List Comprehension", en: "" },
    lead: { th: "เรียนรู้ List Comprehension วิธีสร้าง list แบบกระชับและมีประสิทธิภาพ พร้อม Lambda Function สำหรับฟังก์ชันนิรนาม", en: "" },
    group: "สัปดาห์ที่ 3: ฟังก์ชัน & Functional",
    blocks: {
      th: [
        { t: "h2", c: "List Comprehension" },
        { t: "p", c: "List comprehension ใน Python คือวิธีกระชับในการสร้าง list จาก sequence เป็นวิธีที่เร็วกว่าการประมวลผล list ด้วย for loop มาก:" },
        { t: "code", lang: "python", c: "# syntax\n[expression for i in iterable if condition]" },

        { t: "p", c: "ตัวอย่างที่ 1 — แปลง string เป็น list ของตัวอักษร:" },
        { t: "code", lang: "python", c: "# One way\nlanguage = 'Python'\nlst = list(language) # changing the string to list\nprint(type(lst))     # list\nprint(lst)           # ['P', 'y', 't', 'h', 'o', 'n']\n\n# Second way: list comprehension\nlst = [i for i in language]\nprint(type(lst)) # list\nprint(lst)       # ['P', 'y', 't', 'h', 'o', 'n']" },

        { t: "p", c: "ตัวอย่างที่ 2 — สร้าง list ของตัวเลข:" },
        { t: "code", lang: "python", c: "# Generating numbers\nnumbers = [i for i in range(11)]  # to generate numbers from 0 to 10\nprint(numbers)                    # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# It is possible to do mathematical operations during iteration\nsquares = [i * i for i in range(11)]\nprint(squares)                    # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n\n# It is also possible to make a list of tuples\nnumbers = [(i, i * i) for i in range(11)]\nprint(numbers)                             # [(0, 0), (1, 1), (2, 4), (3, 9), (4, 16), (5, 25)]" },

        { t: "p", c: "ตัวอย่างที่ 3 — List comprehension กับ if expression:" },
        { t: "code", lang: "python", c: "# Generating even numbers\neven_numbers = [i for i in range(21) if i % 2 == 0]  # to generate even numbers list in range 0 to 21\nprint(even_numbers)                    # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]\n\n# Generating odd numbers\nodd_numbers = [i for i in range(21) if i % 2 != 0]  # to generate odd numbers in range 0 to 21\nprint(odd_numbers)                      # [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]\n# Filter numbers: let's filter out positive even numbers from the list below\nnumbers = [-8, -7, -3, -1, 0, 1, 3, 4, 5, 7, 6, 8, 10]\npositive_even_numbers = [i for i in numbers if i % 2 == 0 and i > 0]\nprint(positive_even_numbers)                    # [4, 6, 8, 10]\n\n# Flattening a two dimensional array\nlist_of_lists = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nflattened_list = [ number for row in list_of_lists for number in row]\nprint(flattened_list)    # [1, 2, 3, 4, 5, 6, 7, 8, 9]" },

        { t: "h2", c: "Lambda Function" },
        { t: "p", c: "Lambda function คือ function นิรนามขนาดเล็กที่ไม่มีชื่อ รับ arguments ได้หลายตัวแต่มี expression ได้แค่ตัวเดียว คล้ายกับ anonymous functions ใน JavaScript ใช้เมื่อต้องการเขียน anonymous function ภายใน function อื่น" },

        { t: "h3", c: "การสร้าง Lambda Function" },
        { t: "p", c: "ใช้ keyword lambda ตามด้วย parameter(s) และ expression Lambda function ไม่ใช้ return แต่จะ return expression โดยอัตโนมัติ:" },
        { t: "code", lang: "python", c: "# syntax\nx = lambda param1, param2, param3: param1 + param2 + param3\nprint(x(arg1, arg2, arg3))" },
        { t: "code", lang: "python", c: "# Named function\ndef add_two_nums(a, b):\n    return a + b\n\nprint(add_two_nums(2, 3))     # 5\n# Lets change the above function to a lambda function\nadd_two_nums = lambda a, b: a + b\nprint(add_two_nums(2,3))    # 5\n\n# Self invoking lambda function\n(lambda a, b: a + b)(2,3) # 5 - need to encapsulate it in print() to see the result in the console\n\nsquare = lambda x : x ** 2\nprint(square(3))    # 9\ncube = lambda x : x ** 3\nprint(cube(3))    # 27\n\n# Multiple variables\nmultiple_variable = lambda a, b, c: a ** 2 - 3 * b + 4 * c\nprint(multiple_variable(5, 5, 3)) # 22" },

        { t: "h3", c: "Lambda Function ภายใน Function อื่น" },
        { t: "p", c: "การใช้ lambda function ภายใน function อื่น:" },
        { t: "code", lang: "python", c: "def power(x):\n    return lambda n : x ** n\n\ncube = power(2)(3)   # function power now need 2 arguments to run, in separate rounded brackets\nprint(cube)          # 8\ntwo_power_of_five = power(2)(5)\nprint(two_power_of_five)  # 32" },

        { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 13" },
        { t: "ol", c: ["กรองเฉพาะตัวเลขติดลบและศูนย์ใน list ต่อไปนี้โดยใช้ list comprehension:"] },
        { t: "code", lang: "python", c: "numbers = [-4, -3, -2, -1, 0, 2, 4, 6]" },
        { t: "ol", c: ["Flatten list ต่อไปนี้เป็น list แบบ one dimensional:"], start: 2 },
        { t: "code", lang: "python", c: "list_of_lists = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n\noutput\n[1, 2, 3, 4, 5, 6, 7, 8, 9]" },
        { t: "ol", c: ["ใช้ list comprehension สร้าง list ของ tuples ต่อไปนี้:"], start: 3 },
        { t: "code", lang: "python", c: "[(0, 1, 0, 0, 0, 0, 0),\n(1, 1, 1, 1, 1, 1, 1),\n(2, 1, 2, 4, 8, 16, 32),\n(3, 1, 3, 9, 27, 81, 243),\n(4, 1, 4, 16, 64, 256, 1024),\n(5, 1, 5, 25, 125, 625, 3125),\n(6, 1, 6, 36, 216, 1296, 7776),\n(7, 1, 7, 49, 343, 2401, 16807),\n(8, 1, 8, 64, 512, 4096, 32768),\n(9, 1, 9, 81, 729, 6561, 59049),\n(10, 1, 10, 100, 1000, 10000, 100000)]" },
        { t: "ol", c: ["Flatten list ต่อไปนี้เป็น list ใหม่:"], start: 4 },
        { t: "code", lang: "python", c: "countries = [[('Finland', 'Helsinki')], [('Sweden', 'Stockholm')], [('Norway', 'Oslo')]]\noutput:\n[['FINLAND','FIN', 'HELSINKI'], ['SWEDEN', 'SWE', 'STOCKHOLM'], ['NORWAY', 'NOR', 'OSLO']]" },
        { t: "ol", c: ["เปลี่ยน list ต่อไปนี้เป็น list ของ dictionaries:"], start: 5 },
        { t: "code", lang: "python", c: "countries = [[('Finland', 'Helsinki')], [('Sweden', 'Stockholm')], [('Norway', 'Oslo')]]\noutput:\n[{'country': 'FINLAND', 'city': 'HELSINKI'},\n{'country': 'SWEDEN', 'city': 'STOCKHOLM'},\n{'country': 'NORWAY', 'city': 'OSLO'}]" },
        { t: "ol", c: ["เปลี่ยน list of lists ต่อไปนี้เป็น list ของสตริงที่ต่อกัน:"], start: 6 },
        { t: "code", lang: "python", c: "names = [[('Asabeneh', 'Yetayeh')], [('David', 'Smith')], [('Donald', 'Trump')], [('Bill', 'Gates')]]\noutput\n['Asabeneh Yetaeyeh', 'David Smith', 'Donald Trump', 'Bill Gates']" },
        { t: "ol", c: ["เขียน lambda function ที่แก้ slope หรือ y-intercept ของ linear functions"], start: 7 },
      ],
      en: [],
    },
  },
};
