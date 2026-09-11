import type { Page } from "@/lib/types";

export const intervalsPages: Record<string, Page> = {
  "lc75-intro-intervals": {
    slug: "lc75-intro-intervals",
    title: {
      th: "Intervals (ช่วงข้อมูล) — พื้นฐาน & แนวคิด",
      en: "Intervals — Fundamentals & Greedy Overlap Patterns",
    },
    lead: {
      th: "จัดการปัญหาช่วงเวลาหรือพิกัดที่ทับซ้อนกัน ด้วยการจัดเรียง (Sorting) ก่อนเสมอ แล้วใช้ Greedy ตัดสินใจทีละคู่",
      en: "Master interval overlap problems by sorting first and making optimal local greedy decisions on adjacent segments.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "โจทย์หมวด **Intervals (ช่วง)** เป็นโจทย์ที่พบได้บ่อยมากในการสัมภาษณ์งาน โดยข้อมูลแต่ละชิ้นจะอยู่ในรูปช่วง `[start, end]` เช่น ช่วงเวลาการประชุม `[09:00, 10:30]` หรือพิกัดเส้นผ่านศูนย์กลางของวัตถุ `[1, 5]`\n\nคำถามส่วนใหญ่จะวนเวียนอยู่กับ 3 เรื่อง:\n1. ช่วงไหนทับซ้อนกันบ้าง (Overlapping)?\n2. รวมช่วงที่ทับซ้อนเข้าด้วยกัน (Merge Intervals)\n3. ลบหรือเลือกช่วงอย่างไรให้เกิดประโยชน์สูงสุด (Interval Scheduling / Removal)",
        },
        {
          t: "h2",
          c: "ส่วนที่ 1 · นิยามของการ 'ทับซ้อน' (Overlap)",
        },
        {
          t: "p",
          c: "สมมติเรามีสองช่วงคือ $A = [start_A, end_A]$ และ $B = [start_B, end_B]$ โดยที่ $A$ เริ่มก่อนหรือพร้อมกับ $B$ ($start_A \le start_B$):\n- **ทับซ้อนกัน (Overlap):** เกิดขึ้นเมื่อช่วงที่สอง เริ่มต้นก่อนที่ช่วงแรกจะสิ้นสุดลง นั่นคือ $start_B < end_A$\n- **ปลายชนกัน (Touching):** เกิดขึ้นเมื่อ $start_B == end_A$ (ต้องอ่านเงื่อนไขโจทย์ให้ดีว่านับเป็นการทับซ้อนหรือไม่)",
        },
        {
          t: "image",
          src: "/leetcode-75/intervals-merge.gif",
          alt: "Merge intervals: sort by start then glue overlaps",
          caption: "Merge intervals: จัดเรียงตามจุดเริ่ม → หากทับซ้อนกันให้ยืดจุดจบออกไป",
        },
        {
          t: "h2",
          c: "ส่วนที่ 2 · กฎทอง 2 ข้อ: จัดเรียงตามอะไรดี?",
        },
        {
          t: "p",
          c: "กุญแจสำคัญ 99% ของโจทย์หมวดนี้คือ **'ต้อง Sort ก่อนเสมอ'** แต่คำถามคือจะจัดเรียงตามจุดเริ่ม (Start) หรือจุดจบ (End)?",
        },
        {
          t: "table",
          head: ["เป้าหมายของโจทย์", "วิธีจัดเรียงที่เหมาะสม", "เหตุผล"],
          rows: [
            ["รวมช่วงที่ทับซ้อน (Merge Intervals)", "Sort ตาม `start` (`x[0]`)", "ทำให้เราเดินพิจารณาจากซ้ายไปขวาได้ต่อเนื่อง หากทับกันก็ยืด `end` ออก"],
            ["เลือกช่วงให้ได้มากที่สุด / ลบช่วงให้น้อยที่สุด (Interval Scheduling)", "Sort ตาม `end` (`x[1]`)", "การเลือกช่วงที่ 'จบเร็วที่สุด' ก่อน จะเปิดพื้นที่ว่างให้ช่วงถัดๆ ไปได้มากที่สุดเสมอ (Greedy Proof)"],
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "Interval problems involve segments defined by `[start, end]`. The core challenge usually revolves around detecting, merging, or resolving overlaps between segments.",
        },
        {
          t: "h2",
          c: "Part 1 · Definition of Overlap",
        },
        {
          t: "p",
          c: "Assuming intervals are sorted such that interval $A$ starts before or at interval $B$ ($start_A \le start_B$), an overlap occurs if and only if $start_B < end_A$.",
        },
        {
          t: "h2",
          c: "Part 2 · Sorting Strategy: Start vs End",
        },
        {
          t: "p",
          c: "- **Merge Intervals:** Sort by `start` to sequentially extend interval bounds.\n- **Maximize Disjoint Intervals (Activity Selection):** Sort by `end` to greedily pick the earliest finishing segment.",
        },
      ],
    },
  },

  "lc75-p72": {
    slug: "lc75-p72",
    title: {
      th: "ข้อ 72 · LC435 Non-overlapping Intervals (ลบช่วงที่ทับซ้อนให้น้อยที่สุด) 🟡",
      en: "Problem 72 · LC435 Non-overlapping Intervals 🟡",
    },
    lead: {
      th: "หาจำนวนช่วงที่ต้องลบออกน้อยที่สุด เพื่อให้ช่วงที่เหลือไม่ทับซ้อนกันเลย ด้วย Greedy Activity Selection จัดเรียงตามจุดจบ",
      en: "Find the minimum number of intervals to remove so that the remaining intervals do not overlap.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 435: Non-overlapping Intervals**\n\nกำหนดอาร์เรย์ของช่วง `intervals` โดยที่ `intervals[i] = [start_i, end_i]`\nจงหา **จำนวนช่วงที่น้อยที่สุดที่ต้องลบออก** เพื่อให้ช่วงที่เหลืออยู่ทั้งหมด **ไม่ทับซ้อนกันเลย (Non-overlapping)**\n\n**เงื่อนไขสำคัญ:** ช่วงที่มีปลายแตะกันพอดี เช่น `[1, 2]` และ `[2, 3]` **ไม่ถือว่าทับซ้อนกัน**",
        },
        {
          t: "example",
          c: [
            {
              input: "intervals = [[1,2],[2,3],[3,4],[1,3]]",
              output: "1",
              explain: "ลบช่วง [1,3] ออกเพียงช่วงเดียว ที่เหลือ [[1,2],[2,3],[3,4]] จะไม่ทับซ้อนกันเลย",
            },
            {
              input: "intervals = [[1,2],[1,2],[1,2]]",
              output: "2",
              explain: "ต้องลบ [1,2] ออก 2 ช่วง เพื่อให้เหลือช่วงเดียวที่ไม่ทับซ้อน",
            },
            {
              input: "intervals = [[1,2],[2,3]]",
              output: "0",
              explain: "ทั้งสองช่วงแตะปลายกันพอดีที่ 2 ไม่ถือว่าทับซ้อน จึงไม่ต้องลบออกเลย",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= intervals.length <= 10^5",
            "intervals[i].length == 2",
            "-5 * 10^4 <= start_i < end_i <= 5 * 10^4",
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
              c: "โจทย์ถามหา 'จำนวนช่วงที่ต้องลบให้น้อยที่สุด'\nเราสามารถ **พลิกมุมมอง (Inversion Trick)** ได้อย่างชาญฉลาด:\n$$\text{จำนวนช่วงที่ต้องลบให้น้อยที่สุด} = \text{จำนวนช่วงทั้งหมด} - \text{จำนวนช่วงที่เก็บไว้ได้มากที่สุด}$$\n\nการหา 'จำนวนช่วงที่เก็บไว้ได้มากที่สุดโดยไม่ทับซ้อนกัน' คือปัญหาคลาสสิกระดับตำนานที่มีชื่อว่า **Activity Selection Problem** ซึ่งสามารถแก้ไขได้ด้วย Greedy อย่างแม่นยำ!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · กลยุทธ์ Greedy: ทำไมต้อง Sort ตาม End?",
            },
            {
              t: "p",
              c: "ลองจินตนาการว่าคุณมีห้องประชุมห้องเดียว และมีคนจองเวลาเข้ามามากมาย:\n- หากคุณเลือกการประชุมที่ **'เสร็จสิ้นเร็วที่สุด'** (End Time น้อยที่สุด) ห้องประชุมจะว่างเร็วที่สุด ทำให้มีโอกาสรับการประชุมถัดๆ ไปได้มากที่สุด!\n- ดังนั้น เราจะจัดเรียง `intervals` ตามจุดจบ (`x[1]`) จากน้อยไปมากเสมอ",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ",
            },
            {
              t: "ol",
              c: [
                "จัดเรียง `intervals` ตามจุดสิ้นสุด `end` ด้วย `intervals.sort(key=lambda x: x[1])`",
                "ตั้งตัวแปร `kept = 0` (จำนวนช่วงที่เลือกเก็บ) และ `prev_end = -infinity`",
                "วนลูปพิจารณาทีละช่วง `[start, end]`:\n  - หาก `start >= prev_end` (ไม่ทับซ้อนกับช่วงก่อนหน้า): เราเลือกเก็บช่วงนี้ได้! ทำการ `kept += 1` และอัปเดต `prev_end = end`\n  - หาก `start < prev_end` (ทับซ้อน): เราต้องข้ามช่วงนี้ไป (เทียบเท่ากับการลบทิ้ง)",
                "คืนคำตอบคือ `len(intervals) - kept`",
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "p",
              c: "ตัวอย่าง `[[1,2],[2,3],[3,4],[1,3]]` จัดเรียงตาม end ได้ `[[1,2],[1,3],[2,3],[3,4]]`:",
            },
            {
              t: "table",
              head: ["ช่วงที่พิจารณา", "start", "prev_end", "start >= prev_end ?", "การกระทำ", "จำนวนที่เก็บ (kept)"],
              rows: [
                ["[1, 2]", "1", "-inf", "จริง (1 >= -inf)", "เก็บช่วงนี้! prev_end กลายเป็น 2", "1"],
                ["[1, 3]", "1", "2", "เท็จ (1 < 2 ทับซ้อน)", "ข้ามช่วงนี้ (ลบทิ้ง)", "1"],
                ["[2, 3]", "2", "2", "จริง (2 >= 2 แตะปลาย)", "เก็บช่วงนี้! prev_end กลายเป็น 3", "2"],
                ["[3, 4]", "3", "3", "จริง (3 >= 3 แตะปลาย)", "เก็บช่วงนี้! prev_end กลายเป็น 4", "3"],
              ],
            },
            {
              t: "p",
              c: "ผลลัพธ์: เก็บได้ 3 ช่วง จากทั้งหมด 4 ช่วง -> ต้องลบออก $4 - 3 = 1$ ช่วง",
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
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        # จัดเรียงตามจุดสิ้นสุด (end) จากน้อยไปมาก
        intervals.sort(key=lambda x: x[1])
        
        kept = 0
        prev_end = float("-inf")
        
        for start, end in intervals:
            # หากช่วงนี้ไม่ทับซ้อนกับช่วงล่าสุดที่เก็บไว้
            if start >= prev_end:
                kept += 1
                prev_end = end
                
        # จำนวนที่ต้องลบ = จำนวนทั้งหมด - จำนวนที่เก็บไว้ได้
        return len(intervals) - kept`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["intervals.sort(key=lambda x: x[1])", "หัวใจของ Greedy: เลือกช่วงที่จบเร็วที่สุดเพื่อเปิดพื้นที่ว่างสูงสุด"],
                ["kept = 0; prev_end = float('-inf')", "กำหนดค่าเริ่มต้น ให้ช่วงแรกสุดผ่านเงื่อนไขเสมอ"],
                ["if start >= prev_end:", "ใช้เครื่องหมาย >= เพราะปลายชนกันพอดีไม่นับว่าทับซ้อน"],
                ["kept += 1; prev_end = end", "บันทึกการเลือกช่วงนี้ และเลื่อนจุดสิ้นสุดอ้างอิงไปที่ end ของช่วงใหม่"],
                ["return len(intervals) - kept", "คำนวณจำนวนช่วงที่ถูกตัดทิ้ง"],
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
                ["Time (เวลา)", "O(n log n)", "เวลาส่วนใหญ่ใช้ในการจัดเรียง (Sorting) ส่วนลูป Greedy ใช้เพียง $O(n)$"],
                ["Space (หน่วยความจำ)", "O(1)", "ใช้ตัวแปรตัวเลขเพียง 2 ตัว (ใน Python Timsort อาจใช้ memory $O(n)$ สำหรับการจัดเรียง)"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 435: Non-overlapping Intervals**\n\nGiven an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.\n\nNote that intervals which only touch at a point are non-overlapping. For example, `[1, 2]` and `[2, 3]` are non-overlapping.",
        },
        {
          t: "example",
          c: [
            {
              input: "intervals = [[1,2],[2,3],[3,4],[1,3]]",
              output: "1",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= intervals.length <= 10^5",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · Inversion to Activity Selection",
            },
            {
              t: "p",
              c: "Minimizing removals is equivalent to maximizing the count of mutually non-overlapping intervals kept. Sort intervals by their ending coordinates `x[1]`. Greedily retain every interval whose start is greater than or equal to the previous interval\'s end.",
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
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: x[1])
        kept = 0
        prev_end = float("-inf")
        for start, end in intervals:
            if start >= prev_end:
                kept += 1
                prev_end = end
        return len(intervals) - kept`,
            },
            {
              t: "h2",
              c: "Step 3 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(n \log n)$ dominated by sorting.\n- **Space Complexity:** $O(1)$ auxiliary space.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p73": {
    slug: "lc75-p73",
    title: {
      th: "ข้อ 73 · LC452 Minimum Number of Arrows to Burst Balloons (ยิงลูกศรเจาะลูกโป่ง) 🟡",
      en: "Problem 73 · LC452 Minimum Number of Arrows to Burst Balloons 🟡",
    },
    lead: {
      th: "หาจำนวนลูกศรน้อยที่สุดในการเจาะลูกโป่งทุกลูก โดยจัดเรียงตามจุดจบแล้วเล็งยิงที่ขอบขวาสุดของแต่ละกลุ่ม",
      en: "Find the minimum number of vertical arrows required to burst all 2D interval balloons.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 452: Minimum Number of Arrows to Burst Balloons**\n\nมีลูกโป่งติดอยู่บนกำแพงระนาบ 2D โดยแต่ละลูกแทนด้วยช่วงพิกัดแนวนอน `points[i] = [x_start, x_end]`\nคุณสามารถยิงลูกศรขึ้นตรงๆ ในแนวแกน Y จากพิกัด $x$ ใดๆ ได้\n\nลูกศรที่ยิงที่พิกัด $x$ จะ **เจาะทะลุลูกโป่งทุกลูกที่มีช่วงครอบคลุม $x$** (นั่นคือ $x_{start} \le x \le x_{end}$)\nลูกศรหนึ่งดอกสามารถเจาะลูกโป่งได้ไม่จำกัดจำนวนลูกตราบใดที่อยู่ในแนวเดียวกัน\n\nจงหา **จำนวนลูกศรที่น้อยที่สุด** ที่ต้องใช้เพื่อยิงลูกโป่งทุกลูกให้แตกทั้งหมด",
        },
        {
          t: "example",
          c: [
            {
              input: "points = [[10,16],[2,8],[1,6],[7,12]]",
              output: "2",
              explain: "ยิงดอกที่ 1 ที่ x = 6 (เจาะลูก [2,8] และ [1,6])\nยิงดอกที่ 2 ที่ x = 12 หรือ 11 (เจาะลูก [10,16] และ [7,12])\nรวมใช้ 2 ดอก",
            },
            {
              input: "points = [[1,2],[3,4],[5,6],[7,8]]",
              output: "4",
              explain: "ลูกโป่งไม่มีส่วนใดซ้อนทับกันเลย ต้องยิงแยกคนละดอก รวม 4 ดอก",
            },
            {
              input: "points = [[1,2],[2,3],[3,4],[4,5]]",
              output: "2",
              explain: "ยิงที่ x = 2 (เจาะ [1,2] และ [2,3]) และยิงที่ x = 4 (เจาะ [3,4] และ [4,5]) รวม 2 ดอก",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= points.length <= 10^5",
            "points[i].length == 2",
            "-2^31 <= x_start < x_end <= 2^31 - 1",
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
              c: "เราต้องการ 'รวมกลุ่มช่วงที่ซ้อนทับกัน' โดยในแต่ละกลุ่ม ให้ยิงลูกศรเพียง 1 ดอกเพื่อเจาะลูกโป่งในกลุ่มนั้นให้แตกพร้อมกันทั้งหมด\nเป้าหมายคือ: **จัดกลุ่มช่วงที่ซ้อนทับกันให้ได้จำนวนกลุ่มน้อยที่สุด**",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · กลยุทธ์ Greedy: เล็งยิงที่จุดสิ้นสุดเสมอ",
            },
            {
              t: "p",
              c: "หากเราจัดเรียงลูกโป่งตามจุดสิ้นสุด `x_end` จากน้อยไปมาก:\nลูกโป่งลูกแรกสุดจะจบที่ตำแหน่ง `points[0][1]`\n- คำถามคือ: เราควรยิงลูกศรดอกแรกที่ตำแหน่ง $x$ ใดเพื่อให้คุ้มค่าที่สุด?\n- คำตอบคือ: **ยิงที่ขอบขวาสุดของลูกโป่งลูกแรก (`arrow_x = points[0][1]`)**\n\nทำไม? เพราะการยิงที่ตำแหน่งขวาสุดของมัน จะการันตีว่าลูกแรกแตกแน่นอน 100% และเปิดโอกาสให้ลูกโป่งลูกอื่นๆ ที่อยู่ถัดไปทางขวาถูกยิงทะลุไปด้วยมากที่สุดเท่าที่จะเป็นไปได้!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ",
            },
            {
              t: "ol",
              c: [
                "หาก `points` ว่างเปล่า ให้คืนค่า `0`",
                "จัดเรียง `points` ตามจุดสิ้นสุด `x[1]` จากน้อยไปมาก",
                "ยิงลูกศรดอกแรก: กำหนด `arrows = 1` และเล็งพิกัดที่ `arrow_x = points[0][1]`",
                "วนลูปดูลูกโป่งลูกถัดไป `[start, end]`:\n  - หาก `start > arrow_x`: ลูกโป่งลูกนี้อยู่เลยพิกัดลูกศรเดิมไปแล้ว ลูกศรเดิมไม่โดนแน่นอน! เราจำเป็นต้องยิงลูกศรใหม่: `arrows += 1` และย้ายพิกัดเล็งไปที่ขอบขวาของลูกใหม่ `arrow_x = end`\n  - หาก `start <= arrow_x`: ลูกโป่งลูกนี้ครอบคลุมพิกัดลูกศรเดิมอยู่แล้ว มันจะแตกพร้อมกับลูกก่อนหน้าโดยอัตโนมัติ! ไม่ต้องทำอะไรเพิ่ม",
                "คืนค่า `arrows`",
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "p",
              c: "ตัวอย่าง `points = [[10,16],[2,8],[1,6],[7,12]]` จัดเรียงตาม end ได้ `[[1,6],[2,8],[7,12],[10,16]]`:",
            },
            {
              t: "table",
              head: ["ลูกโป่ง", "start", "arrow_x ปัจจุบัน", "start > arrow_x ?", "ผลลัพธ์", "จำนวนลูกศร (arrows)"],
              rows: [
                ["[1, 6]", "1", "6 (ยิงดอกแรกที่ 6)", "-", "ลูกแรกแตกแน่นอน", "1"],
                ["[2, 8]", "2", "6", "เท็จ (2 <= 6)", "แตกด้วยลูกศรเดิมที่ x=6 ฟรี!", "1"],
                ["[7, 12]", "7", "6", "จริง (7 > 6)", "พ้นระยะ! ต้องยิงดอกใหม่ที่ x=12", "2"],
                ["[10, 16]", "10", "12", "เท็จ (10 <= 12)", "แตกด้วยลูกศรดอกที่สองที่ x=12 ฟรี!", "2"],
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
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        if not points:
            return 0
            
        # จัดเรียงตามจุดสิ้นสุด (x_end) จากน้อยไปมาก
        points.sort(key=lambda x: x[1])
        
        arrows = 1
        arrow_x = points[0][1]  # เล็งยิงดอกแรกที่ปลายขวาของลูกแรก
        
        for start, end in points[1:]:
            # หากลูกโป่งลูกนี้เริ่มต้นเลยตำแหน่งลูกศรเดิม
            if start > arrow_x:
                arrows += 1
                arrow_x = end   # เล็งยิงดอกใหม่ที่ปลายขวาของลูกนี้
                
        return arrows`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["if not points: return 0", "ป้องกัน Edge Case กรณีอาร์เรย์ว่างเปล่า"],
                ["points.sort(key=lambda x: x[1])", "จัดเรียงตาม x_end เพื่อให้ลูกโป่งที่จบก่อนอยู่ข้างหน้า"],
                ["arrows = 1; arrow_x = points[0][1]", "เตรียมยิงดอกแรกที่จุดสิ้นสุดของลูกแรกเพื่อกวาดลูกโป่งให้ได้มากที่สุด"],
                ["if start > arrow_x:", "ใช้เครื่องหมาย > เพราะหาก start == arrow_x ลูกศรยังคงเจาะโดนขอบลูกโป่งพอดี"],
                ["arrows += 1; arrow_x = end", "ยิงลูกศรใหม่และอัปเดตพิกัดเป้าหมายใหม่"],
                ["return arrows", "คืนจำนวนลูกศรทั้งหมดที่ต้องใช้"],
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
                ["Time (เวลา)", "O(n log n)", "เวลาส่วนใหญ่หมดไปกับการจัดเรียง (Sorting) ส่วนการตรวจลูปใช้เพียง $O(n)$"],
                ["Space (หน่วยความจำ)", "O(1)", "ใช้ตัวแปรคงที่เพียง 2 ตัว (`arrows`, `arrow_x`)"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 452: Minimum Number of Arrows to Burst Balloons**\n\nThere are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array `points` where `points[i] = [x_start, x_end]` denotes a balloon whose horizontal diameter stretches between $x_{start}$ and $x_{end}$.\n\nAn arrow can be shot vertically up in the Y-direction from any $x$ coordinate. It bursts any balloon satisfying $x_{start} \le x \le x_{end}$. Return the minimum number of arrows that must be shot to burst all balloons.",
        },
        {
          t: "example",
          c: [
            {
              input: "points = [[10,16],[2,8],[1,6],[7,12]]",
              output: "2",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= points.length <= 10^5",
            "-2^31 <= x_start < x_end <= 2^31 - 1",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · Greedy Strategy",
            },
            {
              t: "p",
              c: "Sort balloons by their end coordinate `x[1]`. Fire the first arrow at the end coordinate of the first balloon (`points[0][1]`). For each subsequent balloon, if its start exceeds the arrow coordinate (`start > arrow_x`), an additional arrow must be fired at that balloon\'s end.",
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
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        if not points:
            return 0
        points.sort(key=lambda x: x[1])
        arrows = 1
        arrow_x = points[0][1]
        for start, end in points[1:]:
            if start > arrow_x:
                arrows += 1
                arrow_x = end
        return arrows`,
            },
            {
              t: "h2",
              c: "Step 3 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(n \log n)$ due to sorting.\n- **Space Complexity:** $O(1)$ constant auxiliary memory.",
            },
          ],
        },
      ],
    },
  },
};
