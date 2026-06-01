# 02 — หลักสูตรเต็ม (Full Curriculum)

> โฟกัส: **ทั่วไปสำหรับ software engineer เน้น DS & Algorithm**
> ไฟล์นี้คือ "พิมพ์เขียว" ของทุกหัวข้อ — ตอนเขียนบทจริง ให้เปิดไฟล์นี้คู่กับ `01-conventions.md`
>
> แต่ละหัวข้อระบุ: `slug` · เป้าหมายการเรียนรู้ · แนวคิดที่ต้องสอน · ตัวอย่างโค้ดที่ต้องมี · กับดัก/callout · แบบฝึกหัด

---

## บทที่ 0 — ภาพรวม (`overview.ts`)

**slug:** `intermediate` · **title:** "เขียนโปรแกรมระดับกลาง — ภาพรวม & หลักสูตร"

- เกริ่น: คอร์สนี้คือ "ช่วงกลาง" ระหว่างคอร์สพื้นฐาน → การสมัครงาน
- ใครเหมาะ / prerequisite (จบคอร์สพื้นฐาน หรือเขียน Python พื้นฐานได้)
- ตาราง curriculum 12 บท (ก็อปจาก README §5)
- "เรียนอย่างไรให้ได้ผล" (พิมพ์โค้ดเอง, ทำแบบฝึกหัด, ทำ capstone)
- callout: setup สภาพแวดล้อม (Python 3.10+, VS Code, terminal) — ต่างจากคอร์สพื้นฐานที่รันออนไลน์ได้ คอร์สนี้ควรลงเครื่องจริงแล้ว
- `links` ไปบทที่ 1 + ลิงก์กลับคอร์สพื้นฐาน (`learn`)

> หมายเหตุ: หน้านี้สร้างใน Step 0 แบบย่อก่อน แล้วมาเติมตารางให้ครบใน Step 12

---

## บทที่ 1 — Python ระดับลึก (`python-deep.ts`, prefix `py-`)

> เป้าหมายบท: ยกระดับจาก "เขียน Python ได้" → "เขียน Python แบบคน Python จริง ๆ (Pythonic)" สิ่งเหล่านี้คือสิ่งที่เจอในโค้ดงานจริงและ code review ทุกวัน

### 1.1 `py-comprehension` — Comprehension เจาะลึก
- **เรียนรู้:** เขียน list/dict/set comprehension อ่านง่าย + รู้ขีดจำกัด
- **สอน:** list comp พื้นฐาน → มี condition (`if`) → if/else ในนิพจน์ → nested comprehension → dict comp → set comp
- **โค้ด:** แปลง for-loop เป็น comp เทียบกัน, `{k: v for ...}`, flatten 2D list
- **callout(warn):** อย่าทำ comprehension ซ้อนเกิน 2 ชั้นหรือยัด logic เยอะ — อ่านไม่ออก ใช้ for loop ดีกว่า
- **แบบฝึกหัด:** กรองเลขคู่+ยกกำลังสอง, สร้าง dict นับความถี่, flatten list ซ้อน

### 1.2 `py-iter-gen` — Iterator & Generator (yield)
- **เรียนรู้:** เข้าใจ iterator protocol และเขียน generator เพื่อประหยัด memory
- **สอน:** iterable vs iterator, `iter()`/`next()`, generator function (`yield`), generator expression, lazy evaluation, ทำไม `range` ไม่กิน RAM
- **โค้ด:** generator นับเลขไม่รู้จบ, อ่านไฟล์ใหญ่ทีละบรรทัด, `sum(x*x for x in range(10))`
- **analogy:** generator = "สายพานผลิตทีละชิ้นเมื่อขอ" vs list = "ผลิตทุกชิ้นกองไว้ก่อน"
- **callout:** generator ใช้ได้ครั้งเดียว (หมดแล้วหมดเลย)
- **แบบฝึกหัด:** generator ฟีโบนักชี, generator กรองบรรทัดจากไฟล์

### 1.3 `py-args` — *args, **kwargs & การ unpack
- **เรียนรู้:** เขียนฟังก์ชันรับ argument แบบยืดหยุ่น และ unpack ข้อมูล
- **สอน:** positional vs keyword args, default value (กับดัก mutable default!), `*args`, `**kwargs`, unpacking `*list` / `**dict` ตอนเรียก, `*` บังคับ keyword-only
- **โค้ด:** `def total(*nums)`, `def config(**opts)`, `print(*my_list)`, `func(**my_dict)`
- **callout(warn):** mutable default argument (`def f(x=[])`) — bug คลาสสิก อธิบายว่าทำไม + วิธีแก้ (`x=None`)
- **แบบฝึกหัด:** ฟังก์ชัน sum ไม่จำกัดจำนวน, wrapper ที่ส่งต่อ args ทั้งหมด

### 1.4 `py-hof-lambda` — Lambda & Higher-Order Functions
- **เรียนรู้:** มองฟังก์ชันเป็น "ค่า" ที่ส่งต่อได้
- **สอน:** function เป็น first-class object, `lambda`, `sorted(key=...)`, `map`/`filter`, ทำไม comprehension มักดีกว่า map/filter, `functools.reduce` (พอรู้จัก)
- **โค้ด:** sort list of dict ด้วย key, sort ด้วยหลาย key, ฟังก์ชันรับฟังก์ชันเป็น argument
- **callout:** ใน Python นิยม comprehension มากกว่า map/filter — สอนให้รู้จักทั้งคู่แต่แนะแนวทาง
- **แบบฝึกหัด:** เรียงรายชื่อตามนามสกุล, สร้างฟังก์ชัน apply_twice(f, x)

### 1.5 `py-closures` — Scope & Closure
- **เรียนรู้:** เข้าใจ scope (LEGB) และ closure — รากฐานของ decorator
- **สอน:** local/global/nonlocal, LEGB rule, `global`/`nonlocal`, closure คืออะไร (ฟังก์ชันจำค่าจาก scope แม่), ตัวอย่าง counter/factory function
- **โค้ด:** `make_multiplier(n)` คืนฟังก์ชัน, counter ด้วย `nonlocal`
- **callout(warn):** กับดัก late binding ใน loop (closure ใน for loop จับค่าไม่ตรงที่คิด)
- **แบบฝึกหัด:** factory สร้างฟังก์ชันบวกค่าคงที่, counter ที่นับขึ้นเรื่อย ๆ

### 1.6 `py-decorators` — Decorator
- **เรียนรู้:** เขียน decorator เพื่อเพิ่มความสามารถให้ฟังก์ชันโดยไม่แก้ตัวฟังก์ชัน
- **สอน:** decorator คืออะไร (closure + syntax `@`), เขียน decorator เปล่า → decorator ที่ wrap ด้วย `*args/**kwargs` → `functools.wraps` (ทำไมต้องใช้) → decorator ที่รับ argument
- **โค้ด:** `@timer` วัดเวลา, `@log_call`, `@retry(times=3)`
- **analogy:** กระดาษห่อของขวัญที่เพิ่มฟีเจอร์ให้กล่องโดยไม่แกะกล่อง
- **callout:** decorator ที่เจอจริง — Flask `@app.route`, pytest `@fixture`, `@property`
- **แบบฝึกหัด:** เขียน @timer, เขียน decorator ที่ cache ผลลัพธ์ (memoize เบื้องต้น)

### 1.7 `py-context` — Context Manager (`with`)
- **เรียนรู้:** ใช้และเขียน `with` เพื่อจัดการ resource ให้ปิดเสมอ
- **สอน:** ทำไมต้อง `with` (ปิดไฟล์/connection อัตโนมัติแม้ error), `__enter__`/`__exit__`, `contextlib.contextmanager` + `yield`
- **โค้ด:** `with open(...)`, เขียน context manager จับเวลา, context manager เปิด-ปิด DB connection
- **callout(warn):** ลืมปิด resource = memory/handle leak — `with` แก้ปัญหานี้
- **แบบฝึกหัด:** เขียน context manager ที่ print "เข้า/ออก", context manager วัดเวลา block
- **ปิดบท:** `links` → บทที่ 2

---

## บทที่ 2 — Error handling & โค้ดที่แข็งแรง (`robust-code.ts`, prefix `err-`)

> เป้าหมายบท: โค้ดที่ "พังอย่างสง่างาม" บอกได้ว่าพังเพราะอะไร และดีบักง่าย — แยก mid-level ออกจากมือใหม่ที่โค้ด crash เงียบ ๆ

### 2.1 `err-exceptions` — Exception เจาะลึก
- **สอน:** `try/except/else/finally` ครบ, จับ exception เฉพาะชนิด (อย่า bare `except:`), exception hierarchy, `as e`, จับหลายชนิด, re-raise
- **โค้ด:** อ่าน input แปลงเลขแบบปลอดภัย, try/except/else/finally เต็มรูป
- **callout(warn):** `except:` เปล่า ๆ กลืน error ทุกอย่างรวมถึง bug ของเรา — ห้ามทำ
- **แบบฝึกหัด:** ฟังก์ชันหารที่จัดการ ZeroDivisionError + ValueError

### 2.2 `err-custom` — สร้าง Exception เอง & raise
- **สอน:** `raise`, สร้าง custom exception class (สืบจาก `Exception`), เมื่อไรควรสร้าง, exception chaining (`raise ... from ...`)
- **โค้ด:** `class InsufficientFundsError(Exception)`, ระบบถอนเงินที่ raise error เอง
- **callout:** custom exception ทำให้ caller จับเฉพาะ error ของเราได้ตรงจุด
- **แบบฝึกหัด:** ระบบ validate อายุที่ raise custom error

### 2.3 `err-logging` — Logging (เลิก print debug)
- **สอน:** ทำไม `print` ไม่พอในงานจริง, `logging` module, levels (DEBUG/INFO/WARNING/ERROR/CRITICAL), format, เขียนลงไฟล์, logger ต่อ module
- **โค้ด:** ตั้งค่า basic logging, log แต่ละ level, log exception ด้วย `logging.exception`
- **callout:** print หาย/ควบคุมไม่ได้ใน production — logging เปิด/ปิด/กรองระดับได้
- **แบบฝึกหัด:** แปลงสคริปต์ที่ใช้ print เป็น logging

### 2.4 `err-typing` — Type Hints & mypy
- **สอน:** type hint คืออะไร (ไม่บังคับตอน run แต่ช่วยมาก), annotate ตัวแปร/พารามิเตอร์/return, `list[int]`, `dict[str, int]`, `Optional`/`| None`, `typing` module, `mypy` ตรวจ type, `@dataclass` แนะนำสั้น ๆ
- **โค้ด:** ฟังก์ชันมี type hint เต็ม, dataclass แทน class ที่มีแต่ data
- **callout:** type hint ช่วย autocomplete + จับ bug ก่อนรัน — มาตรฐานโค้ดทีมสมัยใหม่
- **แบบฝึกหัด:** ใส่ type hint ให้ฟังก์ชันเดิม, แปลง class เป็น dataclass

### 2.5 `err-defensive` — Defensive Programming
- **สอน:** validate input ที่ขอบระบบ, `assert` (และเมื่อไรไม่ควรใช้แทน exception), EAFP vs LBYL (สไตล์ Python), fail fast
- **โค้ด:** ฟังก์ชัน validate, เทียบ EAFP (`try`) กับ LBYL (`if`)
- **callout(warn):** `assert` ถูกปิดได้ด้วย `python -O` → อย่าใช้ assert ตรวจ input ผู้ใช้
- **แบบฝึกหัด:** เขียนฟังก์ชันที่ validate และ raise error เหมาะสม
- **ปิดบท:** `links` → บทที่ 3

---

## บทที่ 3 — โครงสร้างโปรเจกต์ & เครื่องมือ (`project-tooling.ts`, prefix `proj-`)

> เป้าหมายบท: เลิกเขียนทุกอย่างในไฟล์เดียว — จัดโปรเจกต์แบบมืออาชีพที่รันและแชร์ได้

### 3.1 `proj-modules` — Module & import
- **สอน:** module คือไฟล์ .py, `import` แบบต่าง ๆ (`import x`, `from x import y`, `as`), `if __name__ == "__main__":` (ทำไมสำคัญ), namespace
- **โค้ด:** แยกฟังก์ชันไป util.py แล้ว import มาใช้, guard `__main__`
- **callout:** `if __name__ == "__main__"` = "รันเฉพาะตอนเรียกไฟล์นี้ตรง ๆ ไม่รันตอนถูก import"
- **แบบฝึกหัด:** แยกโค้ดเป็น 2 ไฟล์ import กัน

### 3.2 `proj-packages` — Package & โครงสร้างโฟลเดอร์
- **สอน:** package = โฟลเดอร์ที่มี `__init__.py`, การจัด layout โปรเจกต์จริง (`src/`, `tests/`, `README.md`), relative vs absolute import
- **โค้ด/text:** ตัวอย่าง tree โครงสร้างโปรเจกต์มาตรฐาน
- **callout:** layout ที่ดีทำให้คนอื่น (และตัวเราในอนาคต) หาของเจอ
- **แบบฝึกหัด:** จัดโปรเจกต์เล็กเป็น package

### 3.3 `proj-venv` — Virtual Environment & pip
- **สอน:** ทำไมต้อง venv (แยก dependency แต่ละโปรเจกต์), `python -m venv`, activate, `pip install`, `pip freeze > requirements.txt`, `pip install -r`
- **โค้ด:** `lang: bash` คำสั่งสร้าง/เปิด venv, ติดตั้ง package, gen requirements
- **callout(warn):** อย่า `pip install` ลง global — ใช้ venv เสมอ ไม่งั้นโปรเจกต์ตีกัน
- **แบบฝึกหัด:** สร้าง venv + ติดตั้ง `requests` + freeze

### 3.4 `proj-cli` — สร้าง CLI ด้วย argparse
- **สอน:** `sys.argv` พื้นฐาน → `argparse` (positional, optional, flag, help, type, default), สร้างเครื่องมือ command-line
- **โค้ด:** เครื่องมือ CLI รับ argument (เช่นโปรแกรมแปลงหน่วย / นับคำในไฟล์)
- **callout:** argparse สร้าง `--help` ให้ฟรี + validate type ให้
- **แบบฝึกหัด:** เขียน CLI รับชื่อไฟล์ + flag แล้วทำงานตาม

### 3.5 `proj-env` — Environment Variables & Config
- **สอน:** ทำไมไม่ฮาร์ดโค้ด secret, `os.environ`, ไฟล์ `.env` + `python-dotenv`, แยก config ออกจากโค้ด, `.gitignore` secret
- **โค้ด:** อ่าน API key จาก env, โหลด .env
- **callout(warn):** อย่า commit รหัสผ่าน/API key ลง git เด็ดขาด — ใช้ env + .gitignore
- **แบบฝึกหัด:** ย้าย config ฮาร์ดโค้ดไปเป็น env var
- **ปิดบท:** `links` → บทที่ 4

---

## บทที่ 4 — Git ลึก (`git-deep.ts`, prefix `git-`)

> เป้าหมายบท: ใช้ git ทำงานเป็นทีมจริง ไม่ใช่แค่ add/commit/push — ทักษะที่ทุกบริษัทถือว่าต้องมี

### 4.1 `git-recap` — ทบทวน git พื้นฐาน + mental model
- **สอน:** git คืออะไร (snapshot ไม่ใช่ diff), 3 พื้นที่ (working dir / staging / repo), `init/status/add/commit/log`, commit คืออะไร
- **โค้ด:** `lang: bash` วงจร add → commit → log
- **callout:** mental model 3 พื้นที่ — เข้าใจอันนี้แล้ว git ง่ายขึ้นมาก
- **แบบฝึกหัด:** สร้าง repo + commit แรก

### 4.2 `git-branch` — Branch & Merge
- **สอน:** branch คืออะไร (ทำไมต้องแยก), `branch/switch/checkout -b`, `merge`, fast-forward vs merge commit, ลบ branch
- **โค้ด:** สร้าง feature branch → แก้ → merge กลับ main
- **callout:** อย่าทำงานบน main ตรง ๆ — แยก branch ต่อ feature เสมอ
- **แบบฝึกหัด:** ทำ feature branch แล้ว merge

### 4.3 `git-remote` — Remote, GitHub & push/pull
- **สอน:** remote คืออะไร, `remote add`, `push`, `pull`, `fetch`, `clone`, การทำงานกับ GitHub, SSH/token เบื้องต้น
- **โค้ด:** เชื่อม repo กับ GitHub แล้ว push
- **callout:** `pull` = `fetch` + `merge`
- **แบบฝึกหัด:** push โปรเจกต์ขึ้น GitHub

### 4.4 `git-conflict` — Merge Conflict & Rebase
- **สอน:** conflict เกิดยังไง, อ่าน conflict marker (`<<<<<<<`), แก้ทีละจุด, `merge` vs `rebase` (ต่างกันยังไง เมื่อไรใช้), กฎทองของ rebase (อย่า rebase ของที่ push แล้ว)
- **โค้ด:** จำลอง conflict + วิธีแก้
- **callout(warn):** อย่า rebase branch ที่คนอื่นใช้/push แล้ว
- **แบบฝึกหัด:** สร้าง conflict แล้วแก้ให้จบ

### 4.5 `git-workflow` — PR Workflow & commit hygiene
- **สอน:** branching strategy (feature branch / trunk-based เบื้องต้น), Pull Request คืออะไร + code review, commit message ที่ดี (conventional commits), `.gitignore`, `git revert` vs `reset`
- **โค้ด:** ตัวอย่าง commit message ดี/ไม่ดี, .gitignore ตัวอย่าง
- **callout:** commit เล็ก ๆ สื่อความหมาย ดีกว่า commit ใหญ่ก้อนเดียว
- **แบบฝึกหัด:** เปิด PR บน GitHub (จำลอง flow)
- **ปิดบท:** `links` → บทที่ 5

---

## บทที่ 5 — การเขียนเทสต์ (`testing.ts`, prefix `test-`)

> เป้าหมายบท: เขียนเทสต์เป็น — นี่คือทักษะที่ชัดเจนที่สุดที่แยก junior ที่ "พร้อมทำงาน" ออกจากมือใหม่

### 5.1 `test-why` — ทำไมต้องเทสต์ & ประเภทของเทสต์
- **สอน:** ปัญหาของการเทสต์มือ, test ช่วยอะไร (กล้าแก้โค้ด, จับ regression), pyramid: unit/integration/e2e, อะไรควรเทสต์
- **โค้ด:** assert ง่าย ๆ เทียบกับเทสต์มือ
- **callout:** เทสต์ = ตาข่ายนิรภัย ทำให้ refactor ได้โดยไม่กลัวพัง
- **แบบฝึกหัด:** เขียน assert ตรวจฟังก์ชันง่าย ๆ

### 5.2 `test-pytest` — เริ่มต้นกับ pytest
- **สอน:** ติดตั้ง pytest, ตั้งชื่อไฟล์/ฟังก์ชัน `test_`, ใช้ `assert`, รัน `pytest`, อ่านผลลัพธ์, จัดโฟลเดอร์ tests/
- **โค้ด:** ฟังก์ชัน + ไฟล์เทสต์, `lang: bash` รัน pytest
- **callout:** pytest ใช้ `assert` ธรรมดา ไม่ต้องจำ assertEqual เยอะ ๆ
- **แบบฝึกหัด:** เขียนเทสต์ให้ฟังก์ชัน 3 เคส (ปกติ/ขอบ/ผิด)

### 5.3 `test-fixtures` — Fixture & Parametrize
- **สอน:** ซ้ำซ้อนใน setup → `@pytest.fixture`, `@pytest.mark.parametrize` (เทสต์หลายเคสด้วยโค้ดเดียว), `pytest.raises` (เทสต์ว่า raise error)
- **โค้ด:** fixture เตรียมข้อมูล, parametrize หลายเคส, ตรวจ exception
- **callout:** parametrize = เขียนเทสต์ครั้งเดียว รันหลายชุดข้อมูล
- **แบบฝึกหัด:** parametrize เทสต์ฟังก์ชันด้วย 5 ชุด input/output

### 5.4 `test-mock` — Mock & แยก dependency
- **สอน:** ทำไมต้อง mock (เทสต์ไม่ควรยิง API จริง/แตะ DB จริง), `unittest.mock`, `monkeypatch`, mock return value, ตรวจว่าถูกเรียก
- **โค้ด:** mock การเรียก API ด้วย requests, monkeypatch เวลา/ตัวแปร
- **callout(warn):** เทสต์ที่ยิง network จริง = ช้า + ไม่เสถียร — mock ซะ
- **แบบฝึกหัด:** mock ฟังก์ชันที่ดึงข้อมูลภายนอก

### 5.5 `test-tdd` — TDD & Coverage
- **สอน:** TDD loop (Red → Green → Refactor), เขียนเทสต์ก่อนโค้ด, `pytest-cov` วัด coverage, coverage ไม่ใช่ทุกอย่าง
- **โค้ด:** ทำ TDD สร้างฟังก์ชันทีละขั้น, `lang: bash` รัน coverage
- **callout:** 100% coverage ≠ ไม่มี bug — เน้นเทสต์ที่มีความหมาย
- **แบบฝึกหัด:** สร้างฟังก์ชันใหม่แบบ TDD (เขียนเทสต์ก่อน)
- **ปิดบท:** `links` → บทที่ 6

---

## บทที่ 6 — Clean Code & การออกแบบ (`clean-code.ts`, prefix `clean-`)

> เป้าหมายบท: เขียนโค้ดให้คน *อ่าน* ไม่ใช่แค่ให้เครื่อง *รัน* — โค้ดถูกอ่านบ่อยกว่าถูกเขียน

### 6.1 `clean-naming` — Naming & ฟังก์ชันที่ดี
- **สอน:** ตั้งชื่อสื่อความหมาย, หลีกเลี่ยง magic number, ฟังก์ชันทำอย่างเดียว (SRP), สั้น, ไม่เกิน ~1 ระดับ abstraction, จำนวน argument น้อย
- **โค้ด:** before/after refactor ชื่อ + แตกฟังก์ชัน
- **callout:** ถ้าต้องคอมเมนต์อธิบายว่าโค้ดทำอะไร แปลว่าโค้ดยังตั้งชื่อไม่ดีพอ
- **แบบฝึกหัด:** refactor โค้ดที่ตั้งชื่อแย่ให้ดี

### 6.2 `clean-principles` — DRY, KISS, YAGNI & Code Smells
- **สอน:** DRY (อย่าซ้ำ), KISS (อย่าซับซ้อนเกิน), YAGNI (อย่าทำเผื่ออนาคตที่ยังไม่มา), code smells (ฟังก์ชันยาว, พารามิเตอร์เยอะ, โค้ดซ้ำ, comment เยอะผิดปกติ)
- **โค้ด:** ตัวอย่างโค้ดซ้ำ → ดึงเป็นฟังก์ชัน
- **callout(warn):** over-engineering (ทำเผื่อเยอะเกิน) แย่พอ ๆ กับ under-engineering
- **แบบฝึกหัด:** หา code smell ในโค้ดที่ให้แล้วแก้

### 6.3 `clean-solid` — SOLID 5 ข้อ
- **สอน:** SRP, OCP, LSP, ISP, DIP — อธิบายแต่ละข้อด้วยตัวอย่าง Python สั้น ๆ เข้าใจง่าย (ไม่ใช่ทฤษฎี Java หนัก ๆ)
- **โค้ด:** ตัวอย่าง violate → fix อย่างน้อย SRP, OCP, DIP
- **callout:** SOLID คือ "แนวทาง" ไม่ใช่ "กฎตายตัว" — ใช้ให้พอดี
- **แบบฝึกหัด:** ปรับ class ที่ทำหลายหน้าที่ให้แยกตาม SRP

### 6.4 `clean-refactor` — Refactoring
- **สอน:** refactor คืออะไร (แก้โครงโดยไม่เปลี่ยนพฤติกรรม — ต้องมีเทสต์ก่อน!), เทคนิค: extract function/variable, rename, replace conditional, guard clause ลด nesting
- **โค้ด:** ลด nested if ด้วย early return, extract method
- **callout:** refactor ต้องมีเทสต์คุ้มหลังก่อน (เชื่อมบท 5)
- **แบบฝึกหัด:** refactor ฟังก์ชันซ้อนลึกให้แบนลง

### 6.5 `clean-patterns` — Design Patterns พื้นฐาน
- **สอน:** pattern คืออะไร (วิธีแก้ปัญหาที่เจอซ้ำ ๆ), สอน 3–4 ตัวที่เจอบ่อย: Factory, Strategy, Observer, Singleton (+เตือนว่าอย่าใช้พร่ำเพรื่อ)
- **โค้ด:** ตัวอย่าง Strategy (สลับ algorithm), Factory (สร้าง object ตาม type)
- **callout(warn):** อย่ายัด pattern เพราะอยากใช้ — ใช้เมื่อมันแก้ปัญหาจริง
- **แบบฝึกหัด:** ใช้ Strategy pattern เลือกวิธีคำนวณค่าส่ง
- **ปิดบท:** `links` → บทที่ 7

---

## บทที่ 7 — ทำงานกับข้อมูลจริง (`real-data.ts`, prefix `data-`)

> เป้าหมายบท: ดึง/อ่าน/เขียนข้อมูลจากโลกจริง — ไฟล์, รูปแบบข้อมูล, API

### 7.1 `data-files` — อ่าน/เขียนไฟล์ & pathlib
- **สอน:** `open` mode (r/w/a), `with open`, อ่านทั้งไฟล์/ทีละบรรทัด, encoding (utf-8!), `pathlib.Path` (สมัยใหม่กว่า os.path)
- **โค้ด:** อ่านไฟล์ข้อความ, เขียนไฟล์, วน path ในโฟลเดอร์ด้วย pathlib
- **callout(warn):** ระบุ `encoding="utf-8"` เสมอ โดยเฉพาะข้อความไทย
- **แบบฝึกหัด:** อ่านไฟล์ นับจำนวนบรรทัด/คำ แล้วเขียนผลลงไฟล์ใหม่

### 7.2 `data-formats` — CSV & JSON
- **สอน:** `csv` module (reader/DictReader/writer), `json` module (`loads/dumps/load/dump`), เมื่อไรใช้อะไร, serialize/deserialize
- **โค้ด:** อ่าน CSV เป็น dict, แปลง dict ↔ JSON, อ่าน/เขียนไฟล์ JSON
- **callout:** JSON = ภาษากลางของ API; CSV = ภาษากลางของ spreadsheet/data
- **แบบฝึกหัด:** อ่าน CSV → กรอง → เขียนเป็น JSON

### 7.3 `data-http` — เรียก API จริงด้วย requests
- **สอน:** ติดตั้ง `requests`, `get/post`, query params, headers, status code, `.json()`, error handling, auth header เบื้องต้น, rate limit
- **โค้ด:** ดึงข้อมูลจาก public API (เช่น JSONPlaceholder), ส่ง POST พร้อม body
- **callout(warn):** เช็ค `response.status_code`/`raise_for_status()` ก่อนใช้ข้อมูลเสมอ
- **แบบฝึกหัด:** ดึงข้อมูลจาก public API แล้วสรุปออกมา

### 7.4 `data-datetime` — วันเวลา
- **สอน:** `datetime`, `date`, `timedelta`, parse/format (`strftime`/`strptime`), timezone เบื้องต้น, กับดักวันเวลา
- **โค้ด:** คำนวณอายุ, ส่วนต่างวัน, format วันที่ไทย
- **callout(warn):** เก็บเวลาเป็น UTC ในระบบจริง แสดงผลค่อยแปลง timezone
- **แบบฝึกหัด:** คำนวณจำนวนวันระหว่าง 2 วันที่

### 7.5 `data-pandas` — รู้จัก pandas (intro เบา ๆ)
- **สอน:** pandas คืออะไร/เมื่อไรใช้, DataFrame/Series, อ่าน CSV ด้วย pandas, filter/groupby เบื้องต้น (แค่ให้รู้จัก ไม่ลงลึก — โฟกัสคอร์สคือ general SE)
- **โค้ด:** `pd.read_csv`, filter, `groupby().mean()`
- **callout:** ถ้าเล็งสาย Data/AI ค่อยไปลงลึก pandas/numpy ต่อ — ที่นี่แค่ให้รู้จัก
- **แบบฝึกหัด:** โหลด CSV ด้วย pandas แล้วหาค่าเฉลี่ยคอลัมน์
- **ปิดบท:** `links` → บทที่ 8

---

## บทที่ 8 — ฐานข้อมูลลึก (`databases.ts`, prefix `db-`)

> เป้าหมายบท: ออกแบบและใช้ฐานข้อมูลได้ — เกือบทุกแอปจริงมี DB

### 8.1 `db-model` — Relational Model & การออกแบบตาราง
- **สอน:** table/row/column, primary key, foreign key, ความสัมพันธ์ (1-1, 1-many, many-many), normalization เบื้องต้น (ทำไมไม่เก็บข้อมูลซ้ำ)
- **โค้ด/table:** ตัวอย่าง schema (users, posts) + ER แบบข้อความ
- **callout:** ออกแบบตารางดีตั้งแต่ต้น = แก้ปัญหาทีหลังน้อย
- **แบบฝึกหัด:** ออกแบบ schema ระบบยืม-คืนหนังสือ

### 8.2 `db-sql` — SQL เจาะลึก
- **สอน:** `CREATE/INSERT/SELECT/UPDATE/DELETE`, `WHERE`, `ORDER BY`, `LIMIT`, `JOIN` (inner/left), `GROUP BY` + aggregate (COUNT/SUM/AVG), subquery เบื้องต้น
- **โค้ด:** `lang: sql` หลายแบบ โดยเฉพาะ JOIN และ GROUP BY
- **callout(warn):** `DELETE`/`UPDATE` ไม่มี `WHERE` = ลบ/แก้ทั้งตาราง! ระวัง
- **แบบฝึกหัด:** เขียน query JOIN 2 ตาราง + นับจำนวนต่อกลุ่ม

### 8.3 `db-advanced` — Index, Transaction & Constraint
- **สอน:** index คืออะไร/ช่วยเร็วยังไง/ต้นทุน, transaction + ACID เบื้องต้น, `COMMIT`/`ROLLBACK`, constraint (NOT NULL, UNIQUE, FK)
- **โค้ด:** สร้าง index, transaction โอนเงิน (atomicity)
- **callout:** index เร็วตอนอ่าน แต่ช้าตอนเขียน — ใส่เท่าที่จำเป็น
- **แบบฝึกหัด:** ออกแบบ transaction ที่ต้อง atomic

### 8.4 `db-python` — เชื่อม Python กับ DB (sqlite3)
- **สอน:** `sqlite3` (มากับ Python), connect/cursor/execute/commit, parameterized query, ดึงผลลัพธ์
- **โค้ด:** สร้างตาราง + insert + select ด้วย sqlite3
- **callout(warn):** **SQL injection** — อย่าต่อ string เอง ใช้ `?` placeholder เสมอ
- **แบบฝึกหัด:** เขียน CRUD เล็ก ๆ ด้วย sqlite3

### 8.5 `db-orm` — ORM (SQLAlchemy)
- **สอน:** ORM คืออะไร (map class ↔ table), ข้อดี/ข้อเสียเทียบ raw SQL, SQLAlchemy เบื้องต้น: model, session, CRUD
- **โค้ด:** define model, insert/query ผ่าน ORM
- **callout:** ORM สะดวกแต่ต้องเข้าใจ SQL ข้างใต้ ไม่งั้นเขียนช้าไม่รู้ตัว
- **แบบฝึกหัด:** แปลง CRUD จาก raw SQL เป็น ORM
- **ปิดบท:** `links` → บทที่ 9

---

## บทที่ 9 — สร้างเว็บแอปจริง (`web-apps.ts`, prefix `web2-`)

> เป้าหมายบท: ประกอบทุกอย่างเป็น web API ที่รันได้ (สอนพอใช้งานเป็น ไม่ลงลึก framework เฉพาะทาง)

### 9.1 `web2-http` — HTTP เจาะลึก
- **สอน:** request/response, methods (GET/POST/PUT/DELETE), status codes (2xx/3xx/4xx/5xx), headers, body, REST principles, client-server
- **โค้ด/table:** ตาราง method ↔ การใช้, ตัวอย่าง request/response
- **callout:** REST = ออกแบบ API รอบ "resource" + ใช้ HTTP method ให้ตรงความหมาย
- **แบบฝึกหัด:** ออกแบบ endpoint ของ blog API (resource + method)

### 9.2 `web2-framework` — เริ่มกับ FastAPI (หรือ Flask)
- **สอน:** ทำไมใช้ framework, ติดตั้ง FastAPI + uvicorn, route แรก, รัน server, auto docs (`/docs`)
- **โค้ด:** hello world API, `lang: bash` รัน server
- **callout:** FastAPI มี type hint + auto validation + auto docs (เชื่อมบท err-typing)
- **แบบฝึกหัด:** สร้าง endpoint `/hello/{name}`

### 9.3 `web2-request` — รับ Request & Validation
- **สอน:** path param, query param, request body (Pydantic model), validation อัตโนมัติ, ส่ง JSON response, status code
- **โค้ด:** endpoint รับ body + validate ด้วย Pydantic
- **callout:** อย่าเชื่อ input จาก client — validate เสมอ (เชื่อมบท defensive)
- **แบบฝึกหัด:** endpoint สร้าง user ที่ validate ข้อมูล

### 9.4 `web2-db` — เชื่อม API กับ DB (CRUD API)
- **สอน:** ต่อ API เข้ากับ DB (จากบท 8), ทำ CRUD endpoint ครบ (Create/Read/Update/Delete), แยก layer (route/service/db)
- **โค้ด:** CRUD endpoint เชื่อม sqlite/ORM
- **callout:** แยก logic ออกจาก route ทำให้เทสต์ง่าย (เชื่อมบท clean code + testing)
- **แบบฝึกหัด:** ทำ CRUD API ของ resource หนึ่ง

### 9.5 `web2-project` — ประกอบ API จริง end-to-end
- **สอน:** รวมทุกอย่าง: structure + env config + error handling + เทสต์ API (`TestClient`), ภาพรวม deploy
- **โค้ด:** โครงโปรเจกต์ API จริง + เทสต์ endpoint
- **callout:** นี่คือตัวอย่างย่อของ capstone ในบท 12
- **แบบฝึกหัด:** เพิ่ม endpoint + เขียนเทสต์ให้มัน
- **ปิดบท:** `links` → บทที่ 10

---

## บทที่ 10 — DS & Algorithm ระดับกลาง (`dsa-mid.ts`, prefix `dsa-`) ⭐ บทเด่น

> เป้าหมายบท: **หัวใจของคอร์ส** — เข้าใจโครงสร้างข้อมูลและอัลกอริทึมระดับที่ใช้ทำงานจริงและใช้สัมภาษณ์ ลงลึกทั้ง implementation + วิเคราะห์ Big-O + โจทย์ ทุกหัวข้อเชื่อมไป practice-problems / se-roadmap

### 10.1 `dsa-choose` — เลือกโครงสร้างข้อมูลให้ถูก & ทบทวน Big-O
- **สอน:** ทบทวน Big-O เร็ว ๆ, ตารางเทียบ time complexity ของแต่ละ structure (array/dict/set/...), "เลือกอันไหนเมื่อไร" คือทักษะจริง
- **โค้ด/table:** ตารางใหญ่: operation ↔ structure ↔ Big-O
- **callout:** เลือก data structure ถูก = แก้ปัญหา performance ได้ครึ่งทาง
- **แบบฝึกหัด:** ให้โจทย์ → เลือก structure ที่เหมาะ + บอกเหตุผล

### 10.2 `dsa-stack-queue` — Stack, Queue & Deque
- **สอน:** stack (LIFO) ใช้ทำอะไร (undo, call stack, วงเล็บสมดุล), queue (FIFO), `collections.deque`, implement ด้วย list/deque
- **โค้ด:** stack ตรวจวงเล็บสมดุล, queue ด้วย deque
- **callout(warn):** อย่าใช้ `list.pop(0)` เป็น queue — เป็น O(n)! ใช้ deque
- **แบบฝึกหัด:** ตรวจวงเล็บสมดุล, จำลอง queue งาน

### 10.3 `dsa-linked` — Linked List
- **สอน:** node + pointer, singly/doubly, ต่าง array ยังไง (insert/delete O(1) แต่ access O(n)), implement, traverse, reverse
- **โค้ด:** สร้าง singly linked list, reverse, หา middle
- **callout:** Python ใช้ list เป็นหลัก แต่ linked list สำคัญสำหรับเข้าใจ pointer + โจทย์สัมภาษณ์
- **แบบฝึกหัด:** reverse linked list, detect cycle (เกริ่น two-pointer)

### 10.4 `dsa-tree` — Tree & Binary Search Tree
- **สอน:** terminology (root/leaf/depth), binary tree, BST (ทำไมค้นเร็ว O(log n)), traversal (in/pre/post-order) ด้วย recursion, insert/search
- **โค้ด:** สร้าง BST, traversal 3 แบบ, search
- **callout:** in-order traversal ของ BST ได้ค่าเรียงจากน้อยไปมาก
- **แบบฝึกหัด:** นับความสูงต้นไม้, in-order traversal, ตรวจว่าเป็น BST ไหม

### 10.5 `dsa-hash` — Hash Table เจาะลึก
- **สอน:** hash function, bucket, collision + การแก้ (chaining), ทำไม dict/set เป็น O(1) เฉลี่ย, เมื่อไร O(n), ใช้ hash แก้โจทย์ (two-sum, นับความถี่, dedup)
- **โค้ด:** two-sum ด้วย dict (O(n)), นับความถี่, `collections.Counter`
- **callout:** "ใช้ hash map" คือคำตอบของโจทย์สัมภาษณ์จำนวนมาก
- **แบบฝึกหัด:** two-sum, หาตัวซ้ำตัวแรก, group anagrams

### 10.6 `dsa-recursion` — Recursion ลึก & Backtracking
- **สอน:** recursion ทบทวน (base case + recursive case), call stack, recursion ↔ tree, backtracking (ลองแล้วถอย), เมื่อไร recursion ดีกว่า loop
- **โค้ด:** permutations/subsets ด้วย backtracking, แก้เขาวงกต/N-queens แบบย่อ
- **callout(warn):** ลืม base case = RecursionError; recursion ลึกมากใน Python มี limit
- **แบบฝึกหัด:** สร้าง subset ทั้งหมด, permutation, แก้โจทย์ backtracking ง่าย ๆ

### 10.7 `dsa-dp` — Dynamic Programming เบื้องต้น
- **สอน:** overlapping subproblems + optimal substructure, memoization (top-down) → tabulation (bottom-up), เริ่มจาก fibonacci → climbing stairs → coin change/knapsack เบื้องต้น
- **โค้ด:** fib แบบ naive vs memo vs tab (เทียบ Big-O), climbing stairs
- **callout:** DP = "จำผลลัพธ์ที่คำนวณแล้ว ไม่คำนวณซ้ำ" — เชื่อม decorator memoize (บท 1)
- **แบบฝึกหัด:** climbing stairs, coin change (จำนวนวิธี)

### 10.8 `dsa-graph` — Graph & BFS/DFS
- **สอน:** graph คืออะไร (vertex/edge, directed/undirected, weighted), แทนด้วย adjacency list/matrix, BFS (queue) + DFS (stack/recursion), ใช้ทำอะไร (shortest path, เพื่อนใน social, แผนที่)
- **โค้ด:** สร้าง graph (dict), BFS, DFS, หาว่าเชื่อมถึงกันไหม
- **callout:** tree คือ graph ชนิดพิเศษ; BFS หา shortest path (unweighted) ได้
- **แบบฝึกหัด:** BFS หาระยะสั้นสุด, นับ connected components
- **ปิดบท:** `links` → บทที่ 11 + ลิงก์ไป **practice-problems** (`pp-basics`) และ se-roadmap (`practice`)

---

## บทที่ 11 — Concurrency & Async เบื้องต้น (`concurrency.ts`, prefix `async-`)

> เป้าหมายบท: เข้าใจว่าทำหลายอย่างพร้อมกันคืออะไร และเลือกเครื่องมือถูก (เบื้องต้น พอเห็นภาพ)

### 11.1 `async-why` — Concurrency vs Parallelism
- **สอน:** concurrency (สลับทำ) vs parallelism (ทำพร้อมจริง), I/O-bound vs CPU-bound (ตัวกำหนดว่าใช้เครื่องมือไหน), ทำไมต้องสน
- **table:** I/O-bound → threading/async; CPU-bound → multiprocessing
- **callout:** เลือกผิดเครื่องมือ = ไม่เร็วขึ้น (หรือช้าลง)
- **แบบฝึกหัด:** จำแนกงานว่าเป็น I/O-bound หรือ CPU-bound

### 11.2 `async-threads` — Threading & GIL
- **สอน:** thread คืออะไร, `threading`, GIL (ทำไม thread ไม่เร่ง CPU-bound ใน Python), เหมาะกับ I/O-bound, `ThreadPoolExecutor`
- **โค้ด:** ดาวน์โหลดหลายไฟล์พร้อมกันด้วย ThreadPoolExecutor (เทียบเวลา)
- **callout(warn):** GIL ทำให้ thread ไม่ช่วย CPU-bound — อย่าคาดหวังผิด
- **แบบฝึกหัด:** ใช้ thread pool เร่งงาน I/O หลายงาน

### 11.3 `async-process` — Multiprocessing
- **สอน:** process แยก memory (ข้าม GIL), `multiprocessing`/`ProcessPoolExecutor`, เหมาะ CPU-bound, ต้นทุน (สร้าง process แพง, ส่งข้อมูลข้าม process)
- **โค้ด:** คำนวณหนัก ๆ แบ่งหลาย process
- **callout:** process หนักกว่า thread — ใช้กับงานคำนวณจริง ๆ
- **แบบฝึกหัด:** เร่งงานคำนวณด้วย process pool

### 11.4 `async-asyncio` — async/await & asyncio
- **สอน:** `async def`/`await`, event loop, coroutine, `asyncio.gather`, เหมาะ I/O-bound จำนวนมาก, เทียบกับ thread
- **โค้ด:** ยิงหลาย request พร้อมกันด้วย asyncio
- **callout(warn):** ห้ามเรียกฟังก์ชัน blocking ใน async (บล็อก event loop ทั้งระบบ)
- **แบบฝึกหัด:** เขียน async ดึงหลาย URL พร้อมกัน
- **ปิดบท:** `links` → บทที่ 12

---

## บทที่ 12 — Capstone Project (`capstone.ts`, prefix `cap-`)

> เป้าหมายบท: รวมทุกบทเป็นโปรเจกต์จริงตั้งแต่ต้นจนจบ — สิ่งที่เอาไปใส่ portfolio และโชว์ตอนสัมภาษณ์ได้

### 12.1 `cap-plan` — วางแผน & ออกแบบโปรเจกต์
- **สอน:** เลือกโปรเจกต์ (แนะนำ: REST API + DB + CLI/หรือ web เล็ก เช่น "ระบบจัดการงาน/บันทึกค่าใช้จ่าย"), เขียน requirement, ออกแบบ data model + endpoints, แตกงานเป็น task
- **โค้ด/text:** ตัวอย่าง requirement + schema + endpoint list
- **callout:** วางแผนก่อนเขียน = เขียนน้อยลง รื้อน้อยลง
- **แบบฝึกหัด:** เขียน requirement + schema ของโปรเจกต์ตัวเอง

### 12.2 `cap-build` — สร้างทีละส่วน (ใช้ทุกอย่างที่เรียนมา)
- **สอน:** ลงมือสร้าง: project structure (บท 3) + git branch ต่อ feature (บท 4) + เขียนเทสต์คู่กัน (บท 5) + clean code (บท 6) + DB (บท 8) + API (บท 9)
- **โค้ด:** ตัวอย่างโครงโปรเจกต์ + flow การ build ทีละ feature
- **callout:** commit เล็ก ๆ ต่อ feature + เทสต์ผ่านก่อน merge
- **แบบฝึกหัด:** สร้าง feature แรกของโปรเจกต์ให้ครบ (โค้ด+เทสต์+commit)

### 12.3 `cap-quality` — คุณภาพ, เอกสาร & CI
- **สอน:** เขียน README ที่ดี (ติดตั้ง/รัน/ใช้งาน), docstring, linter/formatter (ruff/black), CI ด้วย GitHub Actions (รันเทสต์อัตโนมัติทุก push)
- **โค้ด:** ตัวอย่าง README, `lang: yaml` GitHub Actions workflow รัน pytest
- **callout:** CI สีเขียว = มั่นใจว่าโค้ดไม่พังก่อน merge
- **แบบฝึกหัด:** เขียน README + ตั้ง CI รันเทสต์

### 12.4 `cap-deploy` — Deploy เบื้องต้น & ไปต่อ
- **สอน:** ภาพรวมการ deploy (PaaS เช่น Railway/Render, หรือ Docker เบื้องต้น), environment ใน production, ปิดท้าย: ไปต่อ practice-problems + se-roadmap เพื่อสมัครงาน
- **โค้ด/text:** ขั้นตอน deploy แบบย่อ, checklist ก่อน deploy
- **callout:** ตอนนี้คุณมีโปรเจกต์จริงใน portfolio แล้ว — พร้อมไปขั้นเตรียมสัมภาษณ์
- **แบบฝึกหัด:** deploy โปรเจกต์ + ใส่ลิงก์ใน README
- **ปิดคอร์ส:** `links` → **practice-problems** (`pp-basics`) + **se-roadmap** (`learn`/`practice`/`resume`) + กลับ overview

---

## สรุปจำนวนหัวข้อ

| บท | หัวข้อ | บท | หัวข้อ |
|----|--------|----|--------|
| 1 Python ลึก | 7 | 7 Real data | 5 |
| 2 Robust code | 5 | 8 Databases | 5 |
| 3 Project/tooling | 5 | 9 Web apps | 5 |
| 4 Git | 5 | 10 DSA ⭐ | 8 |
| 5 Testing | 5 | 11 Concurrency | 4 |
| 6 Clean code | 5 | 12 Capstone | 4 |

**รวม 63 หัวข้อ** (+ overview) ใน 12 บท
