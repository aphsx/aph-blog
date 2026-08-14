"use client";

import { useMemo } from "react";
import { VizFrameView, useVizPlayback } from "@/components/viz/VizFrame";
import {
  MLS_CODE,
  MLS_NODES,
  MLS_ROOT,
  RSV_CODE,
  RSV_NODES,
  RSV_ROOT,
  buildLevelSumSteps,
  buildRightViewSteps,
  layoutTree,
  type TreeBfsStep,
  type TreeNodeDef,
} from "@/lib/viz/tree-bfs";

const W = 720;
const H = 310;
const R = 22;

const GOLD = "#F7B700";
const ORANGE = "#D55D00";
const TEAL = "#03A69B";
const BLUE = "#64b4ff";

function nodeFill(id: string, step: TreeBfsStep): string {
  if (step.current === id) return ORANGE;
  if (step.captured.includes(id) && step.current === null) return TEAL;
  if (step.done.includes(id)) return "#196860";
  if (step.queue.includes(id)) return "#324878";
  return "#2a3550";
}

function TreeAndQueue({
  nodes,
  root,
  step,
  kind,
}: {
  nodes: Record<string, TreeNodeDef>;
  root: string;
  step: TreeBfsStep;
  kind: "right-view" | "level-sum";
}) {
  const pos = useMemo(() => layoutTree(nodes, root, W, 36, 76, 168), [nodes, root]);
  const ids = Object.keys(nodes);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      {ids.map((id) => {
        const n = nodes[id];
        if (!n.left && !n.right) return null;
        const p = pos[id];
        return (
          <g key={`e-${id}`}>
            {n.left && (
              <line
                x1={p.x}
                y1={p.y + R}
                x2={pos[n.left].x}
                y2={pos[n.left].y - R}
                stroke="#5a6a88"
                strokeWidth={2}
              />
            )}
            {n.right && (
              <line
                x1={p.x}
                y1={p.y + R}
                x2={pos[n.right].x}
                y2={pos[n.right].y - R}
                stroke="#5a6a88"
                strokeWidth={2}
              />
            )}
          </g>
        );
      })}

      {ids.map((id) => {
        const { x, y } = pos[id];
        const n = nodes[id];
        const isCurr = step.current === id;
        const isCap = step.captured.includes(id);
        return (
          <g key={id}>
            {isCurr && (
              <circle cx={x} cy={y} r={R + 6} fill="none" stroke={GOLD} strokeWidth={3} />
            )}
            {isCap && !isCurr && (
              <circle cx={x} cy={y} r={R + 5} fill="none" stroke={TEAL} strokeWidth={2.5} />
            )}
            <circle
              cx={x}
              cy={y}
              r={R}
              fill={nodeFill(id, step)}
              stroke={isCurr ? GOLD : isCap ? TEAL : "#5a8fd8"}
              strokeWidth={2}
            />
            <text
              x={x}
              y={y + 6}
              textAnchor="middle"
              fill="#f5f5fa"
              fontSize={15}
              fontWeight={700}
            >
              {n.val}
            </text>
          </g>
        );
      })}

      {/* QUEUE row */}
      <text x={24} y={248} fill="#8a90a0" fontSize={11} fontWeight={700}>
        QUEUE (FIFO)
      </text>
      {step.queue.length === 0 ? (
        <text x={24} y={278} fill="#6a7080" fontSize={12}>
          empty
        </text>
      ) : (
        step.queue.map((id, i) => {
          const bx = 24 + i * 56;
          return (
            <g key={`q-${id}-${i}`}>
              <rect x={bx} y={256} width={48} height={32} rx={6} fill="#243c6e" stroke={BLUE} />
              <text
                x={bx + 24}
                y={277}
                textAnchor="middle"
                fill="#f5f5fa"
                fontSize={14}
                fontWeight={700}
              >
                {nodes[id].val}
              </text>
            </g>
          );
        })
      )}

      <text x={W - 16} y={248} textAnchor="end" fill="#8a90a0" fontSize={11} fontWeight={700}>
        {kind === "right-view"
          ? `result = [${step.result.join(", ")}]`
          : `best_level = ${step.bestLevel ?? "—"}   best_sum = ${
              step.bestSum === Number.NEGATIVE_INFINITY || step.bestSum === null
                ? "-inf"
                : step.bestSum
            }${step.total !== null ? `   total = ${step.total}` : ""}`}
      </text>
      {kind === "right-view" && (
        <text x={W - 16} y={278} textAnchor="end" fill={TEAL} fontSize={11} fontWeight={700}>
          วงแหวนเขียว = มองเห็นจากขวา
        </text>
      )}
      {kind === "level-sum" && step.captured.length > 0 && (
        <text x={W - 16} y={278} textAnchor="end" fill={TEAL} fontSize={11} fontWeight={700}>
          วงแหวนเขียว = ชั้นแชมป์ปัจจุบัน
        </text>
      )}
    </svg>
  );
}

export function RightSideViewViz() {
  const steps = useMemo(() => buildRightViewSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="BINARY TREE RIGHT SIDE VIEW"
      pills={[
        { label: "TIME  O(n)", color: "#3c78f0" },
        { label: "SPACE  O(w)", color: "#f05a96" },
      ]}
      message={step.msg}
      diagram={<TreeAndQueue nodes={RSV_NODES} root={RSV_ROOT} step={step} kind="right-view" />}
      lines={RSV_CODE}
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

export function MaxLevelSumViz() {
  const steps = useMemo(() => buildLevelSumSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="MAXIMUM LEVEL SUM"
      pills={[
        { label: "TIME  O(n)", color: "#3c78f0" },
        { label: "SPACE  O(w)", color: "#f05a96" },
      ]}
      message={step.msg}
      diagram={<TreeAndQueue nodes={MLS_NODES} root={MLS_ROOT} step={step} kind="level-sum" />}
      lines={MLS_CODE}
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

export default function TreeBfsViz({ kind }: { kind: "right-view" | "level-sum" }) {
  return kind === "right-view" ? <RightSideViewViz /> : <MaxLevelSumViz />;
}
