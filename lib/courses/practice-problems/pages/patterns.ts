import type { Page } from "@/lib/types";

export const patternsPages: Record<string, Page> = {
  "pp-patterns": {
    slug: "pp-patterns",
    title: "เทคนิคสัมภาษณ์ (Patterns)",
    lead: "Two pointers, sliding window และ hash map — โจทย์สัมภาษณ์จริงพร้อมเฉลยที่อธิบายว่าทำไมเร็วขึ้น",
    group: "โจทย์ฝึก",
    blocks: [
      { t: "p", c: "หัวข้อสุดท้ายคือโจทย์ระดับสัมภาษณ์จริง ที่แก้ด้วย 3 เทคนิคทรงพลัง โจทย์เหล่านี้คือเวอร์ชันง่ายของที่เจอใน LeetCode ทุกข้อมีทั้งวิธีตรงไปตรงมา (ช้า) และวิธีที่ใช้ pattern (เร็ว) ให้เทียบกัน" },

      { t: "h2", c: "ข้อ 1 — Two Sum 🟡 (Hash Map)" },
      { t: "p", c: "หา index ของเลข 2 ตัวในลิสต์ที่บวกกันได้ค่า target เช่น [2,7,11,15] target=9 → [0,1] (เพราะ 2+7=9)" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "# วิธีช้า O(n²): วนทุกคู่\ndef two_sum_slow(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]\n\n# วิธีเร็ว O(n): ใช้ dict จำสิ่งที่เคยเห็น\ndef two_sum(nums, target):\n    seen = {}                     # ค่า -> index\n    for i, num in enumerate(nums):\n        need = target - num\n        if need in seen:          # เคยเห็นตัวที่ต้องการแล้ว\n            return [seen[need], i]\n        seen[num] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))  # [0, 1]" },
          { t: "p", c: "แทนที่จะวนหาคู่ทุกแบบ (O(n²)) เราถามว่า \"ต้องการเลขอะไรถึงจะครบ target\" (need = target - num) แล้วเช็คใน dict ว่าเคยเห็นไหม (O(1)) เปลี่ยนทั้งโจทย์เป็น O(n) — นี่คือเหตุผลที่ hash map ทรงพลัง" },
        ],
      },

      { t: "h2", c: "ข้อ 2 — ผลรวมมากสุดของช่วงยาว k 🟡 (Sliding Window)" },
      { t: "p", c: "หาผลรวมมากสุดของ subarray ต่อเนื่องความยาว k เช่น [2,1,5,1,3,2] k=3 → 9 (จาก 5+1+3)" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "def max_sum_k(arr, k):\n    window = sum(arr[:k])         # ผลรวมหน้าต่างแรก\n    best = window\n    for i in range(k, len(arr)):\n        window += arr[i] - arr[i - k]  # เพิ่มตัวใหม่ ลบตัวเก่า\n        best = max(best, window)\n    return best\n\nprint(max_sum_k([2, 1, 5, 1, 3, 2], 3))  # 9" },
          { t: "p", c: "วิธีตรง ๆ คือคำนวณผลรวมทุกช่วงใหม่ (O(n×k)) แต่ sliding window สังเกตว่าช่วงถัดไปต่างจากช่วงเดิมแค่ \"เพิ่มตัวขวา ลบตัวซ้าย\" จึงปรับทีละนิด ไม่ต้องบวกใหม่ทั้งหมด เหลือ O(n)" },
        ],
      },

      { t: "h2", c: "ข้อ 3 — Substring ยาวสุดไม่มีตัวซ้ำ 🔴 (Sliding Window + Set)" },
      { t: "p", c: "หาความยาวของ substring ที่ยาวที่สุดซึ่งไม่มีตัวอักษรซ้ำ เช่น \"abcabcbb\" → 3 (\"abc\")" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "def longest_unique(s):\n    seen = set()\n    left = 0\n    best = 0\n    for right in range(len(s)):\n        while s[right] in seen:    # มีตัวซ้ำ หดหน้าต่างจากซ้าย\n            seen.remove(s[left])\n            left += 1\n        seen.add(s[right])\n        best = max(best, right - left + 1)\n    return best\n\nprint(longest_unique(\"abcabcbb\"))  # 3\nprint(longest_unique(\"bbbbb\"))     # 1" },
          { t: "p", c: "หน้าต่างขยายขวา (right) เรื่อย ๆ ถ้าเจอตัวซ้ำก็หดซ้าย (left) จนไม่ซ้ำ set จำว่าตัวไหนอยู่ในหน้าต่าง ความยาวหน้าต่าง = right - left + 1 เป็นการผสม sliding window กับ set — โจทย์ LeetCode ยอดนิยมที่ดูยากแต่ pattern ชัด" },
        ],
      },

      { t: "h2", c: "ข้อ 4 — Two Sum บนลิสต์เรียงแล้ว 🟡 (Two Pointers)" },
      { t: "p", c: "ลิสต์เรียงแล้ว หาคู่ที่บวกได้ target เช่น [1,3,5,7,9] target=12 → (3,9)" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "def two_sum_sorted(arr, target):\n    i, j = 0, len(arr) - 1\n    while i < j:\n        s = arr[i] + arr[j]\n        if s == target:\n            return (arr[i], arr[j])\n        elif s < target:\n            i += 1            # น้อยไป ขยับซ้ายขึ้น\n        else:\n            j -= 1            # มากไป ขยับขวาลง\n    return None\n\nprint(two_sum_sorted([1, 3, 5, 7, 9], 12))  # (3, 9)" },
          { t: "p", c: "เพราะลิสต์เรียงแล้ว เราใช้ตัวชี้หัว (i) และท้าย (j): ถ้าผลรวมน้อยไปก็ขยับ i ขึ้น (ได้ค่ามากขึ้น) ถ้ามากไปก็ขยับ j ลง ค่อย ๆ บีบเข้าหากัน O(n) ไม่ต้องใช้หน่วยความจำเพิ่มเหมือน hash map" },
        ],
      },

      { t: "h2", c: "สรุป: เลือก pattern จากสัญญาณในโจทย์" },
      {
        t: "table",
        head: ["เจอลักษณะนี้", "ใช้ pattern", "ตัวอย่างข้อ"],
        rows: [
          ["จับคู่ / นับ / \"เคยเห็นไหม\"", "Hash map / set", "ข้อ 1, 3"],
          ["subarray/substring ต่อเนื่อง", "Sliding window", "ข้อ 2, 3"],
          ["ลิสต์เรียงแล้ว / หาคู่ / สองด้าน", "Two pointers", "ข้อ 4"],
        ],
      },
      { t: "callout", title: "ก้าวต่อไปสู่สัมภาษณ์จริง", c: "ถ้าทำชุดนี้ได้ คุณพร้อมเริ่มฝึก LeetCode แล้ว ไปต่อที่ส่วนเตรียม Coding Interview เพื่อดู study plan, NeetCode 150 และเทคนิคทำข้อสอบ — โจทย์ที่นั่นคือเวอร์ชันเต็มของ pattern ที่ฝึกมาทั้งหมด" },
      {
        t: "links",
        c: [
          { title: "ไปต่อ: เริ่มเตรียม Coding Interview", slug: "interview-formats", desc: "รูปแบบสัมภาษณ์ และวิธีฝึก LeetCode อย่างเป็นระบบ" },
          { title: "ดู Algorithms Cheatsheet", slug: "algorithms", desc: "สรุป pattern และ complexity เชิงลึก" },
          { title: "← โจทย์ Recursion", slug: "pp-recursion" },
        ],
      },
    ],
  },
};
