import type { Page } from "@/lib/types";

export const treeBfsPages: Record<string, Page> = {
  "lc75-intro-tree-bfs": {
    slug: "lc75-intro-tree-bfs",
    title: { th: "Binary Tree — BFS (ลุยเป็นชั้น)", en: "" },
    lead: { th: "traverse (เดินไล่) ต้นไม้ทีละ level (ชั้น) จากบนลงล่างด้วย queue (คิว) แบบ level-order — เครื่องมือคู่หูของ DFS สำหรับโจทย์ที่ถามเป็นชั้น ๆ", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "หมวดที่แล้วเราใช้ DFS ลุยดิ่งลงกิ่งเดียวให้สุดก่อน หมวดนี้เราจะเจอวิธี traverse ต้นไม้อีกแบบที่ตรงข้ามกันเลย คือไล่ทีละ level จากบนลงล่าง ซ้ายไปขวา เรียกว่า BFS มันเหมาะกับโจทย์ที่ถามอะไรที่เป็น \"level\" เช่น ค่าของแต่ละ level หรือ node ขวาสุดของแต่ละ level" },

              { t: "h2", c: "BFS / level-order คืออะไร" },
              { t: "p", c: "BFS ย่อมาจาก Breadth-First Search แปลว่า \"ค้นแบบกวาดกว้างก่อน\" บนต้นไม้เรามักเรียกอีกชื่อว่า level-order traversal คือ traverse ครบทั้ง level หนึ่งก่อน แล้วค่อยลง level ถัดไป ลองนึกภาพต้นไม้นี้: เราจะแตะ 3 ก่อน (level 1) แล้วแตะ 9, 20 (level 2) แล้วค่อย 15, 7 (level 3)" },
              { t: "code", c: `          3          <- ชั้น 1: [3]
                 / \\
                9   20         <- ชั้น 2: [9, 20]
                   /  \\
                  15   7       <- ชั้น 3: [15, 7]

        # ลำดับที่ BFS แตะ node: 3, 9, 20, 15, 7 (บนลงล่าง ซ้ายไปขวา)` },
              { t: "p", c: "เครื่องมือหัวใจของ BFS คือ queue (คิว) — โครงสร้างแบบ \"เข้าก่อนออกก่อน\" (FIFO) เราสร้าง queue ด้วย collections.deque (คิวสองหัว) ของ Python ซึ่ง popleft() (เอาตัวหน้าออก) เร็ว O(1) ต่างจาก list ธรรมดาที่ pop(0) ช้า O(n) ไอเดียคือ: enqueue root ใส่ queue แล้ว loop (วน) pop ออกทีละตัว พอ pop node ไหนออกมาก็ append (ต่อท้าย) left child และ right child ของมันเข้า queue loop แบบนี้ node จะทยอยออกมาเรียงตาม level พอดี" },
              { t: "table", head: ["operation", "deque", "list ธรรมดา"], rows: [
                ["append() ต่อท้าย", "O(1)", "O(1)"],
                ["popleft() / pop(0) ดึงตัวหน้า", "O(1)", "O(n)"],
              ] },
              { t: "callout", title: "เคล็ด loop ทีละ level", c: "ก่อนเริ่ม loop แต่ละ level ให้จด size = len(queue) ไว้ก่อน นั่นคือจำนวน node ของ level นั้นพอดี แล้ว loop pop ออกมา size ครั้ง = จบหนึ่ง level เป๊ะ ๆ เทคนิคนี้ทำให้เราแยกแต่ละ level ออกจากกันได้ทั้งที่ทุก node ปนอยู่ใน queue เดียว" },
              { t: "code", lang: "python", c: `from collections import deque

        # template BFS วนทีละชั้น ใช้ได้แทบทุกโจทย์ level-order
        def level_order(root):
            if root is None:
                return
            queue = deque([root])          # เริ่มด้วย root ในคิว
            while queue:
                size = len(queue)          # จำนวน node ของชั้นนี้ (จดไว้ก่อน!)
                for _ in range(size):      # วนให้ครบทั้งชั้น
                    node = queue.popleft() # ดึงตัวหน้าออก O(1)
                    # ... ทำอะไรกับ node ตรงนี้ ...
                    if node.left:
                        queue.append(node.left)   # โยนลูกซ้ายเข้าคิว
                    if node.right:
                        queue.append(node.right)  # โยนลูกขวาเข้าคิว
                # จบ for = จบหนึ่งชั้นพอดี` },

              { t: "callout", title: "พร้อมลุยแล้ว", c: "หมวดนี้มี 2 ข้อ (LC199, LC1161) ทั้งคู่ใช้ template วนทีละชั้นด้านบนเป็นแกน พร้อมแล้วกดถัดไปเริ่มข้อแรกได้เลย" },
      ],
      en: [],
    },
  },

  "lc75-p39": {
    slug: "lc75-p39",
    title: { th: "ข้อ 39 · LC199 Binary Tree Right Side View (มุมมองด้านขวา) 🟡", en: "" },
    lead: { th: "คืน node ขวาสุดของแต่ละชั้น ด้วย BFS วนทีละชั้นแล้วเก็บตัวสุดท้าย", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC199): กำหนด root ของ binary tree มาให้ ให้จินตนาการว่ายืนอยู่ทางด้านขวาของต้นไม้ ให้ return ค่าของ node ที่มองเห็นได้ เรียงจากบนลงล่าง (= node ขวาสุดของแต่ละ level — ถ้า level นั้นฝั่งขวาไม่มี node ก็จะเห็นตัวที่อยู่ขวาสุดเท่าที่มีแทน)" },
              {
                t: "example",
                c: [
                  {
                    input: "root = [1,2,3,null,5,null,4]",
                    output: "[1,3,4]",
                    explain: "เห็น 1 ที่ชั้น 1, เห็น 3 ที่ชั้น 2 (บัง 2 ไว้), เห็น 4 ที่ชั้น 3 (บัง 5 ไว้)",
                  },
                  {
                    input: "root = [1,2,3,4]",
                    output: "[1,3,4]",
                    explain: "ชั้น 3 มีแค่ node 4 (ลูกซ้ายของ 2) เพราะ node 3 ไม่มีลูกเลย จึงเห็น 4 เป็นตัวขวาสุดเท่าที่มีในชั้นนั้น",
                  },
                  {
                    input: "root = [1,2,3,4,null,null,null,5]",
                    output: "[1,3,4,5]",
                    explain: "ชั้น 3 มีแค่ node 4 ตัวเดียว (node 3 ไม่มีลูก) ชั้น 4 มีแค่ node 5 ซึ่งเป็นลูกซ้ายของ 4 แต่เป็นตัวเดียวในชั้นจึงมองเห็น",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "จำนวน node อยู่ระหว่าง 0 ถึง 100",
                "-100 <= Node.val <= 100",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ BFS loop ทีละ level ตาม template แล้วเก็บเฉพาะ node ตัวสุดท้ายที่ pop ออกในแต่ละ level (ตำแหน่ง size - 1) ซึ่งคือ node ขวาสุดของ level นั้นพอดี" },
              { t: "p", c: "ถ้าคิดง่าย ๆ ว่า \"คำตอบคือ right child ของทุก node\" จะพลาด เพราะบาง level ฝั่งขวาว่างแต่ฝั่งซ้ายยังมี node การยึด \"ตัวสุดท้ายใน level\" จาก BFS แก้ปัญหานี้ได้หมด" },
              { t: "ol", c: [
                "ถ้า root เป็น None return [] ทันที",
                "ตั้ง result = [] และ queue = deque([root])",
                "loop while queue: จด size = len(queue)",
                "loop for i in range(size): pop node ออกมา",
                "ถ้า i == size - 1 (ตัวสุดท้ายของ level) append node.val เข้า result",
                "append left child ก่อน right child เข้า queue เสมอ เพื่อให้ขวาสุดออกท้ายสุด",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "เผลอเก็บแต่ node.right จะพลาดกรณี level นั้นฝั่งขวาว่างแต่ฝั่งซ้ายมี node — ต้องยึด \"ตัวสุดท้ายใน level\" และอย่าลืมเช็ค root เป็น None ตั้งแต่ต้น" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "จำลองบนต้น [1,2,3,null,5,null,4] — คอลัมน์ \"เก็บ\" คือตัวที่ i == size-1" },
              { t: "table", head: ["level", "node ใน level (ซ้าย→ขวา)", "size", "ตัวสุดท้าย (เก็บ)"], rows: [
                ["1", "[1]", "1", "1"],
                ["2", "[2, 3]", "2", "3"],
                ["3", "[5, 4]", "2", "4"],
              ] },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ class นี้มาให้แล้ว ที่เขียนไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
        class TreeNode:
            def __init__(self, val=0, left=None, right=None):
                self.val = val
                self.left = left
                self.right = right


        from collections import deque

        # class TreeNode:
        #     def __init__(self, val=0, left=None, right=None):
        #         self.val = val
        #         self.left = left
        #         self.right = right

        def rightSideView(root):
            if root is None:
                return []
            result = []
            queue = deque([root])
            while queue:
                size = len(queue)
                for i in range(size):
                    node = queue.popleft()
                    if i == size - 1:            # ตัวสุดท้ายของชั้น = ขวาสุด
                        result.append(node.val)
                    if node.left:
                        queue.append(node.left)  # ต้องใส่ซ้ายก่อนขวา
                    if node.right:
                        queue.append(node.right) # เพื่อให้ขวาสุดออกท้ายสุด
            return result

        # ต้นไม้ [1, 2, 3, null, 5, null, 4]
        root = TreeNode(1, TreeNode(2, None, TreeNode(5)), TreeNode(3, None, TreeNode(4)))
        print(rightSideView(root))`, out: `[1, 3, 4]` },
                { t: "p", c: "หัวใจคือใช้ template วนทีละชั้น แล้วเช็คว่า i == size - 1 ไหม ถ้าใช่แปลว่าเป็นตัวสุดท้ายที่ออกจากชั้นนี้ = ขวาสุด เก็บค่าเข้า result ที่ต้อง append ลูกซ้ายก่อนลูกขวาเสมอ เพื่อรับประกันว่าภายในชั้นถัดไป node จะเรียงซ้ายไปขวา ตัวที่ออกท้ายสุดจึงเป็นตัวขวาสุดจริง ๆ" },
                { t: "p", c: "จุดพลาดที่พบบ่อยคือเผลอคิดว่าคำตอบคือลูกขวาของทุก node หรือเก็บแต่ node.right ซึ่งจะพลาดกรณีที่ชั้นนั้นฝั่งขวาว่างแต่ฝั่งซ้ายมี node การยึดตำแหน่ง \"ตัวสุดท้ายในชั้น\" แก้ปัญหานี้ได้หมด อย่าลืมเช็ค root เป็น None ตั้งแต่ต้นด้วย" },
                { t: "p", c: "Time O(n) แตะทุก node ครั้งเดียว · Space O(w) โดย w คือความกว้างมากสุดของต้นไม้ = จำนวน node มากสุดในคิวพร้อมกันในหนึ่งชั้น กรณีแย่สุด w ราว ๆ n/2" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "BFS วนทีละชั้นด้วย size = len(queue) แล้วเลือก node ตามตำแหน่งในชั้น (ตัวแรก/ตัวสุดท้าย/ทุกตัว) ตอบโจทย์ \"ต่อชั้น\" ได้แทบทุกแบบ" },
      ],
      en: [],
    },
  },

  "lc75-p40": {
    slug: "lc75-p40",
    title: { th: "ข้อ 40 · LC1161 Maximum Level Sum of a Binary Tree (ชั้นผลรวมมากสุด) 🟡", en: "" },
    lead: { th: "หาเลขชั้นที่ผลรวมค่ามากที่สุด ด้วย BFS วนทีละชั้นแล้วบวกและเทียบ", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC1161): กำหนด root ของ binary tree มาให้ โดยกำหนดว่า level ของ root คือ 1, level ของ child คือ 2 ไล่ลงไปเรื่อย ๆ ให้ return เลข level x ที่น้อยที่สุด ซึ่งผลรวมค่าของ node ทั้งหมดใน level x นั้นมากที่สุด (ค่าติดลบมีได้)" },
              {
                t: "example",
                c: [
                  {
                    input: "root = [1,7,0,7,-8,null,null]",
                    output: "2",
                    explain: "ชั้น 1 = 1, ชั้น 2 = 7 + 0 = 7, ชั้น 3 = 7 + (-8) = -1 — ชั้นที่ผลรวมมากที่สุดคือชั้น 2",
                  },
                  {
                    input: "root = [989,null,10250,98693,-89388,null,null,null,-32127]",
                    output: "2",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "จำนวน node อยู่ระหว่าง 1 ถึง 10^4",
                "-10^5 <= Node.val <= 10^5",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ BFS loop ทีละ level ตาม template เพิ่ม counter level ที่บวก 1 ทุกครั้งที่ขึ้น level ใหม่ และ track ผลรวมค่าทุก node ใน level เป็น total เมื่อจบ level ก็ compare กับผลรวมมากสุดที่เคยเจอ" },
              { t: "p", c: "โจทย์นี้ทำด้วย DFS (พก level ลงไปแล้วสะสมผลรวมต่อ level) ก็ได้ แต่ BFS เข้ากับโจทย์ \"เป็น level\" อย่างเป็นธรรมชาติกว่า เพราะเรากำหนดขอบเขตแต่ละ level ชัดเจนด้วย size" },
              { t: "ol", c: [
                "ตั้ง best_sum = -inf, best_level = 1, level = 0, queue = deque([root])",
                "loop while queue: เพิ่ม level += 1 (ขึ้น level ใหม่)",
                "จด size = len(queue) และ total = 0",
                "loop pop ทั้ง level: total += node.val แล้ว append left child, right child เข้า queue",
                "จบ level: ถ้า total > best_sum update best_sum และ best_level = level",
                "return best_level",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "initialize (ตั้งค่าเริ่มต้น) best_sum ด้วย 0 จะพังถ้าทุก level ผลรวมติดลบ ต้องเริ่ม float('-inf') และใช้ > (ไม่ใช่ >=) เพื่อให้ผลรวมเสมอกันเก็บ level แรกไว้ตามโจทย์ อีกทั้ง level เริ่มนับที่ 1 ไม่ใช่ 0" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "จำลองบนต้น [1,7,0,7,-8,null,null]" },
              { t: "table", head: ["level", "node ใน level", "total", "best_sum / best_level หลัง level นี้"], rows: [
                ["1", "[1]", "1", "1 / 1"],
                ["2", "[7, 0]", "7", "7 / 2"],
                ["3", "[7, -8]", "-1", "7 / 2 (ไม่อัปเดต)"],
              ] },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ class นี้มาให้แล้ว ที่เขียนไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
        class TreeNode:
            def __init__(self, val=0, left=None, right=None):
                self.val = val
                self.left = left
                self.right = right


        from collections import deque

        def maxLevelSum(root):
            best_sum = float('-inf')   # ผลรวมมากสุดที่เจอ (เริ่ม -inf กันค่าติดลบ)
            best_level = 1             # เลขชั้นที่ให้ผลรวมมากสุด
            level = 0
            queue = deque([root])
            while queue:
                level += 1            # ขึ้นชั้นใหม่
                size = len(queue)
                total = 0
                for _ in range(size):
                    node = queue.popleft()
                    total += node.val         # บวกทุก node ในชั้นนี้
                    if node.left:
                        queue.append(node.left)
                    if node.right:
                        queue.append(node.right)
                if total > best_sum:          # เจอชั้นที่รวมมากกว่าเดิม
                    best_sum = total
                    best_level = level
            return best_level

        # ต้นไม้ [1, 7, 0, 7, -8, null, null]
        root = TreeNode(1, TreeNode(7, TreeNode(7), TreeNode(-8)), TreeNode(0))
        print(maxLevelSum(root))`, out: `2` },
                { t: "p", c: "โครงเดียวกับข้อก่อน เพิ่มตัวนับ level ที่บวก 1 ทุกครั้งที่เริ่มชั้นใหม่ และตัวแปร total บวกค่าทุก node ในชั้น เมื่อจบชั้นก็เทียบ total กับ best_sum ถ้ามากกว่าจึงอัปเดต ใช้ > (มากกว่าเท่านั้น ไม่ใช่ >=) เพื่อให้เมื่อผลรวมเสมอกัน เราเก็บชั้นแรก (เลขน้อยกว่า) ไว้ตามที่โจทย์ต้องการ" },
                { t: "p", c: "จุดพลาดที่พบบ่อยคือเริ่ม best_sum ด้วย 0 ซึ่งพังทันทีถ้าทุกชั้นมีผลรวมติดลบ ต้องเริ่มด้วย float('-inf') และอย่าลืมว่าโจทย์นับชั้นเริ่มที่ 1 ไม่ใช่ 0 โจทย์นี้ทำด้วย DFS ก็ได้ แต่ BFS เข้ากับโจทย์ \"เป็นชั้น\" อย่างเป็นธรรมชาติกว่า" },
                { t: "p", c: "Time O(n) แตะทุก node ครั้งเดียว · Space O(w) โดย w คือความกว้างมากสุดของต้นไม้ (จำนวน node มากสุดในคิวพร้อมกัน)" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "BFS + ตัวสะสมต่อชั้น (ผลรวม/จำนวน/max) แล้วเทียบข้ามชั้น: เมื่อโจทย์ถามหา \"ชั้นที่ดีที่สุด\" ใช้ level counter + ตัวแปรเก็บแชมป์ ด้วยเงื่อนไข > เพื่อรักษาชั้นแรกเมื่อเสมอ" },
      ],
      en: [],
    },
  },
};
