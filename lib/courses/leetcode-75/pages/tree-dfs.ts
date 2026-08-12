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
              c: 'ข้อนี้ถือเป็นข้อปราบเซียนข้อหนึ่ง — ต่อยอดจาก Path Sum ธรรมดาตรงที่ "เส้นทางจะเริ่มหรือจบตรงไหนก็ได้" เราจะใช้ DFS พร้อม **สมุดบันทึก Prefix Sum** และ **Backtracking**',
            },

            { t: "h3", c: "1. Problem Decoding (แปลโจทย์ภาษาคน)" },
            {
              t: "p",
              c: `เรามีแผนผังต้นไม้ (Binary Tree) ที่แต่ละโหนดมีตัวเลข และมีเป้าหมายคือตัวเลข targetSum
โจทย์ต้องการให้เราหาว่ามี "เส้นทาง (Path)" ทั้งหมดกี่เส้นที่ตัวเลขในโหนดบวกกันแล้วได้เท่ากับ targetSum พอดี`,
            },
            {
              t: "p",
              c: "**กฎเหล็ก 3 ข้อของการเดิน:**",
            },
            {
              t: "ol",
              c: [
                "**ต้องวิ่งลงข้างล่างเสมอ:** จากโหนดพ่อไปหาลูกหรือหลานเท่านั้น (ห้ามเลี้ยวกลับขึ้นบน)",
                "**เริ่มตรงไหนก็ได้:** ไม่จำเป็นต้องเริ่มที่รากสุด (Root)",
                "**จบตรงไหนก็ได้:** ไม่จำเป็นต้องจบที่ใบสุด (Leaf)",
              ],
            },

            { t: "h3", c: "2. Mental Model (สร้างภาพจำ & ความลับของสมุดบันทึก)" },
            {
              t: "p",
              c: 'ให้มองว่าคุณคือ "นักปีนเขาเก็บแต้ม" ที่เดินลงเขาไปเรื่อยๆ การจะมานั่งนับแต้มใหม่ทุกครั้งจากทุกๆ จุดเริ่มต้น มันเหนื่อยและเสียเวลา (Brute Force) เราจึงใช้เทคนิค **"สมุดบันทึกยอดสะสม (Prefix Sum Notebook)"** เข้ามาช่วย',
            },
            {
              t: "p",
              c: "**หลักการทำงานของสมุดบันทึก:** สมการหลักคือ: ยอดในอดีต = ยอดปัจจุบัน - เป้าหมาย",
            },
            {
              t: "p",
              c: `เพื่อให้เห็นภาพชัดที่สุด **สมมติว่าเราเดินเป็นเส้นตรงก่อน** (ยังไม่มีทางแยกซ้ายขวา)
สมมติแต้มตามรายทางคือ: [3, 4, 1, 7, -2] และเป้าหมาย targetSum = 8`,
            },
            {
              t: "table",
              head: ["ก้าว", "แต้มปัจจุบัน", "หาอดีต (ปัจจุบัน - 8)", "ผลลัพธ์", "สมุดบันทึก prefix_map"],
              rows: [
                ["จุดเริ่มต้น", "0", "—", "—", "{0: 1} (เลข 0 มี 1 ครั้ง)"],
                ["ก้าวที่ 1 (แต้ม 3)", "0 + 3 = 3", "3 - 8 = -5", "ไม่เจอ", "{0: 1, 3: 1}"],
                ["ก้าวที่ 2 (แต้ม 4)", "3 + 4 = 7", "7 - 8 = -1", "ไม่เจอ", "{0: 1, 3: 1, 7: 1}"],
                ["ก้าวที่ 3 (แต้ม 1)", "7 + 1 = 8", "8 - 8 = 0", "เจอ 1 ครั้ง! 🎉 → ช่วง [3, 4, 1] รวมได้ 8 พอดี", "{0: 1, 3: 1, 7: 1, 8: 1}"],
                ["ก้าวที่ 4 (แต้ม 7)", "8 + 7 = 15", "15 - 8 = 7", "เจอ 1 ครั้ง! 🎉 → ช่วง [1, 7] รวมได้ 8 พอดี", "{0: 1, 3: 1, 7: 1, 8: 1, 15: 1}"],
              ],
            },
            {
              t: "callout",
              title: "💡 ความมหัศจรรย์ของ Prefix Sum",
              c: "นี่คือความมหัศจรรย์ของ Prefix Sum! เราสามารถหาคำตอบได้โดยไม่ต้องเดินย้อนกลับไปนับใหม่เลย — แค่เปิดสมุดถามว่า 'เคยเจอ old_sum ไหม' ถ้าเจอ นั่นคือจุดเริ่มต้นของช่วงที่รวมได้เป้าหมายพอดี และทริกนี้ใช้บนต้นไม้ได้ด้วยการลบรอยเท้า (Backtrack) ตามหัวข้อถัดไป",
            },

            { t: "h3", c: "3. Logic-to-Code Mapping (ชำแหละแก่นโค้ดเมื่อมีทางแยก)" },
            {
              t: "p",
              c: 'พอเป็นต้นไม้ (Tree) มันจะมีทางแยกซ้าย-ขวา นี่คือหัวใจของโค้ด 4 ส่วนพร้อมเหตุผลว่า "ทำไมถึงเขียนแบบนี้?"',
            },

            { t: "h3", c: "ส่วนที่ 1: การตั้งค่าเริ่มต้นของสมุดบันทึก" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 1",
              c: `# สมุดบันทึก: เก็บ {ยอดสะสม: จำนวนครั้งที่เจอ}
# ต้องใส่ {0: 1} ไว้เสมอ เพื่อจำลอง "จุดเริ่มต้น" ก่อนก้าวแรก
prefix_map = {0: 1}

# อย่าลืม: เดินตกขอบ (Base Case) — โหนดนี้ไม่มีอยู่จริง → ไม่มีเส้นทาง
if not node:
    return 0`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: 'สมมติว่า targetSum = 8 และโหนดแรกสุด (Root) มีค่าเป็น 8 พอดี เมื่อเราเดินมาถึง Root ยอดรวมปัจจุบันคือ 8 สมการคือ old_sum = 8 - 8 = 0 เราจะหันไปค้นในสมุดว่า "มีเลข 0 ไหม?" การใส่ {0: 1} คือการจำลอง "จุดเริ่มต้นก่อนก้าวแรก" ที่เรามีแต้ม 0 ครับ',
            },
            {
              t: "callout",
              title: "ถ้าไม่เขียน (What If)",
              warn: true,
              c: "เส้นทางที่บวกกันได้ targetSum พอดีตั้งแต่ Root (เช่น [8], [3, 5]) จะถูกข้ามไปทั้งหมด เพราะหาเลข 0 ในสมุดไม่เจอ",
            },

            { t: "h3", c: "ส่วนที่ 2: สมการตามหาเส้นทาง (The Magic Formula)" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 2",
              c: `current_sum += node.val
old_sum = current_sum - targetSum
paths = prefix_map.get(old_sum, 0)`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: 'นี่คือการพลิกมุมมองแทนที่จะเอา targetSum ไล่ลบย้อนกลับขึ้นไป เราใช้พีชคณิตจากตัวอย่างด้านบน ถ้ายอดรวม = 15, เป้าหมาย = 8 แสดงว่า X + 8 = 15 ดังนั้นค่าในอดีต X = 15 - 8 = 7 เราแค่เช็คว่ามีเลข 7 ในสมุดไหม (ตรงกับก้าวที่ 4 ในตารางข้อ 2 พอดี)',
            },
            {
              t: "callout",
              title: "ถ้าไม่เขียน (What If)",
              warn: true,
              c: "พังแน่นอน! ถ้าไม่ใช้สมการนี้แล้วไปเขียนลูปไล่บวกย้อนกลับขึ้นไปหาพ่อ (Brute Force) เพื่อนับเส้นทางทั้งหมด Time Complexity จะพังจาก O(N) กลายเป็น O(N²) ทันที — สมการ magic formula + การเปิดสมุดดูคือเหตุผลที่ทำให้ข้อนี้รอด O(N)",
            },

            { t: "h3", c: "ส่วนที่ 3: จดบันทึกแล้วลุยต่อ" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 3",
              c: `prefix_map[current_sum] = prefix_map.get(current_sum, 0) + 1
paths += dfs(node.left, current_sum)
paths += dfs(node.right, current_sum)`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: 'เราต้องเอาผลรวมปัจจุบันจดลงสมุด เพื่อให้ "ลูกๆ และหลานๆ" ที่กำลังจะเดินไปสำรวจกิ่งนั้นๆ ต่อ สามารถมองเห็นยอดสะสมนี้ได้',
            },
            {
              t: "callout",
              title: "ถ้าจดผิดจังหวะ (What If)",
              warn: true,
              c: "ถ้าสลับไปจดบันทึก 'หลัง' เดินลงลูกเสร็จ ลูกและหลานจะเปิดสมุดไม่เจอประวัติยอดสะสมของเรา เส้นทางช่วงที่เริ่มต้นจากโหนดนี้ (เช่น 5→3, -3→11) จะถูกนับพลาดทันที — จังหวะที่ถูกต้องคือ จดก่อนลุยต่อเสมอ",
            },

            { t: "h3", c: "ส่วนที่ 4: การลบรอยเท้า (Backtracking) — จุดตัดคนผ่าน/ไม่ผ่าน" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 4",
              c: `prefix_map[current_sum] -= 1`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: 'บรรทัดนี้จะทำงานเมื่อเราสำรวจสุดทางและ "กำลังจะถอยหลังกลับขึ้นไปหาพ่อ" เพื่อเปลี่ยนไปเดินกิ่งอื่น เราต้องหักลบยอดสะสมของกิ่งนี้ออกจากสมุด เพื่อบอกว่า "ฉันเดินออกจากเส้นทางนี้แล้วนะ"',
            },
            {
              t: "callout",
              title: "ถ้าไม่เขียน (What If)",
              warn: true,
              c: 'พังพินาศครับ! กิ่งทางซ้ายกับกิ่งทางขวาคือ "เส้นทางคู่ขนาน" ถ้าคุณไม่ลบรอยเท้าของกิ่งซ้ายทิ้ง พอกระโดดไปกิ่งขวา กิ่งขวาจะเห็นสมุดที่จดข้อมูลของกิ่งซ้ายไว้ และเอามาคำนวณเชื่อมกัน ซึ่งแหกกฎโจทย์ที่ว่า "ต้องวิ่งลงข้างล่างเสมอ" ครับ',
            },

            { t: "h3", c: "4. Step-by-Step Walkthrough (จำลองการทำงานบนต้นไม้)" },
            {
              t: "p",
              c: "สมมติ Tree: [10, 5, -3, 3, 2, null, 11] และ targetSum = 8 — ต้นไม้นี้คือตัวอย่างจริงของ LeetCode ที่ตัดกิ่งย่อยออก (ต้นเต็มตอบ 3 เส้น เพราะมีโหนด 1 ต่อท้ายโหนด 2) เพื่อให้เราไล่ดูครบทุกขั้นจนเห็นภาพเต็ม",
            },
            {
              t: "code",
              lang: "text",
              label: "ต้นไม้ตัวอย่าง",
              c: `      10
     /  \\
    5   -3
   / \\    \\
  3   2    11`,
            },
            {
              t: "p",
              c: "**จุดเริ่มต้น:** สมุดบันทึก prefix_map = {0: 1} — ไล่ดูทุกขั้นตอนในตารางนี้ (สัญลักษณ์ 🎉 = เจอเส้นทาง, 🚨 = ถอยหลังลบรอยเท้า)",
            },

            {
              t: "table",
              head: ["ขั้น", "โหนด / การกระทำ", "current_sum", "old_sum = current_sum - 8", "เปิดสมุดเจอไหม?", "สมุดหลังขั้นตอน"],
              rows: [
                ["①", "ลงซ้าย: โหนด 10 (Root)", "0 + 10 = 10", "10 - 8 = 2", "ไม่เจอ → 0 เส้น", "{0: 1, 10: 1}"],
                ["②", "ลงซ้าย: โหนด 5", "10 + 5 = 15", "15 - 8 = 7", "ไม่เจอ → 0 เส้น", "{0: 1, 10: 1, 15: 1}"],
                ["③", "ลงซ้าย: โหนด 3", "15 + 3 = 18", "18 - 8 = 10", "🎉 เจอ 10 → +1 เส้น (5→3)", "{0: 1, 10: 1, 15: 1, 18: 1}"],
                ["④", "🚨 ถอยหลัง: ลบรอยเท้าโหนด 3", "ลบ 18", "—", "—", "{0: 1, 10: 1, 15: 1}"],
                ["⑤", "ลงขวา: โหนด 2", "15 + 2 = 17", "17 - 8 = 9", "ไม่เจอ → 0 เส้น", "{0: 1, 10: 1, 15: 1, 17: 1}"],
                ["⑥", "🚨 ถอยหลัง: ลบรอยเท้าโหนด 2 → โหนด 5", "ลบ 17 → 15", "—", "—", "{0: 1, 10: 1}"],
                ["⑦", "ลงขวา: โหนด -3", "10 + (-3) = 7", "7 - 8 = -1", "ไม่เจอ → 0 เส้น", "{0: 1, 10: 1, 7: 1}"],
                ["⑧", "ลงขวา: โหนด 11", "7 + 11 = 18", "18 - 8 = 10", "🎉 เจอ 10 → +1 เส้น (-3→11)", "{0: 1, 10: 1, 7: 1, 18: 1}"],
                ["⑨", "🚨 ถอยหลัง: ลบรอยเท้า 11 → -3 → 10", "ลบ 18 → 7 → 0", "—", "—", "{0: 1}"],
              ],
            },
            {
              t: "callout",
              title: "🧠 สรุปการไล่รอบต้นไม้",
              c: "รวมเส้นทางที่เจอ = 1 (5→3) + 1 (-3→11) = **2 เส้น → คำตอบของต้นไม้นี้คือ 2** (ถ้าเป็นต้นเต็มของ LeetCode จะได้ 3 เพราะมีโหนด 1 ต่อท้ายโหนด 2 เพิ่มอีกเส้นคือ 5→2→1) — สังเกตว่าทั้งสองเส้นทางเปิดสมุดเจอเลข 10 ตัวเดียวกัน (รอยเท้าจาก Root) แต่คนละช่วงบนเส้นทาง = คนละเส้นทาง! และทุกครั้งที่ถอยหลัง สมุดต้องกลับมาสะอาดเสมอ เพื่อไม่ให้กิ่งคู่ขนานเห็นรอยเท้าของกัน",
            },
            {
              t: "p",
              c: "**วิธีอ่านแถว 🚨:** ช่อง current_sum ในแถวถอยหลังคือเลขที่กำลังถูกลบออกจากสมุด (เช่น ลบ 17 → 15 = ลบรอยเท้าโหนด 2 แล้วลบรอยเท้าโหนด 5) — ตัวแปร current_sum เป็นตัวแปรท้องถิ่นของแต่ละ call ที่ถูกทิ้งไปเองตอนกลับ ส่วนที่ถูกแก้จริงคือสมุดบันทึก prefix_map",
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
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        # Prefix-map = "สมุดบันทึกยอดสะสม" บนเส้นทางจาก Root → ปัจจุบัน (เส้นทางเดียวกันเท่านั้น)
        # key   = prefix_sum
        # value = จำนวนครั้งที่ prefix_sum นี้เคยเกิดบนเส้นทางเดียวกันนั้น
        #
        # The Why: ใส่ {0: 1} เพื่อรองรับกรณีที่เส้นทางเริ่มจาก Root แล้วรวมได้พอดี
        # (ถ้า current_sum == targetSum จะได้ old_sum = 0 และ prefix_map[0] = 1 ทำให้เรานับ path ถูก)
        prefix_map = {0: 1}

        def dfs(node, current_sum):
            # Base Case: เดินตกขอบ => ไม่มี path เพิ่ม
            if not node:
                return 0

            # 1) อัปเดตยอดสะสมปัจจุบัน
            current_sum += node.val

            # 2) Magic Formula:
            # เราต้องหายอดในอดีต (old_sum) ที่ทำให้:
            # old_sum → current_sum  รวมกันได้ targetSum
            # current_sum - old_sum = targetSum
            # => old_sum = current_sum - targetSum
            old_sum = current_sum - targetSum

            # 3) ถ้า old_sum เคยเกิด k ครั้งบนเส้นทางนี้ => มี path ที่จบที่ node นี้เท่ากับ k
            paths = prefix_map.get(old_sum, 0)

            # 4) Log ลงสมุดก่อนลงลูก (สำคัญ!)
            # The Why: ให้ลูกๆ เห็น prefix_map ของ "เส้นทางปัจจุบัน" ระหว่าง DFS
            prefix_map[current_sum] = prefix_map.get(current_sum, 0) + 1

            # 5) รวมผลจากซ้ายและขวา
            paths += dfs(node.left, current_sum)
            paths += dfs(node.right, current_sum)

            # 6) Backtracking: ลบยอดสะสมนี้ทิ้งเมื่อกำลังจะถอยกลับขึ้นไป
            # The Why: กันไม่ให้กิ่งขวาเห็น prefix_sum ของกิ่งซ้าย (ซึ่งจะนับ path ข้ามกิ่งผิดโจทย์)
            prefix_map[current_sum] -= 1

            return paths

        return dfs(root, 0)`,
            },

            { t: "h3", c: "6. Complexity Analysis (วิเคราะห์ Big O)" },
            {
              t: "ul",
              c: [
                "**Time Complexity: O(N)** — เราเยี่ยมชมแต่ละโหนดเพียงแค่ครั้งเดียว (DFS) และการอ่าน/เขียนข้อมูลใน Hash Map (Dictionary) ใช้เวลาโดยเฉลี่ยคือ O(1) ต่อการกระทำหนึ่งครั้ง ดังนั้นเวลาจะแปรผันตรงกับจำนวนโหนด",
                "**Space Complexity: O(N)** — ใช้หน่วยความจำสูงสุด 2 ส่วน คือ: 1) **Call Stack:** ลึกสุดเท่ากับความสูงของต้นไม้ (กรณีแย่สุดที่ต้นไม้เรียงเป็นเส้นตรงคือ O(N)) และ 2) **Hash Map:** เก็บยอดสะสมต่างๆ (กรณีแย่สุดที่ยอดไม่ซ้ำกันเลยคือ O(N)) รวมแล้วจึงเป็น O(N)",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "Prefix Sum + Hash Map นับช่วงที่รวมเท่าเป้าหมาย ใช้ได้ทั้งบนลิสต์และบนเส้นทางของต้นไม้ — **กุญแจสำคัญในต้นไม้คือต้อง Backtrack เสมอเมื่อออกจากเส้นทาง**",
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
              c: "Continue the DFS: node 2 gives 15 + 2 = 17 (look up 9 → miss, then backtrack to erase 17 and 15), the right branch −3 gives 10 − 3 = 7 (look up −1 → miss), and node 11 gives 7 + 11 = 18 → look up 10 → hit! That's the second path (−3→11). Total for this trimmed tree: 2 — the full LeetCode example adds node 1 under node 2, giving the third path 5→2→1.",
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
        # Prefix-map = "notebook of prefix sums" on the current root → node path.
        # key   = prefix_sum
        # value = how many times we've seen that prefix_sum on THIS exact path.
        #
        # The Why: initialize with {0: 1}
        # If current_sum == targetSum, then old_sum = 0 and we count the path starting from Root.
        prefix_map = {0: 1}

        def dfs(node, current_sum):
            # Base Case: no node => no additional paths
            if not node:
                return 0

            # 1) Update the current prefix sum
            current_sum += node.val

            # 2) Magic Formula:
            # old_sum -> current_sum must add up to targetSum:
            # current_sum - old_sum = targetSum
            # => old_sum = current_sum - targetSum
            old_sum = current_sum - targetSum

            # 3) If old_sum appeared k times on this path,
            # then there are k valid paths ending at this node.
            paths = prefix_map.get(old_sum, 0)

            # 4) Log before going down
            # The Why: children need to see the prefix sums of the current path.
            prefix_map[current_sum] = prefix_map.get(current_sum, 0) + 1

            # 5) Explore both children and accumulate
            paths += dfs(node.left, current_sum)
            paths += dfs(node.right, current_sum)

            # 6) Backtracking: erase footprint when climbing up
            # The Why: prevent sibling branches from polluting each other (invalid cross-branch paths).
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
              c: 'จัดให้อีกหนึ่งข้อระดับ Masterpiece ครับ! ข้อ **LeetCode 1372: Longest ZigZag Path in a Binary Tree** เป็นโจทย์ที่ทดสอบการทำ **State Management** ได้ยอดเยี่ยมมาก เพราะคราวนี้เราไม่ได้พกแค่ "ตัวเลขสะสม" ลงไป แต่เราต้องพก **"ทิศทาง (Direction)"** ลงไปด้วย! มาชำแหละลอจิกด้วย **Concept-First Framework (Definitive Edition)** กันเลยครับ!',
            },

            { t: "h3", c: "1. Problem Decoding (แปลโจทย์ภาษาคน)" },
            {
              t: "p",
              c: `เรามีแผนผังต้นไม้ (Binary Tree)
โจทย์ต้องการให้เราหาความยาวของ **"เส้นทางซิกแซก (ZigZag Path)"** ที่ยาวที่สุดในต้นไม้นี้`,
            },
            {
              t: "p",
              c: "**ซิกแซกคืออะไร?:** การสลับทิศทางซ้าย-ขวาไปเรื่อยๆ (ซ้าย → ขวา → ซ้าย → ขวา หรือกลับกัน)",
            },
            {
              t: "p",
              c: "**กฎการนับ:**",
            },
            {
              t: "ol",
              c: [
                "ความยาวนับตาม **จำนวนก้าว (Edges)** ไม่ใช่จำนวนโหนด (ก้าว 1 ครั้ง = ความยาว 1)",
                "เริ่มก้าวแรกจากโหนดไหนก็ได้ในต้นไม้",
                "ถ้าเผลอก้าวไปทิศเดิมซ้ำ (เช่น ซ้าย แล้ว ซ้ายอีก) ถือว่า **คอมโบหลุด (Combo Broken)** ต้องเริ่มนับหนึ่งใหม่!",
              ],
            },

            { t: "h3", c: "2. Mental Model (สร้างภาพจำ)" },
            {
              t: "p",
              c: 'ให้จินตนาการว่าคุณคือ **"นักสกีผาดโผน"** ที่กำลังสกีลงภูเขา (Tree)',
            },
            {
              t: "p",
              c: 'กติกาการเก็บแต้มคอมโบคือ คุณต้อง **"สลับฝั่งเลี้ยว"** เลี้ยวซ้ายที เลี้ยวขวาที แต้มคอมโบถึงจะเพิ่มขึ้น',
            },
            {
              t: "ul",
              c: [
                "สมมติว่าเมื่อกี้คุณเพิ่ง **เลี้ยวซ้าย** มา:",
                "ถ้าสถานีต่อไปคุณ **เลี้ยวขวา**: สวยงาม! คอมโบต่อเนื่อง (แต้มเดิม + 1)",
                'แต่ถ้าสถานีต่อไปคุณ **เลี้ยวซ้ายอีกรอบ**: ผิดกติกา! คอมโบเก่าขาดสะบั้นทันที แต่ไม่ได้แปลว่าแต้มเป็น 0 นะ เพราะการเลี้ยวซ้ายรอบใหม่นี้ ถือเป็นการ **"เริ่มนับก้าวที่ 1 ของคอมโบชุดใหม่"**',
              ],
            },
            {
              t: "p",
              c: 'ระหว่างที่คุณไถลลงเขาไปเรื่อยๆ คุณแค่ต้องตะโกนบอกกรรมการว่า *"แต้มคอมโบสูงสุดที่ฉันเคยทำได้ในรอบนี้คือเท่าไหร่!"*',
            },

            { t: "h3", c: "3. Logic-to-Code Mapping (ชำแหละแก่นโค้ด)" },
            {
              t: "p",
              c: 'เราจะสร้างฟังก์ชัน dfs(node, direction, steps) โดยต้องพกของ 2 อย่างคือ **"ทิศทางที่เพิ่งเลี้ยวมา"** และ **"แต้มคอมโบปัจจุบัน"**',
            },

            { t: "h3", c: "ส่วนที่ 1: การอัปเดตสถิติสูงสุด (The High Score)" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 1",
              c: `self.max_step = max(self.max_step, steps)`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: "ทุกครั้งที่เราก้าวมาถึงโหนดใหม่ เราต้องรีบจดสถิติคอมโบปัจจุบันเทียบกับสถิติสูงสุดที่เคยทำได้ (Global Maximum) ทันที เพราะบางทีคอมโบอาจจะขาดสะบั้นในก้าวถัดไป เราจึงต้อง Save ค่าที่ดีที่สุดไว้เสมอ",
            },
            {
              t: "callout",
              title: "ถ้าไม่เขียนไว้ตรงนี้ (What If)",
              warn: true,
              c: "ถ้าคุณรอไปอัปเดตตอนตกขอบต้นไม้ (Base case) คุณอาจจะพลาดคอมโบสูงสุดที่ถูกทำลายไปแล้วระหว่างทาง และได้คำตอบที่ผิด",
            },

            { t: "h3", c: "ส่วนที่ 2: คอมโบต่อเนื่อง (Combo Continued) (จุดตัดคนผ่าน/ไม่ผ่าน)" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 2",
              c: `if direction == "left":
    dfs(node.right, "right", steps + 1)`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: "นี่คือการทำตามกติกาซิกแซก ถ้าตาที่แล้วคุณมาทาง left ตานี้คุณต้องบังคับเลี้ยว right และถ้าเลี้ยวถูก คอมโบจะบวกเพิ่มขึ้น 1 (steps + 1)",
            },
            {
              t: "callout",
              title: "ถ้าสลับเงื่อนไขผิด (What If)",
              warn: true,
              c: 'ถ้าเพิ่งมาทางซ้าย แล้วดันสั่งให้คอมโบบวก 1 เมื่อไปทางซ้ายอีกรอบ อัลกอริทึมจะกลายเป็นการหา "เส้นตรงที่ยาวที่สุด" แทนที่จะเป็นเส้นซิกแซกทันที!',
            },

            { t: "h3", c: "ส่วนที่ 3: คอมโบหลุด (Combo Broken & Reset)" },
            {
              t: "code",
              lang: "python",
              label: "ส่วนที่ 3",
              c: `if direction == "left":
    dfs(node.left, "left", 1) # รีเซ็ตเป็น 1 ไม่ใช่ 0!`,
            },
            {
              t: "callout",
              title: "ทำไมต้องเขียน (The Why)",
              c: "ถ้าตาที่แล้วมาทาง left แล้วดันฝืนก้าวไปทาง left อีก คอมโบเก่าถือว่าจบลง! แต่การก้าวไปทาง left ครั้งใหม่นี้ มันคือ **ก้าวแรกของเส้นทางใหม่** เราจึงส่งค่าเป็น 1",
            },
            {
              t: "callout",
              title: "ถ้าส่งเป็น 0 (What If)",
              warn: true,
              c: "พลาดมหันต์ครับ! ถ้าคุณส่ง 0 ไป แปลว่าโหนดที่คุณเพิ่งเดินไปถึงนั้นไม่ถูกนับก้าว ทั้งๆ ที่คุณขยับจากโหนดพ่อมาหาโหนดลูก 1 ก้าวแล้ว ความยาวของเส้นทางใหม่จะหดสั้นไป 1 แต้มเสมอ",
            },

            { t: "h3", c: "4. Step-by-Step Walkthrough (จำลองการทำงาน)" },
            {
              t: "p",
              c: "สมมติ Tree: Root(A) -> ซ้าย(B) -> ซ้าย(C) -> ขวา(D)",
            },

            { t: "h3", c: "1. จุดเริ่มต้น (Root A)" },
            {
              t: "p",
              c: "เราบอกให้มันลองเริ่มก้าวใหม่ทั้ง 2 ทาง",
            },
            {
              t: "ul",
              c: [
                'ลองไปซ้าย: dfs(B, "left", 1)',
                "ลองไปขวา: (สมมติว่ากิ่งขวาไม่มี ก็ตกขอบไป)",
              ],
            },

            { t: "h3", c: '2. มาถึงโหนด B (ทิศ = "left", steps = 1)' },
            {
              t: "ul",
              c: [
                "*อัปเดตสถิติ:* max_step = max(0, 1) = 1",
                'ลองไปขวา (ถูกกฎ): dfs(B.right, "right", 1 + 1) (แต่โหนดนี้ไม่มีกิ่งขวา)',
                'ลองไปซ้าย (ผิดกฎ คอมโบหลุด!): dfs(C, "left", 1) **→ เริ่มนับ 1 ใหม่**',
              ],
            },

            { t: "h3", c: '3. มาถึงโหนด C (ทิศ = "left", steps = 1)' },
            {
              t: "ul",
              c: [
                "*อัปเดตสถิติ:* max_step = max(1, 1) = 1",
                'ลองไปขวา (ถูกกฎ! เลี้ยวขวา): dfs(D, "right", 1 + 1) **→ ส่ง steps = 2**',
              ],
            },

            { t: "h3", c: '4. มาถึงโหนด D (ทิศ = "right", steps = 2)' },
            {
              t: "ul",
              c: [
                "*อัปเดตสถิติ:* max_step = max(1, 2) = 2",
                "(ตกขอบ สิ้นสุดการค้นหา)",
              ],
            },

            {
              t: "callout",
              title: "🧠 บทสรุป",
              c: "**คำตอบสุดท้ายคือ 2 ก้าว** (จากเส้นทาง C → D)",
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
    def longestZigZag(self, root: Optional[TreeNode]) -> int:
        
        # ตัวแปรเก็บสถิติสูงสุด
        self.max_step = 0
        
        # ฟังก์ชันนักสกี: dfs(จุดที่ยืน, ทิศทางที่เพิ่งเลี้ยวมา, แต้มคอมโบ)
        def dfs(node, direction, steps):
            # 1. เดินตกขอบ (Base Case)
            if not node:
                return
            
            # 2. จดสถิติสูงสุดเสมอทุกครั้งที่มาถึงโหนดใหม่
            self.max_step = max(self.max_step, steps)
            
            # 3. แยกลอจิกตามทิศทางที่เพิ่งผ่านมา
            if direction == "left":
                # ถ้าเพิ่งเลี้ยวซ้ายมา:
                # - เลี้ยวขวาต่อ -> คอมโบต่อเนื่อง (+1)
                dfs(node.right, "right", steps + 1)
                # - เลี้ยวซ้ายซ้ำ -> คอมโบหลุด! เริ่มต้นนับ 1 ใหม่
                dfs(node.left, "left", 1)
                
            else: # ถ้า direction == "right"
                # ถ้าเพิ่งเลี้ยวขวามา:
                # - เลี้ยวซ้ายต่อ -> คอมโบต่อเนื่อง (+1)
                dfs(node.left, "left", steps + 1)
                # - เลี้ยวขวาซ้ำ -> คอมโบหลุด! เริ่มต้นนับ 1 ใหม่
                dfs(node.right, "right", 1)
                
        # เริ่มต้นกระโดดออกจาก Root: 
        # ให้ลองก้าวไปทางซ้าย 1 ก้าว และลองก้าวไปทางขวา 1 ก้าว
        dfs(root.left, "left", 1)
        dfs(root.right, "right", 1)
        
        return self.max_step`,
            },

            { t: "h3", c: "6. Complexity Analysis (วิเคราะห์ Big O)" },
            {
              t: "ul",
              c: [
                "**Time Complexity: O(N)** — แม้ว่าโค้ดดูเหมือนจะมีการแตกกิ่งซ้าย-ขวาทุกๆ ครั้ง แต่จริงๆ แล้วมันคือการทำ DFS ปกติ เราเยี่ยมชมทุกโหนด โหนดละ 1 ครั้งถ้วน (แค่พก state ต่างกันไป) เวลาที่ใช้จึงแปรผันตรงตามจำนวนโหนดทั้งหมด",
                "**Space Complexity: O(H)** — โดยที่ H คือความสูง (Height) ของต้นไม้ ใช้ไปกับ Call Stack ของ Recursion ถ้ายิ่งต้นไม้ลึก (เช่นเป็นเส้นตรง) ก็จะใช้พื้นที่ Call Stack มากสุดที่ O(N) ครับ",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: 'โจทย์ข้อนี้คือจุดสูงสุดของการโชว์กึ๋นเรื่อง **"การส่งต่อสถานะ (State Passing)"** ใน Tree DFS ครับ ถ้าเข้าใจ Why/What If ของข้อนี้ การส่งตัวแปรลงไปใน Recursion จะกลายเป็นเรื่องหมูๆ ไปเลยครับ!',
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
