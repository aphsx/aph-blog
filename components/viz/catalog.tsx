"use client";

import type { ComponentType } from "react";
import type { VizId } from "@/lib/viz/ids";
import ReverseLinkedListViz from "@/components/viz/ReverseLinkedListViz";
import { MaxLevelSumViz, RightSideViewViz } from "@/components/viz/TreeBfsViz";
import { DeleteBstViz, SearchBstViz } from "@/components/viz/BstViz";

/**
 * The only place that maps a viz id → component.
 * Keep this exhaustive: `Record<VizId, …>` fails the build if a new id
 * is added in `lib/viz/ids.ts` without a player here.
 */
export const vizCatalog: Record<VizId, ComponentType> = {
  "reverse-linked-list": ReverseLinkedListViz,
  "tree-bfs-right-view": RightSideViewViz,
  "tree-bfs-level-sum": MaxLevelSumViz,
  "bst-search": SearchBstViz,
  "bst-delete": DeleteBstViz,
};

export default function VizBlock({ id }: { id: VizId }) {
  const Cmp = vizCatalog[id];
  return <Cmp />;
}
