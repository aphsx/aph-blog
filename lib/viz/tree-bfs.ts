/** Interactive BFS walkthroughs for LC199 + LC1161. */

export type TreeNodeDef = {
  id: string;
  val: number;
  left: string | null;
  right: string | null;
};

export type TreeBfsStep = {
  line: number;
  msg: string;
  queue: string[];
  current: string | null;
  done: string[];
  level: number;
  i: number | null;
  levelSize: number | null;
  result: number[];
  captured: string[];
  total: number | null;
  bestSum: number | null;
  bestLevel: number | null;
};

export const RSV_CODE = [
  "def rightSideView(root):",
  "    if root is None: return []",
  "    queue = deque([root])",
  "    result = []",
  "    while queue:",
  "        level_size = len(queue)",
  "        for i in range(level_size):",
  "            node = queue.popleft()",
  "            if i == level_size - 1:",
  "                result.append(node.val)",
  "            if node.left:  queue.append(node.left)",
  "            if node.right: queue.append(node.right)",
  "    return result",
];

export const MLS_CODE = [
  "def maxLevelSum(root):",
  "    best_sum = float('-inf')",
  "    best_level = 1",
  "    level = 0",
  "    queue = deque([root])",
  "    while queue:",
  "        level += 1",
  "        size = len(queue)",
  "        total = 0",
  "        for _ in range(size):",
  "            node = queue.popleft()",
  "            total += node.val",
  "            if node.left:  queue.append(node.left)",
  "            if node.right: queue.append(node.right)",
  "        if total > best_sum:",
  "            best_sum, best_level = total, level",
  "    return best_level",
];

/** LC199 example: [1,2,3,null,5,null,4] */
export const RSV_ROOT = "n1";
export const RSV_NODES: Record<string, TreeNodeDef> = {
  n1: { id: "n1", val: 1, left: "n2", right: "n3" },
  n2: { id: "n2", val: 2, left: null, right: "n5" },
  n3: { id: "n3", val: 3, left: null, right: "n4" },
  n5: { id: "n5", val: 5, left: null, right: null },
  n4: { id: "n4", val: 4, left: null, right: null },
};

/** LC1161 example: [1,7,0,7,-8] */
export const MLS_ROOT = "a1";
export const MLS_NODES: Record<string, TreeNodeDef> = {
  a1: { id: "a1", val: 1, left: "a7", right: "a0" },
  a7: { id: "a7", val: 7, left: "a7b", right: "a8" },
  a0: { id: "a0", val: 0, left: null, right: null },
  a7b: { id: "a7b", val: 7, left: null, right: null },
  a8: { id: "a8", val: -8, left: null, right: null },
};

export function layoutTree(
  nodes: Record<string, TreeNodeDef>,
  root: string,
  width: number,
  top = 40,
  levelH = 78,
  span = 170,
): Record<string, { x: number; y: number }> {
  const pos: Record<string, { x: number; y: number }> = {};
  const walk = (id: string, x: number, y: number, dx: number) => {
    pos[id] = { x, y };
    const n = nodes[id];
    if (n.left) walk(n.left, x - dx, y + levelH, dx / 2);
    if (n.right) walk(n.right, x + dx, y + levelH, dx / 2);
  };
  walk(root, width / 2, top, span);
  return pos;
}

function kids(nodes: Record<string, TreeNodeDef>, id: string): string[] {
  const n = nodes[id];
  const out: string[] = [];
  if (n.left) out.push(n.left);
  if (n.right) out.push(n.right);
  return out;
}

function snap(
  base: Omit<TreeBfsStep, "msg" | "line">,
  line: number,
  msg: string,
): TreeBfsStep {
  return {
    ...base,
    queue: [...base.queue],
    done: [...base.done],
    result: [...base.result],
    captured: [...base.captured],
    line,
    msg,
  };
}

export function buildRightViewSteps(): TreeBfsStep[] {
  const nodes = RSV_NODES;
  const steps: TreeBfsStep[] = [];
  const s = (): Omit<TreeBfsStep, "msg" | "line"> => ({
    queue: [...queue],
    current,
    done: [...done],
    level,
    i,
    levelSize,
    result: [...result],
    captured: [...captured],
    total: null,
    bestSum: null,
    bestLevel: null,
  });

  let queue: string[] = [];
  let current: string | null = null;
  const done: string[] = [];
  let level = 0;
  let i: number | null = null;
  let levelSize: number | null = null;
  const result: number[] = [];
  const captured: string[] = [];

  steps.push(snap(s(), 1, "Input: [1, 2, 3, null, 5, null, 4]  — มองจากขวา"));
  queue = [RSV_ROOT];
  steps.push(snap(s(), 3, "queue = deque([1])  · ใส่ root เป็นตัวแรก"));
  steps.push(snap(s(), 4, "result = []  · ยังไม่เห็นโหนดไหน"));

  while (queue.length) {
    steps.push(snap(s(), 5, `while queue: คิวยังมี ${queue.map((id) => nodes[id].val).join(", ")}`));
    levelSize = queue.length;
    i = null;
    steps.push(snap(s(), 6, `level_size = ${levelSize}  · ล็อกจำนวนโหนดชั้นนี้`));

    for (let k = 0; k < levelSize; k++) {
      i = k;
      steps.push(snap(s(), 7, `for i = ${k}  (ชั้นนี้มี ${levelSize} โหนด)`));
      current = queue.shift()!;
      steps.push(snap(s(), 8, `popleft → node = ${nodes[current].val}`));

      if (k === levelSize - 1) {
        steps.push(snap(s(), 9, `i == ${levelSize} - 1  → ${nodes[current].val} คือตัวขวาสุดของชั้น`));
        result.push(nodes[current].val);
        captured.push(current);
        steps.push(snap(s(), 10, `result.append(${nodes[current].val})  →  [${result.join(", ")}]`));
      } else {
        steps.push(snap(s(), 9, `i = ${k} ไม่ใช่ตัวสุดท้าย  →  ${nodes[current].val} ถูกบัง ยังไม่เก็บ`));
      }

      const ch = kids(nodes, current);
      if (ch.length) {
        queue.push(...ch);
        const labels = ch.map((id) => nodes[id].val).join(", ");
        steps.push(snap(s(), ch[0] === nodes[current].left ? 11 : 12, `enqueue ลูกของ ${nodes[current].val}: ${labels}`));
      }
      done.push(current);
      current = null;
    }
    level += 1;
  }

  i = null;
  levelSize = null;
  steps.push(snap(s(), 5, "while queue: คิวว่าง → ออกจากลูป"));
  steps.push(snap(s(), 13, `return result  →  [${result.join(", ")}]`));
  return steps;
}

export function buildLevelSumSteps(): TreeBfsStep[] {
  const nodes = MLS_NODES;
  const steps: TreeBfsStep[] = [];
  let queue: string[] = [];
  let current: string | null = null;
  const done: string[] = [];
  let level = 0;
  let i: number | null = null;
  let levelSize: number | null = null;
  const result: number[] = [];
  const captured: string[] = [];
  let total: number | null = null;
  let bestSum: number | null = null;
  let bestLevel: number | null = 1;

  const s = (): Omit<TreeBfsStep, "msg" | "line"> => ({
    queue: [...queue],
    current,
    done: [...done],
    level,
    i,
    levelSize,
    result: [...result],
    captured: [...captured],
    total,
    bestSum,
    bestLevel,
  });

  steps.push(snap(s(), 1, "Input: [1, 7, 0, 7, -8]  — หาชั้นที่ผลรวมมากสุด"));
  bestSum = Number.NEGATIVE_INFINITY;
  steps.push(snap(s(), 2, "best_sum = -inf  (กันชั้นที่ผลรวมติดลบ)"));
  steps.push(snap(s(), 3, "best_level = 1"));
  steps.push(snap(s(), 4, "level = 0"));
  queue = [MLS_ROOT];
  steps.push(snap(s(), 5, "queue = deque([1])"));

  while (queue.length) {
    steps.push(snap(s(), 6, `while queue: คิว = [${queue.map((id) => nodes[id].val).join(", ")}]`));
    level += 1;
    steps.push(snap(s(), 7, `level += 1  →  ชั้นที่ ${level}`));
    levelSize = queue.length;
    i = null;
    steps.push(snap(s(), 8, `size = ${levelSize}`));
    total = 0;
    steps.push(snap(s(), 9, "total = 0  · เริ่มบวกใหม่ทุกชั้น"));

    for (let k = 0; k < levelSize; k++) {
      i = k;
      steps.push(snap(s(), 10, `for รอบที่ ${k + 1}/${levelSize}`));
      current = queue.shift()!;
      steps.push(snap(s(), 11, `popleft → node = ${nodes[current].val}`));
      total += nodes[current].val;
      steps.push(snap(s(), 12, `total += ${nodes[current].val}  →  total = ${total}`));
      const ch = kids(nodes, current);
      if (ch.length) {
        queue.push(...ch);
        steps.push(
          snap(s(), 13, `enqueue ลูกของ ${nodes[current].val}: ${ch.map((id) => nodes[id].val).join(", ")}`),
        );
      }
      done.push(current);
      current = null;
    }

    i = null;
    const better = total > (bestSum ?? Number.NEGATIVE_INFINITY);
    steps.push(
      snap(
        s(),
        15,
        `จบชั้น ${level}: total = ${total}  ${better ? `> best_sum (${bestSum === Number.NEGATIVE_INFINITY ? "-inf" : bestSum})` : `ไม่มากกว่า ${bestSum}`}`,
      ),
    );
    if (better) {
      bestSum = total;
      bestLevel = level;
      captured.length = 0;
      // mark nodes of this winning level: last `levelSize` items in done
      captured.push(...done.slice(-levelSize));
      steps.push(snap(s(), 16, `อัปเดตแชมป์ → best_level = ${bestLevel}, best_sum = ${bestSum}`));
    }
  }

  levelSize = null;
  total = null;
  steps.push(snap(s(), 6, "while queue: คิวว่าง → ออกจากลูป"));
  steps.push(snap(s(), 17, `return best_level  →  ${bestLevel}`));
  return steps;
}
