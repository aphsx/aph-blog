"use client";

import { useMemo } from "react";
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
  type BstStep,
  type TreeNodeDef,
} from "@/lib/viz/bst";

const W = 720;
const H = 300;
const R = 22;
const GOLD = "#F7B700";
const ORANGE = "#D55D00";
const TEAL = "#03A69B";

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

function BstTree({
  base,
  root,
  step,
}: {
  base: Record<string, TreeNodeDef>;
  root: string;
  step: BstStep;
}) {
  const pos = useMemo(() => layoutTree(base, root, W, 52, 78, 160), [base, root]);
  const ids = Object.keys(base).filter((id) => !step.hidden.includes(id));

  const fill = (id: string) => {
    if (step.found === id) return TEAL;
    if (step.current === id) return ORANGE;
    if (step.successor === id) return "#5ce698";
    if (step.offside.includes(id)) return "#1a2030";
    if (step.path.includes(id)) return "#196860";
    return "#2a3550";
  };

  const stroke = (id: string) => {
    if (step.found === id || step.successor === id) return TEAL;
    if (step.current === id) return GOLD;
    if (step.offside.includes(id)) return "#3a4458";
    return "#5a8fd8";
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      {ids.map((id) => {
        const L = step.links[id]?.left;
        const Rgt = step.links[id]?.right;
        const p = pos[id];
        return (
          <g key={`e-${id}`}>
            {L && !step.hidden.includes(L) && pos[L] && (
              <line
                x1={p.x}
                y1={p.y + R}
                x2={pos[L].x}
                y2={pos[L].y - R}
                stroke="#5a6a88"
                strokeWidth={2}
              />
            )}
            {Rgt && !step.hidden.includes(Rgt) && pos[Rgt] && (
              <line
                x1={p.x}
                y1={p.y + R}
                x2={pos[Rgt].x}
                y2={pos[Rgt].y - R}
                stroke="#5a6a88"
                strokeWidth={2}
              />
            )}
          </g>
        );
      })}

      {ids.map((id) => {
        const { x, y } = pos[id];
        const isCurr = step.current === id;
        const isSucc = step.successor === id;
        const isFound = step.found === id;
        const dim = step.offside.includes(id);
        const shareCurrSucc = isCurr && isSucc;
        return (
          <g key={id} opacity={dim ? 0.35 : 1}>
            {isCurr && (
              <circle cx={x} cy={y} r={R + 6} fill="none" stroke={GOLD} strokeWidth={3} />
            )}
            <circle cx={x} cy={y} r={R} fill={fill(id)} stroke={stroke(id)} strokeWidth={2} />
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
            {isCurr && !shareCurrSucc && (
              <Label x={x} y={y - R - 12} text="node" color={GOLD} />
            )}
            {isSucc && (
              <Label
                x={x}
                y={shareCurrSucc ? y + R + 18 : y - R - 12}
                text="succ"
                color={TEAL}
              />
            )}
            {isFound && !isCurr && (
              <Label x={x} y={y + R + 18} text="found" color={TEAL} />
            )}
            {isFound && isCurr && (
              <Label x={x} y={y + R + 18} text="return" color={TEAL} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function SearchBstViz() {
  const steps = useMemo(() => buildSearchSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="SEARCH IN A BST"
      pills={[
        { label: "TIME  O(h)", color: "#3c78f0" },
        { label: "SPACE  O(1)", color: "#f05a96" },
      ]}
      message={step.msg}
      diagram={<BstTree base={SEARCH_NODES} root={SEARCH_ROOT} step={step} />}
      lines={SEARCH_CODE}
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

export function DeleteBstViz() {
  const steps = useMemo(() => buildDeleteSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="DELETE NODE IN A BST"
      pills={[
        { label: "TIME  O(h)", color: "#3c78f0" },
        { label: "SPACE  O(h)", color: "#f05a96" },
      ]}
      message={step.msg}
      diagram={<BstTree base={DELETE_NODES} root={DELETE_ROOT} step={step} />}
      lines={DELETE_CODE}
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
