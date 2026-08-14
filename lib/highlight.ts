// Build-time syntax highlighting (Shiki) for `code` / `codeout` blocks.
// Runs on the server only — Article.tsx is an async Server Component, so no
// highlighter JS ever reaches the client bundle.
import { createHighlighter, type Highlighter } from "shiki";

const THEME = "github-dark-default";

// Every `lang` value actually used across lib/courses, kept in sync manually —
// grep for `lang: "` if a new language shows up in content.
const BUNDLED_LANGS = ["python", "bash", "json", "sql", "yaml"] as const;

const LANG_ALIASES: Record<string, string> = {
  sh: "bash",
  shell: "bash",
};

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: [...BUNDLED_LANGS],
    });
  }
  return highlighterPromise;
}

/** Highlight `code` and return the full `<pre class="shiki">...</pre>` markup. */
export async function highlightCode(code: string, lang?: string): Promise<string> {
  const highlighter = await getHighlighter();
  const resolved = lang ? (LANG_ALIASES[lang] ?? lang) : "text";
  const finalLang = highlighter.getLoadedLanguages().includes(resolved)
    ? resolved
    : "text";
  // A trailing newline in the source string would render as one extra empty
  // line at the bottom — harmless for the tokens themselves, but it throws
  // off the CSS line-number gutter by one, so strip a single trailing "\n".
  const trimmed = code.replace(/\n$/, "");
  return highlighter.codeToHtml(trimmed, { lang: finalLang, theme: THEME });
}
