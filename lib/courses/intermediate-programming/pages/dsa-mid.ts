import type { Page } from "@/lib/types";

const GROUP = "บทที่ 11: Data Structures & Algorithms ⭐";

export const dsaMidPages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "dsa-choose": {
    slug: "dsa-choose",
    title: "เลือกโครงสร้างให้ถูก & ทบทวน Big-O",
    lead: "เลือก data structure ให้เหมาะกับงานคือทักษะจริง — ทบทวน Big-O แล้วดูตารางเทียบ",
    group: GROUP,
    blocks: [
      { t: "p", c: "บทนี้คือหัวใจของคอร์ส — Data Structures & Algorithms เป็นพื้นฐานที่ทำให้เขียนโปรแกรมแก้ปัญหาได้ดีและมีประสิทธิภาพ หัวข้อแรกปูเรื่องการ \"เลือกของให้ถูก\" ซึ่งสำคัญกว่าการท่องสูตร" },

      { t: "h2", c: "ทบทวน Big-O" },
      { t: "p", c: "Big-O บอกว่าเมื่อข้อมูลโตขึ้น เวลา/หน่วยความจำโตตามแค่ไหน — ดูที่ \"อัตราการโต\" ไม่ใช่เวลาจริง" },
      {
        t: "table",
        head: ["Big-O", "ชื่อ", "ตัวอย่าง"],
        rows: [
          ["O(1)", "คงที่", "เข้าถึง list[i], dict[key]"],
          ["O(log n)", "ลอการิทึม", "binary search"],
          ["O(n)", "เชิงเส้น", "วน list หนึ่งรอบ"],
          ["O(n log n)", "", "sort ที่ดี"],
          ["O(n²)", "กำลังสอง", "loop ซ้อน"],
        ],
      },

      { t: "h2", c: "วิเคราะห์ Big-O ของโค้ดจริง (ลึกกว่าพื้นฐาน)" },
      { t: "p", c: "คอร์สพื้นฐานสอนให้รู้จัก Big-O แต่ละระดับ — ระดับนี้ต้อง \"อ่านโค้ดแล้วบอก Big-O ได้เอง\" หลักคือ: loop เดี่ยว = O(n), loop ซ้อน = คูณกัน, ตัวที่ไม่ขึ้นกับ n = ตัดทิ้ง เก็บเฉพาะพจน์ที่โตเร็วสุด" },
      { t: "code", lang: "python", c: "# O(n) — loop เดียว\nfor x in arr:\n    print(x)\n\n# O(n²) — loop ซ้อน (n * n)\nfor i in arr:\n    for j in arr:\n        print(i, j)\n\n# O(n) ไม่ใช่ O(2n) — ค่าคงที่ตัดทิ้ง\nfor x in arr: ...   # n\nfor x in arr: ...   # + n = 2n -> O(n)\n\n# O(n + m) — คนละ input ห้ามยุบเป็น n\nfor x in arr_a: ...   # n\nfor y in arr_b: ...   # m" },
      { t: "h3", c: "best / average / worst case" },
      { t: "p", c: "อัลกอริทึมเดียวอาจมีหลายกรณี — มักสนใจ worst case (รับประกันแย่สุด) แต่บางทีดู average ด้วย เช่น hash table เฉลี่ย O(1) แต่ worst O(n) เมื่อ collision เยอะ" },
      { t: "h3", c: "amortized — เฉลี่ยระยะยาว" },
      { t: "p", c: "บาง operation บางครั้งแพง บางครั้งถูก แต่เฉลี่ยแล้วถูก เช่น list.append() ปกติ O(1) แต่บางครั้งต้องขยายหน่วยความจำ (แพง) เฉลี่ยทั้งหมดยังเป็น O(1) เรียกว่า amortized O(1) — เข้าใจจุดนี้ช่วยไม่ตื่นตระหนกกับ worst case ที่นาน ๆ เกิดที" },
      { t: "callout", title: "space complexity ก็สำคัญ", c: "นอกจากเวลา ต้องดูหน่วยความจำด้วย เช่น สร้าง list ใหม่ขนาด n = O(n) space; recursion ลึก n ชั้น = O(n) space จาก call stack (เจอในหัวข้อ recursion) — บางครั้งแลกเวลาเร็วขึ้นด้วย memory ที่มากขึ้น (time-space tradeoff)" },

      { t: "h2", c: "ตารางเทียบ: operation ↔ structure" },
      { t: "p", c: "นี่คือตารางที่ควรเข้าใจ — ไม่ต้องท่อง แต่ให้รู้ว่า \"งานแบบไหนใช้อะไรเร็ว\"" },
      {
        t: "table",
        head: ["operation", "list", "dict/set", "deque"],
        rows: [
          ["เข้าถึงด้วย index", "O(1)", "—", "O(n)"],
          ["ค้นหาค่า (in)", "O(n)", "O(1)", "O(n)"],
          ["เพิ่ม/ลบท้าย", "O(1)", "O(1)", "O(1)"],
          ["เพิ่ม/ลบหัว", "O(n)", "—", "O(1)"],
        ],
      },
      { t: "callout", title: "เลือก DS ถูก = แก้ปัญหา performance ครึ่งทาง", c: "ถ้าต้อง \"ค้นหาบ่อย\" → ใช้ set/dict (O(1)) ไม่ใช่ list (O(n)); ถ้าต้อง \"เพิ่ม/ลบหัวแถวบ่อย\" → ใช้ deque ไม่ใช่ list การเลือกถูกตั้งแต่ต้นมักเร็วกว่าการ optimize ทีหลังมาก (เชื่อมบท Performance)" },

      { t: "details", summary: "เสริม: bit manipulation เบื้องต้น (สำหรับคนสนใจ)", c: [
        { t: "p", c: "บางโจทย์ใช้การจัดการระดับ bit ได้กระชับ เช่น เช็คเลขคู่ด้วย n & 1, คูณ/หาร 2 ด้วย shift" },
        { t: "code", lang: "python", c: "print(5 & 1)    # 1 (คี่)  ;  4 & 1 = 0 (คู่)\nprint(3 << 1)   # 6  (คูณ 2)\nprint(8 >> 1)   # 4  (หาร 2)\nprint(5 | 2)    # 7  (OR)  ;  5 & 3 = 1 (AND)" },
      ]},

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "อ่านโค้ดแล้วบอก Big-O เองได้: loop ซ้อน = คูณ, คงที่ตัดทิ้ง, เก็บพจน์โตเร็วสุด",
          "best/average/worst case + amortized (list.append O(1) เฉลี่ย)",
          "ค้นหาบ่อย → set/dict (O(1)); เพิ่ม/ลบหัว → deque (O(1)) ไม่ใช่ list",
          "เลือก DS ถูกตั้งแต่ต้นสำคัญกว่าการ optimize ทีหลัง; ดู space ด้วย",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) มีงานต้องเช็คว่า user_id ซ้ำไหมในข้อมูลล้านแถว — เลือก DS ไหน เพราะอะไร  2) ต้องทำคิวงานเข้าก่อนออกก่อน — ใช้อะไร  3) บอก Big-O ของการค้น in list กับ in set  4) ลอง bit ops: เช็คคู่/คี่ด้วย & 1" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Stack, Queue & Deque →", slug: "dsa-stack-queue", desc: "โครงสร้างเข้า-ออกแบบ LIFO/FIFO" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dsa-stack-queue": {
    slug: "dsa-stack-queue",
    title: "Stack, Queue & Deque",
    lead: "สองโครงสร้างพื้นฐาน: stack (เข้าหลังออกก่อน) และ queue (เข้าก่อนออกก่อน)",
    group: GROUP,
    blocks: [
      { t: "p", c: "stack และ queue เป็นโครงสร้างที่เจอทุกที่ ตั้งแต่ undo/redo, การเรียกฟังก์ชัน, ไปจนถึงคิวงาน เข้าใจสองตัวนี้แล้วต่อยอดไปอีกหลายเรื่อง" },

      { t: "h2", c: "Stack — LIFO (Last In, First Out)" },
      { t: "p", c: "เข้าทีหลังออกก่อน เหมือนกองจานซ้อนกัน — ใช้ list ได้เลย (append/pop ท้าย เป็น O(1))" },
      { t: "code", lang: "python", c: "stack = []\nstack.append(1)      # push\nstack.append(2)\nstack.append(3)\nprint(stack.pop())   # 3  (ตัวล่าสุดออกก่อน)\nprint(stack.pop())   # 2\nprint(stack)         # [1]" },
      { t: "p", c: "ใช้จริง: ตรวจวงเล็บสมดุล, undo, การเรียกฟังก์ชัน (call stack), ประวัติเบราว์เซอร์" },
      { t: "code", lang: "python", c: "def is_balanced(s):\n    stack = []\n    pairs = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n    for ch in s:\n        if ch in \"([{\":\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return len(stack) == 0\n\nprint(is_balanced(\"([{}])\"))   # True\nprint(is_balanced(\"([)]\"))     # False" },

      { t: "h2", c: "Queue — FIFO (First In, First Out)" },
      { t: "p", c: "เข้าก่อนออกก่อน เหมือนคนต่อแถว — ใช้ deque (จากบท collections) เพราะ pop หัวแถวเป็น O(1)" },
      { t: "code", lang: "python", c: "from collections import deque\n\nqueue = deque()\nqueue.append(\"a\")        # เข้าคิว\nqueue.append(\"b\")\nqueue.append(\"c\")\nprint(queue.popleft())   # 'a'  (เข้าก่อนออกก่อน)\nprint(queue.popleft())   # 'b'" },
      { t: "callout", title: "อย่าใช้ list.pop(0) เป็น queue", warn: true, c: "list.pop(0) ดึงหัวแถวเป็น O(n) เพราะต้องเลื่อนทุกตัว — ช้ามากเมื่อข้อมูลเยอะ ใช้ collections.deque ที่ popleft() เป็น O(1) เสมอสำหรับ queue" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "stack = LIFO (เข้าหลังออกก่อน) — ใช้ list, append/pop ท้าย O(1)",
          "queue = FIFO (เข้าก่อนออกก่อน) — ใช้ deque, popleft O(1)",
          "stack ใช้: ตรวจวงเล็บ, undo, call stack",
          "อย่าใช้ list.pop(0) ทำ queue (O(n)) — ใช้ deque",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียนฟังก์ชันตรวจวงเล็บสมดุลด้วย stack  2) จำลอง undo ด้วย stack  3) จำลองคิวงานด้วย deque  4) อธิบายว่าทำไม list.pop(0) ช้ากว่า deque.popleft()" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Linked List →", slug: "dsa-linked", desc: "โครงสร้างที่เชื่อมด้วย pointer" },
          { title: "← ก่อนหน้า: เลือกโครงสร้าง & Big-O", slug: "dsa-choose" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dsa-linked": {
    slug: "dsa-linked",
    title: "Linked List",
    lead: "โครงสร้างที่แต่ละ node ชี้ไป node ถัดไป — เข้าใจ pointer และโจทย์สัมภาษณ์คลาสสิก",
    group: GROUP,
    blocks: [
      { t: "p", c: "linked list คือลำดับของ node ที่แต่ละตัวเก็บข้อมูล + ตัวชี้ (pointer) ไป node ถัดไป Python ใช้ list เป็นหลัก แต่ linked list สำคัญในการเข้าใจ pointer และเจอบ่อยในโจทย์สัมภาษณ์" },

      { t: "h2", c: "node + pointer" },
      { t: "code", lang: "python", c: "class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None      # ชี้ไป node ถัดไป (None = จบ)\n\n# สร้าง: 1 -> 2 -> 3\nhead = Node(1)\nhead.next = Node(2)\nhead.next.next = Node(3)\n\n# เดินผ่าน (traverse)\nnode = head\nwhile node:\n    print(node.value)     # 1, 2, 3\n    node = node.next" },

      { t: "h2", c: "list vs linked list" },
      {
        t: "table",
        head: ["operation", "array/list", "linked list"],
        rows: [
          ["เข้าถึง index i", "O(1)", "O(n)"],
          ["เพิ่ม/ลบหัว", "O(n)", "O(1)"],
          ["ค้นหาค่า", "O(n)", "O(n)"],
        ],
      },

      { t: "h2", c: "reverse linked list (โจทย์คลาสสิก)" },
      { t: "code", lang: "python", c: "def reverse(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next    # จำตัวถัดไป\n        curr.next = prev   # กลับทิศ\n        prev = curr        # ขยับ prev\n        curr = nxt         # ขยับ curr\n    return prev            # หัวใหม่" },
      { t: "callout", title: "two-pointer กับ linked list", c: "เทคนิค fast/slow pointer (ตัวเดินเร็ว 2 ก้าว, ช้า 1 ก้าว) ใช้หา \"กลางลิสต์\" หรือ \"ตรวจ cycle\" ได้ — เป็นจุดเชื่อมไปหัวข้อ two-pointer ที่กำลังจะเรียน" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "linked list = node (ข้อมูล + next pointer) ต่อกัน",
          "เข้าถึง index ช้า O(n) แต่เพิ่ม/ลบหัว O(1) (ต่างจาก array)",
          "traverse ด้วย while node: ... node = node.next",
          "reverse และ fast/slow pointer คือโจทย์ที่เจอบ่อย",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง linked list 1->2->3->4 แล้ว print ทุกค่า  2) เขียน reverse linked list  3) หา node กลางด้วย fast/slow pointer  4) นับจำนวน node ใน list" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Tree & Binary Search Tree →", slug: "dsa-tree", desc: "โครงสร้างแบบลำดับชั้น" },
          { title: "← ก่อนหน้า: Stack, Queue & Deque", slug: "dsa-stack-queue" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dsa-tree": {
    slug: "dsa-tree",
    title: "Tree & Binary Search Tree",
    lead: "โครงสร้างลำดับชั้น และ BST ที่ค้นหาได้เร็ว O(log n) ด้วย recursion",
    group: GROUP,
    blocks: [
      { t: "p", c: "tree คือโครงสร้างลำดับชั้น (เหมือนแผนผังครอบครัว/โครงสร้างโฟลเดอร์) ที่เจอทุกที่ Binary Search Tree (BST) เป็นชนิดพิเศษที่ค้นหาได้เร็ว และเป็นพื้นฐานของหลายโครงสร้างขั้นสูง" },

      { t: "h2", c: "คำศัพท์" },
      {
        t: "table",
        head: ["คำ", "ความหมาย"],
        rows: [
          ["root", "node บนสุด"],
          ["leaf", "node ที่ไม่มีลูก"],
          ["child / parent", "node ลูก / node แม่"],
          ["binary tree", "แต่ละ node มีลูกได้ไม่เกิน 2 (left, right)"],
        ],
      },

      { t: "h2", c: "Binary Search Tree (BST)" },
      { t: "p", c: "BST จัดเรียงให้ค่าน้อยอยู่ซ้าย ค่ามากอยู่ขวา ทำให้ค้นหาเร็ว O(log n) — ตัดครึ่งทุกครั้งที่ลงชั้น" },
      { t: "code", lang: "python", c: "class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef insert(root, value):\n    if root is None:\n        return TreeNode(value)\n    if value < root.value:\n        root.left = insert(root.left, value)\n    else:\n        root.right = insert(root.right, value)\n    return root\n\ndef search(root, value):\n    if root is None or root.value == value:\n        return root\n    if value < root.value:\n        return search(root.left, value)   # ไปซ้าย\n    return search(root.right, value)      # ไปขวา" },

      { t: "h2", c: "Traversal — เดินผ่านทุก node" },
      { t: "p", c: "วิธีเดิน tree ที่ใช้บ่อยคือ in-order (ซ้าย→ตัวเอง→ขวา) ซึ่งกับ BST จะได้ค่าเรียงจากน้อยไปมาก" },
      { t: "code", lang: "python", c: "def in_order(root):\n    if root is None:\n        return\n    in_order(root.left)      # ซ้ายก่อน\n    print(root.value)        # ตัวเอง\n    in_order(root.right)     # ขวา\n\n# pre-order: ตัวเอง->ซ้าย->ขวา ; post-order: ซ้าย->ขวา->ตัวเอง" },
      { t: "callout", title: "in-order ของ BST = ค่าเรียงน้อยไปมาก", c: "เพราะ BST เก็บค่าน้อยซ้าย มากขวา การเดิน in-order จึงให้ค่าเรียงลำดับ — เป็นคุณสมบัติที่ใช้ตอบโจทย์ได้บ่อย (เช่น ตรวจว่าเป็น BST ถูกต้องไหม)" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "tree = โครงสร้างลำดับชั้น (root/leaf/child); binary tree มีลูก ≤ 2",
          "BST: น้อยซ้าย มากขวา → ค้น/insert O(log n) (ถ้าสมดุล)",
          "traversal ด้วย recursion: in/pre/post-order",
          "in-order ของ BST ได้ค่าเรียงจากน้อยไปมาก",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง BST แล้ว insert ค่า 5,3,7,1,4  2) เขียน in-order traversal ดูว่าได้เรียงไหม  3) นับความสูงของต้นไม้ (recursion)  4) ตรวจว่าค่าหนึ่งอยู่ใน BST ไหมด้วย search" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Heap & Priority Queue →", slug: "dsa-heap", desc: "หาค่าน้อย/มากสุดได้เร็ว" },
          { title: "← ก่อนหน้า: Linked List", slug: "dsa-linked" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dsa-heap": {
    slug: "dsa-heap",
    title: "Heap & Priority Queue",
    lead: "โครงสร้างที่ดึงค่าน้อยสุด/มากสุดได้เร็ว — เจอบ่อยมากในงานจริงและสัมภาษณ์",
    group: GROUP,
    blocks: [
      { t: "p", c: "heap คือ tree พิเศษที่ \"ค่าน้อยสุด (หรือมากสุด) อยู่บนสุดเสมอ\" ทำให้ดึงค่านั้นได้เร็ว O(log n) เหมาะกับงานที่ต้องหยิบ \"ตัวที่สำคัญที่สุด\" ตลอด เช่น คิวงานตามความสำคัญ, หา top-k" },

      { t: "h2", c: "heapq — min-heap ของ Python" },
      { t: "p", c: "Python มีโมดูล heapq ที่ทำ min-heap (ค่าน้อยสุดอยู่บน) บน list ปกติ" },
      { t: "code", lang: "python", c: "import heapq\n\nh = []\nheapq.heappush(h, 5)\nheapq.heappush(h, 1)\nheapq.heappush(h, 3)\nprint(heapq.heappop(h))   # 1  (น้อยสุดออกก่อนเสมอ)\nprint(heapq.heappop(h))   # 3\n\n# แปลง list เป็น heap ทันที O(n)\nnums = [5, 1, 8, 3]\nheapq.heapify(nums)\nprint(heapq.heappop(nums))  # 1" },

      { t: "h2", c: "หา top-k / max-heap" },
      { t: "p", c: "heapq เป็น min-heap ถ้าอยากได้ max-heap ให้ใส่ค่าติดลบ; หา k ตัวที่ใหญ่/เล็กสุดมี helper สำเร็จ" },
      { t: "code", lang: "python", c: "import heapq\n\nnums = [5, 1, 8, 3, 9, 2]\nprint(heapq.nlargest(3, nums))    # [9, 8, 5]\nprint(heapq.nsmallest(2, nums))   # [1, 2]\n\n# max-heap ด้วยค่าติดลบ\nh = []\nfor n in nums:\n    heapq.heappush(h, -n)\nprint(-heapq.heappop(h))          # 9 (มากสุด)" },

      { t: "h2", c: "Priority Queue" },
      { t: "p", c: "heap ใช้ทำ priority queue — คิวที่หยิบตามความสำคัญ ไม่ใช่ลำดับเข้า ใส่ tuple (priority, item)" },
      { t: "code", lang: "python", c: "import heapq\n\npq = []\nheapq.heappush(pq, (2, \"งานปกติ\"))\nheapq.heappush(pq, (1, \"งานด่วน\"))\nheapq.heappush(pq, (3, \"งานไว้ทีหลัง\"))\nprint(heapq.heappop(pq))   # (1, 'งานด่วน')  ออกตาม priority น้อยสุด" },
      { t: "callout", title: "เมื่อไรนึกถึง heap", c: "เห็นโจทย์ว่า \"หา k ตัวที่ใหญ่/เล็กสุด\", \"หยิบตัวสำคัญสุดเรื่อย ๆ\", \"merge หลาย sorted list\" → คิดถึง heap การหา top-k ด้วย heap เป็น O(n log k) เร็วกว่า sort ทั้งหมด O(n log n) เมื่อ k เล็ก" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "heap = ดึงค่าน้อยสุด/มากสุดได้ O(log n)",
          "heapq: heappush/heappop (min-heap), heapify O(n)",
          "max-heap ใช้ค่าติดลบ; nlargest/nsmallest หา top-k",
          "priority queue: push (priority, item) — หยิบตาม priority",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ใช้ heapq หา 3 ตัวที่มากสุดใน list  2) ทำ priority queue ของงานด้วย tuple (priority, name)  3) ทำ max-heap ด้วยค่าติดลบ  4) อธิบายว่าทำไม heap หา top-k เร็วกว่า sort ทั้งหมดเมื่อ k เล็ก" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Hash Table เจาะลึก →", slug: "dsa-hash", desc: "ทำไม dict/set เร็ว O(1)" },
          { title: "← ก่อนหน้า: Tree & BST", slug: "dsa-tree" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dsa-hash": {
    slug: "dsa-hash",
    title: "Hash Table เจาะลึก",
    lead: "ทำไม dict/set ค้นหาได้ O(1) และใช้มันแก้โจทย์จำนวนมากได้อย่างไร",
    group: GROUP,
    blocks: [
      { t: "p", c: "dict และ set ของ Python เบื้องหลังคือ hash table — โครงสร้างที่ค้นหา/เพิ่ม/ลบได้ O(1) โดยเฉลี่ย เข้าใจว่ามันทำงานยังไงและใช้แก้โจทย์ได้ คือหนึ่งในทักษะที่ทรงพลังที่สุด" },

      { t: "h2", c: "hash table ทำงานยังไง" },
      { t: "p", c: "hash function แปลง key เป็นตัวเลข (hash) แล้วใช้เลขนั้นบอกตำแหน่งเก็บ (bucket) ทำให้กระโดดไปหาได้เลยไม่ต้องไล่ — จึง O(1) โดยเฉลี่ย" },
      { t: "p", c: "เมื่อ 2 key ได้ตำแหน่งเดียวกัน (collision) hash table จัดการด้วยการเก็บต่อกันในตำแหน่งนั้น กรณีแย่สุดจึงเป็น O(n) แต่ในทางปฏิบัติเกิดน้อยมาก" },

      { t: "h2", c: "ใช้ hash แก้โจทย์: Two Sum" },
      { t: "p", c: "โจทย์คลาสสิก: หาคู่ที่บวกกันได้ target — แทน loop ซ้อน O(n²) ใช้ dict จำตัวที่เคยเจอ เหลือ O(n)" },
      { t: "code", lang: "python", c: "def two_sum(nums, target):\n    seen = {}                      # value -> index\n    for i, n in enumerate(nums):\n        need = target - n\n        if need in seen:           # เคยเจอตัวที่ต้องการ? (O(1))\n            return (seen[need], i)\n        seen[n] = i\n    return None\n\nprint(two_sum([2, 7, 11, 15], 9))   # (0, 1)" },

      { t: "h2", c: "นับความถี่ & group" },
      { t: "code", lang: "python", c: "from collections import Counter, defaultdict\n\n# นับความถี่\nprint(Counter(\"banana\"))      # Counter({'a':3,'n':2,'b':1})\n\n# group anagram (คำที่สลับตัวอักษรกัน)\ndef group_anagrams(words):\n    groups = defaultdict(list)\n    for w in words:\n        key = \"\".join(sorted(w))   # anagram มี key เดียวกัน\n        groups[key].append(w)\n    return list(groups.values())\n\nprint(group_anagrams([\"eat\", \"tea\", \"tan\", \"ate\"]))\n# [['eat','tea','ate'], ['tan']]" },
      { t: "callout", title: "\"ใช้ hash map\" = คำตอบของโจทย์จำนวนมาก", c: "เมื่อเจอโจทย์ \"หาว่าเคยเจอไหม\", \"นับความถี่\", \"จับคู่\", \"หา duplicate\" → คิดถึง dict/set ก่อนเสมอ มักเปลี่ยนโจทย์ O(n²) ให้เป็น O(n) ได้ (เชื่อมบท Performance)" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "hash table: hash(key) → ตำแหน่งเก็บ → ค้น/เพิ่ม/ลบ O(1) เฉลี่ย",
          "collision จัดการได้ แต่กรณีแย่สุด O(n) (เกิดน้อย)",
          "two-sum: ใช้ dict จำตัวที่เจอ ลด O(n²) → O(n)",
          "นับ → Counter, group → defaultdict; เจอ 'เคยเจอ/นับ/จับคู่' คิดถึง hash",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน two_sum ด้วย dict  2) หาตัวซ้ำตัวแรกใน list ด้วย set  3) นับความถี่คำด้วย Counter หา top-3  4) group anagrams" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Sorting เชิงลึก →", slug: "dsa-sorting", desc: "เขียน sort เอง + เลือกใช้" },
          { title: "← ก่อนหน้า: Heap & Priority Queue", slug: "dsa-heap" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dsa-sorting": {
    slug: "dsa-sorting",
    title: "Sorting เชิงลึก",
    lead: "เข้าใจ algorithm การเรียงลำดับ ไม่ใช่แค่เรียก .sort() — merge/quick sort และการเลือกใช้",
    group: GROUP,
    blocks: [
      { t: "p", c: "การเรียงลำดับเป็นพื้นฐานของอัลกอริทึมมากมาย งานจริงใช้ sorted() ก็พอ แต่การเข้าใจว่ามันทำงานยังไงข้างใต้ ช่วยให้คิดวิเคราะห์เป็นและตอบโจทย์สัมภาษณ์ได้" },

      { t: "h2", c: "algorithm ช้า ๆ ที่เข้าใจง่าย (O(n²))" },
      { t: "p", c: "bubble/selection/insertion sort เข้าใจง่ายแต่ช้า — ดีสำหรับเรียนรู้แนวคิด" },
      { t: "code", lang: "python", c: "# bubble sort: สลับคู่ที่อยู่ผิดที่ ไล่ไปเรื่อย ๆ\ndef bubble_sort(arr):\n    arr = arr[:]\n    n = len(arr)\n    for i in range(n):\n        for j in range(n - 1 - i):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr\n\nprint(bubble_sort([5, 2, 8, 1]))   # [1, 2, 5, 8]" },

      { t: "h2", c: "Merge Sort — O(n log n)" },
      { t: "p", c: "แบ่งครึ่งไปเรื่อย ๆ จนเหลือตัวเดียว แล้วรวม (merge) กลับแบบเรียง — ตัวอย่างคลาสสิกของ divide and conquer" },
      { t: "code", lang: "python", c: "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])    # เรียงครึ่งซ้าย\n    right = merge_sort(arr[mid:])   # เรียงครึ่งขวา\n    return merge(left, right)       # รวมแบบเรียง\n\ndef merge(a, b):\n    result, i, j = [], 0, 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            result.append(a[i]); i += 1\n        else:\n            result.append(b[j]); j += 1\n    result.extend(a[i:]); result.extend(b[j:])\n    return result\n\nprint(merge_sort([5, 2, 8, 1, 9, 3]))   # [1,2,3,5,8,9]" },

      { t: "h2", c: "เลือกใช้ & stability" },
      {
        t: "table",
        head: ["algorithm", "Big-O", "หมายเหตุ"],
        rows: [
          ["bubble/selection", "O(n²)", "เรียนรู้ ไม่ใช้จริง"],
          ["merge sort", "O(n log n)", "เสถียร (stable)"],
          ["quick sort", "O(n log n) เฉลี่ย", "เร็วจริง แต่แย่สุด O(n²)"],
          ["Python sorted()", "O(n log n)", "Timsort — ใช้จริง"],
        ],
      },
      { t: "callout", title: "งานจริงใช้ sorted() (Timsort)", c: "Python มี Timsort ที่เร็วและเสถียรอยู่แล้ว — งานจริงใช้ sorted()/list.sort() พร้อม key= (จากบท 1) ไม่ต้องเขียนเอง แต่เข้าใจ merge/quick sort ไว้สำหรับวิเคราะห์และสัมภาษณ์ stable = ตัวที่ค่าเท่ากันคงลำดับเดิม สำคัญตอนเรียงหลายเงื่อนไข" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "bubble/selection/insertion: O(n²) เข้าใจง่ายแต่ช้า",
          "merge sort: แบ่งครึ่ง+รวม O(n log n) เสถียร (divide & conquer)",
          "quick sort: เร็วเฉลี่ย O(n log n) แต่แย่สุด O(n²)",
          "งานจริงใช้ sorted() (Timsort); stable = คงลำดับค่าที่เท่ากัน",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน merge sort เอง  2) เทียบเวลากับ sorted() ด้วย timeit (บท 3)  3) เรียง list of dict หลายเงื่อนไขด้วย sorted(key=)  4) อธิบายว่า stable sort สำคัญตอนไหน" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Binary Search & Variations →", slug: "dsa-binary-search", desc: "ค้นหาใน O(log n)" },
          { title: "← ก่อนหน้า: Hash Table", slug: "dsa-hash" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dsa-binary-search": {
    slug: "dsa-binary-search",
    title: "Binary Search & Variations",
    lead: "ค้นหาในข้อมูลที่เรียงแล้วด้วย O(log n) — และรูปแบบที่ดัดแปลงที่เจอบ่อย",
    group: GROUP,
    blocks: [
      { t: "p", c: "binary search ค้นหาในข้อมูลที่เรียงแล้วโดยตัดครึ่งทุกครั้ง ทำให้เร็วมาก O(log n) (ข้อมูลล้านตัวใช้แค่ ~20 ครั้ง) เป็นเทคนิคที่เจอบ่อยและมีรูปแบบดัดแปลงหลายแบบ" },

      { t: "h2", c: "binary search พื้นฐาน" },
      { t: "code", lang: "python", c: "def binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target:\n            return mid           # เจอ คืน index\n        elif arr[mid] < target:\n            lo = mid + 1         # ตัดครึ่งซ้ายทิ้ง\n        else:\n            hi = mid - 1         # ตัดครึ่งขวาทิ้ง\n    return -1                    # ไม่เจอ\n\nprint(binary_search([1, 3, 5, 7, 9], 7))   # 3" },
      { t: "callout", title: "ข้อมูลต้องเรียงแล้วเท่านั้น", warn: true, c: "binary search ใช้ได้กับข้อมูลที่เรียงแล้วเท่านั้น และระวังกับดัก off-by-one (lo <= hi, mid+1, mid-1) กับ infinite loop — เป็นจุดที่พลาดบ่อยสุด ลองไล่ทีละขั้นด้วยตัวอย่างเล็ก ๆ" },

      { t: "h2", c: "bisect — binary search สำเร็จรูป" },
      { t: "p", c: "Python มีโมดูล bisect ที่ทำ binary search ให้ หา \"ตำแหน่งที่ควรแทรก\" เพื่อคงการเรียง" },
      { t: "code", lang: "python", c: "import bisect\n\narr = [1, 3, 5, 7, 9]\nprint(bisect.bisect_left(arr, 5))    # 2  (ตำแหน่งของ 5)\nprint(bisect.bisect_right(arr, 5))   # 3  (หลัง 5)\nprint(bisect.bisect_left(arr, 6))    # 3  (ตำแหน่งที่ควรแทรก 6)\n\nbisect.insort(arr, 6)    # แทรกแบบคงการเรียง\nprint(arr)               # [1, 3, 5, 6, 7, 9]" },

      { t: "h2", c: "หา leftmost / rightmost" },
      { t: "p", c: "เมื่อมีค่าซ้ำ มักต้องหา \"ตัวแรก\" หรือ \"ตัวสุดท้าย\" ที่ตรงเงื่อนไข — ดัดแปลง binary search ด้วย bisect" },
      { t: "code", lang: "python", c: "import bisect\nnums = [1, 2, 2, 2, 3]\n# จำนวน 2 ทั้งหมด = ขอบขวา - ขอบซ้าย\nleft = bisect.bisect_left(nums, 2)    # 1\nright = bisect.bisect_right(nums, 2)  # 4\nprint(right - left)                   # 3  (มี 2 อยู่ 3 ตัว)" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "binary search ตัดครึ่งทุกครั้ง O(log n) — ใช้กับข้อมูลเรียงแล้วเท่านั้น",
          "ระวัง off-by-one (lo<=hi, mid±1) และ infinite loop",
          "bisect: bisect_left/right หาตำแหน่ง, insort แทรกคงการเรียง",
          "หา leftmost/rightmost ด้วย bisect — นับค่าซ้ำได้",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน binary search เอง ทดสอบเคสเจอ/ไม่เจอ  2) ใช้ bisect หาตำแหน่งที่ควรแทรกค่า  3) นับจำนวนค่าที่ซ้ำด้วย bisect_left/right  4) อธิบายว่าทำไม binary search ต้องใช้ข้อมูลเรียงแล้ว" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Two-Pointer & Sliding Window →", slug: "dsa-twopointer", desc: "เทคนิคแก้โจทย์ array/string" },
          { title: "← ก่อนหน้า: Sorting เชิงลึก", slug: "dsa-sorting" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dsa-twopointer": {
    slug: "dsa-twopointer",
    title: "Two-Pointer & Sliding Window",
    lead: "สองเทคนิคที่เปลี่ยนโจทย์ array/string จาก O(n²) เป็น O(n) — เจอบ่อยที่สุดในการสัมภาษณ์",
    group: GROUP,
    blocks: [
      { t: "p", c: "two-pointer และ sliding window เป็นเทคนิคที่ใช้ \"ตัวชี้\" เดินบน array/string อย่างชาญฉลาด แทนการวน loop ซ้อน ทำให้แก้โจทย์ได้เร็วขึ้นมาก — เป็นแพตเทิร์นที่เจอบ่อยสุดในโจทย์สัมภาษณ์" },

      { t: "h2", c: "Two-Pointer: สองหัวเข้าหากัน" },
      { t: "p", c: "ใช้ตัวชี้สองตัวที่ปลายทั้งสองข้าง ขยับเข้าหากันตามเงื่อนไข เช่น ตรวจ palindrome หรือหาคู่ผลรวมใน array ที่เรียงแล้ว" },
      { t: "code", lang: "python", c: "# ตรวจ palindrome\ndef is_palindrome(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        if s[left] != s[right]:\n            return False\n        left += 1\n        right -= 1\n    return True\n\nprint(is_palindrome(\"racecar\"))   # True\n\n# two-sum บน array ที่เรียงแล้ว (O(n))\ndef two_sum_sorted(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo < hi:\n        s = arr[lo] + arr[hi]\n        if s == target:\n            return (lo, hi)\n        elif s < target:\n            lo += 1        # ผลรวมน้อยไป ขยับซ้าย\n        else:\n            hi -= 1        # ผลรวมมากไป ขยับขวา\n    return None" },

      { t: "h2", c: "Sliding Window: หน้าต่างเลื่อน" },
      { t: "p", c: "ใช้กับโจทย์ \"ช่วงต่อเนื่อง\" (subarray/substring) — เลื่อนหน้าต่างไปบน array โดยไม่คำนวณซ้ำ" },
      { t: "code", lang: "python", c: "# ผลรวมสูงสุดของ subarray ยาว k (fixed window)\ndef max_sum_window(arr, k):\n    window = sum(arr[:k])\n    best = window\n    for i in range(k, len(arr)):\n        window += arr[i] - arr[i - k]   # เพิ่มตัวใหม่ ลบตัวเก่า\n        best = max(best, window)\n    return best\n\nprint(max_sum_window([1, 4, 2, 10, 2, 3], 3))   # 16 (2+10+... )" },
      { t: "code", lang: "python", c: "# substring ยาวสุดที่ไม่มีตัวซ้ำ (variable window)\ndef longest_unique(s):\n    seen = set()\n    left = best = 0\n    for right in range(len(s)):\n        while s[right] in seen:      # หดหน้าต่างจากซ้ายจนไม่ซ้ำ\n            seen.remove(s[left])\n            left += 1\n        seen.add(s[right])\n        best = max(best, right - left + 1)\n    return best\n\nprint(longest_unique(\"abcabcbb\"))   # 3 ('abc')" },
      { t: "callout", title: "เห็น 'ช่วงต่อเนื่อง' → คิดถึง sliding window", c: "โจทย์ที่พูดถึง subarray/substring ต่อเนื่อง, ผลรวม/นับในช่วง → มักแก้ด้วย sliding window ได้ O(n) แทน brute force O(n²) ส่วนโจทย์ array เรียงแล้ว/หาคู่ → คิดถึง two-pointer" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "two-pointer: ตัวชี้สองตัวเดินตามเงื่อนไข — palindrome, two-sum (เรียงแล้ว)",
          "sliding window: หน้าต่างเลื่อนบนช่วงต่อเนื่อง ไม่คำนวณซ้ำ",
          "fixed window (ขนาดคงที่) vs variable window (หด/ขยายตามเงื่อนไข)",
          "เปลี่ยน O(n²) → O(n); เห็น subarray/substring ต่อเนื่อง → sliding window",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ตรวจ palindrome ด้วย two-pointer  2) two-sum บน array เรียงแล้ว  3) หาผลรวมสูงสุดของ window ยาว k  4) substring ยาวสุดที่ไม่มีตัวซ้ำ" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Recursion ลึก & Backtracking →", slug: "dsa-recursion", desc: "ฟังก์ชันเรียกตัวเอง + ลองแล้วถอย" },
          { title: "← ก่อนหน้า: Binary Search", slug: "dsa-binary-search" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dsa-recursion": {
    slug: "dsa-recursion",
    title: "Recursion ลึก & Backtracking",
    lead: "ฟังก์ชันที่เรียกตัวเอง และเทคนิค backtracking (ลองแล้วถอย) สำหรับโจทย์ค้นหาคำตอบ",
    group: GROUP,
    blocks: [
      { t: "p", c: "recursion คือฟังก์ชันที่แก้ปัญหาโดยเรียกตัวเองกับปัญหาที่เล็กลง เหมาะกับโครงสร้างที่ซ้อนกัน (tree, ปัญหาที่แบ่งย่อยได้) และเป็นรากของ backtracking + dynamic programming" },

      { t: "h2", c: "องค์ประกอบของ recursion" },
      { t: "p", c: "ทุก recursion ต้องมี (1) base case — เงื่อนไขหยุด และ (2) recursive case — เรียกตัวเองกับปัญหาเล็กลง" },
      { t: "code", lang: "python", c: "def factorial(n):\n    if n <= 1:           # base case (หยุด)\n        return 1\n    return n * factorial(n - 1)   # recursive case\n\nprint(factorial(5))   # 120  (5*4*3*2*1)" },
      { t: "callout", title: "ลืม base case = RecursionError", warn: true, c: "ถ้าไม่มี base case หรือไม่เข้าใกล้มัน recursion จะเรียกตัวเองไม่จบจน stack ล้น (RecursionError) — Python จำกัด recursion ลึกประมาณ 1000 ชั้น เสมอตรวจว่า base case ถูกและปัญหาเล็กลงทุกครั้ง" },

      { t: "h2", c: "ความซับซ้อนของ recursion & call stack (ลึกกว่าพื้นฐาน)" },
      { t: "p", c: "ทุกครั้งที่ฟังก์ชันเรียกตัวเอง Python ดันเฟรมใหม่เข้า call stack — recursion ลึก n ชั้นจึงใช้ O(n) memory เสมอ แม้โค้ดดูสั้น นี่คือต้นทุนที่ loop ไม่มี และเป็นเหตุผลที่ Python จำกัดความลึกไว้กัน stack ล้น" },
      { t: "code", lang: "python", c: "import sys\nprint(sys.getrecursionlimit())   # ~1000 (ปรับได้ด้วย setrecursionlimit แต่ระวัง)\n\n# วิเคราะห์ความซับซ้อน:\n# factorial(n): เรียก n ครั้ง -> เวลา O(n), call stack O(n)\n# fib แบบ naive: แตกเป็น 2 กิ่งทุกชั้น -> O(2^n) ช้าระเบิด!\ndef fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)   # O(2^n) — ดูดีแต่ช้ามาก" },
      { t: "callout", title: "นับ Big-O ของ recursion ยังไง", c: "ดู (1) จำนวนกิ่งที่แตกต่อชั้น และ (2) ความลึก — factorial แตก 1 กิ่ง ลึก n = O(n); fib แตก 2 กิ่ง ลึก n = O(2^n) การเห็นว่า fib naive เป็น O(2^n) คือเหตุผลที่ต้องมี memoization (บท DP) เชื่อมกับ @lru_cache (บท 3)" },

      { t: "h2", c: "Recursion vs Iteration — เลือกอะไรเมื่อไร" },
      { t: "p", c: "recursion เขียนสวยกับปัญหาที่แตกย่อยตามธรรมชาติ (tree, divide & conquer) แต่ loop เร็วกว่าและไม่เปลือง call stack ทุก recursion แปลงเป็น loop ได้ (บางทีต้องใช้ stack ของเราเอง)" },
      { t: "code", lang: "python", c: "# recursion (สวยแต่เปลือง stack)\ndef sum_rec(arr):\n    if not arr:\n        return 0\n    return arr[0] + sum_rec(arr[1:])\n\n# iteration (เร็วกว่า ไม่เปลือง stack)\ndef sum_iter(arr):\n    total = 0\n    for x in arr:\n        total += x\n    return total" },
      {
        t: "table",
        head: ["", "recursion", "iteration (loop)"],
        rows: [
          ["เหมาะกับ", "tree, แตกย่อย, backtracking", "งานเชิงเส้นทั่วไป"],
          ["memory", "O(ความลึก) จาก call stack", "O(1) มักไม่เปลือง"],
          ["ความเสี่ยง", "stack overflow ถ้าลึกมาก", "ไม่มี"],
        ],
      },

      { t: "h2", c: "Backtracking — ลองแล้วถอย" },
      { t: "p", c: "backtracking คือลองทุกความเป็นไปได้ ถ้าทางไหนไม่เวิร์กก็ \"ถอย\" กลับมาลองทางอื่น เหมาะกับโจทย์หาทุกคำตอบ (permutation, subset, แก้ปริศนา)" },
      { t: "code", lang: "python", c: "# สร้าง subset ทั้งหมด\ndef subsets(nums):\n    result = []\n    def backtrack(start, path):\n        result.append(path[:])         # เก็บ subset ปัจจุบัน\n        for i in range(start, len(nums)):\n            path.append(nums[i])       # เลือก\n            backtrack(i + 1, path)     # ลงลึก\n            path.pop()                 # ถอย (backtrack)\n    backtrack(0, [])\n    return result\n\nprint(subsets([1, 2, 3]))\n# [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]" },
      { t: "code", lang: "python", c: "# permutation ทั้งหมด\ndef permutations(nums):\n    result = []\n    def backtrack(path, remaining):\n        if not remaining:\n            result.append(path[:])\n            return\n        for i in range(len(remaining)):\n            backtrack(path + [remaining[i]], remaining[:i] + remaining[i+1:])\n    backtrack([], nums)\n    return result\n\nprint(permutations([1, 2, 3]))   # 6 แบบ" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "recursion = base case (หยุด) + recursive case; ลืม base case → RecursionError",
          "ความซับซ้อน: นับกิ่ง×ความลึก (factorial O(n), fib naive O(2^n)); call stack = O(ความลึก) space",
          "recursion vs iteration: loop เร็ว/ประหยัด stack กว่า — recursion เหมาะ tree/แตกย่อย/backtracking",
          "backtracking = ลองทุกทางแล้วถอย (subset, permutation, ปริศนา)",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน factorial และ fibonacci ด้วย recursion  2) สร้าง subset ทั้งหมดของ list  3) สร้าง permutation ทั้งหมด  4) อธิบายว่า 'ถอย' (backtrack) คืออะไรด้วยตัวอย่าง" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Dynamic Programming →", slug: "dsa-dp", desc: "จำผลที่คำนวณแล้ว ไม่ทำซ้ำ" },
          { title: "← ก่อนหน้า: Two-Pointer & Sliding Window", slug: "dsa-twopointer" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dsa-dp": {
    slug: "dsa-dp",
    title: "Dynamic Programming เบื้องต้น",
    lead: "จำผลลัพธ์ที่คำนวณแล้วเพื่อไม่คำนวณซ้ำ — เปลี่ยนโจทย์ช้าระเบิดให้เร็วขึ้นมหาศาล",
    group: GROUP,
    blocks: [
      { t: "p", c: "Dynamic Programming (DP) คือเทคนิคแก้ปัญหาที่ \"ปัญหาย่อยซ้ำกัน\" โดยจำผลที่คำนวณแล้วไว้ ไม่คำนวณซ้ำ ฟังดูยากแต่หัวใจง่ายมาก — และคุณเจอแนวคิดนี้มาแล้วในรูป @lru_cache (บท 3)" },

      { t: "h2", c: "ปัญหา: fibonacci แบบ naive ช้าระเบิด" },
      { t: "p", c: "fib แบบ recursion ธรรมดาคำนวณ subproblem เดิมซ้ำเป็นล้านครั้ง — O(2^n)" },
      { t: "code", lang: "python", c: "def fib_slow(n):\n    if n < 2:\n        return n\n    return fib_slow(n - 1) + fib_slow(n - 2)\n# fib_slow(40) ช้ามาก — คำนวณ fib เดิมซ้ำมหาศาล" },

      { t: "h2", c: "วิธีที่ 1: Memoization (top-down)" },
      { t: "p", c: "จำผลที่เคยคำนวณไว้ใน dict (หรือใช้ @lru_cache จากบท 3) — เจอแล้วหยิบเลย ไม่คำนวณซ้ำ → O(n)" },
      { t: "code", lang: "python", c: "import functools\n\n@functools.lru_cache(maxsize=None)   # memoize อัตโนมัติ!\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(40))   # เร็วมาก (จำผลไว้แล้ว)" },

      { t: "h2", c: "วิธีที่ 2: Tabulation (bottom-up)" },
      { t: "p", c: "สร้างคำตอบจากเล็กไปใหญ่ เก็บใน list/ตัวแปร — ไม่ใช้ recursion" },
      { t: "code", lang: "python", c: "def fib_tab(n):\n    if n < 2:\n        return n\n    a, b = 0, 1\n    for _ in range(n - 1):\n        a, b = b, a + b      # สร้างจากล่างขึ้นบน\n    return b\n\nprint(fib_tab(40))   # เร็ว O(n) ใช้ memory คงที่" },

      { t: "h2", c: "ตัวอย่าง: climbing stairs" },
      { t: "p", c: "ขึ้นบันได n ขั้น ก้าวได้ทีละ 1 หรือ 2 ขั้น มีกี่วิธี — เป็น fibonacci แฝง" },
      { t: "code", lang: "python", c: "def climb(n):\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(n - 2):\n        a, b = b, a + b\n    return b\n\nprint(climb(5))   # 8 วิธี" },
      { t: "callout", title: "เมื่อไรใช้ DP", c: "เห็นโจทย์ที่ \"นับจำนวนวิธี\", \"หาค่ามากสุด/น้อยสุด\" ที่แตกเป็นปัญหาย่อยซ้ำกัน → คิดถึง DP เริ่มจากเขียน recursion ให้ถูกก่อน แล้วเติม memoization (@lru_cache) — ได้ DP ทันที นี่คือเหตุผลที่ decorator (บท 1) และ caching (บท 3) เชื่อมมาถึงตรงนี้" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "DP = ปัญหาย่อยซ้ำกัน → จำผลไว้ ไม่คำนวณซ้ำ",
          "memoization (top-down): recursion + cache (@lru_cache)",
          "tabulation (bottom-up): สร้างจากเล็กไปใหญ่ ไม่ใช้ recursion",
          "เริ่มจาก recursion ถูกก่อน แล้วเติม cache = ได้ DP",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เทียบเวลา fib_slow กับ fib (lru_cache) ที่ n=35 ด้วย timeit  2) เขียน climbing stairs  3) เขียน fib แบบ tabulation  4) โจทย์ coin change: นับจำนวนวิธีจ่ายเงิน n บาทด้วยเหรียญที่มี" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Greedy Algorithms →", slug: "dsa-greedy", desc: "เลือกดีที่สุดตอนนี้ + รู้ขีดจำกัด" },
          { title: "← ก่อนหน้า: Recursion & Backtracking", slug: "dsa-recursion" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dsa-greedy": {
    slug: "dsa-greedy",
    title: "Greedy Algorithms",
    lead: "แก้ปัญหาด้วยการเลือก \"ดีที่สุดตอนนี้\" ทุกขั้น — เร็วและง่าย แต่ต้องรู้ว่าเมื่อไรใช้ไม่ได้",
    group: GROUP,
    blocks: [
      { t: "p", c: "greedy algorithm แก้ปัญหาด้วยการเลือกตัวเลือกที่ดีที่สุด ณ ตอนนั้นทุกขั้น โดยไม่ย้อนคิด เร็วและเขียนง่าย แต่ใช้ได้เฉพาะปัญหาบางแบบ — สำคัญที่ต้องรู้ว่าเมื่อไรใช้ได้และเมื่อไรไม่ได้" },

      { t: "h2", c: "ตัวอย่าง: ทอนเงินจำนวนเหรียญน้อยสุด" },
      { t: "p", c: "เลือกเหรียญใหญ่สุดที่ใช้ได้ก่อนเสมอ — greedy ใช้ได้กับชุดเหรียญมาตรฐาน" },
      { t: "code", lang: "python", c: "def make_change(amount, coins):\n    coins = sorted(coins, reverse=True)   # ใหญ่ไปเล็ก\n    result = []\n    for coin in coins:\n        while amount >= coin:\n            amount -= coin            # เลือกเหรียญใหญ่สุดที่ใช้ได้\n            result.append(coin)\n    return result\n\nprint(make_change(63, [1, 5, 10, 20]))   # [20,20,20,1,1,1]" },

      { t: "h2", c: "ตัวอย่าง: activity selection" },
      { t: "p", c: "เลือกกิจกรรมให้ได้มากที่สุดโดยไม่ทับเวลากัน — greedy: เลือกตัวที่ \"จบก่อน\" เสมอ" },
      { t: "code", lang: "python", c: "def max_activities(activities):\n    # activities = [(start, end), ...]\n    activities.sort(key=lambda a: a[1])   # เรียงตามเวลาจบ\n    count, last_end = 0, 0\n    for start, end in activities:\n        if start >= last_end:             # ไม่ทับ\n            count += 1\n            last_end = end\n    return count\n\nprint(max_activities([(1, 3), (2, 5), (4, 6), (6, 8)]))   # 3" },

      { t: "h2", c: "greedy ไม่ได้ผลเสมอ" },
      { t: "p", c: "บางปัญหา greedy ให้คำตอบผิด เช่นทอนเงินด้วยชุดเหรียญแปลก ๆ — ต้องใช้ DP แทน" },
      { t: "code", lang: "python", c: "# coins = [1, 3, 4], ทอน 6\n# greedy: 4 + 1 + 1 = 3 เหรียญ  (ผิด!)\n# คำตอบจริง: 3 + 3 = 2 เหรียญ  (DP หาเจอ)" },
      { t: "callout", title: "greedy ต้องพิสูจน์ว่า 'ดีตอนนี้ → ดีรวม'", warn: true, c: "greedy ใช้ได้ก็ต่อเมื่อ \"การเลือกดีที่สุดตอนนี้ นำไปสู่คำตอบที่ดีที่สุดโดยรวม\" (greedy choice property) ถ้าไม่แน่ใจ อย่าเพิ่งเชื่อ greedy — ลองหา counterexample หรือใช้ DP เทียบ เพราะ greedy ที่ผิดจะดูเหมือนถูกในตัวอย่างง่าย ๆ" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "greedy = เลือกดีที่สุดตอนนี้ทุกขั้น ไม่ย้อนคิด — เร็ว เขียนง่าย",
          "ใช้ได้: ทอนเงิน(ชุดมาตรฐาน), activity selection, interval",
          "ไม่ได้เสมอ — บางปัญหาต้องใช้ DP (เช่นทอนเงินชุดแปลก)",
          "ต้องมั่นใจว่า 'ดีตอนนี้ → ดีรวม' ก่อนใช้ greedy",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียนทอนเงินแบบ greedy  2) แก้ activity selection  3) หา counterexample ที่ greedy ทอนเงินผิด (coins=[1,3,4])  4) อธิบาย greedy choice property ด้วยคำตัวเอง" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Graph & BFS/DFS →", slug: "dsa-graph", desc: "โครงสร้างความสัมพันธ์และการท่อง" },
          { title: "← ก่อนหน้า: Dynamic Programming", slug: "dsa-dp" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dsa-graph": {
    slug: "dsa-graph",
    title: "Graph & BFS/DFS",
    lead: "โครงสร้างความสัมพันธ์ (จุด-เส้น) และการท่องด้วย BFS/DFS — แผนที่ โซเชียล เส้นทาง",
    group: GROUP,
    blocks: [
      { t: "p", c: "graph คือโครงสร้างที่มี \"จุด\" (vertex/node) เชื่อมด้วย \"เส้น\" (edge) ใช้แทนความสัมพันธ์ได้ทุกอย่าง: เพื่อนในโซเชียล, แผนที่ถนน, การพึ่งพากันของงาน — และเป็นหัวข้อสุดท้ายที่รวมหลายแนวคิดเข้าด้วยกัน" },

      { t: "h2", c: "แทน graph ด้วย adjacency list" },
      { t: "code", lang: "python", c: "# graph: A-B, A-C, B-D, C-D\ngraph = {\n    \"A\": [\"B\", \"C\"],\n    \"B\": [\"A\", \"D\"],\n    \"C\": [\"A\", \"D\"],\n    \"D\": [\"B\", \"C\"],\n}\n# directed = เส้นมีทิศ; weighted = เส้นมีน้ำหนัก (ระยะทาง/ค่าใช้จ่าย)" },

      { t: "h2", c: "BFS — ค้นแบบกว้าง (ใช้ queue)" },
      { t: "p", c: "เยี่ยมทีละชั้นจากจุดเริ่ม ใช้ queue (deque) — หา \"ระยะสั้นสุด\" ใน graph ที่เส้นไม่มีน้ำหนักได้" },
      { t: "code", lang: "python", c: "from collections import deque\n\ndef bfs(graph, start):\n    visited = set([start])\n    queue = deque([start])\n    order = []\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    return order\n\nprint(bfs(graph, \"A\"))   # ['A', 'B', 'C', 'D']" },

      { t: "h2", c: "DFS — ค้นแบบลึก (ใช้ recursion/stack)" },
      { t: "code", lang: "python", c: "def dfs(graph, start, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(start)\n    print(start, end=\" \")\n    for neighbor in graph[start]:\n        if neighbor not in visited:\n            dfs(graph, neighbor, visited)\n\ndfs(graph, \"A\")   # A B D C  (ลงลึกก่อน)" },
      { t: "callout", title: "BFS vs DFS", c: "BFS ใช้ queue เยี่ยมทีละชั้น เหมาะหา shortest path (unweighted); DFS ใช้ recursion/stack ลงลึกก่อน เหมาะตรวจ connectivity/หาเส้นทาง สังเกตว่า tree (หัวข้อก่อน) คือ graph ชนิดพิเศษ และทั้งคู่ใช้ queue/stack (หัวข้อแรก ๆ) — บทนี้รวมทุกอย่างเข้าด้วยกัน" },

      { t: "h2", c: "นับ connected components" },
      { t: "code", lang: "python", c: "def count_components(graph):\n    visited = set()\n    count = 0\n    for node in graph:\n        if node not in visited:\n            count += 1\n            # ท่องทุก node ที่เชื่อมถึงด้วย BFS/DFS\n            stack = [node]\n            while stack:\n                n = stack.pop()\n                if n not in visited:\n                    visited.add(n)\n                    stack.extend(graph[n])\n    return count" },

      { t: "h2", c: "สรุปหัวข้อนี้ & จบบทเด่น" },
      {
        t: "ul",
        c: [
          "graph = จุด (vertex) + เส้น (edge); แทนด้วย adjacency list (dict)",
          "BFS: queue, เยี่ยมทีละชั้น → shortest path (unweighted)",
          "DFS: recursion/stack, ลงลึกก่อน → connectivity/หาเส้นทาง",
          "tree คือ graph พิเศษ; BFS/DFS ใช้ queue/stack ที่เรียนต้นบท",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) สร้าง graph แล้วเขียน BFS  2) เขียน DFS (recursion)  3) หาว่า 2 node เชื่อมถึงกันไหม  4) นับจำนวน connected components" },
      { t: "callout", title: "เรียนจบบทเด่นแล้ว — ฝึกต่อให้แน่น", c: "DSA ต้องฝึกโจทย์เยอะถึงจะคล่อง ไปต่อที่คอร์สโจทย์ฝึก (Practice Problems) บนเว็บนี้ ที่มีโจทย์แยกตามหัวข้อให้ลองทำ แล้วค่อยไปส่วนเตรียมตัวสายงานใน SE Roadmap" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: บทที่ 12 Concurrency & Async →", slug: "intermediate", desc: "กลับหน้าภาพรวม (บท 12 กำลังจัดทำ)" },
          { title: "ฝึกโจทย์ DSA ต่อ: คอร์ส Practice Problems", slug: "pp-basics", desc: "โจทย์แยกตามหัวข้อ พร้อมเฉลย" },
          { title: "← ก่อนหน้า: Greedy Algorithms", slug: "dsa-greedy" },
        ],
      },
    ],
  },
};
