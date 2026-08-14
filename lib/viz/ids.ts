/**
 * Visualizer registry IDs.
 *
 * Adding a new interactive viz (any LeetCode 75 problem):
 *   1. Append the id here.
 *   2. Put step data in `lib/viz/<id>.ts` (pure, no React).
 *   3. Put the player UI in `components/viz/<Name>.tsx` and register it
 *      in `components/viz/catalog.tsx` (TypeScript will fail until you do).
 *   4. Drop `{ t: "viz", id: "<id>" }` on the problem page (solution walkthrough)
 *      or the intro page (concept workshop — different story, same chrome).
 *
 * Article.tsx never learns about individual viz — it only renders <VizBlock>.
 */
export const VIZ_IDS = [
  "reverse-linked-list",
  "tree-bfs-right-view",
  "tree-bfs-level-sum",
  "bst-rule",
  "bst-grow",
  "bst-cases",
  "bst-height",
  "bst-search",
  "bst-delete",
  "prefix-build-query",
  "prefix-altitude",
  "prefix-pivot",
  "two-ptr-opposite",
  "two-ptr-slow-fast",
  "array-alias",
  "array-insert-shift",
  "array-concat-join",
  "array-index",
  "array-loop",
  "array-nested",
  "merge-alternately",
  "slide-fixed",
  "slide-variable",
  "hash-scan",
  "hash-slot",
  "hash-seen",
  "hash-diff",
  "hash-freq",
  "hash-close",
  "hash-pairs",
] as const;

export type VizId = (typeof VIZ_IDS)[number];
