import Link from "next/link";
import type { Block } from "@/lib/content";
import { pagePath } from "@/lib/paths";

/* TIH: theme-doc-markdown 18px desktop, h2 mt-2em mb-0.5em */
const prose =
  "text-base leading-[1.75] text-[#1c1e21] min-[768px]:text-[18px] [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4 [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:my-[0.35em] [&_strong]:font-bold [&_blockquote]:my-4 [&_blockquote]:border-l-[0.5rem] [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted";

function renderBlock(b: Block, i: number) {
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
            <li key={j}>{x}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i}>
          {b.c.map((x, j) => (
            <li key={j}>{x}</li>
          ))}
        </ol>
      );
    case "code":
      return (
        <pre
          key={i}
          className="my-5 overflow-x-auto rounded-md border border-border bg-code p-4 font-mono text-[0.875em] leading-relaxed"
        >
          <code>{b.c}</code>
        </pre>
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
    case "details":
      return (
        <details
          key={i}
          className="my-4 rounded-md border border-border bg-surface-soft/40 px-4 py-3 [&_p]:my-2 [&_pre]:my-3"
        >
          <summary className="cursor-pointer font-semibold text-primary marker:text-primary">
            {b.summary}
          </summary>
          <div className="mt-3">{b.c.map((bb, j) => renderBlock(bb, j))}</div>
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
    case "table":
      return (
        <div key={i} className="my-5 overflow-x-auto">
          <table className="w-full border-collapse text-[0.9em]">
            <thead>
              <tr>
                {b.head.map((h, j) => (
                  <th
                    key={j}
                    className="border border-border bg-surface-soft px-3.5 py-2.5 text-left font-bold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className="border border-border px-3.5 py-2.5 text-left"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function Article({ blocks }: { blocks: Block[] }) {
  return <div className={prose}>{blocks.map(renderBlock)}</div>;
}
