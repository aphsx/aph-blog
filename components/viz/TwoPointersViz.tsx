"use client";

import { useMemo } from "react";
import { VizFrameView, useVizPlayback } from "@/components/viz/VizFrame";
import {
  OPPOSITE_CODE,
  OPPOSITE_NUMS,
  OPPOSITE_TARGET,
  SLOWFAST_CODE,
  buildOppositeSteps,
  buildSlowFastSteps,
  type OppositeStep,
  type SlowFastStep,
} from "@/lib/viz/two-pointers";

const W = 720;
const GOLD = "#F7B700";
const ORANGE = "#D55D00";
const TEAL = "#03A69B";
const BLUE = "#64b4ff";
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
  from,
}: {
  cx: number;
  tipY: number;
  label: string;
  color: string;
  from: "below" | "above";
}) {
  const boxW = label.length > 1 ? 28 : 22;
  const boxH = 18;
  const tri =
    from === "below"
      ? `${cx},${tipY} ${cx - 6},${tipY + 8} ${cx + 6},${tipY + 8}`
      : `${cx},${tipY} ${cx - 6},${tipY - 8} ${cx + 6},${tipY - 8}`;
  const boxY = from === "below" ? tipY + 8 : tipY - 8 - boxH;
  return (
    <g>
      <polygon points={tri} fill={color} />
      <rect x={cx - boxW / 2} y={boxY} width={boxW} height={boxH} rx={4} fill={color} />
      <text
        x={cx}
        y={boxY + 13}
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

function isFoundIndex(found: [number, number][], i: number) {
  return found.some(([a, b]) => a === i || b === i);
}

function OppositeDiagram({ step }: { step: OppositeStep }) {
  const nums = OPPOSITE_NUMS;
  const cell = 56;
  const gap = 14;
  const h = 48;
  const rowW = nums.length * cell + (nums.length - 1) * gap;
  const origin = (W - rowW) / 2;
  const y = 52;
  const xOf = (i: number) => origin + i * (cell + gap);

  const fillOf = (i: number) => {
    if (step.left === i || step.right === i) {
      if (step.cmp === "eq") return TEAL;
      if (step.left === i) return "#196860";
      return ORANGE;
    }
    if (isFoundIndex(step.found, i)) return "#196860";
    if (step.dead.includes(i)) return "#1a2030";
    return "#2a3550";
  };
  const strokeOf = (i: number) => {
    if (step.left === i || step.right === i) {
      if (step.cmp === "eq") return TEAL;
      if (step.left === i) return TEAL;
      return GOLD;
    }
    if (isFoundIndex(step.found, i)) return TEAL;
    if (step.dead.includes(i)) return "#3a4458";
    return "#5a8fd8";
  };
  const ringOf = (i: number) => {
    if (step.cmp === "eq" && (step.left === i || step.right === i)) return TEAL;
    if (step.left === i) return TEAL;
    if (step.right === i) return GOLD;
    return undefined;
  };

  const cmpColor = step.cmp === "eq" ? TEAL : step.cmp === "lt" ? ORANGE : step.cmp === "gt" ? GOLD : MUTED;
  const cmpSign = step.cmp === "eq" ? "=" : step.cmp === "lt" ? "<" : step.cmp === "gt" ? ">" : "";
  const foundLabel =
    step.found.length === 0
      ? "เจอแล้ว: —"
      : `เจอแล้ว: ${step.found.map(([a, b]) => `(${nums[a]}, ${nums[b]})`).join("  ")}`;

  return (
    <svg viewBox={`0 0 ${W} 268`} className="w-full" aria-hidden>
      <Label x={W / 2} y={22} text={`target = ${OPPOSITE_TARGET}`} color={MUTED} anchor="middle" />

      {nums.map((v, i) => {
        const x = xOf(i);
        const dead = step.dead.includes(i) && step.left !== i && step.right !== i;
        return (
          <g key={i}>
            <Idx x={x + cell / 2} y={42} n={i} />
            <Cell
              x={x}
              y={y}
              w={cell}
              h={h}
              value={v}
              fill={fillOf(i)}
              stroke={strokeOf(i)}
              ring={ringOf(i)}
              dim={dead}
            />
          </g>
        );
      })}

      {step.left !== null && (
        <Pointer
          cx={xOf(step.left) + cell / 2}
          tipY={y + h + 6}
          label="L"
          color={TEAL}
          from="below"
        />
      )}
      {step.right !== null && (
        <Pointer
          cx={xOf(step.right) + cell / 2}
          tipY={y + h + 6}
          label="R"
          color={step.cmp === "eq" ? TEAL : GOLD}
          from="below"
        />
      )}

      {step.total !== null && step.left !== null && step.right !== null && (
        <text x={W / 2} y={196} textAnchor="middle" fill={cmpColor} fontSize={15} fontWeight={700} fontFamily={FONT}>
          {`${nums[step.left]} + ${nums[step.right]} = ${step.total}   ${cmpSign}   ${OPPOSITE_TARGET}`}
        </text>
      )}

      <text x={origin} y={228} fill={TEAL} fontSize={12} fontWeight={700} fontFamily={FONT}>
        {foundLabel}
      </text>
      <text x={origin + rowW} y={228} textAnchor="end" fill={MUTED} fontSize={12} fontFamily={FONT}>
        {`เทียบแล้ว ${step.compares} ครั้ง`}
      </text>
    </svg>
  );
}

function SlowFastDiagram({ step }: { step: SlowFastStep }) {
  const cell = 56;
  const gap = 14;
  const h = 48;
  const n = step.nums.length;
  const rowW = n * cell + (n - 1) * gap;
  const origin = (W - rowW) / 2;
  const y = 52;
  const xOf = (i: number) => origin + i * (cell + gap);

  const kept = (i: number) => i < step.slow;
  const isSlow = (i: number) => i === step.slow && !step.done;
  const isFast = (i: number) => step.fast === i;

  const fillOf = (i: number) => {
    if (step.done) return kept(i) ? "#196860" : "#1a2030";
    if (step.writing && (isSlow(i) || isFast(i))) return ORANGE;
    if (isFast(i) && step.skip) return "#5a3a20";
    if (isFast(i)) return ORANGE;
    if (kept(i)) return "#196860";
    if (isSlow(i)) return "#243c6e";
    return "#2a3550";
  };
  const strokeOf = (i: number) => {
    if (step.done) return kept(i) ? TEAL : "#3a4458";
    if (step.writing && (isSlow(i) || isFast(i))) return GOLD;
    if (isFast(i) && step.skip) return ORANGE;
    if (isFast(i)) return GOLD;
    if (kept(i)) return TEAL;
    if (isSlow(i)) return BLUE;
    return "#5a8fd8";
  };

  const slowCx = xOf(Math.min(step.slow, n - 1)) + cell / 2;
  const fastCx = step.fast !== null ? xOf(step.fast) + cell / 2 : null;

  return (
    <svg viewBox={`0 0 ${W} 268`} className="w-full" aria-hidden>
      {step.fast !== null && (
        <Pointer cx={fastCx!} tipY={y - 6} label="F" color={step.skip ? ORANGE : GOLD} from="above" />
      )}

      {step.nums.map((v, i) => {
        const x = xOf(i);
        return (
          <g key={i}>
            <Cell
              x={x}
              y={y}
              w={cell}
              h={h}
              value={v}
              fill={fillOf(i)}
              stroke={strokeOf(i)}
              ring={
                isFast(i)
                  ? step.skip
                    ? ORANGE
                    : GOLD
                  : isSlow(i)
                    ? BLUE
                    : undefined
              }
              dim={step.done && !kept(i)}
            />
            <Idx x={x + cell / 2} y={step.done ? y + h + 18 : y + h + 48} n={i} />
          </g>
        );
      })}

      {!step.done && (
        <Pointer cx={slowCx} tipY={y + h + 6} label="S" color={BLUE} from="below" />
      )}

      {step.slow > 0 && (
        <rect
          x={xOf(0)}
          y={y + h + (step.done ? 6 : 38)}
          width={step.slow * cell + Math.max(step.slow - 1, 0) * gap}
          height={4}
          rx={2}
          fill={TEAL}
        />
      )}

      {step.fast !== null && !step.done && (
        <text x={W / 2} y={248} textAnchor="middle" fill={MUTED} fontSize={12} fontFamily={FONT}>
          {`slow = ${step.slow}    fast = ${step.fast}    slow ≤ fast ${step.slow <= step.fast ? "✓" : "✗"}`}
        </text>
      )}
      {step.done && (
        <text x={W / 2} y={248} textAnchor="middle" fill={TEAL} fontSize={13} fontWeight={700} fontFamily={FONT}>
          {`ผลลัพธ์ nums[:slow] = [${step.nums.slice(0, step.slow).join(", ")}]`}
        </text>
      )}
    </svg>
  );
}

export function OppositeEndsViz() {
  const steps = useMemo(() => buildOppositeSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="TWO POINTERS · หัวกับท้ายเดินเข้าหากัน"
      pills={[
        { label: "TIME  O(n)", color: "#3c78f0" },
        { label: "SPACE  O(1)", color: "#f05a96" },
      ]}
      message={step.msg}
      diagram={<OppositeDiagram step={step} />}
      lines={OPPOSITE_CODE}
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

export function SlowFastViz() {
  const steps = useMemo(() => buildSlowFastSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="TWO POINTERS · มือช้า / มือเร็ว"
      pills={[
        { label: "IN-PLACE", color: "#03A69B" },
        { label: "SPACE  O(1)", color: "#f05a96" },
      ]}
      message={step.msg}
      diagram={<SlowFastDiagram step={step} />}
      lines={SLOWFAST_CODE}
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
