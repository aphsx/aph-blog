import type { Block } from "@/lib/content";

const prose =
  "text-base md:text-lg [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4 [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:my-1.5 [&_strong]:font-bold [&_blockquote]:my-4 [&_blockquote]:border-l-8 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted";

function renderBlock(b: Block, i: number) {
  switch (b.t) {
    case "p":
      return <p key={i}>{b.c}</p>;
    case "h2":
      return (
        <h2
          key={i}
          id={`h-${i}`}
          className="mb-2 mt-8 text-[1.375em] font-bold tracking-tight md:text-[1.5em]"
        >
          {b.c}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          id={`h-${i}`}
          className="mb-2 mt-7 text-[1.25em] font-semibold"
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
          className="my-5 overflow-x-auto rounded-md border border-border bg-code p-4 font-mono text-sm leading-relaxed"
        >
          <code>{b.c}</code>
        </pre>
      );
    case "callout":
      return (
        <div
          key={i}
          className={`my-5 rounded-md border border-[#444950] p-3.5 text-base md:px-[18px] md:py-3.5 ${
            b.warn
              ? "border-l-4 border-l-[#d9822b] bg-[#fff8f0]"
              : "border-l-4 border-l-primary bg-primary-soft/60"
          }`}
        >
          {b.title && <div className="mb-1 font-bold">{b.title}</div>}
          <p className="m-0">{b.c}</p>
        </div>
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
