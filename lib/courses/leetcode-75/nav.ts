import type { NavCategory } from "@/lib/types";

/**
 * Sidebar navigation for the LeetCode 75 course.
 * Order follows the official LeetCode 75 study-plan sequence exactly.
 * `course.order` is derived from this (see index.ts), which also powers
 * the automatic prev/next paginator.
 */
export const leetcode75Nav: NavCategory[] = [
  {
    label: "เริ่มต้นที่นี่",
    items: [
      { slug: "lc75", title: "ภาพรวม & วิธีเรียน" },
      { slug: "lc75-bigo", title: "Big-O คืออะไร" },
    ],
  },
  {
    label: "1. Array / String",
    items: [
      { slug: "lc75-intro-array-string", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p01", title: "1 · Merge Strings Alternately" },
      { slug: "lc75-p02", title: "2 · Greatest Common Divisor of Strings" },
      { slug: "lc75-p03", title: "3 · Kids With the Greatest Candies" },
      { slug: "lc75-p04", title: "4 · Can Place Flowers" },
      { slug: "lc75-p05", title: "5 · Reverse Vowels of a String" },
      { slug: "lc75-p06", title: "6 · Reverse Words in a String" },
      { slug: "lc75-p07", title: "7 · Product of Array Except Self" },
      { slug: "lc75-p08", title: "8 · Increasing Triplet Subsequence" },
      { slug: "lc75-p09", title: "9 · String Compression" },
    ],
  },
  {
    label: "2. Two Pointers",
    items: [
      { slug: "lc75-intro-two-pointers", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p10", title: "10 · Move Zeroes" },
      { slug: "lc75-p11", title: "11 · Is Subsequence" },
      { slug: "lc75-p12", title: "12 · Container With Most Water" },
      { slug: "lc75-p13", title: "13 · Max Number of K-Sum Pairs" },
    ],
  },
  {
    label: "3. Sliding Window",
    items: [
      { slug: "lc75-intro-sliding-window", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p14", title: "14 · Maximum Average Subarray I" },
      { slug: "lc75-p15", title: "15 · Max Vowels in a Substring" },
      { slug: "lc75-p16", title: "16 · Max Consecutive Ones III" },
      { slug: "lc75-p17", title: "17 · Longest Subarray of 1's" },
    ],
  },
  {
    label: "4. Prefix Sum",
    items: [
      { slug: "lc75-intro-prefix-sum", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p18", title: "18 · Find the Highest Altitude" },
      { slug: "lc75-p19", title: "19 · Find Pivot Index" },
    ],
  },
  {
    label: "5. Hash Map / Set",
    items: [
      { slug: "lc75-intro-hashmap", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p20", title: "20 · Find the Difference of Two Arrays" },
      { slug: "lc75-p21", title: "21 · Unique Number of Occurrences" },
      { slug: "lc75-p22", title: "22 · Determine if Two Strings Are Close" },
      { slug: "lc75-p23", title: "23 · Equal Row and Column Pairs" },
    ],
  },
  {
    label: "6. Stack",
    items: [
      { slug: "lc75-intro-stack", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p24", title: "24 · Removing Stars From a String" },
      { slug: "lc75-p25", title: "25 · Asteroid Collision" },
      { slug: "lc75-p26", title: "26 · Decode String" },
    ],
  },
  {
    label: "7. Queue",
    items: [
      { slug: "lc75-intro-queue", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p27", title: "27 · Number of Recent Calls" },
      { slug: "lc75-p28", title: "28 · Dota2 Senate" },
    ],
  },
  {
    label: "8. Linked List",
    items: [
      { slug: "lc75-intro-linked-list", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p29", title: "29 · Delete the Middle Node" },
      { slug: "lc75-p30", title: "30 · Odd Even Linked List" },
      { slug: "lc75-p31", title: "31 · Reverse Linked List" },
      { slug: "lc75-p32", title: "32 · Maximum Twin Sum" },
    ],
  },
  {
    label: "9. Binary Tree — DFS",
    items: [
      { slug: "lc75-intro-tree-dfs", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p33", title: "33 · Maximum Depth of Binary Tree" },
      { slug: "lc75-p34", title: "34 · Leaf-Similar Trees" },
      { slug: "lc75-p35", title: "35 · Count Good Nodes" },
      { slug: "lc75-p36", title: "36 · Path Sum III" },
      { slug: "lc75-p37", title: "37 · Longest ZigZag Path" },
      { slug: "lc75-p38", title: "38 · Lowest Common Ancestor" },
    ],
  },
  {
    label: "10. Binary Tree — BFS",
    items: [
      { slug: "lc75-intro-tree-bfs", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p39", title: "39 · Binary Tree Right Side View" },
      { slug: "lc75-p40", title: "40 · Maximum Level Sum" },
    ],
  },
  {
    label: "11. Binary Search Tree",
    items: [
      { slug: "lc75-intro-bst", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p41", title: "41 · Search in a BST" },
      { slug: "lc75-p42", title: "42 · Delete Node in a BST" },
    ],
  },
  {
    label: "12. Graphs — DFS",
    items: [
      { slug: "lc75-intro-graph-dfs", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p43", title: "43 · Keys and Rooms" },
      { slug: "lc75-p44", title: "44 · Number of Provinces" },
      { slug: "lc75-p45", title: "45 · Reorder Routes" },
      { slug: "lc75-p46", title: "46 · Evaluate Division" },
    ],
  },
  {
    label: "13. Graphs — BFS",
    items: [
      { slug: "lc75-intro-graph-bfs", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p47", title: "47 · Nearest Exit from Entrance in Maze" },
      { slug: "lc75-p48", title: "48 · Rotting Oranges" },
    ],
  },
  {
    label: "14. Heap / Priority Queue",
    items: [
      { slug: "lc75-intro-heap", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p49", title: "49 · Kth Largest Element in an Array" },
      { slug: "lc75-p50", title: "50 · Smallest Number in Infinite Set" },
      { slug: "lc75-p51", title: "51 · Maximum Subsequence Score" },
      { slug: "lc75-p52", title: "52 · Total Cost to Hire K Workers" },
    ],
  },
  {
    label: "15. Binary Search",
    items: [
      { slug: "lc75-intro-binary-search", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p53", title: "53 · Guess Number Higher or Lower" },
      { slug: "lc75-p54", title: "54 · Successful Pairs of Spells and Potions" },
      { slug: "lc75-p55", title: "55 · Find Peak Element" },
      { slug: "lc75-p56", title: "56 · Koko Eating Bananas" },
    ],
  },
  {
    label: "16. Backtracking",
    items: [
      { slug: "lc75-intro-backtracking", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p57", title: "57 · Letter Combinations of a Phone Number" },
      { slug: "lc75-p58", title: "58 · Combination Sum III" },
    ],
  },
  {
    label: "17. DP — 1 มิติ",
    items: [
      { slug: "lc75-intro-dp-1d", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p59", title: "59 · N-th Tribonacci Number" },
      { slug: "lc75-p60", title: "60 · Min Cost Climbing Stairs" },
      { slug: "lc75-p61", title: "61 · House Robber" },
      { slug: "lc75-p62", title: "62 · Domino and Tromino Tiling" },
    ],
  },
  {
    label: "18. DP — หลายมิติ",
    items: [
      { slug: "lc75-intro-dp-multi", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p63", title: "63 · Unique Paths" },
      { slug: "lc75-p64", title: "64 · Longest Common Subsequence" },
      { slug: "lc75-p65", title: "65 · Best Time to Buy/Sell Stock (Fee)" },
      { slug: "lc75-p66", title: "66 · Edit Distance" },
    ],
  },
  {
    label: "19. Bit Manipulation",
    items: [
      { slug: "lc75-intro-bit", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p67", title: "67 · Counting Bits" },
      { slug: "lc75-p68", title: "68 · Single Number" },
      { slug: "lc75-p69", title: "69 · Minimum Flips a OR b Equal c" },
    ],
  },
  {
    label: "20. Trie",
    items: [
      { slug: "lc75-intro-trie", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p70", title: "70 · Implement Trie (Prefix Tree)" },
      { slug: "lc75-p71", title: "71 · Search Suggestions System" },
    ],
  },
  {
    label: "21. Intervals",
    items: [
      { slug: "lc75-intro-intervals", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p72", title: "72 · Non-overlapping Intervals" },
      { slug: "lc75-p73", title: "73 · Minimum Arrows to Burst Balloons" },
    ],
  },
  {
    label: "22. Monotonic Stack",
    items: [
      { slug: "lc75-intro-monotonic-stack", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p74", title: "74 · Daily Temperatures" },
      { slug: "lc75-p75", title: "75 · Online Stock Span" },
    ],
  },
];
