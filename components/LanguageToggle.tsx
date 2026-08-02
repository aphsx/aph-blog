"use client";

import { LOCALES, LOCALE_LABEL, UI } from "@/lib/locale";
import { useLocale } from "./LocaleProvider";

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const ui = UI[locale];

  return (
    <div
      className="flex items-center rounded-full border border-border p-0.5 text-xs font-semibold"
      role="group"
      aria-label={ui.langAria}
    >
      {LOCALES.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={`rounded-full px-2.5 py-1 transition-colors ${
              active
                ? "bg-primary text-white"
                : "text-muted hover:bg-surface-soft hover:text-[#1c1e21]"
            }`}
            aria-pressed={active}
          >
            {LOCALE_LABEL[code]}
          </button>
        );
      })}
    </div>
  );
}
