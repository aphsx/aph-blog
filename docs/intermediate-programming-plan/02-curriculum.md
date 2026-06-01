# 02 — หลักสูตรเต็ม (Full Curriculum)

> โฟกัส: **ทั่วไปสำหรับ software engineer เน้น DS & Algorithm**
> ปรับปรุงรอบที่ 1: เพิ่ม P0+P1 จาก `04-content-review.md` → **13 บท ~77 หัวข้อ**
> ไฟล์นี้คือ "พิมพ์เขียว" ของทุกหัวข้อ — ตอนเขียนบทจริง ให้เปิดคู่กับ `01-conventions.md`
>
> แต่ละหัวข้อระบุ: `slug` · เป้าหมายการเรียนรู้ · แนวคิดที่ต้องสอน · ตัวอย่างโค้ด · กับดัก/callout · แบบฝึกหัด
> 🆕 = หัวข้อที่เพิ่มจากการ audit (ดู `04-content-review.md`)

---

## บทที่ 0 — ภาพรวม (`overview.ts`)

**slug:** `intermediate` · **title:** "เขียนโปรแกรมระดับกลาง — ภาพรวม & หลักสูตร"

- เกริ่น: คอร์สนี้คือ "ช่วงกลาง" ระหว่างคอร์สพื้นฐาน → การสมัครงาน
- ใครเหมาะ / prerequisite (จบคอร์สพื้นฐาน หรือเขียน Python พื้นฐานได้)
- ตาราง curriculum 13 บท
- "เรียนอย่างไรให้ได้ผล" + setup (Python 3.10+, VS Code, terminal)
- `links` ไปบทที่ 1 + ลิงก์กลับคอร์สพื้นฐาน (`learn`)

> สร้างใน Step 0 แบบย่อก่อน แล้วมาเติมตารางให้ครบใน Step สุดท้าย

---

## บทที่ 1 — Python ระดับลึก (`python-deep.ts`, prefix `py-`)

> เป้าหมายบท: ยกระดับจาก "เขียน Python ได้" → "เขียน Python แบบ Pythonic" สิ่งที่เจอในโค้ดงานจริงและ code review ทุกวัน

### 1.1 `py-comprehension` — Comprehension เจาะลึก
- **เรียนรู้:** เขียน list/dict/set comprehension อ่านง่าย + รู้ขีดจำกัด
- **สอน:** list comp → condition (`if`) → if/else ในนิพจน์ → nested → dict comp → set comp
- **โค้ด:** แปลง for-loop เป็น comp, `{k: v for ...}`, flatten 2D list
- **callout(warn):** อย่าซ้อนเกิน 2 ชั้นหรือยัด logic เยอะ — ใช้ for loop ดีกว่า
- **แบบฝึกหัด:** กรองเลขคู่+ยกกำลังสอง, dict นับความถี่, flatten list ซ้อน

### 1.2 `py-iter-gen` — Iterator & Generator (yield)
- **เรียนรู้:** เข้าใจ iterator protocol + เขียน generator ประหยัด memory
- **สอน:** iterable vs iterator, `iter()`/`next()`, generator function (`yield`), generator expression, lazy evaluation
- **โค้ด:** generator นับไม่รู้จบ, อ่านไฟล์ใหญ่ทีละบรรทัด, `sum(x*x for x in range(10))`
- **analogy:** generator = "สายพานผลิตทีละชิ้นเมื่อขอ" vs list = "ผลิตทุกชิ้นกองไว้"
- **callout:** generator ใช้ได้ครั้งเดียว
- **แบบฝึกหัด:** generator ฟีโบนักชี, generator กรองบรรทัดจากไฟล์

### 1.3 `py-args` — *args, **kwargs & การ unpack
- **สอน:** positional vs keyword, default value, `*args`, `**kwargs`, unpacking `*list`/`**dict`, keyword-only (`*`)
- **โค้ด:** `def total(*nums)`, `def config(**opts)`, `print(*my_list)`, `func(**my_dict)`
- **callout(warn):** mutable default argument (`def f(x=[])`) — bug คลาสสิก + วิธีแก้ (`x=None`)
- **แบบฝึกหัด:** sum ไม่จำกัดจำนวน, wrapper ส่งต่อ args ทั้งหมด

### 1.4 `py-hof-lambda` — Lambda & Higher-Order Functions
- **สอน:** function เป็น first-class object, `lambda`, `sorted(key=...)`, `map`/`filter`, ทำไม comprehension มักดีกว่า, `functools.reduce`
- **โค้ด:** sort list of dict, sort หลาย key, ฟังก์ชันรับฟังก์ชัน
- **callout:** Python นิยม comprehension มากกว่า map/filter
- **แบบฝึกหัด:** เรียงตามนามสกุล, สร้าง apply_twice(f, x)

### 1.5 `py-closures` — Scope & Closure
- **สอน:** local/global/nonlocal, LEGB, closure (ฟังก์ชันจำค่าจาก scope แม่), counter/factory
- **โค้ด:** `make_multiplier(n)`, counter ด้วย `nonlocal`
- **callout(warn):** late binding ใน loop
- **แบบฝึกหัด:** factory บวกค่าคงที่, counter นับขึ้น

### 1.6 `py-decorators` — Decorator
- **สอน:** decorator (closure + `@`), decorator เปล่า → wrap ด้วย `*args/**kwargs` → `functools.wraps` → decorator รับ argument
- **โค้ด:** `@timer`, `@log_call`, `@retry(times=3)`
- **analogy:** กระดาษห่อของขวัญที่เพิ่มฟีเจอร์โดยไม่แกะกล่อง
- **callout:** เจอจริง — Flask `@app.route`, pytest `@fixture`, `@property`
- **แบบฝึกหัด:** เขียน @timer, decorator cache (memoize เบื้องต้น)

### 1.7 `py-context` — Context Manager (`with`)
- **สอน:** ทำไมต้อง `with`, `__enter__`/`__exit__`, `contextlib.contextmanager` + `yield`
- **โค้ด:** `with open(...)`, context manager จับเวลา, เปิด-ปิด DB connection
- **callout(warn):** ลืมปิด resource = leak — `with` แก้
- **แบบฝึกหัด:** context manager print "เข้า/ออก", วัดเวลา block

### 1.8 `py-mutability` — Mutability, Reference & Copy 🆕 (P0)
- **เรียนรู้:** เข้าใจว่าตัวแปรชี้ไปที่ object — รากของบั๊กมือกลางอันดับ 1
- **สอน:** mutable (list/dict/set) vs immutable (int/str/tuple), reference/aliasing (`b = a` ชี้ที่เดียวกัน), `is` vs `==` (identity vs equality), shallow copy vs `copy.deepcopy`, ส่ง mutable เข้าฟังก์ชันแล้วถูกแก้
- **โค้ด:** `a = [1,2]; b = a; b.append(3)` → a เปลี่ยนด้วย, `copy()` vs `deepcopy()`, `x is None` ทำไมใช้ `is`
- **analogy:** ตัวแปร = "ป้ายชื่อแปะกล่อง" หลายป้ายแปะกล่องเดียวกันได้
- **callout(warn):** เชื่อมกลับ mutable default (`py-args`) — ทำไม `def f(x=[])` พัง
- **แบบฝึกหัด:** ทำนายผล alias, แก้ฟังก์ชันที่เผลอแก้ list ของ caller, ใช้ deepcopy แก้

### 1.9 `py-collections` — `collections` & `itertools` 🆕 (P1)
- **เรียนรู้:** ใช้เครื่องมือ standard library ที่มืออาชีพใช้ทุกวัน
- **สอน:** `Counter` (นับความถี่), `defaultdict` (ค่า default), `namedtuple`/`dataclass` สั้น ๆ, `deque`, `itertools` (`chain`, `groupby`, `combinations`, `product`, `count`)
- **โค้ด:** นับคำด้วย Counter, group ข้อมูลด้วย defaultdict, combinations
- **callout:** รู้จัก collections/itertools = เขียนน้อยลง bug น้อยลง
- **แบบฝึกหัด:** หา top-3 คำที่เจอบ่อย, group นักเรียนตามเกรดด้วย defaultdict
- **ปิดบท:** `links` → บทที่ 2

---

## บทที่ 2 — Error handling & โค้ดที่แข็งแรง (`robust-code.ts`, prefix `err-`)

> เป้าหมายบท: โค้ดที่ "พังอย่างสง่างาม" บอกได้ว่าพังเพราะอะไร — แยก mid ออกจากมือใหม่ที่ crash เงียบ ๆ

### 2.1 `err-exceptions` — Exception เจาะลึก
- **สอน:** `try/except/else/finally`, จับเฉพาะชนิด (อย่า bare `except:`), exception hierarchy, `as e`, จับหลายชนิด, re-raise
- **โค้ด:** อ่าน input แปลงเลขปลอดภัย, try/except/else/finally เต็ม
- **callout(warn):** `except:` เปล่ากลืน error ทุกอย่างรวม bug เรา — ห้าม
- **แบบฝึกหัด:** ฟังก์ชันหารจัดการ ZeroDivisionError + ValueError

### 2.2 `err-custom` — สร้าง Exception เอง & raise
- **สอน:** `raise`, custom exception class, เมื่อไรควรสร้าง, chaining (`raise ... from ...`)
- **โค้ด:** `class InsufficientFundsError(Exception)`, ระบบถอนเงิน raise เอง
- **callout:** custom exception ให้ caller จับตรงจุด
- **แบบฝึกหัด:** validate อายุที่ raise custom error

### 2.3 `err-logging` — Logging (เลิก print debug)
- **สอน:** ทำไม print ไม่พอ, `logging`, levels, format, เขียนลงไฟล์, logger ต่อ module
- **โค้ด:** ตั้งค่า logging, log แต่ละ level, `logging.exception`
- **callout:** logging เปิด/ปิด/กรองระดับได้ ต่างจาก print
- **แบบฝึกหัด:** แปลงสคริปต์ print เป็น logging

### 2.4 `err-typing` — Type Hints & mypy
- **สอน:** type hint, annotate ตัวแปร/พารามิเตอร์/return, `list[int]`, `dict[str,int]`, `Optional`/`| None`, `typing`, `mypy`, `@dataclass`
- **โค้ด:** ฟังก์ชัน type hint เต็ม, dataclass
- **callout:** type hint ช่วย autocomplete + จับ bug ก่อนรัน — มาตรฐานทีมสมัยใหม่
- **แบบฝึกหัด:** ใส่ type hint, แปลง class เป็น dataclass

### 2.5 `err-defensive` — Defensive Programming
- **สอน:** validate ที่ขอบระบบ, `assert` (และข้อจำกัด), EAFP vs LBYL, fail fast
- **โค้ด:** ฟังก์ชัน validate, เทียบ EAFP/LBYL
- **callout(warn):** `assert` ถูกปิดด้วย `python -O` → อย่าใช้ตรวจ input ผู้ใช้
- **แบบฝึกหัด:** ฟังก์ชัน validate + raise เหมาะสม
- **ปิดบท:** `links` → บทที่ 3

---

## บทที่ 3 — Debugging, Profiling & Performance (`debugging.ts`, prefix `dbg-`) 🆕

> เป้าหมายบท (P0+P1): เรียน error handling แล้วต่อด้วย "วิธีไล่จับ bug จริง" และ "วัด performance ไม่ใช่เดา" — ทักษะที่แยก mid ออกจาก junior ชัดที่สุด

### 3.1 `dbg-debugger` — ใช้ Debugger จริง (pdb / VS Code) 🆕 (P0)
- **เรียนรู้:** เลิก debug ด้วย print อย่างเดียว — ใช้ debugger เป็น
- **สอน:** `breakpoint()`/`pdb` (commands: `n`, `s`, `c`, `p`, `l`, `q`), VS Code debugger (ตั้ง breakpoint, step over/into, watch, call stack), inspect ตัวแปรตอนหยุด
- **โค้ด:** ใส่ `breakpoint()` แล้วสำรวจ state, `lang: bash` รัน `python -m pdb`
- **analogy:** debugger = "หยุดเวลาในโปรแกรมแล้วเดินดูทีละก้าว" — print = "ส่องไฟฉายทีละจุด"
- **callout:** breakpoint เดียว > print สิบบรรทัด
- **แบบฝึกหัด:** ใช้ debugger หาว่าตัวแปรผิดที่บรรทัดไหนในโค้ดที่ให้

### 3.2 `dbg-traceback` — อ่าน Traceback & กลยุทธ์ Debug 🆕 (P0)
- **เรียนรู้:** อ่าน traceback ให้ขาด + วิธีไล่หา bug อย่างเป็นระบบ
- **สอน:** อ่าน traceback ล่างขึ้นบน (จุดพังจริงอยู่ล่างสุด), exception chaining, กลยุทธ์: ทำซ้ำให้ได้ → narrow down (bisect) → ตั้งสมมติฐาน → พิสูจน์, rubber duck debugging
- **โค้ด:** ตัวอย่าง traceback จริง + ชี้ว่าอ่านยังไง
- **callout(warn):** อย่าแก้มั่ว — ทำซ้ำ bug ให้ได้ก่อนเสมอ
- **แบบฝึกหัด:** ให้ traceback → บอกว่า bug อยู่ไฟล์/บรรทัดไหน เพราะอะไร

### 3.3 `dbg-profiling` — Profiling: วัดว่าช้าตรงไหน 🆕 (P1)
- **เรียนรู้:** หา bottleneck ด้วยข้อมูล ไม่ใช่เดา
- **สอน:** `timeit` (วัดโค้ดเล็ก), `cProfile` + อ่านผล (`ncalls`, `cumtime`), `time.perf_counter`, กฎ "อย่า optimize ก่อนวัด"
- **โค้ด:** เทียบเวลา 2 วิธีด้วย timeit, profile ฟังก์ชันด้วย cProfile
- **callout(warn):** premature optimization — วัดก่อนแก้เสมอ (เชื่อม Big-O บท 11)
- **แบบฝึกหัด:** profile โค้ดที่ให้ → ชี้จุดช้า

### 3.4 `dbg-performance` — เทคนิคเพิ่มประสิทธิภาพ 🆕 (P1)
- **เรียนรู้:** แก้ให้เร็วขึ้นด้วยวิธีถูกต้อง (เชื่อม Big-O + data structure)
- **สอน:** เลือก data structure ถูก (list vs set vs dict lookup), หลีกเลี่ยง loop ซ้อนที่ไม่จำเป็น, caching/memoization (`functools.lru_cache`), generator ประหยัด memory, batch I/O
- **โค้ด:** เปลี่ยน `in list` (O(n)) เป็น `in set` (O(1)), `@lru_cache` เร่ง fibonacci
- **callout:** เปลี่ยน data structure มักเร็วกว่า micro-optimization สิบเท่า
- **แบบฝึกหัด:** เร่งโค้ดช้าที่ให้ ด้วยการเปลี่ยน DS + cache
- **ปิดบท:** `links` → บทที่ 4

---

## บทที่ 4 — โครงสร้างโปรเจกต์ & เครื่องมือ (`project-tooling.ts`, prefix `proj-`)

> เป้าหมายบท: เลิกเขียนทุกอย่างในไฟล์เดียว — จัดโปรเจกต์แบบมืออาชีพที่รันและแชร์ได้

### 4.1 `proj-modules` — Module & import
- **สอน:** module = ไฟล์ .py, `import` แบบต่าง ๆ, `if __name__ == "__main__":`, namespace
- **โค้ด:** แยกฟังก์ชันไป util.py, guard `__main__`
- **callout:** `__name__ == "__main__"` = รันเฉพาะตอนเรียกตรง ไม่รันตอน import
- **แบบฝึกหัด:** แยกโค้ดเป็น 2 ไฟล์ import กัน

### 4.2 `proj-packages` — Package & โครงสร้างโฟลเดอร์
- **สอน:** package = โฟลเดอร์มี `__init__.py`, layout จริง (`src/`, `tests/`, `README.md`), relative vs absolute import
- **โค้ด/text:** tree โครงสร้างโปรเจกต์มาตรฐาน
- **callout:** layout ดี = คนอื่น (และเราในอนาคต) หาของเจอ
- **แบบฝึกหัด:** จัดโปรเจกต์เล็กเป็น package

### 4.3 `proj-venv` — Virtual Environment & pip
- **สอน:** ทำไมต้อง venv, `python -m venv`, activate, `pip install`, `pip freeze > requirements.txt`, `pip install -r`
- **โค้ด:** `lang: bash` สร้าง/เปิด venv, ติดตั้ง, freeze
- **callout(warn):** อย่า `pip install` ลง global — ใช้ venv เสมอ
- **แบบฝึกหัด:** สร้าง venv + ติดตั้ง `requests` + freeze

### 4.4 `proj-cli` — สร้าง CLI ด้วย argparse
- **สอน:** `sys.argv` → `argparse` (positional, optional, flag, help, type, default)
- **โค้ด:** CLI รับ argument (แปลงหน่วย / นับคำในไฟล์)
- **callout:** argparse สร้าง `--help` ให้ฟรี + validate type
- **แบบฝึกหัด:** CLI รับชื่อไฟล์ + flag

### 4.5 `proj-env` — Environment Variables & Config
- **สอน:** ไม่ฮาร์ดโค้ด secret, `os.environ`, `.env` + `python-dotenv`, แยก config, `.gitignore` secret
- **โค้ด:** อ่าน API key จาก env, โหลด .env
- **callout(warn):** อย่า commit รหัสผ่าน/API key ลง git
- **แบบฝึกหัด:** ย้าย config ฮาร์ดโค้ดไป env var
- **ปิดบท:** `links` → บทที่ 5

---

## บทที่ 5 — Git สำหรับทำงานเป็นทีม (`git-deep.ts`, prefix `git-`)

> เป้าหมายบท: ใช้ git ทำงานเป็นทีมจริง ไม่ใช่แค่ add/commit/push

### 5.1 `git-recap` — ทบทวน git + mental model
- **สอน:** git = snapshot, 3 พื้นที่ (working/staging/repo), `init/status/add/commit/log`
- **โค้ด:** `lang: bash` add → commit → log
- **callout:** mental model 3 พื้นที่
- **แบบฝึกหัด:** สร้าง repo + commit แรก

### 5.2 `git-branch` — Branch & Merge
- **สอน:** ทำไมต้อง branch, `branch/switch/checkout -b`, `merge`, fast-forward vs merge commit
- **โค้ด:** feature branch → แก้ → merge
- **callout:** อย่าทำงานบน main ตรง ๆ
- **แบบฝึกหัด:** feature branch แล้ว merge

### 5.3 `git-remote` — Remote, GitHub & push/pull
- **สอน:** remote, `remote add`, `push/pull/fetch/clone`, GitHub, SSH/token
- **โค้ด:** เชื่อม GitHub แล้ว push
- **callout:** `pull` = `fetch` + `merge`
- **แบบฝึกหัด:** push ขึ้น GitHub

### 5.4 `git-conflict` — Merge Conflict & Rebase
- **สอน:** conflict เกิดยังไง, อ่าน marker, แก้, `merge` vs `rebase`, กฎทอง rebase
- **โค้ด:** จำลอง conflict + แก้
- **callout(warn):** อย่า rebase branch ที่ push/คนอื่นใช้แล้ว
- **แบบฝึกหัด:** สร้าง conflict แล้วแก้

### 5.5 `git-workflow` — PR Workflow & commit hygiene
- **สอน:** branching strategy, Pull Request + code review, commit message ดี (conventional commits), `.gitignore`, `revert` vs `reset`
- **โค้ด:** commit message ดี/ไม่ดี, .gitignore
- **callout:** commit เล็กสื่อความหมาย ดีกว่าก้อนใหญ่
- **แบบฝึกหัด:** เปิด PR (จำลอง flow)
- **ปิดบท:** `links` → บทที่ 6

---

## บทที่ 6 — การเขียนเทสต์ (`testing.ts`, prefix `test-`)

> เป้าหมายบท: เขียนเทสต์เป็น — ทักษะที่แยก junior "พร้อมทำงาน" ออกจากมือใหม่ชัดที่สุด

### 6.1 `test-why` — ทำไมต้องเทสต์ & ประเภท
- **สอน:** ปัญหาเทสต์มือ, test ช่วยอะไร, pyramid (unit/integration/e2e), อะไรควรเทสต์
- **โค้ด:** assert เทียบเทสต์มือ
- **callout:** เทสต์ = ตาข่ายนิรภัย ทำให้ refactor ได้ไม่กลัวพัง
- **แบบฝึกหัด:** เขียน assert ตรวจฟังก์ชัน

### 6.2 `test-pytest` — เริ่มต้นกับ pytest
- **สอน:** ติดตั้ง, ตั้งชื่อ `test_`, `assert`, รัน `pytest`, อ่านผล, จัด tests/
- **โค้ด:** ฟังก์ชัน + ไฟล์เทสต์, `lang: bash` รัน
- **callout:** pytest ใช้ `assert` ธรรมดา
- **แบบฝึกหัด:** เทสต์ 3 เคส (ปกติ/ขอบ/ผิด)

### 6.3 `test-fixtures` — Fixture & Parametrize
- **สอน:** `@pytest.fixture`, `@pytest.mark.parametrize`, `pytest.raises`
- **โค้ด:** fixture เตรียมข้อมูล, parametrize, ตรวจ exception
- **callout:** parametrize = เขียนครั้งเดียว รันหลายชุด
- **แบบฝึกหัด:** parametrize 5 ชุด input/output

### 6.4 `test-mock` — Mock & แยก dependency
- **สอน:** ทำไมต้อง mock, `unittest.mock`, `monkeypatch`, mock return, ตรวจการเรียก
- **โค้ด:** mock requests, monkeypatch
- **callout(warn):** เทสต์ยิง network จริง = ช้า+ไม่เสถียร
- **แบบฝึกหัด:** mock ฟังก์ชันดึงข้อมูลภายนอก

### 6.5 `test-tdd` — TDD & Coverage
- **สอน:** TDD loop (Red→Green→Refactor), `pytest-cov`, coverage ไม่ใช่ทุกอย่าง
- **โค้ด:** TDD ทีละขั้น, `lang: bash` coverage
- **callout:** 100% coverage ≠ ไม่มี bug
- **แบบฝึกหัด:** สร้างฟังก์ชันแบบ TDD
- **ปิดบท:** `links` → บทที่ 7

---

## บทที่ 7 — Clean Code & การออกแบบ (`clean-code.ts`, prefix `clean-`)

> เป้าหมายบท: เขียนโค้ดให้คน *อ่าน* ไม่ใช่แค่ให้เครื่อง *รัน*

### 7.1 `clean-naming` — Naming, ฟังก์ชันที่ดี & Docstring
- **สอน:** ตั้งชื่อสื่อความหมาย, เลี่ยง magic number, ฟังก์ชันทำอย่างเดียว (SRP), argument น้อย, **docstring & การอ่าน documentation** (P2 แทรกที่นี่)
- **โค้ด:** before/after refactor ชื่อ + แตกฟังก์ชัน + docstring
- **callout:** ถ้าต้องคอมเมนต์อธิบายว่าโค้ดทำอะไร = ตั้งชื่อยังไม่ดีพอ
- **แบบฝึกหัด:** refactor ชื่อแย่ + เขียน docstring

### 7.2 `clean-principles` — DRY, KISS, YAGNI & Code Smells
- **สอน:** DRY, KISS, YAGNI, code smells (ฟังก์ชันยาว, พารามิเตอร์เยอะ, โค้ดซ้ำ)
- **โค้ด:** โค้ดซ้ำ → ดึงเป็นฟังก์ชัน
- **callout(warn):** over-engineering แย่พอ ๆ กับ under-engineering
- **แบบฝึกหัด:** หา code smell แล้วแก้

### 7.3 `clean-solid` — SOLID 5 ข้อ
- **สอน:** SRP, OCP, LSP, ISP, DIP — ตัวอย่าง Python เข้าใจง่าย
- **โค้ด:** violate → fix อย่างน้อย SRP, OCP, DIP
- **callout:** SOLID เป็นแนวทาง ไม่ใช่กฎตายตัว
- **แบบฝึกหัด:** แยก class ตาม SRP

### 7.4 `clean-refactor` — Refactoring
- **สอน:** refactor = แก้โครงไม่เปลี่ยนพฤติกรรม (ต้องมีเทสต์ก่อน!), extract function/variable, rename, guard clause ลด nesting
- **โค้ด:** ลด nested if ด้วย early return, extract method
- **callout:** refactor ต้องมีเทสต์คุ้มหลังก่อน (เชื่อมบท 6)
- **แบบฝึกหัด:** refactor ฟังก์ชันซ้อนลึกให้แบน

### 7.5 `clean-patterns` — Design Patterns พื้นฐาน
- **สอน:** pattern คืออะไร, สอน Factory, Strategy, Observer, Singleton (+เตือนอย่าใช้พร่ำเพรื่อ)
- **โค้ด:** Strategy (สลับ algorithm), Factory (สร้างตาม type)
- **callout(warn):** อย่ายัด pattern เพราะอยากใช้
- **แบบฝึกหัด:** ใช้ Strategy เลือกวิธีคำนวณค่าส่ง
- **ปิดบท:** `links` → บทที่ 8

---

## บทที่ 8 — ทำงานกับข้อมูลจริง (`real-data.ts`, prefix `data-`)

> เป้าหมายบท: ดึง/อ่าน/เขียน/ประมวลผลข้อมูลจากโลกจริง

### 8.1 `data-files` — อ่าน/เขียนไฟล์ & pathlib
- **สอน:** `open` mode, `with open`, อ่านทั้งไฟล์/ทีละบรรทัด, encoding (utf-8!), `pathlib.Path`
- **โค้ด:** อ่าน/เขียนไฟล์, วน path ด้วย pathlib
- **callout(warn):** ระบุ `encoding="utf-8"` เสมอ โดยเฉพาะภาษาไทย
- **แบบฝึกหัด:** อ่านไฟล์ นับบรรทัด/คำ เขียนผลลงไฟล์ใหม่

### 8.2 `data-formats` — CSV & JSON
- **สอน:** `csv` (reader/DictReader/writer), `json` (`loads/dumps/load/dump`), serialize/deserialize
- **โค้ด:** อ่าน CSV เป็น dict, dict ↔ JSON, อ่าน/เขียนไฟล์ JSON
- **callout:** JSON = ภาษากลาง API; CSV = ภาษากลาง spreadsheet
- **แบบฝึกหัด:** CSV → กรอง → เขียน JSON

### 8.3 `data-regex` — Regular Expressions 🆕 (P1)
- **เรียนรู้:** ค้นหา/แยก/ตรวจรูปแบบข้อความด้วย regex
- **สอน:** `re` module (`search`, `match`, `findall`, `sub`), pattern พื้นฐาน (`\d \w \s . * + ? [] () |`), group, การใช้จริง (validate email/เบอร์, ดึงข้อมูลจาก log)
- **โค้ด:** ดึงตัวเลขจากข้อความ, validate รูปแบบ, แทนที่ด้วย `sub`
- **callout(warn):** regex ซับซ้อนอ่านยาก — ใส่ comment / `re.VERBOSE` และอย่าใช้ regex parse HTML
- **แบบฝึกหัด:** validate เบอร์โทร, ดึง email ทั้งหมดจากข้อความ

### 8.4 `data-http` — เรียก API จริงด้วย requests
- **สอน:** `requests`, `get/post`, query params, headers, status code, `.json()`, error handling, auth header, rate limit
- **โค้ด:** ดึงจาก public API (JSONPlaceholder), POST พร้อม body
- **callout(warn):** เช็ค `status_code`/`raise_for_status()` ก่อนใช้ข้อมูล
- **แบบฝึกหัด:** ดึงข้อมูลจาก public API แล้วสรุป

### 8.5 `data-datetime` — วันเวลา
- **สอน:** `datetime`/`date`/`timedelta`, parse/format (`strftime`/`strptime`), timezone, กับดัก
- **โค้ด:** คำนวณอายุ, ส่วนต่างวัน, format วันที่ไทย
- **callout(warn):** เก็บเป็น UTC แสดงผลค่อยแปลง timezone
- **แบบฝึกหัด:** คำนวณจำนวนวันระหว่าง 2 วันที่

### 8.6 `data-pandas` — รู้จัก pandas (intro เบา ๆ)
- **สอน:** pandas คืออะไร/เมื่อไรใช้, DataFrame/Series, `read_csv`, filter/groupby เบื้องต้น
- **โค้ด:** `pd.read_csv`, filter, `groupby().mean()`
- **callout:** เล็งสาย Data/AI ค่อยลงลึก pandas/numpy ต่อ
- **แบบฝึกหัด:** โหลด CSV หาค่าเฉลี่ยคอลัมน์
- **ปิดบท:** `links` → บทที่ 9

---

## บทที่ 9 — ฐานข้อมูล & SQL (`databases.ts`, prefix `db-`)

> เป้าหมายบท: ออกแบบและใช้ฐานข้อมูลได้ — เกือบทุกแอปจริงมี DB

### 9.1 `db-model` — Relational Model & ออกแบบตาราง
- **สอน:** table/row/column, primary/foreign key, ความสัมพันธ์ (1-1, 1-many, many-many), normalization เบื้องต้น
- **โค้ด/table:** schema (users, posts) + ER แบบข้อความ
- **callout:** ออกแบบดีตั้งแต่ต้น = แก้ทีหลังน้อย
- **แบบฝึกหัด:** ออกแบบ schema ระบบยืม-คืนหนังสือ

### 9.2 `db-sql` — SQL เจาะลึก
- **สอน:** `CREATE/INSERT/SELECT/UPDATE/DELETE`, `WHERE/ORDER BY/LIMIT`, `JOIN` (inner/left), `GROUP BY` + aggregate, subquery
- **โค้ด:** `lang: sql` โดยเฉพาะ JOIN และ GROUP BY
- **callout(warn):** `DELETE`/`UPDATE` ไม่มี `WHERE` = ลบ/แก้ทั้งตาราง!
- **แบบฝึกหัด:** query JOIN 2 ตาราง + นับต่อกลุ่ม

### 9.3 `db-advanced` — Index, Transaction & Constraint
- **สอน:** index (เร็วขึ้น/ต้นทุน), transaction + ACID, `COMMIT`/`ROLLBACK`, constraint
- **โค้ด:** สร้าง index, transaction โอนเงิน
- **callout:** index เร็วตอนอ่าน ช้าตอนเขียน — ใส่เท่าจำเป็น
- **แบบฝึกหัด:** ออกแบบ transaction ที่ต้อง atomic

### 9.4 `db-python` — เชื่อม Python กับ DB (sqlite3)
- **สอน:** `sqlite3`, connect/cursor/execute/commit, parameterized query
- **โค้ด:** สร้างตาราง + insert + select
- **callout(warn):** **SQL injection** — ใช้ `?` placeholder อย่าต่อ string
- **แบบฝึกหัด:** CRUD เล็ก ๆ ด้วย sqlite3

### 9.5 `db-orm` — ORM (SQLAlchemy)
- **สอน:** ORM (map class ↔ table), ข้อดี/เสียเทียบ raw SQL, model/session/CRUD
- **โค้ด:** define model, insert/query ผ่าน ORM
- **callout:** ORM สะดวกแต่ต้องเข้าใจ SQL ข้างใต้
- **แบบฝึกหัด:** แปลง CRUD จาก raw SQL เป็น ORM
- **ปิดบท:** `links` → บทที่ 10

---

## บทที่ 10 — สร้างเว็บแอป & API (`web-apps.ts`, prefix `web2-`)

> เป้าหมายบท: ประกอบทุกอย่างเป็น web API ที่รันได้ + ปลอดภัย (สอนพอใช้งานเป็น)

### 10.1 `web2-http` — HTTP เจาะลึก
- **สอน:** request/response, methods, status codes, headers, body, REST, client-server
- **โค้ด/table:** method ↔ การใช้, ตัวอย่าง request/response
- **callout:** REST = ออกแบบรอบ resource + ใช้ method ตรงความหมาย
- **แบบฝึกหัด:** ออกแบบ endpoint ของ blog API

### 10.2 `web2-framework` — เริ่มกับ FastAPI
- **สอน:** ทำไมใช้ framework, ติดตั้ง FastAPI + uvicorn, route แรก, รัน server, auto docs (`/docs`)
- **โค้ด:** hello world API, `lang: bash` รัน server
- **callout:** FastAPI = type hint + auto validation + auto docs (เชื่อม err-typing)
- **แบบฝึกหัด:** endpoint `/hello/{name}`

### 10.3 `web2-request` — รับ Request & Validation
- **สอน:** path/query param, request body (Pydantic), validation, JSON response, status code
- **โค้ด:** endpoint รับ body + validate ด้วย Pydantic
- **callout:** อย่าเชื่อ input client — validate เสมอ (เชื่อม err-defensive)
- **แบบฝึกหัด:** endpoint สร้าง user ที่ validate

### 10.4 `web2-auth` — Authentication 🆕 (P1)
- **เรียนรู้:** ทำให้แอป "รู้ว่าใครเป็นใคร" — แอปจริงทุกตัวต้องมี
- **สอน:** session vs token, JWT (โครงสร้าง+หลักการ), login flow, hash รหัสผ่าน (bcrypt — อย่าเก็บ plaintext!), protected endpoint, `Authorization` header
- **โค้ด:** register/login ที่ hash password, endpoint ที่ต้อง login
- **callout(warn):** **อย่าเก็บรหัสผ่านเป็น plaintext เด็ดขาด** — hash + salt เสมอ
- **แบบฝึกหัด:** ทำ register/login + endpoint ที่ป้องกันด้วย token

### 10.5 `web2-security` — Security พื้นฐาน 🆕 (P1)
- **เรียนรู้:** ช่องโหว่ที่เจอบ่อย + วิธีกัน (มากกว่าแค่ SQL injection)
- **สอน:** OWASP เบื้องต้น, SQL injection (ทบทวน), XSS, CSRF, จัดการ secret (env, ไม่ commit), HTTPS, validate/sanitize input, อย่าเชื่อ client
- **โค้ด:** ตัวอย่าง vulnerable → fixed (เช่น sanitize input, parameterized query)
- **callout(warn):** "อย่าเชื่อ input จากภายนอก" คือหัวใจของ security
- **แบบฝึกหัด:** หาช่องโหว่ในโค้ดที่ให้ + แก้
- **ปิดบท:** `links` → บทที่ 11

---

## บทที่ 11 — Data Structures & Algorithms (`dsa-mid.ts`, prefix `dsa-`) ⭐ บทเด่น

> เป้าหมายบท: **หัวใจของคอร์ส** — DS & algorithm ระดับที่ใช้ทำงานจริงและสัมภาษณ์ ลงลึกทั้ง implementation + วิเคราะห์ Big-O + โจทย์ ทุกหัวข้อเชื่อมไป practice-problems / se-roadmap

### 11.1 `dsa-choose` — เลือกโครงสร้างให้ถูก & ทบทวน Big-O
- **สอน:** ทบทวน Big-O, ตารางเทียบ complexity ของแต่ละ structure, "เลือกอันไหนเมื่อไร", **bit manipulation เบื้องต้น (P2 ใส่เป็น `details`)**
- **โค้ด/table:** operation ↔ structure ↔ Big-O
- **callout:** เลือก DS ถูก = แก้ปัญหา performance ครึ่งทาง (เชื่อม dbg-performance)
- **แบบฝึกหัด:** ให้โจทย์ → เลือก structure + เหตุผล

### 11.2 `dsa-stack-queue` — Stack, Queue & Deque
- **สอน:** stack (LIFO), queue (FIFO), `collections.deque`, implement
- **โค้ด:** stack ตรวจวงเล็บสมดุล, queue ด้วย deque
- **callout(warn):** อย่าใช้ `list.pop(0)` เป็น queue — O(n)! ใช้ deque
- **แบบฝึกหัด:** ตรวจวงเล็บสมดุล, จำลอง queue งาน

### 11.3 `dsa-linked` — Linked List
- **สอน:** node + pointer, singly/doubly, ต่าง array ยังไง, traverse, reverse
- **โค้ด:** สร้าง singly linked list, reverse, หา middle
- **callout:** สำคัญเพื่อเข้าใจ pointer + โจทย์สัมภาษณ์
- **แบบฝึกหัด:** reverse linked list, detect cycle (เกริ่น two-pointer)

### 11.4 `dsa-tree` — Tree & Binary Search Tree
- **สอน:** terminology, binary tree, BST (ค้นเร็ว O(log n)), traversal (in/pre/post-order recursion), insert/search
- **โค้ด:** สร้าง BST, traversal 3 แบบ, search
- **callout:** in-order ของ BST = ค่าเรียงจากน้อยไปมาก
- **แบบฝึกหัด:** นับความสูง, in-order, ตรวจว่าเป็น BST

### 11.5 `dsa-hash` — Hash Table เจาะลึก
- **สอน:** hash function, bucket, collision (chaining), ทำไม dict/set O(1) เฉลี่ย, ใช้แก้โจทย์
- **โค้ด:** two-sum ด้วย dict, นับความถี่, `Counter`
- **callout:** "ใช้ hash map" = คำตอบของโจทย์สัมภาษณ์จำนวนมาก
- **แบบฝึกหัด:** two-sum, ตัวซ้ำตัวแรก, group anagrams

### 11.6 `dsa-sorting` — Sorting เชิงลึก 🆕 (P0)
- **เรียนรู้:** เข้าใจ sorting algorithm ไม่ใช่แค่เรียก `.sort()`
- **สอน:** bubble/selection/insertion (เข้าใจง่าย, ช้า O(n²)), **merge sort** + **quick sort** (เขียนเอง, O(n log n)), stability, `sorted(key=)` ในงานจริง, Timsort (ของ Python)
- **โค้ด:** implement merge sort + quick sort, เทียบเวลากับ built-in
- **callout:** งานจริงใช้ `sorted()` (Timsort) — แต่ต้องเข้าใจข้างใต้สำหรับสัมภาษณ์
- **แบบฝึกหัด:** เขียน merge sort, เรียง object หลายเงื่อนไข

### 11.7 `dsa-binary-search` — Binary Search & Variations 🆕 (P0)
- **เรียนรู้:** ค้นหาใน O(log n) + รูปแบบที่ดัดแปลง
- **สอน:** binary search พื้นฐาน, กับดัก off-by-one, หา leftmost/rightmost, `bisect` module, ใช้ binary search กับ "answer space"
- **โค้ด:** binary search เขียนเอง, `bisect_left/right`
- **callout(warn):** off-by-one + infinite loop คือกับดักคลาสสิก — ระวัง `lo/hi/mid`
- **แบบฝึกหัด:** หา insert position, หาตัวแรกที่ ≥ x

### 11.8 `dsa-twopointer` — Two-Pointer & Sliding Window 🆕 (P0)
- **เรียนรู้:** เทคนิคแก้โจทย์ array/string ที่เจอบ่อยสุด
- **สอน:** two-pointer (สองหัวเข้าหากัน / fast-slow), sliding window (fixed/variable size), เปลี่ยน O(n²) เป็น O(n)
- **โค้ด:** two-sum (sorted), ตรวจ palindrome, longest substring without repeat, max sum window
- **callout:** เห็น "subarray/substring ต่อเนื่อง" → คิดถึง sliding window
- **แบบฝึกหัด:** ผลรวม window สูงสุด, substring ไม่ซ้ำยาวสุด

### 11.9 `dsa-recursion` — Recursion ลึก & Backtracking
- **สอน:** recursion (base + recursive case), call stack, recursion ↔ tree, backtracking, เมื่อไรดีกว่า loop
- **โค้ด:** permutations/subsets backtracking, N-queens ย่อ
- **callout(warn):** ลืม base case = RecursionError; Python มี recursion limit
- **แบบฝึกหัด:** subset ทั้งหมด, permutation, backtracking ง่าย ๆ

### 11.10 `dsa-dp` — Dynamic Programming เบื้องต้น
- **สอน:** overlapping subproblems + optimal substructure, memoization (top-down) → tabulation (bottom-up), fib → climbing stairs → coin change
- **โค้ด:** fib naive vs memo vs tab, climbing stairs
- **callout:** DP = "จำผลที่คำนวณแล้ว" — เชื่อม `@lru_cache` (บท 3) + decorator (บท 1)
- **แบบฝึกหัด:** climbing stairs, coin change

### 11.11 `dsa-greedy` — Greedy Algorithms 🆕 (P0)
- **เรียนรู้:** แก้ปัญหาด้วยการเลือก "ดีที่สุดตอนนี้" + รู้ว่าเมื่อไรใช้ไม่ได้
- **สอน:** แนวคิด greedy, ตัวอย่างที่ใช้ได้ (ทอนเงิน, activity selection, interval), เทียบกับ DP, ทำไมบางทีผิด
- **โค้ด:** ทอนเงินจำนวนเหรียญน้อยสุด, จัดตารางกิจกรรม
- **callout(warn):** greedy ไม่ได้ผลเสมอ — ต้องพิสูจน์ว่า "ดีตอนนี้ → ดีรวม"
- **แบบฝึกหัด:** activity selection, ปัญหา interval

### 11.12 `dsa-graph` — Graph & BFS/DFS
- **สอน:** graph (vertex/edge, directed/undirected/weighted), adjacency list/matrix, BFS (queue) + DFS (stack/recursion), ใช้ทำอะไร
- **โค้ด:** สร้าง graph (dict), BFS, DFS, เชื่อมถึงกันไหม
- **callout:** tree คือ graph พิเศษ; BFS หา shortest path (unweighted)
- **แบบฝึกหัด:** BFS shortest path, นับ connected components
- **ปิดบท:** `links` → บทที่ 12 + ลิงก์ไป **practice-problems** (`pp-basics`) + se-roadmap (`practice`)

---

## บทที่ 12 — Concurrency & Async เบื้องต้น (`concurrency.ts`, prefix `async-`)

> เป้าหมายบท: เข้าใจการทำหลายอย่างพร้อมกัน + เลือกเครื่องมือถูก (เบื้องต้น)

### 12.1 `async-why` — Concurrency vs Parallelism
- **สอน:** concurrency (สลับทำ) vs parallelism (พร้อมจริง), I/O-bound vs CPU-bound
- **table:** I/O-bound → threading/async; CPU-bound → multiprocessing
- **callout:** เลือกผิดเครื่องมือ = ไม่เร็วขึ้น
- **แบบฝึกหัด:** จำแนกงาน I/O-bound หรือ CPU-bound

### 12.2 `async-threads` — Threading & GIL
- **สอน:** thread, `threading`, GIL (ทำไม thread ไม่เร่ง CPU-bound), เหมาะ I/O, `ThreadPoolExecutor`
- **โค้ด:** ดาวน์โหลดหลายไฟล์พร้อมกัน (เทียบเวลา)
- **callout(warn):** GIL ทำให้ thread ไม่ช่วย CPU-bound
- **แบบฝึกหัด:** thread pool เร่งงาน I/O

### 12.3 `async-process` — Multiprocessing
- **สอน:** process แยก memory (ข้าม GIL), `ProcessPoolExecutor`, เหมาะ CPU-bound, ต้นทุน
- **โค้ด:** คำนวณหนักแบ่งหลาย process
- **callout:** process หนักกว่า thread — ใช้กับงานคำนวณจริง
- **แบบฝึกหัด:** process pool เร่งงานคำนวณ

### 12.4 `async-asyncio` — async/await & asyncio
- **สอน:** `async def`/`await`, event loop, coroutine, `asyncio.gather`, เหมาะ I/O จำนวนมาก
- **โค้ด:** ยิงหลาย request พร้อมกันด้วย asyncio
- **callout(warn):** ห้ามเรียก blocking ใน async (บล็อก event loop)
- **แบบฝึกหัด:** async ดึงหลาย URL พร้อมกัน
- **ปิดบท:** `links` → บทที่ 13

---

## บทที่ 13 — Capstone Project (`capstone.ts`, prefix `cap-`)

> เป้าหมายบท: รวมทุกบทเป็นโปรเจกต์จริงตั้งแต่ต้นจนจบ — เอาใส่ portfolio และโชว์ตอนสัมภาษณ์ได้

### 13.1 `cap-plan` — วางแผน & ออกแบบโปรเจกต์
- **สอน:** เลือกโปรเจกต์ (REST API + DB + auth เช่น "ระบบจัดการงาน/บันทึกค่าใช้จ่าย"), requirement, data model + endpoints, แตกงานเป็น task
- **โค้ด/text:** requirement + schema + endpoint list
- **callout:** วางแผนก่อนเขียน = เขียนน้อยลง รื้อน้อยลง
- **แบบฝึกหัด:** เขียน requirement + schema ของโปรเจกต์ตัวเอง

### 13.2 `cap-build` — สร้างทีละส่วน (ใช้ทุกอย่างที่เรียนมา)
- **สอน:** project structure (บท 4) + git branch ต่อ feature (บท 5) + เทสต์คู่กัน (บท 6) + clean code (บท 7) + DB (บท 9) + API + auth (บท 10) + debug เมื่อติด (บท 3)
- **โค้ด:** โครงโปรเจกต์ + flow build ทีละ feature
- **callout:** commit เล็ก ๆ ต่อ feature + เทสต์ผ่านก่อน merge
- **แบบฝึกหัด:** สร้าง feature แรกครบ (โค้ด+เทสต์+commit)

### 13.3 `cap-quality` — คุณภาพ, เอกสาร & CI
- **สอน:** README ที่ดี, docstring, **linter/formatter (ruff/black) + pyproject.toml (P2)**, CI ด้วย GitHub Actions (รันเทสต์ทุก push)
- **โค้ด:** README ตัวอย่าง, `lang: yaml` GitHub Actions รัน pytest
- **callout:** CI สีเขียว = มั่นใจก่อน merge
- **แบบฝึกหัด:** เขียน README + ตั้ง CI

### 13.4 `cap-deploy` — Deploy เบื้องต้น & ไปต่อ
- **สอน:** ภาพรวม deploy (Railway/Render), **Docker/container เบื้องต้น (P2)**, environment ใน production, ปิดท้าย: ไปต่อ practice-problems + se-roadmap
- **โค้ด/text:** ขั้นตอน deploy ย่อ, Dockerfile ตัวอย่าง, checklist ก่อน deploy
- **callout:** ตอนนี้คุณมีโปรเจกต์จริงใน portfolio แล้ว — พร้อมไปเตรียมสัมภาษณ์
- **แบบฝึกหัด:** deploy โปรเจกต์ + ใส่ลิงก์ใน README
- **ปิดคอร์ส:** `links` → **practice-problems** (`pp-basics`) + **se-roadmap** (`learn`/`resume`) + กลับ overview

---

## สรุปจำนวนหัวข้อ

| บท | หัวข้อ | บท | หัวข้อ |
|----|--------|----|--------|
| 1 Python ลึก | 9 | 8 Real data | 6 |
| 2 Robust code | 5 | 9 Databases | 5 |
| 3 Debugging & Perf 🆕 | 4 | 10 Web + auth/security | 7 |
| 4 Project/tooling | 5 | 11 DSA ⭐ | 13 |
| 5 Git | 5 | 12 Concurrency | 4 |
| 6 Testing | 5 | 13 Capstone | 4 |
| 7 Clean code | 5 | | |

**รวม 77 หัวข้อ** (+ overview) ใน 13 บท — ครบตาม coverage matrix ใน `04-content-review.md`
