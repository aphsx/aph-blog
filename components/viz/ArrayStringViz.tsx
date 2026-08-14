"use client";

import { useMemo } from "react";
import { VizFrameView, useVizPlayback } from "@/components/viz/VizFrame";
import {
  ALIAS_CODE,
  CONCAT_CODE,
  INSERT_CODE,
  INDEX_CODE,
  LOOP_CODE,
  NESTED_CODE,
  buildAliasSteps,
  buildConcatSteps,
  buildInsertSteps,
  buildIndexSteps,
  buildLoopSteps,
  buildNestedSteps,
  type AliasStep,
  type ConcatStep,
  type InsertStep,
  type IndexStep,
  type LoopStep,
  type NestedStep,
} from "@/lib/viz/array-string";
import {
  MERGE_ALT_CODE,
  buildMergeAltSteps,
  type MergeAltStep,
} from "@/lib/viz/merge-alternately";

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
    <text x={x} y={y} textAnchor={anchor} fill={color} fontSize={11} fontWeight={700} fontFamily={FONT}>
      {text}
    </text>
  );
}

function NameChip({ x, y, name, color }: { x: number; y: number; name: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width={26} height={20} rx={4} fill={color} />
      <text
        x={x + 13}
        y={y + 15}
        textAnchor="middle"
        fill="#0c0e16"
        fontSize={12}
        fontWeight={800}
        fontFamily={FONT}
      >
        {name}
      </text>
    </g>
  );
}

function AliasDiagram({ step }: { step: AliasStep }) {
  const cell = 48;
  const gap = 10;
  const h = 40;
  const listX = 120;
  const listY = 36;

  const strCell = 34;
  const strGap = 5;
  const strH = 34;
  const strX = 120;

  const listRowW = Math.max(step.list.length, 1) * cell + Math.max(step.list.length - 1, 0) * gap;

  const charsOf = (v: string | null) => (v === null ? [] : [...v]);
  const sChars = charsOf(step.s);
  const tChars = charsOf(step.t);
  const showTRow = step.t !== null && !step.stSame;
  const strY = showTRow ? 148 : 168;

  return (
    <svg viewBox={`0 0 ${W} 268`} className="w-full" aria-hidden>
      <Label x={16} y={24} text="list" color={step.listFocus ? TEAL : DIM} />
      {step.aOn && <NameChip x={16} y={listY + 10} name="a" color={TEAL} />}
      {step.bOn && <NameChip x={16} y={listY + 34} name="b" color={BLUE} />}

      {step.aOn && (
        <line
          x1={44}
          y1={listY + 20}
          x2={listX - 6}
          y2={listY + h / 2}
          stroke={TEAL}
          strokeWidth={2}
        />
      )}
      {step.bOn && (
        <line
          x1={44}
          y1={listY + 44}
          x2={listX - 6}
          y2={listY + h / 2 + 8}
          stroke={BLUE}
          strokeWidth={2}
        />
      )}

      {step.list.length === 0 && (
        <text x={listX} y={listY + 28} fill={DIM} fontSize={13} fontFamily={FONT}>
          (ยังว่าง)
        </text>
      )}
      {step.list.map((v, i) => {
        const x = listX + i * (cell + gap);
        const isNew = step.newCell && i === step.list.length - 1;
        return (
          <g key={`l-${i}`}>
            <Idx x={x + cell / 2} y={listY - 6} n={i} />
            <Cell
              x={x}
              y={listY}
              w={cell}
              h={h}
              value={v}
              fill={isNew ? ORANGE : "#196860"}
              stroke={isNew ? GOLD : TEAL}
              ring={isNew ? GOLD : undefined}
            />
          </g>
        );
      })}
      {step.aOn && step.bOn && (
        <Label x={listX + listRowW + 12} y={listY + 26} text="ก้อนเดียวกัน" color={TEAL} />
      )}

      <line x1={16} y1={118} x2={W - 16} y2={118} stroke="#2a3040" strokeWidth={1} />

      <Label x={16} y={136} text="str" color={!step.listFocus ? GOLD : DIM} />
      {step.s !== null && <NameChip x={16} y={strY + 7} name="s" color={GOLD} />}
      {step.t !== null && (
        <NameChip
          x={16}
          y={showTRow ? strY + strH + 22 : strY + 31}
          name="t"
          color={step.stSame ? GOLD : ORANGE}
        />
      )}

      {step.s !== null && (
        <line
          x1={44}
          y1={strY + 17}
          x2={strX - 6}
          y2={strY + strH / 2}
          stroke={GOLD}
          strokeWidth={2}
        />
      )}
      {step.t !== null && !showTRow && (
        <line
          x1={44}
          y1={strY + 41}
          x2={strX - 6}
          y2={strY + strH / 2 + 6}
          stroke={GOLD}
          strokeWidth={2}
        />
      )}
      {showTRow && (
        <line
          x1={44}
          y1={strY + strH + 32}
          x2={strX - 6}
          y2={strY + strH + 18 + strH / 2}
          stroke={ORANGE}
          strokeWidth={2}
        />
      )}

      {sChars.map((ch, i) => {
        const x = strX + i * (strCell + strGap);
        return (
          <Cell
            key={`s-${i}`}
            x={x}
            y={strY}
            w={strCell}
            h={strH}
            value={ch}
            fill="#2a3550"
            stroke={GOLD}
            size={13}
          />
        );
      })}
      {step.s !== null && step.stSame && (
        <Label
          x={strX + sChars.length * (strCell + strGap) + 8}
          y={strY + 22}
          text="ก้อนเดียวกัน"
          color={GOLD}
        />
      )}

      {showTRow &&
        tChars.map((ch, i) => {
          const x = strX + i * (strCell + strGap);
          const isNew = step.newStr;
          return (
            <Cell
              key={`t-${i}`}
              x={x}
              y={strY + strH + 18}
              w={strCell}
              h={strH}
              value={ch}
              fill={isNew ? ORANGE : "#5a3a20"}
              stroke={isNew ? GOLD : ORANGE}
              ring={isNew ? GOLD : undefined}
              size={13}
            />
          );
        })}
      {showTRow && (
        <Label
          x={strX + tChars.length * (strCell + strGap) + 8}
          y={strY + strH + 40}
          text="ป้ายใหม่"
          color={ORANGE}
        />
      )}
    </svg>
  );
}

function InsertDiagram({ step }: { step: InsertStep }) {
  const cell = 56;
  const gap = 12;
  const h = 48;
  const n = Math.max(step.cells.length, 1);
  const rowW = n * cell + (n - 1) * gap;
  const origin = (W - rowW) / 2;
  const y = 56;
  const xOf = (i: number) => origin + i * (cell + gap);

  return (
    <svg viewBox={`0 0 ${W} 268`} className="w-full" aria-hidden>
      <Label
        x={W / 2}
        y={22}
        text={step.mode === "insert" ? "insert(0, 99)" : "append(99)"}
        color={step.mode === "insert" ? ORANGE : TEAL}
        anchor="middle"
      />

      {step.cells.map((v, i) => {
        const x = xOf(i);
        const isFrom = step.from === i;
        const isTo = step.to === i;
        const isWrite = step.writing === i;
        const empty = v === null;
        return (
          <g key={i}>
            <Idx x={x + cell / 2} y={46} n={i} />
            <Cell
              x={x}
              y={y}
              w={cell}
              h={h}
              value={empty ? "·" : v}
              fill={
                isWrite ? ORANGE : isTo ? "#5a3a20" : isFrom ? "#196860" : empty ? "#1a2030" : "#2a3550"
              }
              stroke={isWrite || isTo ? GOLD : isFrom ? TEAL : empty ? "#3a4458" : "#5a8fd8"}
              ring={isWrite || isTo ? GOLD : isFrom ? TEAL : undefined}
              dim={empty}
            />
          </g>
        );
      })}

      {step.from !== null && step.to !== null && (
        <text
          x={(xOf(step.from) + xOf(step.to)) / 2 + cell / 2}
          y={y + h + 28}
          textAnchor="middle"
          fill={GOLD}
          fontSize={13}
          fontWeight={700}
          fontFamily={FONT}
        >
          {`${step.from} → ${step.to}`}
        </text>
      )}

      <text x={W / 2} y={248} textAnchor="middle" fill={MUTED} fontSize={13} fontFamily={FONT}>
        {`ขยับแล้ว ${step.shifts} ตัว`}
      </text>
    </svg>
  );
}

function ConcatDiagram({ step }: { step: ConcatStep }) {
  const chars = step.s === "" ? [] : [...step.s];
  const cell = 48;
  const gap = 10;
  const h = 44;
  const n = Math.max(chars.length, 1);
  const rowW = n * cell + (n - 1) * gap;
  const origin = (W - rowW) / 2;
  const y = 72;

  return (
    <svg viewBox={`0 0 ${W} 268`} className="w-full" aria-hidden>
      <Label
        x={W / 2}
        y={24}
        text={step.phase === "join" ? '"".join(...)' : "s = s + c"}
        color={step.phase === "join" ? TEAL : ORANGE}
        anchor="middle"
      />

      {chars.length === 0 && (
        <text x={W / 2} y={y + 28} textAnchor="middle" fill={DIM} fontSize={14} fontFamily={FONT}>
          ""
        </text>
      )}
      {chars.map((ch, i) => {
        const x = origin + i * (cell + gap);
        const copied = step.copiedNow > 0 && i >= chars.length - step.copiedNow;
        const fill =
          step.phase === "join" ? "#196860" : copied ? ORANGE : "#2a3550";
        const stroke = step.phase === "join" ? TEAL : copied ? GOLD : "#5a8fd8";
        return (
          <g key={i}>
            <Idx x={x + cell / 2} y={62} n={i} />
            <Cell
              x={x}
              y={y}
              w={cell}
              h={h}
              value={ch}
              fill={fill}
              stroke={stroke}
              ring={copied ? (step.phase === "join" ? TEAL : GOLD) : undefined}
            />
          </g>
        );
      })}

      {step.adding && step.phase === "concat" && (
        <Label
          x={W / 2}
          y={y + h + 32}
          text={`กำลังต่อ + '${step.adding}'`}
          color={GOLD}
          anchor="middle"
        />
      )}

      <text x={W / 2} y={228} textAnchor="middle" fill={MUTED} fontSize={13} fontFamily={FONT}>
        {step.copiedNow > 0
          ? `คัดลอกรอบนี้ ${step.copiedNow}  · รวม ${step.copiedTotal}`
          : `คัดลอกรวม ${step.copiedTotal}`}
      </text>
    </svg>
  );
}

function IndexDiagram({ step }: { step: IndexStep }) {
  const cell = 64;
  const gap = 14;
  const h = 52;
  const n = step.nums.length;
  const rowW = n * cell + (n - 1) * gap;
  const origin = (W - rowW) / 2;
  const y = 72;
  const xOf = (i: number) => origin + i * (cell + gap);

  return (
    <svg viewBox={`0 0 ${W} 200`} className="w-full" aria-hidden>
      <Label x={W / 2} y={28} text="เลขช่อง (index) เริ่มที่ 0" color={MUTED} anchor="middle" />
      {step.nums.map((v, i) => {
        const on = step.hi === i;
        return (
          <g key={i}>
            {on && (
              <text x={xOf(i) + cell / 2} y={58} textAnchor="middle" fill={TEAL} fontSize={16}>
                ▼
              </text>
            )}
            <Cell
              x={xOf(i)}
              y={y}
              w={cell}
              h={h}
              value={v}
              fill={on ? TEAL : "#1e2433"}
              stroke={on ? GOLD : "#3a4050"}
              ring={on ? GOLD : undefined}
              size={18}
            />
            <Idx x={xOf(i) + cell / 2} y={y + h + 22} n={i} />
          </g>
        );
      })}
    </svg>
  );
}

function LoopDiagram({ step }: { step: LoopStep }) {
  const cell = 64;
  const gap = 14;
  const h = 52;
  const n = step.nums.length;
  const rowW = n * cell + (n - 1) * gap;
  const origin = (W - rowW) / 2;
  const y = 80;
  const xOf = (i: number) => origin + i * (cell + gap);
  const phaseLabel =
    step.phase === "for" ? "for x in nums" : step.phase === "while" ? "while + i" : "for i in range";
  const phaseColor = step.phase === "for" ? TEAL : step.phase === "while" ? ORANGE : BLUE;

  return (
    <svg viewBox={`0 0 ${W} 220`} className="w-full" aria-hidden>
      <Label x={W / 2} y={24} text={phaseLabel} color={phaseColor} anchor="middle" />
      {step.i !== null && (
        <Label x={W / 2} y={44} text={`i = ${step.i}`} color={GOLD} anchor="middle" />
      )}
      {step.nums.map((v, i) => {
        const on = step.hi === i;
        return (
          <g key={i}>
            {on && (
              <text x={xOf(i) + cell / 2} y={66} textAnchor="middle" fill={phaseColor} fontSize={16}>
                ▼
              </text>
            )}
            <Cell
              x={xOf(i)}
              y={y}
              w={cell}
              h={h}
              value={v}
              fill={on ? phaseColor : "#1e2433"}
              stroke={on ? GOLD : "#3a4050"}
              ring={on ? GOLD : undefined}
              size={18}
              dim={!on && step.hi !== null}
            />
            <Idx x={xOf(i) + cell / 2} y={y + h + 22} n={i} />
          </g>
        );
      })}
      {step.x !== null && (
        <Label
          x={W / 2}
          y={208}
          text={step.phase === "for" ? `x = ${step.x}` : `nums[i] = ${step.x}`}
          color={GOLD}
          anchor="middle"
        />
      )}
    </svg>
  );
}

function NestedDiagram({ step }: { step: NestedStep }) {
  const cell = 56;
  const gap = 12;
  const h = 48;
  const cols = 3;
  const rowW = cols * cell + (cols - 1) * gap;
  const origin = (W - rowW) / 2;
  const y0 = 48;

  return (
    <svg viewBox={`0 0 ${W} 220`} className="w-full" aria-hidden>
      <Label x={W / 2} y={24} text="grid[r][c]" color={MUTED} anchor="middle" />
      {step.grid.map((row, r) =>
        row.map((v, c) => {
          const x = origin + c * (cell + gap);
          const y = y0 + r * (h + 28);
          const rowOn = step.r === r && step.c === null;
          const on = step.r === r && step.c === c;
          return (
            <g key={`${r}-${c}`}>
              <Cell
                x={x}
                y={y}
                w={cell}
                h={h}
                value={v}
                fill={on ? TEAL : rowOn ? "#1a3a34" : "#1e2433"}
                stroke={on ? GOLD : rowOn ? TEAL : "#3a4050"}
                ring={on ? GOLD : undefined}
                size={18}
                dim={step.r !== null && step.r !== r}
              />
              <text
                x={x + cell / 2}
                y={y + h + 16}
                textAnchor="middle"
                fill={DIM}
                fontSize={10}
                fontFamily={FONT}
              >
                [{r}][{c}]
              </text>
            </g>
          );
        }),
      )}
    </svg>
  );
}

export function ArrayIndexViz() {
  const steps = useMemo(() => buildIndexSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="INDEX · เลขช่องเริ่มที่ 0"
      pills={[{ label: "INDEX 0", color: "#03A69B" }]}
      message={step.msg}
      diagram={<IndexDiagram step={step} />}
      lines={INDEX_CODE}
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

export function ArrayLoopViz() {
  const steps = useMemo(() => buildLoopSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="LOOP · for / while / range"
      pills={[
        { label: "FOR", color: "#03A69B" },
        { label: "WHILE", color: "#D55D00" },
        { label: "RANGE", color: "#64b4ff" },
      ]}
      message={step.msg}
      diagram={<LoopDiagram step={step} />}
      lines={LOOP_CODE}
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

export function ArrayNestedViz() {
  const steps = useMemo(() => buildNestedSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="แถวสองชั้น · ลูปนอก × ลูปใน"
      pills={[{ label: "NESTED", color: "#03A69B" }]}
      message={step.msg}
      diagram={<NestedDiagram step={step} />}
      lines={NESTED_CODE}
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

export function ArrayAliasViz() {
  const steps = useMemo(() => buildAliasSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="LIST vs STRING · ก้อนเดิม หรือ ป้ายใหม่"
      pills={[
        { label: "MUTABLE", color: "#03A69B" },
        { label: "IMMUTABLE", color: "#D55D00" },
      ]}
      message={step.msg}
      diagram={<AliasDiagram step={step} />}
      lines={ALIAS_CODE}
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

export function ArrayInsertViz() {
  const steps = useMemo(() => buildInsertSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="INSERT(0) vs APPEND · ทำไมราคาต่างกัน"
      pills={[
        { label: "INSERT  O(n)", color: "#D55D00" },
        { label: "APPEND  O(1)", color: "#03A69B" },
      ]}
      message={step.msg}
      diagram={<InsertDiagram step={step} />}
      lines={INSERT_CODE}
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

export function ArrayConcatViz() {
  const steps = useMemo(() => buildConcatSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title="STRING +=  vs  JOIN · นับการคัดลอก"
      pills={[
        { label: "+=  O(n²)", color: "#D55D00" },
        { label: "JOIN  O(n)", color: "#03A69B" },
      ]}
      message={step.msg}
      diagram={<ConcatDiagram step={step} />}
      lines={CONCAT_CODE}
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

function MergeAltDiagram({ step }: { step: MergeAltStep }) {
  const cell = 48;
  const gap = 10;
  const h = 42;
  const y1 = 40;
  const y2 = 110;
  const origin = 90;
  const xOf = (k: number) => origin + k * (cell + gap);

  const drawRow = (s: string, y: number, cursor: number, name: string, color: string, pickThis: boolean) => (
    <g>
      <Label x={16} y={y + 28} text={name} color={color} />
      {[...s].map((ch, k) => {
        const taken = k < cursor;
        const on = pickThis && k === cursor;
        const leftover = step.pick === "tail" && k >= cursor;
        return (
          <g key={`${name}-${k}`}>
            {on && (
              <text x={xOf(k) + cell / 2} y={y - 8} textAnchor="middle" fill={color} fontSize={14}>
                ▼
              </text>
            )}
            <Cell
              x={xOf(k)}
              y={y}
              w={cell}
              h={h}
              value={ch}
              fill={on ? color : leftover ? GOLD : taken ? "#1a1e28" : "#1e2433"}
              stroke={on || leftover ? GOLD : "#3a4050"}
              ring={on || leftover ? GOLD : undefined}
              dim={taken && !on}
              size={18}
            />
            <Idx x={xOf(k) + cell / 2} y={y + h + 18} n={k} />
          </g>
        );
      })}
    </g>
  );

  return (
    <svg viewBox={`0 0 ${W} 248`} className="w-full" aria-hidden>
      {drawRow(step.w1, y1, step.i, "word1", TEAL, step.pick === "w1")}
      {drawRow(step.w2, y2, step.j, "word2", ORANGE, step.pick === "w2")}
      <Label x={W / 2} y={192} text={`i = ${step.i}   j = ${step.j}`} color={MUTED} anchor="middle" />
      <text x={W / 2} y={228} textAnchor="middle" fill={GOLD} fontSize={18} fontWeight={800} fontFamily={FONT}>
        merged = {step.merged ? `"${step.merged}"` : '""'}
      </text>
    </svg>
  );
}

export function MergeAlternatelyViz() {
  const steps = useMemo(() => buildMergeAltSteps(), []);
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title='MERGE · word1 = "ab"  word2 = "pqrs"'
      pills={[
        { label: "word1", color: "#03A69B" },
        { label: "word2", color: "#D55D00" },
      ]}
      message={step.msg}
      diagram={<MergeAltDiagram step={step} />}
      lines={MERGE_ALT_CODE}
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
