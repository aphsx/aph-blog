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
  // บทที่ 1: Python ระดับลึก — เพิ่มใน Step 1
  // บทที่ 2: Error handling & โค้ดที่แข็งแรง — เพิ่มใน Step 2
  // ... (บทถัดไปทยอยเพิ่มทีละ step)
];
