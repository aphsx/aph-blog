"use client";

import { useMemo } from "react";
import { VizFrameView, useVizPlayback } from "@/components/viz/VizFrame";
import {
  MAZE,
  MAZE_CODE,
  MAZE_COLS,
  MAZE_ENTRANCE,
  MAZE_ROWS,
  ORANGE_CODE,
  ORANGE_COLS,
  ORANGE_ROWS,
  buildMazeExitSteps,
  buildOrangesSteps,
  type MazeExitStep,
  type OrangesStep,
} from "@/lib/viz/graph-bfs-problems";

const W = 720;
const GOLD = "#F7B700";
const ORANGE = "#D55D00";
const TEAL = "#03A69B";
const BLUE = "#64b4ff";
const MUTED = "#8a90a0";
const DIM = "#6a7080";
const FONT = "ui-monospace, SFMono-Regular, Menlo, monospace";

function QueueRow({ items, y, label }: { items: string[]; y: number; label: string }) {
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
              x={24 + i * 88}
              y={y + 8}
              width={80}
              height={28}
              rx={6}
              fill={i === 0 ? "#2a3a28" : "#121620"}
              stroke={i === 0 ? GOLD : "#2a3040"}
              strokeWidth={i === 0 ? 2 : 1}
            />
            <text
              x={64 + i * 88}
              y={y + 27}
              textAnchor="middle"
              fill={i === 0 ? GOLD : "#dcdce6"}
              fontSize={11}
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

function MazeDiagram({ step }: { step: MazeExitStep }) {
  const cell = 72;
  const ox = 48;
  const oy = 28;
  const visited = new Set(step.visited);
  const qSet = new Set(step.queue.map(([r, c]) => `${r},${c}`));
  const [er, ec] = MAZE_ENTRANCE;

  return (
    <svg viewBox={`0 0 ${W} 360`} className="mx-auto block w-full max-w-[720px]">
      {Array.from({ length: MAZE_ROWS }, (_, r) =>
        Array.from({ length: MAZE_COLS }, (_, c) => {
          const x = ox + c * cell;
          const y = oy + r * cell;
          const key = `${r},${c}`;
          const wall = MAZE[r][c] === "+";
          const isEntrance = r === er && c === ec;
          const isCurr = step.current && step.current[0] === r && step.current[1] === c;
          const isLook = step.looking && step.looking[0] === r && step.looking[1] === c;
          const isFound = step.found && step.found[0] === r && step.found[1] === c;
          const isVis = visited.has(key);
          const isQ = qSet.has(key);
          let fill = "#1a1e2a";
          let stroke = "#4a5060";
          if (wall) {
            fill = "#2a2030";
            stroke = ORANGE;
          } else if (isFound) {
            fill = "#2a3a28";
            stroke = GOLD;
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
                strokeWidth={isCurr || isLook || isFound ? 3 : 2}
              />
              <text
                x={x + (cell - 8) / 2}
                y={y + 26}
                textAnchor="middle"
                fill="#f5f5fa"
                fontSize={13}
                fontWeight={700}
                fontFamily={FONT}
              >
                {wall ? "+" : "."}
              </text>
              <text
                x={x + (cell - 8) / 2}
                y={y + 44}
                textAnchor="middle"
                fill={MUTED}
                fontSize={10}
                fontFamily={FONT}
              >
                {isEntrance ? "เข้า" : isFound ? "ออก" : `(${r},${c})`}
              </text>
            </g>
          );
        }),
      )}
      <text x={300} y={50} fill={MUTED} fontSize={12} fontWeight={700} fontFamily={FONT}>
        visited
      </text>
      <rect x={300} y={60} width={380} height={40} rx={6} fill="#121620" stroke="#2a3040" />
      <text x={312} y={86} fill={TEAL} fontSize={12} fontFamily={FONT}>
        {step.visited.length === 0 ? "{}" : "{" + step.visited.map((k) => `(${k})`).join(", ") + "}"}
      </text>
      {step.answer !== null && (
        <text x={300} y={130} fill={GOLD} fontSize={18} fontWeight={800} fontFamily={FONT}>
          return {step.answer}
        </text>
      )}
      <QueueRow
        items={step.queue.map(([r, c, s]) => `(${r},${c},${s})`)}
        y={268}
        label="QUEUE · (แถว, คอลัมน์, ก้าว)"
      />
    </svg>
  );
}

function OrangesDiagram({ step }: { step: OrangesStep }) {
  const cell = 72;
  const ox = 48;
  const oy = 28;
  const qSet = new Set(step.queue.map(([r, c]) => `${r},${c}`));

  const label = (v: number) => (v === 2 ? "เน่า" : v === 1 ? "สด" : "ว่าง");

  return (
    <svg viewBox={`0 0 ${W} 360`} className="mx-auto block w-full max-w-[720px]">
      {Array.from({ length: ORANGE_ROWS }, (_, r) =>
        Array.from({ length: ORANGE_COLS }, (_, c) => {
          const x = ox + c * cell;
          const y = oy + r * cell;
          const v = step.grid[r][c];
          const isCurr = step.current && step.current[0] === r && step.current[1] === c;
          const isLook = step.looking && step.looking[0] === r && step.looking[1] === c;
          const isQ = qSet.has(`${r},${c}`);
          let fill = "#1a1e2a";
          let stroke = "#4a5060";
          if (v === 0) {
            fill = "#121620";
            stroke = "#2a3040";
          } else if (v === 2) {
            fill = "#2a2030";
            stroke = ORANGE;
          } else if (v === 1) {
            fill = "#1a2838";
            stroke = TEAL;
          }
          if (isQ && v === 2) stroke = BLUE;
          if (isCurr) stroke = GOLD;
          if (isLook) stroke = GOLD;
          return (
            <g key={`${r}-${c}`}>
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
                y={y + 26}
                textAnchor="middle"
                fill="#f5f5fa"
                fontSize={16}
                fontWeight={800}
                fontFamily={FONT}
              >
                {v}
              </text>
              <text
                x={x + (cell - 8) / 2}
                y={y + 44}
                textAnchor="middle"
                fill={MUTED}
                fontSize={10}
                fontFamily={FONT}
              >
                {label(v)}
              </text>
            </g>
          );
        }),
      )}
      <text x={300} y={48} fill={MUTED} fontSize={12} fontWeight={700} fontFamily={FONT}>
        minutes
      </text>
      <text x={300} y={84} fill={GOLD} fontSize={32} fontWeight={800} fontFamily={FONT}>
        {step.minutes}
      </text>
      <text x={420} y={48} fill={MUTED} fontSize={12} fontWeight={700} fontFamily={FONT}>
        fresh
      </text>
      <text x={420} y={84} fill={TEAL} fontSize={32} fontWeight={800} fontFamily={FONT}>
        {step.fresh}
      </text>
      {step.answer !== null && (
        <text x={300} y={130} fill={GOLD} fontSize={18} fontWeight={800} fontFamily={FONT}>
          return {step.answer}
        </text>
      )}
      <QueueRow
        items={step.queue.map(([r, c]) => `(${r},${c})`)}
        y={268}
        label="QUEUE · ส้มเน่าที่รอกลาม"
      />
    </svg>
  );
}

export function NearestExitViz() {
  const steps = useMemo(() => buildMazeExitSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="NEAREST EXIT · BFS จากทางเข้า"
      pills={[
        { label: "GRID", color: TEAL },
        { label: "ก้าวน้อยสุด", color: GOLD },
      ]}
      message={step.msg}
      diagram={<MazeDiagram step={step} />}
      lines={MAZE_CODE}
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

export function RottingOrangesViz() {
  const steps = useMemo(() => buildOrangesSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="ROTTING ORANGES · ลามจากหลายจุด"
      pills={[
        { label: "หลายต้นตอ", color: GOLD },
        { label: "ทีละนาที", color: ORANGE },
      ]}
      message={step.msg}
      diagram={<OrangesDiagram step={step} />}
      lines={ORANGE_CODE}
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
