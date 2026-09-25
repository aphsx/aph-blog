import { notFound } from "next/navigation";
import type { Metadata } from "next";
import GuidePage from "@/components/content/GuidePage";
import { COURSE_METAS, COURSE_META_MAP } from "@/lib/courses/metadata";
import { UI } from "@/lib/locale";
import { getRequestLocale } from "@/lib/locale-server";

export function generateStaticParams() {
  return COURSE_METAS.map((c) => ({ course: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string }>;
}): Promise<Metadata> {
  const { course } = await params;
  const c = COURSE_META_MAP[course];
  const locale = await getRequestLocale();
  const ui = UI[locale];
  return { title: c ? `${c.title} — Aph's Blog` : ui.pageNotFound };
}

export default async function CourseOverview({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;
  const c = COURSE_META_MAP[course];
  if (!c) notFound();
  return <GuidePage slug={c.overviewSlug} />;
}
