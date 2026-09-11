import type { Page } from "@/lib/types";

export const stackPages: Record<string, Page> = {
  "lc75-intro-stack": {
    slug: "lc75-intro-stack",
    title: {
      th: "Stack — พื้นฐาน & แนวคิด",
      en: "Stack — Fundamentals & Mental Models",
    },
    lead: {
      th: 'กองข้อมูลที่ "ใส่ทีหลัง หยิบออกก่อน" (LIFO) — นึกถึงกระป๋อง Pringles หรือกองจาน แล้วใช้ list ของ Python เป็นอาวุธได้ทันที',
      en: "Last-In-First-Out (LIFO) data structure — think Pringles can or stack of plates, powered directly by Python lists.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: 'เวลาได้ยินคำว่า data structure (โครงสร้างข้อมูล) มือใหม่อาจคิดว่าต้องเป็นโค้ดซับซ้อน แต่ Stack (สแต็ก) คือโครงสร้างที่ไอเดียง่ายที่สุดอย่างหนึ่ง — และเป็นอาวุธหลักของโจทย์ในหมวดนี้ทั้งหมด',
        },

        { t: "h2", c: "ส่วนที่ 1 · ปลดล็อกไอเดีย" },
        {
          t: "p",
          c: 'ภาพจำ: นึกถึงกระป๋องมันฝรั่ง Pringles หรือกองจาน — แผ่นแรกที่ใส่ตกไปก้นกระป๋อง แผ่นถัดไปทับลงไป แผ่นสุดท้ายอยู่บนสุด เวลาหยิบกินต้องหยิบแผ่นบนสุดออกก่อนเสมอ เสกแผ่นล่างสุดทะลุกระป๋องออกมาไม่ได้ (ถ้าทำได้คือพัง) นี่คือคอนเซปต์ทั้งหมดของ stack',
        },
        {
          t: "image",
          src: "/leetcode-75/stack.gif",
          alt: "Stack LIFO: push 10, 20, 30 then pop from the top",
          caption: "Stack · LIFO — push ทับบนสุด · pop เอาบนสุดออกก่อน (เข้าทีหลัง ออกก่อน)",
        },
        {
          t: "code",
          lang: "text",
          label: "ใส่ 10 → 20 → 30 แล้วกองหน้าตาแบบนี้",
          c: `| 30 |  <- top (หยิบออกก่อน)
| 20 |
| 10 |  <- bottom (ใส่เข้ามาก่อนสุด)
+----+

pop() ได้ 30 · กองเหลือ [10, 20]`,
        },

        { t: "h2", c: "ส่วนที่ 2 · กฎเหล็ก — LIFO" },
        {
          t: "p",
          c: 'Stack มีกฎเดียวที่ต้องเคารพ: LIFO = Last In, First Out = "เข้าทีหลัง ออกก่อน" อาวุธประจำกายมี 3 ท่า:',
        },
        {
          t: "ol",
          c: [
            "Push — วางของชิ้นใหม่ทับลงบนสุดของกอง",
            "Pop — หยิบของชิ้นบนสุดออกจากกอง (ชิ้นนั้นหายจากกองเลย)",
            "Peek / Top — แอบดูว่าของบนสุดคืออะไร แต่ยังไม่หยิบออก",
          ],
        },

        { t: "h2", c: "ส่วนที่ 3 · ใน Python พร้อมใช้เลย" },
        {
          t: "p",
          c: "ข่าวดี: ไม่ต้อง import อะไร — list ธรรมดา `[ ]` ทำหน้าที่เป็น stack ได้ครบด้วยคำสั่งที่คุ้นอยู่แล้ว",
        },
        {
          t: "table",
          head: ["แอคชันของ Stack", "คำสั่ง Python (ใช้ list)", "Big-O"],
          rows: [
            ["Push (ใส่ของ)", "stack.append(x)", "O(1)"],
            ["Pop (ดึงออก)", "stack.pop()", "O(1)"],
            ["Peek (แอบดู)", "stack[-1]", "O(1)"],
            ["Is Empty (ว่างไหม)", "not stack", "O(1)"],
          ],
        },
        {
          t: "callout",
          title: "ทำไมทุกท่าเป็น O(1)",
          c: "เราแตะแค่ของที่อยู่ปากกระป๋องเท่านั้น ไม่ต้องเลื่อนหรือไล่ของข้างล่าง — กองสูงแค่ไหนก็เร็วเท่าเดิม",
        },

        { t: "h2", c: "ส่วนที่ 4 · จำลองการทำงาน" },
        {
          t: "p",
          c: "ลองหย่อนตัวเลขใส่กระป๋องทีละชิ้น แล้วดูว่า Peek กับ Pop ต่างกันยังไง:",
        },
        {
          t: "codeout",
          lang: "python",
          label: "Walkthrough — push / peek / pop",
          code: `stack = []           # 1. กระป๋องเปล่า

stack.append(10)     # 2. Push 10  ->  [10]
stack.append(20)     # 3. Push 20  ->  [10, 20]
stack.append(30)     # 4. Push 30  ->  [10, 20, 30]

print(stack[-1])     # 5. Peek ตัวบนสุด  ->  30 (กองยังเป็น [10, 20, 30])

top = stack.pop()    # 6. Pop ตัวบนสุด  ->  ได้ 30, กองเหลือ [10, 20]
print(top)

# 7. เทของออกให้หมด (เคลียร์ stack)
while stack:
    print(stack.pop())   # ได้ 20 ก่อน แล้วตามด้วย 10`,
          out: `30
30
20
10`,
        },

        { t: "h2", c: "ส่วนที่ 5 · สัญญาณว่าโจทย์ข้อนี้ต้องใช้ Stack" },
        {
          t: "p",
          c: "เวลาลุย LeetCode ถ้าเจอสถานการณ์แบบนี้ ให้นึกถึง stack เป็นอันดับแรก:",
        },
        {
          t: "ul",
          c: [
            "ตรวจจับการจับคู่ / เปิด-ปิด — เช่น จับคู่วงเล็บ (เจอเปิดให้เก็บไว้ เจอปิดค่อยเทียบกับตัวล่าสุด)",
            "การย้อนรอย (Undo / Backspace) — เช่น เจอ # ให้ลบตัวอักษรที่เพิ่งพิมพ์ไปก่อนหน้า",
            "ข้อมูลซ้อนชั้น (Nested) — เช่น ถอดรหัสข้อความที่มีวงเล็บซ้อนหลายชั้น เช่น 3[a2[c]]",
          ],
        },
        {
          t: "callout",
          title: "ประโยคท่องจำ",
          c: 'ถ้าต้องจำของล่าสุดไว้ก่อน เพื่อรอเอามาจัดการทีหลัง = ใช้ Stack',
        },

        {
          t: "p",
          c: "พื้นฐานครบแล้ว — หมวดนี้มี 3 ข้อ: Removing Stars · Asteroid Collision · Decode String พร้อมแล้วกดถัดไปลุยข้อแรกได้เลย",
        },
      ],
      en: [],
    },
  },

  "lc75-p24": {
    slug: "lc75-p24",
    title: {
      th: "ข้อ 24 · LC2390 Removing Stars From a String 🟢",
      en: "2390. Removing Stars From a String",
    },
    lead: {
      th: "ลบดาวและตัวอักษรทางซ้ายที่ใกล้ที่สุดออก — มองดาวเป็นปุ่ม Backspace แล้วจำลองการพิมพ์ด้วย Stack ในเวลา O(n)",
      en: "Remove stars and their closest left characters — treat stars as Backspace and simulate typing with a stack in O(n).",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "You are given a string s, which contains stars *.\n\nIn one operation, you can:\n• Choose a star in s.\n• Remove the closest non-star character to its left, as well as remove the star itself.\n\nReturn the string after all stars have been removed.\n\nNote:\n• The input will be generated such that the operation is always possible.\n• It can be shown that the resulting string will always be unique.",
        },
        {
          t: "p",
          c: "มีสตริง `s` ที่มีตัวอักษรและเครื่องหมายดอกจัน `*` มาให้ — ในแต่ละขั้นตอน คุณสามารถ:\n• เลือกดาว 1 ดวงใน `s`\n• ลบตัวอักษรที่ไม่ใช่ดาวที่อยู่ชิดซ้ายมือของมันที่สุดออก 1 ตัว พร้อมทั้งลบดาวดวงนั้นทิ้งไปด้วย\n\nให้คืนค่าสตริงผลลัพธ์หลังจากลบดาวทั้งหมดออกไปแล้ว\n\nหมายเหตุ: โจทย์รับประกันว่าสามารถทำ operation ได้เสมอและผลลัพธ์จะมีเพียงแบบเดียวแน่นอน",
        },
        {
          t: "example",
          c: [
            {
              input: 's = "leet**cod*e"',
              output: '"lecoe"',
              explain:
                "ไล่ลบจากซ้ายไปขวา:\n- ดาวดวงที่ 1 ลบ 't' ข้างหน้า → เหลือ 'lee*cod*e'\n- ดาวดวงที่ 2 ลบ 'e' ข้างหน้า → เหลือ 'lecod*e'\n- ดาวดวงที่ 3 ลบ 'd' ข้างหน้า → เหลือ 'lecoe'\nไม่มีดาวเหลือแล้ว ตอบ 'lecoe'",
            },
            {
              input: 's = "erase*****"',
              output: '""',
              explain: "มีตัวอักษร 5 ตัว และมีดาว 5 ดวงลบหมดเกลี้ยง → ตอบสตริงว่าง \"\"",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= s.length <= 10^5",
            "s ประกอบด้วยตัวอักษรภาษาอังกฤษพิมพ์เล็กและเครื่องหมาย * เท่านั้น",
            "การลบดาวสามารถทำได้ถูกต้องเสมอตามเงื่อนไขโจทย์",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "คิดภาพ: ถ้าเรากำลังพิมพ์ข้อความลงโปรแกรมพิมพ์งาน แล้วกดปุ่ม Backspace บนคีย์บอร์ด จะเกิดอะไรขึ้นกับตัวอักษรล่าสุด? ลองเขียนโค้ดเองก่อนเปิดดูเฉลย",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์บอกว่า 'เมื่อเจอเครื่องหมายดาว ให้ลบตัวอักษรทางซ้ายที่ใกล้ที่สุด' — นี่คือพฤติกรรมของปุ่ม **Backspace** บนคีย์บอร์ดชัดเจน! ทุกครั้งที่กด Backspace สิ่งที่หายไปคือตัวอักษรตัวล่าสุดที่เราเพิ่งพิมพ์ลงไป",
            },
            {
              t: "p",
              c: "โครงสร้างข้อมูลที่จัดการเรื่อง 'เข้าทีหลัง แต่ออกก่อน' (LIFO) ได้เป็นธรรมชาติและรวดเร็วที่สุดคือ **Stack**",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: 'ใช้ Example 1: s = "leet**cod*e"',
            },
            {
              t: "ul",
              c: [
                "อ่าน 'l' → ตัวอักษรปกติ นำใส่กล่อง: ['l']",
                "อ่าน 'e' → ตัวอักษรปกติ นำใส่กล่อง: ['l', 'e']",
                "อ่าน 'e' → ตัวอักษรปกติ นำใส่กล่อง: ['l', 'e', 'e']",
                "อ่าน 't' → ตัวอักษรปกติ นำใส่กล่อง: ['l', 'e', 'e', 't']",
                "อ่าน '*' → เจอดาว! ลบตัวบนสุดทิ้ง (ลบ 't'): กล่องเหลือ ['l', 'e', 'e']",
                "อ่าน '*' → เจอดาว! ลบตัวบนสุดทิ้ง (ลบ 'e'): กล่องเหลือ ['l', 'e']",
                "อ่าน 'c' → ใส่กล่อง: ['l', 'e', 'c']",
                "อ่าน 'o' → ใส่กล่อง: ['l', 'e', 'c', 'o']",
                "อ่าน 'd' → ใส่กล่อง: ['l', 'e', 'c', 'o', 'd']",
                "อ่าน '*' → เจอดาว! ลบตัวบนสุดทิ้ง (ลบ 'd'): กล่องเหลือ ['l', 'e', 'c', 'o']",
                "อ่าน 'e' → ใส่กล่อง: ['l', 'e', 'c', 'o', 'e']",
                "อ่านหมดแล้ว: เทตัวอักษรที่เหลือมาต่อกัน ได้ 'lecoe'",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: สร้าง list ว่าง `stack = []` วนอ่านตัวอักษรทีละตัวในสตริง ถ้าเจอตัวปกติให้ `append` ถ้าเจอ `*` ให้ `pop` และปิดท้ายด้วยการใช้ `\"\".join(stack)`",
            },
            {
              t: "p",
              c: "เครื่องมือที่ต้องใช้:",
            },
            {
              t: "ul",
              c: [
                "stack = [] — ใน Python เราใช้ list ปกติทำหน้าที่เป็น Stack ได้ทันที",
                "stack.append(char) — หย่อนตัวอักษรลงบนสุดของ stack (ใช้เวลา O(1))",
                "stack.pop() — หยิบตัวอักษรบนสุดออกไป (ใช้เวลา O(1))",
                "\"\".join(stack) — รวบรวมตัวอักษรใน stack มาเชื่อมเป็น string เดียว (ใช้เวลา O(n))",
              ],
            },
            {
              t: "p",
              c: "ข้อควรระวัง: อย่าเขียนสตริงต่อกันตรง ๆ ด้วย `res += char` แล้วใช้ slice `res = res[:-1]` เพื่อลบตัวท้าย เพราะใน Python สตริงแก้ไขไม่ได้ (immutable) การทำแบบนั้นจะต้องก๊อปปี้สตริงใหม่ทั้งก้อนทุกรอบ ทำให้โปรแกรมช้าลงกลายเป็น O(n²) จน Time Limit Exceeded (TLE) ได้ ต้องสะสมใน list แล้ว join ทีเดียวตอนจบ!",
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "ตารางจำลองการทำงานทีละตัวอักษรของ s = 'leet**cod*e':",
            },
            {
              t: "table",
              head: ["ขั้นตอน", "อ่านตัวอักษร", "Action", "สภาพของ Stack", "คำอธิบาย"],
              rows: [
                ["1", "'l'", "append('l')", "['l']", "พิมพ์ 'l'"],
                ["2", "'e'", "append('e')", "['l', 'e']", "พิมพ์ 'e'"],
                ["3", "'e'", "append('e')", "['l', 'e', 'e']", "พิมพ์ 'e'"],
                ["4", "'t'", "append('t')", "['l', 'e', 'e', 't']", "พิมพ์ 't'"],
                ["5", "'*'", "pop()", "['l', 'e', 'e']", "กด Backspace ลบ 't'"],
                ["6", "'*'", "pop()", "['l', 'e']", "กด Backspace ลบ 'e'"],
                ["7", "'c'", "append('c')", "['l', 'e', 'c']", "พิมพ์ 'c'"],
                ["8", "'o'", "append('o')", "['l', 'e', 'c', 'o']", "พิมพ์ 'o'"],
                ["9", "'d'", "append('d')", "['l', 'e', 'c', 'o', 'd']", "พิมพ์ 'd'"],
                ["10", "'*'", "pop()", "['l', 'e', 'c', 'o']", "กด Backspace ลบ 'd'"],
                ["11", "'e'", "append('e')", "['l', 'e', 'c', 'o', 'e']", "พิมพ์ 'e'"],
              ],
            },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def removeStars(self, s: str) -> str:
        stack = []

        for ch in s:
            if ch == '*':
                # เจอ * เสมือนกด Backspace ลบตัวอักษรล่าสุดทิ้ง
                stack.pop()
            else:
                # ตัวอักษรปกติ หย่อนลง stack
                stack.append(ch)

        # เชื่อมตัวอักษรที่เหลือรอดทั้งหมดกลับเป็นข้อความสตริง
        return "".join(stack)`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["บรรทัด", "โค้ด", "หน้าที่"],
              rows: [
                ["1", "stack = []", "สร้าง stack เปล่าสำหรับเก็บตัวอักษรที่รอด"],
                ["2", "for ch in s:", "อ่านตัวอักษรจากสตริงต้นฉบับทีละตัวจากซ้ายไปขวา"],
                ["3", "if ch == '*': stack.pop()", "ถ้าเจอดาว ให้หยิบตัวบนสุด (ตัวล่าสุด) ออกจาก stack"],
                ["4", "else: stack.append(ch)", "ถ้าเป็นตัวอักษรปกติ ให้นำใส่ stack"],
                ["5", "return \"\".join(stack)", "แปลง list ตัวอักษรกลับเป็นสตริงเดียวแล้วคืนค่า"],
              ],
            },

            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "• **เวลา (Time Complexity)**: O(n) โดย n คือความยาวของสตริง `s` — ลูปอ่านตัวอักษร n ตัว แต่ละตัวทำ append หรือ pop ซึ่งเป็น O(1) และตอนจบทำ join อีก O(n) รวมทั้งหมดเป็นเส้นตรง O(n)\n\n• **พื้นที่ (Space Complexity)**: O(n) ในกรณีที่ไม่มีดาวเลย stack จะต้องเก็บตัวอักษรทั้งหมด n ตัว",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "You are given a string s, which contains stars *.\n\nIn one operation, you can:\n• Choose a star in s.\n• Remove the closest non-star character to its left, as well as remove the star itself.\n\nReturn the string after all stars have been removed.",
        },
        {
          t: "example",
          c: [
            {
              input: 's = "leet**cod*e"',
              output: '"lecoe"',
              explain: "The closest character to the 1st star is 't'. The closest character to the 2nd star is 'e'. The closest character to the 3rd star is 'd'. Result: 'lecoe'.",
            },
            {
              input: 's = "erase*****"',
              output: '""',
              explain: "The entire string is removed, so we return an empty string.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= s.length <= 10^5",
            "s consists of lowercase English letters and *.",
            "The operation is always possible.",
          ],
        },
      ],
    },
  },

  "lc75-p25": {
    slug: "lc75-p25",
    title: {
      th: "ข้อ 25 · LC735 Asteroid Collision 🟡",
      en: "735. Asteroid Collision",
    },
    lead: {
      th: "ดาวเคราะห์น้อยพุ่งชนกันบนเส้นตรง — ใช้ Stack เก็บผู้รอดชีวิต และจำลองการประลองเมื่อดาวพุ่งสวนทางกัน",
      en: "Asteroids colliding on a straight line — use a stack to simulate collisions between right-moving and left-moving asteroids.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "We are given an array asteroids of integers representing asteroids in a row. The indices of the asteroid in the array represent their relative position in space.\n\nFor each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.\n\nFind out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.",
        },
        {
          t: "p",
          c: "มี array ของจำนวนเต็ม `asteroids` แทนดาวเคราะห์น้อยที่เรียงแถวกันอยู่ในอวกาศ:\n• ค่าสัมบูรณ์ (absolute value) แทน **ขนาด** ของดาว\n• เครื่องหมายแทน **ทิศทางการบิน**: ค่าบวก (+) บินไปทางขวา, ค่าลบ (-) บินไปทางซ้าย\n• ดาวทุกดวงเคลื่อนที่ด้วยความเร็วเท่ากัน\n\nหากดาวสองดวงมาชนกัน:\n• ดวงที่เล็กกว่าจะระเบิดหายไป\n• ถ้าขนาดเท่ากัน ทั้งสองดวงจะระเบิดหายไปทั้งคู่\n• ดาวที่บินไปทิศทางเดียวกันจะไม่มีวันชนกัน\n\nให้คืนสภาพของดาวเคราะห์น้อยทั้งหมดที่เหลือรอดหลังการชนสิ้นสุดลง",
        },
        {
          t: "example",
          c: [
            {
              input: "asteroids = [5,10,-5]",
              output: "[5,10]",
              explain: "10 (บินขวา) กับ -5 (บินซ้าย) ชนกัน 10 ใหญ่กว่าจึงรอด ส่วน 5 กับ 10 บินขวาเหมือนกันไม่ชนกัน → [5, 10]",
            },
            {
              input: "asteroids = [8,-8]",
              output: "[]",
              explain: "8 (บินขวา) กับ -8 (บินซ้าย) ชนกัน ขนาดเท่ากันระเบิดทั้งคู่ → []",
            },
            {
              input: "asteroids = [10,2,-5]",
              output: "[10]",
              explain: "2 กับ -5 ชนกัน 2 ระเบิด จากนั้น 10 กับ -5 ชนกัน -5 ระเบิด เหลือเพียง [10]",
            },
            {
              input: "asteroids = [3,5,-6,2,-1,4]",
              output: "[-6,2,4]",
              explain:
                "-6 ทำลายทั้ง 5 และ 3 แล้วบินต่อไปทางซ้าย ส่วนอีกฝั่ง 2 ทำลาย -1 แล้วเหลือ [2, 4] รวมเป็น [-6, 2, 4]",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "2 <= asteroids.length <= 10^4",
            "-1000 <= asteroids[i] <= 1000",
            "asteroids[i] != 0",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "คิดให้ดี: ดาวจะชนกันได้ในเงื่อนไขแบบไหนเท่านั้น? ถ้าดาวซ้ายบินซ้าย (-) แล้วดาวขวาบินขวา (+) จะชนกันไหม?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "สิ่งสำคัญที่สุดของข้อนี้คือการทำความเข้าใจ **เงื่อนไขการชน**: ดาวจะชนกันได้กรณีเดียวเท่านั้น คือ **ดาวดวงซ้ายบินไปทางขวา (+) และดาวดวงขวาบินมาทางซ้าย (-)**",
            },
            {
              t: "p",
              c: "ถ้าเป็นกรณีอื่นจะไม่ชนกันเลย:\n• ซ้ายลบ ขวาบวก (`[-5, 5]`): บินแยกทางกัน ห่างออกจากกันเรื่อย ๆ ไม่ชน!\n• บินทิศเดียวกัน (`[5, 10]` หรือ `[-5, -10]`): ความเร็วเท่ากัน วิ่งตามกันไปเรื่อย ๆ ไม่ชน!",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "จำลองการใช้กระป๋อง Stack เก็บดาวที่ยังรอดชีวิตอยู่:",
            },
            {
              t: "ul",
              c: [
                "ถ้าเจอดาวบินขวา (> 0): หย่อนลง Stack ทันที เพราะมันไม่มีวันชนกับดาวข้างหลัง",
                "ถ้าเจอดาวบินซ้าย (< 0): มันอาจวิ่งไปชนกับดาวบินขวาที่อยู่ใน Stack!\n• ให้มันประลองกับดาวบนสุดของ Stack ไปเรื่อย ๆ\n• ถ้าดาวบนสุดเล็กกว่า (`stack[-1] < abs(curr)`): ดาวบนสุดระเบิด (`pop()`) และดวงใหม่ยังมีชีวิต วิ่งชนตัวถัดไปใน stack ต่อ\n• ถ้าขนาดเท่ากัน (`stack[-1] == abs(curr)`): ระเบิดตายทั้งคู่ (`pop()` และดวงใหม่ก็ตายด้วย)\n• ถ้าดาวบนสุดใหญ่กว่า (`stack[-1] > abs(curr)`): ดวงใหม่ระเบิดตายทันที (ดาวบนสุดรอด)",
                "ถ้าดวงใหม่ประลองชนะจน stack ไม่มีดาวบินขวาขวางหน้าแล้ว ดวงใหม่ก็จะรอดและได้ลงไปอยู่ใน stack",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: วนลูปดาวทีละดวง ใช้ตัวแปร flag เช่น `alive = True` เพื่อติดตามว่าดาวดวงปัจจุบันยังรอดอยู่หรือไม่ และใช้ลูป `while` เพื่อให้ดาวดวงใหม่ไล่ชนดาวบินขวาใน stack ทีละดวง",
            },
            {
              t: "p",
              c: "เครื่องมือที่ต้องใช้:",
            },
            {
              t: "ul",
              c: [
                "stack = [] — เก็บดาวเคราะห์น้อยที่ยังมีชีวิตรอด",
                "while alive and a < 0 and stack and stack[-1] > 0: — เงื่อนไขชน: ดวงใหม่ยังมีชีวิตอยู่, ดวงใหม่บินซ้าย, stack ไม่ว่าง, และดาวบนสุดบินขวา",
                "stack.pop() — เอาดาวบนสุดที่แพ้ออกไป",
                "alive = False — บันทึกว่าดวงใหม่ระเบิดแล้ว ไม่ต้องนำเข้า stack",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "ตารางจำลองการชนกับ asteroids = [10, 2, -5]:",
            },
            {
              t: "table",
              head: ["ดาวดวงใหม่", "สภาพ Stack ก่อนหน้า", "เหตุการณ์ / การชน", "สภาพ Stack หลังจบ"],
              rows: [
                ["10", "[]", "บินขวา ใส่ stack ทันที", "[10]"],
                ["2", "[10]", "บินขวา ใส่ stack ทันที", "[10, 2]"],
                ["-5", "[10, 2]", "บินซ้าย ชนกับ 2: ขนาด 5 ชนะ 2 → 2 ระเบิด (pop)\nจากนั้น -5 ชนต่อกับ 10: 10 ใหญ่กว่า → -5 ระเบิด", "[10]"],
              ],
            },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `from typing import List

class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        stack = []

        for a in asteroids:
            alive = True
            # เกิดการชนเมื่อ: ดวงใหม่ยังรอด, ดวงใหม่บินซ้าย (< 0), และดาวบนสุดของ stack บินขวา (> 0)
            while alive and a < 0 and stack and stack[-1] > 0:
                if stack[-1] < -a:
                    # ดาวใน stack เล็กกว่า → ระเบิดทิ้ง แล้วดวงใหม่ลูปชนต่อ
                    stack.pop()
                elif stack[-1] == -a:
                    # ขนาดเท่ากันเป๊ะ → ระเบิดทั้งคู่
                    stack.pop()
                    alive = False
                else:
                    # ดาวใน stack ใหญ่กว่า → ดวงใหม่ระเบิด
                    alive = False

            # ถ้ารอดจากการชนทั้งหมด ให้นำเข้า stack
            if alive:
                stack.append(a)

        return stack`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ท่อนโค้ด", "ทำไมต้องเขียนแบบนี้", "คำอธิบาย"],
              rows: [
                ["alive = True", "ตั้งสถานะเริ่มต้น", "ถือว่าดาวดวงใหม่ยังมีชีวิตอยู่จนกว่าจะโดนระเบิด"],
                ["while alive and a < 0 and stack and stack[-1] > 0:", "เงื่อนไขการชน", "ต้องเช็คทั้ง 4 อย่างเพื่อความปลอดภัย ไม่ให้อ่าน index ติดลบตอน stack ว่าง"],
                ["stack[-1] < -a", "เทียบขนาด", "เนื่องจาก a ติดลบ จึงใช้ -a แทนขนาดที่เป็นบวก"],
                ["if alive: stack.append(a)", "เก็บผู้รอด", "ถ้ารอดจากการประลองทั้งหมด จึงจะได้เข้าไปอยู่ใน stack"],
              ],
            },

            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "• **เวลา (Time Complexity)**: O(n) โดย n คือจำนวนดาวเคราะห์น้อย — แม้จะมีลูปซ้อน `while` ใน `for` แต่ดาวแต่ละดวงจะถูก `append` เข้า stack ได้มากสุด 1 ครั้ง และถูก `pop` ออกจาก stack ได้มากสุด 1 ครั้งเท่านั้น จำนวน operation รวมจึงเป็น O(n)\n\n• **พื้นที่ (Space Complexity)**: O(n) สำหรับ stack เก็บดาวเคราะห์น้อย",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "We are given an array asteroids of integers representing asteroids in a row.\n\nFor each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.\n\nFind out the state of the asteroids after all collisions.",
        },
        {
          t: "example",
          c: [
            {
              input: "asteroids = [5,10,-5]",
              output: "[5,10]",
              explain: "The 10 and -5 collide resulting in 10. The 5 and 10 never collide.",
            },
            {
              input: "asteroids = [8,-8]",
              output: "[]",
              explain: "The 8 and -8 collide exploding each other.",
            },
            {
              input: "asteroids = [10,2,-5]",
              output: "[10]",
              explain: "The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "2 <= asteroids.length <= 10^4",
            "-1000 <= asteroids[i] <= 1000",
            "asteroids[i] != 0",
          ],
        },
      ],
    },
  },

  "lc75-p26": {
    slug: "lc75-p26",
    title: {
      th: "ข้อ 26 · LC394 Decode String 🟡",
      en: "394. Decode String",
    },
    lead: {
      th: "ถอดรหัสสตริงที่มีวงเล็บซ้อนชั้น เช่น k[...] — เซฟสถานะเดิมเข้า Stack เมื่อเจอ [ และขยายผลลัพธ์เมื่อเจอ ]",
      en: "Decode nested repeated strings like k[...] — push state to a stack on '[', pop and expand on ']'.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "Given an encoded string, return its decoded string.\n\nThe encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.\n\nYou may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].\n\nThe test cases are generated so that the length of the output will never exceed 10^5.",
        },
        {
          t: "p",
          c: "กำหนดสตริงที่ถูกเข้ารหัส `s` มาให้ ให้คืนค่าสตริงที่ถอดรหัสแล้ว\n\nกฎการเข้ารหัสคือ: `k[encoded_string]` หมายถึงข้อความที่อยู่ในวงเล็บเหลี่ยมจะถูกทำซ้ำเป็นจำนวน `k` ครั้ง (โดย `k` เป็นจำนวนเต็มบวกเสมอ)\n\nคุณสามารถสมมติว่า input ถูกต้องตามรูปแบบเสมอ ไม่มีช่องว่างเกิน วงเล็บเหลี่ยมเปิด-ปิดครบคู่ และตัวเลขมีไว้สำหรับระบุจำนวนรอบการทำซ้ำ `k` เท่านั้น (เช่น ไม่มี input แบบ 3a หรือ 2[4])\n\nข้อความข้างในวงเล็บสามารถซ้อนกันได้ เช่น `3[a2[c]]`",
        },
        {
          t: "example",
          c: [
            {
              input: 's = "3[a]2[bc]"',
              output: '"aaabcbc"',
              explain: "ทำซ้ำ 'a' 3 ครั้งได้ 'aaa' และ 'bc' 2 ครั้งได้ 'bcbc' รวมกันเป็น 'aaabcbc'",
            },
            {
              input: 's = "3[a2[c]]"',
              output: '"accaccacc"',
              explain: "ข้างใน '2[c]' กลายเป็น 'cc' ทำให้ก้อนนอกกลายเป็น '3[acc]' ซึ่งขยายได้ 'accaccacc'",
            },
            {
              input: 's = "2[abc]3[cd]ef"',
              output: '"abcabccdcdcdef"',
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= s.length <= 30",
            "s ประกอบด้วยตัวอักษรภาษาอังกฤษพิมพ์เล็ก ตัวเลข และวงเล็บเหลี่ยม '[]'",
            "s รับประกันว่าเป็น input ที่ถูกต้องตามไวยากรณ์เสมอ",
            "ตัวเลข k ทั้งหมดใน s อยู่ในช่วง [1, 300]",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "วงเล็บซ้อนชั้นเป็นปัญหาคลาสสิกของ Stack: เมื่อเรากำลังทำของใหม่อยู่ แล้วเจอวงเล็บเปิด '[' เราควร 'เซฟเก็บ' อะไรเข้า Stack ไว้ก่อน?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ขอให้เราขยายข้อความที่ถูกย่อด้วยวงเล็บ `k[...]` ให้กลับมาเป็นข้อความเต็ม โดยความท้าทายคือ **วงเล็บสามารถซ้อนกันได้หลายชั้น** เช่น `3[a2[c]]`",
            },
            {
              t: "p",
              c: "หลักการคือ วงเล็บชั้นในสุดต้องถูกคำนวณและคลายออกมาก่อน แล้วค่อยส่งผลลัพธ์มาให้วงเล็บชั้นนอก ซึ่งนี่คือคุณสมบัติของ Stack: ทำงานกับชั้นในสุด (ชิ้นที่ใส่เข้ามาล่าสุด) ให้เสร็จก่อน",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: 'ลองแกะ s = "3[a2[c]]" ทีละสเต็ป:',
            },
            {
              t: "ul",
              c: [
                "เราเก็บตัวแปร 2 ตัว: `curr_num = 0` (สะสมเลขคูณ) และ `curr_str = \"\"` (สะสมข้อความปัจจุบัน)",
                "เจอ '3' → curr_num = 3",
                "เจอ '[' → **เซฟเกม!** เก็บ `(curr_str=\"\", curr_num=3)` เข้า Stack แล้วรีเซ็ตตัวแปรกลับเป็น 0 และ \"\"",
                "เจอ 'a' → curr_str = \"a\"",
                "เจอ '2' → curr_num = 2",
                "เจอ '[' → **เซฟเกมอีกรอบ!** เก็บ `(curr_str=\"a\", curr_num=2)` เข้า Stack แล้วรีเซ็ต",
                "เจอ 'c' → curr_str = \"c\"",
                "เจอ ']' → **ปิดภารกิจชั้นใน!**\n• ดึงเซฟล่าสุดออกมา: ได้ `prev_str = \"a\"`, `k = 2`\n• ขยายผลลัพธ์: `curr_str = prev_str + curr_str * k` = \"a\" + (\"c\" * 2) = \"acc\"",
                "เจอ ']' → **ปิดภารกิจชั้นนอก!**\n• ดึงเซฟชั้นนอกออกมา: ได้ `prev_str = \"\"`, `k = 3`\n• ขยายผลลัพธ์: `curr_str = prev_str + curr_str * k` = \"\" + (\"acc\" * 3) = \"accaccacc\"",
                "ได้คำตอบสมบูรณ์: \"accaccacc\"",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: วนอ่านตัวอักษรทีละตัวในสตริง `s` โดยแยกกรณีทำงานออกเป็น 4 กรณีชัดเจน:",
            },
            {
              t: "ol",
              c: [
                "**กรณีเป็นตัวเลข (ch.isdigit())**: สะสมตัวเลขลงใน `curr_num` ด้วยสูตร `curr_num = curr_num * 10 + int(ch)` (เพื่อรองรับเลขหลายหลัก เช่น 12 หรือ 100)",
                "**กรณีเจอ '[' (เปิดกล่อง)**: เซฟสถานะปัจจุบัน `(curr_str, curr_num)` ลงใน Stack แล้วรีเซ็ต `curr_str = \"\"` กับ `curr_num = 0` เพื่อเตรียมรับข้อความข้างใน",
                "**กรณีเจอ ']' (ปิดกล่อง)**: หยิบสถานะก่อนหน้าออกจาก Stack: `(prev_str, k) = stack.pop()` แล้วประกอบร่าง: `curr_str = prev_str + (curr_str * k)`",
                "**กรณีตัวอักษรธรรมดา**: ต่อท้ายสตริงปัจจุบัน `curr_str += ch`",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "ตาราง trace การทำงานของ s = \"3[a2[c]]\":",
            },
            {
              t: "table",
              head: ["อ่านอักขระ", "curr_num", "curr_str", "Stack ภายใน", "คำอธิบาย"],
              rows: [
                ["'3'", "3", "\"\"", "[]", "สะสมตัวเลขได้ 3"],
                ["'['", "0", "\"\"", "[(\"\", 3)]", "เซฟ (\"\", 3) เข้า stack แล้วรีเซ็ต"],
                ["'a'", "0", "\"a\"", "[(\"\", 3)]", "สะสมข้อความ 'a'"],
                ["'2'", "2", "\"a\"", "[(\"\", 3)]", "สะสมตัวเลขได้ 2"],
                ["'['", "0", "\"\"", "[(\"\", 3), (\"a\", 2)]", "เซฟ (\"a\", 2) เข้า stack แล้วรีเซ็ต"],
                ["'c'", "0", "\"c\"", "[(\"\", 3), (\"a\", 2)]", "สะสมข้อความ 'c'"],
                ["']'", "0", "\"acc\"", "[(\"\", 3)]", "pop ('a', 2) → \"a\" + \"c\"*2 = \"acc\""],
                ["']'", "0", "\"accaccacc\"", "[]", "pop (\"\", 3) → \"\" + \"acc\"*3 = \"accaccacc\""],
              ],
            },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def decodeString(self, s: str) -> str:
        stack = []
        curr_str = ""
        curr_num = 0

        for ch in s:
            if ch.isdigit():
                # รองรับเลขหลายหลัก เช่น "100[a]"
                curr_num = curr_num * 10 + int(ch)
            elif ch == '[':
                # เซฟสตริงก่อนหน้า และจำนวนรอบ k เข้า stack
                stack.append((curr_str, curr_num))
                curr_str = ""
                curr_num = 0
            elif ch == ']':
                # จบวงเล็บ ดึงสตริงก่อนหน้าและ k ออกมาขยาย
                prev_str, repeat_k = stack.pop()
                curr_str = prev_str + (curr_str * repeat_k)
            else:
                # ตัวอักษรธรรมดา สะสมต่อท้าย
                curr_str += ch

        return curr_str`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "ทำไมต้องเขียนแบบนี้"],
              rows: [
                ["curr_num * 10 + int(ch)", "ถ้า input เป็นเลข 23 ตอนอ่าน '2' ได้ 2 พออ่าน '3' สูตรนี้จะได้ 2*10 + 3 = 23 ถูกต้อง"],
                ["stack.append((curr_str, curr_num))", "เก็บ tuple บันทึกว่าก่อนเข้าวงเล็บนี้ เรามีข้อความสะสมอะไรและต้องทำซ้ำกี่รอบ"],
                ["prev_str + (curr_str * repeat_k)", "เอาข้อความในวงเล็บที่ขยายเสร็จแล้ว ไปต่อท้ายข้อความที่เซฟไว้ก่อนหน้า"],
              ],
            },

            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "• **เวลา (Time Complexity)**: O(ความยาวของสตริงผลลัพธ์) — เราวนลูปอ่าน input ทุกตัว และสร้างสตริงผลลัพธ์ตามจำนวนครั้งที่ต้องทำซ้ำตามโจทย์\n\n• **พื้นที่ (Space Complexity)**: O(ความลึกของวงเล็บ + ขนาดสตริงผลลัพธ์) — Stack จะเก็บข้อมูลตามจำนวนชั้นของวงเล็บที่ซ้อนกัน",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "Given an encoded string, return its decoded string.\n\nThe encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.",
        },
        {
          t: "example",
          c: [
            {
              input: 's = "3[a]2[bc]"',
              output: '"aaabcbc"',
            },
            {
              input: 's = "3[a2[c]]"',
              output: '"accaccacc"',
            },
            {
              input: 's = "2[abc]3[cd]ef"',
              output: '"abcabccdcdcdef"',
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= s.length <= 30",
            "s consists of lowercase English letters, digits, and square brackets '[]'.",
            "s is guaranteed to be a valid input.",
            "All the integers in s are in the range [1, 300].",
          ],
        },
      ],
    },
  },
};
