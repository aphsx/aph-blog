/** Interactive Graphs — DFS walkthroughs for the intro workshop. */

export type AdjBuildStep = {
  line: number;
  msg: string;
  /** Current adjacency list — only keys that exist (defaultdict grows). */
  adj: Record<number, number[]>;
  /** Edge currently being processed (both ends). */
  edge: [number, number] | null;
  /** Which undirected write just happened. */
  writing: "forward" | "back" | null;
  /** Edges already written both ways. */
  done: [number, number][];
  /** Index into ADJ_EDGES of the pair being processed (-1 = none). */
  edgeIdx: number;
};

export type DfsWalkStep = {
  line: number;
  msg: string;
  /** Node currently inside dfs(...). */
  current: number | null;
  /** Edge being considered (from → to). */
  edge: [number, number] | null;
  visited: number[];
  /** Order nodes were first marked. */
  order: number[];
  /** Call stack of nodes (deepest last). */
  stack: number[];
  /** Neighbor skipped because already visited. */
  skipped: number | null;
};

export type ComponentsStep = {
  line: number;
  msg: string;
  current: number | null;
  edge: [number, number] | null;
  visited: number[];
  /** Component id per node, -1 = not assigned yet. */
  compOf: Record<number, number>;
  /** How many components found so far. */
  count: number;
  /** Outer-loop city being inspected. */
  scan: number | null;
};

export const ADJ_EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [3, 4],
];

export const ADJ_NODES = [0, 1, 2, 3, 4];

export const ADJ_CODE = [
  "edges = [(0, 1), (0, 2), (1, 3), (2, 3), (3, 4)]",
  "graph = defaultdict(list)  # เริ่มว่าง {}",
  "for a, b in edges:",
  "    graph[a].append(b)",
  "    graph[b].append(a)  # ไม่มีทิศ ใส่สองทาง",
];

export const DFS_CODE = [
  "graph = {0:[1,2], 1:[0,3], 2:[0,3], 3:[1,2,4], 4:[3]}",
  "visited = set()",
  "def dfs(node):",
  "    visited.add(node)",
  "    for nxt in graph[node]:",
  "        if nxt not in visited:",
  "            dfs(nxt)",
  "dfs(0)",
];

export const COMP_CODE = [
  "edges = [(0,1), (0,2), (3,4)]  # สองก้อน",
  "graph = {0:[1,2], 1:[0], 2:[0], 3:[4], 4:[3]}",
  "n, visited, count = 5, set(), 0",
  "def dfs(node):",
  "    visited.add(node)",
  "    for nxt in graph[node]:",
  "        if nxt not in visited: dfs(nxt)",
  "for city in range(n):",
  "    if city not in visited:",
  "        count += 1",
  "        dfs(city)",
];

/** Tiny undirected graph: two clumps {0,1,2} and {3,4}. */
export const COMP_EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [3, 4],
];

export const COMP_NODES = [0, 1, 2, 3, 4];

export const COMP_GRAPH: Record<number, number[]> = {
  0: [1, 2],
  1: [0],
  2: [0],
  3: [4],
  4: [3],
};

export const DFS_GRAPH: Record<number, number[]> = {
  0: [1, 2],
  1: [0, 3],
  2: [0, 3],
  3: [1, 2, 4],
  4: [3],
};

export function buildAdjBuildSteps(): AdjBuildStep[] {
  const steps: AdjBuildStep[] = [];
  const adj: Record<number, number[]> = {};
  const done: [number, number][] = [];

  const snap = (
    line: number,
    msg: string,
    edge: [number, number] | null,
    writing: AdjBuildStep["writing"],
    edgeIdx: number,
  ) => {
    const copy: Record<number, number[]> = {};
    for (const k of Object.keys(adj)) {
      const n = Number(k);
      copy[n] = [...adj[n]];
    }
    steps.push({
      line,
      msg,
      adj: copy,
      edge,
      writing,
      done: done.map(([x, y]) => [x, y]),
      edgeIdx,
    });
  };

  snap(1, "edges = รายการเส้นที่จะใส่ · ยังไม่ได้แตะ graph", null, null, -1);
  snap(2, "graph = defaultdict(list)  · ว่างเปล่า {} ยังไม่มี key", null, null, -1);

  ADJ_EDGES.forEach(([a, b], edgeIdx) => {
    snap(3, `for: หยิบ edges[${edgeIdx}] = (${a}, ${b})`, [a, b], null, edgeIdx);

    if (!adj[a]) adj[a] = [];
    adj[a] = [...adj[a], b];
    snap(
      4,
      `graph[${a}].append(${b})  · key ${a} ${adj[a].length === 1 ? "ถูกสร้างเป็น [] แล้ว" : "มีอยู่แล้ว"} ได้ ${b}`,
      [a, b],
      "forward",
      edgeIdx,
    );

    if (!adj[b]) adj[b] = [];
    adj[b] = [...adj[b], a];
    snap(
      5,
      `graph[${b}].append(${a})  · ไม่มีทิศ ใส่ทางกลับ · ตอนนี้ ${a}:[${adj[a].join(",")}]  ${b}:[${adj[b].join(",")}]`,
      [a, b],
      "back",
      edgeIdx,
    );
    done.push([a, b]);
  });

  snap(
    2,
    `เสร็จ · dict(graph) = {${Object.keys(adj)
      .map((k) => `${k}:[${adj[Number(k)].join(",")}]`)
      .join(", ")}}`,
    null,
    null,
    -1,
  );
  return steps;
}

export function buildDfsWalkSteps(): DfsWalkStep[] {
  const steps: DfsWalkStep[] = [];
  const visited = new Set<number>();
  const order: number[] = [];
  const stack: number[] = [];

  const snap = (
    line: number,
    msg: string,
    current: number | null,
    edge: [number, number] | null,
    skipped: number | null,
  ) => {
    steps.push({
      line,
      msg,
      current,
      edge,
      visited: [...visited],
      order: [...order],
      stack: [...stack],
      skipped,
    });
  };

  snap(1, "graph = ตัวอย่างเดียวกับส่วนที่ 3 · edges [(0,1),(0,2),(1,3),(2,3),(3,4)]", null, null, null);
  snap(2, "visited = set()  · ว่าง {} ยังไม่เคยไปโหนดไหน", null, null, null);

  const dfs = (node: number) => {
    stack.push(node);
    snap(3, `เข้า dfs(${node})`, node, null, null);
    visited.add(node);
    order.push(node);
    snap(4, `visited.add(${node})  · mark ทันทีที่มาถึง · visited={${[...visited].join(",")}}`, node, null, null);

    for (const nxt of DFS_GRAPH[node]) {
      snap(5, `ดูเพื่อนบ้าน nxt = ${nxt} จาก graph[${node}]`, node, [node, nxt], null);
      if (visited.has(nxt)) {
        snap(
          6,
          `${nxt} อยู่ใน visited แล้ว — ข้าม (กันวนกลับ)`,
          node,
          [node, nxt],
          nxt,
        );
        continue;
      }
      snap(7, `${nxt} ยังไม่เคยไป → เรียก dfs(${nxt}) ลุยลึกต่อ`, node, [node, nxt], null);
      dfs(nxt);
      snap(5, `ถอยกลับมาที่ ${node} แล้วดูเพื่อนบ้านตัวถัดไป`, node, null, null);
    }

    stack.pop();
    snap(3, `dfs(${node}) จบ — ถอยขึ้นกองการเรียก`, stack[stack.length - 1] ?? null, null, null);
  };

  snap(8, "ยิง dfs(0) จากโหนดเริ่ม", null, null, null);
  dfs(0);
  snap(8, `จบแล้ว ลำดับที่ mark: [${order.join(", ")}]`, null, null, null);
  return steps;
}

export function buildComponentsSteps(): ComponentsStep[] {
  const steps: ComponentsStep[] = [];
  const visited = new Set<number>();
  const compOf: Record<number, number> = {
    0: -1,
    1: -1,
    2: -1,
    3: -1,
    4: -1,
  };
  let count = 0;
  let activeComp = -1;

  const snap = (
    line: number,
    msg: string,
    current: number | null,
    edge: [number, number] | null,
    scan: number | null,
  ) => {
    steps.push({
      line,
      msg,
      current,
      edge,
      visited: [...visited],
      compOf: { ...compOf },
      count,
      scan,
    });
  };

  snap(1, "edges = [(0,1),(0,2),(3,4)]  · ก้อนซ้าย 0-1-2 · ก้อนขวา 3-4", null, null, null);
  snap(2, "graph พร้อมแล้ว · นับก้อนด้วย loop นอก + dfs", null, null, null);
  snap(3, "n=5 · visited ว่าง · count = 0", null, null, null);

  const dfs = (node: number) => {
    visited.add(node);
    compOf[node] = activeComp;
    snap(5, `dfs: mark ${node} อยู่ในก้อนที่ ${activeComp}`, node, null, null);
    for (const nxt of COMP_GRAPH[node]) {
      snap(6, `ดูเพื่อนบ้าน nxt = ${nxt}`, node, [node, nxt], null);
      if (!visited.has(nxt)) {
        snap(7, `จาก ${node} ไป ${nxt} ในก้อนเดียวกัน`, node, [node, nxt], null);
        dfs(nxt);
      } else {
        snap(7, `${nxt} ถูก mark แล้ว — ข้าม`, node, [node, nxt], null);
      }
    }
  };

  for (const city of COMP_NODES) {
    snap(8, `loop นอกดู city = ${city}`, null, null, city);
    if (visited.has(city)) {
      snap(9, `${city} ถูกกวาดไปแล้ว — ข้าม`, null, null, city);
      continue;
    }
    count += 1;
    activeComp = count;
    snap(10, `เจอเมืองที่ยังไม่เคยแตะ → ก้อนใหม่ count = ${count}`, null, null, city);
    snap(11, `เรียก dfs(${city}) กวาดทั้งก้อน`, null, null, city);
    dfs(city);
    snap(8, `ก้อนที่ ${count} กวาดครบแล้ว เดิน loop นอกต่อ`, null, null, null);
  }

  snap(3, `จบ · มี ${count} ก้อน ที่ไม่เชื่อมถึงกัน`, null, null, null);
  return steps;
}
