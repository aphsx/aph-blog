import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from "@/lib/locale";

/**
 * Keep the locale cookie stable across navigations.
 * - Missing cookie → set default EN
 * - Valid en|th → leave as-is (user choice persists)
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const raw = request.cookies.get(LOCALE_STORAGE_KEY)?.value;

  if (raw !== "en" && raw !== "th") {
    response.cookies.set(LOCALE_STORAGE_KEY, DEFAULT_LOCALE, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on all routes except Next internals and static assets.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
