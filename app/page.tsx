import type { Metadata } from "next";
import GuidePage from "@/components/GuidePage";
import { PAGES } from "@/lib/pages";

const page = PAGES.overview;

export const metadata: Metadata = {
  title: `${page.title} — SE Interview Roadmap`,
};

export default function Home() {
  return <GuidePage slug="overview" />;
}
