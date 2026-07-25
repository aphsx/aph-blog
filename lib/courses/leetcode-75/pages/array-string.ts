import type { Page } from "@/lib/types";

export const arrayStringPages: Record<string, Page> = {
  "lc75-intro-array-string": {
    slug: "lc75-intro-array-string",
    title: "Array / String — พื้นฐาน & แนวคิด",
    lead: "หัวข้อวอร์มอัพว่าด้วยการ access, iterate และ transform ระหว่าง array (ลิสต์) กับ string ให้คล่องก่อนลุยเทคนิคจริง",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "array (ลิสต์) กับ string (สตริง) คือโครงสร้างข้อมูลที่เจอในโจทย์ LeetCode มากกว่าครึ่ง ก่อนจะไปเทคนิคหวือหวา สิ่งที่ต้องแม่นก่อนคือ \"operation แต่ละอย่างมีราคาเท่าไร\" เพราะโค้ดที่ดูสั้นและสวยบางอันแพงกว่าที่คิดหลายเท่า และนั่นคือจุดที่ทำให้คำตอบติด TLE (Time Limit Exceeded)" },

      { t: "h2", c: "ราคาของ operation บน list — ดูของจริงก่อน" },
      { t: "p", c: "list ของ Python เก็บของเรียงติดกันในหน่วยความจำ จึงกระโดดไปตำแหน่งไหนก็ได้ทันที แต่การแทรก/ลบตรงกลางต้องเลื่อนของทั้งแถว" },
      {
        t: "codeout",
        lang: "python",
        label: "list operation ที่ใช้บ่อย",
        code: `nums = [10, 20, 30, 40, 50]

print(nums[2])            # index -> O(1) กระโดดถึงตำแหน่งได้ทันที
print(nums[1:4])          # slice -> O(k) สร้าง list ใหม่ขนาด k
nums.append(60)           # ต่อท้าย -> O(1)
print(nums)
nums.insert(0, 5)         # แทรกหัว -> O(n) ต้องเลื่อนของทุกตัวไปทางขวา
print(nums)
print(len(nums))          # O(1) Python จำความยาวไว้ให้แล้ว`,
        out: `30
[20, 30, 40]
[10, 20, 30, 40, 50, 60]
[5, 10, 20, 30, 40, 50, 60]
7`,
      },
      { t: "p", c: "ข้อควรจำที่ใช้บ่อยที่สุด: append และ pop ท้าย ถูก แต่ insert(0, x) และ pop(0) แพง — ถ้าโจทย์ต้องใส่หรือเอาของออกทางหัวบ่อย ให้เปลี่ยนไปใช้ deque (จะเจอในหมวด Queue)" },

      { t: "h2", c: "string เป็น immutable — และมันสำคัญมาก" },
      { t: "p", c: "string ของ Python เป็น immutable (แก้ไม่ได้) หมายความว่าทุกครั้งที่ \"แก้\" string เราไม่ได้แก้ของเดิม แต่สร้างตัวใหม่ทั้งก้อน" },
      {
        t: "codeout",
        lang: "python",
        label: "แก้ string ตรง ๆ ไม่ได้",
        code: `s = "hello"
try:
    s[0] = "H"                 # string เป็น immutable (แก้ไม่ได้)
except TypeError as e:
    print("TypeError:", e)

chars = list(s)                # ถ้าต้องแก้ทีละตัว -> แปลงเป็น list ก่อน
chars[0] = "H"
print("".join(chars))          # แล้ว join กลับเป็น string`,
        out: `TypeError: 'str' object does not support item assignment
Hello`,
      },
      { t: "p", c: "ผลพวงที่ทำให้คนติด TLE บ่อยสุดคือการต่อ string ด้วย += ใน loop เพราะทุกรอบต้องคัดลอกของเก่าทั้งหมด ทำให้กลายเป็น O(n²) ลองนับจำนวนตัวอักษรที่ถูกคัดลอกจริงดู" },
      {
        t: "codeout",
        lang: "python",
        label: "+= ใน loop เทียบกับ join()",
        code: `n = 20000
parts = [str(i % 10) for i in range(n)]

s = ""
copied = 0
for p in parts:
    copied += len(s)      # ทุกครั้งที่ += Python สร้าง string ใหม่ = คัดลอกของเก่าทั้งหมด
    s += p
print("แบบ  s += p  คัดลอกตัวอักษรรวม", copied, "ตัว")

joined = "".join(parts)   # join จองที่ครั้งเดียวแล้วคัดลอกรอบเดียว
print("แบบ  join()   คัดลอกตัวอักษรรวม", len(joined), "ตัว")
print("ผลลัพธ์เหมือนกันไหม:", s == joined)`,
        out: `แบบ  s += p  คัดลอกตัวอักษรรวม 199990000 ตัว
แบบ  join()   คัดลอกตัวอักษรรวม 20000 ตัว
ผลลัพธ์เหมือนกันไหม: True`,
      },
      { t: "callout", title: "กฎเหล็กข้อแรกของหมวดนี้", c: "อยากสร้าง string จากหลายชิ้น → เก็บชิ้นส่วนไว้ใน list แล้วค่อย \"\".join(parts) ตอนท้ายเสมอ ห้ามต่อด้วย += ใน loop (ต่างกัน 20,000 กับ 200,000,000 อย่างที่เห็น)" },

      { t: "h2", c: "ตารางราคา operation ที่ต้องจำ" },
      {
        t: "table",
        head: ["operation", "ตัวอย่าง", "Big-O", "หมายเหตุ"],
        rows: [
          ["index / assign", "a[i] , a[i] = x", "O(1)", "ถูกที่สุด ใช้ได้เต็มที่"],
          ["append / pop ท้าย", "a.append(x) , a.pop()", "O(1)", "ท่ามาตรฐานของการสะสมผลลัพธ์"],
          ["insert หัว / pop หัว", "a.insert(0, x) , a.pop(0)", "O(n) ⚠️", "เลื่อนของทั้งแถว — เลี่ยง หรือใช้ deque"],
          ["slice", "a[i:j] , s[i:j]", "O(k)", "สร้างตัวใหม่ขนาด k ไม่ฟรี"],
          ["in (list)", "x in a", "O(n) ⚠️", "ถ้าต้องเช็คบ่อย เปลี่ยนไปใช้ set"],
          ["in (set / dict)", "x in st", "O(1)", "ทริกลด O(n²) → O(n) ที่ใช้บ่อยสุด"],
          ["len", "len(a) , len(s)", "O(1)", "เรียกในเงื่อนไข loop ได้ไม่ต้องกลัว"],
          ["สร้าง string ด้วย +=", "s += ch (ใน loop)", "O(n²) ❌", "ใช้ \"\".join(parts) แทน"],
          ["split / join", "s.split() , \" \".join(w)", "O(n)", "ของฟรีที่ควรใช้ให้เป็น"],
          ["sort", "a.sort()", "O(n log n)", "in-place ประหยัด memory กว่า sorted()"],
        ],
      },

      { t: "h2", c: "โมเดลความคิดสำหรับโจทย์หมวดนี้" },
      { t: "p", c: "โจทย์ array/string เกือบทั้งหมดวนอยู่กับสามคำถาม: (1) ต้องอ่านข้อมูลกี่รอบ (2) ต้องจำอะไรไว้ระหว่างเดิน (3) เขียนผลลัพธ์ลงที่ไหน ถ้าตอบสามข้อนี้ได้ โค้ดจะออกมาเอง" },
      {
        t: "table",
        head: ["สัญญาณในโจทย์", "เทคนิคที่ควรนึกถึง", "ตัวอย่างข้อ"],
        rows: [
          ["เดินทีละตัว สะสมคำตอบเป็น string", "list สะสมชิ้นส่วน + join", "LC1768 Merge Strings Alternately"],
          ["สลับ / กลับด้าน / จับหัวกับท้าย", "two pointers จากปลายเข้าหากัน", "LC345 Reverse Vowels"],
          ["แก้ของใน array เดิม ห้ามใช้ที่เพิ่ม", "read pointer + write pointer", "LC443 String Compression"],
          ["ต้องรู้ผลรวม/ผลคูณของทุกตัว \"ยกเว้นตัวเอง\"", "prefix + suffix สองรอบ", "LC238 Product of Array Except Self"],
          ["เจอที่ทำได้ก็ทำเลย ไม่ต้องคิดไกล", "greedy พร้อมพิสูจน์ว่าไม่เสียโอกาส", "LC605 Can Place Flowers"],
          ["จำแค่ค่าที่ดีสุด 1–2 ค่าก็พอ", "running min / running max", "LC334 Increasing Triplet, LC1431 Kids With Candies"],
          ["โครงสร้างซ้ำเป็นบล็อก ๆ", "คณิตศาสตร์ช่วย (gcd, mod)", "LC1071 GCD of Strings"],
          ["ตัดคำ / จัดการช่องว่าง", "split() แล้วประกอบใหม่", "LC151 Reverse Words in a String"],
        ],
      },

      { t: "h2", c: "กับดักที่เจอบ่อย" },
      {
        t: "ul",
        c: [
          "ต่อ string ด้วย += ใน loop → O(n²) ให้ใช้ list + join",
          "เรียก max(), min(), sum() หรือ x in list ซ้ำ ๆ ข้างใน loop → เผลอเป็น O(n²) โดยไม่รู้ตัว ให้คำนวณครั้งเดียวเก็บไว้ในตัวแปร",
          "ลบของออกจาก list ระหว่างที่ยัง iterate อยู่ → index เพี้ยน ข้ามตัว ให้สร้าง list ใหม่หรือใช้ write pointer",
          "อ่าน a[i + 1] หรือ a[i - 1] โดยไม่เช็คขอบ → IndexError ให้เช็ค i == 0 หรือ i == len(a) - 1 ก่อนเสมอ (จะเจอในข้อ 4)",
          "ลืมว่า Python รับ index ลบได้ (a[-1] คือตัวท้าย) — บางทีมันช่วย บางทีมันซ่อน bug ไว้เพราะไม่ error ให้เห็น",
          "คิดว่า s[i] = c ทำได้เหมือน list → TypeError เพราะ string เป็น immutable",
        ],
      },
      { t: "callout", title: "พร้อมแล้วไปต่อ", c: "หมวดนี้มี 9 ข้อ เริ่มจาก Merge Strings Alternately (ฝึกจับจังหวะการ iterate สองตัวพร้อมกัน) ไปจนถึง String Compression (แก้ในที่เดิมด้วย read/write pointer) กดถัดไปเลย" },
    ],
  },

  "lc75-p01": {
    slug: "lc75-p01",
    title: "ข้อ 1 · LC1768 Merge Strings Alternately 🟢",
    lead: "หยิบตัวอักษรจากสองสตริงสลับกันทีละตัว ฝึก iterate ด้วย index พร้อมเช็ค boundary (ขอบเขต)",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "ให้ string (สตริง) word1 และ word2 จง merge (รวม) สองตัวเข้าด้วยกันโดยหยิบตัวอักษรสลับกันทีละตัว เริ่มจาก word1 ถ้าฝั่งใดหมดก่อน ให้เอาส่วนที่เหลือของฝั่งที่ยาวกว่าไปต่อท้าย แล้ว return string ที่ได้" },
      {
        t: "example",
        c: [
          {
            input: 'word1 = "abc", word2 = "pqr"',
            output: '"apbqcr"',
            explain: "a-p, b-q, c-r สลับกันพอดีเพราะยาวเท่ากัน",
          },
          {
            input: 'word1 = "ab", word2 = "pqrs"',
            output: '"apbqrs"',
            explain: "สลับได้ 2 คู่ (a-p, b-q) แล้ว word1 หมด จึงเอา \"rs\" ที่เหลือของ word2 ไปต่อท้าย",
          },
          {
            input: 'word1 = "abcd", word2 = "pq"',
            output: '"apbqcd"',
            explain: "สลับได้ 2 คู่ แล้ว word2 หมด จึงเอา \"cd\" ที่เหลือของ word1 ไปต่อท้าย",
          },
          {
            input: 'word1 = "a", word2 = ""',
            output: '"a"',
            explain: "ฝั่งหนึ่งว่างเลย — โค้ดต้องไม่พังและต้องคืนอีกฝั่งทั้งก้อน",
          },
        ],
      },
      {
        t: "constraints",
        c: [
          "1 <= word1.length, word2.length <= 100",
          "word1 และ word2 เป็นตัวอักษรอังกฤษพิมพ์เล็ก",
          "n เล็กมาก (100) → วิธีไหนก็ผ่าน แต่ให้ฝึกเขียนแบบ O(n) ให้ติดมือ",
        ],
      },
      { t: "callout", title: "โจทย์นี้ถามอะไรจริง ๆ", c: "มันคือการฝึก \"เดินสองตัวพร้อมกันแล้วจัดการตอนที่ความยาวไม่เท่ากัน\" — ตรรกะหลักง่าย แต่จุดที่คนพลาดคือส่วนหางที่เหลือ (leftover) ของฝั่งที่ยาวกว่า" },

      { t: "h2", c: "ลองเองก่อน 10–15 นาที" },
      {
        t: "code",
        lang: "python",
        c: `def merge_alternately(word1: str, word2: str) -> str:
    # เขียนโค้ดของคุณที่นี่
    pass


print(merge_alternately("abc", "pqr"))    # ควรได้ apbqcr
print(merge_alternately("ab", "pqrs"))    # ควรได้ apbqrs
print(merge_alternately("abcd", "pq"))    # ควรได้ apbqcd`,
      },
      {
        t: "hints",
        c: [
          {
            title: "💡 ใบ้ขั้น 1 — ตั้งคำถามให้ตัวเองก่อน",
            c: [
              {
                t: "ol",
                c: [
                  "ถ้าสอง word ยาวเท่ากัน คุณจะวน loop ถึงเท่าไร — และถ้ายาวไม่เท่ากัน loop นั้นควรหยุดที่ความยาวของฝั่งไหน?",
                  "หลัง loop หยุด ยังมีตัวอักษรค้างอยู่ฝั่งใดฝั่งหนึ่งไหม แล้วคุณจะรู้ได้ยังไงว่าค้างที่ตำแหน่งไหน?",
                  "คุณจะประกอบคำตอบด้วยอะไร — ต่อ string ด้วย += ทุกรอบ หรือเก็บชิ้นส่วนไว้ก่อน? (ย้อนไปดูหน้าแนวคิดของหมวดนี้)",
                ],
              },
            ],
          },
          {
            title: "💡 ใบ้ขั้น 2 — เทคนิคที่ต้องใช้ และใช้ทำไม",
            c: [
              { t: "p", c: "ใช้ two pointers ที่เดินไปพร้อมกัน (i บน word1, j บน word2) แล้วสะสมผลลัพธ์ลง list และ join ตอนท้าย" },
              { t: "p", c: "เคล็ดที่ทำให้โค้ดสั้นลงมาก: หลังจาก loop หลักจบ ให้ append เศษที่เหลือด้วย slice word1[i:] และ word2[j:] ทั้งสองอันเลย ไม่ต้องเขียน if ว่าฝั่งไหนยาวกว่า เพราะฝั่งที่หมดแล้วจะให้ slice ว่าง (\"\") ซึ่งต่อเข้าไปก็ไม่มีผล" },
              { t: "callout", title: "อย่าทำสิ่งนี้", c: "อย่าวน loop ถึง max(len(word1), len(word2)) แล้วค่อยเช็คขอบข้างใน — โค้ดจะรกและเสี่ยง IndexError และอย่าสร้างคำตอบด้วย result += ch เพราะเป็น O(n²)" },
            ],
          },
          {
            title: "💡 ใบ้ขั้น 3 — โครงโค้ด (pseudocode) มีช่องว่างให้เติม",
            c: [
              {
                t: "code",
                lang: "python",
                c: `parts = []
i, j = 0, 0
while ______ and ______:      # (1) เงื่อนไขว่ายังมีของทั้งสองฝั่ง
    parts.append(______)      # (2) ตัวจาก word1
    parts.append(______)      # (3) ตัวจาก word2
    i += 1
    j += 1
parts.append(______)          # (4) เศษที่เหลือของ word1
parts.append(______)          # (5) เศษที่เหลือของ word2
return "".join(parts)`,
              },
              { t: "p", c: "ช่อง (4) และ (5) ให้ใช้ slice ไม่ใช่ loop — และไม่ต้องมี if เลย ลองคิดว่าทำไมมันปลอดภัย" },
            ],
          },
        ],
      },

      { t: "h2", c: "ไล่ทีละสเต็ปด้วยมือ (dry run)" },
      { t: "p", c: "ไล่ Example 2: word1 = \"ab\", word2 = \"pqrs\"" },
      {
        t: "table",
        head: ["รอบ", "i", "j", "เงื่อนไข while", "append อะไร", "parts หลังรอบ"],
        rows: [
          ["1", "0", "0", "0<2 และ 0<4 → จริง", "\"a\", \"p\"", "['a', 'p']"],
          ["2", "1", "1", "1<2 และ 1<4 → จริง", "\"b\", \"q\"", "['a', 'p', 'b', 'q']"],
          ["—", "2", "2", "2<2 → เท็จ ออกจาก loop", "—", "['a', 'p', 'b', 'q']"],
          ["หลัง loop", "2", "2", "—", "word1[2:] = \"\" (ว่าง)", "['a', 'p', 'b', 'q', '']"],
          ["หลัง loop", "2", "2", "—", "word2[2:] = \"rs\"", "['a', 'p', 'b', 'q', '', 'rs']"],
        ],
      },
      { t: "p", c: "join ได้ \"apbqrs\" ตรงกับ Example 2 — สังเกตว่าการ append string ว่างไม่ทำให้ผลเปลี่ยน จึงไม่ต้องเขียน if แยก" },

      {
        t: "solution",
        summary: "🔓 เปิดเฉลยเต็ม (ลองเองก่อนนะ)",
        c: [
          { t: "p", c: "ไอเดียหนึ่งบรรทัด: เดินคู่กันจนฝั่งใดฝั่งหนึ่งหมด แล้วต่อเศษของทั้งสองฝั่งเข้าไป (ฝั่งที่หมดจะให้ค่าว่างเอง)" },
          {
            t: "codeout",
            lang: "python",
            label: "เฉลย (Python)",
            code: `def merge_alternately(word1: str, word2: str) -> str:
    parts = []                                # (1) เก็บชิ้นส่วนไว้ join ทีเดียว
    i, j = 0, 0                               # (2) ตัวชี้ของแต่ละ word
    while i < len(word1) and j < len(word2):  # (3) ยังมีตัวอักษรทั้งสองฝั่ง
        parts.append(word1[i])
        parts.append(word2[j])
        i += 1
        j += 1
    parts.append(word1[i:])                   # (4) เศษที่เหลือของ word1 (อาจว่าง)
    parts.append(word2[j:])                   # (5) เศษที่เหลือของ word2 (อาจว่าง)
    return "".join(parts)                     # (6) รวมทีเดียว O(n)


print(merge_alternately("abc", "pqr"))
print(merge_alternately("ab", "pqrs"))
print(merge_alternately("abcd", "pq"))
print(merge_alternately("a", ""))`,
            out: `apbqcr
apbqrs
apbqcd
a`,
          },
          {
            t: "table",
            head: ["บรรทัด", "โค้ด", "ทำอะไร / ทำไมต้องมี"],
            rows: [
              ["(1)", "parts = []", "เก็บชิ้นส่วนไว้ก่อน เพราะ append เป็น O(1) แล้ว join ทีเดียวเป็น O(n) — ถ้าต่อ string ด้วย += ตรง ๆ จะกลายเป็น O(n²)"],
              ["(2)", "i, j = 0, 0", "ตัวชี้แยกกันของแต่ละ word เพราะสองฝั่งอาจยาวไม่เท่ากัน จะใช้ index ตัวเดียวร่วมกันได้เฉพาะช่วงที่ยังไม่มีฝั่งไหนหมด"],
              ["(3)", "while i < len(word1) and j < len(word2)", "หยุดทันทีที่ฝั่งใดฝั่งหนึ่งหมด → ไม่มีทาง IndexError ในบรรทัดข้างใน"],
              ["(4)(5)", "parts.append(word1[i:]) และ word2[j:]", "ต่อเศษของทั้งสองฝั่งโดยไม่ต้องเช็คว่าใครยาวกว่า เพราะฝั่งที่หมดแล้ว slice จะได้ \"\" ซึ่งต่อเข้าไปไม่มีผล — เทคนิคนี้ตัด if ทิ้งได้ทั้งก้อน"],
              ["(6)", "\"\".join(parts)", "ประกอบครั้งเดียว O(n) นี่คือท่ามาตรฐานของการสร้าง string ใน Python"],
            ],
          },
          { t: "p", c: "ทำไมมันถูกต้อง: invariant (ข้อเท็จจริงที่จริงเสมอ) ของ loop คือ \"parts เก็บผลลัพธ์ของ word1[:i] สลับกับ word2[:j] ครบถูกต้องแล้ว และ i == j ตลอดเวลา\" เมื่อออกจาก loop เราจึงเหลือแค่หางที่ยังไม่ได้ใช้ของแต่ละฝั่ง ซึ่งตามกติกาต้องต่อท้ายตามลำดับเดิม" },
          {
            t: "table",
            head: ["วิธี", "Time", "Space", "หมายเหตุ"],
            rows: [
              ["result += ch ใน loop", "O(n²) ❌", "O(n)", "แต่ละครั้งคัดลอก string เก่าทั้งก้อน"],
              ["วน loop ถึง max แล้วเช็คขอบข้างใน", "O(n) ✅", "O(n)", "ถูก แต่ if เยอะ อ่านยาก พลาดง่าย"],
              ["two pointers + join (เฉลยนี้)", "O(n) ✅", "O(n) ✅", "n = len(word1) + len(word2) — space เป็นขนาดคำตอบซึ่งเลี่ยงไม่ได้"],
            ],
          },
          {
            t: "details",
            summary: "เวอร์ชันสั้นด้วย zip_longest (รู้ไว้เท่ ๆ)",
            c: [
              {
                t: "codeout",
                lang: "python",
                label: "แบบ one-liner",
                code: `from itertools import zip_longest


def merge_alternately_short(word1: str, word2: str) -> str:
    # zip_longest จับคู่ให้ครบตัวที่ยาวกว่า โดยเติม "" ให้ฝั่งที่หมดแล้ว
    return "".join(a + b for a, b in zip_longest(word1, word2, fillvalue=""))


print(merge_alternately_short("abc", "pqr"))
print(merge_alternately_short("ab", "pqrs"))
print(merge_alternately_short("abcd", "pq"))`,
                out: `apbqcr
apbqrs
apbqcd`,
              },
              { t: "p", c: "สั้นและถูก แต่เวลาสัมภาษณ์ควรเขียนแบบ two pointers ให้เห็นก่อน เพราะ interviewer ต้องการดูว่าเราจัดการ boundary เองได้ ไม่ใช่แค่รู้ชื่อ library" },
            ],
          },
        ],
      },

      { t: "callout", title: "💡 สรุป pattern", c: "เดินสอง sequence พร้อมกัน: วน while จนฝั่งใดฝั่งหนึ่งหมด แล้วจัดการหางที่เหลือด้วย slice — และสะสมผลลัพธ์ลง list เสมอ แล้ว join ทีเดียวตอนท้าย" },
      { t: "callout", title: "ต่อยอด (โจทย์พี่น้องกัน)", c: "LC21 Merge Two Sorted Lists (โครงเดียวกันแต่บน linked list), LC88 Merge Sorted Array, LC2264 ล้วนฝึกจังหวะเดินคู่กันทั้งนั้น" },
    ],
  },

  "lc75-p02": {
    slug: "lc75-p02",
    title: "ข้อ 2 · LC1071 Greatest Common Divisor of Strings 🟡",
    lead: "หา string block ที่ยาวที่สุดที่นำมา concat ซ้ำ ๆ แล้วได้ทั้งสองสตริง ด้วยทริก gcd (ห.ร.ม.)",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "นิยามก่อน: เราบอกว่า string t หาร (divide) string s ได้ ถ้า s เกิดจากการนำ t มา concat (ต่อ) ซ้ำ ๆ ตั้งแต่ 1 ครั้งขึ้นไป เช่น t = \"ab\" หาร s = \"ababab\" ได้ (ต่อ 3 ครั้ง)" },
      { t: "p", c: "โจทย์: ให้ str1 และ str2 จงหา string x ที่ ยาวที่สุด ที่หารได้ทั้ง str1 และ str2 ถ้าไม่มีเลยให้ return \"\"" },
      {
        t: "example",
        c: [
          {
            input: 'str1 = "ABCABC", str2 = "ABC"',
            output: '"ABC"',
            explain: "\"ABC\" ต่อ 2 ครั้งได้ str1 และต่อ 1 ครั้งได้ str2",
          },
          {
            input: 'str1 = "ABABAB", str2 = "ABAB"',
            output: '"AB"',
            explain: "\"AB\" ต่อ 3 ครั้งได้ str1 และต่อ 2 ครั้งได้ str2 — สังเกตว่าคำตอบสั้นกว่าทั้งสองตัว",
          },
          {
            input: 'str1 = "LEET", str2 = "CODE"',
            output: '""',
            explain: "ไม่มี block ร่วมกันเลย ต้องคืน string ว่าง",
          },
          {
            input: 'str1 = "ABABABAB", str2 = "ABAB"',
            output: '"ABAB"',
            explain: "ยาวที่สุดคือ \"ABAB\" ไม่ใช่ \"AB\" เพราะโจทย์ขอตัวที่ยาวที่สุด",
          },
        ],
      },
      {
        t: "constraints",
        c: [
          "1 <= str1.length, str2.length <= 1000",
          "str1 และ str2 เป็นตัวอักษรอังกฤษพิมพ์ใหญ่",
          "n = 1000 → O(n²) ยังผ่าน แต่มีวิธี O(n) ที่สวยกว่ามาก",
        ],
      },
      { t: "callout", title: "โจทย์นี้ถามอะไรจริง ๆ", c: "มันคือ gcd (ห.ร.ม.) ในรูปแบบ string — เหมือนหา ห.ร.ม. ของ 6 กับ 3 ได้ 3 แต่เปลี่ยนจาก \"จำนวน\" เป็น \"บล็อกตัวอักษร\" ถ้าเห็นความเชื่อมโยงนี้ โจทย์จะเหลือ 3 บรรทัด" },

      { t: "h2", c: "ลองเองก่อน 10–15 นาที" },
      {
        t: "code",
        lang: "python",
        c: `def gcd_of_strings(str1: str, str2: str) -> str:
    # เขียนโค้ดของคุณที่นี่
    pass


print(gcd_of_strings("ABCABC", "ABC"))    # ควรได้ ABC
print(gcd_of_strings("ABABAB", "ABAB"))   # ควรได้ AB
print(gcd_of_strings("LEET", "CODE"))     # ควรได้ "" (ว่าง)`,
      },
      {
        t: "hints",
        c: [
          {
            title: "💡 ใบ้ขั้น 1 — ตั้งคำถามให้ตัวเองก่อน",
            c: [
              {
                t: "ol",
                c: [
                  "ถ้า x หารได้ทั้งสองตัว ความยาวของ x ต้องหารความยาวของ str1 ลงตัว และหารความยาวของ str2 ลงตัวด้วยใช่ไหม — แล้ว x ที่ยาวที่สุดควรยาวเท่าไร?",
                  "คำตอบ x จะต้องเป็นตัวอักษร k ตัวแรกของ str1 เสมอ (ทำไม?) — ลองนึกว่า str1 คือ x ต่อกันหลายรอบ",
                  "สมมติ x หารได้ทั้งคู่ แล้ว str1 + str2 กับ str2 + str1 จะเหมือนกันไหม? (ทั้งสองก็คือ x ต่อกัน m + n รอบ)",
                  "แล้วถ้า str1 + str2 == str2 + str1 จะรับประกันได้ไหมว่ามี x อยู่จริง?",
                ],
              },
              { t: "p", c: "ข้อ 3 กับ 4 คือหัวใจ — มันคือเงื่อนไข \"มีคำตอบหรือไม่\" ที่เช็คได้ในบรรทัดเดียว" },
            ],
          },
          {
            title: "💡 ใบ้ขั้น 2 — เทคนิคที่ต้องใช้ และใช้ทำไม",
            c: [
              { t: "p", c: "ใช้ math.gcd คู่กับทริกเช็คด้วยการ concat สลับข้าง" },
              {
                t: "ul",
                c: [
                  "ขั้นที่ 1 — เช็คว่ามีคำตอบไหม: str1 + str2 == str2 + str1 ถ้าไม่เท่ากันแปลว่าไม่มีบล็อกร่วมเลย return \"\"",
                  "ขั้นที่ 2 — ความยาวของคำตอบคือ gcd(len(str1), len(str2))",
                  "ขั้นที่ 3 — คำตอบคือ str1[:k]",
                ],
              },
              { t: "p", c: "ทำไมทริกข้อ 1 ใช้ได้: ถ้ามีบล็อก x ที่หารได้ทั้งคู่ แปลว่า str1 คือ x ต่อกัน m รอบ และ str2 คือ x ต่อกัน n รอบ ดังนั้น str1 + str2 = x ต่อกัน (m+n) รอบ = str2 + str1 (ทิศทางย้อนกลับก็เป็นจริงและพิสูจน์ได้ แต่ในการสัมภาษณ์แค่อธิบายทิศนี้พร้อมบอกว่าเป็นทฤษฎีที่รู้จักกันดีก็เพียงพอ)" },
              { t: "callout", title: "อย่าทำสิ่งนี้", c: "อย่าไปลองทุก prefix ความยาว 1 ถึง len แล้วเช็คทีละอัน (O(n²)) และที่แย่กว่านั้นคืออย่าเดาว่าคำตอบคือ string ที่สั้นกว่าเสมอ — Example 2 หักล้างข้อนี้ (ตัวที่สั้นกว่าคือ \"ABAB\" แต่คำตอบคือ \"AB\")" },
            ],
          },
          {
            title: "💡 ใบ้ขั้น 3 — โครงโค้ด (pseudocode) มีช่องว่างให้เติม",
            c: [
              {
                t: "code",
                lang: "python",
                c: `from math import gcd

if ______ != ______:        # (1) เงื่อนไขว่า "ไม่มีคำตอบ"
    return ""
k = gcd(______, ______)     # (2) ความยาวของคำตอบ
return ______               # (3) ตัดมา k ตัวแรกจากตัวไหนก็ได้`,
              },
              { t: "p", c: "ระวัง: ช่อง (2) เป็น gcd ของ ความยาว ไม่ใช่ gcd ของ string เอง และช่อง (3) ตัดจาก str1 หรือ str2 ก็ได้ผลเดียวกัน (ลองคิดว่าทำไม)" },
            ],
          },
        ],
      },

      { t: "h2", c: "ไล่ทีละสเต็ปด้วยมือ (dry run)" },
      {
        t: "table",
        head: ["str1", "str2", "str1+str2", "str2+str1", "เท่ากัน?", "gcd ความยาว", "คำตอบ"],
        rows: [
          ["\"ABCABC\"", "\"ABC\"", "ABCABCABC", "ABCABCABC", "เท่า ✅", "gcd(6,3) = 3", "\"ABC\""],
          ["\"ABABAB\"", "\"ABAB\"", "ABABABABAB", "ABABABABAB", "เท่า ✅", "gcd(6,4) = 2", "\"AB\""],
          ["\"LEET\"", "\"CODE\"", "LEETCODE", "CODELEET", "ไม่เท่า ❌", "—", "\"\""],
          ["\"ABABABAB\"", "\"ABAB\"", "ABABABABABAB", "ABABABABABAB", "เท่า ✅", "gcd(8,4) = 4", "\"ABAB\""],
        ],
      },
      { t: "p", c: "ทุกแถวตรงกับ examples ข้างบน — สังเกตแถวที่ 2 ได้ \"AB\" ไม่ใช่ \"ABAB\" เพราะ gcd(6,4) = 2 ไม่ใช่ 4" },

      {
        t: "solution",
        summary: "🔓 เปิดเฉลยเต็ม (ลองเองก่อนนะ)",
        c: [
          { t: "p", c: "ไอเดียหนึ่งบรรทัด: ถ้า str1 + str2 == str2 + str1 แปลว่ามีบล็อกร่วมอยู่จริง และความยาวของบล็อกที่ยาวสุดคือ gcd ของสองความยาว" },
          {
            t: "codeout",
            lang: "python",
            label: "เฉลย (Python)",
            code: `from math import gcd


def gcd_of_strings(str1: str, str2: str) -> str:
    if str1 + str2 != str2 + str1:    # (1) ถ้าต่อสลับกันไม่เท่ากัน = ไม่มีตัวหารร่วมเลย
        return ""
    k = gcd(len(str1), len(str2))     # (2) ความยาวของคำตอบคือ gcd ของสองความยาว
    return str1[:k]                   # (3) ตัดมา k ตัวแรก


print(gcd_of_strings("ABCABC", "ABC"))
print(gcd_of_strings("ABABAB", "ABAB"))
print(repr(gcd_of_strings("LEET", "CODE")))
print(gcd_of_strings("ABABABAB", "ABAB"))`,
            out: `ABC
AB
''
ABAB`,
          },
          {
            t: "table",
            head: ["บรรทัด", "โค้ด", "ทำอะไร / ทำไมต้องมี"],
            rows: [
              ["(1)", "if str1 + str2 != str2 + str1", "ประตูด่านแรก — ถ้ามีบล็อก x จริง ทั้งสองฝั่งคือ x ต่อกัน (m+n) รอบ จึงต้องเท่ากันเป๊ะ ถ้าไม่เท่าก็จบเลยไม่ต้องคิดต่อ"],
              ["(2)", "k = gcd(len(str1), len(str2))", "ความยาวของ x ต้องหารทั้งสองความยาวลงตัว ตัวที่ยาวที่สุดที่ทำได้คือ ห.ร.ม. — ตรงนี้คือที่มาของชื่อโจทย์"],
              ["(3)", "return str1[:k]", "เพราะ str1 คือ x ต่อกันหลายรอบ ตัวอักษร k ตัวแรกของมันจึงเป็น x พอดี (ตัดจาก str2 ก็ได้ผลเดียวกัน เพราะสองตัวขึ้นต้นด้วย x เหมือนกัน)"],
            ],
          },
          { t: "p", c: "ทำไม gcd คือคำตอบ: เซตของความยาวที่ \"หารได้ทั้งคู่\" คือเซตของตัวหารร่วมของ len(str1) และ len(str2) ซึ่งตัวที่ใหญ่ที่สุดคือ ห.ร.ม. ตามนิยาม ส่วนเงื่อนไข concat สลับข้างรับประกันว่าเนื้อหาตัวอักษรสอดคล้องกันจริง ไม่ใช่แค่ความยาวลงตัว (เช่น \"AB\" กับ \"BA\" ความยาวลงตัวแต่ concat สลับข้างไม่เท่ากัน จึงไม่มีคำตอบ)" },
          {
            t: "table",
            head: ["วิธี", "Time", "Space", "หมายเหตุ"],
            rows: [
              ["ลองทุก prefix แล้วเช็คว่าหารได้ไหม", "O(n²)", "O(n)", "ถูกแต่ยาวและช้ากว่า"],
              ["gcd + concat check (เฉลยนี้)", "O(n) ✅", "O(n)", "n = len(str1) + len(str2) — space มาจากการสร้าง string ที่ต่อกันเพื่อเทียบ"],
            ],
          },
          {
            t: "details",
            summary: "ถ้าไม่ใช้ทริก concat — เวอร์ชันตรงไปตรงมา",
            c: [
              {
                t: "codeout",
                lang: "python",
                label: "เช็คด้วยการต่อบล็อกจริง",
                code: `from math import gcd


def divides(block: str, s: str) -> bool:
    # block หาร s ได้ไหม: ต่อ block ให้ยาวเท่า s แล้วเทียบ
    return len(s) % len(block) == 0 and block * (len(s) // len(block)) == s


def gcd_of_strings_v2(str1: str, str2: str) -> str:
    k = gcd(len(str1), len(str2))
    cand = str1[:k]
    if divides(cand, str1) and divides(cand, str2):
        return cand
    return ""


print(gcd_of_strings_v2("ABCABC", "ABC"))
print(gcd_of_strings_v2("ABABAB", "ABAB"))
print(repr(gcd_of_strings_v2("LEET", "CODE")))
print(repr(gcd_of_strings_v2("ABCDEF", "ABC")))`,
                out: `ABC
AB
''
''`,
              },
              { t: "p", c: "วิธีนี้ไม่ต้องรู้ทฤษฎี concat สลับข้าง — แค่เอา candidate ความยาว gcd มาลองต่อดูตรง ๆ ว่าประกอบกลับได้ทั้งสองตัวไหม เป็นวิธีที่อธิบายให้ interviewer เข้าใจง่ายที่สุด" },
            ],
          },
        ],
      },

      { t: "callout", title: "💡 สรุป pattern", c: "เจอโจทย์ที่มี \"โครงสร้างซ้ำเป็นบล็อก\" ให้นึกถึงคณิตศาสตร์เรื่องตัวหาร (gcd / mod) ก่อนจะไปไล่ลองทุกกรณี — บ่อยครั้งมันเปลี่ยน O(n²) เป็น O(n) ทันที" },
      { t: "callout", title: "ต่อยอด (โจทย์พี่น้องกัน)", c: "LC459 Repeated Substring Pattern (ทริก concat คล้ายกันมาก), LC796 Rotate String, LC1668 Maximum Repeating Substring" },
    ],
  },

  "lc75-p03": {
    slug: "lc75-p03",
    title: "ข้อ 3 · LC1431 Kids With the Greatest Number of Candies 🟢",
    lead: "หา max ครั้งเดียวแล้ว compare ทีละคน ฝึกกันพลาดหา max ซ้ำในลูป",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "ให้ array (ลิสต์) candies โดย candies[i] คือจำนวนลูกอมของเด็กคนที่ i และมีลูกอมพิเศษอีก extraCandies เม็ด จง return array ของ boolean (จริง/เท็จ) โดยตำแหน่งที่ i เป็น true ถ้าเด็กคนนั้นได้ลูกอมพิเศษ ทั้งหมด แล้วจะมีลูกอม มากที่สุด หรือ เท่ากับ คนที่มากที่สุด" },
      { t: "p", c: "จุดสำคัญ: ลูกอมพิเศษก้อนเดียวกันนี้ถูก \"ยกให้ลอง\" กับเด็กทุกคนแยกกัน ไม่ใช่แบ่งกัน — แต่ละคำถามเป็นอิสระต่อกัน" },
      {
        t: "example",
        c: [
          {
            input: "candies = [2,3,5,1,3], extraCandies = 3",
            output: "[true,true,true,false,true]",
            explain: "มากสุดเดิมคือ 5\nเด็กคนที่ 1: 2+3 = 5 เท่ากับ 5 → true\nเด็กคนที่ 4: 1+3 = 4 < 5 → false",
          },
          {
            input: "candies = [4,2,1,1,2], extraCandies = 1",
            output: "[true,false,false,false,false]",
            explain: "มากสุดคือ 4 มีแค่เด็กคนแรกที่ถึง (4+1 = 5)",
          },
          {
            input: "candies = [12,1,12], extraCandies = 10",
            output: "[true,false,true]",
            explain: "มีคนได้ max เท่ากันสองคน — ทั้งคู่ต้องเป็น true เพราะเงื่อนไขคือ \"มากสุดหรือเท่ากับมากสุด\"",
          },
        ],
      },
      {
        t: "constraints",
        c: [
          "n == candies.length",
          "2 <= n <= 100",
          "1 <= candies[i] <= 100",
          "1 <= extraCandies <= 50",
          "n เล็ก แต่โจทย์นี้คือแบบฝึกหัดเรื่อง \"อย่าคำนวณของเดิมซ้ำใน loop\" ให้ทำเป็น O(n) ให้ติดนิสัย",
        ],
      },
      { t: "callout", title: "โจทย์นี้ถามอะไรจริง ๆ", c: "เทียบทุกคนกับ \"ค่ามากสุดของ array เดิม\" ค่าเดียว — ค่านั้นคงที่ ไม่เปลี่ยนตามคนที่กำลังพิจารณา ดังนั้นหามันครั้งเดียวก่อนเข้า loop" },

      { t: "h2", c: "ลองเองก่อน 10–15 นาที" },
      {
        t: "code",
        lang: "python",
        c: `def kids_with_candies(candies: list[int], extra_candies: int) -> list[bool]:
    # เขียนโค้ดของคุณที่นี่
    pass


print(kids_with_candies([2, 3, 5, 1, 3], 3))   # ควรได้ [True, True, True, False, True]
print(kids_with_candies([4, 2, 1, 1, 2], 1))   # ควรได้ [True, False, False, False, False]
print(kids_with_candies([12, 1, 12], 10))      # ควรได้ [True, False, True]`,
      },
      {
        t: "hints",
        c: [
          {
            title: "💡 ใบ้ขั้น 1 — ตั้งคำถามให้ตัวเองก่อน",
            c: [
              {
                t: "ol",
                c: [
                  "ค่าที่คุณต้องเอาไปเทียบกับเด็กทุกคน คือค่าอะไร และมันเปลี่ยนไหมระหว่างที่ไล่เด็กแต่ละคน?",
                  "ถ้าคำตอบคือ \"ไม่เปลี่ยน\" แล้วการเรียก max(candies) ไว้ข้างใน loop จะทำงานกี่ครั้ง คิดเป็น Big-O เท่าไร?",
                  "เงื่อนไขในโจทย์คือ \"มากที่สุด\" หรือ \"มากที่สุดหรือเท่ากับ\" — ต้องใช้ > หรือ >= ?",
                ],
              },
            ],
          },
          {
            title: "💡 ใบ้ขั้น 2 — เทคนิคที่ต้องใช้ และใช้ทำไม",
            c: [
              { t: "p", c: "เทคนิคชื่อว่า pre-computation (คำนวณล่วงหน้า) — หาค่าที่ใช้ซ้ำครั้งเดียว เก็บไว้ในตัวแปร แล้วค่อยเข้า loop" },
              { t: "p", c: "หา best = max(candies) หนึ่งครั้ง (O(n)) แล้วไล่เทียบทุกคนอีกรอบ (O(n)) รวมเป็น O(n) และเขียนสั้น ๆ ได้ด้วย list comprehension" },
              { t: "callout", title: "อย่าทำสิ่งนี้", c: "อย่าเขียน [c + extra >= max(candies) for c in candies] — มันดูสวยแต่เรียก max ใหม่ทุกรอบ กลายเป็น O(n²) นี่คือกับดักที่โจทย์ข้อนี้ตั้งใจสอน และเป็นสาเหตุของ TLE ในโจทย์ที่ n ใหญ่จริง" },
            ],
          },
          {
            title: "💡 ใบ้ขั้น 3 — โครงโค้ด (pseudocode) มีช่องว่างให้เติม",
            c: [
              {
                t: "code",
                lang: "python",
                c: `best = ______                       # (1) คำนวณครั้งเดียว "ก่อน" เข้า loop
result = []
for c in candies:
    result.append(______ ______ best)   # (2) นิพจน์ + (3) ตัวเปรียบเทียบ (> หรือ >=)
return result

# เขียนย่อเป็นบรรทัดเดียวได้:
# return [______ for c in candies]`,
              },
              { t: "p", c: "ระวังช่อง (3): โจทย์บอก \"มากที่สุด หรือ เท่ากับคนที่มากที่สุด\" ถ้าใช้ > จะได้ false ในกรณีที่เสมอ ซึ่งผิด (ดู Example 3)" },
            ],
          },
        ],
      },

      { t: "h2", c: "ไล่ทีละสเต็ปด้วยมือ (dry run)" },
      { t: "p", c: "ไล่ Example 1: candies = [2, 3, 5, 1, 3], extraCandies = 3 → best = 5 (คำนวณครั้งเดียวก่อนเข้า loop)" },
      {
        t: "table",
        head: ["i", "candies[i]", "c + 3", "เทียบ >= 5", "ผลลัพธ์", "result หลังรอบ"],
        rows: [
          ["0", "2", "5", "5 >= 5 จริง", "True", "[True]"],
          ["1", "3", "6", "6 >= 5 จริง", "True", "[True, True]"],
          ["2", "5", "8", "8 >= 5 จริง", "True", "[True, True, True]"],
          ["3", "1", "4", "4 >= 5 เท็จ", "False", "[True, True, True, False]"],
          ["4", "3", "6", "6 >= 5 จริง", "True", "[True, True, True, False, True]"],
        ],
      },
      { t: "p", c: "ตรงกับ Example 1 — และสังเกตว่า best = 5 ถูกใช้ซ้ำ 5 รอบโดยไม่ต้องคำนวณใหม่เลย" },

      {
        t: "solution",
        summary: "🔓 เปิดเฉลยเต็ม (ลองเองก่อนนะ)",
        c: [
          { t: "p", c: "ไอเดียหนึ่งบรรทัด: หา max ครั้งเดียวเก็บไว้ แล้วเทียบทุกคนด้วย >= (ต้องเป็น >= เพราะเสมอก็นับ)" },
          {
            t: "codeout",
            lang: "python",
            label: "เฉลย (Python)",
            code: `def kids_with_candies(candies: list[int], extra_candies: int) -> list[bool]:
    best = max(candies)                                   # (1) หาค่ามากสุดรอบเดียว
    return [c + extra_candies >= best for c in candies]    # (2) เทียบทุกคนกับ best


print(kids_with_candies([2, 3, 5, 1, 3], 3))
print(kids_with_candies([4, 2, 1, 1, 2], 1))
print(kids_with_candies([12, 1, 12], 10))`,
            out: `[True, True, True, False, True]
[True, False, False, False, False]
[True, False, True]`,
          },
          {
            t: "table",
            head: ["บรรทัด", "โค้ด", "ทำอะไร / ทำไมต้องมี"],
            rows: [
              ["(1)", "best = max(candies)", "หาค่ามากสุด \"ก่อน\" เข้า loop — O(n) ครั้งเดียว ค่านี้คือเกณฑ์คงที่ที่ทุกคนต้องเทียบด้วย ถ้าย้ายไปอยู่ข้างใน loop จะกลายเป็น O(n²) ทันที"],
              ["(2)", "[c + extra_candies >= best for c in candies]", "list comprehension สร้าง list ของ boolean ทีเดียว — ใช้ >= เพราะโจทย์นับกรณีเสมอด้วย และไม่ต้องมี if/else เพราะนิพจน์เปรียบเทียบให้ค่า True/False ออกมาตรง ๆ แล้ว"],
            ],
          },
          { t: "p", c: "ทำไมมันถูกต้อง: การให้ลูกอมพิเศษกับเด็กคนหนึ่ง ไม่ทำให้จำนวนของคนอื่นเปลี่ยน ดังนั้นเกณฑ์เปรียบเทียบ (ค่ามากสุดของ array เดิม) จึงคงที่ตลอด และเงื่อนไข \"มากสุดหรือเท่ากับมากสุด\" แปลตรงตัวเป็น c + extra >= best" },
          {
            t: "table",
            head: ["วิธี", "Time", "Space", "หมายเหตุ"],
            rows: [
              ["เรียก max() ข้างใน loop", "O(n²) ❌", "O(n)", "กับดักคลาสสิก — ดูสวยแต่ช้า"],
              ["nested loop เทียบกับทุกคน", "O(n²) ❌", "O(n)", "ไม่จำเป็นเลย"],
              ["pre-compute max (เฉลยนี้)", "O(n) ✅", "O(n) ✅", "space คือขนาดคำตอบ เลี่ยงไม่ได้"],
            ],
          },
          {
            t: "codeout",
            lang: "python",
            label: "พิสูจน์ว่ากับดัก O(n²) มีจริง — นับจำนวนครั้งที่อ่านข้อมูล",
            code: `def count_reads_bad(candies, extra):
    reads = 0
    out = []
    for c in candies:
        reads += len(candies)      # max() ข้างใน loop = อ่านทั้ง list ใหม่ทุกรอบ
        out.append(c + extra >= max(candies))
    return out, reads


def count_reads_good(candies, extra):
    reads = len(candies)           # max() ครั้งเดียว
    best = max(candies)
    out = []
    for c in candies:
        reads += 1                 # อ่านแค่ตัวเอง
        out.append(c + extra >= best)
    return out, reads


nums = list(range(1, 101))         # n = 100
bad_out, bad_reads = count_reads_bad(nums, 5)
good_out, good_reads = count_reads_good(nums, 5)
print("ผลลัพธ์เหมือนกันไหม:", bad_out == good_out)
print("แบบเรียก max ใน loop อ่านข้อมูล", bad_reads, "ครั้ง")
print("แบบ pre-compute      อ่านข้อมูล", good_reads, "ครั้ง")`,
            out: `ผลลัพธ์เหมือนกันไหม: True
แบบเรียก max ใน loop อ่านข้อมูล 10000 ครั้ง
แบบ pre-compute      อ่านข้อมูล 200 ครั้ง`,
          },
          { t: "p", c: "ผลลัพธ์เท่ากันแต่ทำงานต่างกัน 50 เท่าที่ n = 100 เท่านั้น — ถ้า n = 100,000 จะต่างกัน 50,000 เท่า นี่คือเหตุผลที่ต้องระวังการเรียกฟังก์ชันที่กิน O(n) ไว้ข้างใน loop" },
        ],
      },

      { t: "callout", title: "💡 สรุป pattern", c: "pre-computation: ถ้าค่าใดถูกใช้ซ้ำและไม่เปลี่ยนตามรอบของ loop ให้คำนวณไว้ก่อนเข้า loop เสมอ — ตรวจโค้ดตัวเองด้วยคำถาม \"บรรทัดนี้ข้างใน loop มันกิน O(1) จริงไหม\"" },
      { t: "callout", title: "ต่อยอด (โจทย์พี่น้องกัน)", c: "LC1 Two Sum (pre-compute ด้วย hashmap), LC121 Best Time to Buy and Sell Stock (running min), LC1470 Shuffle the Array" },
    ],
  },

  "lc75-p04": {
    slug: "lc75-p04",
    title: "ข้อ 4 · LC605 Can Place Flowers 🟡",
    lead: "greedy (โลภมาก) iterate ทีละช่อง เจอที่ปลูกได้ปลูกเลย พร้อมทริกจัดการ boundary (ขอบแปลง)",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "ให้ array (ลิสต์) flowerbed ที่แต่ละช่องเป็น 0 (แปลงว่าง) หรือ 1 (มีดอกไม้อยู่แล้ว) กติกาคือ ห้ามปลูกดอกไม้ในช่องที่ติดกัน จง return true ถ้าเราสามารถปลูกดอกไม้เพิ่มได้อีก n ดอกโดยไม่ผิดกติกา" },
      { t: "p", c: "รับประกันว่า flowerbed ที่ให้มาไม่ผิดกติกาอยู่แล้ว (ไม่มี 1 สองตัวติดกัน)" },
      {
        t: "example",
        c: [
          {
            input: "flowerbed = [1,0,0,0,1], n = 1",
            output: "true",
            explain: "ปลูกที่ index 2 ได้ (ซ้าย index 1 = 0, ขวา index 3 = 0) → เหลือ [1,0,1,0,1]",
          },
          {
            input: "flowerbed = [1,0,0,0,1], n = 2",
            output: "false",
            explain: "แปลงเดียวกันแต่ขอ 2 ดอก — ปลูกได้จริงแค่ 1 ดอก จึงไม่พอ",
          },
          {
            input: "flowerbed = [0], n = 1",
            output: "true",
            explain: "ช่องเดียวและไม่มีเพื่อนบ้านทั้งสองข้าง — ปลูกได้ นี่คือ edge case ที่คนพลาดบ่อยสุด",
          },
          {
            input: "flowerbed = [1,0,0,0,0,1], n = 2",
            output: "false",
            explain: "ช่องว่าง 4 ช่องติดกันแต่ขนาบด้วย 1 ทั้งสองข้าง — ปลูกได้แค่ 1 ดอก (index 2 หรือ 3) ไม่ใช่ 2",
          },
        ],
      },
      {
        t: "constraints",
        c: [
          "1 <= flowerbed.length <= 2 × 10^4",
          "flowerbed[i] เป็น 0 หรือ 1 เท่านั้น",
          "flowerbed ที่ให้มาไม่มี 1 สองตัวติดกัน",
          "0 <= n <= flowerbed.length",
          "n ถึง 2 × 10^4 → ต้องเป็น O(n) และควรจบได้ในการกวาดรอบเดียว",
        ],
      },
      { t: "callout", title: "โจทย์นี้ถามอะไรจริง ๆ", c: "ไม่ได้ถามว่า \"ปลูกได้มากสุดกี่ดอก\" แต่ถามแค่ \"ถึง n ไหม\" — ดังนั้นพอนับครบ n ก็ตอบ true ออกได้เลย ไม่ต้องกวาดต่อ และคำถามที่ยากจริงคือการจัดการช่องหัวและช่องท้ายที่ไม่มีเพื่อนบ้าน" },

      { t: "h2", c: "ลองเองก่อน 10–15 นาที" },
      {
        t: "code",
        lang: "python",
        c: `def can_place_flowers(flowerbed: list[int], n: int) -> bool:
    # เขียนโค้ดของคุณที่นี่
    pass


print(can_place_flowers([1, 0, 0, 0, 1], 1))   # ควรได้ True
print(can_place_flowers([1, 0, 0, 0, 1], 2))   # ควรได้ False
print(can_place_flowers([0], 1))               # ควรได้ True`,
      },
      {
        t: "hints",
        c: [
          {
            title: "💡 ใบ้ขั้น 1 — ตั้งคำถามให้ตัวเองก่อน",
            c: [
              {
                t: "ol",
                c: [
                  "ถ้าคุณกำลังยืนที่ช่อง i และมันเป็น 0 ต้องรู้อะไรเพิ่มอีกกี่อย่างจึงจะตัดสินใจได้ว่าปลูกได้หรือไม่?",
                  "ช่อง i = 0 (ช่องแรกสุด) ไม่มีเพื่อนบ้านทางซ้าย — คุณควรถือว่าซ้ายของมันเป็นอะไร?",
                  "ถ้าเจอช่องที่ปลูกได้ ควรปลูกเลย หรือควรเก็บไว้เผื่อว่าปลูกตรงอื่นจะได้เยอะกว่า?",
                  "หลังตัดสินใจปลูกที่ i แล้ว คุณต้องทำอะไรเพื่อไม่ให้ช่อง i+1 ถูกปลูกซ้อน?",
                ],
              },
              { t: "p", c: "ข้อ 2 คือ edge case ที่ทำให้คนตกข้อนี้ และข้อ 3 คือคำถามว่า greedy ใช้ได้ไหม" },
            ],
          },
          {
            title: "💡 ใบ้ขั้น 2 — เทคนิคที่ต้องใช้ และใช้ทำไม",
            c: [
              { t: "p", c: "ใช้ greedy (โลภมาก) กวาดจากซ้ายไปขวา เจอช่องที่ปลูกได้ปลูกทันที" },
              { t: "p", c: "ทำไม greedy ถูก: ในกลุ่มช่องว่างที่ติดกัน การปลูกให้ซ้ายที่สุดเท่าที่กติกาอนุญาต ไม่เคย ทำให้เสียโอกาส เพราะการเลื่อนดอกไม้ไปขวาหนึ่งช่องมีแต่จะกินพื้นที่ทางขวาที่อาจใช้ปลูกดอกถัดไป — เลื่อนซ้ายสุดจึงเหลือที่ให้ดอกต่อไปมากที่สุด" },
              { t: "p", c: "ทริกจัดการขอบที่ทำให้โค้ดสะอาด: ถือว่านอกแปลงเป็นช่องว่าง เขียนเป็น left_ok = (i == 0 หรือ flowerbed[i-1] == 0) และ right_ok = (i == size-1 หรือ flowerbed[i+1] == 0) — Python ประเมิน or แบบ short-circuit จึงไม่มีทางอ่าน index เกินขอบ" },
              { t: "callout", title: "อย่าทำสิ่งนี้", c: "อย่าลืมเขียน flowerbed[i] = 1 ตอนที่ตัดสินใจปลูก — ถ้าแค่ count += 1 โดยไม่ปลูกจริง ช่อง i+1 จะยังเห็นว่าซ้ายของมันว่างและปลูกซ้อนกันได้ ผลคือนับเกิน (ลองกับ [0,0,0] จะได้ 3 แทน 2)" },
            ],
          },
          {
            title: "💡 ใบ้ขั้น 3 — โครงโค้ด (pseudocode) มีช่องว่างให้เติม",
            c: [
              {
                t: "code",
                lang: "python",
                c: `size = len(flowerbed)
count = 0
for i in range(size):
    if flowerbed[i] == 0:
        left_ok  = ______ or ______     # (1) ไม่มีซ้าย  หรือ  ซ้ายว่าง
        right_ok = ______ or ______     # (2) ไม่มีขวา   หรือ  ขวาว่าง
        if left_ok and right_ok:
            ______                      # (3) ปลูกจริงลงใน array
            count += 1
            if count >= n:
                return True
return ______                           # (4) เงื่อนไขตอนกวาดจบ`,
              },
              { t: "p", c: "ระวังช่อง (4): ต้องเป็น count >= n ไม่ใช่ False เพราะกรณี n = 0 (ไม่ต้องปลูกเลย) คำตอบคือ true" },
            ],
          },
        ],
      },

      { t: "h2", c: "ไล่ทีละสเต็ปด้วยมือ (dry run)" },
      { t: "p", c: "ไล่ Example 4: flowerbed = [1, 0, 0, 0, 0, 1], n = 2 — ดูว่าทำไมได้แค่ 1 ดอก" },
      {
        t: "table",
        head: ["i", "flowerbed[i]", "ซ้ายว่าง?", "ขวาว่าง?", "ปลูกไหม", "flowerbed หลังรอบ", "count"],
        rows: [
          ["0", "1", "—", "—", "ไม่ (มีดอกอยู่แล้ว)", "[1,0,0,0,0,1]", "0"],
          ["1", "0", "ซ้าย = 1 ❌", "ขวา = 0 ✅", "ไม่", "[1,0,0,0,0,1]", "0"],
          ["2", "0", "ซ้าย = 0 ✅", "ขวา = 0 ✅", "ปลูก 🌱", "[1,0,1,0,0,1]", "1"],
          ["3", "0", "ซ้าย = 1 ❌ (ที่เพิ่งปลูก)", "ขวา = 0 ✅", "ไม่", "[1,0,1,0,0,1]", "1"],
          ["4", "0", "ซ้าย = 0 ✅", "ขวา = 1 ❌", "ไม่", "[1,0,1,0,0,1]", "1"],
          ["5", "1", "—", "—", "ไม่ (มีดอกอยู่แล้ว)", "[1,0,1,0,0,1]", "1"],
        ],
      },
      { t: "p", c: "กวาดจบได้ count = 1 < n = 2 → return false ตรงกับ Example 4 และสังเกตแถว i = 3: ถ้าเราไม่ได้เขียน 1 ลงไปจริงที่ i = 2 แถวนี้จะปลูกซ้อนกันทันที" },

      {
        t: "solution",
        summary: "🔓 เปิดเฉลยเต็ม (ลองเองก่อนนะ)",
        c: [
          { t: "p", c: "ไอเดียหนึ่งบรรทัด: กวาดซ้ายไปขวา เจอช่องว่างที่เพื่อนบ้านทั้งสองข้างว่าง (หรือไม่มีเพื่อนบ้าน) ก็ปลูกทันทีและเขียนลง array จริง เพื่อให้ช่องถัดไปเห็น" },
          {
            t: "codeout",
            lang: "python",
            label: "เฉลย (Python)",
            code: `def can_place_flowers(flowerbed: list[int], n: int) -> bool:
    size = len(flowerbed)
    count = 0                                                  # (1) ปลูกได้แล้วกี่ดอก
    for i in range(size):                                      # (2) กวาดทีละแปลง
        if flowerbed[i] == 0:                                  # (3) แปลงนี้ว่าง
            left_ok = i == 0 or flowerbed[i - 1] == 0          # (4) ซ้ายว่าง (หรือไม่มีซ้าย)
            right_ok = i == size - 1 or flowerbed[i + 1] == 0  # (5) ขวาว่าง (หรือไม่มีขวา)
            if left_ok and right_ok:
                flowerbed[i] = 1                               # (6) ปลูกจริง เพื่อกันเพื่อนบ้านถัดไป
                count += 1
                if count >= n:                                 # (7) ครบแล้วออกได้ทันที
                    return True
    return count >= n                                          # (8) เผื่อกรณี n == 0


print(can_place_flowers([1, 0, 0, 0, 1], 1))
print(can_place_flowers([1, 0, 0, 0, 1], 2))
print(can_place_flowers([0], 1))
print(can_place_flowers([0, 0, 1, 0, 1], 1))
print(can_place_flowers([1, 0, 0, 0, 0, 1], 2))`,
            out: `True
False
True
True
False`,
          },
          {
            t: "table",
            head: ["บรรทัด", "โค้ด", "ทำอะไร / ทำไมต้องมี"],
            rows: [
              ["(1)", "count = 0", "นับดอกที่ปลูกสำเร็จ เทียบกับ n ตอนท้าย"],
              ["(2)", "for i in range(size)", "กวาดครั้งเดียวจากซ้ายไปขวา → O(n) การกวาดจากซ้ายสำคัญ เพราะเป็นทิศที่ทำให้ greedy ถูก"],
              ["(3)", "if flowerbed[i] == 0", "ช่องที่มีดอกอยู่แล้วข้ามไปเลย ไม่มีอะไรต้องทำ"],
              ["(4)", "left_ok = i == 0 or flowerbed[i - 1] == 0", "ทริกจัดการขอบซ้าย: ถ้า i == 0 เงื่อนไขแรกเป็นจริง Python จะไม่ประเมินส่วนหลังเลย (short-circuit) จึงไม่มีทางอ่าน flowerbed[-1] ซึ่งใน Python คือตัวท้าย — bug เงียบที่หายากมาก"],
              ["(5)", "right_ok = i == size - 1 or flowerbed[i + 1] == 0", "ทริกเดียวกันสำหรับขอบขวา กัน IndexError"],
              ["(6)", "flowerbed[i] = 1", "หัวใจของความถูกต้อง — ต้องเขียนลง array จริง เพื่อให้รอบถัดไป (i+1) เห็นว่าซ้ายของมันไม่ว่างแล้ว"],
              ["(7)", "if count >= n: return True", "โจทย์ถามแค่ว่าถึง n ไหม ไม่ต้องนับให้ครบทุกที่ ออกทันทีเพื่อประหยัดเวลา"],
              ["(8)", "return count >= n", "ไม่ใช่ return False — เพราะถ้า n == 0 ต้องได้ true (ไม่ต้องปลูกอะไรเลยก็ถือว่าทำได้)"],
            ],
          },
          { t: "p", c: "ทำไม greedy ถูกต้อง (พิสูจน์แบบสั้น): พิจารณาช่วงช่องว่างที่ติดกันช่วงหนึ่ง สมมติมีคำตอบที่ดีที่สุด (ปลูกได้มากสุด) ที่ไม่ได้ปลูกที่ตำแหน่งซ้ายสุดที่กติกาอนุญาต เราสามารถ \"เลื่อน\" ดอกไม้ตัวซ้ายสุดของคำตอบนั้นมาไว้ซ้ายสุดได้ โดยไม่ชนกับดอกอื่น (เพราะเลื่อนไปทางซ้ายมีแต่จะห่างจากดอกถัดไปมากขึ้น) จำนวนดอกจึงเท่าเดิม ทำซ้ำแบบนี้จะกลายเป็นคำตอบของ greedy พอดี — สรุปว่า greedy ไม่แย่กว่าคำตอบที่ดีที่สุด" },
          {
            t: "table",
            head: ["วิธี", "Time", "Space", "หมายเหตุ"],
            rows: [
              ["ลองทุกชุดตำแหน่งที่จะปลูก (backtracking)", "O(2^n) ❌", "O(n)", "รันไม่จบเมื่อ n = 20,000"],
              ["greedy กวาดรอบเดียว (เฉลยนี้)", "O(n) ✅", "O(1) ✅", "แก้ array เดิม ไม่ใช้ที่เพิ่ม"],
            ],
          },
          {
            t: "codeout",
            lang: "python",
            label: "ทดสอบ edge cases",
            code: `def can_place_flowers(flowerbed, n):
    size = len(flowerbed)
    count = 0
    for i in range(size):
        if flowerbed[i] == 0:
            left_ok = i == 0 or flowerbed[i - 1] == 0
            right_ok = i == size - 1 or flowerbed[i + 1] == 0
            if left_ok and right_ok:
                flowerbed[i] = 1
                count += 1
                if count >= n:
                    return True
    return count >= n


cases = [
    ([1, 0, 0, 0, 1], 1, True),
    ([1, 0, 0, 0, 1], 2, False),
    ([0], 1, True),
    ([0], 2, False),
    ([0, 0], 1, True),
    ([1, 0, 1, 0, 1], 1, False),      # ไม่มีที่ว่างที่ปลูกได้เลย
    ([0, 0, 0, 0, 0, 0], 3, True),    # ปลูกได้ index 0, 2, 4
    ([1, 0, 0, 0, 0, 1], 2, False),
]
for bed, n, expected in cases:
    got = can_place_flowers(bed[:], n)
    print(got == expected, bed, n, "->", got)`,
            out: `True [1, 0, 0, 0, 1] 1 -> True
True [1, 0, 0, 0, 1] 2 -> False
True [0] 1 -> True
True [0] 2 -> False
True [0, 0] 1 -> True
True [1, 0, 1, 0, 1] 1 -> False
True [0, 0, 0, 0, 0, 0] 3 -> True
True [1, 0, 0, 0, 0, 1] 2 -> False`,
          },
          { t: "p", c: "หมายเหตุ: เฉลยนี้ แก้ array ที่รับเข้ามา ถ้า interviewer ไม่อยากให้แตะข้อมูลต้นฉบับ ให้ copy ก่อน (bed = flowerbed[:] เสีย O(n) space) หรือใช้วิธีนับความยาวของช่วงช่องว่างแล้วคำนวณด้วยสูตร (ความยาว - 1) // 2 แทน" },
        ],
      },

      { t: "callout", title: "💡 สรุป pattern", c: "greedy + จัดการขอบด้วย short-circuit: เขียนเงื่อนไขขอบเป็น (i == 0 or a[i-1] == ...) ทำให้ไม่ต้องมี if พิเศษและกัน IndexError ได้ในบรรทัดเดียว — ท่านี้ใช้กับโจทย์ \"ดูเพื่อนบ้าน\" ได้ทุกข้อ" },
      { t: "callout", title: "ต่อยอด (โจทย์พี่น้องกัน)", c: "LC1013 Partition Array Into Three Parts, LC55 Jump Game (greedy), LC122 Best Time to Buy and Sell Stock II, LC763 Partition Labels" },
    ],
  },

  "lc75-p05": {
    slug: "lc75-p05",
    title: "ข้อ 5 · LC345 Reverse Vowels of a String 🟢",
    lead: "two pointers (ตัวชี้สองตัว) จากปลายวิ่งเข้าหากัน swap เฉพาะสระ ฝึก two pointers + immutable string",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "ให้ string (สตริง) s จงกลับลำดับของ vowel (สระ) ทุกตัวใน s โดย ตัวอักษรอื่นอยู่ที่เดิมทุกตัว แล้ว return string ที่ได้" },
      { t: "p", c: "สระที่นับคือ a, e, i, o, u และรวม ตัวพิมพ์ใหญ่ A, E, I, O, U ด้วย" },
      {
        t: "example",
        c: [
          {
            input: 's = "IceCreAm"',
            output: '"AceCreIm"',
            explain: "สระใน s คือ I, e, e, A (ที่ index 0, 2, 5, 6)\nกลับลำดับเป็น A, e, e, I แล้วใส่กลับตำแหน่งเดิม — ตัวอักษรอื่น (c, C, r, m) ไม่ขยับ",
          },
          {
            input: 's = "leetcode"',
            output: '"leotcede"',
            explain: "สระคือ e, e, o, e → กลับเป็น e, o, e, e",
          },
          {
            input: 's = "aA"',
            output: '"Aa"',
            explain: "ต้องนับสระพิมพ์ใหญ่ด้วย ถ้าลืมจะได้ \"aA\" ซึ่งผิด",
          },
          {
            input: 's = "xyz"',
            output: '"xyz"',
            explain: "ไม่มีสระเลย ผลลัพธ์เหมือนเดิม",
          },
        ],
      },
      {
        t: "constraints",
        c: [
          "1 <= s.length <= 3 × 10^5",
          "s ประกอบด้วยตัวอักษรอังกฤษพิมพ์เล็กและพิมพ์ใหญ่",
          "n ถึง 3 × 10^5 → ต้อง O(n) และห้ามสร้าง string ใหม่ซ้ำ ๆ ใน loop",
        ],
      },
      { t: "callout", title: "โจทย์นี้ถามอะไรจริง ๆ", c: "ถ้าดึงสระออกมาเป็นลิสต์ กลับด้าน แล้วเอาใส่กลับที่เดิม ก็จบ — แต่วิธีที่สวยกว่าคือทำในที่เดิมด้วย two pointers จากปลายทั้งสองข้าง swap ทีละคู่ ไม่ต้องเก็บลิสต์แยก" },

      { t: "h2", c: "ลองเองก่อน 10–15 นาที" },
      {
        t: "code",
        lang: "python",
        c: `def reverse_vowels(s: str) -> str:
    # เขียนโค้ดของคุณที่นี่
    pass


print(reverse_vowels("IceCreAm"))   # ควรได้ AceCreIm
print(reverse_vowels("leetcode"))   # ควรได้ leotcede
print(reverse_vowels("aA"))         # ควรได้ Aa`,
      },
      {
        t: "hints",
        c: [
          {
            title: "💡 ใบ้ขั้น 1 — ตั้งคำถามให้ตัวเองก่อน",
            c: [
              {
                t: "ol",
                c: [
                  "\"กลับลำดับ\" ของอะไรก็ตาม มักทำได้ด้วยการจับตัวหัวสุดสลับกับตัวท้ายสุด แล้วขยับเข้ามา — ในโจทย์นี้ \"ตัวหัวสุด\" หมายถึงสระตัวแรกจากซ้าย ใช่ไหม?",
                  "ถ้าตัวที่ pointer ซ้ายชี้อยู่ไม่ใช่สระ คุณควรทำอะไร — สลับ หรือขยับข้าม?",
                  "s[0] = \"A\" ทำได้ไหมใน Python? ถ้าไม่ได้ ต้องแปลง s เป็นอะไรก่อน?",
                  "การเช็คว่าตัวอักษรเป็นสระไหม ควรใช้ list, string หรือ set — อันไหนเช็คเร็วสุด?",
                ],
              },
            ],
          },
          {
            title: "💡 ใบ้ขั้น 2 — เทคนิคที่ต้องใช้ และใช้ทำไม",
            c: [
              { t: "p", c: "ใช้ Two Pointers แบบ opposite ends (หัว/ท้ายวิ่งเข้าหากัน) บน list ของตัวอักษร" },
              {
                t: "ul",
                c: [
                  "แปลง string เป็น list ก่อน เพราะ string เป็น immutable — แก้ทีละตัวไม่ได้",
                  "ใช้ set(\"aeiouAEIOU\") เพื่อเช็คสมาชิกแบบ O(1) (ถ้าใช้ list หรือ string การเช็ค in จะเป็น O(k) ทุกครั้ง)",
                  "loop สามทาง: ซ้ายไม่ใช่สระ → ขยับซ้าย; ขวาไม่ใช่สระ → ขยับขวา; เป็นสระทั้งคู่ → swap แล้วขยับทั้งสอง",
                ],
              },
              { t: "p", c: "ทำไมมันได้ผล: การสลับสระตัวที่ i จากซ้ายกับตัวที่ i จากขวา คือนิยามของการกลับลำดับพอดี และเพราะเราไม่เคยแตะตัวอักษรที่ไม่ใช่สระ ตำแหน่งของพวกมันจึงไม่เปลี่ยน" },
              { t: "callout", title: "อย่าทำสิ่งนี้", c: "อย่าลืมสระพิมพ์ใหญ่ (Example 3 จับตรงนี้) และอย่าประกอบผลลัพธ์ด้วย result += ch เพราะ n ถึง 3 × 10^5 จะกลายเป็น O(n²) ให้แก้บน list แล้ว join ครั้งเดียว" },
            ],
          },
          {
            title: "💡 ใบ้ขั้น 3 — โครงโค้ด (pseudocode) มีช่องว่างให้เติม",
            c: [
              {
                t: "code",
                lang: "python",
                c: `vowels = ______                     # (1) เก็บสระทั้งพิมพ์เล็กพิมพ์ใหญ่ (ใช้อะไรดี?)
chars = ______                      # (2) แปลง s ให้แก้ได้
left, right = 0, len(chars) - 1
while left < right:
    if chars[left] not in vowels:
        ______                      # (3)
    elif chars[right] not in vowels:
        ______                      # (4)
    else:
        ______                      # (5) สลับสองตัว
        left += 1
        right -= 1
return ______                       # (6) รวมกลับเป็น string`,
              },
              { t: "p", c: "ระวัง: ในสาขา (3) และ (4) ต้องขยับ pointer เพียงตัวเดียว ถ้าขยับทั้งสองจะข้ามสระบางตัวไป และเงื่อนไข while ต้องเป็น left < right (ไม่ใช่ <=) เพราะถ้าเท่ากันคือตัวเดียวกัน ไม่ต้องสลับกับตัวเอง" },
            ],
          },
        ],
      },

      { t: "h2", c: "ไล่ทีละสเต็ปด้วยมือ (dry run)" },
      { t: "p", c: "ไล่ Example 1: s = \"IceCreAm\" → chars = ['I','c','e','C','r','e','A','m']" },
      {
        t: "table",
        head: ["left (ตัว)", "right (ตัว)", "สถานะ", "การกระทำ", "chars หลังรอบ"],
        rows: [
          ["0 (I)", "7 (m)", "ซ้ายเป็นสระ ขวาไม่ใช่", "ขยับขวา ←", "Ice CreAm (ไม่เปลี่ยน)"],
          ["0 (I)", "6 (A)", "สระทั้งคู่", "swap 0 ↔ 6", "['A','c','e','C','r','e','I','m']"],
          ["1 (c)", "5 (e)", "ซ้ายไม่ใช่สระ", "ขยับซ้าย →", "ไม่เปลี่ยน"],
          ["2 (e)", "5 (e)", "สระทั้งคู่", "swap 2 ↔ 5 (ค่าเท่ากันพอดี)", "['A','c','e','C','r','e','I','m']"],
          ["3 (C)", "4 (r)", "ซ้ายไม่ใช่สระ", "ขยับซ้าย →", "ไม่เปลี่ยน"],
          ["4 (r)", "4 (r)", "left == right", "ออกจาก loop", "['A','c','e','C','r','e','I','m']"],
        ],
      },
      { t: "p", c: "join ได้ \"AceCreIm\" ตรงกับ Example 1 — สังเกตว่าตัวอักษรที่ไม่ใช่สระ (c, C, r, m) อยู่ index เดิมทุกตัว" },

      {
        t: "solution",
        summary: "🔓 เปิดเฉลยเต็ม (ลองเองก่อนนะ)",
        c: [
          { t: "p", c: "ไอเดียหนึ่งบรรทัด: แปลงเป็น list แล้วให้ pointer สองตัววิ่งเข้าหากัน ข้ามตัวที่ไม่ใช่สระ และ swap เมื่อเจอสระทั้งสองฝั่ง" },
          {
            t: "codeout",
            lang: "python",
            label: "เฉลย (Python)",
            code: `def reverse_vowels(s: str) -> str:
    vowels = set("aeiouAEIOU")           # (1) ใช้ set เพื่อเช็คสมาชิกแบบ O(1)
    chars = list(s)                      # (2) string แก้ทีละตัวไม่ได้ ต้องแปลงเป็น list
    left, right = 0, len(chars) - 1
    while left < right:                  # (3) วิ่งเข้าหากัน
        if chars[left] not in vowels:
            left += 1                    # (4) ซ้ายไม่ใช่สระ -> ข้าม
        elif chars[right] not in vowels:
            right -= 1                   # (5) ขวาไม่ใช่สระ -> ข้าม
        else:
            chars[left], chars[right] = chars[right], chars[left]   # (6) สระทั้งคู่ -> สลับ
            left += 1
            right -= 1
    return "".join(chars)                # (7) รวมกลับเป็น string


print(reverse_vowels("IceCreAm"))
print(reverse_vowels("leetcode"))
print(reverse_vowels("aA"))
print(reverse_vowels("xyz"))
print(reverse_vowels("a"))`,
            out: `AceCreIm
leotcede
Aa
xyz
a`,
          },
          {
            t: "table",
            head: ["บรรทัด", "โค้ด", "ทำอะไร / ทำไมต้องมี"],
            rows: [
              ["(1)", "vowels = set(\"aeiouAEIOU\")", "set ใช้ hash จึงเช็ค in ได้ O(1) — ถ้าใช้ string หรือ list จะเป็น O(10) ต่อครั้ง ซึ่งคูณเข้าไปทั้ง loop และที่สำคัญคือต้องมีพิมพ์ใหญ่ด้วย ไม่งั้นผิด Example 3"],
              ["(2)", "chars = list(s)", "string เป็น immutable แก้ทีละตัวไม่ได้ (จะได้ TypeError) การแปลงเป็น list เสีย O(n) ครั้งเดียว คุ้มกว่าการสร้าง string ใหม่ทุกครั้งที่แก้"],
              ["(3)", "while left < right", "ใช้ < ไม่ใช่ <= เพราะถ้า left == right คือตัวเดียวกัน สลับกับตัวเองไม่มีประโยชน์"],
              ["(4)", "left += 1", "ข้ามตัวที่ไม่ใช่สระ — ขยับ ทีละตัวเท่านั้น ถ้าเผลอขยับทั้งสองฝั่งพร้อมกันจะข้ามสระบางตัวไปเงียบ ๆ"],
              ["(5)", "right -= 1", "เหมือนกันแต่ฝั่งขวา ลำดับ if/elif สำคัญ: เช็คซ้ายก่อนเสมอ เพื่อให้แต่ละรอบขยับอย่างน้อยหนึ่งอย่าง → loop จบแน่นอน"],
              ["(6)", "chars[left], chars[right] = chars[right], chars[left]", "สลับสองตำแหน่งพร้อมกันโดยไม่ต้องมีตัวแปร temp (Python สร้าง tuple ฝั่งขวาก่อน) นี่คือจุดเดียวที่ข้อมูลเปลี่ยน"],
              ["(7)", "\"\".join(chars)", "ประกอบกลับเป็น string ครั้งเดียว O(n)"],
            ],
          },
          { t: "p", c: "ทำไมมันถูกต้อง: invariant คือ \"สระที่อยู่นอกช่วง [left, right] ถูกวางในตำแหน่งสุดท้ายที่ถูกต้องแล้ว\" ทุกครั้งที่ swap เราจับสระตัวที่ k จากซ้ายกับตัวที่ k จากขวา ซึ่งตรงกับนิยามของการ reverse พอดี และเพราะเราไม่เคยเขียนทับตัวที่ไม่ใช่สระ ตำแหน่งของมันจึงคงเดิมตามที่โจทย์กำหนด" },
          {
            t: "table",
            head: ["วิธี", "Time", "Space", "หมายเหตุ"],
            rows: [
              ["result += ch ใน loop", "O(n²) ❌", "O(n)", "n = 3 × 10^5 → TLE"],
              ["ดึงสระออกมา reverse แล้วใส่กลับ", "O(n) ✅", "O(n)", "ถูก อ่านง่าย แต่เปลือง list เพิ่มอีกก้อน"],
              ["two pointers บน list (เฉลยนี้)", "O(n) ✅", "O(n) ✅", "space มาจาก list(s) ซึ่งเลี่ยงไม่ได้ใน Python — ถ้าเป็นภาษาที่ string แก้ได้จะเป็น O(1)"],
            ],
          },
          {
            t: "details",
            summary: "อีกวิธี: ดึงสระออกมาแล้วใส่กลับ (อ่านง่ายกว่าสำหรับบางคน)",
            c: [
              {
                t: "codeout",
                lang: "python",
                label: "แบบดึงออกมา reverse",
                code: `def reverse_vowels_v2(s: str) -> str:
    vowels = set("aeiouAEIOU")
    found = [ch for ch in s if ch in vowels]    # เก็บสระตามลำดับที่เจอ
    chars = list(s)
    for i, ch in enumerate(chars):
        if ch in vowels:
            chars[i] = found.pop()              # pop() เอาตัวท้ายสุด = กลับลำดับให้เอง
    return "".join(chars)


print(reverse_vowels_v2("IceCreAm"))
print(reverse_vowels_v2("leetcode"))
print(reverse_vowels_v2("aA"))`,
                out: `AceCreIm
leotcede
Aa`,
              },
              { t: "p", c: "ทริกคือ pop() ดึงจากท้าย list ทำให้ได้ลำดับกลับด้านฟรี ๆ ยังเป็น O(n) แต่ใช้ที่เพิ่มอีกหนึ่ง list — เลือกอันไหนก็ได้ แต่เวอร์ชัน two pointers คือสิ่งที่ interviewer อยากเห็น เพราะมันแสดงว่าเราคุมตำแหน่งเองได้" },
            ],
          },
        ],
      },

      { t: "callout", title: "💡 สรุป pattern", c: "reverse แบบมีเงื่อนไข = two pointers จากปลายเข้าหากัน + ข้ามตัวที่ไม่เข้าเงื่อนไข และจำไว้ว่าใน Python ถ้าต้องแก้ string ทีละตัว ให้ list(s) → แก้ → \"\".join(chars) เสมอ" },
      { t: "callout", title: "ต่อยอด (โจทย์พี่น้องกัน)", c: "LC344 Reverse String, LC125 Valid Palindrome (ข้ามตัวที่ไม่ใช่ตัวอักษร), LC917 Reverse Only Letters, LC541 Reverse String II" },
    ],
  },

  "lc75-p06": {
    slug: "lc75-p06",
    title: "ข้อ 6 · LC151 Reverse Words in a String 🟡",
    lead: "split() กำจัดช่องว่างเกินให้ฟรี แล้ว reverse ลำดับ join กลับ",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "ให้ string (สตริง) s ที่มีคำหลายคำคั่นด้วยช่องว่าง จง return string ที่กลับลำดับคำ โดยผลลัพธ์ต้องมีช่องว่างคั่นระหว่างคำเพียง หนึ่งช่อง และ ไม่มีช่องว่างนำหน้าหรือต่อท้าย" },
      { t: "p", c: "หมายเหตุ: s อาจมีช่องว่างนำหน้า ต่อท้าย หรือมีช่องว่างซ้อนกันหลายช่องระหว่างคำ — ต้องยุบให้เหลือช่องเดียวทั้งหมด" },
      {
        t: "example",
        c: [
          {
            input: 's = "the sky is blue"',
            output: '"blue is sky the"',
            explain: "กลับลำดับคำ 4 คำ ช่องว่างปกติอยู่แล้ว",
          },
          {
            input: 's = "  hello world  "',
            output: '"world hello"',
            explain: "ช่องว่างนำหน้าและต่อท้ายต้องถูกตัดออกทั้งหมด",
          },
          {
            input: 's = "a good   example"',
            output: '"example good a"',
            explain: "ช่องว่าง 3 ช่องระหว่าง good กับ example ต้องยุบเป็นช่องเดียว",
          },
        ],
      },
      {
        t: "constraints",
        c: [
          "1 <= s.length <= 10^4",
          "s ประกอบด้วยตัวอักษรอังกฤษ (พิมพ์เล็ก/ใหญ่), ตัวเลข และช่องว่าง",
          "รับประกันว่ามีคำอย่างน้อยหนึ่งคำใน s",
          "คำถามต่อยอด: ถ้าภาษาที่ใช้มี string แบบ mutable ทำให้เป็น O(1) space ได้ไหม",
        ],
      },
      { t: "callout", title: "โจทย์นี้ถามอะไรจริง ๆ", c: "โจทย์นี้ไม่ยากที่อัลกอริทึม แต่ยากที่ \"การจัดการช่องว่าง\" — ถ้าใช้ s.split(\" \") (ใส่ตัวคั่นเอง) จะได้ string ว่างติดมาเป็นสมาชิกด้วย แต่ s.split() เปล่า ๆ จัดการให้หมดเลย นี่คือความต่างที่โจทย์กำลังทดสอบ" },

      { t: "h2", c: "ลองเองก่อน 10–15 นาที" },
      {
        t: "code",
        lang: "python",
        c: `def reverse_words(s: str) -> str:
    # เขียนโค้ดของคุณที่นี่
    pass


print(repr(reverse_words("the sky is blue")))   # ควรได้ 'blue is sky the'
print(repr(reverse_words("  hello world  ")))   # ควรได้ 'world hello'
print(repr(reverse_words("a good   example")))  # ควรได้ 'example good a'`,
      },
      {
        t: "hints",
        c: [
          {
            title: "💡 ใบ้ขั้น 1 — ตั้งคำถามให้ตัวเองก่อน",
            c: [
              {
                t: "ol",
                c: [
                  "ลองรัน \"a  b\".split(\" \") กับ \"a  b\".split() ใน Python ดู — ผลต่างกันยังไง แล้วอันไหนที่คุณต้องการ?",
                  "หลังได้ list ของคำแล้ว การกลับลำดับคำใช้อะไร — reverse(), [::-1], หรือ loop ถอยหลัง? ต่างกันที่ space ไหม",
                  "การประกอบคำกลับเป็น string ควรใช้ \" \".join(words) หรือค่อย ๆ ต่อด้วย += ?",
                  "ถ้าห้ามใช้ split() เลย คุณจะรู้ได้ยังไงว่าคำหนึ่งเริ่มที่ index ไหนและจบที่ index ไหน?",
                ],
              },
            ],
          },
          {
            title: "💡 ใบ้ขั้น 2 — เทคนิคที่ต้องใช้ และใช้ทำไม",
            c: [
              { t: "p", c: "ทางที่ 1 (ที่ควรเขียนก่อน) — ใช้ built-in: s.split() แล้ว reverse แล้ว \" \".join()" },
              {
                t: "ul",
                c: [
                  "s.split() แบบไม่ใส่ argument จะตัดด้วย whitespace ทุกชนิด และ ทิ้งช่องว่างซ้ำและช่องว่างหัวท้ายให้ฟรี — ตอบโจทย์ทุกข้อกำหนดพร้อมกัน",
                  "words.reverse() กลับลำดับ in-place (แก้ในที่เดิม) O(n) ไม่สร้าง list ใหม่ ต่างจาก words[::-1] ที่สร้างสำเนาใหม่",
                  "\" \".join(words) ประกอบครั้งเดียว O(n) และรับประกันว่ามีช่องว่างคั่นเพียงช่องเดียว",
                ],
              },
              { t: "p", c: "ทางที่ 2 (ที่ interviewer มักขอต่อ) — ตัดคำด้วยมือ: ใช้ pointer กวาด ข้ามช่องว่างจนเจอตัวอักษร จำ start ไว้ กวาดต่อจนจบคำ แล้วเก็บ s[start:i] วิธีนี้แสดงว่าเราเข้าใจว่า split() ทำอะไรอยู่ข้างใน" },
              { t: "callout", title: "อย่าทำสิ่งนี้", c: "อย่าใช้ s.split(\" \") เพราะช่องว่างซ้อนกันจะให้สมาชิกที่เป็น string ว่าง ('') ติดมาใน list แล้วผลลัพธ์จะมีช่องว่างเกิน — เป็นสาเหตุที่คนส่งคำตอบผิดข้อนี้บ่อยที่สุด" },
            ],
          },
          {
            title: "💡 ใบ้ขั้น 3 — โครงโค้ด (pseudocode) มีช่องว่างให้เติม",
            c: [
              {
                t: "code",
                lang: "python",
                c: `# ทางที่ 1: ใช้ built-in
words = s.______        # (1) ตัดคำแบบที่ทิ้งช่องว่างเกินให้เอง
words.______            # (2) กลับลำดับ
return ______           # (3) ต่อกลับด้วยช่องว่างเดียว`,
              },
              {
                t: "code",
                lang: "python",
                c: `# ทางที่ 2: ตัดคำด้วยมือ
words = []
i, n = 0, len(s)
while i < n:
    while i < n and s[i] == " ":   # (4) ข้ามช่องว่าง
        i += 1
    if i == n:
        break                      # (5) ทำไมต้องมีบรรทัดนี้?
    start = i
    while i < n and s[i] != " ":   # (6) กวาดจนจบคำ
        i += 1
    words.append(______)           # (7) เก็บคำที่ตัดได้
# แล้วต่อคำจากท้ายมาหน้า`,
              },
              { t: "p", c: "ช่อง (5) สำคัญ: ถ้าไม่มี break ตอนที่ string ลงท้ายด้วยช่องว่าง จะเก็บคำว่างเข้าไปใน list — ลองคิดว่าเกิดขึ้นตอนไหน" },
            ],
          },
        ],
      },

      { t: "h2", c: "ไล่ทีละสเต็ปด้วยมือ (dry run)" },
      { t: "p", c: "ไล่ Example 3: s = \"a good   example\" ด้วยทางที่ 1" },
      {
        t: "table",
        head: ["ขั้น", "โค้ด", "ค่าที่ได้"],
        rows: [
          ["เริ่ม", "s", "'a good   example'"],
          ["1", "s.split()", "['a', 'good', 'example'] ← ช่องว่าง 3 ช่องหายไปเอง"],
          ["เทียบ", "s.split(\" \")", "['a', 'good', '', '', 'example'] ← มีค่าว่างติดมา ❌"],
          ["2", "words.reverse()", "['example', 'good', 'a']"],
          ["3", "\" \".join(words)", "'example good a' ✅"],
        ],
      },
      { t: "p", c: "ตรงกับ Example 3 — แถวที่ 3 ของตารางคือหัวใจของข้อนี้ ให้ดูความต่างระหว่าง split() กับ split(\" \") ให้ชัด" },

      {
        t: "solution",
        summary: "🔓 เปิดเฉลยเต็ม (ลองเองก่อนนะ)",
        c: [
          { t: "p", c: "ไอเดียหนึ่งบรรทัด: split() ทิ้งช่องว่างเกินให้เอง กลับลำดับ list แล้ว join ด้วยช่องว่างเดียว" },
          {
            t: "codeout",
            lang: "python",
            label: "เฉลยที่ 1 (Python) — ใช้ built-in",
            code: `def reverse_words(s: str) -> str:
    words = s.split()          # (1) split() เปล่า ๆ ตัดด้วย whitespace และทิ้งช่องว่างซ้ำ/หัวท้ายให้เอง
    words.reverse()            # (2) กลับลำดับ list ในที่เดิม O(n)
    return " ".join(words)     # (3) ต่อกลับด้วยช่องว่างเดียว


print(repr(reverse_words("the sky is blue")))
print(repr(reverse_words("  hello world  ")))
print(repr(reverse_words("a good   example")))
print(repr(reverse_words("single")))`,
            out: `'blue is sky the'
'world hello'
'example good a'
'single'`,
          },
          {
            t: "table",
            head: ["บรรทัด", "โค้ด", "ทำอะไร / ทำไมต้องมี"],
            rows: [
              ["(1)", "s.split()", "ไม่ใส่ argument = ตัดด้วย whitespace ทุกชนิด (ช่องว่าง, tab, newline) และไม่คืนสมาชิกว่าง ต่างจาก split(\" \") ที่ยึดช่องว่างหนึ่งตัวเป็นตัวคั่นแบบเข้ม จึงคืน '' ทุกครั้งที่มีช่องว่างซ้อน"],
              ["(2)", "words.reverse()", "กลับลำดับ in-place ไม่สร้าง list ใหม่ — ถ้าใช้ words[::-1] จะได้ผลเดียวกันแต่เสีย memory เพิ่มอีกก้อน (จุดที่ interviewer ชอบถาม)"],
              ["(3)", "\" \".join(words)", "แทรกช่องว่างระหว่างคำให้พอดีหนึ่งช่อง และไม่มีช่องว่างหัวท้าย จึงตอบข้อกำหนดของโจทย์ครบในบรรทัดเดียว"],
            ],
          },
          { t: "p", c: "ทำไมมันถูกต้อง: split() ให้ลำดับคำตามที่ปรากฏใน s โดยไม่มีสมาชิกว่าง การ reverse ทำให้คำที่อยู่ท้ายสุดมาอยู่หน้าสุด ซึ่งคือนิยามของ \"กลับลำดับคำ\" และ join ด้วยช่องว่างเดียวรับประกันรูปแบบผลลัพธ์ตามข้อกำหนด" },
          {
            t: "table",
            head: ["วิธี", "Time", "Space", "หมายเหตุ"],
            rows: [
              ["split(\" \") แล้วกรองค่าว่างทิ้ง", "O(n)", "O(n)", "ถูกถ้ากรองครบ แต่พลาดง่าย"],
              ["split() + reverse + join (เฉลยนี้)", "O(n) ✅", "O(n) ✅", "สั้นและปลอดภัยที่สุดใน Python"],
              ["ตัดคำด้วยมือ (two pointers)", "O(n) ✅", "O(n)", "ยาวกว่าแต่แสดงว่าเข้าใจกลไก — เตรียมไว้ตอบตอนสัมภาษณ์"],
            ],
          },
          {
            t: "details",
            summary: "เฉลยที่ 2: ตัดคำด้วยมือ (สำหรับตอนที่ห้ามใช้ split)",
            c: [
              { t: "p", c: "interviewer หลายคนจะถามต่อว่า \"ถ้าไม่ให้ใช้ split จะทำยังไง\" — คำตอบคือกวาดด้วย pointer เดียว สลับระหว่างสองสถานะ: กำลังข้ามช่องว่าง กับ กำลังอ่านคำ" },
              {
                t: "codeout",
                lang: "python",
                label: "แบบตัดคำเอง",
                code: `def reverse_words_manual(s: str) -> str:
    words = []
    i, n = 0, len(s)
    while i < n:
        while i < n and s[i] == " ":      # ข้ามช่องว่างทุกตัว
            i += 1
        if i == n:
            break
        start = i
        while i < n and s[i] != " ":      # กวาดจนจบคำ
            i += 1
        words.append(s[start:i])          # เก็บคำที่ตัดได้
    out = []
    for k in range(len(words) - 1, -1, -1):   # ไล่จากคำท้ายมาหน้า
        out.append(words[k])
    return " ".join(out)


for t in ["the sky is blue", "  hello world  ", "a good   example", "   "]:
    print(repr(reverse_words_manual(t)))`,
                out: `'blue is sky the'
'world hello'
'example good a'
''`,
              },
              { t: "p", c: "บรรทัด if i == n: break คือกันกรณีที่ string ลงท้ายด้วยช่องว่าง — ถ้าไม่มี เราจะ append s[n:n] ซึ่งเป็นคำว่างเข้าไป แล้วผลลัพธ์จะมีช่องว่างเกินตอน join (เคสสุดท้าย \"   \" พิสูจน์ว่าโค้ดนี้รอด)" },
              { t: "p", c: "ส่วนคำถามต่อยอดเรื่อง O(1) space: ในภาษาที่ string แก้ได้ (เช่น C++ กับ std::string) ทำได้ด้วยการ reverse ทั้ง string ก่อน แล้ว reverse ตัวอักษรของแต่ละคำกลับ พร้อมกับบีบช่องว่างเกินระหว่างทาง แต่ใน Python ทำไม่ได้จริงเพราะ string เป็น immutable — คำตอบที่ถูกต้องคือบอก interviewer ตรงนี้ไปเลย" },
            ],
          },
        ],
      },

      { t: "callout", title: "💡 สรุป pattern", c: "โจทย์จัดการ string ที่มีช่องว่างยุ่ง ๆ ให้นึกถึง split() เปล่า (ไม่ใส่ตัวคั่น) เป็นอันดับแรก เพราะมันแก้ปัญหาช่องว่างซ้ำ/หัวท้ายให้หมดในคำเดียว — และรู้ให้ได้ด้วยว่าถ้าเขียนเองต้องกวาดสองสถานะสลับกัน" },
      { t: "callout", title: "ต่อยอด (โจทย์พี่น้องกัน)", c: "LC557 Reverse Words in a String III (กลับตัวอักษรในแต่ละคำ), LC186 Reverse Words in a String II, LC58 Length of Last Word, LC1805 Number of Different Integers in a String" },
    ],
  },
};
