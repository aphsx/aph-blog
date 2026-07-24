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
      { slug: "lc75-p01", title: "ข้อ 1 · สลับสองสตริง" },
      { slug: "lc75-p02", title: "ข้อ 2 · ห.ร.ม. ของสตริง" },
      { slug: "lc75-p03", title: "ข้อ 3 · เด็กลูกอมมากสุด" },
      { slug: "lc75-p04", title: "ข้อ 4 · ปลูกดอกไม้ได้ไหม" },
      { slug: "lc75-p05", title: "ข้อ 5 · กลับตำแหน่งสระ" },
      { slug: "lc75-p06", title: "ข้อ 6 · กลับลำดับคำ" },
      { slug: "lc75-p07", title: "ข้อ 7 · ผลคูณยกเว้นตัวเอง" },
      { slug: "lc75-p08", title: "ข้อ 8 · ลำดับเพิ่มสามตัว" },
      { slug: "lc75-p09", title: "ข้อ 9 · บีบอัดสตริง" },
    ],
  },
  {
    label: "2. Two Pointers",
    items: [
      { slug: "lc75-intro-two-pointers", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p10", title: "ข้อ 10 · ย้ายเลขศูนย์ไปท้าย" },
      { slug: "lc75-p11", title: "ข้อ 11 · เป็น subsequence ไหม" },
      { slug: "lc75-p12", title: "ข้อ 12 · กักน้ำได้มากสุด" },
      { slug: "lc75-p13", title: "ข้อ 13 · จับคู่ผลรวม k" },
    ],
  },
  {
    label: "3. Sliding Window",
    items: [
      { slug: "lc75-intro-sliding-window", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p14", title: "ข้อ 14 · ค่าเฉลี่ยมากสุด" },
      { slug: "lc75-p15", title: "ข้อ 15 · นับสระในหน้าต่าง" },
      { slug: "lc75-p16", title: "ข้อ 16 · หนึ่งต่อเนื่อง (พลิก k)" },
      { slug: "lc75-p17", title: "ข้อ 17 · ช่วงหนึ่งหลังลบตัว" },
    ],
  },
  {
    label: "4. Prefix Sum",
    items: [
      { slug: "lc75-intro-prefix-sum", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p18", title: "ข้อ 18 · ความสูงมากสุด" },
      { slug: "lc75-p19", title: "ข้อ 19 · หา pivot index" },
    ],
  },
  {
    label: "5. Hash Map / Set",
    items: [
      { slug: "lc75-intro-hashmap", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p20", title: "ข้อ 20 · ผลต่างสองอาเรย์" },
      { slug: "lc75-p21", title: "ข้อ 21 · จำนวนครั้งไม่ซ้ำ" },
      { slug: "lc75-p22", title: "ข้อ 22 · สองสตริงใกล้กัน" },
      { slug: "lc75-p23", title: "ข้อ 23 · คู่แถว-คอลัมน์" },
    ],
  },
  {
    label: "6. Stack",
    items: [
      { slug: "lc75-intro-stack", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p24", title: "ข้อ 24 · ลบดาวจากสตริง" },
      { slug: "lc75-p25", title: "ข้อ 25 · ดาวเคราะห์น้อยชน" },
      { slug: "lc75-p26", title: "ข้อ 26 · ถอดรหัสสตริง" },
    ],
  },
  {
    label: "7. Queue",
    items: [
      { slug: "lc75-intro-queue", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p27", title: "ข้อ 27 · นับ ping ล่าสุด" },
      { slug: "lc75-p28", title: "ข้อ 28 · วุฒิสภา Dota2" },
    ],
  },
  {
    label: "8. Linked List",
    items: [
      { slug: "lc75-intro-linked-list", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p29", title: "ข้อ 29 · ลบโหนดกลาง" },
      { slug: "lc75-p30", title: "ข้อ 30 · จัดโหนดคี่-คู่" },
      { slug: "lc75-p31", title: "ข้อ 31 · กลับ Linked List" },
      { slug: "lc75-p32", title: "ข้อ 32 · ผลรวมคู่แฝดมากสุด" },
    ],
  },
  {
    label: "9. Binary Tree — DFS",
    items: [
      { slug: "lc75-intro-tree-dfs", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p33", title: "ข้อ 33 · ความลึกมากสุด" },
      { slug: "lc75-p34", title: "ข้อ 34 · ต้นไม้ใบเหมือนกัน" },
      { slug: "lc75-p35", title: "ข้อ 35 · นับโหนดดี" },
      { slug: "lc75-p36", title: "ข้อ 36 · นับ path ผลรวมเป้า" },
      { slug: "lc75-p37", title: "ข้อ 37 · ทางซิกแซกยาวสุด" },
      { slug: "lc75-p38", title: "ข้อ 38 · บรรพบุรุษร่วมต่ำสุด" },
    ],
  },
  {
    label: "10. Binary Tree — BFS",
    items: [
      { slug: "lc75-intro-tree-bfs", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p39", title: "ข้อ 39 · มุมมองด้านขวา" },
      { slug: "lc75-p40", title: "ข้อ 40 · ชั้นผลรวมมากสุด" },
    ],
  },
  {
    label: "11. Binary Search Tree",
    items: [
      { slug: "lc75-intro-bst", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p41", title: "ข้อ 41 · ค้นหาใน BST" },
      { slug: "lc75-p42", title: "ข้อ 42 · ลบโหนดใน BST" },
    ],
  },
  {
    label: "12. Graphs — DFS",
    items: [
      { slug: "lc75-intro-graph-dfs", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p43", title: "ข้อ 43 · กุญแจกับห้อง" },
      { slug: "lc75-p44", title: "ข้อ 44 · นับจำนวนจังหวัด" },
      { slug: "lc75-p45", title: "ข้อ 45 · กลับทิศถนนไปเมือง 0" },
      { slug: "lc75-p46", title: "ข้อ 46 · คำนวณการหาร" },
    ],
  },
  {
    label: "13. Graphs — BFS",
    items: [
      { slug: "lc75-intro-graph-bfs", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p47", title: "ข้อ 47 · ทางออกเขาวงกต" },
      { slug: "lc75-p48", title: "ข้อ 48 · ส้มเน่า" },
    ],
  },
  {
    label: "14. Heap / Priority Queue",
    items: [
      { slug: "lc75-intro-heap", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p49", title: "ข้อ 49 · ตัวมากอันดับ k" },
      { slug: "lc75-p50", title: "ข้อ 50 · เลขน้อยสุดเซ็ตอนันต์" },
      { slug: "lc75-p51", title: "ข้อ 51 · คะแนน subsequence" },
      { slug: "lc75-p52", title: "ข้อ 52 · ต้นทุนจ้าง k คน" },
    ],
  },
  {
    label: "15. Binary Search",
    items: [
      { slug: "lc75-intro-binary-search", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p53", title: "ข้อ 53 · ทายเลขสูงต่ำ" },
      { slug: "lc75-p54", title: "ข้อ 54 · คู่คาถากับยา" },
      { slug: "lc75-p55", title: "ข้อ 55 · หายอด (peak)" },
      { slug: "lc75-p56", title: "ข้อ 56 · โกโกะกินกล้วย" },
    ],
  },
  {
    label: "16. Backtracking",
    items: [
      { slug: "lc75-intro-backtracking", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p57", title: "ข้อ 57 · ตัวอักษรจากเบอร์โทร" },
      { slug: "lc75-p58", title: "ข้อ 58 · ผลรวมชุดค่า III" },
    ],
  },
  {
    label: "17. DP — 1 มิติ",
    items: [
      { slug: "lc75-intro-dp-1d", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p59", title: "ข้อ 59 · เลข Tribonacci" },
      { slug: "lc75-p60", title: "ข้อ 60 · ขึ้นบันไดถูกสุด" },
      { slug: "lc75-p61", title: "ข้อ 61 · ขโมยบ้าน" },
      { slug: "lc75-p62", title: "ข้อ 62 · ปูกระเบื้อง" },
    ],
  },
  {
    label: "18. DP — หลายมิติ",
    items: [
      { slug: "lc75-intro-dp-multi", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p63", title: "ข้อ 63 · นับเส้นทางเดิน" },
      { slug: "lc75-p64", title: "ข้อ 64 · LCS ยาวสุด" },
      { slug: "lc75-p65", title: "ข้อ 65 · หุ้นมีค่าธรรมเนียม" },
      { slug: "lc75-p66", title: "ข้อ 66 · edit distance" },
    ],
  },
  {
    label: "19. Bit Manipulation",
    items: [
      { slug: "lc75-intro-bit", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p67", title: "ข้อ 67 · นับบิตหนึ่ง" },
      { slug: "lc75-p68", title: "ข้อ 68 · ตัวเลขที่ไม่ซ้ำ" },
      { slug: "lc75-p69", title: "ข้อ 69 · พลิกบิตน้อยสุด" },
    ],
  },
  {
    label: "20. Trie",
    items: [
      { slug: "lc75-intro-trie", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p70", title: "ข้อ 70 · สร้าง Trie" },
      { slug: "lc75-p71", title: "ข้อ 71 · ระบบแนะนำคำค้น" },
    ],
  },
  {
    label: "21. Intervals",
    items: [
      { slug: "lc75-intro-intervals", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p72", title: "ข้อ 72 · ช่วงที่ไม่ทับกัน" },
      { slug: "lc75-p73", title: "ข้อ 73 · ลูกศรเจาะลูกโป่ง" },
    ],
  },
  {
    label: "22. Monotonic Stack",
    items: [
      { slug: "lc75-intro-monotonic-stack", title: "แนวคิด & พื้นฐาน" },
      { slug: "lc75-p74", title: "ข้อ 74 · อุณหภูมิรายวัน" },
      { slug: "lc75-p75", title: "ข้อ 75 · ราคาหุ้นออนไลน์" },
    ],
  },
];
