import { layoutTree, type TreeNodeDef } from "@/lib/viz/tree-bfs";

export type BstStep = {
  line: number;
  msg: string;
  current: string | null;
  path: string[];
  offside: string[];
  found: string | null;
  successor: string | null;
  hidden: string[];
  vals: Record<string, number>;
  links: Record<string, { left: string | null; right: string | null }>;
  ghost: string | null;
  error: string | null;
  inorder: number[];
};

export type BstFrame = Omit<BstStep, "line" | "msg">;

export const SEARCH_CODE = [
  "def searchBST(root, val):",
  "    node = root",
  "    while node:",
  "        if val == node.val:",
  "            return node",
  "        if val < node.val:",
  "            node = node.left",
  "        else:",
  "            node = node.right",
  "    return None",
];

export const DELETE_CODE = [
  "def deleteNode(root, key):",
  "    if not root: return None",
  "    if key < root.val:",
  "        root.left = deleteNode(root.left, key)",
  "    elif key > root.val:",
  "        root.right = deleteNode(root.right, key)",
  "    else:",
  "        if not root.left:  return root.right",
  "        if not root.right: return root.left",
  "        succ = root.right",
  "        while succ.left: succ = succ.left",
  "        root.val = succ.val",
  "        root.right = deleteNode(root.right, succ.val)",
  "    return root",
];

/** LC700: [4,2,7,1,3], val = 2 */
export const SEARCH_ROOT = "s4";
export const SEARCH_NODES: Record<string, TreeNodeDef> = {
  s4: { id: "s4", val: 4, left: "s2", right: "s7" },
  s2: { id: "s2", val: 2, left: "s1", right: "s3" },
  s7: { id: "s7", val: 7, left: null, right: null },
  s1: { id: "s1", val: 1, left: null, right: null },
  s3: { id: "s3", val: 3, left: null, right: null },
};

/** LC450: [5,3,6,2,4,null,7], key = 3 */
export const DELETE_ROOT = "d5";
export const DELETE_NODES: Record<string, TreeNodeDef> = {
  d5: { id: "d5", val: 5, left: "d3", right: "d6" },
  d3: { id: "d3", val: 3, left: "d2", right: "d4" },
  d6: { id: "d6", val: 6, left: null, right: "d7" },
  d2: { id: "d2", val: 2, left: null, right: null },
  d4: { id: "d4", val: 4, left: null, right: null },
  d7: { id: "d7", val: 7, left: null, right: null },
};

export { layoutTree };
export type { TreeNodeDef };

function subtreeIds(nodes: Record<string, TreeNodeDef>, id: string | null): string[] {
  if (!id) return [];
  const n = nodes[id];
  return [id, ...subtreeIds(nodes, n.left), ...subtreeIds(nodes, n.right)];
}

export function linksOf(nodes: Record<string, TreeNodeDef>): BstStep["links"] {
  const out: BstStep["links"] = {};
  for (const id of Object.keys(nodes)) {
    out[id] = { left: nodes[id].left, right: nodes[id].right };
  }
  return out;
}

export function valsOf(nodes: Record<string, TreeNodeDef>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const id of Object.keys(nodes)) out[id] = nodes[id].val;
  return out;
}

export function snap(
  base: Omit<BstStep, "line" | "msg">,
  line: number,
  msg: string,
): BstStep {
  return {
    ...base,
    ghost: base.ghost ?? null,
    error: base.error ?? null,
    inorder: [...(base.inorder ?? [])],
    path: [...base.path],
    offside: [...base.offside],
    hidden: [...base.hidden],
    vals: { ...base.vals },
    links: Object.fromEntries(
      Object.entries(base.links).map(([k, v]) => [k, { ...v }]),
    ),
    line,
    msg,
  };
}

export function buildSearchSteps(): BstStep[] {
  const nodes = SEARCH_NODES;
  const empty: Omit<BstStep, "line" | "msg"> = {
    current: null,
    path: [],
    offside: [],
    found: null,
    successor: null,
    hidden: [],
    vals: valsOf(nodes),
    links: linksOf(nodes),
    ghost: null,
    error: null,
    inorder: [],
  };
  const steps: BstStep[] = [];
  const st = { ...empty, path: [] as string[], offside: [] as string[] };

  steps.push(snap(st, 1, "Input: BST [4, 2, 7, 1, 3]  ·  หา val = 2"));
  st.current = SEARCH_ROOT;
  st.path = [SEARCH_ROOT];
  steps.push(snap(st, 2, "node = root  →  ยืนที่ 4"));
  steps.push(snap(st, 3, "while node:  4 ยังไม่เป็น None → เข้าลูป"));
  steps.push(snap(st, 4, "2 == 4 ? ไม่ใช่"));
  steps.push(snap(st, 6, "2 < 4  →  ค่าที่หาอยู่ฝั่งซ้าย · ฝั่งขวาทิ้งได้"));
  st.offside = subtreeIds(nodes, "s7");
  st.current = "s2";
  st.path = ["s4", "s2"];
  steps.push(snap(st, 7, "node = node.left  →  ยืนที่ 2"));
  steps.push(snap(st, 3, "while node:  2 ยังไม่เป็น None"));
  steps.push(snap(st, 4, "2 == 2 ? ใช่ — เจอแล้ว"));
  st.found = "s2";
  steps.push(snap(st, 5, "return node  →  คืน subtree ที่รากคือ 2 (ทั้งก้อน 2-1-3)"));
  return steps;
}

export function buildDeleteSteps(): BstStep[] {
  const nodes = DELETE_NODES;
  const st: Omit<BstStep, "line" | "msg"> = {
    current: null,
    path: [],
    offside: [],
    found: null,
    successor: null,
    hidden: [],
    vals: valsOf(nodes),
    links: linksOf(nodes),
    ghost: null,
    error: null,
    inorder: [],
  };
  const steps: BstStep[] = [];

  steps.push(snap(st, 1, "Input: BST [5, 3, 6, 2, 4, null, 7]  ·  ลบ key = 3"));
  st.current = "d5";
  st.path = ["d5"];
  steps.push(snap(st, 2, "root มีค่า  →  ยังไม่ใช่ต้นว่าง"));
  steps.push(snap(st, 3, "3 < 5  →  key อยู่ในฝั่งซ้าย"));
  st.current = "d3";
  st.path = ["d5", "d3"];
  steps.push(snap(st, 4, "ลงไปลบในฝั่งซ้ายของ 5 (จะเอาผลกลับมาต่อ root.left)"));
  steps.push(snap(st, 7, "เจอแล้ว: key == 3  ·  โหนดนี้มีลูกสองตัว (2 และ 4)"));
  steps.push(snap(st, 8, "มีลูกซ้าย  →  ยังคืนฝั่งขวาขึ้นมาแทนไม่ได้"));
  steps.push(snap(st, 9, "มีลูกขวา  →  กรณียาก: ห้ามลบตรง ๆ"));
  st.successor = "d4";
  steps.push(snap(st, 10, "succ = root.right  →  ก้าวขวาหนึ่งที ได้ 4"));
  steps.push(snap(st, 11, "4 ไม่มีลูกซ้าย  →  successor = 4 (ค่าน้อยสุดฝั่งขวา)"));
  st.vals = { ...st.vals, d3: 4 };
  steps.push(snap(st, 12, "root.val = succ.val  →  โหนดเดิมที่เคยเป็น 3 กลายเป็น 4"));
  st.hidden = ["d4"];
  st.links = {
    ...st.links,
    d3: { left: "d2", right: null },
  };
  st.successor = null;
  st.found = "d3";
  steps.push(snap(st, 13, "ลบ successor ตัวเดิม (4) ออกจากฝั่งขวา  →  ใบไม่มีลูก คืน None"));
  st.current = "d5";
  steps.push(snap(st, 14, "return root ขึ้นไป  →  ต้นยังเป็น BST: in-order = 2, 4, 5, 6, 7"));
  return steps;
}
