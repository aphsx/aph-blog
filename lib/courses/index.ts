import type { Course, Page } from "@/lib/types";
import { seRoadmap } from "./se-roadmap";
import { basicProgramming } from "./basic-programming";

/** Every course "Aph's Blog" hosts, in catalog order. Add a course here. */
export const COURSES: Course[] = [seRoadmap, basicProgramming];

/** Course lookup by id. */
export const COURSE_MAP: Record<string, Course> = Object.fromEntries(
  COURSES.map((c) => [c.id, c]),
);

/**
 * All pages across all courses, flattened. Slugs are globally unique, so this
 * stays a flat map — it lets `pagePath(slug)` resolve any internal link
 * (including cross-course links) without the caller knowing the course.
 */
export const PAGES: Record<string, Page> = Object.assign(
  {},
  ...COURSES.map((c) => c.pages),
);

/** slug → owning course id. Powers single-argument `pagePath`. */
export const SLUG_TO_COURSE: Record<string, string> = Object.fromEntries(
  COURSES.flatMap((c) => Object.keys(c.pages).map((slug) => [slug, c.id])),
);

/** The course that owns a slug. */
export function courseForSlug(slug: string): Course | undefined {
  return COURSE_MAP[SLUG_TO_COURSE[slug]];
}
