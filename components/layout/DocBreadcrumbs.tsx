import Link from "next/link";
import { UI, type Locale } from "@/lib/locale";

export default function DocBreadcrumbs({
  courseTitle,
  courseHref,
  categoryLabel,
  categoryHref,
  pageTitle,
  locale = "th",
}: {
  courseTitle: string;
  courseHref: string;
  categoryLabel?: string;
  categoryHref?: string;
  pageTitle: string;
  locale?: Locale;
}) {
  const ui = UI[locale];
  const sep = (
    <span className="mx-1 select-none text-muted/60" aria-hidden>
      ›
    </span>
  );

  return (
    <nav
      aria-label={ui.breadcrumbsAria}
      className="mb-4 text-[0.875rem] text-muted"
    >
      <ol className="m-0 flex flex-wrap items-center gap-1 list-none p-0">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center text-muted no-underline hover:text-primary hover:no-underline transition-colors"
            aria-label={ui.homeAria}
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              aria-hidden
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </Link>
        </li>
        <li className="flex items-center">
          {sep}
          <Link
            href={courseHref}
            className="text-muted no-underline hover:text-primary hover:no-underline transition-colors"
          >
            {courseTitle}
          </Link>
        </li>
        {categoryLabel && categoryHref && (
          <li className="flex items-center">
            {sep}
            <Link
              href={categoryHref}
              className="text-muted no-underline hover:text-primary hover:no-underline transition-colors"
            >
              {categoryLabel}
            </Link>
          </li>
        )}
        <li className="flex items-center" aria-current="page">
          {sep}
          <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[0.75rem] font-medium text-primary-dark">
            {pageTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}
