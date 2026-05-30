import type { Block } from "@/lib/content";

function renderBlock(b: Block, i: number) {
  switch (b.t) {
    case "p":
      return <p key={i}>{b.c}</p>;
    case "h2":
      return (
        <h2 key={i} id={`h-${i}`}>
          {b.c}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} id={`h-${i}`}>
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
        <pre key={i}>
          <code>{b.c}</code>
        </pre>
      );
    case "callout":
      return (
        <div key={i} className={`admonition${b.warn ? " admonition-caution" : " admonition-info"}`}>
          {b.title && <div className="admonition-heading">{b.title}</div>}
          <div className="admonition-content">
            <p>{b.c}</p>
          </div>
        </div>
      );
    case "table":
      return (
        <table key={i}>
          <thead>
            <tr>
              {b.head.map((h, j) => (
                <th key={j}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    default:
      return null;
  }
}

export default function Article({ blocks }: { blocks: Block[] }) {
  return <div className="markdown">{blocks.map(renderBlock)}</div>;
}
