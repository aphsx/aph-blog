import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import Article from "@/components/Article";
import DocBreadcrumbs from "@/components/DocBreadcrumbs";
import { GitHubStar, Shoutout } from "@/components/DocContentHeader";
import DocPaginator from "@/components/DocPaginator";
import { TocMobile } from "@/components/Toc";
import { ORDER, extractHeadings } from "@/lib/content";
import { getCategoryForSlug, getCategoryHref } from "@/lib/nav-utils";
import { PAGES } from "@/lib/pages";

export function generateStaticParams() {
  return ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = PAGES[slug];
  return { title: page ? `${page.title} — SE Interview Roadmap` : "ไม่พบหน้า" };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();

  const idx = ORDER.indexOf(page.slug);
  const prev = idx > 0 ? PAGES[ORDER[idx - 1]] : null;
  const next = idx < ORDER.length - 1 ? PAGES[ORDER[idx + 1]] : null;
  const toc = extractHeadings(page.blocks);
  const category = getCategoryForSlug(page.slug);

  return (
    <Shell toc={toc}>
      <div className="doc-item-container">
        <article className="min-[768px]:text-[18px]">
          {category && (
            <DocBreadcrumbs
              categoryLabel={category.label}
              categoryHref={getCategoryHref(category)}
              pageTitle={page.title}
            />
          )}

          <TocMobile headings={toc} />

          <header>
            <h1 className="m-0 text-[1.5em] font-bold leading-[1.2] tracking-tight text-[#1c1e21] min-[768px]:text-[2.25em]">
              {page.title}
            </h1>
          </header>

          <GitHubStar />
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
