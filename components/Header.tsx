"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVBAR_LINKS } from "@/lib/content";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const CODING_PATHS = [
  "/guide/interview-formats",
  "/guide/picking-language",
  "/guide/study-plan",
  "/guide/best-practices",
];

function isNavActive(pathname: string, href: string, label: string) {
  if (pathname === href) return true;
  if (label === "Coding") return CODING_PATHS.includes(pathname);
  return false;
}

export default function Header({ onMenu }: { onMenu?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex min-h-[2.5rem] items-center justify-center bg-primary px-4 py-2 text-center text-sm font-bold text-white">
        คู่มือเตรียมสัมภาษณ์ Software Engineer ภาษาไทย — ทำตามทีละขั้นได้เลย
      </div>
      <header className="sticky top-0 z-50 h-[3.75rem] border-b border-border bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-full max-w-full items-center gap-2 px-4">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              className="hidden rounded p-1.5 text-xl text-[#1c1e21] hover:bg-surface-soft max-[996px]:block"
              onClick={onMenu}
              aria-label="เปิดเมนู sidebar"
            >
              ☰
            </button>
            <Link
              href="/guide/overview"
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
                    fontSize="14"
                    fontWeight="700"
                    fontFamily="system-ui,sans-serif"
                  >
                    SE
                  </text>
                </svg>
              </span>
              <span className="truncate">Interview Roadmap</span>
            </Link>
          </div>
          <nav
            className="ml-3 flex flex-1 items-center gap-0.5 overflow-x-auto max-[996px]:hidden"
            aria-label="Main"
          >
            {NAVBAR_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded px-2.5 py-1.5 text-[0.9rem] no-underline hover:bg-surface-soft hover:text-primary hover:no-underline ${
                  isNavActive(pathname, item.href, item.label)
                    ? "font-semibold text-primary"
                    : "text-[#1c1e21]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center">
            <a
              className="flex size-8 items-center justify-center rounded-full text-[#1c1e21] transition-colors hover:bg-border hover:no-underline"
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
