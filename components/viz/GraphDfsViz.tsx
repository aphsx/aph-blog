"use client";

import { useMemo } from "react";
import { VizFrameView, useVizPlayback } from "@/components/viz/VizFrame";
import {
  ADJ_CODE,
  ADJ_EDGES,
  ADJ_NODES,
  COMP_CODE,
  COMP_EDGES,
  COMP_NODES,
  DFS_CODE,
  DFS_GRAPH,
  buildAdjBuildSteps,
  buildComponentsSteps,
  buildDfsWalkSteps,
  type AdjBuildStep,
  type ComponentsStep,
  type DfsWalkStep,
} from "@/lib/viz/graph-dfs";

const W = 720;
const GOLD = "#F7B700";
const ORANGE = "#D55D00";
const TEAL = "#03A69B";
const BLUE = "#64b4ff";
const MUTED = "#8a90a0";
const DIM = "#6a7080";
const FONT = "ui-monospace, SFMono-Regular, Menlo, monospace";

const COMP_COLORS = ["#6565d5", "#03A69B", "#D55D00"];

/** Layout for the 5-node teaching graph. */
const POS: Record<number, { x: number; y: number }> = {
  0: { x: 160, y: 70 },
  1: { x: 320, y: 70 },
  2: { x: 160, y: 190 },
  3: { x: 320, y: 190 },
  4: { x: 320, y: 310 },
};

/** Layout for two disconnected clumps. */
const COMP_POS: Record<number, { x: number; y: number }> = {
  0: { x: 120, y: 80 },
  1: { x: 240, y: 80 },
  2: { x: 180, y: 200 },
  3: { x: 420, y: 100 },
  4: { x: 540, y: 100 },
};

function edgeKey(a: number, b: number) {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

function GraphEdges({
  edges,
  pos,
  active,
  dim,
}: {
  edges: [number, number][];
  pos: Record<number, { x: number; y: number }>;
  active: [number, number] | null;
  dim?: Set<string>;
}) {
  return (
    <>
      {edges.map(([a, b]) => {
        const pa = pos[a];
        const pb = pos[b];
        const isActive =
          active !== null &&
          ((active[0] === a && active[1] === b) || (active[0] === b && active[1] === a));
        const faded = dim?.has(edgeKey(a, b));
        return (
          <line
            key={edgeKey(a, b)}
            x1={pa.x}
            y1={pa.y}
            x2={pb.x}
            y2={pb.y}
            stroke={isActive ? GOLD : faded ? "#2a3040" : "#4a5060"}
            strokeWidth={isActive ? 4 : 2.5}
          />
        );
      })}
    </>
  );
}

function GraphNode({
  id,
  x,
  y,
  fill,
  stroke,
  ring,
  label,
}: {
  id: number;
  x: number;
  y: number;
  fill: string;
  stroke: string;
  ring?: string;
  label?: string;
}) {
  return (
    <g>
      {ring && (
        <circle cx={x} cy={y} r={28} fill="none" stroke={ring} strokeWidth={3} />
      )}
      <circle cx={x} cy={y} r={22} fill={fill} stroke={stroke} strokeWidth={2.5} />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill="#f5f5fa"
        fontSize={16}
        fontWeight={800}
        fontFamily={FONT}
      >
        {id}
      </text>
      {label && (
        <text
          x={x}
          y={y + 40}
          textAnchor="middle"
          fill={MUTED}
          fontSize={11}
          fontFamily={FONT}
        >
          {label}
        </text>
      )}
    </g>
  );
}

function AdjPanel({ adj, highlight }: { adj: Record<number, number[]>; highlight: number | null }) {
  return (
    <g>
      <text x={480} y={36} fill={MUTED} fontSize={12} fontWeight={700} fontFamily={FONT}>
        adjacency list
      </text>
      {ADJ_NODES.map((n, i) => {
        const y = 58 + i * 36;
        const on = highlight === n;
        return (
          <g key={n}>
            <rect
              x={480}
              y={y - 16}
              width={200}
              height={30}
              rx={6}
              fill={on ? "#1a2838" : "#121620"}
              stroke={on ? TEAL : "#2a3040"}
              strokeWidth={on ? 2 : 1}
            />
            <text x={492} y={y + 4} fill={on ? TEAL : DIM} fontSize={13} fontFamily={FONT}>
              {n}: [{adj[n].join(", ")}]
            </text>
          </g>
        );
      })}
    </g>
  );
}

function AdjDiagram({ step }: { step: AdjBuildStep }) {
  const highlight =
    step.writing === "forward" && step.edge
      ? step.edge[0]
      : step.writing === "back" && step.edge
        ? step.edge[1]
        : null;

  return (
    <svg viewBox={`0 0 ${W} 360`} className="mx-auto block w-full max-w-[720px]">
      <GraphEdges edges={ADJ_EDGES} pos={POS} active={step.edge} />
      {ADJ_NODES.map((n) => {
        const p = POS[n];
        const inEdge = step.edge && (step.edge[0] === n || step.edge[1] === n);
        return (
          <GraphNode
            key={n}
            id={n}
            x={p.x}
            y={p.y}
            fill={inEdge ? "#2a3a28" : "#1a1e2a"}
            stroke={inEdge ? TEAL : "#4a5060"}
            ring={highlight === n ? GOLD : undefined}
          />
        );
      })}
      <AdjPanel adj={step.adj} highlight={highlight} />
    </svg>
  );
}

function DfsDiagram({ step }: { step: DfsWalkStep }) {
  const visited = new Set(step.visited);
  return (
    <svg viewBox={`0 0 ${W} 380`} className="mx-auto block w-full max-w-[720px]">
      <GraphEdges edges={ADJ_EDGES} pos={POS} active={step.edge} />
      {ADJ_NODES.map((n) => {
        const p = POS[n];
        const isCurr = step.current === n;
        const isVis = visited.has(n);
        const isSkip = step.skipped === n;
        let fill = "#1a1e2a";
        let stroke = "#4a5060";
        if (isVis) {
          fill = "#1a2838";
          stroke = TEAL;
        }
        if (isCurr) {
          fill = "#2a3a28";
          stroke = GOLD;
        }
        if (isSkip) {
          stroke = ORANGE;
        }
        return (
          <GraphNode
            key={n}
            id={n}
            x={p.x}
            y={p.y}
            fill={fill}
            stroke={stroke}
            ring={isCurr ? GOLD : undefined}
          />
        );
      })}

      <text x={480} y={40} fill={MUTED} fontSize={12} fontWeight={700} fontFamily={FONT}>
        visited
      </text>
      <rect x={480} y={50} width={200} height={36} rx={6} fill="#121620" stroke="#2a3040" />
      <text x={492} y={74} fill={TEAL} fontSize={13} fontFamily={FONT}>
        {"{" + step.visited.join(", ") + "}"}
      </text>

      <text x={480} y={120} fill={MUTED} fontSize={12} fontWeight={700} fontFamily={FONT}>
        order (mark)
      </text>
      <rect x={480} y={130} width={200} height={36} rx={6} fill="#121620" stroke="#2a3040" />
      <text x={492} y={154} fill={BLUE} fontSize={13} fontFamily={FONT}>
        [{step.order.join(", ")}]
      </text>

      <text x={480} y={200} fill={MUTED} fontSize={12} fontWeight={700} fontFamily={FONT}>
        call stack
      </text>
      <rect x={480} y={210} width={200} height={36} rx={6} fill="#121620" stroke="#2a3040" />
      <text x={492} y={234} fill={GOLD} fontSize={13} fontFamily={FONT}>
        [{step.stack.join(" → ")}]
      </text>

      {/* Keep DFS_GRAPH referenced so layout stays tied to walk graph */}
      <text x={20} y={360} fill={DIM} fontSize={11} fontFamily={FONT}>
        neighbors: 0→[{DFS_GRAPH[0].join(",")}] · ลุยลึกก่อนถอย
      </text>
    </svg>
  );
}

function ComponentsDiagram({ step }: { step: ComponentsStep }) {
  return (
    <svg viewBox={`0 0 ${W} 280`} className="mx-auto block w-full max-w-[720px]">
      <GraphEdges edges={COMP_EDGES} pos={COMP_POS} active={step.edge} />
      {COMP_NODES.map((n) => {
        const p = COMP_POS[n];
        const comp = step.compOf[n];
        const isCurr = step.current === n;
        const isScan = step.scan === n;
        const color = comp > 0 ? COMP_COLORS[(comp - 1) % COMP_COLORS.length] : "#4a5060";
        return (
          <GraphNode
            key={n}
            id={n}
            x={p.x}
            y={p.y}
            fill={comp > 0 ? "#1a1e2a" : "#121620"}
            stroke={isCurr || isScan ? GOLD : color}
            ring={isCurr || isScan ? GOLD : undefined}
            label={comp > 0 ? `ก้อน ${comp}` : undefined}
          />
        );
      })}
      <text x={480} y={50} fill={MUTED} fontSize={12} fontWeight={700} fontFamily={FONT}>
        count
      </text>
      <text x={480} y={88} fill={GOLD} fontSize={36} fontWeight={800} fontFamily={FONT}>
        {step.count}
      </text>
      <text x={480} y={130} fill={DIM} fontSize={12} fontFamily={FONT}>
        visited: {"{" + step.visited.join(", ") + "}"}
      </text>
    </svg>
  );
}

export function GraphAdjBuildViz() {
  const steps = useMemo(() => buildAdjBuildSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="GRAPH · สร้าง adjacency list"
      pills={[
        { label: "UNDIRECTED", color: TEAL },
        { label: "dict → list", color: BLUE },
      ]}
      message={step.msg}
      diagram={<AdjDiagram step={step} />}
      lines={ADJ_CODE}
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

export function GraphDfsWalkViz() {
  const steps = useMemo(() => buildDfsWalkSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="GRAPH DFS · ลุยลึก + visited"
      pills={[
        { label: "DFS", color: GOLD },
        { label: "visited", color: TEAL },
      ]}
      message={step.msg}
      diagram={<DfsDiagram step={step} />}
      lines={DFS_CODE}
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

export function GraphComponentsViz() {
  const steps = useMemo(() => buildComponentsSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="GRAPH · ก้อนที่ไม่เชื่อมกัน"
      pills={[
        { label: "outer loop", color: ORANGE },
        { label: "DFS กวาดก้อน", color: TEAL },
      ]}
      message={step.msg}
      diagram={<ComponentsDiagram step={step} />}
      lines={COMP_CODE}
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
