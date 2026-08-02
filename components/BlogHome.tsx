import Link from "next/link";
import Shell from "@/components/Shell";
import { COURSES } from "@/lib/courses";
import { DEFAULT_LOCALE, pickLocalized } from "@/lib/locale";
import { coursePath, pagePath } from "@/lib/paths";

// A handful of real pages surfaced as "recommended reading" — the first
// non-overview page from each course, so the home reads like a blog feed.
const FEATURED_POSTS = COURSES.map((course) => {
  const slug = course.order.find((s) => s !== course.overviewSlug);
  if (!slug) return null;
  const page = course.pages[slug];
  return {
    slug,
    title: pickLocalized(page.title, DEFAULT_LOCALE),
    lead: pickLocalized(page.lead, DEFAULT_LOCALE),
    courseTitle: course.title,
    badge: course.badge,
  };
}).filter((p): p is NonNullable<typeof p> => p !== null);

export default function BlogHome() {
  return (
    <Shell>
      <div className="mx-auto max-w-5xl">
        {/* Courses */}
        <section id="courses" className="scroll-mt-24">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="m-0 text-2xl font-extrabold tracking-tight text-[#1c1e21] md:text-3xl">
                คอร์สเรียน
              </h2>
              <p className="mt-1 text-base text-muted">
                เลือกเส้นทางที่อยากเริ่มได้เลย
              </p>
            </div>
          </div>

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
        </section>

        {/* Featured reading — makes the home read like a blog feed */}
        <section className="mt-14">
          <div className="mb-6">
            <h2 className="m-0 text-2xl font-extrabold tracking-tight text-[#1c1e21] md:text-3xl">
              เริ่มอ่านจากตรงนี้
            </h2>
            <p className="mt-1 text-base text-muted">
              บทความแนะนำจากแต่ละคอร์ส
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {FEATURED_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={pagePath(post.slug)}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-white p-5 no-underline transition-all hover:-translate-y-0.5 hover:border-primary hover:no-underline hover:shadow-[0_8px_24px_rgba(101,101,213,0.1)]"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-xl">
                  {post.badge}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {post.courseTitle}
                  </div>
                  <div className="mt-1 text-lg font-bold text-[#1c1e21] group-hover:text-primary">
                    {post.title}
                  </div>
                  {post.lead && (
                    <p className="mt-1 line-clamp-2 text-[0.95em] leading-relaxed text-muted">
                      {post.lead}
                    </p>
                  )}
                </div>
                <span className="mt-1 hidden shrink-0 self-center text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary sm:block">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Shell>
  );
}
