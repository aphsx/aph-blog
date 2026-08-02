import type { Page } from "@/lib/types";

export const mathPages: Record<string, Page> = {
  "pp-math": {
    slug: "pp-math",
    title: { th: "โจทย์คณิตศาสตร์ & ตรรกะ", en: "" },
    lead: { th: "FizzBuzz, จำนวนเฉพาะ, factorial, ผลรวมหลัก — โจทย์คลาสสิกที่ฝึกการแปลงตรรกะเป็นโค้ด", en: "" },
    group: "โจทย์ฝึก",
    blocks: {
      th: [
        { t: "p", c: "โจทย์คณิต-ตรรกะฝึกการแปลงปัญหาคณิตศาสตร์เป็นโค้ด หลายข้อเป็นโจทย์สัมภาษณ์ในตำนาน (เช่น FizzBuzz) ที่ใช้คัดกรองว่าเขียนโปรแกรมพื้นฐานเป็นจริงไหม" },

        { t: "h2", c: "ข้อ 1 — FizzBuzz 🟢" },
        { t: "p", c: "พิมพ์เลข 1 ถึง n แต่: หาร 3 ลงตัวพิมพ์ \"Fizz\", หาร 5 ลงตัวพิมพ์ \"Buzz\", หารทั้ง 3 และ 5 ลงตัวพิมพ์ \"FizzBuzz\", นอกนั้นพิมพ์เลขนั้น" },
        { t: "callout", title: "คำใบ้", c: "เช็คเงื่อนไข \"หารทั้ง 3 และ 5\" (คือหาร 15) ก่อนเป็นอันดับแรก ไม่งั้นจะไม่มีวันเข้าเงื่อนไขนั้นเลย" },
        {
          t: "details",
          summary: "เฉลย + คำอธิบาย",
          c: [
            { t: "code", lang: "python", c: "for i in range(1, 16):\n    if i % 3 == 0 and i % 5 == 0:\n        print(\"FizzBuzz\")\n    elif i % 3 == 0:\n        print(\"Fizz\")\n    elif i % 5 == 0:\n        print(\"Buzz\")\n    else:\n        print(i)" },
            { t: "p", c: "กับดักคลาสสิก: ต้องเช็คเงื่อนไขที่ \"เข้มงวดที่สุด\" (หารทั้ง 3 และ 5) ก่อน เพราะ elif หยุดที่อันแรกที่จริง ถ้าเอา i % 3 ขึ้นก่อน เลข 15 จะพิมพ์ Fizz แทน FizzBuzz การเรียงลำดับเงื่อนไขสำคัญมาก" },
          ],
        },

        { t: "h2", c: "ข้อ 2 — จำนวนเฉพาะ 🟡" },
        { t: "p", c: "เช็คว่าเลข n เป็นจำนวนเฉพาะไหม (หารลงตัวแค่ 1 กับตัวมันเอง) เช่น 7 เป็น, 9 ไม่เป็น (9 = 3×3)" },
        {
          t: "details",
          summary: "เฉลย + คำอธิบาย",
          c: [
            { t: "code", lang: "python", c: "def is_prime(n):\n    if n < 2:\n        return False           # 0, 1 ไม่ใช่จำนวนเฉพาะ\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0:\n            return False       # หารลงตัว = ไม่ใช่\n    return True\n\nprint(is_prime(7))   # True\nprint(is_prime(9))   # False" },
            { t: "p", c: "เคล็ดลับประสิทธิภาพ: เช็คตัวหารแค่ถึง √n พอ (int(n**0.5)+1) เพราะถ้า n มีตัวประกอบที่ใหญ่กว่า √n มันต้องคู่กับตัวที่เล็กกว่า √n ซึ่งเราเจอไปแล้ว ลดจาก O(n) เหลือ O(√n)" },
          ],
        },

        { t: "h2", c: "ข้อ 3 — factorial 🟢" },
        { t: "p", c: "คำนวณ n! = 1×2×3×...×n เช่น 5! = 120 (ทำแบบ loop)" },
        {
          t: "details",
          summary: "เฉลย + คำอธิบาย",
          c: [
            { t: "code", lang: "python", c: "def factorial(n):\n    result = 1\n    for i in range(2, n + 1):\n        result *= i\n    return result\n\nprint(factorial(5))   # 120" },
            { t: "p", c: "สะสมผลคูณในตัวแปร result เริ่มที่ 1 (เพราะคูณ) แล้ววนคูณ 2 ถึง n เทียบกับการสะสมผลรวมที่เริ่มจาก 0 — ค่าเริ่มต้นต้องเหมาะกับการดำเนินการ (บวกเริ่ม 0, คูณเริ่ม 1)" },
          ],
        },

        { t: "h2", c: "ข้อ 4 — ผลรวมของหลัก 🟡" },
        { t: "p", c: "หาผลรวมของเลขแต่ละหลัก เช่น 1234 → 1+2+3+4 = 10 (ลองทำทั้งแบบแปลงเป็น string และแบบใช้ % กับ //)" },
        {
          t: "details",
          summary: "เฉลย + คำอธิบาย",
          c: [
            { t: "code", lang: "python", c: "# แบบ string (ง่าย)\ndef digit_sum(n):\n    return sum(int(d) for d in str(n))\n\n# แบบคณิต (ใช้ % และ //)\ndef digit_sum_math(n):\n    total = 0\n    while n > 0:\n        total += n % 10      # หลักสุดท้าย\n        n //= 10             # ตัดหลักสุดท้ายออก\n    return total\n\nprint(digit_sum(1234))      # 10\nprint(digit_sum_math(1234)) # 10" },
            { t: "p", c: "แบบคณิตน่าสนใจ: n % 10 ได้หลักขวาสุด, n //= 10 ตัดหลักนั้นทิ้ง (1234 → 123) วนจน n เป็น 0 เทคนิค %10 กับ //10 เพื่อแยกหลักเป็น pattern ที่เจอบ่อยในโจทย์ตัวเลข" },
          ],
        },

        { t: "h2", c: "ข้อ 5 — GCD ห.ร.ม. 🔴" },
        { t: "p", c: "หาตัวหารร่วมมากของเลข 2 ตัว (GCD) เช่น gcd(12, 18) = 6" },
        {
          t: "details",
          summary: "เฉลย + คำอธิบาย",
          c: [
            { t: "code", lang: "python", c: "def gcd(a, b):\n    while b:\n        a, b = b, a % b   # Euclid's algorithm\n    return a\n\nprint(gcd(12, 18))   # 6\nprint(gcd(48, 36))   # 12" },
            { t: "p", c: "ใช้อัลกอริทึมยุคลิด (Euclid) อายุ 2000 ปี: gcd(a,b) = gcd(b, a%b) วนจน b เป็น 0 แล้ว a คือคำตอบ บรรทัด a, b = b, a % b สลับค่าพร้อมคำนวณในบรรทัดเดียว — โจทย์นี้สอนว่าบางปัญหามีสูตรสวย ๆ ที่รู้แล้วจะง่ายมาก" },
          ],
        },

        { t: "callout", title: "ลองต่อยอด", c: "เขียนโปรแกรมหาจำนวนเฉพาะทั้งหมดถึง n (ใช้ is_prime วน), หา fibonacci, เช็คว่าเลขเป็น perfect number ไหม การฝึกโจทย์คณิตช่วยให้แปลงตรรกะเป็นโค้ดได้คล่อง" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: โจทย์ Recursion →", slug: "pp-recursion", desc: "ฝึกคิดแบบเรียกตัวเอง" },
            { title: "← โจทย์ Dictionary & Set", slug: "pp-dict-set" },
          ],
        },
      ],
      en: [],
    },
  },
};
