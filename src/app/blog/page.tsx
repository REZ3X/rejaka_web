import { blogPosts } from "@/data/blogPosts";
import BlogListClient from "./BlogListClient";

export default function BlogPage() {
  return <BlogListClient initialPosts={blogPosts} />;
}
