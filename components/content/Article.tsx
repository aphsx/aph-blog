import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { Block } from "@/lib/content";
import { pagePath } from "@/lib/paths";
import { highlightCode } from "@/lib/highlight";
import { UI, type Locale } from "@/lib/locale";
import VizBlock from "@/components/viz/catalog";
import CopyButton from "./CopyButton";
import PostmanPanel from "./PostmanPanel";
import { parsePostmanBlock } from "@/lib/postman-parser";
import InteractiveQuiz from "./InteractiveQuiz";

type InlineNode =
  | string
  | { type: "code"; content: string }
  | { type: "strong"; children: InlineNode[] }
  | { type: "em"; children: InlineNode[] };

/* Tokenizes inline markdown: `code`, **bold**, *italic* with proper nesting */
function parseInlineTokens(text: string): InlineNode[] {
  if (!text.includes("`") && !text.includes("*")) {
    return [text];
  }

  const results: InlineNode[] = [];
  let i = 0;
  const len = text.length;
  let textBuf = "";

  const flushText = () => {
    if (textBuf) {
      results.push(textBuf);
      textBuf = "";
    }
  };

  while (i < len) {
    // 1. Inline code: `...`
    if (text[i] === "`") {
      const closeIdx = text.indexOf("`", i + 1);
      if (closeIdx !== -1) {
        flushText();
        results.push({ type: "code", content: text.slice(i + 1, closeIdx) });
        i = closeIdx + 1;
        continue;
      }
    }

    // 2. Bold: **...** (can contain `code`)
    if (text[i] === "*" && i + 1 < len && text[i + 1] === "*") {
      let closeIdx = -1;
      let inBacktick = false;
      for (let j = i + 2; j < len - 1; j++) {
        if (text[j] === "`") {
          inBacktick = !inBacktick;
        } else if (!inBacktick && text[j] === "*" && text[j + 1] === "*") {
          closeIdx = j;
          break;
        }
      }

      if (closeIdx !== -1 && closeIdx > i + 2) {
        flushText();
        const inner = text.slice(i + 2, closeIdx);
        results.push({ type: "strong", children: parseInlineTokens(inner) });
        i = closeIdx + 2;
        continue;
      }
    }

    // 3. Italic: *...*
    if (
      text[i] === "*" &&
      i + 1 < len &&
      text[i + 1] !== "*" &&
      text[i + 1] !== " " &&
      (i === 0 || text[i - 1] === " " || text[i - 1] === "(" || text[i - 1] === "[" || text[i - 1] === "\n")
    ) {
      let closeIdx = -1;
      let inBacktick = false;
      for (let j = i + 1; j < len; j++) {
        if (text[j] === "`") {
          inBacktick = !inBacktick;
        } else if (
          !inBacktick &&
          text[j] === "*" &&
          text[j - 1] !== " " &&
          text[j - 1] !== "*" &&
          (j + 1 >= len || text[j + 1] !== "*")
        ) {
          closeIdx = j;
          break;
        }
      }

      if (closeIdx !== -1) {
        flushText();
        const inner = text.slice(i + 1, closeIdx);
        results.push({ type: "em", children: parseInlineTokens(inner) });
        i = closeIdx + 1;
        continue;
      }
    }

    textBuf += text[i];
    i++;
  }

  flushText();
  return results;
}

function renderInlineNodes(nodes: InlineNode[], keyPrefix = "n"): ReactNode {
  if (nodes.length === 1 && typeof nodes[0] === "string") {
    return nodes[0];
  }
  return nodes.map((n, idx) => {
    const k = `${keyPrefix}-${idx}`;
    if (typeof n === "string") {
      return <Fragment key={k}>{n}</Fragment>;
    }
    if (n.type === "code") {
      return (
        <code
          key={k}
          className="rounded bg-code px-[0.3em] py-[0.12em] font-mono text-[0.85em]"
        >
          {n.content}
        </code>
      );
    }
    if (n.type === "strong") {
      return <strong key={k}>{renderInlineNodes(n.children, `${k}-s`)}</strong>;
    }
    if (n.type === "em") {
      return <em key={k}>{renderInlineNodes(n.children, `${k}-e`)}</em>;
    }
    return null;
  });
}

/* parse `inline code`, **bold**, and *italic* with arbitrary nesting */
function renderInline(text: string): ReactNode {
  return renderInlineNodes(parseInlineTokens(text));
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

import {
  SiGo,
  SiPostgresql,
  SiDocker,
  SiGnubash,
  SiPython,
  SiJson,
  SiYaml,
} from "react-icons/si";
import { VscFileCode, VscDiff } from "react-icons/vsc";

function parseFileLabel(label?: string, lang?: string) {
  const defaultFiles: Record<string, string> = {
    go: "main.go",
    sql: "query.sql",
    bash: "terminal",
    sh: "terminal",
    shell: "terminal",
    diff: "changes.diff",
    python: "main.py",
    json: "config.json",
    yaml: "docker-compose.yml",
    yml: "docker-compose.yml",
    dockerfile: "Dockerfile",
  };

  if (!label) {
    return {
      fileName: defaultFiles[lang || ""] || "code",
      breadcrumbs: [] as string[],
      note: "",
    };
  }

  // If label is a full path or file name e.g. "simplebank/db/tx_transfer.go (ส่วนเพิ่ม)"
  const fileWithNoteMatch = label.match(/^([^\s(]+)(?:\s*\((.*)\))?$/);
  if (fileWithNoteMatch && (fileWithNoteMatch[1].includes("/") || fileWithNoteMatch[1].includes("."))) {
    const fullPath = fileWithNoteMatch[1];
    const note = fileWithNoteMatch[2] || "";
    const parts = fullPath.split("/").filter(Boolean);
    const fileName = parts[parts.length - 1] || fullPath;
    return {
      fileName,
      breadcrumbs: parts,
      note,
    };
  }

  // If label has an explanatory note in parens e.g. "คำนวณพื้นที่ (Shape)"
  // Extract pure file name for tab and note for description badge
  const parenMatch = label.match(/^(.*?)\s*\((.*?)\)$/);
  if (parenMatch) {
    const mainDesc = parenMatch[1].trim();
    const subNote = parenMatch[2].trim();
    // Check if subNote looks like a code identifier or filename e.g. "Shape" -> "shape.go"
    if (/^[A-Za-z0-9_-]+$/.test(subNote) && (lang === "go" || lang === "golang")) {
      return {
        fileName: `${subNote.toLowerCase()}.go`,
        breadcrumbs: [] as string[],
        note: mainDesc,
      };
    }
    return {
      fileName: defaultFiles[lang || ""] || "code",
      breadcrumbs: [] as string[],
      note: `${mainDesc} (${subNote})`,
    };
  }

  // Pure label description e.g. "ตัวอย่างคำนวณ" -> show realistic filename in tab, label as note
  return {
    fileName: defaultFiles[lang || ""] || "code",
    breadcrumbs: [] as string[],
    note: label.trim(),
  };
}

function FileIcon({ lang, fileName }: { lang?: string; fileName?: string }) {
  const l = (lang || "").toLowerCase();
  const f = (fileName || "").toLowerCase();

  // Diff
  if (l === "diff" || f.endsWith(".diff") || f.endsWith(".patch")) {
    return <VscDiff className="h-4 w-4 shrink-0 text-[#a371f7]" />;
  }

  // Go / Golang
  if (l === "go" || l === "golang" || f.endsWith(".go")) {
    return <SiGo className="h-4 w-4 shrink-0 text-[#00add8]" />;
  }

  // Docker
  if (l === "dockerfile" || f === "dockerfile" || f.endsWith(".dockerfile") || f.includes("docker-compose")) {
    return <SiDocker className="h-4 w-4 shrink-0 text-[#2496ed]" />;
  }

  // SQL / Postgres
  if (l === "sql" || f.endsWith(".sql")) {
    return <SiPostgresql className="h-4 w-4 shrink-0 text-[#336791]" />;
  }

  // Bash / Shell
  if (l === "bash" || l === "sh" || l === "shell" || f.endsWith(".sh") || f === "terminal" || f === "makefile") {
    return <SiGnubash className="h-4 w-4 shrink-0 text-[#4eaa25]" />;
  }

  // Python
  if (l === "python" || l === "py" || f.endsWith(".py")) {
    return <SiPython className="h-4 w-4 shrink-0 text-[#3776ab]" />;
  }

  // JSON
  if (l === "json" || f.endsWith(".json")) {
    return <SiJson className="h-4 w-4 shrink-0 text-[#cbcb41]" />;
  }

  // YAML
  if (l === "yaml" || l === "yml" || f.endsWith(".yaml") || f.endsWith(".yml")) {
    return <SiYaml className="h-4 w-4 shrink-0 text-[#cb171e]" />;
  }

  // Default File / Code
  return <VscFileCode className="h-4 w-4 shrink-0 text-[#858585]" />;
}

/**
 * VS Code-style Header: macOS traffic light window controls + Editor Tab + Clean file path
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
    <div className="border-b border-[#2d2d2d] bg-[#1f1f20]">
      {/* Top Tab Bar (Clean VS Code Editor Header) */}
      <div className="flex h-9 items-center overflow-x-auto no-scrollbar">
        {/* macOS window controls */}
        <div className="flex items-center gap-1.5 px-3 shrink-0">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]/40 shadow-xs" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]/40 shadow-xs" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]/90 border border-[#1aab29]/40 shadow-xs" />
        </div>

        {/* Active Editor Tab */}
        <div className="flex h-full items-center gap-2 border-t-2 border-t-[#0078d4] bg-[#181819] border-r border-[#2d2d2d] px-3.5 text-[0.8em] shrink-0">
          <FileIcon lang={lang} fileName={parsed.fileName} />
          <span className="font-mono text-[#e0e0e0] font-medium tracking-tight">
            {parsed.fileName}
          </span>
          {isDiff && (
            <span className="rounded bg-[#a371f7]/20 px-1 py-0.2 text-[0.7em] font-bold text-[#d2a8ff]">
              M
            </span>
          )}
        </div>

        {/* Note / Context description (Clean & Subtle, non-intrusive) */}
        {parsed.note && (
          <div className="hidden md:flex items-center px-3 truncate max-w-md">
            <span className="text-[0.75em] text-[#8e8e93] truncate font-normal">
              {parsed.note}
            </span>
          </div>
        )}

        {/* Right side tools */}
        <div className="ml-auto flex shrink-0 items-center gap-2 px-3">
          {showLang && (
            <span className="rounded border border-[#333333] bg-[#181819] px-2 py-0.5 font-mono text-[0.66em] font-semibold uppercase tracking-wider text-[#999999]">
              {lang}
            </span>
          )}
          <CopyButton code={code} locale={locale} />
        </div>
      </div>

      {/* Breadcrumb Bar (only when path has multiple subdirectories) */}
      {parsed.breadcrumbs.length > 1 && (
        <div className="flex items-center gap-1.5 border-t border-[#2d2d2d] bg-[#181819] px-3.5 py-1 text-[0.72em] text-[#858585]">
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

async function renderRichContent(content: string, locale: Locale): Promise<ReactNode> {
  // Split into text segments and fenced code block segments
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\r?\n([\s\S]*?)```/g;
  const segments: Array<
    | { type: "text"; content: string }
    | { type: "code"; lang: string; content: string }
  > = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: "text",
        content: content.substring(lastIndex, match.index),
      });
    }
    segments.push({
      type: "code",
      lang: match[1] || "bash",
      content: match[2].trim(),
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    segments.push({
      type: "text",
      content: content.substring(lastIndex),
    });
  }

  const renderedSegments = await Promise.all(
    segments.map(async (seg, segIdx) => {
      if (seg.type === "code") {
        return (
          <div key={`seg-${segIdx}`} className="my-3 shadow-md shadow-black/20">
            <CodePanel
              code={seg.content}
              lang={seg.lang}
              roundBottom={true}
              locale={locale}
            />
          </div>
        );
      }

      // Parse text into paragraphs and bullet lists
      const blocks: Array<
        | { type: "p"; lines: string[] }
        | { type: "ul"; items: string[] }
      > = [];

      const lines = seg.content.split(/\r?\n/);
      let currentList: string[] | null = null;
      let currentPara: string[] = [];

      const flushPara = () => {
        if (currentPara.length > 0) {
          blocks.push({ type: "p", lines: [...currentPara] });
          currentPara = [];
        }
      };

      const flushList = () => {
        if (currentList && currentList.length > 0) {
          blocks.push({ type: "ul", items: [...currentList] });
          currentList = null;
        }
      };

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const bulletMatch = line.match(/^\s*[-*]\s+(.*)$/);

        if (bulletMatch) {
          flushPara();
          if (!currentList) currentList = [];
          currentList.push(bulletMatch[1]);
        } else if (line.trim() === "") {
          flushPara();
          flushList();
        } else {
          flushList();
          currentPara.push(line);
        }
      }

      flushPara();
      flushList();

      return (
        <div key={`seg-${segIdx}`} className="space-y-2.5">
          {blocks.map((block, bIdx) => {
            if (block.type === "ul") {
              return (
                <ul key={`ul-${bIdx}`} className="my-2 list-disc pl-5 space-y-1">
                  {block.items.map((item, itemIdx) => (
                    <li key={`li-${itemIdx}`}>{renderInline(item)}</li>
                  ))}
                </ul>
              );
            }

            const joined = block.lines.join("\n").trim();
            if (!joined) return null;
            return (
              <p key={`p-${bIdx}`} className="m-0 leading-relaxed">
                {renderText(joined)}
              </p>
            );
          })}
        </div>
      );
    })
  );

  return <>{renderedSegments}</>;
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
    case "p": {
      if (b.c.includes("```")) {
        return (
          <div key={id} className="my-4 text-base leading-relaxed">
            {await renderRichContent(b.c, locale)}
          </div>
        );
      }
      return <p key={id}>{renderText(b.c)}</p>;
    }
    case "h2":
      return (
        <h2
          key={id}
          id={id}
          className="mb-2 mt-8 scroll-mt-28 text-[1.375em] font-bold tracking-tight min-[768px]:mt-[2em] min-[768px]:text-[1.5em]"
        >
          {renderInline(b.c)}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={id}
          id={id}
          className="mb-2 mt-[1.8em] scroll-mt-28 text-[1.25em] font-semibold"
        >
          {renderInline(b.c)}
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
    case "callout": {
      const renderedContent = await renderRichContent(b.c, locale);
      return (
        <div
          key={id}
          className={`my-5 rounded-lg border p-4 text-base ${
            b.warn
              ? "border-[#f59e0b]/40 border-l-4 border-l-[#d97706] bg-[#fffbeb] text-slate-800"
              : "border-primary/30 border-l-4 border-l-primary bg-primary-soft/50 text-slate-800"
          }`}
        >
          {b.title && (
            <div className="mb-2.5 font-bold text-[1.05em] text-slate-900 flex items-center gap-1.5">
              {renderInline(b.title)}
            </div>
          )}
          <div className="space-y-2.5 text-[0.95em] leading-relaxed">
            {renderedContent}
          </div>
        </div>
      );
    }
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
    case "codeout": {
      const isHttp = b.lang === "http" || /^(POST|GET|PUT|DELETE|PATCH)\b/m.test(b.code);

      if (isHttp) {
        const rawCases = parsePostmanBlock(b.code, b.out, b.label);
        const casesWithHtml = await Promise.all(
          rawCases.map(async (c) => {
            const reqBodyHtml = c.reqBodyRaw
              ? await highlightCode(c.reqBodyRaw, "json", undefined, "github-light")
              : undefined;
            const resBodyHtml = c.resBodyRaw
              ? await highlightCode(c.resBodyRaw, "json", undefined, "github-light")
              : undefined;
            return {
              ...c,
              reqBodyHtml,
              resBodyHtml,
            };
          })
        );

        return (
          <PostmanPanel
            key={id}
            label={b.label}
            cases={casesWithHtml}
            locale={locale}
          />
        );
      }

      const isSql = b.lang === "sql" || b.code.trim().startsWith("\\d") || /^(SELECT|CREATE|INSERT|UPDATE|DELETE|ALTER|DROP)\b/i.test(b.code.trim());
      const shellName = isSql ? "psql (PostgreSQL)" : "bash";

      return (
        <div key={id} className="my-5 shadow-lg shadow-black/30">
          <CodePanel code={b.code} lang={b.lang} label={b.label} roundBottom={false} locale={locale} />
          {/* VS Code Integrated Terminal Panel */}
          <div className="overflow-hidden rounded-b-lg border border-t-0 border-[#2d2d2d] bg-[#181818]">
            <div className="flex h-7 items-center justify-between border-b border-[#2d2d2d] bg-[#1e1e1e] px-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 border-b-2 border-b-[#0078d4] pb-0.5 font-mono text-[0.7em] font-semibold tracking-wider text-[#d4d4d4]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3fb950]" />
                  {isSql ? "PSQL" : "TERMINAL"}
                </span>
              </div>
              <span className="font-mono text-[0.68em] text-[#858585]">{shellName}</span>
            </div>
            <div className="p-3.5">
              <pre className="m-0 overflow-x-auto whitespace-pre-wrap font-mono text-[0.85em] leading-relaxed text-[#cccccc]">
                <code>{b.out}</code>
              </pre>
            </div>
          </div>
        </div>
      );
    }
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
    case "quiz":
      return <InteractiveQuiz key={id} questions={b.c} />;
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
