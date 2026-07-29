import type { Page } from "@/lib/types";

export const backtrackingPages: Record<string, Page> = {
  "lc75-intro-backtracking": {
    slug: "lc75-intro-backtracking",
    title: "Backtracking — พื้นฐาน & แนวคิด",
    lead: "เทคนิคไล่ลองทุกทางเลือกแบบมีระบบ ลงลึกไปทีละก้าว แล้วถอยกลับ (undo) เพื่อลองทางอื่น",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "Backtracking (การย้อนรอย) คือเทคนิคสำหรับโจทย์ที่ต้อง build (สร้าง) คำตอบทีละชิ้น และมีหลาย choice (ทางเลือก) ในแต่ละก้าว เช่น หาทุก combination (ชุดค่า) ที่เป็นไปได้ ทุก permutation (การจัดเรียง) หรือทุกวิธีเลือกของ ไอเดียหลักคือ choose (เลือก) ทางหนึ่ง แล้ว explore (ลงลึก) ต่อไปเรื่อย ๆ ถ้าเจอทางตันหรือ explore ครบแล้ว ก็ backtrack (ถอยกลับ) มายกเลิกการเลือกล่าสุด (undo) เพื่อไปลองทางอื่นแทน มันคือการ search (ค้นหา) แบบเป็นระบบที่รับประกันว่าจะไม่พลาดคำตอบไหนเลย" },

      { t: "h2", c: "recursion tree — ภาพในหัวของ backtracking" },
      { t: "p", c: "ลองนึกภาพว่าเรากำลังเดินอยู่ในเขาวงกตที่แตกเป็นทางแยกเยอะมาก ทุกครั้งที่เจอทางแยก เรา choose เดินทางหนึ่งไปก่อน ถ้าสุดทางแล้วไม่เจอทางออก เราก็ backtrack ย้อนกลับมาที่ทางแยกเดิมแล้วลองอีกทาง Backtracking ทำแบบเดียวกันเป๊ะ ๆ แต่ทำด้วย recursion (การเรียกตัวเอง)" },
      { t: "p", c: "เราวาดการทำงานเป็น recursion tree (ต้นไม้การเรียกตัวเอง) ได้ แต่ละ node (โหนด) คือ state (สถานะ) ปัจจุบัน คือคำตอบที่สร้างไปแล้วบางส่วน และแต่ละ branch (กิ่ง) ที่แตกออกไปคือ choice หนึ่งที่เราลอง สมมติต้อง build string (สตริง) ยาว 2 ตัวจากตัวอักษร a และ b ต้นไม้จะเป็นแบบนี้:" },
      { t: "code", c: `                   ""            <- ยังไม่เลือกอะไร
                 /    \\
              "a"      "b"        <- เลือกตัวแรก
             /   \\    /   \\
          "aa" "ab" "ba" "bb"     <- เลือกตัวที่สอง (คำตอบครบ)` },
      { t: "p", c: "แต่ละ leaf (ใบ) ของ tree คือคำตอบที่สมบูรณ์หนึ่งชุด การเดินลงจาก root (ราก) ไปหา leaf คือการ explore (ลงลึก) และเมื่อกลับขึ้นมาเพื่อไป branch ข้าง ๆ คือการ backtrack (ถอยกลับ)" },

      { t: "h2", c: "template สามจังหวะ: choose → explore → unchoose" },
      { t: "p", c: "หัวใจของ backtracking ทุกข้อจะมี structure (โครง) เดียวกัน จำ template (แม่แบบ) สามจังหวะนี้ไว้: choose (เลือก) → explore (ลงลึก) → unchoose (ถอย) ทุกโจทย์ในหมวดนี้จะเข้ารูปนี้หมด แค่เปลี่ยนว่า choices คืออะไร และเงื่อนไข คำตอบครบ คืออะไร" },
      { t: "code", lang: "python", c: `def backtrack(path, choices):
    if is_complete(path):        # <- แทนที่ด้วยเงื่อนไข "คำตอบครบแล้ว" ของโจทย์
        result.append(path[:])   # เก็บสำเนาคำตอบ (สำคัญ! ต้อง copy)
        return
    for choice in choices:       # ลองทุกทางเลือกที่ทำได้
        path.append(choice)      # 1) choose  — เลือกทางนี้
        backtrack(path, ...)     # 2) explore — ลงลึกต่อ
        path.pop()               # 3) unchoose — ถอย เอาออกเพื่อลองทางอื่น` },
      { t: "callout", title: "ทำไมต้อง undo", c: "เพราะเราใช้ตัวแปร path ตัวเดียวร่วมกันทุกกิ่ง ถ้าลงลึกไปทางหนึ่งแล้วไม่ถอยกลับมาลบของที่เพิ่งใส่ พอไปกิ่งข้าง ๆ path จะยังมีของเก่าค้างอยู่ ทำให้คำตอบเพี้ยน การ pop() หลัง explore คือการคืนสภาพให้เหมือนก่อนเลือก เพื่อให้กิ่งถัดไปเริ่มจากสถานะที่ถูกต้อง" },
      { t: "callout", title: "ระวังตอนเก็บคำตอบ", warn: true, c: "เวลาเก็บ path ลง result ต้องเก็บสำเนา (path[:] หรือ list(path)) ไม่ใช่ตัว path เอง เพราะ path จะถูกแก้ต่อเรื่อย ๆ ถ้าเก็บตัวจริงไป คำตอบทุกชุดใน result จะกลายเป็นลิสต์ว่างเปล่าตอนจบ" },

      { t: "callout", title: "พร้อมแล้วไปต่อ", c: "หมวดนี้มี 2 ข้อ ได้แก่ Letter Combinations of a Phone Number (ตัวอักษรจากเบอร์โทร, LC17) และ Combination Sum III (ผลรวมชุดค่า III, LC216) ทั้งคู่เข้ารูป choose/explore/unchoose ที่เพิ่งดูไป กดถัดไปเริ่มข้อแรกได้เลย" },
    ],
  },

  "lc75-p57": {
    slug: "lc75-p57",
    title: "ข้อ 57 · LC17 Letter Combinations of a Phone Number (ตัวอักษรจากเบอร์โทร) 🟡",
    lead: "map (แปลง) ตัวเลขบนแป้นโทรศัพท์เป็นทุก combination ของตัวอักษรที่กดได้ ด้วย backtracking ทีละ digit",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ Letter Combinations of a Phone Number: แป้นโทรศัพท์แบบเก่ามีตัวอักษรกำกับบนปุ่มตัวเลข 2=abc, 3=def, 4=ghi, 5=jkl, 6=mno, 7=pqrs, 8=tuv, 9=wxyz ให้ string (สตริง) ของ digit (หลักตัวเลข) 2-9 มา แล้ว return (คืน) ทุก combination ของตัวอักษรที่กดได้ ทุก digit ต้อง choose ตัวอักษรจากปุ่มของมันหนึ่งตัว" },
      { t: "ul", c: [
        "digits = \"23\" → ['ad','ae','af','bd','be','bf','cd','ce','cf'] (เลข 2 ให้ a/b/c เลข 3 ให้ d/e/f จับคู่กันครบทุกแบบ)",
        "digits = \"2\" → ['a','b','c']",
        "digits = \"\" (สตริงว่าง) → [] (ไม่มีอะไรให้กดเลย)",
      ] },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "โจทย์นี้คือ backtracking แบบตรงแบบ เพราะเราต้อง build คำตอบทีละตัวอักษร และแต่ละ digit มีหลาย choice (2-4 ตัว) จึงเข้ารูป choose → explore → unchoose ที่เรียนในหน้า intro พอดี สิ่งที่ต้องมีคือ mapping (hash map) จาก digit ไปตัวอักษรบนปุ่มนั้น" },
      { t: "p", c: "ถ้าคิดแบบตรง ๆ เราอาจอยาก loop (วน) for ซ้อนกันหนึ่งชั้นต่อหนึ่ง digit แต่ทำแบบนั้นไม่ได้เพราะจำนวน digit ไม่คงที่ (digits ยาวเท่าไหร่ก็ได้) recursion จึงเข้ามาแทนการซ้อน for ให้เรา: depth (ความลึก) ของ recursion เท่ากับจำนวน digit โดยอัตโนมัติ" },
      { t: "ol", c: [
        "สร้าง mapping digit → ตัวอักษร และ initialize (ตั้งค่าเริ่มต้น) array (ลิสต์) result กับ path (ตัวอักษรที่ choose ไว้แล้ว)",
        "เขียนฟังก์ชัน backtrack(i) โดย i คือ index (ตำแหน่ง) ของ digit ที่กำลัง choose อยู่",
        "ถ้า i เท่ากับ length (ความยาว) ของ digits แปลว่า choose ครบทุก digit แล้ว join (ต่อ) path เป็น string เก็บลง result แล้ว return",
        "ไม่งั้น iterate (วน) ตัวอักษรทุกตัวบนปุ่มของ digits[i]: choose (append ลง path) → explore (เรียก backtrack(i+1)) → unchoose (pop ออก)",
        "อย่าลืมดักกรณี digits ว่างตั้งแต่ต้น ให้ return [] เลย",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", warn: true, c: "ถ้าไม่ดักกรณี digits ว่างไว้ก่อน ฟังก์ชันจะ return [''] (array ที่มี string ว่างหนึ่งตัว) แทนที่จะเป็น [] เพราะ backtrack(0) จะมองว่า choose ครบทันที อีกจุดคือลืม path.pop() ทำให้ตัวอักษรค้างสะสมข้าม branch" },

      { t: "h2", c: "ไล่ทีละสเต็ป" },
      { t: "p", c: "ลองไล่ digits = \"23\" ดูค่า path ตอน enter และ exit แต่ละชั้นของ recursion:" },
      { t: "table", head: ["i", "action", "path", "result หลังทำ"], rows: [
        ["0", "choose 'a'", "['a']", "-"],
        ["1", "choose 'd' → i=2 ครบ", "['a','d']", "['ad']"],
        ["1", "unchoose 'd', choose 'e' → ครบ", "['a','e']", "['ad','ae']"],
        ["1", "unchoose 'e', choose 'f' → ครบ", "['a','f']", "['ad','ae','af']"],
        ["0", "unchoose 'a', choose 'b' ...", "['b']", "... ต่อด้วย bd,be,bf"],
      ] },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "code", lang: "python", c: `def letter_combinations(digits):
    if not digits:
        return []                     # ไม่มีเลขก็ไม่มีชุดตัวอักษร
    mapping = {
        "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
        "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
    }
    result = []
    path = []                         # ตัวอักษรที่เลือกไว้แล้วในเส้นทางนี้

    def backtrack(i):
        if i == len(digits):          # เลือกครบทุกหลักแล้ว
            result.append("".join(path))  # ต่อ path เป็นสตริงเก็บคำตอบ
            return
        for ch in mapping[digits[i]]: # ลองทุกตัวอักษรบนปุ่มนี้
            path.append(ch)           # choose
            backtrack(i + 1)          # explore หลักถัดไป
            path.pop()                # unchoose ถอยไปลองตัวอื่น

    backtrack(0)
    return result

print(letter_combinations("23"))
# ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']
print(letter_combinations(""))   # []` },
        { t: "p", c: "เราเดินตาม digit ของ digits ทีละตัวด้วย pointer (ตัวชี้) i ที่ digit ตำแหน่ง i เราดูว่าปุ่มนั้นมีตัวอักษรอะไรบ้าง (mapping[digits[i]]) แล้ว iterate ลองทุกตัว แต่ละตัวคือหนึ่ง branch ของ tree เมื่อ i เดินไปถึง length ของ digits แปลว่าเรา choose ครบทุก digit แล้ว จึง join path เป็น string เก็บลง result" },
        { t: "p", c: "ถ้าลองเอา path.pop() ออก จะเกิดอะไรขึ้น? path จะยาวขึ้นเรื่อย ๆ ไม่มีวันสั้นลง ทำให้เงื่อนไข i == len(digits) กับ length ของ path ไม่ตรงกัน และตัวอักษรจาก branch เก่าจะค้างมาปน branch ใหม่ คำตอบเพี้ยนทันที การ pop() คือการ restore (คืนสภาพ) path ให้เท่าเดิมก่อน branch นี้" },
        { t: "p", c: "Time O(4^n · n) เมื่อ n คือจำนวน digit แต่ละ digit แตกได้มากสุด 4 branch (ปุ่ม 7 กับ 9 มี 4 ตัว) จึงมีคำตอบได้ถึง 4^n ชุด และการ join string แต่ละชุดใช้เวลา O(n) · Space O(n) จาก depth ของ recursion และขนาด path (ไม่นับพื้นที่เก็บ result)" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "เมื่อต้อง build ทุกชุดคำตอบที่ประกอบจากการ choose ทีละ position (ตำแหน่ง) ให้ใช้ recursion แทนการซ้อน for โดย depth = จำนวน position และ iterate choice ที่ position นั้นด้วยจังหวะ choose/explore/unchoose" },
    ],
  },

  "lc75-p58": {
    slug: "lc75-p58",
    title: "ข้อ 58 · LC216 Combination Sum III (ผลรวมชุดค่า III) 🟡",
    lead: "หาทุก combination ของเลข k ตัวจาก 1-9 ที่ไม่ซ้ำและ sum (รวม) ได้ n ด้วย backtracking พร้อม pruning (ตัดกิ่ง)",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "โจทย์ Combination Sum III: ให้จำนวน k กับ n มา ให้หาทุก combination ที่ประกอบด้วยเลข k ตัวที่ choose จาก 1 ถึง 9 โดยห้าม choose เลขซ้ำใน combination เดียวกัน และ sum ของทั้งชุดต้องเท่ากับ n แต่ละ combination ในคำตอบต้องไม่ซ้ำกัน" },
      { t: "ul", c: [
        "k = 3, n = 7 → [[1,2,4]] (มีชุดเดียวที่เลือก 3 ตัวไม่ซ้ำแล้วรวมได้ 7)",
        "k = 3, n = 9 → [[1,2,6],[1,3,5],[2,3,4]] (แต่ละชุดเรียงน้อยไปมาก ไม่ซ้ำกัน)",
        "k = 4, n = 1 → [] (เลือก 4 ตัวจาก 1-9 ให้รวมได้ 1 เป็นไปไม่ได้)",
      ] },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "ยังเป็น backtracking แต่โจทย์นี้เพิ่มเงื่อนไขสองอย่างที่ต้องคุมพร้อมกัน: count (จำนวน) ตัวต้องเป็น k พอดี และ sum ต้องเป็น n พอดี เราจึงพก remaining (ค่าที่เหลือต้องเติมให้ครบ n) และ compare (เทียบ) length ของ path กับ k" },
      { t: "p", c: "ประเด็นสำคัญคือกัน combination ซ้ำ เช่น [1,2,4] กับ [4,2,1] ต้องนับเป็นชุดเดียว วิธีที่สะอาดที่สุดคือบังคับให้ choose จากน้อยไปมากเสมอ โดยส่งค่า start บอกว่าเลขถัดไปต้องเริ่มจากตัวไหน ทำให้แต่ละ combination ออกมา sorted (เรียง) อยู่แล้ว จึงไม่มีทางได้ชุดที่เป็นการ permute (สลับลำดับ) ของกันและกัน" },
      { t: "p", c: "นอกจากนี้ยังทำ pruning (ตัดกิ่ง) ได้: ถ้าเลขที่กำลังจะ choose มากกว่า remaining แล้ว ตัวถัด ๆ ไปยิ่งใหญ่กว่า จึงหยุด loop ทันทีด้วย break ไม่ต้องเสียเวลา iterate ต่อ" },
      { t: "ol", c: [
        "initialize result และ path เขียนฟังก์ชัน backtrack(start, remaining)",
        "ถ้า len(path) == k แปลว่า choose ครบจำนวนแล้ว: ถ้า remaining == 0 พอดี ให้เก็บ copy (สำเนา) ของ path ลง result แล้ว return ไม่ว่ากรณีใด",
        "iterate num จาก start ถึง 9: ถ้า num > remaining ให้ break (pruning)",
        "ไม่งั้น choose (append num) → explore (backtrack(num+1, remaining-num)) → unchoose (pop)",
        "เริ่มด้วย backtrack(1, n)",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", warn: true, c: "ต้อง compare สองเงื่อนไขพร้อมกันตอนเก็บคำตอบ: count ครบ k ตัว และ remaining เหลือ 0 พอดี ถ้าเช็คแค่ sum โดยไม่ดู count หรือกลับกัน จะได้คำตอบผิด อีกจุดคือส่ง num+1 (ไม่ใช่ start+1 หรือ num) ตอน explore เพื่อไม่ให้ choose เลขซ้ำและไล่จากน้อยไปมาก" },

      { t: "h2", c: "ไล่ทีละสเต็ป" },
      { t: "p", c: "ลองไล่ k = 3, n = 7 ดูการเดินของ start และ remaining (แสดงเฉพาะ path ที่นำไปสู่คำตอบและที่ถูก prune):" },
      { t: "table", head: ["path", "start", "remaining", "เกิดอะไร"], rows: [
        ["[]", "1", "7", "เลือก 1"],
        ["[1]", "2", "6", "เลือก 2"],
        ["[1,2]", "3", "4", "เลือก 3 → remaining 1, ยังไม่ครบ k แต่ทางตัน"],
        ["[1,2,3]", "4", "1", "ครบ k แต่ remaining=1 ≠ 0 ทิ้ง ถอยไปลอง 4"],
        ["[1,2,4]", "5", "0", "ครบ k และ remaining=0 → เก็บ [1,2,4]"],
      ] },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "code", lang: "python", c: `def combination_sum3(k, n):
    result = []
    path = []

    def backtrack(start, remaining):
        if len(path) == k:            # เลือกครบ k ตัวแล้ว
            if remaining == 0:        # ผลรวมพอดี = คำตอบที่ใช้ได้
                result.append(path[:])
            return                    # ครบ k แล้วไม่ว่ายังไงก็หยุด
        for num in range(start, 10):  # เลือกเลขจาก start ถึง 9
            if num > remaining:       # ตัดกิ่ง: ตัวนี้และตัวถัด ๆ ใหญ่เกิน
                break
            path.append(num)                     # choose
            backtrack(num + 1, remaining - num)  # explore: ตัวถัดไปเริ่มที่ num+1
            path.pop()                           # unchoose

    backtrack(1, n)
    return result

print(combination_sum3(3, 7))  # [[1, 2, 4]]
print(combination_sum3(3, 9))  # [[1, 2, 6], [1, 3, 5], [2, 3, 4]]
print(combination_sum3(4, 1))  # []` },
        { t: "p", c: "เรา build combination ทีละตัว โดย parameter (พารามิเตอร์) start คุมไม่ให้ย้อนไป choose เลขที่เล็กกว่าตัวล่าสุด ทำให้ combination ที่ได้ sorted จากน้อยไปมากเสมอ จึงไม่มีทาง choose เลขซ้ำและไม่ได้ชุดที่เป็นเพียงการ permute ของกันและกัน ส่วน remaining คือค่าที่ยังต้องเติมให้ครบ n เมื่อ choose เลข num เราก็ subtract (ลบ) มันออกจาก remaining แล้ว explore ต่อ" },
        { t: "p", c: "จุดที่ทำให้เร็วขึ้นคือ pruning เมื่อ num > remaining เราหยุดทั้ง loop ด้วย break ได้เลย เพราะ range sorted จากน้อยไปมาก ถ้าตัวนี้ใหญ่เกินไปแล้ว ตัวถัด ๆ ยิ่งใหญ่กว่า จึงไม่มีทางเป็นคำตอบ ถ้าเปลี่ยน break เป็น continue ก็ยังได้คำตอบถูกแต่จะช้าลงเพราะเสียเวลา iterate ตัวที่ไม่มีทางเวิร์ก" },
        { t: "p", c: "Time O(C(9,k) · k) จำนวน combination ที่เป็นไปได้มากสุดคือการ choose k ตัวจาก 9 (มีเพดานตายตัวเพราะ choose ได้แค่ 1-9) และการ copy แต่ละชุดใช้ O(k) · Space O(k) จาก depth ของ recursion และขนาด path" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "โจทย์ combination (choose ชุดโดยไม่สน order/ลำดับ) กันซ้ำด้วย parameter start ที่บังคับให้ไล่จากน้อยไปมาก และเร่งความเร็วด้วย pruning เมื่อรู้ว่าทางข้างหน้าเป็นไปไม่ได้แล้ว" },
    ],
  },
};
