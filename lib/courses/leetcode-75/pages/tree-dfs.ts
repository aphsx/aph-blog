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
      th: "\"Hello World\" ของโจทย์หมวด Tree DFS — recursion 3 บรรทัดที่ซ่อนหัวใจของการคิดแบบเรียกตัวเองไว้แบบเต็มเปี่ยม",
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
              c: `จัดให้ครับ! ข้อ **LeetCode 104: Maximum Depth of Binary Tree** นี่คือ **\"Hello World\"** ของโจทย์หมวด Tree DFS เลยก็ว่าได้ครับ เป็นข้อที่เรียบง่ายที่สุด แต่ซ่อนหัวใจสำคัญของการคิดแบบ Recursion (การเรียกตัวเอง) ไว้แบบเต็มเปี่ยม

มาดูการชำแหละลอจิกด้วย **Concept-First Framework (Definitive Edition)** กันครับ!`,
            },

            { t: "h3", c: "1. Problem Decoding (แปลโจทย์ภาษาคน)" },
            {
              t: "p",
              c: `เรามีแผนผังต้นไม้ (Binary Tree) 1 ต้น
โจทย์ต้องการให้เราหา **\"ความลึกสูงสุด (Maximum Depth)\"** ของต้นไม้นี้`,
            },
            {
              t: "p",
              c: "**ความลึกวัดจากอะไร?:** วัดจากจำนวนโหนดในเส้นทางที่ยาวที่สุด ตั้งแต่ราก (Root) ไล่ลงไปจนถึงใบไม้ (Leaf) ที่อยู่ลึกที่สุด",
            },

            { t: "h3", c: "2. Mental Model (สร้างภาพจำ)" },
            {
              t: "p",
              c: "ให้จินตนาการว่าต้นไม้นี้คือ **\"บริษัทที่มีสายการบังคับบัญชา\"** และคุณคือ **CEO (Root Node)**",
            },
            {
              t: "ul",
              c: [
                "คุณอยากรู้ว่าบริษัทของคุณมีพนักงานซ้อนกันลงไป \"ลึกที่สุดกี่ระดับ\"",
                "แทนที่คุณจะเดินไปนับเองทีละแผนก คุณใช้วิธี **\"สั่งงานลูกน้อง (Delegation)\"**",
                "คุณหันไปถามรองประธานฝ่ายซ้าย (ลูกซ้าย) และรองประธานฝ่ายขวา (ลูกขวา) ว่า *\"เฮ้ย สายงานของพวกคุณลึกกี่ระดับ ไปนับมาซิ!\"*",
                "รองประธานก็ไปใช้วิธีเดียวกัน ถามผู้จัดการ ผู้จัดการถามหัวหน้างาน ถามต่อไปเรื่อยๆ จนถึงพนักงานระดับล่างสุด (Leaf) ที่ไม่มีลูกน้องแล้ว พนักงานคนนั้นก็จะตะโกนบอกกลับมาว่า *\"ผมอยู่ระดับ 1 ครับ!\"*",
                "เมื่อรองประธานฝ่ายซ้ายและขวาได้ตัวเลขมาบอกคุณ คุณแค่ **เลือกตัวเลขที่มากที่สุด (max) แล้วบวก 1 (นับตัวคุณเองที่เป็น CEO ด้วย)** คุณก็จะได้คำตอบของทั้งบริษัททันที!",
              ],
            },

            { t: "h3", c: "3. Logic-to-Code Mapping (ชำแหละแก่นโค้ด)" },
            {
              t: "p",
              c: "ข้อนี้สั้นมากครับ เราสามารถใช้ตัวฟังก์ชันหลักเป็น Recursion ได้เลย นี่คือ 3 บรรทัดที่เป็นหัวใจของ Tree DFS ทั้งปวง:",
            },

            { t: "h3", c: "ส่วนที่ 1: การตอบคำถามของคนที่ไม่มีลูกน้อง (Base Case)" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 1",
              c: `if not root:
    return 0`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: 'นี่คือจุดสิ้นสุดของการสั่งงาน (จุดหยุด Recursion) ถ้าตำแหน่งนั้นว่างเปล่า (Null/None) หรือพูดง่ายๆ คือ "ไม่มีพนักงานตำแหน่งนี้อยู่" ความลึกของตำแหน่งที่ไม่มีอยู่จริงก็ต้องเป็น **0**',
            },
            {
              t: "callout",
              title: "ถ้าไม่เขียน (What If)",
              warn: true,
              c: "โค้ดจะเกิด `AttributeError` ทันที! เพราะเราจะพยายามไปถามหาลูกน้องฝั่งซ้าย/ขวา (`root.left`) จากความว่างเปล่า (None) และมันจะวนลูปไม่สิ้นสุด (Infinite Loop) จน Call Stack เต็ม (Stack Overflow)",
            },

            { t: "h3", c: "ส่วนที่ 2: โยนงานให้ลูกน้องไปหาคำตอบ" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 2",
              c: `left_depth = self.maxDepth(root.left)
right_depth = self.maxDepth(root.right)`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: "นี่คือแก่นของ Recursion (การเรียกตัวเอง) เราไม่จำเป็นต้องรู้ว่าลูกน้องจะไปหาวิธีนับมายังไง (Leap of Faith) เราแค่ไว้ใจฟังก์ชันนี้ว่า ถ้าเราส่งกิ่งซ้ายไป มันจะต้องคืนความลึกสูงสุดของฝั่งซ้ายมาให้เราแน่นอน",
            },

            { t: "h3", c: "ส่วนที่ 3: สรุปผลงานและรายงานนายหน้า (จุดตัดคนผ่าน/ไม่ผ่าน)" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 3",
              c: `return max(left_depth, right_depth) + 1`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: "เมื่อได้รายงานความลึกจากฝั่งซ้ายและขวามาแล้ว ความลึกสูงสุดของต้นไม้ก็ต้องมาจากฝั่งที่ลึกกว่า เราจึงใช้ `max()` เพื่อหาผู้ชนะ จากนั้น **ต้องบวก 1 เสมอ** เพื่อเป็นการบอกว่า *\"นับรวมชั้นที่ฉันยืนอยู่ไปด้วยนะ\"*",
            },
            {
              t: "callout",
              title: "ถ้าลืมบวก 1 (What If)",
              warn: true,
              c: "ความลึกจะติดอยู่ที่ `0` ตลอดกาลครับ! เพราะฐานสุดส่ง 0 ขึ้นมา ไม่ว่าจะมีกี่ชั้น ค่ามันก็จะถูกส่งต่อเป็น 0 เท่าเดิม",
            },
            {
              t: "callout",
              title: "ถ้าเปลี่ยนเป็น min (What If)",
              warn: true,
              c: "คุณจะได้คำตอบของโจทย์ข้อ *111. Minimum Depth of Binary Tree* ทันทีครับ (หาเส้นทางที่สั้นที่สุดที่ไปถึงใบไม้) นี่คือความมหัศจรรย์ของโค้ดบรรทัดนี้!",
            },

            { t: "h3", c: "4. Step-by-Step Walkthrough (จำลองการทำงาน)" },
            {
              t: "p",
              c: "สมมติ Tree: `[3, 9, 20, null, null, 15, 7]`",
            },
            {
              t: "ol",
              c: [
                "**CEO โหนด 3 (Root):** ถามลูกซ้าย (9) และลูกขวา (20)",
                "**กิ่งซ้าย โหนด 9:** ไม่มีลูกน้องทั้งซ้ายและขวา (`left=0, right=0`) → คืนค่า `max(0, 0) + 1 = 1` → ส่งเลข **1** กลับไปให้ CEO",
                "**กิ่งขวา โหนด 20:** ถามลูกซ้าย (15) และลูกขวา (7)",
              ],
            },
            {
              t: "ul",
              c: [
                "**โหนด 15:** ไม่มีลูกน้อง คืนค่า `max(0, 0) + 1 = 1`",
                "**โหนด 7:** ไม่มีลูกน้อง คืนค่า `max(0, 0) + 1 = 1`",
                "**โหนด 20 (สรุปผล):** ได้รับ `1` กับ `1` → คืนค่า `max(1, 1) + 1 = 2` → ส่งเลข **2** กลับไปให้ CEO",
              ],
            },
            {
              t: "ol",
              start: 4,
              c: [
                "**CEO โหนด 3 (สรุปผลรอบสุดท้าย):** กิ่งซ้ายส่งมา 1, กิ่งขวาส่งมา 2 → คำนวณ `max(1, 2) + 1 = 3` → **คำตอบสุดท้ายคือ 3 ระดับ!**",
              ],
            },

            { t: "h3", c: "5. Clean Code (โค้ดฉบับสมบูรณ์)" },
            {
              t: "p",
              c: "ข้อนี้เขียนแบบ Pythonic สั้นๆ ได้ 4 บรรทัดจบเลยครับ:",
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
    def maxDepth(self, root: Optional[TreeNode]) -> int:

        # 1. Base Case: ไม่มีโหนดนี้ (ไม่มีพนักงาน)
        if not root:
            return 0

        # 2. ถามความลึกจากลูกน้องกิ่งซ้ายและกิ่งขวา
        left_depth = self.maxDepth(root.left)
        right_depth = self.maxDepth(root.right)

        # 3. เลือกกิ่งที่ลึกที่สุด แล้วบวก 1 (บวกชั้นที่ตัวเองยืนอยู่) ส่งกลับขึ้นไป
        return max(left_depth, right_depth) + 1`,
            },
            {
              t: "callout",
              title: "💡 Note",
              c: "สังเกตว่าเราใช้ `self.maxDepth` เรียกตัวเองได้เลย ไม่ต้องสร้างฟังก์ชันลูกซ้อนข้างในเหมือนข้อก่อนๆ เพราะเราไม่ได้พกตัวแปรอะไรติดตัวไปครับ เราต้องการแค่ผลลัพธ์ที่ส่งกลับขึ้นมา",
            },

            { t: "h3", c: "6. Complexity Analysis (วิเคราะห์ Big O)" },
            {
              t: "ul",
              c: [
                "**Time Complexity: O(N)** — โดยที่ N คือจำนวนโหนดทั้งหมด เราใช้ DFS ลงไปเคาะประตูถามความลึกจากทุกๆ โหนด โหนดละ 1 ครั้งถ้วน",
                "**Space Complexity: O(H)** — โดยที่ H คือความสูงของต้นไม้ (Height) เราใช้หน่วยความจำใน Call Stack เวลามันเรียกตัวเองซ้อนกันลงไป ถ้าต้นไม้สมดุลสวยงามจะเป็น O(log N) แต่ถ้าต้นไม้เอียงเป็นเส้นตรงข้างเดียว จะกินพื้นที่ O(N) ครับ",
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
              c: 'ข้อนี้ถือเป็นโจทย์วอร์มอัพชั้นดีในหมวด Tree DFS ที่จะมาทดสอบความเข้าใจเรื่อง "การแยกแยะประเภทของโหนด" และ "ทิศทางการเดิน" ครับ',
            },

            { t: "h3", c: "1. Problem Decoding (แปลโจทย์ภาษาคน)" },
            {
              t: "p",
              c: `เรามีแผนผังต้นไม้ (Binary Tree) อยู่ 2 ต้น (Tree1 และ Tree2)
โจทย์นิยามคำว่า "ใบไม้ (Leaf)" คือโหนดที่อยู่ปลายสุด ไม่มีลูกซ้ายและไม่มีลูกขวา`,
            },
            {
              t: "p",
              c: 'ภารกิจของเราคือ: เด็ดใบไม้จากต้นไม้ทั้ง 2 ต้น โดยต้องเด็ดเรียงจาก "ซ้ายไปขวา" แล้วเอาใบไม้ทั้งสองกองมาเรียงเทียบกัน ถ้าลำดับและตัวเลขของใบไม้เหมือนกันเป๊ะทุกประการ (Leaf Value Sequence) ให้ตอบ True ถ้าไม่เหมือนให้ตอบ False',
            },

            { t: "h3", c: "2. Mental Model (สร้างภาพจำ)" },
            {
              t: "p",
              c: 'ให้จินตนาการว่าคุณคือ "ชาวสวนเก็บผลไม้" ที่มีตะกร้า 2 ใบสำหรับต้นไม้ 2 ต้น',
            },
            {
              t: "ul",
              c: [
                "กฎของการเก็บคือ คุณต้องเดินวนรอบต้นไม้จากซ้ายไปขวาเสมอ",
                'ระหว่างที่เดิน ถ้าเจอ "กิ่งไม้" (โหนดที่มีลูก) ให้เดินผ่านไป ไม่ต้องสนใจ',
                'แต่ถ้าเจอ "ผลไม้ที่ปลายกิ่ง" (Leaf) เมื่อไหร่ ให้เด็ดใส่ตะกร้าทันที',
                "ทำแบบนี้กับต้นไม้ทั้ง 2 ต้น จนได้ผลไม้มา 2 ตะกร้า",
                "สุดท้าย เอาตะกร้า 2 ใบมาเทเทียบกันดูว่าผลไม้เรียงเหมือนกันเป๊ะไหม!",
              ],
            },
            {
              t: "p",
              c: "การเดินจากซ้ายไปขวาให้ลึกสุดกิ่งแบบนี้ ไม่มีอะไรเหมาะไปกว่าการใช้ DFS (Depth-First Search) แบบพุ่งลงซ้ายก่อนเสมอ (Pre-order / In-order แบบเน้นซ้าย) ครับ",
            },

            { t: "h3", c: "3. Logic-to-Code Mapping (ชำแหละแก่นโค้ด)" },
            {
              t: "p",
              c: "เราจะสร้างฟังก์ชันช่วยชื่อ get_leaves(node) ที่ทำหน้าที่เดินไปเก็บใบไม้แล้วส่งคืนกลับมาเป็น List (ตะกร้า) นี่คือ 3 ส่วนหลักที่คุณต้องอธิบายให้ได้:",
            },

            { t: "h3", c: "ส่วนที่ 1: การดักทางตัน (Base Case)" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 1",
              c: `if not node:
    return []`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: 'ต้นไม้อาจจะแหว่ง (มีลูกซ้ายแต่ไม่มีลูกขวา) ถ้าเราเดินไปเจอกิ่งที่ว่างเปล่า (Null) เราจะคืนค่า List ว่างๆ [] กลับไป เพื่อบอกว่า "ทางนี้ไม่มีใบไม้นะ"',
            },
            {
              t: "callout",
              title: "ถ้าไม่เขียน (What If)",
              warn: true,
              c: "โค้ดจะพัง (Error: NoneType object has no attribute 'left') ทันที เพราะเราพยายามไปขอลูกซ้าย/ขวา จากอากาศธาตุ!",
            },

            { t: "h3", c: "ส่วนที่ 2: เครื่องสแกนใบไม้ (จุดตัดคนผ่าน/ไม่ผ่าน)" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 2",
              c: `if not node.left and not node.right:
    return [node.val]`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: 'นี่คือ "นิยามของใบไม้" ครับ! ใบไม้ที่แท้จริงต้องไม่มีลูกซ้ายและไม่มีลูกขวา เมื่อเราเจอโหนดที่เข้าเงื่อนไขนี้ เราจะจับค่าของมันใส่ตะกร้า (List) แล้วส่งกลับไปทันทีโดยไม่ต้องเดินลึกลงไปอีก',
            },
            {
              t: "callout",
              title: "ถ้าเปลี่ยนเงื่อนไขเป็น if not node.left: เฉยๆ (What If)",
              warn: true,
              c: 'พังครับ! สมมติโหนดนั้นไม่มีลูกซ้าย แต่มียาวเหยียดทางลูกขวา มันจะถูกเหมารวมว่าเป็น "ใบไม้" ไปด้วย ทั้งๆ ที่มันเป็นแค่กิ่งไม้ที่หักครึ่ง การเช็คต้องเช็คทั้ง 2 ข้างเสมอ!',
            },

            { t: "h3", c: "ส่วนที่ 3: เดินซ้ายก่อนขวา (Left-to-Right Traversal)" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 3",
              c: `return get_leaves(node.left) + get_leaves(node.right)`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: "การเอาฟังก์ชันของลูกซ้าย + ลูกขวา ใน Python List คือการเอาตะกร้าฝั่งซ้ายมาต่อด้วยตะกร้าฝั่งขวา มันการันตีว่าลำดับของใบไม้จะถูกเรียงจากซ้ายไปขวา ตามที่โจทย์สั่งเป๊ะๆ",
            },
            {
              t: "callout",
              title: "ถ้าสลับเป็น get_leaves(node.right) + get_leaves(node.left) (What If)",
              warn: true,
              c: "คุณจะได้ตะกร้าที่เรียงลำดับจาก ขวาไปซ้าย (ขัดเกลาคำสั่งโจทย์) และเมื่อเอาตะกร้า 2 ต้นมาเทียบกัน มันอาจจะตอบผิดทันที",
            },

            { t: "h3", c: "4. Step-by-Step Walkthrough (จำลองการทำงาน)" },
            {
              t: "p",
              c: 'สมมติ Tree 1: [1, 2, 3] และ Tree 2: [1, null, 2, 3] (ระวัง! หน้าตาต้นไม้ไม่เหมือนกันนะ)',
            },
            {
              t: "code",
              lang: "text",
              c: `Tree 1:         Tree 2:
    1              1
   / \\              \\
  2   3              2
                    /
                   3`,
            },

            { t: "h3", c: "เก็บใบไม้ Tree 1" },
            {
              t: "ul",
              c: [
                "อยู่ที่ Root(1) มีลูกซ้ายและขวา ทะลวงลงไป",
                "ไปลูกซ้าย Root(2) เป็นใบไม้ (ไม่มีลูก) → ได้ [2] ส่งกลับขึ้นไป",
                "ไปลูกขวา Root(3) เป็นใบไม้ (ไม่มีลูก) → ได้ [3] ส่งกลับขึ้นไป",
                "เอาซ้ายบวกขวา → ตะกร้า Tree 1 คือ [2, 3]",
              ],
            },

            { t: "h3", c: "เก็บใบไม้ Tree 2" },
            {
              t: "ul",
              c: [
                "อยู่ที่ Root(1) ลูกซ้ายเป็น null ลูกขวาคือ 2",
                "ฝั่งซ้ายเดินตกขอบได้ []",
                "ไปลูกขวา Root(2) มีลูกซ้ายคือ 3 (ทะลวงต่อ)",
                "ไปที่ Root(3) เป็นใบไม้ → ได้ [3]",
                "ตะกร้า Tree 2 คือ [3]",
              ],
            },

            {
              t: "callout",
              title: "🧠 บทสรุป",
              c: '[2, 3] เทียบกับ [3] → ไม่เหมือนกัน ตอบ False! (เห็นไหมครับว่าหน้าตาตอนเป็น Array หลอกตาเราว่าน่าจะเหมือน แต่ใบไม้จริงๆ ไม่เหมือนกัน)',
            },

            { t: "h3", c: "5. Clean Code (โค้ดฉบับสมบูรณ์)" },
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

        # ฟังก์ชันเด็ดใบไม้ ใส่ตะกร้า (List)
        def get_leaves(node):
            # 1. ทางตัน ไม่มีใบไม้
            if not node:
                return []

            # 2. เครื่องสแกนใบไม้: ต้องไม่มีทั้งซ้ายและขวา
            if not node.left and not node.right:
                return [node.val]

            # 3. ประกอบตะกร้า: เอาฝั่งซ้ายมาต่อด้วยฝั่งขวา (บังคับซ้ายไปขวา)
            return get_leaves(node.left) + get_leaves(node.right)

        # เด็ดใบไม้ทั้ง 2 ต้น แล้วเอาตะกร้ามาเทียบกันว่าเหมือนกัน 100% หรือไม่
        return get_leaves(root1) == get_leaves(root2)`,
            },
            {
              t: "callout",
              title: "💡 Note",
              c: "โค้ดนี้คือเวอร์ชั่นที่อ่านง่ายและ Clean ที่สุดใน Python แต่ถ้าอยากให้เทพกว่านี้ในแง่ของ Space Complexity สามารถใช้ yield สร้างเป็น Generator ได้ แต่วิธี List แบบนี้ก็เพียงพอสำหรับ LeetCode 75 และสัมภาษณ์ทั่วไปแล้วครับ",
            },

            { t: "h3", c: "6. Complexity Analysis (วิเคราะห์ Big O)" },
            {
              t: "p",
              c: "ให้ T1 คือจำนวนโหนดของ Tree 1 และ T2 คือจำนวนโหนดของ Tree 2",
            },
            {
              t: "ul",
              c: [
                "Time Complexity: O(T1 + T2) — เราต้องเดินสำรวจทุกโหนดใน Tree 1 และ Tree 2 อย่างละ 1 รอบ เพื่อหาใบไม้ให้ครบ และเปรียบเทียบ List ในตอนท้าย (ซึ่งขนาด List ไม่เกินโหนดทั้งหมด)",
                "Space Complexity: O(T1 + T2) — เราใช้หน่วยความจำไปกับ 2 ส่วน: 1) พื้นที่สำหรับตะกร้า List ที่เก็บใบไม้ของทั้งสองต้น O(L1 + L2) โดย L คือจำนวนใบไม้ และ 2) พื้นที่ของ Call Stack (Recursion) ซึ่งลึกสุดเท่ากับความสูงของต้นไม้ ในกรณีที่แย่ที่สุด ภาพรวมของ Space จะโตไปตามจำนวนโหนดทั้งหมดของทั้งสองต้น",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "DFS เก็บ leaf ตามลำดับซ้าย→ขวา แล้วเทียบกัน — หัวใจคือแยกแยะว่า 'โหนดประเภทไหนเป็น leaf' (ไม่มีลูกทั้ง 2 ข้าง) ก่อน แล้วค่อยเดินต่อ แม่แบบนี้ใช้กับโจทย์ที่ต้องเปรียบเทียบลำดับ/โครงสร้างระหว่างต้นไม้ 2 ต้น",
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
              t: "h3",
              c: "1. Problem Decoding (แปลโจทย์ภาษาคน)",
            },
            {
              t: "p",
              c: `เรามีแผนผังต้นไม้ (Binary Tree) อยู่ 1 ต้น
โจทย์นิยามคำว่า "Good Node" (โหนดที่ดี) ว่า: ถ้าเราเดินจากราก (Root) ลงมาเรื่อยๆ จนถึงโหนดปัจจุบัน ต้องไม่มีโหนดไหนเลยในเส้นทางนี้ที่มีค่า "มากกว่า" ตัวมัน (พูดง่ายๆ คือ ตัวมันต้องมีค่า >= ตัวที่มากที่สุดที่เคยเจอมาตั้งแต่ต้นทาง)`,
            },
            {
              t: "p",
              c: "ภารกิจของเราคือ: นับว่าใน Tree ต้นนี้ มี Good Node อยู่ทั้งหมดกี่ตัว?",
            },

            { t: "h3", c: "2. Mental Model (สร้างภาพจำ)" },
            {
              t: "p",
              c: 'ให้จินตนาการว่า การเดินลงไปใน Tree คือ "การเดินป่าและจดสถิติต้นไม้ที่สูงที่สุด"',
            },
            {
              t: "ul",
              c: [
                'คุณเริ่มเดินจากรากเขา พร้อมกับถือ "สมุดจดสถิติความสูง (Max So Far)" ไว้ในมือ',
                "ทุกครั้งที่คุณเดินไปถึงต้นไม้ต้นใหม่ (โหนดปัจจุบัน) คุณจะมองดูความสูงของมัน แล้วเทียบกับตัวเลขสถิติในสมุด",
                'ถ้าต้นไม้นี้สูง "เท่ากับ หรือ มากกว่า" ตัวเลขในสมุด: แปลว่านี่คือ Good Node! คุณก็นับแต้มเพิ่มให้ตัวเอง 1 แต้ม',
                "ก่อนจะแบกสมุดเดินไปสำรวจทางแยกถัดไป: คุณต้องเช็คว่าต้นไม้นี้ทำลายสถิติเดิมไหม? ถ้าทำลายสถิติ คุณต้องอัปเดตตัวเลขในสมุด เป็นความสูงใหม่ เพื่อให้ลูกหลานที่อยู่ลึกลงไปรู้ว่าสถิติใหม่คือเท่าไหร่",
              ],
            },

            { t: "h3", c: "3. Logic-to-Code Mapping (ชำแหละแก่นโค้ด)" },
            {
              t: "p",
              c: 'เราจะสร้างฟังก์ชัน dfs(node, max_so_far) โดยต้องรับค่า 2 อย่างคือ "จุดที่ยืนอยู่" และ "สมุดจดสถิติ" นี่คือหัวใจ 3 ส่วนที่คุณต้องตอบให้ได้ว่าทำไมต้องเขียนแบบนี้:',
            },

            { t: "h3", c: "ส่วนที่ 1: การเช็คว่าเป็น Good Node ไหม?" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 1",
              c: `good = 1 if node.val >= max_so_far else 0`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: 'ตามนิยามของโจทย์ โหนดจะ "ดี" ก็ต่อเมื่อค่าของมันไม่น้อยกว่าค่าที่ใหญ่ที่สุดที่เคยผ่านมา เราจึงเทียบ node.val กับ max_so_far ถ้าผ่านเงื่อนไขก็รับไป 1 แต้ม',
            },
            {
              t: "callout",
              title: "ถ้าเขียนผิดเป็น > (What If)",
              warn: true,
              c: 'ถ้าคุณเผลอเขียนว่า node.val > max_so_far คุณจะสอบตกข้อนี้ทันที! เพราะโจทย์อนุญาตให้โหนดที่มีค่า "เท่ากัน" กับสถิติเดิมเป็น Good Node ได้ด้วย (เช่น เดินผ่าน 3 แล้วมาเจอ 3 อีกตัว ตัวหลังก็ยังนับว่าเป็น Good Node)',
            },

            { t: "h3", c: "ส่วนที่ 2: การอัปเดตสมุดจดสถิติ (จุดตัดคนผ่าน/ไม่ผ่าน)" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 2",
              c: `new_max = max(max_so_far, node.val)`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: 'ก่อนที่เราจะก้าวเดินต่อไปยังกิ่งซ้ายและขวา เราต้องพก "สถิติที่อัปเดตล่าสุด" ของเส้นทางนี้ติดตัวไปด้วย การใช้ฟังก์ชัน max() คือการบอกว่า "สถิติเก่า กับ ความสูงปัจจุบัน อันไหนสูงกว่ากัน? เอาอันนั้นแหละไปบอกลูกต่อ"',
            },
            {
              t: "callout",
              title: "ถ้าเขียนเป็น new_max = node.val (What If)",
              warn: true,
              c: 'พังพินาศครับ! ถ้าคุณส่งแค่ค่าของโหนดปัจจุบันไปให้ลูก โหนดลูกจะรู้แค่ความสูงของ "พ่อ" แต่มันจะลืมความสูงของ "ปู่ทวด" ไปจนหมดสิ้น! กฎที่ว่า "ต้องไม่มีโหนดไหนเลยตั้งแต่ Root ที่ใหญ่กว่า" จะถูกทำลายทันที เพราะคุณทำประวัติศาสตร์เส้นทางหายไปแล้ว',
            },

            { t: "h3", c: "ส่วนที่ 3: รวมแต้มแล้วส่งกลับ" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 3",
              c: `return good + dfs(node.left, new_max) + dfs(node.right, new_max)`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: "เราต้องการผลรวมแต้มของทั้งต้นไม้ ดังนั้นแต้มของจุดที่เรายืนอยู่ (good) ต้องถูกนำไปบวกทบกับแต้มที่กิ่งซ้ายหามาได้ และแต้มที่กิ่งขวาหามาได้ (โดยส่ง new_max ลงไปเป็นสมุดสถิติเล่มใหม่ให้พวกมัน)",
            },

            { t: "h3", c: "4. Step-by-Step Walkthrough (จำลองการทำงาน)" },
            {
              t: "p",
              c: "สมมติ Tree: [3, 1, 4, 3, null, 1, 5] และจุดเริ่มต้น: เรียกฟังก์ชัน dfs(root, 3) (เพราะ Root คือ 3)",
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

            { t: "h3", c: "1. อยู่ที่โหนด 3 (Root)" },
            {
              t: "ul",
              c: [
                "สมุดสถิติพกเลข 3 มา",
                "เช็ค 3 >= 3 ไหม? → ใช่! (+1 แต้ม)",
                "อัปเดตสมุด new_max = max(3, 3) = 3",
              ],
            },

            { t: "h3", c: "2. เดินลงซ้ายไป โหนด 1" },
            {
              t: "ul",
              c: [
                "สมุดสถิติพกเลข 3 มา",
                "เช็ค 1 >= 3 ไหม? → ไม่ใช่! (0 แต้ม)",
                "อัปเดตสมุด new_max = max(3, 1) = 3 (สถิติยังไม่ถูกทำลาย)",
              ],
            },

            { t: "h3", c: "3. เดินลงซ้ายสุดไป โหนด 3" },
            {
              t: "ul",
              c: [
                "สมุดสถิติพกเลข 3 มา",
                "เช็ค 3 >= 3 ไหม? → ใช่! (+1 แต้ม)",
                "สุดกิ่งซ้ายแล้ว ถอยหลังกลับ",
              ],
            },

            { t: "h3", c: "4. กลับมา Root เดินลงขวาไป โหนด 4" },
            {
              t: "ul",
              c: [
                "สมุดสถิติพกเลข 3 มา (รับมาจาก Root)",
                "เช็ค 4 >= 3 ไหม? → ใช่! (+1 แต้ม)",
                "อัปเดตสมุด new_max = max(3, 4) = 4 (ทำลายสถิติแล้ว! สมุดถูกเปลี่ยนเป็น 4)",
              ],
            },

            { t: "h3", c: "5. เดินขวาสุดไป โหนด 5" },
            {
              t: "ul",
              c: [
                "สมุดสถิติพกเลข 4 มา",
                "เช็ค 5 >= 4 ไหม? → ใช่! (+1 แต้ม)",
                "รวมแต้มทั้งหมดได้ 4 โหนด!",
              ],
            },

            { t: "h3", c: "5. Clean Code (โค้ดฉบับสมบูรณ์)" },
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

        # ฟังก์ชันเดินป่าและพกสมุดจดสถิติ (max_so_far)
        def dfs(node, max_so_far):
            # 1. เดินตกขอบ (ไม่มีโหนดแล้ว)
            if not node:
                return 0

            # 2. เช็คว่าเป็น Good Node ไหม (ถ้าใช่ได้ 1 แต้ม ถ้าไม่ใช่ได้ 0)
            good = 1 if node.val >= max_so_far else 0

            # 3. อัปเดตสถิติเพื่อส่งต่อให้ลูกๆ
            new_max = max(max_so_far, node.val)

            # 4. รวมแต้ม: ตัวเอง + ฝั่งซ้าย + ฝั่งขวา
            return good + dfs(node.left, new_max) + dfs(node.right, new_max)

        # เริ่มเดินที่ Root โดยให้สถิติแรกเริ่มคือค่าของ Root เอง
        return dfs(root, root.val)`,
            },

            { t: "h3", c: "6. Complexity Analysis (วิเคราะห์ Big O)" },
            {
              t: "ul",
              c: [
                "Time Complexity: O(N) — โดยที่ N คือจำนวนโหนดทั้งหมดของ Tree เพราะเราใช้กระบวนการ DFS เดินผ่านทุกโหนดเพียงแค่ครั้งเดียวเท่านั้น และแต่ละโหนดใช้เวลาคำนวณเปรียบเทียบแค่ O(1)",
                "Space Complexity: O(H) — โดยที่ H คือความสูง (Height) ของ Tree เพราะเราใช้พื้นที่ของ Call Stack ในการจำลองการเดินลึกลงไป (Recursive) ในกรณีที่แย่ที่สุด (Tree เอียงไปทางเดียวเป็นเส้นตรง) Call Stack จะลึกเท่ากับจำนวนโหนด ซึ่งจะทำให้ Space กลายเป็น O(N)",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "DFS top-down: ส่ง state (max_so_far) ลงไปตามเส้นทางแบบ immutable — แต่ละกิ่งได้สมุดจดสถิติของตัวเอง ไม่ต้อง backtrack เพราะสถิติถูกส่งต่อเป็นพารามิเตอร์ใหม่ทุกครั้งที่เดินลึก",
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
      th: "Pattern Recognition → Prefix Sum + Hash Map + Backtracking — นับช่วงที่ได้เป้า แล้วลบรอยเท้าตอนถอยขึ้น",
      en: "Pattern Recognition → Prefix Sum + Hash Map + Backtracking — count ranges that hit the target, then erase footprints when you climb back.",
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
              c: "ข้อนี้ถือเป็นข้อปราบเซียน — ต่อยอดจาก Path Sum ธรรมดาตรงที่เส้นทางเริ่มหรือจบตรงไหนก็ได้ เราจะไล่จาก Pattern Recognition → เครื่องมือ → พีชคณิตย้อนอดีต → ชำแหละโค้ดทีละบรรทัด → จำลองบนต้นไม้ → โค้ดส่งจริง",
            },

            { t: "h3", c: "1. Pattern Recognition (วิธีมองโจทย์ให้ออก)" },
            {
              t: "p",
              c: "เมื่อเจอโจทย์ที่มีลักษณะดังนี้:",
            },
            {
              t: "ol",
              c: [
                "ข้อมูลเป็น Binary Tree",
                "ต้องการหาจำนวนช่วงหรือเส้นทางที่ผลรวมเท่ากับเป้าหมาย (targetSum)",
                "กฎการเดิน: เริ่มตรงไหนก็ได้ · จบตรงไหนก็ได้ · ต้องวิ่งลงข้างล่างเสมอ (จากพ่อไปลูก/หลานเท่านั้น ห้ามเลี้ยวกลับขึ้นบน)",
              ],
            },
            {
              t: "callout",
              title: "💡 การเลือกเทคนิคแก้ปัญหา",
              c: "Brute Force (DFS ซ้อน DFS): ยืนที่ทุกโหนดแล้วไล่บวกย้อนขึ้นไป → Time O(N²) · ช้า\nPrefix Sum + Hash Map + Backtracking: จำยอดสะสมในอดีตขณะเดินลงไป → Time O(N) · เร็วที่สุด",
            },

            { t: "h3", c: "2. เครื่องมือที่เลือกใช้ & Hash Map (prefix_map)" },
            {
              t: "ul",
              c: [
                "DFS (Depth-First Search) — เดินท่องลงไปตามกิ่งก้านของต้นไม้",
                "Hash Map / Dictionary (prefix_map) — สมุดบันทึกย้อนอดีต เก็บบันทึกยอดสะสม ค้นหาได้ใน O(1)",
                "Backtracking — ลบรอยเท้าเมื่อถอยออกจากกิ่ง เพื่อไม่ให้ข้อมูลข้ามกิ่งมาปนกัน",
              ],
            },
            {
              t: "p",
              c: "ใน Python สร้าง Hash Map ด้วย Dictionary:",
            },
            {
              t: "code",
              lang: "python",
              label: "ตั้งต้นสมุดบันทึก",
              c: `prefix_map = {0: 1}`,
            },
            {
              t: "ul",
              c: [
                "Key = ยอดสะสม (Prefix Sum) นับตั้งแต่ Root ยาวมาถึงโหนดปัจจุบัน",
                "Value = จำนวนครั้งที่เคยเกิด Key นั้นขึ้น บนเส้นทาง DFS เดียวกัน (ไม่ใช่ทั้งต้นไม้)",
              ],
            },
            {
              t: "callout",
              title: "ทำไมต้องเริ่มด้วย {0: 1}?",
              c: "ก่อนแตะโหนดแรก ถือว่ามียอดสะสม 0 สแตนด์บายอยู่แล้ว 1 ครั้ง — สมมติ current_sum = 8 และ targetSum = 8 จะได้ old_sum = 8 − 8 = 0 เปิดสมุดเจอ Key 0 มีค่า 1 → พบ 1 เส้นทางที่เริ่มนับตั้งแต่ Root ยาวมาถึงจุดนี้พอดี ถ้าไม่มี {0: 1} เส้นทางที่เริ่มจาก Root จะถูกมองข้ามทันที",
            },

            { t: "h3", c: "3. Mental Model: พีชคณิตย้อนอดีต (Prefix Sum Magic)" },
            {
              t: "p",
              c: "แทนที่จะยืนที่โหนดปัจจุบันแล้วไล่บวกย้อนขึ้นไป ใช้อสมการนี้ช่วย:",
            },
            {
              t: "code",
              lang: "text",
              label: "สูตรหลัก",
              c: `old_sum = current_sum - targetSum

[ Root ] ──( old_sum )──> [ จุดเริ่มต้นช่วง ] ──( targetSum )──> [ โหนดปัจจุบัน ]`,
            },
            {
              t: "p",
              c: "ตัวอย่างบนเส้นตรง: [3, 4, 1, 7, -2] เมื่อ targetSum = 8",
            },
            {
              t: "table",
              head: ["ก้าว", "แต้ม", "current_sum", "old_sum = current − 8", "ผลลัพธ์", "prefix_map"],
              rows: [
                ["เริ่มต้น", "—", "0", "—", "—", "{0: 1}"],
                ["1", "3", "3", "3 − 8 = −5", "ไม่เจอ", "{0: 1, 3: 1}"],
                ["2", "4", "7", "7 − 8 = −1", "ไม่เจอ", "{0: 1, 3: 1, 7: 1}"],
                ["3", "1", "8", "8 − 8 = 0", "เจอ 1 ครั้ง! → ช่วง [3, 4, 1]", "{0: 1, 3: 1, 7: 1, 8: 1}"],
                ["4", "7", "15", "15 − 8 = 7", "เจอ 1 ครั้ง! → ช่วง [1, 7]", "{0: 1, 3: 1, 7: 1, 8: 1, 15: 1}"],
              ],
            },
            {
              t: "callout",
              title: "💡 ความมหัศจรรย์ของ Prefix Sum",
              c: "หาคำตอบได้โดยไม่ต้องเดินย้อนกลับไปนับใหม่ — แค่เปิดสมุดถามว่าเคยเจอ old_sum ไหม ถ้าเจอ นั่นคือจุดเริ่มต้นของช่วงที่รวมได้เป้าหมายพอดี",
            },

            { t: "h3", c: "4. ชำแหละไวยากรณ์และตรรกะโค้ด (Line-by-Line)" },

            { t: "h3", c: "ส่วนที่ 1: Base Case + สะสมยอด" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 1",
              c: `prefix_map = {0: 1}

def dfs(node, current_sum):
    if not node:
        return 0

    current_sum += node.val
    old_sum = current_sum - targetSum`,
            },
            {
              t: "ul",
              c: [
                "if not node: return 0 — ตกขอบต้นไม้ (เจอ None) คืนค่า 0 เส้นทาง",
                "current_sum += node.val — บวกค่าโหนดปัจจุบันเข้ายอดสะสม",
                "old_sum = current_sum − targetSum — หายอดในอดีตที่ทำให้ช่วงอดีต→ปัจจุบันรวมได้ targetSum พอดี",
              ],
            },

            { t: "h3", c: "ส่วนที่ 2: เปิดสมุดด้วย .get()" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 2",
              c: `paths = prefix_map.get(old_sum, 0)`,
            },
            {
              t: "callout",
              title: "ชำแหละ .get(key, default)",
              c: "prefix_map.get(old_sum, 0) แปลว่า: เปิดดูว่ามี Key ชื่อ old_sum ไหม? ถ้ามี คืน Value (จำนวนครั้งที่เคยเกิด) · ถ้าไม่มี คืน 0 โดยไม่เกิด KeyError\n\nตรรกะ: ถ้าเคยเกิด old_sum ขึ้น k ครั้ง แสดงว่ามียอดรวมเท่ากับ targetSum สิ้นสุดที่โหนดปัจจุบันจำนวน k เส้นทาง",
            },

            { t: "h3", c: "ส่วนที่ 3: จดบันทึกก่อนลงลูก" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 3",
              c: `prefix_map[current_sum] = prefix_map.get(current_sum, 0) + 1

paths += dfs(node.left, current_sum)
paths += dfs(node.right, current_sum)`,
            },
            {
              t: "ol",
              c: [
                "prefix_map.get(current_sum, 0) — เช็คว่ายอดนี้เคยจดกี่ครั้ง ยังไม่เคยได้ 0",
                "+ 1 — บวกเพิ่มเพราะเพิ่งเดินมาถึงโหนดนี้",
                "prefix_map[current_sum] = ... — บันทึกอัปเดตกลับลง Dictionary",
              ],
            },
            {
              t: "callout",
              title: "ทำไมต้องจดก่อนลงลูก?",
              c: "โหนดลูกและหลานที่ถูกเรียกด้วย DFS ในบรรทัดถัดไป จำเป็นต้องเปิดสมุดแล้วเห็นประวัติ current_sum ของโหนดบรรพบุรุษ — จดก่อนลุยต่อเสมอ",
            },
            {
              t: "callout",
              title: "ถ้าจดผิดจังหวะ",
              warn: true,
              c: "ถ้าสลับไปจดหลังเดินลงลูกเสร็จ ลูกและหลานจะเปิดสมุดไม่เจอประวัติยอดสะสมของเรา เส้นทางช่วงที่เริ่มจากโหนดนี้จะถูกนับพลาดทันที",
            },

            { t: "h3", c: "ส่วนที่ 4: Backtracking — ลบรอยเท้า" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 4",
              c: `prefix_map[current_sum] -= 1
return paths`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน?",
              c: "เมื่อสำรวจกิ่งนี้เสร็จและกำลังถอยกลับขึ้นไปหาโหนดพ่อ ต้องหักลบจำนวนครั้งของ current_sum ออก 1 — ลบรอยเท้าของกิ่งซ้ายก่อนเปลี่ยนไปเดินกิ่งขวา",
            },
            {
              t: "callout",
              title: "ถ้าไม่ลบรอยเท้า",
              warn: true,
              c: "กิ่งขวาจะมองเห็นประวัติยอดสะสมของกิ่งซ้าย แล้วนำมาคำนวณเส้นทางข้ามกิ่ง ซึ่งผิดกฎโจทย์ที่ต้องวิ่งลงข้างล่างเสมอ",
            },

            { t: "h3", c: "5. Step-by-Step Walkthrough (จำลองบนต้นไม้)" },
            {
              t: "p",
              c: "กำหนด targetSum = 8 และต้นไม้ย่อส่วน (โฟกัสกิ่งซ้ายเพื่อเห็น Backtracking ชัด):",
            },
            {
              t: "code",
              lang: "text",
              label: "ต้นไม้ย่อส่วน",
              c: `       10 (Root)
      /
     5
    /
   3`,
            },

            {
              t: "table",
              head: ["ขั้น", "โหนด / Action", "current_sum", "old_sum", "paths", "prefix_map"],
              rows: [
                ["เริ่ม", "—", "0", "—", "—", "{0: 1}"],
                ["①", "เข้า node 10", "10", "10 − 8 = 2 → ไม่เจอ", "0", "{0: 1, 10: 1}"],
                ["②", "เข้า node 5", "15", "15 − 8 = 7 → ไม่เจอ", "0", "{0: 1, 10: 1, 15: 1}"],
                ["③", "เข้า node 3", "18", "18 − 8 = 10 → เจอ 1!", "1 (path 5→3)", "{0: 1, 10: 1, 15: 1, 18: 1}"],
                ["④", "🚨 Backtrack จาก 3", "ลบ 18", "—", "—", "{0: 1, 10: 1, 15: 1, 18: 0}"],
              ],
            },
            {
              t: "callout",
              title: "อ่านแถว Backtracking",
              c: "เมื่อออกจาก node 3 เราลด prefix_map[18] ลง 1 เพื่อให้กิ่งอื่นไม่เห็นประวัติของกิ่งนี้ — นี่คือหัวใจของ Backtracking บนต้นไม้",
            },
            {
              t: "p",
              c: "บนตัวอย่างเต็มของ LeetCode ([10,5,-3,3,2,null,11,...], targetSum = 8) ไล่ DFS แบบเดียวกันครบทั้งต้นจะได้อีกสอง path คือ 5→2→1 และ −3→11 รวมทั้งหมด 3 เส้นทาง",
            },

            { t: "h3", c: "6. Clean Code (โค้ดฉบับสมบูรณ์สำหรับส่ง LeetCode)" },
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
        # 1. ประกาศ Dictionary สำหรับเก็บ Prefix Sum
        #    ใส่ {0: 1} ไว้เพื่อรองรับเส้นทางที่เริ่มนับตั้งแต่ Root
        prefix_map = {0: 1}

        def dfs(node, current_sum):
            # Base Case: ตกขอบต้นไม้
            if not node:
                return 0

            # 2. สะสมค่าโหนดปัจจุบัน
            current_sum += node.val

            # 3. คำนวณหาเป้าหมายในอดีต (Magic Formula)
            old_sum = current_sum - targetSum

            # 4. ดึงจำนวนครั้งที่เคยเกิด old_sum (ถ้าไม่เจอให้คืนค่า 0)
            paths = prefix_map.get(old_sum, 0)

            # 5. จดบันทึก current_sum ลงสมุด (+1 จากจำนวนเดิมที่มี)
            #    ต้องทำก่อนเรียก DFS ลงกิ่งลูก เพื่อให้กิ่งลูกมองเห็นประวัติ
            prefix_map[current_sum] = prefix_map.get(current_sum, 0) + 1

            # 6. ท่อง DFS ลงกิ่งซ้ายและกิ่งขวา
            paths += dfs(node.left, current_sum)
            paths += dfs(node.right, current_sum)

            # 7. Backtracking: ลบรอยเท้าเมื่อออกจากกิ่งนี้
            prefix_map[current_sum] -= 1

            return paths

        return dfs(root, 0)`,
            },

            { t: "h3", c: "7. Complexity Analysis (วิเคราะห์ประสิทธิภาพ)" },
            {
              t: "ul",
              c: [
                "Time Complexity: O(N) — ท่องผ่านแต่ละโหนดเพียง 1 ครั้ง และการอ่าน/เขียน Dictionary ใช้เวลาโดยเฉลี่ย O(1) ต่อการกระทำ",
                "Space Complexity: O(N) — ใช้หน่วยความจำใน Call Stack และ Hash Map สูงสุดตามจำนวนโหนด N",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "Prefix Sum + Hash Map นับช่วงที่รวมเท่าเป้าหมาย ใช้ได้ทั้งบนลิสต์และบนเส้นทางของต้นไม้ — กุญแจสำคัญในต้นไม้คือต้อง Backtrack เสมอเมื่อออกจากเส้นทาง",
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
              c: "A tough Path Sum upgrade — paths may start or end anywhere. We go Pattern Recognition → tools → reverse-algebra → line-by-line code → tree walkthrough → submit-ready code.",
            },

            { t: "h3", c: "1. Pattern Recognition" },
            {
              t: "p",
              c: "You have this flavor of problem when:",
            },
            {
              t: "ol",
              c: [
                "The input is a Binary Tree",
                "You need the count of ranges/paths whose values sum to targetSum",
                "Rules: start anywhere · end anywhere · always go downward (parent → child/grandchild only)",
              ],
            },
            {
              t: "callout",
              title: "💡 Choosing a technique",
              c: "Brute Force (DFS inside DFS): stand at every node and sum upward → Time O(N²)\nPrefix Sum + Hash Map + Backtracking: remember past cumulative sums while walking down → Time O(N)",
            },

            { t: "h3", c: "2. Tools & the Hash Map (prefix_map)" },
            {
              t: "ul",
              c: [
                "DFS — walk down the tree branches",
                "Hash Map / Dictionary (prefix_map) — a \"past totals notebook\" with O(1) lookups",
                "Backtracking — erase footprints when leaving a branch so sibling branches stay clean",
              ],
            },
            {
              t: "code",
              lang: "python",
              label: "Seed the notebook",
              c: `prefix_map = {0: 1}`,
            },
            {
              t: "ul",
              c: [
                "Key = prefix sum from Root down to the current node",
                "Value = how many times that key appeared on the current DFS path (not the whole tree)",
              ],
            },
            {
              t: "callout",
              title: "Why start with {0: 1}?",
              c: "Before touching any node, treat prefix sum 0 as already seen once. If current_sum = 8 and targetSum = 8, then old_sum = 0 — the notebook hits Key 0 with value 1, so we count the path that starts at Root. Without {0: 1}, Root-started paths are missed.",
            },

            { t: "h3", c: "3. Mental Model: reverse algebra (Prefix Sum Magic)" },
            {
              t: "code",
              lang: "text",
              label: "Core formula",
              c: `old_sum = current_sum - targetSum

[ Root ] ──( old_sum )──> [ range start ] ──( targetSum )──> [ current node ]`,
            },
            {
              t: "p",
              c: "Straight-line example: [3, 4, 1, 7, -2] with targetSum = 8",
            },
            {
              t: "table",
              head: ["Step", "Value", "current_sum", "old_sum = current − 8", "Result", "prefix_map"],
              rows: [
                ["Start", "—", "0", "—", "—", "{0: 1}"],
                ["1", "3", "3", "3 − 8 = −5", "miss", "{0: 1, 3: 1}"],
                ["2", "4", "7", "7 − 8 = −1", "miss", "{0: 1, 3: 1, 7: 1}"],
                ["3", "1", "8", "8 − 8 = 0", "hit! → range [3, 4, 1]", "{0: 1, 3: 1, 7: 1, 8: 1}"],
                ["4", "7", "15", "15 − 8 = 7", "hit! → range [1, 7]", "{0: 1, 3: 1, 7: 1, 8: 1, 15: 1}"],
              ],
            },

            { t: "h3", c: "4. Line-by-Line Breakdown" },

            { t: "h3", c: "Part 1: Base case + accumulate" },
            {
              t: "code",
              lang: "python",
              label: "Part 1",
              c: `prefix_map = {0: 1}

def dfs(node, current_sum):
    if not node:
        return 0

    current_sum += node.val
    old_sum = current_sum - targetSum`,
            },
            {
              t: "ul",
              c: [
                "if not node: return 0 — fell off the tree → 0 paths",
                "current_sum += node.val — add this node's value",
                "old_sum = current_sum − targetSum — the past total that makes the past→now stretch equal targetSum",
              ],
            },

            { t: "h3", c: "Part 2: Lookup with .get()" },
            {
              t: "code",
              lang: "python",
              label: "Part 2",
              c: `paths = prefix_map.get(old_sum, 0)`,
            },
            {
              t: "callout",
              title: ".get(key, default)",
              c: "Look up old_sum. If present, return its count; if missing, return 0 (no KeyError).\n\nIf old_sum appeared k times, there are k paths ending at this node that sum to targetSum.",
            },

            { t: "h3", c: "Part 3: Log before recursing" },
            {
              t: "code",
              lang: "python",
              label: "Part 3",
              c: `prefix_map[current_sum] = prefix_map.get(current_sum, 0) + 1

paths += dfs(node.left, current_sum)
paths += dfs(node.right, current_sum)`,
            },
            {
              t: "callout",
              title: "Why log before children?",
              c: "Children and grandchildren must see this ancestor's current_sum in the notebook. Always log first, then dive.",
            },
            {
              t: "callout",
              title: "Wrong timing",
              warn: true,
              c: "If you log after the child DFS returns, descendants never see your prefix — paths that start at this node get undercounted.",
            },

            { t: "h3", c: "Part 4: Backtracking" },
            {
              t: "code",
              lang: "python",
              label: "Part 4",
              c: `prefix_map[current_sum] -= 1
return paths`,
            },
            {
              t: "callout",
              title: "Why?",
              c: "Before climbing back to the parent to try another branch, decrement this current_sum so the left branch's history never leaks into the right.",
            },
            {
              t: "callout",
              title: "If you skip it",
              warn: true,
              c: "The right branch sees left-branch prefixes and invents cross-branch paths — breaking the downward-only rule.",
            },

            { t: "h3", c: "5. Step-by-Step Walkthrough" },
            {
              t: "p",
              c: "targetSum = 8 on a tiny left spine (so Backtracking is obvious):",
            },
            {
              t: "code",
              lang: "text",
              label: "Mini tree",
              c: `       10 (Root)
      /
     5
    /
   3`,
            },
            {
              t: "table",
              head: ["Step", "Node / Action", "current_sum", "old_sum", "paths", "prefix_map"],
              rows: [
                ["Start", "—", "0", "—", "—", "{0: 1}"],
                ["①", "enter 10", "10", "10 − 8 = 2 → miss", "0", "{0: 1, 10: 1}"],
                ["②", "enter 5", "15", "15 − 8 = 7 → miss", "0", "{0: 1, 10: 1, 15: 1}"],
                ["③", "enter 3", "18", "18 − 8 = 10 → hit!", "1 (path 5→3)", "{0: 1, 10: 1, 15: 1, 18: 1}"],
                ["④", "🚨 backtrack from 3", "drop 18", "—", "—", "{0: 1, 10: 1, 15: 1, 18: 0}"],
              ],
            },
            {
              t: "p",
              c: "On the full LeetCode example ([10,5,-3,3,2,null,11,...], targetSum = 8) the same DFS also finds 5→2→1 and −3→11 — three paths total.",
            },

            { t: "h3", c: "6. Clean Code" },
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
        # 1. Prefix-sum notebook; {0: 1} covers paths that start at Root
        prefix_map = {0: 1}

        def dfs(node, current_sum):
            if not node:
                return 0

            # 2. Accumulate
            current_sum += node.val

            # 3. Magic formula
            old_sum = current_sum - targetSum

            # 4. How many times have we seen old_sum on this path?
            paths = prefix_map.get(old_sum, 0)

            # 5. Log before children so they can see this prefix
            prefix_map[current_sum] = prefix_map.get(current_sum, 0) + 1

            # 6. Explore both branches
            paths += dfs(node.left, current_sum)
            paths += dfs(node.right, current_sum)

            # 7. Backtrack: erase footprint before climbing up
            prefix_map[current_sum] -= 1

            return paths

        return dfs(root, 0)`,
            },

            { t: "h3", c: "7. Complexity Analysis" },
            {
              t: "ul",
              c: [
                "Time Complexity: O(N) — visit each node once; Hash Map ops average O(1)",
                "Space Complexity: O(N) — recursion stack and Hash Map up to O(N)",
              ],
            },

            {
              t: "callout",
              title: "💡 Pattern summary",
              c: "Prefix sum + hash map counts ranges that hit a target — on arrays or tree paths. On trees, always backtrack when you leave a path.",
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
      th: "พกทิศ + ความยาวลงไป — สลับทิศก็ต่อความยาว ทิศซ้ำก็รีเซ็ตเป็น 1 · นับเป็นจำนวนก้าว (edge)",
      en: "Carry direction + length — continue when you flip, reset to 1 when you repeat. Length counts edges.",
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
              c: "ต่อยอดจาก Tree DFS — ข้อนี้พก state ลงไป 2 อย่าง: **ทิศทางก้าวที่แล้ว** กับ **ความยาวสะสม** มาชำแหละทีละชั้นครับ",
            },

            { t: "h3", c: "1. Pattern Recognition (วิธีมองโจทย์ให้ออก)" },
            {
              t: "p",
              c: "โจทย์กำหนด Binary Tree มาให้ และต้องการหา **ความยาวของเส้นทาง ZigZag ที่ยาวที่สุด**",
            },
            {
              t: "p",
              c: "กฎการเดินแบบ ZigZag:",
            },
            {
              t: "ol",
              c: [
                "สลับทิศทาง: เดินซ้าย → ขวา → ซ้าย → ขวา สลับกันไปเรื่อยๆ (หรือ ขวา → ซ้าย → ขวา → ซ้าย)",
                'ห้ามเดินทิศเดิมซ้ำ: ถ้าก้าวที่แล้วเดิน "ซ้าย" ก้าวนี้ต้องเดิน "ขวา" เท่านั้น ถ้าเดินซ้ายซ้ำ จะไม่นับต่อ แต่ต้อง "เริ่มนับ 1 ใหม่"',
                'การนับความยาว: นับจำนวน "เส้นเชื่อม (Edges)" ไม่ใช่นับจำนวนโหนด (เช่น เดิน 1 ก้าว ได้ความยาว = 1)',
              ],
            },
            {
              t: "code",
              lang: "text",
              label: "ZigZag vs ไม่ใช่ ZigZag",
              c: `      ZigZag Path (ยาว 3)            ไม่ใช่ ZigZag (ซ้ายซ้ำ)
          O                              O
         /                              /
        O                              O
         \\                            /
          O                          O  <-- เลี้ยวซ้ายซ้ำ!
         /
        O`,
            },

            { t: "h3", c: "2. เครื่องมือที่เลือกใช้ & การออกแบบสถานะ (State Design)" },
            {
              t: "ul",
              c: [
                "DFS (Depth-First Search): เดินท่องลงไปตามกิ่งก้านของต้นไม้",
                "State Passing (ส่งค่าสถานะผ่าน Parameter): ส่งข้อมูลติดตัวไปด้วยขณะเดินลงไป",
              ],
            },
            {
              t: "p",
              c: "ของที่พกติดตัวตอนเดินลง:",
            },
            {
              t: "ol",
              c: [
                "direction: บอกว่า ก้าวที่แล้วเดินมาทางไหน ('left' หรือ 'right')",
                "length: บอกว่า ตอนนี้สะสมความยาว ZigZag ได้กี่ก้าวแล้ว",
              ],
            },

            { t: "h3", c: "3. Mental Model: กฎการตัดสินใจ ณ โหนดปัจจุบัน" },
            {
              t: "p",
              c: "เมื่อเราอยู่ที่โหนดใดโหนดหนึ่ง แล้วกำลังจะก้าวไปทาง ซ้าย หรือ ขวา:",
            },
            {
              t: "code",
              lang: "text",
              c: `                  โหนดปัจจุบัน (เดินมาจากทิศ direction, ความยาวสะสม = length)
                               /            \\
                              /              \\
                        ไปทางซ้าย           ไปทางขวา`,
            },
            {
              t: "p",
              c: "กฎ 2 ข้อในการก้าวต่อ:",
            },
            {
              t: "ol",
              c: [
                'ถ้าก้าวไปใน "ทิศตรงข้าม" กับก้าวที่แล้ว (ได้ ZigZag!): ความยาวสะสมจะเพิ่มขึ้น → length + 1',
                'ถ้าก้าวไปใน "ทิศเดิม" ซ้ำกับก้าวที่แล้ว (ZigZag ขาด!): เส้นทางเดิมจบลงทันที แต่โหนดปัจจุบันสามารถ "เริ่มต้นนับ ZigZag เส้นใหม่" ก้าวไปทิศนี้เป็นก้าวแรกได้ → รีเซ็ตเป็น 1',
              ],
            },

            { t: "h3", c: "4. ชำแหละไวยากรณ์และตรรกะโค้ด (Line-by-Line Breakdown)" },
            {
              t: "code",
              lang: "python",
              label: "ตัวแปรเก็บคำตอบสูงสุด",
              c: `class Solution:
    def longestZigZag(self, root: Optional[TreeNode]) -> int:
        self.max_len = 0`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: 'self.max_len = 0 สร้างตัวแปรระดับ instance เอาไว้เก็บบันทึก "ความยาว ZigZag ที่ยาวที่สุด" ที่เคยเจอมาตลอดการเดินทั้งต้นไม้',
            },

            {
              t: "code",
              lang: "python",
              label: "เข้าโหนด → อัปเดตสถิติทันที",
              c: `def dfs(node, direction, length):
    if not node:
        return

    self.max_len = max(self.max_len, length)`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: "ทุกครั้งที่ก้าวเข้าสู่โหนดใหม่ ให้อัปเดตค่าความยาวที่ยาวที่สุดทันที เพราะก้าวถัดไปอาจรีเซ็ตความยาวได้",
            },
            {
              t: "callout",
              title: "ถ้าไม่เขียนไว้ตรงนี้ (What If)",
              warn: true,
              c: "ถ้าคุณรอไปอัปเดตตอนตกขอบต้นไม้ (Base case) คุณอาจจะพลาดความยาวสูงสุดที่ถูกทำลายไปแล้วระหว่างทาง และได้คำตอบที่ผิด",
            },

            {
              t: "code",
              lang: "python",
              label: "กรณีก้าวที่แล้วมาทางซ้าย",
              c: `if direction == 'left':
    # เดินซ้ายมา -> ก้าวไปขวาต่อ (ZigZag สำเร็จ: ความยาว + 1)
    dfs(node.right, 'right', length + 1)

    # เดินซ้ายมา -> แต่ดันเดินซ้ายซ้ำ (ZigZag ขาด: เริ่มนับ 1 ใหม่)
    dfs(node.left, 'left', 1)`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: "ก้าวไปทางขวา = สลับทิศ ได้ ZigZag → ส่ง 'right' และ length + 1 · ก้าวไปทางซ้าย = ทิศซ้ำ เส้นทางเดิมพัง แต่เริ่มเส้นใหม่ด้วยก้าวซ้ายก้าวแรก → ส่ง 'left' และรีเซ็ตเป็น 1",
            },
            {
              t: "callout",
              title: "ถ้าสลับเงื่อนไขผิด (What If)",
              warn: true,
              c: 'ถ้าเพิ่งมาทางซ้าย แล้วดันสั่งให้บวก 1 เมื่อไปทางซ้ายอีกรอบ อัลกอริทึมจะกลายเป็นการหา "เส้นตรงที่ยาวที่สุด" แทนที่จะเป็นเส้นซิกแซกทันที!',
            },
            {
              t: "callout",
              title: "ถ้ารีเซ็ตเป็น 0 (What If)",
              warn: true,
              c: "พลาดมหันต์ครับ! ถ้าคุณส่ง 0 ไป แปลว่าโหนดที่คุณเพิ่งเดินไปถึงนั้นไม่ถูกนับก้าว ทั้งๆ ที่คุณขยับจากโหนดพ่อมาหาโหนดลูก 1 ก้าวแล้ว ความยาวของเส้นทางใหม่จะหดสั้นไป 1 แต้มเสมอ",
            },

            {
              t: "code",
              lang: "python",
              label: "กรณีก้าวที่แล้วมาทางขวา",
              c: `elif direction == 'right':
    # เดินขวามา -> ก้าวไปซ้ายต่อ (ZigZag สำเร็จ: ความยาว + 1)
    dfs(node.left, 'left', length + 1)

    # เดินขวามา -> แต่ดันเดินขวาซ้ำ (ZigZag ขาด: เริ่มนับ 1 ใหม่)
    dfs(node.right, 'right', 1)`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: "สมมาตรกับกรณีซ้าย: ก้าวไปซ้าย = สลับทิศ → length + 1 · ก้าวไปขวาซ้ำ = รีเซ็ตเป็น 1",
            },

            {
              t: "code",
              lang: "python",
              label: "จุดเริ่มต้นจาก Root",
              c: `# จุดเริ่มต้นจาก Root: ลองก้าวซ้ายเป็นก้าวแรก และ ลองก้าวขวาเป็นก้าวแรก
dfs(root.left, 'left', 1)
dfs(root.right, 'right', 1)

return self.max_len`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: "ที่ Root เรายังไม่มีทิศทางก่อนหน้า จึงต้องแยกสั่งเดิน 2 สาย: ก้าวซ้ายเป็นก้าวแรก และ ก้าวขวาเป็นก้าวแรก",
            },

            { t: "h3", c: "5. Step-by-Step Walkthrough (จำลองการทำงาน)" },
            {
              t: "p",
              c: "กำหนดต้นไม้ตัวอย่าง:",
            },
            {
              t: "code",
              lang: "text",
              c: `        1 (Root)
         \\
          2
         / \\
        3   4
           /
          5`,
            },

            { t: "h3", c: "1. เริ่มต้นที่ Root (1)" },
            {
              t: "ul",
              c: [
                "ลองก้าวซ้าย root.left → เจอ None (จบ)",
                "ลองก้าวขวา root.right (Node 2) → dfs(Node 2, 'right', length=1) → max_len = 1",
              ],
            },

            { t: "h3", c: "2. ยืนที่ Node 2 (direction='right', length=1)" },
            {
              t: "ul",
              c: [
                "สลับทิศ (ไปซ้าย → Node 3): dfs(Node 3, 'left', length=1+1=2)",
                "ทิศซ้ำ (ไปขวา → Node 4): dfs(Node 4, 'right', length=1) (รีเซ็ตนับ 1)",
              ],
            },

            { t: "h3", c: "3. ยืนที่ Node 3 (direction='left', length=2)" },
            {
              t: "ul",
              c: [
                "max_len = 2",
                "ซ้าย/ขวา เป็น None ทั้งคู่ → ถอยกลับ",
              ],
            },

            { t: "h3", c: "4. ยืนที่ Node 4 (direction='right', length=1)" },
            {
              t: "ul",
              c: [
                "max_len ยังคงเป็น 2",
                "สลับทิศ (ไปซ้าย → Node 5): dfs(Node 5, 'left', length=1+1=2)",
                "ทิศซ้ำ (ไปขวา): None",
              ],
            },

            { t: "h3", c: "5. ยืนที่ Node 5 (direction='left', length=2)" },
            {
              t: "ul",
              c: [
                "max_len = 2",
                "ซ้าย/ขวา เป็น None ทั้งคู่ → จบการทำงาน",
              ],
            },

            {
              t: "callout",
              title: "🧠 บทสรุป",
              c: "คำตอบสุดท้าย: max_len = 2",
            },

            { t: "h3", c: "6. Clean Code (โค้ดฉบับสมบูรณ์สำหรับส่ง LeetCode)" },
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
        # ตัวแปรเก็บความยาว ZigZag ที่ยาวที่สุดที่เคยเจอ
        self.max_len = 0

        def dfs(node, direction, length):
            # Base Case: ถ้าเดินตกขอบต้นไม้
            if not node:
                return

            # อัปเดตค่าความยาวสูงสุด
            self.max_len = max(self.max_len, length)

            # ถ้าก้าวที่แล้วเดินมาทาง "ซ้าย"
            if direction == 'left':
                # 1. เดินสลับทิศไปทางขวา -> ZigZag สำเร็จ (ความยาว + 1)
                dfs(node.right, 'right', length + 1)
                # 2. เดินซ้ำทิศไปทางซ้าย -> ZigZag ขาด (เริ่มนับ 1 ใหม่)
                dfs(node.left, 'left', 1)

            # ถ้าก้าวที่แล้วเดินมาทาง "ขวา"
            elif direction == 'right':
                # 1. เดินสลับทิศไปทางซ้าย -> ZigZag สำเร็จ (ความยาว + 1)
                dfs(node.left, 'left', length + 1)
                # 2. เดินซ้ำทิศไปทางขวา -> ZigZag ขาด (เริ่มนับ 1 ใหม่)
                dfs(node.right, 'right', 1)

        # เริ่มต้นจาก Root: ทดลองเดินก้าวแรกไปทางซ้าย และ ทางขวา
        dfs(root.left, 'left', 1)
        dfs(root.right, 'right', 1)

        return self.max_len`,
            },

            { t: "h3", c: "7. Complexity Analysis (วิเคราะห์ประสิทธิภาพ)" },
            {
              t: "ul",
              c: [
                "**Time Complexity: O(N)** — เพราะ DFS จะท่องผ่านทุกโหนดในต้นไม้เพียง 1 ครั้ง",
                "**Space Complexity: O(N)** — ใช้หน่วยความจำใน Call Stack ตามความสูงของต้นไม้ ซึ่งกรณีแย่ที่สุด (ต้นไม้เรียงเป็นเส้นตรง) จะใช้พื้นที่ O(N)",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: 'โจทย์ข้อนี้คือจุดสูงสุดของการโชว์กึ๋นเรื่อง **"การส่งต่อสถานะ (State Passing)"** ใน Tree DFS ครับ — พกทิศ + ความยาว สลับทิศก็ต่อ สวนทางก็รีเซ็ตเป็น 1',
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
              c: "Build on Tree DFS — carry two pieces of state down the recursion: **previous direction** and **accumulated length**.",
            },

            { t: "h3", c: "1. Pattern Recognition" },
            {
              t: "ol",
              c: [
                "Alternate left → right → left → right (or the reverse)",
                "Same direction twice breaks the path — restart length at 1",
                "Length counts edges, not nodes",
              ],
            },

            { t: "h3", c: "2. State Design" },
            {
              t: "ul",
              c: [
                "direction: how we arrived ('left' or 'right')",
                "length: zigzag length so far",
              ],
            },

            { t: "h3", c: "3. Decision at each node" },
            {
              t: "ol",
              c: [
                "Opposite direction → continue with length + 1",
                "Same direction → reset to 1 (new path starts with this step)",
              ],
            },

            { t: "h3", c: "4. LeetCode-Ready Code" },
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
        self.max_len = 0

        def dfs(node, direction, length):
            if not node:
                return

            self.max_len = max(self.max_len, length)

            if direction == 'left':
                dfs(node.right, 'right', length + 1)
                dfs(node.left, 'left', 1)
            elif direction == 'right':
                dfs(node.left, 'left', length + 1)
                dfs(node.right, 'right', 1)

        dfs(root.left, 'left', 1)
        dfs(root.right, 'right', 1)

        return self.max_len`,
            },

            { t: "h3", c: "5. Dry Run" },
            {
              t: "code",
              lang: "text",
              c: `        1
         \\
          2
         / \\
        3   4
           /
          5`,
            },
            {
              t: "ul",
              c: [
                "Start right to 2 with length 1 → max_len = 1",
                "From 2: flip left to 3 with length 2; same-dir right to 4 with length 1",
                "At 3: max_len = 2; both children None",
                "From 4: flip left to 5 with length 2 → max_len stays 2",
                "Answer: 2",
              ],
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(N) — DFS over the tree",
                "Space O(N) — call stack in the worst case (skewed tree)",
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
              c: 'จัดให้ครับ! ข้อ **LeetCode 236: Lowest Common Ancestor of a Binary Tree** เป็นโจทย์ระดับ **"ตำนาน"** ของการสัมภาษณ์งานแทบทุกบริษัท เพราะข้อที่ผ่านๆ มาเราใช้วิธีพกข้อมูลลงไปหาลูก (Top-Down) แต่ข้อนี้เราจะใช้วิธี **"รอฟังรายงานจากลูกส่งกลับขึ้นมา (Bottom-Up)"** ครับ!\n\nมาชำแหละลอจิกด้วย **Concept-First Framework (Definitive Edition)** กันเลยครับ',
            },

            { t: "h3", c: "1. Problem Decoding (แปลโจทย์ภาษาคน)" },
            {
              t: "p",
              c: `เรามีแผนผังต้นไม้ และมีโหนดเป้าหมาย 2 ตัวคือ p และ q
โจทย์ต้องการให้เราหา **"Lowest Common Ancestor (LCA)"** หรือ "บรรพบุรุษร่วมที่อยู่ต่ำที่สุด (ใกล้ที่สุด)" ของทั้งสองโหนดนี้`,
            },
            {
              t: "p",
              c: "**กฎเหล็กของโจทย์:**",
            },
            {
              t: "ol",
              c: [
                "ต้นไม้นี้มีค่าโหนดไม่ซ้ำกันเลย และรับประกันว่ามี p กับ q อยู่ในต้นไม้นี้แน่นอน",
                "**โหนดสามารถเป็น LCA ของตัวเองได้!** (เช่น ถ้า p เป็นพ่อของ q คำตอบคือ p ทันที)",
              ],
            },

            { t: "h3", c: "2. Mental Model (สร้างภาพจำ)" },
            {
              t: "p",
              c: 'ให้จินตนาการว่าต้นไม้คือ **"แผนที่ภูเขา"** และคุณคือ **"หัวหน้าทีมค้นหาเด็กหลงทาง 2 คน (คือเด็กชื่อ P และเด็กชื่อ Q)"**',
            },
            {
              t: "ul",
              c: [
                "คุณยืนอยู่ที่ยอดเขา (Root) และคุณมีทีมงานอยู่ 2 ทีม (ทีมซ้าย และ ทีมขวา)",
                'คุณสั่งทีมงานว่า *"ลงไปหาเด็ก 2 คนนี้นะ ถ้าเจอใครคนใดคนหนึ่ง หรือเจอทั้งคู่ ให้รีบตะโกนรายงานกลับขึ้นมา!"*',
                "ทีมงานจะมุดลงไปเรื่อยๆ จนกว่าจะเจอเด็ก หรือจนกว่าจะสุดทาง (ตกขอบ)",
                "**ไฮไลต์สำคัญอยู่ที่ตอนสรุปผลรายงาน (Bottom-Up):**",
                'ถ้าทีมซ้ายรายงานว่า "เจอเด็ก!" และทีมขวาก็รายงานว่า "เจอเด็ก!" → แสดงว่า **"จุดที่คุณยืนอยู่นี่แหละ คือทางแยก (บรรพบุรุษร่วม) ที่ใกล้เด็กที่สุดแล้ว!"**',
                'ถ้ามีแค่ทีมใดทีมหนึ่งรายงานว่าเจอ → คุณแค่ทำหน้าที่เป็น "กระบอกเสียง" ส่งรายงานนั้นส่งต่อขึ้นไปให้เจ้านายของคุณรับรู้ต่อไป',
              ],
            },

            { t: "h3", c: "3. Logic-to-Code Mapping (ชำแหละแก่นโค้ด)" },
            {
              t: "p",
              c: "ข้อนี้ลอจิกสั้นมากแต่ลึกซึ้งสุดๆ เรามาดู 4 บรรทัดที่เป็นจุดเปลี่ยนชีวิตกันครับ:",
            },

            { t: "h3", c: "ส่วนที่ 1: การดักทางตัน (Base Case)" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 1",
              c: `if not root:
    return None`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: "ถ้าทีมค้นหาเดินทะลุใบไม้ลงไปจนตกขอบ (ไม่มีโหนดแล้ว) แปลว่าเส้นทางนี้ไม่มีเด็กหลงทางอยู่เลย จึงต้องรายงานกลับขึ้นไปว่า None (ไม่เจออะไรเลย)",
            },

            { t: "h3", c: "ส่วนที่ 2: เมื่อเจอเด็กหลงทาง! (จุดตัดคนผ่าน/ไม่ผ่าน จุดที่ 1)" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 2",
              c: `if root == p or root == q:
    return root`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: 'ถ้าโหนดที่คุณยืนอยู่คือ p หรือ q คุณไม่ต้องเสียเวลาเดินลงไปหาต่อแล้ว! ให้คุณ "รายงานตัวคุณเอง" กลับขึ้นไปให้เจ้านายรู้ทันทีว่า "เฮ้ย ฉันอยู่นี่!"',
            },
            {
              t: "callout",
              title: "ถ้าไม่เขียนดักตรงนี้ (What If)",
              warn: true,
              c: "ถ้า p เป็นพ่อของ q แล้วคุณไม่ดักเงื่อนไขนี้ คุณจะเดินทะลุ p ลงไปเรื่อยๆ ซึ่งจะทำให้คุณคำนวณพลาด เพราะโจทย์อนุญาตให้โหนดเป็นบรรพบุรุษของตัวเองได้ การรีบ return ทันทีที่เจอตัวใดตัวหนึ่งคือการตัดจบที่ฉลาดที่สุดครับ",
            },

            { t: "h3", c: "ส่วนที่ 3: จุดบรรจบ / ทางแยก (The Intersection) (จุดตัดคนผ่าน/ไม่ผ่าน จุดที่ 2)" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 3",
              c: `left_result = self.lowestCommonAncestor(root.left, p, q)
right_result = self.lowestCommonAncestor(root.right, p, q)

if left_result and right_result:
    return root`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: 'นี่คือหัวใจของ LCA เลยครับ! left_result มีค่า และ right_result ก็มีค่า แปลว่า "กิ่งซ้ายก็เจอเด็กคนนึง กิ่งขวาก็เจอเด็กอีกคนนึง" ตัวคุณเองที่ยืนอยู่ตรงกลางระหว่างสองกิ่งนี้ จึงคู่ควรกับมงกุฎ "บรรพบุรุษร่วมที่ใกล้ที่สุด (LCA)" อย่างปฏิเสธไม่ได้ คุณต้องรีบรายงาน "ตัวคุณเอง" ขึ้นไป!',
            },
            {
              t: "callout",
              title: "ถ้าไม่เขียนบรรทัดนี้ (What If)",
              warn: true,
              c: "เราจะไม่มีวันรู้เลยว่าเส้นทางของเด็กสองคนมันมาบรรจบกันที่โหนดไหน โค้ดจะไร้ความหมายทันที",
            },

            { t: "h3", c: "ส่วนที่ 4: การทำตัวเป็นกระบอกเสียง" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 4",
              c: `return left_result or right_result`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: 'ถ้าเด็กไม่ได้แยกกันอยู่คนละกิ่ง (เช่น ซ้ายไม่เจออะไรเลย แต่ขวาเจอ) โหนดปัจจุบันไม่ได้เป็นบรรพบุรุษร่วม หน้าที่ของคุณคือแค่ "ส่งผ่าน (Pass up)" ข้อมูลของฝั่งที่เจอขึ้นไปให้เจ้านายข้างบนรับช่วงต่อ (ใน Python A or B จะส่งค่าที่มีค่าไม่ใช่ None กลับไปครับ)',
            },

            { t: "h3", c: "4. Step-by-Step Walkthrough (จำลองการทำงาน)" },
            {
              t: "p",
              c: "สมมติ Tree: [3, 5, 1] โดยที่ Root = 3, Left = 5, Right = 1",
            },
            {
              t: "p",
              c: "**เป้าหมาย:** หา LCA ของ p = 5 และ q = 1",
            },

            { t: "h3", c: "1. ยืนที่โหนด 3 (Root)" },
            {
              t: "ul",
              c: [
                "เช็ค: 3 ไม่ใช่เป้าหมาย",
                "สั่งกิ่งซ้าย: ไปหามาสิ! (root.left = 5)",
                "สั่งกิ่งขวา: ไปหามาสิ! (root.right = 1)",
              ],
            },

            { t: "h3", c: "2. มุดมาที่โหนด 5 (ฝั่งซ้าย)" },
            {
              t: "ul",
              c: [
                "เช็ค if root == p: → **โป๊ะเชะ! ฉันคือ p (5)**",
                "**รีบส่งโหนด 5 กลับขึ้นไปบอกโหนด 3 ทันที** (ไม่ต้องลงไปหาลูกต่อแล้ว)",
              ],
            },

            { t: "h3", c: "3. มุดมาที่โหนด 1 (ฝั่งขวา)" },
            {
              t: "ul",
              c: [
                "เช็ค if root == q: → **โป๊ะเชะ! ฉันคือ q (1)**",
                "**รีบส่งโหนด 1 กลับขึ้นไปบอกโหนด 3 ทันที**",
              ],
            },

            { t: "h3", c: "4. กลับมาที่โหนด 3 (Root รอรับรายงาน)" },
            {
              t: "ul",
              c: [
                "left_result ได้โหนด 5 มา",
                "right_result ได้โหนด 1 มา",
                "เข้าเงื่อนไข if left_result and right_result: (ซ้ายก็มา ขวาก็มี)",
                "→ **ประกาศตัวโหนด 3 เป็นคำตอบสุดท้าย (LCA) ทันที!**",
              ],
            },

            { t: "h3", c: "5. Clean Code (โค้ดฉบับสมบูรณ์)" },
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
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        
        # 1. Base Case 1: เดินตกขอบ (ไม่เจออะไรเลย)
        if not root:
            return None
            
        # 2. Base Case 2: เจอเป้าหมาย (คนใดคนหนึ่ง)
        # รีบรายงานตัวกลับขึ้นไปทันที ไม่ต้องค้นหาลึกลงไปกว่านี้แล้ว
        if root == p or root == q:
            return root
            
        # 3. ส่งทีมลงไปค้นหาทางกิ่งซ้ายและกิ่งขวา
        left_result = self.lowestCommonAncestor(root.left, p, q)
        right_result = self.lowestCommonAncestor(root.right, p, q)
        
        # 4. จุดรวมญาติ (Intersection)
        # ถ้าซ้ายก็รายงานว่าเจอ ขวาก็รายงานว่าเจอ แสดงว่าโหนดนี้นี่แหละคือ LCA
        if left_result and right_result:
            return root
            
        # 5. กระบอกเสียง (Pass up)
        # ถ้าเจอแค่ฝั่งเดียว (อีกฝั่งเป็น None) ให้ส่งผ่านฝั่งที่เจอกลับขึ้นไปข้างบน
        return left_result or right_result`,
            },

            { t: "h3", c: "6. Complexity Analysis (วิเคราะห์ Big O)" },
            {
              t: "ul",
              c: [
                "**Time Complexity: O(N)** — ในกรณีที่แย่ที่สุด โหนด p และ q อาจจะอยู่ลึกสุดของต้นไม้ เราจึงต้องเดินสำรวจทุกโหนด โหนดละ 1 ครั้ง ทำให้ใช้เวลาแปรผันตรงกับจำนวนโหนดทั้งหมด",
                "**Space Complexity: O(H)** — ใช้หน่วยความจำไปกับ Call Stack ของ Recursive ฟังก์ชัน ซึ่งจะลึกที่สุดเท่ากับความสูง (Height) ของต้นไม้ กรณีแย่สุด (ต้นไม้เป็นเส้นตรง) คือ O(N) และกรณีดีสุด (ต้นไม้สมดุล) คือ O(log N) ครับ",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "postorder รายงานขึ้นไป: ให้ลูกสองฝั่งส่งสัญญาณว่าเจอเป้าหมายไหม แล้ว node ที่ได้สัญญาณจากทั้งสองฝั่งพร้อมกันคือจุดบรรจบ (LCA) — ใช้กับโจทย์หา ancestor / จุดตัดได้ทั่วไป",
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
