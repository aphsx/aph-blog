import type { Page } from "@/lib/types";

export const queuePages: Record<string, Page> = {
  "lc75-intro-queue": {
    slug: "lc75-intro-queue",
    title: {
      th: "Queue — พื้นฐาน & แนวคิด",
      en: "Queue — Fundamentals & Mental Models",
    },
    lead: {
      th: "แถวที่ \"ใครมาก่อนได้ก่อน\" (FIFO) — นึกถึงต่อคิวร้านสะดวกซื้อ แล้วใช้ collections.deque เป็นอาวุธ (ห้าม list.pop(0)!)",
      en: "First-In, First-Out (FIFO) queue — think of a convenience store checkout line, powered by collections.deque (never list.pop(0)!).",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: 'ถ้า Stack คือกระป๋องมันฝรั่ง Pringles ที่ "เข้าทีหลัง ออกก่อน" (LIFO) ... Queue (คิว) ก็คือขั้วตรงข้ามอย่างสมบูรณ์แบบครับ!',
        },

        { t: "h2", c: "ส่วนที่ 1 · ปลดล็อกไอเดีย" },
        {
          t: "p",
          c: 'ภาพจำ: นึกถึง "การต่อแถวซื้อของที่ร้านสะดวกซื้อ" — คนที่เดินมาต่อแถวก่อน จะได้จ่ายเงินก่อนแล้วเดินออกจากร้านไป ส่วนคนที่เพิ่งเดินเข้ามาใหม่ ก็ต้องไปต่อท้ายแถวเท่านั้น จะมาแทรกคิวหรือแซงหน้าคนอื่นไม่ได้เด็ดขาด! นี่แหละครับคือคอนเซปต์ของ Queue',
        },
        {
          t: "image",
          src: "/leetcode-75/queue.gif",
          alt: "Queue FIFO: enqueue at rear, dequeue from front",
          caption: "Queue · FIFO — enqueue ต่อท้าย · dequeue เรียกหัวแถว (เข้าก่อน ออกก่อน)",
        },
        {
          t: "callout",
          title: "จุดต่างสำคัญระหว่าง Stack กับ Queue",
          c: "Stack เข้าและออกทางเดียว (ปากกระป๋อง) แต่ Queue จะมีสองปลาย คือ หัวแถว (Front) เอาไว้ออก และ หางแถว (Rear) เอาไว้เข้า",
        },
        {
          t: "code",
          lang: "text",
          label: "ใส่ 10 → 20 → 30 แถวจะหน้าตาแบบนี้",
          c: `ออกร้าน <-  [ 10 | 20 | 30 ]  <- ต่อคิวเข้า
         (หัวแถว)      (หางแถว)

dequeue() จะได้ 10 (คนที่มาก่อนใครเพื่อน) · แถวจะหดเหลือ [20, 30]`,
        },

        { t: "h2", c: "ส่วนที่ 2 · กฎเหล็ก — FIFO" },
        {
          t: "p",
          c: 'Queue มีกฎศักดิ์สิทธิ์ข้อเดียวคือ FIFO = First In, First Out = "เข้าก่อน ออกก่อน" อาวุธประจำกายของมันมี 3 ท่าหลัก:',
        },
        {
          t: "ol",
          c: [
            'Enqueue (ต่อคิว) — เอาของชิ้นใหม่ไปต่อไว้ที่ "ท้ายแถว" (Rear)',
            'Dequeue (เรียกคิว) — เรียกของที่อยู่ "หน้าสุด" (Front) ออกจากแถว (ชิ้นนั้นจะหายไปจากคิวเลย)',
            "Peek (แอบดู) — ขอแอบดูหน่อยว่าใครอยู่หน้าสุดของแถว แต่ยังไม่เรียกตัวออกมา",
          ],
        },

        { t: "h2", c: "ส่วนที่ 3 · ห้ามใช้ list เด็ดขาด!" },
        {
          t: "p",
          c: "หลายคนเห็นว่า Python list มีคำสั่ง .append() และดึงตัวหน้าสุดออกด้วย .pop(0) ได้ ก็เลยเอามาทำ Queue... นี่คือกับดักที่ทำให้โค้ดช้าจนสอบไม่ผ่านครับ!",
        },
        {
          t: "p",
          c: "เพราะเวลาเราดึงคนหน้าสุดออก (pop(0)) Python จะต้องสั่งให้คนที่เหลือ \"ทุกคน\" เดินขยับมาข้างหน้า 1 ก้าว ซึ่งกินเวลา O(N) ถ้าคิวยาวเป็นหมื่นคน โค้ดจะอืดสนิท",
        },
        {
          t: "callout",
          title: "ตัวช่วยตัวจริงคือ collections.deque",
          warn: true,
          c: 'deque (อ่านว่า "เด็ค" ย่อจาก double-ended queue) เป็นโครงสร้างพิเศษที่ออกแบบมาให้เข้า-ออกได้ทั้งหัวและหางในระดับความเร็วแสง O(1)!',
        },
        {
          t: "table",
          head: ["แอคชันของ Queue", "คำสั่ง Python (ใช้ deque)", "Big-O"],
          rows: [
            ["Enqueue (ต่อคิวเข้าหาง)", "q.append(x)", "O(1)"],
            ["Dequeue (เรียกคิวออกหัว)", "q.popleft()", "O(1)"],
            ["Peek (แอบดูหัวคิว)", "q[0]", "O(1)"],
            ["Is Empty (ว่างไหม)", "not q", "O(1)"],
          ],
        },

        { t: "h2", c: "ส่วนที่ 4 · จำลองการทำงาน" },
        {
          t: "p",
          c: "ลองต่อคิวทีละคน แล้วดูว่า Peek กับ Dequeue ต่างกันยังไง — ทิศคงที่: ซ้าย = หัว (ออก) · ขวา = หาง (เข้า)",
        },
        {
          t: "table",
          head: ["ขั้น", "ทำอะไร", "q ตอนนี้ (หัว … หาง)"],
          rows: [
            ["เปิดร้าน", "—", "[]"],
            ["append(10)", "เข้าหาง", "10"],
            ["append(20)", "เข้าหาง", "10 → 20"],
            ["append(30)", "เข้าหาง", "10 → 20 → 30"],
            ["peek (q[0])", "แอบดูหัว — ไม่เอาออก", "10 → 20 → 30  (หัวยังเป็น 10)"],
            ["popleft()", "ออกหัว ได้ 10", "20 → 30"],
            ["popleft() × 2", "เรียกคิวที่เหลือจนหมด", "[]"],
          ],
        },
        {
          t: "codeout",
          lang: "python",
          label: "Template — enqueue / peek / dequeue",
          code: `from collections import deque

q = deque()          # 1. เปิดร้าน! แถวยังว่างเปล่า

q.append(10)         # 2. Enqueue 10  ->  10
q.append(20)         # 3. Enqueue 20  ->  10 → 20
q.append(30)         # 4. Enqueue 30  ->  10 → 20 → 30

print(q[0])          # 5. Peek (แอบดูหัว) -> เห็น 10 (คิวยังเป็น 10 → 20 → 30)

first = q.popleft()  # 6. Dequeue -> ได้ 10, คิวเหลือ 20 → 30
print(first)         # พิมพ์ 10

# 7. เรียกคิวที่เหลือจนกว่าจะหมดแถว
while q:
    print(q.popleft())  # จะได้ 20 ก่อน แล้วตามด้วย 30`,
          out: `10
10
20
30`,
        },

        { t: "h2", c: "ส่วนที่ 5 · สัญญาณว่าโจทย์ข้อนี้ต้องใช้ Queue" },
        {
          t: "p",
          c: "ถ้าเจอโจทย์แนว ๆ นี้ ให้นึกถึง deque เตรียมไว้เลยครับ:",
        },
        {
          t: "ul",
          c: [
            '"ต้องประมวลผลตามลำดับก่อน-หลัง (In Order)" — อะไรเกิดก่อนต้องโดนจัดการก่อน',
            '"เก็บเหตุการณ์ล่าสุดในช่วงเวลาหนึ่ง (Sliding Window)" — เช่น ขอเช็คข้อมูลย้อนหลังแค่ 3,000 มิลลิวินาทีล่าสุด (ข้อ LC933)',
            '"การสำรวจเป็นตึกทีละชั้น (BFS — Breadth-First Search)" — เอาไว้ใช้ไล่หาของใน Tree หรือ Graph แบบกระจายตัวออกไปรอบ ๆ ทีละระดับชั้น',
          ],
        },
        {
          t: "callout",
          title: "ประโยคท่องจำ",
          c: "มาทีหลังไปต่อท้าย ถึงคิวเมื่อไหร่ค่อยออกไป = ใช้ Queue (และต้องเป็น deque ด้วยนะ)!",
        },
      ],
      en: [
        {
          t: "p",
          c: 'If a Stack is a can of Pringles chips where the "last item in is the first out" (LIFO), a Queue is its exact opposite!',
        },

        { t: "h2", c: "Part 1 · Mental Model" },
        {
          t: "p",
          c: 'Think of standing in line at a convenience store checkout. The customer who arrived first pays first and leaves the store. New arrivals must join at the back of the line. Nobody is allowed to cut in line. That is a Queue.',
        },
        {
          t: "image",
          src: "/leetcode-75/queue.gif",
          alt: "Queue FIFO: enqueue at rear, dequeue from front",
          caption: "Queue · FIFO — enqueue at the rear · dequeue from the front (first in, first out)",
        },
        {
          t: "callout",
          title: "Key Difference: Stack vs. Queue",
          c: "A Stack has a single open end (the top). A Queue has two separate ends: Front (for exiting) and Rear (for entering).",
        },
        {
          t: "code",
          lang: "text",
          label: "Enqueuing 10 → 20 → 30 creates this line",
          c: `Exit <-  [ 10 | 20 | 30 ]  <- Enter
        (Front)         (Rear)

dequeue() returns 10 (the earliest arrival) · line shrinks to [20, 30]`,
        },

        { t: "h2", c: "Part 2 · The Golden Rule — FIFO" },
        {
          t: "p",
          c: "A Queue obeys one sacred rule: FIFO (First In, First Out). It provides 3 primary operations:",
        },
        {
          t: "ol",
          c: [
            'Enqueue — add a new item to the "Rear" of the line.',
            'Dequeue — remove and return the item at the "Front" of the line.',
            "Peek — inspect the item at the front without removing it.",
          ],
        },

        { t: "h2", c: "Part 3 · Never Use Python's list as a Queue!" },
        {
          t: "p",
          c: "Beginners often write `list.pop(0)` to dequeue from a Python list. This is a critical trap that leads to Time Limit Exceeded (TLE) errors!",
        },
        {
          t: "p",
          c: "Removing the first element (`pop(0)`) forces Python to shift all remaining N-1 items forward by one slot — an O(N) operation. For 10,000 items, repeated `pop(0)` is painfully slow.",
        },
        {
          t: "callout",
          title: "Use collections.deque Instead",
          warn: true,
          c: "Python's `collections.deque` (double-ended queue) is implemented as a doubly linked list of blocks, providing true O(1) appends and pops on both ends.",
        },
        {
          t: "table",
          head: ["Queue Operation", "Python Code (deque)", "Big-O"],
          rows: [
            ["Enqueue (to rear)", "q.append(x)", "O(1)"],
            ["Dequeue (from front)", "q.popleft()", "O(1)"],
            ["Peek (front item)", "q[0]", "O(1)"],
            ["Is Empty check", "not q", "O(1)"],
          ],
        },

        { t: "h2", c: "Part 4 · Dry Run" },
        {
          t: "p",
          c: "Watch how items enter from the right (rear) and exit from the left (front):",
        },
        {
          t: "table",
          head: ["Step", "Action", "Queue State (Front … Rear)"],
          rows: [
            ["Init", "q = deque()", "[]"],
            ["append(10)", "Enter rear", "10"],
            ["append(20)", "Enter rear", "10 → 20"],
            ["append(30)", "Enter rear", "10 → 20 → 30"],
            ["peek (q[0])", "Inspect front (no removal)", "10 → 20 → 30 (front is 10)"],
            ["popleft()", "Exit front -> 10", "20 → 30"],
            ["popleft() x 2", "Drain queue", "[]"],
          ],
        },

        { t: "h2", c: "Part 5 · When to Use a Queue" },
        {
          t: "ul",
          c: [
            'Processing items in strict chronological arrival order (In-Order processing).',
            'Tracking recent events inside a sliding time window (LC933).',
            'Level-order tree traversal and graph breadth-first search (BFS).',
          ],
        },
      ],
    },
  },

  "lc75-p27": {
    slug: "lc75-p27",
    title: {
      th: "ข้อ 27 · LC933 Number of Recent Calls (นับ ping ล่าสุด) 🟢",
      en: "LC933 Number of Recent Calls 🟢",
    },
    lead: {
      th: "โจทย์ Queue แบบ Sliding Window — นับ ping ในช่วง 3000 ms ล่าสุด ของเก่าทยอยหลุดออกทางหัวแถว",
      en: "Sliding window with a queue — count pings in the last 3000 ms as old ones expire from the front.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "You have a `RecentCounter` class which counts the number of recent requests within a certain time frame.\n\nImplement the `RecentCounter` class:\n\n• `RecentCounter()` Initializes the counter with zero recent requests.\n• `int ping(int t)` Adds a new request at time `t`, where `t` represents some time in milliseconds, and returns the number of requests that have happened in the past `3000` milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range `[t - 3000, t]`.\n\nIt is guaranteed that every call to `ping` uses a strictly larger value of `t` than the previous call.",
        },
        {
          t: "p",
          c: "ให้เขียน class `RecentCounter` ซึ่งทำหน้าที่นับจำนวน request ที่เพิ่งเกิดขึ้นในช่วงเวลาที่กำหนด:\n\n• `RecentCounter()` ตั้งค่าเริ่มต้นตัวนับโดยเริ่มที่ 0 requests\n• `int ping(int t)` บันทึก request ใหม่ที่เวลา `t` มิลลิวินาที แล้วส่งคืนจำนวน request ทั้งหมดที่เกิดขึ้นในช่วง 3000 มิลลิวินาทีล่าสุด (นับรวม request ล่าสุดนี้ด้วย) กล่าวคือ นับจำนวน ping ที่อยู่ในช่วงปิด `[t - 3000, t]`\n\nโจทย์การันตีว่าค่า `t` ในการเรียกแต่ละครั้งจะมีค่ามากกว่าการเรียกครั้งก่อนหน้าเสมอ (strictly increasing)",
        },
        {
          t: "example",
          c: [
            {
              input: '["RecentCounter", "ping", "ping", "ping", "ping"]\n[[], [1], [100], [3001], [3002]]',
              output: "[null, 1, 2, 3, 3]",
              explain:
                "ping(1) → คิว [1] ช่วง [-2999, 1] ได้ 1\nping(100) → คิว [1, 100] ช่วง [-2900, 100] ได้ 2\nping(3001) → คิว [1, 100, 3001] ช่วง [1, 3001] ได้ 3\nping(3002) → เวลา 1 หลุดช่วง [2, 3002] ถูกเตะออก คิวเหลือ [100, 3001, 3002] ได้ 3",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= t <= 10^9",
            "Each test case will call ping with strictly increasing values of t.",
            "At most 10^4 calls will be made to ping.",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "ลองคิดดูว่า: ค่า t วิ่งไปข้างหน้าเรื่อย ๆ ping ที่เก่าที่สุดจะอยู่ที่ไหน? ถ้าใช้ Queue ข้อมูลที่หมดอายุต้องถูกลบออกจากปลายด้านใด?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ให้เราจำลองระบบบันทึก ping ของเซิร์ฟเวอร์ โดยทุกครั้งที่มีสัญญาณ `ping(t)` ส่งเข้ามา เราต้องบอกว่า 'ในช่วง 3000 มิลลิวินาทีที่ผ่านมา (ตั้งแต่ t - 3000 ถึง t) มี ping เกิดขึ้นทั้งหมดกี่ครั้ง'",
            },
            {
              t: "p",
              c: "จุดสังเกตสำคัญ: ค่า `t` เพิ่มขึ้นเรื่อย ๆ เสมอ หมายความว่าสัญญาณ ping จะมาตามลำดับเวลาเป๊ะ ๆ อะไรมาก่อนก็แก่ก่อน อะไรมาทีหลังก็ใหม่กว่า",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ลองจำลองการเรียกตามตัวอย่างโจทย์:",
            },
            {
              t: "ul",
              c: [
                "ping(1): หน้าต่างคือ [1 - 3000, 1] = [-2999, 1] → ในแถวมี [1] → ตอบ 1",
                "ping(100): หน้าต่างคือ [100 - 3000, 100] = [-2900, 100] → ในแถวมี [1, 100] → ตอบ 2",
                "ping(3001): หน้าต่างคือ [3001 - 3000, 3001] = [1, 3001] → 1 ยังอยู่ในช่วง! ในแถวมี [1, 100, 3001] → ตอบ 3",
                "ping(3002): หน้าต่างคือ [3002 - 3000, 3002] = [2, 3002] → สังเกตว่า 1 มีค่าน้อยกว่า 2 (หลุดหน้าต่างแล้ว!) เราต้องเอา 1 ออกจากแถว เหลือ [100, 3001, 3002] → ตอบ 3",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: ใช้ Queue (โดยใช้ `collections.deque`) เก็บประวัติเวลา `t` ของ ping ที่ยังอยู่ในหน้าต่าง",
            },
            {
              t: "p",
              c: "เครื่องมือและตรรกะการทำงาน:",
            },
            {
              t: "ol",
              c: [
                "เมื่อมี ping(t) เข้ามา: เอา `t` ใส่ต่อท้ายคิว (`q.append(t)`)",
                "เคลียร์ของหมดอายุ: ตรวจสอบหัวคิว `q[0]` ถ้า `q[0] < t - 3000` แปลว่า ping นั้นเก่าเกิน 3000 ms แล้ว ให้เอาออกจากหัวคิวทันทีด้วย `q.popleft()` วนซ้ำจนกว่าหัวคิวจะ >= t - 3000",
                "ตอบผลลัพธ์: ขนาดของคิวที่เหลืออยู่ `len(q)` คือจำนวน ping ทั้งหมดที่อยู่ในหน้าต่าง [t - 3000, t]",
              ],
            },
            {
              t: "callout",
              title: "ทำไมต้อง deque และห้าม list.pop(0)?",
              warn: true,
              c: "เพราะ list.pop(0) ใน Python ต้องเลื่อนสมาชิกทั้ง list ไปข้างหน้า เสียเวลา O(N) ต่อรอบ แต่ deque.popleft() เป็น linked structure ทำงานได้ใน O(1) ทันที",
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น / จำลองการทำงาน" },
            {
              t: "table",
              head: ["คำสั่ง", "ช่วงเวลา [t-3000, t]", "แอคชันกับคิว", "คิวหลังทำ (หัว -> หาง)", "return"],
              rows: [
                ["ping(1)", "[-2999, 1]", "append(1)", "[1]", "1"],
                ["ping(100)", "[-2900, 100]", "append(100)", "[1, 100]", "2"],
                ["ping(3001)", "[1, 3001]", "append(3001), 1 >= 1 (เก็บไว้)", "[1, 100, 3001]", "3"],
                ["ping(3002)", "[2, 3002]", "append(3002), popleft() 1 (1 < 2)", "[100, 3001, 3002]", "3"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `from collections import deque

class RecentCounter:
    def __init__(self):
        # สร้าง deque เพื่อเก็บ timestamp ของ ping ที่ยังอยู่ในช่วงเวลา
        self.q = deque()

    def ping(self, t: int) -> int:
        # 1. เอา ping เวลาปัจจุบันเข้าท้ายแถว
        self.q.append(t)

        # 2. นำ ping ที่เก่าเกินช่วง [t - 3000, t] ออกจากหัวแถว
        # เนื่องจาก t เพิ่มขึ้นเรื่อยๆ ping ที่เก่าสุดจะอยู่ที่หัวแถวเสมอ
        while self.q and self.q[0] < t - 3000:
            self.q.popleft()

        # 3. จำนวน ping ที่เหลือในคิวคือคำตอบ
        return len(self.q)`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["self.q = deque()", "เตรียมคิวสองปลายเพื่อเก็บเวลา ping", "q = deque()"],
                ["self.q.append(t)", "เพิ่ม ping ใหม่เข้าหางคิว", "t=3002 -> q มี 3002 ต่อท้าย"],
                ["while self.q and self.q[0] < t - 3000:", "ตรวจว่าคนหัวคิวหมดอายุหรือยัง", "q[0]=1, t-3000=2 -> 1 < 2 (จริง)"],
                ["self.q.popleft()", "เตะคนที่หมดอายุออกจากหัวคิวใน O(1)", "เตะ 1 ออก เหลือ [100, 3001, 3002]"],
                ["return len(self.q)", "นับจำนวนคนที่ยังรอดในหน้าต่างเวลา", "len(q) = 3"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(1) amortized ต่อการเรียก ping", "แม้จะมี loop while แต่แต่ละ ping จะถูก append 1 ครั้ง และ popleft 1 ครั้งเท่านั้นตลอดชีวิตของมัน เฉลี่ยแล้วใช้ O(1) ต่อ ping"],
                ["Space (หน่วยความจำ)", "O(W) โดย W <= 3000", "คิวจะเก็บ ping ไม่เกินจำนวน ping ที่เกิดขึ้นภายในช่วง 3000 มิลลิวินาที"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "You have a `RecentCounter` class which counts the number of recent requests within a certain time frame.\n\nImplement the `RecentCounter` class:\n\n• `RecentCounter()` Initializes the counter with zero recent requests.\n• `int ping(int t)` Adds a new request at time `t`, where `t` represents some time in milliseconds, and returns the number of requests that have happened in the past `3000` milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range `[t - 3000, t]`.\n\nIt is guaranteed that every call to `ping` uses a strictly larger value of `t` than the previous call.",
        },
        {
          t: "example",
          c: [
            {
              input: '["RecentCounter", "ping", "ping", "ping", "ping"]\n[[], [1], [100], [3001], [3002]]',
              output: "[null, 1, 2, 3, 3]",
              explain:
                "ping(1) -> [1] in range [-2999, 1] -> return 1\nping(100) -> [1, 100] in range [-2900, 100] -> return 2\nping(3001) -> [1, 100, 3001] in range [1, 3001] -> return 3\nping(3002) -> 1 is older than 3002-3000=2, evicted! -> [100, 3001, 3002] -> return 3",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= t <= 10^9",
            "Each test case will call ping with strictly increasing values of t.",
            "At most 10^4 calls will be made to ping.",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "We need to maintain a sliding time window of 3000 ms. For each call to `ping(t)`, we add `t` and count how many pings occurred in the inclusive range `[t - 3000, t]`. Because `t` is strictly increasing, arrivals are chronologically ordered.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "At t=3002, the valid window is [2, 3002]. A ping that occurred at t=1 is strictly less than 2, so it has expired and must be evicted.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "A FIFO Queue (`collections.deque`) perfectly fits: new pings arrive at the back (`append(t)`), and expired pings fall off the front (`popleft()`).",
            },

            { t: "h3", c: "Step 4 · Step-by-Step Simulation" },
            {
              t: "table",
              head: ["Call", "Window [t-3000, t]", "Queue Action", "Queue State (Front -> Rear)", "Return"],
              rows: [
                ["ping(1)", "[-2999, 1]", "append(1)", "[1]", "1"],
                ["ping(100)", "[-2900, 100]", "append(100)", "[1, 100]", "2"],
                ["ping(3001)", "[1, 3001]", "append(3001), 1 >= 1 (keep)", "[1, 100, 3001]", "3"],
                ["ping(3002)", "[2, 3002]", "append(3002), popleft() 1 (1 < 2)", "[100, 3001, 3002]", "3"],
              ],
            },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `from collections import deque

class RecentCounter:
    def __init__(self):
        self.q = deque()

    def ping(self, t: int) -> int:
        self.q.append(t)
        while self.q and self.q[0] < t - 3000:
            self.q.popleft()
        return len(self.q)`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["self.q = deque()", "Initialize queue for timestamps", "q = deque()"],
                ["self.q.append(t)", "Enqueue latest arrival at rear", "append(3002)"],
                ["while self.q and self.q[0] < t - 3000:", "Check if oldest ping has expired", "1 < 2 is True"],
                ["self.q.popleft()", "Evict expired ping from front in O(1)", "remove 1"],
                ["return len(self.q)", "Number of active pings in window", "return 3"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(1) amortized per call", "Each ping is enqueued once and dequeued at most once."],
                ["Space", "O(W) where W <= 3000", "Queue holds at most the number of pings within a 3000 ms window."],
              ],
            },
          ],
        },
      ],
    },
  },

  "lc75-p28": {
    slug: "lc75-p28",
    title: {
      th: "ข้อ 28 · LC649 Dota2 Senate (วุฒิสภา Dota2) 🟡",
      en: "LC649 Dota2 Senate 🟡",
    },
    lead: {
      th: "สองฝ่ายผลัดกันแบนคู่แข่ง ใครมาถึงคิวก่อนได้แบนก่อน — ใช้ Queue สองอันเก็บ index แล้วให้ผู้รอดวนกลับไปต่อท้าย",
      en: "Two parties ban each other round by round — use two queues to track indices and let survivors re-enqueue for the next round.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `In the world of Dota2, there are two parties: Radiant and Dire.

The Dota2 senate consists of senators from two parties. Now the Senate wants to decide on a change in the Dota2 game. The voting for this change is a round-based procedure. In each round, each senator can exercise one of two rights:

• Ban one senator's right: A senator can make another senator lose all rights in this and all following rounds.
• Announce the victory: If this senator found the senators who still have rights to vote are all from the same party, he can announce the victory and decide on the change in the game.

Given a string \`senate\` representing each senator's party belonging. The character \`'R'\` and \`'D'\` represent Radiant and Dire respectively. Then if there are \`n\` senators, the size of the given string will be \`n\`.

The round-based procedure starts from the first senator to the last senator in the given order. This procedure will last until the end of voting. All the senators who have lost their rights will be skipped during the procedure.

Suppose every senator is smart enough and will play the best strategy for his own party. Predict which party will finally announce the victory and change the Dota2 game. The output should be \`"Radiant"\` or \`"Dire"\`.`,
        },
        {
          t: "p",
          c: `ในโลกของเกม Dota2 มีสองฝ่ายคือ Radiant (R) และ Dire (D)

วุฒิสภาต้องการลงมติเพื่อเปลี่ยนแปลงตัวเกม โดยการโหวตจะดำเนินเป็น "รอบ ๆ" (round-based) เริ่มตั้งแต่สมาชิกคนแรกไปจนถึงคนสุดท้ายตามลำดับในข้อความ \`senate\`
ในแต่ละตา วุฒิสมาชิกที่ยังมีสิทธิ์สามารถทำได้ 1 อย่าง:
1. แบนสิทธิ์ของสมาชิกฝ่ายตรงข้าม 1 คน: ทำให้คนนั้นเสียสิทธิ์โหวตตลอดไป (ทั้งรอบนี้และรอบถัดไป)
2. ประกาศชัยชนะ: ถ้าสมาชิกที่เหลืออยู่ทั้งหมดมาจากฝ่ายเดียวกับตน สามารถประกาศชัยชนะได้ทันที

ทุกคนจะเล่นด้วยกลยุทธ์ที่ดีที่สุดเพื่อฝ่ายตนเองเสมอ จงทำนายว่าฝ่ายใดจะได้ประกาศชัยชนะ (\`"Radiant"\` หรือ \`"Dire"\`)`,
        },
        {
          t: "example",
          c: [
            {
              input: 'senate = "RD"',
              output: '"Radiant"',
              explain:
                "รอบที่ 1: R (คนที่ 0) ได้เล่นก่อน จึงแบนสิทธิ์ของ D (คนที่ 1)\nรอบที่ 2: D โดนแบนแล้ว จึงเหลือแค่ R คนเดียว R จึงประกาศชัยชนะ 'Radiant'",
            },
            {
              input: 'senate = "RDD"',
              output: '"Dire"',
              explain:
                "รอบที่ 1:\n• R (index 0) ได้เล่นก่อน จึงแบน D คนถัดไป (index 1)\n• D (index 1) โดนแบน ข้ามตา\n• D (index 2) ได้เล่น จึงแบน R (index 0)\nรอบที่ 2: เหลือ D (index 2) คนเดียว จึงชนะ ตอบ 'Dire'",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "n == senate.length",
            "1 <= n <= 10^4",
            "senate[i] is either 'R' or 'D'.",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "กลยุทธ์ที่ดีที่สุดคืออะไร? ควรกำจัดคู่ต่อสู้คนไหน — คนที่อยู่ใกล้ที่สุดที่กำลังจะได้เล่น หรือคนที่อยู่ไกลที่สุด?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์เป็นการแข่งขันกำจัดสิทธิ์กันแบบผลัดตาเป็นรอบ ๆ โดยมีกฎสำคัญคือ:",
            },
            {
              t: "ul",
              c: [
                "ใครมี index น้อยกว่าจะได้เล่นก่อนตามลำดับซ้ายไปขวา",
                "กลยุทธ์ที่ฉลาดที่สุด: ควรแบนฝ่ายตรงข้าม 'คนที่กำลังจะได้เล่นเป็นคนถัดไป' เพื่อไม่ให้คนนั้นมีโอกาสได้แบนพวกเรากลับ!",
                "คนที่ใช้สิทธิ์แบนคนอื่นแล้ว จะได้วนกลับมาเล่นใหม่ในรอบถัดไป",
              ],
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ลองวิเคราะห์ senate = 'RDD' (ความยาว n = 3):",
            },
            {
              t: "ul",
              c: [
                "จัดคิวตาม index เริ่มต้น: Radiant = [0], Dire = [1, 2]",
                "ตาที่ 1: เปรียบเทียบหัวแถว index 0 (R) กับ index 1 (D) → 0 < 1 แสดงว่า R ได้เล่นก่อน! R จึงแบน D1 ทิ้ง",
                "R0 ทำหน้าที่สำเร็จ จะได้ไปเล่นต่อในรอบหน้า โดยไปต่อท้ายคิวใหม่ที่ตำแหน่ง 0 + 3 = 3",
                "ตอนนี้คิวเป็น: Radiant = [3], Dire = [2]",
                "ตาที่ 2: เปรียบเทียบหัวแถว index 3 (R) กับ index 2 (D) → 2 < 3 แสดงว่า D2 ได้เล่นก่อน! D2 จึงแบน R3 ทิ้ง",
                "D2 ทำหน้าที่สำเร็จ ไปต่อท้ายรอบถัดไปที่ 2 + 3 = 5",
                "ตอนนี้คิวเป็น: Radiant = [] (หมดเกลี้ยง), Dire = [5] → ฝ่าย Dire ชนะ!",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: ใช้ Queue สองอัน (`radiant` และ `dire`) โดยเก็บ index ตำแหน่งของสมาชิกแต่ละฝ่าย",
            },
            {
              t: "p",
              c: "กลไกและเครื่องมือ:",
            },
            {
              t: "ol",
              c: [
                "แยก index: วนลูป senate แล้วเก็บ index i ลงใน queue `radiant` หรือ `dire`",
                "วนลูปประลองตราบใดที่ทั้งสองคิวยังไม่ว่าง (`while radiant and dire:`):",
                "ดึงหัวแถวของทั้งสองฝ่ายออกมา: `r = radiant.popleft()` และ `d = dire.popleft()`",
                "เทียบว่าใครมาถึงก่อน: ถ้า `r < d` แปลว่า R ได้เล่นก่อน จึงแบน d ทิ้ง และส่ง r ไปต่อท้ายรอบถัดไปด้วย `radiant.append(r + n)`",
                "ในทางกลับกัน ถ้า `d < r` แปลว่า D ได้เล่นก่อน จึงแบน r ทิ้ง และส่ง d ไปต่อท้ายรอบถัดไปด้วย `dire.append(d + n)`",
                "เมื่อฝ่ายใดฝ่ายหนึ่งว่าง: ฝ่ายที่ยังมีคนเหลืออยู่ในคิวคือผู้ชนะ",
              ],
            },
            {
              t: "callout",
              title: "ทำไมต้องบวก n (r + n / d + n)?",
              c: "การบวก n (ขนาดของ senate) คือการส่งคนนี้ไปต่อท้ายสุดของ 'รอบถัดไป' ทำให้ index ของเขามากกว่าทุกคนที่ยังรอเล่นในรอบปัจจุบันอย่างแน่นอน ทำให้ลำดับคิวในรอบต่อไปเรียงตัวอย่างถูกต้องเสมอ!",
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น / จำลองการทำงาน" },
            {
              t: "table",
              head: ["ตา", "ดึงมาเทียบ", "ใครเล่นก่อน & ผลลัพธ์", "คิว Radiant (หัว->หาง)", "คิว Dire (หัว->หาง)"],
              rows: [
                ["เริ่ม", "—", "แยกฝ่าย", "[0]", "[1, 2]"],
                ["1", "r=0, d=1", "0 < 1 -> R แบน D1, R0 วนต่อท้ายเป็น 0+3=3", "[3]", "[2]"],
                ["2", "r=3, d=2", "2 < 3 -> D แบน R3, D2 วนต่อท้ายเป็น 2+3=5", "[]", "[5]"],
                ["จบ", "radiant ว่าง", "Dire ชนะ!", "[]", "[5]"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `from collections import deque

class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        n = len(senate)
        radiant = deque()
        dire = deque()

        # 1. แยกตำแหน่ง index ของสมาชิกแต่ละฝ่ายลงใน Queue
        for i, c in enumerate(senate):
            if c == 'R':
                radiant.append(i)
            else:
                dire.append(i)

        # 2. ผลัดกันแบนตามลำดับคิว
        while radiant and dire:
            r = radiant.popleft()
            d = dire.popleft()

            # ใคร index น้อยกว่า แปลว่ามาถึงตาก่อนในรอบนี้
            if r < d:
                # Radiant ได้แบน Dire และวนกลับไปต่อท้ายในรอบถัดไป
                radiant.append(r + n)
            else:
                # Dire ได้แบน Radiant และวนกลับไปต่อท้ายในรอบถัดไป
                dire.append(d + n)

        # 3. ฝ่ายที่ยังมีคนเหลืออยู่คือผู้ชนะ
        return "Radiant" if radiant else "Dire"`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่า (senate='RDD', n=3)"],
              rows: [
                ["radiant = deque(); dire = deque()", "เตรียม 2 คิวเก็บ index แต่ละฝ่าย", "radiant=[0], dire=[1, 2]"],
                ["r = radiant.popleft(); d = dire.popleft()", "ดึงตัวแทนหัวแถวของทั้งสองฝ่ายมาเผชิญหน้า", "ตาแรก: r=0, d=1"],
                ["if r < d: radiant.append(r + n)", "ถ้า R มาก่อน ให้ R รอดและไปต่อท้ายรอบถัดไป (+n)", "0 < 1 -> radiant.append(3)"],
                ["else: dire.append(d + n)", "ถ้า D มาก่อน ให้ D รอดและไปต่อท้ายรอบถัดไป (+n)", "ตาที่สอง: 2 < 3 -> dire.append(5)"],
                ["return 'Radiant' if radiant else 'Dire'", "ตัดสินผู้ชนะเมื่อมีฝ่ายใดฝ่ายหนึ่งหมดคิว", "radiant ว่าง -> return 'Dire'"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(N)", "ในการเปรียบเทียบแต่ละรอบ จะมีสมาชิกโดนแบนทิ้งถาวร 1 คนเสมอ ดังนั้นการประลองจะเกิดขึ้นไม่เกิน N ครั้ง"],
                ["Space (หน่วยความจำ)", "O(N)", "Queue ทั้งสองอันเก็บ index ของวุฒิสมาชิกทั้งหมดรวมกันไม่เกิน N ตัว"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `In the world of Dota2, there are two parties: Radiant and Dire.

The Dota2 senate consists of senators from two parties. Now the Senate wants to decide on a change in the Dota2 game. The voting for this change is a round-based procedure. In each round, each senator can exercise one of two rights:

• Ban one senator's right: A senator can make another senator lose all rights in this and all following rounds.
• Announce the victory: If this senator found the senators who still have rights to vote are all from the same party, he can announce the victory and decide on the change in the game.

Given a string \`senate\` representing each senator's party belonging. The character \`'R'\` and \`'D'\` represent Radiant and Dire respectively. Then if there are \`n\` senators, the size of the given string will be \`n\`.

The round-based procedure starts from the first senator to the last senator in the given order. This procedure will last until the end of voting. All the senators who have lost their rights will be skipped during the procedure.

Suppose every senator is smart enough and will play the best strategy for his own party. Predict which party will finally announce the victory and change the Dota2 game. The output should be \`"Radiant"\` or \`"Dire"\`.`,
        },
        {
          t: "example",
          c: [
            {
              input: 'senate = "RD"',
              output: '"Radiant"',
              explain:
                "Round 1: Senator R (index 0) bans Senator D (index 1).\nRound 2: Only Senator R remains, declaring victory for Radiant.",
            },
            {
              input: 'senate = "RDD"',
              output: '"Dire"',
              explain:
                "Round 1: R0 bans D1. Then D2 bans R0.\nRound 2: Only D2 remains, declaring victory for Dire.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "n == senate.length",
            "1 <= n <= 10^4",
            "senate[i] is either 'R' or 'D'.",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Senators vote in round order from left to right. The optimal strategy is greedy: ban the very next opponent senator who hasn't taken their turn yet, neutralizing their threat immediately.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "Using senate = 'RDD' (n = 3):\n• Radiant queue = [0], Dire queue = [1, 2]\n• Turn 1: 0 < 1 -> R0 bans D1, R0 re-enqueues at 0 + 3 = 3\n• Turn 2: 2 < 3 -> D2 bans R3, D2 re-enqueues at 2 + 3 = 5\n• Radiant is empty -> Dire wins!",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Maintain two FIFO queues storing senator indices. In each round, pop the front of both queues. The smaller index bans the larger index, and the winner re-enqueues with `index + n` for the next round.",
            },

            { t: "h3", c: "Step 4 · Simulation Table" },
            {
              t: "table",
              head: ["Turn", "Compare", "Outcome", "Radiant Queue", "Dire Queue"],
              rows: [
                ["Init", "—", "Enqueue indices", "[0]", "[1, 2]"],
                ["1", "r=0, d=1", "0 < 1 -> R bans D1, R re-enqueues as 3", "[3]", "[2]"],
                ["2", "r=3, d=2", "2 < 3 -> D bans R3, D re-enqueues as 5", "[]", "[5]"],
                ["End", "radiant empty", "Dire wins!", "[]", "[5]"],
              ],
            },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `from collections import deque

class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        n = len(senate)
        radiant = deque()
        dire = deque()

        # 1. Enqueue senator indices
        for i, c in enumerate(senate):
            if c == 'R':
                radiant.append(i)
            else:
                dire.append(i)

        # 2. Simulate round-based voting
        while radiant and dire:
            r = radiant.popleft()
            d = dire.popleft()

            if r < d:
                radiant.append(r + n)
            else:
                dire.append(d + n)

        # 3. Non-empty queue is the winner
        return "Radiant" if radiant else "Dire"`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["radiant = deque(); dire = deque()", "Queues to store senator positions", "radiant=[0], dire=[1,2]"],
                ["r = radiant.popleft(); d = dire.popleft()", "Pop earliest active senators from each party", "r=0, d=1"],
                ["if r < d: radiant.append(r + n)", "Earliest senator acts first, survivor joins next round", "0 < 1 -> radiant gets 0+3=3"],
                ["else: dire.append(d + n)", "Otherwise Dire acts first and re-enqueues", "2 < 3 -> dire gets 2+3=5"],
                ["return 'Radiant' if radiant else 'Dire'", "The party with survivors wins", "return 'Dire'"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(N)", "Each comparison permanently eliminates one senator; at most N face-offs occur."],
                ["Space", "O(N)", "Two queues store at most N indices combined."],
              ],
            },
          ],
        },
      ],
    },
  },
};
