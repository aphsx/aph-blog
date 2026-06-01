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
  // บทที่ 7: Clean Code & การออกแบบ — เพิ่มใน Step 7
  // ... (บทถัดไปทยอยเพิ่มทีละ step)
];
