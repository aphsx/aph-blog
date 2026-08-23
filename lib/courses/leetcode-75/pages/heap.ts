import type { Page } from "@/lib/types";

export const heapPages: Record<string, Page> = {
  "lc75-intro-heap": {
    slug: "lc75-intro-heap",
    title: { th: "Heap / Priority Queue — พื้นฐาน & แนวคิด", en: "" },
    lead: {
      th: "กองที่เก็บให้ root เป็นค่าน้อยสุดเสมอ — ใส่และหยิบสุดขั้วได้เร็ว โดยไม่ต้องเรียงทั้งแถวทุกครั้ง",
      en: "",
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
      en: [],
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
    title: { th: "ข้อ 50 · LC2336 Smallest Number in Infinite Set (เลขน้อยสุดเซ็ตอนันต์) 🟡", en: "" },
    lead: { th: "design (ออกแบบ) class จัดการ set (เซ็ต) ของ positive integer (จำนวนเต็มบวก) ทั้งหมด ด้วย counter (ตัวนับ) current + min-heap สำหรับเลขที่ addBack กลับมา", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC2336): ให้ออกแบบ class ชื่อ SmallestInfiniteSet ที่แทนเซ็ตซึ่งบรรจุ positive integer (จำนวนเต็มบวก) ทุกตัวตั้งแต่ 1, 2, 3, ... ไปจนถึงอนันต์ตั้งแต่เริ่มต้น โดยต้อง support (รองรับ) สอง method คือ popSmallest() ซึ่ง remove และ return ค่าที่น้อยที่สุดที่ยังอยู่ในเซ็ต และ addBack(num) ซึ่งเพิ่มจำนวนเต็มบวก num กลับเข้าเซ็ต ถ้ามันยังไม่อยู่ในเซ็ตอยู่แล้ว" },
              {
                t: "example",
                c: [
                  {
                    input: "new SmallestInfiniteSet(); addBack(2); popSmallest(); popSmallest(); popSmallest(); addBack(1); popSmallest(); popSmallest(); popSmallest()",
                    output: "null, null, 1, 2, 3, null, 1, 4, 5",
                    explain: "addBack(2) ไม่มีผลเพราะ 2 ยังอยู่ในเซ็ตอยู่แล้ว popSmallest สามครั้งแรกคืน 1, 2, 3 ตามลำดับ จากนั้น addBack(1) เพิ่ม 1 กลับเข้าไป popSmallest ครั้งถัดไปจึงคืน 1 (ตัวที่เพิ่งเพิ่มกลับ เพราะเล็กกว่า 4) แล้วค่อยเดินหน้าต่อที่ 4 และ 5",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "เรียก popSmallest และ addBack รวมกันได้มากสุด 1000 ครั้ง",
                "1 <= num <= 1000",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "โครงสร้างที่ใช้: counter (ตัวนับ) current หนึ่งตัว + min-heap หนึ่งอัน + set กันเลขซ้ำ เราไม่ต้อง store เลข infinity จริง ๆ เพราะเลขในช่วง current, current+1, ... ยัง sorted (เรียงเป็นระเบียบ) อยู่แล้ว แค่ track (จำ) ว่าถึงไหนก็พอ" },
              { t: "p", c: "คิดแบบง่าย/ช้าก่อน: ถ้า store เลขทั้งหมดจริง ๆ จะเป็นไปไม่ได้เพราะ infinity ปัญหาเดียวที่ต้อง handle แยกคือเลขที่ถูก addBack กลับมา ซึ่งอาจเล็กกว่า current เราจึง store มันใน min-heap เพื่อให้ pop ตัว minimum ออกก่อนได้เสมอ" },
              { t: "ol", c: [
                "initialize current = 1 (เลขต่อไปในสาย infinity ที่ยังไม่เคย pop), added = min-heap ว่าง, in_heap = set ว่าง",
                "popSmallest: ถ้า heap มีของ (การันตีว่าเล็กกว่า current) pop จาก heap ก่อน แล้ว remove ออกจาก set",
                "ถ้า heap ว่าง pop current แล้ว increment current ขึ้นหนึ่ง",
                "addBack(num): เพิ่มกลับได้เฉพาะเลขที่ถูก pop ไปแล้ว (num < current) และยังไม่อยู่ใน heap จึง push เข้า heap และ add เข้า set",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ลืมกันเลขซ้ำใน heap — ถ้า addBack(2) สองครั้งโดยไม่มี set คุม heap จะมีเลข 2 สองตัว ทำให้ popSmallest return 2 ซ้ำ ผิดความหมายของ set และ addBack เลขที่ยังไม่เคย pop (num >= current) ต้องไม่ทำอะไร เพราะมันยังอยู่ใน set อยู่แล้ว" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "จำลอง sequence ของ operation pop, pop, pop, addBack(2), pop, pop, pop:" },
              { t: "table", head: ["operation", "current", "heap (added)", "return"], rows: [
                ["popSmallest", "1 → 2", "[]", "1"],
                ["popSmallest", "2 → 3", "[]", "2"],
                ["popSmallest", "3 → 4", "[]", "3"],
                ["addBack(2)", "4", "[2]", "-"],
                ["popSmallest", "4", "[]", "2"],
                ["popSmallest", "4 → 5", "[]", "4"],
                ["popSmallest", "5 → 6", "[]", "5"],
              ] },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `import heapq

class SmallestInfiniteSet:
    def __init__(self):
        self.current = 1      # เลขต่อไปในสาย 1,2,3,... ที่ยังไม่เคยหยิบ
        self.added = []       # min-heap ของเลขที่ถูก addBack กลับมา
        self.in_heap = set()  # กันไม่ให้ heap มีเลขซ้ำ

    def popSmallest(self):
        # ถ้ามีเลขที่ addBack กลับมา และมันเล็กกว่า current ให้หยิบจาก heap ก่อน
        if self.added:
            x = heapq.heappop(self.added)
            self.in_heap.discard(x)
            return x
        # ไม่งั้นหยิบตัวถัดไปจากสายอนันต์
        x = self.current
        self.current += 1
        return x

    def addBack(self, num):
        # เพิ่มกลับได้เฉพาะเลขที่ถูกหยิบออกไปแล้ว (num < current) และยังไม่อยู่ใน heap
        if num < self.current and num not in self.in_heap:
            heapq.heappush(self.added, num)
            self.in_heap.add(num)

s = SmallestInfiniteSet()
print(s.popSmallest())  # 1
print(s.popSmallest())  # 2
print(s.popSmallest())  # 3
s.addBack(2)
print(s.popSmallest())  # 2
print(s.popSmallest())  # 4
print(s.popSmallest())  # 5`, out: `1
2
3
2
4
5` },
                { t: "p", c: "กุญแจของโจทย์คือ เราไม่จำเป็นต้อง store เลข infinity จริง เพราะเลขในช่วง current เป็นต้นไปยัง sorted อยู่แล้ว แค่ track ว่าถึงไหนก็พอ ปัญหาเดียวคือเลขที่ถูก addBack กลับมา ซึ่งอาจเล็กกว่า current เราจึง store มันแยกใน min-heap เพื่อให้ pop ตัว minimum ออกก่อนได้เสมอ" },
                { t: "p", c: "เวลา popSmallest เราจึง compare (เทียบ) ง่าย ๆ: ถ้ามีของใน heap (ซึ่งการันตีว่าเล็กกว่า current) pop จาก heap ก่อน ไม่งั้นค่อยเดินสาย infinity ต่อ ถ้าตัด set in_heap ออก โค้ดจะยอมให้ addBack เลขเดิมซ้ำได้ ทำให้ heap มีค่าซ้ำและ popSmallest return ค่าเดียวกันสองครั้ง ผิดนิยามของ set" },
                { t: "p", c: "Time popSmallest O(log n) และ addBack O(log n) โดย n คือจำนวนเลขใน heap · Space O(n) store เฉพาะเลขที่ถูก addBack กลับมา ไม่ใช่เลข infinity ทั้งหมด" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "เมื่อเจอ set/range (ช่วง) ที่ใหญ่มากหรือ infinity อย่า store ทั้งหมด — ใช้ counter แทนช่วงที่ยัง sorted ดี แล้วใช้ heap เก็บเฉพาะ exception (ข้อยกเว้น คือเลขที่โดนเพิ่มกลับมา) ที่ทำให้ลำดับผิดจากปกติ" },
      ],
      en: [],
    },
  },

  "lc75-p51": {
    slug: "lc75-p51",
    title: { th: "ข้อ 51 · LC2542 Maximum Subsequence Score (คะแนน subsequence มากสุด) 🟡", en: "" },
    lead: { th: "score (คะแนน) = sum (ผลรวม) nums1 คูณ min ของ nums2 ตรึง min ไว้ด้วยการ sort แล้วใช้ min-heap maintain sum nums1 ให้มากสุด", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC2542): กำหนด array จำนวนเต็ม nums1 และ nums2 ที่ยาวเท่ากัน n ตัว พร้อมจำนวนเต็มบวก k ให้เลือก index มา k ตำแหน่งจาก nums1 (แบบ subsequence) โดยนิยาม score (คะแนน) ของชุดที่เลือกคือ ผลรวมของค่า nums1 ที่ตำแหน่งที่เลือก คูณด้วยค่า minimum ของ nums2 ที่ตำแหน่งเดียวกันที่เลือก ให้ return score ที่มากที่สุดที่เป็นไปได้" },
              {
                t: "example",
                c: [
                  {
                    input: "nums1 = [1, 3, 3, 2], nums2 = [2, 1, 3, 4], k = 3",
                    output: "12",
                    explain: "เลือก index 0, 2, 3: ผลรวม nums1 = 1+3+2 = 6, min ของ nums2 ที่เลือก = min(2,3,4) = 2, คะแนน = 6*2 = 12 (ถ้าเลือก index 0,1,2 แทนจะได้แค่ (1+3+3)*min(2,1,3) = 7 ซึ่งน้อยกว่า)",
                  },
                  {
                    input: "nums1 = [4, 2, 3, 1, 1], nums2 = [7, 5, 10, 9, 6], k = 1",
                    output: "30",
                    explain: "k = 1 เลือกได้ตัวเดียว การเลือก index 2 ให้คะแนนดีที่สุด: nums1[2] * nums2[2] = 3 * 10 = 30",
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

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "โครงสร้างที่ใช้: sort (เรียง) + min-heap ความยากของโจทย์คือ score ขึ้นกับสองอย่างพร้อมกัน: sum nums1 (ยิ่งมากยิ่งดี) กับ min ของ nums2 (ยิ่งมากยิ่งดี) การ handle สองตัวแปรพร้อมกันยาก เทคนิคคือ ตรึง (fix) ตัวหนึ่งไว้ก่อน" },
              { t: "p", c: "คิดแบบง่าย/ช้าก่อน: ลองทุก subset (สับเซ็ต) ขนาด k แล้วคิด score เป็น O(C(n,k)) ซึ่งระเบิดทันที เราจึง sort คู่ (nums1, nums2) ตาม nums2 จากมากไปน้อย แล้ว iterate ไปทีละตัว เมื่อถึงคู่ที่ nums2 = b เราตั้งให้ b เป็นตัว minimum ของกลุ่ม แปลว่าเลือกได้เฉพาะตัวที่มาก่อนหน้า (nums2 ใหญ่กว่าหรือเท่ากับ b) เท่านั้น" },
              { t: "ol", c: [
                "จับคู่ zip(nums1, nums2) แล้ว sort ตาม nums2 จากมากไปน้อย",
                "iterate ทีละคู่ (a, b): push a เข้า min-heap และบวก a เข้าตัวแปร total",
                "ถ้า heap เกิน k ตัว ให้ pop ตัว nums1 ที่ minimum ออก พร้อมลบมันออกจาก total",
                "เมื่อ heap ครบ k ตัวพอดี b ตัวปัจจุบันคือ min ของ nums2 ในกลุ่ม compute total * b แล้ว track ค่ามากสุดไว้ใน best",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ลืม update total ตอน pop (ต้องลบค่าที่ pop ออกด้วย) หรือ compute score ตอนที่ heap ยังไม่ครบ k ตัว ต้องเช็ค len(heap) == k ก่อนคิด score เสมอ" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "จำลอง nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3 หลัง sort ตาม nums2 มากไปน้อยได้ pairs = [(2,4),(3,3),(1,2),(3,1)]:" },
              { t: "table", head: ["คู่ (a,b)", "heap หลัง push", "total", "เกิน k? (pop)", "คิด total*b เมื่อครบ k"], rows: [
                ["(2,4)", "[2]", "2", "ไม่", "-"],
                ["(3,3)", "[2,3]", "5", "ไม่", "-"],
                ["(1,2)", "[1,3,2]", "6", "ไม่", "6*2 = 12"],
                ["(3,1)", "[3,3,3]", "9→8", "ใช่ pop 1", "8*1 = 8"],
              ] },
              { t: "p", c: "best = max(12, 8) = 12" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `import heapq

def max_score(nums1, nums2, k):
    # จับคู่แล้วเรียงตาม nums2 จากมากไปน้อย
    pairs = sorted(zip(nums1, nums2), key=lambda p: -p[1])

    heap = []          # min-heap เก็บค่า nums1 ของตัวที่เลือกไว้
    total = 0          # ผลรวม nums1 ในกลุ่มที่เลือก
    best = 0
    for a, b in pairs:
        heapq.heappush(heap, a)
        total += a
        # ถ้าเลือกเกิน k ตัว ทิ้ง nums1 ที่น้อยสุดออก
        if len(heap) > k:
            total -= heapq.heappop(heap)
        # เมื่อครบ k ตัว: b ตัวปัจจุบันคือ min ของ nums2 ในกลุ่ม (เพราะเรียงลดหลั่น)
        if len(heap) == k:
            best = max(best, total * b)
    return best

print(max_score([1, 3, 3, 2], [2, 1, 3, 4], 3))  # 12
print(max_score([4, 2, 3, 1, 1], [7, 5, 10, 9, 6], 1))  # 30`, out: `12
30` },
                { t: "p", c: "เมื่อเรา sort ตาม nums2 จากมากไปน้อย แล้ว iterate ไปทีละตัว ณ คู่ปัจจุบัน b คือ nums2 ที่เล็กที่สุดในบรรดาคู่ที่เห็นมาแล้ว (เพราะที่มาก่อนหน้าล้วนมี nums2 มากกว่าหรือเท่ากับ b) ดังนั้นถ้าเราเลือก k ตัวจากกลุ่มที่เห็นมาแล้วโดยรวม b ด้วย min ของ nums2 ในกลุ่มจะเป็น b พอดี" },
                { t: "p", c: "เมื่อ b ถูก fix เป็น min แล้ว เราแค่อยากให้ sum nums1 ของ k ตัวมากที่สุด จึงใช้ min-heap ขนาด k เก็บค่า nums1 พร้อมตัวแปร total ตาม sum ไว้ เมื่อ heap เกิน k ก็ evict nums1 ตัวเล็กสุดออก (พร้อมลบออกจาก total) ถ้าไม่ลบออกจาก total score จะเพี้ยนสูงเกินจริงทันที" },
                { t: "p", c: "Time O(n log n) จากการ sort บวกการ iterate push/pop heap อีก O(n log k) · Space O(n) สำหรับ array คู่ที่ sort แล้ว และ heap ขนาด k" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "โจทย์ที่ score ขึ้นกับสอง factor (ปัจจัย) พร้อมกัน ให้ fix ปัจจัยหนึ่งด้วยการ sort (ตัวคูณ min/max) แล้วปล่อยให้ heap จัดการอีก factor (sum top-k) เป็น pattern ที่เจอบ่อยในโจทย์ optimize สองมิติ" },
      ],
      en: [],
    },
  },

  "lc75-p52": {
    slug: "lc75-p52",
    title: { th: "ข้อ 52 · LC2462 Total Cost to Hire K Workers (ต้นทุนจ้าง k คน) 🟡", en: "" },
    lead: { th: "แต่ละรอบ hire (จ้าง) คนถูกสุดจากหัวหรือท้ายแถว ใช้ min-heap สองอันคุมสองฝั่ง เติมคนจากตรงกลางเข้ามาแทน", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC2462): กำหนด array จำนวนเต็ม costs โดย costs[i] คือค่าจ้างของคนงานคนที่ i พร้อมจำนวนเต็ม k และ candidates ให้ทำการ hire (จ้างงาน) ทั้งหมด k รอบ รอบละหนึ่งคน แต่ละรอบให้เลือกคนที่ค่าจ้างถูกที่สุดจาก candidates คนแรกสุดของแถวที่เหลือ หรือ candidates คนท้ายสุดของแถวที่เหลือ (ถ้าเท่ากันให้เลือก index น้อยกว่า) ถ้าคนที่เหลือมีน้อยกว่า candidates คน ให้เลือกจากคนที่เหลือทั้งหมด คนแต่ละคนถูกจ้างได้ครั้งเดียว ให้ return ผลรวมต้นทุนการจ้างทั้งหมด" },
              {
                t: "example",
                c: [
                  {
                    input: "costs = [17, 12, 10, 2, 7, 2, 11, 20, 8], k = 3, candidates = 4",
                    output: "11",
                    explain: "รอบแรกเลือกจาก candidates 4 คนแรก [17,12,10,2] หรือ 4 คนท้าย [7,2,11,20,8] คนถูกสุดคือ 2 ที่ index 3 (ตัดสินด้วย index น้อยกว่าเมื่อเสมอกับ index 5) จ่าย 2 วนไปจนครบ 3 รอบได้ต้นทุนรวม 11",
                  },
                  {
                    input: "costs = [1, 2, 4, 1], k = 3, candidates = 3",
                    output: "4",
                    explain: "candidates = 3 เกือบเท่าจำนวนคนทั้งหมด (n = 4) ทำให้เห็นคนเกือบทั้งหมดตั้งแต่ต้น จ้าง 3 คนที่ถูกที่สุดคือ 1, 1, 2 รวมเป็น 4",
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

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "โครงสร้างที่ใช้: min-heap สองอัน อันหนึ่งคุมฝั่งหัวแถว อีกอันคุมฝั่งท้ายแถว การหาตัวถูกสุด (minimum) ของแต่ละฝั่งซ้ำ ๆ คือหน้าที่ของ min-heap พอดี" },
              { t: "p", c: "คิดแบบง่าย/ช้าก่อน: ถ้าแต่ละรอบ scan (ไล่สแกน) หาค่าถูกสุดใน window (หน้าต่าง) หัว-ท้ายเองจะเป็น O(k * candidates) และการ remove/เลื่อนคนใน array ก็แพง เราจึงใช้ heap สองอันให้ pop ตัวถูกสุดของแต่ละฝั่งได้ที่ O(log candidates)" },
              { t: "ol", c: [
                "สร้าง head จาก candidates คนแรก และ tail จาก candidates คนท้าย โดยกันช่วงทับกันด้วยจุดเริ่ม max(candidates, n - candidates) แล้ว heapify ทั้งสอง",
                "initialize pointer (ตัวชี้) left และ right ชี้คนตรงกลางที่ยังไม่ถูกดึงเข้า heap",
                "iterate k รอบ: compare head[0] กับ tail[0] เลือกฝั่งที่ถูกกว่า (ถ้าเท่ากันเลือกหัว เพราะ index น้อยกว่า) pop ออกแล้วบวกเข้า total",
                "หลัง hire ฝั่งไหน ถ้า left <= right ยังไม่ชนกัน ให้ push คนใหม่จากตรงกลาง (costs[left] หรือ costs[right]) เข้า heap ฝั่งนั้น แล้วขยับ pointer",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ให้ช่วงหัวกับท้ายทับกันเมื่อ 2*candidates มากกว่า n ต้องใช้ max(candidates, n - candidates) เป็นจุดเริ่มของ tail และต้อง push คนใหม่ก็ต่อเมื่อ left <= right เท่านั้น ถ้าเลยจุดนี้แปลว่าคนตรงกลางถูกดึงเข้า heap ครบแล้ว ไม่มีใครให้เติมอีก" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "จำลอง costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4 (n = 9) เริ่ม head = [17,12,10,2], tail = [7,2,11,20,8] ที่ index 4..8 (จุดเริ่ม max(4,5)=5 → จริง ๆ tail = [2,11,20,8]), left = 4, right = 4:" },
              { t: "table", head: ["รอบ", "head[0]", "tail[0]", "select (จ่าย)", "total", "push คนใหม่"], rows: [
                ["1", "2", "2", "หัว จ่าย 2", "2", "costs[4]=7 เข้าหัว, left=5"],
                ["2", "7", "2", "ท้าย จ่าย 2", "4", "left(5) > right(4) ไม่เติม"],
                ["3", "7", "8", "หัว จ่าย 7", "11", "ไม่เติม"],
              ] },
              { t: "p", c: "total = 11" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `import heapq

def total_cost(costs, k, candidates):
    n = len(costs)
    left = candidates          # pointer ถัดไปฝั่งหัว
    right = n - 1 - candidates  # pointer ถัดไปฝั่งท้าย

    head = costs[:candidates]              # candidates คนแรก
    tail = costs[max(candidates, n - candidates):]  # candidates คนท้าย (ไม่ทับกับหัว)
    heapq.heapify(head)
    heapq.heapify(tail)

    total = 0
    for _ in range(k):
        # เลือกฝั่งที่ถูกกว่า ถ้าเท่ากันเลือกฝั่งหัว (index น้อยกว่า)
        if not tail or (head and head[0] <= tail[0]):
            total += heapq.heappop(head)
            # เติมคนใหม่จากตรงกลางเข้าฝั่งหัว ถ้ายังไม่ชนกัน
            if left <= right:
                heapq.heappush(head, costs[left])
                left += 1
        else:
            total += heapq.heappop(tail)
            if left <= right:
                heapq.heappush(tail, costs[right])
                right -= 1
    return total

print(total_cost([17, 12, 10, 2, 7, 2, 11, 20, 8], 3, 4))  # 11
print(total_cost([1, 2, 4, 1], 3, 3))  # 4`, out: `11
4` },
                { t: "p", c: "ไอเดียคือ ในแต่ละรอบเราต้อง select คนถูกสุดจากสองฝั่งของแถว (หัว candidates คน และท้าย candidates คน) การหาตัว minimum ของแต่ละฝั่งซ้ำ ๆ คือหน้าที่ของ min-heap พอดี เราจึงสร้าง heap สองอันคุมสองฝั่ง แต่ละรอบ compare head[0] กับ tail[0] เลือกตัวที่น้อยกว่า (เท่ากันเลือกหัวเพื่อให้ index น้อยกว่าตามกติกา) แล้วบวกเข้า total cost" },
                { t: "p", c: "จุดที่ต้องระวังที่สุดคือการ push คนใหม่จากตรงกลาง และการไม่ให้สองฝั่งนับคนซ้ำ ตอนสร้าง tail เราใช้ max(candidates, n - candidates) เป็นจุดเริ่ม เพื่อกันไม่ให้ช่วงหัวกับท้าย overlap (ทับกัน) เมื่อ 2*candidates มากกว่า n ส่วน pointer left และ right จะเดินเข้าหากันตรงกลาง เรา push คนใหม่ก็ต่อเมื่อ left <= right เท่านั้น" },
                { t: "p", c: "Time O((candidates + k) log candidates) สร้าง heap สองอันเป็น O(candidates) และ iterate k รอบ แต่ละรอบ push/pop เป็น O(log candidates) · Space O(candidates) สำหรับ heap สองอันรวมกัน" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "เมื่อต้อง select ตัวสุดขั้วจากหลายกลุ่มพร้อมกัน (หัว/ท้าย) ให้แต่ละกลุ่มมี heap ของตัวเอง แล้ว compare ยอดของแต่ละ heap ในแต่ละรอบ เป็น pattern ที่ต่อยอดไปโจทย์ merge k lists ได้" },
      ],
      en: [],
    },
  },
};
