/** Interactive walkthroughs for Graphs — BFS problem pages (p47–p48). */

export const DIRS: [number, number][] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

/* ─── p47 Nearest Exit · Example 2 ──────────────────────────────── */

export type MazeExitStep = {
  line: number;
  msg: string;
  current: [number, number] | null;
  looking: [number, number] | null;
  queue: [number, number, number][];
  visited: string[];
  /** Found exit cell, if this step returns. */
  found: [number, number] | null;
  answer: number | null;
};

export const MAZE: string[][] = [
  ["+", "+", "+"],
  [".", ".", "."],
  ["+", "+", "+"],
];
export const MAZE_ROWS = 3;
export const MAZE_COLS = 3;
export const MAZE_ENTRANCE: [number, number] = [1, 0];

export const MAZE_CODE = [
  'maze = [["+","+","+"],[".",".","."],["+","+","+"]]',
  "entrance = [1, 0]",
  "queue = deque([(1, 0, 0)])",
  "visited = {(1, 0)}",
  "while queue:",
  "    r, c, steps = queue.popleft()",
  "    for dr, dc in dirs:",
  "        nr, nc = r + dr, c + dc",
  "        if in_bounds and maze[nr][nc]=='.' and (nr,nc) not in visited:",
  "            if on_border(nr, nc):",
  "                return steps + 1",
  "            visited.add((nr, nc))",
  "            queue.append((nr, nc, steps + 1))",
  "return -1",
];

function mazeKey(r: number, c: number) {
  return `${r},${c}`;
}

function onBorder(r: number, c: number, rows: number, cols: number) {
  return r === 0 || r === rows - 1 || c === 0 || c === cols - 1;
}

export function buildMazeExitSteps(): MazeExitStep[] {
  const steps: MazeExitStep[] = [];
  const visited = new Set<string>();
  const queue: [number, number, number][] = [];
  const [sr, sc] = MAZE_ENTRANCE;

  const snap = (
    line: number,
    msg: string,
    extra: Partial<Pick<MazeExitStep, "current" | "looking" | "found" | "answer">> = {},
  ) => {
    steps.push({
      line,
      msg,
      current: extra.current ?? null,
      looking: extra.looking ?? null,
      queue: queue.map(([r, c, s]) => [r, c, s]),
      visited: [...visited],
      found: extra.found ?? null,
      answer: extra.answer ?? null,
    });
  };

  snap(1, "Example 2 · maze 3×3 · แถวกลางเป็นทางเดิน แถวบน/ล่างเป็นกำแพง");
  snap(2, "entrance = [1, 0] · ยืนซ้ายสุดของแถวกลาง (ช่องนี้ติดขอบแต่ไม่นับเป็นทางออก)");

  queue.push([sr, sc, 0]);
  visited.add(mazeKey(sr, sc));
  snap(3, "queue = deque([(1, 0, 0)]) · ก้าวที่ 0", { current: [sr, sc] });
  snap(4, "visited = {(1, 0)} · mark ทางเข้าทันที กันนับเป็นทางออก", { current: [sr, sc] });

  while (queue.length > 0) {
    snap(5, `while queue: เหลือ ${queue.length} ช่อง`, { current: null });
    const [r, c, stepsNow] = queue.shift()!;
    snap(6, `popleft → (${r}, ${c}) · steps=${stepsNow}`, { current: [r, c] });

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      snap(7, `ลองทิศ (${dr}, ${dc})`, { current: [r, c], looking: [nr, nc] });
      snap(8, `nr, nc = (${nr}, ${nc})`, { current: [r, c], looking: [nr, nc] });

      const inBounds = nr >= 0 && nr < MAZE_ROWS && nc >= 0 && nc < MAZE_COLS;
      if (!inBounds) {
        snap(9, `(${nr}, ${nc}) หลุดขอบ — ข้าม`, { current: [r, c], looking: [nr, nc] });
        continue;
      }
      if (MAZE[nr][nc] !== ".") {
        snap(9, `(${nr}, ${nc}) เป็นกำแพง + — เดินไม่ได้`, {
          current: [r, c],
          looking: [nr, nc],
        });
        continue;
      }
      if (visited.has(mazeKey(nr, nc))) {
        snap(9, `(${nr}, ${nc}) เคยเยือนแล้ว — ข้าม`, { current: [r, c], looking: [nr, nc] });
        continue;
      }

      snap(9, `(${nr}, ${nc}) เป็น '.' และยังไม่เคยเยือน`, {
        current: [r, c],
        looking: [nr, nc],
      });

      if (onBorder(nr, nc, MAZE_ROWS, MAZE_COLS)) {
        snap(10, `(${nr}, ${nc}) ติดขอบตาราง = ทางออก`, {
          current: [r, c],
          looking: [nr, nc],
          found: [nr, nc],
        });
        snap(11, `return ${stepsNow} + 1 = ${stepsNow + 1}`, {
          current: [r, c],
          looking: [nr, nc],
          found: [nr, nc],
          answer: stepsNow + 1,
        });
        return steps;
      }

      visited.add(mazeKey(nr, nc));
      queue.push([nr, nc, stepsNow + 1]);
      snap(12, `ยังไม่ใช่ทางออก · visited.add((${nr}, ${nc}))`, {
        current: [r, c],
        looking: [nr, nc],
      });
      snap(13, `queue.append((${nr}, ${nc}, ${stepsNow + 1}))`, {
        current: [r, c],
        looking: [nr, nc],
      });
    }
  }

  snap(14, "คิวหมด ไม่เจอทางออก → return -1", { answer: -1 });
  return steps;
}

/* ─── p48 Rotting Oranges · Example 1 ───────────────────────────── */

export type OrangesStep = {
  line: number;
  msg: string;
  current: [number, number] | null;
  looking: [number, number] | null;
  queue: [number, number][];
  /** Mutable grid snapshot 0/1/2 */
  grid: number[][];
  fresh: number;
  minutes: number;
  answer: number | null;
};

export const ORANGE_START: number[][] = [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
];
export const ORANGE_ROWS = 3;
export const ORANGE_COLS = 3;

export const ORANGE_CODE = [
  "grid = [[2,1,1],[1,1,0],[0,1,1]]",
  "queue, fresh = deque(), 0",
  "for r in range(3):",
  "    for c in range(3):",
  "        if grid[r][c] == 2: queue.append((r, c))",
  "        elif grid[r][c] == 1: fresh += 1",
  "minutes = 0",
  "while queue and fresh > 0:",
  "    minutes += 1",
  "    for _ in range(len(queue)):  # ล็อกชั้น = หนึ่งนาที",
  "        r, c = queue.popleft()",
  "        for dr, dc in dirs:",
  "            nr, nc = r + dr, c + dc",
  "            if in_bounds and grid[nr][nc] == 1:",
  "                grid[nr][nc] = 2",
  "                fresh -= 1",
  "                queue.append((nr, nc))",
  "return minutes if fresh == 0 else -1",
];

export function buildOrangesSteps(): OrangesStep[] {
  const steps: OrangesStep[] = [];
  const grid = ORANGE_START.map((row) => [...row]);
  const queue: [number, number][] = [];
  let fresh = 0;
  let minutes = 0;

  const snap = (
    line: number,
    msg: string,
    extra: Partial<Pick<OrangesStep, "current" | "looking" | "answer">> = {},
  ) => {
    steps.push({
      line,
      msg,
      current: extra.current ?? null,
      looking: extra.looking ?? null,
      queue: queue.map(([r, c]) => [r, c]),
      grid: grid.map((row) => [...row]),
      fresh,
      minutes,
      answer: extra.answer ?? null,
    });
  };

  snap(1, "Example 1 · grid = [[2,1,1],[1,1,0],[0,1,1]] · 2=เน่า 1=สด 0=ว่าง");
  snap(2, "queue ว่าง · fresh = 0 ยังไม่ได้นับ");

  for (let r = 0; r < ORANGE_ROWS; r++) {
    snap(3, `สแกนแถว r = ${r}`, { current: [r, 0] });
    for (let c = 0; c < ORANGE_COLS; c++) {
      snap(4, `ดูช่อง (${r}, ${c}) = ${grid[r][c]}`, { current: [r, c] });
      if (grid[r][c] === 2) {
        queue.push([r, c]);
        snap(5, `เจอส้มเน่า → queue.append((${r}, ${c}))`, { current: [r, c] });
      } else if (grid[r][c] === 1) {
        fresh += 1;
        snap(6, `เจอส้มสด → fresh = ${fresh}`, { current: [r, c] });
      }
    }
  }

  snap(7, `สแกนจบ · queue = [(0,0)] · fresh = ${fresh} · minutes = 0`);

  while (queue.length > 0 && fresh > 0) {
    snap(8, `while: คิวมี ${queue.length} · fresh เหลือ ${fresh}`);
    minutes += 1;
    snap(9, `ขึ้นนาทีที่ ${minutes} · ล็อกชั้นนี้มี ${queue.length} ลูก`);
    const layer = queue.length;
    snap(10, `for _ in range(${layer}) · จัดการเฉพาะส้มที่เน่าอยู่ต้นนาทีนี้`);

    for (let i = 0; i < layer; i++) {
      const [r, c] = queue.shift()!;
      snap(11, `popleft → (${r}, ${c}) ลาม 4 ทิศ`, { current: [r, c] });

      for (const [dr, dc] of DIRS) {
        const nr = r + dr;
        const nc = c + dc;
        const inBounds = nr >= 0 && nr < ORANGE_ROWS && nc >= 0 && nc < ORANGE_COLS;
        if (!inBounds) continue;
        if (grid[nr][nc] !== 1) continue;

        snap(13, `ช่อง (${nr}, ${nc}) เป็นส้มสด ติดกับ (${r}, ${c})`, {
          current: [r, c],
          looking: [nr, nc],
        });
        grid[nr][nc] = 2;
        fresh -= 1;
        queue.push([nr, nc]);
        snap(15, `เน่าตาม · grid[${nr}][${nc}] = 2 · fresh = ${fresh}`, {
          current: [r, c],
          looking: [nr, nc],
        });
        snap(17, `queue.append((${nr}, ${nc})) · จะลามต่อในนาทีถัดไป`, {
          current: [r, c],
          looking: [nr, nc],
        });
      }
    }
  }

  const ans = fresh === 0 ? minutes : -1;
  snap(18, `fresh = ${fresh} → return ${ans}`, { answer: ans });
  return steps;
}
