"use client";

import Link from "next/link";

export default function Header({ onMenu }: { onMenu?: () => void }) {
  return (
    <header className="header">
      <button className="menu-btn" onClick={onMenu} aria-label="เมนู">
        ☰
      </button>
      <Link href="/" className="brand">
        <span className="logo">SE</span>
        <span>Interview Roadmap</span>
      </Link>
      <span className="spacer" />
      <a
        className="gh"
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </header>
  );
}
