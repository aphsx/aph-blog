import { notFound } from "next/navigation";
import type { Metadata } from "next";
import GuidePage from "@/components/GuidePage";
import { COURSE_MAP } from "@/lib/courses";
import { pickLocalized } from "@/lib/locale";
import { getRequestLocale } from "@/lib/locale-server";
import { COURSE_PAGE_PARAMS } from "@/lib/paths";

export function generateStaticParams() {
  return COURSE_PAGE_PARAMS;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string; slug: string }>;
}): Promise<Metadata> {
  const { course, slug } = await params;
  const page = COURSE_MAP[course]?.pages[slug];
  if (!page) return { title: "Page not found" };
  const locale = await getRequestLocale();
  const title = pickLocalized(page.title, locale);
  return { title: `${title} — Aph's Blog` };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ course: string; slug: string }>;
}) {
  const { course, slug } = await params;
  const c = COURSE_MAP[course];
  // 404 unknown course, unknown slug, or the overview slug (it lives at /course/<id>).
  if (!c || !c.pages[slug] || slug === c.overviewSlug) notFound();
  return <GuidePage slug={slug} />;
}
