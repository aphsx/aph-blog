import type { Page } from "@/lib/types";

const GROUP = "บทที่ 3: Debugging, Profiling & Performance";

export const debuggingPages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "dbg-debugger": {
    slug: "dbg-debugger",
    title: "ใช้ Debugger จริง (pdb / VS Code)",
    lead: "เลิก debug ด้วย print อย่างเดียว — หยุดโปรแกรมแล้วเดินดู state ทีละบรรทัดด้วย debugger",
    group: GROUP,
    blocks: [
      { t: "p", c: "เมื่อโค้ดทำงานไม่เป็นไปตามคาด มือใหม่มักโรย print() ไปทั่วแล้วลบทีหลัง แต่ debugger ให้คุณ \"หยุดเวลา\" ในโปรแกรมแล้วสำรวจค่าตัวแปรทุกตัวได้ทันที breakpoint เดียวมักบอกได้มากกว่า print สิบบรรทัด — เป็นทักษะที่ช่วยให้แก้บั๊กได้เร็วและตรงจุด" },
      { t: "callout", title: "พิมพ์ตามจริง", c: "หัวข้อนี้ต้องลงมือ เปิดไฟล์ .py แล้วลองใส่ breakpoint() รันใน terminal และลองตั้ง breakpoint ใน VS Code — อ่านเฉย ๆ ไม่ทำให้ใช้เป็น" },

      { t: "h2", c: "breakpoint() — เริ่มที่ง่ายที่สุด" },
      { t: "p", c: "ตั้งแต่ Python 3.7 แค่ใส่ breakpoint() ตรงจุดที่อยากหยุด เมื่อรันโปรแกรมจะหยุดตรงนั้นและเปิด pdb (Python debugger) ให้พิมพ์คำสั่งสำรวจ" },
      { t: "code", lang: "python", c: "def calculate_total(items):\n    total = 0\n    for item in items:\n        breakpoint()          # โปรแกรมหยุดตรงนี้ทุกรอบ\n        total += item[\"price\"] * item[\"qty\"]\n    return total\n\ncalculate_total([{\"price\": 10, \"qty\": 2}])" },

      { t: "h2", c: "คำสั่ง pdb ที่ใช้บ่อย" },
      { t: "p", c: "เมื่อหยุดที่ breakpoint จะเห็น prompt (Pdb) ให้พิมพ์คำสั่งเหล่านี้สำรวจและเดินโปรแกรม" },
      {
        t: "table",
        head: ["คำสั่ง", "ย่อ", "ทำอะไร"],
        rows: [
          ["next", "n", "รันบรรทัดถัดไป (ไม่เข้าไปในฟังก์ชัน)"],
          ["step", "s", "รันบรรทัดถัดไป (เข้าไปในฟังก์ชัน)"],
          ["continue", "c", "รันต่อจนถึง breakpoint ถัดไป"],
          ["print", "p ตัวแปร", "แสดงค่าตัวแปร"],
          ["list", "l", "แสดงโค้ดรอบ ๆ จุดที่หยุด"],
          ["quit", "q", "ออกจาก debugger"],
        ],
      },
      { t: "code", lang: "text", c: "(Pdb) p total          # ดูค่า total ตอนนี้\n0\n(Pdb) p item           # ดู item ปัจจุบัน\n{'price': 10, 'qty': 2}\n(Pdb) n                # รันบรรทัดถัดไป\n(Pdb) p total\n20\n(Pdb) c                # รันต่อ" },

      { t: "h2", c: "รันทั้งไฟล์ใต้ pdb" },
      { t: "code", lang: "bash", c: "python -m pdb myscript.py\n# หยุดตั้งแต่บรรทัดแรก พิมพ์ n เดินทีละบรรทัด หรือ c รันจนเจอ error" },

      { t: "h2", c: "VS Code debugger (วิธีที่ใช้จริงบ่อยสุด)" },
      { t: "p", c: "ในงานจริงคนนิยม debugger แบบกราฟิกใน editor มากกว่า pdb เพราะเห็นภาพ:" },
      {
        t: "ul",
        c: [
          "คลิกซ้ายของเลขบรรทัดเพื่อตั้ง breakpoint (จุดแดง)",
          "กด F5 เพื่อรันแบบ debug — โปรแกรมหยุดที่จุดแดง",
          "ดูค่าตัวแปรทั้งหมดในแผง Variables ทางซ้าย",
          "Step Over (F10) / Step Into (F11) เดินทีละบรรทัด",
          "ดู Call Stack ว่าตอนนี้ถูกเรียกมาจากไหน",
          "เลื่อนเมาส์ไปบนตัวแปรเพื่อดูค่าได้ทันที",
        ],
      },
      { t: "callout", title: "เปรียบเทียบให้เห็นภาพ", c: "debugger = หยุดเวลาในโปรแกรมแล้วเดินสำรวจทีละก้าว เห็นทุกตัวแปรพร้อมกัน ส่วน print = ส่องไฟฉายทีละจุด ต้องเดาก่อนว่าจะส่องตรงไหน เมื่อ bug ซับซ้อน debugger ประหยัดเวล​ากว่ามาก" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "ใส่ breakpoint() เพื่อหยุดโปรแกรมแล้วเปิด pdb",
          "คำสั่ง pdb หลัก: n (next), s (step), c (continue), p (print), l (list), q (quit)",
          "รันทั้งไฟล์ใต้ debugger: python -m pdb script.py",
          "VS Code: คลิกตั้ง breakpoint → F5 → ดู Variables/Call Stack — นิยมสุดในงานจริง",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ใส่ breakpoint() ในฟังก์ชันที่มี loop แล้วใช้ p ดูค่าตัวแปรแต่ละรอบ  2) ลองคำสั่ง n vs s กับโค้ดที่เรียกฟังก์ชันย่อย สังเกตความต่าง  3) ตั้ง breakpoint ใน VS Code แล้วกด F5 ดู Variables  4) เอาโค้ดที่มี bug มาหาจุดผิดด้วย debugger แทน print" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: อ่าน Traceback & กลยุทธ์ Debug →", slug: "dbg-traceback", desc: "อ่าน error ให้ขาด + ไล่ bug อย่างเป็นระบบ" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dbg-traceback": {
    slug: "dbg-traceback",
    title: "อ่าน Traceback & กลยุทธ์ Debug",
    lead: "อ่าน error message ให้ขาด และไล่หา bug อย่างเป็นระบบ แทนการแก้มั่ว",
    group: GROUP,
    blocks: [
      { t: "p", c: "เมื่อโปรแกรมพัง Python พิมพ์ traceback ออกมา — มันไม่ใช่ \"ข้อความน่ากลัว\" แต่คือแผนที่บอกว่า error เกิดที่ไหนและเดินทางมายังไง การอ่านมันเป็นช่วยให้แก้ bug ได้ในไม่กี่วินาที และการมีกลยุทธ์ที่เป็นระบบช่วยให้ไม่หลงทาง" },

      { t: "h2", c: "อ่าน traceback จากล่างขึ้นบน" },
      { t: "p", c: "traceback อ่าน \"บรรทัดล่างสุดก่อน\" เพราะนั่นคือชนิด error และข้อความจริง ส่วนข้างบนคือลำดับการเรียกที่นำมาถึงจุดพัง (เก่าสุดอยู่บน ใหม่สุด/จุดพังจริงอยู่ล่าง)" },
      { t: "code", lang: "text", c: "Traceback (most recent call last):\n  File \"app.py\", line 12, in <module>\n    main()\n  File \"app.py\", line 8, in main\n    result = divide(10, 0)\n  File \"app.py\", line 4, in divide\n    return a / b\nZeroDivisionError: division by zero" },
      { t: "p", c: "อ่านล่างขึ้นบน: (1) error คือ ZeroDivisionError: division by zero (2) เกิดที่ app.py บรรทัด 4 ใน divide ที่ return a / b (3) divide ถูกเรียกจาก main บรรทัด 8 (4) main ถูกเรียกจากบรรทัด 12 — เห็นเส้นทางครบ" },
      { t: "callout", title: "จุดพังจริงอยู่ล่างสุดเสมอ", c: "บรรทัดสุดท้าย = ชนิด error + ข้อความ; บรรทัด File ... ที่อยู่เหนือมันติดกัน = ตำแหน่งที่ error เกิดจริง อ่านสองอย่างนี้ก่อน แล้วค่อยไล่ขึ้นไปดูว่าถูกเรียกมายังไง" },

      { t: "h2", c: "exception chaining ใน traceback" },
      { t: "p", c: "ถ้าใช้ raise ... from ... (จากบท Exception) traceback จะแสดง 2 ส่วนเชื่อมด้วย \"The above exception was the direct cause...\" — บอกทั้ง error ที่โยนใหม่และต้นตอเดิม" },

      { t: "h2", c: "กลยุทธ์ debug 4 ขั้น (ทำตามลำดับ)" },
      { t: "p", c: "อย่าแก้มั่ว ทำตามลำดับนี้จะหา bug ได้เร็วและไม่หลงทาง:" },
      {
        t: "ol",
        c: [
          "ทำซ้ำให้ได้ก่อน (reproduce) — หา input/ขั้นตอนที่ทำให้พังทุกครั้ง ถ้าทำซ้ำไม่ได้ ยังแก้ไม่ได้",
          "จำกัดวง (narrow down) — แบ่งครึ่งหาว่า bug อยู่ช่วงไหน ด้วย print/breakpoint หรือคอมเมนต์โค้ดออกทีละส่วน",
          "ตั้งสมมติฐาน + พิสูจน์ — เดาว่าอะไรผิด แล้วหาวิธีพิสูจน์/หักล้าง อย่าเดาแล้วแก้เลย",
          "แก้ทีละอย่าง + ยืนยัน — แก้จุดเดียว รันเช็คว่าหาย อย่าแก้หลายอย่างพร้อมกันจนไม่รู้ว่าอะไรได้ผล",
        ],
      },
      { t: "callout", title: "ทำซ้ำ bug ให้ได้ก่อนเสมอ", warn: true, c: "ถ้ายังทำให้ bug เกิดซ้ำไม่ได้ตามต้องการ แสดงว่ายังไม่เข้าใจมันพอจะแก้ การ \"แก้\" โดยไม่ทำซ้ำได้ มักได้แค่บังเอิญหาย แล้วกลับมาใหม่ — reproduce คือก้าวแรกเสมอ" },

      { t: "h2", c: "rubber duck debugging" },
      { t: "p", c: "เทคนิคคลาสสิก: อธิบายโค้ดทีละบรรทัดออกเสียงให้ \"เป็ดยาง\" (หรืออะไรก็ได้) ฟัง บ่อยครั้งคุณจะเจอจุดผิดเองระหว่างอธิบาย เพราะการเรียบเรียงเป็นคำพูดบังคับให้คิดให้ชัด" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "อ่าน traceback จากล่างขึ้นบน: ชนิด error + ตำแหน่งจริงอยู่ล่างสุด",
          "ส่วนบนคือเส้นทางการเรียก (call stack) ที่นำมาถึงจุดพัง",
          "กลยุทธ์: reproduce → narrow down → ตั้ง+พิสูจน์สมมติฐาน → แก้ทีละอย่าง",
          "ทำซ้ำ bug ให้ได้ก่อนแก้เสมอ; ลองอธิบายโค้ดออกเสียง (rubber duck)",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เอา traceback ที่ให้มาบอกว่า error อยู่ไฟล์/บรรทัดไหน เพราะอะไร  2) เขียนโค้ดที่จงใจให้เกิด KeyError แล้วอ่าน traceback หาจุดเกิด  3) ฝึกกลยุทธ์ 4 ขั้นกับ bug จริงในแบบฝึกหัดก่อนหน้า  4) ลอง rubber duck อธิบายฟังก์ชันที่งง ๆ ให้คนอื่น/ตัวเองฟัง" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Profiling — วัดว่าช้าตรงไหน →", slug: "dbg-profiling", desc: "หา bottleneck ด้วยข้อมูล ไม่ใช่เดา" },
          { title: "← ก่อนหน้า: ใช้ Debugger จริง", slug: "dbg-debugger" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dbg-profiling": {
    slug: "dbg-profiling",
    title: "Profiling — วัดว่าช้าตรงไหน",
    lead: "หาจุดที่ทำให้โปรแกรมช้าด้วยข้อมูลจริงจาก timeit และ cProfile แทนการเดา",
    group: GROUP,
    blocks: [
      { t: "p", c: "เมื่อโปรแกรมช้า สัญชาตญาณมักเดาผิดว่าช้าตรงไหน การ profiling คือ \"วัดของจริง\" ว่าเวลาหมดไปกับส่วนไหน เพื่อจะได้แก้ถูกจุด — กฎข้อแรกของการ optimize คือ วัดก่อน อย่าเดา" },

      { t: "h2", c: "timeit — วัดโค้ดเล็ก ๆ" },
      { t: "p", c: "ใช้เทียบว่า 2 วิธีเขียน วิธีไหนเร็วกว่า timeit รันโค้ดซ้ำหลายครั้งแล้วเฉลี่ย ให้ผลแม่นกว่าจับเวลาเอง" },
      { t: "code", lang: "python", c: "import timeit\n\n# เทียบ: สร้าง list ด้วย loop vs comprehension\nloop_time = timeit.timeit(\n    \"result = []\\nfor i in range(1000): result.append(i*i)\",\n    number=10000,\n)\ncomp_time = timeit.timeit(\n    \"result = [i*i for i in range(1000)]\",\n    number=10000,\n)\nprint(f\"loop: {loop_time:.3f}s\")\nprint(f\"comprehension: {comp_time:.3f}s\")   # มักเร็วกว่า" },

      { t: "h2", c: "time.perf_counter — จับเวลาช่วงโค้ดจริง" },
      { t: "code", lang: "python", c: "import time\n\nstart = time.perf_counter()\ntotal = sum(i * i for i in range(10_000_000))\nelapsed = time.perf_counter() - start\nprint(f\"ใช้เวลา {elapsed:.3f} วินาที\")" },
      { t: "callout", title: "perf_counter ไม่ใช่ time.time", c: "ใช้ time.perf_counter() สำหรับวัดช่วงเวลา (ความละเอียดสูง) ไม่ใช่ time.time() ที่ไว้ดูเวลานาฬิกาจริง — จำสำนวนนี้ได้จาก decorator @timer ในบท 1" },

      { t: "h2", c: "cProfile — profile ทั้งโปรแกรม" },
      { t: "p", c: "เมื่อโปรแกรมใหญ่ ไม่รู้ว่าช้าตรงฟังก์ชันไหน cProfile วัดทุกฟังก์ชันให้ว่าถูกเรียกกี่ครั้งและใช้เวลาเท่าไร" },
      { t: "code", lang: "python", c: "import cProfile\n\ndef slow_function():\n    return sum(i ** 2 for i in range(1_000_000))\n\ndef main():\n    for _ in range(10):\n        slow_function()\n\ncProfile.run(\"main()\")" },
      { t: "code", lang: "bash", c: "# หรือรันทั้งไฟล์จาก command line\npython -m cProfile -s cumtime myscript.py" },
      { t: "p", c: "ผลลัพธ์มีคอลัมน์สำคัญ: ncalls (ถูกเรียกกี่ครั้ง), tottime (เวลาในฟังก์ชันเองไม่รวมลูก), cumtime (เวลารวมทั้งที่เรียกฟังก์ชันอื่น) — ดู cumtime สูง ๆ คือจุดที่ควรแก้ก่อน" },

      { t: "callout", title: "อย่า optimize ก่อนวัด", warn: true, c: "\"Premature optimization is the root of all evil\" — อย่าเสียเวลาแต่งโค้ดให้เร็วในจุดที่ไม่ได้ช้าจริง เขียนให้ถูกและอ่านง่ายก่อน พอช้าค่อย profile หาจุดจริงแล้วแก้เฉพาะจุดนั้น (เชื่อมกับ Big-O ในบท DSA)" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "timeit เทียบความเร็ว 2 วิธีเขียน (รันซ้ำเฉลี่ย)",
          "time.perf_counter() จับเวลาช่วงโค้ดจริง (ไม่ใช่ time.time)",
          "cProfile วัดทุกฟังก์ชัน — ดู cumtime สูงคือจุดแก้ก่อน",
          "วัดก่อนแก้เสมอ — อย่า optimize จุดที่ไม่ได้ช้าจริง",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ใช้ timeit เทียบ \"x in list\" กับ \"x in set\" บนข้อมูล 10000 ตัว  2) ใช้ perf_counter จับเวลาฟังก์ชันที่เขียนเอง  3) ใช้ cProfile กับโปรแกรมที่มีหลายฟังก์ชัน หาว่า cumtime สูงสุดอยู่ที่ไหน  4) อธิบายความหมายของ premature optimization" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: เทคนิคเพิ่มประสิทธิภาพ →", slug: "dbg-performance", desc: "แก้ให้เร็วขึ้นด้วยวิธีถูกต้อง" },
          { title: "← ก่อนหน้า: อ่าน Traceback", slug: "dbg-traceback" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "dbg-performance": {
    slug: "dbg-performance",
    title: "เทคนิคเพิ่มประสิทธิภาพ",
    lead: "พอ profile เจอจุดช้าแล้ว แก้อย่างถูกวิธี — เลือกโครงสร้างข้อมูลถูก และ cache ผลลัพธ์",
    group: GROUP,
    blocks: [
      { t: "p", c: "หลังจาก profile เจอว่าช้าตรงไหนแล้ว หัวข้อนี้รวมเทคนิคแก้ให้เร็วขึ้นที่ได้ผลจริง โดยมากการเปลี่ยนโครงสร้างข้อมูลหรือ cache ผลลัพธ์ให้ผลกว่าการแต่งโค้ดเล็ก ๆ หลายเท่า" },

      { t: "h2", c: "เลือกโครงสร้างข้อมูลให้ถูก (ผลกระทบใหญ่สุด)" },
      { t: "p", c: "การเช็คว่า \"มีอยู่ใน collection ไหม\" บน list เป็น O(n) (ไล่ดูทีละตัว) แต่บน set/dict เป็น O(1) (กระโดดถึงเลย) แค่เปลี่ยนชนิดก็เร็วขึ้นมหาศาลเมื่อข้อมูลเยอะ" },
      { t: "code", lang: "python", c: "# ❌ ช้า: ค้นใน list เป็น O(n) ต่อครั้ง\nallowed_list = list(range(100000))\ndef check_slow(x):\n    return x in allowed_list      # ไล่ทีละตัว\n\n# ✅ เร็ว: ค้นใน set เป็น O(1) ต่อครั้ง\nallowed_set = set(range(100000))\ndef check_fast(x):\n    return x in allowed_set       # กระโดดถึงเลย\n\n# ลอง timeit เทียบ — set เร็วกว่าหลายร้อยเท่าเมื่อข้อมูลเยอะ" },
      { t: "callout", title: "หลักการสำคัญ", c: "เปลี่ยน data structure ให้เหมาะมักเร็วกว่า micro-optimization (แต่งโค้ดทีละบรรทัด) เป็นสิบเท่า — \"ต้องค้นบ่อย → ใช้ set/dict\" เป็นกฎที่จำไว้ได้เลย (เจาะลึกใน บท DSA)" },

      { t: "h2", c: "หลีกเลี่ยง loop ซ้อนที่ไม่จำเป็น" },
      { t: "p", c: "loop ซ้อน (nested loop) มักเป็น O(n²) ถ้าใช้ set/dict ช่วยจำของที่เคยเจอ มักลดเหลือ O(n)" },
      { t: "code", lang: "python", c: "# ❌ O(n²): หาคู่ที่บวกกันได้ target ด้วย loop ซ้อน\ndef two_sum_slow(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return (i, j)\n\n# ✅ O(n): ใช้ dict จำตัวที่เคยเจอ\ndef two_sum_fast(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return (seen[target - n], i)\n        seen[n] = i" },

      { t: "h2", c: "caching / memoization ด้วย lru_cache" },
      { t: "p", c: "ถ้าฟังก์ชันถูกเรียกซ้ำด้วย argument เดิมบ่อย ๆ การ cache ผลลัพธ์ช่วยได้มาก @functools.lru_cache ทำให้อัตโนมัติ — จำคำว่า decorator จากบท 1 ได้ไหม นี่คือการใช้จริง" },
      { t: "code", lang: "python", c: "import functools\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(40))   # เร็วมาก เพราะผลที่คำนวณแล้วถูก cache ไว้\n# ไม่มี cache: fib(40) คำนวณซ้ำเป็นล้านครั้ง ช้ามาก" },
      { t: "callout", title: "นำไปสู่ Dynamic Programming", c: "แนวคิด \"จำผลที่คำนวณแล้ว ไม่คำนวณซ้ำ\" คือหัวใจของ memoization และต่อยอดเป็น Dynamic Programming ในบท DSA — lru_cache คือ DP แบบ top-down สำเร็จรูป" },

      { t: "h2", c: "generator ประหยัด memory" },
      { t: "p", c: "ถ้าวนข้อมูลใหญ่ครั้งเดียว ใช้ generator (บท 1) แทน list เพื่อไม่ให้ RAM ล้น — performance ไม่ใช่แค่เรื่องเวลา แต่รวมถึง memory" },
      { t: "code", lang: "python", c: "# ❌ สร้าง list ใหญ่ในหน่วยความจำ\ntotal = sum([i * i for i in range(10_000_000)])\n\n# ✅ generator: ผลิตทีละตัว ไม่กอง RAM\ntotal = sum(i * i for i in range(10_000_000))" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "เลือก data structure ถูก = ผลกระทบใหญ่สุด (ค้นบ่อย → set/dict O(1))",
          "เลี่ยง loop ซ้อน O(n²) — ใช้ dict/set จำของที่เจอ ลดเหลือ O(n)",
          "@functools.lru_cache cache ผลลัพธ์ฟังก์ชันที่เรียกซ้ำ (= memoization)",
          "generator ประหยัด memory เมื่อวนข้อมูลใหญ่ครั้งเดียว",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียนโค้ดที่เช็คสมาชิกใน list แล้วเปลี่ยนเป็น set พร้อม timeit เทียบ  2) แก้ two_sum จาก O(n²) เป็น O(n) ด้วย dict  3) ใส่ @lru_cache ให้ฟังก์ชัน fib แล้วเทียบเวล​ากับแบบไม่มี  4) แปลง list comprehension ที่ใหญ่ใน sum() ให้เป็น generator" },
      {
        t: "links",
        c: [
          { title: "จบบทที่ 3 แล้ว 🎉 — กลับหน้าภาพรวมคอร์ส", slug: "intermediate", desc: "บทที่ 4: โครงสร้างโปรเจกต์ & เครื่องมือ กำลังจัดทำ" },
          { title: "← ก่อนหน้า: Profiling", slug: "dbg-profiling" },
          { title: "ทบทวน: ใช้ Debugger จริง (ต้นบท)", slug: "dbg-debugger" },
        ],
      },
    ],
  },
};
