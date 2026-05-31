import Link from "next/link";
import Shell from "@/components/Shell";
import { COURSES } from "@/lib/courses";
import { coursePath } from "@/lib/paths";

export default function BlogHome() {
  return (
    <Shell>
      <div className="mx-auto max-w-4xl">
        <header className="mb-10">
          <h1 className="m-0 text-[2em] font-bold leading-tight tracking-tight text-[#1c1e21] min-[768px]:text-[2.5em]">
            Aph&apos;s Blog
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            บันทึกและคอร์สเรียนด้านการพัฒนาซอฟต์แวร์ — ภาษาไทย เลือกคอร์สที่อยากเริ่มได้เลย
          </p>
        </header>

        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted">
          คอร์สทั้งหมด
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {COURSES.map((course) => (
            <Link
              key={course.id}
              href={coursePath(course.id)}
              className="group flex flex-col rounded-xl border border-border bg-white p-5 no-underline transition-colors hover:border-primary hover:no-underline"
            >
              <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary-soft text-2xl">
                {course.badge}
              </div>
              <div className="text-lg font-bold text-[#1c1e21] group-hover:text-primary">
                {course.title}
              </div>
              <p className="mt-1.5 flex-1 text-[0.95em] leading-relaxed text-muted">
                {course.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                เริ่มคอร์ส
                <span className="transition-transform group-hover:translate-x-0.5">
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
