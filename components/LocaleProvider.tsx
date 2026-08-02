"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
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

function parseLocale(raw: string | null | undefined): Locale | null {
  return raw === "en" || raw === "th" ? raw : null;
}

function readCookieLocale(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${LOCALE_STORAGE_KEY}=`));
  if (!match) return null;
  return parseLocale(
    decodeURIComponent(match.slice(LOCALE_STORAGE_KEY.length + 1)),
  );
}

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    return parseLocale(window.localStorage.getItem(LOCALE_STORAGE_KEY));
  } catch {
    return null;
  }
}

function writeLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_STORAGE_KEY}=${locale};path=/;max-age=31536000;samesite=lax`;
}

function persistLocale(locale: Locale) {
  writeLocaleCookie(locale);
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
  document.documentElement.lang = locale;
}

/**
 * User preference, sticky across pages:
 * 1) cookie (what the server reads on the next navigation)
 * 2) localStorage (backup if cookie was cleared)
 * 3) default EN
 */
function resolvePreferredLocale(): Locale {
  return readCookieLocale() ?? readStoredLocale() ?? DEFAULT_LOCALE;
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
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const didSync = useRef(false);

  // On mount (and when the server locale changes): keep cookie + UI in sync
  // with the saved preference, and refresh once if SSR used a different lang.
  useEffect(() => {
    const preferred = resolvePreferredLocale();
    persistLocale(preferred);
    setLocaleState(preferred);

    if (preferred !== initialLocale && !didSync.current) {
      didSync.current = true;
      router.refresh();
    }
  }, [initialLocale, router]);

  // Every client navigation: re-write cookie so the next RSC request stays on
  // the language the user picked (TH stays TH, EN stays EN).
  useEffect(() => {
    persistLocale(locale);
  }, [pathname, locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      didSync.current = false;
      setLocaleState(next);
      persistLocale(next);
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
