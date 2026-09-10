import type { Page } from "@/lib/types";

export const chapter10Pages: Record<string, Page> = {
  "dsa-ch10-intro": {
    slug: "dsa-ch10-intro",
    title: {
      th: "Greedy Algorithm: กลยุทธ์เลือกสิ่งที่ดีที่สุด ณ ตอนนี้",
      en: "Greedy Algorithms: Local Optimum vs Global Optimum",
    },
    lead: {
      th: "แนวคิดการตัดสินใจแบบละโมบ: เลือกสิ่งที่ดีที่สุดในแต่ละก้าวโดยไม่ย้อนกลับมาเปลี่ยนใจ พร้อมเงื่อนไขว่าเมื่อใดที่ใช้ได้ผล",
      en: "Master greedy choice properties, optimal substructure, and verifying when greedy strategies yield optimal solutions.",
    },
    group: "บทที่ 10: ขั้นตอนวิธีแบบละโมบ (Greedy Algorithms)",
    blocks: {
      th: [
        {
          t: "p",
          c: "**Greedy Algorithm (ขั้นตอนวิธีแบบละโมบ)** คืออัลกอริทึมที่ในทุกๆ ขั้นตอนจะตัดสินใจเลือก **สิ่งที่ดีที่สุดเฉพาะหน้า (Local Optimum)** โดยตั้งสมมติฐานว่าการเลือกสิ่งที่ดีที่สุดในทุกก้าวจะนำไปสู่ **คำตอบที่ดีที่สุดของภาพรวม (Global Optimum)** เสมอ",
        },
        { t: "h2", c: "2 เงื่อนไขสำคัญที่ทำให้ Greedy ใช้งานได้จริง" },
        {
          t: "ol",
          c: [
            "**1. Greedy-Choice Property**: เราสามารถเลือกคำตอบที่ดีที่สุดในปัจจุบันได้เลยโดยไม่ต้องคำนึงถึงผลลัพธ์ในอนาคต และไม่มีวันเสียใจหรือต้องย้อนกลับมาเปลี่ยนคำตอบ (No Backtracking)",
            "**2. Optimal Substructure**: คำตอบที่ดีที่สุดของปัญหาใหญ่ ประกอบขึ้นมาจากคำตอบที่ดีที่สุดของปัญหาย่อยๆ",
          ],
        },
        {
          t: "callout",
          title: "⚠️ กับดักของ Greedy ในห้องสัมภาษณ์",
          c: "Greedy ไม่ได้รับประกันคำตอบที่ดีที่สุดเสมอไป! ตัวอย่างเช่น การทอนเงิน: ถ้ามีเหรียญ 10, 5, 1 บาท ระบบเงินไทยทอนได้ดีด้วย Greedy แต่ถ้ามีเหรียญ 1, 3, 4 บาท แล้วต้องการทอน 6 บาท Greedy จะเลือก 4 + 1 + 1 (3 เหรียญ) ทั้งที่คำตอบดีสุดคือ 3 + 3 (2 เหรียญ)! ปัญหานี้ต้องแก้ด้วย Dynamic Programming",
        },
      ],
      en: [],
    },
  },

  "dsa-ch10-basic": {
    slug: "dsa-ch10-basic",
    title: {
      th: "Greedy พื้นฐาน: Coin Change, Fractional Knapsack & Activity Selection",
      en: "Greedy Basics: Canonical Coin Change, Fractional Knapsack & Activity Selection",
    },
    lead: {
      th: "3 โจทย์คลาสสิกของ Greedy: การทอนเงินระบบมาตรฐาน, ปัญหาเป้สะพายหลังแบ่งส่วนได้ (Fractional Knapsack) และการจัดตารางกิจกรรม (Interval Scheduling)",
      en: "Master canonical coin change, fractional knapsack value-to-weight density, and interval scheduling.",
    },
    group: "บทที่ 10: ขั้นตอนวิธีแบบละโมบ (Greedy Algorithms)",
    blocks: {
      th: [
        { t: "h2", c: "1. การทอนเงิน: Brute Force vs Greedy" },
        {
          t: "p",
          c: "ปัญหา: ต้องการทอนเงินจำนวน `amount` โดยใช้เหรียญที่มีจำนวนน้อยที่สุด กำหนดเหรียญระบบเงินไทย `[1, 2, 5, 10]` บาท",
        },
        {
          t: "p",
          c: "หากใช้ **Brute Force (Recursion)** เราต้องลองทุกเหรียญที่เป็นไปได้ ซึ่งมีความซับซ้อนระดับ **O(n^amount)** ช้ามากจนโปรแกรมค้าง แต่ถ้าเป็นระบบเหรียญมาตรฐาน (Canonical Coin System) เราสามารถใช้ **Greedy** โดยเลือกหยิบเหรียญที่มีค่ามากที่สุดก่อนเสมอ:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Coin Change แบบ Greedy (O(จำนวนชนิดเหรียญ))",
          c: `def coin_change_greedy(coins: list[int], amount: int) -> int:
    # เรียงเหรียญจากค่ามากไปน้อย
    coins.sort(reverse=True)
    count = 0
    
    for coin in coins:
        if amount == 0:
            break
        num_coins = amount // coin
        count += num_coins
        amount -= num_coins * coin
        
    return count if amount == 0 else -1

print("ทอนเงิน 27 บาท ใช้:", coin_change_greedy([1, 2, 5, 10], 27), "เหรียญ")  # 10*2 + 5*1 + 2*1 = 4 เหรียญ`,
        },
        { t: "h2", c: "2. ปัญหาเป้สะพายหลังแบ่งส่วนได้ (Fractional Knapsack)" },
        {
          t: "p",
          c: "มีสิ่งของ $n$ ชิ้น แต่ละชิ้นมีมูลค่า $v_i$ และน้ำหนัก $w_i$ กระเป๋าสามารถรับน้ำหนักได้สูงสุด $W$ โดยเรา **สามารถตัดแบ่งสิ่งของเป็นเศษส่วนได้** (ต่างจาก 0/1 Knapsack ที่ต้องหยิบทั้งชิ้นหรือไม่หยิบเลย)",
        },
        {
          t: "callout",
          title: "💡 กลยุทธ์ Greedy: ความคุ้มค่าต่อหน่วย (Value Density)",
          c: "คำนวณอัตราส่วน **Value / Weight** ของของแต่ละชิ้น แล้วเรียงลำดับจากมากไปน้อย หยิบชิ้นที่คุ้มค่าที่สุดใส่กระเป๋าก่อนจนเต็ม!",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Fractional Knapsack (O(n log n))",
          c: `class Item:
    def __init__(self, value: float, weight: float):
        self.value = value
        self.weight = weight
        self.ratio = value / weight

def fractional_knapsack(capacity: float, items: list[Item]) -> float:
    # เรียงตาม ratio จากมากไปน้อย
    items.sort(key=lambda x: x.ratio, reverse=True)
    
    total_val = 0.0
    rem_capacity = capacity
    
    for item in items:
        if rem_capacity <= 0:
            break
            
        if item.weight <= rem_capacity:
            # ใส่ได้ทั้งชิ้น
            total_val += item.value
            rem_capacity -= item.weight
        else:
            # ใส่ได้เพียงบางส่วน
            fraction = rem_capacity / item.weight
            total_val += item.value * fraction
            rem_capacity = 0
            
    return total_val

items = [Item(60, 10), Item(100, 20), Item(120, 30)]
print(f"มูลค่าสูงสุดที่ใส่ได้: {fractional_knapsack(50, items):.2f}")  # 240.00`,
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++ Comparison: Fractional Knapsack using std::sort with lambda",
          c: `#include <iostream>
#include <vector>
#include <algorithm>

struct Item {
    double value, weight;
};

double fractionalKnapsack(double capacity, std::vector<Item>& items) {
    std::sort(items.begin(), items.end(), [](const Item& a, const Item& b) {
        return (a.value / a.weight) > (b.value / b.weight);
    });

    double totalValue = 0.0;
    for (const auto& item : items) {
        if (capacity <= 0) break;
        if (item.weight <= capacity) {
            totalValue += item.value;
            capacity -= item.weight;
        } else {
            totalValue += item.value * (capacity / item.weight);
            capacity = 0;
        }
    }
    return totalValue;
}`,
        },
        { t: "h2", c: "3. การจัดตารางกิจกรรม (Activity Selection / Interval Scheduling)" },
        {
          t: "p",
          c: "มีกิจกรรม N กิจกรรม แต่ละกิจกรรมมีเวลาเริ่มและเวลาสิ้นสุด `[start, end]` ห้องประชุมจัดได้ทีละ 1 งาน จงหากิจกรรมจำนวนมากที่สุดที่จัดได้โดยไม่ชนกัน:",
        },
        {
          t: "callout",
          title: "💡 กลยุทธ์ Greedy ที่ถูกต้อง",
          c: "จงเลือกกิจกรรมที่ **จบเร็วที่สุดเสมอ (Sort by End Time)** เพราะยิ่งงานจบเร็วเท่าไร เราจะยิ่งเหลือเวลาในห้องประชุมมากที่สุดสำหรับจัดงานถัดไป!",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Activity Selection (O(n log n))",
          c: `def max_activities(activities: list[tuple[int, int]]) -> int:
    # 1. จัดเรียงตามเวลาสิ้นสุด (end time)
    activities.sort(key=lambda x: x[1])
    
    count = 0
    last_end_time = -1
    
    for start, end in activities:
        if start >= last_end_time:
            count += 1
            last_end_time = end # อัปเดตเวลาสิ้นสุด
            
    return count

tasks = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10), (8, 11)]
print(f"จัดงานได้สูงสุด: {max_activities(tasks)} งาน")  # 4 งาน`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch10-leetcode": {
    slug: "dsa-ch10-leetcode",
    title: {
      th: "Greedy LeetCode: Jump Game & Gas Station",
      en: "Greedy LeetCode Patterns: Jump Game & Gas Station",
    },
    lead: {
      th: "ตะลุย 2 โจทย์ยอดนิยมระดับ Big Tech: Jump Game (LeetCode 55) และ Gas Station (LeetCode 134) ด้วยเทคนิค Greedy O(n) Single Pass",
      en: "Tackle classic interview favorites: Jump Game I and Gas Station single-pass greedy patterns.",
    },
    group: "บทที่ 10: ขั้นตอนวิธีแบบละโมบ (Greedy Algorithms)",
    blocks: {
      th: [
        { t: "h2", c: "1. Jump Game (LeetCode 55)" },
        {
          t: "p",
          c: "กำหนดอาร์เรย์ `nums` โดย `nums[i]` คือระยะกระโดดสูงสุดจากตำแหน่งนั้น เริ่มต้นที่ดัชนี 0 จงหาว่าสามารถกระโดดไปถึงจุดสุดท้าย (`len(nums) - 1`) ได้หรือไม่:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Jump Game ด้วย Greedy O(n) Time, O(1) Space",
          c: `def can_jump(nums: list[int]) -> bool:
    max_reach = 0
    target = len(nums) - 1
    
    for i, jump in enumerate(nums):
        # ถ้าตำแหน่งปัจจุบันไกลเกินกว่าจุดที่เคยเอื้อมถึง แปลว่าติดหล่ม
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + jump)
        if max_reach >= target:
            return True
            
    return True

print(can_jump([2, 3, 1, 1, 4]))  # True
print(can_jump([3, 2, 1, 0, 4]))  # False (ติดที่เลข 0)`,
        },
        { t: "h2", c: "2. Gas Station: เดินทางรอบวงกลม (LeetCode 134)" },
        {
          t: "p",
          c: "มีปั๊มน้ำมัน $n$ แห่งเรียงเป็นวงกลม ปั๊มที่ $i$ มีน้ำมัน `gas[i]` และต้องใช้น้ำมัน `cost[i]` เพื่อเดินทางไปยังปั๊มถัดไป เริ่มต้นด้วยถังน้ำมันว่างเปล่า จงหา **ดัชนีปั๊มเริ่มต้น** ที่ทำให้เราขับรถวนครบ 1 รอบได้ (หากทำไม่ได้ให้ส่งคืน -1):",
        },
        {
          t: "callout",
          title: "💡 การพิสูจน์ทางคณิตศาสตร์ด้วย Greedy",
          c: "1. หาก `sum(gas) < sum(cost)` แปลว่าไม่มีทางวนรอบได้แน่นอน ส่งคืน -1 ทันที\\n2. ถ้าเราเริ่มจากจุด A แล้วน้ำมันหมดกลางทางที่จุด B แปลว่า **ไม่มีจุดใดๆ ระหว่าง A ถึง B ที่สามารถเป็นจุดเริ่มต้นได้เลย!** ดังนั้นจุดเริ่มต้นถัดไปที่ต้องลองคือ B + 1",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Gas Station O(n) Single Pass, O(1) Space",
          c: `def can_complete_circuit(gas: list[int], cost: list[int]) -> int:
    # เงื่อนไขรวม: ถ้าน้ำมันทั้งหมดน้อยกว่าค่าใช้จ่ายรวม ยังไงก็ไม่รอด
    if sum(gas) < sum(cost):
        return -1
        
    total_tank = 0
    start_station = 0
    
    for i in range(len(gas)):
        total_tank += gas[i] - cost[i]
        # ถ้าน้ำมันติดลบ แสดงว่าเริ่มจากสถานีตั้งแต่ start_station ถึง i ไม่ได้เลย
        if total_tank < 0:
            start_station = i + 1
            total_tank = 0
            
    return start_station

print(can_complete_circuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]))  # ดัชนี 3 (ปั๊มที่ 4)`,
        },
      ],
      en: [],
    },
  },
};
