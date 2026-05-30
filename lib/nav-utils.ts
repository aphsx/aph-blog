import { NAV, type NavCategory } from "./content";

export function getCategoryForSlug(slug: string): NavCategory | undefined {
  return NAV.find((c) => c.items.some((i) => i.slug === slug));
}

export function getCategoryHref(cat: NavCategory): string {
  return `/guide/${cat.items[0].slug}`;
}
