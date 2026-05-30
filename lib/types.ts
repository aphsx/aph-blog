// Type definitions for the SE Interview Roadmap content model.
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
  | { t: "ol"; c: string[] }
  | { t: "code"; c: string; lang?: string }
  | { t: "callout"; title?: string; c: string; warn?: boolean }
  | { t: "table"; head: string[]; rows: string[][] }
  | {
      t: "links";
      c: { title: string; slug?: string; href?: string; desc?: string }[];
    }
  | { t: "linklist"; c: { title: string; slug: string }[]; ordered?: boolean }
  | { t: "details"; summary: string; c: Block[] }
  | { t: "image"; src: string; alt?: string; caption?: string };

/**
 * A documentation page.
 * `group` is optional descriptive metadata; the actual navigation/order is
 * driven entirely by NAV in lib/nav.ts.
 */
export type Page = {
  slug: string;
  title: string;
  lead: string;
  group?: string;
  blocks: Block[];
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
