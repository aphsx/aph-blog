import type { Page } from "@/lib/types";

export const heapPages: Record<string, Page> = {
  "lc75-intro-heap": {
    slug: "lc75-intro-heap",
    title: "Heap / Priority Queue — พื้นฐาน & แนวคิด",
    lead: "data structure (โครงสร้างข้อมูล) ที่ pop ตัว minimum (น้อยสุด) หรือ maximum (มากสุด) ออกมาได้เร็ว O(log n) เหมาะกับโจทย์ที่ต้องเลือก top-k หรือค่าสุดขั้วซ้ำ ๆ",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "Heap (ฮีป) หรือที่มักเรียกว่า Priority Queue (คิวลำดับความสำคัญ) คือ data structure ที่ออกแบบมาเพื่อตอบคำถามเดียวให้เร็วที่สุด นั่นคือ ตอนนี้ตัว minimum (น้อยสุด) หรือ maximum (มากสุด) คือตัวไหน แล้ว pop (หยิบออก) มันไป โจทย์จำนวนมากบน LeetCode ที่ต้องคอยเลือกค่าสุดขั้วซ้ำ ๆ เช่น หา Kth largest (ค่ามากอันดับ k), จ้างคนที่ถูกที่สุด, หรือ process ตาม priority (ลำดับความสำคัญ) จะแก้ได้สวยงามด้วย heap" },

      { t: "h2", c: "heap คืออะไร ทำไมถึงเร็ว" },
      { t: "p", c: "ลองนึกภาพว่าเรามีตัวเลขกองหนึ่ง แล้วต้อง pop ตัว minimum ออกไปเรื่อย ๆ ถ้าเราเก็บเป็น array (ลิสต์) ธรรมดา ทุกครั้งที่จะหาตัว minimum ต้อง iterate (วน) ดูทั้ง array เป็น O(n) และถ้าจะ sort (เรียง) ก่อนก็ O(n log n) แต่ heap ทำให้เรา pop ตัว minimum ออกได้ที่ O(log n) และ peek (แอบดูโดยไม่หยิบออก) ตัว minimum ได้ที่ O(1) นี่คือเหตุผลที่มันเร็วกว่ามากเมื่อต้องทำซ้ำหลายรอบ" },
      { t: "p", c: "หน้าตาของ heap คือ binary tree (ต้นไม้สองแขนง) ที่ทุก node (โหนด) ต้อง น้อยกว่าหรือเท่ากับ child (ลูก) ของมันเสมอ (สำหรับ min-heap) ผลก็คือตัว minimum จะลอยขึ้นมาอยู่บนสุด (root/ราก) เสมอ ต้นไม้นี้ store (เก็บ) ใน array แบบแนวราบ ไม่ต้องมี pointer (ตัวชี้) จริง ๆ" },
      { t: "code", lang: "python", c: `           1          <- ราก = ตัวน้อยสุดเสมอ
         /   \\
        3     2
       / \\   /
      7   4 5

# เก็บในอาร์เรย์: [1, 3, 2, 7, 4, 5]
# ลูกของ index i อยู่ที่ 2*i+1 และ 2*i+2` },

      { t: "h2", c: "module heapq ใน Python" },
      { t: "p", c: "ใน Python เราไม่ต้องเขียน heap เองจากศูนย์ มี module ชื่อ heapq ในไลบรารีมาตรฐาน ที่ทำงานบน array ธรรมดาโดยตรง (มันมอง array ตัวนั้นเป็น min-heap) operation หลักมีดังนี้:" },
      { t: "table", head: ["operation", "ความหมาย", "Big-O"], rows: [
        ["heapq.heappush(h, x)", "push ค่า x เข้า heap", "O(log n)"],
        ["heapq.heappop(h)", "pop ตัว minimum ออกแล้ว return", "O(log n)"],
        ["h[0]", "peek ตัว minimum (ไม่ pop ออก)", "O(1)"],
        ["heapq.heapify(list)", "heapify แปลงทั้ง array เป็น heap in-place (ในที่เดิม)", "O(n)"],
        ["len(h)", "จำนวน element (สมาชิก) ใน heap", "O(1)"],
      ] },
      { t: "code", lang: "python", c: `import heapq

h = []
heapq.heappush(h, 5)
heapq.heappush(h, 1)
heapq.heappush(h, 3)
print(h[0])            # 1  (แอบดูตัวน้อยสุด O(1))
print(heapq.heappop(h))  # 1  (หยิบตัวน้อยสุดออก)
print(heapq.heappop(h))  # 3

# แปลงลิสต์ที่มีอยู่แล้วให้เป็น heap ทันที (เร็วกว่า push ทีละตัว)
nums = [9, 4, 7, 1, 2]
heapq.heapify(nums)    # O(n)
print(heapq.heappop(nums))  # 1` },

      { t: "h2", c: "อยากได้ max-heap ต้องใช้ค่าลบ" },
      { t: "callout", title: "จุดสำคัญ: heapq เป็น min-heap เท่านั้น", c: "Python มีแค่ min-heap (pop ตัว minimum) ถ้าอยากได้ max-heap (pop ตัว maximum) ให้ใช้ทริก push ค่า negative (ติดลบ) เข้าไปแทน แล้วตอน pop ออกค่อย negate กลับ เพราะตัว minimum ของค่า negative ก็คือตัว maximum ของค่าจริงนั่นเอง" },
      { t: "code", lang: "python", c: `import heapq

# จำลอง max-heap ด้วยการเก็บค่าติดลบ
max_heap = []
for x in [5, 1, 8, 3]:
    heapq.heappush(max_heap, -x)   # ใส่ค่าลบ

biggest = -heapq.heappop(max_heap)  # หยิบออกแล้วใส่ลบกลับ
print(biggest)   # 8` },
      { t: "p", c: "นอกจากนี้ heapq ยังมีฟังก์ชันสำเร็จรูป nlargest และ nsmallest ที่ return k ตัวที่มาก/น้อยที่สุดจาก iterable ได้ทันที เหมาะเวลาต้องการ top-k แบบง่าย ๆ" },
      { t: "code", lang: "python", c: `import heapq

nums = [4, 10, 1, 7, 3, 9]
print(heapq.nlargest(3, nums))   # [10, 9, 7]  (3 ตัวมากสุด)
print(heapq.nsmallest(2, nums))  # [1, 3]      (2 ตัวน้อยสุด)

# ใช้ key ได้ด้วย เหมือน sorted
words = ["apple", "kiwi", "banana"]
print(heapq.nlargest(1, words, key=len))  # ['banana']` },

      { t: "callout", title: "หมวดนี้มี 4 ข้อ", c: "ถ้าโจทย์มีคำว่า Kth (อันดับ k), maximum/minimum (มาก/น้อยที่สุด), top-k, หรือ ต้อง select (เลือก) ตัวสุดขั้วออกไปเรื่อย ๆ ในขณะที่ข้อมูลเปลี่ยนไปด้วย — heap มักเป็นคำตอบ พร้อมแล้วกดถัดไปเริ่มข้อแรกได้เลย" },
    ],
  },

  "lc75-p49": {
    slug: "lc75-p49",
    title: "ข้อ 49 · LC215 Kth Largest Element in an Array (ตัวมากอันดับ k) 🟡",
    lead: "หาค่าที่มากเป็นอันดับที่ k โดยไม่ต้อง sort (เรียง) ทั้ง array ใช้ min-heap ขนาด k เป็นกรอบเก็บ top-k",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ Kth Largest Element in an Array: ให้ array (ลิสต์) ของตัวเลข nums และเลข k ให้หาค่าที่มากเป็นอันดับที่ k เมื่อ sort (เรียง) จากมากไปน้อย (นับค่าซ้ำด้วย ไม่ใช่ค่าที่ไม่ซ้ำอันดับ k)" },
      { t: "ul", c: [
        "nums = [3,2,1,5,6,4], k = 2 → 5 (อันดับ 1 คือ 6, อันดับ 2 คือ 5)",
        "nums = [3,2,3,1,2,4,5,5,6], k = 4 → 4",
      ] },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "โครงสร้างที่ใช้: min-heap (จาก heapq) เราต้องการ maintain (รักษา) k ตัวที่มากที่สุดไว้ แล้วในบรรดา k ตัวนั้น ตัว minimum ก็คือคำตอบ (ตัวมากอันดับ k) พอดี" },
      { t: "p", c: "คิดแบบง่าย/ช้าก่อน: วิธี naive คือ sort ทั้ง array แล้วหยิบ element (สมาชิก) ที่ตำแหน่ง k จากท้าย ซึ่งเป็น O(n log n) แต่ถ้า k เล็กมากเทียบกับ n เราไม่จำเป็นต้อง sort ทุกตัว แค่ maintain กรอบ top-k ไว้ก็พอ ทำให้เหลือ O(n log k) ที่ดีกว่าเมื่อ k น้อย" },
      { t: "ol", c: [
        "initialize (ตั้งค่าเริ่มต้น) min-heap ว่าง ๆ ชื่อ heap",
        "iterate (วน) ทีละตัว n ใน array: push n เข้า heap",
        "ถ้าหลัง push แล้ว heap ยาวเกิน k ตัว ให้ heappop ทิ้งตัว minimum (มันเล็กเกินกว่าจะติด top-k)",
        "จบ loop heap เหลือ k ตัวที่มากที่สุดของทั้ง array ตัว minimum ในนั้น (heap[0]) คือคำตอบ",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "สับสนว่าต้องใช้ max-heap แต่จริง ๆ การหา k ตัวมากสุดกลับใช้ min-heap เพราะเราอยากให้ตัวเล็กสุดในกลุ่มถูก evict (เขี่ยออก) ได้ง่าย ๆ อีก edge case คือ k เท่ากับความยาว array ก็จะได้ตัว minimum ของทั้ง array ซึ่งถูกต้อง" },

      { t: "h2", c: "ไล่ทีละสเต็ป" },
      { t: "p", c: "จำลอง nums = [3,2,1,5,6,4], k = 2 (maintain ไว้แค่ 2 ตัวมากสุด):" },
      { t: "table", head: ["push n", "heap หลัง push", "ยาวเกิน k?", "heap หลังจัดการ"], rows: [
        ["3", "[3]", "ไม่", "[3]"],
        ["2", "[2, 3]", "ไม่", "[2, 3]"],
        ["1", "[1, 3, 2]", "ใช่ pop 1", "[2, 3]"],
        ["5", "[2, 3, 5]", "ใช่ pop 2", "[3, 5]"],
        ["6", "[3, 5, 6]", "ใช่ pop 3", "[5, 6]"],
        ["4", "[4, 6, 5]", "ใช่ pop 4", "[5, 6]"],
      ] },
      { t: "p", c: "จบ loop heap[0] = 5 คือคำตอบ" },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "code", lang: "python", c: `import heapq

def find_kth_largest(nums, k):
    heap = []
    for n in nums:
        heapq.heappush(heap, n)     # ใส่เข้า min-heap
        if len(heap) > k:
            heapq.heappop(heap)     # เกิน k ตัว ทิ้งตัวน้อยสุด
    # เหลือ k ตัวที่มากที่สุด และ heap[0] คือตัวน้อยสุดในนั้น
    return heap[0]

print(find_kth_largest([3, 2, 1, 5, 6, 4], 2))          # 5
print(find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)) # 4` },
        { t: "p", c: "ไอเดียคือเราต้องการ maintain k ตัวที่มากที่สุด แล้วในบรรดา k ตัวนั้น ตัว minimum ก็คือคำตอบ (ตัวมากอันดับ k) เราใช้ min-heap ขนาด k เป็นกรอบเก็บ เมื่อ push ตัวใหม่แล้ว heap ยาวเกิน k เราก็ pop ตัว minimum ทิ้งไป (เพราะมันเล็กเกินกว่าจะติด top-k) ตัวที่รอดอยู่จึงเป็น k ตัวใหญ่สุดเสมอ" },
        { t: "p", c: "ถ้าเปลี่ยนไปใช้ max-heap แทน จะกลายเป็นต้อง pop ออก n-k ครั้งเพื่อ access (เข้าถึง) อันดับ k ซึ่งวุ่นกว่า การใช้ min-heap ขนาด k ทำให้ตัวที่เล็กเกินไปหลุดออกเองอัตโนมัติ เหลือแต่ผู้ท้าชิง top-k เท่านั้น" },
        { t: "p", c: "Time O(n log k) iterate ทุกตัว n ครั้ง แต่ละครั้ง push/pop บน heap ขนาด k เป็น O(log k) · Space O(k) heap เก็บอย่างมาก k ตัว" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "โจทย์ top-k ไม่ต้อง sort ทั้ง array แค่ maintain min-heap ขนาด k evict ตัวเล็กสุดออกเรื่อย ๆ ตัวที่รอดคือ top-k และ heap[0] คือตัวอันดับ k พอดี" },
    ],
  },

  "lc75-p50": {
    slug: "lc75-p50",
    title: "ข้อ 50 · LC2336 Smallest Number in Infinite Set (เลขน้อยสุดเซ็ตอนันต์) 🟡",
    lead: "design (ออกแบบ) class จัดการ set (เซ็ต) ของ positive integer (จำนวนเต็มบวก) ทั้งหมด ด้วย counter (ตัวนับ) current + min-heap สำหรับเลขที่ addBack กลับมา",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ Smallest Number in Infinite Set: design (ออกแบบ) class SmallestInfiniteSet ที่ตอนเริ่มต้นบรรจุ positive integer (จำนวนเต็มบวก) ทุกตัว 1, 2, 3, ... ไปจนถึง infinity (อนันต์) ต้อง support (รองรับ) สอง operation: popSmallest() return เลขที่น้อยที่สุดที่ยังอยู่ใน set แล้ว remove มันออก และ addBack(num) เพิ่มเลข num กลับเข้า set (ถ้ามันเคยถูก remove ออกไปแล้ว)" },
      { t: "ul", c: [
        "popSmallest ครั้งแรก ๆ คืน 1, 2, 3 ตามลำดับ",
        "จากนั้น addBack(2) แล้ว popSmallest คืน 2 (กลับมาแล้ว) ต่อด้วย 4, 5",
      ] },

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
        { t: "code", lang: "python", c: `import heapq

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
print(s.popSmallest())  # 5` },
        { t: "p", c: "กุญแจของโจทย์คือ เราไม่จำเป็นต้อง store เลข infinity จริง เพราะเลขในช่วง current เป็นต้นไปยัง sorted อยู่แล้ว แค่ track ว่าถึงไหนก็พอ ปัญหาเดียวคือเลขที่ถูก addBack กลับมา ซึ่งอาจเล็กกว่า current เราจึง store มันแยกใน min-heap เพื่อให้ pop ตัว minimum ออกก่อนได้เสมอ" },
        { t: "p", c: "เวลา popSmallest เราจึง compare (เทียบ) ง่าย ๆ: ถ้ามีของใน heap (ซึ่งการันตีว่าเล็กกว่า current) pop จาก heap ก่อน ไม่งั้นค่อยเดินสาย infinity ต่อ ถ้าตัด set in_heap ออก โค้ดจะยอมให้ addBack เลขเดิมซ้ำได้ ทำให้ heap มีค่าซ้ำและ popSmallest return ค่าเดียวกันสองครั้ง ผิดนิยามของ set" },
        { t: "p", c: "Time popSmallest O(log n) และ addBack O(log n) โดย n คือจำนวนเลขใน heap · Space O(n) store เฉพาะเลขที่ถูก addBack กลับมา ไม่ใช่เลข infinity ทั้งหมด" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "เมื่อเจอ set/range (ช่วง) ที่ใหญ่มากหรือ infinity อย่า store ทั้งหมด — ใช้ counter แทนช่วงที่ยัง sorted ดี แล้วใช้ heap เก็บเฉพาะ exception (ข้อยกเว้น คือเลขที่โดนเพิ่มกลับมา) ที่ทำให้ลำดับผิดจากปกติ" },
    ],
  },

  "lc75-p51": {
    slug: "lc75-p51",
    title: "ข้อ 51 · LC2542 Maximum Subsequence Score (คะแนน subsequence มากสุด) 🟡",
    lead: "score (คะแนน) = sum (ผลรวม) nums1 คูณ min ของ nums2 ตรึง min ไว้ด้วยการ sort แล้วใช้ min-heap maintain sum nums1 ให้มากสุด",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ Maximum Subsequence Score: ให้ array nums1 และ nums2 ยาวเท่ากัน และเลข k ให้เลือก index (ตำแหน่ง) มา k ตัว (จากตำแหน่งเดียวกันของทั้งสอง array) โดย score (คะแนน) = (sum ของ nums1 ที่เลือก) คูณ (ค่า minimum ของ nums2 ที่เลือก) ต้องการ score มากที่สุด" },
      { t: "ul", c: [
        "nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3 → 12 (เลือก index 0,2,3: ผลรวม nums1 = 1+3+2 = 6, min ของ nums2 = min(2,3,4) = 2, คะแนน = 6*2 = 12)",
        "nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1 → 30",
      ] },

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
        { t: "code", lang: "python", c: `import heapq

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
print(max_score([4, 2, 3, 1, 1], [7, 5, 10, 9, 6], 1))  # 30` },
        { t: "p", c: "เมื่อเรา sort ตาม nums2 จากมากไปน้อย แล้ว iterate ไปทีละตัว ณ คู่ปัจจุบัน b คือ nums2 ที่เล็กที่สุดในบรรดาคู่ที่เห็นมาแล้ว (เพราะที่มาก่อนหน้าล้วนมี nums2 มากกว่าหรือเท่ากับ b) ดังนั้นถ้าเราเลือก k ตัวจากกลุ่มที่เห็นมาแล้วโดยรวม b ด้วย min ของ nums2 ในกลุ่มจะเป็น b พอดี" },
        { t: "p", c: "เมื่อ b ถูก fix เป็น min แล้ว เราแค่อยากให้ sum nums1 ของ k ตัวมากที่สุด จึงใช้ min-heap ขนาด k เก็บค่า nums1 พร้อมตัวแปร total ตาม sum ไว้ เมื่อ heap เกิน k ก็ evict nums1 ตัวเล็กสุดออก (พร้อมลบออกจาก total) ถ้าไม่ลบออกจาก total score จะเพี้ยนสูงเกินจริงทันที" },
        { t: "p", c: "Time O(n log n) จากการ sort บวกการ iterate push/pop heap อีก O(n log k) · Space O(n) สำหรับ array คู่ที่ sort แล้ว และ heap ขนาด k" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "โจทย์ที่ score ขึ้นกับสอง factor (ปัจจัย) พร้อมกัน ให้ fix ปัจจัยหนึ่งด้วยการ sort (ตัวคูณ min/max) แล้วปล่อยให้ heap จัดการอีก factor (sum top-k) เป็น pattern ที่เจอบ่อยในโจทย์ optimize สองมิติ" },
    ],
  },

  "lc75-p52": {
    slug: "lc75-p52",
    title: "ข้อ 52 · LC2462 Total Cost to Hire K Workers (ต้นทุนจ้าง k คน) 🟡",
    lead: "แต่ละรอบ hire (จ้าง) คนถูกสุดจากหัวหรือท้ายแถว ใช้ min-heap สองอันคุมสองฝั่ง เติมคนจากตรงกลางเข้ามาแทน",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ Total Cost to Hire K Workers: มี worker (คนงาน) เรียงเป็นแถว costs[i] คือ cost (ค่าจ้าง) ของคนที่ i ต้อง hire (จ้าง) k รอบ แต่ละรอบ select คนที่ถูกที่สุดจาก candidates คนแรกสุดของแถว หรือ candidates คนท้ายสุดของแถว (ถ้าค่าเท่ากันให้เลือก index น้อยกว่า) เมื่อ hire คนไปแล้ว คนที่อยู่ถัดเข้ามาจะเลื่อนมาเป็น candidate แทน ต้องการ total cost (ต้นทุนรวม) น้อยสุด" },
      { t: "ul", c: [
        "costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4 → 11",
        "costs = [1,2,4,1], k = 3, candidates = 3 → 4",
      ] },

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
        { t: "code", lang: "python", c: `import heapq

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
print(total_cost([1, 2, 4, 1], 3, 3))  # 4` },
        { t: "p", c: "ไอเดียคือ ในแต่ละรอบเราต้อง select คนถูกสุดจากสองฝั่งของแถว (หัว candidates คน และท้าย candidates คน) การหาตัว minimum ของแต่ละฝั่งซ้ำ ๆ คือหน้าที่ของ min-heap พอดี เราจึงสร้าง heap สองอันคุมสองฝั่ง แต่ละรอบ compare head[0] กับ tail[0] เลือกตัวที่น้อยกว่า (เท่ากันเลือกหัวเพื่อให้ index น้อยกว่าตามกติกา) แล้วบวกเข้า total cost" },
        { t: "p", c: "จุดที่ต้องระวังที่สุดคือการ push คนใหม่จากตรงกลาง และการไม่ให้สองฝั่งนับคนซ้ำ ตอนสร้าง tail เราใช้ max(candidates, n - candidates) เป็นจุดเริ่ม เพื่อกันไม่ให้ช่วงหัวกับท้าย overlap (ทับกัน) เมื่อ 2*candidates มากกว่า n ส่วน pointer left และ right จะเดินเข้าหากันตรงกลาง เรา push คนใหม่ก็ต่อเมื่อ left <= right เท่านั้น" },
        { t: "p", c: "Time O((candidates + k) log candidates) สร้าง heap สองอันเป็น O(candidates) และ iterate k รอบ แต่ละรอบ push/pop เป็น O(log candidates) · Space O(candidates) สำหรับ heap สองอันรวมกัน" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "เมื่อต้อง select ตัวสุดขั้วจากหลายกลุ่มพร้อมกัน (หัว/ท้าย) ให้แต่ละกลุ่มมี heap ของตัวเอง แล้ว compare ยอดของแต่ละ heap ในแต่ละรอบ เป็น pattern ที่ต่อยอดไปโจทย์ merge k lists ได้" },
    ],
  },
};
