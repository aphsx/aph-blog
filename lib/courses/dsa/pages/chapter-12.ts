import type { Page } from "@/lib/types";

export const chapter12Pages: Record<string, Page> = {
  "dsa-ch12-intro": {
    slug: "dsa-ch12-intro",
    title: {
      th: "โลกความจริงคือกราฟ: Social Networks, Maps & Microservices",
      en: "The World is a Graph: Networks, Maps & Distributed Topology",
    },
    lead: {
      th: "ทำความเข้าใจโครงสร้างข้อมูลที่ยืดหยุ่นและทรงพลังที่สุดในโลกคอมพิวเตอร์: ทฤษฎีกราฟ, คำศัพท์พื้นฐาน และการเชื่อมโยงระบบจริง",
      en: "Master the most versatile data structure: graph theory terminology, directed/undirected models, and real-world network architectures.",
    },
    group: "บทที่ 12: กราฟและอัลกอริทึมโครงข่าย (Graph Theory & Networks)",
    blocks: {
      th: [
        {
          t: "p",
          c: "หากต้นไม้ (Tree) คือการจำลองความสัมพันธ์แบบแม่-ลูกที่เคร่งครัด **กราฟ (Graph)** ก็คือการจำลองความสัมพันธ์ของโลกแห่งความเป็นจริงที่ไม่มีขอบเขตจำกัด:\n- **Social Networks (Facebook, LinkedIn)**: ผู้ใช้งานคือโหนด (Vertices) ความเป็นเพื่อนคือเส้นเชื่อม (Edges)\n- **ระบบนำทาง (Google Maps, Grab)**: ทางแยกคือโหนด ถนนคือเส้นเชื่อมที่มีค่าน้ำหนัก (Weights) เป็นระยะทางหรือเวลา\n- **Microservices Architecture**: Service ต่างๆ คือโหนด การเรียก API ระหว่างกันคือเส้นเชื่อม",
        },
        { t: "h2", c: "พจนานุกรมคำศัพท์ทฤษฎีกราฟ (Graph Terminology)" },
        {
          t: "table",
          head: ["คำศัพท์", "สัญลักษณ์", "คำอธิบายเชิงวิศวกรรม"],
          rows: [
            ["**Vertex (โหนด / จุดยอด)**", "$V$", "วัตถุหรือจุดในระบบ (เช่น บุคคล, เมือง, เซิร์ฟเวอร์)"],
            ["**Edge (เส้นเชื่อม)**", "$E$", "ความสัมพันธ์ระหว่างคู่โหนด (เช่น ความเป็นเพื่อน, ถนน, ท่อส่งข้อมูล)"],
            ["**Directed Graph (กราฟมีทิศทาง)**", "ลูกศร $\\to$", "เส้นทางวิ่งได้ทิศทางเดียว (เช่น การ Follow บน Twitter/Instagram)"],
            ["**Undirected Graph (กราฟไม่มีทิศทาง)**", "เส้นตรง —", "เส้นทางวิ่งไปมาได้สองฝั่ง (เช่น ความเป็นเพื่อนบน Facebook)"],
            ["**Weighted Graph (กราฟมีน้ำหนัก)**", "มีตัวเลขบน Edge", "เส้นเชื่อมมีค่าใช้จ่าย (Cost, Distance, Latency)"],
            ["**Cycle (วงรอบ)**", "วนกลับมาจุดเดิม", "เส้นทางที่เริ่มจากโหนด A เดินผ่านโหนดอื่นแล้ววนกลับมาที่โหนด A ได้"],
          ],
        },
      ],
      en: [],
    },
  },

  "dsa-ch12-representation": {
    slug: "dsa-ch12-representation",
    title: {
      th: "Graph Representation & Traversals: Matrix/List, BFS & DFS",
      en: "Graph Representations & Core Traversals: Matrix vs List, BFS & DFS",
    },
    lead: {
      th: "เปรียบเทียบ Adjacency Matrix vs Adjacency List, การท่องกราฟด้วย BFS (Queue) และ DFS (Recursion), และการตรวจจับวงวน (Cycle Detection)",
      en: "Compare Adjacency Matrix vs List trade-offs, master BFS/DFS traversals, and implement cycle detection in directed and undirected graphs.",
    },
    group: "บทที่ 12: กราฟและอัลกอริทึมโครงข่าย (Graph Theory & Networks)",
    blocks: {
      th: [
        { t: "h2", c: "Adjacency Matrix vs Adjacency List" },
        {
          t: "table",
          head: ["คุณสมบัติ", "Adjacency Matrix (ตาราง 2 มิติ $V \\times V$)", "Adjacency List (Dictionary of Lists)"],
          rows: [
            ["Space Complexity", "🐢 $O(V^2)$ เปลือง RAM มากสำหรับกราฟขนาดใหญ่", "⚡ **$O(V + E)$** ประหยัดพื้นที่สูงสุด"],
            ["หาว่ามีเส้นเชื่อม $u \\to v$ ไหม", "⚡ $O(1)$ ตรวจดู `matrix[u][v]`", "🐢 $O(\\text{degree}(u))$ ต้องสแกนหาในลิสต์"],
            ["หาเพื่อนบ้านทั้งหมดของ $u$", "🐢 $O(V)$ ต้องวนลูปสแกนทั้งแถว", "⚡ **$O(\\text{degree}(u))$** อ่านเฉพาะตัวที่มีจริง"],
            ["มาตรฐานในการสัมภาษณ์งาน", "ใช้เมื่อกราฟเป็น Dense Graph ($E \\approx V^2$)", "🔥 **ใช้ใน 95% ของโจทย์สัมภาษณ์งานทั้งหมด**"],
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "Python: การสร้าง Adjacency List และการท่องด้วย BFS / DFS",
          c: `from collections import defaultdict, deque

# 1. แปลงรายการเส้นเชื่อม (Edge List) เป็น Adjacency List
edges = [[0, 1], [0, 2], [1, 2], [2, 0], [2, 3], [3, 3]]
graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)

# 2. Breadth-First Search (BFS) ด้วย Queue (ท่องทีละชั้นหาระยะสั้นสุด)
def bfs(start_node: int) -> list[int]:
    visited = {start_node}
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

# 3. Depth-First Search (DFS) ด้วย Recursion (เดินลึกสุดทาง)
def dfs(start_node: int) -> list[int]:
    visited = set()
    order = []
    
    def walk(node):
        visited.add(node)
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                walk(neighbor)
                
    walk(start_node)
    return order

print("BFS Traversal:", bfs(2)) # [2, 0, 3, 1]
print("DFS Traversal:", dfs(2)) # [2, 0, 1, 3]`,
        },
        { t: "h2", c: "การตรวจจับวงวน (Cycle Detection)" },
        {
          t: "p",
          c: "- **ในกราฟไม่มีทิศทาง (Undirected)**: ใช้ DFS และส่ง `parent` โหนดเข้าไปด้วย หากเจอเพื่อนบ้านที่เคย `visited` แล้ว และเพื่อนบ้านนั้นไม่ใช่ `parent` แปลว่ามี Cycle!\n- **ในกราฟมีทิศทาง (Directed)**: ใช้เทคนิค **3-Color State** (ขาว: ยังไม่เคยแตะ, เทา: อยู่ใน Call Stack ปัจจุบัน, ดำ: ตรวจเสร็จสิ้นแล้ว) หากเดินไปชนโหนดสีเทา แปลว่ามี Cycle วนกลับมาหาบรรพบุรุษ!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch12-shortest-path": {
    slug: "dsa-ch12-shortest-path",
    title: {
      th: "Shortest Path: Unweighted BFS, Dijkstra & Bellman-Ford",
      en: "Shortest Path Algorithms: BFS, Dijkstra's Min-Heap & Bellman-Ford",
    },
    lead: {
      th: "เจาะลึก 3 อัลกอริทึมค้นหาเส้นทางที่สั้นที่สุด: BFS สำหรับกราฟไร้น้ำหนัก, Dijkstra ด้วย Priority Queue ใน O((V + E) log V), และ Bellman-Ford รับมือน้ำหนักติดลบ",
      en: "Master single-source shortest path: unweighted BFS, Dijkstra's priority queue relaxation, and Bellman-Ford negative weight cycle detection.",
    },
    group: "บทที่ 12: กราฟและอัลกอริทึมโครงข่าย (Graph Theory & Networks)",
    blocks: {
      th: [
        { t: "h2", c: "เลือกใช้อัลกอริทึม Shortest Path ตัวไหนดี?" },
        {
          t: "table",
          head: ["สถานการณ์ของกราฟ", "อัลกอริทึมที่ควรใช้", "Time Complexity", "จุดเด่น"],
          rows: [
            ["กราฟไม่มีน้ำหนัก (Unweighted)", "**BFS (Breadth-First Search)**", "⚡ **O(V + E)**", "ง่ายและเร็วที่สุด ทุกเส้นมีน้ำหนักเท่ากับ 1"],
            ["กราฟมีน้ำหนักที่เป็นบวกทั้งหมด", "**Dijkstra's Algorithm**", "🚀 **O((V + E) log V)**", "ใช้ Min-Heap ผ่อนคลายระยะทาง (Relaxation)"],
            ["กราฟมีน้ำหนักติดลบ (Negative Weights)", "**Bellman-Ford Algorithm**", "🐢 **O(V × E)**", "สามารถตรวจจับ Negative Weight Cycle ได้"],
          ],
        },
        { t: "h2", c: "Dijkstra's Algorithm ฉบับสมบูรณ์ (Priority Queue)" },
        {
          t: "code",
          lang: "python",
          label: "Python: Dijkstra's Algorithm ด้วย heapq",
          c: `import heapq

def dijkstra(n: int, edges: list[list[int]], start: int) -> dict[int, int]:
    # 1. สร้าง Adjacency List พร้อมค่าน้ำหนัก: {u: [(v, weight), ...]}
    graph = {i: [] for i in range(n)}
    for u, v, w in edges:
        graph[u].append((v, w))
        graph[v].append((u, w)) # ถ้าเป็นกราฟไม่มีทิศทาง
        
    # 2. เก็บระยะทางสั้นสุดจาก start: ค่าเริ่มต้นเป็น Infinity
    distances = {i: float('inf') for i in range(n)}
    distances[start] = 0
    
    # 3. Min-Heap เก็บ Tuple: (ระยะทางปัจจุบัน, โหนด)
    min_heap = [(0, start)]
    
    while min_heap:
        curr_dist, u = heapq.heappop(min_heap)
        
        # หากระยะทางที่ดึงออกมามากกว่าที่เคยบันทึกไว้ ให้ข้าม (Lazy Deletion)
        if curr_dist > distances[u]:
            continue
            
        for neighbor, weight in graph[u]:
            new_dist = curr_dist + weight
            # ขั้นตอน Relaxation: เจอเส้นทางที่สั้นกว่า!
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                heapq.heappush(min_heap, (new_dist, neighbor))
                
    return distances

# ทดสอบ
edges = [[0, 1, 4], [0, 2, 1], [2, 1, 2], [1, 3, 1], [2, 3, 5]]
print(dijkstra(4, edges, 0)) # {0: 0, 1: 3, 2: 1, 3: 4}`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch12-minimum-spanning-tree": {
    slug: "dsa-ch12-minimum-spanning-tree",
    title: {
      th: "Minimum Spanning Tree (MST): Prim vs Kruskal (Union-Find)",
      en: "Minimum Spanning Trees: Kruskal's DSU & Prim's Cut Property",
    },
    lead: {
      th: "แก้ปัญหาการลากสายเคเบิลและโครงข่ายด้วยต้นไม้ทอดข้ามต่ำสุด: Kruskal's Algorithm ร่วมกับ Disjoint Set Union (Union-Find) และ Prim's Algorithm",
      en: "Solve network topology optimization: Kruskal's algorithm with Disjoint Set Union (DSU / Union-Find) and Prim's cut property.",
    },
    group: "บทที่ 12: กราฟและอัลกอริทึมโครงข่าย (Graph Theory & Networks)",
    blocks: {
      th: [
        { t: "h2", c: "Minimum Spanning Tree (MST) คืออะไร?" },
        {
          t: "p",
          c: "สมมติคุณเป็นวิศวกรวางระบบเครือข่ายอินเทอร์เน็ตเชื่อมต่อเมือง $V$ เมือง คุณต้องการเชื่อมให้ทุกเมืองสามารถส่งข้อมูลหากันได้ทั้งหมด โดยใช้ **งบประมาณค่าสายเคเบิลรวมต่ำที่สุด**:\n- กราฟย่อยที่เชื่อมทุกโหนดเข้าด้วยกันโดย **ไม่มี Cycle** เรียกว่า **Spanning Tree** (มีเส้นเชื่อมพอดี $V - 1$ เส้น)\n- Spanning Tree ที่มีผลรวมค่าน้ำหนักเส้นเชื่อมน้อยที่สุด เรียกว่า **Minimum Spanning Tree (MST)**",
        },
        { t: "h2", c: "Kruskal's Algorithm & Disjoint Set Union (DSU / Union-Find)" },
        {
          t: "p",
          c: "Kruskal ใช้หลักการ Greedy ที่สวยงามมาก:\n1. เรียงเส้นเชื่อมทั้งหมดตามน้ำหนักจากน้อยไปมาก\n2. หยิบเส้นเชื่อมที่สั้นที่สุดมาเชื่อมเข้าด้วยกันทีละเส้น โดยใช้ **Union-Find** ตรวจสอบว่าเส้นเชื่อมนี้จะทำให้เกิด Cycle หรือไม่ หากไม่เกิด Cycle ให้รวมร่างได้เลย!",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Union-Find Class พร้อม Path Compression และ Union by Rank",
          c: `class UnionFind:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, i: int) -> int:
        # Path Compression: ปรับให้ชี้ตรงไปที่รากสูงสุดเพื่อความเร็วเกือบ O(1)
        if self.parent[i] != i:
            self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i: int, j: int) -> bool:
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i == root_j:
            return False # อยู่กลุ่มเดียวกันอยู่แล้ว หากเชื่อมจะเกิด Cycle!
            
        # Union by Rank: เอากลุ่มที่เตี้ยกว่ามาต่อใต้กลุ่มที่สูงกว่า
        if self.rank[root_i] < self.rank[root_j]:
            self.parent[root_i] = root_j
        elif self.rank[root_i] > self.rank[root_j]:
            self.parent[root_j] = root_i
        else:
            self.parent[root_j] = root_i
            self.rank[root_i] += 1
        return True

def kruskal_mst(n: int, edges: list[list[int]]) -> int:
    # 1. เรียงเส้นเชื่อมตามน้ำหนัก ascending: (u, v, weight)
    edges.sort(key=lambda x: x[2])
    uf = UnionFind(n)
    mst_weight = 0
    edges_count = 0
    
    for u, v, weight in edges:
        if uf.union(u, v):
            mst_weight += weight
            edges_count += 1
            if edges_count == n - 1:
                break
                
    return mst_weight`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch12-leetcode": {
    slug: "dsa-ch12-leetcode",
    title: {
      th: "โจทย์สัมภาษณ์กราฟขั้นสูง: Course Schedule & Number of Islands",
      en: "Advanced Graph Interview Problems: Topological Sort & Grid Traversal",
    },
    lead: {
      th: "พิชิตโจทย์สัมภาษณ์กราฟยอดนิยม: Topological Sort ด้วย Kahn's Algorithm (Course Schedule - LeetCode 207) และ Number of Islands (LeetCode 200)",
      en: "Master DAG dependency resolution with Kahn's Topological Sort and 2D grid component counting in Number of Islands.",
    },
    group: "บทที่ 12: กราฟและอัลกอริทึมโครงข่าย (Graph Theory & Networks)",
    blocks: {
      th: [
        { t: "h2", c: "1. Topological Sort & Kahn's Algorithm (Course Schedule - LeetCode 207)" },
        {
          t: "p",
          c: "โจทย์ให้ตรวจสอบว่าเราสามารถลงทะเบียนเรียนวิชาทั้งหมดได้หรือไม่ โดยมีเงื่อนไขวิชาบังคับก่อน (Prerequisites):\n- ปัญหานี้คือการจัดเรียงลำดับใน **Directed Acyclic Graph (DAG)**\n- เราใช้ **Kahn's Algorithm (In-degree Queue)**: นับจำนวนวิชาที่ต้องเรียนก่อน (In-degree) วิชาใดที่มี In-degree เป็น 0 สามารถเรียนได้ทันที จากนั้นลด In-degree ของวิชาถัดไปลง!",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Kahn's Algorithm สำหรับ Course Schedule O(V + E)",
          c: `from collections import deque, defaultdict

def can_finish_courses(num_courses: int, prerequisites: list[list[int]]) -> bool:
    in_degree = [0] * num_courses
    adj = defaultdict(list)
    
    for course, prereq in prerequisites:
        adj[prereq].append(course)
        in_degree[course] += 1
        
    # คิวเก็บวิชาที่ไม่มีเงื่อนไขบังคับก่อน (In-degree == 0)
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    completed_courses = 0
    
    while queue:
        curr = queue.popleft()
        completed_courses += 1
        
        for neighbor in adj[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    return completed_courses == num_courses

print(can_finish_courses(2, [[1, 0]]))          # True (เรียน 0 ก่อน แล้วเรียน 1)
print(can_finish_courses(2, [[1, 0], [0, 1]]))  # False (เกิด Cycle วนรอบ เรียนไม่ได้!)`,
        },
        { t: "h2", c: "2. Number of Islands บนตาราง 2 มิติ (LeetCode 200)" },
        {
          t: "p",
          c: "นับจำนวนเกาะ ('1' = ดิน, '0' = น้ำ) โดยเกาะเชื่อมต่อกันในแนวตั้งและแนวนอน: เราท่องตารางทีละช่อง เมื่อเจอ '1' ให้เรียก BFS/DFS เพื่อ 'จมเกาะ' (Sinking the island เป็น '0') แล้วนับเกาะเพิ่ม 1:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Number of Islands ด้วย Grid DFS O(M × N)",
          c: `def num_islands(grid: list[list[str]]) -> int:
    if not grid:
        return 0
        
    rows, cols = len(grid), len(grid[0])
    islands_count = 0
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
            
        grid[r][c] = '0' # จมเกาะเพื่อไม่ให้วนซ้ำ
        # ท่อง 4 ทิศทาง
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
        
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                islands_count += 1
                dfs(r, c) # จมเกาะนี้ทั้งหมด
                
    return islands_count`,
        },
        {
          t: "callout",
          title: "🎉 ยินดีด้วย! คุณพิชิตหลักสูตร Data Structures & Algorithms ฉบับสมบูรณ์แล้ว",
          c: "คุณได้เดินทางผ่านครบทั้ง 12 บทเรียน 49 หัวข้อย่อย ตั้งแต่รากฐานหน่วยความจำคอมพิวเตอร์ Big-O โครงสร้างเชิงเส้น ต้นไม้ และสี่กระบวนทัศน์อัลกอริทึมขั้นสูง บัดนี้คุณมีความพร้อมทั้งในด้านกรอบความคิดเชิงวิศวกรรม (Engineering Mindset) และความพร้อมในการสอบสัมภาษณ์งานระดับสากล!",
        },
      ],
      en: [],
    },
  },
};
