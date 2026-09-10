import type { Page } from "@/lib/types";

export const chapter11Pages: Record<string, Page> = {
  "dsa-ch11-intro": {
    slug: "dsa-ch11-intro",
    title: {
      th: "Dynamic Programming: ความรู้เบื้องต้นและหัวใจสำคัญ",
      en: "Dynamic Programming: Concepts & Overlapping Subproblems",
    },
    lead: {
      th: "กำจัดงานซ้ำซ้อน: เปลี่ยนอัลกอริทึมจากช้าติดหล่ม O(2ⁿ) เป็นเร็วติดจรวด O(n) ด้วยหลักการจดจำคำตอบ",
      en: "Eliminate redundant subproblems: transform exponential O(2ⁿ) algorithms into linear O(n) efficiency.",
    },
    group: "บทที่ 11: กำหนดการพลวัต (Dynamic Programming)",
    blocks: {
      th: [
        {
          t: "p",
          c: "**Dynamic Programming (DP)** คือเทคนิคการเพิ่มประสิทธิภาพของอัลกอริทึม โดยนำผลลัพธ์ของปัญหาย่อยที่เคยคำนวณแล้วมา **บันทึกเก็บไว้ (Cache / Memoize)** เพื่อไม่ให้ต้องคำนวณซ้ำอีก",
        },
        { t: "h2", c: "ตัวอย่างคลาสสิก: ปัญหาฟีโบนักชี (Fibonacci)" },
        {
          t: "p",
          c: "หากเขียนฟังก์ชัน Fibonacci ด้วย Recursion ตรงๆ:",
        },
        {
          t: "code",
          lang: "text",
          label: "การระเบิดของ Recursion Tree (Time Complexity: O(2ⁿ))",
          c: `              fib(5)
            /        \\
        fib(4)          fib(3)
        /    \\          /    \\
     fib(3)  fib(2)  fib(2)  fib(1)
     /   \\
  fib(2) fib(1)
  
* สังเกตว่า fib(3) และ fib(2) ถูกคำนวณซ้ำซ้อนหลายรอบมาก!`,
        },
        {
          t: "p",
          c: "ด้วย Dynamic Programming เราจะคำนวณ `fib(3)` เพียงครั้งเดียวแล้วจดจำไว้ ทำให้จำนวนรอบการทำงานลดลงจาก **2⁵⁰ (นับล้านปี) เหลือเพียง 50 รอบ (เสี้ยววินาที)**!",
        },
      ],
      en: [],
    },
  },

  "dsa-ch11-main-concept": {
    slug: "dsa-ch11-main-concept",
    title: {
      th: "DP Concepts: Memoization vs Tabulation",
      en: "DP Mechanics: Top-Down Memoization vs Bottom-Up Tabulation",
    },
    lead: {
      th: "เปรียบเทียบสองกระบวนท่า: Top-Down (Memoization) ด้วย Recursion และ Bottom-Up (Tabulation) ด้วย Iteration",
      en: "Compare the two core DP paradigms: Top-down recursion with cache vs bottom-up iterative tables.",
    },
    group: "บทที่ 11: กำหนดการพลวัต (Dynamic Programming)",
    blocks: {
      th: [
        { t: "h2", c: "1. Top-Down with Memoization (บนลงล่าง + แคช)" },
        {
          t: "p",
          c: "เขียน Recursion ตามธรรมชาติ แต่ก่อนจะคำนวณ ให้ตรวจดูในตารางแคช (Memo) ก่อนเสมอ ใน Python เราสามารถใช้ Decorator `@functools.lru_cache` ได้อย่างสวยงาม:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Top-Down DP ด้วย lru_cache (O(n) Time, O(n) Space)",
          c: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memo(n: int) -> int:
    if n <= 1:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)

print(fib_memo(50))  # 12586269025 (ตอบได้ทันทีใน 0.0001 วินาที!)`,
        },
        { t: "h2", c: "2. Bottom-Up with Tabulation (ล่างขึ้นบน + ตาราง)" },
        {
          t: "p",
          c: "เริ่มคำนวณจากคำตอบที่เล็กที่สุด (Base Case: f(0), f(1)) แล้วใช้ Loop เติมค่าลงในตารางไปเรื่อยๆ จนถึงเป้าหมาย f(n):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Bottom-Up DP (O(n) Time, O(1) Space)",
          c: `def fib_tabulation(n: int) -> int:
    if n <= 1:
        return n
        
    prev2 = 0
    prev1 = 1
    
    for _ in range(2, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
        
    return prev1

print(fib_tabulation(50))  # 12586269025 (Space O(1))`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch11-classic-dp": {
    slug: "dsa-ch11-classic-dp",
    title: {
      th: "Classic DP: Climbing Stairs, Coin Change, 0/1 Knapsack, LCS & LIS",
      en: "Classic DP Patterns: Knapsack, Coin Change, LCS & LIS",
    },
    lead: {
      th: "5 กระบวนท่า DP คลาสสิกประจำห้องสัมภาษณ์: บันได (Climbing Stairs), ทอนเหรียญ (Coin Change), เป้สะพายหลัง (0/1 Knapsack), ลำดับย่อยร่วมยาวสุด (LCS) และลำดับย่อยเพิ่มขึ้นยาวสุด (LIS)",
      en: "Master standard interview DP archetypes: Climbing Stairs, Coin Change, 0/1 Knapsack, Longest Common Subsequence, and Longest Increasing Subsequence.",
    },
    group: "บทที่ 11: กำหนดการพลวัต (Dynamic Programming)",
    blocks: {
      th: [
        { t: "h2", c: "1. Climbing Stairs (LeetCode 70)" },
        {
          t: "p",
          c: "บันได $N$ ขั้น แต่ละก้าวสามารถเดินได้ 1 ขั้น หรือ 2 ขั้น จงหาว่ามีกี่วิธีที่จะก้าวถึงขั้นบนสุด (การจะถึงขั้นที่ $i$ ต้องก้าวมาจากขั้นที่ $i-1$ หรือ $i-2$):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Climbing Stairs O(n) Time, O(1) Space",
          c: `def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    one_step_before = 2
    two_steps_before = 1
    
    for _ in range(3, n + 1):
        curr = one_step_before + two_steps_before
        two_steps_before = one_step_before
        one_step_before = curr
        
    return one_step_before

print(climb_stairs(5))  # 8 วิธี`,
        },
        { t: "h2", c: "2. Coin Change: จำนวนเหรียญน้อยที่สุด (LeetCode 322)" },
        {
          t: "p",
          c: "หาจำนวนเหรียญน้อยที่สุดเพื่อรวมให้ได้มูลค่า `amount` (หากทำไม่ได้ให้ส่งคืน -1):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Coin Change Bottom-Up Tabulation (O(n * amount))",
          c: `def coin_change(coins: list[int], amount: int) -> int:
    # dp[i] คือจำนวนเหรียญน้อยสุดสำหรับมูลค่า i
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # เงิน 0 บาท ใช้ 0 เหรียญ
    
    for a in range(1, amount + 1):
        for coin in coins:
            if a - coin >= 0:
                dp[a] = min(dp[a], 1 + dp[a - coin])
                
    return dp[amount] if dp[amount] != float('inf') else -1

print(coin_change([1, 2, 5], 11))  # 3 เหรียญ (5 + 5 + 1)`,
        },
        { t: "h2", c: "3. ปัญหาเป้สะพายหลัง 0/1 (0/1 Knapsack Problem)" },
        {
          t: "p",
          c: "มีสิ่งของ $n$ ชิ้น แต่ละชิ้นมีน้ำหนัก `wt[i]` และมูลค่า `val[i]` กระเป๋ารับน้ำหนักได้สูงสุด $W$ ของแต่ละชิ้น **เลือกได้เพียงหยิบ (1) หรือไม่หยิบ (0)** ไม่สามารถหั่นแบ่งได้:",
        },
        {
          t: "callout",
          title: "💡 สูตรความสัมพันธ์เวียนเกิด (Recurrence Relation)",
          c: "สำหรับของชิ้นที่ $i$:\\n- ถ้า $wt[i-1] > w$: ใส่ไม่ได้ ต้องข้าม: `dp[i][w] = dp[i-1][w]`\\n- ถ้าใส่ได้: เลือกระหว่างไม่ใส่ กับ ใส่: `dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])`",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: 0/1 Knapsack Tabulation (O(n * W) Time, O(W) Space)",
          c: `def knapsack_01(W: int, wt: list[int], val: list[int], n: int) -> int:
    # Space-optimized 1D array (ย้อนจาก W ถอยหลังมาเพื่อป้องกันการใช้ของซ้ำ)
    dp = [0] * (W + 1)
    
    for i in range(n):
        for w in range(W, wt[i] - 1, -1):
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]])
            
    return dp[W]

val = [60, 100, 120]
wt = [10, 20, 30]
W = 50
print("มูลค่าสูงสุดในเป้:", knapsack_01(W, wt, val, len(val)))  # 220`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++ Comparison: 0/1 Knapsack 2D Tabulation",
          c: `#include <iostream>
#include <vector>
#include <algorithm>

int knapSack(int W, const std::vector<int>& wt, const std::vector<int>& val, int n) {
    std::vector<std::vector<int>> dp(n + 1, std::vector<int>(W + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (wt[i - 1] <= w) {
                dp[i][w] = std::max(dp[i - 1][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}`,
        },
        { t: "h2", c: "4. Longest Common Subsequence (LCS - LeetCode 1143)" },
        {
          t: "p",
          c: "กำหนดสตริง `text1` และ `text2` จงหาความยาวของ **ลำดับย่อยร่วมที่ยาวที่สุด** (ตัวอักษรเรียงลำดับเดิมแต่ไม่จำเป็นต้องติดกัน เช่น `\"ace\"` เป็น subsequence ของ `\"abcde\"`):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: LCS ด้วย 2D DP Table (O(m * n))",
          c: `def longest_common_subsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
                
    return dp[m][n]

print(longest_common_subsequence("abcde", "ace"))  # 3 ("ace")`,
        },
        { t: "h2", c: "5. Longest Increasing Subsequence (LIS - LeetCode 300)" },
        {
          t: "p",
          c: "กำหนดอาร์เรย์ `nums` จงหาความยาวของลำดับย่อยที่ **มีค่าเพิ่มขึ้นอย่างเคร่งครัด** และยาวที่สุด:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: LIS ด้วย Dynamic Programming O(n²)",
          c: `def length_of_lis(nums: list[int]) -> int:
    if not nums:
        return 0
        
    # dp[i] คือความยาว LIS ที่สิ้นสุดที่ดัชนี i
    dp = [1] * len(nums)
    
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], 1 + dp[j])
                
    return max(dp)

print(length_of_lis([10, 9, 2, 5, 3, 7, 101, 18]))  # 4 ([2, 3, 7, 101] หรือ [2, 3, 7, 18])`,
        },
      ],
      en: [],
    },
  },
};
