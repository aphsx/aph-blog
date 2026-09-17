"use client";

import { useState } from "react";
import { VizStaticFrame } from "@/components/viz/VizFrame";
import { FONT_MONO } from "./constants";

// ============================================================================
// 5. Digit Extraction Pattern: % 10 and // 10 (Chapter 3)
// ============================================================================

export function DigitExtractionViz() {
  const steps = [
    { round: 1, n: 1234, mod: 4, div: 123, acc: 4, note: "ดึงหลักหน่วย (4) ออกมาตั้งต้น" },
    { round: 2, n: 123, mod: 3, div: 12, acc: 43, note: "4 * 10 + 3 = 43" },
    { round: 3, n: 12, mod: 2, div: 1, acc: 432, note: "43 * 10 + 2 = 432" },
    { round: 4, n: 1, mod: 1, div: 0, acc: 4321, note: "432 * 10 + 1 = 4321 (จบเมื่อ n=0)" },
  ];

  return (
    <VizStaticFrame
      title="Digit Extraction Pattern: การแกะหลักตัวเลขด้วย % 10 และ // 10"
      pills={[
        { label: "Modulo % 10: ดึงหลักท้าย", color: "#f59e0b" },
        { label: "Division // 10: ตัดหลักท้าย", color: "#3b82f6" },
        { label: "ผลลัพธ์กลับด้าน = 4321", color: "#10b981" },
      ]}
      caption="เทคนิคแกนกลางสำหรับโจทย์ Palindrome Number (LC 9) และ Reverse Integer (LC 7) โดยไม่ต้องแปลงเป็น String"
      diagram={
        <div className="space-y-2 p-2">
          {steps.map((st) => (
            <div
              key={st.round}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#22283a] bg-[#111522] px-4 py-2.5"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#1e2638] text-xs font-bold text-white">
                  {st.round}
                </span>
                <span className="font-mono text-sm text-[#cbd5e1]">
                  <strong className="text-white">{st.n}</strong> % 10 ={" "}
                  <span className="font-bold text-[#f59e0b]">{st.mod}</span>
                </span>
                <span className="text-xs text-[#64748b]">|</span>
                <span className="font-mono text-sm text-[#cbd5e1]">
                  {st.n} // 10 = <span className="font-bold text-[#38bdf8]">{st.div}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#8a90a0]">{st.note}</span>
                <span className="rounded border border-[#10b981]/40 bg-[#064e3b]/40 px-2 py-0.5 font-mono text-xs font-bold text-[#34d399]">
                  สะสม: {st.acc}
                </span>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
}

// ============================================================================
// 6. Dynamic Array Memory: Stack Header vs Heap Buffer (Chapter 4)
// ============================================================================

export function DynamicArrayMemoryViz() {
  return (
    <VizStaticFrame
      title="Dynamic Array Memory Architecture: Stack Header ชี้ไปยัง Heap Buffer"
      pills={[
        { label: "Stack Header: 24 Bytes", color: "#3b82f6" },
        { label: "Heap Buffer: ข้อมูลจริง", color: "#10b981" },
        { label: "Size = 3 | Capacity = 4", color: "#eab308" },
      ]}
      caption="Vector บน Stack เก็บ Pointer ชี้ไปยัง Heap ซึ่งจองพื้นที่เกินไว้ (Capacity=4) ทำให้ append สมาชิกตัวถัดไปได้ใน O(1)"
      diagram={
        <svg viewBox="0 0 720 240" className="w-full h-auto">
          <defs>
            <marker id="ptrArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Stack Region Box */}
          <g>
            <rect x="50" y="40" width="220" height="150" rx="8" fill="#111726" stroke="#2563eb" strokeWidth="2" />
            <text x="65" y="65" fill="#93c5fd" fontSize="13" fontWeight="bold" fontFamily={FONT_MONO}>Stack Memory (Header)</text>
            
            {/* Stack fields */}
            <g transform="translate(65, 80)">
              <rect x="0" y="0" width="190" height="28" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="10" y="18" fill="#38bdf8" fontSize="11" fontFamily={FONT_MONO} fontWeight="bold">data* (ptr): 0x7fa0</text>
              
              <rect x="0" y="34" width="190" height="28" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="10" y="52" fill="#e2e8f0" fontSize="11" fontFamily={FONT_MONO}>size: 3</text>
              
              <rect x="0" y="68" width="190" height="28" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="10" y="86" fill="#eab308" fontSize="11" fontFamily={FONT_MONO}>capacity: 4</text>
            </g>
          </g>

          {/* Pointer Curve */}
          <path d="M 255 94 C 320 94, 330 110, 380 110" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#ptrArrow)" />

          {/* Heap Region Box */}
          <g>
            <rect x="380" y="40" width="290" height="150" rx="8" fill="#0f1f1d" stroke="#059669" strokeWidth="2" />
            <text x="395" y="65" fill="#6ee7b7" fontSize="13" fontWeight="bold" fontFamily={FONT_MONO}>Heap Memory (0x7fa0)</text>

            {/* Heap array elements */}
            <g transform="translate(395, 85)">
              {[
                { val: "10", active: true, idx: 0 },
                { val: "20", active: true, idx: 1 },
                { val: "30", active: true, idx: 2 },
                { val: "ว่าง", active: false, idx: 3 },
              ].map((item, i) => (
                <g key={i} transform={`translate(${i * 64}, 0)`}>
                  <rect
                    x="0"
                    y="0"
                    width="56"
                    height="50"
                    rx="6"
                    fill={item.active ? "#064e3b" : "#1e293b"}
                    stroke={item.active ? "#10b981" : "#eab308"}
                    strokeWidth={item.active ? 2 : 1.5}
                    strokeDasharray={item.active ? "none" : "4 3"}
                  />
                  <text
                    x="28"
                    y="30"
                    fill={item.active ? "#ffffff" : "#eab308"}
                    fontSize="13"
                    fontWeight="bold"
                    fontFamily={FONT_MONO}
                    textAnchor="middle"
                  >
                    {item.val}
                  </text>
                  <text x="28" y="65" fill="#64748b" fontSize="10" fontFamily={FONT_MONO} textAnchor="middle">
                    [{item.idx}]
                  </text>
                </g>
              ))}
            </g>
            <text x="395" y="172" fill="#94a3b8" fontSize="11" fontFamily={FONT_MONO}>
              ↑ สมาชิก 3 ตัวแรก | ช่อง 4 ว่าง รองรับ O(1) Push
            </text>
          </g>
        </svg>
      }
    />
  );
}

// ============================================================================
// 7. Memory Alignment & Struct Padding (Chapter 4)
// ============================================================================

export function MemoryAlignmentViz() {
  return (
    <VizStaticFrame
      title="Hardware Word Alignment: ทำไมขนาด Struct ถึงไม่เท่ากับผลรวมตัวแปร?"
      pills={[
        { label: "BadStruct: 12 Bytes (เปลือง 50%)", color: "#ef4444" },
        { label: "GoodStruct: 8 Bytes (ประหยัด 33%)", color: "#10b981" },
      ]}
      caption="CPU อ่าน RAM ทีละ Word (4 Bytes) หากตัวแปรไม่ตรงขอบเขต Compiler จะแทรก Padding เพื่อให้ CPU อ่านรอบเดียวเสร็จ"
      diagram={
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-2">
          {/* BadStruct */}
          <div className="rounded-lg border border-[#ef4444]/40 bg-[#16121a] p-3">
            <div className="flex items-center justify-between border-b border-[#3b1d28] pb-2">
              <span className="font-mono text-xs font-bold text-[#f87171]">struct BadStruct</span>
              <span className="rounded bg-[#ef4444]/20 px-2 py-0.5 font-mono text-xs text-[#fca5a5]">12 Bytes ❌</span>
            </div>
            <div className="mt-3 space-y-1.5 font-mono text-xs">
              <div className="flex gap-1">
                <div className="flex-1 rounded bg-[#3b82f6]/40 p-2 text-center text-[#93c5fd] border border-[#3b82f6]">char a (1B)</div>
                <div className="flex-[3] rounded bg-[#ef4444]/30 p-2 text-center text-[#fca5a5] border border-[#ef4444] border-dashed">Padding 3B (ว่าง)</div>
              </div>
              <div className="rounded bg-[#10b981]/40 p-2 text-center text-[#6ee7b7] border border-[#10b981]">
                int b (4 Bytes)
              </div>
              <div className="flex gap-1">
                <div className="flex-1 rounded bg-[#eab308]/40 p-2 text-center text-[#fde047] border border-[#eab308]">char c (1B)</div>
                <div className="flex-[3] rounded bg-[#ef4444]/30 p-2 text-center text-[#fca5a5] border border-[#ef4444] border-dashed">Padding 3B (ว่าง)</div>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-[#fca5a5]">สูญเสียพื้นที่ไปกับ Padding เปล่าถึง 6 ไบต์!</div>
          </div>

          {/* GoodStruct */}
          <div className="rounded-lg border border-[#10b981]/40 bg-[#0f1a18] p-3">
            <div className="flex items-center justify-between border-b border-[#1b3d35] pb-2">
              <span className="font-mono text-xs font-bold text-[#34d399]">struct GoodStruct</span>
              <span className="rounded bg-[#10b981]/20 px-2 py-0.5 font-mono text-xs text-[#86efac]">8 Bytes ✅</span>
            </div>
            <div className="mt-3 space-y-1.5 font-mono text-xs">
              <div className="rounded bg-[#10b981]/40 p-2 text-center text-[#6ee7b7] border border-[#10b981]">
                int b (4 Bytes)
              </div>
              <div className="flex gap-1">
                <div className="flex-1 rounded bg-[#3b82f6]/40 p-2 text-center text-[#93c5fd] border border-[#3b82f6]">char a (1B)</div>
                <div className="flex-1 rounded bg-[#eab308]/40 p-2 text-center text-[#fde047] border border-[#eab308]">char c (1B)</div>
                <div className="flex-[2] rounded bg-[#64748b]/30 p-2 text-center text-[#cbd5e1] border border-[#64748b] border-dashed">Pad 2B</div>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-[#86efac]">จัดตัวแปรเรียงตามขนาด ลดขนาดเหลือ 8 ไบต์ ประหยัด RAM 33%!</div>
          </div>
        </div>
      }
    />
  );
}

