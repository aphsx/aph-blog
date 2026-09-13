import type { NavCategory } from "@/lib/types";

/**
 * Sidebar navigation for Data Structures & Algorithms (DSA) Course.
 * จัดเรียงลำดับการเรียนรู้ตามหลักสูตรสากล (MIT / Stanford / NeetCode Roadmap)
 * เพื่อให้ผู้เรียนเข้าใจ Big-O ตั้งแต่ต้น เข้าใจหน่วยความจำ RAM และ Pointer
 * เชื่อมโยงสู่โครงสร้างข้อมูล และต่อยอดสู่อัลกอริทึมขั้นสูงสำหรับการทำงานและการสัมภาษณ์งานจริง
 */
export const dsaNav: NavCategory[] = [
  {
    label: "เริ่มต้นที่นี่",
    items: [
      { slug: "dsa-overview", title: "ภาพรวม & แผนที่การเดินทางสู่การทำงานจริง" },
      { slug: "dsa-intro", title: "C++ สู่ Python: สองอาวุธคู่กายสำหรับงานระบบ & สัมภาษณ์งาน" },
    ],
  },
  {
    label: "บทที่ 1: พื้นฐานการเขียนโปรแกรมเชิงระบบ",
    items: [
      { slug: "dsa-ch1-intro", title: "โค้ด, ฮาร์ดแวร์ & การทำงานของคอมพิวเตอร์" },
      { slug: "dsa-ch1-basic-syntax", title: "ไวยากรณ์พื้นฐาน C++ & Python (I/O, Main, Fast I/O)" },
      { slug: "dsa-ch1-basic-concept", title: "ตัวแปร, ชนิดข้อมูลระดับบิต & Type Casting" },
      { slug: "dsa-ch1-control-structure", title: "เงื่อนไข & การวนซ้ำ (Branching, Loops & Invariants)" },
      { slug: "dsa-ch1-functions", title: "ฟังก์ชัน & Stack Frames (Pass by Value vs Reference)" },
    ],
  },
  {
    label: "บทที่ 2: เข็มทิศวัดประสิทธิภาพ (Big-O & Complexity)",
    items: [
      { slug: "dsa-ch2-intro", title: "ทำไมต้องวัดประสิทธิภาพ: อวสานการจับเวลาด้วยนาฬิกา" },
      { slug: "dsa-ch2-big-o-type", title: "สเปกตรัมของ Big-O: จาก O(1) ถึง O(n!) เข้าใจด้วยภาพ" },
      { slug: "dsa-ch2-complexity", title: "การวิเคราะห์ Time & Space Complexity ฉบับวิศวกร" },
      { slug: "dsa-ch2-leetcode", title: "ถอดรหัส Constraints ในโจทย์ LeetCode (สูตรลัด 10⁸ ops/sec)" },
    ],
  },
  {
    label: "บทที่ 3: ศิลปะการแก้โจทย์ปัญหา (Problem Solving Mastery)",
    items: [
      { slug: "dsa-ch3-intro", title: "คิดแบบ Software Engineer: UMPIRE Framework" },
      { slug: "dsa-ch3-number-problem", title: "โจทย์ตัวเลข & คณิตศาสตร์ (Digit Extraction, Prime, Palindrome)" },
      { slug: "dsa-ch3-array-problem", title: "โจทย์อาร์เรย์พื้นฐาน (Traversal, In-Place Reversal, Two Sum)" },
      { slug: "dsa-ch3-string-problem", title: "โจทย์สตริง & ข้อความ (Immutability, Anagram, Palindrome)" },
      { slug: "dsa-ch3-summary", title: "สรุปแบบแผนแก้ปัญหา & เช็คลิสต์ Edge Cases" },
    ],
  },
  {
    label: "บทที่ 4: หน่วยความจำ, พอยน์เตอร์, เวกเตอร์ & OOP",
    items: [
      { slug: "dsa-ch4-intro", title: "หน่วยความจำ RAM: Stack vs Heap & Cache Locality" },
      { slug: "dsa-ch4-pointer", title: "เจาะลึก Pointer & Reference (ที่อยู่ RAM vs Python Object)" },
      { slug: "dsa-ch4-vector", title: "Dynamic Array & Vector (การขยายขนาด & Amortized O(1))" },
      { slug: "dsa-ch4-struct", title: "Struct & Class: การจัดวางข้อมูลใน RAM (Alignment & Padding)" },
      { slug: "dsa-ch4-oop", title: "OOP สำหรับ Data Structures: สร้าง Node & Encapsulation" },
    ],
  },
  {
    label: "บทที่ 5: โครงสร้างข้อมูลเชิงเส้น (Linear Data Structures)",
    items: [
      { slug: "dsa-ch5-intro", title: "ภาพรวม Linear Data Structures: Array vs Node-based" },
      { slug: "dsa-ch5-linked-list", title: "Linked List (Singly, Doubly, Circular) + Music Playlist" },
      { slug: "dsa-ch5-stack", title: "Stack (LIFO): Call Stack, Undo/Redo & Valid Parentheses" },
      { slug: "dsa-ch5-queue", title: "Queue & Deque (FIFO): Circular Queue & Printer Spooler" },
    ],
  },
  {
    label: "บทที่ 6: การค้นหา, ตารางแฮช & การจัดเรียงพื้นฐาน",
    items: [
      { slug: "dsa-ch6-intro", title: "ทำไมต้องเรียงและค้นหา: รากฐานของ Database & Search Engine" },
      { slug: "dsa-ch6-search", title: "การค้นหาข้อมูล: Linear Search vs Binary Search (3 Templates)" },
      { slug: "dsa-ch6-sort", title: "การเรียงลำดับพื้นฐาน O(n²): Bubble, Selection, Insertion Sort" },
      { slug: "dsa-ch6-hash-table", title: "Hash Table & Hash Map: Collision Resolution & Two Sum O(1)" },
    ],
  },
  {
    label: "บทที่ 7: การเรียกตัวเอง & โครงสร้างต้นไม้ (Recursion & Trees)",
    items: [
      { slug: "dsa-ch7-intro", title: "ก้าวข้ามเส้นตรงสู่ลำดับชั้น: Non-Linear Data Structures & Trees" },
      { slug: "dsa-ch7-recursive", title: "Recursion Mental Model: Base Case & Call Stack Tracing" },
      { slug: "dsa-ch7-tree", title: "Binary Tree & BST: ค้นหา, แทรก, ลบ & ท่องโหนด DFS/BFS" },
    ],
  },
  {
    label: "บทที่ 8: การแบ่งแยกและเอาชนะ & การจัดเรียงขั้นสูง",
    items: [
      { slug: "dsa-ch8-intro", title: "ปรัชญา Divide & Conquer: เปลี่ยน O(n²) สู่ O(n log n)" },
      { slug: "dsa-ch8-basic", title: "Merge Sort (Stable) & Quick Sort (In-Place Partitioning)" },
      { slug: "dsa-ch8-problem", title: "Quickselect: หา K-th Element ใน O(n) Average Time" },
    ],
  },
  {
    label: "บทที่ 9: การค้นหาย้อนรอย (Exhaustive Search & Backtracking)",
    items: [
      { slug: "dsa-ch9-intro", title: "Backtracking คืออะไร: State-Space Tree & Pruning" },
      { slug: "dsa-ch9-backtrack", title: "แม่แบบ Backtracking 4 สเต็ป: Subsets, Permutations, Combination" },
      { slug: "dsa-ch9-np-problem", title: "ปัญหาแบบ NP และ Exhaustive Search (เมื่อใดไม่มีทางลัด)" },
      { slug: "dsa-ch9-leetcode", title: "โจทย์สัมภาษณ์ระดับบอส: N-Queens & Word Search" },
    ],
  },
  {
    label: "บทที่ 10: ขั้นตอนวิธีแบบละโมบ (Greedy Algorithms)",
    items: [
      { slug: "dsa-ch10-intro", title: "ปรัชญา Greedy: เลือกสิ่งที่ดีที่สุดเฉพาะหน้า (Greedy-Choice)" },
      { slug: "dsa-ch10-basic", title: "เมื่อ Greedy ชนะ vs ล้มเหลว: Coin Change & Activity Selection" },
      { slug: "dsa-ch10-leetcode", title: "โจทย์สัมภาษณ์ยอดฮิต: Jump Game, Gas Station & Assign Cookies" },
    ],
  },
  {
    label: "บทที่ 11: กำหนดการพลวัต (Dynamic Programming)",
    items: [
      { slug: "dsa-ch11-intro", title: "กุญแจสู่ DP: Overlapping Subproblems & Optimal Substructure" },
      { slug: "dsa-ch11-main-concept", title: "Memoization (Top-Down) vs Tabulation (Bottom-Up) & Space Optimization" },
      { slug: "dsa-ch11-classic-dp", title: "Classic DP: Climbing Stairs, 0/1 Knapsack, Coin Change & LCS" },
    ],
  },
  {
    label: "บทที่ 12: กราฟและอัลกอริทึมโครงข่าย (Graph Theory & Networks)",
    items: [
      { slug: "dsa-ch12-intro", title: "โลกความจริงคือกราฟ: Social Networks, Maps & Microservices" },
      { slug: "dsa-ch12-representation", title: "Graph Representation & Traversals: Matrix/List, BFS & DFS" },
      { slug: "dsa-ch12-shortest-path", title: "Shortest Path: Unweighted BFS, Dijkstra & Bellman-Ford" },
      { slug: "dsa-ch12-minimum-spanning-tree", title: "Minimum Spanning Tree (MST): Prim vs Kruskal (Union-Find)" },
      { slug: "dsa-ch12-leetcode", title: "โจทย์สัมภาษณ์กราฟขั้นสูง: Course Schedule (Topological Sort) & Islands" },
    ],
  },
];
