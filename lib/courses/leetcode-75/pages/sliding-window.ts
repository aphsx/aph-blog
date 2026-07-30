import type { Page } from "@/lib/types";

export const slidingWindowPages: Record<string, Page> = {
  "lc75-intro-sliding-window": {
    slug: "lc75-intro-sliding-window",
    title: "Sliding Window — พื้นฐาน & แนวคิด",
    lead: "เทคนิคเลื่อนช่วงต่อเนื่อง (subarray / substring) ด้วย left-right แล้วอัปเดตค่าแบบทบเดิม — จาก brute force O(n²) เหลือ O(n)",
    group: "LeetCode 75",
    blocks: [
      {
        t: "p",
        c: 'Sliding Window (หน้าต่างเลื่อน) คือเทคนิคที่ถามถึง "ช่วงต่อเนื่อง" ใน array (ลิสต์) หรือ string (สตริง) — เช่น ผลรวมมากสุดของช่วงยาว k, substring ที่ยาวที่สุดโดยไม่มีตัวซ้ำ, หรือช่วงที่มี 0 ไม่เกิน k ตัว แทนที่จะคำนวณทุกช่วงใหม่หมด เราเก็บ window (หน้าต่าง) หนึ่งอันไว้ แล้วเลื่อนขอบทีละก้าว อัปเดตแค่ตัวที่เข้าและตัวที่ออก',
      },
      {
        t: "p",
        c: "ขอบ window ถูกกำหนดด้วยตัวแปรสองตัว: left (ขอบซ้าย) กับ right (ขอบขวา) — เหมือน two pointers แต่ทั้งคู่เดินไปทางเดียวกัน และสิ่งที่เราสนใจคือ ทุกอย่างที่อยู่ระหว่างสองขอบ ไม่ใช่แค่ค่าที่ปลายสองข้าง",
      },

      { t: "h2", c: "ทำไมต้องมีท่านี้ — ดู brute force ก่อน" },
      {
        t: "p",
        c: "โจทย์ตัวอย่าง: หาผลรวมมากสุดของช่วงยาว k = 3 ใน nums = [2, 1, 5, 1, 3, 2] วิธีตรง ๆ คือลองทุกช่วงยาว 3 แล้วบวกใหม่ทุกครั้ง",
      },
      {
        t: "codeout",
        lang: "python",
        label: "วิธีที่ 1: brute force — บวกใหม่ทุกช่วง",
        code: `nums = [2, 1, 5, 1, 3, 2]
k = 3
best = float("-inf")
adds = 0                                   # นับว่าบวกเลขกี่ครั้ง

for i in range(len(nums) - k + 1):         # ทุกจุดเริ่มต้นที่เป็นไปได้
    total = 0
    for j in range(i, i + k):              # บวก k ตัวใหม่ทุกครั้ง
        total += nums[j]
        adds += 1
    best = max(best, total)
    print(f"ช่วง [{i}:{i+k}] = {nums[i:i+k]} รวม = {total}")

print("best =", best, "| บวกไปทั้งหมด", adds, "ครั้ง")`,
        out: `ช่วง [0:3] = [2, 1, 5] รวม = 8
ช่วง [1:4] = [1, 5, 1] รวม = 7
ช่วง [2:5] = [5, 1, 3] รวม = 9
ช่วง [3:6] = [1, 3, 2] รวม = 6
best = 9 | บวกไปทั้งหมด 12 ครั้ง`,
      },
      {
        t: "p",
        c: "สังเกตว่าช่วงถัดไปกับช่วงก่อนหน้า ซ้อนกันเกือบหมด — ต่างกันแค่ตัวซ้ายหลุดออก และตัวขวาเข้ามาใหม่ แต่ brute force กลับบวกทั้งก้อนใหม่ทุกครั้ง เมื่อ n และ k ใหญ่ (เช่น n = 10⁵, k = 10⁴) จะกลายเป็น O(nk) ที่รันไม่ทัน",
      },
      {
        t: "codeout",
        lang: "python",
        label: "วิธีที่ 2: sliding window — บวกเข้า ลบออก",
        code: `nums = [2, 1, 5, 1, 3, 2]
k = 3
window = sum(nums[:k])                     # สร้างหน้าต่างแรกครั้งเดียว
best = window
ops = k                                    # นับการบวก/ลบ

print(f"เริ่ม   window = {nums[:k]} รวม = {window}")

for i in range(k, len(nums)):
    entering = nums[i]                     # ตัวใหม่เข้าทางขวา
    leaving = nums[i - k]                  # ตัวเก่าหลุดออกทางซ้าย
    window += entering - leaving
    ops += 2
    best = max(best, window)
    print(f"เลื่อน  เข้า {entering}, ออก {leaving} -> รวม = {window}")

print("best =", best, "| บวก/ลบไปทั้งหมด", ops, "ครั้ง")`,
        out: `เริ่ม   window = [2, 1, 5] รวม = 8
เลื่อน  เข้า 1, ออก 2 -> รวม = 7
เลื่อน  เข้า 3, ออก 1 -> รวม = 9
เลื่อน  เข้า 2, ออก 5 -> รวม = 6
best = 9 | บวก/ลบไปทั้งหมด 9 ครั้ง`,
      },
      {
        t: "p",
        c: "ได้คำตอบเดียวกัน (best = 9 จากช่วง [5, 1, 3]) แต่จำนวนงานลดลง และสำคัญกว่านั้น: จำนวนงานโตตาม n ไม่ใช่ตาม n×k — นี่คือเหตุผลที่เหลือ O(n)",
      },
      {
        t: "image",
        src: "/leetcode-75/sliding-window-fixed.png",
        alt: "Fixed-size sliding window: เลื่อน window ยาว k โดยบวกตัวเข้าและลบตัวออก",
        caption: "Fixed-size window: ความยาวกคงที่ ทุกครั้งที่เลื่อนแค่ drop ตัวซ้าย + add ตัวขวา ไม่ต้องบวกใหม่ทั้งก้อน",
      },
      {
        t: "callout",
        title: "หัวใจของความเร็ว",
        c: "แต่ละ index เข้า window ผ่าน right ได้ครั้งเดียว และออกผ่าน left ได้ไม่เกินครั้งเดียว รวมกันไม่เกิน 2n ก้าว → O(n) เสมอ ถ้าโค้ดของคุณทำให้ left ถอยหลัง หรือคำนวณทั้งช่วงใหม่ทุกครั้ง แปลว่ายังไม่ใช่ sliding window จริง",
      },

      { t: "h2", c: "สองแบบที่ต้องแยกให้ออก: Fixed vs Variable" },
      {
        t: "p",
        c: "ทุกโจทย์ sliding window ตกอยู่ในหนึ่งในสองแบบ การตั้งชื่อให้ถูกตั้งแต่แรกคือครึ่งหนึ่งของการแก้",
      },
      {
        t: "h3",
        c: "แบบที่ 1 — Fixed-size (ขนาดคงที่)",
      },
      {
        t: "p",
        c: "โจทย์บอกความยาว k มาชัด ๆ ความยาว window ไม่เคยเปลี่ยน เราเลื่อนทั้งก้อนไปข้างหน้าทีละ 1: บวกตัวเข้าทางขวา ลบตัวออกทางซ้าย ใช้เมื่อเห็นคำว่า \"ของช่วงยาว k\", \"substring of length k\", \"ทุก window ขนาด k\"",
      },
      {
        t: "code",
        lang: "python",
        label: "template fixed-size",
        c: `def fixed_window(arr, k):
    window = sum(arr[:k])          # สร้างหน้าต่างแรก
    best = window
    for right in range(k, len(arr)):
        window += arr[right]       # ตัวใหม่เข้า
        window -= arr[right - k]   # ตัวเก่าออก
        best = max(best, window)
    return best`,
      },
      {
        t: "h3",
        c: "แบบที่ 2 — Variable-size (ขนาดยืดหยุ่น)",
      },
      {
        t: "p",
        c: "ไม่มีความยาวตายตัว เราขยายขอบขวา (expand) รับของเข้าเรื่อย ๆ พอ window เริ่มผิดกติกา (invalid) ค่อยหดขอบซ้าย (shrink) จนกว่าจะถูกต้องอีกครั้ง แล้วค่อยบันทึกคำตอบ ใช้เมื่อเห็นคำว่า \"ยาวที่สุด / สั้นที่สุด ที่ยัง…\", \"at most k\", \"ไม่มีตัวซ้ำ\"",
      },
      {
        t: "code",
        lang: "python",
        label: "template variable-size",
        c: `def variable_window(arr):
    left = 0
    state = 0                      # ผลรวม / จำนวน / อะไรก็ตามที่ track
    best = 0
    for right in range(len(arr)):
        # 1) Expand: รับ arr[right] เข้าหน้าต่าง
        state += arr[right]

        # 2) Shrink: หดซ้ายจนกว่าหน้าต่างจะถูกต้อง
        while is_invalid(state):   # <- แทนที่ด้วยเงื่อนไขของโจทย์
            state -= arr[left]
            left += 1

        # 3) Update: ตรงนี้ [left..right] valid แล้ว
        best = max(best, right - left + 1)
    return best`,
      },
      {
        t: "image",
        src: "/leetcode-75/sliding-window-variable.png",
        alt: "Variable-size sliding window: expand right, shrink left while invalid, update best",
        caption: "Variable-size window: วนซ้ำ Expand → Shrink while invalid → Update best ทุกครั้งที่ขยับ right",
      },
      {
        t: "callout",
        title: "จังหวะอัปเดตคำตอบสำคัญ",
        c: 'โจทย์ "ยาวที่สุด": อัปเดต best หลัง shrink แล้ว (window valid) · โจทย์ "สั้นที่สุด": อัปเดต best ข้างใน while ที่ยัง valid อยู่ แล้วค่อยหดต่อ — สลับจังหวะนี้แล้วคำตอบจะเพี้ยนแบบเงียบ ๆ',
      },

      { t: "h2", c: "สัญญาณในโจทย์ — รู้ได้ยังไงว่าต้องใช้ sliding window" },
      {
        t: "p",
        c: "ต้องมีสองอย่างพร้อมกัน: (1) คำตอบเป็นช่วงต่อเนื่อง (contiguous subarray / substring — ของติดกัน ไม่ใช่ subsequence ที่กระโดดข้ามได้) และ (2) ต้องการค่าดีที่สุดหรือนับภายใต้เงื่อนไข (ยาวสุด / สั้นสุด / ผลรวมมากสุด / มีไม่เกิน k ตัว)",
      },
      {
        t: "table",
        head: ["สัญญาณในโจทย์", "ใช้แบบไหน", "state ที่ track"],
        rows: [
          ["ช่วงยาว k ชัดเจน (\"of length k\", \"size k\")", "Fixed", "ผลรวม / จำนวนสระ / freq map ของขนาด k"],
          ["ยาวที่สุดที่ยังตรงเงื่อนไข", "Variable (maximize)", "count / set / freq map"],
          ["สั้นที่สุดที่ยังตรงเงื่อนไข", "Variable (minimize)", "ผลรวม / freq ที่ยังขาด"],
          ["at most k … (ไม่เกิน k ตัว / k ชนิด)", "Variable", "ตัวนับของสิ่งที่จำกัด"],
          ["ไม่มีตัวซ้ำใน substring", "Variable", "set หรือ last-seen index"],
        ],
      },
      {
        t: "table",
        head: ["สัญญาณนี้", "ไม่ใช่ sliding window — ใช้อะไรแทน"],
        rows: [
          ["subsequence (ไม่ต้องติดกัน) เช่น Is Subsequence", "Two Pointers แบบ same-direction"],
          ["ผลรวมช่วงใดก็ได้ที่มีเลขติดลบ (max subarray ทั่วไป)", "Kadane / DP — ไม่ใช่ window"],
          ["subarray sum = K ที่มีเลขติดลบได้", "Prefix Sum + Hash Map"],
          ["หาคู่ค่าสองตัว ไม่สนของระหว่างกลาง", "Two Pointers / Hash Map"],
        ],
      },

      { t: "h2", c: "ลองไล่ variable window ของจริง" },
      {
        t: "p",
        c: 'ตัวอย่างคลาสสิก: หาความยาว substring ที่ยาวที่สุดโดยไม่มีตัวอักษรซ้ำ (LC3) — invariant (กติกาที่ต้องรักษา) คือ "ใน window ตอนนี้ห้ามมีตัวซ้ำ" พอตัวซ้ำเข้ามาทางขวา ต้องหดซ้ายจนตัวเก่าหลุดออก',
      },
      {
        t: "codeout",
        lang: "python",
        label: "variable window — longest substring without repeating",
        code: `s = "abcabcbb"
seen = set()
left = 0
best = 0

for right, ch in enumerate(s):
    while ch in seen:                      # ซ้ำแล้ว → หดซ้าย
        seen.remove(s[left])
        left += 1
    seen.add(ch)                           # รับตัวใหม่เข้า
    best = max(best, right - left + 1)
    print(f"right={right} ch={ch!r} window={s[left:right+1]!r} best={best}")

print("คำตอบ:", best)`,
        out: `right=0 ch='a' window='a' best=1
right=1 ch='b' window='ab' best=2
right=2 ch='c' window='abc' best=3
right=3 ch='a' window='bca' best=3
right=4 ch='b' window='cab' best=3
right=5 ch='c' window='abc' best=3
right=6 ch='b' window='cb' best=3
right=7 ch='b' window='b' best=3
คำตอบ: 3`,
      },
      {
        t: "p",
        c: "ตอน right=3 ตัว 'a' ซ้ำ — while เอา 'a' ตัวแรกออก (left ไปที่ 1) window เหลือ \"bca\" ยังยาว 3 เท่าเดิม ต่อจากนั้นทุกครั้งที่มีซ้ำ left ก็ไล่ตามมา ความยาวที่ดีที่สุดค้างที่ 3 (\"abc\")",
      },

      { t: "h2", c: "Window state — อะไรที่ต้องถือไว้ในมือ" },
      {
        t: "p",
        c: "Window ไม่ใช่แค่ left กับ right — ต้องมี state (สถานะ) ที่อัปเดตได้เร็วตอนของเข้า/ออก เลือกของที่ง่ายที่สุดที่ตอบได้ว่า window ยัง valid ไหมใน O(1)",
      },
      {
        t: "ul",
        c: [
          "ตัวเลขเดียว: ผลรวม, จำนวน 0, จำนวนสระ — ใช้กับ fixed window หรือเงื่อนไขบนตัวเลข",
          "set: จำว่ามีตัวไหนอยู่ใน window บ้าง — ใช้กับ \"ห้ามซ้ำ\"",
          "freq map / Counter: นับความถี่ต่อตัวอักษรหรือต่อค่า — ใช้กับ \"at most k distinct\", anagram, ครอบคลุมตัวอักษรของ t",
          "deque (คิวสองทาง): เก็บตัวแข่งที่เป็น max/min ใน window — ใช้ตอนโจทย์ถามค่ามากสุด/น้อยสุดในทุก window ยาว k (นอกขอบเขต LC75 หมวดนี้ แต่เจอบ่อยในสัมภาษณ์)",
        ],
      },
      {
        t: "callout",
        title: "บั๊กอันดับ 1 ของ state",
        warn: true,
        c: "ขยับ left หรือ right แล้วลืมอัปเดต state ให้สอดคล้อง — เช่น left += 1 แต่ลบ count ของตัวที่หลุดออก ไม่ครบ window ในโค้ดกับ state จริงจะคนละอัน คำตอบเพี้ยนโดยไม่มี error",
      },

      { t: "h2", c: "ต่างจาก Two Pointers ตรงไหน" },
      {
        t: "table",
        head: ["", "Two Pointers", "Sliding Window"],
        rows: [
          ["สนใจอะไร", "ค่าที่ปลายสองข้าง (หรือ slow/fast)", "ทั้งช่วงระหว่าง left..right"],
          ["ทิศทาง", "เข้าหากัน / คนละความเร็ว / คนละแถว", "ทั้งคู่ไปทางเดียวกัน (ซ้าย→ขวา)"],
          ["คำถามหลัก", "มีคู่ไหม / กรอง in-place / รวมสองแถว", "ช่วงต่อเนื่องที่ดีที่สุดภายใต้เงื่อนไข"],
          ["ต้องเรียงก่อนไหม", "แบบ opposite ends ต้องเรียง", "ไม่ต้อง — ลำดับเดิมมีความหมาย"],
        ],
      },
      {
        t: "p",
        c: "พูดอย่างสั้น: sliding window คือ two pointers แบบ same-direction ที่ถือ \"ของทั้งช่วง\" เป็น state ไว้ด้วย ถ้าโจทย์พูดถึง contiguous / subarray / substring + optimize → นึก window ก่อน",
      },

      { t: "h2", c: "กับดักที่เจอบ่อย" },
      {
        t: "ul",
        c: [
          "ความยาว window คิดผิด: ของ inclusive [left..right] ยาว = right - left + 1 ไม่ใช่ right - left",
          "เริ่ม best = 0 ทั้งที่คำตอบอาจเป็นลบ (เช่นผลรวมช่วงที่มีแต่เลขติดลบ) — initialize ด้วยหน้าต่างแรก หรือ float(\"-inf\")",
          "fixed window ลืมสร้างหน้าต่างแรกก่อน loop — หรือลบตัวออกผิดตำแหน่ง (ต้องเป็น right - k ไม่ใช่ left ที่ลืมขยับ)",
          "variable window อัปเดต best ตอน window ยัง invalid อยู่ — ต้อง shrink ให้จบก่อน",
          "เลขติดลบ + เงื่อนไขผลรวม: สมมติว่า \"ขยายแล้วผลรวมต้องโต\" พังทันที → ถ้าโจทย์เป็น max subarray ทั่วไปให้ไป Kadane",
          "left ถอยหลังได้: พัง amortized O(n) ทันที — left เดินไปข้างหน้าอย่างเดียว",
        ],
      },

      { t: "h2", c: "สี่ข้อในหมวดนี้ เรียงยังไง" },
      {
        t: "table",
        head: ["ข้อ", "โจทย์", "แบบ", "state"],
        rows: [
          ["14", "LC643 Maximum Average Subarray I", "Fixed k", "ผลรวม → หาร k ตอนท้าย"],
          ["15", "LC1456 Max Vowels in Substring of Length K", "Fixed k", "นับสระใน window"],
          ["16", "LC1004 Max Consecutive Ones III", "Variable", "นับ 0 (พลิกได้ ≤ k)"],
          ["17", "LC1493 Longest Subarray of 1's After Deleting One", "Variable", "นับ 0 (ลบได้ 1 ตัว = k=1)"],
        ],
      },
      {
        t: "p",
        c: "สองข้อแรกซ้อม fixed ให้มือขึ้น สองข้อหลังเป็น variable แบบ \"at most k ตัวที่ผิดกติกา\" — ข้อ 17 คือข้อ 16 ที่ k ล็อกเป็น 1 ถ้าเข้าใจข้อ 16 แล้ว ข้อ 17 จะรู้เรื่องทันที",
      },
      {
        t: "callout",
        title: "พร้อมแล้วไปต่อ",
        c: "เริ่มจากข้อ 14 Maximum Average Subarray I — fixed window ตัวแรก กดถัดไปได้เลย",
      },
    ],
  },

  "lc75-p14": {
    slug: "lc75-p14",
    title: "ข้อ 14 · LC643 Maximum Average Subarray I (ค่าเฉลี่ย subarray มากสุด) 🟢",
    lead: "หา subarray ยาว k ที่มีค่าเฉลี่ยมากที่สุด แล้วคืนค่าเฉลี่ยนั้น",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ Maximum Average Subarray I: มี array (ลิสต์) nums และเลข k ให้หา subarray (ช่วงต่อเนื่อง) ที่ยาว k ซึ่งมีค่าเฉลี่ยมากที่สุด แล้ว return (คืน) ค่าเฉลี่ยนั้น" },
      { t: "ul", c: [
        "nums = [1, 12, -5, -6, 50, 3], k = 4 → 12.75 (ช่วง [12, -5, -6, 50] รวมได้ 51 หาร 4 = 12.75)",
        "nums = [5], k = 1 → 5.0 (มีช่วงเดียว)",
      ] },
      {
        t: "constraints",
        c: [
        "1 <= k <= nums.length <= 10^5",
        "-10^4 <= nums[i] <= 10^4",
        "n ถึง 10^5 → ต้องกวาดรอบเดียว วิธีคำนวณผลรวมทุกช่วงใหม่ (O(nk)) รันไม่ทัน",
        ],
      },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "ข้อนี้ใช้ Sliding Window (หน้าต่างเลื่อน) ขนาดคงที่ (fixed size) k เพราะโจทย์บอกความยาว k มาชัด ๆ เคล็ดแรกคือมองให้ออกว่า ค่าเฉลี่ยมากสุดเกิดที่ช่วงที่ผลรวมมากสุด (เพราะทุกช่วงยาว k หารด้วยตัวเดียวกัน) เราจึงเปลี่ยนโจทย์เป็นหาผลรวมมากสุดของช่วงยาว k" },
      { t: "p", c: "วิธี brute force คือคำนวณผลรวมของทุกช่วงยาว k ใหม่หมด ซึ่งเป็น O(nk) ช้าเมื่อ k ใหญ่ Sliding Window ทำให้เหลือ O(n) โดยแทนที่จะบวก k ตัวใหม่ทุกครั้ง เราแค่บวกตัวที่เพิ่งเข้าและลบตัวที่เพิ่งออก" },
      { t: "ol", c: [
        "สร้าง window (หน้าต่าง) แรกด้วย window = sum(nums[:k]) แล้ว initialize (ตั้งค่าเริ่มต้น) best = window",
        "iterate (วน) i จาก k ไปจนจบ array",
        "บวกตัวใหม่ที่เข้าทางขวา (window += nums[i])",
        "ลบตัวเก่าที่หลุดออกทางซ้าย (window -= nums[i - k])",
        "update (อัปเดต) best = max(best, window)",
        "จบ loop return (คืน) best / k เป็นค่าเฉลี่ย",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "อย่าลืมสร้าง window แรกด้วย sum(nums[:k]) และ initialize best = window แรกเสมอ ถ้าเริ่ม best = 0 แล้ว array มีแต่ค่าติดลบ คำตอบจะผิด" },

      { t: "h2", c: "ไล่ทีละสเต็ป" },
      { t: "p", c: "ลองไล่ nums = [1, 12, -5, -6, 50, 3], k = 4 window แรกคือ [1, 12, -5, -6] รวม = 2" },
      { t: "table", head: ["i", "ตัวเข้า nums[i]", "ตัวออก nums[i-k]", "window หลังปรับ", "best"], rows: [
        ["เริ่ม", "-", "-", "2", "2"],
        ["4", "50", "1 (index 0)", "2 + 50 - 1 = 51", "51"],
        ["5", "3", "12 (index 1)", "51 + 3 - 12 = 42", "51"],
      ] },
      { t: "p", c: "best = 51 คือผลรวมช่วง [12, -5, -6, 50] คืนค่า 51 / 4 = 12.75" },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `def find_max_average(nums, k):
    window = sum(nums[:k])         # ผลรวมหน้าต่างแรก [0, k)
    best = window
    for i in range(k, len(nums)):
        window += nums[i]          # ตัวใหม่เข้าทางขวา
        window -= nums[i - k]      # ตัวเก่าหลุดออกทางซ้าย
        best = max(best, window)
    return best / k                # แปลงผลรวมมากสุดเป็นค่าเฉลี่ย

print(find_max_average([1, 12, -5, -6, 50, 3], 4))  # 12.75`, out: `12.75` },
        { t: "p", c: "เคล็ดลับแรกคือมองให้ออกว่า ค่าเฉลี่ยมากสุดเกิดที่ช่วงที่ผลรวมมากสุด เพราะทุกช่วงยาว k เท่ากันหมด หารด้วยตัวเดียวกัน เราจึงเปลี่ยนโจทย์เป็นหาผลรวมมากสุดของช่วงยาว k ซึ่งง่ายกว่า จากนั้นค่อยหารด้วย k ตอนท้ายทีเดียว" },
        { t: "p", c: "หัวใจของความเร็วอยู่ที่การเลื่อน window แทนที่จะบวกเลข k ตัวใหม่ทุกครั้ง (ซึ่งจะกลายเป็น O(nk)) เราแค่บวกตัวที่เพิ่งเข้าและลบตัวที่เพิ่งออก ต้อง initialize best = window แรกเสมอ ไม่งั้นกรณีค่าติดลบล้วนจะตอบผิด" },
        { t: "p", c: "Time O(n) สร้าง window แรก O(k) แล้วเลื่อนอีก O(n) รวมยังเป็น O(n) · Space O(1) เก็บแค่ผลรวมกับค่าดีสุด" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "window ขนาดคงที่ k: บวกตัวเข้า ลบตัวออก อย่าคำนวณทั้งช่วงใหม่ และถ้าโจทย์ถามค่าเฉลี่ย ให้แปลงเป็นหาผลรวมก่อนแล้วค่อยหารตอนท้าย" },
    ],
  },

  "lc75-p15": {
    slug: "lc75-p15",
    title: "ข้อ 15 · LC1456 Maximum Number of Vowels in a Substring of Given Length (นับสระในหน้าต่าง k) 🟡",
    lead: "หา substring ยาว k ที่มีตัวสระมากที่สุด แล้วคืนจำนวนสระนั้น",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ Maximum Number of Vowels in a Substring of Given Length: มี string (สตริง) s และเลข k ให้หา substring (ช่วงต่อเนื่อง) ที่ยาว k ซึ่งมี vowel (สระ: a, e, i, o, u) มากที่สุด แล้ว return (คืน) จำนวนสระนั้น" },
      { t: "ul", c: [
        "s = \"abciiidef\", k = 3 → 3 (ช่วง \"iii\" มีสระครบ 3 ตัว)",
        "s = \"leetcode\", k = 3 → 2 (ช่วง \"eet\" มีสระ 2 ตัว)",
      ] },
      {
        t: "constraints",
        c: [
        "1 <= s.length <= 10^5",
        "s เป็นตัวอักษรอังกฤษพิมพ์เล็ก",
        "1 <= k <= s.length",
        ],
      },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "ข้อนี้ใช้ Sliding Window (หน้าต่างเลื่อน) ขนาดคงที่ (fixed size) k เหมือนข้อก่อน แต่แทนที่จะเก็บผลรวม เรา track (ติดตามค่า) \"จำนวน vowel (สระ) ใน window (หน้าต่าง)\" การเช็คว่าตัวอักษรเป็นสระไหมใช้ set(\"aeiou\") — เป็น hash set — ทำให้เป็น O(1)" },
      { t: "p", c: "วิธี brute force คือนับสระใหม่ในทุก substring ยาว k ซึ่งเป็น O(nk) ช้า Sliding Window เก็บ count (ตัวนับ) แล้วปรับทีละหนึ่งตอนเลื่อน จึงเหลือ O(n)" },
      { t: "ol", c: [
        "เตรียม set ของสระ และ count (นับ) สระใน window แรก s[:k] เก็บใน count แล้ว initialize (ตั้งค่าเริ่มต้น) best = count",
        "iterate (วน) i จาก k ไปจนจบ string",
        "ถ้าตัวใหม่ s[i] เป็นสระ ให้ count += 1",
        "ถ้าตัวเก่า s[i - k] เป็นสระ ให้ count -= 1",
        "update (อัปเดต) best = max(best, count)",
        "(ปรับให้เร็ว) ถ้า best == k แล้วหยุดได้เลย เพราะสระเยอะสุดใน window ยาว k คือ k",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ตอนถอดตัวเก่า ตัวที่ต้องถอดคือ s[i - k] (ตัวที่ห่างไป k ช่อง) ไม่ใช่ s[i - k + 1] ถ้าใช้ index (ตำแหน่ง) ผิดจะนับเพี้ยนทันที" },

      { t: "h2", c: "ไล่ทีละสเต็ป" },
      { t: "p", c: "ลองไล่ s = \"leetcode\", k = 3 window แรก \"lee\" มีสระ 2 (e, e)" },
      { t: "table", head: ["i", "ตัวเข้า s[i]", "ตัวออก s[i-k]", "count หลังปรับ", "best"], rows: [
        ["เริ่ม", "-", "-", "2 (lee)", "2"],
        ["3", "t (ไม่ใช่สระ)", "l (ไม่ใช่สระ)", "2 (eet)", "2"],
        ["4", "c (ไม่ใช่สระ)", "e (สระ)", "1 (etc)", "2"],
        ["5", "o (สระ)", "e (สระ)", "1 (tco)", "2"],
        ["6", "d (ไม่ใช่สระ)", "t (ไม่ใช่สระ)", "1 (cod)", "2"],
        ["7", "e (สระ)", "c (ไม่ใช่สระ)", "2 (ode)", "2"],
      ] },
      { t: "p", c: "best = 2 ตลอด คืนค่า 2" },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `def max_vowels(s, k):
    vowels = set("aeiou")
    count = sum(1 for c in s[:k] if c in vowels)   # นับสระในหน้าต่างแรก
    best = count
    for i in range(k, len(s)):
        if s[i] in vowels:        # ตัวใหม่เข้าทางขวา
            count += 1
        if s[i - k] in vowels:    # ตัวเก่าหลุดออกทางซ้าย
            count -= 1
        best = max(best, count)
        if best == k:             # เต็มหน้าต่างแล้ว ไม่มีทางมากกว่านี้
            break
    return best

print(max_vowels("abciiidef", 3))  # 3
print(max_vowels("leetcode", 3))   # 2`, out: `3
2` },
        { t: "p", c: "แทนที่จะนับสระใหม่ทุก window (ช้า O(nk)) เรา track count ไว้แล้วปรับทีละหนึ่งตอนเลื่อน ตัวใหม่ที่เข้าถ้าเป็นสระก็ +1 ตัวเก่าที่หลุดออก (s[i - k]) ถ้าเป็นสระก็ -1 การใช้ set(\"aeiou\") ทำให้เช็คว่าเป็นสระไหมเป็น O(1)" },
        { t: "p", c: "บรรทัด if best == k แล้ว break เป็นการปรับให้เร็วขึ้น เพราะสระเยอะสุดใน window ยาว k เป็นไปได้แค่ k อยู่แล้ว เจอครบก็ไม่ต้องดูต่อ ถ้าเอาออกโปรแกรมก็ยังถูก เพียงแต่อาจ iterate ครบทุกตัว" },
        { t: "p", c: "Time O(n) iterate string รอบเดียว · Space O(1) hash set ของสระมีแค่ 5 ตัว ถือเป็นค่าคงที่" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "window ขนาดคงที่ที่ track \"count\" แทนผลรวม: ตัวเข้าเพิ่มนับ ตัวออกลดนับ pattern เดียวกับผลรวมแต่เปลี่ยนสิ่งที่ track เท่านั้น" },
    ],
  },

  "lc75-p16": {
    slug: "lc75-p16",
    title: "ข้อ 16 · LC1004 Max Consecutive Ones III (หนึ่งต่อเนื่องมากสุด พลิก k) 🟡",
    lead: "พลิก 0 เป็น 1 ได้มากสุด k ตัว หาช่วง 1 ต่อเนื่องที่ยาวที่สุด",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ Max Consecutive Ones III: มี array (ลิสต์) nums ที่มีแค่ 0 กับ 1 และเลข k เราพลิก 0 ให้เป็น 1 ได้มากสุด k ตัว ให้หาว่าจะได้ช่วง 1 ต่อเนื่องยาวสุดเท่าไร" },
      { t: "ul", c: [
        "nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k = 2 → 6 (พลิก 0 สองตัวช่วงกลางให้ได้ 1 ติดกัน 6 ตัว)",
        "nums = [0, 0, 0], k = 0 → 0 (พลิกไม่ได้เลย ไม่มี 1 ต่อเนื่อง)",
      ] },
      {
        t: "constraints",
        c: [
        "1 <= nums.length <= 10^5",
        "nums[i] เป็น 0 หรือ 1 เท่านั้น",
        "0 <= k <= nums.length",
        ],
      },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "ข้อนี้ใช้ Sliding Window (หน้าต่างเลื่อน) ขนาดยืดหยุ่น (variable size) กุญแจคือเปลี่ยนมุมมองโจทย์: \"พลิก 0 ได้ k ตัว\" มีค่าเท่ากับ \"window (หน้าต่าง) ที่ยาวที่สุดที่มี 0 ไม่เกิน k ตัว\" เพราะ 0 ทุกตัวใน window เราพลิกเป็น 1 ได้ตราบใดที่ไม่เกิน k" },
      { t: "p", c: "วิธี brute force คือลองทุกช่วงแล้วนับ 0 O(n^2) ช้า Sliding Window ขยายขอบขวารับของเข้าเรื่อย ๆ track (ติดตามค่า) จำนวน 0 ไว้ ถ้าเกิน k ค่อยหดซ้าย จึงเหลือ O(n)" },
      { t: "ol", c: [
        "initialize (ตั้งค่าเริ่มต้น) left = 0, zeros = 0, best = 0",
        "iterate (วน) right ไปทุก index (ตำแหน่ง) ถ้า nums[right] == 0 ให้ zeros += 1 (รับตัวใหม่ทางขวา)",
        "ขณะที่ zeros > k ให้หดซ้าย: ถ้า nums[left] == 0 ลด zeros แล้ว left += 1",
        "ตอนนี้ window ถูกต้องแล้ว update (อัปเดต) best = max(best, right - left + 1)",
        "จบ loop return (คืน) best",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ต้องใช้ while (ไม่ใช่ if) ตอนหดซ้าย และอย่าลืมว่าความยาว window คือ right - left + 1 (บวกหนึ่งเพราะรวมทั้งสองปลาย)" },

      { t: "h2", c: "ไล่ทีละสเต็ป" },
      { t: "p", c: "ลองไล่ nums = [1, 1, 0, 0, 1], k = 1 ดูว่า left หดตอนไหน" },
      { t: "table", head: ["right (ค่า)", "zeros", "หดซ้าย?", "left", "ความยาว (right-left+1)", "best"], rows: [
        ["0 (1)", "0", "ไม่", "0", "1", "1"],
        ["1 (1)", "0", "ไม่", "0", "2", "2"],
        ["2 (0)", "1", "ไม่ (≤k)", "0", "3", "3"],
        ["3 (0)", "2", "ใช่ จน zeros≤1", "3", "1", "3"],
        ["4 (1)", "1", "ไม่", "3", "2", "3"],
      ] },
      { t: "p", c: "best = 3 (ช่วง [1, 1, 0] พลิก 0 หนึ่งตัวได้ 1 สามตัว)" },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `def longest_ones(nums, k):
    left = 0
    zeros = 0            # จำนวน 0 ในหน้าต่างตอนนี้
    best = 0
    for right in range(len(nums)):
        if nums[right] == 0:
            zeros += 1                 # รับตัวใหม่ทางขวา
        while zeros > k:               # 0 เกินโควตาพลิก
            if nums[left] == 0:
                zeros -= 1             # หดซ้าย ถอด 0 ออก
            left += 1
        best = max(best, right - left + 1)   # หน้าต่างตอนนี้ถูกต้อง
    return best

print(longest_ones([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2))  # 6`, out: `6` },
        { t: "p", c: "กุญแจคือการเปลี่ยนมุมมองโจทย์ แทนที่จะคิดว่า \"พลิก 0 กี่ตัว\" ให้คิดว่า \"window ที่ยาวที่สุดที่มี 0 ไม่เกิน k ตัว\" มีค่าเท่ากัน เพราะ 0 ทุกตัวใน window เราพลิกให้เป็น 1 ได้ตราบใดที่ไม่เกิน k ตัว เราจึงขยายขอบขวารับของเข้าเรื่อย ๆ และ track จำนวน 0 ไว้" },
        { t: "p", c: "เมื่อไรที่ 0 ใน window เกิน k เราหดขอบซ้ายเข้ามา (ขยับ left) จนจำนวน 0 กลับมาไม่เกิน k สังเกตว่า while ด้านในรวม ๆ แล้ว left ขยับได้ไม่เกิน n ครั้งตลอดทั้ง loop จึงยังเป็น O(n) ไม่ใช่ O(n^2) ถ้าเผลอใช้ if แทน while จะหด 0 ออกไม่พอเมื่อ k ลดหลายตัว" },
        { t: "p", c: "Time O(n) แต่ละตัวเข้าและออก window อย่างละครั้ง · Space O(1) track แค่ตัวนับกับ pointer (ตัวชี้)" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "window ขนาดยืดหยุ่น + \"เปลี่ยนโจทย์เป็น condition (เงื่อนไข) บน window\": พลิก k ตัว = window ที่มี 0 ไม่เกิน k ขยายขวาเสมอ หดซ้ายเมื่อผิด condition" },
    ],
  },

  "lc75-p17": {
    slug: "lc75-p17",
    title: "ข้อ 17 · LC1493 Longest Subarray of 1's After Deleting One Element (ช่วงหนึ่งยาวสุดหลังลบตัว) 🟡",
    lead: "ต้องลบ element ออก 1 ตัวเสมอ หา subarray ของ 1 ต่อเนื่องที่ยาวที่สุดหลังลบ",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ Longest Subarray of 1's After Deleting One Element: มี array (ลิสต์) nums ที่มีแค่ 0 กับ 1 เราต้องลบ element (สมาชิก) ออก 1 ตัวเสมอ (บังคับลบหนึ่งตัวแม้เป็น 1 ก็ต้องลบ) ให้หา subarray (ช่วงต่อเนื่อง) ของ 1 ที่ยาวที่สุดหลังลบ" },
      { t: "ul", c: [
        "nums = [1, 1, 0, 1] → 3 (ลบ 0 ออก เหลือ 1 ต่อกัน 3 ตัว)",
        "nums = [1, 1, 1] → 2 (ไม่มี 0 ให้ลบ แต่บังคับต้องลบ 1 ตัว เหลือ 2)",
      ] },
      {
        t: "constraints",
        c: [
        "1 <= nums.length <= 10^5",
        "nums[i] เป็น 0 หรือ 1 เท่านั้น",
        ],
      },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "ข้อนี้เป็นน้องของ LC1004 โดยตรง ถ้ามองว่า \"ต้องลบหนึ่งตัว\" คือ \"อนุญาตให้ window (หน้าต่าง) มี 0 ได้หนึ่งตัว (ตัวที่จะถูกลบ)\" ก็จะได้ Sliding Window (หน้าต่างเลื่อน) ขนาดยืดหยุ่น (variable size) แบบ k = 1 ทันที" },
      { t: "p", c: "ความต่างสำคัญที่สุดอยู่ที่การนับความยาว เพราะโจทย์บังคับลบหนึ่งตัวเสมอ (แม้ไม่มี 0 เลย) คำตอบต้องเป็นความยาว window ลบหนึ่ง จึงเขียน right - left แทน right - left + 1" },
      { t: "ol", c: [
        "initialize (ตั้งค่าเริ่มต้น) left = 0, zeros = 0, best = 0",
        "iterate (วน) right ไปทุก index (ตำแหน่ง) ถ้า nums[right] == 0 ให้ zeros += 1",
        "ขณะที่ zeros > 1 ให้หดซ้าย: ถ้า nums[left] == 0 ลด zeros แล้ว left += 1",
        "update (อัปเดต) best = max(best, right - left) — สังเกตว่าไม่ +1 เพราะบังคับลบหนึ่งตัว",
        "จบ loop return (คืน) best",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ต้องใช้ right - left ไม่ใช่ right - left + 1 เพราะบังคับลบหนึ่งตัวเสมอ กรณี [1, 1, 1] (ไม่มี 0) ต้องได้ 2 ไม่ใช่ 3 สูตร right - left จัดการให้อัตโนมัติ" },

      { t: "h2", c: "ไล่ทีละสเต็ป" },
      { t: "p", c: "ลองไล่ nums = [1, 1, 0, 1] ดูค่า best (right - left)" },
      { t: "table", head: ["right (ค่า)", "zeros", "หดซ้าย?", "left", "ความยาว (right-left)", "best"], rows: [
        ["0 (1)", "0", "ไม่", "0", "0", "0"],
        ["1 (1)", "0", "ไม่", "0", "1", "1"],
        ["2 (0)", "1", "ไม่ (≤1)", "0", "2", "2"],
        ["3 (1)", "1", "ไม่", "0", "3", "3"],
      ] },
      { t: "p", c: "best = 3 (window ทั้งหมด [1,1,0,1] ลบ 0 ออกเหลือ 1 สามตัว)" },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `def longest_subarray(nums):
    left = 0
    zeros = 0            # จำนวน 0 ในหน้าต่าง (ยอมได้ไม่เกิน 1)
    best = 0
    for right in range(len(nums)):
        if nums[right] == 0:
            zeros += 1
        while zeros > 1:              # ยอม 0 ได้แค่ตัวเดียว
            if nums[left] == 0:
                zeros -= 1
            left += 1
        # ลบ 1 ตัวเสมอ -> ความยาวหน้าต่าง - 1 = (right - left + 1) - 1
        best = max(best, right - left)
    return best

print(longest_subarray([1, 1, 0, 1]))  # 3
print(longest_subarray([1, 1, 1]))     # 2`, out: `3
2` },
        { t: "p", c: "โจทย์นี้เป็นน้องของ LC1004 โดยตรง ถ้าเรามองว่า \"ต้องลบหนึ่งตัว\" คือ \"อนุญาตให้ window มี 0 ได้หนึ่งตัว (ตัวที่จะถูกลบ)\" ก็จะได้ variable size window แบบ k = 1 ทันที เราขยายขอบขวารับของเข้า ถ้ามี 0 เกินหนึ่งตัวก็หดซ้ายจนเหลือ 0 ไม่เกินหนึ่ง" },
        { t: "p", c: "ความต่างสำคัญที่สุดอยู่ที่การนับความยาว เพราะโจทย์บังคับลบหนึ่งตัวเสมอ (แม้ไม่มี 0 เลย) คำตอบต้องเป็นความยาว window ลบหนึ่ง จึงเขียน best = max(best, right - left) แทน right - left + 1 กรณี [1, 1, 1] ที่ไม่มี 0 เลยเป็น edge case สำคัญ เพราะยังถูกบังคับให้ลบ 1 ตัว คำตอบจึงเป็น 2 ไม่ใช่ 3 สูตร right - left จัดการกรณีนี้ให้อัตโนมัติ" },
        { t: "p", c: "Time O(n) แต่ละตัวเข้าออก window อย่างละครั้ง · Space O(1) ใช้ตัวแปรไม่กี่ตัว" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "โจทย์ที่ดูต่าง แต่จริง ๆ คือ variable size window แบบ k = 1 ที่มีลูกเล่นเรื่องการนับความยาว: ถ้าเจอโจทย์ใกล้เคียง ให้ถามว่า \"condition (เงื่อนไข) บน window คืออะไร\" และ \"ความยาวที่ต้องตอบนับยังไง\"" },
    ],
  },
};
