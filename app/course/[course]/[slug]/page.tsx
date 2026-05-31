import { notFound } from "next/navigation";
import type { Metadata } from "next";
import GuidePage from "@/components/GuidePage";
import { COURSE_MAP } from "@/lib/courses";
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
  return { title: page ? `${page.title} — Aph's Blog` : "ไม่พบหน้า" };
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
