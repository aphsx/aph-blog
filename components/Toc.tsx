"use client";

import type { Heading } from "@/lib/content";

export function TocMobile({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;
  return (
    <details className="mb-5 rounded-lg border border-border lg:hidden">
      <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-[#1c1e21]">
        On this page
      </summary>
      <ul className="m-0 list-none border-t border-border p-3 text-sm">
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
      className="sticky top-[116px] hidden h-[calc(100vh-116px)] w-[200px] shrink-0 overflow-y-auto py-2 pr-6 pb-12 lg:block"
      aria-label="On this page"
    >
      <div className="border-l border-border pl-3">
        <div className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
          On this page
        </div>
        <ul className="m-0 list-none p-0 text-xs">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block py-1 leading-snug text-subtle no-underline hover:text-primary hover:no-underline ${
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
