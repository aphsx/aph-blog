# 01 — กติกาการเขียนเนื้อหา & สไตล์ (Content Conventions)

> อ่านไฟล์นี้ก่อนเขียนทุกบท เพื่อให้คอร์สใหม่มีคุณภาพและหน้าตาเดียวกับคอร์สเดิม

---

## 1. รูปแบบไฟล์ page (TypeScript)

แต่ละบท = 1 ไฟล์ใน `lib/courses/intermediate-programming/pages/<chapter>.ts`
หนึ่งไฟล์ export object เดียวที่รวมหลายหัวข้อย่อย (page) โครงตามนี้:

```ts
import type { Page } from "@/lib/types";

export const pythonDeepPages: Record<string, Page> = {
  "py-comprehension": {
    slug: "py-comprehension",
    title: "Comprehension เจาะลึก",
    lead: "เขียน list/dict/set ในบรรทัดเดียวแบบอ่านง่ายและเร็ว — พร้อมรู้ว่าเมื่อไรไม่ควรใช้",
    group: "บทที่ 1: Python ระดับลึก",
    blocks: [
      // ... Block[]
    ],
  },
  "py-iter-gen": { /* ... */ },
};
```

**กฎ:**
- ชื่อ export: `<camelCaseChapter>Pages` (เช่น `pythonDeepPages`, `robustCodePages`)
- key ของ object = `slug` (ต้องตรงกับ field `slug` ข้างใน)
- `group` = ชื่อบท ใช้แสดงเป็น metadata (เช่น `"บทที่ 1: Python ระดับลึก"`)
- `lead` = สรุป 1 ประโยคว่าหัวข้อนี้ได้อะไร (ขึ้นบนหน้า)

---

## 2. ชนิด Block ทั้งหมด (จาก `lib/types.ts`)

ใช้ได้เฉพาะชนิดเหล่านี้ — ห้ามคิดชนิดใหม่ (renderer มีแค่นี้ ดู `components/Article.tsx`):

| ชนิด | รูปแบบ | ใช้ทำอะไร |
|------|--------|-----------|
| `p` | `{ t: "p", c: "ข้อความ" }` | ย่อหน้าอธิบาย |
| `h2` | `{ t: "h2", c: "หัวข้อใหญ่" }` | หัวข้อหลักในหน้า (ขึ้น TOC) |
| `h3` | `{ t: "h3", c: "หัวข้อย่อย" }` | หัวข้อรอง (ขึ้น TOC) |
| `ul` | `{ t: "ul", c: ["ข้อ 1", "ข้อ 2"] }` | bullet list |
| `ol` | `{ t: "ol", c: ["ขั้น 1", "ขั้น 2"] }` | numbered list |
| `code` | `{ t: "code", lang: "python", c: "print(1)" }` | บล็อกโค้ด (ระบุ `lang`) |
| `callout` | `{ t: "callout", title?: "...", c: "...", warn?: true }` | กล่องเน้น/เตือน (`warn:true` = สีเตือน) |
| `table` | `{ t: "table", head: [...], rows: [[...]] }` | ตาราง |
| `links` | `{ t: "links", c: [{title, slug?, href?, desc?}] }` | การ์ดลิงก์ (ภายใน=slug, ภายนอก=href) |
| `linklist` | `{ t: "linklist", c: [{title, slug}], ordered?: true }` | ลิงก์แบบ list |
| `details` | `{ t: "details", summary: "...", c: Block[] }` | กล่องพับเก็บ (เฉลย/เนื้อหาเสริม) |
| `image` | `{ t: "image", src, alt?, caption? }` | รูป (เลี่ยงถ้าไม่มีไฟล์รูปจริง) |

**lang ที่ใช้บ่อย:** `python`, `bash`, `sql`, `json`, `text`

---

## 3. โครงมาตรฐานของหนึ่งหัวข้อย่อย (Lesson Template)

ทุกหัวข้อควรเรียงประมาณนี้ (ยืดหยุ่นได้ แต่ต้องครบหัว-ท้าย):

```
1. p           — เกริ่นว่าหัวข้อนี้คืออะไร + ทำไมสำคัญ (hook)
2. callout     — (ถ้าเป็นหัวข้อแรกของบท) เตือนให้พิมพ์โค้ดตามเอง / setup
3. h2 + p + code  — แนวคิดหลัก #1 พร้อมตัวอย่างรันได้
4. h2 + p + code  — แนวคิดหลัก #2 ...
5. table       — สรุปเปรียบเทียบ (ถ้ามี)
6. callout(warn) — กับดักที่เจอบ่อย / ข้อควรระวัง
7. h3 "ในงานจริงใช้ยังไง" — เชื่อมกับการทำงานจริง
8. h2 "สรุปหัวข้อนี้" + ul  — bullet สรุป 3–5 ข้อ
9. callout "แบบฝึกหัด"  — โจทย์ 3–5 ข้อ (เฉลยใส่ details ได้)
10. links      — [ถัดไป →] และ [← กลับ overview]
```

**ความยาวต่อหัวข้อ:** ~12–25 blocks (อ้างอิงคอร์สเดิม: `programming-basics.ts` มี ~142 blocks / 7 หัวข้อ ≈ 20 blocks/หัวข้อ) คอร์สนี้ตั้งเป้าลึกกว่า → **15–25 blocks/หัวข้อ**

---

## 4. สไตล์การเขียน (Writing Style)

- **ภาษาไทยเป็นหลัก** ศัพท์เทคนิคคงภาษาอังกฤษ (เช่น "generator", "decorator", "ฐานข้อมูล (database)")
- โทนเหมือนพี่สอนน้อง เป็นกันเอง แต่แม่นยำ — ตรงกับคอร์สเดิม
- อธิบาย **"ทำไม"** ก่อน **"ทำยังไง"** เสมอ
- ของยาก → ใช้ **การเปรียบเทียบในชีวิตจริง** (analogy) เช่น decorator = "กระดาษห่อของขวัญที่เพิ่มความสามารถให้กล่องโดยไม่แกะกล่อง"
- เตือน **กับดักที่มือใหม่เจอบ่อย** ด้วย `callout` `warn:true` ทุกครั้งที่นึกออก
- เลี่ยง wall of text — สลับ p / code / callout / table ให้อ่านสบาย

---

## 5. มาตรฐานโค้ดตัวอย่าง (Code Standard)

- **Python 3.10+** ทุกตัวอย่าง รันได้จริง ไม่มี syntax error
- ใส่ **คอมเมนต์ภาษาไทย** อธิบายบรรทัดสำคัญ และ **ผลลัพธ์** ต่อท้าย เช่น `print(x)  # 26`
- โค้ดสั้น โฟกัสแนวคิดเดียวต่อบล็อก — อย่ายัดหลายแนวคิดในบล็อกเดียว
- ชื่อตัวแปร snake_case สื่อความหมาย (สอน clean code ต้องทำตัวอย่างให้ดู)
- ถ้าต้องรันใน terminal ใช้ `lang: "bash"` แยกบล็อก
- escape เครื่องหมายคำพูดให้ถูกใน TS string (ใช้ `\"` หรือสลับ single/double quote)

**ตัวอย่างบล็อกโค้ดที่ดี:**
```ts
{ t: "code", lang: "python", c: "def greet(name):\n    return f\"สวัสดี {name}\"\n\nprint(greet(\"Aph\"))  # สวัสดี Aph" }
```

---

## 6. การตั้ง slug (สำคัญมาก)

- ใช้ **prefix ประจำบท** เท่านั้น (ดูตารางใน README §5): `py- err- proj- git- test- clean- data- db- web2- dsa- async- cap-`
- ⚠️ ห้ามซ้ำกับ slug ที่มีอยู่แล้วทั้งเว็บ (รายการตรวจสอบอยู่ใน `03-build-steps.md`)
- overview slug = `intermediate`

---

## 7. การเชื่อมโยง (Linking)

- **ลิงก์ภายในเว็บ** ใช้ `slug` (เช่น `{ title: "ถัดไป →", slug: "py-iter-gen" }`)
- ทุกหัวข้อจบด้วยบล็อก `links`: ลิงก์ "ถัดไป" + "กลับ overview (`intermediate`)"
- ลิงก์ข้ามคอร์สได้ (slug เป็น global) — ใช้เชื่อมไป `pp-basics` (practice-problems) หรือ `practice` (se-roadmap) ท้ายคอร์ส
- **ลิงก์ภายนอก** ใช้ `href` (เช่น docs ของ Python, replit)

---

## 8. Checklist ก่อนปิดแต่ละหัวข้อ

- [ ] มี `slug`, `title`, `lead`, `group` ครบ
- [ ] slug ใช้ prefix ถูก + ไม่ซ้ำ
- [ ] โค้ดทุกบล็อกรันได้จริง มีคอมเมนต์ไทย + ผลลัพธ์
- [ ] มี callout เตือนกับดักอย่างน้อย 1 จุด (ถ้ามี)
- [ ] มี "สรุปหัวข้อนี้" + "แบบฝึกหัด"
- [ ] มี `links` ถัดไป/กลับ
- [ ] เพิ่ม slug เข้า `nav.ts` แล้ว
- [ ] import page เข้า `index.ts` แล้ว
- [ ] `bun run build` ผ่าน
