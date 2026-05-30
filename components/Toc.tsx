"use client";

import type { Heading } from "@/lib/content";

export default function Toc({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <aside className="toc">
      <div className="toc-inner">
        <div className="toc-title">On this page</div>
        <ul>
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "toc-h3" : ""}>
              <a href={`#${h.id}`}>{h.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
