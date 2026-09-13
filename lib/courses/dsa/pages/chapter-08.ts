import type { Page } from "@/lib/types";

export const chapter08Pages: Record<string, Page> = {
  "dsa-ch8-intro": {
    slug: "dsa-ch8-intro",
    title: {
      th: "ปรัชญา Divide & Conquer: เปลี่ยน O(n²) สู่ O(n log n)",
      en: "Divide & Conquer Philosophy: Transforming O(n²) into O(n log n)",
    },
    lead: {
      th: "กระบวนการ 3 ขั้นตอนในการแบ่งปัญหาใหญ่เป็นปัญหาย่อยที่เป็นอิสระต่อกัน และสัญชาตญาณเบื้องหลัง Master Theorem",
      en: "The 3-phase paradigm: Divide, Conquer, Combine, and intuitive derivations behind the Master Theorem.",
    },
    group: "บทที่ 8: การแบ่งแยกและเอาชนะ & การจัดเรียงขั้นสูง",
    blocks: {
      th: [
        {
          t: "p",
          c: "ในบทที่ 6 เราได้เห็นว่าอัลกอริทึมการเรียงข้อมูลพื้นฐาน (Bubble, Selection, Insertion) ล้วนติดหล่มอยู่ที่ความเร็ว **$O(n^2)$** ซึ่งไม่สามารถรับมือกับข้อมูลขนาดใหญ่ได้\n\nกระบวนทัศน์ **Divide and Conquer (แบ่งแยกและเอาชนะ)** คือการปฏิวัติครั้งสำคัญในวิทยาการคอมพิวเตอร์ ที่เปลี่ยนความเร็วของอัลกอริทึมให้ลดลงมาเหลือเพียง **$O(n \\log n)$** โดยแบ่งออกเป็น 3 ขั้นตอน:",
        },
        {
          t: "ol",
          c: [
            "**1. Divide (แบ่งแยก)**: หั่นปัญหาขนาด $N$ ออกเป็นปัญหาย่อยๆ ที่มีขนาดเล็กลง เช่น แบ่งอาร์เรย์ออกเป็น 2 ซีก ซีกละ $N/2$",
            "**2. Conquer (เอาชนะ)**: แก้ปัญหาย่อยแต่ละก้อนด้วยการเรียกตัวเอง (Recursion) ซ้ำลงไปเรื่อยๆ จนกระทั่งถึง Base Case (เช่น เมื่ออาร์เรย์เหลือข้อมูลแค่ 1 ตัว ซึ่งถือว่าเรียงเสร็จแล้วโดยปริยาย)",
            "**3. Combine (รวบรวม)**: นำผลลัพธ์จากปัญหาย่อยที่แก้เสร็จแล้ว มารวมร่างเข้าด้วยกันเพื่อเป็นคำตอบของปัญหาดั้งเดิม",
          ],
        },
        {
          t: "viz",
          id: "dsa-divide-conquer-tree",
        },
        {
          t: "callout",
          title: "💡 สัญชาตญาณคณิตศาสตร์: ทำไมถึงเป็น O(n log n)?",
          c: "- ความลึกของต้นไม้ (จำนวนชั้นที่หั่นครึ่งไปเรื่อยๆ): มีทั้งหมด **$\\log_2 N$ ชั้น**\n- งานที่ต้องทำในแต่ละชั้น (การกวาดรวมข้อมูล): รวมกันแล้วใช้เวลา **$O(n)$ เสมอ**\n- สรุปเวลารวม: $\\log N \\text{ ชั้น} \\times O(n) \\text{ ต่องานต่อชั้น} = \\mathbf{O(n \\log n)}$!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch8-basic": {
    slug: "dsa-ch8-basic",
    title: {
      th: "Merge Sort (Stable) & Quick Sort (In-Place Partitioning)",
      en: "High-Performance Sorts: Merge Sort vs Quick Sort in Production",
    },
    lead: {
      th: "ผ่าโครงสร้างสองมหาอำนาจแห่งการจัดเรียง: Merge Sort การันตี O(n log n) คงที่ vs Quick Sort ที่เร็วกว่าในระดับฮาร์ดแวร์ด้วย In-Place Partitioning",
      en: "Analyze the two sorting powerhouses: guaranteed stable O(n log n) Merge Sort vs cache-efficient in-place Quick Sort.",
    },
    group: "บทที่ 8: การแบ่งแยกและเอาชนะ & การจัดเรียงขั้นสูง",
    blocks: {
      th: [
        { t: "h2", c: "1. Merge Sort: เสถียร แม่นยำ การันตี O(n log n) ทุกกรณี" },
        {
          t: "p",
          c: "Merge Sort ใช้หลักการแบ่งครึ่งอาร์เรย์ แล้วเรียกฟังก์ชัน `merge()` โดยใช้เทคนิค Two Pointers ดึงตัวที่น้อยที่สุดจากสองซีกมาต่อในอาร์เรย์ชั่วคราว:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Merge Sort ฉบับสมบูรณ์",
          c: `def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
        
    mid = len(arr) // 2
    left_half = merge_sort(arr[:mid])
    right_half = merge_sort(arr[mid:])
    
    return merge(left_half, right_half)

def merge(left: list[int], right: list[int]) -> list[int]:
    result = []
    i = j = 0
    
    # ดึงตัวน้อยกว่าใส่ใน result ด้วย Two Pointers
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    # เก็บตกเศษที่เหลือ
    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))`,
        },
        { t: "h2", c: "2. Quick Sort: การแบ่งเขตด้วย Pivot (In-Place Partitioning)" },
        {
          t: "p",
          c: "Quick Sort เลือกสมาชิกตัวหนึ่งขึ้นมาเป็นแกนหมุน (**Pivot**) แล้วจัดระเบียบข้อมูลรอบ Pivot โดยตรงในหน่วยความจำเดิม (In-Place) ให้ตัวที่น้อยกว่าอยู่ฝั่งซ้าย และตัวที่มากกว่าอยู่ฝั่งขวา:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Quick Sort พร้อม Lomuto Partition Scheme",
          c: `#include <iostream>
#include <vector>
using namespace std;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high]; // เลือกตัวสุดท้ายเป็น Pivot
    int i = low - 1;       // i คือตัวชี้ขอบเขตของสมาชิกที่น้อยกว่า Pivot
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    // สลับ Pivot มาไว้ตรงกลางระหว่างสองกลุ่ม
    swap(arr[i + 1], arr[high]);
    return i + 1; // คืน Index ตำแหน่งจริงของ Pivot
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
        },
        { t: "h2", c: "ตารางเปรียบเทียบ Merge Sort vs Quick Sort" },
        {
          t: "table",
          head: ["คุณลักษณะ", "Merge Sort", "Quick Sort"],
          rows: [
            ["Time Complexity (Best / Avg)", "⚡ O(n log n)", "⚡ O(n log n)"],
            ["Time Complexity (Worst)", "⚡ O(n log n) Guaranteed!", "🐌 O(n²) (เมื่อเลือก Pivot ได้แย่ เช่น อาร์เรย์เรียงอยู่แล้ว)"],
            ["Auxiliary Space", "🐢 O(n) ต้องจองอาร์เรย์ชั่วคราว", "⚡ O(log n) ใช้เพียง Call Stack Space"],
            ["Stability (ความเสถียร)", "✅ Stable (ข้อมูลที่ค่าเท่ากัน จะไม่สลับลำดับเดิม)", "❌ Unstable"],
            ["ความเร็วบนฮาร์ดแวร์จริง", "ช้ากว่าเล็กน้อยเพราะมีการคัดลอกหน่วยความจำไปมา", "🔥 เร็วกว่ามากเพราะทำงาน In-Place และ Cache Locality ยอดเยี่ยม"],
          ],
        },
      ],
      en: [],
    },
  },

  "dsa-ch8-problem": {
    slug: "dsa-ch8-problem",
    title: {
      th: "Quickselect: หา K-th Element ใน O(n) Average Time",
      en: "Quickselect Algorithm: Linear Time Order Statistics & Fast Pow",
    },
    lead: {
      th: "ค้นหาสมาชิกที่มีค่าน้อยที่สุดหรือมากที่สุดอันดับที่ K ในอาร์เรย์ที่ไม่เรียงลำดับ โดยไม่ต้องเสียเวลา Sort ทั้งหมด ด้วยความเร็วเฉลี่ยระดับ O(n)",
      en: "Find the K-th largest or smallest element in unsorted arrays without full sorting, achieving O(n) average runtime.",
    },
    group: "บทที่ 8: การแบ่งแยกและเอาชนะ & การจัดเรียงขั้นสูง",
    blocks: {
      th: [
        { t: "h2", c: "ทำไมต้อง Quickselect? (LeetCode 215)" },
        {
          t: "p",
          c: "หากโจทย์ถามว่า: *'จงหาตัวเลขที่มีค่ามากที่สุดเป็นอันดับที่ K จากข้อมูล 1,000,000 ตัว'*\n- วิธีธรรมดา: สั่ง Sort ทั้งอาร์เรย์ จะใช้เวลา $O(n \\log n)$\n- **Quickselect**: อาศัยคุณสมบัติของ Partition ใน Quick Sort เมื่อ Pivot ตกที่ตำแหน่งใด ตำแหน่งนั้นคือตำแหน่งจริงของมัน! ทำให้เราสามารถ **ทิ้งอีกครึ่งหนึ่งไปได้เลยเหมือน Binary Search**!",
        },
        {
          t: "code",
          lang: "text",
          label: "การพิสูจน์ทางคณิตศาสตร์ว่า Quickselect ทำงานใน O(n) Average Time",
          c: `รอบที่ 1: สแกนข้อมูล N ตัว
รอบที่ 2: สแกนข้อมูล N/2 ตัว
รอบที่ 3: สแกนข้อมูล N/4 ตัว
รอบที่ 4: สแกนข้อมูล N/8 ตัว
...
ผลรวม = N + N/2 + N/4 + N/8 + ... = N * (1 + 1/2 + 1/4 + 1/8 + ...)
อนุกรมเรขาคณิตผลบวกมีค่าเท่ากับ 2
เวลารวมทั้งหมด = 2N = O(n) อย่างน่าอัศจรรย์!`,
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Quickselect Algorithm (K-th Largest Element)",
          c: `import random

def find_kth_largest(nums: list[int], k: int) -> int:
    target_idx = len(nums) - k  # แปลงเป็น Index จากน้อยไปมาก
    
    def quickselect(left: int, right: int) -> int:
        # สุ่ม Pivot เพื่อหลีกเลี่ยง Worst Case O(n^2)
        pivot_idx = random.randint(left, right)
        pivot = nums[pivot_idx]
        nums[pivot_idx], nums[right] = nums[right], nums[pivot_idx]
        
        # Partition
        i = left
        for j in range(left, right):
            if nums[j] < pivot:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1
        nums[i], nums[right] = nums[right], nums[i]
        
        # ตรวจสอบตำแหน่ง Pivot
        if i == target_idx:
            return nums[i]
        elif i < target_idx:
            return quickselect(i + 1, right)  # หาเฉพาะครึ่งขวา
        else:
            return quickselect(left, i - 1)   # หาเฉพาะครึ่งซ้าย
            
    return quickselect(0, len(nums) - 1)

print(find_kth_largest([3, 2, 1, 5, 6, 4], 2)) # 5 (อันดับ 2 คือ 5)`,
        },
        { t: "h2", c: "การประยุกต์ใช้: Fast Exponentiation (aⁿ ใน O(log n))" },
        {
          t: "p",
          c: "อีกหนึ่งตัวอย่างของการแบ่งแยกและเอาชนะคือการคำนวณเลขยกกำลัง $a^n$:\n- หากคูณตรงๆ: $a \\times a \\times a \\dots$ ใช้เวลา $O(n)$\n- แต่หากใช้ Divide & Conquer: $a^n = (a^{n/2})^2$ หาก $n$ เป็นคู่ จะลดเวลาเหลือเพียง **$O(\\log n)$** ทันที (LeetCode 50: Pow(x, n))",
        },
      ],
      en: [],
    },
  },
};
