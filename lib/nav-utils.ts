import { NAV, type NavCategory } from "./content";
import { pagePath } from "./paths";

export function getCategoryForSlug(slug: string): NavCategory | undefined {
  return NAV.find((c) => c.items.some((i) => i.slug === slug));
}

export function getCategoryHref(cat: NavCategory): string {
  return pagePath(cat.items[0].slug);
}
