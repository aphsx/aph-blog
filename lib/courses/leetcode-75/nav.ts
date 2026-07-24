import type { NavCategory } from "@/lib/types";

/** Sidebar navigation for the LeetCode 75 course. */
export const leetcode75Nav: NavCategory[] = [
  {
    label: "เริ่มต้นที่นี่",
    items: [
      { slug: "lc75", title: "ภาพรวม & วิธีเรียน" },
      { slug: "lc75-bigo", title: "Big-O คืออะไร" },
    ],
  },
  {
    label: "พื้นฐาน Array & String",
    items: [
      { slug: "lc75-array-string", title: "Array / String" },
      { slug: "lc75-two-pointers", title: "Two Pointers" },
      { slug: "lc75-sliding-window", title: "Sliding Window" },
      { slug: "lc75-prefix-sum", title: "Prefix Sum" },
      { slug: "lc75-hashmap", title: "Hash Map / Set" },
    ],
  },
  {
    label: "Stack, Queue & Linked List",
    items: [
      { slug: "lc75-stack", title: "Stack" },
      { slug: "lc75-queue", title: "Queue" },
      { slug: "lc75-linked-list", title: "Linked List" },
    ],
  },
  {
    label: "Tree & Graph",
    items: [
      { slug: "lc75-tree-dfs", title: "Binary Tree — DFS" },
      { slug: "lc75-tree-bfs", title: "Binary Tree — BFS" },
      { slug: "lc75-bst", title: "Binary Search Tree" },
      { slug: "lc75-graph-dfs", title: "Graphs — DFS" },
      { slug: "lc75-graph-bfs", title: "Graphs — BFS" },
    ],
  },
  {
    label: "เทคนิคขั้นสูง",
    items: [
      { slug: "lc75-heap", title: "Heap / Priority Queue" },
      { slug: "lc75-binary-search", title: "Binary Search" },
      { slug: "lc75-backtracking", title: "Backtracking" },
      { slug: "lc75-dp-1d", title: "DP — 1 มิติ" },
      { slug: "lc75-dp-multi", title: "DP — หลายมิติ" },
    ],
  },
  {
    label: "หัวข้อเฉพาะทาง",
    items: [
      { slug: "lc75-bit", title: "Bit Manipulation" },
      { slug: "lc75-trie", title: "Trie" },
      { slug: "lc75-intervals", title: "Intervals" },
      { slug: "lc75-monotonic-stack", title: "Monotonic Stack" },
    ],
  },
];
