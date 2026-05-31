import type { NavCategory } from "@/lib/types";

/** Sidebar navigation for the Basic Programming course. */
export const basicProgrammingNav: NavCategory[] = [
  {
    label: "คอร์สเรียนจากศูนย์",
    items: [
      { slug: "learn", title: "ภาพรวม & หลักสูตร" },
      { slug: "cs-basics", title: "บทที่ 1: พื้นฐาน Computer Science" },
    ],
  },
];
