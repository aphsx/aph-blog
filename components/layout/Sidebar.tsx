"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { COURSE_META_MAP } from "@/lib/courses/metadata";
import { courseFromPathname, isPagePath, pagePath } from "@/lib/paths";
import { UI } from "@/lib/locale";
import { useLocale } from "@/components/providers/LocaleProvider";

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
      data-active={active ? "true" : undefined}
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

function scrollStorageKey(courseId: string) {
  return `aph-sidebar-scroll:${courseId}`;
}

export default function Sidebar({
  open,
  onNavigate,
  collapsed = false,
  onToggleCollapse,
}: {
  open?: boolean;
  onNavigate?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const pathname = usePathname();
  const { locale } = useLocale();
  const ui = UI[locale];
  const courseId = courseFromPathname(pathname);
  const course = courseId ? COURSE_META_MAP[courseId] : undefined;
  const asideRef = useRef<HTMLElement>(null);

  // Restore sidebar scroll after remount; keep the active item in view.
  useEffect(() => {
    if (!courseId) return;
    const el = asideRef.current;
    if (!el) return;

    const saved = sessionStorage.getItem(scrollStorageKey(courseId));
    if (saved != null) {
      const y = Number(saved);
      if (!Number.isNaN(y)) el.scrollTop = y;
    }

    // If the active link ended up outside the viewport, nudge just enough.
    const active = el.querySelector<HTMLElement>("[data-active='true']");
    active?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [courseId, pathname]);

  // Persist scroll while the user scrolls the sidebar.
  useEffect(() => {
    if (!courseId) return;
    const el = asideRef.current;
    if (!el) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        sessionStorage.setItem(
          scrollStorageKey(courseId),
          String(el.scrollTop),
        );
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      sessionStorage.setItem(scrollStorageKey(courseId), String(el.scrollTop));
      el.removeEventListener("scroll", onScroll);
    };
  }, [courseId]);

  // No sidebar on the blog home (or any non-course route).
  if (!course || !courseId) return null;

  const nav = course.nav;

  return (
    <aside
      ref={asideRef}
      className={`doc-sticky-top sticky h-[calc(100vh-var(--doc-sticky-top))] shrink-0 overflow-y-auto bg-white pb-12 pt-3 transition-all duration-300 ease-in-out max-[996px]:fixed max-[996px]:left-0 max-[996px]:top-[var(--doc-sticky-top)] max-[996px]:z-40 max-[996px]:w-[300px] max-[996px]:shadow-[4px_0_24px_rgba(0,0,0,0.1)] ${
        open ? "max-[996px]:translate-x-0" : "max-[996px]:-translate-x-full"
      } ${
        collapsed
          ? "min-[997px]:w-0 min-[997px]:max-w-0 min-[997px]:border-r-0 min-[997px]:p-0 min-[997px]:opacity-0 min-[997px]:pointer-events-none min-[997px]:overflow-hidden"
          : "min-[997px]:w-[300px] min-[997px]:max-w-[300px] min-[997px]:border-r min-[997px]:border-border min-[997px]:opacity-100"
      }`}
      aria-label="Docs sidebar"
      aria-hidden={collapsed}
    >
      <div className="w-[300px]">
        <nav className="px-1.5 text-[0.875rem]" aria-label="Docs sidebar">
          <div className="mb-2 flex items-center justify-between px-3">
            <Link
              href="/"
              onClick={onNavigate}
              className="flex items-center gap-1.5 text-[0.8rem] font-medium text-muted no-underline hover:text-primary hover:no-underline transition-colors"
            >
              ← {ui.allCourses}
            </Link>

            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                className="group hidden min-[997px]:inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-surface-soft/80 px-2 py-1 text-xs font-medium text-muted hover:border-primary/40 hover:bg-primary-soft hover:text-primary transition-all duration-200 cursor-pointer shadow-2xs"
                title={ui.collapseSidebarsTooltip}
                aria-label={ui.collapseSidebars}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:-translate-x-0.5 text-muted group-hover:text-primary"
                  aria-hidden="true"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 3v18" />
                  <path d="m16 15-3-3 3-3" />
                </svg>
                <span className="text-[11px] font-medium">
                  {ui.collapseSidebars}
                </span>
              </button>
            )}
          </div>

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
      </div>
    </aside>
  );
}
