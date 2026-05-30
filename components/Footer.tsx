import Link from "next/link";
import { pagePath } from "@/lib/paths";

const COLS = [
  {
    title: "General",
    links: [
      { label: "เริ่มอ่าน", slug: "overview" },
      { label: "แผนเตรียมตัว", slug: "timeline" },
      { label: "Resume", slug: "resume" },
    ],
  },
  {
    title: "Interviews",
    links: [
      { label: "Coding interviews", slug: "interview-formats" },
      { label: "Study plan", slug: "study-plan" },
      { label: "System design", slug: "system-design" },
      { label: "Behavioral", slug: "behavioral" },
    ],
  },
  {
    title: "Algorithms",
    links: [
      { label: "Algorithms cheatsheet", slug: "algorithms" },
      { label: "เทคนิคสัมภาษณ์", slug: "best-practices" },
      { label: "เลือกภาษา", slug: "picking-language" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "หางาน & สมัคร", slug: "job-application" },
      { label: "ต่อรอง Offer", slug: "negotiation" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-footer px-4 py-12 text-white/80">
      <div className="mx-auto max-w-[1140px]">
        <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-8">
          {COLS.map((col) => (
            <div key={col.title}>
              <div className="mb-3 text-[15px] font-bold text-white">
                {col.title}
              </div>
              <ul className="m-0 list-none p-0">
                {col.links.map((l) => (
                  <li key={l.slug} className="my-1.5">
                    <Link
                      href={pagePath(l.slug)}
                      className="text-sm text-white/80 no-underline hover:text-white hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-sm">
          Copyright © {new Date().getFullYear()} SE Interview Roadmap
        </div>
      </div>
    </footer>
  );
}
