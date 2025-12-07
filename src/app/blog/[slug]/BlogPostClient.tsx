"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import FaultyTerminal from "@/components/FaultyTerminal";
import "highlight.js/styles/atom-one-dark.css";

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

export default function BlogPostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const metaResponse = await fetch("/api/data/blog");
      const metaResult = await metaResponse.json();
      if (metaResult.success) {
        const foundPost = metaResult.data.find(
          (p: BlogPost) => p.slug === slug
        );
        if (foundPost) {
          setPost(foundPost);

          const contentResponse = await fetch(`/blog/posts/${slug}/index.md`);
          if (contentResponse.ok) {
            const markdown = await contentResponse.text();
            setContent(markdown);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch blog post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#00adb4] font-mono">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400 font-mono">Post not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative font-sans">
      <div className="fixed inset-0 z-0">
        <FaultyTerminal
          scale={1.2}
          gridMul={[2, 1]}
          digitSize={1.5}
          timeScale={0.2}
          scanlineIntensity={0.2}
          glitchAmount={0.8}
          flickerAmount={0.5}
          noiseAmp={0.8}
          chromaticAberration={0}
          dither={0.5}
          curvature={0.1}
          tint="#00adb4"
          mouseReact={true}
          mouseStrength={0.15}
          pageLoadAnimation={true}
          brightness={0.3}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 font-mono text-sm flex items-center justify-between">
          <div className="text-gray-400">
            <Link
              href="/"
              className="text-[#00adb4] hover:text-[#0f7f82] transition-colors"
            >
              ~
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/blog"
              className="text-[#00adb4] hover:text-[#0f7f82] transition-colors"
            >
              blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">{post.slug}</span>
          </div>
          <Link
            href="/blog"
            className="text-[#00adb4] hover:text-[#0f7f82] font-mono text-sm transition-colors flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="hidden sm:inline">back</span>
          </Link>
        </div>

        <div className="bg-[#0d1117] border border-gray-800 rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-[#161b22] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-3 text-gray-400 font-mono text-sm">
                ~/blog/{post.slug}
              </span>
            </div>
            <div className="text-gray-400 font-mono text-xs hidden sm:block">
              {post.readingTime} min read
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 max-h-[calc(100vh-150px)] overflow-y-auto terminal-scrollbar">
            <article>
              <header className="mb-6 pb-6 border-b border-gray-800">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00adb4] mb-4">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-mono mb-4">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 bg-[#00adb4]/10 text-[#00adb4] rounded">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-1 bg-gray-800 text-gray-400 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </header>

              {post.coverImage && (
                <div className="mb-8">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full rounded-lg border border-gray-800"
                  />
                </div>
              )}

              <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1
                        className="text-2xl sm:text-3xl font-bold text-[#00adb4] mt-8 mb-4"
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2
                        className="text-xl sm:text-2xl font-bold text-[#00adb4] mt-6 mb-3"
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        className="text-lg sm:text-xl font-bold text-[#00adb4] mt-4 mb-2"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p
                        className="text-gray-300 leading-relaxed mb-4"
                        {...props}
                      />
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        className="text-[#00adb4] hover:text-[#0f7f82] underline underline-offset-2 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                    code: ({ node, inline, ...props }: any) =>
                      inline ? (
                        <code
                          className="bg-gray-800 text-[#00adb4] px-1.5 py-0.5 rounded text-sm font-mono"
                          {...props}
                        />
                      ) : (
                        <code
                          className="block bg-[#1e1e1e] p-4 rounded-lg overflow-x-auto text-sm"
                          {...props}
                        />
                      ),
                    pre: ({ node, ...props }) => (
                      <pre
                        className="bg-[#1e1e1e] p-4 rounded-lg overflow-x-auto mb-4 border border-gray-800"
                        {...props}
                      />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4"
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className="list-decimal list-inside text-gray-300 space-y-2 mb-4 ml-4"
                        {...props}
                      />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className="border-l-4 border-[#00adb4] pl-4 italic text-gray-400 my-4"
                        {...props}
                      />
                    ),
                    img: ({ node, ...props }) => {
                      const src =
                        typeof props.src === "string" &&
                        props.src.startsWith("./")
                          ? `/blog/posts/${post.slug}/${props.src.slice(2)}`
                          : props.src;
                      return (
                        <img
                          className="rounded-lg border border-gray-800 my-4 w-full"
                          {...props}
                          src={src}
                        />
                      );
                    },
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto my-4">
                        <table
                          className="min-w-full border border-gray-800 rounded-lg"
                          {...props}
                        />
                      </div>
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        className="bg-gray-800 text-[#00adb4] px-4 py-2 text-left font-mono text-sm"
                        {...props}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td
                        className="border-t border-gray-800 px-4 py-2 text-gray-300 text-sm"
                        {...props}
                      />
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>

              <footer className="mt-8 pt-6 border-t border-gray-800">
                <div className="text-sm text-gray-500 font-mono">
                  Last modified:{" "}
                  {new Date(post.lastModified).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </footer>
            </article>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm border border-gray-700 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#00adb4] animate-pulse" />
            <span className="text-xs sm:text-sm text-gray-400 font-mono">
              Built with Passion • Rejaka Portfolio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
