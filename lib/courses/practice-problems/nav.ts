import type { NavCategory } from "@/lib/types";

/** Sidebar navigation for the Practice Problems course. */
export const practiceProblemsNav: NavCategory[] = [
  {
    label: "เริ่มต้นที่นี่",
    items: [{ slug: "practice", title: "ภาพรวม & วิธีใช้" }],
  },
  {
    label: "ฝึกตามหัวข้อ",
    items: [
      { slug: "pp-basics", title: "พื้นฐาน (ตัวแปร/เงื่อนไข/loop)" },
      { slug: "pp-strings", title: "String" },
      { slug: "pp-arrays", title: "Array / List" },
      { slug: "pp-dict-set", title: "Dictionary & Set" },
      { slug: "pp-math", title: "คณิตศาสตร์ & ตรรกะ" },
    ],
  },
  {
    label: "ระดับต่อไป",
    items: [
      { slug: "pp-recursion", title: "Recursion" },
      { slug: "pp-patterns", title: "เทคนิคสัมภาษณ์ (Patterns)" },
    ],
  },
];
