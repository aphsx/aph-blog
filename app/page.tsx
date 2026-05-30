import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const STEPS = [
  { n: "1", t: "เขียน Resume", d: "ทำ resume ให้ผ่าน ATS และเริ่มยื่นสมัครเชิงรุก", s: "resume" },
  { n: "2", t: "ฝึก Coding", d: "algorithms & data structures อย่างมีระบบ", s: "study-plan" },
  { n: "3", t: "System Design", d: "ออกแบบระบบขนาดใหญ่ สำหรับ mid-senior", s: "system-design" },
  { n: "4", t: "Behavioral", d: "เล่าประสบการณ์ด้วยโครงสร้าง STAR", s: "behavioral" },
  { n: "5", t: "ต่อรอง Offer", d: "ปิดดีลให้ได้ผลตอบแทนที่เหมาะสม", s: "negotiation" },
];

export default function Home() {
  return (
    <div className="docs-wrapper">
      <Header />
      <div className="main-wrapper">
        <section className="hero">
          <h1>คู่มือเตรียมสัมภาษณ์ Software Engineer</h1>
          <p>
            ตั้งแต่ศูนย์จนถึงรับ offer — Resume, Coding interview, System design,
            Behavioral และการต่อรองเงินเดือน รวมไว้ในที่เดียว ทำตามทีละขั้นได้เลย
          </p>
          <Link href="/guide/overview" className="hero-cta">
            เริ่มอ่าน Roadmap →
          </Link>
        </section>
        <div className="cards">
          {STEPS.map((s) => (
            <Link key={s.s} href={`/guide/${s.s}`} className="card">
              <div className="card-num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
