import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { Block } from "@/lib/content";
import { pagePath } from "@/lib/paths";
import { highlightCode } from "@/lib/highlight";
import VizBlock from "@/components/viz/catalog";
import CopyButton from "@/components/CopyButton";

/* parse **bold** only (backticks already stripped/handled by renderInline) */
function renderBold(text: string): ReactNode {
  const parts = text.split("**");
  if (parts.length === 1) return text;
  return parts.map((part, k) =>
    k % 2 === 1 ? <strong key={k}>{part}</strong> : <Fragment key={k}>{part}</Fragment>
  );
}

/* parse `inline code` → <code>, then **bold** inside the non-code segments */
function renderInline(text: string): ReactNode {
  const segs = text.split("`");
  // even segment count = unbalanced backtick → keep it literal, bold only
  if (segs.length % 2 === 0) return renderBold(text);
  return segs.map((seg, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="rounded bg-code px-[0.3em] py-[0.12em] font-mono text-[0.85em]"
      >
        {seg}
      </code>
    ) : (
      <Fragment key={i}>{renderBold(seg)}</Fragment>
    )
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

/**
 * Header strip for a highlighted code panel. Dark editor look — matches the
 * interactive viz players (see components/viz/VizFrame.tsx) so every code
 * surface on the page reads as one family. Left: accent dot + snippet label.
 * Right: language badge + copy button.
 */
function CodeChrome({ label, lang, code }: { label?: string; lang?: string; code: string }) {
  const showLang = lang && lang !== "text";
  return (
    <div className="flex items-center gap-2.5 bg-[#121620] px-4 py-2">
      <span className="h-2 w-2 shrink-0 rounded-[3px] bg-[#6565d5]" />
      {label ? (
        <span className="truncate text-[0.8em] font-semibold text-[#dcdce6]">
          {label}
        </span>
      ) : (
        <span className="text-[0.8em] font-medium text-[#8a90a0]">code</span>
      )}
      <div className="ml-auto flex shrink-0 items-center gap-2">
        {showLang && (
          <span className="rounded border border-[#3a4050] bg-[#1a1e2a] px-2 py-0.5 font-mono text-[0.7em] font-bold uppercase tracking-wide text-[#8a90a0]">
            {lang}
          </span>
        )}
        <CopyButton code={code} />
      </div>
    </div>
  );
}

/** A Shiki-highlighted panel: chrome header + the highlighted `<pre>` below it. */
async function CodePanel({
  code,
  lang,
  label,
  roundBottom = true,
}: {
  code: string;
  lang?: string;
  label?: string;
  roundBottom?: boolean;
}) {
  const html = await highlightCode(code, lang);
  // Line numbers only make sense for real source (python/bash/...) — an
  // ASCII diagram authored as `t: "code"` with no `lang` isn't a numbered
  // sequence of statements, so it stays gutter-free.
  const numbered = Boolean(lang && lang !== "text");
  return (
    <div
      className={`overflow-hidden border border-[#2a3040] bg-[#0c0e16] ${
        roundBottom ? "rounded-lg shadow-sm" : "rounded-t-lg"
      }`}
    >
      <CodeChrome label={label} lang={lang} code={code} />
      <div
        className={`border-t border-[#2a3040] ${numbered ? "shiki-numbered" : ""}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

async function renderBlock(
  b: Block,
  i: number,
  prefix = "h",
): Promise<ReactNode> {
  const id = `${prefix}-${i}`;
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
          <CodePanel code={b.c} lang={b.lang} label={b.label} />
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
          <div className="mb-1 font-bold">Constraints (ข้อจำกัด)</div>
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
                      h.c.map((bb, k) => renderBlock(bb, k, hid)),
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
        <div key={id} className="my-5">
          <CodePanel code={b.code} lang={b.lang} label={b.label} roundBottom={false} />
          <div className="rounded-b-lg border border-t-0 border-[#2a3040] bg-[#121620] px-4 py-3">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded border border-[#3a8868] bg-[#142820] px-2 py-0.5 font-mono text-[0.7em] font-bold uppercase tracking-wider text-[#8cffb8]">
                ▶ Output
              </span>
              <span className="h-px flex-1 bg-[#2a3040]" />
            </div>
            <pre className="m-0 overflow-x-auto whitespace-pre-wrap font-mono text-[0.85em] leading-relaxed text-[#dcdce6]">
              <code>{b.out}</code>
            </pre>
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
                {b.summary ?? "เฉลยเต็ม · ซ่อนไว้ให้ลองเองก่อน"}
              </span>
              <span className="mt-0.5 block text-[0.8em] text-muted group-open/sol:hidden">
                พับไว้ด้านใน — คลิกเมื่อพร้อมดู
              </span>
              <span className="mt-0.5 hidden text-[0.8em] text-muted group-open/sol:block">
                เปิดแล้ว · คลิกอีกครั้งเพื่อพับกลับ
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
            {await Promise.all(b.c.map((bb, j) => renderBlock(bb, j, id)))}
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
            {await Promise.all(b.c.map((bb, j) => renderBlock(bb, j, id)))}
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

export default async function Article({ blocks }: { blocks: Block[] }) {
  const rendered = await Promise.all(blocks.map((b, i) => renderBlock(b, i)));
  return <div className={prose}>{rendered}</div>;
}
