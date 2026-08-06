import type { Page } from "@/lib/types";

export const queuePages: Record<string, Page> = {
  "lc75-intro-queue": {
    slug: "lc75-intro-queue",
    title: { th: "Queue — พื้นฐาน & แนวคิด", en: "" },
    lead: {
      th: "แถวที่ \"ใครมาก่อนได้ก่อน\" (FIFO) — นึกถึงต่อคิวร้านสะดวกซื้อ แล้วใช้ collections.deque เป็นอาวุธ (ห้าม list.pop(0)!)",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: 'ถ้า Stack คือกระป๋องมันฝรั่ง Pringles ที่ "เข้าทีหลัง ออกก่อน" ... Queue (คิว) ก็คือขั้วตรงข้ามอย่างสมบูรณ์แบบครับ!',
        },

        { t: "h2", c: "ส่วนที่ 1 · ปลดล็อกไอเดีย" },
        {
          t: "p",
          c: 'ภาพจำ: นึกถึง "การต่อแถวซื้อของที่ร้านสะดวกซื้อ" — คนที่เดินมาต่อแถวก่อน จะได้จ่ายเงินก่อนแล้วเดินออกจากร้านไป ส่วนคนที่เพิ่งเดินเข้ามาใหม่ ก็ต้องไปต่อท้ายแถวเท่านั้น จะมาแทรกคิวหรือแซงหน้าคนอื่นไม่ได้เด็ดขาด! นี่แหละครับคือคอนเซปต์ของ Queue',
        },
        {
          t: "callout",
          title: "จุดต่างสำคัญ",
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
            'Enqueue (ต่อคิว) — เอาของชิ้นใหม่ไปต่อไว้ที่ "ท้ายแถว"',
            'Dequeue (เรียกคิว) — เรียกของที่อยู่ "หน้าสุด" ออกจากแถว (ชิ้นนั้นจะหายไปจากคิวเลย)',
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
          c: "นี่คือ Template มาตรฐานของการใช้ deque ที่เราจะหยิบมาใช้ซ้ำ ๆ ในหมวดนี้ครับ:",
        },
        {
          t: "codeout",
          lang: "python",
          label: "Walkthrough — enqueue / peek / dequeue",
          code: `from collections import deque

q = deque()          # 1. เปิดร้าน! แถวยังว่างเปล่า

q.append(10)         # 2. Enqueue 10  -> แถวคือ [10]
q.append(20)         # 3. Enqueue 20  -> แถวคือ [10, 20]
q.append(30)         # 4. Enqueue 30  -> แถวคือ [10, 20, 30]

print(q[0])          # 5. Peek (แอบดูหน้าสุด) -> เห็น 10 (แถวยังเป็น [10, 20, 30])

first = q.popleft()  # 6. Dequeue (เรียกคิว) -> ได้ 10 เดินออกไป, แถวเหลือ [20, 30]
print(first)         # พิมพ์ 10

# 7. เรียกคิวที่เหลือจนกว่าจะหมดแถว
while q:
    print(q.popleft())  # จะได้ 20 ก่อน แล้วตามด้วย 30 (ออกตามลำดับที่มาเป๊ะ ๆ)`,
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
            '"เก็บเหตุการณ์ล่าสุดในช่วงเวลาหนึ่ง (Sliding Window)" — เช่น ขอเช็คข้อมูลย้อนหลังแค่ 3,000 มิลลิวินาทีล่าสุด (เดี๋ยวเราจะได้เจอในโจทย์ข้อถัดไป!)',
            '"การสำรวจเป็นตึกทีละชั้น (BFS — Breadth-First Search)" — อันนี้คือท่าไม้ตาย! เอาไว้ใช้ไล่หาของใน Tree หรือ Graph แบบกระจายตัวออกไปรอบ ๆ ซึ่งเป็นหัวข้อใหญ่ในอนาคตแน่นอน',
          ],
        },
        {
          t: "callout",
          title: "ประโยคท่องจำ",
          c: "มาทีหลังไปต่อท้าย ถึงคิวเมื่อไหร่ค่อยออกไป = ใช้ Queue (และต้องเป็น deque ด้วยนะ)!",
        },

        {
          t: "p",
          c: "พื้นฐานครบแล้ว — หมวดนี้มี 2 ข้อ พร้อมแล้วกดถัดไปลุยโจทย์ข้อแรกเพื่อดูพลังของ deque กันเลยครับ",
        },
      ],
      en: [],
    },
  },

  "lc75-p27": {
    slug: "lc75-p27",
    title: { th: "ข้อ 27 · LC933 Number of Recent Calls (นับ ping ล่าสุด) 🟢", en: "LC933 Number of Recent Calls 🟢" },
    lead: {
      th: 'โจทย์ Queue แบบ Sliding Window — นับ ping ในช่วง 3000 ms ล่าสุด ของเก่าทยอยหลุดออกทางหัวแถว',
      en: "Sliding window with a queue — count pings in the last 3000 ms as old ones expire from the front.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "โจทย์ (LC933): ให้ implement class RecentCounter:\n\n- `RecentCounter()` — Initialize ตัวแปรภายในเพื่อกาหนด counter ใหม่อันหนึ่ง\n- `int ping(int t)` — เพิ่ม request ใหม่ที่เวลา t (หน่วย millisecond) แล้ว return จำนวน request ที่เกิดขึ้นในช่วง 3000 millisecond ที่ผานมา (รวม request ปจจุบันดวย) ได้อีกนัยหนึ่ง return จำนวน request ที่มีเวลาอยุ่ในชวง inclusive [t - 3000, t]\n\nรับประกันว่าแตละ test case เรียก ping ดวยคา t ที่เพิ่เพิยงขึ้นเสมอ (strictly increasing)",
        },
        {
          t: "example",
          c: [
            {
              input: '["RecentCounter", "ping", "ping", "ping", "ping"]\n[[], [1], [100], [3001], [3002]]',
              output: '[null, 1, 2, 3, 3]',
              explain: `Explanation\nRecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3`,
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
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: 'ข้อนี้ตรงกับประโยคท่องจำของหมวด Queue เป๊ะ: "เก็บเหตุการณ์ล่าสุดในช่วงเวลาหนึ่ง (Sliding Window)"',
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "โจทย์ให้เรานับว่าในช่วง 3000 มิลลิวินาทีล่าสุด มี ping กี่ครั้ง — เหมือนหน้าต่างเลื่อนตามเวลา ของเก่าที่หลุดขอบซ้ายต้องถูกเตะทิ้ง",
            },
            {
              t: "p",
              c: "หัวใจสำคัญ: เก็บเวลาของทุก ping ไว้ใน Queue · ping ใหม่ต่อท้ายแถว · ping ที่เก่าเกินไป (น้อยกว่า t − 3000) ทยอย popleft จากหัวแถว · จำนวนที่เหลือในแถวคือคำตอบ",
            },
            {
              t: "p",
              c: "ทำไม Queue ถึงเหมาะ? เพราะ t เพิ่มขึ้นเสมอ → ping ที่เก่าที่สุดอยู่หัวแถวเสมอ ลบของเก่าได้ด้วย popleft ที่เป็น O(1)",
            },

            { t: "h3", c: "2. กฎเหล็ก 3 ข้อ (The Logic)" },
            {
              t: "p",
              c: "เปิดร้านด้วย deque ว่าง แล้วทุกครั้งที่ถูกเรียก ping(t):",
            },
            {
              t: "ol",
              c: [
                "Enqueue — append(t) ต่อ ping ปัจจุบันเข้าท้ายแถว",
                "ไล่ของเก่าออก — ตราบใดที่หัวแถว (q[0]) น้อยกว่า t − 3000 ให้ popleft ทิ้ง",
                "นับผู้รอด — return len(q) คือจำนวน ping ที่ยังอยู่ในช่วง [t − 3000, t]",
              ],
            },

            { t: "h3", c: "3. โค้ด Python (LeetCode Ready)" },
            {
              t: "p",
              c: "โค้ดข้อนี้สั้นและตรงไปตรงมา:",
            },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `from collections import deque

class RecentCounter:
    def __init__(self):
        self.q = deque()          # เก็บเวลาของ ping ที่ยังอยู่ในช่วง

    def ping(self, t: int) -> int:
        self.q.append(t)          # กฎข้อ 1: ต่อ ping ปัจจุบันเข้าท้ายแถว
        # กฎข้อ 2: เอาเวลาที่เก่าเกินไป (หลุดช่วง 3000 ms) ออกจากหัวแถว
        while self.q[0] < t - 3000:
            self.q.popleft()
        return len(self.q)        # กฎข้อ 3: ที่เหลือคือ ping ในช่วง [t-3000, t]`,
            },

            { t: "h3", c: "4. จำลองการทำงาน — ping ตามตัวอย่าง" },
            {
              t: "table",
              head: ["เรียก", "หลัง append", "pop หัวแถว (< t−3000)", "q สุดท้าย", "return"],
              rows: [
                ["ping(1)", "[1]", "1 < −2999? ไม่", "[1]", "1"],
                ["ping(100)", "[1, 100]", "1 < −2900? ไม่", "[1, 100]", "2"],
                ["ping(3001)", "[1, 100, 3001]", "1 < 1? ไม่", "[1, 100, 3001]", "3"],
                ["ping(3002)", "[1, 100, 3001, 3002]", "1 < 2? ใช่ → pop 1", "[100, 3001, 3002]", "3"],
              ],
            },
            {
              t: "p",
              c: "จบตัวอย่าง — คำตอบเรียงกันเป็น 1, 2, 3, 3 ตรงกับ expected output เป๊ะ",
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "p",
              c: 'เคส "ขอบ inclusive" — ต้องใช้ < t − 3000 (ไม่ใช่ <=):',
            },
            {
              t: "ul",
              c: [
                "ping ที่เวลาเท่ากับ t − 3000 พอดียังนับอยู่ในช่วง [t − 3000, t]",
                "ถ้าเขียน <= จะลบตัวที่ยังต้องนับทิ้งไป — คำตอบเพี้ยน",
              ],
            },
            {
              t: "callout",
              title: "ห้ามใช้ list.pop(0)",
              warn: true,
              c: "list.pop(0) เป็น O(n) เพราะต้องขยับของทุกตัวที่เหลือ ส่วน deque.popleft() เป็น O(1) — หมวดนี้ใช้ deque เสมอ",
            },
            {
              t: "p",
              c: "สังเกตว่า while self.q[0] ปลอดภัยเสมอ ไม่ต้องเช็คว่าแถวว่าง เพราะเราเพิ่ง append(t) เข้าไปก่อน แถวจึงมีอย่างน้อยหนึ่งตัว (คือ t เอง) และ t ไม่มีทางน้อยกว่า t − 3000",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(1) ต่อการเรียก ping แบบ amortized — แต่ละเวลาถูก append และ popleft อย่างละครั้งเดียวตลอดอายุการใช้งาน",
                "Space O(w) — w คือจำนวน ping มากสุดที่อยู่ในช่วง 3000 ms พร้อมกัน",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: 'sliding window ด้วย queue: เมื่อโจทย์ถามถึง "ของที่อยู่ในช่วงเวลา/window ล่าสุด" ให้ append ของใหม่ต่อท้ายแล้วทยอย pop ของที่หลุดขอบซ้ายออกทางหัวแถว ขนาดของแถวคือคำตอบของ window นั้น',
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "Implement a class RecentCounter:\n\n- `RecentCounter()` — Initialize a new counter.\n- `int ping(int t)` — Add a new request at time t (in milliseconds), then return the number of requests that happened in the past 3000 milliseconds (including the new one). In other words, return the number of requests that have an arrival time in the inclusive range [t - 3000, t].\n\nIt is guaranteed that every call to ping uses a strictly larger value of t than the previous call.",
        },
        {
          t: "example",
          c: [
            {
              input: '["RecentCounter", "ping", "ping", "ping", "ping"]\n[[], [1], [100], [3001], [3002]]',
              output: '[null, 1, 2, 3, 3]',
              explain: `Explanation\nRecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3`,
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
          summary: "Full solution · Try yourself first",
          c: [
            {
              t: "p",
              c: "This maps directly to the Queue pattern: \"Keep the most recent events in a sliding window.\"",
            },

            { t: "h3", c: "1. Mindset Shift" },
            {
              t: "p",
              c: "We need to count how many pings landed within the last 3000 ms — like a time window that slides forward. Old pings that fall off the left edge are discarded.",
            },
            {
              t: "p",
              c: "Key insight: store every ping time in a Queue. New pings go to the back. Pings older than t − 3000 are removed from the front. The remaining size is the answer.",
            },
            {
              t: "p",
              c: "Why a Queue? Because t always increases, so the oldest ping is always at the front — we can remove it with O(1) popleft.",
            },

            { t: "h3", c: "2. The Logic — 3 Steps" },
            {
              t: "p",
              c: "Start with an empty deque. Each time ping(t) is called:",
            },
            {
              t: "ol",
              c: [
                "Enqueue — append(t) to the back.",
                "Drain old — while the front q[0] < t − 3000, popleft().",
                "Count survivors — return len(q) for pings still in [t − 3000, t].",
              ],
            },

            { t: "h3", c: "3. LeetCode-Ready Code" },
            {
              t: "p",
              c: "Short and straightforward:",
            },
            {
              t: "code",
              lang: "python",
              label: "Submit this on LeetCode",
              c: `from collections import deque

class RecentCounter:
    def __init__(self):
        self.q = deque()

    def ping(self, t: int) -> int:
        self.q.append(t)          # Step 1: enqueue new ping
        while self.q[0] < t - 3000: # Step 2: drain old
            self.q.popleft()
        return len(self.q)        # Step 3: count survivors`,
            },

            { t: "h3", c: "4. Dry Run — Step by Step" },
            {
              t: "table",
              head: ["Call", "After append", "Drain front (< t−3000)", "Queue", "return"],
              rows: [
                ["ping(1)", "[1]", "1 < −2999? No", "[1]", "1"],
                ["ping(100)", "[1, 100]", "1 < −2900? No", "[1, 100]", "2"],
                ["ping(3001)", "[1, 100, 3001]", "1 < 1? No", "[1, 100, 3001]", "3"],
                ["ping(3002)", "[1, 100, 3001, 3002]", "1 < 2? Yes → pop 1", "[100, 3001, 3002]", "3"],
              ],
            },
            {
              t: "p",
              c: "Done — answers come out as 1, 2, 3, 3, matching the expected output exactly.",
            },

            { t: "h3", c: "5. Edge Cases & Pitfalls" },
            {
              t: "p",
              c: 'The "inclusive boundary" — use < t − 3000, NOT <=:',
            },
            {
              t: "ul",
              c: [
                "A ping at exactly t − 3000 is still inside [t − 3000, t].",
                "Using <= would incorrectly remove it.",
              ],
            },
            {
              t: "callout",
              title: "Never use list.pop(0)",
              warn: true,
              c: "list.pop(0) is O(n) because it shifts all remaining elements. deque.popleft() is O(1) — always use deque in this category.",
            },
            {
              t: "p",
              c: "Note: while self.q[0] is always safe — we just appended t, so the queue has at least one element (t itself), and t can never be < t − 3000, so the loop always terminates before the queue empties.",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(1) amortized per ping — each time is appended and popped at most once.",
                "Space O(w) — w is the max number of pings within any 3000 ms window.",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "Sliding window with a queue: when a problem asks for \"the most recent items within a time/window\", append new items to the back and drain old ones from the front. The queue size is the answer.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p28": {
    slug: "lc75-p28",
    title: { th: "ข้อ 28 · LC649 Dota2 Senate (วุฒิสภา Dota2) 🟡", en: "LC649 Dota2 Senate 🟡" },
    lead: {
      th: "สองฝ่ายผลัดกันแบนคู่แข่ง ใครมาถึงคิวก่อนได้แบนก่อน — ใช้ Queue สองอันเก็บ index แล้วให้ผู้รอดวนกลับไปต่อท้าย",
      en: "Two parties ban each other round by round — use two queues to track indices and let survivors re-enqueue for the next round.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `โจทย์ (LC649): ในโลกของ Dota2 มีสองพรรค (party) คือ Radiant กับ Dire

วุฒิสภา (senate) ของ Dota2 ประกอบด้วยวุฒิสมาชิก (senator) จากสองพรรค ตอนนี้ Senate ต้องการตัดสินใจเรื่องการเปลี่ยนแปลงในเกม Dota2 การโหวตเป็นกระบวนการแบบเป็นรอบ (round-based) ในแต่ละรอบ วุฒิสมาชิกแต่ละคนสามารถใช้สิทธิ์อย่างใดอย่างหนึ่งจากสองอย่างนี้ได้:

1. Ban one senator's right — แบนสิทธิ์ของวุฒิสมาชิกอีกคนหนึ่ง: ทำให้เขาเสียสิทธิ์ทั้งหมดในรอบนี้และรอบถัด ๆ ไปทั้งหมด
2. Announce the victory — ประกาศชัยชนะ: ถ้าวุฒิสมาชิกคนนี้พบว่าวุฒิสมาชิกที่ยังมีสิทธิ์โหวตเหลืออยู่ล้วนมาจากพรรคเดียวกับตน เขาก็สามารถประกาศชัยชนะและตัดสินใจเรื่องการเปลี่ยนแปลงในเกมได้

กำหนด string \`senate\` ที่แทนว่าวุฒิสมาชิกแต่ละคนสังกัดพรรคใด ตัวอักษร \`'R'\` และ \`'D'\` แทนพรรค Radiant และพรรค Dire ตามลำดับ ถ้ามีวุฒิสมาชิก n คน ความยาวของ string ที่ให้มาจะเท่ากับ n

กระบวนการแบบเป็นรอบเริ่มจากวุฒิสมาชิกคนแรกไปจนถึงคนสุดท้ายตามลำดับใน string นี้ กระบวนการจะดำเนินต่อไปจนจบการโหวต วุฒิสมาชิกที่เสียสิทธิ์ไปแล้วจะถูกข้ามระหว่างกระบวนการ

สมมติว่าวุฒิสมาชิกทุกคนฉลาดพอ และจะเล่นกลยุทธ์ที่ดีที่สุดให้พรรคของตนเอง จงทำนายว่าพรรคใดจะเป็นฝ่ายประกาศชัยชนะในที่สุดและเปลี่ยนแปลงเกม Dota2 คำตอบต้องเป็น \`"Radiant"\` หรือ \`"Dire"\``,
        },
        {
          t: "example",
          c: [
            {
              input: 'senate = "RD"',
              output: '"Radiant"',
              explain: `Explanation:
วุฒิสมาชิกคนแรกมาจาก Radiant และเขาสามารถ ban สิทธิ์ของวุฒิสมาชิกคนถัดไปได้ใน round 1
และวุฒิสมาชิกคนที่สองใช้สิทธิ์ใด ๆ ไม่ได้อีกต่อไป เพราะสิทธิ์ของเขาถูก ban แล้ว
และใน round 2 วุฒิสมาชิกคนแรกสามารถประกาศชัยชนะได้เลย เพราะเขาเป็นคนเดียวใน senate ที่ยังโหวตได้`,
            },
            {
              input: 'senate = "RDD"',
              output: '"Dire"',
              explain: `Explanation:
วุฒิสมาชิกคนแรกมาจาก Radiant และเขาสามารถ ban สิทธิ์ของวุฒิสมาชิกคนถัดไปได้ใน round 1
และวุฒิสมาชิกคนที่สองใช้สิทธิ์ใด ๆ ไม่ได้อีกต่อไป เพราะสิทธิ์ของเขาถูก ban แล้ว
และวุฒิสมาชิกคนที่สามมาจาก Dire และเขาสามารถ ban สิทธิ์ของวุฒิสมาชิกคนแรกได้ใน round 1
และใน round 2 วุฒิสมาชิกคนที่สามสามารถประกาศชัยชนะได้เลย เพราะเขาเป็นคนเดียวใน senate ที่ยังโหวตได้`,
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "n == senate.length",
            "1 <= n <= 10^4",
            "senate[i] เป็น 'R' หรือ 'D'",
          ],
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: 'ข้อนี้ตรงกับประโยคท่องจำของหมวด Queue: "ต้องประมวลผลตามลำดับก่อน-หลัง (In Order)" — ใครมาก่อนได้แบนก่อน',
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "จำลองวุฒิสภาเป็นคิวสองแถว — ฝ่าย Radiant กับฝ่าย Dire เก็บ index (ตำแหน่งที่นั่ง) ของแต่ละคน",
            },
            {
              t: "p",
              c: 'หัวใจสำคัญ: กลยุทธ์ที่ดีที่สุดคือแบนคู่แข่งที่ "ใกล้จะได้สิทธิ์ที่สุด" ซึ่งก็คือคนหน้าสุดของอีกฝ่าย · ในแต่ละตา เอาตัวหน้าสุดของทั้งสองฝ่ายมาเทียบ index ใครน้อยกว่า (มาถึงตาก่อน) ได้แบนอีกฝ่าย',
            },
            {
              t: "p",
              c: "คนที่รอด (ผู้แบน) ไม่หายไป — วนกลับไปต่อท้ายคิวตัวเองในรอบถัดไป โดยบวก n เข้า index เพื่อรักษาลำดับรอบหน้า",
            },

            { t: "h3", c: "2. กฎเหล็ก 4 ข้อ (The Logic)" },
            {
              t: "p",
              c: "เปิดคิวสองอัน แล้วเล่นเกมจนกว่าฝ่ายใดฝ่ายหนึ่งจะว่าง:",
            },
            {
              t: "ol",
              c: [
                "เตรียมคิว — วน senate เก็บ index ลง radiant หรือ dire ตามตัวอักษร R / D",
                "เปิดตา — popleft ตัวหน้าสุดของทั้งสองฝ่ายมาเป็น r และ d",
                "แบน + วนกลับ — ถ้า r < d: R ได้แบน D แล้ว radiant.append(r + n) · ไม่งั้น D ได้แบน R แล้ว dire.append(d + n)",
                "จบเกม — ฝ่ายใดว่าง อีกฝ่ายที่เหลือคือผู้ชนะ",
              ],
            },

            { t: "h3", c: "3. โค้ด Python (LeetCode Ready)" },
            {
              t: "p",
              c: "แปลงกฎสองคิวเป็นโค้ด:",
            },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `from collections import deque

class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        n = len(senate)
        radiant = deque()          # เก็บ index ของฝ่าย R
        dire = deque()             # เก็บ index ของฝ่าย D

        # กฎข้อ 1: เตรียมคิว — แยก index ตามฝ่าย
        for i, c in enumerate(senate):
            if c == "R":
                radiant.append(i)
            else:
                dire.append(i)

        # กฎข้อ 2–3: เปิดตาจนกว่าฝ่ายใดว่าง
        while radiant and dire:
            r = radiant.popleft()
            d = dire.popleft()
            # ใคร index น้อยกว่า = มาถึงตาก่อน = ได้แบนอีกฝ่าย
            if r < d:
                radiant.append(r + n)   # r รอด วนไปต่อท้าย (รอบหน้า)
            else:
                dire.append(d + n)      # d รอด วนไปต่อท้าย

        # กฎข้อ 4: ฝ่ายที่ยังเหลือคือผู้ชนะ
        return "Radiant" if radiant else "Dire"`,
            },

            { t: "h3", c: '4. จำลองการทำงาน — senate = "RDD"' },
            {
              t: "p",
              c: "n = 3 · เริ่มต้น radiant = [0], dire = [1, 2]",
            },
            {
              t: "table",
              head: ["r (หน้าสุด R)", "d (หน้าสุด D)", "ใครชนะตานี้", "radiant", "dire"],
              rows: [
                ["0", "1", "r < d → R แบน D, R วนไป 0+3=3", "[3]", "[2]"],
                ["3", "2", "r > d → D แบน R, D วนไป 2+3=5", "[]", "[5]"],
                ["(radiant ว่าง)", "—", "จบ → Dire ชนะ", "[]", "[5]"],
              ],
            },
            {
              t: "p",
              c: 'จบเกม — ได้คำตอบ "Dire"',
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "p",
              c: 'เคส "ลืมบวก n" — ถ้า append(r) แทน append(r + n):',
            },
            {
              t: "ul",
              c: [
                "ผู้รอดจะกลับเข้าคิวด้วย index เดิม ซึ่งเล็กเกินจริง",
                "เขาจะแซงคนที่ยังไม่ได้เล่นในรอบนี้ → ลำดับเพี้ยน คำตอบผิด",
              ],
            },
            {
              t: "callout",
              title: "ทำไมต้องบวก n?",
              c: "รอบถัดไปผู้รอดจะได้สิทธิ์หลังจากทุกคนในรอบปัจจุบันผ่านไปหมดแล้ว การบวก n ทำให้ index ใหม่ยังมากกว่าทุกคนที่เหลือในรอบนี้ แต่ยังเรียงลำดับกันเองถูกต้องเมื่อเทียบระหว่างผู้รอดด้วยกัน — เหมือน enqueue คิวใหม่ท้ายแถวจริง ๆ",
            },
            {
              t: "callout",
              title: "ห้ามใช้ list.pop(0)",
              warn: true,
              c: "list.pop(0) ช้า O(n) ให้ใช้ deque.popleft() ที่เป็น O(1) เสมอ",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — วุฒิสมาชิก n คน แต่ละคนถูกแบนในที่สุด การเทียบแต่ละครั้งกำจัดคนไป 1 คน",
                "Space O(n) — เก็บ index ของทุกคนไว้ในสอง queue",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: 'เมื่อโจทย์มี "การผลัดตากันเป็นรอบ ๆ แล้ววนกลับมาใหม่" ให้ใช้ queue จำลองคิว และให้ผู้ที่ยังอยู่ต่อ enqueue กลับเข้าท้ายแถวด้วย index + n เพื่อรักษาลำดับรอบถัดไป — เทคนิคเทียบ index หน้าสุดของสองฝ่ายใช้กับโจทย์แข่งขัน/ผลัดกันเล่นได้ทั่วไป',
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "In the world of Dota2, there are two parties: Radiant and Dire.\n\nThe senate consists of senators from both parties. They vote in rounds. In each round, each active senator can exercise one of two rights:\n\n1. **Ban one senator's right** — make another senator lose all rights in this and all future rounds.\n2. **Announce victory** — if all remaining active senators belong to the same party.\n\nGiven a string `senate` where each character is `'R'` (Radiant) or `'D'` (Dire), predict which party will win. Every senator plays optimally for their own party. Senators act in order from first to last, skipping those who have lost their rights.",
        },
        {
          t: "example",
          c: [
            {
              input: 'senate = "RD"',
              output: '"Radiant"',
              explain: `Explanation:\nThe first senator comes from Radiant and bans the next senator's right in round 1.\nThe second senator can't exercise any rights anymore.\nIn round 2, the first senator announces victory since he is the only one left.`,
            },
            {
              input: 'senate = "RDD"',
              output: '"Dire"',
              explain: `Explanation:\nThe first senator (R) bans the second senator (D) in round 1.\nThe third senator (D) bans the first senator (R) in round 1.\nIn round 2, the third senator announces victory since he is the only one left.`,
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
          summary: "Full solution · Try yourself first",
          c: [
            {
              t: "p",
              c: "This maps to the Queue pattern: \"Process in order — whoever comes first gets to ban first.\"",
            },

            { t: "h3", c: "1. Mindset Shift" },
            {
              t: "p",
              c: "Imagine two separate queues — one for Radiant, one for Dire — each storing the index (seating position) of active senators.",
            },
            {
              t: "p",
              c: "Key insight: the best strategy is always to ban the nearest opponent. In each round, compare the front of both queues. The senator with the smaller index (comes first) bans the other. The survivor re-enqueues with index + n to preserve round order.",
            },
            {
              t: "p",
              c: "Why add n? After round 1, survivors should go behind everyone still in the current round. Adding n ensures correct ordering across rounds.",
            },

            { t: "h3", c: "2. The Logic — 4 Steps" },
            {
              t: "p",
              c: "Start two queues and play until one side empties:",
            },
            {
              t: "ol",
              c: [
                "Prepare — iterate senate, push each index into radiant or dire.",
                "Face off — popleft the front of both queues to get r and d.",
                "Ban + re-enqueue — if r < d: R bans D, re-enqueue r + n into radiant. Else: D bans R, re-enqueue d + n into dire.",
                "Game over — when one queue empties, the other party wins.",
              ],
            },

            { t: "h3", c: "3. LeetCode-Ready Code" },
            {
              t: "p",
              c: "Convert the two-queue rules into code:",
            },
            {
              t: "code",
              lang: "python",
              label: "Submit this on LeetCode",
              c: `from collections import deque

class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        n = len(senate)
        radiant = deque()          # store indices of R senators
        dire = deque()             # store indices of D senators

        # Step 1: prepare queues
        for i, c in enumerate(senate):
            if c == "R":
                radiant.append(i)
            else:
                dire.append(i)

        # Steps 2–3: face off until one side empties
        while radiant and dire:
            r = radiant.popleft()
            d = dire.popleft()
            # smaller index comes first = gets to ban
            if r < d:
                radiant.append(r + n)   # R survives, re-enqueue for next round
            else:
                dire.append(d + n)      # D survives, re-enqueue for next round

        # Step 4: the non-empty queue wins
        return "Radiant" if radiant else "Dire"`,
            },

            { t: "h3", c: "4. Dry Run — senate = \"RDD\"" },
            {
              t: "p",
              c: "n = 3 · Start: radiant = [0], dire = [1, 2]",
            },
            {
              t: "table",
              head: ["r (front R)", "d (front D)", "Who wins this turn", "radiant", "dire"],
              rows: [
                ["0", "1", "r < d → R bans D, R re-enqueues 0+3=3", "[3]", "[2]"],
                ["3", "2", "r > d → D bans R, D re-enqueues 2+3=5", "[]", "[5]"],
                ["(radiant empty)", "—", "Game over → Dire wins", "[]", "[5]"],
              ],
            },
            {
              t: "p",
              c: "Done — answer is \"Dire\".",
            },

            { t: "h3", c: "5. Edge Cases & Pitfalls" },
            {
              t: "p",
              c: 'The "forgot +n" mistake — most common error:',
            },
            {
              t: "ul",
              c: [
                "If you re-enqueue r instead of r + n, the survivor gets the same small index.",
                "They'll jump ahead of senators who haven't played this round yet — wrong order, wrong answer.",
              ],
            },
            {
              t: "callout",
              title: "Why add n?",
              warn: true,
              c: "Survivors act after everyone in the current round. Adding n keeps them behind all current-round senators while still ordering correctly among themselves.",
            },
            {
              t: "callout",
              title: "Never use list.pop(0)",
              c: "list.pop(0) is O(n). Always use deque.popleft() for O(1).",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — each senator is banned at most once; each comparison eliminates one person.",
                "Space O(n) — store every senator's index in the two queues.",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "When a problem involves \"round-based competition with re-entry\", use queues to simulate the process. Let survivors re-enqueue with index + n to maintain correct round ordering. Comparing the front of two queues is a common pattern for head-to-head elimination games.",
            },
          ],
        },
      ],
    },
  },
};
