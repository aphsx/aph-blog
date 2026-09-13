import type { Page } from "@/lib/types";

export const chapter01Pages: Record<string, Page> = {
  "dsa-ch1-intro": {
    slug: "dsa-ch1-intro",
    title: {
      th: "โค้ด, ฮาร์ดแวร์ & การทำงานของคอมพิวเตอร์ (Computer Systems 101)",
      en: "Code, Hardware & Systems Architecture: How Software Runs",
    },
    lead: {
      th: "มองทะลุตัวอักษรบนหน้าจอสู่การทำงานจริงของ CPU, แผงวงจร RAM, ภาษาเครื่อง, และความแตกต่างระหว่าง Compiler กับ Interpreter",
      en: "Look beneath source code to understand CPUs, memory buses, machine code, and the fundamental dichotomy between compilers and interpreters.",
    },
    group: "บทที่ 1: พื้นฐานการเขียนโปรแกรมเชิงระบบ",
    blocks: {
      th: [
        {
          t: "p",
          c: "หลายคนเริ่มต้นเรียนการเขียนโปรแกรมด้วยการจำไวยากรณ์ (Syntax) เช่น การพิมพ์ `print()` หรือ `cout` แต่เมื่อต้องแก้ปัญหาที่ซับซ้อนในระดับวิศวกรรม มักเกิดคำถามว่า: *'ทำไมโค้ดที่เขียนถึงรันช้า?'* หรือ *'ทำไมโปรแกรมถึงค้างจนหน่วยความจำเต็ม?'* เพื่อตอบคำถามเหล่านี้ เราต้องเริ่มต้นมองคอมพิวเตอร์ในฐานะ **เครื่องจักรกลคำนวณ (Computing Machine)** ก่อน",
        },
        { t: "h2", c: "คอมพิวเตอร์มองเห็นโลกอย่างไร: จากไฟฟ้าสู่ Machine Code" },
        {
          t: "p",
          c: "หน่วยประมวลผลกลาง (**CPU**) ไม่เข้าใจภาษาอังกฤษ ไม่รู้จักภาษา Python หรือ C++ สิ่งเดียวที่ทรานซิสเตอร์พันล้านตัวใน CPU รับรู้คือ **ระดับแรงดันไฟฟ้า (Voltage)**: มีไฟ (1) หรือไม่มีไฟ (0) ซึ่งเราเรียกว่า **เลขฐานสอง (Binary / Machine Code)**",
        },
        {
          t: "code",
          lang: "text",
          label: "การเดินทางของโค้ด 3 บรรทัด สู่กระแสไฟฟ้าใน CPU",
          c: `Source Code (C++ / Python)
       │
       ▼  (ผ่าน Compiler หรือ Interpreter)
Assembly Language (คำสั่งมนุษย์อ่านได้ เช่น MOV, ADD, JMP)
       │
       ▼  (ผ่าน Assembler)
Machine Code (ชุดเลขฐานสอง: 01001000 10001001 11100101)
       │
       ▼
สัญญาณไฟฟ้ากระตุ้นทรานซิสเตอร์ในแกน CPU ให้ประมวลผลทางตรรกศาสตร์!`,
        },
        { t: "h2", c: "สองตระกูลภาษา: Compiled Language vs Interpreted / Bytecode" },
        {
          t: "p",
          c: "ภาษาโปรแกรมระดับสูงแบ่งออกเป็น 2 แนวคิดหลักในการแปลงโค้ดของมนุษย์ให้กลายเป็นคำสั่งที่ CPU ประมวลผลได้:",
        },
        {
          t: "table",
          head: ["คุณลักษณะ", "Compiled Language (เช่น C++, Rust, Go)", "Interpreted / Bytecode (เช่น Python, Ruby)"],
          rows: [
            [
              "กระบวนการแปลงโค้ด",
              "Compiler แปลงทั้งโปรแกรมรวดเดียวเป็นไฟล์ **Executable Binary (.exe / a.out)** ล่วงหน้า",
              "Interpreter (CPython) อ่านทีละบรรทัด แปลงเป็น **Bytecode (.pyc)** แล้วรันผ่าน Virtual Machine",
            ],
            [
              "ความเร็วในการทำงาน",
              "⚡ เร็วสูงสุดระดับ Native ฮาร์ดแวร์ CPU สั่งการหน่วยความจำโดยตรง",
              "🐢 ช้ากว่าประมาณ 10–50 เท่า เนื่องจากมีเลเยอร์ซอฟต์แวร์จำลอง (CPython PVM)",
            ],
            [
              "การตรวจสอบข้อผิดพลาด",
              "ตรวจจับ Type Error และไวยากรณ์ตั้งแต่ตอน Compile (Compile-Time)",
              "เจอบั๊กเมื่อคำสั่งนั้นถูกรันจริง ณ เวลาทำงาน (Runtime)",
            ],
            [
              "ความคล่องตัวในการพัฒนา",
              "ต้องรอ Build / Compile ทุกครั้งที่แก้โค้ด",
              "แก้แล้วรันได้ทันที มี REPL สำหรับทดสอบไอเดียอย่างรวดเร็ว",
            ],
          ],
        },
        {
          t: "callout",
          title: "💡 ทำไม Algorithm ถึงชนะพลังของฮาร์ดแวร์เสมอ?",
          c: "สมมติคุณมีโจทย์ค้นหาข้อมูลในลิสต์ขนาด 1,000,000 รายการ:\n- หากใช้ **Linear Search O(n)** บนภาษา C++ บน Supercomputer อาจใช้เวลา 0.005 วินาที\n- แต่หากใช้ **Binary Search O(log n)** บนภาษา Python บนมือถือรุ่นเก่า จะใช้เวลาเพียง 20 รอบคำนวณ (ไม่ถึง 0.000001 วินาที)!\n\nนี่คือเหตุผลว่าทำไม **Algorithm ที่ฉลาด จึงมีพลังเหนือกว่าภาษาและสเปกเครื่องคอมพิวเตอร์เสมอ**",
        },
      ],
      en: [],
    },
  },

  "dsa-ch1-basic-syntax": {
    slug: "dsa-ch1-basic-syntax",
    title: {
      th: "ไวยากรณ์พื้นฐาน C++ & Python (I/O, Main & Fast I/O)",
      en: "Basic Syntax: Entry Points, Namespaces & Fast I/O",
    },
    lead: {
      th: "วิเคราะห์โครงสร้างโปรแกรม จุดเริ่มต้นการทำงาน (Entry Point) ระบบ I/O และเทคนิค Fast I/O เพื่อไม่ให้โค้ดติด Time Limit Exceeded",
      en: "Master program structure, execution entry points, and essential Fast I/O patterns to prevent TLE verdicts in online judges.",
    },
    group: "บทที่ 1: พื้นฐานการเขียนโปรแกรมเชิงระบบ",
    blocks: {
      th: [
        { t: "h2", c: "เปรียบเทียบจุดเริ่มต้นของโปรแกรม (Entry Point)" },
        {
          t: "p",
          c: "ในทุกโปรแกรม ระบบปฏิบัติการ (Operating System) จำเป็นต้องรู้ว่า **'ควรเริ่มต้นรันคำสั่งแรกที่บรรทัดไหน'**:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: โครงสร้างมาตรฐาน (main.cpp)",
          c: `#include <iostream> // Header file สำหรับ Standard Input/Output Stream

// จุดเริ่มต้นของโปรแกรม C++ คือฟังก์ชัน main เสมอ
int main() {
    // std คือ namespace ป้องกันชื่อฟังก์ชันชนกัน
    // cout = Character Output, << คือ Stream Insertion Operator
    std::cout << "Hello, World!" << std::endl;
    
    // คืนค่า 0 บอกระบบปฏิบัติการว่าโปรแกรมทำงานเสร็จสมบูรณ์โดยไร้ข้อผิดพลาด
    return 0;
}`,
        },
        {
          t: "code",
          lang: "python",
          label: "Python: โครงสร้างมาตรฐาน (main.py)",
          c: `# Python ไม่มีข้อบังคับเรื่อง main แต่การเขียนแบบวิศวกรที่ดีควรใช้ Boilerplate นี้:
def main() -> None:
    print("Hello, World!")

# ตรวจสอบว่าไฟล์นี้ถูกรันโดยตรง ไม่ได้ถูก import มาจากโมดูลอื่น
if __name__ == "__main__":
    main()`,
        },
        { t: "h2", c: "การรับค่า Input และเทคนิค Fast I/O สำหรับการแก้โจทย์" },
        {
          t: "p",
          c: "ในการสอบสัมภาษณ์หรือการแข่งขัน Competitive Programming โจทย์มักให้ข้อมูล Input ขนาดใหญ่ เช่น ตัวเลข $10^6$ ตัว การใช้คำสั่ง I/O แบบปกติอาจทำให้โปรแกรมรันช้าจนติด **Time Limit Exceeded (TLE)** เพียงเพราะการอ่านข้อมูลจากคีย์บอร์ด!",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: ปลดล็อกความเร็ว Fast I/O",
          c: `#include <iostream>
using namespace std;

int main() {
    // 1. ปลดการประสานเวลา (Sync) ระหว่าง C standard streams (scanf/printf) กับ C++ (cin/cout)
    ios_base::sync_with_stdio(false);
    
    // 2. ปลดการผูก cin เข้ากับ cout ทำให้ไม่ต้อง Flush buffer ออกจอก่อนอ่านค่าถัดไป
    cin.tie(NULL);

    int n;
    cin >> n;
    
    // สำคัญ: หลีกเลี่ยง endl เพราะ endl จะสั่ง Flush buffer ตลอดเวลา ให้ใช้ '\\n' แทน!
    cout << "Input is: " << n << '\\n';
    return 0;
}`,
        },
        {
          t: "code",
          lang: "python",
          label: "Python: การอ่าน Input ความเร็วสูงด้วย sys.stdin.readline",
          c: `import sys

def solve():
    # sys.stdin.readline เร็วกว่า input() ดั้งเดิมประมาณ 4-5 เท่า!
    input_func = sys.stdin.readline
    
    # อ่านตัวเลขตัวเดียว
    n = int(input_func())
    
    # อ่านอาร์เรย์ตัวเลขที่คั่นด้วยช่องว่าง
    arr = list(map(int, input_func().split()))
    
    print(f"Total elements: {len(arr)}")

if __name__ == "__main__":
    solve()`,
        },
        {
          t: "callout",
          title: "🎯 สรุปเคล็ดลับในห้องสอบ",
          c: "- ใน C++: เติม `cin.tie(NULL); ios_base::sync_with_stdio(false);` และใช้ `\\n` แทน `endl` เสมอ\n- ใน Python: หากโจทย์มี Input เกิน $10^5$ บรรทัด ให้เปลี่ยนจาก `input()` เป็น `sys.stdin.readline` ทันที",
        },
      ],
      en: [],
    },
  },

  "dsa-ch1-basic-concept": {
    slug: "dsa-ch1-basic-concept",
    title: {
      th: "ตัวแปร, ชนิดข้อมูลระดับบิต & Type Casting",
      en: "Variables, Bit-Level Data Types & Type Casting",
    },
    lead: {
      th: "เจาะลึกโครงสร้างชนิดข้อมูลใน RAM, กับดัก 32-bit Integer Overflow, และความต่างระหว่าง Implicit vs Explicit Casting",
      en: "Deep dive into memory representations, 32-bit integer overflow traps, and explicit vs implicit casting mechanics.",
    },
    group: "บทที่ 1: พื้นฐานการเขียนโปรแกรมเชิงระบบ",
    blocks: {
      th: [
        { t: "h2", c: "ตัวแปร (Variable) คืออะไรในทางสถาปัตยกรรมคอมพิวเตอร์?" },
        {
          t: "p",
          c: "ตัวแปรไม่ใช่แค่ 'กล่องใส่ของ' ตามคำเปรียบเปรยทั่วไป แต่ตัวแปรคือ **ป้ายชื่อที่ติดอยู่กับบล็อกหน่วยความจำ (RAM Address) ที่มีขนาดแน่นอน** เช่น เมื่อเราประกาศ `int x = 42;` ใน C++ คอมพิวเตอร์จะ:",
        },
        {
          t: "ol",
          c: [
            "จองพื้นที่ใน RAM ขนาด **4 Bytes (32 bits)** ติดต่อกัน",
            "บันทึกรหัสฐานสองของเลข 42 ลงไป: `00000000 00000000 00000000 00101010`",
            "ผูกชื่อตัวแปร `x` เข้ากับหมายเลขที่อยู่ (Memory Address) นั้น เช่น `0x7ffee4b2`",
          ],
        },
        { t: "h2", c: "ตารางชนิดข้อมูลพื้นฐาน (Primitive Types) และขนาดในหน่วยความจำ" },
        {
          t: "table",
          head: ["ชนิดข้อมูล", "ขนาดใน C++ (Bytes)", "ช่วงค่าที่รับได้ (Range)", "พฤติกรรมใน Python"],
          rows: [
            ["`bool`", "1 Byte", "`true` (1) หรือ `false` (0)", "`True` หรือ `False` (เป็น Object ขนาด 28 Bytes)"],
            ["`char`", "1 Byte", "-128 ถึง 127 (ASCII Character)", "ไม่มี char มีแต่สตริงความยาว 1 (`str`)"],
            ["`int` (32-bit)", "4 Bytes", "-2,147,483,648 ถึง 2,147,483,647 (~ ±2 × 10⁹)", "ไม่จำกัดขนาด! ปรับขยายบิตอัตโนมัติ (Arbitrary Precision)"],
            ["`long long` (64-bit)", "8 Bytes", "-9 × 10¹⁸ ถึง 9 × 10¹⁸", "เหมือน `int` ของ Python"],
            ["`float` (Single)", "4 Bytes", "ทศนิยมละเอียด 7 หลัก (IEEE 754)", "ใน Python `float` คือ Double Precision 64-bit ทันที"],
            ["`double` (Double)", "8 Bytes", "ทศนิยมละเอียด 15–17 หลัก", "เทียบเท่า `float` ใน Python"],
          ],
        },
        {
          t: "callout",
          title: "⚠️ กับดักระดับมหากาฬ: 32-bit Integer Overflow",
          c: "ใน C++ หากตัวแปรชนิด `int` มีค่า $2,147,483,647$ แล้วคุณสั่ง `x + 1` ผลลัพธ์จะล้นวงรอบ (Overflow) กลายเป็นค่าติดลบ $-2,147,483,648$ ทันที!\n\nในการคำนวณโจทย์อัลกอริทึม (เช่น Two Pointers หาผลบวก, Binary Search คำนวณ `(left + right) / 2` หรือคูณเลข Factorial) **หากผลลัพธ์อาจเกิน $2 \\times 10^9$ ต้องใช้ `long long` ใน C++ เสมอ!**",
        },
        { t: "h2", c: "การแปลงชนิดข้อมูล: Implicit vs Explicit Type Casting" },
        {
          t: "p",
          c: "การแปลงชนิดข้อมูลเกิดขึ้นเมื่อเราต้องการเปลี่ยนข้อมูลจาก Type หนึ่งเป็นอีก Type หนึ่ง:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Type Casting แบบชัดเจน (Explicit Casting)",
          c: `int a = 7;
int b = 2;

// 1. กับดัก: Integer Division (ตัดเศษทิ้ง)
double wrongResult = a / b; // ผลลัพธ์คือ 3.0 (เพราะ 7 / 2 = 3 ก่อนแปลงเป็น double)

// 2. วิธีที่ถูกต้อง: แปลงตัวแปรตัวใดตัวหนึ่งเป็น double ก่อนหาร
double correctResult = static_cast<double>(a) / b; // 3.5

cout << "Correct: " << correctResult << "\\n";`,
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Type Casting และตัวดำเนินการหาร",
          c: `a = 7
b = 2

# ใน Python 3 เครื่องหมาย / จะคืนค่า float เสมอ (ไม่ตัดเศษ)
print(a / b)   # 3.5

# หากต้องการหารปัดเศษลง (Floor Division) ให้ใช้ //
print(a // b)  # 3

# แปลงเป็นสตริง หรือ ตัวเลข
s = str(123)       # "123"
num = int("456")   # 456`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch1-control-structure": {
    slug: "dsa-ch1-control-structure",
    title: {
      th: "เงื่อนไข & การวนซ้ำ (Branching, Loops & Invariants)",
      en: "Control Structures: Branch Prediction, Loops & Invariants",
    },
    lead: {
      th: "ทำความเข้าใจ Branch Prediction เบื้องหลัง if-else, ความแตกต่างของ Loop ชนิดต่างๆ และแนวคิด Loop Invariant สำหรับพิสูจน์ความถูกต้องของอัลกอริทึม",
      en: "Understand branch prediction hardware mechanics, loop structures, and loop invariant proofs for correctness.",
    },
    group: "บทที่ 1: พื้นฐานการเขียนโปรแกรมเชิงระบบ",
    blocks: {
      th: [
        { t: "h2", c: "เงื่อนไข (Conditionals) และฮาร์ดแวร์ Branch Prediction" },
        {
          t: "p",
          c: "เมื่อ CPU เจอคำสั่ง `if-else` มันจำเป็นต้องตัดสินใจว่าจะกระโดดไปยังคำสั่งส่วนไหน เพื่อไม่ให้เกิดความล่าช้า CPU ยุคใหม่จะมีวงจร **Branch Predictor** คอยเดาว่าเงื่อนไขน่าจะเป็นจริงหรือเท็จล่วงหน้า หากเดาถูก โปรแกรมจะทำงานลื่นไหล หากเดาผิด CPU ต้องล้างคำสั่งใน Pipeline ทิ้ง (Branch Misprediction Penalty) ทำให้โค้ดช้าลงอย่างเห็นได้ชัด",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: if-else vs switch-case",
          c: `int status = 2;

// switch-case มักถูก Compiler แปลงเป็น 'Jump Table' ทำให้เข้าถึงเคสใดๆ ได้ใน O(1)
switch (status) {
    case 1:
        cout << "Pending\\n";
        break;
    case 2:
        cout << "Approved\\n"; // ทำงานตรงนี้
        break;
    default:
        cout << "Unknown\\n";
}`,
        },
        { t: "h2", c: "การวนซ้ำ (Loops): for, while และ Loop Invariants" },
        {
          t: "p",
          c: "ในการเขียนอัลกอริทึม ลูปไม่ใช่แค่การสั่งให้ทำงานซ้ำ แต่ต้องมี **Loop Invariant (ข้อความที่เป็นจริงเสมอก่อนและหลังจบลูปแต่ละรอบ)** ซึ่งเป็นรากฐานที่ใช้พิสูจน์ว่า Binary Search หรือ Sorting ของเราทำงานถูกต้องแน่นอน:",
        },
        {
          t: "table",
          head: ["ชนิดของ Loop", "การใช้งานที่เหมาะสม", "ตัวอย่างการใช้งานใน DSA"],
          rows: [
            ["`for` loop", "เมื่อรู้จำนวนรอบที่แน่นอนล่วงหน้า", "การวนอ่านข้อมูลในอาร์เรย์ตาม Index 0 ถึง N-1"],
            ["`while` loop", "เมื่อจำนวนรอบขึ้นอยู่กับเงื่อนไขที่เปลี่ยนแปลงไป", "Two Pointers (`while left < right`), Binary Search"],
            ["`do-while` loop (C++)", "เมื่อต้องการให้ทำงานอย่างน้อย 1 รอบก่อนตรวจเงื่อนไข", "การรับค่า Input ซ้ำจนกว่าจะได้ค่าที่ถูกต้อง"],
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "Python: เทคนิคการใช้ Loop และ break / continue",
          c: `# 1. วนพร้อม Index ด้วย enumerate
fruits = ["apple", "banana", "cherry"]
for idx, fruit in enumerate(fruits):
    if fruit == "banana":
        continue  # ข้ามรอบนี้ไป
    print(f"Index {idx}: {fruit}")

# 2. While loop กับ Two Pointers
left, right = 0, len(fruits) - 1
while left < right:
    # สลับตำแหน่งข้อมูล
    fruits[left], fruits[right] = fruits[right], fruits[left]
    left += 1
    right -= 1

print("Reversed:", fruits)`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch1-functions": {
    slug: "dsa-ch1-functions",
    title: {
      th: "ฟังก์ชัน & Stack Frames (Pass by Value vs Reference)",
      en: "Functions & Stack Frames: Call Mechanics & Reference Passing",
    },
    lead: {
      th: "เจาะลึกการสร้าง Stack Frame บนหน่วยความจำ การส่งค่าแบบ Pass by Value vs Reference และผลกระทบต่อประสิทธิภาพการทำงาน",
      en: "Examine call stack activation records, pass by value vs reference, and memory allocation impacts.",
    },
    group: "บทที่ 1: พื้นฐานการเขียนโปรแกรมเชิงระบบ",
    blocks: {
      th: [
        { t: "h2", c: "ฟังก์ชันทำงานอย่างไรบนหน่วยความจำ? (The Call Stack Frame)" },
        {
          t: "p",
          c: "เมื่อใดก็ตามที่มีการเรียกฟังก์ชัน (Function Call) คอมพิวเตอร์จะจัดสรรพื้นที่ชั่วคราวบน **Stack Memory** เรียกว่า **Stack Frame (Activation Record)** เพื่อเก็บ:",
        },
        {
          t: "ul",
          c: [
            "**พารามิเตอร์ (Parameters)** ที่ส่งเข้ามา",
            "**ตัวแปรเฉพาะที่ (Local Variables)** ที่ประกาศภายในฟังก์ชัน",
            "**Return Address**: หมายเลขคำสั่งในโค้ดเดิมที่ต้องกระโดดกลับไปรันต่อเมื่อฟังก์ชันทำงานเสร็จ",
          ],
        },
        { t: "h2", c: "Pass by Value vs Pass by Reference" },
        {
          t: "p",
          c: "นี่คือจุดที่ทำให้โปรแกรมเมอร์หลายคนตกม้าตายเรื่องความเร็วและบั๊กที่ไม่คาดคิด:",
        },
        {
          t: "table",
          head: ["วิธีการส่งค่า", "C++ Syntax", "พฤติกรรมในหน่วยความจำ", "ผลต่อประสิทธิภาพ"],
          rows: [
            [
              "Pass by Value",
              "`void foo(vector<int> a)`",
              "คัดลอกข้อมูลทั้งหมดสร้างเป็นก๊อปปี้ใหม่บน Stack Frame",
              "🐢 ช้ามาก หากอาร์เรย์มี 1,000,000 ตัว จะเสียเวลาคัดลอก $O(n)$ ทุกครั้งที่เรียก!",
            ],
            [
              "Pass by Reference",
              "`void foo(vector<int>& a)`",
              "ส่งเพียง 'นามแฝง' (Alias) หรือที่อยู่เดิมเข้าไป โดยไม่คัดลอกข้อมูล",
              "⚡ เร็วสูงสุด $O(1)$ และสามารถแก้ไขข้อมูลต้นฉบับได้โดยตรง",
            ],
            [
              "Pass by Const Reference",
              "`void foo(const vector<int>& a)`",
              "ส่งแบบไม่คัดลอกข้อมูล และป้องกันไม่ให้เผลอแก้ไขข้อมูลต้นฉบับ",
              "🛡️ มาตรฐานสูงสุดของการเขียน C++ ในระดับมืออาชีพ",
            ],
          ],
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: ตัวอย่าง Pass by Value vs Pass by Reference",
          c: `#include <iostream>
#include <vector>
using namespace std;

// ส่งแบบ Reference ด้วยเครื่องหมาย &
void modifyValue(int& x) {
    x = 999; // แก้ไขค่าที่ตัวแปรต้นฉบับจริง
}

// รับ Vector ขนาดใหญ่แบบ const reference เพื่อไม่ให้เสียเวลาคัดลอก
int findSum(const vector<int>& nums) {
    int sum = 0;
    for (int n : nums) sum += n;
    return sum;
}

int main() {
    int num = 10;
    modifyValue(num);
    cout << "num is now: " << num << "\\n"; // แสดง 999
    return 0;
}`,
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Pass by Object Reference (Mutable vs Immutable)",
          c: `# ใน Python ไม่มีการเลือก pass by value หรือ reference แบบ C++
# แต่ขึ้นอยู่กับชนิดของ Object ว่าเป็น Mutable (แก้ได้) หรือ Immutable (แก้ไม่ได้):

def try_modify(num: int, arr: list[int]):
    num = 999        # int เป็น Immutable -> สร้าง int ใหม่ ไม่กระทบตัวนอก
    arr.append(999)  # list เป็น Mutable   -> แก้ไขลิสต์เดิมตัวนอกทันที!

val = 10
my_list = [1, 2, 3]
try_modify(val, my_list)

print("val:", val)          # ยังคงเป็น 10!
print("my_list:", my_list)  # กลายเป็น [1, 2, 3, 999]!`,
        },
        {
          t: "callout",
          title: "🎯 กฎเหล็กในการสัมภาษณ์งาน",
          c: "- ใน C++: หากส่ง Vector หรือ String ขนาดใหญ่เข้าฟังก์ชัน ให้ใส่ `const Type&` เสมอ ห้ามส่ง Pass by Value เด็ดขาด\n- ใน Python: ระวังการส่ง `list` หรือ `dict` เข้าฟังก์ชัน Recursion เพราะการแก้ไขข้างในจะส่งผลกระทบต่อสถานะของฟังก์ชันอื่นที่ใช้ตัวแปรตัวเดียวกัน!",
        },
      ],
      en: [],
    },
  },
};
