import type { Page } from "@/lib/types";

export const treeDfsPages: Record<string, Page> = {
  "lc75-intro-tree-dfs": {
    slug: "lc75-intro-tree-dfs",
    title: { th: "Binary Tree & DFS — พื้นฐาน & แนวคิด", en: "" },
    lead: { th: "รู้จัก binary tree ตั้งแต่ศูนย์ — node (โหนด), leaf (ใบ), root (ราก), คลาส TreeNode — แล้วเรียนวิธี traverse (เดินไล่) ลงลึกทีละกิ่งด้วย recursion (การเรียกตัวเอง) แบบ DFS", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "จนถึงตอนนี้เราเล่นกับข้อมูลที่เรียงเป็นแถวยาว ๆ (array/ลิสต์, string, linked list) มาตลอด หมวดนี้เราจะเจอโครงสร้างข้อมูลแบบใหม่ที่แตกกิ่งก้านเหมือนต้นไม้ ชื่อว่า binary tree มันโผล่ในโจทย์สัมภาษณ์บ่อยมาก และเครื่องมือหลักที่ใช้ traverse มันคือ recursion แบบ DFS ถ้ายังไม่เคยรู้จัก tree เลยก็ไม่เป็นไร หน้านี้เราจะเริ่มจากศูนย์แล้วค่อยไปลุยโจทย์ทีละข้อในหน้าถัดไป" },

              { t: "h2", c: "Binary tree คืออะไร" },
              { t: "p", c: "Binary tree คือโครงสร้างข้อมูลที่ประกอบด้วยกล่องเล็ก ๆ เรียกว่า node ต่อกันแบบแตกกิ่งลงล่าง แต่ละ node เก็บค่าหนึ่งค่า และชี้ไปหา child (โหนดลูก) ได้มากสุด 2 ตัว (นี่คือที่มาของคำว่า binary = สอง) เราเรียก child สองตัวนั้นว่า left child (ลูกซ้าย) และ right child (ลูกขวา)" },
              { t: "ul", c: [
                "root (ราก) = node บนสุด เป็นจุดเริ่มต้นของต้นไม้ (ต้นไม้ทั้งต้นเข้าถึงได้ผ่าน root)",
                "node = กล่องแต่ละกล่องที่เก็บค่าและลิงก์ไปหา child",
                "left child / right child = child ทางซ้ายและทางขวาของ node หนึ่ง",
                "parent (แม่) = node ที่ชี้ลงมาหา node นั้น",
                "leaf (ใบ) = node ที่ไม่มีลูกเลย (ทั้งซ้ายและขวาเป็น None) — เหมือนปลายกิ่ง",
                "height (ความสูง) = จำนวนชั้นจาก root ลงไปถึง leaf ที่ลึกสุด",
              ] },
              { t: "p", c: "ลองดูรูปนี้ ต้นไม้กลับหัว — root อยู่บน leaf อยู่ล่าง เส้น / กับ \\ คือลิงก์จาก parent ลงไปหา left child และ right child" },
              { t: "code", c: `          3          <- root (ชั้น 1)
         / \\
        9   20         <- ชั้น 2
           /  \\
          15   7       <- ชั้น 3 (ทั้ง 9, 15, 7 คือ leaf เพราะไม่มีลูก)

# ต้นนี้ความสูง = 3 ชั้น
# 20 มีลูกซ้าย = 15, ลูกขวา = 7
# 9 ไม่มีลูก จึงเป็น leaf` },

              { t: "h2", c: "หน้าตาของ node ในโค้ด: คลาส TreeNode" },
              { t: "p", c: "LeetCode สร้าง node แต่ละตัวจากคลาส TreeNode หน้าตาแบบนี้ ตัวมันเองเก็บค่า val และ pointer (ตัวชี้) ไปหา child สองตัวคือ left กับ right ถ้าไม่มี child ฝั่งไหน pointer ฝั่งนั้นจะเป็น None โจทย์ tree ทุกข้อในหมวดนี้อิงหน้าตานี้" },
              { t: "code", lang: "python", c: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val      # ค่าที่เก็บใน node นี้
        self.left = left    # ลูกซ้าย (เป็น TreeNode หรือ None)
        self.right = right  # ลูกขวา (เป็น TreeNode หรือ None)

# ประกอบต้นไม้ตามรูปด้านบนด้วยมือ
root = TreeNode(3)
root.left = TreeNode(9)
root.right = TreeNode(20, TreeNode(15), TreeNode(7))
# root.right.left.val == 15` },

              { t: "h2", c: "DFS คืออะไร และทำไมใช้ recursion" },
              { t: "p", c: "DFS ย่อมาจาก Depth-First Search แปลตรงตัวว่า \"ค้นแบบลงลึกก่อน\" ไอเดียคือเลือกกิ่งหนึ่งแล้ว traverse ดิ่งลงไปให้สุดก่อน จนชน leaf แล้วค่อย backtrack (ถอยกลับ) มาลองกิ่งอื่น ต่างจากการไล่ทีละ level (ชั้น) — นั่นคือ BFS (Breadth-First Search) ซึ่งเราจะเรียนหมวดถัดไป" },
              { t: "p", c: "สาเหตุที่ recursion เข้ากับ tree ได้พอดิบพอดี เพราะต้นไม้มีธรรมชาติแบบ \"เรียกซ้อนตัวเอง\" อยู่แล้ว: left child ของ node ก็คือ root ของ subtree (ต้นไม้ย่อย) อีกต้นหนึ่ง right child ก็เป็น root ของอีก subtree หนึ่งเช่นกัน ดังนั้นทุก node จึงมองเป็น \"ปัญหาย่อยหน้าตาเหมือนกันเป๊ะ\" เราแค่เขียนวิธีแก้ที่ node เดียว แล้วสั่งให้มันเรียกตัวเองกับ left child และ right child" },
              { t: "callout", title: "หัวใจของ recursion บน tree", c: "ทุกฟังก์ชัน recursion ต้องมี 2 ส่วน: (1) base case = เงื่อนไขหยุด มักเป็น \"ถ้า node เป็น None ให้คืนค่าเริ่มต้น\" กันไม่ให้เรียกทะลุปลายกิ่ง และ (2) recursive case = แก้ที่ node ปัจจุบันโดยอาศัยคำตอบของลูกซ้ายและลูกขวา" },
              { t: "code", lang: "python", c: `# template recursion บน binary tree ที่ใช้ได้แทบทุกข้อ
def dfs(node):
    if node is None:        # (1) base case: ตกขอบ ปลายกิ่งแล้ว
        return              #     คืนค่าเริ่มต้น (0, None, [] แล้วแต่โจทย์)

    # (2) recursive case: ถามคำตอบจากสองต้นย่อยก่อน
    left = dfs(node.left)
    right = dfs(node.right)

    # แล้วเอา left, right มารวมกับ node.val เป็นคำตอบของต้นนี้
    return combine(node.val, left, right)` },

              { t: "h2", c: "ลำดับการเดิน: preorder / inorder / postorder" },
              { t: "p", c: "เวลา traverse DFS เราแตะ 3 อย่างที่แต่ละ node คือ ตัวมันเอง (N), left subtree (ต้นย่อยซ้าย, L), และ right subtree (ต้นย่อยขวา, R) ลำดับที่เราเลือกทำ N เทียบกับ L, R มีชื่อเรียกต่างกัน แต่ทั้งหมดคือ DFS เหมือนกัน" },
              { t: "table", head: ["ชื่อ", "ลำดับ", "จำง่าย ๆ / ใช้ตอนไหน"], rows: [
                ["preorder", "N → L → R", "ทำตัวเองก่อนค่อยลงลูก เช่น ก็อปปี้/พิมพ์โครงต้นไม้"],
                ["inorder", "L → N → R", "ซ้ายก่อนค่อยตัวเอง — บน BST จะได้ค่าเรียงจากน้อยไปมาก"],
                ["postorder", "L → R → N", "ลูกเสร็จหมดก่อนค่อยสรุปตัวเอง เช่น คิดความสูง/ผลรวม"],
              ] },
              { t: "p", c: "ในโจทย์ส่วนใหญ่ของหมวดนี้เราใช้แนว postorder คือ \"ให้ child สองฝั่ง compute (คำนวณ) เสร็จก่อน แล้วค่อย combine (รวม) ผลที่ตัวเอง\" เพราะคำตอบของ node หนึ่งมักต้องพึ่งคำตอบของ child ทั้งสอง แต่บางข้อ (เช่นนับ good node) ใช้แนว preorder ที่ \"ส่งข้อมูลลงล่าง\" (top-down) แทน" },

              { t: "callout", title: "พร้อมลุยแล้ว", c: "หมวดนี้มี 6 ข้อ (LC104, LC872, LC1448, LC437, LC1372, LC236) ไล่จากง่ายไปยาก พร้อมแล้วกดถัดไปเริ่มข้อแรกได้เลย" },
      ],
      en: [],
    },
  },

  "lc75-p33": {
    slug: "lc75-p33",
    title: { th: "ข้อ 33 · LC104 Maximum Depth of Binary Tree (ความลึกมากสุด) 🟢", en: "" },
    lead: { th: "หาความลึกมากสุดของ binary tree ด้วย recursion แบบ postorder — โจทย์เปิดตัวของ DFS บนต้นไม้", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC104): กำหนด root ของ binary tree มาให้ ให้ return maximum depth (ความลึกมากสุด) ของต้นไม้นั้น โดยนิยาม maximum depth คือจำนวน node บนเส้นทางที่ยาวที่สุดจาก root node ลงไปจนถึง leaf node ที่ไกลที่สุด" },
              {
                t: "example",
                c: [
                  { input: "root = [3,9,20,null,null,15,7]", output: "3", explain: "เส้นทางยาวสุดคือ 3 → 20 → 15 หรือ 3 → 20 → 7 นับ node ได้ 3 ตัว" },
                  { input: "root = [1,null,2]", output: "2", explain: "เส้นทางยาวสุดคือ 1 → 2 นับ node ได้ 2 ตัว" },
                  { input: "root = []", output: "0", explain: "ต้นไม้ว่าง ไม่มี node เลย ความลึกจึงเป็น 0" },
                ],
              },
              {
                t: "constraints",
                c: [
                "จำนวน node อยู่ระหว่าง 0 ถึง 10^4",
                "-100 <= Node.val <= 100",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ DFS recursion แบบ postorder เพราะ depth ของต้นหนึ่งขึ้นกับ depth ของ child ทั้งสองฝั่ง เราจึงต้องรอให้ child compute (คำนวณ) เสร็จก่อนแล้วค่อยสรุปตัวเอง" },
              { t: "p", c: "ถ้าคิดตรง ๆ เราอาจลอง traverse (เดินไล่) ทุกเส้นทางจาก root ถึงทุก leaf แล้วหาเส้นที่ยาวสุด แต่การมองเป็น recursion ทำให้สั้นกว่ามาก: depth ของต้น = 1 (นับตัว root เอง) บวกกับ depth ที่มากกว่าของสอง subtree (ต้นย่อย) ปล่อยให้ left child และ right child บอก depth ของมันมาเอง" },
              { t: "ol", c: [
                "ถ้า node เป็น None แปลว่าต้นว่าง return (คืนค่า) 0 (base case)",
                "ถาม depth ของ left subtree เก็บไว้ในตัวแปร left",
                "ถาม depth ของ right subtree เก็บไว้ในตัวแปร right",
                "return 1 + max(left, right) — บวก 1 นับตัวเอง เลือกฝั่งที่ลึกกว่า",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ลืม base case node is None → จะเรียก .left / .right ทะลุ None แล้ว error ทันที และอย่าลืมว่านับ \"จำนวน node\" ไม่ใช่จำนวน edge (เส้นเชื่อม) จึงต้องบวก 1 ทุก level (ชั้น)" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "จำลองบนต้น [3,9,20,null,null,15,7] — recursion จะลงลึกสุดก่อนแล้วค่อยคืนค่าขึ้นมา (postorder)" },
              { t: "table", head: ["เรียกที่ node", "left", "right", "คืนค่า"], rows: [
                ["9 (leaf)", "0", "0", "1"],
                ["15 (leaf)", "0", "0", "1"],
                ["7 (leaf)", "0", "0", "1"],
                ["20", "1 (จาก 15)", "1 (จาก 7)", "2"],
                ["3 (root)", "1 (จาก 9)", "2 (จาก 20)", "3"],
              ] },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ class นี้มาให้แล้ว ที่เขียนไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


# นิยาม node ที่ LeetCode ใช้ (โจทย์ tree ทุกข้ออิงหน้าตานี้)
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def maxDepth(root):
    if root is None:        # ต้นว่าง ลึก 0 ชั้น (base case)
        return 0
    left = maxDepth(root.left)    # ความลึกของต้นย่อยซ้าย
    right = maxDepth(root.right)  # ความลึกของต้นย่อยขวา
    return 1 + max(left, right)   # บวก 1 นับตัวเอง เลือกฝั่งที่ลึกกว่า

# ประกอบต้นไม้ [3, 9, 20, null, null, 15, 7] ด้วยมือ
root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(maxDepth(root))     # ต้นไม้นี้ลึก 3 ชั้น
print(maxDepth(None))     # ต้นว่าง ลึก 0 ชั้น`, out: `3
0` },
                { t: "p", c: "คิดแบบ postorder: เราไม่รู้ความลึกของต้นตอนนี้จนกว่าจะรู้ความลึกของลูกสองฝั่งก่อน จึงเรียก recursion ลงลูกซ้ายและลูกขวาให้บอกความลึกกลับมา แล้วต้นปัจจุบันแค่หยิบฝั่งที่ลึกกว่ามาบวก 1 (บวกสำหรับนับตัว root เองในเส้นทางนั้น)" },
                { t: "p", c: "base case สำคัญมาก: ถ้า node เป็น None แปลว่าตกขอบไปแล้ว คืน 0 ถ้าลืมข้อนี้จะเรียกทะลุ None แล้ว error ทันที" },
                { t: "p", c: "Time O(n) แตะทุก node ครั้งเดียว (n = จำนวน node) · Space O(h) จากความลึกของ call stack ที่เรียกซ้อนกันตามความสูง h ของต้นไม้ กรณีแย่สุด (ต้นเอียงเป็นเส้นตรง) h เท่ากับ n" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "postorder บน tree: ให้ลูกสองฝั่งคืนคำตอบขึ้นมาก่อน แล้ว node ปัจจุบันค่อยรวมผล (ที่นี่คือ 1 + max) — เป็นแม่แบบของโจทย์ tree อีกหลายข้อ" },
      ],
      en: [],
    },
  },

  "lc75-p34": {
    slug: "lc75-p34",
    title: { th: "ข้อ 34 · LC872 Leaf-Similar Trees (ต้นไม้ใบเหมือนกัน) 🟢", en: "" },
    lead: { th: "เทียบว่าลำดับ leaf จากซ้ายไปขวาของต้นไม้สองต้นเหมือนกันไหม ด้วย DFS เก็บใบ", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC872): พิจารณา leaf (ใบ) ทั้งหมดของ binary tree เรียงจากซ้ายไปขวา ค่าของ leaf เหล่านั้นเรียงกันเรียกว่า leaf value sequence (ลำดับค่าใบ) ของต้นไม้นั้น ต้นไม้สองต้นจะถือว่าเป็น leaf-similar ก็ต่อเมื่อ leaf value sequence ของทั้งคู่เหมือนกันทุกประการ กำหนด root ของต้นไม้สองต้นคือ root1 และ root2 มาให้ ให้ return true ก็ต่อเมื่อทั้งสองต้นเป็น leaf-similar" },
              {
                t: "example",
                c: [
                  { input: "root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]", output: "true", explain: "ใบของทั้งสองต้นเรียงจากซ้ายไปขวาได้ลำดับเดียวกันคือ [6,7,4,9,8] แม้โครงต้นไม้จะไม่เหมือนกันก็ตาม" },
                  { input: "root1 = [1,2,3], root2 = [1,3,2]", output: "false", explain: "ต้นแรกมีใบเรียง [2,3] ส่วนต้นที่สองมีใบเรียง [3,2] ลำดับต่างกันจึงไม่ leaf-similar" },
                ],
              },
              {
                t: "constraints",
                c: [
                "จำนวน node ของแต่ละต้นอยู่ระหว่าง 1 ถึง 200",
                "0 <= Node.val <= 200",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ DFS collect (เก็บ) ค่าเฉพาะ node ที่เป็น leaf ออกมาเป็น array (ลิสต์) ของแต่ละต้น แล้ว compare (เทียบ) สอง array ว่าเท่ากันไหม" },
              { t: "p", c: "เคล็ดคือทำให้ลำดับ \"ซ้ายไปขวา\" เป๊ะ ๆ: การ traverse (เดินไล่) left child ก่อน right child เสมอ (แล้ว append ผลซ้าย + ผลขวา) จะรับประกันลำดับ leaf จากซ้ายไปขวาโดยอัตโนมัติ" },
              { t: "ol", c: [
                "เขียนฟังก์ชันย่อย leaves(node) ที่ return array ค่า leaf ของต้นนั้น",
                "ถ้า node เป็น None return array ว่าง []",
                "ถ้า node ไม่มี child ทั้งซ้ายและขวา = เป็น leaf return [node.val]",
                "ไม่งั้น return leaves(ซ้าย) + leaves(ขวา) — ต่อฝั่งซ้ายก่อนเสมอ",
                "สุดท้าย compare leaves(root1) == leaves(root2)",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ลืมเช็คว่าเป็น leaf จริง ๆ (ไม่มีลูกทั้งสองฝั่ง) แล้วเผลอเก็บค่า node ภายในด้วย หรือสลับลำดับซ้ายขวาทำให้ลำดับใบผิด" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ class นี้มาให้แล้ว ที่เขียนไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def leafSimilar(root1, root2):
    def leaves(node):
        if node is None:
            return []
        # ไม่มีลูกทั้งสองฝั่ง = เป็น leaf เก็บค่าไว้
        if node.left is None and node.right is None:
            return [node.val]
        # ต่อใบฝั่งซ้ายก่อน แล้วตามด้วยฝั่งขวา -> ได้ลำดับซ้ายไปขวา
        return leaves(node.left) + leaves(node.right)

    return leaves(root1) == leaves(root2)

t1 = TreeNode(1, TreeNode(2), TreeNode(3))    # ใบเรียงจากซ้ายไปขวา: 2, 3
t2 = TreeNode(9, TreeNode(2), TreeNode(3))    # ใบเหมือนกัน แม้ค่าในรากต่างกัน
t3 = TreeNode(1, TreeNode(3), TreeNode(2))    # ใบชุดเดียวกันแต่ลำดับสลับ
print(leafSimilar(t1, t2))
print(leafSimilar(t1, t3))`, out: `True
False` },
                { t: "p", c: "ฟังก์ชันย่อย leaves เดินแบบ DFS เก็บค่าเฉพาะ node ที่เป็นใบ (ไม่มีลูกทั้งซ้ายและขวา) เคล็ดของการได้ลำดับ \"ซ้ายไปขวา\" คือเราต่อผลของฝั่งซ้ายก่อนฝั่งขวาเสมอ" },
                { t: "p", c: "ถ้าเปลี่ยนไปต่อฝั่งขวาก่อน ลำดับใบจะกลับด้าน ทำให้เทียบผิดทันที และถ้าลืมเงื่อนไข leaf จะไปเก็บค่า node ภายในปนมาด้วย" },
                { t: "p", c: "Time O(n1 + n2) แตะทุก node ของทั้งสองต้น · Space O(n1 + n2) จากลิสต์ใบที่เก็บไว้ บวกความลึก call stack ตามความสูงต้นไม้" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "DFS ซ้ายก่อนขวาเสมอ = ได้ลำดับ \"ซ้ายไปขวา\" ฟรี ๆ แล้วยุบปัญหาโครงสร้างซับซ้อนให้เหลือแค่เทียบลิสต์ธรรมดา" },
      ],
      en: [],
    },
  },

  "lc75-p35": {
    slug: "lc75-p35",
    title: { th: "ข้อ 35 · LC1448 Count Good Nodes in Binary Tree (นับโหนดดี) 🟡", en: "" },
    lead: { th: "นับ node ที่ไม่มีใครบนเส้นทางจาก root ค่ามากกว่ามัน ด้วย DFS แบบ top-down พกค่ามากสุดลงไป", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC1448): กำหนด root ของ binary tree มาให้ node X ตัวหนึ่งจะถูกเรียกว่า good ถ้าบนเส้นทางจาก root ไปถึง X ไม่มี node ใดเลยที่มีค่ามากกว่า X ให้ return จำนวน good node ทั้งหมดในต้นไม้" },
              {
                t: "example",
                c: [
                  { input: "root = [3,1,4,3,null,1,5]", output: "4", explain: "good node คือ 3 (root), 3 (ใต้ 1), 4, และ 5 — ส่วน 1 (ลูกซ้ายของ root) และ 1 (ใต้ 4) ไม่ดีเพราะมี node ค่ามากกว่าอยู่ก่อนหน้าบนเส้นทาง" },
                  { input: "root = [3,3,null,4,2]", output: "3", explain: "node 2 ไม่ดี เพราะเส้นทาง (3,3,2) มี 3 ที่มากกว่ามันอยู่ก่อนหน้า" },
                  { input: "root = [1]", output: "1", explain: "มีแค่ root ตัวเดียว ถือเป็น good เสมอเพราะไม่มีใครอยู่ก่อนหน้ามัน" },
                ],
              },
              {
                t: "constraints",
                c: [
                "จำนวน node อยู่ระหว่าง 1 ถึง 10^5",
                "-10^4 <= Node.val <= 10^4",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ DFS แบบ preorder ที่ \"ส่งข้อมูลลงล่าง\" (top-down): ระหว่าง traverse ลงจาก root ให้ track (ติดตามค่า) \"max ที่เจอมาตลอดเส้นทาง\" ติดตัวไปด้วย" },
              { t: "p", c: "ต่างจากข้อ 33-34 ที่รอผลจาก child ขึ้นมา (bottom-up) ข้อนี้เรา compare (เทียบ) ที่ node ปัจจุบันก่อน (ดูว่าค่ามันมากกว่าหรือเท่ากับ max ที่พกมาไหม) แล้วค่อย update (อัปเดต) max ส่งลงให้ child" },
              { t: "ol", c: [
                "เขียน dfs(node, max_so_far) โดย max_so_far คือค่ามากสุดบนเส้นทางถึงก่อน node นี้",
                "ถ้า node เป็น None return 0",
                "node นี้ดี (count 1) ถ้า node.val >= max_so_far ไม่งั้น count 0",
                "compute new_max = max(max_so_far, node.val) ก่อนส่งต่อ",
                "return good + dfs(ซ้าย, new_max) + dfs(ขวา, new_max)",
                "เรียกครั้งแรกด้วย max_so_far = -inf เพื่อให้ root ผ่านเงื่อนไขเสมอ",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ต้องอัปเดต new_max ก่อนเรียกลูก และส่ง max เป็นพารามิเตอร์ (แต่ละกิ่งมีสำเนาของตัวเอง) ไม่ใช่ตัวแปรร่วม ไม่งั้นเส้นทางฝั่งซ้ายจะไปกวนฝั่งขวา" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "จำลองบนต้น [3,1,4,3,null,1,5] — คอลัมน์ max_so_far คือค่าที่พกมาถึงก่อน node นี้" },
              { t: "table", head: ["node", "max_so_far", "node.val >= max?", "นับ good?"], rows: [
                ["3 (root)", "-inf", "ใช่", "✓"],
                ["1 (ลูกซ้าย)", "3", "ไม่", "✗"],
                ["3 (ใต้ 1)", "3", "ใช่", "✓"],
                ["4 (ลูกขวา)", "3", "ใช่", "✓"],
                ["1 (ใต้ 4)", "4", "ไม่", "✗"],
                ["5 (ใต้ 4)", "4", "ใช่", "✓"],
              ] },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ class นี้มาให้แล้ว ที่เขียนไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def goodNodes(root):
    def dfs(node, max_so_far):
        if node is None:
            return 0
        # node นี้ดีไหม? ดีถ้าไม่มีใครบนเส้นทางค่ามากกว่ามัน
        good = 1 if node.val >= max_so_far else 0
        # อัปเดตค่ามากสุดก่อนส่งต่อให้ลูกสองฝั่ง
        new_max = max(max_so_far, node.val)
        return good + dfs(node.left, new_max) + dfs(node.right, new_max)

    # เริ่มด้วย -inf เพื่อให้ root ถูกนับเป็น good เสมอ
    return dfs(root, float('-inf'))

# ต้นไม้ [3, 1, 4, 3, null, 1, 5]
root = TreeNode(3, TreeNode(1, TreeNode(3)), TreeNode(4, TreeNode(1), TreeNode(5)))
print(goodNodes(root))`, out: `4` },
                { t: "p", c: "นี่คือ DFS แบบ preorder ที่ \"ส่งข้อมูลลงล่าง\" (top-down): เราพกค่ามากสุดบนเส้นทางลงไปเรื่อย ๆ ตัดสินที่ node ปัจจุบันก่อน แล้วค่อยลงลูก ต่างจากข้อก่อน ๆ ที่รอผลจากลูกขึ้นมา" },
                { t: "p", c: "จุดสำคัญคือต้องอัปเดต new_max ก่อนเรียกลูก และแต่ละกิ่งมีสำเนา max_so_far ของตัวเอง (ส่งเป็นพารามิเตอร์ ไม่ใช่ตัวแปรร่วม) เพื่อไม่ให้เส้นทางฝั่งซ้ายไปกวนฝั่งขวา การเริ่มด้วย float('-inf') ทำให้ root ผ่านเงื่อนไข >= เสมอ" },
                { t: "p", c: "Time O(n) แตะทุก node ครั้งเดียว · Space O(h) จากความลึก call stack ตามความสูงต้นไม้" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "DFS top-down: เมื่อคำตอบของ node ขึ้นกับ \"สิ่งที่เจอมาระหว่างทางจาก root\" ให้ส่ง state (ที่นี่คือค่ามากสุด) ลงไปเป็นพารามิเตอร์ของ recursion" },
      ],
      en: [],
    },
  },

  "lc75-p36": {
    slug: "lc75-p36",
    title: { th: "ข้อ 36 · LC437 Path Sum III (นับ path ผลรวมเป้า) 🟡", en: "" },
    lead: { th: "นับเส้นทางลงล่างที่ผลรวมเท่า targetSum ด้วยเทคนิค prefix sum + hash map ระหว่างเดิน DFS", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC437): กำหนด root ของ binary tree และเลขจำนวนเต็ม targetSum มาให้ ให้ return จำนวน path ที่ผลรวมของค่าตลอด path เท่ากับ targetSum โดย path ไม่จำเป็นต้องเริ่มต้นที่ root หรือจบที่ leaf แต่ต้องเดินลงล่างเท่านั้น (จาก parent node ไปยัง child node)" },
              {
                t: "example",
                c: [
                  { input: "root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8", output: "3", explain: "path ที่รวมได้ 8 มีสามเส้น: 5→3, 5→2→1, และ -3→11" },
                  { input: "root = [1,2,3], targetSum = 3", output: "2", explain: "path ที่รวมได้ 3 มีสองเส้น: 1→2 และ node 3 เดี่ยว ๆ" },
                ],
              },
              {
                t: "constraints",
                c: [
                "จำนวน node อยู่ระหว่าง 0 ถึง 1000",
                "-10^9 <= Node.val <= 10^9",
                "-1000 <= targetSum <= 1000",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ prefix sum (ผลรวมสะสมจาก root ลงมาถึง node ปัจจุบัน) เก็บความถี่ไว้ใน hash map ระหว่าง traverse DFS — เป็นเทคนิคเดียวกับ prefix sum บน array แต่ทำบน path ของต้นไม้" },
              { t: "p", c: "วิธีช้าแบบตรง ๆ คือ: ที่ทุก node ลองเดินลงทุกเส้นทางที่เริ่มจาก node นั้นแล้วบวกดู ซึ่งเป็น O(n^2) เพราะแต่ละ node ถูกบวกซ้ำหลายรอบ การใช้ prefix sum ยุบให้เหลือ O(n) โดยตอบคำถามได้ทันทีว่า \"มีจุดเริ่มก่อนหน้ากี่จุดที่ทำให้ช่วงจนถึงตอนนี้รวมได้ targetSum\"" },
              { t: "ol", c: [
                "ตั้ง hash map prefix นับความถี่ของผลรวมสะสม เริ่มด้วย prefix[0] = 1 (จุดก่อนเริ่มเดิน)",
                "เดิน DFS พก curr = ผลรวมสะสมถึง node ปัจจุบัน",
                "ที่แต่ละ node บวก node.val เข้า curr",
                "นับเพิ่ม prefix[curr - targetSum] = จำนวนจุดเริ่มก่อนหน้าที่ทำให้ช่วงรวมพอดี",
                "เพิ่ม prefix[curr] += 1 แล้วเรียกลูกซ้าย ลูกขวา",
                "ก่อนถอยขึ้น (backtrack) ลด prefix[curr] -= 1 เอาผลรวมของเส้นนี้ออก",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ลืมบรรทัด backtrack prefix[curr] -= 1 ก่อนกลับขึ้น — จะทำให้ผลรวมของกิ่งหนึ่งไปปนกับกิ่งพี่น้องที่ไม่ได้อยู่บนเส้นทางเดียวกัน นับเกินทันที และเพราะมีค่าติดลบจึงใช้วิธี early-stop แบบ two-sum ตรง ๆ ไม่ได้ ต้องนับความถี่ด้วย hash map" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ class นี้มาให้แล้ว ที่เขียนไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


from collections import defaultdict

def pathSum(root, targetSum):
    prefix = defaultdict(int)   # นับว่าผลรวมสะสมค่าหนึ่ง ๆ เคยเจอมากี่ครั้ง
    prefix[0] = 1               # ผลรวม 0 มีอยู่ 1 ครั้ง (จุดก่อนเริ่มเดิน)

    def dfs(node, curr):
        if node is None:
            return 0
        curr += node.val                    # ผลรวมสะสมถึง node นี้
        # มีจุดเริ่มก่อนหน้ากี่จุดที่ทำให้ช่วง (จุดนั้น, ตอนนี้] = targetSum
        count = prefix[curr - targetSum]
        prefix[curr] += 1                   # บันทึกผลรวมสะสมนี้ก่อนลงลูก
        count += dfs(node.left, curr)
        count += dfs(node.right, curr)
        prefix[curr] -= 1                   # ถอยออก (backtrack) ก่อนกลับขึ้น
        return count

    return dfs(root, 0)

# ต้นไม้ [10, 5, -3, 3, 2, null, 11] กับเป้า 8
root = TreeNode(10,
                TreeNode(5, TreeNode(3), TreeNode(2)),
                TreeNode(-3, None, TreeNode(11)))
print(pathSum(root, 8))`, out: `2` },
                { t: "p", c: "หลักการ prefix sum: ถ้าผลรวมสะสมจาก root ถึง node ปัจจุบันคือ curr และเราอยากได้ช่วงที่รวมเป็น targetSum ก็แค่ถามว่า \"เคยมีผลรวมสะสม curr - targetSum อยู่ก่อนหน้ากี่ครั้งบนเส้นทางนี้\" ทุกครั้งที่เคยเจอ = หนึ่งเส้นทางที่ใช้ได้ ที่ต้อง prefix[0] = 1 เพราะครอบกรณีเส้นทางที่เริ่มตั้งแต่ root พอดี" },
                { t: "p", c: "จุดพลาดสำคัญที่สุดคือบรรทัด backtrack (prefix[curr] -= 1) เมื่อเดินลูกของ node นี้เสร็จหมดแล้วกำลังจะถอยขึ้น เราต้องลบผลรวมสะสมนี้ออก ไม่งั้นมันจะไปปนกับเส้นทางฝั่งพี่น้องอีกกิ่งที่ไม่ได้อยู่บนเส้นทางเดียวกัน ทำให้นับเกิน อีกจุดคือค่าติดลบทำให้ใช้วิธี early-stop แบบ two-sum ตรง ๆ ไม่ได้ ต้องพึ่ง hash map นับความถี่แบบนี้" },
                { t: "p", c: "Time O(n) แตะทุก node ครั้งเดียว การค้น/อัปเดต hash map เป็น O(1) เฉลี่ย · Space O(n) จากขนาด hash map และความลึก call stack" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "prefix sum + hash map นับ subarray/path ที่รวมเท่าเป้า ใช้ได้ทั้งบนลิสต์และบนเส้นทางของต้นไม้ กุญแจคือ backtrack เมื่อออกจากเส้นทาง" },
      ],
      en: [],
    },
  },

  "lc75-p37": {
    slug: "lc75-p37",
    title: { th: "ข้อ 37 · LC1372 Longest ZigZag Path in a Binary Tree (ทางซิกแซกยาวสุด) 🟡", en: "" },
    lead: { th: "หาความยาวเส้นทางที่สลับซ้าย-ขวาทุกก้าว ด้วย DFS ที่พกทิศและความยาวสะสม", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC1372): กำหนด root ของ binary tree มาให้ นิยาม ZigZag path ว่าคือการเลือก node หนึ่งใด ๆ ในต้นไม้พร้อมทิศทางเริ่มต้น (ซ้ายหรือขวา) จากนั้นถ้าทิศปัจจุบันคือขวา ให้ก้าวไป right child ถ้าเป็นซ้ายให้ก้าวไป left child แล้วสลับทิศ ทำซ้ำแบบนี้ไปเรื่อย ๆ จนกว่าจะก้าวต่อไม่ได้ ความยาวของ ZigZag path คือจำนวน node ที่ผ่านทั้งหมดลบหนึ่ง (node เดี่ยว ๆ มีความยาว 0) ให้ return ความยาวของ ZigZag path ที่ยาวที่สุดในต้นไม้" },
              {
                t: "example",
                c: [
                  { input: "root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]", output: "3", explain: "เส้นทางซิกแซกที่ยาวสุดสลับทิศ ขวา → ซ้าย → ขวา รวม 3 ก้าว (edge)" },
                  { input: "root = [1,1,1,null,1,null,null,1,1,null,1]", output: "4", explain: "เส้นทางซิกแซกที่ยาวสุดสลับทิศ ซ้าย → ขวา → ซ้าย → ขวา รวม 4 ก้าว" },
                  { input: "root = [1]", output: "0", explain: "มีแค่ root ตัวเดียว ก้าวต่อไม่ได้เลย ความยาวจึงเป็น 0" },
                ],
              },
              {
                t: "constraints",
                c: [
                "จำนวน node อยู่ระหว่าง 1 ถึง 5 × 10^4",
                "1 <= Node.val <= 100",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ DFS ที่แต่ละ node track (ติดตามค่า) 2 อย่าง: ทิศที่กำลังจะไปต่อ (go_left) กับ length สะสมมาถึงตอนนี้ ถ้าเดินตามทิศที่ควรไปก็ +1 ต่อ length ถ้าเดินอีกทางก็ถือว่า reset (รีเซ็ต) เริ่มซิกแซกเส้นใหม่ที่ length 1" },
              { t: "ol", c: [
                "ตั้งตัวแปร ans = 0 เก็บคำตอบ (ใช้ nonlocal ในฟังก์ชันย่อย)",
                "เขียน dfs(node, go_left, length): ถ้า node เป็น None ก็ return",
                "อัปเดต ans = max(ans, length) ที่ทุก node ที่แวะ",
                "ถ้า go_left: ไปซ้ายต่อความยาว (length+1, หน้าไปขวา) และไปขวาเริ่มใหม่ (length 1)",
                "ถ้าไม่: ไปขวาต่อความยาว (length+1, หน้าไปซ้าย) และไปซ้ายเริ่มใหม่ (length 1)",
                "เรียก dfs จาก root สองครั้ง: เริ่มด้วยไปซ้าย และเริ่มด้วยไปขวา",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "สับสนว่านับ node หรือนับ edge — โจทย์นับ edge (ก้าว) จึงเริ่มที่ length 0 ที่ root และต้อง update ans ที่ทุก node ที่แวะ (ไม่ใช่เฉพาะตอนจบ) เพราะเส้นซิกแซกที่ดีสุดอาจจบกลางต้นไม้ก็ได้" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ class นี้มาให้แล้ว ที่เขียนไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def longestZigZag(root):
    ans = 0

    def dfs(node, go_left, length):
        nonlocal ans
        if node is None:
            return
        ans = max(ans, length)          # อัปเดตคำตอบทุก node ที่แวะ
        if go_left:
            dfs(node.left, False, length + 1)  # ไปซ้ายตามแผน -> ต่อความยาว, หน้าไปขวา
            dfs(node.right, True, 1)            # ไปขวาแทน = เริ่มเส้นใหม่ยาว 1
        else:
            dfs(node.right, True, length + 1)  # ไปขวาตามแผน -> ต่อความยาว, หน้าไปซ้าย
            dfs(node.left, False, 1)           # ไปซ้ายแทน = เริ่มเส้นใหม่ยาว 1

    # เริ่มจาก root ได้ทั้งเริ่มด้วยการไปซ้าย และเริ่มด้วยการไปขวา
    dfs(root, True, 0)
    dfs(root, False, 0)
    return ans

# ต้นไม้ที่มีเส้นซิกแซก ขวา -> ซ้าย -> ขวา
root = TreeNode(1, None, TreeNode(1, TreeNode(1, None, TreeNode(1))))
print(longestZigZag(root))
print(longestZigZag(TreeNode(1)))   # มี node เดียว ยาว 0`, out: `3
0` },
                { t: "p", c: "พารามิเตอร์ go_left บอกว่า \"ก้าวต่อไปที่จะทำให้ซิกแซกยังต่อเนื่องคือไปทางซ้าย\" ถ้าเราไปตามทางนั้นจริงก็ต่อความยาว (length + 1) แล้วสลับความคาดหวังเป็นไปขวา (False) ในก้าวถัดไป แต่ถ้าดันไปอีกทาง เส้นซิกแซกเก่าขาด กลายเป็นเริ่มต้นเส้นใหม่ที่ยาว 1 เราเรียก dfs จาก root สองครั้งเพราะเส้นซิกแซกที่ดีที่สุดอาจเริ่มด้วยการก้าวไปซ้ายหรือขวาก็ได้" },
                { t: "p", c: "จุดพลาดที่พบบ่อยคือสับสนว่านับ node หรือนับเส้นเชื่อม โจทย์นับเส้นเชื่อม (ก้าว) ดังนั้นเริ่มที่ length 0 ที่ root และอัปเดต ans ที่ทุก node ที่แวะ (ไม่ใช่เฉพาะตอนจบ) เพราะเส้นซิกแซกที่ดีสุดอาจจบกลางต้นไม้ก็ได้" },
                { t: "p", c: "Time O(n) แตะทุก node ครั้งเดียว · Space O(h) จากความลึก call stack ตามความสูงต้นไม้" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "เมื่อเส้นทางมี \"สถานะที่สลับไปมา\" (ทิศ, สี, ขึ้น/ลง) ให้ส่งสถานะนั้นเป็นพารามิเตอร์ของ DFS และรีเซ็ตความยาวเมื่อทำสถานะขาด" },
      ],
      en: [],
    },
  },

  "lc75-p38": {
    slug: "lc75-p38",
    title: { th: "ข้อ 38 · LC236 Lowest Common Ancestor of a Binary Tree (บรรพบุรุษร่วมต่ำสุด) 🟡", en: "" },
    lead: { th: "หา lowest common ancestor ของสอง node ด้วย DFS แบบ postorder ที่ให้ลูกรายงานขึ้นมา", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC236): กำหนด binary tree มาให้ ให้หา lowest common ancestor (LCA, บรรพบุรุษร่วมต่ำสุด) ของ node สองตัวคือ p และ q ในต้นไม้นั้น โดยนิยามว่า LCA ของ node p และ q คือ node ที่อยู่ต่ำสุดใน tree ซึ่งมีทั้ง p และ q เป็น descendant (ลูกหลาน) ของมัน (โดยอนุญาตให้ node หนึ่งเป็น descendant ของตัวเองได้ด้วย)" },
              {
                t: "example",
                c: [
                  { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", output: "3", explain: "LCA ของ node 5 และ node 1 คือ node 3 เพราะทั้งสองแยกอยู่คนละฝั่งของ root" },
                  { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4", output: "5", explain: "node 5 เป็นบรรพบุรุษของ node 4 อยู่แล้ว (4 อยู่ใต้ต้นย่อยของ 5) ตามนิยาม node จึงเป็น ancestor ของตัวเองได้ คำตอบคือ 5" },
                ],
              },
              {
                t: "constraints",
                c: [
                "จำนวน node อยู่ระหว่าง 2 ถึง 10^5",
                "-10^9 <= Node.val <= 10^9",
                "ค่าใน node ไม่ซ้ำกัน",
                "p != q และทั้งคู่มีอยู่ในต้นไม้จริง",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ DFS แบบ postorder: traverse ค้นหา p และ q ถ้า node ปัจจุบันเจอ p (หรือ q) ให้ return ตัวเองขึ้นไป จากนั้นถ้า node ไหนได้รับรายงานว่า \"เจอของอยู่ทั้ง left subtree และ right subtree\" node นั้นแหละคือจุดที่สองคนมาบรรจบกัน = LCA" },
              { t: "ol", c: [
                "base case: ถ้า root เป็น None หรือ root คือ p หรือ q ให้ return root ขึ้นไป (สัญญาณ \"เจอที่นี่\")",
                "เรียก recursion ฝั่งซ้าย เก็บผลไว้ในตัวแปร left",
                "เรียก recursion ฝั่งขวา เก็บผลไว้ในตัวแปร right",
                "ถ้า left และ right ต่างก็ไม่ None (เจอทั้งสองฝั่ง) → node นี้คือ LCA return root",
                "ไม่งั้น return ฝั่งที่เจอ (left ถ้ามี ไม่งั้น right) ส่งต่อขึ้นไป",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "อย่าเทียบด้วยค่า (val) ให้เทียบด้วย identity (root is p) เพราะโจทย์ให้ node object มา และกรณีที่ p เป็นบรรพบุรุษของ q ต้องคืนถูก — โค้ดนี้คืนถูกเพราะเจอ p ก่อนแล้วคืนขึ้นไปเลย ไม่เดินลึกต่อ" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ class นี้มาให้แล้ว ที่เขียนไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def lowestCommonAncestor(root, p, q):
    # base case: ต้นว่าง หรือเจอ p/q พอดี ให้รายงาน node นี้ขึ้นไป
    if root is None or root is p or root is q:
        return root

    left = lowestCommonAncestor(root.left, p, q)    # ฝั่งซ้ายเจออะไรไหม
    right = lowestCommonAncestor(root.right, p, q)  # ฝั่งขวาเจออะไรไหม

    # เจอทั้งสองฝั่ง -> node นี้คือจุดบรรจบ = LCA
    if left and right:
        return root
    # เจอฝั่งเดียว -> ส่งฝั่งที่เจอต่อขึ้นไป (อีกฝั่งเป็น None)
    return left if left else right

# ต้นไม้ [3, 5, 1, 6, 2, 0, 8]
n5 = TreeNode(5, TreeNode(6), TreeNode(2))
n1 = TreeNode(1, TreeNode(0), TreeNode(8))
root = TreeNode(3, n5, n1)
print(lowestCommonAncestor(root, n5, n1).val)          # 5 กับ 1 อยู่คนละฝั่ง
print(lowestCommonAncestor(root, n5, n5.left).val)     # 6 อยู่ใต้ 5`, out: `3
5` },
                { t: "p", c: "คิดแบบ postorder: ให้ลูกสองฝั่งรายงานก่อนว่าเจอ p หรือ q ไหม base case คือถ้า node ปัจจุบันคือ p หรือ q เอง (หรือเป็น None) ก็คืน node นั้นขึ้นไปเป็นสัญญาณว่า \"เจอที่นี่\" เมื่อ node หนึ่งได้ผลว่าฝั่งซ้ายเจอหนึ่งตัวและฝั่งขวาเจออีกหนึ่งตัว แสดงว่า p กับ q แยกกันอยู่คนละฝั่งของ node นี้พอดี node นี้จึงเป็นบรรพบุรุษร่วมที่ต่ำสุด" },
                { t: "p", c: "ถ้าเจอแค่ฝั่งเดียว (อีกฝั่ง None) แปลว่าทั้ง p และ q อยู่ในฝั่งนั้นทั้งคู่ (หรือเจอแค่ตัวเดียว) เราแค่ส่งผลฝั่งที่เจอต่อขึ้นไปให้บรรพบุรุษที่สูงกว่าตัดสิน กรณีที่ p เป็นบรรพบุรุษของ q อยู่แล้ว จะได้ผลถูกเพราะเราเจอ p ก่อนแล้วคืนขึ้นไปเลย ไม่เดินลึกต่อ" },
                { t: "p", c: "Time O(n) กรณีแย่สุดแตะทุก node ครั้งเดียว · Space O(h) จากความลึก call stack ตามความสูงต้นไม้" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "postorder \"รายงานขึ้นไป\": ให้ลูกส่งสัญญาณว่าเจอเป้าหมายไหม แล้ว node ที่ได้สัญญาณจากทั้งสองฝั่งพร้อมกันคือจุดบรรจบ — ใช้กับโจทย์หา ancestor/จุดตัดได้ทั่วไป" },
      ],
      en: [],
    },
  },
};
