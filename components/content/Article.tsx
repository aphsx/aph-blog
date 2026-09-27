import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { Block } from "@/lib/content";
import { pagePath } from "@/lib/paths";
import { highlightCode } from "@/lib/highlight";
import { UI, type Locale } from "@/lib/locale";
import VizBlock from "@/components/viz/catalog";
import CopyButton from "./CopyButton";

/* parse **bold** and *italic* (backticks already handled by renderInline) */
function renderFormatted(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+?\*\*|\*[^*]+?\*)/g);
  if (parts.length === 1) return text;
  return parts.map((part, k) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={k}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={k}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={k}>{part}</Fragment>;
  });
}

/* parse `inline code` → <code>, then **bold** / *italic* inside the non-code segments */
function renderInline(text: string): ReactNode {
  const segs = text.split("`");
  // even segment count = unbalanced backtick → keep it literal, format only
  if (segs.length % 2 === 0) return renderFormatted(text);
  return segs.map((seg, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="rounded bg-code px-[0.3em] py-[0.12em] font-mono text-[0.85em]"
      >
        {seg}
      </code>
    ) : (
      <Fragment key={i}>{renderFormatted(seg)}</Fragment>
    ),
  );
}

function renderText(text: string) {
  const lines = text.split("\n");
  if (lines.length === 1) return renderInline(text);
  return lines.map((line, k) => (
    <Fragment key={k}>
      {k > 0 && <br />}
      {renderInline(line)}
    </Fragment>
  ));
}

/* TIH: theme-doc-markdown 18px desktop, h2 mt-2em mb-0.5em */
const prose =
  "text-base leading-[1.75] text-[#1c1e21] min-[768px]:text-[18px] [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4 [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:my-[0.35em] [&_strong]:font-bold [&_blockquote]:my-4 [&_blockquote]:border-l-[0.5rem] [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted";

function parseFileLabel(label?: string, lang?: string) {
  if (!label) {
    const defaultFiles: Record<string, string> = {
      go: "main.go",
      sql: "query.sql",
      bash: "script.sh",
      sh: "script.sh",
      diff: "changes.diff",
      python: "main.py",
      json: "config.json",
      yaml: "config.yaml",
    };
    return {
      fileName: defaultFiles[lang || ""] || "code",
      breadcrumbs: [] as string[],
      note: "",
    };
  }

  // Example: "simplebank/db/tx_transfer.go (Version 2 สมบูรณ์พร้อมรัน 100%)"
  const m = label.match(/^([^\s(]+)(?:\s*\((.*)\))?$/);
  if (m && (m[1].includes("/") || m[1].includes("."))) {
    const fullPath = m[1];
    const note = m[2] || "";
    const parts = fullPath.split("/").filter(Boolean);
    const fileName = parts[parts.length - 1] || fullPath;
    return {
      fileName,
      breadcrumbs: parts,
      note,
    };
  }

  // Description with parens, e.g. "ทดสอบยิง curl (เปรียบเทียบ 200 vs 404)"
  const noteMatch = label.match(/\((.*)\)$/);
  const note = noteMatch ? noteMatch[1] : "";
  const cleanLabel = label.replace(/\s*\(.*\)$/, "").trim();

  return {
    fileName: cleanLabel,
    breadcrumbs: [] as string[],
    note,
  };
}

function FileIcon({ lang, fileName }: { lang?: string; fileName?: string }) {
  const l = (lang || "").toLowerCase();
  const f = (fileName || "").toLowerCase();

  // Diff
  if (l === "diff" || f.endsWith(".diff") || f.endsWith(".patch")) {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 text-[#a371f7]" viewBox="0 0 16 16" fill="currentColor">
        <path fillRule="evenodd" d="M8.75 1.5a.75.75 0 0 0-1.5 0v5h-5a.75.75 0 0 0 0 1.5h5v5a.75.75 0 0 0 1.5 0v-5h5a.75.75 0 0 0 0-1.5h-5v-5z" />
      </svg>
    );
  }

  // Go
  if (l === "go" || l === "golang" || f.endsWith(".go")) {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 text-[#00add8]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.983 12.336c0-.528.093-1.036.279-1.523.186-.487.447-.912.784-1.275.337-.363.743-.652 1.218-.867.476-.215 1.01-.322 1.603-.322.616 0 1.168.107 1.656.322.488.215.897.504 1.227.867.33.363.582.788.756 1.275.174.487.261.995.261 1.523 0 .54-.087 1.054-.261 1.542-.174.488-.426.911-.756 1.269-.33.358-.739.641-1.227.849-.488.208-1.04.312-1.656.312-.593 0-1.127-.104-1.603-.312a3.486 3.486 0 0 1-1.218-.849c-.337-.358-.598-.781-.784-1.269a4.28 4.28 0 0 1-.279-1.542zM13.62 10.228h4.524v1.895h-2.312v4.862H13.62v-6.757zm6.757 0h2.212v6.757h-2.212v-6.757z"/>
      </svg>
    );
  }

  // SQL
  if (l === "sql" || f.endsWith(".sql")) {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 text-[#336791]" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1c3.866 0 7 1.343 7 3s-3.134 3-7 3-7-1.343-7-3 3.134-3 7-3zm0 5c2.97 0 5.617-.803 6.643-2C13.617 2.803 10.97 2 8 2s-5.617.803-6.643 2C2.383 5.197 5.03 6 8 6zm7 2c-.172.934-1.517 1.838-3.535 2.378A6.994 6.994 0 0 1 8 11a6.994 6.994 0 0 1-3.465-.622C2.517 9.838 1.172 8.934 1 8V5.874c.732.68 1.884 1.23 3.238 1.594A8.986 8.986 0 0 0 8 8c1.328 0 2.585-.187 3.762-.532 1.354-.364 2.506-.914 3.238-1.594V8zm0 4c-.172.934-1.517 1.838-3.535 2.378A6.994 6.994 0 0 1 8 15a6.994 6.994 0 0 1-3.465-.622C2.517 13.838 1.172 12.934 1 12V9.874c.732.68 1.884 1.23 3.238 1.594A8.986 8.986 0 0 0 8 12c1.328 0 2.585-.187 3.762-.532 1.354-.364 2.506-.914 3.238-1.594V12z"/>
      </svg>
    );
  }

  // Bash / Shell
  if (l === "bash" || l === "sh" || l === "shell" || f.endsWith(".sh") || f === "makefile") {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 text-[#4eaa25]" viewBox="0 0 16 16" fill="currentColor">
        <path fillRule="evenodd" d="M1.5 2.5a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-11zm1.5.5v10h10V3H3zm2.146 2.146a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L7.293 8 5.146 5.854a.5.5 0 0 1 0-.708zM9 9.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
      </svg>
    );
  }

  // Python
  if (l === "python" || l === "py" || f.endsWith(".py")) {
    return (
      <svg className="h-3.5 w-3.5 shrink-0 text-[#3776ab]" viewBox="0 0 16 16" fill="currentColor">
        <path d="M7.92 1.5c-3.1 0-2.92 1.34-2.92 1.34l.01 1.39h2.97v.42H3.85S2 4.44 2 7.55s1.61 3.03 1.61 3.03h.96V9.22s-.05-1.61 1.59-1.61h2.73s1.54-.02 1.54-1.5V3.03S10.64 1.5 7.92 1.5zm-1.07.82a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1zm1.23 12.18c3.1 0 2.92-1.34 2.92-1.34l-.01-1.39H8.02v-.42h4.13s1.85.21 1.85-2.9-1.61-3.03-1.61-3.03h-.96v1.36s.05 1.61-1.59 1.61H7.11s-1.54.02-1.54 1.5v3.08s-.21 1.53 2.51 1.53zm1.07-.82a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z"/>
      </svg>
    );
  }

  // Default File / Code
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-[#858585]" viewBox="0 0 16 16" fill="currentColor">
      <path fillRule="evenodd" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
    </svg>
  );
}

/**
 * VS Code-style Header: macOS traffic light window controls + Editor Tab + Breadcrumb path
 */
function CodeChrome({
  label,
  lang,
  code,
  locale = "th",
}: {
  label?: string;
  lang?: string;
  code: string;
  locale?: Locale;
}) {
  const parsed = parseFileLabel(label, lang);
  const showLang = lang && lang !== "text";
  const isDiff = lang === "diff" || parsed.note.toLowerCase().includes("diff");

  return (
    <div className="border-b border-[#2d2d2d] bg-[#252526]">
      {/* Top Tab Bar (VS Code window header) */}
      <div className="flex h-9 items-center overflow-x-auto no-scrollbar">
        {/* macOS window controls */}
        <div className="flex items-center gap-1.5 px-3 shrink-0">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/40 shadow-xs" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/40 shadow-xs" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29]/40 shadow-xs" />
        </div>

        {/* Active VS Code Tab */}
        <div className="flex h-full items-center gap-2 border-t-2 border-t-[#0078d4] bg-[#1e1e1e] border-r border-[#2d2d2d] px-3.5 text-[0.8em] shrink-0">
          <FileIcon lang={lang} fileName={parsed.fileName} />
          <span className="font-mono text-[#d4d4d4] font-medium tracking-tight">
            {parsed.fileName}
          </span>
          {isDiff && (
            <span className="rounded bg-[#a371f7]/20 px-1 py-0.2 text-[0.7em] font-bold text-[#d2a8ff]">
              M
            </span>
          )}
          <span className="ml-1 text-[1.1em] text-[#858585] leading-none select-none hover:text-[#d4d4d4]">
            ×
          </span>
        </div>

        {/* Extra Note badge if any */}
        {parsed.note && (
          <div className="hidden sm:flex items-center px-3 truncate">
            <span
              className={`truncate rounded px-2 py-0.5 text-[0.72em] font-medium ${
                isDiff
                  ? "border border-[#8957e5]/40 bg-[#8957e5]/10 text-[#d2a8ff]"
                  : "border border-[#3c3c3c] bg-[#1e1e1e] text-[#a0a0a0]"
              }`}
            >
              {parsed.note}
            </span>
          </div>
        )}

        {/* Right side tools */}
        <div className="ml-auto flex shrink-0 items-center gap-2 px-3">
          {showLang && (
            <span className="rounded border border-[#3c3c3c] bg-[#1e1e1e] px-2 py-0.5 font-mono text-[0.68em] font-bold uppercase tracking-wider text-[#858585]">
              {lang}
            </span>
          )}
          <CopyButton code={code} locale={locale} />
        </div>
      </div>

      {/* VS Code Breadcrumb Bar (if path has multiple parts) */}
      {parsed.breadcrumbs.length > 1 && (
        <div className="flex items-center gap-1.5 border-t border-[#2d2d2d] bg-[#1e1e1e] px-3.5 py-1 text-[0.72em] text-[#858585]">
          {parsed.breadcrumbs.map((crumb, idx) => (
            <Fragment key={idx}>
              {idx > 0 && <span className="text-[#555555]">›</span>}
              <span
                className={
                  idx === parsed.breadcrumbs.length - 1
                    ? "text-[#cccccc] font-medium"
                    : "hover:text-[#d4d4d4]"
                }
              >
                {crumb}
              </span>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

/** A Shiki-highlighted panel with VS Code styling */
async function CodePanel({
  code,
  lang,
  label,
  roundBottom = true,
  locale = "th",
}: {
  code: string;
  lang?: string;
  label?: string;
  roundBottom?: boolean;
  locale?: Locale;
}) {
  const html = await highlightCode(code, lang, label);
  const isDiff = lang === "diff" || lang?.startsWith("diff-") || /^[+\-@]/m.test(code);
  const numbered = Boolean(lang && lang !== "text" && !isDiff);
  return (
    <div
      className={`overflow-hidden border border-[#2d2d2d] bg-[#1e1e1e] shadow-lg shadow-black/30 ${
        roundBottom ? "rounded-lg" : "rounded-t-lg"
      }`}
    >
      <CodeChrome label={label} lang={lang} code={code} locale={locale} />
      <div
        className={numbered ? "shiki-numbered" : ""}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

async function renderBlock(
  b: Block,
  i: number,
  prefix = "h",
  locale: Locale = "th",
): Promise<ReactNode> {
  const id = `${prefix}-${i}`;
  const ui = UI[locale];
  switch (b.t) {
    case "p":
      return <p key={id}>{renderText(b.c)}</p>;
    case "h2":
      return (
        <h2
          key={id}
          id={id}
          className="mb-2 mt-8 scroll-mt-28 text-[1.375em] font-bold tracking-tight min-[768px]:mt-[2em] min-[768px]:text-[1.5em]"
        >
          {b.c}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={id}
          id={id}
          className="mb-2 mt-[1.8em] scroll-mt-28 text-[1.25em] font-semibold"
        >
          {b.c}
        </h3>
      );
    case "ul":
      return (
        <ul key={id}>
          {b.c.map((x, j) => (
            <li key={j}>{renderText(x)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={id} start={b.start}>
          {b.c.map((x, j) => (
            <li key={j}>{renderText(x)}</li>
          ))}
        </ol>
      );
    case "code":
      return (
        <div key={id} className="my-5">
          <CodePanel code={b.c} lang={b.lang} label={b.label} locale={locale} />
        </div>
      );
    case "callout":
      return (
        <div
          key={id}
          className={`my-5 rounded-md border border-[#444950] p-[14px_18px] text-base ${
            b.warn
              ? "border-l-4 border-l-[#d9822b] bg-[#fff8f0]"
              : "border-l-4 border-l-primary bg-primary-soft/60"
          }`}
        >
          {b.title && <div className="mb-1 font-bold">{b.title}</div>}
          <p className="m-0">{b.c}</p>
        </div>
      );
    case "example":
      return (
        <div key={id} id={id} className="my-5 grid scroll-mt-28 gap-3">
          {b.c.map((ex, j) => (
            <div
              key={j}
              className="rounded-md border border-border bg-surface-soft/40 px-4 py-3"
            >
              <div className="mb-2 text-[0.8em] font-bold uppercase tracking-wide text-muted">
                Example {j + 1}
              </div>
              <dl className="m-0 grid gap-1.5">
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-bold">Input:</dt>
                  <dd className="m-0 font-mono text-[0.9em]">{ex.input}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-bold">Output:</dt>
                  <dd className="m-0 font-mono text-[0.9em]">{ex.output}</dd>
                </div>
                {ex.explain && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-bold">Explanation:</dt>
                    <dd className="m-0">{renderText(ex.explain)}</dd>
                  </div>
                )}
              </dl>
            </div>
          ))}
        </div>
      );
    case "constraints":
      return (
        <div
          key={id}
          id={id}
          className="my-5 scroll-mt-28 rounded-md border border-border border-l-4 border-l-[#8a8f98] bg-surface-soft/30 px-4 py-3"
        >
          <div className="mb-1 font-bold">{ui.constraintsTitle}</div>
          <ul className="m-0 list-disc pl-5 font-mono text-[0.85em] [&_li]:my-1">
            {b.c.map((x, j) => (
              <li key={j}>{x}</li>
            ))}
          </ul>
        </div>
      );
    case "hints":
      return (
        <div key={id} className="my-5 grid gap-2">
          {await Promise.all(
            b.c.map(async (h, j) => {
              const hid = `${id}-${j}`;
              return (
                <details
                  key={hid}
                  id={hid}
                  className="scroll-mt-28 rounded-md border border-dashed border-primary/60 bg-primary-soft/25 px-4 py-3 [&_p]:my-2 [&_pre]:my-3"
                >
                  <summary className="cursor-pointer font-semibold text-primary marker:text-primary">
                    {h.title}
                  </summary>
                  <div className="mt-3">
                    {await Promise.all(
                      h.c.map((bb, k) => renderBlock(bb, k, hid, locale)),
                    )}
                  </div>
                </details>
              );
            }),
          )}
        </div>
      );
    case "codeout":
      return (
        <div key={id} className="my-5 shadow-lg shadow-black/30">
          <CodePanel code={b.code} lang={b.lang} label={b.label} roundBottom={false} locale={locale} />
          {/* VS Code Integrated Terminal Panel */}
          <div className="overflow-hidden rounded-b-lg border border-t-0 border-[#2d2d2d] bg-[#181818]">
            <div className="flex h-7 items-center justify-between border-b border-[#2d2d2d] bg-[#1e1e1e] px-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 border-b-2 border-b-[#0078d4] pb-0.5 font-mono text-[0.7em] font-semibold tracking-wider text-[#d4d4d4]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3fb950]" />
                  TERMINAL
                </span>
              </div>
              <span className="font-mono text-[0.68em] text-[#858585]">bash</span>
            </div>
            <div className="p-3.5">
              <pre className="m-0 overflow-x-auto whitespace-pre-wrap font-mono text-[0.85em] leading-relaxed text-[#cccccc]">
                <code>{b.out}</code>
              </pre>
            </div>
          </div>
        </div>
      );
    case "solution":
      return (
        <details
          key={id}
          id={id}
          className="group/sol my-8 scroll-mt-28 overflow-hidden rounded-lg border border-border bg-surface-soft/40 open:bg-white [&_p]:my-2 [&_pre]:my-3 [&_h3]:mt-5 [&_h3]:mb-2"
        >
          <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3.5 select-none [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden
              className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-white text-[0.95em] transition-colors group-open/sol:border-primary/50 group-open/sol:bg-primary-soft/50"
            >
              <span className="group-open/sol:hidden">🔒</span>
              <span className="hidden group-open/sol:inline">🔓</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold text-[#1c1e21]">
                {b.summary ?? ui.solutionDefaultSummary}
              </span>
              <span className="mt-0.5 block text-[0.8em] text-muted group-open/sol:hidden">
                {ui.solutionFoldedHint}
              </span>
              <span className="mt-0.5 hidden text-[0.8em] text-muted group-open/sol:block">
                {ui.solutionOpenedHint}
              </span>
            </span>
            <span
              aria-hidden
              className="shrink-0 text-muted transition-transform duration-200 group-open/sol:rotate-180"
            >
              ▾
            </span>
          </summary>
          <div className="border-t border-dashed border-border px-4 pb-5 pt-2">
            {await Promise.all(b.c.map((bb, j) => renderBlock(bb, j, id, locale)))}
          </div>
        </details>
      );
    case "details":
      return (
        <details
          key={id}
          id={id}
          className="my-4 scroll-mt-28 rounded-md border border-border bg-surface-soft/40 px-4 py-3 [&_p]:my-2 [&_pre]:my-3"
        >
          <summary className="cursor-pointer font-semibold text-primary marker:text-primary">
            {b.summary}
          </summary>
          <div className="mt-3">
            {await Promise.all(b.c.map((bb, j) => renderBlock(bb, j, id, locale)))}
          </div>
        </details>
      );
    case "linklist": {
      const items = b.c.map((link, j) => (
        <li key={j}>
          <Link
            href={pagePath(link.slug)}
            className="text-primary underline-offset-2 hover:underline"
          >
            {link.title}
          </Link>
        </li>
      ));
      return b.ordered === false ? (
        <ul key={i}>{items}</ul>
      ) : (
        <ol key={i}>{items}</ol>
      );
    }
    case "links": {
      const cardClass =
        "group block rounded-lg border border-border bg-white p-4 no-underline transition-colors hover:border-primary hover:no-underline";
      const inner = (title: string, arrow: string, desc?: string) => (
        <>
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-primary">{title}</span>
            <span className="text-primary transition-transform group-hover:translate-x-0.5">
              {arrow}
            </span>
          </div>
          {desc && (
            <p className="m-0 mt-1 text-[0.9em] text-muted">{desc}</p>
          )}
        </>
      );
      return (
        <div key={i} className="my-5 grid gap-3">
          {b.c.map((link, j) =>
            link.href ? (
              <a
                key={j}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={cardClass}
              >
                {inner(link.title, "↗", link.desc)}
              </a>
            ) : (
              <Link key={j} href={pagePath(link.slug ?? "")} className={cardClass}>
                {inner(link.title, "→", link.desc)}
              </Link>
            ),
          )}
        </div>
      );
    }
    case "viz":
      return <VizBlock key={i} id={b.id} />;
    case "image":
      return (
        <figure key={i} className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={b.src}
            alt={b.alt ?? ""}
            className="mx-auto w-full max-w-2xl rounded-lg border border-border shadow-sm"
          />
          {b.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted">
              {b.caption}
            </figcaption>
          )}
        </figure>
      );
    case "table": {
      const isPlaceholder = (cell: string) => cell === "—" || cell === "-";
      return (
        <div key={i} className="my-5 overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-full border-collapse text-[0.9em]">
            <thead>
              <tr className="border-b-2 border-border bg-surface-soft">
                {b.head.map((h, j) => (
                  <th
                    key={j}
                    className="whitespace-nowrap px-3.5 py-2.5 text-left font-bold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, r) => (
                <tr
                  key={r}
                  className={`border-b border-border last:border-b-0 ${
                    r % 2 === 1 ? "bg-surface-soft/40" : ""
                  }`}
                >
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={`px-3.5 py-2.5 align-top text-left leading-relaxed ${
                        isPlaceholder(cell) ? "text-center text-muted" : ""
                      }`}
                    >
                      {renderText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    default:
      return null;
  }
}

export default async function Article({
  blocks,
  locale = "th",
}: {
  blocks: Block[];
  locale?: Locale;
}) {
  const rendered = await Promise.all(
    blocks.map((b, i) => renderBlock(b, i, "h", locale)),
  );
  return <div className={prose}>{rendered}</div>;
}
