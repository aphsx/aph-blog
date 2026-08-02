"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "@/lib/locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (raw === "en" || raw === "th") return raw;
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE;
}

function writeLocaleCookie(locale: Locale) {
  // 1 year — readable by Server Components via cookies()
  document.cookie = `${LOCALE_STORAGE_KEY}=${locale};path=/;max-age=31536000;samesite=lax`;
}

export function LocaleProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  /** Locale from the request cookie (avoids SSR/client mismatch). */
  initialLocale?: Locale;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    // Prefer cookie/server value; fall back to any older localStorage choice once.
    const stored = readStoredLocale();
    if (stored !== initialLocale) {
      // Keep localStorage in sync with whatever the server rendered.
      try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, initialLocale);
      } catch {
        /* ignore */
      }
    }
    document.documentElement.lang = locale;
  }, [initialLocale, locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      writeLocaleCookie(next);
      try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      document.documentElement.lang = next;
      // Re-render Server Components (GuidePage / Article) for the new locale.
      router.refresh();
    },
    [router],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
