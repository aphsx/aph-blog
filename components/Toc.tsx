"use client";

import type { Heading } from "@/lib/content";

export default function Toc({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <aside className="sticky top-[116px] hidden h-[calc(100vh-116px)] max-h-[calc(100vh-116px)] w-[200px] shrink-0 overflow-y-auto py-2 pr-4 pb-12 lg:block">
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
