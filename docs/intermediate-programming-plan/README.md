# แผนสร้างคอร์ส "เขียนโปรแกรมระดับกลาง" (Intermediate Programming)

> เอกสารแผนหลัก (master plan) สำหรับสร้างคอร์สใหม่ในเว็บ Aph's Blog
> เป้าหมาย: ต่อยอดจากคอร์ส "เขียนโปรแกรมจากศูนย์" → พาผู้เรียนไปถึงระดับ **mid-level programmer**

---

## 0. อ่านไฟล์ไหนก่อน

แผนนี้แตกเป็นหลายไฟล์เพื่อให้ลงลึกได้โดยไม่ยาวเกินไปในไฟล์เดียว อ่านตามลำดับ:

| ไฟล์ | เนื้อหา | ใช้ตอนไหน |
|------|---------|-----------|
| `README.md` (ไฟล์นี้) | ภาพรวม, เป้าหมาย, สถาปัตยกรรมคอร์ส, ตารางความคืบหน้า | อ่านก่อนเสมอ |
| `01-conventions.md` | กติกาการเขียนเนื้อหา, block types, สไตล์โค้ด, คุณภาพ | ก่อนเขียนทุกบท |
| `02-curriculum.md` | หลักสูตรเต็ม — ทุกบท ทุกหัวข้อย่อย พร้อมรายละเอียดที่ต้องสอน | ตอนเขียนแต่ละบท |
| `03-build-steps.md` | คู่มือลงมือทำทีละ step (Step 0 → Step 13) ไฟล์ไหนต้องสร้าง/แก้ | ตอนลงมือทำจริง |
| `04-content-review.md` | ตรวจความครบถ้วน — checklist ทักษะ mid, gap analysis, coverage matrix (พิสูจน์ว่าครบ) | ก่อนเพิ่ม/ลดบท |

---

## 1. เป้าหมายของคอร์ส (Goal)

**ปัญหาที่แก้:** ตอนนี้เว็บมีคอร์ส "เขียนโปรแกรมจากศูนย์" ที่พาจาก *ไม่รู้อะไรเลย → เขียนโปรแกรมพื้นฐานได้* และมีส่วน se-roadmap สำหรับเตรียมสัมภาษณ์งาน แต่ **ช่วงกลางขาดหายไป** — คนที่เขียนพื้นฐานเป็นแล้วแต่ยังไปสมัครงานจริงไม่ได้ ไม่มีเส้นทางต่อ

**คอร์สนี้คือสะพานช่วงกลางนั้น** เมื่อเรียนจบผู้เรียนต้อง:

- เขียน Python ได้ลึกขึ้นมาก (generator, decorator, context manager, type hints)
- จัดการ error และ logging แบบมืออาชีพ
- จัดโครงสร้างโปรเจกต์จริง ใช้ venv/pip/CLI เป็น
- ใช้ Git ทำงานเป็นทีมได้ (branch, merge, PR, แก้ conflict)
- **เขียนเทสต์เป็น** (pytest, mock, TDD) — ทักษะที่แยกมือใหม่ออกจาก mid-level
- เขียนโค้ดสะอาด เข้าใจ SOLID, refactoring, design pattern พื้นฐาน
- ทำงานกับข้อมูลจริง (ไฟล์/CSV/JSON/REST API)
- ออกแบบและใช้ฐานข้อมูลด้วย SQL + ORM
- สร้าง web API จริงด้วย framework เชื่อมกับ DB
- เข้าใจ DS & Algorithm ระดับกลาง (tree, graph, recursion ลึก, DP เบื้องต้น)
- เข้าใจ concurrency / async เบื้องต้น
- **สร้างโปรเจกต์ capstone จริงตั้งแต่ต้นจนจบ** แล้วต่อไป se-roadmap เพื่อสมัครงาน

**เส้นทางรวมทั้งเว็บ:**

```
เขียนโปรแกรมจากศูนย์   →   เขียนโปรแกรมระดับกลาง   →   SE Roadmap (เตรียมสัมภาษณ์)
   (zero → basic)            (basic → mid) ← คอร์สนี้        (mid → ได้งาน)
```

---

## 2. กลุ่มเป้าหมาย (Audience)

- คนที่เรียนจบคอร์ส "เขียนโปรแกรมจากศูนย์" แล้ว (หรือเขียน Python พื้นฐานได้: ตัวแปร, loop, function, list/dict, OOP เบื้องต้น)
- คนที่เขียนโค้ดได้บ้างแต่ "ไม่รู้ว่าโค้ดจริงในงานเขาทำกันยังไง" (testing, git, project structure, clean code)
- คนที่อยากต่อยอดไปสมัครงาน junior/mid developer

**ข้อกำหนดเบื้องต้น (Prerequisite):** จบคอร์ส "เขียนโปรแกรมจากศูนย์" หรือเทียบเท่า — บทแรกของคอร์สนี้จะมี recap สั้น ๆ เป็นสะพานเชื่อม

---

## 3. หลักการออกแบบคอร์ส (Design Principles)

1. **ลงมือทำคือหัวใจ** — ทุกหัวข้อมีโค้ด Python ที่รันได้จริง ให้พิมพ์ตาม + แบบฝึกหัดท้ายหัวข้อ
2. **ลึกกว่าคอร์สพื้นฐาน** — แต่ละบทมี 5–8 หัวข้อย่อย แต่ละหัวข้อยาวพอจะเข้าใจ "ทำไม" ไม่ใช่แค่ "ทำยังไง"
3. **เชื่อมโยงกับของจริง** — เน้นว่าในงานจริงใช้ยังไง ไม่ใช่ทฤษฎีลอย ๆ
4. **อธิบายสิ่งที่ยากให้เข้าใจได้** — ใช้การเปรียบเทียบ (analogy), diagram ด้วยข้อความ, callout เตือนกับดักที่เจอบ่อย
5. **ต่อยอดได้** — แต่ละบทจบด้วยลิงก์ไปบทถัดไป และคอร์สจบด้วยลิงก์ไป se-roadmap
6. **ภาษา:** เนื้อหาภาษาไทย + ศัพท์เทคนิคภาษาอังกฤษ, โค้ดเป็น **Python** (ต่อเนื่องจากคอร์สเดิม)

---

## 4. สถาปัตยกรรมคอร์ส (ทำงานยังไงในโค้ดเบสนี้)

คอร์สทุกคอร์สอยู่ใน `lib/courses/<course-id>/` มี 3 ส่วน:

```
lib/courses/intermediate-programming/
├── index.ts          # ประกอบคอร์ส: meta + รวม pages + nav + order
├── nav.ts            # โครงเมนูข้าง (NavCategory[]) — กำหนดลำดับการเรียน
└── pages/
    ├── overview.ts        # หน้า landing ของคอร์ส (slug: "intermediate")
    ├── python-deep.ts     # บทที่ 1 (หลายหัวข้อย่อยในไฟล์เดียว)
    ├── robust-code.ts     # บทที่ 2
    └── ... (ไฟล์ละ 1 บท)
```

**โมเดลข้อมูล** (จาก `lib/types.ts`):

- `Course` = `CourseMeta` + `{ nav, pages, order }`
- `CourseMeta` = `{ id, title, description, badge, overviewSlug }`
- `Page` = `{ slug, title, lead, group?, blocks: Block[] }`
- `Block` = หนึ่งใน: `p | h2 | h3 | ul | ol | code | callout | table | links | linklist | details | image`
  (รายละเอียดทุกชนิดอยู่ใน `01-conventions.md`)
- `NavCategory` = `{ label, items: {slug,title}[], subcategories? }`

**จุดที่ต้องลงทะเบียนคอร์สใหม่:** `lib/courses/index.ts` → เพิ่มเข้า array `COURSES` ทุกอย่างที่เหลือ (catalog card, routing, prev/next, table of contents) ทำงานอัตโนมัติ

**กฎเหล็ก:**
- ⚠️ **slug ต้องไม่ซ้ำทั้งเว็บ** — `PAGES` ถูก flatten รวมทุกคอร์ส ถ้าซ้ำจะทับกัน ใช้ prefix เฉพาะของคอร์สนี้ (ดูตารางใน §5)
- overviewSlug = `"intermediate"` (`"learn"` และ `"overview"` ถูกใช้ไปแล้ว)
- `order` คำนวณจาก nav อัตโนมัติ: `nav.flatMap(c => c.items.map(i => i.slug))`

---

## 5. หลักสูตรย่อ (Curriculum at a glance)

> รายละเอียดเต็มของทุกหัวข้ออยู่ใน `02-curriculum.md`

| บท | ไฟล์ | prefix slug | หัวข้อย่อย | สาระ |
|----|------|-------------|-----------|------|
| 0 | `overview.ts` | `intermediate` | 1 | ภาพรวม + สะพานจากคอร์สพื้นฐาน |
| 1 | `python-deep.ts` | `py-` | 9 | Python ระดับลึก: comprehension, generator, *args, lambda/HOF, closure, decorator, context manager, **mutability/copy** 🆕, **collections/itertools** 🆕 |
| 2 | `robust-code.ts` | `err-` | 5 | Error handling, custom exception, logging, type hints, defensive programming |
| 3 | `debugging.ts` 🆕 | `dbg-` | 4 | **debugger/pdb, อ่าน traceback+กลยุทธ์, profiling (timeit/cProfile), performance** |
| 4 | `project-tooling.ts` | `proj-` | 5 | module/package, venv/pip, argparse CLI, env vars/config |
| 5 | `git-deep.ts` | `git-` | 5 | branch, remote/GitHub, conflict/rebase, PR workflow |
| 6 | `testing.ts` | `test-` | 5 | ทำไมต้องเทสต์, pytest, fixture, mock, TDD/coverage |
| 7 | `clean-code.ts` | `clean-` | 5 | naming/docstring, DRY/KISS, SOLID, refactoring, design patterns |
| 8 | `real-data.ts` | `data-` | 6 | ไฟล์/pathlib, CSV/JSON, **regex** 🆕, requests/REST, datetime, pandas intro |
| 9 | `databases.ts` | `db-` | 5 | relational model, SQL ลึก, index/transaction, sqlite3, ORM |
| 10 | `web-apps.ts` | `web2-` | 7 | HTTP, framework, request/validation, เชื่อม DB, API จริง, **auth** 🆕, **security** 🆕 |
| 11 | `dsa-mid.ts` | `dsa-` | 13 | ⭐ บทเด่น: เลือกโครงสร้าง, stack/queue, linked list, tree/BST, hash, **sorting ลึก** 🆕, **binary search** 🆕, **two-pointer/sliding window** 🆕, recursion, DP, **greedy** 🆕, graph |
| 12 | `concurrency.ts` | `async-` | 4 | concurrency vs parallelism, threading/GIL, multiprocessing, asyncio |
| 13 | `capstone.ts` | `cap-` | 4 | วางแผน, สร้าง, คุณภาพ/CI, deploy + ไปต่อ |

รวม ~**77 หัวข้อย่อย** ใน 13 บท (ไม่นับ overview) — ลึกกว่าคอร์สพื้นฐานที่มี ~31 หัวข้อ
(🆕 = หัวข้อที่เพิ่มจากการ audit ความครบถ้วน ดู `04-content-review.md`)

---

## 6. แผนการลงมือทำ (Build Plan — ทีละ Step)

> ขั้นตอนละเอียดอยู่ใน `03-build-steps.md` — แต่ละ step = หนึ่งเทิร์น/หนึ่งรอบการทำงาน

| Step | ทำอะไร | ผลลัพธ์ |
|------|--------|---------|
| **0** | Scaffold คอร์ส: สร้างโฟลเดอร์, `nav.ts`, `index.ts`, `overview.ts`, ลงทะเบียนใน `courses/index.ts` | คอร์สโผล่ใน catalog, เปิดหน้า overview ได้, build ผ่าน |
| **1** | เขียนบทที่ 1 (`python-deep.ts`) | 9 หัวข้อ Python ลึก |
| **2** | เขียนบทที่ 2 (`robust-code.ts`) | 5 หัวข้อ |
| **3** | เขียนบทที่ 3 (`debugging.ts`) 🆕 | 4 หัวข้อ debugging & performance |
| **4** | เขียนบทที่ 4 (`project-tooling.ts`) | 5 หัวข้อ |
| **5** | เขียนบทที่ 5 (`git-deep.ts`) | 5 หัวข้อ |
| **6** | เขียนบทที่ 6 (`testing.ts`) | 5 หัวข้อ |
| **7** | เขียนบทที่ 7 (`clean-code.ts`) | 5 หัวข้อ |
| **8** | เขียนบทที่ 8 (`real-data.ts`) | 6 หัวข้อ |
| **9** | เขียนบทที่ 9 (`databases.ts`) | 5 หัวข้อ |
| **10** | เขียนบทที่ 10 (`web-apps.ts`) | 7 หัวข้อ |
| **11** | เขียนบทที่ 11 (`dsa-mid.ts`) ⭐ | 13 หัวข้อ |
| **12** | เขียนบทที่ 12 (`concurrency.ts`) | 4 หัวข้อ |
| **13** | เขียนบทที่ 13 (`capstone.ts`) + อัปเดต overview ให้ครบ + ลิงก์ไป se-roadmap | คอร์สสมบูรณ์ |

**กฎการทำแต่ละ step:**
1. เขียนเนื้อหาตาม `02-curriculum.md` + กติกาใน `01-conventions.md`
2. เพิ่ม slug ใหม่เข้า `nav.ts` และ import page เข้า `index.ts`
3. รัน type-check / build ให้ผ่านก่อนถือว่าจบ step (`bun run build` หรืออย่างน้อย `bunx tsc --noEmit`)
4. อัปเดตตารางความคืบหน้า §7 ในไฟล์นี้

---

## 7. ตารางความคืบหน้า (Progress Tracker)

> อัปเดตช่อง "สถานะ" ทุกครั้งที่ทำ step เสร็จ: ⬜ ยังไม่ทำ / 🟡 กำลังทำ / ✅ เสร็จ

| Step | บท | สถานะ | หมายเหตุ |
|------|-----|-------|----------|
| 0 | Scaffold | ✅ | สร้างโฟลเดอร์+overview+nav+index, ลงทะเบียน catalog, build ผ่าน 74 หน้า |
| 1 | Python ระดับลึก (9) | ✅ | python-deep.ts ครบ 9 หัวข้อ, nav+index wired, build ผ่าน 83 หน้า |
| 2 | Robust code (5) | ✅ | robust-code.ts ครบ 5 หัวข้อ, build ผ่าน 88 หน้า |
| 3 | Debugging & Performance (4) 🆕 | ✅ | debugging.ts ครบ 4 หัวข้อ, build ผ่าน 92 หน้า |
| 4 | Project & tooling (5) | ✅ | project-tooling.ts ครบ 5 หัวข้อ, build ผ่าน 97 หน้า |
| 5 | Git ลึก (5) | ✅ | git-deep.ts ครบ 5 หัวข้อ, build ผ่าน 102 หน้า |
| 6 | Testing (5) | ✅ | testing.ts ครบ 5 หัวข้อ, build ผ่าน 107 หน้า |
| 7 | Clean code (5) | ⬜ | |
| 8 | Real data (6) | ⬜ | |
| 9 | Databases (5) | ⬜ | |
| 10 | Web + auth/security (7) | ⬜ | |
| 11 | DSA mid (13) ⭐ | ⬜ | |
| 12 | Concurrency (4) | ⬜ | |
| 13 | Capstone + ปิดคอร์ส (4) | ⬜ | |

---

## 8. โฟกัสของคอร์ส (ตัดสินใจแล้ว)

**โฟกัส: ทั่วไป (general-purpose) สำหรับ software engineer — เน้น DS & Algorithm**

คอร์สนี้ไม่ผูกกับสายงานเดียว (ไม่ใช่ web-only หรือ data-only) แต่สอน "สิ่งที่ software engineer ทุกคนต้องมี" และให้น้ำหนักพิเศษกับ **Data Structures & Algorithms** เพราะเป็นหัวใจของการเป็นโปรแกรมเมอร์ที่เก่งขึ้นและเป็นด่านสัมภาษณ์งานทุกที่

ผลของการเลือกโฟกัสนี้ต่อหลักสูตร:

- **บท 10 (DS & Algo) คือพระเอก** — ขยายเป็น 8 หัวข้อ ลงลึกทั้ง implementation + การวิเคราะห์ + โจทย์ และเชื่อมตรงไปคอร์ส practice-problems และ se-roadmap
- **บท 5 (Testing), บท 6 (Clean Code), บท 4 (Git)** — เก็บไว้เต็ม เพราะเป็นทักษะ engineer ทั่วไปที่ขาดไม่ได้
- **บท 8–9 (DB/Web)** — เก็บไว้แต่สอนแบบ "พอใช้งานเป็น" ไม่ลงลึก framework เฉพาะทางมากเกินไป (เพราะไม่ได้เล็งสาย web โดยเฉพาะ)
- **บท 7 (Real data)** — เน้นไฟล์/JSON/API ทั่วไป, ใส่ pandas แบบรู้จักไว้เฉย ๆ ไม่ลงลึก
- เชื่อมโยงท้ายคอร์สไป **practice-problems** (ฝึกโจทย์) และ **se-roadmap** (เตรียมสัมภาษณ์)

ถ้าจะปรับเพิ่มภายหลัง ให้แก้ที่ `02-curriculum.md` และตาราง §5/§6 ในไฟล์นี้ก่อนเริ่มเขียนโค้ดจริง
