import type { Page } from "@/lib/types";

const GROUP = "บทที่ 1: Python ระดับลึก";

export const pythonDeepPages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "py-comprehension": {
    slug: "py-comprehension",
    title: "Comprehension เจาะลึก",
    lead: "เขียน list/dict/set ในบรรทัดเดียวแบบ Pythonic — อ่านง่าย เร็ว และรู้ว่าเมื่อไรไม่ควรใช้",
    group: GROUP,
    blocks: [
      { t: "p", c: "comprehension คือวิธีสร้าง list/dict/set จากการวนซ้ำในบรรทัดเดียว เป็นสำนวนที่คุณจะเห็นในโค้ด Python จริงแทบทุกไฟล์ บทย่อยนี้จะพาไปตั้งแต่รูปแบบพื้นฐาน จนถึงการใส่เงื่อนไข การซ้อนชั้น และเส้นที่ \"ไม่ควรข้าม\" เพื่อรักษาความอ่านง่าย" },
      { t: "callout", title: "พิมพ์ตามทุกตัวอย่าง", c: "คอร์สนี้ควรรัน Python บนเครื่องจริงแล้ว เปิด terminal พิมพ์ python หรือเปิดไฟล์ .py แล้วลองรันทุกชิ้น พร้อมแก้ค่าดูผลลัพธ์ — การลงมือทำคือสิ่งที่ทำให้เข้าใจจริง" },

      { t: "h2", c: "จาก for-loop สู่ list comprehension" },
      { t: "p", c: "สมมติเราอยากได้ list ของเลขยกกำลังสอง วิธีปกติเขียนด้วย for-loop หลายบรรทัด comprehension ย่อให้เหลือบรรทัดเดียวโดยอ่านได้ว่า \"เอา x*x สำหรับทุก x ใน range\"" },
      { t: "code", lang: "python", c: "# แบบ for-loop ปกติ\nsquares = []\nfor x in range(5):\n    squares.append(x * x)\nprint(squares)   # [0, 1, 4, 9, 16]\n\n# แบบ list comprehension — ผลเหมือนกันเป๊ะ\nsquares = [x * x for x in range(5)]\nprint(squares)   # [0, 1, 4, 9, 16]" },
      { t: "p", c: "โครงสร้างคือ [นิพจน์ for ตัวแปร in ลำดับ] — ฝั่งซ้ายสุดคือ \"สิ่งที่จะเก็บ\" ตามด้วย for ที่บอกว่าวนอะไร" },

      { t: "h2", c: "ใส่เงื่อนไขด้วย if (กรอง)" },
      { t: "p", c: "เติม if ต่อท้ายเพื่อกรองให้เก็บเฉพาะตัวที่ผ่านเงื่อนไข" },
      { t: "code", lang: "python", c: "# เก็บเฉพาะเลขคู่\nevens = [x for x in range(10) if x % 2 == 0]\nprint(evens)     # [0, 2, 4, 6, 8]\n\n# เก็บเลขคู่แล้วยกกำลังสอง\neven_sq = [x * x for x in range(10) if x % 2 == 0]\nprint(even_sq)   # [0, 4, 16, 36, 64]" },

      { t: "h3", c: "if/else แบบนิพจน์ (วางไว้ข้างหน้า)" },
      { t: "p", c: "ถ้าอยากเลือกค่า (ไม่ใช่กรองทิ้ง) ให้ใช้ if/else เป็นนิพจน์วางไว้ \"ก่อน\" for สังเกตตำแหน่งให้ดี — กรองใช้ if ท้าย, เลือกค่าใช้ if/else หน้า" },
      { t: "code", lang: "python", c: "# แปลงเป็นข้อความ คู่/คี่\nlabels = [\"คู่\" if x % 2 == 0 else \"คี่\" for x in range(5)]\nprint(labels)    # ['คู่', 'คี่', 'คู่', 'คี่', 'คู่']" },
      {
        t: "table",
        head: ["ต้องการ", "ตำแหน่ง if", "ตัวอย่าง"],
        rows: [
          ["กรองทิ้งบางตัว", "ท้ายสุด", "[x for x in xs if x > 0]"],
          ["เลือกค่า (เก็บทุกตัว)", "หน้า for", "[x if x > 0 else 0 for x in xs]"],
        ],
      },

      { t: "h2", c: "dict & set comprehension" },
      { t: "p", c: "หลักการเดียวกัน แค่เปลี่ยนวงเล็บ — ใช้ { } และสำหรับ dict ใส่ key: value" },
      { t: "code", lang: "python", c: "# dict comprehension: สร้าง map ของเลข -> กำลังสอง\nsquare_map = {x: x * x for x in range(5)}\nprint(square_map)   # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}\n\n# set comprehension: เก็บความยาวคำที่ไม่ซ้ำ\nwords = [\"hi\", \"hello\", \"hey\", \"yo\"]\nlengths = {len(w) for w in words}\nprint(lengths)      # {2, 5, 3}  (set ไม่เก็บค่าซ้ำ)" },

      { t: "h2", c: "nested comprehension (ซ้อนชั้น)" },
      { t: "p", c: "ใช้แผ่ (flatten) list 2 มิติให้เป็นมิติเดียวได้ แต่ลำดับ for เขียนจากนอกเข้าใน เหมือน for-loop ซ้อนกันตามปกติ" },
      { t: "code", lang: "python", c: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n\n# flatten: อ่านว่า 'เอา num สำหรับทุก row แล้วทุก num ใน row'\nflat = [num for row in matrix for num in row]\nprint(flat)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]" },
      { t: "callout", title: "เส้นที่ไม่ควรข้าม", warn: true, c: "ถ้า comprehension ซ้อนเกิน 2 ชั้น หรือมีเงื่อนไขซับซ้อนจนอ่านทีเดียวไม่เข้าใจ ให้กลับไปใช้ for-loop ปกติ — เป้าหมายคือโค้ดอ่านง่าย ไม่ใช่สั้นที่สุด การยัดทุกอย่างในบรรทัดเดียวคือ code smell" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "โครงสร้าง: [นิพจน์ for ตัวแปร in ลำดับ (if เงื่อนไข)]",
          "กรองทิ้ง → if ท้ายสุด, เลือกค่า → if/else หน้า for",
          "เปลี่ยนวงเล็บได้เป็น dict {k: v ...} และ set {x ...}",
          "ซ้อนได้ แต่เกิน 2 ชั้นเมื่อไร ให้กลับไปใช้ for-loop",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง list ของเลขคู่ตั้งแต่ 1-20 ที่ยกกำลังสองแล้ว  2) จาก [\"apple\",\"banana\",\"kiwi\"] สร้าง dict ที่ key เป็นคำ value เป็นความยาวคำ  3) flatten [[1,2],[3,4],[5,6]] เป็น [1,2,3,4,5,6]  4) จาก list คะแนน สร้าง list ที่ค่า >=50 เป็น \"ผ่าน\" ที่เหลือเป็น \"ตก\"" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Iterator & Generator →", slug: "py-iter-gen", desc: "สร้างข้อมูลทีละชิ้นแบบประหยัด memory ด้วย yield" },
          { title: "← กลับหน้าภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "py-iter-gen": {
    slug: "py-iter-gen",
    title: "Iterator & Generator (yield)",
    lead: "เข้าใจว่า for ทำงานเบื้องหลังอย่างไร และสร้างข้อมูลทีละชิ้นแบบประหยัด memory ด้วย generator",
    group: GROUP,
    blocks: [
      { t: "p", c: "ทุกครั้งที่คุณเขียน for x in something เบื้องหลังมีกลไกชื่อ iterator ทำงานอยู่ การเข้าใจมันทำให้คุณสร้าง generator ได้ — เครื่องมือที่ผลิตข้อมูลทีละชิ้นเมื่อต้องการ ไม่ต้องเก็บทั้งหมดใน RAM ซึ่งสำคัญมากเวลาทำงานกับข้อมูลขนาดใหญ่" },

      { t: "h2", c: "iterable vs iterator" },
      { t: "p", c: "iterable คือสิ่งที่ \"วนได้\" (list, str, dict, range) ส่วน iterator คือ \"ตัววน\" ที่จำได้ว่าตอนนี้อยู่ตำแหน่งไหน เรียก next() เพื่อขอตัวถัดไป" },
      { t: "code", lang: "python", c: "nums = [10, 20, 30]       # list เป็น iterable\nit = iter(nums)           # ขอ iterator ออกมา\n\nprint(next(it))   # 10\nprint(next(it))   # 20\nprint(next(it))   # 30\n# next(it) อีกครั้งจะเกิด StopIteration (หมดแล้ว)\n\n# ที่จริง for ทำแบบนี้ให้เราอัตโนมัติ:\nfor n in nums:\n    print(n)" },

      { t: "h2", c: "generator: ฟังก์ชันที่ใช้ yield" },
      { t: "p", c: "generator คือฟังก์ชันที่ใช้ yield แทน return เมื่อเรียกมันจะ \"ไม่รันทันที\" แต่คืน generator object ที่ผลิตค่าทีละตัวเมื่อถูกขอ — แต่ละ yield คือ \"หยุดพักแล้วส่งค่าออกไป\" รอบหน้ามาต่อจากจุดเดิม" },
      { t: "code", lang: "python", c: "def count_up_to(n):\n    i = 1\n    while i <= n:\n        yield i        # ส่งค่าออก แล้วหยุดพักตรงนี้\n        i += 1         # รอบถัดไปมาต่อจากบรรทัดนี้\n\nfor num in count_up_to(3):\n    print(num)         # 1, 2, 3\n\n# เรียกเฉย ๆ ยังไม่รัน — ได้ generator object\ngen = count_up_to(3)\nprint(gen)             # <generator object ...>\nprint(next(gen))       # 1" },
      { t: "callout", title: "ทำไมประหยัด memory", c: "generator = สายพานผลิตทีละชิ้นเมื่อขอ ส่วน list = ผลิตทุกชิ้นกองไว้ก่อน ถ้าต้องการเลข 1 ถึง 10 ล้าน list จะกิน RAM มหาศาล แต่ generator เก็บแค่ค่าปัจจุบันทีละตัว นี่คือเหตุผลที่ range() ไม่กิน RAM" },

      { t: "h2", c: "generator expression" },
      { t: "p", c: "เหมือน list comprehension แต่ใช้วงเล็บ ( ) แทน [ ] ได้ generator แทน list — เหมาะเมื่อจะวนผ่านครั้งเดียวไม่ต้องเก็บ" },
      { t: "code", lang: "python", c: "# list comprehension: สร้าง list จริง กิน memory\nsquares_list = [x * x for x in range(1000000)]\n\n# generator expression: ไม่สร้าง list ผลิตทีละตัว\nsquares_gen = (x * x for x in range(1000000))\n\n# ใช้กับ sum() ได้เลย ไม่ต้องสร้าง list กลาง\ntotal = sum(x * x for x in range(10))\nprint(total)   # 285" },

      { t: "h2", c: "อ่านไฟล์ใหญ่ทีละบรรทัด" },
      { t: "p", c: "ตัวอย่างจริงที่ generator เปล่งประกาย: อ่านไฟล์ขนาดหลาย GB โดยไม่โหลดทั้งไฟล์เข้า RAM" },
      { t: "code", lang: "python", c: "def read_lines(path):\n    with open(path, encoding=\"utf-8\") as f:\n        for line in f:          # f เป็น iterator อยู่แล้ว\n            yield line.strip()\n\n# วนทีละบรรทัด ไม่ว่าไฟล์ใหญ่แค่ไหนก็ไม่ล้น RAM\n# for line in read_lines(\"huge.txt\"):\n#     process(line)" },
      { t: "callout", title: "generator ใช้ได้ครั้งเดียว", warn: true, c: "เมื่อวน generator จนหมดแล้ว มันจะว่างเปล่า วนซ้ำอีกครั้งจะไม่ได้อะไร ถ้าต้องใช้หลายรอบให้แปลงเป็น list ด้วย list(gen) หรือสร้าง generator ใหม่" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "iterable = วนได้, iterator = ตัววนที่จำตำแหน่ง (เรียกด้วย iter()/next())",
          "generator = ฟังก์ชันที่ใช้ yield ผลิตค่าทีละตัว ประหยัด memory",
          "generator expression = (x for x in ...) ใช้แทน list เมื่อวนครั้งเดียว",
          "generator ใช้ได้ครั้งเดียว — หมดแล้วต้องสร้างใหม่",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน generator ที่ให้เลขฟีโบนักชี n ตัวแรก  2) เขียน generator expression หาผลรวมของเลขคี่ 1-100  3) เขียน generator ที่อ่านไฟล์แล้ว yield เฉพาะบรรทัดที่มีคำว่า \"error\"  4) ลองวน generator จนหมดแล้ววนอีกรอบ สังเกตว่าได้อะไร" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: *args, **kwargs & unpacking →", slug: "py-args", desc: "ฟังก์ชันที่รับ argument ยืดหยุ่น" },
          { title: "← ก่อนหน้า: Comprehension", slug: "py-comprehension" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "py-args": {
    slug: "py-args",
    title: "*args, **kwargs & การ Unpack",
    lead: "เขียนฟังก์ชันที่รับ argument ได้ยืดหยุ่น และกระจายข้อมูลเข้า/ออกด้วย * และ **",
    group: GROUP,
    blocks: [
      { t: "p", c: "บางฟังก์ชันต้องรับ argument จำนวนไม่แน่นอน เช่น print() รับกี่ตัวก็ได้ บทย่อยนี้สอนวิธีเขียนฟังก์ชันแบบนั้นด้วย *args และ **kwargs พร้อมเทคนิค unpacking ที่ใช้บ่อยมากในโค้ดจริง" },

      { t: "h2", c: "positional vs keyword argument" },
      { t: "p", c: "argument ส่งได้ 2 แบบ: ตามตำแหน่ง (positional) หรือระบุชื่อ (keyword) และตั้งค่า default ได้" },
      { t: "code", lang: "python", c: "def greet(name, greeting=\"สวัสดี\"):   # greeting มี default\n    return f\"{greeting} {name}\"\n\nprint(greet(\"Aph\"))                    # สวัสดี Aph  (ใช้ default)\nprint(greet(\"Aph\", \"หวัดดี\"))          # หวัดดี Aph  (positional)\nprint(greet(\"Aph\", greeting=\"ยินดี\"))  # ยินดี Aph   (keyword)" },

      { t: "h2", c: "*args — รับ positional ไม่จำกัดจำนวน" },
      { t: "p", c: "ใส่ * หน้าชื่อพารามิเตอร์ Python จะรวบ argument ที่เหลือทั้งหมดมาเป็น tuple ชื่อ args นิยมตั้งชื่อ args แต่จริง ๆ ชื่ออะไรก็ได้ ที่สำคัญคือ *" },
      { t: "code", lang: "python", c: "def total(*nums):       # nums เป็น tuple ของทุกตัวที่ส่งมา\n    print(nums)\n    return sum(nums)\n\nprint(total(1, 2, 3))        # (1, 2, 3) แล้วคืน 6\nprint(total(10, 20))         # (10, 20) แล้วคืน 30\nprint(total())               # () แล้วคืน 0" },

      { t: "h2", c: "**kwargs — รับ keyword ไม่จำกัดจำนวน" },
      { t: "p", c: "ใส่ ** หน้าชื่อ Python จะรวบ keyword argument ที่เหลือมาเป็น dict นิยมตั้งชื่อ kwargs (keyword arguments)" },
      { t: "code", lang: "python", c: "def make_user(**info):       # info เป็น dict\n    print(info)\n    return info\n\nmake_user(name=\"Aph\", age=25, city=\"Bangkok\")\n# {'name': 'Aph', 'age': 25, 'city': 'Bangkok'}\n\n# รวมทุกแบบเข้าด้วยกัน (ลำดับสำคัญ: ปกติ, *args, **kwargs)\ndef log(level, *messages, **meta):\n    print(level, messages, meta)\n\nlog(\"INFO\", \"started\", \"ok\", user=\"aph\", code=200)\n# INFO ('started', 'ok') {'user': 'aph', 'code': 200}" },

      { t: "h2", c: "unpacking: กระจาย list/dict ตอนเรียก" },
      { t: "p", c: "* และ ** ใช้ \"ขาออก\" ได้ด้วย — กระจาย list เป็น positional args หรือ dict เป็น keyword args ตอนเรียกฟังก์ชัน" },
      { t: "code", lang: "python", c: "def add(a, b, c):\n    return a + b + c\n\nnums = [1, 2, 3]\nprint(add(*nums))        # 6  — กระจาย list เป็น a=1, b=2, c=3\n\nopts = {\"a\": 1, \"b\": 2, \"c\": 3}\nprint(add(**opts))       # 6  — กระจาย dict เป็น keyword\n\n# ใช้บ่อยกับ print\nwords = [\"a\", \"b\", \"c\"]\nprint(*words)            # a b c  (แทน print(words[0], words[1]...))" },

      { t: "h2", c: "keyword-only argument (บังคับระบุชื่อ)" },
      { t: "p", c: "ใส่ * เปล่า ๆ คั่น เพื่อบังคับให้ argument หลังจากนั้นต้องส่งแบบระบุชื่อเสมอ ป้องกันการส่งผิดตำแหน่ง" },
      { t: "code", lang: "python", c: "def connect(host, *, port, timeout=30):\n    print(host, port, timeout)\n\nconnect(\"localhost\", port=8080)        # ✅ ต้องระบุ port=\n# connect(\"localhost\", 8080)           # ❌ TypeError" },

      { t: "callout", title: "กับดักคลาสสิก: mutable default argument", warn: true, c: "อย่าใช้ list/dict เป็นค่า default เช่น def f(items=[]) เพราะ default ถูกสร้างครั้งเดียวตอนนิยามฟังก์ชัน แล้วถูกใช้ร่วมกันทุกครั้งที่เรียก! ค่าจะค้างข้ามการเรียก วิธีแก้: ใช้ None แล้วสร้างใหม่ข้างใน (เราจะเจาะลึกเรื่องนี้ในหัวข้อ Mutability)" },
      { t: "code", lang: "python", c: "# ❌ ผิด: list ถูกแชร์ข้ามการเรียก\ndef add_item(item, items=[]):\n    items.append(item)\n    return items\n\nprint(add_item(\"a\"))   # ['a']\nprint(add_item(\"b\"))   # ['a', 'b']  ← ค้าง! ไม่ใช่ ['b']\n\n# ✅ ถูก: ใช้ None แล้วสร้างใหม่\ndef add_item_ok(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "*args รวบ positional เป็น tuple, **kwargs รวบ keyword เป็น dict",
          "ลำดับพารามิเตอร์: ปกติ → *args → **kwargs",
          "ตอนเรียก *list กระจายเป็น positional, **dict กระจายเป็น keyword",
          "* เปล่า ๆ บังคับ keyword-only; ห้ามใช้ list/dict เป็น default",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียนฟังก์ชัน multiply(*nums) คูณทุกตัวเข้าด้วยกัน  2) เขียนฟังก์ชันรับ **kwargs แล้ว print ทุก key=value  3) มี list [3, 5, 7] ใช้ unpacking ส่งเข้าฟังก์ชัน add(a,b,c)  4) แก้ฟังก์ชันที่ใช้ items=[] เป็นแบบ items=None ให้ถูกต้อง" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Lambda & Higher-Order Functions →", slug: "py-hof-lambda", desc: "มองฟังก์ชันเป็นค่าที่ส่งต่อได้" },
          { title: "← ก่อนหน้า: Iterator & Generator", slug: "py-iter-gen" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "py-hof-lambda": {
    slug: "py-hof-lambda",
    title: "Lambda & Higher-Order Functions",
    lead: "มองฟังก์ชันเป็น \"ค่า\" ที่เก็บใส่ตัวแปร ส่งเข้าฟังก์ชันอื่น และคืนกลับได้",
    group: GROUP,
    blocks: [
      { t: "p", c: "ใน Python ฟังก์ชันเป็น \"first-class object\" — เก็บใส่ตัวแปร ใส่ใน list ส่งเป็น argument และคืนจากฟังก์ชันได้เหมือนข้อมูลทั่วไป ความเข้าใจนี้คือรากฐานของ decorator และโค้ดสไตล์ functional" },

      { t: "h2", c: "ฟังก์ชันเป็นค่า" },
      { t: "code", lang: "python", c: "def shout(text):\n    return text.upper()\n\nf = shout            # เก็บฟังก์ชันใส่ตัวแปร (ไม่มีวงเล็บ = ไม่เรียก)\nprint(f(\"hello\"))    # HELLO\n\n# ใส่ฟังก์ชันใน list ก็ได้\nfuncs = [str.upper, str.lower, str.title]\nfor fn in funcs:\n    print(fn(\"hello World\"))   # HELLO WORLD / hello world / Hello World" },

      { t: "h2", c: "lambda — ฟังก์ชันไม่มีชื่อแบบสั้น" },
      { t: "p", c: "lambda คือฟังก์ชันบรรทัดเดียวไม่มีชื่อ เหมาะกับงานสั้น ๆ ที่ส่งเข้าฟังก์ชันอื่น โครงสร้าง: lambda พารามิเตอร์: นิพจน์ (คืนค่านิพจน์อัตโนมัติ)" },
      { t: "code", lang: "python", c: "square = lambda x: x * x\nprint(square(5))     # 25\n\nadd = lambda a, b: a + b\nprint(add(2, 3))     # 5\n\n# เทียบกับ def ที่ทำเหมือนกัน\ndef square_def(x):\n    return x * x" },

      { t: "h2", c: "sorted(key=...) — ที่ใช้ lambda บ่อยสุด" },
      { t: "p", c: "งานจริงที่ใช้ lambda มากที่สุดคือบอกวิธีเรียงลำดับผ่านพารามิเตอร์ key" },
      { t: "code", lang: "python", c: "people = [\n    {\"name\": \"Aph\", \"age\": 25},\n    {\"name\": \"Bee\", \"age\": 19},\n    {\"name\": \"Cha\", \"age\": 31},\n]\n\n# เรียงตามอายุ\nby_age = sorted(people, key=lambda p: p[\"age\"])\nprint([p[\"name\"] for p in by_age])    # ['Bee', 'Aph', 'Cha']\n\n# เรียงหลายเงื่อนไข: ตามอายุ แล้วชื่อ\nby_multi = sorted(people, key=lambda p: (p[\"age\"], p[\"name\"]))\n\n# เรียงคำตามความยาว\nwords = [\"banana\", \"kiwi\", \"apple\"]\nprint(sorted(words, key=len))         # ['kiwi', 'apple', 'banana']" },

      { t: "h2", c: "map & filter (และทำไม comprehension มักดีกว่า)" },
      { t: "p", c: "map ใช้ฟังก์ชันกับทุกตัว, filter กรองตามเงื่อนไข — แต่ใน Python นิยม comprehension มากกว่าเพราะอ่านง่ายกว่า ควรรู้จักทั้งคู่" },
      { t: "code", lang: "python", c: "nums = [1, 2, 3, 4, 5]\n\n# map / filter (คืน iterator ต้องครอบ list())\ndoubled = list(map(lambda x: x * 2, nums))\nevens = list(filter(lambda x: x % 2 == 0, nums))\nprint(doubled)   # [2, 4, 6, 8, 10]\nprint(evens)     # [2, 4]\n\n# แบบ comprehension — Pythonic กว่า อ่านง่ายกว่า\ndoubled = [x * 2 for x in nums]\nevens = [x for x in nums if x % 2 == 0]" },
      { t: "callout", title: "แนวทาง", c: "ถ้าเลือกได้ ใช้ comprehension เพราะอ่านง่ายและเป็นสำนวน Python แต่ map/filter ยังมีประโยชน์เมื่อมีฟังก์ชันสำเร็จอยู่แล้ว เช่น map(str, nums) หรือ map(int, lines)" },

      { t: "h2", c: "ฟังก์ชันที่รับฟังก์ชัน (Higher-Order)" },
      { t: "p", c: "higher-order function คือฟังก์ชันที่รับฟังก์ชันอื่นเป็น argument หรือคืนฟังก์ชัน — sorted, map, filter ล้วนเป็นแบบนี้ เราเขียนเองได้" },
      { t: "code", lang: "python", c: "def apply_twice(func, value):\n    return func(func(value))\n\nprint(apply_twice(lambda x: x + 3, 10))   # 16  (10+3+3)\nprint(apply_twice(str.upper, \"hi\"))       # HI" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "ฟังก์ชันเป็นค่า: เก็บใส่ตัวแปร/list, ส่งต่อ, คืนกลับได้",
          "lambda = ฟังก์ชันสั้นไม่มีชื่อ: lambda args: นิพจน์",
          "ใช้ lambda บ่อยสุดกับ sorted(key=...) — เรียงหลายเงื่อนไขด้วย tuple",
          "map/filter ได้ผลเหมือน comprehension แต่ comprehension อ่านง่ายกว่า",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เรียง list ของ tuple (ชื่อ, คะแนน) ตามคะแนนจากมากไปน้อย  2) ใช้ map แปลง [\"1\",\"2\",\"3\"] เป็น [1,2,3]  3) ใช้ filter เก็บเฉพาะคำยาวเกิน 3 ตัวอักษร  4) เขียน higher-order function ที่รับฟังก์ชันกับ list แล้ว apply ฟังก์ชันกับทุกตัว" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Scope & Closure →", slug: "py-closures", desc: "ฟังก์ชันที่จำค่าจาก scope แม่ — รากฐานของ decorator" },
          { title: "← ก่อนหน้า: *args & **kwargs", slug: "py-args" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "py-closures": {
    slug: "py-closures",
    title: "Scope & Closure",
    lead: "ตัวแปรอยู่ \"ที่ไหน\" และฟังก์ชันจำค่าจาก scope แม่ได้อย่างไร — รากฐานของ decorator",
    group: GROUP,
    blocks: [
      { t: "p", c: "scope คือ \"ขอบเขตที่ตัวแปรมองเห็นได้\" การเข้าใจว่า Python ค้นหาตัวแปรอย่างไรช่วยให้ไม่งงกับบั๊กแปลก ๆ และเป็นพื้นฐานของ closure ซึ่งต่อยอดไปสู่ decorator ในหัวข้อถัดไป" },

      { t: "h2", c: "กฎ LEGB — Python หาตัวแปรจากไหน" },
      { t: "p", c: "เมื่อใช้ตัวแปร Python ค้นหาตามลำดับ Local → Enclosing → Global → Built-in เจอที่ไหนใช้ที่นั่น" },
      {
        t: "table",
        head: ["ตัวอักษร", "ขอบเขต", "คือ"],
        rows: [
          ["L", "Local", "ในฟังก์ชันปัจจุบัน"],
          ["E", "Enclosing", "ฟังก์ชันแม่ที่ห่อหุ้มอยู่"],
          ["G", "Global", "ระดับไฟล์/โมดูล"],
          ["B", "Built-in", "ของ Python เอง (print, len, ...)"],
        ],
      },
      { t: "code", lang: "python", c: "x = \"global\"\n\ndef outer():\n    x = \"enclosing\"\n    def inner():\n        x = \"local\"\n        print(x)        # local (เจอ L ก่อน)\n    inner()\n    print(x)            # enclosing\n\nouter()\nprint(x)                # global" },

      { t: "h2", c: "global และ nonlocal" },
      { t: "p", c: "ปกติการกำหนดค่าในฟังก์ชันสร้างตัวแปร local ใหม่ ถ้าต้องการแก้ตัวแปรชั้นนอกจริง ๆ ต้องประกาศ global (ระดับไฟล์) หรือ nonlocal (ฟังก์ชันแม่)" },
      { t: "code", lang: "python", c: "count = 0\n\ndef increment():\n    global count        # บอกว่าจะแก้ count ตัวข้างนอก\n    count += 1\n\nincrement()\nincrement()\nprint(count)            # 2\n\ndef make_counter():\n    n = 0\n    def step():\n        nonlocal n      # แก้ n ของฟังก์ชันแม่ (ไม่ใช่สร้างใหม่)\n        n += 1\n        return n\n    return step" },

      { t: "h2", c: "closure: ฟังก์ชันที่จำค่าจาก scope แม่" },
      { t: "p", c: "closure เกิดเมื่อฟังก์ชันชั้นในใช้ตัวแปรจากฟังก์ชันแม่ แล้วฟังก์ชันแม่คืนฟังก์ชันชั้นในออกมา — ฟังก์ชันชั้นในจะ \"จำ\" ตัวแปรนั้นไว้แม้ฟังก์ชันแม่จบไปแล้ว" },
      { t: "code", lang: "python", c: "def make_multiplier(factor):\n    def multiply(x):\n        return x * factor      # จำ factor จากแม่ไว้\n    return multiply\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\n\nprint(double(10))    # 20  (จำ factor=2)\nprint(triple(10))    # 30  (จำ factor=3)" },
      { t: "p", c: "double กับ triple คือฟังก์ชันคนละตัว แต่ละตัวจำ factor ของตัวเองไว้ — นี่คือ closure" },

      { t: "h2", c: "counter ด้วย closure" },
      { t: "code", lang: "python", c: "def make_counter():\n    count = 0\n    def counter():\n        nonlocal count\n        count += 1\n        return count\n    return counter\n\nc = make_counter()\nprint(c())   # 1\nprint(c())   # 2\nprint(c())   # 3  (จำ count ไว้ข้ามการเรียก)" },

      { t: "callout", title: "กับดัก: late binding ใน loop", warn: true, c: "ถ้าสร้าง closure ใน for-loop โดยอ้างตัวแปรลูป ทุก closure จะจับ \"ตัวแปรเดียวกัน\" ซึ่งมีค่าสุดท้ายหลัง loop จบ ไม่ใช่ค่าตอนสร้าง วิธีแก้: ส่งค่าผ่าน default argument เช่น lambda x, i=i: ... เพื่อ \"แช่แข็ง\" ค่า i ตอนนั้น" },
      { t: "code", lang: "python", c: "# ❌ ทุก f จะคืน 2 (ค่าสุดท้ายของ i)\nfuncs = []\nfor i in range(3):\n    funcs.append(lambda: i)\nprint([f() for f in funcs])    # [2, 2, 2]\n\n# ✅ แช่แข็งค่าด้วย default argument\nfuncs = []\nfor i in range(3):\n    funcs.append(lambda i=i: i)\nprint([f() for f in funcs])    # [0, 1, 2]" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "LEGB: Python หาตัวแปร Local → Enclosing → Global → Built-in",
          "global แก้ตัวแปรระดับไฟล์, nonlocal แก้ตัวแปรฟังก์ชันแม่",
          "closure = ฟังก์ชันชั้นในที่จำค่าจาก scope แม่แม้แม่จบไปแล้ว",
          "ระวัง late binding ใน loop — แช่แข็งค่าด้วย default argument",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน make_adder(n) ที่คืนฟังก์ชันบวก n  2) เขียน counter ที่นับขึ้นเรื่อย ๆ ด้วย closure  3) ทดลองสร้าง lambda ใน loop แบบผิด แล้วแก้ให้ถูกด้วย default argument  4) อธิบายว่าทำไม global count จำเป็นในฟังก์ชัน increment" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Decorator →", slug: "py-decorators", desc: "เพิ่มความสามารถให้ฟังก์ชันโดยไม่แก้ตัวมัน" },
          { title: "← ก่อนหน้า: Lambda & HOF", slug: "py-hof-lambda" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "py-decorators": {
    slug: "py-decorators",
    title: "Decorator",
    lead: "เพิ่มความสามารถให้ฟังก์ชัน (เช่น จับเวลา, log, cache) โดยไม่ต้องแก้ตัวฟังก์ชันเดิม",
    group: GROUP,
    blocks: [
      { t: "p", c: "decorator คือฟังก์ชันที่ \"ห่อ\" ฟังก์ชันอื่นเพื่อเพิ่มพฤติกรรมก่อน/หลังการทำงาน โดยไม่แตะโค้ดเดิม คุณเห็นมันทุกวันในงานจริง เช่น @app.route ของ Flask, @pytest.fixture, @property — หัวข้อนี้ต่อยอดตรงจาก closure" },

      { t: "h2", c: "decorator ที่ง่ายที่สุด" },
      { t: "p", c: "decorator รับฟังก์ชันเข้าไป สร้างฟังก์ชันใหม่ที่ห่อของเดิม แล้วคืนออกมา — สังเกตว่าใช้ closure จับ func ไว้" },
      { t: "code", lang: "python", c: "def my_decorator(func):\n    def wrapper():\n        print(\"ก่อนเรียกฟังก์ชัน\")\n        func()\n        print(\"หลังเรียกฟังก์ชัน\")\n    return wrapper\n\ndef say_hi():\n    print(\"สวัสดี\")\n\nsay_hi = my_decorator(say_hi)   # ห่อด้วย decorator\nsay_hi()\n# ก่อนเรียกฟังก์ชัน\n# สวัสดี\n# หลังเรียกฟังก์ชัน" },

      { t: "h2", c: "syntax @ — ทางลัดที่ใช้จริง" },
      { t: "p", c: "การเขียน @my_decorator เหนือ def คือทางลัดของ say_hi = my_decorator(say_hi) เป๊ะ ๆ — ผลเหมือนกันแต่อ่านสะอาดกว่า" },
      { t: "code", lang: "python", c: "@my_decorator          # = say_hi = my_decorator(say_hi)\ndef say_hi():\n    print(\"สวัสดี\")\n\nsay_hi()" },
      { t: "callout", title: "เปรียบเทียบให้เห็นภาพ", c: "decorator เหมือนกระดาษห่อของขวัญที่เพิ่มความสามารถให้กล่อง โดยไม่ต้องแกะกล่องไปแก้ของข้างใน — ฟังก์ชันเดิมไม่ถูกแตะ แต่ได้พฤติกรรมเพิ่ม" },

      { t: "h2", c: "รองรับฟังก์ชันที่มี argument ด้วย *args/**kwargs" },
      { t: "p", c: "wrapper ต้องรับและส่งต่อ argument ทั้งหมด ไม่งั้นห่อได้แค่ฟังก์ชันที่ไม่มี argument — ใช้ *args, **kwargs จากหัวข้อก่อนหน้า" },
      { t: "code", lang: "python", c: "import functools\n\ndef timer(func):\n    @functools.wraps(func)            # รักษาชื่อ/docstring ของ func เดิม\n    def wrapper(*args, **kwargs):\n        import time\n        start = time.perf_counter()\n        result = func(*args, **kwargs)   # ส่งต่อ argument ทั้งหมด\n        elapsed = time.perf_counter() - start\n        print(f\"{func.__name__} ใช้เวลา {elapsed:.4f} วินาที\")\n        return result                    # อย่าลืมคืนค่า!\n    return wrapper\n\n@timer\ndef slow_add(a, b):\n    import time\n    time.sleep(0.1)\n    return a + b\n\nprint(slow_add(2, 3))   # slow_add ใช้เวลา 0.10.. วินาที / แล้ว 5" },
      { t: "callout", title: "ทำไมต้อง functools.wraps", warn: true, c: "ถ้าไม่ใส่ @functools.wraps(func) ฟังก์ชันที่ถูกห่อจะเสียชื่อจริง (slow_add.__name__ กลายเป็น 'wrapper') และ docstring หาย ทำให้ debug และเครื่องมืออื่นสับสน ใส่ไว้เสมอเป็นนิสัย" },

      { t: "h2", c: "decorator ที่รับ argument" },
      { t: "p", c: "ถ้าอยากให้ decorator ปรับแต่งได้ เช่น @retry(times=3) ต้องเพิ่มอีกชั้น — ฟังก์ชันนอกสุดรับ argument แล้วคืน decorator จริง" },
      { t: "code", lang: "python", c: "import functools\n\ndef retry(times):\n    def decorator(func):\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            for attempt in range(1, times + 1):\n                try:\n                    return func(*args, **kwargs)\n                except Exception as e:\n                    print(f\"ครั้งที่ {attempt} ล้มเหลว: {e}\")\n            raise RuntimeError(f\"ล้มเหลวครบ {times} ครั้ง\")\n        return wrapper\n    return decorator\n\n@retry(times=3)\ndef risky():\n    raise ValueError(\"พัง\")\n\n# risky()  -> ลอง 3 ครั้งแล้วค่อย raise" },

      { t: "h2", c: "decorator ที่เจอในงานจริง" },
      {
        t: "ul",
        c: [
          "@app.route(\"/\") — Flask ผูก URL กับฟังก์ชัน",
          "@pytest.fixture — เตรียมข้อมูลให้เทสต์ (เจอในบท Testing)",
          "@property — ทำ method ให้เรียกเหมือน attribute",
          "@functools.lru_cache — cache ผลลัพธ์ (เจอในบท Performance & DP)",
        ],
      },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "decorator = ฟังก์ชันที่ห่อฟังก์ชันอื่นเพื่อเพิ่มพฤติกรรม",
          "@decorator คือทางลัดของ func = decorator(func)",
          "wrapper ต้องใช้ *args/**kwargs ส่งต่อ argument และคืนค่ากลับ",
          "ใส่ @functools.wraps(func) เสมอ; decorator รับ argument = 3 ชั้น",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน decorator @timer วัดเวลาฟังก์ชัน (ลองกับฟังก์ชันที่มี argument)  2) เขียน @log_call ที่ print ชื่อฟังก์ชันและ argument ทุกครั้งที่ถูกเรียก  3) เขียน decorator @memoize ที่ cache ผลลัพธ์ใน dict  4) อธิบายว่าทำไมต้องใส่ functools.wraps" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Context Manager (with) →", slug: "py-context", desc: "จัดการ resource ให้ปิดเสมอแม้เกิด error" },
          { title: "← ก่อนหน้า: Scope & Closure", slug: "py-closures" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "py-context": {
    slug: "py-context",
    title: "Context Manager (with)",
    lead: "ใช้และเขียน with เพื่อจัดการ resource (ไฟล์, connection) ให้เปิด-ปิดถูกต้องเสมอ แม้เกิด error",
    group: GROUP,
    blocks: [
      { t: "p", c: "คุณเคยใช้ with open(...) เปิดไฟล์มาแล้ว หัวข้อนี้อธิบายว่ามันทำงานอย่างไร ทำไมสำคัญ และวิธีเขียน context manager ของตัวเอง — เครื่องมือที่การันตีว่า resource ถูกปิดเสมอ ป้องกัน memory/handle leak" },

      { t: "h2", c: "ทำไมต้อง with" },
      { t: "p", c: "ถ้าเปิดไฟล์เองแล้วเกิด error ก่อนถึง close() ไฟล์จะค้างเปิด with แก้ปัญหานี้โดยปิดให้อัตโนมัติเมื่อออกจากบล็อก ไม่ว่าจะจบปกติหรือเกิด exception" },
      { t: "code", lang: "python", c: "# ❌ เสี่ยง: ถ้า error ก่อน close() ไฟล์ค้างเปิด\nf = open(\"data.txt\", encoding=\"utf-8\")\ndata = f.read()\nf.close()\n\n# ✅ with: ปิดให้อัตโนมัติเสมอ แม้เกิด error ในบล็อก\nwith open(\"data.txt\", encoding=\"utf-8\") as f:\n    data = f.read()\n# ออกจากบล็อก = ไฟล์ถูกปิดแล้วแน่นอน" },

      { t: "h2", c: "เขียน context manager ด้วย class (__enter__/__exit__)" },
      { t: "p", c: "object จะใช้กับ with ได้ ต้องมี 2 method: __enter__ (ทำตอนเข้าบล็อก, ค่าที่ return ไปเป็น as) และ __exit__ (ทำตอนออก แม้มี error)" },
      { t: "code", lang: "python", c: "class Timer:\n    def __enter__(self):\n        import time\n        self.start = time.perf_counter()\n        return self                 # ค่าที่ as จะได้\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        import time\n        elapsed = time.perf_counter() - self.start\n        print(f\"ใช้เวลา {elapsed:.4f} วินาที\")\n        # return False = ถ้ามี exception ให้โยนต่อ (ปกติ)\n\nwith Timer():\n    total = sum(range(1000000))\n# ใช้เวลา 0.0xx วินาที  (พิมพ์ตอนออกจากบล็อกเสมอ)" },
      { t: "callout", title: "__exit__ ทำงานแม้เกิด error", c: "พารามิเตอร์ exc_type, exc_val, exc_tb จะมีค่าถ้าในบล็อกเกิด exception ทำให้ context manager เป็นที่เหมาะสำหรับ \"คืน resource\" (ปิดไฟล์, ปิด connection, ปลด lock) ที่ต้องเกิดขึ้นไม่ว่าอะไรจะพัง" },

      { t: "h2", c: "วิธีลัด: contextlib.contextmanager" },
      { t: "p", c: "เขียน class เต็มยุ่งยาก ใช้ decorator @contextmanager กับ generator แทนได้ โค้ดก่อน yield = __enter__, หลัง yield = __exit__" },
      { t: "code", lang: "python", c: "from contextlib import contextmanager\nimport time\n\n@contextmanager\ndef timer():\n    start = time.perf_counter()\n    try:\n        yield                       # ตรงนี้คือ \"ในบล็อก with\"\n    finally:\n        elapsed = time.perf_counter() - start\n        print(f\"ใช้เวลา {elapsed:.4f} วินาที\")\n\nwith timer():\n    total = sum(range(1000000))" },
      { t: "callout", title: "ทำไมต้อง try/finally", warn: true, c: "ใส่ส่วนคืน resource ไว้ใน finally เพื่อให้ทำงานแม้บล็อกเกิด error — ถ้าไม่ใส่ finally แล้วโค้ดในบล็อก raise การคืน resource จะถูกข้าม กลายเป็น leak" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "with การันตีว่า resource ถูกคืน/ปิดเสมอ แม้เกิด error",
          "class context manager ต้องมี __enter__ และ __exit__",
          "ค่าที่ __enter__ คืน = ตัวที่รับด้วย as",
          "วิธีลัด: @contextmanager กับ generator (try/finally + yield)",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน context manager ด้วย class ที่ print \"เข้า\" ตอนเริ่มและ \"ออก\" ตอนจบ  2) เขียน timer ด้วย @contextmanager  3) ลองให้เกิด error ในบล็อก with แล้วสังเกตว่า __exit__/finally ยังทำงาน  4) เขียน context manager ที่เปิด-ปิดไฟล์ (จำลอง) พร้อม print สถานะ" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Mutability, Reference & Copy →", slug: "py-mutability", desc: "รากของบั๊กมือกลางอันดับ 1" },
          { title: "← ก่อนหน้า: Decorator", slug: "py-decorators" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "py-mutability": {
    slug: "py-mutability",
    title: "Mutability, Reference & Copy",
    lead: "เข้าใจว่าตัวแปรชี้ไปที่ object อย่างไร — รากของบั๊ก Python ที่คนระดับกลางเจอบ่อยที่สุด",
    group: GROUP,
    blocks: [
      { t: "p", c: "นี่คือหัวข้อที่อธิบายบั๊กลึกลับจำนวนมาก: \"ทำไมแก้ list หนึ่งแล้วอีก list เปลี่ยนตาม?\" คำตอบอยู่ที่การเข้าใจว่าใน Python ตัวแปรไม่ได้ \"เก็บค่า\" แต่ \"ชี้ไปที่ object\" เมื่อเข้าใจเรื่องนี้ คุณจะเลิกเจอบั๊กประหลาดไปครึ่งหนึ่ง" },

      { t: "h2", c: "ตัวแปรคือป้ายชื่อ ไม่ใช่กล่อง" },
      { t: "p", c: "คิดว่าตัวแปรเป็น \"ป้ายชื่อ\" ที่แปะไปบน object ในหน่วยความจำ การทำ b = a ไม่ได้ก็อป object แต่เอาป้าย b ไปแปะบน object เดียวกับ a" },
      { t: "code", lang: "python", c: "a = [1, 2, 3]\nb = a              # b ชี้ไปที่ list เดียวกับ a (ไม่ได้ก็อป)\nb.append(4)\n\nprint(a)           # [1, 2, 3, 4]  ← a เปลี่ยนตามด้วย!\nprint(b)           # [1, 2, 3, 4]\nprint(a is b)      # True  (เป็น object เดียวกัน)" },

      { t: "h2", c: "mutable vs immutable" },
      { t: "p", c: "object แบ่งเป็น 2 ประเภท: เปลี่ยนค่าข้างในได้ (mutable) กับเปลี่ยนไม่ได้ (immutable) ประเภทนี้กำหนดว่าจะเจอปัญหา aliasing ข้างบนหรือไม่" },
      {
        t: "table",
        head: ["ประเภท", "เปลี่ยนข้างในได้?", "ตัวอย่าง"],
        rows: [
          ["mutable", "ได้", "list, dict, set"],
          ["immutable", "ไม่ได้", "int, float, str, tuple, bool"],
        ],
      },
      { t: "code", lang: "python", c: "# immutable: การ 'แก้' จริง ๆ คือสร้าง object ใหม่\nx = 5\ny = x\ny = y + 1          # สร้าง int ใหม่ ไม่กระทบ x\nprint(x, y)        # 5 6  (x ไม่เปลี่ยน)\n\n# mutable: แก้ object เดิม กระทบทุกป้ายที่ชี้อยู่\nlist_a = [1, 2]\nlist_b = list_a\nlist_b.append(3)\nprint(list_a)      # [1, 2, 3]  (กระทบ)" },

      { t: "h2", c: "is กับ == ต่างกัน" },
      { t: "p", c: "== ถามว่า \"ค่าเท่ากันไหม\" ส่วน is ถามว่า \"เป็น object เดียวกันไหม (ที่อยู่ในหน่วยความจำเดียวกัน)\" — สองอย่างนี้คนละเรื่อง" },
      { t: "code", lang: "python", c: "a = [1, 2, 3]\nb = [1, 2, 3]      # list คนละตัว ค่าเท่ากัน\nc = a              # ป้ายชี้ตัวเดียวกับ a\n\nprint(a == b)      # True   (ค่าเท่ากัน)\nprint(a is b)      # False  (คนละ object)\nprint(a is c)      # True   (object เดียวกัน)" },
      { t: "callout", title: "ใช้ is เฉพาะกับ None", warn: true, c: "เปรียบเทียบค่าทั่วไปใช้ == เสมอ แต่เช็ค None ให้ใช้ is None / is not None เพราะ None เป็น object เดี่ยวในระบบ (singleton) เป็นสำนวนมาตรฐานของ Python — อย่าเขียน x == None" },

      { t: "h2", c: "ส่ง mutable เข้าฟังก์ชัน = ฟังก์ชันแก้ของจริงได้" },
      { t: "p", c: "เพราะส่ง reference ไป ฟังก์ชันที่ append/แก้ list จึงเปลี่ยน list ของผู้เรียกจริง — เป็นทั้งฟีเจอร์และกับดัก" },
      { t: "code", lang: "python", c: "def add_zero(items):\n    items.append(0)        # แก้ list ตัวจริงของ caller\n\nnums = [1, 2, 3]\nadd_zero(nums)\nprint(nums)                # [1, 2, 3, 0]  ← ถูกแก้!\n\n# ถ้าไม่อยากให้กระทบ ให้ก็อปก่อน\ndef add_zero_safe(items):\n    items = items.copy()   # ทำงานบนสำเนา\n    items.append(0)\n    return items" },

      { t: "h2", c: "copy แบบตื้น vs ลึก (deepcopy)" },
      { t: "p", c: "การก็อปธรรมดา (.copy() หรือ list(x)) เป็น shallow copy — ก็อปชั้นนอกแต่ object ข้างในยังแชร์กัน ถ้ามี list ซ้อน list ต้องใช้ copy.deepcopy" },
      { t: "code", lang: "python", c: "import copy\n\noriginal = [[1, 2], [3, 4]]\n\nshallow = original.copy()         # ก็อปชั้นนอกเท่านั้น\nshallow[0].append(99)             # แก้ list ข้างใน\nprint(original)   # [[1, 2, 99], [3, 4]]  ← กระทบ! (ข้างในแชร์กัน)\n\ndeep = copy.deepcopy(original)    # ก็อปทุกชั้น\ndeep[0].append(0)\nprint(original)   # [[1, 2, 99], [3, 4]]  ← ไม่กระทบแล้ว" },

      { t: "callout", title: "เชื่อมกลับ mutable default argument", c: "จำกับดัก def f(items=[]) ในหัวข้อ *args ได้ไหม — ตอนนี้คุณเข้าใจสาเหตุแล้ว: list default ถูกสร้าง object เดียวตอนนิยามฟังก์ชัน แล้วทุกการเรียกใช้ \"ป้ายเดียวกัน\" ค่าจึงค้าง ทางแก้คือใช้ None แล้วสร้าง list ใหม่ข้างใน (object ใหม่ทุกครั้ง)" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "ตัวแปร = ป้ายชื่อที่ชี้ไป object; b = a ไม่ได้ก็อป",
          "mutable (list/dict/set) แก้ข้างในได้ → เจอ aliasing; immutable (int/str/tuple) ไม่เจอ",
          "== เทียบค่า, is เทียบว่าเป็น object เดียวกัน — ใช้ is กับ None เท่านั้น",
          "shallow copy ยังแชร์ object ข้างใน; ซ้อนหลายชั้นต้อง copy.deepcopy",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ทำนายผล: a=[1,2]; b=a; b.append(3); print(a) แล้วรันเช็ค  2) เขียนฟังก์ชันที่เผลอแก้ list ของ caller แล้วแก้ให้ปลอดภัยด้วย copy  3) สร้าง list ซ้อน list ก็อปแบบ shallow แล้ว deepcopy เทียบผล  4) อธิบายว่าทำไม x is None ดีกว่า x == None" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: collections & itertools →", slug: "py-collections", desc: "เครื่องมือ standard library ที่ใช้ทุกวัน" },
          { title: "← ก่อนหน้า: Context Manager", slug: "py-context" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "py-collections": {
    slug: "py-collections",
    title: "collections & itertools",
    lead: "เครื่องมือใน standard library ที่มืออาชีพใช้ทุกวัน — เขียนน้อยลง บั๊กน้อยลง",
    group: GROUP,
    blocks: [
      { t: "p", c: "Python มีเครื่องมือสำเร็จรูปใน 2 โมดูลที่ช่วยให้งานซ้ำ ๆ สั้นลงและถูกต้องขึ้น: collections (โครงสร้างข้อมูลพิเศษ) และ itertools (เครื่องมือวนซ้ำ) การรู้จักมันคือสัญญาณของคนที่เขียน Python มาพอสมควร" },

      { t: "h2", c: "Counter — นับความถี่" },
      { t: "p", c: "งานนับว่าอะไรเจอกี่ครั้ง ใช้ Counter แทนการเขียน dict เองทีละขั้น" },
      { t: "code", lang: "python", c: "from collections import Counter\n\nwords = [\"a\", \"b\", \"a\", \"c\", \"a\", \"b\"]\ncount = Counter(words)\nprint(count)              # Counter({'a': 3, 'b': 2, 'c': 1})\nprint(count[\"a\"])         # 3\nprint(count.most_common(2))   # [('a', 3), ('b', 2)]  top-2\n\n# นับตัวอักษรในข้อความก็ได้\nprint(Counter(\"banana\"))  # Counter({'a': 3, 'n': 2, 'b': 1})" },

      { t: "h2", c: "defaultdict — dict ที่มีค่า default" },
      { t: "p", c: "ปัญหาคลาสสิก: เพิ่มค่าใน dict ที่ key ยังไม่มี ต้องเช็คก่อนทุกครั้ง defaultdict ตั้งค่าเริ่มต้นให้อัตโนมัติ เหมาะกับการจัดกลุ่ม (grouping)" },
      { t: "code", lang: "python", c: "from collections import defaultdict\n\n# จัดกลุ่มนักเรียนตามเกรด\nstudents = [(\"Aph\", \"A\"), (\"Bee\", \"B\"), (\"Cha\", \"A\")]\ngroups = defaultdict(list)        # ค่า default ของ key ใหม่ = list ว่าง\nfor name, grade in students:\n    groups[grade].append(name)    # ไม่ต้องเช็คว่ามี key ไหม\n\nprint(dict(groups))   # {'A': ['Aph', 'Cha'], 'B': ['Bee']}\n\n# นับด้วย defaultdict(int) ก็ได้\ncounts = defaultdict(int)\nfor ch in \"banana\":\n    counts[ch] += 1               # key ใหม่เริ่มที่ 0 อัตโนมัติ" },

      { t: "h2", c: "namedtuple & dataclass — ข้อมูลที่มีชื่อฟิลด์" },
      { t: "p", c: "แทนที่จะใช้ tuple ที่ต้องจำว่า index ไหนคืออะไร ใช้ namedtuple ให้แต่ละช่องมีชื่อ (สมัยใหม่นิยม dataclass ซึ่งจะเจอในบท type hints)" },
      { t: "code", lang: "python", c: "from collections import namedtuple\n\nPoint = namedtuple(\"Point\", [\"x\", \"y\"])\np = Point(3, 4)\nprint(p.x, p.y)      # 3 4  (อ่านง่ายกว่า p[0], p[1])\nprint(p)             # Point(x=3, y=4)" },

      { t: "h2", c: "deque — คิวสองหัวที่เร็ว" },
      { t: "p", c: "list ช้าเมื่อเพิ่ม/ลบหัวแถว (O(n)) deque ทำได้เร็ว (O(1)) ทั้งสองหัว เหมาะทำ queue (จะเจ​ออีกในบท Data Structures)" },
      { t: "code", lang: "python", c: "from collections import deque\n\nq = deque([1, 2, 3])\nq.append(4)          # ต่อท้าย -> [1, 2, 3, 4]\nq.appendleft(0)      # ต่อหน้า -> [0, 1, 2, 3, 4]\nprint(q.popleft())   # 0  (ดึงหน้า เร็ว O(1))\nprint(q.pop())       # 4  (ดึงท้าย)" },

      { t: "h2", c: "itertools — เครื่องมือวนซ้ำ" },
      { t: "p", c: "itertools มีฟังก์ชันสร้าง/รวม/จับคู่ลำดับที่ใช้บ่อย ทั้งหมดคืน iterator (ประหยัด memory ตามที่เรียนในหัวข้อ generator)" },
      { t: "code", lang: "python", c: "from itertools import chain, combinations, product, count\n\n# chain: ต่อหลาย iterable เข้าด้วยกัน\nprint(list(chain([1, 2], [3, 4])))        # [1, 2, 3, 4]\n\n# combinations: เลือก r ตัวจากชุด (ไม่สนลำดับ)\nprint(list(combinations([\"a\", \"b\", \"c\"], 2)))\n# [('a','b'), ('a','c'), ('b','c')]\n\n# product: ผลคูณคาร์ทีเซียน (ทุกการจับคู่)\nprint(list(product([1, 2], [\"x\", \"y\"])))\n# [(1,'x'), (1,'y'), (2,'x'), (2,'y')]\n\n# count: นับไม่รู้จบ (ใช้คู่ zip/break)\nfor i, ch in zip(count(1), \"abc\"):\n    print(i, ch)    # 1 a / 2 b / 3 c" },
      { t: "callout", title: "รู้จักไว้ ใช้เมื่อเจอโจทย์", c: "ไม่ต้องท่องทุกฟังก์ชัน แค่จำว่า \"นับความถี่ → Counter, จัดกลุ่ม → defaultdict, จับคู่/เลือกชุด → itertools\" เมื่อเจอโจทย์แล้วจะนึกออกว่ามีของพร้อมใช้ ไม่ต้องเขียนเอง" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "Counter นับความถี่ + most_common(); defaultdict ตั้งค่า default ให้ key ใหม่",
          "namedtuple ให้ tuple มีชื่อฟิลด์ (สมัยใหม่นิยม dataclass)",
          "deque เพิ่ม/ลบสองหัวเร็ว O(1) เหมาะทำ queue",
          "itertools: chain (ต่อ), combinations/product (จับคู่), count (นับไม่รู้จบ)",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ใช้ Counter หา 3 คำที่เจอบ่อยสุดในข้อความ  2) ใช้ defaultdict(list) จัดกลุ่มคำตามตัวอักษรแรก  3) สร้าง namedtuple ชื่อ Student มีฟิลด์ name, score  4) ใช้ combinations หาคู่ที่เป็นไปได้ทั้งหมดของ [1,2,3,4] เลือกทีละ 2" },
      {
        t: "links",
        c: [
          { title: "จบบทที่ 1 แล้ว 🎉 — กลับหน้าภาพรวมคอร์ส", slug: "intermediate", desc: "บทที่ 2: Error handling & โค้ดที่แข็งแรง กำลังจัดทำ" },
          { title: "← ก่อนหน้า: Mutability, Reference & Copy", slug: "py-mutability" },
          { title: "ทบทวน: Comprehension (ต้นบท)", slug: "py-comprehension" },
        ],
      },
    ],
  },
};
