import type { Page } from "@/lib/types";

export const triePages: Record<string, Page> = {
  "lc75-trie": {
    slug: "lc75-trie",
    title: "Trie — ต้นไม้เก็บคำ (Prefix Tree)",
    lead: "โครงสร้างต้นไม้ที่เก็บคำโดยแชร์ prefix ร่วมกัน ค้นและเติมคำได้เร็วตามความยาวคำ",
    group: "LeetCode 75",
    blocks: [
      { t: "p", c: "Trie (อ่านว่า ไทร มาจากคำว่า reTRIEval) หรือ Prefix Tree คือโครงสร้างข้อมูลรูปต้นไม้ที่ออกแบบมาเพื่อเก็บชุดของคำ (string) โดยเฉพาะ จุดเด่นคือคำที่ขึ้นต้นเหมือนกันจะใช้เส้นทางร่วมกัน ทำให้ค้นหาคำหรือค้นหาว่ามีคำไหนขึ้นต้นด้วย prefix ที่กำหนดได้เร็วมาก เหมาะกับงานอย่าง autocomplete และตรวจตัวสะกด" },

      { t: "h2", c: "แนวคิดของหัวข้อนี้" },
      { t: "p", c: "ลองนึกภาพว่าเราเก็บคำว่า cat, car, card ธรรมดาถ้าเก็บเป็นลิสต์ การหาว่ามีคำที่ขึ้นต้นด้วย ca ไหมต้องไล่ดูทุกคำ แต่ใน trie เราแตกคำออกเป็นตัวอักษรทีละตัว แล้วให้ตัวอักษรที่เหมือนกันตอนต้นใช้ node ร่วมกัน หน้าตาจะเป็นแบบนี้" },
      { t: "code", lang: "python", c: `(root)
   |
   c
   |
   a
  / \\
 t   r        <- cat, car จบตรงนี้
      \\
       d      <- card จบตรงนี้` },
      { t: "p", c: "แต่ละ node เก็บสองอย่าง หนึ่งคือ children ซึ่งเป็น dict ที่ map จากตัวอักษรไปยัง node ลูก และสองคือ flag บอกว่า มีคำจบตรงนี้ไหม (is_end) เหตุที่ต้องมี flag จบคำ เพราะ car เป็นทั้งคำจริง และเป็น prefix ของ card เราต้องแยกให้ออกว่า node ตัว r นั้นเป็นจุดจบคำจริง ๆ ไม่ใช่แค่ทางผ่าน" },
      { t: "h3", c: "โครง TrieNode ใน Python" },
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
      { t: "p", c: "operation หลักคือ insert (เพิ่มคำ) และ search (ค้นคำ) ทั้งคู่ทำงานโดยไล่ตัวอักษรทีละตัวจาก root ลงไป จึงใช้เวลาแค่ O(L) เมื่อ L คือความยาวของคำ ไม่ขึ้นกับจำนวนคำทั้งหมดที่เก็บไว้ นี่คือเหตุผลที่ trie เร็วกว่าการไล่ลิสต์ทีละคำ" },
      { t: "callout", title: "จุดที่คนพลาดบ่อย", c: "การ search ต้องเช็ค is_end ที่ node สุดท้ายด้วย ไม่ใช่แค่เดินถึง node ได้ เช่น ถ้าเก็บแต่ card แล้วค้น car จะเดินถึง node r ได้ แต่ is_end ตรงนั้นเป็น False จึงต้องตอบว่าไม่มีคำนี้ ส่วน startsWith (ค้น prefix) ไม่ต้องเช็ค is_end แค่เดินถึงได้ก็พอ" },

      { t: "h2", c: "ข้อ 1 — สร้าง class Trie (LC208) 🟡" },
      { t: "p", c: "ให้สร้าง class Trie ที่มีสามเมท็อด insert(word) เพิ่มคำเข้า trie, search(word) คืน True ถ้าคำนี้ถูกเพิ่มไว้แล้ว, startsWith(prefix) คืน True ถ้ามีคำที่ขึ้นต้นด้วย prefix นี้ ตัวอย่าง insert('apple') แล้ว search('apple') ได้ True, search('app') ได้ False (เพราะยังไม่เคย insert), startsWith('app') ได้ True" },
      { t: "callout", title: "คำใบ้", c: "insert และ search และ startsWith มีขั้นตอนเดินตัวอักษรทีละตัวเหมือนกัน ต่างแค่ตอนจบ ลองเขียนฟังก์ชันช่วยเดินหา node ปลายทางของ prefix แล้วให้ search กับ startsWith เรียกใช้ร่วมกัน" },
      { t: "details", summary: "กดดูเฉลย + คำอธิบาย", c: [
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
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

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
        { t: "p", c: "หัวใจของข้อนี้คือแยกความต่างระหว่าง มีคำนี้จริง กับ มีคำที่ขึ้นต้นด้วยสิ่งนี้ ให้ออก เราจึงดึงส่วนที่ซ้ำกัน (การเดินตามตัวอักษรจนสุด prefix) ออกมาเป็นฟังก์ชัน _find ที่คืน node ปลายทางหรือ None แล้ว search เพิ่มเงื่อนไขเช็ค is_end ส่วน startsWith แค่ดูว่าไม่ None" },
        { t: "p", c: "จุดพลาดที่พบบ่อยคือลืมเช็ค is_end ใน search ทำให้ search('app') ตอบ True ทั้งที่ยังไม่เคย insert คำว่า app อีกจุดคือใช้ node ตัวเดียวร่วมกันโดยไม่เริ่มที่ root ใหม่ทุกครั้ง ต้องเริ่มเดินจาก self.root เสมอ" },
        { t: "p", c: "Time O(L) ต่อการเรียกหนึ่งครั้ง เมื่อ L คือความยาวคำหรือ prefix · Space O(จำนวนตัวอักษรทั้งหมดที่เก็บ) กรณีแย่สุดคือทุกคำไม่แชร์ prefix กันเลย" },
      ] },

      { t: "h2", c: "ข้อ 2 — ระบบแนะนำคำค้นหา (LC1268) 🟡" },
      { t: "p", c: "มีลิสต์สินค้า products และคำที่ผู้ใช้พิมพ์ searchWord ทุกครั้งที่ผู้ใช้พิมพ์ตัวอักษรเพิ่มทีละตัว ให้แนะนำสินค้าที่ขึ้นต้นด้วยสิ่งที่พิมพ์มาแล้ว โดยเลือกมาไม่เกิน 3 ชื่อ ที่เรียงตามพจนานุกรม (เล็กสุดก่อน) ผลลัพธ์เป็นลิสต์ของลิสต์ ทีละตัวอักษรที่พิมพ์ เช่น products = ['mobile','mouse','moneypot','monitor','mousepad'], searchWord = 'mouse' พอพิมพ์ m จะแนะนำ mobile, moneypot, monitor ไปเรื่อย ๆ จนพิมพ์ mouse ครบจะแนะนำ mouse, mousepad" },
      { t: "callout", title: "คำใบ้", c: "ถ้า sort products ก่อนหนึ่งครั้ง แล้วเก็บใน trie ทุก node ก็เก็บได้ว่ามีสินค้าตัวไหนผ่าน node นี้บ้าง (เก็บแค่ 3 ตัวแรกพอ เพราะ sort แล้ว) พอเดินตาม prefix ที่พิมพ์ก็หยิบคำแนะนำที่ node นั้นมาได้ทันที" },
      { t: "details", summary: "กดดูเฉลย + คำอธิบาย", c: [
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

      { t: "links", c: [
        { title: "ถัดไป: Intervals →", slug: "lc75-intervals", desc: "จัดการช่วงที่ทับกันด้วย sort และ greedy" },
        { title: "← Bit Manipulation", slug: "lc75-bit" },
      ] },
    ],
  },
};
