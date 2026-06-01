import type { Page } from "@/lib/types";

const GROUP = "บทที่ 4: โครงสร้างโปรเจกต์ & เครื่องมือ";

export const projectToolingPages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "proj-modules": {
    slug: "proj-modules",
    title: "Module & import",
    lead: "แยกโค้ดออกเป็นหลายไฟล์แล้วเรียกใช้กัน — ก้าวแรกของการเลิกเขียนทุกอย่างในไฟล์เดียว",
    group: GROUP,
    blocks: [
      { t: "p", c: "เมื่อโปรแกรมโตขึ้น การยัดทุกอย่างไว้ไฟล์เดียวทำให้หาของยากและแก้ลำบาก module คือการแยกโค้ดเป็นหลายไฟล์ .py แล้ว import มาใช้ข้ามกัน — เป็นรากฐานของการจัดโปรเจกต์ที่ดี" },

      { t: "h2", c: "module คือไฟล์ .py หนึ่งไฟล์" },
      { t: "p", c: "ทุกไฟล์ .py เป็น module อยู่แล้ว ตั้งชื่อไฟล์ให้สื่อความหมาย แล้ว import ฟังก์ชัน/ตัวแปรจากไฟล์อื่นมาใช้ได้" },
      { t: "code", lang: "python", c: "# ไฟล์ mathutils.py\ndef add(a, b):\n    return a + b\n\nPI = 3.14159" },
      { t: "code", lang: "python", c: "# ไฟล์ main.py (อยู่โฟลเดอร์เดียวกัน)\nimport mathutils\n\nprint(mathutils.add(2, 3))   # 5\nprint(mathutils.PI)          # 3.14159" },

      { t: "h2", c: "รูปแบบการ import" },
      { t: "code", lang: "python", c: "import mathutils              # ใช้ mathutils.add(...)\nfrom mathutils import add    # ใช้ add(...) ตรง ๆ\nfrom mathutils import add, PI\nimport mathutils as mu       # ตั้งชื่อย่อ ใช้ mu.add(...)\nfrom mathutils import *      # นำเข้าทุกอย่าง (ไม่แนะนำ — ชนกันได้)" },
      { t: "callout", title: "เลี่ยง from module import *", warn: true, c: "การ import * นำเข้าทุกชื่อจาก module ทำให้ไม่รู้ว่าชื่อไหนมาจากไหน และอาจทับชื่อที่มีอยู่จนเกิด bug ลึกลับ — ระบุชื่อที่ต้องใช้ให้ชัดเจนเสมอ" },

      { t: "h2", c: "if __name__ == \"__main__\":" },
      { t: "p", c: "เมื่อไฟล์ถูก import โค้ดระดับบนสุดจะถูกรันด้วย ถ้าไม่อยากให้รันตอน import ให้ใส่ guard นี้ — มันรันเฉพาะตอนเรียกไฟล์นั้นตรง ๆ เท่านั้น" },
      { t: "code", lang: "python", c: "# mathutils.py\ndef add(a, b):\n    return a + b\n\nif __name__ == \"__main__\":\n    # รันเฉพาะตอน 'python mathutils.py' ตรง ๆ\n    # ไม่รันตอนถูก import จากไฟล์อื่น\n    print(\"ทดสอบ:\", add(2, 3))" },
      { t: "callout", title: "__name__ คืออะไร", c: "Python ตั้งตัวแปร __name__ ให้แต่ละ module ถ้าไฟล์ถูกรันตรง ๆ ค่าจะเป็น \"__main__\" แต่ถ้าถูก import ค่าจะเป็นชื่อ module — guard นี้จึงแยก \"รันเอง\" ออกจาก \"ถูกเรียกใช้\" ได้" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "ทุกไฟล์ .py เป็น module — import มาใช้ข้ามไฟล์ได้",
          "import มีหลายแบบ: import x / from x import y / as ชื่อย่อ",
          "เลี่ยง import * เพราะทำให้ชื่อชนและไม่รู้ที่มา",
          "if __name__ == \"__main__\": รันเฉพาะตอนเรียกไฟล์ตรง ๆ ไม่รันตอน import",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) แยกฟังก์ชันคำนวณไปไว้ไฟล์ calc.py แล้ว import มาใช้ใน main.py  2) ลอง import 3 แบบ (import, from import, as) กับ module เดียวกัน  3) ใส่ if __name__==\"__main__\" ในไฟล์ที่มีโค้ดทดสอบ แล้ว import ดูว่าโค้ดทดสอบไม่รัน" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Package & โครงสร้างโฟลเดอร์ →", slug: "proj-packages", desc: "จัดหลายไฟล์เป็นโฟลเดอร์โปรเจกต์" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "proj-packages": {
    slug: "proj-packages",
    title: "Package & โครงสร้างโฟลเดอร์",
    lead: "จัดหลาย module เป็นโฟลเดอร์ และวาง layout โปรเจกต์แบบที่ใช้กันจริง",
    group: GROUP,
    blocks: [
      { t: "p", c: "เมื่อ module เยอะขึ้น เราจัดมันเป็น package (โฟลเดอร์) เพื่อให้เป็นระเบียบ หัวข้อนี้สอนวิธีสร้าง package และวาง layout โปรเจกต์มาตรฐานที่คนอื่นเปิดมาแล้วเข้าใจทันที" },

      { t: "h2", c: "package = โฟลเดอร์ของ module" },
      { t: "p", c: "package คือโฟลเดอร์ที่รวม module หลายไฟล์ เดิมต้องมีไฟล์ __init__.py (อาจว่างเปล่า) เพื่อบอกว่าโฟลเดอร์นี้เป็น package — Python สมัยใหม่ไม่บังคับแล้วแต่ยังนิยมใส่" },
      { t: "code", lang: "text", c: "myapp/\n├── __init__.py        # บอกว่า myapp เป็น package\n├── models.py\n└── utils/\n    ├── __init__.py\n    └── text.py" },
      { t: "code", lang: "python", c: "# import จาก package (ใช้จุดคั่นชั้น)\nfrom myapp import models\nfrom myapp.utils.text import clean\nfrom myapp.utils import text" },

      { t: "h2", c: "layout โปรเจกต์มาตรฐาน" },
      { t: "p", c: "โปรเจกต์จริงมักจัดแบบนี้ — แยกโค้ด (src), เทสต์ (tests), และไฟล์ตั้งค่าออกจากกันชัดเจน" },
      { t: "code", lang: "text", c: "my-project/\n├── README.md          # อธิบายโปรเจกต์ + วิธีรัน\n├── requirements.txt   # รายการ dependency\n├── .gitignore         # ไฟล์ที่ไม่เอาเข้า git\n├── src/\n│   └── myapp/\n│       ├── __init__.py\n│       ├── main.py\n│       └── models.py\n└── tests/\n    └── test_models.py" },
      { t: "callout", title: "ทำไมต้องแยกให้เป็นระเบียบ", c: "layout ที่ดีทำให้คนอื่น (และตัวเราในอีก 6 เดือน) เปิดมาแล้วรู้ทันทีว่าอะไรอยู่ตรงไหน — โค้ดอยู่ src, เทสต์อยู่ tests, README บอกวิธีเริ่ม นี่คือมาตรฐานที่ทุกโปรเจกต์ Python ทำคล้ายกัน" },

      { t: "h2", c: "absolute vs relative import" },
      { t: "code", lang: "python", c: "# absolute import (แนะนำ — ชัดเจน อ่านง่าย)\nfrom myapp.utils.text import clean\n\n# relative import (อ้างตำแหน่งเทียบไฟล์ปัจจุบัน)\nfrom .utils.text import clean      # . = แพ็กเกจปัจจุบัน\nfrom ..models import User          # .. = แพ็กเกจแม่" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "package = โฟลเดอร์รวม module (นิยมมี __init__.py)",
          "import ข้ามชั้นด้วยจุด: from myapp.utils.text import clean",
          "layout มาตรฐาน: src/ (โค้ด), tests/ (เทสต์), README, requirements.txt, .gitignore",
          "นิยม absolute import เพราะชัดเจนกว่า relative",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง package ชื่อ myapp ที่มี models.py และ utils/text.py  2) import ฟังก์ชันจาก myapp.utils.text มาใช้  3) จัดโปรเจกต์เล็ก ๆ ตาม layout มาตรฐาน (src/tests/README)  4) อธิบายข้อดีของการแยก tests ออกจาก src" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Virtual Environment & pip →", slug: "proj-venv", desc: "แยก dependency แต่ละโปรเจกต์ไม่ให้ตีกัน" },
          { title: "← ก่อนหน้า: Module & import", slug: "proj-modules" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "proj-venv": {
    slug: "proj-venv",
    title: "Virtual Environment & pip",
    lead: "แยกชุด library ของแต่ละโปรเจกต์ออกจากกัน เพื่อไม่ให้เวอร์ชันตีกัน",
    group: GROUP,
    blocks: [
      { t: "p", c: "แต่ละโปรเจกต์ต้องการ library คนละชุด คนละเวอร์ชัน ถ้าติดตั้งรวมกันหมดจะตีกัน virtual environment (venv) คือ \"กล่องแยก\" ของแต่ละโปรเจกต์ — ทักษะพื้นฐานที่ทุกโปรเจกต์ Python จริงต้องใช้" },

      { t: "h2", c: "ทำไมต้อง venv" },
      { t: "p", c: "ลองนึกภาพ: โปรเจกต์ A ต้องใช้ Django 3 แต่โปรเจกต์ B ต้องใช้ Django 5 ถ้าติดตั้งลงเครื่องรวมกันจะมีได้แค่เวอร์ชันเดียว venv แก้ปัญหานี้โดยให้แต่ละโปรเจกต์มีชุด library ของตัวเอง" },

      { t: "h2", c: "สร้างและเปิดใช้งาน venv" },
      { t: "code", lang: "bash", c: "# สร้าง venv ชื่อ .venv ในโฟลเดอร์โปรเจกต์\npython -m venv .venv\n\n# เปิดใช้งาน (activate)\nsource .venv/bin/activate      # macOS / Linux\n# .venv\\Scripts\\activate       # Windows\n\n# พอ activate แล้ว prompt จะมี (.venv) นำหน้า\n# ปิดใช้งานเมื่อเสร็จ\ndeactivate" },
      { t: "callout", title: "อย่า pip install ลง global", warn: true, c: "ติดตั้ง library ลงเครื่องส่วนกลาง (global) ทำให้ทุกโปรเจกต์ใช้ชุดเดียวกันจนตีกัน และทำให้ระบบรก — สร้าง venv ต่อโปรเจกต์เสมอ แล้ว activate ก่อน pip install ทุกครั้ง" },

      { t: "h2", c: "pip — ติดตั้ง library" },
      { t: "code", lang: "bash", c: "pip install requests           # ติดตั้ง library\npip install requests==2.31.0   # ระบุเวอร์ชัน\npip list                       # ดูที่ติดตั้งแล้ว\npip uninstall requests         # ถอนออก" },

      { t: "h2", c: "requirements.txt — บันทึก dependency" },
      { t: "p", c: "เพื่อให้คนอื่น (หรือเครื่อง production) ติดตั้ง library ชุดเดียวกับเราได้ ให้บันทึกรายการลง requirements.txt" },
      { t: "code", lang: "bash", c: "# บันทึกทุก library + เวอร์ชันปัจจุบันลงไฟล์\npip freeze > requirements.txt\n\n# คนอื่นติดตั้งตามได้ด้วยคำสั่งเดียว\npip install -r requirements.txt" },
      { t: "callout", title: ".venv ไม่เข้า git", c: "โฟลเดอร์ .venv ใหญ่และเฉพาะเครื่อง — ใส่ใน .gitignore เสมอ แล้วเอาแค่ requirements.txt เข้า git คนอื่น clone ไปแล้วสร้าง venv + ติดตั้งตาม requirements เองได้" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "venv = กล่อง library แยกต่อโปรเจกต์ ป้องกันเวอร์ชันตีกัน",
          "สร้าง: python -m venv .venv แล้ว activate ก่อนทำงาน",
          "pip install ติดตั้ง, pip freeze > requirements.txt บันทึก",
          "pip install -r requirements.txt ติดตั้งตามรายการ; .venv ใส่ .gitignore",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง venv ในโฟลเดอร์โปรเจกต์แล้ว activate  2) pip install requests แล้ว pip list ดู  3) สร้าง requirements.txt ด้วย pip freeze  4) ลอง deactivate แล้วสังเกตว่า (.venv) หายจาก prompt" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: สร้าง CLI ด้วย argparse →", slug: "proj-cli", desc: "ทำสคริปต์ให้รับ argument จาก command line" },
          { title: "← ก่อนหน้า: Package & โครงสร้าง", slug: "proj-packages" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "proj-cli": {
    slug: "proj-cli",
    title: "สร้าง CLI ด้วย argparse",
    lead: "ทำสคริปต์ให้รับ argument จาก command line อย่างมืออาชีพ พร้อม --help อัตโนมัติ",
    group: GROUP,
    blocks: [
      { t: "p", c: "สคริปต์ที่ดีควรรับค่าจากผู้ใช้ผ่าน command line ได้ เช่น python tool.py data.txt --verbose โมดูล argparse ช่วยจัดการ argument ให้เรียบร้อย พร้อมสร้างข้อความ help และตรวจชนิดข้อมูลให้อัตโนมัติ" },

      { t: "h2", c: "sys.argv — วิธีดิบ" },
      { t: "p", c: "ก่อนรู้จัก argparse ลองดูวิธีดิบ: sys.argv คือ list ของ argument ที่ส่งมา (ตัวแรกคือชื่อไฟล์) — ใช้ได้แต่ต้องจัดการเองทุกอย่าง" },
      { t: "code", lang: "python", c: "import sys\nprint(sys.argv)        # ['tool.py', 'data.txt', '--verbose']\n# ต้องเช็คจำนวน, แปลงชนิด, ทำ help เองทั้งหมด — ยุ่งยาก" },

      { t: "h2", c: "argparse — วิธีที่ใช้จริง" },
      { t: "code", lang: "python", c: "import argparse\n\nparser = argparse.ArgumentParser(description=\"นับคำในไฟล์\")\nparser.add_argument(\"filename\", help=\"ไฟล์ที่จะอ่าน\")          # positional\nparser.add_argument(\"--upper\", action=\"store_true\", help=\"แปลงเป็นตัวใหญ่\")  # flag\nparser.add_argument(\"--repeat\", type=int, default=1, help=\"ทำซ้ำกี่ครั้ง\")   # มีค่า + ชนิด\n\nargs = parser.parse_args()\nprint(args.filename)   # ค่าที่รับมา\nprint(args.upper)      # True/False\nprint(args.repeat)     # int" },
      { t: "code", lang: "bash", c: "python tool.py data.txt --upper --repeat 3\n# args.filename = 'data.txt', args.upper = True, args.repeat = 3" },

      { t: "h2", c: "--help ได้มาฟรี" },
      { t: "p", c: "argparse สร้าง --help ให้อัตโนมัติจากที่เราระบุ และตรวจชนิด/argument ที่ขาดให้ด้วย" },
      { t: "code", lang: "bash", c: "python tool.py --help\n# usage: tool.py [-h] [--upper] [--repeat REPEAT] filename\n#\n# นับคำในไฟล์\n# positional arguments:\n#   filename     ไฟล์ที่จะอ่าน\n# options:\n#   --upper      แปลงเป็นตัวใหญ่\n#   --repeat     ทำซ้ำกี่ครั้ง" },
      { t: "callout", title: "ประเภท argument", c: "positional (เช่น filename) จำเป็นต้องใส่และเรียงตามตำแหน่ง; optional (ขึ้นต้น --) ใส่หรือไม่ก็ได้; flag (action=\"store_true\") เป็น True เมื่อใส่ False เมื่อไม่ใส่ — argparse จัดการ validate ชนิดและความครบให้หมด" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "sys.argv คือ list ของ argument ดิบ — ใช้ได้แต่จัดการเองทุกอย่าง",
          "argparse: add_argument กำหนด positional / optional (--) / flag",
          "type= ตรวจชนิด, default= ค่าเริ่มต้น, action=\"store_true\" ทำ flag",
          "ได้ --help และการ validate มาฟรี",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน CLI ที่รับชื่อไฟล์แล้วนับจำนวนบรรทัด  2) เพิ่ม flag --words เพื่อนับคำแทนบรรทัด  3) เพิ่ม --repeat type=int แล้วทำงานซ้ำตามจำนวน  4) รัน --help ดูข้อความที่ argparse สร้างให้" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Environment Variables & Config →", slug: "proj-env", desc: "จัดการค่าตั้งค่าและ secret อย่างปลอดภัย" },
          { title: "← ก่อนหน้า: Virtual Environment", slug: "proj-venv" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "proj-env": {
    slug: "proj-env",
    title: "Environment Variables & Config",
    lead: "เก็บค่าตั้งค่าและ secret (เช่น API key) ไว้นอกโค้ด — ปลอดภัยและเปลี่ยนได้โดยไม่แก้โปรแกรม",
    group: GROUP,
    blocks: [
      { t: "p", c: "API key, รหัสผ่านฐานข้อมูล, URL ของ server เหล่านี้ไม่ควรฮาร์ดโค้ดไว้ในโปรแกรม เพราะเปลี่ยนยากและเสี่ยงหลุดขึ้น git environment variable คือวิธีมาตรฐานในการเก็บค่าพวกนี้ไว้ \"นอกโค้ด\"" },

      { t: "h2", c: "อ่าน environment variable" },
      { t: "code", lang: "python", c: "import os\n\n# อ่านค่าจาก environment (คืน None ถ้าไม่มี)\napi_key = os.environ.get(\"API_KEY\")\n\n# กำหนดค่า default ถ้าไม่มี\nport = os.environ.get(\"PORT\", \"8000\")\n\n# ถ้าจำเป็นต้องมี ให้ raise เมื่อไม่เจอ\ndb_url = os.environ[\"DATABASE_URL\"]   # KeyError ถ้าไม่มี" },
      { t: "code", lang: "bash", c: "# ตั้งค่า env var ตอนรัน (macOS/Linux)\nexport API_KEY=secret123\npython app.py\n\n# หรือใส่หน้าคำสั่งครั้งเดียว\nAPI_KEY=secret123 python app.py" },

      { t: "h2", c: "ไฟล์ .env + python-dotenv" },
      { t: "p", c: "การ export ทีละตัวไม่สะดวก นิยมเก็บค่าทั้งหมดไว้ในไฟล์ .env แล้วใช้ library python-dotenv โหลดเข้ามา" },
      { t: "code", lang: "bash", c: "# ไฟล์ .env\nAPI_KEY=secret123\nDATABASE_URL=postgres://localhost/mydb\nPORT=8000" },
      { t: "code", lang: "python", c: "from dotenv import load_dotenv   # pip install python-dotenv\nimport os\n\nload_dotenv()                    # อ่าน .env เข้าสู่ environment\n\napi_key = os.environ.get(\"API_KEY\")\nprint(api_key)                   # secret123" },

      { t: "h2", c: "แยก config ออกจากโค้ด" },
      { t: "code", lang: "python", c: "# config.py — รวมการอ่าน config ไว้ที่เดียว\nimport os\nfrom dotenv import load_dotenv\n\nload_dotenv()\n\nAPI_KEY = os.environ.get(\"API_KEY\")\nDATABASE_URL = os.environ.get(\"DATABASE_URL\")\nDEBUG = os.environ.get(\"DEBUG\", \"false\").lower() == \"true\"\n\n# ไฟล์อื่นแค่ from config import API_KEY" },

      { t: "callout", title: "ห้าม commit secret ขึ้น git เด็ดขาด", warn: true, c: "ใส่ .env ใน .gitignore เสมอ! การเผลอ commit API key/รหัสผ่านขึ้น git (โดยเฉพาะ public repo) คือช่องโหว่ความปลอดภัยร้ายแรง — แม้ลบทีหลัง ค่าก็ยังอยู่ใน history นิยมทำไฟล์ .env.example ที่มีแค่ชื่อ key (ไม่มีค่าจริง) เข้า git แทนเพื่อให้คนอื่นรู้ว่าต้องตั้งอะไรบ้าง" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "เก็บ secret/config ไว้นอกโค้ดด้วย environment variable",
          "อ่านด้วย os.environ.get(\"KEY\", default) — get ปลอดภัยกว่าวงเล็บเหลี่ยม",
          "เก็บรวมใน .env แล้วโหลดด้วย python-dotenv (load_dotenv())",
          "ใส่ .env ใน .gitignore เสมอ — ทำ .env.example ไว้บอก key แทน",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ย้าย API key ที่ฮาร์ดโค้ดในโปรแกรมไปเป็น env var  2) สร้างไฟล์ .env แล้วโหลดด้วย python-dotenv  3) เขียน config.py ที่รวมการอ่าน config  4) เพิ่ม .env เข้า .gitignore แล้วสร้าง .env.example" },
      {
        t: "links",
        c: [
          { title: "จบบทที่ 4 แล้ว 🎉 — กลับหน้าภาพรวมคอร์ส", slug: "intermediate", desc: "บทที่ 5: Git สำหรับทำงานเป็นทีม กำลังจัดทำ" },
          { title: "← ก่อนหน้า: สร้าง CLI ด้วย argparse", slug: "proj-cli" },
          { title: "ทบทวน: Module & import (ต้นบท)", slug: "proj-modules" },
        ],
      },
    ],
  },
};
