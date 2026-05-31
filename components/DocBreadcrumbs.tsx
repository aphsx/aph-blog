import Link from "next/link";

export default function DocBreadcrumbs({
  courseTitle,
  courseHref,
  categoryLabel,
  categoryHref,
  pageTitle,
}: {
  courseTitle: string;
  courseHref: string;
  categoryLabel?: string;
  categoryHref?: string;
  pageTitle: string;
}) {
  const sep = (
    <span className="mx-1 select-none text-muted/60" aria-hidden>
      ›
    </span>
  );

  return (
    <nav
      aria-label="Breadcrumbs"
      className="mb-4 flex flex-wrap items-center gap-1 text-[0.875rem] text-muted"
    >
      <Link
        href="/"
        className="flex items-center text-muted no-underline hover:text-primary hover:no-underline"
        aria-label="Aph's Blog home"
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
      {sep}
      <Link
        href={courseHref}
        className="text-muted no-underline hover:text-primary hover:no-underline"
      >
        {courseTitle}
      </Link>
      {categoryLabel && categoryHref && (
        <>
          {sep}
          <Link
            href={categoryHref}
            className="text-muted no-underline hover:text-primary hover:no-underline"
          >
            {categoryLabel}
          </Link>
        </>
      )}
      {sep}
      <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[0.75rem] font-medium text-primary-dark">
        {pageTitle}
      </span>
    </nav>
  );
}
