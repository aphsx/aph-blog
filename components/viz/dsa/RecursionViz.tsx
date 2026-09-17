"use client";

import { VizStaticFrame } from "@/components/viz/VizFrame";
import { FONT_MONO } from "./constants";

// ============================================================================
// 13. Call Stack Recursion: Factorial(4) Winding & Unwinding (Chapter 7)
// ============================================================================

export function CallStackRecursionViz() {
  return (
    <VizStaticFrame
      title="Recursion Call Stack Tracing: สองจังหวะ Winding (ดันเข้า) และ Unwinding (คืนค่า)"
      pills={[
        { label: "Winding: ขยายตัวขึ้นสู่ Base Case", color: "#3b82f6" },
        { label: "Base Case: fact(1) = 1", color: "#10b981" },
        { label: "Unwinding: คืนค่าและยุบตัว", color: "#eab308" },
      ]}
      caption="เมื่อฟังก์ชันเรียกตัวเอง Call Stack ใน RAM จะถูกดันเพิ่มทีละชั้น หากไม่มี Base Case จะเกิดบั๊ก Stack Overflow ทันที"
      diagram={
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-2">
          {/* Phase 1: Winding */}
          <div className="rounded-lg border border-[#2563eb]/40 bg-[#0e1628] p-3">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-2 font-mono text-xs">
              <span className="font-bold text-[#60a5fa]">จังหวะที่ 1: Winding (ดันเข้า Stack)</span>
              <span className="text-[#94a3b8]">Base Case Check</span>
            </div>
            <div className="mt-3 space-y-1 font-mono text-xs">
              <div className="rounded border border-[#10b981] bg-[#064e3b] p-2 text-center text-white font-bold animate-pulse">
                🎯 factorial(1) → ชน Base Case คืนค่า 1!
              </div>
              <div className="rounded border border-[#334155] bg-[#1e293b] p-2 text-center text-[#cbd5e1]">
                factorial(2) รอ factorial(1)
              </div>
              <div className="rounded border border-[#334155] bg-[#1e293b] p-2 text-center text-[#cbd5e1]">
                factorial(3) รอ factorial(2)
              </div>
              <div className="rounded border border-[#334155] bg-[#1e293b] p-2 text-center text-[#cbd5e1]">
                factorial(4) รอ factorial(3)
              </div>
            </div>
            <div className="mt-2 text-[11px] text-[#93c5fd]">↑ ฟังก์ชันซ้อนฟังก์ชันจนกระทั่งชน Base Case</div>
          </div>

          {/* Phase 2: Unwinding */}
          <div className="rounded-lg border border-[#eab308]/40 bg-[#19160d] p-3">
            <div className="flex items-center justify-between border-b border-[#2d2413] pb-2 font-mono text-xs">
              <span className="font-bold text-[#facc15]">จังหวะที่ 2: Unwinding (คืนค่าผลลัพธ์)</span>
              <span className="text-[#94a3b8]">Popping Frames</span>
            </div>
            <div className="mt-3 space-y-1.5 font-mono text-xs">
              <div className="rounded bg-[#2a2210] p-2 text-[#fde047] border border-[#eab308]/40">
                factorial(1) คืน 1 ──► 2 × 1 = <strong>2</strong>
              </div>
              <div className="rounded bg-[#2a2210] p-2 text-[#fde047] border border-[#eab308]/40">
                factorial(2) คืน 2 ──► 3 × 2 = <strong>6</strong>
              </div>
              <div className="rounded bg-[#2a2210] p-2 text-[#fde047] border border-[#eab308]/40">
                factorial(3) คืน 6 ──► 4 × 6 = <strong>24</strong>
              </div>
              <div className="rounded bg-[#10b981]/20 p-2 text-center text-[#34d399] border border-[#10b981] font-bold">
                ✓ factorial(4) สรุปคำตอบสุดท้าย = 24!
              </div>
            </div>
            <div className="mt-2 text-[11px] text-[#fde047]">↓ เมื่อคืนค่าครบ Stack Frame จะถูกทำลายคืนหน่วยความจำ</div>
          </div>
        </div>
      }
    />
  );
}


// ============================================================================
// 15. Divide & Conquer Tree (Chapter 8)
// ============================================================================

export function DivideConquerTreeViz() {
  return (
    <VizStaticFrame
      title="Divide & Conquer: แตกย่อยปัญหา (Divide) และประกอบกลับ (Merge) ใน O(n log n)"
      pills={[
        { label: "ความลึก: log₂ N ชั้น", color: "#3b82f6" },
        { label: "งานแต่ละชั้น: O(n)", color: "#10b981" },
        { label: "เวลารวม: O(n log n)", color: "#eab308" },
      ]}
      caption="Merge Sort หั่นอาร์เรย์ครึ่งหนึ่งเรื่อยๆ (log N ชั้น) แต่ละชั้นใช้เวลารวม O(n) ในการรวมข้อมูล จึงการันตี O(n log n) เสมอ"
      diagram={
        <div className="space-y-3 p-2 font-mono text-xs">
          {/* Divide Phase */}
          <div className="rounded-lg border border-[#2563eb]/40 bg-[#0e1628] p-3 text-center">
            <div className="text-xs font-bold text-[#60a5fa] mb-2 font-sans">1. Divide Phase (หั่นครึ่งปัญหาลงไปเรื่อยๆ)</div>
            <div className="flex justify-center gap-2 mb-1.5">
              <span className="rounded bg-[#1e293b] px-3 py-1 text-white border border-[#475569]">[ 8, 4, 5, 7, 1, 3, 6, 2 ] (ขนาด N)</span>
            </div>
            <div className="text-[#64748b]">▼ แบ่งครึ่ง</div>
            <div className="flex justify-center gap-8 my-1.5">
              <span className="rounded bg-[#1e293b] px-2.5 py-1 text-[#93c5fd] border border-[#334155]">[ 8, 4, 5, 7 ]</span>
              <span className="rounded bg-[#1e293b] px-2.5 py-1 text-[#93c5fd] border border-[#334155]">[ 1, 3, 6, 2 ]</span>
            </div>
            <div className="text-[#64748b]">▼ หั่นจนเหลือขนาด 1 (Base Case)</div>
            <div className="flex justify-center gap-2 mt-1.5">
              {["8", "4", "5", "7", "1", "3", "6", "2"].map((val, i) => (
                <span key={i} className="rounded bg-[#10b981]/20 px-2 py-1 text-[#34d399] border border-[#10b981]">[{val}]</span>
              ))}
            </div>
          </div>

          {/* Merge Phase */}
          <div className="rounded-lg border border-[#10b981]/40 bg-[#0c1815] p-3 text-center">
            <div className="text-xs font-bold text-[#34d399] mb-2 font-sans">2. Conquer & Merge Phase (ผสานเรียงลำดับจากล่างขึ้นบน)</div>
            <div className="flex justify-center gap-4 my-1.5">
              <span className="rounded bg-[#064e3b] px-2.5 py-1 text-white border border-[#10b981]">[ 4, 8 ]</span>
              <span className="rounded bg-[#064e3b] px-2.5 py-1 text-white border border-[#10b981]">[ 5, 7 ]</span>
              <span className="rounded bg-[#064e3b] px-2.5 py-1 text-white border border-[#10b981]">[ 1, 3 ]</span>
              <span className="rounded bg-[#064e3b] px-2.5 py-1 text-white border border-[#10b981]">[ 2, 6 ]</span>
            </div>
            <div className="text-[#64748b]">▲ Merge คู่ 4 ตัว</div>
            <div className="flex justify-center gap-8 my-1.5">
              <span className="rounded bg-[#064e3b] px-3 py-1 text-white border border-[#10b981]">[ 4, 5, 7, 8 ]</span>
              <span className="rounded bg-[#064e3b] px-3 py-1 text-white border border-[#10b981]">[ 1, 2, 3, 6 ]</span>
            </div>
            <div className="text-[#64748b]">▲ Merge ครั้งสุดท้าย (O(n))</div>
            <div className="flex justify-center mt-1.5">
              <span className="rounded bg-[#10b981] px-4 py-1.5 text-white font-bold text-sm shadow-md border border-[#34d399]">
                [ 1, 2, 3, 4, 5, 6, 7, 8 ] (เสร็จสมบูรณ์!)
              </span>
            </div>
          </div>
        </div>
      }
    />
  );
}


// ============================================================================
// 16. Backtracking Pruning State-Space Tree (Chapter 9)
// ============================================================================

export function BacktrackPruningViz() {
  return (
    <VizStaticFrame
      title="Backtracking & Pruning: พลังแห่งการตัดกิ่ง State-Space Tree"
      pills={[
        { label: "Choose: เลือกทางเดิน", color: "#3b82f6" },
        { label: "Prune: ตัดกิ่งทิ้งทันทีเมื่อผิดกฎ", color: "#ef4444" },
        { label: "Backtrack: ถอยกลับทางเดิม", color: "#eab308" },
      ]}
      caption="Backtracking เหนือกว่า Pure Brute Force เพราะมี Bounding Function ช่วยตัดกิ่งที่เป็นไปไม่ได้ทิ้งทันที ช่วยประหยัดเวลาได้อย่างมหาศาล"
      diagram={
        <svg viewBox="0 0 720 240" className="w-full h-auto">
          {/* Tree Connections */}
          <line x1="360" y1="40" x2="240" y2="110" stroke="#4a5568" strokeWidth="2" />
          <line x1="360" y1="40" x2="480" y2="110" stroke="#4a5568" strokeWidth="2" />
          <line x1="240" y1="110" x2="160" y2="180" stroke="#10b981" strokeWidth="2.5" />
          <line x1="240" y1="110" x2="300" y2="180" stroke="#10b981" strokeWidth="2.5" />
          <line x1="480" y1="110" x2="480" y2="180" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 3" />

          {/* Root */}
          <g transform="translate(360, 40)">
            <rect x="-60" y="-18" width="120" height="36" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            <text x="0" y="5" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">
              จุดเริ่มต้น []
            </text>
          </g>

          {/* Branch 1 */}
          <g transform="translate(240, 110)">
            <rect x="-50" y="-16" width="100" height="32" rx="6" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
            <text x="0" y="4" fill="#93c5fd" fontSize="11" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">
              เลือก [1]
            </text>
          </g>

          {/* Branch 2 */}
          <g transform="translate(480, 110)">
            <rect x="-50" y="-16" width="100" height="32" rx="6" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
            <text x="0" y="4" fill="#93c5fd" fontSize="11" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">
              เลือก [2]
            </text>
          </g>

          {/* Valid Leaves */}
          <g transform="translate(160, 180)">
            <rect x="-55" y="-16" width="110" height="32" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
            <text x="0" y="4" fill="#a7f3d0" fontSize="11" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">
              ✓ เลือก [1, 2]
            </text>
          </g>
          <g transform="translate(300, 180)">
            <rect x="-55" y="-16" width="110" height="32" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
            <text x="0" y="4" fill="#a7f3d0" fontSize="11" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">
              ✓ เลือก [1, 3]
            </text>
          </g>

          {/* Pruned Branch */}
          <g transform="translate(480, 180)">
            <rect x="-70" y="-16" width="140" height="32" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
            <text x="0" y="4" fill="#fca5a5" fontSize="11" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">
              ✂️ [2, 3] เกิน Target!
            </text>
            <text x="0" y="32" fill="#ef4444" fontSize="10" fontFamily={FONT_MONO} textAnchor="middle" fontWeight="bold">
              [ตัดกิ่งทิ้งทันที ไม่เดินต่อ!]
            </text>
          </g>
        </svg>
      }
    />
  );
}


// ============================================================================
// 17. Dynamic Programming Overlapping Subproblems: fib(5) (Chapter 11)
// ============================================================================

export function FibOverlappingViz() {
  return (
    <VizStaticFrame
      title="Dynamic Programming: มหันตภัยของ Overlapping Subproblems ใน fib(5)"
      pills={[
        { label: "fib(3): คำนวณซ้ำ 2 ครั้ง", color: "#eab308" },
        { label: "fib(2): คำนวณซ้ำ 3 ครั้ง", color: "#f97316" },
        { label: "Naive: O(2ⁿ) 💀 vs DP: O(n) ⚡", color: "#10b981" },
      ]}
      caption="หากไม่มี Memoization ต้นไม้จะแตกออกเป็น 2ⁿ รอบ แต่เมื่อจดจำผลลัพธ์ (Cache) เราจะคำนวณแต่ละกิ่งเพียงครั้งเดียว"
      diagram={
        <svg viewBox="0 0 720 250" className="w-full h-auto">
          {/* Edges */}
          <line x1="360" y1="40" x2="240" y2="90" stroke="#4a5568" strokeWidth="1.5" />
          <line x1="360" y1="40" x2="480" y2="90" stroke="#4a5568" strokeWidth="1.5" />

          <line x1="240" y1="90" x2="160" y2="150" stroke="#4a5568" strokeWidth="1.5" />
          <line x1="240" y1="90" x2="300" y2="150" stroke="#4a5568" strokeWidth="1.5" />
          <line x1="480" y1="90" x2="420" y2="150" stroke="#4a5568" strokeWidth="1.5" />
          <line x1="480" y1="90" x2="540" y2="150" stroke="#4a5568" strokeWidth="1.5" />

          {/* Level 0: fib(5) */}
          <g transform="translate(360, 40)">
            <circle cx="0" cy="0" r="18" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
            <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">f(5)</text>
          </g>

          {/* Level 1: fib(4), fib(3) */}
          <g transform="translate(240, 90)">
            <circle cx="0" cy="0" r="16" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
            <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">f(4)</text>
          </g>
          {/* fib(3) - Overlapping Occurrence 1 */}
          <g transform="translate(480, 90)">
            <circle cx="0" cy="0" r="18" fill="#ca8a04" stroke="#fde047" strokeWidth="2" />
            <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">f(3)</text>
            <text x="35" y="4" fill="#fde047" fontSize="10" fontFamily={FONT_MONO}>ซ้ำรอบ 1</text>
          </g>

          {/* Level 2: fib(3), fib(2), fib(2), fib(1) */}
          {/* fib(3) - Overlapping Occurrence 2 */}
          <g transform="translate(160, 150)">
            <circle cx="0" cy="0" r="18" fill="#ca8a04" stroke="#fde047" strokeWidth="2" />
            <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">f(3)</text>
            <text x="-40" y="4" fill="#fde047" fontSize="10" fontFamily={FONT_MONO}>ซ้ำรอบ 2</text>
          </g>
          {/* fib(2) - Overlapping Occurrence 1 */}
          <g transform="translate(300, 150)">
            <circle cx="0" cy="0" r="16" fill="#ea580c" stroke="#fb923c" strokeWidth="2" />
            <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">f(2)</text>
          </g>
          {/* fib(2) - Overlapping Occurrence 2 */}
          <g transform="translate(420, 150)">
            <circle cx="0" cy="0" r="16" fill="#ea580c" stroke="#fb923c" strokeWidth="2" />
            <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">f(2)</text>
          </g>
          <g transform="translate(540, 150)">
            <circle cx="0" cy="0" r="14" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <text x="0" y="4" fill="#cbd5e1" fontSize="9" fontFamily={FONT_MONO} textAnchor="middle">f(1)</text>
          </g>

          {/* Bottom Summary Banner */}
          <g transform="translate(360, 215)">
            <rect x="-240" y="-16" width="480" height="32" rx="6" fill="#111827" stroke="#374151" />
            <text x="0" y="5" fill="#e2e8f0" fontSize="11" fontFamily={FONT_MONO} textAnchor="middle">
              โหนดสีเหลือง <span className="text-[#fde047] font-bold">f(3)</span> และสีส้ม <span className="text-[#fb923c] font-bold">f(2)</span> คือคำตอบซ้ำที่ Memoization จำไว้ได้ทันที
            </text>
          </g>
        </svg>
      }
    />
  );
}
