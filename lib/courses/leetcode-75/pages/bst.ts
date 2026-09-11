import type { Page } from "@/lib/types";

export const bstPages: Record<string, Page> = {
  "lc75-intro-bst": {
    slug: "lc75-intro-bst",
    title: {
      th: "Binary Search Tree — จากกฎเดียวจนพร้อมลุย LeetCode",
      en: "Binary Search Tree — From One Rule to LeetCode Ready",
    },
    lead: {
      th: "ต้นไม้ที่จัดค่าไว้เป็นระเบียบ: ซ้ายเล็กกว่า ขวาใหญ่กว่า — search / insert / delete ได้ใน O(h) โดยไม่ต้องไล่ทุกโหนด",
      en: "Ordered binary tree: left is smaller, right is larger — search, insert, and delete in O(h) time without full scans.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "หมวด Tree DFS เราเดินต้นไม้แบบดิ่งกิ่ง — ไม่สนว่าค่าในโหนดเรียงกันหรือไม่ หมวดนี้ต้นไม้มีกฎพิเศษข้อเดียวที่เปลี่ยนทุกอย่าง: ค่าถูกจัดไว้แล้ว เหมือนพจนานุกรมที่เปิดกลางเล่มแล้วรู้ทันทีว่าจะพลิกซ้ายหรือขวา",
        },
        {
          t: "p",
          c: "โครงสร้างนี้ชื่อ Binary Search Tree (BST) หรือต้นไม้ค้นหาแบบทวิภาค เจอในสัมภาษณ์บ่อยเพราะมันเชื่อม binary search บน array เข้ากับ tree — หมวดนี้มี 2 ข้อ: ค้นหา (LC700) กับลบโหนด (LC450) หน้านี้ปูให้ครบก่อนลงมือ",
        },

        { t: "h2", c: "1. ปลดล็อกไอเดีย: พจนานุกรม ไม่ใช่ตู้ลิ้นชัก" },
        {
          t: "p",
          c: "ลองนึกว่ามีกล่องตัวเลขกองหนึ่ง อยากรู้ว่ามีเลข 7 ไหม",
        },
        {
          t: "ul",
          c: [
            "Array ธรรมดา / binary tree ทั่วไป = เปิดทีละกล่องจนหมด — O(n)",
            "Array ที่เรียงแล้ว + binary search = เปิดกลางแถว แล้วทิ้งครึ่งที่ไม่เกี่ยว — O(log n)",
            "BST = ไอเดีย binary search แต่เก็บเป็นต้นไม้ ไม่ต้องเลื่อนช่องเวลาแทรก/ลบ",
          ],
        },
        {
          t: "p",
          c: "ข้อดีของต้นไม้เหนือ array เรียง: แทรกและลบไม่ต้องเบียดคนทั้งแถว — แค่เกี่ยวกิ่งใหม่ ข้อแลกคือถ้าต้นเอียงเป็นเส้นตรง ความเร็วจะพังกลับไป O(n) เราจะกลับมาเรื่องนี้ท้ายหน้า",
        },

        { t: "h2", c: "2. ศัพท์ที่ต้องจำให้ขึ้นใจ" },
        {
          t: "ul",
          c: [
            "BST (Binary Search Tree) — binary tree ที่จัดค่าตามกฎ left < node < right ทุกโหนด",
            "BST property — กฎนั้นเอง: ค่าใน subtree ซ้ายทั้งหมดน้อยกว่าโหนดนี้ · ค่าใน subtree ขวาทั้งหมดมากกว่า",
            "search (ค้นหา) — เดินลงต้น เทียบค่าแล้วเลือกซ้ายหรือขวาทีละก้าว",
            "insert (แทรก) — เดินแบบ search จนตกขอบ แล้วแขวนโหนดใหม่ตรงนั้น",
            "delete (ลบ) — หาโหนดแล้วต่อกิ่งใหม่ให้กฎ BST ยังอยู่ แยก 3 กรณี",
            "successor (ตัวถัดไป) — ค่าที่มากกว่าโหนดนี้น้อยที่สุด = ค่าน้อยสุดในฝั่งขวา",
            "predecessor (ตัวก่อนหน้า) — ค่าที่น้อยกว่าโหนดนี้มากที่สุด = ค่ามากสุดในฝั่งซ้าย",
            "height h — จำนวนชั้นจาก root ลงถึงใบที่ไกลสุด · ความเร็วของ BST คือ O(h) ไม่ใช่ O(n)",
            "balanced (สมดุล) — ซ้าย-ขวาสูงไล่เลี่ยกัน → h ≈ log n",
            "skewed (เอียง) — ต้นกลายเป็นเส้นตรง → h = n",
            "in-order traversal — เดินซ้าย → ตัวเอง → ขวา บน BST จะได้ค่าเรียงจากน้อยไปมากเสมอ",
          ],
        },

        { t: "h2", c: "3. กฎเหล็กข้อเดียว: left < node < right" },
        {
          t: "p",
          c: "จำแค่นี้ก็เดิน BST ได้ทั้งหมวด — และกฎนี้ต้องจริงกับทุกโหนด ไม่ใช่แค่ root กด Next เทียบต้นถูกกับต้นผิด: ชั้นแม่ผ่านได้ แต่บรรพบุรุษพัง",
        },
        { t: "viz", id: "bst-rule" },
        {
          t: "callout",
          title: "กับดัก: เช็กแค่ลูกชั้นเดียวไม่พอ",
          warn: true,
          c: "หลายคนคิดว่าแค่ left.val < node.val < right.val ก็พอ — ไม่ใช่ ค่าทั้งก้อนของ subtree ซ้ายต้องน้อยกว่า และทั้งก้อนของ subtree ขวาต้องมากกว่า",
        },
        {
          t: "p",
          c: "นิยามโหนดเหมือน binary tree ทุกประการ — LeetCode ให้คลาสนี้มาให้แล้ว:",
        },
        {
          t: "code",
          lang: "python",
          label: "TreeNode — พิมพ์เขียวเดียวกับหมวด DFS",
          c: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right`,
        },

        { t: "h2", c: "4. [Workshop] ปลูกต้นด้วยมือ — insert ทีละใบ" },
        {
          t: "p",
          c: "อย่าท่องรูปสำเร็จรูป กด **Next ▶** ปลูกจากลิสต์ [5, 3, 8, 2, 4, 9] — วงประจุดคือตำแหน่งที่จะแขวนใบใหม่ เล่นต่อจนจบจะได้ in-order เรียงเอง",
        },
        { t: "viz", id: "bst-grow" },

        { t: "h2", c: "5. [Workshop] ลบโหนด — 3 กรณีบนกระดาน" },
        {
          t: "p",
          c: "การลบคือเรื่องยากที่สุดของ BST เพราะต้องปลดโหนดแล้วซ่อมกิ่งให้กฎยังอยู่ กดดู 3 กรณี:",
        },
        { t: "viz", id: "bst-cases" },

        { t: "h2", c: "6. ทำไม Big-O คือ O(h) ไม่ใช่ O(log n)" },
        {
          t: "p",
          c: "กด Next สลับระหว่างต้นสมดุลกับต้นเอียง — ต้นเดียวกันแต่ลำดับใส่ต่างกัน ความลึกจะต่างกันลิบลับ:",
        },
        { t: "viz", id: "bst-height" },
      ],
      en: [
        {
          t: "p",
          c: "In general binary trees, nodes appear in any order. In a Binary Search Tree (BST), every node obeys one strict rule: all keys in the left subtree are smaller than the node, and all keys in the right subtree are larger.",
        },
        {
          t: "h2",
          c: "Part 1 · The BST Property: left < node < right",
        },
        {
          t: "p",
          c: "This ordering invariant holds for every node in the tree, enabling O(h) search, insertion, and deletion — discarding half of the remaining subtree at each step.",
        },
        { t: "viz", id: "bst-rule" },
        {
          t: "h2",
          c: "Part 2 · Growing a BST",
        },
        { t: "viz", id: "bst-grow" },
        {
          t: "h2",
          c: "Part 3 · 3 Deletion Cases",
        },
        {
          t: "ul",
          c: [
            "Case 1 (Leaf): Simply remove the node (return `None`).",
            "Case 2 (One Child): Replace the node with its only child.",
            "Case 3 (Two Children): Find the in-order successor (min node in right subtree), copy its value, and recursively delete the successor.",
          ],
        },
        { t: "viz", id: "bst-cases" },
      ],
    },
  },

  "lc75-p41": {
    slug: "lc75-p41",
    title: {
      th: "ข้อ 41 · LC700 Search in a Binary Search Tree (ค้นหาใน BST) 🟢",
      en: "LC700 Search in a Binary Search Tree 🟢",
    },
    lead: {
      th: "โจทย์เดินตามกฎ BST — เล็กกว่าเลี้ยวซ้าย ใหญ่กว่าเลี้ยวขวา เจอก็คืน subtree ทั้งก้อน",
      en: "Navigate by BST ordering: smaller turns left, larger turns right, return the matching subtree.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `You are given the \`root\` of a binary search tree (BST) and an integer \`val\`.

Find the node in the BST that the node's value equals \`val\` and return the subtree rooted with that node. If such a node does not exist, return \`null\`.`,
        },
        {
          t: "p",
          c: `กำหนด \`root\` ของ binary search tree (BST) และตัวเลขจำนวนเต็ม \`val\` มาให้

จงค้นหาโหนดใน BST ที่มีค่าเท่ากับ \`val\` แล้วส่งคืน "subtree ทั้งก้อน" ที่มีโหนดนั้นเป็นราก หากไม่พบโหนดที่มีค่าดังกล่าว ให้ส่งคืน \`null\``,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [4,2,7,1,3], val = 2",
              output: "[2,1,3]",
              explain: "เจอโหนด 2 ส่งคืนโหนด 2 พร้อมลูกทั้งสอง (1 และ 3) เป็น subtree ทั้งก้อน",
            },
            {
              input: "root = [4,2,7,1,3], val = 5",
              output: "[]",
              explain: "ไม่มีโหนดค่า 5 อยู่ในต้นไม้ ส่งคืน null",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes in the tree is in the range [1, 5000].",
            "1 <= Node.val <= 10^7",
            "root is a valid binary search tree.",
            "1 <= val <= 10^7",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "กฎของ BST คือ 'ซ้ายน้อยกว่า ขวามากกว่า' ทุกครั้งที่เทียบค่ากับโหนดปัจจุบัน เราสามารถตัดกิ่งที่ไม่เกี่ยวข้องทิ้งได้อย่างไร?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ให้ค้นหาโหนดที่มีค่าเท่ากับ `val` ใน Binary Search Tree เมื่อเจอแล้วให้ส่งคืนโหนดนั้นทันที (ซึ่งใน Python การส่งคืนโหนดจะติด subtree ลูกหลานทั้งหมดไปด้วยโดยอัตโนมัติ) และถ้าหาไม่เจอให้ส่งคืน `None`",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ลองค้นหา val = 2 ในต้นไม้ root = [4, 2, 7, 1, 3]:",
            },
            {
              t: "ul",
              c: [
                "ก้าวที่ 1: ยืนที่ root (ค่า 4) -> เทียบ 2 กับ 4 -> เนื่องจาก 2 < 4 เราฟันธงได้ทันทีว่า 2 ต้องอยู่ฝั่งซ้ายเท่านั้น ตัดฝั่งขวา (โหนด 7) ทิ้งทั้งกิ่ง!",
                "ก้าวที่ 2: เลี้ยวซ้ายมาที่โหนด 2 -> เทียบ 2 กับ 2 -> เท่ากันพอดี! เจอเป้าหมายแล้ว",
                "ส่งคืนโหนด 2 (ซึ่งมีลูกซ้าย 1 และลูกขวา 3 ติดไปด้วย ได้ [2, 1, 3])",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: ใช้คุณสมบัติของ BST เดินลงไปตามกิ่งทีละก้าวแบบ iterative (วนลูป) โดยไม่ต้องใช้ recursion เพื่อประหยัด stack memory",
            },
            {
              t: "p",
              c: "ขั้นตอนตรรกะ:",
            },
            {
              t: "ol",
              c: [
                "ตั้ง `curr = root` เป็นตัวชี้ปัจจุบัน",
                "วนลูปตราบใดที่ `curr` ยังไม่เป็น `None`:",
                "ถ้า `curr.val == val`: เจอแล้ว! `return curr`",
                "ถ้า `val < curr.val`: เลี้ยวซ้าย -> `curr = curr.left`",
                "ถ้า `val > curr.val`: เลี้ยวขวา -> `curr = curr.right`",
                "ถ้าหลุดลูปออกมา แปลว่าเดินจนตกขอบต้นไม้แล้วหาไม่เจอ -> `return None`",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** เพื่อดูการตัดกิ่งและเดินตรงเข้าหาเป้าหมายในเวลา O(h):",
            },
            { t: "viz", id: "bst-search" },

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

class Solution:
    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        curr = root

        while curr:
            if curr.val == val:
                return curr
            elif val < curr.val:
                curr = curr.left
            else:
                curr = curr.right

        return None`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["curr = root", "เริ่มออกเดินจากจุดยอดของต้นไม้", "curr = 4"],
                ["if curr.val == val: return curr", "ถ้าค่าตรงกัน คืน subtree ก้อนนั้นทันที", "2 == 2 -> คืนโหนด 2"],
                ["elif val < curr.val: curr = curr.left", "ถ้าเป้าหมายเล็กกว่า ให้เดินไปทางซ้าย", "2 < 4 -> curr เลื่อนไป 2"],
                ["else: curr = curr.right", "ถ้าเป้าหมายใหญ่กว่า ให้เดินไปทางขวา", "val=7 > 4 -> ไปทางขวา"],
                ["return None", "ถ้าหลุดลูป (ตกขอบต้นไม้) แปลว่าไม่มี", "หา 5 ไม่เจอ -> คืน None"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(h)", "เดินลงต้นไม้ 1 ชั้นต่อรอบ โดย h คือความสูงของต้นไม้ (เฉลี่ย O(log N), แย่สุด O(N) ถ้าต้นเอียง)"],
                ["Space (หน่วยความจำ)", "O(1)", "ใช้ตัวแปร `curr` เพียงตัวเดียว ไม่เปลือง Call Stack เหมือน recursion"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `You are given the \`root\` of a binary search tree (BST) and an integer \`val\`. Find the node in the BST with value equal to \`val\` and return the subtree rooted with that node. If it does not exist, return \`null\`.`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [4,2,7,1,3], val = 2",
              output: "[2,1,3]",
              explain: "Node 2 matches. Return subtree rooted at 2.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes in the tree is in the range [1, 5000].",
            "1 <= Node.val <= 10^7",
            "root is a valid binary search tree.",
            "1 <= val <= 10^7",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Find the node with `val` in a BST and return its subtree. If not found, return `None`.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "Start at 4: 2 < 4 -> move left to 2. At 2: 2 == 2 -> found! Return node 2.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Iterative search: compare `val` with `curr.val`. Branch left if smaller, right if larger.",
            },

            { t: "h3", c: "Step 4 · Interactive Walkthrough" },
            { t: "viz", id: "bst-search" },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        curr = root
        while curr:
            if curr.val == val:
                return curr
            elif val < curr.val:
                curr = curr.left
            else:
                curr = curr.right
        return None`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["curr = root", "Start at tree root", "curr = 4"],
                ["if curr.val == val:", "Target found", "return node 2"],
                ["elif val < curr.val: curr = curr.left", "Branch left", "2 < 4"],
                ["else: curr = curr.right", "Branch right", "7 > 4"],
                ["return None", "Not found", "return None"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(h)", "Traverses down at most tree height h (O(log N) balanced, O(N) skewed)."],
                ["Space", "O(1)", "Iterative loop uses constant extra space."],
              ],
            },
          ],
        },
      ],
    },
  },

  "lc75-p42": {
    slug: "lc75-p42",
    title: {
      th: "ข้อ 42 · LC450 Delete Node in a BST (ลบโหนดใน BST) 🟡",
      en: "LC450 Delete Node in a BST 🟡",
    },
    lead: {
      th: "ลบโหนดแล้วยังคงกฎ BST — ใบตัดทิ้ง ลูกเดียวยกขึ้น ลูกสองตัวยืม successor มาแทน",
      en: "Delete a node while preserving the BST property — 3 cases: leaf, single child, or two children using successor.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:
1. Search for a node to remove.
2. If the node is found, delete the node.`,
        },
        {
          t: "p",
          c: `กำหนด \`root\` ของ binary search tree และค่า \`key\` มาให้ จงลบโหนดที่มีค่าเท่ากับ \`key\` ออกจากต้นไม้ แล้วส่งคืน \`root\` ของต้นไม้หลังการลบ (โดยยังคงคุณสมบัติ BST ไว้ครบถ้วน)

กระบวนการลบแบ่งออกเป็น 2 ขั้นตอน:
1. ค้นหาโหนดที่ต้องการลบ
2. เมื่อพบโหนดแล้ว ให้ทำการลบโหนดนั้นออกโดยจัดโครงสร้างกิ่งใหม่ให้ถูกต้อง`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [5,3,6,2,4,null,7], key = 3",
              output: "[5,4,6,2,null,null,7]",
              explain:
                "โหนด 3 มีลูกสองคน (2 และ 4) เราจึงนำ successor (ค่าน้อยสุดในกิ่งขวา คือ 4) มาแทนที่โหนด 3 แล้วลบ 4 ตัวเดิมออก",
            },
            {
              input: "root = [5,3,6,2,4,null,7], key = 0",
              output: "[5,3,6,2,4,null,7]",
              explain: "ไม่มีโหนด 0 ในต้นไม้ จึงไม่ต้องลบอะไรเลย",
            },
            {
              input: "root = [], key = 0",
              output: "[]",
              explain: "ต้นไม้ว่างเปล่า ส่งคืน []",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes in the tree is in the range [0, 10^4].",
            "-10^5 <= Node.val <= 10^5",
            "Each node has a unique value.",
            "root is a valid binary search tree.",
            "-10^5 <= key <= 10^5",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "ถ้าโหนดที่เราจะลบมีทั้งลูกซ้ายและลูกขวา เราจะเอาโหนดไหนขึ้นมาแทนตำแหน่งของมันโดยไม่ทำให้กฎ BST พัง?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ให้ค้นหาและลบโหนดที่มีค่าเท่ากับ `key` ออกจาก BST โดยต้นไม้ผลลัพธ์จะต้องยังคงเป็น BST ที่สมบูรณ์ (ทุกโหนดฝั่งซ้ายน้อยกว่า และทุกโหนดฝั่งขวามากกว่า)",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "เมื่อเดินหาโหนดจนพบแล้ว การลบจะแตกออกเป็น 3 กรณีเท่านั้น:",
            },
            {
              t: "ul",
              c: [
                "กรณีที่ 1 (ไม่มีลูกเลย / ใบ): ตัดทิ้งได้ทันที คืนค่า `None` ขึ้นไปให้แม่ต่อกิ่ง",
                "กรณีที่ 2 (มีลูกคนเดียว): ยกลูกคนนั้นขึ้นมาเสียบแทนตำแหน่งเดิมได้เลย (ถ้าไม่มีลูกซ้าย คืนลูกขวา, ถ้าไม่มีลูกขวา คืนลูกซ้าย)",
                "กรณีที่ 3 (มีลูกครบสองคน): ห้ามตัดทิ้งเพราะลูกจะกำพร้า! ให้หา **In-order Successor** (ตัวที่มากกว่ามันน้อยที่สุด คือ 'เดินขวา 1 ก้าว แล้วเดินซ้ายให้สุด') นำค่านั้นมาเขียนทับ แล้วสั่งลบ successor ตัวเดิมทิ้ง",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: ใช้ Recursion โดยให้ฟังก์ชันคืนค่า root ใหม่ของแต่ละกิ่งย่อยขึ้นมาเชื่อมต่อกิ่งแม่ (`root.left = deleteNode(root.left, key)`)",
            },
            {
              t: "p",
              c: "ขั้นตอน Recursion:",
            },
            {
              t: "ol",
              c: [
                "Base case: ถ้า `root is None` ให้ `return None`",
                "ค้นหา: ถ้า `key < root.val` สั่ง `root.left = self.deleteNode(root.left, key)`",
                "ค้นหา: ถ้า `key > root.val` สั่ง `root.right = self.deleteNode(root.right, key)`",
                "เจอเป้าหมาย (`key == root.val`):",
                "  • ถ้าไม่มีลูกซ้าย: คืน `root.right`",
                "  • ถ้าไม่มีลูกขวา: คืน `root.left`",
                "  • ถ้ามีสองลูก: หาตัวค่าน้อยสุดในกิ่งขวา (`succ = root.right` แล้วเดินซ้ายจนสุด `while succ.left: succ = succ.left`)",
                "  • เอาค่า `root.val = succ.val` แล้วลบตัวซ้ำออก: `root.right = self.deleteNode(root.right, succ.val)`",
                "ส่งคืน `root` ที่จัดกิ่งใหม่เสร็จแล้ว",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** เพื่อดูการแทนที่โหนดด้วย successor และการตัดต่อกิ่งใหม่:",
            },
            { t: "viz", id: "bst-delete" },

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

class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if not root:
            return None

        # 1. เดินหาโหนดเป้าหมาย
        if key < root.val:
            root.left = self.deleteNode(root.left, key)
        elif key > root.val:
            root.right = self.deleteNode(root.right, key)
        else:
            # 2. เจอโหนดที่ต้องการลบแล้ว (root.val == key)
            # กรณีที่ 1 & 2: มีลูกคนเดียว หรือไม่มีลูกเลย
            if not root.left:
                return root.right
            if not root.right:
                return root.left

            # กรณีที่ 3: มีลูกครบทั้งสองฝั่ง
            # หา successor (ค่าน้อยสุดใน subtree ฝั่งขวา)
            succ = root.right
            while succ.left:
                succ = succ.left

            # คัดลอกค่า successor มาแทนที่
            root.val = succ.val
            # ลบโหนด successor ตัวเดิมออกจาก subtree ฝั่งขวา
            root.right = self.deleteNode(root.right, succ.val)

        return root`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["if key < root.val: root.left = ...", "ถ้า key เล็กกว่า ให้ลงไปลบฝั่งซ้ายแล้วต่อกิ่งกลับ", "3 < 5 -> ลงไปจัดการฝั่งซ้าย"],
                ["if not root.left: return root.right", "ถ้าไม่มีลูกซ้าย ยกกิ่งขวาขึ้นมาแทนที่", "ลบ 6 ที่มีลูกขวา 7 -> 7 ขึ้นมาแทน"],
                ["while succ.left: succ = succ.left", "หาค่าน้อยสุดในกิ่งขวา (successor)", "กิ่งขวาของ 3 คือ 4 (succ.val = 4)"],
                ["root.val = succ.val", "เขียนทับค่าเดิมด้วยค่า successor", "3 เปลี่ยนเป็น 4"],
                ["root.right = self.deleteNode(root.right, succ.val)", "ลบ successor ตัวจริงที่กิ่งขวาทิ้ง", "ลบ 4 ตัวเดิมออก"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(h)", "ค้นหาโหนด O(h) และหา successor O(h) รวมใช้เวลาตามความสูงของต้นไม้"],
                ["Space (หน่วยความจำ)", "O(h)", "ใช้ Call Stack ของ Recursion ลึกสุดเท่าความสูง h"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference of the BST.`,
        },
        {
          t: "example",
          c: [
            {
              input: "root = [5,3,6,2,4,null,7], key = 3",
              output: "[5,4,6,2,null,null,7]",
              explain: "Node 3 has two children. Replaced with successor 4.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "The number of nodes in the tree is in the range [0, 10^4].",
            "-10^5 <= Node.val <= 10^5",
            "Each node has a unique value.",
            "root is a valid binary search tree.",
            "-10^5 <= key <= 10^5",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Find and remove the node with `val == key` from the BST while keeping the BST ordering invariant intact.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "3 Deletion Cases:\n1. Leaf node: delete directly (return `None`).\n2. Single child: return the non-null child.\n3. Two children: find in-order successor (min node in right subtree), copy its value, and delete the successor from the right subtree.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Recursive deletion with return value relinking: `root.left = deleteNode(root.left, key)` and `root.right = deleteNode(root.right, key)`.",
            },

            { t: "h3", c: "Step 4 · Interactive Walkthrough" },
            { t: "viz", id: "bst-delete" },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if not root:
            return None

        if key < root.val:
            root.left = self.deleteNode(root.left, key)
        elif key > root.val:
            root.right = self.deleteNode(root.right, key)
        else:
            if not root.left:
                return root.right
            if not root.right:
                return root.left

            succ = root.right
            while succ.left:
                succ = succ.left

            root.val = succ.val
            root.right = self.deleteNode(root.right, succ.val)

        return root`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["if key < root.val:", "Search left subtree", "3 < 5 -> delete in left"],
                ["if not root.left: return root.right", "0 or 1 child case", "promote right child"],
                ["succ = root.right; while succ.left: succ = succ.left", "Find in-order successor", "succ = 4"],
                ["root.val = succ.val", "Copy successor value", "3 replaced with 4"],
                ["root.right = self.deleteNode(root.right, succ.val)", "Remove duplicate successor", "clean up leaf 4"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(h)", "Search + finding successor takes at most tree height h."],
                ["Space", "O(h)", "Recursion call stack."],
              ],
            },
          ],
        },
      ],
    },
  },
};
