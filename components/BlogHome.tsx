import Link from "next/link";
import Shell from "@/components/Shell";
import { COURSES } from "@/lib/courses";
import { coursePath } from "@/lib/paths";

export default function BlogHome() {
  return (
    <Shell>
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="m-0 text-3xl font-extrabold tracking-tight text-[#1c1e21] md:text-4xl">
            คอร์สทั้งหมด
          </h1>
          <p className="mt-2 text-base leading-relaxed text-muted">
            คอร์สเรียนเขียนโปรแกรมภาษาไทย — เลือกคอร์สที่อยากเริ่มได้เลย
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2">
          {COURSES.map((course) => (
            <Link
              key={course.id}
              href={coursePath(course.id)}
              className="group flex flex-col rounded-2xl border border-border bg-white p-6 no-underline shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 hover:border-primary hover:no-underline hover:shadow-[0_8px_24px_rgba(101,101,213,0.12)]"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary-soft text-2xl">
                  {course.badge}
                </div>
                <span className="rounded-full bg-surface-soft px-2.5 py-1 text-xs font-semibold text-muted">
                  {course.order.length} หัวข้อ
                </span>
              </div>
              <div className="text-lg font-bold text-[#1c1e21] group-hover:text-primary">
                {course.title}
              </div>
              <p className="mt-2 flex-1 text-[0.95em] leading-relaxed text-muted">
                {course.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                เริ่มคอร์ส
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  );
}
