import Link from "next/link";
import { pagePath } from "@/lib/paths";
import { UI, type Locale } from "@/lib/locale";

type PageRef = { slug: string; title: string };

export default function DocPaginator({
  prev,
  next,
  locale = "th",
}: {
  prev: PageRef | null;
  next: PageRef | null;
  locale?: Locale;
}) {
  const ui = UI[locale];
  return (
    <nav
      className="mt-12 flex gap-4 border-t border-border pt-6"
      aria-label="Docs pages"
    >
      {prev ? (
        <Link
          href={pagePath(prev.slug)}
          className="flex flex-1 flex-col gap-1 no-underline hover:no-underline"
        >
          <span className="text-sm text-muted">{ui.previous}</span>
          <span className="font-semibold text-primary hover:underline">
            « {prev.title}
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
      {next ? (
        <Link
          href={pagePath(next.slug)}
          className="flex flex-1 flex-col items-end gap-1 text-right no-underline hover:no-underline"
        >
          <span className="text-sm text-muted">{ui.next}</span>
          <span className="font-semibold text-primary hover:underline">
            {next.title} »
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  );
}
