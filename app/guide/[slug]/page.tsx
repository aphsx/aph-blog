import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import Article from "@/components/Article";
import { ORDER } from "@/lib/content";
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

  return (
    <Shell>
      <article className="article">
        <div className="breadcrumb">{page.group}</div>
        <h1>{page.title}</h1>
        <p className="lead">{page.lead}</p>
        <Article blocks={page.blocks} />
        <div className="pager">
          {prev ? (
            <Link href={`/guide/${prev.slug}`} className="prev">
              <div className="dir">← ก่อนหน้า</div>
              <div className="ttl">{prev.title}</div>
            </Link>
          ) : (
            <span style={{ flex: 1 }} />
          )}
          {next ? (
            <Link href={`/guide/${next.slug}`} className="next">
              <div className="dir">ถัดไป →</div>
              <div className="ttl">{next.title}</div>
            </Link>
          ) : (
            <span style={{ flex: 1 }} />
          )}
        </div>
      </article>
    </Shell>
  );
}
