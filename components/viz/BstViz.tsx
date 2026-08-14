"use client";

import { useMemo, type ReactNode } from "react";
import { VizFrameView, useVizPlayback } from "@/components/viz/VizFrame";
import {
  DELETE_CODE,
  DELETE_NODES,
  DELETE_ROOT,
  SEARCH_CODE,
  SEARCH_NODES,
  SEARCH_ROOT,
  buildDeleteSteps,
  buildSearchSteps,
  layoutTree,
  type BstFrame,
  type BstStep,
  type TreeNodeDef,
} from "@/lib/viz/bst";
import {
  BAL_NODES,
  BAL_ROOT,
  CASES_CODE,
  CASES_MAP,
  GROW_CODE,
  GROW_NODES,
  GROW_ROOT,
  HEIGHT_CODE,
  RULE_BAD,
  RULE_BAD_ROOT,
  RULE_CODE,
  RULE_OK,
  RULE_OK_ROOT,
  SKEW_NODES,
  SKEW_ROOT,
  buildCasesSteps,
  buildGrowSteps,
  buildHeightSteps,
  buildRuleSteps,
} from "@/lib/viz/bst-intro";

const W = 720;
const H = 300;
const R = 22;
const GOLD = "#F7B700";
const ORANGE = "#D55D00";
const TEAL = "#03A69B";
const RED = "#e85d5d";

function Label({
  x,
  y,
  text,
  color,
}: {
  x: number;
  y: number;
  text: string;
  color: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill={color}
      fontSize={11}
      fontWeight={700}
      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
    >
      {text}
    </text>
  );
}

function TreeLayer({
  base,
  root,
  step,
  originX = 0,
  boxW = W,
  top = 52,
  levelH = 78,
  span = 160,
  r = R,
  showLabels = true,
}: {
  base: Record<string, TreeNodeDef>;
  root: string;
  step: BstFrame;
  originX?: number;
  boxW?: number;
  top?: number;
  levelH?: number;
  span?: number;
  r?: number;
  showLabels?: boolean;
}) {
  const pos = useMemo(() => {
    const raw = layoutTree(base, root, boxW, top, levelH, span);
    const out: Record<string, { x: number; y: number }> = {};
    for (const id of Object.keys(raw)) {
      out[id] = { x: raw[id].x + originX, y: raw[id].y };
    }
    return out;
  }, [base, root, boxW, top, levelH, span, originX]);

  const ids = Object.keys(base).filter((id) => !step.hidden.includes(id));

  const fill = (id: string) => {
    if (step.error === id) return "#8a2a2a";
    if (step.found === id) return TEAL;
    if (step.current === id) return ORANGE;
    if (step.successor === id) return "#5ce698";
    if (step.offside.includes(id)) return "#1a2030";
    if (step.path.includes(id)) return "#196860";
    return "#2a3550";
  };

  const stroke = (id: string) => {
    if (step.error === id) return RED;
    if (step.found === id || step.successor === id) return TEAL;
    if (step.current === id) return GOLD;
    if (step.offside.includes(id)) return "#3a4458";
    return "#5a8fd8";
  };

  const ghost = step.ghost && pos[step.ghost] ? pos[step.ghost] : null;
  const empty = ids.length === 0 && !ghost;

  return (
    <g>
      {empty && (
        <text
          x={originX + boxW / 2}
          y={top + 24}
          textAnchor="middle"
          fill="#6a7080"
          fontSize={16}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          ∅
        </text>
      )}
      {ids.map((id) => {
        const L = step.links[id]?.left;
        const Rgt = step.links[id]?.right;
        const p = pos[id];
        if (!p) return null;
        return (
          <g key={`e-${id}`}>
            {L && !step.hidden.includes(L) && pos[L] && (
              <line
                x1={p.x}
                y1={p.y + r}
                x2={pos[L].x}
                y2={pos[L].y - r}
                stroke="#5a6a88"
                strokeWidth={2}
              />
            )}
            {Rgt && !step.hidden.includes(Rgt) && pos[Rgt] && (
              <line
                x1={p.x}
                y1={p.y + r}
                x2={pos[Rgt].x}
                y2={pos[Rgt].y - r}
                stroke="#5a6a88"
                strokeWidth={2}
              />
            )}
          </g>
        );
      })}

      {ghost && (
        <g>
          <circle
            cx={ghost.x}
            cy={ghost.y}
            r={r}
            fill="none"
            stroke={GOLD}
            strokeWidth={2}
            strokeDasharray="5 4"
          />
          {showLabels && <Label x={ghost.x} y={ghost.y - r - 12} text="new" color={GOLD} />}
        </g>
      )}

      {ids.map((id) => {
        const p = pos[id];
        if (!p) return null;
        const { x, y } = p;
        const isCurr = step.current === id;
        const isSucc = step.successor === id;
        const isFound = step.found === id;
        const isErr = step.error === id;
        const dim = step.offside.includes(id) && !isErr;
        const shareCurrSucc = isCurr && isSucc;
        return (
          <g key={id} opacity={dim ? 0.35 : 1}>
            {isCurr && (
              <circle cx={x} cy={y} r={r + 6} fill="none" stroke={GOLD} strokeWidth={3} />
            )}
            {isErr && (
              <circle cx={x} cy={y} r={r + 6} fill="none" stroke={RED} strokeWidth={3} />
            )}
            <circle cx={x} cy={y} r={r} fill={fill(id)} stroke={stroke(id)} strokeWidth={2} />
            <text
              x={x}
              y={y + 6}
              textAnchor="middle"
              fill={dim ? "#8a90a0" : "#f5f5fa"}
              fontSize={15}
              fontWeight={700}
            >
              {step.vals[id]}
            </text>
            {showLabels && isCurr && !shareCurrSucc && (
              <Label x={x} y={y - r - 12} text="node" color={GOLD} />
            )}
            {showLabels && isSucc && (
              <Label
                x={x}
                y={shareCurrSucc ? y + r + 18 : y - r - 12}
                text="succ"
                color={TEAL}
              />
            )}
            {showLabels && isFound && isCurr && (
              <Label x={x} y={y + r + 18} text="return" color={TEAL} />
            )}
            {showLabels && isErr && (
              <Label x={x} y={y + r + 18} text="ผิด" color={RED} />
            )}
          </g>
        );
      })}
    </g>
  );
}

function BstTree({
  base,
  root,
  step,
  height = H,
  inorder,
}: {
  base: Record<string, TreeNodeDef>;
  root: string;
  step: BstFrame;
  height?: number;
  inorder?: boolean;
}) {
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="w-full" aria-hidden>
      <TreeLayer base={base} root={root} step={step} />
      {inorder && (
        <text
          x={W / 2}
          y={height - 10}
          textAnchor="middle"
          fill="#8cffb8"
          fontSize={13}
          fontWeight={700}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          {`in-order = [${step.inorder.join(", ")}]`}
        </text>
      )}
    </svg>
  );
}

function DualBst({
  leftBase,
  leftRoot,
  leftStep,
  leftCaption,
  rightBase,
  rightRoot,
  rightStep,
  rightCaption,
  span = 78,
  levelH = 70,
}: {
  leftBase: Record<string, TreeNodeDef>;
  leftRoot: string;
  leftStep: BstFrame;
  leftCaption: string;
  rightBase: Record<string, TreeNodeDef>;
  rightRoot: string;
  rightStep: BstFrame;
  rightCaption: string;
  span?: number;
  levelH?: number;
}) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      <text x={180} y={18} textAnchor="middle" fill="#dcdce6" fontSize={12} fontWeight={700}>
        {leftCaption}
      </text>
      <text x={540} y={18} textAnchor="middle" fill="#dcdce6" fontSize={12} fontWeight={700}>
        {rightCaption}
      </text>
      <line x1={360} y1={8} x2={360} y2={H - 8} stroke="#2a3040" strokeWidth={1} />
      <TreeLayer
        base={leftBase}
        root={leftRoot}
        step={leftStep}
        boxW={360}
        originX={0}
        top={48}
        levelH={levelH}
        span={span}
        r={20}
      />
      <TreeLayer
        base={rightBase}
        root={rightRoot}
        step={rightStep}
        boxW={360}
        originX={360}
        top={48}
        levelH={levelH}
        span={span}
        r={20}
      />
    </svg>
  );
}

function Player({
  title,
  pills,
  lines,
  steps,
  diagram,
}: {
  title: string;
  pills: { label: string; color: string }[];
  lines: string[];
  steps: BstStep[];
  diagram: (step: BstStep) => ReactNode;
}) {
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title={title}
      pills={pills}
      message={step.msg}
      diagram={diagram(step)}
      lines={lines}
      line={step.line}
      idx={play.idx}
      stepCount={steps.length}
      playing={play.playing}
      atStart={play.atStart}
      onReset={play.reset}
      onPrev={play.prev}
      onNext={play.next}
      onToggle={play.toggle}
    />
  );
}

export function SearchBstViz() {
  const steps = useMemo(() => buildSearchSteps(), []);
  return (
    <Player
      title="SEARCH IN A BST"
      pills={[
        { label: "TIME  O(h)", color: "#3c78f0" },
        { label: "SPACE  O(1)", color: "#f05a96" },
      ]}
      lines={SEARCH_CODE}
      steps={steps}
      diagram={(step) => <BstTree base={SEARCH_NODES} root={SEARCH_ROOT} step={step} />}
    />
  );
}

export function DeleteBstViz() {
  const steps = useMemo(() => buildDeleteSteps(), []);
  return (
    <Player
      title="DELETE NODE IN A BST"
      pills={[
        { label: "TIME  O(h)", color: "#3c78f0" },
        { label: "SPACE  O(h)", color: "#f05a96" },
      ]}
      lines={DELETE_CODE}
      steps={steps}
      diagram={(step) => <BstTree base={DELETE_NODES} root={DELETE_ROOT} step={step} />}
    />
  );
}

export function GrowBstViz() {
  const steps = useMemo(() => buildGrowSteps(), []);
  return (
    <Player
      title="ปลูก BST · INSERT แล้ว IN-ORDER"
      pills={[
        { label: "INSERT  O(h)", color: "#3c78f0" },
        { label: "IN-ORDER = SORTED", color: "#03A69B" },
      ]}
      lines={GROW_CODE}
      steps={steps}
      diagram={(step) => (
        <BstTree base={GROW_NODES} root={GROW_ROOT} step={step} height={318} inorder />
      )}
    />
  );
}

export function RuleBstViz() {
  const steps = useMemo(() => buildRuleSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="กฎเหล็ก · เช็กทั้งก้อน ไม่ใช่แค่ลูกชั้นเดียว"
      pills={[
        { label: "PROPERTY", color: "#3c78f0" },
        { label: "กับดักชั้นแม่", color: "#c4453c" },
      ]}
      message={step.msg}
      diagram={
        <DualBst
          leftBase={RULE_OK}
          leftRoot={RULE_OK_ROOT}
          leftStep={step.left}
          leftCaption={step.leftCaption}
          rightBase={RULE_BAD}
          rightRoot={RULE_BAD_ROOT}
          rightStep={step.right}
          rightCaption={step.rightCaption}
          span={88}
        />
      }
      lines={RULE_CODE}
      line={step.line}
      idx={play.idx}
      stepCount={steps.length}
      playing={play.playing}
      atStart={play.atStart}
      onReset={play.reset}
      onPrev={play.prev}
      onNext={play.next}
      onToggle={play.toggle}
    />
  );
}

export function HeightBstViz() {
  const steps = useMemo(() => buildHeightSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="ความสูงกำหนดความเร็ว · O(log n) vs O(n)"
      pills={[
        { label: "สมดุล  O(log n)", color: "#03A69B" },
        { label: "เอียง  O(n)", color: "#c4453c" },
      ]}
      message={step.msg}
      diagram={
        <DualBst
          leftBase={BAL_NODES}
          leftRoot={BAL_ROOT}
          leftStep={step.left}
          leftCaption={step.leftCaption}
          rightBase={SKEW_NODES}
          rightRoot={SKEW_ROOT}
          rightStep={step.right}
          rightCaption={step.rightCaption}
          span={70}
          levelH={62}
        />
      }
      lines={HEIGHT_CODE}
      line={step.line}
      idx={play.idx}
      stepCount={steps.length}
      playing={play.playing}
      atStart={play.atStart}
      onReset={play.reset}
      onPrev={play.prev}
      onNext={play.next}
      onToggle={play.toggle}
    />
  );
}

export function CasesBstViz() {
  const steps = useMemo(() => buildCasesSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  const { nodes, root } = CASES_MAP[step.scene];
  return (
    <VizFrameView
      title="DELETE · สามกรณี"
      pills={[
        { label: "A ใบ", color: "#3c78f0" },
        { label: "B ลูกเดียว", color: "#6565d5" },
        { label: "C ลูกสองตัว", color: "#03A69B" },
      ]}
      message={step.msg}
      diagram={<BstTree base={nodes} root={root} step={step} />}
      lines={CASES_CODE}
      line={step.line}
      idx={play.idx}
      stepCount={steps.length}
      playing={play.playing}
      atStart={play.atStart}
      onReset={play.reset}
      onPrev={play.prev}
      onNext={play.next}
      onToggle={play.toggle}
    />
  );
}
