import type { Page } from "@/lib/types";

export const chapter07Pages: Record<string, Page> = {
  "dsa-ch7-intro": {
    slug: "dsa-ch7-intro",
    title: {
      th: "ก้าวข้ามเส้นตรงสู่ลำดับชั้น: Non-Linear Data Structures & Trees",
      en: "Hierarchical Thinking: Non-Linear Data Structures & Trees",
    },
    lead: {
      th: "ขยายขอบเขตความคิดจากโครงสร้างเชิงเส้นสู่อำนาจของโครงสร้างแบบลำดับชั้น (Hierarchy): คำศัพท์พื้นฐานของต้นไม้ และบทบาทในระบบคอมพิวเตอร์จริง",
      en: "Expand beyond sequential arrays into hierarchical tree models: root-to-leaf terminology and real-world system applications.",
    },
    group: "บทที่ 7: การเรียกตัวเอง & โครงสร้างต้นไม้ (Recursion & Trees)",
    blocks: {
      th: [
        {
          t: "p",
          c: "จนถึงตอนนี้ โครงสร้างข้อมูลที่เราเรียนมา (Array, Linked List, Stack, Queue) ล้วนเป็นโครงสร้างเชิงเส้น แต่ในโลกแห่งความเป็นจริง ข้อมูลส่วนใหญ่ไม่ได้เรียงกันเป็นเส้นตรง แต่มีความสัมพันธ์แบบ **ลำดับชั้น (Hierarchy)** หรือ **แม่-ลูก (Parent-Child)** เช่น โครงสร้างโฟลเดอร์ไฟล์ในคอมพิวเตอร์, แผนผังองค์กรบริษัท, หรือแท็ก HTML ในหน้าเว็บ (DOM Tree)",
        },
        { t: "h2", c: "พจนานุกรมคำศัพท์โครงสร้างต้นไม้ (Tree Terminology)" },
        {
          t: "code",
          lang: "text",
          label: "องค์ประกอบของต้นไม้ในวิทยาการคอมพิวเตอร์ (รากอยู่บน กิ่งก้านอยู่ล่าง)",
          c: `             [ A: Root ]            <- ระดับ Depth 0 (รากของทั้งต้นไม้)
             /         \\
       [ B: Parent ]  [ C: Parent ]  <- ระดับ Depth 1
        /         \\          \\
   [ D: Leaf ] [ E: Leaf ] [ F: Leaf ] <- ระดับ Depth 2 (ใบไม้: ไม่มีลูก)`,
        },
        {
          t: "table",
          head: ["คำศัพท์", "ความหมาย", "ตัวอย่างจากไดอะแกรมข้างต้น"],
          rows: [
            ["**Root (ราก)**", "โหนดเริ่มต้นบนสุดของต้นไม้ มีเพียงโหนดเดียวและไม่มี Parent", "โหนด `A`"],
            ["**Parent (พ่อแม่)**", "โหนดที่มีเส้นเชื่อมชี้ลงไปยังโหนดลูก", "`A` เป็น Parent ของ `B` และ `C`"],
            ["**Child (ลูก)**", "โหนดที่สืบทอดลงมาจากโหนดพ่อแม่", "`D` และ `E` เป็นลูกของ `B`"],
            ["**Leaf (ใบ)**", "โหนดปลายสุดที่ไม่มีลูกใดๆ เชื่อมต่ออีก (`child == nullptr`)", "`D`, `E`, `F`"],
            ["**Height (ความสูง)**", "จำนวนเส้นเชื่อมที่ยาวที่สุดจากโหนดนั้นลงไปหา Leaf ที่ลึกที่สุด", "Height ของ `A` คือ 2"],
            ["**Depth (ความลึก)**", "จำนวนเส้นเชื่อมจาก Root ลงมายังโหนดนั้น", "Depth ของ `D` คือ 2, Depth ของ `A` คือ 0"],
          ],
        },
        {
          t: "callout",
          title: "🎯 คุณสมบัติทางคณิตศาสตร์ที่สำคัญ",
          c: "1. ต้นไม้ที่มีจำนวนโหนด $N$ ตัว จะมีเส้นเชื่อม (Edges) พอดี **$N - 1$ เส้น** เสมอ\n2. ในต้นไม้ จะมี **เส้นทางเชื่อมต่อเพียงเส้นเดียว (Unique Path)** ระหว่างคู่โหนดใดๆ เสมอ (ห้ามมีวงวน / Acyclic เด็ดขาด)",
        },
      ],
      en: [],
    },
  },

  "dsa-ch7-recursive": {
    slug: "dsa-ch7-recursive",
    title: {
      th: "Recursion Mental Model: Base Case & Call Stack Tracing",
      en: "The Recursion Mental Model: Base Cases & Call Stack Frames",
    },
    lead: {
      th: "ทลายความกลัวการเรียกตัวเอง (Recursion): เสาหลัก 3 ประการ, การทำงานของ Call Stack ใน RAM, และศิลปะ 'Leap of Faith'",
      en: "Demystify recursion: the 3 foundational pillars, call stack memory visualization, and trusting inductive subproblem returns.",
    },
    group: "บทที่ 7: การเรียกตัวเอง & โครงสร้างต้นไม้ (Recursion & Trees)",
    blocks: {
      th: [
        { t: "h2", c: "ทำไม Recursion ถึงดูเข้าใจยากในตอนแรก?" },
        {
          t: "p",
          c: "สมองมนุษย์คุ้นเคยกับการคิดแบบลำดับ (Iteration: ทำข้อ 1 เสร็จ ไปข้อ 2 แล้ววนกลับมา) แต่ **การเรียกตัวเอง (Recursion)** ต้องการให้เราคิดแบบ **'การแตกปัญหาย่อยที่คล้ายตัวเอง' (Self-Similarity)**\n\nหัวใจสำคัญที่สุดในการเขียน Recursion มีเพียง 3 กฎเหล็ก:",
        },
        {
          t: "ol",
          c: [
            "**1. Base Case (จุดหยุด)**: ขนาดปัญหาที่เล็กที่สุดและรู้คำตอบได้ทันทีโดยไม่ต้องคำนวณ เพื่อหยุดไม่ให้ฟังก์ชันเรียกตัวเองไม่รู้จบ (ป้องกัน Stack Overflow)",
            "**2. Recursive Step (การยุบปัญหา)**: สั่งให้ฟังก์ชันแก้ปัญหากับข้อมูลที่ขนาดเล็กลงเรื่อยๆ เพื่อมุ่งหน้าเข้าหา Base Case",
            "**3. Leap of Faith (ความเชื่อมั่นในทฤษฎีอุปนัย)**: จงเชื่อว่าฟังก์ชันลูกจะส่งคำตอบย่อยที่ถูกต้องกลับมา โดยไม่ต้องพยายามคิดจำลองในหัวจน Stack ล้นสมอง!",
          ],
        },
        { t: "h2", c: "การเดินทางของ Call Stack ใน Factorial(4)" },
        {
          t: "code",
          lang: "python",
          label: "Python: Factorial พร้อม Base Case และ Recursive Step",
          c: `def factorial(n: int) -> int:
    # 1. Base Case
    if n <= 1:
        return 1
    # 2. Recursive Step
    return n * factorial(n - 1)

print(factorial(4)) # 24`,
        },
        {
          t: "code",
          lang: "text",
          label: "ภาพจำลอง Stack Frames บน RAM (ขยายตัวขึ้น แล้วยุบตัวลง)",
          c: `[ จังหวะที่ 1: ดันเข้า Stack (Winding) ]
┌───────────────────────────┐
│ factorial(1) -> ชน Base Case คืนค่า 1!
├───────────────────────────┤
│ factorial(2) รอ factorial(1)
├───────────────────────────┤
│ factorial(3) รอ factorial(2)
├───────────────────────────┤
│ factorial(4) รอ factorial(3)
└───────────────────────────┘

[ จังหวะที่ 2: คืนค่าและยุบตัว (Unwinding) ]
factorial(1) คืน 1  ──► factorial(2) คำนวณ 2 * 1 = 2
factorial(2) คืน 2  ──► factorial(3) คำนวณ 3 * 2 = 6
factorial(3) คืน 6  ──► factorial(4) คำนวณ 4 * 6 = 24  (คำตอบสุดท้าย!)`,
        },
        {
          t: "callout",
          title: "⚠️ ทำไมต้องระวัง Stack Overflow?",
          c: "ในระบบปฏิบัติการ Stack Memory มีขนาดจำกัด (มักอยู่ที่ 8 MB) หากฟังก์ชันเรียกตัวเองลึกเกินไป (เช่น $N = 100,000$) Stack Frame จะเต็มและโปรแกรมจะแครชทันที ในโจทย์ที่ลึกมากๆ เรามักเปลี่ยนมาใช้ลูป Iteration ร่วมกับ Explicit Stack แทน",
        },
      ],
      en: [],
    },
  },

  "dsa-ch7-tree": {
    slug: "dsa-ch7-tree",
    title: {
      th: "Binary Tree & BST: ค้นหา, แทรก, ลบ & ท่องโหนด DFS/BFS",
      en: "Binary Search Trees: Search, Insert, Delete & DFS/BFS Traversals",
    },
    lead: {
      th: "เจาะลึก Binary Search Tree (BST): กฎเหล็ก Left < Root < Right, การท่องโหนดครบ 4 แบบ (Pre/In/Post/Level-order), และการลบโหนดที่สมบูรณ์แบบ",
      en: "Comprehensive guide to BST operations, 3 deletion cases with in-order successors, and preorder/inorder/postorder/BFS level traversals.",
    },
    group: "บทที่ 7: การเรียกตัวเอง & โครงสร้างต้นไม้ (Recursion & Trees)",
    blocks: {
      th: [
        { t: "h2", c: "Binary Tree vs Binary Search Tree (BST)" },
        {
          t: "ul",
          c: [
            "**Binary Tree**: ต้นไม้ที่แต่ละโหนดมีลูกได้ไม่เกิน 2 คน (ลูกซ้าย `left` และลูกขวา `right`)",
            "**Binary Search Tree (BST)**: ต้นไม้ทวิภาคที่มีกฎเหล็กควบคุมการจัดวางข้อมูล:\n> **'สมาชิกทุกตัวในกิ่งซ้าย ต้องน้อยกว่า Root และ สมาชิกทุกตัวในกิ่งขวา ต้องมากกว่า Root'**",
          ],
        },
        {
          t: "code",
          lang: "text",
          label: "ตัวอย่าง Binary Search Tree ที่ถูกต้อง (BST Property)",
          c: `             [ 8 ]
            /     \\
         [ 3 ]    [ 10 ]
        /    \\         \\
      [ 1 ]  [ 6 ]     [ 14 ]
             /   \\      /
           [ 4 ] [ 7 ] [ 13 ]
           
* สังเกตว่า: กิ่งซ้ายของ 8 (3, 1, 6, 4, 7) น้อยกว่า 8 ทุกตัว
* และกิ่งขวาของ 8 (10, 14, 13) มากกว่า 8 ทุกตัว!`,
        },
        { t: "h2", c: "การท่องโหนดในต้นไม้ (Tree Traversals)" },
        {
          t: "table",
          head: ["วิธีการท่องโหนด", "ลำดับการอ่าน", "จุดเด่น / การใช้งานจริง"],
          rows: [
            ["**In-Order Traversal**", "ซ้าย $\\to$ Root $\\to$ ขวา", "🔥 มหัศจรรย์มาก: จะได้ข้อมูลเรียงจากน้อยไปหามากเสมอ!"],
            ["**Pre-Order Traversal**", "Root $\\to$ ซ้าย $\\to$ ขวา", "เหมาะสำหรับการทำ Serialization / ก๊อปปี้โครงสร้างต้นไม้"],
            ["**Post-Order Traversal**", "ซ้าย $\\to$ ขวา $\\to$ Root", "เหมาะสำหรับคำนวณขนาดพื้นที่โฟลเดอร์ หรือการลบต้นไม้จากล่างขึ้นบน"],
            ["**Level-Order (BFS)**", "อ่านทีละชั้นจากบนลงล่าง", "ใช้ **Queue** ในการจำลองการเดินทีละชั้น"],
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "Python: การท่องโหนด DFS ทั้ง 3 รูปแบบ",
          c: `class TreeNode:
    def __init__(self, val: int = 0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# 1. In-order: ซ้าย -> Root -> ขวา (เรียงจากน้อยไปมาก)
def inorder(root: TreeNode | None) -> list[int]:
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

# 2. Pre-order: Root -> ซ้าย -> ขวา
def preorder(root: TreeNode | None) -> list[int]:
    if not root:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)

# 3. Post-order: ซ้าย -> ขวา -> Root
def postorder(root: TreeNode | None) -> list[int]:
    if not root:
        return []
    return postorder(root.left) + postorder(root.right) + [root.val]`,
        },
        { t: "h2", c: "การลบข้อมูลใน BST (The 3 Deletion Cases)" },
        {
          t: "p",
          c: "การลบโหนดออกจาก BST เป็นหนึ่งในคำถามที่ท้าทายที่สุดในการสัมภาษณ์งาน เพราะต้องรักษากฎ Left < Root < Right ไว้เสมอ โดยแบ่งเป็น 3 กรณี:",
        },
        {
          t: "ol",
          c: [
            "**กรณีที่ 1: โหนดที่ต้องการลบเป็น Leaf Node (ไม่มีลูก)** $\\implies$ ตัดการเชื่อมต่อทิ้งได้ทันที",
            "**กรณีที่ 2: โหนดที่ต้องการลบมีลูกเพียงคนเดียว** $\\implies$ ดึงลูกคนนั้นขึ้นมาแทนที่ตำแหน่งของโหนดที่ถูกลบ",
            "**กรณีที่ 3: โหนดที่ต้องการลบมีลูกทั้งสองฝั่ง (ซ้ายและขวา)** $\\implies$ หาโหนดที่มีค่าน้อยที่สุดในกิ่งขวา (**In-order Successor**) ดึงค่านั้นมาแทนที่ แล้วสั่งลบโหนดซ้ำที่กิ่งขวา!",
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "Python: ลบโหนดใน BST ครบทั้ง 3 กรณี (LeetCode 450)",
          c: `def delete_node(root: TreeNode | None, key: int) -> TreeNode | None:
    if not root:
        return None
        
    if key < root.val:
        root.left = delete_node(root.left, key)
    elif key > root.val:
        root.right = delete_node(root.right, key)
    else:
        # เจอโหนดที่ต้องการลบแล้ว!
        # กรณี 1 & 2: มีลูกคนเดียว หรือ ไม่มีลูก
        if not root.left:
            return root.right
        elif not root.right:
            return root.left
            
        # กรณี 3: มีลูกสองฝั่ง -> หา In-order Successor (ตัวน้อยสุดในกิ่งขวา)
        successor = root.right
        while successor.left:
            successor = successor.left
            
        root.val = successor.val # คัดลอกค่ามาทับ
        # สั่งลบโหนด successor ทิ้งจากกิ่งขวา
        root.right = delete_node(root.right, successor.val)
        
    return root`,
        },
      ],
      en: [],
    },
  },
};
