import { COURSE_MAP, COURSES, PAGES, SLUG_TO_COURSE } from "./courses";

/** URL path of a course landing, e.g. /course/se-roadmap */
export function coursePath(courseId: string): string {
  return `/course/${courseId}`;
}

/**
 * URL path of a page, resolved from its (globally unique) slug.
 * A course's overview page lives at the bare course path; everything else at
 * /course/<courseId>/<slug>.
 */
export function pagePath(slug: string): string {
  const courseId = SLUG_TO_COURSE[slug];
  if (!courseId) return "/";
  const course = COURSE_MAP[courseId];
  if (slug === course.overviewSlug) return coursePath(courseId);
  return `/course/${courseId}/${slug}`;
}

/** Parse a pathname into the page slug it renders (course landing → its overview). */
export function slugFromPathname(pathname: string): string | null {
  const clean = pathname.replace(/\/$/, "") || "/";
  if (clean === "/") return null;

  const parts = clean.split("/").filter(Boolean); // ["course", id, slug?]
  if (parts[0] !== "course" || !parts[1]) return null;

  const course = COURSE_MAP[parts[1]];
  if (!course) return null;

  if (!parts[2]) return course.overviewSlug;
  return PAGES[parts[2]] ? parts[2] : null;
}

/** The course id a pathname belongs to (null on the blog home). */
export function courseFromPathname(pathname: string): string | null {
  const clean = pathname.replace(/\/$/, "") || "/";
  const parts = clean.split("/").filter(Boolean);
  if (parts[0] !== "course" || !parts[1]) return null;
  return COURSE_MAP[parts[1]] ? parts[1] : null;
}

export function isPagePath(pathname: string, slug: string): boolean {
  return slugFromPathname(pathname) === slug;
}

/** Static params for every course: its non-overview pages. */
export const COURSE_PAGE_PARAMS: { course: string; slug: string }[] =
  COURSES.flatMap((c) =>
    Object.keys(c.pages)
      .filter((slug) => slug !== c.overviewSlug)
      .map((slug) => ({ course: c.id, slug })),
  );
