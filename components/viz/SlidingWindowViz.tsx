"use client";

import { useMemo } from "react";
import { VizFrameView, useVizPlayback } from "@/components/viz/VizFrame";
import {
  FIXED_CODE,
  FIXED_K,
  FIXED_NUMS,
  VAR_CODE,
  VAR_S,
  buildFixedSteps,
  buildVarSteps,
  type FixedStep,
  type VarStep,
} from "@/lib/viz/sliding-window";

const W = 720;
const GOLD = "#F7B700";
const ORANGE = "#D55D00";
const TEAL = "#03A69B";
const MUTED = "#8a90a0";
const DIM = "#6a7080";
const FONT = "ui-monospace, SFMono-Regular, Menlo, monospace";

function Cell({
  x,
  y,
  w,
  h,
  value,
  fill,
  stroke,
  ring,
  dim,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  value: string | number;
  fill: string;
  stroke: string;
  ring?: string;
  dim?: boolean;
}) {
  return (
    <g>
      {ring && (
        <rect
          x={x - 4}
          y={y - 4}
          width={w + 8}
          height={h + 8}
          rx={10}
          fill="none"
          stroke={ring}
          strokeWidth={2.5}
        />
      )}
      <rect x={x} y={y} width={w} height={h} rx={8} fill={fill} stroke={stroke} strokeWidth={2} />
      <text
        x={x + w / 2}
        y={y + h / 2 + 5}
        textAnchor="middle"
        fill={dim ? DIM : "#f5f5fa"}
        fontSize={15}
        fontWeight={700}
        fontFamily={FONT}
      >
        {value}
      </text>
    </g>
  );
}

function Idx({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fill={DIM} fontSize={11} fontFamily={FONT}>
      {n}
    </text>
  );
}

function Label({
  x,
  y,
  text,
  color = MUTED,
  anchor = "start" as const,
}: {
  x: number;
  y: number;
  text: string;
  color?: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill={color} fontSize={11} fontWeight={700} fontFamily={FONT}>
      {text}
    </text>
  );
}

function Pointer({
  cx,
  tipY,
  label,
  color,
}: {
  cx: number;
  tipY: number;
  label: string;
  color: string;
}) {
  const boxW = label.length > 2 ? 32 : 22;
  const boxH = 18;
  return (
    <g>
      <polygon points={`${cx},${tipY} ${cx - 6},${tipY + 8} ${cx + 6},${tipY + 8}`} fill={color} />
      <rect x={cx - boxW / 2} y={tipY + 8} width={boxW} height={boxH} rx={4} fill={color} />
      <text
        x={cx}
        y={tipY + 21}
        textAnchor="middle"
        fill="#0c0e16"
        fontSize={11}
        fontWeight={800}
        fontFamily={FONT}
      >
        {label}
      </text>
    </g>
  );
}

function layout(n: number, cell: number, gap: number) {
  const rowW = n * cell + (n - 1) * gap;
  const origin = (W - rowW) / 2;
  return { origin, rowW, xOf: (i: number) => origin + i * (cell + gap) };
}

function WindowBand({
  x,
  y,
  w,
  h,
  label,
  color,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  color: string;
}) {
  return (
    <g>
      <rect
        x={x - 7}
        y={y - 10}
        width={w + 14}
        height={h + 20}
        rx={12}
        fill={color}
        fillOpacity={0.16}
        stroke={color}
        strokeWidth={2.5}
      />
      <text
        x={x + w / 2}
        y={y - 16}
        textAnchor="middle"
        fill={color}
        fontSize={12}
        fontWeight={800}
        fontFamily={FONT}
      >
        {label}
      </text>
    </g>
  );
}

function FixedDiagram({ step }: { step: FixedStep }) {
  const nums = FIXED_NUMS;
  const cell = 52;
  const gap = 12;
  const h = 48;
  const y = 64;
  const { origin, xOf } = layout(nums.length, cell, gap);
  const inWin = (i: number) =>
    step.left !== null && step.right !== null && i >= step.left && i <= step.right;
  const winLen =
    step.left !== null && step.right !== null ? step.right - step.left + 1 : 0;

  return (
    <svg viewBox={`0 0 ${W} 268`} className="w-full" aria-hidden>
      {winLen > 0 && step.left !== null && (
        <WindowBand
          x={xOf(step.left)}
          y={y}
          w={winLen * cell + (winLen - 1) * gap}
          h={h}
          label={`ยาว k = ${FIXED_K}`}
          color={TEAL}
        />
      )}

      {nums.map((v, i) => {
        const x = xOf(i);
        const isEnter = step.enter === i;
        const isLeave = step.leave === i;
        const inside = inWin(i);
        return (
          <g key={i}>
            <Idx x={x + cell / 2} y={48} n={i} />
            <Cell
              x={x}
              y={y}
              w={cell}
              h={h}
              value={v}
              fill={isEnter ? ORANGE : isLeave ? "#5a3a20" : inside ? "#196860" : "#1a2030"}
              stroke={isEnter ? GOLD : isLeave ? ORANGE : inside ? TEAL : "#3a4458"}
              ring={isEnter ? GOLD : isLeave ? ORANGE : undefined}
              dim={!inside && !isLeave}
            />
          </g>
        );
      })}

      {step.left !== null && (
        <Pointer cx={xOf(step.left) + cell / 2} tipY={y + h + 8} label="L" color={TEAL} />
      )}
      {step.right !== null && (
        <Pointer cx={xOf(step.right) + cell / 2} tipY={y + h + 8} label="R" color={GOLD} />
      )}

      <text x={origin} y={248} fill={MUTED} fontSize={13} fontFamily={FONT}>
        {step.sum === null ? "sum = —" : `sum = ${step.sum}`}
      </text>
      <text x={W - origin} y={248} textAnchor="end" fill={TEAL} fontSize={13} fontWeight={700} fontFamily={FONT}>
        {step.best === null ? "best = —" : `best = ${step.best}`}
      </text>
    </svg>
  );
}

function VarDiagram({ step }: { step: VarStep }) {
  const s = VAR_S;
  const chars = [...s];
  const cell = 48;
  const gap = 8;
  const h = 44;
  const y = 56;
  const { origin, xOf } = layout(chars.length, cell, gap);
  const right = step.right;
  const inWin = (i: number) => right !== null && i >= step.left && i <= right;
  const winLen = right !== null ? right - step.left + 1 : 0;

  return (
    <svg viewBox={`0 0 ${W} 268`} className="w-full" aria-hidden>
      {winLen > 0 && right !== null && (
        <WindowBand
          x={xOf(step.left)}
          y={y}
          w={winLen * cell + Math.max(winLen - 1, 0) * gap}
          h={h}
          label={`ยาว = ${winLen}`}
          color={step.shrinking ? ORANGE : TEAL}
        />
      )}

      {chars.map((ch, i) => {
        const x = xOf(i);
        const inside = inWin(i);
        const isRight = right === i;
        const isLeft = step.left === i && right !== null;
        return (
          <g key={i}>
            <Idx x={x + cell / 2} y={42} n={i} />
            <Cell
              x={x}
              y={y}
              w={cell}
              h={h}
              value={ch}
              fill={
                step.adding && isRight
                  ? ORANGE
                  : step.shrinking && isLeft
                    ? "#5a3a20"
                    : inside
                      ? "#196860"
                      : "#1a2030"
              }
              stroke={
                step.adding && isRight
                  ? GOLD
                  : step.shrinking && isLeft
                    ? ORANGE
                    : inside
                      ? TEAL
                      : "#3a4458"
              }
              ring={isRight ? (step.shrinking ? ORANGE : GOLD) : undefined}
              dim={!inside}
            />
          </g>
        );
      })}

      {right !== null && step.left === right && (
        <Pointer cx={xOf(step.left) + cell / 2} tipY={y + h + 8} label="L=R" color={TEAL} />
      )}
      {right !== null && step.left !== right && (
        <>
          <Pointer cx={xOf(step.left) + cell / 2} tipY={y + h + 8} label="L" color={TEAL} />
          <Pointer cx={xOf(right) + cell / 2} tipY={y + h + 8} label="R" color={GOLD} />
        </>
      )}

      <Label x={origin} y={228} text={`seen = { ${step.seen.join(" ")} }`} color={MUTED} />
      <text x={W - origin} y={228} textAnchor="end" fill={TEAL} fontSize={13} fontWeight={700} fontFamily={FONT}>
        {`best = ${step.best}`}
      </text>
    </svg>
  );
}

export function SlideFixedViz() {
  const steps = useMemo(() => buildFixedSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="SLIDING WINDOW · ขนาดคงที่ (fixed k)"
      pills={[
        { label: "k = 3", color: "#03A69B" },
        { label: "TIME  O(n)", color: "#3c78f0" },
      ]}
      message={step.msg}
      diagram={<FixedDiagram step={step} />}
      lines={FIXED_CODE}
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

export function SlideVariableViz() {
  const steps = useMemo(() => buildVarSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="SLIDING WINDOW · ขนาดยืดหยุ่น (variable)"
      pills={[
        { label: "EXPAND / SHRINK", color: "#D55D00" },
        { label: "TIME  O(n)", color: "#3c78f0" },
      ]}
      message={step.msg}
      diagram={<VarDiagram step={step} />}
      lines={VAR_CODE}
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
