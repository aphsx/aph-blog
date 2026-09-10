import type { Page } from "@/lib/types";

export const chapter05Pages: Record<string, Page> = {
  "dsa-ch5-intro": {
    slug: "dsa-ch5-intro",
    title: {
      th: "Non-Linear Data Structures: โครงสร้างข้อมูลแบบไม่เชิงเส้น",
      en: "Non-Linear Data Structures: Hierarchies and Graphs",
    },
    lead: {
      th: "ก้าวข้ามลำดับเชิงเส้นสู่โครงสร้างแบบลำดับชั้น (Hierarchy) และโครงข่ายความสัมพันธ์ (Network)",
      en: "Move beyond sequential storage: learn hierarchical trees and interconnected graph networks.",
    },
    group: "บทที่ 7: การเรียกตัวเอง & โครงสร้างต้นไม้ (Recursion & Trees)",
    blocks: {
      th: [
        {
          t: "p",
          c: "**โครงสร้างข้อมูลแบบไม่เชิงเส้น (Non-Linear Data Structure)** คือโครงสร้างที่ข้อมูลไม่ได้เรียงต่อกันเป็นเส้นตรง สมาชิกหนึ่งตัวสามารถเชื่อมโยงไปยังสมาชิกตัวอื่นได้หลายตัว ตัวอย่างที่สำคัญที่สุดในโลกคอมพิวเตอร์คือ **ต้นไม้ (Tree)** และ **กราฟ (Graph)**",
        },
        { t: "h2", c: "เปรียบเทียบ Tree vs Graph" },
        {
          t: "table",
          head: ["คุณสมบัติ", "Tree (ต้นไม้)", "Graph (กราฟทั่วไป)"],
          rows: [
            ["ความสัมพันธ์", "แบบลำดับชั้นบนลงล่าง (Hierarchical)", "แบบโครงข่ายทั่วไป (Network / Many-to-Many)"],
            ["วงรอบ (Cycles)", "🚫 ห้ามมี Cycle โดยเด็ดขาด (Acyclic)", "มี Cycle หรือไม่มีก็ได้"],
            ["จุดเริ่มต้น", "มี Root Node จุดเดียวเสมอ", "ไม่มี Root เริ่มต้นที่โหนดใดก็ได้"],
            ["จำนวนเส้นเชื่อม (Edges)", "โหนด N ตัวจะมีเส้นเชื่อมพอดี N - 1 เส้น", "มีเส้นเชื่อมกี่เส้นก็ได้ (ตั้งแต่ 0 ถึง N²)"],
          ],
        },
        {
          t: "callout",
          title: "🎯 คำนิยามคณิตศาสตร์",
          c: "ในทางทฤษฎีกราฟ **Tree คือ Connected Acyclic Graph** (กราฟที่เชื่อมถึงกันทุกโหนดและไม่มีวงวน) หากตัดเส้นเชื่อม 1 เส้น Tree จะขาดออกจากกันทันที!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch5-recursive": {
    slug: "dsa-ch5-recursive",
    title: {
      th: "Recursion & Call Stack: ฟังก์ชันเรียกตัวเอง",
      en: "Recursion & Call Stack: Thinking in Subproblems",
    },
    lead: {
      th: "หัวใจของการแก้โจทย์ Tree และ Graph: การทำความเข้าใจ Base Case, Recursive Step และการทำงานของ Call Stack ในหน่วยความจำ",
      en: "Master recursion mechanics, base cases, call stack frames, and recursive tree traversals.",
    },
    group: "บทที่ 7: การเรียกตัวเอง & โครงสร้างต้นไม้ (Recursion & Trees)",
    blocks: {
      th: [
        { t: "h2", c: "2 เสาหลักของฟังก์ชัน Recursion" },
        {
          t: "ol",
          c: [
            "**1. Base Case (เงื่อนไขหยุดการทำงาน)**: กรณีที่ปัญหาเล็กที่สุดและรู้คำตอบทันที เพื่อหยุดไม่ให้ฟังก์ชันเรียกตัวเองไม่รู้จบ (ป้องกัน Stack Overflow)",
            "**2. Recursive Step (การเรียกตัวเองกับปัญหาย่อย)**: ส่งผ่านข้อมูลที่มีขนาดเล็กลงเรื่อยๆ เพื่อมุ่งหน้าเข้าสู่ Base Case",
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Factorial และ Call Stack Walkthrough",
          c: `def factorial(n: int) -> int:
    # 1. Base Case
    if n <= 1:
        return 1
    # 2. Recursive Step
    return n * factorial(n - 1)

print(factorial(4))  # 24`,
        },
        {
          t: "code",
          lang: "text",
          label: "การวางตัวบน Call Stack ของ factorial(4)",
          c: `1. factorial(4) เรียก factorial(3)
2. factorial(3) เรียก factorial(2)
3. factorial(2) เรียก factorial(1)
4. factorial(1) ชน Base Case -> คืนค่า 1
5. factorial(2) คำนวณ 2 * 1 -> คืนค่า 2
6. factorial(3) คำนวณ 3 * 2 -> คืนค่า 6
7. factorial(4) คำนวณ 4 * 6 -> คืนค่า 24 (Stack ยุบหมด)`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch5-tree": {
    slug: "dsa-ch5-tree",
    title: {
      th: "Tree & Binary Search Tree: โครงสร้างต้นไม้",
      en: "Tree & Binary Search Tree: Properties & Traversals",
    },
    lead: {
      th: "โครงสร้าง Binary Tree, คุณสมบัติของ Binary Search Tree (BST) และการท่องโหนดแบบ DFS (Pre/In/Post) และ BFS",
      en: "Binary Tree terminology, BST search/insert invariants, and DFS vs BFS traversal techniques.",
    },
    group: "บทที่ 7: การเรียกตัวเอง & โครงสร้างต้นไม้ (Recursion & Trees)",
    blocks: {
      th: [
        { t: "h2", c: "Binary Search Tree (BST) คืออะไร?" },
        {
          t: "p",
          c: "Binary Tree คือต้นไม้ที่แต่ละโหนดมีลูกได้ไม่เกิน 2 ตัว (Left และ Right) ส่วน **BST** มีกฎเหล็กสำคัญคือ:",
        },
        {
          t: "ul",
          c: [
            "สมาชิกใน **Subtree ทางซ้าย** ทุกตัว ต้องมีค่าน้อยกว่าโหนดแม่ (`left.val < node.val`)",
            "สมาชิกใน **Subtree ทางขวา** ทุกตัว ต้องมีค่ามากกว่าโหนดแม่ (`right.val > node.val`)",
            "ด้วยคุณสมบัตินี้ ทำให้การค้นหา (Search) ใน Balanced BST ใช้เวลาเพียง **O(log n)**!",
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "Python: คลาส TreeNode และการค้นหาใน BST",
          c: `class TreeNode:
    def __init__(self, val: int = 0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def search_bst(root: TreeNode | None, target: int) -> TreeNode | None:
    """ค้นหาข้อมูลใน BST O(log n) average"""
    if root is None or root.val == target:
        return root
    if target < root.val:
        return search_bst(root.left, target)
    return search_bst(root.right, target)`,
        },
        { t: "h2", c: "การท่องโหนดใน Tree (Tree Traversals)" },
        {
          t: "p",
          c: "การเข้าถึงสมาชิกทุกตัวใน Tree แบ่งเป็น 2 กลุ่มหลัก:",
        },
        {
          t: "table",
          head: ["ประเภทการท่องโหนด", "ลำดับการอ่าน", "การประยุกต์ใช้ในข้อสอบ"],
          rows: [
            ["In-order (L-Root-R)", "ซ้าย -> แม่ -> ขวา", "🔥 ได้ข้อมูลเรียงลำดับจากน้อยไปมากเสมอใน BST"],
            ["Pre-order (Root-L-R)", "แม่ -> ซ้าย -> ขวา", "ใช้ในการคัดลอก Tree หรือ Serialization"],
            ["Post-order (L-R-Root)", "ซ้าย -> ขวา -> แม่", "ใช้ลบ Tree หรือคำนวณขนาดความสูงของโหนดลูกก่อน"],
            ["Level-order (BFS)", "อ่านทีละชั้น (ใช้ Queue)", "หาความลึกสั้นที่สุด (Shortest Path / Min Depth)"],
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "Python: In-order Traversal (L -> Root -> R)",
          c: `def inorder_traversal(root: TreeNode | None) -> list[int]:
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)        # 1. ไปทางซ้าย
        result.append(node.val) # 2. เก็บค่าตัวแม่
        dfs(node.right)       # 3. ไปทางขวา
    dfs(root)
    return result`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch5-graph": {
    slug: "dsa-ch5-graph",
    title: {
      th: "Graph Representation: กราฟเบื้องต้น",
      en: "Graph Representations: Adjacency Matrix vs List",
    },
    lead: {
      th: "การแทนกราฟในหน่วยความจำ: Adjacency Matrix vs Adjacency List พร้อมโครงร่างการท่องกราฟด้วย BFS และ DFS",
      en: "Graph representations: Adjacency Matrix vs Adjacency List, plus foundational BFS and DFS traversal algorithms.",
    },
    group: "บทที่ 12: กราฟและอัลกอริทึมโครงข่าย (Graphs & Network Algorithms)",
    blocks: {
      th: [
        { t: "h2", c: "การเก็บกราฟในโค้ด: Adjacency Matrix vs Adjacency List" },
        {
          t: "p",
          c: "กราฟประกอบด้วยชุดของโหนด (**Vertices / V**) และเส้นเชื่อม (**Edges / E**) มี 2 วิธีหลักในการจัดเก็บ:",
        },
        {
          t: "table",
          head: ["วิธีการเก็บ", "Memory Space", "หาว่ามีเส้นเชื่อมไหม (u -> v)", "หาเพื่อนบ้านทั้งหมดของ u"],
          rows: [
            ["Adjacency Matrix (ตาราง 2 มิติ `V x V`)", "🐢 O(V²)", "⚡ O(1)", "🐢 O(V) ต้องสแกนทั้งแถว"],
            ["Adjacency List (Dictionary of Lists)", "⚡ O(V + E)", "O(degree(u))", "⚡ O(degree(u)) ท่องเฉพาะเพื่อนบ้าน"],
          ],
        },
        {
          t: "callout",
          title: "🎯 มาตรฐานการสอบสัมภาษณ์งาน",
          c: "ในห้องสัมภาษณ์ 95% ของโจทย์กราฟ ให้ใช้ **Adjacency List** เสมอ เพราะกราฟในชีวิตจริงส่วนใหญ่เป็น Sparse Graph (เส้นเชื่อมน้อยกว่า V² มาก) การใช้ Matrix จะเปลือง Memory และวิ่งช้าจน Time Limit Exceeded",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: สร้างกราฟแบบ Adjacency List และท่องด้วย BFS",
          c: `from collections import defaultdict, deque

# 1. แปลงรายการเส้นเชื่อม (Edge List) เป็น Adjacency List
edges = [[0, 1], [0, 2], [1, 2], [2, 0], [2, 3], [3, 3]]
graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)

# 2. ท่องกราฟแบบ Breadth-First Search (BFS) ด้วย Queue
def bfs(start_node: int):
    visited = set([start_node])
    queue = deque([start_node])
    order = []
    
    while queue:
        node = queue.popleft()
        order.append(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
                
    return order

print("BFS Traversal:", bfs(2))  # [2, 0, 3, 1]`,
        },
      ],
      en: [],
    },
  },
};
