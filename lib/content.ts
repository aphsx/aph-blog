// Barrel re-export for the content model.
// Kept so existing `@/lib/content` imports keep working after the split into
// types.ts (types), headings.ts (TOC helper), and courses/ (course data + nav).
export * from "./types";
export * from "./headings";
export * from "./courses";
