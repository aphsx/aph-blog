"use client";

import { useState } from "react";

/**
 * Small copy-to-clipboard button for code panels. Client component — the
 * surrounding Article.tsx is an async Server Component, so interactivity
 * lives here only.
 */
export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard API needs a secure context — fall back to the textarea trick.
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "คัดลอกแล้ว" : "คัดลอกโค้ด"}
      title={copied ? "คัดลอกแล้ว ✓" : "คัดลอกโค้ด"}
      className={`grid h-6 w-6 shrink-0 place-items-center rounded transition-colors ${
        copied
          ? "bg-[#1a2e24] text-[#8cffb8]"
          : "text-[#8a90a0] hover:bg-[#1a1e2a] hover:text-[#dcdce6]"
      }`}
    >
      {copied ? (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}
