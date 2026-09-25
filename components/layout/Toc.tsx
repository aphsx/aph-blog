"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/content";
import { UI, type Locale } from "@/lib/locale";
import { useLocale } from "@/components/providers/LocaleProvider";

export function TocMobile({
  headings,
  locale: propLocale,
}: {
  headings: Heading[];
  locale?: Locale;
}) {
  const { locale: contextLocale } = useLocale();
  const locale = propLocale ?? contextLocale;
  const ui = UI[locale];

  if (headings.length === 0) return null;
  return (
    <details className="mb-4 rounded-lg border border-border min-[997px]:hidden">
      <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-[#1c1e21]">
        {ui.onThisPage}
      </summary>
      <ul className="m-0 list-none border-t border-border p-3 text-[0.875rem]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block py-1.5 text-subtle no-underline hover:text-primary transition-colors ${
                h.level === 3 ? "pl-4" : ""
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function TocDesktop({
  headings,
  collapsed = false,
  locale: propLocale,
}: {
  headings: Heading[];
  collapsed?: boolean;
  locale?: Locale;
}) {
  const { locale: contextLocale } = useLocale();
  const locale = propLocale ?? contextLocale;
  const ui = UI[locale];
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    let frame = 0;
    const updateActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const headingEls = headings
          .map((h) => document.getElementById(h.id))
          .filter((el): el is HTMLElement => el !== null);

        if (headingEls.length === 0) return;

        const topOffset = 130;
        let current = headingEls[0].id;
        for (const el of headingEls) {
          const top = el.getBoundingClientRect().top;
          if (top <= topOffset) {
            current = el.id;
          } else {
            break;
          }
        }
        setActiveId(current);
      });
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActive);
    };
  }, [headings]);

  if (headings.length === 0) return null;
  return (
    <aside
      className={`doc-toc-top sticky hidden h-[calc(100vh-var(--doc-toc-top))] shrink-0 overflow-y-auto py-2 pl-2 pr-4 pb-12 min-[997px]:block transition-all duration-300 ease-in-out ${
        collapsed
          ? "w-0 max-w-0 opacity-0 p-0 pointer-events-none overflow-hidden"
          : "w-[25%] max-w-[25%] opacity-100"
      }`}
      aria-label={ui.onThisPage}
      aria-hidden={collapsed}
    >
      <div className="w-full min-w-[180px]">
        <div className="border-l border-border pl-3">
          <div className="mb-2 text-[0.75rem] font-bold uppercase tracking-wide text-muted">
            {ui.onThisPage}
          </div>
          <ul className="m-0 list-none p-0 text-[0.75rem]">
            {headings.map((h) => {
              const active = h.id === activeId;
              return (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    onClick={() => setActiveId(h.id)}
                    className={`block py-1 leading-[1.4] no-underline hover:text-primary hover:no-underline transition-colors ${
                      active
                        ? "font-semibold text-primary -ml-[13px] pl-[11px] border-l-2 border-primary"
                        : "text-subtle"
                    } ${h.level === 3 ? "pl-3" : ""}`}
                  >
                    {h.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
