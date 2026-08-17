"use client";

import type { ComponentType } from "react";
import type { VizId } from "@/lib/viz/ids";
import ReverseLinkedListViz from "@/components/viz/ReverseLinkedListViz";
import { MaxLevelSumViz, RightSideViewViz } from "@/components/viz/TreeBfsViz";
import { CasesBstViz, DeleteBstViz, GrowBstViz, HeightBstViz, RuleBstViz, SearchBstViz } from "@/components/viz/BstViz";
import { AltitudeViz, PivotIndexViz, PrefixBuildViz } from "@/components/viz/PrefixSumViz";
import { OppositeEndsViz, ReverseEndsViz, SlowFastViz, TwoSeqViz } from "@/components/viz/TwoPointersViz";
import { ArrayAliasViz, ArrayAppendViz, ArrayConcatViz, ArrayInsertViz, ArrayIndexViz, ArrayJoinViz, ArrayLoopForViz, ArrayLoopRangeViz, ArrayLoopWhileViz, ArrayNestedViz, ArrayStrRebindViz, MergeAlternatelyViz } from "@/components/viz/ArrayStringViz";
import {
  CanPlaceFlowersViz,
  GcdOfStringsViz,
  IncreasingTripletViz,
  KidsCandiesViz,
  ProductExceptSelfViz,
  ReverseVowelsViz,
  ReverseWordsViz,
  StringCompressionViz,
} from "@/components/viz/ArrayStringProblemsViz";
import { SlideFixedViz, SlideVariableViz } from "@/components/viz/SlidingWindowViz";
import {
  HashCloseViz,
  HashDiffViz,
  HashFreqViz,
  HashPairsViz,
  HashScanViz,
  HashSeenViz,
  HashSlotViz,
} from "@/components/viz/HashMapViz";
import {
  GraphAdjBuildViz,
  GraphComponentsViz,
  GraphDfsWalkViz,
  GraphDirectedViz,
  GraphOverviewViz,
  GraphTwoComponentsViz,
} from "@/components/viz/GraphDfsViz";
import {
  EvaluateDivisionViz,
  KeysAndRoomsViz,
  NumberOfProvincesViz,
  ReorderRoutesViz,
} from "@/components/viz/GraphDfsProblemsViz";
import {
  GraphBfsGridViz,
  GraphBfsMultiViz,
  GraphBfsWalkViz,
  GraphGridAsGraphViz,
} from "@/components/viz/GraphBfsViz";

/**
 * The only place that maps a viz id → component.
 * Keep this exhaustive: `Record<VizId, …>` fails the build if a new id
 * is added in `lib/viz/ids.ts` without a player here.
 */
export const vizCatalog: Record<VizId, ComponentType> = {
  "reverse-linked-list": ReverseLinkedListViz,
  "tree-bfs-right-view": RightSideViewViz,
  "tree-bfs-level-sum": MaxLevelSumViz,
  "bst-rule": RuleBstViz,
  "bst-grow": GrowBstViz,
  "bst-cases": CasesBstViz,
  "bst-height": HeightBstViz,
  "bst-search": SearchBstViz,
  "bst-delete": DeleteBstViz,
  "prefix-build-query": PrefixBuildViz,
  "prefix-altitude": AltitudeViz,
  "prefix-pivot": PivotIndexViz,
  "two-ptr-opposite": OppositeEndsViz,
  "two-ptr-slow-fast": SlowFastViz,
  "two-ptr-reverse": ReverseEndsViz,
  "two-ptr-two-seq": TwoSeqViz,
  "array-alias": ArrayAliasViz,
  "array-str-rebind": ArrayStrRebindViz,
  "array-insert-shift": ArrayInsertViz,
  "array-append": ArrayAppendViz,
  "array-concat": ArrayConcatViz,
  "array-join": ArrayJoinViz,
  "array-index": ArrayIndexViz,
  "array-loop-for": ArrayLoopForViz,
  "array-loop-while": ArrayLoopWhileViz,
  "array-loop-range": ArrayLoopRangeViz,
  "array-nested": ArrayNestedViz,
  "merge-alternately": MergeAlternatelyViz,
  "gcd-of-strings": GcdOfStringsViz,
  "kids-candies": KidsCandiesViz,
  "can-place-flowers": CanPlaceFlowersViz,
  "reverse-vowels": ReverseVowelsViz,
  "reverse-words": ReverseWordsViz,
  "product-except-self": ProductExceptSelfViz,
  "increasing-triplet": IncreasingTripletViz,
  "string-compression": StringCompressionViz,
  "slide-fixed": SlideFixedViz,
  "slide-variable": SlideVariableViz,
  "hash-scan": HashScanViz,
  "hash-slot": HashSlotViz,
  "hash-seen": HashSeenViz,
  "hash-diff": HashDiffViz,
  "hash-freq": HashFreqViz,
  "hash-close": HashCloseViz,
  "hash-pairs": HashPairsViz,
  "graph-overview": GraphOverviewViz,
  "graph-directed": GraphDirectedViz,
  "graph-two-components": GraphTwoComponentsViz,
  "graph-adj-build": GraphAdjBuildViz,
  "graph-dfs-walk": GraphDfsWalkViz,
  "graph-components": GraphComponentsViz,
  "keys-and-rooms": KeysAndRoomsViz,
  "number-of-provinces": NumberOfProvincesViz,
  "reorder-routes": ReorderRoutesViz,
  "evaluate-division": EvaluateDivisionViz,
  "graph-bfs-walk": GraphBfsWalkViz,
  "graph-bfs-grid-static": GraphGridAsGraphViz,
  "graph-bfs-grid": GraphBfsGridViz,
  "graph-bfs-multi": GraphBfsMultiViz,
};

export default function VizBlock({ id }: { id: VizId }) {
  const Cmp = vizCatalog[id];
  return <Cmp />;
}
