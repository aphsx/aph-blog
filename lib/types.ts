// Type definitions for the Aph's Blog content model (courses → pages → blocks).
// Pure types only — no data, no logic.

/**
 * A single renderable content block.
 * Rendering for each variant lives in components/Article.tsx.
 */
export type Block =
  | { t: "p"; c: string }
  | { t: "h2"; c: string }
  | { t: "h3"; c: string }
  | { t: "ul"; c: string[] }
  | { t: "ol"; c: string[]; start?: number }
  | { t: "code"; c: string; lang?: string; label?: string }
  | { t: "callout"; title?: string; c: string; warn?: boolean }
  | { t: "table"; head: string[]; rows: string[][] }
  | {
      t: "links";
      c: { title: string; slug?: string; href?: string; desc?: string }[];
    }
  | { t: "linklist"; c: { title: string; slug: string }[]; ordered?: boolean }
  | { t: "details"; summary: string; c: Block[] }
  | { t: "image"; src: string; alt?: string; caption?: string }
  /** Interactive step-through visualizer (client component). */
  | { t: "viz"; id: "reverse-linked-list" }
  /**
   * LeetCode-style worked examples: Input / Output / Explanation.
   * Rendered as numbered example cards with monospace input/output.
   */
  | {
      t: "example";
      c: { input: string; output: string; explain?: string }[];
    }
  /** Constraints / ข้อจำกัด box (monospace bullets). */
  | { t: "constraints"; c: string[] }
  /**
   * Progressive hint ladder. Each rung is collapsed by default so the reader
   * can peel one layer at a time instead of jumping straight to the answer.
   */
  | { t: "hints"; c: { title: string; c: Block[] }[] }
  /** A code block paired with the output it prints (separate panel). */
  | { t: "codeout"; code: string; out: string; lang?: string; label?: string }
  /**
   * Collapsed answer fold. Closed by default — teaching stays outside;
   * inside is usually: one-line idea → codeout → short “จุดที่ต้องเห็น” → Time/Space.
   */
  | { t: "solution"; summary?: string; c: Block[] };

/**
 * Per-locale map. Always write `th` first, then `en`.
 * Empty English (`""` / `[]`) means “not translated yet” → UI falls back to Thai.
 */
export type Localized<T> = {
  th: T;
  en: T;
};

/**
 * A documentation page.
 * `title` / `lead` / `blocks` are always `{ th, en }` maps.
 */
export type Page = {
  slug: string;
  title: Localized<string>;
  lead: Localized<string>;
  group?: string;
  blocks: Localized<Block[]>;
};

/** A heading extracted from a page's blocks, used to build the table of contents. */
export type Heading = { id: string; text: string; level: 2 | 3 };

/** A single sidebar/navbar link. */
export type NavLink = { slug: string; title: string };

/** A sidebar category, optionally with nested subcategories. */
export type NavCategory = {
  label: string;
  items: NavLink[];
  /** หมวดย่อย (เช่น Algorithms > Basics) */
  subcategories?: { label: string; items: NavLink[] }[];
};

/**
 * Descriptive metadata for a course — the unit that "Aph's Blog" hosts many of.
 * The actual pages/nav/order live on the assembled {@link Course}.
 */
export type CourseMeta = {
  /** URL segment, e.g. "se-roadmap". Lives under /course/<id>. */
  id: string;
  /** Display title — catalog card, navbar, breadcrumb. */
  title: string;
  /** Short blurb shown on the catalog card. */
  description: string;
  /** Emoji or initials shown as the card glyph, e.g. "💼" / "SE". */
  badge: string;
  /** Which page is the course landing (rendered at /course/<id>). */
  overviewSlug: string;
};

/** A course = its metadata + the pages, sidebar nav, and reading order it owns. */
export type Course = CourseMeta & {
  nav: NavCategory[];
  pages: Record<string, Page>;
  /** Flat reading order of slugs within the course, for prev/next pagination. */
  order: string[];
};
