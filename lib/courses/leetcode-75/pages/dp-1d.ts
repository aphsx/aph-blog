import type { Page } from "@/lib/types";

export const dp1dPages: Record<string, Page> = {
  "lc75-intro-dp-1d": {
    slug: "lc75-intro-dp-1d",
    title: {
      th: "Dynamic Programming 1 มิติ — พื้นฐาน & แนวคิด",
      en: "1D Dynamic Programming — Fundamentals & Mental Models",
    },
    lead: {
      th: "แก้ปัญหาใหญ่ด้วยการต่อยอดคำตอบของปัญหาย่อยที่ซ้ำกัน (Overlapping Subproblems) แล้วจดจำไว้ใช้ซ้ำแทนที่จะคำนวณใหม่",
      en: "Solve complex optimization problems by breaking them into overlapping subproblems, storing prior results to avoid redundant calculations.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "Dynamic Programming (DP หรือ การโปรแกรมแบบพลวัต) เป็นหนึ่งในหัวข้อที่ผู้เริ่มฝึกมักรู้สึกกลัวที่สุด แต่แท้จริงแล้วแก่นของมันเรียบง่ายมาก: **'จำคำตอบเก่าไว้ เพื่อไม่ต้องคำนวณซ้ำอีก (Don\'t repeat yourself)'**",
        },
        {
          t: "h2",
          c: "ส่วนที่ 1 · ปัญหาคืออะไร: Overlapping Subproblems",
        },
        {
          t: "p",
          c: "ลองดูตัวอย่างคลาสสิก: ลำดับ Fibonacci ซึ่งนิยามว่า `fib(n) = fib(n-1) + fib(n-2)` โดยมีจุดเริ่มต้นคือ `fib(0) = 0` และ `fib(1) = 1` หากเราเขียนฟังก์ชันแบบ Recursion ตรงๆ ตามสูตร:",
        },
        {
          t: "image",
          src: "/leetcode-75/dp-1d.gif",
          alt: "DP 1D bottom-up: fill fib array from base cases",
          caption: "DP 1D bottom-up: เติมค่าจากฐาน (Base Cases) ขึ้นไปทีละขั้น โดยไม่ต้องคำนวณซ้ำ",
        },
        {
          t: "code",
          lang: "python",
          label: "Naive Recursion (ช้ามาก O(2^n))",
          c: `def fib(n):
    if n < 2:
        return n
    # แตกกิ่งซ้าย-ขวา ทำให้เกิดการคำนวณซ้ำมหาศาล!
    return fib(n - 1) + fib(n - 2)`,
        },
        {
          t: "p",
          c: "เมื่อแตก Recursion Tree ของ `fib(5)` ออกมา จะเห็นชัดเจนว่า `fib(3)` ถูกคำนวณ 2 ครั้ง, `fib(2)` ถูกคำนวณ 3 ครั้ง และยิ่ง n มีขนาดใหญ่ ปัญหาย่อยจะซ้อนทับกัน (Overlapping Subproblems) จนคอมพิวเตอร์ค้างและทำงานช้าเป็นระดับ Exponential $O(2^n)$",
        },
        {
          t: "h2",
          c: "ส่วนที่ 2 · สองสไตล์ในการแก้ปัญหา DP",
        },
        {
          t: "p",
          c: "มีสองแนวทางในการทำ DP ซึ่งให้คำตอบที่ถูกต้องและมีประสิทธิภาพสูงเหมือนกัน:",
        },
        {
          t: "h3",
          c: "1. Top-Down (Memoization) — คิดจากปัญหาใหญ่ แตกกิ่งลงมาแล้วจดบันทึก",
        },
        {
          t: "p",
          c: "ยังคงใช้ Recursion ตามธรรมชาติของปัญหา แต่พกสมุดโน้ต (`memo: dict` หรือ list) ไปด้วย ทุกครั้งที่กำลังจะคำนวณ ให้เปิดดูสมุดโน้ตก่อนเสมอว่าเคยคำนวณค่านั้นไว้แล้วหรือยัง:",
        },
        {
          t: "code",
          lang: "python",
          label: "Top-Down DP with Memoization",
          c: `def fib(n, memo={}):
    if n < 2:
        return n
    # ถ้าเคยคำนวณแล้ว คืนค่าจากสมุดโน้ตทันที O(1)
    if n in memo:
        return memo[n]
    
    # คำนวณครั้งแรก แล้วจดลงสมุดโน้ตไว้
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]`,
        },
        {
          t: "h3",
          c: "2. Bottom-Up (Tabulation) — คิดจากฐานเล็ก ไต่ระดับขึ้นไปหาคำตอบใหญ่",
        },
        {
          t: "p",
          c: "ไม่ใช้ Recursion เลย แต่สร้างตาราง (`dp = [...]`) แล้วเริ่มต้นจาก Base Cases (`dp[0]`, `dp[1]`) จากนั้นใช้ลูป `for` ไต่ระดับคำนวณคำตอบที่ใหญ่ขึ้นไปเรื่อยๆ จนถึงเป้าหมาย:",
        },
        {
          t: "code",
          lang: "python",
          label: "Bottom-Up DP with Tabulation",
          c: `def fib(n):
    if n < 2:
        return n
    dp = [0] * (n + 1)
    dp[0], dp[1] = 0, 1
    
    # วิ่งลูปเติมตารางจากหน้าไปหลัง
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]`,
        },
        {
          t: "h2",
          c: "ส่วนที่ 3 · กฎเหล็ก 2 ข้อที่ต้องตอบให้ได้ก่อนเขียนโค้ด DP",
        },
        {
          t: "callout",
          title: "State & Transition — เสาหลักของ DP",
          c: "1. **State (สถานะ):** `dp[i]` หมายถึงอะไรอย่างแม่นยำ? (เช่น `dp[i]` คือจำนวนเงินสูงสุดที่ขโมยได้เมื่อพิจารณาถึงบ้านหลังที่ `i`)\n2. **Transition (สูตรการเปลี่ยนสถานะ):** `dp[i]` คำนวณมาจากสถานะก่อนหน้าอย่างไร? (เช่น `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`)",
        },
        {
          t: "p",
          c: "นอกจากนี้ หาก `dp[i]` พึ่งพาข้อมูลย้อนหลังเพียงไม่กี่ช่อง (เช่น 1-3 ช่องก่อนหน้า) เราสามารถยุบตาราง Array จาก Space $O(n)$ ให้เหลือตัวแปรเพียงไม่กี่ตัวเพื่อประหยัด Memory เหลือ Space $O(1)$ ได้ทันที!",
        },
      ],
      en: [
        {
          t: "p",
          c: "Dynamic Programming (DP) is often considered one of the most intimidating topics for beginners. However, its core principle is remarkably simple: **'Store previously solved subproblems so you never calculate them twice.'**",
        },
        {
          t: "h2",
          c: "Part 1 · The Core Challenge: Overlapping Subproblems",
        },
        {
          t: "p",
          c: "Consider the classic Fibonacci sequence: `fib(n) = fib(n-1) + fib(n-2)` with base cases `fib(0) = 0` and `fib(1) = 1`. A naive recursive solution splits each branch into two sub-branches, resulting in exponential $O(2^n)$ redundant computations.",
        },
        {
          t: "h2",
          c: "Part 2 · The Two Main Approaches: Top-Down vs Bottom-Up",
        },
        {
          t: "p",
          c: "1. **Top-Down (Memoization):** Maintain recursive flow but attach a cache (dictionary or array) to remember solved states.\n2. **Bottom-Up (Tabulation):** Start with known base cases in an array and iterate forward, iteratively building solutions to larger subproblems.",
        },
        {
          t: "h2",
          c: "Part 3 · The Two Fundamental Questions for Any DP Problem",
        },
        {
          t: "callout",
          title: "State & Transition",
          c: "1. **State:** Precisely what does `dp[i]` represent?\n2. **Transition:** How does `dp[i]` derive from earlier states (`dp[i-1]`, `dp[i-2]`, etc.)?",
        },
      ],
    },
  },

  "lc75-p59": {
    slug: "lc75-p59",
    title: {
      th: "ข้อ 59 · LC1137 N-th Tribonacci Number (เลข Tribonacci ตัวที่ n) 🟢",
      en: "Problem 59 · LC1137 N-th Tribonacci Number 🟢",
    },
    lead: {
      th: "เหมือน Fibonacci แต่รวมสามตัวก่อนหน้า ฝึกยุบ DP table ให้เหลือตัวแปร 3 ตัว ประหยัด Space เป็น O(1)",
      en: "Similar to Fibonacci but each number is the sum of the preceding three. Learn state rotation for O(1) space.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 1137: N-th Tribonacci Number**\n\nลำดับ Tribonacci $T_n$ ถูกนิยามไว้ดังนี้:\n- $T_0 = 0$\n- $T_1 = 1$\n- $T_2 = 1$\n- $T_{n+3} = T_n + T_{n+1} + T_{n+2}$ สำหรับ $n \ge 0$\n\nเมื่อกำหนดจำนวนเต็ม `n` มาให้ จงหาและคืนค่าของ $T_n$",
        },
        {
          t: "example",
          c: [
            {
              input: "n = 4",
              output: "4",
              explain: "T_3 = 0 + 1 + 1 = 2, T_4 = 1 + 1 + 2 = 4",
            },
            {
              input: "n = 25",
              output: "1389537",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "0 <= n <= 37",
            "โจทย์รับประกันว่า คำตอบจะอยู่ในช่วงของ 32-bit signed integer (ไม่เกิน 2^31 - 1)",
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
              c: "โจทย์ให้หาค่า Tribonacci ตัวที่ $n$ ซึ่งคล้ายกับ Fibonacci ทุกประการ ต่างกันตรงที่ Fibonacci เกิดจาก '2 ตัวก่อนหน้ารวมกัน' ส่วน Tribonacci เกิดจาก **'3 ตัวก่อนหน้ารวมกัน'**:\n- $T_0 = 0$\n- $T_1 = 1$\n- $T_2 = 1$\n- $T_3 = T_2 + T_1 + T_0 = 1 + 1 + 0 = 2$\n- $T_4 = T_3 + T_2 + T_1 = 2 + 1 + 1 = 4$\n- $T_5 = T_4 + T_3 + T_2 = 4 + 2 + 1 = 7$",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ",
            },
            {
              t: "p",
              c: "ลองคิดด้วยกระดาษทด: ถ้าโจทย์ถาม $n = 4$\n1. เริ่มต้นเรามี 3 ตัวแรก: `a = 0` ($T_0$), `b = 1` ($T_1$), `c = 1` ($T_2$)\n2. หา $T_3$: นำ $a + b + c = 0 + 1 + 1 = 2$ เลื่อนหน้าต่าง: `a` กลายเป็น 1, `b` กลายเป็น 1, `c` กลายเป็น 2\n3. หา $T_4$: นำ $a + b + c = 1 + 1 + 2 = 4$ เลื่อนหน้าต่าง: `a` กลายเป็น 1, `b` กลายเป็น 2, `c` กลายเป็น 4\n4. จบที่ $n = 4$ ค่าปัจจุบันของ $c$ คือ 4 ซึ่งเป็นคำตอบที่ถูกต้อง!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ (State & Transition)",
            },
            {
              t: "p",
              c: "หากเขียนด้วย Bottom-up Tabulation ปกติ:\n- **State:** `dp[i]` คือค่า Tribonacci ตัวที่ $i$\n- **Base Cases:** `dp[0] = 0`, `dp[1] = 1`, `dp[2] = 1`\n- **Transition:** `dp[i] = dp[i-1] + dp[i-2] + dp[i-3]`\n\nแต่สังเกตว่าการคำนวณ `dp[i]` เรามองย้อนกลับไปเพียง 3 ตัวล่าสุดเท่านั้น ไม่จำเป็นต้องจอง Array ขนาดยาวถึง $n+1$ ให้เปลืองหน่วยความจำ เราใช้ตัวแปร 3 ตัวคือ `a, b, c` หมุนเวียนค่าไปเรื่อยๆ:",
            },
            {
              t: "code",
              lang: "python",
              label: "State Rotation Technique",
              c: `# ในแต่ละรอบ:
next_val = a + b + c
a, b, c = b, c, next_val`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "p",
              c: "ตารางแสดงการเลื่อนสถานะของตัวแปร $a, b, c$ เมื่อ $n = 5$:",
            },
            {
              t: "table",
              head: ["รอบ (i)", "a (T_{i-3})", "b (T_{i-2})", "c (T_{i-1})", "next_val = a+b+c", "ความหมาย"],
              rows: [
                ["เริ่มต้น", "0", "1", "1", "-", "ฐานเริ่มต้น T0, T1, T2"],
                ["i = 3", "0", "1", "1", "0 + 1 + 1 = 2", "คำนวณ T3 ได้ 2 → เลื่อน a=1, b=1, c=2"],
                ["i = 4", "1", "1", "2", "1 + 1 + 2 = 4", "คำนวณ T4 ได้ 4 → เลื่อน a=1, b=2, c=4"],
                ["i = 5", "1", "2", "4", "1 + 2 + 4 = 7", "คำนวณ T5 ได้ 7 → เลื่อน a=2, b=4, c=7"],
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
    def tribonacci(self, n: int) -> int:
        # ดักกรณีฐาน (Base cases)
        if n == 0:
            return 0
        if n <= 2:
            return 1
        
        # ตัวแปรแทน T0, T1, T2
        a, b, c = 0, 1, 1
        
        # วิ่งคำนวณตั้งแต่ T3 จนถึง Tn
        for _ in range(3, n + 1):
            # เลื่อนหน้าต่าง 3 ตัวไปข้างหน้าพร้อมกัน
            a, b, c = b, c, a + b + c
            
        return c`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["if n == 0: return 0", "กรณี n=0 คืน 0 ทันที ไม่ต้องคำนวณต่อ"],
                ["if n <= 2: return 1", "กรณี n=1 หรือ n=2 คืน 1 ตามนิยามโจทย์"],
                ["a, b, c = 0, 1, 1", "กำหนด 3 ค่าแรก T0, T1, T2"],
                ["for _ in range(3, n + 1):", "วนลูป n - 2 ครั้งเพื่อหาคำตอบถึงตัวที่ n"],
                ["a, b, c = b, c, a + b + c", "เทคนิค Tuple Unpacking ของ Python ทำให้สลับและอัปเดตค่าพร้อมกันได้โดยไม่ต้องมีตัวแปรชั่วคราว"],
                ["return c", "ตัวแปร c จะเก็บค่า Tn ตัวล่าสุด คืนเป็นคำตอบ"],
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
                ["Time (เวลา)", "O(n)", "วนลูปเพียงรอบเดียวจาก 3 ถึง n ทำงาน $n-2$ ครั้ง"],
                ["Space (หน่วยความจำ)", "O(1)", "ใช้ตัวแปรคงที่เพียง 3 ตัว (`a, b, c`) ไม่มีการจอง List หรือ Array"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 1137: N-th Tribonacci Number**\n\nThe Tribonacci sequence $T_n$ is defined as follows:\n- $T_0 = 0$\n- $T_1 = 1$\n- $T_2 = 1$\n- $T_{n+3} = T_n + T_{n+1} + T_{n+2}$ for $n \ge 0$\n\nGiven `n`, return the value of $T_n$.",
        },
        {
          t: "example",
          c: [
            {
              input: "n = 4",
              output: "4",
              explain: "T_3 = 0 + 1 + 1 = 2, T_4 = 1 + 1 + 2 = 4",
            },
            {
              input: "n = 25",
              output: "1389537",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "0 <= n <= 37",
            "The answer is guaranteed to fit within a 32-bit integer.",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · What is the Problem Asking?",
            },
            {
              t: "p",
              c: "Compute the $n$-th Tribonacci number where each number after $T_2$ is the sum of the preceding three numbers.",
            },
            {
              t: "h2",
              c: "Step 2 · Manual Walkthrough",
            },
            {
              t: "p",
              c: "Initialize `a = 0, b = 1, c = 1`. For each step up to $n$, compute the next value as `a + b + c`, then advance the window: `a, b, c = b, c, a + b + c`.",
            },
            {
              t: "h2",
              c: "Step 3 · Strategy (State & Transition)",
            },
            {
              t: "p",
              c: "Because $T_n$ only depends on the last three values, we can reduce space from $O(n)$ to $O(1)$ by maintaining just three variables instead of an entire DP table.",
            },
            {
              t: "h2",
              c: "Step 4 · Python Solution",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `class Solution:
    def tribonacci(self, n: int) -> int:
        if n == 0:
            return 0
        if n <= 2:
            return 1
        
        a, b, c = 0, 1, 1
        for _ in range(3, n + 1):
            a, b, c = b, c, a + b + c
        return c`,
            },
            {
              t: "h2",
              c: "Step 5 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(n)$ with a single loop from 3 to $n$.\n- **Space Complexity:** $O(1)$ auxiliary memory using only three scalar variables.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p60": {
    slug: "lc75-p60",
    title: {
      th: "ข้อ 60 · LC746 Min Cost Climbing Stairs (ขึ้นบันไดถูกสุด) 🟢",
      en: "Problem 60 · LC746 Min Cost Climbing Stairs 🟢",
    },
    lead: {
      th: "เลือกก้าว 1 หรือ 2 ขั้นให้พ้นบันไดโดยจ่ายค่าผ่านทางรวมน้อยที่สุด ด้วย DP สไตล์ Fibonacci",
      en: "Pay the minimum total cost to reach the top of the stairs by taking 1 or 2 steps at a time.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 746: Min Cost Climbing Stairs**\n\nกำหนดอาร์เรย์จำนวนเต็ม `cost` โดยที่ `cost[i]` คือค่าใช้จ่ายในการก้าวออกจากขั้นบันไดที่ `i`\nเมื่อจ่ายค่าใช้จ่ายของขั้นนั้นแล้ว คุณสามารถเลือกก้าวขึ้นไปได้ **1 ขั้น หรือ 2 ขั้น**\n\nคุณสามารถเลือกจุดเริ่มต้นได้ฟรีจาก **ขั้นที่ index 0 หรือ ขั้นที่ index 1**\n\nจงหาค่าใช้จ่ายที่น้อยที่สุด (Minimum Cost) เพื่อก้าวขึ้นไปให้ถึง **'ยอดบันได' (Top of the floor)** ซึ่งหมายถึงจุดที่พ้นขั้นบันไดสุดท้ายไปแล้ว (index ที่ `n = len(cost)`)",
        },
        {
          t: "example",
          c: [
            {
              input: "cost = [10, 15, 20]",
              output: "15",
              explain: "เริ่มต้นที่ขั้น index 1 (จ่าย 15) จากนั้นก้าว 2 ขั้น ข้ามพ้นยอดบันไดทันที รวมจ่าย 15 บาท",
            },
            {
              input: "cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]",
              output: "6",
              explain: "เริ่มที่ index 0 (จ่าย 1) → กระโดด 2 ขั้นไป index 2 (จ่าย 1) → กระโดด 2 ขั้นไป index 4 (จ่าย 1) → ก้าว 1 ขั้นไป index 5 หรือกระโดดหลบ 100 ทั้งหมด รวมจ่าย 6 บาท",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "2 <= cost.length <= 1000",
            "0 <= cost[i] <= 999",
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
              c: "โจทย์ให้หาทางขึ้นบันไดที่ประหยัดเงินที่สุด โดยมีเงื่อนไขสำคัญที่ต้องเข้าใจให้แจ่มแจ้ง:\n1. **ยอดบันไดอยู่ที่ไหน?** ถ้ามีขั้นบันได $n$ ขั้น (ดัชนี $0$ ถึง $n-1$) ยอดบันไดคือตำแหน่งที่พ้นขั้นสุดท้าย นั่นคือ **ดัชนี $n$** (ไม่ใช่ $n-1$)\n2. **จ่ายเงินเมื่อไหร่?** เราจ่ายเงินเมื่อ 'ก้าวออกจากขั้นนั้น'\n3. **เริ่มต้นที่ไหน?** สามารถไปยืนรอที่ขั้น $0$ หรือ ขั้น $1$ ได้ฟรีโดยยังไม่ต้องจ่ายเงิน",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ",
            },
            {
              t: "p",
              c: "ลองดูตัวอย่าง `cost = [10, 15, 20]` (มีความยาว $n = 3$ ยอดบันไดคือดัชนี 3):\n- ไปยืนที่ขั้น 0 (ต้นทุนมาถึง = 0)\n- ไปยืนที่ขั้น 1 (ต้นทุนมาถึง = 0)\n- ต้องการไปถึงขั้น 2: มาจากขั้น 0 (จ่าย $0 + 10 = 10$) หรือมาจากขั้น 1 (จ่าย $0 + 15 = 15$) → เลือกทางที่ถูกกว่าคือ $10$\n- ต้องการไปถึงยอดบันได (ขั้น 3):\n  - มาจากขั้น 1: จ่ายต้นทุนมาถึงขั้น 1 ($0$) + ค่าผ่านทางขั้น 1 ($15$) = $15$\n  - มาจากขั้น 2: จ่ายต้นทุนมาถึงขั้น 2 ($10$) + ค่าผ่านทางขั้น 2 ($20$) = $30$\n  - เลือกค่าน้อยสุด: $\min(15, 30) = 15$",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ (State & Transition)",
            },
            {
              t: "p",
              c: "นิยามสถานะและสูตร DP ดังนี้:\n- **State:** `dp[i]` = ค่าใช้จ่ายรวมน้อยที่สุดในการเดินทางมาถึงขั้นที่ $i$\n- **Base Cases:** `dp[0] = 0` และ `dp[1] = 0` (เริ่มต้นที่ขั้น 0 หรือ 1 ได้ฟรี)\n- **Transition:** ในการจะมาถึงขั้นที่ $i$ เราต้องกระโดดมาจากขั้น $i-1$ (จ่าย `cost[i-1]`) หรือกระโดดมาจากขั้น $i-2$ (จ่าย `cost[i-2]`):\n$$\text{dp}[i] = \min(\text{dp}[i-1] + \text{cost}[i-1],\; \text{dp}[i-2] + \text{cost}[i-2])$$\n- **เป้าหมาย:** หาค่า `dp[n]` เมื่อ $n = \text{len}(\text{cost})$\n\nเนื่องจาก `dp[i]` พึ่งพาแค่ 2 สถานะก่อนหน้า (`dp[i-1]` กับ `dp[i-2]`) เราสามารถใช้ตัวแปรเพียง 2 ตัว เช่น `prev1` กับ `prev2` หมุนเวียนค่าได้ ประหยัด Space เป็น $O(1)$",
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "table",
              head: ["ขั้นเป้าหมาย (i)", "มาจาก i-1", "มาจาก i-2", "dp[i] = min", "หมายเหตุ"],
              rows: [
                ["0", "-", "-", "0", "จุดเริ่มฟรี"],
                ["1", "-", "-", "0", "จุดเริ่มฟรี"],
                ["2", "dp[1] + cost[1] = 0+15 = 15", "dp[0] + cost[0] = 0+10 = 10", "10", "เลือกมาจากขั้น 0"],
                ["3 (ยอด)", "dp[2] + cost[2] = 10+20 = 30", "dp[1] + cost[1] = 0+15 = 15", "15", "เลือกมาจากขั้น 1 (คำตอบคือ 15)"],
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution (Space O(1))",
              c: `from typing import List

class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        # prev2 แทน dp[i-2], prev1 แทน dp[i-1]
        # เริ่มที่ขั้น 0 หรือ 1 ได้ฟรี
        prev2, prev1 = 0, 0
        
        # คำนวณต้นทุนการมาถึงแต่ละขั้น ตั้งแต่ขั้น 2 จนถึงขั้น n (ยอดบันได)
        for i in range(2, len(cost) + 1):
            curr = min(prev1 + cost[i - 1], prev2 + cost[i - 2])
            prev2, prev1 = prev1, curr
            
        return prev1`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["prev2, prev1 = 0, 0", "ตั้งค่า base case: ต้นทุนการมาถึงขั้น 0 และขั้น 1 มีค่าเป็น 0"],
                ["for i in range(2, len(cost) + 1):", "วนลูปคำนวณขั้นที่ 2 ไปจนถึงยอดบันไดที่ index n"],
                ["curr = min(prev1 + cost[i-1], prev2 + cost[i-2])", "เปรียบเทียบว่ากระโดดมาจากขั้น i-1 หรือ i-2 เสียเงินน้อยกว่ากัน"],
                ["prev2, prev1 = prev1, curr", "เลื่อนตัวแปรไปข้างหน้า 1 ตำแหน่งเพื่อเตรียมรอบถัดไป"],
                ["return prev1", "เมื่อจบการทำงาน prev1 คือต้นทุนที่น้อยที่สุดในการถึงยอดบันได"],
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
                ["Time (เวลา)", "O(n)", "วนลูปครั้งเดียวตั้งแต่ 2 ถึง n"],
                ["Space (หน่วยความจำ)", "O(1)", "ใช้ตัวแปรตัวเลขเพียง 3 ตัว (`prev2, prev1, curr`) ไม่เปลืองตาราง Array"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 746: Min Cost Climbing Stairs**\n\nYou are given an integer array `cost` where `cost[i]` is the cost of $i$-th step on a staircase. Once you pay the cost, you can either climb one or two steps.\n\nYou can either start from the step with index 0, or the step with index 1.\n\nReturn the minimum cost to reach the top of the floor (index `n = len(cost)`).",
        },
        {
          t: "example",
          c: [
            {
              input: "cost = [10, 15, 20]",
              output: "15",
              explain: "Start at index 1, pay 15, climb two steps to reach the top. Total cost = 15.",
            },
            {
              input: "cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]",
              output: "6",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "2 <= cost.length <= 1000",
            "0 <= cost[i] <= 999",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · Problem Understanding",
            },
            {
              t: "p",
              c: "The goal is to reach index $n$ with the minimum cumulative cost. Starting at index 0 or index 1 costs 0. From any step $i$, you pay `cost[i]` to step to $i+1$ or $i+2$.",
            },
            {
              t: "h2",
              c: "Step 2 · State & Recurrence Relation",
            },
            {
              t: "p",
              c: "- **State:** `dp[i]` = min cost to reach step $i$.\n- **Base cases:** `dp[0] = 0, dp[1] = 0`.\n- **Transition:** `dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])`.\n- Since `dp[i]` depends only on two previous terms, we can optimize space to $O(1)$ using two variables.",
            },
            {
              t: "h2",
              c: "Step 3 · Python Solution",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `from typing import List

class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        prev2, prev1 = 0, 0
        for i in range(2, len(cost) + 1):
            curr = min(prev1 + cost[i - 1], prev2 + cost[i - 2])
            prev2, prev1 = prev1, curr
        return prev1`,
            },
            {
              t: "h2",
              c: "Step 4 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(n)$ where $n$ is the number of stairs.\n- **Space Complexity:** $O(1)$ auxiliary storage.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p61": {
    slug: "lc75-p61",
    title: {
      th: "ข้อ 61 · LC198 House Robber (ขโมยบ้าน) 🟡",
      en: "Problem 61 · LC198 House Robber 🟡",
    },
    lead: {
      th: "เลือกขโมยบ้านให้ได้เงินมากที่สุดโดยห้ามขโมยสองหลังติดกัน ด้วย DP รูปแบบ Take / Skip",
      en: "Maximize stolen money along a street of houses under the constraint that adjacent houses cannot be robbed together.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 198: House Robber**\n\nคุณเป็นโจรขโมยมืออาชีพที่กำลังวางแผนปล้นบ้านเรียงรายริมถนน แต่ละหลังมีเงินสดเก็บอยู่ตามอาร์เรย์ `nums` โดย `nums[i]` คือจำนวนเงินในบ้านหลังที่ `i`\n\nข้อจำกัดเดียวที่มีคือ: **บ้านสองหลังที่ติดกัน (Adjacent) เชื่อมต่อด้วยระบบสัญญาณกันขโมย ถ้าคุณปล้นบ้านสองหลังที่ติดกันในคืนเดียวกัน สัญญาณเตือนภัยจะดังขึ้นทันที**\n\nจงหาจำนวนเงินสูงสุดที่คุณสามารถปล้นได้โดยที่สัญญาณกันขโมยไม่ดัง",
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [1, 2, 3, 1]",
              output: "4",
              explain: "ปล้นบ้านหลัง index 0 (ได้เงิน 1) และบ้านหลัง index 2 (ได้เงิน 3) รวม 1 + 3 = 4 บาท",
            },
            {
              input: "nums = [2, 7, 9, 3, 1]",
              output: "12",
              explain: "ปล้นบ้านหลัง index 0 (ได้ 2), index 2 (ได้ 9) และ index 4 (ได้ 1) รวม 2 + 9 + 1 = 12 บาท",
            },
            {
              input: "nums = [2, 1, 1, 2]",
              output: "4",
              explain: "ปล้นบ้านแรก (2) และบ้านสุดท้าย (2) โดยเว้น 2 หลังตรงกลาง ได้ 2 + 2 = 4 บาท",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= nums.length <= 100",
            "0 <= nums[i] <= 400",
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
              c: "เราต้องการเลือกหยิบตัวเลขใน `nums` ให้ได้ผลรวมมากที่สุด โดยมีเงื่อนไขเดียวคือ **ห้ามหยิบเลขจากตำแหน่งที่ติดกัน ($i$ กับ $i-1$) พร้อมกัน**\n\nหลายคนมักเข้าใจผิดว่า 'งั้นก็แค่สลับหยิบคี่กับคู่สิ?' ไม่ใช่เสมอไป! ดูตัวอย่าง `[2, 1, 1, 2]` หากสลับตำแหน่งจะได้แค่ $2+1 = 3$ แต่คำตอบที่ดีที่สุดคือหยิบบ้านแรกกับบ้านสุดท้าย $2+2 = 4$ ซึ่งเว้นวรรคตรงกลางถึง 2 หลัง! ดังนั้นเราจึงต้องใช้ DP ในการตัดสินใจอย่างเป็นระบบ",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ (การตัดสินใจ 2 ทางเลือก)",
            },
            {
              t: "p",
              c: "เมื่อเดินมาถึงบ้านหลังที่ $i$ เรามีทางเลือกเพียง 2 ทาง:\n1. **Skip (ไม่ปล้นหลังนี้):** เงินรวมสูงสุดจะเท่ากับเงินสูงสุดที่ทำได้ถึงบ้านก่อนหน้า (`dp[i-1]`)\n2. **Take (ปล้นหลังนี้):** เราจะได้เงินของบ้านหลังนี้ (`nums[i]`) บวกกับเงินสูงสุดที่ทำได้ก่อนหน้านี้ที่ไม่ติดกัน นั่นคือบ้านหลังที่ $i-2$ (`dp[i-2] + nums[i]`)\n\nเราย่อมเลือกทางที่ได้เงินเยอะกว่า นั่นคือ $\max(\text{Skip}, \text{Take})$",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ (State & Transition)",
            },
            {
              t: "p",
              c: "- **State:** `dp[i]` = เงินสูงสุดที่ปล้นได้เมื่อพิจารณาถึงบ้านหลังที่ $i$\n- **Transition Formula:**\n$$\text{dp}[i] = \max(\text{dp}[i-1],\; \text{dp}[i-2] + \text{nums}[i])$$\n- **การลดรูปเหลือ Space O(1):** สังเกตว่า `dp[i]` ต้องการรู้เพียง 2 ค่าก่อนหน้า คือ `dp[i-1]` และ `dp[i-2]` เท่านั้น เราสามารถแทนด้วยตัวแปรเพียง 2 ตัว เช่น `rob1` (ยอดถึง 2 หลังก่อน) และ `rob2` (ยอดถึง 1 หลังก่อน) แล้วอัปเดตไปเรื่อยๆ:",
            },
            {
              t: "code",
              lang: "python",
              label: "Space-Optimized Transition",
              c: `# rob1 = ยอดเงินสูงสุดถึงบ้าน i-2
# rob2 = ยอดเงินสูงสุดถึงบ้าน i-1
for money in nums:
    new_rob = max(rob2, rob1 + money)
    rob1 = rob2
    rob2 = new_rob`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "p",
              c: "จำลองการทำงานบน `nums = [2, 7, 9, 3, 1]`:",
            },
            {
              t: "table",
              head: ["บ้าน (money)", "ทางเลือก 1: Skip (rob2)", "ทางเลือก 2: Take (rob1 + money)", "new_rob = max", "rob1, rob2 หลังอัปเดต"],
              rows: [
                ["เริ่มต้น", "-", "-", "-", "rob1 = 0, rob2 = 0"],
                ["2", "0", "0 + 2 = 2", "max(0, 2) = 2", "rob1 = 0, rob2 = 2"],
                ["7", "2", "0 + 7 = 7", "max(2, 7) = 7", "rob1 = 2, rob2 = 7"],
                ["9", "7", "2 + 9 = 11", "max(7, 11) = 11", "rob1 = 7, rob2 = 11"],
                ["3", "11", "7 + 3 = 10", "max(11, 10) = 11", "rob1 = 11, rob2 = 11"],
                ["1", "11", "11 + 1 = 12", "max(11, 12) = 12", "rob1 = 11, rob2 = 12 (คำตอบ)"],
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
    def rob(self, nums: List[int]) -> int:
        # rob1 แทนเงินสูงสุดถึง 2 หลังก่อนหน้า
        # rob2 แทนเงินสูงสุดถึง 1 หลังก่อนหน้า
        rob1, rob2 = 0, 0
        
        for money in nums:
            # ทางเลือกระหว่าง: ไม่ปล้นหลังนี้ (rob2) กับ ปล้นหลังนี้ (rob1 + money)
            new_rob = max(rob2, rob1 + money)
            rob1 = rob2
            rob2 = new_rob
            
        return rob2`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["rob1, rob2 = 0, 0", "เริ่มต้นที่ 0 ทั้งคู่ ครอบคลุมกรณีบ้านหลังแรกได้อย่างลงตัว"],
                ["for money in nums:", "พิจารณาบ้านแต่ละหลังเรียงตามลำดับจากซ้ายไปขวา"],
                ["new_rob = max(rob2, rob1 + money)", "หัวใจของ DP: เปรียบเทียบระหว่างการข้ามบ้านหลังนี้ กับการปล้นบ้านหลังนี้บวกยอดจาก 2 หลังก่อน"],
                ["rob1 = rob2; rob2 = new_rob", "เลื่อนตำแหน่งหน้าต่าง 2 สถานะไปข้างหน้า"],
                ["return rob2", "เมื่อพิจารณาครบทุกหลัง rob2 จะเป็นจำนวนเงินสูงสุดที่เป็นไปได้"],
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
                ["Time (เวลา)", "O(n)", "วนลูปเพียง 1 รอบพิจารณาบ้านแต่ละหลังครั้งเดียว"],
                ["Space (หน่วยความจำ)", "O(1)", "ใช้ตัวแปรตัวเลขเพียง 2 ตัว (`rob1, rob2`) ไม่จอง Array เพิ่มเติม"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 198: House Robber**\n\nYou are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [1, 2, 3, 1]",
              output: "4",
              explain: "Rob house 1 (money = 1) and house 3 (money = 3). Total = 1 + 3 = 4.",
            },
            {
              input: "nums = [2, 7, 9, 3, 1]",
              output: "12",
              explain: "Rob house 1 (2), house 3 (9), and house 5 (1). Total = 2 + 9 + 1 = 12.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= nums.length <= 100",
            "0 <= nums[i] <= 400",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · Problem Understanding",
            },
            {
              t: "p",
              c: "At each house, we must make a binary decision: **Rob** this house (which forces us to skip the adjacent previous house and combine with the optimal result from two houses prior), or **Skip** this house (retaining the best loot up to the immediate predecessor).",
            },
            {
              t: "h2",
              c: "Step 2 · Recurrence Relation",
            },
            {
              t: "p",
              c: "$$\text{dp}[i] = \max(\text{dp}[i-1],\; \text{dp}[i-2] + \text{nums}[i])$$\nSince we only ever need the two most recent values, we maintain two variables `rob1` and `rob2` to achieve $O(1)$ space.",
            },
            {
              t: "h2",
              c: "Step 3 · Python Solution",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        rob1, rob2 = 0, 0
        for money in nums:
            new_rob = max(rob2, rob1 + money)
            rob1 = rob2
            rob2 = new_rob
        return rob2`,
            },
            {
              t: "h2",
              c: "Step 4 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(n)$ where $n$ is the number of houses.\n- **Space Complexity:** $O(1)$ using only two tracking pointers.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p62": {
    slug: "lc75-p62",
    title: {
      th: "ข้อ 62 · LC790 Domino and Tromino Tiling (ปูกระเบื้องโดมิโนและโทรมิโน) 🟡",
      en: "Problem 62 · LC790 Domino and Tromino Tiling 🟡",
    },
    lead: {
      th: "นับจำนวนวิธีปูกระดาน 2xn ด้วยแผ่นโดมิโนและโทรมิโนรูปตัว L ด้วยสูตรความสัมพันธ์ DP และการคำนวณ Modulo",
      en: "Count distinct ways to tile a 2 x n board using 2 x 1 dominos and 'L' shaped trominos under modulo 10^9 + 7.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 790: Domino and Tromino Tiling**\n\nคุณมีแผ่นกระเบื้อง 2 ชนิด:\n1. **Domino:** ขนาด 2 x 1 (หมุนเป็น 1 x 2 แนวนอนได้)\n2. **Tromino:** รูปตัว 'L' กินพื้นที่ 3 ช่อง (หมุนได้ 4 ทิศทาง)\n\nกำหนดจำนวนเต็ม `n` แทนขนาดของกระดาน **2 x n**\nจงหาจำนวนวิธีทั้งหมดในการปูกระดาน 2 x n ให้เต็มพอดีโดยไม่มีช่องว่างและไม่มีแผ่นกระเบื้องซ้อนทับกัน\n\nเนื่องจากคำตอบอาจมีขนาดใหญ่มาก ให้คืนคำตอบเป็นเศษจากการหารด้วย **10^9 + 7** (`1_000_000_007`)",
        },
        {
          t: "example",
          c: [
            {
              input: "n = 3",
              output: "5",
              explain: "มีทั้งหมด 5 วิธี: (1) โดมิโนแนวตั้ง 3 อัน (2) โดมิโนแนวตั้ง 1 อัน + แนวนอน 2 อัน (3) แนวนอน 2 อัน + แนวตั้ง 1 อัน (4) โทรมิโนคู่คว่ำหงายแบบแรก (5) โทรมิโนคู่คว่ำหงายแบบกลับด้าน",
            },
            {
              input: "n = 1",
              output: "1",
              explain: "วางโดมิโนแนวตั้ง 1 อันได้แบบเดียว",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= n <= 1000",
            "คำตอบต้องคืนค่าผลลัพธ์ modulo (10^9 + 7)",
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
              c: "เราต้องการปูกระดานขนาด $2 \times n$ ให้เต็มพอดี โดยชิ้นส่วนที่มีคือ:\n- โดมิโน 1 แผ่นแนวตั้ง ($2 \times 1$) หรือ แนวนอน 2 แผ่นขนานกัน ($2 \times 2$)\n- โทรมิโนรูปตัว L (พื้นที่ 3 ช่อง) ซึ่งหากวาง 1 อัน จะทำให้กระดานเกิด 'ขอบแหว่ง' (Jagged Edge) เสมอ และต้องมีโทรมิโนอีกอันมาประกบปิดรอยแหว่งในที่สุด\n\nคำถามคือมีกี่วิธีในการปูให้กระดานเต็มพอดี? นี่คือโจทย์ประเภท **Combinatorics & Counting DP**",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ (ค่า n เล็กๆ)",
            },
            {
              t: "p",
              c: "ลองไล่ดูค่า $n$ ที่น้อยๆ:\n- $n = 0$: กระดานว่างเปล่า นับเป็น 1 วิธี (ไม่ต้องวางอะไรเลย)\n- $n = 1$: วางโดมิโนแนวตั้งได้เพียง $1$ วิธี\n- $n = 2$: วางโดมิโนตั้ง 2 อัน หรือ วางแนวนอน 2 อัน = $2$ วิธี\n- $n = 3$: มี $5$ วิธี (ตามตัวอย่างที่ 1)\n- $n = 4$: มี $11$ วิธี",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ (การอนุมานสูตร Transition)",
            },
            {
              t: "p",
              c: "หากวิเคราะห์เชิงลึก:\nให้ $dp[i]$ คือจำนวนวิธีปูกระดานเต็มขนาด $2 \times i$\nและ $p[i]$ คือจำนวนวิธีปูกระดานขนาด $2 \times i$ ที่มีติ่งยื่นเกินมา 1 ช่อง\n\nเมื่อจับสมการคณิตศาสตร์มารวมและหักลบกัน จะได้สูตรความสัมพันธ์ลดรูปที่สวยงามและเรียบง่ายอย่างยิ่ง:\n$$\text{dp}[i] = 2 \times \text{dp}[i-1] + \text{dp}[i-3]$$\n\nความหมายเชิงกายภาพของสูตรนี้:\n- $2 \times \text{dp}[i-1]$: มาจากการต่อท้ายด้วยโดมิโนแนวตั้ง 1 ชิ้น หรือขยายจากการปูแบบมีติ่งยื่น\n- $\text{dp}[i-3]$: มาจากการปิดรูปแบบสมบูรณ์ของแผ่นโทรมิโนที่ประกบกันข้ามความกว้าง 3 ช่อง",
            },
            {
              t: "callout",
              title: "กฎเหล็กเรื่อง Modulo",
              warn: true,
              c: "ต้องทำ `% (10**9 + 7)` ในทุกๆ ขั้นตอนของการบวกหรือคูณ ห้ามรอไปทำที่คำตอบสุดท้ายเพียงครั้งเดียว เพราะตัวเลขจะขยายขนาดมหาศาลจนทำให้โปรแกรมทำงานช้าลง!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "table",
              head: ["i", "สูตร: dp[i] = (2 * dp[i-1] + dp[i-3]) % MOD", "ผลลัพธ์ dp[i]"],
              rows: [
                ["0", "Base Case (กระดานว่าง)", "1"],
                ["1", "Base Case", "1"],
                ["2", "Base Case", "2"],
                ["3", "(2 * dp[2] + dp[0]) = 2*2 + 1", "5"],
                ["4", "(2 * dp[3] + dp[1]) = 2*5 + 1", "11"],
                ["5", "(2 * dp[4] + dp[2]) = 2*11 + 2", "24"],
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
    def numTilings(self, n: int) -> int:
        MOD = 1_000_000_007
        
        # กรณี n เล็กๆ ตอบได้ทันที
        if n <= 2:
            return n
            
        # dp[i] คือจำนวนวิธีปูกระดาน 2 x i
        dp = [0] * (n + 1)
        dp[0] = 1
        dp[1] = 1
        dp[2] = 2
        
        # วิ่งลูปตามสูตรความสัมพันธ์ dp[i] = 2*dp[i-1] + dp[i-3]
        for i in range(3, n + 1):
            dp[i] = (2 * dp[i - 1] + dp[i - 3]) % MOD
            
        return dp[n]`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["MOD = 1_000_000_007", "ค่าคงที่โมดูโลที่โจทย์กำหนด ป้องกัน integer overflow"],
                ["if n <= 2: return n", "สำหรับ n=1 คืน 1 และ n=2 คืน 2 รวดเร็วและกระชับ"],
                ["dp[0], dp[1], dp[2] = 1, 1, 2", "กำหนด Base Cases เริ่มต้นทั้ง 3 ตัว เพราะสูตรต้องใช้ dp[i-3]"],
                ["for i in range(3, n + 1):", "วนลูปคำนวณตั้งแต่ขนาด 3 จนถึง n"],
                ["dp[i] = (2 * dp[i - 1] + dp[i - 3]) % MOD", "คำนวณและ mod ผลลัพธ์ทันทีในแต่ละขั้น"],
                ["return dp[n]", "คืนจำนวนวิธีปูกระดานขนาด 2 x n"],
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
                ["Time (เวลา)", "O(n)", "วนลูปคำนวณเพียงรอบเดียวตั้งแต่ 3 ถึง n"],
                ["Space (หน่วยความจำ)", "O(n)", "ใช้ Array ขนาด $n+1$ เพื่อเก็บผลลัพธ์ (สามารถลดรูปเหลือ O(1) ได้โดยเก็บ 4 ตัวแปร)"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 790: Domino and Tromino Tiling**\n\nYou have two types of tiles: a $2 \times 1$ domino shape and a tromino shape (an 'L' shape consisting of three $1 \times 1$ squares). You may rotate these shapes.\n\nGiven an integer `n`, return the number of ways to tile a $2 \times n$ board. Since the answer may be very large, return it **modulo $10^9 + 7$**.",
        },
        {
          t: "example",
          c: [
            {
              input: "n = 3",
              output: "5",
            },
            {
              input: "n = 1",
              output: "1",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= n <= 1000",
            "Modulo 10^9 + 7",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · Mathematical Derivation of Transition",
            },
            {
              t: "p",
              c: "By analyzing the transitions between a fully covered board and a board with a protruding square, the recurrence relation simplifies to:\n$$\text{dp}[n] = (2 \times \text{dp}[n-1] + \text{dp}[n-3]) \pmod{10^9 + 7}$$\nBase cases:\n- $\text{dp}[0] = 1$\n- $\text{dp}[1] = 1$\n- $\text{dp}[2] = 2$",
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
    def numTilings(self, n: int) -> int:
        MOD = 1_000_000_007
        if n <= 2:
            return n
        dp = [0] * (n + 1)
        dp[0], dp[1], dp[2] = 1, 1, 2
        for i in range(3, n + 1):
            dp[i] = (2 * dp[i - 1] + dp[i - 3]) % MOD
        return dp[n]`,
            },
            {
              t: "h2",
              c: "Step 3 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(n)$ linear progression up to $n$.\n- **Space Complexity:** $O(n)$ array allocation (can be reduced to $O(1)$ by rotating 4 variables).",
            },
          ],
        },
      ],
    },
  },
};
