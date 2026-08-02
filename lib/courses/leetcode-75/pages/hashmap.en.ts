import type { PageTranslation } from "@/lib/types";

/** English bodies for Hash Map problem pages only (intro stays Thai for now). */
export const hashMapEn: Record<string, PageTranslation> = {
  "lc75-p20": {
    title: "Problem 20 · LC2215 Find the Difference of Two Arrays 🟢",
    lead: "Find values present in one array but not the other using set difference.",
    blocks: [
      {
        t: "p",
        c: "Problem (LC2215): Given two 0-indexed integer arrays nums1 and nums2, return a list answer of size 2 where answer[0] is a list of all distinct integers in nums1 that are not present in nums2, and answer[1] is a list of all distinct integers in nums2 that are not present in nums1. The order of values in each list does not matter.",
      },
      {
        t: "example",
        c: [
          {
            input: "nums1 = [1, 2, 3], nums2 = [2, 4, 6]",
            output: "[[1, 3], [4, 6]]",
            explain:
              "1 and 3 are in nums1 but not in nums2; 4 and 6 are in nums2 but not in nums1.",
          },
          {
            input: "nums1 = [1, 2, 3, 3], nums2 = [1, 1, 2, 2]",
            output: "[[3], []]",
            explain:
              "Only 3 is in nums1 but not in nums2 (counted once — must be distinct). Every value in nums2 already appears in nums1, so answer[1] is empty.",
          },
        ],
      },
      {
        t: "constraints",
        c: [
          "1 <= nums1.length, nums2.length <= 1000",
          "-1000 <= nums1[i], nums2[i] <= 1000",
        ],
      },

      { t: "h2", c: "Approach — what to use & how to think" },
      {
        t: "p",
        c: "The problem talks about unique values and “in this set but not that set,” which matches set semantics exactly: sets drop duplicates automatically and support a difference operator.",
      },
      {
        t: "p",
        c: "If you skip sets and check with if x in nums2 on a list, each check is O(n) and the whole solution becomes O(n²). Converting to sets first is worth it because membership checks become O(1).",
      },
      {
        t: "ol",
        c: [
          "Convert nums1 to set s1 and nums2 to set s2 (dedupes for free)",
          "Compute s1 - s2 = values in s1 but not in s2",
          "Compute s2 - s1 = values in s2 but not in s1",
          "Return a two-element list, converting each set back to a list",
        ],
      },
      {
        t: "callout",
        title: "Common pitfalls",
        c: "Don’t forget to take the difference in both directions (s1-s2 and s2-s1) — they are different. And because order does not matter, you don’t need to worry about how list(set(...)) is ordered.",
      },

      {
        t: "details",
        summary: "▶ Detailed solution (try it yourself first)",
        c: [
          {
            t: "codeout",
            lang: "python",
            label: "Solution (Python) — runnable",
            code: `def find_difference(nums1, nums2):
    s1, s2 = set(nums1), set(nums2)  # dedupe each array
    # s1 - s2 = in s1 but not in s2
    # s2 - s1 = in s2 but not in s1
    return [list(s1 - s2), list(s2 - s1)]

print(find_difference([1, 2, 3], [2, 4, 6]))        # [[1, 3], [4, 6]]
print(find_difference([1, 2, 3, 3], [1, 1, 2, 2]))  # [[3], []]`,
            out: `[[1, 3], [4, 6]]
[[3], []]`,
          },
          {
            t: "p",
            c: "Once you convert to sets, uniqueness is handled automatically. What’s left is the difference operator (minus between sets), which returns elements on the left that are not on the right. Do both directions and you have the full answer.",
          },
          {
            t: "p",
            c: "If you stay on lists without converting, you not only get O(n²) but also have to dedupe yourself — sets handle both in one line.",
          },
          {
            t: "p",
            c: "Time O(n + m) to build two sets and compute differences · Space O(n + m) for the two sets",
          },
        ],
      },

      {
        t: "callout",
        title: "💡 Pattern takeaway",
        c: "When a problem talks about “in this group but not that group” or “values that differ,” think set difference immediately. The set operators & | - keep set logic short and fast.",
      },
    ],
  },

  "lc75-p21": {
    title: "Problem 21 · LC1207 Unique Number of Occurrences 🟢",
    lead: "Count the frequency of each value, then check that all occurrence counts are unique.",
    blocks: [
      {
        t: "p",
        c: "Problem (LC1207): Given an array of integers arr, return true if the number of occurrences of each value in the array is unique; otherwise return false.",
      },
      {
        t: "example",
        c: [
          {
            input: "arr = [1, 2, 2, 1, 1, 3]",
            output: "true",
            explain:
              "1 appears 3 times, 2 appears 2 times, 3 appears 1 time — occurrence counts {3, 2, 1} are all distinct.",
          },
          {
            input: "arr = [1, 2]",
            output: "false",
            explain:
              "Both 1 and 2 appear once, so the occurrence counts collide.",
          },
          {
            input: "arr = [3, 5, 7, 7, 5, 5]",
            output: "true",
            explain:
              "3 appears 1 time, 5 appears 3 times, 7 appears 2 times — no duplicate occurrence counts.",
          },
        ],
      },
      {
        t: "constraints",
        c: [
          "1 <= arr.length <= 1000",
          "-1000 <= arr[i] <= 1000",
        ],
      },

      { t: "h2", c: "Approach — what to use & how to think" },
      {
        t: "p",
        c: "The problem has two layers. First, count the frequency of each value (dict/Counter). Second, check whether those occurrence counts themselves have any duplicates.",
      },
      {
        t: "p",
        c: "A common duplicate check: compare len(list) with len(set(list)). If equal, nothing was duplicated (a set shrinks when duplicates exist).",
      },
      {
        t: "ol",
        c: [
          "Count frequencies with Counter(arr) → key = value, value = occurrences",
          "Pull only the occurrence counts via .values()",
          "Compare len of those counts with len of their set",
          "Equal → no duplicate occurrences → return True; else False",
        ],
      },
      {
        t: "callout",
        title: "Common pitfalls",
        c: "Don’t accidentally check the keys (the values themselves) instead of the occurrence counts. Use .values(), not .keys() — keys are unique by definition of a dict.",
      },

      {
        t: "details",
        summary: "▶ Detailed solution (try it yourself first)",
        c: [
          {
            t: "codeout",
            lang: "python",
            label: "Solution (Python) — runnable",
            code: `from collections import Counter

def unique_occurrences(arr):
    counts = Counter(arr).values()   # occurrence counts, e.g. [3, 2, 1]
    # if putting values into a set keeps the same length, there were no duplicates
    return len(counts) == len(set(counts))

print(unique_occurrences([1, 2, 2, 1, 1, 3]))  # True
print(unique_occurrences([1, 2]))              # False
print(unique_occurrences([3, 5, 7, 7, 5, 5]))  # True (3->1, 5->3, 7->2)`,
            out: `True
False
True`,
          },
          {
            t: "p",
            c: "Layer one: Counter(arr) counts for you; .values() returns every occurrence count. Layer two: convert that sequence to a set and compare sizes. If any count repeats, the set shrinks and sizes won’t match.",
          },
          {
            t: "p",
            c: "Pairwise checking every pair of occurrence counts would be O(k²). The len-vs-set trick is O(k) and much easier to read.",
          },
          {
            t: "p",
            c: "Time O(n) one counting pass and one set build · Space O(n) for the Counter and the set of frequencies",
          },
        ],
      },

      {
        t: "callout",
        title: "💡 Pattern takeaway",
        c: "Two-layer pattern: count first with Counter, then reason about the frequencies. And len(x) == len(set(x)) is the shortest way to ask “any duplicates?”",
      },
    ],
  },

  "lc75-p22": {
    title: "Problem 22 · LC1657 Determine if Two Strings Are Close 🟡",
    lead: "Turn the two allowed operations into conditions on character set and frequency multiset.",
    blocks: [
      {
        t: "p",
        c: 'Problem (LC1657): Given two strings word1 and word2, return true if word1 and word2 are close, and false otherwise. Two strings are close if you can obtain one from the other using these operations any number of times (on either string): (1) Swap any two existing characters (e.g. "abcde" → "aecdb"). (2) Transform every occurrence of one existing character into another existing character, and vice versa at the same time (e.g. "aacabb" → "bbcbaa" — all a become b and all b become a).',
      },
      {
        t: "example",
        c: [
          {
            input: 'word1 = "abc", word2 = "bca"',
            output: "true",
            explain:
              'You can turn "abc" into "bca" with character swaps alone.',
          },
          {
            input: 'word1 = "a", word2 = "aa"',
            output: "false",
            explain:
              "Different lengths imply different character sets / frequency bags — not close.",
          },
          {
            input: 'word1 = "cabbba", word2 = "abbccc"',
            output: "true",
            explain:
              "Both use the character set {a, b, c}, and their frequency bags match (you can reassign frequencies between a and c).",
          },
          {
            input: 'word1 = "cabbba", word2 = "aabbss"',
            output: "false",
            explain:
              "Frequency bags may sort equal, but the character sets differ ({a, b, c} vs {a, b, s}), so not close.",
          },
        ],
      },
      {
        t: "constraints",
        c: [
          "1 <= word1.length, word2.length <= 10^5",
          "word1 and word2 consist of lowercase English letters",
        ],
      },

      { t: "h2", c: "Approach — what to use & how to think" },
      {
        t: "p",
        c: "The key is translating both operations into checkable conditions. Operation 1 (swap) means order doesn’t matter — only which characters appear how often. Operation 2 (swap frequencies) means you can freely re-pair characters with counts, as long as those characters already exist.",
      },
      {
        t: "p",
        c: "So count frequencies with Counter for each string and check two conditions. Don’t try to simulate swaps — that search blows up factorially.",
      },
      {
        t: "ol",
        c: [
          "Build Counters c1, c2 for word1 and word2",
          "Condition 1: set(c1) == set(c2) — same character set (op 2 can only remap existing letters, not invent new ones)",
          "Condition 2: sorted(c1.values()) == sorted(c2.values()) — frequency bags must match",
          "Both true → close → return True",
        ],
      },
      {
        t: "callout",
        title: "Common pitfalls",
        c: "Don’t skip condition 1 (same character set). If you only check sorted frequencies, cabbba vs aabbss would wrongly return True even though s never appears in word1 — op 2 cannot invent it.",
      },

      { t: "h2", c: "Walk through the examples" },
      { t: "p", c: "Check both conditions on all four examples." },
      {
        t: "table",
        head: ["word1 / word2", "Same character set?", "Same sorted frequencies?", "Result"],
        rows: [
          ["abc / bca", "Yes {a,b,c}", "Yes [1,1,1]", "True"],
          ["a / aa", "Yes {a}", "No [1] vs [2]", "False"],
          ["cabbba / abbccc", "Yes {a,b,c}", "Yes [1,2,3]", "True"],
          ["cabbba / aabbss", "No {a,b,c} vs {a,b,s}", "(Yes [1,2,3])", "False"],
        ],
      },

      {
        t: "details",
        summary: "▶ Detailed solution (try it yourself first)",
        c: [
          {
            t: "codeout",
            lang: "python",
            label: "Solution (Python) — runnable",
            code: `from collections import Counter

def close_strings(word1, word2):
    c1, c2 = Counter(word1), Counter(word2)
    # Condition 1: same set of characters (keys)
    # Condition 2: same multiset of frequencies (sort then compare)
    return (set(c1) == set(c2)
            and sorted(c1.values()) == sorted(c2.values()))

print(close_strings("abc", "bca"))        # True
print(close_strings("a", "aa"))           # False
print(close_strings("cabbba", "abbccc"))  # True
print(close_strings("cabbba", "aabbss"))  # False`,
            out: `True
False
True
False`,
          },
          {
            t: "p",
            c: "set(c1) compares only keys (characters that appear). c1.values() are the frequencies; sorting before comparing means we don’t care which character owns which count — only that the bags match, which is exactly the freedom of operation 2.",
          },
          {
            t: "p",
            c: "Why both conditions? Condition 2 alone would allow different alphabets (e.g. s replacing c). Condition 1 alone isn’t enough because per-character frequencies might not rematch. You need both.",
          },
          {
            t: "p",
            c: "Time O(n + k log k) count O(n) and sort at most k = 26 frequencies · Space O(k) for the Counters (fixed 26 letters)",
          },
        ],
      },

      {
        t: "callout",
        title: "💡 Pattern takeaway",
        c: "Weird operation problems often reduce to invariants — properties that stay true no matter how many times you apply the ops. Check the invariants instead of simulating. Here the invariants are character set and frequency bag.",
      },
    ],
  },

  "lc75-p23": {
    title: "Problem 23 · LC2352 Equal Row and Column Pairs 🟡",
    lead: "Count row frequencies with tuple keys, then query each column against that map.",
    blocks: [
      {
        t: "p",
        c: "Problem (LC2352): Given an n x n integer matrix grid (0-indexed), return the number of pairs (ri, cj) such that row ri and column cj are equal. A row and column are equal if they contain the same elements in the same order.",
      },
      {
        t: "example",
        c: [
          {
            input: "grid = [[3, 2, 1], [1, 7, 6], [2, 7, 7]]",
            output: "1",
            explain:
              "One equal pair: (row 2, column 1), both equal to [2, 7, 7].",
          },
          {
            input: "grid = [[3, 1, 2, 2], [1, 4, 4, 5], [2, 4, 2, 2], [2, 4, 2, 2]]",
            output: "3",
            explain:
              "Three equal pairs: (row 0, column 0) = [3,1,2,2], (row 2, column 2) = [2,4,2,2], (row 3, column 2) = [2,4,2,2].",
          },
        ],
      },
      {
        t: "constraints",
        c: [
          "n == grid.length == grid[i].length",
          "1 <= n <= 200",
          "1 <= grid[i][j] <= 10^5",
        ],
      },
      {
        t: "callout",
        c: "Order matters: [2,7,7] matches [2,7,7] only, not [7,2,7]. Duplicate-looking rows each form their own pairs.",
      },

      { t: "h2", c: "Approach — what to use & how to think" },
      {
        t: "p",
        c: "The naive approach compares every row with every column — O(n²) pairs, each comparing n cells → O(n³), too slow for larger n.",
      },
      {
        t: "p",
        c: "Speed it up with a hash map: count how often each row shape appears (Counter), then iterate columns and ask how many rows match that shape. Because rows/columns are sequences of numbers, convert them to tuples first (lists can’t be dict keys — mutable — but tuples are hashable).",
      },
      {
        t: "ol",
        c: [
          "Read n = len(grid)",
          "Convert each row to a tuple and count with Counter → row_count",
          "For each column j: build the column as a tuple col",
          "Add row_count[col] to pairs (every matching row pairs with this column)",
          "After the loop, return pairs",
        ],
      },
      {
        t: "callout",
        title: "Common pitfalls",
        c: "Add row_count[col], not just +1 — duplicate rows each pair with this column. Counter returns 0 for missing keys, so you won’t get a KeyError.",
      },

      { t: "h2", c: "Walk through a step" },
      {
        t: "p",
        c: "Iterate grid = [[3,2,1],[1,7,6],[2,7,7]] with row_count = {(3,2,1):1, (1,7,6):1, (2,7,7):1}",
      },
      {
        t: "table",
        head: ["j", "column (tuple)", "row_count[col]", "pairs so far"],
        rows: [
          ["0", "(3, 1, 2)", "0", "0"],
          ["1", "(2, 7, 7)", "1", "1"],
          ["2", "(1, 6, 7)", "0", "1"],
        ],
      },
      { t: "p", c: "Loop ends with pairs = 1 — matches the answer." },

      {
        t: "details",
        summary: "▶ Detailed solution (try it yourself first)",
        c: [
          {
            t: "codeout",
            lang: "python",
            label: "Solution (Python) — runnable",
            code: `from collections import Counter

def equal_pairs(grid):
    n = len(grid)
    # count how often each row shape (as a tuple) appears
    row_count = Counter(tuple(row) for row in grid)

    pairs = 0
    for j in range(n):
        # build column j as a tuple
        col = tuple(grid[i][j] for i in range(n))
        # how many rows match this column — add them all
        pairs += row_count[col]
    return pairs

print(equal_pairs([[3, 2, 1], [1, 7, 6], [2, 7, 7]]))  # 1
print(equal_pairs([[3, 1, 2, 2], [1, 4, 4, 5],
                   [2, 4, 2, 2], [2, 4, 2, 2]]))        # 3`,
            out: `1
3`,
          },
          {
            t: "p",
            c: "Step one: convert each row to a tuple and count shapes with Counter. Tuples matter because lists are mutable and can’t be dict keys; tuples are immutable and hashable.",
          },
          {
            t: "p",
            c: "Step two: for each column, build a tuple and look up how many rows match. Duplicate rows each pair with that column, so add the full count. In the second example, one column matches two identical rows → add 2 at once.",
          },
          {
            t: "p",
            c: "Time O(n²) each of n rows/columns has n cells · Space O(n²) storing all row tuples in the Counter",
          },
        ],
      },

      {
        t: "callout",
        title: "💡 Pattern takeaway",
        c: "When matching identical items across two groups, don’t compare every pair (O(n²) pairs). Count one group into a hash map, then query the other one by one. And remember: list/row as a key → convert to tuple first.",
      },
    ],
  },
};
