"use client";

import { useMemo } from "react";
import { VizFrameView, VizStaticFrame, useVizPlayback } from "@/components/viz/VizFrame";
import {
  ADJ_EDGES,
  ADJ_NODES,
  BFS_CODE,
  DFS_GRAPH,
  GRID,
  GRID_CODE,
  GRID_COLS,
  GRID_ROWS,
  MULTI_CODE,
  MULTI_EDGES,
  MULTI_NODES,
  buildGraphBfsWalkSteps,
  buildGridBfsSteps,
  buildMultiSourceSteps,
  type BfsWalkStep,
  type GridBfsStep,
  type MultiBfsStep,
} from "@/lib/viz/graph-bfs";

const W = 720;
const GOLD = "#F7B700";
const ORANGE = "#D55D00";
const TEAL = "#03A69B";
const BLUE = "#64b4ff";
const MUTED = "#8a90a0";
const DIM = "#6a7080";
const FONT = "ui-monospace, SFMono-Regular, Menlo, monospace";

/** Same layout as Graphs — DFS teaching graph. */
const POS: Record<number, { x: number; y: number }> = {
  0: { x: 160, y: 70 },
  1: { x: 320, y: 70 },
  2: { x: 160, y: 190 },
  3: { x: 320, y: 190 },
  4: { x: 320, y: 310 },
};

const MULTI_POS: Record<number, { x: number; y: number }> = {
  0: { x: 80, y: 140 },
  1: { x: 200, y: 140 },
  2: { x: 320, y: 140 },
  3: { x: 440, y: 140 },
  4: { x: 560, y: 140 },
};

function edgeKey(a: number, b: number) {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

function GraphEdges({
  edges,
  pos,
  active,
}: {
  edges: [number, number][];
  pos: Record<number, { x: number; y: number }>;
  active: [number, number] | null;
}) {
  return (
    <>
      {edges.map(([a, b]) => {
        const pa = pos[a];
        const pb = pos[b];
        const isActive =
          active !== null &&
          ((active[0] === a && active[1] === b) || (active[0] === b && active[1] === a));
        return (
          <line
            key={edgeKey(a, b)}
            x1={pa.x}
            y1={pa.y}
            x2={pb.x}
            y2={pb.y}
            stroke={isActive ? GOLD : "#4a5060"}
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
  sub,
}: {
  id: number;
  x: number;
  y: number;
  fill: string;
  stroke: string;
  ring?: string;
  sub?: string;
}) {
  return (
    <g>
      {ring && <circle cx={x} cy={y} r={28} fill="none" stroke={ring} strokeWidth={3} />}
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
      {sub && (
        <text x={x} y={y + 40} textAnchor="middle" fill={MUTED} fontSize={11} fontFamily={FONT}>
          {sub}
        </text>
      )}
    </g>
  );
}

function QueueRow({
  items,
  y,
  label,
}: {
  items: string[];
  y: number;
  label: string;
}) {
  return (
    <g>
      <text x={24} y={y} fill={MUTED} fontSize={11} fontWeight={700} fontFamily={FONT}>
        {label}
      </text>
      {items.length === 0 ? (
        <>
          <rect x={24} y={y + 8} width={120} height={28} rx={6} fill="#121620" stroke="#2a3040" />
          <text x={36} y={y + 27} fill={DIM} fontSize={12} fontFamily={FONT}>
            ว่าง []
          </text>
        </>
      ) : (
        items.map((t, i) => (
          <g key={`${t}-${i}`}>
            <rect
              x={24 + i * 72}
              y={y + 8}
              width={64}
              height={28}
              rx={6}
              fill={i === 0 ? "#2a3a28" : "#121620"}
              stroke={i === 0 ? GOLD : "#2a3040"}
              strokeWidth={i === 0 ? 2 : 1}
            />
            <text
              x={56 + i * 72}
              y={y + 27}
              textAnchor="middle"
              fill={i === 0 ? GOLD : "#dcdce6"}
              fontSize={12}
              fontFamily={FONT}
            >
              {t}
            </text>
          </g>
        ))
      )}
    </g>
  );
}

function BfsWalkDiagram({ step }: { step: BfsWalkStep }) {
  const visited = new Set(step.visited);
  const inQueue = new Set(step.queue);

  return (
    <svg viewBox={`0 0 ${W} 420`} className="mx-auto block w-full max-w-[720px]">
      <GraphEdges edges={ADJ_EDGES} pos={POS} active={step.edge} />
      {ADJ_NODES.map((n) => {
        const p = POS[n];
        const isCurr = step.current === n;
        const isVis = visited.has(n);
        const isQ = inQueue.has(n);
        const isSkip = step.skipped === n;
        let fill = "#1a1e2a";
        let stroke = "#4a5060";
        if (isQ && !isCurr) {
          fill = "#1a2838";
          stroke = BLUE;
        }
        if (isVis && !isQ && !isCurr) {
          fill = "#1a2838";
          stroke = TEAL;
        }
        if (isCurr) {
          fill = "#2a3a28";
          stroke = GOLD;
        }
        if (isSkip) stroke = ORANGE;
        const d = step.dist[n];
        return (
          <GraphNode
            key={n}
            id={n}
            x={p.x}
            y={p.y}
            fill={fill}
            stroke={stroke}
            ring={isCurr ? GOLD : undefined}
            sub={d !== undefined ? `d=${d}` : undefined}
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
        dist
      </text>
      <rect x={480} y={130} width={200} height={100} rx={6} fill="#121620" stroke="#2a3040" />
      {Object.keys(step.dist).length === 0 ? (
        <text x={492} y={160} fill={DIM} fontSize={13} fontFamily={FONT}>
          {"{}"}
        </text>
      ) : (
        Object.keys(step.dist)
          .map(Number)
          .sort((a, b) => a - b)
          .map((k, i) => (
            <text key={k} x={492} y={152 + i * 16} fill={BLUE} fontSize={12} fontFamily={FONT}>
              {k}: {step.dist[k]}
            </text>
          ))
      )}

      <text x={20} y={355} fill={DIM} fontSize={11} fontFamily={FONT}>
        graph เดียวกับหมวด DFS · 0→[{DFS_GRAPH[0].join(",")}] · แผ่ทีละชั้นด้วยคิว
      </text>
      <QueueRow items={step.queue.map(String)} y={368} label="QUEUE (FIFO · หัวซ้าย)" />
    </svg>
  );
}

function GridDiagram({ step }: { step: GridBfsStep }) {
  const cell = 72;
  const ox = 80;
  const oy = 40;
  const visited = new Set(step.visited);
  const qSet = new Set(step.queue.map(([r, c]) => `${r},${c}`));

  return (
    <svg viewBox={`0 0 ${W} 360`} className="mx-auto block w-full max-w-[720px]">
      {Array.from({ length: GRID_ROWS }, (_, r) =>
        Array.from({ length: GRID_COLS }, (_, c) => {
          const x = ox + c * cell;
          const y = oy + r * cell;
          const key = `${r},${c}`;
          const wall = GRID[r][c] === 1;
          const isCurr = step.current && step.current[0] === r && step.current[1] === c;
          const isLook = step.looking && step.looking[0] === r && step.looking[1] === c;
          const isVis = visited.has(key);
          const isQ = qSet.has(key);
          let fill = "#1a1e2a";
          let stroke = "#4a5060";
          if (wall) {
            fill = "#2a2030";
            stroke = ORANGE;
          } else if (isCurr) {
            fill = "#2a3a28";
            stroke = GOLD;
          } else if (isQ) {
            fill = "#1a2838";
            stroke = BLUE;
          } else if (isVis) {
            fill = "#1a2838";
            stroke = TEAL;
          }
          if (isLook && !wall) stroke = GOLD;
          const d = step.dist[key];
          return (
            <g key={key}>
              <rect
                x={x}
                y={y}
                width={cell - 8}
                height={cell - 8}
                rx={8}
                fill={fill}
                stroke={stroke}
                strokeWidth={isCurr || isLook ? 3 : 2}
              />
              <text
                x={x + (cell - 8) / 2}
                y={y + 28}
                textAnchor="middle"
                fill="#f5f5fa"
                fontSize={13}
                fontWeight={700}
                fontFamily={FONT}
              >
                ({r},{c})
              </text>
              <text
                x={x + (cell - 8) / 2}
                y={y + 48}
                textAnchor="middle"
                fill={wall ? ORANGE : MUTED}
                fontSize={11}
                fontFamily={FONT}
              >
                {wall ? "wall" : d !== undefined ? `d=${d}` : "·"}
              </text>
            </g>
          );
        }),
      )}

      <text x={420} y={50} fill={MUTED} fontSize={12} fontWeight={700} fontFamily={FONT}>
        visited
      </text>
      <rect x={420} y={60} width={260} height={100} rx={6} fill="#121620" stroke="#2a3040" />
      <text x={432} y={88} fill={TEAL} fontSize={12} fontFamily={FONT}>
        {step.visited.length === 0
          ? "{}"
          : "{" + step.visited.map((k) => `(${k})`).join(", ") + "}"}
      </text>

      <QueueRow
        items={step.queue.map(([r, c]) => `(${r},${c})`)}
        y={280}
        label="QUEUE (FIFO · หัวซ้าย)"
      />
    </svg>
  );
}

function MultiDiagram({ step }: { step: MultiBfsStep }) {
  const visited = new Set(step.visited);
  const inQueue = new Set(step.queue);

  return (
    <svg viewBox={`0 0 ${W} 300`} className="mx-auto block w-full max-w-[720px]">
      <GraphEdges edges={MULTI_EDGES} pos={MULTI_POS} active={step.edge} />
      {MULTI_NODES.map((n) => {
        const p = MULTI_POS[n];
        const isCurr = step.current === n;
        const isVis = visited.has(n);
        const isQ = inQueue.has(n);
        const isSkip = step.skipped === n;
        const src = step.from[n];
        let fill = "#1a1e2a";
        let stroke = "#4a5060";
        if (isQ && !isCurr) {
          fill = "#1a2838";
          stroke = BLUE;
        }
        if (isVis && !isQ && !isCurr) {
          fill = "#1a2838";
          stroke = src === 0 ? TEAL : "#6565d5";
        }
        if (isCurr) {
          fill = "#2a3a28";
          stroke = GOLD;
        }
        if (isSkip) stroke = ORANGE;
        return (
          <GraphNode
            key={n}
            id={n}
            x={p.x}
            y={p.y}
            fill={fill}
            stroke={stroke}
            ring={isCurr ? GOLD : undefined}
            sub={src !== undefined ? (src === 0 ? "จาก 0" : "จาก 4") : undefined}
          />
        );
      })}

      <text x={24} y={40} fill={MUTED} fontSize={12} fontWeight={700} fontFamily={FONT}>
        คลื่นซ้าย (0) = เขียว · คลื่นขวา (4) = ม่วง
      </text>
      <QueueRow items={step.queue.map(String)} y={220} label="QUEUE (FIFO · สองต้นตอผสมในคิวเดียว)" />
    </svg>
  );
}

/** Static: grid cells = nodes, 4-dir edges. */
export function GraphGridAsGraphViz() {
  const cell = 80;
  const ox = 160;
  const oy = 40;
  return (
    <VizStaticFrame
      title="GRID คือกราฟ"
      pills={[
        { label: "ช่อง = โหนด", color: TEAL },
        { label: "4 ทิศ = เส้น", color: BLUE },
      ]}
      caption="ตาราง 3×3 · ช่อง (1,1) เป็นกำแพง ไม่มีเส้นออก · ช่องอื่นเชื่อมเฉพาะบน/ล่าง/ซ้าย/ขวาที่เดินได้"
      diagram={
        <svg viewBox={`0 0 ${W} 320`} className="mx-auto block w-full max-w-[720px]">
          {/* edges between walkable neighbors */}
          {Array.from({ length: GRID_ROWS }, (_, r) =>
            Array.from({ length: GRID_COLS }, (_, c) => {
              if (GRID[r][c] === 1) return null;
              const links: [number, number][] = [
                [r, c + 1],
                [r + 1, c],
              ];
              return links.map(([nr, nc]) => {
                if (nr >= GRID_ROWS || nc >= GRID_COLS) return null;
                if (GRID[nr][nc] === 1) return null;
                const x1 = ox + c * cell + cell / 2 - 4;
                const y1 = oy + r * cell + cell / 2 - 4;
                const x2 = ox + nc * cell + cell / 2 - 4;
                const y2 = oy + nr * cell + cell / 2 - 4;
                return (
                  <line
                    key={`${r},${c}-${nr},${nc}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#4a5060"
                    strokeWidth={3}
                  />
                );
              });
            }),
          )}
          {Array.from({ length: GRID_ROWS }, (_, r) =>
            Array.from({ length: GRID_COLS }, (_, c) => {
              const x = ox + c * cell;
              const y = oy + r * cell;
              const wall = GRID[r][c] === 1;
              return (
                <g key={`${r}-${c}`}>
                  <circle
                    cx={x + cell / 2 - 4}
                    cy={y + cell / 2 - 4}
                    r={22}
                    fill={wall ? "#2a2030" : "#1a1e2a"}
                    stroke={wall ? ORANGE : TEAL}
                    strokeWidth={2.5}
                  />
                  <text
                    x={x + cell / 2 - 4}
                    y={y + cell / 2 + 1}
                    textAnchor="middle"
                    fill="#f5f5fa"
                    fontSize={12}
                    fontWeight={700}
                    fontFamily={FONT}
                  >
                    {wall ? "×" : `${r},${c}`}
                  </text>
                </g>
              );
            }),
          )}
        </svg>
      }
    />
  );
}

export function GraphBfsWalkViz() {
  const steps = useMemo(() => buildGraphBfsWalkSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="GRAPH BFS · แผ่ทีละชั้น + dist"
      pills={[
        { label: "BFS", color: GOLD },
        { label: "QUEUE", color: BLUE },
        { label: "dist", color: TEAL },
      ]}
      message={step.msg}
      diagram={<BfsWalkDiagram step={step} />}
      lines={BFS_CODE}
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

export function GraphBfsGridViz() {
  const steps = useMemo(() => buildGridBfsSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="GRID BFS · ช่องเป็นโหนด"
      pills={[
        { label: "GRID", color: TEAL },
        { label: "4 ทิศ", color: BLUE },
      ]}
      message={step.msg}
      diagram={<GridDiagram step={step} />}
      lines={GRID_CODE}
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

export function GraphBfsMultiViz() {
  const steps = useMemo(() => buildMultiSourceSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="MULTI-SOURCE BFS · สองจุดเริ่มพร้อมกัน"
      pills={[
        { label: "หลายต้นตอ", color: GOLD },
        { label: "คิวเดียว", color: BLUE },
      ]}
      message={step.msg}
      diagram={<MultiDiagram step={step} />}
      lines={MULTI_CODE}
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
