import type { Page } from "@/lib/types";

export const treeBfsPages: Record<string, Page> = {
  "lc75-intro-tree-bfs": {
    slug: "lc75-intro-tree-bfs",
    title: {
      th: "Binary Tree — BFS (ลุยเป็นชั้น)",
      en: "Binary Tree — BFS (Level-by-Level Exploration)",
    },
    lead: {
      th: "เดินสำรวจต้นไม้ทีละชั้นจากบนลงล่างด้วย Queue (FIFO) — รูปแบบการเดินคู่หูของ DFS สำหรับโจทย์ที่ถามความสัมพันธ์แนวราบ",
      en: "Traverse a binary tree level by level using a FIFO Queue — the horizontal counterpart of DFS for layer-based problems.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "ถ้า DFS คือการดำดิ่งลงไปตามกิ่งเดียวให้ลึกที่สุดก่อนถอยกลับ... BFS (Breadth-First Search) คือการเดินกวาดแนวราบทีละชั้นจากบนลงล่าง จากซ้ายไปขวา เหมือนการกวาดเรดาร์หรือคลื่นน้ำที่แผ่ออกไป!",
        },
        {
          t: "h2",
          c: "ส่วนที่ 1 · Pattern Recognition (วิธีมองโจทย์ BFS ให้ออก)",
        },
        {
          t: "p",
          c: "เมื่อไหร่ที่ควรเลือก BFS แทน DFS? ให้สังเกตคีย์เวิร์ดในโจทย์:",
        },
        {
          t: "ul",
          c: [
            '"Level" / "ชั้น" — ถามหาค่าเฉลี่ย, ผลรวม, หรือจำนวนโหนดในแต่ละชั้น',
            '"Right side / Left side view" — มองจากด้านข้างแล้วเห็นโหนดไหนบ้างในแต่ละชั้น',
            '"Shortest path" — ทางที่สั้นที่สุดในกราฟหรือต้นไม้ที่ไม่ถ่วงน้ำหนัก',
          ],
        },
        {
          t: "image",
          src: "/leetcode-75/bfs-search.gif",
          alt: "BFS animation: visit level by level using queue",
          caption:
            "BFS: ไล่ทีละชั้นจากบนลงล่างโดยใช้ Queue (FIFO) — เข้าก่อนออกก่อน",
        },

        {
          t: "h2",
          c: "ส่วนที่ 2 · หัวใจของ BFS: collections.deque",
        },
        {
          t: "p",
          c: "ทำไมต้องใช้ `deque` จากไลบรารี `collections`? เพราะ `list.pop(0)` ใน Python ต้องขยับสมาชิกที่เหลือทั้งลิสต์ เสียเวลา O(N) ในขณะที่ `deque.popleft()` ใช้เวลา O(1) ทันที!",
        },
        {
          t: "table",
          head: ["โครงสร้าง", "คำสั่งดึงหัวแถว", "Big-O"],
          rows: [
            ["Python List ปกติ", "list.pop(0)", "O(N) (ช้ามาก ห้ามใช้)"],
            ["collections.deque", "q.popleft()", "O(1) (เร็วที่สุด แนะนำ)"],
          ],
        },

        {
          t: "h2",
          c: "ส่วนที่ 3 · แม่แบบ 2 ลูปซ้อน (Standard BFS Template)",
        },
        {
          t: "p",
          c: "จุดสำคัญที่สุดของ BFS บนต้นไม้คือการใช้ 2 ลูปซ้อนกัน: ลูปนอก `while q:` คุมทั้งต้นไม้ และลูปใน `for _ in range(level_size):` คุมเฉพาะชั้นปัจจุบัน",
        },
        {
          t: "code",
          lang: "python",
          label: "แม่แบบมาตรฐาน BFS",
          c: `from collections import deque

class Solution:
    def bfsTemplate(self, root: Optional[TreeNode]):
        if not root:
            return []

        q = deque([root])
        result = []

        while q:
            # สำคัญมาก: ล็อกขนาดของชั้นปัจจุบันไว้ก่อน
            level_size = len(q)
            current_level = []

            for _ in range(level_size):
                node = q.popleft()
                current_level.append(node.val)

                # นำลูกของชั้นถัดไปเข้าคิว (จะถูกดันไปอยู่หลัง level_size)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)

            result.append(current_level)

        return result`,
        },
        {
          t: "callout",
          title: "ทำไมต้องล็อก level_size = len(q)?",
          c: "เพราะในขณะที่ลูป `for` กำลังดึงโหนดของชั้นปัจจุบันออก เราจะมีการ `append` ลูกชั้นถัดไปใส่เข้ามาในคิวด้วย หากไม่ล็อกค่าไว้ ลูปจะขยายขนาดไปเรื่อยๆ จนแยกไม่ออกว่าโหนดไหนอยู่ชั้นไหน!",
        },
      ],
      en: [
        {
          t: "p",
          c: "While Depth-First Search (DFS) dives deeply down a single branch before backtracking, Breadth-First Search (BFS) sweeps horizontally, visiting every node at the current depth before descending to the next layer.",
        },
        {
          t: "h2",
          c: "Part 1 · Pattern Recognition",
        },
        {
          t: "ul",
          c: [
            'Level-by-level aggregates (sum, average, count per depth level).',
            'Side views (viewing from the right or left edge of the tree).',
            'Shortest path in unweighted graphs or trees.',
          ],
        },
        {
          t: "h2",
          c: "Part 2 · The 2-Loop Queue Template",
        },
        {
          t: "p",
          c: "The golden formula for level-order traversal relies on snapshotting `level_size = len(q)` before the inner loop, ensuring children enqueued during the current round wait for the next level.",
        },
      ],
    },
  },

  "lc75-p39": {
    slug: "lc75-p39",
    title: {
      th: "ข้อ 39 · LC199 Binary Tree Right Side View (มองต้นไม้จากด้านขวา) 🟡",
      en: "LC199 Binary Tree Right Side View 🟡",
    },
    lead: {
      th: "โจทย์ BFS ทีละชั้น — ในแต่ละระดับชั้น ดึงโหนดตัวขวาสุด (ตัวสุดท้ายของชั้น) มาตอบ",
      en: "Level-order BFS — capture the rightmost node at each depth level.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `Given the \`root\` of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.`,
        },
        {
          t: "p",
          c: `กำหนด \`root\` ของ binary tree มาให้ ลองจินตนาการว่าคุณยืนอยู่ทางด้านขวาของต้นไม้ จงส่งคืนลิสต์ของค่าในโหนดที่คุณสามารถมองเห็นได้ เรียงลำดับจากบนลงล่าง`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [1,2,3,null,5,null,4]",
              output: "[1,3,4]",
              explain:
                "ชั้น 0: มองเห็นโหนด 1\nชั้น 1: โหนด 3 บังโหนด 2 จึงเห็น 3\nชั้น 2: โหนด 4 อยู่ขวาสุด จึงเห็น 4\nคำตอบคือ [1, 3, 4]",
            },
            {
              input: "root = [1,null,3]",
              output: "[1,3]",
              explain: "มองเห็น 1 และ 3",
            },
            {
              input: "root = []",
              output: "[]",
              explain: "ต้นไม้ว่างเปล่า มองไม่เห็นอะไรเลย",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes in the tree is in the range [0, 100].",
            "-100 <= Node.val <= 100",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "ถ้าเรายืนมองจากขวามือ โหนดที่เราเห็นในแต่ละชั้นคือโหนดลำดับที่เท่าไรของชั้นนั้น?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ให้หาโหนดที่ 'มองเห็นจากขอบขวามือ' เรียงจากชั้นบนสุดลงไปชั้นล่างสุด ซึ่งก็คือ **โหนดตัวขวาสุดของแต่ละชั้น (ระดับความลึก)** นั่นเอง!",
            },
            {
              t: "callout",
              title: "กับดักที่พบบ่อย",
              warn: true,
              c: "อย่าหลงทางด้วยการเดินแค่ `root.right.right...` เพราะถ้ากิ่งขวาตัน แต่กิ่งซ้ายยังยาวลงไปเรื่อยๆ โหนดฝั่งซ้ายที่อยู่ลึกกว่าจะโผล่มาให้เรามองเห็นจากด้านขวาด้วยเช่นกัน!",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ลองไล่ดูทีละชั้นด้วย BFS:",
            },
            {
              t: "ul",
              c: [
                "ชั้นที่ 0: มี [1] -> ตัวสุดท้ายของชั้นคือ 1 -> บันทึก [1]",
                "ชั้นที่ 1: มี [2, 3] -> ตัวสุดท้ายของชั้นคือ 3 -> บันทึก [1, 3]",
                "ชั้นที่ 2: มี [5, 4] -> ตัวสุดท้ายของชั้นคือ 4 -> บันทึก [1, 3, 4]",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: ใช้ BFS ระดับชั้น (Level-Order Traversal) เดินทีละชั้น และหยิบค่าของโหนดตัวสุดท้ายในแต่ละชั้นมาเก็บใส่ผลลัพธ์",
            },
            {
              t: "p",
              c: "ขั้นตอนการทำงาน:",
            },
            {
              t: "ol",
              c: [
                "ถ้า `root is None` ให้คืนค่า `[]` ทันที",
                "เริ่มต้นด้วย `q = deque([root])`",
                "ในแต่ละรอบของลูป `while q:` นับขนาด `level_size = len(q)`",
                "วนลูป `for i in range(level_size):` ดึงโหนดออกมา",
                "ถ้า `i == level_size - 1` (แปลว่าเป็นตัวสุดท้ายของชั้นนี้) ให้เอาค่านั้นใส่ในผลลัพธ์ `res.append(node.val)`",
                "ยัดลูกซ้ายและลูกขวา (ถ้ามี) ต่อท้ายคิวเพื่อประมวลผลในชั้นถัดไป",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** เพื่อดูการเดินสำรวจทีละชั้น และสังเกตโหนดขวาสุดที่ถูกเลือกเข้าผลลัพธ์:",
            },
            { t: "viz", id: "tree-bfs-right-view" },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

from collections import deque

class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        q = deque([root])
        res = []

        while q:
            level_size = len(q)
            for i in range(level_size):
                node = q.popleft()

                # ถ้าเป็นโหนดตัวสุดท้ายของชั้นนี้ บันทึกเข้าคำตอบ
                if i == level_size - 1:
                    res.append(node.val)

                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)

        return res`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["if not root: return []", "ดักกรณีต้นไม้ว่างเปล่า", "root=None -> []"],
                ["q = deque([root])", "สร้าง Queue ใส่ root ตัวแรก", "q=[1]"],
                ["level_size = len(q)", "ล็อกจำนวนโหนดของชั้นปัจจุบัน", "ชั้น 1 มี 2 โหนด (level_size=2)"],
                ["if i == level_size - 1: res.append(node.val)", "เลือกเฉพาะตัวขวาสุดของแต่ละชั้น", "ตัวที่ i=1 จาก [2, 3] คือ 3"],
                ["return res", "ส่งคืนโหนดมุมมองขวาทั้งหมด", "[1, 3, 4]"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(N)", "เยี่ยมชมโหนดทุกโหนดในต้นไม้อย่างละ 1 ครั้ง"],
                ["Space (หน่วยความจำ)", "O(D)", "Queue เก็บโหนดไม่เกินความกว้างสูงสุดของชั้นในต้นไม้ (D <= N)"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given the \`root\` of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [1,2,3,null,5,null,4]",
              output: "[1,3,4]",
              explain: "Rightmost nodes at each depth: 1, 3, 4.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes in the tree is in the range [0, 100].",
            "-100 <= Node.val <= 100",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Return the rightmost node at every level of the tree from top to bottom.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "At level 0: [1] -> pick 1. Level 1: [2, 3] -> pick 3. Level 2: [5, 4] -> pick 4. Answer: [1, 3, 4].",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Perform standard BFS level-order traversal. For each level, append the value of the last node (`i == level_size - 1`) to the result list.",
            },

            { t: "h3", c: "Step 4 · Interactive Walkthrough" },
            { t: "viz", id: "tree-bfs-right-view" },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `from collections import deque

class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        q = deque([root])
        res = []

        while q:
            level_size = len(q)
            for i in range(level_size):
                node = q.popleft()
                if i == level_size - 1:
                    res.append(node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)

        return res`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["if not root: return []", "Handle empty tree", "root=None -> []"],
                ["level_size = len(q)", "Snapshot current level's node count", "level_size=2"],
                ["if i == level_size - 1:", "Identify the rightmost node", "i=1 is the last item"],
                ["return res", "Return view values", "return [1, 3, 4]"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(N)", "Every node visited exactly once."],
                ["Space", "O(D)", "Queue holds at most the maximum level width."],
              ],
            },
          ],
        },
      ],
    },
  },

  "lc75-p40": {
    slug: "lc75-p40",
    title: {
      th: "ข้อ 40 · LC1161 Maximum Level Sum of a Binary Tree (ผลรวมชั้นมากสุด) 🟡",
      en: "LC1161 Maximum Level Sum of a Binary Tree 🟡",
    },
    lead: {
      th: "โจทย์ BFS หาผลรวมแต่ละชั้น — คำนวณ sum ของแต่ละ level แล้วจำหมายเลขชั้นที่ได้คะแนนสูงสุด",
      en: "Level-order BFS — sum each tree level and track the depth level with the maximal sum.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `Given the \`root\` of a binary tree, the level of its root is \`1\`, the level of its children is \`2\`, and so on.

Return the smallest level \`x\` such that the sum of all the values of nodes at level \`x\` is maximal.`,
        },
        {
          t: "p",
          c: `กำหนด \`root\` ของ binary tree มาให้ โดยกำหนดให้ระดับของ root คือชั้นที่ \`1\`, ระดับของลูกคือชั้นที่ \`2\` เป็นต้นไป

จงส่งคืน "หมายเลขชั้นที่น้อยที่สุด" ที่มีผลรวมของค่าในโหนดทั้งหมดในชั้นนั้นมากที่สุด (maximal level sum)`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [1,7,0,7,-8,null,null]",
              output: "2",
              explain:
                "ชั้น 1: ผลรวม = 1\nชั้น 2: ผลรวม = 7 + 0 = 7\nชั้น 3: ผลรวม = 7 + (-8) = -1\nผลรวมสูงสุดคือ 7 ซึ่งเกิดขึ้นที่ชั้น 2 จึงตอบ 2",
            },
            {
              input: "root = [989,null,10250,98694,-34387,null,null,-89387,null]",
              output: "2",
              explain: "ผลรวมสูงสุดอยู่ที่ชั้น 2",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes in the tree is in the range [1, 10^4].",
            "-10^5 <= Node.val <= 10^5",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "ถ้ามีหลายชั้นที่มีผลรวมเท่ากันและเป็นค่าสูงสุด โจทย์ให้ตอบชั้นไหน? ระวังค่าเริ่มต้นของ max_sum ในกรณีที่ค่าในโหนดทั้งหมดติดลบ!",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ให้หาว่าชั้นไหน (เริ่มนับที่ชั้น 1) มีผลบวกของค่าในโหนดทั้งหมดสูงที่สุด หากมีหลายชั้นที่ผลรวมเท่ากัน ให้ส่งคืนหมายเลขชั้นที่น้อยที่สุด (ชั้นที่อยู่ตื้นกว่า)",
            },
            {
              t: "callout",
              title: "กับดักเรื่องค่าติดลบ",
              warn: true,
              c: "ห้ามตั้ง `max_sum = 0` เด็ดขาด! เพราะค่าของโหนดสามารถติดลบได้ (เช่น ทุกชั้นรวมกันได้ -10, -50) ถ้าตั้ง 0 ค่าจะไม่ถูกอัปเดต ให้ตั้งต้น `max_sum = float('-inf')` เสมอ",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "คำนวณผลรวมทีละชั้นสำหรับ root = [1, 7, 0, 7, -8]:",
            },
            {
              t: "ul",
              c: [
                "ชั้น 1: มี [1] -> ผลรวม = 1 -> ดีที่สุดตอนนี้ (max_sum = 1, best_level = 1)",
                "ชั้น 2: มี [7, 0] -> ผลรวม = 7 -> 7 > 1 (ดีกว่าเดิม!) -> อัปเดต (max_sum = 7, best_level = 2)",
                "ชั้น 3: มี [7, -8] -> ผลรวม = -1 -> -1 ไม่มากกว่า 7 -> คงเดิม",
                "สรุปตอบชั้น 2",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: ใช้ Level-order BFS คำนวณผลรวม `level_sum` ในแต่ละชั้น และรักษาตัวแปร `best_level` ไว้อัปเดต",
            },
            {
              t: "p",
              c: "เครื่องมือและตัวแปรที่ต้องใช้:",
            },
            {
              t: "ol",
              c: [
                "`max_sum = float('-inf')`: เก็บผลรวมสูงสุดที่เคยเจอ",
                "`best_level = 1`: เก็บหมายเลขชั้นที่ดีที่สุด",
                "`current_level = 1`: ตัวนับหมายเลขชั้นปัจจุบัน (เริ่มที่ 1 ตามโจทย์)",
                "`q = deque([root])`: คิวสำหรับ BFS",
                "ในแต่ละชั้น: รวมค่าโหนดทั้งหมดในชั้นนั้นเป็น `level_sum`",
                "ตรวจสอบ: ถ้า `level_sum > max_sum` ให้ตั้ง `max_sum = level_sum` และ `best_level = current_level` (ใช้ `>` อย่างเคร่งครัด เพื่อให้ชั้นที่น้อยกว่าชนะเมื่อเสมอกัน)",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** เพื่อดูการคำนวณผลรวมทีละชั้น และการอัปเดตชั้นที่ดีที่สุด:",
            },
            { t: "viz", id: "tree-bfs-level-sum" },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

from collections import deque

class Solution:
    def maxLevelSum(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 1

        q = deque([root])
        max_sum = float('-inf')   # กันเคสค่าติดลบทั้งหมด
        best_level = 1
        curr_level = 1

        while q:
            level_size = len(q)
            level_sum = 0

            # คำนวณผลรวมเฉพาะโหนดในชั้นปัจจุบัน
            for _ in range(level_size):
                node = q.popleft()
                level_sum += node.val

                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)

            # อัปเดตเมื่อเจอผลรวมที่มากกว่าเดิมอย่างเคร่งครัด
            if level_sum > max_sum:
                max_sum = level_sum
                best_level = curr_level

            curr_level += 1

        return best_level`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["max_sum = float('-inf')", "กำหนดค่าลบอนันต์เพื่อรองรับโหนดติดลบ", "max_sum = -inf"],
                ["level_sum += node.val", "สะสมผลรวมของทุกโหนดในชั้นนี้", "ชั้น 2: 7 + 0 = 7"],
                ["if level_sum > max_sum:", "เช็คว่าทำลายสถิติผลรวมเดิมไหม (ไม่ใช้ >= เพื่อคงชั้นที่น้อยกว่า)", "7 > 1 -> อัปเดต"],
                ["curr_level += 1", "ก้าวเข้าสู่ชั้นถัดไป", "1 -> 2 -> 3"],
                ["return best_level", "ส่งคืนหมายเลขชั้นที่มีผลรวมสูงสุด", "return 2"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(N)", "ผ่านทุกโหนดในต้นไม้อย่างละ 1 ครั้ง"],
                ["Space (หน่วยความจำ)", "O(D)", "Queue เก็บโหนดสูงสุดเท่ากับความกว้างของชั้นที่กว้างที่สุด"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given the \`root\` of a binary tree, the level of its root is \`1\`, the level of its children is \`2\`, and so on. Return the smallest level \`x\` such that the sum of all the values of nodes at level \`x\` is maximal.`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [1,7,0,7,-8,null,null]",
              output: "2",
              explain: "Level 1 sum = 1, Level 2 sum = 7, Level 3 sum = -1. Max sum is at level 2.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes in the tree is in the range [1, 10^4].",
            "-10^5 <= Node.val <= 10^5",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Find the 1-based level index with the maximum node value sum. In case of a tie, return the smallest level number.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "Level 1: 1 (max=1, best=1). Level 2: 7+0=7 (7 > 1 -> max=7, best=2). Level 3: 7+(-8)=-1. Return 2.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Use BFS level-order traversal. Initialize `max_sum = float('-inf')` to handle negative sums. Use strict `>` comparison to favor smaller level numbers on ties.",
            },

            { t: "h3", c: "Step 4 · Interactive Walkthrough" },
            { t: "viz", id: "tree-bfs-level-sum" },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `from collections import deque

class Solution:
    def maxLevelSum(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 1

        q = deque([root])
        max_sum = float('-inf')
        best_level = 1
        curr_level = 1

        while q:
            level_size = len(q)
            level_sum = 0

            for _ in range(level_size):
                node = q.popleft()
                level_sum += node.val
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)

            if level_sum > max_sum:
                max_sum = level_sum
                best_level = curr_level

            curr_level += 1

        return best_level`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["max_sum = float('-inf')", "Initialize with negative infinity", "Handles all-negative nodes"],
                ["level_sum += node.val", "Sum all nodes at current depth", "7 + 0 = 7"],
                ["if level_sum > max_sum:", "Update only on strict improvement", "Tie favors smaller level"],
                ["return best_level", "Return best level index", "return 2"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(N)", "Every tree node visited once."],
                ["Space", "O(D)", "Queue holds at most the maximum level width."],
              ],
            },
          ],
        },
      ],
    },
  },
};
