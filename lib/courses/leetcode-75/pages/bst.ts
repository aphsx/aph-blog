import type { Page } from "@/lib/types";

export const bstPages: Record<string, Page> = {
  "lc75-intro-bst": {
    slug: "lc75-intro-bst",
    title: {
      th: "Binary Search Tree — จากกฎเดียวจนพร้อมลุย LeetCode",
      en: "",
    },
    lead: {
      th: "ต้นไม้ที่จัดค่าไว้เป็นระเบียบ: ซ้ายเล็กกว่า ขวาใหญ่กว่า — search / insert / delete ได้ใน O(h) โดยไม่ต้องไล่ทุกโหนด",
      en: "",
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
          c: "จำแค่นี้ก็เดิน BST ได้ทั้งหมวด — และกฎนี้ต้องจริงกับทุกโหนด ไม่ใช่แค่ root",
        },
        {
          t: "code",
          lang: "text",
          c: `ถูกต้อง                          ผิด (ดูที่ 5)
        5                              5
       / \\                            / \\
      3   8                          3   8
     / \\   \\                        / \\   \\
    2   4   9                      2   6   9
                                     ↑
                              6 อยู่ซ้ายของ 5 แต่ 6 > 5
                              แม้ 6 > 3 ก็ตาม — กฎพังที่บรรพบุรุษ`,
        },
        {
          t: "callout",
          title: "กับดัก: เช็กแค่ลูกชั้นเดียวไม่พอ",
          warn: true,
          c: "หลายคนคิดว่าแค่ left.val < node.val < right.val ก็พอ — ไม่ใช่ ค่าทั้งก้อนของ subtree ซ้ายต้องน้อยกว่า และทั้งก้อนของ subtree ขวาต้องมากกว่า ตัวอย่างขวามือ 6 เป็นลูกขวาของ 3 (ถูกชั้นนั้น) แต่ไปโผล่ในฝั่งซ้ายของ 5 ซึ่งผิดกฎของ 5",
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
          c: "อย่าท่องรูปสำเร็จรูป มาปลูกเองจากลิสต์ [5, 3, 8, 2, 4, 9] จะเห็นกฎทำงานทีละก้าว",
        },
        {
          t: "p",
          c: "ขั้นที่ 1: ใบแรกเป็น root เสมอ",
        },
        {
          t: "code",
          lang: "text",
          c: `ใส่ 5

        5`,
        },
        {
          t: "p",
          c: "ขั้นที่ 2: 3 < 5 → แขวนซ้าย",
        },
        {
          t: "code",
          lang: "text",
          c: `ใส่ 3

        5
       /
      3`,
        },
        {
          t: "p",
          c: "ขั้นที่ 3: 8 > 5 → แขวนขวา · แล้ว 2 < 5 จึงลงซ้าย ต่อด้วย 2 < 3 จึงแขวนซ้ายของ 3",
        },
        {
          t: "code",
          lang: "text",
          c: `ใส่ 8 แล้ว 2

        5
       / \\
      3   8
     /
    2`,
        },
        {
          t: "p",
          c: "ขั้นที่ 4: 4 อยู่ระหว่าง 3 กับ 5 → ลงซ้ายที่ 5 แล้วไปขวาของ 3 · 9 > 5 และ > 8 → แขวนขวาของ 8",
        },
        {
          t: "codeout",
          lang: "python",
          label: "ประกอบต้น [5, 3, 8, 2, 4, 9] ด้วยมือ",
          code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

root = TreeNode(5)
root.left = TreeNode(3, TreeNode(2), TreeNode(4))
root.right = TreeNode(8, None, TreeNode(9))

print(root.val)            # 5
print(root.left.right.val) # 4  (ขวาของ 3)
print(root.right.right.val)# 9`,
          out: `5
4
9`,
        },

        { t: "h2", c: "5. ของแถมฟรี: in-order ของ BST = ค่าเรียงน้อย→มาก" },
        {
          t: "p",
          c: "เดินซ้ายให้สุด แล้วแตะตัวเอง แล้วไปขวา — เพราะค่าน้อยอยู่ซ้าย ค่ามากอยู่ขวา ลำดับที่ได้จึงเรียงเองโดยไม่ต้อง sort",
        },
        {
          t: "codeout",
          lang: "python",
          label: "in-order บน BST ที่ปลูกไว้",
          code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(node):
    if node is None:
        return []
    return inorder(node.left) + [node.val] + inorder(node.right)

root = TreeNode(5)
root.left = TreeNode(3, TreeNode(2), TreeNode(4))
root.right = TreeNode(8, None, TreeNode(9))
print(inorder(root))`,
          out: `[2, 3, 4, 5, 8, 9]`,
        },
        {
          t: "callout",
          title: "ใช้ตรวจ BST ได้",
          c: "ถ้า in-order ไม่ออกมาเรียงจากน้อยไปมาก ต้นนั้นไม่ใช่ BST — เคล็ดนี้โผล่ในโจทย์ Validate BST ด้วย",
        },

        { t: "h2", c: "6. Search — ตัดครึ่งทิ้งทุกก้าว" },
        {
          t: "p",
          c: "เริ่มที่ root เทียบกับค่าที่หา เล็กกว่า → ไปซ้าย (ฝั่งขวาใหญ่กว่าหมด ทิ้งได้) ใหญ่กว่า → ไปขวา เท่ากัน → เจอ ตกขอบ → ไม่มี",
        },
        {
          t: "code",
          lang: "python",
          label: "template ค้นหาแบบวนลูป — ท่องไว้ใช้ทั้งหมวด",
          c: `def search(root, target):
    node = root
    while node:
        if target == node.val:
            return node          # เจอแล้ว คืนโหนดนั้นทั้งก้อน
        if target < node.val:
            node = node.left     # ทิ้งฝั่งขวา
        else:
            node = node.right    # ทิ้งฝั่งซ้าย
    return None                  # ตกขอบ = ไม่มี`,
        },
        {
          t: "p",
          c: "แต่ละก้าวลงลึกหนึ่งชั้น ไม่เคยย้อน — เวลาจึงเป็น O(h) ถ้าต้นสมดุล h ≈ log n ถ้าเอียง h = n",
        },

        { t: "h2", c: "7. Insert — search จนตกขอบ แล้วแขวนใบใหม่" },
        {
          t: "p",
          c: "แทรกคือค้นหาตำแหน่งที่ค่าควรอยู่ พอเดินจนโหนดกลายเป็น None นั่นแหละที่แขวน เขียนแบบ recursion จะต่อกิ่งกลับขึ้นมาให้อัตโนมัติ:",
        },
        {
          t: "code",
          lang: "python",
          label: "insert คืน root ของต้นหลังแทรก",
          c: `def insert(root, val):
    if root is None:
        return TreeNode(val)          # ตกขอบแล้ว — ปลูกใบใหม่ตรงนี้
    if val < root.val:
        root.left = insert(root.left, val)
    elif val > root.val:
        root.right = insert(root.right, val)
    return root                       # ค่าซ้ำ: ไม่ทำอะไร (โจทย์นี้ค่าไม่ซ้ำ)`,
        },
        {
          t: "callout",
          title: "ทำไมต้อง root.left = insert(...) ?",
          c: "ถ้าลืมเอาค่าที่คืนมาต่อกลับ กิ่งใหม่จะลอยไม่ผูกกับต้น เทคนิคนี้ข้อ 42 (ลบโหนด) ใช้เหมือนกันทุกประการ",
        },

        { t: "h2", c: "8. Delete — แยก 3 กรณี (พรีวิวข้อ 42)" },
        {
          t: "p",
          c: "ลบยากกว่าค้นเพราะต้องคงกฎ BST ไว้ เจอโหนดแล้วดูว่ามีลูกกี่ตัว",
        },
        {
          t: "table",
          head: ["กรณี", "ลูก", "ทำอะไร"],
          rows: [
            ["ใบ (leaf)", "0", "ตัดทิ้ง — คืน None ขึ้นไปแทน"],
            ["ลูกเดียว", "1", "ยกลูกที่มีอยู่ขึ้นมาแทนตำแหน่งนี้"],
            ["ลูกสองตัว", "2", "ห้ามตัดตรง ๆ — เอา successor (ค่าน้อยสุดฝั่งขวา) มาแทนค่า แล้วไปลบ successor ตัวเดิม ซึ่งจะกลายเป็นกรณีง่าย"],
          ],
        },
        {
          t: "code",
          lang: "text",
          c: `ลบ 3 จากต้นนี้ (กรณีลูกสองตัว)

        5                              5
       / \\                            / \\
      3   6         ⇒                4   6
     / \\   \\                        /     \\
    2   4   7                      2       7

successor ของ 3 = 4 (น้อยสุดฝั่งขวาของ 3)
เอา 4 มาเขียนทับ 3 แล้วตัด 4 เดิมทิ้ง`,
        },
        {
          t: "p",
          c: "ทำไม 4 ถึงมาแทน 3 ได้? เพราะ 4 มากกว่าทุกตัวในฝั่งซ้ายของ 3 และน้อยกว่าทุกตัวที่เหลือในฝั่งขวา — วางแทนแล้วกฎ left < node < right ยังอยู่ ข้อ 42 จะไล่โค้ดนี้ทีละบรรทัด",
        },

        { t: "h2", c: "9. ทำไมบางที O(log n) บางที O(n)" },
        {
          t: "p",
          c: "ความเร็วของ search / insert / delete ทั้งหมดผูกกับ height ไม่ใช่จำนวนโหนด",
        },
        {
          t: "code",
          lang: "text",
          c: `สมดุล (h ≈ log n)                 เอียง (h = n)
ใส่ 4, 2, 6, 1, 3                  ใส่ 1, 2, 3, 4 ตามลำดับ

        4                                1
       / \\                                \\
      2   6                                2
     / \\                                    \\
    1   3                                    3
                                               \\
                                                4

ค้น 3: ลง 2 ชั้น                         ค้น 4: ลง 4 ชั้น = ไล่ทั้งเส้น`,
        },
        {
          t: "table",
          head: ["operation", "เฉลี่ย (สมดุล)", "แย่สุด (เอียง)"],
          rows: [
            ["search", "O(log n)", "O(n)"],
            ["insert", "O(log n)", "O(n)"],
            ["delete", "O(log n)", "O(n)"],
          ],
        },
        {
          t: "callout",
          title: "LeetCode 75 ไม่บังคับให้บาลานซ์",
          c: "AVL / Red-Black tree คือ BST ที่หมุนต้นให้สมดุลอัตโนมัติ — นอกขอบเขตหมวดนี้ ข้อในคอร์สรับประกันแค่ว่าต้นเป็น BST และวัดความเร็วเป็น O(h)",
        },

        { t: "h2", c: "10. สัญญาณว่าโจทย์ข้อนี้เล่นกับ BST" },
        {
          t: "ul",
          c: [
            "โจทย์บอกตรง ๆ ว่า input เป็น BST / binary search tree",
            "ถามค้นค่า / แทรก / ลบ โดยยังคงลำดับไว้",
            "in-order แล้วได้ค่าเรียง — ใช้เป็น invariant ได้",
            "อย่าสับสนกับ binary tree ทั่วไป: ถ้าไม่มีกฎเรียงค่า ให้ใช้ DFS/BFS ตามหมวดก่อน ไม่ใช่ท่าตัดครึ่งนี้",
          ],
        },
        {
          t: "callout",
          title: "ประโยคท่องจำก่อนลุยโจทย์",
          c: "เล็กกว่าไปซ้าย ใหญ่กว่าไปขวา — ลบโหนดที่มีลูกสองตัว ห้ามตัดทิ้ง ต้องยืม successor มาแทน",
        },
        {
          t: "links",
          c: [
            {
              title: "ถัดไป: ข้อ 41 · Search in a BST →",
              slug: "lc75-p41",
              desc: "ใช้กฎ left < node < right เดินลงต้น ตัดครึ่งที่ไม่เกี่ยวทิ้งทุกก้าว",
            },
          ],
        },
      ],
      en: [],
    },
  },

  "lc75-p41": {
    slug: "lc75-p41",
    title: { th: "ข้อ 41 · LC700 Search in a Binary Search Tree (ค้นหาใน BST) 🟢", en: "" },
    lead: {
      th: "เดินลงต้นด้วยกฎ left < node < right เจอแล้วคืนทั้ง subtree — ไม่ต้องไล่ทุกโหนด",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "กำหนด root ของ Binary Search Tree และเลขจำนวนเต็ม val ให้หาโหนดที่ค่าเท่ากับ val แล้ว return subtree ที่มีโหนดนั้นเป็น root (คืนโหนดนั้นทั้งก้อน รวมลูกทั้งหมด) ถ้าไม่มีให้ return null",
        },
        {
          t: "example",
          c: [
            {
              input: "root = [4,2,7,1,3], val = 2",
              output: "[2,1,3]",
              explain: "เจอโหนด 2 ซึ่งมีลูกซ้าย 1 และลูกขวา 3 — คืนทั้งก้อนนี้ ไม่ใช่แค่ตัวเลข 2",
            },
            {
              input: "root = [4,2,7,1,3], val = 5",
              output: "[]",
              explain: "เดิน 4 → 7 แล้วตกขอบขวา ไม่มี 5 ในต้น",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวนโหนดอยู่ในช่วง [1, 5000]",
            "1 <= Node.val <= 10^7",
            "1 <= val <= 10^7",
            "root เป็น BST จริง (โจทย์การันตี)",
          ],
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: 'ข้อนี้ตรงกับประโยคท่องจำ: "เล็กกว่าไปซ้าย ใหญ่กว่าไปขวา"',
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "วิธีช้าคือ DFS/BFS ไล่ทุกโหนดจนเจอ — ถูกแต่ O(n) และทิ้งของฟรีที่โจทย์ให้มา คือต้นนี้เรียงค่าไว้แล้ว",
            },
            {
              t: "p",
              c: "หัวใจ: ทุกครั้งที่เทียบค่า เราทิ้งได้ทั้งกิ่งที่ไม่เกี่ยว เหมือน binary search บน array แต่เดินลง pointer แทนการกระโดด index",
            },
            {
              t: "p",
              c: "โจทย์ขอ subtree ไม่ใช่แค่ค่า — พอเจอโหนด ให้ return โหนดนั้นเลย ลูกของมันติดมาเอง",
            },

            { t: "h3", c: "2. กฎเหล็ก (The Logic)" },
            {
              t: "ol",
              c: [
                "ตั้ง node = root",
                "ตราบใดที่ node ยังไม่เป็น None — เทียบ val กับ node.val",
                "เท่ากัน → return node (ทั้งก้อน)",
                "val เล็กกว่า → node = node.left (ฝั่งขวาทิ้ง)",
                "val ใหญ่กว่า → node = node.right (ฝั่งซ้ายทิ้ง)",
                "หลุดลูป = ตกขอบ → return None",
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
    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        node = root
        while node:
            if val == node.val:
                return node
            if val < node.val:
                node = node.left
            else:
                node = node.right
        return None`,
            },
            {
              t: "p",
              c: "แบบ recursion ก็ได้ ผลเหมือนกัน แต่กิน call stack O(h) — แบบลูปใช้ตัวแปรเดียว",
            },
            {
              t: "code",
              lang: "python",
              label: "อีกแบบ · recursion",
              c: `def searchBST(self, root, val):
    if root is None or root.val == val:
        return root
    if val < root.val:
        return self.searchBST(root.left, val)
    return self.searchBST(root.right, val)`,
            },

            { t: "h3", c: "3.5 ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** ไล่ค้น val = 2 จากต้น [4, 2, 7, 1, 3] · โหนดจาง = กิ่งที่ตัดทิ้งแล้ว · วงแหวนเขียว = เจอแล้วคืนทั้งก้อน",
            },
            { t: "viz", id: "bst-search" },

            { t: "h3", c: "4. จำลองการทำงาน — หา 2 จาก [4,2,7,1,3]" },
            {
              t: "code",
              lang: "text",
              c: `        4
       / \\
      2   7
     / \\
    1   3`,
            },
            {
              t: "table",
              head: ["ก้าว", "node", "เทียบ", "ทิศ", "กิ่งที่ทิ้ง"],
              rows: [
                ["เริ่ม", "4", "2 == 4? ไม่", "2 < 4 → ซ้าย", "ทั้งฝั่ง 7"],
                ["2", "2", "2 == 2? ใช่", "เจอแล้ว", "—"],
                ["คืน", "2", "ทั้งก้อน", "[2, 1, 3]", "—"],
              ],
            },
            {
              t: "p",
              c: "เคสหา 5: 4 → 7 (5 > 4) → 7 ไม่มีลูกซ้ายที่ใช่ (5 < 7 แต่ left เป็น None) → return None",
            },

            { t: "h3", c: "5. จุดระวังตกหลุมพราง" },
            {
              t: "ul",
              c: [
                "คืน node.val แทน node — โจทย์อยากได้ subtree ไม่ใช่ตัวเลข",
                "เขียน if val < node.val: node.left โดยไม่ใส่ node = ... — pointer ไม่ขยับ ลูปค้าง",
                "ลืม return None ตอนตกขอบ — แบบ while node: หลุดลูปแล้วต้องคืนเอง",
              ],
            },
            {
              t: "callout",
              title: "อย่า DFS ทั้งต้น",
              warn: true,
              c: "ถ้าเขียน stack/queue ไล่ทุกโหนด คำตอบถูกแต่ช้า และ interviewer จะถามทันทีว่าทำไมไม่ใช้ความเป็น BST",
            },

            { t: "h3", c: "6. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(h) — ลงหนึ่งชั้นต่อก้าว สูงสุดเท่าความสูง",
                "Space O(1) แบบลูป · O(h) แบบ recursion จาก call stack",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "เมื่อโจทย์ให้ BST มา ให้คิดถึงการเดินลงต้น เทียบแล้วเลือกทิศ — ท่านี้ใช้ซ้ำกับ insert และเป็นขั้นแรกของ delete ในข้อถัดไป",
            },
          ],
        },
      ],
      en: [],
    },
  },

  "lc75-p42": {
    slug: "lc75-p42",
    title: { th: "ข้อ 42 · LC450 Delete Node in a BST (ลบโหนดใน BST) 🟡", en: "" },
    lead: {
      th: "ลบโหนดแล้วยังคงกฎ BST — ใบตัดทิ้ง ลูกเดียวยกขึ้น ลูกสองตัวยืม successor มาแทน",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "กำหนด root ของ BST และค่า key ให้ลบโหนดที่ค่าเท่ากับ key ออก โดยต้องคง property ของ BST (left < node < right) แล้ว return root ของต้นหลังลบ ถ้าไม่พบ key ให้คืนต้นเดิม",
        },
        {
          t: "example",
          c: [
            {
              input: "root = [5,3,6,2,4,null,7], key = 3",
              output: "[5,4,6,2,null,null,7]",
              explain: "โหนด 3 มีลูกสองตัว จึงเอา successor (ค่าน้อยสุดฝั่งขวา = 4) มาแทน คำตอบอื่นที่ยังเป็น BST ก็ยอมรับได้",
            },
            {
              input: "root = [5,3,6,2,4,null,7], key = 0",
              output: "[5,3,6,2,4,null,7]",
              explain: "ไม่มี 0 ในต้น — ไม่เปลี่ยนอะไร",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "จำนวนโหนดอยู่ในช่วง [0, 10^4]",
            "-10^5 <= Node.val <= 10^5",
            "ค่าในโหนดไม่ซ้ำกัน",
            "root เป็น BST จริง",
            "-10^5 <= key <= 10^5",
          ],
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "p",
              c: 'ข้อนี้ต่อจากประโยคท่องจำข้อที่สอง: "ลบโหนดที่มีลูกสองตัว ห้ามตัดทิ้ง — ต้องยืม successor มาแทน"',
            },

            { t: "h3", c: "1. ปลดล็อกไอเดีย (Mindset Shift)" },
            {
              t: "p",
              c: "ค้นหาโหนดเหมือนข้อ 41 แต่พอเจอแล้วทิ้งไม่ได้ทันที — ต้องต่อกิ่งใหม่ให้ต้นไม่ขาดและกฎเรียงค่ายังอยู่",
            },
            {
              t: "p",
              c: "เคล็ด recursion: เขียน `root.left = delete(root.left, key)` แล้วรับโหนดที่ควรมาแทนตำแหน่งนั้นกลับขึ้นมา — ไม่ต้องเก็บ pointer ของแม่ไว้เอง",
            },
            {
              t: "p",
              c: "กรณีลูกสองตัวคือกับดัก: ตัด 3 ทิ้งจะเหลือ 2 กับ 4 กำพร้าสองก้อน ต่อไม่ถูก วิธีแก้คือไม่ลบกล่อง 3 จริง แค่เปลี่ยนค่าในกล่องเป็น successor แล้วไปลบกล่อง successor ตัวเดิม ซึ่งไม่มีลูกซ้ายแน่นอน จึงตกกรณีง่าย",
            },

            { t: "h3", c: "2. สามกรณีบนกระดาน" },
            {
              t: "code",
              lang: "text",
              c: `กรณี A — ใบ (ลูก 0)
ลบ 7                          ลบแล้ว
    6                             6
     \\
      7   →  คืน None ขึ้นไปแทน

กรณี B — ลูกเดียว
ลบ 6                          ลบแล้ว
    5                             5
     \\                             \\
      6                             7
       \\
        7  →  ยก 7 ขึ้นมาแทน 6

กรณี C — ลูกสองตัว (ของโจทย์)
ลบ 3                          ยืม 4 มาแทน แล้วตัด 4 เดิม
        5                             5
       / \\                           / \\
      3   6                         4   6
     / \\   \\                       /     \\
    2   4   7                     2       7`,
            },
            {
              t: "p",
              c: "successor = เดินขวาหนึ่งก้าว แล้วเดินซ้ายจนสุด — ค่าแรกที่มากกว่าโหนดนี้ใน in-order",
            },

            { t: "h3", c: "3. กฎเหล็ก (The Logic)" },
            {
              t: "ol",
              c: [
                "ถ้า root เป็น None → ไม่มีอะไรให้ลบ คืน None",
                "key < root.val → ลบในฝั่งซ้าย แล้วต่อกลับ root.left",
                "key > root.val → ลบในฝั่งขวา แล้วต่อกลับ root.right",
                "key == root.val → เจอแล้ว แยก 3 กรณีด้านบน",
                "ไม่มีซ้าย → คืนลูกขวาขึ้นมาแทน (ไม่มีลูกเลยก็เข้าเคสนี้ คืน None)",
                "ไม่มีขวา → คืนลูกซ้ายขึ้นมาแทน",
                "มีสองลูก → หา successor · คัดลอกค่า · ลบ successor ออกจากฝั่งขวา",
                "คืน root ขึ้นไปให้ชั้นบนต่อกิ่ง",
              ],
            },

            { t: "h3", c: "4. โค้ด Python (LeetCode Ready)" },
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
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if root is None:
            return None

        if key < root.val:
            root.left = self.deleteNode(root.left, key)
        elif key > root.val:
            root.right = self.deleteNode(root.right, key)
        else:
            if root.left is None:
                return root.right
            if root.right is None:
                return root.left

            succ = root.right
            while succ.left:
                succ = succ.left
            root.val = succ.val
            root.right = self.deleteNode(root.right, succ.val)

        return root`,
            },

            { t: "h3", c: "4.5 ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** ไล่ลบ key = 3 จากต้นตัวอย่าง · วงแหวนเขียวบน successor · จากนั้นค่า 3 ถูกเขียนทับเป็น 4 และใบ 4 เดิมหายไป",
            },
            { t: "viz", id: "bst-delete" },

            { t: "h3", c: "5. จำลองการทำงาน — ลบ 3" },
            {
              t: "table",
              head: ["ขั้น", "ยืนที่", "ทำอะไร", "ต้นตอนนี้"],
              rows: [
                ["1", "5", "3 < 5 → ลงซ้าย", "ยังเท่าเดิม"],
                ["2", "3", "เจอ key · มีลูกสองตัว", "2 และ 4 กำพร้าถ้าตัดทิ้ง"],
                ["3", "4", "succ = ขวาของ 3 แล้วไม่มีซ้าย", "successor = 4"],
                ["4", "3", "คัดลอก 4 มาทับค่า 3", "โหนดนี้แสดง 4 แต่ใบ 4 เดิมยังอยู่"],
                ["5", "4 เดิม", "ลบใบ → คืน None", "5 / 4,6 / 2, 7"],
              ],
            },
            {
              t: "p",
              c: "ตรวจด้วย in-order: ก่อนลบ [2, 3, 4, 5, 6, 7] · หลังลบ [2, 4, 5, 6, 7] — เรียงอยู่ แปลว่ายังเป็น BST",
            },

            { t: "h3", c: "6. จุดระวังตกหลุมพราง" },
            {
              t: "ul",
              c: [
                    "ลืม root.left = ... / root.right = ... — ลบในต้นย่อยแต่ไม่ต่อกลับ ต้นบนไม่เปลี่ยน",
                    "ลบโหนดสองลูกแล้วยกซ้ายขึ้นมาโดยไม่จัดการขวา — กิ่งขวาหลุด",
                    "คัดลอกค่า successor แล้วลืมไปลบ successor ตัวเดิม → ค่าซ้ำในต้น",
                    "หา successor ผิดทาง (เดินซ้ายก่อน) จะได้ predecessor ซึ่งใช้ได้เหมือนกันแต่ต้องลบฝั่งซ้าย ไม่ใช่ฝั่งขวา — อย่าปน",
              ],
            },
            {
              t: "callout",
              title: "จะใช้ predecessor ก็ได้",
              c: "ค่ามากสุดฝั่งซ้ายก็แทนได้เช่นกัน โจทย์รับทั้งสองแบบ — เลือกฝั่งเดียวแล้วทำให้ครบดีกว่าสลับไปมา",
            },

            { t: "h3", c: "7. Time & Space Complexity" },
            {
              t: "ul",
              c: [
                "Time O(h) — เดินหาโหนด + เดินหา successor รวมไม่เกินความสูง",
                "Space O(h) — call stack ของ recursion",
              ],
            },

            {
              t: "callout",
              title: "💡 สรุป pattern",
              c: "delete ใน BST = search ลงต้น + ต่อกิ่งด้วย root.child = recurse(...) · ลูกสองตัว = ยืม successor แล้วลบมันด้วยกรณีง่าย ท่านี้เจอซ้ำทุกครั้งที่ต้องถอนโหนดออกจากต้นเรียง",
            },
          ],
        },
      ],
      en: [],
    },
  },
};
