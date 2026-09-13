"use client";

import { useState } from "react";
import { VizStaticFrame } from "@/components/viz/VizFrame";

const FONT_MONO = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";

// ============================================================================
// 1. Big-O Complexity Spectrum (Chapter 2)
// ============================================================================

interface BigOCurve {
  id: string;
  name: string;
  formula: string;
  category: string;
  badgeColor: string;
  strokeColor: string;
  grade: "excellent" | "good" | "fair" | "bad" | "horrible";
  n1m: string;
  example: string;
  path: string;
  labelX: number;
  labelY: number;
}

const BIG_O_CURVES: BigOCurve[] = [
  {
    id: "o-1",
    name: "Constant Time",
    formula: "O(1)",
    category: "เร็วมหัศจรรย์",
    badgeColor: "#10b981",
    strokeColor: "#10b981",
    grade: "excellent",
    n1m: "1 รอบ (⚡ สม่ำเสมอไม่ว่าข้อมูลจะมากเพียงใด)",
    example: "เข้าถึงข้อมูลใน Array ด้วย Index (arr[i]), Hash Map get/put",
    path: "M 90 380 L 710 380",
    labelX: 715,
    labelY: 384,
  },
  {
    id: "o-log-n",
    name: "Logarithmic Time",
    formula: "O(log n)",
    category: "ยอดเยี่ยมมาก",
    badgeColor: "#06b6d4",
    strokeColor: "#06b6d4",
    grade: "excellent",
    n1m: "~20 รอบ (🚀 แบ่งครึ่งปัญหาทุกก้าว)",
    example: "Binary Search ในพจนานุกรม, Balanced Binary Search Tree (AVL/Red-Black)",
    path: "M 90 380 C 180 374, 380 354, 710 346",
    labelX: 715,
    labelY: 350,
  },
  {
    id: "o-n",
    name: "Linear Time",
    formula: "O(n)",
    category: "มาตรฐานที่ยอมรับได้",
    badgeColor: "#84cc16",
    strokeColor: "#84cc16",
    grade: "good",
    n1m: "1,000,000 รอบ (✅ โตตามขนาดข้อมูล 1:1)",
    example: "การวนลูปสแกนหาค่า Max/Min, Linear Search ในลิสต์ที่ไม่ได้จัดเรียง",
    path: "M 90 380 L 690 170",
    labelX: 695,
    labelY: 168,
  },
  {
    id: "o-n-log-n",
    name: "Linearithmic Time",
    formula: "O(n log n)",
    category: "ขีดจำกัดสูงสุดของ Sorting",
    badgeColor: "#eab308",
    strokeColor: "#eab308",
    grade: "fair",
    n1m: "~20,000,000 รอบ (⏱️ ยอดเยี่ยมสำหรับงานจัดเรียงข้อมูล)",
    example: "Merge Sort, Quick Sort (Average), Timsort (ใน Python sort() & C++ std::sort)",
    path: "M 90 380 C 260 350, 480 230, 590 60",
    labelX: 595,
    labelY: 55,
  },
  {
    id: "o-n-2",
    name: "Quadratic Time",
    formula: "O(n²)",
    category: "ช้า — ลูปซ้อนกัน 2 ชั้น",
    badgeColor: "#f97316",
    strokeColor: "#f97316",
    grade: "bad",
    n1m: "1,000,000,000,000 รอบ (🐌 เกิน 1 วินาที! ระบบอาจค้าง)",
    example: "Bubble Sort, Insertion Sort, Nested loop ตรวจสอบคู่ข้อมูลทุกคู่",
    path: "M 90 380 C 230 365, 380 230, 450 60",
    labelX: 450,
    labelY: 50,
  },
  {
    id: "o-2-n",
    name: "Exponential Time",
    formula: "O(2ⁿ)",
    category: "อันตราย — เพิ่มขึ้นเท่าตัวทุกก้าว",
    badgeColor: "#ef4444",
    strokeColor: "#ef4444",
    grade: "horrible",
    n1m: "2¹⁰⁰⁰⁰⁰⁰ (💀 มหาศาลกว่าอะตอมในจักรวาล)",
    example: "Recursive Fibonacci แบบดิบไม่จำผลลัพธ์, การสร้าง Subsets ทั้งหมดของเซต",
    path: "M 90 380 C 190 365, 270 230, 310 60",
    labelX: 310,
    labelY: 50,
  },
  {
    id: "o-n-fac",
    name: "Factorial Time",
    formula: "O(n!)",
    category: "ช้าที่สุด — วิกฤต",
    badgeColor: "#ec4899",
    strokeColor: "#ec4899",
    grade: "horrible",
    n1m: "1,000,000! (💥 ค้างตั้งแต่ N ≥ 15)",
    example: "Traveling Salesperson Problem (TSP) Brute Force, สร้าง Permutations ทั้งหมด",
    path: "M 90 380 C 130 360, 180 220, 200 60",
    labelX: 200,
    labelY: 50,
  },
];

export function BigOChartViz() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = BIG_O_CURVES.find((c) => c.id === selectedId) || null;

  return (
    <VizStaticFrame
      title="Big-O Complexity Chart: สเปกตรัมความซับซ้อนและการเติบโตของอัลกอริทึม"
      pills={[
        { label: "O(1) Constant", color: "#10b981" },
        { label: "O(log n) Log", color: "#06b6d4" },
        { label: "O(n) Linear", color: "#84cc16" },
        { label: "O(n log n)", color: "#eab308" },
        { label: "O(n²) Quadratic", color: "#f97316" },
        { label: "O(2ⁿ) Exponential", color: "#ef4444" },
        { label: "O(n!) Factorial", color: "#ec4899" },
      ]}
      caption="คลิกหรือแตะที่ปุ่มหรือเส้นกราฟเพื่อดูรายละเอียดเชิงลึกและจำนวนรอบการคำนวณจริงเมื่อ N = 1,000,000"
      diagram={
        <div className="space-y-3">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 px-2">
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                selectedId === null
                  ? "bg-white/20 text-white ring-1 ring-white/40"
                  : "bg-[#161a26] text-[#8a90a0] hover:text-white"
              }`}
            >
              แสดงทั้งหมด
            </button>
            {BIG_O_CURVES.map((curve) => {
              const active = selectedId === curve.id;
              return (
                <button
                  key={curve.id}
                  type="button"
                  onClick={() => setSelectedId(active ? null : curve.id)}
                  className="rounded-full px-2.5 py-1 text-xs font-mono font-bold transition-all"
                  style={{
                    backgroundColor: active ? curve.strokeColor : "#161a26",
                    color: active ? "#ffffff" : curve.strokeColor,
                    boxShadow: active ? `0 0 12px ${curve.strokeColor}80` : "none",
                    border: `1px solid ${active ? curve.strokeColor : "#2a3040"}`,
                  }}
                >
                  {curve.formula}
                </button>
              );
            })}
          </div>

          {/* Interactive SVG Chart */}
          <div className="relative overflow-hidden rounded-lg border border-[#2a3040] bg-[#080a10]">
            <svg
              viewBox="0 0 780 430"
              className="w-full h-auto select-none"
              style={{ maxHeight: 420 }}
            >
              <defs>
                {/* Zone Gradients */}
                <linearGradient id="bgZones" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
                  <stop offset="25%" stopColor="#84cc16" stopOpacity="0.06" />
                  <stop offset="50%" stopColor="#eab308" stopOpacity="0.06" />
                  <stop offset="75%" stopColor="#f97316" stopOpacity="0.07" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.10" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker
                  id="axisArrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#6a7282" />
                </marker>
              </defs>

              {/* Background Zone Fill */}
              <rect x="90" y="50" width="670" height="340" fill="url(#bgZones)" />

              {/* Grid Lines */}
              {[120, 190, 260, 330].map((y) => (
                <line
                  key={`h-${y}`}
                  x1="90"
                  y1={y}
                  x2="760"
                  y2={y}
                  stroke="#1c2230"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              ))}
              {[220, 350, 480, 610].map((x) => (
                <line
                  key={`v-${x}`}
                  x1={x}
                  y1="50"
                  x2={x}
                  y2="390"
                  stroke="#1c2230"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              ))}

              {/* Complexity Zones Legend on the Right Background */}
              <g opacity="0.4" fontSize="11" fontFamily={FONT_MONO} fontWeight="bold">
                <text x="750" y="70" textAnchor="end" fill="#ef4444">
                  HORRIBLE (วิกฤต)
                </text>
                <text x="750" y="160" textAnchor="end" fill="#f97316">
                  BAD (ช้ามาก)
                </text>
                <text x="750" y="240" textAnchor="end" fill="#eab308">
                  FAIR (พอใช้)
                </text>
                <text x="750" y="310" textAnchor="end" fill="#84cc16">
                  GOOD (ดี)
                </text>
                <text x="750" y="375" textAnchor="end" fill="#10b981">
                  EXCELLENT (ยอดเยี่ยม)
                </text>
              </g>

              {/* Axes */}
              <line
                x1="90"
                y1="390"
                x2="90"
                y2="30"
                stroke="#6a7282"
                strokeWidth="2"
                markerEnd="url(#axisArrow)"
              />
              <line
                x1="80"
                y1="390"
                x2="765"
                y2="390"
                stroke="#6a7282"
                strokeWidth="2"
                markerEnd="url(#axisArrow)"
              />

              {/* Axis Labels */}
              <text
                x="425"
                y="418"
                textAnchor="middle"
                fill="#8a90a0"
                fontSize="12"
                fontFamily={FONT_MONO}
                fontWeight="600"
              >
                ขนาดข้อมูลนำเข้า (Size of Input N) →
              </text>
              <text
                x="45"
                y="200"
                textAnchor="middle"
                transform="rotate(-90 45 200)"
                fill="#8a90a0"
                fontSize="12"
                fontFamily={FONT_MONO}
                fontWeight="600"
              >
                จำนวนการทำงาน (Operations) →
              </text>

              {/* Render Curves */}
              {BIG_O_CURVES.map((curve) => {
                const isSelected = selectedId === curve.id;
                const isDimmed = selectedId !== null && !isSelected;
                const strokeWidth = isSelected ? 4 : 2.5;

                return (
                  <g
                    key={curve.id}
                    className="cursor-pointer transition-opacity duration-200"
                    opacity={isDimmed ? 0.2 : 1}
                    onClick={() => setSelectedId(isSelected ? null : curve.id)}
                  >
                    <path
                      d={curve.path}
                      fill="none"
                      stroke={curve.strokeColor}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      filter={isSelected ? "url(#glow)" : undefined}
                    />
                    {/* Curve Label */}
                    <g transform={`translate(${curve.labelX}, ${curve.labelY})`}>
                      <rect
                        x="-4"
                        y="-12"
                        width={curve.formula.length * 9 + 12}
                        height="18"
                        rx="4"
                        fill="#0c0e16"
                        stroke={curve.strokeColor}
                        strokeWidth={isSelected ? 1.5 : 1}
                      />
                      <text
                        x="2"
                        y="1"
                        fill={curve.strokeColor}
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily={FONT_MONO}
                      >
                        {curve.formula}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Dynamic Inspector Panel */}
          {selected ? (
            <div
              className="rounded-lg border p-3.5 transition-all"
              style={{
                backgroundColor: "#10141f",
                borderColor: `${selected.strokeColor}60`,
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#242c3c] pb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="rounded px-2 py-0.5 font-mono text-sm font-bold text-white"
                    style={{ backgroundColor: selected.strokeColor }}
                  >
                    {selected.formula}
                  </span>
                  <span className="font-bold text-white">{selected.name}</span>
                  <span className="text-xs text-[#8a90a0]">({selected.category})</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="text-xs text-[#8a90a0] hover:text-white"
                >
                  ✕ ปิดโฟกัส
                </button>
              </div>
              <div className="mt-2.5 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                <div className="rounded bg-[#161c2b] p-2">
                  <span className="block font-semibold text-[#8a90a0]">เมื่อ N = 1,000,000:</span>
                  <span className="font-mono text-sm text-[#e2e8f0]">{selected.n1m}</span>
                </div>
                <div className="rounded bg-[#161c2b] p-2">
                  <span className="block font-semibold text-[#8a90a0]">ตัวอย่างโค้ดในชีวิตจริง:</span>
                  <span className="text-sm text-[#e2e8f0]">{selected.example}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-[#222838] bg-[#10141f] p-3 text-center text-xs text-[#8a90a0]">
              💡 <span className="text-white font-medium">คำแนะนำ:</span> คลิกที่ปุ่มด้านบน หรือคลิกที่เส้นกราฟเพื่อดูสถิติและการทำงานของความซับซ้อนแต่ละระดับ
            </div>
          )}
        </div>
      }
    />
  );
}

// ============================================================================
// 2. Asymptotic Bounds: Big-O vs Big-Omega vs Big-Theta (Chapter 2)
// ============================================================================

export function AsymptoticBoundsViz() {
  return (
    <VizStaticFrame
      title="Asymptotic Bounds: ขอบเขตบน ขอบเขตล่าง และขอบเขตประกบแน่น"
      pills={[
        { label: "Big-O: Upper Bound", color: "#ef4444" },
        { label: "Big-Theta: Tight Bound", color: "#eab308" },
        { label: "Big-Omega: Lower Bound", color: "#10b981" },
      ]}
      caption="Big-O คือมาตรฐานที่ห้องสัมภาษณ์สากลใช้ เพราะเป็นการันตีว่าโค้ดจะไม่ทำงานช้าไปกว่านี้ (Worst Case Safety Guarantee)"
      diagram={
        <svg viewBox="0 0 720 280" className="w-full h-auto">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#6a7282" />
            </marker>
          </defs>

          {/* Axes */}
          <line x1="80" y1="240" x2="80" y2="30" stroke="#6a7282" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="70" y1="240" x2="680" y2="240" stroke="#6a7282" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="380" y="268" textAnchor="middle" fill="#8a90a0" fontSize="12" fontFamily={FONT_MONO}>ขนาดข้อมูล N →</text>
          <text x="35" y="130" textAnchor="middle" transform="rotate(-90 35 130)" fill="#8a90a0" fontSize="12" fontFamily={FONT_MONO}>เวลา T(n) →</text>

          {/* n0 threshold line */}
          <line x1="260" y1="40" x2="260" y2="240" stroke="#4a5568" strokeDasharray="4 4" strokeWidth="1.5" />
          <text x="260" y="258" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily={FONT_MONO} fontWeight="bold">n₀ (จุดเริ่มต้นที่ทฤษฎีถือเป็นจริง)</text>

          {/* Shaded asymptotic validity region */}
          <rect x="260" y="40" width="400" height="200" fill="#3b82f6" fillOpacity="0.04" />
          <text x="460" y="55" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily={FONT_MONO}>พื้นที่ N ≥ n₀ (Asymptotic Zone)</text>

          {/* Curves */}
          {/* Upper bound: c2 * g(n) */}
          <path d="M 80 230 C 180 200, 350 110, 650 40" fill="none" stroke="#ef4444" strokeWidth="3" />
          <text x="655" y="45" fill="#ef4444" fontSize="12" fontFamily={FONT_MONO} fontWeight="bold">c₂ · g(n) [Big-O: ขอบเขตบนสุด]</text>

          {/* Actual function f(n) / Tight Bound Theta */}
          <path d="M 80 235 C 220 220, 360 150, 650 110" fill="none" stroke="#eab308" strokeWidth="3" />
          <text x="655" y="115" fill="#eab308" fontSize="12" fontFamily={FONT_MONO} fontWeight="bold">f(n) [Big-Θ: พฤติกรรมจริง]</text>

          {/* Lower bound: c1 * g(n) */}
          <path d="M 80 238 C 240 230, 420 200, 650 170" fill="none" stroke="#10b981" strokeWidth="3" />
          <text x="655" y="175" fill="#10b981" fontSize="12" fontFamily={FONT_MONO} fontWeight="bold">c₁ · g(n) [Big-Ω: ขอบเขตล่างสุด]</text>
        </svg>
      }
    />
  );
}

// ============================================================================
// 3. Amortized Doubling: The Banker's Method (Chapter 2)
// ============================================================================

export function AmortizedDoublingViz() {
  const pushes = [
    { n: 1, cost: 1, cap: 1, realloc: true, label: "จองใหม่ C=1" },
    { n: 2, cost: 2, cap: 2, realloc: true, label: "ขยาย C=2 (copy 1)" },
    { n: 3, cost: 3, cap: 4, realloc: true, label: "ขยาย C=4 (copy 2)" },
    { n: 4, cost: 1, cap: 4, realloc: false, label: "ใส่ช่องว่าง O(1)" },
    { n: 5, cost: 5, cap: 8, realloc: true, label: "ขยาย C=8 (copy 4)" },
    { n: 6, cost: 1, cap: 8, realloc: false, label: "ใส่ช่องว่าง O(1)" },
    { n: 7, cost: 1, cap: 8, realloc: false, label: "ใส่ช่องว่าง O(1)" },
    { n: 8, cost: 1, cap: 8, realloc: false, label: "ใส่ช่องว่าง O(1)" },
  ];

  return (
    <VizStaticFrame
      title="Amortized Analysis: การถัวเฉลี่ยค่าใช้จ่ายการขยาย Dynamic Array (Geometric Doubling)"
      pills={[
        { label: "Push 1..8 รวม 15 สเต็ป", color: "#3b82f6" },
        { label: "ค่าเฉลี่ย = 1.875 สเต็ป/ครั้ง", color: "#10b981" },
        { label: "Amortized O(1)", color: "#eab308" },
      ]}
      caption="แม้บางจังหวะจะเสียเวลา O(n) ในการคัดลอกข้อมูล แต่เกิดขึ้นไม่บ่อย เมื่อถัวเฉลี่ยตลอดอายุการใช้งานจึงมีค่าคงที่ ≤ 2-3 สเต็ปเสมอ"
      diagram={
        <svg viewBox="0 0 720 260" className="w-full h-auto">
          {/* Grid lines */}
          {[1, 2, 3, 4, 5].map((c) => {
            const y = 200 - c * 32;
            return (
              <g key={c}>
                <line x1="60" y1={y} x2="680" y2={y} stroke="#1e2433" strokeDasharray="3 3" />
                <text x="45" y={y + 4} fill="#64748b" fontSize="11" fontFamily={FONT_MONO} textAnchor="end">
                  {c}
                </text>
              </g>
            );
          })}

          {/* Baseline */}
          <line x1="50" y1="200" x2="690" y2="200" stroke="#4a5568" strokeWidth="2" />

          {/* Average Line (Amortized Cost = 1.875) */}
          <line x1="60" y1={200 - 1.875 * 32} x2="680" y2={200 - 1.875 * 32} stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" />
          <text x="685" y={200 - 1.875 * 32 - 6} fill="#10b981" fontSize="11" fontFamily={FONT_MONO} textAnchor="end" fontWeight="bold">
            Amortized Average = 1.875 ops (ค่าคงที่ O(1))
          </text>

          {/* Bars */}
          {pushes.map((p, i) => {
            const x = 80 + i * 72;
            const barH = p.cost * 32;
            const y = 200 - barH;
            return (
              <g key={p.n}>
                <rect
                  x={x}
                  y={y}
                  width="44"
                  height={barH}
                  rx="4"
                  fill={p.realloc ? "#f97316" : "#3b82f6"}
                  stroke={p.realloc ? "#ea580c" : "#2563eb"}
                  strokeWidth="1.5"
                />
                <text x={x + 22} y={y - 6} fill={p.realloc ? "#fdba74" : "#93c5fd"} fontSize="12" fontFamily={FONT_MONO} textAnchor="middle" fontWeight="bold">
                  {p.cost}
                </text>
                <text x={x + 22} y="218" fill="#e2e8f0" fontSize="11" fontFamily={FONT_MONO} textAnchor="middle">
                  Push {p.n}
                </text>
                <text x={x + 22} y="233" fill="#64748b" fontSize="9" fontFamily={FONT_MONO} textAnchor="middle">
                  Cap={p.cap}
                </text>
              </g>
            );
          })}
        </svg>
      }
    />
  );
}

// ============================================================================
// 4. Compilation & Execution Pipeline (Chapter 1)
// ============================================================================

export function CompilationPipelineViz() {
  const steps = [
    { title: "Source Code", sub: "C++ / Python", icon: "📄", desc: "โค้ดภาษามนุษย์", color: "#3b82f6" },
    { title: "Compiler / VM", sub: "Clang / CPython", icon: "⚙️", desc: "แปลงโค้ดเชิงนามธรรม", color: "#8b5cf6" },
    { title: "Assembly", sub: "MOV, ADD, JMP", icon: "🧩", desc: "คำสั่งระดับสถาปัตยกรรม", color: "#f59e0b" },
    { title: "Machine Code", sub: "01001000 1001...", icon: "⚡", desc: "เลขฐานสองสั่งงาน RAM", color: "#10b981" },
    { title: "CPU Silicon", sub: "Transistor Voltage", icon: "💻", desc: "แรงดันไฟฟ้าประมวลผล", color: "#06b6d4" },
  ];

  return (
    <VizStaticFrame
      title="Hardware-Software Pipeline: การเดินทางของโค้ดสู่กระแสไฟฟ้าใน CPU"
      pills={[
        { label: "High-Level", color: "#3b82f6" },
        { label: "Low-Level", color: "#f59e0b" },
        { label: "Hardware Voltage", color: "#10b981" },
      ]}
      caption="CPU คอมพิวเตอร์ไม่รู้จักภาษา Python หรือ C++ ทุกอย่างต้องถูกแปลงลงสู่สัญญาณไฟฟ้า 1 (มีไฟ) และ 0 (ไม่มีไฟ) ผ่าน Pipeline นี้"
      diagram={
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-5 sm:gap-1.5 p-2">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative flex flex-col items-center rounded-lg border border-[#2a3040] bg-[#121622] p-3 text-center"
            >
              <div
                className="mb-1.5 grid h-10 w-10 place-items-center rounded-full text-lg"
                style={{ backgroundColor: `${s.color}20`, border: `1px solid ${s.color}60` }}
              >
                {s.icon}
              </div>
              <div className="text-xs font-bold text-white">{s.title}</div>
              <div className="font-mono text-[10px] font-semibold" style={{ color: s.color }}>
                {s.sub}
              </div>
              <div className="mt-1 text-[11px] text-[#8a90a0]">{s.desc}</div>
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-xs text-[#64748b]">
                  ▶
                </div>
              )}
            </div>
          ))}
        </div>
      }
    />
  );
}

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

// ============================================================================
// 12. Tree Anatomy & Terminology (Chapter 7)
// ============================================================================

export function TreeAnatomyViz() {
  return (
    <VizStaticFrame
      title="Tree Terminology: กายวิภาคและลำดับชั้นของโครงสร้างต้นไม้ (Hierarchical Thinking)"
      pills={[
        { label: "Root: โหนดรากบนสุด", color: "#8b5cf6" },
        { label: "Parent / Child: พ่อแม่-ลูก", color: "#3b82f6" },
        { label: "Leaf: ใบไม้ (ไม่มีลูก)", color: "#10b981" },
      ]}
      caption="ต้นไม้ในวิทยาการคอมพิวเตอร์มีรากอยู่บนสุดและแผ่กิ่งก้านลงล่าง โดยต้นไม้ที่มี N โหนด จะมีเส้นเชื่อมพอดี N - 1 เส้นเสมอ"
      diagram={
        <svg viewBox="0 0 720 270" className="w-full h-auto">
          {/* Depth Axis Guide on the Left */}
          <g transform="translate(60, 40)" fill="#64748b" fontSize="11" fontFamily={FONT_MONO}>
            <text x="0" y="25">Depth 0 (Root Level)</text>
            <text x="0" y="105">Depth 1</text>
            <text x="0" y="185">Depth 2 (Leaf Level)</text>
            <line x1="125" y1="20" x2="680" y2="20" stroke="#1f293d" strokeDasharray="3 3" />
            <line x1="125" y1="100" x2="680" y2="100" stroke="#1f293d" strokeDasharray="3 3" />
            <line x1="125" y1="180" x2="680" y2="180" stroke="#1f293d" strokeDasharray="3 3" />
          </g>

          {/* Tree Connections */}
          <line x1="420" y1="60" x2="330" y2="140" stroke="#4a5568" strokeWidth="2" />
          <line x1="420" y1="60" x2="510" y2="140" stroke="#4a5568" strokeWidth="2" />
          <line x1="330" y1="140" x2="270" y2="220" stroke="#4a5568" strokeWidth="2" />
          <line x1="330" y1="140" x2="370" y2="220" stroke="#4a5568" strokeWidth="2" />
          <line x1="510" y1="140" x2="550" y2="220" stroke="#4a5568" strokeWidth="2" />

          {/* Root Node A */}
          <g transform="translate(420, 60)">
            <circle cx="0" cy="0" r="22" fill="#7c3aed" stroke="#a78bfa" strokeWidth="2.5" />
            <text x="0" y="5" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">A</text>
            <text x="0" y="-28" fill="#c4b5fd" fontSize="10" fontFamily={FONT_MONO} textAnchor="middle" fontWeight="bold">Root (ราก)</text>
          </g>

          {/* Internal Nodes B, C */}
          <g transform="translate(330, 140)">
            <circle cx="0" cy="0" r="20" fill="#2563eb" stroke="#60a5fa" strokeWidth="2" />
            <text x="0" y="5" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">B</text>
            <text x="-40" y="4" fill="#93c5fd" fontSize="10" fontFamily={FONT_MONO} textAnchor="middle">Parent</text>
          </g>
          <g transform="translate(510, 140)">
            <circle cx="0" cy="0" r="20" fill="#2563eb" stroke="#60a5fa" strokeWidth="2" />
            <text x="0" y="5" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">C</text>
            <text x="40" y="4" fill="#93c5fd" fontSize="10" fontFamily={FONT_MONO} textAnchor="middle">Parent</text>
          </g>

          {/* Leaf Nodes D, E, F */}
          {[
            { name: "D", x: 270, y: 220 },
            { name: "E", x: 370, y: 220 },
            { name: "F", x: 550, y: 220 },
          ].map((leaf) => (
            <g key={leaf.name} transform={`translate(${leaf.x}, ${leaf.y})`}>
              <circle cx="0" cy="0" r="18" fill="#059669" stroke="#34d399" strokeWidth="2" />
              <text x="0" y="4" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">{leaf.name}</text>
              <text x="0" y="28" fill="#6ee7b7" fontSize="10" fontFamily={FONT_MONO} textAnchor="middle">Leaf</text>
            </g>
          ))}
        </svg>
      }
    />
  );
}

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
// 14. Binary Search Tree (BST) Property (Chapter 7)
// ============================================================================

export function BstPropertyViz() {
  return (
    <VizStaticFrame
      title="BST Property: กฎเหล็ก Left Subtree < Root < Right Subtree"
      pills={[
        { label: "Left Subtree: น้อยกว่า 8 ทุกตัว", color: "#06b6d4" },
        { label: "Root: 8 (จุดศูนย์กลาง)", color: "#8b5cf6" },
        { label: "Right Subtree: มากกว่า 8 ทุกตัว", color: "#f97316" },
      ]}
      caption="คุณสมบัติ Left < Root < Right ทำให้การค้นหาใน BST มีประสิทธิภาพ O(log n) เหมือน Binary Search โดยไม่ต้องมี Array"
      diagram={
        <svg viewBox="0 0 720 270" className="w-full h-auto">
          {/* Subtree Zone Highlights */}
          <rect x="140" y="80" width="230" height="175" rx="8" fill="#06b6d4" fillOpacity="0.08" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" />
          <text x="255" y="100" fill="#06b6d4" fontSize="11" fontFamily={FONT_MONO} textAnchor="middle" fontWeight="bold">
            Left Subtree: สมาชิกทุกตัว &lt; 8
          </text>

          <rect x="420" y="80" width="220" height="175" rx="8" fill="#f97316" fillOpacity="0.08" stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" />
          <text x="530" y="100" fill="#f97316" fontSize="11" fontFamily={FONT_MONO} textAnchor="middle" fontWeight="bold">
            Right Subtree: สมาชิกทุกตัว &gt; 8
          </text>

          {/* Edges */}
          <line x1="370" y1="50" x2="270" y2="130" stroke="#4a5568" strokeWidth="2" />
          <line x1="370" y1="50" x2="490" y2="130" stroke="#4a5568" strokeWidth="2" />
          
          <line x1="270" y1="130" x2="210" y2="190" stroke="#4a5568" strokeWidth="2" />
          <line x1="270" y1="130" x2="320" y2="190" stroke="#4a5568" strokeWidth="2" />
          <line x1="320" y1="190" x2="300" y2="240" stroke="#4a5568" strokeWidth="2" />
          <line x1="320" y1="190" x2="345" y2="240" stroke="#4a5568" strokeWidth="2" />

          <line x1="490" y1="130" x2="560" y2="190" stroke="#4a5568" strokeWidth="2" />
          <line x1="560" y1="190" x2="530" y2="240" stroke="#4a5568" strokeWidth="2" />

          {/* Root: 8 */}
          <g transform="translate(370, 50)">
            <circle cx="0" cy="0" r="22" fill="#7c3aed" stroke="#a78bfa" strokeWidth="2.5" />
            <text x="0" y="5" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">8</text>
          </g>

          {/* Left Branch Nodes: 3, 1, 6, 4, 7 */}
          <g transform="translate(270, 130)">
            <circle cx="0" cy="0" r="18" fill="#0891b2" stroke="#22d3ee" strokeWidth="2" />
            <text x="0" y="5" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">3</text>
          </g>
          <g transform="translate(210, 190)">
            <circle cx="0" cy="0" r="16" fill="#0891b2" stroke="#22d3ee" strokeWidth="1.5" />
            <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">1</text>
          </g>
          <g transform="translate(320, 190)">
            <circle cx="0" cy="0" r="16" fill="#0891b2" stroke="#22d3ee" strokeWidth="1.5" />
            <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">6</text>
          </g>
          <g transform="translate(300, 240)">
            <circle cx="0" cy="0" r="14" fill="#0891b2" stroke="#22d3ee" strokeWidth="1.5" />
            <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">4</text>
          </g>
          <g transform="translate(345, 240)">
            <circle cx="0" cy="0" r="14" fill="#0891b2" stroke="#22d3ee" strokeWidth="1.5" />
            <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">7</text>
          </g>

          {/* Right Branch Nodes: 10, 14, 13 */}
          <g transform="translate(490, 130)">
            <circle cx="0" cy="0" r="18" fill="#ea580c" stroke="#fb923c" strokeWidth="2" />
            <text x="0" y="5" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">10</text>
          </g>
          <g transform="translate(560, 190)">
            <circle cx="0" cy="0" r="16" fill="#ea580c" stroke="#fb923c" strokeWidth="1.5" />
            <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">14</text>
          </g>
          <g transform="translate(530, 240)">
            <circle cx="0" cy="0" r="14" fill="#ea580c" stroke="#fb923c" strokeWidth="1.5" />
            <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily={FONT_MONO} textAnchor="middle">13</text>
          </g>
        </svg>
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
