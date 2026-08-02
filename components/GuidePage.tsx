import LocalizedGuide from "@/components/LocalizedGuide";
import { getCategoryForSlug, getCategoryHref } from "@/lib/nav-utils";
import { courseForSlug } from "@/lib/courses";

export default function GuidePage({ slug }: { slug: string }) {
  const course = courseForSlug(slug);
  const page = course?.pages[slug];
  if (!course || !page) return null;

  const idx = course.order.indexOf(page.slug);
  const prevPage = idx > 0 ? course.pages[course.order[idx - 1]] : null;
  const nextPage =
    idx < course.order.length - 1
      ? course.pages[course.order[idx + 1]]
      : null;
  const category = getCategoryForSlug(page.slug);

  return (
    <LocalizedGuide
      course={course}
      page={page}
      categoryLabel={category?.label}
      categoryHref={category ? getCategoryHref(category) : undefined}
      prevSlug={prevPage?.slug ?? null}
      nextSlug={nextPage?.slug ?? null}
    />
  );
}
