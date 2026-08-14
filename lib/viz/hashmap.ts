/** Interactive hash map / set walkthroughs: intro workshops + LC2215/1207/1657/2352. */

export const SCAN_A = [4, 9, 5, 2, 7];
export const SCAN_B = [9, 4, 9, 8, 4, 3];

export const SCAN_CODE = [
  "for x in b:",
  "    if x not in a: ...      # list ไล่เทียบ",
  "",
  "pool = set(a)               # แปลงครั้งเดียว",
  "for x in b:",
  "    if x not in pool: ...   # O(1)",
];

export type ScanStep = {
  line: number;
  msg: string;
  phase: "list" | "set";
  bI: number | null;
  /** Inclusive end of the scan in a (list phase). */
  scanTo: number | null;
  hitAt: number | null;
  compares: number;
  pool: number[];
  missing: number[];
};

export function buildScanSteps(): ScanStep[] {
  const a = SCAN_A;
  const b = SCAN_B;
  const steps: ScanStep[] = [];
  let bI: number | null = null;
  let scanTo: number | null = null;
  let hitAt: number | null = null;
  let compares = 0;
  let pool: number[] = [];
  let missing: number[] = [];
  let phase: ScanStep["phase"] = "list";

  const snap = (line: number, msg: string) => {
    steps.push({ line, msg, phase, bI, scanTo, hitAt, compares, pool: [...pool], missing: [...missing] });
  };

  snap(1, "a = [4, 9, 5, 2, 7]  b = [9, 4, 9, 8, 4, 3]  · ถามว่าตัวใน b มีใน a ไหม");

  for (let i = 0; i < b.length; i++) {
    const x = b[i];
    bI = i;
    hitAt = null;
    const found = a.indexOf(x);
    if (found >= 0) {
      scanTo = found;
      compares += found + 1;
      hitAt = found;
      snap(2, `x = ${x}  · ไล่ a จากซ้าย เจอที่ช่อง ${found}  · เทียบไป ${found + 1} ครั้ง (รวม ${compares})`);
    } else {
      scanTo = a.length - 1;
      compares += a.length;
      missing.push(x);
      snap(2, `x = ${x}  · ไล่ a จนหมด ไม่เจอ  · เทียบ ${a.length} ครั้ง (รวม ${compares})  → เก็บไว้`);
    }
  }

  bI = null;
  scanTo = null;
  hitAt = null;
  snap(2, `วิธี list จบ  · ไม่มีใน a = [${missing.join(", ")}]  · เทียบทั้งหมด ${compares} ครั้ง`);

  phase = "set";
  missing = [];
  const listCompares = compares;
  compares = 0;
  snap(4, "เริ่มใหม่ด้วย set  · แปลง a ครั้งเดียว จ่าย memory เพิ่มหนึ่งก้อน");
  pool = [...new Set(a)];
  snap(4, `pool = {${pool.join(", ")}}  · จากนี้ถามทีละตัวใน b โดยไม่ไล่ a`);

  for (let i = 0; i < b.length; i++) {
    const x = b[i];
    bI = i;
    const found = pool.includes(x);
    compares += 1;
    hitAt = found ? pool.indexOf(x) : null;
    if (!found) missing.push(x);
    snap(
      6,
      found
        ? `x = ${x}  · ${x} in pool → True  ในหนึ่งก้าว  (รวม ${compares})`
        : `x = ${x}  · ${x} in pool → False  ในหนึ่งก้าว  → เก็บไว้  (รวม ${compares})`,
    );
  }

  bI = null;
  hitAt = null;
  snap(
    6,
    `วิธี set จบ  · คำตอบเดียวกัน [${missing.join(", ")}] แต่เทียบ ${compares} ครั้ง ไม่ใช่ ${listCompares}  · a โตแค่ไหนก้าวก็ยังก้าวเดียว`,
  );
  return steps;
}

export const SLOT_N = 8;
export const SLOT_PUT = [42, 100, 7, 15];

export const SLOT_CODE = [
  "slots = [None] * 8",
  "def put(k):",
  "    i = k % 8",
  "    while slots[i] is not None:",
  "        i = (i + 1) % 8",
  "    slots[i] = k",
  "def has(k):",
  "    i = k % 8",
  "    while slots[i] is not None:",
  "        if slots[i] == k: return True",
  "        i = (i + 1) % 8",
  "    return False",
];

export type SlotStep = {
  line: number;
  msg: string;
  slots: (number | null)[];
  key: number | null;
  cursor: number | null;
  mode: "idle" | "hash" | "probe" | "write" | "hit";
  formula: string;
};

export function buildSlotSteps(): SlotStep[] {
  const n = SLOT_N;
  const slots: (number | null)[] = Array(n).fill(null);
  const steps: SlotStep[] = [];
  let key: number | null = null;
  let cursor: number | null = null;
  let mode: SlotStep["mode"] = "idle";
  let formula = "";

  const snap = (line: number, msg: string) => {
    steps.push({ line, msg, slots: [...slots], key, cursor, mode, formula });
  };

  snap(1, "ตาราง 8 ช่องว่าง  · ของ int เล็ก ๆ hash(k) = k เลยใช้ k % 8 เป็นหมายเลขช่อง");

  for (const k of SLOT_PUT) {
    key = k;
    let i = k % n;
    cursor = i;
    mode = "hash";
    formula = `${k} % 8 = ${i}`;
    snap(3, `put(${k})  · ${formula}  เดินไปช่อง ${i} ตรง ๆ ไม่ไล่ทั้งแถว`);

    while (slots[i] !== null) {
      mode = "probe";
      snap(4, `ช่อง ${i} มี ${slots[i]} อยู่แล้ว (${slots[i]} ≠ ${k})  · collision`);
      i = (i + 1) % n;
      cursor = i;
      formula = `probe → ช่อง ${i}`;
      snap(5, `เดินหาช่องว่างถัดไป → ช่อง ${i}`);
    }

    mode = "write";
    slots[i] = k;
    snap(6, `ช่อง ${i} ว่าง → วาง ${k}`);
  }

  // lookup 15 (the collided key)
  key = 15;
  let i = 15 % n;
  cursor = i;
  mode = "hash";
  formula = "15 % 8 = 7";
  snap(8, "has(15)  · คำนวณช่องเดิม 15 % 8 = 7 — สูตรเดียวกับตอนใส่");
  mode = "probe";
  snap(9, `ช่อง 7 มี ${slots[7]} ≠ 15  · ต้องเดินต่อเหมือนตอนใส่`);
  i = (i + 1) % n;
  cursor = i;
  formula = "probe → ช่อง 0";
  mode = "hit";
  snap(10, "ช่อง 0 มี 15 == 15  → เจอ  · สองก้าว ไม่ใช่แปดก้าว");

  // lookup 42 (direct hit)
  key = 42;
  cursor = 42 % n;
  mode = "hash";
  formula = "42 % 8 = 2";
  snap(8, "has(42)  · 42 % 8 = 2");
  mode = "hit";
  snap(10, "ช่อง 2 มี 42 ทันที  · นี่คือเคสที่คนเรียก O(1)");

  key = null;
  cursor = null;
  mode = "idle";
  formula = "";
  snap(12, "สรุป: ไม่ค้นทั้งตาราง — คำนวณช่อง ถ้าชนค่อยเดินต่อสั้น ๆ  จึงเป็น O(1) เฉลี่ย");
  return steps;
}

export const SEEN_NUMS = [3, 9, 4, 1];
export const SEEN_TARGET = 12;

export const SEEN_CODE = [
  "seen = {}",
  "for i, x in enumerate(nums):",
  "    need = target - x",
  "    if need in seen:",
  "        return (seen[need], i)",
  "    seen[x] = i",
];

export type SeenStep = {
  line: number;
  msg: string;
  i: number | null;
  need: number | null;
  seen: { k: number; idx: number }[];
  hit: [number, number] | null;
};

export function buildSeenSteps(): SeenStep[] {
  const nums = SEEN_NUMS;
  const target = SEEN_TARGET;
  const steps: SeenStep[] = [];
  let i: number | null = null;
  let need: number | null = null;
  const seen: { k: number; idx: number }[] = [];
  let hit: [number, number] | null = null;

  const snap = (line: number, msg: string) => {
    steps.push({ line, msg, i, need, seen: [...seen], hit });
  };

  snap(1, `nums = [3, 9, 4, 1]  target = ${target}  · seen ว่าง ยังไม่เคยเดินผ่านใคร`);

  for (let idx = 0; idx < nums.length; idx++) {
    const x = nums[idx];
    i = idx;
    need = target - x;
    snap(2, `i = ${idx}  x = ${x}`);
    snap(3, `need = ${target} − ${x} = ${need}  · ถ้าเคยเจอ ${need} มาก่อน คู่ครบ`);
    const found = seen.find((e) => e.k === need);
    if (found) {
      hit = [found.idx, idx];
      snap(4, `${need} อยู่ใน seen ที่ index ${found.idx}  → เจอคู่`);
      snap(5, `return (${found.idx}, ${idx})  · ไม่ต้อง sort จึงไม่เสีย index เดิม`);
      return steps;
    }
    snap(4, `${need} ยังไม่อยู่ใน seen  · ถามก่อน แล้วค่อยจด — สลับสองบรรทัดนี้ไม่ได้`);
    seen.push({ k: x, idx });
    snap(6, `seen[${x}] = ${idx}  · จดตัวเองไว้ให้คนหลังมาเจอ`);
  }

  return steps;
}

export const DIFF_A = [1, 2, 3, 3];
export const DIFF_B = [1, 1, 2, 2];

export const DIFF_CODE = [
  "s1, s2 = set(nums1), set(nums2)",
  "return [list(s1 - s2), list(s2 - s1)]",
];

export type DiffStep = {
  line: number;
  msg: string;
  s1: number[];
  s2: number[];
  adding: { side: "a" | "b"; i: number } | null;
  collapsed: { side: "a" | "b"; i: number } | null;
  phase: "build" | "left" | "right" | "done";
  leftOut: number[];
  rightOut: number[];
};

export function buildDiffSteps(): DiffStep[] {
  const a = DIFF_A;
  const b = DIFF_B;
  const steps: DiffStep[] = [];
  const s1: number[] = [];
  const s2: number[] = [];
  let adding: DiffStep["adding"] = null;
  let collapsed: DiffStep["collapsed"] = null;
  let phase: DiffStep["phase"] = "build";
  let leftOut: number[] = [];
  let rightOut: number[] = [];

  const snap = (line: number, msg: string) => {
    steps.push({
      line,
      msg,
      s1: [...s1],
      s2: [...s2],
      adding,
      collapsed,
      phase,
      leftOut: [...leftOut],
      rightOut: [...rightOut],
    });
  };

  snap(1, "nums1 = [1, 2, 3, 3]  nums2 = [1, 1, 2, 2]  · แปลงเป็น set จะตัดตัวซ้ำให้เอง");

  for (let i = 0; i < a.length; i++) {
    adding = { side: "a", i };
    collapsed = null;
    if (s1.includes(a[i])) {
      collapsed = { side: "a", i };
      snap(1, `nums1[${i}] = ${a[i]}  · มีใน s1 แล้ว ยุบซ้ำทิ้ง`);
    } else {
      s1.push(a[i]);
      snap(1, `nums1[${i}] = ${a[i]}  → s1 รับเข้า  · s1 = {${s1.join(", ")}}`);
    }
  }

  adding = null;
  collapsed = null;
  for (let i = 0; i < b.length; i++) {
    adding = { side: "b", i };
    collapsed = null;
    if (s2.includes(b[i])) {
      collapsed = { side: "b", i };
      snap(1, `nums2[${i}] = ${b[i]}  · มีใน s2 แล้ว ยุบซ้ำทิ้ง`);
    } else {
      s2.push(b[i]);
      snap(1, `nums2[${i}] = ${b[i]}  → s2 รับเข้า  · s2 = {${s2.join(", ")}}`);
    }
  }

  adding = null;
  collapsed = null;
  snap(1, `แปลงเสร็จ  s1 = {${s1.join(", ")}}  s2 = {${s2.join(", ")}}  · ต่อไปลบสองทิศ`);

  phase = "left";
  for (const x of s1) {
    if (!s2.includes(x)) leftOut.push(x);
  }
  snap(2, `s1 − s2 = {${s1.join(", ")}} − {${s2.join(", ")}} = {${leftOut.join(", ") || "∅"}}`);

  phase = "right";
  for (const x of s2) {
    if (!s1.includes(x)) rightOut.push(x);
  }
  snap(2, `s2 − s1 = {${s2.join(", ")}} − {${s1.join(", ")}} = {${rightOut.join(", ") || "∅"}}  · คนละทิศ ต้องทำทั้งคู่`);

  phase = "done";
  snap(2, `return [[${leftOut.join(", ")}], [${rightOut.join(", ")}]]  · list เพราะโจทย์ขอ array ลำดับไม่สำคัญ`);
  return steps;
}

export const FREQ_ARR = [1, 2, 2, 1, 1, 3];

export const FREQ_CODE = [
  "counts = Counter(arr).values()",
  "return len(counts) == len(set(counts))",
];

export type FreqStep = {
  line: number;
  msg: string;
  i: number | null;
  count: { k: number; n: number }[];
  values: number[] | null;
  uniq: number[] | null;
  ok: boolean | null;
};

export function buildFreqSteps(): FreqStep[] {
  const arr = FREQ_ARR;
  const steps: FreqStep[] = [];
  let i: number | null = null;
  const count: { k: number; n: number }[] = [];
  let values: number[] | null = null;
  let uniq: number[] | null = null;
  let ok: boolean | null = null;

  const snap = (line: number, msg: string) => {
    steps.push({ line, msg, i, count: count.map((e) => ({ ...e })), values, uniq, ok });
  };

  snap(1, "arr = [1, 2, 2, 1, 1, 3]  · ชั้น 1 นับว่าแต่ละค่าโผล่กี่ครั้ง");

  for (let idx = 0; idx < arr.length; idx++) {
    i = idx;
    const v = arr[idx];
    const e = count.find((x) => x.k === v);
    if (e) e.n += 1;
    else count.push({ k: v, n: 1 });
    const shown = count.map((x) => `${x.k}:${x.n}`).join(", ");
    snap(1, `arr[${idx}] = ${v}  →  Counter = {${shown}}`);
  }

  i = null;
  values = count.map((e) => e.n);
  snap(1, `counts = Counter(arr).values()  →  [${values.join(", ")}]  · ทำงานบนจำนวนครั้ง ไม่ใช่บนตัวค่า`);

  uniq = [...new Set(values)].sort((a, b) => a - b);
  ok = uniq.length === values.length;
  snap(
    2,
    `set([${values.join(", ")}]) = {${uniq.join(", ")}}  · len ${values.length} ${ok ? "==" : "≠"} ${uniq.length}  →  ${ok ? "True" : "False"}  ไม่มีจำนวนครั้งซ้ำ`,
  );
  return steps;
}

export const CLOSE_W1 = "cabbba";
export const CLOSE_W2 = "abbccc";

export const CLOSE_CODE = [
  "if len(word1) != len(word2): return False",
  "if set(word1) != set(word2): return False",
  "f1 = sorted(Counter(word1).values())",
  "f2 = sorted(Counter(word2).values())",
  "return f1 == f2",
];

export type CloseStep = {
  line: number;
  msg: string;
  gate: 0 | 1 | 2 | 3;
  g1: boolean | null;
  g2: boolean | null;
  g3: boolean | null;
  set1: string[];
  set2: string[];
  c1: { k: string; n: number }[];
  c2: { k: string; n: number }[];
  f1: number[] | null;
  f2: number[] | null;
};

function countChars(s: string): { k: string; n: number }[] {
  const m = new Map<string, number>();
  for (const ch of s) m.set(ch, (m.get(ch) ?? 0) + 1);
  return [...m.entries()].map(([k, n]) => ({ k, n }));
}

export function buildCloseSteps(): CloseStep[] {
  const w1 = CLOSE_W1;
  const w2 = CLOSE_W2;
  const steps: CloseStep[] = [];
  let gate: CloseStep["gate"] = 0;
  let g1: boolean | null = null;
  let g2: boolean | null = null;
  let g3: boolean | null = null;
  let set1: string[] = [];
  let set2: string[] = [];
  let c1: { k: string; n: number }[] = [];
  let c2: { k: string; n: number }[] = [];
  let f1: number[] | null = null;
  let f2: number[] | null = null;

  const snap = (line: number, msg: string) => {
    steps.push({
      line,
      msg,
      gate,
      g1,
      g2,
      g3,
      set1: [...set1],
      set2: [...set2],
      c1: c1.map((e) => ({ ...e })),
      c2: c2.map((e) => ({ ...e })),
      f1,
      f2,
    });
  };

  snap(1, `word1 = "${w1}"  word2 = "${w2}"  · ไม่ simulate การสลับ — เช็ค invariant สามด่าน`);

  gate = 1;
  g1 = w1.length === w2.length;
  snap(1, `Gate 1  ความยาว  ${w1.length} ${g1 ? "==" : "≠"} ${w2.length}  →  ผ่าน  (op สลับตำแหน่งไม่เปลี่ยนความยาว)`);

  gate = 2;
  set1 = [...new Set(w1)];
  set2 = [...new Set(w2)];
  g2 = set1.length === set2.length && set1.every((ch) => set2.includes(ch));
  snap(2, `Gate 2  ชุดตัวอักษร  {${set1.join(", ")}} ${g2 ? "==" : "≠"} {${set2.join(", ")}}  →  ผ่าน  (op 2 เสกตัวใหม่ไม่ได้)`);

  gate = 3;
  c1 = countChars(w1);
  c2 = countChars(w2);
  snap(3, `Gate 3  นับ  Counter("${w1}") = {${c1.map((e) => `${e.k}:${e.n}`).join(", ")}}`);
  snap(4, `Counter("${w2}") = {${c2.map((e) => `${e.k}:${e.n}`).join(", ")}}`);
  f1 = [...c1.map((e) => e.n)].sort((a, b) => a - b);
  f2 = [...c2.map((e) => e.n)].sort((a, b) => a - b);
  g3 = f1.join() === f2.join();
  snap(
    5,
    `เรียงกองจำนวน  [${f1.join(", ")}] ${g3 ? "==" : "≠"} [${f2.join(", ")}]  →  ${g3 ? "True" : "False"}  (op 2 ย้ายกองได้ สนแค่ว่ากองตัวเลขเหมือนกัน)`,
  );
  return steps;
}

export const PAIRS_GRID = [
  [3, 2, 1],
  [1, 7, 6],
  [2, 7, 7],
];

export const PAIRS_CODE = [
  "row_count = Counter(tuple(r) for r in grid)",
  "pairs = 0",
  "for j in range(n):",
  "    col = tuple(grid[i][j] for i in range(n))",
  "    pairs += row_count[col]",
  "return pairs",
];

export type PairsStep = {
  line: number;
  msg: string;
  rowI: number | null;
  colJ: number | null;
  ledger: { key: string; n: number }[];
  col: number[] | null;
  matchedRow: number | null;
  pairs: number;
};

export function buildPairsSteps(): PairsStep[] {
  const grid = PAIRS_GRID;
  const n = grid.length;
  const steps: PairsStep[] = [];
  let rowI: number | null = null;
  let colJ: number | null = null;
  const ledger: { key: string; n: number }[] = [];
  let col: number[] | null = null;
  let matchedRow: number | null = null;
  let pairs = 0;

  const snap = (line: number, msg: string) => {
    steps.push({
      line,
      msg,
      rowI,
      colJ,
      ledger: ledger.map((e) => ({ ...e })),
      col: col ? [...col] : null,
      matchedRow,
      pairs,
    });
  };

  snap(1, "เฟส 1 จดบัญชีแถว  · แปลง list เป็น tuple ก่อนถึงจะเป็น key ได้");

  for (let r = 0; r < n; r++) {
    rowI = r;
    const key = `(${grid[r].join(", ")})`;
    const e = ledger.find((x) => x.key === key);
    if (e) e.n += 1;
    else ledger.push({ key, n: 1 });
    snap(1, `แถว ${r} = ${key}  →  ledger[${key}] = ${e ? e.n : 1}`);
  }

  rowI = null;
  snap(2, `จดเสร็จ  pairs = 0  · ต่อไปประกอบคอลัมน์ทีละเส้นไปถามบัญชี`);

  for (let j = 0; j < n; j++) {
    colJ = j;
    matchedRow = null;
    col = grid.map((row) => row[j]);
    snap(3, `j = ${j}`);
    snap(4, `col = (${col.join(", ")})  · ล็อคคอลัมน์ ${j} ให้แถววิ่งบน→ล่าง`);
    const key = `(${col.join(", ")})`;
    const e = ledger.find((x) => x.key === key);
    const add = e ? e.n : 0;
    pairs += add;
    if (e) {
      matchedRow = grid.findIndex((row) => row.join() === col!.join());
      snap(5, `ledger มี ${key} → ${add}  · pairs += ${add}  = ${pairs}  (บวกจำนวนครั้ง ไม่ใช่บวก 1)`);
    } else {
      snap(5, `ledger ไม่มี ${key} → 0  · pairs ยัง ${pairs}`);
    }
  }

  colJ = null;
  col = null;
  matchedRow = null;
  snap(6, `return ${pairs}`);
  return steps;
}
