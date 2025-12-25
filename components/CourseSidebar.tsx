import Link from 'next/link';

export type SidebarPost = {
  slug: string; // "chapter/lesson"
  frontmatter: {
    title?: string;
    description?: string;
    date?: string;
    chapterTitle?: string;
    [key: string]: any;
  };
  chapter: string; // folder name e.g. "01-introduction"
};

function formatFolderName(folder: string) {
  // Remove numeric prefix and hyphen after it
  const cleaned = folder.replace(/^\d{1,}-/, '');
  // Title case words separated by '-'
  return cleaned
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function chapterOrderKey(folder: string) {
  const m = folder.match(/^(\d{1,})/);
  return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER;
}

type Props = {
  course: string;
  posts: SidebarPost[];
  currentSlug: string; // "chapter/lesson"
};

export default function CourseSidebar({ course, posts, currentSlug }: Props) {
  const activeChapter = currentSlug.split('/')[0] || '';

  // Group posts by chapter
  const chapterMap = new Map<string, SidebarPost[]>();
  posts.forEach((p) => {
    const list = chapterMap.get(p.chapter) || [];
    list.push(p);
    chapterMap.set(p.chapter, list);
  });

  // Build ordered chapters with display titles
  const chapters = Array.from(chapterMap.entries())
    .map(([folder, items]) => {
      // Prefer explicit chapterTitle from the first lesson if provided
      const title = items[0]?.frontmatter?.chapterTitle || formatFolderName(folder);
      // Sort lessons by slug within the chapter
      const sortedItems = [...items].sort((a, b) => a.slug.localeCompare(b.slug));
      return { folder, title, items: sortedItems };
    })
    .sort((a, b) => {
      const ao = chapterOrderKey(a.folder);
      const bo = chapterOrderKey(b.folder);
      if (ao !== bo) return ao - bo;
      return a.folder.localeCompare(b.folder);
    });

  return (
    <aside className="w-72 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:block h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="font-bold text-xl mb-6 capitalize">{course.replace(/-/g, ' ')}</h2>

        <div className="space-y-4">
          {chapters.map((ch) => (
            <details key={ch.folder} className="group" open={ch.folder === activeChapter}>
              <summary className="cursor-pointer select-none px-3 py-2 rounded-md text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between">
                <span>{ch.title}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{ch.items.length}</span>
              </summary>
              <nav className="mt-1 mb-2 space-y-1">
                {ch.items.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/courses/${course}/${p.slug}`}
                    className={
                      `block px-3 py-2 rounded-md text-sm transition-colors ` +
                      (p.slug === currentSlug
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800')
                    }
                  >
                    {p.frontmatter.title || p.slug.split('/')[1]}
                  </Link>
                ))}
              </nav>
            </details>
          ))}
        </div>

        <div className="mt-8 border-t pt-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">← Back to Home</Link>
        </div>
      </div>
    </aside>
  );
}
