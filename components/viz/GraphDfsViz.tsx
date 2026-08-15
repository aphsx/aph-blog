"use client";

import { useMemo } from "react";
import { VizFrameView, VizStaticFrame, useVizPlayback } from "@/components/viz/VizFrame";
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

function AdjPanel({
  adj,
  highlight,
  justAdded,
}: {
  adj: Record<number, number[]>;
  highlight: number | null;
  justAdded: { node: number; value: number } | null;
}) {
  const keys = Object.keys(adj)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <g>
      <text x={480} y={28} fill={MUTED} fontSize={12} fontWeight={700} fontFamily={FONT}>
        graph (adjacency list)
      </text>
      {keys.length === 0 ? (
        <>
          <rect x={480} y={40} width={200} height={36} rx={6} fill="#121620" stroke="#2a3040" />
          <text x={492} y={64} fill={DIM} fontSize={13} fontFamily={FONT}>
            {"{}  ว่าง — ยังไม่มี key"}
          </text>
        </>
      ) : (
        keys.map((n, i) => {
          const y = 48 + i * 34;
          const on = highlight === n;
          const vals = adj[n];
          return (
            <g key={n}>
              <rect
                x={480}
                y={y - 14}
                width={200}
                height={28}
                rx={6}
                fill={on ? "#1a2838" : "#121620"}
                stroke={on ? TEAL : "#2a3040"}
                strokeWidth={on ? 2 : 1}
              />
              <text x={492} y={y + 5} fill={on ? TEAL : DIM} fontSize={13} fontFamily={FONT}>
                {n}: [
                {vals.map((v, vi) => {
                  const isNew =
                    justAdded && justAdded.node === n && justAdded.value === v && vi === vals.length - 1;
                  return (
                    <tspan key={`${n}-${vi}`} fill={isNew ? GOLD : on ? TEAL : "#dcdce6"}>
                      {vi > 0 ? ", " : ""}
                      {v}
                    </tspan>
                  );
                })}
                ]
              </text>
            </g>
          );
        })
      )}
    </g>
  );
}

function EdgesPanel({ edgeIdx }: { edgeIdx: number }) {
  return (
    <g>
      <text x={20} y={340} fill={MUTED} fontSize={11} fontWeight={700} fontFamily={FONT}>
        edges (แหล่งที่มาของคู่)
      </text>
      {ADJ_EDGES.map(([a, b], i) => {
        const x = 20 + i * 88;
        const on = i === edgeIdx;
        const past = edgeIdx >= 0 && i < edgeIdx;
        return (
          <g key={i}>
            <rect
              x={x}
              y={348}
              width={80}
              height={24}
              rx={5}
              fill={on ? "#2a3a28" : "#121620"}
              stroke={on ? GOLD : past ? TEAL : "#2a3040"}
              strokeWidth={on ? 2 : 1}
            />
            <text
              x={x + 40}
              y={365}
              textAnchor="middle"
              fill={on ? GOLD : past ? TEAL : DIM}
              fontSize={12}
              fontFamily={FONT}
            >
              ({a}, {b})
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

  const justAdded =
    step.writing === "forward" && step.edge
      ? { node: step.edge[0], value: step.edge[1] }
      : step.writing === "back" && step.edge
        ? { node: step.edge[1], value: step.edge[0] }
        : null;

  /** Only edges already written + the one being processed. */
  const visible: [number, number][] = [
    ...step.done,
    ...(step.edge && !step.done.some(([x, y]) => edgeKey(x, y) === edgeKey(step.edge![0], step.edge![1]))
      ? [step.edge]
      : []),
  ];

  /** Nodes that appear once they have a key or are on the current edge. */
  const shownNodes = new Set<number>([
    ...Object.keys(step.adj).map(Number),
    ...(step.edge ? step.edge : []),
  ]);

  return (
    <svg viewBox={`0 0 ${W} 380`} className="mx-auto block w-full max-w-[720px]">
      <GraphEdges edges={visible} pos={POS} active={step.edge} />
      {ADJ_NODES.map((n) => {
        const p = POS[n];
        const known = shownNodes.has(n);
        const inEdge = step.edge && (step.edge[0] === n || step.edge[1] === n);
        return (
          <GraphNode
            key={n}
            id={n}
            x={p.x}
            y={p.y}
            fill={!known ? "#0c0e16" : inEdge ? "#2a3a28" : "#1a1e2a"}
            stroke={!known ? "#2a3040" : inEdge ? TEAL : "#4a5060"}
            ring={highlight === n ? GOLD : undefined}
          />
        );
      })}
      <AdjPanel adj={step.adj} highlight={highlight} justAdded={justAdded} />
      <EdgesPanel edgeIdx={step.edgeIdx} />
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
        กองการเรียก
      </text>
      <rect x={480} y={210} width={200} height={36} rx={6} fill="#121620" stroke="#2a3040" />
      <text x={492} y={234} fill={GOLD} fontSize={13} fontFamily={FONT}>
        [{step.stack.join(" → ")}]
      </text>

      {/* Keep DFS_GRAPH referenced so layout stays tied to walk graph */}
      <text x={20} y={360} fill={DIM} fontSize={11} fontFamily={FONT}>
        graph เดียวกับส่วนที่ 3 · 0→[{DFS_GRAPH[0].join(",")}] · ลุยลึกก่อนถอย
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

/** Static overview of the undirected 5-node teaching graph (no playback). */
export function GraphOverviewViz() {
  const cycle = new Set(["0-1", "1-3", "2-3", "0-2"]);
  return (
    <VizStaticFrame
      title="GRAPH · ห้าโหนด ไม่มีทิศ — ใช้ภาพนี้ทั้งหน้า"
      pills={[
        { label: "node", color: TEAL },
        { label: "edge", color: "#4a5060" },
        { label: "cycle", color: GOLD },
      ]}
      caption="edges = [(0,1), (0,2), (1,3), (2,3), (3,4)] · เส้นทอง = วง 0-1-3-2-0 · โหนด 4 แขวนจาก 3"
      diagram={
        <svg viewBox="100 30 280 320" className="mx-auto w-full max-w-md" aria-hidden>
          {ADJ_EDGES.map(([a, b]) => {
            const pa = POS[a];
            const pb = POS[b];
            const key = edgeKey(a, b);
            const onCycle = cycle.has(key);
            return (
              <line
                key={key}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={onCycle ? GOLD : "#4a5060"}
                strokeWidth={onCycle ? 3.5 : 2.5}
              />
            );
          })}
          {ADJ_NODES.map((id) => (
            <GraphNode
              key={id}
              id={id}
              x={POS[id].x}
              y={POS[id].y}
              fill="#1a2838"
              stroke={TEAL}
            />
          ))}
        </svg>
      }
    />
  );
}

function DirNode({
  x,
  y,
  label,
  color,
}: {
  x: number;
  y: number;
  label: string;
  color: string;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={22} fill="#1a2838" stroke={color} strokeWidth={2.5} />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill="#f5f5fa"
        fontSize={16}
        fontWeight={800}
        fontFamily={FONT}
      >
        {label}
      </text>
    </g>
  );
}

/** Static: two disconnected clumps before the components walkthrough. */
export function GraphTwoComponentsViz() {
  const left = new Set([0, 1, 2]);
  return (
    <VizStaticFrame
      title="สองก้อนที่ไม่เชื่อมกัน"
      pills={[
        { label: "ก้อน 1 · 0-1-2", color: "#6565d5" },
        { label: "ก้อน 2 · 3-4", color: TEAL },
      ]}
      caption="edges = [(0,1), (0,2), (3,4)] · dfs(0) แตะได้แค่ก้อนซ้าย 0-1-2 · ก้อนขวา 3-4 ต้องเริ่ม dfs ใหม่จาก 3"
      diagram={
        <svg viewBox="60 40 540 220" className="w-full" aria-hidden>
          {COMP_EDGES.map(([a, b]) => {
            const pa = COMP_POS[a];
            const pb = COMP_POS[b];
            return (
              <line
                key={edgeKey(a, b)}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke="#4a5060"
                strokeWidth={2.5}
              />
            );
          })}
          {COMP_NODES.map((id) => (
            <GraphNode
              key={id}
              id={id}
              x={COMP_POS[id].x}
              y={COMP_POS[id].y}
              fill="#1a2838"
              stroke={left.has(id) ? "#6565d5" : TEAL}
            />
          ))}
        </svg>
      }
    />
  );
}

/** Static: undirected vs directed edge — one picture, two panels. */
export function GraphDirectedViz() {
  return (
    <VizStaticFrame
      title="ไม่มีทิศ vs มีทิศ"
      pills={[
        { label: "undirected", color: TEAL },
        { label: "directed", color: ORANGE },
      ]}
      caption="ซ้ายเดินได้สองทาง · ขวาเดินได้ทางเดียวตามหัวลูกศร"
      diagram={
        <svg viewBox="0 0 720 200" className="w-full" aria-hidden>
          <defs>
            <marker
              id="graph-dir-arrow"
              viewBox="0 0 10 10"
              refX={9}
              refY={5}
              markerWidth={7}
              markerHeight={7}
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={ORANGE} />
            </marker>
          </defs>

          <text x={180} y={28} textAnchor="middle" fill={TEAL} fontSize={13} fontWeight={700} fontFamily={FONT}>
            undirected · A — B
          </text>
          <line x1={110} y1={100} x2={250} y2={100} stroke={TEAL} strokeWidth={3.5} />
          <DirNode x={110} y={100} label="A" color={TEAL} />
          <DirNode x={250} y={100} label="B" color={TEAL} />
          <text x={180} y={160} textAnchor="middle" fill={MUTED} fontSize={12} fontFamily={FONT}>
            เก็บ A→B และ B→A
          </text>

          <line x1={360} y1={40} x2={360} y2={170} stroke="#2a3040" strokeWidth={1} />

          <text x={540} y={28} textAnchor="middle" fill={ORANGE} fontSize={13} fontWeight={700} fontFamily={FONT}>
            directed · A → B
          </text>
          <line
            x1={492}
            y1={100}
            x2={588}
            y2={100}
            stroke={ORANGE}
            strokeWidth={3.5}
            markerEnd="url(#graph-dir-arrow)"
          />
          <DirNode x={470} y={100} label="A" color={ORANGE} />
          <DirNode x={610} y={100} label="B" color={ORANGE} />
          <text x={540} y={160} textAnchor="middle" fill={MUTED} fontSize={12} fontFamily={FONT}>
            เก็บ A→B อย่างเดียว
          </text>
        </svg>
      }
    />
  );
}
