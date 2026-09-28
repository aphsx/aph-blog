// Build-time syntax highlighting (Shiki) for `code` / `codeout` blocks.
// Runs on the server only — Article.tsx is an async Server Component, so no
// highlighter JS ever reaches the client bundle.
import { createHighlighter, type Highlighter } from "shiki";

const THEMES = ["dark-plus", "github-light"] as const;
const DEFAULT_THEME = "dark-plus";

// Every `lang` value actually used across lib/courses, kept in sync manually —
// grep for `lang: "` if a new language shows up in content.
const BUNDLED_LANGS = ["python", "bash", "json", "sql", "yaml", "go", "diff", "http"] as const;

const LANG_ALIASES: Record<string, string> = {
  sh: "bash",
  shell: "bash",
  golang: "go",
};

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [...THEMES],
      langs: [...BUNDLED_LANGS],
    });
  }
  return highlighterPromise;
}

function resolveLanguage(lang?: string, code = "", label = ""): { syntaxLang: string; isDiff: boolean } {
  const rawLang = lang ? (LANG_ALIASES[lang] ?? lang) : "";
  const hasDiffLines = /^[+\-@]/m.test(code);
  const isDiff = rawLang === "diff" || rawLang.startsWith("diff-") || rawLang.startsWith("diff:") || hasDiffLines;

  if (rawLang === "diff" || rawLang.startsWith("diff-") || rawLang.startsWith("diff:")) {
    // If explicitly specified with suffix, e.g. diff-go, diff:go
    let detected = rawLang.startsWith("diff-") ? rawLang.slice(5) : rawLang.startsWith("diff:") ? rawLang.slice(5) : null;

    // Auto-detect syntax language from label file extension
    if (!detected && label) {
      if (/\.go(\s|\)|$)/i.test(label)) detected = "go";
      else if (/\.sql(\s|\)|$)/i.test(label)) detected = "sql";
      else if (/\.py(\s|\)|$)/i.test(label)) detected = "python";
      else if (/\.sh(\s|\)|$)/i.test(label) || /makefile/i.test(label)) detected = "bash";
      else if (/\.json(\s|\)|$)/i.test(label)) detected = "json";
      else if (/\.ya?ml(\s|\)|$)/i.test(label)) detected = "yaml";
    }

    // Auto-detect syntax language from code heuristics
    if (!detected) {
      if (/\b(package\s+\w+|func\s+\w+|import\s*\(|type\s+\w+\s+struct)/.test(code)) detected = "go";
      else if (/\b(CREATE\s+TABLE|SELECT\s+|UPDATE\s+|INSERT\s+INTO|ALTER\s+TABLE)\b/i.test(code)) detected = "sql";
      else if (/\b(def\s+\w+|import\s+\w+|class\s+\w+:)/.test(code)) detected = "python";
    }

    return {
      syntaxLang: detected ? (LANG_ALIASES[detected] ?? detected) : "diff",
      isDiff: true,
    };
  }

  return {
    syntaxLang: rawLang || "text",
    isDiff,
  };
}

/** Highlight `code` with full syntax highlighting + diff highlighting support */
export async function highlightCode(
  code: string,
  lang?: string,
  label?: string,
  theme: "dark-plus" | "github-light" = DEFAULT_THEME,
): Promise<string> {
  const highlighter = await getHighlighter();
  const { syntaxLang, isDiff } = resolveLanguage(lang, code, label);
  const loadedLangs = highlighter.getLoadedLanguages();
  const finalLang = loadedLangs.includes(syntaxLang) ? syntaxLang : "text";

  // A trailing newline in the source string would render as one extra empty
  // line at the bottom — harmless for the tokens themselves, but it throws
  // off the CSS line-number gutter by one, so strip a single trailing "\n".
  const trimmed = code.replace(/\n$/, "");
  let html = highlighter.codeToHtml(trimmed, { lang: finalLang, theme });

  if (isDiff) {
    html = html.replace(
      /<span class="line">(?:<span([^>]*)>)?([+\-@])/g,
      (match, spanAttrs, char) => {
        const cls =
          char === "-"
            ? "diff-remove"
            : char === "+"
            ? "diff-add"
            : "diff-hunk";
        const signCls =
          char === "-"
            ? "diff-sign-remove text-[#f14c4c] font-bold select-none"
            : char === "+"
            ? "diff-sign-add text-[#3fb950] font-bold select-none"
            : "diff-sign-hunk text-[#4fc1ff] select-none";
        const innerSpan = spanAttrs !== undefined ? `<span${spanAttrs}>` : "";
        return `<span class="line ${cls}">${innerSpan}<span class="${signCls}">${char}</span>`;
      },
    );
  }

  return html;
}
