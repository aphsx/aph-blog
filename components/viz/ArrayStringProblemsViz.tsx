"use client";

import { useMemo } from "react";
import { VizFrameView, useVizPlayback } from "@/components/viz/VizFrame";
import {
  GCD_STRINGS_CODE,
  buildGcdStringsSteps,
  type GcdStringsStep,
} from "@/lib/viz/gcd-of-strings";
import {
  KIDS_CANDIES_CODE,
  buildKidsCandiesSteps,
  type KidsCandiesStep,
} from "@/lib/viz/kids-candies";
import {
  CAN_PLACE_FLOWERS_CODE,
  buildCanPlaceFlowersSteps,
  type CanPlaceFlowersStep,
} from "@/lib/viz/can-place-flowers";
import {
  REVERSE_VOWELS_CODE,
  buildReverseVowelsSteps,
  type ReverseVowelsStep,
} from "@/lib/viz/reverse-vowels";
import {
  REVERSE_WORDS_CODE,
  buildReverseWordsSteps,
  type ReverseWordsStep,
} from "@/lib/viz/reverse-words";
import {
  PRODUCT_EXCEPT_SELF_CODE,
  buildProductExceptSelfSteps,
  type ProductExceptSelfStep,
} from "@/lib/viz/product-except-self";
import {
  INCREASING_TRIPLET_CODE,
  buildIncreasingTripletSteps,
  type IncreasingTripletStep,
} from "@/lib/viz/increasing-triplet";
import {
  STRING_COMPRESSION_CODE,
  buildStringCompressionSteps,
  type StringCompressionStep,
} from "@/lib/viz/string-compression";

const W = 720;
const GOLD = "#F7B700";
const ORANGE = "#D55D00";
const TEAL = "#03A69B";
const GREEN = "#3d9a6a";
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
  size = 15,
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
  size?: number;
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
        fontSize={size}
        fontWeight={700}
        fontFamily={FONT}
      >
        {value === " " ? "␣" : value}
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
    <text x={x} y={y} textAnchor={anchor} fill={color} fontSize={13} fontWeight={600} fontFamily={FONT}>
      {text}
    </text>
  );
}

function rowX(len: number, cell = 44, gap = 8, origin = 80) {
  const total = len * cell + Math.max(0, len - 1) * gap;
  const start = Math.max(origin, (W - total) / 2);
  return (k: number) => start + k * (cell + gap);
}

/* ───────── p02 GCD of Strings ───────── */

function GcdDiagram({ step }: { step: GcdStringsStep }) {
  const cell = 36;
  const gap = 6;
  const xOf1 = rowX(step.str1.length, cell, gap, 100);
  const xOf2 = rowX(step.str2.length, cell, gap, 100);
  const g = step.g ?? 0;

  const paint = (s: string, xOf: (k: number) => number, y: number, name: string, checking: boolean) => (
    <g>
      <Label x={16} y={y + 26} text={name} color={checking ? GOLD : MUTED} />
      {[...s].map((ch, k) => {
        const inCand = step.cand != null && k < (step.cand?.length ?? 0);
        const ok = checking && step.dividesOk === true;
        const bad = checking && step.dividesOk === false;
        return (
          <g key={`${name}-${k}`}>
            <Cell
              x={xOf(k)}
              y={y}
              w={cell}
              h={36}
              value={ch}
              fill={ok ? GREEN : bad ? ORANGE : inCand ? TEAL : "#1e2433"}
              stroke={inCand || checking ? GOLD : "#3a4050"}
              ring={inCand && g > 0 && k < g ? TEAL : undefined}
              size={14}
            />
            <Idx x={xOf(k) + cell / 2} y={y + 50} n={k} />
          </g>
        );
      })}
    </g>
  );

  return (
    <svg viewBox={`0 0 ${W} 220`} className="w-full" aria-hidden>
      {paint(step.str1, xOf1, 28, "str1", step.check === "str1")}
      {paint(step.str2, xOf2, 100, "str2", step.check === "str2")}
      <Label
        x={W / 2}
        y={180}
        text={
          step.result != null
            ? `result = "${step.result}"`
            : step.cand != null
              ? `cand = "${step.cand}"${step.g != null ? `  ·  g = ${step.g}` : ""}`
              : step.g != null
                ? `g = ${step.g}`
                : "หาบล็อกร่วมที่ยาวสุด"
        }
        color={GOLD}
        anchor="middle"
      />
    </svg>
  );
}

export function GcdOfStringsViz() {
  const steps = useMemo(() => buildGcdStringsSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title='Example 2 · str1 = "ABABAB"  str2 = "ABAB"'
      pills={[
        { label: "cand", color: TEAL },
        { label: "check", color: GOLD },
      ]}
      message={step.msg}
      diagram={<GcdDiagram step={step} />}
      lines={GCD_STRINGS_CODE}
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

/* ───────── p03 Kids Candies ───────── */

function KidsDiagram({ step }: { step: KidsCandiesStep }) {
  const cell = 52;
  const gap = 10;
  const xOf = rowX(step.candies.length, cell, gap, 60);

  return (
    <svg viewBox={`0 0 ${W} 210`} className="w-full" aria-hidden>
      <Label x={W / 2} y={22} text={step.best != null ? `best = ${step.best}` : "หา best"} color={GOLD} anchor="middle" />
      {step.candies.map((c, k) => {
        const on = step.i === k;
        const isBest = step.best != null && c === step.best;
        const ok = on && step.ok === true;
        const bad = on && step.ok === false;
        return (
          <g key={k}>
            {on && (
              <text x={xOf(k) + cell / 2} y={48} textAnchor="middle" fill={ok ? GREEN : bad ? ORANGE : TEAL} fontSize={14}>
                ▼
              </text>
            )}
            <Cell
              x={xOf(k)}
              y={56}
              w={cell}
              h={44}
              value={c}
              fill={ok ? GREEN : bad ? ORANGE : isBest ? TEAL : "#1e2433"}
              stroke={on || isBest ? GOLD : "#3a4050"}
              ring={on ? GOLD : undefined}
              size={18}
            />
            <Idx x={xOf(k) + cell / 2} y={116} n={k} />
            {on && step.sum != null && (
              <text x={xOf(k) + cell / 2} y={138} textAnchor="middle" fill={MUTED} fontSize={12} fontFamily={FONT}>
                {c}+{step.extra}={step.sum}
              </text>
            )}
          </g>
        );
      })}
      <Label
        x={W / 2}
        y={175}
        text={`result = [${step.result.map((b) => (b ? "true" : "false")).join(", ")}]`}
        color={GOLD}
        anchor="middle"
      />
    </svg>
  );
}

export function KidsCandiesViz() {
  const steps = useMemo(() => buildKidsCandiesSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="Example 1 · candies = [2,3,5,1,3]  extraCandies = 3"
      pills={[
        { label: "best", color: TEAL },
        { label: "check", color: GOLD },
      ]}
      message={step.msg}
      diagram={<KidsDiagram step={step} />}
      lines={KIDS_CANDIES_CODE}
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

/* ───────── p04 Can Place Flowers ───────── */

function FlowersDiagram({ step }: { step: CanPlaceFlowersStep }) {
  const cell = 52;
  const gap = 10;
  const xOf = rowX(step.bed.length, cell, gap, 60);

  return (
    <svg viewBox={`0 0 ${W} 190`} className="w-full" aria-hidden>
      {step.bed.map((v, k) => {
        const on = step.focus === k;
        const planted = on && step.planted;
        return (
          <g key={k}>
            {on && (
              <text x={xOf(k) + cell / 2} y={36} textAnchor="middle" fill={planted ? GREEN : ORANGE} fontSize={14}>
                ▼
              </text>
            )}
            <Cell
              x={xOf(k)}
              y={48}
              w={cell}
              h={44}
              value={v}
              fill={v === 1 ? (planted ? GREEN : TEAL) : "#1e2433"}
              stroke={on ? GOLD : "#3a4050"}
              ring={on ? GOLD : undefined}
              size={18}
            />
            <Idx x={xOf(k) + cell / 2} y={110} n={k} />
          </g>
        );
      })}
      <Label
        x={W / 2}
        y={150}
        text={`count = ${step.count} / n = ${step.n}${step.done ? "  ·  return True" : ""}`}
        color={GOLD}
        anchor="middle"
      />
    </svg>
  );
}

export function CanPlaceFlowersViz() {
  const steps = useMemo(() => buildCanPlaceFlowersSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="Example 1 · flowerbed = [1,0,0,0,1]  n = 1"
      pills={[
        { label: "empty 0", color: MUTED },
        { label: "planted 1", color: TEAL },
      ]}
      message={step.msg}
      diagram={<FlowersDiagram step={step} />}
      lines={CAN_PLACE_FLOWERS_CODE}
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

/* ───────── p05 Reverse Vowels ───────── */

function VowelsDiagram({ step }: { step: ReverseVowelsStep }) {
  const cell = 44;
  const gap = 8;
  const xOf = rowX(step.chars.length, cell, gap, 40);
  const vowels = new Set("aeiouAEIOU");

  return (
    <svg viewBox={`0 0 ${W} 180`} className="w-full" aria-hidden>
      {step.chars.map((ch, k) => {
        const isI = k === step.i && !step.done;
        const isJ = k === step.j && !step.done;
        const isVowel = vowels.has(ch);
        const swapping = step.action === "swap" && (isI || isJ);
        return (
          <g key={k}>
            {isI && (
              <text x={xOf(k) + cell / 2} y={28} textAnchor="middle" fill={TEAL} fontSize={13}>
                i
              </text>
            )}
            {isJ && (
              <text x={xOf(k) + cell / 2} y={28} textAnchor="middle" fill={ORANGE} fontSize={13}>
                j
              </text>
            )}
            <Cell
              x={xOf(k)}
              y={40}
              w={cell}
              h={40}
              value={ch}
              fill={swapping ? GOLD : isI || isJ ? TEAL : isVowel ? "#2a3548" : "#1e2433"}
              stroke={isI || isJ ? GOLD : "#3a4050"}
              ring={isI || isJ ? GOLD : undefined}
              dim={!isVowel && !isI && !isJ}
              size={16}
            />
            <Idx x={xOf(k) + cell / 2} y={98} n={k} />
          </g>
        );
      })}
      <Label
        x={W / 2}
        y={140}
        text={step.done ? `result = "${step.chars.join("")}"` : `i = ${step.i}   j = ${step.j}`}
        color={GOLD}
        anchor="middle"
      />
    </svg>
  );
}

export function ReverseVowelsViz() {
  const steps = useMemo(() => buildReverseVowelsSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title='Example 1 · s = "IceCreAm"'
      pills={[
        { label: "i", color: TEAL },
        { label: "j", color: ORANGE },
      ]}
      message={step.msg}
      diagram={<VowelsDiagram step={step} />}
      lines={REVERSE_VOWELS_CODE}
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

/* ───────── p06 Reverse Words ───────── */

function WordsDiagram({ step }: { step: ReverseWordsStep }) {
  const show = step.phase === "reverse" || step.phase === "join" ? step.rev : step.words;
  const cell = 88;
  const gap = 10;
  const xOf = rowX(Math.max(show.length, 1), cell, gap, 40);

  return (
    <svg viewBox={`0 0 ${W} 200`} className="w-full" aria-hidden>
      <Label x={W / 2} y={28} text={`s = ${JSON.stringify(step.s)}`} color={MUTED} anchor="middle" />
      {show.length === 0 ? (
        <Label x={W / 2} y={100} text="(ยังไม่มีคำ)" color={DIM} anchor="middle" />
      ) : (
        show.map((w, k) => (
          <g key={`${w}-${k}`}>
            <Cell
              x={xOf(k)}
              y={56}
              w={cell}
              h={44}
              value={w}
              fill={step.phase === "join" ? GREEN : step.phase === "reverse" ? ORANGE : TEAL}
              stroke={GOLD}
              size={14}
            />
            <Idx x={xOf(k) + cell / 2} y={118} n={k} />
          </g>
        ))
      )}
      <Label
        x={W / 2}
        y={160}
        text={step.result ? `result = "${step.result}"` : step.phase === "split" ? "หลัง split()" : step.phase === "reverse" ? "หลัง reverse" : ""}
        color={GOLD}
        anchor="middle"
      />
    </svg>
  );
}

export function ReverseWordsViz() {
  const steps = useMemo(() => buildReverseWordsSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title='Example 3 · s = "a good   example"'
      pills={[
        { label: "split", color: TEAL },
        { label: "reverse", color: ORANGE },
      ]}
      message={step.msg}
      diagram={<WordsDiagram step={step} />}
      lines={REVERSE_WORDS_CODE}
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

/* ───────── p07 Product Except Self ───────── */

function ProductDiagram({ step }: { step: ProductExceptSelfStep }) {
  const cell = 56;
  const gap = 12;
  const xOf = rowX(step.nums.length, cell, gap, 80);

  return (
    <svg viewBox={`0 0 ${W} 230`} className="w-full" aria-hidden>
      <Label x={16} y={40} text="nums" color={MUTED} />
      {step.nums.map((v, k) => (
        <g key={`n-${k}`}>
          <Cell
            x={xOf(k)}
            y={20}
            w={cell}
            h={40}
            value={v}
            fill={step.i === k ? TEAL : "#1e2433"}
            stroke={step.i === k ? GOLD : "#3a4050"}
            size={16}
          />
          <Idx x={xOf(k) + cell / 2} y={76} n={k} />
        </g>
      ))}
      <Label x={16} y={120} text="answer" color={MUTED} />
      {step.answer.map((v, k) => (
        <g key={`a-${k}`}>
          <Cell
            x={xOf(k)}
            y={100}
            w={cell}
            h={40}
            value={v}
            fill={step.i === k ? GOLD : "#1e2433"}
            stroke={step.i === k ? GOLD : "#3a4050"}
            size={16}
          />
        </g>
      ))}
      <Label
        x={W / 2}
        y={180}
        text={
          step.phase === "right" || step.phase === "done"
            ? `right = ${step.right}${step.phase === "done" ? "  ·  จบ" : ""}`
            : step.phase === "left"
              ? "left pass → ผลคูณทางซ้าย"
              : ""
        }
        color={GOLD}
        anchor="middle"
      />
    </svg>
  );
}

export function ProductExceptSelfViz() {
  const steps = useMemo(() => buildProductExceptSelfSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="Example 1 · nums = [1,2,3,4]"
      pills={[
        { label: "left pass", color: TEAL },
        { label: "right pass", color: GOLD },
      ]}
      message={step.msg}
      diagram={<ProductDiagram step={step} />}
      lines={PRODUCT_EXCEPT_SELF_CODE}
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

/* ───────── p08 Increasing Triplet ───────── */

function TripletDiagram({ step }: { step: IncreasingTripletStep }) {
  const cell = 52;
  const gap = 10;
  const xOf = rowX(step.nums.length, cell, gap, 50);
  const fmt = (v: number | "inf") => (v === "inf" ? "∞" : String(v));

  return (
    <svg viewBox={`0 0 ${W} 210`} className="w-full" aria-hidden>
      {step.nums.map((v, k) => {
        const on = step.cursor === k;
        return (
          <g key={k}>
            {on && (
              <text x={xOf(k) + cell / 2} y={28} textAnchor="middle" fill={GOLD} fontSize={14}>
                ▼
              </text>
            )}
            <Cell
              x={xOf(k)}
              y={40}
              w={cell}
              h={44}
              value={v}
              fill={
                step.found && on
                  ? GREEN
                  : on
                    ? step.highlight === "first"
                      ? TEAL
                      : step.highlight === "second"
                        ? ORANGE
                        : GOLD
                    : "#1e2433"
              }
              stroke={on ? GOLD : "#3a4050"}
              ring={on ? GOLD : undefined}
              size={18}
            />
            <Idx x={xOf(k) + cell / 2} y={102} n={k} />
          </g>
        );
      })}
      <Label
        x={W / 2}
        y={145}
        text={`first = ${fmt(step.first)}    second = ${fmt(step.second)}`}
        color={MUTED}
        anchor="middle"
      />
      <Label
        x={W / 2}
        y={175}
        text={step.found ? "พบตัวที่สาม → True" : ""}
        color={GREEN}
        anchor="middle"
      />
    </svg>
  );
}

export function IncreasingTripletViz() {
  const steps = useMemo(() => buildIncreasingTripletSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="Example 3 · nums = [2,1,5,0,4,6]"
      pills={[
        { label: "first", color: TEAL },
        { label: "second", color: ORANGE },
      ]}
      message={step.msg}
      diagram={<TripletDiagram step={step} />}
      lines={INCREASING_TRIPLET_CODE}
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

/* ───────── p09 String Compression ───────── */

function CompressionDiagram({ step }: { step: StringCompressionStep }) {
  const cell = 44;
  const gap = 8;
  const xOf = rowX(step.chars.length, cell, gap, 40);

  return (
    <svg viewBox={`0 0 ${W} 200`} className="w-full" aria-hidden>
      {step.chars.map((ch, k) => {
        const inGroup = step.groupStart >= 0 && k >= step.groupStart && k < step.groupEnd;
        const atRead = k === step.read && step.focus === "read";
        const atWrite = k === step.write && (step.focus === "write" || step.focus === "done");
        return (
          <g key={k}>
            {(atRead || (step.focus === "group" && k === step.read - 1)) && (
              <text x={xOf(k) + cell / 2} y={24} textAnchor="middle" fill={ORANGE} fontSize={11}>
                r
              </text>
            )}
            {atWrite && (
              <text x={xOf(k) + cell / 2} y={24} textAnchor="middle" fill={TEAL} fontSize={11}>
                w
              </text>
            )}
            <Cell
              x={xOf(k)}
              y={36}
              w={cell}
              h={40}
              value={ch}
              fill={atWrite ? GREEN : inGroup ? ORANGE : k < step.write ? TEAL : "#1e2433"}
              stroke={atRead || atWrite || inGroup ? GOLD : "#3a4050"}
              ring={atWrite ? TEAL : undefined}
              size={15}
            />
            <Idx x={xOf(k) + cell / 2} y={94} n={k} />
          </g>
        );
      })}
      <Label
        x={W / 2}
        y={140}
        text={`read = ${step.read}   write = ${step.write}${step.count ? `   count = ${step.count}` : ""}`}
        color={MUTED}
        anchor="middle"
      />
      <Label
        x={W / 2}
        y={170}
        text={step.focus === "done" ? `return write = ${step.write}` : ""}
        color={GOLD}
        anchor="middle"
      />
    </svg>
  );
}

export function StringCompressionViz() {
  const steps = useMemo(() => buildStringCompressionSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title='Example 1 · chars = ["a","a","b","b","c","c","c"]'
      pills={[
        { label: "read", color: ORANGE },
        { label: "write", color: TEAL },
      ]}
      message={step.msg}
      diagram={<CompressionDiagram step={step} />}
      lines={STRING_COMPRESSION_CODE}
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
