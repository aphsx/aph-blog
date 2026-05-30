import type { Block, Heading } from "./types";

/**
 * Extract h2/h3 headings from a page's blocks to build the table of contents.
 * The id matches the block's index so it lines up with the anchors that
 * Article.tsx renders (`h-${i}`).
 */
export function extractHeadings(blocks: Block[]): Heading[] {
  const headings: Heading[] = [];
  blocks.forEach((b, i) => {
    if (b.t === "h2") headings.push({ id: `h-${i}`, text: b.c, level: 2 });
    if (b.t === "h3") headings.push({ id: `h-${i}`, text: b.c, level: 3 });
  });
  return headings;
}
