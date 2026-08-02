import type { Page } from "@/lib/types";

export const lessonPages: Record<string, Page> = {
  "topic-array-string": {
    slug: "topic-array-string",
    title: { th: "บทเรียน: Array, String & Matrix", en: "" },
    lead: { th: "บทเรียนเต็มตั้งแต่พื้นฐานจนถึงเทคนิคขั้นสูง พร้อมโค้ด Python, ตัวอย่างไล่ทีละขั้น และโจทย์ฝึกมีเฉลย", en: "" },
    group: "บทเรียนหัวข้อ",
    blocks: {
      th: [
        { t: "p", c: "Array คือโครงสร้างข้อมูลที่พื้นฐานที่สุดและเจอบ่อยที่สุดในการสัมภาษณ์ ถ้าเข้าใจบทนี้แน่น คุณจะต่อยอดไปหัวข้ออื่นได้ง่ายขึ้นมาก บทนี้จะพาไปตั้งแต่ \"array คืออะไร\" จนถึงเทคนิคที่ใช้แก้โจทย์ระดับ medium ได้จริง พร้อมโจทย์ฝึกมีเฉลยท้ายบท" },

        { t: "h2", c: "1. Array คืออะไร (Mental Model)" },
        { t: "p", c: "Array คือกล่องข้อมูลหลาย ๆ ช่องที่เรียงต่อกันในหน่วยความจำ แต่ละช่องมีหมายเลขกำกับเรียกว่า index เริ่มนับจาก 0 เสมอ เพราะช่องเรียงต่อกันและรู้ขนาดของแต่ละช่อง คอมพิวเตอร์จึงกระโดดไปอ่านช่องไหนก็ได้ทันที (O(1)) โดยไม่ต้องไล่ทีละช่อง" },
        { t: "code", lang: "text", c: "index:    0     1     2     3     4\n        +-----+-----+-----+-----+-----+\nnums =  |  10 |  20 |  30 |  40 |  50 |\n        +-----+-----+-----+-----+-----+\n\nnums[0] = 10   (ช่องแรก)\nnums[2] = 30\nnums[4] = 50   (ช่องสุดท้าย = len - 1)" },
        { t: "callout", title: "ทำไม index เริ่มที่ 0", c: "index คือ \"ระยะห่างจากช่องแรก\" ช่องแรกห่างจากตัวเอง 0 ช่อง จึงเป็น index 0 เข้าใจจุดนี้จะช่วยลด bug off-by-one ได้มาก" },

        { t: "h2", c: "2. การทำงานพื้นฐาน (Operations)" },
        { t: "code", lang: "python", c: "nums = [10, 20, 30, 40, 50]\n\nprint(nums[0])      # 10   อ่านค่าด้วย index\nprint(nums[-1])     # 50   index ติดลบ = นับจากท้าย\nprint(len(nums))    # 5    ความยาว\n\nnums[1] = 99        # แก้ค่าในช่อง index 1\nprint(nums)         # [10, 99, 30, 40, 50]\n\n# วน loop อ่านทุกค่า\nfor i, v in enumerate(nums):\n    print(i, v)     # ได้ทั้ง index และค่า" },
        { t: "h3", c: "เพิ่มและลบสมาชิก" },
        { t: "code", lang: "python", c: "nums = [10, 20, 30]\nnums.append(40)       # เพิ่มท้าย -> [10, 20, 30, 40]\nnums.insert(1, 15)    # แทรกที่ index 1 -> [10, 15, 20, 30, 40]\nnums.pop()            # ลบท้าย -> [10, 15, 20, 30]\nnums.pop(0)           # ลบ index 0 -> [15, 20, 30]\nprint(nums)" },
        { t: "h3", c: "Complexity ของแต่ละการทำงาน (และเหตุผล)" },
        {
          t: "table",
          head: ["การทำงาน", "Complexity", "ทำไม"],
          rows: [
            ["เข้าถึง/แก้ด้วย index", "O(1)", "กระโดดไปช่องนั้นได้เลย"],
            ["ค้นหาค่า (array ไม่เรียง)", "O(n)", "ต้องไล่ดูทุกช่อง"],
            ["append (เพิ่มท้าย)", "O(1) เฉลี่ย", "ไม่ต้องเลื่อนใคร"],
            ["insert/ลบกลาง array", "O(n)", "ต้องเลื่อนสมาชิกที่เหลือ"],
          ],
        },
        { t: "callout", title: "จุดสำคัญที่ถูกถามในสัมภาษณ์", c: "การลบ/แทรกตรงกลางเป็น O(n) เพราะต้องเลื่อนของ ถ้าโจทย์ต้องเพิ่ม/ลบหัวท้ายบ่อย ๆ ควรนึกถึงโครงสร้างอื่น เช่น deque หรือ linked list" },

        { t: "h2", c: "3. String คือ Array ของตัวอักษร" },
        { t: "p", c: "String ทำงานคล้าย array มาก เข้าถึงตัวอักษรด้วย index ได้ และตัด (slice) ได้ แต่มีจุดต่างสำคัญใน Python คือ string แก้ไขทีละตัวไม่ได้ (immutable) ถ้าจะแก้ต้องสร้างใหม่" },
        { t: "code", lang: "python", c: "s = \"hello\"\nprint(s[0])       # 'h'\nprint(s[1:4])     # 'ell'  (slice index 1 ถึง 3)\nprint(s[::-1])    # 'olleh' (กลับด้าน)\nprint(len(s))     # 5\n\nwords = \"a,b,c\".split(\",\")   # ['a', 'b', 'c']\njoined = \"-\".join(words)      # 'a-b-c'\n\n# s[0] = 'H'  # ❌ Error! string แก้ทีละตัวไม่ได้\ns = \"H\" + s[1:]               # ✅ สร้างใหม่ -> 'Hello'" },
        { t: "callout", title: "เคล็ดลับ", warn: true, c: "ถ้าต้องแก้ string หลายครั้ง ให้แปลงเป็น list ก่อน (list(s)) แก้เสร็จค่อย ''.join(...) กลับ จะเร็วกว่าการต่อ string ซ้ำ ๆ" },

        { t: "h2", c: "4. เทคนิค Two Pointers" },
        { t: "p", c: "เทคนิคที่ใช้ตัวชี้ (pointer) สองตัวแทนการวน loop ซ้อน loop ช่วยลดเวลาจาก O(n²) เหลือ O(n) มี 2 รูปแบบหลัก" },
        { t: "h3", c: "รูปแบบที่ 1: วิ่งเข้าหากัน (จากสองปลาย)" },
        { t: "p", c: "ตั้งตัวชี้ที่หัวและท้าย แล้วขยับเข้าหากัน เหมาะกับ palindrome หรือหาคู่ใน array ที่เรียงแล้ว" },
        { t: "code", lang: "python", c: "# เช็คว่าเป็น palindrome ไหม (อ่านหน้า-หลังเหมือนกัน)\ndef is_palindrome(s):\n    i, j = 0, len(s) - 1\n    while i < j:\n        if s[i] != s[j]:\n            return False\n        i += 1\n        j -= 1\n    return True\n\nprint(is_palindrome(\"racecar\"))  # True\nprint(is_palindrome(\"hello\"))    # False" },
        { t: "code", lang: "python", c: "# หาคู่ที่บวกกันได้ target ใน array ที่เรียงแล้ว\ndef two_sum_sorted(nums, target):\n    i, j = 0, len(nums) - 1\n    while i < j:\n        s = nums[i] + nums[j]\n        if s == target:\n            return [i, j]\n        elif s < target:\n            i += 1      # ผลรวมน้อยไป ดันซ้ายขึ้น\n        else:\n            j -= 1      # ผลรวมมากไป ดึงขวาลง\n    return []\n\nprint(two_sum_sorted([1, 3, 4, 6, 8], 10))  # [2, 3] -> 4+6" },
        { t: "h3", c: "รูปแบบที่ 2: วิ่งไปทางเดียวกัน (slow/fast)" },
        { t: "p", c: "ตัวชี้ slow เก็บตำแหน่งผลลัพธ์ ตัว fast ไล่อ่านข้อมูล เหมาะกับการลบซ้ำหรือกรองข้อมูลในที่เดิม" },
        { t: "code", lang: "python", c: "# ลบค่าซ้ำออกจาก array ที่เรียงแล้ว (แก้ในที่เดิม)\ndef remove_duplicates(nums):\n    if not nums:\n        return 0\n    slow = 0\n    for fast in range(1, len(nums)):\n        if nums[fast] != nums[slow]:\n            slow += 1\n            nums[slow] = nums[fast]\n    return slow + 1   # จำนวนสมาชิกที่ไม่ซ้ำ\n\narr = [1, 1, 2, 2, 3]\nk = remove_duplicates(arr)\nprint(k, arr[:k])  # 3 [1, 2, 3]" },

        { t: "h2", c: "5. เทคนิค Sliding Window" },
        { t: "p", c: "ใช้กับโจทย์ที่ถามเกี่ยวกับ \"ช่วงที่ต่อเนื่องกัน\" (subarray/substring) แทนที่จะคำนวณทุกช่วงใหม่ เราเลื่อนหน้าต่างทีละก้าวและอัปเดตเฉพาะส่วนที่เปลี่ยน" },
        { t: "h3", c: "หน้าต่างขนาดคงที่ (Fixed window)" },
        { t: "code", lang: "python", c: "# ผลรวมมากสุดของ subarray ยาว k\ndef max_sum_k(nums, k):\n    window = sum(nums[:k])      # หน้าต่างแรก\n    best = window\n    for i in range(k, len(nums)):\n        window += nums[i] - nums[i - k]  # +ตัวใหม่ -ตัวเก่า\n        best = max(best, window)\n    return best\n\nprint(max_sum_k([2, 1, 5, 1, 3, 2], 3))  # 9 -> (5+1+3)" },
        { t: "h3", c: "หน้าต่างขนาดยืดหยุ่น (Variable window)" },
        { t: "code", lang: "python", c: "# หาความยาว substring ที่ไม่มีตัวอักษรซ้ำ ที่ยาวที่สุด\ndef longest_unique(s):\n    seen = set()\n    left = 0\n    best = 0\n    for right in range(len(s)):\n        while s[right] in seen:      # ถ้าซ้ำ หดหน้าต่างจากซ้าย\n            seen.remove(s[left])\n            left += 1\n        seen.add(s[right])\n        best = max(best, right - left + 1)\n    return best\n\nprint(longest_unique(\"abcabcbb\"))  # 3 -> \"abc\"" },

        { t: "h2", c: "6. Prefix Sum (เทคนิคโบนัส)" },
        { t: "p", c: "ถ้าต้องถามผลรวมของช่วงต่าง ๆ บ่อย ๆ ให้คำนวณผลรวมสะสมไว้ก่อน แล้วตอบแต่ละคำถามได้ใน O(1)" },
        { t: "code", lang: "python", c: "nums = [3, 1, 4, 1, 5]\nprefix = [0]\nfor n in nums:\n    prefix.append(prefix[-1] + n)\n# prefix = [0, 3, 4, 8, 9, 14]\n\n# ผลรวมช่วง index 1 ถึง 3 = prefix[4] - prefix[1]\nprint(prefix[4] - prefix[1])  # 6 -> (1+4+1)" },

        { t: "h2", c: "7. Matrix (Array 2 มิติ)" },
        { t: "p", c: "Matrix คือ array ที่สมาชิกแต่ละตัวเป็น array อีกที เข้าถึงด้วยสอง index คือ [แถว][คอลัมน์]" },
        { t: "code", lang: "python", c: "grid = [[1, 2, 3],\n        [4, 5, 6]]\n\nprint(grid[1][2])       # 6  (แถว 1, คอลัมน์ 2)\nprint(len(grid))        # 2  จำนวนแถว\nprint(len(grid[0]))     # 3  จำนวนคอลัมน์\n\n# วนทุกช่อง\nfor r in range(len(grid)):\n    for c in range(len(grid[0])):\n        print(grid[r][c], end=' ')\n# 1 2 3 4 5 6\n\n# สร้าง matrix ขนาด 3x3 เต็มไปด้วย 0\nzeros = [[0] * 3 for _ in range(3)]" },
        { t: "callout", title: "กับดักยอดฮิตของ matrix", warn: true, c: "อย่าสร้าง 2D list ด้วย [[0]*3]*3 เพราะทุกแถวจะชี้ไป list เดียวกัน แก้แถวหนึ่งเปลี่ยนหมด! ให้ใช้ [[0]*3 for _ in range(3)] แทน" },

        { t: "h2", c: "8. จับสัญญาณว่าโจทย์ใช้เทคนิคไหน" },
        {
          t: "table",
          head: ["เจอลักษณะนี้ในโจทย์", "ลองใช้"],
          rows: [
            ["array เรียงแล้ว, หาคู่, palindrome", "Two pointers (สองปลาย)"],
            ["ลบ/กรองข้อมูลในที่เดิม", "Two pointers (slow/fast)"],
            ["subarray/substring ต่อเนื่อง ยาว/สั้นที่สุด", "Sliding window"],
            ["ถามผลรวมของช่วงหลาย ๆ ครั้ง", "Prefix sum"],
            ["ตาราง/กริด/พิกัด", "Matrix traversal"],
          ],
        },

        { t: "h2", c: "9. ตัวอย่างไล่ทีละขั้น (Two Sum sorted)" },
        { t: "p", c: "ลองไล่ดูว่า two_sum_sorted([1, 3, 4, 6, 8], 10) ทำงานอย่างไรทีละก้าว" },
        { t: "code", lang: "text", c: "nums = [1, 3, 4, 6, 8], target = 10\n\nรอบ 1: i=0(1) j=4(8)  -> 1+8=9  < 10  ดัน i ขึ้น\nรอบ 2: i=1(3) j=4(8)  -> 3+8=11 > 10  ดึง j ลง\nรอบ 3: i=1(3) j=3(6)  -> 3+6=9  < 10  ดัน i ขึ้น\nรอบ 4: i=2(4) j=3(6)  -> 4+6=10 = 10  เจอ! ตอบ [2, 3]" },

        { t: "h2", c: "10. ข้อผิดพลาดที่พบบ่อย" },
        {
          t: "ul",
          c: [
            "Off-by-one — สับสนระหว่าง index สุดท้ายคือ len(arr) หรือ len(arr) - 1 (คำตอบคือ len-1)",
            "แก้ไข array ขณะวน loop ทำให้ index เพี้ยน — ถ้าต้องลบ ให้วนจากท้ายมาหน้า หรือสร้าง list ใหม่",
            "ลืมเช็ค array ว่าง ([]) หรือมีสมาชิกตัวเดียว",
            "สร้าง matrix ผิดด้วย [[0]*n]*m (ดูกับดักด้านบน)",
          ],
        },

        { t: "h2", c: "11. โจทย์ฝึก (ลองทำก่อนดูเฉลย)" },
        { t: "p", c: "ลองเขียนเองให้สุดก่อนกดดูเฉลยทุกข้อ — นี่คือวิธีฝึกที่ได้ผลที่สุด" },
        { t: "h3", c: "โจทย์ 1 (ง่าย): กลับลำดับ array ในที่เดิม" },
        { t: "p", c: "รับ array แล้วกลับลำดับสมาชิกโดยไม่สร้าง array ใหม่ เช่น [1,2,3,4] -> [4,3,2,1]" },
        {
          t: "details",
          summary: "ดูเฉลย",
          c: [
            { t: "p", c: "ใช้ two pointers จากสองปลาย สลับค่ากันแล้วขยับเข้าหากัน" },
            { t: "code", lang: "python", c: "def reverse_array(nums):\n    i, j = 0, len(nums) - 1\n    while i < j:\n        nums[i], nums[j] = nums[j], nums[i]\n        i += 1\n        j -= 1\n    return nums\n\nprint(reverse_array([1, 2, 3, 4]))  # [4, 3, 2, 1]" },
          ],
        },
        { t: "h3", c: "โจทย์ 2 (กลาง): ราคาหุ้นซื้อ-ขายกำไรสูงสุด" },
        { t: "p", c: "รับ array ราคาหุ้นรายวัน หากำไรสูงสุดจากการซื้อหนึ่งวันแล้วขายวันหลัง เช่น [7,1,5,3,6,4] -> 5 (ซื้อที่ 1 ขายที่ 6)" },
        {
          t: "details",
          summary: "ดูคำใบ้",
          c: [{ t: "p", c: "วนครั้งเดียว เก็บราคาต่ำสุดที่เคยเจอ และอัปเดตกำไรสูงสุด = ราคาวันนี้ - ราคาต่ำสุด" }],
        },
        {
          t: "details",
          summary: "ดูเฉลย",
          c: [
            { t: "code", lang: "python", c: "def max_profit(prices):\n    min_price = float('inf')\n    best = 0\n    for p in prices:\n        min_price = min(min_price, p)   # ราคาต่ำสุดจนถึงตอนนี้\n        best = max(best, p - min_price) # กำไรถ้าขายวันนี้\n    return best\n\nprint(max_profit([7, 1, 5, 3, 6, 4]))  # 5" },
            { t: "p", c: "Complexity: O(n) เวลา, O(1) หน่วยความจำ — วนแค่รอบเดียว" },
          ],
        },
        { t: "h3", c: "โจทย์ 3 (กลาง): substring ไม่ซ้ำที่ยาวที่สุด" },
        { t: "p", c: "หาความยาวของ substring ที่ไม่มีตัวอักษรซ้ำที่ยาวที่สุด เช่น \"pwwkew\" -> 3 (\"wke\")" },
        {
          t: "details",
          summary: "ดูเฉลย",
          c: [
            { t: "p", c: "ใช้ sliding window แบบยืดหยุ่น (เหมือนหัวข้อ 5) เก็บตัวอักษรในหน้าต่างด้วย set" },
            { t: "code", lang: "python", c: "def longest_unique(s):\n    seen = set()\n    left = best = 0\n    for right in range(len(s)):\n        while s[right] in seen:\n            seen.remove(s[left])\n            left += 1\n        seen.add(s[right])\n        best = max(best, right - left + 1)\n    return best\n\nprint(longest_unique(\"pwwkew\"))  # 3" },
          ],
        },

        { t: "h2", c: "สรุปบทนี้" },
        {
          t: "ul",
          c: [
            "Array เข้าถึงด้วย index O(1) แต่แทรก/ลบกลางเป็น O(n)",
            "String คล้าย array แต่ใน Python แก้ทีละตัวไม่ได้ (immutable)",
            "Two pointers ลดเวลา loop ซ้อนจาก O(n²) เหลือ O(n)",
            "Sliding window ใช้กับโจทย์ช่วงต่อเนื่อง (subarray/substring)",
            "Prefix sum ตอบผลรวมช่วงได้ O(1) ต่อคำถาม",
            "Matrix คือ array 2 มิติ ระวังการสร้างด้วย [[0]*n]*m",
          ],
        },
        { t: "links", c: [{ title: "บทถัดไป: Hash Table →", slug: "topic-hash-table", desc: "ค้นหา นับ จับคู่ แบบ O(1)" }] },
      ],
      en: [],
    },
  },

  "topic-hash-table": {
    slug: "topic-hash-table",
    title: { th: "บทเรียน: Hash Table", en: "" },
    lead: { th: "โครงสร้างที่ค้นหา/นับ/จับคู่ได้เร็วเฉลี่ย O(1) — กุญแจของโจทย์สัมภาษณ์จำนวนมาก", en: "" },
    group: "บทเรียนหัวข้อ",
    blocks: {
      th: [
        { t: "p", c: "Hash table (dict ใน Python, HashMap ใน Java) เก็บข้อมูลเป็นคู่ key → value และค้นหาด้วย key ได้เร็วเฉลี่ย O(1) เมื่อเจอคำว่า \"นับ\", \"หาตัวซ้ำ\", \"เคยเห็นไหม\", หรือ \"หาคู่ที่รวมได้ค่าเป้าหมาย\" มักใช้ hash table" },
        { t: "h2", c: "ตัวอย่าง: Two Sum" },
        { t: "p", c: "หาคู่ตัวเลขที่บวกกันได้ target — ใช้ hash table เก็บค่าที่เคยเห็น ลดจาก O(n²) เหลือ O(n)" },
        { t: "code", lang: "python", c: "def two_sum(nums, target):\n    seen = {}  # value -> index\n    for i, n in enumerate(nums):\n        need = target - n\n        if need in seen:\n            return [seen[need], i]\n        seen[n] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))  # [0, 1]" },
        { t: "h2", c: "การนับความถี่" },
        { t: "code", lang: "python", c: "from collections import Counter\ncount = Counter(\"banana\")\nprint(count)          # {'a': 3, 'n': 2, 'b': 1}\nprint(count['a'])     # 3" },
        { t: "callout", title: "ข้อควรระวัง", warn: true, c: "key ต้องเป็นชนิดที่ hash ได้ (string, number, tuple) — list หรือ dict เป็น key ไม่ได้ และอย่าลืมว่า O(1) เป็นค่าเฉลี่ย กรณีแย่สุดอาจเป็น O(n)" },
        { t: "links", c: [{ title: "บทถัดไป: Linked List →", slug: "topic-linked-list", desc: "ข้อมูลที่เชื่อมกันด้วย pointer" }] },
      ],
      en: [],
    },
  },

  "topic-linked-list": {
    slug: "topic-linked-list",
    title: { th: "บทเรียน: Linked List", en: "" },
    lead: { th: "ข้อมูลที่แต่ละ node ชี้ไปยัง node ถัดไป — ฝึก reverse, หา cycle และ merge", en: "" },
    group: "บทเรียนหัวข้อ",
    blocks: {
      th: [
        { t: "p", c: "Linked list คือชุด node ที่แต่ละตัวเก็บค่าและ pointer ชี้ไป node ถัดไป ต่างจาก array ตรงที่ไม่ต้องเก็บต่อเนื่องในหน่วยความจำ เพิ่ม/ลบหัวท้ายเร็ว (O(1)) แต่เข้าถึงตำแหน่งกลางช้า (O(n))" },
        { t: "h2", c: "โครงสร้าง node" },
        { t: "code", lang: "python", c: "class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None" },
        { t: "h2", c: "Reverse a Linked List (เจอบ่อยมาก)" },
        { t: "code", lang: "python", c: "def reverse(head):\n    prev = None\n    cur = head\n    while cur:\n        nxt = cur.next   # จำตัวถัดไปไว้\n        cur.next = prev  # กลับทิศ\n        prev = cur\n        cur = nxt\n    return prev  # หัวใหม่" },
        { t: "h2", c: "หา Cycle ด้วย Fast & Slow Pointer" },
        { t: "code", lang: "python", c: "def has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next        # เดินทีละ 1\n        fast = fast.next.next   # เดินทีละ 2\n        if slow is fast:\n            return True         # เจอกัน = มี cycle\n    return False" },
        { t: "callout", title: "ข้อควรระวัง", warn: true, c: "ระวัง null pointer (เช็ค node ก่อนใช้ .next) และระวังทำ list ขาดตอนแก้ pointer — เขียน step ทีละขั้นบนกระดาษช่วยได้มาก" },
        { t: "links", c: [{ title: "บทถัดไป: Stack & Queue →", slug: "topic-stack-queue", desc: "LIFO และ FIFO" }] },
      ],
      en: [],
    },
  },

  "topic-stack-queue": {
    slug: "topic-stack-queue",
    title: { th: "บทเรียน: Stack & Queue", en: "" },
    lead: { th: "Stack เข้าทีหลังออกก่อน (LIFO), Queue เข้าก่อนออกก่อน (FIFO)", en: "" },
    group: "บทเรียนหัวข้อ",
    blocks: {
      th: [
        { t: "p", c: "Stack และ Queue เป็นโครงสร้างที่จำกัดวิธีเพิ่ม/เอาออก Stack = เข้าทีหลังออกก่อน (เหมือนกองจาน) Queue = เข้าก่อนออกก่อน (เหมือนเข้าแถว) ทั้งคู่เพิ่ม/ลบเป็น O(1)" },
        { t: "h2", c: "Stack: ตรวจวงเล็บถูกคู่ไหม" },
        { t: "code", lang: "python", c: "def is_valid(s):\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for ch in s:\n        if ch in '([{':\n            stack.append(ch)\n        elif not stack or stack.pop() != pairs[ch]:\n            return False\n    return not stack\n\nprint(is_valid(\"([])\"))  # True\nprint(is_valid(\"([)]\"))  # False" },
        { t: "h2", c: "Queue: ใช้ deque" },
        { t: "code", lang: "python", c: "from collections import deque\nq = deque()\nq.append(1)       # เข้าท้าย\nq.append(2)\nprint(q.popleft())  # 1  (ออกหัว)" },
        { t: "callout", title: "เจอเมื่อไหร่", c: "Stack เหมาะกับการจับคู่ (วงเล็บ), undo, และโจทย์ \"next greater element\" (monotonic stack) ส่วน Queue ใช้คู่กับ BFS เสมอ" },
        { t: "links", c: [{ title: "บทถัดไป: Recursion & Backtracking →", slug: "topic-recursion", desc: "ฟังก์ชันที่เรียกตัวเอง" }] },
      ],
      en: [],
    },
  },

  "topic-recursion": {
    slug: "topic-recursion",
    title: { th: "บทเรียน: Recursion & Backtracking", en: "" },
    lead: { th: "ฟังก์ชันที่เรียกตัวเองเพื่อแก้ปัญหาย่อย — รากฐานของ tree, graph และ backtracking", en: "" },
    group: "บทเรียนหัวข้อ",
    blocks: {
      th: [
        { t: "p", c: "Recursion คือการที่ฟังก์ชันเรียกตัวเองเพื่อแก้ปัญหาที่เล็กลง ต้องมี 2 ส่วนเสมอ: base case (เงื่อนไขหยุด) และ recursive case (เรียกตัวเองกับปัญหาที่เล็กลง)" },
        { t: "h2", c: "ตัวอย่างพื้นฐาน: factorial" },
        { t: "code", lang: "python", c: "def factorial(n):\n    if n <= 1:        # base case\n        return 1\n    return n * factorial(n - 1)  # recursive case\n\nprint(factorial(5))  # 120" },
        { t: "h2", c: "Backtracking: หาทุก subset" },
        { t: "p", c: "หลักการคือ \"เลือก → เรียกตัวเอง → ถอยกลับ (undo)\" ใช้กับโจทย์ที่ต้องลองทุกความเป็นไปได้ เช่น permutation, combination, การแก้ปริศนา" },
        { t: "code", lang: "python", c: "def subsets(nums):\n    res = []\n    def backtrack(start, path):\n        res.append(path[:])      # บันทึก subset ปัจจุบัน\n        for i in range(start, len(nums)):\n            path.append(nums[i])  # เลือก\n            backtrack(i + 1, path)\n            path.pop()            # ถอยกลับ\n    backtrack(0, [])\n    return res\n\nprint(subsets([1, 2, 3]))" },
        { t: "callout", title: "ข้อควรระวัง", warn: true, c: "ลืม base case = recursion ไม่จบ (stack overflow) เสมอ และเขียน recursion ลึกเกินไปอาจช้า — บางโจทย์ควรแปลงเป็น loop หรือเพิ่ม memoization (ดูบท DP)" },
        { t: "links", c: [{ title: "บทถัดไป: Tree & BST →", slug: "topic-tree", desc: "โครงสร้างต้นไม้ และการ traverse" }] },
      ],
      en: [],
    },
  },

  "topic-tree": {
    slug: "topic-tree",
    title: { th: "บทเรียน: Tree & Binary Search Tree", en: "" },
    lead: { th: "โครงสร้างต้นไม้ การ traverse แบบ DFS/BFS และคุณสมบัติของ BST", en: "" },
    group: "บทเรียนหัวข้อ",
    blocks: {
      th: [
        { t: "p", c: "Tree คือโครงสร้างแบบลำดับชั้น มี root อยู่บนสุด แต่ละ node มี node ลูกได้ Binary tree คือ tree ที่แต่ละ node มีลูกได้ไม่เกิน 2 ตัว (ซ้าย/ขวา) โจทย์ tree ส่วนใหญ่แก้ด้วย recursion ได้สวยงาม" },
        { t: "h2", c: "โครงสร้างและการ traverse แบบ DFS" },
        { t: "code", lang: "python", c: "class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\n# inorder: ซ้าย -> ตัวเอง -> ขวา\ndef inorder(node):\n    if not node:\n        return\n    inorder(node.left)\n    print(node.val)\n    inorder(node.right)" },
        { t: "h2", c: "BFS: เดินทีละชั้น (level order)" },
        { t: "code", lang: "python", c: "from collections import deque\ndef level_order(root):\n    if not root:\n        return []\n    res, q = [], deque([root])\n    while q:\n        node = q.popleft()\n        res.append(node.val)\n        if node.left:  q.append(node.left)\n        if node.right: q.append(node.right)\n    return res" },
        { t: "h2", c: "Binary Search Tree (BST)" },
        { t: "p", c: "BST คือ binary tree ที่ลูกซ้ายน้อยกว่า node และลูกขวามากกว่าเสมอ ทำให้ค้นหา/เพิ่ม/ลบ เป็น O(log n) เมื่อต้นไม้สมดุล" },
        { t: "callout", title: "เจอบ่อย", c: "โจทย์ tree ยอดฮิต: หาความลึก (max depth), เช็คสมดุล, inorder ของ BST ได้ค่าเรียงจากน้อยไปมาก, lowest common ancestor" },
        { t: "links", c: [{ title: "บทถัดไป: Graph →", slug: "topic-graph", desc: "node + edge, BFS/DFS, topological sort" }] },
      ],
      en: [],
    },
  },

  "topic-graph": {
    slug: "topic-graph",
    title: { th: "บทเรียน: Graph", en: "" },
    lead: { th: "node เชื่อมกันด้วย edge — BFS, DFS และการระวัง visited เพื่อกันวนซ้ำ", en: "" },
    group: "บทเรียนหัวข้อ",
    blocks: {
      th: [
        { t: "p", c: "Graph คือ node (จุด) ที่เชื่อมกันด้วย edge (เส้น) ใช้แทนสิ่งที่มีความสัมพันธ์ เช่นเพื่อนใน social network, แผนที่ถนน นิยมเก็บเป็น adjacency list (dict ของ list)" },
        { t: "h2", c: "BFS บน graph" },
        { t: "p", c: "BFS กวาดทีละชั้นจากจุดเริ่ม เหมาะกับการหาเส้นทางสั้นสุดเมื่อ edge มีน้ำหนักเท่ากัน ต้องมี visited set กันวนซ้ำเสมอ" },
        { t: "code", lang: "python", c: "from collections import deque\ndef bfs(graph, start):\n    visited = {start}\n    q = deque([start])\n    order = []\n    while q:\n        node = q.popleft()\n        order.append(node)\n        for nb in graph[node]:\n            if nb not in visited:\n                visited.add(nb)\n                q.append(nb)\n    return order\n\ngraph = {1: [2, 3], 2: [4], 3: [4], 4: []}\nprint(bfs(graph, 1))  # [1, 2, 3, 4]" },
        { t: "h2", c: "DFS แบบ recursion" },
        { t: "code", lang: "python", c: "def dfs(graph, node, visited):\n    if node in visited:\n        return\n    visited.add(node)\n    print(node)\n    for nb in graph[node]:\n        dfs(graph, nb, visited)" },
        { t: "callout", title: "ข้อควรระวัง", warn: true, c: "ลืม visited set = วนไม่จบในกราฟที่มี cycle โจทย์ยอดฮิต: number of islands, course schedule (topological sort), clone graph" },
        { t: "links", c: [{ title: "บทถัดไป: Heap →", slug: "topic-heap", desc: "หา min/max ตลอดเวลา, top-K" }] },
      ],
      en: [],
    },
  },

  "topic-heap": {
    slug: "topic-heap",
    title: { th: "บทเรียน: Heap / Priority Queue", en: "" },
    lead: { th: "โครงสร้างที่หยิบค่าน้อยสุด/มากสุดได้เร็ว — เหมาะกับโจทย์ top-K", en: "" },
    group: "บทเรียนหัวข้อ",
    blocks: {
      th: [
        { t: "p", c: "Heap คือโครงสร้างที่ดูค่าน้อยสุด (min-heap) หรือมากสุด (max-heap) ได้ใน O(1) และเพิ่ม/ลบใน O(log n) เหมาะกับโจทย์ \"หา k ตัวที่ใหญ่/เล็กสุด\" หรือ \"ดึงค่าสุดขั้วซ้ำ ๆ\"" },
        { t: "h2", c: "ใช้ heapq ใน Python (เป็น min-heap)" },
        { t: "code", lang: "python", c: "import heapq\nh = []\nheapq.heappush(h, 5)\nheapq.heappush(h, 1)\nheapq.heappush(h, 3)\nprint(heapq.heappop(h))  # 1  (น้อยสุดออกก่อน)\n\n# หา k ตัวที่ใหญ่สุด\nnums = [3, 1, 5, 12, 2, 11]\nprint(heapq.nlargest(3, nums))  # [12, 11, 5]" },
        { t: "h2", c: "เคล็ดลับ max-heap" },
        { t: "p", c: "Python มีแค่ min-heap ถ้าต้องการ max-heap ให้ใส่ค่าติดลบเข้าไป (push -x แล้ว pop ออกมาคูณ -1)" },
        { t: "callout", title: "เจอบ่อย", c: "kth largest element, merge k sorted lists, top k frequent elements — เห็นคำว่า \"top K\" หรือ \"k ที่ใกล้ที่สุด\" ให้นึกถึง heap ทันที" },
        { t: "links", c: [{ title: "บทถัดไป: Binary Search →", slug: "topic-binary-search", desc: "ค้นหาแบบแบ่งครึ่ง O(log n)" }] },
      ],
      en: [],
    },
  },

  "topic-binary-search": {
    slug: "topic-binary-search",
    title: { th: "บทเรียน: Binary Search", en: "" },
    lead: { th: "ค้นหาด้วยการแบ่งครึ่งพื้นที่ค้นหา ลดเหลือ O(log n) — ไม่ได้ใช้แค่กับ array ที่เรียงแล้ว", en: "" },
    group: "บทเรียนหัวข้อ",
    blocks: {
      th: [
        { t: "p", c: "Binary search หาค่าในข้อมูลที่เรียงแล้วด้วยการแบ่งครึ่งพื้นที่ค้นหาทุกครั้ง จาก O(n) เหลือ O(log n) เช่นข้อมูล 1 ล้านตัวใช้แค่ ~20 ครั้งก็เจอ" },
        { t: "h2", c: "Binary search พื้นฐาน" },
        { t: "code", lang: "python", c: "def binary_search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            lo = mid + 1   # ไปครึ่งขวา\n        else:\n            hi = mid - 1   # ไปครึ่งซ้าย\n    return -1\n\nprint(binary_search([1, 3, 5, 7, 9], 7))  # 3" },
        { t: "h2", c: "ใช้กับโจทย์ \"หาค่าน้อยสุดที่เงื่อนไขเป็นจริง\"" },
        { t: "p", c: "binary search ไม่ได้จำกัดแค่หาเลขใน array แต่ใช้กับช่วงคำตอบที่ \"เรียงลำดับความเป็นไปได้\" ได้ด้วย เช่นหาความเร็วน้อยสุดที่ยังทำงานเสร็จทันเวลา" },
        { t: "callout", title: "ข้อควรระวัง", warn: true, c: "ระวัง off-by-one ตรงการอัปเดต lo/hi และเงื่อนไข while (lo <= hi vs lo < hi) — เขียนผิดนิดเดียวอาจวนไม่จบ ฝึกจนจำ template ได้" },
        { t: "links", c: [{ title: "บทถัดไป: Dynamic Programming →", slug: "topic-dynamic-programming", desc: "แบ่งปัญหาย่อยที่ซ้ำกัน + จำผลลัพธ์" }] },
      ],
      en: [],
    },
  },

  "topic-dynamic-programming": {
    slug: "topic-dynamic-programming",
    title: { th: "บทเรียน: Dynamic Programming", en: "" },
    lead: { th: "หัวข้อที่คนกลัวที่สุด แต่จับหลักได้ไม่ยาก — แบ่งปัญหาย่อยที่ซ้ำกันแล้วเก็บผลไว้ใช้ซ้ำ", en: "" },
    group: "บทเรียนหัวข้อ",
    blocks: {
      th: [
        { t: "p", c: "Dynamic Programming (DP) ใช้เมื่อปัญหาแตกเป็นปัญหาย่อยที่ซ้ำกัน (overlapping subproblems) วิธีคือเก็บผลลัพธ์ย่อยไว้ใช้ซ้ำ (memoization) ไม่ต้องคำนวณใหม่ เคล็ดลับคือเริ่มจากเขียน recursion ปกติก่อน แล้วค่อยเพิ่ม cache" },
        { t: "h2", c: "Fibonacci — เห็นความซ้ำชัดที่สุด" },
        { t: "code", lang: "python", c: "# แบบช้า: คำนวณซ้ำมหาศาล O(2^n)\ndef fib_slow(n):\n    if n <= 1:\n        return n\n    return fib_slow(n - 1) + fib_slow(n - 2)\n\n# แบบ DP: จำผลลัพธ์ไว้ O(n)\ndef fib(n, memo={}):\n    if n <= 1:\n        return n\n    if n in memo:\n        return memo[n]\n    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)\n    return memo[n]\n\nprint(fib(30))  # 832040 (เร็วมาก)" },
        { t: "h2", c: "2 แนวทางของ DP" },
        {
          t: "ul",
          c: [
            "Top-down (memoization) — เขียน recursion แล้วเก็บผลลัพธ์ใน dict/array",
            "Bottom-up (tabulation) — สร้างตารางแล้วไล่เติมจากเล็กไปใหญ่",
          ],
        },
        { t: "callout", title: "วิธีฝึก DP", c: "อย่าพยายามคิด DP ออกทีเดียว ให้เขียน brute force recursion ให้ถูกก่อน แล้วถามตัวเองว่า \"มีการคำนวณซ้ำตรงไหน\" จากนั้นเพิ่ม cache โจทย์คลาสสิก: coin change, longest common subsequence, knapsack, climbing stairs" },
        { t: "links", c: [{ title: "← กลับไปแผนฝึก (Study Plan)", slug: "study-plan", desc: "ดูลำดับหัวข้อทั้งหมดและแพลตฟอร์มฝึก" }] },
      ],
      en: [],
    },
  },
};
