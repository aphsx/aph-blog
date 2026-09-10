import type { Page } from "@/lib/types";

export const chapter02Pages: Record<string, Page> = {
  "dsa-ch2-intro": {
    slug: "dsa-ch2-intro",
    title: {
      th: "Problem Solving: เริ่มต้นการแก้โจทย์ปัญหา",
      en: "Problem Solving: Principles & Decomposition",
    },
    lead: {
      th: "กระบวนการคิดอย่างเป็นระบบ การวิเคราะห์ความต้องการของโจทย์ และขั้นตอนแปลงปัญหาเป็น Algorithm",
      en: "Learn systematic problem-solving frameworks: decomposing requirements and designing algorithms.",
    },
    group: "บทที่ 3: การฝึกแก้โจทย์ปัญหาเบื้องต้น",
    blocks: {
      th: [
        {
          t: "p",
          c: "การแก้โจทย์ปัญหา (**Problem Solving**) ในสายวิทยาการคอมพิวเตอร์และห้องสัมภาษณ์งาน ไม่ใช่การพยายามกระโดดลงไปพิมพ์โค้ดทันที แต่คือกระบวนการทำความเข้าใจปัญหาอย่างถ่องแท้ แล้วแตกโจทย์ออกเป็นขั้นตอนย่อย (**Decomposition**) ก่อนแปลงเป็นขั้นตอนการคำนวณที่คอมพิวเตอร์ทำตามได้ (**Algorithm**)",
        },
        { t: "h2", c: "กระบวนการ 4 ขั้นตอนในการแก้โจทย์สัมภาษณ์ (UMPIRE Framework)" },
        {
          t: "ol",
          c: [
            "**Understand (ทำความเข้าใจ)**: ถามคำถามเพื่อความชัดเจน เช่น ข้อมูลนำเข้าเป็นชนิดใด? เป็นไปได้ที่จะว่างเปล่า (Empty/None) หรือไม่? มีค่าติดลบหรือไม่? ค่าสูงสุดมีขนาดเท่าไร?",
            "**Match (เทียบเคียงรูปแบบ)**: ดูว่าโจทย์นี้คล้ายกับปัญหาประเภทใดที่เคยเจอ เช่น Array Traversal, Two Pointers, Hash Table หรือ Frequency Counting?",
            "**Plan (วางแผนและทดสอบด้วยมือ)**: คิดขั้นตอนและเขียนตัวอย่างทดสอบ (Test cases / Walkthrough) บนกระดาษหรือคอมเมนต์ในโค้ดก่อนลงมือเขียนฟังก์ชันจริง",
            "**Implement & Review (ลงมือเขียนโค้ดและตรวจทาน)**: เขียนโค้ดให้สะอาด มีชื่อตัวแปรที่สื่อความหมาย ตรวจสอบขอบเขต (Boundary / Edge cases) และวิเคราะห์ Time & Space Complexity",
          ],
        },
        {
          t: "callout",
          title: "💡 กฎทองในห้องสัมภาษณ์งาน",
          c: "ผู้สัมภาษณ์ไม่ได้มองหาคนที่พิมพ์โค้ดเร็วที่สุด แต่มองหาคนที่ 'สื่อสารกระบวนการคิด' (Communication & Problem Solving) ได้ชัดเจนที่สุด คิดอะไรอยู่ให้พูดออกมา (Think out loud) เสมอ",
        },
      ],
      en: [],
    },
  },

  "dsa-ch2-number-problem": {
    slug: "dsa-ch2-number-problem",
    title: {
      th: "Number Problem: โจทย์ตัวเลขและคณิตศาสตร์",
      en: "Number Problem: Math & Digit Manipulation",
    },
    lead: {
      th: "เทคนิคการจัดการตัวเลข การแกะทีละหลัก (Digit Extraction) การเช็คจำนวนเฉพาะ และฟีโบนักชี",
      en: "Master number manipulation: digit extraction, prime checks, factorials, and Fibonacci sequences.",
    },
    group: "บทที่ 3: การฝึกแก้โจทย์ปัญหาเบื้องต้น",
    blocks: {
      th: [
        { t: "h2", c: "1. การแยกตัวเลขทีละหลัก (Digit Extraction ด้วย % 10 และ // 10)" },
        {
          t: "p",
          c: "รูปแบบที่พบบ่อยที่สุดในการแก้โจทย์ตัวเลขคือการดึงหลักหน่วยออกมาด้วยการ Modulo 10 (`n % 10`) แล้วตัดหลักหน่วยทิ้งด้วยการหารปัดเศษ (`n // 10`):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: กลับตัวเลข (Reverse Integer / Palindrome Number)",
          c: `def reverse_number(n: int) -> int:
    """กลับตัวเลข เช่น 1234 -> 4321"""
    reversed_num = 0
    temp = abs(n)
    
    while temp > 0:
        digit = temp % 10          # ดึงหลักสุดท้าย
        reversed_num = (reversed_num * 10) + digit  # เลื่อนหลักแล้วบวกเข้า
        temp //= 10                 # ตัดหลักสุดท้ายทิ้ง
        
    return -reversed_num if n < 0 else reversed_num

def is_palindrome_number(x: int) -> bool:
    """LeetCode 9: ตรวจสอบว่าเป็น Palindrome หรือไม่ โดยไม่แปลงเป็น string"""
    if x < 0 or (x % 10 == 0 and x != 0):
        return False
    return x == reverse_number(x)

print(reverse_number(1234))           # 4321
print(is_palindrome_number(121))      # True
print(is_palindrome_number(-121))     # False`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Reverse Integer",
          c: `#include <iostream>
using namespace std;

int reverseNumber(int n) {
    long long reversedNum = 0;
    int temp = abs(n);
    while (temp > 0) {
        reversedNum = (reversedNum * 10) + (temp % 10);
        temp /= 10;
    }
    return (n < 0) ? -reversedNum : reversedNum;
}

int main() {
    cout << reverseNumber(1234) << "\\n"; // 4321
    return 0;
}`,
        },
        { t: "h2", c: "2. การตรวจสอบจำนวนเฉพาะ (Prime Number Check)" },
        {
          t: "p",
          c: "จำนวนเฉพาะ (Prime Number) คือจำนวนที่มีตัวหารลงตัวเพียง 1 และตัวมันเอง แทนที่จะวนลูปถึง n (O(n)) เราสามารถวนตรวจเฉพาะถึง √n ได้ ซึ่งลดเวลาลงเหลือ **O(√n)**:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: ตรวจสอบ Prime Number O(√n)",
          c: `import math

def is_prime(n: int) -> bool:
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
        
    # ตรวจสอบเฉพาะตัวเลขในรูป 6k ± 1 จนถึง sqrt(n)
    limit = int(math.isqrt(n))
    for i in range(5, limit + 1, 6):
        if n % i == 0 or n % (i + 2) == 0:
            return False
    return True

print(is_prime(29))  # True
print(is_prime(100)) # False`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch2-array-problem": {
    slug: "dsa-ch2-array-problem",
    title: {
      th: "Array Problem: โจทย์อาร์เรย์พื้นฐาน",
      en: "Array Problem: Traversals & In-place Operations",
    },
    lead: {
      th: "เทคนิคการค้นหาค่าสูงสุด ต่ำสุด ผลรวม การกลับอาร์เรย์ และเทคนิค Two Pointers เบื้องต้น",
      en: "Essential array algorithms: min/max searches, accumulations, reversals, and introductory two-pointers.",
    },
    group: "บทที่ 3: การฝึกแก้โจทย์ปัญหาเบื้องต้น",
    blocks: {
      th: [
        { t: "h2", c: "1. การหาค่าสูงสุดและต่ำสุด (Max / Min in One Pass)" },
        {
          t: "p",
          c: "การหาค่าสูงสุดหรือต่ำสุดในอาร์เรย์ทำได้ด้วยการวนลูปเพียง 1 รอบ (**One Pass: O(n) Time, O(1) Space**):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: หา Max & Min ใน 1 Pass",
          c: `def find_min_max(arr: list[int]) -> tuple[int, int]:
    if not arr:
        raise ValueError("Array must not be empty")
        
    min_val = arr[0]
    max_val = arr[0]
    
    for x in arr[1:]:
        if x > max_val:
            max_val = x
        elif x < min_val:
            min_val = x
            
    return min_val, max_val

nums = [34, 12, 89, 5, 43]
minimum, maximum = find_min_max(nums)
print(f"Min: {minimum}, Max: {maximum}")  # Min: 5, Max: 89`,
        },
        { t: "h2", c: "2. การกลับอาร์เรย์ (Reverse Array ด้วย Two Pointers)" },
        {
          t: "p",
          c: "แทนที่จะสร้างอาร์เรย์ใหม่ (เปลือง O(n) space) เราใช้สองตัวชี้ (**Two Pointers**) สลับค่าจากหัวและท้ายเข้าหากันในหน่วยความจำเดิม (**In-place O(1) space**):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: In-Place Reverse Array (Two Pointers)",
          c: `def reverse_array_inplace(arr: list[int]) -> None:
    left = 0
    right = len(arr) - 1
    
    while left < right:
        # สลับค่าระหว่างตัวหน้ากับตัวหลัง
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1

data = [10, 20, 30, 40, 50]
reverse_array_inplace(data)
print(data)  # [50, 40, 30, 20, 10]`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Two Pointers Reverse",
          c: `#include <iostream>
#include <vector>
using namespace std;

void reverseArray(vector<int>& arr) {
    int left = 0;
    int right = arr.size() - 1;
    while (left < right) {
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
}

int main() {
    vector<int> data = {10, 20, 30, 40, 50};
    reverseArray(data);
    for (int x : data) cout << x << " "; // 50 40 30 20 10
    cout << "\\n";
    return 0;
}`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch2-string-problem": {
    slug: "dsa-ch2-string-problem",
    title: {
      th: "String Problem: โจทย์ข้อความและการจัดการสตริง",
      en: "String Problem: Palindromes & Frequency Counting",
    },
    lead: {
      th: "โจทย์สตริงยอดนิยม: การตรวจสอบ Palindrome, Anagram, การนับความถี่ตัวอักษร และข้อควรระวังเรื่อง String Immutability",
      en: "Popular string interview patterns: palindrome checks, anagram detection, and frequency maps.",
    },
    group: "บทที่ 3: การฝึกแก้โจทย์ปัญหาเบื้องต้น",
    blocks: {
      th: [
        { t: "h2", c: "1. การตรวจสอบ Palindrome (Valid Palindrome)" },
        {
          t: "p",
          c: "สตริง Palindrome คือข้อความที่อ่านจากซ้ายไปขวา หรือขวาไปซ้ายก็มีลำดับอักขระเหมือนกัน เช่น `\"racecar\"`:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Valid Palindrome (LeetCode 125)",
          c: `def is_valid_palindrome(s: str) -> bool:
    # Two pointers วิ่งสวนกัน ไม่นับเว้นวรรคและสัญลักษณ์พิเศษ
    left, right = 0, len(s) - 1
    
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
            
        if s[left].lower() != s[right].lower():
            return False
            
        left += 1
        right -= 1
        
    return True

print(is_valid_palindrome("A man, a plan, a canal: Panama"))  # True
print(is_valid_palindrome("race a car"))                      # False`,
        },
        { t: "h2", c: "2. การตรวจสอบ Anagram (Valid Anagram)" },
        {
          t: "p",
          c: "สตริงสองตัวเป็น Anagram กันเมื่อทั้งสองมีตัวอักษรชุดเดียวกันและความถี่เท่ากัน เช่น `\"anagram\"` กับ `\"nagaram\"`:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Valid Anagram ด้วย Frequency Map (LeetCode 242)",
          c: `from collections import Counter

def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
        
    # ใช้ Counter (Hash Map) เพื่อนับความถี่ O(N) Time, O(1) Space (อักษร 26 ตัว)
    count = {}
    for char in s:
        count[char] = count.get(char, 0) + 1
        
    for char in t:
        if char not in count or count[char] == 0:
            return False
        count[char] -= 1
        
    return True

print(is_anagram("anagram", "nagaram"))  # True
print(is_anagram("rat", "car"))          # False`,
        },
        {
          t: "callout",
          title: "⚠️ String Immutability Trap ใน Python",
          c: "ใน Python สตริงเป็น **Immutable** (ไม่สามารถแก้ไขตัวอักษรทีละตำแหน่งได้ เช่น `s[0] = 'a'` จะ Error) การต่อสตริงในลูปด้วย `s += char` จะสร้างสตริงใหม่ทุกครั้ง ทำให้กลายเป็น O(n²) วิธีที่ถูกต้องคือเก็บอักขระใส่ list แล้วใช้ `''.join(list)` ซึ่งใช้เวลาเพียง O(n)",
        },
      ],
      en: [],
    },
  },

  "dsa-ch2-summary": {
    slug: "dsa-ch2-summary",
    title: {
      th: "สรุปการแก้ปัญหาพื้นฐาน & แบบฝึกหัด (Summary)",
      en: "Problem Solving Summary & Practice Checklist",
    },
    lead: {
      th: "สรุป Edge Cases ที่พบบ่อย ตารางสรุปเทคนิคพื้นฐาน และเช็คลิสต์เตรียมความพร้อมก่อนเข้าสู่ Data Structures",
      en: "Summary of common edge cases, problem-solving checklists, and mindset before learning data structures.",
    },
    group: "บทที่ 3: การฝึกแก้โจทย์ปัญหาเบื้องต้น",
    blocks: {
      th: [
        { t: "h2", c: "เช็คลิสต์ Edge Cases ที่ห้ามลืมถามในห้องสัมภาษณ์" },
        {
          t: "p",
          c: "ในการสอบสัมภาษณ์ เกือบ 50% ของบั๊กเกิดจากการลืมทดสอบ Edge Cases เหล่านี้:",
        },
        {
          t: "table",
          head: ["ชนิดข้อมูล", "Edge Cases สำคัญที่ต้องทดสอบ", "ตัวอย่าง"],
          rows: [
            ["จำนวนเต็ม (Integer)", "0, จำนวนติดลบ, ค่าสูงสุด/ต่ำสุด (Overflow)", "`0`, `-1`, `2³¹ - 1`"],
            ["อาร์เรย์ (Array / List)", "อาร์เรย์ว่าง, มีสมาชิกตัวเดียว, ข้อมูลซ้ำกันทั้งหมด", "`[]`, `[7]`, `[5, 5, 5]`"],
            ["สตริง (String)", "สตริงว่าง, มีแต่เว้นวรรค, ตัวพิมพ์เล็ก/ใหญ่ปนกัน", "`\"\"`, `\"   \"`, `\"AaBb\"`"],
            ["ตัวชี้ (Pointers / Objects)", "`None` / `nullptr`, ค่าสุดท้ายของ List", "`head is None`, `node.next is None`"],
          ],
        },
        { t: "h2", c: "สรุปกระบวนการคิดก่อนเริ่มบทถัดไป" },
        {
          t: "p",
          c: "ตอนนี้คุณมีพื้นฐานในการควบคุมลูป, การสร้างฟังก์ชัน, การดึงหลักตัวเลข, การท่องอาร์เรย์ด้วย Two Pointers, และการนับความถี่สตริงแล้ว ในบทถัดไปเราจะเจาะลึกเข้าไปดูว่าคอมพิวเตอร์จัดเก็บข้อมูลเหล่านี้ในหน่วยความจำ RAM อย่างไร ผ่านเรื่อง **Pointer, Dynamic Array และ OOP**",
        },
      ],
      en: [],
    },
  },
};
