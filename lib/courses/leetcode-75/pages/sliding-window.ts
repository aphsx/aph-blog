import type { Page } from "@/lib/types";

export const slidingWindowPages: Record<string, Page> = {
  "lc75-intro-sliding-window": {
    slug: "lc75-intro-sliding-window",
    title: {
      th: "Sliding Window — พื้นฐาน & แนวคิด",
      en: "",
    },
    lead: {
      th: "หน้าต่างคือช่วงช่องติดกันที่ขอบซ้าย-ขวาคุมไว้ — หน้านี้สอนขยาย/หด ถือ state ในช่วง และต่างจาก two pointers ตรงที่สนใจทั้งช่วง",
      en: "",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "เวลาทำงานกับแถว บางคำถามสนใจช่วงช่องที่ติดกัน เช่น ผลรวมของสามช่องติดกัน หรือช่วงยาวสุดที่ยังมีศูนย์ไม่เกินหนึ่งตัว — ของนอกช่วงไม่นับ และช่องในช่วงห้ามกระโดดข้าม",
        },
        {
          t: "p",
          c: "หมวด Two Pointers คุณใช้สองนิ้วขยับบนแถวไปแล้ว หน้านี้ใช้ left กับ right เหมือนกัน แต่สิ่งที่สนใจคือ ทั้งช่วงระหว่างสองขอบ พร้อมตัวเลขสั้น ๆ ที่จำสรุปของช่วงนั้นไว้ เรียกว่า sliding window (หน้าต่างเลื่อน)",
        },

        { t: "h2", c: "ส่วนที่ 1 · ช่วงต่อเนื่องคืออะไร" },
        {
          t: "p",
          c: "ช่วงต่อเนื่อง (contiguous) คือช่องที่เรียงติดกันไม่มีช่องคั่น เช่น ใน [2, 1, 5, 1, 3] ช่วง [1, 5, 1] ติดกัน แต่ [2, 5, 3] ไม่ใช่ช่วงต่อเนื่องเพราะกระโดดข้าม",
        },
        {
          t: "p",
          c: "เราจำช่วงด้วยสองขอบ: left = ช่องซ้ายสุดของหน้าต่าง · right = ช่องขวาสุด ความยาวของช่วง [left..right] (รวมทั้งสองปลาย) คือ right - left + 1 ไม่ใช่ right - left",
        },
        {
          t: "codeout",
          lang: "python",
          label: "ความยาวช่วงรวมปลายทั้งสอง",
          code: `nums = [2, 1, 5, 1, 3]
left, right = 1, 3
print("ช่วง:", nums[left:right + 1])
print("ยาว:", right - left + 1)`,
          out: `ช่วง: [1, 5, 1]
ยาว: 3`,
        },
        {
          t: "callout",
          title: "ศัพท์ที่จะใช้ต่อ",
          c: "window (หน้าต่าง) = ช่วง [left..right] ตอนนี้ · ขยาย = ขยับ right ไปขวา · หด = ขยับ left ไปขวา · state = ตัวเลขสั้น ๆ ที่สรุปของในหน้าต่าง (เช่น ผลรวม หรือจำนวนศูนย์)",
        },

        { t: "h2", c: "ส่วนที่ 2 · ทำไมต้องมีหน้าต่างเลื่อน" },
        {
          t: "p",
          c: "ถ้าอยากรู้ผลรวมของทุกช่วงยาว k การบวกใหม่ทั้งก้อนทุกจุดเริ่มต้นจะทำซ้ำงานมหาศาล — ช่วงถัดไปซ้อนกับช่วงก่อนเกือบหมด ต่างแค่ตัวซ้ายหลุดกับตัวขวาเข้า",
        },
        {
          t: "codeout",
          lang: "python",
          label: "บวกใหม่ทุกช่วงยาว 3 — งานซ้ำ",
          code: `nums = [2, 1, 5, 1, 3, 2]
k = 3
adds = 0
best = float("-inf")

for i in range(len(nums) - k + 1):
    total = 0
    for j in range(i, i + k):
        total += nums[j]
        adds += 1
    best = max(best, total)

print("best =", best, "| บวก", adds, "ครั้ง")`,
          out: `best = 9 | บวก 12 ครั้ง`,
        },
        {
          t: "p",
          c: "ไอเดียของหน้าต่างเลื่อน: ถือผลรวมของช่วงปัจจุบันไว้ เลื่อนไปทีละช่องแล้ว บวกตัวเข้า ลบตัวออก แทนการบวกทั้งก้อนใหม่ — งานโตตามความยาวแถว ประมาณ O(n) ตามหน้า Big-O",
        },

        { t: "h2", c: "ส่วนที่ 3 · ความยาวคงที่ — เลื่อนทั้งก้อนทีละช่อง" },
        {
          t: "p",
          c: "เมื่อต้องการช่วงยาว k ตายตัว หน้าต่างไม่ยืดไม่หด — วางยาว k ช่องแรก แล้วทุกก้าว right เดินไปหนึ่งช่อง left ก็ตามไปหนึ่งช่อง ความยาวยังเป็น k เสมอ",
        },
        {
          t: "p",
          c: "ตัวอย่างจิ๋ว: หาผลรวมมากสุดของช่วงยาว 3 ใน [2, 1, 5, 1, 3, 2]",
        },
        {
          t: "codeout",
          lang: "python",
          label: "เลื่อนยาวคงที่ — บวกเข้า ลบออก",
          code: `nums = [2, 1, 5, 1, 3, 2]
k = 3
window = sum(nums[:k])
best = window
print(f"เริ่ม  {nums[:k]} รวม = {window}")

for i in range(k, len(nums)):
    window += nums[i] - nums[i - k]
    best = max(best, window)
    print(f"เข้า {nums[i]} ออก {nums[i - k]} -> รวม = {window}")

print("best =", best)`,
          out: `เริ่ม  [2, 1, 5] รวม = 8
เข้า 1 ออก 2 -> รวม = 7
เข้า 3 ออก 1 -> รวม = 9
เข้า 2 ออก 5 -> รวม = 6
best = 9`,
        },
        {
          t: "p",
          c: "state ในตัวอย่างนี้คือตัวแปร window ที่ถือผลรวม — อัปเดตตอนของเข้าและของออกให้ตรงกับขอบ left/right เสมอ",
        },
        { t: "h3", c: "ดูทีละขั้น (Interactive)" },
        {
          t: "p",
          c: "กด **Next ▶** กรอบเขียว = หน้าต่างยาว 3 ตลอด · ทอง = ตัวเข้าขวา · ส้ม = ตัวออกซ้าย · ดู sum กับ best มุมล่าง",
        },
        { t: "viz", id: "slide-fixed" },

        { t: "h2", c: "ส่วนที่ 4 · ของที่ถือไว้ในหน้าต่าง (state)" },
        {
          t: "p",
          c: "left กับ right บอกแค่ขอบเขต — ยังต้องมี state ที่สรุปของข้างใน เพื่อตอบคำถามเร็วโดยไม่ไล่บวกทั้งช่วงใหม่ทุกครั้ง",
        },
        {
          t: "ul",
          c: [
            "ผลรวม — เหมาะกับถามผลรวมหรือค่าเฉลี่ยของช่วง",
            "ตัวนับ — เช่น นับว่ามีศูนย์กี่ตัว หรือมีสระกี่ตัวในหน้าต่าง",
          ],
        },
        {
          t: "callout",
          title: "กฎสั้น ๆ",
          c: "ขยับขอบแล้วต้องอัปเดต state ให้ตรงกันเสมอ — รับของเข้าทาง right ก็บวก/นับเข้า · เอาของออกทาง left ก็ลบ/นับออก · ลืมอันใดอันหนึ่ง คำตอบเพี้ยนโดยไม่มี error",
        },
        {
          t: "p",
          c: "ของอย่าง deque สำหรับหาค่ามากสุดในทุกหน้าต่างยาว k ยังไม่สอนในหน้านี้ — เลื่อนไปเมื่อจำเป็นจริง",
        },

        { t: "h2", c: "ส่วนที่ 5 · ความยาวยืดได้ — ขยายขวา หดซ้าย" },
        {
          t: "p",
          c: "บางงานไม่ล็อกความยาว k แต่มีเงื่อนไขว่าหน้าต่างยังถูกต้องไหม เช่น \"มีศูนย์ในหน้าต่างได้ไม่เกิน k ตัว\" — ตอนนั้นความยาวเปลี่ยนได้",
        },
        {
          t: "p",
          c: "จังหวะมาตรฐานสามขั้นในแต่ละรอบ: (1) ขยาย right รับของเข้า แล้วอัปเดต state (2) ขณะที่เงื่อนไขพัง ให้หด left ทีละช่องจนกลับมาถูก (3) ตอนหน้าต่างถูกต้องแล้ว ค่อยอัปเดตคำตอบ เช่นความยาวยาวสุด",
        },
        {
          t: "p",
          c: "ตัวอย่างจิ๋ว: ใน [1, 1, 0, 1, 1, 0, 1] หาช่วงยาวสุดที่ยังมีศูนย์ได้ไม่เกิน 1 ตัว — state คือตัวแปร zeros",
        },
        {
          t: "codeout",
          lang: "python",
          label: "ขยาย / หด ตามจำนวนศูนย์",
          code: `nums = [1, 1, 0, 1, 1, 0, 1]
k = 1
left = 0
zeros = 0
best = 0

for right in range(len(nums)):
    if nums[right] == 0:
        zeros += 1
    while zeros > k:
        if nums[left] == 0:
            zeros -= 1
        left += 1
    best = max(best, right - left + 1)
    print(f"L={left} R={right} zeros={zeros} ยาว={right - left + 1} best={best}")

print("คำตอบ:", best)`,
          out: `L=0 R=0 zeros=0 ยาว=1 best=1
L=0 R=1 zeros=0 ยาว=2 best=2
L=0 R=2 zeros=1 ยาว=3 best=3
L=0 R=3 zeros=1 ยาว=4 best=4
L=0 R=4 zeros=1 ยาว=5 best=5
L=3 R=5 zeros=1 ยาว=3 best=5
L=3 R=6 zeros=1 ยาว=4 best=5
คำตอบ: 5`,
        },
        {
          t: "p",
          c: "สังเกตตอน right ชี้ศูนย์ตัวที่สอง: zeros เกิน k จึง while หด left จนศูนย์ตัวแรกหลุด — left เดินไปข้างหน้าอย่างเดียว ไม่ถอยหลัง",
        },
        { t: "h3", c: "ดูทีละขั้น (Interactive)" },
        {
          t: "p",
          c: "กด **Next ▶** กรอบยืด-หดตาม L..R · ทอง = กำลังขยาย · ส้ม = กำลังหด · มุมล่างโชว์ zeros กับ best",
        },
        { t: "viz", id: "slide-variable" },

        { t: "h2", c: "ส่วนที่ 6 · ต่างจาก Two Pointers ตรงไหน" },
        {
          t: "table",
          head: ["", "Two Pointers (ที่เรียนไป)", "Sliding Window"],
          rows: [
            ["สนใจอะไร", "ค่าที่ปลายสองข้าง หรือช่องอ่าน/เขียน", "ทั้งช่วงระหว่าง left..right"],
            ["ทิศทางนิ้ว", "เข้าหากัน หรือทางเดียวกัน", "ทางเดียวกันเสมอ (ซ้าย→ขวา)"],
            ["ของเสริม", "มักไม่มีสรุปทั้งช่วง", "มี state ของทั้งหน้าต่าง"],
            ["ช่วงมีความหมายไหม", "ปลายสำคัญกว่าของกลาง", "ของกลางทุกช่องอยู่ในคำตอบ"],
          ],
        },
        {
          t: "p",
          c: "พูดสั้น ๆ: sliding window คือสองนิ้วทางเดียวกันที่ถือสรุปของทั้งช่วงไว้ด้วย — ถ้างานถามเรื่องช่วงติดกันและต้องอัปเดตสรุปตอนของเข้า/ออก นี่คือเครื่องมือนั้น",
        },

        { t: "h2", c: "ส่วนที่ 7 · สรุป operation และราคา" },
        {
          t: "table",
          head: ["สิ่งที่ทำ", "ทำยังไงสั้น ๆ", "เวลาโดยประมาณ"],
          rows: [
            ["สร้างหน้าต่างแรกยาว k", "บวก nums[:k] หรือนับใน k ช่องแรก", "O(k)"],
            ["เลื่อนยาวคงที่หนึ่งช่อง", "บวกตัวเข้า ลบตัวออก", "O(1) ต่อก้าว"],
            ["ขยายขอบขวา", "right += 1 แล้วอัปเดต state", "O(1) ต่อก้าว"],
            ["หดขอบซ้าย", "อัปเดต state แล้ว left += 1", "O(1) ต่อก้าว"],
            ["กวาดทั้งแถว", "แต่ละช่องเข้า/ออกไม่เกินครั้งละหนึ่ง", "O(n) รวม"],
          ],
        },
        {
          t: "p",
          c: "เหตุผล O(n): left กับ right เดินไปข้างหน้าอย่างเดียว แต่ละ index ถูกแตะจำกัดครั้ง — อ้างอิง Big-O เพิ่มได้ที่หน้า lc75-bigo",
        },
        {
          t: "ul",
          c: [
            "ความยาวช่วง [left..right] = right - left + 1",
            "ขยับขอบแล้วอย่าลืม state",
            "หดด้วย while จนเงื่อนไขกลับมาถูก ก่อนอัปเดตคำตอบแบบ \"ยาวสุด\"",
            "left ห้ามถอยหลัง ไม่งานจะไม่เหลือ O(n)",
          ],
        },
        {
          t: "callout",
          title: "ของที่ยังไม่สอนในหน้านี้",
          c: "prefix sum สำหรับถามผลรวมช่วงใดก็ได้ → หมวด Prefix Sum · deque หา max/min ในทุกหน้าต่างยาว k → นอก intro นี้",
        },
        {
          t: "p",
          c: "พร้อมแล้วไปข้อแรกของหมวดได้จากแถบนำทางด้านล่าง",
        },
      ],
      en: [],
    },
  },

  "lc75-p14": {
    slug: "lc75-p14",
    title: { th: "ข้อ 14 · LC643 Maximum Average Subarray I (ค่าเฉลี่ย subarray มากสุด) 🟢", en: "" },
    lead: { th: "หา subarray ยาว k ที่มีค่าเฉลี่ยมากที่สุด แล้วคืนค่าเฉลี่ยนั้น", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: `กำหนดอาร์เรย์จำนวนเต็ม nums ที่ประกอบด้วยสมาชิก n ตัว และจำนวนเต็ม k

จงหา contiguous subarray (ช่วงต่อเนื่อง) ที่มีความยาวเท่ากับ k ซึ่งมีค่าเฉลี่ยมากที่สุด แล้ว return ค่านั้น คำตอบใดที่คลาดเคลื่อนจากการคำนวณน้อยกว่า 10^-5 จะถือว่าผ่าน` },
              {
                t: "example",
                c: [
                  {
                    input: "nums = [1,12,-5,-6,50,3], k = 4",
                    output: "12.75000",
                    explain: "ค่าเฉลี่ยมากที่สุดคือ (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75",
                  },
                  {
                    input: "nums = [5], k = 1",
                    output: "5.00000",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "n == nums.length",
                "1 <= k <= n <= 10^5",
                "-10^4 <= nums[i] <= 10^4",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ Sliding Window ขนาดคงที่ (fixed size) k เพราะโจทย์บอกความยาว k มาชัดเจน กุญแจคือค่าเฉลี่ยมากสุดเกิดที่ช่วงที่ผลรวมมากสุด (ทุกช่วงยาว k หารด้วยตัวเดียวกัน) จึงเปลี่ยนโจทย์เป็นหาผลรวมมากสุดของช่วงยาว k แทน" },
              { t: "p", c: "brute force คำนวณผลรวมทุกช่วงยาว k ใหม่หมด เป็น O(nk) ช้าเมื่อ k ใหญ่ Sliding Window เหลือ O(n) เพราะแค่บวกตัวที่เพิ่งเข้าและลบตัวที่เพิ่งออก ไม่ต้องบวกใหม่ทั้งก้อน" },
              { t: "ol", c: [
                "สร้าง window แรกด้วย window = sum(nums[:k]) แล้ว initialize best = window",
                "iterate i จาก k ไปจนจบ array",
                "บวกตัวใหม่ที่เข้าทางขวา (window += nums[i])",
                "ลบตัวเก่าที่หลุดออกทางซ้าย (window -= nums[i - k])",
                "update best = max(best, window)",
                "จบ loop return best / k เป็นค่าเฉลี่ย",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "สร้าง window แรกด้วย sum(nums[:k]) และ initialize best = window เสมอ ถ้าเริ่ม best = 0 แล้ว array มีแต่ค่าติดลบ คำตอบจะผิด" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "ลองไล่ nums = [1, 12, -5, -6, 50, 3], k = 4 window แรกคือ [1, 12, -5, -6] รวม = 2" },
              { t: "table", head: ["i", "ตัวเข้า nums[i]", "ตัวออก nums[i-k]", "window หลังปรับ", "best"], rows: [
                ["เริ่ม", "-", "-", "2", "2"],
                ["4", "50", "1 (index 0)", "2 + 50 - 1 = 51", "51"],
                ["5", "3", "12 (index 1)", "51 + 3 - 12 = 42", "51"],
              ] },
              { t: "p", c: "best = 51 คือผลรวมช่วง [12, -5, -6, 50] คืนค่า 51 / 4 = 12.75" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `def find_max_average(nums, k):
    window = sum(nums[:k])         # ผลรวมหน้าต่างแรก [0, k)
    best = window
    for i in range(k, len(nums)):
        window += nums[i]          # ตัวใหม่เข้าทางขวา
        window -= nums[i - k]      # ตัวเก่าหลุดออกทางซ้าย
        best = max(best, window)
    return best / k                # แปลงผลรวมมากสุดเป็นค่าเฉลี่ย

print(find_max_average([1, 12, -5, -6, 50, 3], 4))  # 12.75`, out: `12.75` },
                { t: "p", c: "กุญแจคือค่าเฉลี่ยมากสุดเกิดที่ช่วงที่ผลรวมมากสุด เพราะทุกช่วงยาว k เท่ากันหมด จึงเปลี่ยนโจทย์เป็นหาผลรวมมากสุดของช่วงยาว k ซึ่งง่ายกว่า แล้วค่อยหารด้วย k ตอนท้ายทีเดียว" },
                { t: "p", c: "หัวใจของความเร็วคือเลื่อน window แทนบวก k ตัวใหม่ทุกครั้ง (ซึ่งจะกลายเป็น O(nk)) แค่บวกตัวที่เพิ่งเข้าและลบตัวที่เพิ่งออก ต้อง initialize best = window แรกเสมอ ไม่งั้นกรณีค่าติดลบล้วนจะตอบผิด" },
                { t: "p", c: "Time O(n) สร้าง window แรก O(k) แล้วเลื่อนอีก O(n) รวมยังเป็น O(n) · Space O(1) เก็บแค่ผลรวมกับค่าดีสุด" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "window ขนาดคงที่ k: บวกตัวเข้า ลบตัวออก อย่าคำนวณทั้งช่วงใหม่ และถ้าโจทย์ถามค่าเฉลี่ย ให้แปลงเป็นหาผลรวมก่อนแล้วค่อยหารตอนท้าย" },
      ],
      en: [
        {
          t: "p",
          c: `You are given an integer array nums consisting of n elements, and an integer k.

Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10^-5 will be accepted.`,
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [1,12,-5,-6,50,3], k = 4",
              output: "12.75000",
              explain: "Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75",
            },
            {
              input: "nums = [5], k = 1",
              output: "5.00000",
            },
          ],
        },
        {
          t: "constraints",
          c: ["n == nums.length", "1 <= k <= n <= 10^5", "-10^4 <= nums[i] <= 10^4"],
        },
      ],
    },
  },

  "lc75-p15": {
    slug: "lc75-p15",
    title: { th: "ข้อ 15 · LC1456 Maximum Number of Vowels in a Substring of Given Length (นับสระในหน้าต่าง k) 🟡", en: "" },
    lead: { th: "หา substring ยาว k ที่มีตัวสระมากที่สุด แล้วคืนจำนวนสระนั้น", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: `กำหนดสตริง s และจำนวนเต็ม k มาให้ ให้ return จำนวนตัวอักษรสระสูงสุดใน substring ใด ๆ ของ s ที่มีความยาว k

ตัวอักษรสระในภาษาอังกฤษคือ 'a', 'e', 'i', 'o' และ 'u'` },
              {
                t: "example",
                c: [
                  {
                    input: 's = "abciiidef", k = 3',
                    output: "3",
                    explain: 'substring "iii" มีตัวสระ 3 ตัว',
                  },
                  {
                    input: 's = "aeiou", k = 2',
                    output: "2",
                    explain: "substring ยาว 2 ช่วงใดก็มีสระ 2 ตัว",
                  },
                  {
                    input: 's = "leetcode", k = 3',
                    output: "2",
                    explain: '"lee", "eet" และ "ode" มีสระ 2 ตัว',
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "1 <= s.length <= 10^5",
                "s ประกอบด้วยตัวอักษรอังกฤษพิมพ์เล็ก",
                "1 <= k <= s.length",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ Sliding Window ขนาดคงที่ k เหมือนข้อก่อน แต่แทนที่จะเก็บผลรวม เรา track \"จำนวน vowel ใน window\" แทน เช็คว่าตัวอักษรเป็นสระด้วย set(\"aeiou\") (hash set) ทำให้เช็คได้ O(1)" },
              { t: "p", c: "brute force นับสระใหม่ในทุก substring ยาว k เป็น O(nk) ช้า Sliding Window เก็บ count แล้วปรับทีละหนึ่งตอนเลื่อน จึงเหลือ O(n)" },
              { t: "ol", c: [
                "เตรียม set ของสระ นับสระใน window แรก s[:k] เก็บใน count แล้ว initialize best = count",
                "iterate i จาก k ไปจนจบ string",
                "ถ้าตัวใหม่ s[i] เป็นสระ count += 1",
                "ถ้าตัวเก่า s[i - k] เป็นสระ count -= 1",
                "update best = max(best, count)",
                "(ปรับให้เร็ว) ถ้า best == k หยุดได้เลย เพราะสระเยอะสุดใน window ยาว k คือ k",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ตัวที่ต้องถอดคือ s[i - k] (ห่างไป k ช่อง) ไม่ใช่ s[i - k + 1] — ใช้ index ผิดจะนับเพี้ยนทันที" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "ลองไล่ s = \"leetcode\", k = 3 window แรก \"lee\" มีสระ 2 (e, e)" },
              { t: "table", head: ["i", "ตัวเข้า s[i]", "ตัวออก s[i-k]", "count หลังปรับ", "best"], rows: [
                ["เริ่ม", "-", "-", "2 (lee)", "2"],
                ["3", "t (ไม่ใช่สระ)", "l (ไม่ใช่สระ)", "2 (eet)", "2"],
                ["4", "c (ไม่ใช่สระ)", "e (สระ)", "1 (etc)", "2"],
                ["5", "o (สระ)", "e (สระ)", "1 (tco)", "2"],
                ["6", "d (ไม่ใช่สระ)", "t (ไม่ใช่สระ)", "1 (cod)", "2"],
                ["7", "e (สระ)", "c (ไม่ใช่สระ)", "2 (ode)", "2"],
              ] },
              { t: "p", c: "best = 2 ตลอด คืนค่า 2" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `def max_vowels(s, k):
    vowels = set("aeiou")
    count = sum(1 for c in s[:k] if c in vowels)   # นับสระในหน้าต่างแรก
    best = count
    for i in range(k, len(s)):
        if s[i] in vowels:        # ตัวใหม่เข้าทางขวา
            count += 1
        if s[i - k] in vowels:    # ตัวเก่าหลุดออกทางซ้าย
            count -= 1
        best = max(best, count)
        if best == k:             # เต็มหน้าต่างแล้ว ไม่มีทางมากกว่านี้
            break
    return best

print(max_vowels("abciiidef", 3))  # 3
print(max_vowels("leetcode", 3))   # 2`, out: `3
2` },
                { t: "p", c: "แทนที่จะนับสระใหม่ทุก window (ช้า O(nk)) เรา track count แล้วปรับทีละหนึ่งตอนเลื่อน: ตัวใหม่เข้าเป็นสระ +1, ตัวเก่าที่หลุดออก (s[i - k]) เป็นสระ -1 ใช้ set(\"aeiou\") เช็คว่าเป็นสระ O(1)" },
                { t: "p", c: "if best == k แล้ว break เป็นการปรับให้เร็วขึ้น เพราะสระมากสุดใน window ยาว k คือ k อยู่แล้ว เจอครบก็ไม่ต้องดูต่อ เอาออกก็ยังถูก เพียงแต่ iterate ครบทุกตัว" },
                { t: "p", c: "Time O(n) iterate string รอบเดียว · Space O(1) hash set ของสระมีแค่ 5 ตัว ถือเป็นค่าคงที่" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "window ขนาดคงที่ที่ track \"count\" แทนผลรวม: ตัวเข้าเพิ่มนับ ตัวออกลดนับ pattern เดียวกับผลรวมแต่เปลี่ยนสิ่งที่ track เท่านั้น" },
      ],
      en: [
        {
          t: "p",
          c: `Given a string s and an integer k, return the maximum number of vowel letters in any substring of s with length k.

Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.`,
        },
        {
          t: "example",
          c: [
            {
              input: 's = "abciiidef", k = 3',
              output: "3",
              explain: 'The substring "iii" contains 3 vowel letters.',
            },
            {
              input: 's = "aeiou", k = 2',
              output: "2",
              explain: "Any substring of length 2 contains 2 vowels.",
            },
            {
              input: 's = "leetcode", k = 3',
              output: "2",
              explain: '"lee", "eet" and "ode" contain 2 vowels.',
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= s.length <= 10^5",
            "s consists of lowercase English letters.",
            "1 <= k <= s.length",
          ],
        },
      ],
    },
  },

  "lc75-p16": {
    slug: "lc75-p16",
    title: { th: "ข้อ 16 · LC1004 Max Consecutive Ones III (หนึ่งต่อเนื่องมากสุด พลิก k) 🟡", en: "" },
    lead: { th: "พลิก 0 เป็น 1 ได้มากสุด k ตัว หาช่วง 1 ต่อเนื่องที่ยาวที่สุด", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: `กำหนด binary array nums และจำนวนเต็ม k มาให้ ให้ return จำนวนสูงสุดของ 1 ที่ต่อเนื่องกันในอาร์เรย์ หากคุณสามารถพลิก (flip) 0 ได้อย่างมากที่สุด k ตัว` },
              {
                t: "example",
                c: [
                  {
                    input: "nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2",
                    output: "6",
                    explain: "[1,1,1,0,0,1,1,1,1,1,1]\nตัวเลขตัวหนาคือ 0 ที่ถูกพลิกเป็น 1 ส่วน subarray ที่ยาวที่สุดถูกขีดเส้นใต้",
                  },
                  {
                    input: "nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3",
                    output: "10",
                    explain: "[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]\nตัวเลขตัวหนาคือ 0 ที่ถูกพลิกเป็น 1 ส่วน subarray ที่ยาวที่สุดถูกขีดเส้นใต้",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "1 <= nums.length <= 10^5",
                "nums[i] เป็น 0 หรือ 1",
                "0 <= k <= nums.length",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ใช้ Sliding Window ขนาดยืดหยุ่น (variable size) กุญแจคือเปลี่ยนมุมมอง: \"พลิก 0 ได้ k ตัว\" เท่ากับ \"window ที่ยาวที่สุดที่มี 0 ไม่เกิน k ตัว\" เพราะ 0 ทุกตัวใน window พลิกเป็น 1 ได้ตราบใดที่ไม่เกิน k" },
              { t: "p", c: "brute force ลองทุกช่วงแล้วนับ 0 เป็น O(n²) ช้า Sliding Window ขยายขวารับของเข้าเรื่อย ๆ track จำนวน 0 ไว้ ถ้าเกิน k ค่อยหดซ้าย จึงเหลือ O(n)" },
              { t: "ol", c: [
                "initialize left = 0, zeros = 0, best = 0",
                "iterate right ไปทุก index ถ้า nums[right] == 0 ให้ zeros += 1 (รับตัวใหม่ทางขวา)",
                "ขณะที่ zeros > k ให้หดซ้าย: ถ้า nums[left] == 0 ลด zeros แล้ว left += 1",
                "window ถูกต้องแล้ว update best = max(best, right - left + 1)",
                "จบ loop return best",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ต้องใช้ while ไม่ใช่ if ตอนหดซ้าย และความยาว window คือ right - left + 1 (บวกหนึ่งเพราะรวมทั้งสองปลาย)" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "ลองไล่ nums = [1, 1, 0, 0, 1], k = 1 ดูว่า left หดตอนไหน" },
              { t: "table", head: ["right (ค่า)", "zeros", "หดซ้าย?", "left", "ความยาว (right-left+1)", "best"], rows: [
                ["0 (1)", "0", "ไม่", "0", "1", "1"],
                ["1 (1)", "0", "ไม่", "0", "2", "2"],
                ["2 (0)", "1", "ไม่ (≤k)", "0", "3", "3"],
                ["3 (0)", "2", "ใช่ จน zeros≤1", "3", "1", "3"],
                ["4 (1)", "1", "ไม่", "3", "2", "3"],
              ] },
              { t: "p", c: "best = 3 (ช่วง [1, 1, 0] พลิก 0 หนึ่งตัวได้ 1 สามตัว)" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `def longest_ones(nums, k):
    left = 0
    zeros = 0            # จำนวน 0 ในหน้าต่างตอนนี้
    best = 0
    for right in range(len(nums)):
        if nums[right] == 0:
            zeros += 1                 # รับตัวใหม่ทางขวา
        while zeros > k:               # 0 เกินโควตาพลิก
            if nums[left] == 0:
                zeros -= 1             # หดซ้าย ถอด 0 ออก
            left += 1
        best = max(best, right - left + 1)   # หน้าต่างตอนนี้ถูกต้อง
    return best

print(longest_ones([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2))  # 6`, out: `6` },
                { t: "p", c: "กุญแจคือเปลี่ยนมุมมอง: แทนที่จะคิดว่า \"พลิก 0 กี่ตัว\" ให้คิดว่า \"window ที่ยาวที่สุดที่มี 0 ไม่เกิน k ตัว\" มีค่าเท่ากัน เพราะ 0 ทุกตัวใน window พลิกเป็น 1 ได้ตราบใดที่ไม่เกิน k เราจึงขยายขวารับของเข้าเรื่อย ๆ และ track จำนวน 0 ไว้" },
                { t: "p", c: "เมื่อ 0 ใน window เกิน k เราหดซ้าย (ขยับ left) จนจำนวน 0 กลับมาไม่เกิน k left ขยับรวมกันไม่เกิน n ครั้งตลอด loop จึงยังเป็น O(n) ไม่ใช่ O(n²) ถ้าเผลอใช้ if แทน while จะหด 0 ไม่พอเมื่อ k ลดหลายตัว" },
                { t: "p", c: "Time O(n) แต่ละตัวเข้าและออก window อย่างละครั้ง · Space O(1) track แค่ตัวนับกับ pointer (ตัวชี้)" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "window ขนาดยืดหยุ่น + \"เปลี่ยนโจทย์เป็น condition (เงื่อนไข) บน window\": พลิก k ตัว = window ที่มี 0 ไม่เกิน k ขยายขวาเสมอ หดซ้ายเมื่อผิด condition" },
      ],
      en: [
        {
          t: "p",
          c: `Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.`,
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2",
              output: "6",
              explain: "[1,1,1,0,0,1,1,1,1,1,1]\nBolded numbers were flipped from 0 to 1. The longest subarray is underlined.",
            },
            {
              input: "nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3",
              output: "10",
              explain: "[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]\nBolded numbers were flipped from 0 to 1. The longest subarray is underlined.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= nums.length <= 10^5",
            "nums[i] is either 0 or 1.",
            "0 <= k <= nums.length",
          ],
        },
      ],
    },
  },

  "lc75-p17": {
    slug: "lc75-p17",
    title: { th: "ข้อ 17 · LC1493 Longest Subarray of 1's After Deleting One Element (ช่วงหนึ่งยาวสุดหลังลบตัว) 🟡", en: "" },
    lead: { th: "ต้องลบ element ออก 1 ตัวเสมอ หา subarray ของ 1 ต่อเนื่องที่ยาวที่สุดหลังลบ", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: `กำหนด binary array nums มาให้ คุณต้องลบสมาชิกหนึ่งตัวออกจากอาร์เรย์

ให้ return ขนาดของ subarray ที่ไม่ว่างเปล่าซึ่งมีแต่ 1 ล้วนที่ยาวที่สุดในอาร์เรย์ผลลัพธ์ ถ้าไม่มี subarray แบบนั้น ให้ return 0` },
              {
                t: "example",
                c: [
                  {
                    input: "nums = [1,1,0,1]",
                    output: "3",
                    explain: "หลังลบตัวเลขที่ตำแหน่ง 2 แล้ว [1,1,1] ประกอบด้วยตัวเลข 1 อยู่ 3 ตัว",
                  },
                  {
                    input: "nums = [0,1,1,1,0,1,1,0,1]",
                    output: "5",
                    explain: "หลังลบตัวเลขที่ตำแหน่ง 4 แล้ว [0,1,1,1,1,1,0,1] subarray ของ 1 ที่ยาวที่สุดคือ [1,1,1,1,1]",
                  },
                  {
                    input: "nums = [1,1,1]",
                    output: "2",
                    explain: "คุณต้องลบหนึ่งสมาชิก",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "1 <= nums.length <= 10^5",
                "nums[i] เป็น 0 หรือ 1",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "เป็นน้องของ LC1004 โดยตรง: มองว่า \"ต้องลบหนึ่งตัว\" คือ \"อนุญาตให้ window มี 0 ได้หนึ่งตัว (ตัวที่จะถูกลบ)\" ก็ได้ Sliding Window ขนาดยืดหยุ่นแบบ k = 1 ทันที" },
              { t: "p", c: "ความต่างสำคัญคือการนับความยาว: โจทย์บังคับลบหนึ่งตัวเสมอ (แม้ไม่มี 0 เลย) คำตอบจึงเป็นความยาว window ลบหนึ่ง เขียน right - left แทน right - left + 1" },
              { t: "ol", c: [
                "initialize left = 0, zeros = 0, best = 0",
                "iterate right ไปทุก index ถ้า nums[right] == 0 ให้ zeros += 1",
                "ขณะที่ zeros > 1 ให้หดซ้าย: ถ้า nums[left] == 0 ลด zeros แล้ว left += 1",
                "update best = max(best, right - left) — ไม่ +1 เพราะบังคับลบหนึ่งตัว",
                "จบ loop return best",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ใช้ right - left ไม่ใช่ right - left + 1 เพราะบังคับลบหนึ่งตัวเสมอ กรณี [1, 1, 1] (ไม่มี 0) ต้องได้ 2 ไม่ใช่ 3 — สูตรนี้จัดการให้อัตโนมัติ" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "ลองไล่ nums = [1, 1, 0, 1] ดูค่า best (right - left)" },
              { t: "table", head: ["right (ค่า)", "zeros", "หดซ้าย?", "left", "ความยาว (right-left)", "best"], rows: [
                ["0 (1)", "0", "ไม่", "0", "0", "0"],
                ["1 (1)", "0", "ไม่", "0", "1", "1"],
                ["2 (0)", "1", "ไม่ (≤1)", "0", "2", "2"],
                ["3 (1)", "1", "ไม่", "0", "3", "3"],
              ] },
              { t: "p", c: "best = 3 (window ทั้งหมด [1,1,0,1] ลบ 0 ออกเหลือ 1 สามตัว)" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `def longest_subarray(nums):
    left = 0
    zeros = 0            # จำนวน 0 ในหน้าต่าง (ยอมได้ไม่เกิน 1)
    best = 0
    for right in range(len(nums)):
        if nums[right] == 0:
            zeros += 1
        while zeros > 1:              # ยอม 0 ได้แค่ตัวเดียว
            if nums[left] == 0:
                zeros -= 1
            left += 1
        # ลบ 1 ตัวเสมอ -> ความยาวหน้าต่าง - 1 = (right - left + 1) - 1
        best = max(best, right - left)
    return best

print(longest_subarray([1, 1, 0, 1]))  # 3
print(longest_subarray([1, 1, 1]))     # 2`, out: `3
2` },
                { t: "p", c: "โจทย์นี้เป็นน้องของ LC1004 โดยตรง: มองว่า \"ต้องลบหนึ่งตัว\" คือ \"อนุญาตให้ window มี 0 ได้หนึ่งตัว (ตัวที่จะถูกลบ)\" ก็ได้ variable size window แบบ k = 1 ทันที ขยายขวารับของเข้า ถ้ามี 0 เกินหนึ่งก็หดซ้ายจนเหลือไม่เกินหนึ่ง" },
                { t: "p", c: "ความต่างสำคัญคือการนับความยาว: โจทย์บังคับลบหนึ่งตัวเสมอ (แม้ไม่มี 0 เลย) คำตอบจึงเป็นความยาว window ลบหนึ่ง เขียน best = max(best, right - left) แทน right - left + 1 กรณี [1, 1, 1] (ไม่มี 0 เลย) เป็น edge case สำคัญ — ยังถูกบังคับลบ 1 ตัว คำตอบจึงเป็น 2 ไม่ใช่ 3 สูตรนี้จัดการให้อัตโนมัติ" },
                { t: "p", c: "Time O(n) แต่ละตัวเข้าออก window อย่างละครั้ง · Space O(1) ใช้ตัวแปรไม่กี่ตัว" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "โจทย์ที่ดูต่าง แต่จริง ๆ คือ variable size window แบบ k = 1 ที่มีลูกเล่นเรื่องการนับความยาว: ถ้าเจอโจทย์ใกล้เคียง ให้ถามว่า \"condition (เงื่อนไข) บน window คืออะไร\" และ \"ความยาวที่ต้องตอบนับยังไง\"" },
      ],
      en: [
        {
          t: "p",
          c: `Given a binary array nums, you should delete one element from it.

Return the size of the longest non-empty subarray containing only 1's in the resulting array. Return 0 if there is no such subarray.`,
        },
        {
          t: "example",
          c: [
            {
              input: "nums = [1,1,0,1]",
              output: "3",
              explain: "After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1's.",
            },
            {
              input: "nums = [0,1,1,1,0,1,1,0,1]",
              output: "5",
              explain: "After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray with value of 1's is [1,1,1,1,1].",
            },
            {
              input: "nums = [1,1,1]",
              output: "2",
              explain: "You must delete one element.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= nums.length <= 10^5",
            "nums[i] is either 0 or 1.",
          ],
        },
      ],
    },
  },
};
