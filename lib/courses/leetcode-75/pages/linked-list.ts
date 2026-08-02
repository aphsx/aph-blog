import type { Page } from "@/lib/types";

export const linkedListPages: Record<string, Page> = {
  "lc75-intro-linked-list": {
    slug: "lc75-intro-linked-list",
    title: { th: "Linked List — พื้นฐาน & แนวคิด", en: "" },
    lead: { th: "ปูพื้นจากศูนย์ว่า linked list คืออะไร node (โหนด) กับ pointer (ตัวชี้) ทำงานยังไง traverse (เดินไล่) ไปมาบนมันแบบไหน ก่อนลงมือทำโจทย์จริง 4 ข้อ", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "Linked List (ลิสต์เชื่อมโยง) เป็น data structure (โครงสร้างข้อมูล) พื้นฐานที่เจอบ่อยมากในการสัมภาษณ์งาน แนวคิดมันต่างจาก list ของ Python ที่เราคุ้นเคยพอสมควร ถ้าคุณยังไม่เคยรู้จักมาก่อนก็ไม่ต้องกังวล หน้านี้จะค่อย ๆ ปูพื้นจากศูนย์ให้เข้าใจว่ามันคืออะไร ทำไมถึงมี แล้วเรา traverse (เดินไล่) ไปมาบนมันยังไง ก่อนจะลงมือทำโจทย์จริง 4 ข้อ" },

              { t: "h2", c: "linked list คืออะไร" },

              { t: "h3", c: "array/list ต่างจาก linked list ยังไง" },
              { t: "p", c: "list ของ Python (เบื้องหลังคือ array (ลิสต์)) เก็บข้อมูลไว้ติดกันเป็นแถวยาวในหน่วยความจำ เหมือนตู้ล็อกเกอร์เรียงกันเป็นแถว ช่องที่ index (ตำแหน่ง) 0, 1, 2, 3 ... อยู่ติดกันหมด ข้อดีคือถ้าเราอยากได้ช่อง index 5 คอมพิวเตอร์คำนวณตำแหน่งได้ทันทีจากที่อยู่เริ่มต้นบวกด้วย 5 จึง access (เข้าถึง) ได้ในเวลาคงที่ O(1) โดยไม่ต้อง iterate (วน) ดูตัวก่อนหน้าเลย" },
              { t: "p", c: "linked list ต่างออกไป มันไม่ได้วางข้อมูลติดกัน แต่เป็นก้อนข้อมูลเล็ก ๆ เรียกว่า node (โหนด) ที่กระจายอยู่คนละที่ในหน่วยความจำ แต่ละ node เก็บสองอย่าง คือ (1) value (ค่า) ของตัวมันเอง และ (2) pointer (ตัวชี้) หนึ่งตัวที่ชี้ไปยัง node ตัวถัดไป พูดง่าย ๆ คือมันเหมือนการล่าสมบัติ แต่ละจุดจะบอกใบ้ว่าจุดต่อไปอยู่ตรงไหน เราต้องเดินตามลูกศรไปทีละก้าว จะกระโดดข้ามไปกลาง ๆ เลยไม่ได้" },
              { t: "p", c: "หน้าตาของ linked list ที่มีค่า 1 → 2 → 3 วาดเป็นภาพได้ประมาณนี้ ช่องซ้ายของแต่ละ node คือ value ช่องขวาคือ pointer ที่ชี้ไป node ถัดไป ตัวสุดท้ายชี้ไป None แปลว่าจบ list แล้ว" },
              { t: "code", lang: "text", c: `[1|•]───▶[2|•]───▶[3|•]───▶ None
         ▲
        head (จุดเริ่มต้น เก็บไว้ที่ node ตัวแรก)` },

              { t: "h3", c: "node หน้าตายังไงใน Python" },
              { t: "p", c: "เราสร้าง node ด้วย class (คลาส) เล็ก ๆ ชื่อ ListNode (นี่คือชื่อมาตรฐานที่ LeetCode ใช้) แต่ละตัวเก็บ field ชื่อ val (ค่า) กับ next (pointer ชี้ node ถัดไป ถ้าไม่มีตัวถัดไปก็เป็น None)" },
              { t: "code", lang: "python", c: `class ListNode:
            def __init__(self, val=0, next=None):
                self.val = val        # ค่าที่ node นี้เก็บ
                self.next = next      # pointer ชี้ node ถัดไป (None ถ้าเป็นตัวสุดท้าย)

        # สร้างลิสต์ 1 -> 2 -> 3 ด้วยมือ
        a = ListNode(1)
        b = ListNode(2)
        c = ListNode(3)
        a.next = b      # ให้ node 1 ชี้ไป node 2
        b.next = c      # ให้ node 2 ชี้ไป node 3
        # a คือ head ของลิสต์นี้ (c.next เป็น None อยู่แล้ว)` },

              { t: "h3", c: "การเดินบน linked list (traverse)" },
              { t: "p", c: "เพราะ node กระจายอยู่คนละที่ เราจึง access ตำแหน่งตรง ๆ แบบ nums[5] ไม่ได้ วิธีเดียวที่จะไปถึง node กลาง ๆ คือเริ่มจาก head (หัว) แล้ว traverse ตาม pointer next ไปเรื่อย ๆ ทีละก้าวจนกว่าจะเจอ None pattern (แพตเทิร์น) การเดินที่ต้องจำให้ขึ้นใจคือใช้ pointer ชื่อ cur (current) เริ่มที่ head แล้ว loop (วน) จนกว่า cur จะเป็น None" },
              { t: "code", lang: "python", c: `cur = head
        while cur:                 # วนจนกว่าจะเดินตกขอบ (เจอ None)
            print(cur.val)        # ทำอะไรกับ node ตัวปัจจุบัน
            cur = cur.next        # ก้าวไป node ถัดไป — หัวใจของการเดิน` },
              { t: "callout", title: "ทำไม access ด้วย index ตรง ๆ ไม่ได้", c: "เพราะ node ไม่ได้เรียงติดกันในหน่วยความจำ คอมพิวเตอร์เลยคำนวณ 'ที่อยู่ของ node ที่ index 5' ไม่ได้เหมือน array มันรู้แค่ที่อยู่ของ node ตัวแรก (head) และแต่ละ node รู้แค่ว่าตัวถัดไปอยู่ที่ไหน การจะไปถึง node ที่ index 5 จึงต้อง traverse ผ่านตัวที่ 0,1,2,3,4 ก่อนเสมอ เป็น O(n)" },

              { t: "h2", c: "เทคนิคที่ใช้บ่อยกับ linked list" },
              { t: "ul", c: [
                "dummy head (โหนดหลอก) — สร้าง node ปลอมวางไว้หน้าสุดของ list แล้วให้ dummy.next ชี้ไป head จริง ประโยชน์คือทำให้ 'การ delete (ลบ) / insert (แทรก) ที่หัว list' ไม่ต้องเขียน edge case (เคสพิเศษ) เพราะทุก node (รวมตัวแรกจริง) มีตัวข้างหน้าให้อ้างถึงเสมอ พอทำเสร็จเราคืน dummy.next เป็นคำตอบ",
                "two pointers (ตัวชี้สองตัว) prev / cur — traverse สอง node พร้อมกัน โดย prev ตามหลัง cur หนึ่งก้าว ใช้ตอนต้อง update (แก้) pointer เช่น reverse (กลับทิศ) list หรือเชื่อม prev.next ข้าม node ที่จะ delete",
                "fast & slow pointer (ตัวชี้เร็ว-ช้า) — two pointers เดินคนละความเร็ว slow เดินทีละ 1 ก้าว fast เดินทีละ 2 ก้าว เมื่อ fast เดินถึงปลาย list slow จะอยู่ตรงกลางพอดี ใช้หา middle node (โหนดกลาง) หรือ detect (ตรวจ) ว่า list วนเป็น cycle (วง) หรือไม่",
              ] },
              { t: "p", c: "โครงเดินพื้นฐานที่เจอซ้ำแทบทุกข้อในหมวดนี้คือ while loop ที่ขยับ pointer ไปข้างหน้าทีละก้าว จำโครงนี้ให้ขึ้นใจแล้วต่อยอดได้ทุกข้อ" },
              { t: "code", lang: "python", c: `# โครงร่วมของหมวดนี้: เดินด้วยตัวชี้คู่ / fast-slow
        prev = None
        cur = head
        while cur:
            nxt = cur.next     # จำตัวถัดไปไว้ก่อนเสมอ (กันหลุดลิสต์เวลาแก้ pointer)
            # ... แก้ pointer หรืออ่านค่าตรงนี้ ...
            prev = cur         # ขยับ prev ตาม
            cur = nxt          # ขยับ cur ไปตัวที่จำไว้` },

              { t: "h2", c: "Big-O เทียบ array กับ linked list" },
              { t: "table", head: ["operation (การทำงาน)", "array / Python list", "linked list"], rows: [
                ["access ตำแหน่งที่ index i", "O(1) คำนวณที่อยู่ได้ทันที", "O(n) ต้อง traverse จาก head"],
                ["insert ที่หัว (หน้าสุด)", "O(n) ต้อง shift ทุกตัวถอยไปหนึ่งช่อง", "O(1) แค่สร้าง node ใหม่ให้ชี้ head เดิม"],
                ["delete ที่หัว (หน้าสุด)", "O(n) ต้อง shift ทุกตัวถอยมาหนึ่งช่อง", "O(1) แค่ขยับ head ไปตัวถัดไป"],
              ] },
              { t: "p", c: "สรุปคือ array เก่งเรื่อง access ด้วย index ส่วน linked list เก่งเรื่อง insert / delete ตรงหัว (หรือจุดที่เรามี pointer อยู่แล้ว) โดยไม่ต้อง shift ของทั้งแถว โจทย์ในหมวดนี้จะเน้นการ traverse และ update pointer ให้คล่อง" },

              { t: "callout", title: "พร้อมเริ่มหรือยัง", c: "หมวดนี้มี 4 ข้อ เรียงจากง่ายไปยาก (delete middle node → odd even → reverse list → twin sum) ทุกข้อวนอยู่รอบการ update pointer และ two pointers ทั้งนั้น พร้อมแล้วกดถัดไปเริ่มข้อแรกได้เลย" },
      ],
      en: [],
    },
  },

  "lc75-p29": {
    slug: "lc75-p29",
    title: { th: "ข้อ 29 · LC2095 Delete the Middle Node of a Linked List (ลบโหนดกลาง) 🟡", en: "" },
    lead: { th: "หา middle node ด้วย fast & slow pointer ในรอบเดียว แล้ว update pointer ของตัวก่อนหน้าให้กระโดดข้ามมันทิ้ง", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC2095): กำหนด head ของ linked list มาให้ ให้ลบ (delete) node ตัวกลางออกจาก list แล้ว return head ของ list ที่แก้ไขแล้ว โดยนิยามตัวกลางของ list ขนาด n คือ node ลำดับที่ ⌊n/2⌋ นับ index จาก 0 (เช่น n = 1, 2, 3, 4, 5 ตัวกลางคือ index 0, 1, 1, 2, 2 ตามลำดับ)" },
              {
                t: "example",
                c: [
                  { input: "head = [1,3,4,7,1,2,6]", output: "[1,3,4,1,2,6]", explain: "list นี้มี n = 7 ตัว ตัวกลางอยู่ที่ index ⌊7/2⌋ = 3 ซึ่งคือ node ค่า 7 ลบออกแล้วเหลือ [1,3,4,1,2,6]" },
                  { input: "head = [1,2,3,4]", output: "[1,2,4]", explain: "list นี้มี n = 4 ตัว ตัวกลางอยู่ที่ index ⌊4/2⌋ = 2 ซึ่งคือ node ค่า 3 ลบออกแล้วเหลือ [1,2,4]" },
                  { input: "head = [1]", output: "[]", explain: "list มี node เดียว (n = 1) ตัวกลางคือ index ⌊1/2⌋ = 0 ซึ่งคือตัวมันเอง ลบออกแล้วเหลือ list ว่าง" },
                ],
              },
              {
                t: "constraints",
                c: [
                "จำนวน node อยู่ระหว่าง 1 ถึง 10^5",
                "1 <= Node.val <= 10^5",
                ],
              },
              { t: "callout", title: "เงื่อนไข", c: "โจทย์การันตีว่า head ไม่เป็น None ตั้งแต่แรก (มีอย่างน้อย 1 node) จึงเข้าถึง head.next ได้อย่างปลอดภัยโดยไม่ต้องเช็ค head ก่อน" },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "โครงสร้าง/เทคนิคที่ต้องใช้: fast & slow pointer (ตัวชี้เร็ว-ช้า) สองตัวเดินคนละความเร็ว บวกกับ pointer ชื่อ prev ไว้ track (จำ) node ก่อนหน้าตัวกลาง เหตุผลที่เลือกอันนี้เพราะเราอยากได้ตำแหน่งกลางโดย traverse (เดินไล่) list แค่รอบเดียว (ไม่ต้อง count (นับ) n ก่อนแล้วค่อยเดินซ้ำอีกรอบ)" },
              { t: "p", c: "คิดแบบง่ายก่อน: เราจะเดินรอบแรกเพื่อ count ว่ามีทั้งหมดกี่ตัว (ได้ n) แล้วเดินรอบสองไปหยุดที่ index floor(n/2) เพื่อ delete วิธีนี้ถูกต้องแต่ต้อง traverse list สองรอบ ไอเดียที่ดีกว่าคือใช้ fast/slow ทำให้จบในรอบเดียว เพราะ fast เดินเร็วเป็นสองเท่า พอ fast ถึงปลาย slow จะมาหยุดที่กลางพอดี" },
              { t: "ol", c: [
                "เช็ค edge case (เคสพิเศษ) ก่อน ถ้า list มี node เดียว (head.next เป็น None) ลบแล้วเหลือว่าง return None ทันที",
                "initialize (ตั้งค่าเริ่มต้น) pointer สามตัว prev (เริ่มเป็น None), slow และ fast (ทั้งคู่เริ่มที่ head)",
                "loop (วน) ตราบใดที่ fast และ fast.next ยังไม่เป็น None แต่ละรอบ ให้ prev จำตำแหน่ง slow ปัจจุบันไว้ แล้วขยับ slow ไป 1 ก้าว และ fast ไป 2 ก้าว",
                "พอออกจาก loop slow จะอยู่ที่ตัวกลาง และ prev อยู่ที่ตัวก่อนหน้าพอดี",
                "สั่ง prev.next ให้ชี้ข้าม slow ไปหา slow.next (กระโดดข้ามตัวกลางทิ้ง) แล้ว return head",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", warn: true, c: "ถ้าไม่ดักกรณี node เดียวไว้ก่อน loop จะไม่ทำงานเลย (fast.next เป็น None ตั้งแต่แรก) ทำให้ prev ยังเป็น None แล้วบรรทัด prev.next จะพังทันที (AttributeError) เพราะ None ไม่มี attribute next" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "ลอง traverse กับ 1 → 3 → 4 → 7 → 1 → 2 → 6 (7 ตัว) ดูค่า prev/slow/fast เปลี่ยนไปทุกรอบของ loop" },
              { t: "table", head: ["รอบ", "prev (ค่า)", "slow (ค่า)", "fast (ค่า)", "fast.next มีไหม"], rows: [
                ["ก่อนลูป", "None", "1", "1", "มี"],
                ["รอบ 1", "1", "3", "4", "มี"],
                ["รอบ 2", "3", "4", "1", "มี"],
                ["รอบ 3", "4", "7", "6", "ไม่มี → หยุด"],
                ["หลังลูป", "4", "7 (ตัวกลาง)", "6", "ลบ 7: ให้ 4.next ชี้ไป 1"],
              ] },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ class นี้มาให้แล้ว ที่เขียนไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
        class ListNode:
            def __init__(self, val=0, next=None):
                self.val = val
                self.next = next


        # นิยาม node มาตรฐานของ LeetCode (โจทย์ให้มาแล้ว ไม่ต้องเขียนเอง)
        # class ListNode:
        #     def __init__(self, val=0, next=None):
        #         self.val = val        # ค่าที่ node นี้เก็บ
        #         self.next = next      # pointer ชี้ node ถัดไป (None ถ้าเป็นตัวสุดท้าย)

        def delete_middle(head):
            # ถ้ามี node เดียว ลบแล้วเหลือว่าง
            if head.next is None:
                return None

            prev = None                 # จะให้ชี้ node ก่อนตัวกลาง
            slow = head                 # เดินทีละ 1 ก้าว -> จบที่ตัวกลาง
            fast = head                 # เดินทีละ 2 ก้าว
            while fast and fast.next:
                prev = slow
                slow = slow.next        # slow ขยับ 1
                fast = fast.next.next   # fast ขยับ 2
            # ตอนนี้ slow คือตัวกลาง, prev คือตัวก่อนหน้า
            prev.next = slow.next       # ข้ามตัวกลางทิ้งไป
            return head

        # ทดสอบ 1->3->4->7->1->2->6 (ลบ 7)
        vals = [1, 3, 4, 7, 1, 2, 6]
        head = None
        for v in reversed(vals):
            head = ListNode(v, head)
        head = delete_middle(head)
        out = []
        while head:
            out.append(head.val)
            head = head.next
        print(out)   # [1, 3, 4, 1, 2, 6]`, out: `[1, 3, 4, 1, 2, 6]` },
                { t: "p", c: "เคล็ดลับ fast & slow คือ fast เดินเร็วเป็นสองเท่าของ slow เสมอ ดังนั้นตอน fast วิ่งไปสุด list slow จะเดินได้แค่ครึ่งทางพอดี ก็คือ middle node เงื่อนไข while fast and fast.next ทำให้ loop หยุดถูกจังหวะทั้งกรณีจำนวน node เป็นเลขคู่และเลขคี่ ถ้าเขียนแค่ while fast จะพัง เพราะบรรทัด fast.next.next จะไปอ้าง .next ของ None เมื่อ fast วิ่งเลยขอบ" },
                { t: "p", c: "แต่แค่รู้ตัวกลางยัง delete ไม่ได้ เพราะ linked list การลบ node ต้อง update pointer ของ 'ตัวก่อนหน้า' ให้กระโดดข้ามไปหาตัวถัดจากกลาง เราจึง track prev ไว้ทุกก้าว (บรรทัด prev = slow ต้องมาก่อนขยับ slow) แล้วสั่ง prev.next = slow.next เพื่อข้ามตัวกลางทิ้ง เมื่อไม่มีใครชี้มาที่ตัวกลางแล้ว มันก็หลุดออกจาก list ไปเอง" },
                { t: "p", c: "edge case สำคัญคือ list มี node เดียว ถ้าไม่ดักไว้ prev จะยังเป็น None แล้วโค้ด prev.next จะพัง เราจึงเช็ค head.next is None ตั้งแต่ต้นแล้ว return None ทันที (โจทย์การันตีว่า head ไม่เป็น None ตั้งแต่แรก จึง access head.next ได้อย่างปลอดภัย)" },
                { t: "p", c: "Time O(n) traverse ผ่าน list รอบเดียว · Space O(1) ใช้แค่ pointer ไม่กี่ตัว ไม่สร้าง list ใหม่" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "fast & slow pointer หา middle node ของ linked list ได้ในรอบเดียว และเวลาจะ delete / update node ใน linked list ต้องมี pointer ไปที่ 'ตัวก่อนหน้า' เสมอ สองไอเดียนี้ใช้ซ้ำได้อีกหลายข้อ" },
      ],
      en: [],
    },
  },

  "lc75-p30": {
    slug: "lc75-p30",
    title: { th: "ข้อ 30 · LC328 Odd Even Linked List (จัดโหนดคี่-คู่) 🟡", en: "" },
    lead: { th: "ร้อยสายใหม่จาก node เดิมสองสาย (index คี่กับ index คู่) แล้ว append หางสายคี่เข้ากับหัวสายคู่ ด้วย Space O(1)", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC328): กำหนด head ของ singly linked list มาให้ ให้ group node ที่มี index เป็นเลขคี่มาไว้ด้วยกัน ตามด้วย node ที่มี index เป็นเลขคู่ แล้ว return list ที่จัดลำดับใหม่แล้ว โดยนิยามให้ node ตัวแรกเป็นคี่ (index 1) ตัวที่สองเป็นคู่ (index 2) ไล่ไปเรื่อย ๆ ลำดับสัมพัทธ์ภายในกลุ่มคี่และกลุ่มคู่ต้องคงเดิมเหมือนใน input ต้องแก้ปัญหาด้วย space complexity O(1) และ time complexity O(n)" },
              {
                t: "example",
                c: [
                  { input: "head = [1,2,3,4,5]", output: "[1,3,5,2,4]", explain: "ตำแหน่งคี่ (index 1,3,5) คือค่า 1,3,5 มาก่อน ตามด้วยตำแหน่งคู่ (index 2,4) คือค่า 2,4" },
                  { input: "head = [2,1,3,5,6,4,7]", output: "[2,3,6,7,1,5,4]", explain: "ตำแหน่งคี่ (index 1,3,5,7) คือค่า 2,3,6,7 มาก่อน ตามด้วยตำแหน่งคู่ (index 2,4,6) คือค่า 1,5,4" },
                ],
              },
              {
                t: "constraints",
                c: [
                "จำนวน node อยู่ระหว่าง 0 ถึง 10^4",
                "-10^6 <= Node.val <= 10^6",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "โครงสร้าง/เทคนิคที่ต้องใช้: two pointers (ตัวชี้สองตัว) odd กับ even สานสลับกันไป โดยไม่สร้าง node ใหม่เลย แค่ 'เย็บ' pointer (ตัวชี้) ใหม่จาก node เดิม เหตุผลที่ต้องทำแบบนี้เพราะโจทย์บังคับ Space O(1) เราจึง copy ค่าไปใส่ list ใหม่ไม่ได้" },
              { t: "p", c: "คิดแบบง่ายก่อน: ถ้าไม่ติดข้อจำกัด space เราแค่ traverse (เดินไล่) list เก็บค่า index คี่ไว้ list หนึ่ง ค่า index คู่ไว้อีก list แล้ว append (ต่อท้าย) กันสร้าง list ใหม่ ง่ายมากแต่ใช้ Space O(n) ผิดเงื่อนไข ไอเดียที่ดีกว่าคือแทนที่จะ copy ค่า เราขยับ pointer ของ node เดิมให้สานเป็นสองสายในที่เดิม (in-place) เลย" },
              { t: "ol", c: [
                "ดัก edge case (เคสพิเศษ) ก่อน ถ้า list ว่างหรือมี node เดียว return head เลย",
                "initialize (ตั้งค่าเริ่มต้น) odd ชี้ที่ตัวแรก (index 1) และ even ชี้ที่ตัวที่สอง (index 2) พร้อม track หัวสายคู่ไว้ในตัวแปร even_head เพื่อเอาไป append ทีหลัง",
                "loop (วน) ตราบใดที่ even และ even.next ยังไม่เป็น None แต่ละรอบ: ให้ odd.next ข้ามไปเกาะตัวคี่ถัดไป (คือ even.next) แล้วขยับ odd, จากนั้นให้ even.next ข้ามไปเกาะตัวคู่ถัดไป (คือ odd.next ตัวใหม่) แล้วขยับ even",
                "พอออกจาก loop สายคี่กับสายคู่แยกกันเรียบร้อย append หางสายคี่ (odd.next) เข้ากับหัวสายคู่ (even_head)",
                "return head (ซึ่งยังเป็นตัวแรกเดิม = หัวสายคี่)",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", warn: true, c: "ลืม track even_head ตั้งแต่ต้นเป็นความพลาดอันดับหนึ่ง เพราะระหว่าง loop pointer ของสายคู่ถูก update ไปเรื่อย ๆ ถ้าไม่จำหัวไว้ก่อนจะหาไม่เจอว่าปลายสายคี่ต้องไป append กับตัวไหน อีกจุดคือเงื่อนไข while ต้องเช็คทั้ง even และ even.next เพื่อกันการอ้าง .next ของ None ตอนจำนวน node เป็นเลขคี่/คู่" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "ลอง traverse กับ 1 → 2 → 3 → 4 → 5 (even_head จำไว้ที่ค่า 2 ตั้งแต่ต้น) ดูค่า odd/even เปลี่ยนไปทุกรอบ" },
              { t: "table", head: ["รอบ", "odd (ค่า)", "even (ค่า)", "even.next มีไหม", "สายที่เย็บได้ตอนนี้"], rows: [
                ["ก่อนลูป", "1", "2", "มี (3)", "1→2→3→4→5"],
                ["รอบ 1", "3", "4", "มี (5)", "คี่: 1→3, คู่: 2→4"],
                ["รอบ 2", "5", "4", "ไม่มี → หยุด", "คี่: 1→3→5, คู่: 2→4"],
                ["หลังลูป", "5", "-", "-", "odd.next=even_head → 1→3→5→2→4"],
              ] },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ class นี้มาให้แล้ว ที่เขียนไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
        class ListNode:
            def __init__(self, val=0, next=None):
                self.val = val
                self.next = next


        def odd_even_list(head):
            if head is None or head.next is None:
                return head             # 0 หรือ 1 node ไม่ต้องทำอะไร

            odd = head                  # ตัวชี้สายตำแหน่งคี่ (เริ่มที่ตัวที่ 1)
            even = head.next            # ตัวชี้สายตำแหน่งคู่ (เริ่มที่ตัวที่ 2)
            even_head = even            # จำหัวสายคู่ไว้ เพื่อเอาไปต่อทีหลัง

            while even and even.next:
                odd.next = even.next    # คี่ข้ามไปเกาะตัวคี่ถัดไป
                odd = odd.next          # ขยับตัวชี้คี่
                even.next = odd.next    # คู่ข้ามไปเกาะตัวคู่ถัดไป
                even = even.next        # ขยับตัวชี้คู่

            odd.next = even_head        # ต่อหางสายคี่เข้ากับหัวสายคู่
            return head

        # ทดสอบ 1->2->3->4->5
        head = None
        for v in reversed([1, 2, 3, 4, 5]):
            head = ListNode(v, head)
        head = odd_even_list(head)
        out = []
        while head:
            out.append(head.val)
            head = head.next
        print(out)   # [1, 3, 5, 2, 4]`, out: `[1, 3, 5, 2, 4]` },
                { t: "p", c: "ไอเดียคือเราไม่สร้าง node ใหม่ แต่ 'ร้อยสายใหม่' จาก node เดิมสองสาย สาย odd เก็บตัว index 1,3,5 สาย even เก็บตัว 2,4,6 ในหนึ่งก้าวของ loop เราเชื่อม odd ให้ข้ามตัวคู่ที่คั่นอยู่ไปเกาะตัวคี่ถัดไป แล้วเชื่อม even ให้ข้ามตัวคี่ไปเกาะตัวคู่ถัดไป สลับกันแบบนี้จนหมด" },
                { t: "p", c: "จุดฉลาดที่ต้องสังเกตคือบรรทัด even.next = odd.next ใช้ค่า odd ที่ 'เพิ่งขยับใหม่' ในบรรทัดก่อนหน้า ทำให้ even รู้ว่าตัวคู่ถัดไปอยู่ตรงไหน order (ลำดับ) สี่บรรทัดใน loop จึงสลับกันไม่ได้ ต้องขยับ odd ให้เสร็จก่อนถึงจะใช้ odd.next มาหาตัวคู่ถัดไปได้ถูก ถ้าสลับลำดับจะได้ pointer ผิดตัวทันที" },
                { t: "p", c: "จุดพลาดบ่อยคือลืม track even_head ไว้ตั้งแต่ต้น เพราะระหว่าง loop pointer ของสายคู่ถูก update ไปเรื่อย ๆ ถ้าไม่จำหัวไว้ก่อนจะหาไม่เจอว่าจะเอาปลายสายคี่ไป append กับตัวไหน อีกจุดคือเงื่อนไข while even and even.next ต้องเช็คทั้งคู่ เพื่อกันกรณีจำนวน node คี่/คู่ไม่ให้อ้าง .next ของ None และต้องดัก 0 หรือ 1 node ตั้งแต่ต้นด้วย" },
                { t: "p", c: "Time O(n) traverse ผ่านทุก node รอบเดียว · Space O(1) แค่ swap (สลับ) pointer ไม่สร้าง list ใหม่" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "การ 'แยก list เป็นหลายสายในที่เดิม (in-place)' ด้วยการสาน pointer สลับกัน แล้วค่อย append กลับ เป็น pattern ที่ประหยัด space มาก กุญแจคือ track หัวของสายที่จะเอาไป append ทีหลังไว้เสมอ" },
      ],
      en: [],
    },
  },

  "lc75-p31": {
    slug: "lc75-p31",
    title: { th: "ข้อ 31 · LC206 Reverse Linked List (กลับ Linked List) 🟢", en: "" },
    lead: { th: "พื้นฐานที่สุดของหมวด traverse ทีละ node แล้ว reverse pointer ให้ชี้ย้อนกลับ ด้วย two pointers prev/cur — โจทย์ข้ออื่นต่อยอดจากท่านี้", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC206): กำหนด head ของ singly linked list มาให้ ให้ reverse (กลับทิศ) ทั้ง list แล้ว return head ตัวใหม่ของ list ที่ reverse แล้ว" },
              {
                t: "example",
                c: [
                  { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
                  { input: "head = [1,2]", output: "[2,1]" },
                  { input: "head = []", output: "[]", explain: "list ว่าง reverse แล้วยังว่างเหมือนเดิม โค้ดคืนค่าถูกต้องโดยอัตโนมัติโดยไม่ต้องดัก edge case พิเศษ" },
                ],
              },
              {
                t: "constraints",
                c: [
                "จำนวน node อยู่ระหว่าง 0 ถึง 5000",
                "-5000 <= Node.val <= 5000",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "โครงสร้าง/เทคนิคที่ต้องใช้: two pointers (ตัวชี้สองตัว) prev กับ cur traverse (เดินไล่) ทีละ node แล้ว reverse pointer ของ cur ให้ชี้ย้อนกลับไปหา prev แทนที่จะชี้ไปข้างหน้า เหตุผลที่เลือกวิธีนี้เพราะมันใช้ Space O(1) (ไม่ต้องสร้าง list ใหม่ ไม่ต้องใช้ stack หรือ recursion (การเรียกตัวเอง) ที่กิน memory เพิ่ม)" },
              { t: "p", c: "คิดแบบง่ายก่อน: เราจะ traverse เก็บค่าทุก node ใส่ list แล้ว reverse list นั้น จากนั้นสร้าง linked list ใหม่ วิธีนี้ได้คำตอบถูกแต่ใช้ Space O(n) ไอเดียที่ดีกว่าคือไม่ต้องย้ายค่าเลย แค่ traverse ไป reverse ลูกศรของแต่ละ node ให้ชี้ย้อนหลังในที่เดิม (in-place)" },
              { t: "ol", c: [
                "initialize (ตั้งค่าเริ่มต้น) pointer prev เป็น None (ข้างหลัง cur ตอนแรกยังไม่มีอะไร) และ cur ชี้ที่ head",
                "loop (วน) ตราบใดที่ cur ยังไม่เป็น None",
                "ใน loop: track (จำ) node ถัดไปไว้ก่อน (nxt = cur.next) เพราะเดี๋ยวเราจะทับ cur.next",
                "reverse pointer ของ cur ให้ชี้ย้อนกลับไปหา prev (cur.next = prev)",
                "ขยับ prev ตามมาที่ cur แล้วขยับ cur ไปที่ nxt ที่ track ไว้",
                "จบ loop prev จะค้างอยู่ที่ node สุดท้ายที่ reverse ซึ่งคือ head ตัวใหม่ return prev",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", warn: true, c: "ลืม track cur.next ไว้ก่อน พอสั่ง cur.next = prev ปุ๊บ pointer เดิมที่ชี้ไปข้างหน้าจะหายทันที traverse ต่อไม่ได้ ดังนั้นบรรทัด nxt = cur.next ต้องมาก่อนเสมอ และตอนจบต้อง return prev ไม่ใช่ cur (ตอนนั้น cur เป็น None ไปแล้ว)" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "ลอง traverse กับ 1 → 2 → 3 ดูค่า prev/cur/nxt เปลี่ยนไปทุกรอบ" },
              { t: "table", head: ["รอบ", "cur (ค่า)", "nxt (จำไว้)", "หลังพลิก cur.next ชี้ไป", "prev หลังรอบนี้"], rows: [
                ["ก่อนลูป", "1", "-", "-", "None"],
                ["รอบ 1", "1", "2", "None", "1"],
                ["รอบ 2", "2", "3", "1", "2"],
                ["รอบ 3", "3", "None", "2", "3"],
                ["หลังลูป", "None → หยุด", "-", "-", "3 = head ใหม่"],
              ] },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ class นี้มาให้แล้ว ที่เขียนไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
        class ListNode:
            def __init__(self, val=0, next=None):
                self.val = val
                self.next = next


        def reverse_list(head):
            prev = None                 # ข้างหลัง cur (ตอนแรกยังไม่มีอะไร)
            cur = head                  # node ที่กำลังพิจารณา
            while cur:
                nxt = cur.next          # 1) จำ node ถัดไปไว้ก่อน (กันหลุดลิสต์)
                cur.next = prev         # 2) พลิก pointer ให้ชี้ย้อนกลับ
                prev = cur              # 3) ขยับ prev ตามมา
                cur = nxt               # 4) ขยับ cur ไปตัวที่จำไว้
            return prev                 # จบ loop prev คือ head ตัวใหม่

        # ทดสอบ: สร้าง 1->2->3 แล้วกลับทิศ
        n3 = ListNode(3)
        n2 = ListNode(2, n3)
        n1 = ListNode(1, n2)
        r = reverse_list(n1)
        out = []
        while r:
            out.append(r.val)
            r = r.next
        print(out)   # [3, 2, 1]`, out: `[3, 2, 1]` },
                { t: "p", c: "ไอเดียคือ traverse ไปทีละ node แล้ว reverse ลูกศรของแต่ละตัวให้ชี้ย้อนหลังแทน จุดที่คนใหม่พลาดบ่อยคือลืม track cur.next ไว้ก่อน พอเราสั่ง cur.next = prev ปุ๊บ pointer เดิมที่ชี้ไปข้างหน้าจะหายไปทันที เราจึงจะ traverse ต่อไม่ได้ ดังนั้นบรรทัด nxt = cur.next ต้องมาก่อนเสมอ ลองนึกภาพว่าเรากำลังเดินข้ามสะพานแล้วพับสะพานข้างหลังทิ้ง ต้องมองว่าก้าวต่อไปเหยียบตรงไหนให้เรียบร้อยก่อนพับ" },
                { t: "p", c: "order (ลำดับ) สี่บรรทัดใน loop (track next → reverse → ขยับ prev → ขยับ cur) สลับกันไม่ได้ ท่องให้ขึ้นใจแล้วจะใช้ซ้ำได้ในหลายโจทย์ เมื่อ cur เดินตกขอบเป็น None แล้ว prev จะค้างอยู่ที่ node สุดท้ายที่ reverse ไป ซึ่งก็คือ head ตัวใหม่พอดี ถ้าเผลอ return cur จะได้ None เพราะ cur ตกขอบไปแล้ว" },
                { t: "p", c: "Time O(n) traverse ผ่านทุก node หนึ่งรอบ · Space O(1) ใช้ pointer ไม่กี่ตัว ไม่สร้าง list ใหม่" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "การ reverse ด้วย prev/cur/nxt สี่บรรทัดคือท่ามาตรฐานที่ต้องท่องให้ขึ้นใจ หลายโจทย์ (เช่นข้อ 32) เอาไปใช้ reverse 'บางส่วน' ของ list ต่อ" },
      ],
      en: [],
    },
  },

  "lc75-p32": {
    slug: "lc75-p32",
    title: { th: "ข้อ 32 · LC2130 Maximum Twin Sum of a Linked List (ผลรวมคู่แฝดมากสุด) 🟡", en: "" },
    lead: { th: "รวมสามเทคนิค: หา middle node ด้วย fast/slow, reverse ครึ่งหลัง (ท่าจากข้อ 31), แล้ว traverse สองสายบวกทีละคู่", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC2130): ใน linked list ขนาด n ที่ n เป็นเลขคู่ นิยามว่า node ลำดับที่ i (นับจาก 0) คือ twin ของ node ลำดับที่ n-1-i เมื่อ 0 <= i <= (n/2)-1 นิยาม twin sum คือผลรวมของค่า node หนึ่งกับ twin ของมัน กำหนด head ของ linked list ที่มีความยาวเป็นเลขคู่มาให้ ให้ return ค่า twin sum ที่มากที่สุด" },
              {
                t: "example",
                c: [
                  { input: "head = [5,4,2,1]", output: "6", explain: "node 0 กับ node 3 เป็น twin กัน (5+1=6) และ node 1 กับ node 2 เป็น twin กัน (4+2=6) ทั้งคู่ได้ twin sum เท่ากันคือ 6" },
                  { input: "head = [4,2,2,3]", output: "7", explain: "node 0 (val=4) กับ node 3 (val=3) เป็น twin กัน ได้ twin sum = 7 ส่วน node 1 กับ node 2 ได้ twin sum = 4 ดังนั้นค่ามากสุดคือ max(7,4) = 7" },
                  { input: "head = [1,100000]", output: "100001", explain: "list มีแค่คู่ twin เดียวคือ node 0 กับ node 1 ผลรวม 1 + 100000 = 100001" },
                ],
              },
              {
                t: "constraints",
                c: [
                "จำนวน node เป็นเลขคู่เสมอ อยู่ระหว่าง 2 ถึง 10^5",
                "1 <= Node.val <= 10^5",
                ],
              },
              { t: "callout", title: "เงื่อนไข", c: "โจทย์การันตีว่าจำนวน node เป็นเลขคู่เสมอ (มีอย่างน้อย 2 ตัว) เราจึงไม่ต้องกังวลเรื่อง node กลางที่ไม่มีคู่ และครึ่งหน้ากับครึ่งหลังจะยาวเท่ากันพอดี" },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "โครงสร้าง/เทคนิคที่ต้องใช้: รวมสามเทคนิคเข้าด้วยกัน — fast/slow หา middle node (จากข้อ 29), การ reverse (กลับทิศ) list ด้วย prev/cur (จากข้อ 31), และการ traverse (เดินไล่) สองสายพร้อมกัน เหตุผลที่ต้อง reverse ครึ่งหลัง เพราะ linked list เดินย้อนกลับไม่ได้ เราจึง access (เข้าถึง) 'ตัวหลัง' ของแต่ละคู่ยาก ต้อง reverse ครึ่งหลังให้หันมาทางเดียวกับครึ่งหน้าก่อน" },
              { t: "p", c: "คิดแบบง่ายก่อน: traverse เก็บทุกค่าใส่ list ธรรมดา แล้วบวก vals[i] + vals[n-1-i] loop (วน) หา max วิธีนี้ตรงไปตรงมาแต่ใช้ Space O(n) ไอเดียที่ดีกว่าใช้ Space O(1) คือ update pointer ในที่เดิม (in-place): หากลาง แล้ว reverse ครึ่งหลัง แล้วเดินจากสองปลายเข้ามาบวกทีละคู่" },
              { t: "ol", c: [
                "ขั้นที่ 1 — หา middle node: ใช้ fast/slow เดิน พอ fast ตกขอบ slow จะมาหยุดที่ node แรกของครึ่งหลังพอดี (เพราะ n เป็นเลขคู่)",
                "ขั้นที่ 2 — reverse ครึ่งหลัง: เอาท่าจากข้อ 31 มา reverse list ที่เริ่มจาก slow ให้ได้ prev เป็นหัวของครึ่งหลังที่ reverse แล้ว (ตัวสุดท้ายเดิมมาอยู่หน้าสุด)",
                "ขั้นที่ 3 — traverse สองสายบวกทีละคู่: initialize (ตั้งค่าเริ่มต้น) first ที่ head (หัวครึ่งหน้า) และ second ที่ prev (หัวครึ่งหลังที่ reverse แล้ว) เดินพร้อมกัน แต่ละก้าว first.val + second.val คือ sum ของ twin คู่หนึ่ง track ค่ามากสุดด้วย max",
                "loop จนกว่า second จะเป็น None (ครึ่งหลังหมด) แล้ว return ค่ามากสุดที่ track ไว้",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", warn: true, c: "หลัง reverse ครึ่งหลังแล้ว pointer ตรงรอยต่อกลาง list จะไขว้กันนิดหน่อย ทำให้บางคนงงว่า loop จะวนไม่จบ แต่จริง ๆ ไม่กระทบ เพราะเราเดินแค่ n/2 ก้าวแล้วหยุดเมื่อ second เป็น None พอดี อีกจุดคือ initialize best = 0 ได้เพราะค่าใน node เป็นบวก แต่ถ้าโจทย์อนุญาตค่าติดลบควรเริ่มด้วยคู่แรกแทน" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "ลองกับ 5 → 4 → 2 → 1 (n=4) ดูสามขั้นตอนทำงาน" },
              { t: "table", head: ["ขั้นตอน", "สถานะ list / pointer", "ผลลัพธ์"], rows: [
                ["หา middle node (fast/slow)", "fast เดิน 2 ก้าวจนตกขอบ, slow หยุดที่ค่า 2", "slow = หัวครึ่งหลัง (2 → 1)"],
                ["reverse ครึ่งหลัง", "reverse 2 → 1 ให้เป็น 1 → 2", "prev = หัวครึ่งหลังใหม่ (ค่า 1)"],
                ["บวกคู่ที่ 1", "first=5, second=1", "5+1 = 6, best = 6"],
                ["บวกคู่ที่ 2", "first=4, second=2", "4+2 = 6, best = 6"],
                ["second เป็น None", "หยุดลูป", "คืน best = 6"],
              ] },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ class นี้มาให้แล้ว ที่เขียนไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
        class ListNode:
            def __init__(self, val=0, next=None):
                self.val = val
                self.next = next


        def pair_sum(head):
            # 1) หาตัวกลางด้วย fast & slow
            slow = head
            fast = head
            while fast and fast.next:
                slow = slow.next
                fast = fast.next.next
            # ตอนนี้ slow อยู่ที่หัวของครึ่งหลังพอดี (n เป็นเลขคู่เสมอ)

            # 2) กลับทิศครึ่งหลัง (เหมือนข้อ 31)
            prev = None
            cur = slow
            while cur:
                nxt = cur.next
                cur.next = prev
                prev = cur
                cur = nxt
            # prev คือ head ของครึ่งหลังที่กลับทิศแล้ว

            # 3) เดินสองสายพร้อมกัน บวกทีละคู่ เก็บค่ามากสุด
            best = 0
            first = head
            second = prev
            while second:               # ครึ่งหลังสั้นเท่ากับครึ่งหน้าพอดี
                best = max(best, first.val + second.val)
                first = first.next
                second = second.next
            return best

        # ทดสอบ 5->4->2->1
        head = None
        for v in reversed([5, 4, 2, 1]):
            head = ListNode(v, head)
        print(pair_sum(head))   # 6`, out: `6` },
                { t: "p", c: "โจทย์นี้ท้าทายตรงที่ linked list เดินย้อนกลับไม่ได้ เราจึง access 'ตัวหลัง' ของแต่ละคู่ยาก ทริกคือแบ่งงานเป็นสามขั้น ขั้นแรกใช้ fast/slow หาจุดกึ่งกลาง เพราะ n เป็นเลขคู่ พอ fast เดินตกขอบ slow จะมาหยุดที่ node แรกของครึ่งหลังพอดี ขั้นสอง reverse เฉพาะครึ่งหลัง (ใช้เทคนิคเป๊ะจากข้อ 31) พอ reverse แล้ว 'ตัวสุดท้ายของ list เดิม' จะกลายมาเป็นหัวของครึ่งหลัง ทำให้เรา traverse จากหัว (first) กับจากกลางที่ reverse (second) ควบคู่กันได้ ซึ่ง first.val กับ second.val ในแต่ละก้าวก็คือ twin กันพอดี" },
                { t: "p", c: "ขั้นสามแค่บวกทีละคู่แล้ว track ค่าที่มากที่สุดด้วย max เนื่องจากครึ่งหน้ากับครึ่งหลังยาวเท่ากัน (n เป็นเลขคู่) เราใช้เงื่อนไข while second เดินจนครึ่งหลังหมดได้เลย จุดที่คนใหม่งงบ่อยคือหลัง reverse ครึ่งหลังแล้ว pointer ตรงรอยต่อกลาง list จะไขว้กันนิดหน่อย แต่ไม่กระทบการนับคู่ เพราะเราเดินแค่ n/2 ก้าวจากสองปลายแล้วหยุดเมื่อ second หมดพอดี" },
                { t: "p", c: "Time O(n) หากลาง + reverse ครึ่งหลัง + traverse บวก ล้วนเป็นเชิงเส้น · Space O(1) update pointer ในที่เดิม (in-place) ไม่ได้ copy ค่าไปเก็บใน list ใหม่" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "โจทย์ยาก ๆ ของ linked list มักเป็นการ 'ประกอบร่าง' เทคนิคพื้นฐานหลายอันเข้าด้วยกัน (หากลาง + reverse + traverse สองสาย) ถ้าท่าพื้นฐานแต่ละอันแม่น การต่อจิ๊กซอว์แบบนี้จะง่ายขึ้นมาก" },
      ],
      en: [],
    },
  },
};
