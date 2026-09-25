"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import type { Heading } from "@/lib/content";
import { courseFromPathname } from "@/lib/paths";
import { UI } from "@/lib/locale";
import { useLocale } from "@/components/providers/LocaleProvider";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TocDesktop from "./Toc";
import Footer from "./Footer";

const SIDEBAR_COLLAPSED_KEY = "aph-sidebars-collapsed";

/** Open ancestor <details> so TOC links into a folded solution still land. */
function revealHashTarget() {
  const raw = window.location.hash.slice(1);
  if (!raw) return;
  const el = document.getElementById(decodeURIComponent(raw));
  if (!el) return;
  let node: HTMLElement | null = el;
  while (node) {
    if (node instanceof HTMLDetailsElement) node.open = true;
    node = node.parentElement;
  }
  el.scrollIntoView({ block: "start" });
}

export default function Shell({
  children,
  toc = [],
}: {
  children: React.ReactNode;
  toc?: Heading[];
}) {
  const pathname = usePathname();
  const isCourse = Boolean(courseFromPathname(pathname));
  const { locale } = useLocale();
  const ui = UI[locale];

  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const hasToc = toc.length > 0;

  // Restore saved collapse preference after mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      if (saved === "true") setCollapsed(true);
    } catch {
      // ignore
    }
  }, []);

  const toggleCollapse = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  // Keyboard shortcut: '[' or 'Cmd+B' / 'Ctrl+B' to toggle dual sidebars
  useEffect(() => {
    if (!isCourse) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (
        e.key === "[" ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b")
      ) {
        e.preventDefault();
        toggleCollapse();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCourse, toggleCollapse]);

  useEffect(() => {
    revealHashTarget();
    window.addEventListener("hashchange", revealHashTarget);
    return () => window.removeEventListener("hashchange", revealHashTarget);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenu={() => setOpen((o) => !o)} />

      {/* Floating button on the left to expand both sidebars when collapsed */}
      {isCourse && collapsed && (
        <button
          type="button"
          onClick={toggleCollapse}
          className="fixed left-3.5 top-[calc(var(--doc-sticky-top)+1rem)] z-30 hidden min-[997px]:inline-flex items-center gap-2 rounded-xl border border-border/80 bg-white/95 px-3 py-2 text-xs font-semibold text-[#1c1e21] shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md hover:border-primary/50 hover:bg-primary-soft hover:text-primary transition-all duration-200 cursor-pointer group"
          title={
            locale === "th"
              ? "แสดงแถบข้างซ้ายและขวา · กด ["
              : "Expand sidebars · Press ["
          }
          aria-label={ui.expandSidebars}
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18" />
            <path d="m13 9 3 3-3 3" />
          </svg>
          <span>{ui.expandSidebars}</span>
          <kbd className="rounded border border-border/70 bg-surface-soft px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted">
            [
          </kbd>
        </button>
      )}

      <div className="flex min-w-0 flex-1">
        <Sidebar
          open={open}
          onNavigate={() => setOpen(false)}
          collapsed={collapsed}
          onToggleCollapse={toggleCollapse}
        />
        {/* docMainContainer — expands when sidebars are collapsed */}
        <div className="doc-main flex min-w-0 flex-1 flex-col">
          {/* container — centered with max-width */}
          <div
            className={`w-full mx-auto pt-6 pb-16 md:pt-8 transition-all duration-300 ${
              collapsed
                ? "max-w-5xl px-8 min-[997px]:pl-16 min-[1200px]:px-8"
                : "max-w-6xl px-8"
            }`}
          >
            {/* row */}
            <div
              className={`flex w-full min-w-0 ${hasToc ? "min-[997px]:flex-row" : ""}`}
            >
              {/* col docItemCol — 75% when TOC is active & open, full width when collapsed */}
              <main
                className={`min-w-0 transition-all duration-300 ease-in-out ${
                  hasToc && !collapsed
                    ? "w-full min-[997px]:w-[75%] min-[997px]:max-w-[75%] min-[997px]:shrink-0"
                    : "w-full flex-1"
                }`}
                onClick={() => open && setOpen(false)}
              >
                {children}
              </main>
              {hasToc && <TocDesktop headings={toc} collapsed={collapsed} />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
