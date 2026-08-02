import type { Block } from "@/lib/types";

/** English teaching + official LeetCode text for Hash Map / Set (section 5). */

export const introHashMapEn: Block[] = [
  {
    t: "p",
    c: 'Problems in this section look different on the surface, but they all ask the same core questions: "have I seen this before?", "how many times does this appear?", "what overlaps between these two groups?" — answered naively by scanning the whole collection every time. A hash map answers them in near-constant time, no matter how large the data gets.',
  },
  {
    t: "p",
    c: 'It is not free — you pay with memory. You build an extra structure to "remember" what you have already seen. That trade is called a space-time tradeoff, and it is the heart of this whole section.',
  },
  {
    t: "callout",
    title: "How to read this page",
    c: 'Parts 1–2 are "why it is fast". Parts 3–4 are "what tools you get". Part 5 is the core — 6 usage patterns you must tell apart. If short on time, read parts 5 and 7 at minimum.',
  },

  { t: "h2", c: "Part 1 · The problem hash maps solve — see it first" },
  {
    t: "p",
    c: "Task: given two piles a and b, find values in b that do not appear in a at all. The naive way is to take each value from b and scan every value in a — which is exactly what `x in a` does when a is a list. Let's expand that and count comparisons.",
  },
  {
    t: "codeout",
    lang: "python",
    label: "Compare two approaches and count comparisons",
    code: `a = [4, 9, 5, 2, 7]
b = [9, 4, 9, 8, 4, 3]

# Approach 1 — check with a list (expand what \`x in a\` does)
steps = 0
res = []
for x in b:
    found = False
    for y in a:                # scan every item in a until found or exhausted
        steps += 1
        if x == y:
            found = True
            break
    if not found:
        res.append(x)
print("list :", res, "| compared", steps, "times")

# Approach 2 — check with a set
a_set = set(a)                 # convert once; pay one chunk of extra memory
res2 = [x for x in b if x not in a_set]
print("set  :", res2, "| compared", len(b), "times")`,
    out: `list : [8, 3] | compared 16 times
set  : [8, 3] | compared 6 times`,
  },
  {
    t: "p",
    c: "16 down to 6 is not exciting on a tiny pile. The point is how these numbers grow: with a list, as a grows, every query gets slower (≈ size(b) × size(a)). With a set, whether a has 5 or 5 million items, one query costs the same — total work is just size(b). In Big-O: O(n·m) vs O(n+m).",
  },
  {
    t: "callout",
    title: "One sentence to remember from this part",
    c: 'If a loop asks "is this in that pile?" or "have I seen this before?", immediately suspect that pile should be a set or dict, not a list — the most common signal in this section.',
  },

  { t: "h2", c: "Part 2 · How it finds things without scanning" },
  {
    t: "p",
    c: 'The question you need answered before trusting O(1): if it does not scan item by item, how does it know where something is? A hash table does not "search" — it computes which slot the item must live in.',
  },
  {
    t: "p",
    c: "In a list, position and value are unrelated. The number 7 might sit at index 0 or 900 — you cannot know ahead of time, so you walk. A hash table changes the rule: run the value through hash(), then mod by the number of slots. That gives the slot index. To look it up later, compute the same formula and go straight there.",
  },
  {
    t: "codeout",
    lang: "python",
    label: "From key → number → slot (assume 8 slots)",
    code: `for k in [7, 15, 23, 42, 100]:
    print(f"key {k:<4} hash = {hash(k):<4} -> slot {hash(k) % 8}")`,
    out: `key 7    hash = 7    -> slot 7
key 15   hash = 15   -> slot 7
key 23   hash = 23   -> slot 7
key 42   hash = 42   -> slot 2
key 100  hash = 100  -> slot 4`,
  },
  {
    t: "image",
    src: "/leetcode-75/hashmap-lookup.png",
    alt: "Hash table lookup: key through hash() then mod to a slot, then walk straight to that slot",
    caption: "Lookup is not a search — compute the slot from the key and go straight there (example: key = 42 → slot 2)",
  },
  {
    t: "p",
    c: 'We use ints here because for small non-negative integers, hash(k) equals k, so key → slot is easiest to see (not a general rule — e.g. hash(-1) is -2, not -1). For str, hash is a large number and changes every process for security. Try print(hash("apple")) across two runs — do not write code that depends on raw hash values.',
  },
  {
    t: "p",
    c: 'Notice: 7, 15, and 23 all land in slot 7. That is a collision, and it is unavoidable when you map unbounded keys into finitely many slots. Python then probes for the next open slot; lookup follows the same probe sequence comparing with == until it finds the real key or an empty slot — so one lookup is not always "one step".',
  },
  {
    t: "image",
    src: "/leetcode-75/hashmap-collision.png",
    alt: "Hash collision: several keys map to the same slot; probe for the next open slot and compare with ==",
    caption: "Collision: 7, 15, 23 all want slot 7 — the first stays in 7, the rest move to later open slots. Lookup must use ==, not slot number alone.",
  },
  {
    t: "p",
    c: "That is why every table says average O(1), not plain O(1). Python keeps the average fast by resizing (growing the table) when it gets full, so plenty of empty slots remain, collisions stay rare, and probe chains stay short.",
  },

  { t: "h3", c: "What worst-case O(n) looks like" },
  {
    t: "p",
    c: "If every key hashes to the same number, everything piles into one region and one lookup compares almost every item — back to O(n) like a list. You can force this with a class whose __hash__ always returns the same value, then count how many == calls one lookup needs.",
  },
  {
    t: "codeout",
    lang: "python",
    label: "Proof that collisions can destroy O(1)",
    code: `class Key:
    calls = 0                          # shared counter for == calls

    def __init__(self, v, h):
        self.v, self.h = v, h

    def __hash__(self):
        return self.h                  # you control the hash

    def __eq__(self, other):
        Key.calls += 1
        return self.v == other.v


# Normal case — different hashes, items spread out
s_good = {Key(i, i) for i in range(1000)}
Key.calls = 0                          # reset after build; count only lookup
Key(999, 999) in s_good
print("well distributed : == called", Key.calls, "times")

# Worst case — every hash is 0, everything piles up
s_bad = {Key(i, 0) for i in range(1000)}
Key.calls = 0
Key(999, 0) in s_bad
print("all collide      : == called", Key.calls, "times")`,
    out: `well distributed : == called 1 times
all collide      : == called 1345 times`,
  },
  {
    t: "callout",
    title: "Does this matter on LeetCode?",
    c: 'In practice almost never — Python\'s hash for int, str, and tuple distributes well. All LC75 problems in this section can safely assume average O(1). Still know it because (1) in interviews, say "average case" after "O(1)", and (2) if you write a buggy __hash__ yourself, this is the failure mode.',
  },

  { t: "h2", c: "Part 3 · The one rule for keys — must be hashable" },
  {
    t: "p",
    c: "From part 2, storage location depends on the key's hash. If the key can change after insert, its hash changes, the slot it should live in changes, and the item is effectively lost. Python forbids mutable objects as keys up front — that property is called hashable.",
  },
  {
    t: "codeout",
    lang: "python",
    label: "What can be a key vs what cannot",
    code: `d = {}
d[3] = "int ok"
d["abc"] = "str ok"
d[(1, 2)] = "tuple ok"        # immutable -> ok
print(d)

try:
    d[[1, 2]] = "list?"        # mutable -> not ok
except TypeError as e:
    print("list  ->", type(e).__name__ + ":", e)

try:
    d[{1, 2}] = "set?"         # mutable -> not ok (frozenset is ok)
except TypeError as e:
    print("set   ->", type(e).__name__ + ":", e)`,
    out: `{3: 'int ok', 'abc': 'str ok', (1, 2): 'tuple ok'}
list  -> TypeError: unhashable type: 'list'
set   -> TypeError: unhashable type: 'set'`,
  },
  {
    t: "p",
    c: "unhashable type: 'list' is the error you will see often here. The fix is almost always one line: convert the list to a tuple before using it as a key. Equal tuples always share the same hash (this becomes pattern 4 next).",
  },

  { t: "h3", c: "The trap nobody warns you about: 1, True, and 1.0 are the same key" },
  {
    t: "p",
    c: "Samness as a key is not about type — it is about equal hash and == being True. 1, True, and 1.0 all satisfy that.",
  },
  {
    t: "codeout",
    lang: "python",
    code: `d = {}
d[1] = "one"
d[True] = "true"
d[1.0] = "one-point-zero"
print(d)                                        # only one key left!
print("1 == True == 1.0 :", 1 == True == 1.0)
print("same hashes      :", hash(1) == hash(True) == hash(1.0))`,
    out: `{1: 'one-point-zero'}
1 == True == 1.0 : True
same hashes      : True`,
  },
  {
    t: "p",
    c: "The displayed key stays 1 (the first insert), but the value is the last write — later inserts update, they do not add a new key. Silent breakage, no exception.",
  },

  { t: "h2", c: "Part 4 · Four tools — pick the right one" },
  {
    t: "p",
    c: 'Everything in this section is a hash table. They differ only in "what rides along with the key" and "what you get for free". This table is all you need.',
  },
  {
    t: "table",
    head: ["Tool", "Stores", "Free benefits", "Reach for it when"],
    rows: [
      [
        "set",
        "keys only",
        "dedupe + set ops (& | - ^)",
        'question is "is it there?", not "how many?"',
      ],
      [
        "dict",
        "key → any value",
        "insertion order (Python 3.7+)",
        "you need side data, e.g. an index",
      ],
      [
        "Counter",
        "key → count",
        "count in one line, missing key → 0, most_common()",
        'the problem is pure "counting"',
      ],
      [
        "defaultdict",
        "key → typed default",
        "no need to check if key exists",
        "value is a collection, e.g. list or set",
      ],
    ],
  },
  {
    t: "codeout",
    lang: "python",
    label: "Four equivalent ways to count frequencies",
    code: `from collections import defaultdict, Counter

words = ["a", "b", "a", "c", "a", "b"]

c1 = {}                          # 1) check if key exists first
for w in words:
    if w not in c1:
        c1[w] = 0
    c1[w] += 1

c2 = {}                          # 2) .get(key, default) — shorter, no if
for w in words:
    c2[w] = c2.get(w, 0) + 1

c3 = defaultdict(int)            # 3) missing key starts at int() = 0
for w in words:
    c3[w] += 1

c4 = Counter(words)              # 4) count in one line

print("1) if/else       :", c1)
print("2) .get(w, 0)    :", c2)
print("3) defaultdict   :", dict(c3))
print("4) Counter       :", c4)
print("all equal        :", c1 == c2 == dict(c3) == dict(c4))`,
    out: `1) if/else       : {'a': 3, 'b': 2, 'c': 1}
2) .get(w, 0)    : {'a': 3, 'b': 2, 'c': 1}
3) defaultdict   : {'a': 3, 'b': 2, 'c': 1}
4) Counter       : Counter({'a': 3, 'b': 2, 'c': 1})
all equal        : True`,
  },
  {
    t: "callout",
    title: "The sharpest set pitfall",
    warn: true,
    c: 'Sets do not preserve order. For str keys, order can reshuffle every process (str hashes are randomized). Never rely on set order — to dedupe while keeping first-seen order use list(dict.fromkeys(nums)). Problems that return a set often say "in any order", which is itself a hint that a set is fine.',
  },

  { t: "h3", c: "Reading a missing key — three tools, three behaviors" },
  {
    t: "codeout",
    lang: "python",
    code: `from collections import Counter

count = {"a": 3}
print('count.get("z", 0)     :', count.get("z", 0))      # safe default
print('Counter("aaa")["z"]   :', Counter("aaa")["z"])     # Counter returns 0
try:
    print(count["z"])                                     # plain dict -> boom
except KeyError as e:
    print('count["z"]            : KeyError', e)`,
    out: `count.get("z", 0)     : 0
Counter("aaa")["z"]   : 0
count["z"]            : KeyError 'z'`,
  },
  {
    t: "codeout",
    lang: "python",
    label: 'defaultdict creates a key just from a "read"',
    code: `from collections import defaultdict

d = defaultdict(int)
print('"z" in d before read :', "z" in d)
_ = d["z"]                          # read only — no assignment
print('"z" in d after read  :', "z" in d, "<- created by reading")
print("d =", dict(d), "| len(d) =", len(d))`,
    out: `"z" in d before read : False
"z" in d after read  : True <- created by reading
d = {'z': 0} | len(d) = 1`,
  },
  {
    t: "p",
    c: 'If the problem asks "how many distinct values?" and you casually print(d[x]) while debugging, len(d) silently drifts. Counter does not — it returns 0 without creating the key.',
  },

  { t: "h2", c: "Part 5 · Six usage patterns you must separate" },
  {
    t: "p",
    c: 'This is the heart of the page. Only four tools (part 4), but six distinct questions you ask them. People stuck here usually know dict — they just remember "use a hash map" without knowing what to ask it.',
  },
  {
    t: "p",
    c: 'Each pattern below has the same three parts: the question → a skeleton (not runnable) → a runnable example. Read all six before the problems, then ask yourself "which pattern is this?"',
  },

  { t: "h3", c: 'Pattern 1 · Membership — "is this in that pile?"' },
  {
    t: "p",
    c: "Simplest and most common. You only care present/absent — not count, not position. Tool: set. Build the set once before the loop, not every iteration.",
  },
  {
    t: "code",
    lang: "python",
    label: "Skeleton for pattern 1",
    c: `pool = set(the_collection_to_check)   # once, before the loop
for x in data:
    if x in pool:                     # O(1) each query
        ...`,
  },
  {
    t: "codeout",
    lang: "python",
    label: "Live — values in one pile but not the other",
    code: `a, b = [4, 9, 5], [9, 8, 4, 3]

seen = set(a)
print("in b but not a :", [x for x in b if x not in seen])

# if duplicates in the answer do not matter, set ops are shorter
print("set difference :", set(b) - set(a))`,
    out: `in b but not a : [8, 3]
set difference : {8, 3}`,
  },
  {
    t: "callout",
    title: "Pattern 1 · summary",
    c: "Appears in problem 20 · Find the Difference of Two Arrays (both directions: set(a)-set(b) and set(b)-set(a)). Trap: results are sets (unordered) — wrap with list(...) if a list is required.",
  },

  { t: "h3", c: 'Pattern 2 · Frequency — "how many times does each appear?"' },
  {
    t: "p",
    c: 'Step up from "yes/no" to "how many". A set is not enough — you need a dict of numbers. Counter does it in one line.',
  },
  {
    t: "code",
    lang: "python",
    label: "Skeleton for pattern 2",
    c: `from collections import Counter

count = Counter(data)      # count the whole collection
count[x]                   # how many times x appears — 0 if missing, no error`,
  },
  {
    t: "codeout",
    lang: "python",
    label: "Live — count characters",
    code: `from collections import Counter

c = Counter("abracadabra")
print("Counter         :", c)              # ordered by frequency
print('c["a"] / c["z"]  :', c["a"], "/", c["z"])
print("top 2           :", c.most_common(2))`,
    out: `Counter         : Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})
c["a"] / c["z"]  : 5 / 0
top 2           : [('a', 5), ('b', 2)]`,
  },
  {
    t: "callout",
    title: "Pattern 2 · summary",
    c: 'Base for patterns 3 and 4. Counter(data) works on any iterable — str, list, generator. Trap: Counter returns 0 for missing keys, so if c[x] is falsy for both "missing" and "zero count" — separate those cases when the problem does.',
  },

  { t: "h3", c: 'Pattern 3 · Count of counts — "what does the frequency pattern look like?"' },
  {
    t: "p",
    c: "The most missed pattern in this section. The problem no longer asks about the data values — it asks about the counts themselves. Count with Counter, then drop the keys and reason over .values() as a second layer.",
  },
  {
    t: "code",
    lang: "python",
    label: "Skeleton for pattern 3",
    c: `from collections import Counter

count = Counter(data)
vals = list(count.values())      # drop keys; keep only "how many times"

# second-layer questions, e.g.
len(set(vals)) == len(vals)      # are all frequencies unique?
sorted(vals) == sorted(other)    # do two piles share the same frequency bag?`,
  },
  {
    t: "codeout",
    lang: "python",
    label: "Live — are all frequencies unique?",
    code: `from collections import Counter

for s in ["aabbbc", "aabbc"]:
    c = Counter(s)
    v = list(c.values())
    print(f"{s:<8} -> {dict(c)}")
    print(f"{'':8}    freqs = {sorted(v)} | all unique? {len(set(v)) == len(v)}")`,
    out: `aabbbc   -> {'a': 2, 'b': 3, 'c': 1}
            freqs = [1, 2, 3] | all unique? True
aabbc    -> {'a': 2, 'b': 2, 'c': 1}
            freqs = [1, 2, 2] | all unique? False`,
  },
  {
    t: "p",
    c: 'Read len(set(v)) == len(v): set(v) drops duplicates in v; if length is unchanged, there were none — the standard "are all unique?" check. Notice we stack set on top of Counter: two tools, two layers, one problem.',
  },
  {
    t: "callout",
    title: "Pattern 3 · summary",
    c: 'Problem 21 · Unique Number of Occurrences (len(set(v)) == len(v)) and problem 22 · Determine if Two Strings Are Close (sorted(x.values()) == sorted(y.values()) plus set(x) == set(y)). The key is "count, then count again" — not a single counting pass.',
  },

  { t: "h3", c: 'Pattern 4 · Composite key — "several pieces as one key"' },
  {
    t: "p",
    c: "When what you compare is a whole bundle — a matrix row, a pair (x, y) — not a single value. Lists cannot be keys (part 3). Convert to a tuple so the whole bundle becomes one lookup key.",
  },
  {
    t: "code",
    lang: "python",
    label: "Skeleton for pattern 4",
    c: `from collections import Counter

count = Counter(tuple(item) for item in data)   # list -> tuple first
count[tuple(another_bundle)]                    # whole-bundle compare in O(1)`,
  },
  {
    t: "codeout",
    lang: "python",
    label: "Live — how many (row, column) pairs look the same",
    code: `from collections import Counter

grid = [[3, 2, 1],
        [1, 7, 6],
        [2, 7, 7]]

rowc = Counter(tuple(r) for r in grid)     # count rows; whole row is the key
print("row counts :", rowc)

cols = list(zip(*grid))                    # zip(*grid) = transpose → columns
print("columns    :", cols)

for col in cols:
    print(f"   col {col} -> matching rows: {rowc[col]}")

print("answer =", sum(rowc[col] for col in cols))`,
    out: `row counts : Counter({(3, 2, 1): 1, (1, 7, 6): 1, (2, 7, 7): 1})
columns    : [(3, 1, 2), (2, 7, 7), (1, 6, 7)]
   col (3, 1, 2) -> matching rows: 0
   col (2, 7, 7) -> matching rows: 1
   col (1, 6, 7) -> matching rows: 0
answer = 1`,
  },
  {
    t: "p",
    c: "The whole problem collapses into the code above because the hash map does the heavy lifting: without it you compare every row to every column cell-by-cell (three nested loops). With a row as one key, each compare is O(1) — one loop left.",
  },
  {
    t: "callout",
    title: "Pattern 4 · summary",
    c: "Problem 23 · Equal Row and Column Pairs. Remember two things: tuple(...) for hashability, and zip(*grid) to transpose. Trap: add rowc[col], not +1 — duplicate-looking rows each form their own pair.",
  },

  { t: "h3", c: 'Pattern 5 · Seen-so-far — "has the partner I need already walked by?"' },
  {
    t: "p",
    c: 'Patterns 1–4 build the map first, then use it. Pattern 5 uses it while still building — one pass. At each step ask "has the value I need already passed?" If yes, done; if not, record yourself for someone later. Often called one-pass.',
  },
  {
    t: "code",
    lang: "python",
    label: "Skeleton for pattern 5",
    c: `seen = {}                       # or set() if you do not need the index
for i, x in enumerate(data):
    if needed_value in seen:        # 1) ask first
        ...                         #    found — done
    seen[x] = i                     # 2) then record yourself — order matters`,
  },
  {
    t: "p",
    c: 'Best example: LC1 Two Sum — the Two Pointers page left this hanging ("two pointers cannot keep original indices because sorting destroys them"). Pattern 5 solves it: it remembers which value sat at which index, so no sort is needed.',
  },
  {
    t: "codeout",
    lang: "python",
    label: "Live — LC1 Two Sum in one pass, no sort, indices intact",
    code: `nums = [3, 9, 4, 1]
target = 12
seen = {}                       # value -> index seen so far

for i, x in enumerate(nums):
    need = target - x           # the partner that would complete target
    print(f"i={i} x={x} | need {need} | seen={seen} -> seen? {need in seen}")
    if need in seen:
        print("answer indices:", (seen[need], i))
        break
    seen[x] = i                 # not found yet -> leave yourself for later`,
    out: `i=0 x=3 | need 9 | seen={} -> seen? False
i=1 x=9 | need 3 | seen={3: 0} -> seen? True
answer indices: (0, 1)`,
  },
  {
    t: "callout",
    title: "Pattern 5 · summary",
    warn: true,
    c: "Critical trap: check first, then record. Swap those lines and the current value pairs with itself when 2*x == target — e.g. nums = [6, 3], target = 12 wrongly returns (0, 0). Not in the four problems of this section directly, but shows up in Prefix Sum, Sliding Window, and interviews constantly.",
  },

  { t: "h3", c: 'Pattern 6 · Grouping — "bucket items by a key you compute"' },
  {
    t: "p",
    c: "Patterns 1–5 use numeric values or no value. Pattern 6 uses a collection (list/set) as the value and dumps items that share a computed key into the same bucket. The key is not in the raw data — you invent it. Equal computed keys → same group.",
  },
  {
    t: "code",
    lang: "python",
    label: "Skeleton for pattern 6",
    c: `from collections import defaultdict

groups = defaultdict(list)          # missing key starts as []
for item in data:
    key = compute_key(item)         # the part you design per problem
    groups[key].append(item)        # same key → same bucket`,
  },
  {
    t: "codeout",
    lang: "python",
    label: "Live — group anagrams",
    code: `from collections import defaultdict

words = ["eat", "tea", "tan", "ate", "nat", "bat"]
groups = defaultdict(list)

for w in words:
    key = "".join(sorted(w))        # sorted letters → anagrams share a key
    groups[key].append(w)
    print(f"{w} -> key '{key}'")

print("result:", list(groups.values()))`,
    out: `eat -> key 'aet'
tea -> key 'aet'
tan -> key 'ant'
ate -> key 'aet'
nat -> key 'ant'
bat -> key 'abt'
result: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]`,
  },
  {
    t: "p",
    c: 'The whole trick is key = "".join(sorted(w)) — choosing what to compute as the key is the problem. Once the key is right, append into defaultdict is identical every time.',
  },
  {
    t: "callout",
    title: "Pattern 6 · summary",
    c: "Not in the four problems of this section, but the same shape as building an adjacency list in Graph (defaultdict(list) then append neighbors) — heavy in sections 12–13. Learn it now and Graph becomes mostly about traversal.",
  },

  { t: "h3", c: "Summary table of the six patterns" },
  {
    t: "table",
    head: ["Pattern", "Question asked", "Tool", "Key line", "Course #"],
    rows: [
      ["1 · Membership", "is this in that pile?", "set", "x in pool / set(b) - set(a)", "20"],
      ["2 · Frequency", "how many times each?", "Counter", "Counter(data)[x]", "base of 21–23"],
      ["3 · Count of counts", "what do the frequencies look like?", "Counter + set/sorted", "len(set(c.values())) == len(c)", "21, 22"],
      ["4 · Composite key", "does this whole bundle match?", "Counter of tuples", "Counter(tuple(r) for r in data)", "23"],
      ["5 · Seen-so-far", "has my partner already passed?", "dict (value → index)", "if need in seen: ... then seen[x] = i", "LC1, §4"],
      ["6 · Grouping", "how do these group together?", "defaultdict(list)", "groups[computed_key].append(item)", "§12–13"],
    ],
  },
  {
    t: "callout",
    title: "How to pick a pattern on a real problem",
    c: "Ask in order: need counts? if not → pattern 1. If yes: does it ask about the data or about the counts? counts → 3, data → 2. Is the key a bundle or a single value? bundle → 4. Need positions / one pass? → 5. Is the answer groups? → 6.",
  },

  { t: "h2", c: "Part 6 · When a hash map is the wrong tool" },
  {
    t: "p",
    c: 'Hash maps are fast because they throw away "order" and "nearness" — they only keep "present/absent" and "how many". Problems that need what they threw away cannot use this move.',
  },
  {
    t: "table",
    head: ["Situation", "Why not", "Use instead"],
    rows: [
      [
        'range queries, e.g. "how many values between 3 and 7?"',
        "hash answers exact equality only; scanning all keys defeats the point",
        "sorted array + binary search (§15)",
      ],
      [
        "repeatedly take min/max while data changes",
        "min/max over a dict is O(n) every time",
        "heap / priority queue (§14)",
      ],
      [
        "need sorted output",
        "sets are unordered; dicts only keep insertion order",
        "sorted(...) at the end, or sort up front",
      ],
      [
        "key is a list / mutable object",
        "unhashable — cannot be a key at all",
        "convert to tuple / frozenset first (pattern 4)",
      ],
      [
        "tiny fixed domain, e.g. a–z only",
        "works but wastes memory vs a plain array",
        "list of size 26 indexed by ord(c) - ord('a')",
      ],
    ],
  },
  {
    t: "codeout",
    lang: "python",
    label: "Memory cost (CPython 3.10)",
    code: `import sys

n = 1000
print("list(range(1000)) :", sys.getsizeof(list(range(n))), "bytes")
print("set(range(1000))  :", sys.getsizeof(set(range(n))), "bytes")
print("dict.fromkeys     :", sys.getsizeof(dict.fromkeys(range(n))), "bytes")`,
    out: `list(range(1000)) : 8056 bytes
set(range(1000))  : 32984 bytes
dict.fromkeys     : 36960 bytes`,
  },
  {
    t: "p",
    c: 'About 4× — because of part 2: hash tables keep many empty slots to avoid collisions. Pack them like a list and they stop being fast. That is the concrete "trade memory for time" from the opening. Almost never a LeetCode issue, but know what you are paying.',
  },

  { t: "h2", c: "Part 7 · Common traps" },
  {
    t: "ul",
    c: [
      "Writing if x in some_list inside a loop → accidental O(n²). Fix: set(...) once before the loop. #1 trap in this section.",
      "Relying on set order → unstable (for str, changes every process). Dedupe keeping order: list(dict.fromkeys(nums)).",
      "Reading d[key] when key may be missing → KeyError. Use d.get(key, default) or if key in d (Counter is safe; plain dict is not).",
      "Reading d[key] on a defaultdict while debugging → key is created for real; len(d) and loops drift with no error.",
      "Using a list as a key → TypeError: unhashable type: 'list'. Always tuple first (pattern 4).",
      "In pattern 5, writing seen[x] = i before the check → current item pairs with itself. Check first, then record.",
      "Forgetting 1, True, 1.0 are the same key; and key in d checks keys only, not values (v in d.values() is O(n)).",
      "Mutating keys while iterating for k in d → RuntimeError: dictionary changed size during iteration. Iterate a copy: for k in list(d).",
    ],
  },

  {
    t: "callout",
    title: "Ready for the problems",
    c: "This section has 4 problems, each mapped to a pattern in part 5: 20 · Difference of Two Arrays = pattern 1 → 21 · Unique Number of Occurrences = pattern 3 → 22 · Two Strings Are Close = pattern 3 (two layers) → 23 · Equal Row and Column Pairs = pattern 4. Hit next to start problem 20.",
  },
];

/** Official LC statement + translated teaching for each problem. */
export const p20En: Block[] = [
  {
    t: "p",
    c: "Given two 0-indexed integer arrays nums1 and nums2, return a list answer of size 2 where:\n\n• answer[0] is a list of all distinct integers in nums1 which are not present in nums2.\n• answer[1] is a list of all distinct integers in nums2 which are not present in nums1.\n\nNote that the integers in the lists may be returned in any order.",
  },
  {
    t: "example",
    c: [
      {
        input: "nums1 = [1,2,3], nums2 = [2,4,6]",
        output: "[[1,3],[4,6]]",
        explain:
          "For nums1, nums1[1] = 2 is present at index 0 of nums2, whereas nums1[0] = 1 and nums1[2] = 3 are not present in nums2. Therefore, answer[0] = [1,3]. For nums2, nums2[0] = 2 is present at index 1 of nums1, whereas nums2[1] = 4 and nums2[2] = 6 are not present in nums1. Therefore, answer[1] = [4,6].",
      },
      {
        input: "nums1 = [1,2,3,3], nums2 = [1,1,2,2]",
        output: "[[3],[]]",
        explain:
          "For nums1, nums1[2] and nums1[3] are not present in nums2. Since nums1[2] == nums1[3], their value is only included once and answer[0] = [3]. Every integer in nums2 is present in nums1. Therefore, answer[1] = [].",
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
    c: "Don’t forget difference in both directions (s1-s2 and s2-s1) — they are different. And because order does not matter, you don’t need to worry about how list(set(...)) is ordered.",
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
];

export const p21En: Block[] = [
  {
    t: "p",
    c: "Given an array of integers arr, return true if the number of occurrences of each value in the array is unique or false otherwise.",
  },
  {
    t: "example",
    c: [
      {
        input: "arr = [1,2,2,1,1,3]",
        output: "true",
        explain:
          "The value 1 has 3 occurrences, 2 has 2 and 3 has 1. No two values have the same number of occurrences.",
      },
      {
        input: "arr = [1,2]",
        output: "false",
      },
      {
        input: "arr = [-3,0,1,-3,1,1,1,-3,10,0]",
        output: "true",
      },
    ],
  },
  {
    t: "constraints",
    c: ["1 <= arr.length <= 1000", "-1000 <= arr[i] <= 1000"],
  },

  { t: "h2", c: "Approach — what to use & how to think" },
  {
    t: "p",
    c: "Two layers. First, count the frequency of each value (dict/Counter). Second, check whether those occurrence counts themselves have any duplicates.",
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
    c: "Don’t check the keys (the values themselves) instead of the occurrence counts. Use .values(), not .keys() — keys are unique by definition of a dict.",
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
print(unique_occurrences([3, 5, 7, 7, 5, 5]))  # True`,
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
];

export const p22En: Block[] = [
  {
    t: "p",
    c: "Two strings are considered close if you can attain one from the other using the following operations:\n\nOperation 1: Swap any two existing characters.\n• For example, abcde -> aecdb\n\nOperation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.\n• For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)\n\nYou can use the operations on either string as many times as necessary.\n\nGiven two strings, word1 and word2, return true if word1 and word2 are close, and false otherwise.",
  },
  {
    t: "example",
    c: [
      {
        input: 'word1 = "abc", word2 = "bca"',
        output: "true",
        explain:
          'You can attain word2 from word1 in 2 operations. Apply Operation 1: "abc" -> "acb". Apply Operation 1: "acb" -> "bca".',
      },
      {
        input: 'word1 = "a", word2 = "aa"',
        output: "false",
        explain:
          "It is impossible to attain word2 from word1, or vice versa, in any number of operations.",
      },
      {
        input: 'word1 = "cabbba", word2 = "abbccc"',
        output: "true",
        explain:
          'You can attain word2 from word1 in 3 operations. Apply Operation 1: "cabbba" -> "caabbb". Apply Operation 2: "caabbb" -> "baaccc". Apply Operation 2: "baaccc" -> "abbccc".',
      },
    ],
  },
  {
    t: "constraints",
    c: [
      "1 <= word1.length, word2.length <= 10^5",
      "word1 and word2 contain only lowercase English letters.",
    ],
  },

  { t: "h2", c: "Approach — what to use & how to think" },
  {
    t: "p",
    c: "Translate both operations into checkable conditions. Operation 1 (swap) means order doesn’t matter — only which characters appear how often. Operation 2 (swap frequencies) means you can freely re-pair characters with counts, as long as those characters already exist.",
  },
  {
    t: "p",
    c: "So count frequencies with Counter for each string and check two conditions. Don’t try to simulate swaps — that search blows up factorially.",
  },
  {
    t: "ol",
    c: [
      "Build Counters c1, c2 for word1 and word2",
      "Condition 1: set(c1) == set(c2) — same character set (op 2 can only remap existing letters)",
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
  { t: "p", c: "Check both conditions on the official examples." },
  {
    t: "table",
    head: [
      "word1 / word2",
      "Same character set?",
      "Same sorted frequencies?",
      "Result",
    ],
    rows: [
      ["abc / bca", "Yes {a,b,c}", "Yes [1,1,1]", "True"],
      ["a / aa", "Yes {a}", "No [1] vs [2]", "False"],
      ["cabbba / abbccc", "Yes {a,b,c}", "Yes [1,2,3]", "True"],
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
];

export const p23En: Block[] = [
  {
    t: "p",
    c: "Given a 0-indexed n x n integer matrix grid, return the number of pairs (ri, cj) such that row ri and column cj are equal.\n\nA row and column pair is considered equal if they contain the same elements in the same order (i.e., an equal array).",
  },
  {
    t: "example",
    c: [
      {
        input: "grid = [[3,2,1],[1,7,6],[2,7,7]]",
        output: "1",
        explain:
          "There is 1 equal row and column pair: (Row 2, Column 1): [2,7,7].",
      },
      {
        input:
          "grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]",
        output: "3",
        explain:
          "There are 3 equal row and column pairs: (Row 0, Column 0): [3,1,2,2]; (Row 2, Column 2): [2,4,2,2]; (Row 3, Column 2): [2,4,2,2].",
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
];
