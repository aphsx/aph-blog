"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/content";

export default function Sidebar({ open }: { open?: boolean }) {
  const pathname = usePathname();
  return (
    <nav className={`sidebar${open ? " open" : ""}`}>
      {NAV.map((g) => (
        <div className="group" key={g.group}>
          <div className="group-title">{g.group}</div>
          {g.items.map((it) => {
            const href = `/guide/${it.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={it.slug}
                href={href}
                className={`navlink${active ? " active" : ""}`}
              >
                {it.title}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
