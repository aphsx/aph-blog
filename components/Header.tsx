"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COURSES } from "@/lib/courses";
import { coursePath, courseFromPathname } from "@/lib/paths";
import { UI } from "@/lib/locale";
import LanguageToggle from "./LanguageToggle";
import { useLocale } from "./LocaleProvider";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function Header({ onMenu }: { onMenu?: () => void }) {
  const pathname = usePathname();
  const activeCourse = courseFromPathname(pathname);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const { locale } = useLocale();
  const ui = UI[locale];

  return (
    <>
      <div className="flex min-h-[2.5rem] items-center justify-center bg-primary px-4 py-2 text-center text-sm font-medium text-white">
        {ui.banner}
      </div>
      <header className="sticky top-0 z-50 h-[3.75rem] border-b border-border bg-white/90 backdrop-blur shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-full max-w-full items-center gap-2 px-4">
          {/* ซ้าย: ปุ่มเมนูมือถือ + โลโก้ */}
          <button
            type="button"
            className="hidden rounded p-1.5 text-xl text-[#1c1e21] hover:bg-surface-soft max-[996px]:block"
            onClick={onMenu}
            aria-label={ui.openSidebar}
          >
            ☰
          </button>
          <Link
            href="/"
            className="flex items-center gap-2.5 text-base font-bold text-[#1c1e21] no-underline hover:no-underline"
          >
            <span className="shrink-0" aria-hidden>
              <svg viewBox="0 0 32 32" width="28" height="28">
                <rect width="32" height="32" rx="6" fill="#6565d5" />
                <text
                  x="16"
                  y="22"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="system-ui,sans-serif"
                >
                  aph
                </text>
              </svg>
            </span>
            <span className="truncate">Aph&apos;s Blog</span>
          </Link>

          {/* กลาง: หน้าแรก + dropdown คอร์ส (ซ่อนบนมือถือ ใช้ sidebar แทน) */}
          <nav
            className="ml-4 flex items-center gap-1 max-[996px]:hidden"
            aria-label="Main"
          >
            <Link
              href="/"
              className={`rounded-lg px-3 py-1.5 text-[0.9rem] no-underline hover:bg-surface-soft hover:no-underline ${
                pathname === "/"
                  ? "font-semibold text-primary"
                  : "text-[#1c1e21]"
              }`}
            >
              {ui.home}
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setCoursesOpen((o) => !o)}
                className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-[0.9rem] hover:bg-surface-soft ${
                  activeCourse ? "font-semibold text-primary" : "text-[#1c1e21]"
                }`}
                aria-expanded={coursesOpen}
                aria-haspopup="true"
              >
                {ui.courses}
                <span
                  className={`text-xs transition-transform ${coursesOpen ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  ▾
                </span>
              </button>

              {coursesOpen && (
                <>
                  {/* คลิกพื้นที่นอกเพื่อปิด */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setCoursesOpen(false)}
                    aria-hidden
                  />
                  <div className="absolute left-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
                    {COURSES.map((course) => (
                      <Link
                        key={course.id}
                        href={coursePath(course.id)}
                        onClick={() => setCoursesOpen(false)}
                        className={`flex items-start gap-3 rounded-xl p-2.5 no-underline transition-colors hover:bg-surface-soft hover:no-underline ${
                          activeCourse === course.id ? "bg-primary-soft" : ""
                        }`}
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-lg">
                          {course.badge}
                        </span>
                        <span className="min-w-0">
                          <span
                            className={`block text-sm font-semibold ${
                              activeCourse === course.id
                                ? "text-primary"
                                : "text-[#1c1e21]"
                            }`}
                          >
                            {course.title}
                          </span>
                          <span className="line-clamp-1 text-xs text-muted">
                            {ui.topics(course.order.length)}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* ขวา: ภาษา + GitHub */}
          <div className="ml-auto flex items-center gap-2">
            <LanguageToggle />
            <a
              className="flex size-8 items-center justify-center rounded-full text-[#1c1e21] transition-colors hover:bg-surface-soft hover:no-underline"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
