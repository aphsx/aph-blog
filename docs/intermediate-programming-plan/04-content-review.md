# 04 — ตรวจสอบความครบถ้วนของเนื้อหา (Content Completeness Review)

> ไฟล์นี้ตอบคำถาม: **"เราพลาดอะไรไปไหม? เนื้อหาลึกพอจริงไหม?"**
> เป็นทั้ง *วิธีคิด* (ใช้ตรวจซ้ำได้เรื่อย ๆ) และ *หลักฐาน* ว่าหลักสูตรครบสำหรับ zero→mid
>
> ใช้เมื่อไร: ทุกครั้งที่จะเพิ่ม/ลดบท หรือสงสัยว่าคอร์ส "พอ" หรือยัง — กลับมารันchecklist นี้

---

## 1. วิธีคิด: ตรวจคอร์สเหมือน debug (How to audit)

อย่าเชื่อว่า "เนื้อหาครบ" เพราะรู้สึกว่าเยอะ — ให้พิสูจน์แบบมีระบบ เหมือนไล่หาบั๊ก:

1. **ตั้งเกณฑ์ที่วัดได้** — เขียน "checklist ทักษะที่ mid-level ต้องมี" ออกมาเป็นข้อ ๆ ก่อน (ดู §2) อย่าประเมินจากความรู้สึก
2. **ไล่ทีละข้อ → หา fail path** — แต่ละทักษะ ถามว่า "บทไหนสอน? ลึกพอไหม?" ถ้าตอบไม่ได้ = ช่องว่าง (gap)
3. **แยกระดับ gap** — ขาดหายเลย (P0) / มีแต่ตื้น (P1) / มีก็ดี (P2) อย่าเหมารวม
4. **จัดอันดับด้วย "ความเจ็บถ้าขาด"** — ถ้าไม่มีสิ่งนี้ คนเรียนจะพังตรงไหนในงานจริง? ยิ่งเจ็บ ยิ่งสำคัญ
5. **พิสูจน์ย้อนกลับ (coverage matrix)** — แต่ละทักษะ map กลับไปบทที่สอน (§4) ถ้ามีช่องว่างในตาราง = ยังไม่ครบ
6. **ตัดสินใจอย่างมีเหตุผล** — เพิ่มอะไร เลื่อนอะไร และ *เขียนเหตุผลไว้* (§3, §5)

> หลักการ: "คอร์สครบ" ไม่ใช่ความเห็น แต่เป็นผลของ checklist ที่ map ครบทุกช่อง

---

## 2. Checklist ทักษะ mid-level programmer (เกณฑ์ตัดสิน)

นี่คือเกณฑ์ที่ใช้ตรวจ ถ้าคอร์สสอนครบทุกข้อ = พาถึง mid ได้ (จัดกลุ่มตามด้าน)

**ก. ภาษา & การเขียนโค้ดเชิงลึก**
- [ ] เขียนโค้ด Pythonic (comprehension, generator, decorator, context manager)
- [ ] เข้าใจ scope/closure
- [ ] **เข้าใจ mutability / reference / copy** ← จุดตายมือกลาง
- [ ] ใช้ `collections` / `itertools` เป็น
- [ ] ใช้ type hints

**ข. ความถูกต้อง & ความน่าเชื่อถือของโค้ด**
- [ ] จัดการ exception อย่างเหมาะสม + logging
- [ ] **เขียนเทสต์ได้ (unit, mock, TDD)** ← จุดตายมือกลาง
- [ ] **debug ด้วย debugger จริง อ่าน traceback เป็น** ← จุดตายมือกลาง
- [ ] เขียน defensive code, validate input

**ค. คุณภาพ & การออกแบบ**
- [ ] เขียนโค้ดสะอาด ตั้งชื่อดี (clean code)
- [ ] เข้าใจ SOLID, refactoring, design pattern
- [ ] **วัด performance เป็น (profiling) ไม่ใช่เดา** ← เสริม Big-O

**ง. เครื่องมือ & การทำงานเป็นทีม**
- [ ] จัดโครงสร้างโปรเจกต์ (module/package/venv)
- [ ] **ใช้ git ทำงานเป็นทีม (branch/merge/conflict/PR)** ← ขาดไม่ได้
- [ ] ใช้ CLI / env config / tooling

**จ. ข้อมูล & ระบบจริง**
- [ ] อ่าน/เขียนไฟล์, CSV/JSON
- [ ] เรียก REST API จริง
- [ ] **regex** (ประมวลผลข้อความ)
- [ ] ออกแบบ & query ฐานข้อมูล (SQL + ORM)
- [ ] สร้าง web API จริง
- [ ] **authentication + security พื้นฐาน** ← แอปจริงทุกตัวต้องมี

**ฉ. Data Structures & Algorithms (หัวใจ)**
- [ ] เลือก DS ให้เหมาะ + วิเคราะห์ Big-O
- [ ] stack/queue, linked list, tree/BST, hash, graph (BFS/DFS)
- [ ] **heap/priority queue** ← เจอบ่อย ขาดไม่ได้
- [ ] **sorting เชิงลึก** (เขียนเอง + เลือกใช้)
- [ ] **binary search variations**
- [ ] **two-pointer / sliding window** ← เทคนิคแก้โจทย์หลัก
- [ ] recursion/backtracking, DP, **greedy**

**ช. ระดับระบบ**
- [ ] concurrency/async เบื้องต้น
- [ ] ทำโปรเจกต์จริงตั้งแต่ต้นจนจบ (capstone) + CI

---

## 3. ผลการ audit รอบที่ 1 (Gap Analysis)

ไล่ checklist §2 กับหลักสูตรเดิม (63 หัวข้อ) เจอช่องว่างดังนี้:

### 🔴 P0 — ขาดหาย & สำคัญมาก
| # | ช่องว่าง | ทำไมเจ็บถ้าขาด |
|---|----------|----------------|
| 1 | **Debugging ด้วย debugger จริง** (pdb/IDE, breakpoint, อ่าน traceback ลึก) | แยก mid ออกจาก junior ชัดที่สุด — เดิมมีแค่ "อ่าน error" ในคอร์สพื้นฐาน |
| 2 | **Mutability / reference / copy / `is` vs `==`** | บั๊ก Python อันดับ 1 ของมือกลาง — เดิมเป็นแค่เชิงอรรถ |
| 3 | **DSA ขาดแกนหลัก**: heap, sorting ลึก, binary search variations, two-pointer/sliding window, greedy | บทเด่นแต่ขาดหัวข้อที่เจอบ่อยสุดในงาน+สัมภาษณ์ |

### 🟡 P1 — มีคุณค่าปฏิบัติสูง
| # | ช่องว่าง | หมายเหตุ |
|---|----------|----------|
| 4 | `collections` & `itertools` | เครื่องมือใช้ทุกวัน เดิมกระจัดกระจาย |
| 5 | Regular expressions | ทักษะปฏิบัติ ไม่มีเลย |
| 6 | Profiling & performance (`timeit`/`cProfile`) | เสริม Big-O เชิงทฤษฎีด้วยการวัดจริง |
| 7 | Security พื้นฐาน (hash รหัสผ่าน, secret, XSS/CSRF, validate) | เดิมพูดแค่ SQL injection |
| 8 | Authentication ในเว็บ (session/JWT) | แอปจริงทุกตัวต้องมี — เดิมบท web ไม่มี |

### 🟢 P2 — มีก็ดี (ดู §5 ว่าจัดการยังไง)
Docker/container · modern tooling (pyproject/ruff) · docstring & อ่าน docs · bit manipulation

---

## 4. การตัดสินใจ & สิ่งที่เพิ่ม (Resolution)

**ตัดสินใจ:** เพิ่ม **P0 + P1 ทั้งหมด** เข้าหลักสูตร (P2 จัดการแบบ §5)

ผลต่อโครงสร้าง — หลักสูตรขยายจาก 63 → **~77 หัวข้อ ใน 13 บท**:

| บท | การเปลี่ยนแปลง |
|----|----------------|
| 1 Python ลึก | +`py-mutability` (P0-2), +`py-collections` (P1-4) → **9 หัวข้อ** |
| **3 (ใหม่) Debugging & Performance** | บทใหม่ทั้งบท: `dbg-debugger`, `dbg-traceback` (P0-1), `dbg-profiling`, `dbg-performance` (P1-6) → **4 หัวข้อ** |
| 8 Real data | +`data-regex` (P1-5) → **6 หัวข้อ** |
| 10 Web | +`web2-auth`, +`web2-security` (P1-7,8) → **7 หัวข้อ** |
| 11 DSA ⭐ | +`dsa-sorting`, +`dsa-heap`, +`dsa-binary-search`, +`dsa-twopointer`, +`dsa-greedy` (P0-3) → **13 หัวข้อ** |

> บทใหม่ "Debugging & Performance" แทรกเป็น **บทที่ 3** (หลัง Robust code) เพราะเรียน error handling แล้วต่อด้วย "วิธีไล่จับ error" เป็นลำดับธรรมชาติ → บทเดิม 3–12 เลื่อนเป็น 4–13

---

## 5. P2 — เลื่อน/แทรกเล็กน้อย (พร้อมเหตุผล)

ไม่ทำเป็นบทแยก แต่แทรกในบทที่เกี่ยวข้อง เพื่อคุมขอบเขตไม่ให้คอร์สบวมเกินจำเป็น:

| P2 | จัดการยังไง | เหตุผล |
|----|-------------|--------|
| Docstring & อ่าน docs | แทรกใน `clean-naming` + capstone README | เป็น soft skill เสริม ไม่ต้องบทเต็ม |
| Modern tooling (pyproject/ruff/black) | แทรกใน `cap-quality` (มี linter/CI อยู่แล้ว) | ต่อยอดธรรมชาติจาก CI |
| Docker/container | แทรกใน `cap-deploy` (ภาพรวม deploy) | mid ตอนต้นยังไม่ต้องลึก |
| Bit manipulation | แทรกเป็นหัวข้อเสริม (`details`) ใน `dsa-choose` | แนวสัมภาษณ์เฉพาะ ไม่ใช่ทักษะงานหลัก |

> ถ้าภายหลังคนเรียนเล็งสายที่ต้องใช้ P2 จริง (เช่น DevOps → Docker) ค่อยแยกเป็นบทเต็ม

---

## 6. Coverage Matrix — พิสูจน์ว่าครบ (ทุกทักษะมีบทรองรับ)

ทุกข้อใน checklist §2 ต้องมีบทรองรับ ถ้าช่องไหนว่าง = ยังไม่ครบ **(หลังเพิ่ม P0+P1 แล้ว ไม่มีช่องว่าง)**

| ทักษะ (จาก §2) | บทที่รองรับ |
|----------------|-------------|
| โค้ด Pythonic | 1 (comprehension, generator, decorator, context) |
| scope/closure | 1 (py-closures) |
| mutability/reference/copy ✅เพิ่ม | 1 (py-mutability) |
| collections/itertools ✅เพิ่ม | 1 (py-collections) |
| type hints | 2 (err-typing) |
| exception + logging | 2 (err-exceptions, err-logging) |
| testing (unit/mock/TDD) | 6 (test-*) |
| debugging + traceback ✅เพิ่ม | 3 (dbg-debugger, dbg-traceback) |
| defensive/validate | 2 (err-defensive) |
| clean code/naming | 7 (clean-naming) + docstring (P2) |
| SOLID/refactor/pattern | 7 (clean-*) |
| profiling/performance ✅เพิ่ม | 3 (dbg-profiling, dbg-performance) |
| project structure | 4 (proj-*) |
| git ทีม | 5 (git-*) |
| CLI/env/tooling | 4 (proj-cli, proj-env) + tooling (P2 ใน cap-quality) |
| ไฟล์/CSV/JSON | 8 (data-files, data-formats) |
| REST API | 8 (data-http) |
| regex ✅เพิ่ม | 8 (data-regex) |
| SQL + ORM | 9 (db-*) |
| web API | 10 (web2-*) |
| auth + security ✅เพิ่ม | 10 (web2-auth, web2-security) |
| เลือก DS + Big-O | 11 (dsa-choose) |
| stack/queue/linked/tree/hash/graph | 11 (dsa-*) |
| heap ✅เพิ่ม | 11 (dsa-heap) |
| sorting ลึก ✅เพิ่ม | 11 (dsa-sorting) |
| binary search ✅เพิ่ม | 11 (dsa-binary-search) |
| two-pointer/sliding window ✅เพิ่ม | 11 (dsa-twopointer) |
| recursion/backtracking/DP/greedy | 11 (dsa-recursion, dsa-dp, dsa-greedy✅) |
| concurrency/async | 12 (async-*) |
| capstone + CI + deploy | 13 (cap-*) + Docker (P2) |

**ผล: ทุกทักษะ mid-level มีบทรองรับครบ ไม่มีช่องว่าง** → หลักสูตรพิสูจน์แล้วว่าครบสำหรับ zero→mid

---

## 7. รันซ้ำได้ (เมื่อไรควรกลับมาตรวจ)

- ก่อนเพิ่ม/ลดบทใด ๆ → กลับมาดู §2 ว่ากระทบ coverage ตรงไหน
- ทุกครั้งที่เขียนบทเสร็จ → ติ๊ก checklist §2 ข้อที่บทนั้นครอบคลุม
- ถ้ามีคนเรียนติดตรงไหนซ้ำ ๆ → นั่นคือ gap ใหม่ บันทึกเป็น P0/P1/P2 ที่นี่แล้วตัดสินใจ
