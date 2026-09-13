import type { Page } from "@/lib/types";

export const chapter09Pages: Record<string, Page> = {
  "dsa-ch9-intro": {
    slug: "dsa-ch9-intro",
    title: {
      th: "Backtracking คืออะไร: State-Space Tree & Pruning",
      en: "Backtracking Foundations: State-Space Trees & Pruning Mechanics",
    },
    lead: {
      th: "เข้าใจหัวใจของการค้นหาทุกความเป็นไปได้แบบมีชั้นเชิง: การท่องต้นไม้แห่งการตัดสินใจ (Decision Tree) และการตัดกิ่ง (Pruning) ที่ช่วยประหยัดเวลาได้นับล้านรอบ",
      en: "Master exhaustive search with pruning: navigate state-space decision trees and eliminate invalid branches early.",
    },
    group: "บทที่ 9: การค้นหาย้อนรอย (Exhaustive Search & Backtracking)",
    blocks: {
      th: [
        {
          t: "p",
          c: "**การค้นหาย้อนรอย (Backtracking)** เปรียบเสมือน 'การเดินในเขาวงกต':\n- เมื่อคุณเจอทางแยก คุณจะเลือกเดินไปทางหนึ่งก่อน (**Choose**)\n- คุณเดินลึกเข้าไปเรื่อยๆ (**Explore**)\n- หากพบว่าเป็นทางตันหรือไม่สอดคล้องกับเงื่อนไข คุณจะ **'ถอยหลังกลับมาที่ทางแยกเดิม' (Backtrack / Unchoose)** แล้วลองเลือกเดินไปอีกทางหนึ่ง",
        },
        { t: "h2", c: "Brute Force vs Backtracking: พลังแห่งการ Pruning (ตัดกิ่ง)" },
        {
          t: "p",
          c: "หากเป็น Pure Brute Force คอมพิวเตอร์จะทดลองจนสุดทางทุกกิ่งโดยไม่สนว่ากิ่งนั้นเป็นไปไม่ได้ตั้งแต่ก้าวแรก แต่ใน **Backtracking** เราจะมีเงื่อนไขการตัดกิ่ง (**Pruning / Bounding Function**) ที่ช่วยหยุดการเดินลงไปในกิ่งที่ผิดทันที:",
        },
        {
          t: "code",
          lang: "text",
          label: "การตัดกิ่งไม้ที่ไร้ประโยชน์ (Pruning State-Space Tree)",
          c: `                          [ จุดเริ่มต้น ]
                         /               \\
                 [ เลือก 1 ]            [ เลือก 2 ]
                 /         \\                 │
            [ เลือก 1,2 ] [ เลือก 1,3 ]      [ เลือก 2,3 ] (ผลรวมเกิน Target!)
                 │              │            ▲
              (สำเร็จ)      (สำเร็จ)          └── ตัดกิ่งทิ้งทันที! (Prune) 
                                                 ไม่ต้องเดินลึกต่อให้เสียเวลา`,
        },
        { t: "h2", c: "แม่แบบมาตรฐาน 4 สเต็ปของ Backtracking (The Blueprint)" },
        {
          t: "p",
          c: "โจทย์ Backtracking เกือบ 100% ในโลกสามารถเขียนด้วยโครงสร้าง 4 สเต็ปนี้ได้เสมอ:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: แม่แบบ Backtracking มาตรฐาน",
          c: `def backtrack(path, choices):
    # 1. Goal Check: ชนเป้าหมายหรือยัง?
    if is_solution(path):
        record_solution(path)
        return

    for choice in choices:
        # 2. Prune / Constraint Check: ทางเลือกนี้ถูกต้องตามกฎหรือไม่?
        if not is_valid(choice):
            continue  # ตัดกิ่งทิ้ง!

        # 3. Make Choice: เลือกลงไป
        path.append(choice)

        # 4. Explore: เดินลึกต่อไป
        backtrack(path, new_choices)

        # 5. Undo Choice (Backtrack!): ถอยหลังกลับมาคืนสภาพเดิม
        path.pop()`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch9-backtrack": {
    slug: "dsa-ch9-backtrack",
    title: {
      th: "แม่แบบ Backtracking 4 สเต็ป: Subsets, Permutations, Combination",
      en: "The 3 Backtracking Archetypes: Subsets, Permutations & Combinations",
    },
    lead: {
      th: "ฝึกฝน 3 รูปแบบมาตรฐานที่พบบ่อยที่สุดในห้องสอบสัมภาษณ์: Subsets (การเลือก/ไม่เลือก), Permutations (การสลับที่) และ Combination Sum (การใช้ซ้ำ)",
      en: "Master the 3 canonical interview archetypes: Subsets (pick/skip), Permutations (visited tracking), and Combination Sum.",
    },
    group: "บทที่ 9: การค้นหาย้อนรอย (Exhaustive Search & Backtracking)",
    blocks: {
      th: [
        { t: "h2", c: "Archetype 1: การสร้าง Subsets ทั้งหมด (LeetCode 78)" },
        {
          t: "p",
          c: "สำหรับสมาชิกแต่ละตัว เรามีทางเลือก 2 ทางเสมอ: **'เลือกเอา'** หรือ **'ไม่เลือกเอา'** ทำให้เกิด Subsets ทั้งหมด $2^N$ แบบ:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Subsets O(2ⁿ)",
          c: `def subsets(nums: list[int]) -> list[list[int]]:
    result = []
    
    def backtrack(start_idx: int, current_path: list[int]):
        # ทุกโหนดใน State-Space Tree ถือเป็น Subset ที่ถูกต้องเสมอ
        result.append(list(current_path))
        
        for i in range(start_idx, len(nums)):
            current_path.append(nums[i])      # 1. Choose
            backtrack(i + 1, current_path)   # 2. Explore (ส่ง i + 1 ป้องกันใช้ซ้ำ)
            current_path.pop()                # 3. Unchoose
            
    backtrack(0, [])
    return result

print(subsets([1, 2, 3])) # [], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]`,
        },
        { t: "h2", c: "Archetype 2: การจัดเรียงสับเปลี่ยน Permutations (LeetCode 46)" },
        {
          t: "p",
          c: "ในการหา Permutations ลำดับมีความสำคัญ เราสามารถใช้ `visited` set หรือตรวจสอบว่าตัวเลขนั้นอยู่ใน path แล้วหรือไม่:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Permutations O(n!)",
          c: `def permute(nums: list[int]) -> list[list[int]]:
    result = []
    
    def backtrack(current_path: list[int], visited: set[int]):
        if len(current_path) == len(nums):
            result.append(list(current_path))
            return
            
        for num in nums:
            if num in visited:
                continue # ข้ามตัวที่เคยใช้ไปแล้ว
                
            current_path.append(num)
            visited.add(num)
            
            backtrack(current_path, visited)
            
            # ย้อนรอยคืนสถานะ
            current_path.pop()
            visited.remove(num)
            
    backtrack([], set())
    return result

print(permute([1, 2, 3])) # [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]`,
        },
        { t: "h2", c: "Archetype 3: Combination Sum (LeetCode 39)" },
        {
          t: "p",
          c: "โจทย์ให้หาชุดตัวเลขที่บวกกันได้เท่ากับ `target` โดยสมาชิกแต่ละตัวสามารถ **หยิบซ้ำได้ไม่จำกัดครั้ง**:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Combination Sum พร้อมการ Pruning",
          c: `def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    result = []
    candidates.sort() # เรียงข้อมูลก่อนเพื่อช่วยให้ Prune ได้ง่ายขึ้น
    
    def backtrack(start_idx: int, current_path: list[int], remaining_target: int):
        if remaining_target == 0:
            result.append(list(current_path))
            return
            
        for i in range(start_idx, len(candidates)):
            # Pruning: ถ้าตัวปัจจุบันเกินเป้า ตัวถัดๆ ไปย่อมเกินแน่นอน (เพราะเรียงแล้ว)
            if candidates[i] > remaining_target:
                break
                
            current_path.append(candidates[i])
            # ส่ง i เดิมลงไป (ไม่ใช่ i + 1) เพราะอนุญาตให้ใช้ตัวเดิมซ้ำได้!
            backtrack(i, current_path, remaining_target - candidates[i])
            current_path.pop()
            
    backtrack(0, [], target)
    return result

print(combination_sum([2, 3, 6, 7], 7)) # [[2, 2, 3], [7]]`,
        },
      ],
      en: [],
    },
  },

  "dsa-ch9-np-problem": {
    slug: "dsa-ch9-np-problem",
    title: {
      th: "ปัญหาแบบ NP และ Exhaustive Search (เมื่อใดไม่มีทางลัด)",
      en: "NP-Completeness & Exhaustive Search: When No Shortcuts Exist",
    },
    lead: {
      th: "ทำความเข้าใจปัญหาตระกูล P vs NP, ปัญหา Traveling Salesperson, และทำไมการค้นหาทุกแบบ (Exhaustive Search) ถึงเป็นวิธีแก้ปัญหาเดียวที่การันตีคำตอบที่ดีที่สุด",
      en: "Understand P vs NP complexity classes, NP-Complete challenges like Traveling Salesperson, and why exhaustive search remains indispensable.",
    },
    group: "บทที่ 9: การค้นหาย้อนรอย (Exhaustive Search & Backtracking)",
    blocks: {
      th: [
        { t: "h2", c: "ปัญหาตระกูล P vs NP ในวิทยาการคอมพิวเตอร์" },
        {
          t: "p",
          c: "ในวงการคอมพิวเตอร์ ปัญหาถูกจัดกลุ่มตามความยากในการหาคำตอบ:",
        },
        {
          t: "table",
          head: ["กลุ่มปัญหา (Complexity Class)", "ความหมาย", "ตัวอย่างปัญหา"],
          rows: [
            ["**P (Polynomial Time)**", "มีอัลกอริทึมที่หาคำตอบได้เร็วใน $O(n^k)$ (เช่น $O(n)$, $O(n^2)$)", "การเรียงลำดับ (Sort), ค้นหาเส้นทางสั้นสุด (Dijkstra), หาตัวประกอบ"],
            ["**NP (Nondeterministic Polynomial)**", "หาคำตอบยากมาก แต่ถ้ามีคนเดาคำตอบมาให้ เราสามารถ **ตรวจทานคำตอบได้เร็วในเวลา Polynomial**", "Sudoku, ปัญหาการจัดกระเป๋า (Knapsack), การระบายสีแผนที่"],
            ["**NP-Complete**", "กลุ่มปัญหาที่ยากที่สุดใน NP หากใครค้นพบวิธีแก้ปัญหา NP-Complete ข้อใดข้อหนึ่งในเวลา $O(n^k)$ จะแก้ปัญหาในโลกได้ทุกข้อทันที ($P = NP$)", "Traveling Salesperson Problem (TSP), Boolean Satisfiability (SAT), Clique Problem"],
          ],
        },
        { t: "h2", c: "เมื่อไม่มีทางลัด: ทำไม Backtracking จึงจำเป็น?" },
        {
          t: "p",
          c: "สำหรับปัญหาประเภท NP-Complete หรือปัญหาจัดสรรทรัพยากรที่ซับซ้อน ปัจจุบัน **ยังไม่มีสูตรทางลัดทางคณิตศาสตร์ใดที่หาคำตอบที่สมบูรณ์แบบได้** ทางเลือกของวิศวกรจึงมีเพียง 2 ทาง:\n1. ใช้ **Heuristic / Approximation Algorithm** (หาคำตอบที่ใกล้เคียง แต่ไม่รับประกันว่าดีที่สุด)\n2. ใช้ **Backtracking with Branch & Bound** ในการค้นหาทุกกรณีอย่างเป็นระบบ เพื่อรับประกันคำตอบที่ถูกต้องที่สุด 100%",
        },
      ],
      en: [],
    },
  },

  "dsa-ch9-leetcode": {
    slug: "dsa-ch9-leetcode",
    title: {
      th: "โจทย์สัมภาษณ์ระดับบอส: N-Queens & Word Search",
      en: "Boss-Level Backtracking: N-Queens & Word Search Grid Traversals",
    },
    lead: {
      th: "พิชิตโจทย์ปราบเซียน N-Queens (LeetCode 51) ด้วยเทคนิคการเช็คแนวทแยงใน O(1) และ Word Search (LeetCode 79) บนตาราง 2 มิติ",
      en: "Master N-Queens with O(1) diagonal hash sets and 2D grid DFS backtracking in Word Search.",
    },
    group: "บทที่ 9: การค้นหาย้อนรอย (Exhaustive Search & Backtracking)",
    blocks: {
      th: [
        { t: "h2", c: "1. The Grand Boss: N-Queens (LeetCode 51)" },
        {
          t: "p",
          c: "โจทย์ให้วางราชินี (Queens) จำนวน $N$ ตัวลงบนกระดานหมากรุกขนาด $N \\times N$ โดยที่ **ไม่มีราชินีตัวใดกินกันได้** (ห้ามอยู่ในแถวเดียวกัน คอลัมน์เดียวกัน หรือแนวทแยงเดียวกัน):",
        },
        {
          t: "code",
          lang: "text",
          label: "ความลับทางเรขาคณิตของการตรวจแนวทแยงใน O(1)",
          c: `1. แถว (Rows): เราเดินทีละแถวอยู่แล้ว (r = 0, 1, ..., n-1) จึงไม่มีทางซ้ำแถวแน่นอน
2. คอลัมน์ (Cols): เก็บ set ของคอลัมน์ที่ถูกครอบครอง (cols)
3. ทแยงมุมขวาบน-ซ้ายล่าง (Positive Diagonal /): ค่าของ (r + c) จะคงที่ตลอดแนวทแยง!
4. ทแยงมุมซ้ายบน-ขวาล่าง (Negative Diagonal \\): ค่าของ (r - c) จะคงที่ตลอดแนวทแยง!`,
        },
        {
          t: "code",
          lang: "python",
          label: "Python: N-Queens พร้อมการเช็ค O(1) Diagonals",
          c: `def solve_n_queens(n: int) -> list[list[str]]:
    cols = set()
    pos_diag = set() # (r + c)
    neg_diag = set() # (r - c)
    
    board = [["."] * n for _ in range(n)]
    result = []
    
    def backtrack(r: int):
        if r == n:
            # แปลงบอร์ดเป็นข้อความ
            result.append(["".join(row) for row in board])
            return
            
        for c in range(n):
            # ตรวจสอบว่าช่องนี้ปลอดภัยหรือไม่ใน O(1)
            if c in cols or (r + c) in pos_diag or (r - c) in neg_diag:
                continue # ตัดกิ่งทิ้งทันที!
                
            # 1. Choose
            cols.add(c)
            pos_diag.add(r + c)
            neg_diag.add(r - c)
            board[r][c] = "Q"
            
            # 2. Explore แถวถัดไป
            backtrack(r + 1)
            
            # 3. Unchoose (คืนสภาพ)
            cols.remove(c)
            pos_diag.remove(r + c)
            neg_diag.remove(r - c)
            board[r][c] = "."
            
    backtrack(0)
    return result

solutions = solve_n_queens(4)
print(f"Total solutions for 4-Queens: {len(solutions)}")
for row in solutions[0]:
    print(row)`,
        },
        { t: "h2", c: "2. Word Search บนตาราง 2 มิติ (LeetCode 79)" },
        {
          t: "p",
          c: "ค้นหาคำว่าอยู่ในตารางตัวอักษร 2 มิติหรือไม่ โดยสามารถเดินใน 4 ทิศทาง (บน ล่าง ซ้าย ขวา) และห้ามเหยียบช่องเดิมซ้ำในการค้นหาคำนั้น:",
        },
        {
          t: "code",
          lang: "python",
          label: "Python: Word Search ด้วย In-Place Character Masking",
          c: `def exist(board: list[list[str]], word: str) -> bool:
    rows, cols = len(board), len(board[0])
    
    def dfs(r: int, c: int, idx: int) -> bool:
        if idx == len(word):
            return True
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[idx]:
            return False
            
        # 1. Choose: ปิดช่องเดิมด้วยเครื่องหมาย '#' เพื่อกันไม่ให้เดินซ้ำ
        temp = board[r][c]
        board[r][c] = '#'
        
        # 2. Explore: เดิน 4 ทิศทาง
        found = (dfs(r + 1, c, idx + 1) or
                 dfs(r - 1, c, idx + 1) or
                 dfs(r, c + 1, idx + 1) or
                 dfs(r, c - 1, idx + 1))
                 
        # 3. Unchoose: คืนตัวอักษรเดิมกลับมา
        board[r][c] = temp
        return found
        
    for r in range(rows):
        for c in range(cols):
            if board[r][c] == word[0] and dfs(r, c, 0):
                return True
    return False`,
        },
      ],
      en: [],
    },
  },
};
