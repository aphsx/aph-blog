/** Graphs — BFS intro workshop. Own teaching graph — not borrowed from DFS. */

export type BfsWalkStep = {
  line: number;
  msg: string;
  current: number | null;
  edge: [number, number] | null;
  queue: number[];
  visited: number[];
  dist: Record<number, number>;
  skipped: number | null;
};

export type GridBfsStep = {
  line: number;
  msg: string;
  current: [number, number] | null;
  looking: [number, number] | null;
  queue: [number, number][];
  visited: string[];
  dist: Record<string, number>;
  blocked: [number, number] | null;
};

export type MultiBfsStep = {
  line: number;
  msg: string;
  current: number | null;
  edge: [number, number] | null;
  queue: number[];
  visited: number[];
  from: Record<number, number>;
  skipped: number | null;
};

/** Two routes from 0 to 4: short 0-3-4, long 0-1-2-4. */
export const TEACH_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [2, 4],
];

export const TEACH_NODES = [0, 1, 2, 3, 4];

export const TEACH_GRAPH: Record<number, number[]> = {
  0: [1, 3],
  1: [0, 2],
  2: [1, 4],
  3: [0, 4],
  4: [3, 2],
};

export const TEACH_POS: Record<number, { x: number; y: number }> = {
  0: { x: 140, y: 70 },
  1: { x: 300, y: 70 },
  2: { x: 460, y: 70 },
  3: { x: 140, y: 220 },
  4: { x: 300, y: 220 },
};

export const BFS_CODE = [
  "from collections import deque",
  "graph = {0:[1,3], 1:[0,2], 2:[1,4], 3:[0,4], 4:[3,2]}",
  "start = 0",
  "queue = deque([start])",
  "visited = {start}",
  "dist = {start: 0}",
  "while queue:",
  "    node = queue.popleft()",
  "    for nxt in graph[node]:",
  "        if nxt not in visited:",
  "            visited.add(nxt)",
  "            dist[nxt] = dist[node] + 1",
  "            queue.append(nxt)",
  "print(dist)",
];

export const GRID = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];
export const GRID_ROWS = 3;
export const GRID_COLS = 3;
export const GRID_START: [number, number] = [0, 0];
export const GRID_DIRS: [number, number][] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export const GRID_CODE = [
  "from collections import deque",
  "grid = [[0,0,0],[0,1,0],[0,0,0]]  # 1 = กำแพง",
  "start = (0, 0)",
  "dirs = [(-1,0),(1,0),(0,-1),(0,1)]",
  "queue = deque([start])",
  "visited = {start}",
  "dist = {start: 0}",
  "while queue:",
  "    r, c = queue.popleft()",
  "    for dr, dc in dirs:",
  "        nr, nc = r + dr, c + dc",
  "        if 0 <= nr < 3 and 0 <= nc < 3:",
  "            if grid[nr][nc] == 0 and (nr,nc) not in visited:",
  "                visited.add((nr, nc))",
  "                dist[(nr,nc)] = dist[(r,c)] + 1",
  "                queue.append((nr, nc))",
  "print(dict(sorted(dist.items())))",
];

export const MULTI_CODE = [
  "from collections import deque",
  "graph = {0:[1,3], 1:[0,2], 2:[1,4], 3:[0,4], 4:[3,2]}",
  "queue = deque([0, 2])   # สองจุดเริ่มพร้อมกัน",
  "visited = {0, 2}",
  "while queue:",
  "    node = queue.popleft()",
  "    for nxt in graph[node]:",
  "        if nxt not in visited:",
  "            visited.add(nxt)",
  "            queue.append(nxt)",
  "print(sorted(visited))",
];

function cellKey(r: number, c: number) {
  return `${r},${c}`;
}

export function buildGraphBfsWalkSteps(): BfsWalkStep[] {
  const steps: BfsWalkStep[] = [];
  const visited = new Set<number>();
  const dist: Record<number, number> = {};
  const queue: number[] = [];

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
      queue: [...queue],
      visited: [...visited],
      dist: { ...dist },
      skipped,
    });
  };

  snap(2, "graph ของหน้านี้ · จาก 0 ไป 4 มีสองทาง ความยาวไม่เท่ากัน", null, null, null);
  snap(3, "start = 0 · คลื่นเริ่มที่นี่", null, null, null);

  queue.push(0);
  visited.add(0);
  dist[0] = 0;
  snap(4, "queue = deque([0])", null, null, null);
  snap(5, "visited = {0} · mark ตอนใส่คิว", null, null, null);
  snap(6, "dist[0] = 0", null, null, null);

  while (queue.length > 0) {
    snap(7, `while queue: เหลือ [${queue.join(", ")}]`, null, null, null);
    const node = queue.shift()!;
    snap(8, `popleft → ${node} · dist=${dist[node]}`, node, null, null);

    for (const nxt of TEACH_GRAPH[node]) {
      snap(9, `ดูเพื่อนบ้าน nxt = ${nxt} จาก graph[${node}]`, node, [node, nxt], null);
      if (visited.has(nxt)) {
        snap(10, `${nxt} อยู่ใน visited แล้ว — ข้าม`, node, [node, nxt], nxt);
        continue;
      }
      visited.add(nxt);
      dist[nxt] = dist[node] + 1;
      queue.push(nxt);
      snap(11, `visited.add(${nxt})`, node, [node, nxt], null);
      snap(12, `dist[${nxt}] = dist[${node}] + 1 = ${dist[nxt]}`, node, [node, nxt], null);
      snap(13, `queue.append(${nxt}) · คิว = [${queue.join(", ")}]`, node, [node, nxt], null);
    }
  }

  const distStr = TEACH_NODES.filter((k) => k in dist)
    .map((k) => `${k}: ${dist[k]}`)
    .join(", ");
  snap(14, `จบ · print(dist) → {${distStr}} · โหนด 4 ได้ 2 ไม่ใช่ 3`, null, null, null);
  return steps;
}

export function buildGridBfsSteps(): GridBfsStep[] {
  const steps: GridBfsStep[] = [];
  const visited = new Set<string>();
  const dist: Record<string, number> = {};
  const queue: [number, number][] = [];

  const snap = (
    line: number,
    msg: string,
    current: [number, number] | null,
    looking: [number, number] | null,
    blocked: [number, number] | null,
  ) => {
    steps.push({
      line,
      msg,
      current,
      looking,
      queue: queue.map(([r, c]) => [r, c]),
      visited: [...visited],
      dist: { ...dist },
      blocked,
    });
  };

  snap(2, "grid 3×3 · กำแพงที่ (1,1) · ที่เหลือเดินได้", null, null, null);
  snap(3, "start = (0, 0) · มุมบนซ้าย", null, null, null);
  snap(4, "dirs = บน ล่าง ซ้าย ขวา · คำนวณพิกัดสด ไม่สร้าง adjacency list", null, null, null);

  const start = GRID_START;
  queue.push(start);
  visited.add(cellKey(start[0], start[1]));
  dist[cellKey(start[0], start[1])] = 0;
  snap(5, "queue = deque([(0, 0)])", null, null, null);
  snap(6, "visited = {(0, 0)}", null, null, null);
  snap(7, "dist[(0, 0)] = 0", null, null, null);

  while (queue.length > 0) {
    snap(8, `while queue: เหลือ ${queue.length} ช่อง`, null, null, null);
    const [r, c] = queue.shift()!;
    snap(9, `popleft → (${r}, ${c}) · dist=${dist[cellKey(r, c)]}`, [r, c], null, null);

    for (const [dr, dc] of GRID_DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      if (!(nr >= 0 && nr < GRID_ROWS && nc >= 0 && nc < GRID_COLS)) {
        snap(12, `ทิศ (${dr},${dc}) → (${nr}, ${nc}) หลุดขอบ — ข้าม`, [r, c], [nr, nc], [nr, nc]);
        continue;
      }
      if (GRID[nr][nc] !== 0) {
        snap(13, `ทิศ (${dr},${dc}) → (${nr}, ${nc}) เป็นกำแพง — ข้าม`, [r, c], [nr, nc], [nr, nc]);
        continue;
      }
      const key = cellKey(nr, nc);
      if (visited.has(key)) {
        snap(13, `ทิศ (${dr},${dc}) → (${nr}, ${nc}) เคยเยือนแล้ว — ข้าม`, [r, c], [nr, nc], null);
        continue;
      }
      visited.add(key);
      dist[key] = dist[cellKey(r, c)] + 1;
      queue.push([nr, nc]);
      snap(
        16,
        `ใส่คิว (${nr}, ${nc}) · dist=${dist[key]} · คิว = [${queue.map(([a, b]) => `(${a},${b})`).join(", ")}]`,
        [r, c],
        [nr, nc],
        null,
      );
    }
  }

  snap(17, "จบ · ทุกช่องเดินได้มีระยะจาก (0, 0) · กำแพงไม่ถูกแตะ", null, null, null);
  return steps;
}

export function buildMultiSourceSteps(): MultiBfsStep[] {
  const steps: MultiBfsStep[] = [];
  const visited = new Set<number>();
  const from: Record<number, number> = {};
  const queue: number[] = [];

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
      queue: [...queue],
      visited: [...visited],
      from: { ...from },
      skipped,
    });
  };

  snap(2, "กราฟเดียวกับส่วนที่ 4 · คราวนี้เริ่มสองจุดพร้อมกัน", null, null, null);

  queue.push(0, 2);
  visited.add(0);
  visited.add(2);
  from[0] = 0;
  from[2] = 2;
  snap(3, "queue = deque([0, 2]) · โยนทั้งคู่เข้าคิวก่อน while", null, null, null);
  snap(4, "visited = {0, 2} · mark ทั้งคู่ตั้งแต่ต้น", null, null, null);

  while (queue.length > 0) {
    snap(5, `while queue: เหลือ [${queue.join(", ")}]`, null, null, null);
    const node = queue.shift()!;
    snap(6, `popleft → ${node} (คลื่นจากต้นตอ ${from[node]})`, node, null, null);

    for (const nxt of TEACH_GRAPH[node]) {
      snap(7, `ดูเพื่อนบ้าน nxt = ${nxt}`, node, [node, nxt], null);
      if (visited.has(nxt)) {
        snap(8, `${nxt} ถูกคลื่นอื่นแตะก่อนแล้ว — ข้าม`, node, [node, nxt], nxt);
        continue;
      }
      visited.add(nxt);
      from[nxt] = from[node];
      queue.push(nxt);
      snap(9, `visited.add(${nxt}) · รับคลื่นจากต้นตอ ${from[nxt]}`, node, [node, nxt], null);
      snap(10, `queue.append(${nxt}) · คิว = [${queue.join(", ")}]`, node, [node, nxt], null);
    }
  }

  snap(
    11,
    `จบ · visited = {${[...visited].sort((a, b) => a - b).join(", ")}} · คลื่นจาก 0 และ 2 แบ่งกราฟกัน`,
    null,
    null,
    null,
  );
  return steps;
}
