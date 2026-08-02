import type { Page } from "@/lib/types";

export const day10Page: Record<string, Page> = {
  "py30-day10": {
    slug: "py30-day10",
    title: { th: "วันที่ 10 — ลูป (Loops)", en: "" },
    lead: { th: "เรียนรู้ while loop และ for loop ใน Python พร้อม break, continue, range และ nested loops", en: "" },
    group: "สัปดาห์ที่ 2: โครงสร้างข้อมูล & การควบคุม",
    blocks: {
      th: [
        { t: "h2", c: "ลูป (Loops)" },
        { t: "p", c: "ในชีวิตประจำวันเราทำงานซ้ำ ๆ หลายครั้ง ใน Python เช่นเดียวกับภาษาโปรแกรมอื่น ๆ ถ้าต้องการทำงานซ้ำ ๆ เราใช้ loop Python มี loop อยู่สองประเภท: while loop และ for loop" },

        { t: "h3", c: "While Loop" },
        { t: "p", c: "ใช้ keyword while เพื่อสร้าง while loop เงื่อนไขจะถูกตรวจสอบ ถ้าเป็น true block code จะถูกรัน จนกว่าเงื่อนไขจะเป็น false:" },
        { t: "code", lang: "python", c: "  # syntax\nwhile condition:\n    code goes here" },
        { t: "code", lang: "python", c: "count = 0\nwhile count < 5:\n    print(count)\n    count = count + 1\n#prints from 0 to 4" },
        { t: "p", c: "ใน while loop เราสามารถเพิ่ม else block ที่จะรันเมื่อเงื่อนไขเป็น false:" },
        { t: "code", lang: "python", c: "  # syntax\nwhile condition:\n    code goes here\nelse:\n    code goes here" },
        { t: "code", lang: "python", c: "count = 0\nwhile count < 5:\n    print(count)\n    count = count + 1\nelse:\n    print(count)" },

        { t: "h3", c: "Break และ Continue — ส่วนที่ 1" },
        { t: "p", c: "ถ้าต้องการออกจาก loop ใช้ break:" },
        { t: "code", lang: "python", c: "# syntax\nwhile condition:\n    code goes here\n    if another_condition:\n        break" },
        { t: "code", lang: "python", c: "count = 0\nwhile count < 5:\n    print(count)\n    count = count + 1\n    if count == 3:\n        break" },
        { t: "p", c: "ถ้าต้องการข้ามการทำงาน iteration ปัจจุบันใช้ continue:" },
        { t: "code", lang: "python", c: "  # syntax\nwhile condition:\n    code goes here\n    if another_condition:\n        continue" },
        { t: "code", lang: "python", c: "count = 0\nwhile count < 5:\n    if count == 3:\n        count += 1\n        continue\n    print(count)\n    count = count + 1" },

        { t: "h3", c: "For Loop" },
        { t: "p", c: "ใช้ for loop ใน sequence (list, tuple, dictionary, set หรือ string) สามารถวน loop ผ่านทุกสมาชิกใน sequence ได้:" },
        { t: "code", lang: "python", c: "# syntax\nfor iterator in lst:\n    code goes here" },
        { t: "code", lang: "python", c: "numbers = [0, 1, 2, 3, 4, 5]\nfor number in numbers:\n    print(number)" },
        { t: "p", c: "For loop กับ string:" },
        { t: "code", lang: "python", c: "# syntax\nfor iterator in string:\n    code goes here" },
        { t: "code", lang: "python", c: "language = 'Python'\nfor letter in language:\n    print(letter)\n\nfor i in range(len(language)):\n    print(language[i])" },
        { t: "p", c: "For loop กับ tuple:" },
        { t: "code", lang: "python", c: "# syntax\nfor iterator in tpl:\n    code goes here" },
        { t: "code", lang: "python", c: "numbers = (0, 1, 2, 3, 4, 5)\nfor number in numbers:\n    print(number)" },
        { t: "p", c: "For loop กับ dictionary — การ loop ผ่าน dictionary จะให้ key:" },
        { t: "code", lang: "python", c: "  # syntax\nfor iterator in dct:\n    code goes here" },
        { t: "code", lang: "python", c: "person = {\n    'first_name':'Asabeneh',\n    'last_name':'Yetayeh',\n    'age':250,\n    'country':'Finland',\n    'is_marred':True,\n    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],\n    'address':{\n        'street':'Space street',\n        'zipcode':'02210'\n    }\n}\nfor key in person:\n    print(key)\n\nfor key, value in person.items():\n    print(key, value)" },
        { t: "p", c: "For loop กับ set:" },
        { t: "code", lang: "python", c: "# syntax\nfor iterator in st:\n    code goes here" },
        { t: "code", lang: "python", c: "it_companies = {'Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon'}\nfor company in it_companies:\n    print(company)" },

        { t: "h3", c: "Break และ Continue — ส่วนที่ 2" },
        { t: "p", c: "Break ใน for loop:" },
        { t: "code", lang: "python", c: "# syntax\nfor iterator in sequence:\n    code goes here\n    if condition:\n        break" },
        { t: "code", lang: "python", c: "numbers = (0,1,2,3,4,5)\nfor number in numbers:\n    print(number)\n    if number == 3:\n        break" },
        { t: "p", c: "Continue ใน for loop:" },
        { t: "code", lang: "python", c: "  # syntax\nfor iterator in sequence:\n    code goes here\n    if condition:\n        continue" },
        { t: "code", lang: "python", c: "numbers = (0,1,2,3,4,5)\nfor number in numbers:\n    print(number)\n    if number == 3:\n        continue\n    print('Next number should be ', number + 1) if number != 5 else print(\"loop's end\")\nprint('outside the loop')" },

        { t: "h3", c: "ฟังก์ชัน Range" },
        { t: "p", c: "ฟังก์ชัน range() ใช้สร้าง list ของตัวเลข range(start, end, step) — default เริ่มที่ 0 และ step เป็น 1 ต้องการ end argument เสมอ:" },
        { t: "code", lang: "python", c: "lst = list(range(11))\nprint(lst) # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nst = set(range(1, 11))\nprint(st)  # {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}\n\nlst = list(range(0,11,2))\nprint(lst) # [0, 2, 4, 6, 8, 10]\nst = set(range(0,11,2))\nprint(st)  #  {0, 2, 4, 6, 8, 10}\n\nlst = list(range(11,0,-2))\nprint(lst) # [11,9,7,5,3,1]" },
        { t: "code", lang: "python", c: "# syntax\nfor iterator in range(start, end, step):" },
        { t: "code", lang: "python", c: "for number in range(11):\n    print(number)" },

        { t: "h3", c: "Nested For Loop" },
        { t: "code", lang: "python", c: "# syntax\nfor x in y:\n    for t in x:\n        print(t)" },
        { t: "code", lang: "python", c: "person = {\n    'first_name': 'Asabeneh',\n    'last_name': 'Yetayeh',\n    'age': 250,\n    'country': 'Finland',\n    'is_marred': True,\n    'skills': ['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],\n    'address': {\n        'street': 'Space street',\n        'zipcode': '02210'\n    }\n}\nfor key in person:\n    if key == 'skills':\n        for skill in person['skills']:\n            print(skill)" },

        { t: "h3", c: "For Else" },
        { t: "p", c: "ถ้าต้องการรัน block code เมื่อ loop จบ ใช้ else:" },
        { t: "code", lang: "python", c: "# syntax\nfor iterator in range(start, end, step):\n    do something\nelse:\n    print('The loop ended')" },
        { t: "code", lang: "python", c: "for number in range(11):\n    print(number)\nelse:\n    print('The loop stops at', number)" },

        { t: "h3", c: "Pass" },
        { t: "p", c: "ใน Python เมื่อต้องการ statement แต่ยังไม่ต้องการให้ทำอะไร ใช้ keyword pass:" },
        { t: "code", lang: "python", c: "for number in range(6):\n    pass" },

        { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 10" },

        { t: "h3", c: "ระดับ 1" },
        { t: "ol", c: [
          "วน loop ตั้งแต่ 0 ถึง 10 ด้วย for loop แล้วทำซ้ำด้วย while loop",
          "วน loop ตั้งแต่ 10 ถึง 0 ด้วย for loop แล้วทำซ้ำด้วย while loop",
          "เขียน loop ที่เรียก print() 7 ครั้งเพื่อให้ได้รูปสามเหลี่ยม:",
        ]},
        { t: "code", lang: "sh", c: "  #\n  ##\n  ###\n  ####\n  #####\n  ######\n  #######" },
        { t: "ol", c: [
          "ใช้ nested loops สร้าง pattern ต่อไปนี้:",
        ], start: 4 },
        { t: "code", lang: "sh", c: "# # # # # # # #\n# # # # # # # #\n# # # # # # # #\n# # # # # # # #\n# # # # # # # #\n# # # # # # # #\n# # # # # # # #\n# # # # # # # #" },
        { t: "ol", c: [
          "Print pattern ต่อไปนี้:",
        ], start: 5 },
        { t: "code", lang: "sh", c: "0 x 0 = 0\n1 x 1 = 1\n2 x 2 = 4\n3 x 3 = 9\n4 x 4 = 16\n5 x 5 = 25\n6 x 6 = 36\n7 x 7 = 49\n8 x 8 = 64\n9 x 9 = 81\n10 x 10 = 100" },
        { t: "ol", c: [
          "วน loop ผ่าน list ['Python', 'Numpy','Pandas','Django', 'Flask'] ด้วย for loop แล้ว print แต่ละ item",
          "ใช้ for loop วนจาก 0 ถึง 100 แล้ว print เฉพาะเลขคู่",
          "ใช้ for loop วนจาก 0 ถึง 100 แล้ว print เฉพาะเลขคี่",
        ], start: 6 },

        { t: "h3", c: "ระดับ 2" },
        { t: "ol", c: [
          "ใช้ for loop วนจาก 0 ถึง 100 แล้ว print ผลรวมของตัวเลขทั้งหมด",
        ]},
        { t: "code", lang: "sh", c: "The sum of all numbers is 5050." },
        { t: "ol", c: [
          "ใช้ for loop วนจาก 0 ถึง 100 แล้ว print ผลรวมของเลขคู่ทั้งหมดและผลรวมของเลขคี่ทั้งหมด",
        ], start: 2 },
        { t: "code", lang: "sh", c: "The sum of all evens is 2550. And the sum of all odds is 2500." },

        { t: "h3", c: "ระดับ 3" },
        { t: "ol", c: [
          "ไปที่โฟลเดอร์ data แล้วใช้ไฟล์ countries.py วน loop ผ่านประเทศต่าง ๆ และดึงประเทศที่มีคำว่า 'land'",
          "fruit list นี้ ['banana', 'orange', 'mango', 'lemon'] กลับลำดับโดยใช้ loop",
          "ไปที่โฟลเดอร์ data แล้วใช้ไฟล์ countries_data.py\n   1. จำนวนภาษาทั้งหมดในข้อมูลมีเท่าไร\n   2. หา 10 ภาษาที่มีคนพูดมากที่สุด\n   3. หา 10 ประเทศที่มีประชากรมากที่สุดในโลก",
        ]},
      ],
      en: [],
    },
  },
};
