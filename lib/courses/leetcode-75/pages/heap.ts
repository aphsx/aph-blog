import type { Page } from "@/lib/types";

export const heapPages: Record<string, Page> = {
  "lc75-heap": {
    slug: "lc75-heap",
    title: "Heap / Priority Queue — คิวลำดับความสำคัญ",
    lead: "โครงสร้างข้อมูลที่หยิบตัวน้อยสุด (หรือมากสุด) ออกมาได้เร็ว O(log n) เหมาะกับโจทย์ที่ต้องเลือก top-k หรือค่าสุดขั้วซ้ำ ๆ",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "Heap (ฮีป) หรือที่มักเรียกว่า Priority Queue (คิวลำดับความสำคัญ) คือโครงสร้างข้อมูลที่ออกแบบมาเพื่อตอบคำถามเดียวให้เร็วที่สุด นั่นคือ ตอนนี้ตัวที่น้อยสุด (หรือมากสุด) คือตัวไหน และหยิบมันออกไป โจทย์จำนวนมากบน LeetCode ที่ต้องคอยเลือกค่าสุดขั้วซ้ำ ๆ เช่น หาค่ามากอันดับ k, จ้างคนที่ถูกที่สุด, หรือประมวลผลตามลำดับความสำคัญ จะแก้ได้สวยงามด้วย heap" },

      { t: "h2", c: "แนวคิดของหัวข้อนี้" },
      { t: "p", c: "ลองนึกภาพว่าเรามีตัวเลขกองหนึ่ง แล้วต้องหยิบตัวน้อยสุดออกไปเรื่อย ๆ ถ้าเราเก็บเป็นลิสต์ธรรมดา ทุกครั้งที่จะหาตัวน้อยสุดต้องไล่ดูทั้งลิสต์ O(n) และถ้าจะเรียงก่อนก็ O(n log n) แต่ heap ทำให้เราหยิบตัวน้อยสุดออกได้ที่ O(log n) และแอบดูตัวน้อยสุด (โดยไม่หยิบออก) ได้ที่ O(1) นี่คือเหตุผลที่มันเร็วกว่ามากเมื่อต้องทำซ้ำหลายรอบ" },
      { t: "p", c: "หน้าตาของ heap คือ binary tree ที่ทุก node ต้อง น้อยกว่าหรือเท่ากับ ลูกของมันเสมอ (สำหรับ min-heap) ผลก็คือตัวที่น้อยสุดจะลอยขึ้นมาอยู่บนสุด (ราก) เสมอ ต้นไม้นี้เก็บในอาร์เรย์แบบแนวราบ ไม่ต้องมี pointer จริง ๆ" },
      { t: "code", lang: "python", c: `           1          <- ราก = ตัวน้อยสุดเสมอ
         /   \\
        3     2
       / \\   /
      7   4 5

# เก็บในอาร์เรย์: [1, 3, 2, 7, 4, 5]
# ลูกของ index i อยู่ที่ 2*i+1 และ 2*i+2` },
      { t: "p", c: "ใน Python เราไม่ต้องเขียน heap เองจากศูนย์ มี module ชื่อ heapq ในไลบรารีมาตรฐาน ที่ทำงานบนลิสต์ธรรมดาโดยตรง (มันมองลิสต์ตัวนั้นเป็น min-heap) operation หลักมีดังนี้:" },
      { t: "table", head: ["operation", "ความหมาย", "Big-O"], rows: [
        ["heapq.heappush(h, x)", "ใส่ค่า x เข้า heap", "O(log n)"],
        ["heapq.heappop(h)", "หยิบและคืนตัวน้อยสุดออก", "O(log n)"],
        ["h[0]", "แอบดูตัวน้อยสุด (ไม่หยิบออก)", "O(1)"],
        ["heapq.heapify(list)", "แปลงลิสต์ทั้งก้อนเป็น heap ในที่เดิม", "O(n)"],
        ["len(h)", "จำนวนสมาชิกใน heap", "O(1)"],
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
      { t: "callout", title: "จุดสำคัญ: heapq เป็น min-heap เท่านั้น", c: "Python มีแค่ min-heap (หยิบตัวน้อยสุด) ถ้าอยากได้ max-heap (หยิบตัวมากสุด) ให้ใช้ทริกใส่ค่าติดลบเข้าไปแทน แล้วตอนหยิบออกค่อยใส่ลบกลับ เพราะตัวที่น้อยสุดของค่าติดลบ ก็คือตัวที่มากสุดของค่าจริงนั่นเอง" },
      { t: "code", lang: "python", c: `import heapq

# จำลอง max-heap ด้วยการเก็บค่าติดลบ
max_heap = []
for x in [5, 1, 8, 3]:
    heapq.heappush(max_heap, -x)   # ใส่ค่าลบ

biggest = -heapq.heappop(max_heap)  # หยิบออกแล้วใส่ลบกลับ
print(biggest)   # 8` },
      { t: "p", c: "นอกจากนี้ heapq ยังมีฟังก์ชันสำเร็จรูป nlargest และ nsmallest ที่คืน k ตัวที่มาก/น้อยที่สุดจาก iterable ได้ทันที เหมาะเวลาต้องการ top-k แบบง่าย ๆ" },
      { t: "code", lang: "python", c: `import heapq

nums = [4, 10, 1, 7, 3, 9]
print(heapq.nlargest(3, nums))   # [10, 9, 7]  (3 ตัวมากสุด)
print(heapq.nsmallest(2, nums))  # [1, 3]      (2 ตัวน้อยสุด)

# ใช้ key ได้ด้วย เหมือน sorted
words = ["apple", "kiwi", "banana"]
print(heapq.nlargest(1, words, key=len))  # ['banana']` },
      { t: "callout", title: "เมื่อไหร่ที่คิดถึง heap", c: "ถ้าโจทย์มีคำว่า อันดับ k, มาก/น้อยที่สุด, top-k, หรือ ต้องเลือกตัวสุดขั้วออกไปเรื่อย ๆ ในขณะที่ข้อมูลเปลี่ยนไปด้วย — heap มักเป็นคำตอบ โดยเฉพาะโจทย์ top-k เราไม่ต้องเรียงทั้งลิสต์ (O(n log n)) แค่รักษา heap ขนาด k ก็พอ (O(n log k))" },

      { t: "h2", c: "ข้อ 1 — หาตัวมากอันดับ k (LC215) 🟡" },
      { t: "p", c: "ให้ลิสต์ตัวเลข nums และเลข k ให้หาค่าที่มากเป็นอันดับที่ k เมื่อเรียงจากมากไปน้อย (นับค่าซ้ำด้วย ไม่ใช่ค่าที่ไม่ซ้ำอันดับ k) เช่น nums = [3,2,1,5,6,4], k = 2 ตอบ 5 (อันดับ 1 คือ 6, อันดับ 2 คือ 5) หรือ nums = [3,2,3,1,2,4,5,5,6], k = 4 ตอบ 4" },
      { t: "callout", title: "คำใบ้", c: "อย่าเรียงทั้งลิสต์ ลองรักษา min-heap ขนาด k ตัวไว้เสมอ เมื่อ heap เกิน k ตัว ก็หยิบตัวน้อยสุดทิ้ง สุดท้ายตัวน้อยสุดใน heap ขนาด k นี้ ก็คือตัวมากอันดับ k พอดี" },
      { t: "details", summary: "กดดูเฉลย + คำอธิบาย", c: [
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
        { t: "p", c: "ไอเดียคือเราต้องการเก็บ k ตัวที่มากที่สุด แล้วในบรรดา k ตัวนั้น ตัวที่น้อยสุดก็คือคำตอบ (ตัวมากอันดับ k) เราใช้ min-heap ขนาด k เป็นกรอบเก็บ เมื่อใส่ตัวใหม่แล้ว heap ยาวเกิน k เราก็หยิบตัวน้อยสุดทิ้งไป (เพราะมันเล็กเกินกว่าจะติด top-k) ตัวที่รอดอยู่จึงเป็น k ตัวใหญ่สุดเสมอ" },
        { t: "p", c: "จุดพลาดที่พบบ่อยคือสับสนว่าต้องใช้ max-heap แต่จริง ๆ การหา k ตัวมากสุดกลับใช้ min-heap เพราะเราอยากให้ตัวเล็กสุดในกลุ่มถูกเขี่ยออกได้ง่าย ๆ อีก edge case คือ k เท่ากับความยาวลิสต์ ก็จะได้ตัวน้อยสุดของทั้งลิสต์ ซึ่งถูกต้อง" },
        { t: "p", c: "Time O(n log k) ไล่ทุกตัว n ครั้ง แต่ละครั้ง push/pop บน heap ขนาด k เป็น O(log k) · Space O(k) heap เก็บอย่างมาก k ตัว" },
      ] },

      { t: "h2", c: "ข้อ 2 — เซ็ตอนันต์ตัวน้อยสุด (LC2336) 🟡" },
      { t: "p", c: "ออกแบบคลาส SmallestInfiniteSet ที่ตอนเริ่มต้นบรรจุเลขจำนวนเต็มบวกทุกตัว 1, 2, 3, ... ไปจนถึงอนันต์ ต้องรองรับสองคำสั่ง: popSmallest() คืนเลขที่น้อยที่สุดที่ยังอยู่ในเซ็ตแล้วเอามันออก และ addBack(num) เพิ่มเลข num กลับเข้าเซ็ต (ถ้ามันเคยถูกเอาออกไปแล้ว) เช่น เรียก popSmallest ได้ 1, 2, 3 ตามลำดับ, addBack(2), แล้ว popSmallest คืน 2 (กลับมาแล้ว), จากนั้น 4, 5" },
      { t: "callout", title: "คำใบ้", c: "เราไม่ต้องเก็บเลขอนันต์จริง ๆ พอ ใช้ตัวนับ current บอกว่าเลขต่อไปที่ยังไม่เคยถูกแตะคือเท่าไร ส่วนเลขที่ถูก addBack กลับมา (ซึ่งเล็กกว่า current) เก็บใน min-heap แยกไว้ พร้อม set กันเลขซ้ำ" },
      { t: "details", summary: "กดดูเฉลย + คำอธิบาย", c: [
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
        { t: "p", c: "กุญแจของโจทย์คือ เราไม่จำเป็นต้องเก็บเลขอนันต์จริง เพราะเลขในช่วง current, current+1, ... ยังเรียงเป็นระเบียบอยู่แล้ว แค่จำว่าถึงไหนก็พอ ปัญหาเดียวคือเลขที่ถูก addBack กลับมา ซึ่งอาจเล็กกว่า current เราจึงเก็บมันแยกใน min-heap เพื่อให้หยิบตัวน้อยสุดออกก่อนได้เสมอ เวลา popSmallest เราจึงเทียบ: ถ้ามีของใน heap (ซึ่งการันตีว่าเล็กกว่า current) หยิบจาก heap ก่อน ไม่งั้นค่อยเดินสายอนันต์ต่อ" },
        { t: "p", c: "จุดพลาดที่พบบ่อยคือลืมกันเลขซ้ำใน heap — ถ้า addBack(2) สองครั้งโดยไม่มี set คุม heap จะมีเลข 2 สองตัว ทำให้ popSmallest คืน 2 ซ้ำผิดความหมายของ เซ็ต เราจึงใช้ in_heap เช็คก่อนใส่ และอีกจุดคือ addBack เลขที่ยังไม่เคยหยิบ (num มากกว่าหรือเท่ากับ current) ต้องไม่ทำอะไร เพราะมันยังอยู่ในเซ็ตอยู่แล้ว" },
        { t: "p", c: "Time popSmallest O(log n) และ addBack O(log n) โดย n คือจำนวนเลขใน heap · Space O(n) เก็บเฉพาะเลขที่ถูก addBack กลับมา ไม่ใช่เลขอนันต์ทั้งหมด" },
      ] },

      { t: "h2", c: "ข้อ 3 — คะแนนซับซีเควนซ์สูงสุด (LC2542) 🟡" },
      { t: "p", c: "ให้ลิสต์ nums1 และ nums2 ยาวเท่ากัน และเลข k ให้เลือก index มา k ตัว (จากตำแหน่งเดียวกันของทั้งสองลิสต์) โดยคะแนน = (ผลรวมของ nums1 ที่เลือก) คูณ (ค่าน้อยสุดของ nums2 ที่เลือก) ต้องการคะแนนมากที่สุด เช่น nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3 คำตอบคือ 12 (เลือก index 0,2,3: ผลรวม nums1 = 1+3+2 = 6, min ของ nums2 = min(2,3,4) = 2, คะแนน = 6*2 = 12)" },
      { t: "callout", title: "คำใบ้", c: "ตัวคูณ min(nums2) เป็นตัวยาก ลองเรียงคู่ (nums1, nums2) ตาม nums2 จากมากไปน้อย แล้วไล่ทีละตัว ถ้าเรากำหนดว่า nums2 ของตัวปัจจุบันคือ ตัวที่น้อยสุด แล้วเลือกอีก k-1 ตัวที่มาก่อนหน้า (nums2 ใหญ่กว่า) เราก็อยากให้ผลรวม nums1 ของ k ตัวนั้นมากสุด ใช้ min-heap เก็บ nums1 ให้เขี่ยตัวเล็กออก" },
      { t: "details", summary: "กดดูเฉลย + คำอธิบาย", c: [
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
        { t: "p", c: "ความยากของโจทย์คือคะแนนขึ้นกับสองอย่างพร้อมกัน: ผลรวม nums1 (ยิ่งมากยิ่งดี) กับ min ของ nums2 (ยิ่งมากยิ่งดี) การจัดการสองตัวแปรพร้อมกันยาก เทคนิคคือ ตรึงตัวหนึ่งไว้ก่อน เราเรียงตาม nums2 จากมากไปน้อย แล้วเดินไปทีละตัว เมื่อถึงคู่ที่ nums2 = b เรากำหนดให้ b เป็นตัวที่น้อยสุดของกลุ่ม ซึ่งแปลว่าเราเลือกได้เฉพาะตัวที่มาก่อนหน้า (nums2 ใหญ่กว่าหรือเท่ากับ b) เท่านั้น" },
        { t: "p", c: "เมื่อ b ถูกตรึงเป็น min แล้ว เราแค่อยากให้ผลรวม nums1 ของ k ตัวมากที่สุด จึงใช้ min-heap ขนาด k เก็บค่า nums1 พร้อมตัวแปร total ตามผลรวมไว้ เมื่อ heap เกิน k ก็เขี่ย nums1 ตัวเล็กสุดออก (พร้อมลบออกจาก total) เมื่อ heap ครบ k ตัวพอดี ก็คำนวณ total * b แล้วอัปเดตคำตอบ จุดพลาดที่พบบ่อยคือลืมอัปเดต total ตอน pop หรือคำนวณคะแนนตอนที่ heap ยังไม่ครบ k ตัว" },
        { t: "p", c: "Time O(n log n) จากการเรียง บวกการวน push/pop heap อีก O(n log k) · Space O(n) สำหรับลิสต์คู่ที่เรียง และ heap ขนาด k" },
      ] },

      { t: "h2", c: "ข้อ 4 — ต้นทุนรวมจ้าง k คน (LC2462) 🟡" },
      { t: "p", c: "มีคนงานเรียงเป็นแถว costs[i] คือค่าจ้างของคนที่ i ต้องจ้าง k รอบ แต่ละรอบเลือกจ้างคนที่ถูกที่สุดจาก candidates คนแรกสุดของแถว หรือ candidates คนท้ายสุดของแถว (ถ้าค่าเท่ากันให้เลือก index น้อยกว่า) เมื่อจ้างคนไปแล้ว คนที่อยู่ถัดเข้ามาจะเลื่อนมาเป็น candidate แทน ต้องการต้นทุนรวมน้อยสุด เช่น costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4 คำตอบคือ 11" },
      { t: "callout", title: "คำใบ้", c: "ใช้ min-heap สองอัน อันหนึ่งคุมฝั่งหัวแถว อีกอันคุมฝั่งท้ายแถว แต่ละรอบเทียบหัวของสอง heap แล้วเลือกตัวที่ถูกกว่า (ถ้าเท่ากันเลือกฝั่งหัว) จากนั้นเติมคนใหม่จากตรงกลางเข้ามาแทนฝั่งที่เพิ่งจ้างไป โดยระวังไม่ให้สอง pointer เดินชนกัน" },
      { t: "details", summary: "กดดูเฉลย + คำอธิบาย", c: [
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
        { t: "p", c: "ไอเดียคือ ในแต่ละรอบเราต้องเลือกคนถูกสุดจากสองฝั่งของแถว (หัว candidates คน และท้าย candidates คน) การหาตัวถูกสุดของแต่ละฝั่งซ้ำ ๆ คือหน้าที่ของ min-heap พอดี เราจึงสร้าง heap สองอันคุมสองฝั่ง แต่ละรอบเทียบ head[0] กับ tail[0] เลือกตัวที่น้อยกว่า (เท่ากันเลือกหัวเพื่อให้ index น้อยกว่าตามกติกา) แล้วบวกเข้าต้นทุน" },
        { t: "p", c: "จุดที่ต้องระวังที่สุดคือการเติมคนใหม่จากตรงกลาง และการไม่ให้สองฝั่งนับคนซ้ำ ตอนสร้าง tail เราใช้ max(candidates, n - candidates) เป็นจุดเริ่ม เพื่อกันไม่ให้ช่วงหัวกับท้ายทับกันเมื่อ 2*candidates มากกว่า n ส่วน pointer left และ right จะเดินเข้าหากันตรงกลาง เราเติมคนใหม่ก็ต่อเมื่อ left <= right เท่านั้น ถ้าเลยจุดนี้แปลว่าคนตรงกลางถูกดึงเข้า heap ครบแล้ว ไม่มีใครให้เติมอีก" },
        { t: "p", c: "Time O((candidates + k) log candidates) สร้าง heap สองอันเป็น O(candidates) และวน k รอบ แต่ละรอบ push/pop เป็น O(log candidates) · Space O(candidates) สำหรับ heap สองอันรวมกัน" },
      ] },

      { t: "links", c: [
        { title: "ถัดไป: Binary Search →", slug: "lc75-binary-search", desc: "ค้นหาแบบแบ่งครึ่งบนของที่เรียงแล้ว O(log n)" },
        { title: "← Graphs — BFS", slug: "lc75-graph-bfs" },
      ] },
    ],
  },
};
