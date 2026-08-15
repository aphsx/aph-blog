import type { Page } from "@/lib/types";

export const graphDfsPages: Record<string, Page> = {
  "lc75-intro-graph-dfs": {
    slug: "lc75-intro-graph-dfs",
    title: { th: "Graphs & DFS — พื้นฐาน & แนวคิด", en: "" },
    lead: {
      th: "กราฟคือจุดกับเส้นเชื่อม — ต่างจากต้นไม้ตรงที่มีวงและหลายก้อนได้ หน้านี้สอนเก็บด้วย adjacency list, ใช้ visited กันวน, แล้วลุยลึกด้วย DFS",
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
          c: "ภาพด้านล่างคือกราฟไม่มีทิศห้าโหนดที่จะใช้ทั้งหน้า — เส้นทองคือวง 0-1-3-2-0",
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
          c: "undirected (ไม่มีทิศ) — เส้นเดินได้สองทาง ถ้า A เป็นเพื่อนกับ B แล้ว B ก็เป็นเพื่อนกับ A directed (มีทิศ) — เส้นเดินได้ทางเดียวตามหัวลูกศร เช่นถนนวันเวย์ หรือ A ติดตาม B บนโซเชียลโดยที่ B ไม่ต้องติดตามกลับ",
        },
        {
          t: "p",
          c: "ความต่างนี้สำคัญตอนเก็บกราฟ: ไม่มีทิศต้องจดทั้งสองทาง มีทิศจดทางเดียวตามลูกศร",
        },
        { t: "viz", id: "graph-directed" },

        { t: "h2", c: "ส่วนที่ 3 · เก็บกราฟด้วย adjacency list" },
        {
          t: "p",
          c: "วิธีที่ใช้ง่ายและเจอบ่อยสุดคือ adjacency list (ลิสต์เพื่อนบ้าน): ใช้ dict ที่ key เป็นโหนด value เป็น list ของเพื่อนบ้านที่เดินไปได้โดยตรง — แต่ละโหนดจดไว้ว่า \"จากฉันไปหาใครได้บ้าง\"",
        },
        {
          t: "p",
          c: "ก่อนเขียนโค้ดสร้าง ขอดูหน้าตาของที่เราอยากได้ก่อน — กราฟห้าโหนด เส้น [(0,1), (0,2), (1,3), (2,3), (3,4)] ไม่มีทิศ เมื่อเก็บครบแล้ว dict จะหน้าตาแบบนี้:",
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
          t: "p",
          c: "อ่านยังไง: key 0 มี value เป็น list [1, 2] แปลว่าจากโหนด 0 มีเส้นไป 1 และ 2 · key 4 มีแค่ [3] เพราะโหนด 4 เชื่อมกับ 3 อย่างเดียว — list ว่าง [] จะแปลว่าโหนดนั้นไม่มีเพื่อนบ้าน",
        },
        {
          t: "p",
          c: "ถ้าเขียนด้วย dict ธรรมดา ทุกครั้งที่เจอโหนดใหม่ต้องเช็คว่ามี key แล้วยัง แล้วค่อยสร้าง list ว่างเอง ยุ่งและลืดง่าย Python จึงมี defaultdict(list) จากโมดูล collections: พอเขียน graph[โหนด] ครั้งแรก มันยื่น list ว่าง [] ให้เอง แล้วเรา append เพื่อนบ้านเข้าไปได้เลย",
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
          c: "dict(graph) ในตัวอย่างใช้แปลงให้พิมพ์ออกมาเป็น dict ธรรมดา อ่านง่าย — ของข้างในยังเป็น list จริง ๆ",
        },
        {
          t: "p",
          c: "ตอนสร้างจากรายการเส้น: หยิบทีละคู่ (a, b) แล้ว append ทั้งสองทางถ้าไม่มีทิศ — พอจบ loop พิมพ์ทั้งก้อนจะได้หน้าตาเดียวกับเป้าหมายด้านบน",
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
          c: "กด **Next ▶** แถบล่าง = edges แหล่งที่มาของคู่ · เส้นทอง = คู่ที่กำลังใส่ · แผงขวา = graph ที่ค่อยงอก key (เริ่มว่าง {}) · เลขทองใน list = ค่าที่เพิ่ง append — สังเกตว่าทุกเส้นถูกเขียนสองครั้ง (ไปและกลับ)",
        },
        { t: "viz", id: "graph-adj-build" },

        { t: "h2", c: "ส่วนที่ 4 · ทำไมต้องมี visited" },
        {
          t: "p",
          c: "บนต้นไม้ คุณไม่ต้องกังวลว่าจะเดินวน เพราะไม่มีวง บนกราฟมีวงได้ — ดูเส้นทองในภาพส่วนที่ 1 ถ้าเดิน 0 → 1 → 3 → 2 แล้วจาก 2 มีเส้นกลับไป 0 คุณจะกลับมาที่ 0 อีกรอบ ถ้าไม่จำว่าเคยมาแล้ว โปรแกรมจะเรียก recursion ไม่รู้จบ",
        },
        {
          t: "p",
          c: "แก้ด้วย set ชื่อ visited (เคยเยือน): ทันทีที่มาถึงโหนด ให้ add เข้า set ก่อนจะเดินต่อ และก่อนเรียก dfs ไปเพื่อนบ้าน ต้องเช็คว่ายังไม่อยู่ใน visited",
        },
        {
          t: "callout",
          title: "กฎสั้น ๆ",
          c: "mark ทันทีที่มาถึง · ก่อนเดินต่อถามก่อนว่าเคยไปหรือยัง · ลืมข้อใดข้อหนึ่งบนกราฟที่มีวง = วนไม่จบ",
        },

        { t: "h2", c: "ส่วนที่ 5 · DFS บนกราฟ — ลุยลึกแล้วถอย" },
        {
          t: "p",
          c: "DFS (Depth-First Search = ค้นแบบลุยลึกก่อน) บนกราฟใช้ความคิดเดียวกับตอนเดินต้นไม้: เลือกเพื่อนบ้านคนหนึ่ง ดิ่งต่อให้สุด ตันแล้วค่อยถอยกลับมาลองคนถัดไป — เขียนด้วย recursion ได้ตรง ๆ",
        },
        {
          t: "p",
          c: "โครงมีสามบรรทัดหัวใจ: (1) mark โหนดปัจจุบัน (2) วนดูเพื่อนบ้านทุกตัว (3) ตัวไหนยังไม่ visited ค่อยเรียก dfs เข้าไป",
        },
        {
          t: "code",
          lang: "python",
          c: `def dfs(node):
    visited.add(node)           # 1. mark ทันทีที่มาถึง
    for nxt in graph[node]:     # 2. ดูเพื่อนบ้านทีละตัว
        if nxt not in visited:  # 3. ยังไม่เคยไปค่อยลุยต่อ
            dfs(nxt)

visited = set()
dfs(0)  # เริ่มจากโหนด 0`,
        },
        {
          t: "p",
          c: "ตัวอย่างจิ๋ว: เริ่มที่ 0 เพื่อนบ้านคือ 1 แล้ว 2 — DFS จะไป 1 ก่อน ดิ่งต่อจนสุด ค่อยถอยมาที่ 0 แล้วค่อยไป 2 (ซึ่งตอนนั้นอาจถูก mark ไปแล้วจากทางอื่น)",
        },
        { t: "h3", c: "ดูทีละขั้น (Interactive)" },
        {
          t: "p",
          c: "กด **Next ▶** ทอง = โหนดที่อยู่ใน dfs ตอนนี้ · เขียว = อยู่ใน visited แล้ว · ส้ม = เพื่อนบ้านที่ข้ามเพราะเคยไป · แผงขวาโชว์ visited, ลำดับที่ mark, และ call stack",
        },
        { t: "viz", id: "graph-dfs-walk" },

        { t: "h2", c: "ส่วนที่ 6 · หลายก้อนที่ไม่เชื่อมกัน" },
        {
          t: "p",
          c: "ถ้าเรียก dfs(0) อย่างเดียว คุณจะไปได้เฉพาะโหนดที่เชื่อมถึง 0 ถ้ามีก้อนอื่นแยกอยู่ dfs จาก 0 จะไม่แตะก้อนนั้นเลย",
        },
        {
          t: "p",
          c: "ภาพด้านล่างเป็นตัวอย่างจิ๋วห้าเมืองสองก้อน — ก้อนซ้าย 0-1-2 ก้อนขวา 3-4 ไม่มีเส้นข้ามก้อน",
        },
        { t: "viz", id: "graph-two-components" },
        {
          t: "p",
          c: "วิธีกวาดให้ครบทั้งกราฟ: วนโหนดทุกตัวจากข้างนอก ถ้าเจอตัวที่ยังไม่อยู่ใน visited แปลว่าเพิ่งเจอก้อนใหม่ — บวกตัวนับหนึ่ง แล้วค่อยยิง dfs กวาดทั้งก้อนให้ mark จบ ก่อนเดิน loop นอกต่อ",
        },
        {
          t: "codeout",
          lang: "python",
          label: "ตัวอย่างจิ๋ว: ห้าเมือง สองก้อน",
          code: `from collections import defaultdict

edges = [(0, 1), (0, 2), (3, 4)]
graph = defaultdict(list)
for a, b in edges:
    graph[a].append(b)
    graph[b].append(a)

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
          out: `จำนวนก้อน: 2
visited: [0, 1, 2, 3, 4]`,
        },
        { t: "h3", c: "ดูทีละขั้น (Interactive)" },
        {
          t: "p",
          c: "กด **Next ▶** ทอง = เมืองที่ loop นอกกำลังดู หรือโหนดใน dfs · สีม่วง/เขียว = ก้อนที่ 1 / ก้อนที่ 2 · count ขวาบนเพิ่มเฉพาะตอนเจอเมืองที่ยังไม่เคยแตะ",
        },
        { t: "viz", id: "graph-components" },

        { t: "h2", c: "ส่วนที่ 7 · สรุป operation และราคา" },
        {
          t: "table",
          head: ["สิ่งที่ทำ", "ทำยังไงสั้น ๆ", "เวลาโดยประมาณ"],
          rows: [
            ["สร้างจากรายการเส้น", "วนทุก edge แล้ว append เข้า list", "O(E)"],
            ["ถามเพื่อนบ้านของโหนด u", "อ่าน graph[u]", "O(1) ได้ list แล้ววน O(deg(u))"],
            ["DFS จากจุดเริ่มจุดเดียว", "เยี่ยมทุกโหนด/เส้นที่ถึงได้จากจุดนั้น", "O(V + E) ในส่วนที่ถึง"],
            ["กวาดทั้งกราฟ (หลายก้อน)", "loop นอก + DFS ต่อก้อน", "O(V + E)"],
            ["เช็คว่าเคยไปโหนดนี้ไหม", "x in visited เมื่อ visited เป็น set", "O(1) เฉลี่ย"],
          ],
        },
        {
          t: "p",
          c: "V = จำนวนโหนด (vertices) · E = จำนวนเส้น (edges) · deg(u) = จำนวนเพื่อนบ้านของ u — อ้างอิง Big-O เพิ่มได้ที่หน้า lc75-bigo",
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
    lead: {
      th: "มี n ห้อง เปิดได้แค่ห้อง 0 ตอนเริ่ม — เข้าห้องแล้วได้กุญแจไปเปิดห้องอื่น จงตอบว่าเข้าครบทุกห้องได้หรือไม่",
      en: "There are n rooms; only room 0 starts unlocked. Visiting a room gives keys to others. Return whether you can visit every room.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `มี n ห้องติดป้ายจาก 0 ถึง n - 1 และห้องทุกห้องถูกล็อกไว้ยกเว้นห้อง 0 เป้าหมายของคุณคือเข้าชมทุกห้อง อย่างไรก็ตาม คุณไม่สามารถเข้าห้องที่ล็อกอยู่ได้หากไม่มีกุญแจของห้องนั้น

เมื่อคุณเข้าชมห้องหนึ่ง คุณอาจพบชุดกุญแจที่แตกต่างกันอยู่ในนั้น กุญแจแต่ละดอกมีตัวเลขกำกับ บอกว่าไขห้องหมายเลขใดได้ และคุณสามารถนำกุญแจทั้งหมดไปด้วยเพื่อไขห้องอื่น ๆ

กำหนด array rooms โดยที่ rooms[i] คือชุดกุญแจที่คุณจะได้ถ้าเข้าชมห้อง i ให้ return true หากคุณสามารถเข้าชมทุกห้องได้ หรือ false หากทำไม่ได้`,
        },
        {
          t: "example",
          c: [
            {
              input: "rooms = [[1],[2],[3],[]]",
              output: "true",
              explain: `เราเข้าห้อง 0 แล้วเก็บกุญแจ 1
จากนั้นเข้าห้อง 1 แล้วเก็บกุญแจ 2
จากนั้นเข้าห้อง 2 แล้วเก็บกุญแจ 3
จากนั้นเข้าห้อง 3
เนื่องจากเข้าชมได้ทุกห้อง จึง return true`,
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
            "ค่าทั้งหมดใน rooms[i] ไม่ซ้ำกัน",
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
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `class Solution:
    def canVisitAllRooms(self, rooms: list[list[int]]) -> bool:
        visited: set[int] = set()

        def dfs(room: int) -> None:
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
    lead: {
      th: "มี n เมือง บางคู่เชื่อมกันโดยตรง จงนับจำนวนแคว้น — กลุ่มเมืองที่เชื่อมถึงกันได้ทั้งทางตรงและทางอ้อม",
      en: "There are n cities; some pairs are directly connected. Count provinces — groups of cities connected directly or indirectly.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `มี n เมือง บางเมืองเชื่อมต่อกัน บางเมืองไม่เชื่อม ถ้าเมือง a เชื่อมโดยตรงกับเมือง b และเมือง b เชื่อมโดยตรงกับเมือง c แล้วเมือง a ก็ถือว่าเชื่อมทางอ้อมกับเมือง c

province (แคว้น) คือกลุ่มของเมืองที่เชื่อมถึงกันได้ทั้งทางตรงหรือทางอ้อม และไม่มีเมืองนอกกลุ่มนั้นอยู่ในกลุ่มเดียวกัน

กำหนดตาราง n x n ชื่อ isConnected โดย isConnected[i][j] = 1 ถ้าเมืองที่ i เชื่อมโดยตรงกับเมืองที่ j และเป็น 0 ถ้าไม่เชื่อม

ให้ return จำนวน province ทั้งหมด`,
        },
        {
          t: "example",
          c: [
            {
              input: "isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
              output: "2",
              explain:
                "เมือง 0 เชื่อมกับเมือง 1 ส่วนเมือง 2 อยู่คนเดียว จึงมี 2 แคว้น",
            },
            {
              input: "isConnected = [[1,0,0],[0,1,0],[0,0,1]]",
              output: "3",
              explain: "ไม่มีเส้นระหว่างเมืองใดเลย แต่ละเมืองเป็นแคว้นของตัวเอง จึงได้ 3",
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
              c: "กราฟมาในรูปตาราง (adjacency matrix) ไม่ใช่ list — เพื่อนบ้านของเมือง i คือคอลัมน์ j ที่ isConnected[i][j] เป็น 1 (รวมตัวเองด้วย แต่พอเจอตัวเองใน visited แล้วจะข้าม)",
            },
            {
              t: "p",
              c: "โครงเดียวกับส่วนก้อนหลายก้อนในหน้าแนวคิด: วนเมืองทุกตัวจากนอก เจอตัวที่ยังไม่ visited คือแคว้นใหม่ บวกหนึ่ง แล้ว DFS กวาดทุกเมืองที่เชื่อมถึงในแคว้นนั้นให้ mark จบ",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** บน Example 1 · isConnected = [[1,1,0],[1,1,0],[0,0,1]] · ทอง = เมืองที่กำลังดู · สีม่วง/เขียว = แคว้นที่ 1 / 2 · ตารางขวาไฮไลต์ช่อง isConnected ที่กำลังเช็ค",
            },
            { t: "viz", id: "number-of-provinces" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `class Solution:
    def findCircleNum(self, isConnected: list[list[int]]) -> int:
        n = len(isConnected)
        visited: set[int] = set()

        def dfs(city: int) -> None:
            visited.add(city)
            for other in range(n):
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
                "dfs(city) mark เมืองนี้ แล้วไล่ทั้งแถวหาเมืองที่เชื่อมโดยตรงและยังไม่เคยไป",
                "loop นอกไล่ city ทุกตัว",
                "เจอตัวที่ยังไม่ visited = แคว้นใหม่ → provinces += 1 แล้วค่อย dfs กวาด",
                "เมืองในแคว้นเดิมจะถูก mark ไปแล้ว จึงไม่ถูกนับซ้ำ",
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(n²) เพราะแต่ละครั้งที่ dfs อาจไล่ทั้งแถวของตาราง n x n · หน่วยความจำ O(n) จาก visited และ call stack",
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
              explain:
                "City 0 is connected to city 1, and city 2 is by itself. There are 2 provinces.",
            },
            {
              input: "isConnected = [[1,0,0],[0,1,0],[0,0,1]]",
              output: "3",
              explain:
                "No cities are connected to each other. Each city is its own province, so there are 3.",
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
    lead: {
      th: "ถนนทุกเส้นเป็นทางเดียว จงกลับทิศให้น้อยที่สุดเพื่อให้ทุกเมืองเดินทางไปเมือง 0 ได้",
      en: "Roads are one-way. Reorient the minimum number of roads so every city can reach city 0.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `มี n เมืองหมายเลข 0 ถึง n - 1 และถนน n - 1 เส้น โดยมีเส้นทางเดินทางระหว่างเมืองสองเมืองใดก็ได้เพียงเส้นทางเดียวเท่านั้น (โครงข่ายนี้เป็นต้นไม้) ปีที่แล้วกระทรวงคมนาคมกำหนดทิศทางให้ถนนเป็นทางเดียวเพราะถนนแคบเกินไป

ถนนแทนด้วย connections โดยที่ connections[i] = [ai, bi] หมายถึงถนนจากเมือง ai ไปเมือง bi

ปีนี้จะมีงานใหญ่ที่เมืองหลวง (เมือง 0) และมีคนจำนวนมากอยากเดินทางไปเมืองนี้

งานของคุณคือกลับทิศถนนบางเส้นเพื่อให้ทุกเมืองสามารถเดินทางไปเมือง 0 ได้ ให้ return จำนวนขอบ (edge) น้อยที่สุดที่ต้องเปลี่ยน

รับประกันว่าหลังกลับทิศแล้ว ทุกเมืองสามารถไปถึงเมือง 0 ได้`,
        },
        {
          t: "example",
          c: [
            {
              input: "n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]",
              output: "3",
              explain:
                "เปลี่ยนทิศของขอบที่แสดงเป็นสีแดงในรูป เพื่อให้ทุกโหนดไปถึงโหนด 0 (เมืองหลวง) ได้",
            },
            {
              input: "n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]",
              output: "2",
              explain:
                "เปลี่ยนทิศของขอบที่แสดงเป็นสีแดงในรูป เพื่อให้ทุกโหนดไปถึงโหนด 0 (เมืองหลวง) ได้",
            },
            {
              input: "n = 3, connections = [[1,0],[2,0]]",
              output: "0",
              explain: "ถนนทั้งสองเส้นชี้เข้าเมือง 0 อยู่แล้ว ไม่ต้องกลับทิศ",
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
              c: "ถนนเป็นทางเดียวหมด อยากให้ทุกเมืองไปถึงเมือง 0 ได้ โดยกลับทิศให้น้อยที่สุด — ไม่ถามเส้นทางจริง แค่นับว่าต้องพลิกกี่เส้น",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ตัวอย่างแรก n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]",
            },
            {
              t: "ul",
              c: [
                "ถ้าคิดจากเมืองนอกเข้าหา 0 ตรง ๆ จะงง เพราะบางถนนชี้ผิดทาง",
                "ลองคิดกลับ: เดินออกจาก 0 ไปหาทุกเมือง — ถนนเส้นไหนที่เราเดินตามทิศจริงออกจากฝั่ง 0 เส้นนั้นต้องกลับทิศ (เมืองปลายจะเดินย้อนเข้า 0 ไม่ได้)",
                "เส้นที่ต้องกลับ: 0→1, 1→3, 4→5 รวม 3 เส้น · เส้น 4→0 และ 2→3 ไม่ต้องกลับเพราะตอนเดินออกจาก 0 เราเดินย้อนทิศจริง",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "โครงข่ายเป็นต้นไม้ มี n−1 เส้น — ถ้าเก็บแค่ทิศจริง DFS จาก 0 จะไปไม่ทั่ว เพราะบางเมืองมีแต่ลูกศรชี้เข้ามา ทางออก: เก็บกราฟแบบเดินได้สองทาง แต่ติดป้าย cost",
            },
            {
              t: "p",
              c: "ทิศจริงตามโจทย์ (a→b) ติด cost 1 · ทิศปลอมที่เติมเพื่อเดินย้อน (b→a) ติด cost 0 แล้ว DFS จาก 0 ออกไปทุกเมือง เวลาเดินไปเพื่อนบ้านที่ยังไม่ visited ให้บวก cost เข้า changes — cost 1 คือเจอถนนที่ต้องกลับทิศ",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: "กด **Next ▶** บน Example 1 · n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]] · ทอง = เมืองปัจจุบัน · ส้ม = ถนนทิศจริงที่ถูกนับว่าต้องกลับ · changes สะสมทางขวาล่าง",
            },
            { t: "viz", id: "reorder-routes" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `from collections import defaultdict

class Solution:
    def minReorder(self, n: int, connections: list[list[int]]) -> int:
        graph: dict[int, list[tuple[int, int]]] = defaultdict(list)
        for a, b in connections:
            graph[a].append((b, 1))  # ทิศจริง — เดินทางนี้จาก 0 ออกไป = ต้องกลับ
            graph[b].append((a, 0))  # ทิศปลอม — เติมเพื่อเดินได้ทั่ว

        visited: set[int] = set()
        changes = 0

        def dfs(city: int) -> None:
            nonlocal changes
            visited.add(city)
            for nxt, cost in graph[city]:
                if nxt not in visited:
                    changes += cost
                    dfs(nxt)

        dfs(0)
        return changes`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                "แต่ละ connections [a,b] ใส่ (b,1) ให้ a และ (a,0) ให้ b",
                "dfs จาก 0 mark แล้วไล่เพื่อนบ้าน",
                "ยังไม่ visited → บวก cost แล้ว dfs ต่อ",
                "changes คือจำนวนครั้งที่เดินบนทิศจริงออกจากฝั่ง 0 = จำนวนเส้นที่ต้องกลับ",
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(n) เยี่ยมทุกเมืองและทุกเส้นหนึ่งครั้ง (มี n−1 เส้น) · หน่วยความจำ O(n) จากกราฟ visited และ call stack",
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
              explain: "Both roads already point toward city 0, so no reorientation is needed.",
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
    lead: {
      th: "จากสมการหารระหว่างตัวแปร จงตอบคำถาม Cj / Dj แต่ละข้อ — หาไม่ได้ให้ตอบ -1.0",
      en: "Given division equations between variables, answer each Cj / Dj query — or -1.0 if unknown.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `กำหนด array ของคู่ตัวแปร equations และ array ของจำนวนจริง values โดยที่ equations[i] = [Ai, Bi] และ values[i] แทนสมการ Ai / Bi = values[i] แต่ละ Ai หรือ Bi เป็นสตริงที่แทนตัวแปรหนึ่งตัว

กำหนด queries มาด้วย โดยที่ queries[j] = [Cj, Dj] แทนคำถามที่ j ว่า Cj / Dj = ?

ให้ return คำตอบของทุก query หากคำตอบใดหาไม่ได้ ให้ return -1.0 สำหรับ query นั้น

หมายเหตุ: อินพุตถูกต้องเสมอ คุณอาจสมมติว่าการประเมินคำถามจะไม่เกิดการหารด้วยศูนย์ และไม่มีความขัดแย้ง

หมายเหตุ: ตัวแปรที่ไม่มีในรายการสมการถือว่าไม่นิยาม ดังนั้นคำตอบสำหรับตัวแปรเหล่านั้นหาไม่ได้`,
        },
        {
          t: "example",
          c: [
            {
              input:
                'equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]',
              output: "[6.00000,0.50000,-1.00000,1.00000,-1.00000]",
              explain: `กำหนด: a / b = 2.0, b / c = 3.0
คำถาม: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
คำตอบ: [6.0, 0.5, -1.0, 1.0, -1.0]
หมายเหตุ: x ไม่นิยาม → -1.0`,
            },
            {
              input:
                'equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]',
              output: "[3.75000,0.40000,5.00000,0.20000]",
              explain: "a/c = 1.5×2.5 = 3.75 · c/b = 1/2.5 = 0.4 · bc/cd = 5 · cd/bc = 0.2",
            },
            {
              input:
                'equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]',
              output: "[0.50000,2.00000,-1.00000,-1.00000]",
              explain: "รู้จักแค่ a กับ b · คำถามที่มี c หรือ x,y หาไม่ได้",
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
              c: "มีสมการแบบ a/b = ตัวเลข หลายอัน แล้วมีคำถามว่า x/y เท่าไร — ถ้าหาจากสมการที่มีไม่ได้ หรือตัวแปรไม่รู้จัก ให้ตอบ -1.0",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "ตัวอย่างแรก: a/b = 2 และ b/c = 3",
            },
            {
              t: "ul",
              c: [
                "a/c = (a/b)×(b/c) = 2×3 = 6",
                "b/a = 1/(a/b) = 0.5",
                "a/e หาไม่ได้เพราะไม่มี e",
                "a/a = 1 เพราะรู้จัก a",
                "x/x = -1 เพราะไม่รู้จัก x เลย (ต่างจาก a/a)",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "มองตัวแปรเป็นโหนด สมการเป็นเส้นที่มีตัวเลขกำกับ: a/b = 2 แปลว่าจาก a ไป b คูณ 2 และจาก b ไป a คูณ 0.5 — เก็บสองทิศเสมอ",
            },
            {
              t: "p",
              c: "หา x/y คือเดิน DFS จาก x ไป y แล้วคูณน้ำหนักตลอดทาง พอเจอปลายทางคืน 1.0 แล้วระหว่างถอยกลับแต่ละชั้นคูณน้ำหนักของเส้นตัวเอง ถ้าตัวแปรไม่อยู่ในกราฟเลยคืน -1.0 ก่อนเช็ค x==y (กันกรณี x/x ของตัวที่ไม่รู้จัก)",
            },

            { t: "h3", c: "ดูทีละขั้น (Interactive)" },
            {
              t: "p",
              c: 'กด **Next ▶** บน Example 1 query แรก a/c · equations = [["a","b"],["b","c"]], values = [2.0, 3.0] · ทอง = โหนดปัจจุบัน · เส้นทอง = กำลังลองทางนั้น · product สะสมผลคูณตอนถอยกลับ',
            },
            { t: "viz", id: "evaluate-division" },

            { t: "h3", c: "โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              label: "คำตอบสำหรับวางใน LeetCode",
              c: `from collections import defaultdict

class Solution:
    def calcEquation(
        self,
        equations: list[list[str]],
        values: list[float],
        queries: list[list[str]],
    ) -> list[float]:
        graph: dict[str, dict[str, float]] = defaultdict(dict)
        for (a, b), val in zip(equations, values):
            graph[a][b] = val
            graph[b][a] = 1 / val

        def dfs(src: str, dst: str, visited: set[str]) -> float:
            if src not in graph or dst not in graph:
                return -1.0
            if src == dst:
                return 1.0
            visited.add(src)
            for nbr, weight in graph[src].items():
                if nbr in visited:
                    continue
                result = dfs(nbr, dst, visited)
                if result != -1.0:
                    return weight * result
            return -1.0

        return [dfs(a, b, set()) for a, b in queries]`,
            },

            { t: "h3", c: "อ่านโค้ดทีละส่วน" },
            {
              t: "ol",
              c: [
                "สร้างกราฟสองทิศ: a→b = val และ b→a = 1/val",
                "แต่ละ query เรียก dfs คนละ visited",
                "เช็คไม่รู้จักก่อน แล้วค่อยเช็ค src == dst (กัน x/x ของ x ที่ไม่มี)",
                "ลองเพื่อนบ้าน ถ้าทางนั้นถึงได้ คืน weight × ผลจากลูก",
                "ลองครบแล้วยังไม่ถึง → -1.0",
              ],
            },
            { t: "h3", c: "ต้นทุน" },
            {
              t: "p",
              c: "เวลา O(Q · (V + E)) แต่ละ query เดินกราฟหนึ่งครั้ง · หน่วยความจำ O(V + E) จากกราฟและ visited",
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
              explain: "a/c = 1.5×2.5 = 3.75 · c/b = 1/2.5 = 0.4 · bc/cd = 5 · cd/bc = 0.2",
            },
            {
              input:
                'equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]',
              output: "[0.50000,2.00000,-1.00000,-1.00000]",
              explain: "Only a and b are known. Queries involving c or x,y cannot be answered.",
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
