import type { Page } from "@/lib/types";

export const day20Page: Record<string, Page> = {
  "py30-day20": {
    slug: "py30-day20",
    title: "วันที่ 20 — ตัวจัดการแพ็กเกจ (Package Manager)",
    lead: "เรียนรู้การใช้ PIP จัดการ packages ใน Python การดึงข้อมูลจาก URL ด้วย requests และการสร้าง Package เป็นของตัวเอง",
    group: "สัปดาห์ที่ 4: เทคนิคระดับกลาง",
    blocks: [
      { t: "h2", c: "Python Package Manager" },
      {
        t: "p",
        c: "Package คือโมดูลหรือกลุ่มโมดูลที่ถูกรวมกัน ใน Python เราใช้ pip (Pip Installs Packages) ในการจัดการ packages",
      },

      { t: "h3", c: "PIP คืออะไร" },
      {
        t: "p",
        c: "PIP ย่อมาจาก Preferred Installer Program หรือ Pip Installs Packages เป็น package manager สำหรับ Python ใช้ install และจัดการ packages ที่ไม่ได้มาพร้อมกับ Python",
      },

      { t: "h3", c: "การติดตั้ง PIP" },
      {
        t: "p",
        c: "ถ้าใช้ Python 3.4 ขึ้นไป pip ถูกติดตั้งมาพร้อมกันแล้ว ตรวจสอบได้ด้วย:",
      },
      { t: "code", lang: "shell", c: "pip --version" },
      {
        t: "p",
        c: "ถ้ายังไม่มี ติดตั้งได้โดย:",
      },
      { t: "code", lang: "shell", c: "asabeneh@Asabeneh:~$ pip install pip" },

      { t: "h3", c: "การ Install Packages" },
      {
        t: "p",
        c: "ลองติดตั้ง numpy ซึ่งเป็น package สำหรับงาน data science:",
      },
      { t: "code", lang: "shell", c: "pip install numpy" },
      {
        t: "p",
        c: "เริ่มใช้ numpy:",
      },
      {
        t: "code",
        lang: "python",
        c: "import numpy\nprint(numpy.version.version)\nprint(numpy.pi)",
      },
      {
        t: "p",
        c: "ติดตั้ง pandas:",
      },
      { t: "code", lang: "shell", c: "pip install pandas" },
      {
        t: "code",
        lang: "python",
        c: "import pandas\nprint(pandas.__version__)",
      },

      { t: "h3", c: "webbrowser Module" },
      {
        t: "p",
        c: "ลองนำเข้า web browser module ซึ่งช่วยให้เราเปิดเว็บไซต์ได้ เราไม่จำเป็นต้อง install module นี้ เพราะมันถูกติดตั้งมาพร้อมกับ Python 3 แล้ว ตัวอย่างเช่น ถ้าต้องการเปิดเว็บไซต์จำนวนมากในเวลาเดียวกัน หรือต้องการ schedule บางอย่าง สามารถใช้ webbrowser module นี้ได้",
      },
      {
        t: "code",
        lang: "python",
        c: "import webbrowser # web browser module to open websites\n\n# list of urls: python\nurl_lists = [\n    'http://www.python.org',\n    'https://www.linkedin.com/in/asabeneh/',\n    'https://github.com/Asabeneh',\n    'https://twitter.com/Asabeneh',\n]\n\n# opens the above list of websites in a different tab\nfor url in url_lists:\n    webbrowser.open_new_tab(url)",
      },

      { t: "h3", c: "การ Uninstall Packages" },
      { t: "code", lang: "shell", c: "pip uninstall packagename" },

      { t: "h3", c: "การดู List Packages" },
      { t: "code", lang: "shell", c: "pip list" },

      { t: "h3", c: "pip show" },
      { t: "code", lang: "shell", c: "pip show packagename\n# pip show numpy\n# Name: numpy\n# Version: 1.13.1\n# Summary: NumPy: array processing for numbers, strings, records, and objects.\n# Home-page: http://www.numpy.org\n# Author: NumPy Developers\n# Author-email: numpy-discussion@python.org\n# License: BSD\n# Location: /usr/local/lib/python3.6/dist-packages\n# Requires:\n# Required-by: matplotlib, pandas, scikit-learn, scipy" },

      { t: "h3", c: "pip freeze" },
      {
        t: "p",
        c: "ใช้สร้าง requirements.txt ที่บันทึก packages และ versions ทั้งหมดในโปรเจกต์:",
      },
      { t: "code", lang: "shell", c: "pip freeze\n# asn1crypto==1.4.0\n# beautifulsoup4==4.9.3\n# ...\n\n# เซฟลงไฟล์\npip freeze > requirements.txt\n\n# ติดตั้งจาก requirements.txt\npip install -r requirements.txt" },

      { t: "h2", c: "การอ่านข้อมูลจาก URL" },
      {
        t: "p",
        c: "Python มี packages ต่าง ๆ สำหรับอ่านข้อมูลจาก URL ที่นิยมคือ requests:",
      },
      { t: "code", lang: "shell", c: "pip install requests" },
      {
        t: "code",
        lang: "python",
        c: "import requests # importing requests module\n\nurl = 'https://restcountries.com/v3.1/all'  # countries api\nresponse = requests.get(url)  # opening a url\nprint(response.status_code)  # status code, success: 200\ncountries = response.json()\nprint(type(countries))\nprint(countries[:1])  # first country",
      },
      {
        t: "p",
        c: "ตัวอย่างการใช้ response object:",
      },
      {
        t: "code",
        lang: "python",
        c: "import requests\nurl = 'https://api.github.com/users/asabeneh'  # github api\nresponse = requests.get(url)\nprint(response.status_code)  # status code\nprint(response.headers)      # headers\nprint(response.text)         # response text (string)\nprint(response.json())       # response as dict",
      },

      { t: "h2", c: "การสร้าง Package" },
      {
        t: "p",
        c: "Package คือโฟลเดอร์ที่มีไฟล์ __init__.py รวมกับ modules ต่าง ๆ ตัวอย่างการสร้าง package ชื่อ mypackage:",
      },
      {
        t: "code",
        lang: "text",
        c: "─ mypackage\n    ├── __init__.py\n    ├── arithmetic.py\n    └── greet.py",
      },
      {
        t: "code",
        lang: "python",
        c: "# arithmetic.py\ndef add_numbers(num1, num2):\n    return num1 + num2\n\n\ndef subtract_numbers(num1, num2):\n    return num1 - num2\n\n\ndef multiply_numbers(num1, num2):\n    return num1 * num2\n\n\ndef division(num1, num2):\n    return num1 / num2",
      },
      {
        t: "code",
        lang: "python",
        c: "# greet.py\ndef greet_person(firstname, lastname):\n    return f'{firstname} {lastname}, welcome to 30DaysOfPython Challenge!'",
      },
      {
        t: "code",
        lang: "python",
        c: "# __init__.py\nfrom mypackage.arithmetic import add_numbers, subtract_numbers, multiply_numbers, division\nfrom mypackage.greet import greet_person",
      },
      {
        t: "p",
        c: "การใช้ package:",
      },
      {
        t: "code",
        lang: "python",
        c: "from mypackage import add_numbers, subtract_numbers, multiply_numbers, division, greet_person\nprint(add_numbers(1, 2))        # 3\nprint(subtract_numbers(2, 1))   # 1\nprint(multiply_numbers(9, 9))   # 81\nprint(division(1, 2))           # 0.5\nprint(greet_person('Asabeneh', 'Yetayeh'))",
      },

      { t: "h2", c: "ข้อมูลเพิ่มเติมเกี่ยวกับ Packages" },
      {
        t: "p",
        c: "Packages ที่น่าสนใจแยกตามหมวด:",
      },
      {
        t: "ul",
        c: [
          "Database: psycopg2, SQLAlchemy",
          "Web: flask, django, fastapi",
          "HTML Parser: beautifulsoup4, html5lib",
          "XML: lxml",
          "GUI: tkinter, PyQt5, kivy",
          "Data Science: numpy, pandas, scipy, matplotlib, seaborn",
          "Network: requests, httpx",
          "Time: arrow",
          "Cryptography: pyca/cryptography, PyNaCl",
          "Testing: pytest, doctest",
          "Serialization: protobuf, msgpack",
        ],
      },

      { t: "h2", c: "💻 แบบฝึกหัด — วันที่ 20" },
      {
        t: "ol",
        c: [
          "อ่านข้อมูลจาก URL นี้แล้วหา 10 คำที่พบบ่อยที่สุด: romeo_and_juliet = 'http://www.gutenberg.org/files/1112/1112.txt'",
          "อ่านข้อมูลจาก cats API (cats_api = 'https://api.thecatapi.com/v1/breeds') แล้วหา: (1) ค่า min, max, mean, median, standard deviation ของน้ำหนักแมวในหน่วยเมตริก (2) ค่า min, max, mean, median, standard deviation ของอายุขัยแมวในปี (3) สร้าง frequency table ของประเทศและสายพันธุ์แมว",
          "อ่านข้อมูลจาก countries API แล้วหา: (1) 10 ประเทศที่มีพื้นที่ใหญ่ที่สุด (2) 10 ภาษาที่มีคนพูดมากที่สุด (3) จำนวนภาษาทั้งหมดใน countries API",
          "UCI เป็นแหล่งข้อมูล dataset สำหรับ data science และ machine learning อ่านเนื้อหาจาก UCL (https://archive.ics.uci.edu/ml/datasets.php) การทำโดยไม่ใช้ library เพิ่มเติมอาจยาก ดังนั้นลองใช้ BeautifulSoup4",
        ],
      },
    ],
  },
};
