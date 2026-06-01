import type { Page } from "@/lib/types";

const GROUP = "บทที่ 13: Capstone Project";

export const capstonePages: Record<string, Page> = {
  // ─────────────────────────────────────────────────────────────
  "cap-plan": {
    slug: "cap-plan",
    title: "วางแผน & ออกแบบโปรเจกต์",
    lead: "เลือกโปรเจกต์ เขียน requirement ออกแบบ data model และแตกงาน — วางแผนก่อนเขียนโค้ด",
    group: GROUP,
    blocks: [
      { t: "p", c: "บทสุดท้ายคือการรวมทุกอย่างที่เรียนมาเป็นโปรเจกต์จริงตั้งแต่ต้นจนจบ — สิ่งที่เอาไปใส่ portfolio และแสดงความสามารถได้ หัวข้อแรกคือการวางแผน เพราะ \"วางแผนก่อนเขียน = เขียนน้อยลง รื้อน้อยลง\"" },

      { t: "h2", c: "เลือกโปรเจกต์ที่ดี" },
      { t: "p", c: "เลือกโปรเจกต์ที่ไม่เล็กเกินจนไม่ได้ใช้ทักษะ และไม่ใหญ่เกินจนทำไม่จบ ตัวอย่างที่เหมาะ: REST API + DB + auth เช่น" },
      {
        t: "ul",
        c: [
          "ระบบจัดการงาน (Task/To-do API) — CRUD + auth ต่อผู้ใช้",
          "ระบบบันทึกค่าใช้จ่าย — บันทึก/สรุปยอด + รายงาน",
          "ระบบจัดการคลังสินค้าเล็ก ๆ — สินค้า/สต็อก/รายการ",
        ],
      },

      { t: "h2", c: "เขียน Requirement" },
      { t: "p", c: "ระบุให้ชัดว่าโปรเจกต์ \"ทำอะไรได้บ้าง\" (feature) ก่อนลงมือ — เป็นเข็มทิศกันหลงทาง" },
      { t: "code", lang: "text", c: "Task API — requirements\n- ผู้ใช้สมัคร/ล็อกอินได้ (auth)\n- สร้าง/ดู/แก้/ลบ task ของตัวเอง (CRUD)\n- task มี: title, done, created_at\n- ดูเฉพาะ task ของตัวเอง (ต้องล็อกอิน)\n- กรอง task ตามสถานะ done/ยังไม่เสร็จ" },

      { t: "h2", c: "ออกแบบ Data Model & Endpoints" },
      { t: "code", lang: "text", c: "ตาราง (บท 9):\nusers:  id, email(unique), password_hash\ntasks:  id, title, done, created_at, user_id(FK)\n\nEndpoints (บท 10, REST):\nPOST   /register     สมัคร\nPOST   /login        ล็อกอิน -> token\nGET    /tasks        ดู task ของตัวเอง\nPOST   /tasks        สร้าง task\nPUT    /tasks/{id}   แก้\nDELETE /tasks/{id}   ลบ" },
      { t: "callout", title: "วางแผนก่อนเขียน = รื้อน้อยลง", c: "ใช้เวลา 30 นาทีร่าง requirement + schema + endpoints ช่วยประหยัดเวลาเขียนหลายชั่วโมง และทำให้รู้ว่าจะใช้ทักษะบทไหนบ้าง — นี่คือสิ่งที่นักพัฒนาจริงทำก่อนเริ่มโปรเจกต์" },

      { t: "h2", c: "แตกงานเป็น task ย่อย" },
      { t: "ol", c: [
        "ตั้งโปรเจกต์ + venv + git (บท 4, 5)",
        "ออกแบบ DB + สร้างตาราง (บท 9)",
        "ทำ auth: register/login + hash (บท 10)",
        "ทำ CRUD task endpoints + validation (บท 10)",
        "เขียนเทสต์ครอบ endpoint หลัก (บท 6)",
        "เก็บงาน: README + CI + deploy",
      ]},

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "เลือกโปรเจกต์ขนาดพอดี (REST API + DB + auth)",
          "เขียน requirement ระบุ feature ให้ชัดก่อนเขียนโค้ด",
          "ออกแบบ data model + endpoints (ใช้บท 9, 10)",
          "แตกเป็น task ย่อยเรียงลำดับ — วางแผนก่อนช่วยรื้อน้อยลง",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เลือกโปรเจกต์ของตัวเอง  2) เขียน requirement 5-7 ข้อ  3) ออกแบบ schema (ตาราง + key) และ endpoints  4) แตกเป็น task ย่อยเรียงลำดับการทำ" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: สร้างทีละส่วน →", slug: "cap-build", desc: "ลงมือสร้างโดยใช้ทุกอย่างที่เรียนมา" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "cap-build": {
    slug: "cap-build",
    title: "สร้างทีละส่วน (ใช้ทุกอย่างที่เรียนมา)",
    lead: "ลงมือสร้างทีละ feature — โครงสร้างโปรเจกต์ + git + เทสต์ + clean code + DB + API ครบ",
    group: GROUP,
    blocks: [
      { t: "p", c: "ถึงเวลาลงมือ — หัวข้อนี้คือการประกอบทุกบทเข้าด้วยกัน สร้างทีละ feature โดยใช้ workflow ที่นักพัฒนาจริงใช้: branch ต่อ feature, เขียนเทสต์คู่กัน, commit เล็ก ๆ" },

      { t: "h2", c: "ตั้งโปรเจกต์" },
      { t: "code", lang: "bash", c: "mkdir task-api && cd task-api\npython -m venv .venv && source .venv/bin/activate   # บท 4\npip install fastapi uvicorn pytest passlib bcrypt\npip freeze > requirements.txt\ngit init                                            # บท 5\n# สร้าง .gitignore: .venv/, __pycache__/, .env, *.db" },

      { t: "h2", c: "จัดโครงสร้าง (บท 4, 7)" },
      { t: "code", lang: "text", c: "task-api/\n├── src/app/\n│   ├── main.py      # FastAPI app + routes\n│   ├── models.py    # Pydantic models\n│   ├── db.py        # ฐานข้อมูล\n│   └── auth.py      # hash + token\n├── tests/test_tasks.py\n├── requirements.txt\n└── README.md" },

      { t: "h2", c: "Workflow ต่อ feature" },
      { t: "p", c: "ทำทีละ feature ด้วยวงจรนี้ (บท 5, 6) — แต่ละ feature = branch + โค้ด + เทสต์ + commit" },
      { t: "code", lang: "bash", c: "git switch -c feature-auth        # branch ต่อ feature (บท 5)\n# เขียน auth.py (hash + login)   (บท 10)\n# เขียน tests/test_auth.py        (บท 6)\npytest                            # เทสต์ผ่านก่อน\ngit add . && git commit -m \"feat: add register/login with hashing\"\n# merge เข้า main / เปิด PR" },
      { t: "callout", title: "commit เล็ก + เทสต์ผ่านก่อน merge", c: "อย่าเขียนทั้งโปรเจกต์รวดเดียวแล้วค่อย commit — ทำทีละ feature, เขียนเทสต์คู่กัน, commit สื่อความหมาย (conventional commits จากบท 5) นี่คือนิสัยที่ทำให้ดูแลโปรเจกต์ได้จริง" },

      { t: "h2", c: "เขียนโค้ดสะอาดตั้งแต่ต้น (บท 7)" },
      { t: "ul", c: [
        "ตั้งชื่อสื่อความหมาย, ฟังก์ชันทำอย่างเดียว",
        "แยก layer: route (บาง) / service (logic) / db",
        "validate input ทุก endpoint ด้วย Pydantic (บท 2, 10)",
        "กัน SQL injection ด้วย ? / ORM (บท 9)",
      ]},

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "ตั้งโปรเจกต์: venv + git + โครงสร้างแยก layer",
          "ทำทีละ feature: branch → โค้ด → เทสต์ → commit → merge",
          "ใช้ทุกบท: validation, DB, auth, clean code พร้อมกัน",
          "commit เล็กสื่อความหมาย + เทสต์ผ่านก่อน merge",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) ตั้งโปรเจกต์ + venv + git + โครงสร้างโฟลเดอร์  2) ทำ feature แรก (auth) ครบ: โค้ด + เทสต์ + commit  3) ทำ CRUD task ต่อด้วย workflow เดียวกัน  4) ตรวจว่าทุก endpoint validate input และกัน injection" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: คุณภาพ, เอกสาร & CI →", slug: "cap-quality", desc: "README, linter, GitHub Actions" },
          { title: "← ก่อนหน้า: วางแผนโปรเจกต์", slug: "cap-plan" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "cap-quality": {
    slug: "cap-quality",
    title: "คุณภาพ, เอกสาร & CI",
    lead: "ทำให้โปรเจกต์ดูเป็นมืออาชีพ: README ที่ดี, linter/formatter และ CI ที่รันเทสต์อัตโนมัติ",
    group: GROUP,
    blocks: [
      { t: "p", c: "โปรเจกต์ที่ดีไม่ใช่แค่โค้ดทำงานได้ แต่ต้องมีเอกสารที่คนอื่นเข้าใจ และระบบตรวจคุณภาพอัตโนมัติ หัวข้อนี้ทำให้โปรเจกต์ของคุณดูเป็นมืออาชีพและพร้อมโชว์" },

      { t: "h2", c: "README ที่ดี" },
      { t: "p", c: "README คือหน้าแรกที่คนเห็น ต้องบอก: โปรเจกต์คืออะไร, ติดตั้งยังไง, รันยังไง, ใช้ยังไง" },
      { t: "code", lang: "text", c: "# Task API\nREST API จัดการ task ส่วนตัว พร้อมระบบ login\n\n## ติดตั้ง\n    python -m venv .venv && source .venv/bin/activate\n    pip install -r requirements.txt\n\n## รัน\n    uvicorn src.app.main:app --reload\n    เปิด http://localhost:8000/docs\n\n## เทสต์\n    pytest\n\n## เทคโนโลยี\nFastAPI, SQLite, pytest" },

      { t: "h2", c: "Linter & Formatter (ruff/black)" },
      { t: "p", c: "เครื่องมือจัดรูปและตรวจสไตล์โค้ดอัตโนมัติ ทำให้โค้ดสม่ำเสมอทั้งทีมโดยไม่ต้องเถียงกันเรื่องรูปแบบ" },
      { t: "code", lang: "bash", c: "pip install ruff\nruff check .        # ตรวจปัญหา/สไตล์\nruff format .       # จัดรูปอัตโนมัติ\n# (black เป็น formatter ยอดนิยมอีกตัว)" },

      { t: "h2", c: "CI ด้วย GitHub Actions" },
      { t: "p", c: "CI (Continuous Integration) รันเทสต์อัตโนมัติทุกครั้งที่ push/เปิด PR — มั่นใจว่าโค้ดไม่พังก่อน merge สร้างไฟล์ใน .github/workflows/" },
      { t: "code", lang: "yaml", c: "# .github/workflows/test.yml\nname: tests\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: \"3.12\"\n      - run: pip install -r requirements.txt\n      - run: pytest" },
      { t: "callout", title: "CI สีเขียว = มั่นใจก่อน merge", c: "เมื่อตั้ง CI แล้ว ทุก push จะรันเทสต์ให้อัตโนมัติบน GitHub ถ้าแดง (เทสต์พัง) จะเห็นทันทีก่อน merge — นี่คือสิ่งที่ทำให้ทีมกล้าแก้โค้ดร่วมกันโดยไม่กลัวพัง (รวมบท 5, 6 เข้ากับ git บท 5)" },

      { t: "h2", c: "สรุปหัวข้อนี้" },
      {
        t: "ul",
        c: [
          "README บอก: คืออะไร / ติดตั้ง / รัน / ใช้ / เทคโนโลยี",
          "ruff/black ตรวจ+จัดรูปโค้ดอัตโนมัติให้สม่ำเสมอ",
          "CI (GitHub Actions) รันเทสต์อัตโนมัติทุก push/PR",
          "CI เขียว = มั่นใจว่าโค้ดไม่พังก่อน merge",
        ],
      },
      { t: "callout", title: "แบบฝึกหัด", c: "1) เขียน README ให้โปรเจกต์ครบ 4 ส่วน (คืออะไร/ติดตั้ง/รัน/เทสต์)  2) ติดตั้ง ruff แล้ว format โค้ด  3) สร้าง GitHub Actions workflow รัน pytest  4) push แล้วดูว่า CI รันเทสต์ให้บน GitHub" },
      {
        t: "links",
        c: [
          { title: "ถัดไป: Deploy & ไปต่อ →", slug: "cap-deploy", desc: "นำโปรเจกต์ขึ้นใช้งานจริง + เส้นทางต่อไป" },
          { title: "← ก่อนหน้า: สร้างทีละส่วน", slug: "cap-build" },
          { title: "↑ ภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  "cap-deploy": {
    slug: "cap-deploy",
    title: "Deploy เบื้องต้น & ไปต่อ",
    lead: "นำโปรเจกต์ขึ้นใช้งานจริง รู้จัก Docker เบื้องต้น และวางแผนเส้นทางหลังจบคอร์ส",
    group: GROUP,
    blocks: [
      { t: "p", c: "หัวข้อสุดท้าย — นำโปรเจกต์ขึ้นออนไลน์ให้คนอื่นใช้ได้จริง และมองภาพรวมว่าจะไปต่อทางไหนหลังจบคอร์สนี้" },

      { t: "h2", c: "ภาพรวมการ deploy" },
      { t: "p", c: "การ deploy คือเอาโปรเจกต์ขึ้น server ให้เข้าถึงผ่านอินเทอร์เน็ตได้ วิธีง่ายสุดสำหรับมือใหม่คือ PaaS (Platform as a Service) ที่จัดการ server ให้" },
      {
        t: "ul",
        c: [
          "Railway / Render — push โค้ดแล้ว deploy ให้อัตโนมัติ ง่ายสุดสำหรับเริ่มต้น",
          "ตั้ง environment variables บน platform (ไม่ commit secret — บท 4)",
          "ใช้ HTTPS เสมอ (platform มักจัดการให้) — บท 10 security",
        ],
      },

      { t: "h2", c: "Docker เบื้องต้น" },
      { t: "p", c: "Docker บรรจุแอป + dependencies เป็น \"container\" ที่รันได้เหมือนกันทุกที่ แก้ปัญหา \"เครื่องผมรันได้ เครื่องคุณไม่ได้\" — รู้จักไว้พอเข้าใจภาพ" },
      { t: "code", lang: "text", c: "# Dockerfile (ตัวอย่างย่อ)\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD [\"uvicorn\", \"src.app.main:app\", \"--host\", \"0.0.0.0\"]" },
      { t: "callout", title: "checklist ก่อน deploy", c: "เทสต์ผ่านหมด (CI เขียว) · secret อยู่ใน env ไม่ใช่ในโค้ด · ใช้ HTTPS · README บอกวิธีรัน · ปิด debug mode ใน production" },

      { t: "h2", c: "🎓 เรียนจบคอร์สแล้ว — ไปต่อที่ไหน" },
      { t: "p", c: "ยินดีด้วย! คุณผ่านเนื้อหาครบทั้ง 13 บทแล้ว ตั้งแต่ Python เชิงลึก, debugging, testing, git, clean code, ฐานข้อมูล, web API จนถึง Data Structures & Algorithms และทำโปรเจกต์จริงได้ นี่คือก้าวต่อไป:" },
      {
        t: "ul",
        c: [
          "ฝึกโจทย์ DSA ให้คล่อง — ที่คอร์ส Practice Problems บนเว็บนี้",
          "ทำโปรเจกต์ของตัวเองเพิ่มอีก 1-2 ตัว ใส่ portfolio",
          "เตรียมตัวสายงาน — ดูแนวทางที่ SE Roadmap",
          "ทบทวนบทที่ยังไม่แม่น แล้วลงมือทำซ้ำ — การลงมือทำคือกุญแจ",
        ],
      },
      { t: "callout", title: "ความรู้ + ลงมือทำ = เก่งขึ้นจริง", c: "เนื้อหาในคอร์สนี้ให้ความรู้ครบ แต่สิ่งที่ทำให้เก่งจริงคือการลงมือทำ — พิมพ์โค้ดตามทุกหัวข้อ, ทำแบบฝึกหัด, และสร้างโปรเจกต์ของตัวเอง ยิ่งเขียนเยอะ ยิ่งคล่อง" },

      { t: "h2", c: "สรุปหัวข้อนี้ & จบคอร์ส" },
      {
        t: "ul",
        c: [
          "deploy ง่ายสุดด้วย PaaS (Railway/Render) — ตั้ง env, ใช้ HTTPS",
          "Docker บรรจุแอป+dependencies ให้รันเหมือนกันทุกที่",
          "checklist: CI เขียว, secret ใน env, HTTPS, ปิด debug",
          "ไปต่อ: ฝึกโจทย์ + ทำโปรเจกต์เพิ่ม + เตรียมตัวสายงาน",
        ],
      },
      { t: "callout", title: "แบบฝึกหัดสุดท้าย", c: "1) เขียน Dockerfile ให้โปรเจกต์  2) deploy ขึ้น Railway/Render แล้วเอา URL ใส่ README  3) ตรวจ checklist ก่อน deploy ครบทุกข้อ  4) วางแผนโปรเจกต์ถัดไปของตัวเอง" },
      {
        t: "links",
        c: [
          { title: "🎯 ฝึกโจทย์ต่อ: คอร์ส Practice Problems", slug: "pp-basics", desc: "โจทย์แยกตามหัวข้อพร้อมเฉลย — ฝึก DSA ให้คล่อง" },
          { title: "📋 เตรียมตัวสายงาน: SE Roadmap", slug: "learn", desc: "แนวทางและแหล่งอ้างอิงสำหรับก้าวต่อไป" },
          { title: "↑ กลับหน้าภาพรวมคอร์ส", slug: "intermediate" },
        ],
      },
    ],
  },
};
