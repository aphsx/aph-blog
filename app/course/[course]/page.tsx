import { notFound } from "next/navigation";
import type { Metadata } from "next";
import GuidePage from "@/components/GuidePage";
import { COURSES, COURSE_MAP } from "@/lib/courses";

export function generateStaticParams() {
  return COURSES.map((c) => ({ course: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string }>;
}): Promise<Metadata> {
  const { course } = await params;
  const c = COURSE_MAP[course];
  return { title: c ? `${c.title} — Aph's Blog` : "ไม่พบหน้า" };
}

export default async function CourseOverview({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;
  const c = COURSE_MAP[course];
  if (!c) notFound();
  return <GuidePage slug={c.overviewSlug} />;
}
