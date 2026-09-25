import { UI, type Locale } from "@/lib/locale";

export function Shoutout({ locale = "th" }: { locale?: Locale }) {
  const ui = UI[locale];
  return (
    <div className="mb-8 mt-4">
      <div className="rounded-lg bg-primary p-3 text-sm leading-relaxed text-white">
        {ui.shoutout}
      </div>
    </div>
  );
}
