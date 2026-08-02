import type { Page } from "@/lib/types";

export const triePages: Record<string, Page> = {
  "lc75-intro-trie": {
    slug: "lc75-intro-trie",
    title: { th: "Trie — พื้นฐาน & แนวคิด", en: "" },
    lead: { th: "tree structure ที่เก็บคำโดย share prefix ร่วมกัน search และเติมคำได้เร็วตามความยาวคำ", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "Trie (อ่านว่า ไทร มาจากคำว่า reTRIEval) หรือ Prefix Tree (ต้นไม้คำนำหน้า) คือ data structure รูป tree (ต้นไม้) ที่ออกแบบมาเพื่อเก็บชุดของ string (คำ) โดยเฉพาะ จุดเด่นคือคำที่ขึ้นต้นเหมือนกันจะ share เส้นทางร่วมกัน ทำให้ search คำหรือ search ว่ามีคำไหนขึ้นต้นด้วย prefix (คำนำหน้า) ที่กำหนดได้เร็วมาก เหมาะกับงานอย่าง autocomplete และตรวจตัวสะกด" },

              { t: "h2", c: "Trie หน้าตาเป็นยังไง" },
              { t: "p", c: "ลองนึกภาพว่าเราเก็บคำว่า cat, car, card ถ้าเก็บเป็น array (ลิสต์) ธรรมดา การ search ว่ามีคำที่ขึ้นต้นด้วย ca ไหมต้อง iterate (วน) ดูทุกคำ แต่ใน trie เราแตกคำออกเป็นตัวอักษรทีละตัว แล้วให้ตัวอักษรที่เหมือนกันตอนต้น share node (โหนด) ร่วมกัน หน้าตาจะเป็นแบบนี้" },
              { t: "code", c: `(root)
           |
           c
           |
           a
          / \\
         t   r        <- cat, car จบตรงนี้
              \\
               d      <- card จบตรงนี้` },
              { t: "p", c: "แต่ละ node เก็บสองอย่าง หนึ่งคือ children (โหนดลูก) ซึ่งเป็น hash map (dict) ที่ map จากตัวอักษรไปยัง child node และสองคือ flag บอกว่ามีคำจบตรงนี้ไหม (is_end) เหตุที่ต้องมี flag จบคำ เพราะ car เป็นทั้งคำจริง และเป็น prefix ของ card เราต้องแยกให้ออกว่า node ตัว r นั้นเป็นจุดจบคำจริง ๆ ไม่ใช่แค่ทางผ่าน" },

              { t: "h2", c: "โครง TrieNode ใน Python" },
              { t: "code", lang: "python", c: `class TrieNode:
            def __init__(self):
                self.children = {}     # dict: ตัวอักษร -> TrieNode ลูก
                self.is_end = False    # True ถ้ามีคำจบที่ node นี้

        # การ insert คำ: ไล่ทีละตัวอักษร ถ้ายังไม่มีเส้นทางก็สร้าง node ใหม่
        def insert(root, word):
            node = root
            for ch in word:
                if ch not in node.children:
                    node.children[ch] = TrieNode()
                node = node.children[ch]
            node.is_end = True   # ปักธงว่าคำจบที่นี่` },

              { t: "h2", c: "ต้นทุนของแต่ละ operation" },
              { t: "p", c: "operation หลักคือ insert (เพิ่มคำ) และ search (ค้นคำ) ทั้งคู่ทำงานโดย traverse (เดินไล่) ตัวอักษรทีละตัวจาก root (ราก) ลงไป จึงใช้เวลาแค่ O(L) เมื่อ L คือความยาวของคำ ไม่ขึ้นกับจำนวนคำทั้งหมดที่เก็บไว้ นี่คือเหตุผลที่ trie เร็วกว่าการ iterate array ทีละคำ" },
              { t: "table", head: ["operation", "time", "หมายเหตุ (note)"], rows: [
                ["insert(word)", "O(L)", "L = ความยาวคำ ไล่สร้าง node ทีละตัวอักษร"],
                ["search(word)", "O(L)", "traverse ตามตัวอักษร แล้วเช็ค is_end ที่ปลาย"],
                ["startsWith(prefix)", "O(L)", "traverse ถึงได้ก็พอ ไม่ต้องเช็ค is_end"],
              ] },
              { t: "callout", title: "จุดที่คนพลาดบ่อย", warn: true, c: "การ search ต้องเช็ค is_end ที่ node สุดท้ายด้วย ไม่ใช่แค่ traverse ถึง node ได้ เช่น ถ้าเก็บแต่ card แล้ว search car จะ traverse ถึง node r ได้ แต่ is_end ตรงนั้นเป็น False จึงต้องตอบว่าไม่มีคำนี้ ส่วน startsWith (search prefix) ไม่ต้องเช็ค is_end แค่ traverse ถึงได้ก็พอ" },

              { t: "callout", title: "พร้อมลุยยัง", c: "หมวดนี้มี 2 ข้อ (LC208, LC1268) กดถัดไปเริ่มข้อแรกได้เลย" },
      ],
      en: [],
    },
  },

  "lc75-p70": {
    slug: "lc75-p70",
    title: { th: "ข้อ 70 · LC208 Implement Trie (Prefix Tree) (สร้าง Trie) 🟡", en: "" },
    lead: { th: "implement class Trie ที่มี insert, search, startsWith โดยแยกคำจริงออกจาก prefix ด้วย is_end", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC208): ให้ implement class Trie ที่จำลอง data structure Prefix Tree ประกอบด้วย constructor Trie() และสาม method คือ insert(word) เพิ่ม string word เข้า trie, search(word) return true ถ้า word เคยถูก insert ไว้ (ตรงกันทั้งคำ) และ startsWith(prefix) return true ถ้ามีคำที่เคย insert ไว้ขึ้นต้นด้วย prefix นี้" },
              {
                t: "example",
                c: [
                  {
                    input: 'Trie(); insert("apple"); search("apple"); search("app"); startsWith("app"); insert("app"); search("app")',
                    output: "null, null, true, false, true, null, true",
                    explain: 'หลัง insert("apple") ตัว search("apple") ตรงทั้งคำจึงได้ true แต่ search("app") ได้ false เพราะยังไม่เคย insert คำว่า app ทั้งคำ ส่วน startsWith("app") ได้ true เพราะ apple ขึ้นต้นด้วย app พอ insert("app") เพิ่มเข้าไป search("app") จึงกลายเป็น true',
                  },
                ],
              },
              {
                t: "constraints",
                c: [
                "1 <= word.length, prefix.length <= 2000",
                "ตัวอักษรอังกฤษพิมพ์เล็กเท่านั้น",
                "เรียก insert, search, startsWith รวมกันได้มากสุด 3 × 10^4 ครั้ง",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ข้อนี้คือการนำ trie มา wrap เป็น class ใช้ TrieNode (โหนด) ที่มี children (hash map ตัวอักษร -> node) และ is_end (flag บอกว่ามีคำจบที่นี่) หัวใจคือแยกความต่างระหว่างมีคำนี้จริงกับมีคำที่ขึ้นต้นด้วยสิ่งนี้ให้ออก" },
              { t: "p", c: "ถ้าเก็บคำเป็น array (ลิสต์) ธรรมดาแล้ว search ด้วยการ iterate ทุกคำ แต่ละครั้งจะช้า O(จำนวนคำ × ความยาว) การใช้ trie ทำให้ทุก operation เหลือ O(ความยาวคำ) ล้วน ๆ" },
              { t: "ol", c: [
                "insert: เริ่มที่ root traverse ตัวอักษรทีละตัว ถ้ายังไม่มีเส้นทางก็สร้าง node ใหม่ พอถึงตัวสุดท้ายปัก is_end = True",
                "สร้าง helper function _find(prefix) ที่ traverse ตามตัวอักษร ถ้าหลุดเส้นทาง return None ไม่งั้น return node ปลายทาง",
                "search(word): เรียก _find แล้วต้องได้ node ที่ไม่ None และ node.is_end เป็น True",
                "startsWith(prefix): เรียก _find แล้วแค่เช็คว่าไม่ None ก็พอ",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", warn: true, c: "ลืมเช็ค is_end ใน search ทำให้ search('app') ตอบ True ทั้งที่ยังไม่เคย insert คำว่า app อีกจุดคือต้องเริ่ม traverse จาก self.root ใหม่ทุกครั้ง อย่าใช้ node ค้างจากการเรียกก่อนหน้า" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `class TrieNode:
            def __init__(self):
                self.children = {}     # ตัวอักษร -> TrieNode
                self.is_end = False

        class Trie:
            def __init__(self):
                self.root = TrieNode()

            def insert(self, word):
                node = self.root
                for ch in word:
                    if ch not in node.children:
                        node.children[ch] = TrieNode()   # ยังไม่มีเส้นทาง สร้างใหม่
                    node = node.children[ch]
                node.is_end = True                        # ปักธงว่าคำจบที่นี่

            def _find(self, prefix):
                # เดินตามตัวอักษร ถ้าหลุดเส้นทางเมื่อไรคืน None
                node = self.root
                for ch in prefix:
                    if ch not in node.children:
                        return None
                    node = node.children[ch]
                return node

            def search(self, word):
                node = self._find(word)
                # ต้องเดินถึง และมีคำจบตรงนั้นจริง
                return node is not None and node.is_end

            def startsWith(self, prefix):
                # แค่เดินถึงได้ก็พอ ไม่ต้องสน is_end
                return self._find(prefix) is not None

        trie = Trie()
        trie.insert("apple")
        print(trie.search("apple"))      # True
        print(trie.search("app"))        # False
        print(trie.startsWith("app"))    # True
        trie.insert("app")
        print(trie.search("app"))        # True`, out: `True
        False
        True
        True` },
                { t: "p", c: "หัวใจของข้อนี้คือแยกความต่างระหว่างมีคำนี้จริงกับมีคำที่ขึ้นต้นด้วยสิ่งนี้ให้ออก เราจึงดึงส่วนที่ซ้ำกัน (การ traverse ตามตัวอักษรจนสุด prefix) ออกมาเป็น function _find ที่ return node ปลายทางหรือ None แล้ว search เพิ่มเงื่อนไขเช็ค is_end ส่วน startsWith แค่ดูว่าไม่ None" },
                { t: "p", c: "ถ้าไม่แยก _find ก็เขียนได้เหมือนกันแต่โค้ดจะซ้ำสองรอบ การดึงออกมาช่วยให้ search กับ startsWith ต่างกันแค่บรรทัดสุดท้าย อ่านง่ายและลดโอกาสพลาด" },
                { t: "p", c: "Time O(L) ต่อการเรียกหนึ่งครั้ง เมื่อ L คือความยาวคำหรือ prefix · Space O(จำนวนตัวอักษรทั้งหมดที่เก็บ) กรณีแย่สุดคือทุกคำไม่ share prefix กันเลย" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "Trie เหมาะกับงาน search คำ/prefix จำนวนมาก key คือ children เป็น hash map และ is_end แยกคำจริงจากทางผ่าน จำ template insert/_find นี้ไว้ ต่อยอดได้อีกหลายข้อ" },
      ],
      en: [],
    },
  },

  "lc75-p71": {
    slug: "lc75-p71",
    title: { th: "ข้อ 71 · LC1268 Search Suggestions System (ระบบแนะนำคำค้น) 🟡", en: "" },
    lead: { th: "แนะนำสินค้าไม่เกิน 3 ชื่อตาม lexicographic order ทุกครั้งที่พิมพ์เพิ่มทีละตัว โดย sort (เรียง) ก่อนแล้วเก็บ suggestions ที่แต่ละ node", en: "" },
    group: "LeetCode 75",
    blocks: {
      th: [
              { t: "p", c: "โจทย์ (LC1268): กำหนด array of string ชื่อ products และ string ชื่อ searchWord ให้ออกแบบระบบที่แนะนำชื่อสินค้าไม่เกิน 3 ชื่อจาก products หลังจากผู้ใช้พิมพ์ตัวอักษรแต่ละตัวของ searchWord สินค้าที่แนะนำต้องมี common prefix (คำนำหน้าร่วม) กับสิ่งที่พิมพ์มาแล้ว ถ้ามีมากกว่า 3 ชื่อที่ตรงเงื่อนไข ให้เลือก 3 ชื่อที่เรียงตาม lexicographical order (พจนานุกรม) น้อยที่สุด แล้ว return เป็น list of list ของคำแนะนำหลังพิมพ์ตัวอักษรแต่ละตัว" },
              {
                t: "example",
                c: [
                  {
                    input: 'products = ["mobile", "mouse", "moneypot", "monitor", "mousepad"], searchWord = "mouse"',
                    output: '[["mobile","moneypot","monitor"], ["mobile","moneypot","monitor"], ["mouse","mousepad"], ["mouse","mousepad"], ["mouse","mousepad"]]',
                    explain: "พิมพ์ m, mo, mou ได้ 3 ชื่อแรกตามพจนานุกรมที่ขึ้นต้นด้วยสิ่งที่พิมพ์คือ mobile, moneypot, monitor พอพิมพ์ mous, mouse เหลือแค่ mouse กับ mousepad ที่ยังตรง prefix",
                  },
                  {
                    input: 'products = ["havana"], searchWord = "havana"',
                    output: '[["havana"], ["havana"], ["havana"], ["havana"], ["havana"], ["havana"]]',
                    explain: "มีสินค้าตัวเดียวในระบบและตรง prefix ทุกตัวอักษรที่พิมพ์ จึงถูกแนะนำซ้ำทุกครั้งจนพิมพ์ครบคำ",
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
                "ผลรวมความยาวของ products ทั้งหมดไม่เกิน 2 × 10^4",
                ],
              },

              { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
              { t: "p", c: "ข้อนี้ใช้ trie ผสมกับการ sort (เรียง) ล่วงหน้า idea คือถ้า sort products ก่อนหนึ่งครั้ง แล้วค่อย insert ลง trie คำที่ผ่านแต่ละ node จะมาตาม lexicographic order อยู่แล้ว เราจึงเก็บแค่ 3 ตัวแรกที่แต่ละ node พอ" },
              { t: "p", c: "วิธีตรงไปตรงมาคือทุกครั้งที่พิมพ์ ก็ filter products ทั้งหมดที่ขึ้นต้นด้วย prefix แล้ว sort เอา 3 ตัวแรก ซึ่งทำงานซ้ำ ๆ และช้าเมื่อพิมพ์ยาว ๆ การเก็บ suggestions ไว้ที่แต่ละ node ตั้งแต่ตอนสร้าง trie ทำให้ตอนตอบแค่ traverse (เดินไล่) ตาม prefix แล้วหยิบออกมาได้ทันที" },
              { t: "ol", c: [
                "sort products ก่อนหนึ่งครั้ง",
                "insert แต่ละคำลง trie ไล่ตัวอักษร ระหว่าง traverse ให้ append (ต่อท้าย) คำนั้นเข้า node.suggestions ถ้ายังเก็บไม่ถึง 3 ตัว",
                "ตอบ searchWord: traverse ตามตัวอักษรที่พิมพ์ทีละตัวจาก root ถ้ายัง traverse ได้ก็หยิบ node.suggestions ใส่ผลลัพธ์",
                "ถ้าหลุดเส้นทางเมื่อไร ตั้ง node = None แล้ว append [] ให้ตัวอักษรที่เหลือทั้งหมด",
              ] },
              { t: "callout", title: "จุดพลาดที่พบบ่อย", warn: true, c: "พอพิมพ์ตัวอักษรที่ทำให้หลุดเส้นทางใน trie แล้ว ตัวอักษรที่เหลือหลังจากนั้นต้องแนะนำเป็นลิสต์ว่างทั้งหมด อย่าหยุดเติมผลลัพธ์ ต้องเติม [] ต่อไปให้ครบความยาว searchWord" },

              { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
                { t: "codeout", lang: "python", label: "เฉลย (Python) — โค้ดนี้รันได้จริง", code: `class TrieNode:
            def __init__(self):
                self.children = {}
                self.suggestions = []   # สินค้าไม่เกิน 3 ตัวแรก (เรียงแล้ว) ที่ผ่าน node นี้

        def suggested_products(products, searchWord):
            root = TrieNode()

            # sort ก่อน เพื่อให้คำที่ใส่เข้า trie มาตามลำดับพจนานุกรม
            for product in sorted(products):
                node = root
                for ch in product:
                    if ch not in node.children:
                        node.children[ch] = TrieNode()
                    node = node.children[ch]
                    # เก็บได้แค่ 3 ตัวแรกพอ (มาตามลำดับ sort อยู่แล้ว)
                    if len(node.suggestions) < 3:
                        node.suggestions.append(product)

            result = []
            node = root
            for ch in searchWord:
                # ถ้ายังเดินตาม prefix ได้ ก็หยิบ suggestions ที่ node นั้น
                if node and ch in node.children:
                    node = node.children[ch]
                    result.append(node.suggestions)
                else:
                    # หลุดเส้นทางแล้ว ที่เหลือไม่มีคำแนะนำ
                    node = None
                    result.append([])
            return result

        print(suggested_products(
            ["mobile", "mouse", "moneypot", "monitor", "mousepad"], "mouse"))
        # [['mobile','moneypot','monitor'], ['mobile','moneypot','monitor'],
        #  ['mouse','mousepad'], ['mouse','mousepad'], ['mouse','mousepad']]`, out: `[['mobile', 'moneypot', 'monitor'], ['mobile', 'moneypot', 'monitor'], ['mouse', 'mousepad'], ['mouse', 'mousepad'], ['mouse', 'mousepad']]` },
                { t: "p", c: "ไอเดียคือ sort products ก่อนหนึ่งครั้ง ทำให้เวลาไล่ insert คำเข้า trie ตามลำดับ ทุก node จะได้รับสินค้าตาม lexicographic order อยู่แล้ว เราจึงเก็บแค่ 3 ตัวแรกที่ผ่าน node นั้นไว้ใน suggestions เมื่อผู้ใช้พิมพ์ prefix มาเรื่อย ๆ ก็แค่ traverse ตามตัวอักษรแล้วหยิบ suggestions ที่ node ปลายทางออกมาได้ทันที ไม่ต้อง search ใหม่ทุกครั้ง" },
                { t: "p", c: "จุดสำคัญคือเมื่อพิมพ์ตัวอักษรที่ทำให้หลุดเส้นทางใน trie (ไม่มีสินค้าไหนขึ้นต้นแบบนั้นแล้ว) ตัวอักษรที่เหลือหลังจากนั้นต้องแนะนำเป็น empty list (ลิสต์ว่าง) ทั้งหมด โค้ดจึงตั้ง node = None แล้ว append [] ต่อไปเรื่อย ๆ" },
                { t: "p", c: "Time O(N log N + total) โดย N คือจำนวนสินค้า มาจากการ sort (N log N) บวกกับการสร้าง trie ตามจำนวนตัวอักษรรวมของทุกคำ ส่วนการตอบ searchWord ใช้ O(ความยาว searchWord) · Space O(total) เก็บตัวอักษรทั้งหมดใน trie (แต่ละ node เก็บ suggestions ไม่เกิน 3)" },
              ] },

              { t: "callout", title: "💡 สรุป pattern", c: "เมื่อต้องตอบ prefix query ซ้ำ ๆ ให้ preprocess (ประมวลผลล่วงหน้า) — sort + เก็บ suggestions ที่ node แลก memory นิดหน่อยเพื่อให้ตอบแต่ละครั้งเร็วในหนึ่งการ traverse — เป็นแก่นของระบบ autocomplete" },
      ],
      en: [],
    },
  },
};
