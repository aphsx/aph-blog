import type { Page } from "@/lib/types";

export const triePages: Record<string, Page> = {
  "lc75-intro-trie": {
    slug: "lc75-intro-trie",
    title: "Trie — พื้นฐาน & แนวคิด",
    lead: "โครงสร้างต้นไม้ที่เก็บคำโดยแชร์ prefix ร่วมกัน ค้นและเติมคำได้เร็วตามความยาวคำ",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "Trie (อ่านว่า ไทร มาจากคำว่า reTRIEval) หรือ Prefix Tree คือโครงสร้างข้อมูลรูปต้นไม้ที่ออกแบบมาเพื่อเก็บชุดของคำ (string) โดยเฉพาะ จุดเด่นคือคำที่ขึ้นต้นเหมือนกันจะใช้เส้นทางร่วมกัน ทำให้ค้นหาคำหรือค้นหาว่ามีคำไหนขึ้นต้นด้วย prefix ที่กำหนดได้เร็วมาก เหมาะกับงานอย่าง autocomplete และตรวจตัวสะกด" },

      { t: "h2", c: "Trie หน้าตาเป็นยังไง" },
      { t: "p", c: "ลองนึกภาพว่าเราเก็บคำว่า cat, car, card ถ้าเก็บเป็นลิสต์ธรรมดา การหาว่ามีคำที่ขึ้นต้นด้วย ca ไหมต้องไล่ดูทุกคำ แต่ใน trie เราแตกคำออกเป็นตัวอักษรทีละตัว แล้วให้ตัวอักษรที่เหมือนกันตอนต้นใช้ node ร่วมกัน หน้าตาจะเป็นแบบนี้" },
      { t: "code", lang: "python", c: `(root)
   |
   c
   |
   a
  / \\
 t   r        <- cat, car จบตรงนี้
      \\
       d      <- card จบตรงนี้` },
      { t: "p", c: "แต่ละ node เก็บสองอย่าง หนึ่งคือ children ซึ่งเป็น dict ที่ map จากตัวอักษรไปยัง node ลูก และสองคือ flag บอกว่ามีคำจบตรงนี้ไหม (is_end) เหตุที่ต้องมี flag จบคำ เพราะ car เป็นทั้งคำจริง และเป็น prefix ของ card เราต้องแยกให้ออกว่า node ตัว r นั้นเป็นจุดจบคำจริง ๆ ไม่ใช่แค่ทางผ่าน" },

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
      { t: "p", c: "operation หลักคือ insert (เพิ่มคำ) และ search (ค้นคำ) ทั้งคู่ทำงานโดยไล่ตัวอักษรทีละตัวจาก root ลงไป จึงใช้เวลาแค่ O(L) เมื่อ L คือความยาวของคำ ไม่ขึ้นกับจำนวนคำทั้งหมดที่เก็บไว้ นี่คือเหตุผลที่ trie เร็วกว่าการไล่ลิสต์ทีละคำ" },
      { t: "table", head: ["operation", "เวลา", "หมายเหตุ"], rows: [
        ["insert(word)", "O(L)", "L = ความยาวคำ ไล่สร้าง node ทีละตัวอักษร"],
        ["search(word)", "O(L)", "เดินตามตัวอักษร แล้วเช็ค is_end ที่ปลาย"],
        ["startsWith(prefix)", "O(L)", "เดินถึงได้ก็พอ ไม่ต้องเช็ค is_end"],
      ] },
      { t: "callout", title: "จุดที่คนพลาดบ่อย", warn: true, c: "การ search ต้องเช็ค is_end ที่ node สุดท้ายด้วย ไม่ใช่แค่เดินถึง node ได้ เช่น ถ้าเก็บแต่ card แล้วค้น car จะเดินถึง node r ได้ แต่ is_end ตรงนั้นเป็น False จึงต้องตอบว่าไม่มีคำนี้ ส่วน startsWith (ค้น prefix) ไม่ต้องเช็ค is_end แค่เดินถึงได้ก็พอ" },

      { t: "callout", title: "พร้อมลุยยัง", c: "หมวดนี้มี 2 ข้อ (LC208, LC1268) กดถัดไปเริ่มข้อแรกได้เลย" },
    ],
  },

  "lc75-p70": {
    slug: "lc75-p70",
    title: "ข้อ 70 · LC208 — สร้าง Trie 🟡",
    lead: "สร้าง class Trie ที่มี insert, search, startsWith โดยแยกคำจริงออกจาก prefix ด้วย is_end",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "ให้สร้าง class Trie ที่มีสามเมท็อด: insert(word) เพิ่มคำเข้า trie, search(word) คืน True ถ้าคำนี้ถูกเพิ่มไว้แล้ว, startsWith(prefix) คืน True ถ้ามีคำที่ขึ้นต้นด้วย prefix นี้" },
      { t: "ul", c: [
        "insert('apple') แล้ว search('apple') → True",
        "search('app') → False (เพราะยังไม่เคย insert คำว่า app)",
        "startsWith('app') → True (มี apple ขึ้นต้นด้วย app)",
        "insert('app') แล้ว search('app') → True",
      ] },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "ข้อนี้คือการนำโครงสร้าง trie มาห่อเป็น class ใช้ TrieNode ที่มี children (dict ตัวอักษร -> node) และ is_end (ธงบอกว่ามีคำจบที่นี่) หัวใจคือแยกความต่างระหว่างมีคำนี้จริงกับมีคำที่ขึ้นต้นด้วยสิ่งนี้ให้ออก" },
      { t: "p", c: "ถ้าเก็บคำเป็นลิสต์ธรรมดาแล้วค้นด้วยการไล่ทุกคำ แต่ละครั้งจะช้า O(จำนวนคำ × ความยาว) การใช้ trie ทำให้ทุก operation เหลือ O(ความยาวคำ) ล้วน ๆ" },
      { t: "ol", c: [
        "insert: เริ่มที่ root ไล่ตัวอักษรทีละตัว ถ้ายังไม่มีเส้นทางก็สร้าง node ใหม่ พอถึงตัวสุดท้ายปัก is_end = True",
        "สร้างฟังก์ชันช่วย _find(prefix) ที่เดินตามตัวอักษร ถ้าหลุดเส้นทางคืน None ไม่งั้นคืน node ปลายทาง",
        "search(word): เรียก _find แล้วต้องได้ node ที่ไม่ None และ node.is_end เป็น True",
        "startsWith(prefix): เรียก _find แล้วแค่เช็คว่าไม่ None ก็พอ",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", warn: true, c: "ลืมเช็ค is_end ใน search ทำให้ search('app') ตอบ True ทั้งที่ยังไม่เคย insert คำว่า app อีกจุดคือต้องเริ่มเดินจาก self.root ใหม่ทุกครั้ง อย่าใช้ node ค้างจากการเรียกก่อนหน้า" },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "code", lang: "python", c: `class TrieNode:
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
print(trie.search("app"))        # True` },
        { t: "p", c: "หัวใจของข้อนี้คือแยกความต่างระหว่างมีคำนี้จริงกับมีคำที่ขึ้นต้นด้วยสิ่งนี้ให้ออก เราจึงดึงส่วนที่ซ้ำกัน (การเดินตามตัวอักษรจนสุด prefix) ออกมาเป็นฟังก์ชัน _find ที่คืน node ปลายทางหรือ None แล้ว search เพิ่มเงื่อนไขเช็ค is_end ส่วน startsWith แค่ดูว่าไม่ None" },
        { t: "p", c: "ถ้าไม่แยก _find ก็เขียนได้เหมือนกันแต่โค้ดจะซ้ำสองรอบ การดึงออกมาช่วยให้ search กับ startsWith ต่างกันแค่บรรทัดสุดท้าย อ่านง่ายและลดโอกาสพลาด" },
        { t: "p", c: "Time O(L) ต่อการเรียกหนึ่งครั้ง เมื่อ L คือความยาวคำหรือ prefix · Space O(จำนวนตัวอักษรทั้งหมดที่เก็บ) กรณีแย่สุดคือทุกคำไม่แชร์ prefix กันเลย" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "Trie เหมาะกับงานค้นคำ/prefix จำนวนมาก key คือ children เป็น dict และ is_end แยกคำจริงจากทางผ่าน จำ template insert/_find นี้ไว้ ต่อยอดได้อีกหลายข้อ" },
    ],
  },

  "lc75-p71": {
    slug: "lc75-p71",
    title: "ข้อ 71 · LC1268 — ระบบแนะนำคำค้น 🟡",
    lead: "แนะนำสินค้าไม่เกิน 3 ชื่อตามพจนานุกรม ทุกครั้งที่พิมพ์เพิ่มทีละตัว โดย sort ก่อนแล้วเก็บ suggestions ที่แต่ละ node",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "มีลิสต์สินค้า products และคำที่ผู้ใช้พิมพ์ searchWord ทุกครั้งที่ผู้ใช้พิมพ์ตัวอักษรเพิ่มทีละตัว ให้แนะนำสินค้าที่ขึ้นต้นด้วยสิ่งที่พิมพ์มาแล้ว โดยเลือกมาไม่เกิน 3 ชื่อที่เรียงตามพจนานุกรม (เล็กสุดก่อน) ผลลัพธ์เป็นลิสต์ของลิสต์ ทีละตัวอักษรที่พิมพ์" },
      { t: "ul", c: [
        "products = ['mobile','mouse','moneypot','monitor','mousepad'], searchWord = 'mouse'",
        "พิมพ์ m, mo, mou → แนะนำ ['mobile','moneypot','monitor'] (3 ตัวแรกตามพจนานุกรม)",
        "พิมพ์ mous, mouse → แนะนำ ['mouse','mousepad']",
      ] },

      { t: "h2", c: "แนวทาง — ต้องใช้อะไร & คิดยังไง" },
      { t: "p", c: "ข้อนี้ใช้ trie ผสมกับการ sort ล่วงหน้า idea คือถ้า sort products ก่อนหนึ่งครั้ง แล้วค่อยใส่ลง trie คำที่ผ่านแต่ละ node จะมาตามลำดับพจนานุกรมอยู่แล้ว เราจึงเก็บแค่ 3 ตัวแรกที่แต่ละ node พอ" },
      { t: "p", c: "วิธีตรงไปตรงมาคือทุกครั้งที่พิมพ์ ก็กรอง products ทั้งหมดที่ขึ้นต้นด้วย prefix แล้ว sort เอา 3 ตัวแรก ซึ่งทำงานซ้ำ ๆ และช้าเมื่อพิมพ์ยาว ๆ การเก็บ suggestions ไว้ที่แต่ละ node ตั้งแต่ตอนสร้าง trie ทำให้ตอนตอบแค่เดินตาม prefix แล้วหยิบออกมาได้ทันที" },
      { t: "ol", c: [
        "sort products ก่อนหนึ่งครั้ง",
        "ใส่แต่ละคำลง trie ไล่ตัวอักษร ระหว่างเดินให้ append คำนั้นเข้า node.suggestions ถ้ายังเก็บไม่ถึง 3 ตัว",
        "ตอบ searchWord: เดินตามตัวอักษรที่พิมพ์ทีละตัวจาก root ถ้ายังเดินได้ก็หยิบ node.suggestions ใส่ผลลัพธ์",
        "ถ้าหลุดเส้นทางเมื่อไร ตั้ง node = None แล้วเติม [] ให้ตัวอักษรที่เหลือทั้งหมด",
      ] },
      { t: "callout", title: "จุดพลาดที่พบบ่อย", warn: true, c: "พอพิมพ์ตัวอักษรที่ทำให้หลุดเส้นทางใน trie แล้ว ตัวอักษรที่เหลือหลังจากนั้นต้องแนะนำเป็นลิสต์ว่างทั้งหมด อย่าหยุดเติมผลลัพธ์ ต้องเติม [] ต่อไปให้ครบความยาว searchWord" },

      { t: "details", summary: "▶ เฉลยละเอียด (ลองเองก่อนนะ)", c: [
        { t: "code", lang: "python", c: `class TrieNode:
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
#  ['mouse','mousepad'], ['mouse','mousepad'], ['mouse','mousepad']]` },
        { t: "p", c: "ไอเดียคือ sort products ก่อนหนึ่งครั้ง ทำให้เวลาไล่ใส่คำเข้า trie ตามลำดับ ทุก node จะได้รับสินค้าตามลำดับพจนานุกรมอยู่แล้ว เราจึงเก็บแค่ 3 ตัวแรกที่ผ่าน node นั้นไว้ใน suggestions เมื่อผู้ใช้พิมพ์ prefix มาเรื่อย ๆ ก็แค่เดินตามตัวอักษรแล้วหยิบ suggestions ที่ node ปลายทางออกมาได้ทันที ไม่ต้องไล่ค้นใหม่ทุกครั้ง" },
        { t: "p", c: "จุดสำคัญคือเมื่อพิมพ์ตัวอักษรที่ทำให้หลุดเส้นทางใน trie (ไม่มีสินค้าไหนขึ้นต้นแบบนั้นแล้ว) ตัวอักษรที่เหลือหลังจากนั้นต้องแนะนำเป็นลิสต์ว่างทั้งหมด โค้ดจึงตั้ง node = None แล้วเติม [] ต่อไปเรื่อย ๆ" },
        { t: "p", c: "Time O(N log N + total) โดย N คือจำนวนสินค้า มาจากการ sort (N log N) บวกกับการสร้าง trie ตามจำนวนตัวอักษรรวมของทุกคำ ส่วนการตอบ searchWord ใช้ O(ความยาว searchWord) · Space O(total) เก็บตัวอักษรทั้งหมดใน trie (แต่ละ node เก็บ suggestions ไม่เกิน 3)" },
      ] },

      { t: "callout", title: "💡 สรุป pattern", c: "เมื่อต้องตอบ prefix query ซ้ำ ๆ ให้ประมวลผลล่วงหน้า (sort + เก็บ suggestions ที่ node) แลกหน่วยความจำนิดหน่อยเพื่อให้ตอบแต่ละครั้งเร็วในหนึ่งการเดิน — เป็นแก่นของระบบ autocomplete" },
    ],
  },
};
