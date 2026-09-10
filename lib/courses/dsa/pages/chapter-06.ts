import type { Page } from "@/lib/types";

export const chapter06Pages: Record<string, Page> = {
  "dsa-ch6-intro": {
    slug: "dsa-ch6-intro",
    title: {
      th: "Search & Sort: หัวใจสำคัญของอัลกอริทึม",
      en: "Search & Sort Overview: Foundations of Algorithmic Thinking",
    },
    lead: {
      th: "ทำความเข้าใจว่าทำไมการจัดเรียงและการค้นหาข้อมูลถึงเป็นรากฐานที่สำคัญที่สุดของวิทยาการคอมพิวเตอร์",
      en: "Discover why sorting and searching form the bedrock of algorithm design and efficiency.",
    },
    group: "บทที่ 6: การค้นหา, การจัดเรียงพื้นฐาน & ตารางแฮช (Searching, Sorting & Hash Tables)",
    blocks: {
      th: [
        {
          t: "p",
          c: "การค้นหาข้อมูล (**Search**) และการจัดเรียงข้อมูล (**Sort**) เป็นปัญหาพื้นฐานที่ระบบคอมพิวเตอร์ทั่วโลกต้องทำอยู่ตลอดเวลา ไม่ว่าจะเป็นระบบค้นหาของ Google, การจัดอันดับสินค้าใน Shopee, หรือการจับคู่คนขับรถใน Grab เมื่อข้อมูลถูกจัดเรียงอย่างเป็นระเบียบ การค้นหาจะเปลี่ยนจากช้ามาก **O(n)** เป็นเร็วระดับเสี้ยววินาที **O(log n)** ทันที",
        },
        { t: "h2", c: "ภาพรวมอัลกอริทึมการจัดเรียงและค้นหา" },
        {
          t: "table",
          head: ["หมวดหมู่", "อัลกอริทึม", "Best Case", "Average Case", "Worst Case", "Space"],
          rows: [
            ["Simple Sort", "Bubble Sort", "O(n)", "O(n²)", "O(n²)", "O(1)"],
            ["Simple Sort", "Selection Sort", "O(n²)", "O(n²)", "O(n²)", "O(1)"],
            ["Simple Sort", "Insertion Sort", "O(n)", "O(n²)", "O(n²)", "O(1)"],
            ["Advanced Sort", "Merge Sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(n)"],
            ["Advanced Sort", "Quick Sort", "O(n log n)", "O(n log n)", "O(n²)", "O(log n)"],
            ["Searching", "Linear Search", "O(1)", "O(n)", "O(n)", "O(1)"],
            ["Searching", "Binary Search", "O(1)", "O(log n)", "O(log n)", "O(1)"],
            ["Direct Lookup", "Hash Table", "O(1)", "O(1)", "O(n)", "O(n)"],
          ],
        },
      ],
      en: [],
    },
  },

  "dsa-ch6-sort": {
    slug: "dsa-ch6-sort",
    title: {
      th: "Sorting Algorithms: การเรียงลำดับข้อมูลพื้นฐาน",
      en: "Sorting Algorithms: Bubble, Selection & Insertion Sort",
    },
    lead: {
      th: "เจาะลึก 3 อัลกอริทึมการจัดเรียงพื้นฐาน: Bubble Sort, Selection Sort, Insertion Sort พร้อมการวิเคราะห์การสลับข้อมูล",
      en: "Understand fundamental comparison-based sorting algorithms: Bubble, Selection, and Insertion Sort.",
    },
    group: "บทที่ 6: การค้นหา, การจัดเรียงพื้นฐาน & ตารางแฮช (Searching, Sorting & Hash Tables)",
    blocks: {
      th: [
        { t: "h2", c: "1. Bubble Sort (การลอยตัวของค่ามาก)" },
        {
          t: "p",
          c: "เปรียบเทียบสมาชิกคู่ที่อยู่ติดกัน ถ้าตัวซ้ายมากกว่าตัวขวา ให้สลับที่กัน ทำซ้ำไปเรื่อยๆ จนกระทั่งค่าที่มากที่สุดจะค่อยๆ ลอยขึ้นไปอยู่ท้ายอาร์เรย์เหมือนฟองอากาศ:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Optimized Bubble Sort",
          c: `def bubble_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n):
        swapped = False
        # ตัวที่อยู่ท้ายๆ เรียงแล้ว ไม่ต้องวนตรวจซ้ำ
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # ถ้าไม่มีการสลับเลย แปลว่าเรียงเสร็จแล้ว หยุดลูปได้เลย (Best case O(n))
        if not swapped:
            break
    return arr

print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))`,
        },
        { t: "h2", c: "2. Selection Sort (เลือกค่าน้อยที่สุดมาไว้หน้าสุด)" },
        {
          t: "p",
          c: "ในแต่ละรอบจะสแกนหาค่าที่น้อยที่สุดในส่วนที่ยังไม่เรียง แล้วนำมาสลับกับตำแหน่งแรกของรอบนั้น การทำงานจะเป็น **O(n²)** เสมอไม่ว่าข้อมูลจะเรียงมาแล้วหรือไม่:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Selection Sort",
          c: `def selection_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
        },
        { t: "h2", c: "3. Insertion Sort (การแทรกไพ่ในมือ)" },
        {
          t: "p",
          c: "เสมือนการหยิบไพ่ทีละใบแล้วแทรกเข้าไปในตำแหน่งที่ถูกต้องของไพ่ที่เรียงแล้วในมือ **Insertion Sort มีประสิทธิภาพสูงมากเมื่อข้อมูลเกือบเรียงลำดับอยู่แล้ว (Almost Sorted)**:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Insertion Sort",
          c: `def insertion_sort(arr: list[int]) -> list[int]:
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # เลื่อนสมาชิกที่มากกว่า key ไปข้างหน้าหนึ่งตำแหน่ง
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch6-search": {
    slug: "dsa-ch6-search",
    title: {
      th: "Search Algorithms: Linear Search & Binary Search",
      en: "Search Algorithms: Linear Search vs Binary Search",
    },
    lead: {
      th: "ก้าวกระโดดจาก O(n) สู่ O(log n): เคล็ดลับแม่แบบการเขียน Binary Search ให้ไม่มีวันเกิด Off-by-one bug",
      en: "Leap from O(n) to O(log n): binary search templates and avoiding off-by-one errors.",
    },
    group: "บทที่ 6: การค้นหา, การจัดเรียงพื้นฐาน & ตารางแฮช (Searching, Sorting & Hash Tables)",
    blocks: {
      th: [
        { t: "h2", c: "Linear Search vs Binary Search" },
        {
          t: "p",
          c: "**Linear Search** เหมาะกับข้อมูลที่ไม่เรียงลำดับ ตรวจสอบทีละตัวจากซ้ายไปขวา (Time Complexity: O(n)) ส่วน **Binary Search** บังคับว่าข้อมูลต้อง **เรียงลำดับแล้ว (Sorted Array)** เท่านั้น โดยจะตัดข้อมูลทิ้งทีละครึ่งหนึ่งในแต่ละรอบ ทำให้ค้นหาข้อมูล 1 ล้านตัวได้ในเวลาไม่เกิน 20 ครั้ง! (Time Complexity: **O(log n)**)",
        },
        { t: "h2", c: "Binary Search Template มาตรฐานสำหรับการสอบสัมภาษณ์" },
        {
          t: "code",
          lang: "python",
          label: "Python: Binary Search (LeetCode 704)",
          c: `def binary_search(nums: list[int], target: int) -> int:
    left = 0
    right = len(nums) - 1
    
    while left <= right:
        # คำนวณ mid แบบปลอดภัยจาก Integer Overflow
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid  # เจอตำแหน่งของ target
        elif nums[mid] < target:
            left = mid + 1  # ข้อมูลเป้าหมายอยู่ครึ่งขวา
        else:
            right = mid - 1 # ข้อมูลเป้าหมายอยู่ครึ่งซ้าย
            
    return -1  # หาไม่พบ

data = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print("Index ของ 23 คือ:", binary_search(data, 23))  # Index: 5
print("Index ของ 50 คือ:", binary_search(data, 50))  # Index: -1`,
        },
        {
          t: "callout",
          title: "⚠️ Bug คลาสสิก: Integer Overflow ใน C++",
          c: "ใน C++ การเขียน `mid = (left + right) / 2;` อาจทำให้เกิดผลรวมล้นตัวแปร int (Overflow เกิน 2×10⁹) ในการสัมภาษณ์งานให้เขียน `mid = left + (right - left) / 2;` เสมอ เพื่อแสดงความรอบคอบระดับมืออาชีพ!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch6-hash-table": {
    slug: "dsa-ch6-hash-table",
    title: {
      th: "Hash Table: ตารางแฮช & Hash Map O(1)",
      en: "Hash Table: O(1) Lookups & Collision Resolution",
    },
    lead: {
      th: "โครงสร้างข้อมูลที่ใช้บ่อยที่สุดในโลกสัมภาษณ์งาน: Hash Function, Collision Resolution (Chaining) และโจทย์ตำนาน Two Sum",
      en: "The most vital interview data structure: Hash functions, collision resolution, and LeetCode #1: Two Sum.",
    },
    group: "บทที่ 6: การค้นหา, การจัดเรียงพื้นฐาน & ตารางแฮช (Searching, Sorting & Hash Tables)",
    blocks: {
      th: [
        { t: "h2", c: "Hash Table ทำงานอย่างไรให้ได้ O(1)?" },
        {
          t: "p",
          c: "**Hash Table (หรือ Dictionary / Hash Map)** รับค่า Key (เช่น ข้อความ) แล้วส่งผ่าน **Hash Function** เพื่อคำนวณออกมาเป็นดัชนีตัวเลข (Index) ของอาร์เรย์ในหน่วยความจำ ทำให้การค้นหา, แทรก, และลบ ทำได้ในเวลาเฉลี่ย **O(1) Average Time**:",
        },
        {
          t: "code",
          lang: "text",
          label: "การทำงานของ Hash Function",
          c: `Key: "apple"  -> Hash Function -> Index: 3 -> Buckets[3] = 45 บาท
Key: "banana" -> Hash Function -> Index: 7 -> Buckets[7] = 20 บาท`,
        },
        { t: "h2", c: "การแก้ปัญหาเมื่อคีย์ชนกัน (Collision Resolution)" },
        {
          t: "ul",
          c: [
            "**Separate Chaining**: เมื่อสองคีย์ได้ Hash Index เดียวกัน ให้เก็บข้อมูลเป็น Linked List ซ้อนอยู่ในช่องนั้น (วิธีนี้เป็นที่นิยมที่สุด)",
            "**Open Addressing (Linear Probing)**: ถ้าช่องนั้นเต็ม ให้ขยับไปหาช่องว่างช่องถัดไป",
          ],
        },
        { t: "h2", c: "โจทย์อันดับ 1 ของโลกสัมภาษณ์: Two Sum (LeetCode 1)" },
        {
          t: "p",
          c: "หาคู่ของตัวเลขในอาร์เรย์ที่บวกกันแล้วได้เท่ากับค่า `target` แทนที่จะใช้ลูปซ้อนกัน O(n²) เราสามารถใช้ Hash Map จำตัวเลขที่เคยเห็นมาแล้วเพื่อตอบได้ใน **O(n) Time และ O(n) Space**:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Two Sum ด้วย Hash Map (O(n))",
          c: `def two_sum(nums: list[int], target: int) -> list[int]:
    # เก็บ mapping: {ค่าตัวเลข: index ของตัวเลขนั้น}
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num  # หาค่าที่ต้องการเพื่อรวมได้ target
        
        if complement in seen:
            return [seen[complement], i]
            
        seen[num] = i
        
    return []

print(two_sum([2, 7, 11, 15], 9))  # [0, 1] เพราะ 2 + 7 = 9`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Two Sum ด้วย std::unordered_map",
          c: `#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
        },
      ],
      en: [],
    },
  },
};
