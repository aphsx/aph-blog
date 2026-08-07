import type { Page } from "@/lib/types";

export const linkedListPages: Record<string, Page> = {
  "lc75-intro-linked-list": {
    slug: "lc75-intro-linked-list",
    title: {
      th: "Linked List — คัมภีร์ลุย LeetCode",
      en: "",
    },
    lead: {
      th: "ข้อต่างจาก Array คือใช้ Index (arr[i]) ไม่ได้ — โหนดกระจัดกระจายในหน่วยความจำ การผ่าน 100% จึงขึ้นอยู่กับการควบคุม Pointers เท่านั้น",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "คัมภีร์ Linked List สำหรับลุย LeetCode ฉบับครบจบในหน้าเดียวครับ!",
        },
        {
          t: "p",
          c: 'ข้อแตกต่างของ Linked List กับ Array คือ เราใช้ Index (arr[i]) ไม่ได้ เพราะโหนดกระจัดกระจายอยู่ในหน่วยความจำ การจะแก้โจทย์ให้ผ่าน 100% จึงขึ้นอยู่กับการควบคุม "ข้อต่อ (Pointers)" เท่านั้น',
        },

        { t: "h2", c: "1. โครงสร้างโหนดที่ LeetCode ใช้ (ListNode)" },
        {
          t: "p",
          c: "เวลาทำโจทย์ LeetCode ระบบจะนิยามคลาส ListNode มาให้เราใช้เสมอ หน้าตาคือแบบนี้:",
        },
        {
          t: "code",
          lang: "python",
          label: "ListNode ที่ LeetCode นิยามให้",
          c: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val     # ค่าที่เก็บในโหนด
        self.next = next   # ตัวชี้ไปยังโหนดถัดไป (ถ้าเป็นโหนดสุดท้าย จะชี้ไปที่ None)`,
        },
        {
          t: "callout",
          title: "คำเตือนที่ต้องจำให้ขึ้นใจ",
          warn: true,
          c: "หากเราเผลอเรียก .next หรือ .val จากโหนดที่เป็น None เช่น curr = None แล้วไปสั่ง curr.next — Python จะฟ้อง Error ทันที: AttributeError: 'NoneType' object has no attribute 'next' (นี่คือสาเหตุที่คนส่งโจทย์ไม่ผ่านบ่อยที่สุด)",
        },

        { t: "h2", c: "2. 5 เทคนิคระดับเทวดา (Must-Know Patterns)" },
        {
          t: "p",
          c: "โจทย์ Linked List ใน LeetCode เกือบ 90% ใช้ผสมผสานกันจาก 5 รูปแบบนี้ครับ:",
        },

        { t: "h3", c: "Pattern 1: Dummy Head (โหนดหลอกแก้ Edge Case)" },
        {
          t: "ul",
          c: [
            "ปัญหา: เวลาโจทย์ให้ ลบ, สลับ, หรือ เพิ่ม โหนดที่ตำแหน่งแรกสุด (Head) คำตอบของ Head จะเปลี่ยนไป ทำให้เราต้องเขียน if-else เช็คกรณีหัวขบวนซับซ้อนมาก",
            "วิธีแก้: สร้างโหนดหลอกขึ้นมา 1 ตัว แปะไว้หน้า Head เสมอ แล้วส่งคืน dummy.next เป็นคำตอบตอนจบ",
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "โครงร่างการใช้ Dummy Head",
          c: `dummy = ListNode(0)   # สร้างโหนดหลอก ค่าอะไรก็ได้
dummy.next = head     # เอาโหนดหลอกต่อเข้ากับ Head เดิม
curr = dummy          # ใช้ curr เดินทำงาน

# ... จัดการเปลี่ยนข้อต่อต่างๆ ...

return dummy.next     # คำตอบที่แท้จริงคือตัวที่อยู่หลัง Dummy`,
        },

        { t: "h3", c: "Pattern 2: Fast & Slow Pointers (สองเข็มความเร็วต่างกัน)" },
        {
          t: "p",
          c: "เทคนิคนี้ใช้กระต่าย (Fast) วิ่งเร็วกว่าเต่า (Slow) 2 เท่า เอาไว้แก้โจทย์ 2 สไตล์หลัก:",
        },
        {
          t: "ol",
          c: [
            "หาจุดกึ่งกลางของ List — slow เดินทีละ 1 ก้าว (slow = slow.next) · fast เดินทีละ 2 ก้าว (fast = fast.next.next) · เมื่อ fast ถึงปลายทาง slow จะยืนอยู่ตรงจุดกึ่งกลางพอดีเป๊ะ!",
            "เช็คว่ามีวงวน (Cycle) หรือไม่ — ถ้าวิ่งไปเรื่อย ๆ แล้ว fast == slow แปลว่าวิ่งวนกลับมาชนกัน มี Cycle แน่นอน (Floyd's Cycle Finding Algorithm)",
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "โครงร่าง Fast & Slow",
          c: `slow = fast = head
while fast and fast.next:
    slow = slow.next          # เดิน 1 ก้าว
    fast = fast.next.next     # เดิน 2 ก้าว`,
        },

        { t: "h3", c: "Pattern 3: In-Place Reversal (การกลับทิศลิงก์ลิสต์)" },
        {
          t: "p",
          c: "การเปลี่ยนทิศทางจาก 1 → 2 → 3 ให้กลายเป็น 3 → 2 → 1 โดยไม่สร้างโหนดใหม่",
        },
        {
          t: "p",
          c: "เราต้องใช้ตัวแปร 3 ตัวควบคุมการหมุนข้อต่อ:",
        },
        {
          t: "ul",
          c: [
            "prev — โหนดก่อนหน้า (เริ่มต้นเป็น None)",
            "curr — โหนดปัจจุบันที่กำลังตัดข้อต่อ (เริ่มต้นเป็น head)",
            "nxt — โหนดถัดไป (เอาไว้เซฟทางไปต่อ ไม่ให้หลุดขบวน)",
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "โครงร่าง In-Place Reversal",
          c: `prev = None
curr = head

while curr:
    nxt = curr.next   # 1. จำทางไปต่อไว้ก่อน
    curr.next = prev  # 2. หักข้อต่อกลับหลังชี้หา prev
    prev = curr       # 3. เขยิบ prev ตามมา
    curr = nxt        # 4. เขยิบ curr ไปโหนดถัดไป

return prev           # prev จะกลายเป็น Head ตัวใหม่`,
        },

        { t: "h3", c: "Pattern 4: Pointer Cutting & Re-linking (การตัด-ต่อข้อต่อ)" },
        {
          t: "p",
          c: "เวลาต้องการลบโหนด B ออกจากขบวน A → B → C:",
        },
        {
          t: "p",
          c: "เราไม่ต้องลบ B ทิ้งจริง ๆ ในหน่วยความจำ แค่สั่งให้ A ข้ามไปชี้ C แทน:",
        },
        {
          t: "code",
          lang: "python",
          label: "ตัดข้อต่อข้ามโหนดที่ต้องการลบ",
          c: `A.next = A.next.next`,
        },

        { t: "h3", c: "Pattern 5: Boundary Check (การตั้งเงื่อนไขลูปไม่ให้โค้ดพัง)" },
        {
          t: "p",
          c: "ก่อนจะขยับ Pointer ต้องตั้งเงื่อนไข while ให้ครอบคลุมเสมอ:",
        },
        {
          t: "table",
          head: ["สถานการณ์", "เงื่อนไขใน while"],
          rows: [
            ["เดินเช็คทีละ 1 โหนด จนสุดสาย", "while curr:"],
            ["เช็คโหนดถัดไป (ต้องการหยุดที่โหนดสุดท้าย)", "while curr and curr.next:"],
            ["กระโดดทีละ 2 ก้าว (fast.next.next)", "while fast and fast.next:"],
          ],
        },

        { t: "h2", c: "3. ตะลุยโจทย์จริง: LC206 — Reverse Linked List" },
        {
          t: "p",
          c: "ลองเอา Pattern 3 (In-Place Reversal) มาเขียนใส่ฟังก์ชันจริงส่ง LeetCode:",
        },
        {
          t: "code",
          lang: "python",
          label: "คำตอบสำหรับวางใน LeetCode",
          c: `class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        prev = None
        curr = head

        while curr:
            nxt = curr.next   # เซฟโหนดถัดไป
            curr.next = prev  # กลับทิศชี้หาตัวหน้า
            prev = curr       # เลื่อน prev
            curr = nxt        # เลื่อน curr

        return prev  # คืนค่าหัวขบวนใหม่`,
        },

        { t: "h3", c: "จำลองขั้นตอนการทำงาน (Walkthrough)" },
        {
          t: "p",
          c: "สมมติ input คือ 1 → 2 → 3 → None",
        },
        {
          t: "table",
          head: [
            "รอบที่",
            "prev",
            "curr",
            "nxt (เซฟไว้)",
            "Action: curr.next = prev",
            "ผลลัพธ์ของ List",
          ],
          rows: [
            ["เริ่ม", "None", "1", "—", "—", "1 → 2 → 3"],
            ["1", "1", "2", "2", "1.next = None", "None ← 1 · 2 → 3"],
            ["2", "2", "3", "3", "2.next = 1", "None ← 1 ← 2 · 3"],
            ["3", "3", "None", "None", "3.next = 2", "None ← 1 ← 2 ← 3"],
          ],
        },
        {
          t: "p",
          c: "พอลูปจบ curr กลายเป็น None ลูปจะหยุด และคืนค่า prev ซึ่งก็คือโหนด 3 (Head ตัวใหม่) ออกไปถูกต้อง — O(N) Time / O(1) Space!",
        },

        { t: "h2", c: "4. Checklist เช็คโค้ดก่อนกด Submit" },
        {
          t: "p",
          c: "ก่อนกดปุ่ม Submit ใน LeetCode ให้เช็ค 4 ข้อนี้เสมอ:",
        },
        {
          t: "ol",
          c: [
            "Empty List — ถ้า head == None โค้ดพังไหม?",
            "Single Node — ถ้า List มีโหนดเดียว (head.next == None) โค้ดทำงานถูกต้องไหม?",
            "Two Nodes — ถ้า List มีแค่ 2 โหนด วนลูปหลุดไหม?",
            "Cycle Hazard — มีตรงไหนเขียนชี้กลับหาตัวเองจนเกิด Infinite Loop หรือเปล่า?",
          ],
        },
        {
          t: "callout",
          title: "เตรียมตัวต่อ",
          c: "หมวดนี้มี 4 ข้อ: Delete Middle · Odd Even · Reverse · Twin Sum — เอา 5 patterns ข้างบนไปผสมกันได้เลย!",
        },
      ],
      en: [],
    },
  },

  "lc75-p29": {
    slug: "lc75-p29",
    title: { th: "ข้อ 29 · LC2095 Delete the Middle Node of a Linked List (ลบโหนดกลาง) 🟡", en: "" },
    lead: {
      th: "โจทย์ Fast & Slow — หาตู้กลางของขบวนในรอบเดียว แล้วปลดโซ่ให้กระโดดข้ามมันทิ้ง",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "โจทย์ (LC2095): กำหนด head ของ linked list มาให้ ให้ลบ middle node ออกจาก list แล้ว return head ของ list ที่แก้ไขแล้ว โดยนิยามตัวกลางของ list ขนาด n คือ node ลำดับที่ ⌊n/2⌋ นับ index จาก 0 (เช่น n = 1, 2, 3, 4, 5 ตัวกลางคือ index 0, 1, 1, 2, 2 ตามลำดับ)",
        },
        {
          t: "example",
          c: [
            {
              input: "head = [1,3,4,7,1,2,6]",
              output: "[1,3,4,1,2,6]",
              explain:
                "list มี n = 7 ตัว ตัวกลางอยู่ที่ index ⌊7/2⌋ = 3 ซึ่งคือ node ค่า 7 ลบออกแล้วเหลือ [1,3,4,1,2,6]",
            },
            {
              input: "head = [1,2,3,4]",
              output: "[1,2,4]",
              explain:
                "list มี n = 4 ตัว ตัวกลางอยู่ที่ index ⌊4/2⌋ = 2 ซึ่งคือ node ค่า 3 ลบออกแล้วเหลือ [1,2,4]",
            },
            {
              input: "head = [1]",
              output: "[]",
              explain:
                "list มี node เดียว (n = 1) ตัวกลางคือ index ⌊1/2⌋ = 0 ซึ่งคือตัวมันเอง ลบออกแล้วเหลือ list ว่าง",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน node อยู่ระหว่าง 1 ถึง 10^5",
            "1 <= Node.val <= 10^5",
          ],
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: 'ข้อนี้ตรงกับสัญญาณของหมวด: "การเดิน 2 จังหวะ (Fast & Slow Pointers)" — หาตู้กลางแล้วปลดโซ่ข้ามมันทิ้ง',
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "วิธีง่ายคือเดินรอบแรกนับว่าขบวนมีกี่ตู้ (ได้ n) แล้วเดินรอบสองไปหยุดที่ตู้ ⌊n/2⌋ เพื่อปลดโซ่ — ถูกแต่ต้อง traverse สองรอบ",
            },
            {
              t: "p",
              c: "หัวใจสำคัญ: ใช้ Fast & Slow — ให้ slow เดินทีละ 1 ตู้ · fast เดินทีละ 2 ตู้ พอ fast วิ่งถึงปลายขบวน slow จะหยุดพอดีที่ตู้กลาง จบในรอบเดียว!",
            },
            {
              t: "p",
              c: "แต่แค่รู้ว่าตู้ไหนเป็นกลางยังลบไม่ได้ — ต้องมี prev (ตู้ก่อนหน้า) เพื่อสั่งปลดโซ่: prev.next = slow.next ให้กระโดดข้ามตู้กลางทิ้ง",
            },

            { t: "h3", c: "2. กฎเหล็ก 4 ข้อ (The Logic)" },
            {
              t: "p",
              c: "เปิดตัวชี้สามตัว แล้วเดินจนกว่า fast จะหมดทาง:",
            },
            {
              t: "ol",
              c: [
                "ดักเคสพิเศษ — ถ้าขบวนมีตู้เดียว (head.next เป็น None) ลบแล้วเหลือว่าง → return None",
                "เตรียมตัวชี้ — prev = None · slow = head · fast = head",
                "เดินคู่ — ตราบใดที่ fast และ fast.next ยังมีอยู่: prev = slow แล้ว slow ขยับ 1 · fast ขยับ 2",
                "ปลดโซ่ — prev.next = slow.next แล้ว return head",
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
              c: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # กฎข้อ 1: มีตู้เดียว ลบแล้วเหลือว่าง
        if head.next is None:
            return None

        prev = None                 # ตู้ก่อนหน้าตัวกลาง
        slow = head                 # เดินทีละ 1 ตู้ -> จบที่ตัวกลาง
        fast = head                 # เดินทีละ 2 ตู้

        # กฎข้อ 3: เดินคู่จนกว่า fast จะหมดทาง
        while fast and fast.next:
            prev = slow
            slow = slow.next        # slow ขยับ 1
            fast = fast.next.next   # fast ขยับ 2

        # กฎข้อ 4: ปลดโซ่ข้ามตู้กลางทิ้ง
        prev.next = slow.next
        return head`,
            },

            { t: "h3", c: "4. จำลองการทำงาน — 1 → 3 → 4 → 7 → 1 → 2 → 6" },
            {
              t: "table",
              head: ["รอบ", "prev (ค่า)", "slow (ค่า)", "fast (ค่า)", "หมายเหตุ"],
              rows: [
                ["ก่อนลูป", "None", "1", "1", "fast.next มี → เข้าลูป"],
                ["รอบ 1", "1", "3", "4", "fast.next มี"],
                ["รอบ 2", "3", "4", "1", "fast.next มี"],
                ["รอบ 3", "4", "7", "6", "fast.next ไม่มี → หยุด"],
                ["หลังลูป", "4", "7 (ตัวกลาง)", "6", "ปลดโซ่: 4.next ชี้ไป 1 (ข้าม 7)"],
              ],
            },
            {
              t: "p",
              c: "จบเกม — ได้ขบวน [1, 3, 4, 1, 2, 6]",
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "p",
              c: 'เคส "ตู้เดียว" — ถ้าไม่ดักไว้:',
            },
            {
              t: "ul",
              c: [
                "loop ไม่ทำงานเลย (fast.next เป็น None ตั้งแต่แรก)",
                "prev ยังเป็น None → บรรทัด prev.next จะพัง (AttributeError)",
              ],
            },
            {
              t: "callout",
              title: "เงื่อนไข while",
              warn: true,
              c: "ต้องเขียน while fast and fast.next — ถ้าเขียนแค่ while fast จะพังตอน fast.next.next เพราะไปอ้าง .next ของ None เมื่อ fast วิ่งเลยขอบขบวน",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — เดินผ่านขบวนรอบเดียว",
                "Space O(1) — ใช้แค่ตัวชี้ไม่กี่ตัว ไม่สร้างขบวนใหม่",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "Fast & Slow หาตู้กลางได้ในรอบเดียว และเวลาจะลบ/แก้ตู้ใน Linked List ต้องมีตัวชี้ไปที่ 'ตู้ก่อนหน้า' เสมอ — สองไอเดียนี้ใช้ซ้ำได้อีกหลายข้อ",
            },
          ],
        },
      ],
      en: [],
    },
  },

  "lc75-p30": {
    slug: "lc75-p30",
    title: { th: "ข้อ 30 · LC328 Odd Even Linked List (จัดโหนดคี่-คู่) 🟡", en: "" },
    lead: {
      th: "โจทย์เย็บผ้า — แยกขบวนเป็นสายคี่กับสายคู่ แล้วต่อหางคี่เข้าหัวคู่ โดยไม่สร้างตู้ใหม่",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "โจทย์ (LC328): กำหนด head ของ singly linked list มาให้ ให้ group node ที่มี index เป็นเลขคี่มาไว้ด้วยกัน ตามด้วย node ที่มี index เป็นเลขคู่ แล้ว return list ที่จัดลำดับใหม่แล้ว โดยนิยามให้ node ตัวแรกเป็นคี่ (index 1) ตัวที่สองเป็นคู่ (index 2) ไล่ไปเรื่อย ๆ ลำดับสัมพัทธ์ภายในกลุ่มคี่และกลุ่มคู่ต้องคงเดิมเหมือนใน input ต้องแก้ปัญหาด้วย space complexity O(1) และ time complexity O(n)",
        },
        {
          t: "example",
          c: [
            {
              input: "head = [1,2,3,4,5]",
              output: "[1,3,5,2,4]",
              explain:
                "ตำแหน่งคี่ (index 1,3,5) คือค่า 1,3,5 มาก่อน ตามด้วยตำแหน่งคู่ (index 2,4) คือค่า 2,4",
            },
            {
              input: "head = [2,1,3,5,6,4,7]",
              output: "[2,3,6,7,1,5,4]",
              explain:
                "ตำแหน่งคี่ (index 1,3,5,7) คือค่า 2,3,6,7 มาก่อน ตามด้วยตำแหน่งคู่ (index 2,4,6) คือค่า 1,5,4",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน node อยู่ระหว่าง 0 ถึง 10^4",
            "-10^6 <= Node.val <= 10^6",
          ],
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: 'ข้อนี้ตรงกับสัญญาณ "การเย็บผ้า (Merge)" — แต่คราวนี้เราเย็บขบวนเดิมให้เป็นสองสาย แล้วต่อกลับ โดยไม่สร้างตู้ใหม่ (Space O(1))',
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "วิธีง่ายคือเก็บค่า index คี่ไว้ list หนึ่ง ค่าคู่ไว้อีก list แล้วต่อกัน — แต่ใช้ Space O(n) ผิดเงื่อนไขโจทย์!",
            },
            {
              t: "p",
              c: "หัวใจสำคัญ: ไม่ต้องสร้างตู้ใหม่ — ใช้ตัวชี้สองตัว odd กับ even สานข้อต่อสลับกันไป แยกเป็นสองขบวนย่อย แล้วเอาหางสายคี่ไปเกี่ยวหัวสายคู่",
            },

            { t: "h3", c: "2. กฎเหล็ก 4 ข้อ (The Logic)" },
            {
              t: "p",
              c: "เปิดสองสาย แล้วเย็บไปจนหมด:",
            },
            {
              t: "ol",
              c: [
                "ดักเคสพิเศษ — ขบวนว่างหรือมีตู้เดียว → return head เลย",
                "เตรียมสาย — odd ชี้ตู้แรก · even ชี้ตู้ที่สอง · even_head จำหัวสายคู่ไว้ (สำคัญมาก!)",
                "เย็บสลับ — ตราบใดที่ even และ even.next ยังมี: odd ข้ามไปเกี่ยวตู้คี่ถัดไป แล้ว even ข้ามไปเกี่ยวตู้คู่ถัดไป",
                "ต่อสาย — odd.next = even_head แล้ว return head",
              ],
            },

            { t: "h3", c: "3. โค้ด Python (LeetCode Ready)" },
            {
              t: "p",
              c: "แปลงกฎสองสายเป็นโค้ด:",
            },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # กฎข้อ 1: 0 หรือ 1 ตู้ ไม่ต้องทำอะไร
        if head is None or head.next is None:
            return head

        odd = head                  # ตัวชี้สายตำแหน่งคี่
        even = head.next            # ตัวชี้สายตำแหน่งคู่
        even_head = even            # จำหัวสายคู่ไว้ เพื่อเอาไปต่อทีหลัง

        # กฎข้อ 3: เย็บสลับจนหมด
        while even and even.next:
            odd.next = even.next    # คี่ข้ามไปเกี่ยวตู้คี่ถัดไป
            odd = odd.next          # ขยับตัวชี้คี่
            even.next = odd.next    # คู่ข้ามไปเกี่ยวตู้คู่ถัดไป
            even = even.next        # ขยับตัวชี้คู่

        # กฎข้อ 4: ต่อหางสายคี่เข้ากับหัวสายคู่
        odd.next = even_head
        return head`,
            },

            { t: "h3", c: "4. จำลองการทำงาน — 1 → 2 → 3 → 4 → 5" },
            {
              t: "p",
              c: "even_head จำไว้ที่ค่า 2 ตั้งแต่ต้น",
            },
            {
              t: "table",
              head: ["รอบ", "odd (ค่า)", "even (ค่า)", "สายที่เย็บได้"],
              rows: [
                ["ก่อนลูป", "1", "2", "1→2→3→4→5"],
                ["รอบ 1", "3", "4", "คี่: 1→3 · คู่: 2→4"],
                ["รอบ 2", "5", "4", "คี่: 1→3→5 · คู่: 2→4 (even.next ไม่มี → หยุด)"],
                ["หลังลูป", "5", "—", "odd.next = even_head → 1→3→5→2→4"],
              ],
            },
            {
              t: "p",
              c: "จบเกม — ได้ขบวน [1, 3, 5, 2, 4]",
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "p",
              c: 'เคส "ลืม even_head" — ความพลาดอันดับหนึ่งของข้อนี้:',
            },
            {
              t: "ul",
              c: [
                "ระหว่าง loop ตัวชี้ของสายคู่ถูกขยับไปเรื่อย ๆ",
                "ถ้าไม่จำหัวไว้ก่อน จะหาไม่เจอว่าหางสายคี่ต้องไปเกี่ยวตู้ไหน",
              ],
            },
            {
              t: "callout",
              title: "ลำดับสี่บรรทัดใน loop สลับไม่ได้",
              warn: true,
              c: "ต้องขยับ odd ให้เสร็จก่อน ถึงจะใช้ odd.next มาหาตู้คู่ถัดไปได้ถูก — ถ้าสลับลำดับจะได้ข้อต่อผิดตู้ทันที!",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — เดินผ่านทุกตู้รอบเดียว",
                "Space O(1) — แค่สานข้อต่อ ไม่สร้างขบวนใหม่",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "การแยกขบวนเป็นหลายสายในที่เดิมด้วยการสานข้อต่อสลับกัน แล้วค่อยต่อกลับ เป็น pattern ที่ประหยัด space มาก — กุญแจคือจำหัวของสายที่จะเอาไปต่อทีหลังไว้เสมอ",
            },
          ],
        },
      ],
      en: [],
    },
  },

  "lc75-p31": {
    slug: "lc75-p31",
    title: { th: "ข้อ 31 · LC206 Reverse Linked List (กลับ Linked List) 🟢", en: "" },
    lead: {
      th: "โจทย์สลับสาย — หันข้อต่อโซ่กลับหลังหันทั้งขบวน ด้วย prev / cur / nxt",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "โจทย์ (LC206): กำหนด head ของ singly linked list มาให้ ให้ reverse ทั้ง list แล้ว return head ตัวใหม่ของ list ที่ reverse แล้ว",
        },
        {
          t: "example",
          c: [
            {
              input: "head = [1,2,3,4,5]",
              output: "[5,4,3,2,1]",
            },
            {
              input: "head = [1,2]",
              output: "[2,1]",
            },
            {
              input: "head = []",
              output: "[]",
              explain:
                "list ว่าง reverse แล้วยังว่างเหมือนเดิม โค้ดคืนค่าถูกต้องโดยอัตโนมัติโดยไม่ต้องดัก edge case พิเศษ",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน node อยู่ระหว่าง 0 ถึง 5000",
            "-5000 <= Node.val <= 5000",
          ],
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: 'ข้อนี้ตรงกับสัญญาณ "การสลับสาย (Reverse)" — และตรงกับประโยคท่องจำ: "ก่อนเปลี่ยนโซ่ ต้องแน่ใจว่าไม่ได้ทิ้งตู้เก่าให้ลอยเคว้ง!"',
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "วิธีง่ายคือเก็บค่าทุกตู้ใส่ list แล้ว reverse สร้างขบวนใหม่ — ถูกแต่ใช้ Space O(n)",
            },
            {
              t: "p",
              c: "หัวใจสำคัญ: ไม่ต้องย้ายของในตู้เลย — แค่เดินไปพลิกข้อต่อของแต่ละตู้ให้ชี้ย้อนหลังในที่เดิม (in-place) ด้วย prev กับ cur",
            },
            {
              t: "p",
              c: "นึกภาพว่ากำลังเดินข้ามสะพานแล้วพับสะพานข้างหลังทิ้ง — ต้องมองว่าก้าวต่อไปเหยียบตรงไหนให้เรียบร้อยก่อนพับ!",
            },

            { t: "h3", c: "2. กฎเหล็ก 4 ข้อ (The Logic)" },
            {
              t: "p",
              c: "เปิด prev/cur แล้วพลิกทีละตู้:",
            },
            {
              t: "ol",
              c: [
                "เตรียมตัวชี้ — prev = None · cur = head",
                "จำทางไว้ก่อน — nxt = cur.next (กันหลุดขบวน!)",
                "พลิกข้อต่อ — cur.next = prev แล้วขยับ prev ตามมาที่ cur · cur ไปที่ nxt",
                "จบเกม — พอ cur เป็น None · prev คือ head ตัวใหม่ → return prev",
              ],
            },

            { t: "h3", c: "3. โค้ด Python (LeetCode Ready)" },
            {
              t: "p",
              c: "สี่บรรทัดใน loop ท่องให้ขึ้นใจ — ท่านี้ใช้ซ้ำได้อีกหลายข้อ:",
            },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None                 # ข้างหลัง cur (ตอนแรกยังไม่มีอะไร)
        cur = head                  # ตู้ที่กำลังพิจารณา

        while cur:
            nxt = cur.next          # 1) จำตู้ถัดไปไว้ก่อน (กันหลุดขบวน)
            cur.next = prev         # 2) พลิกข้อต่อให้ชี้ย้อนกลับ
            prev = cur              # 3) ขยับ prev ตามมา
            cur = nxt               # 4) ขยับ cur ไปตู้ที่จำไว้

        return prev                 # จบ loop prev คือ head ตัวใหม่`,
            },

            { t: "h3", c: "4. จำลองการทำงาน — 1 → 2 → 3" },
            {
              t: "table",
              head: ["รอบ", "cur (ค่า)", "nxt (จำไว้)", "หลังพลิก cur.next ชี้ไป", "prev หลังรอบนี้"],
              rows: [
                ["ก่อนลูป", "1", "—", "—", "None"],
                ["รอบ 1", "1", "2", "None", "1"],
                ["รอบ 2", "2", "3", "1", "2"],
                ["รอบ 3", "3", "None", "2", "3"],
                ["หลังลูป", "None → หยุด", "—", "—", "3 = head ใหม่"],
              ],
            },
            {
              t: "p",
              c: "จบเกม — ได้ขบวน [3, 2, 1]",
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "p",
              c: 'เคส "ลืมจำ nxt ไว้ก่อน" — กับดักคลาสสิก:',
            },
            {
              t: "ul",
              c: [
                "พอสั่ง cur.next = prev ปุ๊บ ข้อต่อเดิมที่ชี้ไปข้างหน้าหายทันที",
                "เดินต่อไม่ได้ — ต้อง nxt = cur.next มาก่อนเสมอ",
              ],
            },
            {
              t: "callout",
              title: "return อะไร?",
              warn: true,
              c: "ต้อง return prev ไม่ใช่ cur — ตอนจบ cur เป็น None ไปแล้ว (ตกขอบขบวน) ส่วน prev ค้างอยู่ที่ตู้สุดท้ายที่พลิก ซึ่งคือ head ตัวใหม่",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — เดินผ่านทุกตู้หนึ่งรอบ",
                "Space O(1) — ใช้ตัวชี้ไม่กี่ตัว ไม่สร้างขบวนใหม่",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "การ reverse ด้วย prev/cur/nxt สี่บรรทัดคือท่ามาตรฐานที่ต้องท่องให้ขึ้นใจ — ข้อ 32 จะเอาไปใช้ reverse 'บางส่วน' ของขบวนต่อ",
            },
          ],
        },
      ],
      en: [],
    },
  },

  "lc75-p32": {
    slug: "lc75-p32",
    title: { th: "ข้อ 32 · LC2130 Maximum Twin Sum of a Linked List (ผลรวมคู่แฝดมากสุด) 🟡", en: "" },
    lead: {
      th: "ประกอบสามท่า: Fast & Slow หากลาง → Reverse ครึ่งหลัง → เดินสองสายบวกทีละคู่",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "โจทย์ (LC2130): ใน linked list ขนาด n ที่ n เป็นเลขคู่ นิยามว่า node ลำดับที่ i (นับจาก 0) คือ twin ของ node ลำดับที่ n-1-i เมื่อ 0 <= i <= (n/2)-1 นิยาม twin sum คือผลรวมของค่า node หนึ่งกับ twin ของมัน กำหนด head ของ linked list ที่มีความยาวเป็นเลขคู่มาให้ ให้ return ค่า twin sum ที่มากที่สุด",
        },
        {
          t: "example",
          c: [
            {
              input: "head = [5,4,2,1]",
              output: "6",
              explain:
                "node 0 กับ node 3 เป็น twin กัน (5+1=6) และ node 1 กับ node 2 เป็น twin กัน (4+2=6) ทั้งคู่ได้ twin sum เท่ากันคือ 6",
            },
            {
              input: "head = [4,2,2,3]",
              output: "7",
              explain:
                "node 0 (val=4) กับ node 3 (val=3) เป็น twin กัน ได้ twin sum = 7 ส่วน node 1 กับ node 2 ได้ twin sum = 4 ดังนั้นค่ามากสุดคือ max(7,4) = 7",
            },
            {
              input: "head = [1,100000]",
              output: "100001",
              explain:
                "list มีแค่คู่ twin เดียวคือ node 0 กับ node 1 ผลรวม 1 + 100000 = 100001",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน node เป็นเลขคู่เสมอ อยู่ระหว่าง 2 ถึง 10^5",
            "1 <= Node.val <= 10^5",
          ],
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: "ข้อนี้คือบอสใหญ่ของหมวด — ประกอบร่างสามท่าจากข้อก่อนหน้า: Fast & Slow (ข้อ 29) + Reverse (ข้อ 31) + เดินสองสาย",
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "ปัญหาคือ Linked List เดินย้อนกลับไม่ได้ — อยากบวกตู้หน้ากับตู้หลัง (twin) จึงยากมาก",
            },
            {
              t: "p",
              c: "หัวใจสำคัญ: หาจุดกลางด้วย Fast & Slow → พลิกข้อต่อครึ่งหลังให้หันมาทางเดียวกับครึ่งหน้า → เดินจากสองปลายเข้ามาบวกทีละคู่ เก็บค่ามากสุด",
            },
            {
              t: "p",
              c: "วิธีง่ายคือเก็บทุกค่าใส่ list แล้วบวก vals[i] + vals[n-1-i] — ถูกแต่ Space O(n) วิธีนี้ทำ in-place ได้ Space O(1)",
            },

            { t: "h3", c: "2. กฎเหล็ก 3 ข้อ (The Logic)" },
            {
              t: "p",
              c: "แบ่งงานเป็นสามขั้นชัด ๆ:",
            },
            {
              t: "ol",
              c: [
                "หา middle — Fast & Slow เดิน พอ fast ตกขอบ slow หยุดที่หัวครึ่งหลัง (n เป็นเลขคู่เสมอ)",
                "reverse ครึ่งหลัง — เอาท่าจากข้อ 31 มาพลิกจาก slow ได้ prev เป็นหัวใหม่ (ตู้สุดท้ายเดิมมาอยู่หน้าสุด)",
                "บวกทีละคู่ — first ที่ head · second ที่ prev เดินพร้อมกัน first.val + second.val คือ twin sum คู่หนึ่ง เก็บ max",
              ],
            },

            { t: "h3", c: "3. โค้ด Python (LeetCode Ready)" },
            {
              t: "p",
              c: "สามขั้นเรียงกันในฟังก์ชันเดียว:",
            },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        # ขั้นที่ 1: หาตัวกลางด้วย Fast & Slow
        slow = head
        fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        # ตอนนี้ slow อยู่ที่หัวของครึ่งหลังพอดี

        # ขั้นที่ 2: พลิกข้อต่อครึ่งหลัง (ท่าจากข้อ 31)
        prev = None
        cur = slow
        while cur:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
        # prev คือ head ของครึ่งหลังที่พลิกแล้ว

        # ขั้นที่ 3: เดินสองสายพร้อมกัน บวกทีละคู่ เก็บค่ามากสุด
        best = 0
        first = head
        second = prev
        while second:               # ครึ่งหลังสั้นเท่ากับครึ่งหน้าพอดี
            best = max(best, first.val + second.val)
            first = first.next
            second = second.next
        return best`,
            },

            { t: "h3", c: "4. จำลองการทำงาน — 5 → 4 → 2 → 1" },
            {
              t: "table",
              head: ["ขั้นตอน", "สถานะ", "ผลลัพธ์"],
              rows: [
                ["หา middle", "fast เดินจนตกขอบ · slow หยุดที่ 2", "slow = หัวครึ่งหลัง (2 → 1)"],
                ["reverse ครึ่งหลัง", "พลิก 2 → 1 ให้เป็น 1 → 2", "prev = หัวใหม่ (ค่า 1)"],
                ["บวกคู่ที่ 1", "first=5 · second=1", "5+1 = 6 · best = 6"],
                ["บวกคู่ที่ 2", "first=4 · second=2", "4+2 = 6 · best = 6"],
                ["จบ", "second เป็น None", "คืน best = 6"],
              ],
            },
            {
              t: "p",
              c: "จบเกม — ได้คำตอบ 6",
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "p",
              c: 'เคส "ข้อต่อไขว้ตรงรอยต่อกลาง":',
            },
            {
              t: "ul",
              c: [
                "หลัง reverse ครึ่งหลัง ข้อต่อตรงรอยต่ออาจไขว้กันนิดหน่อย",
                "ไม่กระทบ เพราะเราเดินแค่ n/2 ก้าวแล้วหยุดเมื่อ second เป็น None พอดี",
              ],
            },
            {
              t: "callout",
              title: "เริ่ม best = 0 ได้ไหม?",
              c: "ได้ เพราะโจทย์นี้ค่าในตู้เป็นบวกเสมอ — ถ้าโจทย์อนุญาตค่าติดลบควรเริ่มด้วยคู่แรกแทน",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — หากลาง + reverse ครึ่งหลัง + เดินบวก ล้วนเป็นเชิงเส้น",
                "Space O(1) — แก้ข้อต่อในที่เดิม ไม่ได้ copy ค่าไปเก็บใน list ใหม่",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "โจทย์ยาก ๆ ของ Linked List มักเป็นการประกอบร่างเทคนิคพื้นฐานหลายอันเข้าด้วยกัน (หากลาง + reverse + เดินสองสาย) — ถ้าท่าพื้นฐานแต่ละอันแม่น การต่อจิ๊กซอว์แบบนี้จะง่ายขึ้นมาก",
            },
          ],
        },
      ],
      en: [],
    },
  },
};
