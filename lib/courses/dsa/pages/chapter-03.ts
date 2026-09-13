import type { Page } from "@/lib/types";

export const chapter03Pages: Record<string, Page> = {
  "dsa-ch3-intro": {
    slug: "dsa-ch3-intro",
    title: {
      th: "คิดแบบ Software Engineer: UMPIRE Framework",
      en: "Thinking Like a Software Engineer: The UMPIRE Framework",
    },
    lead: {
      th: "กระบวนการ 6 ขั้นตอนในการแก้โจทย์ปัญหาทางเทคนิคอย่างเป็นระบบ และการสื่อสารกระบวนการคิดในห้องสัมภาษณ์งาน",
      en: "A 6-step systematic framework for technical problem solving and effective communication in coding interviews.",
    },
    group: "บทที่ 3: ศิลปะการแก้โจทย์ปัญหา (Problem Solving Mastery)",
    blocks: {
      th: [
        {
          t: "p",
          c: "ข้อผิดพลาดที่ร้ายแรงที่สุดของผู้เข้าสอบสัมภาษณ์คือ **'การรีบพิมพ์โค้ดทันทีที่อ่านโจทย์จบ'** ในสายตาของผู้สัมภาษณ์ระดับบริษัทเทคโนโลยีชั้นนำ (Google, Meta, Amazon) การกระทำนี้แสดงถึงความใจร้อน ขาดการวางแผน และไม่สื่อสารกับทีมงาน\n\nเพื่อเปลี่ยนคุณให้กลายเป็นผู้แก้ปัญหาที่มีระเบียบแบบแผน เราจะใช้ **UMPIRE Framework** ซึ่งเป็นมาตรฐานสากลในการแก้โจทย์วิศวกรรม:",
        },
        {
          t: "table",
          head: ["ขั้นตอน", "เป้าหมายหลัก", "คำถามสำคัญที่ต้องถามผู้สัมภาษณ์"],
          rows: [
            ["**1. Understand**", "ทำความเข้าใจโจทย์ให้กระจ่าง 100%", "ข้อมูลนำเข้าเป็นอะไร? มีค่าติดลบหรือไม่? อาเรย์ว่างเปล่าได้ไหม? มีข้อมูลซ้ำหรือไม่?"],
            ["**2. Match**", "เทียบเคียงกับ Pattern และ Data Structure ที่รู้จัก", "ปัญหานี้คล้ายกับ Two Pointers, Hash Table, Sliding Window หรือ Sorting?"],
            ["**3. Plan**", "วางแผนอัลกอริทึมและทดสอบด้วยมือ (Dry Run)", "เขียนขั้นตอนทีละบรรทัดบนกระดาษ หรือพิมพ์เป็นคอมเมนต์ Pseudo-code สั้นๆ"],
            ["**4. Implement**", "ลงมือเขียนโค้ดที่สะอาดและอ่านง่าย", "ตั้งชื่อตัวแปรให้สื่อความหมาย หลีกเลี่ยงตัวแปรตัวเดียวอย่าง `x, y, z`"],
            ["**5. Review**", "ตรวจทานโค้ดทีละบรรทัดด้วย Edge Cases", "ทดสอบกับกรณี $N=0$, $N=1$, ตัวเลขติดลบ, และกรณีที่มีข้อมูลซ้ำ"],
            ["**6. Evaluate**", "วิเคราะห์ Time & Space Complexity", "บอกผู้สัมภาษณ์ว่าโค้ดทำงานใน $O(\\dots)$ Time และ $O(\\dots)$ Space และมีจุดปรับปรุงอย่างไร"],
          ],
        },
        {
          t: "callout",
          title: "💡 เคล็ดลับทองคำ: Think Out Loud",
          c: "ในห้องสัมภาษณ์จริง หากคุณนั่งเงียบเกิน 1 นาที ผู้สัมภาษณ์จะไม่สามารถให้คะแนนกระบวนการคิดของคุณได้ ให้พูดสิ่งที่คุณกำลังคิดออกมาเสมอ เช่น *'ตอนนี้ผมกำลังคิดว่าถ้าใช้วิธี Brute Force จะใช้ O(n²) แต่เราสามารถลดเวลาเหลือ O(n) ได้ถ้าใช้ Hash Map...'*",
        },
      ],
      en: [],
    },
  },

  "dsa-ch3-number-problem": {
    slug: "dsa-ch3-number-problem",
    title: {
      th: "โจทย์ตัวเลข & คณิตศาสตร์ (Digit Extraction, Prime, Palindrome)",
      en: "Number & Math Problems: Digit Manipulation, Primes & Palindromes",
    },
    lead: {
      th: "เทคนิคการแกะตัวเลขทีละหลัก (% 10 และ // 10), การตรวจสอบจำนวนเฉพาะแบบ O(√n), และการแก้โจทย์ Palindrome Number โดยไม่แปลงเป็น String",
      en: "Master digit extraction with modulo/division, O(√n) prime checking, and Palindrome Number without string conversion.",
    },
    group: "บทที่ 3: ศิลปะการแก้โจทย์ปัญหา (Problem Solving Mastery)",
    blocks: {
      th: [
        { t: "h2", c: "1. การแกะตัวเลขทีละหลัก (The Digit Extraction Pattern)" },
        {
          t: "p",
          c: "รูปแบบคลาสสิกที่สุดในการจัดการตัวเลขคือ การดึงหลักหน่วยออกด้วย Modulo 10 (`n % 10`) แล้วตัดหลักหน่วยทิ้งด้วย Floor Division 10 (`n // 10`):",
        },
        {
          t: "code",
          lang: "text",
          label: "การทำงานของ % 10 และ // 10 กับเลข 1234",
          c: `รอบที่ 1: 1234 % 10 = 4 (ดึงหลักหน่วย) -> 1234 // 10 = 123
รอบที่ 2:  123 % 10 = 3 (ดึงหลักสิบ)   ->  123 // 10 = 12
รอบที่ 3:   12 % 10 = 2 (ดึงหลักร้อย)  ->   12 // 10 = 1
รอบที่ 4:    1 % 10 = 1 (ดึงหลักพัน)   ->    1 // 10 = 0 (จบการทำงาน!)`,
        },
        {
          t: "code",
          lang: "python",
          label: "Python: กลับตัวเลข (Reverse Integer - LeetCode 7)",
          c: `def reverse_integer(x: int) -> int:
    sign = -1 if x < 0 else 1
    x = abs(x)
    reversed_num = 0
    
    while x > 0:
        digit = x % 10
        # ต่อตัวเลขใหม่โดยคูณ 10 แล้วบวกหลักใหม่เข้าไป
        reversed_num = (reversed_num * 10) + digit
        x //= 10
        
    result = sign * reversed_num
    
    # ป้องกัน 32-bit Integer Overflow
    if result < -2**31 or result > 2**31 - 1:
        return 0
    return result

print(reverse_integer(1234))   # 4321
print(reverse_integer(-567))   # -765`,
        },
        { t: "h2", c: "2. การตรวจ Palindrome Number โดยไม่แปลงเป็น String (LeetCode 9)" },
        {
          t: "p",
          c: "ผู้สัมภาษณ์มักมีเงื่อนไขเพิ่มเติมว่า: *'ห้ามแปลงตัวเลขเป็นสตริง (`str(x)`) เด็ดขาด'* วิธีแก้คือการกลับตัวเลขเฉพาะครึ่งหลังแล้วนำมาเทียบกับครึ่งแรก:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Palindrome Number แบบ O(1) Space",
          c: `class Solution {
public:
    bool isPalindrome(int x) {
        // ตัวเลขติดลบ หรือ ลงท้ายด้วย 0 (ยกเว้น 0 ตัวเดียว) ไม่ใช่ Palindrome แน่นอน
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        
        int revertedNumber = 0;
        // กลับเฉพาะครึ่งหลังของตัวเลข
        while (x > revertedNumber) {
            revertedNumber = (revertedNumber * 10) + (x % 10);
            x /= 10;
        }
        
        // กรณีจำนวนหลักเป็นคู่ (x == revertedNumber)
        // หรือจำนวนหลักเป็นคี่ (x == revertedNumber / 10 ตัดหลักตรงกลางทิ้ง)
        return x == revertedNumber || x == revertedNumber / 10;
    }
};`,
        },
        { t: "h2", c: "3. การตรวจจำนวนเฉพาะแบบ O(√n) (Prime Checking)" },
        {
          t: "p",
          c: "เราไม่จำเป็นต้องตรวจตัวหารตั้งแต่ 2 ถึง $n-1$ เพราะตัวประกอบของ $n$ จะจับคู่กันเสมอ โดยมีจุดกึ่งกลางอยู่ที่ $\\sqrt{n}$ หากไม่มีตัวหารใดลงตัวในช่วง $2$ ถึง $\\lfloor\\sqrt{n}\\rfloor$ ตัวเลขนั้นย่อมเป็นจำนวนเฉพาะแน่นอน:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: ตรวจสอบจำนวนเฉพาะ O(√n)",
          c: `def is_prime(n: int) -> bool:
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
        
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

print(is_prime(29))  # True
print(is_prime(100)) # False`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch3-array-problem": {
    slug: "dsa-ch3-array-problem",
    title: {
      th: "โจทย์อาร์เรย์พื้นฐาน (Traversal, In-Place Reversal, Two Sum)",
      en: "Array Problems: Traversal, In-Place Swapping & Two Sum",
    },
    lead: {
      th: "เทคนิคการท่องอาร์เรย์แบบ Single Pass, การกลับข้อมูลแบบ In-Place โดยไม่สร้างอาร์เรย์ใหม่, และวิวัฒนาการของโจทย์ Two Sum",
      en: "Master single-pass array traversal, in-place pointer swapping, and the evolution of Two Sum from brute force to hash map.",
    },
    group: "บทที่ 3: ศิลปะการแก้โจทย์ปัญหา (Problem Solving Mastery)",
    blocks: {
      th: [
        { t: "h2", c: "1. การหาค่า Min, Max และ Average ในรอบเดียว (Single Pass O(n))" },
        {
          t: "p",
          c: "หลีกเลี่ยงการวนลูปซ้ำซ้อนหลายรอบ การสแกนข้อมูลผ่านอาร์เรย์เพียงรอบเดียว (**Single Pass**) สามารถเก็บสถิติที่จำเป็นได้ทั้งหมด:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Single Pass Traversal",
          c: `def array_statistics(nums: list[int]) -> dict:
    if not nums:
        return {}
        
    curr_min = nums[0]
    curr_max = nums[0]
    total_sum = 0
    
    for x in nums:
        if x < curr_min:
            curr_min = x
        if x > curr_max:
            curr_max = x
        total_sum += x
        
    return {
        "min": curr_min,
        "max": curr_max,
        "avg": total_sum / len(nums)
    }`,
        },
        { t: "h2", c: "2. การกลับข้อมูลแบบ In-Place (Two Pointers Reverse)" },
        {
          t: "p",
          c: "ในการสอบสัมภาษณ์ โจทย์มักกำหนดให้ประหยัดหน่วยความจำแบบ **$O(1)$ Space** การใช้เทคนิค Two Pointers (หัวและท้าย) สลับตำแหน่งเข้าหากันคือวิธีที่สง่างามที่สุด:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: In-Place Array Reversal",
          c: `#include <iostream>
#include <vector>
using namespace std;

void reverseArray(vector<int>& arr) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left < right) {
        // สลับค่าระหว่าง left และ right
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
}`,
        },
        { t: "h2", c: "3. โจทย์อมตะ Two Sum (LeetCode 1): จาก Brute Force สู่ O(n)" },
        {
          t: "p",
          c: "โจทย์ให้หา Index ของตัวเลข 2 ตัวในอาร์เรย์ที่บวกกันได้ค่า `target`:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Two Sum ด้วย Hash Map O(n) Time, O(n) Space",
          c: `def two_sum(nums: list[int], target: int) -> list[int]:
    # เก็บค่าที่เคยเจอแล้วเป็น {ตัวเลข: index}
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num # ตัวเลขคู่ที่ต้องการ
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
        
    return []

print(two_sum([2, 7, 11, 15], 9)) # [0, 1] เพราะ 2 + 7 = 9`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch3-string-problem": {
    slug: "dsa-ch3-string-problem",
    title: {
      th: "โจทย์สตริง & ข้อความ (Immutability, Anagram, Palindrome)",
      en: "String Problems: Immutability, Anagrams & Palindromes",
    },
    lead: {
      th: "ทำความเข้าใจธรรมชาติของสตริงในหน่วยความจำ กับดัก O(n²) จากการต่อสตริงในลูป, และเทคนิค Frequency Array สำหรับตรวจสอบ Anagram",
      en: "Understand string immutability, the O(n²) string concatenation trap, and frequency array hashing for anagram verification.",
    },
    group: "บทที่ 3: ศิลปะการแก้โจทย์ปัญหา (Problem Solving Mastery)",
    blocks: {
      th: [
        { t: "h2", c: "กับดัก String Immutability และการต่อสตริงใน Loop" },
        {
          t: "p",
          c: "ในภาษาอย่าง Python หรือ Java **สตริงเป็น Immutable (แก้ไขข้อมูลข้างในไม่ได้)** เมื่อคุณเขียนโค้ดต่อสตริงในลูป:",
        },
        {
          t: "code",
          lang: "python",
          label: "กับดัก O(n²) ที่ทำให้โค้ดช้าลงอย่างมหาศาล",
          c: `# อย่าทำแบบนี้เด็ดขาด! Time Complexity: O(n²)
result = ""
for char in large_text:
    result += char # ทุกครั้งที่ += จะต้องจองหน่วยความจำใหม่และคัดลอกสตริงเดิมทั้งหมด!

# วิธีที่ถูกต้องแบบมืออาชีพ: O(n) Time
chunks = []
for char in large_text:
    chunks.append(char)
result = "".join(chunks) # รวมร่างรวดเดียวจบใน O(n)`,
        },
        { t: "h2", c: "1. Valid Palindrome (LeetCode 125)" },
        {
          t: "p",
          c: "ตรวจสอบว่าข้อความเป็น Palindrome หรือไม่ โดยสนใจเฉพาะตัวอักษรภาษาอังกฤษและตัวเลข (Alphanumeric) และไม่สนตัวพิมพ์เล็ก-ใหญ่:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Valid Palindrome ด้วย Two Pointers O(n) Time, O(1) Space",
          c: `def is_valid_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    
    while left < right:
        # ข้ามอักขระพิเศษและช่องว่าง
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
            
        if s[left].lower() != s[right].lower():
            return False
            
        left += 1
        right -= 1
        
    return True

print(is_valid_palindrome("A man, a plan, a canal: Panama")) # True`,
        },
        { t: "h2", c: "2. Valid Anagram (LeetCode 242)" },
        {
          t: "p",
          c: "Anagram คือคำสองคำที่มีตัวอักษรชุดเดียวกันเป๊ะ เพียงแค่สลับตำแหน่ง เราสามารถแก้ได้ด้วย **Frequency Counting Array ขนาด 26 ตัว** โดยไม่ต้องเสียเวลา Sort ให้เป็น $O(n \\log n)$:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Valid Anagram ด้วย Frequency Array O(n) Time, O(1) Space",
          c: `#include <string>
#include <vector>
using namespace std;

bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    
    // ตารางความถี่ 26 ช่องสำหรับ 'a' ถึง 'z'
    vector<int> count(26, 0);
    
    for (int i = 0; i < s.length(); i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    
    // หากเป็น Anagram ทุกช่องต้องกลับมาเป็น 0 ทั้งหมด
    for (int c : count) {
        if (c != 0) return false;
    }
    return true;
}`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch3-summary": {
    slug: "dsa-ch3-summary",
    title: {
      th: "สรุปแบบแผนแก้ปัญหา & เช็คลิสต์ Edge Cases",
      en: "Problem Solving Summary & Edge Case Verification Checklist",
    },
    lead: {
      th: "รวมเช็คลิสต์ตรวจทานโค้ดก่อนกด Submit หรือส่งงานผู้สัมภาษณ์ เพื่อป้องกันบั๊ก Corner Case ที่พบบ่อยที่สุด",
      en: "Essential edge-case checklist and mental models to verify code before submitting to interviewers.",
    },
    group: "บทที่ 3: ศิลปะการแก้โจทย์ปัญหา (Problem Solving Mastery)",
    blocks: {
      th: [
        { t: "h2", c: "เช็คลิสต์ Edge Cases ที่ต้องตรวจทานเสมอ (The Holy Checklist)" },
        {
          t: "table",
          head: ["หมวดหมู่ข้อมูล", "Edge Case ที่มักทำให้โค้ดพัง", "วิธีป้องกัน / จัดการ"],
          rows: [
            ["**Array / List**", "Array ว่างเปล่า (`len == 0`) หรือมีแค่ตัวเดียว (`len == 1`)", "ใส่ Guard Clause ที่ต้นฟังก์ชัน `if not nums: return ...`"],
            ["**Array / List**", "สมาชิกทุกตัวใน Array มีค่าเท่ากันหมด (เช่น `[5, 5, 5, 5]`)", "ทดสอบกับลูป Two Pointers หรือ Quick Sort ว่าเกิด Infinite Loop หรือไม่"],
            ["**Numbers**", "ตัวเลขติดลบ หรือค่า 0", "ตรวจเงื่อนไข Modulo `%` และกรณี `abs(x)`"],
            ["**Numbers**", "ผลคูณหรือผลบวกล้น 32-bit Integer (`> 2 × 10⁹`)", "ใน C++ ให้เปลี่ยนเป็น `long long` ทันที"],
            ["**Strings**", "สตริงว่าง (`\"\"`), ช่องว่างล้วน (`\"   \"`), หรือไม่มีตัวอักษรภาษาอังกฤษ", "เช็คขอบเขตของ Index ก่อนเข้าถึง `s[i]` เสมอ"],
            ["**Pointers / Indices**", "Off-by-one Error (เผลอเข้าถึง Index ที่ $N$)", "ตรวจเช็คเงื่อนไขลูป `i < n` ไม่ใช่ `i <= n`"],
          ],
        },
        {
          t: "callout",
          title: "🚀 ก้าวต่อไปสู่บทที่ 4",
          c: "ตอนนี้คุณมีทั้งเข็มทิศวัดประสิทธิภาพ (Big-O) และกรอบความคิดในการแก้โจทย์ปัญหาแล้ว ในบทต่อไป เราจะเปิดฝาเครื่องคอมพิวเตอร์เพื่อดำดิ่งสู่ **หน่วยความจำ RAM, Pointer และ Dynamic Array** ซึ่งเป็นรากฐานของ Data Structures ทุกชนิดในโลก!",
        },
      ],
      en: [],
    },
  },
};
