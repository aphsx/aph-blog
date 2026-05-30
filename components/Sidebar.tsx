"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/content";

export default function Sidebar({
  open,
  onNavigate,
}: {
  open?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <nav className={`sidebar${open ? " open" : ""}`}>
      <div className="menu">
        {NAV.map((g) => (
          <div className="menu-group" key={g.group}>
            <div className="menu-category">{g.group}</div>
            <ul className="menu-list">
              {g.items.map((it) => {
                const href = `/guide/${it.slug}`;
                const active = pathname === href;
                return (
                  <li key={it.slug}>
                    <Link
                      href={href}
                      className={`menu-link${active ? " active" : ""}`}
                      onClick={onNavigate}
                    >
                      {it.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
