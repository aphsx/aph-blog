import type { Page } from "@/lib/types";

export const chapter10Pages: Record<string, Page> = {
  "dsa-ch10-intro": {
    slug: "dsa-ch10-intro",
    title: {
      th: "ปรัชญา Greedy: เลือกสิ่งที่ดีที่สุดเฉพาะหน้า (Greedy-Choice)",
      en: "The Greedy Paradigm: Locally Optimal Choices & Global Optima",
    },
    lead: {
      th: "เข้าใจกระบวนทัศน์แบบละโมบ (Greedy): การตัดสินใจเลือกทางเลือกที่ดีที่สุดในปัจจุบันโดยไม่ย้อนกลับ และเสาหลัก 2 ประการที่ใช้พิสูจน์ความถูกต้อง",
      en: "Understand the greedy paradigm: making locally optimal choices without backtracking, and the mathematical properties required for global optimality.",
    },
    group: "บทที่ 10: ขั้นตอนวิธีแบบละโมบ (Greedy Algorithms)",
    blocks: {
      th: [
        {
          t: "p",
          c: "**อัลกอริทึมแบบละโมบ (Greedy Algorithm)** ยึดหลักการที่เรียบง่ายแต่ทรงพลังคือ:\n\n> *'ในทุกๆ ก้าวของการตัดสินใจ จงเลือกตัวเลือกที่ดูดีที่สุดในปัจจุบันทันที (Locally Optimal Choice) โดยไม่ต้องมองย้อนหลัง และหวังว่าการเลือกที่ดีที่สุดในทุกก้าวจะนำไปสู่คำตอบที่ดีที่สุดในภาพรวม (Globally Optimal Solution)'*",
        },
        { t: "h2", c: "เสาหลัก 2 ประการที่โจทย์ต้องมี จึงจะใช้ Greedy ได้" },
        {
          t: "ol",
          c: [
            "**1. Greedy-Choice Property**: เราสามารถประกอบคำตอบที่ดีที่สุดในภาพรวมได้ โดยการเลือกคำตอบที่ดีที่สุดเฉพาะหน้าในแต่ละก้าว โดยการเลือกนี้ **ไม่ต้องย้อนกลับมาเปลี่ยนใจ (No Backtracking)**",
            "**2. Optimal Substructure**: ปัญหาใหญ่สามารถแบ่งออกเป็นปัญหาย่อยๆ ที่เมื่อแก้ปัญหาย่อยได้ดีที่สุดแล้ว ผลลัพธ์จะนำมารวมกันเป็นคำตอบที่ดีที่สุดของปัญหาใหญ่ได้",
          ],
        },
        { t: "h2", c: "Greedy vs Dynamic Programming vs Backtracking" },
        {
          t: "table",
          head: ["กระบวนทัศน์", "การตัดสินใจในแต่ละก้าว", "ความเร็ว (Time Complexity)", "การการันตีคำตอบ"],
          rows: [
            ["**Greedy**", "เลือกสิ่งที่ดีที่สุด ณ ปัจจุบัน 1 ทางเท่านั้น ไม่มองย้อนกลับ", "⚡ เร็วมาก มักอยู่ที่ $O(n)$ หรือ $O(n \\log n)$", "ใช้ได้เฉพาะกับปัญหาที่มี Greedy-Choice Property เท่านั้น"],
            ["**Dynamic Programming**", "คำนวณและเปรียบเทียบทุกทางเลือกที่เป็นไปได้ แต่จดจำผลลัพธ์ไว้", "⏱️ ปานกลาง มักอยู่ที่ $O(n^2)$ หรือ $O(n \\times W)$", "การันตีคำตอบที่ดีที่สุดเสมอสำหรับปัญหา Optimal Substructure"],
            ["**Backtracking**", "ทดลองเดินทุกทางเลือกอย่างละเอียด หากตันให้ถอยกลับ", "🐢 ช้ามาก อยู่ที่ $O(2^n)$ หรือ $O(n!)$", "การันตีคำตอบที่ดีที่สุดแม้ในปัญหา NP-Complete"],
          ],
        },
        {
          t: "callout",
          title: "⚠️ อันตรายของ Greedy: หลุมพรางความโลภ",
          c: "Greedy เป็นกระบวนทัศน์ที่ 'เสี่ยง' ที่สุด เพราะหลายครั้งสิ่งที่ดูดีที่สุดในปัจจุบัน อาจนำไปสู่หายนะในอนาคต! หากโจทย์ไม่มีคุณสมบัติ Greedy-Choice Property การใช้ Greedy จะให้คำตอบที่ผิดทันที",
        },
      ],
      en: [],
    },
  },

  "dsa-ch10-basic": {
    slug: "dsa-ch10-basic",
    title: {
      th: "เมื่อ Greedy ชนะ vs ล้มเหลว: Coin Change & Activity Selection",
      en: "When Greedy Works vs Fails: Coin Change & Activity Selection",
    },
    lead: {
      th: "วิเคราะห์กรณีศึกษาคลาสสิก: ทำไมการทอนเงินด้วยเหรียญไทยถึงใช้ Greedy ได้ แต่เหรียญในระบบอื่นกลับล้มเหลว และการพิสูจน์ Interval Scheduling ด้วย Exchange Argument",
      en: "Classic case studies: why Greedy succeeds on canonical currency systems but fails on arbitrary denominations, and the Exchange Argument proof for Interval Scheduling.",
    },
    group: "บทที่ 10: ขั้นตอนวิธีแบบละโมบ (Greedy Algorithms)",
    blocks: {
      th: [
        { t: "h2", c: "กรณีศึกษาที่ 1: ปัญหาการทอนเงิน (Coin Change Problem)" },
        {
          t: "p",
          c: "ลองดูสองสถานการณ์ในการทอนเงินให้มีจำนวนเหรียญน้อยที่สุด:",
        },
        {
          t: "table",
          head: ["สถานการณ์", "เหรียญที่มีให้เลือก", "เป้าหมาย", "ผลลัพธ์จาก Greedy", "คำตอบที่ดีที่สุดจริง"],
          rows: [
            [
              "**ระบบเหรียญทั่วไป (Canonical)**",
              "`[10, 5, 2, 1]`",
              "18 บาท",
              "เลือก 10 + 5 + 2 + 1 = **4 เหรียญ** ✅",
              "4 เหรียญ (Greedy ชนะ!)",
            ],
            [
              "**ระบบเหรียญสมมติ (Non-Canonical)**",
              "`[4, 3, 1]`",
              "6 บาท",
              "เลือก 4 + 1 + 1 = **3 เหรียญ** ❌",
              "เลือก 3 + 3 = **2 เหรียญ**! (Greedy แพ้!)",
            ],
          ],
        },
        {
          t: "p",
          c: "ในกรณีเหรียญ `[4, 3, 1]` การเลือกเหรียญ 4 (ใหญ่สุดเฉพาะหน้า) บีบให้เราต้องทอนเศษที่เหลือด้วยเหรียญ 1 อีกสองเหรียญ กลายเป็น 3 เหรียญ ในขณะที่การเลือกเหรียญ 3 สองเหรียญกลับให้ผลลัพธ์ที่ดีกว่า (**กรณีนี้ต้องใช้ Dynamic Programming เท่านั้น!**)",
        },
        { t: "h2", c: "กรณีศึกษาที่ 2: การจัดตารางกิจกรรม (Activity Selection / Interval Scheduling)" },
        {
          t: "p",
          c: "โจทย์ให้ช่วงเวลากิจกรรมหลายกิจกรรม `[start, end]` จงเลือกจัดกิจกรรมให้ได้ **จำนวนมากที่สุด** โดยไม่มีช่วงเวลาทับซ้อนกัน:",
        },
        {
          t: "code",
          lang: "text",
          label: "เราควรใช้เกณฑ์อะไรในการเลือกกิจกรรมถัดไป?",
          c: `1. เลือกกิจกรรมที่เริ่มเร็วที่สุด (Earliest Start Time)?   -> ❌ ล้มเหลว (อาจเริ่มเร็วแต่ยาวข้ามวัน)
2. เลือกกิจกรรมที่ใช้เวลาน้อยที่สุด (Shortest Duration)?   -> ❌ ล้มเหลว (อาจกินเวลาคาบเกี่ยวสองฝั่ง)
3. เลือกกิจกรรมที่เสร็จสิ้นเร็วที่สุด (Earliest Finish Time)? -> ✅ ถูกต้องและผ่านการพิสูจน์แล้ว!`,
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Activity Selection ด้วย Earliest Finish Time (O(n log n))",
          c: `def max_activities(intervals: list[list[int]]) -> int:
    if not intervals:
        return 0
        
    # เรียงลำดับตามเวลาสิ้นสุด (End Time) จากน้อยไปหามาก
    intervals.sort(key=lambda x: x[1])
    
    count = 1
    last_end = intervals[0][1]
    
    for i in range(1, len(intervals)):
        start, end = intervals[i]
        # หากกิจกรรมนี้เริ่มหลังหรือพร้อมกับที่กิจกรรมก่อนหน้าเสร็จ
        if start >= last_end:
            count += 1
            last_end = end  # อัปเดตเวลาสิ้นสุด
            
    return count

print(max_activities([[1, 2], [2, 3], [3, 4], [1, 3]])) # 3 กิจกรรม`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch10-leetcode": {
    slug: "dsa-ch10-leetcode",
    title: {
      th: "โจทย์สัมภาษณ์ยอดฮิต: Jump Game, Gas Station & Assign Cookies",
      en: "Classic Interview Problems: Jump Game, Gas Station & Two Pointers Greedy",
    },
    lead: {
      th: "เจาะลึกโจทย์ Greedy ยอดฮิตในห้องสัมภาษณ์งาน: Jump Game (LeetCode 55) ด้วยการติดตามขอบเขตเอื้อมถึงสูงสุดใน O(n) และ Gas Station (LeetCode 134)",
      en: "Master iconic interview problems: Jump Game reachability tracking in O(n) and the Gas Station circular surplus reset.",
    },
    group: "บทที่ 10: ขั้นตอนวิธีแบบละโมบ (Greedy Algorithms)",
    blocks: {
      th: [
        { t: "h2", c: "1. Jump Game I (LeetCode 55): กระโดดไปถึงจุดสิ้นสุดได้หรือไม่?" },
        {
          t: "p",
          c: "กำหนดอาร์เรย์ `nums` โดย `nums[i]` คือระยะทางสูงสุดที่สามารถกระโดดได้จากช่องนั้น จงหาว่าสามารถกระโดดไปถึง Index สุดท้ายได้หรือไม่:\n- แทนที่จะจำลองการกระโดดทุกแบบ ($O(2^n)$ Backtracking) เราสามารถใช้ Greedy ติดตามตัวแปรเดียวคือ: **'ตำแหน่งที่ไกลที่สุดที่ฉันเอื้อมถึงได้ในตอนนี้' (Max Reach)**",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Jump Game ด้วย Greedy O(n) Time, O(1) Space",
          c: `def can_jump(nums: list[int]) -> bool:
    max_reach = 0
    
    for i, jump in enumerate(nums):
        # ถ้าตำแหน่งปัจจุบันเกินระยะที่เอื้อมถึง แปลว่าติดเกาะ เดินหน้าต่อไม่ได้!
        if i > max_reach:
            return False
            
        # อัปเดตขอบเขตที่ไกลที่สุดที่สามารถเอื้อมไปถึงได้
        max_reach = max(max_reach, i + jump)
        
        # หากเอื้อมถึงจุดสุดท้ายแล้ว จบเกมได้ทันที
        if max_reach >= len(nums) - 1:
            return True
            
    return True

print(can_jump([2, 3, 1, 1, 4])) # True
print(can_jump([3, 2, 1, 0, 4])) # False (ติดที่ 0 ช่องที่สาม)`,
        },
        { t: "h2", c: "2. Gas Station (LeetCode 134): วนรอบวงกลมน้ำมัน" },
        {
          t: "p",
          c: "มีปั๊มน้ำมัน $N$ แห่งรอบวงกลม มีน้ำมันให้เติม `gas[i]` และค่าน้ำมันที่ต้องใช้ในการเดินทางไปยังปั๊มถัดไป `cost[i]` จงหาปั๊มเริ่มต้นที่สามารถขับวนครบรอบได้:",
        },
        {
          t: "code",
          lang: "cpp",
          label: "C++: Gas Station O(n) Time, O(1) Space",
          c: `#include <vector>
using namespace std;

class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int totalTank = 0;
        int currTank = 0;
        int startStation = 0;
        
        for (int i = 0; i < gas.size(); i++) {
            int netGas = gas[i] - cost[i];
            totalTank += netGas;
            currTank += netGas;
            
            // ถ้าน้ำมันติดลบระหว่างทาง แสดงว่าสถานีตั้งแต่ startStation ถึง i
            // ไม่สามารถเป็นจุดเริ่มต้นได้แน่นอน! ให้รีเซ็ตจุดเริ่มต้นไปที่ i + 1
            if (currTank < 0) {
                startStation = i + 1;
                currTank = 0;
            }
        }
        
        // ถ้าน้ำมันรวมทั้งระบบน้อยกว่าค่าใช้จ่ายรวม ไม่มีทางวนได้แน่นอน
        return (totalTank >= 0) ? startStation : -1;
    }
};`,
        },
      ],
      en: [],
    },
  },
};
