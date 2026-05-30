// Barrel re-export for the content model.
// Kept so existing `@/lib/content` imports keep working after the split into
// types.ts (types), headings.ts (TOC helper), and nav.ts (navigation data).
export * from "./types";
export * from "./headings";
export * from "./nav";
