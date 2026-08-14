import type { TreeNodeDef } from "@/lib/viz/tree-bfs";
import { linksOf, snap, valsOf, type BstFrame, type BstStep } from "@/lib/viz/bst";

export type DualBstStep = {
  line: number;
  msg: string;
  leftCaption: string;
  rightCaption: string;
  left: BstFrame;
  right: BstFrame;
};

export type CasesScene = "leaf" | "leafDone" | "one" | "oneDone" | "two";

export type CasesStep = BstStep & {
  scene: CasesScene;
};

function frame(nodes: Record<string, TreeNodeDef>, extra: Partial<BstFrame> = {}): BstFrame {
  return {
    current: extra.current ?? null,
    path: extra.path ?? [],
    offside: extra.offside ?? [],
    found: extra.found ?? null,
    successor: extra.successor ?? null,
    hidden: extra.hidden ?? [],
    vals: extra.vals ?? valsOf(nodes),
    links: extra.links ?? linksOf(nodes),
    ghost: extra.ghost ?? null,
    error: extra.error ?? null,
    inorder: extra.inorder ?? [],
  };
}

function dual(
  line: number,
  msg: string,
  leftCaption: string,
  rightCaption: string,
  left: BstFrame,
  right: BstFrame,
): DualBstStep {
  return { line, msg, leftCaption, rightCaption, left, right };
}

export const GROW_CODE = [
  "def insert(root, val):",
  "    if root is None:",
  "        return TreeNode(val)",
  "    if val < root.val:",
  "        root.left = insert(root.left, val)",
  "    else:",
  "        root.right = insert(root.right, val)",
  "    return root",
  "",
  "def inorder(node):",
  "    if node is None: return []",
  "    return inorder(node.left) + [node.val] + inorder(node.right)",
];

export const RULE_CODE = [
  "# BST property — ทุกโหนด ไม่ใช่แค่แม่",
  "#   ทั้งก้อนซ้าย  <  node  <  ทั้งก้อนขวา",
  "",
  "# ต้นขวา: 2 < 3 < 6  ชั้นแม่ถูก",
  "# แต่ 6 อยู่ในฝั่งซ้ายของ 5",
  "if 6 > 5 and 6 in left_subtree(5):",
  "    return False   # กฎพังที่บรรพบุรุษ",
];

export const HEIGHT_CODE = [
  "def search(root, target):",
  "    node = root",
  "    hops = 0",
  "    while node:",
  "        hops += 1",
  "        if target == node.val: return hops",
  "        if target < node.val:  node = node.left",
  "        else:                  node = node.right",
  "    return hops",
];

export const CASES_CODE = [
  "# ลบโหนดใน BST — แยก 3 กรณี",
  "if node.left is None:   return node.right   # A ใบ / ไม่มีซ้าย",
  "if node.right is None:  return node.left    # B ลูกเดียว",
  "succ = min_of(node.right)                   # C น้อยสุดฝั่งขวา",
  "node.val = succ.val                         # ยืมค่ามาแทน",
  "delete(node.right, succ.val)                # ลบ successor ตัวเดิม",
];

/** Workshop tree after inserting [5, 3, 8, 2, 4, 9] */
export const GROW_ROOT = "g5";
export const GROW_NODES: Record<string, TreeNodeDef> = {
  g5: { id: "g5", val: 5, left: "g3", right: "g8" },
  g3: { id: "g3", val: 3, left: "g2", right: "g4" },
  g8: { id: "g8", val: 8, left: null, right: "g9" },
  g2: { id: "g2", val: 2, left: null, right: null },
  g4: { id: "g4", val: 4, left: null, right: null },
  g9: { id: "g9", val: 9, left: null, right: null },
};

const ALL = Object.keys(GROW_NODES);

export const RULE_OK_ROOT = "ok5";
export const RULE_OK: Record<string, TreeNodeDef> = {
  ok5: { id: "ok5", val: 5, left: "ok3", right: "ok8" },
  ok3: { id: "ok3", val: 3, left: "ok2", right: "ok4" },
  ok8: { id: "ok8", val: 8, left: null, right: "ok9" },
  ok2: { id: "ok2", val: 2, left: null, right: null },
  ok4: { id: "ok4", val: 4, left: null, right: null },
  ok9: { id: "ok9", val: 9, left: null, right: null },
};

export const RULE_BAD_ROOT = "bd5";
export const RULE_BAD: Record<string, TreeNodeDef> = {
  bd5: { id: "bd5", val: 5, left: "bd3", right: "bd8" },
  bd3: { id: "bd3", val: 3, left: "bd2", right: "bd6" },
  bd8: { id: "bd8", val: 8, left: null, right: "bd9" },
  bd2: { id: "bd2", val: 2, left: null, right: null },
  bd6: { id: "bd6", val: 6, left: null, right: null },
  bd9: { id: "bd9", val: 9, left: null, right: null },
};

export const BAL_ROOT = "b4";
export const BAL_NODES: Record<string, TreeNodeDef> = {
  b4: { id: "b4", val: 4, left: "b2", right: "b6" },
  b2: { id: "b2", val: 2, left: "b1", right: "b3" },
  b6: { id: "b6", val: 6, left: null, right: null },
  b1: { id: "b1", val: 1, left: null, right: null },
  b3: { id: "b3", val: 3, left: null, right: null },
};

export const SKEW_ROOT = "k1";
export const SKEW_NODES: Record<string, TreeNodeDef> = {
  k1: { id: "k1", val: 1, left: null, right: "k2" },
  k2: { id: "k2", val: 2, left: null, right: "k3" },
  k3: { id: "k3", val: 3, left: null, right: "k4" },
  k4: { id: "k4", val: 4, left: null, right: null },
};

export const LEAF_ROOT = "a6";
export const LEAF_NODES: Record<string, TreeNodeDef> = {
  a6: { id: "a6", val: 6, left: null, right: "a7" },
  a7: { id: "a7", val: 7, left: null, right: null },
};

export const ONE_ROOT = "o5";
export const ONE_NODES: Record<string, TreeNodeDef> = {
  o5: { id: "o5", val: 5, left: null, right: "o6" },
  o6: { id: "o6", val: 6, left: null, right: "o7" },
  o7: { id: "o7", val: 7, left: null, right: null },
};

export const TWO_ROOT = "t5";
export const TWO_NODES: Record<string, TreeNodeDef> = {
  t5: { id: "t5", val: 5, left: "t3", right: "t6" },
  t3: { id: "t3", val: 3, left: "t2", right: "t4" },
  t6: { id: "t6", val: 6, left: null, right: "t7" },
  t2: { id: "t2", val: 2, left: null, right: null },
  t4: { id: "t4", val: 4, left: null, right: null },
  t7: { id: "t7", val: 7, left: null, right: null },
};

const LEAF_DONE_NODES: Record<string, TreeNodeDef> = {
  a6: { id: "a6", val: 6, left: null, right: null },
};

const ONE_DONE_NODES: Record<string, TreeNodeDef> = {
  o5: { id: "o5", val: 5, left: null, right: "o7" },
  o7: { id: "o7", val: 7, left: null, right: null },
};

export const CASES_MAP: Record<CasesScene, { nodes: Record<string, TreeNodeDef>; root: string }> = {
  leaf: { nodes: LEAF_NODES, root: LEAF_ROOT },
  leafDone: { nodes: LEAF_DONE_NODES, root: LEAF_ROOT },
  one: { nodes: ONE_NODES, root: ONE_ROOT },
  oneDone: { nodes: ONE_DONE_NODES, root: ONE_ROOT },
  two: { nodes: TWO_NODES, root: TWO_ROOT },
};

export function buildGrowSteps(): BstStep[] {
  const n = GROW_NODES;
  const steps: BstStep[] = [];
  let hidden = [...ALL];

  const push = (line: number, msg: string, extra: Partial<BstFrame> = {}) => {
    steps.push(snap(frame(n, { hidden, ...extra }), line, msg));
  };

  push(1, "ต้นว่าง · จะใส่ทีละตัวจาก [5, 3, 8, 2, 4, 9]");

  push(2, "ใส่ 5 · root เป็น None → ปลูกเป็นราก");
  hidden = hidden.filter((id) => id !== "g5");
  push(3, "return TreeNode(5)  →  ใบแรกคือ root เสมอ", { current: "g5", found: "g5" });

  push(1, "ใส่ 3 · เริ่มเดินจาก root", { current: "g5", path: ["g5"] });
  push(4, "3 < 5  →  ลงซ้าย (ตอนนี้ซ้ายยังว่าง)", { current: "g5", path: ["g5"], ghost: "g3" });
  hidden = hidden.filter((id) => id !== "g3");
  push(3, "ซ้ายเป็น None → แขวน 3", { current: "g3", found: "g3", path: ["g5"] });

  push(1, "ใส่ 8 · เริ่มที่ 5", { current: "g5", path: ["g5"] });
  push(6, "8 > 5  →  ลงขวา (ขวายังว่าง)", { current: "g5", path: ["g5"], ghost: "g8" });
  hidden = hidden.filter((id) => id !== "g8");
  push(3, "ขวาเป็น None → แขวน 8", { current: "g8", found: "g8", path: ["g5"] });

  push(1, "ใส่ 2 · เริ่มที่ 5", { current: "g5", path: ["g5"] });
  push(4, "2 < 5  →  ลงซ้าย ไปที่ 3", { current: "g5", path: ["g5"] });
  push(4, "2 < 3  →  ลงซ้ายต่อ (ซ้ายของ 3 ว่าง)", {
    current: "g3",
    path: ["g5", "g3"],
    ghost: "g2",
  });
  hidden = hidden.filter((id) => id !== "g2");
  push(3, "แขวน 2 ซ้ายของ 3", { current: "g2", found: "g2", path: ["g5", "g3"] });

  push(1, "ใส่ 4 · อยู่ระหว่าง 3 กับ 5", { current: "g5", path: ["g5"] });
  push(4, "4 < 5  →  ลงซ้าย", { current: "g5", path: ["g5"] });
  push(6, "4 > 3  →  ไปขวาของ 3 (ว่าง)", {
    current: "g3",
    path: ["g5", "g3"],
    ghost: "g4",
  });
  hidden = hidden.filter((id) => id !== "g4");
  push(3, "แขวน 4 ขวาของ 3", { current: "g4", found: "g4", path: ["g5", "g3"] });

  push(1, "ใส่ 9 · เริ่มที่ 5", { current: "g5", path: ["g5"] });
  push(6, "9 > 5  →  ลงขวา ไปที่ 8", { current: "g5", path: ["g5"] });
  push(6, "9 > 8  →  ไปขวาของ 8 (ว่าง)", {
    current: "g8",
    path: ["g5", "g8"],
    ghost: "g9",
  });
  hidden = hidden.filter((id) => id !== "g9");
  push(3, "แขวน 9 ขวาของ 8  ·  ปลูกครบแล้ว", {
    current: "g9",
    found: "g9",
    path: ["g5", "g8"],
  });

  push(10, "ของแถม: เดิน in-order (ซ้าย → ตัวเอง → ขวา) จะได้ค่าเรียง");
  push(12, "ดิ่งซ้ายสุดก่อน  →  ถึงใบ 2", { current: "g2", path: ["g2"] });
  push(12, "แตะ 2  →  in-order = [2]", {
    current: "g2",
    path: ["g2"],
    inorder: [2],
  });
  push(12, "กลับขึ้น 3 แล้วแตะตัวเอง  →  [2, 3]", {
    current: "g3",
    path: ["g2", "g3"],
    inorder: [2, 3],
  });
  push(12, "ไปขวาของ 3 แตะ 4  →  [2, 3, 4]", {
    current: "g4",
    path: ["g2", "g3", "g4"],
    inorder: [2, 3, 4],
  });
  push(12, "กลับราก แตะ 5  →  [2, 3, 4, 5]", {
    current: "g5",
    path: ["g2", "g3", "g4", "g5"],
    inorder: [2, 3, 4, 5],
  });
  push(12, "ไปขวา แตะ 8  →  [2, 3, 4, 5, 8]", {
    current: "g8",
    path: ["g2", "g3", "g4", "g5", "g8"],
    inorder: [2, 3, 4, 5, 8],
  });
  push(12, "ไปขวา แตะ 9  →  [2, 3, 4, 5, 8, 9]", {
    current: "g9",
    path: ["g2", "g3", "g4", "g5", "g8", "g9"],
    inorder: [2, 3, 4, 5, 8, 9],
    found: "g9",
  });
  push(12, "ได้ค่าเรียงโดยไม่ต้อง sort — นี่คือของแถมของ BST", {
    path: ALL,
    inorder: [2, 3, 4, 5, 8, 9],
    found: "g5",
  });

  return steps;
}

export function buildRuleSteps(): DualBstStep[] {
  const okIdle = frame(RULE_OK);
  const badIdle = frame(RULE_BAD);
  const steps: DualBstStep[] = [];

  steps.push(
    dual(1, "ต้นเดียวกันเกือบหมด — ต่างแค่โหนดล่างขวาของ 3", "ถูก", "ผิด", okIdle, badIdle),
  );
  steps.push(
    dual(
      4,
      "ต้นขวา: 2 < 3 < 6  ชั้นแม่ถูก จึงหลอกตาได้",
      "ถูก",
      "ชั้นแม่ยังผ่าน",
      frame(RULE_OK, { current: "ok3", path: ["ok3"] }),
      frame(RULE_BAD, { current: "bd3", path: ["bd3"] }),
    ),
  );
  steps.push(
    dual(
      5,
      "แต่ 6 อยู่ในฝั่งซ้ายของ 5 และ 6 > 5 — กฎของบรรพบุรุษพัง",
      "ถูก",
      "6 ผิดที่ 5",
      okIdle,
      frame(RULE_BAD, {
        current: "bd5",
        path: ["bd5", "bd3"],
        error: "bd6",
        offside: ["bd6"],
      }),
    ),
  );
  steps.push(
    dual(
      6,
      "กฎต้องจริงกับทั้งก้อน subtree ไม่ใช่แค่ลูกชั้นเดียว",
      "left < node < right",
      "เช็กทั้งก้อน",
      frame(RULE_OK, { found: "ok5" }),
      frame(RULE_BAD, { error: "bd6", current: "bd5" }),
    ),
  );
  return steps;
}

export function buildHeightSteps(): DualBstStep[] {
  const steps: DualBstStep[] = [];
  const bal = (extra: Partial<BstFrame> = {}) => frame(BAL_NODES, extra);
  const skew = (extra: Partial<BstFrame> = {}) => frame(SKEW_NODES, extra);

  steps.push(
    dual(
      1,
      "ต้นซ้ายใส่ 4, 2, 6, 1, 3 · ต้นขวาใส่ 1, 2, 3, 4 ตามลำดับ",
      "สมดุล  h ≈ 2",
      "เอียง  h = 4",
      bal(),
      skew(),
    ),
  );

  steps.push(
    dual(2, "ค้น 3 ฝั่งซ้าย · hops = 0  ยืนที่ root 4", "ค้น 3", "รอ", bal({ current: "b4", path: ["b4"] }), skew()),
  );
  steps.push(
    dual(
      7,
      "3 < 4  →  ลงซ้าย · hops = 1",
      "ค้น 3",
      "รอ",
      bal({ current: "b4", path: ["b4"], offside: ["b6"] }),
      skew(),
    ),
  );
  steps.push(
    dual(
      8,
      "ยืนที่ 2 · 3 > 2  →  ไปขวา · hops = 2",
      "ค้น 3",
      "รอ",
      bal({ current: "b2", path: ["b4", "b2"], offside: ["b6", "b1"] }),
      skew(),
    ),
  );
  steps.push(
    dual(
      6,
      "3 == 3  ✓  เจอใน 2 ชั้น  (≈ log n)",
      "เจอแล้ว · 2 hops",
      "รอ",
      bal({ current: "b3", path: ["b4", "b2", "b3"], found: "b3", offside: ["b6", "b1"] }),
      skew(),
    ),
  );

  steps.push(
    dual(2, "ค้น 4 ฝั่งขวา · ต้นเป็นเส้นตรง ตัดครึ่งไม่ได้", "จบแล้ว", "ค้น 4", bal({ found: "b3" }), skew({ current: "k1", path: ["k1"] })),
  );
  steps.push(
    dual(8, "4 > 1  →  ไปขวา · hops = 1", "จบแล้ว", "ค้น 4", bal({ found: "b3" }), skew({ current: "k1", path: ["k1"] })),
  );
  steps.push(
    dual(8, "4 > 2  →  ไปขวา · hops = 2", "จบแล้ว", "ค้น 4", bal({ found: "b3" }), skew({ current: "k2", path: ["k1", "k2"] })),
  );
  steps.push(
    dual(8, "4 > 3  →  ไปขวา · hops = 3", "จบแล้ว", "ค้น 4", bal({ found: "b3" }), skew({ current: "k3", path: ["k1", "k2", "k3"] })),
  );
  steps.push(
    dual(
      6,
      "4 == 4  ✓  แต่ลงมา 4 ชั้น = ไล่ทั้งเส้น  O(n)",
      "สมดุล · 2 hops",
      "เอียง · 4 hops",
      bal({ found: "b3" }),
      skew({ current: "k4", path: ["k1", "k2", "k3", "k4"], found: "k4" }),
    ),
  );

  return steps;
}

function caseSnap(
  scene: CasesStep["scene"],
  nodes: Record<string, TreeNodeDef>,
  extra: Partial<BstFrame>,
  line: number,
  msg: string,
): CasesStep {
  return { ...snap(frame(nodes, extra), line, msg), scene };
}

export function buildCasesSteps(): CasesStep[] {
  const steps: CasesStep[] = [];

  steps.push(caseSnap("leaf", LEAF_NODES, { current: "a7" }, 1, "กรณี A · ใบ — ลบ 7 จากต้น 6 → 7"));
  steps.push(
    caseSnap("leaf", LEAF_NODES, { current: "a7", found: "a7" }, 2, "7 ไม่มีลูกซ้าย  →  คืนลูกขวา ซึ่งเป็น None"),
  );
  steps.push(
    caseSnap("leafDone", LEAF_DONE_NODES, { current: "a6", found: "a6" }, 2, "ตัดใบทิ้ง  เหลือแค่ 6"),
  );

  steps.push(caseSnap("one", ONE_NODES, { current: "o6" }, 1, "กรณี B · ลูกเดียว — ลบ 6 (มีแต่ลูกขวา 7)"));
  steps.push(
    caseSnap("one", ONE_NODES, { current: "o6", found: "o6" }, 2, "ไม่มีลูกซ้าย  →  คืนลูกขวา (7) ขึ้นมาแทน"),
  );
  steps.push(
    caseSnap("oneDone", ONE_DONE_NODES, { current: "o7", found: "o7" }, 2, "ยก 7 ขึ้นแทน 6  ·  กิ่งไม่ขาด"),
  );

  steps.push(
    caseSnap("two", TWO_NODES, { current: "t3" }, 1, "กรณี C · ลูกสองตัว — ลบ 3 (มีทั้ง 2 และ 4) ห้ามตัดตรง ๆ"),
  );
  steps.push(
    caseSnap("two", TWO_NODES, { current: "t3", successor: "t4" }, 4, "successor = ค่าน้อยสุดฝั่งขวา = 4"),
  );
  steps.push(
    caseSnap(
      "two",
      TWO_NODES,
      { current: "t3", successor: "t4", vals: { ...valsOf(TWO_NODES), t3: 4 } },
      5,
      "คัดลอก 4 มาทับโหนด 3  ·  กล่องเดิมยังอยู่ แค่เปลี่ยนค่า",
    ),
  );
  steps.push(
    caseSnap(
      "two",
      TWO_NODES,
      {
        current: "t5",
        found: "t3",
        hidden: ["t4"],
        vals: { ...valsOf(TWO_NODES), t3: 4 },
        links: { ...linksOf(TWO_NODES), t3: { left: "t2", right: null } },
      },
      6,
      "ลบใบ 4 เดิมทิ้ง  ·  ต้นยังเป็น BST: in-order = 2, 4, 5, 6, 7",
    ),
  );

  return steps;
}
