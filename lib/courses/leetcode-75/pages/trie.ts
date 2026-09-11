import type { Page } from "@/lib/types";

export const triePages: Record<string, Page> = {
  "lc75-intro-trie": {
    slug: "lc75-intro-trie",
    title: {
      th: "Trie (Prefix Tree) — พื้นฐาน & แนวคิด",
      en: "Trie (Prefix Tree) — Fundamentals & Mental Models",
    },
    lead: {
      th: "โครงสร้างข้อมูลรูปต้นไม้ที่คำซึ่งขึ้นต้นเหมือนกันจะใช้โหนดนำหน้าร่วมกัน (Prefix Sharing) ทำให้ค้นหาและแนะนำคำได้เร็วตามความยาวของคำ",
      en: "Tree-based data structure where words sharing common prefixes branch from shared nodes, providing O(L) retrieval independent of dictionary size.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "Trie (อ่านว่า \'ทรี\' หรือ \'ไทร\' มาจากคำว่า re**TRIE**val) หรือ **Prefix Tree (ต้นไม้คำนำหน้า)** คือโครงสร้างข้อมูลรูปต้นไม้ที่ออกแบบมาเพื่อจัดการกับข้อมูลประเภทข้อความหรือสตริง (Strings) โดยเฉพาะ\n\nจุดเด่นที่สุดของ Trie คือ: **คำทุกคำที่ขึ้นต้นด้วยตัวอักษรเดียวกัน จะแชร์เส้นทางเดินร่วมกัน** ทำให้เราสามารถค้นหาคำ ตรวจสอบคำนำหน้า หรือสร้างระบบ Autocomplete แนะนำคำค้นหาได้อย่างรวดเร็วมหาศาลในระดับ $O(L)$ โดยที่ $L$ คือความยาวของคำค้นหาเท่านั้น!",
        },
        {
          t: "h2",
          c: "ส่วนที่ 1 · ภาพในหัว: กิ่งก้านที่แชร์ตัวอักษรร่วมกัน",
        },
        {
          t: "p",
          c: "สมมติเราต้องการบันทึกคำ 3 คำ ได้แก่: `'cat'`, `'car'`, และ `'card'`\nหากเก็บใน List ธรรมดา เราต้องเสียพื้นที่เก็บตัวอักษร 'c' และ 'a' ซ้ำๆ ถึง 3 ครั้ง แต่ใน Trie ทั้งสามคำจะแชร์กิ่งก้านเดียวกัน:",
        },
        {
          t: "code",
          lang: "text",
          label: "Trie Tree Structure",
          c: `        (root)
           |
          [c]
           |
          [a]
         /   \
       [t]*   [r]*   <- * คือ is_end = True (จบคำว่า cat, car)
               |
              [d]*   <- * คือ is_end = True (จบคำว่า card)`,
        },
        {
          t: "h2",
          c: "ส่วนที่ 2 · โครงสร้างพื้นฐานของ TrieNode",
        },
        {
          t: "p",
          c: "ในแต่ละโหนด (`TrieNode`) ประกอบด้วย 2 สิ่งสำคัญเสมอ:",
        },
        {
          t: "ol",
          c: [
            "**children (โหนดลูก):** พจนานุกรมหรืออาร์เรย์ที่ชี้ไปยังตัวอักษรถัดไป (เช่น `children['a'] -> TrieNode`)",
            "**is_end (ธงระบุการสิ้นสุดคำ):** เครื่องหมาย Boolean ที่บอกว่า 'ณ โหนดนี้ มีคำที่สมบูรณ์จบลงหรือไม่' ตัวอย่างเช่น โหนด `'r'` ต้องมี `is_end = True` เพราะ `'car'` เป็นคำที่มีความหมาย แม้จะมีตัว `'d'` ต่องวดเป็น `'card'` ก็ตาม",
          ],
        },
        {
          t: "code",
          lang: "python",
          label: "Standard TrieNode Blueprint",
          c: `class TrieNode:
    def __init__(self):
        # เก็บตัวอักษรลูก {'ตัวอักษร': TrieNode()}
        self.children = {}
        # ระบุว่ามีคำที่สมบูรณ์มาสิ้นสุดที่โหนดนี้หรือไม่
        self.is_end = False`,
        },
        {
          t: "h2",
          c: "ส่วนที่ 3 · ต้นทุนเวลา (Time Complexity)",
        },
        {
          t: "table",
          head: ["การทำงาน (Operation)", "เวลา (Time Complexity)", "คำอธิบาย"],
          rows: [
            ["insert(word)", "O(L)", "เดินสร้างหรือขยายกิ่งทีละตัวอักษรตามความยาวคำ $L$"],
            ["search(word)", "O(L)", "เดินตามเส้นทางจนสุดคำ แล้วเช็คว่า `is_end == True` หรือไม่"],
            ["startsWith(prefix)", "O(L)", "เดินตามเส้นทางจนสุด prefix ขอแค่ไม่หลุดเส้นทางก็ตอบ True ทันที"],
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "A Trie (Prefix Tree) is an ordered tree data structure used to store a dynamic set or associative array where the keys are usually strings. Unlike a binary search tree, no node in the tree stores the key associated with that node; instead, its position in the tree defines the key with which it is associated.",
        },
        {
          t: "h2",
          c: "Part 1 · Mental Model: Prefix Sharing",
        },
        {
          t: "p",
          c: "Words with identical prefixes share the same path from the root node. A boolean flag `is_end` differentiates full words from intermediate prefixes.",
        },
        {
          t: "h2",
          c: "Part 2 · Operational Time Complexities",
        },
        {
          t: "p",
          c: "All primary operations (`insert`, `search`, `startsWith`) execute in $O(L)$ time, where $L$ is the string length, completely independent of how many words exist in the dictionary.",
        },
      ],
    },
  },

  "lc75-p70": {
    slug: "lc75-p70",
    title: {
      th: "ข้อ 70 · LC208 Implement Trie (Prefix Tree) (สร้างคลาส Trie) 🟡",
      en: "Problem 70 · LC208 Implement Trie (Prefix Tree) 🟡",
    },
    lead: {
      th: "สร้างคลาส Trie ที่รองรับการเพิ่มคำ (insert) ค้นหาคำเต็ม (search) และค้นหาคำนำหน้า (startsWith) ด้วย TrieNode",
      en: "Implement a full prefix tree supporting insert, search, and startsWith operations.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 208: Implement Trie (Prefix Tree)**\n\nจงสร้างคลาส `Trie` เพื่อจำลองโครงสร้างข้อมูล Prefix Tree โดยประกอบไปด้วยฟังก์ชันต่อไปนี้:\n1. `Trie()`: ตัวสร้าง (Constructor) สำหรับกำหนดค่าเริ่มต้นของต้นไม้\n2. `void insert(String word)`: นำสตริง `word` ใส่เข้าไปใน Trie\n3. `boolean search(String word)`: คืนค่า `True` หากสตริง `word` เคยถูกบันทึกไว้ใน Trie (ต้องตรงกันทั้งคำ)\n4. `boolean startsWith(String prefix)`: คืนค่า `True` หากมีคำใน Trie ที่ขึ้นต้นด้วยสตริง `prefix`",
        },
        {
          t: "example",
          c: [
            {
              input: 'trie = Trie()\ntrie.insert("apple")\ntrie.search("apple")   // return True\ntrie.search("app")     // return False\ntrie.startsWith("app") // return True\ntrie.insert("app")\ntrie.search("app")     // return True',
              output: "[null, null, true, false, true, null, true]",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= word.length, prefix.length <= 2000",
            "word และ prefix ประกอบด้วยตัวอักษรภาษาอังกฤษพิมพ์เล็กเท่านั้น",
            "มีการเรียกใช้งาน insert, search, startsWith รวมกันไม่เกิน 3 * 10^4 ครั้ง",
          ],
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "h2",
              c: "ขั้นที่ 1 · โจทย์นี้ขออะไร?",
            },
            {
              t: "p",
              c: "โจทย์ให้เราสร้างโครงสร้างข้อมูล Trie ตั้งแต่ต้น (From Scratch)\nหัวใจสำคัญที่สุดของข้อนี้คือ **การแยกความแตกต่างระหว่าง `search(word)` กับ `startsWith(prefix)`**:\n- `search('app')`: ต้องตอบว่ามีคำว่า `'app'` อยู่จริงหรือไม่ (ต้องดูว่าตัว `'p'` ตัวที่สองมี `is_end == True` หรือไม่)\n- `startsWith('app')`: ขอแค่มีเส้นทาง `'a' -> 'p' -> 'p'` อยู่ในต้นไม้ก็เพียงพอแล้ว (ไม่ต้องสนใจ `is_end`)",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · ทำให้ได้ด้วยมือ",
            },
            {
              t: "p",
              c: "1. เริ่มต้นด้วย `root = TrieNode()` ที่ว่างเปล่า\n2. เมื่อ `insert('apple')`: เดินสร้างโหนด `a -> p -> p -> l -> e` และปักธง `is_end = True` ที่โหนด `e`\n3. เมื่อ `search('apple')`: เดินตามเส้นทางพบโหนด `e` และตรวจสอบพบว่า `is_end == True` → ตอบ `True`\n4. เมื่อ `search('app')`: เดินตามเส้นทางพบโหนด `p` ตัวที่สอง แต่โหนดนี้ `is_end == False` → ตอบ `False`\n5. เมื่อ `startsWith('app')`: เดินตามเส้นทางพบโหนด `p` ตัวที่สองได้โดยไม่หลุดเส้นทาง → ตอบ `True` ทันที",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ (การออกแบบ Helper Function `_find`)",
            },
            {
              t: "p",
              c: "สังเกตว่าทั้ง `search` และ `startsWith` มีกระบวนการเหมือนกัน 90% นั่นคือ 'เดินตามตัวอักษรทีละตัว' เราจึงควรเขียนฟังก์ชันช่วยชื่อ `_find(prefix)` เพื่อลดโค้ดซ้ำซ้อน:\n- `_find(prefix)`: เดินตามตัวอักษร หากตัวใดไม่มีใน `node.children` ให้คืน `None` ทันที หากเดินจนครบ ให้คืนโหนดปลายทาง\n- `search(word)`: เรียก `node = _find(word)` แล้วคืนค่า `node is not None and node.is_end`\n- `startsWith(prefix)`: เรียก `node = _find(prefix)` แล้วคืนค่า `node is not None`",
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "table",
              head: ["คำสั่ง", "การเดินทางใน Trie", "สถานะปลายทาง", "ผลลัพธ์ที่คืนค่า"],
              rows: [
                ["insert('apple')", "root -> a -> p -> p -> l -> e", "e.is_end = True", "None"],
                ["search('apple')", "เดินถึงโหนด e", "e.is_end คือ True", "True"],
                ["search('app')", "เดินถึงโหนด p ตัวที่ 2", "p.is_end คือ False", "False"],
                ["startsWith('app')", "เดินถึงโหนด p ตัวที่ 2", "โหนดมีอยู่จริง (not None)", "True"],
                ["insert('app')", "เดินถึงโหนด p ตัวที่ 2", "เปลี่ยน p.is_end = True", "None"],
                ["search('app')", "เดินถึงโหนด p ตัวที่ 2", "p.is_end คือ True แล้ว", "True"],
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `class TrieNode:
    def __init__(self):
        # พจนานุกรมเก็บตัวอักษรถัดไป
        self.children = {}
        # ธงบอกว่ามีคำสิ้นสุดที่โหนดนี้หรือไม่
        self.is_end = False

class Trie:
    def __init__(self):
        # จุดเริ่มต้นของ Trie คือโหนดรากที่ว่างเปล่า
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            # หากยังไม่มีกิ่งตัวอักษรนี้ ให้สร้างโหนดใหม่
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        # เมื่อใส่ครบทุกตัวอักษร ปักธงว่าคำจบที่นี่
        node.is_end = True

    def _find(self, prefix: str):
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node

    def search(self, word: str) -> bool:
        node = self._find(word)
        # ต้องเดินถึงปลายทางได้ และมีคำจบที่นั่นจริง
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        # ขอแค่เดินตามเส้นทางได้ครบทุกตัวอักษร
        return self._find(prefix) is not None`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["ส่วนของโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["class TrieNode:", "สร้างพิมพ์เขียวของแต่ละโหนด มี `children` (dict) และ `is_end` (bool)"],
                ["self.root = TrieNode()", "โหนดรากของ Trie ไม่มีตัวอักษรประจำตัว เป็นจุดตั้งต้นเสมอ"],
                ["if ch not in node.children: node.children[ch] = TrieNode()", "ขยายกิ่งก้านใหม่เฉพาะเมื่อยังไม่เคยมีตัวอักษรนี้มาก่อน"],
                ["def _find(self, prefix):", "ฟังก์ชันรวมศูนย์การเดินในต้นไม้ ช่วยให้โค้ดสะอาดและไม่ซ้ำซ้อน"],
                ["return node is not None and node.is_end", "หัวใจของ search: ตรวจสอบทั้งการมีอยู่ของเส้นทางและความสมบูรณ์ของคำ"],
                ["return self._find(prefix) is not None", "หัวใจของ startsWith: ตรวจสอบเพียงการมีอยู่ของเส้นทางเท่านั้น"],
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 7 · ต้นทุน (Time & Space Complexity)",
            },
            {
              t: "table",
              head: ["มิติ", "ความซับซ้อน", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(L)", "ทุก Method (`insert`, `search`, `startsWith`) วนลูปตามความยาวของคำ $L$ เท่านั้น"],
                ["Space (หน่วยความจำ)", "O(N * L)", "กรณีแย่ที่สุดคือทุกคำไม่มีตัวอักษรนำหน้าร่วมกันเลย จะต้องสร้างโหนดเท่ากับจำนวนตัวอักษรทั้งหมด"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 208: Implement Trie (Prefix Tree)**\n\nA **trie** (pronounced as \'try\') or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the `Trie` class:\n- `Trie()` Initializes the trie object.\n- `void insert(String word)` Inserts the string `word` into the trie.\n- `boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., was inserted before), and `false` otherwise.\n- `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.",
        },
        {
          t: "example",
          c: [
            {
              input: 'trie = Trie(); trie.insert("apple"); trie.search("apple"); trie.search("app"); trie.startsWith("app"); trie.insert("app"); trie.search("app")',
              output: "[null, null, true, false, true, null, true]",
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= word.length, prefix.length <= 2000",
            "At most 3 * 10^4 calls in total to insert, search, and startsWith.",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · Implementation Strategy",
            },
            {
              t: "p",
              c: "Define a `TrieNode` with a `children` dictionary and an `is_end` flag. Create a helper method `_find(prefix)` to traverse the tree. `search` requires `node and node.is_end`, whereas `startsWith` only requires `node is not None`.",
            },
            {
              t: "h2",
              c: "Step 2 · Python Solution",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def _find(self, prefix: str):
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node

    def search(self, word: str) -> bool:
        node = self._find(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._find(prefix) is not None`,
            },
            {
              t: "h2",
              c: "Step 3 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(L)$ for each method, where $L$ is word/prefix length.\n- **Space Complexity:** $O(N \times L)$ in total where $N$ is word count and $L$ is average length.",
            },
          ],
        },
      ],
    },
  },

  "lc75-p71": {
    slug: "lc75-p71",
    title: {
      th: "ข้อ 71 · LC1268 Search Suggestions System (ระบบแนะนำคำค้นหา) 🟡",
      en: "Problem 71 · LC1268 Search Suggestions System 🟡",
    },
    lead: {
      th: "แนะนำสินค้าไม่เกิน 3 ชื่อที่เรียงตามพจนานุกรมในทุกๆ ตัวอักษรที่พิมพ์ โดยจัดเรียงก่อนแล้วเก็บใน Trie",
      en: "Recommend up to 3 lexicographically sorted product names after typing each character of a search query.",
    },
    group: "LeetCode 75",
    blocks: {
      th: [
        {
          t: "p",
          c: "**LeetCode 1268: Search Suggestions System**\n\nกำหนดอาร์เรย์ของสตริง `products` และสตริง `searchWord`\nคุณต้องการออกแบบระบบแนะนำคำค้นหา (Search Suggestions / Autocomplete) โดยหลังจากที่ผู้ใช้งานพิมพ์ตัวอักษรแต่ละตัวของ `searchWord` ระบบจะต้องแนะนำชื่อสินค้า **ไม่เกิน 3 ชื่อ** จาก `products` ที่มีคำนำหน้า (Prefix) ตรงกับข้อความที่ผู้ใช้พิมพ์มาจนถึงตัวอักษรนั้น\n\nหากมีสินค้าที่ตรงเงื่อนไขมากกว่า 3 ชื่อ ให้เลือก **3 ชื่อที่มีลำดับตามพจนานุกรม (Lexicographical Order) น้อยที่สุด**\n\nจงคืนค่าผลลัพธ์เป็น List of Lists ของคำแนะนำหลังจากพิมพ์ตัวอักษรแต่ละตัวของ `searchWord`",
        },
        {
          t: "example",
          c: [
            {
              input: 'products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"',
              output: '[["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]',
              explain: "พิมพ์ 'm' -> ['mobile','moneypot','monitor']\nพิมพ์ 'mo' -> ['mobile','moneypot','monitor']\nพิมพ์ 'mou' -> ['mouse','mousepad']\nพิมพ์ 'mous' -> ['mouse','mousepad']\nพิมพ์ 'mouse' -> ['mouse','mousepad']",
            },
            {
              input: 'products = ["havana"], searchWord = "havana"',
              output: '[["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]',
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= products.length <= 1000",
            "1 <= products[i].length <= 3000",
            "ข้อความใน products ไม่ซ้ำกัน",
            "1 <= searchWord.length <= 1000",
            "ผลรวมความยาวของคำใน products ทั้งหมดไม่เกิน 2 * 10^4",
          ],
        },
        {
          t: "solution",
          summary: "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน",
          c: [
            {
              t: "h2",
              c: "ขั้นที่ 1 · โจทย์นี้ขออะไร?",
            },
            {
              t: "p",
              c: "โจทย์จำลองช่อง Search Bar ในเว็บไซต์ E-Commerce เช่น เมื่อพิมพ์ตัว `'m'` ระบบจะแสดงสินค้า 3 ชิ้นแรกที่ขึ้นต้นด้วย `'m'` เมื่อพิมพ์ตัว `'o'` ต่อเป็น `'mo'` ผลลัพธ์จะแคบลงเหลือสินค้าที่ขึ้นต้นด้วย `'mo'`\n\nหากเราใช้วิธีค้นหาแบบตรงๆ ทุกรอบ จะต้องวนลูปตรวจและเรียงลำดับสินค้าใหม่ทุกครั้งที่พิมพ์ ซึ่งทำงานช้ามาก แต่ถ้าเราใช้ **Trie ที่เตรียมคำแนะนำ (Precomputed Suggestions) ไว้ล่วงหน้า** เราจะสามารถดึงคำตอบออกมาได้ทันทีในเวลา $O(1)$ ต่อตัวอักษร!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 2 · เคล็ดลับการจัดเรียงล่วงหน้า (Sort First)",
            },
            {
              t: "p",
              c: "หากเรานำ `products` มาจัดเรียงตามลำดับพจนานุกรมก่อน (`products.sort()`):\nเมื่อเราทยอยใส่คำลงใน Trie แต่ละโหนดจะได้รับคำตามลำดับพจนานุกรมอย่างถูกต้อง 100% เสมอ!\n\nดังนั้น ในแต่ละโหนด `TrieNode` เราแค่พก List ชื่อ `suggestions = []` ไว้:\n- ทุกครั้งที่คำใดเดินผ่านโหนดนี้ หาก `len(node.suggestions) < 3` ให้บันทึกชื่อคำนั้นลงไป\n- เมื่อเต็ม 3 คำแล้ว ไม่ต้องบันทึกเพิ่มอีกต่อไป!",
            },
            {
              t: "h2",
              c: "ขั้นที่ 3 · วิธีทำ",
            },
            {
              t: "ol",
              c: [
                "จัดเรียง `products` ตามลำดับตัวอักษรพจนานุกรม",
                "สร้าง Trie โดยในแต่ละ `TrieNode` มีฟิลด์ `suggestions = []` เก็บไม่เกิน 3 คำ",
                "เพิ่มสินค้าทุกตัวลงใน Trie พร้อมบันทึกลง `node.suggestions` ของทุกโหนดที่เดินผ่าน",
                "วนลูปตามตัวอักษรของ `searchWord`:\n  - หากเดินตามเส้นทางใน Trie ได้: เพิ่ม `node.suggestions` เข้าผลลัพธ์\n  - หากหลุดเส้นทาง (ไม่มีสินค้านำหน้าแบบนี้): ให้ `node = None` และใส่ `[]` ลงในผลลัพธ์สำหรับตัวอักษรที่เหลือทั้งหมด",
                "คืนค่าผลลัพธ์",
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 4 · ดูทีละขั้น (Step-by-step Trace)",
            },
            {
              t: "table",
              head: ["ตัวอักษรที่พิมพ์", "prefix ปัจจุบัน", "คำแนะนำใน node.suggestions (สูงสุด 3 คำ)"],
              rows: [
                ["'m'", "m", "['mobile', 'moneypot', 'monitor']"],
                ["'o'", "mo", "['mobile', 'moneypot', 'monitor']"],
                ["'u'", "mou", "['mouse', 'mousepad']"],
                ["'s'", "mous", "['mouse', 'mousepad']"],
                ["'e'", "mouse", "['mouse', 'mousepad']"],
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 5 · โค้ดสำหรับวางใน LeetCode",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `from typing import List

class TrieNode:
    def __init__(self):
        self.children = {}
        # เก็บชื่อสินค้าสูงสุด 3 ชื่อที่เรียงตามพจนานุกรมแล้ว
        self.suggestions = []

class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        root = TrieNode()
        
        # จัดเรียงสินค้าตามลำดับพจนานุกรมก่อนเสมอ
        for product in sorted(products):
            node = root
            for ch in product:
                if ch not in node.children:
                    node.children[ch] = TrieNode()
                node = node.children[ch]
                # เก็บไม่เกิน 3 คำต่อโหนด
                if len(node.suggestions) < 3:
                    node.suggestions.append(product)
                    
        result = []
        node = root
        for ch in searchWord:
            if node and ch in node.children:
                node = node.children[ch]
                result.append(node.suggestions)
            else:
                # หลุดเส้นทางแล้ว สตริงที่เหลือจะไม่มีคำแนะนำเลย
                node = None
                result.append([])
                
        return result`,
            },
            {
              t: "h2",
              c: "ขั้นที่ 6 · อ่านโค้ดทีละส่วน",
            },
            {
              t: "table",
              head: ["บรรทัดโค้ด", "หน้าที่ & กลไก"],
              rows: [
                ["self.suggestions = []", "แต่ละโหนดเก็บคำแนะนำ 3 คำแรกที่ผ่านเข้ามา"],
                ["for product in sorted(products):", "จัดเรียงคำทั้งหมดก่อนนำเข้า เพื่อให้คำที่ถูกใส่เรียงตามพจนานุกรมโดยอัตโนมัติ"],
                ["if len(node.suggestions) < 3: node.suggestions.append(product)", "จำกัดคำแนะนำไว้ที่ 3 อันดับแรกอย่างแม่นยำ"],
                ["if node and ch in node.children:", "ตรวจสอบว่าเส้นทางคำนำหน้ายังคงมีอยู่ในคลังสินค้าหรือไม่"],
                ["else: node = None; result.append([])", "หากหลุดเส้นทาง ให้ส่งลิสต์ว่างสำหรับตัวอักษรนี้และตัวถัดไปทั้งหมด"],
              ],
            },
            {
              t: "h2",
              c: "ขั้นที่ 7 · ต้นทุน (Time & Space Complexity)",
            },
            {
              t: "table",
              head: ["มิติ", "ความซับซ้อน", "เหตุผล"],
              rows: [
                ["Time (เวลา)", "O(N log N + Total_chars + L)", "จัดเรียงสินค้า $O(N \log N)$, สร้าง Trie ตามจำนวนตัวอักษรทั้งหมด, และค้นหาตามความยาว searchWord $L$"],
                ["Space (หน่วยความจำ)", "O(Total_chars)", "หน่วยความจำสำหรับเก็บโหนดใน Trie และคำแนะนำ"],
              ],
            },
          ],
        },
      ],
      en: [
        {
          t: "p",
          c: "**LeetCode 1268: Search Suggestions System**\n\nYou are given an array of strings `products` and a string `searchWord`. Design a system that suggests at most three product names from `products` after each character of `searchWord` is typed. Suggested products should have common prefix with `searchWord`. If there are more than three products with a common prefix return the three lexicographically minimums products.\n\nReturn a list of lists of the suggested products after each character of `searchWord` is typed.",
        },
        {
          t: "example",
          c: [
            {
              input: 'products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"',
              output: '[["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]',
            },
          ],
        },
        {
          t: "constraints",
          c: [
            "1 <= products.length <= 1000",
            "1 <= searchWord.length <= 1000",
          ],
        },
        {
          t: "solution",
          summary: "Full Solution · Try it yourself first",
          c: [
            {
              t: "h2",
              c: "Step 1 · Sort then Insert",
            },
            {
              t: "p",
              c: "Sort `products` lexicographically first. When inserting each product into the Trie, append it to `node.suggestions` (up to 3 items per node). When querying with `searchWord`, simply traverse character by character and append `node.suggestions`.",
            },
            {
              t: "h2",
              c: "Step 2 · Python Solution",
            },
            {
              t: "code",
              lang: "python",
              label: "Python3 Solution",
              c: `from typing import List

class TrieNode:
    def __init__(self):
        self.children = {}
        self.suggestions = []

class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        root = TrieNode()
        for product in sorted(products):
            node = root
            for ch in product:
                if ch not in node.children:
                    node.children[ch] = TrieNode()
                node = node.children[ch]
                if len(node.suggestions) < 3:
                    node.suggestions.append(product)
                    
        result = []
        node = root
        for ch in searchWord:
            if node and ch in node.children:
                node = node.children[ch]
                result.append(node.suggestions)
            else:
                node = None
                result.append([])
        return result`,
            },
            {
              t: "h2",
              c: "Step 3 · Complexity Analysis",
            },
            {
              t: "p",
              c: "- **Time Complexity:** $O(N \log N + \text{Total\_chars} + L)$.\n- **Space Complexity:** $O(\text{Total\_chars})$ for Trie allocation.",
            },
          ],
        },
      ],
    },
  },
};
