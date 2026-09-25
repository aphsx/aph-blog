import type { Course, Page } from "@/lib/types";
import { COURSE_META_MAP } from "../metadata";
import { overviewPages } from "./pages/overview";
import { fundamentalsPages } from "./pages/fundamentals";
import { arrayStringPages } from "./pages/array-string";
import { twoPointersPages } from "./pages/two-pointers";
import { slidingWindowPages } from "./pages/sliding-window";
import { prefixSumPages } from "./pages/prefix-sum";
import { hashMapPages } from "./pages/hashmap";
import { stackPages } from "./pages/stack";
import { queuePages } from "./pages/queue";
import { linkedListPages } from "./pages/linked-list";
import { treeDfsPages } from "./pages/tree-dfs";
import { treeBfsPages } from "./pages/tree-bfs";
import { bstPages } from "./pages/bst";
import { graphDfsPages } from "./pages/graph-dfs";
import { graphBfsPages } from "./pages/graph-bfs";
import { heapPages } from "./pages/heap";
import { binarySearchPages } from "./pages/binary-search";
import { backtrackingPages } from "./pages/backtracking";
import { dp1dPages } from "./pages/dp-1d";
import { dpMultiPages } from "./pages/dp-multi";
import { bitPages } from "./pages/bit";
import { triePages } from "./pages/trie";
import { intervalsPages } from "./pages/intervals";
import { monotonicStackPages } from "./pages/monotonic-stack";

const pages: Record<string, Page> = {
  ...overviewPages,
  ...fundamentalsPages,
  ...arrayStringPages,
  ...twoPointersPages,
  ...slidingWindowPages,
  ...prefixSumPages,
  ...hashMapPages,
  ...stackPages,
  ...queuePages,
  ...linkedListPages,
  ...treeDfsPages,
  ...treeBfsPages,
  ...bstPages,
  ...graphDfsPages,
  ...graphBfsPages,
  ...heapPages,
  ...binarySearchPages,
  ...backtrackingPages,
  ...dp1dPages,
  ...dpMultiPages,
  ...bitPages,
  ...triePages,
  ...intervalsPages,
  ...monotonicStackPages,
};

export const leetcode75: Course = {
  ...COURSE_META_MAP["leetcode-75"],
  pages,
};
