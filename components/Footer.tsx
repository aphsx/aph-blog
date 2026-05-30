import Link from "next/link";

const COLS = [
  {
    title: "เริ่มต้น",
    links: [
      { label: "ภาพรวม & Roadmap", href: "/guide/overview" },
      { label: "แผนเตรียมตัว", href: "/guide/timeline" },
    ],
  },
  {
    title: "สัมภาษณ์",
    links: [
      { label: "Coding Interview", href: "/guide/study-plan" },
      { label: "System Design", href: "/guide/system-design" },
      { label: "Behavioral", href: "/guide/behavioral" },
    ],
  },
  {
    title: "Resume",
    links: [
      { label: "เขียน Resume", href: "/guide/resume" },
      { label: "หางาน & ยื่นสมัคร", href: "/guide/job-application" },
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
