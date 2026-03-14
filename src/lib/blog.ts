import fs from "fs";
import path from "path";

export function getBlogContent(slug: string): string {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "blog",
      "posts",
      slug,
      "index.md"
    );
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    console.error(`Failed to read blog content for slug: ${slug}`);
    return "";
  }
}

export function getAllBlogSlugs(): string[] {
  try {
    const postsDir = path.join(process.cwd(), "public", "blog", "posts");
    return fs.readdirSync(postsDir).filter((f) => {
      const stat = fs.statSync(path.join(postsDir, f));
      return stat.isDirectory();
    });
  } catch {
    console.error("Failed to read blog posts directory");
    return [];
  }
}
