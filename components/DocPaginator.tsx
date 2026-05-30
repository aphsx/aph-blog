import Link from "next/link";

type PageRef = { slug: string; title: string };

export default function DocPaginator({
  prev,
  next,
}: {
  prev: PageRef | null;
  next: PageRef | null;
}) {
  return (
    <nav
      className="mt-10 flex gap-4 border-t border-border pt-8"
      aria-label="Docs pages"
    >
      {prev ? (
        <Link
          href={`/guide/${prev.slug}`}
          className="flex flex-1 flex-col gap-1 no-underline hover:no-underline"
        >
          <span className="text-sm text-muted">Previous</span>
          <span className="font-semibold text-primary hover:underline">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
      {next ? (
        <Link
          href={`/guide/${next.slug}`}
          className="flex flex-1 flex-col items-end gap-1 text-right no-underline hover:no-underline"
        >
          <span className="text-sm text-muted">Next</span>
          <span className="font-semibold text-primary hover:underline">
            {next.title}
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  );
}
