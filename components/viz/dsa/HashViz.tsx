"use client";

import { VizStaticFrame } from "@/components/viz/VizFrame";
import { FONT_MONO } from "./constants";

// ============================================================================
// 11. Hash Function Pipeline: Key to Bucket Index (Chapter 6)
// ============================================================================

export function HashFunctionPipelineViz() {
  return (
    <VizStaticFrame
      title="Hash Table Mechanics: การแปลง Key สู่ Bucket Index ในหน่วยความจำ"
      pills={[
        { label: "Key: สตริงใดๆ", color: "#3b82f6" },
        { label: "Hash Code: ตัวเลขขนาดใหญ่", color: "#8b5cf6" },
        { label: "Bucket Index: % Table_Size", color: "#10b981" },
      ]}
      caption="Hash Table ทำงานได้ใน O(1) เพราะใช้สูตรคณิตศาสตร์คำนวณตำแหน่ง Memory Offset โดยตรง โดยไม่ต้องวนลูปเปรียบเทียบ"
      diagram={
        <div className="space-y-3 p-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-2 text-center">
            {/* 1. Key */}
            <div className="rounded-lg border border-[#3b82f6]/40 bg-[#0e1628] p-3">
              <span className="text-[10px] text-[#93c5fd] font-mono">1. Raw Key</span>
              <div className="mt-1 font-mono text-sm font-bold text-white">"john_doe"</div>
              <span className="text-[11px] text-[#8a90a0]">ข้อมูลตั้งต้น</span>
            </div>

            {/* 2. Hash Function */}
            <div className="rounded-lg border border-[#8b5cf6]/40 bg-[#171228] p-3">
              <span className="text-[10px] text-[#c4b5fd] font-mono">2. Hash Function</span>
              <div className="mt-1 font-mono text-sm font-bold text-[#a78bfa]">2,948,104,912</div>
              <span className="text-[11px] text-[#8a90a0]">32-bit Integer</span>
            </div>

            {/* 3. Modulo Table Size */}
            <div className="rounded-lg border border-[#eab308]/40 bg-[#1a170e] p-3">
              <span className="text-[10px] text-[#fde047] font-mono">3. Compression</span>
              <div className="mt-1 font-mono text-sm font-bold text-[#facc15]">% 8 (ขนาด RAM)</div>
              <span className="text-[11px] text-[#8a90a0]">บีบลงขนาดตาราง</span>
            </div>

            {/* 4. Bucket Index */}
            <div className="rounded-lg border border-[#10b981]/40 bg-[#0e1c18] p-3">
              <span className="text-[10px] text-[#6ee7b7] font-mono">4. Bucket Slot</span>
              <div className="mt-1 font-mono text-sm font-bold text-[#34d399]">Index = 4</div>
              <span className="text-[11px] text-[#8a90a0]">O(1) Direct Access</span>
            </div>
          </div>

          {/* Bucket Array Representation */}
          <div className="rounded-lg border border-[#2a3040] bg-[#111420] p-3">
            <div className="text-xs text-[#8a90a0] mb-2 font-mono">ตารางอาร์เรย์ในหน่วยความจำ RAM (Array of Buckets):</div>
            <div className="grid grid-cols-8 gap-1 font-mono text-xs text-center">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const isTarget = i === 4;
                return (
                  <div
                    key={i}
                    className={`rounded p-2 border ${
                      isTarget
                        ? "bg-[#10b981] border-[#34d399] text-white font-bold shadow-md shadow-emerald-500/20"
                        : "bg-[#1a2030] border-[#2e374d] text-[#64748b]"
                    }`}
                  >
                    <div>[{i}]</div>
                    <div className="text-[10px] mt-1 truncate">
                      {isTarget ? "Value ⚡" : "null"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
    />
  );
}

