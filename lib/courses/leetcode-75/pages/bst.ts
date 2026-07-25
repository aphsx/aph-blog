import type { Page } from "@/lib/types";

export const bstPages: Record<string, Page> = {
  "lc75-intro-bst": {
    slug: "lc75-intro-bst",
    title: "Binary Search Tree — พื้นฐาน & แนวคิด",
    lead: "tree (ต้นไม้) ที่จัดค่าไว้เป็นระเบียบ ซ้ายเล็กกว่า ขวาใหญ่กว่า จึง search แทรก ลบ ได้เร็ว O(h)",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "หมวดนี้ว่าด้วย Binary Search Tree (BST) หรือต้นไม้ค้นหาแบบทวิภาค เป็น data structure (โครงสร้างข้อมูล) ที่ออกแบบมาเพื่อ search (ค้นหา) insert (แทรก) และ delete (ลบ) ค่าได้เร็ว เจอบ่อยเวลาต้องเก็บข้อมูลที่ต้องค้นหาซ้ำ ๆ และอยากได้ความเร็วดีกว่า array (ลิสต์) ธรรมดา ถ้าคุณรู้จัก binary search ใน array ที่ sort (เรียง) แล้วมาก่อน BST ก็คือไอเดียเดียวกันแต่ทำบน tree (ต้นไม้)" },

      { t: "h2", c: "BST คืออะไร" },
      { t: "p", c: "BST เป็น tree ที่แต่ละ node (โหนด) มี child (ลูก) ได้มากสุด 2 ตัว (ซ้ายกับขวา) แต่จุดเด่นที่ทำให้มันพิเศษกว่า tree ทั่วไปคือ มันจัดเรียงค่าไว้เป็นระเบียบตามกฎ ทำให้เรา search ค่าได้เร็วเหมือนตอนเปิดพจนานุกรม คือเปิดกลาง ๆ แล้วตัดสินใจว่าจะไปซ้ายหรือขวา ไม่ต้องไล่ดูทุก node" },
      { t: "p", c: "BST มีกฎเดียวที่ต้องจำ สำหรับทุก node ค่าใน subtree (ต้นไม้ย่อย) ทางซ้ายทั้งหมดต้อง น้อยกว่า ค่าของ node นั้น และค่าใน subtree ทางขวาทั้งหมดต้อง มากกว่า ค่าของ node นั้น พูดสั้น ๆ คือ left < node < right และกฎนี้เป็นจริงทุก node ไม่ใช่แค่ root (ราก) ต้นเดียว" },
      { t: "code", lang: "python", c: `# BST หน้าตาแบบนี้ (root = 5)
#         5
#        / \\
#       3   8
#      / \\   \\
#     2   4   9
#
# ทางซ้ายของ 5 (คือ 3,2,4) น้อยกว่า 5 ทั้งหมด
# ทางขวาของ 5 (คือ 8,9) มากกว่า 5 ทั้งหมด
# และกฎนี้จริงกับทุก node เช่น 3 มีซ้าย 2 (< 3) ขวา 4 (> 3)` },
      { t: "p", c: "เพราะมีกฎนี้ เวลาจะ search ค่าสักตัว เราเริ่มที่ root แล้ว compare (เทียบ) ถ้าค่าที่หาน้อยกว่า node ปัจจุบัน แปลว่ามันต้องอยู่ทางซ้าย (ทางขวาใหญ่กว่าหมดอยู่แล้ว ไม่ต้องดู) ถ้ามากกว่าก็ไปทางขวา ทำแบบนี้ไปเรื่อย ๆ แต่ละก้าวเราตัดครึ่งที่ต้องดูทิ้งไปเลย จึงใช้เวลาเท่ากับ height (ความสูง) ของ tree ไม่ใช่จำนวน node ทั้งหมด" },

      { t: "h2", c: "นิยาม node และ Big-O" },
      { t: "code", lang: "python", c: `# นิยาม node ของต้นไม้ (LeetCode ให้มาแบบนี้)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right` },
      { t: "table", head: ["operation", "เฉลี่ย (สมดุล)", "แย่สุด (เอียง)"], rows: [
        ["search (ค้นหา)", "O(log n)", "O(n)"],
        ["insert (แทรก)", "O(log n)", "O(n)"],
        ["delete (ลบ)", "O(log n)", "O(n)"],
      ] },
      { t: "code", lang: "python", c: `# template ค้นหาค่า target ใน BST แบบวนลูป — จำโครงนี้ไว้ใช้ได้
def search(root, target):
    node = root
    while node:
        if target == node.val:
            return node          # เจอแล้ว
        elif target < node.val:
            node = node.left     # ค่าเล็กกว่า ไปซ้าย
        else:
            node = node.right    # ค่าใหญ่กว่า ไปขวา
    return None                  # หาไม่เจอ` },
      { t: "callout", title: "ทำไม O(h) ไม่ใช่ O(n)", c: "h คือ height ของ tree (จำนวนชั้น) แต่ละก้าวเราลงลึกไปหนึ่งชั้นเสมอ ไม่เคยย้อนกลับ ถ้า tree สมดุลดี h ประมาณ log n การ search จึงเร็วมาก แต่ถ้า tree เอียงเป็นเส้นตรง (เช่น insert ค่าเรียงจากน้อยไปมาก) h จะกลายเป็น n และช้าลงเท่ากับ array ธรรมดา" },
      { t: "callout", c: "หมวดนี้มี 2 ข้อ search ใน BST และ delete node ใน BST พร้อมแล้วกดถัดไปเริ่มข้อแรกได้เลย" },
    ],
  },

  "lc75-p41": {
    slug: "lc75-p41",
    title: "ข้อ 41 · LC700 Search in a Binary Search Tree (ค้นหาใน BST) 🟢",
    lead: "ใช้กฎ left < node < right เดินลงต้นไม้ ตัดครึ่งที่ไม่เกี่ยวทิ้งทุกก้าว หาเจอใน O(h)",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ (Search in a Binary Search Tree) ให้ root (ราก) ของ BST มา และค่า val หนึ่งค่า ให้หา node (โหนด) ที่มีค่าเท่ากับ val แล้วคืน subtree (ต้นไม้ย่อย) ที่มี node นั้นเป็น root (คือคืนตัว node นั้นทั้งก้อน รวม child (ลูก) ทั้งหลายของมัน) ถ้าไม่มีให้คืน None" },
      { t: "ul", c: [
        "root = [4,2,7,1,3], val = 2 → คืน subtree ที่ root คือ node 2 (มี child 1 กับ 3)",
        "root = [4,2,7,1,3], val = 5 → คืน None เพราะไม่มีค่า 5 ในต้นไม้",
      ] },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "data structure ที่ใช้คือ BST เอง และเทคนิคคือ traverse (เดินไล่) ลง tree (ต้นไม้) โดยอาศัยกฎ left < node < right เลือกใช้วิธีนี้เพราะโจทย์การันตีว่าค่าถูก sort (เรียง) ไว้แล้ว เราจึงไม่ต้องเสียแรงดูทุก node" },
      { t: "p", c: "วิธีช้าแบบ brute force คือ iterate (วน) ดูทุก node ใน tree (traversal ธรรมดา) จนกว่าจะเจอค่า ซึ่งเป็น O(n) แต่มันไม่ใช้ประโยชน์จากการที่ค่า sort อยู่แล้วเลย ทั้งที่ทุกครั้งที่ compare (เทียบ) ค่าเราตัดครึ่งของ tree ที่เป็นไปไม่ได้ทิ้งได้ทันที นั่นนำไปสู่วิธีเดินลงข้างเดียวที่เร็วกว่ามาก" },
      { t: "ol", c: [
        "ตั้ง pointer (ตัวชี้) node ไว้ที่ root",
        "ถ้า node ยังไม่หลุดขอบ (ไม่ใช่ None) ให้ compare ค่า",
        "ถ้า val เท่ากับค่า node ปัจจุบัน เจอแล้ว คืน node นั้นทั้งก้อน",
        "ถ้า val น้อยกว่า ให้ขยับ node ไป child ซ้าย (ค่าเล็กกว่าอยู่ฝั่งซ้ายเสมอ)",
        "ถ้า val มากกว่า ให้ขยับ node ไป child ขวา",
        "ถ้าเดินจนหลุดขอบ tree (node เป็น None) แปลว่าไม่มี คืน None",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ลืมคืน None ตอนเดินจนตกขอบ (node กลายเป็น None) ทำให้โปรแกรม error โครงลูป while node จัดการให้แล้วเพราะมันหยุดเองเมื่อ node เป็น None" },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "code", lang: "python", c: `# class TreeNode:
#     def __init__(self, val=0, left=None, right=None): ...

def search_bst(root, val):
    node = root                  # เริ่มที่ราก
    while node:                  # ยังไม่หลุดขอบต้นไม้
        if val == node.val:
            return node          # เจอ node ที่ต้องการ คืนทั้ง subtree
        elif val < node.val:
            node = node.left     # ค่าที่หาเล็กกว่า ต้องอยู่ทางซ้าย
        else:
            node = node.right    # ค่าที่หาใหญ่กว่า ต้องอยู่ทางขวา
    return None                  # เดินจนตกขอบต้นไม้ แปลว่าไม่มี` },
        { t: "p", c: "ข้อนี้คือการนำกฎ BST มาใช้ตรง ๆ แทนที่จะ iterate ดูทุก node แบบ tree ทั่วไป (ซึ่งจะเป็น O(n)) เราใช้ความจริงที่ว่าค่าถูก sort ไว้แล้ว ทุกครั้งที่ compare เราตัดทิ้งครึ่งหนึ่งของ tree ที่เป็นไปไม่ได้ทันที เช่นถ้า val น้อยกว่า node ปัจจุบัน เราไม่มีทางเจอมันในฝั่งขวา (ฝั่งขวาใหญ่กว่าหมด) จึงไปซ้ายอย่างเดียว" },
        { t: "p", c: "จะเขียนแบบ recursion (การเรียกตัวเอง) ก็ได้ ผลเหมือนกัน แต่แบบ loop (วน) ประหยัด memory กว่าเพราะไม่ต้องใช้ call stack ถ้าเปลี่ยนเป็น recursion โค้ดจะสั้นลงแต่กิน memory เพิ่มตาม height (ความสูง)" },
        { t: "p", c: "Time O(h) traverse ลงจาก root ถึง leaf (ใบ) มากสุดเท่า height h · Space O(1) แบบ loop ใช้ตัวแปรเดียว (ถ้าเขียน recursion จะเป็น O(h) จาก call stack)" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "เมื่อโจทย์ให้ BST มา ให้คิดถึงการ traverse ลง tree โดย compare ค่าแล้วเลือกทิศ วิธีนี้ตัดปัญหาลงครึ่งทุกก้าว เอาไปใช้กับ search insert และ delete ใน BST ได้ทั้งหมด" },
    ],
  },

  "lc75-p42": {
    slug: "lc75-p42",
    title: "ข้อ 42 · LC450 Delete Node in a BST (ลบโหนดใน BST) 🟡",
    lead: "delete node แล้วยังคงกฎ BST แยกจัดการ 3 กรณี ไม่มี child มี child ตัวเดียว และมี child สองตัว",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ (Delete Node in a BST) ให้ root (ราก) ของ BST และค่า key ให้ delete (ลบ) node (โหนด) ที่มีค่าเท่ากับ key ออกจาก tree (ต้นไม้) โดยยังต้องคงกฎ BST ไว้ (left < node < right) แล้วคืน root ของ tree หลัง delete ถ้าไม่มี key ใน tree ก็คืน tree เดิม" },
      { t: "ul", c: [
        "root = [5,3,6,2,4,null,7], key = 3 → หลัง delete ต้องได้ tree ที่ยังเป็น BST ถูกต้อง เช่นเอา 4 ขึ้นมาแทนที่ 3",
        "root = [5,3,6,2,4,null,7], key = 0 → ไม่มีค่า 0 คืน tree เดิมทั้งต้น",
      ] },
      { t: "callout", c: "การ delete มี 3 กรณีที่ต้องคิดให้ครบ ไม่มี child (ลูก) เลย มี child ตัวเดียว และมี child สองตัว แต่ละกรณีจัดการต่างกัน" },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "ใช้ BST + recursion (การเรียกตัวเอง) traverse (เดินไล่) หา node ที่จะ delete แล้วต่อ subtree (ต้นไม้ย่อย) กลับด้วยการเขียน root.left = delete(root.left, key) เทคนิคนี้ทำให้การเชื่อม node ใหม่หลัง delete เกิดขึ้นเองอัตโนมัติ ไม่ต้องเก็บ pointer (ตัวชี้) ของ parent node (node พ่อ) ไว้เอง" },
      { t: "p", c: "หัวใจอยู่ที่กรณี node มี child สองตัว ถ้า delete ตรง ๆ จะเหลือ child กำพร้าสองก้อนซ่อม tree ไม่ได้ เราจึงไม่ delete node นั้นจริง แต่หา successor คือค่าที่น้อยที่สุดในฝั่งขวา (เดินขวาหนึ่งก้าวแล้วเดินซ้ายจนสุด) เอาค่ามันมาแทน แล้วไป delete successor ตัวเดิมออกจากฝั่งขวาแทน ซึ่งจะกลายเป็นกรณีง่ายเพราะ successor ไม่มี child ซ้ายแน่นอน" },
      { t: "ol", c: [
        "ถ้า tree ว่าง (root เป็น None) ไม่มีอะไรให้ delete คืน None",
        "ถ้า key น้อยกว่าค่า root เข้าไป delete ในฝั่งซ้าย แล้วรับผลกลับมาต่อกับ root.left",
        "ถ้า key มากกว่าค่า root เข้าไป delete ในฝั่งขวา แล้วต่อกับ root.right",
        "ถ้า key เท่ากับค่า root คือเจอ node ที่จะ delete แยก 3 กรณี",
        "ไม่มี child ซ้าย คืน child ขวาขึ้นไปแทน (ถ้าไม่มี child เลย child ขวาก็เป็น None พอดี เท่ากับ delete ทิ้ง)",
        "ไม่มี child ขวา คืน child ซ้ายขึ้นไปแทน",
        "มี child สองตัว หา successor ในฝั่งขวา เอาค่ามาแทนค่า root แล้ว delete successor ออกจากฝั่งขวาต่อ",
        "คืน root กลับขึ้นไปให้ชั้นบนต่อ node",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ลืม update (อัปเดต) การเชื่อม node กลับ (ลืม root.left = ... หรือ root.right = ...) ทำให้ tree ไม่เปลี่ยน อีกจุดคือกรณีสอง child แล้วลืม delete successor ตัวเดิมออก ทำให้เกิดค่าซ้ำใน tree" },

      { t: "h2", c: "ไล่ทีละสเต็ป" },
      { t: "p", c: "delete key = 3 จาก root = [5,3,6,2,4,null,7] (node 3 มี child สองตัวคือ 2 กับ 4)" },
      { t: "table", head: ["ขั้น", "node ปัจจุบัน", "ทำอะไร"], rows: [
        ["1", "5", "3 < 5 ลงไป delete ในฝั่งซ้าย"],
        ["2", "3", "เจอ key มี child สองตัว หา successor ในฝั่งขวา"],
        ["3", "4", "เดินขวาจาก 3 ได้ 4 ไม่มี child ซ้าย → successor = 4"],
        ["4", "3", "เอาค่า 4 มาแทน (node กลายเป็น 4) แล้ว delete 4 เดิมออกจากฝั่งขวา"],
        ["5", "4 (ตัวเดิม)", "ไม่มี child คืน None เท่ากับ delete ทิ้ง เชื่อมกลับเสร็จ"],
      ] },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "code", lang: "python", c: `# class TreeNode:
#     def __init__(self, val=0, left=None, right=None): ...

def delete_node(root, key):
    if not root:
        return None                      # ต้นไม้ว่าง ไม่มีอะไรให้ลบ

    if key < root.val:
        root.left = delete_node(root.left, key)   # key อยู่ฝั่งซ้าย
    elif key > root.val:
        root.right = delete_node(root.right, key) # key อยู่ฝั่งขวา
    else:
        # เจอ node ที่จะลบแล้ว แยก 3 กรณี
        if not root.left:
            return root.right            # ไม่มีลูกซ้าย ยกลูกขวาขึ้นมาแทน
        if not root.right:
            return root.left             # ไม่มีลูกขวา ยกลูกซ้ายขึ้นมาแทน

        # กรณีมีลูกสองตัว หาตัวที่น้อยสุดในฝั่งขวา (successor)
        succ = root.right
        while succ.left:
            succ = succ.left
        root.val = succ.val              # เอาค่า successor มาแทนค่าปัจจุบัน
        # แล้วลบ successor ออกจาก subtree ขวา
        root.right = delete_node(root.right, succ.val)

    return root` },
        { t: "p", c: "ขั้นแรกเราต้อง traverse ไปหา node ที่จะ delete ก่อน โดยใช้กฎ BST เหมือน search ถ้า key น้อยกว่า root ปัจจุบันก็เข้าไป delete ในฝั่งซ้าย (แล้วรับผลลัพธ์กลับมาต่อกับ root.left) ถ้ามากกว่าก็ทำกับฝั่งขวา เทคนิคการเขียน root.left = delete_node(root.left, key) ช่วยให้การเชื่อม node ใหม่หลัง delete เกิดขึ้นเองอัตโนมัติ ไม่ต้องเก็บ pointer ตัวพ่อไว้เอง" },
        { t: "p", c: "พอเจอ node ที่จะ delete (key == root.val) แยกเป็น 3 กรณี กรณีไม่มี child หรือมี child ตัวเดียว จัดการง่าย แค่คืน child อีกฝั่งขึ้นไปแทนตำแหน่งของมัน (ถ้าไม่มี child เลย ฝั่งที่คืนก็เป็น None พอดี เท่ากับ delete ทิ้ง) กรณียากคือมี child สองตัว เรา delete ตรง ๆ ไม่ได้เพราะจะเหลือ child กำพร้าสองก้อน วิธีแก้คือหา successor คือค่าที่น้อยที่สุดในฝั่งขวา (เดินขวาหนึ่งก้าวแล้วเดินซ้ายจนสุด) ค่านี้มากกว่าทุกตัวในฝั่งซ้าย และน้อยกว่าทุกตัวที่เหลือในฝั่งขวา จึงเอามาแทนที่แล้ว tree ยังเป็น BST อยู่ จากนั้น delete successor ตัวเดิมออก (ซึ่งจะเข้ากรณีง่ายเพราะ successor ไม่มี child ซ้ายแน่นอน)" },
        { t: "p", c: "Time O(h) traverse หา node แล้วเดินหา successor รวมแล้วไม่เกิน height (ความสูง) · Space O(h) จาก call stack ของ recursion เท่า height" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "การ delete ใน BST = traverse หา node ด้วยกฎ BST แล้วต่อ subtree กลับด้วย root.child = recurse(...) เทคนิคแทนที่ด้วย successor (ค่าน้อยสุดฝั่งขวา) เป็นลูกเล่นที่ใช้ได้ทุกครั้งที่ต้อง delete node ที่มี child สองตัว" },
    ],
  },
};
