/** Step data for the interactive Reverse Linked List visualizer. */

export const REVERSE_VALUES = [1, 2, 3, 4, 5, 6, 7] as const;

export type ReverseStep = {
  links: Record<number, number | null>;
  prev: number | null;
  curr: number | null;
  nxt: number | null;
  line: number;
  msg: string;
  activeLink: [number, number | null] | null;
};

export const REVERSE_CODE = [
  { line: 1, parts: [{ t: "def reverse_list(head):", c: "kw" as const }] },
  {
    line: 2,
    parts: [
      { t: "    prev", c: "id" as const },
      { t: " = ", c: "plain" as const },
      { t: "None", c: "kw" as const },
    ],
  },
  {
    line: 3,
    parts: [
      { t: "    curr", c: "id" as const },
      { t: " = ", c: "plain" as const },
      { t: "head", c: "id" as const },
    ],
  },
  {
    line: 4,
    parts: [
      { t: "    while ", c: "kw" as const },
      { t: "curr", c: "id" as const },
      { t: ":", c: "plain" as const },
    ],
  },
  {
    line: 5,
    parts: [
      { t: "        nxt", c: "id" as const },
      { t: " = ", c: "plain" as const },
      { t: "curr.next", c: "id" as const },
    ],
  },
  {
    line: 6,
    parts: [
      { t: "        curr.next", c: "id" as const },
      { t: " = ", c: "plain" as const },
      { t: "prev", c: "id" as const },
    ],
  },
  {
    line: 7,
    parts: [
      { t: "        prev", c: "id" as const },
      { t: " = ", c: "plain" as const },
      { t: "curr", c: "id" as const },
    ],
  },
  {
    line: 8,
    parts: [
      { t: "        curr", c: "id" as const },
      { t: " = ", c: "plain" as const },
      { t: "nxt", c: "id" as const },
    ],
  },
  {
    line: 9,
    parts: [
      { t: "    return ", c: "kw" as const },
      { t: "prev", c: "id" as const },
    ],
  },
];

export function buildReverseSteps(values: readonly number[]): ReverseStep[] {
  const links: Record<number, number | null> = Object.fromEntries(
    values.map((v, i) => [v, i + 1 < values.length ? values[i + 1] : null]),
  );
  let prev: number | null = null;
  let curr: number | null = values[0] ?? null;
  const steps: ReverseStep[] = [];

  const snap = (
    line: number,
    msg: string,
    activeLink: [number, number | null] | null = null,
  ): ReverseStep => ({
    links: { ...links },
    prev,
    curr,
    nxt: null,
    line,
    msg,
    activeLink,
  });

  const chain = values.join(" → ");
  steps.push({ ...snap(1, `Input: ${chain} → null`), nxt: null });

  prev = null;
  steps.push({ ...snap(2, "Initialize prev = null") });
  steps.push({ ...snap(3, `Initialize curr to head (Node ${curr})`) });

  while (curr !== null) {
    steps.push({ ...snap(4, `Check: curr (${curr}) != null → continue`) });
    const nxt: number | null = links[curr];
    steps.push({
      ...snap(5, `Save next: next = ${nxt ?? "null"}`),
      nxt,
    });
    links[curr] = prev;
    const target = prev === null ? "null" : String(prev);
    steps.push({
      ...snap(6, `Reverse link: curr.next = ${target}`, [curr, prev]),
      nxt,
    });
    prev = curr;
    steps.push({ ...snap(7, `Advance prev → Node ${prev}`), nxt });
    curr = nxt;
    if (curr !== null) {
      steps.push({ ...snap(8, `Advance curr → Node ${curr}`) });
    } else {
      steps.push({ ...snap(8, "Advance curr → null") });
    }
  }

  steps.push({ ...snap(4, "Check: curr is null → exit loop") });
  const rev = [...values].reverse().join(" → ");
  steps.push({ ...snap(9, `Return prev = ${prev}  →  ${rev} → null`) });

  return steps;
}

export const DIAGRAM_W = 920;
export const DIAGRAM_H = 280;

export function nodeLayout(values: readonly number[]) {
  const r = 26;
  const gap = 48;
  const n = values.length;
  const total = n * (2 * r) + (n - 1) * gap;
  const x0 = (DIAGRAM_W - total) / 2 + r;
  const y = 128;
  const pos: Record<number, { x: number; y: number }> = {};
  values.forEach((v, i) => {
    pos[v] = { x: x0 + i * (2 * r + gap), y };
  });
  return { pos, r, y };
}

export function isReversedLink(
  pos: Record<number, { x: number; y: number }>,
  src: number,
  dst: number,
) {
  return pos[dst].x < pos[src].x;
}

export function processedIndex(step: ReverseStep, values: readonly number[]) {
  if (step.prev === null) return -1;
  return values.indexOf(step.prev);
}

export function leftNullNode(step: ReverseStep, values: readonly number[]) {
  const pi = processedIndex(step, values);
  for (const v of values) {
    if (step.links[v] === null && values.indexOf(v) <= pi) return v;
  }
  return null;
}

export function rightNullNode(step: ReverseStep, values: readonly number[]) {
  if (step.curr === null) return null;
  let v = step.curr;
  while (step.links[v] !== null) v = step.links[v]!;
  if (step.links[v] === null && v !== leftNullNode(step, values)) return v;
  return null;
}
