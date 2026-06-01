import type { NavCategory } from "@/lib/types";

/**
 * Sidebar navigation for the Intermediate Programming course.
 * Categories are added one chapter at a time as each chapter's pages are
 * authored (see docs/intermediate-programming-plan/03-build-steps.md).
 * Only slugs whose pages already exist should appear here.
 */
export const intermediateProgrammingNav: NavCategory[] = [
  {
    label: "เริ่มต้นที่นี่",
    items: [{ slug: "intermediate", title: "ภาพรวม & หลักสูตร" }],
  },
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
  {
    label: "บทที่ 2: Error handling & โค้ดที่แข็งแรง",
    items: [
      { slug: "err-exceptions", title: "Exception เจาะลึก" },
      { slug: "err-custom", title: "สร้าง Exception เอง & raise" },
      { slug: "err-logging", title: "Logging (เลิก print debug)" },
      { slug: "err-typing", title: "Type Hints & mypy" },
      { slug: "err-defensive", title: "Defensive Programming" },
    ],
  },
  {
    label: "บทที่ 3: Debugging, Profiling & Performance",
    items: [
      { slug: "dbg-debugger", title: "ใช้ Debugger จริง (pdb / VS Code)" },
      { slug: "dbg-traceback", title: "อ่าน Traceback & กลยุทธ์ Debug" },
      { slug: "dbg-profiling", title: "Profiling — วัดว่าช้าตรงไหน" },
      { slug: "dbg-performance", title: "เทคนิคเพิ่มประสิทธิภาพ" },
    ],
  },
  {
    label: "บทที่ 4: โครงสร้างโปรเจกต์ & เครื่องมือ",
    items: [
      { slug: "proj-modules", title: "Module & import" },
      { slug: "proj-packages", title: "Package & โครงสร้างโฟลเดอร์" },
      { slug: "proj-venv", title: "Virtual Environment & pip" },
      { slug: "proj-cli", title: "สร้าง CLI ด้วย argparse" },
      { slug: "proj-env", title: "Environment Variables & Config" },
    ],
  },
  {
    label: "บทที่ 5: Git สำหรับทำงานเป็นทีม",
    items: [
      { slug: "git-recap", title: "ทบทวน Git + Mental Model" },
      { slug: "git-branch", title: "Branch & Merge" },
      { slug: "git-remote", title: "Remote, GitHub & push/pull" },
      { slug: "git-conflict", title: "Merge Conflict & Rebase" },
      { slug: "git-workflow", title: "PR Workflow & commit hygiene" },
    ],
  },
  {
    label: "บทที่ 6: การเขียนเทสต์",
    items: [
      { slug: "test-why", title: "ทำไมต้องเทสต์ & ประเภท" },
      { slug: "test-pytest", title: "เริ่มต้นกับ pytest" },
      { slug: "test-fixtures", title: "Fixture & Parametrize" },
      { slug: "test-mock", title: "Mock & แยก dependency" },
      { slug: "test-tdd", title: "TDD & Coverage" },
    ],
  },
  {
    label: "บทที่ 7: Clean Code & การออกแบบ",
    items: [
      { slug: "clean-naming", title: "Naming, ฟังก์ชัน & Docstring" },
      { slug: "clean-principles", title: "DRY, KISS, YAGNI & Code Smells" },
      { slug: "clean-solid", title: "SOLID 5 ข้อ" },
      { slug: "clean-refactor", title: "Refactoring" },
      { slug: "clean-patterns", title: "Design Patterns พื้นฐาน" },
    ],
  },
  {
    label: "บทที่ 8: ทำงานกับข้อมูลจริง",
    items: [
      { slug: "data-files", title: "อ่าน/เขียนไฟล์ & pathlib" },
      { slug: "data-formats", title: "CSV & JSON" },
      { slug: "data-regex", title: "Regular Expressions (regex)" },
      { slug: "data-http", title: "เรียก API จริงด้วย requests" },
      { slug: "data-datetime", title: "วันเวลา (datetime)" },
      { slug: "data-pandas", title: "รู้จัก pandas (เบื้องต้น)" },
    ],
  },
  {
    label: "บทที่ 9: ฐานข้อมูล & SQL",
    items: [
      { slug: "db-model", title: "Relational Model & ออกแบบตาราง" },
      { slug: "db-sql", title: "SQL เจาะลึก" },
      { slug: "db-advanced", title: "Index, Transaction & Constraint" },
      { slug: "db-python", title: "เชื่อม Python กับ DB (sqlite3)" },
      { slug: "db-orm", title: "ORM (SQLAlchemy)" },
    ],
  },
  {
    label: "บทที่ 10: สร้างเว็บแอป & API",
    items: [
      { slug: "web2-http", title: "HTTP เจาะลึก" },
      { slug: "web2-framework", title: "เริ่มกับ FastAPI" },
      { slug: "web2-request", title: "รับ Request & Validation" },
      { slug: "web2-db", title: "เชื่อม API กับ DB (CRUD)" },
      { slug: "web2-auth", title: "Authentication" },
      { slug: "web2-security", title: "Security พื้นฐาน" },
      { slug: "web2-project", title: "ประกอบ API จริง end-to-end" },
    ],
  },
  {
    label: "บทที่ 11: Data Structures & Algorithms ⭐",
    items: [
      { slug: "dsa-choose", title: "เลือกโครงสร้าง & Big-O" },
      { slug: "dsa-stack-queue", title: "Stack, Queue & Deque" },
      { slug: "dsa-linked", title: "Linked List" },
      { slug: "dsa-tree", title: "Tree & BST" },
      { slug: "dsa-heap", title: "Heap & Priority Queue" },
      { slug: "dsa-hash", title: "Hash Table เจาะลึก" },
      { slug: "dsa-sorting", title: "Sorting เชิงลึก" },
      { slug: "dsa-binary-search", title: "Binary Search & Variations" },
      { slug: "dsa-twopointer", title: "Two-Pointer & Sliding Window" },
      { slug: "dsa-recursion", title: "Recursion & Backtracking" },
      { slug: "dsa-dp", title: "Dynamic Programming" },
      { slug: "dsa-greedy", title: "Greedy Algorithms" },
      { slug: "dsa-graph", title: "Graph & BFS/DFS" },
    ],
  },
  {
    label: "บทที่ 12: Concurrency & Async",
    items: [
      { slug: "async-why", title: "Concurrency vs Parallelism" },
      { slug: "async-threads", title: "Threading & GIL" },
      { slug: "async-process", title: "Multiprocessing" },
      { slug: "async-asyncio", title: "async/await & asyncio" },
    ],
  },
  {
    label: "บทที่ 13: Capstone Project",
    items: [
      { slug: "cap-plan", title: "วางแผน & ออกแบบโปรเจกต์" },
      { slug: "cap-build", title: "สร้างทีละส่วน" },
      { slug: "cap-quality", title: "คุณภาพ, เอกสาร & CI" },
      { slug: "cap-deploy", title: "Deploy & ไปต่อ" },
    ],
  },
];
