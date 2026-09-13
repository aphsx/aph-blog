import type { Page } from "@/lib/types";

export const overviewPages: Record<string, Page> = {
  "dsa-overview": {
    slug: "dsa-overview",
    title: {
      th: "DSA ฉบับวิศวกรซอฟต์แวร์: ภาพรวม & แผนที่การเรียนรู้สู่การทำงานจริง",
      en: "DSA for Software Engineers: Overview & Job-Ready Roadmap",
    },
    lead: {
      th: "ยกระดับการเรียนรู้โครงสร้างข้อมูลและอัลกอริทึม 12 ตอน 49 บทเรียน ถอดรหัสวิธีคิดเชิงสถาปัตยกรรมสู่การทำงานจริงและการสัมภาษณ์งานระดับสากลด้วย Python และ C++",
      en: "Master Data Structures & Algorithms across 12 chapters and 49 lessons, engineered for technical interviews and production software systems.",
    },
    group: "เริ่มต้นที่นี่",
    blocks: {
      th: [
        {
          t: "p",
          c: "ยินดีต้อนรับสู่หลักสูตร **Data Structures & Algorithms (DSA) ฉบับสมบูรณ์ที่สุด** ซึ่งได้รับการออกแบบใหม่ทั้งหมดโดยถอดบทเรียนจากปัญหาจริงที่วิศวกรซอฟต์แวร์ต้องเผชิญ: *ทำไมคนที่จำโค้ดเก่งมักตกม้าตายในห้องสัมภาษณ์งาน?* และ *ทำไมการเรียน DSA ตามตำราวิชาการดั้งเดิมถึงนำมาใช้งานในระบบโปรดักชันจริงไม่ได้?*",
        },
        {
          t: "callout",
          title: "💡 ปรัชญาของหลักสูตร: คิดจากฮาร์ดแวร์ มองทะลุถึงบิสซิเนส",
          c: "ในหลักสูตรนี้ เราไม่ได้สอนให้คุณ 'ท่องจำอัลกอริทึม' แต่เราจะฝึกให้คุณมี **Mental Model (ภาพจำลองในหัว)** ว่าทุกบรรทัดที่คุณเขียน ข้อมูลวิ่งผ่าน CPU Registers, Cache L1/L2/L3, และแผงวงจร RAM อย่างไร เพื่อให้คุณเลือกใช้โครงสร้างข้อมูลที่ถูกต้องได้ทันทีโดยไม่ต้องพึ่งดวง",
        },
        { t: "h2", c: "ทำไมต้องจัดเรียงเนื้อหาใหม่เป็น 4 ระยะ (4-Phase Learning Curve)" },
        {
          t: "p",
          c: "หลักสูตร DSA ส่วนใหญ่ในอดีตมักเริ่มสอน Linked List, Tree หรือ Sorting ก่อนที่จะสอน Big-O หรือความเข้าใจในหน่วยความจำ RAM ซึ่งทำให้ผู้เรียนรู้สึก 'เข้าใจยากและคลุมเครือ' เพราะไม่รู้ว่าทำไมเราถึงต้องสร้าง Linked List ในเมื่อมี Array อยู่แล้ว? หรือทำไมต้องใช้ Heap ในเมื่อมี Array Sort อยู่แล้ว?\n\nเราจึงปรับโครงสร้างตามหลักสูตรสากลชั้นนำระดับโลก (MIT, Stanford, Berkeley และ NeetCode Roadmap) ดังนี้:",
        },
        {
          t: "table",
          head: ["ระยะ (Phase)", "บทเรียนที่ครอบคลุม", "แกนความคิดหลัก (Core Mental Model)"],
          rows: [
            [
              "Phase 1: รากฐานและเข็มทิศ (The Compass)",
              "บทที่ 1 – 3",
              "เข้าใจว่าคอมพิวเตอร์ประมวลผลอย่างไร และติดตั้ง 'แว่นตา Big-O' ตั้งแต่ต้น เพื่อใช้วัดประสิทธิภาพของโค้ดตลอดชีวิตการทำงาน พร้อมฝึกแก้โจทย์เชิงตัวเลขและข้อความ",
            ],
            [
              "Phase 2: หน่วยความจำ & โครงสร้างเชิงเส้น (Hardware & Linear)",
              "บทที่ 4 – 6",
              "ดำดิ่งสู่ RAM, Stack vs Heap, Pointer และสร้าง Linked List, Stack, Queue, Hash Table ด้วยมือตนเอง เข้าใจลึกซึ้งถึง Cache Locality และการค้นหาแบบ O(1)",
            ],
            [
              "Phase 3: โครงสร้างลำดับชั้น (Hierarchical Thinking)",
              "บทที่ 7 – 8",
              "ทลายกรอบความคิดแบบเส้นตรงสู่ต้นไม้ (Trees), การเรียกตัวเอง (Recursion), และกลยุทธ์ Divide & Conquer ที่เปลี่ยนความเร็วการเรียงข้อมูลจาก O(n²) สู่ O(n log n)",
            ],
            [
              "Phase 4: สี่กระบวนทัศน์ขั้นสูง (The Interview Big 4)",
              "บทที่ 9 – 12",
              "สี่เสาหลักของการสอบสัมภาษณ์ระดับ Mid-Senior และระบบงานจริง: Backtracking, Greedy, Dynamic Programming, และ Graph Algorithms แบบครบวงจร",
            ],
          ],
        },
        { t: "h2", c: "สารบัญหลักสูตรเต็ม (Curriculum Matrix 12 บท 49 บทเรียน)" },
        {
          t: "table",
          head: ["บทที่", "ชื่อบทเรียน", "จำนวนหัวข้อ", "ความรู้และทักษะที่จะได้รับ"],
          rows: [
            ["บทที่ 1", "พื้นฐานการเขียนโปรแกรมเชิงระบบ", "5", "ฮาร์ดแวร์คอมพิวเตอร์, Compiler vs VM, ชนิดข้อมูลระดับบิต, Loop Invariants, Stack Frame"],
            ["บทที่ 2", "เข็มทิศวัดประสิทธิภาพ (Big-O & Complexity)", "4", "Asymptotic Analysis, สเปกตรัม Big-O ทุกระดับ, Time/Space Rules, สูตรลัด Constraints 10⁸ ops/sec"],
            ["บทที่ 3", "ศิลปะการแก้โจทย์ปัญหา (Problem Solving)", "5", "UMPIRE Framework, การแกะหลักตัวเลข (% 10), โจทย์อาร์เรย์, หลุมพราง String Immutability, Edge Cases"],
            ["บทที่ 4", "หน่วยความจำ, พอยน์เตอร์, เวกเตอร์ & OOP", "5", "Stack vs Heap, Cache Locality, Pointer & Reference, Dynamic Array Reallocation Amortized O(1), Memory Alignment"],
            ["บทที่ 5", "โครงสร้างข้อมูลเชิงเส้น (Linear Data Structures)", "4", "Linked List (Singly/Doubly/Circular), Music Playlist Project, Stack (Call Stack & Parentheses), Queue (Circular & Deque)"],
            ["บทที่ 6", "การค้นหา, ตารางแฮช & การจัดเรียงพื้นฐาน", "4", "Linear vs Binary Search 3 แม่แบบ, O(n²) Sorts (Bubble, Selection, Insertion), Hash Table Collision Resolution, Two Sum O(1)"],
            ["บทที่ 7", "การเรียกตัวเอง & โครงสร้างต้นไม้ (Recursion & Trees)", "3", "Recursion Leap of Faith, Call Stack Tracing, Binary Tree, Binary Search Tree (Insert, Search, Delete 3 เคส), DFS & BFS"],
            ["บทที่ 8", "การแบ่งแยกและเอาชนะ & การจัดเรียงขั้นสูง", "3", "Divide & Conquer, Merge Sort (Stable), Quick Sort (Partition Schemes), Quickselect O(n) หา K-th Element"],
            ["บทที่ 9", "การค้นหาย้อนรอย (Backtracking)", "4", "State-Space Tree, แม่แบบ Backtrack 4 สเต็ป, ปัญหา NP & Exhaustive Search, N-Queens & Word Search"],
            ["บทที่ 10", "ขั้นตอนวิธีแบบละโมบ (Greedy Algorithms)", "3", "Greedy Choice Property, วิเคราะห์ Coin Change (เมื่อไหร่ใช้ได้ vs ล้มเหลว), Activity Selection, Jump Game"],
            ["บทที่ 11", "กำหนดการพลวัต (Dynamic Programming)", "3", "Overlapping Subproblems, Memoization (Top-Down) vs Tabulation (Bottom-Up), Space Optimization, Knapsack & LCS"],
            ["บทที่ 12", "กราฟและอัลกอริทึมโครงข่าย (Graph Theory & Networks)", "5", "Adjacency Matrix vs List, BFS/DFS, Shortest Path (Dijkstra, Bellman-Ford), MST (Prim, Kruskal / Union-Find), Topological Sort"],
          ],
        },
        { t: "h2", c: "ยุทธศาสตร์สองภาษา: ทำไมต้องเรียนทั้ง C++ และ Python?" },
        {
          t: "p",
          c: "ในการทำงานเป็นวิศวกรซอฟต์แวร์มืออาชีพ ไม่มีภาษาเดียวที่ตอบโจทย์ทุกอย่าง:\n- **C++ (มองทะลุฮาร์ดแวร์)**: สอนให้คุณเห็นภาพที่อยู่หน่วยความจำจริง (`*ptr`, `&val`), การจัดสรรหน่วยความจำ (`new`, `delete`), และความสำคัญของ Cache Locality ในระบบ High-Performance เช่น Game Engine, Database Kernel หรือ High-Frequency Trading\n- **Python (ความเร็วในการแก้โจทย์สัมภาษณ์)**: ช่วยให้คุณเขียนโค้ดแก้โจทย์อัลกอริทึมที่ซับซ้อน (เช่น Graph BFS หรือ Backtracking) ได้เสร็จภายใน 20-30 บรรทัด สื่อสารไอเดียกับผู้สัมภาษณ์ได้อย่างกระชับโดยไม่เสียเวลากับ Boilerplate Code",
        },
        {
          t: "callout",
          title: "🎯 คำแนะนำในการศึกษาแต่ละบทเรียน",
          c: "1. อ่านและทำความเข้าใจ **Intuition (ทำไมต้องมีสิ่งนี้?)** และดูภาพจำลองใน RAM ให้เห็นภาพ\n2. เขียนโค้ดตามทั้งใน **Python และ C++** โดยสังเกตความแตกต่างในการบริหารหน่วยความจำ\n3. ดูโจทย์ตัวอย่างและพยายามแก้โจทย์ด้วยตนเองก่อนเปิดดูส่วน Solution\n4. เชื่อมโยงกลับสู่ **Use Case ในระบบโปรดักชันจริง** เช่น Redis, Git, Web Browsers เพื่อให้ความรู้อยู่ติดตัวอย่างยั่งยืน",
        },
      ],
      en: [],
    },
  },

  "dsa-intro": {
    slug: "dsa-intro",
    title: {
      th: "C++ สู่ Python: สองอาวุธคู่กายสำหรับงานระบบ & สัมภาษณ์งาน",
      en: "C++ to Python: Dual-Weapon Strategy for Systems & Interviews",
    },
    lead: {
      th: "เปรียบเทียบสองกระบวนทัศน์: C++ สำหรับการควบคุมหน่วยความจำระดับฮาร์ดแวร์ และ Python สำหรับความเร็วและพลังในการแก้โจทย์สัมภาษณ์งาน",
      en: "Master the dual-language strategy: C++ for bare-metal memory mastery and Python for rapid interview problem-solving.",
    },
    group: "เริ่มต้นที่นี่",
    blocks: {
      th: [
        {
          t: "p",
          c: "เมื่อเตรียมตัวสำหรับการสัมภาษณ์งานด้านเทคนิค (Technical Coding Interview) คำถามยอดนิยมคือ: *'ควรใช้ภาษาอะไรในการสอบสัมภาษณ์?'* คำตอบที่ชาญฉลาดที่สุดคือการเข้าใจ **ความสัมพันธ์ระหว่าง C++ และ Python** อย่างถ่องแท้",
        },
        { t: "h2", c: "ตารางเปรียบเทียบ C++ STL กับ Python Built-ins / Collections" },
        {
          t: "table",
          head: ["โครงสร้างข้อมูล (Data Structure)", "C++ Standard Template Library (STL)", "Python Built-in / Standard Library", "Time Complexity เฉลี่ย"],
          rows: [
            ["Dynamic Array", "`std::vector<T>`", "`list`", "Lookup: O(1), Append: O(1) Amortized"],
            ["Linked List", "`std::list<T>` (Doubly)", "`collections.deque`", "Insert/Delete at ends: O(1)"],
            ["Stack (LIFO)", "`std::stack<T>`", "`list` (`append` / `pop`)", "Push/Pop: O(1)"],
            ["Queue (FIFO)", "`std::queue<T>`", "`collections.deque` (`append` / `popleft`)", "Enqueue/Dequeue: O(1)"],
            ["Double-Ended Queue", "`std::deque<T>`", "`collections.deque`", "Push/Pop both ends: O(1)"],
            ["Hash Map (Key-Value)", "`std::unordered_map<K, V>`", "`dict`", "Search / Insert / Delete: O(1)"],
            ["Hash Set (Unique Keys)", "`std::unordered_set<T>`", "`set`", "Search / Insert / Delete: O(1)"],
            ["Balanced BST Map (Sorted)", "`std::map<K, V>` (Red-Black Tree)", "`bisect` module หรือ `SortedDict`", "Search / Insert: O(log n)"],
            ["Priority Queue / Min-Heap", "`std::priority_queue<T>` (Default: Max)", "`heapq` (Default: Min-Heap)", "Push / Pop: O(log n), Top: O(1)"],
          ],
        },
        {
          t: "callout",
          title: "⚠️ กับดักร้ายแรงที่สุดใน Python: ห้ามใช้ list.pop(0) เป็นคิว!",
          c: "ในภาษา Python การใช้ `list.pop(0)` เพื่อดึงตัวแรกออกจากลิสต์จะมี Time Complexity เป็น **O(n)** เสมอ เพราะต้องขยับข้อมูลที่เหลือทั้งหมดไปข้างหน้าหนึ่งช่อง! หากใช้ในโจทย์ BFS จะทำให้โค้ดตกเป็น Time Limit Exceeded ทันที\n\nให้จำไว้เสมอ: **ต้องการ Queue ให้ใช้ `from collections import deque` และเรียก `.popleft()` ซึ่งทำงานแบบ O(1)**",
        },
        { t: "h2", c: "โมเดลการบริหารหน่วยความจำ: Manual vs Reference Counting & GC" },
        {
          t: "p",
          c: "ความแตกต่างสำคัญที่สุดระหว่าง C++ และ Python ไม่ใช่แค่เรื่อง Syntax แต่คือ **การจัดการหน่วยความจำ (Memory Management)**:",
        },
        {
          t: "table",
          head: ["คุณลักษณะ", "C++ (Bare-Metal Control)", "Python (Managed Object Reference)"],
          rows: [
            [
              "การจองหน่วยความจำ",
              "โปรแกรมเมอร์ควบคุมเองบน Stack หรือสั่ง `new` บน Heap",
              "ทุกตัวแปรเป็น Object บน Heap จัดสรรให้อัตโนมัติผ่าน CPython Memory Allocator",
            ],
            [
              "ตัวแปรเก็บอะไร?",
              "ตัวแปรเก็บค่าข้อมูลจริง (Value) หรือหมายเลขที่อยู่ (Pointer/Address)",
              "ตัวแปรเก็บตัวชี้ (Reference Pointer) ไปยัง `PyObject` เสมอ",
            ],
            [
              "การคืนหน่วยความจำ",
              "ต้องเรียก `delete` หรือใช้ Smart Pointers (`std::unique_ptr`)",
              "มีระบบ **Reference Counting** ร่วมกับ **Generational Garbage Collector**",
            ],
            [
              "ความเร็วในการรัน",
              "⚡ เร็วระดับฮาร์ดแวร์ ไร้ Overhead",
              "🐢 ช้ากว่าประมาณ 10–50 เท่าเนื่องจาก Dynamic Typing และ Indirection",
            ],
            [
              "ความเร็วในการพิมพ์โค้ดสัมภาษณ์",
              "🐢 ช้ากว่า โค้ดยาว ต้องระบุ Type ทุกจุด",
              "⚡ เร็วกว่า 2–3 เท่า โค้ดสั้น กระชับ มี Built-ins ทรงพลัง",
            ],
          ],
        },
        { t: "h2", c: "เปรียบเทียบโค้ดสร้าง Linked List Node" },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Node struct พร้อม Pointer",
          c: `struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// การสร้างบน Heap และเชื่อมโยง
ListNode* head = new ListNode(1);
head->next = new ListNode(2);

// ต้องระวังเรื่อง Memory Leak: อย่าลืม delete เมื่อใช้เสร็จ!
delete head->next;
delete head;`,
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Node class พร้อม Reference",
          c: `class ListNode:
    def __init__(self, val: int = 0, next: 'ListNode | None' = None):
        self.val = val
        self.next = next

# การสร้างและเชื่อมโยง
head = ListNode(1)
head.next = ListNode(2)

# Garbage Collector จัดการคืนหน่วยความจำให้อัตโนมัติเมื่อไม่มีตัวแปรใดอ้างอิงถึงอีก`,
        },
        {
          t: "callout",
          title: "🎯 คำแนะนำในการใช้หลักสูตรนี้ให้เกิดประโยชน์สูงสุด",
          c: "เราจะแสดงตัวอย่างโค้ดคู่กันทั้ง C++ และ Python ในเกือบทุกบทเรียน: ให้คุณอ่าน C++ เพื่อทำความเข้าใจกลไกการจองหน่วยความจำและการชี้ Pointer จากนั้นฝึกพิมพ์และแก้โจทย์ด้วย Python เพื่อสร้างความคล่องแคล่วในการสัมภาษณ์งาน!",
        },
      ],
      en: [],
    },
  },
};
