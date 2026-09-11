import type { Page } from "@/lib/types";

export const monotonicStackPages: Record<string, Page> = {
  "lc75-intro-monotonic-stack": {
    slug: "lc75-intro-monotonic-stack",
    title: {
      th: "Monotonic Stack — พื้นฐาน & แนวคิด",
      en: "Monotonic Stack — Fundamentals & Mental Models",
    },
    lead: {
      th: "สแตกที่สมาชิกคงลำดับเรียงตัว (เพิ่มขึ้นหรือลดลง) เสมอ เครื่องมือเด็ดในการแก้ปัญหา Next Greater / Smaller Element จาก O(n^2) เหลือ O(n)",
      en: "A stack that maintains elements in monotonically strictly increasing or decreasing order, turning O(n^2) next-element searches into O(n) linear time.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "Monotonic Stack (สแตกทางเดียว / สแตกคงลำดับ) คือโครงสร้างข้อมูล Stack ธรรมดา แต่มี **'กฎเหล็ก'** เพิ่มเข้ามาหนึ่งข้อ: **สมาชิกที่อยู่ใน Stack จะต้องเรียงลำดับจากน้อยไปมาก (Monotonically Increasing) หรือจากมากไปน้อย (Monotonically Decreasing) อยู่เสมอ**\n\nเทคนิคนี้คือคำตอบระดับเทพสำหรับโจทย์ยอดฮิต: **'หาตัวเลขถัดไปที่มากกว่า/น้อยกว่าตัวปัจจุบัน (Next Greater / Smaller Element)'** ซึ่งหากเขียนด้วย Nested Loop ปกติจะใช้เวลา $O(n^2)$ แต่ด้วย Monotonic Stack เราสามารถแก้ได้ในเวลาเพียง **$O(n)$ รอบเดียวจบ!**",
        },
        {
          t: "h2",
          c: "ส่วนที่ 1 · ภาพในหัว: แถวรอคอยและการเคลียร์คำตอบ",
        },
        {
          t: "p",
          c: "จินตนาการว่าคุณกำลังเดินสำรวจตัวเลขจากซ้ายไปขวา:\n- ตัวเลขไหนที่ **'ยังหาคำตอบไม่ได้'** (ยังไม่เจอตัวที่ใหญ่กว่าในอนาคต) จะถูกส่งเข้าไปยืนรออยู่ใน Stack\n- เมื่อเราเดินมาเจอตัวเลขใหม่ที่ **'ตัวใหญ่กว่า'** ตัวที่ยืนรอยอด Stack: แปลว่าตัวใหม่นี้คือคำตอบของตัวที่รอนั้นทันที! เราจึงดึงยอด Stack ออกมาบันทึกคำตอบ (Pop) แล้วทำซ้ำจนกว่ายอด Stack จะใหญ่กว่าตัวปัจจุบัน",
        },
        {
          t: "image",
          src: "/leetcode-75/monotonic-stack.gif",
          alt: "Monotonic stack: pop while top is smaller than current to find next greater",
          caption: "Monotonic Stack: เจอตัวใหญ่กว่า → pop ยอดที่รออยู่เพื่อบันทึกคำตอบ → จากนั้น push ตัวปัจจุบันเข้าไป",
        },
        {
          t: "h2",
          c: "ส่วนที่ 2 · ทำไม Nested While Loop ถึงยังคงเป็น O(n)?",
        },
        {
          t: "callout",
          title: "Amortized Analysis (การวิเคราะห์แบบเฉลี่ย)",
          c: "แม้เราจะเห็นลูป `while` ซ้อนอยู่ในลูป `for` แต่สังเกตว่า: **สมาชิกแต่ละตัวในอาร์เรย์จะถูกนำเข้า Stack (Push) ได้สูงสุดเพียง 1 ครั้ง และถูกดึงออกจาก Stack (Pop) ได้สูงสุดเพียง 1 ครั้งเท่านั้นตลอดทั้งโปรแกรม!**\n\nดังนั้น การทำงานรวมของทั้งโปรแกรมจึงมีจำนวนครั้งไม่เกิน $2n$ ครั้ง ซึ่งมี Time Complexity เป็น **$O(n)$** เชิงเส้นอย่างแท้จริง!",
        },
        {
          t: "h2",
          c: "ส่วนที่ 3 · กฎการเก็บ: เก็บค่า หรือ เก็บ Index?",
        },
        {
          t: "p",
          c: "ในโจทย์ 90% ของ Monotonic Stack **เรานิยมเก็บดัชนี (Index) ลงใน Stack แทนที่จะเก็บค่าตัวเลขตรงๆ** เพราะการรู้ Index ช่วยให้เรา:\n1. สามารถย้อนกลับไปอ่านค่าตัวเลขได้เสมอผ่าน `nums[idx]`\n2. สามารถคำนวณ 'ระยะห่าง' (เช่น ต้องรอกี่วัน หรือความกว้างเท่าใด) ได้ง่ายๆ ด้วย `current_index - idx`",
        },
      ],
      en: [
        {
          t: "p",
          c: "A Monotonic Stack is a standard stack with a strict invariant: elements are maintained in either monotonically increasing or decreasing order. It is the gold standard for solving **Next Greater Element** and **Previous Smaller Element** problems in linear $O(n)$ time instead of quadratic $O(n^2)$.",
        },
        {
          t: "h2",
          c: "Part 1 · Mental Model: The Waiting Queue",
        },
        {
          t: "p",
          c: "Elements that have not yet found their target match wait in the stack. When an arriving element breaks the monotonic invariant, it resolves the waiting elements, popping them sequentially to record their answers.",
        },
        {
          t: "h2",
          c: "Part 2 · Why is it O(n) despite nested loops?",
        },
        {
          t: "p",
          c: "Every element is pushed to the stack at most once and popped at most once across the entire traversal. Total operations across all elements are bounded by $2n$, yielding amortized $O(n)$ time complexity.",
        },
      ],
    },
  },

  "lc75-p74": {
    slug: "lc75-p74",
    title: {
      th: "ข้อ 74 · LC739 Daily Temperatures (อุณหภูมิรายวัน) 🟡",
      en: "Problem 74 · LC739 Daily Temperatures 🟡",
    },
    lead: {
      th: "คำนวณจำนวนวันที่ต้องรอจนกว่าจะเจอวันที่อุณหภูมิอุ่นขึ้น ด้วย Monotonic Decreasing Stack เก็บดัชนี",
      en: "Calculate how many days to wait for a warmer temperature for each day using a monotonic decreasing stack.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 739: Daily Temperatures**\n\nกำหนดอาร์เรย์จำนวนเต็ม `temperatures` แทนอุณหภูมิในแต่ละวันตามลำดับ\nจงคืนค่าเป็นอาร์เรย์ `answer` โดยที่ `answer[i]` คือ **จำนวนวันที่คุณต้องรอหลังจากวันที่ `i` จึงจะได้พบกับวันที่มีอุณหภูมิอุ่นกว่า (Warmer)**\n\nหากไม่มีวันใดในอนาคตที่อุณหภูมิสูงกว่าวันที่ `i` เลย ให้กำหนดให้ `answer[i] = 0`",
        },
        {
          t: "example",
          c: [
            {
              input: "temperatures = [73, 74, 75, 71, 69, 72, 76, 73]",
              output: "[1, 1, 4, 2, 1, 1, 0, 0]",
              explain: "วันที่ 0 (73) รอ 1 วันเจอ 74 (วันที่ 1)\nวันที่ 1 (74) รอ 1 วันเจอ 75 (วันที่ 2)\nวันที่ 2 (75) รอ 4 วันจึงเจอ 76 (วันที่ 6)\nวันที่ 6 (76) ไม่มีวันไหนอุ่นกว่าอีกแล้ว -> ตอบ 0",
            },
            {
              input: "temperatures = [30, 40, 50, 60]",
              output: "[1, 1, 1, 0]",
            },
            {
              input: "temperatures = [30, 60, 90]",
              output: "[1, 1, 0]",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= temperatures.length <= 10^5",
            "30 <= temperatures[i] <= 100",
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
              c: "สำหรับแต่ละวัน $i$ เราต้องการมองไปข้างหน้า (ทางขวา) เพื่อหา **วันแรกที่อุณหภูมิสูงกว่า $temperatures[i]$** แล้วตอบเป็น 'ระยะห่างของวัน' ($j - i$)\n\nหากมองด้วย Brute-force คือสองลูปซ้อน: วันละ $N$ รอบ วิ่งได้ถึง $N^2$ รอบ ซึ่งสำหรับ $N = 10^5$ จะใช้ $10^{10}$ การคำนวณและ Time Limit Exceeded (TLE) ทันที! เราจึงต้องใช้ Monotonic Stack",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · กลไก Monotonic Stack",
            },
            {
              t: "p",
              c: "เราจะเก็บ **ดัชนีของวัน (Index)** ไว้ใน Stack โดยรักษาคุณสมบัติให้อุณหภูมิของวันใน Stack เรียงลำดับจาก **'มากไปน้อย'** เสมอ:\n- เดินพิจารณาวันปัจจุบัน $i$ ที่มีอุณหภูมิ $temp$\n- หาก $temp$ ร้อนกว่าอุณหภูมิของวันที่อยู่บนยอด Stack (`temperatures[stack[-1]]`):\n  - แสดงว่า **วันปัจจุบัน $i$ คือคำตอบที่วันที่ยอด Stack รอคอยมานาน!**\n  - ดึงดัชนีวันก่อนหน้าออกมา: `prev_day = stack.pop()`\n  - บันทึกระยะเวลารอ: `answer[prev_day] = i - prev_day`\n  - ตรวจสอบซ้ำจนกว่ายอด Stack จะอุ่นกว่าวันปัจจุบัน หรือ Stack ว่างเปล่า\n- จากนั้น นำวันปัจจุบัน $i$ ใส่ลงใน Stack (`stack.append(i)`) เพื่อรอวันที่อุ่นกว่าในอนาคต",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ",
            },
            {
              t: "ol",
              c: [
                "สร้างอาร์เรย์คำตอบ `answer = [0] * n` (เริ่มต้นเป็น 0 ทุกช่องตามเงื่อนไขหากไม่เจอวันอุ่นกว่า)",
                "สร้าง Stack ว่างเปล่า `stack = []` สำหรับเก็บดัชนีวันที่ยังรอคำตอบ",
                "วนลูป `for i, temp in enumerate(temperatures):`",
                "ตราบใดที่ `stack` ไม่ว่าง และ `temp > temperatures[stack[-1]]:`\n  - `prev_day = stack.pop()`\n  - `answer[prev_day] = i - prev_day`",
                "ใส่ดัชนีวันปัจจุบัน `stack.append(i)`",
                "คืนค่า `answer`",
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "p",
              c: "จำลองบน `[73, 74, 75, 71, 69, 72, 76, 73]`:",
            },
            {
              t: "table",
              head: ["i (วัน)", "temp", "เปรียบเทียบกับยอด stack", "การ Pop & บันทึก answer", "stack หลัง Push"],
              rows: [
                ["0", "73", "Stack ว่าง", "-", "[0]"],
                ["1", "74", "74 > 73 (ยอดคือวัน 0)", "pop วัน 0 -> answer[0] = 1 - 0 = 1", "[1]"],
                ["2", "75", "75 > 74 (ยอดคือวัน 1)", "pop วัน 1 -> answer[1] = 2 - 1 = 1", "[2]"],
                ["3", "71", "71 < 75", "ไม่ pop (ยืนรอ)", "[2, 3]"],
                ["4", "69", "69 < 71", "ไม่ pop (ยืนรอ)", "[2, 3, 4]"],
                ["5", "72", "72 > 69 และ 72 > 71", "pop วัน 4 (answer[4]=1), pop วัน 3 (answer[3]=2)", "[2, 5]"],
                ["6", "76", "76 > 72 และ 76 > 75", "pop วัน 5 (answer[5]=1), pop วัน 2 (answer[2]=4)", "[6]"],
                ["7", "73", "73 < 76", "ไม่ pop (ยืนรอ)", "[6, 7]"],
              ],
            },
            {
              t: "p",
              c: "เมื่อจบการทำงาน วันที่ยังค้างใน Stack คือวัน 6 และ 7 ซึ่งไม่มีวันอุ่นกว่า ค่าใน `answer` จะยังคงเป็น 0 ตามที่ตั้งไว้ล่วงหน้า!",
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
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        # กำหนดค่าเริ่มต้นเป็น 0 สำหรับวันที่ไม่มีวันอุ่นกว่าในอนาคต
        answer = [0] * n
        # stack เก็บ index ของวันที่ยังรอวันอุ่นกว่า
        stack = []
        
        for i, temp in enumerate(temperatures):
            # ตราบใดที่วันปัจจุบันอุ่นกว่าวันที่อยู่บนยอด stack
            while stack and temp > temperatures[stack[-1]]:
                prev_day = stack.pop()
                answer[prev_day] = i - prev_day
            # ใส่วันปัจจุบันเข้าไปรอใน stack
            stack.append(i)
            
        return answer`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["answer = [0] * n", "จองอาร์เรย์ผลลัพธ์ขนาด n เริ่มต้นด้วย 0 ทุกช่อง"],
                ["stack = []", "สแตกเก็บ index โดยค่าอุณหภูมิในสแตกจะเรียงลดลงจากล่างขึ้นบน"],
                ["for i, temp in enumerate(temperatures):", "อ่านดัชนีวัน i และอุณหภูมิ temp ไปทีละวัน"],
                ["while stack and temp > temperatures[stack[-1]]:", "ตรวจสอบว่าวันปัจจุบันสามารถเคลียร์คำตอบให้ยอดสแตกได้หรือไม่"],
                ["prev_day = stack.pop(); answer[prev_day] = i - prev_day", "ดึงวันก่อนหน้าออก และคำนวณจำนวนวันที่ต้องรอ"],
                ["stack.append(i)", "เก็บวันปัจจุบันลงสแตกเพื่อรอวันที่อุ่นกว่า"],
                ["return answer", "คืนอาร์เรย์คำตอบ"],
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
                ["Time (เวลา)", "O(n)", "สมาชิกแต่ละตัวถูก Push เข้าและ Pop ออกจาก Stack สูงสุดไม่เกินอย่างละ 1 ครั้ง"],
                ["Space (หน่วยความจำ)", "O(n)", "ในกรณีแย่ที่สุด (อุณหภูมิลดลงทุกวัน) Stack จะเก็บดัชนีของทุกวัน $O(n)$"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 739: Daily Temperatures**\n\nGiven an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the $i$-th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.",
        },
        {
          t: "example",
          c: [
            {
              input: "temperatures = [73,74,75,71,69,72,76,73]",
              output: "[1,1,4,2,1,1,0,0]",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= temperatures.length <= 10^5",
            "30 <= temperatures[i] <= 100",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · Monotonic Decreasing Stack",
            },
            {
              t: "p",
              c: "Maintain a stack of day indices with strictly decreasing temperatures. When the current temperature exceeds the top index temperature, pop it and set `answer[prev_day] = i - prev_day`.",
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
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        answer = [0] * len(temperatures)
        stack = []
        for i, temp in enumerate(temperatures):
            while stack and temp > temperatures[stack[-1]]:
                prev_day = stack.pop()
                answer[prev_day] = i - prev_day
            stack.append(i)
        return answer`,
            },
            {
              t: "h2",
              c: "Step 3 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(n)$ linear traversal.\n- **Space Complexity:** $O(n)$ stack allocation.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p75": {
    slug: "lc75-p75",
    title: {
      th: "ข้อ 75 · LC901 Online Stock Span (ช่วงราคาหุ้นแบบต่อเนื่อง) 🟡",
      en: "Problem 75 · LC901 Online Stock Span 🟡",
    },
    lead: {
      th: "ออกแบบคลาส StockSpanner คำนวณ Span ของราคาหุ้นรายวัน ด้วย Monotonic Stack ที่ยุบรวมผลลัพธ์ (price, span)",
      en: "Design a data structure to compute online stock spans in amortized O(1) time using aggregated (price, span) pairs.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 901: Online Stock Span**\n\nจงออกแบบคลาส `StockSpanner` สำหรับรวบรวมราคาหุ้นรายวัน และคำนวณ **Span** ของราคาหุ้นในวันปัจจุบัน:\n\n**นิยามของ Span:** คือ **จำนวนวันติดต่อกันมากที่สุด (นับย้อนหลังจากวันนี้กลับไปในอดีต)** ที่ราคาหุ้นมีค่าน้อยกว่าหรือเท่ากับราคาของวันนี้\n(รวมตัวมันเองด้วยเสมอ ดังนั้น Span จะมีค่าอย่างน้อยเท่ากับ 1 เสมอ)\n\nจง Implement คลาส `StockSpanner`:\n- `StockSpanner()`: กำหนดค่าเริ่มต้นของระบบ\n- `int next(int price)`: รับราคาหุ้นของวันนี้เข้ามา และคืนค่า Span ของวันนี้",
        },
        {
          t: "example",
          c: [
            {
              input: 'stockSpanner = StockSpanner()\nstockSpanner.next(100) // return 1\nstockSpanner.next(80)  // return 1\nstockSpanner.next(60)  // return 1\nstockSpanner.next(70)  // return 2\nstockSpanner.next(60)  // return 1\nstockSpanner.next(75)  // return 4\nstockSpanner.next(85)  // return 6',
              output: "[null, 1, 1, 1, 2, 1, 4, 6]",
              explain: "วันราคา 70: ย้อนไปเจอ 60 (ไม่เกิน 70) รวม 2 วัน -> span = 2\nวันราคา 75: ย้อนไปเจอ [60, 70, 60] (ทั้งหมดไม่เกิน 75) รวม 4 วัน -> span = 4\nวันราคา 85: ย้อนไปเจอ [75, 60, 70, 60, 80] (ทั้งหมดไม่เกิน 85) รวม 6 วัน -> span = 6",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= price <= 10^5",
            "มีการเรียกใช้งานฟังก์ชัน next ได้สูงสุดไม่เกิน 10^4 ครั้ง",
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
              c: "ในแต่ละวันที่มีราคาหุ้นใหม่เข้ามา เราต้องนับว่ามีกี่วันติดต่อกันย้อนหลังที่ราคา $\le$ ราคาปัจจุบัน\n\nหากเราใช้วิธีเก็บราคาทุกวันลงใน List แล้วทุกครั้งที่เรียก `next()` เราเดินย้อนหลังนับทีละวัน ในกรณีแย่ที่สุด (เช่น ราคาหุ้นเพิ่มขึ้นเรื่อยๆ) จะใช้เวลา $O(N)$ ต่อการเรียกหนึ่งครั้ง และกลายเป็น $O(N^2)$ รวมทั้งระบบ ซึ่งทำงานช้าเกินไป",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · เคล็ดลับการยุบข้อมูล (Aggregation Trick)",
            },
            {
              t: "p",
              c: "แทนที่เราจะเก็บราคาทุกวันแยกกัน เราสามารถยุบข้อมูลเก็บเป็นคู่: **`(price, span)`** ลงใน Monotonic Decreasing Stack!\n\nตัวอย่างเช่น เมื่อราคา 75 เข้ามา:\n- ใน Stack มียอดเป็น `(60, 1)` และ `(70, 2)`\n- เนื่องจากทั้ง 60 และ 70 ต่างก็น้อยกว่าหรือเท่ากับ 75:\n  - เราสามารถ 'ฮุบ' วันทั้งหมดของ 60 เข้ามา (บวก 1)\n  - และ 'ฮุบ' วันทั้งหมดของ 70 เข้ามา (บวก 2)\n  - รวมกับวันนี้เอง (1) รวมเป็น $1 + 1 + 2 = 4$ วัน!\n- จากนั้น เราเก็บ `(75, 4)` ลงใน Stack เป็นก้อนเดียว วันในอนาคตที่ใหญ่กว่า 75 แค่ฮุบก้อน 4 วันนี้ไปในก้าวเดียว ไม่ต้องย้อนนับใหม่!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ",
            },
            {
              t: "ol",
              c: [
                "ใน `__init__`: สร้าง `self.stack = []` สำหรับเก็บคู่ `(price, span)`",
                "ใน `next(price)`:\n  - กำหนดค่าเริ่มต้น `span = 1` (นับวันนี้ด้วยเสมอ)\n  - ตราบใดที่ Stack ไม่ว่าง และราคายอด Stack $\le price$:\n    - Pop ก้อนนั้นออกมา: `prev_price, prev_span = self.stack.pop()`\n    - สะสมจำนวนวัน: `span += prev_span`\n  - บันทึกก้อนใหม่ลง Stack: `self.stack.append((price, span))`\n  - คืนค่า `span`",
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "table",
              head: ["ราคาที่ส่งเข้ามา", "Stack ก่อนหน้า", "การ Pop และสะสม Span", "Stack หลังอัปเดต", "Span ที่คืนค่า"],
              rows: [
                ["100", "[]", "-", "[(100, 1)]", "1"],
                ["80", "[(100, 1)]", "-", "[(100, 1), (80, 1)]", "1"],
                ["60", "[..., (80, 1)]", "-", "[..., (80, 1), (60, 1)]", "1"],
                ["70", "[..., (60, 1)]", "pop (60, 1) -> span = 1 + 1 = 2", "[..., (80, 1), (70, 2)]", "2"],
                ["60", "[..., (70, 2)]", "-", "[..., (70, 2), (60, 1)]", "1"],
                ["75", "[..., (70, 2), (60, 1)]", "pop (60, 1), pop (70, 2) -> span = 1 + 1 + 2 = 4", "[..., (80, 1), (75, 4)]", "4"],
                ["85", "[..., (80, 1), (75, 4)]", "pop (75, 4), pop (80, 1) -> span = 1 + 4 + 1 = 6", "[(100, 1), (85, 6)]", "6"],
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
              c: `class StockSpanner:
    def __init__(self):
        # stack เก็บคู่ (price, span) โดยเรียงราคาจากมากไปน้อยจากล่างขึ้นบน
        self.stack = []

    def next(self, price: int) -> int:
        span = 1  # นับวันปัจจุบันอย่างน้อย 1 วันเสมอ
        
        # ยุบรวมทุกวันก่อนหน้าที่ราคา <= ราคาปัจจุบัน
        while self.stack and self.stack[-1][0] <= price:
            prev_price, prev_span = self.stack.pop()
            span += prev_span
            
        # บันทึกสถานะที่ยุบรวมแล้วเข้า stack
        self.stack.append((price, span))
        
        return span`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["self.stack = []", "เก็บข้อมูลราคาและ span ในรูปแบบ Tuple `(price, span)`"],
                ["span = 1", "เริ่มต้นนับ 1 เสมอสำหรับวันปัจจุบัน"],
                ["while self.stack and self.stack[-1][0] <= price:", "ใช้เครื่องหมาย <= ตามเงื่อนไขโจทย์ที่รวมราคาที่เท่ากันด้วย"],
                ["span += prev_span", "หัวใจของความเร็ว: ฮุบผลรวม span ย้อนหลังทั้งหมดในคำสั่งเดียว"],
                ["self.stack.append((price, span))", "รักษาคุณสมบัติ Monotonic Decreasing ของสแตก"],
                ["return span", "คืนค่า Span ของราคาวันนี้"],
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
                ["Time (เวลา)", "O(1) Amortized", "แม้บางวันอาจมีการ Pop หลายครั้ง แต่ราคาแต่ละวันจะถูก Push และ Pop ไม่เกินอย่างละ 1 ครั้งตลอดอายุการใช้งาน เฉลี่ยจึงเป็น $O(1)$ ต่อการเรียก `next`"],
                ["Space (หน่วยความจำ)", "O(n)", "ในกรณีแย่ที่สุด (ราคาลดลงต่อเนื่องทุกวัน) Stack จะเก็บราคาครบทุกวัน $O(n)$"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 901: Online Stock Span**\n\nDesign an algorithm that collects daily price quotes for some stock and returns the span of that stock\'s price for the current day.\n\nThe span of the stock\'s price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.\n\nImplement the `StockSpanner` class:\n- `StockSpanner()` Initializes the object of the class.\n- `int next(int price)` Returns the span of the stock\'s price given that today\'s price is `price`.",
        },
        {
          t: "example",
          c: [
            {
              input: "next(100), next(80), next(60), next(70), next(60), next(75), next(85)",
              output: "[1, 1, 1, 2, 1, 4, 6]",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= price <= 10^5",
            "At most 10^4 calls will be made to next.",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · Monotonic Stack with Aggregated Spans",
            },
            {
              t: "p",
              c: "Store `(price, span)` pairs on a decreasing monotonic stack. When `price >= stack[-1][0]`, pop the top element and accumulate its span into current span. Push the consolidated `(price, span)` pair onto the stack.",
            },
            {
              t: "h2",
              c: "Step 2 · Python Solution",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `class StockSpanner:
    def __init__(self):
        self.stack = []

    def next(self, price: int) -> int:
        span = 1
        while self.stack and self.stack[-1][0] <= price:
            prev_price, prev_span = self.stack.pop()
            span += prev_span
        self.stack.append((price, span))
        return span`,
            },
            {
              t: "h2",
              c: "Step 3 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** Amortized $O(1)$ per `next` call.\n- **Space Complexity:** $O(n)$ space for stack storage.",
            },
          ],
        },
      ],
    },
  },
};
