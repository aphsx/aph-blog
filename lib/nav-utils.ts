import { NAV } from "./nav";
import type { NavCategory } from "./types";
import { pagePath } from "./paths";

/** Find the sidebar category that contains a slug (searches subcategories too). */
export function getCategoryForSlug(slug: string): NavCategory | undefined {
  return NAV.find(
    (c) =>
      c.items.some((i) => i.slug === slug) ||
      (c.subcategories?.some((s) => s.items.some((i) => i.slug === slug)) ??
        false),
  );
}

/** Link to a category — points at its first page. */
export function getCategoryHref(cat: NavCategory): string {
  return pagePath(cat.items[0].slug);
}
