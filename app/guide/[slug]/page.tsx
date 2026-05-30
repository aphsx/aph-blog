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
      <article>
        <h1 className="mb-4 text-[1.5em] leading-tight tracking-tight md:text-[2.25em]">
          {page.title}
        </h1>
        <Article blocks={page.blocks} />
        <nav className="mt-12 flex gap-4 border-t border-border pt-6">
          {prev ? (
            <Link
              href={`/guide/${prev.slug}`}
              className="flex flex-1 flex-col gap-1 rounded-md border border-border p-3 no-underline transition-colors hover:border-primary hover:no-underline"
            >
              <span className="text-xs text-muted">← Previous</span>
              <span className="font-semibold text-primary">{prev.title}</span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/guide/${next.slug}`}
              className="flex flex-1 flex-col items-end gap-1 rounded-md border border-border p-3 text-right no-underline transition-colors hover:border-primary hover:no-underline"
            >
              <span className="text-xs text-muted">Next →</span>
              <span className="font-semibold text-primary">{next.title}</span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
        </nav>
      </article>
    </Shell>
  );
}
