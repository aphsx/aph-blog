import type { Page } from "@/lib/types";

const IMG =
  "https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images";

export const day17Page: Record<string, Page> = {
  "py30-day17": {
    slug: "py30-day17",
    title: "วันที่ 17 — จัดการข้อผิดพลาด (Exception Handling)",
    lead: "เรียนรู้การจัดการ Exception ด้วย try/except/else/finally พร้อม Packing/Unpacking Arguments, Spreading, Enumerate และ Zip",
    group: "สัปดาห์ที่ 4: เทคนิคระดับกลาง",
    blocks: [
      { t: "h2", c: "Exception Handling" },
      {
        t: "p",
        c: "Python ใช้ try และ except เพื่อจัดการ errors อย่างสวยงาม ทำให้โปรแกรมไม่หยุดทำงานเมื่อเจอ error ที่ไม่คาดคิด การออกแบบนี้เรียกว่า try and except",
      },
      {
        t: "image",
        src: `${IMG}/try_except.png`,
        alt: "Try and Except",
        caption: "โครงสร้าง try/except ใน Python",
      },
      {
        t: "code",
        lang: "python",
        c: "try:\n    code in this block if things go well\nexcept:\n    code in this block run if things go wrong",
      },

      { t: "p", c: "ตัวอย่าง:" },
      {
        t: "code",
        lang: "python",
        c: "try:\n    print(10 + '5')\nexcept:\n    print('Something went wrong')",
      },

      {
        t: "p",
        c: "ตัวอย่างที่สองแสดงการรับ input และจับ exception เฉพาะประเภท:",
      },
      {
        t: "code",
        lang: "python",
        c: "try:\n    name = input('Enter your name:')\n    year_born = input('Year you were born:')\n    age = 2019 - year_born\n    print(f'You are {name}. And your age is {age}.')\nexcept TypeError:\n    print('Type error occur')\nexcept ValueError:\n    print('Value error occur')\nexcept ZeroDivisionError:\n    print('zero division error occur')",
      },

      {
        t: "p",
        c: "เพิ่ม else และ finally เพื่อจัดการ flow ให้ครบ:",
      },
      {
        t: "code",
        lang: "python",
        c: "try:\n    name = input('Enter your name:')\n    year_born = input('Year you born:')\n    age = 2019 - int(year_born)\n    print(f'You are {name}. And your age is {age}.')\nexcept TypeError:\n    print('Type error occur')\nexcept ValueError:\n    print('Value error occur')\nexcept ZeroDivisionError:\n    print('zero division error occur')\nelse:\n    print('I usually run with the try block')\nfinally:\n    print('I alway run.')",
      },

      {
        t: "p",
        c: "การใช้ except Exception as e เพื่อดูรายละเอียดข้อผิดพลาด:",
      },
      {
        t: "code",
        lang: "python",
        c: "try:\n    name = input('Enter your name:')\n    year_born = input('Year you born:')\n    age = 2019 - int(year_born)\n    print(f'You are {name}. And your age is {age}.')\nexcept Exception as e:\n    print(e)",
      },

      { t: "h2", c: "Packing and Unpacking Arguments in Python" },
      {
        t: "p",
        c: "เราใช้ operators สองตัวสำหรับ packing และ unpacking:\n* สำหรับ tuples\n** สำหรับ dictionaries",
      },

      { t: "h3", c: "Unpacking" },
      { t: "h3", c: "Unpacking Lists" },
      {
        t: "code",
        lang: "python",
        c: "def sum_of_five_nums(a, b, c, d, e):\n    return a + b + c + d + e\n\nlst = [1, 2, 3, 4, 5]\nprint(sum_of_five_nums(*lst))  # 15",
      },
      {
        t: "code",
        lang: "python",
        c: "first, second, third, *rest, tenth = [1,2,3,4,5,6,7,8,9,10]\nprint(first)          # 1\nprint(second)         # 2\nprint(third)          # 3\nprint(rest)           # [4,5,6,7,8,9]\nprint(tenth)          # 10",
      },
      {
        t: "code",
        lang: "python",
        c: "from math import sqrt\n\nnumbers = (36, 49, 81, 100, 144)\nprint(list(map(sqrt, numbers)))",
      },
      {
        t: "code",
        lang: "python",
        c: "numbers = range(2, 7)  # normal call with separate arguments\nprint(list(numbers)) # [2, 3, 4, 5, 6]\nargs = [2, 7]\nprint(list(range(*args)))   # call with arguments unpacked from a list",
      },

      { t: "h3", c: "Unpacking Dictionaries" },
      {
        t: "code",
        lang: "python",
        c: "def unpacking_person_info(name, country, city, age):\n    return f'{name} lives in {country}, {city}. He is {age} year old.'\ndct = {'name':'Asabeneh', 'country':'Finland', 'city':'Helsinki', 'age':250}\nprint(unpacking_person_info(**dct))",
      },

      { t: "h3", c: "Packing" },
      { t: "h3", c: "Packing Lists" },
      {
        t: "code",
        lang: "python",
        c: "def sum_all(*args):\n    s = 0\n    for i in args:\n        s += i\n    return s\nprint(sum_all(1, 2, 3))             # 6\nprint(sum_all(1, 2, 3, 4, 5, 6, 7)) # 28",
      },

      { t: "h3", c: "Packing Dictionaries" },
      {
        t: "code",
        lang: "python",
        c: "def packing_person_info(**kwargs):\n    # check the type of kwargs and it is a dict type\n    # print(type(kwargs))\n    # Printing dictionary items\n    for key in kwargs:\n        print(\"{key} = {value}\".format(key=key, value=kwargs[key]))\n    return kwargs\n\nprint(packing_person_info(name=\"Asabeneh\",\n      country=\"Finland\", city=\"Helsinki\", age=250))",
      },

      { t: "h2", c: "Spreading in Python" },
      {
        t: "code",
        lang: "python",
        c: "lst_one = [1, 2, 3]\nlst_two = [4, 5, 6, 7, 8, 9, 10]\nlst = [0, *lst_one, *lst_two]\nprint(lst)          # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\ncountry_lst_one = ['Finland', 'Sweden', 'Norway']\ncountry_lst_two = ['Denmark', 'Iceland']\nnordic_countries = [*country_lst_one, *country_lst_two]\nprint(nordic_countries)  # ['Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland']",
      },

      { t: "h2", c: "Enumerate" },
      {
        t: "p",
        c: "ถ้าเราต้องการ index ของแต่ละ item ใน list เราใช้ enumerate เพื่อรับ index และ item พร้อมกัน:",
      },
      {
        t: "code",
        lang: "python",
        c: "for index, item in enumerate([20, 30, 40]):\n    print(index, item)",
      },
      {
        t: "code",
        lang: "python",
        c: "for index, i in enumerate(countries):\n    print('hi')\n    if i == 'Finland':\n        print(f'The country {i} has been found at index {index}')",
      },

      { t: "h2", c: "Zip" },
      {
        t: "p",
        c: "บางครั้งเราต้องการ loop หลาย list พร้อมกัน เราสามารถใช้ zip เพื่อ combine lists:",
      },
      {
        t: "code",
        lang: "python",
        c: "fruits = ['banana', 'orange', 'mango', 'lemon', 'lime']\nvegetables = ['Tomato', 'Potato', 'Cabbage','Onion', 'Carrot']\nfruits_and_vegs = [(f, v) for f, v in zip(fruits, vegetables)]\nprint(fruits_and_vegs)  # [('banana', 'Tomato'), ('orange', 'Potato'), ('mango', 'Cabbage'), ('lemon', 'Onion'), ('lime', 'Carrot')]",
      },

      { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 17" },
      {
        t: "ol",
        c: [
          "แตก (Unpack) 5 ประเทศแรกออกมาเก็บในตัวแปร nordic_countries และเก็บ Estonia กับ Russia ใน es และ ru ตามลำดับ",
        ],
      },
      {
        t: "code",
        lang: "python",
        c: "names = ['Finland', 'Sweden', 'Norway','Denmark','Iceland', 'Estonia','Russia']",
      },
    ],
  },
};
