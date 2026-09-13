import type { Page } from "@/lib/types";

export const chapter11Pages: Record<string, Page> = {
  "dsa-ch11-intro": {
    slug: "dsa-ch11-intro",
    title: {
      th: "กุญแจสู่ DP: Overlapping Subproblems & Optimal Substructure",
      en: "The Essence of Dynamic Programming: Overlapping Subproblems & Optimal Substructure",
    },
    lead: {
      th: "ทำความเข้าใจว่าทำไม Dynamic Programming ถึงเปลี่ยนอัลกอริทึมที่ช้าติดหล่ม O(2ⁿ) ให้กลายเป็นเร็วติดจรวด O(n) ด้วยศิลปะการไม่ทำงานซ้ำ",
      en: "Discover why Dynamic Programming transforms exponential O(2ⁿ) runtime into linear O(n) efficiency by eliminating redundant calculations.",
    },
    group: "บทที่ 11: กำหนดการพลวัต (Dynamic Programming)",
    blocks: {
      th: [
        {
          t: "p",
          c: "**Dynamic Programming (กำหนดการพลวัต)** มักถูกมองว่าเป็นหนึ่งในหัวข้อที่น่าสะพรึงกลัวที่สุดในการสอบสัมภาษณ์งาน แต่ในความเป็นจริง แก่นแท้ของมันถูกสรุปไว้อย่างเรียบง่ายโดยศาสตราจารย์ Richard Bellman ว่า:\n\n> *'คนที่จำอดีตไม่ได้ ย่อมถูกลงโทษให้ทำความผิดพลาดซ้ำรอยเดิม — ในโลกของคอมพิวเตอร์ คำตอบใดที่เคยคำนวณไปแล้ว จงบันทึกเก็บไว้ (Cache / Memoize) เพื่อที่จะได้ไม่ต้องคำนวณใหม่อีกเป็นครั้งที่สอง'*",
        },
        { t: "h2", c: "ตัวอย่างคลาสสิก: มหันตภัยของ Fibonacci แบบธรรมดา" },
        {
          t: "p",
          c: "หากเขียนฟังก์ชัน Fibonacci ด้วย Recursion ตรงๆ โดยไม่บันทึกคำตอบ ต้นไม้การคำนวณจะระเบิดออกเป็น **$O(2^n)$**:",
        },
        {
          t: "code",
          lang: "text",
          label: "การคำนวณซ้ำซ้อนอย่างบ้าคลั่งใน fib(5)",
          c: `                           fib(5)
                       /            \\
                fib(4)                fib(3)
               /      \\              /      \\
           fib(3)     fib(2)      fib(2)    fib(1)
          /      \\    /    \\      /    \\
      fib(2)   fib(1)fib(1)fib(0)fib(1)fib(0)
      /    \\
   fib(1) fib(0)

* สังเกตว่า: fib(3) ถูกคำนวณซ้ำ 2 ครั้ง, fib(2) ถูกคำนวณซ้ำ 3 ครั้ง!
* เมื่อคำนวณ fib(50) จะต้องคำนวณซ้ำถึง 1,125,899,906,842,624 รอบ (คอมพิวเตอร์ค้างทันที!)`,
        },
        { t: "h2", c: "เงื่อนไข 2 ประการที่โจทย์ต้องมี จึงจะใช้ DP ได้" },
        {
          t: "ol",
          c: [
            "**1. Overlapping Subproblems (ปัญหาย่อยที่ซ้ำซ้อน)**: ปัญหาใหญ่สามารถแตกออกเป็นปัญหาย่อยๆ ที่ 'หน้าตาเหมือนเดิมเป๊ะ' และถูกเรียกใช้งานซ้ำแล้วซ้ำเล่า",
            "**2. Optimal Substructure (โครงสร้างคำตอบที่ดีที่สุด)**: คำตอบที่ดีที่สุดของปัญหาใหญ่ สามารถสร้างขึ้นจากคำตอบที่ดีที่สุดของปัญหาย่อยได้โดยตรง (เช่น $fib(n) = fib(n-1) + fib(n-2)$ หรือระยะทางสั้นสุด)",
          ],
        },
        {
          t: "callout",
          title: "🎯 ความแตกต่างระหว่าง Divide & Conquer กับ Dynamic Programming",
          c: "- **Divide & Conquer (เช่น Merge Sort)**: ปัญหาย่อยจะ 'เป็นอิสระต่อกัน' (Independent) ไม่มีการคำนวณซ้ำกัน\n- **Dynamic Programming (เช่น Knapsack / Shortest Path)**: ปัญหาย่อยจะ 'ซ้ำซ้อนเกี่ยวพันกัน' (Overlapping) จึงต้องใช้ตารางแคชเพื่อเก็บคำตอบไว้",
        },
      ],
      en: [],
    },
  },

  "dsa-ch11-main-concept": {
    slug: "dsa-ch11-main-concept",
    title: {
      th: "Memoization (Top-Down) vs Tabulation (Bottom-Up) & Space Optimization",
      en: "Memoization vs Tabulation Paradigms & Space Optimization Techniques",
    },
    lead: {
      th: "เปรียบเทียบสองกระบวนท่าหลักของ DP: บนลงล่างด้วย Recursion + แคช vs ล่างขึ้นบนด้วย Loop + ตาราง พร้อมเทคนิคบีบอัดหน่วยความจำจาก O(n) เหลือ O(1)",
      en: "Compare Top-Down recursive caching with Bottom-Up iterative tabulation, and learn the variable rolling space optimization pattern.",
    },
    group: "บทที่ 11: กำหนดการพลวัต (Dynamic Programming)",
    blocks: {
      th: [
        { t: "h2", c: "1. Top-Down with Memoization (บนลงล่าง + แคช)" },
        {
          t: "p",
          c: "เรายังคงเขียนโครงสร้างแบบ Recursion ตามธรรมชาติ แต่ก่อนจะลงมือคำนวณ ให้ตรวจดูในตารางแคช (Memo Map / Array) ก่อนเสมอ หากเคยคำนวณแล้วให้ดึงคำตอบออกมาตอบทันทีใน $O(1)$:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Top-Down DP ด้วย lru_cache (O(n) Time, O(n) Space)",
          c: `from functools import lru_cache

# Decorator นี้จะทำ Memoization ตารางแคชให้อัตโนมัติเบื้องหลัง
@lru_cache(maxsize=None)
def fib_memo(n: int) -> int:
    if n <= 1:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)

print(fib_memo(50)) # 12586269025 (ตอบได้ทันทีใน 0.0001 วินาที!)`,
        },
        { t: "h2", c: "2. Bottom-Up with Tabulation (ล่างขึ้นบน + ตาราง)" },
        {
          t: "p",
          c: "เราเริ่มต้นคำนวณจากคำตอบที่เล็กที่สุดก่อน (Base Cases: $f(0) = 0, f(1) = 1$) แล้วใช้ลูป Iteration คำนวณขยับขึ้นไปเรื่อยๆ ตามตารางอาร์เรย์ จนถึงคำตอบเป้าหมาย $f(n)$:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Bottom-Up Tabulation",
          c: `#include <vector>
using namespace std;

long long fibTabulation(int n) {
    if (n <= 1) return n;
    
    // สร้างตาราง DP ขนาด n + 1
    vector<long long> dp(n + 1, 0);
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]; // สูตร State Transition
    }
    return dp[n];
}`,
        },
        { t: "h2", c: "3. Space Optimization: บีบอัดหน่วยความจำเหลือ O(1) Space" },
        {
          t: "p",
          c: "สังเกตว่าในการคำนวณ `dp[i]` เราต้องการเพียงค่าของ **2 ตัวก่อนหน้าเท่านั้น** (`dp[i-1]` และ `dp[i-2]`) เราจึงไม่จำเป็นต้องเก็บทั้งอาร์เรย์ขนาด $N$ ให้เปลือง RAM! เราสามารถใช้ตัวแปรหมุนเวียนเพียง 2 ตัว:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Space Optimized DP (O(n) Time, O(1) Space)",
          c: `def fib_optimized(n: int) -> int:
    if n <= 1:
        return n
        
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
        
    return prev1`,
        },
        {
          t: "table",
          head: ["กระบวนท่า", "ข้อดี", "ข้อเสีย", "เมื่อไหร่ควรใช้"],
          rows: [
            ["**Top-Down (Memoization)**", "เขียนง่าย ตรงไปตรงมาตามคำนิยามปัญหา คำนวณเฉพาะกิ่งที่จำเป็นจริงๆ", "มี Overhead ของ Call Stack และเสี่ยง Stack Overflow", "เมื่อ State Space กว้างมากและคำนวณไม่ครบทุกช่อง"],
            ["**Bottom-Up (Tabulation)**", "รวดเร็ว ไร้ Call Stack Overhead และเปิดทางสู่การทำ **Space Optimization**", "ต้องคำนวณเติมตารางทุกช่องตั้งแต่ต้นจนจบ", "มาตรฐานที่ควรใช้ในการสัมภาษณ์งานเมื่อทำได้"],
          ],
        },
      ],
      en: [],
    },
  },

  "dsa-ch11-classic-dp": {
    slug: "dsa-ch11-classic-dp",
    title: {
      th: "Classic DP: Climbing Stairs, 0/1 Knapsack, Coin Change & LCS",
      en: "Mastering Classic DP Patterns: Knapsack, Unbounded Coin Change & LCS",
    },
    lead: {
      th: "ฝึกฝน 4 รูปแบบมหาอำนาจของ Dynamic Programming: Climbing Stairs (1D DP), 0/1 Knapsack (2D DP), Coin Change (Unbounded DP), และ Longest Common Subsequence (String DP)",
      en: "Master the 4 iconic DP archetypes: Climbing Stairs 1D, 0/1 Knapsack 2D, Unbounded Coin Change, and Longest Common Subsequence.",
    },
    group: "บทที่ 11: กำหนดการพลวัต (Dynamic Programming)",
    blocks: {
      th: [
        { t: "h2", c: "1. 1D DP: Climbing Stairs (LeetCode 70)" },
        {
          t: "p",
          c: "มีบันได $n$ ขั้น ในแต่ละครั้งสามารถก้าวได้ 1 หรือ 2 ขั้น จงหาวิธีการเดินขึ้นบันไดทั้งหมด:\n- สัญชาตญาณ: การจะมายืนที่ขั้นที่ $i$ ได้ มีเพียง 2 ทางคือ ก้าว 1 ขั้นมาจากขั้น $i-1$ หรือ ก้าว 2 ขั้นมาจากขั้น $i-2$\n- สูตร State Transition: **$dp[i] = dp[i-1] + dp[i-2]$** (เหมือน Fibonacci เป๊ะ!)",
        },
        { t: "h2", c: "2. 2D DP: ปัญหาการจัดสิ่งของใส่กระเป๋า (0/1 Knapsack Problem)" },
        {
          t: "p",
          c: "มีสิ่งของ $N$ ชิ้น แต่ละชิ้นมีน้ำหนัก $w_i$ และมูลค่า $v_i$ เรามีกระเป๋าที่รับน้ำหนักได้สูงสุด $W$ จงเลือกสิ่งของใส่กระเป๋าให้ได้มูลค่ารวมมากที่สุด (ของแต่ละชิ้นเลือกได้เพียง 0 คือไม่เอา หรือ 1 คือเอา):",
        },
        {
          t: "code",
          lang: "text",
          label: "การตัดสินใจของสิ่งของชิ้นที่ i ที่ความจุกระเป๋า w",
          c: `1. กรณีไม่หยิบชิ้นที่ i: มูลค่าเท่าเดิม = dp[i - 1][w]
2. กรณีหยิบชิ้นที่ i (ถ้าน้ำหนัก w_i <= w): 
   มูลค่า = v_i + dp[i - 1][w - w_i]

สูตรสมบูรณ์:
dp[i][w] = max(dp[i - 1][w], v_i + dp[i - 1][w - w_i])`,
        },
        {
          t: "code",
          lang: "python",
          label: "Python: 0/1 Knapsack แบบ 2D Tabulation",
          c: `def knapsack_01(weights: list[int], values: list[int], capacity: int) -> int:
    n = len(weights)
    # สร้างตาราง dp ขนาด (n + 1) x (capacity + 1)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        w_item = weights[i - 1]
        v_item = values[i - 1]
        for w in range(1, capacity + 1):
            if w_item <= w:
                # เลือกระหว่าง: ไม่หยิบ vs หยิบ
                dp[i][w] = max(dp[i - 1][w], v_item + dp[i - 1][w - w_item])
            else:
                dp[i][w] = dp[i - 1][w] # แบกไม่ไหว ไม่หยิบ
                
    return dp[n][capacity]

print(knapsack_01([1, 2, 3], [10, 15, 40], 6)) # 65 (หยิบชิ้น 1, 2, 3 รวม 6kg)`,
        },
        { t: "h2", c: "3. Coin Change DP (LeetCode 322): ทอนเงินเหรียญน้อยที่สุด" },
        {
          t: "p",
          c: "ในบทที่ 10 เราเห็นแล้วว่า Greedy ล้มเหลวกับเหรียญ `[1, 3, 4]` เมื่อทอนเงิน 6 บาท นี่คือโค้ด DP ที่ให้คำตอบถูกต้อง 2 เหรียญเสมอ:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Coin Change ด้วย 1D DP Table O(Amount * Coins)",
          c: `def coin_change(coins: list[int], amount: int) -> int:
    # ตั้งค่าเริ่มต้นเป็น Infinity (amount + 1)
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0 # เงิน 0 บาท ใช้ 0 เหรียญ
    
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])
                
    return dp[amount] if dp[amount] != amount + 1 else -1

print(coin_change([1, 3, 4], 6)) # 2 (เหรียญ 3 + 3 อย่างถูกต้อง!)`,
        },
        { t: "h2", c: "4. Longest Common Subsequence (LCS - LeetCode 1143)" },
        {
          t: "p",
          c: "หาความยาวลำดับร่วมที่ยาวที่สุดระหว่างสตริง `text1` และ `text2` (ใช้ในคำสั่ง `git diff` และการเปรียบเทียบรหัสพันธุกรรม DNA):",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Longest Common Subsequence (LCS)",
          c: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.length(), n = text2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1]; // อักษรตรงกัน บวก 1
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]); // เลือกตัวที่ยาวกว่า
                }
            }
        }
        return dp[m][n];
    }
};`,
        },
      ],
      en: [],
    },
  },
};
