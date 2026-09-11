import type { Page } from "@/lib/types";

export const binarySearchPages: Record<string, Page> = {
  "lc75-intro-binary-search": {
    slug: "lc75-intro-binary-search",
    title: {
      th: "Binary Search — พื้นฐาน & แนวคิด",
      en: "Binary Search — Fundamentals & Mental Models",
    },
    lead: {
      th: "เทคนิคตัดครึ่งช่วงค้นหา (Halving Search Space) ทุกก้าว ลดเวลาจาก O(N) เหลือ O(log N) และต่อยอดเป็น Binary Search on Answer",
      en: "Halving search space at every step to cut runtime from O(N) to O(log N), extending into Binary Search on Answer.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "Binary Search (ค้นหาแบบแบ่งครึ่ง) คือหนึ่งในอัลกอริทึมที่ทรงพลังที่สุดในโลกคอมพิวเตอร์ ไอเดียเรียบง่ายแต่เฉียบขาด: ถ้าข้อมูลเรียงลำดับ (Sorted) ไว้อยู่แล้ว ทุกครั้งที่เราตรวจค่าตรงกลาง เราสามารถตัดตัวเลือกที่ไม่เกี่ยวข้องทิ้งไปได้ครึ่งหนึ่งทันที!",
        },
        {
          t: "h2",
          c: "ส่วนที่ 1 · ปลดล็อกไอเดีย: เปิดพจนานุกรม ไม่ใช่ไล่อ่านทีละหน้า",
        },
        {
          t: "p",
          c: 'นึกถึงเวลาเราเปิดพจนานุกรมหาคำว่า "Monkey" — เราไม่เคยเปิดตั้งแต่หน้า 1 ไล่ไปหน้า 2, 3... แต่เราจะเปิด "กลางเล่ม" ก่อน ถ้าพบคำที่ขึ้นต้นด้วยตัว P แปลว่า M ต้องอยู่ครึ่งซ้ายแน่นอน เราก็ตัดครึ่งขวาทิ้งทั้งก้อน แล้วทำซ้ำ!',
        },
        {
          t: "image",
          src: "/leetcode-75/binary-search.gif",
          alt: "Binary search: lo/hi/mid halving until target found",
          caption: "Binary Search: ดู mid → ตัดครึ่งที่ไม่เกี่ยวทิ้ง → เหลือช่วงเล็กลงครึ่งหนึ่งทุกก้าว",
        },
        {
          t: "callout",
          title: "ความเร็วระดับ O(log N)",
          c: "ข้อมูล 1,000,000 ตัว แทนที่จะต้องเดินตรวจ 1,000,000 ครั้งแบบ Linear Search O(N) ตัว Binary Search ใช้การตัดครึ่งเพียงประมาณ 20 ครั้งเท่านั้นก็เจอ!",
        },

        {
          t: "h2",
          c: "ส่วนที่ 2 · แม่แบบมาตรฐาน: lo, hi, mid",
        },
        {
          t: "code",
          lang: "python",
          label: "Standard Binary Search Template",
          c: `def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1

    while lo <= hi:
        mid = (lo + hi) // 2

        if nums[mid] == target:
            return mid               # เจอเป้าหมายแล้ว!
        elif nums[mid] < target:
            lo = mid + 1             # เป้าหมายอยู่ฝั่งขวา ตัดฝั่งซ้ายทิ้ง
        else:
            hi = mid - 1             # เป้าหมายอยู่ฝั่งซ้าย ตัดฝั่งขวาทิ้ง

    return -1                        # ตกขอบ ไม่พบเป้าหมาย`,
        },

        {
          t: "h2",
          c: "ส่วนที่ 3 · เทคนิคขั้นสูง: Binary Search on Answer",
        },
        {
          t: "p",
          c: 'โจทย์ระดับ Medium หลายข้อไม่ได้ให้ array ที่เรียงแล้วมาค้นหา แต่ให้เรา "เดาคำตอบที่เป็นตัวเลข" เช่น ความเร็วการกินกล้วยของ Koko (LC875) ถ้าเงื่อนไขมีลักษณะเป็นขั้นบันได (Monotonic) เช่น "ถ้าความเร็ว 5 กินทัน ความเร็วที่มากกว่า 5 ก็ย่อมกินทันเสมอ" เราสามารถรัน Binary Search บนช่วงคำตอบที่เป็นไปได้ (1 ถึง Max) เพื่อหาคำตอบที่ดีที่สุดได้!',
        },
      ],
      en: [
        {
          t: "p",
          c: "Binary search eliminates half of the remaining search space with each comparison. On sorted data, it turns an O(N) linear scan into an ultra-fast O(log N) algorithm.",
        },
        {
          t: "h2",
          c: "Part 1 · The Dictionary Intuition",
        },
        {
          t: "p",
          c: "When looking up a word in a printed dictionary, you flip open the middle. Depending on whether the word comes before or after, you discard an entire half of the volume.",
        },
        {
          t: "h2",
          c: "Part 2 · Binary Search on Answer",
        },
        {
          t: "p",
          c: "Instead of searching for a value inside a sorted list, we can binary search across the range of possible answers whenever feasibility is monotonic (e.g. true for all x >= threshold).",
        },
      ],
    },
  },

  "lc75-p53": {
    slug: "lc75-p53",
    title: {
      th: "ข้อ 53 · LC374 Guess Number Higher or Lower (ทายเลขสูงต่ำ) 🟢",
      en: "LC374 Guess Number Higher or Lower 🟢",
    },
    lead: {
      th: "โจทย์แม่แบบ Binary Search ตำราแท้ — เดาตัวเลขตรงกลางแล้วปรับขอบเขตตามคำใบ้ API",
      en: "Textbook binary search — guess the midpoint and narrow boundaries based on API feedback.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `We are playing the Guess Game. The game will pick a secret number from \`1\` to \`n\`. You have to guess which number was picked.

Every time you guess wrong, the game tells you whether the number is higher or lower than your guess.

You call a pre-defined API \`int guess(int num)\`, which returns three possible results:
• \`-1\`: Your guess is higher than the number I picked (i.e. \`num > pick\`).
• \`1\`: Your guess is lower than the number I picked (i.e. \`num < pick\`).
• \`0\`: your guess is equal to the number I picked (i.e. \`num == pick\`).

Return the number that I picked.`,
        },
        {
          t: "p",
          c: `เรากำลังเล่นเกมทายตัวเลข โดยระบบได้สุ่มเลือกเลขลับตัวหนึ่งไว้ในช่วง \`1\` ถึง \`n\`
ทุกครั้งที่คุณทาย ระบบจะมี API \`int guess(int num)\` ให้เรียก ซึ่งส่งคืนค่า:
• \`-1\`: ตัวเลขที่คุณทายสูงเกินไป (เลขลับมีค่าน้อยกว่า \`num\`)
• \`1\`: ตัวเลขที่คุณทายต่ำเกินไป (เลขลับมีค่ามากกว่า \`num\`)
• \`0\`: ยินดีด้วย คุณทายถูกแล้ว (เลขลับมีค่าเท่ากับ \`num\`)

จงหาว่าเลขลับที่ถูกสุ่มไว้คือเลขใด`,
        },
        {
          t: "example",
          c: [
            {
              input: "n = 10, pick = 6",
              output: "6",
              explain: "ทาย 5 ได้ 1 (ต่ำไป) -> ทาย 8 ได้ -1 (สูงไป) -> ทาย 6 ได้ 0 (ถูกต้อง)",
            },
            {
              input: "n = 1, pick = 1",
              output: "1",
              explain: "มีเลขเดียวคือ 1 ทาย 1 ได้ 0 ทันที",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= n <= 2^31 - 1",
            "1 <= pick <= n",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "ค่า n อาจใหญ่ถึง 2 พันล้าน (2^31 - 1)! ถ้าไล่ทายทีละเลข 1, 2, 3... จะหมดเวลาแน่นอน เราจะใช้การเดาเลขตรงกลางเพื่อตัดตัวเลขทิ้งทีละครึ่งได้อย่างไร?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ให้ค้นหาเลขลับที่อยู่ในช่วง [1, n] โดยทุกครั้งที่เราทาย `mid` ฟังก์ชัน `guess(mid)` จะบอกทิศทางอย่างชัดเจนว่าเลขลับอยู่ทางซ้าย (-1) หรืออยู่ทางขวา (+1) หรือคือตัวนี้เลย (0)",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "จำลอง n = 10, pick = 6:",
            },
            {
              t: "ul",
              c: [
                "ช่วงเริ่มต้น: lo = 1, hi = 10",
                "รอบที่ 1: mid = (1 + 10) // 2 = 5 -> เรียก guess(5) ได้ผลลัพธ์ +1 (ต่ำไป! แปลว่าคำตอบอยู่ขวา) -> ขยับ lo = 6",
                "รอบที่ 2: ช่วงเหลือ [6, 10] -> mid = (6 + 10) // 2 = 8 -> เรียก guess(8) ได้ -1 (สูงไป! คำตอบอยู่ซ้าย) -> ขยับ hi = 7",
                "รอบที่ 3: ช่วงเหลือ [6, 7] -> mid = (6 + 7) // 2 = 6 -> เรียก guess(6) ได้ 0 (ทายถูก!) -> ส่งคืน 6 ทันที",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: Binary Search มาตรฐานบนช่วงตัวเลข 1 ถึง n",
            },
            {
              t: "p",
              c: "ขั้นตอนตรรกะ:",
            },
            {
              t: "ol",
              c: [
                "ตั้ง `lo = 1`, `hi = n`",
                "วนลูป `while lo <= hi:`",
                "คำนวณ `mid = (lo + hi) // 2`",
                "เรียก `res = guess(mid)`",
                "ถ้า `res == 0`: ตอบ `mid`",
                "ถ้า `res == -1` (ทายสูงไป): ปรับ `hi = mid - 1`",
                "ถ้า `res == 1` (ทายต่ำไป): ปรับ `lo = mid + 1`",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น / จำลองการทำงาน" },
            {
              t: "table",
              head: ["รอบ", "lo", "hi", "mid", "guess(mid)", "การปรับขอบเขต"],
              rows: [
                ["1", "1", "10", "5", "+1 (ต่ำไป)", "lo = mid + 1 = 6"],
                ["2", "6", "10", "8", "-1 (สูงไป)", "hi = mid - 1 = 7"],
                ["3", "6", "7", "6", "0 (ถูกต้อง!)", "คืนค่า 6 จบการทำงาน"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `# The guess API is already defined for you.
# @param num, your guess
# @return -1 if num is higher than the picked number
#          1 if num is lower than the picked number
#          otherwise return 0
# def guess(num: int) -> int:

class Solution:
    def guessNumber(self, n: int) -> int:
        lo = 1
        hi = n

        while lo <= hi:
            mid = (lo + hi) // 2
            res = guess(mid)

            if res == 0:
                return mid
            elif res == -1:
                # ทายสูงไป เลขจริงอยู่ฝั่งซ้าย
                hi = mid - 1
            else:
                # ทายต่ำไป เลขจริงอยู่ฝั่งขวา
                lo = mid + 1

        return lo`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["lo = 1; hi = n", "ตั้งขอบเขตการค้นหาเริ่มต้น", "lo=1, hi=10"],
                ["mid = (lo + hi) // 2", "หาจุดกึ่งกลางของช่วง", "mid = 5"],
                ["res = guess(mid)", "ถาม API เกมทายตัวเลข", "guess(5) = 1"],
                ["elif res == -1: hi = mid - 1", "ตัดช่วงครึ่งขวาทิ้ง", "hi = 4"],
                ["else: lo = mid + 1", "ตัดช่วงครึ่งซ้ายทิ้ง", "lo = 6"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(log N)", "ตัดช่วงการค้นหาทิ้งทีละครึ่งหนึ่งทุกรอบ สูงสุดไม่เกิน 31 รอบสำหรับ N = 2^31"],
                ["Space (หน่วยความจำ)", "O(1)", "ใช้ตัวแปรตัวชี้ `lo`, `hi`, `mid` คงที่ ไม่ใช้หน่วยความจำเพิ่ม"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Guess a picked secret number from \`1\` to \`n\` using the \`guess(num)\` API which returns -1, 1, or 0.`,
        },
        {
          t: "example",
          c: [
            {
              input: "n = 10, pick = 6",
              output: "6",
              explain: "guess(5)=1 -> guess(8)=-1 -> guess(6)=0.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= n <= 2^31 - 1",
            "1 <= pick <= n",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Find the secret integer in [1, n] using binary search guided by the `guess()` API.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "n=10, pick=6: mid=5 -> +1 (lo=6). mid=8 -> -1 (hi=7). mid=6 -> 0 (found!).",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Standard binary search with `lo <= hi`. Branch left on `guess() == -1` and right on `guess() == 1`.",
            },

            { t: "h3", c: "Step 4 · Simulation Table" },
            {
              t: "table",
              head: ["Step", "lo", "hi", "mid", "Result"],
              rows: [
                ["1", "1", "10", "5", "+1 -> lo=6"],
                ["2", "6", "10", "8", "-1 -> hi=7"],
                ["3", "6", "7", "6", "0 -> return 6"],
              ],
            },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def guessNumber(self, n: int) -> int:
        lo, hi = 1, n
        while lo <= hi:
            mid = (lo + hi) // 2
            res = guess(mid)
            if res == 0:
                return mid
            elif res == -1:
                hi = mid - 1
            else:
                lo = mid + 1
        return lo`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["lo, hi = 1, n", "Search boundary", "1 to n"],
                ["mid = (lo + hi) // 2", "Midpoint", "mid = 5"],
                ["if res == 0: return mid", "Target found", "return 6"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(log N)", "Halves the interval in every round."],
                ["Space", "O(1)", "Only integer boundary pointers."],
              ],
            },
          ],
        },
      ],
    },
  },

  "lc75-p54": {
    slug: "lc75-p54",
    title: {
      th: "ข้อ 54 · LC2300 Successful Pairs of Spells and Potions (จับคู่คาถากับยา) 🟡",
      en: "LC2300 Successful Pairs of Spells and Potions 🟡",
    },
    lead: {
      th: "เรียง array ยา potions แล้วใช้ Binary Search หาตำแหน่งแรกที่คูณแล้วผ่านเกณฑ์ success",
      en: "Sort potions array and use binary search (bisect_left) to count valid pairings in O(M log M + N log M).",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `You are given two positive integer arrays \`spells\` and \`potions\`, of length \`n\` and \`m\` respectively, where \`spells[i]\` represents the strength of the \`i\`-th spell and \`potions[j]\` represents the strength of the \`j\`-th potion.

You are also given an integer \`success\`. A spell and potion pair is considered successful if the product of their strengths is at least \`success\`.

Return an integer array \`pairs\` of length \`n\` where \`pairs[i]\` is the number of potions that will form a successful pair with the \`i\`-th spell.`,
        },
        {
          t: "p",
          c: `กำหนด array จำนวนเต็มบวก \`spells\` และ \`potions\` ยาว \`n\` และ \`m\` ตามลำดับ โดย \`spells[i]\` คือพลังของคาถา และ \`potions[j]\` คือพลังของยา
และกำหนดจำนวนเต็ม \`success\`

คู่คาถากับยาจะถือว่า "สำเร็จ" (successful) หากผลคูณของพลัง \`spells[i] * potions[j] >= success\`

จงส่งคืน array \`pairs\` ยาว \`n\` โดยที่ \`pairs[i]\` คือ "จำนวนยา" ทั้งหมดที่จับคู่กับคาถาที่ \`i\` แล้วสำเร็จ`,
        },
        {
          t: "example",
          c: [
            {
              input: "spells = [5,1,3], potions = [1,2,3,4,5], success = 7",
              output: "[4,0,3]",
              explain:
                "• คาถา 5: จับคู่กับ potions [2,3,4,5] ให้ผลคูณ 10,15,20,25 >= 7 ได้ 4 คู่\n• คาถา 1: จับคู่ตัวไหนก็คูณได้ไม่ถึง 7 ได้ 0 คู่\n• คาถา 3: จับคู่กับ [3,4,5] ให้ผลคูณ 9,12,15 >= 7 ได้ 3 คู่\nตอบ [4, 0, 3]",
            },
            {
              input: "spells = [3,1,2], potions = [8,5,8], success = 16",
              output: "[2,0,2]",
              explain: "spells 3 คู่กับ [8,8] ได้ 2, spells 1 ได้ 0, spells 2 คู่กับ [8,8] ได้ 2",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "n == spells.length",
            "m == potions.length",
            "1 <= n, m <= 10^5",
            "1 <= spells[i], potions[i] <= 10^5",
            "1 <= success <= 10^10",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "ถ้าเรานำคาถาแต่ละตัวมาคูณกับยาทุกขวด จะเสียเวลา O(N * M) ซึ่งสูงถึง 10^10 (Time Limit Exceeded)! ถ้าเรา sort ขวดยาไว้ก่อน เราจะหาจำนวนยาที่ผ่านเกณฑ์ได้ในเสี้ยววินาทีอย่างไร?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "สำหรับคาถาแต่ละตัวที่มีพลัง `s` เราต้องหายาที่มีพลัง `p` ซึ่งทำให้ `s * p >= success` หรือจัดรูปใหม่ได้เป็น `p >= ceil(success / s)`",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "สมมติ success = 7, potions = [1, 2, 3, 4, 5]:",
            },
            {
              t: "ul",
              c: [
                "เรียงยาจากน้อยไปมาก: [1, 2, 3, 4, 5] (ความยาว m = 5)",
                "สำหรับคาถาพลัง 5: เราต้องการยาที่มีพลัง >= ceil(7 / 5) = 2",
                "ใช้ Binary Search หาตำแหน่งแรกที่ค่า >= 2 -> เจอที่ index 1 (ค่า 2)",
                "เนื่องจากยาเรียงลำดับอยู่แล้ว ยาทุกขวดตั้งแต่ index 1 ถึงตัวสุดท้าย ย่อมผ่านเกณฑ์ทั้งหมด!",
                "จำนวนยาที่ผ่านคือ m - index = 5 - 1 = 4 ขวดทันที!",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: Sort `potions` 1 ครั้ง (O(M log M)) จากนั้นสำหรับแต่ละคาถาใน `spells` ใช้ `bisect_left` หาตำแหน่งแรกที่ยาผ่านเกณฑ์ (O(log M))",
            },
            {
              t: "p",
              c: "เคล็ดลับการคำนวณเพดาน (Ceiling) โดยไม่ใช้ทศนิยม:",
            },
            {
              t: "code",
              lang: "python",
              label: "สูตรปัดเศษขึ้นด้วยจำนวนเต็มล้วน",
              c: `need = (success + s - 1) // s   # เท่ากับ math.ceil(success / s) แต่ไม่มี floating error`,
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น / จำลองการทำงาน" },
            {
              t: "table",
              head: ["คาถา (s)", "เกณฑ์ขั้นต่ำ (need)", "index แรกที่ >= need", "จำนวนที่ผ่าน (m - idx)"],
              rows: [
                ["5", "(7 + 4) // 5 = 2", "idx = 1 (potions[1]=2)", "5 - 1 = 4"],
                ["1", "(7 + 0) // 1 = 7", "idx = 5 (เกินขอบ)", "5 - 5 = 0"],
                ["3", "(7 + 2) // 3 = 3", "idx = 2 (potions[2]=3)", "5 - 2 = 3"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `import bisect

class Solution:
    def successfulPairs(self, spells: List[int], potions: List[int], success: int) -> List[int]:
        # 1. เรียงลำดับยาจากน้อยไปมาก
        potions.sort()
        m = len(potions)
        res = []

        # 2. หาจำนวนยาที่ผ่านเกณฑ์สำหรับคาถาแต่ละตัว
        for s in spells:
            # คำนวณพลังยาขั้นต่ำที่ต้องการ: p >= ceil(success / s)
            min_potion = (success + s - 1) // s

            # Binary Search หา index แรกที่ potions[idx] >= min_potion
            idx = bisect.bisect_left(potions, min_potion)

            # ยาทุกขวดตั้งแต่ idx เป็นต้นไปล้วนผ่านเกณฑ์
            res.append(m - idx)

        return res`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["potions.sort()", "เรียงยาให้เป็นระเบียบเพื่อให้ Binary Search ได้", "potions=[1, 2, 3, 4, 5]"],
                ["min_potion = (success + s - 1) // s", "คำนวณพลังยาขั้นต่ำแบบปัดเศษขึ้น", "s=5, success=7 -> min_potion=2"],
                ["idx = bisect.bisect_left(potions, min_potion)", "หาตำแหน่งแรกที่ค่ายาถึงเกณฑ์", "idx = 1"],
                ["res.append(m - idx)", "นับจำนวนขวดยาตั้งแต่จุดที่เจอจนถึงขวดสุดท้าย", "5 - 1 = 4"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O((M + N) log M)", "Sort potions ใช้ O(M log M) และ Binary Search สำหรับ N คาถา ใช้ O(N log M)"],
                ["Space (หน่วยความจำ)", "O(1)", "Sort potions แบบ in-place ไม่ใช้โครงสร้างข้อมูลเสริม (ไม่นับ array คำตอบ)"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Count how many potions form a successful pair with each spell such that \`spells[i] * potions[j] >= success\`.`,
        },
        {
          t: "example",
          c: [
            {
              input: "spells = [5,1,3], potions = [1,2,3,4,5], success = 7",
              output: "[4,0,3]",
              explain: "Spell 5 pairs with [2,3,4,5], spell 1 with none, spell 3 with [3,4,5].",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= n, m <= 10^5",
            "1 <= spells[i], potions[i] <= 10^5",
            "1 <= success <= 10^10",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "For each spell `s`, find how many potions satisfy `p >= ceil(success / s)`.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "Sort potions. For `s = 5, success = 7`, need `p >= 2`. In `[1, 2, 3, 4, 5]`, index of 2 is 1. Number of valid potions is `5 - 1 = 4`.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Sort potions, then use `bisect_left` with integer ceiling formula `(success + s - 1) // s`.",
            },

            { t: "h3", c: "Step 4 · Simulation Table" },
            {
              t: "table",
              head: ["Spell s", "Min Potion Needed", "bisect_left index", "Count (m - idx)"],
              rows: [
                ["5", "2", "1", "4"],
                ["1", "7", "5", "0"],
                ["3", "3", "2", "3"],
              ],
            },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `import bisect

class Solution:
    def successfulPairs(self, spells: List[int], potions: List[int], success: int) -> List[int]:
        potions.sort()
        m = len(potions)
        res = []

        for s in spells:
            min_potion = (success + s - 1) // s
            idx = bisect.bisect_left(potions, min_potion)
            res.append(m - idx)

        return res`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["potions.sort()", "Sort potions array", "[1, 2, 3, 4, 5]"],
                ["min_potion = (success + s - 1) // s", "Compute required minimum potion strength", "ceil(7/5) = 2"],
                ["res.append(m - idx)", "Count valid potions to the right", "5 - 1 = 4"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O((M + N) log M)", "O(M log M) sort + N * O(log M) binary search."],
                ["Space", "O(1)", "In-place sorting auxiliary space."],
              ],
            },
          ],
        },
      ],
    },
  },

  "lc75-p55": {
    slug: "lc75-p55",
    title: {
      th: "ข้อ 55 · LC162 Find Peak Element (หายอดแหลม) 🟡",
      en: "LC162 Find Peak Element 🟡",
    },
    lead: {
      th: "Binary Search บน Array ที่ไม่ได้เรียงลำดับ — เดินไต่ระดับความชันไปทางที่สูงกว่าเสมอใน O(log N)",
      en: "Binary search on an unsorted array — climb the slope toward higher ground in O(log N).",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `A peak element is an element that is strictly greater than its neighbors.

Given a 0-indexed integer array \`nums\`, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

You may imagine that \`nums[-1] = nums[n] = -∞\`. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

You must write an algorithm that runs in \`O(log n)\` time.`,
        },
        {
          t: "p",
          c: `ยอดแหลม (peak element) คือสมาชิกที่มีค่ามากกว่าเพื่อนบ้านข้างเคียงทั้งสองข้างอย่างเคร่งครัด
กำหนด array \`nums\` จงหา index ของยอดแหลมตัวใดก็ได้แล้วส่งคืน index นั้น
โดยสมมติว่าสมาชิกนอกขอบทั้งสองฝั่งมีค่าเป็นลบอนันต์ (\`nums[-1] = nums[n] = -∞\`)

เงื่อนไขบังคับ: อัลกอริทึมต้องทำงานด้วยเวลา \`O(log n)\``,
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [1,2,3,1]",
              output: "2",
              explain: "index 2 (ค่า 3) มากกว่าเพื่อนบ้านทั้งสองข้าง (2 และ 1) จึงเป็นยอดแหลม",
            },
            {
              input: "nums = [1,2,1,3,5,6,4]",
              output: "5",
              explain: "index 5 (ค่า 6) มากกว่า 5 และ 4 จึงเป็นยอดแหลม (ตอบ index 1 ค่า 2 ก็ถูกต้องเช่นกัน)",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= nums.length <= 1000",
            "-2^31 <= nums[i] <= 2^31 - 1",
            "nums[i] != nums[i + 1] สำหรับทุก i (ไม่มีตัวติดกันที่เท่ากัน)",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "Array ข้อนี้ไม่ได้เรียงลำดับ (Unsorted)! ทำไม Binary Search ถึงยังใช้หา Peak Element ได้?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "หาตำแหน่ง index ของโหนดที่เป็นยอดเขา (มากกว่าตัวซ้ายและตัวขวา) โดยมีข้อบังคับว่าต้องทำในเวลา O(log N) ซึ่งบีบให้เราต้องใช้ Binary Search แม้ array จะไม่ได้เรียงลำดับก็ตาม!",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "หัวใจสำคัญ: **หลักการปีนเขา (Slope Property)**",
            },
            {
              t: "ul",
              c: [
                "ลองมองจุดกึ่งกลาง `mid` และตัวถัดไป `mid + 1`:",
                "ถ้า `nums[mid] < nums[mid + 1]`: แปลว่าทางข้างหน้าเป็น **ขาขึ้น (Uphill)** แสดงว่าถ้าเราเดินต่อไปทางขวา เราจะต้องเจอยอดเขาอย่างแน่นอน (เพราะขอบขวาสุดเป็นเหวลบอนันต์ อย่างแย่ที่สุดคือตัวสุดท้ายก็เป็นยอดเขา) -> ตัดครึ่งซ้ายทิ้ง!",
                "ถ้า `nums[mid] > nums[mid + 1]`: แปลว่าทางข้างหน้าเป็น **ขาลง (Downhill)** แสดงว่ายอดเขาต้องอยู่ทางฝั่งซ้าย (หรืออาจเป็นตัว `mid` เอง) -> บีบขอบขวาเข้ามา `hi = mid`!",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: ใช้ Binary Search แบบ `while lo < hi:` เดินตามความชันขึ้นไปหายอดเขา",
            },
            {
              t: "p",
              c: "ขั้นตอนตรรกะ:",
            },
            {
              t: "ol",
              c: [
                "ตั้ง `lo = 0`, `hi = len(nums) - 1`",
                "วนลูป `while lo < hi:`",
                "คำนวณ `mid = (lo + hi) // 2`",
                "ถ้า `nums[mid] < nums[mid + 1]`: ขาขึ้น ยอดอยู่ขวา -> `lo = mid + 1`",
                "มิฉะนั้น: ขาลง ยอดอยู่ซ้ายหรือคือ mid -> `hi = mid`",
                "เมื่อ `lo == hi` ตัวชี้จะมาบรรจบกันที่ยอดเขาพอดี -> `return lo`",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น / จำลองการทำงาน" },
            {
              t: "table",
              head: ["lo", "hi", "mid", "nums[mid] vs nums[mid+1]", "ความหมาย", "การปรับ"],
              rows: [
                ["0", "6", "3", "nums[3]=3 < nums[4]=5", "ขาขึ้น -> ยอดอยู่ขวา", "lo = mid + 1 = 4"],
                ["4", "6", "5", "nums[5]=6 > nums[6]=4", "ขาลง -> ยอดอยู่ซ้าย/mid", "hi = mid = 5"],
                ["4", "5", "4", "nums[4]=5 < nums[5]=6", "ขาขึ้น -> ยอดอยู่ขวา", "lo = mid + 1 = 5"],
                ["5", "5", "—", "lo == hi", "เจอยอดแล้ว!", "คืนค่า index 5"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        lo = 0
        hi = len(nums) - 1

        # ใช้ lo < hi เพื่อให้หยุดเมื่อ lo ชน hi พอดี
        while lo < hi:
            mid = (lo + hi) // 2

            # ตรวจสอบความชัน
            if nums[mid] < nums[mid + 1]:
                # กำลังเดินขึ้นเขา ยอดเขาต้องอยู่ทางขวาแน่นอน
                lo = mid + 1
            else:
                # กำลังเดินลงเขา ยอดเขาอยู่ทางซ้าย (รวม mid ตัวนี้ด้วย)
                hi = mid

        return lo`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["while lo < hi:", "บีบช่วงเข้าหากันจนกว่าจะเหลือ 1 จุด", "lo และ hi ขยับเข้าหากัน"],
                ["if nums[mid] < nums[mid + 1]: lo = mid + 1", "ปีนขึ้นเขาไปทางขวา", "nums[3]=3 < nums[4]=5 -> lo=4"],
                ["else: hi = mid", "ยอดเขาอยู่ฝั่งซ้ายหรือคือ mid", "nums[5]=6 > nums[6]=4 -> hi=5"],
                ["return lo", "จุดที่ lo และ hi บรรจบกันคือยอดแหลม", "return 5 (ค่า 6)"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(log N)", "ตัดช่วงการค้นหาทิ้งครึ่งหนึ่งในทุกรอบ"],
                ["Space (หน่วยความจำ)", "O(1)", "ใช้เพียงตัวแปร pointer `lo`, `hi`, `mid`"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `A peak element is strictly greater than its neighbors. Find a peak element index in \`O(log n)\` time.`,
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [1,2,3,1]",
              output: "2",
              explain: "Index 2 (value 3) is a peak.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= nums.length <= 1000",
            "-2^31 <= nums[i] <= 2^31 - 1",
            "nums[i] != nums[i + 1] for all valid i.",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Find any local peak in an unsorted array in O(log N) time.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "Compare `nums[mid]` with `nums[mid+1]`. If ascending, a peak must exist to the right. If descending, a peak exists to the left or at `mid`.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Binary search on slopes: `lo = mid + 1` if `nums[mid] < nums[mid+1]`, else `hi = mid`.",
            },

            { t: "h3", c: "Step 4 · Simulation Table" },
            {
              t: "table",
              head: ["lo", "hi", "mid", "nums[mid] vs nums[mid+1]", "Action"],
              rows: [
                ["0", "6", "3", "3 < 5", "lo = 4"],
                ["4", "6", "5", "6 > 4", "hi = 5"],
                ["4", "5", "4", "5 < 6", "lo = 5"],
                ["5", "5", "—", "converged", "return 5"],
              ],
            },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        lo, hi = 0, len(nums) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] < nums[mid + 1]:
                lo = mid + 1
            else:
                hi = mid
        return lo`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["while lo < hi:", "Converge to single peak index", "stops when lo == hi"],
                ["if nums[mid] < nums[mid + 1]:", "Check uphill slope", "climb right"],
                ["else: hi = mid", "Check downhill slope", "peak is at mid or left"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(log N)", "Binary search halving space each step."],
                ["Space", "O(1)", "Constant auxiliary space."],
              ],
            },
          ],
        },
      ],
    },
  },

  "lc75-p56": {
    slug: "lc75-p56",
    title: {
      th: "ข้อ 56 · LC875 Koko Eating Bananas (โกโกะกินกล้วย) 🟡",
      en: "LC875 Koko Eating Bananas 🟡",
    },
    lead: {
      th: "โจทย์ระดับตำนานของ Binary Search on Answer — เดาความเร็ว k แล้วเช็คว่ากินทันภายใน h ชั่วโมงไหม",
      en: "The classic Binary Search on Answer problem — search the minimum eating speed k that finishes all bananas within h hours.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `Koko loves to eat bananas. There are \`n\` piles of bananas, the \`i\`-th pile has \`piles[i]\` bananas. The guards have gone and will come back in \`h\` hours.

Koko can decide her bananas-per-hour eating speed of \`k\`. Each hour, she chooses some pile of bananas and eats \`k\` bananas from that pile. If the pile has less than \`k\` bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer \`k\` such that she can eat all the bananas within \`h\` hours.`,
        },
        {
          t: "p",
          c: `โกโกะชอบกินกล้วย มีกล้วยอยู่ \`n\` กอง โดยกองที่ \`i\` มีกล้วย \`piles[i]\` ลูก ยามจะกลับมาในอีก \`h\` ชั่วโมง
โกโกะสามารถเลือกความเร็วในการกิน \`k\` ลูกต่อชั่วโมง โดยในแต่ละชั่วโมง เธอจะเลือกกินจากกองใดกองหนึ่งได้สูงสุด \`k\` ลูก (ถ้ากองนั้นมีน้อยกว่า \`k\` ลูก เธอก็จะกินจนหมดกองแล้วหยุดพัก ไม่กินกองอื่นต่อในชั่วโมงนั้น)

โกโกะอยากกินให้ช้าที่สุดเท่าที่จะเป็นไปได้ แต่ยังต้องกินกล้วยหมดทุกกองก่อนยามกลับมา

จงหาค่าความเร็ว \`k\` (จำนวนเต็ม) ที่ "น้อยที่สุด" ที่ทำให้กินกล้วยหมดทุกกองได้ทันภายใน \`h\` ชั่วโมง`,
        },
        {
          t: "example",
          c: [
            {
              input: "piles = [3,6,7,11], h = 8",
              output: "4",
              explain:
                "ที่ความเร็ว k = 4:\n• กอง 3 ใช้ ceil(3/4) = 1 ชม.\n• กอง 6 ใช้ ceil(6/4) = 2 ชม.\n• กอง 7 ใช้ ceil(7/4) = 2 ชม.\n• กอง 11 ใช้ ceil(11/4) = 3 ชม.\nเวลารวม = 1 + 2 + 2 + 3 = 8 ชม. ทันกำหนด h = 8 พอดี และเป็นความเร็วต่ำสุดที่ทำได้",
            },
            {
              input: "piles = [30,11,23,4,20], h = 5",
              output: "30",
              explain: "มี 5 กองและมีเวลาแค่ 5 ชั่วโมง ต้องกินกองละ 1 ชม. จึงต้องกินด้วยความเร็วเท่ากองใหญ่สุด คือ 30",
            },
            {
              input: "piles = [30,11,23,4,20], h = 6",
              output: "23",
              explain: "ความเร็ว 23 กินหมดใน 6 ชั่วโมง",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= piles.length <= 10^4",
            "piles.length <= h <= 10^9",
            "1 <= piles[i] <= 10^9",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "ช่วงความเร็วที่เป็นไปได้ของ k คือเท่าไรถึงเท่าไร? (ช้าสุดเท่าไร เร็วสุดเท่าไร?) และถ้าความเร็ว k กินทัน ความเร็ว k + 1 จะกินทันด้วยไหม?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ให้หาความเร็ว `k` ที่ต่ำที่สุดที่ทำให้กินกล้วยทุกกองเสร็จภายในเวลา `<= h` ชั่วโมง โดยในแต่ละกอง ถ้ามีเศษกล้วยเหลือ ก็ยังต้องปัดขึ้นเป็น 1 ชั่วโมงเต็ม (`ceil(pile / k)`)",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "วิเคราะห์ช่วงของคำตอบ (Answer Space):",
            },
            {
              t: "ul",
              c: [
                "ความเร็วช้าสุดที่เป็นไปได้: `lo = 1` (กินชั่วโมงละ 1 ลูก)",
                "ความเร็วเร็วสุดที่จำเป็น: `hi = max(piles)` (กินกองใหญ่สุดหมดใน 1 ชั่วโมง ไม่มีความจำเป็นต้องเร็วกว่านี้)",
                "คุณสมบัติ Monotonic (ขั้นบันได): ถ้ากินด้วยความเร็ว 4 ทัน... ความเร็ว 5, 6, 7 ย่อมกินทันอย่างแน่นอน!",
                "ในทางกลับกัน ถ้าความเร็ว 3 กินไม่ทัน... ความเร็ว 2, 1 ก็ไม่มีทางทันเด็ดขาด!",
                "ดังนั้น เราสามารถรัน Binary Search บนช่วง [1, max(piles)] เพื่อหาจุดตัดความเร็วที่น้อยที่สุดที่กินทันได้!",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: Binary Search on Answer โดยมีฟังก์ชันตรวจสอบว่าความเร็ว `mid` ใช้เวลารวมเกิน `h` หรือไม่",
            },
            {
              t: "p",
              c: "ขั้นตอนตรรกะ:",
            },
            {
              t: "ol",
              c: [
                "ตั้ง `lo = 1`, `hi = max(piles)`",
                "วนลูป `while lo < hi:`",
                "คำนวณความเร็วทดสอบ `mid = (lo + hi) // 2`",
                "คำนวณเวลารวมที่ต้องใช้: `hours = sum((pile + mid - 1) // mid for pile in piles)`",
                "ถ้า `hours <= h`: กินทัน! แปลว่าความเร็ว `mid` ใช้ได้ ลองหาความเร็วที่ช้ากว่านี้ดู -> บีบ `hi = mid`",
                "ถ้า `hours > h`: กินไม่ทัน! แปลว่าช้าเกินไป ต้องเพิ่มความเร็ว -> บีบ `lo = mid + 1`",
                "เมื่อจบการค้นหา `lo` จะชี้ที่ความเร็วน้อยที่สุดที่ยังกินทันพอดี -> `return lo`",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น / จำลองการทำงาน" },
            {
              t: "table",
              head: ["รอบ", "lo", "hi", "ความเร็วทดสอบ (mid)", "เวลารวมที่ใช้ (ชม.)", "ทันไหม (<= 8)?", "การปรับช่วง"],
              rows: [
                ["1", "1", "11", "6", "1 + 1 + 2 + 2 = 6", "ทัน (6 <= 8)", "hi = mid = 6"],
                ["2", "1", "6", "3", "1 + 2 + 3 + 4 = 10", "ไม่ทัน (10 > 8)", "lo = mid + 1 = 4"],
                ["3", "4", "6", "5", "1 + 2 + 2 + 3 = 8", "ทัน (8 <= 8)", "hi = mid = 5"],
                ["4", "4", "5", "4", "1 + 2 + 2 + 3 = 8", "ทัน (8 <= 8)", "hi = mid = 4"],
                ["จบ", "4", "4", "—", "lo == hi", "จบการค้นหา", "ตอบ k = 4"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        lo = 1
        hi = max(piles)

        while lo < hi:
            mid = (lo + hi) // 2

            # คำนวณชั่วโมงรวมที่ต้องใช้ที่ความเร็ว mid
            # (pile + mid - 1) // mid คือการหารปัดเศษขึ้น (ceil)
            hours = sum((p + mid - 1) // mid for p in piles)

            if hours <= h:
                # กินทัน ลองหาความเร็วที่น้อยกว่านี้
                hi = mid
            else:
                # กินไม่ทัน ต้องเพิ่มความเร็ว
                lo = mid + 1

        return lo`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["lo = 1; hi = max(piles)", "กำหนดขอบเขตความเร็วต่ำสุดและสูงสุด", "lo=1, hi=11"],
                ["hours = sum((p + mid - 1) // mid for p in piles)", "รวมเวลาที่กินทุกกองที่ความเร็ว mid", "mid=4 -> hours = 1+2+2+3 = 8"],
                ["if hours <= h: hi = mid", "ถ้าทัน เก็บ mid ไว้และลองหาที่ช้าลง", "8 <= 8 -> hi = 4"],
                ["else: lo = mid + 1", "ถ้าไม่ทัน บังคับเพิ่มความเร็ว", "10 > 8 -> lo = 4"],
                ["return lo", "ส่งคืนความเร็วต่ำสุดที่ทำสำเร็จ", "return 4"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(N log M)", "โดย M = max(piles) และ N คือจำนวนกองกล้วย — รัน Binary Search log(M) รอบ แต่ละรอบวนบวกเวลา N กอง"],
                ["Space (หน่วยความจำ)", "O(1)", "ใช้พื้นที่ตัวแปรคงที่ ไม่มีการสร้าง array ใหม่"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Find the minimum integer eating speed \`k\` such that Koko can eat all bananas across piles within \`h\` hours.`,
        },
        {
          t: "example",
          c: [
            {
              input: "piles = [3,6,7,11], h = 8",
              output: "4",
              explain: "Speed 4 takes 1+2+2+3 = 8 hours.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= piles.length <= 10^4",
            "piles.length <= h <= 10^9",
            "1 <= piles[i] <= 10^9",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Find minimum eating speed `k` such that `sum(ceil(p / k)) <= h`.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "Search range is [1, max(piles)]. Feasibility is monotonic: higher speeds always finish faster. Binary search for the first speed that finishes within `h`.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Binary search on answer `[1, max(piles)]` with integer ceiling formula `(p + mid - 1) // mid`.",
            },

            { t: "h3", c: "Step 4 · Simulation Table" },
            {
              t: "table",
              head: ["lo", "hi", "mid", "Hours Needed", "Feasible?", "Action"],
              rows: [
                ["1", "11", "6", "6", "Yes (<= 8)", "hi = 6"],
                ["1", "6", "3", "10", "No (> 8)", "lo = 4"],
                ["4", "6", "5", "8", "Yes", "hi = 5"],
                ["4", "5", "4", "8", "Yes", "hi = 4"],
                ["4", "4", "—", "converged", "return 4"],
              ],
            },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        lo, hi = 1, max(piles)
        while lo < hi:
            mid = (lo + hi) // 2
            hours = sum((p + mid - 1) // mid for p in piles)
            if hours <= h:
                hi = mid
            else:
                lo = mid + 1
        return lo`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["lo, hi = 1, max(piles)", "Speed boundaries", "1 to 11"],
                ["hours = sum((p + mid - 1) // mid ...)", "Compute total hours at speed mid", "ceil(pile / mid)"],
                ["if hours <= h: hi = mid", "Feasible: try lower speeds", "shrink right boundary"],
                ["else: lo = mid + 1", "Too slow: increase speed", "shrink left boundary"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(N log(max(piles)))", "log(max(piles)) binary search iterations, each taking O(N)."],
                ["Space", "O(1)", "Constant auxiliary space."],
              ],
            },
          ],
        },
      ],
    },
  },
};
