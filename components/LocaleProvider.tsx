"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
  return parseLocale(decodeURIComponent(match.slice(LOCALE_STORAGE_KEY.length + 1)));
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
 * Resolve the user's preferred locale.
 * Cookie (sent to the server) wins; localStorage backs it up if the cookie was lost.
 */
function preferredLocale(serverLocale: Locale): Locale {
  return readCookieLocale() ?? readStoredLocale() ?? serverLocale ?? DEFAULT_LOCALE;
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

  // Hydrate / re-sync after SSR and when the server locale prop changes.
  useEffect(() => {
    const preferred = preferredLocale(initialLocale);
    persistLocale(preferred);
    setLocaleState(preferred);
    // Server rendered a different language than the user's saved choice —
    // refresh so GuidePage / BlogHome pick up the cookie.
    if (preferred !== initialLocale) {
      router.refresh();
    }
  }, [initialLocale, router]);

  // Re-assert the cookie on every navigation so the next RSC request stays correct.
  useEffect(() => {
    persistLocale(locale);
  }, [pathname, locale]);

  const setLocale = useCallback(
    (next: Locale) => {
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
