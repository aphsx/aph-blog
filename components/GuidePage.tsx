import Shell from "@/components/Shell";
import Article from "@/components/Article";
import DocBreadcrumbs from "@/components/DocBreadcrumbs";
import { Shoutout } from "@/components/DocContentHeader";
import DocPaginator from "@/components/DocPaginator";
import { TocMobile } from "@/components/Toc";
import { extractHeadings } from "@/lib/content";
import { getCategoryForSlug, getCategoryHref } from "@/lib/nav-utils";
import { courseForSlug } from "@/lib/courses";
import { coursePath } from "@/lib/paths";

export default function GuidePage({ slug }: { slug: string }) {
  const course = courseForSlug(slug);
  const page = course?.pages[slug];
  if (!course || !page) return null;

  const idx = course.order.indexOf(page.slug);
  const prev = idx > 0 ? course.pages[course.order[idx - 1]] : null;
  const next =
    idx < course.order.length - 1
      ? course.pages[course.order[idx + 1]]
      : null;
  const toc = extractHeadings(page.blocks);
  const category = getCategoryForSlug(page.slug);

  return (
    <Shell toc={toc}>
      <div className="doc-item-container">
        <article className="min-[768px]:text-[18px]">
          <DocBreadcrumbs
            courseTitle={course.title}
            courseHref={coursePath(course.id)}
            categoryLabel={category?.label}
            categoryHref={category ? getCategoryHref(category) : undefined}
            pageTitle={page.title}
          />

          <TocMobile headings={toc} />

          <header>
            <h1 className="m-0 text-[1.5em] font-bold leading-[1.2] tracking-tight text-[#1c1e21] min-[768px]:text-[2.25em]">
              {page.title}
            </h1>
          </header>

          <Shoutout />

          <p className="mb-6 italic leading-relaxed text-[#1c1e21]">
            {page.lead}
          </p>

          <Article blocks={page.blocks} />
        </article>

        <DocPaginator
          prev={prev ? { slug: prev.slug, title: prev.title } : null}
          next={next ? { slug: next.slug, title: next.title } : null}
        />
      </div>
    </Shell>
  );
}
