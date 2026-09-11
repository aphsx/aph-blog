import type { Page } from "@/lib/types";

export const bitPages: Record<string, Page> = {
  "lc75-intro-bit": {
    slug: "lc75-intro-bit",
    title: {
      th: "Bit Manipulation — พื้นฐาน & แนวคิด",
      en: "Bit Manipulation — Fundamentals & Mental Models",
    },
    lead: {
      th: "มองตัวเลขเป็นชุดของ bits (0 และ 1) แล้วใช้ตัวดำเนินการบิต (Bitwise Operators) แก้ปัญหาได้อย่างรวดเร็วในระดับ Hardware และประหยัดหน่วยความจำ",
      en: "View numbers as bit sequences (0s and 1s) and harness hardware-level bitwise operators for high performance and O(1) space.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "Bit Manipulation (การจัดการระดับบิต) คือเทคนิคการมองจำนวนเต็ม (Integer) ให้ลึกลงไปถึงโครงสร้างระดับรากฐานของคอมพิวเตอร์ นั่นคือ **เลขฐานสอง (Binary: 0 และ 1)**\n\nหลายปัญหาที่ฟังดูซับซ้อนเมื่อคิดในระบบเลขฐานสิบ จะกลายเป็นเรื่องง่ายดายและทำงานเร็วระดับ Hardware Machine Code ทันทีเมื่อเปลี่ยนมาคิดในรูปแบบบิต",
        },
        {
          t: "h2",
          c: "ส่วนที่ 1 · 6 ตัวดำเนินการบิตพื้นฐาน (Bitwise Operators)",
        },
        {
          t: "table",
          head: ["Operator", "ชื่อเรียก", "กฎการทำงาน", "ตัวอย่างใน Python"],
          rows: [
            ["&", "AND", "เป็น 1 เฉพาะเมื่อทั้งสองฝั่งเป็น 1 ทั้งคู่", "0b1100 & 0b1010 = 0b1000 (8)"],
            ["|", "OR", "เป็น 1 หากมีฝั่งใดฝั่งหนึ่งเป็น 1", "0b1100 | 0b1010 = 0b1110 (14)"],
            ["^", "XOR", "เป็น 1 เมื่อทั้งสองฝั่ง 'มีค่าต่างกัน'", "0b1100 ^ 0b1010 = 0b0110 (6)"],
            ["~", "NOT", "กลับบิตทั้งหมด (0 เป็น 1, 1 เป็น 0)", "~5 = -6 (ในระบบ Two\'s Complement)"],
            ["<<", "Left Shift", "เลื่อนบิตไปทางซ้าย เติม 0 ที่ขวา (เทียบเท่าคูณ 2^k)", "5 << 1 = 10, 5 << 2 = 20"],
            [">>", "Right Shift", "เลื่อนบิตไปทางขวา ตัดบิตขวาทิ้ง (เทียบเท่าหาร 2^k ปัดลง)", "20 >> 1 = 10, 20 >> 2 = 5"],
          ],
        },
        {
          t: "h2",
          c: "ส่วนที่ 2 · 3 ทริคบิตระดับเทพที่ต้องจำให้ขึ้นใจ",
        },
        {
          t: "h3",
          c: "1. ตรวจสอบเลขคู่/เลขคี่ ด้วย `n & 1`",
        },
        {
          t: "p",
          c: "เนื่องจากบิตขวาสุด (Least Significant Bit) มีค่าประจำหลักเป็น $2^0 = 1$ ในขณะที่หลักอื่นเป็นเลขคู่ทั้งหมด ($2, 4, 8, ...$) ดังนั้นถ้า `n & 1 == 1` แปลว่าเป็นเลขคี่แน่นอน แต่ถ้าได้ `0` แปลว่าเป็นเลขคู่",
        },
        {
          t: "h3",
          c: "2. ลบบิต 1 ตัวขวาสุดออก ด้วย `n & (n - 1)` (Brian Kernighan\'s Algorithm)",
        },
        {
          t: "p",
          c: "การนำ `n` มาลบด้วย 1 จะทำให้บิต 1 ตัวขวาสุดถูกเปลี่ยนเป็น 0 และบิต 0 ที่อยู่ถัดไปทางขวากลายเป็น 1 ทั้งหมด เมื่อนำผลลัพธ์มา AND กับ `n` เดิม บิต 1 ตัวขวาสุดจะหายไปพอดี ใช้ในการนับบิต 1 ได้อย่างรวดเร็วมาก",
        },
        {
          t: "h3",
          c: "3. คุณสมบัติวิเศษของ XOR (`^`)",
        },
        {
          t: "callout",
          title: "กฎเหล็กของ XOR",
          c: "- $x \oplus x = 0$ (เลขเดียวกัน XOR กัน หักล้างเป็น 0 เสมอ)\n- $x \oplus 0 = x$ (เลขใดๆ XOR กับ 0 ได้ตัวเดิม)\n- สลับที่และเปลี่ยนกลุ่มได้: $a \oplus b \oplus a = (a \oplus a) \oplus b = 0 \oplus b = b$",
        },
      ],
      en: [
        {
          t: "p",
          c: "Bit manipulation involves operating directly on binary bits (0s and 1s) representing integers using bitwise operators. These instructions execute in a single CPU cycle.",
        },
        {
          t: "h2",
          c: "Part 1 · The 6 Core Bitwise Operators",
        },
        {
          t: "table",
          head: ["Operator", "Name", "Rule", "Example"],
          rows: [
            ["&", "AND", "1 if both bits are 1", "0b1100 & 0b1010 = 0b1000 (8)"],
            ["|", "OR", "1 if at least one bit is 1", "0b1100 | 0b1010 = 0b1110 (14)"],
            ["^", "XOR", "1 if bits are different", "0b1100 ^ 0b1010 = 0b0110 (6)"],
            ["~", "NOT", "Inverts all bits", "~5 = -6"],
            ["<<", "Left Shift", "Shift left, multiply by 2^k", "5 << 1 = 10"],
            [">>", "Right Shift", "Shift right, integer division by 2^k", "20 >> 1 = 10"],
          ],
        },
        {
          t: "h2",
          c: "Part 2 · Crucial Bit Tricks",
        },
        {
          t: "p",
          c: "1. `n & 1`: Check odd/even status.\n2. `n & (n - 1)`: Clears the lowest set bit (1).\n3. XOR properties: $x \oplus x = 0$ and $x \oplus 0 = x$.",
        },
      ],
    },
  },

  "lc75-p67": {
    slug: "lc75-p67",
    title: {
      th: "ข้อ 67 · LC338 Counting Bits (นับบิตหนึ่งของทุกเลข) 🟢",
      en: "Problem 67 · LC338 Counting Bits 🟢",
    },
    lead: {
      th: "หาจำนวนบิต 1 ของทุกตัวเลขตั้งแต่ 0 ถึง n ในรอบเดียว O(n) ด้วย DP ต่อยอดจากการเลื่อนบิต",
      en: "Count the number of 1-bits for each integer from 0 to n in O(n) linear time using bitwise DP.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 338: Counting Bits**\n\nกำหนดจำนวนเต็ม `n` มาให้\nจงคืนค่าเป็นอาร์เรย์ `ans` ที่มีความยาว $n + 1$ โดยที่ `ans[i]` คือ **จำนวนเลข 1 (Number of set bits)** ในการเขียนเลข $i$ เป็นเลขฐานสอง สำหรับทุกค่า $0 \le i \le n$\n\n**ข้อท้าทายพิเศษ:** จงเขียนให้อัลกอริทึมทำงานในเวลา $O(n)$ รอบเดียวจบ โดยไม่ใช้ฟังก์ชันนับบิตในตัว (เช่น `bin(i).count('1')`) ซ้ำๆ",
        },
        {
          t: "example",
          c: [
            {
              input: "n = 2",
              output: "[0, 1, 1]",
              explain: "0 = 0b0 (มี 0 บิต), 1 = 0b1 (มี 1 บิต), 2 = 0b10 (มี 1 บิต)",
            },
            {
              input: "n = 5",
              output: "[0, 1, 1, 2, 1, 2]",
              explain: "0: 0, 1: 1, 2: 1, 3: 0b11 (2 บิต), 4: 0b100 (1 บิต), 5: 0b101 (2 บิต)",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "0 <= n <= 10^5",
          ],
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "h2",
              c: "ขั้นที่ 1 · โจทย์นี้ขออะไร?",
            },
            {
              t: "p",
              c: "เราต้องการนับว่าเลข $0, 1, 2, ..., n$ แต่ละตัวมีเลข 1 กี่ตัวในฐานสอง\n\nหากเราใช้วิธีวนลูปนับบิตของแต่ละเลขตรงๆ $n$ ตัว แต่ละตัวมี $\approx 32$ บิต จะใช้เวลา $O(n \log n)$ หรือ $O(32n)$ แต่โจทย์ท้าทายให้ทำในเวลา $O(n)$ แบบแท้จริง ซึ่งหมายความว่าเราต้องคำนวณแต่ละตัวได้ในเวลาคงที่ $O(1)$!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · มองความสัมพันธ์แบบ DP บนเลขฐานสอง",
            },
            {
              t: "p",
              c: "สังเกตความสัมพันธ์ระหว่างตัวเลข $i$ กับเลขที่เกิดจากการเลื่อนบิตไปทางขวา 1 ตำแหน่ง (`i >> 1` ซึ่งก็คือ $\lfloor i / 2 \rfloor$):\n- เลข 5 คือ `0b101` (มี 1 สองตัว)\n- เลื่อนขวา 1 ครั้ง: `5 >> 1` คือ `0b10` ซึ่งก็คือเลข 2 (มี 1 หนึ่งตัว)\n\nเห็นได้ชัดว่า **`5` กับ `2` มีบิตเหมือนกันทุกประการ ยกเว้นแค่บิตขวาสุดของ 5 เท่านั้น!**\nดังนั้น:\n$$\text{จำนวนบิต 1 ของ } i = \text{จำนวนบิต 1 ของ } (i >> 1) + (i \& 1)$$",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ (State & Transition)",
            },
            {
              t: "p",
              c: "- **State:** `ans[i]` = จำนวนบิต 1 ของเลข $i$\n- **Base Case:** `ans[0] = 0`\n- **Transition Formula:**\n$$\text{ans}[i] = \text{ans}[i >> 1] + (i \& 1)$$\nเนื่องจาก $i >> 1 < i$ เสมอ ค่า `ans[i >> 1]` จึงถูกคำนวณและมีอยู่ในอาร์เรย์เรียบร้อยแล้ว เราแค่ดึงค่านั้นมาบวกกับบิตขวาสุด $(i \& 1)$ ได้ในเวลา $O(1)$ ทันที!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "table",
              head: ["i", "ฐานสอง", "i >> 1 (i//2)", "ans[i >> 1]", "i & 1 (บิตขวาสุด)", "ans[i] = ผลรวม"],
              rows: [
                ["0", "0b0", "-", "-", "-", "0 (Base Case)"],
                ["1", "0b1", "0", "0", "1", "0 + 1 = 1"],
                ["2", "0b10", "1", "1", "0", "1 + 0 = 1"],
                ["3", "0b11", "1", "1", "1", "1 + 1 = 2"],
                ["4", "0b100", "2", "1", "0", "1 + 0 = 1"],
                ["5", "0b101", "2", "1", "1", "1 + 1 = 2"],
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `from typing import List

class Solution:
    def countBits(self, n: int) -> List[int]:
        # สร้างอาร์เรย์ผลลัพธ์ขนาด n + 1 เริ่มต้นด้วย 0
        ans = [0] * (n + 1)
        
        # วิ่งคำนวณตั้งแต่ 1 ถึง n ในเวลา O(1) ต่อรอบ
        for i in range(1, n + 1):
            ans[i] = ans[i >> 1] + (i & 1)
            
        return ans`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["ans = [0] * (n + 1)", "จองอาร์เรย์ขนาด n+1 ช่อง เพื่อให้ดัชนีวิ่งตั้งแต่ 0 ถึง n ได้พอดี โดย ans[0] เป็น 0"],
                ["for i in range(1, n + 1):", "วนลูปจาก 1 ถึง n (คำนวณทีละตัวจากค่าน้อยไปค่ามาก)"],
                ["ans[i] = ans[i >> 1] + (i & 1)", "ต่อยอดจากคำตอบเดิมของ i//2 แล้วบวก 1 หาก i เป็นเลขคี่ (บิตขวาสุดเป็น 1)"],
                ["return ans", "คืนอาร์เรย์คำตอบที่มีข้อมูลครบทุกตัว"],
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 7 · ต้นทุน (Time & Space Complexity)",
            },
            {
              t: "table",
              head: ["มิติ", "ความซับซ้อน", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(n)", "วนลูปเพียงรอบเดียว แต่ละรอบทำงานแบบ Bitwise O(1) ไม่มีการวนซ้ำ"],
                ["Space (หน่วยความจำ)", "O(1)", "ไม่ใช้หน่วยความจำเสริมพิเศษ (ไม่นับอาร์เรย์คำตอบ `ans` ขนาด $n+1$ ที่โจทย์ต้องการ)"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 338: Counting Bits**\n\nGiven an integer `n`, return an array `ans` of length $n + 1$ such that for each $i$ ($0 \le i \le n$), `ans[i]` is the **number of 1\'s** in the binary representation of $i$.\n\nCan you do it in linear time $O(n)$ in a single pass without using built-in functions?",
        },
        {
          t: "example",
          c: [
            {
              input: "n = 2",
              output: "[0, 1, 1]",
            },
            {
              input: "n = 5",
              output: "[0, 1, 1, 2, 1, 2]",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "0 <= n <= 10^5",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · Bitwise Recurrence",
            },
            {
              t: "p",
              c: "Right-shifting an integer $i$ by 1 (`i >> 1`) discards its least significant bit. The number of set bits in $i$ is exactly equal to the number of set bits in `i >> 1` plus the discarded bit (`i & 1`):\n$$\text{ans}[i] = \text{ans}[i >> 1] + (i \& 1)$$",
            },
            {
              t: "h2",
              c: "Step 2 · Python Solution",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `from typing import List

class Solution:
    def countBits(self, n: int) -> List[int]:
        ans = [0] * (n + 1)
        for i in range(1, n + 1):
            ans[i] = ans[i >> 1] + (i & 1)
        return ans`,
            },
            {
              t: "h2",
              c: "Step 3 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(n)$ single linear pass.\n- **Space Complexity:** $O(1)$ auxiliary space excluding the returned array.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p68": {
    slug: "lc75-p68",
    title: {
      th: "ข้อ 68 · LC136 Single Number (ตัวเลขที่ไม่ซ้ำ) 🟢",
      en: "Problem 68 · LC136 Single Number 🟢",
    },
    lead: {
      th: "ค้นหาตัวเลขเพียงตัวเดียวที่ปรากฏครั้งเดียวในอาร์เรย์ ในเวลา O(n) และหน่วยความจำ O(1) ด้วยพลังของ XOR",
      en: "Find the single element appearing once when all others appear twice in linear O(n) time and O(1) space using XOR.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 136: Single Number**\n\nกำหนดอาร์เรย์จำนวนเต็ม `nums` ที่ไม่ว่างเปล่า โดยมีเงื่อนไขพิเศษว่า:\n- **สมาชิกทุกตัวปรากฏซ้ำกัน 2 ครั้ง**\n- **มีสมาชิกเพียงตัวเดียวเท่านั้นที่ปรากฏแค่ 1 ครั้ง**\n\nจงหาและคืนค่าของตัวเลขตัวเดียวนั้น\n\n**ข้อจำกัดที่เข้มงวด:** โค้ดของคุณต้องทำงานในเวลาเชิงเส้น $O(n)$ และใช้หน่วยความจำเสริมเพียง **$O(1)$** เท่านั้น (ห้ามใช้ Hash Table หรือ Set)",
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [2, 2, 1]",
              output: "1",
            },
            {
              input: "nums = [4, 1, 2, 1, 2]",
              output: "4",
            },
            {
              input: "nums = [1]",
              output: "1",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= nums.length <= 3 * 10^4",
            "-3 * 10^4 <= nums[i] <= 3 * 10^4",
            "ทุกตัวปรากฏ 2 ครั้ง ยกเว้นตัวเดียวที่ปรากฏ 1 ครั้ง",
          ],
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "h2",
              c: "ขั้นที่ 1 · โจทย์นี้ขออะไร?",
            },
            {
              t: "p",
              c: "หากไม่มีข้อจำกัดเรื่อง Memory เราสามารถใช้ `collections.Counter` หรือ Set เพื่อนับความถี่ได้ง่ายๆ แต่โจทย์สั่งชัดเจนว่า **ห้ามใช้ Memory เพิ่ม (Space O(1))**\n\nนี่คือสถานการณ์ในอุดมคติสำหรับตัวดำเนินการ **XOR (`^`)**!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · มนต์เสน่ห์ของ XOR Cancellation",
            },
            {
              t: "p",
              c: "เมื่อเรานำตัวเลขมา XOR กัน:\n1. ตัวเลขใดๆ XOR กับตัวเอง จะหักล้างกันกลายเป็น 0 เสมอ: $a \oplus a = 0$\n2. ตัวเลขใดๆ XOR กับ 0 จะได้ตัวมันเอง: $a \oplus 0 = a$\n3. ลำดับไม่มีผล (สลับที่และเปลี่ยนกลุ่มได้)\n\nหากในอาร์เรย์มีตัวเลขคู่กัน เช่น `[4, 1, 2, 1, 2]`:\n$$(1 \oplus 1) \oplus (2 \oplus 2) \oplus 4 = 0 \oplus 0 \oplus 4 = 4$$\nตัวเลขคู่ที่เหมือนกันจะ 'ฆ่ากันเอง' จนเป็น 0 ทั้งหมด เหลือรอดเพียงตัวเลขเดี่ยวตัวเดียวเท่านั้น!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ",
            },
            {
              t: "ol",
              c: [
                "กำหนดตัวแปรผลลัพธ์ `result = 0`",
                "วนลูปนำสมาชิกทุกตัว `num` ใน `nums` มาทำ `result ^= num`",
                "เมื่อจบลูป คืนค่า `result`",
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "table",
              head: ["รอบที่ (num)", "การคำนวณ", "ค่า result ปัจจุบัน"],
              rows: [
                ["เริ่มต้น", "result = 0", "0"],
                ["num = 4", "0 ^ 4", "4"],
                ["num = 1", "4 ^ 1", "5 (ในรูปบิต)"],
                ["num = 2", "5 ^ 2", "7"],
                ["num = 1", "7 ^ 1 (1 หักล้างกับ 1 ก่อนหน้า)", "6"],
                ["num = 2", "6 ^ 2 (2 หักล้างกับ 2 ก่อนหน้า)", "4 (เหลือเฉพาะเลข 4)"],
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `from typing import List

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        result = 0
        for num in nums:
            # ตัวเลขที่ซ้ำกันจะหักล้างเป็น 0
            result ^= num
        return result`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["result = 0", "ตัวแปรสะสมเริ่มต้นด้วย 0 เพราะ x ^ 0 = x เสมอ"],
                ["for num in nums:", "อ่านสมาชิกแต่ละตัวจากอาร์เรย์รอบเดียว"],
                ["result ^= num", "ดำเนินการ XOR สมาชิกทุกตัวเข้าด้วยกัน คู่เหมือนจะกลายเป็น 0"],
                ["return result", "คืนตัวเลขเดี่ยวที่เหลือรอด"],
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 7 · ต้นทุน (Time & Space Complexity)",
            },
            {
              t: "table",
              head: ["มิติ", "ความซับซ้อน", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(n)", "อ่านอาร์เรย์รอบเดียว $n$ ครั้ง ทำการ XOR ครั้งละ $O(1)$"],
                ["Space (หน่วยความจำ)", "O(1)", "ใช้ตัวแปรตัวเลขเพียงตัวเดียว (`result`) ผ่านเกณฑ์ข้อกำหนด"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 136: Single Number**\n\nGiven a **non-empty** array of integers `nums`, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.",
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [2, 2, 1]",
              output: "1",
            },
            {
              input: "nums = [4, 1, 2, 1, 2]",
              output: "4",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= nums.length <= 3 * 10^4",
            "Every element appears twice except for one.",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · XOR Cancellation",
            },
            {
              t: "p",
              c: "Because $x \oplus x = 0$ and $x \oplus 0 = x$, XORing all elements together cancels out every duplicate pair, leaving solely the unique number.",
            },
            {
              t: "h2",
              c: "Step 2 · Python Solution",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `from typing import List

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        result = 0
        for num in nums:
            result ^= num
        return result`,
            },
            {
              t: "h2",
              c: "Step 3 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(n)$ linear scan.\n- **Space Complexity:** $O(1)$ auxiliary memory.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p69": {
    slug: "lc75-p69",
    title: {
      th: "ข้อ 69 · LC1318 Minimum Flips to Make a OR b Equal to c (พลิกบิตน้อยที่สุด) 🟡",
      en: "Problem 69 · LC1318 Minimum Flips to Make a OR b Equal to c 🟡",
    },
    lead: {
      th: "หาจำนวนครั้งน้อยที่สุดในการพลิกบิตของ a และ b เพื่อให้ได้ผลลัพธ์ a OR b เท่ากับ c โดยการตรวจสอบทีละบิต",
      en: "Determine the minimum flips in a and b needed to make (a OR b) equal to c by inspecting bits individually.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 1318: Minimum Flips to Make a OR b Equal to c**\n\nกำหนดจำนวนเต็มบวก 3 จำนวนคือ `a`, `b` และ `c`\nจงหา **จำนวนครั้งที่น้อยที่สุดในการพลิกบิต (Minimum Flips)** ของ `a` และ `b` เพื่อให้ได้ผลลัพธ์ว่า:\n$$(a \mid b) == c$$\n\nการ 'พลิกบิต' 1 ครั้ง หมายถึงการเปลี่ยนบิตใดบิตหนึ่งจาก 0 เป็น 1 หรือจาก 1 เป็น 0",
        },
        {
          t: "example",
          c: [
            {
              input: "a = 2, b = 6, c = 5",
              output: "3",
              explain: "a = 0b010, b = 0b110, c = 0b101\nหลังพลิก 3 บิต: a = 0b001, b = 0b100 จะได้ a OR b = 0b101 (5)",
            },
            {
              input: "a = 4, b = 2, c = 7",
              output: "1",
            },
            {
              input: "a = 1, b = 2, c = 3",
              output: "0",
              explain: "1 OR 2 = 3 พอดี ไม่ต้องพลิกเลย",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= a, b, c <= 10^9",
          ],
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "h2",
              c: "ขั้นที่ 1 · โจทย์นี้ขออะไร?",
            },
            {
              t: "p",
              c: "เราต้องการให้บิตทุกตำแหน่งของ $(a \mid b)$ ตรงกับบิตของ $c$\nความจริงที่สำคัญที่สุดของโจทย์นี้คือ: **แต่ละตำแหน่งบิตทำงานแยกเป็นอิสระต่อกัน (Bitwise Independence)** การตัดสินใจพลิกบิตที่ตำแหน่งที่ 0 จะไม่มีผลกระทบใดๆ กับตำแหน่งที่ 1 เลย เราจึงสามารถตรวจสอบทีละบิตจากขวาไปซ้ายได้อย่างสบายใจ!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · กฎการตัดสินใจพลิกบิตทีละตำแหน่ง",
            },
            {
              t: "p",
              c: "ดึงบิตขวาสุดของแต่ละตัวออกมา: `bit_a = a & 1`, `bit_b = b & 1`, `bit_c = c & 1`\n\n- **กรณีที่ 1: `bit_c == 1` (เป้าหมายต้องการ 1):**\n  - ตามนิยามของ OR ขอเพียงแค่มีบิต 1 อย่างน้อยหนึ่งตัวก็เพียงพอแล้ว\n  - ถ้าทั้ง `bit_a == 0` และ `bit_b == 0`: เราต้องพลิกตัวใดตัวหนึ่งให้เป็น 1 → **ต้องพลิก 1 ครั้ง**\n  - ถ้ามี 1 อยู่แล้วตัวใดตัวหนึ่งหรือทั้งสองตัว: ไม่ต้องพลิกเลย → **พลิก 0 ครั้ง**\n\n- **กรณีที่ 2: `bit_c == 0` (เป้าหมายต้องการ 0):**\n  - ตามนิยามของ OR ทั้ง `bit_a` และ `bit_b` **ต้องเป็น 0 ทั้งคู่เท่านั้น!**\n  - ดังนั้น หากตัวไหนเป็น 1 ต้องถูกพลิกกลับเป็น 0 ทั้งหมด → **ต้องพลิก `bit_a + bit_b` ครั้ง** (ถ้าเป็น 1 ตัวเดียวพลิก 1 ครั้ง, ถ้าเป็น 1 ทั้งคู่ต้องพลิก 2 ครั้ง!)",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ",
            },
            {
              t: "ol",
              c: [
                "ตั้งตัวนับ `flips = 0`",
                "วนลูปตราบใดที่ `a > 0` หรือ `b > 0` หรือ `c > 0`",
                "ดึงบิตขวาสุดของทั้ง 3 ตัวด้วย `& 1`",
                "ตรวจสอบเงื่อนไขตามกฎในขั้นที่ 2 และบวกจำนวนครั้งเข้าสู่ `flips`",
                "เลื่อนบิตไปทางขวาด้วย `a >>= 1`, `b >>= 1`, `c >>= 1`",
                "คืนค่า `flips`",
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "p",
              c: "ตัวอย่าง $a = 2$ (`010`), $b = 6$ (`110`), $c = 5$ (`101`):",
            },
            {
              t: "table",
              head: ["ตำแหน่งบิต", "bit_a", "bit_b", "bit_c (เป้าหมาย)", "เงื่อนไขและการบวก", "flips รวม"],
              rows: [
                ["บิต 0 (ขวาสุด)", "0", "0", "1", "c=1 แต่ทั้งคู่เป็น 0 -> พลิก 1 ตัว (+1)", "1"],
                ["บิต 1", "1", "1", "0", "c=0 แต่ทั้งคู่เป็น 1 -> ต้องล้างเป็น 0 ทั้งคู่ (+2)", "1 + 2 = 3"],
                ["บิต 2", "0", "1", "1", "c=1 และ b เป็น 1 อยู่แล้ว -> ไม่ต้องพลิก (+0)", "3"],
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `class Solution:
    def minFlips(self, a: int, b: int, c: int) -> int:
        flips = 0
        
        # วนลูปจนกว่าตัวเลขทั้ง 3 จะถูกเลื่อนจนหมดบิต
        while a > 0 or b > 0 or c > 0:
            bit_a = a & 1
            bit_b = b & 1
            bit_c = c & 1
            
            if bit_c == 1:
                # ต้องการ 1: ถ้าเป็น 0 ทั้งคู่ ต้องพลิก 1 ตัว
                if bit_a == 0 and bit_b == 0:
                    flips += 1
            else:
                # ต้องการ 0: บิตที่เป็น 1 ทั้งหมดต้องถูกพลิกเป็น 0
                flips += bit_a + bit_b
                
            # เลื่อนไปดูบิตถัดไป
            a >>= 1
            b >>= 1
            c >>= 1
            
        return flips`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["while a > 0 or b > 0 or c > 0:", "วนลูปประมวลผลบิตทีละหลักจนกว่าจำนวนเต็มทั้งสามจะกลายเป็น 0"],
                ["bit_a = a & 1; bit_b = b & 1; bit_c = c & 1", "สกัดเอาเฉพาะบิตขวาสุดของแต่ละตัวแปร"],
                ["if bit_c == 1: if bit_a == 0 and bit_b == 0: flips += 1", "ถ้า c ต้องการ 1 แต่ไม่มีใครมี 1 เลย ต้องพลิก 1 ตัว"],
                ["else: flips += bit_a + bit_b", "ถ้า c ต้องการ 0 ตัวไหนมี 1 ต้องถูกพลิกทั้งหมด (บวก 1 หรือ 2 ครั้ง)"],
                ["a >>= 1; b >>= 1; c >>= 1", "เลื่อนบิตไปทางขวา 1 ตำแหน่งเพื่อเตรียมพิจารณาหลักถัดไป"],
                ["return flips", "คืนผลรวมจำนวนการพลิกบิตทั้งหมด"],
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 7 · ต้นทุน (Time & Space Complexity)",
            },
            {
              t: "table",
              head: ["มิติ", "ความซับซ้อน", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(1) / O(log max(a, b, c))", "เนื่องจาก $a, b, c \le 10^9$ ซึ่งมีไม่เกิน 30 บิต ลูปทำงานสูงสุดไม่เกิน 30 ครั้ง ถือเป็นเวลาคงที่ $O(1)$"],
                ["Space (หน่วยความจำ)", "O(1)", "ใช้ตัวแปรนับตัวเลขคงที่ ไม่ใช้พื้นที่เสริม"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 1318: Minimum Flips to Make a OR b Equal to c**\n\nGiven 3 positives numbers `a`, `b` and `c`. Return the minimum flips required in some bits of `a` and `b` to make $(a \mid b) == c$ (bitwise OR operation).\nFlip operation consists of change any single bit 1 to 0 or change the bit 0 to 1 in their binary representation.",
        },
        {
          t: "example",
          c: [
            {
              input: "a = 2, b = 6, c = 5",
              output: "3",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= a, b, c <= 10^9",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · Bit-by-bit Decision Logic",
            },
            {
              t: "p",
              c: "Examine the least significant bits of $a, b, c$ ($bit_a, bit_b, bit_c$):\n- If $bit_c == 1$: If both $bit_a == 0$ and $bit_b == 0$, flip 1 bit.\n- If $bit_c == 0$: Both must be 0, requiring $bit_a + bit_b$ flips.",
            },
            {
              t: "h2",
              c: "Step 2 · Python Solution",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `class Solution:
    def minFlips(self, a: int, b: int, c: int) -> int:
        flips = 0
        while a > 0 or b > 0 or c > 0:
            bit_a = a & 1
            bit_b = b & 1
            bit_c = c & 1
            if bit_c == 1:
                if bit_a == 0 and bit_b == 0:
                    flips += 1
            else:
                flips += bit_a + bit_b
            a >>= 1
            b >>= 1
            c >>= 1
        return flips`,
            },
            {
              t: "h2",
              c: "Step 3 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(\log(\max(a, b, c))) \le O(32) \approx O(1)$.\n- **Space Complexity:** $O(1)$ constant space.",
            },
          ],
        },
      ],
    },
  },
};
