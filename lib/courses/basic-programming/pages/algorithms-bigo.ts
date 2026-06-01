import type { Page } from "@/lib/types";

export const algorithmsBigoPages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "algo-thinking": {
    slug: "algo-thinking",
    title: "คิดเป็นขั้นตอน (Algorithmic Thinking)",
    lead: "อัลกอริทึมคืออะไร, แตกปัญหาเป็นขั้นตอน, เขียน pseudocode ก่อนลงโค้ดจริง",
    group: "บทที่ 4: อัลกอริทึม & Big-O",
    blocks: [
      { t: "p", c: "อัลกอริทึม (algorithm) คือลำดับขั้นตอนในการแก้ปัญหา เหมือนสูตรอาหารที่บอกทำทีละขั้นจนได้ผลลัพธ์ ก่อนจะเรียนอัลกอริทึมสำเร็จรูป สิ่งสำคัญกว่าคือ \"วิธีคิด\" — แตกปัญหาใหญ่เป็นขั้นเล็ก ๆ ที่คอมพิวเตอร์ทำได้" },

      { t: "h2", c: "ปัญหาเดียว แก้ได้หลายวิธี" },
      { t: "p", c: "ลองดูปัญหาง่าย: หาผลรวมเลข 1 ถึง n สองวิธีนี้ให้ผลเท่ากัน แต่ประสิทธิภาพต่างกันลิบลับ" },
      { t: "code", lang: "python", c: "# วิธีที่ 1: วนบวกทีละตัว (ทำ n รอบ)\ndef sum_loop(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n\n# วิธีที่ 2: ใช้สูตรคณิตศาสตร์ (คำนวณครั้งเดียว!)\ndef sum_formula(n):\n    return n * (n + 1) // 2\n\nprint(sum_loop(100), sum_formula(100))  # 5050 5050" },
      { t: "p", c: "ถ้า n = 1,000,000,000 วิธีที่ 1 ต้องวนพันล้านรอบ ส่วนวิธีที่ 2 คำนวณครั้งเดียวจบ การเลือกอัลกอริทึมที่ดีจึงสำคัญกว่าเครื่องเร็ว ๆ เสียอีก" },

      { t: "h2", c: "ขั้นตอนการแก้ปัญหา" },
      { t: "p", c: "เวลาเจอโจทย์ อย่าเพิ่งรีบเขียนโค้ด ทำตามขั้นตอนนี้จะคิดออกเป็นระบบและพลาดน้อยลง" },
      {
        t: "ol",
        c: [
          "เข้าใจโจทย์ — input คืออะไร, output ที่ต้องการคืออะไร, มีเงื่อนไขพิเศษไหม",
          "ยกตัวอย่างด้วยมือ — ลองทำกับข้อมูลเล็ก ๆ ดูว่าคำตอบควรเป็นอะไร",
          "วางแผนเป็นขั้นตอน (pseudocode) — เขียนเป็นภาษาคนก่อน",
          "เขียนโค้ดตามแผน",
          "ทดสอบกับ edge case — ค่าว่าง, ค่าเดียว, ค่าซ้ำ, ค่าติดลบ",
        ],
      },

      { t: "h2", c: "Pseudocode — วางแผนก่อนเขียนจริง" },
      { t: "p", c: "pseudocode คือการเขียนขั้นตอนเป็นภาษาคน (กึ่งโค้ด) ก่อนลงโค้ดจริง ช่วยให้คิดตรรกะได้ชัดโดยไม่ติดเรื่องไวยากรณ์ภาษา" },
      { t: "code", lang: "text", c: "ปัญหา: หาค่ามากที่สุดในลิสต์\n\npseudocode:\n  กำหนด biggest = สมาชิกตัวแรก\n  สำหรับสมาชิกแต่ละตัวในลิสต์:\n      ถ้าตัวนั้น > biggest:\n          biggest = ตัวนั้น\n  คืนค่า biggest" },
      { t: "code", lang: "python", c: "# แปลง pseudocode เป็นโค้ดจริง\ndef find_max(nums):\n    biggest = nums[0]\n    for n in nums:\n        if n > biggest:\n            biggest = n\n    return biggest\n\nprint(find_max([3, 7, 2, 9, 4]))  # 9" },

      { t: "h2", c: "อย่าลืม Edge Case" },
      { t: "p", c: "โค้ดที่ทำงานกับข้อมูลปกติได้ อาจพังกับกรณีสุดขอบ การคิดถึง edge case ตั้งแต่ต้นคือสิ่งที่ทำให้โค้ดแข็งแรงและเป็นจุดที่กรรมการสัมภาษณ์ชอบถาม" },
      {
        t: "ul",
        c: [
          "ลิสต์ว่าง [] — find_max จะ error เพราะไม่มี nums[0]",
          "สมาชิกตัวเดียว [5] — ต้องคืน 5 ได้",
          "ค่าซ้ำกันทั้งหมด [3, 3, 3]",
          "ค่าติดลบ [-1, -5, -2] — biggest = nums[0] รองรับได้ แต่ถ้าตั้ง biggest = 0 จะผิด!",
        ],
      },

      { t: "callout", title: "เคล็ดลับเวลาเจอโจทย์จริง / สัมภาษณ์งาน", c: "1) เขียนวิธีที่ \"ได้คำตอบถูกก่อน\" (brute force) ไม่ต้องเร็วก็ได้ — มีคำตอบดีกว่าไม่มี  2) แล้วค่อยถามตัวเองว่า \"ตรงไหนช้า ทำให้เร็วขึ้นได้ไหม\" (เช่นเปลี่ยน list เป็น dict)  3) ตอนสัมภาษณ์ให้พูดความคิดออกมาดัง ๆ — กรรมการดูวิธีคิด ไม่ใช่แค่คำตอบ  4) ทดสอบ edge case ให้กรรมการเห็นว่าคุณรอบคอบ" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "อัลกอริทึมคือลำดับขั้นตอนแก้ปัญหา — ปัญหาเดียวมีได้หลายวิธี ประสิทธิภาพต่างกัน",
          "ขั้นตอน: เข้าใจโจทย์ → ยกตัวอย่าง → วางแผน (pseudocode) → เขียน → ทดสอบ",
          "pseudocode ช่วยคิดตรรกะก่อนติดไวยากรณ์",
          "คิดถึง edge case เสมอ: ว่าง, ตัวเดียว, ซ้ำ, ติดลบ",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน pseudocode + โค้ดหาค่าน้อยที่สุดในลิสต์  2) เขียนขั้นตอนนับจำนวนเลขคู่ในลิสต์  3) คิด edge case ของโจทย์ \"หาค่าเฉลี่ย\" (ลิสต์ว่างทำอย่างไร?)  4) เขียน pseudocode ของการเช็คว่าเลขเป็นจำนวนเฉพาะไหม" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Big-O Notation →", slug: "algo-bigo", desc: "วัดว่าอัลกอริทึมเร็วแค่ไหน" },
          { title: "← กลับหน้าภาพรวมคอร์ส", slug: "learn" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "algo-bigo": {
    slug: "algo-bigo",
    title: "Big-O Notation — วัดประสิทธิภาพ",
    lead: "บอกว่าเมื่อข้อมูลใหญ่ขึ้น อัลกอริทึมทำงานหนักขึ้นเร็วแค่ไหน — ภาษากลางในการพูดถึงความเร็ว",
    group: "บทที่ 4: อัลกอริทึม & Big-O",
    blocks: [
      { t: "p", c: "Big-O เป็นหัวข้อที่คนกลัว แต่จริง ๆ ไม่ยาก มันคือวิธีบอกว่า \"เมื่อข้อมูลใหญ่ขึ้น จำนวนขั้นตอนเพิ่มขึ้นเร็วแค่ไหน\" เราไม่นับวินาทีจริง (เพราะขึ้นกับเครื่อง) แต่นับว่างานโตตามขนาดข้อมูล n อย่างไร เป็นภาษากลางที่โปรแกรมเมอร์ทั่วโลกใช้คุยกัน" },

      { t: "h2", c: "ตารางอันดับความเร็ว" },
      {
        t: "table",
        head: ["Big-O", "ชื่อ", "n=10", "n=1000", "ความเร็ว"],
        rows: [
          ["O(1)", "คงที่", "1", "1", "🟢 เร็วสุด"],
          ["O(log n)", "ลอการิทึม", "~3", "~10", "🟢 เร็วมาก"],
          ["O(n)", "เชิงเส้น", "10", "1,000", "🟡 ดี"],
          ["O(n log n)", "—", "~33", "~10,000", "🟡 ยอมรับได้"],
          ["O(n²)", "กำลังสอง", "100", "1,000,000", "🔴 ช้าเมื่อ n ใหญ่"],
          ["O(2ⁿ)", "เอกซ์โพเนนเชียล", "1,024", "เยอะมหาศาล", "🔴 ช้ามาก"],
        ],
      },
      { t: "p", c: "สังเกตว่าเมื่อ n=1000 ความต่างระหว่าง O(n) (พันขั้น) กับ O(n²) (ล้านขั้น) มหาศาล นี่คือเหตุผลที่เราใส่ใจ Big-O" },

      { t: "h2", c: "ดูตัวอย่างแต่ละระดับ" },
      { t: "code", lang: "python", c: "# O(1) — คงที่ ไม่ขึ้นกับขนาดลิสต์\ndef first(items):\n    return items[0]          # ทำงานครั้งเดียวเสมอ\n\n# O(n) — วนครั้งเดียว โตตามขนาด\ndef contains(items, target):\n    for x in items:          # n รอบ\n        if x == target:\n            return True\n    return False\n\n# O(n²) — loop ซ้อน loop\ndef has_duplicate(items):\n    for i in range(len(items)):       # n รอบ\n        for j in range(i + 1, len(items)):  # อีก n รอบ\n            if items[i] == items[j]:\n                return True\n    return False" },

      { t: "h2", c: "วิธีอ่าน Big-O ของโค้ด" },
      {
        t: "ol",
        c: [
          "ไม่มี loop, แค่คำนวณ/เข้าถึง index/dict → O(1)",
          "loop เดียววนทั้งข้อมูล → O(n)",
          "loop ซ้อนสองชั้น (ทั้งคู่วนตามข้อมูล) → O(n²)",
          "แบ่งครึ่งข้อมูลทุกรอบ (เช่น binary search) → O(log n)",
          "เรียงลำดับ (sort) → O(n log n)",
        ],
      },
      { t: "callout", title: "กฎการตัดทอน", c: "Big-O สนใจแค่แนวโน้มเมื่อ n ใหญ่มาก จึง (1) ตัดค่าคงที่ทิ้ง: O(2n) เขียนเป็น O(n) (2) เก็บแค่พจน์ที่โตเร็วสุด: O(n² + n) เขียนเป็น O(n²) เพราะ n² ครอบงำเมื่อ n ใหญ่" },

      { t: "h2", c: "Space Complexity — หน่วยความจำก็นับ" },
      { t: "p", c: "Big-O ใช้วัดหน่วยความจำที่ใช้ด้วย ไม่ใช่แค่เวลา เช่นถ้าสร้างลิสต์ใหม่ขนาดเท่า input ก็ใช้ O(n) space ส่วนการใช้ตัวแปรไม่กี่ตัวคือ O(1) space" },
      { t: "code", lang: "python", c: "# O(1) space — ใช้ตัวแปรไม่กี่ตัว ไม่ว่า input ใหญ่แค่ไหน\ndef total(nums):\n    s = 0\n    for n in nums:\n        s += n\n    return s\n\n# O(n) space — สร้างลิสต์ใหม่ขนาดเท่า input\ndef doubled(nums):\n    return [n * 2 for n in nums]" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "Big-O บอกว่างานโตตามขนาดข้อมูล n อย่างไร (ไม่ใช่วินาทีจริง)",
          "อันดับจากเร็วไปช้า: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)",
          "อ่านจากจำนวน loop ที่ซ้อนกัน: เดียว=O(n), สองชั้น=O(n²), แบ่งครึ่ง=O(log n)",
          "ตัดค่าคงที่และเก็บพจน์ที่โตเร็วสุด",
          "Space complexity วัดหน่วยความจำ: ตัวแปรไม่กี่ตัว=O(1), สร้างลิสต์ใหม่=O(n)",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) บอก Big-O ของฟังก์ชันที่มี for loop เดียว  2) บอก Big-O ของ loop ซ้อน 3 ชั้น  3) วิเคราะห์ว่า has_duplicate ข้างบนเป็น O อะไร และคิดวิธีทำให้เป็น O(n) ด้วย set  4) บอก space complexity ของฟังก์ชันที่ reverse ลิสต์โดยสร้างลิสต์ใหม่" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: การค้นหา (Searching) →", slug: "algo-search", desc: "Linear search และ Binary search" },
          { title: "← คิดเป็นขั้นตอน", slug: "algo-thinking" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "algo-search": {
    slug: "algo-search",
    title: "การค้นหา (Searching)",
    lead: "Linear search ไล่ดูทีละตัว O(n) เทียบกับ Binary search แบ่งครึ่ง O(log n) ที่เร็วกว่ามากบนข้อมูลที่เรียงแล้ว",
    group: "บทที่ 4: อัลกอริทึม & Big-O",
    blocks: [
      { t: "p", c: "การค้นหาข้อมูลคือสิ่งที่ทำบ่อยที่สุดในโปรแกรม มี 2 อัลกอริทึมพื้นฐานที่ต้องรู้ และความต่างของมันคือตัวอย่างที่ดีที่สุดของพลัง Big-O" },

      { t: "h2", c: "Linear Search — ไล่ดูทีละตัว O(n)" },
      { t: "p", c: "วิธีตรงไปตรงมาที่สุด: ดูทีละตัวตั้งแต่ต้นจนเจอ ใช้ได้กับข้อมูลทุกแบบ ไม่ต้องเรียงก่อน แต่ถ้าข้อมูลมีล้านตัวและเป้าหมายอยู่ท้าย ก็ต้องดูล้านครั้ง" },
      { t: "code", lang: "python", c: "def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i        # เจอ คืน index\n    return -1               # ไม่เจอ\n\nprint(linear_search([4, 2, 7, 1, 9], 7))  # 2\nprint(linear_search([4, 2, 7, 1, 9], 5))  # -1\n\n# Python มี in และ index() ให้ใช้อยู่แล้ว (ก็เป็น O(n))\nprint(7 in [4, 2, 7])       # True" },

      { t: "h2", c: "Binary Search — แบ่งครึ่งค้นหา O(log n)" },
      { t: "p", c: "ใช้ได้เฉพาะกับข้อมูลที่ \"เรียงแล้ว\" หลักการคือดูค่ากลาง ถ้าน้อยไปตัดครึ่งซ้ายทิ้ง ถ้ามากไปตัดครึ่งขวาทิ้ง ทุกรอบตัดข้อมูลเหลือครึ่ง เหมือนเปิดพจนานุกรมหาคำ ไม่ได้เปิดทีละหน้า" },
      { t: "code", lang: "python", c: "def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2   # ตำแหน่งกลาง\n        if arr[mid] == target:\n            return mid              # เจอ\n        elif arr[mid] < target:\n            left = mid + 1          # เป้าอยู่ครึ่งขวา\n        else:\n            right = mid - 1         # เป้าอยู่ครึ่งซ้าย\n    return -1\n\nprint(binary_search([1, 3, 5, 7, 9, 11], 7))   # 3\nprint(binary_search([1, 3, 5, 7, 9, 11], 4))   # -1" },
      { t: "callout", title: "log n เร็วแค่ไหน", c: "ข้อมูล 1,000,000 ตัว linear search ต้องดูสูงสุด 1 ล้านครั้ง แต่ binary search ดูแค่ ~20 ครั้ง! เพราะทุกรอบตัดเหลือครึ่ง (1M → 500k → 250k → ...) นี่คือพลังของ O(log n)" },
      { t: "callout", title: "เงื่อนไขสำคัญ", warn: true, c: "Binary search ใช้ได้ก็ต่อเมื่อข้อมูลเรียงแล้วเท่านั้น ถ้ายังไม่เรียงต้อง sort ก่อน (O(n log n)) ระวัง off-by-one ตรง mid + 1 และ mid - 1 ซึ่งเป็นจุดที่พลาดบ่อย" },

      { t: "h2", c: "เปรียบเทียบ" },
      {
        t: "table",
        head: ["", "Linear Search", "Binary Search"],
        rows: [
          ["Big-O", "O(n)", "O(log n)"],
          ["ต้องเรียงก่อนไหม", "ไม่ต้อง", "ต้อง"],
          ["1 ล้านตัว (worst)", "~1,000,000 ครั้ง", "~20 ครั้ง"],
          ["เหมาะเมื่อ", "ข้อมูลน้อย/ไม่เรียง", "ข้อมูลเยอะและเรียงแล้ว"],
        ],
      },

      { t: "callout", title: "เร็วกว่า binary search ก็มี: dict/set (O(1))", c: "ถ้าแค่ต้องเช็คว่า \"มีค่านี้ไหม\" บ่อย ๆ ไม่ต้องเรียงแล้ว binary search — โยนลง set/dict แล้วใช้ x in s ได้ O(1) เลย (เร็วกว่า O(log n) อีก) เลือก binary search เมื่อข้อมูลเรียงอยู่แล้วหรือต้องหา \"ตำแหน่ง/ขอบเขต\" ส่วนเช็คสมาชิกล้วน ๆ ใช้ set" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "Linear search ไล่ดูทีละตัว O(n) ใช้ได้กับข้อมูลทุกแบบ ไม่ต้องเรียง",
          "Binary search แบ่งครึ่งทุกรอบ O(log n) เร็วกว่ามาก แต่ข้อมูลต้องเรียงแล้ว",
          "ทุกรอบของ binary search ตัดข้อมูลเหลือครึ่ง — ล้านตัวค้นแค่ ~20 ครั้ง",
          "ระวัง off-by-one ตรง mid+1 / mid-1",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน linear search คืน index ของค่าที่หา  2) เขียน binary search เอง แล้วทดสอบกับลิสต์เรียงแล้ว  3) นับว่า binary search บนลิสต์ 1000 ตัว ใช้กี่รอบ (ลองใส่ print นับ)  4) ดัดแปลง binary search ให้หา \"ค่าแรกที่มากกว่าหรือเท่ากับ target\"" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: การเรียงลำดับ (Sorting) →", slug: "algo-sort", desc: "Bubble, Merge, Quick sort และการใช้ sorted()" },
          { title: "← Big-O Notation", slug: "algo-bigo" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "algo-sort": {
    slug: "algo-sort",
    title: "การเรียงลำดับ (Sorting)",
    lead: "เข้าใจหลักการเรียงลำดับพื้นฐาน complexity ของแต่ละแบบ และการใช้ sorted() ในงานจริง",
    group: "บทที่ 4: อัลกอริทึม & Big-O",
    blocks: [
      { t: "p", c: "การเรียงลำดับเป็นพื้นฐานที่ใช้บ่อย และเป็นหัวข้อคลาสสิกในการเรียนอัลกอริทึม ในงานจริงเราใช้ sorted() ของภาษาเลย (ซึ่งเป็น O(n log n) ที่ปรับแต่งมาดีแล้ว) แต่ควรเข้าใจหลักการเบื้องหลังและ complexity เพื่อตอบสัมภาษณ์และเลือกใช้เป็น" },

      { t: "h2", c: "ในงานจริง: ใช้ sorted() และ .sort()" },
      { t: "code", lang: "python", c: "nums = [3, 1, 4, 1, 5, 9, 2]\n\nprint(sorted(nums))               # [1,1,2,3,4,5,9] (คืนลิสต์ใหม่)\nprint(sorted(nums, reverse=True)) # [9,5,4,3,2,1,1] (มากไปน้อย)\n\nnums.sort()                       # เรียงในตัวเอง (ของเดิมเปลี่ยน)\n\n# เรียงตามเงื่อนไขด้วย key\nwords = [\"banana\", \"kiwi\", \"apple\"]\nprint(sorted(words, key=len))     # ['kiwi','apple','banana'] (ตามความยาว)\n\npeople = [{\"name\": \"A\", \"age\": 30}, {\"name\": \"B\", \"age\": 20}]\nprint(sorted(people, key=lambda p: p[\"age\"]))  # เรียงตามอายุ" },
      { t: "callout", title: "sorted() vs .sort()", c: "sorted(x) คืนลิสต์ใหม่ ไม่แตะของเดิม ส่วน x.sort() เรียงในตัวมันเอง (ของเดิมเปลี่ยน) เลือกใช้ตามว่าต้องการเก็บลิสต์เดิมไว้ไหม" },

      { t: "h2", c: "Bubble Sort — เข้าใจง่ายแต่ช้า O(n²)" },
      { t: "p", c: "เปรียบเทียบสมาชิกคู่ที่อยู่ติดกัน สลับถ้าผิดลำดับ ทำซ้ำจนไม่มีอะไรต้องสลับ ตัวที่ใหญ่สุดจะ \"ลอย\" ไปท้ายเหมือนฟองอากาศ — จึงชื่อ bubble" },
      { t: "code", lang: "python", c: "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(n - 1 - i):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]  # สลับ\n    return arr\n\nprint(bubble_sort([5, 2, 8, 1, 9]))  # [1, 2, 5, 8, 9]" },

      { t: "h2", c: "หลักการของ Merge Sort และ Quick Sort" },
      { t: "p", c: "สอง algorithm นี้เร็วกว่า (O(n log n)) ด้วยแนวคิด \"แบ่งแล้วพิชิต\" (divide and conquer) ไม่ต้องท่อง implement เป๊ะ แต่ควรเข้าใจไอเดีย" },
      {
        t: "ul",
        c: [
          "Merge Sort: แบ่งลิสต์ครึ่ง ๆ จนเหลือตัวเดียว แล้วค่อย ๆ รวม (merge) กลับแบบเรียงลำดับ — เสถียร แต่ใช้หน่วยความจำเพิ่ม",
          "Quick Sort: เลือกตัว \"pivot\" แล้วแบ่งของที่น้อยกว่าไปซ้าย มากกว่าไปขวา แล้วทำซ้ำกับแต่ละฝั่ง — เร็วในทางปฏิบัติ แต่ worst case O(n²)",
        ],
      },
      {
        t: "table",
        head: ["Algorithm", "เวลาเฉลี่ย", "Worst", "หมายเหตุ"],
        rows: [
          ["Bubble / Insertion / Selection", "O(n²)", "O(n²)", "เข้าใจง่าย ใช้สอน"],
          ["Merge Sort", "O(n log n)", "O(n log n)", "เสถียร ใช้ memory เพิ่ม"],
          ["Quick Sort", "O(n log n)", "O(n²)", "เร็วจริงในทางปฏิบัติ"],
          ["sorted() ของ Python", "O(n log n)", "O(n log n)", "ใช้ตัวนี้ในงานจริง"],
        ],
      },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "งานจริงใช้ sorted() (คืนใหม่) หรือ .sort() (ในตัว) — ปรับ key และ reverse ได้",
          "Bubble sort O(n²): เปรียบเทียบคู่ติดกันแล้วสลับ เข้าใจง่ายแต่ช้า",
          "Merge/Quick sort O(n log n): ใช้แนวคิดแบ่งแล้วพิชิต เร็วกว่ามากเมื่อ n ใหญ่",
          "เข้าใจ complexity และไอเดีย พอสำหรับสัมภาษณ์ — ไม่ต้องท่อง implement ทุกตัว",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน bubble sort เอง แล้วทดสอบ  2) เรียงลิสต์ชื่อตามความยาว ด้วย sorted(key=len)  3) เรียงลิสต์ dict นักเรียนตามคะแนนจากมากไปน้อย  4) เรียงลิสต์ตัวเลขจากมากไปน้อยโดยไม่ใช้ reverse=True (คิดวิธี)" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Recursion →", slug: "algo-recursion", desc: "ฟังก์ชันที่เรียกตัวเอง" },
          { title: "← การค้นหา", slug: "algo-search" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "algo-recursion": {
    slug: "algo-recursion",
    title: "Recursion — ฟังก์ชันที่เรียกตัวเอง",
    lead: "แก้ปัญหาด้วยการแบ่งเป็นปัญหาย่อยที่เล็กลง — base case, recursive case และวิธีคิดให้ออก",
    group: "บทที่ 4: อัลกอริทึม & Big-O",
    blocks: [
      { t: "p", c: "Recursion คือฟังก์ชันที่เรียกตัวเองเพื่อแก้ปัญหาย่อยที่เล็กลงเรื่อย ๆ เป็นแนวคิดที่ทรงพลังและสวยงาม ใช้กับปัญหาที่มีโครงสร้างซ้ำตัวเอง เช่น tree, graph, การแบ่งย่อย เป็นพื้นฐานของหลายอัลกอริทึมขั้นสูง" },

      { t: "h2", c: "สองส่วนที่ขาดไม่ได้" },
      { t: "p", c: "ทุกฟังก์ชัน recursion ต้องมี 2 ส่วนเสมอ ขาดข้อใดข้อหนึ่งจะวนไม่จบ" },
      {
        t: "ul",
        c: [
          "Base case — เงื่อนไขหยุด เคสเล็กสุดที่ตอบได้เลยโดยไม่ต้องเรียกตัวเองอีก",
          "Recursive case — เรียกตัวเองด้วยปัญหาที่ \"เล็กลง\" เข้าใกล้ base case",
        ],
      },
      { t: "code", lang: "python", c: "# factorial: 5! = 5*4*3*2*1\ndef factorial(n):\n    if n <= 1:               # base case — หยุด\n        return 1\n    return n * factorial(n - 1)  # recursive case (n เล็กลง)\n\nprint(factorial(5))  # 120\n# ขยาย: 5*factorial(4) = 5*4*factorial(3) = ... = 5*4*3*2*1" },
      { t: "callout", title: "ลืม base case = RecursionError", warn: true, c: "ถ้าไม่มี base case (หรือ recursive case ไม่เล็กลง) ฟังก์ชันจะเรียกตัวเองไม่รู้จบ Python จะหยุดด้วย RecursionError: maximum recursion depth exceeded ตรวจเสมอว่ามีจุดหยุดและปัญหาเล็กลงทุกครั้ง" },

      { t: "h2", c: "วิธีคิด recursion ให้ออก" },
      { t: "p", c: "เคล็ดลับ: อย่าพยายามไล่ตามทุกชั้นในหัว ให้ \"เชื่อ\" ว่าฟังก์ชันแก้ปัญหาเล็กกว่าได้ถูกต้องแล้ว (เรียกว่า leap of faith) จากนั้นถามแค่ 2 ข้อ" },
      {
        t: "ol",
        c: [
          "เคสเล็กสุดคืออะไร และตอบว่าอะไร? (base case)",
          "ถ้าฉันมีคำตอบของปัญหาที่เล็กกว่า 1 ขั้น ฉันจะประกอบเป็นคำตอบของปัญหาเต็มได้อย่างไร? (recursive case)",
        ],
      },
      { t: "code", lang: "python", c: "# ผลรวมของลิสต์แบบ recursion\ndef sum_list(nums):\n    if not nums:             # base: ลิสต์ว่าง = 0\n        return 0\n    return nums[0] + sum_list(nums[1:])  # ตัวแรก + ผลรวมที่เหลือ\n\nprint(sum_list([1, 2, 3, 4]))  # 10\n\n# กลับข้อความ\ndef reverse(s):\n    if len(s) <= 1:\n        return s\n    return reverse(s[1:]) + s[0]\nprint(reverse(\"hello\"))  # olleh" },

      { t: "h2", c: "ตัวอย่างคลาสสิก: Fibonacci" },
      { t: "code", lang: "python", c: "def fib(n):\n    if n <= 1:               # base case: fib(0)=0, fib(1)=1\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint([fib(i) for i in range(10)])\n# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]" },
      { t: "callout", title: "ระวังช้า: ใช้ memoization", c: "fib แบบนี้คำนวณค่าซ้ำมหาศาล (O(2ⁿ) ช้ามาก) แก้ได้ด้วยการจำผลที่เคยคำนวณไว้ (memoization) — ง่ายสุดใช้ @lru_cache ครอบฟังก์ชัน นี่คือสะพานไปสู่ Dynamic Programming ที่จะเจอในการเตรียมสัมภาษณ์" },
      { t: "code", lang: "python", c: "from functools import lru_cache\n\n@lru_cache(maxsize=None)   # จำผลลัพธ์อัตโนมัติ\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(50))  # 12586269025  (เร็วมากเพราะไม่คำนวณซ้ำ)" },

      { t: "h2", c: "Recursion vs Loop" },
      { t: "p", c: "หลายปัญหาเขียนได้ทั้งสองแบบ loop มักเร็วกว่าและใช้ memory น้อยกว่า ส่วน recursion อ่านง่ายกว่าสำหรับปัญหาที่มีโครงสร้างซ้ำตัวเอง (tree, graph, การแบ่งย่อย) เลือกตามความเหมาะสม" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "Recursion = ฟังก์ชันเรียกตัวเอง ต้องมี base case (หยุด) และ recursive case (เล็กลง)",
          "วิธีคิด: เชื่อว่าฟังก์ชันแก้ปัญหาเล็กกว่าได้ แล้วประกอบคำตอบ",
          "ลืม base case → RecursionError",
          "ปัญหาที่คำนวณซ้ำ (เช่น fibonacci) ใช้ memoization (@lru_cache) ช่วยให้เร็วขึ้นมาก",
          "Recursion อ่านง่ายกับปัญหาโครงสร้างซ้ำตัวเอง, loop เร็วและประหยัด memory กว่า",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน factorial แบบ recursion  2) เขียนฟังก์ชันหา fibonacci ตัวที่ n  3) เขียน recursion นับจำนวนสมาชิกในลิสต์ (ไม่ใช้ len)  4) เขียน recursion เช็คว่าข้อความเป็นพาลินโดรมไหม  5) เพิ่ม @lru_cache ให้ fib แล้วลองเรียก fib(50) เทียบความเร็ว" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: เทคนิคที่เจอบ่อย →", slug: "algo-patterns", desc: "Two pointers, sliding window, hash map" },
          { title: "← การเรียงลำดับ", slug: "algo-sort" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "algo-patterns": {
    slug: "algo-patterns",
    title: "เทคนิคที่เจอบ่อย (Common Patterns)",
    lead: "Two pointers, sliding window และ hash map — สามเทคนิคที่ลด complexity และแก้โจทย์สัมภาษณ์ได้ครึ่งค่อนข้อ",
    group: "บทที่ 4: อัลกอริทึม & Big-O",
    blocks: [
      { t: "p", c: "เมื่อเข้าใจพื้นฐานแล้ว สิ่งที่ทำให้แก้โจทย์ได้เร็วคือการจำ \"pattern\" ที่ใช้ซ้ำได้ หัวข้อนี้รวม 3 เทคนิคที่ทรงพลังที่สุดสำหรับมือใหม่ และเป็นสะพานไปสู่การเตรียม coding interview จริง" },

      { t: "h2", c: "1) Two Pointers — สองตัวชี้" },
      { t: "p", c: "ใช้ตัวชี้สองตัววิ่งเข้าหากันหรือไปด้วยกัน เหมาะกับข้อมูลที่เรียงแล้ว หรือการเช็คจากสองด้าน ช่วยลดจาก loop ซ้อน O(n²) เหลือ O(n)" },
      { t: "code", lang: "python", c: "# เช็คพาลินโดรมด้วยตัวชี้หัว-ท้าย\ndef is_palindrome(s):\n    i, j = 0, len(s) - 1\n    while i < j:\n        if s[i] != s[j]:\n            return False\n        i, j = i + 1, j - 1   # ขยับเข้าหากัน\n    return True\n\nprint(is_palindrome(\"level\"))  # True\n\n# หาคู่ที่บวกกันได้ target ในลิสต์ที่เรียงแล้ว\ndef two_sum_sorted(arr, target):\n    i, j = 0, len(arr) - 1\n    while i < j:\n        s = arr[i] + arr[j]\n        if s == target:\n            return (arr[i], arr[j])\n        elif s < target:\n            i += 1            # ผลรวมน้อยไป ขยับซ้ายขึ้น\n        else:\n            j -= 1            # ผลรวมมากไป ขยับขวาลง\n    return None\n\nprint(two_sum_sorted([1, 3, 5, 7, 9], 12))  # (3, 9)" },

      { t: "h2", c: "2) Sliding Window — หน้าต่างเลื่อน" },
      { t: "p", c: "ใช้กับโจทย์หา subarray/substring ต่อเนื่องที่ \"ดีที่สุด\" เช่นผลรวมมากสุดของช่วงยาว k แทนที่จะคำนวณใหม่ทุกช่วง เราเลื่อนหน้าต่างและปรับค่าทีละนิด ลดจาก O(n×k) เหลือ O(n)" },
      { t: "code", lang: "python", c: "# หาผลรวมมากสุดของ subarray ความยาว k\ndef max_sum_k(arr, k):\n    window = sum(arr[:k])     # ผลรวมหน้าต่างแรก\n    best = window\n    for i in range(k, len(arr)):\n        window += arr[i] - arr[i - k]  # เพิ่มตัวใหม่ ลบตัวเก่า\n        best = max(best, window)\n    return best\n\nprint(max_sum_k([2, 1, 5, 1, 3, 2], 3))  # 9  (5+1+3)" },

      { t: "h2", c: "3) Hash Map — จำเพื่อค้นหาเร็ว" },
      { t: "p", c: "ใช้ dict/set จำสิ่งที่เคยเห็น ทำให้ค้นหาเร็ว O(1) เปลี่ยนหลายโจทย์จาก O(n²) เป็น O(n) โจทย์คลาสสิกคือ Two Sum (เวอร์ชันไม่เรียง)" },
      { t: "code", lang: "python", c: "# Two Sum: หา index ของคู่ที่บวกได้ target\ndef two_sum(nums, target):\n    seen = {}                      # ค่า -> index ที่เคยเห็น\n    for i, num in enumerate(nums):\n        need = target - num\n        if need in seen:           # เคยเห็นตัวที่ต้องการแล้ว\n            return [seen[need], i]\n        seen[num] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))  # [0, 1]  (2 + 7)\n\n# เช็คว่ามีค่าซ้ำไหม ด้วย set — O(n)\ndef has_dup(nums):\n    return len(set(nums)) != len(nums)\nprint(has_dup([1, 2, 3, 2]))       # True" },

      { t: "h2", c: "จับสัญญาณว่าโจทย์ใช้ pattern ไหน" },
      { t: "p", c: "ทักษะแก้โจทย์เร็วคือเห็นโจทย์แล้วนึกออกว่าจะใช้เทคนิคไหน ฝึกจนจำสัญญาณเหล่านี้ได้" },
      {
        t: "table",
        head: ["เจอลักษณะนี้ในโจทย์", "มักใช้"],
        rows: [
          ["array เรียงแล้ว / หาคู่ / palindrome", "Two pointers"],
          ["subarray/substring ต่อเนื่อง ยาว/สั้นที่สุด", "Sliding window"],
          ["นับ / หาตัวซ้ำ / \"เคยเห็นไหม\" / จับคู่", "Hash map / set"],
          ["ค้นหาในข้อมูลที่เรียงแล้ว", "Binary search"],
          ["ลองทุกความเป็นไปได้ / โครงสร้างซ้ำตัวเอง", "Recursion / backtracking"],
        ],
      },

      { t: "h2", c: "สรุปบทที่ 4" },
      {
        t: "ul",
        c: [
          "Two pointers: ตัวชี้สองตัวบนข้อมูลเรียงแล้ว/เช็คสองด้าน — ลด O(n²) เป็น O(n)",
          "Sliding window: เลื่อนหน้าต่างปรับค่าทีละนิด สำหรับ subarray/substring ต่อเนื่อง",
          "Hash map/set: จำสิ่งที่เคยเห็น ค้นหา O(1) เปลี่ยนหลายโจทย์เป็น O(n)",
          "จำสัญญาณในโจทย์เพื่อเลือก pattern ได้เร็ว",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ใช้ two pointers ลบค่าซ้ำออกจากลิสต์ที่เรียงแล้ว  2) หาผลรวมมากสุดของ subarray ยาว k ด้วย sliding window  3) แก้ Two Sum ด้วย dict  4) เช็คว่าสองคำเป็น anagram กันไหม (ใช้ Counter/sorted)  5) หาตัวอักษรตัวแรกที่ไม่ซ้ำในข้อความ (ใช้ dict นับ)" },
      { t: "callout", title: "จบบทที่ 4 — พร้อมต่อยอด", warn: false, c: "คุณเข้าใจการคิดเชิงอัลกอริทึม วัดประสิทธิภาพด้วย Big-O และรู้จัก pattern หลักแล้ว นี่คือรากฐานตรงสู่การฝึก LeetCode ในส่วนเตรียมสัมภาษณ์ ลองแวะดูหน้า Algorithms Cheatsheet เพื่อต่อยอด" },
      {
        t: "links",
        c: [
          { title: "บทที่ 5: OOP & การออกแบบโปรแกรม →", slug: "oop-class", desc: "Class, Object และการจัดระเบียบโค้ดเมื่อโปรแกรมใหญ่ขึ้น" },
          { title: "ต่อยอด: Algorithms Cheatsheet (เตรียมสัมภาษณ์)", slug: "algorithms", desc: "สรุป pattern และ complexity เชิงลึกสำหรับ coding interview" },
        ],
      },
    ],
  },
};
