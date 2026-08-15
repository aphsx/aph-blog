/** Interactive walkthroughs for Graphs — DFS problem pages (p43–p46). */

/* ─── p43 Keys and Rooms ─────────────────────────────────────────── */

export type KeysRoomsStep = {
  line: number;
  msg: string;
  current: number | null;
  key: number | null;
  visited: number[];
  /** Room being considered as next via a key. */
  target: number | null;
  done: boolean;
  answer: boolean | null;
};

export const KEYS_ROOMS = [[1], [2], [3], []] as const;
export const KEYS_N = 4;

export const KEYS_CODE = [
  "rooms = [[1], [2], [3], []]",
  "visited = set()",
  "def dfs(room):",
  "    visited.add(room)",
  "    for key in rooms[room]:",
  "        if key not in visited:",
  "            dfs(key)",
  "dfs(0)",
  "return len(visited) == len(rooms)",
];

export function buildKeysRoomsSteps(): KeysRoomsStep[] {
  const steps: KeysRoomsStep[] = [];
  const visited = new Set<number>();

  const snap = (
    line: number,
    msg: string,
    extra: Partial<Pick<KeysRoomsStep, "current" | "key" | "target" | "done" | "answer">> = {},
  ) => {
    steps.push({
      line,
      msg,
      current: extra.current ?? null,
      key: extra.key ?? null,
      visited: [...visited],
      target: extra.target ?? null,
      done: extra.done ?? false,
      answer: extra.answer ?? null,
    });
  };

  snap(1, "Example 1 · rooms = [[1],[2],[3],[]] · เปิดได้แค่ห้อง 0");
  snap(2, "visited ว่าง · เตรียมจำห้องที่เข้าแล้ว");

  const dfs = (room: number) => {
    snap(3, `เข้า dfs(${room})`, { current: room });
    visited.add(room);
    snap(4, `visited.add(${room})  · เข้าห้องนี้แล้ว`, { current: room });
    for (const key of KEYS_ROOMS[room]) {
      snap(5, `ในห้อง ${room} เจอกุญแจ ${key}`, { current: room, key });
      if (visited.has(key)) {
        snap(6, `ห้อง ${key} เข้าไปแล้ว — ข้าม`, { current: room, key, target: key });
        continue;
      }
      snap(7, `ยังไม่เคยเข้า ${key} → เปิดแล้ว dfs(${key})`, {
        current: room,
        key,
        target: key,
      });
      dfs(key);
    }
    snap(5, `ถอยกลับมาห้อง ${room}`, { current: room });
  };

  snap(8, "เรียก dfs(0)", { current: 0 });
  dfs(0);
  const ok = visited.size === KEYS_N;
  snap(9, `len(visited)=${visited.size} เทียบ len(rooms)=${KEYS_N} → ${ok}`, {
    done: true,
    answer: ok,
  });
  return steps;
}

/* ─── p44 Number of Provinces ────────────────────────────────────── */

export type ProvincesStep = {
  line: number;
  msg: string;
  scan: number | null;
  current: number | null;
  other: number | null;
  visited: number[];
  provinces: number;
  /** Which province id each city belongs to (-1 none). */
  compOf: number[];
};

export const PROV_MATRIX = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
];
export const PROV_N = 3;

export const PROV_CODE = [
  "isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
  "n = 3",
  "visited = set()",
  "provinces = 0",
  "def dfs(city):",
  "    visited.add(city)",
  "    for other in range(n):",
  "        if isConnected[city][other] and other not in visited:",
  "            dfs(other)",
  "for city in range(n):",
  "    if city not in visited:",
  "        provinces += 1",
  "        dfs(city)",
  "return provinces",
];

export function buildProvincesSteps(): ProvincesStep[] {
  const steps: ProvincesStep[] = [];
  const visited = new Set<number>();
  const compOf = [-1, -1, -1];
  let provinces = 0;
  let active = -1;

  const snap = (
    line: number,
    msg: string,
    extra: Partial<Pick<ProvincesStep, "scan" | "current" | "other">> = {},
  ) => {
    steps.push({
      line,
      msg,
      scan: extra.scan ?? null,
      current: extra.current ?? null,
      other: extra.other ?? null,
      visited: [...visited],
      provinces,
      compOf: [...compOf],
    });
  };

  snap(1, "Example 1 · ตาราง 3×3 · เมือง 0 เชื่อม 1 · เมือง 2 อยู่คนเดียว");
  snap(2, "n = 3");
  snap(3, "visited ว่าง");
  snap(4, "provinces = 0");

  const dfs = (city: number) => {
    visited.add(city);
    compOf[city] = active;
    snap(6, `mark เมือง ${city} อยู่ในแคว้นที่ ${active}`, { current: city });
    for (let other = 0; other < PROV_N; other++) {
      snap(7, `ดู isConnected[${city}][${other}] = ${PROV_MATRIX[city][other]}`, {
        current: city,
        other,
      });
      if (PROV_MATRIX[city][other] === 1 && !visited.has(other)) {
        snap(9, `เชื่อมกับ ${other} และยังไม่เคยไป → dfs(${other})`, {
          current: city,
          other,
        });
        dfs(other);
      }
    }
  };

  for (let city = 0; city < PROV_N; city++) {
    snap(10, `loop นอก city = ${city}`, { scan: city });
    if (visited.has(city)) {
      snap(11, `${city} ถูกกวาดไปแล้ว — ข้าม`, { scan: city });
      continue;
    }
    provinces += 1;
    active = provinces;
    snap(12, `เจอเมืองใหม่ → provinces = ${provinces}`, { scan: city });
    snap(13, `dfs(${city}) กวาดทั้งแคว้น`, { scan: city });
    dfs(city);
  }

  snap(14, `คืน provinces = ${provinces}`);
  return steps;
}

/* ─── p45 Reorder Routes ─────────────────────────────────────────── */

export type ReorderStep = {
  line: number;
  msg: string;
  current: number | null;
  nxt: number | null;
  cost: number | null;
  visited: number[];
  changes: number;
  /** Directed original edges that have been counted (need flip). */
  flipped: [number, number][];
};

export const REORDER_N = 6;
export const REORDER_CONN: [number, number][] = [
  [0, 1],
  [1, 3],
  [2, 3],
  [4, 0],
  [4, 5],
];

/** undirected walk graph with cost: 1 = original a→b, 0 = reverse filler */
export const REORDER_GRAPH: Record<number, [number, number][]> = {
  0: [
    [1, 1],
    [4, 0],
  ],
  1: [
    [0, 0],
    [3, 1],
  ],
  2: [[3, 1]],
  3: [
    [1, 0],
    [2, 0],
  ],
  4: [
    [0, 1],
    [5, 1],
  ],
  5: [[4, 0]],
};

export const REORDER_CODE = [
  "n = 6",
  "connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]",
  "# แต่ละ [a,b] → graph[a]+= (b,1) และ graph[b]+= (a,0)",
  "visited = set()",
  "changes = 0",
  "def dfs(city):",
  "    visited.add(city)",
  "    for nxt, cost in graph[city]:",
  "        if nxt not in visited:",
  "            changes += cost",
  "            dfs(nxt)",
  "dfs(0)",
  "return changes",
];

export function buildReorderSteps(): ReorderStep[] {
  const steps: ReorderStep[] = [];
  const visited = new Set<number>();
  let changes = 0;
  const flipped: [number, number][] = [];

  const snap = (
    line: number,
    msg: string,
    extra: Partial<Pick<ReorderStep, "current" | "nxt" | "cost">> = {},
  ) => {
    steps.push({
      line,
      msg,
      current: extra.current ?? null,
      nxt: extra.nxt ?? null,
      cost: extra.cost ?? null,
      visited: [...visited],
      changes,
      flipped: flipped.map(([a, b]) => [a, b]),
    });
  };

  snap(1, "Example 1 · n = 6");
  snap(2, "connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]");
  snap(3, "สร้างกราฟสองทิศพร้อมป้าย cost แล้ว");
  snap(4, "visited ว่าง");
  snap(5, "changes = 0");

  const dfs = (city: number) => {
    visited.add(city);
    snap(7, `mark เมือง ${city}`, { current: city });
    for (const [nxt, cost] of REORDER_GRAPH[city]) {
      snap(8, `จาก ${city} ไป ${nxt} (cost=${cost})`, { current: city, nxt, cost });
      if (visited.has(nxt)) continue;
      if (cost === 1) {
        changes += 1;
        flipped.push([city, nxt]);
        snap(10, `cost 1 = ถนนทิศจริงชี้ออกจากฝั่ง 0 → ต้องกลับ · changes=${changes}`, {
          current: city,
          nxt,
          cost,
        });
      } else {
        snap(10, `cost 0 = ทางที่เราเติมเพื่อเดิน · ไม่ต้องกลับ`, {
          current: city,
          nxt,
          cost,
        });
      }
      snap(11, `dfs(${nxt})`, { current: city, nxt, cost });
      dfs(nxt);
    }
  };

  snap(12, "เรียก dfs(0) เดินออกจากเมืองหลวง");
  dfs(0);
  snap(13, `คืน changes = ${changes}`);
  return steps;
}

/* ─── p46 Evaluate Division ──────────────────────────────────────── */

export type EvalDivStep = {
  line: number;
  msg: string;
  src: string | null;
  dst: string;
  current: string | null;
  nbr: string | null;
  weight: number | null;
  product: number | null;
  visited: string[];
  answer: number | null;
};

export const EVAL_EDGES: [string, string, number][] = [
  ["a", "b", 2.0],
  ["b", "a", 0.5],
  ["b", "c", 3.0],
  ["c", "b", 1 / 3],
];

export const EVAL_GRAPH: Record<string, [string, number][]> = {
  a: [["b", 2.0]],
  b: [
    ["a", 0.5],
    ["c", 3.0],
  ],
  c: [["b", 1 / 3]],
};

export const EVAL_CODE = [
  'equations = [["a","b"],["b","c"]]',
  "values = [2.0, 3.0]",
  "# graph: a→b=2, b→a=0.5, b→c=3, c→b=1/3",
  "# query: a / c",
  "def dfs(src, dst, visited):",
  "    if src not in graph or dst not in graph: return -1.0",
  "    if src == dst: return 1.0",
  "    visited.add(src)",
  "    for nbr, w in graph[src].items():",
  "        if nbr in visited: continue",
  "        r = dfs(nbr, dst, visited)",
  "        if r != -1.0: return w * r",
  "    return -1.0",
];

export function buildEvalDivSteps(): EvalDivStep[] {
  const steps: EvalDivStep[] = [];
  const dst = "c";
  const visited = new Set<string>();

  const snap = (
    line: number,
    msg: string,
    extra: Partial<
      Pick<EvalDivStep, "src" | "current" | "nbr" | "weight" | "product" | "answer">
    > = {},
  ) => {
    steps.push({
      line,
      msg,
      src: extra.src ?? null,
      dst,
      current: extra.current ?? null,
      nbr: extra.nbr ?? null,
      weight: extra.weight ?? null,
      product: extra.product ?? null,
      visited: [...visited],
      answer: extra.answer ?? null,
    });
  };

  snap(1, 'Example 1 · equations = [["a","b"],["b","c"]], values = [2.0, 3.0]');
  snap(2, "values จับคู่สมการทีละคู่");
  snap(3, "สร้างกราฟสองทิศพร้อมน้ำหนักแล้ว");
  snap(4, "query แรก: a / c · จะเดินจาก a ไป c แล้วคูณน้ำหนัก", { src: "a" });

  const dfs = (src: string): number => {
    snap(5, `dfs("${src}", "${dst}")`, { src, current: src });
    if (!(src in EVAL_GRAPH) || !(dst in EVAL_GRAPH)) {
      snap(6, "มีตัวแปรที่ไม่รู้จัก → -1.0", { src, current: src, answer: -1 });
      return -1;
    }
    if (src === dst) {
      snap(7, `"${src}" == "${dst}" → คืน 1.0`, { src, current: src, product: 1, answer: 1 });
      return 1;
    }
    visited.add(src);
    snap(8, `visited.add("${src}")`, { src, current: src });
    for (const [nbr, w] of EVAL_GRAPH[src]) {
      snap(9, `เพื่อนบ้าน "${nbr}" น้ำหนัก ${w}`, { src, current: src, nbr, weight: w });
      if (visited.has(nbr)) {
        snap(10, `"${nbr}" เคยไปแล้ว — ข้าม`, { src, current: src, nbr, weight: w });
        continue;
      }
      snap(11, `ลอง dfs("${nbr}", "${dst}")`, { src, current: src, nbr, weight: w });
      const r = dfs(nbr);
      if (r !== -1) {
        const product = w * r;
        snap(12, `เจอทาง · คืน ${w} × ${r} = ${product}`, {
          src,
          current: src,
          nbr,
          weight: w,
          product,
          answer: product,
        });
        return product;
      }
    }
    snap(13, `จาก "${src}" ไม่มีทางถึง "${dst}" → -1.0`, { src, current: src, answer: -1 });
    return -1;
  };

  const ans = dfs("a");
  snap(4, `คำตอบ a/c = ${ans}`, { src: "a", answer: ans, product: ans });
  return steps;
}
