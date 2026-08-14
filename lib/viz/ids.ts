/**
 * Visualizer registry IDs.
 *
 * Adding a new interactive viz (any LeetCode 75 problem):
 *   1. Append the id here.
 *   2. Put step data in `lib/viz/<id>.ts` (pure, no React).
 *   3. Put the player UI in `components/viz/<Name>.tsx` and register it
 *      in `components/viz/catalog.tsx` (TypeScript will fail until you do).
 *   4. Drop `{ t: "viz", id: "<id>" }` in the *problem page*, not the intro.
 *
 * Article.tsx never learns about individual viz — it only renders <VizBlock>.
 */
export const VIZ_IDS = [
  "reverse-linked-list",
  "tree-bfs-right-view",
  "tree-bfs-level-sum",
  "bst-search",
  "bst-delete",
] as const;

export type VizId = (typeof VIZ_IDS)[number];
