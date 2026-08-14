"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

const INTERVAL_MS = 900;

export function VizCode({ lines, active }: { lines: string[]; active: number }) {
  return (
    <pre className="m-0 overflow-x-auto p-3 font-mono text-[0.78rem] leading-relaxed sm:text-[0.82rem]">
      {lines.map((text, i) => {
        const n = i + 1;
        return (
          <div
            key={n}
            className={`rounded px-2 py-0.5 whitespace-pre ${
              n === active ? "bg-[#226644]/80" : ""
            }`}
          >
            <span className="mr-3 inline-block w-4 select-none text-[#6a7080]">{n}</span>
            <span className="text-[#dcdce6]">{text}</span>
          </div>
        );
      })}
    </pre>
  );
}

/** Controlled player — parent owns `idx` so the diagram can follow the same step. */
export function useVizPlayback(stepCount: number) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
  }, []);

  const goNext = useCallback(() => setIdx((i) => (i + 1) % stepCount), [stepCount]);
  const goPrev = useCallback(() => setIdx((i) => (i - 1 + stepCount) % stepCount), [stepCount]);
  const reset = useCallback(() => {
    stop();
    setIdx(0);
  }, [stop]);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setIdx((i) => (i + 1) % stepCount);
    }, INTERVAL_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, stepCount]);

  return {
    idx,
    playing,
    atStart: idx === 0,
    reset,
    prev: goPrev,
    next: () => {
      stop();
      goNext();
    },
    toggle: () => setPlaying((p) => !p),
  };
}

export function VizFrameView({
  title,
  pills,
  message,
  diagram,
  lines,
  line,
  idx,
  stepCount,
  playing,
  atStart,
  onReset,
  onPrev,
  onNext,
  onToggle,
}: {
  title: string;
  pills: { label: string; color: string }[];
  message: string;
  diagram: ReactNode;
  lines: string[];
  line: number;
  idx: number;
  stepCount: number;
  playing: boolean;
  atStart: boolean;
  onReset: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggle: () => void;
}) {
  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-[#2a3040] bg-[#0c0e16] text-[#dcdce6] shadow-sm">
      <div className="border-b border-[#2a3040] px-4 py-3">
        <div className="text-center text-sm font-bold tracking-wide text-white sm:text-base">
          {title}
        </div>
        <div className="mt-2 flex justify-center gap-2">
          {pills.map((p) => (
            <span
              key={p.label}
              className="rounded-full px-3 py-0.5 text-[0.7rem] font-bold text-white"
              style={{ background: p.color }}
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>

      <div className="px-2 py-3 sm:px-4">
        {diagram}
        <p className="mx-2 mt-2 rounded-md border border-[#3a8868] bg-[#142820] px-3 py-2 text-center text-[0.8rem] font-semibold text-[#8cffb8] sm:text-sm">
          {message}
        </p>
      </div>

      <div className="border-t border-[#2a3040] bg-[#121620]">
        <VizCode lines={lines} active={line} />
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-[#2a3040] px-4 py-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onReset}
            className="rounded-md border border-[#3a4050] bg-[#1a1e2a] px-3 py-1.5 text-sm font-semibold hover:bg-[#242a38]"
          >
            ⏮ Reset
          </button>
          <button
            type="button"
            onClick={onPrev}
            disabled={atStart && !playing}
            className="rounded-md border border-[#3a4050] bg-[#1a1e2a] px-3 py-1.5 text-sm font-semibold hover:bg-[#242a38] disabled:opacity-40"
          >
            ◀ Prev
          </button>
          <button
            type="button"
            onClick={onToggle}
            className="rounded-md border border-[#6565d5] bg-[#6565d5] px-4 py-1.5 text-sm font-bold text-white hover:bg-[#5959d2]"
          >
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
          <button
            type="button"
            onClick={onNext}
            className="rounded-md border border-[#3a4050] bg-[#1a1e2a] px-3 py-1.5 text-sm font-semibold hover:bg-[#242a38]"
          >
            Next ▶
          </button>
        </div>
        <span className="text-sm tabular-nums text-[#8a90a0]">
          Step {idx + 1} / {stepCount}
          {playing && " · looping"}
        </span>
      </figcaption>
    </figure>
  );
}
