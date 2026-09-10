import type { Page } from "@/lib/types";

export const chapter08Pages: Record<string, Page> = {
  "dsa-ch8-intro": {
    slug: "dsa-ch8-intro",
    title: {
      th: "Backtracking: เทคนิคค้นหาย้อนรอย",
      en: "Backtracking: State-Space Trees & Pruning",
    },
    lead: {
      th: "แนวคิดการค้นหาคำตอบอย่างเป็นระบบ: ลองเดินไปข้างหน้า หากพบทางตันให้ถอยหลังกลับมาหนึ่งก้าวแล้วลองเส้นทางใหม่",
      en: "Master exhaustive exploration with state-space trees: choose, explore, and unchoose.",
    },
    group: "บทที่ 9: การค้นหาย้อนรอย (Backtracking)",
    blocks: {
      th: [
        {
          t: "p",
          c: "**Backtracking (การค้นหาย้อนรอย)** คืออัลกอริทึมที่ใช้ค้นหาทุกคำตอบที่เป็นไปได้ของปัญหาเชิงการจัดหมู่ (Combinatorial Problems) โดยสร้างคำตอบทีละขั้นแบบต้นไม้สถานะ (**State-Space Tree**) หากเดินไปถึงจุดที่ละเมิดเงื่อนไข อัลกอริทึมจะ 'ตัดกิ่ง' (**Pruning**) แล้วถอยหลังกลับมายังจุดก่อนหน้าเพื่อลองทางเลือกอื่น",
        },
        { t: "h2", c: "แม่แบบ 3 สเต็ปของ Backtracking (The Template)" },
        {
          t: "code",
          lang: "python",
          label: "Python: Backtracking Core Template",
          c: `def backtrack(candidate, state):
    # 1. เงื่อนไขได้คำตอบที่สมบูรณ์แล้ว
    if is_solution(candidate):
        output.append(list(candidate))
        return

    for choice in get_available_choices(state):
        if is_valid(choice):
            # [CHOOSE]: ตัดสินใจเลือกทางเลือกนี้
            candidate.append(choice)
            
            # [EXPLORE]: เดินหน้าต่อด้วย Recursion
            backtrack(candidate, update_state(state, choice))
            
            # [UNCHOOSE / BACKTRACK]: ถอยหลังกลับเพื่อคืนสภาพเดิม
            candidate.pop()`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch8-backtrack": {
    slug: "dsa-ch8-backtrack",
    title: {
      th: "Backtracking Patterns: Subsets & Permutations",
      en: "Backtracking Patterns: Subsets, Combinations & Permutations",
    },
    lead: {
      th: "แม่แบบการแก้โจทย์ 3 รูปแบบหลักที่พบบ่อยที่สุด: หาสับเซตทั้งหมด, จัดหมู่ (Combinations), และเรียงสับเปลี่ยน (Permutations)",
      en: "The holy trinity of backtracking: Subsets (LeetCode 78), Combinations, and Permutations (LeetCode 46).",
    },
    group: "บทที่ 9: การค้นหาย้อนรอย (Backtracking)",
    blocks: {
      th: [
        { t: "h2", c: "1. การหาสับเซตทั้งหมด (Subsets - LeetCode 78)" },
        {
          t: "p",
          c: "โจทย์ให้เซตของตัวเลขมา จงหาเซตย่อย (Subsets / Power Set) ทั้งหมดที่เป็นไปได้ (มีทั้งหมด 2ⁿ สับเซต):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Subsets (O(2ⁿ * n))",
          c: `def subsets(nums: list[int]) -> list[list[int]]:
    result = []
    
    def backtrack(start: int, current_subset: list[int]):
        # ทุกจุดในต้นไม้คือ subset ที่ถูกต้อง 1 แบบ
        result.append(list(current_subset))
        
        for i in range(start, len(nums)):
            current_subset.append(nums[i])   # Choose
            backtrack(i + 1, current_subset) # Explore (เริ่มจากตัวถัดไป)
            current_subset.pop()             # Unchoose
            
    backtrack(0, [])
    return result

print(subsets([1, 2, 3]))
# [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]`,
        },
        { t: "h2", c: "2. การเรียงสับเปลี่ยนทั้งหมด (Permutations - LeetCode 46)" },
        {
          t: "p",
          c: "โจทย์ให้ตัวเลขมา จงหาการเรียงสลับทุกแบบที่เป็นไปได้ (มีทั้งหมด n! แบบ):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Permutations (O(n! * n))",
          c: `def permute(nums: list[int]) -> list[list[int]]:
    result = []
    
    def backtrack(current: list[int], used: list[bool]):
        if len(current) == len(nums):
            result.append(list(current))
            return
            
        for i in range(len(nums)):
            if used[i]:
                continue
            used[i] = True
            current.append(nums[i])
            backtrack(current, used)
            current.pop()
            used[i] = False
            
    backtrack([], [False] * len(nums))
    return result

print(permute([1, 2]))  # [[1, 2], [2, 1]]`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch8-np-problem": {
    slug: "dsa-ch8-np-problem",
    title: {
      th: "NP Problems & Exhaustive Search",
      en: "NP Problems, Hardness & Exhaustive Search",
    },
    lead: {
      th: "ทำความเข้าใจปัญหาตระกูล P vs NP, ปัญหาเดินขายของ (TSP) และโจทย์คลาสสิก N-Queens",
      en: "Introduction to complexity classes P vs NP, traveling salesperson problems, and N-Queens.",
    },
    group: "บทที่ 9: การค้นหาย้อนรอย (Backtracking)",
    blocks: {
      th: [
        { t: "h2", c: "P vs NP ในมุมมองที่เข้าใจง่าย" },
        {
          t: "ul",
          c: [
            "**P (Polynomial Time)**: ปัญหาที่คอมพิวเตอร์สามารถหาคำตอบได้เร็วในเวลาพหุนาม เช่น การเรียงข้อมูล O(n log n) หรือ Binary Search O(log n)",
            "**NP (Nondeterministic Polynomial)**: ปัญหาที่ไม่รู้วิธีหาคำตอบเร็วๆ แต่ **ถ้ามีคนให้คำตอบมา เราสามารถตรวจสอบความถูกต้องได้เร็วในเวลาพหุนาม** เช่น ซูโดกุ",
            "**NP-Complete / NP-Hard**: กลุ่มปัญหาที่ยากที่สุดใน NP ปัจจุบันยังไม่มีใครค้นพบอัลกอริทึมพหุนามที่แก้ได้ จึงต้องพึ่งพา **Exhaustive Search / Backtracking** หรือการประมาณค่า (Approximation)",
          ],
        },
        { t: "h2", c: "โจทย์ระดับตำนาน: N-Queens Problem (LeetCode 51)" },
        {
          t: "p",
          c: "วางเบี้ยควีน N ตัวบนกระดานขนาด N x N โดยไม่ให้มีควีนคู่ใดกินกันได้ (ห้ามอยู่แถวเดียวกัน, คอลัมน์เดียวกัน, หรือแนวทแยงเดียวกัน):",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: N-Queens Solution with Set Pruning",
          c: `def solve_n_queens(n: int) -> list[list[str]]:
    cols = set()
    pos_diag = set() # (r + c)
    neg_diag = set() # (r - c)
    result = []
    board = [["."] * n for _ in range(n)]

    def backtrack(r):
        if r == n:
            result.append(["".join(row) for row in board])
            return

        for c in range(n):
            if c in cols or (r + c) in pos_diag or (r - c) in neg_diag:
                continue

            cols.add(c)
            pos_diag.add(r + c)
            neg_diag.add(r - c)
            board[r][c] = "Q"

            backtrack(r + 1)

            cols.remove(c)
            pos_diag.remove(r + c)
            neg_diag.remove(r - c)
            board[r][c] = "."

    backtrack(0)
    return result

print(f"วิธีวางควีนบนกระดาน 4x4 มี {len(solve_n_queens(4))} วิธี")  # 2 วิธี`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch8-leetcode": {
    slug: "dsa-ch8-leetcode",
    title: {
      th: "Backtracking LeetCode: แก้โจทย์จริงทีละสเต็ป",
      en: "Backtracking in LeetCode: Pruning & Practical Solutions",
    },
    lead: {
      th: "เทคนิคการตัดกิ่ง (Pruning) เพื่อประหยัดเวลา และการแก้โจทย์ Combination Sum (LeetCode 39)",
      en: "Advanced pruning techniques and worked interview problems like Combination Sum.",
    },
    group: "บทที่ 9: การค้นหาย้อนรอย (Backtracking)",
    blocks: {
      th: [
        { t: "h2", c: "Combination Sum (LeetCode 39)" },
        {
          t: "p",
          c: "หาผลรวมของตัวเลขที่บวกกันได้เท่ากับ `target` โดยตัวเลขตัวเดิมสามารถหยิบซ้ำได้ไม่จำกัดจำนวนครั้ง:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Combination Sum with Pruning",
          c: `def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    result = []
    candidates.sort() # เรียงข้อมูลก่อนเพื่อให้ตัดกิ่งได้ง่าย
    
    def backtrack(start: int, current: list[int], remain: int):
        if remain == 0:
            result.append(list(current))
            return
            
        for i in range(start, len(candidates)):
            # Pruning: ถ้าตัวเลขปัจจุบันเกิน remain ตัวถัดไปก็ต้องเกินแน่ๆ เพราะเรียงแล้ว
            if candidates[i] > remain:
                break
                
            current.append(candidates[i])
            # ส่ง i เดิมเข้าไปเพราะสามารถหยิบตัวซ้ำได้
            backtrack(i, current, remain - candidates[i])
            current.pop()
            
    backtrack(0, [], target)
    return result

print(combination_sum([2, 3, 6, 7], 7))  # [[2, 2, 3], [7]]`,
        },
      ],
      en: [],
    },
  },
};
