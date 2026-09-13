import type { Page } from "@/lib/types";

export const chapter04Pages: Record<string, Page> = {
  "dsa-ch4-intro": {
    slug: "dsa-ch4-intro",
    title: {
      th: "หน่วยความจำ RAM: Stack vs Heap & Cache Locality",
      en: "Computer Memory Architecture: Stack, Heap & Cache Locality",
    },
    lead: {
      th: "มองทะลุโครงสร้างหน่วยความจำ RAM ลำดับชั้นความเร็วของ Cache และทำไมการเรียงข้อมูลให้ชิดกัน (Cache Locality) ถึงทำให้โปรแกรมเร็วขึ้นเป็น 10 เท่า",
      en: "Understand physical RAM layout, Stack vs Heap allocation mechanics, and why Cache Locality outperforms pointer jumping by an order of magnitude.",
    },
    group: "บทที่ 4: หน่วยความจำ, พอยน์เตอร์, เวกเตอร์ & OOP",
    blocks: {
      th: [
        {
          t: "p",
          c: "ในการเรียนโครงสร้างข้อมูล (Data Structures) เราไม่ได้กำลังศึกษาเพียงสูตรคณิตศาสตร์บนกระดาษ แต่เรากำลังศึกษาวิธีการ **จัดวางบิตและไบต์ลงบนแผงวงจรหน่วยความจำ (RAM)** เพื่อให้หน่วยประมวลผล (CPU) เข้าถึงข้อมูลได้รวดเร็วที่สุด",
        },
        { t: "h2", c: "ลำดับชั้นของหน่วยความจำ (The Memory Hierarchy)" },
        {
          t: "p",
          c: "ไม่ใช่ทุกที่เก็บข้อมูลจะมีความเร็วเท่ากัน ยิ่งใกล้แกนคำนวณของ CPU มากเท่าใด ก็จะยิ่งเร็วและมีความจุน้อยลงตามลำดับ:",
        },
        {
          t: "table",
          head: ["ระดับหน่วยความจำ", "ตำแหน่ง", "ความเร็วในการเข้าถึง (Access Latency)", "ขนาดความจุทั่วไป"],
          rows: [
            ["**CPU Registers**", "อยู่ในแกน CPU โดยตรง", "⚡ < 0.5 นาโนวินาที (ทันที)", "ไม่กี่ร้อย Bytes (64-bit ต่อ Register)"],
            ["**L1 Cache**", "ติดอยู่กับแกน CPU", "🚀 ~1 นาโนวินาที", "32 KB – 64 KB ต่อ Core"],
            ["**L2 Cache**", "แชร์หรือแยกตาม Core", "🚀 ~3 – 5 นาโนวินาที", "512 KB – 1 MB ต่อ Core"],
            ["**L3 Cache**", "แชร์ระหว่างทุก Core ในชิป", "⏱️ ~10 – 20 นาโนวินาที", "16 MB – 64 MB"],
            ["**Main Memory (RAM)**", "แผงวงจรแรมภายนอก CPU", "🐢 ~50 – 100 นาโนวินาที", "16 GB – 64 GB"],
            ["**NVMe SSD / Disk**", "ไดรฟ์จัดเก็บข้อมูลถาวร", "🐌 10,000 – 100,000 นาโนวินาที (ไมโครวินาที)", "512 GB – 4 TB"],
          ],
        },
        { t: "h2", c: "Stack Memory vs Heap Memory" },
        {
          t: "p",
          c: "เมื่อโปรแกรมของคุณเริ่มทำงาน ระบบปฏิบัติการจะแบ่งพื้นที่ RAM ของกระบวนการนั้นออกเป็น 2 ส่วนสำคัญ:",
        },
        {
          t: "table",
          head: ["คุณสมบัติ", "Stack Memory (กองซ้อน)", "Heap Memory (กองอิสระ)"],
          rows: [
            [
              "รูปแบบการจัดสรร",
              "จัดสรรแบบ LIFO (กองจาน) อัตโนมัติเมื่อเรียกฟังก์ชัน แค่เลื่อน Stack Pointer ขึ้น/ลง",
              "จัดสรรแบบยืดหยุ่น ณ Runtime ตามที่ร้องขอ (เช่น เรียก `new` ใน C++ หรือสร้าง Object ใน Python)",
            ],
            [
              "ความเร็วในการทำงาน",
              "⚡ เร็วระดับฮาร์ดแวร์ CPU สั่งการได้ใน 1 คำสั่ง",
              "🐢 ช้ากว่า เพราะระบบต้องค้นหาบล็อกว่างที่มีขนาดพอดีใน Memory",
            ],
            [
              "การคืนหน่วยความจำ",
              "คืนอัตโนมัติทันทีที่ฟังก์ชันนั้นทำงานจบ (Return)",
              "ต้องสั่งคืนเองด้วย `delete` ใน C++ หรือรอ Garbage Collector ใน Python",
            ],
            [
              "ความเสี่ยง / ข้อผิดพลาด",
              "หากใช้ลึกเกินไป (เช่น Recursion ไม่รู้จบ) จะเกิด **Stack Overflow**",
              "หากลืมคืนพื้นที่ จะเกิด **Memory Leak** และหากจองจนเต็มจะเกิด Out of Memory",
            ],
          ],
        },
        {
          t: "callout",
          title: "🚀 ความลับของ Cache Locality: ทำไม Array จึงมักชนะ Linked List เสมอ?",
          c: "เวลาที่ CPU ดึงข้อมูลจาก RAM มันไม่ได้ดึงมาแค่ 4 Bytes ตามที่ขอ แต่จะดึงข้อมูลทั้งแถบขนาด **64 Bytes (เรียกว่า Cache Line)** เข้ามาเก็บไว้ใน L1/L2 Cache เผื่อไว้เสมอ!\n\n- **Array**: ข้อมูลทุกตัวนอนเรียงติดกันใน RAM เมื่อเข้าถึง `arr[0]` สมาชิก `arr[1]` ถึง `arr[15]` จะถูกดูดเข้าสู่ CPU Cache อัตโนมัติ ทำให้การวนลูปอ่านถัดไปเร็วระดับ 1 นาโนวินาที (**Cache Hit**)\n- **Linked List**: Node แต่ละตัวกระจัดกระจายอยู่คนละทิศละทางใน Heap ทำให้ CPU ต้องวิ่งไปหาที่ RAM ใหม่ทุกครั้ง (**Cache Miss**) ส่งผลให้ Array รันเร็วกว่า Linked List ในฮาร์ดแวร์จริงถึง 5–10 เท่า!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch4-pointer": {
    slug: "dsa-ch4-pointer",
    title: {
      th: "เจาะลึก Pointer & Reference (ที่อยู่ RAM vs Python Object)",
      en: "Pointers & References: Memory Addresses vs Python Objects",
    },
    lead: {
      th: "เข้าใจการทำงานของพอยน์เตอร์ใน C++ (ตัวดำเนินการ & และ *), ตัวชี้ว่าง nullptr, Pointer Arithmetic, สู่โมเดล Reference และ Garbage Collection ใน Python",
      en: "Deep dive into C++ pointers, memory addresses, dereferencing, pointer arithmetic, and Python's underlying PyObject* reference model.",
    },
    group: "บทที่ 4: หน่วยความจำ, พอยน์เตอร์, เวกเตอร์ & OOP",
    blocks: {
      th: [
        { t: "h2", c: "Pointer คืออะไรใน C++?" },
        {
          t: "p",
          c: "**Pointer (ตัวชี้)** คือตัวแปรพิเศษที่ไม่ได้เก็บค่าข้อมูลทั่วไป (เช่น 10, 20) แต่เก็บ **หมายเลขที่อยู่ (Memory Address)** ของตัวแปรอื่นในหน่วยความจำ RAM เปรียบเสมือน 'ป้ายบอกทาง' ที่ชี้ไปยังบ้านหลังเป้าหมาย:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: ตัวดำเนินการ Address-of (&) และ Dereference (*)",
          c: `#include <iostream>
using namespace std;

int main() {
    int num = 42;
    
    // 1. ตัวดำเนินการ & (Address-of): ขอหมายเลขที่อยู่ใน RAM ของตัวแปร num
    int* ptr = &num; 
    
    cout << "ค่าของ num: " << num << "\\n";             // 42
    cout << "ที่อยู่ใน RAM (&num): " << ptr << "\\n";      // เช่น 0x7ffee4b2
    
    // 2. ตัวดำเนินการ * (Dereference): กระโดดตามพอยน์เตอร์ไปอ่าน/เขียนค่าที่ปลายทาง
    cout << "ค่าที่ ptr ชี้ไป (*ptr): " << *ptr << "\\n"; // 42
    
    // เปลี่ยนแปลงค่า num ผ่าน pointer โดยตรง
    *ptr = 99;
    cout << "ค่า num หลังเปลี่ยนผ่าน pointer: " << num << "\\n"; // 99
    return 0;
}`,
        },
        { t: "h2", c: "Pointer Arithmetic (คณิตศาสตร์ของตัวชี้)" },
        {
          t: "p",
          c: "เมื่อเราสั่ง `ptr + 1` ใน C++ คอมพิวเตอร์ไม่ได้บวกตัวเลขที่อยู่ขึ้น 1 Byte ดื้อๆ แต่จะ **บวกขนาดของชนิดข้อมูล (sizeof(Type))** ไปข้างหน้าอย่างแม่นยำ:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Pointer กับ Array Traversal",
          c: `int arr[3] = {10, 20, 30};
int* p = arr; // ชื่ออาร์เรย์ arr จะถูกแปลงเป็น Pointer ชี้ไปที่สมาชิกตัวแรก arr[0]

cout << *p << "\\n";       // 10
cout << *(p + 1) << "\\n"; // 20 (บวกกระโดดไป 4 Bytes เท่ากับ sizeof(int))
cout << *(p + 2) << "\\n"; // 30`,
        },
        { t: "h2", c: "Python มองโลกอย่างไร: ทุกอย่างคือ Pointer ที่ซ่อนรูป (PyObject*)" },
        {
          t: "p",
          c: "ใน Python เราไม่มีตัวดำเนินการ `*` หรือ `&` ให้เห็น แต่ในซอร์สโค้ด CPython **ตัวแปรทุกตัวคือ Pointer แบบ `PyObject*`** ทั้งสิ้น! เราสามารถตรวจดูหมายเลขที่อยู่ของ Object ใน Python ได้ผ่านฟังก์ชัน `id()`:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: ตรวจสอบ Memory Reference ด้วย id() และตัวดำเนินการ is",
          c: `a = [1, 2, 3]
b = a # b ไม่ได้ก๊อปปี้ข้อมูล แต่ชี้ไปยังก้อน Object เดียวกันใน Heap!

print("id(a):", hex(id(a)))
print("id(b):", hex(id(b))) # หมายเลขเดียวกันเป๊ะ!
print("a is b:", a is b)   # True (ตรวจสอบว่า Pointer ชี้ไปยังที่อยู่เดียวกันหรือไม่)

b.append(999)
print("a after b modified:", a) # [1, 2, 3, 999] (ได้รับผลกระทบด้วย!)`,
        },
        {
          t: "callout",
          title: "⚠️ 3 คำเตือนระดับวิกฤตเรื่อง Pointer",
          c: "1. **Null Pointer Dereference**: การพยายามอ่าน `*ptr` เมื่อ `ptr == nullptr` จะทำให้โปรแกรมหยุดทำงานทันที (Segmentation Fault)\n2. **Dangling Pointer**: ตัวชี้ที่ชี้ไปยังพื้นที่หน่วยความจำที่ถูก `delete` ไปแล้ว\n3. **Memory Leak**: การสั่งจองพื้นที่ด้วย `new` แต่ลืมเรียก `delete` ทำให้ RAM เครื่องค่อยๆ เต็ม",
        },
      ],
      en: [],
    },
  },

  "dsa-ch4-vector": {
    slug: "dsa-ch4-vector",
    title: {
      th: "Dynamic Array & Vector: การขยายขนาด & Amortized O(1)",
      en: "Dynamic Arrays & Vectors: Geometric Resizing & Amortized Analysis",
    },
    lead: {
      th: "ผ่าโครงสร้างภายในของ std::vector ใน C++ และ list ใน Python: ความแตกต่างระหว่าง Size กับ Capacity, กลยุทธ์การขยายขนาด 2 เท่า และการพิสูจน์ Amortized O(1)",
      en: "Internal mechanics of dynamic arrays: size vs capacity, geometric doubling strategy, and formal amortized analysis.",
    },
    group: "บทที่ 4: หน่วยความจำ, พอยน์เตอร์, เวกเตอร์ & OOP",
    blocks: {
      th: [
        { t: "h2", c: "ข้อจำกัดของ Fixed Array ดั้งเดิม" },
        {
          t: "p",
          c: "อาร์เรย์แบบดั้งเดิมใน C++ (`int arr[100];`) จำเป็นต้องระบุขนาดตายตัวตั้งแต่ตอนเขียนโปรแกรม หากข้อมูลมีเกิน 100 ตัวจะเกิด Array Index Out of Bounds แต่ถ้าจองไว้ 1,000,000 ตัวแล้วใช้แค่ 10 ตัว จะเป็นการสูญเสียหน่วยความจำมหาศาล",
        },
        { t: "h2", c: "โครงสร้างภายในของ Dynamic Array (Vector)" },
        {
          t: "p",
          c: "เพื่อแก้ปัญหานี้ วิศวกรจึงออกแบบ **Dynamic Array (`std::vector` ใน C++ / `list` ใน Python)** ซึ่งภายในประกอบด้วย 3 ตัวแปรหลักบน Stack:",
        },
        {
          t: "ul",
          c: [
            "**Pointer (`T* data`)**: ตัวชี้ไปยังบล็อกอาร์เรย์จริงบน Heap Memory",
            "**Size (`size_t size`)**: จำนวนสมาชิกที่มีอยู่ในปัจจุบัน",
            "**Capacity (`size_t capacity`)**: ความจุสูงสุดที่พื้นที่ Heap ในปัจจุบันรองรับได้ก่อนที่จะต้องขยายขนาด",
          ],
        },
        {
          t: "viz",
          id: "dsa-dynamic-array-memory",
        },
        { t: "h2", c: "กลยุทธ์การขยายขนาด 2 เท่า (Geometric Doubling)" },
        {
          t: "p",
          c: "เมื่อใดก็ตามที่มีการเรียก `push_back()` หรือ `.append()` ขณะที่ **Size == Capacity** (พื้นที่เต็ม):",
        },
        {
          t: "ol",
          c: [
            "จองพื้นที่ใหม่บน Heap ขนาด **2 เท่าของเดิม (Capacity * 2)**",
            "คัดลอกข้อมูลทั้งหมดจากอาร์เรย์เดิมไปยังอาร์เรย์ใหม่ ($O(n)$ สเต็ป)",
            "ล้างหน่วยความจำเดิมทิ้ง (`delete[] old_data`)",
            "เปลี่ยนตัวชี้ `data` ให้ชี้ไปที่อาร์เรย์ใหม่ และใส่ข้อมูลตัวใหม่ลงไป",
          ],
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: สังเกตการเติบโตของ Capacity ใน std::vector",
          c: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v;
    
    for (int i = 1; i <= 10; i++) {
        v.push_back(i);
        cout << "Item: " << i 
             << " | Size: " << v.size() 
             << " | Capacity: " << v.capacity() << "\\n";
    }
    return 0;
}`,
        },
        {
          t: "callout",
          title: "💡 ทำไมต้องขยายทีละ 2 เท่า ไม่ขยายทีละ 1 ช่อง?",
          c: "หากขยายทีละ 1 ช่อง ทุกครั้งที่เพิ่มข้อมูลจะต้องทำการคัดลอกข้อมูลเดิม $N$ ครั้งเสมอ จะทำให้การ Append ข้อมูล $N$ ครั้ง ใช้เวลารวม $O(n^2)$!\n\nแต่การขยายขนาดทีละ **2 เท่า (Geometric Progression)** จะทำให้ต้นทุนการคัดลอกถัวเฉลี่ยต่อสมาชิกแต่ละตัวเหลือเพียง **Amortized O(1)** อย่างแท้จริง!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch4-struct": {
    slug: "dsa-ch4-struct",
    title: {
      th: "Struct & Class: การจัดวางข้อมูลใน RAM (Alignment & Padding)",
      en: "Structs & Memory Layout: Data Alignment & Structure Padding",
    },
    lead: {
      th: "เจาะลึกการจัดวาง Struct ลงบน Memory Bus, ปรากฏการณ์ Data Alignment และ Structure Padding ที่ทำให้ขนาดของ Struct ใหญ่กว่าผลรวมข้อมูล",
      en: "Examine struct memory layout, hardware bus word boundaries, and compiler padding mechanics.",
    },
    group: "บทที่ 4: หน่วยความจำ, พอยน์เตอร์, เวกเตอร์ & OOP",
    blocks: {
      th: [
        { t: "h2", c: "Struct คืออะไร?" },
        {
          t: "p",
          c: "**Struct** คือเครื่องมือในการรวมกลุ่มตัวแปรต่างชนิดกันเข้าด้วยกันให้เป็นหน่วยเดียว เปรียบเสมือนการสร้าง 'ชนิดข้อมูลใหม่' ขึ้นมาใช้งานในโปรแกรม เช่น การเก็บข้อมูลพิกัด `Point(x, y)` หรือข้อมูลนักศึกษา",
        },
        { t: "h2", c: "ความลึกลับของ Memory Padding & Data Alignment" },
        {
          t: "p",
          c: "ลองดู Struct ตัวอย่างนี้ใน C++ แล้วเดาว่า `sizeof(BadStruct)` มีขนาดกี่ไบต์:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: ปริศนาขนาดของ Struct",
          c: `struct BadStruct {
    char a;   // 1 Byte
    int b;    // 4 Bytes
    char c;   // 1 Byte
};

// หลายคนคิดว่า: 1 + 4 + 1 = 6 Bytes?
// แต่ในความเป็นจริง: sizeof(BadStruct) = 12 Bytes!`,
        },
        {
          t: "p",
          c: "ทำไมถึงเป็น 12 Bytes? คำตอบคือ **ฮาร์ดแวร์ CPU อ่านข้อมูลใน RAM ทีละ Word (ครั้งละ 4 หรือ 8 Bytes)** หากตัวแปร `int` (ขนาด 4 Bytes) วางอยู่ที่ตำแหน่งที่ไม่หารด้วย 4 ลงตัว CPU จะต้องสั่งอ่าน RAM ถึง 2 ครั้งแล้วนำมาประกอบกัน (Unaligned Memory Access) ซึ่งช้ามาก!\n\nCompiler จึงแทรก **Padding Bytes (ไบต์เปล่า)** เข้าไปเพื่อจัดระเบียบข้อมูลให้ตรงขอบเขต Word เสมอ:",
        },
        {
          t: "viz",
          id: "dsa-memory-alignment",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: การจัดเรียงใหม่เพื่อประหยัดหน่วยความจำ (GoodStruct)",
          c: `// เพียงแค่เรียงลำดับตัวแปรจากขนาดใหญ่ไปเล็ก หรือรวมตัวเล็กไว้ด้วยกัน:
struct GoodStruct {
    int b;    // 4 Bytes
    char a;   // 1 Byte
    char c;   // 1 Byte
    // Padding แค่ 2 Bytes เพื่อให้ครบขอบเขต 4 Bytes
};

// ขนาดจะลดลงเหลือเพียง 8 Bytes ทันที! (ประหยัดหน่วยความจำไปถึง 33%)`,
        },
        {
          t: "code",
          lang: "python",
          label: "Python: การใช้ dataclass เพื่อความสะอาดของโค้ด",
          c: `from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

p1 = Point(10, 20)
print(p1.x, p1.y) # เข้าถึงข้อมูลได้อย่างชัดเจนและพิมพ์ง่าย`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch4-oop": {
    slug: "dsa-ch4-oop",
    title: {
      th: "OOP สำหรับ Data Structures: สร้าง Node & Encapsulation",
      en: "OOP for Data Structures: Building Clean Nodes & Containers",
    },
    lead: {
      th: "ออกแบบคลาส Node มาตรฐานสำหรับสร้าง Linked List, Tree, และ Graph พร้อมหลักการ Encapsulation และการจัดการ Lifecycle ของ Object",
      en: "Design standard Node classes for linked lists, trees, and graphs with clean encapsulation principles.",
    },
    group: "บทที่ 4: หน่วยความจำ, พอยน์เตอร์, เวกเตอร์ & OOP",
    blocks: {
      th: [
        { t: "h2", c: "คลาส Node: ก้อนอิฐก้อนแรกของทุก Data Structure" },
        {
          t: "p",
          c: "ไม่ว่าจะเป็น Linked List, Binary Tree หรือ Graph โครงสร้างข้อมูลขั้นสูงทั้งหมดสร้างขึ้นจากองค์ประกอบย่อยชิ้นเดียวกัน นั่นคือ **โหนด (Node)** ซึ่งมีหน้าที่เก็บ 2 สิ่งคือ:\n1. ข้อมูลที่เราต้องการเก็บ (`data` / `val`)\n2. ตัวชี้หรือการอ้างอิงไปยังโหนดอื่น (`next`, `prev`, `left`, `right`)",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: คลาส Node สำหรับ Linked List สมบูรณ์แบบ",
          c: `class ListNode {
public:
    int val;
    ListNode* next;

    // Constructor พร้อม Default Value และ Initializer List
    ListNode(int val = 0, ListNode* next = nullptr) : val(val), next(next) {}
};

// การเชื่อมต่อ Node สองตัว
ListNode* second = new ListNode(20);
ListNode* head = new ListNode(10, second);`,
        },
        {
          t: "code",
          lang: "python",
          label: "Python: คลาส Node ฉบับ LeetCode Standard",
          c: `class ListNode:
    def __init__(self, val: int = 0, next: 'ListNode | None' = None):
        self.val = val
        self.next = next

    def __repr__(self) -> str:
        return f"Node({self.val})"

# การเชื่อมต่อ Node
second = ListNode(20)
head = ListNode(10, second)
print(f"{head.val} -> {head.next.val} -> None")`,
        },
        { t: "h2", c: "การแยกบทบาท: Node Class vs Container Class" },
        {
          t: "p",
          c: "ในการออกแบบซอฟต์แวร์ระดับมืออาชีพ เราจะไม่ให้ผู้ใช้งานภายนอกมานั่งต่อสาย Pointer ทีละเส้นด้วยตนเอง แต่เราจะสร้าง **Container Class** (เช่น `LinkedList`, `Stack`, `Queue`) เพื่อครอบ (Encapsulate) และจัดเตรียมฟังก์ชันที่ปลอดภัย เช่น `.append()`, `.pop()` หรือ `.find()`",
        },
        {
          t: "callout",
          title: "🚀 เข้าสู่บทที่ 5: โครงสร้างข้อมูลเชิงเส้น",
          c: "บัดนี้คุณเข้าใจสถาปัตยกรรมหน่วยความจำ Pointer, Dynamic Array และการสร้าง Node แล้ว ในบทที่ 5 เราจะนำ Node เหล่านี้มาเชื่อมต่อกันเป็น **Linked List, Stack และ Queue** พร้อมทั้งลงมือสร้างระบบ Music Playlist Manager ตามโจทย์จริง!",
        },
      ],
      en: [],
    },
  },
};
