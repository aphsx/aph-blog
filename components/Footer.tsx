"use client";

import Link from "next/link";
import { COURSES } from "@/lib/courses";
import { pickLocalized } from "@/lib/locale";
import { coursePath, pagePath } from "@/lib/paths";
import { useLocale } from "./LocaleProvider";

export default function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="bg-footer px-4 py-12 text-white/80">
      <div className="mx-auto max-w-[1140px]">
        <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-8">
          {COURSES.map((course) => {
            const links = course.order
              .filter((slug) => slug !== course.overviewSlug)
              .slice(0, 4)
              .map((slug) => ({
                slug,
                title: pickLocalized(course.pages[slug].title, locale),
              }));
            return (
              <div key={course.id}>
                <Link
                  href={coursePath(course.id)}
                  className="mb-3 block text-[15px] font-bold text-white no-underline hover:underline"
                >
                  {course.title}
                </Link>
                <ul className="m-0 list-none p-0">
                  {links.map((l) => (
                    <li key={l.slug} className="my-1.5">
                      <Link
                        href={pagePath(l.slug)}
                        className="text-sm text-white/80 no-underline hover:text-white hover:underline"
                      >
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="text-sm">
          Copyright © {new Date().getFullYear()} Aph&apos;s Blog
        </div>
      </div>
    </footer>
  );
}
