import type { Page } from "@/lib/types";

export const chapter01Pages: Record<string, Page> = {
  "dsa-ch1-intro": {
    slug: "dsa-ch1-intro",
    title: {
      th: "บทนำ: การเขียนโปรแกรมและระบบคอมพิวเตอร์ (Intro to Programming)",
      en: "Introduction: Programming and Computer Systems",
    },
    lead: {
      th: "ทำความเข้าใจว่าการเขียนโปรแกรมคืออะไร ทำไมเราถึงต้องสร้าง Algorithm และกลไกเบื้องหลังการรันโปรแกรม",
      en: "Understand what programming is, why algorithms matter, and the internal mechanisms of how code executes.",
    },
    group: "บทที่ 1: พื้นฐานการเขียนโปรแกรม",
    blocks: {
      th: [
        {
          t: "p",
          c: "การเขียนโปรแกรม (**Programming**) คือกระบวนการออกแบบและสร้างชุดคำสั่งให้คอมพิวเตอร์ทำงานตามวัตถุประสงค์ที่กำหนด ประกอบด้วยการวิเคราะห์ปัญหา, การสร้างและเลือกใช้ **Algorithm**, การประเมินความแม่นยำและการใช้ทรัพยากร (Time & Space), และการนำอัลกอริทึมไปแปลงเป็นโค้ดในภาษาโปรแกรม",
        },
        { t: "h2", c: "วัตถุประสงค์หลักของการเขียนโปรแกรม" },
        {
          t: "ul",
          c: [
            "**การแก้ปัญหา (Problem Solving)**: สร้าง Algorithm และ Logic เพื่อประมวลผลข้อมูลที่ซับซ้อนให้ได้ผลลัพธ์ที่ถูกต้อง",
            "**ระบบอัตโนมัติ (Automation)**: ลดการทำงานซ้ำซากของมนุษย์ เช่น การค้นหาข้อมูลล้านรายการในเสี้ยววินาที",
            "**การพัฒนาซอฟต์แวร์ (Software Development)**: สร้าง Web, Mobile, Desktop และ Cloud Application",
            "**วิทยาศาสตร์ข้อมูล & AI**: การประมวลผล Big Data, Machine Learning และ Deep Learning",
          ],
        },
        {
          t: "callout",
          title: "เกร็ดความรู้: HTML & CSS ไม่ใช่ Programming Language",
          c: "HTML และ CSS เป็น Markup และ Style Sheet Language ที่ใช้สำหรับจัดวางโครงสร้างและรูปแบบหน้าเว็บเพจ ไม่สามารถใช้เขียน Logic, เงื่อนไขที่ซับซ้อน หรือคำนวณเชิงอัลกอริทึมได้ ภาษาโปรแกรมแท้จริง เช่น Python, C++, Go, Java จะต้องมีความสามารถ Turing Complete สามารถสร้างตัวแปร ควบคุมเงื่อนไข และวนลูปได้",
        },
        { t: "h2", c: "Compiler vs Interpreter และ Machine Code" },
        {
          t: "p",
          c: "คอมพิวเตอร์รับรู้คำสั่งเป็นเลขฐานสอง (0 และ 1) หรือเรียกว่า **Machine Code** ภาษาโปรแกรมระดับสูงแบ่งออกเป็น 2 ตระกูลหลักตามวิธีแปลงโค้ด:",
        },
        {
          t: "ul",
          c: [
            "**Compiled Language (เช่น C++, Rust, Go)**: มี Compiler ทำหน้าที่แปลงทั้งโปรแกรมเป็นภาษาเครื่องล่วงหน้า เกิดเป็นไฟล์ Executable (.exe หรือ a.out) เมื่อรันจะทำงานได้เร็วระดับฮาร์ดแวร์",
            "**Interpreted / Bytecode Language (เช่น Python, JavaScript)**: โค้ดจะถูกแปลเป็น Bytecode และประมวลผลผ่าน Virtual Machine (CPython) ทีละคำสั่ง ทำให้เขียนง่าย ทดสอบได้ทันทีใน REPL เหมาะแก่การสัมภาษณ์งาน",
          ],
        },
        {
          t: "table",
          head: ["ขั้นตอนใน C++ (Compiled)", "ขั้นตอนใน Python (Interpreted / VM)"],
          rows: [
            ["1. Source Code (`.cpp`)", "1. Source Code (`.py`)"],
            ["2. Preprocessing (`#include`)", "2. Parsing & Compilation to Bytecode (`.pyc`)"],
            ["3. Compilation (`g++` -> Assembly)", "3. CPython Virtual Machine (PVM) Execution"],
            ["4. Assembly -> Object Code (`.o`)", "4. รันทีละคำสั่ง (Dynamic Evaluation)"],
            ["5. Linking -> Native Executable (`.exe`)", "ไม่ต้อง Link ได้ผลลัพธ์ทันที"],
          ],
        },
        { t: "h2", c: "ทำไมต้องเรียนทั้งสองภาษาเพื่อเตรียมสัมภาษณ์งาน" },
        {
          t: "p",
          c: "การรู้ **Python** ช่วยให้คุณแก้โจทย์ในห้องสัมภาษณ์ได้เร็วกว่าคนอื่น 2-3 เท่า เพราะไม่ต้องกังวลเรื่องหน่วยความจำรั่วหรือ Syntax ยาวเหยียด แต่การเข้าใจ **C++** ช่วยให้คุณตอบคำถามเชิงลึกของผู้สัมภาษณ์ได้ เช่น 'Array ในหน่วยความจำถูกจัดเรียงอย่างไร?' หรือ 'ทำไมการต่อ String ใน Loop ถึงทำให้เกิด O(n²)?'",
        },
      ],
      en: [],
    },
  },

  "dsa-ch1-basic-syntax": {
    slug: "dsa-ch1-basic-syntax",
    title: {
      th: "Basic Syntax: ไวยากรณ์พื้นฐาน C++ & Python",
      en: "Basic Syntax: Fundamentals in C++ & Python",
    },
    lead: {
      th: "เปรียบเทียบไวยากรณ์เริ่มต้น โครงสร้างฟังก์ชันหลัก การรับค่า Input และแสดงผล Output ทางหน้าจอ",
      en: "Compare entry-point syntax, main function layout, and I/O operations between C++ and Python.",
    },
    group: "บทที่ 1: พื้นฐานการเขียนโปรแกรม",
    blocks: {
      th: [
        { t: "h2", c: "โปรแกรมแรก: Hello World!" },
        {
          t: "p",
          c: "มาดูโค้ดที่เรียบง่ายที่สุดในการสั่งให้คอมพิวเตอร์พิมพ์ข้อความออกทางหน้าจอ เปรียบเทียบระหว่าง Python และ C++:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python (main.py) — 1 บรรทัด",
          c: `print("Hello World!")`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++ (main.cpp) — โครงสร้างเต็ม",
          c: `#include <iostream>

int main() {
    std::cout << "Hello World!" << std::endl;
    return 0; // คืนค่า 0 บ่งบอกระบบปฏิบัติการว่าทำงานเสร็จสมบูรณ์
}`,
        },
        {
          t: "p",
          c: "ใน C++ คำสั่ง `#include <iostream>` เป็นการดึงโมดูล Standard Input/Output Stream เข้ามา และทุกโปรแกรมจำเป็นต้องมีจุดเริ่มต้นที่ฟังก์ชัน `main()` เสมอ ขณะที่ Python เป็นภาษาสคริปต์ สามารถสั่งรัน `print()` ได้ทันทีตั้งแต่บรรทัดแรก",
        },
        { t: "h2", c: "การรับข้อมูลจากผู้ใช้ (Input / Output)" },
        {
          t: "p",
          c: "การแก้โจทย์อัลกอริทึมมักเริ่มต้นด้วยการอ่านค่า Input จากผู้ใช้เข้ามาประมวลผล:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: input() และ print(f-string)",
          c: `# input() รับค่ามาเป็น string เสมอ ต้องแปลงเป็น int หากต้องการคำนวณ
num = int(input("กรุณาใส่ตัวเลข: "))
print(f"ค่าที่รับมาคือ: {num}")
print(f"สองเท่าของตัวเลขคือ: {num * 2}")`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: cin และ cout",
          c: `#include <iostream>
using namespace std;

int main() {
    int num;
    cout << "กรุณาใส่ตัวเลข: ";
    cin >> num; // cin จะแปลงชนิดข้อมูลตามตัวแปร num (int) อัตโนมัติ

    cout << "ค่าที่รับมาคือ: " << num << "\\n";
    cout << "สองเท่าของตัวเลขคือ: " << num * 2 << "\\n";
    return 0;
}`,
        },
        {
          t: "callout",
          title: "💡 Fast I/O Tip สำหรับโจทย์แข่งขันและสัมภาษณ์",
          c: "ในโจทย์ที่มี Input ขนาดใหญ่ระดับ 100,000 บรรทัด ใน C++ ควรเติม `cin.tie(NULL); ios_base::sync_with_stdio(false);` ส่วนใน Python ควรใช้ `import sys; input = sys.stdin.readline` เพื่อป้องกัน Time Limit Exceeded (TLE) จากการอ่าน I/O ช้า",
        },
      ],
      en: [],
    },
  },

  "dsa-ch1-basic-concept": {
    slug: "dsa-ch1-basic-concept",
    title: {
      th: "Basic Concept: ตัวแปร ชนิดข้อมูล และการคำนวณ",
      en: "Basic Concept: Variables, Data Types & Operators",
    },
    lead: {
      th: "เจาะลึกชนิดข้อมูลพื้นฐาน Static Typing vs Dynamic Typing ตัวดำเนินการ และการแปลงชนิดข้อมูล",
      en: "Deep dive into primitive data types, static vs dynamic typing, type casting, and arithmetic operations.",
    },
    group: "บทที่ 1: พื้นฐานการเขียนโปรแกรม",
    blocks: {
      th: [
        { t: "h2", c: "ชนิดข้อมูลพื้นฐาน (Primitive Data Types)" },
        {
          t: "p",
          c: "ตัวแปรคือชื่อที่ใช้อ้างอิงถึงช่องเก็บข้อมูลในหน่วยความจำ RAM ภาษา C++ เป็น **Statically Typed** (ต้องระบุชนิดข้อมูลล่วงหน้าและเปลี่ยนไม่ได้) ขณะที่ Python เป็น **Dynamically Typed** (ชนิดข้อมูลผูกกับ Object ไม่ใช่ชื่อตัวแปร):",
        },
        {
          t: "table",
          head: ["ชนิดข้อมูล", "C++ Type", "Python Type", "ขนาด / รายละเอียด"],
          rows: [
            ["จำนวนเต็ม", "`int` (4 bytes)", "`int`", "Python รองรับจำนวนเต็มไม่จำกัดบิต (Arbitrary precision)"],
            ["จำนวนเต็มขนาดใหญ่", "`long long` (8 bytes)", "`int`", "ใน C++ ต้องใช้ long long เมื่อเกิน 2×10⁹"],
            ["ทศนิยม", "`float` / `double`", "`float`", "ทศนิยม 64-bit IEEE 754"],
            ["ตัวอักษรเดี่ยว", "`char` (1 byte)", "`str`", "ใน C++ เก็บตาม ASCII code (1 byte)"],
            ["ข้อความ", "`std::string`", "`str`", "สตริงความยาวแปรผัน"],
            ["ค่าความจริง", "`bool` (true/false)", "`bool` (True/False)", "1 byte (จริง / เท็จ)"],
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "Python: ตัวแปรและ Type Hinting สำหรับสัมภาษณ์งาน",
          c: `# Python รองรับ Type Annotations เพื่อช่วยให้อ่านโค้ดง่ายและชัดเจน
age: int = 25
price: float = 99.99
name: str = "Alice"
is_active: bool = True

# ตรวจสอบชนิดข้อมูลด้วย type()
print(type(age))   # <class 'int'>
print(type(name))  # <class 'str'>`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: ตัวแปรและการกำหนด Type ชัดเจน",
          c: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int age = 25;
    double price = 99.99;
    string name = "Alice";
    bool isActive = true;

    cout << name << " is " << age << " years old.\\n";
    return 0;
}`,
        },
        { t: "h2", c: "ตัวดำเนินการทางคณิตศาสตร์ (Arithmetic Operators)" },
        {
          t: "p",
          c: "ข้อควรระวังสำคัญที่สุดในการหาร: ใน C++ การหารระหว่าง `int / int` จะปัดเศษทิ้งเสมอ (`5 / 2 == 2`) แต่ใน Python เครื่องหมาย `/` จะให้ผลลัพธ์เป็น float (`5 / 2 == 2.5`) หากต้องการหารปัดเศษใน Python ต้องใช้เครื่องหมาย `//` (`5 // 2 == 2`):",
        },
        {
          t: "table",
          head: ["การคำนวณ", "C++", "Python", "ตัวอย่าง (a=7, b=2)"],
          rows: [
            ["การบวก", "`a + b`", "`a + b`", "9"],
            ["การลบ", "`a - b`", "`a - b`", "5"],
            ["การคูณ", "`a * b`", "`a * b`", "14"],
            ["การหารแท้", "`double(a) / b`", "`a / b`", "3.5"],
            ["การหารปัดเศษลง (Floor)", "`a / b`", "`a // b`", "3"],
            ["เศษจากการหาร (Modulo)", "`a % b`", "`a % b`", "1"],
            ["การยกกำลัง", "`pow(a, b)`", "`a ** b`", "49"],
          ],
        },
        {
          t: "callout",
          title: "⚠️ ระวัง Modulo กับจำนวนติดลบในการสัมภาษณ์งาน!",
          c: "ใน C++: `-7 % 3 == -1` (เครื่องหมายตามตัวตั้ง) แต่ใน Python: `-7 % 3 == 2` (ผลลัพธ์จะเป็นบวกเสมอตามหลักคณิตศาสตร์แบบ Euclidean) เรื่องนี้พบบ่อยมากในการแก้โจทย์ Circular Array หรือ Hashing!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch1-control-structure": {
    slug: "dsa-ch1-control-structure",
    title: {
      th: "Control Structure: เงื่อนไขและการวนซ้ำ",
      en: "Control Structure: Conditionals and Loops",
    },
    lead: {
      th: "การตัดสินใจแบบมีเงื่อนไข if/else และการทำซ้ำ for/while loop กลไกสำคัญของทุกลำดับขั้นตอน Algorithm",
      en: "Master conditional logic and loop iterations—the backbone of algorithmic problem solving.",
    },
    group: "บทที่ 1: พื้นฐานการเขียนโปรแกรม",
    blocks: {
      th: [
        { t: "h2", c: "การตัดสินใจแบบมีเงื่อนไข (Conditionals)" },
        {
          t: "p",
          c: "เงื่อนไขใช้ตรวจสอบสถานะของข้อมูลก่อนดำเนินคำสั่งถัดไป เช่น การเช็ค Base Case ของโจทย์ หรือการเปรียบเทียบค่า:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: if, elif, else",
          c: `score = 85

if score >= 80:
    grade = "A"
elif score >= 70:
    grade = "B"
elif score >= 60:
    grade = "C"
else:
    grade = "F"

print(f"เกรดที่ได้: {grade}")`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: if, else if, else",
          c: `#include <iostream>
using namespace std;

int main() {
    int score = 85;
    string grade;

    if (score >= 80) {
        grade = "A";
    } else if (score >= 70) {
        grade = "B";
    } else if (score >= 60) {
        grade = "C";
    } else {
        grade = "F";
    }

    cout << "เกรดที่ได้: " << grade << "\\n";
    return 0;
}`,
        },
        { t: "h2", c: "การวนซ้ำ (Loops: for และ while)" },
        {
          t: "p",
          c: "Loop ใช้สำหรับการท่องผ่านข้อมูล (Array Traversal) หรือการคำนวณซ้ำจนกว่าจะบรรลุเงื่อนไข:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: for ... in range และ while",
          c: `# 1. for loop วนจาก 0 ถึง 4 (5 รอบ)
for i in range(5):
    print(f"รอบที่ {i}")

# 2. for loop ท่องสมาชิกใน list โดยตรง
items = ["apple", "banana", "cherry"]
for item in items:
    print(item)

# 3. while loop: ทำงานตราบใดที่เงื่อนไขเป็นจริง
n = 16
while n > 1:
    print(f"n = {n}")
    n //= 2  # ลดค่าลงทีละครึ่ง (ลักษณะของ O(log n))`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: for, range-based for และ while",
          c: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 1. for loop แบบดั้งเดิม (index-based)
    for (int i = 0; i < 5; i++) {
        cout << "รอบที่ " << i << "\\n";
    }

    // 2. range-based for loop
    vector<string> items = {"apple", "banana", "cherry"};
    for (const string& item : items) {
        cout << item << "\\n";
    }

    // 3. while loop
    int n = 16;
    while (n > 1) {
        cout << "n = " << n << "\\n";
        n /= 2;
    }
    return 0;
}`,
        },
        {
          t: "callout",
          title: "🎯 Interview Insight: Loop กับ Big-O",
          c: "Loop เดี่ยวที่วิ่ง N รอบคือ O(N), Nested Loop สองชั้นซ้อนกันคือ O(N²), และ Loop ที่ลดค่าลงครึ่งหนึ่งในแต่ละรอบ (`n //= 2`) คือ O(log N) นี่คือสูตรลัดที่ใช้ประเมิน Time Complexity ทุกครั้งในห้องสอบสัมภาษณ์!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch1-functions": {
    slug: "dsa-ch1-functions",
    title: {
      th: "Functions: ฟังก์ชันและการแยกส่วนโค้ด",
      en: "Functions: Modular Code and Scope",
    },
    lead: {
      th: "การสร้างฟังก์ชันที่นำกลับมาใช้ใหม่ได้ การส่งผ่านค่า (Pass by Value vs Reference) และ Scope ตัวแปร",
      en: "Reusable functions, parameter passing mechanics (value vs reference), and variable scopes.",
    },
    group: "บทที่ 1: พื้นฐานการเขียนโปรแกรม",
    blocks: {
      th: [
        { t: "h2", c: "การประกาศและเรียกใช้ฟังก์ชัน" },
        {
          t: "p",
          c: "ฟังก์ชันคือบล็อกของโค้ดที่มีชื่อเรียก รับพารามิเตอร์ ทำงานตามลำดับ และส่งคืนผลลัพธ์ (Return value) ในการสอบสัมภาษณ์งาน ฟังก์ชันคือสิ่งที่คุณต้องเขียนส่งในแพลตฟอร์ม เช่น LeetCode:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: ฟังก์ชันหาค่ามากสุดพร้อม Type Hints",
          c: `def get_maximum(a: int, b: int) -> int:
    """ส่งคืนค่าที่มากกว่าระหว่าง a และ b"""
    if a > b:
        return a
    return b

result = get_maximum(15, 27)
print(f"ค่าสูงสุดคือ: {result}")  # 27`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: ฟังก์ชันพร้อมระบุ Return Type",
          c: `#include <iostream>
using namespace std;

int getMaximum(int a, int b) {
    if (a > b) return a;
    return b;
}

int main() {
    int result = getMaximum(15, 27);
    cout << "ค่าสูงสุดคือ: " << result << "\\n";
    return 0;
}`,
        },
        { t: "h2", c: "Pass by Value vs Pass by Reference" },
        {
          t: "p",
          c: "ความเข้าใจเรื่องการส่งผ่านตัวแปรเข้าสู่ฟังก์ชันเป็นหัวใจสำคัญมากเมื่อเริ่มทำโจทย์ Data Structures:",
        },
        {
          t: "ul",
          c: [
            "**C++ Pass by Value**: ฟังก์ชันจะคัดลอกค่าใหม่ (`int a`) แก้ไขข้างในจะไม่มีผลต่อตัวแปรข้างนอก",
            "**C++ Pass by Reference (`int& a`)**: ฟังก์ชันใช้อ้างอิงตัวแปรเดิม การแก้ไขข้างในจะเปลี่ยนค่าตัวแปรภายนอกทันที และไม่เสียเวลาคัดลอกข้อมูล",
            "**Python Pass by Object Reference**: ตัวแปรประเภท **Mutable** (เช่น `list`, `dict`, `set`) หากส่งเข้าฟังก์ชันแล้วสั่ง `.append()` หรือแก้ไขภายใน จะมีผลต่อตัวแปรต้นทางทันที! แต่ตัวแปรประเภท **Immutable** (เช่น `int`, `str`, `tuple`) จะไม่ถูกเปลี่ยนแปลง",
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Mutable vs Immutable ในฟังก์ชัน",
          c: `def modify_data(number: int, items: list[int]) -> None:
    number += 10       # int เป็น immutable ไม่กระทบภายนอก
    items.append(999)  # list เป็น mutable แก้ไขตัวแปรต้นทางทันที!

x = 5
my_list = [1, 2, 3]
modify_data(x, my_list)

print("x:", x)              # x: 5 (คงเดิม)
print("my_list:", my_list)  # my_list: [1, 2, 3, 999] (เปลี่ยนไป!)`,
        },
        {
          t: "callout",
          title: "⚠️ Bug ยอดฮิต: Default Argument ใน Python",
          c: "ห้ามเขียน `def solve(arr=[])` เป็นอันขาด เพราะ default list จะถูกสร้างเพียงครั้งเดียวและแชร์กันทุกครั้งที่เรียกฟังก์ชัน! ให้ใช้ `def solve(arr: list | None = None): if arr is None: arr = []` เสมอ เพื่อป้องกันข้อผิดพลาดในห้องสัมภาษณ์",
        },
      ],
      en: [],
    },
  },
};
