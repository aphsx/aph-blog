"use client";

import { useState } from "react";
import { VizStaticFrame } from "@/components/viz/VizFrame";
import { FONT_MONO } from "./constants";

// ============================================================================
// 8. Linked List Types: Singly, Doubly, Circular (Chapter 5)
// ============================================================================

export function LinkedListTypesViz() {
  return (
    <VizStaticFrame
      title="Linked List Types: เปรียบเทียบสถาปัตยกรรม Singly, Doubly และ Circular"
      pills={[
        { label: "Singly: ทางเดียว O(n) delete", color: "#3b82f6" },
        { label: "Doubly: สองทาง O(1) delete", color: "#10b981" },
        { label: "Circular: วนซ้ำ (Playlist)", color: "#eab308" },
      ]}
      caption="Linked List แต่ละประเภทมีความเหมาะสมกับงานต่างกัน เช่น Doubly เหมาะกับ LRU Cache, Circular เหมาะกับ Music Playlist / Round-Robin"
      diagram={
        <div className="space-y-4 p-2">
          {/* 1. Singly */}
          <div className="rounded-lg border border-[#232a3c] bg-[#101420] p-3">
            <div className="text-xs font-bold text-[#93c5fd] mb-2 font-mono">1. Singly Linked List (เดินหน้าทิศทางเดียว)</div>
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 font-mono text-xs">
              <span className="rounded bg-[#3b82f6]/20 px-2 py-1 text-[#60a5fa] border border-[#3b82f6]/40">Head</span>
              <span>──►</span>
              <div className="flex items-center rounded border border-[#475569] bg-[#1e293b] px-2 py-1">
                <span className="font-bold text-white pr-2">1</span>
                <span className="border-l border-[#475569] pl-2 text-[#94a3b8]">next</span>
              </div>
              <span>──►</span>
              <div className="flex items-center rounded border border-[#475569] bg-[#1e293b] px-2 py-1">
                <span className="font-bold text-white pr-2">2</span>
                <span className="border-l border-[#475569] pl-2 text-[#94a3b8]">next</span>
              </div>
              <span>──►</span>
              <div className="flex items-center rounded border border-[#475569] bg-[#1e293b] px-2 py-1">
                <span className="font-bold text-white pr-2">3</span>
                <span className="border-l border-[#475569] pl-2 text-[#94a3b8]">next</span>
              </div>
              <span>──►</span>
              <span className="rounded bg-[#ef4444]/20 px-2 py-1 text-[#f87171] border border-[#ef4444]/40">nullptr</span>
            </div>
          </div>

          {/* 2. Doubly */}
          <div className="rounded-lg border border-[#1b332b] bg-[#0c1815] p-3">
            <div className="text-xs font-bold text-[#6ee7b7] mb-2 font-mono">2. Doubly Linked List (มีทั้ง prev และ next)</div>
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 font-mono text-xs">
              <span className="text-[#f87171]">nullptr</span>
              <span>◄──</span>
              <div className="flex items-center rounded border border-[#059669] bg-[#064e3b] px-2 py-1">
                <span className="text-[#94a3b8] pr-2">prev</span>
                <span className="border-l border-r border-[#059669] px-2 font-bold text-white">1</span>
                <span className="text-[#94a3b8] pl-2">next</span>
              </div>
              <span>◄──►</span>
              <div className="flex items-center rounded border border-[#059669] bg-[#064e3b] px-2 py-1">
                <span className="text-[#94a3b8] pr-2">prev</span>
                <span className="border-l border-r border-[#059669] px-2 font-bold text-white">2</span>
                <span className="text-[#94a3b8] pl-2">next</span>
              </div>
              <span>◄──►</span>
              <div className="flex items-center rounded border border-[#059669] bg-[#064e3b] px-2 py-1">
                <span className="text-[#94a3b8] pr-2">prev</span>
                <span className="border-l border-r border-[#059669] px-2 font-bold text-white">3</span>
                <span className="text-[#94a3b8] pl-2">next</span>
              </div>
              <span>──►</span>
              <span className="text-[#f87171]">nullptr</span>
            </div>
          </div>

          {/* 3. Circular */}
          <div className="rounded-lg border border-[#3b321c] bg-[#18150c] p-3">
            <div className="text-xs font-bold text-[#fde047] mb-2 font-mono">3. Circular Linked List (Tail วนกลับมา Head)</div>
            <div className="relative flex flex-col items-center gap-2 py-1 font-mono text-xs">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="rounded bg-[#eab308]/20 px-2 py-1 text-[#facc15] border border-[#eab308]/40">Head</span>
                <span>──►</span>
                <div className="flex items-center rounded border border-[#ca8a04] bg-[#422006] px-2 py-1">
                  <span className="font-bold text-white pr-2">1</span>
                  <span className="border-l border-[#ca8a04] pl-2 text-[#fde047]">next</span>
                </div>
                <span>──►</span>
                <div className="flex items-center rounded border border-[#ca8a04] bg-[#422006] px-2 py-1">
                  <span className="font-bold text-white pr-2">2</span>
                  <span className="border-l border-[#ca8a04] pl-2 text-[#fde047]">next</span>
                </div>
                <span>──►</span>
                <div className="flex items-center rounded border border-[#ca8a04] bg-[#422006] px-2 py-1">
                  <span className="font-bold text-white pr-2">3</span>
                  <span className="border-l border-[#ca8a04] pl-2 text-[#fde047]">next</span>
                </div>
                <span>──┐</span>
              </div>
              <div className="w-full flex justify-between px-16 text-[#eab308]">
                <span>▲ (วนกลับมาโหนดแรก)</span>
                <span>──────────────────────────────────────┘</span>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

// ============================================================================
// 9. Stack Operations: LIFO (Chapter 5)
// ============================================================================

export function StackOperationsViz() {
  return (
    <VizStaticFrame
      title="Stack LIFO Architecture: กฎเหล็ก Last-In, First-Out ในระดับ O(1)"
      pills={[
        { label: "Push(x): วางบนยอด O(1)", color: "#10b981" },
        { label: "Pop(): ดึงใบบนสุด O(1)", color: "#ef4444" },
        { label: "Peek(): มองดูยอด O(1)", color: "#3b82f6" },
      ]}
      caption="Stack เปรียบเหมือนกระบอกใส่ลูกเทนนิส สมาชิกที่ใส่ลงไปท้ายสุด (Last-In) จะต้องถูกหยิบออกเป็นตัวแรกเสมอ (First-Out)"
      diagram={
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 p-2">
          {/* Push Step */}
          <div className="rounded-lg border border-[#1e2638] bg-[#0e1320] p-3 text-center">
            <div className="font-mono text-xs font-bold text-[#34d399] mb-2">1. Push(30)</div>
            <div className="flex flex-col items-center justify-end h-40 border-b-4 border-l-2 border-r-2 border-[#475569] rounded-b p-2">
              <div className="mb-2 rounded bg-[#10b981] px-4 py-1.5 font-mono text-xs font-bold text-white shadow-lg animate-pulse">
                ↓ 30 (เข้าใหม่)
              </div>
              <div className="w-full rounded bg-[#1e293b] py-1 font-mono text-xs text-white mb-1 border border-[#334155]">20</div>
              <div className="w-full rounded bg-[#1e293b] py-1 font-mono text-xs text-white border border-[#334155]">10</div>
            </div>
            <div className="mt-2 text-[11px] text-[#8a90a0]">วางลงบนยอด Top</div>
          </div>

          {/* Peek Step */}
          <div className="rounded-lg border border-[#1e2638] bg-[#0e1320] p-3 text-center">
            <div className="font-mono text-xs font-bold text-[#38bdf8] mb-2">2. Peek() → 30</div>
            <div className="flex flex-col items-center justify-end h-40 border-b-4 border-l-2 border-r-2 border-[#475569] rounded-b p-2">
              <div className="w-full rounded bg-[#0284c7] py-1 font-mono text-xs font-bold text-white mb-1 border border-[#38bdf8]">
                👁️ 30 (Top Element)
              </div>
              <div className="w-full rounded bg-[#1e293b] py-1 font-mono text-xs text-white mb-1 border border-[#334155]">20</div>
              <div className="w-full rounded bg-[#1e293b] py-1 font-mono text-xs text-white border border-[#334155]">10</div>
            </div>
            <div className="mt-2 text-[11px] text-[#8a90a0]">ดูค่าใบบนสุดโดยไม่หยิบออก</div>
          </div>

          {/* Pop Step */}
          <div className="rounded-lg border border-[#1e2638] bg-[#0e1320] p-3 text-center">
            <div className="font-mono text-xs font-bold text-[#f87171] mb-2">3. Pop() → คืนค่า 30</div>
            <div className="flex flex-col items-center justify-end h-40 border-b-4 border-l-2 border-r-2 border-[#475569] rounded-b p-2">
              <div className="mb-4 rounded bg-[#ef4444] px-4 py-1.5 font-mono text-xs font-bold text-white shadow-lg">
                ↑ 30 (ดึงออก)
              </div>
              <div className="w-full rounded bg-[#0284c7] py-1 font-mono text-xs font-bold text-white mb-1 border border-[#38bdf8]">20 (กลายเป็น Top)</div>
              <div className="w-full rounded bg-[#1e293b] py-1 font-mono text-xs text-white border border-[#334155]">10</div>
            </div>
            <div className="mt-2 text-[11px] text-[#8a90a0]">ดึงสมาชิกบนสุดออก</div>
          </div>
        </div>
      }
    />
  );
}

// ============================================================================
// 10. Circular Queue Modulo Mechanics (Chapter 5)
// ============================================================================

export function CircularQueueViz() {
  return (
    <VizStaticFrame
      title="Circular Queue: การแก้ปัญหา False Overflow ด้วย Modulo Arithmetic"
      pills={[
        { label: "Capacity = 6", color: "#3b82f6" },
        { label: "(index + 1) % Capacity", color: "#10b981" },
        { label: "Front / Rear Pointer", color: "#eab308" },
      ]}
      caption="เมื่อ Rear เลื่อนไปชนช่องสุดท้าย (Index 5) สูตร (5 + 1) % 6 = 0 จะช่วยหมุนพอยน์เตอร์กลับมาใช้ช่องว่างข้างหน้าได้ใน O(1)"
      diagram={
        <svg viewBox="0 0 720 250" className="w-full h-auto">
          {/* Circular Donut Ring Representation */}
          <g transform="translate(360, 125)">
            {/* Center Hub */}
            <circle cx="0" cy="0" r="45" fill="#111827" stroke="#374151" strokeWidth="2" />
            <text x="0" y="-5" fill="#93c5fd" fontSize="11" fontFamily={FONT_MONO} textAnchor="middle" fontWeight="bold">Modulo</text>
            <text x="0" y="12" fill="#eab308" fontSize="11" fontFamily={FONT_MONO} textAnchor="middle">% 6</text>

            {/* 6 Segments arranged in circle */}
            {[
              { idx: 0, val: "A", occupied: true, angle: 0 },
              { idx: 1, val: "B", occupied: true, angle: 60 },
              { idx: 2, val: "C", occupied: true, angle: 120 },
              { idx: 3, val: "D", occupied: true, angle: 180 },
              { idx: 4, val: "ว่าง", occupied: false, angle: 240 },
              { idx: 5, val: "ว่าง", occupied: false, angle: 300 },
            ].map((slot) => {
              const rad = ((slot.angle - 90) * Math.PI) / 180;
              const r = 85;
              const x = r * Math.cos(rad);
              const y = r * Math.sin(rad);

              return (
                <g key={slot.idx} transform={`translate(${x}, ${y})`}>
                  <circle
                    cx="0"
                    cy="0"
                    r="24"
                    fill={slot.occupied ? "#1e3a8a" : "#1f2937"}
                    stroke={slot.occupied ? "#3b82f6" : "#4b5563"}
                    strokeWidth="2"
                    strokeDasharray={slot.occupied ? "none" : "3 3"}
                  />
                  <text
                    x="0"
                    y="4"
                    fill={slot.occupied ? "#ffffff" : "#9ca3af"}
                    fontSize="12"
                    fontWeight="bold"
                    fontFamily={FONT_MONO}
                    textAnchor="middle"
                  >
                    {slot.val}
                  </text>
                  <text
                    x="0"
                    y="18"
                    fill="#60a5fa"
                    fontSize="9"
                    fontFamily={FONT_MONO}
                    textAnchor="middle"
                  >
                    [{slot.idx}]
                  </text>
                </g>
              );
            })}

            {/* Pointers Annotations */}
            <text x="-160" y="-80" fill="#34d399" fontSize="12" fontFamily={FONT_MONO} fontWeight="bold">
              Front: [0] (จุด Dequeue) ──►
            </text>
            <text x="70" y="80" fill="#f59e0b" fontSize="12" fontFamily={FONT_MONO} fontWeight="bold">
              ◄── Rear: [3] (จุด Enqueue)
            </text>
          </g>
        </svg>
      }
    />
  );
}

