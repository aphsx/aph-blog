import type { Page } from "@/lib/types";

export const dp1dPages: Record<string, Page> = {
  "lc75-intro-dp-1d": {
    slug: "lc75-intro-dp-1d",
    title: "Dynamic Programming 1 มิติ — พื้นฐาน & แนวคิด",
    lead: "แก้ปัญหาใหญ่ด้วยการต่อยอดคำตอบของปัญหาย่อยที่ซ้ำกัน แล้วเก็บไว้ใช้ซ้ำแทนที่จะคำนวณใหม่",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "Dynamic Programming (DP, การโปรแกรมแบบพลวัต) ฟังดูน่ากลัวแต่ไอเดียง่ายมาก มันคือเทคนิคแก้ปัญหาที่ปัญหาใหญ่แตกออกเป็น subproblem (ปัญหาย่อย) ที่หน้าตาเหมือนกัน และ subproblem เหล่านั้นซ้ำกันบ่อย ๆ แทนที่จะ compute (คำนวณ) คำตอบเดิมซ้ำหลายรอบ เรา compute ครั้งเดียวแล้ว cache (เก็บ) คำตอบไว้ พอต้องใช้อีกก็หยิบมาใช้ได้เลย นี่คือหัวใจทั้งหมดของ DP: จำคำตอบเก่าไว้ ไม่ทำงานซ้ำ" },

      { t: "h2", c: "overlapping subproblems — สัญญาณว่าใช้ DP ได้" },
      { t: "p", c: "ลองดูตัวอย่างคลาสสิกที่สุด: เลข Fibonacci ที่ define (นิยาม) ว่า fib(n) = fib(n-1) + fib(n-2) โดย base case (กรณีฐาน) คือ fib(0) = 0 และ fib(1) = 1 ถ้าเขียนตรง ๆ ตามนิยามด้วย recursion (การเรียกตัวเอง) จะได้แบบนี้ ซึ่งช้ามาก:" },
      { t: "code", lang: "python", c: `def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)   # ช้า! O(2^n)` },
      { t: "p", c: "ทำไมช้า? เพราะเรา compute ค่าเดิมซ้ำนับครั้งไม่ถ้วน ลองวาด recursion tree (ต้นไม้การเรียกฟังก์ชัน) ของ fib(5):" },
      { t: "code", lang: "python", c: `                fib(5)
              /        \\
          fib(4)       fib(3)
          /    \\        /    \\
     fib(3)  fib(2)  fib(2) fib(1)
      ...     ...     ...
# fib(3) ถูกคำนวณ 2 ครั้ง, fib(2) ถูกคำนวณ 3 ครั้ง ...
# ยิ่ง n ใหญ่ ยิ่งซ้ำมหาศาล = overlapping subproblems` },
      { t: "p", c: "การที่ subproblem ตัวเดียวกัน (เช่น fib(3)) ถูก compute ซ้ำหลายรอบ เรียกว่า overlapping subproblems (ปัญหาย่อยที่ทับซ้อนกัน) นี่แหละคือสัญญาณว่าใช้ DP ได้ ทางแก้มีสองสไตล์ ให้ผลลัพธ์เท่ากันแต่คิดคนละทิศ" },

      { t: "h3", c: "แบบที่ 1 — Memoization (top-down)" },
      { t: "p", c: "Memoization (การจดจำคำตอบ) แบบ top-down (บนลงล่าง) คือเริ่มจากปัญหาใหญ่ (fib(n)) แล้วเรียก recursion ลงไปหา subproblem ตามปกติ แต่เพิ่ม memo (สมุดโน้ต) ไว้จดคำตอบที่เคย compute แล้ว ก่อน compute อะไรก็ lookup (เปิดดู) ก่อนว่าเคยทำไว้หรือยัง ถ้าเคยก็หยิบมาใช้เลย ไม่ต้อง compute ซ้ำ" },
      { t: "code", lang: "python", c: `def fib(n, memo=None):
    if memo is None:
        memo = {}
    if n < 2:
        return n
    if n in memo:          # เคยคำนวณแล้ว หยิบมาใช้เลย
        return memo[n]
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)  # คำนวณแล้วจด
    return memo[n]

print(fib(10))  # 55` },
      { t: "h3", c: "แบบที่ 2 — Tabulation (bottom-up)" },
      { t: "p", c: "Tabulation (การเติมตาราง) แบบ bottom-up (ล่างขึ้นบน) คือกลับด้าน เริ่มจาก subproblem ที่เล็กที่สุดก่อน (fib(0), fib(1)) แล้วค่อย ๆ ไต่ขึ้นไป build คำตอบที่ใหญ่ขึ้นทีละขั้น โดยเก็บผลลง table (ตาราง) มักเป็น array ชื่อ dp ไม่ใช้ recursion เลย" },
      { t: "code", lang: "python", c: `def fib(n):
    if n < 2:
        return n
    dp = [0] * (n + 1)     # dp[i] = คำตอบของปัญหาย่อยขนาด i
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]  # transition: ต่อยอดจากตัวก่อนหน้า
    return dp[n]

print(fib(10))  # 55` },

      { t: "h2", c: "จับ 2 อย่างนี้ให้ได้ในทุกโจทย์ DP" },
      { t: "callout", title: "state + transition", c: "1) state (สถานะ) คืออะไร: dp[i] หมายถึงคำตอบของอะไร ต้อง define ให้ชัดก่อนเสมอ เช่น dp[i] = จำนวนวิธีถึงขั้นที่ i 2) transition (การเปลี่ยนสถานะ) คืออะไร: recurrence (สูตรความสัมพันธ์) ที่บอกว่า dp[i] compute จาก state ก่อนหน้าอย่างไร เช่น dp[i] = dp[i-1] + dp[i-2] เมื่อจับสองอย่างนี้ได้ ที่เหลือแค่กำหนด base case แล้วไล่เติม table" },
      { t: "p", c: "อีก trick (ทริค) ที่ใช้บ่อยในหมวดนี้คือ เมื่อ dp[i] depend on (พึ่งพา) แค่ค่าไม่กี่ตัวก่อนหน้า (เช่น dp[i-1], dp[i-2]) เราไม่จำเป็นต้องเก็บทั้ง array ใช้ variable (ตัวแปร) สองสามตัว rotate (หมุนค่า) แทนได้ ประหยัด Space จาก O(n) เหลือ O(1)" },
      { t: "p", c: "ในหน้านี้ทุกข้อเป็น DP แบบ 1 มิติ คือ state ใช้ index เดียว (dp[i]) พอ ในหมวดถัดไปเราจะเจอ DP ที่ state ต้องใช้สองมิติ" },

      { t: "callout", title: "พร้อมแล้วไปต่อ", c: "หมวดนี้มี 4 ข้อ ได้แก่ N-th Tribonacci Number (เลข Tribonacci, LC1137), Min Cost Climbing Stairs (ขึ้นบันไดถูกสุด, LC746), House Robber (ขโมยบ้าน, LC198) และ Domino and Tromino Tiling (ปูกระเบื้องโดมิโน, LC790) กดถัดไปเริ่มข้อแรกได้เลย" },
    ],
  },

  "lc75-p59": {
    slug: "lc75-p59",
    title: "ข้อ 59 · LC1137 N-th Tribonacci Number (เลข Tribonacci ตัวที่ n) 🟢",
    lead: "เหมือน Fibonacci แต่ sum สามตัวก่อนหน้า ฝึกยุบ DP table ให้เหลือ Space O(1)",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ N-th Tribonacci Number: คล้าย Fibonacci แต่ sum (บวก) สามตัวก่อนหน้า define ว่า T0 = 0, T1 = 1, T2 = 1 และ Tn = Tn-1 + Tn-2 + Tn-3 สำหรับ n >= 3 ให้ return Tn" },
      { t: "ul", c: [
        "n = 4 → 4 (ลำดับคือ 0,1,1,2,4)",
        "n = 25 → 1389537",
        "n = 0 → 0 (base case แยกจาก n = 1 และ 2)",
      ] },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "โจทย์นี้คือ DP 1 มิติแบบตำราเลย state คือ dp[i] = ค่า Tribonacci ตัวที่ i และ transition คือ dp[i] = dp[i-1] + dp[i-2] + dp[i-3] ถ้าเขียนตามนิยามด้วย recursion ตรง ๆ จะช้าเป็น O(3^n) เพราะเกิด overlapping subproblems เหมือน Fibonacci เป๊ะ" },
      { t: "p", c: "เราแก้ด้วย bottom-up ได้ แต่เพราะแต่ละตัว depend on แค่สามตัวก่อนหน้าเท่านั้น จึงไม่ต้องเก็บทั้ง array ใช้ variable สามตัว (a, b, c) rotate ไปข้างหน้าก็พอ ประหยัด Space เหลือ O(1)" },
      { t: "ol", c: [
        "ดัก base case ให้ครบ: n = 0 return 0, n = 1 หรือ 2 return 1",
        "initialize a, b, c = 0, 1, 1 แทน T0, T1, T2",
        "iterate ตั้งแต่ 3 ถึง n: update ทั้งสามตัวพร้อมกันด้วย a, b, c = b, c, a + b + c",
        "return c ซึ่งเป็นค่า Tn ล่าสุด",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", warn: true, c: "base case ต้องแยกให้ถูก: n = 0 ตอบ 0 ส่วน n = 1 กับ n = 2 ตอบ 1 ทั้งคู่ ถ้ารวบเป็น n < 2 แบบ Fibonacci จะได้ T2 ผิด (กลายเป็น 2 แทนที่จะเป็น 1) และการ assign พร้อมกันในบรรทัดเดียวสำคัญมาก ถ้าแยกเป็นสามบรรทัดจะ overwrite (ทับค่า) กันเอง" },

      { t: "h2", c: "ไล่ทีละสเต็ป" },
      { t: "p", c: "ไล่ n = 4 ดูค่า a, b, c rotate ไปแต่ละรอบ:" },
      { t: "table", head: ["รอบ (i)", "a", "b", "c", "หมายเหตุ"], rows: [
        ["เริ่ม", "0", "1", "1", "T0, T1, T2"],
        ["i = 3", "1", "1", "2", "c = 0+1+1 = 2 (T3)"],
        ["i = 4", "1", "2", "4", "c = 1+1+2 = 4 (T4)"],
        ["จบ", "-", "-", "4", "คืน c = 4"],
      ] },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "code", lang: "python", c: `def tribonacci(n):
    if n == 0:
        return 0
    if n <= 2:            # T1 และ T2 เท่ากับ 1
        return 1
    a, b, c = 0, 1, 1     # T0, T1, T2
    for _ in range(3, n + 1):
        a, b, c = b, c, a + b + c  # เลื่อนหน้าต่างสามตัวไปข้างหน้า
    return c

print(tribonacci(4))   # 4
print(tribonacci(25))  # 1389537` },
        { t: "p", c: "state คือ dp[i] = ค่า Tribonacci ตัวที่ i และ transition คือ dp[i] = dp[i-1] + dp[i-2] + dp[i-3] แต่เพราะแต่ละตัว depend on แค่สามตัวก่อนหน้า เราเลยไม่ต้องเก็บ array ทั้งก้อน ใช้ variable a, b, c แทน dp[i-3], dp[i-2], dp[i-1] แล้วเลื่อนไปข้างหน้าทีละก้าวด้วยการ assign พร้อมกัน (a, b, c = b, c, a+b+c)" },
        { t: "p", c: "ทำไมต้อง assign พร้อมกันบรรทัดเดียว? เพราะฝั่งขวาของ = จะถูก evaluate (คำนวณ) ให้เสร็จก่อนทั้งหมด แล้วค่อยจ่ายให้ฝั่งซ้าย ถ้าแยกเป็น a = b แล้ว b = c ทีละบรรทัด ค่า a เดิมจะถูก overwrite ก่อนที่เราจะได้ใช้ ทำให้ a + b + c ผิด" },
        { t: "p", c: "Time O(n) iterate รอบเดียวจาก 3 ถึง n · Space O(1) ใช้แค่สาม variable ไม่โตตาม n" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "เมื่อ dp[i] depend on ค่าไม่กี่ตัวก่อนหน้าแบบตายตัว ให้ยุบ table เหลือ variable จำนวนคงที่แล้ว rotate ค่า ได้ Space O(1) ทันที — เทคนิคนี้ใช้ได้กับ Fibonacci, Tribonacci และอีกหลายข้อในหมวดนี้" },
    ],
  },

  "lc75-p60": {
    slug: "lc75-p60",
    title: "ข้อ 60 · LC746 Min Cost Climbing Stairs (ขึ้นบันไดถูกสุด) 🟢",
    lead: "choose ก้าว 1 หรือ 2 ขั้นให้พ้นบันไดโดยจ่าย cost รวม minimum (น้อยที่สุด) ด้วย DP แบบ Fibonacci",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ Min Cost Climbing Stairs: มีบันไดที่แต่ละขั้นมี cost[i] (ค่าธรรมเนียม) ที่ต้องจ่ายเมื่อเหยียบขั้นนั้น จากขั้นหนึ่งเรา step (ก้าว) ได้ทีละ 1 หรือ 2 ขั้น จะเริ่มจากขั้น 0 หรือขั้น 1 ก็ได้ (ไม่เสียค่าเข้า) เป้าหมายคือ step ให้พ้นขั้นบนสุด (ถึงจุดเหนือ index สุดท้าย) โดยจ่ายรวม minimum" },
      { t: "ul", c: [
        "cost = [10,15,20] → 15 (เริ่มที่ขั้น 1 จ่าย 15 แล้วก้าว 2 ขั้นพ้นยอด)",
        "cost = [1,100,1,1,1,100,1,1,100,1] → 6 (เลี่ยงขั้นที่จ่าย 100 ทุกครั้ง)",
      ] },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "นี่คือ DP 1 มิติ pattern เดียวกับ Fibonacci เป๊ะ ต่างแค่ใช้ min แทนการ sum นิยาม dp[i] = cost น้อยสุดที่จะมาถึงขั้น i ก่อนเหยียบ การจะถึงขั้น i ได้ ต้อง jump (กระโดด) มาจากขั้น i-1 (จ่าย cost[i-1]) หรือขั้น i-2 (จ่าย cost[i-2]) เลือกทางที่ถูกกว่า" },
      { t: "p", c: "ประเด็นที่คนงงคือ cost อยู่ที่ตัวขั้น ไม่ใช่ที่การ step และเราจ่ายเมื่อออกจากขั้นนั้น การ define dp[i] เป็นค่าที่จะมาถึงขั้น i (ยังไม่เหยียบ i) ทำให้ transition สวย และเป้าหมายคือ dp[n] เมื่อ n คือ length ของ cost (จุดพ้นยอดซึ่งไม่มีค่า cost)" },
      { t: "ol", c: [
        "initialize dp ยาว n+1 โดย n = len(cost)",
        "ตั้ง base case: dp[0] = dp[1] = 0 เพราะเริ่มที่ขั้น 0 หรือ 1 ได้ฟรี",
        "iterate i จาก 2 ถึง n: dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])",
        "return dp[n] ซึ่งคือจุดพ้นบันได",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", warn: true, c: "อย่า return dp[n-1] เพราะนั่นคือค่ามาถึงขั้นสุดท้าย ไม่ใช่จุดพ้นบันได ต้อง return dp[n] และระวังว่าค่า cost ที่ sum คือ cost[i-1] / cost[i-2] (ขั้นที่ jump ออกมา) ไม่ใช่ cost[i]" },

      { t: "h2", c: "ไล่ทีละสเต็ป" },
      { t: "p", c: "ไล่ cost = [10,15,20] (n = 3):" },
      { t: "table", head: ["i", "dp[i-1]+cost[i-1]", "dp[i-2]+cost[i-2]", "dp[i]"], rows: [
        ["0", "-", "-", "0 (base)"],
        ["1", "-", "-", "0 (base)"],
        ["2", "0+15 = 15", "0+10 = 10", "10"],
        ["3", "10+20 = 30", "0+15 = 15", "15 ← คำตอบ"],
      ] },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "code", lang: "python", c: `def min_cost_climbing_stairs(cost):
    n = len(cost)
    dp = [0] * (n + 1)   # dp[i] = ค่าใช้จ่ายน้อยสุดเพื่อมาถึงขั้น i
    # dp[0] = dp[1] = 0 เพราะเริ่มที่ขั้น 0 หรือ 1 ได้ฟรี
    for i in range(2, n + 1):
        dp[i] = min(dp[i - 1] + cost[i - 1],   # มาจากขั้นก่อนหน้า
                    dp[i - 2] + cost[i - 2])   # มาจากขั้นก่อนสองขั้น
    return dp[n]

print(min_cost_climbing_stairs([10, 15, 20]))                # 15
print(min_cost_climbing_stairs([1,100,1,1,1,100,1,1,100,1])) # 6` },
        { t: "p", c: "การ define dp[i] เป็นค่าที่จะมาถึงขั้น i (ยังไม่เหยียบ i) ทำให้ transition สวย: จะยืนที่ขั้น i ได้ ต้อง jump มาจาก i-1 หรือ i-2 ซึ่งต้องจ่าย cost ของขั้นที่ jump ออกมา (cost[i-1] หรือ cost[i-2]) เป้าหมาย dp[n] คือจุดที่พ้นบันได (เหนือขั้นสุดท้าย) จึงไม่มีค่า cost" },
        { t: "p", c: "เพราะเริ่มที่ขั้น 0 หรือ 1 ได้ฟรี เราจึงตั้ง dp[0] = dp[1] = 0 เป็น base case แล้วไล่เติมจาก i = 2 ขึ้นไป โจทย์นี้คือ pattern เดียวกับ Fibonacci เป๊ะ ต่างแค่ใช้ min แทนการ sum ถ้าอยากประหยัด Space ยุบเหลือสอง variable แทน table ได้เช่นเดียวกับข้อ Tribonacci" },
        { t: "p", c: "Time O(n) iterate table รอบเดียว · Space O(n) จาก array dp (ลดเหลือ O(1) ได้ด้วย variable สองตัวแทน table)" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "โจทย์ minimize/maximize ที่แต่ละ state ต่อยอดจากไม่กี่ state ก่อนหน้า ใช้โครง Fibonacci ได้เลย เพียงเปลี่ยน operator (ตัวดำเนินการ) จาก sum → min/max และ define state ให้ตรงกับสิ่งที่ต้องการวัด" },
    ],
  },

  "lc75-p61": {
    slug: "lc75-p61",
    title: "ข้อ 61 · LC198 House Robber (ขโมยบ้าน) 🟡",
    lead: "choose ขโมยบ้านให้ได้เงิน maximum โดยห้ามขโมยสองหลัง adjacent (ติดกัน) ด้วย DP แบบ take/skip",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ House Robber: มีบ้านเรียงเป็น array nums[i] คือเงินในบ้านหลังที่ i เราขโมยได้ แต่ห้ามขโมยบ้านสองหลังที่ adjacent (ติดกัน) เพราะ alarm (ระบบเตือนภัย) จะทำงาน ให้หาเงินรวม maximum (มากที่สุด) ที่ขโมยได้" },
      { t: "ul", c: [
        "nums = [1,2,3,1] → 4 (ขโมยหลัง 0 และ 2 ได้ 1+3 = 4)",
        "nums = [2,7,9,3,1] → 12 (ขโมยหลัง 0, 2, 4 ได้ 2+9+1 = 12)",
        "nums = [2,1,1,2] → 4 (ขโมยหลังแรกกับหลังสุดท้าย เว้นสองหลังก็ได้)",
      ] },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "โจทย์นี้เป็น DP 1 มิติแบบ take/skip (เลือก/ไม่เลือก) คลาสสิก ที่บ้านหลังที่ i เรามีสอง choice: skip (ไม่ขโมย, คำตอบเท่ากับถึงหลัง i-1) หรือ take (ขโมย, ได้ nums[i] บวกคำตอบถึงหลัง i-2 เพราะต้องข้ามหลังที่ adjacent) เลือกทางที่ได้เงินมากกว่า" },
      { t: "p", c: "state คือ dp[i] = เงิน maximum เมื่อพิจารณาถึงบ้านหลังที่ i และ transition คือ dp[i] = max(dp[i-1], dp[i-2] + nums[i]) เพราะ dp[i] depend on แค่ dp[i-1] กับ dp[i-2] เราจึงยุบ table เหลือสอง variable prev กับ curr แล้ว rotate ไปข้างหน้าได้เลย" },
      { t: "ol", c: [
        "initialize prev = 0 (เงิน maximum ถึงบ้านก่อนหน้า) และ curr = 0 (เงิน maximum ถึงบ้านปัจจุบัน)",
        "iterate แต่ละหลัง money ใน nums",
        "compute ค่าใหม่: skip (curr) เทียบกับ take (prev + money) เลือกตัวมากกว่า",
        "rotate ค่าด้วย prev, curr = curr, max(curr, prev + money)",
        "return curr",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", warn: true, c: "อย่าคิดว่าต้องขโมยเว้นบ้านสลับกันตายตัว จริง ๆ แค่ห้าม adjacent เท่านั้น เช่น [2,1,1,2] คำตอบที่ดีที่สุดคือขโมยหลังแรกกับหลังสุดท้าย (2+2 = 4) ซึ่งเว้นสองหลัง max transition จัดการกรณีนี้ให้อัตโนมัติ ไม่ต้องเขียนเงื่อนไขพิเศษ" },

      { t: "h2", c: "ไล่ทีละสเต็ป" },
      { t: "p", c: "ไล่ nums = [2,7,9,3,1] ดูค่า prev กับ curr rotate ไป:" },
      { t: "table", head: ["money", "prev + money", "curr ใหม่ = max", "prev, curr หลัง rotate"], rows: [
        ["2", "0+2 = 2", "max(0,2) = 2", "prev=0, curr=2"],
        ["7", "0+7 = 7", "max(2,7) = 7", "prev=2, curr=7"],
        ["9", "2+9 = 11", "max(7,11) = 11", "prev=7, curr=11"],
        ["3", "7+3 = 10", "max(11,10) = 11", "prev=11, curr=11"],
        ["1", "11+1 = 12", "max(11,12) = 12", "prev=11, curr=12 ← คำตอบ"],
      ] },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "code", lang: "python", c: `def rob(nums):
    # prev = เงินมากสุดถึงบ้านก่อนหน้า, curr = เงินมากสุดถึงบ้านปัจจุบัน
    prev, curr = 0, 0
    for money in nums:
        # ไม่ขโมยหลังนี้ (curr) เทียบกับ ขโมยหลังนี้ (prev + money)
        prev, curr = curr, max(curr, prev + money)
    return curr

print(rob([1, 2, 3, 1]))     # 4
print(rob([2, 7, 9, 3, 1]))  # 12` },
        { t: "p", c: "transition คือ dp[i] = max(dp[i-1], dp[i-2] + nums[i]) ความหมายคือ ที่บ้านหลังนี้เรามีสอง choice: skip (คำตอบเท่าเดิมกับ dp[i-1]) หรือ take (ต้องข้ามหลัง adjacent จึงต่อยอดจาก dp[i-2] แล้ว sum เงินหลังนี้) เพราะ depend on แค่สองค่าก่อนหน้า เราจึงแทน dp[i-2] ด้วย prev และ dp[i-1] ด้วย curr" },
        { t: "p", c: "จุดสำคัญของการ rotate คือ prev, curr = curr, max(curr, prev + money) ทำพร้อมกันในบรรทัดเดียว: prev ตัวใหม่ต้องเป็น curr ตัวเก่า ส่วน curr ตัวใหม่ compute จาก curr และ prev ตัวเก่า ถ้าแยกบรรทัดจะ overwrite กันเอง initialize ด้วย 0 ทั้งคู่ครอบคลุมกรณี nums ว่างและหลังแรกได้พอดี" },
        { t: "p", c: "Time O(n) iterate ครั้งเดียว · Space O(1) ใช้สอง variable แทน table" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "โจทย์ take/skip โดยมี constraint (ข้อจำกัด) ห้ามเลือกของที่ adjacent ให้ตั้ง dp[i] = max(skip dp[i-1], take dp[i-2] + ค่าปัจจุบัน) แล้วยุบเหลือสอง variable — pattern นี้ต่อยอดไปโจทย์ House Robber II และอื่น ๆ ได้" },
    ],
  },

  "lc75-p62": {
    slug: "lc75-p62",
    title: "ข้อ 62 · LC790 Domino and Tromino Tiling (ปูกระเบื้องโดมิโน) 🟡",
    lead: "count (นับ) จำนวนวิธีปู board 2xn ด้วย domino และ tromino ด้วย DP recurrence และการ mod เลขใหญ่",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ Domino and Tromino Tiling: มี board (กระดาน) ขนาด 2 x n ช่อง ต้องปูให้เต็มด้วย tile (กระเบื้อง) สองแบบ: domino (โดมิโน, 2 ช่องเรียงกัน วางแนวตั้งหรือแนวนอนก็ได้) และ tromino (โทรมิโน, รูปตัว L ครอบ 3 ช่อง rotate ได้ 4 ทิศ) ให้ count จำนวนวิธีปูที่ต่างกันทั้งหมด แล้วตอบเป็นเศษเหลือ mod 1000000007 (เพราะเลขใหญ่มาก)" },
      { t: "ul", c: [
        "n = 1 → 1 (ปูโดมิโนแนวตั้งได้แบบเดียว)",
        "n = 3 → 5",
        "n = 4 → 11",
      ] },
      { t: "callout", title: "เงื่อนไขสำคัญ", c: "คำตอบต้อง mod 1000000007 (คือ 10^9 + 7) เพราะจำนวนวิธีโตเร็วมากจนเลขใหญ่มหาศาล และต้อง mod ทุกก้าวระหว่างคำนวณ ไม่ใช่แค่ตอนท้าย" },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "โจทย์นี้เป็น DP 1 มิติ (state = จำนวน column ที่ปูเสร็จ) แต่ transition หายากด้วยการมองตรง ๆ เพราะการวาง tromino ทำให้เกิดขอบหยัก ต้อง analyze (วิเคราะห์) กรณีปิด column สุดท้ายอย่างละเอียด ผลลัพธ์ยุบลงมาเป็น recurrence ลัดที่ prove (พิสูจน์) ได้: dp[n] = 2 * dp[n-1] + dp[n-3]" },
      { t: "p", c: "state คือ dp[i] = จำนวนวิธีปู board 2 x i ให้เต็มพอดี base case คือ dp[0] = 1 (board ว่างมีหนึ่งวิธีคือไม่ทำอะไร), dp[1] = 1, dp[2] = 2 ในทางปฏิบัติเรามักจำ recurrence นี้ไว้เลยเพราะ proof (การพิสูจน์) เต็ม ๆ ค่อนข้างยาว" },
      { t: "ol", c: [
        "define MOD = 10**9 + 7",
        "ดัก n <= 2 return n ตรง ๆ (n=1 → 1, n=2 → 2)",
        "initialize dp ยาว n+1 ตั้ง dp[0], dp[1], dp[2] = 1, 1, 2",
        "iterate i จาก 3 ถึง n: dp[i] = (2 * dp[i-1] + dp[i-3]) % MOD",
        "return dp[n]",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", warn: true, c: "ลืมใส่ mod ทุกก้าว ถ้า mod แค่ตอนท้าย เลขระหว่างทางจะใหญ่มาก (ในภาษาอื่นจะ overflow ส่วน Python จะช้าเพราะเลขยักษ์) และต้องตั้ง base case ให้ครบสามตัว (dp[0], dp[1], dp[2]) เพราะ recurrence อ้างถึง dp[n-3]" },

      { t: "h2", c: "ไล่ทีละสเต็ป" },
      { t: "p", c: "ไล่จนถึง n = 4 ด้วย recurrence dp[i] = 2*dp[i-1] + dp[i-3]:" },
      { t: "table", head: ["i", "recurrence", "dp[i]"], rows: [
        ["0", "base", "1"],
        ["1", "base", "1"],
        ["2", "base", "2"],
        ["3", "2*dp[2] + dp[0] = 2*2 + 1", "5"],
        ["4", "2*dp[3] + dp[1] = 2*5 + 1", "11"],
      ] },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "code", lang: "python", c: `def num_tilings(n):
    MOD = 10**9 + 7
    if n <= 2:
        return n          # n=1 -> 1, n=2 -> 2
    dp = [0] * (n + 1)
    dp[0], dp[1], dp[2] = 1, 1, 2   # base case
    for i in range(3, n + 1):
        dp[i] = (2 * dp[i - 1] + dp[i - 3]) % MOD
    return dp[n]

print(num_tilings(3))   # 5
print(num_tilings(4))   # 11
print(num_tilings(30))  # 312342182` },
        { t: "p", c: "การหา transition dp[n] = 2*dp[n-1] + dp[n-3] มาจากการวิเคราะห์ว่าตอนปิดคอลัมน์สุดท้ายทำได้กี่แบบ: วางโดมิโนแนวตั้งหนึ่งอันปิดคอลัมน์เดียว (ต่อจาก dp[n-1]), วางโดมิโนแนวนอนสองอันปิดสองคอลัมน์ (ต่อจาก dp[n-2]), หรือวางโทรมิโนที่ทำให้เกิดขอบหยัก การรวมกรณีขอบหยักทั้งหมดยุบลงมาได้เป็นสูตรกระชับข้างต้น ในการแก้โจทย์จริง เรามักจำสูตรนี้ไว้เลย" },
        { t: "p", c: "จุดที่พลาดบ่อยคือลืมใส่ mod ทุกก้าว ถ้าใส่แค่ตอนท้าย เลขระหว่างทางจะใหญ่มาก และต้องตั้ง base case ให้ครบสามตัว (dp[0], dp[1], dp[2]) เพราะสูตรอ้างถึง dp[n-3] ถ้าตั้งไม่ครบ ตอน i = 3 จะไปอ่าน dp[0] ที่ต้องเป็น 1 ไม่ใช่ 0" },
        { t: "p", c: "Time O(n) ไล่ตารางรอบเดียว · Space O(n) จากลิสต์ dp (ลดเหลือ O(1) ได้ด้วยการเก็บแค่สามค่าล่าสุด)" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "โจทย์นับวิธี (counting) มักมี transition เป็นผลบวกของหลายกรณีการปิดสถานะสุดท้าย และเมื่อจำนวนโตเร็วโจทย์จะให้ mod ด้วยจำนวนเฉพาะใหญ่ — จำไว้ว่าต้อง mod ทุกก้าวเสมอ ไม่ใช่แค่ตอนคืนค่า" },
    ],
  },
};
