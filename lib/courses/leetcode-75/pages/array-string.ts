import type { Page } from "@/lib/types";

export const arrayStringPages: Record<string, Page> = {
  "lc75-intro-array-string": {
    slug: "lc75-intro-array-string",
    title: {
      th: "Array / String — พื้นฐาน & แนวคิด",
      en: "",
    },
    lead: {
      th: "แถวลำดับคือตู้ที่มีเลขช่อง เริ่มที่ 0 — หน้านี้สอนเดินแถวด้วย for/while, หยิบและแก้ของ, และความต่างระหว่าง list กับ string",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "เวลาเขียนโปรแกรม เรามักเก็บของหลายชิ้นเรียงกันเป็นแถว เช่น คะแนนสอบ ตัวอักษรในคำ หรือรายการสินค้า ใน Python แถวของค่าทั่วไปเรียกว่า list ถ้าของในแถวเป็นตัวอักษร แถวนั้นเรียกว่า string",
        },
        {
          t: "p",
          c: "สองอย่างนี้ใช้เลขช่องและลูปแบบเดียวกัน ต่างกันตรงว่า list แก้ของในช่องได้ แต่ string แก้ช่องไม่ได้ หน้านี้จะสอนกลไกนั้นจากต้น ไม่ใช่ท่าแก้โจทย์",
        },

        { t: "h2", c: "ส่วนที่ 1 · แถวมีลำดับ ช่องมีเลข" },
        {
          t: "p",
          c: "นึกภาพ list เป็นตู้ล็อกเกอร์เรียงกันเป็นแถว แต่ละช่องมีเลขติดไว้ เลขนั้นเรียกว่า index (ตำแหน่ง) ของชิ้นแรกไม่ใช่ 1 แต่เป็น 0 เพราะมันนับเป็นระยะทางจากหัวแถว ช่องแรกเดิน 0 ก้าว",
        },
        {
          t: "p",
          c: "len(nums) คือจำนวนช่อง แถวยาว 3 ช่องสุดท้ายจึงเป็น nums[2] ไม่ใช่ nums[3] ส่วน nums[-1] นับจากท้ายหนึ่งช่อง ได้ค่าเดียวกับช่องสุดท้าย",
        },
        { t: "h3", c: "ดูทีละขั้น (Interactive)" },
        {
          t: "p",
          c: "กด **Next ▶** ลูกศรชี้ช่องที่กำลังอ่าน เลขใต้ตู้คือ index · ช่องสุดท้ายของแถวยาว 3 คือเลข 2 · nums[-1] ชี้ช่องเดียวกัน",
        },
        { t: "viz", id: "array-index" },

        { t: "h2", c: "ส่วนที่ 2 · Loop พื้นฐาน" },
        {
          t: "p",
          c: "คำสั่ง loop คือการสั่งให้โปรแกรมประมวลผลคำสั่งเดิมซ้ำ ๆ จนกว่าจะสิ้นสุดเงื่อนไข มีหลายแบบ — แต่ละแบบคือคนละโปรแกรม อย่ามองรวมเป็นโค้ดชุดเดียว",
        },
        {
          t: "p",
          c: "for ใช้เมื่อทราบขอบเขตหรือจำนวนรอบที่แน่นอน เหมาะกับการไล่อ่านของในแถวจากซ้ายไปขวาทีละตัว",
        },
        {
          t: "code",
          lang: "python",
          c: `nums = [10, 20, 30]
for x in nums:
    print(x)  # รอบที่ 1: 10, รอบที่ 2: 20, รอบที่ 3: 30`,
        },
        { t: "h3", c: "ดูทีละขั้น · for" },
        {
          t: "p",
          c: "กด **Next ▶** เขียว = ช่องที่ for กำลังหยิบเป็น x · x เป็นสำเนาค่า ไม่ใช่เลขช่อง",
        },
        { t: "viz", id: "array-loop-for" },

        {
          t: "p",
          c: "while ใช้เมื่อจำนวนรอบขึ้นอยู่กับเงื่อนไข ต้องมีสามอย่างเสมอ: จุดเริ่มต้น → เงื่อนไข → การขยับตำแหน่ง — นี่คนละโปรแกรมจาก for ด้านบน แม้เดินแถวเดียวกัน",
        },
        {
          t: "code",
          lang: "python",
          c: `nums = [10, 20, 30]
i = 0                 # 1. จุดเริ่มต้น (index เริ่มที่ 0)
while i < len(nums):  # 2. เงื่อนไข
    print(nums[i])
    i += 1            # 3. ขยับ — ถ้าขาด วนไม่สิ้นสุด`,
        },
        { t: "h3", c: "ดูทีละขั้น · while" },
        {
          t: "p",
          c: "กด **Next ▶** ส้ม = ช่องที่ i ชี้อยู่ · ดูบรรทัด i += 1 ให้ดี ถ้าหายลูปไม่จบ",
        },
        { t: "viz", id: "array-loop-while" },

        {
          t: "p",
          c: "ถ้าต้องการเลขช่องแต่ไม่เขียน while เอง ใช้ for i in range(len(nums)) — อีกโปรแกรมหนึ่ง Python ขยับ i ให้ และแก้ nums[i] ได้ ซึ่ง for x in nums ทำไม่ได้เพราะ x เป็นแค่สำเนาค่า",
        },
        {
          t: "code",
          lang: "python",
          c: `nums = [10, 20, 30]
for i in range(len(nums)):
    print(i, nums[i])  # มีทั้งเลขช่องและค่าในช่อง`,
        },
        { t: "h3", c: "ดูทีละขั้น · range" },
        {
          t: "p",
          c: "กด **Next ▶** ฟ้า = ช่องที่ i จาก range · ได้เลขช่องเหมือน while แต่ไม่ต้องเขียน i += 1 เอง",
        },
        { t: "viz", id: "array-loop-range" },

        { t: "h2", c: "ส่วนที่ 3 · หยิบหลายช่องติดกัน: slice" },
        {
          t: "p",
          c: "nums[i] หยิบช่องเดียว nums[เริ่ม:จบ] หยิบช่วง เรียกว่า slice (การตัดช่วง) เลขจบไม่ถูกรวม ดังนั้น nums[1:3] คือช่อง 1 กับ 2",
        },
        {
          t: "codeout",
          lang: "python",
          label: "slice ไม่รวมปลาย และได้สำเนา",
          code: `nums = [10, 20, 30, 40, 50]
print(nums[1:3])
part = nums[1:3]
part.append(99)
print("part", part)
print("nums", nums)`,
          out: `[20, 30]
part [20, 30, 99]
nums [10, 20, 30, 40, 50]`,
        },
        {
          t: "p",
          c: "slice ได้ list ก้อนใหม่ การแก้ part จึงไม่แตะ nums เดิม",
        },

        { t: "h2", c: "ส่วนที่ 4 · แก้ค่า เพิ่ม ลบ" },
        {
          t: "p",
          c: "list แก้ของในช่องได้โดยยังเป็นแถวเดิม nums[i] = ค่าใหม่ เขียนทับช่องนั้น append ต่อท้าย pop หยิบช่องท้ายออก insert ยัดของกลางแถว แล้วช่องทางขวาต้องถอยให้ที่",
        },
        {
          t: "codeout",
          lang: "python",
          label: "เขียนทับ, ต่อท้าย, หยิบออก",
          code: `nums = [10, 20, 30]
nums[1] = 99
nums.append(40)
print(nums)
print("pop ท้าย:", nums.pop())
print("หลัง pop:", nums)`,
          out: `[10, 99, 30, 40]
pop ท้าย: 40
หลัง pop: [10, 99, 30]`,
        },
        {
          t: "table",
          head: ["คำสั่ง", "ทำอะไร", "เวลาโดยประมาณ"],
          rows: [
            ["nums[i]", "อ่านหรือเขียนช่อง i", "O(1)"],
            ["nums.append(x)", "ต่อท้าย", "O(1) เฉลี่ย"],
            ["nums.pop()", "หยิบช่องท้ายออก", "O(1)"],
            ["nums.insert(0, x)", "ยัดหัวแถว แล้วขยับของทุกตัว", "O(n)"],
            ["x in nums", "ไล่หาทั้งแถว", "O(n)"],
          ],
        },
        {
          t: "p",
          c: "O(1) กับ O(n) มาจากหน้า Big-O: แตะช่องเดียวไม่โตตามความยาวแถว การขยับทั้งแถวโตตามจำนวนช่อง",
        },
        { t: "h3", c: "ดูทีละขั้น · insert" },
        {
          t: "p",
          c: "กด **Next ▶** insert ที่หัวแถวต้องถอยของทุกตัวไปขวาทีละช่อง",
        },
        { t: "viz", id: "array-insert-shift" },
        { t: "h3", c: "ดูทีละขั้น · append" },
        {
          t: "p",
          c: "กด **Next ▶** append วางท้ายได้เลยไม่ขยับใคร — คนละโปรแกรมจาก insert ด้านบน",
        },
        { t: "viz", id: "array-append" },

        { t: "h2", c: "ส่วนที่ 5 · string ก็เป็นแถว แต่แก้ช่องไม่ได้" },
        {
          t: "p",
          c: "string คือแถวของตัวอักษร ใช้ index, len, for, slice ได้เหมือน list แต่เขียน s[0] = \"H\" ไม่ได้ ทุกการเปลี่ยนคือสร้างข้อความก้อนใหม่",
        },
        {
          t: "codeout",
          lang: "python",
          label: "แก้ช่องของ string ไม่ได้",
          code: `s = "cat"
s[0] = "C"`,
          out: `TypeError: 'str' object does not support item assignment`,
        },
        {
          t: "p",
          c: "อีกเรื่องของ list: บรรทัด b = a ไม่ได้คัดลอกแถว แค่ตั้งชื่อใหม่ให้ก้อนเดิม ใครแก้ อีกชื่อก็เห็น เรียกว่า aliasing (หลายชื่อชี้ก้อนเดียว)",
        },
        { t: "h3", c: "ดูทีละขั้น · alias ของ list" },
        {
          t: "p",
          c: "กด **Next ▶** เขียว a / ฟ้า b = สองชื่อชี้แถวเดียว เติมช่องแล้วทั้งคู่เห็น",
        },
        { t: "viz", id: "array-alias" },
        {
          t: "p",
          c: "string ไม่เจอแบบนี้ตอนต่อข้อความ เพราะการต่อสร้างก้อนใหม่ — คนละโปรแกรมจาก alias ด้านบน",
        },
        { t: "h3", c: "ดูทีละขั้น · ต่อ string แล้วชื่อย้ายป้าย" },
        {
          t: "p",
          c: "กด **Next ▶** พอต่อ string ชื่อ t ย้ายไปป้ายใหม่ ป้าย hello เก่ายังอยู่",
        },
        { t: "viz", id: "array-str-rebind" },

        { t: "h2", c: "ส่วนที่ 6 · ต่อข้อความ" },
        {
          t: "p",
          c: "เพราะ string แก้ในที่เดิมไม่ได้ บรรทัด s = s + c จึงสลักป้ายใหม่ทั้งป้ายทุกรอบ รอบหลัง ๆ ต้องคัดลอกของเก่าทั้งหมดอีก ทางที่คัดลอกแต่ละตัวครั้งเดียวคือเก็บชิ้นส่วนใน list แล้ว \"\".join ตอนท้าย",
        },
        { t: "h3", c: "ดูทีละขั้น · ต่อด้วย +=" },
        {
          t: "p",
          c: "กด **Next ▶** นับจำนวนตัวที่คัดลอกแต่ละรอบเมื่อใช้ +=",
        },
        { t: "viz", id: "array-concat" },
        { t: "h3", c: "ดูทีละขั้น · join" },
        {
          t: "p",
          c: "กด **Next ▶** join สลักป้ายเดียว คัดลอกแต่ละตัวครั้งเดียว — คนละโปรแกรมจาก += ด้านบน",
        },
        { t: "viz", id: "array-join" },

        { t: "h2", c: "ส่วนที่ 7 · ลูปซ้อน และแถวสองชั้น" },
        {
          t: "p",
          c: "ลูปซ้อนคือลูปในลูป ลูปนอกเดินหนึ่งก้าว ลูปในทำงานครบรอบของมัน ตารางหรือ list ที่ข้างในเป็น list อีกชั้น เข้าถึงด้วย grid[แถว][ช่อง] เช่น grid[1][2] คือแถวที่ 1 ช่องที่ 2",
        },
        {
          t: "p",
          c: "ถ้าแถวยาว n ทั้งลูปนอกและลูปใน จำนวนรอบประมาณ n × n ดูหน้า Big-O ว่าอันนี้คือ O(n²)",
        },
        { t: "h3", c: "ดูทีละขั้น (Interactive)" },
        {
          t: "p",
          c: "กด **Next ▶** ลูปนอกเลือกแถว ลูปในเดินช่องในแถวนั้นจนหมด แล้วลูปนอกลงแถวถัดไป · เขียว = ช่องที่ print อยู่",
        },
        { t: "viz", id: "array-nested" },

        { t: "h2", c: "ส่วนที่ 8 · เครื่องมือที่ Python มีให้" },
        {
          t: "p",
          c: "sorted(nums) คืน list ใหม่ที่เรียงแล้ว ไม่ได้แก้ nums เดิม sorted บน string คืน list ของตัวอักษร ถ้าอยากได้ string กลับมาต้อง join",
        },
        {
          t: "codeout",
          lang: "python",
          label: "sorted มีให้ใช้ ไม่ต้องเขียนอัลกอริทึมเรียงเอง",
          code: `print(sorted([3, 1, 2]))
print(sorted("bac"))
print("".join(sorted("bac")))`,
          out: `[1, 2, 3]
['a', 'b', 'c']
abc`,
        },
        {
          t: "table",
          head: ["", "list", "string"],
          rows: [
            ["เรียงเป็นแถว มี index เริ่ม 0", "ใช่", "ใช่"],
            ["เดินด้วย for / while", "ใช่", "ใช่"],
            ["แก้ช่อง nums[i] = …", "ได้", "ไม่ได้"],
            ["ต่อท้าย", "append", "สร้างก้อนใหม่ หรือ join"],
            ["b = a", "สองชื่อชี้ก้อนเดียว", "ต่อข้อความแล้วได้ก้อนใหม่"],
          ],
        },
      ],
      en: [],
    },
  },

  "lc75-p01": {
    slug: "lc75-p01",
    title: {
      th: "ข้อ 1 · LC1768 Merge Strings Alternately 🟢",
      en: "1 · LC1768 Merge Strings Alternately 🟢",
    },
    lead: { th: "", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `กำหนดสตริงสองตัว word1 และ word2 มาให้ จงรวมสตริงโดยเพิ่มตัวอักษรสลับกันทีละตัว โดยเริ่มจาก word1 ถ้าสตริงใดยาวกว่าอีกสตริง ให้ต่อตัวอักษรที่เหลือไว้ท้ายสตริงที่รวมแล้ว

ให้ return สตริงที่รวมแล้ว`,
        },
        {
          t: "example",
          c: [
            {
              input: 'word1 = "abc", word2 = "pqr"',
              output: '"apbqcr"',
              explain: `สตริงที่รวมแล้วจะรวมกันดังนี้:
word1: a b c
word2: p q r
merged: a p b q c r`,
            },
            {
              input: 'word1 = "ab", word2 = "pqrs"',
              output: '"apbqrs"',
              explain: `สังเกตว่า word2 ยาวกว่า "rs" จึงถูกต่อท้าย
word1: a b
word2: p q r s
merged: a p b q r s`,
            },
            {
              input: 'word1 = "abcd", word2 = "pq"',
              output: '"apbqcd"',
              explain: `สังเกตว่า word1 ยาวกว่า "cd" จึงถูกต่อท้าย
word1: a b c d
word2: p q
merged: a p b q c d`,
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= word1.length, word2.length <= 100",
            "word1 และ word2 ประกอบด้วยตัวอักษรอังกฤษพิมพ์เล็ก",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "อ่านโจทย์กับตัวอย่างให้ครบ แล้วลองเขียนเองก่อน ถ้าติดค่อยเปิดเฉลย",
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "มีสองแถวของตัวอักษร หยิบทีละตัวสลับกัน เริ่มจาก word1 เสมอ พอแถวหนึ่งหมด ตัวที่เหลือของอีกแถวต่อท้ายติดกันจนหมด — คืนเป็นสตริงเดียว",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: 'ใช้ Example 2 · word1 = "ab", word2 = "pqrs"',
            },
            {
              t: "ul",
              c: [
                "รอบ 1: หยิบ a จาก word1 แล้ว p จาก word2 → ได้ ap",
                "รอบ 2: หยิบ b จาก word1 แล้ว q จาก word2 → ได้ apbq",
                "word1 หมดแล้ว เหลือ r กับ s ของ word2 → ต่อท้ายได้ apbqrs",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "จะประกอบสี่ชิ้น: กล่องเก็บตัวอักษร · เลขช่องสองฝั่ง · ลูปหยิบสลับตราบที่ทั้งคู่ยังมีตัว · แล้วต่อส่วนที่เหลือด้วย slice",
            },
            {
              t: "ul",
              c: [
                "res (list) — เก็บตัวอักษรทีละตัว แล้ว join ทีเดียวตอนท้าย (เรื่อง join กับ += จากหน้าแนวคิด)",
                "i, j — เลขช่องของ word1 และ word2 เริ่มที่ 0",
                "while … and … — วนเฉพาะตอนทั้งสองฝั่งยังมีตัวเหลือ",
                "slice word1[i:] / word2[j:] — ตัวที่ยังไม่ถูกหยิบหลังลูปจบ",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 1 · ใน Python เก็บตัวอักษรใน list ก่อน อย่าต่อสตริงทีละรอบ:",
            },
            {
              t: "code",
              lang: "python",
              label: "ตั้งต้นกล่องคำตอบ",
              c: `res = []`,
            },
            {
              t: "ul",
              c: [
                "สมาชิกใน res = ตัวอักษรที่จะเรียงเป็นคำตอบ",
                "res.append(ch) = ต่อท้ายตัวอักษรหนึ่งตัว",
                'ตอนจบใช้ "".join(res) สลักเป็นสตริงเดียว',
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 2 · ถือเลขช่องของแต่ละฝั่ง เริ่มที่หัวแถว:",
            },
            {
              t: "code",
              lang: "python",
              label: "สองนิ้วชี้หัวแถว",
              c: `i = j = 0`,
            },
            {
              t: "ul",
              c: [
                "i = เลขช่องของ word1 ที่กำลังจะหยิบ",
                "j = เลขช่องของ word2 ที่กำลังจะหยิบ",
                'บน Example 2 เริ่ม i = 0 (ชี้ a) · j = 0 (ชี้ p)',
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 3 · ลูปหยิบสลับ — เงื่อนไขใช้ and จึงหยุดทันทีที่ฝั่งใดฝั่งหนึ่งหมด:",
            },
            {
              t: "code",
              lang: "python",
              label: "หยิบ word1 ก่อน แล้ว word2 — ยังไม่ใช่คำตอบเต็ม",
              c: `while i < len(word1) and j < len(word2):
    res.append(word1[i])
    i += 1
    res.append(word2[j])
    j += 1`,
            },
            {
              t: "ul",
              c: [
                "i < len(word1) = word1 ยังมีตัวที่ยังไม่หยิบ",
                "j < len(word2) = word2 ยังมีตัวที่ยังไม่หยิบ",
                "and = ต้องจริงทั้งคู่ถึงเข้าลูป — ฝั่งใดหมด ลูปหยุดทันที",
                "ในลูปหยิบ word1[i] ก่อนเสมอ แล้วขยับ i · ตามด้วย word2[j] แล้วขยับ j",
                'บน Example 2 หลังสองรอบ: i = 2, j = 2, res = [\'a\', \'p\', \'b\', \'q\']',
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 4 · ส่วนที่เหลือ — ตอนลูปหยุด i กับ j ค้างที่ตัวแรกที่ยังไม่ได้หยิบ ฝั่งที่หมดแล้ว slice ได้สตริงว่าง:",
            },
            {
              t: "code",
              lang: "python",
              label: "ต่อส่วนเหลือทั้งสองฝั่ง",
              c: `return "".join(res) + word1[i:] + word2[j:]`,
            },
            {
              t: "ul",
              c: [
                '"".join(res) = สลักตัวที่หยิบสลับแล้วเป็นสตริง',
                "word1[i:] = ตัวที่เหลือของ word1 ตั้งแต่ช่อง i เป็นต้นไป",
                "word2[j:] = ตัวที่เหลือของ word2 ตั้งแต่ช่อง j เป็นต้นไป",
                'บน Example 2: word1[2:] = "" · word2[2:] = "rs" → ได้ "apbqrs"',
                "ไม่ต้อง if แยกว่าใครเหลือ — ฝั่งที่หมดได้สตริงว่างเอง",
              ],
            },

            {
              t: "p",
              c: "ประกอบสี่ชิ้น: ตั้ง res กับ i, j → วน while หยิบสลับ → จบด้วย join + slice ส่วนเหลือ",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: 'กด **Next ▶** บน Example 2 · word1 = "ab", word2 = "pqrs" · เขียว = กำลังหยิบจาก word1 · ส้ม = จาก word2 · ทอง = ส่วนที่เหลือหลังลูปจบ · ดู i กับ j ตอน while หยุด',
            },
            { t: "viz", id: "merge-alternately" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        res = []
        i = j = 0
        while i < len(word1) and j < len(word2):
            res.append(word1[i])  # หยิบจาก word1 ก่อน
            i += 1
            res.append(word2[j])  # แล้วค่อย word2
            j += 1
        # ฝั่งที่หมดแล้ว slice ได้ "" จึงต่อท้ายได้เลย
        return "".join(res) + word1[i:] + word2[j:]`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                "res = [] ตามชิ้นที่ 1 — กล่องเก็บตัวอักษร",
                "i = j = 0 ตามชิ้นที่ 2 — บน Example 2 ชี้ a กับ p",
                "while ใช้ and ตามชิ้นที่ 3 — หลังสองรอบ i = 2 ทำให้ลูปหยุด แม้ j ยังเหลือ",
                "ในลูปหยิบ word1 ก่อนเสมอ แล้วขยับช่องนั้น",
                'หลังลูป "".join(res) + word1[i:] + word2[j:] ตามชิ้นที่ 4 → "apbq" + "" + "rs"',
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(n + m) แตะทุกตัวอักษรครั้งเดียว · หน่วยความจำ O(n + m) สำหรับสตริงคำตอบ (n = ความยาว word1, m = ความยาว word2)",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string.

Return the merged string.`,
        },
        {
          t: "example",
          c: [
            {
              input: 'word1 = "abc", word2 = "pqr"',
              output: '"apbqcr"',
              explain: `The merged string will be merged as so:
word1: a b c
word2: p q r
merged: a p b q c r`,
            },
            {
              input: 'word1 = "ab", word2 = "pqrs"',
              output: '"apbqrs"',
              explain: `Notice that as word2 is longer, "rs" is appended to the end.
word1: a b
word2: p q r s
merged: a p b q r s`,
            },
            {
              input: 'word1 = "abcd", word2 = "pq"',
              output: '"apbqcd"',
              explain: `Notice that as word1 is longer, "cd" is appended to the end.
word1: a b c d
word2: p q
merged: a p b q c d`,
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= word1.length, word2.length <= 100",
            "word1 and word2 consist of lowercase English letters.",
          ],
        },
      ],
    },
  },

  "lc75-p02": {
    slug: "lc75-p02",
    title: {
      th: "ข้อ 2 · LC1071 Greatest Common Divisor of Strings 🟢",
      en: "2 · LC1071 Greatest Common Divisor of Strings 🟢",
    },
    lead: { th: "", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `สำหรับสตริงสองตัว s และ t เราจะบอกว่า "t หาร s" ก็ต่อเมื่อ s = t + t + t + ... + t + t (คือ t ถูกต่อเข้ากับตัวเองหนึ่งครั้งหรือมากกว่า)

  กำหนดสตริงสองตัวคือ str1 และ str2 มาให้ ให้ return สตริง x ที่ยาวที่สุดที่หารได้ทั้ง str1 และ str2`,
        },
        {
          t: "example",
          c: [
            {
              input: 'str1 = "ABCABC", str2 = "ABC"',
              output: '"ABC"',
            },
            {
              input: 'str1 = "ABABAB", str2 = "ABAB"',
              output: '"AB"',
            },
            {
              input: 'str1 = "LEET", str2 = "CODE"',
              output: '""',
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= str1.length, str2.length <= 1000",
            "str1 และ str2 ประกอบด้วยตัวอักษรอังกฤษพิมพ์ใหญ่",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "อ่านโจทย์กับตัวอย่างให้ครบ แล้วลองเขียนเองก่อน ถ้าติดค่อยเปิดเฉลย",
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: 'คำว่า "หาร" ในข้อนี้ไม่ใช่หารเลข — โจทย์นิยามเองว่า t หาร s ได้เมื่อต่อ t ซ้ำหลายก้อนแล้วได้ s พอดี โจทย์ขอสตริง x ที่ยาวที่สุดซึ่งต่อซ้ำแล้วได้ทั้ง str1 และ str2 ถ้าไม่มีเลยให้คืนสตริงว่าง',
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: 'ใช้ Example 2 · str1 = "ABABAB", str2 = "ABAB"',
            },
            {
              t: "ul",
              c: [
                'str1 ยาว 6 · str2 ยาว 4 — บล็อกที่ต่อเป็นทั้งคู่ได้ ความยาวต้องหารทั้ง 6 และ 4 ลงตัว',
                "ตัวเลขที่ใหญ่ที่สุดที่หารทั้งคู่ลงตัวคือ 2 (ห.ร.ม. ของ 6 กับ 4)",
                'ตัดหัว str1 ความยาว 2 ได้ "AB"',
                '"AB" + "AB" + "AB" = "ABABAB" ✓ และ "AB" + "AB" = "ABAB" ✓ → คำตอบคือ "AB"',
                'สังเกตว่า "ABAB" ยาวกว่า แต่ 6 หารด้วย 4 ไม่ลงตัว ต่อเป็น str1 ไม่ได้',
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "จะประกอบสี่ชิ้น: หาความยาวที่เป็นไปได้ด้วย ห.ร.ม. · ตัดหัวเป็นบล็อกผู้ท้าชิง · ฟังก์ชันเช็คว่าต่อซ้ำแล้วได้สตริงเดิมไหม · แล้วคืนบล็อกถ้าผ่านทั้งคู่ (ไม่งั้นคืนสตริงว่าง)",
            },
            {
              t: "ul",
              c: [
                "math.gcd — หาความยาวที่หารทั้งสองความยาวลงตัวและใหญ่ที่สุด มีตัวเลือกเดียว",
                "cand = str1[:g] — บล็อกที่จะลอง (ตัดจาก str1 หรือ str2 ก็ได้ผลเดียวกันถ้ามีคำตอบจริง)",
                "divides(block, s) — ต่อ block ซ้ำ len(s)//len(block) ครั้ง แล้วเทียบกับ s",
                "if ทั้งคู่ผ่าน → return cand · else → return \"\"",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 1 · ความยาวของบล็อกต้องหารความยาวทั้งสองลงตัว ค่าที่ยาวที่สุดจึงเป็น ห.ร.ม. (greatest common divisor) ของสองความยาว — Python มี math.gcd ให้ใช้:",
            },
            {
              t: "code",
              lang: "python",
              label: "ความยาวที่เป็นไปได้มีค่าเดียว",
              c: `g = math.gcd(len(str1), len(str2))`,
            },
            {
              t: "ul",
              c: [
                "len(str1), len(str2) = ความยาวของสองสตริง",
                "math.gcd(a, b) = จำนวนเต็มบวกที่ใหญ่ที่สุดซึ่งหารทั้ง a และ b ลงตัว",
                "บน Example 2: math.gcd(6, 4) = 2",
                "ห.ร.ม. บอกได้แค่ความยาว — ยังไม่ได้รับประกันว่าตัวอักษรตรง",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 2 · ตัดหัว str1 ตามความยาว g เป็นบล็อกผู้ท้าชิง:",
            },
            {
              t: "code",
              lang: "python",
              label: "บล็อกที่จะลอง",
              c: `cand = str1[:g]`,
            },
            {
              t: "ul",
              c: [
                "str1[:g] = ตัวอักษรตั้งแต่ช่อง 0 ถึงช่อง g-1",
                'บน Example 2: cand = "AB"',
                "ถ้ามีคำตอบจริง ตัดจาก str2[:g] ก็ได้บล็อกเดียวกัน",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 3 · เช็คว่าบล็อกต่อซ้ำแล้วได้สตริงเดิมเป๊ะ — ใน Python การคูณสตริงทำซ้ำให้:",
            },
            {
              t: "code",
              lang: "python",
              label: "ต่อบล็อกซ้ำแล้วเทียบ",
              c: `def divides(block: str, s: str) -> bool:
      return block * (len(s) // len(block)) == s`,
            },
            {
              t: "ul",
              c: [
                "len(s) // len(block) = จำนวนครั้งที่ต้องต่อ (หารลงตัวเพราะ g หารความยาวแล้ว)",
                'block * k = ต่อ block ซ้ำ k ครั้ง เช่น "AB" * 3 = "ABABAB"',
                "== s = ต้องได้สตริงเดิมทุกตัวอักษร ไม่ใช่แค่ความยาวตรง",
                'บน Example 2: divides("AB", "ABABAB") เป็น True · divides("AB", "ABAB") เป็น True',
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 4 · ผ่านทั้งคู่ค่อยคืนบล็อก ไม่งั้นคืนสตริงว่าง:",
            },
            {
              t: "code",
              lang: "python",
              label: "ตอบเมื่อหารได้ทั้งคู่",
              c: `if divides(cand, str1) and divides(cand, str2):
      return cand
  return ""`,
            },
            {
              t: "ul",
              c: [
                "and = ต้องหารได้ทั้ง str1 และ str2",
                'บน Example 2 ทั้งคู่ True → return "AB"',
                'บน Example 3 · str1 = "LEET", str2 = "CODE" → cand = "LEET" แต่หาร str2 ไม่ได้ → return ""',
              ],
            },

            {
              t: "p",
              c: 'ประกอบสี่ชิ้น: คำนวณ g → ตัด cand → เช็ค divides ทั้งคู่ → คืน cand หรือ "" — มีทางลัดอีกแบบคือเช็ค str1 + str2 == str2 + str1 ก่อน แล้วค่อยตัดหัวตาม gcd (สั้นกว่า แต่ต้องอาศัยทฤษฎีว่าทำไมถึงพอ); วิธี divides อ่านแล้วอธิบายได้ทุกบรรทัด จึงใช้เป็นคำตอบหลัก',
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: 'กด **Next ▶** บน Example 2 · str1 = "ABABAB", str2 = "ABAB" · เห็นความยาว gcd · บล็อก candidate "AB" · แล้วเช็ค divides ทั้งสองฝั่ง',
            },
            { t: "viz", id: "gcd-of-strings" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `import math

  class Solution:
      def gcdOfStrings(self, str1: str, str2: str) -> str:
          def divides(block: str, s: str) -> bool:
              # ต่อบล็อกซ้ำแล้วต้องได้ s เป๊ะ
              return block * (len(s) // len(block)) == s

          g = math.gcd(len(str1), len(str2))  # ความยาวที่เป็นไปได้มีค่าเดียว
          cand = str1[:g]  # ตัดหัวมาเป็นบล็อกที่จะลอง

          if divides(cand, str1) and divides(cand, str2):
              return cand
          return ""`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                "math.gcd(len(str1), len(str2)) ตามชิ้นที่ 1 — บน Example 2 ได้ g = 2",
                'cand = str1[:g] ตามชิ้นที่ 2 — ได้ "AB"',
                'divides ตามชิ้นที่ 3 — "AB"*3 ได้ str1 และ "AB"*2 ได้ str2',
                'if … and … ตามชิ้นที่ 4 — ทั้งคู่ผ่าน จึง return "AB"',
                'ถ้าเป็น Example 3 ฝั่ง str2 ไม่ผ่าน → ตกไป return ""',
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(n + m) การสร้างและเทียบสตริงทำงานตามความยาวรวม · หน่วยความจำ O(n + m) จากสตริงที่สร้างตอนคูณบล็อก (n = ความยาว str1, m = ความยาว str2)",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `For two strings s and t, we say "t divides s" if and only if s = t + t + t + ... + t + t (i.e., t is concatenated with itself one or more times).

  Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.`,
        },
        {
          t: "example",
          c: [
            {
              input: 'str1 = "ABCABC", str2 = "ABC"',
              output: '"ABC"',
            },
            {
              input: 'str1 = "ABABAB", str2 = "ABAB"',
              output: '"AB"',
            },
            {
              input: 'str1 = "LEET", str2 = "CODE"',
              output: '""',
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= str1.length, str2.length <= 1000",
            "str1 and str2 consist of English uppercase letters.",
          ],
        },
      ],
    },
},
  "lc75-p03": {
    slug: "lc75-p03",
    title: {
      th: "ข้อ 3 · LC1431 Kids With the Greatest Number of Candies 🟢",
      en: "3 · LC1431 Kids With the Greatest Number of Candies 🟢",
    },
    lead: { th: "", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `มีเด็ก n คนพร้อมลูกอม (candies) คุณได้รับอาร์เรย์จำนวนเต็ม candies โดย candies[i] แทนจำนวนลูกอมที่เด็กคนที่ i มี และจำนวนเต็ม extraCandies แทนจำนวนลูกอมพิเศษที่คุณมี

  ให้ return อาร์เรย์บูลีน result ความยาว n โดย result[i] เป็น true ถ้าหลังจากให้ลูกอมพิเศษทั้งหมดกับเด็กคนที่ i แล้ว เขาจะมีลูกอมมากที่สุดในบรรดาเด็กทั้งหมด หรือ false ถ้าไม่ใช่

  หมายเหตุ: เด็กหลายคนสามารถมีลูกอมมากที่สุดพร้อมกันได้`,
        },
        {
          t: "example",
          c: [
            {
              input: "candies = [2,3,5,1,3], extraCandies = 3",
              output: "[true,true,true,false,true]",
              explain: `ถ้าให้ลูกอมพิเศษทั้งหมดกับ:
  - เด็กคนที่ 1 จะได้ 2 + 3 = 5 เม็ด ซึ่งมากที่สุดในบรรดาเด็ก
  - เด็กคนที่ 2 จะได้ 3 + 3 = 6 เม็ด ซึ่งมากที่สุดในบรรดาเด็ก
  - เด็กคนที่ 3 จะได้ 5 + 3 = 8 เม็ด ซึ่งมากที่สุดในบรรดาเด็ก
  - เด็กคนที่ 4 จะได้ 1 + 3 = 4 เม็ด ซึ่งไม่มากที่สุดในบรรดาเด็ก
  - เด็กคนที่ 5 จะได้ 3 + 3 = 6 เม็ด ซึ่งมากที่สุดในบรรดาเด็ก`,
            },
            {
              input: "candies = [4,2,1,1,2], extraCandies = 1",
              output: "[true,false,false,false,false]",
              explain:
                "มีลูกอมพิเศษแค่ 1 เม็ด\nเด็กคนที่ 1 จะมีลูกอมมากที่สุดเสมอ แม้จะให้ลูกอมพิเศษกับเด็กคนอื่นก็ตาม",
            },
            {
              input: "candies = [12,1,12], extraCandies = 10",
              output: "[true,false,true]",
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
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "อ่านโจทย์กับตัวอย่างให้ครบ แล้วลองเขียนเองก่อน ถ้าติดค่อยเปิดเฉลย",
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "มีเด็กหลายคน แต่ละคนถือลูกอมอยู่แล้ว คุณมีลูกอมพิเศษก้อนหนึ่ง — ยกให้ลองทีละคน (ไม่ได้ให้จริง และไม่ได้แบ่ง) แล้วถามว่าคนนั้นจะเสมอกับหรือแซงคนที่ถือเยอะสุดในกลุ่มไหม คืนลิสต์ true/false ทีละคน โจทย์บอกชัดว่ามีที่หนึ่งหลายคนพร้อมกันได้",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ใช้ Example 1 · candies = [2, 3, 5, 1, 3], extraCandies = 3",
            },
            {
              t: "ul",
              c: [
                "คนที่ถือเยอะสุดตอนเริ่มคือ 5 → นี่คือเกณฑ์ที่ใช้เทียบทุกคน",
                "เด็ก 0: 2 + 3 = 5 ≥ 5 → true (เท่ากับเกณฑ์ก็นับว่าใช่)",
                "เด็ก 1: 3 + 3 = 6 ≥ 5 → true",
                "เด็ก 2: 5 + 3 = 8 ≥ 5 → true",
                "เด็ก 3: 1 + 3 = 4 ≥ 5 → false",
                "เด็ก 4: 3 + 3 = 6 ≥ 5 → true",
                "เกณฑ์ยังเป็น 5 ตลอด — เพราะ extras เป็นการสมมติทีละคน ไม่ได้แก้ค่าใน candies",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "จะประกอบสองชิ้น: หาค่าสูงสุดครั้งเดียวก่อนเข้าลูป · แล้ววนทีละคนเทียบ c + extraCandies กับเกณฑ์นั้นด้วย >=",
            },
            {
              t: "ul",
              c: [
                "best = max(candies) — เกณฑ์คงที่ เพราะเด็กคนอื่นไม่เคยได้ลูกอมเพิ่มจริง",
                "c + extraCandies >= best — สมมติว่าให้คนนี้ทั้งก้อน ใช้ >= เพราะเสมอก็นับ",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 1 · หาจำนวนลูกอมที่มากที่สุดในกลุ่มครั้งเดียวก่อนเข้าลูป ค่านี้ไม่เปลี่ยนระหว่างวน:",
            },
            {
              t: "code",
              lang: "python",
              label: "เกณฑ์หาครั้งเดียว",
              c: `best = max(candies)`,
            },
            {
              t: "ul",
              c: [
                "max(candies) = สมาชิกที่ใหญ่ที่สุดในลิสต์",
                "บน Example 1: best = 5",
                "คำนวณนอกลูป เพราะทุกคนเทียบกับเกณฑ์เดิม — ไม่ต้องหา max ใหม่ทุกรอบ",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 2 · วนทีละคน สมมติว่าได้ extras ทั้งก้อน แล้วเทียบกับ best — ไม่เขียนกลับลง candies:",
            },
            {
              t: "code",
              lang: "python",
              label: "สมมติทีละคน แล้วเทียบด้วย >=",
              c: `return [c + extraCandies >= best for c in candies]`,
            },
            {
              t: "ul",
              c: [
                "c = จำนวนลูกอมที่เด็กคนนั้นถืออยู่ตอนเริ่ม",
                "c + extraCandies = จำนวนหลังสมมติว่าได้ก้อนพิเศษ (ไม่ได้แก้ค่าใน candies)",
                ">= best = เสมอกับหรือมากกว่าคนที่ถือเยอะสุด — โจทย์นับเสมอว่าใช่",
                "บน Example 1 เด็กคนแรกได้ 5 ≥ 5 เป็น true ถ้าใช้ > จะผิดเป็น false",
                "list comprehension สร้างลิสต์คำตอบทีละคนโดยไม่แตะลิสต์ต้นฉบับ",
              ],
            },

            {
              t: "p",
              c: "ประกอบสองชิ้น: หา best ครั้งเดียว → สร้างลิสต์ด้วยการเทียบ c + extraCandies >= best ทีละคน",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** บน Example 1 · candies = [2, 3, 5, 1, 3], extraCandies = 3 · ไฮไลต์ best = 5 แล้วเดินทีละเด็ก เทียบ c + extra กับเกณฑ์",
            },
            { t: "viz", id: "kids-candies" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `class Solution:
      def kidsWithCandies(self, candies: list[int], extraCandies: int) -> list[bool]:
          best = max(candies)  # เกณฑ์ หาครั้งเดียว เพราะไม่เคยเปลี่ยน

          # >= เพราะเสมอกับคนที่มากที่สุดก็นับว่าใช่
          # ไม่แก้ค่าใน candies — extras เป็นแค่การสมมติ
          return [c + extraCandies >= best for c in candies]`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                "best = max(candies) ตามชิ้นที่ 1 — บน Example 1 ได้ 5",
                "for c in candies ซ่อนใน list comprehension ตามชิ้นที่ 2 — เดิน [2, 3, 5, 1, 3]",
                "เด็กคนแรก 2 + 3 = 5 >= 5 → True (จุดที่ >= สำคัญ)",
                "เด็กคนที่ถือ 1 ได้ 4 >= 5 → False ส่วนคนอื่นผ่าน",
                "ได้ [True, True, True, False, True] โดยไม่แตะ candies ต้นฉบับ",
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(n) กวาดหา max หนึ่งรอบ แล้วสร้างคำตอบอีกหนึ่งรอบ · หน่วยความจำ O(n) สำหรับลิสต์คำตอบ (โจทย์ขอลิสต์กลับมา จึงเลี่ยงไม่ได้)",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `There are n kids with candies. You are given an integer array candies, where each candies[i] represents the number of candies the ith kid has, and an integer extraCandies, denoting the number of extra candies that you have.

  Return a boolean array result of length n, where result[i] is true if, after giving the ith kid all the extraCandies, they will have the greatest number of candies among all the kids, or false otherwise.

  Note that multiple kids can have the greatest number of candies.`,
        },
        {
          t: "example",
          c: [
            {
              input: "candies = [2,3,5,1,3], extraCandies = 3",
              output: "[true,true,true,false,true]",
              explain: `If you give all extraCandies to:
  - Kid 1, they will have 2 + 3 = 5 candies, which is the greatest among the kids.
  - Kid 2, they will have 3 + 3 = 6 candies, which is the greatest among the kids.
  - Kid 3, they will have 5 + 3 = 8 candies, which is the greatest among the kids.
  - Kid 4, they will have 1 + 3 = 4 candies, which is not the greatest among the kids.
  - Kid 5, they will have 3 + 3 = 6 candies, which is the greatest among the kids.`,
            },
            {
              input: "candies = [4,2,1,1,2], extraCandies = 1",
              output: "[true,false,false,false,false]",
              explain:
                "There is only 1 extra candy.\nKid 1 will always have the greatest number of candies, even if a different kid is given the extra candy.",
            },
            {
              input: "candies = [12,1,12], extraCandies = 10",
              output: "[true,false,true]",
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
          ],
        },
      ],
    },
},
  "lc75-p04": {
    slug: "lc75-p04",
    title: {
      th: "ข้อ 4 · LC605 Can Place Flowers 🟢",
      en: "4 · LC605 Can Place Flowers 🟢",
    },
    lead: { th: "", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `คุณมีแปลงดอกไม้ยาวที่บางช่องมีดอกไม้ปลูกอยู่แล้ว บางช่องว่าง อย่างไรก็ตาม ดอกไม้ห้ามปลูกในช่องที่ติดกัน

  กำหนดอาร์เรย์จำนวนเต็ม flowerbed ที่ประกอบด้วย 0 และ 1 โดย 0 หมายถึงว่าง และ 1 หมายถึงไม่ว่าง พร้อมกับจำนวนเต็ม n ให้ return true ถ้าสามารถปลูกดอกไม้ใหม่ n ต้นในแปลงได้โดยไม่ผิดกฎห้ามช่องติดกัน และ return false ในกรณีอื่น`,
        },
        {
          t: "example",
          c: [
            {
              input: "flowerbed = [1,0,0,0,1], n = 1",
              output: "true",
            },
            {
              input: "flowerbed = [1,0,0,0,1], n = 2",
              output: "false",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= flowerbed.length <= 2 * 10^4",
            "flowerbed[i] เป็น 0 หรือ 1",
            "ใน flowerbed ไม่มีดอกไม้สองต้นที่อยู่ติดกัน",
            "0 <= n <= flowerbed.length",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "อ่านโจทย์กับตัวอย่างให้ครบ แล้วลองเขียนเองก่อน ถ้าติดค่อยเปิดเฉลย",
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "แปลงดอกไม้เป็นแถว 0/1 ห้ามปลูกติดกัน — ถามแค่ว่าปลูกเพิ่มได้อีก n ต้นไหม ไม่ใช่ถามว่าปลูกได้มากสุดกี่ต้น",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ใช้ Example 1 · flowerbed = [1,0,0,0,1], n = 1",
            },
            {
              t: "ul",
              c: [
                "i = 0: มีดอกอยู่แล้ว → ข้าม",
                "i = 1: ว่าง แต่ซ้ายติดดอก → ปลูกไม่ได้",
                "i = 2: ว่าง และซ้ายขวาว่าง → ปลูก แปลงกลายเป็น [1,0,1,0,1] · count = 1",
                "count >= n แล้ว → ได้ true ไม่ต้องไล่ช่องที่เหลือ",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "จะประกอบสี่ชิ้น: เดินทีละช่อง · เช็คว่าว่างและเพื่อนบ้านว่าง · ปลูกแล้วเขียน 1 ลงแปลง · ครบ n ก็ตอบทันที",
            },
            {
              t: "ul",
              c: [
                "flowerbed — แก้ในที่เดิมหลังปลูก เพื่อให้ช่องถัดไปเห็นว่าซ้ายมือมีดอกแล้ว",
                "left / right — ช่องขอบมีเพื่อนบ้านข้างเดียว · ไม่มีเพื่อนบ้านถือว่าว่าง",
                "count — นับดอกที่ปลูกไปแล้ว",
                "early return — พอ count >= n ก็ true ได้เลย",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 1 · เดินทีละช่อง ถ้าไม่ว่างก็ข้าม:",
            },
            {
              t: "code",
              lang: "python",
              label: "กวาดแปลงทีละช่อง",
              c: `count = 0
  for i in range(len(flowerbed)):
      if flowerbed[i] != 0:
          continue`,
            },
            {
              t: "ul",
              c: [
                "count = จำนวนดอกที่เราปลูกไปแล้ว",
                "ช่องที่เป็น 1 อยู่แล้วปลูกซ้ำไม่ได้ — ข้ามทันที",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 2 · เช็คเพื่อนบ้านให้ปลอดภัยที่ขอบแถว — อย่าอ่าน flowerbed[i-1] ตรง ๆ ตอน i = 0 เพราะ Python จะไปอ่านช่องท้าย (-1):",
            },
            {
              t: "code",
              lang: "python",
              label: "ไม่มีเพื่อนบ้าน = เพื่อนบ้านว่าง",
              c: `left = (i == 0) or (flowerbed[i - 1] == 0)
  right = (i == len(flowerbed) - 1) or (flowerbed[i + 1] == 0)`,
            },
            {
              t: "ul",
              c: [
                "i == 0 → ไม่มีซ้าย ถือว่าซ้ายว่าง (or ข้ามการอ่าน flowerbed[-1])",
                "i == ตัวท้าย → ไม่มีขวา ถือว่าขวาว่าง",
                "ช่องกลางต้องเพื่อนบ้านทั้งสองข้างเป็น 0",
                "บน Example 1 ที่ i = 2: left กับ right เป็นจริงทั้งคู่",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 3 · ปลูกแล้วเขียน 1 ลงแปลงจริง — ไม่ใช่แค่นับ:",
            },
            {
              t: "code",
              lang: "python",
              label: "ปลูกแล้วบล็อกเพื่อนบ้าน",
              c: `if left and right:
      flowerbed[i] = 1
      count += 1`,
            },
            {
              t: "ul",
              c: [
                "flowerbed[i] = 1 ทำให้ช่องถัดไปเห็นว่าซ้ายมีดอกแล้ว",
                "บน Example 1 หลังปลูกที่ i = 2: แปลง = [1, 0, 1, 0, 1]",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 4 · ครบ n เมื่อไหร่ก็ตอบทันที:",
            },
            {
              t: "code",
              lang: "python",
              label: "ออกเร็วเมื่อครบ n",
              c: `if count >= n:
      return True
  # ... หลังลูป
  return count >= n`,
            },
            {
              t: "ul",
              c: [
                "โจทย์ถามแค่ถึง n ไหม — ไม่ต้องกวาดจนจบแถวทุกครั้ง",
                "บน Example 1: count = 1 และ n = 1 → return True ทันที",
              ],
            },

            {
              t: "p",
              c: "ประกอบสี่ชิ้น: กวาดช่องว่าง → เช็คเพื่อนบ้านแบบกันขอบ → ปลูกแล้วเขียน 1 → ครบ n ก็ออก",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** บน Example 1 · flowerbed = [1,0,0,0,1], n = 1 · เขียว = ช่องที่กำลังดู · ทอง = เพิ่งปลูก · ดู count เทียบกับ n ตอนออกเร็ว",
            },
            { t: "viz", id: "can-place-flowers" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `class Solution:
      def canPlaceFlowers(self, flowerbed: list[int], n: int) -> bool:
          count = 0
          for i in range(len(flowerbed)):
              if flowerbed[i] != 0:
                  continue
              # ไม่มีเพื่อนบ้านถือว่าว่าง — กัน Python อ่าน flowerbed[-1]
              left = (i == 0) or (flowerbed[i - 1] == 0)
              right = (i == len(flowerbed) - 1) or (flowerbed[i + 1] == 0)
              if left and right:
                  flowerbed[i] = 1  # ปลูกจริง เพื่อบล็อกช่องถัดไป
                  count += 1
                  if count >= n:
                      return True
          return count >= n`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                "count = 0 ตามชิ้นที่ 1 — ยังไม่ได้ปลูก",
                "ข้ามช่องที่เป็น 1 อยู่แล้ว",
                "left / right ตามชิ้นที่ 2 — บน Example 1 ที่ i = 2 ทั้งคู่จริง",
                "flowerbed[i] = 1 ตามชิ้นที่ 3 — แปลงกลายเป็น [1,0,1,0,1]",
                "count >= n ตามชิ้นที่ 4 → return True ทันที",
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(m) กวาดแปลงรอบเดียว (m = ความยาว flowerbed) · หน่วยความจำ O(1) เพราะแก้ในแถวเดิมและใช้ตัวนับตัวเดียว",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.

  Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return true if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule and false otherwise.`,
        },
        {
          t: "example",
          c: [
            {
              input: "flowerbed = [1,0,0,0,1], n = 1",
              output: "true",
            },
            {
              input: "flowerbed = [1,0,0,0,1], n = 2",
              output: "false",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= flowerbed.length <= 2 * 10^4",
            "flowerbed[i] is 0 or 1.",
            "There are no two adjacent flowers in flowerbed.",
            "0 <= n <= flowerbed.length",
          ],
        },
      ],
    },
},
  "lc75-p05": {
    slug: "lc75-p05",
    title: {
      th: "ข้อ 5 · LC345 Reverse Vowels of a String 🟢",
      en: "5 · LC345 Reverse Vowels of a String 🟢",
    },
    lead: { th: "", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `กำหนดสตริง s มาให้ จงกลับลำดับเฉพาะสระทั้งหมดในสตริงแล้ว return สตริงนั้น

  สระคือ 'a', 'e', 'i', 'o' และ 'u' ซึ่งสามารถปรากฏได้ทั้งพิมพ์เล็กและพิมพ์ใหญ่ และปรากฏซ้ำได้หลายครั้ง`,
        },
        {
          t: "example",
          c: [
            {
              input: 's = "IceCreAm"',
              output: '"AceCreIm"',
              explain:
                "สระใน s คือ ['I', 'e', 'e', 'A'] เมื่อกลับลำดับสระแล้ว s จะกลายเป็น \"AceCreIm\"",
            },
            {
              input: 's = "leetcode"',
              output: '"leotcede"',
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= s.length <= 3 * 10^5",
            "s ประกอบด้วยอักขระ ASCII ที่พิมพ์ได้",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "อ่านโจทย์กับตัวอย่างให้ครบ แล้วลองเขียนเองก่อน ถ้าติดค่อยเปิดเฉลย",
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "กลับลำดับเฉพาะตัวที่เป็นสระ (a e i o u ทั้งพิมพ์เล็กและพิมพ์ใหญ่) ส่วนตัวอื่นอยู่ที่เดิม — คืนเป็นสตริงเดียว",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: 'ใช้ Example 1 · s = "IceCreAm"',
            },
            {
              t: "ul",
              c: [
                "สระเรียงจากซ้ายไปขวาคือ I, e, e, A",
                "กลับลำดับสระได้ A, e, e, I",
                "วางกลับลงตำแหน่งเดิมของสระ → AceCreIm",
                "ตัว c, C, r, m ไม่ขยับเลย",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "จะประกอบสี่ชิ้น: ชุดสระ · แปลงเป็นลิสต์ · สองเลขช่องวิ่งเข้าหากันจากหัวกับท้าย · แล้ว join กลับเป็นสตริง",
            },
            {
              t: "ul",
              c: [
                'VOWELS — set("aeiouAEIOU") รวมพิมพ์ใหญ่ด้วย',
                "ch = list(s) — สตริงแก้ตำแหน่งไม่ได้",
                "i, j — เลขช่องหัวแถวกับท้ายแถว วิ่งเข้าหากัน",
                '"".join(ch) — สลักกลับเป็นสตริงตอนจบ',
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 1 · เก็บสระครบทั้งพิมพ์เล็กและพิมพ์ใหญ่:",
            },
            {
              t: "code",
              lang: "python",
              label: "ชุดสระ",
              c: `VOWELS = set("aeiouAEIOU")`,
            },
            {
              t: "ul",
              c: [
                "ต้องมี A E I O U ด้วย ไม่งั้นคำอย่าง IceCreAm จะไม่ถูกกลับ",
                "ใช้ set เพราะเช็คสมาชิกเร็ว",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 2 · แปลงเป็นลิสต์ก่อน เพราะสตริงใน Python แก้ค่าตามตำแหน่งไม่ได้:",
            },
            {
              t: "code",
              lang: "python",
              label: "สตริง → ลิสต์",
              c: `ch = list(s)`,
            },
            {
              t: "ul",
              c: [
                'บน Example 1: ch = [\'I\', \'c\', \'e\', \'C\', \'r\', \'e\', \'A\', \'m\']',
                "ต่อไปจะสลับค่าใน ch ได้โดยตรง",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 3 · สองเลขช่องวิ่งเข้าหากันจากหัวกับท้าย — ฝั่งไหนไม่ใช่สระให้ขยับฝั่งนั้น ถ้าเป็นสระทั้งคู่จึงสลับแล้วขยับทั้งคู่:",
            },
            {
              t: "code",
              lang: "python",
              label: "วิ่งเข้าหากัน แล้วสลับสระ",
              c: `i, j = 0, len(ch) - 1
  while i < j:
      if ch[i] not in VOWELS:
          i += 1
      elif ch[j] not in VOWELS:
          j -= 1
      else:
          ch[i], ch[j] = ch[j], ch[i]
          i += 1
          j -= 1`,
            },
            {
              t: "ul",
              c: [
                "i เริ่มที่หัวแถว · j เริ่มที่ท้ายแถว",
                "while i < j = ยังไม่เจอกัน ก็ยังมีคู่ให้สลับ",
                "บน Example 1: ขยับ j ข้าม m → สลับ I ↔ A → ขยับ i ข้าม c → สลับ e ↔ e",
                "พอ i กับ j มาเจอกัน ลูปหยุด",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 4 · join กลับเป็นสตริงตามที่โจทย์ขอ:",
            },
            {
              t: "code",
              lang: "python",
              label: "ลิสต์ → สตริง",
              c: `return "".join(ch)`,
            },
            {
              t: "ul",
              c: [
                'บน Example 1 ได้ "AceCreIm"',
              ],
            },

            {
              t: "p",
              c: "ประกอบสี่ชิ้น: ตั้ง VOWELS → list(s) → วนสองเลขช่องวิ่งเข้าหากัน → join",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: 'กด **Next ▶** บน Example 1 · s = "IceCreAm" · เขียว = เลขช่อง i · ส้ม = เลขช่อง j · ทอง = สระที่กำลังสลับ · ดูตอนข้ามตัวที่ไม่ใช่สระ',
            },
            { t: "viz", id: "reverse-vowels" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `class Solution:
      def reverseVowels(self, s: str) -> str:
          VOWELS = set("aeiouAEIOU")  # รวมพิมพ์ใหญ่ด้วย
          ch = list(s)  # สตริงแก้ตำแหน่งไม่ได้
          i, j = 0, len(ch) - 1
          while i < j:
              if ch[i] not in VOWELS:
                  i += 1  # ซ้ายไม่ใช่สระ ขยับเข้ามา
              elif ch[j] not in VOWELS:
                  j -= 1  # ขวาไม่ใช่สระ ขยับเข้ามา
              else:
                  ch[i], ch[j] = ch[j], ch[i]  # สระทั้งคู่ สลับ
                  i += 1
                  j -= 1
          return "".join(ch)`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                'VOWELS ตามชิ้นที่ 1 — มีครบ aeiouAEIOU',
                'ch = list(s) ตามชิ้นที่ 2 — บน Example 1 ได้ 8 ช่อง',
                "i, j ตามชิ้นที่ 3 — เริ่มที่ 0 กับ 7 แล้ววิ่งเข้าหากัน",
                "ในลูปข้ามตัวที่ไม่ใช่สระก่อน แล้วค่อยสลับเมื่อทั้งคู่เป็นสระ",
                '"".join(ch) ตามชิ้นที่ 4 → "AceCreIm"',
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(n) เพราะ i กับ j รวมกันเดินไม่เกิน n ก้าว · หน่วยความจำ O(n) จากลิสต์ที่แปลงมา (n = ความยาว s)",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given a string s, reverse only all the vowels in the string and return it.

  The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.`,
        },
        {
          t: "example",
          c: [
            {
              input: 's = "IceCreAm"',
              output: '"AceCreIm"',
              explain:
                "The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels, s becomes \"AceCreIm\".",
            },
            {
              input: 's = "leetcode"',
              output: '"leotcede"',
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= s.length <= 3 * 10^5",
            "s consist of printable ASCII characters.",
          ],
        },
      ],
    },
},
  "lc75-p06": {
    slug: "lc75-p06",
    title: {
      th: "ข้อ 6 · LC151 Reverse Words in a String 🟡",
      en: "6 · LC151 Reverse Words in a String 🟡",
    },
    lead: { th: "", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `กำหนดสตริงอินพุต s มาให้ จงกลับลำดับของคำ

  คำถูกนิยามว่าเป็นลำดับของอักขระที่ไม่ใช่ช่องว่าง คำใน s จะถูกคั่นด้วยช่องว่างอย่างน้อยหนึ่งช่อง

  ให้ return สตริงของคำที่เรียงลำดับย้อนกลับโดยคั่นด้วยช่องว่างหนึ่งช่อง

  หมายเหตุ: s อาจมีช่องว่างนำหน้า ช่องว่างต่อท้าย หรือช่องว่างหลายช่องระหว่างคำสองคำ สตริงที่ return ควรมีช่องว่างหนึ่งช่องคั่นระหว่างคำเท่านั้น ห้ามรวมช่องว่างพิเศษใด ๆ`,
        },
        {
          t: "example",
          c: [
            {
              input: 's = "the sky is blue"',
              output: '"blue is sky the"',
            },
            {
              input: 's = "  hello world  "',
              output: '"world hello"',
              explain: "สตริงที่กลับแล้วต้องไม่มีช่องว่างนำหน้าหรือต่อท้าย",
            },
            {
              input: 's = "a good   example"',
              output: '"example good a"',
              explain:
                "ต้องย่อช่องว่างหลายช่องระหว่างคำสองคำให้เหลือหนึ่งช่องในสตริงที่กลับแล้ว",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= s.length <= 10^4",
            "s ประกอบด้วยตัวอักษรอังกฤษ (พิมพ์เล็กและพิมพ์ใหญ่) ตัวเลข และช่องว่าง ' '",
            "มีคำอย่างน้อยหนึ่งคำใน s",
            "คำถามต่อยอด: ถ้าชนิดข้อมูลสตริงในภาษาของคุณแก้ไขได้ในที่ (mutable) คุณสามารถแก้แบบ in-place โดยใช้พื้นที่เพิ่ม O(1) ได้หรือไม่?",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "อ่านโจทย์กับตัวอย่างให้ครบ แล้วลองเขียนเองก่อน ถ้าติดค่อยเปิดเฉลย",
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "กลับลำดับ คำ ไม่ใช่กลับตัวอักษรในคำ — และทำความสะอาดช่องว่างให้เหลือคั่นระหว่างคำเพียงหนึ่งช่อง (ตัดหัวท้ายด้วย)",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: 'ใช้ Example 3 · s = "a good   example"',
            },
            {
              t: "ul",
              c: [
                'ตัดเป็นคำ: a · good · example (ช่องว่างสามช่องกลางหายไปตอนแยกคำ)',
                "กลับลำดับ: example · good · a",
                'ประกอบกลับด้วยช่องว่างหนึ่งช่อง → "example good a"',
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "จะประกอบสามชิ้น: แยกคำด้วย split ที่ไม่ใส่ arg · กลับลำดับคำ · แล้ว join ด้วยช่องว่างเดียว",
            },
            {
              t: "ul",
              c: [
                "s.split() — ไม่ใส่อะไรในวงเล็บ = ยุบช่องว่างซ้ำ + ตัดหัวท้าย + ได้ลิสต์คำสะอาด",
                "reversed(...) หรือ [::-1] — กลับลำดับสมาชิกในลิสต์",
                '" ".join(...) — คั่นด้วยช่องว่างหนึ่งช่องพอดี',
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 1 · แยกคำ — ใช้ split() ไม่ใส่ argument:",
            },
            {
              t: "code",
              lang: "python",
              label: "แยกคำให้สะอาด",
              c: `words = s.split()`,
            },
            {
              t: "ul",
              c: [
                'บน Example 3: s.split() → [\'a\', \'good\', \'example\']',
                "ยุบช่องว่างที่ติดกันและตัดหัวท้ายให้เอง — ไม่ต้อง strip() เพิ่ม",
              ],
            },
            {
              t: "p",
              c: 'ถ้าใส่ arg เป็นช่องว่าง s.split(" ") จะเก็บสตริงว่างตรงช่องว่างซ้ำ — อย่าใช้แบบนั้นในข้อนี้:',
            },
            {
              t: "codeout",
              lang: "python",
              label: "split() vs split(\" \")",
              code: `s = "a good   example"
  print(s.split())
  print(s.split(" "))`,
              out: `['a', 'good', 'example']
  ['a', 'good', '', '', 'example']`,
            },

            {
              t: "p",
              c: "ชิ้นที่ 2 · กลับลำดับคำ:",
            },
            {
              t: "code",
              lang: "python",
              label: "กลับลำดับในลิสต์",
              c: `rev = list(reversed(words))`,
            },
            {
              t: "ul",
              c: [
                "reversed(words) กลับลำดับสมาชิก — ไม่แตะตัวอักษรในแต่ละคำ",
                "บน Example 3 ได้ ['example', 'good', 'a']",
                "จะเขียน words[::-1] แทนก็ได้ผลเดียวกัน",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 3 · ประกอบกลับด้วยช่องว่างหนึ่งช่อง:",
            },
            {
              t: "code",
              lang: "python",
              label: "join เป็นประโยค",
              c: `return " ".join(rev)`,
            },
            {
              t: "ul",
              c: [
                'ตัวคั่น " " ทำให้ระหว่างคำมีช่องว่างเดียวเสมอ',
                'บน Example 3 → "example good a"',
              ],
            },

            {
              t: "p",
              c: 'ประกอบสามชิ้นในบรรทัดเดียวได้: return " ".join(reversed(s.split()))',
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: 'กด **Next ▶** บน Example 3 · s = "a good   example" · ดูสตริงสกปรก → ลิสต์หลัง split → ลิสต์หลัง reverse → ผลหลัง join',
            },
            { t: "viz", id: "reverse-words" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `class Solution:
      def reverseWords(self, s: str) -> str:
          # split() ไม่ใส่ arg = แยกคำ + ยุบช่องว่างซ้ำ + ตัดหัวท้าย
          # reversed = กลับลำดับคำ (ไม่กลับตัวอักษรในคำ)
          # " ".join = คั่นด้วยช่องว่างหนึ่งช่อง
          return " ".join(reversed(s.split()))`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                "s.split() ตามชิ้นที่ 1 — บน Example 3 ได้ ['a', 'good', 'example']",
                "reversed(...) ตามชิ้นที่ 2 — ได้ลำดับ example, good, a",
                '" ".join(...) ตามชิ้นที่ 3 → "example good a"',
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(n) แตะทุกตัวอักษรตอน split และ join · หน่วยความจำ O(n) จากลิสต์คำและสตริงผลลัพธ์ (n = ความยาว s)",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given an input string s, reverse the order of the words.

  A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

  Return a string of the words in reverse order concatenated by a single space.

  Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.`,
        },
        {
          t: "example",
          c: [
            {
              input: 's = "the sky is blue"',
              output: '"blue is sky the"',
            },
            {
              input: 's = "  hello world  "',
              output: '"world hello"',
              explain:
                "Your reversed string should not contain leading or trailing spaces.",
            },
            {
              input: 's = "a good   example"',
              output: '"example good a"',
              explain:
                "You need to reduce multiple spaces between two words to a single space in the reversed string.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= s.length <= 10^4",
            "s contains English letters (upper-case and lower-case), digits, and spaces ' '.",
            "There is at least one word in s.",
            "Follow-up: If the string data type is mutable in your language, can you solve it in-place with O(1) extra space?",
          ],
        },
      ],
    },
},
  "lc75-p07": {
    slug: "lc75-p07",
    title: {
      th: "ข้อ 7 · LC238 Product of Array Except Self 🟡",
      en: "7 · LC238 Product of Array Except Self 🟡",
    },
    lead: { th: "", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `กำหนดอาร์เรย์จำนวนเต็ม nums มาให้ ให้ return อาร์เรย์ answer โดย answer[i] เท่ากับผลคูณของสมาชิกทุกตัวใน nums ยกเว้น nums[i]

  ผลคูณของ prefix หรือ suffix ใด ๆ ของ nums รับประกันว่าใส่ในจำนวนเต็ม 32 บิตได้

  คุณต้องเขียนอัลกอริทึมที่ทำงานในเวลา O(n) และไม่ใช้การหาร`,
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [1,2,3,4]",
              output: "[24,12,8,6]",
            },
            {
              input: "nums = [-1,1,0,-3,3]",
              output: "[0,0,9,0,0]",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "2 <= nums.length <= 10^5",
            "-30 <= nums[i] <= 30",
            "อินพุตถูกสร้างให้ answer[i] รับประกันว่าใส่ในจำนวนเต็ม 32 บิตได้",
            "คำถามต่อยอด: คุณสามารถแก้โดยใช้พื้นที่เพิ่ม O(1) ได้หรือไม่? (อาร์เรย์ผลลัพธ์ไม่นับเป็นพื้นที่เพิ่มในการวิเคราะห์ space complexity)",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "อ่านโจทย์กับตัวอย่างให้ครบ แล้วลองเขียนเองก่อน ถ้าติดค่อยเปิดเฉลย",
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "สร้างแถวคำตอบความยาวเท่า nums โดย answer[i] = ผลคูณของทุกตัวยกเว้น nums[i] — ห้ามหาร และต้องจบใน O(n)",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ใช้ Example 1 · nums = [1, 2, 3, 4]",
            },
            {
              t: "ul",
              c: [
                "ตำแหน่ง 0: 2 × 3 × 4 = 24",
                "ตำแหน่ง 1: 1 × 3 × 4 = 12",
                "ตำแหน่ง 2: 1 × 2 × 4 = 8",
                "ตำแหน่ง 3: 1 × 2 × 3 = 6 → [24, 12, 8, 6]",
              ],
            },
            {
              t: "p",
              c: "สังเกตว่าแต่ละช่องคือ (ผลคูณทุกตัวทางซ้าย) × (ผลคูณทุกตัวทางขวา) — ไม่ต้องแตะตัวเอง จึงไม่ต้องหาร",
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "จะประกอบสามชิ้น: สร้าง answer · กวาดซ้าย→ขวาใส่ผลคูณฝั่งซ้าย · แล้วกวาดขวา→ซ้ายคูณผลคูณฝั่งขวาทับลงไป",
            },
            {
              t: "ul",
              c: [
                "answer — ลิสต์คำตอบ เริ่มด้วย 1 ทุกช่อง แล้วค่อยเติม",
                "รอบซ้าย — answer[i] = ผลคูณของทุกตัวที่อยู่ก่อน i",
                "รอบขวา — ตัวแปร right สะสมผลคูณทางขวา แล้วคูณเข้า answer[i]",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 1 · สร้างแถวคำตอบ ความยาวเท่า nums เติม 1:",
            },
            {
              t: "code",
              lang: "python",
              label: "ตั้งต้น answer",
              c: `n = len(nums)
  answer = [1] * n`,
            },
            {
              t: "ul",
              c: [
                "1 คือค่ากลางของการคูณ — คูณเข้าไปแล้วไม่เปลี่ยนค่า",
                "ตำแหน่งริมที่ยังไม่มีเพื่อนบ้านฝั่งนั้นจึงเริ่มที่ 1 พอดี",
                "บน Example 1: answer = [1, 1, 1, 1]",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 2 · กวาดซ้าย → ขวา ใส่ผลคูณของทุกตัวทางซ้ายของ i:",
            },
            {
              t: "code",
              lang: "python",
              label: "รอบซ้าย — ยังไม่ใช่คำตอบเต็ม",
              c: `for i in range(1, n):
      answer[i] = answer[i - 1] * nums[i - 1]`,
            },
            {
              t: "ul",
              c: [
                "เริ่มที่ i = 1 เพราะช่อง 0 ไม่มีอะไรทางซ้าย เหลือ 1 ไว้",
                "คูณ nums[i - 1] ไม่ใช่ nums[i] — ไม่นับตัวเอง",
                "บน Example 1 หลังรอบนี้: answer = [1, 1, 2, 6]",
                "แปลว่า answer[3] = 1 × 2 × 3 = ผลคูณทางซ้ายของช่อง 3",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 3 · กวาดขวา → ซ้าย คูณผลคูณฝั่งขวาเข้าไปด้วยตัวแปร right:",
            },
            {
              t: "code",
              lang: "python",
              label: "รอบขวา — คูณทับจนได้คำตอบ",
              c: `right = 1
  for i in range(n - 1, -1, -1):
      answer[i] *= right
      right *= nums[i]`,
            },
            {
              t: "ul",
              c: [
                "right เริ่มที่ 1 = ยังไม่มีตัวทางขวาของช่องท้ายสุด",
                "คูณลง answer[i] ก่อน แล้วค่อยสะสม nums[i] เข้า right — ลำดับนี้สำคัญ ถ้าสลับจะนับตัวเอง",
                "บน Example 1: i=3 ได้ 6×1=6 · i=2 ได้ 2×4=8 · i=1 ได้ 1×12=12 · i=0 ได้ 1×24=24",
                "จบที่ answer = [24, 12, 8, 6]",
              ],
            },

            {
              t: "p",
              c: "ประกอบสามชิ้น: สร้าง answer → รอบซ้ายใส่ผลคูณฝั่งซ้าย → รอบขวาคูณ right ทับจนครบ",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** บน Example 1 · nums = [1, 2, 3, 4] · เขียว = กำลังเติมรอบซ้าย · ส้ม = กำลังคูณรอบขวา · ดูช่อง i ที่ไฮไลต์",
            },
            { t: "viz", id: "product-except-self" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `class Solution:
      def productExceptSelf(self, nums: list[int]) -> list[int]:
          n = len(nums)
          answer = [1] * n

          # รอบซ้าย: answer[i] = ผลคูณทุกตัวทางซ้ายของ i
          for i in range(1, n):
              answer[i] = answer[i - 1] * nums[i - 1]

          # รอบขวา: คูณผลคูณฝั่งขวาเข้าไปด้วยตัวแปรเดียว
          right = 1
          for i in range(n - 1, -1, -1):
              answer[i] *= right  # คูณก่อน — ยังไม่นับ nums[i]
              right *= nums[i]   # สะสมให้ช่องถัดไปทางซ้าย

          return answer`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                "answer = [1] * n ตามชิ้นที่ 1 — บน Example 1 ได้ [1, 1, 1, 1]",
                "ลูป range(1, n) ตามชิ้นที่ 2 — หลังรอบซ้ายได้ [1, 1, 2, 6]",
                "right = 1 แล้วเดิน range(n - 1, -1, -1) ตามชิ้นที่ 3",
                "answer[i] *= right ก่อน right *= nums[i] เสมอ",
                "คืน [24, 12, 8, 6]",
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(n) กวาดสองรอบ · หน่วยความจำเพิ่ม O(1) นอกจากแถวคำตอบ (มีแค่ตัวแปร right) — ตามที่โจทย์ท้าไว้",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

  The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

  You must write an algorithm that runs in O(n) time and without using the division operation.`,
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [1,2,3,4]",
              output: "[24,12,8,6]",
            },
            {
              input: "nums = [-1,1,0,-3,3]",
              output: "[0,0,9,0,0]",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "2 <= nums.length <= 10^5",
            "-30 <= nums[i] <= 30",
            "The input is generated such that answer[i] is guaranteed to fit in a 32-bit integer.",
            "Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)",
          ],
        },
      ],
    },
},
  "lc75-p08": {
    slug: "lc75-p08",
    title: {
      th: "ข้อ 8 · LC334 Increasing Triplet Subsequence 🟡",
      en: "8 · LC334 Increasing Triplet Subsequence 🟡",
    },
    lead: { th: "", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `กำหนดอาร์เรย์จำนวนเต็ม nums มาให้ ให้ return true ถ้ามีสามตำแหน่ง (i, j, k) ที่ i < j < k และ nums[i] < nums[j] < nums[k] ถ้าไม่มีตำแหน่งเช่นนั้น ให้ return false`,
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [1,2,3,4,5]",
              output: "true",
              explain: "ทริปเปิลใด ๆ ที่ i < j < k ก็ใช้ได้",
            },
            {
              input: "nums = [5,4,3,2,1]",
              output: "false",
              explain: "ไม่มีทริปเปิลเลย",
            },
            {
              input: "nums = [2,1,5,0,4,6]",
              output: "true",
              explain:
                "หนึ่งในทริปเปิลที่ใช้ได้คือ (1, 4, 5) เพราะ nums[1] == 1 < nums[4] == 4 < nums[5] == 6",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= nums.length <= 5 * 10^5",
            "-2^31 <= nums[i] <= 2^31 - 1",
            "คำถามต่อยอด: คุณสามารถเขียนวิธีแก้ที่ทำงานใน O(n) time complexity และ O(1) space complexity ได้หรือไม่?",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "อ่านโจทย์กับตัวอย่างให้ครบ แล้วลองเขียนเองก่อน ถ้าติดค่อยเปิดเฉลย",
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "ขอแค่ true หรือ false — มีสามช่อง i < j < k ที่ค่าเรียง nums[i] < nums[j] < nums[k] หรือไม่ ไม่ต้องบอกว่าสามช่องนั้นคือช่องไหน และสามตัวไม่ต้องอยู่ติดกัน",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ใช้ Example 3 · nums = [2, 1, 5, 0, 4, 6]",
            },
            {
              t: "ul",
              c: [
                "มองหาตัวเล็ก → ตัวกลาง → ตัวใหญ่ ตามลำดับตำแหน่ง",
                "เช่น 1 ที่ช่อง 1 · 4 ที่ช่อง 4 · 6 ที่ช่อง 5 → 1 < 4 < 6 จึงได้ true",
                "อีกชุด: 0 ที่ช่อง 3 · 4 ที่ช่อง 4 · 6 ที่ช่อง 5 ก็ใช้ได้เช่นกัน",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "เดินแถวรอบเดียว ถือตัวแปรสองตัว: first = ตัวสมัครที่เล็กสุด · second = ตัวสมัครกลางที่ใหญ่กว่า first — พอเจอตัวที่ใหญ่กว่าทั้งคู่ ตอบ true",
            },
            {
              t: "ul",
              c: [
                'first, second — เริ่มด้วย float("inf") เพื่อให้ตัวแรกเข้าเงื่อนไขอัปเดตได้แน่นอน',
                "แต่ละ n ในแถว: ถ้า n <= first → อัปเดต first",
                "ไม่งั้นถ้า n <= second → อัปเดต second",
                "ไม่งั้น n ใหญ่กว่าทั้งคู่ → เจอครบสามตัว return True",
                "ใช้ <= ไม่ใช่ < เพื่อกันค่าซ้ำไม่ให้นับเป็นการเพิ่มขึ้น",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 1 · ตั้งตัวสมัครสองตัวเป็นค่าใหญ่สุดก่อนเริ่มเดิน:",
            },
            {
              t: "code",
              lang: "python",
              label: "ยังไม่มีตัวสมัคร",
              c: `first = second = float("inf")`,
            },
            {
              t: "ul",
              c: [
                "first = ค่าเล็กสุดที่เคยเจอ (ตัวสมัครซ้ายสุดของสามตัว)",
                "second = ค่ากลางที่เคยตั้งได้หลังมี first แล้ว",
                'float("inf") = ค่าใหญ่กว่าทุกจำนวนในแถว จึงอัปเดตได้ตั้งแต่ตัวแรก',
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 2 · เดินทีละตัว ลองอัปเดต first ก่อน แล้ว second แล้วค่อยสรุปว่าเจอ:",
            },
            {
              t: "code",
              lang: "python",
              label: "สามทางเลือกต่อหนึ่งตัว",
              c: `for n in nums:
      if n <= first:
          first = n
      elif n <= second:
          second = n
      else:
          return True`,
            },
            {
              t: "ul",
              c: [
                "n <= first → n เล็กพอจะเป็นตัวซ้ายใหม่ — อัปเดต first",
                "n <= second (และใหญ่กว่า first แล้ว) → เป็นตัวกลางที่ดีกว่า — อัปเดต second",
                "else → n ใหญ่กว่า first และ second ทั้งคู่ = มีสามค่าเรียงเพิ่มแล้ว",
                "ลำดับ if / elif / else สำคัญ: พยายามเก็บ first ให้เล็กก่อนเสมอ",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 3 · ไล่ Example 3 ด้วยค่าจริง — ดูจุดที่ first เปลี่ยนหลัง second ถูกตั้งแล้ว:",
            },
            {
              t: "ul",
              c: [
                "n=2 → first = 2",
                "n=1 → first = 1",
                "n=5 → second = 5 (มี 1 < 5 แล้ว)",
                "n=0 → first = 0 · second ยังเป็น 5 — ดูเหมือนสลับลำดับ แต่โจทย์ไม่ได้ขอตำแหน่ง",
                "n=4 → second = 4 (เล็กลง แต่ยังใหญ่กว่า first = 0)",
                "n=6 → ใหญ่กว่า 0 และ 4 → return True (เช่น 0 < 4 < 6)",
              ],
            },
            {
              t: "p",
              c: "ทำไมอัปเดต first เป็น 0 แล้วยังถูก: ตอนที่เคยตั้ง second = 5 มี first ที่เล็กกว่า 5 อยู่ก่อนหน้านั้นแล้ว (คือ 1) และตอนเจอ 6 เราก็มีคู่ 0 < 4 พร้อมอยู่ — โจทย์ถามแค่ว่ามีชุดหนึ่งชุดใดจริงไหม ไม่ได้ถามว่า first/second ตอนนี้คือคู่ไหน",
            },

            {
              t: "p",
              c: "ชิ้นที่ 4 · ถ้าเดินจบแล้วยังไม่เคยตก else:",
            },
            {
              t: "code",
              lang: "python",
              label: "ไม่มีทริปเปิล",
              c: `return False`,
            },
            {
              t: "ul",
              c: [
                "เช่น [5, 4, 3, 2, 1] — first เล็กลงเรื่อย ๆ แต่ไม่มีตัวไหนใหญ่พอเป็น second แล้วตัวที่สาม",
                "แถวสั้นกว่า 3 ตัวก็ได้ False โดยไม่ error",
              ],
            },

            {
              t: "p",
              c: "ประกอบ: ตั้ง first/second เป็น ∞ → เดิน for ทีละ n ตามสามทางเลือก → เจอ else แล้ว True ไม่เจอจนจบแล้ว False",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** บน Example 3 · nums = [2, 1, 5, 0, 4, 6] · เขียว = อัปเดต first · ส้ม = อัปเดต second · ทอง = เจอตัวที่สามแล้ว",
            },
            { t: "viz", id: "increasing-triplet" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `class Solution:
      def increasingTriplet(self, nums: list[int]) -> bool:
          first = second = float("inf")  # ยังไม่มีตัวสมัคร
          for n in nums:
              if n <= first:
                  first = n             # ตัวเล็กสุดใหม่
              elif n <= second:
                  second = n            # ตัวกลางใหม่ (ใหญ่กว่า first)
              else:
                  return True           # ใหญ่กว่าทั้งคู่ = ครบสามตัว
          return False`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                'first = second = float("inf") ตามชิ้นที่ 1',
                "for n in nums ตามชิ้นที่ 2 — บน Example 3 ไล่ 2, 1, 5, 0, 4, 6",
                "n=0 อัปเดต first ทั้งที่ second ยังเป็น 5 — ตามชิ้นที่ 3 ไม่ผิดเพราะขอแค่มี/ไม่มี",
                "n=6 ตก else → return True ตามชิ้นที่ 2",
                "ถ้าไม่มี else ตลอดทาง → return False ตามชิ้นที่ 4",
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(n) เดินแถวรอบเดียว · หน่วยความจำ O(1) ใช้ตัวแปรแค่สองตัว ไม่ว่าแถวจะยาวแค่ไหน",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given an integer array nums, return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. If no such indices exists, return false.`,
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [1,2,3,4,5]",
              output: "true",
              explain: "Any triplet where i < j < k is valid.",
            },
            {
              input: "nums = [5,4,3,2,1]",
              output: "false",
              explain: "No triplet exists.",
            },
            {
              input: "nums = [2,1,5,0,4,6]",
              output: "true",
              explain:
                "One of the valid triplet is (1, 4, 5), because nums[1] == 1 < nums[4] == 4 < nums[5] == 6.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= nums.length <= 5 * 10^5",
            "-2^31 <= nums[i] <= 2^31 - 1",
            "Follow up: Could you implement a solution that runs in O(n) time complexity and O(1) space complexity?",
          ],
        },
      ],
    },
},
  "lc75-p09": {
    slug: "lc75-p09",
    title: {
      th: "ข้อ 9 · LC443 String Compression 🟡",
      en: "9 · LC443 String Compression 🟡",
    },
    lead: { th: "", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `กำหนดอาร์เรย์ของตัวอักษร chars มาให้ จงบีบอัดโดยใช้อัลกอริทึมต่อไปนี้:

  เริ่มจากสตริงว่าง s สำหรับกลุ่มของตัวอักษรซ้ำที่ติดกันแต่ละกลุ่มใน chars:
  - ถ้าความยาวของกลุ่มเป็น 1 ให้ต่อตัวอักษรนั้นเข้ากับ s
  - ถ้าไม่ใช่ ให้ต่อตัวอักษรตามด้วยความยาวของกลุ่ม

  สตริงที่บีบอัดแล้ว s ไม่ควรถูก return แยกต่างหาก แต่ให้เก็บลงในอาร์เรย์ตัวอักษรอินพุต chars แทน หมายเหตุ: ความยาวกลุ่มที่ 10 ขึ้นไปจะถูกแยกเป็นหลายตัวอักษรใน chars

  หลังจากแก้ไขอาร์เรย์อินพุตเสร็จแล้ว ให้ return ความยาวใหม่ของอาร์เรย์

  คุณต้องเขียนอัลกอริทึมที่ใช้พื้นที่เพิ่มคงที่เท่านั้น

  หมายเหตุ: ตัวอักษรในอาร์เรย์ที่เกินความยาวที่ return ไม่สำคัญและควรเพิกเฉย`,
        },
        {
          t: "example",
          c: [
            {
              input: 'chars = ["a","a","b","b","c","c","c"]',
              output: "6",
              explain: `กลุ่มคือ "aa", "bb" และ "ccc" ซึ่งบีบอัดเป็น "a2b2c3"
  หลังจากแก้ไขอาร์เรย์อินพุตแบบ in-place แล้ว ตัวอักษร 6 ตัวแรกของ chars ควรเป็น ["a","2","b","2","c","3"]`,
            },
            {
              input: 'chars = ["a"]',
              output: "1",
              explain: `กลุ่มเดียวคือ "a" ซึ่งไม่ถูกบีบอัดเพราะเป็นตัวอักษรตัวเดียว
  หลังจากแก้ไขอาร์เรย์อินพุตแบบ in-place แล้ว ตัวอักษรตัวแรกของ chars ควรเป็น ["a"]`,
            },
            {
              input:
                'chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]',
              output: "4",
              explain: `กลุ่มคือ "a" และ "bbbbbbbbbbbb" ซึ่งบีบอัดเป็น "ab12"
  หลังจากแก้ไขอาร์เรย์อินพุตแบบ in-place แล้ว ตัวอักษร 4 ตัวแรกของ chars ควรเป็น ["a","b","1","2"]`,
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= chars.length <= 2000",
            "chars[i] เป็นตัวอักษรอังกฤษพิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข หรือสัญลักษณ์",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "อ่านโจทย์กับตัวอย่างให้ครบ แล้วลองเขียนเองก่อน ถ้าติดค่อยเปิดเฉลย",
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "ย่อกลุ่มตัวอักษรซ้ำติดกันลงในแถว chars เดิม (แก้ในที่เดิม) แล้ว return ความยาวใหม่ — กลุ่มยาว 1 เขียนแค่ตัวอักษร · กลุ่มยาวกว่า 1 เขียนตัวอักษรตามด้วยเลขจำนวน (เลขหลายหลักแตกทีละช่อง) · ของที่เกินความยาวใหม่ไม่ต้องสนใจ",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: 'ใช้ Example 1 · chars = ["a","a","b","b","c","c","c"]',
            },
            {
              t: "ul",
              c: [
                'กลุ่ม "aa" → เขียน a แล้ว 2',
                'กลุ่ม "bb" → เขียน b แล้ว 2',
                'กลุ่ม "ccc" → เขียน c แล้ว 3',
                'ได้ ["a","2","b","2","c","3"] ความยาว 6',
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ใช้สองนิ้วบนแถวเดียว: read อ่านและนับกลุ่ม · write วางผลที่ย่อแล้วลงช่องว่างด้านซ้าย — write อยู่หลังหรือที่หัวช่องว่างเสมอ เพราะวางหลัง read เดินผ่านกลุ่มนั้นจบแล้ว",
            },
            {
              t: "ul",
              c: [
                "write — ช่องที่จะเขียนตัวถัดไปของผลลัพธ์ (เริ่มที่ 0)",
                "read — ช่องที่กำลังอ่านของเดิม (เริ่มที่ 0)",
                "ลูปใน — เดิน read นับกลุ่มตัวเดียวกันจนจบ",
                "เขียนตัวอักษรที่ write แล้วขยับ write",
                "ถ้า count > 1 ค่อยเขียนทีละหลักของเลขจำนวน — กลุ่มยาว 1 เขียนแค่ตัวอักษร",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 1 · ตั้งสองนิ้วที่หัวแถว:",
            },
            {
              t: "code",
              lang: "python",
              label: "ช่องว่างผลอยู่หัวแถว",
              c: `write = read = 0
  n = len(chars)`,
            },
            {
              t: "ul",
              c: [
                "write = ตำแหน่งที่จะวางตัวถัดไปของผลที่ย่อแล้ว",
                "read = ตำแหน่งที่กำลังอ่านของเดิม",
                "n = ความยาวเดิม เก็บไว้เพราะเราจะแก้ chars ระหว่างทาง",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 2 · ลูปนอกวนตราบที่ยังมีของให้อ่าน แล้วลูปในนับกลุ่มให้จบก่อนเขียน:",
            },
            {
              t: "code",
              lang: "python",
              label: "นับกลุ่มด้วย read",
              c: `while read < n:
      ch = chars[read]
      count = 0
      while read < n and chars[read] == ch:
          read += 1
          count += 1`,
            },
            {
              t: "ul",
              c: [
                "ch = ตัวอักษรของกลุ่มนี้ (หยิบตอน read อยู่หัวกลุ่ม)",
                "ลูปในเดิน read ไปเรื่อย ๆ จนเจอตัวคนละชนิดหรือหมดแถว",
                "พอออกจากลูปใน: count = ความยาวกลุ่ม · read ชี้หัวกลุ่มถัดไปพอดี",
                'บน Example 1 กลุ่มแรก: ch = "a", count = 2, read = 2',
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 3 · เขียนตัวอักษรลงที่ write แล้วขยับ — write ยังอยู่บนช่องที่ read เดินผ่านไปแล้ว:",
            },
            {
              t: "code",
              lang: "python",
              label: "วางตัวอักษรของกลุ่ม",
              c: `chars[write] = ch
  write += 1`,
            },
            {
              t: "ul",
              c: [
                "วาง ch ที่ช่อง write แล้วขยับ write ไปช่องว่างถัดไป",
                "write ไม่เคยแซง read เพราะเราเขียนหลังนับกลุ่มจบแล้ว และผลของกลุ่มยาว k ไม่กินเกิน k ช่อง",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 4 · เขียนเลขเฉพาะเมื่อกลุ่มยาวกว่า 1 — กลุ่มยาว 1 หยุดแค่ตัวอักษร:",
            },
            {
              t: "code",
              lang: "python",
              label: "เลขหลายหลักแตกทีละช่อง",
              c: `if count > 1:
      for d in str(count):
          chars[write] = d
          write += 1`,
            },
            {
              t: "ul",
              c: [
                "count > 1 = เขียนเลขเฉพาะกลุ่มที่ซ้ำ — กลุ่มเดียวอย่าง [\"a\"] ได้แค่ [\"a\"] ไม่ใช่ a1",
                'str(count) แปลงเลขเป็นข้อความ แล้ววนทีละหลัก เช่น 12 → "1" แล้ว "2"',
                "บน Example 1 ทุกกลุ่มยาว ≥ 2 จึงเขียน a2, b2, c3",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 5 · เมื่อ read หมดแถว คืน write เป็นความยาวใหม่:",
            },
            {
              t: "code",
              lang: "python",
              label: "ความยาวใหม่",
              c: `return write`,
            },
            {
              t: "ul",
              c: [
                "write = จำนวนช่องที่เขียนผลไปแล้ว = ความยาวใหม่",
                "ช่องตั้งแต่ write เป็นต้นไปไม่สำคัญ ไม่ต้องล้าง",
                "บน Example 1: write = 6 → [a, 2, b, 2, c, 3]",
              ],
            },

            {
              t: "p",
              c: "ประกอบ: ตั้ง write/read → วนนับกลุ่มด้วย read → เขียนตัวอักษรที่ write → ถ้า count > 1 เขียนเลขทีละหลัก → return write",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: 'กด **Next ▶** บน Example 1 · chars = ["a","a","b","b","c","c","c"] · ฟ้า = read · ส้ม = write · เขียว = กลุ่มที่กำลังนับ · ดูว่า write ตามหลัง read เสมอ',
            },
            { t: "viz", id: "string-compression" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `class Solution:
      def compress(self, chars: list[str]) -> int:
          write = 0                 # ช่องว่างที่จะวางผลถัดไป
          read = 0                  # ช่องที่กำลังอ่านของเดิม
          n = len(chars)

          while read < n:
              ch = chars[read]
              count = 0
              # นับกลุ่มนี้ให้จบ — พอออก read ชี้หัวกลุ่มถัดไป
              while read < n and chars[read] == ch:
                  read += 1
                  count += 1

              chars[write] = ch     # เขียนตัวอักษร
              write += 1

              if count > 1:         # กลุ่มยาว 1 เขียนแค่ตัวอักษร
                  for d in str(count):
                      chars[write] = d
                      write += 1

          return write              # ความยาวใหม่`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                "write = read = 0 ตามชิ้นที่ 1",
                "ลูปในนับกลุ่มตามชิ้นที่ 2 — บน Example 1 กลุ่มแรก count = 2, read = 2",
                "chars[write] = ch ตามชิ้นที่ 3 — วางบนช่องที่อ่านไปแล้ว",
                "if count > 1 ตามชิ้นที่ 4 — ไม่เขียนเลข 1 สำหรับกลุ่มเดี่ยว",
                "return write ตามชิ้นที่ 5 → 6",
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(n) เพราะ read เดินหน้าอย่างเดียวแตะแต่ละช่องครั้งเดียว · หน่วยความจำเพิ่ม O(1) ใช้ตัวแปรไม่กี่ตัวและเขียนทับในแถวเดิม",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given an array of characters chars, compress it using the following algorithm:

  Begin with an empty string s. For each group of consecutive repeating characters in chars:
  - If the group's length is 1, append the character to s.
  - Otherwise, append the character followed by the group's length.

  The compressed string s should not be returned separately, but instead, be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

  After you are done modifying the input array, return the new length of the array.

  You must write an algorithm that uses only constant extra space.

  Note: The characters in the array beyond the returned length do not matter and should be ignored.`,
        },
        {
          t: "example",
          c: [
            {
              input: 'chars = ["a","a","b","b","c","c","c"]',
              output: "6",
              explain: `The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
  After modifying the input array in-place, the first 6 characters of chars should be ["a","2","b","2","c","3"].`,
            },
            {
              input: 'chars = ["a"]',
              output: "1",
              explain: `The only group is "a", which remains uncompressed since it is a single character.
  After modifying the input array in-place, the first character of chars should be ["a"].`,
            },
            {
              input:
                'chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]',
              output: "4",
              explain: `The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
  After modifying the input array in-place, the first 4 characters of chars should be ["a","b","1","2"].`,
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= chars.length <= 2000",
            "chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol.",
          ],
        },
      ],
    },
},
};
