export function GitHubStar() {
  return (
    <div className="mb-6">
      <iframe
        src="https://ghbtns.com/github-btn.html?user=yangshun&repo=tech-interview-handbook&type=star&count=true&size=large"
        title="GitHub Stars"
        width={170}
        height={30}
        className="overflow-hidden border-0"
      />
    </div>
  );
}

export function Shoutout() {
  return (
    <div className="mb-6">
      <div className="rounded-lg bg-primary px-4 py-3 text-sm leading-relaxed text-white md:text-base">
        👋 คู่มือเตรียมสัมภาษณ์ Software Engineer ภาษาไทย — รวมทุกขั้นตอนตั้งแต่
        Resume, Coding, System Design, Behavioral จนถึงการต่อรอง Offer
        ทำตามทีละหน้าใน sidebar ได้เลย
      </div>
    </div>
  );
}
