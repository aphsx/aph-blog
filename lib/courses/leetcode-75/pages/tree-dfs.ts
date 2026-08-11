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
          t: "image",
          src: "/leetcode-75/inorder-search.gif",
          alt: "In-order traversal animation: Left → ROOT → Right on a binary tree",
          caption:
            "In-order (L → N → R): ดิ่งซ้ายสุดก่อน แล้วค่อยแตะตัวเอง แล้วไปขวา — บน BST ได้ลำดับจากน้อยไปมาก · In-order search courtesy of Giphy",
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
      th: "Tree = เขาวงกต · Leaf = ทางตัน — เดิน DFS เลี้ยวซ้ายก่อน เก็บทางตันจากซ้ายไปขวา แล้วเทียบกล่องของสองต้น",
      en: "Tree = maze · Leaf = dead end — DFS left-first, collect dead ends left-to-right, then compare the two boxes.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `พิจารณา leaf ทั้งหมดของ binary tree เรียงจากซ้ายไปขวา ค่าของ leaf เหล่านั้นเรียงกันเรียกว่า leaf value sequence ของต้นไม้นั้น

ต้นไม้สองต้นจะถือว่าเป็น leaf-similar ก็ต่อเมื่อ leaf value sequence ของทั้งคู่เหมือนกัน

กำหนด root ของต้นไม้สองต้นคือ root1 และ root2 มาให้ ให้ return true ก็ต่อเมื่อทั้งสองต้นเป็น leaf-similar`,
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
              c: 'ข้อนี้ตรงกับ pattern "Collect แล้วเทียบ" — เดินเขาวงกตเก็บทางตันใส่กล่อง แล้วเทียบว่าสองกล่องหน้าตาเหมือนกันไหม',
            },

            { t: "h3", c: "1. แปลโจทย์ภาษาคน (Problem Decoding)" },
            {
              t: "p",
              c: `เรามี Binary Tree อยู่ 2 ต้น (root1 กับ root2)
ภารกิจของเราคือ: วิ่งเข้าไปเก็บค่าของ Leaf Node (Node ที่อยู่ปลายสุด ไม่มีลูกแล้ว) โดยมีเงื่อนไขว่าต้องเก็บจากซ้ายไปขวา

ถ้ารายการ Leaf Node ของ Tree ต้นแรก หน้าตาเหมือนกับ Tree ต้นที่สองเป๊ะๆ ทุกตำแหน่ง ให้ตอบ True ถ้าไม่เหมือนให้ตอบ False`,
            },

            { t: "h3", c: "2. สร้างภาพจำ (Mental Model)" },
            {
              t: "p",
              c: "ให้จินตนาการว่า Tree คือ \"เขาวงกต\"",
            },
            {
              t: "ul",
              c: [
                "Root: ประตูทางเข้าเขาวงกต",
                "Node: ทางแยก",
                'Leaf: "ทางตัน" (ไม่มีทางให้ไปต่อทั้งซ้ายและขวา)',
              ],
            },
            {
              t: "p",
              c: "อัลกอริทึมที่เราจะใช้คือ DFS (Depth-First Search) ซึ่งมีกฎในการเดินเขาวงกตดังนี้:",
            },
            {
              t: "ol",
              c: [
                "ต้องเลี้ยวซ้ายก่อนเสมอ",
                'เมื่อไหร่ที่เจอ "ทางตัน (Leaf)" ให้เอาตัวเลขที่กำแพงใส่กล่อง (List) แล้วเดินย้อนกลับ (Return)',
                "ถอยกลับมาที่ทางแยกเดิม แล้วค่อยไปสำรวจกิ่งขวาต่อ",
              ],
            },

            { t: "h3", c: "3. หั่นโค้ดทีละส่วน (Logic-to-Code Mapping)" },
            {
              t: "p",
              c: "เราจะสร้างฟังก์ชันชื่อ get_leaves(node) เพื่อทำหน้าที่เดินเขาวงกต โดยเราจะดักสถานการณ์ที่จะเกิดขึ้น 3 รูปแบบ",
            },

            { t: "h3", c: "สถานการณ์ที่ 1: เดินตกขอบ (ไม่มีกิ่งให้ไป)" },
            {
              t: "p",
              c: 'เวลากิ่งมันสุดทางแล้ว คอมพิวเตอร์จะมองว่า Node นั้นมีค่าเป็นความว่างเปล่า (Null / None) สิ่งที่เราต้องทำคือบอกว่า "ไม่มีอะไรให้เก็บนะ ส่งกล่องเปล่ากลับไป"',
            },
            {
              t: "code",
              lang: "python",
              label: "สถานการณ์ที่ 1",
              c: `# ถ้า node ว่างเปล่า (กิ่งนี้ไม่มีอยู่จริง)
if not node:
    return []  # ส่ง List ว่างๆ กลับไป`,
            },

            { t: "h3", c: "สถานการณ์ที่ 2: เจอทางตัน (นี่คือ Leaf!)" },
            {
              t: "p",
              c: 'เป้าหมายหลักของเรา! เราจะรู้ได้ว่าเป็นทางตันก็ต่อเมื่อ Node ที่เรายืนอยู่ "ไม่มีลูกซ้าย" และ "ไม่มีลูกขวา" สิ่งที่เราต้องทำคือ เอาตัวเลขของ Node นี้ใส่ลงในกล่อง แล้วส่งกลับขึ้นไปให้คนที่เรียกมัน',
            },
            {
              t: "code",
              lang: "python",
              label: "สถานการณ์ที่ 2",
              c: `# ถ้าไม่มีลูกซ้าย และ ไม่มีลูกขวา
if not node.left and not node.right:
    return [node.val]  # เอาตัวเลขใส่ List แล้ว Return กลับ`,
            },

            { t: "h3", c: "สถานการณ์ที่ 3: เจอทางแยก (ต้องสำรวจให้สุด)" },
            {
              t: "p",
              c: 'ถ้า Node นั้นไม่ใช่ทางตัน แปลว่ามันคือทางแยก กฎของเราคือ "ไปซ้ายก่อน แล้วค่อยไปขวา" เราจะสั่งให้ฟังก์ชันทำงานซ้ำ (Recursive) เพื่อดำดิ่งลงไปทางซ้าย เมื่อได้กล่องผลลัพธ์จากซ้ายมาแล้ว ค่อยไปเอากล่องผลลัพธ์จากขวามา แล้วเอาของในกล่องมาเทรวมกัน (ใน Python ใช้เครื่องหมาย + เพื่อเอา List มาต่อกัน)',
            },
            {
              t: "code",
              lang: "python",
              label: "สถานการณ์ที่ 3",
              c: `# ไปเอากล่องจากซ้าย มาต่อกับกล่องจากขวา
return get_leaves(node.left) + get_leaves(node.right)`,
            },

            { t: "h3", c: "4. จำลองการทำงาน (Step-by-Step Walkthrough)" },
            {
              t: "p",
              c: "สมมติเรามี Tree หน้าตาแบบนี้ และเอาไปเข้าฟังก์ชัน get_leaves:",
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
                'จุดเริ่มต้น (Root): Node 3 — เดินเข้ามาที่ 3 มันไม่ใช่ทางตัน ฟังก์ชันจึงทำงานในสถานการณ์ที่ 3 คือสั่งว่า "ไปเอากล่องซ้ายมาต่อกับกล่องขวานะ" แล้วดำดิ่งไปที่ node.left (ไปที่ 5)',
                "สำรวจกิ่งซ้าย: Node 5 — ลงมาที่ 5 ก็ไม่ใช่ทางตัน จึงดำดิ่งไปซ้ายต่อ (ไปที่ 6)",
                "เจอ Leaf ตัวแรก!: Node 6 — เข้าเงื่อนไขสถานการณ์ที่ 2 (ไม่มีลูกซ้ายและขวา) จึงเอาตัวเองใส่กล่อง → [6] แล้ว Return กล่องนี้ย้อนกลับขึ้นไปให้ Node 5",
                "เจอ Leaf ตัวที่สอง!: Node 2 — Node 5 ได้กล่องซ้ายมาแล้ว จึงไปสำรวจกิ่งขวาต่อ ลงมาเจอ 2 เข้าเงื่อนไขสถานการณ์ที่ 2 เช่นกัน จึงใส่กล่อง → [2] แล้ว Return กลับไปให้ Node 5",
                "รวมกล่องที่ทางแยก: Node 5 — ได้กล่องครบแล้ว จึงเอามาต่อกันตามลอจิก ซ้าย + ขวา กลายเป็น [6] + [2] = [6, 2] แล้ว Return กล่องใหญ่นี้ย้อนกลับไปให้ Root 3",
                "สำรวจกิ่งขวาของ Root: Node 1 — Root 3 ได้กล่องซ้ายมาแล้ว จึงลงไปสำรวจกิ่งขวา เจอ Node 1 เข้าเงื่อนไขสถานการณ์ที่ 2 จึงใส่กล่อง → [1] แล้ว Return ย้อนกลับไปให้ Root 3",
                "บทสรุป: Node 3 — Root 3 เอากล่องซ้ายและขวามาต่อกัน: [6, 2] + [1] ผลลัพธ์ของ Tree ต้นนี้คือ [6, 2, 1]",
              ],
            },

            { t: "h3", c: "5. ประกอบร่างโค้ดฉบับเต็ม" },
            {
              t: "p",
              c: "เมื่อเราเอาโค้ดทั้ง 3 ส่วนมาประกอบกัน ไว้ข้างใน Class ที่ LeetCode เตรียมไว้ให้ จะได้โค้ดที่สั้น คลีน และอ่านลอจิกได้ทะลุปรุโปร่งแบบนี้",
            },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:

        # ฟังก์ชันเดินเขาวงกตแบบ DFS
        def get_leaves(node):
            # 1. เดินตกขอบ
            if not node:
                return []

            # 2. เจอทางตัน (Leaf Node)
            if not node.left and not node.right:
                return [node.val]

            # 3. ทางแยก: เอากล่องซ้ายมาต่อกับกล่องขวา
            return get_leaves(node.left) + get_leaves(node.right)

        # ดึง Leaf ของ Tree ต้นแรก และ ต้นที่สอง มาเช็คว่าหน้าตาเหมือนกันไหม
        return get_leaves(root1) == get_leaves(root2)`,
            },

            { t: "h3", c: "6. วิเคราะห์ประสิทธิภาพ (Complexity)" },
            {
              t: "ul",
              c: [
                "Time Complexity: O(T₁ + T₂) โดยที่ T คือจำนวน Node ทั้งหมดของ Tree แต่ละต้น เพราะอัลกอริทึม DFS ของเราต้องเดินไปเหยียบทุก Node ใน Tree ต้นนั้น 1 ครั้งพอดีเป๊ะ",
                "Space Complexity: O(L₁ + L₂ + H) — L คือ Memory ที่เราใช้สร้าง List เพื่อเก็บคำตอบของ Leaf แต่ละต้น และ H คือความสูงของ Tree (Height) ซึ่งคอมพิวเตอร์ต้องแอบกัน Memory ส่วนหนึ่งไว้ใช้จดจำเส้นทางเดินย้อนกลับ (Call Stack) ตอนที่เราทำ Recursive",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "DFS เลี้ยวซ้ายก่อนเสมอ → ได้ Leaf จากซ้ายไปขวาฟรี ๆ · ยุบเขาวงกตให้เหลือแค่เทียบกล่อง (List) สองใบ",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Consider all the leaves of a binary tree, from left to right order, forming a leaf value sequence.

Two binary trees are considered leaf-similar if their leaf value sequences are the same.

Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.`,
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
              c: 'This matches the "collect then compare" pattern — walk the maze, fill boxes with dead ends, then check if the two boxes match.',
            },


            { t: "h3", c: "1. Problem Decoding" },
            {
              t: "p",
              c: `We have two Binary Trees (root1 and root2).
Mission: walk in and collect Leaf Node values (tip nodes with no children), left to right.

If the leaf list of the first tree matches the second tree position-by-position, return True; otherwise False.`,
            },

            { t: "h3", c: "2. Mental Model" },
            {
              t: "p",
              c: 'Picture the Tree as a "maze":',
            },
            {
              t: "ul",
              c: [
                "Root: the entrance door",
                "Node: a fork / junction",
                'Leaf: a "dead end" (nowhere left or right to go)',
              ],
            },
            {
              t: "p",
              c: "We'll use DFS (Depth-First Search) with these maze rules:",
            },
            {
              t: "ol",
              c: [
                "Always turn left first",
                'When you hit a "dead end (Leaf)", put the wall number in the box (List), then walk back (Return)',
                "Back at the fork, then explore the right branch",
              ],
            },

            { t: "h3", c: "3. Logic-to-Code Mapping" },
            {
              t: "p",
              c: "We'll write get_leaves(node) to walk the maze, handling three situations:",
            },

            { t: "h3", c: "Situation 1: Fall off the edge (no branch)" },
            {
              t: "p",
              c: 'When a branch doesn\'t exist, the computer sees Null / None. Tell it: "nothing to collect — send back an empty box."',
            },
            {
              t: "code",
              lang: "python",
              label: "Situation 1",
              c: `# If node is empty (this branch doesn't exist)
if not node:
    return []  # send back an empty List`,
            },

            { t: "h3", c: "Situation 2: Dead end (it's a Leaf!)" },
            {
              t: "p",
              c: "Our main goal! A dead end means the Node you're on has no left child and no right child. Put this Node's number in the box and return it upward.",
            },
            {
              t: "code",
              lang: "python",
              label: "Situation 2",
              c: `# No left child and no right child
if not node.left and not node.right:
    return [node.val]  # put the number in a List and Return`,
            },

            { t: "h3", c: "Situation 3: A fork (keep exploring)" },
            {
              t: "p",
              c: 'If it\'s not a dead end, it\'s a fork. Rule: "left first, then right." Recurse left, then right, then pour the boxes together (Python + concatenates Lists).',
            },
            {
              t: "code",
              lang: "python",
              label: "Situation 3",
              c: `# Take the left box, concatenate the right box
return get_leaves(node.left) + get_leaves(node.right)`,
            },

            { t: "h3", c: "4. Step-by-Step Walkthrough" },
            {
              t: "p",
              c: "Suppose the Tree looks like this, and we call get_leaves:",
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
                'Start (Root): Node 3 — not a dead end → Situation 3: "left box + right box", dive to node.left (5)',
                "Left branch: Node 5 — not a dead end, dive left again (to 6)",
                "First Leaf!: Node 6 — Situation 2 → box [6], Return up to Node 5",
                "Second Leaf!: Node 2 — Node 5 got the left box, explores right, hits 2 → Situation 2 → box [2], Return to Node 5",
                "Merge at fork: Node 5 — left + right → [6] + [2] = [6, 2], Return big box up to Root 3",
                "Right of Root: Node 1 — Root 3 explores right, hits 1 → Situation 2 → box [1], Return to Root 3",
                "Finale: Node 3 — left + right → [6, 2] + [1] = [6, 2, 1]",
              ],
            },

            { t: "h3", c: "5. Full Assembled Code" },
            {
              t: "p",
              c: "Glue the three pieces into LeetCode's Solution class — short, clean, logic transparent:",
            },
            {
              t: "code",
              lang: "python",
              label: "Submit this on LeetCode",
              c: `class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:

        # DFS maze walker
        def get_leaves(node):
            # 1. Fall off the edge
            if not node:
                return []

            # 2. Dead end (Leaf Node)
            if not node.left and not node.right:
                return [node.val]

            # 3. Fork: left box + right box
            return get_leaves(node.left) + get_leaves(node.right)

        # Compare leaf boxes of both trees
        return get_leaves(root1) == get_leaves(root2)`,
            },

            { t: "h3", c: "6. Complexity" },
            {
              t: "ul",
              c: [
                "Time Complexity: O(T₁ + T₂) where T is each tree's node count — DFS steps on every node exactly once",
                "Space Complexity: O(L₁ + L₂ + H) — L for the leaf Lists, H for the recursive Call Stack that remembers the walk-back path",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "DFS always left-first → left-to-right leaves for free · collapse the maze into comparing two boxes (Lists).",
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
      th: "เดินป่าพกสมุดจดสถิติ (max_so_far) — นับ Good Node ทุกครั้งที่ต้นไม้ทำลายหรือเสมอสถิติสูงสุดบนเส้นทาง",
      en: "Hike with a height log (max_so_far) — count a Good Node whenever the tree ties or breaks the path record.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `กำหนด root ของ binary tree มาให้ node X ในต้นไม้จะถูกเรียกว่า good ถ้าบนเส้นทางจาก root ไปถึง X ไม่มี node ใดเลยที่มีค่ามากกว่า X

ให้ return จำนวน good node ทั้งหมดใน binary tree`,
        },

        {
          t: "example",
          c: [
            {
              input: "root = [3,1,4,3,null,1,5]",
              output: "4",
              explain:
                "Good Node คือ 3 (root), 3 (ใต้ 1), 4, และ 5 — ส่วน 1 สองตัวไม่ดีเพราะมีค่ามากกว่าอยู่ก่อนหน้าบนเส้นทาง",
            },
            {
              input: "root = [3,3,null,4,2]",
              output: "3",
              explain:
                "Node 2 ไม่ดี เพราะเส้นทาง (3,3,2) มี 3 ที่มากกว่ามันอยู่ก่อนหน้า",
            },
            {
              input: "root = [1]",
              output: "1",
              explain: "มีแค่ Root ตัวเดียว ถือเป็น Good Node เสมอ",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวน Node อยู่ในช่วง [1, 10^5]",
            "-10^4 <= Node.val <= 10^4",
          ],
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: 'โจทย์ข้อนี้เป็นอีกหนึ่งข้อสุดคลาสสิกของชาว Tree — เราจะยังคงใช้ DFS (Depth-First Search) แต่จะมีการ "พกข้อมูลบางอย่าง" ติดตัวไปด้วยตอนเดิน',
            },

            { t: "h3", c: "1. แปลโจทย์ภาษาคน (Problem Decoding)" },
            {
              t: "p",
              c: `เรามี Binary Tree อยู่ 1 ต้น
โจทย์นิยามคำว่า "Good Node" (โหนดที่ดี) ว่า: ถ้าเราเดินจาก Root ลงมาเรื่อยๆ จนถึง Node ปัจจุบัน ต้องไม่มี Node ไหนเลยในเส้นทางนี้ที่มีค่า "มากกว่า" ตัวมัน (พูดง่ายๆ คือ ตัวมันต้องมีค่า ≥ ตัวที่มากที่สุดที่เคยเจอมาตั้งแต่ต้นทาง)

ภารกิจของเราคือ: นับว่าใน Tree ต้นนี้ มี Good Node อยู่ทั้งหมดกี่ตัว?`,
            },

            { t: "h3", c: "2. สร้างภาพจำ (Mental Model)" },
            {
              t: "p",
              c: 'ให้จินตนาการว่า การเดินลงไปใน Tree คือ "การเดินป่าและจดสถิติต้นไม้ที่สูงที่สุด"',
            },
            {
              t: "ul",
              c: [
                'คุณเริ่มเดินจาก Root พร้อมกับถือ "สมุดจดสถิติความสูง (Max So Far)" ไว้ในมือ',
                "ทุกครั้งที่คุณเดินไปถึงต้นไม้ต้นใหม่ (Node ปัจจุบัน) คุณจะมองดูความสูงของมัน แล้วเทียบกับตัวเลขในสมุด",
                'ถ้าต้นไม้นี้สูง "เท่ากับ หรือ มากกว่า" ตัวเลขในสมุด: แปลว่านี่คือ Good Node! คุณก็นับแต้มเพิ่มให้ตัวเอง 1 แต้ม',
                "ก่อนจะเดินไปสำรวจทางแยกถัดไป: คุณต้องเช็คว่าต้นไม้นี้ทำลายสถิติเดิมไหม? ถ้าทำลายสถิติ คุณต้องอัปเดตตัวเลขในสมุด เป็นความสูงใหม่ แล้วค่อยแบกสมุดเล่มนี้เดินไปที่ลูกซ้ายและลูกขวาต่อ",
              ],
            },

            { t: "h3", c: "3. หั่นโค้ดทีละส่วน (Logic-to-Code Mapping)" },
            {
              t: "p",
              c: 'เราจะสร้างฟังก์ชันชื่อ dfs(node, max_so_far) โดยต้องรับค่า 2 อย่างคือ "จุดที่ยืนอยู่" และ "สมุดจดสถิติ" เราจะดักสถานการณ์ 3 อย่างดังนี้',
            },

            { t: "h3", c: "สถานการณ์ที่ 1: เดินตกขอบ (ไม่มี Node แล้ว)" },
            {
              t: "p",
              c: "ถ้าเราเดินจนสุดทางแล้วตกขอบ (Null / None) แปลว่าไม่มีอะไรให้นับแล้ว ให้ส่งค่า 0 กลับไป",
            },
            {
              t: "code",
              lang: "python",
              label: "สถานการณ์ที่ 1",
              c: `# ถ้าเดินตกขอบ
if not node:
    return 0  # ไม่เจอ Good Node เลยสักตัว ส่ง 0 กลับไป`,
            },

            { t: "h3", c: "สถานการณ์ที่ 2: เช็คว่าเป็น Good Node ไหม?" },
            {
              t: "p",
              c: "เราจะเปรียบเทียบค่าของตัวเอง (node.val) กับสถิติที่พกมา (max_so_far) ถ้าตัวเองใหญ่กว่าหรือเท่ากับสถิติ แปลว่าผ่านเงื่อนไข! เราจะจดไว้ว่าตรงนี้ได้ 1 แต้ม (ถ้าไม่ผ่านก็ได้ 0 แต้ม)",
            },
            {
              t: "code",
              lang: "python",
              label: "สถานการณ์ที่ 2",
              c: `# เช็คว่าเป็น Good Node หรือไม่
if node.val >= max_so_far:
    good = 1
else:
    good = 0`,
            },

            { t: "h3", c: "สถานการณ์ที่ 3: อัปเดตสถิติ แล้วลุยต่อซ้าย-ขวา" },
            {
              t: "p",
              c: 'ก่อนจะเดินลงไปหากิ่งซ้ายและขวา เราต้องอัปเดต max_so_far ก่อน โดยเลือกตัวที่มากที่สุดระหว่าง "สถิติเดิม" กับ "ค่าของ Node ปัจจุบัน" จากนั้นให้เอาแต้มของตัวเอง (good) ไปบวกกับแต้มที่จะไปหาได้จากกิ่งซ้าย และแต้มจากกิ่งขวา',
            },
            {
              t: "code",
              lang: "python",
              label: "สถานการณ์ที่ 3",
              c: `# อัปเดตสถิติสำหรับให้ลูกๆ เอาไปใช้ต่อ
new_max = max(max_so_far, node.val)

# แต้มรวม = แต้มตัวเอง + แต้มจากกิ่งซ้าย + แต้มจากกิ่งขวา
return good + dfs(node.left, new_max) + dfs(node.right, new_max)`,
            },

            { t: "h3", c: "4. จำลองการทำงาน (Step-by-Step Walkthrough)" },
            {
              t: "p",
              c: "สมมติเรามี Tree หน้าตาแบบนี้:",
            },
            {
              t: "code",
              lang: "text",
              c: `        3
       / \\
      1   4
     /   / \\
    3   1   5`,
            },

            { t: "h3", c: "จุดเริ่มต้น (Root) → Node 3 | สมุดจด: 3" },
            {
              t: "ul",
              c: [
                "เดินเข้ามาที่ Root (3) โดยถือสมุดจดสถิติเริ่มต้นเป็น 3 (ค่าของตัวมันเอง)",
                "เช็ค: 3 ≥ 3 ไหม? → ใช่! เป็น Good Node (+1 แต้ม)",
                "อัปเดตสมุดจดเป็น max(3, 3) = 3 แล้วแยกย้ายไปกิ่งซ้ายและขวา",
              ],
            },

            { t: "h3", c: "สำรวจกิ่งซ้าย → Node 1 | สมุดจด: 3" },
            {
              t: "ul",
              c: [
                "ลงมาที่ 1 พร้อมสมุดที่จดเลข 3 ไว้",
                "เช็ค: 1 ≥ 3 ไหม? → ไม่ใช่! (0 แต้ม)",
                "อัปเดตสมุดจดเป็น max(3, 1) = 3 (สถิติยังคงเป็น 3) แล้วลงไปทางซ้ายต่อ",
              ],
            },

            { t: "h3", c: "สุดทางกิ่งซ้าย → Node 3 | สมุดจด: 3" },
            {
              t: "ul",
              c: [
                "ลงมาที่ 3 พร้อมสมุดที่จดเลข 3",
                "เช็ค: 3 ≥ 3 ไหม? → ใช่! เป็น Good Node (+1 แต้ม)",
                "สุดทางแล้ว Return แต้มกลับขึ้นไป — ฝั่งซ้ายทั้งหมดหาแต้มมาได้ 1 แต้ม",
              ],
            },

            { t: "h3", c: "สำรวจกิ่งขวาของ Root → Node 4 | สมุดจด: 3" },
            {
              t: "ul",
              c: [
                "กลับมาที่ Root แล้วไปทางขวา เจอ 4 พร้อมสมุดที่จดเลข 3 (สถิติจาก Root)",
                "เช็ค: 4 ≥ 3 ไหม? → ใช่! เป็น Good Node (+1 แต้ม)",
                "อัปเดตสมุดจดเป็น max(3, 4) = 4 (ทำลายสถิติแล้ว!) ถือสมุดเลข 4 ไปหาลูกซ้ายและขวาต่อ",
              ],
            },

            { t: "h3", c: "สุดทางกิ่งขวา → Node 1 และ 5 | สมุดจด: 4" },
            {
              t: "ul",
              c: [
                "ไปทางซ้ายเจอ 1 เทียบกับสมุด 4: 1 ≥ 4 → ไม่ใช่! (0 แต้ม)",
                "ไปทางขวาเจอ 5 เทียบกับสมุด 4: 5 ≥ 4 → ใช่! เป็น Good Node (+1 แต้ม)",
                "ฝั่งขวาทั้งหมดหาแต้มมาได้ 2 แต้ม",
              ],
            },

            {
              t: "p",
              c: "บทสรุป: แต้มจาก Root (1) + ฝั่งซ้าย (1) + ฝั่งขวา (2) = มี Good Node ทั้งหมด 4 โหนด",
            },

            { t: "h3", c: "5. ประกอบร่างโค้ดฉบับเต็ม (Clean Code)" },
            {
              t: "p",
              c: "เมื่อนำโค้ดมารวมกัน จะได้ฟังก์ชันที่สะอาดตามาก (Python สามารถยุบโค้ดการหา Good Node และอัปเดต Max ให้อยู่ในบรรทัดเดียวกันได้เลย)",
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
    def goodNodes(self, root: TreeNode) -> int:

        # ฟังก์ชันเดินป่าและจดสถิติ (DFS)
        def dfs(node, max_so_far):
            # 1. เดินตกขอบ
            if not node:
                return 0

            # 2. เช็คว่าเป็น Good Node ไหม (ถ้าใช่ได้ 1 แต้ม ถ้าไม่ใช่ได้ 0)
            good = 1 if node.val >= max_so_far else 0

            # 3. อัปเดตสมุดจดสถิติ
            new_max = max(max_so_far, node.val)

            # 4. เอายอดรวมของตัวเอง + ฝั่งซ้าย + ฝั่งขวา ส่งกลับไป
            return good + dfs(node.left, new_max) + dfs(node.right, new_max)

        # เริ่มต้นเดินที่ Root โดยให้สถิติแรกสุดคือค่าของ Root เอง
        return dfs(root, root.val)`,
            },

            { t: "h3", c: "6. วิเคราะห์ประสิทธิภาพ (Complexity Analysis)" },
            {
              t: "ul",
              c: [
                "Time Complexity: O(N) โดยที่ N คือจำนวน Node ทั้งหมดของ Tree เพราะเราเดินผ่านทุก Node เพียงแค่ครั้งเดียวเท่านั้น",
                "Space Complexity: O(H) โดยที่ H คือความสูงของ Tree (Height) เพราะเราใช้พื้นที่ของ Call Stack ในการจำลองการเดินย้อนกลับ (Recursive) ในกรณีที่แย่ที่สุด (Tree เอียงไปทางเดียวเป็นเส้นตรง) Space จะเป็น O(N)",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "DFS top-down: เมื่อคำตอบของ Node ขึ้นกับสิ่งที่เจอมาระหว่างทางจาก Root ให้ส่ง state (ที่นี่คือ max_so_far) ลงไปเป็นพารามิเตอร์ของ recursion — แต่ละกิ่งได้สมุดจดของตัวเอง ไม่กวนกัน",
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
              explain: "A single Root is always a Good Node.",
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
              c: 'A classic Tree problem — we still use DFS, but we "carry some state" with us as we walk.',
            },

            { t: "h3", c: "1. Problem Decoding" },
            {
              t: "p",
              c: `We have one Binary Tree.
A "Good Node" means: on the path from Root down to the current Node, nothing has a value strictly greater than it (i.e. its value is ≥ the maximum seen so far from the start).

Mission: count how many Good Nodes are in the tree.`,
            },

            { t: "h3", c: "2. Mental Model" },
            {
              t: "p",
              c: 'Picture walking down the Tree as "hiking and logging the tallest tree so far."',
            },
            {
              t: "ul",
              c: [
                'Start at Root holding a "height record book (Max So Far)"',
                "At every new tree (current Node), compare its height to the book",
                'If this tree is "equal to or taller" than the book: it\'s a Good Node — add 1 point',
                "Before exploring the next fork: if this tree broke the record, update the book, then carry that book to the left and right children",
              ],
            },

            { t: "h3", c: "3. Logic-to-Code Mapping" },
            {
              t: "p",
              c: 'Write dfs(node, max_so_far) — two inputs: "where you stand" and "the record book." Handle three situations:',
            },

            { t: "h3", c: "Situation 1: Fall off the edge (no Node left)" },
            {
              t: "p",
              c: "If you walk off the edge (Null / None), there's nothing to count — return 0.",
            },
            {
              t: "code",
              lang: "python",
              label: "Situation 1",
              c: `# Fell off the edge
if not node:
    return 0  # no Good Nodes here`,
            },

            { t: "h3", c: "Situation 2: Is this a Good Node?" },
            {
              t: "p",
              c: "Compare node.val with max_so_far. If yours is ≥ the record, you pass — score 1 point (else 0).",
            },
            {
              t: "code",
              lang: "python",
              label: "Situation 2",
              c: `# Check Good Node
if node.val >= max_so_far:
    good = 1
else:
    good = 0`,
            },

            { t: "h3", c: "Situation 3: Update the record, then go left & right" },
            {
              t: "p",
              c: 'Before diving into children, update max_so_far to the max of "old record" and "current Node." Then return your points + left subtree points + right subtree points.',
            },
            {
              t: "code",
              lang: "python",
              label: "Situation 3",
              c: `# Update the record for children
new_max = max(max_so_far, node.val)

# Total = self + left + right
return good + dfs(node.left, new_max) + dfs(node.right, new_max)`,
            },

            { t: "h3", c: "4. Step-by-Step Walkthrough" },
            {
              t: "p",
              c: "Suppose the Tree looks like this:",
            },
            {
              t: "code",
              lang: "text",
              c: `        3
       / \\
      1   4
     /   / \\
    3   1   5`,
            },

            { t: "h3", c: "Start (Root) → Node 3 | Book: 3" },
            {
              t: "ul",
              c: [
                "Enter Root (3) with the initial record book set to 3 (its own value)",
                "Check: 3 ≥ 3? → Yes! Good Node (+1)",
                "Update the book to max(3, 3) = 3, then explore left and right",
              ],
            },

            { t: "h3", c: "Left branch → Node 1 | Book: 3" },
            {
              t: "ul",
              c: [
                "Arrive at 1 carrying book value 3",
                "Check: 1 ≥ 3? → No! (0 points)",
                "Update the book to max(3, 1) = 3 (record stays 3), then go left",
              ],
            },

            { t: "h3", c: "End of left branch → Node 3 | Book: 3" },
            {
              t: "ul",
              c: [
                "Arrive at 3 carrying book value 3",
                "Check: 3 ≥ 3? → Yes! Good Node (+1)",
                "Leaf — return up. The whole left side scored 1 point",
              ],
            },

            { t: "h3", c: "Right of Root → Node 4 | Book: 3" },
            {
              t: "ul",
              c: [
                "Back at Root, go right to 4 carrying book value 3 (Root's record)",
                "Check: 4 ≥ 3? → Yes! Good Node (+1)",
                "Update the book to max(3, 4) = 4 (new record!) and carry 4 to both children",
              ],
            },

            { t: "h3", c: "End of right branch → Nodes 1 and 5 | Book: 4" },
            {
              t: "ul",
              c: [
                "Left child 1 vs book 4: 1 ≥ 4 → No! (0 points)",
                "Right child 5 vs book 4: 5 ≥ 4 → Yes! Good Node (+1)",
                "The whole right side scored 2 points",
              ],
            },

            {
              t: "p",
              c: "Total: Root (1) + left (1) + right (2) = 4 Good Nodes",
            },

            { t: "h3", c: "5. Full Assembled Code (Clean Code)" },
            {
              t: "p",
              c: "Glue the pieces together — Python can collapse the Good check into one line:",
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
    def goodNodes(self, root: TreeNode) -> int:

        # Hike + log the height record (DFS)
        def dfs(node, max_so_far):
            # 1. Fall off the edge
            if not node:
                return 0

            # 2. Good Node? (1 point or 0)
            good = 1 if node.val >= max_so_far else 0

            # 3. Update the record book
            new_max = max(max_so_far, node.val)

            # 4. Self + left + right
            return good + dfs(node.left, new_max) + dfs(node.right, new_max)

        # Start at Root with the first record = Root's own value
        return dfs(root, root.val)`,
            },

            { t: "h3", c: "6. Complexity Analysis" },
            {
              t: "ul",
              c: [
                "Time Complexity: O(N) where N is the node count — we visit every node once",
                "Space Complexity: O(H) where H is tree height (Call Stack). Worst case (a straight line) is O(N)",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "Top-down DFS: when a Node's answer depends on what you've seen from the Root, pass that state (here max_so_far) as a recursion parameter — each branch gets its own copy of the book.",
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
      th: "เดินป่าพกสมุดบันทึกยอดสะสม (Prefix Sum + Hash Map) — นับช่วงที่ได้เป้า พร้อมลบรอยเท้าตอนถอยขึ้น (Backtracking)",
      en: "Hike with a prefix-sum notebook (Hash Map) — count path ranges that hit the target, and erase your footprint when you climb back (Backtracking).",
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
              c: 'ข้อนี้ถือเป็นข้อปราบเซียนข้อหนึ่ง — ต่อยอดจาก Path Sum ธรรมดาตรงที่ "เส้นทางจะเริ่มหรือจบตรงไหนก็ได้" เราใช้ DFS พร้อมสมุดบันทึก Prefix Sum และ Backtracking',
            },

            { t: "h3", c: "1. แปลโจทย์ภาษาคน (Problem Decoding)" },
            {
              t: "p",
              c: `เรามี Binary Tree ที่แต่ละโหนดมีตัวเลข (อาจเป็นค่าบวก, ลบ, หรือศูนย์ก็ได้) และมีเป้าหมายคือตัวเลข targetSum
โจทย์ต้องการให้เราหาว่ามี "เส้นทาง (Path)" ทั้งหมดกี่เส้นที่ตัวเลขในโหนดบวกกันแล้วได้เท่ากับ targetSum พอดี`,
            },
            {
              t: "p",
              c: "กฎเหล็ก 3 ข้อของการนับเส้นทาง:",
            },
            {
              t: "ol",
              c: [
                "ต้องวิ่งลงข้างล่างเสมอ: จากพ่อไปหาลูกหรือหลานเท่านั้น (เลี้ยวกลับขึ้นบนไม่ได้)",
                "เริ่มตรงไหนก็ได้: ไม่จำเป็นต้องเริ่มที่ราก (Root)",
                "จบตรงไหนก็ได้: ไม่จำเป็นต้องจบที่ใบ (Leaf)",
              ],
            },

            { t: "h3", c: "2. สร้างภาพจำ (Mental Model)" },
            {
              t: "p",
              c: 'ให้มองว่าต้นไม้ต้นนี้คือ "เส้นทางเดินป่า" และคุณคือ "นักสะสมแต้ม" ที่เดินลงเขาไปเรื่อยๆ — การมานั่งนับแต้มใหม่ทุกครั้งจากทุกจุดเริ่มต้นมันเหนื่อยและเสียเวลามาก เราจึงใช้เทคนิค "สมุดบันทึกยอดสะสม (Prefix Sum)" เข้ามาช่วย',
            },
            {
              t: "p",
              c: "หลักการทำงานของสมุดบันทึก:",
            },
            {
              t: "ul",
              c: [
                "ระหว่างเดินลงเขา คุณจะจด \"แต้มรวมทั้งหมด (Current Sum)\" ตั้งแต่ยอดเขาลงในสมุดเสมอ",
                "สมมติเป้าหมาย targetSum คือ 8 แต้ม และตอนนี้คุณเดินมาถึงจุดที่แต้มรวมคือ 15 แต้ม",
                "คุณอยากรู้ว่าระหว่างทางมีช่วงไหนไหมที่รวมกันได้ 8 แต้มพอดี?",
                "แทนที่จะเดินย้อนกลับไปนับ คุณแค่เปิดสมุดแล้วดูว่า “ก่อนหน้านี้... เราเคยจดแต้มสะสมที่ 7 แต้มไว้หรือเปล่า?”",
                "ทำไมต้องเป็นเลข 7? เพราะ 15 (ยอดปัจจุบัน) − 8 (ยอดที่อยากได้) = 7 (ยอดในอดีต)",
                "ถ้าในสมุดมีเลข 7 อยู่ แปลว่าตั้งแต่จุดที่ได้ 7 แต้ม เดินต่อมาถึงปัจจุบัน คุณเก็บแต้มเพิ่มมาได้ 8 แต้มพอดี — นี่แหละคือ 1 เส้นทางที่เราตามหา",
              ],
            },

            { t: "h3", c: "3. หั่นโค้ดทีละส่วน (Logic-to-Code Mapping)" },
            {
              t: "p",
              c: "เราจะสร้างฟังก์ชัน dfs(node, current_sum) โดยใช้ Hash Map ทำหน้าที่เป็นสมุดบันทึก และใช้เทคนิค Backtracking (ลบรอยเท้า)",
            },

            { t: "h3", c: "ส่วนที่ 1: เตรียมสมุดบันทึกและเดินตกขอบ" },
            {
              t: "p",
              c: "เริ่มแรกเราต้องใส่ {0: 1} ไว้ในสมุดเผื่อกรณีที่แต้มรวมปัจจุบันเท่ากับ Target พอดีตั้งแต่ต้นทาง",
            },
            {
              t: "callout",
              title: "ทำไมต้อง {0: 1}?",
              c: 'สมมติเรายืนอยู่ที่โหนดที่มีค่า 8 และ targetSum = 8 — ถ้าเราไม่ใส่ {0: 1} ไว้ก่อน โปรแกรมจะหา old_sum = 8 - 8 = 0 ในสมุด แต่ไม่เจอเลยนับเป็น 0 เส้นทาง ทั้งที่จริงๆ มีเส้นทางเดียวคือ "โหนดเดียว = 8" ที่รวมเท่า target พอดี! การใส่ {0: 1} คือการบอกว่า "ก่อนเริ่มเดิน เรามียอดสะสม 0 อยู่แล้ว 1 ครั้ง" — เปรียบเหมือนจุดเริ่มต้นบนแผนที่ที่มีหมุดปักไว้ก่อน',
            },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 1",
              c: `# สมุดบันทึก: key = ผลรวมสะสม, value = จำนวนครั้งที่เจอ
prefix_map = {0: 1}  # ใส่จุดเริ่มต้นไว้ก่อน — ถ้า current_sum เท่า target พอดี จะได้นับถูก

if not node:
    return 0  # เดินตกขอบ ไม่มีเส้นทางให้นับ`,
            },

            { t: "h3", c: "ส่วนที่ 2: เช็คสมุดบันทึก (มีเส้นทางที่ได้ Target ไหม?)" },
            {
              t: "p",
              c: 'คำนวณแต้มสะสมปัจจุบัน แล้วเอาไปลบเป้าหมาย เพื่อหา "ยอดในอดีต"',
            },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 2",
              c: `current_sum += node.val
old_sum = current_sum - targetSum

# ถ้ามียอดในอดีตอยู่ในสมุด ให้นับจำนวนเส้นทางนั้นมา
paths = prefix_map.get(old_sum, 0)`,
            },

            { t: "h3", c: "ส่วนที่ 3: จดบันทึกแล้วเดินต่อซ้าย-ขวา" },
            {
              t: "p",
              c: "บันทึกยอดปัจจุบันลงสมุด แล้วเดินลงกิ่งซ้ายและขวา พร้อมเอาคำตอบที่ได้มารวมกัน",
            },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 3",
              c: `prefix_map[current_sum] = prefix_map.get(current_sum, 0) + 1

paths += dfs(node.left, current_sum)
paths += dfs(node.right, current_sum)`,
            },

            { t: "h3", c: "ส่วนที่ 4: Backtracking (การลบรอยเท้า — สำคัญที่สุด!)" },
            {
              t: "p",
              c: 'เมื่อสำรวจสุดทางแล้วกำลังจะถอยหลังกลับขึ้นมาเพื่อไปกิ่งอื่น เราต้อง "ลบ" ยอดสะสมของโหนดนี้ออกจากสมุด เพื่อไม่ให้กิ่งทางขวาแอบมาเห็นยอดสะสมของกิ่งทางซ้าย ซึ่งจะผิดกฎการเดินลงอย่างเดียว',
            },
            {
              t: "callout",
              title: "ทำไมต้อง Backtrack? ไม่ลบได้ไหม?",
              warn: true,
              c: 'ถ้าไม่ลบ สมุดจะมีข้อมูล "ปนกัน" ระหว่างกิ่งซ้ายและขวา — เช่น กิ่งซ้ายเดินผ่านโหนดที่มียอดรวม 18 แล้วไม่ลบ พอไปกิ่งขวา โปรแกรมจะคิดว่า "เคยเจอเส้นทางที่รวมเป็น 18" ทั้งที่จริงๆ มันอยู่คนละกิ่งกัน! การลบคือการ "ย้อนเวลา" ให้สมุดกลับไปเป็นสภาพก่อนที่จะเดินลงกิ่งนี้ เพื่อให้กิ่งถัดไปเริ่มจากจุดเดียวกัน',
            },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 4",
              c: `# Backtracking: ลบข้อมูลของโหนดนี้ออก ก่อนถอยกลับ
# ถ้าลบ frequency เหลือ 0 ให้ลบ key ทิ้งเลย (จะได้ไม่เหลือค้าง)
prefix_map[current_sum] -= 1
if prefix_map[current_sum] == 0:
    del prefix_map[current_sum]
return paths`,
            },

            { t: "h3", c: "4. จำลองการทำงาน (Step-by-Step Walkthrough)" },
            {
              t: "p",
              c: "สมมติ Tree: [10, 5, -3, 3, 2, null, 11] และ targetSum = 8",
            },
            {
              t: "code",
              lang: "text",
              c: `      10
     /  \\
    5   -3
   / \\    \\
  3   2    11`,
            },
            {
              t: "p",
              c: "จุดเริ่มต้น: สมุดบันทึก = {0: 1}",
            },

            { t: "h3", c: "อยู่ที่โหนด 10 (Root)" },
            {
              t: "ul",
              c: [
                "Current Sum = 10",
                "หา 10 − 8 = 2 ในสมุด (ไม่เจอ → ได้ 0 เส้นทาง)",
                "จด 10 ลงสมุด → สมุดกลายเป็น {0: 1, 10: 1}",
              ],
            },

            { t: "h3", c: "เดินลงซ้ายไปที่โหนด 5" },
            {
              t: "ul",
              c: [
                "Current Sum = 10 + 5 = 15",
                "หา 15 − 8 = 7 ในสมุด (ไม่เจอ → ได้ 0 เส้นทาง)",
                "จด 15 ลงสมุด → สมุดกลายเป็น {0: 1, 10: 1, 15: 1}",
              ],
            },

            { t: "h3", c: "เดินลงซ้ายอีกไปที่โหนด 3" },
            {
              t: "ul",
              c: [
                "Current Sum = 15 + 3 = 18",
                "หา 18 − 8 = 10 ในสมุด (เจอ! มีอยู่ 1 ครั้ง) → ได้มา 1 เส้นทางแล้ว! (คือจากโหนด 5 → 3)",
                "จด 18 ลงสมุด → สมุดกลายเป็น {0: 1, 10: 1, 15: 1, 18: 1}",
              ],
            },

            { t: "h3", c: "ถอยหลัง (Backtrack) ออกจากโหนด 3" },
            {
              t: "ul",
              c: [
                "เมื่อไปต่อไม่ได้ ต้องถอยกลับมาที่โหนด 5 — เราต้องลบเลข 18 ออกจากสมุด เพื่อไม่ให้กิ่งขวา (โหนด 2) มาเห็นข้อมูลนี้",
              ],
            },
            {
              t: "p",
              c: "ไล่ต่อจนครบทั้งต้นจะเจอ path อื่นด้วย (เช่น -3→11 และ 5→2→1 ในตัวอย่างเต็ม) รวมได้ 3 ตาม output",
            },

            { t: "h3", c: "5. ประกอบร่างโค้ดฉบับเต็ม (Clean Code)" },
            {
              t: "p",
              c: "เมื่อนำทุกส่วนมารวมกัน จะได้โค้ดที่ใช้ prefix_map ตัวเดียวร่วมกันทั้ง Tree พร้อม Backtracking ก่อนถอยขึ้น",
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
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:

        # สมุดบันทึก Prefix Sum
        prefix_map = {0: 1}

        def dfs(node, current_sum):
            if not node:
                return 0

            # 1. บวกแต้มสะสมปัจจุบัน
            current_sum += node.val

            # 2. เช็คว่า (ยอดปัจจุบัน - เป้าหมาย) เคยมีอยู่ในสมุดไหม
            old_sum = current_sum - targetSum
            paths = prefix_map.get(old_sum, 0)

            # 3. จดผลรวมปัจจุบันลงในสมุด (บวกความถี่เพิ่ม 1)
            prefix_map[current_sum] = prefix_map.get(current_sum, 0) + 1

            # 4. ลุยต่อซ้าย-ขวา และเอาเส้นทางที่เจอมาบวกทบกัน
            paths += dfs(node.left, current_sum)
            paths += dfs(node.right, current_sum)

            # 5. Backtracking: ถอยหลังกลับ ต้องลบรอยเท้าของโหนดนี้ออก
            prefix_map[current_sum] -= 1

            return paths

        return dfs(root, 0)`,
            },

            { t: "h3", c: "6. วิเคราะห์ประสิทธิภาพ (Complexity Analysis)" },
            {
              t: "ul",
              c: [
                "Time Complexity: O(N) — เราใช้ DFS เดินไปยังแต่ละ Node เพียงครั้งเดียว และการค้นหา/บันทึกใน Hash Map ใช้เวลาเฉลี่ย O(1) ต่อรอบ ทำให้เวลาโดยรวมเป็นเชิงเส้น",
                "Space Complexity: O(N) — Call Stack ของ Recursion ลึกสุด O(H) และ Hash Map ในกรณีแย่ที่สุด (ค่าไม่ซ้ำกันเลย) มีขนาด O(N) ดังนั้น Space รวมถูกครอบงำด้วย O(N)",
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
              c: 'A tough Path Sum upgrade — paths may start or end anywhere. We use DFS with a Prefix Sum notebook and Backtracking.',
            },

            { t: "h3", c: "1. Problem Decoding" },
            {
              t: "p",
              c: `We have a Binary Tree whose nodes hold numbers (positive, negative, or zero) and a targetSum.
Count how many downward "paths" have node values that sum exactly to targetSum.`,
            },
            {
              t: "p",
              c: "Three hard rules for counting paths:",
            },
            {
              t: "ol",
              c: [
                "Always go downward: parent → child/grandchild only (no climbing back up)",
                "Start anywhere: does not have to begin at the Root",
                "End anywhere: does not have to end at a Leaf",
              ],
            },

            { t: "h3", c: "2. Mental Model" },
            {
              t: "p",
              c: 'Picture the tree as a "hiking trail" and yourself as a "point collector" walking downhill. Recounting from every possible start is slow — so we keep a "prefix-sum notebook."',
            },
            {
              t: "p",
              c: "How the notebook works:",
            },
            {
              t: "ul",
              c: [
                'As you walk downhill, always log the "Current Sum" from the summit',
                "Suppose targetSum is 8 and you've reached a Current Sum of 15",
                "Is there a stretch along the way that totals exactly 8?",
                'Instead of walking back to count, open the notebook and ask: "Have we ever logged a cumulative total of 7?"',
                "Why 7? Because 15 (current) − 8 (wanted) = 7 (past total)",
                "If 7 is in the notebook, the stretch from that past point to here added exactly 8 — that's one path we want",
              ],
            },

            { t: "h3", c: "3. Logic-to-Code Mapping" },
            {
              t: "p",
              c: "Write dfs(node, current_sum) with a Hash Map as the notebook, plus Backtracking (erasing footprints).",
            },

            { t: "h3", c: "Part 1: Prepare the notebook & fall off the edge" },
            {
              t: "p",
              c: "Seed the notebook with {0: 1} so paths that hit the target from the very start are covered.",
            },
            {
              t: "code",
              lang: "python",
              label: "Part 1",
              c: `# Notebook: key = prefix sum, value = how often we've seen it
prefix_map = {0: 1}

if not node:
    return 0  # fell off the edge — nothing to count`,
            },

            { t: "h3", c: "Part 2: Check the notebook (any path hitting Target?)" },
            {
              t: "p",
              c: 'Update the current sum, then subtract the target to find the "past total" we need.',
            },
            {
              t: "code",
              lang: "python",
              label: "Part 2",
              c: `current_sum += node.val
old_sum = current_sum - targetSum

# If that past total is in the notebook, count those paths
paths = prefix_map.get(old_sum, 0)`,
            },

            { t: "h3", c: "Part 3: Log yourself, then go left & right" },
            {
              t: "p",
              c: "Record the current sum, recurse into both children, and add their path counts.",
            },
            {
              t: "code",
              lang: "python",
              label: "Part 3",
              c: `prefix_map[current_sum] = prefix_map.get(current_sum, 0) + 1

paths += dfs(node.left, current_sum)
paths += dfs(node.right, current_sum)`,
            },

            { t: "h3", c: "Part 4: Backtracking (erase the footprint — most important!)" },
            {
              t: "p",
              c: 'Before climbing up to explore another branch, remove this node\'s prefix sum from the notebook so the right sibling never sees the left sibling\'s totals — that would break the "downward only" rule.',
            },
            {
              t: "code",
              lang: "python",
              label: "Part 4",
              c: `prefix_map[current_sum] -= 1
return paths`,
            },

            { t: "h3", c: "4. Step-by-Step Walkthrough" },
            {
              t: "p",
              c: "Tree: [10, 5, -3, 3, 2, null, 11] with targetSum = 8",
            },
            {
              t: "code",
              lang: "text",
              c: `      10
     /  \\
    5   -3
   / \\    \\
  3   2    11`,
            },
            {
              t: "p",
              c: "Start: notebook = {0: 1}",
            },

            { t: "h3", c: "At node 10 (Root)" },
            {
              t: "ul",
              c: [
                "Current Sum = 10",
                "Look up 10 − 8 = 2 in the notebook (miss → 0 paths)",
                "Log 10 → notebook becomes {0: 1, 10: 1}",
              ],
            },

            { t: "h3", c: "Down left to node 5" },
            {
              t: "ul",
              c: [
                "Current Sum = 10 + 5 = 15",
                "Look up 15 − 8 = 7 (miss → 0 paths)",
                "Log 15 → notebook becomes {0: 1, 10: 1, 15: 1}",
              ],
            },

            { t: "h3", c: "Down left again to node 3" },
            {
              t: "ul",
              c: [
                "Current Sum = 15 + 3 = 18",
                "Look up 18 − 8 = 10 (hit! once) → +1 path (nodes 5 → 3)",
                "Log 18 → notebook becomes {0: 1, 10: 1, 15: 1, 18: 1}",
              ],
            },

            { t: "h3", c: "Backtrack out of node 3" },
            {
              t: "ul",
              c: [
                "Can't go further — climb back to 5 and erase 18 from the notebook so the right child (node 2) never sees it",
              ],
            },
            {
              t: "p",
              c: "Continue through the rest of the tree to find the other paths (e.g. -3→11 and 5→2→1 in the full example) — total 3.",
            },

            { t: "h3", c: "5. Full Assembled Code (Clean Code)" },
            {
              t: "p",
              c: "One shared prefix_map for the whole tree, with backtracking before climbing up:",
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
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:

        # Prefix Sum notebook
        prefix_map = {0: 1}

        def dfs(node, current_sum):
            if not node:
                return 0

            # 1. Add this node's points
            current_sum += node.val

            # 2. Have we seen (current − target) before?
            old_sum = current_sum - targetSum
            paths = prefix_map.get(old_sum, 0)

            # 3. Log the current sum (+1 frequency)
            prefix_map[current_sum] = prefix_map.get(current_sum, 0) + 1

            # 4. Explore left & right; accumulate path counts
            paths += dfs(node.left, current_sum)
            paths += dfs(node.right, current_sum)

            # 5. Backtracking: erase this node's footprint
            prefix_map[current_sum] -= 1

            return paths

        return dfs(root, 0)`,
            },

            { t: "h3", c: "6. Complexity Analysis" },
            {
              t: "ul",
              c: [
                "Time Complexity: O(N) — one DFS visit per node; Hash Map ops average O(1)",
                "Space Complexity: O(N) — recursion stack up to O(H), and the map up to O(N) in the worst case (all distinct prefixes), so overall O(N)",
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

            { t: "callout",
              title: "ทำไมต้องส่ง go_left ลงไป?",
              c: 'เพราะโจทย์กำหนดว่า "ถ้าทิศปัจจุบันคือขวา ให้ก้าวไป right child" — นั่นหมายความว่าเราต้อง "จำ" ไว้ว่าก้าวถัดไปต้องไปทางไหน ถ้าจำไม่ได้จะสลับทิศผิด! การส่ง go_left เป็น parameter คือการ "พกกระดาษจดทิศ" ติดตัวไปทุกก้าว',
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
              t: "p",
              c: 'สังเกตว่าเราเรียก dfs จาก root สองครั้ง — ครั้งแรกให้ go_left=True (สมมติว่า "ทิศถัดไปคือซ้าย") ครั้งที่สองให้ go_left=False — เพราะเส้นทางที่ดีที่สุดอาจเริ่มสลับทิศจากซ้ายหรือขวาก็ได้!',
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
    def longestZigZag(self, root: Optional[TreeNode]) -> int:
        ans = 0

        def dfs(node, go_left, length):
            nonlocal ans
            if node is None:
                return
            ans = max(ans, length)          # อัปเดตคำตอบทุกครั้งที่แวะ
            if go_left:
                dfs(node.left, False, length + 1)  # ตามแผน: ไปซ้าย แล้วคราวหน้าไปขวา
                dfs(node.right, True, 1)           # สวนทาง: เริ่มเส้นใหม่ที่ขวา
            else:
                dfs(node.right, True, length + 1)  # ตามแผน: ไปขวา แล้วคราวหน้าไปซ้าย
                dfs(node.left, False, 1)           # สวนทาง: เริ่มเส้นใหม่ที่ซ้าย

        dfs(root, True, 0)   # เริ่มโดยสมมติว่า "ทิศถัดไปคือซ้าย"
        dfs(root, False, 0)  # เริ่มโดยสมมติว่า "ทิศถัดไปคือขวา"
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
            {
              t: "callout",
              title: 'ทำไม "เจอแค่ฝั่งเดียว" แล้วยังต้องส่งต่อ?',
              c: 'เพราะ "จุดบรรจบ" อาจอยู่ "เหนือ" โหนดปัจจุบัน! สมมติ q อยู่ทางซ้ายของ root แต่ p อยู่ทางซ้ายของ "ลูกซ้ายของ root" — ถ้าเราเจอ q ที่ลูกซ้ายแล้วหยุดส่ง คำตอบจะผิด เพราะ LCA จริงๆ คือ root ที่มีทั้ง p และ q อยู่ใต้ตัวเองทั้งคู่ การส่งต่อคือการบอกว่า "ฉันเจอเป้าหมายบางตัวอยู่ใต้ตัวฉันนะ" ให้ผู้ปกครองตัดสินใจเอง',
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
              t: "p",
              c: 'สังเกตว่าเราใช้ "is" ไม่ใช่ "==" เพราะโจทย์ให้ "object" มา ไม่ใช่ค่า val — ต้องเทียบว่า "เป็นตัวเดียวกัน" ไม่ใช่ "ค่าเท่ากัน',
            },
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
        # Base case: ไม่มีโหนด หรือเจอ p หรือ q แล้ว → คืนตัวเอง
        if root is None or root is p or root is q:
            return root

        # ถามลูกซ้ายและลูกขวา: "เจอ p หรือ q ไหม?"
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        # ถ้าได้ผลทั้งสองฝั่ง → ตัวนี้คือจุดบรรจบ = LCA
        if left and right:
            return root

        # ถ้าเจอแค่ฝั่งเดียว → ส่งฝั่งนั้นต่อขึ้นไป
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
