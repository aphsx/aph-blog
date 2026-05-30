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
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          {COLS.map((col) => (
            <div className="footer-col" key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-copyright">
          Copyright © {new Date().getFullYear()} SE Interview Roadmap
        </div>
      </div>
    </footer>
  );
}
