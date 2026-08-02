import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, type Locale } from "./locale";

/** Read the active locale from the request cookie (Server Components only). */
export async function getRequestLocale(): Promise<Locale> {
  const jar = await cookies();
  const raw = jar.get(LOCALE_STORAGE_KEY)?.value;
  return raw === "en" || raw === "th" ? raw : DEFAULT_LOCALE;
}
