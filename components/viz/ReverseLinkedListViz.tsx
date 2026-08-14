"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DIAGRAM_H,
  DIAGRAM_W,
  REVERSE_CODE,
  REVERSE_VALUES,
  buildReverseSteps,
  isReversedLink,
  leftNullNode,
  nodeLayout,
  processedIndex,
  rightNullNode,
  type ReverseStep,
} from "@/lib/viz/reverse-linked-list";

const INTERVAL_MS = 900;

function Arrow({
  x1,
  y,
  x2,
  color,
  thick,
}: {
  x1: number;
  y: number;
  x2: number;
  color: string;
  thick?: boolean;
}) {
  const dir = x2 > x1 ? 1 : -1;
  const head = thick ? 11 : 9;
  const tipX = x2;
  const baseX = x2 - dir * head;
  return (
    <g>
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        stroke={color}
        strokeWidth={thick ? 5 : 4}
        strokeLinecap="round"
      />
      <polygon
        points={`${tipX},${y} ${baseX},${y - 5.5} ${baseX},${y + 5.5}`}
        fill={color}
      />
    </g>
  );
}

function NullBox({
  x,
  y,
  fromX,
  side,
}: {
  x: number;
  y: number;
  fromX: number;
  side: "left" | "right";
}) {
  const w = 42;
  const h = 22;
  const bx = side === "left" ? x : x;
  return (
    <g>
      <rect
        x={bx}
        y={y - h / 2}
        width={w}
        height={h}
        rx={6}
        fill="#3c1e22"
        stroke="#ff7878"
        strokeWidth={1.5}
      />
      <text x={bx + 10} y={y + 5} fill="#ff7878" fontSize={11} fontWeight={700}>
        null
      </text>
      <Arrow
        x1={fromX}
        y={y}
        x2={side === "left" ? bx + w + 2 : bx - 2}
        color="#ff7878"
      />
    </g>
  );
}

function Diagram({ step }: { step: ReverseStep }) {
  const values = REVERSE_VALUES;
  const { pos, r, y } = nodeLayout(values);
  const pi = processedIndex(step, values);

  const links = values.flatMap((v) => {
    const dst = step.links[v];
    if (dst === null) return [];
    const x1 = pos[v].x;
    const x2 = pos[dst].x;
    const rev = isReversedLink(pos, v, dst);
    const pad = 5;
    const ax1 = rev ? x1 - r - pad : x1 + r + pad;
    const ax2 = rev ? x2 + r + pad : x2 - r - pad;
    const active = step.activeLink?.[0] === v && step.activeLink[1] === dst;
    const color = active ? "#ffffff" : rev ? "#00e6c8" : "#ffb830";
    return [{ key: `${v}-${dst}`, x1: ax1, x2: ax2, color, thick: active }];
  });

  const ln = leftNullNode(step, values);
  const rn = rightNullNode(step, values);

  type Side = "above" | "below";
  const ptrs: { name: string; val: number | null; fill: string; side: Side }[] = [];
  if (step.curr !== null) {
    ptrs.push({ name: "curr", val: step.curr, fill: "#ffd23c", side: "above" });
  }
  if (step.prev !== null) {
    ptrs.push({
      name: "prev",
      val: step.prev,
      fill: "#64b4ff",
      side: step.prev === step.curr ? "below" : "above",
    });
  }
  if (step.nxt !== null) {
    const nextSharesBelow = step.prev !== null && step.prev === step.nxt && step.prev === step.curr;
    ptrs.push({
      name: "next",
      val: step.nxt,
      fill: "#5ce698",
      side: nextSharesBelow ? "above" : "below",
    });
  }

  const LABEL_H = 22;
  const STEM = 18;

  return (
    <svg viewBox={`0 0 ${DIAGRAM_W} ${DIAGRAM_H}`} className="w-full" aria-hidden>
      {links.map((a) => (
        <Arrow key={a.key} x1={a.x1} y={y} x2={a.x2} color={a.color} thick={a.thick} />
      ))}
      {ln !== null && (
        <NullBox x={pos[ln].x - r - 52} y={y} fromX={pos[ln].x - r - 4} side="left" />
      )}
      {rn !== null && (
        <NullBox x={pos[rn].x + r + 14} y={y} fromX={pos[rn].x + r + 4} side="right" />
      )}

      {values.map((v) => {
        const { x, y: cy } = pos[v];
        const done = values.indexOf(v) <= pi;
        const isCurr = v === step.curr;
        const fill = done ? "#196860" : isCurr ? "#324878" : "#243c6e";
        return (
          <g key={v}>
            {isCurr && (
              <circle cx={x} cy={cy} r={r + 5} fill="none" stroke="#ffd23c" strokeWidth={3} />
            )}
            <circle cx={x} cy={cy} r={r} fill={fill} stroke="#5a8fd8" strokeWidth={2} />
            <text
              x={x}
              y={cy + 6}
              textAnchor="middle"
              fill="#f5f5fa"
              fontSize={16}
              fontWeight={700}
            >
              {v}
            </text>
          </g>
        );
      })}

      {ptrs.map(({ name, val, fill, side }) => {
        if (val === null || !(val in pos)) return null;
        const { x } = pos[val];
        const lw = name.length * 7.5 + 18;
        const ly =
          side === "above" ? y - r - STEM - LABEL_H : y + r + STEM;
        const stemFrom = side === "above" ? ly + LABEL_H : ly;
        const stemTo = side === "above" ? y - r - 4 : y + r + 4;
        return (
          <g key={name}>
            <rect x={x - lw / 2} y={ly} width={lw} height={LABEL_H} rx={6} fill={fill} />
            <text
              x={x}
              y={ly + 15}
              textAnchor="middle"
              fill="#0e1016"
              fontSize={12}
              fontWeight={700}
            >
              {name}
            </text>
            <line x1={x} y1={stemFrom} x2={x} y2={stemTo} stroke={fill} strokeWidth={2} />
          </g>
        );
      })}
    </svg>
  );
}

function CodePanel({ line }: { line: number }) {
  return (
    <pre className="m-0 overflow-x-auto p-3 font-mono text-[0.78rem] leading-relaxed sm:text-[0.82rem]">
      {REVERSE_CODE.map((row) => (
        <div
          key={row.line}
          className={`rounded px-2 py-0.5 ${
            row.line === line ? "bg-[#226644]/80" : ""
          }`}
        >
          <span className="mr-3 inline-block w-4 select-none text-[#6a7080]">
            {row.line}
          </span>
          {row.parts.map((p, i) => (
            <span
              key={i}
              className={
                p.c === "kw"
                  ? "text-[#82b4ff]"
                  : p.c === "id"
                    ? "text-[#dcdce6]"
                    : "text-[#dcdce6]"
              }
            >
              {p.t}
            </span>
          ))}
        </div>
      ))}
    </pre>
  );
}

export default function ReverseLinkedListViz() {
  const steps = useMemo(() => buildReverseSteps(REVERSE_VALUES), []);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = steps[idx];
  const atStart = idx === 0;
  const atEnd = idx === steps.length - 1;

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
  }, []);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % steps.length);
  }, [steps.length]);

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + steps.length) % steps.length);
  }, [steps.length]);

  const reset = useCallback(() => {
    stop();
    setIdx(0);
  }, [stop]);

  const togglePlay = useCallback(() => {
    setPlaying((p) => !p);
  }, []);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setIdx((i) => (i + 1) % steps.length);
    }, INTERVAL_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, steps.length]);

  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-[#2a3040] bg-[#0c0e16] text-[#dcdce6] shadow-sm">
      <div className="border-b border-[#2a3040] px-4 py-3">
        <div className="text-center text-sm font-bold tracking-wide text-white sm:text-base">
          REVERSE LINKED LIST
        </div>
        <div className="mt-2 flex justify-center gap-2">
          <span className="rounded-full bg-[#3c78f0] px-3 py-0.5 text-[0.7rem] font-bold text-white">
            TIME O(n)
          </span>
          <span className="rounded-full bg-[#f05a96] px-3 py-0.5 text-[0.7rem] font-bold text-white">
            SPACE O(1)
          </span>
        </div>
      </div>

      <div className="px-2 py-3 sm:px-4">
        <Diagram step={step} />
        <p className="mx-2 mt-1 rounded-md border border-[#3a8868] bg-[#142820] px-3 py-2 text-center text-[0.8rem] font-semibold text-[#8cffb8] sm:text-sm">
          {step.msg}
        </p>
      </div>

      <div className="border-t border-[#2a3040] bg-[#121620]">
        <CodePanel line={step.line} />
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-[#2a3040] px-4 py-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-[#3a4050] bg-[#1a1e2a] px-3 py-1.5 text-sm font-semibold hover:bg-[#242a38]"
            aria-label="Reset"
          >
            ⏮ Reset
          </button>
          <button
            type="button"
            onClick={prev}
            disabled={atStart && !playing}
            className="rounded-md border border-[#3a4050] bg-[#1a1e2a] px-3 py-1.5 text-sm font-semibold hover:bg-[#242a38] disabled:opacity-40"
            aria-label="Previous step"
          >
            ◀ Prev
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="rounded-md border border-[#6565d5] bg-[#6565d5] px-4 py-1.5 text-sm font-bold text-white hover:bg-[#5959d2]"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
          <button
            type="button"
            onClick={() => {
              stop();
              next();
            }}
            className="rounded-md border border-[#3a4050] bg-[#1a1e2a] px-3 py-1.5 text-sm font-semibold hover:bg-[#242a38]"
            aria-label="Next step"
          >
            Next ▶
          </button>
        </div>
        <span className="text-sm tabular-nums text-[#8a90a0]">
          Step {idx + 1} / {steps.length}
          {playing && " · looping"}
        </span>
      </figcaption>
    </figure>
  );
}
