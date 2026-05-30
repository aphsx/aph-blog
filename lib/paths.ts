import { PAGES } from "./pages";

/** URL path ของแต่ละหน้า */
export function pagePath(slug: string): string {
  if (slug === "overview") return "/";
  return `/${slug}`;
}

/** แปลง pathname เป็น slug */
export function slugFromPathname(pathname: string): string | null {
  const clean = pathname.replace(/\/$/, "") || "/";
  if (clean === "/") return "overview";

  // รองรับ legacy /guide/...
  if (clean.startsWith("/guide/")) {
    const legacy = clean.slice("/guide/".length);
    return PAGES[legacy] ? legacy : null;
  }

  const slug = clean.slice(1);
  return PAGES[slug] ? slug : null;
}

export function isPagePath(pathname: string, slug: string): boolean {
  return slugFromPathname(pathname) === slug;
}

/** slug ทั้งหมดที่ต้อง generate static (ยกเว้น overview ที่อยู่ที่ /) */
export const STATIC_SLUGS = Object.keys(PAGES).filter((s) => s !== "overview");
