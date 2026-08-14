"use client";

import { useMemo, type ReactNode } from "react";
import { VizFrameView, useVizPlayback } from "@/components/viz/VizFrame";
import {
  CLOSE_CODE,
  CLOSE_W1,
  CLOSE_W2,
  DIFF_A,
  DIFF_B,
  DIFF_CODE,
  FREQ_ARR,
  FREQ_CODE,
  PAIRS_CODE,
  PAIRS_GRID,
  SCAN_A,
  SCAN_B,
  SCAN_CODE,
  SEEN_CODE,
  SEEN_NUMS,
  SEEN_TARGET,
  SLOT_CODE,
  SLOT_N,
  buildCloseSteps,
  buildDiffSteps,
  buildFreqSteps,
  buildPairsSteps,
  buildScanSteps,
  buildSeenSteps,
  buildSlotSteps,
  type CloseStep,
  type DiffStep,
  type FreqStep,
  type PairsStep,
  type ScanStep,
  type SeenStep,
  type SlotStep,
} from "@/lib/viz/hashmap";

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

function rowX(n: number, cell: number, gap: number) {
  const w = n * cell + (n - 1) * gap;
  return { origin: (W - w) / 2, step: cell + gap, w };
}

function ScanDiagram({ step }: { step: ScanStep }) {
  const a = SCAN_A;
  const b = SCAN_B;
  const cell = 52;
  const gap = 8;
  const h = 42;
  const aRow = rowX(a.length, cell, gap);
  const bRow = rowX(b.length, cell, gap);
  const aY = 40;
  const bY = 148;

  return (
    <svg viewBox={`0 0 ${W} 268`} className="w-full" aria-hidden>
      <Label x={16} y={28} text={step.phase === "set" ? "pool" : "a  (list)"} color={step.phase === "set" ? TEAL : MUTED} />
      {a.map((v, i) => {
        const inScan = step.phase === "list" && step.scanTo !== null && i <= step.scanTo;
        const hit = step.phase === "list" && step.hitAt === i;
        const inPool = step.phase === "set" && step.pool.includes(v);
        const poolHit = step.phase === "set" && step.hitAt === step.pool.indexOf(v) && step.hitAt !== null;
        return (
          <g key={`a-${i}`}>
            <Idx x={aRow.origin + i * aRow.step + cell / 2} y={34} n={i} />
            <Cell
              x={aRow.origin + i * aRow.step}
              y={aY}
              w={cell}
              h={h}
              value={v}
              fill={hit || poolHit ? TEAL : inScan ? ORANGE : inPool ? "#196860" : "#1a2030"}
              stroke={hit || poolHit ? TEAL : inScan ? GOLD : inPool ? TEAL : "#3a4458"}
              ring={hit || poolHit ? TEAL : undefined}
              dim={!inScan && !hit && !inPool}
            />
          </g>
        );
      })}

      <Label x={16} y={136} text="b" />
      {b.map((v, i) => {
        const curr = step.bI === i;
        const kept = step.missing.includes(v) && (step.bI === null || i <= (step.bI ?? -1));
        return (
          <g key={`b-${i}`}>
            <Idx x={bRow.origin + i * bRow.step + cell / 2} y={142} n={i} />
            <Cell
              x={bRow.origin + i * bRow.step}
              y={bY}
              w={cell}
              h={h}
              value={v}
              fill={curr ? ORANGE : kept ? "#5a3a20" : "#2a3550"}
              stroke={curr ? GOLD : kept ? ORANGE : "#5a8fd8"}
              ring={curr ? GOLD : undefined}
            />
          </g>
        );
      })}

      <text x={W / 2} y={228} textAnchor="middle" fill={MUTED} fontSize={13} fontFamily={FONT}>
        {`เทียบแล้ว ${step.compares} ครั้ง`}
        {step.missing.length > 0 ? `    ไม่มีใน a = [${step.missing.join(", ")}]` : ""}
      </text>
      <text x={W / 2} y={252} textAnchor="middle" fill={step.phase === "set" ? TEAL : DIM} fontSize={12} fontFamily={FONT}>
        {step.phase === "list" ? "วิธี list — แต่ละตัวใน b ไล่ a ใหม่" : "วิธี set — แต่ละตัวใน b ก้าวเดียว"}
      </text>
    </svg>
  );
}

function SlotDiagram({ step }: { step: SlotStep }) {
  const n = SLOT_N;
  const cell = 64;
  const gap = 10;
  const h = 48;
  const { origin, step: st } = rowX(n, cell, gap);
  const y = 88;

  return (
    <svg viewBox={`0 0 ${W} 220`} className="w-full" aria-hidden>
      {step.key !== null && (
        <text x={W / 2} y={28} textAnchor="middle" fill={GOLD} fontSize={15} fontWeight={700} fontFamily={FONT}>
          {`key ${step.key}`}
        </text>
      )}
      {step.formula && (
        <text x={W / 2} y={50} textAnchor="middle" fill={TEAL} fontSize={13} fontWeight={700} fontFamily={FONT}>
          {step.formula}
        </text>
      )}
      {step.cursor !== null && (
        <text
          x={origin + step.cursor * st + cell / 2}
          y={76}
          textAnchor="middle"
          fill={GOLD}
          fontSize={16}
          fontFamily={FONT}
        >
          ↓
        </text>
      )}
      {step.slots.map((v, i) => {
        const cur = step.cursor === i;
        const empty = v === null;
        const hit = step.mode === "hit" && cur;
        const writing = step.mode === "write" && cur;
        const probing = step.mode === "probe" && cur;
        return (
          <g key={i}>
            <Cell
              x={origin + i * st}
              y={y}
              w={cell}
              h={h}
              value={empty ? "·" : v}
              fill={hit ? TEAL : writing ? ORANGE : probing ? "#5a3a20" : empty ? "#1a2030" : "#243c6e"}
              stroke={hit ? TEAL : writing || probing || cur ? GOLD : empty ? "#3a4458" : BLUE}
              ring={cur ? (hit ? TEAL : GOLD) : undefined}
              dim={empty && !cur}
            />
            <Idx x={origin + i * st + cell / 2} y={y + h + 16} n={i} />
          </g>
        );
      })}
    </svg>
  );
}

function SeenDiagram({ step }: { step: SeenStep }) {
  const nums = SEEN_NUMS;
  const cell = 56;
  const gap = 10;
  const h = 48;
  const { origin, step: st } = rowX(nums.length, cell, gap);
  const y = 40;

  return (
    <svg viewBox={`0 0 ${W} 248`} className="w-full" aria-hidden>
      <Label x={16} y={28} text="nums" />
      <Label x={W - 16} y={28} text={`target = ${SEEN_TARGET}`} color={GOLD} anchor="end" />
      {nums.map((v, i) => {
        const curr = step.i === i;
        const partner = step.hit !== null && step.hit[0] === i;
        const answer = step.hit !== null && (step.hit[0] === i || step.hit[1] === i);
        return (
          <g key={i}>
            <Idx x={origin + i * st + cell / 2} y={34} n={i} />
            <Cell
              x={origin + i * st}
              y={y}
              w={cell}
              h={h}
              value={v}
              fill={answer ? TEAL : curr ? ORANGE : "#2a3550"}
              stroke={answer ? TEAL : curr ? GOLD : "#5a8fd8"}
              ring={curr || partner ? (answer ? TEAL : GOLD) : undefined}
            />
          </g>
        );
      })}

      <text x={W / 2} y={122} textAnchor="middle" fill={step.hit ? TEAL : GOLD} fontSize={14} fontWeight={700} fontFamily={FONT}>
        {step.need === null ? "need = ?" : `need = ${SEEN_TARGET} − ${step.i !== null ? nums[step.i] : "?"} = ${step.need}`}
      </text>

      <Label x={16} y={156} text="seen" color={TEAL} />
      {step.seen.length === 0 ? (
        <text x={90} y={156} fill={DIM} fontSize={13} fontFamily={FONT}>
          {"{}"}
        </text>
      ) : (
        step.seen.map((e, k) => {
          const isNeed = step.need === e.k;
          const x = 90 + k * 150;
          return (
            <g key={e.k}>
              <rect
                x={x}
                y={138}
                width={132}
                height={36}
                rx={8}
                fill={isNeed ? "#196860" : "#243c6e"}
                stroke={isNeed ? TEAL : BLUE}
                strokeWidth={2}
              />
              <text x={x + 66} y={161} textAnchor="middle" fill="#f5f5fa" fontSize={13} fontWeight={700} fontFamily={FONT}>
                {`${e.k}  →  ${e.idx}`}
              </text>
            </g>
          );
        })
      )}

      {step.hit && (
        <text x={W / 2} y={210} textAnchor="middle" fill={TEAL} fontSize={14} fontWeight={700} fontFamily={FONT}>
          {`คู่ที่ index (${step.hit[0]}, ${step.hit[1]})  =  ${nums[step.hit[0]]} + ${nums[step.hit[1]]} = ${SEEN_TARGET}`}
        </text>
      )}
    </svg>
  );
}

function DiffDiagram({ step }: { step: DiffStep }) {
  const a = DIFF_A;
  const b = DIFF_B;
  const cell = 48;
  const gap = 8;
  const h = 40;
  const left0 = 48;
  const right0 = 400;

  const pill = (vals: number[], x0: number, y: number, hl?: Set<number>, gone?: Set<number>) =>
    vals.map((v, i) => (
      <Cell
        key={`${x0}-${i}-${v}`}
        x={x0 + i * (cell + gap)}
        y={y}
        w={cell}
        h={h}
        value={v}
        fill={hl?.has(v) ? TEAL : gone?.has(v) ? "#1a2030" : "#243c6e"}
        stroke={hl?.has(v) ? TEAL : gone?.has(v) ? "#3a4458" : BLUE}
        dim={gone?.has(v)}
      />
    ));

  const leftKeep = new Set(step.phase === "left" || step.phase === "done" || step.phase === "right" ? step.leftOut : []);
  const leftGone =
    step.phase === "left" || step.phase === "right" || step.phase === "done"
      ? new Set(step.s1.filter((x) => !step.leftOut.includes(x)))
      : undefined;
  const rightKeep = new Set(step.phase === "right" || step.phase === "done" ? step.rightOut : []);
  const rightGone =
    step.phase === "right" || step.phase === "done"
      ? new Set(step.s2.filter((x) => !step.rightOut.includes(x)))
      : undefined;

  return (
    <svg viewBox={`0 0 ${W} 268`} className="w-full" aria-hidden>
      <Label x={left0} y={24} text="nums1" />
      <Label x={right0} y={24} text="nums2" />
      {a.map((v, i) => {
        const curr = step.adding?.side === "a" && step.adding.i === i;
        const drop = step.collapsed?.side === "a" && step.collapsed.i === i;
        return (
          <g key={`a-${i}`}>
            <Idx x={left0 + i * (cell + gap) + cell / 2} y={38} n={i} />
            <Cell
              x={left0 + i * (cell + gap)}
              y={44}
              w={cell}
              h={h}
              value={v}
              fill={drop ? "#5a3a20" : curr ? ORANGE : "#2a3550"}
              stroke={drop ? ORANGE : curr ? GOLD : "#5a8fd8"}
              ring={curr ? GOLD : undefined}
              dim={drop}
            />
          </g>
        );
      })}
      {b.map((v, i) => {
        const curr = step.adding?.side === "b" && step.adding.i === i;
        const drop = step.collapsed?.side === "b" && step.collapsed.i === i;
        return (
          <g key={`b-${i}`}>
            <Idx x={right0 + i * (cell + gap) + cell / 2} y={38} n={i} />
            <Cell
              x={right0 + i * (cell + gap)}
              y={44}
              w={cell}
              h={h}
              value={v}
              fill={drop ? "#5a3a20" : curr ? ORANGE : "#2a3550"}
              stroke={drop ? ORANGE : curr ? GOLD : "#5a8fd8"}
              ring={curr ? GOLD : undefined}
              dim={drop}
            />
          </g>
        );
      })}

      <Label x={left0} y={118} text="s1" color={TEAL} />
      <Label x={right0} y={118} text="s2" color={TEAL} />
      {step.s1.length === 0 ? (
        <text x={left0} y={148} fill={DIM} fontSize={13} fontFamily={FONT}>
          {"{}"}
        </text>
      ) : (
        pill(step.s1, left0, 128, leftKeep.size ? leftKeep : undefined, leftGone)
      )}
      {step.s2.length === 0 ? (
        <text x={right0} y={148} fill={DIM} fontSize={13} fontFamily={FONT}>
          {"{}"}
        </text>
      ) : (
        pill(step.s2, right0, 128, rightKeep.size ? rightKeep : undefined, rightGone)
      )}

      <Label x={left0} y={198} text="s1 − s2" color={step.phase === "left" || step.phase === "done" ? GOLD : DIM} />
      <Label x={right0} y={198} text="s2 − s1" color={step.phase === "right" || step.phase === "done" ? GOLD : DIM} />
      <text x={left0} y={228} fill={TEAL} fontSize={16} fontWeight={700} fontFamily={FONT}>
        {step.phase === "build" ? "—" : `{${step.leftOut.join(", ") || "∅"}}`}
      </text>
      <text x={right0} y={228} fill={TEAL} fontSize={16} fontWeight={700} fontFamily={FONT}>
        {step.phase === "build" || step.phase === "left" ? "—" : `{${step.rightOut.join(", ") || "∅"}}`}
      </text>
    </svg>
  );
}

function FreqDiagram({ step }: { step: FreqStep }) {
  const arr = FREQ_ARR;
  const cell = 52;
  const gap = 8;
  const h = 42;
  const { origin, step: st } = rowX(arr.length, cell, gap);
  const maxN = Math.max(1, ...step.count.map((e) => e.n));
  const barW = 52;

  return (
    <svg viewBox={`0 0 ${W} 292`} className="w-full" aria-hidden>
      <Label x={16} y={28} text="arr" />
      {arr.map((v, i) => {
        const curr = step.i === i;
        const done = step.i !== null && i <= step.i;
        return (
          <g key={i}>
            <Idx x={origin + i * st + cell / 2} y={34} n={i} />
            <Cell
              x={origin + i * st}
              y={40}
              w={cell}
              h={h}
              value={v}
              fill={curr ? ORANGE : done ? "#196860" : "#1a2030"}
              stroke={curr ? GOLD : done ? TEAL : "#3a4458"}
              ring={curr ? GOLD : undefined}
              dim={!curr && !done}
            />
          </g>
        );
      })}

      <Label x={16} y={108} text="Counter" color={TEAL} />
      {step.count.length === 0 ? (
        <text x={110} y={108} fill={DIM} fontSize={13} fontFamily={FONT}>
          {"{}"}
        </text>
      ) : (
        step.count.map((e, k) => {
          const x = 110 + k * 140;
          const bh = 12 + (e.n / maxN) * 28;
          const curr = step.i !== null && arr[step.i] === e.k;
          return (
            <g key={e.k}>
              <text x={x} y={124} fill={MUTED} fontSize={12} fontFamily={FONT}>
                {e.k}
              </text>
              <rect x={x + 22} y={128} width={barW} height={bh} rx={4} fill={curr ? ORANGE : TEAL} />
              <text x={x + 22 + barW + 8} y={140} fill={curr ? GOLD : TEAL} fontSize={13} fontWeight={700} fontFamily={FONT}>
                {e.n}
              </text>
            </g>
          );
        })
      )}

      {step.values && (
        <>
          <Label x={16} y={172} text="values" />
          {step.values.map((v, k) => (
            <Cell
              key={`v-${k}`}
              x={110 + k * (cell + gap)}
              y={178}
              w={cell}
              h={h}
              value={v}
              fill="#243c6e"
              stroke={BLUE}
            />
          ))}
        </>
      )}

      {step.uniq && (
        <>
          <Label x={16} y={244} text="set(values)" color={TEAL} />
          {step.uniq.map((v, k) => (
            <Cell
              key={`u-${k}`}
              x={140 + k * (cell + gap)}
              y={226}
              w={cell}
              h={h}
              value={v}
              fill={step.ok ? "#196860" : "#5a3a20"}
              stroke={step.ok ? TEAL : ORANGE}
            />
          ))}
          <text x={W - 24} y={252} textAnchor="end" fill={step.ok ? TEAL : ORANGE} fontSize={14} fontWeight={700} fontFamily={FONT}>
            {step.ok ? "len เท่า → True" : "len หด → False"}
          </text>
        </>
      )}
    </svg>
  );
}

function CloseDiagram({ step }: { step: CloseStep }) {
  const cell = 36;
  const gap = 6;
  const h = 36;
  const y1 = 36;
  const y2 = 36;
  const left0 = 90;
  const right0 = 420;

  const gateFill = (g: boolean | null, active: boolean) => {
    if (g === true) return TEAL;
    if (g === false) return ORANGE;
    return active ? GOLD : DIM;
  };

  return (
    <svg viewBox={`0 0 ${W} 300`} className="w-full" aria-hidden>
      <Label x={left0} y={24} text={`word1  "${CLOSE_W1}"`} />
      <Label x={right0} y={24} text={`word2  "${CLOSE_W2}"`} />
      {[...CLOSE_W1].map((ch, i) => (
        <Cell key={`w1-${i}`} x={left0 + i * (cell + gap)} y={y1} w={cell} h={h} value={ch} fill="#2a3550" stroke="#5a8fd8" size={14} />
      ))}
      {[...CLOSE_W2].map((ch, i) => (
        <Cell key={`w2-${i}`} x={right0 + i * (cell + gap)} y={y2} w={cell} h={h} value={ch} fill="#2a3550" stroke="#5a8fd8" size={14} />
      ))}

      {([1, 2, 3] as const).map((g, k) => {
        const passed = g === 1 ? step.g1 : g === 2 ? step.g2 : step.g3;
        const active = step.gate === g;
        const x = 80 + k * 190;
        return (
          <g key={g}>
            <rect
              x={x}
              y={92}
              width={170}
              height={32}
              rx={16}
              fill="#1a2030"
              stroke={gateFill(passed, active)}
              strokeWidth={2}
            />
            <text x={x + 85} y={113} textAnchor="middle" fill={gateFill(passed, active)} fontSize={12} fontWeight={700} fontFamily={FONT}>
              {`Gate ${g}  ${passed === true ? "ผ่าน" : passed === false ? "ไม่ผ่าน" : "…"}`}
            </text>
          </g>
        );
      })}

      <Label x={left0} y={150} text="set" color={step.gate >= 2 ? TEAL : DIM} />
      <Label x={right0} y={150} text="set" color={step.gate >= 2 ? TEAL : DIM} />
      <text x={left0 + 50} y={150} fill={step.gate >= 2 ? "#f5f5fa" : DIM} fontSize={13} fontFamily={FONT}>
        {step.set1.length ? `{${step.set1.join(", ")}}` : "—"}
      </text>
      <text x={right0 + 50} y={150} fill={step.gate >= 2 ? "#f5f5fa" : DIM} fontSize={13} fontFamily={FONT}>
        {step.set2.length ? `{${step.set2.join(", ")}}` : "—"}
      </text>

      <Label x={left0} y={178} text="Counter" color={step.gate >= 3 ? TEAL : DIM} />
      {step.c1.map((e, k) => {
        const x = left0 + k * 90;
        const bh = 10 + e.n * 12;
        return (
          <g key={`c1-${e.k}`}>
            <text x={x} y={198} fill={MUTED} fontSize={12} fontFamily={FONT}>
              {e.k}
            </text>
            <rect x={x + 18} y={204} width={32} height={bh} rx={3} fill={TEAL} />
            <text x={x + 54} y={218} fill={TEAL} fontSize={12} fontWeight={700} fontFamily={FONT}>
              {e.n}
            </text>
          </g>
        );
      })}
      {step.c2.map((e, k) => {
        const x = right0 + k * 90;
        const bh = 10 + e.n * 12;
        return (
          <g key={`c2-${e.k}`}>
            <text x={x} y={198} fill={MUTED} fontSize={12} fontFamily={FONT}>
              {e.k}
            </text>
            <rect x={x + 18} y={204} width={32} height={bh} rx={3} fill={TEAL} />
            <text x={x + 54} y={218} fill={TEAL} fontSize={12} fontWeight={700} fontFamily={FONT}>
              {e.n}
            </text>
          </g>
        );
      })}

      {step.f1 && step.f2 && (
        <text x={W / 2} y={272} textAnchor="middle" fill={step.g3 ? TEAL : ORANGE} fontSize={14} fontWeight={700} fontFamily={FONT}>
          {`sorted values  [${step.f1.join(", ")}]  ==  [${step.f2.join(", ")}]`}
        </text>
      )}
    </svg>
  );
}

function PairsDiagram({ step }: { step: PairsStep }) {
  const grid = PAIRS_GRID;
  const cell = 52;
  const gap = 8;
  const origin = 48;
  const y0 = 36;

  return (
    <svg viewBox={`0 0 ${W} 268`} className="w-full" aria-hidden>
      <Label x={origin} y={24} text="grid" />
      {grid.map((row, r) =>
        row.map((v, c) => {
          const inRow = step.rowI === r;
          const inCol = step.colJ === c;
          const match = step.matchedRow === r && step.colJ !== null;
          const hot = inRow || inCol;
          return (
            <Cell
              key={`${r}-${c}`}
              x={origin + c * (cell + gap)}
              y={y0 + r * (cell + gap)}
              w={cell}
              h={cell}
              value={v}
              fill={match ? TEAL : hot ? ORANGE : "#2a3550"}
              stroke={match ? TEAL : hot ? GOLD : "#5a8fd8"}
              ring={hot ? GOLD : undefined}
            />
          );
        }),
      )}

      {grid.map((_, r) => (
        <Idx key={`ri-${r}`} x={origin - 14} y={y0 + r * (cell + gap) + cell / 2 + 4} n={r} />
      ))}
      {grid[0].map((_, c) => (
        <Idx key={`ci-${c}`} x={origin + c * (cell + gap) + cell / 2} y={y0 - 6} n={c} />
      ))}

      <Label x={340} y={24} text="ledger  (tuple → count)" color={TEAL} />
      {step.ledger.length === 0 ? (
        <text x={340} y={56} fill={DIM} fontSize={13} fontFamily={FONT}>
          {"{}"}
        </text>
      ) : (
        step.ledger.map((e, k) => {
          const asking = step.col !== null && `(${step.col.join(", ")})` === e.key;
          return (
            <g key={e.key}>
              <rect
                x={340}
                y={36 + k * 40}
                width={340}
                height={34}
                rx={8}
                fill={asking ? "#196860" : "#243c6e"}
                stroke={asking ? TEAL : BLUE}
                strokeWidth={2}
              />
              <text x={356} y={58} fill="#f5f5fa" fontSize={13} fontWeight={700} fontFamily={FONT}>
                {`${e.key}  →  ${e.n}`}
              </text>
            </g>
          );
        })
      )}

      <text x={340} y={180} fill={MUTED} fontSize={13} fontFamily={FONT}>
        {step.col ? `col = (${step.col.join(", ")})` : "col = —"}
      </text>
      <text x={340} y={208} fill={step.matchedRow !== null ? TEAL : MUTED} fontSize={16} fontWeight={700} fontFamily={FONT}>
        {`pairs = ${step.pairs}`}
      </text>
    </svg>
  );
}

function Player({
  title,
  pills,
  lines,
  steps,
  diagram,
}: {
  title: string;
  pills: { label: string; color: string }[];
  lines: string[];
  steps: { line: number; msg: string }[];
  diagram: (idx: number) => ReactNode;
}) {
  const play = useVizPlayback(steps.length);
  const step = steps[play.idx];
  return (
    <VizFrameView
      title={title}
      pills={pills}
      message={step.msg}
      diagram={diagram(play.idx)}
      lines={lines}
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

export function HashScanViz() {
  const steps = useMemo(() => buildScanSteps(), []);
  return (
    <Player
      title="LIST SCAN vs SET LOOKUP"
      pills={[
        { label: "LIST  O(n·m)", color: "#D55D00" },
        { label: "SET  O(n+m)", color: "#03A69B" },
      ]}
      lines={SCAN_CODE}
      steps={steps}
      diagram={(i) => <ScanDiagram step={steps[i] as ScanStep} />}
    />
  );
}

export function HashSlotViz() {
  const steps = useMemo(() => buildSlotSteps(), []);
  return (
    <Player
      title="HASH TABLE · คำนวณช่อง แล้วเดินไป"
      pills={[
        { label: "INSERT", color: "#3c78f0" },
        { label: "COLLISION", color: "#D55D00" },
        { label: "LOOKUP  avg O(1)", color: "#03A69B" },
      ]}
      lines={SLOT_CODE}
      steps={steps}
      diagram={(i) => <SlotDiagram step={steps[i] as SlotStep} />}
    />
  );
}

export function HashSeenViz() {
  const steps = useMemo(() => buildSeenSteps(), []);
  return (
    <Player
      title="SEEN-SO-FAR · Two Sum รอบเดียว"
      pills={[
        { label: "ONE PASS  O(n)", color: "#3c78f0" },
        { label: "SPACE  O(n)", color: "#f05a96" },
      ]}
      lines={SEEN_CODE}
      steps={steps}
      diagram={(i) => <SeenDiagram step={steps[i] as SeenStep} />}
    />
  );
}

export function HashDiffViz() {
  const steps = useMemo(() => buildDiffSteps(), []);
  return (
    <Player
      title="FIND THE DIFFERENCE OF TWO ARRAYS"
      pills={[
        { label: "TIME  O(n+m)", color: "#3c78f0" },
        { label: "SPACE  O(n+m)", color: "#f05a96" },
      ]}
      lines={DIFF_CODE}
      steps={steps}
      diagram={(i) => <DiffDiagram step={steps[i] as DiffStep} />}
    />
  );
}

export function HashFreqViz() {
  const steps = useMemo(() => buildFreqSteps(), []);
  return (
    <Player
      title="UNIQUE NUMBER OF OCCURRENCES"
      pills={[
        { label: "TIME  O(n)", color: "#3c78f0" },
        { label: "SPACE  O(n)", color: "#f05a96" },
      ]}
      lines={FREQ_CODE}
      steps={steps}
      diagram={(i) => <FreqDiagram step={steps[i] as FreqStep} />}
    />
  );
}

export function HashCloseViz() {
  const steps = useMemo(() => buildCloseSteps(), []);
  return (
    <Player
      title="DETERMINE IF TWO STRINGS ARE CLOSE"
      pills={[
        { label: "3 GATES", color: "#3c78f0" },
        { label: "TIME  O(n)", color: "#03A69B" },
      ]}
      lines={CLOSE_CODE}
      steps={steps}
      diagram={(i) => <CloseDiagram step={steps[i] as CloseStep} />}
    />
  );
}

export function HashPairsViz() {
  const steps = useMemo(() => buildPairsSteps(), []);
  return (
    <Player
      title="EQUAL ROW AND COLUMN PAIRS"
      pills={[
        { label: "TIME  O(n²)", color: "#3c78f0" },
        { label: "TUPLE KEY", color: "#03A69B" },
      ]}
      lines={PAIRS_CODE}
      steps={steps}
      diagram={(i) => <PairsDiagram step={steps[i] as PairsStep} />}
    />
  );
}
