"use client";

import { useMemo } from "react";
import { VizFrameView, VizStaticFrame, useVizPlayback } from "@/components/viz/VizFrame";
import {
  PUSH_POP_CODE,
  SHAPE_ARR,
  buildHeapPushPopSteps,
  layoutHeap,
  leftOf,
  rightOf,
  type HeapStep,
} from "@/lib/viz/heap";

const W = 720;
const GOLD = "#F7B700";
const ORANGE = "#D55D00";
const TEAL = "#03A69B";
const MUTED = "#8a90a0";
const DIM = "#6a7080";
const FONT = "ui-monospace, SFMono-Regular, Menlo, monospace";

function HeapTree({
  arr,
  focus,
  parent,
  child,
  top = 40,
}: {
  arr: number[];
  focus: number | null;
  parent: number | null;
  child: number | null;
  top?: number;
}) {
  const pos = useMemo(() => layoutHeap(arr.length, W, top, 70), [arr.length, top]);

  if (arr.length === 0) {
    return (
      <text x={W / 2} y={top + 40} textAnchor="middle" fill={DIM} fontSize={16} fontFamily={FONT}>
        กองว่าง []
      </text>
    );
  }

  const edges: [number, number][] = [];
  for (let i = 0; i < arr.length; i++) {
    const L = leftOf(i);
    const R = rightOf(i);
    if (L < arr.length) edges.push([i, L]);
    if (R < arr.length) edges.push([i, R]);
  }

  return (
    <g>
      {edges.map(([a, b]) => {
        const hot =
          (parent === a && child === b) ||
          (parent === b && child === a) ||
          (focus === a && child === b);
        return (
          <line
            key={`${a}-${b}`}
            x1={pos[a].x}
            y1={pos[a].y}
            x2={pos[b].x}
            y2={pos[b].y}
            stroke={hot ? GOLD : "#4a5060"}
            strokeWidth={hot ? 3.5 : 2.5}
          />
        );
      })}
      {arr.map((v, i) => {
        const p = pos[i];
        const isFocus = focus === i;
        const isParent = parent === i;
        const isChild = child === i;
        let fill = "#1a1e2a";
        let stroke = "#4a5060";
        if (isParent) {
          fill = "#142820";
          stroke = TEAL;
        }
        if (isChild) {
          fill = "#2a2010";
          stroke = ORANGE;
        }
        if (isFocus) {
          fill = "#2a3a28";
          stroke = GOLD;
        }
        return (
          <g key={i}>
            {isFocus && (
              <circle cx={p.x} cy={p.y} r={28} fill="none" stroke={GOLD} strokeWidth={2.5} />
            )}
            <circle cx={p.x} cy={p.y} r={22} fill={fill} stroke={stroke} strokeWidth={2.5} />
            <text
              x={p.x}
              y={p.y + 5}
              textAnchor="middle"
              fill="#f5f5fa"
              fontSize={15}
              fontWeight={800}
              fontFamily={FONT}
            >
              {v}
            </text>
            <text x={p.x} y={p.y + 38} textAnchor="middle" fill={DIM} fontSize={10} fontFamily={FONT}>
              [{i}]
            </text>
          </g>
        );
      })}
    </g>
  );
}

function ArrayRow({
  arr,
  focus,
  y,
}: {
  arr: number[];
  focus: number | null;
  y: number;
}) {
  const cell = 48;
  const gap = 6;
  const total = arr.length * cell + Math.max(0, arr.length - 1) * gap;
  const x0 = (W - Math.max(total, 80)) / 2;

  return (
    <g>
      <text x={24} y={y} fill={MUTED} fontSize={11} fontWeight={700} fontFamily={FONT}>
        list (เก็บ heap)
      </text>
      {arr.length === 0 ? (
        <>
          <rect x={x0} y={y + 8} width={80} height={36} rx={6} fill="#121620" stroke="#2a3040" />
          <text x={x0 + 40} y={y + 32} textAnchor="middle" fill={DIM} fontSize={13} fontFamily={FONT}>
            []
          </text>
        </>
      ) : (
        arr.map((v, i) => {
          const x = x0 + i * (cell + gap);
          const on = focus === i;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y + 8}
                width={cell}
                height={36}
                rx={6}
                fill={on ? "#2a3a28" : "#121620"}
                stroke={on ? GOLD : "#2a3040"}
                strokeWidth={on ? 2 : 1}
              />
              <text
                x={x + cell / 2}
                y={y + 32}
                textAnchor="middle"
                fill={on ? GOLD : "#dcdce6"}
                fontSize={14}
                fontWeight={700}
                fontFamily={FONT}
              >
                {v}
              </text>
              <text
                x={x + cell / 2}
                y={y + 58}
                textAnchor="middle"
                fill={DIM}
                fontSize={10}
                fontFamily={FONT}
              >
                {i}
              </text>
            </g>
          );
        })
      )}
    </g>
  );
}

function HeapDiagram({ step }: { step: HeapStep }) {
  return (
    <svg viewBox={`0 0 ${W} 360`} className="mx-auto block w-full max-w-[720px]">
      <text x={24} y={24} fill={MUTED} fontSize={12} fontWeight={700} fontFamily={FONT}>
        min-heap · root = น้อยสุด
      </text>
      {step.out !== null && (
        <text x={560} y={24} fill={ORANGE} fontSize={13} fontWeight={700} fontFamily={FONT}>
          ออก: {step.out}
        </text>
      )}
      <HeapTree arr={step.arr} focus={step.focus} parent={step.parent} child={step.child} />
      <ArrayRow arr={step.arr} focus={step.focus} y={250} />
      <text x={24} y={340} fill={DIM} fontSize={11} fontFamily={FONT}>
        พ่อของ i = (i−1)//2 · ลูกซ้าย = 2i+1 · ลูกขวา = 2i+2
      </text>
    </svg>
  );
}

function ShapeDiagram() {
  const arr = SHAPE_ARR;
  const pos = layoutHeap(arr.length, W, 36, 68);
  const edges: [number, number][] = [];
  for (let i = 0; i < arr.length; i++) {
    const L = leftOf(i);
    const R = rightOf(i);
    if (L < arr.length) edges.push([i, L]);
    if (R < arr.length) edges.push([i, R]);
  }
  const cell = 44;
  const gap = 6;
  const total = arr.length * cell + (arr.length - 1) * gap;
  const x0 = (W - total) / 2;

  return (
    <svg viewBox={`0 0 ${W} 320`} className="mx-auto block w-full max-w-[720px]">
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={pos[a].x}
          y1={pos[a].y}
          x2={pos[b].x}
          y2={pos[b].y}
          stroke="#4a5060"
          strokeWidth={2.5}
        />
      ))}
      {arr.map((v, i) => {
        const p = pos[i];
        const isRoot = i === 0;
        return (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={22}
              fill={isRoot ? "#2a3a28" : "#1a1e2a"}
              stroke={isRoot ? GOLD : TEAL}
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
              {v}
            </text>
            <text x={p.x} y={p.y + 38} textAnchor="middle" fill={DIM} fontSize={10} fontFamily={FONT}>
              [{i}]
            </text>
          </g>
        );
      })}
      <text x={24} y={230} fill={MUTED} fontSize={11} fontWeight={700} fontFamily={FONT}>
        list เดียวกัน
      </text>
      {arr.map((v, i) => {
        const x = x0 + i * (cell + gap);
        return (
          <g key={`a-${i}`}>
            <rect
              x={x}
              y={240}
              width={cell}
              height={34}
              rx={6}
              fill={i === 0 ? "#2a3a28" : "#121620"}
              stroke={i === 0 ? GOLD : "#2a3040"}
              strokeWidth={i === 0 ? 2 : 1}
            />
            <text
              x={x + cell / 2}
              y={262}
              textAnchor="middle"
              fill={i === 0 ? GOLD : "#dcdce6"}
              fontSize={13}
              fontWeight={700}
              fontFamily={FONT}
            >
              {v}
            </text>
            <text x={x + cell / 2} y={290} textAnchor="middle" fill={DIM} fontSize={10} fontFamily={FONT}>
              {i}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function HeapShapeViz() {
  return (
    <VizStaticFrame
      title="MIN-HEAP · ต้นไม้ + list เดียวกัน"
      pills={[
        { label: "root = น้อยสุด", color: GOLD },
        { label: "พ่อ ≤ ลูก", color: TEAL },
      ]}
      caption="arr = [1, 3, 2, 7, 4, 5] · ทุกพ่อ ≤ ลูก · ลูกของ i อยู่ที่ 2i+1 และ 2i+2"
      diagram={<ShapeDiagram />}
    />
  );
}

export function HeapPushPopViz() {
  const steps = useMemo(() => buildHeapPushPopSteps(), []);
  const pb = useVizPlayback(steps.length);
  const step = steps[pb.idx];

  return (
    <VizFrameView
      title="HEAP · push / peek / pop"
      pills={[
        { label: "ทอง = โฟกัส", color: GOLD },
        { label: "เขียว = พ่อ", color: TEAL },
        { label: "ส้ม = ลูก", color: ORANGE },
      ]}
      message={step.msg}
      diagram={<HeapDiagram step={step} />}
      lines={PUSH_POP_CODE}
      line={step.line}
      idx={pb.idx}
      stepCount={steps.length}
      playing={pb.playing}
      atStart={pb.atStart}
      onReset={pb.reset}
      onPrev={pb.prev}
      onNext={pb.next}
      onToggle={pb.toggle}
    />
  );
}
