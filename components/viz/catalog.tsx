"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { VizId } from "@/lib/viz/ids";

import { useLocale } from "@/components/providers/LocaleProvider";
import { UI } from "@/lib/locale";

function VizLoadingSkeleton() {
  const { locale } = useLocale();
  const ui = UI[locale];
  return (
    <div className="my-6 flex h-48 w-full items-center justify-center rounded-xl border border-[#2a3040] bg-[#0c0e16] text-[#8a90a0]">
      <div className="flex items-center gap-2.5 text-sm">
        <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span>{ui.loadingVisualizer}</span>
      </div>
    </div>
  );
}

const load = <P extends object = Record<string, unknown>>(
  loader: () => Promise<ComponentType<P> | { default: ComponentType<P> }>,
) =>
  dynamic(loader, {
    loading: () => <VizLoadingSkeleton />,
    ssr: false,
  }) as ComponentType<P>;

/**
 * Visualizer Catalog with Dynamic Code Splitting.
 * Each interactive player is lazily imported on demand, preventing
 * the 800+ kB monolithic visualizer bundle from bloating every page load.
 */
export const vizCatalog: Record<VizId, ComponentType> = {
  // Linked List
  "reverse-linked-list": load(() => import("@/components/viz/ReverseLinkedListViz")),

  // Tree BFS
  "tree-bfs-right-view": load(() => import("@/components/viz/TreeBfsViz").then((m) => m.RightSideViewViz)),
  "tree-bfs-level-sum": load(() => import("@/components/viz/TreeBfsViz").then((m) => m.MaxLevelSumViz)),

  // BST
  "bst-rule": load(() => import("@/components/viz/BstViz").then((m) => m.RuleBstViz)),
  "bst-grow": load(() => import("@/components/viz/BstViz").then((m) => m.GrowBstViz)),
  "bst-cases": load(() => import("@/components/viz/BstViz").then((m) => m.CasesBstViz)),
  "bst-height": load(() => import("@/components/viz/BstViz").then((m) => m.HeightBstViz)),
  "bst-search": load(() => import("@/components/viz/BstViz").then((m) => m.SearchBstViz)),
  "bst-delete": load(() => import("@/components/viz/BstViz").then((m) => m.DeleteBstViz)),

  // Prefix Sum
  "prefix-build-query": load(() => import("@/components/viz/PrefixSumViz").then((m) => m.PrefixBuildViz)),
  "prefix-altitude": load(() => import("@/components/viz/PrefixSumViz").then((m) => m.AltitudeViz)),
  "prefix-pivot": load(() => import("@/components/viz/PrefixSumViz").then((m) => m.PivotIndexViz)),

  // Two Pointers
  "two-ptr-opposite": load(() => import("@/components/viz/TwoPointersViz").then((m) => m.OppositeEndsViz)),
  "two-ptr-slow-fast": load(() => import("@/components/viz/TwoPointersViz").then((m) => m.SlowFastViz)),
  "two-ptr-reverse": load(() => import("@/components/viz/TwoPointersViz").then((m) => m.ReverseEndsViz)),
  "two-ptr-two-seq": load(() => import("@/components/viz/TwoPointersViz").then((m) => m.TwoSeqViz)),

  // Array & String Basics
  "array-alias": load(() => import("@/components/viz/ArrayStringViz").then((m) => m.ArrayAliasViz)),
  "array-str-rebind": load(() => import("@/components/viz/ArrayStringViz").then((m) => m.ArrayStrRebindViz)),
  "array-insert-shift": load(() => import("@/components/viz/ArrayStringViz").then((m) => m.ArrayInsertViz)),
  "array-append": load(() => import("@/components/viz/ArrayStringViz").then((m) => m.ArrayAppendViz)),
  "array-concat": load(() => import("@/components/viz/ArrayStringViz").then((m) => m.ArrayConcatViz)),
  "array-join": load(() => import("@/components/viz/ArrayStringViz").then((m) => m.ArrayJoinViz)),
  "array-index": load(() => import("@/components/viz/ArrayStringViz").then((m) => m.ArrayIndexViz)),
  "array-loop-for": load(() => import("@/components/viz/ArrayStringViz").then((m) => m.ArrayLoopForViz)),
  "array-loop-while": load(() => import("@/components/viz/ArrayStringViz").then((m) => m.ArrayLoopWhileViz)),
  "array-loop-range": load(() => import("@/components/viz/ArrayStringViz").then((m) => m.ArrayLoopRangeViz)),
  "array-nested": load(() => import("@/components/viz/ArrayStringViz").then((m) => m.ArrayNestedViz)),
  "merge-alternately": load(() => import("@/components/viz/ArrayStringViz").then((m) => m.MergeAlternatelyViz)),

  // Array & String Problems
  "gcd-of-strings": load(() => import("@/components/viz/ArrayStringProblemsViz").then((m) => m.GcdOfStringsViz)),
  "kids-candies": load(() => import("@/components/viz/ArrayStringProblemsViz").then((m) => m.KidsCandiesViz)),
  "can-place-flowers": load(() => import("@/components/viz/ArrayStringProblemsViz").then((m) => m.CanPlaceFlowersViz)),
  "reverse-vowels": load(() => import("@/components/viz/ArrayStringProblemsViz").then((m) => m.ReverseVowelsViz)),
  "reverse-words": load(() => import("@/components/viz/ArrayStringProblemsViz").then((m) => m.ReverseWordsViz)),
  "product-except-self": load(() => import("@/components/viz/ArrayStringProblemsViz").then((m) => m.ProductExceptSelfViz)),
  "increasing-triplet": load(() => import("@/components/viz/ArrayStringProblemsViz").then((m) => m.IncreasingTripletViz)),
  "string-compression": load(() => import("@/components/viz/ArrayStringProblemsViz").then((m) => m.StringCompressionViz)),

  // Sliding Window
  "slide-fixed": load(() => import("@/components/viz/SlidingWindowViz").then((m) => m.SlideFixedViz)),
  "slide-variable": load(() => import("@/components/viz/SlidingWindowViz").then((m) => m.SlideVariableViz)),

  // Hash Map
  "hash-scan": load(() => import("@/components/viz/HashMapViz").then((m) => m.HashScanViz)),
  "hash-slot": load(() => import("@/components/viz/HashMapViz").then((m) => m.HashSlotViz)),
  "hash-seen": load(() => import("@/components/viz/HashMapViz").then((m) => m.HashSeenViz)),
  "hash-diff": load(() => import("@/components/viz/HashMapViz").then((m) => m.HashDiffViz)),
  "hash-freq": load(() => import("@/components/viz/HashMapViz").then((m) => m.HashFreqViz)),
  "hash-close": load(() => import("@/components/viz/HashMapViz").then((m) => m.HashCloseViz)),
  "hash-pairs": load(() => import("@/components/viz/HashMapViz").then((m) => m.HashPairsViz)),

  // Graph DFS
  "graph-overview": load(() => import("@/components/viz/GraphDfsViz").then((m) => m.GraphOverviewViz)),
  "graph-directed": load(() => import("@/components/viz/GraphDfsViz").then((m) => m.GraphDirectedViz)),
  "graph-two-components": load(() => import("@/components/viz/GraphDfsViz").then((m) => m.GraphTwoComponentsViz)),
  "graph-adj-build": load(() => import("@/components/viz/GraphDfsViz").then((m) => m.GraphAdjBuildViz)),
  "graph-dfs-walk": load(() => import("@/components/viz/GraphDfsViz").then((m) => m.GraphDfsWalkViz)),
  "graph-components": load(() => import("@/components/viz/GraphDfsViz").then((m) => m.GraphComponentsViz)),

  // Graph DFS Problems
  "keys-and-rooms": load(() => import("@/components/viz/GraphDfsProblemsViz").then((m) => m.KeysAndRoomsViz)),
  "number-of-provinces": load(() => import("@/components/viz/GraphDfsProblemsViz").then((m) => m.NumberOfProvincesViz)),
  "reorder-routes": load(() => import("@/components/viz/GraphDfsProblemsViz").then((m) => m.ReorderRoutesViz)),
  "evaluate-division": load(() => import("@/components/viz/GraphDfsProblemsViz").then((m) => m.EvaluateDivisionViz)),

  // Graph BFS
  "graph-bfs-walk": load(() => import("@/components/viz/GraphBfsViz").then((m) => m.GraphBfsWalkViz)),
  "graph-bfs-shape": load(() => import("@/components/viz/GraphBfsViz").then((m) => m.GraphBfsShapeViz)),
  "graph-bfs-grid-static": load(() => import("@/components/viz/GraphBfsViz").then((m) => m.GraphGridAsGraphViz)),
  "graph-bfs-grid": load(() => import("@/components/viz/GraphBfsViz").then((m) => m.GraphBfsGridViz)),
  "graph-bfs-multi": load(() => import("@/components/viz/GraphBfsViz").then((m) => m.GraphBfsMultiViz)),

  // Graph BFS Problems
  "nearest-exit": load(() => import("@/components/viz/GraphBfsProblemsViz").then((m) => m.NearestExitViz)),
  "rotting-oranges": load(() => import("@/components/viz/GraphBfsProblemsViz").then((m) => m.RottingOrangesViz)),

  // Heap
  "heap-shape": load(() => import("@/components/viz/HeapViz").then((m) => m.HeapShapeViz)),
  "heap-push-pop": load(() => import("@/components/viz/HeapViz").then((m) => m.HeapPushPopViz)),
  "kth-largest": load(() => import("@/components/viz/HeapViz").then((m) => m.KthLargestViz)),

  // DSA Mastercourse
  "dsa-compilation-pipeline": load(() => import("@/components/viz/dsa/ComplexityViz").then((m) => m.CompilationPipelineViz)),
  "dsa-asymptotic-bounds": load(() => import("@/components/viz/dsa/ComplexityViz").then((m) => m.AsymptoticBoundsViz)),
  "dsa-big-o-chart": load(() => import("@/components/viz/dsa/ComplexityViz").then((m) => m.BigOChartViz)),
  "dsa-amortized-doubling": load(() => import("@/components/viz/dsa/ComplexityViz").then((m) => m.AmortizedDoublingViz)),
  "dsa-digit-extraction": load(() => import("@/components/viz/dsa/MemoryViz").then((m) => m.DigitExtractionViz)),
  "dsa-dynamic-array-memory": load(() => import("@/components/viz/dsa/MemoryViz").then((m) => m.DynamicArrayMemoryViz)),
  "dsa-memory-alignment": load(() => import("@/components/viz/dsa/MemoryViz").then((m) => m.MemoryAlignmentViz)),
  "dsa-linked-list-types": load(() => import("@/components/viz/dsa/LinearStructuresViz").then((m) => m.LinkedListTypesViz)),
  "dsa-stack-operations": load(() => import("@/components/viz/dsa/LinearStructuresViz").then((m) => m.StackOperationsViz)),
  "dsa-circular-queue": load(() => import("@/components/viz/dsa/LinearStructuresViz").then((m) => m.CircularQueueViz)),
  "dsa-hash-function-pipeline": load(() => import("@/components/viz/dsa/HashViz").then((m) => m.HashFunctionPipelineViz)),
  "dsa-tree-anatomy": load(() => import("@/components/viz/dsa/TreeStructuresViz").then((m) => m.TreeAnatomyViz)),
  "dsa-call-stack-recursion": load(() => import("@/components/viz/dsa/RecursionViz").then((m) => m.CallStackRecursionViz)),
  "dsa-bst-property": load(() => import("@/components/viz/dsa/TreeStructuresViz").then((m) => m.BstPropertyViz)),
  "dsa-divide-conquer-tree": load(() => import("@/components/viz/dsa/RecursionViz").then((m) => m.DivideConquerTreeViz)),
  "dsa-backtrack-pruning": load(() => import("@/components/viz/dsa/RecursionViz").then((m) => m.BacktrackPruningViz)),
  "dsa-fib-overlapping": load(() => import("@/components/viz/dsa/RecursionViz").then((m) => m.FibOverlappingViz)),
};

export default function VizBlock({ id }: { id: VizId }) {
  const Cmp = vizCatalog[id];
  if (!Cmp) return null;
  return <Cmp />;
}
