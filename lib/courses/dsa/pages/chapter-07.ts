import type { Page } from "@/lib/types";

export const chapter07Pages: Record<string, Page> = {
  "dsa-ch7-intro": {
    slug: "dsa-ch7-intro",
    title: {
      th: "Code Complexity: ความซับซ้อนของโค้ดและการวัดประสิทธิภาพ",
      en: "Code Complexity: Asymptotic Analysis Fundamentals",
    },
    lead: {
      th: "ทำไมการจับเวลาด้วยนาฬิกา (Wall-Clock Time) จึงไม่เพียงพอ และทำไมโลกของ Software Engineering ต้องใช้ Asymptotic Analysis",
      en: "Why wall-clock benchmarks fail and how asymptotic analysis provides machine-independent performance metrics.",
    },
    group: "บทที่ 2: การวัดประสิทธิภาพ & Big-O (เรียนก่อนเพื่อใช้วัดผล)",
    blocks: {
      th: [
        {
          t: "p",
          c: "เวลาเราเขียนโค้ดแล้วทดสอบว่าโปรแกรมไหนเร็วกว่ากัน หลายคนมักใช้วิธีจับเวลาก่อนและหลังรันฟังก์ชัน (`time.time()`) แต่วิธีนี้มีข้อเสียร้ายแรงหลายประการ:",
        },
        {
          t: "ul",
          c: [
            "ขึ้นอยู่กับฮาร์ดแวร์: คอมพิวเตอร์ CPU แรงจะรันเร็วกว่าเครื่องเก่าเสมอ",
            "ขึ้นอยู่กับสถานะเครื่องในขณะนั้น: หากมีโปรแกรมอื่นรันอยู่เบื้องหลัง เวลาจะแกว่ง",
            "ไม่สามารถพยากรณ์ข้อมูลขนาดมหาศาล (Scalability) ได้จริง",
          ],
        },
        {
          t: "p",
          c: "นักวิทยาการคอมพิวเตอร์จึงคิดค้น **Asymptotic Analysis (Big-O Notation)** เพื่อวัดว่า **เมื่อขนาดข้อมูลนำเข้า (n) เพิ่มขึ้นเป็นอนันต์ ปริมาณงานหรือพื้นที่หน่วยความจำจะเติบโตในอัตราส่วนเท่าใด** โดยไม่ขึ้นกับยี่ห้อของ CPU",
        },
        {
          t: "callout",
          title: "🎯 สัญลักษณ์ 3 แบบในทฤษฎี",
          c: "Big-O (O): ขอบเขตบนสุด (Worst Case - ทำงานไม่ช้าไปกว่านี้), Big-Omega (Ω): ขอบเขตล่างสุด (Best Case), และ Big-Theta (Θ): ขอบเขตที่แน่นตรงกลาง (Average Case) ในการสัมภาษณ์งานเราจะพูดถึง Worst Case (Big-O) เป็นหลัก",
        },
      ],
      en: [],
    },
  },

  "dsa-ch7-big-o-type": {
    slug: "dsa-ch7-big-o-type",
    title: {
      th: "Big-O Notation แต่ละระดับ",
      en: "Big-O Classes: From Constant to Exponential",
    },
    lead: {
      th: "ตารางสรุประดับความซับซ้อน O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!) พร้อมตัวอย่างโค้ดจริง",
      en: "Explore the Big-O spectrum: constant, logarithmic, linear, linearithmic, quadratic, and exponential.",
    },
    group: "บทที่ 2: การวัดประสิทธิภาพ & Big-O (เรียนก่อนเพื่อใช้วัดผล)",
    blocks: {
      th: [
        { t: "h2", c: "ตารางสรุป Big-O จากเร็วที่สุดไปหาช้าที่สุด" },
        {
          t: "table",
          head: ["ระดับ Big-O", "ชื่อเรียก", "ตัวอย่างการทำงาน", "n = 1,000,000 ใช้รอบประมาณ"],
          rows: [
            ["O(1)", "Constant Time", "เข้าถึง Index อาร์เรย์ `arr[i]`, ตรวจ Hash Map", "1 รอบ ⚡"],
            ["O(log n)", "Logarithmic", "Binary Search, ค้นหาใน Balanced BST", "~20 รอบ 🚀"],
            ["O(n)", "Linear", "วนลูป 1 รอบหา Max, Linear Search", "1,000,000 รอบ ✅"],
            ["O(n log n)", "Linearithmic", "Merge Sort, Quick Sort (Average), Timsort", "~20,000,000 รอบ ⏱️"],
            ["O(n²)", "Quadratic", "Nested loop สองชั้น, Bubble Sort", "1,000,000,000,000 รอบ 🐌 (เกิน 1 วินาที!)"],
            ["O(2ⁿ)", "Exponential", "สร้าง Subsets ทั้งหมด, Recursive Fibonacci ดิบ", "เกินกำลังจักรวาลจะคำนวณไหว 💀"],
            ["O(n!)", "Factorial", "สร้าง Permutations ทั้งหมด, Traveling Salesperson", "แทบค้างแม้ n แค่ 15 💥"],
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "Python: ตัวอย่างโค้ดในแต่ละระดับ Big-O",
          c: `# 1. O(1) - Constant
def get_first(arr):
    return arr[0] if arr else None

# 2. O(log n) - Logarithmic
def count_halves(n):
    count = 0
    while n > 1:
        n //= 2
        count += 1
    return count

# 3. O(n) - Linear
def sum_all(arr):
    total = 0
    for x in arr:
        total += x
    return total

# 4. O(n^2) - Quadratic
def print_pairs(arr):
    for i in arr:
        for j in arr:
            pass`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch7-complexity": {
    slug: "dsa-ch7-complexity",
    title: {
      th: "การวิเคราะห์ Time & Space Complexity",
      en: "Analyzing Time & Space Complexity: Rules & Techniques",
    },
    lead: {
      th: "กฎเหล็ก 4 ข้อในการตัดค่าคงที่ การวิเคราะห์พารามิเตอร์หลายตัว และการคำนวณ Auxiliary Space",
      en: "Master simplification rules: dropping constants, multi-variable bounds, and auxiliary space analysis.",
    },
    group: "บทที่ 2: การวัดประสิทธิภาพ & Big-O (เรียนก่อนเพื่อใช้วัดผล)",
    blocks: {
      th: [
        { t: "h2", c: "กฎเหล็ก 4 ข้อในการคำนวณ Big-O" },
        {
          t: "ol",
          c: [
            "**กฎข้อที่ 1: ตัดค่าคงที่ทิ้ง (Drop the Constants)**: `O(2n + 5)` จะถูกย่อเหลือเพียง `O(n)` เพราะเมื่อ n มีค่าเป็น 1,000,000 ตัวเลขคูณ 2 หรือบวก 5 ไม่มีนัยสำคัญต่ออัตราการเติบโต",
            "**กฎข้อที่ 2: พจน์ที่ไม่เด่นให้ตัดทิ้ง (Drop Non-Dominant Terms)**: `O(n² + n + 100)` จะถูกย่อเหลือเพียง `O(n²)` เพราะ n² เติบโตเร็วกว่า n อย่างมหาศาล",
            "**กฎข้อที่ 3: ระวังตัวแปรหลายตัว (Different Inputs -> Different Variables)**: หากมีอาร์เรย์ A ขนาดยาว N และอาร์เรย์ B ขนาดยาว M วนลูปซ้อนกัน คือ `O(N * M)` ไม่ใช่ `O(N²)`",
            "**กฎข้อที่ 4: นับพื้นที่ Space เฉพาะส่วนเสริม (Auxiliary Space)**: พื้นที่ Input ดั้งเดิมไม่ถูกนับเป็น Space เพิ่มเติม แต่นับเฉพาะ Data Structure ที่เราสร้างขึ้นใหม่ (เช่น Stack, Map) และความลึกของ Recursion Call Stack",
          ],
        },
      ],
      en: [],
    },
  },

  "dsa-ch7-leetcode": {
    slug: "dsa-ch7-leetcode",
    title: {
      th: "ประยุกต์ใช้ Big-O กับโจทย์ LeetCode & ห้องสัมภาษณ์",
      en: "Applying Big-O to LeetCode & Interview Constraints",
    },
    lead: {
      th: "ตารางถอดรหัส Constraints: ดูขนาดของ Input แล้วรู้อัลกอริทึมที่ต้องใช้ทันทีก่อนเริ่มเขียนโค้ด",
      en: "The Interview Constraints Cheat Sheet: deducing expected algorithms directly from problem bounds.",
    },
    group: "บทที่ 2: การวัดประสิทธิภาพ & Big-O (เรียนก่อนเพื่อใช้วัดผล)",
    blocks: {
      th: [
        { t: "h2", c: "ตารางถอดรหัส Constraints สำหรับห้องสัมภาษณ์งาน" },
        {
          t: "p",
          c: "ในการสัมภาษณ์งานและแข่งขัน คอมพิวเตอร์สามารถคำนวณคำสั่งพื้นฐานได้ประมาณ **10⁷ ถึง 10⁸ รอบต่อวินาที (10–100 ล้านครั้ง)** ดังนั้นขนาดของ N ในโจทย์จะบอกคำตอบล่วงหน้าว่าอัลกอริทึมของคุณต้องมี Big-O เท่าใด:",
        },
        {
          t: "table",
          head: ["ขนาดของ N ในโจทย์ (Constraints)", "Big-O สูงสุดที่อนุญาต", "อัลกอริทึมที่ควรนึกถึงทันที"],
          rows: [
            ["N <= 10 – 12", "O(N!) หรือ O(2ᴺ * N)", "Brute Force, Recursion, Permutations"],
            ["N <= 20 – 25", "O(2ᴺ)", "Backtracking, Bitmask DP, Subsets"],
            ["N <= 100", "O(N⁴) หรือ O(N³)", "3D Dynamic Programming, Floyd-Warshall"],
            ["N <= 1,000", "O(N²)", "Nested Loops, 2D DP, Insertion Sort"],
            ["N <= 100,000 (10⁵)", "O(N log N) หรือ O(N)", "🔥 บ่อยสุด! Sorting, Binary Search, Two Pointers, Hash Table, Heap"],
            ["N <= 1,000,000 (10⁶)", "O(N) หรือ O(N log N)", "Single Pass, Sliding Window, Monotonic Stack"],
            ["N >= 10⁹", "O(log N) หรือ O(1)", "Binary Search, Math formula, Bitwise manipulation"],
          ],
        },
        {
          t: "callout",
          title: "💡 เคล็ดลับการตอบสัมภาษณ์",
          c: "ทันทีที่อ่านโจทย์ ให้ดูหัวข้อ Constraints ด้านล่าง ถ้าโจทย์บอกว่า `nums.length <= 100,000` คุณรู้ได้ทันทีเลยว่าห้ามใช้ nested loop O(n²) เด็ดขาด! คุณต้องมองหาทางออกที่เป็น O(n log n) หรือ O(n) เท่านั้น",
        },
      ],
      en: [],
    },
  },
};
