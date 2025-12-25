import Link from 'next/link';
import { getCoursePosts, getPostBySlug } from '@/lib/mdx';
import CourseSidebar from '@/components/CourseSidebar';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    course: string;
    slug: string[]; // เป็น [...slug]
  }>;
}

export default async function LessonPage({ params }: PageProps) {
  const { course, slug } = await params;
  
  // slug จะเป็น array เช่น ["01-intro", "01-hello"]
  // ต้องส่งไปให้ getPostBySlug จัดการต่อ
  const post = getPostBySlug(course, slug);
  const posts = getCoursePosts(course); // ได้รายการทั้งหมดมาแล้ว

  if (!post) {
    notFound();
  }

  // ไม่ต้องจัดกลุ่มในหน้านี้แล้ว จะให้ Sidebar ทำงานจัดกลุ่มเอง

  const options = {
    theme: 'github-dark', 
    keepBackground: true,
  };

  // สร้าง currentSlug string เพื่อเทียบกับ link
  const currentSlugPath = slug.join('/');

  // หา index ของบทเรียนปัจจุบัน
  const currentIndex = posts.findIndex((p) => p.slug === currentSlugPath);
  const prevPost = posts[currentIndex - 1];
  const nextPost = posts[currentIndex + 1];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <CourseSidebar course={course} posts={posts} currentSlug={currentSlugPath} />

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
        {/* Breadcrumb แบบง่าย */}
        <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
            <Link href="/courses" className="hover:underline">Courses</Link>
            <span>/</span>
            <span className="capitalize">{course.replace(/-/g, ' ')}</span>
            <span>/</span>
            <span>{post.frontmatter.chapterTitle}</span>
        </div>

        <article className="prose prose-slate dark:prose-invert max-w-none lg:prose-lg">
            <div className="mb-6">
                <h1 className="mb-2 text-3xl font-extrabold">{post.frontmatter.title}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-0">{post.frontmatter.description}</p>
            </div>
            
            <hr className="my-6 border-gray-200 dark:border-gray-800" />

          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                    [rehypePrettyCode, options]
                ],
              },
            }}
          />
        </article>
        
        {/* Navigation ปุ่มถัดไป/ก่อนหน้า */}
        <div className="mt-16 flex justify-between border-t border-gray-200 dark:border-gray-800 pt-8">
             {prevPost ? (
               <Link href={`/courses/${course}/${prevPost.slug}`} className="flex flex-col gap-1 group text-left">
                  <span className="text-sm text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">Previous</span>
                  <span className="text-blue-600 font-semibold group-hover:text-blue-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    {prevPost.frontmatter.title}
                  </span>
               </Link>
             ) : (
               <div></div> /* Spacer */
             )}

             {nextPost ? (
               <Link href={`/courses/${course}/${nextPost.slug}`} className="flex flex-col gap-1 group text-right">
                  <span className="text-sm text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">Next</span>
                  <span className="text-blue-600 font-semibold group-hover:text-blue-500 flex items-center gap-2 justify-end">
                    {nextPost.frontmatter.title}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </span>
               </Link>
             ) : (
                <div></div> /* Spacer */
             )}
        </div>
      </main>
    </div>
  );
}
