import type { Page } from "@/lib/types";

export const backtrackingPages: Record<string, Page> = {
  "lc75-intro-backtracking": {
    slug: "lc75-intro-backtracking",
    title: {
      th: "Backtracking — พื้นฐาน & แนวคิด",
      en: "Backtracking — Fundamentals & Mental Models",
    },
    lead: {
      th: "เทคนิคสำรวจทุกทางเลือกอย่างเป็นระบบ: ลองเดินไปทีละก้าว (Choose) ลุยต่อ (Explore) และถอยกลับ (Unchoose / Undo) เพื่อลองเส้นทางใหม่",
      en: "Systematic state-space search: choose an option, explore deeper recursively, and undo (unchoose) to explore alternatives.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "Backtracking (การย้อนรอย) คือท่ามาตรฐานสำหรับโจทย์ที่ต้องการ 'สร้างคำตอบทุกรูปแบบที่เป็นไปได้' (All Combinations / Permutations / Subsets) โดยในแต่ละก้าว เรามีทางเลือกหลายทาง เราจะลองก้าวไปทางหนึ่ง ถ้าพบทางตันหรือสำรวจจนจบเส้นทางแล้ว เราจะ 'ถอยหลังกลับมา 1 ก้าว' เพื่อคืนสถานะเดิมแล้วลองก้าวไปอีกทางหนึ่ง",
        },
        {
          t: "h2",
          c: "ส่วนที่ 1 · ภาพในหัว: เขาวงกตและ Recursion Tree",
        },
        {
          t: "p",
          c: "จินตนาการว่าคุณกำลังเดินอยู่ในเขาวงกตที่มีทางแยกหลายแพร่ง: ทุกครั้งที่เจอทางแยก คุณเลือกเดินเข้าแยกซ้ายก่อน ถ้าเดินไปจนสุดทางแล้วไม่เจอทางออก คุณจะ 'เดินถอยหลังกลับมาที่ทางแยกเดิม' เพื่อเลี้ยวเข้าแยกขวาแทน",
        },
        {
          t: "image",
          src: "/leetcode-75/backtracking.gif",
          alt: "Backtracking: choose, explore, undo while building subsets",
          caption: "Backtracking: choose → explore → undo (pop) — ขยาย path แล้วหดกลับเพื่อลองกิ่งอื่น",
        },

        {
          t: "h2",
          c: "ส่วนที่ 2 · กฎเหล็ก 3 จังหวะ: Choose → Explore → Unchoose",
        },
        {
          t: "p",
          c: "หัวใจของ Backtracking ทั่วทั้งจักรวาลคอมพิวเตอร์ ย่อเหลือโค้ด 3 จังหวะนี้เท่านั้น:",
        },
        {
          t: "code",
          lang: "python",
          label: "Universal Backtracking Template",
          c: `def backtrack(path, choices):
    # 1. Base Case: ถ้าประกอบคำตอบเสร็จสมบูรณ์แล้ว
    if is_complete(path):
        result.append(path[:])  # ต้องเก็บสำเนา (Copy) ห้ามเก็บตัวจริง!
        return

    # 2. ลองทุกทางเลือกในระดับนี้
    for choice in choices:
        path.append(choice)      # จังหวะที่ 1: Choose (เลือกชิ้นนี้)
        backtrack(path, ...)     # จังหวะที่ 2: Explore (ดำดิ่งลงไปลึกขึ้น)
        path.pop()               # จังหวะที่ 3: Unchoose (ดึงออก คืนสถานะเดิม)`,
        },
        {
          t: "callout",
          title: "ทำไมต้อง Unchoose (path.pop())?",
          warn: true,
          c: "เพราะเราใช้ตัวแปร `path` ก้อนเดียวกันตลอดทั้งการทำงาน หากเราใส่ตัวเลือกลงไปแล้วไม่ดึงออก เมื่อฟังก์ชันถอยกลับมาทำกิ่งถัดไป ข้อมูลเก่าจะค้างอยู่ใน path ทำให้คำตอบเละเทะและผิดพลาดทันที!",
        },
      ],
      en: [
        {
          t: "p",
          c: "Backtracking is an algorithmic paradigm for finding all (or some) solutions to computational problems that incrementally builds candidates to the solutions, and abandons a candidate ('backtracks') as soon as it determines that the candidate cannot possibly lead to a valid solution.",
        },
        {
          t: "h2",
          c: "Part 1 · The 3-Step Pattern",
        },
        {
          t: "ul",
          c: [
            "**Choose:** Select an available choice and append it to the current path.",
            "**Explore:** Recursively descend to solve the next subproblem.",
            "**Unchoose (Undo):** Backtrack by removing the choice from the path to restore state for sibling branches.",
          ],
        },
      ],
    },
  },

  "lc75-p57": {
    slug: "lc75-p57",
    title: {
      th: "ข้อ 57 · LC17 Letter Combinations of a Phone Number (ตัวอักษรจากเบอร์โทร) 🟡",
      en: "LC17 Letter Combinations of a Phone Number 🟡",
    },
    lead: {
      th: "แปลงปุ่มกดตัวเลขโทรศัพท์เป็นตัวอักษรทุกรูปแบบที่เป็นไปได้ ด้วย Backtracking ทีละหลัก",
      en: "Generate all possible letter combinations from telephone keypad digits using recursive backtracking.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `Given a string containing digits from \`2-9\` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

• 2: "abc", 3: "def", 4: "ghi", 5: "jkl", 6: "mno", 7: "pqrs", 8: "tuv", 9: "wxyz"`,
        },
        {
          t: "p",
          c: `กำหนดข้อความตัวเลข \`digits\` ที่ประกอบด้วยตัวเลขตั้งแต่ \`2\` ถึง \`9\` มาให้ จงส่งคืนชุดตัวอักษรทั้งหมดที่เป็นไปได้ที่ตัวเลขเหล่านี้สามารถแทนค่าได้ (ส่งคืนในลำดับใดก็ได้)

การจับคู่ปุ่มตัวเลขกับตัวอักษรเป็นไปตามแป้นโทรศัพท์มือถือมาตรฐาน:
• 2: "abc", 3: "def", 4: "ghi", 5: "jkl", 6: "mno", 7: "pqrs", 8: "tuv", 9: "wxyz" (เลข 1 ไม่มีตัวอักษร)`,
        },
        {
          t: "example",
          c: [
            {
              input: 'digits = "23"',
              output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
              explain: "เลข 2 มี 'abc' และเลข 3 มี 'def' จับคู่กันได้ 3 x 3 = 9 รูปแบบ",
            },
            {
              input: 'digits = ""',
              output: "[]",
              explain: "ไม่มีตัวเลขกดเข้ามา ส่งคืนลิสต์ว่าง",
            },
            {
              input: 'digits = "2"',
              output: '["a","b","c"]',
              explain: "มีหลักเดียว ได้ 3 ตัวอักษร",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "0 <= digits.length <= 4",
            "digits[i] เป็นตัวเลขในช่วง ['2', '9']",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "ถ้าความยาวของ digits ไม่คงที่ (อาจเป็น 1, 2, 3 หรือ 4 หลัก) เราจะเขียน for loop ซ้อนกันตรงๆ ไม่ได้! เราจะใช้ Recursion แทนลูปซ้อนได้อย่างไร?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "โจทย์ให้ตัวเลขมา เช่น \"23\" เราต้องหาผลคูณคาร์ทีเซียน (Cartesian Product) ของตัวอักษรบนปุ่มเหล่านั้นทั้งหมด โดยสร้างคำที่มีความยาวเท่ากับจำนวนหลักของ digits พอดี",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "สำหรับ digits = \"23\":",
            },
            {
              t: "ul",
              c: [
                "หลักแรก (index 0, เลข 2): ตัวเลือกคือ 'a', 'b', 'c'",
                "ลองเลือก 'a' ก่อน -> ขยับไปหลักที่สอง (index 1, เลข 3 มี 'd', 'e', 'f')",
                "  • เลือก 'd' -> ครบ 2 หลักแล้ว! บันทึก \"ad\"",
                "  • ถอยกลับมา unchoose 'd' แล้วลอง 'e' -> บันทึก \"ae\"",
                "  • ถอยกลับมา unchoose 'e' แล้วลอง 'f' -> บันทึก \"af\"",
                "ถอยกลับมาที่หลักแรก unchoose 'a' แล้วเปลี่ยนเป็น 'b' ทำซ้ำได้ \"bd\", \"be\", \"bf\"...",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: ใช้ Backtracking โดยมีพารามิเตอร์ `idx` บอกว่ากำลังเลือกตัวอักษรให้ตัวเลขหลักที่เท่าไร",
            },
            {
              t: "p",
              c: "ขั้นตอนตรรกะ:",
            },
            {
              t: "ol",
              c: [
                "ดัก Edge Case: ถ้า `not digits` ให้ `return []` ทันที",
                "เตรียม Dictionary เก็บตัวอักษรของแต่ละปุ่ม: `{'2': 'abc', '3': 'def', ...}`",
                "ฟังก์ชัน `backtrack(idx, path)`:",
                "  • ถ้า `idx == len(digits)`: ประกอบตัวอักษรเสร็จสมบูรณ์ -> `res.append(''.join(path))` แล้ว return",
                "  • ดึงตัวอักษรของปุ่ม `digits[idx]`",
                "  • สำหรับแต่ละตัวอักษร: `path.append(ch)` -> `backtrack(idx + 1, path)` -> `path.pop()`",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น / จำลองการทำงาน" },
            {
              t: "table",
              head: ["ความลึก (idx)", "หลักเลข", "ตัวอักษรที่ลอง", "path ปัจจุบัน", "ผลลัพธ์ที่บันทึก"],
              rows: [
                ["0", "2", "a", "['a']", "—"],
                ["1", "3", "d", "['a', 'd']", "ครบ 2 ตัว -> บันทึก 'ad'"],
                ["1", "3", "e", "['a', 'e']", "ครบ 2 ตัว -> บันทึก 'ae'"],
                ["1", "3", "f", "['a', 'f']", "ครบ 2 ตัว -> บันทึก 'af'"],
                ["0", "2", "b", "['b']", "— (วนทำ 'bd', 'be', 'bf')"],
                ["0", "2", "c", "['c']", "— (วนทำ 'cd', 'ce', 'cf')"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []

        phone_map = {
            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
        }

        res = []
        path = []

        def backtrack(idx: int):
            # Base Case: เมื่อเลือกตัวอักษรครบทุกหลักแล้ว
            if idx == len(digits):
                res.append("".join(path))
                return

            # ดึงตัวอักษรทั้งหมดของปุ่มปัจจุบัน
            letters = phone_map[digits[idx]]
            for ch in letters:
                path.append(ch)       # 1. Choose
                backtrack(idx + 1)    # 2. Explore
                path.pop()            # 3. Unchoose

        backtrack(0)
        return res`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["if not digits: return []", "ดักสตริงว่าง เพื่อไม่ให้ตอบ ['']", "digits='' -> []"],
                ["phone_map = { ... }", "ตารางจับคู่ปุ่มกดกับตัวอักษร", "'2' -> 'abc'"],
                ["if idx == len(digits): res.append(''.join(path))", "เมื่อเลือกครบทุกหลัก บันทึกคำตอบ", "['a', 'd'] -> 'ad'"],
                ["path.append(ch); backtrack(idx + 1); path.pop()", "Choose -> Explore -> Unchoose", "ใส่ a -> ลุยต่อ -> เอา a ออก"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(4^N * N)", "แต่ละหลักแตกกิ่งได้มากสุด 4 ทาง คำตอบทั้งหมดมีสูงสุด 4^N ชุด และแต่ละชุดใช้เวลาต่อสตริง O(N)"],
                ["Space (หน่วยความจำ)", "O(N)", "Recursion Call Stack ลึกสุดเท่ากับจำนวนหลัก N (ไม่เกิน 4 ชั้น)"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Return all possible letter combinations that the number string \`digits\` (digits 2-9) could represent.`,
        },
        {
          t: "example",
          c: [
            {
              input: 'digits = "23"',
              output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
              explain: "All pairings between 'abc' and 'def'.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "0 <= digits.length <= 4",
            "digits[i] is a digit in the range ['2', '9'].",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Compute the Cartesian product of characters mapped to phone dial pad digits.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "At index 0 (digit '2'): choices are 'a', 'b', 'c'. For 'a', explore index 1 (digit '3'): 'd', 'e', 'f'. Forms 'ad', 'ae', 'af'.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Depth-first backtracking: `backtrack(idx)` iterates mapped letters, appends, recurses to `idx + 1`, and pops.",
            },

            { t: "h3", c: "Step 4 · Simulation Table" },
            {
              t: "table",
              head: ["Index", "Digit", "Letter", "Current Path", "Result"],
              rows: [
                ["0", "2", "a", "['a']", "—"],
                ["1", "3", "d", "['a', 'd']", "append 'ad'"],
                ["1", "3", "e", "['a', 'e']", "append 'ae'"],
                ["1", "3", "f", "['a', 'f']", "append 'af'"],
              ],
            },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []

        phone_map = {
            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
        }

        res = []
        path = []

        def backtrack(idx: int):
            if idx == len(digits):
                res.append("".join(path))
                return

            for ch in phone_map[digits[idx]]:
                path.append(ch)
                backtrack(idx + 1)
                path.pop()

        backtrack(0)
        return res`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["if not digits: return []", "Guard empty string input", "digits='' -> []"],
                ["if idx == len(digits):", "Base case when all digits mapped", "joins path into string"],
                ["path.append(ch); backtrack(idx + 1); path.pop()", "Choose -> Explore -> Unchoose", "reusable path array"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(4^N * N)", "At most 4 choices per digit, string copy costs O(N)."],
                ["Space", "O(N)", "Recursion call stack depth is at most N <= 4."],
              ],
            },
          ],
        },
      ],
    },
  },

  "lc75-p58": {
    slug: "lc75-p58",
    title: {
      th: "ข้อ 58 · LC216 Combination Sum III (ผลรวมชุดค่า III) 🟡",
      en: "LC216 Combination Sum III 🟡",
    },
    lead: {
      th: "หาทุกชุดตัวเลข k ตัวจาก 1-9 ที่ไม่ซ้ำและบวกกันได้ n พอดี — ใช้ Backtracking พร้อมตัดกิ่ง (Pruning)",
      en: "Find all valid combinations of k unique numbers from 1 to 9 summing to n, using backtracking with pruning.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: `Find all valid combinations of \`k\` numbers that sum up to \`n\` such that the following conditions are true:
• Only numbers \`1\` through \`9\` are used.
• Each number is used at most once.

Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.`,
        },
        {
          t: "p",
          c: `จงหาชุดตัวเลขที่เป็นไปได้ทั้งหมดที่มีจำนวน \`k\` ตัว และบวกกันได้เท่ากับ \`n\` ภายใต้เงื่อนไข:
• ใช้ได้เฉพาะตัวเลข \`1\` ถึง \`9\` เท่านั้น
• แต่ละตัวเลขใช้ได้ไม่เกิน 1 ครั้งในแต่ละชุด

ส่งคืน list ของชุดคำตอบทั้งหมด (ห้ามมีชุดตัวเลขที่ซ้ำกัน โดยลำดับของคำตอบไม่สำคัญ)`,
        },
        {
          t: "example",
          c: [
            {
              input: "k = 3, n = 7",
              output: "[[1,2,4]]",
              explain: "1 + 2 + 4 = 7 มีเพียงชุดเดียวที่ใช้ได้",
            },
            {
              input: "k = 3, n = 9",
              output: "[[1,2,6],[1,3,5],[2,3,4]]",
              explain: "ทุกชุดมี 3 ตัวเลข และบวกกันได้ 9 พอดี",
            },
            {
              input: "k = 4, n = 1",
              output: "[]",
              explain: "เลข 4 ตัวไม่ซ้ำที่น้อยที่สุดคือ 1+2+3+4 = 10 ซึ่งมากกว่า 1 อยู่แล้ว จึงเป็นไปไม่ได้",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "2 <= k <= 9",
            "1 <= n <= 60",
          ],
        },
        {
          t: "callout",
          title: "⏸ ลองเองก่อน",
          c: "เราจะป้องกันไม่ให้ได้ชุดตัวเลขซ้ำ (เช่น [1, 2, 4] กับ [4, 2, 1]) ได้อย่างไรโดยไม่ต้องใช้ set มาคัดกรองตอนท้าย?",
        },

        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            { t: "h3", c: "ขั้นที่ 1 · โจทย์นี้ขออะไร" },
            {
              t: "p",
              c: "เลือกตัวเลข k ตัวที่ไม่ซ้ำกันจากเซ็ต {1, 2, 3, 4, 5, 6, 7, 8, 9} ให้ได้ผลรวมเท่ากับ n พอดี โดยห้ามมีชุดคำตอบที่ซ้ำกัน",
            },

            { t: "h3", c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ" },
            {
              t: "p",
              c: "เคล็ดลับกันชุดซ้ำ: **บังคับให้เลือกเลขเรียงจากน้อยไปหามากเสมอ!**",
            },
            {
              t: "ul",
              c: [
                "ถ้าเราเลือกเลขแรกเป็น 1 เลขตัวถัดไปต้องเริ่มตั้งแต่ 2 ขึ้นไป",
                "ถ้าเราเลือกเลขแรกเป็น 2 เลขตัวถัดไปต้องเริ่มตั้งแต่ 3 ขึ้นไป (ห้ามย้อนกลับไปมอง 1 อีก)",
                "การส่งพารามิเตอร์ `start` เข้าไปในแต่ละชั้น จะการันตีว่าผลลัพธ์ทุกชุดจะเรียงลำดับเสมอ เช่น [1, 2, 4] และจะไม่มีทางเกิด [4, 2, 1] เลย!",
                "เทคนิคตัดกิ่ง (Pruning): ถ้าเลขที่จะหยิบมีค่ามากกว่ายอดรวมที่เหลือ (`num > remain`) ให้หยุดลูปทันที (`break`) ไม่ต้องเสียเวลาลองเลขที่ใหญ่กว่านั้น!",
              ],
            },

            { t: "h3", c: "ขั้นที่ 3 · วิธีทำ" },
            {
              t: "p",
              c: "ภาพรวม: Backtracking ฟังก์ชัน `backtrack(start, remain)` ร่วมกับการตัดกิ่ง",
            },
            {
              t: "p",
              c: "ขั้นตอนตรรกะ:",
            },
            {
              t: "ol",
              c: [
                "ตั้ง `res = []`, `path = []`",
                "ฟังก์ชัน `backtrack(start, remain)`:",
                "  • ถ้า `len(path) == k`: เลือกครบ k ตัวแล้ว ตรวจสอบว่า `remain == 0` หรือไม่ ถ้าใช่ให้บันทึก `res.append(path[:])` แล้ว `return` ทันที",
                "  • วนลูป `num` ตั้งแต่ `start` ถึง 9:",
                "    - Pruning: ถ้า `num > remain`: แสดงว่าตัวนี้เกินแล้ว และตัวถัดๆ ไปก็จะเกินเช่นกัน -> `break`",
                "    - Choose: `path.append(num)`",
                "    - Explore: `backtrack(num + 1, remain - num)`",
                "    - Unchoose: `path.pop()`",
                "เรียกใช้งานเริ่มต้นด้วย `backtrack(1, n)`",
              ],
            },

            { t: "h3", c: "ขั้นที่ 4 · ดูทีละขั้น / จำลองการทำงาน" },
            {
              t: "table",
              head: ["path", "start", "remain", "การกระทำ", "ผลลัพธ์"],
              rows: [
                ["[]", "1", "7", "เลือก 1", "remain เหลือ 6"],
                ["[1]", "2", "6", "เลือก 2", "remain เหลือ 4"],
                ["[1, 2]", "3", "4", "เลือก 3 -> remain=1, ครบ k แต่ remain!=0", "ไม่บันทึก"],
                ["[1, 2]", "3", "4", "เลือก 4 -> remain=0, ครบ k และ remain==0!", "บันทึก [1, 2, 4]"],
                ["[1, 2]", "3", "4", "เลือก 5 -> 5 > 4 (เกิน)", "break ตัดกิ่ง"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        res = []
        path = []

        def backtrack(start: int, remain: int):
            # 1. Base Case: เลือกตัวเลขครบ k ตัวแล้ว
            if len(path) == k:
                if remain == 0:
                    res.append(path[:])  # เก็บสำเนา
                return

            # 2. ลองเลือกตัวเลขตั้งแต่ start ถึง 9
            for num in range(start, 10):
                # Pruning: ถ้าตัวเลขปัจจุบันมากกว่ายอดรวมที่เหลือ หยุดทันที
                if num > remain:
                    break

                path.append(num)                     # 1. Choose
                backtrack(num + 1, remain - num)     # 2. Explore
                path.pop()                           # 3. Unchoose

        backtrack(1, n)
        return res`,
            },

            { t: "h3", c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน" },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & ความหมาย", "ตัวอย่างค่าจริง"],
              rows: [
                ["if len(path) == k: if remain == 0: res.append(path[:])", "บันทึกเมื่อครบ k ตัวและผลรวมตรงเป๊ะ", "path=[1, 2, 4], remain=0"],
                ["for num in range(start, 10):", "คุมให้เลือกเลขจากน้อยไปมาก กันชุดซ้ำ", "start=2 -> ลอง 2, 3, 4..."],
                ["if num > remain: break", "ตัดกิ่ง ไม่ลองเลขที่เกินผลรวม", "num=5 > remain=4 -> break"],
                ["backtrack(num + 1, remain - num)", "ส่งต่อตัวถัดไป (num+1) และลดทอน remain", "num=1 -> start ถัดไปคือ 2"],
              ],
            },

            { t: "h3", c: "ขั้นที่ 7 · ต้นทุน (Complexity)" },
            {
              t: "table",
              head: ["ทรัพยากร", "Big-O", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(C(9, k) * k)", "จำนวนวิธีเลือก k ตัวจาก 9 ตัวมีเพดานคงที่ C(9, k) <= 126 รูปแบบ และการ copy path ใช้ O(k)"],
                ["Space (หน่วยความจำ)", "O(k)", "Recursion Stack ลึกสุดเท่ากับ k <= 9 ตัวแปร"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: `Find all valid combinations of \`k\` numbers from 1 to 9 that sum to \`n\`, where each number is used at most once.`,
        },
        {
          t: "example",
          c: [
            {
              input: "k = 3, n = 7",
              output: "[[1,2,4]]",
              explain: "1 + 2 + 4 = 7.",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "2 <= k <= 9",
            "1 <= n <= 60",
          ],
        },

        {
          t: "solution",
          summary: "Full Solution",
          c: [
            { t: "h3", c: "Step 1 · Problem Understanding" },
            {
              t: "p",
              c: "Choose k distinct digits from [1, 9] summing to n without duplicate sets.",
            },

            { t: "h3", c: "Step 2 · Manual Trace" },
            {
              t: "p",
              c: "Enforce strictly increasing order with `start` parameter: choosing 1 forces next digit >= 2. Prune whenever `num > remain`.",
            },

            { t: "h3", c: "Step 3 · Methodology" },
            {
              t: "p",
              c: "Backtracking with `start` pointer and `remain` balance tracking.",
            },

            { t: "h3", c: "Step 4 · Simulation Table" },
            {
              t: "table",
              head: ["Path", "Start", "Remain", "Decision"],
              rows: [
                ["[1]", "2", "6", "pick 2"],
                ["[1, 2]", "3", "4", "pick 4"],
                ["[1, 2, 4]", "5", "0", "Valid combination! Save [1, 2, 4]"],
              ],
            },

            { t: "h3", c: "Step 5 · LeetCode Python Solution" },
            {
              t: "code",
              lang: "python",
              c: `class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        res = []
        path = []

        def backtrack(start: int, remain: int):
            if len(path) == k:
                if remain == 0:
                    res.append(path[:])
                return

            for num in range(start, 10):
                if num > remain:
                    break
                path.append(num)
                backtrack(num + 1, remain - num)
                path.pop()

        backtrack(1, n)
        return res`,
            },

            { t: "h3", c: "Step 6 · Line-by-Line Code Breakdown" },
            {
              t: "table",
              head: ["Line", "Purpose", "Example"],
              rows: [
                ["if len(path) == k:", "Base case check", "path length equals k"],
                ["if num > remain: break", "Prune search tree", "stop exploring excessive numbers"],
                ["backtrack(num + 1, remain - num)", "Explore next strictly larger digit", "avoids duplicate combinations"],
              ],
            },

            { t: "h3", c: "Step 7 · Complexity" },
            {
              t: "table",
              head: ["Resource", "Big-O", "Justification"],
              rows: [
                ["Time", "O(C(9, k) * k)", "At most C(9, k) <= 126 combinations, copying takes O(k)."],
                ["Space", "O(k)", "Recursion stack depth k <= 9."],
              ],
            },
          ],
        },
      ],
    },
  },
};
