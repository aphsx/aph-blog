import type { Metadata } from "next";
import BlogHome from "@/components/BlogHome";

export const metadata: Metadata = {
  title: "Aph's Blog",
};

export default function Home() {
  return <BlogHome />;
}
