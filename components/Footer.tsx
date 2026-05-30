import Link from "next/link";

/** Footer 4 คอลัมน์ — ตาม TIH */
const COLS = [
  {
    title: "General",
    links: [
      { label: "เริ่มอ่าน", href: "/guide/overview" },
      { label: "แผนเตรียมตัว", href: "/guide/timeline" },
      { label: "Resume", href: "/guide/resume" },
    ],
  },
  {
    title: "Interviews",
    links: [
      { label: "Coding interviews", href: "/guide/interview-formats" },
      { label: "Study plan", href: "/guide/study-plan" },
      { label: "System design", href: "/guide/system-design" },
      { label: "Behavioral", href: "/guide/behavioral" },
    ],
  },
  {
    title: "Algorithms",
    links: [
      { label: "Algorithms cheatsheet", href: "/guide/algorithms" },
      { label: "เทคนิคสัมภาษณ์", href: "/guide/best-practices" },
      { label: "เลือกภาษา", href: "/guide/picking-language" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "หางาน & สมัคร", href: "/guide/job-application" },
      { label: "ต่อรอง Offer", href: "/guide/negotiation" },
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
                  <li key={l.href} className="my-1.5">
                    <Link
                      href={l.href}
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
