import type { Page } from "@/lib/types";

export const graphDfsPages: Record<string, Page> = {
  "lc75-intro-graph-dfs": {
    slug: "lc75-intro-graph-dfs",
    title: { th: "Graphs & DFS — พื้นฐาน & แนวคิด", en: "" },
    lead: {
      th: "กราฟคือจุดกับเส้นเชื่อม — ต่างจากต้นไม้ตรงที่มีวงและหลายก้อนได้ หน้านี้สอนเก็บด้วย adjacency list, ใช้ visited กันวน, แล้วเดินด้วย DFS",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "ในโปรแกรมจริง เรามักต้องจำความสัมพันธ์ระหว่างของหลายชิ้น เช่น เมืองกับถนน คนกับเพื่อน หรือห้องกับกุญแจที่ไขไปห้องอื่น ความสัมพันธ์แบบนี้ไม่เรียงเป็นแถวเดียว และไม่แตกกิ่งแบบต้นไม้เสมอไป — โครงสร้างที่รับมือได้คือ graph (กราฟ)",
        },
        {
          t: "p",
          c: "หมวด Binary Tree — DFS คุณเดินต้นไม้ด้วย recursion ไปแล้ว หน้านี้เอาเครื่องมือเดิมมาใช้บนกราฟ แต่ต้องเพิ่มของใหม่สองอย่าง: วิธีเก็บเพื่อนบ้าน และ set ที่จำว่าเคยไปจุดไหนแล้ว เพราะกราฟมีวงวนได้",
        },

        { t: "h2", c: "ส่วนที่ 1 · กราฟคืออะไร ต่างจากต้นไม้ยังไง" },
        {
          t: "p",
          c: "graph ประกอบด้วย node (โหนด / จุด — บางทีเรียก vertex) และ edge (เส้นเชื่อม) ที่โยงระหว่างโหนด นึกภาพเมืองกับถนน: เมืองคือโหนด ถนนคือเส้น หรือเพื่อนในกลุ่มแชท: คนคือโหนด ความเป็นเพื่อนคือเส้น",
        },
        {
          t: "p",
          c: "ต้นไม้ทวิภาคที่เรียนไปก็เป็นกราฟชนิดพิเศษ — แต่กราฟทั่วไปอิสระกว่า สิ่งที่ต่างชัดมีสามอย่าง:",
        },
        {
          t: "ul",
          c: [
            "ต้นไม้ไม่มีวง (cycle) — เดินตามลูกศรแล้ววนกลับจุดเดิมไม่ได้ กราฟมีวงได้",
            "ต้นไม้มีราก (root) เป็นจุดเริ่มชัดเจน กราฟอาจไม่มีราก และโหนดหนึ่งอาจถูกชี้จากหลายทาง",
            "ต้นไม้เชื่อมกันก้อนเดียว กราฟอาจมีหลายก้อนที่ไม่เชื่อมถึงกันเลย",
          ],
        },
        {
          t: "p",
          c: "ภาพด้านล่างคือกราฟไม่มีทิศห้าโหนดที่จะใช้ซ้ำทั้งหน้า — edges = [(0,1), (0,2), (1,3), (2,3), (3,4)] · เส้นทองคือวง 0-1-3-2-0",
        },
        { t: "viz", id: "graph-overview" },
        {
          t: "callout",
          title: "ศัพท์ที่จะใช้ต่อ",
          c: "neighbor (เพื่อนบ้าน) = โหนดที่เชื่อมตรงกับโหนดนี้ · traverse (เดินไล่) = เยี่ยมโหนดอย่างมีระบบ · cycle (วง) = ทางเดินที่กลับมาจุดเดิมได้",
        },

        { t: "h2", c: "ส่วนที่ 2 · มีทิศกับไม่มีทิศ" },
        {
          t: "p",
          c: "กราฟแบ่งเป็นสองชนิดหลัก — ความต่างนี้สำคัญตอนเก็บ adjacency list เพราะกำหนดว่าต้อง append กี่ทาง:",
        },
        {
          t: "ul",
          c: [
            "undirected (ไม่มีทิศ) — เส้นเดินได้สองทาง · A เชื่อม B แปลว่า B เชื่อม A · ตอนสร้าง graph ต้อง `append` ทั้ง `a→b` และ `b→a`",
            "directed (มีทิศ) — เส้นเดินได้ทางเดียวตามลูกศร · A→B ไม่ได้แปลว่า B→A · ตอนสร้าง graph ใส่แค่ `graph[a].append(b)`",
          ],
        },
        {
          t: "p",
          c: "ตัวอย่างในหน้านี้ใช้กราฟไม่มีทิศ (เส้นสองทาง) เว้นแต่ภาพด้านล่างจะเทียบให้เห็นชัด",
        },
        { t: "viz", id: "graph-directed" },

        { t: "h2", c: "ส่วนที่ 3 · เก็บกราฟด้วย adjacency list (dict)" },
        {
          t: "p",
          c: "adjacency list (ลิสต์เพื่อนบ้าน) คือวิธีเก็บกราฟที่เจอบ่อยสุด: ใช้ `dict` (dictionary / พจนานุกรม) เปิดด้วยหมายเลขโหนด (key) ได้ list ของเพื่อนบ้าน (value) — แต่ละโหนดจดว่า \"จากฉันไปหาใครได้ตรง\"",
        },
        {
          t: "ul",
          c: [
            "`dict` — สมุดเปิดด้วย key ได้ value ทันที ไม่ใช่แถวที่ไล่ index 0..n",
            "`defaultdict(list)` — dict ที่สร้าง list ว่าง `[]` ให้เองเมื่อเจอ key ใหม่",
            "`edges` — list ของ tuple `(a, b)` แต่ละตัวคือเส้นหนึ่งเส้น · `for a, b in edges` แกะคู่ทีละเส้น",
            "`append` — ต่อท้าย list · ใช้ใส่เพื่อนบ้านเข้า list ของโหนดนั้น",
          ],
        },
        {
          t: "p",
          c: "ชิ้นที่ 1 · ขอดูหน้าตา graph หลังสร้างเสร็จทั้งก้อนก่อน — กราฟห้าโหนด edges = [(0,1), (0,2), (1,3), (2,3), (3,4)] ไม่มีทิศ:",
        },
        {
          t: "codeout",
          lang: "python",
          label: "เป้าหมาย: โหนด → ลิสต์เพื่อนบ้าน",
          code: `graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2, 4],
    4: [3],
}
print("จาก 0 ไปได้:", graph[0])
print("จาก 3 ไปได้:", graph[3])
print("ทั้งก้อน:", graph)`,
          out: `จาก 0 ไปได้: [1, 2]
จาก 3 ไปได้: [1, 2, 4]
ทั้งก้อน: {0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2, 4], 4: [3]}`,
        },
        {
          t: "ul",
          c: [
            "Key = หมายเลขโหนด",
            "Value = list ของเพื่อนบ้านที่เดินไปได้ตรง",
            "จาก 0 มี [1, 2] · จาก 3 มี [1, 2, 4] · จาก 4 มีแค่ [3]",
          ],
        },
        {
          t: "p",
          c: "ชิ้นที่ 2 · ทำไมใช้ `defaultdict(list)` — ถ้าใช้ `{}` ธรรมดาแล้วเขียน `graph[0].append(1)` ทั้งที่ยังไม่มี key 0 จะพัง `KeyError` · `defaultdict(list)` พอเปิด key ครั้งแรกได้ `[]` ให้เอง แล้วค่อย append",
        },
        {
          t: "codeout",
          lang: "python",
          label: "defaultdict(list) ตอนยังว่างและตอนแตะ key ใหม่",
          code: `from collections import defaultdict

graph = defaultdict(list)
print("ตอนสร้างใหม่:", dict(graph))   # ยังไม่มี key เลย

graph[0].append(1)   # ยังไม่มี key 0 → ได้ [] ให้อัตโนมัติ แล้วค่อย append
graph[0].append(2)
print("หลังใส่เพื่อนของ 0:", dict(graph))
print("ชนิดของ graph[0]:", type(graph[0]).__name__, "ค่า =", graph[0])`,
          out: `ตอนสร้างใหม่: {}
หลังใส่เพื่อนของ 0: {0: [1, 2]}
ชนิดของ graph[0]: list ค่า = [1, 2]`,
        },
        {
          t: "p",
          c: "ชิ้นที่ 3 · วนทุกเส้นใน edges — ไม่มีทิศต้อง append สองทาง · มีทิศใส่แค่ `graph[a].append(b)`",
        },
        {
          t: "codeout",
          lang: "python",
          label: "สร้างจากรายการเส้น — ไม่มีทิศใส่สองทาง",
          code: `from collections import defaultdict

edges = [(0, 1), (0, 2), (1, 3), (2, 3), (3, 4)]

graph = defaultdict(list)
for a, b in edges:
    graph[a].append(b)
    graph[b].append(a)  # ไม่มีทิศ ต้องใส่ทางกลับ

print(dict(graph))
print("เพื่อนบ้านของ 0:", graph[0])
print("เพื่อนบ้านของ 3:", graph[3])`,
          out: `{0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2, 4], 4: [3]}
เพื่อนบ้านของ 0: [1, 2]
เพื่อนบ้านของ 3: [1, 2, 4]`,
        },
        {
          t: "p",
          c: "ถ้าเป็นกราฟมีทิศ (a → b อย่างเดียว) ให้เหลือแค่ graph[a].append(b) อย่าใส่ทางกลับ — มิฉะนั้นโปรแกรมจะคิดว่าเดินย้อนได้ทั้งที่จริงเดินไม่ได้",
        },
        { t: "h3", c: "ดูทีละขั้น (Interactive)" },
        {
          t: "p",
          c: "กด **Next ▶** ตัวอย่างเดียวกับโค้ดด้านบน: edges = [(0, 1), (0, 2), (1, 3), (2, 3), (3, 4)] · แถบล่าง = คู่ใน edges · เส้นทอง = คู่ที่กำลังใส่ · แผงขวา = graph ที่ค่อยงอกจาก {} · เลขทอง = ค่าที่เพิ่ง append",
        },
        { t: "viz", id: "graph-adj-build" },

        { t: "h2", c: "ส่วนที่ 4 · visited (set) คืออะไร ทำไมต้องมี" },
        {
          t: "p",
          c: "บนต้นไม้ไม่มีวง — เดินลงลูกแล้วไม่กลับมาจุดเดิม บนกราฟมีวงได้ (ส่วนที่ 1: 0→1→3→2→0) ถ้าไม่จำว่าเคยมาแล้ว recursion จะเรียก dfs ซ้ำไม่รู้จบ",
        },
        {
          t: "ul",
          c: [
            "`set` — ถุงสมาชิกไม่ซ้ำ ถาม `x in visited` ได้เร็ว O(1) เฉลี่ย",
            "`visited.add(node)` — mark ทันทีที่มาถึงโหนด",
            "`nxt not in visited` — ยังไม่เคยไปค่อยเดินต่อ",
          ],
        },
        {
          t: "p",
          c: "ชิ้นที่ 1 · หน้าตา visited ว่าง → ใส่ทีละโหนด",
        },
        {
          t: "codeout",
          lang: "python",
          label: "visited ว่าง → ใส่ทีละโหนด",
          code: `visited = set()
print("ว่าง:", visited)

visited.add(0)
visited.add(1)
print("หลังไป 0 และ 1:", visited)
print("เคยไป 1 ไหม:", 1 in visited)
print("เคยไป 3 ไหม:", 3 in visited)`,
          out: `ว่าง: set()
หลังไป 0 และ 1: {0, 1}
เคยไป 1 ไหม: True
เคยไป 3 ไหม: False`,
        },
        {
          t: "callout",
          title: "กฎสั้น ๆ",
          c: "mark ทันทีที่มาถึง (visited.add) · ก่อนเดินต่อถามว่าเคยไปหรือยัง (x in visited) · ลืมข้อใดข้อหนึ่งบนกราฟที่มีวง = วนไม่จบ",
        },

        { t: "h2", c: "ส่วนที่ 5 · DFS คืออะไร ทำไมใช้ recursion" },
        {
          t: "p",
          c: "DFS (Depth-First Search = ค้นแบบลุยลึกก่อน) เลือกเพื่อนบ้านคนหนึ่งแล้วดิ่งต่อให้สุด ตันแล้วถอยกลับมาลองคนถัดไป — บนต้นไม้คุณเคยทำแบบนี้ด้วย recursion แล้ว บนกราฟใช้กลไกเดียวกัน แต่ต้องมี `graph` กับ `visited` เพิ่ม",
        },
        {
          t: "ul",
          c: [
            "`def dfs(node)` — ฟังก์ชันที่เราตั้งเอง · `node` = โหนดที่ยืนอยู่ตอนนี้",
            "`for nxt in graph[node]` — วนเพื่อนบ้านจาก adjacency list · `nxt` = เพื่อนบ้านคนหนึ่ง",
            "`dfs(nxt)` — เรียกตัวเอง (recursion) เพื่อดิ่งต่อจากเพื่อนบ้าน",
            "`order` — list เก็บลำดับที่ mark (ใช้สอน ไม่จำเป็นทุกโจทย์)",
          ],
        },
        {
          t: "p",
          c: "ชิ้นที่ 1 · โครง dfs สามบรรทัดหัวใจ — ใช้ graph ชุดเดียวกับส่วนที่ 3 · เริ่มที่ dfs(0)",
        },
        {
          t: "code",
          lang: "python",
          label: "โครง dfs — ยังไม่รันทั้งกราฟ",
          c: `visited = set()

def dfs(node):
    visited.add(node)           # mark ทันทีที่มาถึง
    for nxt in graph[node]:     # วนเพื่อนบ้านจาก adjacency list
        if nxt not in visited:  # ยังไม่เคยไปค่อยดิ่งต่อ
            dfs(nxt)            # recursion — เรียกตัวเอง`,
        },
        {
          t: "p",
          c: "ชิ้นที่ 2 · รันครบแล้วพิมพ์ลำดับที่ mark",
        },
        {
          t: "codeout",
          lang: "python",
          label: "DFS บนกราฟส่วนที่ 3 — พิมพ์ลำดับที่ mark",
          code: `graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2, 4],
    4: [3],
}
visited = set()
order = []

def dfs(node):
    visited.add(node)           # 1. mark ทันทีที่มาถึง
    order.append(node)
    for nxt in graph[node]:     # 2. ดูเพื่อนบ้านทีละตัว
        if nxt not in visited:  # 3. ยังไม่เคยไปค่อยลุยต่อ
            dfs(nxt)

dfs(0)
print("ลำดับที่ mark:", order)
print("visited:", visited)`,
          out: `ลำดับที่ mark: [0, 1, 3, 2, 4]
visited: {0, 1, 2, 3, 4}`,
        },
        {
          t: "p",
          c: "อ่านผล: เริ่ม 0 → ไป 1 ก่อน (เพราะอยู่ก่อนใน list) → ดิ่ง 1→3→4 → ถอยกลับมาลอง 2 (อาจ mark ไปแล้วจากทาง 3) · ลำดับ mark ขึ้นกับลำดับเพื่อนบ้านใน list",
        },
        { t: "h3", c: "ดูทีละขั้น (Interactive)" },
        {
          t: "p",
          c: "กด **Next ▶** ตัวอย่างเดียวกับโค้ดด้านบน: graph จาก edges ส่วนที่ 3 · ทอง = โหนดใน dfs ตอนนี้ · เขียว = อยู่ใน visited · ส้ม = ข้ามเพราะเคยไป · แผงขวาโชว์ visited / ลำดับ mark / กองการเรียก",
        },
        { t: "viz", id: "graph-dfs-walk" },

        { t: "h2", c: "ส่วนที่ 6 · หลายก้อนที่ไม่เชื่อมกัน (connected components)" },
        {
          t: "p",
          c: "connected component (ก้อนที่เชื่อมถึงกัน) = ชุดโหนดที่เดินจากโหนดหนึ่งไปอีกโหนดในก้อนได้ แต่ไปก้อนอื่นไม่ได้ · ถ้าเรียก dfs(0) อย่างเดียว จะไม่แตะก้อนที่แยกอยู่",
        },
        {
          t: "ul",
          c: [
            "`n` — จำนวนโหนดทั้งหมดที่เป็นไปได้ (ในตัวอย่างมี 5 โหนด หมายเลข 0–4)",
            "`count` — ตัวนับจำนวน connected component ที่เจอ",
            "`for city in range(n)` — วนทุกหมายเลขโหนด 0 ถึง n-1 · `city` = โหนดที่ loop นอกกำลังดู",
            "`if city not in visited` — เจอโหนดที่ยังไม่เคยแตะ = เจอก้อนใหม่",
            "`count += 1` แล้ว `dfs(city)` — นับก้อน แล้วกวาดทั้งก้อนให้ mark จบ",
          ],
        },
        {
          t: "p",
          c: "ตัวอย่างจิ๋วชุดใหม่: edges = [(0, 1), (0, 2), (3, 4)] · ห้าโหนด สองก้อน — ก้อนซ้าย {0,1,2} · ก้อนขวา {3,4}",
        },
        { t: "viz", id: "graph-two-components" },
        {
          t: "p",
          c: "ชิ้นที่ 1 · loop นอก + dfs ต่อก้อน — ตัวอย่างเดียวกับภาพด้านบน",
        },
        {
          t: "codeout",
          lang: "python",
          label: "ตัวอย่างเดียวกับภาพ: edges = [(0, 1), (0, 2), (3, 4)]",
          code: `from collections import defaultdict

edges = [(0, 1), (0, 2), (3, 4)]
graph = defaultdict(list)
for a, b in edges:
    graph[a].append(b)
    graph[b].append(a)

print("graph:", dict(graph))

n = 5
visited = set()
count = 0

def dfs(node):
    visited.add(node)
    for nxt in graph[node]:
        if nxt not in visited:
            dfs(nxt)

for city in range(n):
    if city not in visited:
        count += 1      # เจอก้อนใหม่
        dfs(city)       # กวาดทั้งก้อน

print("จำนวนก้อน:", count)
print("visited:", sorted(visited))`,
          out: `graph: {0: [1, 2], 1: [0], 2: [0], 3: [4], 4: [3]}
จำนวนก้อน: 2
visited: [0, 1, 2, 3, 4]`,
        },
        { t: "h3", c: "ดูทีละขั้น (Interactive)" },
        {
          t: "p",
          c: "กด **Next ▶** ตัวอย่างเดียวกับโค้ดด้านบน: edges = [(0, 1), (0, 2), (3, 4)] · ทอง = เมืองที่ loop นอกกำลังดู หรือโหนดใน dfs · ม่วง/เขียว = ก้อนที่ 1 / 2 · count เพิ่มเฉพาะตอนเจอเมืองที่ยังไม่เคยแตะ",
        },
        { t: "viz", id: "graph-components" },

        { t: "h2", c: "ส่วนที่ 7 · สรุป operation และราคา" },
        {
          t: "table",
          head: ["สิ่งที่ทำ", "ทำยังไงสั้น ๆ", "เวลาโดยประมาณ"],
          rows: [
            ["สร้างจากรายการเส้น", "วนทุก edge แล้ว append เข้า list", "O(E)"],
            ["ถามเพื่อนบ้านของโหนด u", "อ่าน graph[u]", "O(1) ได้ list แล้ววน O(deg(u))"],
            ["DFS จากจุดเริ่มจุดเดียว", "recursion + visited · เยี่ยมทุกโหนดที่ถึงได้", "O(V + E) ในส่วนที่ถึง"],
            ["กวาดทั้งกราฟ (หลายก้อน)", "loop นอก `for city in range(n)` + DFS ต่อก้อน", "O(V + E)"],
            ["เช็คว่าเคยไปโหนดนี้ไหม", "x in visited เมื่อ visited เป็น set", "O(1) เฉลี่ย"],
          ],
        },
        {
          t: "p",
          c: "V = จำนวนโหนด (vertices) · E = จำนวนเส้น (edges) · deg(u) = จำนวนเพื่อนบ้านของ u — อ้างอิง Big-O เพิ่มได้ที่หน้า lc75-bigo",
        },
        {
          t: "table",
          head: ["มิติ", "DFS (หน้านี้)", "BFS (หมวดถัดไป)"],
          rows: [
            ["ทิศทางเดิน", "ดิ่งลึกแล้วถอย", "แผ่เป็นชั้นใกล้→ไกล"],
            ["โครงสร้างช่วย", "recursion / call stack", "queue (deque)"],
            ["visited", "mark ตอนมาถึง", "mark ตอนใส่คิว (BFS)"],
            ["ระยะสั้นสุดเมื่อก้าวเท่ากัน", "ไม่การันตี", "การันตีตอนแตะครั้งแรก"],
          ],
        },
        {
          t: "callout",
          title: "ของที่ยังไม่สอนในหน้านี้",
          c: "BFS บนกราฟและการหาระยะสั้นสุดเมื่อทุกก้าวเท่ากัน → หมวด Graphs — BFS · เส้นที่ถ่วงน้ำหนัก / Dijkstra → ยังไม่ต้องใน intro นี้",
        },
        {
          t: "p",
          c: "พร้อมแล้วไปข้อแรกของหมวดได้จากแถบนำทางด้านล่าง",
        },
      ],
      en: [],
    },
  },
  "lc75-p43": {
    slug: "lc75-p43",
    title: {
      th: "ข้อ 43 · LC841 Keys and Rooms 🟡",
      en: "43 · LC841 Keys and Rooms 🟡",
    },
    lead: { th: "", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `มี n ห้องติดป้ายจาก 0 ถึง n - 1 และห้องทุกห้องถูกล็อกไว้ยกเว้นห้อง 0 เป้าหมายของคุณคือเข้าชมทุกห้อง อย่างไรก็ตาม คุณไม่สามารถเข้าห้องที่ล็อกอยู่ได้หากไม่มีกุญแจของห้องนั้น

เมื่อคุณเข้าชมห้องหนึ่ง คุณอาจพบชุดของ distinct keys (กุญแจที่ไม่ซ้ำกัน) อยู่ในนั้น กุญแจแต่ละดอกมีตัวเลขกำกับ บอกว่าไขห้องหมายเลขใดได้ และคุณสามารถนำกุญแจทั้งหมดไปด้วยเพื่อไขห้องอื่น ๆ

กำหนด array rooms โดยที่ rooms[i] คือชุดกุญแจที่คุณจะได้ถ้าเข้าชมห้อง i ให้ return true หากคุณสามารถเข้าชมทุกห้องได้ หรือ false หากทำไม่ได้`,
        },
        {
          t: "example",
          c: [
            {
              input: "rooms = [[1],[2],[3],[]]",
              output: "true",
              explain: `เราเข้าชมห้อง 0 แล้วเก็บกุญแจ 1
จากนั้นเข้าชมห้อง 1 แล้วเก็บกุญแจ 2
จากนั้นเข้าชมห้อง 2 แล้วเก็บกุญแจ 3
จากนั้นเข้าชมห้อง 3
เนื่องจากเราเข้าชมได้ทุกห้อง จึง return true`,
            },
            {
              input: "rooms = [[1,3],[3,0,1],[2],[0]]",
              output: "false",
              explain:
                "เราไม่สามารถเข้าห้องหมายเลข 2 ได้ เพราะกุญแจเดียวที่ไขห้องนั้นได้อยู่ในห้องนั้นเอง",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "n == rooms.length",
            "2 <= n <= 1000",
            "0 <= rooms[i].length <= 1000",
            "1 <= sum(rooms[i].length) <= 3000",
            "0 <= rooms[i][j] < n",
            "ค่าทั้งหมดของ rooms[i] เป็น unique",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "อ่านโจทย์กับตัวอย่างให้ครบ แล้วลองเขียนเองก่อน ถ้าติดค่อยเปิดเฉลย",
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "เริ่มเปิดได้แค่ห้อง 0 พอเข้าห้องหนึ่งจะได้กุญแจไปเปิดห้องอื่นต่อ ถามแค่ว่าสุดท้ายเข้าครบทุกห้องไหม — ไม่ถามเส้นทางสั้นสุด ไม่ถามลำดับเดิน แค่ไปถึงครบหรือไม่",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ตัวอย่างแรก rooms = [[1],[2],[3],[]]",
            },
            {
              t: "ul",
              c: [
                "เข้า 0 → ได้กุญแจ 1 · จำว่าเข้าแล้ว: {0}",
                "ใช้กุญแจ 1 เข้า 1 → ได้กุญแจ 2 · จำแล้ว: {0, 1}",
                "ใช้กุญแจ 2 เข้า 2 → ได้กุญแจ 3 · จำแล้ว: {0, 1, 2}",
                "ใช้กุญแจ 3 เข้า 3 → ไม่มีกุญแจ · จำแล้ว: {0, 1, 2, 3}",
                "เข้าได้ 4 ห้อง เท่ากับจำนวนห้องทั้งหมด → true",
              ],
            },
            {
              t: "p",
              c: "ตัวอย่างที่สอง rooms = [[1,3],[3,0,1],[2],[0]] — จาก 0 ได้กุญแจ 1 กับ 3 เข้าได้ {0, 1, 3} แต่กุญแจห้อง 2 อยู่ในห้อง 2 เอง จึงเข้า 2 ไม่ได้ → false",
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "rooms เองคือ adjacency list ของกราฟมีทิศอยู่แล้ว: โหนดคือห้อง เส้นจากห้อง i ชี้ไปห้องที่กุญแจใน rooms[i] ไขได้ — ไม่ต้องสร้าง dict ใหม่",
            },
            {
              t: "p",
              c: "ใช้ DFS จากห้อง 0 ตามหน้าแนวคิด: mark visited ทันทีที่เข้า แล้วลองกุญแจทีละดอก ตัวไหนยังไม่เคยเข้าค่อย dfs ต่อ สุดท้ายเทียบจำนวนห้องใน visited กับจำนวนห้องทั้งหมด",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** บน Example 1 · rooms = [[1],[2],[3],[]] · ทอง = ห้องที่อยู่ใน dfs · เขียว = อยู่ใน visited · ส้ม = เป้าหมายของกุญแจที่กำลังดู · ลูกศรคือกุญแจ (กราฟมีทิศ)",
            },
            { t: "viz", id: "keys-and-rooms" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "p",
              c: "บล็อกด้านล่างจัดหน้าตาให้ตรง editor ของ LeetCode: ลายเซ็น `def canVisitAllRooms(...)` หนึ่งบรรทัด ใช้ `List[...]` ตาม template (LeetCode import ให้แล้ว) · โค้ดที่ต้องเขียนจริงเริ่มที่ `class Solution:`",
            },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `# List ในลายเซ็น — LeetCode import ให้แล้ว ไม่ต้องพิมพ์ from typing import List

class Solution:
    def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
        visited = set()

        def dfs(room):
            visited.add(room)
            for key in rooms[room]:
                if key not in visited:
                    dfs(key)

        dfs(0)
        return len(visited) == len(rooms)`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                "visited จำห้องที่เข้าแล้ว กันวนเมื่อกุญแจชี้กลับห้องเดิม",
                "dfs(room) mark ห้องนี้ แล้วลองกุญแจทุกดอกใน rooms[room]",
                "กุญแจชี้ไปห้องที่ยังไม่ visited ค่อยเรียก dfs ต่อ",
                "เริ่มที่ dfs(0) เพราะเปิดได้แค่ห้อง 0",
                "คืน True เมื่อจำนวนที่เข้าได้เท่ากับจำนวนห้องทั้งหมด",
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(V + E) เยี่ยมแต่ละห้องและแต่ละกุญแจอย่างมากครั้งเดียว · หน่วยความจำ O(V) จาก visited และความลึก call stack",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms. However, you cannot enter a locked room without having its key.

When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks, and you can take all of them with you to unlock the other rooms.

Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, return true if you can visit all the rooms, or false otherwise.`,
        },
        {
          t: "example",
          c: [
            {
              input: "rooms = [[1],[2],[3],[]]",
              output: "true",
              explain: `We visit room 0 and pick up key 1.
We then visit room 1 and pick up key 2.
We then visit room 2 and pick up key 3.
We then visit room 3.
Since we were able to visit every room, we return true.`,
            },
            {
              input: "rooms = [[1,3],[3,0,1],[2],[0]]",
              output: "false",
              explain:
                "We can not enter room number 2 since the only key that unlocks it is in that room.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "n == rooms.length",
            "2 <= n <= 1000",
            "0 <= rooms[i].length <= 1000",
            "1 <= sum(rooms[i].length) <= 3000",
            "0 <= rooms[i][j] < n",
            "All the values of rooms[i] are unique.",
          ],
        },
      ],
    },
  },

  "lc75-p44": {
    slug: "lc75-p44",
    title: {
      th: "ข้อ 44 · LC547 Number of Provinces 🟡",
      en: "44 · LC547 Number of Provinces 🟡",
    },
    lead: { th: "", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `มี n เมือง บางเมืองเชื่อมต่อกัน บางเมืองไม่เชื่อม ถ้าเมือง a เชื่อมโดยตรงกับเมือง b และเมือง b เชื่อมโดยตรงกับเมือง c แล้วเมือง a ก็เชื่อมทางอ้อมกับเมือง c

province คือกลุ่มของเมืองที่เชื่อมถึงกันได้ทั้งทางตรงหรือทางอ้อม และไม่มีเมืองนอกกลุ่มนั้นอยู่ในกลุ่มเดียวกัน

กำหนด matrix n x n ชื่อ isConnected โดย isConnected[i][j] = 1 ถ้าเมืองที่ i และเมืองที่ j เชื่อมโดยตรง และ isConnected[i][j] = 0 ถ้าไม่เชื่อม

ให้ return จำนวน province ทั้งหมด`,
        },
        {
          t: "example",
          c: [
            {
              input: "isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
              output: "2",
            },
            {
              input: "isConnected = [[1,0,0],[0,1,0],[0,0,1]]",
              output: "3",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= n <= 200",
            "n == isConnected.length",
            "n == isConnected[i].length",
            "isConnected[i][j] เป็น 1 หรือ 0",
            "isConnected[i][i] == 1",
            "isConnected[i][j] == isConnected[j][i]",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "อ่านโจทย์กับตัวอย่างให้ครบ แล้วลองเขียนเองก่อน ถ้าติดค่อยเปิดเฉลย",
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "นับว่าเมืองทั้งหมดแยกเป็นกี่ก้อน ที่ภายในก้อนเดินถึงกันได้ (ทางตรงหรือผ่านเมืองกลาง) แต่ระหว่างก้อนเดินข้ามไม่ได้ — คำว่า province ในโจทย์คือก้อนนั้น",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ตัวอย่างแรก isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
            },
            {
              t: "ul",
              c: [
                "แถว 0: เชื่อมตัวเองกับเมือง 1",
                "แถว 1: เชื่อมตัวเองกับเมือง 0",
                "แถว 2: เชื่อมแค่ตัวเอง",
                "ก้อนที่ 1: {0, 1} · ก้อนที่ 2: {2} → ได้ 2 แคว้น",
              ],
            },
            {
              t: "p",
              c: "ตัวอย่างที่สองทุกเมืองเชื่อมแค่ตัวเอง → สามก้อน → 3",
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "จะนับกี่แคว้นด้วยสองชั้น: ชั้นนอกไล่หาเมืองที่ยังไม่เคยไป (= แคว้นใหม่) ชั้นในใช้ DFS กวาดเมืองที่เชื่อมถึงทั้งหมดในแคว้นนั้น — ของที่ต้องประกอบมีสามชิ้น",
            },
            {
              t: "ul",
              c: [
                "visited (set) — จำเมืองที่กวาดไปแล้ว กันวนและกันนับแคว้นซ้ำ",
                "การอ่านเพื่อนบ้านจากตาราง isConnected — โจทย์ไม่ให้ list เพื่อนบ้านแบบหน้าแนวคิด",
                "ตัวนับ provinces — บวกหนึ่งทุกครั้งที่เจอแคว้นใหม่",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 1 · ใน Python จำเมืองที่เคยไปด้วย set:",
            },
            {
              t: "code",
              lang: "python",
              label: "ตั้งต้นสมุดเมืองที่เคยไป",
              c: `visited: set[int] = set()`,
            },
            {
              t: "ul",
              c: [
                "สมาชิกใน set = หมายเลขเมืองที่ DFS กวาดไปแล้ว",
                "visited.add(city) = จำว่าเข้าเมืองนี้แล้ว",
                "city not in visited = ยังไม่เคยเข้า ใช้ได้ทั้งตอนเริ่มแคว้นใหม่และตอนเลือกเพื่อนบ้าน",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 2 · อ่านเพื่อนบ้านจากตาราง — หน้าแนวคิดใช้ `for nxt in graph[node]` เพราะมี list พร้อม แต่โจทย์นี้ให้แค่ isConnected จึงต้องถามทุกช่องในแถวเอง",
            },
            {
              t: "p",
              c: "ตัวอย่างแรก isConnected = [[1,1,0],[1,1,0],[0,0,1]] · ยืนที่เมือง 0 แถว 0 คือ [1, 1, 0]:",
            },
            {
              t: "ul",
              c: [
                "isConnected[0][0] = 1 → เชื่อมกับตัวเอง",
                "isConnected[0][1] = 1 → เชื่อมกับเมือง 1",
                "isConnected[0][2] = 0 → ไม่เชื่อมกับเมือง 2",
              ],
            },
            {
              t: "p",
              c: "ใน Python ไล่ถามทุกช่องในแถว city ด้วย:",
            },
            {
              t: "code",
              lang: "python",
              label: "ถามทีละช่องในแถว — ยังไม่ใช่คำตอบเต็ม",
              c: `for other in range(n):
    if isConnected[city][other] == 1 and other not in visited:
        dfs(other)`,
            },
            {
              t: "ul",
              c: [
                "other = หมายเลขคอลัมน์ / เมืองที่กำลังถามว่าเป็นเพื่อนบ้านไหม (0 ถึง n-1)",
                "isConnected[city][other] == 1 = แถว city ช่อง other เป็น 1 → มีเส้นตรง",
                "other not in visited = ยังไม่เคยกวาด → ถึงจะเรียก dfs(other)",
                "ต้องครบทั้งสองเงื่อนไข — เชื่อมแต่เคยไปแล้วไม่เรียกซ้ำ · ยังไม่ไปแต่ช่องเป็น 0 ก็ไม่เรียก",
              ],
            },
            {
              t: "codeout",
              lang: "python",
              label: "ลองแถว 0 ของ Example 1",
              code: `isConnected = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]
n = len(isConnected)
city = 0
visited = {0}

for other in range(n):
    linked = isConnected[city][other] == 1
    fresh = other not in visited
    print(f"other={other}: ช่อง={isConnected[city][other]} → เรียก dfs? {linked and fresh}")`,
              out: `other=0: ช่อง=1 → เรียก dfs? False
other=1: ช่อง=1 → เรียก dfs? True
other=2: ช่อง=0 → เรียก dfs? False`,
            },

            {
              t: "p",
              c: "ชิ้นที่ 3 · ตัวนับแคว้น + ลูปนอก — เจอเมืองที่ยังไม่ visited คือแคว้นใหม่:",
            },
            {
              t: "code",
              lang: "python",
              label: "นับแคว้นใหม่แล้วกวาดทั้งก้อน",
              c: `provinces = 0
for city in range(n):
    if city not in visited:
        provinces += 1
        dfs(city)`,
            },
            {
              t: "ul",
              c: [
                "provinces = จำนวนแคว้นที่เจอแล้ว",
                "city not in visited = เมืองนี้ยังไม่อยู่ในแคว้นไหนที่กวาดไป → เริ่มแคว้นใหม่",
                "dfs(city) = กวาดทุกเมืองที่เชื่อมถึงจากจุดนี้ให้เข้า visited จบ ก่อนไปเมืองถัดไปในลูปนอก",
              ],
            },
            {
              t: "p",
              c: "ประกอบสามชิ้น: dfs ข้างใน mark + ถามแถวตามชิ้นที่ 2 · ลูปนอกตามชิ้นที่ 3 เป็นคนเริ่มแคว้นใหม่",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** บน Example 1 · isConnected = [[1,1,0],[1,1,0],[0,0,1]] · ทอง = เมืองที่กำลังดู · สีม่วง/เขียว = แคว้นที่ 1 / 2 · ตารางขวาไฮไลต์ช่อง isConnected ที่กำลังเช็ค",
            },
            { t: "viz", id: "number-of-provinces" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "p",
              c: "บล็อกด้านล่างจัดหน้าตาให้ตรง editor ของ LeetCode: ลายเซ็น `def findCircleNum(...)` หนึ่งบรรทัด ใช้ `List[...]` ตาม template (LeetCode import ให้แล้ว) · โค้ดที่ต้องเขียนจริงเริ่มที่ `class Solution:`",
            },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `# List ในลายเซ็น — LeetCode import ให้แล้ว ไม่ต้องพิมพ์ from typing import List

class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        visited = set()

        def dfs(city):
            visited.add(city)
            for other in range(n):  # ไล่ทุกช่องในแถว city
                if isConnected[city][other] == 1 and other not in visited:
                    dfs(other)

        provinces = 0
        for city in range(n):
            if city not in visited:
                provinces += 1
                dfs(city)
        return provinces`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                "visited = set() ตามชิ้นที่ 1 — สมาชิกคือเมืองที่กวาดแล้ว",
                "dfs(city) เริ่มด้วย visited.add(city) แล้วใช้ลูปชิ้นที่ 2 ถามแถว",
                "other=1 ใน Example 1 ตอน city=0 คือเคสที่ทั้ง linked และ fresh เป็นจริง → เรียก dfs(1)",
                "ลูปนอกตามชิ้นที่ 3 — เมือง 0 เริ่มแคว้นที่ 1 กวาดได้ {0,1} · เมือง 1 ถูก mark แล้วข้าม · เมือง 2 เริ่มแคว้นที่ 2",
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(n²) เพราะแต่ละเมืองที่ dfs อาจไล่ทั้งแถวยาว n และรวมแล้วแตะช่องตารางได้ถึง n × n · หน่วยความจำ O(n) จาก visited และ call stack",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.`,
        },
        {
          t: "example",
          c: [
            {
              input: "isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
              output: "2",
            },
            {
              input: "isConnected = [[1,0,0],[0,1,0],[0,0,1]]",
              output: "3",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= n <= 200",
            "n == isConnected.length",
            "n == isConnected[i].length",
            "isConnected[i][j] is 1 or 0.",
            "isConnected[i][i] == 1",
            "isConnected[i][j] == isConnected[j][i]",
          ],
        },
      ],
    },
  },

  "lc75-p45": {
    slug: "lc75-p45",
    title: {
      th: "ข้อ 45 · LC1466 Reorder Routes to Make All Paths Lead to the City Zero 🟡",
      en: "45 · LC1466 Reorder Routes to Make All Paths Lead to the City Zero 🟡",
    },
    lead: { th: "", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `มี n เมืองหมายเลข 0 ถึง n - 1 และถนน n - 1 เส้น โดยมีเส้นทางเดินทางระหว่างเมืองสองเมืองใดก็ได้เพียงเส้นทางเดียวเท่านั้น (โครงข่ายนี้เป็น tree) ปีที่แล้วกระทรวงคมนาคมตัดสินใจกำหนดทิศทางให้ถนนเป็นทางเดียวเพราะถนนแคบเกินไป

ถนนแทนด้วย connections โดยที่ connections[i] = [ai, bi] แทนถนนจากเมือง ai ไปเมือง bi

ปีนี้จะมีงานใหญ่ที่เมืองหลวง (เมือง 0) และมีคนจำนวนมากอยากเดินทางไปเมืองนี้

งานของคุณคือ reorient ถนนบางเส้นเพื่อให้ทุกเมืองสามารถ visit เมือง 0 ได้ ให้ return จำนวน edges ที่เปลี่ยนน้อยที่สุด

รับประกันว่าหลัง reorder แล้ว ทุกเมืองสามารถไปถึงเมือง 0 ได้`,
        },
        {
          t: "example",
          c: [
            {
              input: "n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]",
              output: "3",
              explain:
                "เปลี่ยนทิศของ edges ที่แสดงเป็นสีแดง เพื่อให้ทุก node สามารถไปถึง node 0 (เมืองหลวง) ได้",
            },
            {
              input: "n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]",
              output: "2",
              explain:
                "เปลี่ยนทิศของ edges ที่แสดงเป็นสีแดง เพื่อให้ทุก node สามารถไปถึง node 0 (เมืองหลวง) ได้",
            },
            {
              input: "n = 3, connections = [[1,0],[2,0]]",
              output: "0",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "2 <= n <= 5 * 10^4",
            "connections.length == n - 1",
            "connections[i].length == 2",
            "0 <= ai, bi <= n - 1",
            "ai != bi",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "อ่านโจทย์กับตัวอย่างให้ครบ แล้วลองเขียนเองก่อน ถ้าติดค่อยเปิดเฉลย",
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "มี n เมือง ถนน n−1 เส้นเป็นทางเดียว (โครงเป็นต้นไม้) อยากให้ทุกเมืองเดินทางไปเมือง 0 ได้ โดยกลับทิศถนนให้น้อยที่สุด — ไม่ถามเส้นทางจริง แค่นับว่าต้องพลิกกี่เส้น",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ตัวอย่างแรก n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]] · ลูกศรตามโจทย์คือ 0→1, 1→3, 2→3, 4→0, 4→5",
            },
            {
              t: "ul",
              c: [
                "ถ้าคิดจากเมืองนอกเข้าหา 0 ตรง ๆ จะงง เพราะบางถนนชี้ผิดทาง",
                "ลองคิดกลับ: ยืนที่ 0 แล้วเดินออกไปหาทุกเมือง — ถนนเส้นไหนที่เราเดินตามทิศจริงออกจากฝั่ง 0 เส้นนั้นต้องกลับทิศ (ไม่งั้นเมืองปลายเดินย้อนเข้า 0 ไม่ได้)",
                "จาก 0 ตามทิศจริงไป 1 → ต้องกลับ · จาก 1 ตามทิศจริงไป 3 → ต้องกลับ",
                "จาก 3 ไป 2 ต้องเดินย้อนลูกศร 2→3 · ไม่ต้องกลับ เพราะ 2 ชี้เข้า 3 อยู่แล้ว พอ 3 เข้า 0 ได้ 2 ก็เข้าได้",
                "จาก 0 ไป 4 ต้องเดินย้อนลูกศร 4→0 · ไม่ต้องกลับ · จาก 4 ตามทิศจริงไป 5 → ต้องกลับ",
                "เส้นที่กลับ: 0→1, 1→3, 4→5 รวม 3 เส้น",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ถ้าเก็บแค่ทิศจริง เดินจาก 0 จะไปไม่ทั่ว — เมือง 4 มีแต่ลูกศรชี้เข้า 0 ไม่มีทางออกจาก 0 ไป 4 ในกราฟทิศจริง ทางออก: เก็บกราฟให้เดินได้สองทาง แต่ติดป้ายว่าทางไหนเป็นทิศจริง แล้วเดินออกจาก 0 ให้ครบทุกเมือง ของที่ต้องประกอบมีสี่ชิ้น บวกเปลือกที่ LeetCode บังคับ",
            },
            {
              t: "ul",
              c: [
                "เปลือก `class Solution` + `self` — editor ของ LeetCode ไม่รับสคริปต์เปล่า ต้องห่อเมธอดตามลายเซ็นโจทย์",
                "graph (`dict`) — สมุดโทรศัพท์ของเมือง: เปิดด้วยหมายเลขเมือง แล้วได้ลิสต์ว่าจากเมืองนี้เดินไปใครได้บ้าง พร้อมป้าย cost",
                "`defaultdict(list)` — ตัวช่วยสร้างช่องใน dict อัตโนมัติ ตอนเมืองนั้นยังไม่มีลิสต์",
                "visit (`set`) — ถุงจำเมืองที่เข้าแล้ว กันเดินกลับไปเมืองที่เพิ่งมา",
                "`dfs` — ฟังก์ชันที่ดิ่งจากเมืองนี้ไปเพื่อนบ้านจนสุดทาง (Depth-First Search ที่หน้าแนวคิด) ข้อนี้ใช้เพื่อเยี่ยมทุกเมืองจาก 0 แล้วนับเส้นที่ต้องกลับ",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 0 · เปลือกที่วางใน LeetCode — โจทย์ไม่ได้ให้เขียนโปรแกรมรันเอง LeetCode สร้างอ็อบเจกต์คลาสแล้วเรียกเมธอดให้ เลยต้องเขียนตามลายเซ็นใน editor เป๊ะ",
            },
            {
              t: "code",
              lang: "python",
              label: "ลายเซ็นที่ editor ใส่ให้ — ยังไม่มีคำตอบข้างใน",
              c: `class Solution:
    def minReorder(self, n: int, connections: List[List[int]]) -> int:
        ...`,
            },
            {
              t: "ul",
              c: [
                "`class Solution` = กล่องที่ LeetCode บังคับให้มี ข้างในใส่เมธอดคำตอบ ชื่อคลาสห้ามเปลี่ยน",
                "`self` = ตัวอ็อบเจกต์ของคลาสนั้น ที่ Python ยัดเข้ามาอัตโนมัติทุกครั้งที่เรียกเมธอด — นึกว่า LeetCode ทำ `s = Solution()` แล้วเรียก `s.minReorder(n, connections)` ตัว `s` ไหลเข้า `self` เราไม่ได้พิมพ์ส่งเอง",
                "ข้อนี้ไม่ได้อ่าน `self.อะไรเลย` — ไม่ต้องสะสมคำตอบบน `self` แต่ห้ามลบ `self` ออกจากช่องแรก ไม่งั้น Python จะสลับ `n` ไปอยู่ในช่อง self แล้วพัง",
                "`n: int` = ป้ายบอกว่า `n` เป็นจำนวนเต็ม (จำนวนเมือง) · `connections: List[List[int]]` = ลิสต์ของคู่ `[a, b]` เช่น `[[0,1],[1,3],…]` · `-> int` = ฟังก์ชันต้องคืนจำนวนเต็ม (จำนวนเส้นที่กลับ)",
                "`n` อยู่ในลายเซ็นเพราะ editor ส่งมา — ท่านี้เดินตามเส้นจาก 0 จึงไม่ต้องวน `for i in range(n)` โจทย์รับประกันว่าเป็นต้นไม้เชื่อมกัน เดินจาก 0 เจอทุกเมือง",
                "ป้าย type เป็น hint ไม่ได้รันเปลี่ยนค่า — editor ของ LeetCode ใส่ `List` ให้แล้ว ไม่ต้อง import เองตอนวาง",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 1 · `dict` คืออะไร แล้วหน้าตา graph หลังสร้างเสร็จทั้งก้อนเป็นยังไง — `dict` (dictionary / พจนานุกรม) ไม่ใช่แถวที่ต้องไล่จากช่อง 0 มันเป็นสมุดที่เปิดด้วยกุญแจ (key) แล้วได้ค่า (value) ทันที ข้อนี้กุญแจคือหมายเลขเมือง ค่าคือลิสต์เพื่อนบ้าน ทำไมไม่เก็บเป็น `list` ยาว n ช่องก็ได้ เพราะเมืองเป็น 0..n−1 — ใช้ได้เหมือนกัน แต่ตอนเติมเพื่อนบ้านทีละคู่ `dict` อ่านง่ายกว่าว่า \"จากเมืองนี้ไปไหน\" และคู่ค่าที่เก็บไม่ใช่แค่เลขเมือง เป็นทูเพิล `(เพื่อนบ้าน, cost)`",
            },
            {
              t: "codeout",
              lang: "python",
              label: "เป้าหมาย: เมือง → ลิสต์ (เพื่อนบ้าน, cost)",
              code: `graph = {
    0: [(1, 1), (4, 0)],
    1: [(0, 0), (3, 1)],
    2: [(3, 1)],
    3: [(1, 0), (2, 0)],
    4: [(0, 1), (5, 1)],
    5: [(4, 0)],
}
print("จาก 0:", graph[0])
print("จาก 4:", graph[4])
print("ทั้งก้อน:", graph)`,
              out: `จาก 0: [(1, 1), (4, 0)]
จาก 4: [(0, 1), (5, 1)]
ทั้งก้อน: {0: [(1, 1), (4, 0)], 1: [(0, 0), (3, 1)], 2: [(3, 1)], 3: [(1, 0), (2, 0)], 4: [(0, 1), (5, 1)], 5: [(4, 0)]}`,
            },
            {
              t: "ul",
              c: [
                "Key = หมายเลขเมืองที่เปิดสมุด",
                "Value = list ของทูเพิล `(เพื่อนบ้าน, cost)` — ไม่ใช่แค่เลขเมือง เพราะต้องรู้ด้วยว่าเส้นนั้นต้องกลับไหม",
                "จาก 0 มี `(1, 1)` = ตามลูกศรจริงไป 1 ต้องกลับ · มี `(4, 0)` = เดินย้อนลูกศร 4→0 ไม่ต้องกลับ",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 2 · ทำไมใช้ `defaultdict(list)` ไม่ใช้ `dict` เปล่า — ถ้าเขียน `graph = {}` แล้วทันที `graph[0].append(...)` Python จะพัง `KeyError` เพราะยังไม่มีกุญแจ 0 `defaultdict(list)` คือ dict ที่พอเปิดกุญแจครั้งแรก มันสร้าง `[]` ให้เอง แล้วค่อย `.append` ได้ `from collections import defaultdict` คือการยืมของชิ้นนี้มาจากคลังมาตรฐานของ Python",
            },
            {
              t: "codeout",
              lang: "python",
              label: "ว่าง → ใส่คู่ [0, 1] หนึ่งครั้ง",
              code: `from collections import defaultdict

graph = defaultdict(list)
print("ตอนสร้างใหม่:", dict(graph))

a, b = 0, 1
graph[a].append((b, 1))  # ทิศจริง 0→1 · ทูเพิล (เพื่อนบ้าน, cost)
graph[b].append((a, 0))  # เติมทางกลับ 1→0
print("หลังใส่ [0,1]:", dict(graph))`,
              out: `ตอนสร้างใหม่: {}
หลังใส่ [0,1]: {0: [(1, 1)], 1: [(0, 0)]}`,
            },
            {
              t: "ul",
              c: [
                "`(b, 1)` เป็น tuple (ทูเพิล) = คู่ค่าที่ติดกัน ใช้แพ็ก \"ไปเมืองไหน\" กับ \"cost เท่าไร\" ไว้ด้วยกัน",
                "cost 1 = ทิศจริงตามโจทย์ เดินออกจาก 0 ทางนี้ = ต้องกลับ · cost 0 = ทางที่เราเติม เดินย้อนลูกศร = ไม่ต้องกลับ",
                "หลังใส่ `[0,1]`: เปิดกุญแจ 0 ได้ `[(1, 1)]` · เปิดกุญแจ 1 ได้ `[(0, 0)]`",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 3 · วนทุกคู่ใน connections แบบเดียวกัน พอจบ loop พิมพ์ทั้งก้อนจะตรงกับเป้าหมายชิ้นที่ 1",
            },
            {
              t: "codeout",
              lang: "python",
              label: "สร้างจาก Example 1 ทั้งก้อน",
              code: `from collections import defaultdict

connections = [[0, 1], [1, 3], [2, 3], [4, 0], [4, 5]]
graph = defaultdict(list)
for a, b in connections:
    graph[a].append((b, 1))
    graph[b].append((a, 0))

print({k: graph[k] for k in sorted(graph)})`,
              out: `{0: [(1, 1), (4, 0)], 1: [(0, 0), (3, 1)], 2: [(3, 1)], 3: [(1, 0), (2, 0)], 4: [(0, 1), (5, 1)], 5: [(4, 0)]}`,
            },

            {
              t: "p",
              c: "ชิ้นที่ 4 · `dfs` คืออะไร ทำไมข้อนี้ต้องใช้ — DFS (Depth-First Search / ค้นหาแบบดิ่งลึก) คือวิธีเดินกราฟที่หน้าแนวคิดสอนแล้ว: จากจุดที่ยืน เลือกเพื่อนบ้านคนหนึ่งแล้วดิ่งไปจนสุดทาง ค่อยถอยกลับมาลองคนถัดไป ข้อนี้ต้องเยี่ยมทุกเมืองจาก 0 เพื่อดูทีละเส้นว่าเดินออกตามทิศจริงหรือไม่ ต้นไม้ไม่มีทางอ้อมหลายเส้น เลยไม่ต้องหา shortest path — แค่กวาดให้ครบ DFS ทำได้ ทำไมไม่เขียนลูป `for city in range(n)` แล้วถามทีละเมือง? เพราะเราไม่รู้ล่วงหน้าว่าเมืองไหนต่อกับใคร ต้องตามเส้นใน graph ไปทีละ hop จาก 0 ถึงจะรู้ว่าเส้นไหนอยู่บนทางเข้าหลวง",
            },
            {
              t: "p",
              c: "ทำไมประกาศ `def dfs` ข้างในเมธอด ไม่ใช่เมธอดแยก — ฟังก์ชันข้างในมองเห็น `graph` กับ `visit` ที่สร้างไว้ด้านนอกได้เลย (เรียกว่า closure) ไม่ต้องส่งกราฟเป็นพารามิเตอร์ทุกครั้งที่ดิ่ง ชื่อ `dfs` ไม่ใช่คำสงวนของ Python เป็นชื่อที่เราตั้งเองให้สื่อว่า \"ฟังก์ชันนี้ทำงานแบบดิ่งลึก\"",
            },
            {
              t: "p",
              c: "`visit` เป็น `set` (เซต / ถุงสมาชิกไม่ซ้ำ) ถามว่า \"เมืองนี้มีในถุงไหม\" ได้เร็ว เก็บเมืองที่ `dfs` เข้าแล้ว เพราะเราเติมทางสองทิศ เส้นเดิมกลายเป็นวง ถ้าไม่ mark จะเดิน 0→1 แล้ว 1→0 วนไม่จบ",
            },
            {
              t: "code",
              lang: "python",
              label: "dfs คืนจำนวนเส้นที่ต้องกลับในกิ่งที่เดินจาก node นี้",
              c: `visit = set()

def dfs(node):
    visit.add(node)
    change = 0
    for nei, cost in graph[node]:
        if nei not in visit:
            change += cost + dfs(nei)
    return change

print(dfs(0))`,
            },
            {
              t: "ul",
              c: [
                "`node` = เมืองที่กำลังยืน · เริ่ม `dfs(0)` เพราะขั้นที่ 2 เดินออกจากเมืองหลวง",
                "`visit.add(node)` = หยิบเมืองนี้ใส่ถุงก่อนเดินต่อ กันวนกลับมา",
                "`for nei, cost in graph[node]` = แตกทูเพิลทีละคู่ · `nei` คือเพื่อนบ้าน · `cost` คือ 0 หรือ 1 ของเส้นนั้น",
                "`if nei not in visit` = ยังไม่เคยเข้าเมืองนั้น — ข้ามเมืองแม่ที่เพิ่งมา",
                "`change += cost + dfs(nei)` = นับเส้นนี้ (`cost`) แล้วบวกกับทุกเส้นที่ลึกกว่าที่ `dfs(nei)` คืนมา · บวก 0 เท่ากับไม่นับ",
                "`return change` = ส่งยอดของกิ่งนี้กลับให้คนที่เรียก · คนนอกสุดได้ `dfs(0)` เป็นคำตอบทั้งกราฟ",
                "บน Example 1 ตอน `node=0` คู่แรกคือ `(1, 1)` จึงบวก 1 แล้วลง `dfs(1)` ก่อนไป `(4, 0)`",
              ],
            },
            {
              t: "p",
              c: "ประกอบ: เขียนเปลือกตามชิ้นที่ 0 → สร้าง graph ตามชิ้นที่ 3 → เดินด้วย `dfs` ตามชิ้นที่ 4 → `return dfs(0)`",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** บน Example 1 · n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]] · ทอง = เมืองใน dfs · ส้ม = ถนนทิศจริงที่นับว่าต้องกลับ · ฟ้า = กำลังเดินย้อนลูกศร (cost 0) · changes มุมขวาล่าง",
            },
            { t: "viz", id: "reorder-routes" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "p",
              c: "บล็อกด้านล่างจัดหน้าตาให้ตรง editor ของ LeetCode: ลายเซ็น `def minReorder(...)` หนึ่งบรรทัด ใช้ `List[...]` ตาม template · สิ่งที่ template ไม่โชว์ (เช่น `import`) comment ไว้ด้านบน · โค้ดที่ต้องเขียนจริงเริ่มที่ `class Solution:`",
            },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `# from collections import defaultdict  # LeetCode ไม่โชว์ใน template — ใส่เองถ้ารันบนเครื่อง
# List ในลายเซ็น — LeetCode import ให้แล้ว ไม่ต้องพิมพ์ from typing import List

class Solution:
    def minReorder(self, n: int, connections: List[List[int]]) -> int:
        graph = defaultdict(list)  # dict: เมือง → [(เพื่อนบ้าน, cost)]
        for a, b in connections:
            graph[a].append((b, 1))  # ทิศจริง a→b
            graph[b].append((a, 0))  # ทางกลับที่เติม เพื่อเดินจาก 0 ได้ทั่ว

        visit = set()  # ถุงเมืองที่เข้าแล้ว กันวน

        def dfs(node):  # ดิ่งจากเมืองนี้ คืนจำนวนเส้นที่ต้องกลับในกิ่งนี้
            visit.add(node)  # mark ว่าเข้าเมืองนี้แล้ว
            change = 0
            for nei, cost in graph[node]:
                if nei not in visit:
                    change += cost + dfs(nei)  # cost 1 = ต้องกลับทิศ · 0 = ไม่กลับ
            return change

        return dfs(0)`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                "`class Solution` กับ `self` ตามชิ้นที่ 0 — เปลือกที่ editor บังคับ ข้อนี้ไม่ใช้ `self.xxx`",
                "`graph = defaultdict(list)` ตามชิ้นที่ 2 — dict ที่สร้างลิสต์ว่างให้เองเมื่อเจอเมืองใหม่",
                "คู่แรก `[0,1]` ทำให้ `graph[0]` ได้ `(1,1)` และ `graph[1]` ได้ `(0,0)` — ทูเพิลแพ็กเพื่อนบ้านกับ cost",
                "หลังวนครบ Example 1 ได้ dict เดียวกับชิ้นที่ 1",
                "`dfs` คือฟังก์ชันดิ่งลึกที่ประกาศข้างใน เพื่อมองเห็น `graph` กับ `visit` · `visit` เป็น set กันวนเพราะเราเก็บสองทิศ",
                "`dfs(0)` เจอ `(1,1)` ก่อน → บวก 1 แล้วลงเมือง 1 · จาก 1 เจอ `(3,1)` → บวกอีก 1",
                "จาก 3 ไป 2 ด้วย cost 0 ไม่บวก · ถอยกลับมาที่ 0 แล้วไป 4 ด้วย cost 0 · จาก 4 ไป 5 ด้วย cost 1 → รวม 3",
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(n) เยี่ยมทุกเมืองและทุกเส้นหนึ่งครั้ง (มี n−1 เส้น แต่เก็บสองทิศ) · หน่วยความจำ O(n) จากกราฟ `visit` และ call stack ของ `dfs`",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `There are n cities numbered from 0 to n - 1 and n - 1 roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.

Roads are represented by connections where connections[i] = [ai, bi] represents a road from city ai to city bi.

This year, there will be a big event in the capital (city 0), and many people want to travel to this city.

Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.

It's guaranteed that each city can reach city 0 after reorder.`,
        },
        {
          t: "example",
          c: [
            {
              input: "n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]",
              output: "3",
              explain:
                "Change the direction of edges show in red such that each node can reach the node 0 (capital).",
            },
            {
              input: "n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]",
              output: "2",
              explain:
                "Change the direction of edges show in red such that each node can reach the node 0 (capital).",
            },
            {
              input: "n = 3, connections = [[1,0],[2,0]]",
              output: "0",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "2 <= n <= 5 * 10^4",
            "connections.length == n - 1",
            "connections[i].length == 2",
            "0 <= ai, bi <= n - 1",
            "ai != bi",
          ],
        },
      ],
    },
  },

  "lc75-p46": {
    slug: "lc75-p46",
    title: {
      th: "ข้อ 46 · LC399 Evaluate Division 🟡",
      en: "46 · LC399 Evaluate Division 🟡",
    },
    lead: { th: "", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `กำหนด array ของคู่ตัวแปร equations และ array ของจำนวนจริง values โดยที่ equations[i] = [Ai, Bi] และ values[i] แทนสมการ Ai / Bi = values[i] แต่ละ Ai หรือ Bi เป็นสตริงที่แทนตัวแปรหนึ่งตัว

กำหนด queries มาด้วย โดยที่ queries[j] = [Cj, Dj] แทน query ที่ j ซึ่งคุณต้องหาคำตอบของ Cj / Dj = ?

ให้ return คำตอบของทุก query หากคำตอบใดหาไม่ได้ ให้ return -1.0

หมายเหตุ: อินพุตถูกต้องเสมอ คุณอาจสมมติว่าการประเมิน queries จะไม่เกิดการหารด้วยศูนย์ และไม่มีความขัดแย้ง

หมายเหตุ: ตัวแปรที่ไม่มีในรายการสมการถือว่าไม่นิยาม (undefined) ดังนั้นคำตอบสำหรับตัวแปรเหล่านั้นหาไม่ได้`,
        },
        {
          t: "example",
          c: [
            {
              input:
                'equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]',
              output: "[6.00000,0.50000,-1.00000,1.00000,-1.00000]",
              explain: `กำหนด: a / b = 2.0, b / c = 3.0
queries คือ: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
return: [6.0, 0.5, -1.0, 1.0, -1.0]
หมายเหตุ: x เป็น undefined => -1.0`,
            },
            {
              input:
                'equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]',
              output: "[3.75000,0.40000,5.00000,0.20000]",
            },
            {
              input:
                'equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]',
              output: "[0.50000,2.00000,-1.00000,-1.00000]",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= equations.length <= 20",
            "equations[i].length == 2",
            "1 <= Ai.length, Bi.length <= 5",
            "values.length == equations.length",
            "0.0 < values[i] <= 20.0",
            "1 <= queries.length <= 20",
            "queries[i].length == 2",
            "1 <= Cj.length, Dj.length <= 5",
            "Ai, Bi, Cj, Dj ประกอบด้วยตัวอักษรอังกฤษพิมพ์เล็กและตัวเลข",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "อ่านโจทย์กับตัวอย่างให้ครบ แล้วลองเขียนเองก่อน ถ้าติดค่อยเปิดเฉลย",
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "มีสมการแบบ ตัวแปร / ตัวแปร = ตัวเลข หลายอัน แล้วมีคำถามเป็นคู่ ว่าเศษ/ส่วน เท่าไร แต่ละคำถามตอบเป็นจำนวนจริง ถ้าหาจากสมการที่มีไม่ได้ หรือตัวแปรไม่เคยปรากฏในสมการเลย ให้ตอบ -1.0 — ชื่อตัวแปรเป็นสตริงทั้งก้อน เช่น \"bc\" คือชื่อหนึ่ง ไม่ใช่ b คูณ c",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: 'ตัวอย่างแรก equations = [["a","b"],["b","c"]], values = [2.0, 3.0] คือ a/b = 2 และ b/c = 3',
            },
            {
              t: "ul",
              c: [
                "a/c = (a/b)×(b/c) = 2×3 = 6 — เดิน a ไป b ไป c แล้วคูณตัวเลขบนเส้น",
                "b/a = ส่วนกลับของ a/b = 1/2 = 0.5 — เดินย้อนลูกศร",
                "a/e หาไม่ได้ เพราะไม่มี e ในสมการเลย",
                "a/a = 1 เพราะรู้จัก a แล้วอะไรหารตัวเองก็ได้ 1",
                "x/x = -1.0 ไม่ใช่ 1 — โจทย์บอกว่าตัวที่ไม่มีในสมการถือว่า undefined แม้เศษกับส่วนเป็นตัวเดียวกัน",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ตัวแปรเป็นสตริง ไม่ใช่เลขช่อง 0..n−1 เลยเก็บเป็นกราฟด้วย dict สมการ a/b = 2 แปลว่าจาก a เดินไป b แล้วคูณ 2 และจาก b เดินกลับ a คูณ 0.5 — เก็บสองทิศเสมอ หาคำถาม x/y คือเดินจาก x ไป y แล้วคูณน้ำหนักตลอดทาง ของที่ต้องประกอบมีประมาณนี้",
            },
            {
              t: "ul",
              c: [
                "เปลือก `class Solution` + `self` — editor บังคับห่อเมธอด ข้อนี้มีสามช่อง: สมการ, ค่า, คำถาม",
                "graph (`dict` ซ้อน `dict`) — เปิดด้วยชื่อตัวแปร แล้วได้สมุดย่อยว่าไปเพื่อนบ้านคนไหนคูณเท่าไร",
                "`defaultdict(dict)` — พอเจอตัวแปรใหม่ สร้างสมุดย่อย `{}` ให้เอง",
                "`zip` — จับ equations คู่ที่ i กับ values ตัวที่ i ให้เดินพร้อมกัน",
                "`dfs` — ดิ่งจากตัวตั้งไปตัวหาร คูณน้ำหนักตอนถอยกลับ เจอปลายทางคืน 1.0 เดินไม่ถึงคืน -1.0",
                "visit (`set`) — ถุงตัวแปรที่เข้าแล้วในคำถามนี้ กันวน a→b→a",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 0 · เปลือกที่วางใน LeetCode — เหมือนข้อ 45: LeetCode สร้าง `Solution()` แล้วเรียกเมธอดให้ `self` คืออ็อบเจกต์นั้นที่ Python ยัดเข้าช่องแรก ห้ามลบ แม้ข้อนี้ไม่ใช้ `self.xxx`",
            },
            {
              t: "code",
              lang: "python",
              label: "ลายเซ็นที่ editor ใส่ให้ — ยังไม่มีคำตอบข้างใน",
              c: `class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        ...`,
            },
            {
              t: "ul",
              c: [
                "`equations: List[List[str]]` = ลิสต์ของคู่ชื่อตัวแปร เช่น `[[\"a\",\"b\"],[\"b\",\"c\"]]`",
                "`values: List[float]` = ตัวเลขของสมการทีละคู่ ความยาวเท่า equations · `2.0` คือจำนวนจริง ไม่ใช่จำนวนเต็ม",
                "`queries: List[List[str]]` = คำถามทีละคู่ `[ตัวตั้ง, ตัวหาร]`",
                "`-> List[float]` = คืนลิสต์คำตอบ ความยาวเท่า queries หาไม่ได้ใส่ `-1.0`",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 1 · ขอดูหน้าตา graph หลังสร้างเสร็จทั้งก้อนก่อน — ข้อ 45 ค่าในสมุดเป็นลิสต์ทูเพิล ข้อนี้แต่ละเพื่อนบ้านมีน้ำหนักเดียว เลยใช้ dict ซ้อน: เปิดตัวแปร ได้สมุดย่อยที่กุญแจเป็นเพื่อนบ้าน ค่าเป็นตัวคูณ",
            },
            {
              t: "codeout",
              lang: "python",
              label: "เป้าหมาย: ตัวแปร → {เพื่อนบ้าน: ตัวคูณ}",
              code: `graph = {
    "a": {"b": 2.0},
    "b": {"a": 0.5, "c": 3.0},
    "c": {"b": 1 / 3},
}
print("จาก a:", graph["a"])
print("จาก b:", graph["b"])
print("ทั้งก้อน:", graph)`,
              out: `จาก a: {'b': 2.0}
จาก b: {'a': 0.5, 'c': 3.0}
ทั้งก้อน: {'a': {'b': 2.0}, 'b': {'a': 0.5, 'c': 3.0}, 'c': {'b': 0.3333333333333333}}`,
            },
            {
              t: "ul",
              c: [
                "Key นอก = ชื่อตัวแปรที่เรายืน",
                "Value นอก = dict ย่อย",
                "Key ใน = เพื่อนบ้านที่เดินไปได้ตรง",
                "Value ใน = ตัวคูณบนเส้นนั้น",
                "จาก a มีแค่ b คูณ 2 — คือสมการ a/b = 2 · จาก b กลับ a คูณ 0.5 คือส่วนกลับ",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 2 · `defaultdict(dict)` ตอนยังว่าง แล้วใส่สมการแรก a/b = 2.0 หนึ่งคู่ — `defaultdict(list)` ของข้อ 45 สร้าง `[]` ให้เอง อันนี้ส่ง `dict` เข้าไป พอเปิด `graph[\"a\"]` ครั้งแรกได้ `{}` แล้วค่อยใส่ `graph[\"a\"][\"b\"] = 2.0`",
            },
            {
              t: "codeout",
              lang: "python",
              label: "ว่าง → ใส่ a/b = 2.0 หนึ่งครั้ง",
              code: `from collections import defaultdict

graph = defaultdict(dict)
print("ตอนสร้างใหม่:", dict(graph))

a, b, val = "a", "b", 2.0
graph[a][b] = val      # เดิน a→b คูณ 2
graph[b][a] = 1 / val  # เดินกลับ b→a คูณ 0.5
print("หลังใส่ a/b=2:", dict(graph))`,
              out: `ตอนสร้างใหม่: {}
หลังใส่ a/b=2: {'a': {'b': 2.0}, 'b': {'a': 0.5}}`,
            },
            {
              t: "ul",
              c: [
                "`1 / val` คือส่วนกลับของสมการ — รู้ a/b แล้ว b/a ต้องเป็น 1 หารค่านั้น",
                "ถ้าใช้ `{}` ธรรมดาแล้วเขียน `graph[\"a\"][\"b\"] = 2` ทั้งที่ยังไม่มีกุญแจ `\"a\"` จะพัง `KeyError`",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 3 · `zip` คืออะไร — equations กับ values เป็นคนละลิสต์ ความยาวเท่ากัน `zip(equations, values)` จับคู่ช่องเดียวกันให้อยู่ด้วยกัน ช่อง 0 ได้ `([\"a\",\"b\"], 2.0)` ช่อง 1 ได้ `([\"b\",\"c\"], 3.0)` แล้ววนใส่แบบชิ้นที่ 2 ทั้งก้อนจะตรงเป้าหมายชิ้นที่ 1",
            },
            {
              t: "codeout",
              lang: "python",
              label: "สร้างจาก Example 1 ทั้งก้อน",
              code: `from collections import defaultdict

equations = [["a", "b"], ["b", "c"]]
values = [2.0, 3.0]
graph = defaultdict(dict)
for (a, b), val in zip(equations, values):
    graph[a][b] = val
    graph[b][a] = 1 / val

print(dict(graph))`,
              out: `{'a': {'b': 2.0}, 'b': {'a': 0.5, 'c': 3.0}, 'c': {'b': 0.3333333333333333}}`,
            },
            {
              t: "ul",
              c: [
                "`(a, b), val` = แตกคู่ชื่อจากสมการ แล้วรับตัวเลขจาก values ในรอบเดียวกัน",
                "รอบที่ 1: a=\"a\" b=\"b\" val=2.0 · รอบที่ 2: a=\"b\" b=\"c\" val=3.0 — ตัวแปร `a`,`b` ในลูปคือชื่อในคู่นั้น ไม่ได้แปลว่าตัวแปรโจทย์ a กับ b ตลอดไป",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 4 · `dfs` คืออะไร ทำไมข้อนี้ต้องใช้ — DFS (Depth-First Search / ค้นหาแบบดิ่งลึก) จากหน้าแนวคิด: จากจุดที่ยืน เลือกเพื่อนบ้านคนหนึ่งแล้วดิ่งไปจนสุดทาง ค่อยถอยมาลองคนถัดไป ข้อนี้ไม่ได้นับเส้นแบบข้อ 45 แต่ถามว่าจากตัวตั้งเดินไปตัวหารได้ไหม แล้วผลคูณบนทางนั้นเท่าไร ทำไมไม่ตอบจากสมการตรง ๆ? เพราะคำถามอาจเป็นคนละคู่จากที่ให้มา ต้องต่อหลาย hop เช่น a/c ไม่มีสมการตรง แต่มี a→b→c",
            },
            {
              t: "p",
              c: "ทำไมประกาศ `def dfs` ข้างใน — มองเห็น `graph` ได้เลย ไม่ต้องส่งกราฟทุกครั้ง ชื่อ `dfs` เราตั้งเอง ไม่ใช่คำสงวน รับสามช่อง: `src` จุดเริ่ม, `dst` จุดหมาย, `visit` ถุงที่เข้าแล้วในคำถามนี้ คืนจำนวนจริง หรือ `-1.0` ถ้าเดินไม่ถึง",
            },
            {
              t: "p",
              c: "ทำไม `visit` เป็นพารามิเตอร์ ไม่ใช่ถุงเดียวทั้งฟังก์ชันแบบข้อ 45 — แต่ละคำถามเป็นการค้นใหม่ ถ้าใช้ถุงใบเดียว หลังตอบ a/c ถุงมี a,b,c แล้ว คำถาม b/a จะคิดว่าทุกตัวเข้าแล้ว หาไม่ได้ ทั้งที่ทางมี เลยส่ง `set()` ว่างเข้าไปทุกคำถาม",
            },
            {
              t: "code",
              lang: "python",
              label: "dfs จาก src ไป dst คืนผลคูณบนทางที่เจอ",
              c: `def dfs(src, dst, visit):
    if src not in graph or dst not in graph:
        return -1.0
    if src == dst:
        return 1.0
    visit.add(src)
    for nbr, w in graph[src].items():
        if nbr in visit:
            continue
        res = dfs(nbr, dst, visit)
        if res != -1.0:
            return w * res
    return -1.0

print(dfs("a", "c", set()))`,
            },
            {
              t: "ul",
              c: [
                "`src not in graph` ถามว่ากุญแจนี้มีใน dict นอกไหม — ไม่มี = ตัวแปรไม่เคยอยู่ในสมการ",
                "เช็คไม่รู้จักก่อน แล้วค่อย `src == dst` — ถ้าสลับ `x/x` จะได้ 1.0 ทั้งที่ x ไม่มี ผิดโจทย์",
                "`src == dst` คืน 1.0 เพราะยืนที่ปลายทางแล้ว ตัวเองหารตัวเอง = 1 (เคส a/a)",
                "`graph[src].items()` = เดินคู่กุญแจ-ค่าของสมุดย่อย · `nbr` เพื่อนบ้าน · `w` ตัวคูณบนเส้น",
                "`if nbr in visit: continue` = ข้ามตัวที่เข้าแล้ว กันวน a→b แล้ว b→a",
                "`res = dfs(nbr, dst, visit)` = ดิ่งต่อจากเพื่อนบ้านไปหา dst · คืน -1.0 หรือผลคูณจากตรงนั้นถึงปลาย",
                "`return w * res` = คูณเส้นนี้เข้าผลที่ลูกเจอ · บน a/c: จาก b ไป c ได้ 3 แล้วถอยมาที่ a คูณ 2 ได้ 6",
                "ลองเพื่อนบ้านครบแล้วยังไม่มีใครคืนทางเจอ → `-1.0` เช่น a/e",
              ],
            },

            {
              t: "p",
              c: "ชิ้นที่ 5 · ไล่ทุกคำถาม — แต่ละคู่เรียก `dfs` คนละถุง `set()` เก็บคำตอบตามลำดับ queries",
            },
            {
              t: "code",
              lang: "python",
              label: "ทีละ query · visit ใหม่ทุกครั้ง",
              c: `queries = [["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]]
answers = []
for c, d in queries:
    answers.append(dfs(c, d, set()))
print(answers)`,
            },
            {
              t: "ul",
              c: [
                "คู่แรก c=\"a\" d=\"c\" → 6.0 ตามชิ้นที่ 4",
                "คู่สอง b/a → เดินทางกลับน้ำหนัก 0.5",
                "a/e และ x/x ชน `not in graph` → -1.0",
                "a/a รู้จักทั้งคู่และ src==dst → 1.0",
                "ในโค้ดวางย่อลูปนี้เป็น `[dfs(c, d, set()) for c, d in queries]` — ความหมายเดียวกัน สร้างลิสต์คำตอบจากแต่ละคู่",
              ],
            },
            {
              t: "p",
              c: "ประกอบ: เปลือกตามชิ้นที่ 0 → สร้าง graph ตามชิ้นที่ 3 → ประกาศ dfs ตามชิ้นที่ 4 → ไล่ queries ตามชิ้นที่ 5 แล้ว return ลิสต์คำตอบ",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: 'กด **Next ▶** บน Example 1 query แรก a/c · equations = [["a","b"],["b","c"]], values = [2.0, 3.0] · ทอง = โหนดที่ dfs กำลังยืน · เส้นทอง = กำลังลองเพื่อนบ้านคนนั้น · product = ผลคูณตอนถอยกลับ',
            },
            { t: "viz", id: "evaluate-division" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "p",
              c: "บล็อกด้านล่างจัดหน้าตาให้ตรง editor ของ LeetCode: ลายเซ็น `def calcEquation(...)` หนึ่งบรรทัด ใช้ `List[...]` ตาม template · สิ่งที่ template ไม่โชว์ (เช่น `import`) comment ไว้ด้านบน · โค้ดที่ต้องเขียนจริงเริ่มที่ `class Solution:`",
            },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `# from collections import defaultdict  # LeetCode ไม่โชว์ใน template — ใส่เองถ้ารันบนเครื่อง
# List ในลายเซ็น — LeetCode import ให้แล้ว ไม่ต้องพิมพ์ from typing import List

class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        graph = defaultdict(dict)  # ตัวแปร → {เพื่อนบ้าน: ตัวคูณ}
        for (a, b), val in zip(equations, values):
            graph[a][b] = val      # a/b = val → เดิน a→b คูณ val
            graph[b][a] = 1 / val  # ทางกลับ = ส่วนกลับ

        def dfs(src, dst, visit):
            if src not in graph or dst not in graph:
                return -1.0  # ตัวแปรไม่รู้จัก
            if src == dst:
                return 1.0  # x/x ของตัวที่รู้จัก
            visit.add(src)  # mark ในคำถามนี้
            for nbr, w in graph[src].items():
                if nbr in visit:
                    continue
                res = dfs(nbr, dst, visit)
                if res != -1.0:
                    return w * res  # คูณเส้นนี้เข้าผลจากทางที่เจอ
            return -1.0

        return [dfs(c, d, set()) for c, d in queries]`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                "`class Solution` กับ `self` ตามชิ้นที่ 0 — เปลือกที่ editor บังคับ ข้อนี้ไม่ใช้ `self.xxx`",
                "`graph = defaultdict(dict)` ตามชิ้นที่ 2 — เปิดตัวแปรใหม่ได้สมุดย่อย `{}` เอง",
                "`zip` คู่แรก `[\"a\",\"b\"]` กับ `2.0` ทำให้ `graph[\"a\"][\"b\"]=2` และ `graph[\"b\"][\"a\"]=0.5`",
                "หลังวนครบ Example 1 ได้ dict เดียวกับชิ้นที่ 1",
                "query แรก `dfs(\"a\",\"c\", set())` — จาก a ไป b (×2) แล้ว b ไป c (×3) ถอยกลับ 3 แล้วคูณ 2 ได้ 6",
                "query `b/a` ถุงใหม่ เดินทางกลับ ×0.5",
                "`a/e` กับ `x/x` ชน `not in graph` ก่อนเช็คเท่ากัน จึงได้ -1.0 ไม่ใช่ 1.0",
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(Q · (V + E)) แต่ละคำถามเดินกราฟได้ทั้งก้อนในกรณีแย่สุด · หน่วยความจำ O(V + E) จากกราฟและถุง visit ต่อคำถาม (V = จำนวนตัวแปรที่ปรากฏ, E = จำนวนเส้นสองทิศ, Q = จำนวน queries)",
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.

You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.

Return the answers to all queries. If a single answer cannot be determined, return -1.0.

Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.

Note: The variables that do not occur in the list of equations are undefined, so the answer cannot be determined for them.`,
        },
        {
          t: "example",
          c: [
            {
              input:
                'equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]',
              output: "[6.00000,0.50000,-1.00000,1.00000,-1.00000]",
              explain: `Given: a / b = 2.0, b / c = 3.0
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
return: [6.0, 0.5, -1.0, 1.0, -1.0]
note: x is undefined => -1.0`,
            },
            {
              input:
                'equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]',
              output: "[3.75000,0.40000,5.00000,0.20000]",
            },
            {
              input:
                'equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]',
              output: "[0.50000,2.00000,-1.00000,-1.00000]",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= equations.length <= 20",
            "equations[i].length == 2",
            "1 <= Ai.length, Bi.length <= 5",
            "values.length == equations.length",
            "0.0 < values[i] <= 20.0",
            "1 <= queries.length <= 20",
            "queries[i].length == 2",
            "1 <= Cj.length, Dj.length <= 5",
            "Ai, Bi, Cj, Dj consist of lower case English letters and digits.",
          ],
        },
      ],
    },
  },
};
