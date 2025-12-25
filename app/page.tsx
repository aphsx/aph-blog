import Link from "next/link";
import { getAllCourses, getCoursePosts } from "@/lib/mdx";

type CourseMeta = {
  title: string;
  description: string;
  accent: string;
  highlight: string;
};

const courseMeta: Record<string, CourseMeta> = {
  "c-plus-plus": {
    title: "C++ Fundamental Path",
    description: "วางรากฐานภาษา C++ ตั้งแต่พื้นฐาน การแก้ปัญหา จนถึงอัลกอริทึมคลาสสิก",
    accent: "from-blue-500 to-blue-600",
    highlight: "Beginner · Intermediate",
  },
  golang: {
    title: "Golang Practical Path",
    description: "เรียน Go แบบลงมือทำ ครอบคลุม concurrency, interfaces และการทดสอบ",
    accent: "from-emerald-500 to-emerald-600",
    highlight: "Backend · Concurrency",
  },
};

export default function Home() {
  const slugs = getAllCourses();

  const courses = slugs.map((slug) => {
    const posts = getCoursePosts(slug);
    const firstLesson = posts[0]?.slug;
    const chapters = new Set(posts.map((p) => p.chapter)).size;
    const meta =
      courseMeta[slug] || {
        title: slug.replace(/-/g, " "),
        description: "คอร์สนี้พร้อมสำหรับการเรียนรู้แบบยืดหยุ่น",
        accent: "from-slate-600 via-slate-700 to-slate-900",
        highlight: "Self-paced",
      };

    return {
      slug,
      lessons: posts.length,
      chapters,
      href: firstLesson ? `/courses/${slug}/${firstLesson}` : "#courses",
      ...meta,
    };
  });

  const totalLessons = courses.reduce((sum, c) => sum + c.lessons, 0);
  const firstCourseHref = courses.find((c) => c.href !== "#courses")?.href || "#courses";

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold md:text-4xl">คอร์สที่มีให้เรียน</h1>
          <p className="text-sm text-slate-600 dark:text-slate-200/80">
            หน้านี้รวมคอร์สทั้งหมดที่มี ไลน์เรียนตามบทและบทเรียนย่อยได้ทันที
          </p>
        </header>

        {courses.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900">
            ยังไม่มีคอร์สในโฟลเดอร์ content/ เพิ่มไฟล์ .mdx เพื่อเริ่มต้น
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={course.href}
                className="flex h-full flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  <span className="font-semibold text-slate-700 dark:text-slate-100">{course.highlight}</span>
                  <span>{course.lessons} บทเรียน</span>
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{course.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-200/80">{course.description}</p>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-200/80">{course.chapters} บท</div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
