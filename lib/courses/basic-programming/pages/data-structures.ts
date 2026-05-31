import type { Page } from "@/lib/types";

export const dataStructuresPages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "ds-list": {
    slug: "ds-list",
    title: "List / Array — โครงสร้างที่ใช้บ่อยที่สุด",
    lead: "เก็บข้อมูลหลายค่าในตัวแปรเดียว เข้าถึงด้วย index, slicing, เมธอดครบ และลิสต์ 2 มิติ",
    group: "บทที่ 3: โครงสร้างข้อมูล",
    blocks: [
      { t: "p", c: "ในบทที่ 2 ตัวแปรหนึ่งตัวเก็บได้ค่าเดียว แต่ชีวิตจริงข้อมูลมาเป็นกลุ่ม เช่นคะแนนนักเรียน 40 คน เราคงไม่สร้างตัวแปร 40 ตัว List (ในหลายภาษาเรียก Array) คือคำตอบ — เก็บข้อมูลหลายค่าเรียงต่อกันในตัวแปรเดียว นี่คือโครงสร้างข้อมูลที่ใช้บ่อยที่สุดและเป็นพื้นฐานของแทบทุกข้อสอบ" },

      { t: "h2", c: "สร้างลิสต์และเข้าถึงด้วย index" },
      { t: "p", c: "แต่ละช่องในลิสต์มีหมายเลขกำกับเรียกว่า index โดยเริ่มนับจาก 0 เสมอ (ไม่ใช่ 1!) นี่คือจุดที่มือใหม่พลาดบ่อยที่สุด" },
      { t: "code", lang: "python", c: "fruits = [\"แอปเปิล\", \"กล้วย\", \"ส้ม\", \"มะม่วง\"]\n#  index:      0          1        2        3\n\nprint(fruits[0])    # แอปเปิล  (ตัวแรก index 0)\nprint(fruits[2])    # ส้ม\nprint(fruits[-1])   # มะม่วง   (index ติดลบ = นับจากท้าย)\nprint(fruits[-2])   # ส้ม      (ตัวที่ 2 จากท้าย)\nprint(len(fruits))  # 4        (จำนวนสมาชิก)\n\nfruits[1] = \"องุ่น\"  # แก้ค่าในตำแหน่งได้\nprint(fruits)       # ['แอปเปิล', 'องุ่น', 'ส้ม', 'มะม่วง']" },
      { t: "callout", title: "ทำไม index เริ่มที่ 0", c: "เพราะ index แทน \"ระยะห่างจากจุดเริ่มต้น\" สมาชิกตัวแรกห่างจากจุดเริ่ม 0 ช่อง ตัวที่สองห่าง 1 ช่อง เข้าใจแบบนี้จะจำง่าย และ index ตัวสุดท้ายจะเป็น len - 1 เสมอ (ลิสต์ 4 ตัว index สุดท้ายคือ 3)" },
      { t: "callout", title: "IndexError ที่เจอบ่อย", warn: true, c: "เข้าถึง index ที่เกินขนาดลิสต์จะ error เช่นลิสต์มี 4 ตัว (index 0-3) แต่เรียก fruits[4] จะได้ IndexError: list index out of range ระวังตอนวน loop อย่าให้เกิน len - 1" },

      { t: "h2", c: "การหั่นลิสต์ (Slicing)" },
      { t: "p", c: "Slicing ดึงสมาชิกหลายตัวออกมาเป็นช่วงย่อย เขียนแบบ list[เริ่ม:จบ] โดย index ตัว \"จบ\" จะไม่ถูกรวม (เอาถึงก่อนหน้านั้น) เป็นเทคนิคที่ใช้บ่อยมาก" },
      { t: "code", lang: "python", c: "nums = [10, 20, 30, 40, 50]\nprint(nums[1:4])   # [20, 30, 40]  (index 1 ถึงก่อน 4)\nprint(nums[:3])    # [10, 20, 30]  (ตั้งแต่ต้นถึงก่อน 3)\nprint(nums[2:])    # [30, 40, 50]  (จาก index 2 ถึงท้าย)\nprint(nums[:])     # [10,20,30,40,50]  (สำเนาทั้งลิสต์)\nprint(nums[::2])   # [10, 30, 50]  (ก้าวทีละ 2)\nprint(nums[::-1])  # [50, 40, 30, 20, 10]  (กลับลำดับ!)" },
      { t: "callout", title: "[::-1] กลับลำดับ", c: "nums[::-1] เป็นวิธีกลับลำดับลิสต์ (หรือข้อความ) ที่สั้นที่สุด เจอบ่อยในโจทย์ เช่นเช็ค palindrome หรือกลับคำ จำสำนวนนี้ไว้ได้เลย" },

      { t: "h2", c: "เพิ่ม ลบ และแก้ไขสมาชิก" },
      { t: "code", lang: "python", c: "nums = [3, 1, 2]\n\nnums.append(4)      # เพิ่มท้าย      -> [3, 1, 2, 4]\nnums.insert(0, 9)   # แทรกที่ index 0 -> [9, 3, 1, 2, 4]\nnums.extend([5, 6]) # ต่อหลายตัว     -> [9, 3, 1, 2, 4, 5, 6]\n\nnums.remove(9)      # ลบค่า 9 ตัวแรกที่เจอ -> [3, 1, 2, 4, 5, 6]\nlast = nums.pop()   # เอาตัวท้ายออก คืนค่า last=6\nfirst = nums.pop(0) # เอา index 0 ออก คืนค่า first=3\ndel nums[0]         # ลบ index 0 (ไม่คืนค่า)\nprint(nums)" },
      {
        t: "table",
        head: ["เมธอด", "ทำอะไร", "เปลี่ยนลิสต์เดิมไหม"],
        rows: [
          ["append(x)", "เพิ่ม x ต่อท้าย", "ใช่"],
          ["insert(i, x)", "แทรก x ที่ตำแหน่ง i", "ใช่"],
          ["extend(list)", "ต่อหลายตัวจากอีกลิสต์", "ใช่"],
          ["remove(x)", "ลบค่า x ตัวแรกที่เจอ", "ใช่"],
          ["pop(i)", "เอาตัวที่ i ออก + คืนค่า (ไม่ใส่ = ตัวท้าย)", "ใช่"],
          ["clear()", "ล้างลิสต์ให้ว่าง", "ใช่"],
        ],
      },

      { t: "h2", c: "ค้นหา นับ และจัดเรียง" },
      { t: "code", lang: "python", c: "nums = [3, 1, 4, 1, 5, 1]\n\nprint(1 in nums)        # True   เช็คว่ามี 1 ไหม\nprint(nums.index(4))    # 2      ตำแหน่งของ 4\nprint(nums.count(1))    # 3      นับว่ามี 1 กี่ตัว\nprint(len(nums))        # 6\nprint(sum(nums))        # 15\nprint(min(nums), max(nums))  # 1 5\n\nnums.sort()             # เรียงในตัวเอง -> [1,1,1,3,4,5]\nnums.sort(reverse=True) # มากไปน้อย -> [5,4,3,1,1,1]\nnums.reverse()          # กลับลำดับ -> [1,1,1,3,4,5]\n\n# sorted() คืนลิสต์ใหม่ ไม่แก้ของเดิม\nnew_list = sorted([3, 1, 2])   # [1, 2, 3] ของเดิมไม่เปลี่ยน" },

      { t: "h2", c: "วนลูปในลิสต์" },
      { t: "code", lang: "python", c: "scores = [80, 92, 75, 60]\n\nfor s in scores:                 # วนเอาค่า\n    print(s)\n\nfor i, s in enumerate(scores):   # วนเอาทั้ง index และค่า\n    print(f\"คนที่ {i+1} ได้ {s} คะแนน\")\n\ntotal = sum(scores)\nprint(f\"เฉลี่ย {total / len(scores)}\")" },

      { t: "h2", c: "ลิสต์ 2 มิติ (2D Array / ตาราง)" },
      { t: "p", c: "ลิสต์ซ้อนลิสต์ ใช้แทนตาราง กระดานเกม (หมากรุก, XO) หรือ matrix เข้าถึงด้วย index สองชั้น: grid[แถว][คอลัมน์]" },
      { t: "code", lang: "python", c: "grid = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n]\nprint(grid[0][2])   # 3  (แถว 0 คอลัมน์ 2)\nprint(grid[2][0])   # 7  (แถว 2 คอลัมน์ 0)\n\n# วนทุกช่อง\nfor row in grid:\n    for cell in row:\n        print(cell, end=\" \")\n    print()         # ขึ้นบรรทัดใหม่ทุกแถว" },

      { t: "h2", c: "ระวัง! ลิสต์เป็น mutable และการ \"คัดลอก\"" },
      { t: "p", c: "ลิสต์แก้ไขได้ (mutable) และเมื่อกำหนด b = a ทั้งสองชื่อชี้ลิสต์เดียวกัน แก้ตัวหนึ่งกระทบอีกตัว นี่คือกับดักที่ทำให้มือใหม่งงมาก" },
      { t: "code", lang: "python", c: "a = [1, 2, 3]\nb = a               # b ชี้ลิสต์เดียวกับ a (ไม่ใช่สำเนา!)\nb.append(4)\nprint(a)            # [1, 2, 3, 4]  <- a เปลี่ยนด้วย!\n\n# ถ้าต้องการสำเนาจริง ใช้ .copy() หรือ [:]\nc = a.copy()        # หรือ a[:]\nc.append(99)\nprint(a)            # ไม่เปลี่ยน (c เป็นลิสต์คนละก้อน)" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "List เก็บหลายค่าเรียงกัน เข้าถึงด้วย index เริ่มที่ 0 (index สุดท้าย = len - 1)",
          "Slicing list[start:end] ดึงช่วงย่อย (ไม่รวม end), [::-1] กลับลำดับ",
          "เพิ่ม/ลบ: append, insert, extend, remove, pop, del",
          "ค้นหา/จัดการ: in, index, count, sum, min, max, sort, sorted",
          "ลิสต์ 2 มิติเข้าถึงด้วย grid[แถว][คอลัมน์]",
          "ลิสต์เป็น mutable — b = a ชี้ก้อนเดียวกัน ต้องใช้ .copy() เพื่อสำเนาจริง",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) สร้างลิสต์คะแนน 5 ตัว หาผลรวม ค่าเฉลี่ย มากสุด น้อยสุด  2) กลับลำดับลิสต์ด้วย [::-1]  3) รับตัวเลขจากผู้ใช้เก็บในลิสต์จนพิมพ์ 0 แล้วเรียงจากน้อยไปมาก  4) สร้างตาราง 3x3 แล้วหาผลรวมแต่ละแถว  5) ลองทดลอง b = a vs b = a.copy() ดูความต่าง" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: String →", slug: "ds-string", desc: "ลำดับของตัวอักษรและเมธอดจัดการข้อความ" },
          { title: "← กลับหน้าภาพรวมคอร์ส", slug: "learn" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "ds-string": {
    slug: "ds-string",
    title: "String — ลำดับของตัวอักษร",
    lead: "ข้อความก็เป็นลำดับเหมือนลิสต์ — index, slice ได้ พร้อมเมธอดจัดการข้อความที่เจอบ่อยในงานจริงและข้อสอบ",
    group: "บทที่ 3: โครงสร้างข้อมูล",
    blocks: [
      { t: "p", c: "String (ข้อความ) คือลำดับของตัวอักษร จึงทำหลายอย่างได้เหมือนลิสต์ (index, slice, len, วน loop) แต่มีข้อต่างสำคัญ: แก้ตัวอักษรในตำแหน่งไม่ได้ (immutable) หัวข้อนี้รวมเมธอดที่ใช้บ่อยที่สุดในการทำงานจริง" },

      { t: "h2", c: "String เป็นลำดับ — index และ slice" },
      { t: "code", lang: "python", c: "s = \"Hello\"\nprint(s[0])       # H   (ตัวแรก index 0)\nprint(s[-1])      # o   (ตัวสุดท้าย)\nprint(s[1:4])     # ell (slice เหมือนลิสต์)\nprint(s[::-1])    # olleH (กลับข้อความ)\nprint(len(s))     # 5\n\nfor ch in s:      # วนทีละตัวอักษร\n    print(ch)\n\n# s[0] = \"J\"      # TypeError! แก้ตัวอักษรไม่ได้ (immutable)\ns = \"J\" + s[1:]   # ต้องสร้างใหม่แทน -> 'Jello'" },
      { t: "callout", title: "immutable หมายความว่าอย่างไร", c: "string แก้ไขในที่ไม่ได้ ทุกเมธอดที่ \"เปลี่ยน\" ข้อความจริง ๆ แล้วสร้าง string ใหม่คืนมา ของเดิมไม่เปลี่ยน ฉะนั้นต้องเก็บผลลัพธ์ไว้ในตัวแปร เช่น s = s.upper()" },

      { t: "h2", c: "เมธอดที่ใช้บ่อยที่สุด" },
      { t: "code", lang: "python", c: "s = \"  Hello World  \"\nprint(s.upper())          # '  HELLO WORLD  '\nprint(s.lower())          # '  hello world  '\nprint(s.strip())          # 'Hello World' (ตัดช่องว่างหัวท้าย)\nprint(s.strip().title())  # 'Hello World' -> ขึ้นต้นคำตัวใหญ่\nprint(\"Hello\".replace(\"l\", \"L\"))  # 'HeLLo'\nprint(\"a,b,c\".split(\",\")) # ['a', 'b', 'c'] (ตัดเป็นลิสต์)\nprint(\"-\".join([\"a\",\"b\",\"c\"]))  # 'a-b-c' (รวมลิสต์เป็นข้อความ)" },
      {
        t: "table",
        head: ["เมธอด", "ทำอะไร"],
        rows: [
          ["upper() / lower()", "เปลี่ยนเป็นตัวพิมพ์ใหญ่/เล็ก"],
          ["strip()", "ตัดช่องว่าง (หรือตัวที่ระบุ) หัวท้าย"],
          ["replace(a, b)", "แทนที่ a ด้วย b ทุกตำแหน่ง"],
          ["split(sep)", "ตัดข้อความเป็นลิสต์ตามตัวคั่น"],
          ["join(list)", "รวมลิสต์เป็นข้อความ"],
          ["find(x) / index(x)", "หาตำแหน่งของ x"],
          ["startswith / endswith", "เช็คขึ้นต้น/ลงท้ายด้วยอะไร"],
        ],
      },

      { t: "h2", c: "ตรวจสอบเนื้อหาของข้อความ" },
      { t: "code", lang: "python", c: "print(\"Hello\".startswith(\"He\"))  # True\nprint(\"file.txt\".endswith(\".txt\"))# True\nprint(\"abc\" in \"abcdef\")          # True  (มี substring ไหม)\nprint(\"123\".isdigit())            # True  (เป็นตัวเลขล้วนไหม)\nprint(\"abc\".isalpha())            # True  (เป็นตัวอักษรล้วนไหม)\nprint(\"Hello World\".count(\"o\"))   # 2     (มี o กี่ตัว)" },

      { t: "h2", c: "ตัวอย่างใช้งานจริง" },
      { t: "code", lang: "python", c: "# 1) นับจำนวนคำในประโยค\nsentence = \"the quick brown fox\"\nwords = sentence.split()      # ['the','quick','brown','fox']\nprint(len(words))             # 4\n\n# 2) ทำให้ชื่อขึ้นต้นตัวใหญ่และตัดช่องว่างเกิน\nname = input(\"ชื่อ: \").strip().title()\nprint(f\"สวัสดีคุณ {name}\")\n\n# 3) เช็คพาลินโดรม\nword = \"level\"\nprint(word == word[::-1])     # True" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "string เป็นลำดับตัวอักษร — index, slice, len, วน loop ได้เหมือนลิสต์",
          "string เป็น immutable — เมธอดที่ \"เปลี่ยน\" จริง ๆ สร้างใหม่ ต้องเก็บผลไว้",
          "เมธอดหลัก: upper/lower, strip, replace, split, join",
          "ตรวจสอบ: in, startswith/endswith, isdigit/isalpha, count",
          "split() + join() คู่หูจัดการข้อความ <-> ลิสต์",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) รับประโยค แล้วนับจำนวนคำและจำนวนตัวอักษร (ไม่นับช่องว่าง)  2) รับชื่อ-นามสกุล แล้วแสดงเป็นตัวพิมพ์ใหญ่ทั้งหมด  3) เช็คว่าคำที่รับเป็นพาลินโดรมไหม  4) รับอีเมล แล้วเช็คว่ามี @ และลงท้าย .com ไหม  5) แทนที่ช่องว่างในประโยคด้วยขีดล่าง _" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Dictionary →", slug: "ds-dict", desc: "เก็บข้อมูลแบบคู่ key-value ค้นหาเร็ว" },
          { title: "← List / Array", slug: "ds-list" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "ds-dict": {
    slug: "ds-dict",
    title: "Dictionary — คู่ key-value ที่ค้นหาเร็ว",
    lead: "เก็บข้อมูลเป็นคู่ \"กุญแจ → ค่า\" เข้าถึงด้วย key ค้นหาเร็วระดับ O(1) — หนึ่งในโครงสร้างที่ทรงพลังที่สุด",
    group: "บทที่ 3: โครงสร้างข้อมูล",
    blocks: [
      { t: "p", c: "Dictionary (dict) เก็บข้อมูลเป็นคู่ \"key → value\" เหมือนพจนานุกรมที่เปิดหาคำ (key) แล้วได้ความหมาย (value) ต่างจากลิสต์ที่เข้าถึงด้วยตำแหน่ง dict เข้าถึงด้วย key ที่สื่อความหมาย และค้นหาเร็วมาก (เฉลี่ย O(1)) เป็นโครงสร้างที่ใช้บ่อยรองจากลิสต์" },

      { t: "h2", c: "สร้างและเข้าถึง" },
      { t: "code", lang: "python", c: "student = {\n    \"name\": \"Aphisit\",\n    \"age\": 25,\n    \"gpa\": 3.5,\n}\nprint(student[\"name\"])    # Aphisit  (เข้าถึงด้วย key)\nprint(student[\"gpa\"])     # 3.5\n\nstudent[\"age\"] = 26       # แก้ค่า\nstudent[\"city\"] = \"Bangkok\"  # เพิ่มคู่ใหม่\ndel student[\"gpa\"]        # ลบคู่\nprint(student)" },
      { t: "callout", title: "ระวัง KeyError", warn: true, c: "เข้าถึง key ที่ไม่มีจะ error เช่น student[\"phone\"] ได้ KeyError ใช้ .get() ปลอดภัยกว่า: student.get(\"phone\") คืน None ถ้าไม่มี หรือ student.get(\"phone\", \"ไม่มีข้อมูล\") กำหนดค่าสำรองได้" },

      { t: "h2", c: "เมธอดและการเช็ค key" },
      { t: "code", lang: "python", c: "d = {\"a\": 1, \"b\": 2, \"c\": 3}\n\nprint(\"a\" in d)         # True   เช็คว่ามี key นี้ไหม\nprint(d.get(\"z\", 0))    # 0      ดึงค่าแบบปลอดภัย\nprint(d.keys())         # dict_keys(['a','b','c'])\nprint(d.values())       # dict_values([1, 2, 3])\nprint(d.items())        # คู่ (key, value) ทั้งหมด\nprint(len(d))           # 3" },

      { t: "h2", c: "วน loop ใน dictionary" },
      { t: "code", lang: "python", c: "scores = {\"Aphisit\": 80, \"Mali\": 92, \"Mochi\": 75}\n\nfor name in scores:                  # วนได้ key โดยตรง\n    print(name)\n\nfor name, score in scores.items():   # วนทั้ง key และ value\n    print(f\"{name} ได้ {score} คะแนน\")\n\n# หาคนที่คะแนนเกิน 80\nfor name, score in scores.items():\n    if score > 80:\n        print(f\"{name} ผ่านเกณฑ์\")" },

      { t: "h2", c: "ใช้งานยอดฮิต: นับความถี่ (Counting)" },
      { t: "p", c: "หนึ่งในการใช้ dict ที่เจอบ่อยที่สุดในข้อสอบคือ \"นับจำนวน\" เช่นนับว่าตัวอักษร/คำแต่ละตัวปรากฏกี่ครั้ง เพราะ dict ค้นหาเร็ว จึงทำได้ใน O(n)" },
      { t: "code", lang: "python", c: "text = \"banana\"\ncount = {}\nfor ch in text:\n    count[ch] = count.get(ch, 0) + 1  # ไม่มี key ให้เริ่มที่ 0\nprint(count)   # {'b': 1, 'a': 3, 'n': 2}\n\n# มีเครื่องมือสำเร็จรูปด้วย\nfrom collections import Counter\nprint(Counter(\"banana\"))  # Counter({'a': 3, 'n': 2, 'b': 1})" },
      { t: "callout", title: "ทำไม dict สำคัญในข้อสอบ", c: "โจทย์ประเภท \"นับ\", \"จับคู่\", \"เคยเห็นค่านี้มาก่อนไหม\" มักแก้เร็วด้วย dict แทนที่จะวนหาทั้งลิสต์ (O(n) ต่อครั้ง) การเช็คใน dict เร็วระดับ O(1) ทำให้อัลกอริทึมโดยรวมเร็วขึ้นมาก (จะเห็นชัดในบท Big-O)" },

      { t: "h2", c: "dict ซ้อนกัน (Nested)" },
      { t: "code", lang: "python", c: "users = {\n    \"u1\": {\"name\": \"Aphisit\", \"age\": 25},\n    \"u2\": {\"name\": \"Mali\", \"age\": 22},\n}\nprint(users[\"u1\"][\"name\"])   # Aphisit\n\nfor uid, info in users.items():\n    print(f\"{uid}: {info['name']} อายุ {info['age']}\")" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "dict เก็บคู่ key → value เข้าถึงด้วย key ที่สื่อความหมาย",
          "ค้นหา/เพิ่ม/แก้/ลบ เร็วเฉลี่ย O(1)",
          "ใช้ .get(key, default) เลี่ยง KeyError",
          "วนด้วย .items() เพื่อได้ทั้ง key และ value",
          "ใช้งานยอดฮิต: นับความถี่ ด้วย count[x] = count.get(x, 0) + 1 หรือ Counter",
          "dict ซ้อนกันได้ ใช้แทนข้อมูลที่มีโครงสร้างซับซ้อน (คล้าย JSON)",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง dict เก็บชื่อ-คะแนนนักเรียน แล้ว print คนที่คะแนนเกิน 50  2) นับความถี่ของตัวอักษรในคำที่รับมา  3) นับความถี่ของคำในประโยค (split ก่อน)  4) สร้างสมุดโทรศัพท์ที่เพิ่ม/ค้นหา/ลบรายชื่อได้ด้วยเมนู (ใช้ while loop)  5) หา key ที่มี value มากที่สุดใน dict" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Set & Tuple →", slug: "ds-set-tuple", desc: "ค่าไม่ซ้ำ และลิสต์ที่แก้ไม่ได้" },
          { title: "← String", slug: "ds-string" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "ds-set-tuple": {
    slug: "ds-set-tuple",
    title: "Set & Tuple",
    lead: "Set เก็บค่าไม่ซ้ำและเช็คสมาชิกเร็ว · Tuple คือลิสต์ที่แก้ไม่ได้ เหมาะกับข้อมูลคงที่",
    group: "บทที่ 3: โครงสร้างข้อมูล",
    blocks: [
      { t: "p", c: "นอกจาก list และ dict ยังมีอีก 2 โครงสร้างที่ควรรู้: Set (เซ็ตของค่าไม่ซ้ำ) และ Tuple (ลิสต์ที่แก้ไม่ได้) ทั้งคู่ใช้ในสถานการณ์เฉพาะที่ทำให้โค้ดสะอาดและถูกต้องขึ้น" },

      { t: "h2", c: "Set — ค่าที่ไม่ซ้ำกัน" },
      { t: "p", c: "Set เก็บเฉพาะค่าที่ไม่ซ้ำ (unique) และไม่สนลำดับ เหมาะกับการตัดค่าซ้ำ และเช็คว่ามีสมาชิกไหมแบบเร็ว (O(1))" },
      { t: "code", lang: "python", c: "nums = [1, 2, 2, 3, 3, 3]\nunique = set(nums)\nprint(unique)        # {1, 2, 3}  (ตัดตัวซ้ำออกอัตโนมัติ)\nprint(3 in unique)   # True       (เช็คเร็ว O(1))\n\ns = set()            # set ว่าง (ใช้ set() ไม่ใช่ {} ซึ่งเป็น dict ว่าง!)\ns.add(1)\ns.add(2)\ns.add(1)             # ซ้ำ ไม่เพิ่ม\nprint(s)             # {1, 2}\ns.remove(1)\nprint(len(s))        # 1" },
      { t: "h3", c: "การกระทำแบบเซ็ต (เหมือนคณิตศาสตร์)" },
      { t: "code", lang: "python", c: "a = {1, 2, 3}\nb = {2, 3, 4}\nprint(a & b)   # {2, 3}      intersection (อยู่ทั้งคู่)\nprint(a | b)   # {1,2,3,4}   union (รวมทั้งหมด)\nprint(a - b)   # {1}         difference (อยู่ใน a ไม่อยู่ใน b)\nprint(a ^ b)   # {1, 4}      symmetric (อยู่อันใดอันหนึ่ง ไม่ใช่ทั้งคู่)" },
      { t: "callout", title: "เมื่อไหร่ใช้ set", c: "ใช้เมื่อต้องการตัดค่าซ้ำ (เช่นหาว่ามีค่าไม่ซ้ำกี่แบบ) หรือต้องเช็ค \"เคยเห็นค่านี้ไหม\" หลาย ๆ ครั้ง เพราะ x in set เร็วกว่า x in list มาก (O(1) เทียบกับ O(n))" },

      { t: "h2", c: "Tuple — ลิสต์ที่แก้ไม่ได้" },
      { t: "p", c: "Tuple คล้าย list แต่แก้ไขไม่ได้หลังสร้าง (immutable) ใช้กับข้อมูลที่ไม่ควรเปลี่ยน เช่นพิกัด (x, y), สี RGB หรือคืนค่าหลายค่าจากฟังก์ชัน" },
      { t: "code", lang: "python", c: "point = (10, 20)\nprint(point[0])      # 10  (index ได้เหมือนลิสต์)\nprint(point[1])      # 20\n# point[0] = 5       # TypeError! แก้ไม่ได้\n\nx, y = point         # แตกค่าออกมา (unpacking)\nprint(x, y)          # 10 20\n\n# ใช้คืนหลายค่าจากฟังก์ชัน\ndef min_max(nums):\n    return min(nums), max(nums)   # คืนเป็น tuple\nlow, high = min_max([3, 1, 7, 2])\nprint(low, high)     # 1 7" },
      { t: "callout", title: "ทำไมต้องมี tuple ในเมื่อมี list แล้ว", c: "ความ \"แก้ไม่ได้\" เป็นข้อดี: ป้องกันการแก้ค่าโดยพลาด สื่อให้คนอ่านรู้ว่า \"ข้อมูลนี้คงที่\" และ tuple ใช้เป็น key ของ dict ได้ (list ใช้ไม่ได้) เช่นเก็บพิกัดเป็น key" },

      { t: "h2", c: "เปรียบเทียบ List / Set / Tuple" },
      {
        t: "table",
        head: ["ลักษณะ", "List", "Set", "Tuple"],
        rows: [
          ["เขียนด้วย", "[ ]", "{ }", "( )"],
          ["แก้ไขได้", "ได้", "ได้ (add/remove)", "ไม่ได้"],
          ["มีลำดับ/index", "มี", "ไม่มี", "มี"],
          ["ค่าซ้ำได้", "ได้", "ไม่ได้", "ได้"],
          ["เช็คสมาชิก", "O(n)", "O(1)", "O(n)"],
        ],
      },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "Set เก็บค่าไม่ซ้ำ ไม่สนลำดับ เช็คสมาชิกเร็ว O(1) — ใช้ตัดซ้ำและเช็ค membership",
          "การกระทำแบบเซ็ต: & (ร่วม), | (รวม), - (ต่าง), ^ (ต่างสมมาตร)",
          "Tuple = ลิสต์ที่แก้ไม่ได้ (immutable) เขียนด้วย ( )",
          "Tuple เหมาะกับข้อมูลคงที่ คืนหลายค่า และใช้เป็น key ของ dict ได้",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) รับลิสต์ที่มีค่าซ้ำ แล้วบอกว่ามีค่าไม่ซ้ำกี่แบบ  2) มีลิสต์ 2 อัน หาค่าที่อยู่ทั้งสองอัน (intersection)  3) เขียนฟังก์ชันคืนทั้งผลรวมและค่าเฉลี่ยเป็น tuple  4) เก็บพิกัดจุดเป็น tuple ในลิสต์ แล้ววนพิมพ์  5) เช็คว่าในประโยคมีตัวอักษรซ้ำไหม (ใช้ set เทียบ len)" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: เลือกใช้โครงสร้างไหน + Comprehension →", slug: "ds-choose", desc: "สรุปการเลือกใช้ และเขียนลิสต์/dict แบบสั้น" },
          { title: "← Dictionary", slug: "ds-dict" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "ds-choose": {
    slug: "ds-choose",
    title: "เลือกใช้โครงสร้างไหน + Comprehension",
    lead: "สรุปการเลือกโครงสร้างข้อมูลให้เหมาะกับงาน และเขียน list/dict comprehension แบบกระชับ",
    group: "บทที่ 3: โครงสร้างข้อมูล",
    blocks: [
      { t: "p", c: "ตอนนี้เรารู้จัก List, String, Dictionary, Set, Tuple ครบแล้ว หัวข้อปิดท้ายบทนี้จะสรุปวิธีเลือกใช้ให้เหมาะ และแนะนำ comprehension — สำนวน Python ที่ช่วยสร้างลิสต์/dict ได้สั้นและสวย" },

      { t: "h2", c: "ตารางตัดสินใจ: ใช้โครงสร้างไหนดี" },
      {
        t: "table",
        head: ["ต้องการ", "ใช้", "เพราะ"],
        rows: [
          ["ลำดับที่เข้าถึงด้วยตำแหน่ง แก้ไขได้", "List", "index ได้ เพิ่ม/ลบได้"],
          ["จับคู่ key → value, ค้นหาเร็ว", "Dictionary", "ค้นด้วย key O(1)"],
          ["ค่าไม่ซ้ำ / เช็คสมาชิกบ่อย", "Set", "ตัดซ้ำอัตโนมัติ, in เร็ว O(1)"],
          ["ข้อมูลคงที่ ไม่ควรเปลี่ยน", "Tuple", "กันแก้พลาด, เป็น key ได้"],
          ["ข้อความ", "String", "มีเมธอดจัดการตัวอักษรครบ"],
        ],
      },
      { t: "callout", title: "คิดจากคำถามนี้", c: "ถามตัวเองว่า: (1) ข้อมูลต้องเรียงลำดับไหม → ใช้ list/tuple (2) ต้องจับคู่ชื่อกับค่าไหม → dict (3) สนแค่ว่ามีหรือไม่มี และไม่ซ้ำ → set (4) ต้องกันการแก้ไขไหม → tuple การเลือกถูกตั้งแต่ต้นทำให้โค้ดเร็วและอ่านง่ายขึ้นมาก" },

      { t: "h2", c: "List Comprehension — สร้างลิสต์แบบสั้น" },
      { t: "p", c: "comprehension คือวิธีสร้างลิสต์จากลิสต์อื่นในบรรทัดเดียว แทนการเขียน for loop หลายบรรทัด เป็นสำนวนที่ Python นิยมมากและเจอบ่อยในโค้ดจริง" },
      { t: "code", lang: "python", c: "# วิธีปกติ\nsquares = []\nfor i in range(1, 6):\n    squares.append(i ** 2)\nprint(squares)   # [1, 4, 9, 16, 25]\n\n# เขียนด้วย comprehension — บรรทัดเดียว\nsquares = [i ** 2 for i in range(1, 6)]\nprint(squares)   # [1, 4, 9, 16, 25]\n\n# มีเงื่อนไขกรองได้\nevens = [i for i in range(10) if i % 2 == 0]\nprint(evens)     # [0, 2, 4, 6, 8]" },
      { t: "code", lang: "python", c: "# ใช้กับข้อมูลจริง\nnames = [\"aphisit\", \"mali\", \"mochi\"]\nupper = [n.upper() for n in names]\nprint(upper)     # ['APHISIT', 'MALI', 'MOCHI']\n\nlengths = [len(n) for n in names]\nprint(lengths)   # [7, 4, 5]" },
      { t: "callout", title: "อย่าใช้ comprehension จนยาวเกินไป", warn: true, c: "comprehension เหมาะกับตรรกะสั้น ๆ ถ้าซ้อนเงื่อนไขหลายชั้นหรือยาวมากจนอ่านยาก ให้กลับไปเขียน for loop ปกติ ความอ่านง่ายสำคัญกว่าความสั้น" },

      { t: "h2", c: "Dict & Set Comprehension" },
      { t: "code", lang: "python", c: "# dict comprehension\nsquares = {i: i ** 2 for i in range(1, 5)}\nprint(squares)   # {1: 1, 2: 4, 3: 9, 4: 16}\n\n# set comprehension\nwords = [\"apple\", \"banana\", \"apple\", \"cherry\"]\nfirst_letters = {w[0] for w in words}\nprint(first_letters)  # {'a', 'b', 'c'}" },

      { t: "h2", c: "สรุปบทที่ 3" },
      {
        t: "ul",
        c: [
          "เลือกโครงสร้างจากสิ่งที่ต้องทำ: list (ลำดับ), dict (จับคู่+ค้นเร็ว), set (ไม่ซ้ำ), tuple (คงที่)",
          "list comprehension สร้างลิสต์ในบรรทัดเดียว: [นิพจน์ for x in ที่มา if เงื่อนไข]",
          "มี dict และ set comprehension ด้วย",
          "comprehension ดีเมื่อสั้นและอ่านง่าย — ยาวเกินไปให้ใช้ for loop ปกติ",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ใช้ comprehension สร้างลิสต์กำลังสองของ 1-10  2) กรองเฉพาะเลขคู่จากลิสต์ด้วย comprehension  3) สร้าง dict ที่ map คำ -> ความยาวของคำ  4) จากลิสต์อุณหภูมิเซลเซียส แปลงเป็นฟาเรนไฮต์ทั้งหมดด้วย comprehension  5) เลือกโครงสร้างที่เหมาะกับ: เก็บรายชื่อนักเรียนเรียงตามลำดับ / เก็บคะแนนตามชื่อ / เก็บ tag ที่ไม่ซ้ำ" },
      {
        t: "links",
        c: [
          { title: "บทที่ 4: อัลกอริทึม & Big-O →", slug: "algo-thinking", desc: "นำโครงสร้างข้อมูลมาแก้ปัญหาอย่างมีประสิทธิภาพ" },
          { title: "← Set & Tuple", slug: "ds-set-tuple" },
        ],
      },
    ],
  },
};
