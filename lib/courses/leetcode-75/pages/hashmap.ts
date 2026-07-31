import type { Page } from "@/lib/types";

export const hashMapPages: Record<string, Page> = {
  "lc75-intro-hashmap": {
    slug: "lc75-intro-hashmap",
    title: "Hash Map / Set — พื้นฐาน & แนวคิด",
    lead: "ใช้ dict และ set เพื่อ check membership (เช็คสมาชิก) นับ frequency (ความถี่) และจับคู่ข้อมูลได้เร็วในเวลา O(1)",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์จำนวนมากถามว่า มีตัวนี้อยู่ไหม, ตัวนี้ปรากฏกี่ครั้ง, หรือ สองกองข้อมูลมีตัวไหนซ้ำกันบ้าง คำถามพวกนี้ตอบได้เร็วมากด้วย hash map (ใน Python คือ dict) และ hash set (set) ซึ่งแลก memory (หน่วยความจำ) เพิ่มขึ้นเล็กน้อยเพื่อลดเวลาจาก O(n) เหลือ O(1) ต่อการ lookup (ค้นหา)" },

      { t: "h2", c: "แนวคิดของหัวข้อนี้" },
      { t: "p", c: "dict และ set ใน Python ทำงานเบื้องหลังด้วย hash table ทำให้การเช็คว่า มี key (คีย์) นี้ไหม (key in d) การหยิบค่า (d[key]) และการ insert/delete (เพิ่ม/ลบ) สมาชิก ทำได้ในเวลาเฉลี่ย O(1) ไม่ต้อง iterate (ไล่) ทีละตัวเหมือนการ search ใน list ที่เป็น O(n)" },
      { t: "table", head: ["operation", "list", "set / dict"], rows: [
        ["check membership (x in ...)", "O(n)", "O(1) เฉลี่ย"],
        ["lookup ด้วย key (d[k])", "—", "O(1) เฉลี่ย"],
        ["insert (เพิ่มสมาชิก)", "O(1) append", "O(1) เฉลี่ย"],
        ["ตัด duplicate (ตัวซ้ำ)", "ต้องไล่เอง", "set(...) ให้อัตโนมัติ"],
      ] },
      { t: "h3", c: "set — เก็บ element (สมาชิก) ที่ไม่ซ้ำ" },
      { t: "code", lang: "python", c: `nums = [1, 2, 2, 3, 3, 3]

s = set(nums)          # {1, 2, 3} ตัดตัวซ้ำออกให้อัตโนมัติ
print(2 in s)          # True  — เช็คสมาชิกเร็ว O(1)
print(len(s))          # 3     — มีค่าที่ต่างกันกี่ตัว

# หา intersection / union / difference ได้ง่าย
a = {1, 2, 3}
b = {2, 3, 4}
print(a & b)           # {2, 3}   อยู่ทั้งสองฝั่ง
print(a | b)           # {1, 2, 3, 4} รวมกัน
print(a - b)           # {1}      อยู่ใน a แต่ไม่อยู่ใน b` },
      { t: "h3", c: "dict — นับ frequency (ความถี่) / จับคู่ key กับ value" },
      { t: "p", c: "เวลาต้อง count (นับ) ว่าแต่ละค่าปรากฏกี่ครั้ง วิธีที่นิยมที่สุดคือใช้ collections.Counter ซึ่งเป็น dict ที่ทำหน้าที่นับให้เลย หรือจะนับเองด้วย dict.get ก็ได้" },
      { t: "code", lang: "python", c: `from collections import Counter

words = ["a", "b", "a", "c", "a", "b"]

# วิธีที่ 1 — Counter นับให้อัตโนมัติ
count = Counter(words)         # Counter({'a': 3, 'b': 2, 'c': 1})
print(count["a"])             # 3

# วิธีที่ 2 — นับเองด้วย dict.get (ค่าเริ่มต้น 0)
count = {}
for w in words:
    count[w] = count.get(w, 0) + 1
print(count)                  # {'a': 3, 'b': 2, 'c': 1}` },
      { t: "callout", title: "เลือกใช้ยังไง", c: "ต้องการแค่ check membership / ตัด duplicate / หา intersection ใช้ set ต้องการ count (นับจำนวน) หรือ จับคู่ key กับ value ใช้ dict หรือ Counter ทั้งคู่ lookup ในเวลา O(1) โดยเฉลี่ย" },

      { t: "callout", title: "พร้อมแล้วไปต่อ", c: "หมวดนี้มี 4 ข้อ ไล่จาก set ตรง ๆ ไปจนถึงการนับความถี่แล้วจับคู่ tuple กดถัดไปเริ่มข้อแรกได้เลย" },
    ],
  },

  "lc75-p20": {
    slug: "lc75-p20",
    title: "ข้อ 20 · LC2215 Find the Difference of Two Arrays (ผลต่างสองอาเรย์) 🟢",
    lead: "หาค่าที่อยู่ใน array หนึ่งแต่ไม่อยู่ในอีก array ด้วย set difference (การลบ set)",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ (LC2215): กำหนด array จำนวนเต็มแบบ 0-indexed สองตัวคือ nums1 และ nums2 ให้ return ผลลัพธ์เป็น array ขนาด 2 ชื่อ answer โดย answer[0] คือ list ของค่าจำนวนเต็มที่ distinct (ไม่ซ้ำกัน) ทั้งหมดใน nums1 ที่ไม่ปรากฏใน nums2 และ answer[1] คือ list ของค่าจำนวนเต็มที่ distinct ทั้งหมดใน nums2 ที่ไม่ปรากฏใน nums1 ลำดับของค่าใน list แต่ละอันไม่มีผลต่อความถูกต้องของคำตอบ" },
      {
        t: "example",
        c: [
          {
            input: "nums1 = [1, 2, 3], nums2 = [2, 4, 6]",
            output: "[[1, 3], [4, 6]]",
            explain: "1 และ 3 อยู่ใน nums1 แต่ไม่อยู่ใน nums2 ส่วน 4 และ 6 อยู่ใน nums2 แต่ไม่อยู่ใน nums1",
          },
          {
            input: "nums1 = [1, 2, 3, 3], nums2 = [1, 1, 2, 2]",
            output: "[[3], []]",
            explain: "มีแค่ 3 ที่อยู่ใน nums1 แต่ไม่อยู่ใน nums2 (นับครั้งเดียวเพราะต้อง distinct) ส่วนทุกค่าใน nums2 มีอยู่ใน nums1 ครบแล้ว answer[1] จึงว่าง",
          },
        ],
      },
      {
        t: "constraints",
        c: [
        "1 <= nums1.length, nums2.length <= 1000",
        "-1000 <= nums1[i], nums2[i] <= 1000",
        ],
      },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "โจทย์นี้พูดถึง ค่าไม่ซ้ำ และ อยู่ในกองนี้แต่ไม่อยู่ในอีกกอง ซึ่งตรงกับนิยามของ set เป๊ะ ๆ เพราะ set ตัด duplicate (ตัวซ้ำ) ให้อัตโนมัติและมี operator (ตัวดำเนินการ) difference ในตัว" },
      { t: "p", c: "ถ้าไม่ใช้ set แล้วเช็คด้วย if x in nums2 บน list ตรง ๆ การเช็คแต่ละครั้งจะเป็น O(n) ทำให้รวมกลายเป็น O(n^2) การ convert (แปลง) เป็น set ก่อนจึงคุ้มมาก เพราะ check membership เหลือ O(1)" },
      { t: "ol", c: [
        "convert nums1 เป็น set s1 และ nums2 เป็น set s2 (ตัด duplicate ในตัว)",
        "หา s1 - s2 = ค่าที่อยู่ใน s1 แต่ไม่อยู่ใน s2",
        "หา s2 - s1 = ค่าที่อยู่ใน s2 แต่ไม่อยู่ใน s1",
        "return ผลลัพธ์เป็น array สองชั้น โดย convert set กลับเป็น list",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "อย่าลืมว่าต้องทำ difference ทั้ง สองทิศทาง (s1-s2 และ s2-s1) คนละค่ากัน และเพราะโจทย์บอกว่าลำดับไม่สำคัญ จึงไม่ต้องกังวลว่า list(set) จะเรียงยังไง" },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `def find_difference(nums1, nums2):
    s1, s2 = set(nums1), set(nums2)  # ตัดตัวซ้ำของแต่ละกอง
    # s1 - s2 = อยู่ใน s1 แต่ไม่อยู่ใน s2
    # s2 - s1 = อยู่ใน s2 แต่ไม่อยู่ใน s1
    return [list(s1 - s2), list(s2 - s1)]

print(find_difference([1, 2, 3], [2, 4, 6]))        # [[1, 3], [4, 6]]
print(find_difference([1, 2, 3, 3], [1, 1, 2, 2]))  # [[3], []]`, out: `[[1, 3], [4, 6]]
[[3], []]` },
        { t: "p", c: "เมื่อ convert เป็น set ปัญหาเรื่องค่าไม่ซ้ำถูกจัดการให้อัตโนมัติ ที่เหลือคือใช้ operator difference (เครื่องหมายลบระหว่าง set) ซึ่งคืน element (สมาชิก) ที่อยู่ในฝั่งซ้ายแต่ไม่อยู่ฝั่งขวา ทำสองทิศทางก็ได้คำตอบครบ" },
        { t: "p", c: "ถ้าลองเปลี่ยนไปทำบน list โดยไม่ convert เป็น set ก่อน นอกจากจะช้าเป็น O(n^2) แล้ว ยังต้องเขียนโค้ดตัด duplicate เองอีก ซึ่ง set จัดการให้หมดในบรรทัดเดียว" },
        { t: "p", c: "Time O(n + m) convert สอง array เป็น set และทำ difference · Space O(n + m) เก็บสอง set" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "เจอโจทย์ที่พูดถึง อยู่ในกองนี้แต่ไม่อยู่ในกองนั้น หรือ ค่าที่ต่างกัน ให้นึกถึง set difference ทันที และ operator & | - ของ set ช่วยเขียน set logic (ตรรกะเซต) ให้สั้นและเร็ว" },
    ],
  },

  "lc75-p21": {
    slug: "lc75-p21",
    title: "ข้อ 21 · LC1207 Unique Number of Occurrences (จำนวนครั้งไม่ซ้ำ) 🟢",
    lead: "นับ frequency (ความถี่) ของแต่ละค่า แล้วเช็คว่า occurrences (จำนวนครั้ง) ทั้งหมดไม่ซ้ำกัน",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ (LC1207): กำหนด array จำนวนเต็ม arr ให้ return true ถ้าจำนวนครั้ง (occurrences) ที่แต่ละค่าปรากฏใน array นี้ไม่ซ้ำกันเลยสักคู่ มิเช่นนั้น return false" },
      {
        t: "example",
        c: [
          {
            input: "arr = [1, 2, 2, 1, 1, 3]",
            output: "true",
            explain: "1 ปรากฏ 3 ครั้ง, 2 ปรากฏ 2 ครั้ง, 3 ปรากฏ 1 ครั้ง — จำนวนครั้ง {3, 2, 1} ไม่มีตัวไหนซ้ำกันเลย",
          },
          {
            input: "arr = [1, 2]",
            output: "false",
            explain: "ทั้ง 1 และ 2 ต่างปรากฏ 1 ครั้งเท่ากัน จำนวนครั้งจึงซ้ำกัน",
          },
          {
            input: "arr = [3, 5, 7, 7, 5, 5]",
            output: "true",
            explain: "3 ปรากฏ 1 ครั้ง, 5 ปรากฏ 3 ครั้ง, 7 ปรากฏ 2 ครั้ง — จำนวนครั้งไม่ซ้ำกันเลย",
          },
        ],
      },
      {
        t: "constraints",
        c: [
        "1 <= arr.length <= 1000",
        "-1000 <= arr[i] <= 1000",
        ],
      },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "โจทย์แบ่งเป็นสองชั้น ชั้นแรกต้อง count frequency (นับความถี่) ของแต่ละค่า (ใช้ dict/Counter) ชั้นสองต้องเช็คว่า occurrences (ค่าจำนวนครั้ง) เหล่านั้นมี duplicate (ตัวซ้ำ) กันไหม" },
      { t: "p", c: "ทริกเช็ค duplicate ที่ใช้บ่อยคือเทียบ len ของ list เดิมกับ len ของ set ของมัน ถ้าเท่ากันแปลว่าไม่มีตัวไหนซ้ำ (เพราะ set ตัดตัวซ้ำออก ถ้ามีซ้ำ ขนาดจะหด)" },
      { t: "ol", c: [
        "count frequency ด้วย Counter(arr) ได้ dict ที่ key คือค่า value คือ occurrences (จำนวนครั้ง)",
        "ดึงเฉพาะ occurrences ออกมาด้วย .values()",
        "เทียบ len ของ occurrences ทั้งหมด กับ len ของ set ของมัน",
        "เท่ากัน → ไม่มี occurrences ซ้ำ return True มิเช่นนั้น return False",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "อย่าเผลอเอา key (ตัวค่า) ไปเช็คแทน occurrences ต้องใช้ .values() ซึ่งเป็น occurrences ไม่ใช่ .keys() เพราะ key ย่อมไม่ซ้ำกันอยู่แล้วโดยธรรมชาติของ dict" },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `from collections import Counter

def unique_occurrences(arr):
    counts = Counter(arr).values()   # จำนวนครั้งของแต่ละค่า เช่น [3, 2, 1]
    # ถ้าเอา values ใส่ set แล้วขนาดยังเท่าเดิม แปลว่าไม่มีตัวซ้ำ
    return len(counts) == len(set(counts))

print(unique_occurrences([1, 2, 2, 1, 1, 3]))  # True
print(unique_occurrences([1, 2]))              # False
print(unique_occurrences([3, 5, 7, 7, 5, 5]))  # True (3->1, 5->3, 7->2)`, out: `True
False
True` },
        { t: "p", c: "ชั้นแรก Counter(arr) นับให้อัตโนมัติ แล้ว .values() คืน occurrences ทั้งหมดออกมาเป็นลำดับหนึ่งชุด ชั้นสอง convert ชุดนั้นเป็น set แล้วเทียบขนาด ถ้ามี occurrences ที่ซ้ำกัน set จะยุบตัวลง ขนาดจึงไม่เท่ากับต้นฉบับ" },
        { t: "p", c: "ถ้าลองเขียนเองแบบไล่เช็คคู่ทุกคู่ของ occurrences จะเป็น O(k^2) แต่ทริก len เทียบ set ทำให้เหลือ O(k) และอ่านง่ายกว่ามาก" },
        { t: "p", c: "Time O(n) count frequency หนึ่งรอบ สร้าง set หนึ่งรอบ · Space O(n) เก็บ Counter และ set ของ frequency" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "pattern สองชั้น นับก่อนด้วย Counter แล้วค่อยประมวลผลบน frequency (ค่าความถี่) พบบ่อยมาก และทริก len(x) == len(set(x)) คือวิธีเช็ค duplicate (มีตัวซ้ำไหม) ที่สั้นที่สุด" },
    ],
  },

  "lc75-p22": {
    slug: "lc75-p22",
    title: "ข้อ 22 · LC1657 Determine if Two Strings Are Close (สองสตริงใกล้กัน) 🟡",
    lead: "แปล operation (ปฏิบัติการ) สองแบบให้เป็นเงื่อนไขบน character set (ชุดตัวอักษร) และกอง frequency (ความถี่)",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: 'โจทย์ (LC1657): กำหนด string สองตัวคือ word1 และ word2 ให้ return true ถ้า word1 และ word2 เป็น close (ใกล้กัน) มิเช่นนั้น return false ทั้งสอง string จะ close กันได้ก็ต่อเมื่อเปลี่ยนจาก string หนึ่งไปเป็นอีก string ได้ด้วย operation สองแบบนี้ (ทำกี่ครั้งก็ได้ กับ string ฝั่งไหนก็ได้): (1) swap ตำแหน่งของ character สองตัวที่มีอยู่จริงใน string (เช่น "abcde" → "aecdb") (2) เปลี่ยนทุกตำแหน่งของ character ตัวหนึ่งที่มีอยู่จริงให้กลายเป็น character อีกตัวที่มีอยู่จริง พร้อมกับสลับกลับพร้อมกัน (เช่น "aacabb" → "bbcbaa" คือเปลี่ยน a ทั้งหมดเป็น b และ b ทั้งหมดเป็น a พร้อมกัน)' },
      {
        t: "example",
        c: [
          {
            input: 'word1 = "abc", word2 = "bca"',
            output: "true",
            explain: 'เปลี่ยน "abc" เป็น "bca" ได้ด้วยการ swap ตำแหน่ง character เท่านั้น',
          },
          {
            input: 'word1 = "a", word2 = "aa"',
            output: "false",
            explain: "ความยาวไม่เท่ากัน character set และกอง frequency จึงต่างกันไปด้วย เป็น close กันไม่ได้",
          },
          {
            input: 'word1 = "cabbba", word2 = "abbccc"',
            output: "true",
            explain: "ทั้งสอง string ใช้ character set {a, b, c} เดียวกัน และกอง frequency ตรงกัน (สลับ frequency ระหว่าง a กับ c ได้)",
          },
          {
            input: 'word1 = "cabbba", word2 = "aabbss"',
            output: "false",
            explain: "แม้กอง frequency จะเรียงเท่ากัน แต่ character set ต่างกัน ({a, b, c} กับ {a, b, s}) จึงไม่ close",
          },
        ],
      },
      {
        t: "constraints",
        c: [
        "1 <= word1.length, word2.length <= 10^5",
        "word1 และ word2 เป็นตัวอักษรอังกฤษพิมพ์เล็ก",
        ],
      },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "กุญแจคือแปลความหมายของ operation ทั้งสองให้เป็นเงื่อนไขที่เช็คได้ operation 1 (swap ตำแหน่ง) บอกว่าลำดับไม่มีผล เหลือแค่ ตัวอะไรมีกี่ตัว operation 2 (สลับ frequency) บอกว่าเราจับคู่ character กับจำนวนได้อิสระ ตราบใดที่ character นั้นมีอยู่แล้ว" },
      { t: "p", c: "เราจึงใช้ Counter นับ frequency ของแต่ละ string แล้วตรวจสองเงื่อนไข ไม่ต้องลอง swap จริง ๆ ซึ่งจะเป็นการ search ที่ระเบิดเป็น factorial (แฟกทอเรียล)" },
      { t: "ol", c: [
        "สร้าง Counter ของ word1 และ word2 เป็น c1, c2",
        "เงื่อนไข 1: set(c1) == set(c2) — ต้องใช้ character set เดียวกัน (operation 2 สลับได้เฉพาะตัวที่มีอยู่ เสกตัวใหม่ไม่ได้)",
        "เงื่อนไข 2: sorted(c1.values()) == sorted(c2.values()) — กองของ frequency ต้องจับคู่กันได้พอดี",
        "เป็นจริงทั้งสองข้อ → close return True",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "อย่าลืมเงื่อนไขข้อ 1 (character set เดียวกัน) ถ้าเช็คแค่ frequency เรียงเท่ากัน cabbba กับ aabbss จะถูกตอบผิดเป็น True ทั้งที่ตัว s ไม่มีใน word1 เลย operation 2 จึงเสกมันขึ้นมาไม่ได้" },

      { t: "h2", c: "ไล่ทีละสเต็ป" },
      { t: "p", c: "เทียบสองเงื่อนไขบนตัวอย่างทั้งสี่" },
      { t: "table", head: ["word1 / word2", "character set เท่ากัน?", "frequency เรียงเท่ากัน?", "ผล"], rows: [
        ["abc / bca", "ใช่ {a,b,c}", "ใช่ [1,1,1]", "True"],
        ["a / aa", "ใช่ {a}", "ไม่ [1] vs [2]", "False"],
        ["cabbba / abbccc", "ใช่ {a,b,c}", "ใช่ [1,2,3]", "True"],
        ["cabbba / aabbss", "ไม่ {a,b,c} vs {a,b,s}", "(ใช่ [1,2,3])", "False"],
      ] },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `from collections import Counter

def close_strings(word1, word2):
    c1, c2 = Counter(word1), Counter(word2)
    # เงื่อนไข 1: ต้องใช้ชุดตัวอักษรเดียวกัน (set ของคีย์เท่ากัน)
    # เงื่อนไข 2: กองของจำนวนความถี่ต้องตรงกัน (เรียงแล้วเท่ากัน)
    return (set(c1) == set(c2)
            and sorted(c1.values()) == sorted(c2.values()))

print(close_strings("abc", "bca"))        # True
print(close_strings("a", "aa"))           # False
print(close_strings("cabbba", "abbccc"))  # True
print(close_strings("cabbba", "aabbss"))  # False`, out: `True
False
True
False` },
        { t: "p", c: "set(c1) เอาเฉพาะ key (ตัวอักษรที่ปรากฏ) มาเทียบกัน ส่วน c1.values() คือ frequency ของแต่ละตัว การ sort (เรียง) ก่อนเทียบทำให้ไม่สนว่าตัวไหนจับกับจำนวนไหน สนแค่ว่ากองตัวเลขเหมือนกันไหม ซึ่งตรงกับอิสระของ operation 2 พอดี" },
        { t: "p", c: "ทำไมต้องมีทั้งสองเงื่อนไขคู่กัน? เงื่อนไข 2 อย่างเดียวยอมให้ character คนละชุดผ่านได้ (เช่น s แทน c) ส่วนเงื่อนไข 1 อย่างเดียวก็ไม่พอเพราะ frequency แต่ละตัวอาจไม่จับคู่กันได้ ต้องครบทั้งสองข้อ" },
        { t: "p", c: "Time O(n + k log k) count frequency O(n) และ sort frequency ที่มีอย่างมาก k = 26 ตัว · Space O(k) เก็บ Counter ของ character (คงที่ 26 ตัว)" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "โจทย์ที่ให้ operation แปลก ๆ มักแก้ด้วยการแปล operation เป็น invariant (สิ่งที่ไม่เปลี่ยนไม่ว่าทำกี่ครั้ง) แล้วเช็ค invariant นั้นแทนการ simulate (จำลอง) จริง ที่นี่ invariant คือ character set กับ กอง frequency" },
    ],
  },

  "lc75-p23": {
    slug: "lc75-p23",
    title: "ข้อ 23 · LC2352 Equal Row and Column Pairs (คู่แถว-คอลัมน์) 🟡",
    lead: "นับ frequency (ความถี่) ของ row (แถว) ด้วย tuple แล้วยิงถามทีละ column (คอลัมน์)",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ (LC2352): กำหนด integer matrix (เมทริกซ์) grid ขนาด n x n แบบ 0-indexed ให้ return จำนวนคู่ (ri, cj) ที่ row ri และ column cj เท่ากัน คู่ row-column จะถือว่าเท่ากันก็ต่อเมื่อมีสมาชิกเหมือนกันทุกตำแหน่งเรียงตามลำดับเดียวกัน" },
      {
        t: "example",
        c: [
          {
            input: "grid = [[3, 2, 1], [1, 7, 6], [2, 7, 7]]",
            output: "1",
            explain: "มีคู่ที่เท่ากันหนึ่งคู่คือ (row 2, column 1) ซึ่งทั้งคู่เป็น [2, 7, 7]",
          },
          {
            input: "grid = [[3, 1, 2, 2], [1, 4, 4, 5], [2, 4, 2, 2], [2, 4, 2, 2]]",
            output: "3",
            explain: "มี 3 คู่ที่เท่ากัน: (row 0, column 0) = [3,1,2,2], (row 2, column 2) = [2,4,2,2], (row 3, column 2) = [2,4,2,2]",
          },
        ],
      },
      {
        t: "constraints",
        c: [
        "n == grid.length == grid[i].length",
        "1 <= n <= 200",
        "1 <= grid[i][j] <= 10^5",
        ],
      },
      { t: "callout", c: "ลำดับของค่าใน row/column สำคัญ [2,7,7] ตรงกับ [2,7,7] เท่านั้น ไม่ตรงกับ [7,2,7] และ row ที่หน้าตาซ้ำกันหลายแถวก็นับเป็นหลาย pair" },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "วิธี naive (ตรงตัว) คือเทียบทุก row กับทุก column ซึ่งเป็น O(n^2) pair และแต่ละ pair เทียบ n ช่อง รวมเป็น O(n^3) ช้าเกินไปเมื่อ n ใหญ่" },
      { t: "p", c: "เร่งด้วย hash map ได้ ไอเดียคือ count (นับ) ว่าแต่ละหน้าตา row ปรากฏกี่ครั้ง เก็บใน Counter แล้ว iterate (ไล่) ทีละ column ถามว่ามี row หน้าตาเดียวกันกี่แถว accumulate (บวกสะสม) เพราะ row และ column เป็นลำดับตัวเลข เราต้อง convert (แปลง) เป็น tuple ก่อน (list เอาเป็น key ของ dict ไม่ได้เพราะ mutable (แก้ค่าได้) แต่ tuple immutable (แก้ไม่ได้) จึง hash ได้)" },
      { t: "ol", c: [
        "อ่านขนาด n = len(grid)",
        "convert แต่ละ row เป็น tuple แล้วนับด้วย Counter ได้ row_count ว่าหน้าตาแบบไหนมีกี่แถว",
        "iterate ทีละ column j: ประกอบค่า column เป็น tuple col",
        "บวก row_count[col] เข้าตัวนับ pairs (มี row หน้าตาตรงกันกี่แถว จับคู่ได้ทุกแถว)",
        "จบ loop return pairs",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ต้อง บวกจำนวน row_count[col] ไม่ใช่บวกทีละหนึ่ง เพราะ row ที่เหมือนกันหลายแถวจับคู่กับ column นี้ได้ทุกแถว ข้อดีของ Counter คือถ้า key ไม่มีจะคืน 0 ให้เอง ไม่ error" },

      { t: "h2", c: "ไล่ทีละสเต็ป" },
      { t: "p", c: "iterate grid = [[3,2,1],[1,7,6],[2,7,7]] ซึ่ง row_count = {(3,2,1):1, (1,7,6):1, (2,7,7):1}" },
      { t: "table", head: ["j", "column (tuple)", "row_count[col]", "pairs สะสม"], rows: [
        ["0", "(3, 1, 2)", "0", "0"],
        ["1", "(2, 7, 7)", "1", "1"],
        ["2", "(1, 6, 7)", "0", "1"],
      ] },
      { t: "p", c: "จบ loop pairs = 1 ตรงกับคำตอบ" },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `from collections import Counter

def equal_pairs(grid):
    n = len(grid)
    # นับว่าแต่ละ "หน้าตาแถว" (แปลงเป็น tuple) ปรากฏกี่ครั้ง
    row_count = Counter(tuple(row) for row in grid)

    pairs = 0
    for j in range(n):
        # ประกอบคอลัมน์ที่ j เป็น tuple
        col = tuple(grid[i][j] for i in range(n))
        # มีแถวหน้าตาตรงกับคอลัมน์นี้กี่แถว บวกเข้าไปทั้งหมด
        pairs += row_count[col]
    return pairs

print(equal_pairs([[3, 2, 1], [1, 7, 6], [2, 7, 7]]))  # 1
print(equal_pairs([[3, 1, 2, 2], [1, 4, 4, 5],
                   [2, 4, 2, 2], [2, 4, 2, 2]]))        # 3`, out: `1
3` },
        { t: "p", c: "ขั้นแรก convert แต่ละ row เป็น tuple แล้วนับด้วย Counter ว่าหน้าตาแบบไหนมีกี่แถว การใช้ tuple สำคัญเพราะ list mutable (เปลี่ยนแปลงได้) จึงเป็น key ของ dict ไม่ได้ แต่ tuple immutable (คงที่) จึง hash ได้" },
        { t: "p", c: "ขั้นสอง iterate ทีละ column ประกอบเป็น tuple แล้วถามจาก row_count ว่ามี row หน้าตาเดียวกันกี่แถว เพราะ row ที่เหมือนกันหลายแถวจับคู่กับ column นี้ได้ทุกแถว จึงบวกจำนวนที่ได้ ในตัวอย่างที่สอง column หนึ่งไปตรงกับ row ที่หน้าตาซ้ำกันสองแถว ก็บวก 2 ทีเดียว" },
        { t: "p", c: "Time O(n^2) แต่ละ row และแต่ละ column มี n ช่อง รวม n row/column เป็น O(n^2) · Space O(n^2) เก็บ tuple ของ row ทั้งหมดใน Counter" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "เมื่อต้อง จับคู่ของที่เหมือนกัน จากสองกอง อย่าเทียบทุก pair (O(n^2) คู่) ให้ นับกองหนึ่งลง hash map ก่อน แล้วยิงถามอีกกองทีละตัว และจำไว้ว่าจะเอา list/row เป็น key ต้อง convert เป็น tuple ก่อน" },
    ],
  },
};
