import type { Page } from "@/lib/types";

export const chapter09Pages: Record<string, Page> = {
  "dsa-ch9-intro": {
    slug: "dsa-ch9-intro",
    title: {
      th: "Divide & Conquer: กลยุทธ์แบ่งแยกและเอาชนะ",
      en: "Divide & Conquer: Paradigm & Recurrence Relations",
    },
    lead: {
      th: "กระบวนการ 3 ขั้นตอน: แบ่งปัญหาใหญ่ออกเป็นปัญหาย่อย -> แก้ปัญหาย่อย -> รวมคำตอบเข้าด้วยกัน",
      en: "Master the 3-step paradigm: Divide into independent subproblems, Conquer recursively, and Combine.",
    },
    group: "บทที่ 8: การแบ่งแยกและเอาชนะ & การจัดเรียงขั้นสูง (Divide & Conquer & Fast Sorts)",
    blocks: {
      th: [
        {
          t: "p",
          c: "**Divide and Conquer (การแบ่งแยกและเอาชนะ)** คือกระบวนทัศน์การออกแบบอัลกอริทึมที่ทรงพลังที่สุดอันหนึ่ง โดยแบ่งการทำงานออกเป็น 3 ขั้นตอนหลัก:",
        },
        {
          t: "ol",
          c: [
            "**1. Divide (แบ่ง)**: แบ่งปัญหาขนาดใหญ่ n ออกเป็นปัญหาย่อยๆ ที่มีรูปแบบเหมือนกันแต่มีขนาดเล็กลง (เช่น ตัดครึ่งซ้ายและขวา)",
            "**2. Conquer (แก้)**: แก้ปัญหาย่อยเหล่านั้นด้วย Recursion จนกระทั่งถึง Base Case ที่สามารถตอบได้ทันที",
            "**3. Combine (รวม)**: นำผลลัพธ์จากปัญหาย่อยมาผสานรวมกันเป็นคำตอบของปัญหาใหญ่ดั้งเดิม",
          ],
        },
        {
          t: "callout",
          title: "💡 ความต่างระหว่าง Divide & Conquer กับ Dynamic Programming",
          c: "Divide and Conquer จะใช้เมื่อปัญหาย่อย **เป็นอิสระต่อกัน (Independent Subproblems)** เช่น ครึ่งซ้ายกับครึ่งขวาของ Merge Sort ไม่เกี่ยวกันเลย แต่ถ้าปัญหาย่อยมีส่วนที่ **ทับซ้อนกันซ้ำๆ (Overlapping Subproblems)** เช่น Fibonacci หรือ Knapsack เราต้องใช้ Dynamic Programming เพื่อจดจำคำตอบ",
        },
      ],
      en: [],
    },
  },

  "dsa-ch9-basic": {
    slug: "dsa-ch9-basic",
    title: {
      th: "Algorithm พื้นฐาน: Merge Sort & Quick Sort",
      en: "Core Algorithms: Merge Sort and Quick Sort Deep Dive",
    },
    lead: {
      th: "เจาะลึก 2 อัลกอริทึมการจัดเรียงระดับ O(n log n): การ Merge สองอาร์เรย์ที่เรียงแล้ว และการ Partitioning ของ Quick Sort",
      en: "Comprehensive analysis of O(n log n) sorts: stable Merge Sort vs in-place Quick Sort.",
    },
    group: "บทที่ 8: การแบ่งแยกและเอาชนะ & การจัดเรียงขั้นสูง (Divide & Conquer & Fast Sorts)",
    blocks: {
      th: [
        { t: "h2", c: "1. Merge Sort (เสถียรและรับประกัน O(n log n) เสมอ)" },
        {
          t: "p",
          c: "Merge Sort แบ่งอาร์เรย์ออกเป็น 2 ซีกเท่าๆ กัน จนเหลือตัวเดียว แล้วนำมา 'ผสาน' (**Merge**) คืนด้วยความเร็ว O(n):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Merge Sort สมบูรณ์",
          c: `def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
        
    mid = len(arr) // 2
    left_half = merge_sort(arr[:mid])    # Divide & Conquer ซีกซ้าย
    right_half = merge_sort(arr[mid:])   # Divide & Conquer ซีกขวา
    
    return merge(left_half, right_half)  # Combine

def merge(left: list[int], right: list[int]) -> list[int]:
    merged = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
            
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))`,
        },
        { t: "h2", c: "2. Quick Sort (In-place Partitioning)" },
        {
          t: "p",
          c: "Quick Sort เลือกค่าหนึ่งตัวเป็น **Pivot** แล้วจัดเรียงให้ตัวที่น้อยกว่า Pivot อยู่ทางซ้าย และตัวที่มากกว่าอยู่ทางขวา (**Partitioning**):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Quick Sort (In-Place)",
          c: `def quick_sort(arr: list[int], low: int, high: int) -> None:
    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)

def partition(arr: list[int], low: int, high: int) -> int:
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

nums = [10, 80, 30, 90, 40, 50, 70]
quick_sort(nums, 0, len(nums) - 1)
print(nums)  # [10, 30, 40, 50, 70, 80, 90]`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch9-problem": {
    slug: "dsa-ch9-problem",
    title: {
      th: "Divide & Conquer: โจทย์ปัญหาและการประยุกต์",
      en: "Divide & Conquer Applications: Quickselect & Fast Pow",
    },
    lead: {
      th: "ประยุกต์กับโจทย์สัมภาษณ์: Quickselect หาค่าอันดับที่ K ใน O(n) average (LeetCode 215) และ Binary Exponentiation O(log n)",
      en: "Practical interview applications: Quickselect for Kth largest in O(n) and Fast Power in O(log n).",
    },
    group: "บทที่ 8: การแบ่งแยกและเอาชนะ & การจัดเรียงขั้นสูง (Divide & Conquer & Fast Sorts)",
    blocks: {
      th: [
        { t: "h2", c: "1. Binary Exponentiation: Pow(x, n) ใน O(log n)" },
        {
          t: "p",
          c: "การคำนวณ xⁿ ปกติใช้เวลา O(n) แต่ด้วย Divide and Conquer เราคำนวณ `x^(n/2) * x^(n/2)` ซึ่งลดเวลาลงเหลือ **O(log n)** (LeetCode 50):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Pow(x, n) O(log n)",
          c: `def my_pow(x: float, n: int) -> float:
    if n == 0:
        return 1.0
    if n < 0:
        x = 1 / x
        n = -n
        
    half = my_pow(x, n // 2)
    if n % 2 == 0:
        return half * half
    return half * half * x

print(my_pow(2.0, 10))  # 1024.0`,
        },
        { t: "h2", c: "2. Quickselect: หาตัวเลขมากสุดอันดับที่ K (LeetCode 215)" },
        {
          t: "p",
          c: "แทนที่จะต้องเรียงทั้งอาร์เรย์ O(n log n) เราใช้หลักการ Partition ของ Quick Sort เลือกค้นหาเฉพาะข้างที่มีอันดับเป้าหมาย ทำให้ได้เวลาเฉลี่ย **O(n) Average Time**:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Kth Largest Element (Quickselect)",
          c: `import random

def find_kth_largest(nums: list[int], k: int) -> int:
    target_idx = len(nums) - k  # แปลงเป็น index ในแบบ sorted array
    
    def quickselect(left: int, right: int) -> int:
        pivot_idx = random.randint(left, right)
        pivot = nums[pivot_idx]
        nums[pivot_idx], nums[right] = nums[right], nums[pivot_idx]
        
        p = left
        for i in range(left, right):
            if nums[i] <= pivot:
                nums[p], nums[i] = nums[i], nums[p]
                p += 1
        nums[p], nums[right] = nums[right], nums[p]
        
        if p == target_idx:
            return nums[p]
        elif p < target_idx:
            return quickselect(p + 1, right)
        else:
            return quickselect(left, p - 1)
            
    return quickselect(0, len(nums) - 1)

print(find_kth_largest([3, 2, 1, 5, 6, 4], 2))  # 5 (อันดับที่ 2)`,
        },
      ],
      en: [],
    },
  },
};
