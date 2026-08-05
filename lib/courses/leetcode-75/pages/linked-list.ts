import type { Page } from "@/lib/types";

export const linkedListPages: Record<string, Page> = {
  "lc75-intro-linked-list": {
    slug: "lc75-intro-linked-list",
    title: { th: "Linked List — พื้นฐาน & แนวคิด", en: "" },
    lead: {
      th: "โซ่ข้อมูลที่เดินตามลูกศรทีละโหนด — นึกถึงการล่าสมบัติ ตามใบ้ไปทีละจุด กระโดดข้ามด้วย index ไม่ได้",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "Linked List (ลิสต์เชื่อมโยง) เป็น data structure ที่เจอบ่อยมากในการสัมภาษณ์ — แนวคิดต่างจาก list ของ Python ที่เราคุ้นพอสมควร หน้านี้จะปูพื้นจากศูนย์ก่อนลุยโจทย์ 4 ข้อ",
        },

        { t: "h2", c: "ส่วนที่ 1 · ปลดล็อกไอเดีย" },
        {
          t: "p",
          c: "ภาพจำ: list ของ Python เหมือนตู้ล็อกเกอร์เรียงติดกัน — อยากได้ช่องที่ 5 คำนวณตำแหน่งได้ทันที แต่ Linked List เป็นก้อนข้อมูลเล็ก ๆ (node) กระจายคนละที่ในหน่วยความจำ แต่ละก้อนเก็บใบ้ว่าจุดต่อไปอยู่ไหน",
        },
        {
          t: "p",
          c: 'เหมือนการล่าสมบัติ — แต่ละจุดบอกใบ้จุดถัดไป ต้องเดินตามลูกศรทีละก้าว จะกระโดดข้ามไปกลาง ๆ เลยไม่ได้',
        },
        {
          t: "code",
          lang: "text",
          label: "ลิสต์ 1 → 2 → 3 หน้าตาแบบนี้",
          c: `[1|•]───▶[2|•]───▶[3|•]───▶ None
 ▲
head (จุดเริ่มต้น เก็บไว้ที่ node ตัวแรก)`,
        },

        { t: "h2", c: "ส่วนที่ 2 · กฎเหล็ก — Node + Next" },
        {
          t: "p",
          c: "Linked List มีกฎศักดิ์สิทธิ์ข้อเดียว: แต่ละ node เก็บสองอย่างเท่านั้น — ค่า (val) กับตัวชี้ไปตัวถัดไป (next) อาวุธประจำกายมี 3 ท่าหลัก:",
        },
        {
          t: "ol",
          c: [
            "Traverse (เดินไล่) — เริ่มจาก head แล้วตาม .next ไปเรื่อย ๆ จนเจอ None",
            "Update pointer — แก้ .next ให้ชี้คนละตัว (ลบ / แทรก / กลับทิศ)",
            "Two pointers — ใช้ตัวชี้สองตัว (prev/cur หรือ fast/slow) ทำงานคู่กัน",
          ],
        },

        { t: "h2", c: "ส่วนที่ 3 · ใน Python — ListNode" },
        {
          t: "p",
          c: "LeetCode ใช้ class ชื่อ ListNode มาตรฐานนี้ (โจทย์ให้มาแล้ว ไม่ต้องเขียนเองตอนส่งคำตอบ):",
        },
        {
          t: "code",
          lang: "python",
          label: "โครงสร้าง Node + สร้างลิสต์ด้วยมือ",
          c: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val        # ค่าที่ node นี้เก็บ
        self.next = next      # pointer ชี้ node ถัดไป (None ถ้าเป็นตัวสุดท้าย)

# สร้างลิสต์ 1 -> 2 -> 3 ด้วยมือ
a = ListNode(1)
b = ListNode(2)
c = ListNode(3)
a.next = b      # ให้ node 1 ชี้ไป node 2
b.next = c      # ให้ node 2 ชี้ไป node 3
# a คือ head ของลิสต์นี้`,
        },
        {
          t: "table",
          head: ["operation", "array / Python list", "linked list"],
          rows: [
            ["access ตำแหน่งที่ index i", "O(1)", "O(n) ต้อง traverse จาก head"],
            ["insert ที่หัว", "O(n) ต้อง shift", "O(1) แค่สร้าง node ใหม่ชี้ head เดิม"],
            ["delete ที่หัว", "O(n) ต้อง shift", "O(1) แค่ขยับ head ไปตัวถัดไป"],
          ],
        },

        { t: "h2", c: "ส่วนที่ 4 · จำลองการทำงาน" },
        {
          t: "p",
          c: "โครงเดินพื้นฐานที่ต้องจำให้ขึ้นใจ — ใช้ pointer ชื่อ cur เริ่มที่ head แล้ววนจนกว่าจะเจอ None:",
        },
        {
          t: "codeout",
          lang: "python",
          label: "Walkthrough — traverse ลิสต์ 1 → 2 → 3",
          code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# สร้าง 1 -> 2 -> 3
head = ListNode(1, ListNode(2, ListNode(3)))

cur = head
while cur:                 # วนจนกว่าจะเดินตกขอบ (เจอ None)
    print(cur.val)         # ทำอะไรกับ node ตัวปัจจุบัน
    cur = cur.next         # ก้าวไป node ถัดไป — หัวใจของการเดิน`,
          out: `1
2
3`,
        },
        {
          t: "callout",
          title: "ทำไม access ด้วย index ตรง ๆ ไม่ได้",
          c: "node ไม่ได้เรียงติดกันในหน่วยความจำ คอมพิวเตอร์คำนวณ 'ที่อยู่ของ node ที่ index 5' ไม่ได้เหมือน array — รู้แค่ที่อยู่ของ head และแต่ละ node รู้แค่ว่าตัวถัดไปอยู่ไหน จึงต้อง traverse ผ่านตัวก่อนหน้าเสมอ",
        },

        { t: "h2", c: "ส่วนที่ 5 · สัญญาณว่าโจทย์ข้อนี้ต้องใช้ Linked List" },
        {
          t: "p",
          c: "ถ้าเจอโจทย์แนว ๆ นี้ ให้นึกถึงเทคนิคเหล่านี้เตรียมไว้เลยครับ:",
        },
        {
          t: "ul",
          c: [
            "dummy head — สร้าง node ปลอมไว้หน้าสุด ทำให้ลบ/แทรกที่หัวไม่ต้องเขียน edge case พิเศษ",
            "prev / cur — สองตัวชี้เดินคู่กัน ใช้ตอน reverse หรือลบ node (ต้องมีตัวก่อนหน้า)",
            "fast & slow — slow เดินทีละ 1 · fast ทีละ 2 พอ fast ถึงปลาย slow อยู่กลางพอดี (หา middle / detect cycle)",
          ],
        },
        {
          t: "callout",
          title: "ประโยคท่องจำ",
          c: "อยากแก้ pointer ต้องมีตัวก่อนหน้า · อยากได้กลางลิสต์ใช้ fast/slow · อยากกลับทิศจำ nxt ไว้ก่อนพลิก!",
        },

        {
          t: "p",
          c: "พื้นฐานครบแล้ว — หมวดนี้มี 4 ข้อ: Delete Middle · Odd Even · Reverse · Twin Sum พร้อมแล้วกดถัดไปลุยข้อแรกได้เลยครับ",
        },
      ],
      en: [],
    },
  },

  "lc75-p29": {
    slug: "lc75-p29",
    title: { th: "ข้อ 29 · LC2095 Delete the Middle Node of a Linked List (ลบโหนดกลาง) 🟡", en: "" },
    lead: {
      th: "โจทย์ Linked List แบบ fast & slow — หาตัวกลางในรอบเดียว แล้วให้ตัวก่อนหน้ากระโดดข้ามมันทิ้ง",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "โจทย์ (LC2095): กำหนด head ของ linked list มาให้ ให้ลบ node ตัวกลางออกจาก list แล้ว return head ของ list ที่แก้ไขแล้ว โดยนิยามตัวกลางของ list ขนาด n คือ node ลำดับที่ ⌊n/2⌋ นับ index จาก 0 (เช่น n = 1, 2, 3, 4, 5 ตัวกลางคือ index 0, 1, 1, 2, 2 ตามลำดับ)",
        },
        {
          t: "example",
          c: [
            {
              input: "head = [1,3,4,7,1,2,6]",
              output: "[1,3,4,1,2,6]",
              explain:
                "list นี้มี n = 7 ตัว ตัวกลางอยู่ที่ index ⌊7/2⌋ = 3 ซึ่งคือ node ค่า 7 ลบออกแล้วเหลือ [1,3,4,1,2,6]",
            },
            {
              input: "head = [1,2,3,4]",
              output: "[1,2,4]",
              explain:
                "list นี้มี n = 4 ตัว ตัวกลางอยู่ที่ index ⌊4/2⌋ = 2 ซึ่งคือ node ค่า 3 ลบออกแล้วเหลือ [1,2,4]",
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
              c: 'ข้อนี้ตรงกับประโยคท่องจำของหมวด Linked List: "อยากได้กลางลิสต์ใช้ fast/slow"',
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "วิธีง่ายคือเดินรอบแรกนับ n แล้วเดินรอบสองไปหยุดที่ ⌊n/2⌋ เพื่อลบ — ถูกแต่ต้อง traverse สองรอบ",
            },
            {
              t: "p",
              c: "หัวใจสำคัญ: ใช้ fast & slow — slow เดินทีละ 1 · fast ทีละ 2 พอ fast ถึงปลาย slow จะหยุดที่กลางพอดี จบในรอบเดียว",
            },
            {
              t: "p",
              c: "แต่แค่รู้ตัวกลางยังลบไม่ได้ — ต้องมี prev (ตัวก่อนหน้า) เพื่อสั่ง prev.next = slow.next ให้กระโดดข้ามตัวกลางทิ้ง",
            },

            { t: "h3", c: "2. กฎเหล็ก 4 ข้อ (The Logic)" },
            {
              t: "p",
              c: "เปิด pointer สามตัว แล้วเดินจนกว่า fast จะหมดทาง:",
            },
            {
              t: "ol",
              c: [
                "ดักเคสพิเศษ — ถ้ามี node เดียว (head.next เป็น None) return None ทันที",
                "เตรียมตัวชี้ — prev = None, slow = head, fast = head",
                "เดินคู่ — ตราบใดที่ fast และ fast.next ยังมีอยู่: prev = slow แล้ว slow ขยับ 1 · fast ขยับ 2",
                "ลบทิ้ง — prev.next = slow.next แล้ว return head",
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
        # กฎข้อ 1: มี node เดียว ลบแล้วเหลือว่าง
        if head.next is None:
            return None

        prev = None                 # จะให้ชี้ node ก่อนตัวกลาง
        slow = head                 # เดินทีละ 1 ก้าว -> จบที่ตัวกลาง
        fast = head                 # เดินทีละ 2 ก้าว

        # กฎข้อ 3: เดินคู่จนกว่า fast จะหมดทาง
        while fast and fast.next:
            prev = slow
            slow = slow.next        # slow ขยับ 1
            fast = fast.next.next   # fast ขยับ 2

        # กฎข้อ 4: ตอนนี้ slow คือตัวกลาง, prev คือตัวก่อนหน้า
        prev.next = slow.next       # ข้ามตัวกลางทิ้งไป
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
                ["หลังลูป", "4", "7 (ตัวกลาง)", "6", "4.next ชี้ไป 1 (ข้าม 7)"],
              ],
            },
            {
              t: "p",
              c: "จบเกม — ได้ลิสต์ [1, 3, 4, 1, 2, 6]",
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "p",
              c: 'เคส "node เดียว" — ถ้าไม่ดักไว้:',
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
              c: "ต้องเขียน while fast and fast.next — ถ้าเขียนแค่ while fast จะพังตอน fast.next.next เพราะไปอ้าง .next ของ None เมื่อ fast วิ่งเลยขอบ",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — traverse ผ่าน list รอบเดียว",
                "Space O(1) — ใช้แค่ pointer ไม่กี่ตัว ไม่สร้าง list ใหม่",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "fast & slow หา middle node ได้ในรอบเดียว และเวลาจะ delete / update node ใน linked list ต้องมี pointer ไปที่ 'ตัวก่อนหน้า' เสมอ — สองไอเดียนี้ใช้ซ้ำได้อีกหลายข้อ",
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
      th: "ร้อยสายใหม่จาก node เดิมสองสาย (index คี่กับคู่) แล้วต่อหางคี่เข้าหัวคู่ — Space O(1)",
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
              c: "ข้อนี้บังคับ Space O(1) — copy ค่าไป list ใหม่ไม่ได้ ต้องเย็บ pointer จาก node เดิมในที่เดิม",
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "วิธีง่ายคือเก็บค่า index คี่ไว้ list หนึ่ง ค่าคู่ไว้อีก list แล้วต่อกัน — แต่ใช้ Space O(n) ผิดเงื่อนไข",
            },
            {
              t: "p",
              c: "หัวใจสำคัญ: ใช้ตัวชี้สองตัว odd กับ even สานสลับกันไป — ไม่สร้าง node ใหม่ แค่ร้อยสายใหม่จาก node เดิม แล้วต่อหางสายคี่เข้ากับหัวสายคู่",
            },

            { t: "h3", c: "2. กฎเหล็ก 4 ข้อ (The Logic)" },
            {
              t: "p",
              c: "เปิดสองสาย แล้วเย็บไปจนหมด:",
            },
            {
              t: "ol",
              c: [
                "ดักเคสพิเศษ — list ว่างหรือมี node เดียว return head เลย",
                "เตรียมสาย — odd ชี้ตัวแรก · even ชี้ตัวที่สอง · even_head จำหัวสายคู่ไว้",
                "เย็บสลับ — ตราบใดที่ even และ even.next ยังมี: odd ข้ามไปเกาะคี่ถัดไป แล้ว even ข้ามไปเกาะคู่ถัดไป",
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
        # กฎข้อ 1: 0 หรือ 1 node ไม่ต้องทำอะไร
        if head is None or head.next is None:
            return head

        odd = head                  # ตัวชี้สายตำแหน่งคี่
        even = head.next            # ตัวชี้สายตำแหน่งคู่
        even_head = even            # จำหัวสายคู่ไว้ เพื่อเอาไปต่อทีหลัง

        # กฎข้อ 3: เย็บสลับจนหมด
        while even and even.next:
            odd.next = even.next    # คี่ข้ามไปเกาะตัวคี่ถัดไป
            odd = odd.next          # ขยับตัวชี้คี่
            even.next = odd.next    # คู่ข้ามไปเกาะตัวคู่ถัดไป
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
              c: "จบเกม — ได้ลิสต์ [1, 3, 5, 2, 4]",
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "p",
              c: 'เคส "ลืม even_head" — ความพลาดอันดับหนึ่ง:',
            },
            {
              t: "ul",
              c: [
                "ระหว่าง loop pointer ของสายคู่ถูก update ไปเรื่อย ๆ",
                "ถ้าไม่จำหัวไว้ก่อน จะหาไม่เจอว่าปลายสายคี่ต้องไปต่อกับตัวไหน",
              ],
            },
            {
              t: "callout",
              title: "ลำดับสี่บรรทัดใน loop สลับไม่ได้",
              warn: true,
              c: "ต้องขยับ odd ให้เสร็จก่อน ถึงจะใช้ odd.next มาหาตัวคู่ถัดไปได้ถูก — ถ้าสลับลำดับจะได้ pointer ผิดตัวทันที",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — traverse ผ่านทุก node รอบเดียว",
                "Space O(1) — แค่สาน pointer ไม่สร้าง list ใหม่",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "การแยก list เป็นหลายสายในที่เดิมด้วยการสาน pointer สลับกัน แล้วค่อยต่อกลับ เป็น pattern ที่ประหยัด space มาก — กุญแจคือ track หัวของสายที่จะเอาไปต่อทีหลังไว้เสมอ",
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
      th: "ท่าพื้นฐานที่สุดของหมวด — reverse pointer ให้ชี้ย้อนกลับด้วย prev/cur/nxt · โจทย์อื่นต่อยอดจากท่านี้",
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
              c: 'ข้อนี้ตรงกับประโยคท่องจำ: "อยากกลับทิศจำ nxt ไว้ก่อนพลิก!"',
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "วิธีง่ายคือเก็บค่าทุก node ใส่ list แล้ว reverse สร้าง linked list ใหม่ — ถูกแต่ใช้ Space O(n)",
            },
            {
              t: "p",
              c: "หัวใจสำคัญ: ไม่ต้องย้ายค่าเลย — แค่ traverse ไปพลิกลูกศรของแต่ละ node ให้ชี้ย้อนหลังในที่เดิม (in-place) ด้วย prev กับ cur",
            },
            {
              t: "p",
              c: "นึกภาพว่ากำลังเดินข้ามสะพานแล้วพับสะพานข้างหลังทิ้ง — ต้องมองว่าก้าวต่อไปเหยียบตรงไหนให้เรียบร้อยก่อนพับ",
            },

            { t: "h3", c: "2. กฎเหล็ก 4 ข้อ (The Logic)" },
            {
              t: "p",
              c: "เปิด prev/cur แล้วพลิกทีละตัว:",
            },
            {
              t: "ol",
              c: [
                "เตรียมตัวชี้ — prev = None · cur = head",
                "จำทางไว้ก่อน — nxt = cur.next (กันหลุดลิสต์)",
                "พลิกลูกศร — cur.next = prev แล้วขยับ prev ตามมาที่ cur · cur ไปที่ nxt",
                "จบเกม — พอ cur เป็น None · prev คือ head ตัวใหม่ → return prev",
              ],
            },

            { t: "h3", c: "3. โค้ด Python (LeetCode Ready)" },
            {
              t: "p",
              c: "สี่บรรทัดใน loop ท่องให้ขึ้นใจ:",
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
        cur = head                  # node ที่กำลังพิจารณา

        while cur:
            nxt = cur.next          # 1) จำ node ถัดไปไว้ก่อน (กันหลุดลิสต์)
            cur.next = prev         # 2) พลิก pointer ให้ชี้ย้อนกลับ
            prev = cur              # 3) ขยับ prev ตามมา
            cur = nxt               # 4) ขยับ cur ไปตัวที่จำไว้

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
              c: "จบเกม — ได้ลิสต์ [3, 2, 1]",
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "p",
              c: 'เคส "ลืมจำ nxt ไว้ก่อน":',
            },
            {
              t: "ul",
              c: [
                "พอสั่ง cur.next = prev ปุ๊บ pointer เดิมที่ชี้ไปข้างหน้าหายทันที",
                "traverse ต่อไม่ได้ — ต้อง nxt = cur.next มาก่อนเสมอ",
              ],
            },
            {
              t: "callout",
              title: "return อะไร?",
              warn: true,
              c: "ต้อง return prev ไม่ใช่ cur — ตอนจบ cur เป็น None ไปแล้ว (เดินตกขอบ) ส่วน prev ค้างอยู่ที่ node สุดท้ายที่ reverse ซึ่งคือ head ตัวใหม่",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — traverse ผ่านทุก node หนึ่งรอบ",
                "Space O(1) — ใช้ pointer ไม่กี่ตัว ไม่สร้าง list ใหม่",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "การ reverse ด้วย prev/cur/nxt สี่บรรทัดคือท่ามาตรฐานที่ต้องท่องให้ขึ้นใจ — หลายโจทย์ (เช่นข้อ 32) เอาไปใช้ reverse 'บางส่วน' ของ list ต่อ",
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
      th: "ประกอบสามเทคนิค: หา middle ด้วย fast/slow → reverse ครึ่งหลัง → traverse สองสายบวกทีละคู่",
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
              c: "ข้อนี้คือการประกอบร่างสามเทคนิคจากข้อก่อนหน้า — หากลาง (ข้อ 29) + reverse (ข้อ 31) + เดินสองสาย",
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "Linked List เดินย้อนกลับไม่ได้ — access 'ตัวหลัง' ของแต่ละคู่ twin จึงยาก",
            },
            {
              t: "p",
              c: "หัวใจสำคัญ: หากลางด้วย fast/slow → reverse ครึ่งหลังให้หันมาทางเดียวกับครึ่งหน้า → เดินจากสองปลายเข้ามาบวกทีละคู่ เก็บค่ามากสุด",
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
                "หา middle — fast/slow เดิน พอ fast ตกขอบ slow หยุดที่หัวครึ่งหลัง (n เป็นเลขคู่เสมอ)",
                "reverse ครึ่งหลัง — เอาท่าจากข้อ 31 มา reverse จาก slow ได้ prev เป็นหัวใหม่ (ตัวสุดท้ายเดิมมาอยู่หน้าสุด)",
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
        # ขั้นที่ 1: หาตัวกลางด้วย fast & slow
        slow = head
        fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        # ตอนนี้ slow อยู่ที่หัวของครึ่งหลังพอดี

        # ขั้นที่ 2: กลับทิศครึ่งหลัง (เหมือนข้อ 31)
        prev = None
        cur = slow
        while cur:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
        # prev คือ head ของครึ่งหลังที่กลับทิศแล้ว

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
                ["reverse ครึ่งหลัง", "reverse 2 → 1 ให้เป็น 1 → 2", "prev = หัวใหม่ (ค่า 1)"],
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
              c: 'เคส "pointer ไขว้ตรงรอยต่อกลาง":',
            },
            {
              t: "ul",
              c: [
                "หลัง reverse ครึ่งหลัง pointer ตรงรอยต่ออาจไขว้กันนิดหน่อย",
                "ไม่กระทบ เพราะเราเดินแค่ n/2 ก้าวแล้วหยุดเมื่อ second เป็น None พอดี",
              ],
            },
            {
              t: "callout",
              title: "เริ่ม best = 0 ได้ไหม?",
              c: "ได้ เพราะโจทย์นี้ค่าใน node เป็นบวกเสมอ — ถ้าโจทย์อนุญาตค่าติดลบควรเริ่มด้วยคู่แรกแทน",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — หากลาง + reverse ครึ่งหลัง + traverse บวก ล้วนเป็นเชิงเส้น",
                "Space O(1) — update pointer ในที่เดิม ไม่ได้ copy ค่าไปเก็บใน list ใหม่",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "โจทย์ยาก ๆ ของ linked list มักเป็นการประกอบร่างเทคนิคพื้นฐานหลายอันเข้าด้วยกัน (หากลาง + reverse + traverse สองสาย) — ถ้าท่าพื้นฐานแต่ละอันแม่น การต่อจิ๊กซอว์แบบนี้จะง่ายขึ้นมาก",
            },
          ],
        },
      ],
      en: [],
    },
  },
};
