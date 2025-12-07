import { Metadata } from "next";
import BlogPostClient from "@/app/blog/[slug]/BlogPostClient";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  readingTime: number;
  tags: string[];
  category: string;
  lastModified: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://rejaka.id";
    const response = await fetch(`${baseUrl}/api/data/blog`, {
      cache: "no-store",
    });
    const result = await response.json();
    if (result.success) {
      return result.data.find((p: BlogPost) => p.slug === slug) || null;
    }
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found - Rejaka Portfolio",
      description: "The requested blog post could not be found.",
    };
  }

  const baseUrl = "https://rejaka.id";
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} - Rejaka Portfolio`,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      post.category,
      "programming",
      "web development",
      "tutorial",
      "Rejaka Abimanyu Susanto",
    ],
    authors: [{ name: "Rejaka Abimanyu Susanto", url: baseUrl }],
    creator: "Rejaka Abimanyu Susanto",
    publisher: "Rejaka Abimanyu Susanto",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "Rejaka Portfolio",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.lastModified,
      authors: ["Rejaka Abimanyu Susanto"],
      tags: post.tags,
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@rejaka",
      images: post.coverImage ? [post.coverImage] : [],
    },
    alternates: {
      canonical: postUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export async function generateStaticParams() {
  try {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://rejaka.id";
    const response = await fetch(`${baseUrl}/api/data/blog`, {
      cache: "no-store",
    });
    const result = await response.json();
    if (result.success) {
      return result.data.map((post: BlogPost) => ({
        slug: post.slug,
      }));
    }
  } catch (error) {
    console.error("Failed to generate static params:", error);
  }
  return [];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
