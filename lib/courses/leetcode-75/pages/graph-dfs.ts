import type { Page } from "@/lib/types";

export const graphDfsPages: Record<string, Page> = {
  "lc75-intro-graph-dfs": {
    slug: "lc75-intro-graph-dfs",
    title: { th: "Graphs & DFS — พื้นฐาน & แนวคิด", en: "" },
    lead: { th: "รู้จักกราฟตั้งแต่ศูนย์ แล้วสำรวจมันด้วย DFS ลุยลึกไปทางหนึ่งจนสุดก่อนค่อยถอยกลับ", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "หมวดนี้เราจะรู้จัก graph (กราฟ) ซึ่งเป็น data structure (โครงสร้างข้อมูล) ที่ยืดหยุ่นที่สุดอันหนึ่ง ถ้าคุณยังไม่เคยเรียน graph มาก่อนไม่ต้องกังวล เราจะเริ่มจากศูนย์ ค่อย ๆ ปูตั้งแต่ graph คืออะไร เก็บมันในโค้ดยังไง แล้วจึงเรียนเทคนิค traverse (เดินไล่) graph ตัวแรกคือ DFS (Depth-First Search) หรือการลุยลึก" },

              { t: "h2", c: "กราฟคืออะไร" },
              { t: "p", c: "graph คือชุดของ node (โหนด หรือเรียก vertex) ที่มี edge (เส้นเชื่อม) โยงระหว่างกัน ลองนึกถึงแผนที่เมือง เมืองแต่ละเมืองคือ node ถนนที่เชื่อมสองเมืองคือ edge หรือนึกถึงเพื่อนใน social network คนคือ node ความเป็นเพื่อนคือ edge อะไรก็ตามที่เป็นความสัมพันธ์ ระหว่างของหลาย ๆ ชิ้น เอามาเป็น graph ได้หมด" },
              { t: "p", c: "tree (ต้นไม้) ที่เราเรียนไปก่อนหน้านี้จริง ๆ ก็เป็น graph ชนิดพิเศษ (graph ที่ไม่มีวงและเชื่อมกันหมด) graph ทั่วไปอิสระกว่านั้น มันมี cycle (วง) ได้ มีหลายกลุ่มที่ไม่เชื่อมกันได้ และ node หนึ่งจะมี edge กี่เส้นก็ได้" },
              { t: "code", lang: "python", c: `# กราฟไม่มีทิศ วาดเป็นภาพ
        #     0 --- 1
        #     |     |
        #     2 --- 3
        #           |
        #           4
        #
        # node = {0,1,2,3,4} ห้าจุด
        # edge = เส้นเชื่อม เช่น 0-1, 0-2, 1-3, 2-3, 3-4` },

              { t: "h2", c: "มีทิศ vs ไม่มีทิศ (directed vs undirected)" },
              { t: "p", c: "graph แบบ undirected (ไม่มีทิศ) edge เดินได้สองทาง เช่นถ้า A เป็นเพื่อนกับ B แล้ว B ก็เป็นเพื่อนกับ A ด้วย ส่วน graph แบบ directed (มีทิศ) edge เดินได้ทางเดียวตามหัวลูกศร เช่นถนนวันเวย์ ไปจาก A ถึง B ได้ แต่ย้อนกลับไม่ได้ หรือการติดตามบน social ที่ A ติดตาม B ไม่ได้แปลว่า B ติดตาม A การรู้ว่าโจทย์เป็น graph แบบไหนสำคัญมาก เพราะมันเปลี่ยนวิธีเก็บและวิธีเดิน" },

              { t: "h2", c: "เก็บกราฟยังไง — adjacency list" },
              { t: "p", c: "วิธีเก็บ graph ที่นิยมและใช้ง่ายสุดคือ adjacency list (ลิสต์เพื่อนบ้าน) ไอเดียคือใช้ dict ที่ key เป็น node และ value เป็น list ของ node ที่มันเชื่อมถึงโดยตรง พูดง่าย ๆ คือ สำหรับแต่ละ node เราจดไว้ว่ามันเดินไปหาใครได้บ้าง" },
              { t: "code", lang: "python", c: `# สร้าง adjacency list จากภาพด้านบน
from collections import defaultdict

edges = [(0, 1), (0, 2), (1, 3), (2, 3), (3, 4)]

graph = defaultdict(list)
for a, b in edges:
    graph[a].append(b)
    graph[b].append(a)   # ไม่มีทิศ ต้องใส่ทั้งสองทาง

# graph[0] = [1, 2]  -> node 0 เชื่อมกับ 1 และ 2
# graph[3] = [1, 2, 4]

# ถ้าเป็นกราฟมีทิศ (a -> b เท่านั้น) ใส่ทางเดียว
# graph[a].append(b)   # ไม่ต้องใส่ graph[b].append(a)` },

              { t: "h2", c: "DFS — ลุยลึก" },
              { t: "p", c: "DFS (Depth-First Search) คือวิธี traverse graph แบบ ลุยลึกไปทางหนึ่งให้สุดก่อน แล้วค่อยถอยกลับมาลองทางอื่น เหมือนเดินในเขาวงกตแล้วยึดกำแพงขวาไว้ตลอด เดินลึกเข้าไปเรื่อย ๆ จนตัน ค่อยถอยกลับ วิธีที่เขียนง่ายที่สุดคือใช้ recursion (การเรียกตัวเอง)" },
              {
                t: "image",
                src: "/leetcode-75/graph-dfs.gif",
                alt: "Graph DFS: visit deep then backtrack with visited set",
                caption:
                  "Graph DFS: mark visited → ดิ่งไปเพื่อนบ้าน → ตันแล้ว backtrack · ห้ามลืม visited กันวนไม่จบ",
              },
              { t: "p", c: "สิ่งที่ขาดไม่ได้เลยในการเดิน graph คือ set visited (เคยเยือน) ที่จำว่าเราเคยไป node ไหนมาแล้วบ้าง เพราะ graph มี cycle ได้ ถ้าไม่จำ เราจะเดินวนกลับมาที่เดิมไม่รู้จบ (infinite loop) กฎคือ ก่อนจะเดินเข้า node ไหน เช็คก่อนว่าเคยไปหรือยัง ถ้ายังค่อยไป และทันทีที่ไปถึงให้ mark เป็น visited" },
              { t: "code", lang: "python", c: `# template DFS ด้วย recursion จำโครงนี้ไว้ใช้ได้ทุกข้อ
def dfs(node, graph, visited):
    visited.add(node)              # ทำเครื่องหมายว่ามาถึงแล้ว
    # ... ทำอะไรกับ node ตรงนี้ เช่น นับ, เก็บค่า ...
    for nxt in graph[node]:        # ลองเพื่อนบ้านทีละตัว
        if nxt not in visited:     # ถ้ายังไม่เคยไป
            dfs(nxt, graph, visited)   # ลุยลึกต่อ

visited = set()
dfs(0, graph, visited)             # เริ่มจาก node 0` },
              { t: "callout", title: "หัวใจของ DFS", c: "จำแค่สามอย่าง หนึ่ง mark visited ทันทีที่มาถึง node สอง iterate (วน) ดูเพื่อนบ้าน (neighbor) ทุกตัว สาม ตัวไหนยังไม่ visited ค่อยเรียก dfs ซ้ำเข้าไปลึก ๆ ถ้าลืม visited จะวนไม่จบเมื่อ graph มี cycle" },
              { t: "callout", c: "หมวดนี้มี 4 ข้อ เข้าห้องครบไหม นับแคว้น กลับทิศถนน และคำนวณอัตราส่วน พร้อมแล้วกดถัดไปเริ่มข้อแรกได้เลย" },
      ],
      en: [],
    },
  },

  "lc75-p43": {
    slug: "lc75-p43",
    title: { th: "ข้อ 43 · LC841 Keys and Rooms (กุญแจกับห้อง) 🟡", en: "" },
    lead: { th: "มองห้องเป็น node กุญแจเป็น edge ทำ DFS จากห้อง 0 แล้วเช็คว่า visited ครบทุกห้องไหม", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC841): มี n ห้องเลข 0 ถึง n-1 ทุกห้องล็อกอยู่ ยกเว้นห้อง 0 เป้าหมายคือเข้าให้ครบทุกห้อง แต่ห้ามเข้าห้องที่ล็อกโดยไม่มีกุญแจ เมื่อเข้าห้องใดห้องหนึ่งแล้วอาจพบกุญแจชุดหนึ่งอยู่ในห้องนั้น กุญแจแต่ละดอกมีเลขกำกับว่าไขห้องไหนได้ และหยิบเก็บไปใช้เปิดห้องอื่นต่อได้ กำหนด array rooms โดย rooms[i] คือชุดกุญแจที่จะได้ถ้าเข้าห้อง i ให้ return true ถ้าสามารถเข้าได้ครบทุกห้อง ไม่งั้น return false" },
              {
                t: "example",
                c: [
                  {
                    input: "rooms = [[1],[2],[3],[]]",
                    output: "true",
                    explain: "เริ่มห้อง 0 หยิบกุญแจ 1 ไปเปิดห้อง 1 หยิบกุญแจ 2 ไปเปิดห้อง 2 หยิบกุญแจ 3 ไปเปิดห้อง 3 — เข้าครบทุกห้อง",
                  },
                  {
                    input: "rooms = [[1,3],[3,0,1],[2],[0]]",
                    output: "false",
                    explain: "ไม่มีกุญแจห้อง 2 อยู่ในห้องใดที่เข้าถึงได้เลย จึงไม่สามารถเข้าห้อง 2 ได้",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "n == rooms.length",
                "2 <= n <= 1000",
                "0 <= rooms[i].length <= 1000",
                "1 <= ผลรวมความยาวของ rooms[i] ทั้งหมด <= 3000",
                "0 <= rooms[i][j] < n",
                "ค่ากุญแจใน rooms[i] แต่ละห้องไม่ซ้ำกัน",
                ],
              },
              { t: "callout", c: "rooms เป็น adjacency list (ลิสต์เพื่อนบ้าน) ของ directed graph (กราฟมีทิศ) อยู่แล้ว ไม่ต้องแปลงอะไร" },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ DFS บน directed graph (กราฟมีทิศ) มองห้องเป็น node (โหนด) และกุญแจในห้องเป็น edge (เส้นเชื่อม) ที่ชี้ไปยังห้องที่มันเปิดได้ โจทย์นี้จริง ๆ คือการถามว่า graph เชื่อมถึงกันหมดจากจุดเริ่มไหม (reachability) เลือก DFS เพราะเราแค่ต้อง traverse (เดินไล่) ให้ทั่วทุกที่ที่ไปถึงได้ ไม่ได้สนใจระยะทาง" },
              { t: "p", c: "ไอเดียคือ DFS จากห้อง 0 เก็บทุกห้องที่ไปถึงลง set visited (เคยเยือน) แล้วสุดท้าย compare (เทียบ) จำนวนห้องที่ visited ได้กับจำนวนห้องทั้งหมด ถ้าเท่ากันแปลว่าเข้าครบ" },
              { t: "ol", c: [
                "สร้าง set visited ว่าง ๆ ไว้จำห้องที่เข้าแล้ว",
                "เขียนฟังก์ชัน dfs(room) ที่ mark room ลง visited",
                "ในนั้น iterate (วน) กุญแจทุกดอกในห้องนี้ ถ้ากุญแจชี้ไปห้องที่ยังไม่ visited ให้ dfs เข้าไปต่อ",
                "เรียก dfs(0) เพื่อเริ่มจากห้อง 0",
                "คืนผลว่าจำนวนห้องใน visited เท่ากับจำนวนห้องทั้งหมด (len(rooms)) หรือไม่",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ลืมเช็ค if key not in visited ก่อนเรียก dfs ทำให้ recursion (การเรียกตัวเอง) วนไม่จบเมื่อกุญแจชี้วนกลับกัน (บางห้องมีกุญแจชี้กลับไปห้องเดิม)" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `def can_visit_all_rooms(rooms):
    visited = set()

    def dfs(room):
        visited.add(room)              # เข้าห้องนี้แล้ว
        for key in rooms[room]:        # กุญแจแต่ละดอกในห้องนี้
            if key not in visited:     # ถ้ายังไม่เคยเข้าห้องนั้น
                dfs(key)               # เข้าไปเลย

    dfs(0)                             # เริ่มจากห้อง 0
    return len(visited) == len(rooms)  # เข้าครบทุกห้องไหม

print(can_visit_all_rooms([[1], [2], [3], []]))          # True
print(can_visit_all_rooms([[1, 3], [3, 0, 1], [2], [0]]))  # False`, out: `True
False` },
                { t: "p", c: "โจทย์นี้จริง ๆ คือการถามว่า graph เชื่อมถึงกันหมดจากจุดเริ่มไหม (reachability) เรามองห้องเป็น node และกุญแจในห้องเป็น edge แบบ directed ที่ชี้ไปยังห้องที่มันเปิดได้ rooms เองก็เป็น adjacency list อยู่แล้ว ไม่ต้องแปลงอะไร ทำ DFS จากห้อง 0 เก็บทุกห้องที่ไปถึงลง visited แล้วสุดท้าย compare จำนวนห้องที่ visited กับจำนวนห้องทั้งหมด" },
                { t: "p", c: "set visited ทำสองหน้าที่พร้อมกัน ทั้งกันเดินวนซ้ำ และใช้ count (นับ) จำนวนห้องที่เข้าได้ ถ้าไม่มีการเช็ค visited โปรแกรมจะ error จาก recursion ลึกไม่จบเมื่อกุญแจชี้วนกัน" },
                { t: "p", c: "Time O(V + E) traverse ทุก node หนึ่งครั้งและไล่ทุก edge หนึ่งครั้ง V คือจำนวนห้อง E คือจำนวนกุญแจทั้งหมด · Space O(V) จาก visited และความลึกของ call stack" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "โจทย์แนว เข้าถึงทุกจุดจากจุดเริ่มไหม / เชื่อมกันหมดไหม คือ reachability ยิง DFS จากจุดเริ่ม เก็บ visited แล้ว compare จำนวนที่ visited ได้กับจำนวนทั้งหมด" },
      ],
      en: [],
    },
  },

  "lc75-p44": {
    slug: "lc75-p44",
    title: { th: "ข้อ 44 · LC547 Number of Provinces (นับจำนวนจังหวัด) 🟡", en: "" },
    lead: { th: "นับ connected components iterate node ทุกตัว เจอตัวที่ยังไม่ visited คือแคว้นใหม่ แล้ว DFS กวาดให้หมด", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC547): มี n เมือง บางเมืองเชื่อมกันโดยตรง บางเมืองไม่เชื่อม กำหนด n x n matrix ชื่อ isConnected โดย isConnected[i][j] = 1 หมายถึงเมือง i กับเมือง j เชื่อมกันโดยตรง และ isConnected[i][j] = 0 หมายถึงไม่เชื่อม province คือกลุ่มของเมืองที่เชื่อมถึงกันได้ทั้งทางตรงและทางอ้อม ให้ return จำนวน province ทั้งหมด" },
              {
                t: "example",
                c: [
                  {
                    input: "isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
                    output: "2",
                    explain: "เมือง 0 กับ 1 เชื่อมกันโดยตรงเป็นแคว้นเดียว เมือง 2 ไม่เชื่อมกับใครเลย อยู่คนเดียวอีกแคว้น",
                  },
                  {
                    input: "isConnected = [[1,0,0],[0,1,0],[0,0,1]]",
                    output: "3",
                    explain: "ไม่มีเมืองไหนเชื่อมกันเลย แต่ละเมืองจึงเป็นแคว้นของตัวเอง",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "1 <= n <= 200",
                "n == isConnected.length == isConnected[i].length",
                "isConnected[i][j] เป็น 0 หรือ 1",
                "isConnected[i][i] == 1 และ isConnected[i][j] == isConnected[j][i]",
                ],
              },
              { t: "callout", c: "graph ให้มาในรูป adjacency matrix (ตาราง) ไม่ใช่ list เพื่อนบ้าน (neighbor) ของเมือง i คือช่องที่เป็น 1 ในแถว i" },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "นี่คือการนับ connected components คือกลุ่มก้อนของ node (โหนด) ที่เชื่อมถึงกันได้ใน undirected graph (กราฟไม่มีทิศ) ใช้ DFS traverse (เดินไล่) กวาดแต่ละกลุ่ม เลือก DFS เพราะเราแค่ต้องกวาดให้ทั่วทั้งกลุ่มเพื่อ mark ว่าเมืองพวกนี้อยู่แคว้นเดียวกันแล้ว" },
              { t: "p", c: "เทคนิคนับกลุ่มคือ iterate (วน) node ทุกตัวจากข้างนอก ถ้าเจอตัวที่ยังไม่ visited (เคยเยือน) แสดงว่าเราเพิ่งสะดุดเข้าแคว้นใหม่ที่ยังไม่เคยแตะ บวกตัวนับหนึ่ง แล้วยิง DFS เข้าไปกวาดทุกเมืองในแคว้นนั้นให้ visited จนหมด พอ loop (วน) นอกเดินต่อ เมืองที่อยู่แคว้นเดิมจะถูก visited แล้วจึงไม่ถูก count (นับ) ซ้ำ" },
              { t: "ol", c: [
                "อ่านจำนวนเมือง n จากขนาดตาราง แล้วสร้าง set visited",
                "เขียน dfs(city) ที่ mark city แล้ว iterate ดูทุกเมือง other ในแถวนั้น",
                "ถ้า isConnected[city][other] เป็น 1 และ other ยังไม่ visited ให้ dfs(other) ต่อ",
                "ตั้งตัวนับ provinces = 0 แล้ว iterate city ทุกเมืองจากข้างนอก",
                "ถ้า city ยังไม่ visited บวก provinces หนึ่ง แล้ว dfs(city) กวาดทั้งแคว้น",
                "คืน provinces",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "count province ทุกครั้งที่เข้า dfs ซึ่งจะเกิน ต้อง count เฉพาะตอนเริ่มแคว้นใหม่ใน loop นอกเท่านั้น (ตอนเจอเมืองที่ยังไม่ visited)" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "รันบน isConnected = [[1,1,0],[1,1,0],[0,0,1]] (loop นอก iterate city 0,1,2)" },
              { t: "table", head: ["city", "visited แล้ว?", "ทำอะไร", "provinces"], rows: [
                ["0", "ยัง", "แคว้นใหม่ +1, dfs(0) กวาดถึง 1 ด้วย", "1"],
                ["1", "แล้ว (จาก dfs 0)", "ข้าม", "1"],
                ["2", "ยัง", "แคว้นใหม่ +1, dfs(2) อยู่คนเดียว", "2"],
              ] },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `def find_circle_num(is_connected):
    n = len(is_connected)
    visited = set()

    def dfs(city):
        visited.add(city)
        for other in range(n):
            # เชื่อมกันโดยตรง และยังไม่เคยไป
            if is_connected[city][other] == 1 and other not in visited:
                dfs(other)

    provinces = 0
    for city in range(n):
        if city not in visited:        # เจอเมืองที่ยังไม่อยู่แคว้นไหน
            provinces += 1             # นับเป็นแคว้นใหม่
            dfs(city)                  # กวาดทุกเมืองในแคว้นนี้
    return provinces

print(find_circle_num([[1, 1, 0], [1, 1, 0], [0, 0, 1]]))  # 2
print(find_circle_num([[1, 0, 0], [0, 1, 0], [0, 0, 1]]))  # 3`, out: `2
3` },
                { t: "p", c: "connected components คือ กลุ่มก้อน ของ node ที่เชื่อมถึงกันได้ใน undirected graph โจทย์นี้ให้ graph มาในรูปตาราง (adjacency matrix) แทน list โดย is_connected[i][j] บอกว่าเมือง i กับ j เชื่อมกันไหม เราจึงหาเพื่อนบ้านของเมืองด้วยการไล่ทั้งแถวดูว่าช่องไหนเป็น 1" },
                { t: "p", c: "เทคนิคนับกลุ่มคือ iterate node ทุกตัวจากนอก ถ้าเจอตัวที่ยังไม่ visited แสดงว่าเราเพิ่งสะดุดเข้าแคว้นใหม่ที่ยังไม่เคยแตะ บวกตัวนับหนึ่ง แล้วยิง DFS เข้าไปกวาดทุกเมืองในแคว้นนั้นให้ visited จนหมด พอ loop นอกเดินต่อ เมืองที่อยู่แคว้นเดิมจะถูก visited แล้วจึงไม่ถูก count ซ้ำ" },
                { t: "p", c: "Time O(n^2) เพราะต้อง iterate ตาราง n x n · Space O(n) จาก visited และ call stack" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "นับกลุ่ม / เกาะ / แคว้น = นับ connected components iterate node ทุกตัว เจอตัวที่ยังไม่ visited คือกลุ่มใหม่ +1 แล้ว DFS กวาดทั้งกลุ่ม ใช้ได้กับโจทย์ number of islands และเพื่อน ๆ ทั้งหมด" },
      ],
      en: [],
    },
  },

  "lc75-p45": {
    slug: "lc75-p45",
    title: { th: "ข้อ 45 · LC1466 Reorder Routes to Make All Paths Lead to the City Zero (กลับทิศถนนไปเมือง 0) 🟡", en: "" },
    lead: { th: "คิดกลับด้าน เดิน DFS จากเมือง 0 ออกไป edge ไหนชี้ตามทางที่เราเดินออก คือ edge ที่ต้องกลับทิศ", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC1466): มี n เมืองเลข 0 ถึง n-1 และถนน n-1 เส้น ซึ่งเชื่อมทุกเมืองเป็นรูปแบบ tree (เดินทางระหว่างเมืองสองเมืองใดก็มีเส้นทางเดียวเท่านั้น) กระทรวงคมนาคมตัดสินใจกำหนดทิศทางเดินรถทางเดียวให้ถนนทุกเส้นเพราะถนนแคบเกินไป ถนนแทนด้วย connections โดย connections[i] = [ai, bi] หมายถึงถนนจากเมือง ai ไปเมือง bi ปีนี้จะมีงานใหญ่ที่เมืองหลวง (เมือง 0) และมีคนอยากเดินทางไปที่นั่นจำนวนมาก งานของคุณคือกลับทิศถนนบางเส้นเพื่อให้ทุกเมืองสามารถเดินทางไปเมือง 0 ได้ ให้ return จำนวนถนนน้อยที่สุดที่ต้องเปลี่ยนทิศทาง" },
              {
                t: "example",
                c: [
                  {
                    input: "n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]",
                    output: "3",
                    explain: "ต้องกลับทิศถนน 0→1, 1→3, 4→5 เพื่อให้ทุกเมืองไปถึงเมือง 0 ได้",
                  },
                  {
                    input: "n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]",
                    output: "2",
                  },
                  {
                    input: "n = 3, connections = [[1,0],[2,0]]",
                    output: "0",
                    explain: "ถนนทุกเส้นชี้เข้าหาเมือง 0 อยู่แล้วตั้งแต่ต้น ไม่ต้องกลับทิศเลยสักเส้น",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "2 <= n <= 5 × 10^4",
                "connections.length == n - 1 (เป็นต้นไม้ ไม่มีวงรอบ)",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ DFS บน graph ที่เก็บทั้งสองทิศแต่ติดป้าย cost (น้ำหนัก) กุญแจของข้อนี้คือ มองกลับด้าน เราอยากให้ทุกเมืองไปถึงเมือง 0 แต่คิดแบบนั้นตรง ๆ ยาก จึงกลับมุมเป็น ถ้าเราออกเดินจากเมือง 0 ไปหาทุกเมือง ถนนเส้นไหนที่เราเดินสวนทิศของมัน เส้นนั้นแหละที่ต้องกลับทิศ เพราะในสภาพจริงเมืองปลายทางจะเดินย้อนกลับมาหาเมือง 0 ไม่ได้" },
              { t: "p", c: "ถ้าเก็บ graph ตามทิศจริงอย่างเดียว DFS จากเมือง 0 จะเดินไปไม่ทั่วเพราะบางถนนชี้เข้าหา 0 ทริกคือใส่ทั้งสอง edge (แบบ undirected ไม่มีทิศ) เพื่อให้ traverse (เดินไล่) ได้ทั่ว tree แต่ติดป้าย cost ไว้ edge ทิศจริง (a→b ตามที่โจทย์ให้) ติด cost 1 ส่วน edge ปลอมที่เราเติมเพื่อเดินย้อน (b→a) ติด cost 0" },
              { t: "ol", c: [
                "สร้าง graph สำหรับแต่ละ [a,b] เพิ่ม (b, 1) ให้ a และเพิ่ม (a, 0) ให้ b",
                "ตั้ง visited (เคยเยือน) และตัวนับ changes = 0",
                "เขียน dfs(city) mark city แล้ว iterate (วน) เพื่อนบ้าน (neighbor) (nxt, cost)",
                "ถ้า nxt ยังไม่ visited บวก changes ด้วย cost (ถ้าเป็น edge ทิศจริงจะบวก 1) แล้ว dfs(nxt) ต่อ",
                "เรียก dfs(0) เริ่มเดินจากเมือง 0 ออกไปทุกทิศ",
                "คืน changes",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ลืมใส่ edge ย้อนกลับ (cost 0) ทำให้ DFS เดินไปไม่ทั่วเพราะ graph มีทิศ อีกจุดคือสับสนว่าจะ count (นับ) cost ของ edge ไหน จำง่าย ๆ ว่านับเฉพาะ edge ที่ชี้ ออกจาก ต้นทาง (ทิศเดียวกับที่เราเดินออกจากเมือง 0)" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `from collections import defaultdict

def min_reorder(n, connections):
    graph = defaultdict(list)
    for a, b in connections:
        graph[a].append((b, 1))   # ทิศจริง a->b : ถ้าเดินทางนี้จาก 0 ออกไป ต้องกลับ (cost 1)
        graph[b].append((a, 0))   # ทิศปลอมเพิ่มเข้ามาเพื่อเดินได้ทั่ว (cost 0)

    visited = set()
    changes = 0

    def dfs(city):
        nonlocal changes
        visited.add(city)
        for nxt, cost in graph[city]:
            if nxt not in visited:
                changes += cost    # ถ้า edge นี้เป็นทิศจริง (ชี้ออกจาก 0) ต้องกลับ
                dfs(nxt)

    dfs(0)                         # เริ่มเดินจากเมือง 0 ออกไปทุกทิศ
    return changes

print(min_reorder(6, [[0, 1], [1, 3], [2, 3], [4, 0], [4, 5]]))  # 3
print(min_reorder(5, [[1, 0], [1, 2], [3, 2], [3, 4]]))          # 2`, out: `3
2` },
                { t: "p", c: "กุญแจของข้อนี้คือ มองกลับด้าน เราอยากให้ทุกเมืองไปถึงเมือง 0 แต่คิดแบบนั้นตรง ๆ ยาก จึงกลับมุมเป็น ถ้าเราออกเดินจากเมือง 0 ไปหาทุกเมือง ถนนเส้นไหนที่เราเดินสวนทิศของมัน เส้นนั้นแหละที่ต้องกลับทิศ เพราะในสภาพจริงเมืองปลายทางจะเดินย้อนกลับมาหาเมือง 0 ไม่ได้" },
                { t: "p", c: "ทริกในการเก็บ graph คือ ใส่ทั้งสอง edge แบบ undirected เพื่อให้ DFS traverse ได้ทั่ว tree แต่ติดป้าย cost ไว้ด้วย edge ทิศจริง (a->b ตามที่โจทย์ให้) ติด cost 1 ส่วน edge ปลอมที่เราเติมเพื่อเดินย้อน (b->a) ติด cost 0 พอ DFS ออกจากเมือง 0 ถ้าเราวิ่งไปตาม edge cost 1 แปลว่ากำลังเดินตามทิศที่ชี้ออกจากเมือง 0 ซึ่งจริง ๆ เมืองนั้นควรชี้เข้าหา 0 จึงต้องกลับทิศ บวก changes" },
                { t: "p", c: "Time O(n) traverse ทุกเมืองและ edge หนึ่งครั้ง (edge มี n-1 เส้น) · Space O(n) จาก graph visited และ call stack" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "เมื่อโจทย์ถามเรื่องทิศทางไปหาจุดหนึ่ง ลองคิดกลับด้าน เดินออกจากจุดนั้นแทน และเก็บ graph สองทิศพร้อมติด cost ต่าง edge จริงกับ edge ที่เติมเพื่อเดิน เป็นทริกที่ใช้ได้ในโจทย์ directed graph หลายข้อ" },
      ],
      en: [],
    },
  },

  "lc75-p46": {
    slug: "lc75-p46",
    title: { th: "ข้อ 46 · LC399 Evaluate Division (คำนวณการหาร) 🟡", en: "" },
    lead: { th: "weighted graph แต่ละตัวแปรเป็น node สมการเป็น edge ที่มีค่า หา x/y ด้วย DFS คูณน้ำหนักตลอดทาง", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC399): กำหนด array ของคู่ตัวแปร equations และ array ของจำนวนจริง values โดย equations[i] = [Ai, Bi] และ values[i] แทนสมการ Ai / Bi = values[i] กำหนด queries มาด้วย โดย queries[j] = [Cj, Dj] แทนคำถามที่ j ว่า Cj / Dj มีค่าเท่าไร ให้ return คำตอบของทุก query ถ้า query ไหนหาคำตอบไม่ได้ (ตัวแปรไม่รู้จัก หรือไม่เชื่อมถึงกัน) ให้ตอบ -1.0 สำหรับ query นั้น" },
              {
                t: "example",
                c: [
                  {
                    input: 'equations = [["a","b"],["b","c"]], values = [2.0, 3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]',
                    output: "[6.0, 0.5, -1.0, 1.0, -1.0]",
                    explain: "a/c = a/b × b/c = 2 × 3 = 6.0 · b/a คือส่วนกลับ = 0.5 · a/e หาไม่ได้เพราะไม่มี e · a/a = 1.0 เพราะ a รู้จัก · x/x = -1.0 เพราะไม่รู้จัก x เลย",
                  },
                  {
                    input: 'equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"]]',
                    output: "[0.5, 2.0]",
                    explain: "a/b = 0.5 ตามสมการโดยตรง ส่วน b/a คือส่วนกลับของ a/b เท่ากับ 1/0.5 = 2.0",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "1 <= equations.length <= 20",
                "0.0 < values[i] <= 20.0",
                "1 <= queries.length <= 20",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ DFS บน weighted graph (กราฟถ่วงน้ำหนัก) คือ edge (เส้นเชื่อม) มีตัวเลขกำกับ ไอเดียคือแต่ละตัวแปรเป็น node (โหนด) สมการ a/b = 2.0 บอกว่าจาก a เดินไป b คูณ 2.0 และเพราะ b/a เท่ากับ 1/(a/b) เราจึงเพิ่ม edge ย้อนกลับจาก b ไป a คูณ 1/2.0 ด้วย ทำให้เดินได้สองทาง" },
              { t: "p", c: "การหาคำตอบ x/y คือ traverse (เดินไล่) จาก x ไป y แล้วคูณ weight (น้ำหนัก) ของ edge ที่ผ่านทั้งหมดสะสมกันไป DFS ที่นี่ต่างจากข้อก่อน ๆ ตรงที่มันต้อง return (คืนค่า) ผลคูณสะสมกลับขึ้นมา ไม่ใช่แค่ mark เมื่อเดินไปเจอ dst เราคืน 1.0 แล้วระหว่างถอย recursion (การเรียกตัวเอง) กลับ แต่ละชั้นคูณ weight ของ edge ตัวเองเข้าไป" },
              { t: "ol", c: [
                "สร้าง graph graph[a][b] = val และ graph[b][a] = 1/val สำหรับทุกสมการ",
                "เขียน dfs(src, dst, visited) ถ้า src หรือ dst ไม่มีใน graph คืน -1.0 (ไม่รู้จัก)",
                "ถ้า src == dst คืน 1.0 (เจอปลายทางแล้ว หรือ x/x)",
                "mark src แล้ว iterate (วน) เพื่อนบ้าน (neighbor) (nbr, weight) ที่ยังไม่ visited",
                "เรียก dfs(nbr, dst) ถ้าผลไม่ใช่ -1.0 (มีทางถึง) คืน weight × result",
                "ถ้าลองทุกทางแล้วไปไม่ถึง คืน -1.0 ทำ dfs แยกทีละ query",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ลืมเช็คว่าตัวแปรรู้จักก่อนเช็ค src == dst ทำให้ x/x ตอบ 1.0 ทั้งที่ x ไม่มีในสมการ (ต้องตอบ -1.0) โค้ดจึงเช็ค src not in graph ก่อนแล้วค่อยเช็ค src == dst" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `from collections import defaultdict

def calc_equation(equations, values, queries):
    graph = defaultdict(dict)
    for (a, b), val in zip(equations, values):
        graph[a][b] = val          # a/b = val
        graph[b][a] = 1 / val      # b/a = 1/val

    def dfs(src, dst, visited):
        if src not in graph or dst not in graph:
            return -1.0            # มีตัวแปรที่ไม่รู้จัก
        if src == dst:
            return 1.0             # x/x = 1 (ต้องรู้จัก x ด้วย)
        visited.add(src)
        for nbr, weight in graph[src].items():
            if nbr not in visited:
                result = dfs(nbr, dst, visited)
                if result != -1.0:        # เจอทางถึง dst
                    return weight * result  # คูณน้ำหนักสะสม
        return -1.0                # ลองทุกทางแล้วไปไม่ถึง

    answers = []
    for a, b in queries:
        answers.append(dfs(a, b, set()))
    return answers

eq = [["a", "b"], ["b", "c"]]
vals = [2.0, 3.0]
q = [["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]]
print(calc_equation(eq, vals, q))  # [6.0, 0.5, -1.0, 1.0, -1.0]`, out: `[6.0, 0.5, -1.0, 1.0, -1.0]` },
                { t: "p", c: "ข้อนี้สอน weighted graph (กราฟถ่วงน้ำหนัก) คือ edge มีตัวเลขกำกับ ไอเดียคือแต่ละตัวแปรเป็น node สมการ a/b = 2.0 บอกว่าจาก a เดินไป b คูณ 2.0 และเพราะ b/a = 1/(a/b) เราจึงเพิ่ม edge ย้อนกลับจาก b ไป a คูณ 1/2.0 ด้วย ทำให้เดินได้สองทาง การหาคำตอบ x/y คือ traverse จาก x ไป y แล้วคูณ weight ของ edge ที่ผ่านทั้งหมดสะสมกันไป" },
                { t: "p", c: "DFS ที่นี่ต่างจากข้อก่อน ๆ ตรงที่มันต้อง return ผลคูณสะสมกลับขึ้นมา ไม่ใช่แค่ mark เมื่อเดินไปเจอ dst เราคืน 1.0 แล้วระหว่างถอย recursion กลับ แต่ละชั้นคูณ weight ของ edge ตัวเองเข้าไป ผลลัพธ์ที่โผล่กลับมาถึงจุดเริ่มจึงเป็นผลคูณตลอดเส้นทางพอดี ถ้าลองทุกเพื่อนบ้านแล้วไม่มีทางไหนถึง dst ก็คืน -1.0" },
                { t: "p", c: "edge case ที่ต้องระวังคือ ตัวแปรที่ไม่มีในสมการเลย (เช็ค src not in graph หรือ dst not in graph คืน -1.0) และกรณี a/a ที่ต้องคืน 1.0 เฉพาะเมื่อ a รู้จัก · Time O(Q × (V + E)) แต่ละ query ทำ DFS หนึ่งครั้ง Q คือจำนวน query · Space O(V + E) จาก graph และ visited" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "ความสัมพันธ์เชิงอัตราส่วน / การแปลงหน่วยต่อเนื่อง มองเป็น weighted graph แล้ว DFS สะสมผลคูณตลอดเส้นทาง อย่าลืม edge ย้อนกลับที่เป็นส่วนกลับของ weight" },
      ],
      en: [],
    },
  },
};
