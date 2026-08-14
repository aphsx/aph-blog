"use client";

import { useMemo } from "react";
import { VizFrameView, useVizPlayback } from "@/components/viz/VizFrame";
import {
  ALT_CODE,
  ALT_GAIN,
  BUILD_CODE,
  BUILD_NUMS,
  PIVOT_CODE,
  PIVOT_NUMS,
  buildAltitudeSteps,
  buildPivotSteps,
  buildQuerySteps,
  type AltStep,
  type BuildStep,
  type PivotStep,
} from "@/lib/viz/prefix-sum";

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

function Label({ x, y, text, color = MUTED, anchor = "start" as const }: { x: number; y: number; text: string; color?: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={color}
      fontSize={11}
      fontWeight={700}
      fontFamily={FONT}
    >
      {text}
    </text>
  );
}

function BuildDiagram({ step }: { step: BuildStep }) {
  const nums = BUILD_NUMS;
  const cell = 56;
  const gap = 8;
  const stepX = cell + gap;
  const pW = nums.length * stepX + cell;
  const origin = (W - pW) / 2;
  const numsY = 44;
  const prefY = 148;
  const h = 44;

  const numX = (i: number) => origin + (i + 1) * stepX;
  const prefX = (k: number) => origin + k * stepX;

  const inQuery = (i: number) =>
    step.query !== null && i >= step.query.i && i <= step.query.j;

  return (
    <svg viewBox={`0 0 ${W} 268`} className="w-full" aria-hidden>
      <Label x={16} y={28} text="nums" />
      {nums.map((v, i) => {
        const writing = step.buildI === i;
        const q = inQuery(i);
        return (
          <g key={`n-${i}`}>
            <Idx x={numX(i) + cell / 2} y={38} n={i} />
            <Cell
              x={numX(i)}
              y={numsY}
              w={cell}
              h={h}
              value={v}
              fill={writing ? ORANGE : q ? "#196860" : "#2a3550"}
              stroke={writing ? GOLD : q ? TEAL : "#5a8fd8"}
              ring={q ? TEAL : undefined}
            />
          </g>
        );
      })}

      {step.buildI !== null && (
        <text
          x={numX(step.buildI) + cell / 2}
          y={numsY + h + 18}
          textAnchor="middle"
          fill={GOLD}
          fontSize={12}
          fontWeight={700}
          fontFamily={FONT}
        >
          ↓ +{nums[step.buildI]}
        </text>
      )}

      <Label x={16} y={132} text="prefix" />
      {step.prefix.map((v, k) => {
        const writing = step.buildI !== null && k === step.buildI + 1;
        const empty = v === null;
        const qEnd = step.query !== null && k === step.query.j + 1;
        const qStart = step.query !== null && k === step.query.i;
        const qHit = qEnd || qStart;
        return (
          <g key={`p-${k}`}>
            <Cell
              x={prefX(k)}
              y={prefY}
              w={cell}
              h={h}
              value={empty ? "·" : v}
              fill={writing ? ORANGE : qHit ? "#196860" : empty ? "#1a2030" : "#243c6e"}
              stroke={writing ? GOLD : qHit ? TEAL : empty ? "#3a4458" : BLUE}
              ring={qHit ? TEAL : undefined}
              dim={empty}
            />
            <Idx x={prefX(k) + cell / 2} y={prefY + h + 16} n={k} />
          </g>
        );
      })}

      {step.query && (
        <>
          <Label
            x={prefX(step.query.i) + cell / 2}
            y={prefY - 10}
            text="P[i]"
            color={TEAL}
            anchor="middle"
          />
          <Label
            x={prefX(step.query.j + 1) + cell / 2}
            y={prefY - 10}
            text="P[j+1]"
            color={TEAL}
            anchor="middle"
          />
        </>
      )}

      {step.result !== null && step.query && (
        <text
          x={W / 2}
          y={248}
          textAnchor="middle"
          fill={TEAL}
          fontSize={14}
          fontWeight={700}
          fontFamily={FONT}
        >
          {`P[${step.query.j + 1}] − P[${step.query.i}] = ${step.prefix[step.query.j + 1]} − ${step.prefix[step.query.i]} = ${step.result}`}
        </text>
      )}
    </svg>
  );
}

function AltitudeDiagram({ step }: { step: AltStep }) {
  const gain = ALT_GAIN;
  const nPts = gain.length + 1;
  const padL = 56;
  const padR = 36;
  const chartTop = 28;
  const chartBot = 186;
  const yMin = -7;
  const yMax = 2;
  const yOf = (a: number) =>
    chartBot - ((a - yMin) / (yMax - yMin)) * (chartBot - chartTop);
  const xOf = (i: number) => padL + (i * (W - padL - padR)) / (nPts - 1);

  const pts = step.altitudes.map((a, i) => ({ x: xOf(i), y: yOf(a), a }));
  const zeroY = yOf(0);
  const highY = yOf(step.highest);

  return (
    <svg viewBox={`0 0 ${W} 292`} className="w-full" aria-hidden>
      <line
        x1={padL}
        y1={zeroY}
        x2={W - padR}
        y2={zeroY}
        stroke="#3a4458"
        strokeDasharray="5 5"
      />
      <Label x={padL - 8} y={zeroY + 4} text="0" color={DIM} anchor="end" />

      <line
        x1={padL}
        y1={highY}
        x2={W - padR}
        y2={highY}
        stroke={TEAL}
        strokeDasharray="6 5"
        strokeWidth={1.5}
        opacity={0.85}
      />

      {pts.length > 1 && (
        <polyline
          points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="#5a8fd8"
          strokeWidth={3}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}

      {pts.map((p, i) => {
        const isCurr = i === pts.length - 1;
        const isPeak = p.a === step.highest;
        return (
          <g key={`pt-${i}`}>
            {isCurr && (
              <circle cx={p.x} cy={p.y} r={14} fill="none" stroke={GOLD} strokeWidth={3} />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={9}
              fill={isCurr ? ORANGE : isPeak ? TEAL : "#2a3550"}
              stroke={isCurr ? GOLD : isPeak ? TEAL : "#5a8fd8"}
              strokeWidth={2}
            />
            <text
              x={p.x}
              y={p.y - 16}
              textAnchor="middle"
              fill={isCurr ? GOLD : isPeak ? TEAL : MUTED}
              fontSize={11}
              fontWeight={700}
              fontFamily={FONT}
            >
              {p.a}
            </text>
          </g>
        );
      })}

      <Label x={16} y={214} text="gain" />
      {gain.map((g, i) => {
        const active = step.gainI === i;
        const done = step.altitudes.length > i + 1;
        const x1 = xOf(i);
        const x2 = xOf(i + 1);
        const cx = (x1 + x2) / 2;
        const bw = 52;
        return (
          <g key={`g-${i}`}>
            <Cell
              x={cx - bw / 2}
              y={224}
              w={bw}
              h={36}
              value={g > 0 ? `+${g}` : g}
              fill={active ? ORANGE : done ? "#196860" : "#1a2030"}
              stroke={active ? GOLD : done ? TEAL : "#3a4458"}
              dim={!active && !done}
            />
          </g>
        );
      })}

      <text x={16} y={284} fill={MUTED} fontSize={11} fontFamily={FONT}>
        {`altitude = ${step.altitude}    highest = ${step.highest}`}
      </text>
    </svg>
  );
}

function PivotDiagram({ step }: { step: PivotStep }) {
  const nums = PIVOT_NUMS;
  const cell = 56;
  const gap = 10;
  const rowW = nums.length * cell + (nums.length - 1) * gap;
  const origin = (W - rowW) / 2;
  const y = 40;
  const h = 48;

  const maxBar = 260;
  const scale = (v: number) => Math.max(v === 0 ? 8 : (Math.abs(v) / 28) * maxBar, 8);

  const role = (k: number): "left" | "curr" | "right" | "plain" => {
    if (step.i === null) return "plain";
    if (k < step.i) return "left";
    if (k === step.i) return "curr";
    return "right";
  };

  const fillOf = (k: number) => {
    const r = role(k);
    if (r === "curr") return step.matched ? TEAL : ORANGE;
    if (r === "left") return "#196860";
    if (r === "right") return "#5a3a20";
    return "#2a3550";
  };
  const strokeOf = (k: number) => {
    const r = role(k);
    if (r === "curr") return step.matched ? TEAL : GOLD;
    if (r === "left") return TEAL;
    if (r === "right") return ORANGE;
    return "#5a8fd8";
  };

  return (
    <svg viewBox={`0 0 ${W} 268`} className="w-full" aria-hidden>
      {nums.map((v, k) => {
        const x = origin + k * (cell + gap);
        const r = role(k);
        return (
          <g key={k}>
            <Idx x={x + cell / 2} y={32} n={k} />
            <Cell
              x={x}
              y={y}
              w={cell}
              h={h}
              value={v}
              fill={fillOf(k)}
              stroke={strokeOf(k)}
              ring={r === "curr" ? (step.matched ? TEAL : GOLD) : undefined}
            />
          </g>
        );
      })}

      <Label x={origin} y={112} text="ซ้าย (ไม่นับตัวเอง)" color={TEAL} />
      <Label x={origin + rowW} y={112} text="ขวา (ไม่นับตัวเอง)" color={ORANGE} anchor="end" />

      {step.total !== null && (
        <Label
          x={W / 2}
          y={112}
          text={`total = ${step.total}`}
          color={MUTED}
          anchor="middle"
        />
      )}

      <Label x={48} y={148} text="LEFT" color={TEAL} />
      <rect
        x={110}
        y={134}
        width={scale(step.leftSum)}
        height={18}
        rx={4}
        fill={step.matched ? TEAL : "#196860"}
      />
      <text x={110 + scale(step.leftSum) + 10} y={148} fill={TEAL} fontSize={13} fontWeight={700} fontFamily={FONT}>
        {step.leftSum}
      </text>

      <Label x={48} y={180} text="RIGHT" color={ORANGE} />
      {step.rightSum !== null ? (
        <>
          <rect
            x={110}
            y={166}
            width={scale(step.rightSum)}
            height={18}
            rx={4}
            fill={step.matched ? TEAL : ORANGE}
          />
          <text
            x={110 + scale(step.rightSum) + 10}
            y={180}
            fill={step.matched ? TEAL : ORANGE}
            fontSize={13}
            fontWeight={700}
            fontFamily={FONT}
          >
            {step.rightSum}
          </text>
        </>
      ) : (
        <text x={110} y={180} fill={DIM} fontSize={12} fontFamily={FONT}>
          —
        </text>
      )}

      {step.i !== null && step.n !== null && (
        <text x={W / 2} y={220} textAnchor="middle" fill={MUTED} fontSize={12} fontFamily={FONT}>
          {`right = total − left − nums[${step.i}] = ${step.total} − ${step.leftSum} − ${step.n}`}
        </text>
      )}

      {step.matched && step.answer !== null && (
        <text x={W / 2} y={246} textAnchor="middle" fill={TEAL} fontSize={14} fontWeight={700} fontFamily={FONT}>
          {`สมดุลที่ index ${step.answer}`}
        </text>
      )}
    </svg>
  );
}

export function PrefixBuildViz() {
  const steps = useMemo(() => buildQuerySteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="PREFIX SUM · สร้างแล้วถามช่วง"
      pills={[
        { label: "BUILD  O(n)", color: "#3c78f0" },
        { label: "QUERY  O(1)", color: "#03A69B" },
      ]}
      message={step.msg}
      diagram={<BuildDiagram step={step} />}
      lines={BUILD_CODE}
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

export function AltitudeViz() {
  const steps = useMemo(() => buildAltitudeSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="FIND THE HIGHEST ALTITUDE"
      pills={[
        { label: "TIME  O(n)", color: "#3c78f0" },
        { label: "SPACE  O(1)", color: "#f05a96" },
      ]}
      message={step.msg}
      diagram={<AltitudeDiagram step={step} />}
      lines={ALT_CODE}
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

export function PivotIndexViz() {
  const steps = useMemo(() => buildPivotSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="FIND PIVOT INDEX"
      pills={[
        { label: "TIME  O(n)", color: "#3c78f0" },
        { label: "SPACE  O(1)", color: "#f05a96" },
      ]}
      message={step.msg}
      diagram={<PivotDiagram step={step} />}
      lines={PIVOT_CODE}
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
