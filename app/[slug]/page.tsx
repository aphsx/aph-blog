import { notFound } from "next/navigation";
import type { Metadata } from "next";
import GuidePage from "@/components/GuidePage";
import { STATIC_SLUGS } from "@/lib/paths";
import { PAGES } from "@/lib/pages";

export function generateStaticParams() {
  return STATIC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES[slug];
  return { title: page ? `${page.title} — SE Interview Roadmap` : "ไม่พบหน้า" };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!PAGES[slug] || slug === "overview") notFound();
  return <GuidePage slug={slug} />;
}
