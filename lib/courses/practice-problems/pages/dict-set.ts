import type { Page } from "@/lib/types";

export const dictSetPages: Record<string, Page> = {
  "pp-dict-set": {
    slug: "pp-dict-set",
    title: { th: "โจทย์ Dictionary & Set", en: "" },
    lead: { th: "นับความถี่ จับคู่ ตัดซ้ำ และค้นหาเร็ว — dict/set คือเครื่องมือที่เปลี่ยนโจทย์ช้าให้เร็ว", en: "" },
    group: "โจทย์ฝึก",
    blocks: {
      th: [
        { t: "p", c: "Dictionary และ Set เป็นกุญแจของโจทย์ประเภท \"นับ\", \"จับคู่\", และ \"เคยเห็นไหม\" เพราะค้นหาเร็ว O(1) โจทย์ชุดนี้ฝึกใช้สองโครงสร้างนี้แก้ปัญหาอย่างมีประสิทธิภาพ" },

        { t: "h2", c: "ข้อ 1 — นับความถี่คำ 🟢" },
        { t: "p", c: "รับประโยค แล้วนับว่าคำแต่ละคำปรากฏกี่ครั้ง เช่น \"the cat the dog\" → the:2, cat:1, dog:1" },
        {
          t: "details",
          summary: "เฉลย + คำอธิบาย",
          c: [
            { t: "code", lang: "python", c: "s = \"the cat the dog the bird\"\ncount = {}\nfor word in s.split():\n    count[word] = count.get(word, 0) + 1\nprint(count)   # {'the': 3, 'cat': 1, 'dog': 1, 'bird': 1}\n\n# หรือใช้ Counter สำเร็จรูป\nfrom collections import Counter\nprint(Counter(s.split()))" },
            { t: "p", c: "split() ตัดประโยคเป็นลิสต์คำ แล้วนับด้วย pattern count[x] = count.get(x, 0) + 1 — เหมือนนับตัวอักษรแต่เปลี่ยนเป็นนับคำ Counter ทำให้สั้นลงในงานจริง" },
          ],
        },

        { t: "h2", c: "ข้อ 2 — หาค่าที่ปรากฏบ่อยสุด 🟡" },
        { t: "p", c: "รับลิสต์ แล้วหาว่าค่าไหนปรากฏบ่อยที่สุด เช่น [1,3,3,2,3,1] → 3" },
        {
          t: "details",
          summary: "เฉลย + คำอธิบาย",
          c: [
            { t: "code", lang: "python", c: "def most_common(nums):\n    count = {}\n    for n in nums:\n        count[n] = count.get(n, 0) + 1\n    # หา key ที่ value มากสุด\n    return max(count, key=count.get)\n\nprint(most_common([1, 3, 3, 2, 3, 1]))  # 3" },
            { t: "p", c: "นับความถี่ลง dict ก่อน แล้วใช้ max(count, key=count.get) — บอก max ว่า \"เทียบ key แต่ละตัวด้วยค่าของมัน (count.get)\" จึงได้ key ที่มีความถี่สูงสุด เป็นเทคนิคใช้ max/min กับ dict ที่มีประโยชน์มาก" },
          ],
        },

        { t: "h2", c: "ข้อ 3 — สมาชิกร่วมของสองลิสต์ 🟢" },
        { t: "p", c: "หาค่าที่อยู่ในทั้งสองลิสต์ เช่น [1,2,3,4] กับ [3,4,5,6] → {3, 4}" },
        {
          t: "details",
          summary: "เฉลย + คำอธิบาย",
          c: [
            { t: "code", lang: "python", c: "a = [1, 2, 3, 4]\nb = [3, 4, 5, 6]\n\ncommon = set(a) & set(b)     # intersection\nprint(common)                # {3, 4}\n\nonly_in_a = set(a) - set(b)  # อยู่ใน a ไม่อยู่ใน b\nprint(only_in_a)             # {1, 2}" },
            { t: "p", c: "แปลงเป็น set แล้วใช้ตัวดำเนินการเซ็ต: & (ร่วม), | (รวม), - (ต่าง) สั้นและเร็วกว่าการวน loop ซ้อนเทียบทุกคู่ (O(n²)) มาก — set ทำให้เหลือ O(n)" },
          ],
        },

        { t: "h2", c: "ข้อ 4 — มีค่าซ้ำไหม 🟢" },
        { t: "p", c: "เช็คว่าในลิสต์มีค่าซ้ำกันไหม คืน True/False เช่น [1,2,3,2] → True, [1,2,3] → False" },
        {
          t: "details",
          summary: "เฉลย + คำอธิบาย",
          c: [
            { t: "code", lang: "python", c: "def has_duplicate(nums):\n    return len(set(nums)) != len(nums)\n\nprint(has_duplicate([1, 2, 3, 2]))  # True\nprint(has_duplicate([1, 2, 3]))     # False" },
            { t: "p", c: "เคล็ดลับสั้น ๆ: set ตัดค่าซ้ำออก ถ้าจำนวนสมาชิกใน set น้อยกว่าในลิสต์เดิม แปลว่ามีตัวซ้ำ วิธีนี้ O(n) เทียบกับการวนเทียบทุกคู่ O(n²)" },
          ],
        },

        { t: "h2", c: "ข้อ 5 — จัดกลุ่ม anagram 🔴" },
        { t: "p", c: "จัดกลุ่มคำที่เป็น anagram กัน เช่น [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\"] → [[\"eat\",\"tea\",\"ate\"], [\"tan\",\"nat\"]]" },
        { t: "callout", title: "คำใบ้", c: "คำที่เป็น anagram กันจะได้ \"กุญแจ\" เดียวกันเมื่อเรียงตัวอักษร เช่น eat/tea/ate ต่างเรียงได้ \"aet\" ใช้กุญแจนี้เป็น key ของ dict ที่เก็บลิสต์ของคำ" },
        {
          t: "details",
          summary: "เฉลย + คำอธิบาย",
          c: [
            { t: "code", lang: "python", c: "def group_anagrams(words):\n    groups = {}\n    for word in words:\n        key = \"\".join(sorted(word))  # เรียงตัวอักษรเป็นกุญแจ\n        if key not in groups:\n            groups[key] = []\n        groups[key].append(word)\n    return list(groups.values())\n\nprint(group_anagrams([\"eat\",\"tea\",\"tan\",\"ate\",\"nat\"]))\n# [['eat','tea','ate'], ['tan','nat']]" },
            { t: "p", c: "ต่อยอดจากโจทย์ anagram เดิม: sorted(word) ให้ลายเซ็นเดียวกันสำหรับ anagram กลุ่มเดียวกัน ใช้มันเป็น key ของ dict ที่ map ลายเซ็น → ลิสต์คำ วน 1 รอบจัดกลุ่มได้เลย O(n) — เห็นไหมว่า dict ทรงพลังแค่ไหน" },
          ],
        },

        { t: "callout", title: "เชื่อมโยง", c: "สังเกตว่าโจทย์เกือบทุกข้อใช้ pattern เดียวกัน: นับ/จัดกลุ่มด้วย dict หรือเช็คสมาชิก/ตัดซ้ำด้วย set เมื่อเจอคำว่า \"นับ\", \"จับคู่\", \"ซ้ำ\", \"เคยเห็น\" ให้นึกถึง dict/set ทันที" },
        {
          t: "links",
          c: [
            { title: "ถัดไป: โจทย์คณิตศาสตร์ & ตรรกะ →", slug: "pp-math", desc: "FizzBuzz, จำนวนเฉพาะ, factorial" },
            { title: "← โจทย์ Array / List", slug: "pp-arrays" },
          ],
        },
      ],
      en: [],
    },
  },
};
