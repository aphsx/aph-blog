import type { Page } from "@/lib/types";

export const binarySearchPages: Record<string, Page> = {
  "lc75-intro-binary-search": {
    slug: "lc75-intro-binary-search",
    title: { th: "Binary Search — พื้นฐาน & แนวคิด", en: "" },
    lead: { th: "เทคนิค halve (ตัดครึ่ง) search space (ช่วงค้นหา) ทุกก้าว ลดเวลาจาก O(n) เหลือ O(log n) และต่อยอดเป็น binary search on answer (ค้นบนช่วงคำตอบ) เพื่อเดาคำตอบ", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "Binary Search (ค้นหาแบบแบ่งครึ่ง) คือหนึ่งในเทคนิคที่คุ้มค่าที่สุดที่ควรมีติดตัว ไอเดียเรียบง่ายมาก: ถ้าของ sorted (เรียงลำดับ) อยู่แล้ว ทุกครั้งที่ guess (เดา) เราสามารถ eliminate (ตัดทิ้ง) ตัวเลือกไปครึ่งหนึ่งได้ทันที ทำให้ search (ค้นหา) ของใน array (ลิสต์) ล้านตัวได้ในราว 20 ก้าวเท่านั้น หน้านี้จะปูตั้งแต่ binary search แบบพื้นฐาน ไปจนถึงเทคนิคขั้นสูงที่เรียกว่า binary search on answer" },

              { t: "h2", c: "แนวคิดพื้นฐาน & template lo/hi/mid" },
              { t: "p", c: "ลองนึกถึงการเปิด dictionary (พจนานุกรม) หาคำ เราไม่ได้เปิดทีละหน้าจากหน้าแรก แต่เปิดกลางเล่มก่อน ถ้าคำที่หาอยู่ก่อนหน้านั้นก็ตัดครึ่งหลังทิ้ง ถ้าอยู่หลังก็ตัดครึ่งแรกทิ้ง แล้วทำซ้ำกับครึ่งที่เหลือ นี่คือ binary search เป๊ะ ๆ เงื่อนไขสำคัญคือ ของต้อง sorted แล้ว เท่านั้นเราถึงจะรู้ว่าควร eliminate ครึ่งไหน" },
              { t: "p", c: "ทำไมมันเร็ว? เพราะทุกก้าวเรา halve (ลดครึ่ง) ขนาดปัญหา array n ตัว จะแบ่งครึ่งได้ราว log2(n) ครั้งก่อนเหลือตัวเดียว เช่น n = 1,000,000 ใช้แค่ประมาณ 20 ก้าว เทียบกับการ iterate (ไล่วน) ทีละตัว O(n) ที่ต้องดูถึงล้านครั้ง นี่คือความต่างระหว่าง O(log n) กับ O(n)" },
              { t: "code", lang: "python", c: `def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1        # ขอบเขตซ้าย-ขวาของช่วงที่ยังต้องค้น
    while lo <= hi:
        mid = (lo + hi) // 2         # จุดกึ่งกลาง
        if nums[mid] == target:
            return mid               # เจอแล้ว
        elif nums[mid] < target:
            lo = mid + 1             # target อยู่ครึ่งขวา ตัดครึ่งซ้ายทิ้ง
        else:
            hi = mid - 1             # target อยู่ครึ่งซ้าย ตัดครึ่งขวาทิ้ง
    return -1                        # ไม่เจอ

print(binary_search([1, 3, 5, 7, 9, 11], 7))  # 3
print(binary_search([1, 3, 5, 7, 9, 11], 4))  # -1` },
              { t: "callout", title: "จุดพลาดที่พบบ่อยของ template นี้", c: "ใช้ mid = (lo + hi) // 2 และเงื่อนไข while lo <= hi (มีเท่ากับ) การขยับ lo = mid + 1 หรือ hi = mid - 1 ต้อง +1/-1 เสมอ ไม่งั้นจะ infinite loop (วนไม่รู้จบ) เมื่อเหลือช่วงแค่ตัวเดียว" },

              { t: "h2", c: "เทคนิคขั้นสูง: Binary Search on Answer" },
              { t: "p", c: "นี่คือแนวคิดที่ทำให้ binary search ทรงพลังกว่าที่คิดมาก แทนที่จะ search ค่า ใน array ที่ sorted ไว้ เรากลับ search คำตอบ ใน answer space (ช่วงของคำตอบที่เป็นไปได้ทั้งหมด) หลักการคือ ถ้าเรา guess คำตอบเป็นตัวเลข x แล้วมี function (ฟังก์ชัน) check ได้ว่า x นี้ feasible (ใช้ได้) ไหม และคำตอบมีลักษณะ monotonic (ยิ่งมากยิ่งง่าย หรือยิ่งน้อยยิ่งง่าย) แบบขั้นบันได เราก็ binary search หา boundary (จุดพลิก) ได้เลย" },
              { t: "p", c: "ตัวอย่างที่ชัดคือ LC875 (Koko Eating Bananas / โกโกะกินกล้วย) ที่จะเจอเป็นข้อสุดท้าย speed (ความเร็ว) กินยิ่งมาก ยิ่งกินทันแน่ ๆ speed ยิ่งน้อยยิ่งเสี่ยงไม่ทัน เงื่อนไข กินทันไหม จึงเป็นขั้นบันได true-false ที่เรียงตัว เราจึง binary search บนช่วง speed 1 ถึง max เพื่อหา speed น้อยสุดที่ยัง feasible" },
              { t: "code", lang: "python", c: `# template ของ binary search on answer (หาค่าน้อยสุดที่ feasible)
def search_on_answer(lo, hi, feasible):
    while lo < hi:
        mid = (lo + hi) // 2
        if feasible(mid):
            hi = mid          # mid ใช้ได้ ลองหาค่าที่น้อยกว่านี้ต่อ (เก็บ mid ไว้)
        else:
            lo = mid + 1      # mid ใช้ไม่ได้ ต้องมากขึ้น
    return lo                 # จุดพลิกจาก ใช้ไม่ได้ -> ใช้ได้` },

              { t: "callout", title: "หมวดนี้มี 4 ข้อ", c: "ถ้าโจทย์ถามหา minimum/maximum (ค่าน้อยที่สุด/มากที่สุด) ที่ทำให้ condition (เงื่อนไข) บางอย่างเป็นจริง และถ้าค่านั้น feasible แล้วค่าที่มากกว่า (หรือน้อยกว่า) ก็ feasible ตามด้วยเสมอ นั่นคือสัญญาณว่า binary search บน answer space ได้ พร้อมแล้วกดถัดไปเริ่มข้อแรกได้เลย" },
      ],
      en: [],
    },
  },

  "lc75-p53": {
    slug: "lc75-p53",
    title: { th: "ข้อ 53 · LC374 Guess Number Higher or Lower (ทายเลขสูงต่ำ) 🟢", en: "" },
    lead: { th: "binary search แบบตำราเป๊ะ ๆ เพียงเปลี่ยนจาก compare (เทียบ) ค่าใน array เป็นถาม API guess() ว่าควรไปซ้ายหรือขวา", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC374): กำลังเล่นเกม Guess Game ที่มีการสุ่มเลขจำนวนเต็มหนึ่งตัวไว้ล่วงหน้าในช่วง 1 ถึง n ทุกครั้งที่เดา (guess) ผิด เกมจะบอกว่าตัวเลขที่สุ่มไว้มากกว่าหรือน้อยกว่าตัวที่เดา ให้เรียกใช้ API ที่มีให้อยู่แล้วคือ int guess(int num) ซึ่ง return -1 ถ้า num ที่เดามากกว่าตัวเลขที่สุ่มไว้ (เดาสูงไป), return 1 ถ้า num น้อยกว่า (เดาต่ำไป), และ return 0 ถ้าเดาถูก ให้ return ตัวเลขที่ระบบสุ่มไว้" },
              {
                t: "example",
                c: [
                  {
                    input: "n = 10, pick = 6",
                    output: "6",
                    explain: "ทายด้วย binary search: mid = 5 ได้ guess(5) = 1 (น้อยไป), mid = 8 ได้ guess(8) = -1 (มากไป), mid = 6 ได้ guess(6) = 0 (ถูก) จึงคืน 6",
                  },
                  {
                    input: "n = 1, pick = 1",
                    output: "1",
                    explain: "ช่วงมีตัวเดียวคือ 1 guess(1) คืน 0 ทันที",
                  },
                  {
                    input: "n = 2, pick = 1",
                    output: "1",
                    explain: "mid = (1+2)//2 = 1 guess(1) คืน 0 ทันทีตั้งแต่ก้าวแรก",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "1 <= n <= 2^31 - 1",
                "1 <= pick <= n",
                "n ใหญ่ระดับสองพันล้าน → ไล่ทีละเลขไม่ได้เด็ดขาด ต้องตัดครึ่ง",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "โครงสร้างที่ใช้: binary search พื้นฐานตรง ๆ answer space (ช่วงคำตอบ) sorted อยู่แล้ว (1 ถึง n) และ guess() ทำหน้าที่เหมือนการ compare nums[mid] กับ target แค่มันบอก direction (ทิศทาง) ให้เราแทน" },
              { t: "p", c: "คิดแบบง่าย/ช้าก่อน: ถ้า guess ไล่จาก 1, 2, 3, ... จะเป็น O(n) ซึ่งช้ามากเมื่อ n ใหญ่ แต่เพราะ guess บอก direction ได้ เรา halve (ตัดครึ่ง) ช่วงที่เป็นไปได้ทุกครั้ง เหลือ O(log n)" },
              { t: "ol", c: [
                "initialize lo = 1, hi = n",
                "ระหว่าง lo <= hi: compute mid แล้วเรียก res = guess(mid)",
                "ถ้า res == 0 ทายถูก return mid",
                "ถ้า res < 0 (mid มากไป) เลขจริงอยู่ครึ่งซ้าย ตั้ง hi = mid - 1; ถ้า res > 0 (mid น้อยไป) ตั้ง lo = mid + 1",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "อย่าเผลอสลับทิศ res < 0 หมายถึงเลขที่เราทาย มากเกินไป ดังนั้นเลขจริงอยู่ทางซ้าย ต้องขยับ hi ลง ไม่ใช่ขยับ lo ขึ้น" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "จำลอง n = 10, เลขจริง = 6:" },
              { t: "table", head: ["lo", "hi", "mid", "guess(mid)", "ทำอะไรต่อ"], rows: [
                ["1", "10", "5", "1 (น้อยไป)", "lo = 6"],
                ["6", "10", "8", "-1 (มากไป)", "hi = 7"],
                ["6", "7", "6", "0 (ถูก)", "คืน 6"],
              ] },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `# LeetCode ให้ API guess() มาให้แล้ว ที่จำลองไว้ตรงนี้เพื่อให้บล็อกนี้รันได้เองทั้งก้อน
SECRET = 6

def guess(num):
    if num > SECRET:
        return -1          # ทายมากไป
    if num < SECRET:
        return 1           # ทายน้อยไป
    return 0               # ทายถูก


# กำหนดให้มี API guess(num) อยู่แล้ว:
#   guess(num) -> -1 ถ้า num มากไป, 1 ถ้า num น้อยไป, 0 ถ้าถูก

def guessNumber(n):
    lo, hi = 1, n
    while lo <= hi:
        mid = (lo + hi) // 2
        res = guess(mid)
        if res == 0:
            return mid          # ทายถูก
        elif res < 0:
            hi = mid - 1        # mid มากไป เลขจริงอยู่ครึ่งซ้าย
        else:
            lo = mid + 1        # mid น้อยไป เลขจริงอยู่ครึ่งขวา
    return -1  # ไม่ควรมาถึงตรงนี้

print(guessNumber(10))     # เลขลับคือ 6`, out: `6` },
                { t: "p", c: "โจทย์นี้คือ binary search แบบตำราเป๊ะ ๆ เพียงแต่แทนที่จะ compare กับค่าใน array เราถามผลจาก function guess ที่คอยบอก direction ค่าที่ guess return มามีสามกรณี: 0 คือถูก, negative (ลบ) คือทายมากไป (ต้องลด hi), positive (บวก) คือทายน้อยไป (ต้องเพิ่ม lo)" },
                { t: "p", c: "จุดสำคัญคืออย่าเผลอสลับทิศ res < 0 หมายถึงเลขที่เราทายมากเกินไป ดังนั้นเลขจริงอยู่ทางซ้าย ต้องขยับ hi ลง ถ้าสลับ condition สองอันนี้จะ halve ผิดข้างและหาไม่เจอ" },
                { t: "p", c: "Time O(log n) halve ช่วงทุกก้าว · Space O(1) ใช้ตัวแปรไม่กี่ตัว ไม่มีโครงสร้างเสริม" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "binary search ไม่จำเป็นต้องมี array จริง ขอแค่มีช่วงที่ sorted และมีวิธีบอก direction (compare ค่า/เรียก API/check condition) ว่าคำตอบอยู่ครึ่งไหน ก็ halve ได้แล้ว" },
      ],
      en: [],
    },
  },

  "lc75-p54": {
    slug: "lc75-p54",
    title: { th: "ข้อ 54 · LC2300 Successful Pairs of Spells and Potions (คู่คาถากับยา) 🟡", en: "" },
    lead: { th: "sort (เรียง) potions แล้วสำหรับแต่ละ spell ใช้ bisect หา boundary (จุดเริ่ม) ของ potion ที่แรงพอ แล้ว count (นับ) ส่วนที่เหลือ", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC2300): กำหนด array จำนวนเต็มบวกสองชุดคือ spells (ความแรงคาถา ยาว n) และ potions (ความแรงยา ยาว m) พร้อมจำนวนเต็ม success คู่ของคาถา i กับยา j จะสำเร็จ (successful) ก็ต่อเมื่อผลคูณ spells[i] * potions[j] มีค่ามากกว่าหรือเท่ากับ success ให้ return array pairs ความยาว n โดย pairs[i] คือจำนวนยาที่จับคู่กับคาถาตัวที่ i แล้วสำเร็จ" },
              {
                t: "example",
                c: [
                  {
                    input: "spells = [5, 1, 3], potions = [1, 2, 3, 4, 5], success = 7",
                    output: "[4, 0, 3]",
                    explain: "คาถา 5 คูณ [1,2,3,4,5] = [5,10,15,20,25] สำเร็จ 4 คู่ (ตั้งแต่ 10 ขึ้นไป) · คาถา 1 คูณได้ [1,2,3,4,5] ไม่ถึง 7 เลยสักคู่ · คาถา 3 คูณได้ [3,6,9,12,15] สำเร็จ 3 คู่",
                  },
                  {
                    input: "spells = [3, 1, 2], potions = [8, 5, 8], success = 16",
                    output: "[2, 0, 2]",
                    explain: "คาถา 3 คูณ [8,5,8] = [24,15,24] สำเร็จ 2 คู่ · คาถา 1 คูณได้ [8,5,8] ไม่ถึง 16 เลย · คาถา 2 คูณได้ [16,10,16] สำเร็จ 2 คู่",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "n == spells.length และ m == potions.length",
                "1 <= n, m <= 10^5",
                "1 <= spells[i], potions[i] <= 10^5",
                "1 <= success <= 10^10",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "โครงสร้างที่ใช้: sort (เรียง) + binary search (bisect) ถ้า sort potions ไว้ก่อน สำหรับ spell แต่ละตัว potion ที่แรงพอจะเป็น suffix (ท่อนหลัง) ที่ต่อเนื่องกันเสมอ (potion ยิ่งแรงยิ่งผ่าน) จึงหา boundary ของท่อนนั้นด้วย binary search แล้ว count จำนวนที่เหลือได้เลย" },
              { t: "p", c: "คิดแบบง่าย/ช้าก่อน: วิธี naive คือคูณ spell ทุกตัวกับ potion ทุกตัวเป็น O(n*m) ซึ่งช้าเมื่อทั้งสอง array ใหญ่ พอ sort potions แล้ว potion ที่ผ่าน threshold (เกณฑ์) จะเป็นช่วงต่อเนื่องด้านขวาสุดเสมอ เราจึงแค่หา boundary ของช่วงนั้น ลดเหลือ O((n+m) log m)" },
              { t: "ol", c: [
                "sort potions จากน้อยไปมาก",
                "สำหรับ spell s แต่ละตัว: potion ที่ทำให้สำเร็จคือ potion >= success / s",
                "compute threshold เป็น integer (จำนวนเต็ม) ปัดขึ้นด้วย need = (success + s - 1) // s เพื่อเลี่ยงปัญหา float",
                "ใช้ bisect_left(potions, need) หา index แรกที่ potion >= need แล้ว count ที่ผ่าน = m - idx",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "การหารด้วย float (ทศนิยม) success / s แล้วเจอ floating-point error (ความคลาดเคลื่อน) เลี่ยงด้วย integer ล้วน สูตร (success + s - 1) // s และถ้าไม่ sort potions ก่อนก็จะ binary search ไม่ได้เพราะช่วงจะไม่ sorted" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "จำลอง spells = [5,1,3], potions sort แล้ว = [1,2,3,4,5], success = 7:" },
              { t: "table", head: ["คาถา s", "need = ceil(7/s)", "idx (bisect_left)", "m - idx"], rows: [
                ["5", "2", "1", "4"],
                ["1", "7", "5", "0"],
                ["3", "3", "2", "3"],
              ] },
              { t: "p", c: "ผลลัพธ์ [4, 0, 3]" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `import bisect

def successful_pairs(spells, potions, success):
    potions.sort()                 # เรียงยาจากน้อยไปมาก
    m = len(potions)
    res = []
    for s in spells:
        # ต้องการ potion ที่ s * potion >= success  =>  potion >= success / s
        # หา index แรกที่ potion >= เกณฑ์ ด้วย binary search
        need = (success + s - 1) // s   # เพดานของ success / s (ปัดขึ้น)
        idx = bisect.bisect_left(potions, need)
        res.append(m - idx)             # จำนวน potion ตั้งแต่ idx จนจบ คือที่สำเร็จ
    return res

print(successful_pairs([5, 1, 3], [1, 2, 3, 4, 5], 7))  # [4, 0, 3]
print(successful_pairs([3, 1, 2], [8, 5, 8], 16))       # [2, 0, 2]`, out: `[4, 0, 3]
[2, 0, 2]` },
                { t: "p", c: "หัวใจคือการมองว่า สำหรับ spell แรง s หนึ่งตัว potion ที่ทำให้สำเร็จคือ potion ที่มากกว่าหรือเท่ากับ success / s พอเรา sort potions แล้ว potion ที่ผ่าน threshold จะเป็นช่วงต่อเนื่องด้านขวาสุดเสมอ เราจึงแค่หา boundary ของช่วงนั้นด้วย bisect_left แล้ว count ที่ผ่านก็คือ ความยาวทั้งหมด ลบ index จุดเริ่ม" },
                { t: "p", c: "จุดพลาดที่พบบ่อยคือการหารด้วย float success / s แล้วเจอปัญหา floating-point error เราเลี่ยงด้วย integer ล้วน โดย compute ceiling (เพดาน ปัดขึ้น) ด้วยสูตร (success + s - 1) // s ซึ่งให้ค่าน้อยที่สุดของ potion ที่ยังทำให้ s * potion มากกว่าหรือเท่ากับ success พอดี ปลอดภัยกว่าใช้ float มาก" },
                { t: "p", c: "Time O((n + m) log m) sort potions เป็น O(m log m) แล้ว iterate spell n ตัว แต่ละตัว binary search เป็น O(log m) · Space O(1) นอกจาก array คำตอบ (sort potions in-place/ในที่เดิม)" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "เมื่อต้อง count จำนวนที่ผ่าน threshold ใน array ให้ sort ก่อนแล้วช่วงที่ผ่านจะต่อเนื่อง ใช้ bisect หา boundary ของช่วงแทนการ count ทีละตัว และ compute threshold ปัดขึ้นด้วย integer เพื่อเลี่ยง float" },
      ],
      en: [],
    },
  },

  "lc75-p55": {
    slug: "lc75-p55",
    title: { th: "ข้อ 55 · LC162 Find Peak Element (หายอด peak) 🟡", en: "" },
    lead: { th: "binary search บน array ที่ไม่ได้ sort ดูทิศชันจาก nums[mid] เทียบ nums[mid+1] เดินไปทางที่สูงขึ้นเสมอ", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC162): peak element (สมาชิกที่เป็นยอด) คือสมาชิกที่มีค่ามากกว่า neighbor (เพื่อนบ้าน) ทั้งสองข้าง กำหนด array จำนวนเต็ม nums แบบ 0-indexed ที่ nums[i] ไม่เท่ากับ nums[i+1] เสมอ ให้หา index ของ peak element ใด ๆ แล้ว return index นั้น โดยถือว่าขอบนอกของ array ทั้งสองฝั่งมีค่าเท่ากับลบอนันต์ (nums[-1] = nums[n] = -∞) ถ้ามีหลาย peak ให้ return index ของตัวไหนก็ได้ ต้องเขียนอัลกอริทึมที่รันด้วยเวลา O(log n)" },
              {
                t: "example",
                c: [
                  {
                    input: "nums = [1, 2, 3, 1]",
                    output: "2",
                    explain: "index 2 (ค่า 3) มากกว่า neighbor ทั้งสองข้าง (2 และ 1) จึงเป็น peak",
                  },
                  {
                    input: "nums = [1, 2, 1, 3, 5, 6, 4]",
                    output: "1 หรือ 5",
                    explain: "index 1 (ค่า 2) เป็น peak เพราะมากกว่า 1 ทั้งสองข้าง และ index 5 (ค่า 6) ก็เป็น peak เช่นกัน เพราะมากกว่า 5 และ 4 — คืน index ไหนก็ถูกต้อง",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "1 <= nums.length <= 1000",
                "-2^31 <= nums[i] <= 2^31 - 1",
                "nums[i] != nums[i + 1] สำหรับทุก i (ไม่มีค่าเท่ากันติดกัน)",
                "ท้าทาย: ต้องทำให้เป็น O(log n)",
                ],
              },
              { t: "callout", title: "เงื่อนไขสำคัญ", c: "ต้องทำใน O(log n) แปลว่า iterate ทีละตัวไม่ได้ ต้องใช้ binary search ทั้งที่ array ไม่ได้ sort" },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "โครงสร้างที่ใช้: binary search แบบดูทิศชัน แม้ array ไม่ได้ sort แต่ยังใช้ binary search ได้ compare (เทียบ) nums[mid] กับ nums[mid+1] ถ้ากำลังขาขึ้น (mid น้อยกว่า mid+1) peak อยู่ทางขวาแน่ ๆ ถ้ากำลังขาลง peak อยู่ทางซ้าย (รวม mid เอง)" },
              { t: "p", c: "คิดแบบง่าย/ช้าก่อน: วิธี naive คือ iterate (วน) ทุกตัวหาจุดที่มากกว่า neighbor ทั้งสอง เป็น O(n) แต่โจทย์บังคับ O(log n) เพราะขอบนอกเป็นลบอนันต์ การเดินขึ้นเนินไปเรื่อย ๆ ต้องเจอ peak เสมอ เราจึงตัดครึ่งไปทางที่ชันขึ้นได้" },
              { t: "ol", c: [
                "initialize (ตั้งค่าเริ่มต้น) lo = 0, hi = len(nums) - 1",
                "ระหว่าง lo < hi: compute mid",
                "ถ้า nums[mid] < nums[mid+1] กำลังขาขึ้น peak อยู่ทางขวา ตั้ง lo = mid + 1 (mid ไม่ใช่ peak แน่)",
                "ไม่งั้น (ขาลงหรือเท่า) peak อยู่ทางซ้ายรวม mid เอง ตั้ง hi = mid; จบ loop lo == hi คือตำแหน่ง peak",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ใช้ while lo <= hi กับ hi = mid จะวนไม่รู้จบ ต้องใช้ while lo < hi คู่กับ hi = mid เสมอ อีกจุดคือการเข้าถึง nums[mid+1] ปลอดภัยเพราะเมื่อ lo < hi จะมี mid < hi ทำให้ mid+1 ไม่เกินขอบ array" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "จำลอง nums = [1,2,1,3,5,6,4]:" },
              { t: "table", head: ["lo", "hi", "mid", "nums[mid] vs nums[mid+1]", "ทำอะไรต่อ"], rows: [
                ["0", "6", "3", "3 < 5 (ขาขึ้น)", "lo = 4"],
                ["4", "6", "5", "6 > 4 (ขาลง)", "hi = 5"],
                ["4", "5", "4", "5 < 6 (ขาขึ้น)", "lo = 5"],
                ["5", "5", "-", "lo == hi", "คืน 5"],
              ] },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `def find_peak_element(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < nums[mid + 1]:
            # กำลังขาขึ้น ยอดต้องอยู่ทางขวา (mid ไม่ใช่ยอดแน่)
            lo = mid + 1
        else:
            # กำลังขาลงหรือเท่า ยอดอยู่ทางซ้าย รวม mid ด้วย
            hi = mid
    return lo   # lo == hi คือตำแหน่งยอด

print(find_peak_element([1, 2, 3, 1]))         # 2
print(find_peak_element([1, 2, 1, 3, 5, 6, 4]))  # 5`, out: `2
5` },
                { t: "p", c: "หลายคนแปลกใจว่าทำไม binary search ใช้กับ array ที่ไม่ได้ sort ได้ กุญแจอยู่ที่การ compare nums[mid] กับ nums[mid+1] ถ้า nums[mid] น้อยกว่า nums[mid+1] แปลว่าตรงนี้เป็น ทางขึ้น เดินขึ้นไปเรื่อย ๆ ทางขวาต้องเจอ peak สักจุด (อย่างช้าสุดคือปลายขวา เพราะขอบนอกเป็นลบอนันต์) เราจึงตัดครึ่งซ้ายทิ้ง ในทางกลับกันถ้าเป็นทางลง peak อยู่ทางซ้าย (รวม mid เองที่อาจเป็น peak) เราจึงตั้ง hi = mid ไม่ใช่ mid - 1" },
                { t: "p", c: "จุดพลาดที่พบบ่อยคือใช้ while lo <= hi กับ hi = mid ซึ่งจะวนไม่รู้จบ ต้องใช้ while lo < hi คู่กับ hi = mid เสมอ อีกจุดคือการเข้าถึง nums[mid+1] ปลอดภัยเพราะเมื่อ lo < hi จะมี mid < hi ทำให้ mid+1 ไม่เกินขอบ array เมื่อ loop จบ lo กับ hi ชนกันที่ตำแหน่ง peak พอดี" },
                { t: "p", c: "Time O(log n) ตัดครึ่งช่วงทุกก้าวตามที่โจทย์บังคับ · Space O(1) ใช้แค่ pointer (ตัวชี้) lo กับ hi" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "binary search ใช้ได้แม้ข้อมูลไม่ sort ขอแค่มี direction (ทิศทาง) ที่การันตีว่าคำตอบอยู่ครึ่งไหน (ที่นี่คือความชันขึ้น/ลง) การจับคู่ while lo < hi กับ hi = mid เป็น template มาตรฐานของการหา boundary (จุดพลิก)" },
      ],
      en: [],
    },
  },

  "lc75-p56": {
    slug: "lc75-p56",
    title: { th: "ข้อ 56 · LC875 Koko Eating Bananas (โกโกะกินกล้วย) 🟡", en: "" },
    lead: { th: "ตัวอย่างคลาสสิกของ binary search on answer — guess (เดา) speed แล้ว check ว่ากินทันไหม หา speed น้อยสุดที่ยังทัน", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC875): โกโกะมีกล้วย n กอง โดยกองที่ i มี piles[i] ลูก ยามจะกลับมาใน h ชั่วโมง โกโกะเลือกความเร็วในการกิน k (กล้วยต่อชั่วโมง) แต่ละชั่วโมงเลือกกินจากกองใดกองหนึ่งได้สูงสุด k ลูก ถ้ากองนั้นมีน้อยกว่า k ลูก โกโกะจะกินหมดกองแล้วไม่กินกองอื่นต่อในชั่วโมงนั้น ให้หาความเร็ว k ที่น้อยที่สุดที่ทำให้กินกล้วยหมดทุกกองได้ภายใน h ชั่วโมง" },
              {
                t: "example",
                c: [
                  {
                    input: "piles = [3, 6, 7, 11], h = 8",
                    output: "4",
                    explain: "ที่ความเร็ว 4 ใช้เวลา ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 ชั่วโมง พอดี h = 8 และเป็นความเร็วน้อยสุดที่ยังทัน",
                  },
                  {
                    input: "piles = [30, 11, 23, 4, 20], h = 5",
                    output: "30",
                    explain: "เหลือเวลาแค่ 5 ชั่วโมงสำหรับ 5 กอง เท่ากับกินได้กองละ 1 ชั่วโมงเท่านั้น จึงต้องเร็วพอจะกินกองใหญ่สุด (30 ลูก) ให้หมดภายในชั่วโมงเดียว",
                  },
                  {
                    input: "piles = [30, 11, 23, 4, 20], h = 6",
                    output: "23",
                    explain: "มีเวลาเพิ่มมาอีก 1 ชั่วโมง (6 ชั่วโมงสำหรับ 5 กอง) ทำให้กองใหญ่สุดใช้ 2 ชั่วโมงได้ ความเร็ว 23 จึงเพียงพอและน้อยกว่าความเร็ว 30 ในตัวอย่างก่อนหน้า",
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "1 <= piles.length <= 10^4",
                "piles.length <= h <= 10^9",
                "1 <= piles[i] <= 10^9",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "โครงสร้างที่ใช้: binary search on answer (ค้นบนช่วงคำตอบ) เราไม่ได้ search (ค้นหา) ใน array แต่ค้นบน answer space (ช่วงคำตอบ) คือ speed k ที่เป็นไปได้ speed k ยิ่งมากยิ่งกินทันแน่ ๆ (monotonic เท็จ-จริง แบบขั้นบันได) จึง binary search หา speed น้อยสุดที่ทัน" },
              { t: "p", c: "คิดแบบง่าย/ช้าก่อน: วิธี naive คือ iterate (วน) ลอง k = 1, 2, 3, ... จนกว่าจะทัน เป็น O(max(piles) * n) เพราะความสัมพันธ์เป็นขั้นบันได (ถ้า k ทันแล้ว k ที่มากกว่าก็ทัน) เราจึง binary search หา boundary (จุดพลิก) จากไม่ทันเป็นทัน เหลือ O(n log(max))" },
              { t: "ol", c: [
                "เขียน function (ฟังก์ชัน) hours_needed(k) = ผลรวมของ ceil(pile / k) ทุกกอง (ปัดขึ้นเพราะกินข้ามกองไม่ได้)",
                "ตั้ง answer space lo = 1, hi = max(piles) (เร็วสุดที่จำเป็น)",
                "ระหว่าง lo < hi: compute mid ถ้า hours_needed(mid) <= h แสดงว่า feasible (ทัน) ลองช้าลงอีก ตั้ง hi = mid",
                "ไม่งั้น mid ช้าไป กินไม่ทัน ตั้ง lo = mid + 1; จบ loop return lo คือ speed น้อยสุดที่ทัน",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", c: "ลืมปัดขึ้น (ใช้หารปกติจะได้เวลาน้อยกว่าจริงเพราะเศษกล้วยก็ยังต้องใช้อีกหนึ่งชั่วโมง) หรือใช้ while lo <= hi กับ hi = mid ทำให้วนไม่จบ ต้องใช้ while lo < hi คู่กับ hi = mid" },

              { t: "h2", c: "ไล่ทีละสเต็ป" },
              { t: "p", c: "จำลอง piles = [3,6,7,11], h = 8 ช่วง lo = 1, hi = 11:" },
              { t: "table", head: ["lo", "hi", "mid", "hours_needed(mid)", "<= 8?", "ทำอะไรต่อ"], rows: [
                ["1", "11", "6", "1+1+2+2 = 6", "ทัน", "hi = 6"],
                ["1", "6", "3", "1+2+3+4 = 10", "ไม่ทัน", "lo = 4"],
                ["4", "6", "5", "1+2+2+3 = 8", "ทัน", "hi = 5"],
                ["4", "5", "4", "1+2+2+3 = 8", "ทัน", "hi = 4"],
                ["4", "4", "-", "-", "-", "return 4"],
              ] },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `import math

def min_eating_speed(piles, h):
    def hours_needed(k):
        # ที่ความเร็ว k แต่ละกองใช้เวลา ceil(pile / k) ชั่วโมง
        return sum(math.ceil(pile / k) for pile in piles)

    lo, hi = 1, max(piles)     # ช่วงความเร็วที่เป็นไปได้
    while lo < hi:
        mid = (lo + hi) // 2
        if hours_needed(mid) <= h:
            hi = mid           # เร็ว mid ก็ทัน ลองช้าลงอีก (เก็บ mid ไว้)
        else:
            lo = mid + 1       # mid ช้าไป กินไม่ทัน ต้องเร็วขึ้น
    return lo                  # ความเร็วน้อยสุดที่ยังทัน

print(min_eating_speed([3, 6, 7, 11], 8))        # 4
print(min_eating_speed([30, 11, 23, 4, 20], 5))  # 30`, out: `4
30` },
                { t: "p", c: "แทนที่จะ search ใน array เราค้นบน answer space คือ speed k ที่เป็นไปได้ตั้งแต่ 1 (ช้าสุดที่มีความหมาย) ถึง max(piles) (เร็วสุดที่จำเป็น เพราะเร็วกว่านี้ก็กินกองใหญ่สุดได้ในชั่วโมงเดียวอยู่แล้ว) กุญแจคือความสัมพันธ์แบบ monotonic (ขั้นบันได): ยิ่ง k มากยิ่งใช้เวลาน้อย ดังนั้นถ้า k ตัวหนึ่ง feasible (กินทัน เวลา <= h) แล้ว k ที่มากกว่าก็ทันด้วยเสมอ เราจึง binary search หา boundary จาก ไม่ทัน เป็น ทัน ตัวแรก" },
                { t: "p", c: "function hours_needed compute (คำนวณ) เวลาที่ต้องใช้ที่ speed k โดยแต่ละกองใช้ ceil(pile / k) ชั่วโมง (ต้องปัดขึ้นเพราะเศษกล้วยก็ยังต้องใช้อีกหนึ่งชั่วโมง และกินข้ามกองไม่ได้) เมื่อ mid ทำเวลาได้ <= h เราเก็บ mid ไว้แล้วลองหาที่ช้ากว่า (hi = mid) ถ้าไม่ทันก็ต้องเร็วขึ้น (lo = mid + 1) ถ้าลืมปัดขึ้นจะได้เวลาน้อยกว่าจริงและตอบ speed ผิดต่ำเกินไป" },
                { t: "p", c: "Time O(n log(max(piles))) binary search ราว log(max) รอบ แต่ละรอบเรียก hours_needed ที่ iterate ทุกกอง O(n) · Space O(1) ไม่มีโครงสร้างเสริม" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "ถ้าโจทย์ถามหา minimum/maximum (ค่าน้อยสุด/มากสุด) ที่ยังทำ condition (เงื่อนไข) ได้ และเงื่อนไขมีลักษณะ monotonic (ขั้นบันได พอผ่านแล้วผ่านตลอด) ให้ binary search บน answer space โดยเขียน function feasible() check แต่ละค่าที่ guess นี่คือหัวใจของ binary search on answer" },
      ],
      en: [],
    },
  },
};
