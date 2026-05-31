"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COURSE_MAP } from "@/lib/courses";
import { courseFromPathname, isPagePath, pagePath } from "@/lib/paths";

function NavLink({
  slug,
  title,
  onNavigate,
}: {
  slug: string;
  title: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = isPagePath(pathname, slug);
  const href = pagePath(slug);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`block rounded-sm py-[0.375rem] pl-3 pr-2 text-[0.875rem] leading-[1.4] no-underline transition-colors hover:no-underline ${
        active
          ? "font-semibold text-primary"
          : "text-[#1c1e21] hover:text-primary"
      }`}
    >
      {title}
    </Link>
  );
}

export default function Sidebar({
  open,
  onNavigate,
}: {
  open?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const courseId = courseFromPathname(pathname);
  const course = courseId ? COURSE_MAP[courseId] : undefined;

  // No sidebar on the blog home (or any non-course route).
  if (!course) return null;

  const nav = course.nav;

  return (
    <aside
      className={`doc-sticky-top sticky h-[calc(100vh-var(--doc-sticky-top))] w-[300px] shrink-0 overflow-y-auto border-r border-border bg-white pb-12 pt-3 max-[996px]:fixed max-[996px]:left-0 max-[996px]:top-[var(--doc-sticky-top)] max-[996px]:z-40 max-[996px]:shadow-[4px_0_24px_rgba(0,0,0,0.1)] max-[996px]:transition-transform max-[996px]:duration-200 ${
        open ? "max-[996px]:translate-x-0" : "max-[996px]:-translate-x-full"
      }`}
    >
      <nav className="px-1.5 text-[0.875rem]" aria-label="Docs sidebar">
        <Link
          href="/"
          onClick={onNavigate}
          className="mb-1 flex items-center gap-1.5 px-3 py-2 text-[0.8rem] font-medium text-muted no-underline hover:text-primary hover:no-underline"
        >
          ← คอร์สทั้งหมด
        </Link>
        <div className="mb-2 px-3 text-[0.95rem] font-bold leading-snug text-primary">
          {course.title}
        </div>
        {nav.map((cat) => (
          <div key={cat.label} className="mb-0.5">
            <div className="cursor-default px-3 py-2 text-[0.875rem] font-bold leading-snug text-[#1c1e21]">
              {cat.label}
            </div>
            <ul className="m-0 ml-3 list-none border-l border-border p-0 pl-1.5">
              {cat.items.map((item) => (
                <li key={item.slug}>
                  <NavLink
                    slug={item.slug}
                    title={item.title}
                    onNavigate={onNavigate}
                  />
                </li>
              ))}
              {cat.subcategories?.map((sub) => (
                <li key={sub.label}>
                  <div className="px-3 py-1.5 pl-6 text-xs font-semibold text-muted">
                    {sub.label}
                  </div>
                  <ul className="m-0 list-none p-0">
                    {sub.items.map((item) => (
                      <li key={item.slug}>
                        <NavLink
                          slug={item.slug}
                          title={item.title}
                          onNavigate={onNavigate}
                        />
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
