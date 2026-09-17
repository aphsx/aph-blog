"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Cookie name shared with app/not-found.tsx. */
export const LAST_PATH_COOKIE = "lastPath";

/**
 * Silently records the current path in a cookie on every page that renders
 * successfully. When someone lands on a URL that doesn't resolve to a real
 * page, app/not-found.tsx reads this cookie and bounces them back to the
 * last real page they were on, instead of showing a bare error page.
 *
 * Mounted once in the root layout — renders nothing.
 */
export default function LastPathTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const oneYear = 60 * 60 * 24 * 365;
    document.cookie = `${LAST_PATH_COOKIE}=${encodeURIComponent(pathname)}; path=/; max-age=${oneYear}; SameSite=Lax`;
  }, [pathname]);

  return null;
}
