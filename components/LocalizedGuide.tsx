"use client";

import Article from "@/components/Article";
import DocBreadcrumbs from "@/components/DocBreadcrumbs";
import { Shoutout } from "@/components/DocContentHeader";
import DocPaginator from "@/components/DocPaginator";
import { TocMobile } from "@/components/Toc";
import Shell from "@/components/Shell";
import { useLocale } from "@/components/LocaleProvider";
import { extractHeadings } from "@/lib/content";
import { resolvePage } from "@/lib/locale";
import type { Course, Page } from "@/lib/types";
import { coursePath } from "@/lib/paths";

type NavRef = { slug: string; title: string } | null;

export default function LocalizedGuide({
  course,
  page,
  categoryLabel,
  categoryHref,
  prev,
  next,
}: {
  course: Course;
  page: Page;
  categoryLabel?: string;
  categoryHref?: string;
  prev: NavRef;
  next: NavRef;
}) {
  const { locale } = useLocale();
  const resolved = resolvePage(page, locale);
  const toc = extractHeadings(resolved.blocks);

  // Prev/next titles follow locale when those pages have translations.
  const prevResolved = prev
    ? resolvePage(course.pages[prev.slug], locale)
    : null;
  const nextResolved = next
    ? resolvePage(course.pages[next.slug], locale)
    : null;

  return (
    <Shell toc={toc}>
      <div className="doc-item-container">
        <article className="min-[768px]:text-[18px]">
          <DocBreadcrumbs
            courseTitle={course.title}
            courseHref={coursePath(course.id)}
            categoryLabel={categoryLabel}
            categoryHref={categoryHref}
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

          <Article blocks={resolved.blocks} />
        </article>

        <DocPaginator
          prev={
            prevResolved
              ? { slug: prev!.slug, title: prevResolved.title }
              : null
          }
          next={
            nextResolved
              ? { slug: next!.slug, title: nextResolved.title }
              : null
          }
        />
      </div>
    </Shell>
  );
}
