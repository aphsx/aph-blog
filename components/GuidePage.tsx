import Article from "@/components/Article";
import DocBreadcrumbs from "@/components/DocBreadcrumbs";
import { Shoutout } from "@/components/DocContentHeader";
import DocPaginator from "@/components/DocPaginator";
import Shell from "@/components/Shell";
import { TocMobile } from "@/components/Toc";
import { courseForSlug } from "@/lib/courses";
import { extractHeadings } from "@/lib/content";
import { resolvePage } from "@/lib/locale";
import { getRequestLocale } from "@/lib/locale-server";
import { getCategoryForSlug, getCategoryHref } from "@/lib/nav-utils";
import { coursePath } from "@/lib/paths";

export default async function GuidePage({ slug }: { slug: string }) {
  const course = courseForSlug(slug);
  const page = course?.pages[slug];
  if (!course || !page) return null;

  const locale = await getRequestLocale();
  const resolved = resolvePage(page, locale);

  const idx = course.order.indexOf(page.slug);
  const prevSlug = idx > 0 ? course.order[idx - 1] : null;
  const nextSlug =
    idx < course.order.length - 1 ? course.order[idx + 1] : null;
  const prevResolved = prevSlug
    ? resolvePage(course.pages[prevSlug], locale)
    : null;
  const nextResolved = nextSlug
    ? resolvePage(course.pages[nextSlug], locale)
    : null;

  const toc = extractHeadings(resolved.blocks, locale);
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
            pageTitle={resolved.title}
          />

          <TocMobile headings={toc} />

          <header>
            <h1 className="m-0 text-[1.5em] font-bold leading-[1.2] tracking-tight text-[#1c1e21] min-[768px]:text-[2.25em]">
              {resolved.title}
            </h1>
          </header>

          <Shoutout />

          <p className="mb-6 italic leading-relaxed text-[#1c1e21]">
            {resolved.lead}
          </p>

          {/* Article stays an async Server Component — passed as children of client Shell */}
          <Article blocks={resolved.blocks} />
        </article>

        <DocPaginator
          prev={
            prevSlug && prevResolved
              ? { slug: prevSlug, title: prevResolved.title }
              : null
          }
          next={
            nextSlug && nextResolved
              ? { slug: nextSlug, title: nextResolved.title }
              : null
          }
        />
      </div>
    </Shell>
  );
}
