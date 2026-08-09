import type { Page } from "@/lib/types";

export const treeDfsPages: Record<string, Page> = {
  "lc75-intro-tree-dfs": {
    slug: "lc75-intro-tree-dfs",
    title: {
      th: "Binary Tree & DFS — จากศูนย์จนพร้อมลุย LeetCode",
      en: "",
    },
    lead: {
      th: "ทิ้งแถวยาว มาปลูกต้นไม้ — รู้จัก TreeNode · DFS (ค้นแบบลงลึกก่อน) · recursion (การเรียกตัวเอง) แล้วจับ 3 patterns ที่ใช้ลุยโจทย์ได้จริง",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "จนถึงตอนนี้เราเล่นกับข้อมูลที่เรียงเป็นแถวยาว ๆ (array, string, linked list) มาตลอด หมวดนี้เราจะเจอโครงสร้างแบบใหม่ที่แตกกิ่งก้านเหมือนต้นไม้ ชื่อว่า binary tree (ต้นไม้ทวิภาค — แต่ละโหนดมีลูกได้มากสุดสองตัว) — โผล่ในโจทย์สัมภาษณ์บ่อยมาก",
        },
        {
          t: "p",
          c: "เครื่องมือหลักที่ใช้เดินต้นไม้คือ DFS (Depth-First Search = ค้นแบบลงลึกก่อน) ที่มักเขียนด้วย recursion (การเรียกตัวเอง) ถ้ายังไม่เคยรู้จัก tree เลยก็ไม่เป็นไร หน้านี้เริ่มจากศูนย์ จับมือสร้างต้นเล็ก ๆ แล้วค่อยไปลุยโจทย์ทีละข้อในหน้าถัดไปครับ",
        },

        { t: "h2", c: "1. ปลดล็อกไอเดีย: จากแถวยาว → ต้นไม้กลับหัว" },
        {
          t: "p",
          c: "Array / Linked List คือ \"แถวคนต่อแถว\" — เดินไปข้างหน้าทีละคน Binary tree คือ \"ต้นไม้กลับหัว\": รากอยู่บนสุด แล้วแตกกิ่งลงล่างได้มากสุดสองทาง",
        },
        {
          t: "ul",
          c: [
            "ข้อดี: แบ่งปัญหาเป็นสองต้นย่อยที่หน้าตาเหมือนกัน → ใช้ recursion (การเรียกตัวเอง) ได้พอดิบพอดี",
            "ข้อเสีย: ไม่มี index ให้กระโดด — ต้องเดินจาก root ลงไปทีละกิ่งเท่านั้น",
          ],
        },

        { t: "h2", c: "2. ศัพท์ที่ต้องจำให้ขึ้นใจ" },
        {
          t: "ul",
          c: [
            "binary tree (ต้นไม้ทวิภาค) — โครงสร้างที่แต่ละ node มีลูกได้มากสุด 2 ตัว",
            "root (ราก) — node บนสุด จุดเริ่มต้นของต้นไม้ทั้งต้น",
            "node (โหนด) — กล่องแต่ละกล่องที่เก็บค่า + ลิงก์ไปหาลูก",
            "left / right child (ลูกซ้าย / ลูกขวา) — มีได้ฝั่งละไม่เกินหนึ่ง",
            "parent (แม่) — node ที่ชี้ลงมาหา node นั้น",
            "leaf (ใบ) — node ที่ไม่มีลูกเลย (left และ right เป็น None)",
            "subtree (ต้นย่อย) — ต้นไม้ที่เริ่มจาก node ใด ๆ ลงไป",
            "height / depth (ความสูง / ความลึก) — จำนวนชั้นจาก root ลงไปถึง leaf ที่ไกลสุด",
            "traverse (เดินไล่) — การเดินผ่าน node ในต้นไม้อย่างมีระบบ",
            "DFS (Depth-First Search) — ค้นแบบลงลึกก่อน: เลือกกิ่งหนึ่งดิ่งลงสุดก่อน ค่อยถอยกลับมาลองกิ่งอื่น",
            "BFS (Breadth-First Search) — ค้นแบบกว้างก่อน: ไล่ทีละชั้นจากบนลงล่าง (เรียนหมวดถัดไป)",
            "recursion (การเรียกตัวเอง) — ฟังก์ชันเรียกตัวเองเพื่อแก้ปัญหาย่อยที่หน้าตาเหมือนกัน",
            "backtrack (ถอยกลับ) — เดินลงกิ่งหนึ่งเสร็จแล้วถอยขึ้นมา แล้วไปลองกิ่งอื่นต่อ",
          ],
        },
        {
          t: "p",
          c: "ลองดูรูปนี้ — root อยู่บน leaf อยู่ล่าง เส้น / กับ \\ คือลิงก์จาก parent ลงไปหาลูก",
        },
        {
          t: "code",
          c: `          3          <- root (ชั้น 1)
         / \\
        9   20         <- ชั้น 2
           /  \\
          15   7       <- ชั้น 3 (9, 15, 7 เป็น leaf)

# ความสูง = 3 ชั้น
# 20 มีลูกซ้าย = 15, ลูกขวา = 7
# 9 ไม่มีลูก จึงเป็น leaf`,
        },

        { t: "h2", c: "3. [Workshop] สร้างต้นไม้ด้วยมือ (Absolute Zero)" },
        {
          t: "p",
          c: "LeetCode ให้คลาส TreeNode มาให้แล้ว — แต่เรามาประกอบต้นเล็ก ๆ ด้วยมือก่อน เพื่อให้ภาพชัด",
        },
        {
          t: "code",
          lang: "python",
          label: "พิมพ์เขียว TreeNode",
          c: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val      # ค่าในกล่องนี้
        self.left = left    # ลูกซ้าย (TreeNode หรือ None)
        self.right = right  # ลูกขวา (TreeNode หรือ None)`,
        },
        {
          t: "p",
          c: "ขั้นที่ 1: ผลิตกล่องสามใบ — ตอนนี้ยังไม่เกี่ยวกัน",
        },
        {
          t: "code",
          lang: "python",
          c: `a = TreeNode(3)
b = TreeNode(9)
c = TreeNode(20)`,
        },
        {
          t: "p",
          c: "ขั้นที่ 2: เกี่ยวกิ่ง — ให้ 3 เป็น root มีลูกซ้าย 9 ลูกขวา 20",
        },
        {
          t: "code",
          lang: "python",
          c: `a.left = b
a.right = c
# ตอนนี้: 3
#         / \\
#        9   20`,
        },
        {
          t: "p",
          c: "ขั้นที่ 3: เติมลูกให้ 20 แล้วพิสูจน์ว่าเกี่ยวกันจริง",
        },
        {
          t: "codeout",
          lang: "python",
          label: "พิสูจน์ว่ากิ่งเกี่ยวกันจริง",
          code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

root = TreeNode(3)
root.left = TreeNode(9)
root.right = TreeNode(20, TreeNode(15), TreeNode(7))

print(root.val)              # 3
print(root.left.val)         # 9
print(root.right.left.val)   # 15
print(root.right.right.val)  # 7`,
          out: `3
9
15
7`,
        },

        { t: "h2", c: "4. DFS คืออะไร และทำไมใช้ recursion" },
        {
          t: "p",
          c: 'DFS ย่อมาจาก Depth-First Search แปลตรงตัวว่า "ค้นหาแบบลงลึกก่อน" — เลือกกิ่งหนึ่งแล้ว traverse (เดินไล่) ดิ่งลงไปให้สุดจนชน leaf แล้วค่อย backtrack (ถอยกลับ) มาลองกิ่งอื่น ต่างจาก BFS (Breadth-First Search = ค้นแบบกว้างก่อน) ที่ไล่ทีละชั้น ซึ่งเราจะเรียนหมวดถัดไป',
        },
        {
          t: "p",
          c: "recursion แปลว่า \"การเรียกตัวเอง\" — คือเขียนฟังก์ชันที่เรียกตัวเองเพื่อแก้ปัญหาย่อยที่หน้าตาเหมือนปัญหาใหญ่ ทำไม recursion เข้ากับ tree ได้พอดิบพอดี? เพราะ left child ของ node ก็คือ root ของ subtree อีกต้นหนึ่ง — ทุก node จึงเป็น \"ปัญหาย่อยหน้าตาเหมือนกันเป๊ะ\" เราเขียนวิธีแก้ที่ node เดียว แล้วสั่งให้เรียกตัวเองกับลูกซ้ายและลูกขวา",
        },
        {
          t: "callout",
          title: "หัวใจของ recursion บน tree",
          c: "ทุกฟังก์ชัน recursion ต้องมี 2 ส่วน: (1) base case (เงื่อนไขหยุด) — มักเป็น \"ถ้า node เป็น None ให้คืนค่าเริ่มต้น\" กันไม่ให้เรียกทะลุปลายกิ่ง และ (2) recursive case (กรณีเรียกตัวเองต่อ) — แก้ที่ node ปัจจุบันโดยอาศัยคำตอบของลูกซ้ายและลูกขวา",
        },
        {
          t: "code",
          lang: "python",
          label: "template ที่ใช้ได้แทบทุกข้อ",
          c: `def dfs(node):
    if node is None:        # (1) base case: ตกขอบแล้ว — หยุดเรียกตัวเอง
        return              #     คืน 0 / None / [] แล้วแต่โจทย์

    # (2) recursive case: ถามสองต้นย่อยก่อน (เรียกตัวเอง)
    left = dfs(node.left)
    right = dfs(node.right)

    # รวม left, right กับ node.val เป็นคำตอบของต้นนี้
    return combine(node.val, left, right)`,
        },

        { t: "h2", c: "5. ลำดับการเดิน: preorder / inorder / postorder" },
        {
          t: "p",
          c: "เวลา traverse ด้วย DFS ที่แต่ละ node เราแตะ 3 อย่าง: ตัวเอง (N), ต้นย่อยซ้าย (L), ต้นย่อยขวา (R) — ลำดับที่เลือกทำมีชื่อต่างกัน แต่ทั้งหมดยังเป็น DFS (ลงลึกก่อน) เหมือนกัน",
        },
        {
          t: "table",
          head: ["ชื่อ", "ลำดับ", "จำง่าย ๆ / ใช้ตอนไหน"],
          rows: [
            ["preorder (ก่อนลำดับ)", "N → L → R", "ทำตัวเองก่อนค่อยลงลูก — ส่ง state ลงล่าง (top-down)"],
            ["inorder (ตามลำดับ)", "L → N → R", "ซ้ายก่อนค่อยตัวเอง — บน BST ได้ค่าเรียงจากน้อยไปมาก"],
            ["postorder (หลังลำดับ)", "L → R → N", "ลูกเสร็จก่อนค่อยสรุปตัวเอง — รวมผลจากล่างขึ้น (bottom-up)"],
          ],
        },
        {
          t: "p",
          c: "หมวดนี้ส่วนใหญ่ใช้ postorder (รอลูกเสร็จก่อนค่อยสรุป) แต่บางข้ออย่าง Count Good Nodes ใช้ top-down ที่พกข้อมูลลงไปด้วย",
        },

        { t: "h2", c: '6. สัญญาณว่าโจทย์นี้ "เล่นกับ Tree DFS"' },
        {
          t: "ul",
          c: [
            "โจทย์ให้ root ของ binary tree มา (หรือสองต้น)",
            "ถามเรื่องความลึก · เส้นทาง · ใบ · บรรพบุรุษ · นับ node ตามเงื่อนไข",
            "ไม่มี index ให้กระโดด — ต้อง traverse จาก root ลงไปด้วย DFS / recursion",
          ],
        },

        { t: "h2", c: "7. สาม patterns ที่จะเจอในหมวดนี้" },
        {
          t: "ol",
          c: [
            "Bottom-up รวมผล — ลูกคืนคำตอบขึ้นมาก่อน แล้ว node ปัจจุบันค่อยรวม (เช่น Maximum Depth, LCA)",
            "Top-down พก state — ส่งค่าที่เจอระหว่างทางลงเป็นพารามิเตอร์ของ recursion (เช่น Good Nodes, ZigZag)",
            "Collect แล้วเทียบ — เก็บของที่สนใจลงลิสต์ แล้วยุบปัญหาให้เหลือเทียบลิสต์ธรรมดา (เช่น Leaf-Similar)",
          ],
        },
        {
          t: "callout",
          title: "พร้อมลุยแล้ว",
          c: "หมวดนี้มี 6 ข้อ (LC104, LC872, LC1448, LC437, LC1372, LC236) ไล่จากง่ายไปยาก — กดถัดไปเริ่มข้อแรกได้เลยครับ",
        },
      ],
      en: [],
    },
  },

  "lc75-p33": {
    slug: "lc75-p33",
    title: {
      th: "ข้อ 33 · LC104 Maximum Depth of Binary Tree (ความลึกมากสุด) 🟢",
      en: "LC104 Maximum Depth of Binary Tree 🟢",
    },
    lead: {
      th: "โจทย์เปิดตัว DFS บนต้นไม้ — postorder ให้ลูกบอกความลึกมาก่อน แล้วหยิบฝั่งที่ลึกกว่ามาบวก 1",
      en: "The opener for tree DFS — postorder: let both children report depth, then take 1 + max.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `โจทย์ (LC104): กำหนด root ของ binary tree มาให้ ให้ return maximum depth ของต้นไม้นั้น

maximum depth คือจำนวน node บนเส้นทางที่ยาวที่สุดจาก root ลงไปจนถึง leaf ที่ไกลที่สุด`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [3,9,20,null,null,15,7]",
              output: "3",
              explain:
                "เส้นทางยาวสุดคือ 3 → 20 → 15 หรือ 3 → 20 → 7 นับ node ได้ 3 ตัว",
            },
            {
              input: "root = [1,null,2]",
              output: "2",
              explain: "เส้นทางยาวสุดคือ 1 → 2 นับ node ได้ 2 ตัว",
            },
            {
              input: "root = []",
              output: "0",
              explain: "ต้นไม้ว่าง ไม่มี node เลย ความลึกจึงเป็น 0",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน node อยู่ในช่วง [0, 10^4]",
            "-100 <= Node.val <= 100",
          ],
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: 'ข้อนี้ตรงกับ pattern "Bottom-up รวมผล" — ให้ลูกสองฝั่งคืนความลึกขึ้นมาก่อน แล้วค่อยสรุปที่ตัวเอง',
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "วิธีตรง ๆ คือเดินทุกเส้นทางจาก root ถึงทุก leaf แล้วหาเส้นที่ยาวสุด — ถูกแต่คิดยากเมื่อเขียนโค้ด",
            },
            {
              t: "p",
              c: "หัวใจสำคัญ: ความลึกของต้น = 1 (นับตัวเอง) + ความลึกที่มากกว่าของสอง subtree — ปล่อยให้ลูกไปคำนวณของมันเอง แล้วเรารวมผล (postorder)",
            },

            { t: "h3", c: "2. กฎเหล็ก 4 ข้อ (The Logic)" },
            {
              t: "ol",
              c: [
                "Base case — ถ้า node เป็น None → return 0",
                "ถามซ้าย — left = maxDepth(node.left)",
                "ถามขวา — right = maxDepth(node.right)",
                "รวมผล — return 1 + max(left, right)",
              ],
            },

            { t: "h3", c: "3. โค้ด Python (LeetCode Ready)" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if root is None:                 # กฎข้อ 1: ต้นว่าง ลึก 0
            return 0
        left = self.maxDepth(root.left)  # กฎข้อ 2
        right = self.maxDepth(root.right)# กฎข้อ 3
        return 1 + max(left, right)      # กฎข้อ 4: บวก 1 นับตัวเอง`,
            },

            { t: "h3", c: "4. จำลองการทำงาน — [3,9,20,null,null,15,7]" },
            {
              t: "p",
              c: "recursion ลงลึกสุดก่อน แล้วค่อยคืนค่าขึ้นมา (postorder)",
            },
            {
              t: "table",
              head: ["เรียกที่ node", "left", "right", "คืนค่า"],
              rows: [
                ["9 (leaf)", "0", "0", "1"],
                ["15 (leaf)", "0", "0", "1"],
                ["7 (leaf)", "0", "0", "1"],
                ["20", "1 (จาก 15)", "1 (จาก 7)", "2"],
                ["3 (root)", "1 (จาก 9)", "2 (จาก 20)", "3"],
              ],
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "ul",
              c: [
                "ลืม base case node is None → เรียก .left/.right ทะลุ None แล้ว error",
                "นับจำนวน node ไม่ใช่จำนวน edge — ต้องบวก 1 ทุกชั้น",
              ],
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — แตะทุก node ครั้งเดียว",
                "Space O(h) — ความลึก call stack ตามความสูงต้นไม้ (แย่สุด h = n เมื่อต้นเอียงเป็นเส้นตรง)",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "postorder บน tree: ให้ลูกสองฝั่งคืนคำตอบขึ้นมาก่อน แล้ว node ปัจจุบันค่อยรวมผล (ที่นี่คือ 1 + max) — เป็นแม่แบบของโจทย์ tree อีกหลายข้อ",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [3,9,20,null,null,15,7]",
              output: "3",
              explain:
                "The longest paths are 3 → 20 → 15 and 3 → 20 → 7 — each has 3 nodes.",
            },
            {
              input: "root = [1,null,2]",
              output: "2",
              explain: "The longest path is 1 → 2 — 2 nodes.",
            },
            {
              input: "root = []",
              output: "0",
              explain: "Empty tree — depth is 0.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes is in the range [0, 10^4].",
            "-100 <= Node.val <= 100",
          ],
        },

        {
          t: "solution",
          summary: "Full solution · Try yourself first",
          c: [
            {
              t: "p",
              c: 'This matches the "bottom-up combine" pattern — both children report depth first, then you summarize at the current node.',
            },

            { t: "h3", c: "1. Mindset Shift" },
            {
              t: "p",
              c: "The naive way walks every root-to-leaf path and takes the longest — correct, but awkward to code.",
            },
            {
              t: "p",
              c: "Key insight: depth(tree) = 1 + max(depth(left), depth(right)). Let the children compute their own depths (postorder), then combine.",
            },

            { t: "h3", c: "2. The Logic — 4 Steps" },
            {
              t: "ol",
              c: [
                "Base case — if node is None → return 0",
                "Ask left — left = maxDepth(node.left)",
                "Ask right — right = maxDepth(node.right)",
                "Combine — return 1 + max(left, right)",
              ],
            },

            { t: "h3", c: "3. LeetCode-Ready Code" },
            {
              t: "code",
              lang: "python",
              label: "Submit this on LeetCode",
              c: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        left = self.maxDepth(root.left)
        right = self.maxDepth(root.right)
        return 1 + max(left, right)`,
            },

            { t: "h3", c: "4. Dry Run — [3,9,20,null,null,15,7]" },
            {
              t: "table",
              head: ["Call at node", "left", "right", "returns"],
              rows: [
                ["9 (leaf)", "0", "0", "1"],
                ["15 (leaf)", "0", "0", "1"],
                ["7 (leaf)", "0", "0", "1"],
                ["20", "1 (from 15)", "1 (from 7)", "2"],
                ["3 (root)", "1 (from 9)", "2 (from 20)", "3"],
              ],
            },

            { t: "h3", c: "5. Edge Cases & Pitfalls" },
            {
              t: "ul",
              c: [
                "Forgetting the None base case → AttributeError on .left/.right",
                "Count nodes, not edges — always add 1 for the current node",
              ],
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — visit every node once",
                "Space O(h) — call-stack depth equals tree height (worst case h = n)",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "Tree postorder: children return answers first, then the current node combines them (here 1 + max) — a template for many tree problems.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p34": {
    slug: "lc75-p34",
    title: {
      th: "ข้อ 34 · LC872 Leaf-Similar Trees (ต้นไม้ใบเหมือนกัน) 🟢",
      en: "LC872 Leaf-Similar Trees 🟢",
    },
    lead: {
      th: "ดึง Leaf Sequence จากซ้ายไปขวาของสองต้นด้วย DFS แล้วเทียบ List — วิ่ง left ก่อน right ได้ลำดับฟรี ๆ",
      en: "Pull leaf sequences left-to-right from both trees with DFS, then compare lists — left-before-right gives order for free.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `ใน Binary Tree เราจะเรียก Node ต่างๆ ตามตำแหน่งของมัน:

• Root: Node บนสุดที่เป็นจุดเริ่มต้น
• Leaf: Node ที่อยู่ปลายสุด คือ Node ที่ left == None และ right == None

เป้าหมายของโจทย์: เรามี Binary Tree 2 ต้น (root1 และ root2) โจทย์อยากรู้ว่า ถ้าเราดึงค่า (Value) ของ Leaf Node ทั้งหมดออกมา โดยเรียงลำดับจากซ้ายไปขวา (Left to Right) ลำดับของ Leaf จาก Tree ทั้งสองต้นจะหน้าตาเหมือนกันเป๊ะเลยหรือไม่?`,
        },
        {
          t: "example",
          c: [
            {
              input:
                "root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]",
              output: "true",
              explain:
                "Leaf Sequence ของทั้งสองต้นเรียงจากซ้ายไปขวาได้ลำดับเดียวกันคือ [6,7,4,9,8] แม้ Shape ของ Tree จะไม่เหมือนกันก็ตาม",
            },
            {
              input: "root1 = [1,2,3], root2 = [1,3,2]",
              output: "false",
              explain:
                "ต้นแรกมี Leaf Sequence เป็น [2,3] ส่วนต้นที่สองเป็น [3,2] ลำดับต่างกันจึงไม่ leaf-similar",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน Node ของแต่ละต้นอยู่ในช่วง [1, 200]",
            "0 <= Node.val <= 200",
          ],
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: 'ข้อนี้ตรงกับ pattern "Collect แล้วเทียบ" — ยุบโครง Tree ให้เหลือแค่ Leaf Sequence แล้วเทียบว่าเท่ากันไหม',
            },

            { t: "h3", c: "1. กลยุทธ์ในการแก้ปัญหา (Core Strategy)" },
            {
              t: "p",
              c: "เมื่อเราต้องการเจาะลงไปให้ลึกที่สุดเพื่อหา Leaf และต้องวิ่งจากซ้ายไปขวา อัลกอริทึมที่ตอบโจทย์ที่สุดคือ DFS (Depth-First Search)",
            },
            {
              t: "ol",
              c: [
                "สร้าง Helper function ที่รับ Node เข้ามาทำ DFS",
                "ถ้า Node ปัจจุบันว่าง (None) ให้ข้ามไป",
                "เช็คว่า Node นี้คือ Leaf ไหม? (ไม่มี left และไม่มี right) ถ้าใช่ ให้เก็บค่า node.val เอาไว้ใน Array/List",
                "ถ้าไม่ใช่ Leaf ให้เรียกฟังก์ชันตัวเองซ้ำ (Recursive) โดยวิ่งไปที่ node.left ก่อน แล้วค่อยตามด้วย node.right — การทำแบบนี้จะการันตีว่าเราเก็บ Leaf ลำดับจากซ้ายไปขวาเสมอ",
                "นำ Array ของ Leaf จาก root1 มาเทียบกับ root2",
              ],
            },

            { t: "h3", c: "2. จำลองการทำงาน (DFS Walkthrough)" },
            {
              t: "p",
              c: "สมมติว่าเรามี Tree หน้าตาแบบนี้:",
            },
            {
              t: "code",
              lang: "text",
              c: `        3
       / \\
      5   1
     / \\
    6   2`,
            },
            {
              t: "ol",
              c: [
                "เริ่มต้นที่ Root: Node 3 — เข้ามาที่ Root Node 3 เช็คแล้วว่ามีลูก (ไม่ใช่ Leaf) จึงทำ Recursive ลงไปที่ node.left",
                "Traverse กิ่งซ้าย: Node 5 — ไม่ใช่ Leaf จึงทำ Recursive ลงไปที่ node.left อีกครั้ง",
                "เจอ Leaf ตัวแรก: Node 6 — ไม่มี left และไม่มี right สรุปว่ามันคือ Leaf! เก็บค่า [6] ไว้ใน List จากนั้น Return กลับขึ้นไปที่ Node 5 เพื่อไปฝั่งขวาต่อ",
                "เจอ Leaf ตัวที่สอง: Node 2 — วิ่งมาทาง node.right ของ Node 5 เจอ Node 2 ซึ่งไม่มีลูกเลย มันคือ Leaf! เก็บค่าเพิ่มลง List เป็น [6, 2] แล้ว Return ถอยรวดเดียวกลับไปที่ Root 3",
                "Traverse กิ่งขวาของ Root: Node 1 — จาก Root 3 วิ่งไปที่ node.right คือ Node 1 ไม่มีลูกเลย เป็น Leaf! เก็บค่าได้ลำดับสุดท้าย Array คือ [6, 2, 1]",
              ],
            },

            { t: "h3", c: "3. โค้ด Python (LeetCode Ready)" },
            {
              t: "p",
              c: "ใน Python เราสามารถ Return เป็น List ออกมาจาก Recursive Function แล้วจับมาต่อกัน (Concatenate) ด้วยเครื่องหมาย + ได้เลย โค้ดจะออกมาสั้นและคลีนมาก",
            },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:

        def get_leaves(node):
            if not node:
                return []

            # Base Case: ถ้าเป็น Leaf Node
            if not node.left and not node.right:
                return [node.val]

            # Recursive Step: วิ่งซ้ายก่อน แล้วเอา List มาต่อกับฝั่งขวา
            return get_leaves(node.left) + get_leaves(node.right)

        # ดึง Leaf Sequence ของทั้ง 2 ต้นมาเปรียบเทียบกัน
        return get_leaves(root1) == get_leaves(root2)`,
            },

            { t: "h3", c: "4. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "ul",
              c: [
                "ลืมเช็คว่าเป็น Leaf จริง ๆ แล้วเผลอเก็บค่า Internal Node ด้วย",
                "Concatenate ฝั่ง right ก่อน left → Leaf Sequence กลับด้านทันที",
              ],
            },

            { t: "h3", c: "5. การวิเคราะห์ประสิทธิภาพ (Complexity)" },
            {
              t: "ul",
              c: [
                "Time Complexity: O(T₁ + T₂) โดยที่ T คือจำนวน Node ทั้งหมดของ Tree แต่ละต้น เพราะกระบวนการ DFS ต้องแวะไปเยี่ยมทุกๆ Node ใน Tree 1 ครั้ง",
                "Space Complexity: O(L₁ + L₂ + H) — L คือจำนวน Leaf Node (Memory สำหรับสร้าง List เก็บค่า Leaf ทั้งหมด) และ H คือความสูงของ Tree (Height) ซึ่งเป็น Memory ที่ต้องใช้เก็บ Call Stack ระหว่างทำ Recursive",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "DFS วิ่ง left ก่อน right เสมอ = ได้ Leaf Sequence จากซ้ายไปขวาฟรี ๆ แล้วยุบปัญหาโครงสร้างซับซ้อนให้เหลือแค่เทียบ List ธรรมดา",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `In a Binary Tree we name Nodes by position:

• Root: the top Node — the starting point
• Leaf: a tip Node where left == None and right == None

Goal: given two Binary Trees (root1 and root2), pull every Leaf Node value left to right. Are the two leaf sequences identical?`,
        },
        {
          t: "example",
          c: [
            {
              input:
                "root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]",
              output: "true",
              explain:
                "Both trees share the same leaf sequence [6,7,4,9,8] even though their shapes differ.",
            },
            {
              input: "root1 = [1,2,3], root2 = [1,3,2]",
              output: "false",
              explain:
                "First tree leaf sequence [2,3]; second [3,2] — order differs, so not leaf-similar.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes in each tree is in the range [1, 200].",
            "0 <= Node.val <= 200",
          ],
        },

        {
          t: "solution",
          summary: "Full solution · Try yourself first",
          c: [
            {
              t: "p",
              c: 'This matches the "collect then compare" pattern — collapse each tree into a leaf sequence, then check equality.',
            },

            { t: "h3", c: "1. Core Strategy" },
            {
              t: "p",
              c: "To dig all the way down for leaves while walking left to right, DFS (Depth-First Search) is the right tool.",
            },
            {
              t: "ol",
              c: [
                "Write a helper that DFS-walks a Node",
                "If the current Node is None, skip it",
                "Is this Node a Leaf? (no left and no right) — if yes, append node.val to the list",
                "If not a Leaf, recurse on node.left first, then node.right — that guarantees left-to-right leaf order",
                "Compare the leaf arrays from root1 and root2",
              ],
            },

            { t: "h3", c: "2. DFS Walkthrough" },
            {
              t: "p",
              c: "Suppose the tree looks like this:",
            },
            {
              t: "code",
              lang: "text",
              c: `        3
       / \\
      5   1
     / \\
    6   2`,
            },
            {
              t: "ol",
              c: [
                "Start at Root: Node 3 — has children (not a Leaf), recurse to node.left",
                "Traverse left branch: Node 5 — not a Leaf, recurse to node.left again",
                "First Leaf: Node 6 — no left, no right → Leaf! List is [6], return to Node 5 to take the right side",
                "Second Leaf: Node 2 — node.right of 5; no children → Leaf! List becomes [6, 2], return all the way to Root 3",
                "Traverse right of Root: Node 1 — no children → Leaf! Final array [6, 2, 1]",
              ],
            },

            { t: "h3", c: "3. LeetCode-Ready Code" },
            {
              t: "p",
              c: "In Python, return lists from the recursive helper and concatenate with + — short and clean.",
            },
            {
              t: "code",
              lang: "python",
              label: "Submit this on LeetCode",
              c: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:

        def get_leaves(node):
            if not node:
                return []

            # Base Case: Leaf Node
            if not node.left and not node.right:
                return [node.val]

            # Recursive Step: left first, then concatenate right
            return get_leaves(node.left) + get_leaves(node.right)

        # Compare leaf sequences of both trees
        return get_leaves(root1) == get_leaves(root2)`,
            },

            { t: "h3", c: "4. Edge Cases & Pitfalls" },
            {
              t: "ul",
              c: [
                "Forgetting the Leaf check and collecting internal nodes too",
                "Concatenating right before left reverses the leaf sequence instantly",
              ],
            },

            { t: "h3", c: "5. Complexity" },
            {
              t: "ul",
              c: [
                "Time Complexity: O(T₁ + T₂) where T is the node count of each tree — DFS visits every node once",
                "Space Complexity: O(L₁ + L₂ + H) — L for the leaf lists in memory, H for the recursive call-stack height",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "Left-before-right DFS gives a left-to-right leaf sequence for free — then reduce a structural problem to plain list equality.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p35": {
    slug: "lc75-p35",
    title: {
      th: "ข้อ 35 · LC1448 Count Good Nodes in Binary Tree (นับโหนดดี) 🟡",
      en: "LC1448 Count Good Nodes in Binary Tree 🟡",
    },
    lead: {
      th: "Top-down พกค่ามากสุดลงไป — node ดีถ้าไม่มีใครบนเส้นทางจาก root ค่ามากกว่ามัน",
      en: "Top-down: carry the path max downward — a node is good if nothing larger sits above it on the path from the root.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `โจทย์ (LC1448): กำหนด root ของ binary tree มาให้

node X ตัวหนึ่งจะถูกเรียกว่า good ถ้าบนเส้นทางจาก root ไปถึง X ไม่มี node ใดเลยที่มีค่ามากกว่า X

ให้ return จำนวน good node ทั้งหมดในต้นไม้`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [3,1,4,3,null,1,5]",
              output: "4",
              explain:
                "good node คือ 3 (root), 3 (ใต้ 1), 4, และ 5 — ส่วน 1 สองตัวไม่ดีเพราะมีค่ามากกว่าอยู่ก่อนหน้าบนเส้นทาง",
            },
            {
              input: "root = [3,3,null,4,2]",
              output: "3",
              explain:
                "node 2 ไม่ดี เพราะเส้นทาง (3,3,2) มี 3 ที่มากกว่ามันอยู่ก่อนหน้า",
            },
            {
              input: "root = [1]",
              output: "1",
              explain: "มีแค่ root ตัวเดียว ถือเป็น good เสมอ",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน node อยู่ในช่วง [1, 10^5]",
            "-10^4 <= Node.val <= 10^4",
          ],
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: 'ข้อนี้ตรงกับ pattern "Top-down พก state" — ส่งค่ามากสุดบนเส้นทางลงเป็นพารามิเตอร์',
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "ต่างจากข้อ 33–34 ที่รอผลจากลูกขึ้นมา (bottom-up) ข้อนี้ตัดสินที่ node ปัจจุบันก่อน แล้วค่อยลงลูก",
            },
            {
              t: "p",
              c: "หัวใจสำคัญ: พก max_so_far = ค่ามากสุดที่เจอมาบนเส้นทางจนถึงก่อน node นี้ · ถ้า node.val >= max_so_far ก็นับเป็น good แล้วอัปเดต max ส่งลงต่อ",
            },

            { t: "h3", c: "2. กฎเหล็ก 5 ข้อ (The Logic)" },
            {
              t: "ol",
              c: [
                "เขียน dfs(node, max_so_far)",
                "ถ้า node เป็น None → return 0",
                "นับ good = 1 ถ้า node.val >= max_so_far ไม่งั้น 0",
                "new_max = max(max_so_far, node.val) ก่อนส่งต่อ",
                "return good + dfs(ซ้าย, new_max) + dfs(ขวา, new_max) — เริ่มด้วย max_so_far = -inf",
              ],
            },

            { t: "h3", c: "3. โค้ด Python (LeetCode Ready)" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def goodNodes(self, root: TreeNode) -> int:
        def dfs(node, max_so_far):
            if node is None:
                return 0
            good = 1 if node.val >= max_so_far else 0
            new_max = max(max_so_far, node.val)
            return good + dfs(node.left, new_max) + dfs(node.right, new_max)

        return dfs(root, float("-inf"))  # root ผ่านเงื่อนไขเสมอ`,
            },

            { t: "h3", c: "4. จำลองการทำงาน — [3,1,4,3,null,1,5]" },
            {
              t: "table",
              head: ["node", "max_so_far", "node.val >= max?", "นับ good?"],
              rows: [
                ["3 (root)", "-inf", "ใช่", "✓"],
                ["1 (ลูกซ้าย)", "3", "ไม่", "✗"],
                ["3 (ใต้ 1)", "3", "ใช่", "✓"],
                ["4 (ลูกขวา)", "3", "ใช่", "✓"],
                ["1 (ใต้ 4)", "4", "ไม่", "✗"],
                ["5 (ใต้ 4)", "4", "ใช่", "✓"],
              ],
            },
            {
              t: "p",
              c: "รวม good = 4 ตัว ตรงกับ output",
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "ul",
              c: [
                "ต้องอัปเดต new_max ก่อนเรียกลูก",
                "ส่ง max เป็นพารามิเตอร์ (แต่ละกิ่งมีสำเนาของตัวเอง) ไม่ใช่ตัวแปรร่วม — ไม่งั้นฝั่งซ้ายกวนฝั่งขวา",
              ],
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — แตะทุก node ครั้งเดียว",
                "Space O(h) — ความลึก call stack",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "DFS top-down: เมื่อคำตอบของ node ขึ้นกับสิ่งที่เจอมาระหว่างทางจาก root ให้ส่ง state ลงไปเป็นพารามิเตอร์ของ recursion",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

Return the number of good nodes in the binary tree.`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [3,1,4,3,null,1,5]",
              output: "4",
              explain:
                "Good nodes: 3 (root), 3 (under 1), 4, and 5. The two 1s are not good.",
            },
            {
              input: "root = [3,3,null,4,2]",
              output: "3",
              explain:
                "Node 2 is not good — path (3,3,2) has a larger value above it.",
            },
            {
              input: "root = [1]",
              output: "1",
              explain: "A single root is always good.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes is in the range [1, 10^5].",
            "-10^4 <= Node.val <= 10^4",
          ],
        },

        {
          t: "solution",
          summary: "Full solution · Try yourself first",
          c: [
            {
              t: "p",
              c: 'This matches the "top-down carry state" pattern — pass the path maximum down as a parameter.',
            },

            { t: "h3", c: "1. Mindset Shift" },
            {
              t: "p",
              c: "Unlike p33–p34 (bottom-up), decide at the current node first, then recurse into children.",
            },
            {
              t: "p",
              c: "Key insight: carry max_so_far along the path. Count the node if node.val >= max_so_far, then push an updated max downward.",
            },

            { t: "h3", c: "2. The Logic — 5 Steps" },
            {
              t: "ol",
              c: [
                "Write dfs(node, max_so_far)",
                "If node is None → return 0",
                "good = 1 if node.val >= max_so_far else 0",
                "new_max = max(max_so_far, node.val) before recursing",
                "return good + dfs(left, new_max) + dfs(right, new_max) — start with -inf",
              ],
            },

            { t: "h3", c: "3. LeetCode-Ready Code" },
            {
              t: "code",
              lang: "python",
              label: "Submit this on LeetCode",
              c: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def goodNodes(self, root: TreeNode) -> int:
        def dfs(node, max_so_far):
            if node is None:
                return 0
            good = 1 if node.val >= max_so_far else 0
            new_max = max(max_so_far, node.val)
            return good + dfs(node.left, new_max) + dfs(node.right, new_max)

        return dfs(root, float("-inf"))`,
            },

            { t: "h3", c: "4. Dry Run — [3,1,4,3,null,1,5]" },
            {
              t: "table",
              head: ["node", "max_so_far", ">= max?", "count?"],
              rows: [
                ["3 (root)", "-inf", "yes", "✓"],
                ["1 (left)", "3", "no", "✗"],
                ["3 (under 1)", "3", "yes", "✓"],
                ["4 (right)", "3", "yes", "✓"],
                ["1 (under 4)", "4", "no", "✗"],
                ["5 (under 4)", "4", "yes", "✓"],
              ],
            },

            { t: "h3", c: "5. Edge Cases & Pitfalls" },
            {
              t: "ul",
              c: [
                "Update new_max before calling children",
                "Pass max as a parameter (per-branch copy), not a shared variable",
              ],
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — visit every node once",
                "Space O(h) — call-stack depth",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "Top-down DFS: when a node's answer depends on what you've seen from the root, pass that state as a recursion parameter.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p36": {
    slug: "lc75-p36",
    title: {
      th: "ข้อ 36 · LC437 Path Sum III (นับ path ผลรวมเป้า) 🟡",
      en: "LC437 Path Sum III 🟡",
    },
    lead: {
      th: "Prefix sum + hash map บนเส้นทาง DFS — นับช่วงที่รวมเท่าเป้า พร้อม backtrack ก่อนถอยขึ้น",
      en: "Prefix sums + a hash map on the DFS path — count ranges that hit the target, and backtrack before climbing up.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `โจทย์ (LC437): กำหนด root ของ binary tree และเลขจำนวนเต็ม targetSum มาให้ ให้ return จำนวน path ที่ผลรวมของค่าตลอด path เท่ากับ targetSum

path ไม่จำเป็นต้องเริ่มต้นที่ root หรือจบที่ leaf แต่ต้องเดินลงล่างเท่านั้น (จาก parent ไปยัง child)`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8",
              output: "3",
              explain: "path ที่รวมได้ 8 มีสามเส้น: 5→3, 5→2→1, และ -3→11",
            },
            {
              input: "root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22",
              output: "3",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน node อยู่ในช่วง [0, 1000]",
            "-10^9 <= Node.val <= 10^9",
            "-1000 <= targetSum <= 1000",
          ],
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: 'ข้อนี้ผสม "Top-down พก state" กับเทคนิค prefix sum จากหมวด Prefix Sum — แต่ทำบนเส้นทางของต้นไม้',
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "วิธีตรง ๆ: ที่ทุก node ลองเดินลงทุกเส้นทางที่เริ่มจาก node นั้น → O(n²)",
            },
            {
              t: "p",
              c: "หัวใจสำคัญ: พก curr = ผลรวมสะสมจาก root ถึงตอนนี้ แล้วถามว่า \"เคยมีจุดก่อนหน้าบนเส้นทางนี้ที่ผลรวมสะสมเท่า curr − targetSum กี่ครั้ง\" — แต่ละครั้ง = หนึ่ง path ที่ใช้ได้",
            },
            {
              t: "p",
              c: "ต้อง backtrack: ก่อนถอยขึ้น ให้ลบ curr ออกจาก map ไม่งั้นกิ่งพี่น้องจะปนกัน",
            },

            { t: "h3", c: "2. กฎเหล็ก 5 ข้อ (The Logic)" },
            {
              t: "ol",
              c: [
                "ตั้ง prefix map นับความถี่ผลรวมสะสม · เริ่ม prefix[0] = 1",
                "เดิน DFS พก curr · ที่แต่ละ node บวก node.val เข้า curr",
                "นับเพิ่ม prefix[curr − targetSum]",
                "บันทึก prefix[curr] += 1 แล้วเรียกลูกซ้าย/ขวา",
                "ก่อนถอยขึ้น: prefix[curr] -= 1 (backtrack)",
              ],
            },

            { t: "h3", c: "3. โค้ด Python (LeetCode Ready)" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

from collections import defaultdict

class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        prefix = defaultdict(int)
        prefix[0] = 1                 # จุดก่อนเริ่มเดิน

        def dfs(node, curr):
            if node is None:
                return 0
            curr += node.val
            count = prefix[curr - targetSum]  # มีจุดเริ่มก่อนหน้ากี่จุด
            prefix[curr] += 1
            count += dfs(node.left, curr)
            count += dfs(node.right, curr)
            prefix[curr] -= 1                 # backtrack
            return count

        return dfs(root, 0)`,
            },

            { t: "h3", c: "4. จำลองการทำงาน — [10,5,-3,3,2,null,11], target = 8" },
            {
              t: "table",
              head: ["node", "curr", "เช็ค prefix[curr−8]", "นับเพิ่ม", "หมายเหตุ"],
              rows: [
                ["10", "10", "prefix[2]=0", "0", "บันทึก prefix[10]=1"],
                ["5", "15", "prefix[7]=0", "0", "บันทึก prefix[15]=1"],
                ["3", "18", "prefix[10]=1", "+1", "path 5→3 รวม 8"],
                ["2", "17", "prefix[9]=0", "0", "—"],
                ["-3", "7", "prefix[-1]=0", "0", "—"],
                ["11", "18", "prefix[10]=1", "+1", "path -3→11 รวม 8"],
              ],
            },
            {
              t: "p",
              c: "ตัวอย่างเต็มในโจทย์มี path ที่สาม (5→2→1) ด้วย — รวมได้ 3 ตาม output",
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "ul",
              c: [
                "ลืม backtrack → นับเกินเพราะกิ่งพี่น้องปนกัน",
                "มีค่าติดลบ → ใช้ early-stop แบบ two-sum ตรง ๆ ไม่ได้ ต้องพึ่ง hash map",
                "อย่าลืม prefix[0] = 1 เพื่อครอบ path ที่เริ่มจาก root พอดี",
              ],
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — แตะทุก node ครั้งเดียว · map lookup เฉลี่ย O(1)",
                "Space O(n) — ขนาด hash map + ความลึก call stack",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "prefix sum + hash map นับช่วงที่รวมเท่าเป้า ใช้ได้ทั้งบนลิสต์และบนเส้นทางของต้นไม้ — กุญแจคือ backtrack เมื่อออกจากเส้นทาง",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

The path does not need to start at the root or end at a leaf, but it must go downwards (traveling only from parent nodes to child nodes).`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8",
              output: "3",
              explain: "The paths that sum to 8 are 5→3, 5→2→1, and -3→11.",
            },
            {
              input: "root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22",
              output: "3",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes is in the range [0, 1000].",
            "-10^9 <= Node.val <= 10^9",
            "-1000 <= targetSum <= 1000",
          ],
        },

        {
          t: "solution",
          summary: "Full solution · Try yourself first",
          c: [
            {
              t: "p",
              c: 'Mix of "top-down carry state" and the prefix-sum technique — applied on a tree path.',
            },

            { t: "h3", c: "1. Mindset Shift" },
            {
              t: "p",
              c: "Naive: from every node, try every downward path → O(n²).",
            },
            {
              t: "p",
              c: "Key insight: carry curr = prefix sum from the root. Ask how many earlier prefixes equal curr − targetSum. Each hit is one valid path.",
            },
            {
              t: "p",
              c: "Must backtrack: remove curr from the map before climbing up, or sibling branches pollute each other.",
            },

            { t: "h3", c: "2. The Logic — 5 Steps" },
            {
              t: "ol",
              c: [
                "Prefix frequency map · start with prefix[0] = 1",
                "DFS with curr · add node.val into curr",
                "Add prefix[curr − targetSum] to the answer",
                "prefix[curr] += 1, then recurse left/right",
                "Before returning: prefix[curr] -= 1 (backtrack)",
              ],
            },

            { t: "h3", c: "3. LeetCode-Ready Code" },
            {
              t: "code",
              lang: "python",
              label: "Submit this on LeetCode",
              c: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

from collections import defaultdict

class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        prefix = defaultdict(int)
        prefix[0] = 1

        def dfs(node, curr):
            if node is None:
                return 0
            curr += node.val
            count = prefix[curr - targetSum]
            prefix[curr] += 1
            count += dfs(node.left, curr)
            count += dfs(node.right, curr)
            prefix[curr] -= 1
            return count

        return dfs(root, 0)`,
            },

            { t: "h3", c: "4. Dry Run — [10,5,-3,3,2,null,11], target = 8" },
            {
              t: "table",
              head: ["node", "curr", "prefix[curr−8]", "add", "note"],
              rows: [
                ["10", "10", "0", "0", "record prefix[10]=1"],
                ["5", "15", "0", "0", "record prefix[15]=1"],
                ["3", "18", "1", "+1", "path 5→3 sums to 8"],
                ["2", "17", "0", "0", "—"],
                ["-3", "7", "0", "0", "—"],
                ["11", "18", "1", "+1", "path -3→11 sums to 8"],
              ],
            },

            { t: "h3", c: "5. Edge Cases & Pitfalls" },
            {
              t: "ul",
              c: [
                "Forgetting backtrack overcounts across sibling branches",
                "Negatives block simple early-stop — need the frequency map",
                "prefix[0] = 1 covers paths that start at the root",
              ],
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — one visit per node · average O(1) map ops",
                "Space O(n) — map size + call-stack depth",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "Prefix sum + hash map counts ranges that hit a target — on arrays or tree paths. The key is backtracking when you leave a path.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p37": {
    slug: "lc75-p37",
    title: {
      th: "ข้อ 37 · LC1372 Longest ZigZag Path in a Binary Tree (ทางซิกแซกยาวสุด) 🟡",
      en: "LC1372 Longest ZigZag Path in a Binary Tree 🟡",
    },
    lead: {
      th: "พกทิศ + ความยาวลงไป — ไปตามแผนก็ต่อความยาว สวนทางก็รีเซ็ต · นับเป็นจำนวนก้าว (edge)",
      en: "Carry direction + length — continue when you match the expected turn, reset when you don't. Length counts edges.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `โจทย์ (LC1372): กำหนด root ของ binary tree มาให้

นิยาม ZigZag path ว่าคือการเลือก node หนึ่งใด ๆ พร้อมทิศทางเริ่มต้น (ซ้ายหรือขวา) จากนั้นถ้าทิศปัจจุบันคือขวา ให้ก้าวไป right child ถ้าเป็นซ้ายให้ก้าวไป left child แล้วสลับทิศ ทำซ้ำไปเรื่อย ๆ จนกว่าจะก้าวต่อไม่ได้

ความยาวของ ZigZag path คือจำนวน node ที่ผ่านทั้งหมดลบหนึ่ง (node เดี่ยว ๆ มีความยาว 0)

ให้ return ความยาวของ ZigZag path ที่ยาวที่สุดในต้นไม้`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]",
              output: "3",
              explain: "เส้นทางซิกแซกที่ยาวสุดสลับทิศ ขวา → ซ้าย → ขวา รวม 3 ก้าว",
            },
            {
              input: "root = [1,1,1,null,1,null,null,1,1,null,1]",
              output: "4",
              explain: "เส้นทางซิกแซกที่ยาวสุดสลับทิศ ซ้าย → ขวา → ซ้าย → ขวา รวม 4 ก้าว",
            },
            {
              input: "root = [1]",
              output: "0",
              explain: "มีแค่ root ตัวเดียว ก้าวต่อไม่ได้ ความยาวจึงเป็น 0",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน node อยู่ในช่วง [1, 5 * 10^4]",
            "1 <= Node.val <= 100",
          ],
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: 'ข้อนี้ตรงกับ pattern "Top-down พก state" — state คือทิศที่คาดไว้ + ความยาวสะสม',
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "เส้นซิกแซกที่ดีที่สุดอาจเริ่มที่ไหนก็ได้ และเริ่มด้วยทิศไหนก็ได้",
            },
            {
              t: "p",
              c: "หัวใจสำคัญ: ที่แต่ละ node พก go_left (ทิศที่ควรก้าวต่อไป) กับ length · ไปตามแผน → ต่อ length+1 แล้วสลับทิศ · สวนทาง → เริ่มเส้นใหม่ที่ length 1",
            },

            { t: "h3", c: "2. กฎเหล็ก 5 ข้อ (The Logic)" },
            {
              t: "ol",
              c: [
                "ตั้ง ans = 0 เก็บคำตอบ",
                "dfs(node, go_left, length): ถ้า None ก็ return",
                "อัปเดต ans = max(ans, length) ที่ทุก node ที่แวะ",
                "ถ้า go_left: ไปซ้ายต่อความยาว (length+1, หน้าไปขวา) และไปขวาเริ่มใหม่ (1)",
                "ถ้าไม่: สลับสมมาตร · เรียกจาก root สองครั้ง (เริ่มซ้าย และเริ่มขวา) ด้วย length 0",
              ],
            },

            { t: "h3", c: "3. โค้ด Python (LeetCode Ready)" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def longestZigZag(self, root: Optional[TreeNode]) -> int:
        ans = 0

        def dfs(node, go_left, length):
            nonlocal ans
            if node is None:
                return
            ans = max(ans, length)
            if go_left:
                dfs(node.left, False, length + 1)  # ตามแผน
                dfs(node.right, True, 1)           # สวนทาง → เริ่มใหม่
            else:
                dfs(node.right, True, length + 1)
                dfs(node.left, False, 1)

        dfs(root, True, 0)
        dfs(root, False, 0)
        return ans`,
            },

            { t: "h3", c: "4. จำลองการทำงาน — เส้น ขวา → ซ้าย → ขวา" },
            {
              t: "table",
              head: ["ก้าว", "ทิศคาด", "ทำจริง", "length", "ans"],
              rows: [
                ["ที่ root", "ไปขวา", "มีลูกขวา", "0 → 1", "1"],
                ["ที่ลูกขวา", "ไปซ้าย", "มีลูกซ้าย", "1 → 2", "2"],
                ["ที่ลูกซ้าย", "ไปขวา", "มีลูกขวา", "2 → 3", "3"],
                ["ต่อไป", "ไปซ้าย", "หมดทาง", "หยุด", "3"],
              ],
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "ul",
              c: [
                "โจทย์นับ edge (ก้าว) ไม่ใช่จำนวน node — เริ่ม length 0 ที่ root",
                "ต้องอัปเดต ans ที่ทุก node ที่แวะ ไม่ใช่เฉพาะตอนจบเส้นทาง",
              ],
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — แตะทุก node ครั้งเดียว",
                "Space O(h) — ความลึก call stack",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "เมื่อเส้นทางมีสถานะที่สลับไปมา (ทิศ, สี, ขึ้น/ลง) ให้ส่งสถานะนั้นเป็นพารามิเตอร์ของ DFS และรีเซ็ตความยาวเมื่อสถานะขาด",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `You are given the root of a binary tree.

A ZigZag path for a binary tree is defined as follows:
- Choose any node in the binary tree and a direction (right or left).
- If the current direction is right, move to the right child; otherwise move to the left child.
- Change the direction from right to left or from left to right.
- Repeat until you can't move in the tree.

Zigzag length is defined as the number of nodes visited − 1. (A single node has length 0.)

Return the longest ZigZag path contained in that tree.`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]",
              output: "3",
              explain: "Longest zigzag: right → left → right — 3 edges.",
            },
            {
              input: "root = [1,1,1,null,1,null,null,1,1,null,1]",
              output: "4",
              explain: "Longest zigzag: left → right → left → right — 4 edges.",
            },
            {
              input: "root = [1]",
              output: "0",
              explain: "Single node — length 0.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes is in the range [1, 5 * 10^4].",
            "1 <= Node.val <= 100",
          ],
        },

        {
          t: "solution",
          summary: "Full solution · Try yourself first",
          c: [
            {
              t: "p",
              c: 'Top-down with state — the state is the expected next direction plus the length so far.',
            },

            { t: "h3", c: "1. Mindset Shift" },
            {
              t: "p",
              c: "The best zigzag can start anywhere and in either direction.",
            },
            {
              t: "p",
              c: "Key insight: carry go_left and length. Match the plan → length+1 and flip direction. Mismatch → restart at length 1.",
            },

            { t: "h3", c: "2. The Logic — 5 Steps" },
            {
              t: "ol",
              c: [
                "ans = 0",
                "dfs(node, go_left, length): return if None",
                "Update ans at every visited node",
                "If go_left: continue left (length+1, next expects right) and restart right at 1",
                "Symmetric for go_left=False · call from root twice with length 0",
              ],
            },

            { t: "h3", c: "3. LeetCode-Ready Code" },
            {
              t: "code",
              lang: "python",
              label: "Submit this on LeetCode",
              c: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def longestZigZag(self, root: Optional[TreeNode]) -> int:
        ans = 0

        def dfs(node, go_left, length):
            nonlocal ans
            if node is None:
                return
            ans = max(ans, length)
            if go_left:
                dfs(node.left, False, length + 1)
                dfs(node.right, True, 1)
            else:
                dfs(node.right, True, length + 1)
                dfs(node.left, False, 1)

        dfs(root, True, 0)
        dfs(root, False, 0)
        return ans`,
            },

            { t: "h3", c: "4. Dry Run — right → left → right" },
            {
              t: "table",
              head: ["step", "expected", "actual", "length", "ans"],
              rows: [
                ["at root", "go right", "has right child", "0 → 1", "1"],
                ["at right", "go left", "has left child", "1 → 2", "2"],
                ["at left", "go right", "has right child", "2 → 3", "3"],
                ["next", "go left", "dead end", "stop", "3"],
              ],
            },

            { t: "h3", c: "5. Edge Cases & Pitfalls" },
            {
              t: "ul",
              c: [
                "Length counts edges, not nodes — start at 0 on the root",
                "Update ans at every node, not only at path ends",
              ],
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — visit every node once",
                "Space O(h) — call-stack depth",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "When a path has alternating state (direction, color, up/down), pass that state into DFS and reset length when the state breaks.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p38": {
    slug: "lc75-p38",
    title: {
      th: "ข้อ 38 · LC236 Lowest Common Ancestor of a Binary Tree (บรรพบุรุษร่วมต่ำสุด) 🟡",
      en: "LC236 Lowest Common Ancestor of a Binary Tree 🟡",
    },
    lead: {
      th: "Postorder ให้ลูกรายงานขึ้นมา — เจอทั้งสองฝั่งพร้อมกันที่ node ไหน node นั้นคือ LCA",
      en: "Postorder reports upward — the node that hears both targets from opposite sides is the LCA.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `โจทย์ (LC236): กำหนด binary tree มาให้ ให้หา lowest common ancestor (LCA) ของ node สองตัวคือ p และ q

LCA ของ p และ q คือ node ที่อยู่ต่ำสุดใน tree ซึ่งมีทั้ง p และ q เป็น descendant ของมัน (โดยอนุญาตให้ node หนึ่งเป็น descendant ของตัวเองได้ด้วย)`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
              output: "3",
              explain:
                "LCA ของ node 5 และ node 1 คือ node 3 เพราะทั้งสองแยกอยู่คนละฝั่งของ root",
            },
            {
              input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4",
              output: "5",
              explain:
                "node 5 เป็นบรรพบุรุษของ node 4 อยู่แล้ว ตามนิยาม node เป็น ancestor ของตัวเองได้ — คำตอบคือ 5",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน node อยู่ในช่วง [2, 10^5]",
            "-10^9 <= Node.val <= 10^9",
            "ค่าใน node ไม่ซ้ำกัน",
            "p != q และทั้งคู่มีอยู่ในต้นไม้จริง",
          ],
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: 'ข้อนี้ตรงกับ pattern "Bottom-up รวมผล / รายงานขึ้นไป" — ลูกส่งสัญญาณว่าเจอเป้าหมายไหม',
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "ถ้า p กับ q อยู่คนละฝั่งของ node หนึ่ง → node นั้นคือจุดบรรจบ = LCA",
            },
            {
              t: "p",
              c: "หัวใจสำคัญ: ให้ลูกสองฝั่งรายงานขึ้นมา ถ้าได้ผลทั้งสองฝั่ง → คืนตัวเอง · ถ้าเจอแค่ฝั่งเดียว → ส่งฝั่งนั้นต่อขึ้นไป · ถ้า node ปัจจุบันคือ p หรือ q → คืนตัวเองทันที (ครอบกรณีที่ตัวหนึ่งเป็นบรรพบุรุษของอีกตัว)",
            },

            { t: "h3", c: "2. กฎเหล็ก 4 ข้อ (The Logic)" },
            {
              t: "ol",
              c: [
                "Base — ถ้า root เป็น None หรือ root is p หรือ root is q → return root",
                "ถามซ้าย / ถามขวา — เก็บ left และ right",
                "ถ้า left และ right ทั้งคู่ไม่ None → return root (LCA)",
                "ไม่งั้น return ฝั่งที่เจอ (left if left else right)",
              ],
            },

            { t: "h3", c: "3. โค้ด Python (LeetCode Ready)" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(
        self, root: "TreeNode", p: "TreeNode", q: "TreeNode"
    ) -> "TreeNode":
        if root is None or root is p or root is q:
            return root

        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        if left and right:
            return root
        return left if left else right`,
            },

            { t: "h3", c: "4. จำลองการทำงาน — p=5, q=1 บนต้น [3,5,1,...]" },
            {
              t: "table",
              head: ["เรียกที่", "เกิดอะไร", "คืนค่า"],
              rows: [
                ["root=3", "ไม่ใช่ p/q · ถามซ้ายและขวา", "รอผล"],
                ["node=5", "root is p → คืน 5 ทันที", "5"],
                ["node=1", "root is q → คืน 1 ทันที", "1"],
                ["กลับที่ 3", "left=5 และ right=1 ทั้งคู่เจอ", "คืน 3 = LCA"],
              ],
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง (Edge Cases)" },
            {
              t: "ul",
              c: [
                "เทียบด้วย identity (root is p) ไม่ใช่ค่า val — โจทย์ให้ node object มา",
                "กรณี p เป็นบรรพบุรุษของ q: เจอ p แล้วคืนขึ้นไปเลย ไม่เดินลึกต่อ — ได้คำตอบถูกอัตโนมัติ",
              ],
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — กรณีแย่สุดแตะทุก node ครั้งเดียว",
                "Space O(h) — ความลึก call stack",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "postorder รายงานขึ้นไป: ให้ลูกส่งสัญญาณว่าเจอเป้าหมายไหม แล้ว node ที่ได้สัญญาณจากทั้งสองฝั่งพร้อมกันคือจุดบรรจบ — ใช้กับโจทย์หา ancestor/จุดตัดได้ทั่วไป",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
              output: "3",
              explain:
                "The LCA of nodes 5 and 1 is 3 — they sit on opposite sides of the root.",
            },
            {
              input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4",
              output: "5",
              explain:
                "Node 5 is an ancestor of 4; a node may be a descendant of itself — answer is 5.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes is in the range [2, 10^5].",
            "-10^9 <= Node.val <= 10^9",
            "All Node.val are unique.",
            "p != q and both exist in the tree.",
          ],
        },

        {
          t: "solution",
          summary: "Full solution · Try yourself first",
          c: [
            {
              t: "p",
              c: 'Bottom-up "report upward" — children signal whether they found a target.',
            },

            { t: "h3", c: "1. Mindset Shift" },
            {
              t: "p",
              c: "If p and q sit on opposite sides of a node, that node is the meeting point = LCA.",
            },
            {
              t: "p",
              c: "Key insight: let both children report. Both non-null → return self. One side found → forward that side. Current node is p or q → return self immediately (covers the ancestor-of-the-other case).",
            },

            { t: "h3", c: "2. The Logic — 4 Steps" },
            {
              t: "ol",
              c: [
                "Base — if root is None or root is p or root is q → return root",
                "Ask left and right",
                "If both left and right are non-null → return root (LCA)",
                "Otherwise return the non-null side",
              ],
            },

            { t: "h3", c: "3. LeetCode-Ready Code" },
            {
              t: "code",
              lang: "python",
              label: "Submit this on LeetCode",
              c: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(
        self, root: "TreeNode", p: "TreeNode", q: "TreeNode"
    ) -> "TreeNode":
        if root is None or root is p or root is q:
            return root

        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        if left and right:
            return root
        return left if left else right`,
            },

            { t: "h3", c: "4. Dry Run — p=5, q=1 on [3,5,1,...]" },
            {
              t: "table",
              head: ["call", "what happens", "returns"],
              rows: [
                ["root=3", "not p/q · ask both sides", "waiting"],
                ["node=5", "root is p → return 5", "5"],
                ["node=1", "root is q → return 1", "1"],
                ["back at 3", "left=5 and right=1", "return 3 = LCA"],
              ],
            },

            { t: "h3", c: "5. Edge Cases & Pitfalls" },
            {
              t: "ul",
              c: [
                "Compare by identity (root is p), not by val — the problem passes node objects",
                "If p is an ancestor of q: returning p immediately is correct",
              ],
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(n) — worst case visit every node once",
                "Space O(h) — call-stack depth",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "Postorder reporting: children signal whether they found a target; the node that hears both sides is the meeting point — useful for ancestor / intersection problems.",
            },
          ],
        },
      ],
    },
  },
};
