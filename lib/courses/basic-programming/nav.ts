import type { NavCategory } from "@/lib/types";

/** Sidebar navigation for the Basic Programming course. */
export const basicProgrammingNav: NavCategory[] = [
  {
    label: "เริ่มต้นที่นี่",
    items: [{ slug: "learn", title: "ภาพรวม & หลักสูตร" }],
  },
  {
    label: "บทที่ 1: พื้นฐาน Computer Science",
    items: [{ slug: "cs-basics", title: "คอมพิวเตอร์ & โปรแกรมทำงานอย่างไร" }],
  },
  {
    label: "บทที่ 2: พื้นฐานการเขียนโปรแกรม",
    items: [
      { slug: "pb-variables", title: "ตัวแปร & ชนิดข้อมูล" },
      { slug: "pb-operators", title: "ตัวดำเนินการ (Operators)" },
      { slug: "pb-io", title: "รับข้อมูล & แสดงผล" },
      { slug: "pb-conditionals", title: "เงื่อนไข (if/elif/else)" },
      { slug: "pb-loops", title: "การวนซ้ำ (Loops)" },
      { slug: "pb-functions", title: "ฟังก์ชัน (Functions)" },
      { slug: "pb-errors", title: "ข้อผิดพลาด & การแก้บั๊ก" },
    ],
  },
  {
    label: "บทที่ 3: โครงสร้างข้อมูล",
    items: [
      { slug: "ds-list", title: "List / Array" },
      { slug: "ds-string", title: "String" },
      { slug: "ds-dict", title: "Dictionary" },
      { slug: "ds-set-tuple", title: "Set & Tuple" },
      { slug: "ds-choose", title: "เลือกใช้ + Comprehension" },
    ],
  },
  {
    label: "บทที่ 4: อัลกอริทึม & Big-O",
    items: [
      { slug: "algo-thinking", title: "คิดเป็นขั้นตอน" },
      { slug: "algo-bigo", title: "Big-O Notation" },
      { slug: "algo-search", title: "การค้นหา (Searching)" },
      { slug: "algo-sort", title: "การเรียงลำดับ (Sorting)" },
      { slug: "algo-recursion", title: "Recursion" },
      { slug: "algo-patterns", title: "เทคนิคที่เจอบ่อย" },
    ],
  },
  {
    label: "บทที่ 5: OOP & การออกแบบโปรแกรม",
    items: [
      { slug: "oop-class", title: "Class & Object" },
      { slug: "oop-pillars", title: "4 เสาหลักของ OOP" },
      { slug: "oop-relationships", title: "Inheritance vs Composition" },
      { slug: "oop-design", title: "หลักการออกแบบโค้ดที่ดี" },
    ],
  },
  {
    label: "บทที่ 6: เว็บ, API & ฐานข้อมูล",
    items: [
      { slug: "web-how", title: "เว็บทำงานอย่างไร" },
      { slug: "web-api", title: "API, JSON & REST" },
      { slug: "web-sql", title: "ฐานข้อมูล & SQL" },
      { slug: "web-fullstack", title: "ภาพรวม Full-stack & ไปต่อ" },
    ],
  },
];
