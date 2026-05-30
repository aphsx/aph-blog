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
    <nav
      className={`sticky top-[100px] h-[calc(100vh-100px)] w-[300px] shrink-0 overflow-y-auto border-r border-border bg-white py-3 pb-12 max-[996px]:fixed max-[996px]:left-0 max-[996px]:top-[100px] max-[996px]:z-40 max-[996px]:shadow-[4px_0_24px_rgba(0,0,0,0.1)] max-[996px]:transition-transform max-[996px]:duration-200 ${
        open ? "max-[996px]:translate-x-0" : "max-[996px]:-translate-x-full"
      }`}
    >
      <div className="px-2 text-sm">
        {NAV.map((g) => (
          <div className="mb-1" key={g.group}>
            <div className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted">
              {g.group}
            </div>
            <ul className="m-0 list-none p-0">
              {g.items.map((it) => {
                const href = `/guide/${it.slug}`;
                const active = pathname === href;
                return (
                  <li key={it.slug}>
                    <Link
                      href={href}
                      className={`block rounded px-3 py-1.5 leading-snug no-underline hover:bg-surface-soft hover:text-[#1c1e21] hover:no-underline ${
                        active
                          ? "bg-primary-soft font-semibold text-primary-dark"
                          : "text-subtle"
                      }`}
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
