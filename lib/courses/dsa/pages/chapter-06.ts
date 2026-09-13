import type { Page } from "@/lib/types";

export const chapter06Pages: Record<string, Page> = {
  "dsa-ch6-intro": {
    slug: "dsa-ch6-intro",
    title: {
      th: "ทำไมต้องเรียงและค้นหา: รากฐานของ Database & Search Engine",
      en: "The Essence of Searching & Sorting: Foundations of Modern Systems",
    },
    lead: {
      th: "ทำความเข้าใจว่าทำไมการจัดเรียงและการค้นหาข้อมูลถึงเป็นปัญหาที่ใช้พลังงาน CPU มากที่สุดในโลก และวิเคราะห์จุดคุ้มทุนระหว่างการค้นหาตรงๆ กับการจัดเรียงข้อมูลล่วงหน้า",
      en: "Discover why sorting and searching consume a massive portion of global compute, and evaluate the mathematical breakeven point between unsorted scans and sorted index lookups.",
    },
    group: "บทที่ 6: การค้นหา, ตารางแฮช & การจัดเรียงพื้นฐาน",
    blocks: {
      th: [
        {
          t: "p",
          c: "ในระบบซอฟต์แวร์ระดับโลก ไม่ว่าจะเป็นการค้นหาหน้าเว็บของ Google, การกรองสินค้าใน Amazon, หรือระบบดัชนี (Index) ในฐานข้อมูล PostgreSQL ปัญหาพื้นฐานที่เกิดขึ้นซ้ำๆ นับหมื่นล้านครั้งต่อวันมีเพียง 2 เรื่องคือ: **'จะจัดเรียงข้อมูลอย่างไรให้เร็วที่สุด?'** และ **'จะค้นหาข้อมูลที่ต้องการอย่างไรให้เร็วที่สุด?'**",
        },
        { t: "h2", c: "สมการจุดคุ้มทุน: เรียงข้อมูลก่อนคุ้มหรือไม่? (The Breakeven Equation)" },
        {
          t: "p",
          c: "สมมติคุณมีข้อมูล $N$ รายการ และต้องการค้นหาข้อมูลทั้งหมด $Q$ ครั้ง (Queries):\n- **แนวทางที่ 1 (ไม่จัดเรียง)**: ค้นหาด้วย Linear Search ทุกครั้ง จะใช้เวลารวม **$O(Q \\times N)$**\n- **แนวทางที่ 2 (จัดเรียงล่วงหน้าก่อนค้นหา)**: เสียเวลาจัดเรียงครั้งแรก $O(N \\log N)$ แล้วค้นหาด้วย Binary Search แต่ละครั้งใน $O(\\log N)$ จะใช้เวลารวม **$O(N \\log N + Q \\log N)$**",
        },
        {
          t: "code",
          lang: "text",
          label: "การเปรียบเทียบจุดคุ้มทุนเมื่อ N = 1,000,000 รายการ",
          c: `หากค้นหาเพียง 1 ครั้ง (Q = 1):
- แนวทางที่ 1 (Linear Search): 1,000,000 รอบ  <- คุ้มกว่า!
- แนวทางที่ 2 (Sort + Binary):  20,000,020 รอบ

หากค้นหา 10,000 ครั้ง (Q = 10,000 เช่นในระบบ Web Service):
- แนวทางที่ 1 (Linear Search): 10,000 x 1,000,000 = 10,000,000,000 รอบ (ช้าจนระบบค้าง!)
- แนวทางที่ 2 (Sort + Binary):  20,000,000 + (10,000 x 20) = 20,200,000 รอบ (เร็วกว่าเกือบ 500 เท่า!)`,
        },
        {
          t: "callout",
          title: "🎯 บทเรียนทางวิศวกรรม",
          c: "นี่คือเหตุผลที่ฐานข้อมูลอย่าง SQL ต้องสร้าง **B-Tree Index** ล่วงหน้า เพื่อยอมเสียเวลาและพื้นที่ตอนเขียนข้อมูล (Write/Insert) เพื่อแลกกับความเร็วสูงสุดในการค้นหาข้อมูล (Read/Query) ระดับ $O(\\log n)$!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch6-search": {
    slug: "dsa-ch6-search",
    title: {
      th: "การค้นหาข้อมูล: Linear Search vs Binary Search (3 Templates)",
      en: "Searching Algorithms: Linear vs Binary Search & The 3 Templates",
    },
    lead: {
      th: "เจาะลึก Binary Search: การแบ่งครึ่งพื้นที่ค้นหา, วิธีเลี่ยง Integer Overflow ในตัวแปร mid, และ 3 แม่แบบมาตรฐานสำหรับรับมือโจทย์สัมภาษณ์งานทุกรูปแบบ",
      en: "Master binary search mechanics, prevent integer overflow bugs in mid calculations, and learn the 3 canonical templates for all interview variants.",
    },
    group: "บทที่ 6: การค้นหา, ตารางแฮช & การจัดเรียงพื้นฐาน",
    blocks: {
      th: [
        { t: "h2", c: "Linear Search vs Binary Search" },
        {
          t: "table",
          head: ["คุณลักษณะ", "Linear Search (ค้นหาตามลำดับ)", "Binary Search (ค้นหาแบบทวิภาค)"],
          rows: [
            ["เงื่อนไขข้อมูลนำเข้า", "ข้อมูลจะเรียงหรือไม่เรียงก็ได้", "⚠️ ข้อมูลต้องถูกจัดเรียง (Sorted) แล้วเท่านั้น"],
            ["Time Complexity (Worst)", "🐢 O(n)", "⚡ O(log n)"],
            ["Space Complexity", "O(1)", "O(1)"],
            ["สัญชาตญาณ", "เปิดอ่านหนังสือทีละหน้าตั้งแต่หน้าแรก", "เปิดตรงกลาง เลือกว่าจะไปครึ่งซ้ายหรือครึ่งขวา แล้วตัดอีกครึ่งทิ้ง"],
          ],
        },
        { t: "h2", c: "กับดัก Integer Overflow ในการหา Mid" },
        {
          t: "p",
          c: "โค้ดดั้งเดิมที่หลายคนเขียนคือ `mid = (left + right) // 2` ซึ่งมีบั๊กซ่อนอยู่ระดับตำนาน หาก `left` และ `right` มีค่าเข้าใกล้ $2 \\times 10^9$ ผลบวก `left + right` จะเกินค่าสูงสุดของ 32-bit Integer ทำให้เกิด Overflow กลายเป็นค่าติดลบทันที!\n\nวิธีคำนวณที่ปลอดภัยทางคณิตศาสตร์ 100% คือ:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "สูตรคำนวณ Mid ที่ปลอดภัยจาก Overflow",
          c: `// แทนที่จะใช้: mid = (left + right) / 2;
// ให้เขียนแบบนี้เสมอ:
int mid = left + (right - left) / 2;`,
        },
        { t: "h2", c: "แม่แบบที่ 1: ค้นหาค่าที่ตรงกันเป๊ะ (Exact Match)" },
        {
          t: "code",
          lang: "python",
          label: "Python: Binary Search แม่แบบที่ 1 (LeetCode 704)",
          c: `def binary_search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid  # เจอคำตอบทันที!
        elif nums[mid] < target:
            left = mid + 1   # ตัดครึ่งซ้ายทิ้ง มุ่งไปครึ่งขวา
        else:
            right = mid - 1  # ตัดครึ่งขวาทิ้ง มุ่งไปครึ่งซ้าย
            
    return -1  # หาไม่พบ

print(binary_search([-1, 0, 3, 5, 9, 12], 9))  # 4 (อยู่ที่ Index 4)
print(binary_search([-1, 0, 3, 5, 9, 12], 2))  # -1 (ไม่มีในอาร์เรย์)`,
        },
        { t: "h2", c: "แม่แบบที่ 2: ค้นหาตำแหน่งแรกที่เป็นจริง (Lower Bound / First True)" },
        {
          t: "p",
          c: "ใช้เมื่อต้องการหาจุดเปลี่ยนผ่าน เช่น หาตัวเลขแรกที่ $\\ge target$ หรือหาเวอร์ชันแรกที่มีบั๊ก (First Bad Version - LeetCode 278):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Binary Search แม่แบบ First True",
          c: `def find_first_true(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    ans = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] >= target:
            ans = mid        # อาจเป็นคำตอบ แต่ยังพยายามบีบหาตัวที่อยู่ซ้ายกว่า
            right = mid - 1
        else:
            left = mid + 1
            
    return ans`,
        },
        {
          t: "callout",
          title: "🌐 Use Case ในโลกจริง: Git Bisect",
          c: "คำสั่ง `git bisect` ใน Git ใช้ Binary Search ในการค้นหา Commit ที่ทำให้เกิดบั๊กในประวัติศาสตร์ที่มีนับหมื่น Commits โดยใช้การทดสอบเพียงไม่กี่ครั้งแทนที่จะต้องไล่เช็คทีละ Commit!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch6-sort": {
    slug: "dsa-ch6-sort",
    title: {
      th: "การเรียงลำดับพื้นฐาน O(n²): Bubble, Selection, Insertion Sort",
      en: "Fundamental Comparison Sorts: Bubble, Selection & Insertion Sort",
    },
    lead: {
      th: "เจาะลึก 3 อัลกอริทึมการจัดเรียงพื้นฐาน O(n²), การทำงานทีละสเต็ป และทำไม Insertion Sort ถึงเป็นหัวใจในระบบเรียงข้อมูลระดับโลกอย่าง Timsort",
      en: "Detailed mechanics of O(n²) sorting algorithms: Bubble, Selection, and Insertion Sort, and why real engines rely on Insertion Sort for small subarrays.",
    },
    group: "บทที่ 6: การค้นหา, ตารางแฮช & การจัดเรียงพื้นฐาน",
    blocks: {
      th: [
        { t: "h2", c: "1. Bubble Sort (การลอยตัวของค่ามาก)" },
        {
          t: "p",
          c: "เปรียบเทียบสมาชิกคู่ที่อยู่ติดกัน ถ้าตัวซ้ายมากกว่าตัวขวา ให้สลับที่กัน ค่าที่มากที่สุดจะค่อยๆ ลอยขึ้นไปอยู่ท้ายอาร์เรย์เหมือนฟองอากาศในน้ำ:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Optimized Bubble Sort พร้อม Early Exit Flag",
          c: `def bubble_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n):
        swapped = False
        # ตัวท้ายๆ i ตัวเรียงแล้ว ไม่ต้องวนตรวจซ้ำ
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # หากจบลูปในแล้วไม่มีการสลับเลย แปลว่าอาร์เรย์เรียงเสร็จแล้ว หยุดได้เลย! (Best Case O(n))
        if not swapped:
            break
    return arr

print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))`,
        },
        { t: "h2", c: "2. Selection Sort (เลือกค่าน้อยที่สุดมาไว้ข้างหน้า)" },
        {
          t: "p",
          c: "ในแต่ละรอบจะสแกนหาค่าที่น้อยที่สุดในส่วนที่ยังไม่ได้จัดเรียง แล้วนำมาสลับกับตำแหน่งแรกของรอบนั้น การทำงานจะเป็น $O(n^2)$ เสมอแม้ข้อมูลจะเรียงมาแล้วก็ตาม:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Selection Sort",
          c: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        // สลับค่าที่น้อยที่สุดมาไว้ที่ตำแหน่ง i
        swap(arr[i], arr[minIdx]);
    }
}`,
        },
        { t: "h2", c: "3. Insertion Sort (การแทรกไพ่ในมือ) — ราชาแห่ง Small Data" },
        {
          t: "p",
          c: "จำลองพฤติกรรมการจัดไพ่ในมือ: เราหยิบไพ่ใบใหม่ขึ้นมา แล้วเลื่อนถอยหลังเพื่อหาช่องว่างที่ถูกต้องสำหรับแทรกไพ่ใบนั้นลงไป:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Insertion Sort",
          c: `def insertion_sort(arr: list[int]) -> list[int]:
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # เลื่อนสมาชิกที่มากกว่า key ไปทางขวาทีละช่อง
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
        },
        {
          t: "callout",
          title: "🚀 ทำไมระบบจริงยังใช้ Insertion Sort?",
          c: "ในซอฟต์แวร์ระดับโปรดักชันอย่าง **Python (`list.sort()`) และ Java (`Arrays.sort()`)** ใช้อัลกอริทึมชื่อ **Timsort** ซึ่งเป็นลูกผสมระหว่าง Merge Sort และ Insertion Sort!\n\nเมื่อข้อมูลมีขนาดเล็ก ($N \\le 32 – 64$) หรือข้อมูลเกือบจะเรียงอยู่แล้ว Insertion Sort จะทำงานเร็วที่สุดเหนือกว่า Merge/Quick Sort เพราะมี Overhead น้อยมาก และทำงานแบบ **Adaptive O(n)** บนข้อมูลที่เกือบเรียง!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch6-hash-table": {
    slug: "dsa-ch6-hash-table",
    title: {
      th: "Hash Table & Hash Map: Collision Resolution & Two Sum O(1)",
      en: "Hash Tables & Hash Maps: Hash Functions, Collisions & O(1) Lookups",
    },
    lead: {
      th: "ความมหัศจรรย์ของการค้นหาข้อมูลใน O(1), การออกแบบ Hash Function, กลยุทธ์แก้ Collision (Chaining vs Open Addressing), และเปรียบเทียบ C++ unordered_map vs map",
      en: "The mechanics of constant-time O(1) operations, collision resolution strategies (chaining vs open addressing), and C++ unordered_map vs map.",
    },
    group: "บทที่ 6: การค้นหา, ตารางแฮช & การจัดเรียงพื้นฐาน",
    blocks: {
      th: [
        { t: "h2", c: "Hash Table ทำงานอย่างไรในระดับหน่วยความจำ?" },
        {
          t: "p",
          c: "ความเร็วระดับ **$O(1)$** ของ Hash Table เกิดจากการแปลงคีย์ (Key) ใดๆ เช่น สตริง `\"john_doe\"` ให้กลายเป็นหมายเลข Index ในอาร์เรย์ ผ่านฟังก์ชันคณิตศาสตร์ที่เรียกว่า **Hash Function**:",
        },
        {
          t: "viz",
          id: "dsa-hash-function-pipeline",
        },
        { t: "h2", c: "การชนกันของข้อมูล (Hash Collision) และวิธีแก้ไข" },
        {
          t: "p",
          c: "เนื่องจากจำนวนคีย์ที่เป็นไปได้มีเป็นอนันต์ แต่ขนาดของอาร์เรย์ใน RAM มีจำกัด ย่อมต้องมีกรณีที่สองคีย์ที่ต่างกันได้ผลลัพธ์ Bucket Index เดียวกัน เรียกว่า **Collision** โดยมี 2 วิธีแก้หลัก:",
        },
        {
          t: "table",
          head: ["วิธีการแก้ Collision", "กลไกการทำงาน", "ข้อดี / ข้อเสีย"],
          rows: [
            [
              "**Separate Chaining (การต่อลูกโซ่)**",
              "แต่ละช่องในอาร์เรย์เป็นหัวของ Linked List หากชนกัน ก็นำโหนดใหม่ไปต่อท้ายในช่องนั้น",
              "✅ ทำง่าย ไม่เต็มความจุ\n🐢 หาก Collision สูง จะกลายสภาพเป็น Linked List ช้า $O(n)$",
            ],
            [
              "**Open Addressing (Linear Probing)**",
              "หากช่องที่คำนวณได้มีคนจองแล้ว ให้ขยับไปดูช่องถัดไปเรื่อยๆ จนกว่าจะเจอช่องว่าง",
              "✅ ใช้หน่วยความจำต่อเนื่อง Cache Locality ดีมาก\n🐢 เกิดปัญหาการเกาะกลุ่ม (Clustering)",
            ],
          ],
        },
        { t: "h2", c: "เปรียบเทียบ C++ std::unordered_map vs std::map" },
        {
          t: "table",
          head: ["คุณสมบัติ", "`std::unordered_map` (Hash Table)", "`std::map` (Balanced BST: Red-Black Tree)"],
          rows: [
            ["โครงสร้างภายใน", "Hash Table (Bucket Array + Chaining)", "Self-Balancing Binary Search Tree"],
            ["ลำดับของข้อมูล", "❌ ไม่มีลำดับ (Unordered)", "✅ ข้อมูลเรียงตามลำดับคีย์เสมอ (Sorted Key)"],
            ["Time Complexity (Search/Insert)", "⚡ **O(1)** Average (Worst case O(n))", "⏱️ **O(log n)** Guaranteed"],
            ["การใช้งานในการสัมภาษณ์", "ใช้เมื่อต้องการความเร็วสูงสุดและไม่สนใจการเรียงข้อมูล", "ใช้เมื่อต้องการดึง Min/Max ของ Key หรือต้องการข้อมูลเรียงลำดับ"],
          ],
        },
        {
          t: "callout",
          title: "🎯 สรุปการใช้ Hash Table ในการสัมภาษณ์งาน",
          c: "เมื่อใดก็ตามที่โจทย์ถามว่า: *'มีตัวเลขนี้อยู่ในข้อมูลหรือไม่?'* หรือ *'มีคู่นี้บวกกันได้ Target หรือไม่?'* หรือ *'ตัวอักษรใดปรากฏบ่อยที่สุด?'* ให้คิดถึง **Hash Map / Hash Set** เป็นสิ่งแรกเสมอ เพราะสามารถเปลี่ยนความซับซ้อนจาก $O(n^2)$ เหลือ $O(n)$ ได้ในทันที!",
        },
      ],
      en: [],
    },
  },
};
