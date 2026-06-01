# 03 — คู่มือลงมือทำทีละ Step (Build Playbook)

> ทำตามทีละ step — แต่ละ step จบในตัว, build ผ่านก่อนไป step ถัดไป
> เปิดคู่กับ `02-curriculum.md` (เนื้อหา) และ `01-conventions.md` (สไตล์)

---

## รายการ slug ทั้งหมดของคอร์สนี้ (ตรวจไม่ให้ซ้ำ)

ตรวจแล้วทุกตัวด้านล่าง **ไม่ซ้ำ** กับ slug ที่มีอยู่ในเว็บ (cs- pb- ds- algo- oop- web- pp- topic- ฯลฯ):

```
overview: intermediate
บท1:  py-comprehension py-iter-gen py-args py-hof-lambda py-closures py-decorators py-context py-mutability py-collections
บท2:  err-exceptions err-custom err-logging err-typing err-defensive
บท3:  dbg-debugger dbg-traceback dbg-profiling dbg-performance        ← 🆕 บทใหม่
บท4:  proj-modules proj-packages proj-venv proj-cli proj-env
บท5:  git-recap git-branch git-remote git-conflict git-workflow
บท6:  test-why test-pytest test-fixtures test-mock test-tdd
บท7:  clean-naming clean-principles clean-solid clean-refactor clean-patterns
บท8:  data-files data-formats data-regex data-http data-datetime data-pandas
บท9:  db-model db-sql db-advanced db-python db-orm
บท10: web2-http web2-framework web2-request web2-db web2-project web2-auth web2-security
บท11: dsa-choose dsa-stack-queue dsa-linked dsa-tree dsa-heap dsa-hash dsa-sorting dsa-binary-search dsa-twopointer dsa-recursion dsa-dp dsa-greedy dsa-graph
บท12: async-why async-threads async-process async-asyncio
บท13: cap-plan cap-build cap-quality cap-deploy
```

> 🆕 หัวข้อที่เพิ่มจากการ audit (ดู `04-content-review.md`): `py-mutability` `py-collections` · บท 3 ทั้งบท (`dbg-*`) · `data-regex` · `web2-auth` `web2-security` · `dsa-sorting` `dsa-binary-search` `dsa-twopointer` `dsa-greedy`
> ตรวจแล้ว: `dsa-binary-search` ≠ `topic-binary-search` (ของ se-roadmap) — ไม่ซ้ำ

> ⚠️ `web-` (คอร์สพื้นฐาน) มีอยู่แล้ว → คอร์สนี้ใช้ `web2-` กันชน
> ⚠️ `learn` และ `overview` ถูกใช้แล้ว → overview ของคอร์สนี้ใช้ `intermediate`

---

## Step 0 — Scaffold คอร์ส

**เป้า:** คอร์สโผล่ใน catalog, เปิดหน้า overview ได้, build ผ่าน (ยังไม่มีบทเนื้อหา)

### ไฟล์ที่ต้องสร้าง

**1. `lib/courses/intermediate-programming/pages/overview.ts`**
```ts
import type { Page } from "@/lib/types";

export const overviewPages: Record<string, Page> = {
  intermediate: {
    slug: "intermediate",
    title: "เขียนโปรแกรมระดับกลาง — ภาพรวม & หลักสูตร",
    lead: "ต่อยอดจากพื้นฐาน สู่ระดับ mid-level ที่ทำงานจริงได้ — เน้น Data Structures & Algorithms",
    group: "เขียนโปรแกรมระดับกลาง",
    blocks: [
      // Step 0: ใส่เกริ่น + ตาราง curriculum + setup + links ไปบท 1
      // Step 13: กลับมาเติมให้ครบทุกบท
    ],
  },
};
```

**2. `lib/courses/intermediate-programming/nav.ts`** — เริ่มมีแค่ overview + บท 1 (placeholder) แล้วเติมทีละบท:
```ts
import type { NavCategory } from "@/lib/types";

export const intermediateProgrammingNav: NavCategory[] = [
  {
    label: "เริ่มต้นที่นี่",
    items: [{ slug: "intermediate", title: "ภาพรวม & หลักสูตร" }],
  },
  // เพิ่มบทที่นี่ทีละ step (ดูบล็อกตัวอย่างท้ายไฟล์นี้)
];
```

**3. `lib/courses/intermediate-programming/index.ts`**
```ts
import type { Course, Page } from "@/lib/types";
import { intermediateProgrammingNav } from "./nav";
import { overviewPages } from "./pages/overview";
// import บทต่อ ๆ ไปที่นี่ทีละ step

const pages: Record<string, Page> = {
  ...overviewPages,
  // ...spread บทต่อ ๆ ไปที่นี่
};

export const intermediateProgramming: Course = {
  id: "intermediate-programming",
  title: "เขียนโปรแกรมระดับกลาง",
  description:
    "ต่อยอดจากพื้นฐานสู่ระดับ mid-level — Python ลึก, testing, git, clean code, ฐานข้อมูล, web API และ Data Structures & Algorithms ที่ใช้ทำงานและสัมภาษณ์จริง",
  badge: "🚀",
  overviewSlug: "intermediate",
  nav: intermediateProgrammingNav,
  pages,
  order: intermediateProgrammingNav.flatMap((c) => c.items.map((i) => i.slug)),
};
```

### ไฟล์ที่ต้องแก้

**`lib/courses/index.ts`** — เพิ่มเข้า COURSES:
```ts
import { intermediateProgramming } from "./intermediate-programming";
// ...
export const COURSES: Course[] = [
  seRoadmap,
  basicProgramming,
  intermediateProgramming, // ← เพิ่ม (วางหลัง basic ให้เรียงตามระดับ)
  practiceProblems,
];
```

### ตรวจรับ (Acceptance)
- [ ] `bun run build` ผ่าน ไม่มี type error
- [ ] เปิด `/course/intermediate-programming` เห็นหน้า overview
- [ ] catalog หน้าแรกมีการ์ดคอร์สใหม่
- [ ] อัปเดต progress tracker (README §7): Step 0 → ✅

---

## Step 1–13 — เขียนเนื้อหาทีละบท

ทุก step เนื้อหาทำ **4 อย่างเดียวกัน**:

### A. สร้างไฟล์ page ของบท
`lib/courses/intermediate-programming/pages/<chapter>.ts`
- export `Record<string, Page>` ตามเทมเพลตใน `01-conventions.md §3`
- เนื้อหาทุกหัวข้อตาม `02-curriculum.md`
- ครบทุกหัวข้อในบทนั้น (ห้ามทำครึ่ง ๆ)

### B. เพิ่มหมวดใน `nav.ts`
ต่อ array ด้วย NavCategory ของบทนั้น เช่น (บท 1):
```ts
{
  label: "บทที่ 1: Python ระดับลึก",
  items: [
    { slug: "py-comprehension", title: "Comprehension เจาะลึก" },
    { slug: "py-iter-gen", title: "Iterator & Generator" },
    { slug: "py-args", title: "*args, **kwargs & unpacking" },
    { slug: "py-hof-lambda", title: "Lambda & Higher-Order Functions" },
    { slug: "py-closures", title: "Scope & Closure" },
    { slug: "py-decorators", title: "Decorator" },
    { slug: "py-context", title: "Context Manager (with)" },
    { slug: "py-mutability", title: "Mutability, Reference & Copy" },
    { slug: "py-collections", title: "collections & itertools" },
  ],
},
```

### C. import เข้า `index.ts`
```ts
import { pythonDeepPages } from "./pages/python-deep";
// ...
const pages = { ...overviewPages, ...pythonDeepPages /* , ...บทถัดไป */ };
```

### D. build + อัปเดต tracker
- [ ] `bun run build` ผ่าน
- [ ] เปิดหน้าแต่ละ slug ดูว่า render ถูก, ลิงก์ถัดไป/กลับใช้ได้
- [ ] โค้ดตัวอย่างถูกต้อง (อ่านทวนว่า Python รันได้)
- [ ] README §7 → step นั้น ✅

### ตารางไฟล์ ↔ export name ↔ บท

| Step | ไฟล์ pages | export name | NavCategory label |
|------|-----------|-------------|-------------------|
| 1 | `python-deep.ts` | `pythonDeepPages` | บทที่ 1: Python ระดับลึก |
| 2 | `robust-code.ts` | `robustCodePages` | บทที่ 2: Error handling & โค้ดที่แข็งแรง |
| 3 🆕 | `debugging.ts` | `debuggingPages` | บทที่ 3: Debugging, Profiling & Performance |
| 4 | `project-tooling.ts` | `projectToolingPages` | บทที่ 4: โครงสร้างโปรเจกต์ & เครื่องมือ |
| 5 | `git-deep.ts` | `gitDeepPages` | บทที่ 5: Git สำหรับทำงานเป็นทีม |
| 6 | `testing.ts` | `testingPages` | บทที่ 6: การเขียนเทสต์ |
| 7 | `clean-code.ts` | `cleanCodePages` | บทที่ 7: Clean Code & การออกแบบ |
| 8 | `real-data.ts` | `realDataPages` | บทที่ 8: ทำงานกับข้อมูลจริง |
| 9 | `databases.ts` | `databasesPages` | บทที่ 9: ฐานข้อมูล & SQL |
| 10 | `web-apps.ts` | `webAppsPages` | บทที่ 10: สร้างเว็บแอป & API |
| 11 | `dsa-mid.ts` | `dsaMidPages` | บทที่ 11: Data Structures & Algorithms ⭐ |
| 12 | `concurrency.ts` | `concurrencyPages` | บทที่ 12: Concurrency & Async |
| 13 | `capstone.ts` | `capstonePages` | บทที่ 13: Capstone Project |

---

## Step 13 — งานปิดคอร์ส (เพิ่มเติมจากการเขียนบท 13)

- [ ] กลับไปเติม `overview.ts` ให้มีตาราง curriculum ครบ 12 บท + `links` ไปทุกบท (เหมือน `learn` ของคอร์สพื้นฐาน)
- [ ] ใส่ลิงก์เชื่อม: ท้ายบท 10 และบท 12 → `pp-basics` (practice-problems) และ se-roadmap
- [ ] (ทางเลือก) เพิ่มลิงก์ใน overview ของคอร์สพื้นฐาน (`learn`) ว่า "เรียนจบแล้วไปต่อคอร์สระดับกลาง"
- [ ] รัน build รอบสุดท้าย + ไล่อ่านทุกหน้าครั้งสุดท้าย

---

## คำสั่งที่ใช้บ่อย

```bash
# ติดตั้ง dependency (ครั้งแรก)
bun install

# dev server ดูผลระหว่างเขียน
bun run dev            # เปิด http://localhost:3000

# build ตรวจ type + ทุกหน้า (ต้องผ่านก่อนปิด step)
bun run build

# ตรวจ type อย่างเดียว (เร็วกว่า)
bunx tsc --noEmit
```

---

## เคล็ดลับคุณภาพ (ทำให้คอร์สดีจริง)

1. **เขียนทีละบทให้เสร็จสมบูรณ์** — ดีกว่าเขียน 12 บทแบบลวก ๆ (ตรงกับที่เจ้าของเว็บย้ำ: ลึก ไม่ใช่สั้น)
2. **พิมพ์ผลลัพธ์โค้ดให้ถูก** — ผู้เรียนพิมพ์ตามแล้วต้องได้ผลเหมือนที่เขียนไว้ ไม่งั้นเสียความเชื่อถือ
3. **callout เตือนกับดัก** — จุดที่มือใหม่พลาดบ่อยคือสิ่งที่มีค่าที่สุดในคอร์ส
4. **เชื่อมโยงระหว่างบท** — เช่น decorator (บท1) → memoize (บท10 DP); testing (บท5) → refactor (บท6); typing (บท2) → FastAPI (บท9)
5. **บท 10 (DSA) ลงแรงพิเศษ** — เป็นบทเด่นตามโฟกัสคอร์ส ทุกหัวข้อควรมีทั้ง implementation + วิเคราะห์ Big-O + โจทย์ + ลิงก์ฝึกต่อ
6. หลังจบแต่ละบท พิจารณาบันทึกสิ่งที่ตัดสินใจไว้ใน memory ของโปรเจกต์ ถ้าจะช่วยงานบทต่อไป
