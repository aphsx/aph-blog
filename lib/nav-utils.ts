import type { NavCategory } from "./types";
import { courseForSlug } from "./courses";
import { pagePath } from "./paths";

/** Find the sidebar category (within the owning course) that contains a slug. */
export function getCategoryForSlug(slug: string): NavCategory | undefined {
  const course = courseForSlug(slug);
  if (!course) return undefined;
  return course.nav.find(
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
