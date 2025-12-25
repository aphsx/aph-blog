import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Directory ที่เก็บเนื้อหาบทเรียน
const contentDirectory = path.join(process.cwd(), 'content');

export type Post = {
  slug: string; // "chapter/lesson"
  frontmatter: {
    title: string;
    description?: string;
    date?: string;
    chapter?: string;      // ชื่อ folder chapter (e.g., "01-intro")
    chapterTitle?: string; // ชื่อ chapter ที่สวยงาม (e.g., "Chapter 1: Intro")
    [key: string]: any;
  };
  content: string;
  chapter: string; // Added chapter property
};

// Helper: อ่านไฟล์ทั้งหมดในโฟลเดอร์แบบ Recursive
function getFilesRecursively(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      // ถ้าเป็นโฟลเดอร์ ให้เข้าไปอ่านข้างในต่อ
      results = results.concat(getFilesRecursively(filePath));
    } else {
      // ถ้าเป็นไฟล์ .mdx ให้เก็บไว้
      if (file.endsWith('.mdx')) {
        results.push(filePath);
      }
    }
  });
  
  return results;
}

// อ่านรายชื่อบทเรียนทั้งหมดในคอร์ส (รวม Chapter ย่อย)
export function getCoursePosts(course: string) {
  const coursePath = path.join(contentDirectory, course);
  
  // ถ้าไม่มีโฟลเดอร์ ให้ return array ว่าง
  if (!fs.existsSync(coursePath)) return [];

  const filePaths = getFilesRecursively(coursePath);

  const posts = filePaths.map((filePath) => {
      // สร้าง Slug โดยตัดส่วน path ของ course ออก
      // e.g. "content/c-plus-plus/01-intro/01-hello.mdx" -> "01-intro/01-hello"
      const relativePath = path.relative(coursePath, filePath);
      const slug = relativePath.replace(/\\/g, '/').replace(/\.mdx$/, ''); // รองรับ Windows path
      
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      // Extract chapter from folder name (first part of slug)
      const parts = slug.split('/');
      const chapter = parts.length > 1 ? parts[0] : 'General';

      return {
        slug,
        frontmatter: data,
        chapter, 
      };
    });
    
  // เรียงลำดับตามชื่อไฟล์/โฟลเดอร์
  return posts.sort((a, b) => a.slug.localeCompare(b.slug));
}

// อ่านเนื้อหาบทเรียนตาม Slug (รองรับ nested slug เช่น "01-intro/01-hello")
export function getPostBySlug(course: string, slugArray: string[]) {
  // slugArray มาจาก [...slug] ใน Next.js (เช่น ["01-intro", "01-hello"])
  const slugPath = slugArray.join('/');
  const filePath = path.join(contentDirectory, course, `${slugPath}.mdx`);
  
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    slug: slugPath,
    frontmatter: data,
    content,
  };
}

// ดึงรายชื่อคอร์สทั้งหมด (ชื่อโฟลเดอร์)
export function getAllCourses() {
    if (!fs.existsSync(contentDirectory)) return [];
    return fs.readdirSync(contentDirectory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}
