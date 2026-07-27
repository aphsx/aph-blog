import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { Block } from "@/lib/content";
import { pagePath } from "@/lib/paths";
import { highlightCode } from "@/lib/highlight";

function renderText(text: string) {
  const lines = text.split("\n");
  if (lines.length === 1) return text;
  return lines.map((line, k) => (
    <Fragment key={k}>
      {k > 0 && <br />}
      {line}
    </Fragment>
  ));
}

/* TIH: theme-doc-markdown 18px desktop, h2 mt-2em mb-0.5em */
const prose =
  "text-base leading-[1.75] text-[#1c1e21] min-[768px]:text-[18px] [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4 [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:my-[0.35em] [&_strong]:font-bold [&_blockquote]:my-4 [&_blockquote]:border-l-[0.5rem] [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted";

/**
 * Header strip for a highlighted code panel: window dots + optional label on
 * the left, language badge on the right. Purely decorative "this is code"
 * framing — the actual syntax colors come from `highlightCode`.
 */
function CodeChrome({ label, lang }: { label?: string; lang?: string }) {
  const showLang = lang && lang !== "text";
  return (
    <div className="flex items-center gap-2.5 rounded-t-md border border-b-0 border-border bg-surface-soft px-4 py-2">
      <div className="flex shrink-0 gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
      </div>
      {label && (
        <span className="truncate text-[0.8em] font-semibold text-subtle">
          {label}
        </span>
      )}
      {showLang && (
        <span className="ml-auto shrink-0 rounded border border-border bg-white px-2 py-0.5 text-[0.7em] font-bold uppercase tracking-wide text-muted">
          {lang}
        </span>
      )}
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
  return (
    <>
      <CodeChrome label={label} lang={lang} />
      <div
        className={`overflow-hidden border border-border ${roundBottom ? "rounded-b-md" : ""}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}

async function renderBlock(b: Block, i: number): Promise<ReactNode> {
  switch (b.t) {
    case "p":
      return <p key={i}>{b.c}</p>;
    case "h2":
      return (
        <h2
          key={i}
          id={`h-${i}`}
          className="mb-2 mt-8 scroll-mt-28 text-[1.375em] font-bold tracking-tight min-[768px]:mt-[2em] min-[768px]:text-[1.5em]"
        >
          {b.c}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          id={`h-${i}`}
          className="mb-2 mt-[1.8em] scroll-mt-28 text-[1.25em] font-semibold"
        >
          {b.c}
        </h3>
      );
    case "ul":
      return (
        <ul key={i}>
          {b.c.map((x, j) => (
            <li key={j}>{renderText(x)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} start={b.start}>
          {b.c.map((x, j) => (
            <li key={j}>{renderText(x)}</li>
          ))}
        </ol>
      );
    case "code":
      return (
        <div key={i} className="my-5">
          <CodePanel code={b.c} lang={b.lang} label={b.label} />
        </div>
      );
    case "callout":
      return (
        <div
          key={i}
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
        <div key={i} className="my-5 grid gap-3">
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
          key={i}
          className="my-5 rounded-md border border-border border-l-4 border-l-[#8a8f98] bg-surface-soft/30 px-4 py-3"
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
        <div key={i} className="my-5 grid gap-2">
          {await Promise.all(
            b.c.map(async (h, j) => (
              <details
                key={j}
                className="rounded-md border border-dashed border-primary/60 bg-primary-soft/25 px-4 py-3 [&_p]:my-2 [&_pre]:my-3"
              >
                <summary className="cursor-pointer font-semibold text-primary marker:text-primary">
                  {h.title}
                </summary>
                <div className="mt-3">
                  {await Promise.all(h.c.map((bb, k) => renderBlock(bb, k)))}
                </div>
              </details>
            )),
          )}
        </div>
      );
    case "codeout":
      return (
        <div key={i} className="my-5">
          <CodePanel code={b.code} lang={b.lang} label={b.label} roundBottom={false} />
          <div className="rounded-b-md border border-t-0 border-border bg-surface-soft/50 px-4 py-3">
            <div className="mb-1 text-[0.75em] font-bold uppercase tracking-wide text-muted">
              Output
            </div>
            <pre className="m-0 overflow-x-auto whitespace-pre-wrap font-mono text-[0.85em] leading-relaxed">
              <code>{b.out}</code>
            </pre>
          </div>
        </div>
      );
    case "solution":
      return (
        <details
          key={i}
          className="my-6 rounded-md border-2 border-primary/70 bg-white px-4 py-3 [&_p]:my-2 [&_pre]:my-3"
        >
          <summary className="cursor-pointer text-[1.05em] font-bold text-primary marker:text-primary">
            {b.summary ?? "🔓 เปิดเฉลยเต็ม (ลองเองก่อนนะ)"}
          </summary>
          <div className="mt-3">
            {await Promise.all(b.c.map((bb, j) => renderBlock(bb, j)))}
          </div>
        </details>
      );
    case "details":
      return (
        <details
          key={i}
          className="my-4 rounded-md border border-border bg-surface-soft/40 px-4 py-3 [&_p]:my-2 [&_pre]:my-3"
        >
          <summary className="cursor-pointer font-semibold text-primary marker:text-primary">
            {b.summary}
          </summary>
          <div className="mt-3">
            {await Promise.all(b.c.map((bb, j) => renderBlock(bb, j)))}
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
