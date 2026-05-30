"use client";

import type { Heading } from "@/lib/content";

export function TocMobile({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;
  return (
    <details className="mb-4 rounded-lg border border-border min-[997px]:hidden">
      <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-[#1c1e21]">
        On this page
      </summary>
      <ul className="m-0 list-none border-t border-border p-3 text-[0.875rem]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block py-1.5 text-subtle no-underline hover:text-primary ${
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

export default function TocDesktop({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;
  return (
    <aside
      className="doc-toc-top sticky hidden h-[calc(100vh-var(--doc-toc-top))] w-[25%] max-w-[25%] shrink-0 overflow-y-auto py-2 pl-2 pr-4 pb-12 min-[997px]:block"
      aria-label="On this page"
    >
      <div className="border-l border-border pl-3">
        <div className="mb-2 text-[0.75rem] font-bold uppercase tracking-wide text-muted">
          On this page
        </div>
        <ul className="m-0 list-none p-0 text-[0.75rem]">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block py-1 leading-[1.4] text-subtle no-underline hover:text-primary hover:no-underline ${
                  h.level === 3 ? "pl-3" : ""
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
