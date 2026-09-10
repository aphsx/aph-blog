import type { Page } from "@/lib/types";

export const chapter12Pages: Record<string, Page> = {
  "dsa-ch12-intro": {
    slug: "dsa-ch12-intro",
    title: {
      th: "Graph Algorithms: อัลกอริทึมบนกราฟขั้นสูง",
      en: "Advanced Graph Algorithms: Overview & Applications",
    },
    lead: {
      th: "ภาพรวมอัลกอริทึมกราฟขั้นสูง: การค้นหาเส้นทางที่สั้นที่สุด (Shortest Path), โครงข่ายเชื่อมโยงต่ำสุด (MST) และการจัดลำดับการทำงาน (Topological Sort)",
      en: "Advanced graph foundations: shortest path families, minimum spanning trees, and topological dependencies.",
    },
    group: "บทที่ 12: กราฟและอัลกอริทึมโครงข่าย (Graphs & Network Algorithms)",
    blocks: {
      th: [
        {
          t: "p",
          c: "กราฟเป็นโครงสร้างที่จำลองระบบในโลกจริงได้ครอบคลุมที่สุด เช่น โครงข่ายถนน GPS (Google Maps), เครือข่ายเพื่อนใน Facebook, ระบบ Router อินเทอร์เน็ต และการตรวจสอบการคอมไพล์โค้ดที่ขึ้นต่อกัน (Dependency Graph)",
        },
        { t: "h2", c: "3 ปัญหาหลักของ Graph Algorithms" },
        {
          t: "ul",
          c: [
            "**1. Shortest Path (เส้นทางที่สั้นที่สุด)**: หาเส้นทางที่มีผลรวมค่าน้ำหนักน้อยที่สุดจากจุด A ไป B",
            "**2. Minimum Spanning Tree (MST)**: หาชุดของเส้นเชื่อมที่เชื่อมทุกโหนดเข้าด้วยกันโดยไม่มี Cycle และมีต้นทุนรวมต่ำที่สุด (เช่น การเดินสายเคเบิลหรือท่อประปา)",
            "**3. Topological Sort (การจัดลำดับตามเงื่อนไขก่อนหลัง)**: การเรียงลำดับงานใน Directed Acyclic Graph (DAG) เช่น วิชาที่ต้องลงทะเบียนเรียนก่อน-หลัง",
          ],
        },
      ],
      en: [],
    },
  },

  "dsa-ch12-shortest-path": {
    slug: "dsa-ch12-shortest-path",
    title: {
      th: "Shortest Path: Dijkstra, Bellman-Ford & Floyd-Warshall",
      en: "Shortest Path: Dijkstra, Bellman-Ford & Floyd-Warshall",
    },
    lead: {
      th: "พิชิต 3 ตระกูลเส้นทางที่สั้นที่สุด: Dijkstra (น้ำหนักบวก), Bellman-Ford (น้ำหนักลบ & ตรวจ Cycle ลบ) และ Floyd-Warshall (ทุกคู่จุด O(V³))",
      en: "Master single-source and all-pairs shortest paths: Dijkstra, Bellman-Ford with negative cycles, and Floyd-Warshall dynamic programming.",
    },
    group: "บทที่ 12: กราฟและอัลกอริทึมโครงข่าย (Graphs & Network Algorithms)",
    blocks: {
      th: [
        { t: "h2", c: "1. Dijkstra's Algorithm (กราฟน้ำหนักไม่ติดลบ)" },
        {
          t: "p",
          c: "Dijkstra อาศัยหลักการ Greedy ผสมกับ **Priority Queue (Min-Heap)** ขยายโหนดที่มีระยะทางสะสมน้อยที่สุดเรื่อยๆ (**Edge Relaxation**):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Dijkstra's Algorithm ด้วย heapq (O((V + E) log V))",
          c: `import heapq

def dijkstra(graph: dict[int, list[tuple[int, int]]], start: int) -> dict[int, int]:
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]  # (distance, node)
    
    while pq:
        curr_dist, u = heapq.heappop(pq)
        
        if curr_dist > distances[u]:
            continue
            
        for v, weight in graph[u]:
            distance = curr_dist + weight
            if distance < distances[v]:
                distances[v] = distance
                heapq.heappush(pq, (distance, v))
                
    return distances

graph_example = {
    0: [(1, 4), (2, 1)],
    1: [(3, 1)],
    2: [(1, 2), (3, 5)],
    3: []
}
print("ระยะทางสั้นสุดจาก 0:", dijkstra(graph_example, 0))  # {0: 0, 1: 3, 2: 1, 3: 4}`,
        },
        { t: "h2", c: "2. Bellman-Ford Algorithm (รองรับน้ำหนักลบ & ตรวจจับ Negative Cycle)" },
        {
          t: "p",
          c: "หากกราฟมีน้ำหนักติดลบ Dijkstra จะให้คำตอบผิด! Bellman-Ford ทำการ Relax ขอบทั้งหมด $V - 1$ รอบ และถ้าทำรอบที่ $V$ แล้วระยะทางยังลดลงได้อีก แปลว่ามี **วงจรน้ำหนักลบ (Negative Weight Cycle)**:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Bellman-Ford Algorithm (O(V * E))",
          c: `def bellman_ford(n: int, edges: list[tuple[int, int, int]], src: int) -> tuple[list[float], bool]:
    """คืนค่า (distances, has_negative_cycle)"""
    dist = [float('inf')] * n
    dist[src] = 0
    
    # 1. Relax ทุก Edge ซ้ำ V - 1 รอบ
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                
    # 2. ตรวจสอบรอบที่ V: ถ้ายังลดค่าได้อีก แสดงว่ามี Negative Cycle
    has_neg_cycle = False
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            has_neg_cycle = True
            break
            
    return dist, has_neg_cycle

# ขอบ: (u, v, weight)
sample_edges = [(0, 1, -1), (0, 2, 4), (1, 2, 3), (1, 3, 2), (1, 4, 2), (3, 2, 5), (3, 1, 1), (4, 3, -3)]
dists, neg_cycle = bellman_ford(5, sample_edges, 0)
print("ระยะทาง:", dists, "| มี Cycle ติดลบหรือไม่:", neg_cycle)`,
        },
        { t: "h2", c: "3. Floyd-Warshall Algorithm (All-Pairs Shortest Path O(V³))" },
        {
          t: "p",
          c: "หาเส้นทางสั้นที่สุดระหว่าง **ทุกคู่จุดยอด (u, v)** ในกราฟด้วยแนวคิด Dynamic Programming โดยพิจารณาว่าการแวะผ่านจุดยอด $k$ จะทำให้ทางสั้นลงหรือไม่:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Floyd-Warshall O(V³)",
          c: `def floyd_warshall(matrix: list[list[float]]) -> list[list[float]]:
    V = len(matrix)
    # dist[i][j] คือระยะทางสั้นสุดจาก i ไป j
    dist = [row[:] for row in matrix]
    
    for k in range(V):          # จุดยอดคนกลางที่แวะผ่าน
        for i in range(V):      # จุดต้นทาง
            for j in range(V):  # จุดปลายทาง
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    
    return dist

INF = float('inf')
adj_matrix = [
    [0, 5, INF, 10],
    [INF, 0, 3, INF],
    [INF, INF, 0, 1],
    [INF, INF, INF, 0]
]
shortest_matrix = floyd_warshall(adj_matrix)
print("ระยะทางสั้นสุดระหว่างทุกคู่จุด:")
for row in shortest_matrix:
    print(row)`,
        },
        {
          t: "callout",
          title: "📌 ตารางสรุปการเลือกใช้อัลกอริทึม Shortest Path",
          c: "- **กราฟไม่มีน้ำหนัก (Unweighted)**: ใช้ **BFS** (O(V + E))\\n- **กราฟน้ำหนักไม่ติดลบ (Non-negative)**: ใช้ **Dijkstra** (O((V + E) log V))\\n- **กราฟมีน้ำหนักติดลบ (Negative weights)**: ใช้ **Bellman-Ford** (O(V * E))\\n- **ต้องการระยะทางทุกคู่โหนด (All-pairs)**: ใช้ **Floyd-Warshall** (O(V³))",
        },
      ],
      en: [],
    },
  },

  "dsa-ch12-minimum-spanning-tree": {
    slug: "dsa-ch12-minimum-spanning-tree",
    title: {
      th: "Minimum Spanning Tree: Prim & Kruskal",
      en: "Minimum Spanning Tree: Kruskal's & Prim's Algorithms",
    },
    lead: {
      th: "การเชื่อมต่อทุกโหนดให้ครบด้วยต้นทุนรวมต่ำที่สุด: Kruskal (เรียงเส้นเชื่อม + Union-Find) เทียบกับ Prim (เติบโตจากจุดยอด + Min-Heap)",
      en: "Connect all nodes with minimal cost: Kruskal's edge-based greedy and Prim's vertex-growing min-heap.",
    },
    group: "บทที่ 12: กราฟและอัลกอริทึมโครงข่าย (Graphs & Network Algorithms)",
    blocks: {
      th: [
        { t: "h2", c: "1. Kruskal's Algorithm (Edge-based Greedy + Union-Find)" },
        {
          t: "p",
          c: "เรียงเส้นเชื่อมทั้งหมดจากน้ำหนักน้อยไปมาก ทยอยหยิบเส้นเชื่อมมาใส่ในคำตอบ หากเส้นเชื่อมนั้น **ไม่ทำให้เกิด Cycle** (ตรวจสอบด้วยโครงสร้าง Disjoint Set Union / Union-Find):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Kruskal's Algorithm with Union-Find (O(E log E))",
          c: `class UnionFind:
    def __init__(self, size: int):
        self.parent = list(range(size))
        self.rank = [0] * size

    def find(self, i: int) -> int:
        if self.parent[i] != i:
            self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, x: int, y: int) -> bool:
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x == root_y:
            return False
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        return True

def kruskal(n: int, edges: list[tuple[int, int, int]]) -> int:
    """edges: (u, v, weight)"""
    edges.sort(key=lambda x: x[2])
    uf = UnionFind(n)
    total_cost = 0
    count = 0

    for u, v, weight in edges:
        if uf.union(u, v):
            total_cost += weight
            count += 1
            if count == n - 1:
                break
    return total_cost

sample_edges = [(0, 1, 10), (0, 2, 6), (0, 3, 5), (1, 3, 15), (2, 3, 4)]
print("ต้นทุนต่ำสุด MST (Kruskal):", kruskal(4, sample_edges))  # 19`,
        },
        { t: "h2", c: "2. Prim's Algorithm (Vertex-growing Greedy + Min-Heap)" },
        {
          t: "p",
          c: "เริ่มต้นจากจุดยอดใดจุดหนึ่ง ขยายต้นไม้ครอบคลุมโดยการหยิบเส้นเชื่อมที่มีน้ำหนักน้อยที่สุดที่เชื่อมจากต้นไม้ไปยังจุดยอดภายนอกเสมอ คล้ายกับ Dijkstra:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Prim's Algorithm ด้วย heapq (O((V + E) log V))",
          c: `import heapq

def prim(n: int, graph: dict[int, list[tuple[int, int]]]) -> int:
    visited = [False] * n
    min_heap = [(0, 0)]  # (cost, node)
    total_cost = 0
    edges_used = 0
    
    while min_heap and edges_used < n:
        cost, u = heapq.heappop(min_heap)
        
        if visited[u]:
            continue
            
        visited[u] = True
        total_cost += cost
        edges_used += 1
        
        for v, weight in graph[u]:
            if not visited[v]:
                heapq.heappush(min_heap, (weight, v))
                
    return total_cost

graph_mst = {
    0: [(1, 10), (2, 6), (3, 5)],
    1: [(0, 10), (3, 15)],
    2: [(0, 6), (3, 4)],
    3: [(0, 5), (1, 15), (2, 4)]
}
print("ต้นทุนต่ำสุด MST (Prim):", prim(4, graph_mst))  # 19`,
        },
        {
          t: "callout",
          title: "⚖️ เปรียบเทียบ: Prim vs Kruskal เลือกใช้อะไรเมื่อไหร่?",
          c: "- **Kruskal**: เหมาะกับ **Sparse Graph** (เส้นเชื่อมน้อย $E \\approx V$) เพราะการ sort ขอบใช้เวลาน้อย\\n- **Prim**: เหมาะกับ **Dense Graph** (เส้นเชื่อมหนาแน่น $E \\approx V^2$) เพราะวิ่งขยายโหนดได้เร็วกว่า",
        },
      ],
      en: [],
    },
  },

  "dsa-ch12-leetcode": {
    slug: "dsa-ch12-leetcode",
    title: {
      th: "Graph LeetCode: Course Schedule, Network Delay & Min Cost Points",
      en: "Graph LeetCode Mastery: Course Schedule, Network Delay & Min Cost Points",
    },
    lead: {
      th: "3 มหาโจทย์กราฟระดับ Top Interview: Course Schedule (LeetCode 207), Network Delay Time (LeetCode 743) และ Min Cost to Connect All Points (LeetCode 1584)",
      en: "Conquer staple interview questions: Topological sort, single-source shortest path, and minimum spanning trees.",
    },
    group: "บทที่ 12: กราฟและอัลกอริทึมโครงข่าย (Graphs & Network Algorithms)",
    blocks: {
      th: [
        { t: "h2", c: "1. Course Schedule: ตรวจสอบ Deadlock (LeetCode 207)" },
        {
          t: "p",
          c: "มีวิชา 0 ถึง $n-1$ เงื่อนไข `[A, B]` คือต้องเรียน B ก่อน A จงตรวจสอบว่าสามารถเรียนครบทุกวิชาได้หรือไม่ (ปัญหาตรวจสอบว่า DAG มี Cycle หรือไม่ ด้วย Kahn's Topological Sort):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Course Schedule ด้วย Kahn's BFS (O(V + E))",
          c: `from collections import deque

def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    adj = {i: [] for i in range(num_courses)}
    in_degree = [0] * num_courses
    
    for crs, pre in prerequisites:
        adj[pre].append(crs)
        in_degree[crs] += 1
        
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    completed = 0
    
    while queue:
        node = queue.popleft()
        completed += 1
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    return completed == num_courses

print(can_finish(2, [[1, 0]]))          # True (เรียน 0 ก่อน 1)
print(can_finish(2, [[1, 0], [0, 1]]))  # False (วงวน)`,
        },
        { t: "h2", c: "2. Network Delay Time: สัญญาณเครือข่าย (LeetCode 743)" },
        {
          t: "p",
          c: "มีโหนดเครือข่าย $n$ จุด ส่งสัญญาณจากโหนด $k$ โดยมีรายการเวลา `times[i] = (u, v, w)` จงหาเวลาที่น้อยที่สุดที่สัญญาณจะกระจายไปถึง **ทุกโหนด** (ถ้าไปไม่ครบส่งคืน -1):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Network Delay Time ด้วย Dijkstra (O(E log V))",
          c: `import heapq

def network_delay_time(times: list[list[int]], n: int, k: int) -> int:
    adj = {i: [] for i in range(1, n + 1)}
    for u, v, w in times:
        adj[u].append((v, w))
        
    min_heap = [(0, k)]
    visited = {}
    
    while min_heap:
        time, u = heapq.heappop(min_heap)
        if u in visited:
            continue
        visited[u] = time
        
        for v, weight in adj[u]:
            if v not in visited:
                heapq.heappush(min_heap, (time + weight, v))
                
    return max(visited.values()) if len(visited) == n else -1

print(network_delay_time([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2))  # 2`,
        },
        { t: "h2", c: "3. Min Cost to Connect All Points (LeetCode 1584)" },
        {
          t: "p",
          c: "กำหนดพิกัดจุด 2D `points` ค่าเชื่อมต่อระหว่างจุดคือระยะทางแมนฮัตตัน $|x_1 - x_2| + |y_1 - y_2|$ จงหาค่าใช้จ่ายต่ำที่สุดในการเชื่อมต่อทุกจุดเข้าด้วยกัน (แก้ด้วย Kruskal's MST):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Min Cost to Connect Points ด้วย Kruskal (O(V² log V))",
          c: `def min_cost_connect_points(points: list[list[int]]) -> int:
    n = len(points)
    edges = []
    
    # สร้างเส้นเชื่อมระหว่างทุกคู่จุด
    for i in range(n):
        for j in range(i + 1, n):
            dist = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
            edges.append((dist, i, j))
            
    edges.sort()
    parent = list(range(n))
    
    def find(i: int) -> int:
        if parent[i] != i:
            parent[i] = find(parent[i])
        return parent[i]
        
    cost = 0
    edges_count = 0
    
    for dist, u, v in edges:
        root_u = find(u)
        root_v = find(v)
        if root_u != root_v:
            parent[root_u] = root_v
            cost += dist
            edges_count += 1
            if edges_count == n - 1:
                break
                
    return cost

print("ต้นทุนต่ำสุดในการเชื่อมจุด:", min_cost_connect_points([[0,0],[2,2],[3,10],[5,2],[7,0]]))  # 20`,
        },
        {
          t: "callout",
          title: "🎉 ยินดีด้วย! คุณสำเร็จหลักสูตร Data Structures & Algorithms ครบถ้วน 100%",
          c: "คุณได้เรียนรู้ตั้งแต่พื้นฐานไวยากรณ์, Memory & Pointers, Linear Data Structures, Trees, Hashing, Sorting, Big-O Analysis, Backtracking, Divide & Conquer, Greedy, Dynamic Programming, ไปจนถึง Advanced Network Graph Algorithms พร้อมทั้งแนวคิดทางทฤษฎีและโค้ดสำหรับตะลุยห้องสัมภาษณ์งาน!",
        },
      ],
      en: [],
    },
  },
};
