import type { Page } from "@/lib/types";

export const chapter03Pages: Record<string, Page> = {
  "dsa-ch3-intro": {
    slug: "dsa-ch3-intro",
    title: {
      th: "ภาพรวมหน่วยความจำในคอมพิวเตอร์ (Memory Hierarchy)",
      en: "Computer Memory Overview: Stack vs Heap",
    },
    lead: {
      th: "ทำความเข้าใจโครงสร้างหน่วยความจำ RAM, ความแตกต่างระหว่าง Stack และ Heap และผลกระทบต่อความเร็วของ Algorithm",
      en: "Understand computer RAM architecture, Stack vs Heap memory allocations, and cache locality impacts.",
    },
    group: "บทที่ 4: หน่วยความจำ, Pointer, Dynamic Array & OOP",
    blocks: {
      th: [
        {
          t: "p",
          c: "ในการเรียนโครงสร้างข้อมูล (Data Structures) เราไม่ได้ศึกษาเพียงแค่ 'สูตร' ทางคณิตศาสตร์ แต่เรากำลังศึกษาวิธีการ **จัดวางข้อมูลลงบนแผงวงจรหน่วยความจำ (RAM)** เพื่อให้ CPU สามารถเข้าถึงและคำนวณได้อย่างมีประสิทธิภาพสูงสุด",
        },
        { t: "h2", c: "ลำดับชั้นของหน่วยความจำ (Memory Hierarchy)" },
        {
          t: "p",
          c: "ความเร็วในการเข้าถึงข้อมูลเรียงจากเร็วที่สุด (แพงสุด จุได้น้อยสุด) ไปยังช้าที่สุด:",
        },
        {
          t: "table",
          head: ["ระดับหน่วยความจำ", "ความเร็วการเข้าถึง", "ความจุทั่วไป", "ผู้ควบคุม"],
          rows: [
            ["CPU Registers", "⚡ < 1 นาโนวินาที", "ไม่กี่ร้อย Bytes", "Compiler / CPU"],
            ["L1 / L2 / L3 Cache", "🚀 1 – 10 นาโนวินาที", "กิโลไบต์ ถึง เมกะไบต์", "Hardware Cache Controller"],
            ["Main Memory (RAM)", "🐢 50 – 100 นาโนวินาที", "กิกะไบต์ (GB)", "Operating System (OS)"],
            ["Disk / SSD Storage", "🐌 ไมโครถึงมิลลิวินาที", "เทระไบต์ (TB)", "File System"],
          ],
        },
        { t: "h2", c: "Stack Memory vs Heap Memory" },
        {
          t: "p",
          c: "พื้นที่หน่วยความจำของโปรแกรมถูกแบ่งเป็น 2 ส่วนหลักที่สำคัญมากสำหรับโปรแกรมเมอร์:",
        },
        {
          t: "table",
          head: ["คุณสมบัติ", "Stack Memory", "Heap Memory"],
          rows: [
            [
              "การจัดสรร (Allocation)",
              "อัตโนมัติเมื่อเรียกฟังก์ชัน จัดเรียงแบบ LIFO (กองซ้อน)",
              "จัดสรรแบบไดนามิก ณ Runtime เมื่อสร้าง Object หรือจองด้วย `new`",
            ],
            [
              "ความเร็วในการทำงาน",
              "⚡ เร็วมาก แค่เลื่อน Stack Pointer ขึ้น/ลง",
              "🐢 ช้ากว่า ต้องค้นหาช่องว่างที่พอดีใน Memory",
            ],
            [
              "การคืนหน่วยความจำ",
              "คืนอัตโนมัติทันทีที่ฟังก์ชันทำงานเสร็จ (Return)",
              "ใน C++ ต้องลบเองด้วย `delete` ส่วนใน Python มี Garbage Collector",
            ],
            [
              "ขนาดขอบเขต",
              "มีขอบเขตจำกัด หากใช้ลึกเกินไปจะเกิด Stack Overflow",
              "มีขนาดใหญ่ตาม RAM ที่ระบบปฏิบัติการอนุญาต",
            ],
          ],
        },
      ],
      en: [],
    },
  },

  "dsa-ch3-pointer": {
    slug: "dsa-ch3-pointer",
    title: {
      th: "Pointer & Reference: ตัวชี้และการอ้างอิงหน่วยความจำ",
      en: "Pointers & References: Memory Addresses vs Python Objects",
    },
    lead: {
      th: "เจาะลึกตัวชี้ Pointer ใน C++ (Address `&`, Dereference `*`) เทียบกับ Reference Model และ Garbage Collection ใน Python",
      en: "Deep dive into C++ pointers and memory addresses vs Python's unified reference model and GC.",
    },
    group: "บทที่ 4: หน่วยความจำ, Pointer, Dynamic Array & OOP",
    blocks: {
      th: [
        { t: "h2", c: "Pointer ใน C++ คืออะไร?" },
        {
          t: "p",
          c: "**Pointer** คือตัวแปรพิเศษที่ค่าข้างในไม่ใช่ตัวเลขข้อมูลธรรมดา แต่เป็น **หมายเลขที่อยู่ (Memory Address)** ของตัวแปรอื่นใน RAM ตัวอย่างเช่น:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: ตัวชี้ Pointer, Address (&) และ Dereference (*)",
          c: `#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int* ptr = &x; // ptr เก็บที่อยู่ (Address) ของตัวแปร x

    cout << "ค่าของ x: " << x << "\\n";             // 42
    cout << "ที่อยู่ของ x (&x): " << ptr << "\\n";      // เช่น 0x7ffee4b2
    cout << "ค่าที่ ptr ชี้อยู่ (*ptr): " << *ptr << "\\n"; // 42

    // เปลี่ยนค่า x ผ่าน Pointer (Dereferencing)
    *ptr = 99;
    cout << "ค่าของ x หลังเปลี่ยนผ่าน pointer: " << x << "\\n"; // 99
    return 0;
}`,
        },
        { t: "h2", c: "Python Reference Model: ทุกอย่างคือ Pointer ที่ซ่อนอยู่" },
        {
          t: "p",
          c: "ใน Python เราไม่มีตัวดำเนินการ `*` หรือ `&` แต่ในเบื้องลึก CPython ถูกเขียนด้วยภาษา C **ทุกตัวแปรใน Python คือ Pointer แบบ `PyObject*`** นั่นเอง! เราสามารถดูหมายเลขที่อยู่ของ Object ใน Python ได้ผ่านฟังก์ชัน `id()`:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: ตรวจสอบ Memory Reference ด้วย id() และ is",
          c: `a = [10, 20, 30]
b = a  # b รับ pointer ชี้ไปที่ object เดียวกัน

print("id(a):", hex(id(a)))
print("id(b):", hex(id(b)))
print("a is b:", a is b)  # True (ชี้ที่อยู่เดียวกันใน RAM)

b.append(40)
print("a:", a)  # [10, 20, 30, 40]

# แต่ถ้าสร้าง list ใหม่
c = [10, 20, 30, 40]
print("a == c:", a == c)  # True (ค่าข้างในเท่ากัน)
print("a is c:", a is c)  # False (คนละตำแหน่งใน RAM!)`,
        },
        {
          t: "callout",
          title: "🎯 สรุปสำหรับสัมภาษณ์งาน",
          c: "เมื่อผู้สัมภาษณ์ถามว่า 'Python มี Pointer ไหม?' คำตอบที่ถูกต้องคือ: 'ในทางไวยากรณ์ Python ไม่มีตัวแปร pointer ให้ควบคุม address โดยตรง แต่ในเชิงสถาปัตยกรรม ทุกตัวแปรใน Python ทำงานเป็น Reference Pointer ชี้ไปยัง Object บน Heap เสมอ'",
        },
      ],
      en: [],
    },
  },

  "dsa-ch3-vector": {
    slug: "dsa-ch3-vector",
    title: {
      th: "Vector & Dynamic Array: อาร์เรย์ยืดหยุ่น",
      en: "Dynamic Arrays: std::vector and Python list internals",
    },
    lead: {
      th: "กลไกเบื้องหลัง Dynamic Array: การขยายขนาดอัตโนมัติ (Capacity Doubling) และความซับซ้อน Amortized O(1)",
      en: "Explore dynamic arrays, automatic resizing, capacity doubling mechanics, and amortized O(1) analysis.",
    },
    group: "บทที่ 4: หน่วยความจำ, Pointer, Dynamic Array & OOP",
    blocks: {
      th: [
        { t: "h2", c: "Static Array vs Dynamic Array" },
        {
          t: "p",
          c: "อาร์เรย์แบบดั้งเดิม (Static Array) ต้องกำหนดขนาดตายตัวตั้งแต่ตอนเขียนโปรแกรมและไม่สามารถขยายได้ แต่ในชีวิตจริงเราต้องการอาร์เรย์ที่เพิ่มข้อมูลได้เรื่อยๆ ซึ่ง C++ มี `std::vector` และ Python มี `list`:",
        },
        {
          t: "code",
          lang: "text",
          label: "กลไกการขยายขนาด (Capacity Doubling)",
          c: `เริ่มต้น: [ A | B ]                 (Size: 2, Capacity: 2)
ต้องการใส่ C แต่พื้นที่เต็ม!
1. จองพื้นที่ใหม่ขนาด 2 เท่า: [ _ | _ | _ | _ ] (Capacity: 4)
2. คัดลอกข้อมูลเดิมไป:       [ A | B | _ | _ ]
3. ใส่ C ลงไป:               [ A | B | C | _ ] (Size: 3, Capacity: 4)
4. คืนพื้นที่เดิม`,
        },
        {
          t: "table",
          head: ["การทำงาน (Operation)", "Time Complexity", "คำอธิบาย"],
          rows: [
            ["Access ด้วย Index (`arr[i]`)", "O(1)", "คำนวณตำแหน่ง Address: `Base + (i * size)`"],
            ["Append ต่อท้าย (`push_back`)", "Amortized O(1)", "ส่วนใหญ่ O(1) นานๆ ครั้งขยายขนาด O(n)"],
            ["Insert หรือ Delete ตรงกลาง", "O(n)", "ต้องเลื่อนสมาชิกที่อยู่ถัดไปทั้งหมด"],
            ["Pop ตัวสุดท้าย", "O(1)", "แค่ลดตัวนับขนาด (Size) ลง"],
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "Python: ดู Size vs Capacity ที่ซ่อนอยู่ด้วย sys.getsizeof()",
          c: `import sys

data = []
print(f"ขนาดเริ่มต้น: {sys.getsizeof(data)} bytes")

for i in range(10):
    data.append(i)
    # ขนาด bytes จะกระโดดเป็นขั้นบันไดเมื่อ Capacity ขยายตัว
    print(f"Len: {len(data)}, Memory: {sys.getsizeof(data)} bytes")`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch3-struct": {
    slug: "dsa-ch3-struct",
    title: {
      th: "Struct & Dataclass: การรวมกลุ่มข้อมูล",
      en: "Structs & Dataclasses: Composite Types",
    },
    lead: {
      th: "การรวมข้อมูลต่างชนิดเข้าด้วยกันเพื่อแทน Entity เช่น Node, Point, Edge และการใช้ @dataclass ใน Python",
      en: "Group heterogeneous fields to represent entities like Graph Nodes or 2D Points using structs and dataclasses.",
    },
    group: "บทที่ 4: หน่วยความจำ, Pointer, Dynamic Array & OOP",
    blocks: {
      th: [
        { t: "h2", c: "การรวมกลุ่มข้อมูล (Composite Data Types)" },
        {
          t: "p",
          c: "ในการแก้โจทย์ DSA เรามักต้องเก็บข้อมูลที่มีหลายฟิลด์ร่วมกัน เช่น พิกัด `(x, y)` หรือโหนดของกราฟ `(u, v, weight)` ใน C++ เราใช้ `struct` ส่วนใน Python แนะนำให้ใช้ `@dataclass`:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: การใช้ @dataclass สร้าง Entity อย่างมืออาชีพ",
          c: `from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

@dataclass
class Edge:
    source: int
    destination: int
    weight: float

p1 = Point(10, 20)
edge1 = Edge(source=0, destination=1, weight=4.5)

print(p1)       # Point(x=10, y=20)
print(edge1)    # Edge(source=0, destination=1, weight=4.5)`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Struct",
          c: `#include <iostream>
using namespace std;

struct Point {
    int x;
    int y;
};

struct Edge {
    int source;
    int destination;
    double weight;
};

int main() {
    Point p1 = {10, 20};
    Edge edge1 = {0, 1, 4.5};

    cout << "Point: (" << p1.x << ", " << p1.y << ")\\n";
    return 0;
}`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch3-oop": {
    slug: "dsa-ch3-oop",
    title: {
      th: "OOP สำหรับงาน DSA & การออกแบบ Node",
      en: "OOP for DSA: Classes, Objects & Node Design",
    },
    lead: {
      th: "การประยุกต์ใช้ Object-Oriented Programming ในการสร้างคลาส Node และ Data Structures",
      en: "Apply OOP principles to design Node classes for Linked Lists, Trees, and Graph components.",
    },
    group: "บทที่ 4: หน่วยความจำ, Pointer, Dynamic Array & OOP",
    blocks: {
      th: [
        { t: "h2", c: "โครงสร้าง Node พื้นฐาน: ต้นกำเนิดของ Linked List และ Tree" },
        {
          t: "p",
          c: "หัวใจสำคัญของโครงสร้างข้อมูลแบบพอยน์เตอร์เกือบทั้งหมดคือ **คลาส Node** ซึ่งประกอบด้วยส่วนเก็บข้อมูล (`val` / `data`) และส่วนเก็บพอยน์เตอร์อ้างอิงไปยังโหนดถัดไป (`next`, `left`, `right`):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: ListNode มาตรฐาน (ตามแบบฉบับ LeetCode)",
          c: `class ListNode:
    """โหนดมาตรฐานสำหรับ Singly Linked List"""
    def __init__(self, val: int = 0, next: 'ListNode | None' = None):
        self.val = val
        self.next = next

# สร้าง Linked List: 1 -> 2 -> 3
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)

# ท่องอ่านข้อมูล (Traversal)
curr = head
while curr:
    print(curr.val, end=" -> ")
    curr = curr.next
print("None")  # 1 -> 2 -> 3 -> None`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: ListNode ด้วย Class หรือ Struct",
          c: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

int main() {
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);

    ListNode* curr = head;
    while (curr != nullptr) {
        cout << curr->val << " -> ";
        curr = curr->next;
    }
    cout << "nullptr\\n";
    return 0;
}`,
        },
        {
          t: "callout",
          title: "🎯 สังเกตความสะอาดของโค้ด",
          c: "ใน Python เราใช้ `curr.next` และไม่ต้องกังวลเรื่อง `delete` หรือ memory leak ขณะที่ใน C++ เราต้องใช้ `curr->next` และจดจำการลบโหนดทุกครั้งที่เลิกใช้งาน นี่คือเหตุผลที่ในบทถัดไปเราจะฝึกเขียนโครงสร้างข้อมูลด้วย Python เพื่อประสิทธิภาพสูงสุดในการสัมภาษณ์งาน!",
        },
      ],
      en: [],
    },
  },
};
