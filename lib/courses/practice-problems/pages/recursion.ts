import type { Page } from "@/lib/types";

export const recursionPages: Record<string, Page> = {
  "pp-recursion": {
    slug: "pp-recursion",
    title: "โจทย์ Recursion",
    lead: "ฝึกคิดแบบเรียกตัวเอง — หา base case, แบ่งเป็นปัญหาเล็กลง แล้วเชื่อว่ามันแก้ได้",
    group: "โจทย์ฝึก",
    blocks: [
      { t: "p", c: "Recursion เป็นแนวคิดที่ต้องฝึกจนชิน โจทย์ชุดนี้เรียงจากง่ายไปยาก ทุกข้อให้ถาม 2 คำถามเสมอ: (1) base case คืออะไร (2) จะแบ่งเป็นปัญหาเล็กลงอย่างไร อย่าพยายามไล่ตามทุกชั้นในหัว" },
      { t: "callout", title: "เตือนความจำ", c: "ทุกฟังก์ชัน recursion ต้องมี base case (จุดหยุด) และ recursive case (เรียกตัวเองด้วยปัญหาที่เล็กลง) ลืม base case = RecursionError วนไม่จบ" },

      { t: "h2", c: "ข้อ 1 — factorial 🟢" },
      { t: "p", c: "คำนวณ n! ด้วย recursion (ไม่ใช้ loop) เช่น 5! = 120" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "def factorial(n):\n    if n <= 1:               # base case\n        return 1\n    return n * factorial(n - 1)  # recursive case\n\nprint(factorial(5))   # 120" },
          { t: "p", c: "base case: 0! และ 1! = 1 (หยุด) recursive case: n! = n × (n-1)! ขยาย: 5×factorial(4) = 5×4×factorial(3) = ... = 5×4×3×2×1 จุดสำคัญคือ n-1 ทำให้เข้าใกล้ base case ทุกครั้ง" },
        ],
      },

      { t: "h2", c: "ข้อ 2 — ผลรวมลิสต์ 🟢" },
      { t: "p", c: "หาผลรวมของลิสต์ด้วย recursion เช่น [1,2,3,4] → 10" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "def sum_list(nums):\n    if not nums:                  # base: ลิสต์ว่าง = 0\n        return 0\n    return nums[0] + sum_list(nums[1:])  # ตัวแรก + ผลรวมที่เหลือ\n\nprint(sum_list([1, 2, 3, 4]))   # 10" },
          { t: "p", c: "วิธีคิด: ผลรวมของลิสต์ = สมาชิกตัวแรก + ผลรวมของลิสต์ที่เหลือ (nums[1:]) ปัญหาเล็กลงเรื่อย ๆ จนเหลือลิสต์ว่าง (base case = 0) เชื่อว่า sum_list ของส่วนที่เหลือถูกต้อง แล้วแค่บวกตัวแรกเข้าไป" },
        ],
      },

      { t: "h2", c: "ข้อ 3 — Fibonacci 🟡" },
      { t: "p", c: "หา fibonacci ตัวที่ n (0,1,1,2,3,5,8,...) ทำทั้งแบบธรรมดาและแบบเพิ่ม cache ให้เร็วขึ้น" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "def fib(n):\n    if n <= 1:\n        return n             # base: fib(0)=0, fib(1)=1\n    return fib(n - 1) + fib(n - 2)\n\nprint([fib(i) for i in range(10)])\n# [0,1,1,2,3,5,8,13,21,34]\n\n# เร็วขึ้นมากด้วย cache\nfrom functools import lru_cache\n@lru_cache(maxsize=None)\ndef fib_fast(n):\n    if n <= 1:\n        return n\n    return fib_fast(n - 1) + fib_fast(n - 2)\nprint(fib_fast(50))   # 12586269025 (เร็ว)" },
          { t: "p", c: "fib แบบธรรมดาคำนวณค่าซ้ำมหาศาล (O(2ⁿ)) เช่น fib(5) เรียก fib(3) หลายครั้ง @lru_cache จำผลที่เคยคำนวณ ไม่ต้องคิดซ้ำ ทำให้ fib(50) ทันที นี่คือไอเดียพื้นฐานของ Dynamic Programming" },
        ],
      },

      { t: "h2", c: "ข้อ 4 — พาลินโดรมด้วย recursion 🟡" },
      { t: "p", c: "เช็คว่าข้อความเป็นพาลินโดรมไหม โดยใช้ recursion (ไม่ใช้ slice [::-1])" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "def is_palindrome(s):\n    if len(s) <= 1:              # base: ว่างหรือตัวเดียว = ใช่\n        return True\n    if s[0] != s[-1]:            # หัวกับท้ายไม่ตรง = ไม่ใช่\n        return False\n    return is_palindrome(s[1:-1])  # เช็คส่วนในต่อ\n\nprint(is_palindrome(\"level\"))  # True\nprint(is_palindrome(\"hello\"))  # False" },
          { t: "p", c: "วิธีคิด: ข้อความเป็นพาลินโดรมถ้า ตัวหน้า = ตัวท้าย และ ส่วนตรงกลาง (s[1:-1]) ก็เป็นพาลินโดรม ลอกเปลือกออกทีละชั้นจนเหลือ 0–1 ตัว (base case) นี่คือ recursion เวอร์ชันของเทคนิค two pointers" },
        ],
      },

      { t: "h2", c: "ข้อ 5 — Power 🔴" },
      { t: "p", c: "คำนวณ base ยกกำลัง exp ด้วย recursion ให้มีประสิทธิภาพ O(log n) เช่น power(2, 10) = 1024" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "def power(base, exp):\n    if exp == 0:\n        return 1               # base case: x^0 = 1\n    half = power(base, exp // 2)\n    if exp % 2 == 0:\n        return half * half     # x^exp = (x^(exp/2))^2\n    else:\n        return half * half * base\n\nprint(power(2, 10))   # 1024" },
          { t: "p", c: "เคล็ดลับ O(log n): แทนที่จะคูณ base ทีละครั้ง n รอบ เราหาร exp ครึ่งทุกครั้ง เพราะ x^10 = (x^5)² คำนวณ x^5 ครั้งเดียวแล้วยกกำลังสอง ทำให้จำนวนการเรียกลดลงครึ่งทุกชั้น — แนวคิดเดียวกับ binary search" },
        ],
      },

      { t: "callout", title: "ฝึกต่อ", c: "ลองเขียน recursion: นับสมาชิกในลิสต์ (ไม่ใช้ len), กลับข้อความ, หาค่ามากสุดในลิสต์, แปลงเลขเป็นฐานสอง การฝึก recursion เยอะ ๆ จะช่วยมากตอนเจอโจทย์ tree และ graph ในการเตรียมสัมภาษณ์" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: เทคนิคสัมภาษณ์ (Patterns) →", slug: "pp-patterns", desc: "two pointers, sliding window, hash map" },
          { title: "← โจทย์คณิตศาสตร์ & ตรรกะ", slug: "pp-math" },
        ],
      },
    ],
  },
};
