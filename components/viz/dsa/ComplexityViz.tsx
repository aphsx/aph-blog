"use client";

import { useState } from "react";
import { VizStaticFrame } from "@/components/viz/VizFrame";
import { FONT_MONO } from "./constants";

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

