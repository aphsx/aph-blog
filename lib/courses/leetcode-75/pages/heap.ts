import type { Page } from "@/lib/types";

export const heapPages: Record<string, Page> = {
  "lc75-intro-heap": {
    slug: "lc75-intro-heap",
    title: { th: "Heap / Priority Queue — พื้นฐาน & แนวคิด", en: "Heap / Priority Queue — Fundamentals & Mental Models" },
    lead: {
      th: "กองที่เก็บให้ root เป็นค่าน้อยสุดเสมอ — ใส่และหยิบสุดขั้วได้เร็ว โดยไม่ต้องเรียงทั้งแถวทุกครั้ง",
      en: "A tree structure where the root is always the extremum — fast inserts and extractions without full sorting.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "ในโปรแกรมจริง บางงานต้องถามซ้ำ ๆ ว่า \"ตอนนี้ตัวที่น้อยที่สุด (หรือมากที่สุด) คือตัวไหน แล้วหยิบมันออก\" เช่น คิวงานที่เรียงตามความเร่งด่วน ตารางคะแนนที่อยากรู้คนนำตลอด หรือกองงานที่ต้องหยิบชิ้นถูกสุดก่อน — ถ้าเก็บแค่ list ธรรมดา ทุกครั้งที่หาตัวน้อยสุดต้องไล่ทั้งแถว",
        },
        {
          t: "p",
          c: "หมวด Binary Tree คุณเห็นต้นไม้สองแขนงแล้ว หน้านี้เอาโครงต้นไม้มาใช้แบบพิเศษ: ไม่สนใจลำดับซ้าย-ขวาแบบ BST แต่บังคับกฎว่าพ่อต้องไม่แย่กว่าลูก (สำหรับ min-heap) เพื่อให้ค่าน้อยสุดอยู่ที่รากเสมอ — ชื่อ heap (ฮีป) หรือ priority queue (คิวลำดับความสำคัญ)",
        },

        { t: "h2", c: "ส่วนที่ 1 · Heap คืออะไร ทำไมต้องมี" },
        {
          t: "p",
          c: "heap คือโครงสร้างที่ออกแบบมาเพื่อตอบคำถามเดียวให้เร็ว: ค่าสุดขั้วตอนนี้คืออะไร แล้วหยิบออกได้โดยไม่ทำลายกฎของกอง",
        },
        {
          t: "ul",
          c: [
            "ถ้าเก็บ list แล้วหา `min` ทุกครั้ง = O(n) ต่อครั้ง · ทำซ้ำหลายรอบแพง",
            "ถ้า `sorted` ทั้งแถวทุกครั้งที่ข้อมูลเปลี่ยน = O(n log n) ต่อรอบ · แพงกว่าเมื่อเปลี่ยนทีละตัว",
            "heap ทำให้ peek (แอบดูโดยไม่หยิบ) ค่าน้อยสุดได้ O(1) และ push/pop ได้ประมาณ O(log n)",
          ],
        },
        {
          t: "callout",
          title: "ศัพท์ที่จะใช้ต่อ",
          c: "min-heap = กองที่รากคือน้อยสุด · max-heap = กองที่รากคือมากสุด · root (ราก) = โหนดบนสุด · parent / child = พ่อ / ลูก · bubble up = ตัวใหม่ลอยขึ้นเทียบพ่อ · sift down = ตัวบนจมลงเทียบลูก",
        },

        { t: "h2", c: "ส่วนที่ 2 · กฏ heap + เก็บใน list" },
        {
          t: "p",
          c: "ภาพในหัวของ min-heap คือ binary tree (ต้นไม้สองแขนง) ที่ทุกโหนดต้องเป็นไปตามกฏ: ค่าของพ่อ ≤ ค่าของลูกทั้งสอง · ผลคือ root เป็นค่าน้อยสุดของทั้งกองเสมอ",
        },
        {
          t: "ul",
          c: [
            "ไม่ต้องมี pointer แยก — เก็บเป็น `list` แถวเดียวตามลำดับชั้น (level-order)",
            "ลูกซ้ายของช่อง i อยู่ที่ index `2*i + 1`",
            "ลูกขวาอยู่ที่ `2*i + 2`",
            "พ่อของช่อง i อยู่ที่ `(i - 1) // 2`",
          ],
        },
        {
          t: "p",
          c: "ตัวอย่างทั้งหน้า (ภาพนิ่ง): arr = [1, 3, 2, 7, 4, 5] · root = 1 · ทุกพ่อ ≤ ลูก",
        },
        { t: "viz", id: "heap-shape" },
        {
          t: "codeout",
          lang: "python",
          label: "อ่าน list แล้วหาลูกจาก index",
          code: `arr = [1, 3, 2, 7, 4, 5]
print("root:", arr[0])

i = 0
left = 2 * i + 1
right = 2 * i + 2
print("ลูกของ root:", arr[left], arr[right])

j = 3  # ค่า 7
parent = (j - 1) // 2
print("พ่อของ 7 คือ index", parent, "ค่า =", arr[parent])`,
          out: `root: 1
ลูกของ root: 3 2
พ่อของ 7 คือ index 1 ค่า = 3`,
        },

        { t: "h2", c: "ส่วนที่ 3 · heapq ใน Python — เครื่องมือทีละชิ้น" },
        {
          t: "p",
          c: "Python มีโมดูลมาตรฐาน `heapq` ที่มอง `list` เป็น min-heap ให้เลย — ไม่ต้องเขียน bubble/sift เองในหมวดนี้ แต่ต้องรู้ว่าแต่ละคำสั่งทำอะไรกับกอง",
        },
        {
          t: "ul",
          c: [
            "`import heapq` — ยืมโมดูลเข้ามาใช้",
            "`h = []` — กองเริ่มว่าง (list เปล่า)",
            "`heapq.heappush(h, x)` — ใส่ x ท้ายแล้วจัดให้กฏ heap ยังถูก · O(log n)",
            "`h[0]` — แอบดู root (ค่าน้อยสุด) โดยไม่หยิบออก · O(1)",
            "`heapq.heappop(h)` — หยิบ root ออก แล้วจัดกองใหม่ · O(log n)",
            "`heapq.heapify(nums)` — แปลง list ทั้งก้อนเป็น heap ในที่เดิม · O(n) เร็วกว่า push ทีละตัว",
          ],
        },
        {
          t: "p",
          c: "ชิ้นที่ 1 · ว่าง → push ทีละตัว → peek → pop สองครั้ง — ตัวอย่างเดียวกับ Interactive ด้านล่าง",
        },
        {
          t: "codeout",
          lang: "python",
          label: "push / peek / pop บน min-heap",
          code: `import heapq

h = []
heapq.heappush(h, 5)
heapq.heappush(h, 1)
heapq.heappush(h, 3)
print("หลัง push:", h)
print("peek root:", h[0])
print("pop:", heapq.heappop(h))
print("pop:", heapq.heappop(h))
print("เหลือ:", h)`,
          out: `หลัง push: [1, 5, 3]
peek root: 1
pop: 1
pop: 3
เหลือ: [5]`,
        },
        {
          t: "ul",
          c: [
            "หลัง push ครบ list ไม่จำเป็นเรียงจากน้อยไปมากทั้งแถว — สำคัญแค่ `h[0]` เป็นน้อยสุด และทุกพ่อ ≤ ลูก",
            "ตอน `heappush(1)` เข้าไปใน `[5]` ระบบใส่ท้ายแล้ว bubble up สลับกับพ่อจน root เป็น 1",
            "`heappop` หยิบ 1 ออก แล้วย้ายตัวท้ายขึ้น root แล้ว sift down ให้กฏกลับมาถูกต้อง",
          ],
        },
        { t: "h3", c: "ดูทีละขั้น (Interactive)" },
        {
          t: "p",
          c: "กด **Next ▶** ตัวอย่างเดียวกับโค้ดด้านบน: push 5, 1, 3 แล้ว peek / pop · ทอง = โฟกัส · เขียว = พ่อ · ส้ม = ลูกตอนเทียบ · แถบล่าง = list ที่เก็บ heap",
        },
        { t: "viz", id: "heap-push-pop" },

        {
          t: "p",
          c: "ชิ้นที่ 2 · `heapify` — มี list พร้อมแล้ว อยากให้เป็น heap ทั้งก้อนโดยไม่ push ทีละตัว",
        },
        {
          t: "codeout",
          lang: "python",
          label: "heapify list ทั้งก้อน",
          code: `import heapq

nums = [9, 4, 7, 1, 2]
heapq.heapify(nums)  # จัดในที่เดิม · O(n)
print("หลัง heapify:", nums)
print("pop ครั้งแรก:", heapq.heappop(nums))`,
          out: `หลัง heapify: [1, 2, 7, 4, 9]
pop ครั้งแรก: 1`,
        },
        {
          t: "p",
          c: "หน้าตาหลัง `heapify` อาจไม่เหมือนตอน push ทีละตัว แต่กฏพ่อ ≤ ลูกยังครบ และ `nums[0]` ยังเป็นน้อยสุดเสมอ",
        },

        { t: "h2", c: "ส่วนที่ 4 · อยากได้ max-heap ใช้ค่าติดลบ" },
        {
          t: "p",
          c: "`heapq` ใน Python เป็น min-heap อย่างเดียว — pop ได้แค่น้อยสุด ถ้าต้องการมากสุด ให้เก็บค่าติดลบ: ตัวที่มากที่สุดของค่าจริง จะกลายเป็นตัวที่น้อยที่สุดของค่าลบ",
        },
        {
          t: "ul",
          c: [
            "`heapq.heappush(max_heap, -x)` — ใส่ค่าลบแทนค่าจริง",
            "`-heapq.heappop(max_heap)` — หยิบออกแล้วคูณ −1 กลับ เป็นค่าจริง",
          ],
        },
        {
          t: "codeout",
          lang: "python",
          label: "จำลอง max-heap ด้วยค่าลบ",
          code: `import heapq

max_heap = []
for x in [5, 1, 8, 3]:
    heapq.heappush(max_heap, -x)

print("ในกอง (ค่าลบ):", max_heap)
print("peek แบบค่าจริง:", -max_heap[0])
biggest = -heapq.heappop(max_heap)
print("pop มากสุด:", biggest)`,
          out: `ในกอง (ค่าลบ): [-8, -3, -5, -1]
peek แบบค่าจริง: 8
pop มากสุด: 8`,
        },

        { t: "h2", c: "ส่วนที่ 5 · nlargest / nsmallest (ตัวช่วยสั้น)" },
        {
          t: "p",
          c: "ถ้าต้องการแค่ k ตัวมากสุดหรือน้อยสุดจากข้อมูลที่จบแล้ว (ไม่ต้องอัปเดตทีละตัว) `heapq` มีตัวช่วยสำเร็จรูป — ข้างในใช้ heap ให้ แต่เรียกบรรทัดเดียว",
        },
        {
          t: "codeout",
          lang: "python",
          label: "nlargest / nsmallest",
          code: `import heapq

nums = [4, 10, 1, 7, 3, 9]
print(heapq.nlargest(3, nums))
print(heapq.nsmallest(2, nums))

words = ["apple", "kiwi", "banana"]
print(heapq.nlargest(1, words, key=len))`,
          out: `[10, 9, 7]
[1, 3]
['banana']`,
        },

        { t: "h2", c: "ส่วนที่ 6 · สรุป operation และราคา" },
        {
          t: "table",
          head: ["สิ่งที่ทำ", "คำสั่ง", "เวลาโดยประมาณ"],
          rows: [
            ["สร้างกองว่าง", "`h = []`", "O(1)"],
            ["ใส่ค่า", "`heapq.heappush(h, x)`", "O(log n)"],
            ["แอบดูน้อยสุด", "`h[0]`", "O(1)"],
            ["หยิบน้อยสุดออก", "`heapq.heappop(h)`", "O(log n)"],
            ["แปลง list ทั้งก้อน", "`heapq.heapify(nums)`", "O(n)"],
            ["หา min จาก list ธรรมดา", "`min(nums)`", "O(n)"],
          ],
        },
        {
          t: "p",
          c: "n = จำนวนสมาชิกในกอง — อ้างอิง Big-O เพิ่มได้ที่หน้า lc75-bigo · เลือก heap เมื่อต้องหยิบ/ใส่ค่าสุดขั้วซ้ำ ๆ โดยที่ข้อมูลเปลี่ยนทีละชิ้น",
        },
        {
          t: "table",
          head: ["มิติ", "list + min ทุกครั้ง", "heap (min-heap)"],
          rows: [
            ["ดูค่าน้อยสุด", "O(n) ไล่ทั้งแถว", "O(1) ที่ root"],
            ["ใส่ค่าใหม่แล้วอยากรู้ min", "ใส่ O(1) แต่หาใหม่ O(n)", "push O(log n) แล้ว peek O(1)"],
            ["เรียงทั้งก้อน", "`sorted` O(n log n)", "ไม่เรียงทั้งก้อน — จัดแค่กฏพ่อ-ลูก"],
          ],
        },
        {
          t: "callout",
          title: "ของที่ยังไม่สอนในหน้านี้",
          c: "เส้นทางสั้นสุดบนกราฟที่มีน้ำหนักไม่เท่ากัน (เช่น Dijkstra) และการสร้างต้นไม้ Huffman → ยังไม่ต้องใน intro นี้",
        },
        {
          t: "p",
          c: "พร้อมแล้วไปข้อแรกของหมวดได้จากแถบนำทางด้านล่าง",
        },
      ],
      en: [
        {
          t: "p",
          c: "In real-world applications, systems frequently ask: 'What is the current minimum (or maximum) element, and can we extract it quickly?' A binary heap or priority queue provides O(1) peek and O(log N) insertion/extraction.",
        },
        {
          t: "h2",
          c: "Part 1 · What is a Heap?",
        },
        {
          t: "p",
          c: "A binary heap satisfies the heap property: in a min-heap, every parent node has a value less than or equal to its children. Thus, the minimum element always rests at the root (`h[0]`).",
        },
        {
          t: "h2",
          c: "Part 2 · Python's heapq Module",
        },
        {
          t: "ul",
          c: [
            "`heapq.heappush(h, x)` — pushes x and restores heap invariant in O(log N).",
            "`h[0]` — inspects root in O(1).",
            "`heapq.heappop(h)` — pops and returns minimum in O(log N).",
            "`heapq.heapify(list)` — transforms list into heap in-place in O(N).",
          ],
        },
      ],
    },
  },

  "lc75-p49": {
    slug: "lc75-p49",
    title: {
      th: "ข้อ 49 · LC215 Kth Largest Element in an Array 🟡",
      en: "49 · LC215 Kth Largest Element in an Array 🟡",
    },
    lead: { th: "", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `กำหนด integer array nums และ integer k ให้ return องค์ประกอบที่ใหญ่เป็นอันดับที่ k ใน array

หมายเหตุ: คือองค์ประกอบที่ใหญ่เป็นอันดับที่ k ในลำดับที่เรียงแล้ว ไม่ใช่ค่าที่ต่างกันอันดับที่ k

Follow up: คุณสามารถแก้โดยไม่ sorting ได้ไหม?`,
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [3,2,1,5,6,4], k = 2",
              output: "5",
            },
            {
              input: "nums = [3,2,3,1,2,4,5,5,6], k = 4",
              output: "4",
            },
          ],
        },
        {
          t: "constraints",
          c: ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "อ่านโจทย์กับตัวอย่างให้ครบ แล้วลองเขียนเองก่อน ถ้าติดค่อยเปิดเฉลย",
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "ได้แถวตัวเลขที่ยังไม่เรียง กับเลข k — อยากรู้ว่าถ้าเรียงจากมากไปน้อยแล้ว ค่าที่อยู่ตำแหน่งอันดับ k คืออะไร · นับค่าซ้ำด้วย (เช่น มี 5 สองตัว ก็เป็นสองอันดับ) ไม่ใช่ถามค่าที่ไม่ซ้ำอันดับ k",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "Example 1: nums = [3, 2, 1, 5, 6, 4], k = 2",
            },
            {
              t: "ul",
              c: [
                "เรียงจากมากไปน้อยได้ [6, 5, 4, 3, 2, 1]",
                "อันดับ 1 = 6 · อันดับ 2 = 5 → คำตอบ 5",
              ],
            },
            {
              t: "p",
              c: "Example 2: nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4 → เรียง [6, 5, 5, 4, …] อันดับ 4 = 4",
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "วิธีตรง: เรียงทั้งแถวแล้วหยิบตำแหน่ง k — ถูก แต่เมื่อ n สูงถึง 10^5 การ sort ทั้งก้อนทุกครั้งแพงกว่าที่จำเป็น เราต้องการแค่รู้ค่าอันดับ k ไม่ต้องเรียงทุกตัว",
            },
            {
              t: "p",
              c: "ไอเดีย: เก็บไว้แค่ k ตัวที่ใหญ่ที่สุดที่เจอมาจนถึงตอนนี้ · ในกลุ่ม k ตัวนั้น ตัวที่เล็กที่สุดคือตัวมากอันดับ k ของกลุ่มนั้น พอไล่ครบทั้งแถว ตัวเล็กสุดในกลุ่ม = คำตอบ ของที่ต้องประกอบ:",
            },
            {
              t: "ul",
              c: [
                "เปลือก `class Solution` + `self` — editor ของ LeetCode บังคับห่อเมธอดตามลายเซ็น",
                "`heap` (list ที่ใช้เป็น min-heap) — กองเก็บผู้สมัคร top-k · root = น้อยสุดในกลุ่ม",
                "`heapq.heappush` / `heappop` — ใส่และหยิบน้อยสุด ตามหน้าแนวคิด Heap",
                "`len(heap) > k` แล้ว pop — ทิ้งตัวที่เล็กเกินกว่าจะติด top-k",
                "`heap[0]` — แอบดู root เป็นคำตอบหลังจบลูป",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 0 · เปลือกที่วางใน LeetCode",
            },
            {
              t: "code",
              lang: "python",
              label: "ลายเซ็นที่ editor ใส่ให้ — ยังไม่มีคำตอบข้างใน",
              c: `class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        ...`,
            },
            {
              t: "ul",
              c: [
                "`self` = อ็อบเจกต์ที่ LeetCode สร้างให้ ห้ามลบ แม้ข้อนี้ไม่ใช้ `self.xxx`",
                "`nums: List[int]` = แถวจำนวนเต็ม · `k: int` = อันดับที่ต้องการ · `-> int` = คืนค่าหนึ่งตัว",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 1 · กองว่าง + วนทีละตัวจาก nums",
            },
            {
              t: "code",
              lang: "python",
              label: "โครงลูป — ยังไม่จำกัดขนาด",
              c: `heap = []
for x in nums:
    heapq.heappush(heap, x)  # ใส่ x เข้า min-heap`,
            },
            {
              t: "p",
              c: "ถ้าทำแค่นี้จนจบ แล้ว pop ออก n−k ครั้ง ก็ได้คำตอบ แต่กองจะโตถึง n · เราอยากให้กองยาวไม่เกิน k",
            },

            {
              t: "p",
              c: "ชิ้นที่ 2 · ถ้ายาวเกิน k ให้ทิ้งตัวน้อยสุดทันที",
            },
            {
              t: "code",
              lang: "python",
              label: "จำกัดขนาดกอง = k",
              c: `heapq.heappush(heap, x)
if len(heap) > k:
    heapq.heappop(heap)  # ทิ้งตัวเล็กเกิน top-k`,
            },
            {
              t: "ul",
              c: [
                "ทำไมเป็น min-heap ไม่ใช่ max-heap? — อยากให้ตัวเล็กสุดในกลุ่ม top-k ถูกเขี่ยออกได้ง่ายที่ root",
                "บน Example 1 หลังเจอ 3 และ 2 กอง = [2, 3] · เจอ 1 แล้วยาว 3 → pop 1 ทิ้ง เหลือ [2, 3]",
                "จบทั้งแถวเหลือ [5, 6] · `heap[0] = 5` = อันดับ 2",
              ],
            },
            {
              t: "p",
              c: "ประกอบ: เปลือกตามชิ้นที่ 0 → สร้าง heap ว่าง → วน nums ตามชิ้นที่ 1–2 → `return heap[0]`",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** ตัวอย่างเดียวกับขั้นมือ: Example 1 · nums = [3, 2, 1, 5, 6, 4], k = 2 · แถวบน = nums · ทอง = ตัวที่กำลังดู · กองล่าง = min-heap ยาวไม่เกิน 2 · ส้ม = ตัวที่ถูกทิ้ง",
            },
            { t: "viz", id: "kth-largest" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "p",
              c: "บล็อกด้านล่างจัดหน้าตาให้ตรง editor ของ LeetCode: ลายเซ็นหนึ่งบรรทัด ใช้ `List[...]` ตาม template · import ที่ template ไม่โชว์ comment ไว้ด้านบน · โค้ดที่ต้องเขียนจริงเริ่มที่ `class Solution:`",
            },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `# import heapq  # LeetCode ไม่โชว์ใน template — ใส่เองถ้ารันบนเครื่อง
# List ในลายเซ็น — LeetCode import ให้แล้ว ไม่ต้องพิมพ์ from typing import List

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        heap = []  # min-heap เก็บผู้สมัคร top-k
        for x in nums:
            heapq.heappush(heap, x)
            if len(heap) > k:
                heapq.heappop(heap)  # ทิ้งตัวเล็กเกินกลุ่ม
        return heap[0]  # น้อยสุดใน top-k = อันดับ k`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                "`class Solution` กับ `self` ตามชิ้นที่ 0 — เปลือกที่ editor บังคับ",
                "`heap = []` ตามชิ้นที่ 1 — กองว่างก่อนวน",
                "Example 1 ใส่ 3 แล้ว 2 ได้ [2, 3] ยาว = k ยังไม่ pop",
                "ใส่ 1 แล้วยาว 3 → pop 1 ทิ้ง ตามชิ้นที่ 2",
                "ใส่ 5, 6, 4 ทีละตัว แต่ละครั้งที่เกิน k จะเขี่ยตัวเล็กสุดออก จนเหลือ [5, 6]",
                "`return heap[0]` ได้ 5 ตรง Output ของ Example 1",
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(n log k) — วน n ตัว แต่ละครั้ง push/pop บนกองยาวไม่เกิน k · หน่วยความจำ O(k) จาก heap (ดีกว่า sort ทั้งแถว O(n log n) เมื่อ k เล็กกว่า n มาก)",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?`,
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [3,2,1,5,6,4], k = 2",
              output: "5",
            },
            {
              input: "nums = [3,2,3,1,2,4,5,5,6], k = 4",
              output: "4",
            },
          ],
        },
        {
          t: "constraints",
          c: ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
        },
      ],
    },
  },

  "lc75-p50": {
    slug: "lc75-p50",
    title: {
      th: "ข้อ 50 · LC2336 Smallest Number in Infinite Set (เลขน้อยสุดเซ็ตอนันต์) 🟡",
      en: "LC2336 Smallest Number in Infinite Set 🟡",
    },
    lead: {
      th: "ออกแบบ Class จัดการเซ็ตจำนวนเต็มบวก 1, 2, 3... ถึงอนันต์ — ใช้ตัวนับ current เดินหน้า และ min-heap เก็บเลขที่ถูกเพิ่มกลับมา",
      en: "Design an infinite set of positive integers using a current counter and a min-heap for re-added numbers.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `You have a set which contains all positive integers \`[1, 2, 3, 4, 5, ...]\`.

Implement the \`SmallestInfiniteSet\` class:

• \`SmallestInfiniteSet()\` Initializes the \`SmallestInfiniteSet\` object to contain all positive integers.
• \`int popSmallest()\` Removes and returns the smallest integer contained in the infinite set.
• \`void addBack(int num)\` Adds a positive integer \`num\` back into the infinite set, if it is not already in the infinite set.`,
        },
        {
          t: "p",
          c: `คุณมีเซ็ตที่บรรจุจำนวนเต็มบวกทั้งหมด \`[1, 2, 3, 4, 5, ...]\` ตั้งแต่เริ่มต้น

ให้ implement class \`SmallestInfiniteSet\`:
• \`SmallestInfiniteSet()\` กำหนดค่าเริ่มต้นให้เซ็ตบรรจุจำนวนเต็มบวกทั้งหมด
• \`int popSmallest()\` ลบและส่งคืนตัวเลขที่น้อยที่สุดที่ยังคงอยู่ในเซ็ต
• \`void addBack(int num)\` นำจำนวนเต็มบวก \`num\` ใส่กลับเข้ามาในเซ็ต หากยังไม่มีตัวเลขนี้อยู่ในเซ็ต`,
        },
        {
          t: "example",
          c: [
            {
              input: '["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"]\n[[], [2], [], [], [], [1], [], [], []]',
              output: "[null, null, 1, 2, 3, null, 1, 4, 5]",
              explain:
                "addBack(2) ไม่มีผลเพราะ 2 ยังอยู่ในเซ็ต\npop 3 ครั้งแรกได้ 1, 2, 3\naddBack(1) นำ 1 ใส่กลับเข้ามา\npop ครั้งต่อไปคืน 1 (ตัวที่เพิ่งใส่กลับเข้ามา) แล้วตามด้วย 4, 5",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= num <= 1000",
            "At most 1000 calls will be made in total to popSmallest and addBack.",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "เซ็ตมีขนาดเป็นอนันต์ (infinite) เราไม่สามารถสร้าง array เก็บตัวเลขทั้งหมดได้! เราจะแทนสายตัวเลข 1, 2, 3... ด้วยตัวแปรเดียวได้อย่างไร?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ให้จำลองเซ็ตที่บรรจุเลข 1, 2, 3... ไปเรื่อยๆ โดยมี 2 คำสั่งหลัก: ดึงเลขที่น้อยที่สุดออก (`popSmallest`) และนำเลขที่เคยดึงออกไปแล้วกลับเข้ามาใหม่ (`addBack`)",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "สังเกตพฤติกรรมของตัวเลข:",
            },
            {
              t: "ul",
              c: [
                "ถ้าไม่มีการ addBack เลย: เลขจะถูกดึงเรียงกัน 1, 2, 3, 4, 5... ไปเรื่อยๆ เราแค่ใช้ตัวแปรนับ `current = 1` แล้วขยับบวกทีละหนึ่ง!",
                "ถ้ามีคนสั่ง `addBack(2)`: เลข 2 เป็นเลขที่น้อยกว่า `current` (ซึ่งเดินไปถึง 4 แล้ว) ในรอบถัดไปเราต้องดึงเลข 2 ออกมาก่อนเลข 4",
                "ดังนั้น เราต้องมี 'ตะกร้าพิเศษ' เอาไว้เก็บเฉพาะเลขที่ถูก addBack กลับมา และตะกร้านี้ต้องหยิบตัวน้อยสุดได้ทันที -> **Min-Heap**!",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: ใช้ตัวแปร `current` แทนสายธารอนันต์ที่กำลังเดินไปข้างหน้า + ใช้ Min-Heap (`added`) เก็บเลขที่ถูกเพิ่มกลับเข้ามา + ใช้ Hash Set (`in_heap`) กันเลขซ้ำ",
            },
            {
              t: "p",
              c: "ขั้นตอนตรรกะ:",
            },
            {
              t: "ol",
              c: [
                "`__init__`: `self.current = 1`, `self.added = []` (heap), `self.in_heap = set()`",
                "`popSmallest`: ถ้าใน heap มีของ ให้ pop ออกจาก heap ก่อน (เพราะเลขใน heap น้อยกว่า `current` เสมอ) และเอาออกจาก set ด้วย · ถ้า heap ว่าง ให้คืนค่า `current` แล้วบวก `current += 1`",
                "`addBack(num)`: รับเฉพาะเลขที่เคยถูกหยิบออกไปแล้ว (`num < self.current`) และยังไม่เคยถูกเพิ่มกลับมา (`num not in self.in_heap`) นำเข้า heap และ set",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น / จำลองการทำงาน" },
            {
              t: "table",
              head: ["คำสั่ง", "current", "heap (added)", "ผลลัพธ์", "คำอธิบาย"],
              rows: [
                ["init", "1", "[]", "—", "เริ่มต้นที่ 1"],
                ["popSmallest", "2", "[]", "1", "heap ว่าง -> ดึง current (1), ขยับเป็น 2"],
                ["popSmallest", "3", "[]", "2", "heap ว่าง -> ดึง 2, ขยับเป็น 3"],
                ["popSmallest", "4", "[]", "3", "heap ว่าง -> ดึง 3, ขยับเป็น 4"],
                ["addBack(1)", "4", "[1]", "—", "1 < 4 -> push 1 เข้า heap"],
                ["popSmallest", "4", "[]", "1", "heap มี 1 -> pop 1 จาก heap"],
                ["popSmallest", "5", "[]", "4", "heap ว่าง -> ดึง current (4), ขยับเป็น 5"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `import heapq

class SmallestInfiniteSet:
    def __init__(self):
        # ตัวชี้ลำดับถัดไปในสายอนันต์ 1, 2, 3...
        self.current = 1
        # Min-heap เก็บเฉพาะตัวเลขที่เคยถูก pop ไปแล้วแต่ถูก addBack กลับมา
        self.added = []
        # Hash set ป้องกันการเพิ่มตัวเลขซ้ำลงใน heap
        self.in_heap = set()

    def popSmallest(self) -> int:
        # 1. ถ้ามีเลขที่ถูก addBack กลับมา ให้หยิบตัวที่น้อยที่สุดใน heap ก่อน
        if self.added:
            val = heapq.heappop(self.added)
            self.in_heap.remove(val)
            return val

        # 2. ถ้าไม่มีใน heap ให้หยิบจากสายอนันต์ปกติ
        val = self.current
        self.current += 1
        return val

    def addBack(self, num: int) -> None:
        # ใส่กลับได้เฉพาะเลขที่เคยถูกหยิบออกไปแล้ว (num < current) และไม่อยู่ใน heap
        if num < self.current and num not in self.in_heap:
            heapq.heappush(self.added, num)
            self.in_heap.add(num)`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["self.current = 1", "จำว่าสายอนันต์เดินถึงเลขไหนแล้ว", "current = 1, 2, 3..."],
                ["self.added = []; self.in_heap = set()", "เตรียม min-heap และ set สำหรับเลขพิเศษ", "added=[], in_heap=set()"],
                ["if self.added: val = heapq.heappop(...)", "ดึงตัวน้อยสุดจากเลขที่ addBack", "pop 1 ออกจาก [1, 2]"],
                ["if num < self.current and num not in self.in_heap:", "ตรวจเงื่อนไขก่อนเพิ่มกลับ", "num=2 < current=4 (จริง)"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(log M)", "popSmallest และ addBack ใช้เวลาตามการ push/pop ของ heap โดย M คือจำนวนเลขที่ถูก addBack"],
                ["Space (หน่วยความจำ)", "O(M)", "เก็บเฉพาะตัวเลขที่ถูก addBack ใน heap และ set (สูงสุดไม่เกิน 1,000 ตัวตาม Constraints)"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Implement the \`SmallestInfiniteSet\` class containing all positive integers [1, 2, 3, ...]. Support \`popSmallest()\` and \`addBack(num)\`.`,
        },
        {
          t: "example",
          c: [
            {
              input: '["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest"]\n[[], [2], [], [], [], [1], []]',
              output: "[null, null, 1, 2, 3, null, 1]",
              explain: "addBack(1) puts 1 back, so subsequent popSmallest returns 1.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= num <= 1000",
            "At most 1000 calls total to popSmallest and addBack.",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Maintain an infinite set of positive integers. We cannot store infinite numbers; we use a counter for sequential numbers and a min-heap for re-added numbers.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "`current` tracks the lowest unvisited number. When `num < current` is re-added, push to a min-heap guarded by a hash set.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Combine `current: int` with `added: min-heap` and `in_heap: set`.",
            },

            { t: "h3", c: "Step 4 · Simulation Table" },
            {
              t: "table",
              head: ["Call", "current", "heap", "Return"],
              rows: [
                ["popSmallest", "2", "[]", "1"],
                ["popSmallest", "3", "[]", "2"],
                ["addBack(1)", "3", "[1]", "—"],
                ["popSmallest", "3", "[]", "1"],
              ],
            },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `import heapq

class SmallestInfiniteSet:
    def __init__(self):
        self.current = 1
        self.added = []
        self.in_heap = set()

    def popSmallest(self) -> int:
        if self.added:
            val = heapq.heappop(self.added)
            self.in_heap.remove(val)
            return val
        val = self.current
        self.current += 1
        return val

    def addBack(self, num: int) -> None:
        if num < self.current and num not in self.in_heap:
            heapq.heappush(self.added, num)
            self.in_heap.add(num)`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["self.current = 1", "Sequential counter for infinite stream", "current = 1"],
                ["if self.added: val = heapq.heappop(...)", "Evict smallest re-added number", "heap pop 1"],
                ["if num < self.current and num not in self.in_heap:", "Guard duplicates and unevicted values", "num=1 < current=3"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(log M)", "Heap operations on at most M re-added numbers."],
                ["Space", "O(M)", "Stores only re-added elements."],
              ],
            },
          ],
        },
      ],
    },
  },

  "lc75-p51": {
    slug: "lc75-p51",
    title: {
      th: "ข้อ 51 · LC2542 Maximum Subsequence Score (คะแนน subsequence มากสุด) 🟡",
      en: "LC2542 Maximum Subsequence Score 🟡",
    },
    lead: {
      th: "โจทย์สองตัวแปร — ตรึง min(nums2) ด้วยการ Sort จากมากไปน้อย แล้วใช้ Min-Heap รักษาผลรวม Top-K ของ nums1 ให้มากที่สุด",
      en: "Two-variable optimization — fix min(nums2) by sorting descending, then maintain the top-k sum of nums1 using a min-heap.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `You are given two 0-indexed integer arrays \`nums1\` and \`nums2\` of equal length \`n\` and a positive integer \`k\`. You must choose a subsequence of indices from \`nums1\` of length \`k\`.

For chosen indices \`i0, i1, ..., ik - 1\`, your score is defined as:
• The sum of the selected elements from \`nums1\` multiplied with the minimum of the selected elements from \`nums2\`.
• It can be represented as: \`(nums1[i0] + nums1[i1] + ... + nums1[ik - 1]) * min(nums2[i0], nums2[i1], ..., nums2[ik - 1])\`.

Return the maximum possible score.`,
        },
        {
          t: "p",
          c: `กำหนด array จำนวนเต็ม \`nums1\` และ \`nums2\` ที่มีความยาวเท่ากัน \`n\` และจำนวนเต็มบวก \`k\`
ให้คุณเลือก index มา \`k\` ตำแหน่ง โดยคะแนน (score) คำนวณจาก:
(ผลรวมของ nums1 ในตำแหน่งที่เลือก) × (ค่าน้อยที่สุดของ nums2 ในตำแหน่งที่เลือก)

จงหาคะแนนที่มากที่สุดที่เป็นไปได้`,
        },
        {
          t: "example",
          c: [
            {
              input: "nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3",
              output: "12",
              explain:
                "เลือก index 0, 2, 3:\nผลรวม nums1 = 1 + 3 + 2 = 6\nmin ของ nums2 = min(2, 3, 4) = 2\nคะแนน = 6 * 2 = 12",
            },
            {
              input: "nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1",
              output: "30",
              explain: "เลือก index 2: nums1[2] * nums2[2] = 3 * 10 = 30",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "n == nums1.length == nums2.length",
            "1 <= n <= 10^5",
            "0 <= nums1[i], nums2[j] <= 10^5",
            "1 <= k <= n",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "คะแนนขึ้นอยู่กับ 2 ตัวแปรพร้อมกัน: ผลรวม nums1 และตัวคูณ nums2 ถ้าเรา 'ตรึง' ค่า nums2 ให้เรียงจากมากไปน้อย เราจะตัดปัญหาเรื่องการหา min ของ nums2 ได้อย่างไร?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ให้เลือก k ตำแหน่ง เพื่อทำให้ `(sum of nums1) * min(nums2)` มีค่ามากที่สุด ความท้าทายคือมี 2 ปัจจัยที่แปรผันพร้อมกัน การลองจับคู่ทุกแบบ O(C(n, k)) จะระเบิดแน่นอน",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "เทคนิคแก้โจทย์สองตัวแปร: **ตรึงตัวแปรหนึ่งไว้ก่อน (Fix one variable)**",
            },
            {
              t: "ul",
              c: [
                "จับคู่ `(nums2[i], nums1[i])` แล้วเรียงลำดับตาม `nums2` จากมากไปหาน้อย",
                "เมื่อเราเดินผ่านทีละคู่ ตัว `nums2` ตัวปัจจุบันจะ 'น้อยที่สุด' เสมอเมื่อเทียบกับทุกตัวที่เราเคยผ่านมาแล้ว!",
                "ดังนั้น min(nums2) ถูกตรึงไว้ที่ตัวปัจจุบันแน่นอน!",
                "หน้าที่ของเราเหลือเพียงอย่างเดียว: เลือก `nums1` จากอดีตที่ผ่านมา ให้ได้ผลรวมมากที่สุด k ตัว -> ใช้ **Min-Heap ขนาด k** เพื่อเตะตัวที่น้อยทิ้ง!",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: จับคู่ zip(nums2, nums1) เรียงลดหลั่นตาม nums2 แล้วใช้ Min-Heap เก็บ nums1 ขนาด k ตัว รักษาผลรวม `total`",
            },
            {
              t: "p",
              c: "ขั้นตอนการคำนวณ:",
            },
            {
              t: "ol",
              c: [
                "สร้าง pairs `sorted(zip(nums2, nums1), reverse=True)`",
                "เตรียม `heap = []`, `total = 0`, `max_score = 0`",
                "วนลูปแต่ละคู่ `(n2, n1)` ใน pairs:",
                "  • เอา `n1` ใส่ heap (`heapq.heappush(heap, n1)`) และบวกเข้า `total += n1`",
                "  • ถ้า heap มีขนาดเกิน k ตัว (`len(heap) > k`) ให้เตะตัวน้อยสุดออก: `total -= heapq.heappop(heap)`",
                "  • เมื่อ heap มีขนาดครบ k ตัวพอดี (`len(heap) == k`): คำนวณคะแนน `total * n2` และอัปเดต `max_score = max(max_score, total * n2)`",
                "ส่งคืน `max_score`",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น / จำลองการทำงาน" },
            {
              t: "table",
              head: ["คู่ (n2, n1)", "total", "heap", "ขนาด k?", "คะแนน (total * n2)", "max_score"],
              rows: [
                ["(4, 2)", "2", "[2]", "1 < 3", "—", "0"],
                ["(3, 3)", "5", "[2, 3]", "2 < 3", "—", "0"],
                ["(2, 1)", "6", "[1, 2, 3]", "3 == 3", "6 * 2 = 12", "12"],
                ["(1, 3)", "9 - 1 = 8", "[2, 3, 3]", "เตะ 1 ออก", "8 * 1 = 8", "12 (คงเดิม)"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `import heapq

class Solution:
    def maxScore(self, nums1: List[int], nums2: List[int], k: int) -> int:
        # 1. จับคู่แล้วเรียงลำดับตาม nums2 จากมากไปน้อย
        # เพื่อให้ตัวปัจจุบันเป็นค่า min(nums2) เสมอ
        pairs = sorted(zip(nums2, nums1), reverse=True)

        heap = []          # Min-heap เก็บค่า nums1 ของ k ตัวที่เลือก
        total = 0          # ผลรวมของ nums1 ใน heap
        max_score = 0

        # 2. ไล่พิจารณาแต่ละคู่
        for n2, n1 in pairs:
            heapq.heappush(heap, n1)
            total += n1

            # ถ้าเลือกเกิน k ตัว ให้เตะ nums1 ตัวที่น้อยที่สุดออก
            if len(heap) > k:
                total -= heapq.heappop(heap)

            # เมื่อมีครบ k ตัวพอดี คำนวณคะแนน
            if len(heap) == k:
                max_score = max(max_score, total * n2)

        return max_score`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["pairs = sorted(zip(nums2, nums1), reverse=True)", "เรียง nums2 จากมากไปหาน้อย", "[(4,2), (3,3), (2,1), (1,3)]"],
                ["heapq.heappush(heap, n1); total += n1", "ใส่ nums1 เข้า heap และสะสมผลรวม", "ใส่ 2 -> total=2"],
                ["if len(heap) > k: total -= heapq.heappop(heap)", "คุมขนาด heap ไม่ให้เกิน k ตัว", "เตะ 1 ออก -> total เหลือ 8"],
                ["if len(heap) == k: max_score = max(...)", "คำนวณคะแนนเมื่อมีครบ k สมาชิก", "total * n2 = 6 * 2 = 12"],
                ["return max_score", "ส่งคืนคะแนนสูงสุดที่พบ", "return 12"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(N log N)", "Sort คู่ทั้ง N ตัวใช้ O(N log N) และวนลูป heap push/pop อีก O(N log k)"],
                ["Space (หน่วยความจำ)", "O(N)", "สร้าง list ของ pairs ขนาด N และ heap ขนาด k"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Choose a subsequence of indices of length \`k\` to maximize \`(nums1[i0] + ... + nums1[ik-1]) * min(nums2[i0], ..., nums2[ik-1])\`.`,
        },
        {
          t: "example",
          c: [
            {
              input: "nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3",
              output: "12",
              explain: "Indices 0, 2, 3 give (1+3+2) * min(2,3,4) = 6 * 2 = 12.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "n == nums1.length == nums2.length",
            "1 <= n <= 10^5",
            "1 <= k <= n",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Maximize total score across two arrays. Fix `min(nums2)` by sorting descending, reducing the problem to maintaining the top-k sum of `nums1`.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "Sort pairs descending by nums2: [(4,2), (3,3), (2,1), (1,3)]. At (2,1), top-3 nums1 = [2, 3, 1], sum = 6, score = 6 * 2 = 12.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Sort `zip(nums2, nums1)` descending. Maintain a size-k min-heap of `nums1` values. When heap exceeds k, pop the smallest element.",
            },

            { t: "h3", c: "Step 4 · Simulation Table" },
            {
              t: "table",
              head: ["Pair (n2, n1)", "Heap", "Total", "Score"],
              rows: [
                ["(4, 2)", "[2]", "2", "—"],
                ["(3, 3)", "[2, 3]", "5", "—"],
                ["(2, 1)", "[1, 2, 3]", "6", "6 * 2 = 12"],
                ["(1, 3)", "[2, 3, 3]", "8", "8 * 1 = 8"],
              ],
            },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `import heapq

class Solution:
    def maxScore(self, nums1: List[int], nums2: List[int], k: int) -> int:
        pairs = sorted(zip(nums2, nums1), reverse=True)
        heap = []
        total = 0
        max_score = 0

        for n2, n1 in pairs:
            heapq.heappush(heap, n1)
            total += n1

            if len(heap) > k:
                total -= heapq.heappop(heap)

            if len(heap) == k:
                max_score = max(max_score, total * n2)

        return max_score`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["pairs = sorted(zip(nums2, nums1), reverse=True)", "Sort descending by nums2", "Fixes min factor"],
                ["total -= heapq.heappop(heap)", "Evict smallest nums1 element", "Keeps top-k largest elements"],
                ["max_score = max(max_score, total * n2)", "Update maximum score", "6 * 2 = 12"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(N log N)", "Sorting takes O(N log N); heap operations take O(N log k)."],
                ["Space", "O(N)", "Storing paired list and size-k heap."],
              ],
            },
          ],
        },
      ],
    },
  },

  "lc75-p52": {
    slug: "lc75-p52",
    title: {
      th: "ข้อ 52 · LC2462 Total Cost to Hire K Workers (ต้นทุนจ้าง k คน) 🟡",
      en: "LC2462 Total Cost to Hire K Workers 🟡",
    },
    lead: {
      th: "จ้างคนถูกสุด k รอบจาก candidates คนแรกและคนสุดท้ายของแถว — ใช้ Min-Heap สองอันคุมสองฝั่ง เติมคนจากตรงกลางเข้ามา",
      en: "Hire cheapest workers from the first and last candidates pools using two min-heaps and two pointers.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `You are given a 0-indexed integer array \`costs\` where \`costs[i]\` is the cost of hiring the \`i\`-th worker.

You are also given two integers \`k\` and \`candidates\`. We want to hire exactly \`k\` workers according to the following rules:

• You will run \`k\` sessions and hire exactly one worker in each session.
• In each hiring session, choose the worker with the lowest cost from either the first \`candidates\` workers or the last \`candidates\` workers. Break the tie by the smallest index.
• If there are fewer than \`candidates\` workers remaining, choose the worker with the lowest cost among them.
• A worker can only be hired once.

Return the total cost to hire exactly \`k\` workers.`,
        },
        {
          t: "p",
          c: `กำหนด array \`costs\` โดย \`costs[i]\` คือค่าจ้างของคนงานคนที่ \`i\` พร้อมจำนวนเต็ม \`k\` และ \`candidates\`
ทำการจ้างคนงานทั้งหมด \`k\` รอบ รอบละ 1 คน โดยในแต่ละรอบ:
• เลือกคนที่มีค่าจ้างถูกที่สุดจาก \`candidates\` คนแรก หรือ \`candidates\` คนสุดท้ายของแถวที่เหลืออยู่ (ถ้าค่าจ้างเท่ากัน ให้เลือกคนที่มี index น้อยกว่า)
• คนที่ถูกจ้างไปแล้วจะออกจากแถว
• ส่งคืนผลรวมค่าจ้างทั้งหมด`,
        },
        {
          t: "example",
          c: [
            {
              input: "costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4",
              output: "11",
              explain:
                "รอบที่ 1: หัวแถว [17,12,10,2], ท้ายแถว [2,11,20,8] -> คนถูกสุดคือ 2 (index 3) จ่าย 2\nรอบที่ 2: คนถูกสุดคือ 2 (index 5) จ่าย 2\nรอบที่ 3: คนถูกสุดคือ 7 จ่าย 7\nรวม 2 + 2 + 7 = 11",
            },
            {
              input: "costs = [1,2,4,1], k = 3, candidates = 3",
              output: "4",
              explain: "จ้าง 3 คนที่ถูกที่สุดคือ 1, 1, 2 รวมเป็น 4",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= costs.length <= 10^5",
            "1 <= costs[i] <= 10^5",
            "1 <= k, candidates <= costs.length",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "เราต้องหาค่าต่ำสุดจากสองฝั่งของแถว (หัวและท้าย) ซ้ำๆ กัน k รอบ โครงสร้างข้อมูลใดที่หยิบ min ได้ใน O(log N) และเราจะป้องกันไม่ให้สองฝั่งหยิบคนเดียวกันได้อย่างไร?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ให้ทำการจ้างคนงาน k รอบ โดยในแต่ละรอบเรามองเห็นผู้สมัครได้ 2 กลุ่ม: `candidates` คนจากฝั่งซ้ายสุด (หัวแถว) และ `candidates` คนจากฝั่งขวาสุด (ท้ายแถว) ให้เลือกคนที่ถูกที่สุดในสองกลุ่มนี้ หากค่าจ้างเท่ากันให้เลือกฝั่งหัวแถวก่อน แล้วเติมคนถัดไปจากตรงกลางแถวเข้ามาแทนที่",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ลองดูตัวอย่าง: costs = [17, 12, 10, 2, 7, 2, 11, 20, 8], k = 3, candidates = 4",
            },
            {
              t: "ul",
              c: [
                "ฝั่งหัว: [17, 12, 10, 2] (index 0..3) -> ตัวน้อยสุดคือ 2",
                "ฝั่งท้าย: [2, 11, 20, 8] (index 5..8) -> ตัวน้อยสุดคือ 2",
                "ค่าจ้างเท่ากัน (2 กับ 2) กฎบอกว่าให้เลือก index น้อยกว่า -> จ้าง 2 จากฝั่งหัว! และดึงคนตรงกลาง (index 4 คือ 7) เข้ามาแทนที่ฝั่งหัว",
                "ทำแบบนี้วนไป k รอบ จะได้ผลรวมค่าจ้างน้อยที่สุด",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: ใช้ **Min-Heap 2 อัน** (`head_heap` และ `tail_heap`) ร่วมกับ **Two Pointers** (`left` และ `right`) เพื่อคอยดึงคนจากตรงกลางเข้าสู่ heap",
            },
            {
              t: "p",
              c: "ขั้นตอนตรรกะ:",
            },
            {
              t: "ol",
              c: [
                "ตั้ง `left = 0`, `right = len(costs) - 1`",
                "เติมคนเข้า `head_heap` จำนวน `candidates` คนแรก พร้อมขยับ `left += 1`",
                "เติมคนเข้า `tail_heap` จำนวน `candidates` คนท้าย พร้อมขยับ `right -= 1` (ระวังอย่าให้ทับซ้อนกับฝั่งซ้ายโดยเช็ค `left <= right`)",
                "วนลูป k รอบ:",
                "  • เปรียบเทียบยอดของทั้งสอง heap: ถ้า `head_heap[0] <= tail_heap[0]` ให้ pop จาก `head_heap` และถ้ายังมีคนตรงกลางเหลืออยู่ (`left <= right`) ให้ push `costs[left]` เข้า head_heap แล้วขยับ `left += 1`",
                "  • มิฉะนั้น ให้ pop จาก `tail_heap` และถ้ายังมีคนตรงกลางเหลือ ให้ push `costs[right]` เข้า tail_heap แล้วขยับ `right -= 1`",
                "ส่งคืนผลรวมค่าจ้างทั้งหมด",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น / จำลองการทำงาน" },
            {
              t: "table",
              head: ["รอบ", "head_heap min", "tail_heap min", "ตัดสินใจ", "จ่าย", "เติมคนใหม่"],
              rows: [
                ["1", "2", "2", "head <= tail -> เลือก head", "2", "เติม 7 เข้า head, left ชน right"],
                ["2", "7", "2", "tail < head -> เลือก tail", "2", "ไม่มีคนตรงกลางให้เติม"],
                ["3", "7", "8", "head < tail -> เลือก head", "7", "ไม่มีคนเติม"],
                ["จบ", "—", "—", "รวมจ่าย 2 + 2 + 7 = 11", "11", "—"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `import heapq

class Solution:
    def totalCost(self, costs: List[int], k: int, candidates: int) -> int:
        head_heap = []
        tail_heap = []

        left = 0
        right = len(costs) - 1

        # 1. ใส่ผู้สมัครชุดแรกเข้า head_heap
        while left < candidates and left <= right:
            heapq.heappush(head_heap, costs[left])
            left += 1

        # 2. ใส่ผู้สมัครชุดแรกเข้า tail_heap (ไม่ให้ทับกับฝั่งซ้าย)
        count = 0
        while count < candidates and left <= right:
            heapq.heappush(tail_heap, costs[right])
            right -= 1
            count += 1

        total_cost = 0

        # 3. จ้างงานทั้งหมด k รอบ
        for _ in range(k):
            # ตรวจสอบว่าฝั่งไหนถูกกว่า (ถ้าเท่ากัน หรือ tail ว่าง ให้เลือก head)
            if not tail_heap or (head_heap and head_heap[0] <= tail_heap[0]):
                total_cost += heapq.heappop(head_heap)
                # ดึงคนจากตรงกลางมาเติมเข้า head_heap
                if left <= right:
                    heapq.heappush(head_heap, costs[left])
                    left += 1
            else:
                total_cost += heapq.heappop(tail_heap)
                # ดึงคนจากตรงกลางมาเติมเข้า tail_heap
                if left <= right:
                    heapq.heappush(tail_heap, costs[right])
                    right -= 1

        return total_cost`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["head_heap = []; tail_heap = []", "เตรียมสอง min-heap ดูแลหัว-ท้าย", "head_heap=[], tail_heap=[]"],
                ["while left < candidates and left <= right: ...", "เติม candidates คนแรกเข้าฝั่งซ้าย", "head ได้ [17, 12, 10, 2]"],
                ["if not tail_heap or (head_heap and head_heap[0] <= tail_heap[0]):", "เทียบราคาถูกสุดระหว่างสองฝั่ง", "2 <= 2 -> เลือกฝั่งซ้าย"],
                ["if left <= right: heapq.heappush(head_heap, costs[left]); left += 1", "เติมคนถัดไปจากตรงกลางแถว", "เติม 7 เข้า head"],
                ["return total_cost", "ส่งคืนยอดรวมค่าจ้างทั้งหมด", "return 11"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O((candidates + k) log candidates)", "สร้าง heap ใช้ O(candidates log candidates) และลูป k รอบใช้ O(k log candidates)"],
                ["Space (หน่วยความจำ)", "O(candidates)", "Heap สองอันเก็บโหนดรวมกันไม่เกิน 2 * candidates ตัว"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given \`costs\`, \`k\`, and \`candidates\`, hire \`k\` workers. In each session, pick the cheapest worker from the first \`candidates\` or last \`candidates\` workers (tie-break by smaller index). Return the total cost.`,
        },
        {
          t: "example",
          c: [
            {
              input: "costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4",
              output: "11",
              explain: "Hires costs 2, 2, and 7 -> total 11.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= costs.length <= 10^5",
            "1 <= costs[i] <= 10^5",
            "1 <= k, candidates <= costs.length",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Repeatedly extract the minimum of two candidate pools (first and last `candidates` items) across `k` sessions.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "Maintain two min-heaps: `head_heap` and `tail_heap`. Compare `head_heap[0]` with `tail_heap[0]`. Pop the smaller (or head on tie), and refill from middle pointers `left` and `right`.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Two min-heaps with two pointers (`left` and `right`) advancing toward the center.",
            },

            { t: "h3", c: "Step 4 · Simulation Table" },
            {
              t: "table",
              head: ["Session", "Head Min", "Tail Min", "Pick", "Cost Added"],
              rows: [
                ["1", "2", "2", "Head", "2"],
                ["2", "7", "2", "Tail", "2"],
                ["3", "7", "8", "Head", "7"],
              ],
            },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `import heapq

class Solution:
    def totalCost(self, costs: List[int], k: int, candidates: int) -> int:
        head_heap = []
        tail_heap = []
        left = 0
        right = len(costs) - 1

        while left < candidates and left <= right:
            heapq.heappush(head_heap, costs[left])
            left += 1

        count = 0
        while count < candidates and left <= right:
            heapq.heappush(tail_heap, costs[right])
            right -= 1
            count += 1

        total_cost = 0
        for _ in range(k):
            if not tail_heap or (head_heap and head_heap[0] <= tail_heap[0]):
                total_cost += heapq.heappop(head_heap)
                if left <= right:
                    heapq.heappush(head_heap, costs[left])
                    left += 1
            else:
                total_cost += heapq.heappop(tail_heap)
                if left <= right:
                    heapq.heappush(tail_heap, costs[right])
                    right -= 1

        return total_cost`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["heapq.heappush(head_heap, costs[left])", "Populate head candidate pool", "head pool of size candidates"],
                ["if not tail_heap or (head_heap and head_heap[0] <= tail_heap[0]):", "Compare cheapest candidates", "Head wins on ties"],
                ["if left <= right: ...", "Refill pool from middle elements", "Maintains pool size"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O((candidates + k) log candidates)", "Heap push/pop takes O(log candidates)."],
                ["Space", "O(candidates)", "Two heaps hold at most 2 * candidates elements."],
              ],
            },
          ],
        },
      ],
    },
  },
};
