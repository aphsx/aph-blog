import type { Page } from "@/lib/types";

export const overviewPages: Record<string, Page> = {
  "dsa-overview": {
    slug: "dsa-overview",
    title: {
      th: "Data Structures & Algorithms (DSA) — ภาพรวม & แผนการเรียน",
      en: "Data Structures & Algorithms (DSA) — Course Overview & Roadmap",
    },
    lead: {
      th: "เรียนรู้โครงสร้างข้อมูลและอัลกอริทึมครบวงจร 12 ตอน 49 บทเรียน ถอดรหัสโจทย์คลาสสิกสู่การเตรียมสัมภาษณ์งาน (LeetCode Patterns) ด้วย Python พร้อมเทียบเคียง C++",
      en: "Master Data Structures & Algorithms across 12 chapters and 49 lessons, tailored for technical interviews with Python and C++ comparisons.",
    },
    group: "เริ่มต้นที่นี่",
    blocks: {
      th: [
        {
          t: "p",
          c: "ยินดีต้อนรับสู่หลักสูตร **Data Structures & Algorithms (DSA)** ฉบับสมบูรณ์ ซึ่งนำเนื้อหาและแกนหลักจากหลักสูตรยอดนิยม *C++ Data Structure & Algorithm* โดย Mikelopster มาจัดวางใหม่ ยกระดับเนื้อหาให้เข้มข้นยิ่งขึ้น พร้อมปรับเปลี่ยนแนวทางการสอนให้ตอบโจทย์ **การเตรียมตัวสอบสัมภาษณ์งานด้านเทคนิค (Technical Coding Interview)** ในปัจจุบันอย่างแท้จริง",
        },
        {
          t: "callout",
          title: "💡 การจัดลำดับเนื้อหาเชิงการสอนที่ปรับปรุงให้ดีกว่าเดิม (Pedagogical Optimization)",
          c: "ในหลักสูตรฉบับนี้ เราได้ปรับปรุงลำดับการเรียนรู้ให้เป็นไปตามหลักสูตรวิทยาการคอมพิวเตอร์ชั้นนำระดับโลก (เช่น MIT, Stanford และ NeetCode Roadmap):\n1. **ย้าย Big-O มาเรียนก่อน (บทที่ 2)**: เพื่อให้ผู้เรียนมี 'แว่นตาวัดประสิทธิภาพ' ติดตัวตั้งแต่แรก ทำให้เข้าใจทันทีว่าทำไมโครงสร้างข้อมูลในบทถัดๆ ไป (Array, Linked List, Stack, Queue) ถึงถูกเลือกใช้\n2. **รวม Hash Table เข้ากับ Linear Data Structures (บทที่ 5)**: เชื่อมโยงการแก้ Collision ด้วย Linked List และการทำ Two Sum ให้เห็นภาพชัดเจน\n3. **รวม Sorting Algorithms ครบวงจร (บทที่ 6)**: เห็นพัฒนาการจาก Basic O(n²) สู่ Advanced O(n log n)\n4. **รวม Graph Algorithms เป็นหมวดหมู่เดียว (บทที่ 12)**: ไม่แยกขาดกระจัดกระจาย ทำให้เข้าใจตั้งแต่ Representation -> Traversal (BFS/DFS) -> Dijkstra -> MST -> Topological Sort อย่างต่อเนื่อง",
        },
        { t: "h2", c: "โครงสร้างหลักสูตร (Optimized Curriculum 12 บทเรียน)" },
        {
          t: "p",
          c: "หลักสูตรนี้จัดเรียงเนื้อหาจากพื้นฐานที่จำเป็น ก้าวสู่โครงสร้างข้อมูล และต่อยอดสู่กระบวนทัศน์อัลกอริทึมขั้นสูง:",
        },
        {
          t: "table",
          head: ["บทที่", "ชื่อบท / หมวดหมู่หลัก", "จำนวนหัวข้อ", "เป้าหมายการเรียนรู้"],
          rows: [
            [
              "บทที่ 1",
              "Basic Programming (C++ & Python)",
              "5",
              "ไวยากรณ์พื้นฐาน, ตัวแปร, ชนิดข้อมูล, เงื่อนไข, Loop, ฟังก์ชัน",
            ],
            [
              "บทที่ 2",
              "การวัดประสิทธิภาพ & Big-O Notation",
              "4",
              "Asymptotic Analysis, Big-O Classes, Time/Space Rules, Constraints Cheat Sheet",
            ],
            [
              "บทที่ 3",
              "การฝึกแก้โจทย์ปัญหาเบื้องต้น",
              "5",
              "การแก้โจทย์ตัวเลข, อาร์เรย์, สตริง และ Edge Cases เช็คลิสต์",
            ],
            [
              "บทที่ 4",
              "Memory, Pointer, Vector & OOP",
              "5",
              "Stack vs Heap, Pointer vs Reference, Dynamic Array, Class Node",
            ],
            [
              "บทที่ 5",
              "โครงสร้างข้อมูลเชิงเส้น (Linear Data Structures)",
              "4",
              "Linked List (Singly/Doubly/Circular), Stack (LIFO), Queue & Deque (FIFO)",
            ],
            [
              "บทที่ 6",
              "การค้นหา, การจัดเรียงพื้นฐาน & ตารางแฮช (Searching, Sorting & Hash Tables)",
              "4",
              "Linear Search, Binary Search Template, O(n²) Sorts, Hash Table & Two Sum O(1)",
            ],
            [
              "บทที่ 7",
              "การเรียกตัวเอง & โครงสร้างต้นไม้ (Recursion & Trees)",
              "3",
              "Recursion, Call Stack, Binary Tree, Binary Search Tree (BST), DFS/BFS Traversals",
            ],
            [
              "บทที่ 8",
              "การแบ่งแยกและเอาชนะ & การจัดเรียงขั้นสูง (Divide & Conquer & Fast Sorts)",
              "3",
              "Merge Sort, Quick Sort O(n log n), Master Theorem, Quickselect O(n), Fast Pow",
            ],
            [
              "บทที่ 9",
              "การค้นหาย้อนรอย (Backtracking)",
              "4",
              "State-Space Tree, Subsets, Permutations, N-Queens, Pruning",
            ],
            [
              "บทที่ 10",
              "ขั้นตอนวิธีแบบละโมบ (Greedy Algorithms)",
              "3",
              "Greedy-Choice Property, Canonical Coin Change, Activity Selection, Jump Game",
            ],
            [
              "บทที่ 11",
              "กำหนดการพลวัต (Dynamic Programming)",
              "3",
              "Memoization (Top-down) vs Tabulation (Bottom-up), Climbing Stairs, Knapsack, Coin Change",
            ],
            [
              "บทที่ 12",
              "กราฟและอัลกอริทึมโครงข่ายครบวงจร",
              "5",
              "Graph Adjacency List, BFS/DFS, Shortest Path (Dijkstra), MST (Kruskal/Prim), Course Schedule",
            ],
          ],
        },
        { t: "h2", c: "เปรียบเทียบการเรียน DSA ด้วย Python vs C++" },
        {
          t: "p",
          c: "ตารางสรุปข้อแตกต่างในมุมมองการเรียนและการสัมภาษณ์งาน เพื่อช่วยให้คุณเลือกเครื่องมือได้เหมาะกับเป้าหมาย:",
        },
        {
          t: "table",
          head: ["มิติการประเมิน", "Python 3", "C++ (Modern C++)"],
          rows: [
            [
              "ความเร็วในการเขียนโค้ด (Coding Speed)",
              "⚡ เร็วมาก โค้ดสั้น 15-20 บรรทัดเสร็จ",
              "⚠️ ช้ากว่า ต้องเขียน struct, type, header",
            ],
            [
              "ความเสี่ยงเรื่อง Memory Bug",
              "🛡️ ปลอดภัย มี Garbage Collection อัตโนมัติ",
              "⚠️ เสี่ยง Segfault, Null Pointer, Memory Leak",
            ],
            [
              "ความเข้าใจระบบฮาร์ดแวร์ & Pointers",
              "🔍 เป็น Object Reference แบบนามธรรม",
              "🎯 ลึกซึ้ง เข้าใจ Address, Stack, Heap, Pointer `*`",
            ],
            [
              "Standard Data Structures ในตัว",
              "`list`, `dict`, `set`, `collections.deque`, `heapq`",
              "`std::vector`, `std::unordered_map`, `std::priority_queue`",
            ],
            [
              "ความนิยมในการสอบสัมภาษณ์งาน",
              "🏆 นิยมอันดับ 1 ใน LeetCode / Big Tech",
              "🏆 นิยมมากในสาย High Frequency Trading / Game Engine",
            ],
          ],
        },
        { t: "h2", c: "แนวทางการเรียนให้ประสบความสำเร็จ" },
        {
          t: "ol",
          c: [
            "**เข้าใจภาพก่อนลงโค้ด**: วาดภาพการเชื่อมต่อของ Node, การเลื่อนของ Pointer หรือ Call Stack ในหัวก่อนเริ่มเขียนโค้ด",
            "**วิเคราะห์ Big-O เสมอ**: ทุกครั้งที่เขียนอัลกอริทึม ให้ถามตัวเองเสมอว่า Time Complexity และ Space Complexity เป็นเท่าไร",
            "**ลองเขียนทั้ง 2 ภาษา**: ใช้ Python ในการฝึกจับเวลาแก้โจทย์เร็ว และเปิดดูโค้ด C++ เทียบเคียงเพื่อดูว่าในระดับ Memory จัดการอย่างไร",
            "**ทำโจทย์จริงใน LeetCode**: เชื่อมโยงแต่ละบทเรียนเข้ากับโจทย์จริง เพื่อสร้างกล้ามเนื้อ Pattern Recognition สำหรับวันสัมภาษณ์งาน",
          ],
        },
        { t: "h2", c: "เริ่มต้นบทเรียนแรก" },
        {
          t: "links",
          c: [
            {
              title: "บทนำ: C++ สู่ Python สำหรับสัมภาษณ์งาน",
              slug: "dsa-intro",
              desc: "ทำความเข้าใจ Compiler vs Interpreter และพื้นฐาน Memory Model ที่สำคัญ",
            },
            {
              title: "บทที่ 1: Basic Programming C++ & Python",
              slug: "dsa-ch1-intro",
              desc: "เริ่มต้นปูพื้นฐานไวยากรณ์ ตัวแปร เงื่อนไข และฟังก์ชัน",
            },
            {
              title: "บทที่ 2: การวัดประสิทธิภาพ & Big-O",
              slug: "dsa-ch7-intro",
              desc: "เรียนรู้เครื่องมือวัดความเร็วและ Constraints Cheat Sheet สำหรับสัมภาษณ์งาน",
            },
          ],
        },
      ],
      en: [],
    },
  },

  "dsa-intro": {
    slug: "dsa-intro",
    title: {
      th: "บทนำ: C++ สู่ Python สำหรับสัมภาษณ์งาน",
      en: "Introduction: From C++ to Python for Technical Interviews",
    },
    lead: {
      th: "ทำความเข้าใจกระบวนการทำงานของโปรแกรม ระบบ Compiler vs Interpreter และโมเดลหน่วยความจำ Pointer vs Reference",
      en: "Understand how programs execute, compare Compilers vs Interpreters, and explore low-level memory vs Python object references.",
    },
    group: "เริ่มต้นที่นี่",
    blocks: {
      th: [
        {
          t: "p",
          c: "การเขียนโปรแกรม (**Programming**) คือกระบวนการออกแบบและสร้างชุดคำสั่งให้คอมพิวเตอร์ประมวลผลข้อมูลตามขั้นตอนที่กำหนด เพื่อแก้ปัญหาเฉพาะทางอย่างแม่นยำและมีประสิทธิภาพ การเรียนรู้ **Data Structures & Algorithms (DSA)** จึงเปรียบเสมือนการเรียนรู้วิธีเลือกกล่องเก็บของ (Data Structure) และวิธีหยิบจับของในกล่องนั้น (Algorithm) ให้ประหยัดเวลาและหน่วยความจำที่สุด",
        },
        { t: "h2", c: "Compiler vs Interpreter: โค้ดทำงานได้อย่างไร" },
        {
          t: "p",
          c: "คอมพิวเตอร์เข้าใจเฉพาะรหัสภาษาเครื่อง (Machine Code / 0 และ 1) เท่านั้น ภาษาที่เราเขียนทั้ง C++ และ Python จึงต้องผ่านตัวแปลงภาษา ซึ่งมี 2 รูปแบบหลัก:",
        },
        {
          t: "table",
          head: ["คุณสมบัติ", "Compiler (เช่น C++, Rust, Go)", "Interpreter (เช่น Python, JavaScript)"],
          rows: [
            [
              "กระบวนการแปลง",
              "แปลงโค้ดทั้งไฟล์เป็น Machine Code ครั้งเดียวก่อนรัน (Executable binary)",
              "อ่านและตีความคำสั่งทีละบรรทัด (Interpret line-by-line / Bytecode)",
            ],
            [
              "ความเร็วในการประมวลผล",
              "⚡ เร็วมาก ทำงานระดับ Native Machine",
              "🐢 ช้ากว่าในระดับ CPU Instruction แต่เพียงพอสำหรับโจทย์สัมภาษณ์",
            ],
            [
              "การตรวจจับ Error",
              "เจอ Syntax & Type Error ทั้งหมดตอน Compile time ก่อนรัน",
              "เจอ Runtime Error ทันทีที่คำสั่งบรรทัดนั้นถูกรัน",
            ],
            [
              "ขั้นตอนการพัฒนา",
              "Write -> Compile -> Link -> Run",
              "Write -> Run ทันที (Interactive REPL ได้ง่าย)",
            ],
          ],
        },
        {
          t: "code",
          lang: "text",
          label: "ขั้นตอนการคอมไพล์ของ C++ (C++ Compilation Pipeline)",
          c: `Source Code (.cpp)
       │
       ▼ (Preprocessor: จัดการ #include, #define)
Expanded Code
       │
       ▼ (Compiler: ตรวจสอบ Syntax & Type)
Assembly Code (.s)
       │
       ▼ (Assembler: แปลงเป็นภาษาเครื่อง)
Object Code (.o / .obj)
       │
       ▼ (Linker: รวม Library และ Object Files)
Executable Binary (.exe / a.out)`,
        },
        {
          t: "h2",
          c: "Memory Model: Pointer ใน C++ เทียบกับ Object Reference ใน Python",
        },
        {
          t: "p",
          c: "สิ่งสำคัญที่สุดในการเรียน DSA คือการเข้าใจว่าข้อมูลถูกจัดเก็บบน RAM อย่างไร และตัวแปรชี้ไปยังข้อมูลนั้นอย่างไร:",
        },
        {
          t: "ul",
          c: [
            "**ใน C++**: ตัวแปรสามารถเก็บค่าข้อมูลโดยตรงบน Stack หรือเก็บเป็น **Pointer (`*`)** ซึ่งคือตัวเลขที่อยู่หน่วยความจำ (Memory Address) บน Heap เช่น `int* ptr = new int(10);` เราต้องระมัดระวังการจอง (`new`) และคืนค่า (`delete`) เสมอ",
            "**ใน Python**: **ทุกตัวแปรเป็น Object Reference ทั้งหมด!** ตัวแปร `x = [1, 2, 3]` ไม่ได้เก็บตัวอาร์เรย์ แต่เก็บลูกศรอ้างอิงไปยัง Object List บน Heap และมี Garbage Collector คอยคืนหน่วยความจำให้อัตโนมัติ",
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Reference Model (ตัวแปรคือป้ายชื่อชี้ไปยัง Object)",
          c: `# ใน Python ทุกตัวแปรคือ Reference
a = [1, 2, 3]
b = a  # b ชี้ไปยัง list เดียวกันกับ a (ไม่ได้ copy ข้อมูล)

b.append(4)
print("a:", a)  # ผลลัพธ์: a: [1, 2, 3, 4]
print("id(a) == id(b):", id(a) == id(b))  # True (address เดียวกัน)`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Pointer vs Value Semantics",
          c: `#include <iostream>
#include <vector>

int main() {
    // ใน C++ หาก assign ตรงๆ จะเป็นการ Copy ข้อมูล (Value semantics)
    std::vector<int> a = {1, 2, 3};
    std::vector<int> b = a; // Copy ทั้ง array ทันที!
    b.push_back(4);
    
    std::cout << "a size: " << a.size() << "\\n"; // ยังคงเป็น 3
    std::cout << "b size: " << b.size() << "\\n"; // เป็น 4
    
    // หากต้องการให้ชี้ที่เดียวกัน ต้องใช้ Pointer หรือ Reference (&)
    std::vector<int>* ptr = &a;
    ptr->push_back(99);
    std::cout << "a size after ptr: " << a.size() << "\\n"; // กลายเป็น 4
    return 0;
}`,
        },
        {
          t: "callout",
          title: "จุดสำคัญสำหรับการสัมภาษณ์งาน",
          c: "เมื่อเขียน Linked List หรือ Tree ในห้องสัมภาษณ์ด้วย Python การสั่ง `node.next = next_node` คือการย้าย Pointer 100% เสมือน `node->next = next_node` ใน C++ ทุกประการ แต่เราไม่ต้องพิมพ์ `->` หรือกังวลเรื่อง memory leak ทำให้เขียนโค้ดได้เร็วกว่า 3 เท่า!",
        },
        { t: "h2", c: "สภาพแวดล้อมที่ใช้เขียนโค้ด (Development Environment)" },
        {
          t: "p",
          c: "สำหรับคอร์สนี้ คุณสามารถเลือกรันโค้ดได้ตามสะดวก:",
        },
        {
          t: "ul",
          c: [
            "**Python 3.10+**: แนะนำติดตั้งผ่าน `python.org` หรือใช้ VS Code ร่วมกับ Extension Python",
            "**C++ (GCC / Clang)**: ตรวจสอบด้วยคำสั่ง `g++ --version` (Mac มีมากับ Xcode Command Line Tools, Windows ใช้ MinGW หรือ WSL, Linux ใช้ `build-essential`)",
            "**Online Playground**: สำหรับการทดลองแบบรวดเร็ว สามารถใช้ Replit, LeetCode Playground หรือ Compiler Explorer (godbolt.org)",
          ],
        },
      ],
      en: [],
    },
  },
};
