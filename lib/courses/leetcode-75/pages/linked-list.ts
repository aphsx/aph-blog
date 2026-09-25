import type { Page } from "@/lib/types";

export const linkedListPages: Record<string, Page> = {
  "lc75-intro-linked-list": {
    slug: "lc75-intro-linked-list",
    title: {
      th: "Linked List — จากศูนย์จนพร้อมลุย LeetCode",
      en: "Linked List — From Zero to LeetCode Ready",
    },
    lead: {
      th: "ทิ้งภาพโรงหนัง มาสร้างขบวนรถไฟ — ปูพื้นฐานจาก Absolute Zero ไล่ถึง 5 patterns ที่ใช้ลุยโจทย์ได้จริง",
      en: "Leave the cinema behind and build a train — fundamentals from absolute zero up to 5 battle-tested patterns.",
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
            "ข้อดี: ถ้าอยากเรียกคนนั่งเก้าอี้เบอร์ 5 ก็ชี้ตัวได้ทันที (arr[5] ในเวลา O(1))",
            'ข้อเสีย: ถ้ามีคนอยากมาแทรกตรงกลาง คุณต้องสั่งให้คนที่นั่งอยู่ "ขยับถอยไปทีละเก้าอี้" ทั้งแถว! วุ่นวายและช้า O(N)',
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
            ["การแทรกของตรงกลาง", "ช้า O(N) (ต้องขยับคนอื่นทั้งแถว)", "เร็วมาก O(1) (แค่ปลดโซ่แล้วเกี่ยวใหม่)"],
            ["การหาของตู้ที่ 5", "เร็วมาก O(1) (ชี้ตัวได้เลย)", "ช้า O(N) (ต้องเดินไล่ตั้งแต่หัวขบวน)"],
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
            "None (จบขบวน) — ตู้สุดท้ายจะต้องชี้ข้อต่อ next ไปหาความว่างเปล่า (None) เพื่อบอกว่าสิ้นสุดขบวนแล้ว",
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
    def __init__(self, val=0, next=None):
        self.val = val       # เก็บของลงกล่อง
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
    def __init__(self, val=0, next=None):
        self.val = val
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
          t: "codeout",
          lang: "python",
          label: "แม่แบบการเดินตรวจ Linked List",
          code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

nodeA = ListNode(10, ListNode(20))

curr = nodeA
while curr:
    print(curr.val, end=" -> ")
    curr = curr.next
print("None")`,
          out: `10 -> 20 -> None`,
        },

        { t: "h2", c: "5. อาวุธ 5 ท่าไม้ตายสำหรับแก้โจทย์ Linked List" },
        {
          t: "ol",
          c: [
            "Dummy Head (หัวขบวนหลอก) — สร้างโหนดเก๊ขึ้นมาอยู่หน้า head ตัวจริง เพื่อป้องกันบั๊กกรณีต้องลบหัวหรือเปลี่ยนหัว",
            "Fast & Slow Pointers (สองเข็มความเร็วต่างกัน) — slow เดินทีละ 1, fast เดินทีละ 2 พอ fast ถึงปลาย slow จะอยู่ที่จุดกึ่งกลางพอดี!",
            "In-Place Reversal (กลับทิศขบวนรถไฟ) — สลับทิศโซ่ให้ชี้กลับหลังจากขวามาซ้าย",
            "Pointer Cutting & Re-linking (การปลดโซ่แล้วเกี่ยวใหม่) — การข้ามโหนดเพื่อลบทิ้ง: `prev.next = curr.next`",
            "Boundary Check (ตรวจทางตัน) — เช็ค `while fast and fast.next:` เสมอเพื่อไม่ให้ชนขอบ None",
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "Many developers feel intimidated by Linked Lists because elements are not placed contiguously in memory like arrays. But once you internalize the mental model of train cars and chain links, manipulating pointers becomes an enjoyable and powerful skill.",
        },
        {
          t: "h2",
          c: "Part 1 · The Mental Model: Train Cars Instead of Cinema Seats",
        },
        {
          t: "p",
          c: "In an Array / Python list, items sit side-by-side in contiguous memory like numbered cinema seats: instant O(1) random lookup (`arr[i]`), but inserting in the middle requires shifting everyone (O(N)). In a Linked List, items (nodes) live scattered in memory, connected only by next pointers (chains). Inserting or deleting in the middle requires simply unlinking and re-linking pointers (O(1)), but finding the k-th node requires traversing from the head (O(N)).",
        },
        {
          t: "h2",
          c: "Part 2 · The Anatomy of a Node",
        },
        {
          t: "p",
          c: "Every `ListNode` holds two attributes: `val` (the payload) and `next` (a reference to the subsequent node, or `None` at the tail).",
        },
        {
          t: "h2",
          c: "Part 3 · 5 Core Patterns for Linked Lists",
        },
        {
          t: "ul",
          c: [
            "**Dummy Head:** Create a sentinel node before `head` to simplify edge cases where the head itself might be deleted or modified.",
            "**Fast & Slow Pointers:** Slow moves 1 step, Fast moves 2 steps. When Fast hits the end, Slow is exactly at the middle.",
            "**In-Place Reversal:** Reverse arrow directions using `prev`, `curr`, `nxt` without creating any new nodes.",
            "**Unlink & Bypass:** Delete a node by routing around it: `prev.next = curr.next`.",
            "**Safety Checks:** Always guard loops with `while fast and fast.next:` to avoid `NoneType` errors.",
          ],
        },
      ],
    },
  },

  "lc75-p29": {
    slug: "lc75-p29",
    title: {
      th: "ข้อ 29 · LC2095 Delete the Middle Node of a Linked List (ลบโหนดกลาง) 🟡",
      en: "LC2095 Delete the Middle Node of a Linked List 🟡",
    },
    lead: {
      th: "โจทย์ Fast & Slow — หาตู้กลางของขบวนในรอบเดียว แล้วปลดโซ่ให้กระโดดข้ามมันทิ้ง",
      en: "Fast & Slow pointers — locate the middle node in a single pass, then bypass and unlink it.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `You are given the \`head\` of a linked list. Delete the middle node, and return the \`head\` of the modified linked list.

The middle node of a linked list of size \`n\` is the \`⌊n / 2⌋\`-th node from the start using 0-based indexing, where \`⌊x⌋\` denotes the largest integer less than or equal to \`x\`.

• For \`n = 1, 2, 3, 4\`, and \`5\`, the middle nodes are \`0, 1, 1, 2\`, and \`2\`, respectively.`,
        },
        {
          t: "p",
          c: `กำหนด \`head\` ของ linked list มาให้ จงลบ "โหนดกึ่งกลาง" (middle node) ออก แล้วส่งคืน \`head\` ของ linked list หลังการแก้ไข

โหนดกึ่งกลางของ linked list ขนาด \`n\` คือโหนดที่ index \`⌊n / 2⌋\` (นับจาก 0)
• เช่น n = 1 -> index 0
• n = 2 -> index 1
• n = 4 -> index 2
• n = 7 -> index 3`,
        },
        {
          t: "example",
          c: [
            {
              input: "head = [1,3,4,7,1,2,6]",
              output: "[1,3,4,1,2,6]",
              explain:
                "ความยาว n = 7 ดังนั้นโหนดกึ่งกลางคือ index 7 // 2 = 3 ซึ่งมีค่า 7 เมื่อลบออกจะได้ [1,3,4,1,2,6]",
            },
            {
              input: "head = [1,2,3,4]",
              output: "[1,2,4]",
              explain:
                "ความยาว n = 4 โหนดกึ่งกลางคือ index 4 // 2 = 2 (ค่า 3) เมื่อลบออกจะได้ [1,2,4]",
            },
            {
              input: "head = [2,1]",
              output: "[2]",
              explain:
                "ความยาว n = 2 โหนดกึ่งกลางคือ index 2 // 2 = 1 (ค่า 1) เมื่อลบออกจะได้ [2]",
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
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "ถ้ามีขบวนรถไฟยาวๆ แล้วเราต้องการหยุดตรงกลางขบวนพอดีโดยไม่ต้องนับจำนวนตู้ทั้งหมดก่อนสองรอบ เราจะใช้เข็มความเร็วต่างกันอย่างไร?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ต้องการให้เราลบโหนดกึ่งกลาง (ตำแหน่ง ⌊n/2⌋) ออกจาก linked list โดยต้องคงลำดับโหนดที่เหลือทั้งหมดไว้เหมือนเดิม และส่งคืน head ของขบวนที่แก้ไขแล้ว",
            },
            {
              t: "p",
              c: "กรณีพิเศษที่ต้องระวัง: ถ้าขบวนมีแค่โหนดเดียว (n = 1) โหนดนั้นคือโหนดกึ่งกลาง เมื่อลบออก ขบวนจะกลายเป็นว่างเปล่าทันที ต้องคืนค่า `None`",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ลองดูตัวอย่าง: head = [1, 3, 4, 7, 1, 2, 6] (n = 7)",
            },
            {
              t: "ul",
              c: [
                "โหนดกลางคือตัวที่ 3 (ค่า 7)",
                "เราต้องการให้โหนดก่อนหน้า (ค่า 4) ปลดโซ่ที่เคยชี้ไปหา 7 แล้วข้ามไปเกี่ยวเข้ากับโหนด 1 แทน!",
                "นั่นหมายความว่า เราจำเป็นต้องรู้ 2 โหนด: โหนดกลาง (slow) และโหนดก่อนหน้าโหนดกลาง (prev)",
                "เมื่อเจอแล้ว สั่งเพียงบรรทัดเดียว: `prev.next = slow.next`",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: ใช้เทคนิค **Fast & Slow Pointers** (เต่ากับกระต่าย) ร่วมกับตัวชี้ `prev` เพื่อหาโหนดกลางและตัดต่อโซ่ในรอบเดียว (One Pass)",
            },
            {
              t: "p",
              c: "เครื่องมือและตัวแปรที่ต้องใช้:",
            },
            {
              t: "ol",
              c: [
                "ดัก Edge Case: ถ้า `head.next is None` (มีโหนดเดียว) ลบแล้วหมดเกลี้ยง -> `return None`",
                "`slow = head`: เดินก้าวละ 1 โหนด",
                "`fast = head`: เดินก้าวละ 2 โหนด (เร็วกว่า slow สองเท่า)",
                "`prev = None`: คอยตามหลัง slow อยู่ 1 ก้าวเสมอ เพื่อจำว่าใครอยู่หน้า slow",
                "เมื่อ fast เดินถึงปลายขบวน (`fast is None` หรือ `fast.next is None`) ตัว slow จะหยุดอยู่ที่โหนดกึ่งกลางพอดี!",
                "ปลดโซ่: สั่ง `prev.next = slow.next` เพื่อให้โหนดก่อนหน้ากระโดดข้าม slow ไปหาโหนดถัดไป",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น / จำลองการทำงาน" },
            {
              t: "table",
              head: ["รอบ", "prev", "slow (1 ก้าว)", "fast (2 ก้าว)", "คำอธิบาย"],
              rows: [
                ["เริ่ม", "None", "1", "1", "fast และ slow อยู่ที่จุดเริ่มต้น"],
                ["1", "1", "3", "4", "prev จำ 1, slow ไป 3, fast กระโดดไป 4"],
                ["2", "3", "4", "1", "prev จำ 3, slow ไป 4, fast กระโดดไป 1"],
                ["3", "4", "7", "6", "prev จำ 4, slow ไป 7 (กลาง!), fast กระโดดไป 6"],
                ["จบ", "4", "7", "6", "fast.next คือ None -> หยุดลูป! สั่ง prev.next = slow.next (4 ชี้ไป 1)"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # 1. กรณีพิเศษ: มีโหนดเดียว ลบแล้วไม่เหลืออะไร
        if head is None or head.next is None:
            return None

        prev = None
        slow = head
        fast = head

        # 2. เดินกระต่ายกับเต่า: fast เดิน 2 ก้าว, slow เดิน 1 ก้าว
        while fast and fast.next:
            prev = slow
            slow = slow.next
            fast = fast.next.next

        # 3. ปลดโซ่ข้ามโหนดกึ่งกลาง (slow)
        prev.next = slow.next

        return head`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["if head is None or head.next is None:", "ตรวจว่ามี 0 หรือ 1 โหนดไหม", "ถ้ามีโหนดเดียว คืน None ทันที"],
                ["slow = head; fast = head", "ตั้งจุดเริ่มต้นตัวชี้ทั้งสอง", "เริ่มที่โหนดแรก"],
                ["prev = slow; slow = slow.next; fast = fast.next.next", "ขยับ 3 ตัวชี้พร้อมกันตามอัตราส่วน", "slow วิ่งครึ่งทางของ fast เสมอ"],
                ["prev.next = slow.next", "ปลดโซ่ข้ามโหนด slow ทิ้ง", "โหนด 4 เชื่อมข้ามไปหาโหนด 1 (โหนด 7 หลุด)"],
                ["return head", "ส่งคืนหัวขบวนเดิมที่ถูกตัดต่อแล้ว", "คืน head = 1"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(N)", "วนลูปเพียงรอบเดียว (One-pass) โดย fast เดินไปถึงปลายขบวนใช้เวลา N/2 ก้าว = O(N)"],
                ["Space (หน่วยความจำ)", "O(1)", "ใช้ตัวชี้คงที่เพียง 3 ตัว (`prev`, `slow`, `fast`) ไม่มีการสร้างโหนดหรืออาเรย์ใหม่"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `You are given the \`head\` of a linked list. Delete the middle node, and return the \`head\` of the modified linked list.

The middle node of a linked list of size \`n\` is the \`⌊n / 2⌋\`-th node from the start using 0-based indexing, where \`⌊x⌋\` denotes the largest integer less than or equal to \`x\`.

• For \`n = 1, 2, 3, 4\`, and \`5\`, the middle nodes are \`0, 1, 1, 2\`, and \`2\`, respectively.`,
        },
        {
          t: "example",
          c: [
            {
              input: "head = [1,3,4,7,1,2,6]",
              output: "[1,3,4,1,2,6]",
              explain:
                "The middle node is node 3 with value 7. Removing it yields [1,3,4,1,2,6].",
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
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Find and delete the middle node in-place. If the list has only 1 node, deleting it leaves an empty list, so return `None`.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "For [1, 3, 4, 7, 1, 2, 6], the middle is 7. To remove 7, have node 4 point directly to node 1: `prev.next = slow.next`.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Use Fast & Slow pointers: `slow` moves 1 step, `fast` moves 2 steps, and `prev` trails one step behind `slow`. When `fast` reaches the end, `slow` is at the middle.",
            },

            { t: "h3", c: "Step 4 · Simulation Table" },
            {
              t: "table",
              head: ["Step", "prev", "slow (1 step)", "fast (2 steps)", "Notes"],
              rows: [
                ["Init", "None", "1", "1", "Both start at head"],
                ["1", "1", "3", "4", "prev tracks 1, slow to 3, fast to 4"],
                ["2", "3", "4", "1", "prev tracks 3, slow to 4, fast to 1"],
                ["3", "4", "7", "6", "fast.next is None -> stop! prev.next = slow.next"],
              ],
            },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head is None or head.next is None:
            return None

        prev = None
        slow = head
        fast = head

        while fast and fast.next:
            prev = slow
            slow = slow.next
            fast = fast.next.next

        prev.next = slow.next
        return head`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["if head is None or head.next is None:", "Guard single-node case", "head=[1] -> returns None"],
                ["while fast and fast.next:", "Traverse until fast hits end", "slow lands on middle"],
                ["prev.next = slow.next", "Bypass and unlink middle node", "4 links to 1"],
                ["return head", "Return head of modified list", "return head"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(N)", "Single pass; fast takes at most N/2 steps."],
                ["Space", "O(1)", "Only three pointers used."],
              ],
            },
          ],
        },
      ],
    },
  },

  "lc75-p30": {
    slug: "lc75-p30",
    title: {
      th: "ข้อ 30 · LC328 Odd Even Linked List (จัดโหนดคี่-คู่) 🟡",
      en: "LC328 Odd Even Linked List 🟡",
    },
    lead: {
      th: "โจทย์จัดสายรถไฟ — แยกขบวนเป็นสายคี่กับสายคู่ แล้วต่อหางคี่เข้าหัวคู่ โดยไม่สร้างตู้ใหม่",
      en: "Relink in place — split into odd and even chains, then join odd's tail to even's head.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `Given the \`head\` of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The first node is considered odd, and the second node is even, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in \`O(1)\` extra space complexity and \`O(n)\` time complexity.`,
        },
        {
          t: "p",
          c: `กำหนด \`head\` ของ singly linked list มาให้ จงจัดกลุ่มโหนดที่มี "ลำดับเป็นเลขคี่" (odd) ให้อยู่ข้างหน้าทั้งหมด แล้วตามด้วยโหนดที่มี "ลำดับเป็นเลขคู่" (even) แล้วส่งคืน linked list ที่จัดเรียงใหม่

หมายเหตุ:
• โหนดแรกนับเป็นโหนดที่ 1 (คี่), โหนดที่สองนับเป็นโหนดที่ 2 (คู่), โหนดที่สามนับเป็นโหนดที่ 3 (คี่)... (นับตามตำแหน่ง index ไม่ใช่ตามค่า val)
• ลำดับสัมพันธ์ภายในกลุ่มคี่และคู่ต้องคงเดิม
• ต้องแก้ด้วยหน่วยความจำส่วนเพิ่ม O(1) space และเวลา O(n) time`,
        },
        {
          t: "example",
          c: [
            {
              input: "head = [1,2,3,4,5]",
              output: "[1,3,5,2,4]",
              explain:
                "โหนดตำแหน่งคี่: 1, 3, 5\nโหนดตำแหน่งคู่: 2, 4\nนำมาต่อกันได้ [1,3,5,2,4]",
            },
            {
              input: "head = [2,1,3,5,6,4,7]",
              output: "[2,3,6,7,1,5,4]",
              explain:
                "โหนดตำแหน่งคี่: 2, 3, 6, 7\nโหนดตำแหน่งคู่: 1, 5, 4\nนำมาต่อกันได้ [2,3,6,7,1,5,4]",
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
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "ถ้ามีรางรถไฟสลับกัน 1->2->3->4->5 เราจะสับรางอย่างไรให้ 1 เชื่อมไป 3, 3 เชื่อมไป 5 ในขณะที่ 2 เชื่อมไป 4 พร้อมๆ กันได้?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ให้จัดเรียง linked list ใหม่โดยแยกโหนดตาม 'หมายเลขลำดับตำแหน่ง' (1st, 2nd, 3rd, ...) ไม่ใช่ตามตัวเลขในโหนด โดยเอาตำแหน่งคี่ทั้งหมดมาก่อน แล้วเอาตำแหน่งคู่ทั้งหมดมาต่อท้าย",
            },
            {
              t: "p",
              c: "กฎเหล็ก: ห้ามสร้างโหนดใหม่ (ต้องใช้ O(1) space) หมายความว่าเราต้องจับข้อต่อโซ่ของโหนดเดิมมาเกี่ยวสลับรางกันเอง!",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ลองดูขบวน [1 -> 2 -> 3 -> 4 -> 5]:",
            },
            {
              t: "ul",
              c: [
                "สร้างหัวขบวนสองสาย: สายคี่เริ่มที่โหนด 1 (`odd = head`), สายคู่เริ่มที่โหนด 2 (`even = head.next`)",
                "บันทึกหัวสายคู่ไว้ก่อน: `even_head = even` (เพราะเดี๋ยวเราต้องเอาหางสายคี่มาต่อหัวสายคู่นี้)",
                "สับรางก้าวที่ 1: ให้ 1 ชี้ไป 3 (`odd.next = even.next`) แล้วขยับ odd ไปที่ 3",
                "สับรางก้าวที่ 2: ให้ 2 ชี้ไป 4 (`even.next = odd.next`) แล้วขยับ even ไปที่ 4",
                "ทำซ้ำจนหมดขบวน แล้วนำท้ายของ odd ไปต่อกับ `even_head`!",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: ใช้ Two Pointers (`odd` และ `even`) เดินสลับฟันปลาเพื่อแยก 1 ขบวนออกเป็น 2 ขบวนย่อย แล้วนำมาเชื่อมต่อกันในขั้นตอนสุดท้าย",
            },
            {
              t: "p",
              c: "เครื่องมือและตัวแปรที่ต้องใช้:",
            },
            {
              t: "ol",
              c: [
                "ดัก Edge case: ถ้า `head is None` หรือ `head.next is None` (มี 0 หรือ 1 หรือ 2 โหนด) ขบวนเรียงถูกอยู่แล้ว -> `return head`",
                "`odd = head`: ตัวชี้ท้ายสายคี่ปัจจุบัน",
                "`even = head.next`: ตัวชี้ท้ายสายคู่ปัจจุบัน",
                "`even_head = even`: จำหัวของสายคู่ไว้ ห้ามทำหาย",
                "เงื่อนไขลูป: `while even and even.next:` (เพราะ even เดินนำหน้า odd เสมอ ถ้า even ยังมีตัวถัดไป แสดงว่ายังมีของให้ต่อ)",
                "ในแต่ละรอบ: `odd.next = even.next; odd = odd.next` แล้ว `even.next = odd.next; even = even.next`",
                "ปิดงาน: `odd.next = even_head` แล้วส่งคืน `head`",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น / จำลองการทำงาน" },
            {
              t: "table",
              head: ["รอบ", "สายคี่ (odd chain)", "สายคู่ (even chain)", "odd ชี้", "even ชี้"],
              rows: [
                ["เริ่ม", "1", "2", "1", "2"],
                ["1", "1 -> 3", "2 -> 4", "3", "4"],
                ["2", "1 -> 3 -> 5", "2 -> 4 -> None", "5", "None"],
                ["จบ", "1 -> 3 -> 5 -> [ต่อเข้า even_head (2)]", "2 -> 4 -> None", "5", "None"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # 1. จัดการเคสว่าง หรือมีโหนดเดียว
        if not head or not head.next:
            return head

        odd = head               # หัวสายคี่
        even = head.next         # หัวสายคู่
        even_head = even         # จำหัวสายคู่ไว้สำหรับต่อท้ายสายคี่

        # 2. เดินสลับราง: ตราบใดที่สายคู่ยังมีโหนดให้เดินต่อ
        while even and even.next:
            odd.next = even.next
            odd = odd.next

            even.next = odd.next
            even = even.next

        # 3. นำหางสายคี่ไปเชื่อมกับหัวสายคู่
        odd.next = even_head

        return head`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["odd = head; even = head.next", "ตั้งต้นหัวขบวนคี่และคู่", "odd=1, even=2"],
                ["even_head = even", "บันทึกจุดเริ่มต้นของสายคู่", "even_head=2"],
                ["odd.next = even.next; odd = odd.next", "ดึงโหนดคี่ถัดไปมาต่อสายคี่ แล้วขยับ pointer", "1.next = 3 -> odd อยู่ที่ 3"],
                ["even.next = odd.next; even = even.next", "ดึงโหนดคู่ถัดไปมาต่อสายคู่ แล้วขยับ pointer", "2.next = 4 -> even อยู่ที่ 4"],
                ["odd.next = even_head", "เชื่อมสองขบวนเข้าด้วยกัน", "5.next = 2 ได้ 1->3->5->2->4"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(N)", "วนลูปครั้งเดียว ทุกโหนดถูกสลับสายเพียงครั้งเดียว"],
                ["Space (หน่วยความจำ)", "O(1)", "สับเปลี่ยนเฉพาะ pointer ข้อต่อเดิม ไม่สร้างโหนดใหม่เลย"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given the \`head\` of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The first node is considered odd, and the second node is even, and so on.

You must solve the problem in \`O(1)\` extra space complexity and \`O(n)\` time complexity.`,
        },
        {
          t: "example",
          c: [
            {
              input: "head = [1,2,3,4,5]",
              output: "[1,3,5,2,4]",
              explain: "Odd nodes [1, 3, 5] followed by even nodes [2, 4].",
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
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Group nodes by their 1-based index: all odd-positioned nodes first, followed by all even-positioned nodes. Must be done in-place with O(1) auxiliary space.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "For [1, 2, 3, 4, 5]: link 1->3->5 and 2->4->None. Then link 5->2 (tail of odd to head of even).",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Maintain `odd` and `even` pointers. In each iteration, leapfrog: `odd.next = even.next; odd = odd.next; even.next = odd.next; even = even.next`. Finally, set `odd.next = even_head`.",
            },

            { t: "h3", c: "Step 4 · Simulation Table" },
            {
              t: "table",
              head: ["Iteration", "Odd Chain", "Even Chain", "odd pointer", "even pointer"],
              rows: [
                ["Init", "1", "2", "1", "2"],
                ["1", "1 -> 3", "2 -> 4", "3", "4"],
                ["2", "1 -> 3 -> 5", "2 -> 4 -> None", "5", "None"],
                ["End", "1 -> 3 -> 5 -> 2 -> 4", "2 -> 4 -> None", "5", "None"],
              ],
            },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        odd = head
        even = head.next
        even_head = even

        while even and even.next:
            odd.next = even.next
            odd = odd.next
            even.next = odd.next
            even = even.next

        odd.next = even_head
        return head`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["odd = head; even = head.next", "Pointers for odd/even chains", "odd=1, even=2"],
                ["even_head = even", "Remember even chain's head", "even_head=2"],
                ["odd.next = even.next; odd = odd.next", "Connect next odd node", "1 -> 3"],
                ["even.next = odd.next; even = even.next", "Connect next even node", "2 -> 4"],
                ["odd.next = even_head", "Join odd tail to even head", "5 -> 2"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(N)", "Single pass; each node visited once."],
                ["Space", "O(1)", "Only pointer manipulation in-place."],
              ],
            },
          ],
        },
      ],
    },
  },

  "lc75-p31": {
    slug: "lc75-p31",
    title: {
      th: "ข้อ 31 · LC206 Reverse Linked List (กลับ Linked List) 🟢",
      en: "LC206 Reverse Linked List 🟢",
    },
    lead: {
      th: "โจทย์สลับสาย — หันข้อต่อโซ่กลับหลังหันทั้งขบวน ด้วย prev / curr / nxt",
      en: "In-place reverse — flip every next pointer with prev / curr / nxt.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.`,
        },
        {
          t: "p",
          c: `กำหนด \`head\` ของ singly linked list มาให้ จงกลับทิศทางของ linked list ทั้งขบวน และส่งคืน \`head\` ของ list ที่กลับด้านแล้ว`,
        },
        {
          t: "example",
          c: [
            {
              input: "head = [1,2,3,4,5]",
              output: "[5,4,3,2,1]",
              explain: "กลับทิศทางลูกศรทั้งหมด: 1 <- 2 <- 3 <- 4 <- 5 โดยมี 5 เป็นหัวขบวนใหม่",
            },
            {
              input: "head = [1,2]",
              output: "[2,1]",
              explain: "กลับทิศลูกศร: 1 <- 2",
            },
            {
              input: "head = []",
              output: "[]",
              explain: "list ว่างเปล่า ส่งคืน []",
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
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "ถ้าเรากำลังยืนอยู่ที่โหนดหนึ่ง แล้วเราจับลูกศรหันกลับไปข้างหลัง โหนดที่อยู่ข้างหน้าจะหลุดหายไปไหม? เราต้องทำอย่างไรเพื่อไม่ให้ทางข้างหน้าขาด?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ต้องการให้เรากลับทิศลูกศร `.next` ของทุกโหนดใน linked list จากเดิมที่ชี้ไปข้างหน้า (1 -> 2 -> 3 -> None) ให้หันกลับมาชี้ข้างหลังทั้งหมด (None <- 1 <- 2 <- 3) และส่งคืนโหนดตัวสุดท้าย (3) เป็นหัวขบวนใหม่",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "สมมติเรามีขบวน [1 -> 2 -> 3]:",
            },
            {
              t: "ul",
              c: [
                "ก่อนเริ่ม: ใครอยู่หน้า 1? ไม่มีเลย ดังนั้น `prev = None` และเรายืนอยู่ที่ `curr = 1`",
                "ก้าวที่ 1: ก่อนจะหักลูกศรของ 1 กลับหลัง เราต้องจำโหนด 2 ไว้ก่อน! (`nxt = curr.next = 2`)",
                "ก้าวที่ 2: หักลูกศรของ 1 กลับไปหา `prev` ทันที (`curr.next = prev` ทำให้ 1 ชี้ไป None)",
                "ก้าวที่ 3: เดินไปข้างหน้า: `prev` เลื่อนมาเป็น 1, `curr` เลื่อนไปที่ `nxt` (คือ 2)",
                "ทำวนไปเรื่อยๆ จนกระทั่ง `curr` หลุดออกไปเป็น `None` ตัว `prev` จะอยู่ที่โหนดสุดท้าย (3) ซึ่งก็คือ head ใหม่นั่นเอง!",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: ใช้ 3 Pointers คือ `prev`, `curr`, `nxt` วนลูปกลับทิศทีละโหนดแบบ In-place O(1) space",
            },
            {
              t: "p",
              c: "สเต็ปการทำงาน 4 จังหวะในลูป:",
            },
            {
              t: "ol",
              c: [
                "`nxt = curr.next` — จำโหนดข้างหน้าไว้ก่อนกันหลงทาง",
                "`curr.next = prev` — หักลูกศรหันกลับหลัง",
                "`prev = curr` — ขยับ prev เดินหน้ามา 1 ก้าว",
                "`curr = nxt` — ขยับ curr เดินหน้าไปทำโหนดถัดไป",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** เพื่อดูการกลับทิศลูกศรทีละโหนด สังเกตการใช้ pointer สามตัวในการรักษาเส้นทาง:",
            },
            { t: "viz", id: "reverse-linked-list" },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head

        while curr:
            nxt = curr.next     # 1. จำโหนดถัดไปไว้ก่อน
            curr.next = prev    # 2. หันลูกศรกลับหลัง
            prev = curr         # 3. เลื่อน prev มาข้างหน้า
            curr = nxt          # 4. เลื่อน curr ไปทำตัวถัดไป

        # เมื่อ curr หลุดเป็น None ตัว prev จะอยู่ที่หัวขบวนใหม่
        return prev`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["prev = None; curr = head", "ตั้งต้น: prev เป็นความว่างเปล่า, curr เริ่มที่หัว", "prev=None, curr=1"],
                ["nxt = curr.next", "จำโหนดถัดไปไว้ไม่ให้ขาดการเชื่อมต่อ", "curr=1 -> nxt=2"],
                ["curr.next = prev", "กลับทิศลูกศรชี้ไปหาโหนดก่อนหน้า", "1.next = None"],
                ["prev = curr; curr = nxt", "ขยับตัวชี้ทั้งสองไปข้างหน้าพร้อมกัน", "prev=1, curr=2"],
                ["return prev", "ส่งคืนหัวใหม่ของ linked list", "คืนโหนด 5"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(N)", "เดินตรวจและกลับทิศทางของโหนดทั้ง N ตัว ตัวละ 1 ครั้ง"],
                ["Space (หน่วยความจำ)", "O(1)", "ใช้ตัวชี้ `prev`, `curr`, `nxt` เพียงสามตัว ไม่เปลืองหน่วยความจำเพิ่ม"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.`,
        },
        {
          t: "example",
          c: [
            {
              input: "head = [1,2,3,4,5]",
              output: "[5,4,3,2,1]",
              explain: "Reverse all arrows: 1 <- 2 <- 3 <- 4 <- 5.",
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
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Reverse the direction of every `next` pointer in the list in-place.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "For [1, 2, 3]:\n• Save 2 (`nxt = curr.next`).\n• Reverse 1 -> None (`curr.next = prev`).\n• Advance: `prev = 1`, `curr = 2`.\n• Repeat until `curr` is `None`. `prev` is the new head.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Use the classic 3-pointer pattern (`prev`, `curr`, `nxt`) to reverse each link in O(N) time and O(1) space.",
            },

            { t: "h3", c: "Step 4 · Interactive Walkthrough" },
            { t: "viz", id: "reverse-linked-list" },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head

        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt

        return prev`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["prev = None; curr = head", "Initial state", "prev=None, curr=1"],
                ["nxt = curr.next", "Save forward link", "nxt=2"],
                ["curr.next = prev", "Reverse current link", "1 points to None"],
                ["prev = curr; curr = nxt", "Advance pointers", "prev=1, curr=2"],
                ["return prev", "New head of reversed list", "return 5"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(N)", "Each node is visited once."],
                ["Space", "O(1)", "In-place pointer reversal."],
              ],
            },
          ],
        },
      ],
    },
  },

  "lc75-p32": {
    slug: "lc75-p32",
    title: {
      th: "ข้อ 32 · LC2130 Maximum Twin Sum of a Linked List (ผลรวมคู่แฝดมากสุด) 🟡",
      en: "LC2130 Maximum Twin Sum of a Linked List 🟡",
    },
    lead: {
      th: "ประกอบสามท่า: Fast & Slow หากลาง → Reverse ครึ่งหลัง → เดินสองสายบวกทีละคู่",
      en: "Compose three moves: Fast & Slow to the middle → reverse the second half → walk both halves and track the max twin sum.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `In a linked list of size \`n\`, where \`n\` is even, the \`i\`-th node (0-indexed) of the linked list is known as the twin of the \`(n-1-i)\`-th node, if \`0 <= i <= (n / 2) - 1\`.

• For example, if \`n = 4\`, then node \`0\` is the twin of node \`3\`, and node \`1\` is the twin of node \`2\`. These are the only nodes with twins for \`n = 4\`.

The twin sum is defined as the sum of a node and its twin.

Given the \`head\` of a linked list with even length, return the maximum twin sum of the linked list.`,
        },
        {
          t: "p",
          c: `ใน linked list ที่มีความยาว \`n\` เป็นเลขคู่ โหนดลำดับที่ \`i\` (นับจาก 0) จะเป็น "คู่แฝด" (twin) กับโหนดลำดับที่ \`n - 1 - i\` (คือตัวแรกคู่กับตัวสุดท้าย, ตัวที่สองคู่กับตัวรองสุดท้าย...)

ผลรวมคู่แฝด (twin sum) คือผลบวกของค่าในโหนดกับค่าในคู่แฝดของมัน

จงหาผลรวมคู่แฝดที่มีค่ามากที่สุดใน linked list`,
        },
        {
          t: "example",
          c: [
            {
              input: "head = [5,4,2,1]",
              output: "6",
              explain:
                "คู่แฝดคือ:\n• โหนด 0 (ค่า 5) คู่กับโหนด 3 (ค่า 1) -> ผลรวม 5 + 1 = 6\n• โหนด 1 (ค่า 4) คู่กับโหนด 2 (ค่า 2) -> ผลรวม 4 + 2 = 6\nผลรวมคู่แฝดสูงสุดคือ 6",
            },
            {
              input: "head = [4,2,2,3]",
              output: "7",
              explain:
                "คู่แฝดคือ:\n• โหนด 0 (4) คู่กับโหนด 3 (3) -> 4 + 3 = 7\n• โหนด 1 (2) คู่กับโหนด 2 (2) -> 2 + 2 = 4\nผลรวมสูงสุดคือ 7",
            },
            {
              input: "head = [1,100000]",
              output: "100001",
              explain:
                "มีคู่เดียวคือ 1 + 100000 = 100001",
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
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "ใน Array เราจับคู่หัวท้ายได้ง่ายๆ ด้วย Two Pointers ซ้ายขวา แต่ใน Linked List เราเดินถอยหลังจากท้ายขบวนไม่ได้! จะทำอย่างไรให้เดินคู่กันได้?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ให้หาผลบวกสูงสุดระหว่างโหนดสมมาตร (หัวกับท้าย, ตัวที่สองกับรองสุดท้าย...) ใน linked list ที่ยาวเป็นเลขคู่ โดยอุปสรรคสำคัญคือ linked list เดินถอยหลังจากขวาไปซ้ายไม่ได้",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ลองดูตัวอย่าง: head = [5, 4, 2, 1]",
            },
            {
              t: "ul",
              c: [
                "แบ่งครึ่งขบวน: ครึ่งแรกคือ [5 -> 4], ครึ่งหลังคือ [2 -> 1]",
                "สังเกตว่า 5 ต้องบวกกับ 1, และ 4 ต้องบวกกับ 2",
                "ถ้าเรา 'กลับทิศทาง' ของครึ่งหลัง จาก [2 -> 1] กลายเป็น [1 -> 2] ละก็...",
                "เราจะได้หัวสองสาย: สายแรกเริ่มที่ 5, สายสองเริ่มที่ 1",
                "ทีนี้ก็แค่เดินพร้อมกันทีละก้าว: คู่แรก (5 + 1 = 6), คู่สอง (4 + 2 = 6) ตอบ max = 6!",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: รวมร่าง 3 ท่าไม้ตายที่เรียนมาทั้งหมด ได้แก่ (1) Fast & Slow หากลาง -> (2) Reverse ครึ่งหลัง -> (3) Two Pointers เดินบวกหา Max",
            },
            {
              t: "p",
              c: "ขั้นตอน 3 สเต็ปอย่างละเอียด:",
            },
            {
              t: "ol",
              c: [
                "ท่าที่ 1 (หาจุดกึ่งกลาง): ใช้ `slow` เดิน 1 ก้าว และ `fast` เดิน 2 ก้าว พอ `fast` ถึงปลาย `slow` จะยืนอยู่ที่จุดเริ่มต้นของครึ่งหลังพอดี",
                "ท่าที่ 2 (กลับทิศครึ่งหลัง): สั่ง Reverse Linked List ตั้งแต่ `slow` เป็นต้นไป จะได้หัวของครึ่งหลังที่กลับด้านแล้ว (`prev`)",
                "ท่าที่ 3 (เดินคู่หา Max): ตั้ง `first = head` และ `second = prev` แล้ววนลูปบวกค่า `first.val + second.val` เทียบเก็บค่าสูงสุด `max_sum`",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น / จำลองการทำงาน" },
            {
              t: "table",
              head: ["เฟส", "สิ่งที่ทำ", "สถานะของโหนด"],
              rows: [
                ["เฟส 1", "Fast & Slow", "head = 5 -> 4, slow เริ่มที่ 2 -> 1"],
                ["เฟส 2", "Reverse ครึ่งหลัง", "ครึ่งแรก: 5 -> 4, ครึ่งหลังที่กลับแล้ว: 1 -> 2"],
                ["เฟส 3", "ก้าวที่ 1", "first=5, second=1 -> ผลรวม = 6, max_sum = 6"],
                ["เฟส 3", "ก้าวที่ 2", "first=4, second=2 -> ผลรวม = 6, max_sum = 6"],
                ["จบ", "สรุปผล", "คืนค่า max_sum = 6"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        # 1. ท่าที่ 1: ใช้ Fast & Slow หาจุดกึ่งกลางของ list
        slow = head
        fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        # 2. ท่าที่ 2: กลับทิศทาง (Reverse) ของครึ่งหลัง
        prev = None
        curr = slow
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt

        # 3. ท่าที่ 3: เดินคู่จากหัวครึ่งแรกและหัวครึ่งหลังเพื่อหา max twin sum
        max_sum = 0
        first = head
        second = prev       # prev คือหัวของครึ่งหลังที่กลับทิศแล้ว
        while second:
            twin_sum = first.val + second.val
            if twin_sum > max_sum:
                max_sum = twin_sum
            first = first.next
            second = second.next

        return max_sum`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["while fast and fast.next: slow = slow.next...", "พา slow ไปหยุดที่ต้นครึ่งหลัง", "slow หยุดที่โหนด 2"],
                ["while curr: nxt = curr.next; curr.next = prev...", "กลับทิศครึ่งหลัง In-place", "2->1 กลายเป็น 1->2"],
                ["second = prev", "prev ชี้หัวครึ่งหลังใหม่", "second เริ่มที่ 1"],
                ["twin_sum = first.val + second.val", "บวกคู่แฝดทีละคู่", "5+1=6, 4+2=6"],
                ["return max_sum", "ส่งคืนผลรวมคู่แฝดที่มากที่สุด", "return 6"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(N)", "หากลางใช้ N/2 + กลับครึ่งหลังใช้ N/2 + เดินหาผลบวกใช้ N/2 รวมเป็น O(N) เท่านั้น"],
                ["Space (หน่วยความจำ)", "O(1)", "ทำทุกอย่างบน pointer เดิม ไม่ต้องแปลงเป็น array หรือใช้ stack เพิ่ม"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `In a linked list of size \`n\`, where \`n\` is even, the \`i\`-th node (0-indexed) is the twin of the \`(n-1-i)\`-th node. Return the maximum twin sum.`,
        },
        {
          t: "example",
          c: [
            {
              input: "head = [5,4,2,1]",
              output: "6",
              explain: "Twins: 5+1=6, 4+2=6. Maximum twin sum is 6.",
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
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Compute the maximum sum of paired symmetric nodes (first with last, second with second-to-last, etc.).",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "For [5, 4, 2, 1]: split into [5, 4] and [2, 1]. Reverse the second half to get [1, 2]. Pairwise sum: (5+1=6, 4+2=6). Max = 6.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Combine three standard techniques:\n1. Fast & Slow pointers to locate the midpoint.\n2. Reverse the second half in-place.\n3. Two pointers to simultaneously traverse both halves and calculate the max sum.",
            },

            { t: "h3", c: "Step 4 · Step-by-Step Simulation" },
            {
              t: "table",
              head: ["Phase", "Action", "State"],
              rows: [
                ["1", "Fast & Slow", "Find middle node"],
                ["2", "Reverse 2nd half", "Half 1: 5->4, Half 2 reversed: 1->2"],
                ["3", "Pair sum", "5+1=6, 4+2=6 -> max = 6"],
              ],
            },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        slow = head
        fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        prev = None
        curr = slow
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt

        max_sum = 0
        first = head
        second = prev
        while second:
            twin_sum = first.val + second.val
            if twin_sum > max_sum:
                max_sum = twin_sum
            first = first.next
            second = second.next

        return max_sum`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["while fast and fast.next: slow = slow.next...", "Find midpoint", "slow stops at 2"],
                ["while curr: nxt = curr.next; curr.next = prev...", "Reverse second half", "2->1 becomes 1->2"],
                ["twin_sum = first.val + second.val", "Sum symmetric twins", "5+1=6, 4+2=6"],
                ["return max_sum", "Max twin sum", "return 6"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(N)", "N/2 to find mid, N/2 to reverse, N/2 to sum -> O(N)."],
                ["Space", "O(1)", "In-place pointer traversal."],
              ],
            },
          ],
        },
      ],
    },
  },
};
