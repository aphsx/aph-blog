"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/content";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function NavLink({
  href,
  title,
  onNavigate,
}: {
  href: string;
  title: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`block rounded-sm py-[0.375rem] pl-3 pr-2 text-sm leading-snug no-underline transition-colors hover:no-underline ${
        active
          ? "font-semibold text-primary"
          : "text-[#1c1e21] hover:text-primary"
      }`}
    >
      {title}
    </Link>
  );
}

export default function Sidebar({
  open,
  onNavigate,
}: {
  open?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <aside
      className={`sticky top-[100px] h-[calc(100vh-100px)] w-[300px] shrink-0 overflow-y-auto border-r border-border bg-white pb-12 pt-2 max-[996px]:fixed max-[996px]:left-0 max-[996px]:top-[100px] max-[996px]:z-40 max-[996px]:shadow-[4px_0_24px_rgba(0,0,0,0.1)] max-[996px]:transition-transform max-[996px]:duration-200 ${
        open ? "max-[996px]:translate-x-0" : "max-[996px]:-translate-x-full"
      }`}
    >
      <nav className="px-3 text-sm" aria-label="Docs sidebar">
        {NAV.map((cat) => (
          <div key={cat.label} className="mb-0.5">
            {/* หัวหมวด — แบบ Docusaurus category (ไม่ใช่ uppercase) */}
            <div className="cursor-default px-3 py-2 text-sm font-bold text-[#1c1e21]">
              {cat.label}
            </div>
            <ul className="m-0 list-none p-0">
              {cat.items.map((item) => (
                <li key={item.slug}>
                  <NavLink
                    href={`/guide/${item.slug}`}
                    title={item.title}
                    onNavigate={onNavigate}
                  />
                </li>
              ))}
              {cat.subcategories?.map((sub) => (
                <li key={sub.label}>
                  <div className="px-3 py-1.5 pl-6 text-xs font-semibold text-muted">
                    {sub.label}
                  </div>
                  <ul className="m-0 list-none p-0">
                    {sub.items.map((item) => (
                      <li key={item.slug}>
                        <NavLink
                          href={`/guide/${item.slug}`}
                          title={item.title}
                          onNavigate={onNavigate}
                        />
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
