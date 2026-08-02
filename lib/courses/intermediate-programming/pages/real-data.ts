import type { Page } from "@/lib/types";

const GROUP = "บทที่ 8: ทำงานกับข้อมูลจริง";

export const realDataPages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "data-files": {
    slug: "data-files",
    title: { th: "อ่าน/เขียนไฟล์ & pathlib", en: "" },
    lead: { th: "อ่านและเขียนไฟล์อย่างปลอดภัยด้วย with open และจัดการ path สมัยใหม่ด้วย pathlib", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "โปรแกรมจริงต้องอ่าน/เขียนข้อมูลจากไฟล์ตลอด ทั้ง config, log, ข้อมูลผู้ใช้ หัวข้อนี้สอนวิธีจัดการไฟล์ให้ถูกต้องและปลอดภัย พร้อม pathlib ที่เป็นวิธีจัดการ path สมัยใหม่" },

        { t: "h2", c: "อ่านไฟล์ด้วย with open" },
        { t: "p", c: "ใช้ with (จากบท Context Manager) เพื่อให้ไฟล์ถูกปิดอัตโนมัติเสมอ ระบุ encoding=\"utf-8\" ทุกครั้ง" },
        { t: "code", lang: "python", c: "# อ่านทั้งไฟล์เป็นข้อความเดียว\nwith open(\"data.txt\", encoding=\"utf-8\") as f:\n    content = f.read()\n\n# อ่านทีละบรรทัด (ประหยัด memory กับไฟล์ใหญ่)\nwith open(\"data.txt\", encoding=\"utf-8\") as f:\n    for line in f:\n        print(line.strip())   # strip() ตัด \\n ท้ายบรรทัด" },

        { t: "h2", c: "เขียนไฟล์ (mode)" },
        {
          t: "table",
          head: ["mode", "ความหมาย"],
          rows: [
            ["\"r\"", "อ่าน (ค่าเริ่มต้น)"],
            ["\"w\"", "เขียนทับของเดิมทั้งหมด"],
            ["\"a\"", "เขียนต่อท้าย (append)"],
            ["\"x\"", "สร้างใหม่ (พังถ้ามีอยู่แล้ว)"],
          ],
        },
        { t: "code", lang: "python", c: "with open(\"output.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"บรรทัดแรก\\n\")\n    f.write(\"บรรทัดสอง\\n\")\n\n# เขียนต่อท้าย\nwith open(\"log.txt\", \"a\", encoding=\"utf-8\") as f:\n    f.write(\"event ใหม่\\n\")" },
        { t: "callout", title: "ระบุ encoding=\"utf-8\" เสมอ", warn: true, c: "ถ้าไม่ระบุ encoding Python จะใช้ค่าเริ่มต้นของระบบ ซึ่งบางเครื่อง (โดยเฉพาะ Windows) ไม่ใช่ utf-8 ทำให้ข้อความไทยเพี้ยนหรือพัง — ใส่ encoding=\"utf-8\" ทุกครั้งที่เปิดไฟล์ข้อความ" },

        { t: "h2", c: "pathlib — จัดการ path สมัยใหม่" },
        { t: "p", c: "แทนการต่อ string เป็น path เอง (เสี่ยงผิดบน OS ต่างกัน) ใช้ pathlib.Path ที่จัดการให้ถูกทุกระบบ" },
        { t: "code", lang: "python", c: "from pathlib import Path\n\nfolder = Path(\"data\")\nfile = folder / \"users.txt\"      # ต่อ path ด้วย / (ถูกทุก OS)\n\nprint(file.exists())             # มีไฟล์ไหม\nprint(file.suffix)               # .txt\nprint(file.stem)                 # users\n\n# อ่าน/เขียนสั้น ๆ ได้เลย\ntext = file.read_text(encoding=\"utf-8\")\nfile.write_text(\"ข้อมูล\", encoding=\"utf-8\")\n\n# วนทุกไฟล์ .txt ในโฟลเดอร์\nfor p in folder.glob(\"*.txt\"):\n    print(p.name)" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "ใช้ with open(...) เพื่อปิดไฟล์อัตโนมัติเสมอ",
            "mode: r (อ่าน), w (ทับ), a (ต่อท้าย); วนไฟล์ทีละบรรทัดประหยัด memory",
            "ระบุ encoding=\"utf-8\" ทุกครั้ง โดยเฉพาะข้อความไทย",
            "pathlib.Path ต่อ path ด้วย / และมี read_text/write_text/glob",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) อ่านไฟล์ข้อความแล้วนับจำนวนบรรทัดและคำ  2) เขียนผลลงไฟล์ใหม่ด้วย mode w  3) ใช้ append เพิ่ม log ต่อท้ายไฟล์เดิม  4) ใช้ pathlib วนแสดงชื่อไฟล์ .txt ทั้งหมดในโฟลเดอร์" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: CSV & JSON →", slug: "data-formats", desc: "อ่าน/เขียนรูปแบบข้อมูลที่ใช้บ่อยสุด" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "data-formats": {
    slug: "data-formats",
    title: { th: "CSV & JSON", en: "" },
    lead: { th: "อ่าน/เขียนสองรูปแบบข้อมูลที่เจอบ่อยที่สุด — CSV (ตาราง) และ JSON (ภาษากลางของ API)", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "ข้อมูลในโลกจริงมักอยู่ในรูปแบบมาตรฐาน CSV (ไฟล์ตารางจาก Excel) และ JSON (ข้อมูลที่ API ส่งมา) Python มีโมดูลสำเร็จสำหรับทั้งคู่ ไม่ต้อง parse เอง" },

        { t: "h2", c: "JSON — ภาษากลางของ API" },
        { t: "p", c: "JSON หน้าตาเหมือน dict/list ของ Python มาก โมดูล json แปลงไปมาได้ง่าย: loads/dumps ทำกับ string, load/dump ทำกับไฟล์" },
        { t: "code", lang: "python", c: "import json\n\n# Python object -> JSON string\ndata = {\"name\": \"Aph\", \"age\": 25, \"skills\": [\"python\", \"sql\"]}\ntext = json.dumps(data, ensure_ascii=False, indent=2)\nprint(text)\n\n# JSON string -> Python object\nobj = json.loads(text)\nprint(obj[\"name\"])     # Aph\n\n# อ่าน/เขียนไฟล์ JSON\nwith open(\"data.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(data, f, ensure_ascii=False, indent=2)\n\nwith open(\"data.json\", encoding=\"utf-8\") as f:\n    loaded = json.load(f)" },
        { t: "callout", title: "ensure_ascii=False สำหรับภาษาไทย", c: "โดยปกติ json.dumps จะแปลงตัวอักษรไทยเป็น \\uXXXX ใส่ ensure_ascii=False เพื่อให้เก็บภาษาไทยเป็นตัวอ่านออกได้ และ indent=2 ทำให้จัดรูปสวยอ่านง่าย" },

        { t: "h2", c: "CSV — ข้อมูลตาราง" },
        { t: "p", c: "CSV คือไฟล์ตารางคั่นด้วยจุลภาค โมดูล csv อ่านเป็นแถวได้ และ DictReader อ่านแต่ละแถวเป็น dict (ใช้ header เป็น key)" },
        { t: "code", lang: "python", c: "import csv\n\n# อ่านเป็น dict ต่อแถว (header เป็น key)\nwith open(\"users.csv\", encoding=\"utf-8\") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row[\"name\"], row[\"age\"])\n\n# เขียน CSV\nrows = [{\"name\": \"Aph\", \"age\": 25}, {\"name\": \"Bee\", \"age\": 30}]\nwith open(\"out.csv\", \"w\", newline=\"\", encoding=\"utf-8\") as f:\n    writer = csv.DictWriter(f, fieldnames=[\"name\", \"age\"])\n    writer.writeheader()\n    writer.writerows(rows)" },

        { t: "h2", c: "เลือกใช้อันไหน" },
        {
          t: "table",
          head: ["รูปแบบ", "เหมาะกับ", "เจอที่ไหน"],
          rows: [
            ["JSON", "ข้อมูลซ้อนชั้น (object/list)", "API, config"],
            ["CSV", "ข้อมูลตารางแบน ๆ", "Excel, export ข้อมูล"],
          ],
        },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "json: loads/dumps (string), load/dump (ไฟล์) — JSON ≈ dict/list",
            "ใช้ ensure_ascii=False กับภาษาไทย, indent=2 จัดรูป",
            "csv.DictReader อ่านแต่ละแถวเป็น dict; DictWriter เขียน",
            "JSON = ข้อมูลซ้อนชั้น/API; CSV = ตารางแบน/Excel",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) แปลง dict เป็น JSON string แล้ว parse กลับ  2) เขียน list of dict ลงไฟล์ JSON พร้อม indent  3) อ่าน CSV ด้วย DictReader แล้วกรองแถวตามเงื่อนไข  4) อ่าน CSV → กรอง → เขียนผลออกเป็น JSON" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: Regular Expressions →", slug: "data-regex", desc: "ค้นหาและแยกรูปแบบในข้อความ" },
            { title: "← ก่อนหน้า: อ่าน/เขียนไฟล์", slug: "data-files" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "data-regex": {
    slug: "data-regex",
    title: { th: "Regular Expressions (regex)", en: "" },
    lead: { th: "ค้นหา แยก ตรวจสอบ และแทนที่รูปแบบในข้อความด้วย regex — ทักษะที่เจอตลอดในงานจริง", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "regex (regular expression) คือ \"ภาษาเล็ก ๆ\" สำหรับอธิบายรูปแบบของข้อความ ใช้ค้นหา/ตรวจสอบ/ดึงข้อมูล เช่น หาอีเมลในข้อความ ตรวจรูปแบบเบอร์โทร แยกข้อมูลจาก log — เป็นทักษะปฏิบัติที่ใช้บ่อยมาก" },

        { t: "h2", c: "โมดูล re และฟังก์ชันหลัก" },
        { t: "code", lang: "python", c: "import re\n\ntext = \"ติดต่อ 081-234-5678 หรือ 02-111-2222\"\n\n# search: หาตัวแรกที่ match\nm = re.search(r\"\\d{3}-\\d{3}-\\d{4}\", text)\nprint(m.group())          # 081-234-5678\n\n# findall: หาทั้งหมด คืน list\nprint(re.findall(r\"\\d+\", text))   # ['081', '234', '5678', '02', '111', '2222']\n\n# sub: แทนที่\nprint(re.sub(r\"\\d\", \"X\", text))   # ติดต่อ XXX-XXX-XXXX หรือ ..." },

        { t: "h2", c: "สัญลักษณ์พื้นฐานที่ต้องรู้" },
        {
          t: "table",
          head: ["สัญลักษณ์", "หมายถึง"],
          rows: [
            ["\\d", "ตัวเลข 0-9"],
            ["\\w", "ตัวอักษร/ตัวเลข/_"],
            ["\\s", "ช่องว่าง (space, tab, newline)"],
            [".", "ตัวอักษรอะไรก็ได้ 1 ตัว"],
            ["*  +  ?", "ซ้ำ 0+ / 1+ / 0หรือ1 ครั้ง"],
            ["{n}", "ซ้ำ n ครั้งพอดี"],
            ["[abc]", "ตัวใดตัวหนึ่งในวงเล็บ"],
            ["( )", "จับกลุ่ม (group)"],
            ["|", "หรือ"],
          ],
        },

        { t: "h2", c: "group — ดึงส่วนที่ต้องการ" },
        { t: "code", lang: "python", c: "import re\n\nlog = \"2026-06-01 ERROR เกิดข้อผิดพลาด\"\nm = re.search(r\"(\\d{4})-(\\d{2})-(\\d{2}) (\\w+)\", log)\nif m:\n    print(m.group(1))   # 2026  (กลุ่มที่ 1)\n    print(m.group(4))   # ERROR\n    print(m.groups())   # ('2026', '06', '01', 'ERROR')" },

        { t: "h2", c: "ตัวอย่างใช้จริง: validate" },
        { t: "code", lang: "python", c: "import re\n\ndef is_valid_email(email):\n    pattern = r\"^[\\w.]+@[\\w.]+\\.\\w+$\"\n    return re.match(pattern, email) is not None\n\nprint(is_valid_email(\"aph@example.com\"))   # True\nprint(is_valid_email(\"not-an-email\"))      # False" },
        { t: "callout", title: "regex ซับซ้อนอ่านยาก — ใช้ให้พอดี", warn: true, c: "regex ทรงพลังแต่ pattern ยาว ๆ อ่านยากมาก ใส่ comment อธิบายหรือใช้ re.VERBOSE แตกบรรทัด และอย่าใช้ regex parse HTML/JSON (ใช้ library เฉพาะดีกว่า) — ใช้ regex กับรูปแบบข้อความง่าย ๆ ที่ชัดเจน" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "re.search (ตัวแรก), re.findall (ทั้งหมด), re.sub (แทนที่), re.match (ตั้งแต่ต้น)",
            "สัญลักษณ์หลัก: \\d \\w \\s . * + ? {n} [ ] ( ) |",
            "( ) จับกลุ่ม ดึงด้วย .group(n) / .groups()",
            "regex ซับซ้อนอ่านยาก — ใช้กับรูปแบบชัดเจน อย่า parse HTML",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) ดึงตัวเลขทั้งหมดจากข้อความด้วย findall  2) เขียน regex validate เบอร์โทร 0xx-xxx-xxxx  3) ใช้ group ดึงปี-เดือน-วันจากวันที่  4) ใช้ sub แทนที่ช่องว่างหลายตัวให้เหลือตัวเดียว" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: เรียก API จริงด้วย requests →", slug: "data-http", desc: "ดึงข้อมูลจากเว็บ/REST API" },
            { title: "← ก่อนหน้า: CSV & JSON", slug: "data-formats" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "data-http": {
    slug: "data-http",
    title: { th: "เรียก API จริงด้วย requests", en: "" },
    lead: { th: "ดึงและส่งข้อมูลกับเว็บ/REST API ด้วยไลบรารี requests — ก้าวสู่การทำงานกับข้อมูลออนไลน์", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "แอปจริงจำนวนมากต้องคุยกับบริการอื่นผ่าน API เช่น ดึงสภาพอากาศ, อัตราแลกเปลี่ยน, ข้อมูลผู้ใช้ ไลบรารี requests ทำให้เรียก HTTP API ได้ง่าย หัวข้อนี้ปูพื้นก่อนไปสร้าง API เองในบท Web" },

        { t: "h2", c: "GET — ดึงข้อมูล" },
        { t: "code", lang: "python", c: "import requests   # pip install requests\n\nresp = requests.get(\"https://jsonplaceholder.typicode.com/users/1\")\n\nprint(resp.status_code)   # 200 = สำเร็จ\ndata = resp.json()        # แปลง JSON response เป็น dict\nprint(data[\"name\"])\n\n# ส่ง query parameters\nresp = requests.get(\n    \"https://api.example.com/search\",\n    params={\"q\": \"python\", \"limit\": 10},\n)   # -> ...?q=python&limit=10" },

        { t: "h2", c: "เช็ค status code เสมอ" },
        { t: "p", c: "อย่าใช้ข้อมูลก่อนเช็คว่าสำเร็จ — status code บอกผลลัพธ์ (เจาะลึกใน บท Web)" },
        {
          t: "table",
          head: ["ช่วง", "หมายถึง"],
          rows: [
            ["2xx", "สำเร็จ (200 = OK, 201 = สร้างแล้ว)"],
            ["4xx", "ผู้เรียกผิด (404 = ไม่พบ, 401 = ไม่ได้ล็อกอิน)"],
            ["5xx", "เซิร์ฟเวอร์ผิดพลาด"],
          ],
        },
        { t: "code", lang: "python", c: "resp = requests.get(url)\nresp.raise_for_status()   # โยน error อัตโนมัติถ้าไม่ใช่ 2xx\ndata = resp.json()\n\n# หรือเช็คเอง\nif resp.status_code == 200:\n    data = resp.json()\nelse:\n    print(f\"พลาด: {resp.status_code}\")" },

        { t: "h2", c: "POST — ส่งข้อมูล + headers" },
        { t: "code", lang: "python", c: "resp = requests.post(\n    \"https://api.example.com/users\",\n    json={\"name\": \"Aph\", \"age\": 25},   # ส่ง body เป็น JSON\n    headers={\"Authorization\": \"Bearer TOKEN123\"},\n    timeout=10,                         # กันค้างถ้า server ไม่ตอบ\n)\nprint(resp.status_code)   # 201" },
        { t: "callout", title: "เช็ค status + ใส่ timeout เสมอ", warn: true, c: "อย่าเชื่อว่า request สำเร็จ — เช็ค status_code หรือใช้ raise_for_status() ก่อนใช้ข้อมูล และใส่ timeout เสมอ ไม่งั้นถ้า server ไม่ตอบ โปรแกรมจะค้างไม่มีกำหนด" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "requests.get/post เรียก API; .json() แปลง response เป็น dict",
            "ส่ง query ด้วย params=, ส่ง body ด้วย json=, auth ผ่าน headers=",
            "status: 2xx สำเร็จ, 4xx ผู้เรียกผิด, 5xx เซิร์ฟเวอร์ผิด",
            "เช็ค status_code / raise_for_status() และใส่ timeout เสมอ",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) ดึงข้อมูลจาก jsonplaceholder.typicode.com/users แล้ว print ชื่อทุกคน  2) เช็ค status_code ก่อนใช้ข้อมูล  3) ส่ง query params ไป endpoint ที่รองรับ  4) ลองเรียก URL ที่ไม่มีจริงแล้วจัดการ error ด้วย raise_for_status + try/except" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: วันเวลา (datetime) →", slug: "data-datetime", desc: "คำนวณและจัดรูปวันเวลา" },
            { title: "← ก่อนหน้า: Regular Expressions", slug: "data-regex" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "data-datetime": {
    slug: "data-datetime",
    title: { th: "วันเวลา (datetime)", en: "" },
    lead: { th: "คำนวณ จัดรูป และแปลงวันเวลาอย่างถูกต้อง พร้อมหลบกับดักเรื่อง timezone", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "งานจริงเต็มไปด้วยวันเวลา: อายุผู้ใช้, วันหมดอายุ, log timestamp โมดูล datetime จัดการเรื่องพวกนี้ให้ แต่มีกับดักที่ต้องรู้ โดยเฉพาะ timezone" },

        { t: "h2", c: "datetime, date, timedelta" },
        { t: "code", lang: "python", c: "from datetime import datetime, date, timedelta\n\nnow = datetime.now()        # วันเวลาปัจจุบัน\ntoday = date.today()        # วันที่วันนี้\nprint(now)                  # 2026-06-01 10:30:00.123\n\n# สร้างวันที่เจาะจง\nbirthday = date(2000, 5, 15)\n\n# timedelta = ช่วงเวลา (บวก/ลบได้)\ntomorrow = today + timedelta(days=1)\nweek_ago = today - timedelta(weeks=1)\nprint(tomorrow)" },

        { t: "h2", c: "ส่วนต่างของวัน" },
        { t: "code", lang: "python", c: "from datetime import date\n\nstart = date(2026, 1, 1)\nend = date(2026, 6, 1)\ndiff = end - start          # ได้ timedelta\nprint(diff.days)            # 151\n\n# คำนวณอายุคร่าว ๆ\nbirthday = date(2000, 5, 15)\nage_days = (date.today() - birthday).days\nprint(age_days // 365)      # อายุปี (คร่าว ๆ)" },

        { t: "h2", c: "แปลงข้อความ ↔ วันเวลา (strftime/strptime)" },
        { t: "p", c: "strftime: วันเวลา → ข้อความ (format), strptime: ข้อความ → วันเวลา (parse)" },
        { t: "code", lang: "python", c: "from datetime import datetime\n\nnow = datetime.now()\n# format เป็นข้อความ\nprint(now.strftime(\"%d/%m/%Y\"))        # 01/06/2026\nprint(now.strftime(\"%Y-%m-%d %H:%M\"))  # 2026-06-01 10:30\n\n# parse ข้อความเป็น datetime\nd = datetime.strptime(\"2026-06-01\", \"%Y-%m-%d\")\nprint(d.year, d.month, d.day)          # 2026 6 1" },
        {
          t: "table",
          head: ["โค้ด", "ความหมาย"],
          rows: [
            ["%Y / %m / %d", "ปี(4หลัก) / เดือน / วัน"],
            ["%H / %M / %S", "ชั่วโมง / นาที / วินาที"],
          ],
        },
        { t: "callout", title: "กับดัก timezone", warn: true, c: "ในระบบจริงที่มีผู้ใช้หลายประเทศ ให้เก็บเวลาเป็น UTC ในฐานข้อมูลเสมอ แล้วค่อยแปลงเป็น timezone ท้องถิ่นตอนแสดงผล — การเก็บเวลาท้องถิ่นปนกันทำให้คำนวณผิดและ debug ยากมาก" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "datetime.now()/date.today() เวลาปัจจุบัน; timedelta = ช่วงเวลา (บวก/ลบ)",
            "ลบวันที่กันได้ timedelta — .days บอกจำนวนวัน",
            "strftime: วันเวลา→ข้อความ, strptime: ข้อความ→วันเวลา",
            "เก็บเวลาเป็น UTC แสดงผลค่อยแปลง timezone",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) คำนวณจำนวนวันระหว่างวันนี้กับวันเกิดคุณ  2) หาว่าอีก 100 วันเป็นวันที่เท่าไร (timedelta)  3) format วันนี้เป็น \"วัน/เดือน/ปี\"  4) parse ข้อความ \"2026-12-31\" เป็น date แล้วหาว่าเหลืออีกกี่วัน" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: รู้จัก pandas →", slug: "data-pandas", desc: "เครื่องมือจัดการข้อมูลตาราง (เบื้องต้น)" },
            { title: "← ก่อนหน้า: เรียก API ด้วย requests", slug: "data-http" },
            { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
          ],
        },
      ],
      en: [],
    },
  },

  // ─────────────────────────────────────────────────────────────
  "data-pandas": {
    slug: "data-pandas",
    title: { th: "รู้จัก pandas (เบื้องต้น)", en: "" },
    lead: { th: "เครื่องมือจัดการข้อมูลตารางที่ทรงพลัง — รู้จักไว้พอใช้งานได้ ก่อนลงลึกถ้าเล็งสาย Data", en: "" },
    group: GROUP,
    blocks: {
      th: [
        { t: "p", c: "pandas คือไลบรารียอดนิยมสำหรับจัดการข้อมูลตาราง (เหมือน Excel แต่ในโค้ด) ถ้าทำงานกับข้อมูลจำนวนมาก pandas เร็วและสะดวกกว่าเขียน loop เอง หัวข้อนี้แนะนำให้รู้จักพอใช้งานได้ — ถ้าเล็งสาย Data/AI ค่อยลงลึกต่อ" },

        { t: "h2", c: "DataFrame & Series" },
        { t: "p", c: "DataFrame คือตาราง (มีแถว-คอลัมน์) ส่วน Series คือหนึ่งคอลัมน์ สร้างจาก dict หรืออ่านจากไฟล์ได้" },
        { t: "code", lang: "python", c: "import pandas as pd   # pip install pandas\n\ndf = pd.DataFrame({\n    \"name\": [\"Aph\", \"Bee\", \"Cha\"],\n    \"age\": [25, 30, 22],\n    \"city\": [\"BKK\", \"CNX\", \"BKK\"],\n})\nprint(df)\nprint(df[\"age\"])          # หนึ่งคอลัมน์ = Series\nprint(df[\"age\"].mean())   # ค่าเฉลี่ย = 25.67" },

        { t: "h2", c: "อ่าน CSV ด้วย pandas" },
        { t: "code", lang: "python", c: "df = pd.read_csv(\"users.csv\")\nprint(df.head())          # ดู 5 แถวแรก\nprint(df.shape)           # (จำนวนแถว, จำนวนคอลัมน์)\nprint(df.columns)         # ชื่อคอลัมน์ทั้งหมด" },

        { t: "h2", c: "filter & groupby เบื้องต้น" },
        { t: "code", lang: "python", c: "# filter: เลือกแถวตามเงื่อนไข\nadults = df[df[\"age\"] >= 25]\nbkk = df[df[\"city\"] == \"BKK\"]\n\n# groupby: จัดกลุ่มแล้วสรุป\nprint(df.groupby(\"city\")[\"age\"].mean())\n# city\n# BKK    23.5\n# CNX    30.0" },
        { t: "callout", title: "นี่แค่จุดเริ่มต้น", c: "pandas มีความสามารถมากกว่านี้มาก (merge, pivot, จัดการ missing data, plot) ถ้าคุณเล็งสาย Data Analyst / Data Science / AI ให้ไปลงลึก pandas + numpy ต่อ ที่นี่แค่ให้รู้จักว่ามีเครื่องมือนี้และใช้งานพื้นฐานได้" },

        { t: "h2", c: "สรุปหัวข้อนี้" },
        {
          t: "ul",
          c: [
            "pandas จัดการข้อมูลตาราง — DataFrame (ตาราง) / Series (คอลัมน์)",
            "pd.read_csv อ่านไฟล์; .head()/.shape/.columns สำรวจข้อมูล",
            "filter ด้วยเงื่อนไข df[df[...] > x]; groupby สรุปตามกลุ่ม",
            "เป็นแค่เบื้องต้น — เล็งสาย Data ค่อยลงลึก pandas/numpy",
          ],
        },
        { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง DataFrame จาก dict แล้วหาค่าเฉลี่ยคอลัมน์ตัวเลข  2) อ่าน CSV ด้วย read_csv แล้วดู head()/shape  3) filter เลือกแถวตามเงื่อนไข  4) ใช้ groupby สรุปข้อมูลตามกลุ่ม" },
        {
          t: "links",
          c: [
            { title: "จบบทที่ 8 แล้ว 🎉 — กลับหน้าภาพรวมคอร์ส", slug: "intermediate", desc: "บทที่ 9: ฐานข้อมูล & SQL กำลังจัดทำ" },
            { title: "← ก่อนหน้า: วันเวลา (datetime)", slug: "data-datetime" },
            { title: "ทบทวน: อ่าน/เขียนไฟล์ (ต้นบท)", slug: "data-files" },
          ],
        },
      ],
      en: [],
    },
  },
};
