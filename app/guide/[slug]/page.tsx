import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import Article from "@/components/Article";
import { ORDER, extractHeadings } from "@/lib/content";
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

  return (
    <Shell toc={toc}>
      <article className="article">
        <h1>{page.title}</h1>
        <Article blocks={page.blocks} />
        <nav className="pager">
          {prev ? (
            <Link href={`/guide/${prev.slug}`} className="pager-link prev">
              <span className="pager-label">← Previous</span>
              <span className="pager-title">{prev.title}</span>
            </Link>
          ) : (
            <span className="pager-spacer" />
          )}
          {next ? (
            <Link href={`/guide/${next.slug}`} className="pager-link next">
              <span className="pager-label">Next →</span>
              <span className="pager-title">{next.title}</span>
            </Link>
          ) : (
            <span className="pager-spacer" />
          )}
        </nav>
      </article>
    </Shell>
  );
}
