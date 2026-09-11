import type { Page } from "@/lib/types";

export const dpMultiPages: Record<string, Page> = {
  "lc75-intro-dp-multi": {
    slug: "lc75-intro-dp-multi",
    title: {
      th: "Dynamic Programming หลายมิติ — พื้นฐาน & แนวคิด",
      en: "Multi-Dimensional Dynamic Programming — Fundamentals & Core Patterns",
    },
    lead: {
      th: "ยกระดับ DP ขึ้นเป็น 2D table dp[i][j] สำหรับโจทย์ตาราง Grid, การเปรียบเทียบ 2 สตริง และ State Machine ที่มีสถานะทางเลือกซ้อนกัน",
      en: "Elevate DP to 2D tables dp[i][j] for grid navigation, two-string comparisons, and state-machine transitions.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "ในหมวด DP 1 มิติ สถานะของเราถูกระบุด้วยตัวแปรเดียว เช่น `dp[i]` (บ้านหลังที่ `i` หรือ ขั้นบันไดที่ `i`) แต่ในโลกแห่งความเป็นจริง ปัญหาจำนวนมากมีมิติการตัดสินใจซ้อนกัน เช่น:\n- เดินบนตารางเขาวงกต: แถวที่ $i$ และ คอลัมน์ที่ $j$\n- เปรียบเทียบข้อความ 2 สตริง: กำลังดูตัวอักษรที่ $i$ ของคำแรก กับตัวอักษรที่ $j$ ของคำที่สอง\n- ตลาดหุ้น: วันที่ $i$ โดยมีสถานะย่อยว่า 'ถือหุ้นอยู่' หรือ 'ถือเงินสด'",
        },
        {
          t: "h2",
          c: "ส่วนที่ 1 · ภาพในหัว: ตาราง 2 มิติ (2D Grid / Table)",
        },
        {
          t: "p",
          c: "หัวใจของ 2D DP คือการมองว่าแต่ละช่อง `dp[i][j]` เป็นจุดตัดของตัวแปร 2 มิติ และคำตอบของช่องนี้จะถูกส่งต่อมาจาก 'เพื่อนบ้านรอบตัว' เช่น ช่องบน, ช่องซ้าย หรือช่องทแยงมุม:",
        },
        {
          t: "image",
          src: "/leetcode-75/dp-2d.gif",
          alt: "DP 2D unique paths: fill grid cell from above + left",
          caption: "DP 2D (Unique Paths): ขอบ = 1 ทาง · ช่องด้านใน = รวมผลจากช่องบน + ช่องซ้าย",
        },
        {
          t: "h2",
          c: "ส่วนที่ 2 · แม่แบบสากล 3 ประเภทของ 2D DP",
        },
        {
          t: "h3",
          c: "1. ตาราง Grid (เช่น Unique Paths, Min Path Sum)",
        },
        {
          t: "p",
          c: "สถานะ `dp[i][j]` คือผลลัพธ์เมื่อเดินทางมาถึงพิกัด $(i, j)$ บนกระดาน โดยทั่วไปเดินได้เฉพาะ 'ลง' หรือ 'ขวา' ดังนั้นก้าวสุดท้ายก่อนถึง $(i, j)$ จะต้องมาจากช่องบน $(i-1, j)$ หรือช่องซ้าย $(i, j-1)$",
        },
        {
          t: "h3",
          c: "2. เปรียบเทียบ 2 สตริง (เช่น LCS, Edit Distance)",
        },
        {
          t: "p",
          c: "สถานะ `dp[i][j]` คือคำตอบเมื่อเทียบข้อความตัวแรก $i$ ตัวของ `word1` กับข้อความตัวแรก $j$ ตัวของ `word2`\n- หากตัวอักษรตรงกัน: รับผลประโยชน์และต่อยอดจากช่องทแยงมุม `dp[i-1][j-1]`\n- หากไม่ตรงกัน: เลือกว่าจะลบ, แทรก หรือแทนที่ ซึ่งแปลงเป็นการเลือกค่าที่ดีที่สุดจากเพื่อนบ้าน 3 ทิศ (บน, ซ้าย, ทแยง)",
        },
        {
          t: "h3",
          c: "3. State Machine DP (เช่น Best Time to Buy and Sell Stock)",
        },
        {
          t: "p",
          c: "มิติที่สองไม่ได้เป็นตัวเลขที่เพิ่มขึ้นเรื่อยๆ แต่เป็น 'สถานะทางเลือก' เช่น 0 = ถือเงินสด (Cash), 1 = ถือหุ้น (Hold) ซึ่งมักยุบเป็นตัวแปร 2 ตัวเพื่อประหยัด Memory เหลือ Space $O(1)$ ได้ทันที",
        },
        {
          t: "h2",
          c: "ส่วนที่ 3 · หลุมพรางที่ห้ามตกเด็ดขาดใน Python",
        },
        {
          t: "callout",
          title: "ห้ามสร้าง 2D List ด้วย [[0] * n] * m เด็ดขาด!",
          warn: true,
          c: "การเขียน `[[0] * n] * m` จะสร้างแถวที่เป็น Object อ้างอิงตัวเดียวกันในหน่วยความจำ หากคุณแก้ค่าใน `dp[0][1]` ทุกแถว `dp[1][1]`, `dp[2][1]` จะเปลี่ยนตามไปด้วยทั้งหมด!\n\n**วิธีที่ถูกต้อง 100%:**\n`dp = [[0] * n for _ in range(m)]`",
        },
      ],
      en: [
        {
          t: "p",
          c: "Multi-dimensional DP extends state definitions to two or more dimensions, commonly indexed as `dp[i][j]`. Typical scenarios include:\n1. **2D Grids:** Moving through a matrix where cell $(i, j)$ depends on adjacent cells.\n2. **Two Strings / Sequences:** Comparing prefixes of length $i$ and $j$ (e.g., LCS, Edit Distance).\n3. **State Machines:** Tracking discrete choices (e.g., holding stock vs holding cash).",
        },
        {
          t: "h2",
          c: "Part 1 · The Three Archetypes of 2D DP",
        },
        {
          t: "p",
          c: "- **Grid Traversal:** Transitions come from directly adjacent cells (top: `dp[i-1][j]`, left: `dp[i][j-1]`).\n- **Two-String Alignment:** Transitions depend on whether character $i$ matches character $j$, looking at diagonal (`dp[i-1][j-1]`), top, or left.\n- **State Machine DP:** Multi-dimensional state tracking where one dimension represents discrete operational modes.",
        },
        {
          t: "h2",
          c: "Part 2 · Python 2D List Initialization Gotcha",
        },
        {
          t: "callout",
          title: "Never use [[0] * n] * m",
          warn: true,
          c: "This creates shallow copies of the same inner list. Modifying one row mutates all rows! Always use list comprehensions: `[[0] * n for _ in range(m)]`.",
        },
      ],
    },
  },

  "lc75-p63": {
    slug: "lc75-p63",
    title: {
      th: "ข้อ 63 · LC62 Unique Paths (นับเส้นทางเดินบนกริด) 🟡",
      en: "Problem 63 · LC62 Unique Paths 🟡",
    },
    lead: {
      th: "นับจำนวนเส้นทางทั้งหมดที่หุ่นยนต์สามารถเดินจากมุมบนซ้ายไปถึงมุมล่างขวา โดยก้าวได้เฉพาะลงหรือขวา ด้วย 2D DP",
      en: "Count the number of unique paths from top-left to bottom-right in an m x n grid moving only down or right.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 62: Unique Paths**\n\nมีหุ่นยนต์ตัวหนึ่งอยู่ที่มุมบนซ้ายของตารางขนาด $m \times n$ (ตำแหน่งพิกัด `grid[0][0]`)\n\nหุ่นยนต์ตัวนี้ต้องการเดินไปให้ถึงมุมล่างขวาของตาราง (ตำแหน่งพิกัด `grid[m-1][n-1]`)\nในแต่ละก้าว หุ่นยนต์สามารถเลือกเดินได้เพียง **2 ทิศทางเท่านั้น** คือ:\n1. **เดินลงข้างล่าง (Down)** 1 ช่อง\n2. **เดินไปทางขวา (Right)** 1 ช่อง\n\nเมื่อกำหนดจำนวนเต็ม `m` และ `n` มาให้ จงหาจำนวนเส้นทางที่แตกต่างกันทั้งหมด (Unique Paths) ที่หุ่นยนต์จะสามารถไปถึงจุดหมายได้",
        },
        {
          t: "example",
          c: [
            {
              input: "m = 3, n = 7",
              output: "28",
            },
            {
              input: "m = 3, n = 2",
              output: "3",
              explain: "จากมุมบนซ้ายไปล่างขวา มี 3 วิธี: 1. ลง -> ลง -> ขวา, 2. ลง -> ขวา -> ลง, 3. ขวา -> ลง -> ลง",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= m, n <= 100",
            "โจทย์รับประกันว่า คำตอบจะไม่เกิน 2 * 10^9 (พอดีกับ 32-bit integer)",
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
              c: "เราต้องการนับวิธีเดินทั้งหมดจากมุมบนซ้ายไปมุมล่างขวา โดยห้ามเดินย้อนกลับ (เดินได้แค่ 'ขวา' หรือ 'ลง' เท่านั้น)\n\nหากเราใช้วิธีลองเดินทุกทางแบบ Brute-force Recursion ต้นไม้การค้นหาจะแตกกิ่งก้านสาขาซ้ำๆ กันมหาศาลจน Time Complexity พุ่งเป็น $O(2^{m+n})$ ซึ่งเกินเวลาแน่นอน เราจึงต้องจดจำจำนวนเส้นทางของแต่ละช่องด้วย DP",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ",
            },
            {
              t: "p",
              c: "ลองวาดตาราง $3 \times 3$:\n- แถวบนสุดทั้งหมด: เดินขวาได้อย่างเดียว ดังนั้นแต่ละช่องมีได้แค่ **1 วิธี**\n- คอลัมน์ซ้ายสุดทั้งหมด: เดินลงได้อย่างเดียว ดังนั้นแต่ละช่องมีได้แค่ **1 วิธี**\n- ช่อง $(1, 1)$ (ตรงกลาง): เดินลงมาจากช่องบนได้ 1 วิธี หรือเดินขวามาจากช่องซ้ายได้ 1 วิธี รวมกันเป็น **$1 + 1 = 2$ วิธี**\n- ช่อง $(1, 2)$: มาจากช่องบน (1) + ช่องซ้าย (2) = **$1 + 2 = 3$ วิธี**\n- ช่องมุมล่างขวา $(2, 2)$: รวมจากบน (3) + ซ้าย (3) = **6 วิธี**",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ (State & Transition)",
            },
            {
              t: "p",
              c: "- **State:** `dp[i][j]` = จำนวนเส้นทางจากจุดเริ่มต้น $(0, 0)$ มาถึงช่อง $(i, j)$\n- **Base Cases:** ช่องในแถวแรก `dp[0][j] = 1` และคอลัมน์แรก `dp[i][0] = 1`\n- **Transition Formula:**\n$$\text{dp}[i][j] = \text{dp}[i-1][j] + \text{dp}[i][j-1]$$\n(จำนวนวิธีถึงช่องนี้ = วิธีมาจากช่องบน + วิธีมาจากช่องซ้าย)\n\nนอกจากนี้ เราสามารถประหยัด Space จาก $O(m \times n)$ เหลือเพียง $O(n)$ ได้โดยใช้ Array 1 มิติความยาว $n$ เก็บเฉพาะแถวล่าสุด!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "table",
              head: ["พิกัด (i, j)", "มาจากช่องบน dp[i-1][j]", "มาจากช่องซ้าย dp[i][j-1]", "ผลรวม dp[i][j]"],
              rows: [
                ["แถว 0 ทั้งหมด", "-", "-", "1 (ขอบบน เดินขวาทางเดียว)"],
                ["คอลัมน์ 0 ทั้งหมด", "-", "-", "1 (ขอบซ้าย เดินลงทางเดียว)"],
                ["(1, 1)", "dp[0][1] = 1", "dp[1][0] = 1", "1 + 1 = 2"],
                ["(1, 2)", "dp[0][2] = 1", "dp[1][1] = 2", "1 + 2 = 3"],
                ["(2, 1)", "dp[1][1] = 2", "dp[2][0] = 1", "2 + 1 = 3"],
                ["(2, 2)", "dp[1][2] = 3", "dp[2][1] = 3", "3 + 3 = 6"],
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution (Space O(n))",
              c: `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        # เก็บแถวล่าสุดขนาด n (เริ่มต้นเป็น 1 ทั้งแถว)
        row = [1] * n
        
        # วิ่งคำนวณตั้งแต่แถวที่ 1 ถึงแถวที่ m - 1
        for i in range(1, m):
            new_row = [1] * n
            for j in range(1, n):
                # ช่องปัจจุบัน = ช่องบน (row[j]) + ช่องซ้าย (new_row[j-1])
                new_row[j] = row[j] + new_row[j - 1]
            row = new_row
            
        return row[n - 1]`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["row = [1] * n", "กำหนดแถวที่ 0 ให้ทุกช่องเป็น 1 เพราะเดินขวาตรงๆ ได้ทางเดียว"],
                ["for i in range(1, m):", "วนลูปไล่ระดับลงมาทีละแถว"],
                ["new_row = [1] * n", "สร้างแถวใหม่ โดยช่องแรก j=0 เป็น 1 เสมอ (ขอบซ้าย)"],
                ["new_row[j] = row[j] + new_row[j - 1]", "หัวใจของ 2D DP: รวมเส้นทางจากช่องบนแถวก่อนหน้า (row[j]) กับช่องซ้ายของแถวปัจจุบัน (new_row[j-1])"],
                ["row = new_row", "สลับแถวปัจจุบันไปเป็นแถวก่อนหน้า ประหยัดหน่วยความจำ"],
                ["return row[n - 1]", "ช่องสุดท้ายของแถวล่างสุดคือคำตอบที่มุมล่างขวา"],
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
                ["Time (เวลา)", "O(m * n)", "วนลูปคำนวณครบทุกช่องในตารางขนาด $m \times n$ ครั้งละ $O(1)$"],
                ["Space (หน่วยความจำ)", "O(n)", "ประหยัด Memory โดยเก็บเฉพาะแถวขนาด $n$ สองแถว แทนตารางเต็ม"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 62: Unique Paths**\n\nThere is a robot on an $m \times n$ grid. The robot is initially located at the top-left corner (`grid[0][0]`). The robot tries to move to the bottom-right corner (`grid[m - 1][n - 1]`). The robot can only move either **down** or **right** at any point in time.\n\nGiven the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.",
        },
        {
          t: "example",
          c: [
            {
              input: "m = 3, n = 7",
              output: "28",
            },
            {
              input: "m = 3, n = 2",
              output: "3",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= m, n <= 100",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · Recurrence & Intuition",
            },
            {
              t: "p",
              c: "To reach cell $(i, j)$, the robot must come from either $(i-1, j)$ (from above) or $(i, j-1)$ (from the left). Thus:\n$$\text{dp}[i][j] = \text{dp}[i-1][j] + \text{dp}[i][j-1]$$\nBase cases: $\text{dp}[0][j] = 1$ and $\text{dp}[i][0] = 1$.",
            },
            {
              t: "h2",
              c: "Step 2 · Python Solution (Space Optimized)",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        row = [1] * n
        for i in range(1, m):
            new_row = [1] * n
            for j in range(1, n):
                new_row[j] = row[j] + new_row[j - 1]
            row = new_row
        return row[n - 1]`,
            },
            {
              t: "h2",
              c: "Step 3 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(m \times n)$ visiting each matrix coordinate once.\n- **Space Complexity:** $O(n)$ space maintaining only one 1D array row.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p64": {
    slug: "lc75-p64",
    title: {
      th: "ข้อ 64 · LC1143 Longest Common Subsequence (ความยาวลำดับร่วมยาวที่สุด) 🟡",
      en: "Problem 64 · LC1143 Longest Common Subsequence 🟡",
    },
    lead: {
      th: "หาความยาวของลำดับตัวอักษรร่วมที่ยาวที่สุดของข้อความ 2 สตริง โดยไม่ต้องอยู่ติดกัน ด้วยตาราง 2D DP เทียบตัวอักษรทีละคู่",
      en: "Find the length of the longest common subsequence between two strings using classic 2D DP alignment.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 1143: Longest Common Subsequence**\n\nกำหนดสตริง 2 ตัวคือ `text1` และ `text2`\nจงหาความยาวของ **Longest Common Subsequence (LCS)** ซึ่งก็คือลำดับตัวอักษรย่อยที่ยาวที่สุดที่ปรากฏอยู่ในสตริงทั้งสองตัว หากไม่มีตัวอักษรร่วมกันเลย ให้คืนค่า `0`\n\n**ข้อสังเกตสำคัญ:** Subsequence หมายถึงข้อความใหม่ที่เกิดจากการลบตัวอักษรบางตัวออกไป แต่ยังคง **'รักษาลำดับหน้า-หลังเดิม'** ไว้ (ไม่จำเป็นต้องอยู่ติดกัน เช่น 'ace' เป็น subsequence ของ 'abcde')",
        },
        {
          t: "example",
          c: [
            {
              input: 'text1 = "abcde", text2 = "ace"',
              output: "3",
              explain: 'Longest common subsequence คือ "ace" ซึ่งมีความยาวเท่ากับ 3',
            },
            {
              input: 'text1 = "abc", text2 = "abc"',
              output: "3",
            },
            {
              input: 'text1 = "abc", text2 = "def"',
              output: "0",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= text1.length, text2.length <= 1000",
            "text1 และ text2 ประกอบด้วยตัวอักษรภาษาอังกฤษพิมพ์เล็กเท่านั้น",
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
              c: "เราต้องการจับคู่ตัวอักษรระหว่าง `text1` และ `text2` ให้ตรงกันมากที่สุด โดยลำดับของตัวอักษรต้องวิ่งไปข้างหน้าเสมอ (ห้ามสลับที่)\n\nหากคิดแบบ Brute force คือสร้างทุก Subsequence ที่เป็นไปได้ ข้อความยาว $N$ จะมี Subsequence ถึง $2^N$ แบบ ซึ่งเป็นไปไม่ได้ในการคำนวณ แต่สังเกตว่าที่ตัวอักษรคู่ใดๆ ปัญหาย่อยถูกแบ่งออกเป็น 2 กรณีที่ชัดเจนมาก!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ (การเทียบ 2 กรณี)",
            },
            {
              t: "p",
              c: "สมมติเรากำลังพิจารณาตัวอักษรตัวที่ $i$ ของ `text1` และตัวที่ $j$ ของ `text2`:\n1. **ถ้าตัวอักษรตรงกัน (`text1[i-1] == text2[j-1]`):** เราพบตัวอักษรร่วมเพิ่ม 1 ตัวทันที! ดังนั้นเราบวก 1 เข้ากับผลลัพธ์ที่ดีที่สุดก่อนหน้าของทั้งสองคำ นั่นคือช่องทแยงมุมบนซ้าย `dp[i-1][j-1] + 1`\n2. **ถ้าตัวอักษรไม่ตรงกัน:** แปลว่าตัวอักษรคู่นี้ไม่สามารถจับคู่พร้อมกันได้ เราต้องเลือกว่าจะทิ้งตัวอักษรตัวท้ายของ `text1` หรือทิ้งตัวท้ายของ `text2` โดยเลือกทางที่ได้ผลลัพธ์ยาวกว่า นั่นคือ $\\max(\\text{dp}[i-1][j], \\text{dp}[i][j-1])$",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ (State & Transition)",
            },
            {
              t: "p",
              c: "- **State:** `dp[i][j]` = ความยาว LCS ระหว่าง `text1` ความยาว $i$ ตัวแรก กับ `text2` ความยาว $j$ ตัวแรก\n- **ตารางขนาด:** $(m+1) \\times (n+1)$ โดยแถวที่ 0 และคอลัมน์ที่ 0 แทนสตริงว่าง (Empty String ซึ่งมี LCS = 0 เสมอ)\n- **Transition Formula:**\n$$\\text{dp}[i][j] = \\begin{cases} \\text{dp}[i-1][j-1] + 1 & \\text{เมื่อ } text1[i-1] == text2[j-1] \\\\ \\max(\\text{dp}[i-1][j], \\text{dp}[i][j-1]) & \\text{เมื่อไม่ตรงกัน} \\end{cases}$$",
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "p",
              c: "ตาราง DP เมื่อเทียบ `text1 = \'abcde\'` กับ `text2 = \'ace\'`:",
            },
            {
              t: "table",
              head: ["", "'' (ว่าง)", "a", "c", "e"],
              rows: [
                ["'' (ว่าง)", "0", "0", "0", "0"],
                ["a", "0", "1 (ตรงกัน)", "1", "1"],
                ["b", "0", "1", "1", "1"],
                ["c", "0", "1", "2 (ตรงกัน)", "2"],
                ["d", "0", "1", "2", "2"],
                ["e", "0", "1", "2", "3 (ตรงกัน! คำตอบ)"],
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
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        
        # จองตาราง (m + 1) x (n + 1) เริ่มต้นด้วย 0
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        
        # วิ่งเติมตารางทีละช่อง
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                # ตรวจสอบตัวอักษร (ดัชนีในสตริงจริงคือ i-1 และ j-1)
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
                    
        return dp[m][n]`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["dp = [[0] * (n + 1) for _ in range(m + 1)]", "สร้างตารางขนาด (m+1) x (n+1) เพื่อเผื่อขอบ index 0 เป็น Base Case สำหรับสตริงว่าง"],
                ["if text1[i - 1] == text2[j - 1]:", "ลบ 1 จาก index เพราะแถวที่ 1 ใน dp สอดคล้องกับตัวอักษร index 0 ในสตริง"],
                ["dp[i][j] = dp[i - 1][j - 1] + 1", "หากตัวอักษรตรงกัน นำผลลัพธ์ที่ดีที่สุดก่อนหน้านี้ของทั้งสองคำมาบวก 1"],
                ["else: dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])", "หากไม่ตรงกัน เลือกค่าสูงสุดระหว่างการตัดตัวท้ายของ text1 ทิ้ง หรือตัดตัวท้ายของ text2 ทิ้ง"],
                ["return dp[m][n]", "มุมล่างขวาของตารางคือคำตอบสำหรับสตริงเต็มทั้งสองตัว"],
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
                ["Time (เวลา)", "O(m * n)", "เปรียบเทียบตัวอักษรครบทุกคู่ในตารางขนาด $m \times n$"],
                ["Space (หน่วยความจำ)", "O(m * n)", "ใช้ตาราง 2 มิติขนาด $(m+1) \times (n+1)$ (สามารถลดเหลือ $O(n)$ ได้ด้วยการเก็บ 2 แถว)"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 1143: Longest Common Subsequence**\n\nGiven two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.\n\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.",
        },
        {
          t: "example",
          c: [
            {
              input: 'text1 = "abcde", text2 = "ace"',
              output: "3",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= text1.length, text2.length <= 1000",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · Recurrence",
            },
            {
              t: "p",
              c: "For prefixes `text1[:i]` and `text2[:j]`:\n- If characters match (`text1[i-1] == text2[j-1]`): $\text{dp}[i][j] = \text{dp}[i-1][j-1] + 1$.\n- If they mismatch: $\text{dp}[i][j] = \max(\text{dp}[i-1][j], \text{dp}[i][j-1])$.",
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
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]`,
            },
            {
              t: "h2",
              c: "Step 3 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(m \times n)$.\n- **Space Complexity:** $O(m \times n)$ auxiliary table.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p65": {
    slug: "lc75-p65",
    title: {
      th: "ข้อ 65 · LC714 Best Time to Buy and Sell Stock with Transaction Fee (เก็งกำไรหุ้นพร้อมค่าธรรมเนียม) 🟡",
      en: "Problem 65 · LC714 Best Time to Buy and Sell Stock with Transaction Fee 🟡",
    },
    lead: {
      th: "หากำไรสูงสุดจากการซื้อขายหุ้นได้ไม่จำกัดรอบ โดยมีค่าธรรมเนียมต่อรอบ ด้วย DP รูปแบบ State Machine 2 สถานะ",
      en: "Maximize profit from stock trading with unlimited transactions subject to a per-transaction fee using 2-state DP.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 714: Best Time to Buy and Sell Stock with Transaction Fee**\n\nกำหนดอาร์เรย์จำนวนเต็ม `prices` โดยที่ `prices[i]` คือราคาหุ้นในวันที่ `i` และจำนวนเต็ม `fee` แทนค่าธรรมเนียมในการทำธุรกรรมต่อรอบ\n\nคุณสามารถซื้อและขายหุ้นได้กี่รอบก็ได้ตามต้องการ แต่มีเงื่อนไขว่า:\n- **คุณสามารถถือหุ้นได้พร้อมกันสูงสุดเพียง 1 ตัวเท่านั้น** (ต้องขายหุ้นที่ถืออยู่ก่อน จึงจะซื้อใหม่ได้)\n- **ทุกครั้งที่จบการขาย 1 รอบ คุณจะต้องจ่ายค่าธรรมเนียม `fee` หนึ่งครั้ง**\n\nจงหากำไรสุทธิสูงสุดที่คุณสามารถทำได้",
        },
        {
          t: "example",
          c: [
            {
              input: "prices = [1, 3, 2, 8, 4, 9], fee = 2",
              output: "8",
              explain: "ซื้อวันที่ 0 ที่ราคา 1, ขายวันที่ 3 ที่ราคา 8 -> กำไร = 8 - 1 - 2 = 5\nซื้อวันที่ 4 ที่ราคา 4, ขายวันที่ 5 ที่ราคา 9 -> กำไร = 9 - 4 - 2 = 3\nกำไรรวม = 5 + 3 = 8",
            },
            {
              input: "prices = [1, 3, 7, 5, 10, 3], fee = 3",
              output: "6",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= prices.length <= 5 * 10^4",
            "1 <= prices[i] < 5 * 10^4",
            "0 <= fee < 5 * 10^4",
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
              c: "เราต้องการตัดสินใจในแต่ละวันว่าจะ **ซื้อ, ขาย หรืออยู่เฉยๆ** เพื่อให้ได้กำไรรวมสูงสุดหลังจากหักค่าธรรมเนียมแล้ว\n\nทำไมถึงไม่สามารถใช้ Greedy ซื้อถูกขายแพงทุกรอบแบบไม่มี fee ได้? เพราะถ้าส่วนต่างราคาหุ้นน้อยกว่าหรือใกล้เคียงกับ `fee` การซื้อขายจะทำให้เรา 'ขาดทุนค่าธรรมเนียม' แทนที่จะได้กำไร! เราจึงต้องให้ DP ตัดสินใจสถานะที่คุ้มค่าที่สุด",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · มองเป็น State Machine 2 สถานะ",
            },
            {
              t: "p",
              c: "ในแต่ละวัน เราสามารถอยู่ใน 1 ใน 2 สถานะนี้เท่านั้น:\n1. **สถานะ Cash (ถือเงินสด / ไม่ถือหุ้น):**\n   - เกิดจาก: เมื่อวานไม่ถือหุ้นแล้ววันนี้อยู่เฉยๆ หรือ เมื่อวานถือหุ้นแล้ววันนี้ตัดสินใจ 'ขาย' ได้เงินราคาหุ้นวันนี้หักค่าธรรมเนียม (`hold + price - fee`)\n2. **สถานะ Hold (ถือหุ้นอยู่ 1 ตัว):**\n   - เกิดจาก: เมื่อวานถืออยู่แล้ววันนี้ถือต่อ หรือ เมื่อวานถือเงินสดแล้ววันนี้ตัดสินใจ 'ซื้อ' จ่ายเงินค่าหุ้นออกไป (`cash - price`)",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ (State & Transition)",
            },
            {
              t: "p",
              c: "- **Base Cases วันแรก ($i = 0$):**\n  - `cash = 0`: วันแรกถือเงินสด ยังไม่มีกำไร\n  - `hold = -prices[0]`: ซื้อหุ้นตั้งแต่วันแรก กระแสเงินสดติดลบเท่ากับราคาหุ้น\n- **สูตร Transition ในแต่ละวัน:**\n$$\text{cash} = \max(\text{cash},\; \text{hold} + \text{price} - \text{fee})$$\n$$\text{hold} = \max(\text{hold},\; \text{cash} - \text{price})$$\n- **คำตอบสุดท้าย:** ต้องคืนค่า `cash` เสมอ เพราะในวันสุดท้ายไม่มีเหตุผลที่จะถือหุ้นค้างไว้ (การถือหุ้นค้างไว้ไม่ได้แปลงเป็นเงินสด)",
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "p",
              c: "จำลอง `prices = [1, 3, 2, 8, 4, 9]`, `fee = 2` (เริ่มต้น: cash=0, hold=-1):",
            },
            {
              t: "table",
              head: ["วัน (price)", "คำนวณ cash (ขายหรือเฉย)", "คำนวณ hold (ซื้อหรือถือต่อ)", "cash", "hold"],
              rows: [
                ["เริ่ม (1)", "0", "-1", "0", "-1"],
                ["3", "max(0, -1 + 3 - 2) = 0", "max(-1, 0 - 3) = -1", "0", "-1"],
                ["2", "max(0, -1 + 2 - 2) = 0", "max(-1, 0 - 2) = -1", "0", "-1"],
                ["8", "max(0, -1 + 8 - 2) = 5", "max(-1, 5 - 8) = -1", "5 (ขายทำกำไร)", "-1"],
                ["4", "max(5, -1 + 4 - 2) = 5", "max(-1, 5 - 4) = 1", "5", "1 (ซื้อรอบใหม่)"],
                ["9", "max(5, 1 + 9 - 2) = 8", "max(1, 8 - 9) = 1", "8 (ขายรอบสอง)", "1"],
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
    def maxProfit(self, prices: List[int], fee: int) -> int:
        # วันแรก: ไม่ถือหุ้นมีเงิน 0, ถ้าซื้อหุ้นเงินสดติดลบ
        cash = 0
        hold = -prices[0]
        
        # วิ่งอัปเดตสถานะในแต่ละวัน
        for price in prices[1:]:
            # ไม่ถือหุ้น: ถือเงินสดต่อ หรือ ขายหุ้นที่ถืออยู่ (หัก fee ตอนขาย)
            cash = max(cash, hold + price - fee)
            # ถือหุ้น: ถือหุ้นเดิมต่อ หรือ ใช้เงินสดซื้อหุ้นวันนี้
            hold = max(hold, cash - price)
            
        return cash`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["cash = 0; hold = -prices[0]", "กำหนดสถานะวันแรก: เงินสดเริ่มต้นเป็น 0 และการถือหุ้นวันแรกต้องจ่ายเงิน prices[0]"],
                ["cash = max(cash, hold + price - fee)", "ตัดสินใจระหว่างอยู่เฉยๆ ถือเงินสด กับการขายหุ้นที่ถืออยู่และจ่ายค่าธรรมเนียม fee"],
                ["hold = max(hold, cash - price)", "ตัดสินใจระหว่างถือหุ้นต่อ กับการนำเงินสดมาซื้อหุ้นที่ราคาปัจจุบัน"],
                ["return cash", "คืนค่า cash สูงสุดเมื่อสิ้นสุดทุกวัน"],
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
                ["Time (เวลา)", "O(n)", "วนลูปเพียง 1 รอบตามความยาวของ prices"],
                ["Space (หน่วยความจำ)", "O(1)", "ใช้ตัวแปรตัวเลขเพียง 2 ตัว (`cash`, `hold`)"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 714: Best Time to Buy and Sell Stock with Transaction Fee**\n\nYou are given an array `prices` where `prices[i]` is the price of a given stock on the $i$-th day, and an integer `fee` representing a transaction fee.\n\nFind the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.\n\nNote: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).",
        },
        {
          t: "example",
          c: [
            {
              input: "prices = [1, 3, 2, 8, 4, 9], fee = 2",
              output: "8",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= prices.length <= 5 * 10^4",
            "1 <= prices[i] < 5 * 10^4",
            "0 <= fee < 5 * 10^4",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · State Machine Formulation",
            },
            {
              t: "p",
              c: "Define two states for each day:\n- `cash`: Max profit when holding 0 shares.\n- `hold`: Max profit when holding 1 share.\n\nTransitions:\n- `cash = max(cash, hold + price - fee)`\n- `hold = max(hold, cash - price)`",
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
    def maxProfit(self, prices: List[int], fee: int) -> int:
        cash = 0
        hold = -prices[0]
        for price in prices[1:]:
            cash = max(cash, hold + price - fee)
            hold = max(hold, cash - price)
        return cash`,
            },
            {
              t: "h2",
              c: "Step 3 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(n)$ linear single pass.\n- **Space Complexity:** $O(1)$ constant auxiliary space.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p66": {
    slug: "lc75-p66",
    title: {
      th: "ข้อ 66 · LC72 Edit Distance (ระยะทางในการแก้ไขข้อความ) 🟡",
      en: "Problem 66 · LC72 Edit Distance 🟡",
    },
    lead: {
      th: "หาจำนวนครั้งน้อยที่สุดในการแทรก ลบ หรือแทนที่ตัวอักษร เพื่อแปลงคำหนึ่งเป็นอีกคำหนึ่ง ด้วยตาราง 2D DP ต้นแบบระดับตำนาน",
      en: "Calculate the minimum operations (insert, delete, replace) required to convert word1 to word2.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 72: Edit Distance**\n\nกำหนดสตริง 2 ตัวคือ `word1` และ `word2`\nจงหา **จำนวนการแก้ไขที่น้อยที่สุด (Minimum Operations)** เพื่อแปลง `word1` ให้กลายเป็น `word2`\n\nการแก้ไขที่คุณสามารถทำได้มี 3 รูปแบบ:\n1. **Insert (แทรก):** แทรกตัวอักษร 1 ตัวเข้าไป\n2. **Delete (ลบ):** ลบตัวอักษร 1 ตัวออก\n3. **Replace (แทนที่):** เปลี่ยนตัวอักษรเดิม 1 ตัวให้เป็นตัวอักษรใหม่",
        },
        {
          t: "example",
          c: [
            {
              input: 'word1 = "horse", word2 = "ros"',
              output: "3",
              explain: 'horse -> rorse (แทนที่ h ด้วย r)\nrorse -> rose (ลบ r ตรงกลางออก)\nrose -> ros (ลบ e ตัวท้ายออก)\nรวมทั้งหมด 3 ครั้ง',
            },
            {
              input: 'word1 = "intention", word2 = "execution"',
              output: "5",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "0 <= word1.length, word2.length <= 500",
            "word1 และ word2 ประกอบด้วยตัวอักษรภาษาอังกฤษพิมพ์เล็กเท่านั้น",
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
              c: "เราต้องการคำนวณ 'ต้นทุนการแปลงข้อความ' จาก `word1` ไปเป็น `word2` โดยแต่ละการกระทำ (แทรก, ลบ, แทนที่) มีต้นทุนเท่ากับ 1\n\nนี่คืออัลกอริทึมคลาสสิกระดับโลก (Levenshtein Distance) ซึ่งเป็นรากฐานของระบบ Spell Checker และการเปรียบเทียบรหัสพันธุกรรม DNA!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · ความสัมพันธ์เชิงทิศทาง 3 ทิศทาง",
            },
            {
              t: "p",
              c: "เมื่อเราพิจารณาแปลง `word1[:i]` เป็น `word2[:j]` ที่ช่อง `dp[i][j]`:\n1. **ถ้าตัวอักษรตรงกัน (`word1[i-1] == word2[j-1]`):** ไม่ต้องแก้ไขอะไรเลย! ต้นทุนเท่ากับช่องทแยงมุม `dp[i-1][j-1]`\n2. **ถ้าไม่ตรงกัน:** เราต้องแก้ไข 1 ครั้ง (`+ 1`) แล้วเลือกต้นทุนที่ต่ำที่สุดจาก 3 ทางเลือก:\n   - **ลบตัวอักษรจาก word1 (มาจากช่องบน `dp[i-1][j]`):** ลบตัวที่ $i$ ทิ้งแล้วแปลง $i-1$ ตัวที่เหลือ\n   - **แทรกตัวอักษรเข้า word1 (มาจากช่องซ้าย `dp[i][j-1]`):** เติมตัวให้ตรงกับ $j$ แล้วไปเทียบ $j-1$ ตัวที่เหลือ\n   - **แทนที่ตัวอักษร (มาจากช่องทแยงมุม `dp[i-1][j-1]`):** เปลี่ยนตัวที่ $i$ ให้เป็นตัวที่ $j$ แล้วเลื่อนไปข้างหน้าทั้งคู่",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ (State & Transition)",
            },
            {
              t: "p",
              c: "- **State:** `dp[i][j]` = จำนวนการแก้ไขน้อยที่สุดเพื่อแปลง `word1[:i]` เป็น `word2[:j]`\n- **Base Cases ที่ขอบ:**\n  - `dp[i][0] = i`: แปลงคำยาว $i$ ให้กลายเป็นสตริงว่าง ต้อง 'ลบ' ทิ้ง $i$ ครั้ง\n  - `dp[0][j] = j`: แปลงสตริงว่างให้กลายเป็นคำยาว $j$ ต้อง 'แทรก' เข้ามา $j$ ครั้ง\n- **Transition Formula:**\n$$\\text{dp}[i][j] = \\begin{cases} \\text{dp}[i-1][j-1] & \\text{ถ้าตรงกัน} \\\\ 1 + \\min(\\text{dp}[i-1][j], \\text{dp}[i][j-1], \\text{dp}[i-1][j-1]) & \\text{ถ้าไม่ตรงกัน} \\end{cases}$$",
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "p",
              c: "ตาราง DP สำหรับ `word1 = \'ros\'` แปลงเป็น `word2 = \'horse\'` (หรือในทางกลับกัน):",
            },
            {
              t: "table",
              head: ["", "'' (ว่าง)", "r", "o", "s"],
              rows: [
                ["'' (ว่าง)", "0", "1", "2", "3"],
                ["h", "1", "1 (แทนที่)", "2", "3"],
                ["o", "2", "2", "1 (ตรงกัน)", "2"],
                ["r", "3", "2 (ตรงกัน)", "2", "2"],
                ["s", "4", "3", "3", "2 (ตรงกัน)"],
                ["e", "5", "4", "4", "3 (คำตอบคือ 3)"],
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
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        
        # จองตารางขนาด (m + 1) x (n + 1)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        
        # ตั้งค่า Base Cases ที่ขอบ
        for i in range(m + 1):
            dp[i][0] = i  # ต้องลบ i ตัวเพื่อให้กลายเป็นสตริงว่าง
        for j in range(n + 1):
            dp[0][j] = j  # ต้องแทรก j ตัวจากสตริงว่าง
            
        # เติมตาราง
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    # ตัวอักษรตรงกัน ไม่ต้องเสียค่าดำเนินการ
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    # เลือกระหว่าง: ลบ (บน), แทรก (ซ้าย), หรือ แทนที่ (ทแยง)
                    dp[i][j] = 1 + min(
                        dp[i - 1][j],      # Delete
                        dp[i][j - 1],      # Insert
                        dp[i - 1][j - 1],  # Replace
                    )
                    
        return dp[m][n]`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["dp[i][0] = i; dp[0][j] = j", "Base Cases: ขอบแถว 0 และคอลัมน์ 0 สำคัญมาก ห้ามลืมเด็ดขาด มิฉะนั้นคำตอบจะผิด"],
                ["if word1[i-1] == word2[j-1]:", "ตรวจว่าตัวอักษรท้ายสุดตรงกันหรือไม่"],
                ["dp[i][j] = dp[i-1][j-1]", "ถ้าตรงกัน สืบทอดต้นทุนเดิมจากช่องทแยงมุมโดยไม่ต้องเพิ่มจำนวนก้าว"],
                ["dp[i][j] = 1 + min(...)", "ถ้าไม่ตรงกัน บวก 1 แล้วเลือกค่าต่ำสุดจาก 3 ทางเลือก (ลบ, แทรก, แทนที่)"],
                ["return dp[m][n]", "มุมล่างขวาคือต้นทุนการแปลง word1 ทั้งหมดเป็น word2"],
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
                ["Time (เวลา)", "O(m * n)", "คำนวณครบทุกช่องในตารางขนาด $(m+1) \times (n+1)$"],
                ["Space (หน่วยความจำ)", "O(m * n)", "ใช้ตาราง 2 มิติขนาด $(m+1) \times (n+1)$"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 72: Edit Distance**\n\nGiven two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.\n\nYou have the following three operations permitted on a word:\n1. Insert a character\n2. Delete a character\n3. Replace a character",
        },
        {
          t: "example",
          c: [
            {
              input: 'word1 = "horse", word2 = "ros"',
              output: "3",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "0 <= word1.length, word2.length <= 500",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · Recurrence",
            },
            {
              t: "p",
              c: "- Base cases: $\text{dp}[i][0] = i$ (deletions), $\text{dp}[0][j] = j$ (insertions).\n- Match: $\text{dp}[i][j] = \text{dp}[i-1][j-1]$.\n- Mismatch: $\text{dp}[i][j] = 1 + \min(\text{dp}[i-1][j], \text{dp}[i][j-1], \text{dp}[i-1][j-1])$.",
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
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        return dp[m][n]`,
            },
            {
              t: "h2",
              c: "Step 3 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(m \times n)$.\n- **Space Complexity:** $O(m \times n)$.",
            },
          ],
        },
      ],
    },
  },
};
