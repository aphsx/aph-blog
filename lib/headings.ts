import type { Locale } from "./locale";
import type { Block, Heading } from "./types";

const TOC_LABEL: Record<
  Locale,
  { example: string; constraints: string; solution: string }
> = {
  th: { example: "ตัวอย่าง", constraints: "ข้อจำกัด", solution: "เฉลย" },
  en: { example: "Examples", constraints: "Constraints", solution: "Solution" },
};

/**
 * Extract TOC entries from a page's blocks.
 *
 * Walks nested `solution` / `details` / `hints` so problem pages (headings
 * live inside the answer fold) still get the right-hand "On this page" menu.
 * `example` / `constraints` / fold summaries become section entries too.
 *
 * Ids match the anchors Article.tsx renders: top-level `h-${i}`, nested
 * `h-${parent}-${child}` (and `h-${parent}-${hint}-${child}` inside hints).
 */
export function extractHeadings(
  blocks: Block[],
  locale: Locale = "th",
): Heading[] {
  return walk(blocks, "h", false, TOC_LABEL[locale]);
}

function walk(
  blocks: Block[],
  prefix: string,
  nested: boolean,
  label: (typeof TOC_LABEL)[Locale],
): Heading[] {
  const headings: Heading[] = [];
  const sectionLevel: 2 | 3 = nested ? 3 : 2;

  blocks.forEach((b, i) => {
    const id = `${prefix}-${i}`;

    if (b.t === "h2") {
      headings.push({ id, text: b.c, level: nested ? 3 : 2 });
      return;
    }
    if (b.t === "h3") {
      headings.push({ id, text: b.c, level: 3 });
      return;
    }
    if (b.t === "example") {
      headings.push({ id, text: label.example, level: sectionLevel });
      return;
    }
    if (b.t === "constraints") {
      headings.push({ id, text: label.constraints, level: sectionLevel });
      return;
    }
    if (b.t === "solution") {
      headings.push({
        id,
        text: b.summary ?? label.solution,
        level: sectionLevel,
      });
      headings.push(...walk(b.c, id, true, label));
      return;
    }
    if (b.t === "details") {
      headings.push({ id, text: b.summary, level: sectionLevel });
      headings.push(...walk(b.c, id, true, label));
      return;
    }
    if (b.t === "hints") {
      b.c.forEach((h, j) => {
        const hid = `${id}-${j}`;
        headings.push({ id: hid, text: h.title, level: sectionLevel });
        headings.push(...walk(h.c, hid, true, label));
      });
    }
  });

  return headings;
}
