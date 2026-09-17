import type { NavCategory } from "@/lib/types";
import { seRoadmapNav } from "./se-roadmap/nav";
import { basicProgrammingNav } from "./basic-programming/nav";
import { intermediateProgrammingNav } from "./intermediate-programming/nav";
import { practiceProblemsNav } from "./practice-problems/nav";
import { thirtyDaysPythonNav } from "./30-days-python/nav";
import { leetcode75Nav } from "./leetcode-75/nav";
import { dsaNav } from "./dsa/nav";

export interface CourseNavMeta {
  id: string;
  title: string;
  description: string;
  badge: string;
  overviewSlug: string;
  nav: NavCategory[];
  order: string[];
}

export const COURSE_METAS: CourseNavMeta[] = [
  {
    id: "se-roadmap",
    title: "เตรียมสัมภาษณ์ Software Engineer",
    description:
      "Roadmap เตรียมสมัครงาน SE ตั้งแต่ Resume, Coding, System Design, Behavioral จนถึงต่อรอง Offer — ภาษาไทย ทำตามทีละขั้น",
    badge: "💼",
    overviewSlug: "overview",
    nav: seRoadmapNav,
    order: seRoadmapNav.flatMap((c) => c.items.map((i) => i.slug)),
  },
  {
    id: "basic-programming",
    title: "เขียนโปรแกรมจากศูนย์",
    description:
      "เริ่มจากไม่มีพื้นฐานเลย — เข้าใจคอมพิวเตอร์, เขียนโปรแกรม และ Computer Science ทีละขั้น พร้อมโค้ดตัวอย่างให้ลองทำตาม",
    badge: "🌱",
    overviewSlug: "learn",
    nav: basicProgrammingNav,
    order: basicProgrammingNav.flatMap((c) => c.items.map((i) => i.slug)),
  },
  {
    id: "intermediate-programming",
    title: "เขียนโปรแกรมเชิงลึก",
    description:
      "คอร์สเขียนโปรแกรมแบบลงลึก ต่อยอดจากคอร์สพื้นฐาน — เจาะลึกทุกหัวข้อให้ละเอียดกว่าเดิม: Python เชิงลึก, debugging, testing, git, clean code, ฐานข้อมูล, web API และ Data Structures & Algorithms",
    badge: "🚀",
    overviewSlug: "intermediate",
    nav: intermediateProgrammingNav,
    order: intermediateProgrammingNav.flatMap((c) => c.items.map((i) => i.slug)),
  },
  {
    id: "practice-problems",
    title: "โจทย์ฝึกเขียนโปรแกรม",
    description:
      "โจทย์ฝึกพร้อมเฉลยละเอียดเป็นภาษา Python — ลองทำเองก่อนเปิดเฉลย ฝึกตั้งแต่พื้นฐานจนถึงเทคนิคที่เจอในสัมภาษณ์",
    badge: "✏️",
    overviewSlug: "practice",
    nav: practiceProblemsNav,
    order: practiceProblemsNav.flatMap((c) => c.items.map((i) => i.slug)),
  },
  {
    id: "30-days-python",
    title: "30 วัน Python",
    description:
      "เรียน Python จากศูนย์ถึงสร้าง API ใน 30 วัน — แปลและเรียบเรียงจาก 30 Days of Python โดย Asabeneh เนื้อหาครบทุกบทไม่มีตัดทอน",
    badge: "🐍",
    overviewSlug: "py30-overview",
    nav: thirtyDaysPythonNav,
    order: thirtyDaysPythonNav.flatMap((c) => c.items.map((i) => i.slug)),
  },
  {
    id: "leetcode-75",
    title: "LeetCode 75",
    description:
      'พิชิต LeetCode 75 ทั้ง 75 ข้อ แบบละเอียดทีละข้อ — สอน concept ของแต่ละหัวข้อก่อน แยกส่วน "แนวทาง" กับ "เฉลยละเอียด" เป็นภาษา Python',
    badge: "🎯",
    overviewSlug: "lc75",
    nav: leetcode75Nav,
    order: leetcode75Nav.flatMap((c) => c.items.map((i) => i.slug)),
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms (DSA)",
    description:
      "เรียนรู้โครงสร้างข้อมูลและอัลกอริทึมครบ 12 ตอน 49 บทเรียน ถอดรหัสวิธีคิดเชิงสถาปัตยกรรมสู่การทำงานจริงและการสัมภาษณ์งานระดับสากลด้วย Python และ C++",
    badge: "⚡",
    overviewSlug: "dsa-overview",
    nav: dsaNav,
    order: dsaNav.flatMap((c) => c.items.map((i) => i.slug)),
  },
];

export const COURSE_META_MAP: Record<string, CourseNavMeta> = Object.fromEntries(
  COURSE_METAS.map((c) => [c.id, c]),
);

const DSA_LEGACY_ALIASES: Record<string, string> = {
  "dsa-ch7-intro": "dsa",
  "dsa-ch7-big-o-type": "dsa",
  "dsa-ch7-complexity": "dsa",
  "dsa-ch7-leetcode": "dsa",
  "dsa-ch5-graph": "dsa",
};

const SE_ROADMAP_TOPIC_SLUGS: Record<string, string> = {
  "topic-array-string": "se-roadmap",
  "topic-hash-table": "se-roadmap",
  "topic-linked-list": "se-roadmap",
  "topic-stack-queue": "se-roadmap",
  "topic-recursion": "se-roadmap",
  "topic-tree": "se-roadmap",
  "topic-graph": "se-roadmap",
  "topic-heap": "se-roadmap",
  "topic-binary-search": "se-roadmap",
  "topic-dynamic-programming": "se-roadmap",
};

export const SLUG_TO_COURSE: Record<string, string> = {
  ...DSA_LEGACY_ALIASES,
  ...SE_ROADMAP_TOPIC_SLUGS,
  ...Object.fromEntries(
    COURSE_METAS.flatMap((c) => c.order.map((slug) => [slug, c.id])),
  ),
};
