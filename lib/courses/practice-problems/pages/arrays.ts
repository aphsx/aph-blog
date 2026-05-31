import type { Page } from "@/lib/types";

export const arraysPages: Record<string, Page> = {
  "pp-arrays": {
    slug: "pp-arrays",
    title: "โจทย์ Array / List",
    lead: "หาค่า นับ กรอง จัดเรียง และดัดแปลงลิสต์ — โจทย์ประเภทที่เจอบ่อยที่สุดในการสัมภาษณ์",
    group: "โจทย์ฝึก",
    blocks: [
      { t: "p", c: "Array/List คือโครงสร้างที่โจทย์สัมภาษณ์ถามบ่อยที่สุด โจทย์ชุดนี้ฝึกตั้งแต่หาค่ามากสุด ไปจนถึงการดัดแปลงลิสต์อย่างมีประสิทธิภาพ ลองเขียนเองก่อนดูเฉลย" },

      { t: "h2", c: "ข้อ 1 — ผลรวม / มากสุด / น้อยสุด 🟢" },
      { t: "p", c: "รับลิสต์ตัวเลข แล้วหาผลรวม ค่ามากสุด ค่าน้อยสุด และค่าเฉลี่ย (ลองเขียนเองโดยไม่ใช้ sum/max/min ก่อน แล้วค่อยเทียบกับเวอร์ชันที่ใช้)" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "nums = [4, 8, 15, 16, 23, 42]\n\n# เขียนเองเพื่อเข้าใจหลักการ\ntotal = 0\nbiggest = nums[0]\nsmallest = nums[0]\nfor n in nums:\n    total += n\n    if n > biggest:\n        biggest = n\n    if n < smallest:\n        smallest = n\nprint(total, biggest, smallest, total / len(nums))\n\n# ในงานจริงใช้ของสำเร็จรูป\nprint(sum(nums), max(nums), min(nums))" },
          { t: "p", c: "เริ่ม biggest/smallest ด้วยสมาชิกตัวแรก (ไม่ใช่ 0 — เพราะถ้ามีแต่ค่าติดลบจะผิด!) แล้ววนเทียบทีละตัว เป็น pattern พื้นฐานของการสแกนลิสต์รอบเดียว O(n)" },
        ],
      },

      { t: "h2", c: "ข้อ 2 — นับค่าที่เข้าเงื่อนไข 🟢" },
      { t: "p", c: "รับลิสต์ตัวเลข แล้วนับว่ามีกี่ตัวที่มากกว่า 10 และกรองเฉพาะเลขคู่ออกมาเป็นลิสต์ใหม่" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "nums = [3, 12, 7, 20, 8, 15]\n\ncount = 0\nfor n in nums:\n    if n > 10:\n        count += 1\nprint(\"มากกว่า 10:\", count)\n\n# กรองเลขคู่ด้วย comprehension\nevens = [n for n in nums if n % 2 == 0]\nprint(\"เลขคู่:\", evens)   # [12, 20, 8]" },
          { t: "p", c: "การนับคือสะสมตัวแปร count เมื่อเข้าเงื่อนไข ส่วนการกรองเขียนสั้นได้ด้วย list comprehension [n for n in nums if เงื่อนไข] — อ่านว่า \"เอา n ทุกตัวที่...\" " },
        ],
      },

      { t: "h2", c: "ข้อ 3 — กลับลิสต์ & ลบค่าซ้ำ 🟢" },
      { t: "p", c: "รับลิสต์ แล้ว (ก) กลับลำดับ (ข) ลบค่าซ้ำให้เหลือค่าไม่ซ้ำ (ตามลำดับเดิมถ้าทำได้)" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "nums = [1, 3, 3, 2, 1, 4]\n\nprint(nums[::-1])           # กลับลำดับ -> [4,1,2,3,3,1]\n\n# ลบซ้ำแบบไม่สนลำดับ\nprint(list(set(nums)))      # [1, 2, 3, 4]\n\n# ลบซ้ำแต่คงลำดับเดิม\nseen = set()\nunique = []\nfor n in nums:\n    if n not in seen:\n        seen.add(n)\n        unique.append(n)\nprint(unique)               # [1, 3, 2, 4]" },
          { t: "p", c: "set(nums) ตัดซ้ำได้ทันทีแต่เสียลำดับ ถ้าต้องคงลำดับเดิม ใช้ set ช่วยจำว่า \"เคยเห็นไหม\" (เช็ค O(1)) แล้วค่อย ๆ ใส่ตัวใหม่ลง unique เทคนิคใช้ set กันซ้ำนี้เจอบ่อย" },
        ],
      },

      { t: "h2", c: "ข้อ 4 — เลขมากสุดอันดับสอง 🟡" },
      { t: "p", c: "หาเลขที่มากเป็นอันดับสองในลิสต์ เช่น [5, 2, 8, 8, 1] → 5 (8 มากสุด, 5 รองลงมา ไม่นับ 8 ซ้ำ)" },
      { t: "callout", title: "คำใบ้", c: "วิธีง่าย: ตัดซ้ำด้วย set แล้ว sort เอาตัวรองท้าย แต่ลองคิดวิธี O(n) ที่ไล่ครั้งเดียวเก็บค่ามากสุดและรองลงมาด้วย" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "def second_largest(nums):\n    unique = list(set(nums))     # ตัดซ้ำ\n    if len(unique) < 2:\n        return None              # ไม่มีอันดับสอง\n    unique.sort()\n    return unique[-2]            # ตัวรองท้าย\n\nprint(second_largest([5, 2, 8, 8, 1]))  # 5\n\n# เวอร์ชัน O(n) ไล่ครั้งเดียว\ndef second_largest_v2(nums):\n    first = second = float('-inf')\n    for n in set(nums):\n        if n > first:\n            second = first\n            first = n\n        elif n > second:\n            second = n\n    return second if second != float('-inf') else None" },
          { t: "p", c: "เวอร์ชันแรก (sort) อ่านง่าย O(n log n) เวอร์ชันสอง O(n) เก็บตัวมากสุด (first) และรองลงมา (second) ระหว่างไล่ ถ้าเจอตัวใหม่ใหญ่กว่า first ก็เลื่อน first ไปเป็น second แล้วตั้ง first ใหม่ — เริ่มด้วย -infinity เพื่อรองรับค่าติดลบ" },
        ],
      },

      { t: "h2", c: "ข้อ 5 — รวมสองลิสต์ที่เรียงแล้ว 🟡" },
      { t: "p", c: "มีลิสต์เรียงแล้ว 2 อัน รวมเป็นลิสต์เดียวที่ยังเรียงอยู่ เช่น [1,3,5] + [2,4,6] → [1,2,3,4,5,6] (ลองทำแบบ two pointers ไม่ใช่แค่ต่อกันแล้ว sort)" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "def merge(a, b):\n    result = []\n    i = j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            result.append(a[i])\n            i += 1\n        else:\n            result.append(b[j])\n            j += 1\n    result.extend(a[i:])    # เก็บตัวที่เหลือ\n    result.extend(b[j:])\n    return result\n\nprint(merge([1, 3, 5], [2, 4, 6]))  # [1,2,3,4,5,6]" },
          { t: "p", c: "ใช้ตัวชี้สองตัว (i, j) ชี้แต่ละลิสต์ เทียบหัวของทั้งสอง เอาตัวที่น้อยกว่าใส่ผลลัพธ์แล้วเลื่อนตัวชี้นั้น ทำจนลิสต์ใดหมด แล้วเก็บส่วนที่เหลือ — นี่คือหัวใจของ merge sort และเป็น O(n) ดีกว่าต่อกันแล้ว sort (O(n log n))" },
        ],
      },

      { t: "h2", c: "ข้อ 6 — หมุนลิสต์ 🔴" },
      { t: "p", c: "หมุนลิสต์ไปทางขวา k ตำแหน่ง เช่น [1,2,3,4,5] หมุน k=2 → [4,5,1,2,3]" },
      {
        t: "details",
        summary: "เฉลย + คำอธิบาย",
        c: [
          { t: "code", lang: "python", c: "def rotate(nums, k):\n    n = len(nums)\n    k = k % n                # กัน k มากกว่าความยาว\n    return nums[-k:] + nums[:-k]\n\nprint(rotate([1, 2, 3, 4, 5], 2))  # [4, 5, 1, 2, 3]" },
          { t: "p", c: "เคล็ดลับใช้ slice: nums[-k:] คือ k ตัวท้าย (ที่จะถูกย้ายมาหน้า) ส่วน nums[:-k] คือที่เหลือ เอามาต่อกัน ส่วน k % n สำคัญมาก: ถ้า k=7 บนลิสต์ 5 ตัว การหมุน 7 ครั้งก็เท่ากับหมุน 2 ครั้ง (7 % 5 = 2) — edge case ที่ห้ามลืม" },
        ],
      },

      { t: "callout", title: "สังเกต pattern", c: "two pointers (ข้อ 5) และ set กันซ้ำ (ข้อ 3) จะเจออีกในหัวข้อ Patterns โจทย์ Array ส่วนใหญ่วนเข้าวนออกจากไม่กี่เทคนิคนี้ ฝึกจนชินแล้วจะเห็น pattern เร็วขึ้น" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: โจทย์ Dictionary & Set →", slug: "pp-dict-set", desc: "นับความถี่ จับคู่ ตัดซ้ำ" },
          { title: "← โจทย์ String", slug: "pp-strings" },
        ],
      },
    ],
  },
};
