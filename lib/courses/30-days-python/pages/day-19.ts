import type { Page } from "@/lib/types";

export const day19Page: Record<string, Page> = {
  "py30-day19": {
    slug: "py30-day19",
    title: "วันที่ 19 — การจัดการไฟล์ (File Handling)",
    lead: "เรียนรู้การอ่าน เขียน และจัดการไฟล์ประเภทต่าง ๆ ใน Python ตั้งแต่ TXT, JSON, CSV จนถึง XML",
    group: "สัปดาห์ที่ 4: เทคนิคระดับกลาง",
    blocks: [
      { t: "h2", c: "การจัดการไฟล์ (File Handling)" },
      {
        t: "p",
        c: "Python จัดการไฟล์ได้หลากหลาย ไฟล์ที่จะกล่าวถึง ได้แก่ text, json, csv, tsv และ xml ก่อนอื่นต้อง open ไฟล์ก่อน",
      },

      { t: "h2", c: "การ Open ไฟล์เพื่ออ่าน" },
      {
        t: "p",
        c: "open() รับ mode เป็น argument: r = read (default), a = append, w = write, x = create ถ้าไม่ระบุ mode จะใช้ r โดยปริยาย",
      },

      { t: "h3", c: "การอ่านด้วย read()" },
      {
        t: "code",
        lang: "python",
        c: "# syntax\nopen('filename', mode)\n# mode\n# 'r' = read,\n# 'a'= append\n# 'w' = write\n# 'x' = create\n# os\n# 'b' = binary mode\n# 't' = text mode (default)",
      },
      {
        t: "code",
        lang: "python",
        c: "f = open('./files/reading_file_example.txt')\nprint(f) # <_io.TextIOWrapper name='./files/reading_file_example.txt' mode='r' encoding='UTF-8'>",
      },
      {
        t: "code",
        lang: "python",
        c: "f = open('./files/reading_file_example.txt')\nprint(f.read()) # read the whole text",
      },
      {
        t: "code",
        lang: "python",
        c: "f = open('./files/reading_file_example.txt')\nprint(f.read(10)) # read the first 10 characters",
      },

      { t: "h3", c: "การอ่านด้วย readline()" },
      {
        t: "code",
        lang: "python",
        c: "f = open('./files/reading_file_example.txt')\nprint(f.readline()) # read only the first line",
      },

      { t: "h3", c: "การอ่านด้วย readlines()" },
      {
        t: "code",
        lang: "python",
        c: "f = open('./files/reading_file_example.txt')\nprint(f.readlines()) # read all the text line by line and return a list of lines",
      },

      { t: "h3", c: "การอ่านด้วย splitlines()" },
      {
        t: "code",
        lang: "python",
        c: "f = open('./files/reading_file_example.txt')\nlines = f.read().splitlines()\nprint(type(lines))\nprint(lines)",
      },

      { t: "h3", c: "การใช้ with เพื่อ Close อัตโนมัติ" },
      {
        t: "p",
        c: "วิธีที่ดีกว่าคือใช้ with เพื่อให้ Python จัดการปิดไฟล์ให้อัตโนมัติ:",
      },
      {
        t: "code",
        lang: "python",
        c: "with open('./files/reading_file_example.txt') as f:\n    lines = f.read().splitlines()\n    print(type(lines))\n    print(lines)",
      },

      { t: "h2", c: "การ Open ไฟล์เพื่อเขียนและอัปเดต" },

      { t: "h3", c: "การเพิ่มข้อมูล (Append)" },
      {
        t: "p",
        c: "ใช้ mode 'a' เพื่อเพิ่มข้อมูลต่อท้ายไฟล์ที่มีอยู่ หรือสร้างไฟล์ใหม่ถ้าไม่มี:",
      },
      {
        t: "code",
        lang: "python",
        c: "with open('./files/reading_file_example.txt','a') as f:\n    f.write('This text has to be appended at the end')",
      },

      { t: "h3", c: "การเขียน (Write)" },
      {
        t: "p",
        c: "ใช้ mode 'w' เพื่อเขียนทับไฟล์เดิมหรือสร้างไฟล์ใหม่:",
      },
      {
        t: "code",
        lang: "python",
        c: "with open('./files/writing_file_example.txt','w') as f:\n    f.write('This text will be written in a newly created file')",
      },

      { t: "h2", c: "การลบไฟล์" },
      {
        t: "p",
        c: "ใช้ os module เพื่อลบไฟล์:",
      },
      {
        t: "code",
        lang: "python",
        c: "import os\nos.remove('./files/example.txt')",
      },
      {
        t: "p",
        c: "ควรตรวจสอบว่าไฟล์มีอยู่ก่อนลบเพื่อป้องกัน error:",
      },
      {
        t: "code",
        lang: "python",
        c: "import os\nif os.path.exists('./files/example.txt'):\n    os.remove('./files/example.txt')\nelse:\n    print('The file does not exist')",
      },

      { t: "h2", c: "ประเภทไฟล์" },

      { t: "h3", c: "ไฟล์ TXT" },
      {
        t: "p",
        c: "ไฟล์ .txt คือรูปแบบที่ง่ายที่สุด ตัวอย่างข้างต้นเป็นตัวอย่างการทำงานกับ txt ไฟล์",
      },

      { t: "h3", c: "ไฟล์ JSON" },
      {
        t: "p",
        c: "JSON (JavaScript Object Notation) เป็นรูปแบบข้อมูลที่ใช้กันอย่างแพร่หลาย Python มี json module สำหรับจัดการ:",
      },
      {
        t: "code",
        lang: "python",
        c: "# dictionary\nperson_dct= {\n    \"name\":\"Asabeneh\",\n    \"country\":\"Finland\",\n    \"city\":\"Helsinki\",\n    \"skills\":[\"JavaScrip\", \"React\",\"Python\"]\n}\n# json.dumps converts python dictionary to json string\njson_string = json.dumps(person_dct)\nprint(type(json_string))\nprint(json_string)",
      },
      {
        t: "code",
        lang: "python",
        c: "import json\n# JSON\nperson_json = '''\n{\n    \"name\": \"Asabeneh\",\n    \"country\": \"Finland\",\n    \"city\": \"Helsinki\",\n    \"skills\": [\"JavaScrip\", \"React\", \"Python\"]\n}'''\n# let us change JSON to dictionary\nperson_dct = json.loads(person_json)\nprint(type(person_dct))\nprint(person_dct)\nprint(person_dct['name'])",
      },
      {
        t: "p",
        c: "การบันทึก JSON ลงไฟล์ด้วย json.dump():",
      },
      {
        t: "code",
        lang: "python",
        c: "import json\nperson = {\n    \"name\": \"Asabeneh\",\n    \"country\": \"Finland\",\n    \"city\": \"Helsinki\",\n    \"skills\": [\"JavaScrip\", \"React\", \"Python\"]\n}\nwith open('./files/json_example.json', 'w', encoding='utf-8') as f:\n    json.dump(person, f, ensure_ascii=False, indent=4)",
      },

      { t: "h3", c: "ไฟล์ CSV" },
      {
        t: "p",
        c: "CSV (comma separated values) ใช้บันทึกข้อมูลตาราง Python มี csv module หรือใช้ pandas:",
      },
      {
        t: "code",
        lang: "python",
        c: "import csv\nwith open('./files/csv_example.csv') as f:\n    csv_reader = csv.reader(f, delimiter=',')\n    line_count = 0\n    for row in csv_reader:\n        if line_count == 0:\n            print(f'Column names are {{\", \".join(row)}}')\n            line_count += 1\n        else:\n            print(\n                f'\\t{row[0]} is a teachers. He lives in {row[1]}, {row[2]}.')\n            line_count += 1\n    print(f'Number of lines:  {line_count}')",
      },

      { t: "h3", c: "ไฟล์ XLSX" },
      {
        t: "p",
        c: "XLSX คือรูปแบบไฟล์ Excel ใช้ openpyxl หรือ xlrd ในการอ่าน:",
      },
      {
        t: "code",
        lang: "python",
        c: "import xlrd\nexcel_book = xlrd.open_workbook('sample.xls')\nprint(excel_book.nsheets)\nprint(excel_book.sheet_names())",
      },

      { t: "h3", c: "ไฟล์ XML" },
      {
        t: "p",
        c: "XML คล้ายกับ HTML ใช้ xml.etree.ElementTree ในการ parse:",
      },
      {
        t: "code",
        lang: "python",
        c: "import xml.etree.ElementTree as ET\ntree = ET.parse('./files/xml_example.xml')\nroot = tree.getroot()\nprint('Root tag:', root.tag)\nprint('Attribute:', root.attrib)\nfor child in root:\n    print('field: ', child.tag)",
      },

      { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 19" },

      { t: "h3", c: "ระดับ 1" },
      {
        t: "ol",
        c: [
          "เขียน function ที่นับจำนวนบรรทัดและจำนวนคำในไฟล์ text — ไฟล์ทั้งหมดอยู่ในโฟลเดอร์ data:\n1) อ่านไฟล์ obama_speech.txt และนับจำนวนบรรทัดและคำ\n2) อ่านไฟล์ michelle_obama_speech.txt และนับจำนวนบรรทัดและคำ\n3) อ่านไฟล์ donald_speech.txt และนับจำนวนบรรทัดและคำ\n4) อ่านไฟล์ melina_trump_speech.txt และนับจำนวนบรรทัดและคำ",
          "อ่านไฟล์ countries_data.json ในโฟลเดอร์ data แล้วสร้าง function ที่หา 10 ภาษาที่มีคนพูดมากที่สุด",
        ],
      },
      {
        t: "code",
        lang: "python",
        c: "# ผลลัพธ์ควรมีลักษณะดังนี้\nprint(most_spoken_languages(filename='./data/countries_data.json', 10))\n[(91, 'English'),\n(45, 'French'),\n(25, 'Arabic'),\n(24, 'Spanish'),\n(9, 'Russian'),\n(9, 'Portuguese'),\n(8, 'Dutch'),\n(7, 'German'),\n(5, 'Chinese'),\n(4, 'Swahili'),\n(4, 'Serbian')]\n\n# ผลลัพธ์ควรมีลักษณะดังนี้\nprint(most_spoken_languages(filename='./data/countries_data.json', 3))\n[(91, 'English'),\n(45, 'French'),\n(25, 'Arabic')]",
      },
      {
        t: "ol",
        c: [
          "อ่านไฟล์ countries_data.json ในโฟลเดอร์ data แล้วสร้าง function ที่สร้าง list ของ 10 ประเทศที่มีประชากรมากที่สุด",
        ],
        start: 3,
      },
      {
        t: "code",
        lang: "python",
        c: "# ผลลัพธ์ควรมีลักษณะดังนี้\nprint(most_populated_countries(filename='./data/countries_data.json', 10))\n\n[\n{'country': 'China', 'population': 1377422166},\n{'country': 'India', 'population': 1295210000},\n{'country': 'United States of America', 'population': 323947000},\n{'country': 'Indonesia', 'population': 258705000},\n{'country': 'Brazil', 'population': 206135893},\n{'country': 'Pakistan', 'population': 194125062},\n{'country': 'Nigeria', 'population': 186988000},\n{'country': 'Bangladesh', 'population': 161006790},\n{'country': 'Russian Federation', 'population': 146599183},\n{'country': 'Japan', 'population': 126960000}\n]\n\n# ผลลัพธ์ควรมีลักษณะดังนี้\nprint(most_populated_countries(filename='./data/countries_data.json', 3))\n[\n{'country': 'China', 'population': 1377422166},\n{'country': 'India', 'population': 1295210000},\n{'country': 'United States of America', 'population': 323947000}\n]",
      },

      { t: "h3", c: "ระดับ 2" },
      {
        t: "ol",
        c: [
          "แตก (extract) ที่อยู่อีเมลขาเข้าทั้งหมดเป็น list จากไฟล์ email_exchange_big.txt",
          "หาคำที่พบบ่อยที่สุดในภาษาอังกฤษ ตั้งชื่อ function ว่า find_most_common_words รับ parameter 2 ตัว ได้แก่ string หรือไฟล์ และจำนวนเต็มบวกที่ระบุจำนวนคำ function จะคืนค่า array ของ tuple เรียงลำดับจากมากไปน้อย",
        ],
      },
      {
        t: "code",
        lang: "python",
        c: "# ผลลัพธ์ควรมีลักษณะดังนี้\nprint(find_most_common_words('sample.txt', 10))\n[(10, 'the'),\n(8, 'be'),\n(6, 'to'),\n(6, 'of'),\n(5, 'and'),\n(4, 'a'),\n(4, 'in'),\n(3, 'that'),\n(2, 'have'),\n(2, 'I')]\n\n# ผลลัพธ์ควรมีลักษณะดังนี้\nprint(find_most_common_words('sample.txt', 5))\n\n[(10, 'the'),\n(8, 'be'),\n(6, 'to'),\n(6, 'of'),\n(5, 'and')]",
      },
      {
        t: "ol",
        c: [
          "ใช้ function find_most_frequent_words เพื่อหา:\n1) 10 คำที่ปรากฏบ่อยที่สุดในสุนทรพจน์ของ Obama\n2) 10 คำที่ปรากฏบ่อยที่สุดในสุนทรพจน์ของ Michelle Obama\n3) 10 คำที่ปรากฏบ่อยที่สุดในสุนทรพจน์ของ Trump\n4) 10 คำที่ปรากฏบ่อยที่สุดในสุนทรพจน์ของ Melina Trump",
          "เขียน application Python ที่ตรวจสอบความคล้ายคลึงระหว่างข้อความ 2 ชิ้น รับ parameter เป็นไฟล์หรือ string แล้วประเมินความคล้ายคลึงของข้อความทั้งสอง เช่น ตรวจสอบความคล้ายคลึงระหว่างบทพูดของ Michelle กับ Melina อาจต้องใช้หลาย function ได้แก่ clean_text, remove_support_words และ check_text_similarity รายการ stop words อยู่ในโฟลเดอร์ data",
          "หา 10 คำที่ซ้ำมากที่สุดในไฟล์ romeo_and_juliet.txt",
          "อ่านไฟล์ hacker_news.csv แล้วหา:\n1) นับจำนวนบรรทัดที่มีคำว่า python หรือ Python\n2) นับจำนวนบรรทัดที่มีคำว่า JavaScript, javascript หรือ Javascript\n3) นับจำนวนบรรทัดที่มีคำว่า Java แต่ไม่มี JavaScript",
        ],
        start: 3,
      },
    ],
  },
};
