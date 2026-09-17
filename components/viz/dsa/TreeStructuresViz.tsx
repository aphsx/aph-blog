"use client";

import { VizStaticFrame } from "@/components/viz/VizFrame";
import { FONT_MONO } from "./constants";

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

