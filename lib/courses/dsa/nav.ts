import type { NavCategory } from "@/lib/types";

/**
 * Sidebar navigation for Data Structures & Algorithms (DSA) Course.
 * จัดเรียงลำดับการเรียนรู้ตามหลักสูตรสากล (MIT/Stanford/NeetCode Roadmap)
 * เพื่อให้ผู้เรียนเข้าใจ Big-O ตั้งแต่ต้น เชื่อมโยงโครงสร้างข้อมูล และต่อยอดสู่อัลกอริทึมขั้นสูงได้อย่างลื่นไหล
 */
export const dsaNav: NavCategory[] = [
  {
    label: "เริ่มต้นที่นี่",
    items: [
      { slug: "dsa-overview", title: "ภาพรวม & แผนการเรียน DSA" },
      { slug: "dsa-intro", title: "บทนำ: C++ สู่ Python สำหรับสัมภาษณ์งาน" },
    ],
  },
  {
    label: "บทที่ 1: พื้นฐานการเขียนโปรแกรม",
    items: [
      { slug: "dsa-ch1-intro", title: "บทนำการเขียนโปรแกรม" },
      { slug: "dsa-ch1-basic-syntax", title: "ไวยากรณ์พื้นฐาน (Basic Syntax)" },
      { slug: "dsa-ch1-basic-concept", title: "ตัวแปร & ชนิดข้อมูล (Basic Concept)" },
      { slug: "dsa-ch1-control-structure", title: "เงื่อนไข & การวนซ้ำ (Control Structure)" },
      { slug: "dsa-ch1-functions", title: "ฟังก์ชัน & การแยกส่วนโค้ด (Functions)" },
    ],
  },
  {
    label: "บทที่ 2: การวัดประสิทธิภาพ & Big-O (เรียนก่อนเพื่อใช้วัดผล)",
    items: [
      { slug: "dsa-ch7-intro", title: "ความซับซ้อนของโค้ด (Complexity Intro)" },
      { slug: "dsa-ch7-big-o-type", title: "Big-O Notation แต่ละระดับ" },
      { slug: "dsa-ch7-complexity", title: "การวิเคราะห์ Time & Space Complexity" },
      { slug: "dsa-ch7-leetcode", title: "Constraints Cheat Sheet สำหรับสัมภาษณ์งาน" },
    ],
  },
  {
    label: "บทที่ 3: การฝึกแก้โจทย์ปัญหาเบื้องต้น",
    items: [
      { slug: "dsa-ch2-intro", title: "เริ่มต้นแก้โจทย์ปัญหา (Problem Solving)" },
      { slug: "dsa-ch2-number-problem", title: "โจทย์ตัวเลข & คณิตศาสตร์ (Number)" },
      { slug: "dsa-ch2-array-problem", title: "โจทย์อาร์เรย์พื้นฐาน (Array)" },
      { slug: "dsa-ch2-string-problem", title: "โจทย์ข้อความ & สตริง (String)" },
      { slug: "dsa-ch2-summary", title: "สรุปเทคนิคแก้โจทย์ปัญหา (Summary)" },
    ],
  },
  {
    label: "บทที่ 4: หน่วยความจำ, Pointer, Dynamic Array & OOP",
    items: [
      { slug: "dsa-ch3-intro", title: "ภาพรวมหน่วยความจำในคอมพิวเตอร์" },
      { slug: "dsa-ch3-pointer", title: "Pointer & Reference (ตัวชี้ & การอ้างอิง)" },
      { slug: "dsa-ch3-vector", title: "Vector & Dynamic Array (อาร์เรย์ยืดหยุ่น)" },
      { slug: "dsa-ch3-struct", title: "Struct & Dataclass (การรวมกลุ่มข้อมูล)" },
      { slug: "dsa-ch3-oop", title: "OOP สำหรับงาน DSA & สัมภาษณ์งาน" },
    ],
  },
  {
    label: "บทที่ 5: โครงสร้างข้อมูลเชิงเส้น (Linear Data Structures)",
    items: [
      { slug: "dsa-ch4-intro", title: "รู้จักโครงสร้างข้อมูลเชิงเส้น" },
      { slug: "dsa-ch4-linked-list", title: "Linked List (Singly, Doubly, Circular)" },
      { slug: "dsa-ch4-stack", title: "Stack (LIFO & Monotonic Stack)" },
      { slug: "dsa-ch4-queue", title: "Queue & Deque (FIFO & Double-Ended)" },
    ],
  },
  {
    label: "บทที่ 6: การค้นหา, การจัดเรียงพื้นฐาน & ตารางแฮช (Searching, Sorting & Hash Tables)",
    items: [
      { slug: "dsa-ch6-intro", title: "แนะนำการค้นหาและจัดเรียง" },
      { slug: "dsa-ch6-search", title: "Search Algorithms (Linear & Binary Search)" },
      { slug: "dsa-ch6-sort", title: "O(n²) Sorts (Bubble, Selection, Insertion)" },
      { slug: "dsa-ch6-hash-table", title: "Hash Table & Hash Map (O(1) Lookups)" },
    ],
  },
  {
    label: "บทที่ 7: การเรียกตัวเอง & โครงสร้างต้นไม้ (Recursion & Trees)",
    items: [
      { slug: "dsa-ch5-intro", title: "โครงสร้างข้อมูลแบบไม่เชิงเส้น" },
      { slug: "dsa-ch5-recursive", title: "Recursion & Call Stack (การเรียกตัวเอง)" },
      { slug: "dsa-ch5-tree", title: "Tree & Binary Search Tree (BST)" },
    ],
  },
  {
    label: "บทที่ 8: การแบ่งแยกและเอาชนะ & การจัดเรียงขั้นสูง (Divide & Conquer & Fast Sorts)",
    items: [
      { slug: "dsa-ch9-intro", title: "กลยุทธ์ Divide & Conquer (แบ่งแยกและเอาชนะ)" },
      { slug: "dsa-ch9-basic", title: "O(n log n) Sorts (Merge Sort & Quick Sort)" },
      { slug: "dsa-ch9-problem", title: "การวิเคราะห์โจทย์ปัญหา Divide & Conquer (Quickselect)" },
    ],
  },
  {
    label: "บทที่ 9: การค้นหาย้อนรอย (Backtracking)",
    items: [
      { slug: "dsa-ch8-intro", title: "แนวคิด Backtracking (ค้นหาย้อนรอย)" },
      { slug: "dsa-ch8-backtrack", title: "แบบจำลอง Backtracking (Subsets & Permutations)" },
      { slug: "dsa-ch8-np-problem", title: "ปัญหาแบบ NP และ Exhaustive Search" },
      { slug: "dsa-ch8-leetcode", title: "โจทย์ Backtracking ยอดนิยมในห้องสัมภาษณ์" },
    ],
  },
  {
    label: "บทที่ 10: ขั้นตอนวิธีแบบละโมบ (Greedy Algorithms)",
    items: [
      { slug: "dsa-ch10-intro", title: "แนวคิด Greedy Algorithm (การเลือกแบบละโมบ)" },
      { slug: "dsa-ch10-basic", title: "โจทย์ปัญหาคลาสสิก (Coin Change & Activity Selection)" },
      { slug: "dsa-ch10-leetcode", title: "ประยุกต์ Greedy กับโจทย์สัมภาษณ์งาน" },
    ],
  },
  {
    label: "บทที่ 11: กำหนดการพลวัต (Dynamic Programming)",
    items: [
      { slug: "dsa-ch11-intro", title: "แนะนำ Dynamic Programming (หัวใจสำคัญ)" },
      { slug: "dsa-ch11-main-concept", title: "Memoization (Top-Down) vs Tabulation (Bottom-Up)" },
      { slug: "dsa-ch11-classic-dp", title: "Classic DP: Climbing Stairs, Knapsack, LCS, LIS" },
    ],
  },
  {
    label: "บทที่ 12: กราฟและอัลกอริทึมโครงข่าย (Graphs & Network Algorithms)",
    items: [
      { slug: "dsa-ch5-graph", title: "Graph Representation (กราฟเบื้องต้น & BFS/DFS)" },
      { slug: "dsa-ch12-intro", title: "อัลกอริทึมกราฟขั้นสูง (Advanced Graphs)" },
      { slug: "dsa-ch12-shortest-path", title: "Shortest Path (Dijkstra, Bellman-Ford, BFS)" },
      { slug: "dsa-ch12-minimum-spanning-tree", title: "Minimum Spanning Tree (Prim & Kruskal)" },
      { slug: "dsa-ch12-leetcode", title: "โจทย์กราฟใน LeetCode สำหรับสัมภาษณ์งาน (Topological Sort)" },
    ],
  },
];
