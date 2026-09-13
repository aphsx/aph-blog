import type { Page } from "@/lib/types";

export const chapter02Pages: Record<string, Page> = {
  "dsa-ch2-intro": {
    slug: "dsa-ch2-intro",
    title: {
      th: "ทำไมต้องวัดประสิทธิภาพ: อวสานการจับเวลาด้วยนาฬิกา (Asymptotic Analysis)",
      en: "Why Benchmarks Fail: The Need for Asymptotic Analysis",
    },
    lead: {
      th: "เข้าใจข้อจำกัดของการจับเวลาด้วยนาฬิกา (Wall-Clock Time) สู่การวัดประสิทธิภาพเชิงสัญลักษณ์ Big-O ที่เป็นสากลและไม่ขึ้นกับฮาร์ดแวร์",
      en: "Why wall-clock benchmarks produce misleading results and how asymptotic analysis provides machine-independent performance metrics.",
    },
    group: "บทที่ 2: เข็มทิศวัดประสิทธิภาพ (Big-O & Complexity)",
    blocks: {
      th: [
        {
          t: "p",
          c: "เวลาโปรแกรมเมอร์มือใหม่ต้องการเปรียบเทียบว่าโค้ดชุดไหนเร็วกว่ากัน วิธีแรกที่ทุกคนมักคิดถึงคือการเขียนโค้ดจับเวลา เช่น การใช้ `time.time()` ใน Python หรือ `std::chrono` ใน C++ เพื่อดูว่าฟังก์ชันใช้เวลากี่มิลลิวินาที:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: ตัวอย่างการจับเวลาแบบ Wall-Clock Time (และทำไมจึงมีปัญหา)",
          c: `import time

start = time.perf_counter()
# รันอัลกอริทึม A
total = sum(range(10_000_000))
end = time.perf_counter()

print(f"Elapsed time: {end - start:.4f} seconds")`,
        },
        { t: "h2", c: "ทำไมการจับเวลาด้วยนาฬิกา (Wall-Clock Time) ถึงใช้ไม่ได้ผล?" },
        {
          t: "ul",
          c: [
            "**1. ขึ้นอยู่กับฮาร์ดแวร์โดยตรง**: รันบนแล็ปท็อป CPU ตัวท็อปย่อมเร็วกว่ารันบนคลาวด์เซิร์ฟเวอร์ขนาดเล็ก ทั้งที่เป็นโค้ดชุดเดียวกัน",
            "**2. มีสัญญาณรบกวนจากระบบปฏิบัติการ (OS Noise)**: หากระบบปฏิบัติการกำลังอัปเดตซอฟต์แวร์ หรือมีโปรแกรมอื่นทำงานเบื้องหลัง เวลาที่วัดได้จะแกว่งอย่างมาก",
            "**3. ไม่สามารถพยากรณ์ข้อมูลขนาดมหึมา (Scalability) ได้จริง**: โค้ดที่รันเร็วกับข้อมูล 100 ตัว อาจช้าจนระบบล่มเมื่อเจอข้อมูล 10,000,000 ตัว",
          ],
        },
        { t: "h2", c: "กำเนิด Asymptotic Analysis: การวัดอัตราการเติบโต" },
        {
          t: "p",
          c: "นักวิทยาการคอมพิวเตอร์จึงคิดค้นการวัดเชิงนามธรรมที่เรียกว่า **Asymptotic Analysis** ซึ่งตั้งคำถามเพียงข้อเดียวคือ:\n\n> *'เมื่อขนาดข้อมูลนำเข้า ($N$) เติบโตขึ้นเรื่อยๆ จนเข้าใกล้อนันต์ ($N \\to \\infty$) ปริมาณคำสั่งและพื้นที่หน่วยความจำจะเติบโตในอัตราส่วนเท่าใด?'*",
        },
        {
          t: "viz",
          id: "dsa-asymptotic-bounds",
        },
        {
          t: "callout",
          title: "🎯 สรุปบทบาทของ Big-O",
          c: "Big-O ไม่ได้บอกเวลาเป็นวินาที แต่บอก **'รูปทรงของเส้นกราฟการเติบโต'** ของการใช้ทรัพยากร ทำให้เราสามารถเปรียบเทียบอัลกอริทึมได้อย่างเป็นธรรม โดยไม่ต้องสนใจว่ารันบนเครื่องคอมพิวเตอร์เครื่องไหน!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch2-big-o-type": {
    slug: "dsa-ch2-big-o-type",
    title: {
      th: "สเปกตรัมของ Big-O: จาก O(1) ถึง O(n!) เข้าใจด้วยภาพ",
      en: "The Big-O Spectrum: From Constant O(1) to Factorial O(n!)",
    },
    lead: {
      th: "เจาะลึกตระกูลความซับซ้อนทุกระดับ เปรียบเทียบจำนวนรอบคำนวณจริงเมื่อ N = 1,000,000 และตัวอย่างโค้ดในโลกจริง",
      en: "Explore the Big-O spectrum: concrete operations when N = 1,000,000 and real-world code examples for each class.",
    },
    group: "บทที่ 2: เข็มทิศวัดประสิทธิภาพ (Big-O & Complexity)",
    blocks: {
      th: [
        { t: "h2", c: "ตารางสรุปสเปกตรัม Big-O (จากเร็วที่สุด สู่ช้าจนระบบล่ม)" },
        {
          t: "table",
          head: ["ระดับ Big-O", "ชื่อเรียก", "คำอธิบายเชิงสัญชาตญาณ", "เมื่อ N = 1,000,000 (จำนวนรอบ)", "ตัวอย่างจริงในชีวิตประจำวัน"],
          rows: [
            ["**O(1)**", "Constant Time", "เร็วมหัศจรรย์ ขนาดข้อมูลเท่าไรก็ใช้เวลาเท่าเดิม", "1 รอบ ⚡", "เข้าถึงข้อมูลในอาร์เรย์ด้วย Index เช่น `arr[5]`, ค้นหาใน Hash Map"],
            ["**O(log n)**", "Logarithmic Time", "แบ่งปัญหาลงครึ่งหนึ่งในทุกๆ ก้าว (ยอดเยี่ยมมาก)", "~20 รอบ 🚀", "Binary Search ในพจนานุกรม, การค้นหาใน Balanced BST"],
            ["**O(n)**", "Linear Time", "จำนวนรอบโตเป็นเส้นตรงตามขนาดข้อมูล", "1,000,000 รอบ ✅", "การสแกนหาค่ามากที่สุด (Max) ในลิสต์ 1 รอบ"],
            ["**O(n log n)**", "Linearithmic Time", "ขีดจำกัดความเร็วที่ดีที่สุดของการเรียงข้อมูลแบบเปรียบเทียบ", "~20,000,000 รอบ ⏱️", "Merge Sort, Quick Sort, Timsort (ใน Python `sort()`)"],
            ["**O(n²)**", "Quadratic Time", "มีลูปซ้อนกันสองชั้น ข้อมูลเพิ่ม 2 เท่า ช้าลง 4 เท่า", "1,000,000,000,000 รอบ 🐌 (เกิน 1 วินาที!)", "Bubble Sort, เปรียบเทียบคู่ข้อมูลทุกคู่ในอาร์เรย์"],
            ["**O(2ⁿ)**", "Exponential Time", "จำนวนรอบเบิ้ลขึ้นเท่าตัวทุกครั้งที่ N เพิ่มขึ้น 1", "$2^{1000000}$ (มากกว่าอะตอมในจักรวาล) 💀", "การสร้าง Subsets ทั้งหมดของเซต, Recursive Fibonacci ดิบ"],
            ["**O(n!)**", "Factorial Time", "การสร้างการจัดเรียงสับเปลี่ยนทั้งหมด (ช้าที่สุด)", "แทบค้างตั้งแต่ N = 15 💥", "Traveling Salesperson Problem (TSP) แบบ Brute Force"],
          ],
        },
        {
          t: "viz",
          id: "dsa-big-o-chart",
        },
        { t: "h2", c: "ตัวอย่างโค้ดจริงในแต่ละระดับ Big-O" },
        {
          t: "code",
          lang: "python",
          label: "Python: ตัวอย่างโค้ดตั้งแต่ O(1) ถึง O(2ⁿ)",
          c: `# 1. O(1) - Constant: ดึงตัวแรกจากลิสต์
def get_first_element(arr: list[int]) -> int | None:
    return arr[0] if arr else None

# 2. O(log n) - Logarithmic: ลูปหารสองเรื่อยๆ
def count_divisions_by_two(n: int) -> int:
    count = 0
    while n > 1:
        n //= 2
        count += 1
    return count

# 3. O(n) - Linear: ลูปตัวแปรตัวเดียววนตามความยาว N
def find_maximum(arr: list[int]) -> int:
    current_max = arr[0]
    for x in arr:
        if x > current_max:
            current_max = x
    return current_max

# 4. O(n^2) - Quadratic: Nested Loop ซ้อนสองชั้น
def print_all_pairs(arr: list[int]) -> None:
    n = len(arr)
    for i in range(n):
        for j in range(n):
            print(arr[i], arr[j])

# 5. O(2^n) - Exponential: Fibonacci แบบเรียกซ้ำสองกิ่ง
def fibonacci_recursive(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2)`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch2-complexity": {
    slug: "dsa-ch2-complexity",
    title: {
      th: "การวิเคราะห์ Time & Space Complexity ฉบับวิศวกร",
      en: "Analyzing Time & Space Complexity: Mathematical Rules",
    },
    lead: {
      th: "กฎการคำนวณ Big-O: กฎการบวก (Rule of Sums), กฎการคูณ (Rule of Products), การตัดสัมประสิทธิ์ และแนวคิด Amortized Analysis",
      en: "Master asymptotic analysis arithmetic: addition, multiplication, constant elimination, and amortized complexity.",
    },
    group: "บทที่ 2: เข็มทิศวัดประสิทธิภาพ (Big-O & Complexity)",
    blocks: {
      th: [
        { t: "h2", c: "กฎทอง 3 ข้อในการหา Big-O จากโค้ด" },
        {
          t: "ol",
          c: [
            "**กฎข้อที่ 1: ตัดค่าคงที่ (Constants) ทิ้งเสมอ**\nไม่ว่าโค้ดจะรัน $2N$ รอบ หรือ $100N$ รอบ ในทาง Asymptotic เราถือว่าเป็น $O(n)$ เท่ากัน เพราะเมื่อ $N = 1,000,000,000$ ตัวคูณ 2 แทบไม่มีความหมายต่อรูปทรงของกราฟ",
            "**กฎข้อที่ 2: ตัดพจน์ที่ไม่เด่น (Non-Dominant Terms) ทิ้งเสมอ**\nหากสมการการทำงานคือ $f(N) = N^2 + 500N + 9999$ เราจะสนใจเฉพาะพจน์ที่มีพลังทำลายล้างสูงสุดเมื่อ $N \\to \\infty$ นั่นคือ $O(n^2)$",
            "**กฎข้อที่ 3: ลูปเรียงต่อกันให้ 'บวก' ลูปซ้อนกันให้ 'คูณ'**\n- ลูป A วน $N$ รอบ แล้วตามด้วยลูป B วน $M$ รอบ $\\implies O(N + M)$\n- ลูป A วน $N$ รอบ โดยข้างในมีลูป B วน $M$ รอบ $\\implies O(N \\times M)$",
          ],
        },
        { t: "h2", c: "Time Complexity vs Space Complexity" },
        {
          t: "p",
          c: "นอกจากเวลาที่ใช้ประมวลผล (Time Complexity) เรายังต้องวัด **ปริมาณหน่วยความจำ RAM ส่วนเกิน (Space Complexity)** ที่อัลกอริทึมต้องจองเพิ่ม:",
        },
        {
          t: "table",
          head: ["ชนิดของ Space Complexity", "คำอธิบาย", "ตัวอย่าง"],
          rows: [
            ["$O(1)$ Space (In-Place)", "ใช้อาร์กิวเมนต์ตัวแปรนับจำนวนไม่กี่ตัว ไม่สร้างโครงสร้างข้อมูลเพิ่มตาม $N$", "Two Pointers สลับตำแหน่งข้อมูลในลิสต์เดิม"],
            ["$O(n)$ Space", "สร้าง Array, Hash Map, หรือ Stack ใหม่ที่มีขนาดแปรผันตรงตามจำนวนข้อมูล $N$", "การสร้างตารางความถี่ตัวอักษร, Call Stack ใน Recursion ลึก $N$ ชั้น"],
            ["$O(n^2)$ Space", "สร้างตารางเมทริกซ์ 2 มิติขนาด $N \\times N$", "ตาราง 2D Dynamic Programming (เช่น Edit Distance, Knapsack)"],
          ],
        },
        { t: "h2", c: "ความหมายที่แท้จริงของ 'Amortized O(1)'" },
        {
          t: "p",
          c: "คำว่า **Amortized (ถัวเฉลี่ย)** มักถูกถามบ่อยมากในการสัมภาษณ์งานระดับสากล เช่น *'ทำไมการ `append()` ข้อมูลลงใน Dynamic Array ถึงเป็น O(1) ทั้งที่มีจังหวะขยายขนาดอาร์เรย์เป็น O(n)?'*",
        },
        {
          t: "viz",
          id: "dsa-amortized-doubling",
        },
      ],
      en: [],
    },
  },

  "dsa-ch2-leetcode": {
    slug: "dsa-ch2-leetcode",
    title: {
      th: "ถอดรหัส Constraints ในโจทย์ LeetCode (สูตรลัด 10⁸ ops/sec)",
      en: "Decoding LeetCode Constraints: The 10⁸ Operations/Sec Rule",
    },
    lead: {
      th: "ความลับที่ผู้สอบผ่านสัมภาษณ์งานทุกคนใช้: วิธีเดาคำตอบและอัลกอริทึมที่ผู้คุมสอบต้องการทันที จากตัวเลขข้อจำกัด (Constraints)",
      en: "The secret of interview masters: deduce the required algorithmic paradigm instantly from the problem constraints using the 10⁸ operations per second rule.",
    },
    group: "บทที่ 2: เข็มทิศวัดประสิทธิภาพ (Big-O & Complexity)",
    blocks: {
      th: [
        { t: "h2", c: "กฎทองคำ: คอมพิวเตอร์คำนวณได้ประมาณ 10⁸ รอบต่อวินาที" },
        {
          t: "p",
          c: "ในการสอบสัมภาษณ์งาน (LeetCode / HackerRank / Codeforces) ระบบคลาวด์จะมีเวลาจำกัดในการรันโค้ดของคุณ **ไม่เกิน 1.0 – 2.0 วินาที** เสมอ\n\nกฎข้อสำคัญคือ: **จำนวนรอบการทำงานทั้งหมดของโค้ดคุณจะต้องไม่เกิน $10^8$ ($100,000,000$) รอบ** หากเกินกว่านี้ ระบบจะตัดคะแนนเป็น **Time Limit Exceeded (TLE)** ทันที!",
        },
        { t: "h2", c: "ตารางถอดรหัส Constraints สู่ Algorithm (The Cheat Sheet)" },
        {
          t: "table",
          head: ["ขนาดข้อมูลนำเข้า ($N$)", "Big-O สูงสุดที่ยอมรับได้", "อัลกอริทึมและแนวคิดที่เป็นไปได้ทันที"],
          rows: [
            ["$N \\le 10 – 12$", "**$O(n!)$ หรือ $O(n^2 2^n)$**", "Traveling Salesperson, สร้าง Permutations ทุกแบบ, Bitmask DP"],
            ["$N \\le 20 – 25$", "**$O(2^n)$**", "Backtracking สร้าง Subsets, Exhaustive Search, Divide & Conquer แบบหยาบ"],
            ["$N \\le 100$", "**$O(n^4)$ หรือ $O(n^3)$**", "Floyd-Warshall All-Pairs Shortest Path, 3D Dynamic Programming, ลูป 3 ชั้น"],
            ["$N \\le 1,000 – 2,000$", "**$O(n^2)$**", "2D Dynamic Programming (Knapsack, LCS), Nested Loops 2 ชั้น, Matrix Traversal"],
            ["$N \\le 100,000 – 200,000$", "**$O(n \\log n)$ หรือ $O(n)$**", "Sorting (Merge/Quick/Timsort), Binary Search, Heap, Two Pointers, Sliding Window, Tree Traversal"],
            ["$N \\le 1,000,000$", "**$O(n)$ หรือ $O(n \\log n)$**", "Hash Table, Linear Scan, Prefix Sum, Stack/Queue, BFS/DFS บนกราฟ Sparse"],
            ["$N \\ge 10^9$ หรือใหญ่มาก", "**$O(\\log n)$ หรือ $O(1)$**", "Binary Search คำตอบ, สูตรคณิตศาสตร์, Fast Exponentiation, Bit Manipulation"],
          ],
        },
        {
          t: "callout",
          title: "🎯 ตัวอย่างจริงในห้องสอบสัมภาษณ์",
          c: "สมมติคุณเจอโจทย์ที่ผู้สัมภาษณ์บอกว่า: *'Array มีความยาว $N = 10^5$ จงหาผลรวมของคู่ที่บวกกันได้ Target'*\n- หากคุณคิดจะใช้ Nested Loop 2 ชั้น: $N^2 = (10^5)^2 = 10^{10}$ รอบ! ซึ่งเกิน $10^8$ ไปถึง 100 เท่า $\\implies$ **ตกทันที!**\n- จากตาราง เมื่อ $N = 10^5$ คุณต้องหา Algorithm ระดับ **$O(n)$ หรือ $O(n \\log n)$** เท่านั้น $\\implies$ คุณจะนึกถึง **Hash Table หรือ Two Pointers** ได้ในเสี้ยววินาที!",
        },
      ],
      en: [],
    },
  },
};
