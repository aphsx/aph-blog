"use client";

import { useMemo } from "react";
import { VizFrameView, useVizPlayback } from "@/components/viz/VizFrame";
import {
  EVAL_CODE,
  EVAL_EDGES,
  KEYS_CODE,
  KEYS_N,
  KEYS_ROOMS,
  PROV_CODE,
  PROV_MATRIX,
  PROV_N,
  REORDER_CODE,
  REORDER_CONN,
  REORDER_N,
  buildEvalDivSteps,
  buildKeysRoomsSteps,
  buildProvincesSteps,
  buildReorderSteps,
  type EvalDivStep,
  type KeysRoomsStep,
  type ProvincesStep,
  type ReorderStep,
} from "@/lib/viz/graph-dfs-problems";

const W = 720;
const GOLD = "#F7B700";
const ORANGE = "#D55D00";
const TEAL = "#03A69B";
const BLUE = "#64b4ff";
const MUTED = "#8a90a0";
const DIM = "#6a7080";
const FONT = "ui-monospace, SFMono-Regular, Menlo, monospace";
const COMP = ["#6565d5", "#03A69B", "#D55D00"];

/* ─── Keys and Rooms ─────────────────────────────────────────────── */

const KEYS_POS: Record<number, { x: number; y: number }> = {
  0: { x: 100, y: 120 },
  1: { x: 260, y: 120 },
  2: { x: 420, y: 120 },
  3: { x: 580, y: 120 },
};

function KeysDiagram({ step }: { step: KeysRoomsStep }) {
  const visited = new Set(step.visited);
  return (
    <svg viewBox={`0 0 ${W} 260`} className="mx-auto block w-full max-w-[720px]">
      {KEYS_ROOMS.flatMap((keys, from) =>
        keys.map((to) => {
          const a = KEYS_POS[from];
          const b = KEYS_POS[to];
          const active = step.current === from && step.key === to;
          return (
            <g key={`${from}-${to}`}>
              <line
                x1={a.x + 28}
                y1={a.y}
                x2={b.x - 28}
                y2={b.y}
                stroke={active ? GOLD : "#4a5060"}
                strokeWidth={active ? 3 : 2}
                markerEnd="url(#arrow)"
              />
            </g>
          );
        }),
      )}
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8a90a0" />
        </marker>
      </defs>
      {Array.from({ length: KEYS_N }, (_, room) => {
        const p = KEYS_POS[room];
        const isCurr = step.current === room;
        const isVis = visited.has(room);
        const isTarget = step.target === room;
        return (
          <g key={room}>
            {isCurr && (
              <circle cx={p.x} cy={p.y} r={36} fill="none" stroke={GOLD} strokeWidth={3} />
            )}
            <rect
              x={p.x - 32}
              y={p.y - 28}
              width={64}
              height={56}
              rx={10}
              fill={isVis ? "#1a2838" : "#1a1e2a"}
              stroke={isTarget ? ORANGE : isVis ? TEAL : "#4a5060"}
              strokeWidth={2.5}
            />
            <text
              x={p.x}
              y={p.y + 5}
              textAnchor="middle"
              fill="#f5f5fa"
              fontSize={18}
              fontWeight={800}
              fontFamily={FONT}
            >
              {room}
            </text>
            <text
              x={p.x}
              y={p.y + 50}
              textAnchor="middle"
              fill={MUTED}
              fontSize={11}
              fontFamily={FONT}
            >
              keys: [{KEYS_ROOMS[room].join(",")}]
            </text>
          </g>
        );
      })}
      <text x={40} y={220} fill={TEAL} fontSize={13} fontFamily={FONT}>
        visited = {"{" + step.visited.join(", ") + "}"}
      </text>
      {step.answer !== null && (
        <text x={400} y={220} fill={GOLD} fontSize={16} fontWeight={800} fontFamily={FONT}>
          return {String(step.answer)}
        </text>
      )}
    </svg>
  );
}

export function KeysAndRoomsViz() {
  const steps = useMemo(() => buildKeysRoomsSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="KEYS AND ROOMS · DFS จากห้อง 0"
      pills={[
        { label: "directed", color: BLUE },
        { label: "reachability", color: TEAL },
      ]}
      message={step.msg}
      diagram={<KeysDiagram step={step} />}
      lines={KEYS_CODE}
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

/* ─── Number of Provinces ────────────────────────────────────────── */

const PROV_POS: Record<number, { x: number; y: number }> = {
  0: { x: 120, y: 100 },
  1: { x: 260, y: 100 },
  2: { x: 190, y: 220 },
};

function ProvincesDiagram({ step }: { step: ProvincesStep }) {
  const edges: [number, number][] = [];
  for (let i = 0; i < PROV_N; i++) {
    for (let j = i + 1; j < PROV_N; j++) {
      if (PROV_MATRIX[i][j] === 1) edges.push([i, j]);
    }
  }
  return (
    <svg viewBox={`0 0 ${W} 280`} className="mx-auto block w-full max-w-[720px]">
      {edges.map(([a, b]) => {
        const pa = PROV_POS[a];
        const pb = PROV_POS[b];
        const active =
          (step.current === a && step.other === b) || (step.current === b && step.other === a);
        return (
          <line
            key={`${a}-${b}`}
            x1={pa.x}
            y1={pa.y}
            x2={pb.x}
            y2={pb.y}
            stroke={active ? GOLD : "#4a5060"}
            strokeWidth={active ? 4 : 2.5}
          />
        );
      })}
      {Array.from({ length: PROV_N }, (_, city) => {
        const p = PROV_POS[city];
        const comp = step.compOf[city];
        const color = comp > 0 ? COMP[(comp - 1) % COMP.length] : "#4a5060";
        const ring = step.current === city || step.scan === city;
        return (
          <g key={city}>
            {ring && <circle cx={p.x} cy={p.y} r={30} fill="none" stroke={GOLD} strokeWidth={3} />}
            <circle cx={p.x} cy={p.y} r={22} fill="#1a1e2a" stroke={color} strokeWidth={2.5} />
            <text
              x={p.x}
              y={p.y + 5}
              textAnchor="middle"
              fill="#f5f5fa"
              fontSize={16}
              fontWeight={800}
              fontFamily={FONT}
            >
              {city}
            </text>
          </g>
        );
      })}
      {/* matrix */}
      <text x={400} y={40} fill={MUTED} fontSize={12} fontWeight={700} fontFamily={FONT}>
        isConnected
      </text>
      {PROV_MATRIX.map((row, r) =>
        row.map((v, c) => {
          const on = step.current === r && step.other === c;
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={400 + c * 44}
                y={56 + r * 44}
                width={40}
                height={40}
                rx={6}
                fill={on ? "#2a3a28" : "#121620"}
                stroke={on ? GOLD : "#2a3040"}
              />
              <text
                x={420 + c * 44}
                y={82 + r * 44}
                textAnchor="middle"
                fill={v ? TEAL : DIM}
                fontSize={14}
                fontFamily={FONT}
              >
                {v}
              </text>
            </g>
          );
        }),
      )}
      <text x={400} y={220} fill={GOLD} fontSize={18} fontWeight={800} fontFamily={FONT}>
        provinces = {step.provinces}
      </text>
    </svg>
  );
}

export function NumberOfProvincesViz() {
  const steps = useMemo(() => buildProvincesSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="NUMBER OF PROVINCES · นับก้อน"
      pills={[
        { label: "adjacency matrix", color: BLUE },
        { label: "outer + DFS", color: TEAL },
      ]}
      message={step.msg}
      diagram={<ProvincesDiagram step={step} />}
      lines={PROV_CODE}
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

/* ─── Reorder Routes ─────────────────────────────────────────────── */

const REORDER_POS: Record<number, { x: number; y: number }> = {
  0: { x: 200, y: 160 },
  1: { x: 340, y: 80 },
  2: { x: 520, y: 200 },
  3: { x: 480, y: 80 },
  4: { x: 80, y: 160 },
  5: { x: 80, y: 280 },
};

function ReorderDiagram({ step }: { step: ReorderStep }) {
  const visited = new Set(step.visited);
  const flipped = new Set(step.flipped.map(([a, b]) => `${a}-${b}`));
  return (
    <svg viewBox={`0 0 ${W} 340`} className="mx-auto block w-full max-w-[720px]">
      <defs>
        <marker id="arr-muted" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8a90a0" />
        </marker>
        <marker id="arr-orange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={ORANGE} />
        </marker>
        <marker id="arr-gold" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={GOLD} />
        </marker>
      </defs>
      {REORDER_CONN.map(([a, b]) => {
        const pa = REORDER_POS[a];
        const pb = REORDER_POS[b];
        const isFlip = flipped.has(`${a}-${b}`);
        const isForward = step.current === a && step.nxt === b && step.cost === 1;
        const isAgainst = step.current === b && step.nxt === a && step.cost === 0;
        const isActive = isForward || isAgainst;
        const stroke = isForward || isFlip ? ORANGE : isAgainst ? BLUE : "#4a5060";
        const marker = isForward || isFlip ? "url(#arr-orange)" : isAgainst ? "url(#arr-gold)" : "url(#arr-muted)";
        return (
          <line
            key={`${a}-${b}`}
            x1={pa.x}
            y1={pa.y}
            x2={pb.x}
            y2={pb.y}
            stroke={stroke}
            strokeWidth={isActive || isFlip ? 3.5 : 2}
            markerEnd={marker}
          />
        );
      })}
      {Array.from({ length: REORDER_N }, (_, city) => {
        const p = REORDER_POS[city];
        const isCurr = step.current === city;
        const isVis = visited.has(city);
        return (
          <g key={city}>
            {isCurr && (
              <circle cx={p.x} cy={p.y} r={28} fill="none" stroke={GOLD} strokeWidth={3} />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={20}
              fill="#1a1e2a"
              stroke={city === 0 ? GOLD : isVis ? TEAL : "#4a5060"}
              strokeWidth={2.5}
            />
            <text
              x={p.x}
              y={p.y + 5}
              textAnchor="middle"
              fill="#f5f5fa"
              fontSize={15}
              fontWeight={800}
              fontFamily={FONT}
            >
              {city}
            </text>
          </g>
        );
      })}
      <text x={400} y={300} fill={ORANGE} fontSize={18} fontWeight={800} fontFamily={FONT}>
        changes = {step.changes}
      </text>
      <text x={400} y={324} fill={DIM} fontSize={11} fontFamily={FONT}>
        ส้ม = ต้องกลับทิศ · ฟ้า = เดินย้อนลูกศร
      </text>
    </svg>
  );
}

export function ReorderRoutesViz() {
  const steps = useMemo(() => buildReorderSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="REORDER ROUTES · เดินออกจาก 0"
      pills={[
        { label: "cost 0/1", color: ORANGE },
        { label: "DFS จาก 0", color: TEAL },
      ]}
      message={step.msg}
      diagram={<ReorderDiagram step={step} />}
      lines={REORDER_CODE}
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

/* ─── Evaluate Division ──────────────────────────────────────────── */

const EVAL_POS: Record<string, { x: number; y: number }> = {
  a: { x: 140, y: 140 },
  b: { x: 360, y: 140 },
  c: { x: 560, y: 140 },
};

function EvalDivDiagram({ step }: { step: EvalDivStep }) {
  const visited = new Set(step.visited);
  return (
    <svg viewBox={`0 0 ${W} 280`} className="mx-auto block w-full max-w-[720px]">
      <defs>
        <marker id="eval-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8a90a0" />
        </marker>
        <marker id="eval-gold" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={GOLD} />
        </marker>
      </defs>
      {EVAL_EDGES.filter(([a, b]) => (a === "a" && b === "b") || (a === "b" && b === "c")).map(
        ([a, b, w]) => {
          const pa = EVAL_POS[a];
          const pb = EVAL_POS[b];
          const active = step.current === a && step.nbr === b;
          return (
            <g key={`${a}-${b}`}>
              <line
                x1={pa.x + 26}
                y1={pa.y}
                x2={pb.x - 26}
                y2={pb.y}
                stroke={active ? GOLD : "#4a5060"}
                strokeWidth={active ? 3.5 : 2}
                markerEnd={active ? "url(#eval-gold)" : "url(#eval-arr)"}
              />
              <text
                x={(pa.x + pb.x) / 2}
                y={pa.y - 14}
                textAnchor="middle"
                fill={active ? GOLD : MUTED}
                fontSize={13}
                fontFamily={FONT}
              >
                ×{w}
              </text>
            </g>
          );
        },
      )}
      {/* reverse edges as dashed light */}
      <line
        x1={EVAL_POS.b.x - 26}
        y1={EVAL_POS.b.y + 18}
        x2={EVAL_POS.a.x + 26}
        y2={EVAL_POS.a.y + 18}
        stroke="#2a3040"
        strokeWidth={1.5}
        strokeDasharray="4 4"
      />
      <text
        x={(EVAL_POS.a.x + EVAL_POS.b.x) / 2}
        y={EVAL_POS.a.y + 36}
        textAnchor="middle"
        fill={DIM}
        fontSize={11}
        fontFamily={FONT}
      >
        ×0.5
      </text>
      {(["a", "b", "c"] as const).map((id) => {
        const p = EVAL_POS[id];
        const isCurr = step.current === id;
        const isVis = visited.has(id);
        const isDst = step.dst === id;
        return (
          <g key={id}>
            {isCurr && (
              <circle cx={p.x} cy={p.y} r={32} fill="none" stroke={GOLD} strokeWidth={3} />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={24}
              fill="#1a1e2a"
              stroke={isDst ? BLUE : isVis ? TEAL : "#4a5060"}
              strokeWidth={2.5}
            />
            <text
              x={p.x}
              y={p.y + 5}
              textAnchor="middle"
              fill="#f5f5fa"
              fontSize={16}
              fontWeight={800}
              fontFamily={FONT}
            >
              {id}
            </text>
          </g>
        );
      })}
      <text x={40} y={240} fill={TEAL} fontSize={13} fontFamily={FONT}>
        visited = {"{" + step.visited.join(", ") + "}"}
      </text>
      {step.product !== null && (
        <text x={360} y={240} fill={GOLD} fontSize={16} fontWeight={800} fontFamily={FONT}>
          product = {step.product}
        </text>
      )}
      {step.answer !== null && step.line === 12 && (
        <text x={560} y={240} fill={ORANGE} fontSize={16} fontWeight={800} fontFamily={FONT}>
          → {step.answer}
        </text>
      )}
    </svg>
  );
}

export function EvaluateDivisionViz() {
  const steps = useMemo(() => buildEvalDivSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="EVALUATE DIVISION · a/c = สะสมผลคูณ"
      pills={[
        { label: "weighted DFS", color: GOLD },
        { label: "query a/c", color: BLUE },
      ]}
      message={step.msg}
      diagram={<EvalDivDiagram step={step} />}
      lines={EVAL_CODE}
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
