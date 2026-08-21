/** Heap / Priority Queue intro walkthroughs — teaching toy, not a course problem. */

export type HeapStep = {
  line: number;
  msg: string;
  /** Array view of the heap (level-order). */
  arr: number[];
  /** Index being written / swapped (gold). */
  focus: number | null;
  /** Parent index during bubble/sift (teal). */
  parent: number | null;
  /** Child index during bubble/sift (orange). */
  child: number | null;
  /** Value just popped / about to leave. */
  out: number | null;
  phase: "idle" | "push" | "bubble" | "peek" | "pop" | "sift";
};

/** Static figure: fixed min-heap used in section 2. */
export const SHAPE_ARR = [1, 3, 2, 7, 4, 5];

export const PUSH_POP_CODE = [
  "import heapq",
  "h = []",
  "heapq.heappush(h, 5)",
  "heapq.heappush(h, 1)",
  "heapq.heappush(h, 3)",
  "print(h[0])",
  "print(heapq.heappop(h))",
  "print(heapq.heappop(h))",
];

/** Parent index of i in 0-based heap array. */
export function parentOf(i: number): number {
  return Math.floor((i - 1) / 2);
}

export function leftOf(i: number): number {
  return 2 * i + 1;
}

export function rightOf(i: number): number {
  return 2 * i + 2;
}

/**
 * Layout positions for nodes in a complete binary tree drawn from `arr`.
 * Indices map 1:1 to array slots.
 */
export function layoutHeap(
  n: number,
  boxW = 720,
  top = 48,
  levelH = 72,
): Record<number, { x: number; y: number }> {
  const pos: Record<number, { x: number; y: number }> = {};
  if (n === 0) return pos;
  const depth = Math.floor(Math.log2(n)) + 1;
  for (let i = 0; i < n; i++) {
    const level = Math.floor(Math.log2(i + 1));
    const first = (1 << level) - 1;
    const offset = i - first;
    const count = 1 << level;
    const span = boxW / (count + 1);
    pos[i] = {
      x: span * (offset + 1),
      y: top + level * levelH,
    };
  }
  // silence unused when n=1
  void depth;
  return pos;
}

export function buildHeapPushPopSteps(): HeapStep[] {
  const steps: HeapStep[] = [];
  let arr: number[] = [];

  const snap = (
    line: number,
    msg: string,
    extra: Partial<HeapStep> = {},
  ) => {
    steps.push({
      line,
      msg,
      arr: [...arr],
      focus: null,
      parent: null,
      child: null,
      out: null,
      phase: "idle",
      ...extra,
    });
  };

  snap(1, "import heapq — ยืมโมดูลมาตรฐานที่มอง list เป็น min-heap");
  snap(2, "h = [] · กองว่าง ยังไม่มีสมาชิก", { phase: "idle" });

  // push 5  (line 3)
  arr = [5];
  snap(3, "heappush(h, 5) · ใส่ท้าย list → [5] · root = 5", {
    focus: 0,
    phase: "push",
  });

  // push 1: append then bubble  (line 4)
  arr = [5, 1];
  snap(4, "heappush(h, 1) · ใส่ท้ายก่อน → [5, 1] · ลูก 1 < พ่อ 5 ต้องสลับ", {
    focus: 1,
    parent: 0,
    child: 1,
    phase: "bubble",
  });
  arr = [1, 5];
  snap(4, "bubble up เสร็จ → [1, 5] · root = 1 (น้อยสุด)", {
    focus: 0,
    phase: "push",
  });

  // push 3  (line 5)
  arr = [1, 5, 3];
  snap(5, "heappush(h, 3) · ใส่ท้าย → [1, 5, 3] · พ่อของ 3 คือ 1 · 1 ≤ 3 ไม่ต้องสลับ", {
    focus: 2,
    parent: 0,
    child: 2,
    phase: "push",
  });

  snap(6, "h[0] = 1 · แอบดู root โดยไม่หยิบออก · O(1)", {
    focus: 0,
    phase: "peek",
  });

  // pop  (line 7)
  snap(7, "heappop · หยิบ root 1 ออก · ย้ายตัวท้าย 3 ขึ้น root ชั่วคราว", {
    out: 1,
    focus: 0,
    phase: "pop",
  });
  arr = [3, 5];
  snap(7, "หลังย้ายตัวท้ายขึ้น → [3, 5] · เช็คลูก: 5 ≥ 3 ไม่ต้องสลับ · คืนค่า 1", {
    focus: 0,
    child: 1,
    out: 1,
    phase: "sift",
  });

  // second pop  (line 8)
  snap(8, "heappop อีกครั้ง · หยิบ root 3 · เหลือ [5]", {
    out: 3,
    focus: 0,
    phase: "pop",
  });
  arr = [5];
  snap(8, "เหลือแค่ [5] · root = 5 · คืนค่า 3", {
    focus: 0,
    out: 3,
    phase: "sift",
  });

  return steps;
}
