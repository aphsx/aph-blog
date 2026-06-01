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
  // บทที่ 2: Error handling & โค้ดที่แข็งแรง — เพิ่มใน Step 2
  // ... (บทถัดไปทยอยเพิ่มทีละ step)
];
