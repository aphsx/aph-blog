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
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <section className="mx-auto max-w-[820px] px-8 pb-8 pt-16 text-center">
          <h1 className="mb-4 text-[1.75em] leading-tight tracking-tight max-[576px]:text-[1.75em] md:text-[2.25em]">
            คู่มือเตรียมสัมภาษณ์ Software Engineer
          </h1>
          <p className="mx-auto mb-7 max-w-[640px] text-lg leading-relaxed text-subtle">
            ตั้งแต่ศูนย์จนถึงรับ offer — Resume, Coding interview, System design,
            Behavioral และการต่อรองเงินเดือน รวมไว้ในที่เดียว ทำตามทีละขั้นได้เลย
          </p>
          <Link
            href="/guide/overview"
            className="inline-block rounded-md bg-primary px-6 py-3 text-base font-bold text-white no-underline hover:bg-primary-dark hover:no-underline"
          >
            เริ่มอ่าน Roadmap →
          </Link>
        </section>
        <div className="mx-auto mb-16 mt-4 grid max-w-[920px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 px-8">
          {STEPS.map((s) => (
            <Link
              key={s.s}
              href={`/guide/${s.s}`}
              className="rounded-lg border border-border bg-white p-5 text-inherit no-underline transition-[border-color,box-shadow] hover:border-[#afafe9] hover:shadow-[0_4px_16px_rgba(101,101,213,0.1)] hover:no-underline"
            >
              <div className="mb-3 grid size-8 place-items-center rounded-md bg-primary-soft text-sm font-bold text-primary-dark">
                {s.n}
              </div>
              <h3 className="mb-1.5 text-[17px] text-[#1c1e21]">{s.t}</h3>
              <p className="m-0 text-sm leading-normal text-muted">{s.d}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
