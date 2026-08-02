import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COURSE_MAP } from "@/lib/courses";
import { LAST_PATH_COOKIE } from "@/components/LastPathTracker";

/**
 * Mirrors the exact validity rules from app/course/[course]/page.tsx and
 * app/course/[course]/[slug]/page.tsx. Only a pathname that would actually
 * render a real page counts as "known" — this also guards against trusting
 * a tampered cookie value and redirecting somewhere off-route.
 */
function isKnownPath(pathname: string): boolean {
  if (!pathname.startsWith("/") || pathname.startsWith("//")) return false;
  if (pathname === "/") return true;

  const parts = pathname.split("/").filter(Boolean); // ["course", id, slug?]
  if (parts.length > 3) return false; // no route is nested deeper than /course/<id>/<slug>
  if (parts[0] !== "course" || !parts[1]) return false;

  const course = COURSE_MAP[parts[1]];
  if (!course) return false;
  if (!parts[2]) return true; // /course/<id> — renders the overview

  // /course/<id>/<slug> — must be a real page, and not the overview slug
  // (that one lives only at the bare course path and 404s here).
  return Boolean(course.pages[parts[2]]) && parts[2] !== course.overviewSlug;
}

/**
 * App Router's catch-all for unmatched routes and explicit notFound() calls.
 * Instead of showing a dead-end error page, send the reader back to the
 * last real page they were on (tracked by LastPathTracker), or home if we
 * have nothing to go on yet.
 */
export default async function NotFound() {
  const store = await cookies();
  const lastPath = store.get(LAST_PATH_COOKIE)?.value;
  const decoded = lastPath ? decodeURIComponent(lastPath) : null;

  redirect(decoded && isKnownPath(decoded) ? decoded : "/");
}
