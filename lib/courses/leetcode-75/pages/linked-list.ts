import type { Page } from "@/lib/types";

export const linkedListPages: Record<string, Page> = {
  "lc75-intro-linked-list": {
    slug: "lc75-intro-linked-list",
    title: {
      th: "Linked List — จากศูนย์จนพร้อมลุย LeetCode",
      en: "",
    },
    lead: {
      th: "ทิ้งภาพโรงหนัง มาสร้างขบวนรถไฟ — ปูพื้นฐานจาก Absolute Zero ไล่ถึง 5 patterns ที่ใช้ลุยโจทย์ได้จริง",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "หลายคนกลัว Linked List เพราะมันมองไม่เห็นภาพเหมือนการเก็บข้อมูลแบบ List ธรรมดา แต่เชื่อไหมครับว่า ถ้าคุณเข้าใจคอนเซปต์ของมัน มันจะกลายเป็นเรื่องที่สนุกและพลิกแพลงได้เยอะมาก — เรามาค่อย ๆ แกะกันทีละสเต็ป จากศูนย์จนพร้อมลุย LeetCode ครับ!",
        },
        {
          t: "p",
          c: 'ข้อแตกต่างสำคัญที่ต้องจำไว้ก่อน: Linked List ใช้ Index (arr[i]) ไม่ได้ เพราะโหนดกระจัดกระจายอยู่ในหน่วยความจำ การจะแก้โจทย์ให้ผ่าน 100% จึงขึ้นอยู่กับการควบคุม "ข้อต่อ (Pointers)" เท่านั้น',
        },

        { t: "h2", c: "1. ปลดล็อกไอเดีย: ทิ้งโรงหนัง แล้วไปสร้างขบวนรถไฟ" },
        {
          t: "p",
          c: 'ปกติเวลาเราเก็บข้อมูลใน Python List (เช่น [10, 20, 30]) ข้อมูลจะถูกวางเรียงติดกันเป็นแถวยาว ๆ เหมือน "ที่นั่งในโรงหนัง"',
        },
        {
          t: "ul",
          c: [
            "ข้อดี: ถ้าอยากเรียกคนนั่งเก้าอี้เบอร์ 5 ก็ชี้ตัวได้ทันที",
            'ข้อเสีย: ถ้ามีคนอยากมาแทรกตรงกลาง คุณต้องสั่งให้คนที่นั่งอยู่ "ขยับถอยไปทีละเก้าอี้" ทั้งแถว! วุ่นวายสุด ๆ',
          ],
        },
        {
          t: "p",
          c: 'ภาพจำใหม่ของ Linked List: ให้คุณเปลี่ยนมุมมองใหม่ นึกถึง "ขบวนรถไฟ" ครับ! ตู้รถไฟแต่ละตู้จอดอยู่คนละที่กันในลานกว้าง ๆ ไม่ได้อยู่ติดกัน สิ่งที่ทำให้มันเชื่อมกันได้คือ "ข้อต่อ (โซ่)" ที่เกี่ยวตู้แรกไปหาตู้ที่สอง ตู้สองไปหาตู้สาม... ไปเรื่อย ๆ',
        },
        {
          t: "table",
          head: ["คุณสมบัติ", "Array (ที่นั่งโรงหนัง)", "Linked List (ขบวนรถไฟ)"],
          rows: [
            ["การแทรกของตรงกลาง", "ช้า (ต้องขยับคนอื่นทั้งแถว)", "เร็วมาก! (แค่ปลดโซ่แล้วเกี่ยวใหม่)"],
            ["การหาของตู้ที่ 5", "เร็วมาก! (ชี้ตัวได้เลย)", "ช้า (ต้องเดินไล่ตั้งแต่หัวขบวน)"],
          ],
        },

        { t: "h2", c: '2. โครงสร้างของ "ตู้รถไฟ" (The Node)' },
        {
          t: "p",
          c: "ตู้รถไฟ 1 ตู้ (เราเรียกศัพท์เทคนิคว่า Node หรือ โหนด) จะมีส่วนประกอบสำคัญแค่ 2 อย่างเท่านั้นครับ:",
        },
        {
          t: "ol",
          c: [
            "val (Value) — กล่องบรรจุสัมภาระ (เก็บตัวเลข, ข้อความ หรืออะไรก็ได้)",
            'next (Pointer) — ข้อต่อโซ่ที่ชี้บอกทางว่า "ตู้ถัดไปอยู่ที่ไหน?"',
          ],
        },
        {
          t: "p",
          c: "และมีตัวแปรพิเศษอีก 2 ตัวที่ต้องจำให้ขึ้นใจ:",
        },
        {
          t: "ul",
          c: [
            "Head (หัวขบวน) — ตู้แรกสุดของขบวน (ถ้ารักษา Head ไว้ไม่ได้ คุณจะหาตู้ที่เหลือไม่เจออีกเลย!)",
            "None (จบขบวน) — ตู้สุดท้ายจะต้องชี้ข้อต่อ next ไปหาความว่างเปล่า เพื่อบอกว่าสิ้นสุดขบวนแล้ว",
          ],
        },

        { t: "h2", c: "3. [Workshop] ลองสร้างรถไฟแบบจับมือทำ (Absolute Zero)" },
        {
          t: "p",
          c: "เรามาสวมบทเป็นวิศวกรสร้างรถไฟ 2 ตู้ใน Python กันดูครับ ลืมอัลกอริทึมซับซ้อนไปก่อนเลย!",
        },
        {
          t: "p",
          c: "ขั้นที่ 1: สร้างโรงงานผลิตตู้รถไฟ (พิมพ์เขียว) — คอมพิวเตอร์ไม่รู้จักตู้รถไฟ เราต้องสร้าง Class ขึ้นมาสอนมันก่อน:",
        },
        {
          t: "code",
          lang: "python",
          label: "พิมพ์เขียว ListNode",
          c: `class ListNode:
    def __init__(self, value=0, next=None):
        self.val = value     # เก็บของลงกล่อง
        self.next = next     # โซ่ชี้ไปตู้ถัดไป (ตอนเพิ่งสร้างเสร็จยังไม่เกี่ยวใคร = None)`,
        },
        {
          t: "p",
          c: "ขั้นที่ 2: ผลิตตู้รถไฟออกมา 2 ตู้ — สั่งผลิตตู้แรกใส่เลข 10 ตู้สองใส่เลข 20 (ตอนนี้รถไฟยังจอดแยกกันอยู่ ไม่มีใครรู้จักใคร)",
        },
        {
          t: "code",
          lang: "python",
          c: `nodeA = ListNode(10)
nodeB = ListNode(20)`,
        },
        {
          t: "p",
          c: "ขั้นที่ 3: เอาโซ่คล้องตู้เข้าด้วยกัน! — ไฮไลต์อยู่ตรงนี้ครับ เราจะเอาโซ่ของตู้ A (nodeA.next) ไปเกี่ยวเข้ากับตู้ B (nodeB)",
        },
        {
          t: "code",
          lang: "python",
          c: `nodeA.next = nodeB
# เย้! ตอนนี้มันกลายเป็น Linked List แล้ว: [10] -> [20] -> None`,
        },
        {
          t: "p",
          c: "ขั้นที่ 4: ลองพิสูจน์ดูสิว่ามันเชื่อมกันจริงไหม?",
        },
        {
          t: "codeout",
          lang: "python",
          label: "พิสูจน์ว่าโซ่เกี่ยวกันจริง",
          code: `class ListNode:
    def __init__(self, value=0, next=None):
        self.val = value
        self.next = next

nodeA = ListNode(10)
nodeB = ListNode(20)
nodeA.next = nodeB

print(nodeA.val)          # ของในตู้ A
print(nodeA.next.val)     # ยืนอยู่ตู้ A -> เดินตามโซ่ไปตู้ถัดไป -> เปิดกล่องดูของ`,
          out: `10
20`,
        },
        {
          t: "callout",
          title: "คำเตือนที่ต้องจำให้ขึ้นใจ",
          warn: true,
          c: "หากเราเผลอเรียก .next หรือ .val จากโหนดที่เป็น None เช่น curr = None แล้วไปสั่ง curr.next — Python จะฟ้อง Error ทันที: AttributeError: 'NoneType' object has no attribute 'next' (นี่คือสาเหตุที่คนส่งโจทย์ไม่ผ่านบ่อยที่สุด)",
        },

        { t: "h2", c: "4. ท่ามาตรฐาน: วิธีเดินตรวจขบวนรถไฟ (Traversal)" },
        {
          t: "p",
          c: "ใน LeetCode คุณจะไม่ได้มีรถไฟแค่ 2 ตู้ แต่มาเป็นสิบเป็นร้อยตู้ ท่ามาตรฐานที่คุณต้องพิมพ์ให้ชินมือคือ การใช้ while loop เดินตรวจรถไฟตั้งแต่หัวยันท้ายขบวน ครับ",
        },
        {
          t: "p",
          c: "สมมติเรามีขบวน head = [10] -> [20] -> [30]",
        },
        {
          t: "codeout",
          lang: "python",
          label: "Traversal — เดินตรวจขบวนตั้งแต่หัวยันท้าย",
          code: `class ListNode:
    def __init__(self, value=0, next=None):
        self.val = value
        self.next = next

# สร้างขบวน [10] -> [20] -> [30]
head = ListNode(10)
head.next = ListNode(20)
head.next.next = ListNode(30)

curr = head           # 1. ตั้งชื่อตัวแทนเดินตรวจว่า curr เริ่มยืนที่หัวขบวน

while curr:           # 2. ตราบใดที่ curr ยังยืนอยู่บนตู้ (ยังไม่ตกขบวนไปเจอ None)
    print(curr.val)   # 3. ดูว่าตู้ที่ยืนอยู่มีของอะไร
    curr = curr.next  # 4. เดินก้าวไปตู้ถัดไปตามโซ่! (ขาดบรรทัดนี้ลูปจะค้าง)`,
          out: `10
20
30`,
        },

        { t: "h2", c: '5. สัญญาณเตือนว่าโจทย์ข้อนี้ "เล่นกับ Linked List"' },
        {
          t: "p",
          c: "เวลาทำ LeetCode ถ้าฟังก์ชันรับค่าตัวแปรประเภท ListNode เข้ามา เตรียมงัดแพทเทิร์นยอดฮิตเหล่านี้มาใช้ได้เลย:",
        },
        {
          t: "ul",
          c: [
            'การเดิน 2 จังหวะ (Fast & Slow Pointers) — ให้คนนึงเดินทีละก้าว อีกคนวิ่งทีละ 2 ก้าว เอาไว้หา "จุดกึ่งกลางขบวน" หรือจับผิดว่า "รถไฟวิ่งวนเป็นวงกลมไหม"',
            "การสลับสาย (Reverse) — สั่งให้หันข้อต่อโซ่กลับหลังหันทั้งขบวน (เช่น จาก 1→2→3 เปลี่ยนเป็น 3→2→1)",
            "การเย็บผ้า (Merge) — เอาขบวนรถไฟ 2 ขบวนมารูดซิปสลับตู้กันให้กลายเป็นขบวนเดียว",
          ],
        },
        {
          t: "callout",
          title: "ประโยคท่องจำก่อนลุยโจทย์",
          c: "ระวัง Head หาย! ก่อนจะเปลี่ยนโซ่ไปเกี่ยวตู้ใหม่ ต้องแน่ใจเสมอว่าเราไม่ได้ทิ้งตู้เก่าให้ลอยเคว้งกลางอวกาศ",
        },

        {
          t: "p",
          c: "พื้นฐานแน่นแล้ว! ต่อไปคือ 5 เทคนิคที่โจทย์ Linked List ใน LeetCode เกือบ 90% ใช้ผสมผสานกัน — อ่านต่อให้จบ แล้วพร้อมลุยได้เลยครับ",
        },

        { t: "h2", c: "6. 5 เทคนิคระดับเทวดา (Must-Know Patterns for LeetCode)" },

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
          c: "การเปลี่ยนทิศทางจาก 1 → 2 → 3 ให้กลายเป็น 3 → 2 → 1 โดยไม่สร้างโหนดใหม่ — ใช้ตัวแปร 3 ตัวควบคุมการหมุนข้อต่อ:",
        },
        {
          t: "image",
          src: "/leetcode-75/linked-list-reverse.gif",
          alt: "Linked list reverse: rewire next with prev/cur pointers",
          caption:
            "In-place reverse: เก็บ next ไว้ก่อน → หักข้อต่อชี้กลับ prev → เลื่อน prev/cur ไปข้างหน้า",
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
          c: "เวลาต้องการลบโหนด B ออกจากขบวน A → B → C — เราไม่ต้องลบ B ทิ้งจริง ๆ ในหน่วยความจำ แค่สั่งให้ A ข้ามไปชี้ C แทน:",
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

        { t: "h2", c: "7. ตะลุยโจทย์จริง: LC206 — Reverse Linked List" },
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
            "list ตอนนี้",
          ],
          rows: [
            ["เริ่ม", "None", "1", "—", "—", "1 → 2 → 3"],
            ["1", "1", "2", "2", "1.next = None", "None ← 1  |  2 → 3"],
            ["2", "2", "3", "3", "2.next = 1", "None ← 1 ← 2  |  3"],
            ["3", "3", "None", "None", "3.next = 2", "None ← 1 ← 2 ← 3"],
            ["จบ", "3 = head ใหม่", "None", "—", "—", "3 → 2 → 1"],
          ],
        },
        {
          t: "p",
          c: "สัญลักษณ์ | แยกสองชิ้น: ซ้าย = ส่วนที่พลิกแล้ว · ขวา = ส่วนที่ยังไม่แตะ พอลูปจบ curr เป็น None แล้วคืน prev (= โหนด 3) เป็น Head ใหม่ ได้ 3 → 2 → 1 — O(N) Time / O(1) Space!",
        },

        { t: "h2", c: "8. Checklist เช็คโค้ดก่อนกด Submit" },
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
    title: { th: "ข้อ 29 · LC2095 Delete the Middle Node of a Linked List (ลบโหนดกลาง) 🟡", en: "LC2095 Delete the Middle Node of a Linked List 🟡" },
    lead: {
      th: "โจทย์ Fast & Slow — หาตู้กลางของขบวนในรอบเดียว แล้วปลดโซ่ให้กระโดดข้ามมันทิ้ง",
      en: "Fast & Slow — find the middle car in one pass, then unlink it.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `กำหนด head ของ linked list มาให้ ให้ลบ middle node ออก แล้ว return head ของ linked list ที่แก้ไขแล้ว

middle node ของ linked list ขนาด n คือ node ลำดับที่ ⌊n / 2⌋ นับจากจุดเริ่มต้นแบบ 0-based indexing โดย ⌊x⌋ หมายถึงจำนวนเต็มที่มากที่สุดที่น้อยกว่าหรือเท่ากับ x

- สำหรับ n = 1, 2, 3, 4 และ 5 middle node อยู่ที่ index 0, 1, 1, 2 และ 2 ตามลำดับ`,
        },
        {
          t: "example",
          c: [
            {
              input: "head = [1,3,4,7,1,2,6]",
              output: "[1,3,4,1,2,6]",
              explain: `Explanation:
รูปด้านบนคือ linked list ที่ให้มา ดัชนีของแต่ละ node เขียนไว้ด้านล่าง
เนื่องจาก n = 7 node ที่ index 3 ค่า 7 คือ middle node (ทำเครื่องหมายสีแดง)
เรา return list ใหม่หลังลบ node นี้ออก`,
            },
            {
              input: "head = [1,2,3,4]",
              output: "[1,2,4]",
              explain: `Explanation:
รูปด้านบนคือ linked list ที่ให้มา
สำหรับ n = 4 node ที่ index 2 ค่า 3 คือ middle node (ทำเครื่องหมายสีแดง)`,
            },
            {
              input: "head = [2,1]",
              output: "[2]",
              explain: `Explanation:
รูปด้านบนคือ linked list ที่ให้มา
สำหรับ n = 2 node ที่ index 1 ค่า 1 คือ middle node (ทำเครื่องหมายสีแดง)
เหลือแค่ node ที่ index 0 ค่า 2 หลังลบ node ที่ 1 ออก`,
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน node ใน list อยู่ในช่วง [1, 10^5]",
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
              head: [
                "รอบ",
                "prev (ค่า)",
                "slow (ค่า)",
                "fast (ค่า)",
                "หมายเหตุ",
                "list ตอนนี้",
              ],
              rows: [
                [
                  "ก่อนลูป",
                  "None",
                  "1",
                  "1",
                  "fast.next มี → เข้าลูป",
                  "1 → 3 → 4 → 7 → 1 → 2 → 6",
                ],
                [
                  "รอบ 1",
                  "1",
                  "3",
                  "4",
                  "fast.next มี",
                  "1  |  3 → 4 → 7 → 1 → 2 → 6",
                ],
                [
                  "รอบ 2",
                  "3",
                  "4",
                  "1",
                  "fast.next มี",
                  "1 → 3  |  4 → 7 → 1 → 2 → 6",
                ],
                [
                  "รอบ 3",
                  "4",
                  "7",
                  "6",
                  "fast.next ไม่มี → หยุด",
                  "1 → 3 → 4  |  7 → 1 → 2 → 6",
                ],
                [
                  "หลังลูป",
                  "4",
                  "7 (ตัวกลาง)",
                  "6",
                  "ปลดโซ่: 4.next ชี้ไป 1 (ข้าม 7)",
                  "1 → 3 → 4 → 1 → 2 → 6",
                ],
              ],
            },
            {
              t: "p",
              c: "สัญลักษณ์ | แยกสองชิ้น: ซ้าย = ถึง prev · ขวา = slow เป็นหัว (ตัวที่จะลบอยู่หัวขวา) — จบเกมได้ขบวน [1, 3, 4, 1, 2, 6]",
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
      en: [
        {
          t: "p",
          c: `You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.

The middle node of a linked list of size n is the ⌊n / 2⌋ᵗʰ node from the start using 0-based indexing, where ⌊x⌋ denotes the largest integer less than or equal to x.

- For n = 1, 2, 3, 4, and 5, the middle nodes are 0, 1, 1, 2, and 2, respectively.`,
        },
        {
          t: "example",
          c: [
            {
              input: "head = [1,3,4,7,1,2,6]",
              output: "[1,3,4,1,2,6]",
              explain: `Explanation:
The figure above represents the given linked list. The indices of the nodes are written below.
Since n = 7, node 3 with value 7 is the middle node, which is marked in red.
We return the new list after removing this node.`,
            },
            {
              input: "head = [1,2,3,4]",
              output: "[1,2,4]",
              explain: `Explanation:
The figure above represents the given linked list.
For n = 4, node 2 with value 3 is the middle node, which is marked in red.`,
            },
            {
              input: "head = [2,1]",
              output: "[2]",
              explain: `Explanation:
The figure above represents the given linked list.
For n = 2, node 1 with value 1 is the middle node, which is marked in red.
Node 0 with value 2 is the only node remaining after removing node 1.`,
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes in the list is in the range [1, 10^5].",
            "1 <= Node.val <= 10^5",
          ],
        },

        {
          t: "solution",
          summary: "Full solution · Try yourself first",
          c: [
            {
              t: "p",
              c: 'This matches the section signal: "Two-speed walk (Fast & Slow Pointers)" — find the middle car, then unlink it.',
            },

            { t: "h3", c: "1. Mindset Shift" },
            {
              t: "p",
              c: "The naive way is one pass to count n, then a second pass to stop at ⌊n/2⌋ and unlink — correct, but two traversals.",
            },
            {
              t: "p",
              c: "Key insight: Fast & Slow — slow moves 1, fast moves 2. When fast reaches the end, slow sits on the middle. One pass!",
            },
            {
              t: "p",
              c: "Knowing the middle isn’t enough to delete — you need prev (the node before) so you can do prev.next = slow.next and skip the middle.",
            },

            { t: "h3", c: "2. The Logic — 4 Steps" },
            {
              t: "p",
              c: "Open three pointers, then walk until fast runs out:",
            },
            {
              t: "ol",
              c: [
                "Edge case — if the list has one node (head.next is None), deleting it leaves empty → return None",
                "Prep pointers — prev = None · slow = head · fast = head",
                "Walk together — while fast and fast.next: prev = slow, then slow += 1, fast += 2",
                "Unlink — prev.next = slow.next, then return head",
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
              c: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Step 1: single node → empty list
        if head.next is None:
            return None

        prev = None                 # node before the middle
        slow = head                 # moves 1 → ends on middle
        fast = head                 # moves 2

        # Step 3: walk until fast runs out
        while fast and fast.next:
            prev = slow
            slow = slow.next        # slow +1
            fast = fast.next.next   # fast +2

        # Step 4: skip the middle
        prev.next = slow.next
        return head`,
            },

            { t: "h3", c: "4. Dry Run — 1 → 3 → 4 → 7 → 1 → 2 → 6" },
            {
              t: "table",
              head: [
                "Step",
                "prev (val)",
                "slow (val)",
                "fast (val)",
                "Note",
                "list now",
              ],
              rows: [
                [
                  "Before loop",
                  "None",
                  "1",
                  "1",
                  "fast.next exists → enter loop",
                  "1 → 3 → 4 → 7 → 1 → 2 → 6",
                ],
                [
                  "Round 1",
                  "1",
                  "3",
                  "4",
                  "fast.next exists",
                  "1  |  3 → 4 → 7 → 1 → 2 → 6",
                ],
                [
                  "Round 2",
                  "3",
                  "4",
                  "1",
                  "fast.next exists",
                  "1 → 3  |  4 → 7 → 1 → 2 → 6",
                ],
                [
                  "Round 3",
                  "4",
                  "7",
                  "6",
                  "fast.next gone → stop",
                  "1 → 3 → 4  |  7 → 1 → 2 → 6",
                ],
                [
                  "After loop",
                  "4",
                  "7 (middle)",
                  "6",
                  "Unlink: 4.next → 1 (skip 7)",
                  "1 → 3 → 4 → 1 → 2 → 6",
                ],
              ],
            },
            {
              t: "p",
              c: "The | mark splits two pieces: left = up through prev · right = slow as head (the node to delete is at the right head) — final train [1, 3, 4, 1, 2, 6]",
            },

            { t: "h3", c: "5. Edge Cases & Pitfalls" },
            {
              t: "p",
              c: 'The "single node" case — if you skip the guard:',
            },
            {
              t: "ul",
              c: [
                "The loop never runs (fast.next is None from the start)",
                "prev is still None → prev.next crashes (AttributeError)",
              ],
            },
            {
              t: "callout",
              title: "while condition",
              warn: true,
              c: "Write while fast and fast.next — if you only write while fast, fast.next.next blows up when fast lands past the end on None.",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — one pass through the list",
                "Space O(1) — a few pointers, no new list",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "Fast & Slow finds the middle in one pass, and deleting/editing a linked-list node always needs a pointer to the previous node — both ideas show up again and again.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p30": {
    slug: "lc75-p30",
    title: { th: "ข้อ 30 · LC328 Odd Even Linked List (จัดโหนดคี่-คู่) 🟡", en: "LC328 Odd Even Linked List 🟡" },
    lead: {
      th: "โจทย์เย็บผ้า — แยกขบวนเป็นสายคี่กับสายคู่ แล้วต่อหางคี่เข้าหัวคู่ โดยไม่สร้างตู้ใหม่",
      en: "Relink in place — split into odd and even chains, then join odd’s tail to even’s head.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `กำหนด head ของ singly linked list มาให้ ให้ group node ที่มี odd indices ไว้ด้วยกัน ตามด้วย node ที่มี even indices แล้ว return list ที่จัดลำดับใหม่แล้ว

node ตัวแรกถือว่าเป็น odd และตัวที่สองถือว่าเป็น even ไล่ไปเรื่อย ๆ

หมายเหตุว่า relative order ภายในกลุ่ม even และกลุ่ม odd ต้องคงเดิมเหมือนใน input

คุณต้องแก้ปัญหาด้วย O(1) extra space complexity และ O(n) time complexity`,
        },
        {
          t: "example",
          c: [
            {
              input: "head = [1,2,3,4,5]",
              output: "[1,3,5,2,4]",
            },
            {
              input: "head = [2,1,3,5,6,4,7]",
              output: "[2,3,6,7,1,5,4]",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน node ใน linked list อยู่ในช่วง [0, 10^4]",
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
              head: ["รอบ", "odd (ค่า)", "even (ค่า)", "หมายเหตุ", "list ตอนนี้"],
              rows: [
                ["ก่อนลูป", "1", "2", "ยังไม่เย็บ", "1 → 2 → 3 → 4 → 5"],
                [
                  "รอบ 1",
                  "3",
                  "4",
                  "คี่ข้ามไป 3 · คู่ข้ามไป 4",
                  "คี่: 1 → 3 → 4 → 5  |  คู่: 2 → 4 → 5",
                ],
                [
                  "รอบ 2",
                  "5",
                  "None",
                  "คี่ข้ามไป 5 · คู่หมดทาง → หยุด",
                  "คี่: 1 → 3 → 5  |  คู่: 2 → 4",
                ],
                [
                  "หลังลูป",
                  "5",
                  "—",
                  "odd.next = even_head",
                  "1 → 3 → 5 → 2 → 4",
                ],
              ],
            },
            {
              t: "p",
              c: "สัญลักษณ์ | แยกสองชิ้น: ซ้าย = สายคี่ที่เย็บได้ · ขวา = สายคู่ที่เย็บได้ — จบเกมได้ขบวน [1, 3, 5, 2, 4]",
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
      en: [
        {
          t: "p",
          c: `Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The first node is considered odd, and the second node is even, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in O(1) extra space complexity and O(n) time complexity.`,
        },
        {
          t: "example",
          c: [
            {
              input: "head = [1,2,3,4,5]",
              output: "[1,3,5,2,4]",
            },
            {
              input: "head = [2,1,3,5,6,4,7]",
              output: "[2,3,6,7,1,5,4]",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes in the linked list is in the range [0, 10^4].",
            "-10^6 <= Node.val <= 10^6",
          ],
        },

        {
          t: "solution",
          summary: "Full solution · Try yourself first",
          c: [
            {
              t: "p",
              c: 'This matches the "stitching (Merge)" signal — but here we split the same list into two chains, then join them back, without allocating new nodes (Space O(1)).',
            },

            { t: "h3", c: "1. Mindset Shift" },
            {
              t: "p",
              c: "The naive way is to collect odd-index values in one list and even-index values in another, then concatenate — but that uses Space O(n) and breaks the constraint!",
            },
            {
              t: "p",
              c: "Key insight: don’t build new nodes — use two pointers odd and even to rewire next links, forming two sub-chains, then attach the odd chain’s tail to the even chain’s head.",
            },

            { t: "h3", c: "2. The Logic — 4 Steps" },
            {
              t: "p",
              c: "Open two chains, then stitch until done:",
            },
            {
              t: "ol",
              c: [
                "Edge case — empty or single node → return head",
                "Prep chains — odd at first · even at second · even_head remembers the even head (critical!)",
                "Stitch — while even and even.next: odd jumps to the next odd, then even jumps to the next even",
                "Join — odd.next = even_head, then return head",
              ],
            },

            { t: "h3", c: "3. LeetCode-Ready Code" },
            {
              t: "p",
              c: "Turn the two-chain rules into code:",
            },
            {
              t: "code",
              lang: "python",
              label: "Submit this on LeetCode",
              c: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Step 1: 0 or 1 node — nothing to do
        if head is None or head.next is None:
            return head

        odd = head                  # odd-position pointer
        even = head.next            # even-position pointer
        even_head = even            # remember even head for the final join

        # Step 3: stitch until even runs out
        while even and even.next:
            odd.next = even.next    # odd jumps to next odd
            odd = odd.next
            even.next = odd.next    # even jumps to next even
            even = even.next

        # Step 4: join odd tail to even head
        odd.next = even_head
        return head`,
            },

            { t: "h3", c: "4. Dry Run — 1 → 2 → 3 → 4 → 5" },
            {
              t: "p",
              c: "even_head is saved at value 2 from the start",
            },
            {
              t: "table",
              head: ["Step", "odd (val)", "even (val)", "Note", "list now"],
              rows: [
                ["Before loop", "1", "2", "not stitched yet", "1 → 2 → 3 → 4 → 5"],
                [
                  "Round 1",
                  "3",
                  "4",
                  "odd → 3 · even → 4",
                  "odd: 1 → 3 → 4 → 5  |  even: 2 → 4 → 5",
                ],
                [
                  "Round 2",
                  "5",
                  "None",
                  "odd → 5 · even done → stop",
                  "odd: 1 → 3 → 5  |  even: 2 → 4",
                ],
                [
                  "After loop",
                  "5",
                  "—",
                  "odd.next = even_head",
                  "1 → 3 → 5 → 2 → 4",
                ],
              ],
            },
            {
              t: "p",
              c: "The | mark splits two pieces: left = odd chain so far · right = even chain so far — final train [1, 3, 5, 2, 4]",
            },

            { t: "h3", c: "5. Edge Cases & Pitfalls" },
            {
              t: "p",
              c: 'The "forgot even_head" case — the #1 mistake on this problem:',
            },
            {
              t: "ul",
              c: [
                "During the loop the even pointer keeps moving forward",
                "If you didn’t save the head earlier, you won’t know where the odd tail should attach",
              ],
            },
            {
              t: "callout",
              title: "The four lines inside the loop can’t be reordered",
              warn: true,
              c: "You must advance odd first before reading odd.next for the next even — swap the order and the links point at the wrong nodes!",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — one pass through every node",
                "Space O(1) — only rewiring links, no new list",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "Splitting one list into several chains by rewiring next pointers in place, then joining them back, is a very space-cheap pattern — the key is always remembering the head of any chain you’ll attach later.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p31": {
    slug: "lc75-p31",
    title: { th: "ข้อ 31 · LC206 Reverse Linked List (กลับ Linked List) 🟢", en: "LC206 Reverse Linked List 🟢" },
    lead: {
      th: "โจทย์สลับสาย — หันข้อต่อโซ่กลับหลังหันทั้งขบวน ด้วย prev / cur / nxt",
      en: "In-place reverse — flip every next pointer with prev / cur / nxt.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "กำหนด head ของ singly linked list มาให้ ให้ reverse list แล้ว return list ที่ reverse แล้ว",
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
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน node ใน list อยู่ในช่วง [0, 5000]",
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
              head: [
                "รอบ",
                "cur (ค่า)",
                "nxt (จำไว้)",
                "หลังพลิก cur.next ชี้ไป",
                "prev หลังรอบนี้",
                "list ตอนนี้",
              ],
              rows: [
                ["ก่อนลูป", "1", "—", "—", "None", "1 → 2 → 3"],
                ["รอบ 1", "1", "2", "None", "1", "None ← 1  |  2 → 3"],
                ["รอบ 2", "2", "3", "1", "2", "None ← 1 ← 2  |  3"],
                ["รอบ 3", "3", "None", "2", "3", "None ← 1 ← 2 ← 3"],
                ["หลังลูป", "None → หยุด", "—", "—", "3 = head ใหม่", "3 → 2 → 1"],
              ],
            },
            {
              t: "p",
              c: "สัญลักษณ์ | แยกสองชิ้น: ซ้าย = ส่วนที่พลิกแล้ว · ขวา = ส่วนที่ยังไม่แตะ — จบเกมได้ขบวน [3, 2, 1]",
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
      en: [
        {
          t: "p",
          c: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
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
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes in the list is the range [0, 5000].",
            "-5000 <= Node.val <= 5000",
          ],
        },

        {
          t: "solution",
          summary: "Full solution · Try yourself first",
          c: [
            {
              t: "p",
              c: 'This matches the "reverse the chain" signal — and the mantra: "Before you flip a link, make sure you haven’t stranded the rest of the train!"',
            },

            { t: "h3", c: "1. Mindset Shift" },
            {
              t: "p",
              c: "The naive way is to copy every value into a list, reverse it, and build a new linked list — correct, but Space O(n).",
            },
            {
              t: "p",
              c: "Key insight: don’t move the cargo — just walk and flip each next pointer to point backward in place, using prev and cur.",
            },
            {
              t: "p",
              c: "Picture crossing a bridge and folding the planks behind you — you must know where the next step lands before you fold!",
            },

            { t: "h3", c: "2. The Logic — 4 Steps" },
            {
              t: "p",
              c: "Open prev/cur, then flip one node at a time:",
            },
            {
              t: "ol",
              c: [
                "Prep pointers — prev = None · cur = head",
                "Save the path — nxt = cur.next (don’t lose the train!)",
                "Flip the link — cur.next = prev, then advance prev to cur · cur to nxt",
                "Done — when cur is None, prev is the new head → return prev",
              ],
            },

            { t: "h3", c: "3. LeetCode-Ready Code" },
            {
              t: "p",
              c: "Memorize the four lines in the loop — this move shows up in many problems:",
            },
            {
              t: "code",
              lang: "python",
              label: "Submit this on LeetCode",
              c: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None                 # behind cur (nothing yet)
        cur = head                  # node under consideration

        while cur:
            nxt = cur.next          # 1) save next (don’t lose the train)
            cur.next = prev         # 2) flip the link backward
            prev = cur              # 3) advance prev
            cur = nxt               # 4) advance cur to the saved node

        return prev                 # after the loop, prev is the new head`,
            },

            { t: "h3", c: "4. Dry Run — 1 → 2 → 3" },
            {
              t: "table",
              head: [
                "Step",
                "cur (val)",
                "nxt (saved)",
                "after flip cur.next →",
                "prev after step",
                "list now",
              ],
              rows: [
                ["Before loop", "1", "—", "—", "None", "1 → 2 → 3"],
                ["Round 1", "1", "2", "None", "1", "None ← 1  |  2 → 3"],
                ["Round 2", "2", "3", "1", "2", "None ← 1 ← 2  |  3"],
                ["Round 3", "3", "None", "2", "3", "None ← 1 ← 2 ← 3"],
                ["After loop", "None → stop", "—", "—", "3 = new head", "3 → 2 → 1"],
              ],
            },
            {
              t: "p",
              c: "The | mark splits two pieces: left = already flipped · right = not touched yet — final train [3, 2, 1]",
            },

            { t: "h3", c: "5. Edge Cases & Pitfalls" },
            {
              t: "p",
              c: 'The "forgot to save nxt first" case — classic trap:',
            },
            {
              t: "ul",
              c: [
                "The moment you set cur.next = prev, the old forward link is gone",
                "You can’t walk onward — always do nxt = cur.next first",
              ],
            },
            {
              t: "callout",
              title: "What do you return?",
              warn: true,
              c: "Return prev, not cur — at the end cur is None (past the end), while prev sits on the last flipped node, which is the new head.",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — one pass through every node",
                "Space O(1) — a few pointers, no new list",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "The four-line prev/cur/nxt reverse is the standard move to memorize — problem 32 reuses it to reverse only part of the list.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p32": {
    slug: "lc75-p32",
    title: { th: "ข้อ 32 · LC2130 Maximum Twin Sum of a Linked List (ผลรวมคู่แฝดมากสุด) 🟡", en: "LC2130 Maximum Twin Sum of a Linked List 🟡" },
    lead: {
      th: "ประกอบสามท่า: Fast & Slow หากลาง → Reverse ครึ่งหลัง → เดินสองสายบวกทีละคู่",
      en: "Compose three moves: Fast & Slow to the middle → reverse the second half → walk both halves and track the max twin sum.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `ใน linked list ขนาด n ที่ n เป็นเลขคู่ (even) node ลำดับที่ i (0-indexed) เรียกว่า twin ของ node ลำดับที่ (n-1-i) เมื่อ 0 <= i <= (n / 2) - 1

- ตัวอย่างเช่น ถ้า n = 4 แล้ว node 0 คือ twin ของ node 3 และ node 1 คือ twin ของ node 2 นี่คือโหนดเดียวที่มี twin สำหรับ n = 4

twin sum นิยามว่าคือผลรวมของค่า node หนึ่งกับ twin ของมัน

กำหนด head ของ linked list ที่มีความยาวเป็นเลขคู่มาให้ ให้ return ค่า maximum twin sum ของ linked list`,
        },
        {
          t: "example",
          c: [
            {
              input: "head = [5,4,2,1]",
              output: "6",
              explain: `Explanation:
node 0 และ 1 คือ twin ของ node 3 และ 2 ตามลำดับ ทุกคู่ได้ twin sum = 6
ไม่มี node อื่นที่มี twin ใน linked list นี้อีก
ดังนั้น maximum twin sum ของ linked list คือ 6`,
            },
            {
              input: "head = [4,2,2,3]",
              output: "7",
              explain: `Explanation:
node ที่มี twin ใน linked list นี้คือ:
- Node 0 คือ twin ของ node 3 ได้ twin sum = 4 + 3 = 7
- Node 1 คือ twin ของ node 2 ได้ twin sum = 2 + 2 = 4
ดังนั้น maximum twin sum คือ max(7, 4) = 7`,
            },
            {
              input: "head = [1,100000]",
              output: "100001",
              explain: `Explanation:
มีแค่คู่ twin เดียวใน linked list ได้ twin sum = 1 + 100000 = 100001`,
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน node ใน list เป็นเลขคู่เสมอ อยู่ในช่วง [2, 10^5]",
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
              head: ["ขั้นตอน", "สถานะ", "ผลลัพธ์", "list ตอนนี้"],
              rows: [
                ["ก่อนเริ่ม", "—", "—", "5 → 4 → 2 → 1"],
                [
                  "หา middle",
                  "fast เดินจนตกขอบ · slow หยุดที่ 2",
                  "slow = หัวครึ่งหลัง",
                  "5 → 4  |  2 → 1",
                ],
                [
                  "reverse รอบ 1",
                  "cur=2 · พลิก next → None",
                  "prev=2",
                  "5 → 4  |  None ← 2  |  1",
                ],
                [
                  "reverse รอบ 2",
                  "cur=1 · พลิก next → 2",
                  "prev=1 = หัวใหม่",
                  "5 → 4  |  1 → 2",
                ],
                [
                  "บวกคู่ที่ 1",
                  "first=5 · second=1",
                  "5+1 = 6 · best = 6",
                  "5 → 4  |  1 → 2",
                ],
                [
                  "บวกคู่ที่ 2",
                  "first=4 · second=2",
                  "4+2 = 6 · best = 6",
                  "4  |  2",
                ],
                ["จบ", "second เป็น None", "คืน best = 6", "คำตอบ = 6"],
              ],
            },
            {
              t: "p",
              c: "สัญลักษณ์ | แยกชิ้น: ซ้าย = ครึ่งหน้า · ขวา = ครึ่งหลัง (ที่กำลังพลิก/เดินบวก) — จบเกมได้คำตอบ 6",
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
      en: [
        {
          t: "p",
          c: `In a linked list of size n, where n is even, the iᵗʰ node (0-indexed) of the linked list is known as the twin of the (n-1-i)ᵗʰ node, if 0 <= i <= (n / 2) - 1.

- For example, if n = 4, then node 0 is the twin of node 3, and node 1 is the twin of node 2. These are the only nodes with twins for n = 4.

The twin sum is defined as the sum of a node and its twin.

Given the head of a linked list with even length, return the maximum twin sum of the linked list.`,
        },
        {
          t: "example",
          c: [
            {
              input: "head = [5,4,2,1]",
              output: "6",
              explain: `Explanation:
Nodes 0 and 1 are the twins of nodes 3 and 2, respectively. All have twin sum = 6.
There are no other nodes with twins in the linked list.
Thus, the maximum twin sum of the linked list is 6.`,
            },
            {
              input: "head = [4,2,2,3]",
              output: "7",
              explain: `Explanation:
The nodes with twins present in this linked list are:
- Node 0 is the twin of node 3 having a twin sum of 4 + 3 = 7.
- Node 1 is the twin of node 2 having a twin sum of 2 + 2 = 4.
Thus, the maximum twin sum of the linked list is max(7, 4) = 7.`,
            },
            {
              input: "head = [1,100000]",
              output: "100001",
              explain: `Explanation:
There is only one node with a twin in the linked list having twin sum of 1 + 100000 = 100001.`,
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes in the list is an even integer in the range [2, 10^5].",
            "1 <= Node.val <= 10^5",
          ],
        },

        {
          t: "solution",
          summary: "Full solution · Try yourself first",
          c: [
            {
              t: "p",
              c: "This is the boss fight of the section — compose three moves from earlier problems: Fast & Slow (p29) + Reverse (p31) + walk two chains.",
            },

            { t: "h3", c: "1. Mindset Shift" },
            {
              t: "p",
              c: "The hard part: a linked list can’t walk backward — adding a front node to its twin at the back is awkward.",
            },
            {
              t: "p",
              c: "Key insight: find the middle with Fast & Slow → reverse the second half so it faces the same way as the first → walk from both ends and track the max twin sum.",
            },
            {
              t: "p",
              c: "The easy way is dump every value into a list and add vals[i] + vals[n-1-i] — correct but Space O(n). This approach stays in-place at Space O(1).",
            },

            { t: "h3", c: "2. The Logic — 3 Steps" },
            {
              t: "p",
              c: "Split the work into three clear stages:",
            },
            {
              t: "ol",
              c: [
                "Find middle — Fast & Slow walk; when fast falls off, slow sits at the head of the second half (n is always even)",
                "Reverse second half — reuse the p31 flip from slow; prev becomes the new head (the old last node moves to the front)",
                "Pair and add — first at head · second at prev; walk together; first.val + second.val is one twin sum; keep the max",
              ],
            },

            { t: "h3", c: "3. LeetCode-Ready Code" },
            {
              t: "p",
              c: "Three stages lined up in one function:",
            },
            {
              t: "code",
              lang: "python",
              label: "Submit this on LeetCode",
              c: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        # Stage 1: find middle with Fast & Slow
        slow = head
        fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        # slow is now the head of the second half

        # Stage 2: reverse the second half (p31 move)
        prev = None
        cur = slow
        while cur:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
        # prev is the head of the reversed second half

        # Stage 3: walk both halves, track max twin sum
        best = 0
        first = head
        second = prev
        while second:               # halves are the same length
            best = max(best, first.val + second.val)
            first = first.next
            second = second.next
        return best`,
            },

            { t: "h3", c: "4. Dry Run — 5 → 4 → 2 → 1" },
            {
              t: "table",
              head: ["Stage", "State", "Result", "list now"],
              rows: [
                ["Start", "—", "—", "5 → 4 → 2 → 1"],
                [
                  "Find middle",
                  "fast falls off · slow stops at 2",
                  "slow = second-half head",
                  "5 → 4  |  2 → 1",
                ],
                [
                  "Reverse round 1",
                  "cur=2 · flip next → None",
                  "prev=2",
                  "5 → 4  |  None ← 2  |  1",
                ],
                [
                  "Reverse round 2",
                  "cur=1 · flip next → 2",
                  "prev=1 = new head",
                  "5 → 4  |  1 → 2",
                ],
                [
                  "Pair 1",
                  "first=5 · second=1",
                  "5+1 = 6 · best = 6",
                  "5 → 4  |  1 → 2",
                ],
                [
                  "Pair 2",
                  "first=4 · second=2",
                  "4+2 = 6 · best = 6",
                  "4  |  2",
                ],
                ["Done", "second is None", "return best = 6", "answer = 6"],
              ],
            },
            {
              t: "p",
              c: "The | mark splits pieces: left = first half · right = second half (being reversed / paired) — final answer 6",
            },

            { t: "h3", c: "5. Edge Cases & Pitfalls" },
            {
              t: "p",
              c: 'The "crossed link at the midpoint" case:',
            },
            {
              t: "ul",
              c: [
                "After reversing the second half, the link at the midpoint may look a bit crossed",
                "It doesn’t matter — we only walk n/2 steps and stop when second is None",
              ],
            },
            {
              t: "callout",
              title: "Is best = 0 OK?",
              c: "Yes — this problem guarantees positive node values. If negatives were allowed, start from the first pair instead.",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — find middle + reverse second half + pair walk are all linear",
                "Space O(1) — rewire in place; no copy into a new list",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "Hard linked-list problems are often compositions of basic moves (find middle + reverse + walk two chains) — if each move is solid, assembling the puzzle gets much easier.",
            },
          ],
        },
      ],
    },
  },
};
