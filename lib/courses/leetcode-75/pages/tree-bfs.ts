import type { Page } from "@/lib/types";

export const treeBfsPages: Record<string, Page> = {
  "lc75-intro-tree-bfs": {
    slug: "lc75-intro-tree-bfs",
    title: { th: "Binary Tree — BFS (ลุยเป็นชั้น)", en: "" },
    lead: { th: "traverse (เดินไล่) ต้นไม้ทีละ level (ชั้น) จากบนลงล่างด้วย queue (คิว) แบบ level-order — เครื่องมือคู่หูของ DFS สำหรับโจทย์ที่ถามเป็นชั้น ๆ", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "หมวดที่แล้วเราใช้ DFS ลุยดิ่งลงกิ่งเดียวให้สุดก่อน หมวดนี้เราจะเจอวิธี traverse ต้นไม้อีกแบบที่ตรงข้ามกันเลย คือไล่ทีละ level จากบนลงล่าง ซ้ายไปขวา เรียกว่า BFS มันเหมาะกับโจทย์ที่ถามอะไรที่เป็น \"level\" เช่น ค่าของแต่ละ level หรือ node ขวาสุดของแต่ละ level" },

              { t: "h2", c: "1. Pattern Recognition (วิธีมองโจทย์ BFS ให้ออก)" },
              { t: "p", c: "การเดินทางใน Binary Tree มี 2 รูปแบบหลัก:" },
              { t: "ul", c: [
                "**DFS (Depth-First Search):** เดินพุ่งลงไปลึกสุดกิ่งก่อน แล้วค่อยถอยกลับ (ใช้ Stack / Recursion)",
                "**BFS (Breadth-First Search):** เดินกวาดเป็น **\"แนวราบทีละชั้น\" (Level by Level)** จากบนลงล่าง และจากซ้ายไปขวา",
              ] },
              {
                t: "image",
                src: "/leetcode-75/bfs-search.gif",
                alt: "BFS animation: visit level by level A → B → C → D… using QUEUE · FIFO",
                caption:
                  "BFS: ไล่ทีละชั้น A → B, C → D, E, F, G → H, I — ใช้ QUEUE · FIFO · โหนด teal = เยี่ยมแล้ว · ส้ม = กำลังเยี่ยม · ทอง = ยังไม่ถึง",
              },
              { t: "code", lang: "text", c: `                  1               <-- ชั้นที่ 0 (Level 0)
                /   \\
               2     3            <-- ชั้นที่ 1 (Level 1)
              / \\   / \\
             4   5 6   7          <-- ชั้นที่ 2 (Level 2)

ลำดับการเดินแบบ BFS: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7` },

              { t: "h2", c: "2. โครงสร้างข้อมูลที่ต้องใช้: Queue (คิว)" },
              { t: "p", c: "การจะกวาดข้อมูลทีละชั้นได้ โปรแกรมต้องจำได้ว่า *\"ใครมาก่อน ต้องได้ประมวลผลก่อน\"* เราจึงใช้ **Queue (คิว)** ที่มีหลักการ **FIFO (First-In, First-Out: มาก่อน ออกก่อน)**" },
              { t: "h3", c: "ทำไมใน Python ต้องใช้ `collections.deque`?" },
              { t: "ul", c: [
                "**ใช้ List ปกติ (`list`):** เวลาเอาข้อมูลหน้าสุดออกด้วย `list.pop(0)` โปรแกรมต้องคอยขยับข้อมูลที่เหลือทั้งหมดไปทางซ้าย ใช้เวลา **O(N)** (ช้ามากเมื่อข้อมูลเยอะ)",
                "**ใช้ `deque` (Double-Ended Queue):** คำสั่ง `queue.popleft()` ใช้เวลาแค่ **O(1)** ทำงานได้รวดเร็วทันที",
              ] },

              { t: "h2", c: "3. โครงสร้างโค้ดมาตรฐาน (Standard BFS Template)" },
              { t: "code", lang: "python", c: `from collections import deque

class Solution:
    def bfsTemplate(self, root: Optional[TreeNode]):
        # 1. Edge Case: ถ้าไม่มีโหนดเลยตั้งแต่แรก ให้จบการทำงานทันที
        if not root:
            return []

        # 2. ตั้งต้นสร้าง Queue โดยใส่ Root เข้าไปเป็นตัวแรก
        queue = deque([root])
        result = []

        # 3. ลูปนอก: ทำงานตราบใดที่ยังมีโหนดอยู่ใน Queue (คุมภาพรวมทั้งต้นไม้)
        while queue:
            # ล็อกจำนวนโหนดของ "ชั้นปัจจุบัน" ไว้ก่อน
            level_size = len(queue)
            current_level = []

            # 4. ลูปใน: ดึงโหนดเฉพาะของชั้นปัจจุบันมาทำงานให้ครบตามจำนวน level_size
            for _ in range(level_size):
                # ดึงโหนดหน้าสุดออก
                node = queue.popleft()
                current_level.append(node.val)

                # ดักเช็กก่อนใส่: ถ้ามีลูกซ้าย/ขวา ค่อยใส่ต่อท้ายคิวไว้ทำในชั้นถัดไป
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            # บันทึกข้อมูลของชั้นนี้เข้าผลลัพธ์รวม
            result.append(current_level)

        return result` },

              { t: "h2", c: "4. ชำแหละตรรกะและจุดที่ต้องระวัง (Line-by-Line Deep Dive)" },
              { t: "h3", c: "1. `queue = deque([root])`" },
              { t: "callout", title: "ทำไมต้องครอบด้วยก้ามปู `[root]`?", c: "เพราะ `deque()` รับข้อมูลตั้งต้นเป็นประเภท Iterable (List) การเขียน `[root]` คือการบอกว่า *\"เริ่มต้นสร้างคิว โดยนำโหนด root ยัดใส่เป็นสมาชิกตัวที่ 1 ของคิว\"*" },

              { t: "h3", c: "2. ทำไมต้องมี 2 ลูปซ้อนกัน? (`while` + `for`)" },
              { t: "ul", c: [
                "**`while queue:` (ลูปนอก):** คุม **ภาพรวมทั้งต้นไม้** ตราบใดที่ยังมีโหนดอยู่ในคิว (ไม่ว่าจะชั้นไหน) จะทำต่อไปเรื่อยๆ จนกว่าต้นไม้จะหมด",
                "**`for _ in range(level_size):` (ลูปใน):** คุม **เฉพาะชั้นปัจจุบัน** ดึงโหนดออกมาประมวลผลให้ครบตามจำนวนที่มีอยู่ในชั้นนั้น",
              ] },

              { t: "h3", c: "3. ทำไมต้องล็อกค่า `level_size = len(queue)` ก่อนเข้าลูป `for`?" },
              { t: "p", c: "นี่คือ **หัวใจที่สำคัญที่สุดของ BFS**" },
              { t: "ul", c: [
                "ในขณะที่ลูป `for` ดึงโหนดชั้นปัจจุบันออกมา เราจะมีการสั่ง `queue.append(node.left)` ยัดโหนดของ **\"ชั้นลูก\"** เพิ่มเข้าไปในคิวด้วยเรื่อยๆ",
                "หากเราไม่นับแล้วล็อกค่า `level_size` ใส่ตัวแปรก่อน แต่ไปเขียน `for _ in range(len(queue)):` ตรงๆ รอบของลูปจะขยายไปเรื่อยๆ ตามโหนดลูกที่ยัดเข้ามาใหม่ ทำให้โปรแกรมแยกไม่ออกว่าโหนดไหนอยู่ชั้นไหน",
                "**การแช่แข็งค่า `level_size`:** ช่วยการันตีว่า ลูป `for` จะดึงเฉพาะโหนดของ **ชั้นปัจจุบัน** ออกมาทำจนหมดพอดี แล้วปล่อยให้โหนดลูกที่พึ่งยัดเข้าไปใหม่ รอทำในลูป `while` รอบถัดไป",
              ] },

              { t: "h3", c: "4. ทำไม `popleft()` ถึงไม่เผลอดึงโหนดลูกที่เพิ่ง `append` เข้าไป?" },
              { t: "ul", c: [
                "เพราะ Queue มีกลไก **FIFO (First-In, First-Out)**",
                "โหนดลูกที่สั่ง `append` เข้าไปใหม่จะถูกดันไปอยู่ **\"ท้ายแถว\"**",
                "ในขณะที่ `popleft()` จะดึงโหนดที่อยู่ **\"หน้าสุดของแถว\"** ออกมา ซึ่งเป็นโหนดของชั้นปัจจุบันที่มารอคิวอยู่ก่อนแล้วเสมอ",
              ] },

              { t: "h3", c: "5. ทำไมไม่ต้องเขียน `if not node:` ดักจับ `None` ด้านในลูปเหมือน DFS?" },
              { t: "ul", c: [
                "เพราะดักไว้ตั้งแต่ก่อนยัดเข้าคิวด้วย `if node.left:` และ `if node.right:` แล้ว",
                "โหนดที่จะลงไปอยู่ใน Queue ได้จึงการันตีว่าเป็นโหนดที่มีอยู่จริงแน่นอน ทำให้ในคิวไม่มีทางมีค่า `None` หลุดเข้าไปให้ต้องเช็กซ้ำ",
              ] },

              { t: "h2", c: "5. Step-by-Step Walkthrough (จำลองการทำงาน)" },
              { t: "p", c: "กำหนดต้นไม้ตัวอย่าง:" },
              { t: "code", lang: "text", c: `        1 (Root)
       / \\
      2   3` },
              { t: "ol", c: [
                "**เริ่มต้น:** `queue = deque([Node 1])`",
                "**ลูปนอก รอบที่ 1 (ชั้นที่ 0):** `level_size = len(queue)` → ได้ค่า **1** · **ลูปใน รัน 1 รอบ:** `node = queue.popleft()` → ดึง **Node 1** ออกมา · มีลูกซ้ายสั่ง `queue.append(Node 2)` · มีลูกขวาสั่ง `queue.append(Node 3)` · **จบชั้นที่ 0:** สภาพคิวปัจจุบันคือ `deque([Node 2, Node 3])`",
                "**ลูปนอก รอบที่ 2 (ชั้นที่ 1):** `level_size = len(queue)` → แช่แข็งค่าได้ **2** · **ลูปใน รัน 2 รอบ:** (รอบที่ 1) ดึง **Node 2** ออกมาจากหน้าคิว · (รอบที่ 2) ดึง **Node 3** ออกมาจากหน้าคิว · **จบชั้นที่ 1:** สภาพคิวปัจจุบันคือ `deque([])` (ว่างเปล่า)",
                "**ตรวจสอบ `while queue`:** คิวว่างเปล่าแล้ว → จบการทำงาน",
              ] },

              { t: "h2", c: "6. Complexity Analysis (วิเคราะห์ประสิทธิภาพ)" },
              { t: "ul", c: [
                "**Time Complexity: O(N)** — เพราะ BFS เดินเข้าถึงและประมวลผลทุกโหนด (N) ในต้นไม้เพียงครั้งเดียว",
                "**Space Complexity: O(W)** — โดยที่ W คือความกว้างที่สุดของต้นไม้ (Maximum Width of Tree) กรณีที่แย่ที่สุด (Complete Binary Tree) คิวจะต้องถือโหนดในชั้นล่างสุดพร้อมกันสูงสุดประมาณ N/2 โหนด คิดเป็น O(N)",
              ] },

              { t: "callout", title: "พร้อมลุยแล้ว", c: "หมวดนี้มี 2 ข้อ (LC199, LC1161) ทั้งคู่ใช้ template วนทีละชั้นด้านบนเป็นแกน พร้อมแล้วกดถัดไปเริ่มข้อแรกได้เลย" },
      ],
      en: [],
    },
  },

  "lc75-p39": {
    slug: "lc75-p39",
    title: { th: "ข้อ 39 · LC199 Binary Tree Right Side View (มุมมองด้านขวา) 🟡", en: "" },
    lead: { th: "ยืนทางขวาของต้นไม้แล้วมองเข้ามา — คำตอบคือโหนดขวาสุดของแต่ละชั้น ไม่ใช่การเดินลงกิ่งขวาอย่างเดียว", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC199): กำหนด root ของ binary tree มาให้ ให้จินตนาการว่ายืนอยู่ทางด้านขวาของต้นไม้ แล้วมองเข้ามา ให้ return ค่าของโหนดที่มองเห็นได้ เรียงจากบนลงล่าง" },
              {
                t: "example",
                c: [
                  {
                    input: "root = [1,2,3,null,5,null,4]",
                    output: "[1,3,4]",
                    explain: "เห็น 1 ที่ชั้นบนสุด เห็น 3 ที่ชั้นถัดไป (บัง 2 ไว้) เห็น 4 ที่ชั้นล่างสุด (บัง 5 ไว้)",
                  },
                  {
                    input: "root = [1,2,3,4]",
                    output: "[1,3,4]",
                    explain: "ชั้นล่างสุดมีแค่โหนด 4 ซึ่งเป็นลูกซ้ายของ 2 เพราะโหนด 3 ไม่มีลูก สายตาจึงมองทะลุไปเห็น 4",
                  },
                  {
                    input: "root = [1,2,3,4,null,null,null,5]",
                    output: "[1,3,4,5]",
                    explain: "ชั้นของ 4 มีแค่ตัวเดียว ชั้นถัดไปมีแค่ 5 ซึ่งเป็นลูกซ้ายของ 4 แต่เป็นตัวเดียวในชั้นจึงมองเห็น",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "จำนวนโหนดอยู่ระหว่าง 0 ถึง 100",
                "-100 <= Node.val <= 100",
                ],
              },

              { t: "h2", c: "1. Pattern Recognition (วิธีมองโจทย์ให้ออก)" },
              { t: "p", c: "สมมติว่าเรายืนอยู่ทางฝั่งขวาสุดของต้นไม้แล้วมองเข้ามา โหนดที่ถูกบังจะหายไปจากสายตา เหลือแค่ตัวที่อยู่ขวาสุดของแต่ละชั้น" },
              { t: "code", lang: "text", c: `                  1  <-- มองเห็น 1
                /   \\
               2     3  <-- มองเห็น 3 (บัง 2 ไว้)
                \\     \\
                 5     4  <-- มองเห็น 4 (บัง 5 ไว้)

คำตอบ: [1, 3, 4]` },
              { t: "h3", c: "จุดที่คนส่วนใหญ่งง" },
              { t: "p", c: "หลายคนคิดว่า \"มองฝั่งขวาก็แค่เดินลง `root.right.right...` ก็จบ\" — ความจริงไม่ใช่" },
              { t: "code", lang: "text", c: `                  1  <-- มองเห็น 1
                /   \\
               2     3  <-- มองเห็น 3
              /
             4  <-- มองเห็น 4 (เพราะฝั่งขวาหมดแค่นี้)` },
              { t: "p", c: "ชั้นล่างสุดกิ่งขวาไม่มีโหนด สายตาจึงมองทะลุไปเห็นโหนด 4 ที่อยู่ฝั่งซ้าย" },
              { t: "callout", title: "ถอดโจทย์ใหม่ให้ชัด", c: "\"มองจากฝั่งขวาแล้วเห็นอะไร\" คือการหาโหนดขวาสุดของแต่ละชั้น เมื่อโจทย์พูดถึงชั้น (level) เครื่องมือแรกที่ควรนึกถึงคือ BFS" },

              { t: "h2", c: "2. เครื่องมือที่เลือกใช้" },
              { t: "p", c: "ใช้ BFS กวาดทีละชั้นจากซ้ายไปขวาด้วย Queue (`collections.deque`) ในแต่ละชั้น โหนดที่ถูกดึงออกเป็นตัวสุดท้ายคือโหนดขวาสุดที่ต้องการ" },
              { t: "table", head: ["ชั้น", "โหนดในชั้น (ซ้าย→ขวา)", "ตัวขวาสุดที่เก็บ"], rows: [
                ["0", "[1]", "1"],
                ["1", "[2, 3]", "3"],
                ["2", "[5, 4]", "4"],
              ] },

              { t: "h2", c: "3. ชำแหละโค้ดทีละบรรทัด" },
              { t: "code", lang: "python", label: "โครง BFS เก็บตัวสุดท้ายของชั้น", c: `from collections import deque

class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        if root is None:
            return []

        queue = deque([root])
        result = []

        while queue:
            level_size = len(queue)

            for i in range(level_size):
                node = queue.popleft()

                if i == level_size - 1:
                    result.append(node.val)

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

        return result` },

              { t: "h3", c: "ดูทีละขั้น (Interactive)" },
              {
                t: "p",
                c: "กด **Next ▶** เพื่อไล่ BFS ทีละชั้น · วงแหวนเขียว = โหนดที่มองเห็นจากขวา · กล่องล่าง = คิว FIFO:",
              },
              { t: "viz", id: "tree-bfs-right-view" },

              { t: "h3", c: "1. ทำไมต้องมี `if root is None: return []`?" },
              { t: "p", c: "ถ้าต้นไม้ว่างแล้วใส่ `deque([root])` ไปเลย คิวจะมีสมาชิกเป็น `None` หนึ่งตัว โปรแกรมจะเข้า `while` แล้วไปอ่าน `node.val` จนเกิด `AttributeError`" },

              { t: "h3", c: "2. `i == level_size - 1` แปลว่าอะไร?" },
              { t: "p", c: "สมมติชั้นนี้มี 3 โหนด (`level_size = 3`) ลูป `for i in range(3)` จะได้ `i = 0, 1, 2`" },
              { t: "ul", c: [
                "`i = 0` คือโหนดแรกสุด (ซ้ายสุด)",
                "`i = 1` คือโหนดกลาง",
                "`i = 2` คือโหนดสุดท้าย (ขวาสุด) ซึ่งตรงกับ `i == 3 - 1`",
              ] },
              { t: "p", c: "ต้องลบ 1 เพราะ index ของ Python เริ่มที่ 0 ตัวสุดท้ายของช่วงยาว `n` จึงอยู่ที่ตำแหน่ง `n - 1`" },

              { t: "h3", c: "3. ทำไมต้อง `append` ลูกซ้ายก่อนลูกขวา?" },
              { t: "p", c: "การใส่ซ้ายก่อนขวาทำให้โหนดในคิวเรียงจากซ้ายไปขวา ตัวที่ออกท้ายสุดของชั้นจึงเป็นตัวขวาสุดเสมอ" },
              { t: "callout", title: "เขียนสลับก็ได้", c: "ถ้าใส่ลูกขวาก่อนลูกซ้าย ตัวแรกของชั้น (`i == 0`) จะเป็นตัวขวาสุดแทน เขียนได้ทั้งสองแบบ แต่ใส่ซ้ายก่อนขวาจะตรงกับ template BFS มาตรฐานมากกว่า" },

              { t: "h2", c: "4. Step-by-Step Walkthrough" },
              { t: "p", c: "จำลองบนต้น `[1,2,3,null,5,null,4]`" },
              { t: "code", lang: "text", c: `        1 (Root)
       / \\
      2   3
       \\   \\
        5   4` },
              { t: "ol", c: [
                "**เริ่มต้น:** `queue = deque([Node 1])`, `result = []`",
                "**ชั้นที่ 0:** `level_size = 1` · `i = 0` ตรงกับตัวสุดท้าย ดึง Node 1 แล้วเก็บ `result = [1]` · ใส่ลูก 2 แล้ว 3 · จบชั้นนี้คิวเป็น `[2, 3]`",
                "**ชั้นที่ 1:** `level_size = 2` · `i = 0` ดึง Node 2 (ไม่เก็บ) แล้วใส่ลูก 5 · `i = 1` เป็นตัวสุดท้าย ดึง Node 3 แล้วเก็บ `result = [1, 3]` แล้วใส่ลูก 4 · จบชั้นนี้คิวเป็น `[5, 4]`",
                "**ชั้นที่ 2:** `level_size = 2` · `i = 0` ดึง Node 5 (ไม่เก็บ) · `i = 1` ดึง Node 4 แล้วเก็บ `result = [1, 3, 4]` · คิวว่าง",
                "**จบ:** คิวว่างแล้ว คืน `[1, 3, 4]`",
              ] },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ class นี้มาให้แล้ว ที่เขียนไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


from collections import deque

def rightSideView(root):
    if root is None:
        return []

    queue = deque([root])
    result = []

    while queue:
        level_size = len(queue)
        for i in range(level_size):
            node = queue.popleft()
            if i == level_size - 1:      # ตัวสุดท้ายของชั้น = ขวาสุด
                result.append(node.val)
            if node.left:
                queue.append(node.left)  # ใส่ซ้ายก่อนขวา
            if node.right:
                queue.append(node.right)

    return result

# ต้นไม้ [1, 2, 3, null, 5, null, 4]
root = TreeNode(1, TreeNode(2, None, TreeNode(5)), TreeNode(3, None, TreeNode(4)))
print(rightSideView(root))`, out: `[1, 3, 4]` },
                { t: "p", c: "หัวใจคือ template วนทีละชั้น แล้วเก็บเฉพาะตอน `i == level_size - 1` ซึ่งคือตัวที่ออกท้ายสุดของชั้นนั้น ต้องใส่ลูกซ้ายก่อนลูกขวา เพื่อให้ภายในชั้นถัดไปเรียงซ้ายไปขวา" },
                { t: "p", c: "Time O(N) เพราะดึงทุกโหนดออกจากคิวครั้งเดียว · Space O(W) โดย W คือความกว้างสูงสุดของต้นไม้ กรณีแย่สุดคิวถือโหนดชั้นล่างสุดพร้อมกันราว N/2 จึงคิดเป็น O(N)" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "เมื่อโจทย์ถามมุมมองต่อชั้น ให้ใช้ BFS ล็อก `level_size = len(queue)` แล้วเลือกโหนดตามตำแหน่งในชั้น ตัวสุดท้ายคือขวาสุด ตัวแรกคือซ้ายสุด" },
      ],
      en: [],
    },
  },

  "lc75-p40": {
    slug: "lc75-p40",
    title: { th: "ข้อ 40 · LC1161 Maximum Level Sum of a Binary Tree (ชั้นผลรวมมากสุด) 🟡", en: "" },
    lead: { th: "หาเลขชั้นที่ผลรวมค่ามากที่สุด ด้วย BFS วนทีละชั้นแล้วบวกและเทียบ", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC1161): กำหนด root ของ binary tree มาให้ โดยกำหนดว่า level ของ root คือ 1, level ของ child คือ 2 ไล่ลงไปเรื่อย ๆ ให้ return เลข level x ที่น้อยที่สุด ซึ่งผลรวมค่าของ node ทั้งหมดใน level x นั้นมากที่สุด (ค่าติดลบมีได้)" },
              {
                t: "example",
                c: [
                  {
                    input: "root = [1,7,0,7,-8,null,null]",
                    output: "2",
                    explain: "ชั้น 1 = 1, ชั้น 2 = 7 + 0 = 7, ชั้น 3 = 7 + (-8) = -1 — ชั้นที่ผลรวมมากที่สุดคือชั้น 2",
                  },
                  {
                    input: "root = [989,null,10250,98693,-89388,null,null,null,-32127]",
                    output: "2",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "จำนวน node อยู่ระหว่าง 1 ถึง 10^4",
                "-10^5 <= Node.val <= 10^5",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ BFS loop ทีละ level ตาม template เพิ่ม counter level ที่บวก 1 ทุกครั้งที่ขึ้น level ใหม่ และ track ผลรวมค่าทุก node ใน level เป็น total เมื่อจบ level ก็ compare กับผลรวมมากสุดที่เคยเจอ" },
              { t: "p", c: "โจทย์นี้ทำด้วย DFS (พก level ลงไปแล้วสะสมผลรวมต่อ level) ก็ได้ แต่ BFS เข้ากับโจทย์ \"เป็น level\" อย่างเป็นธรรมชาติกว่า เพราะเรากำหนดขอบเขตแต่ละ level ชัดเจนด้วย size" },
              { t: "ol", c: [
                "ตั้ง best_sum = -inf, best_level = 1, level = 0, queue = deque([root])",
                "loop while queue: เพิ่ม level += 1 (ขึ้น level ใหม่)",
                "จด size = len(queue) และ total = 0",
                "loop pop ทั้ง level: total += node.val แล้ว append left child, right child เข้า queue",
                "จบ level: ถ้า total > best_sum update best_sum และ best_level = level",
                "return best_level",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "initialize (ตั้งค่าเริ่มต้น) best_sum ด้วย 0 จะพังถ้าทุก level ผลรวมติดลบ ต้องเริ่ม float('-inf') และใช้ > (ไม่ใช่ >=) เพื่อให้ผลรวมเสมอกันเก็บ level แรกไว้ตามโจทย์ อีกทั้ง level เริ่มนับที่ 1 ไม่ใช่ 0" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "จำลองบนต้น [1,7,0,7,-8,null,null]" },
              { t: "table", head: ["level", "node ใน level", "total", "best_sum / best_level หลัง level นี้"], rows: [
                ["1", "[1]", "1", "1 / 1"],
                ["2", "[7, 0]", "7", "7 / 2"],
                ["3", "[7, -8]", "-1", "7 / 2 (ไม่อัปเดต)"],
              ] },

              { t: "h3", c: "ดูทีละขั้น (Interactive)" },
              {
                t: "p",
                c: "กด **Next ▶** เพื่อไล่บวกทีละชั้น · วงแหวนเขียว = ชั้นที่เป็นแชมป์ผลรวมตอนนี้:",
              },
              { t: "viz", id: "tree-bfs-level-sum" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ class นี้มาให้แล้ว ที่เขียนไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


from collections import deque

def maxLevelSum(root):
    best_sum = float('-inf')   # ผลรวมมากสุดที่เจอ (เริ่ม -inf กันค่าติดลบ)
    best_level = 1             # เลขชั้นที่ให้ผลรวมมากสุด
    level = 0
    queue = deque([root])
    while queue:
        level += 1            # ขึ้นชั้นใหม่
        size = len(queue)
        total = 0
        for _ in range(size):
            node = queue.popleft()
            total += node.val         # บวกทุก node ในชั้นนี้
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        if total > best_sum:          # เจอชั้นที่รวมมากกว่าเดิม
            best_sum = total
            best_level = level
    return best_level

# ต้นไม้ [1, 7, 0, 7, -8, null, null]
root = TreeNode(1, TreeNode(7, TreeNode(7), TreeNode(-8)), TreeNode(0))
print(maxLevelSum(root))`, out: `2` },
                { t: "p", c: "โครงเดียวกับข้อก่อน เพิ่มตัวนับ level ที่บวก 1 ทุกครั้งที่เริ่มชั้นใหม่ และตัวแปร total บวกค่าทุก node ในชั้น เมื่อจบชั้นก็เทียบ total กับ best_sum ถ้ามากกว่าจึงอัปเดต ใช้ > (มากกว่าเท่านั้น ไม่ใช่ >=) เพื่อให้เมื่อผลรวมเสมอกัน เราเก็บชั้นแรก (เลขน้อยกว่า) ไว้ตามที่โจทย์ต้องการ" },
                { t: "p", c: "จุดพลาดที่พบบ่อยคือเริ่ม best_sum ด้วย 0 ซึ่งพังทันทีถ้าทุกชั้นมีผลรวมติดลบ ต้องเริ่มด้วย float('-inf') และอย่าลืมว่าโจทย์นับชั้นเริ่มที่ 1 ไม่ใช่ 0 โจทย์นี้ทำด้วย DFS ก็ได้ แต่ BFS เข้ากับโจทย์ \"เป็นชั้น\" อย่างเป็นธรรมชาติกว่า" },
                { t: "p", c: "Time O(n) แตะทุก node ครั้งเดียว · Space O(w) โดย w คือความกว้างมากสุดของต้นไม้ (จำนวน node มากสุดในคิวพร้อมกัน)" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "BFS + ตัวสะสมต่อชั้น (ผลรวม/จำนวน/max) แล้วเทียบข้ามชั้น: เมื่อโจทย์ถามหา \"ชั้นที่ดีที่สุด\" ใช้ level counter + ตัวแปรเก็บแชมป์ ด้วยเงื่อนไข > เพื่อรักษาชั้นแรกเมื่อเสมอ" },
      ],
      en: [],
    },
  },
};
