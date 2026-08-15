/** Interactive Graphs — DFS walkthroughs for the intro workshop. */

export type AdjBuildStep = {
  line: number;
  msg: string;
  /** Current adjacency list: node → neighbors. */
  adj: Record<number, number[]>;
  /** Edge currently being processed (both ends). */
  edge: [number, number] | null;
  /** Which undirected write just happened. */
  writing: "forward" | "back" | null;
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
  "graph = {0: [], 1: [], 2: [], 3: [], 4: []}",
  "for a, b in edges:",
  "    graph[a].append(b)",
  "    graph[b].append(a)  # ไม่มีทิศ ใส่สองทาง",
];

export const DFS_CODE = [
  "def dfs(node):",
  "    visited.add(node)",
  "    for nxt in graph[node]:",
  "        if nxt not in visited:",
  "            dfs(nxt)",
  "",
  "visited = set()",
  "dfs(0)",
];

export const COMP_CODE = [
  "visited = set()",
  "count = 0",
  "def dfs(node):",
  "    visited.add(node)",
  "    for nxt in graph[node]:",
  "        if nxt not in visited:",
  "            dfs(nxt)",
  "for city in range(n):",
  "    if city not in visited:",
  "        count += 1",
  "        dfs(city)  # กวาดทั้งก้อน",
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
  const adj: Record<number, number[]> = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
  };

  const snap = (
    line: number,
    msg: string,
    edge: [number, number] | null,
    writing: AdjBuildStep["writing"],
  ) => {
    const copy: Record<number, number[]> = {};
    for (const k of ADJ_NODES) copy[k] = [...adj[k]];
    steps.push({ line, msg, adj: copy, edge, writing });
  };

  snap(1, "เริ่มด้วย dict ว่าง — แต่ละโหนดมี list เพื่อนบ้านว่าง", null, null);

  for (const [a, b] of ADJ_EDGES) {
    snap(2, `หยิบเส้น (${a}, ${b}) จาก edges`, [a, b], null);
    adj[a] = [...adj[a], b];
    snap(3, `graph[${a}].append(${b})  · ${a} เดินไป ${b} ได้`, [a, b], "forward");
    adj[b] = [...adj[b], a];
    snap(4, `graph[${b}].append(${a})  · ไม่มีทิศ ต้องใส่ทางกลับด้วย`, [a, b], "back");
  }

  snap(1, "เสร็จแล้ว · เช่น graph[0]=[1,2] และ graph[3]=[1,2,4]", null, null);
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

  snap(7, "สร้าง visited ว่าง แล้วยิง dfs(0)", null, null, null);

  const dfs = (node: number) => {
    stack.push(node);
    snap(1, `เข้า dfs(${node})`, node, null, null);
    visited.add(node);
    order.push(node);
    snap(2, `visited.add(${node})  · ทำเครื่องหมายทันทีที่มาถึง`, node, null, null);

    for (const nxt of DFS_GRAPH[node]) {
      snap(3, `ดูเพื่อนบ้าน nxt = ${nxt}`, node, [node, nxt], null);
      if (visited.has(nxt)) {
        snap(
          4,
          `${nxt} อยู่ใน visited แล้ว — ข้าม (กันวนกลับ)`,
          node,
          [node, nxt],
          nxt,
        );
        continue;
      }
      snap(5, `${nxt} ยังไม่เคยไป → เรียก dfs(${nxt}) ลุยลึกต่อ`, node, [node, nxt], null);
      dfs(nxt);
      snap(3, `ถอยกลับมาที่ ${node} แล้วดูเพื่อนบ้านตัวถัดไป`, node, null, null);
    }

    stack.pop();
    snap(1, `dfs(${node}) จบ — ถอยขึ้น call stack`, stack[stack.length - 1] ?? null, null, null);
  };

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

  snap(1, "visited ว่าง · count = 0 · จะไล่ city ทุกตัวจากนอก", null, null, null);

  const dfs = (node: number) => {
    visited.add(node);
    compOf[node] = activeComp;
    snap(4, `dfs: mark ${node} อยู่ในก้อนที่ ${activeComp}`, node, null, null);
    for (const nxt of COMP_GRAPH[node]) {
      snap(5, `ดูเพื่อนบ้าน nxt = ${nxt}`, node, [node, nxt], null);
      if (!visited.has(nxt)) {
        snap(7, `จาก ${node} ไป ${nxt} ในก้อนเดียวกัน`, node, [node, nxt], null);
        dfs(nxt);
      } else {
        snap(6, `${nxt} ถูก mark แล้ว — ข้าม`, node, [node, nxt], null);
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

  snap(2, `จบ · มี ${count} ก้อน ที่ไม่เชื่อมถึงกัน`, null, null, null);
  return steps;
}
