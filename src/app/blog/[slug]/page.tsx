import { Metadata } from "next";
import { blogPosts } from "@/data/blogPosts";
import { getBlogContent } from "@/lib/blog";
import BlogPostClient from "@/app/blog/[slug]/BlogPostClient";

export const dynamicParams = true;

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug) || null;
  const content = post ? getBlogContent(slug) : "";

  const baseUrl = "https://rejaka.id";

  return (
    <>
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Article",
                  "@id": `${baseUrl}/blog/${post.slug}#article`,
                  headline: post.title,
                  description: post.excerpt,
                  datePublished: post.date,
                  dateModified: post.lastModified,
                  author: {
                    "@type": "Person",
                    name: "Rejaka Abimanyu Susanto",
                    url: baseUrl,
                  },
                  publisher: {
                    "@type": "Person",
                    name: "Rejaka Abimanyu Susanto",
                    url: baseUrl,
                  },
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `${baseUrl}/blog/${post.slug}`,
                  },
                  image: post.coverImage
                    ? `${baseUrl}${post.coverImage}`
                    : undefined,
                  keywords: post.tags.join(", "),
                  articleSection: post.category,
                  inLanguage: "en-US",
                  wordCount: Math.round(post.readingTime * 200),
                },
                {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: baseUrl,
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Blog",
                      item: `${baseUrl}/blog`,
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: post.title,
                      item: `${baseUrl}/blog/${post.slug}`,
                    },
                  ],
                },
              ],
            }),
          }}
        />
      )}
      <BlogPostClient initialPost={post} initialContent={content} />
    </>
  );
}
