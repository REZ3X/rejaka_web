"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  HiOutlineMagnifyingGlassMinus,
  HiOutlineMagnifyingGlassPlus,
  HiOutlineXMark,
} from "react-icons/hi2";
import FaultyTerminal from "@/components/FaultyTerminal";

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

interface BlogImage {
  src: string;
  alt: string;
}

const getInlineCodeText = (children: ReactNode) => {
  if (Array.isArray(children)) {
    return children.map((child) => String(child ?? "")).join("");
  }

  return String(children ?? "");
};

const shouldRenderInlineCodeAsText = (value: string) => {
  const normalized = value.trim();

  if (/^\/\d+$/.test(normalized)) {
    return true;
  }

  if (/^\d{1,3}(?:\.\d{1,3}){3}\/\d+$/.test(normalized)) {
    return true;
  }

  return false;
};

export default function BlogPostClient({
  initialPost,
  initialContent,
}: {
  initialPost: BlogPost | null;
  initialContent: string;
}) {
  const post = initialPost;
  const content = initialContent;
  const [selectedImage, setSelectedImage] = useState<BlogImage | null>(null);
  const [imageZoom, setImageZoom] = useState(1);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
        return;
      }

      if (event.key === "+" || event.key === "=") {
        setImageZoom((currentZoom) => Math.min(currentZoom + 0.25, 3));
      }

      if (event.key === "-") {
        setImageZoom((currentZoom) => Math.max(currentZoom - 0.25, 0.5));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [selectedImage]);

  const openImageModal = (src: string | undefined, alt: string) => {
    if (!src) {
      return;
    }

    setImageZoom(1);
    setSelectedImage({ src, alt });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setImageZoom(1);
  };

  const zoomIn = () => {
    setImageZoom((currentZoom) => Math.min(currentZoom + 0.25, 3));
  };

  const zoomOut = () => {
    setImageZoom((currentZoom) => Math.max(currentZoom - 0.25, 0.5));
  };

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
        <nav
          className="mb-4 font-mono text-sm flex items-center justify-between"
          aria-label="Breadcrumb"
        >
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
        </nav>

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
                  <button
                    type="button"
                    className="block w-full cursor-zoom-in"
                    onClick={() =>
                      openImageModal(
                        post.coverImage,
                        `Cover image for ${post.title}`,
                      )
                    }
                  >
                    <img
                      src={post.coverImage}
                      alt={`Cover image for ${post.title}`}
                      className="w-full max-h-[60vh] rounded-lg border border-gray-800 object-contain bg-black/20"
                    />
                  </button>
                </div>
              )}

              <Script
                async={true}
                data-cfasync="false"
                src="https://passivealexis.com/2f9635cf17feac74d408b29d43d7a956/invoke.js"
              />
              <div id="container-2f9635cf17feac74d408b29d43d7a956"></div>

              <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h2
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
                    code: ({ node, children, ...props }: any) => {
                      const codeText = getInlineCodeText(children);
                      return shouldRenderInlineCodeAsText(codeText) ? (
                        <span className="text-gray-300">{children}</span>
                      ) : (
                        <code
                          className="bg-gray-800 text-[#00adb4] px-1.5 py-0.5 rounded text-sm font-mono"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    pre: ({ node, ...props }: any) => {
                      const codeNode = Array.isArray(node?.children)
                        ? node.children[0]
                        : undefined;
                      const rawBlockText = Array.isArray(codeNode?.children)
                        ? codeNode.children
                            .map((child: any) =>
                              typeof child?.value === "string"
                                ? child.value
                                : "",
                            )
                            .join("")
                        : "";
                      const normalizedBlockText = rawBlockText.replace(
                        /^\n+|\n+$/g,
                        "",
                      );

                      return (
                        <pre
                          className="my-4 overflow-x-auto rounded-lg border border-gray-800 bg-[#1e1e1e] p-4 text-sm leading-6"
                          {...props}
                        >
                          <code className="block whitespace-pre font-mono text-[#00adb4]">
                            {normalizedBlockText}
                          </code>
                        </pre>
                      );
                    },
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
                      const rawSrc =
                        typeof props.src === "string" ? props.src : undefined;
                      const src = rawSrc?.startsWith("./")
                        ? `/blog/posts/${post.slug}/${rawSrc.slice(2)}`
                        : rawSrc;
                      const alt = props.alt || `Image in ${post.title}`;
                      if (!src) {
                        return null;
                      }
                      return (
                        <button
                          type="button"
                          className="group my-4 block w-full cursor-zoom-in text-left"
                          onClick={() => openImageModal(src, alt)}
                        >
                          <img
                            className="w-full max-h-[70vh] rounded-lg border border-gray-800 object-contain bg-black/20 transition-transform duration-200 group-hover:scale-[1.01]"
                            {...props}
                            src={src}
                            alt={alt}
                            loading="lazy"
                          />
                        </button>
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
                <Script
                  async={true}
                  data-cfasync="false"
                  src="https://passivealexis.com/2f9635cf17feac74d408b29d43d7a956/invoke.js"
                />
                <div id="container-2f9635cf17feac74d408b29d43d7a956"></div>
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

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={closeImageModal}
          role="presentation"
        >
          <div
            className="relative flex h-full w-full max-w-6xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute right-0 top-0 flex gap-2 sm:right-2 sm:top-2">
              <button
                type="button"
                onClick={zoomOut}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-[#161b22]/90 text-gray-200 transition-colors hover:bg-[#1f242d]"
                aria-label="Zoom out"
              >
                <HiOutlineMagnifyingGlassMinus className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={zoomIn}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-[#161b22]/90 text-gray-200 transition-colors hover:bg-[#1f242d]"
                aria-label="Zoom in"
              >
                <HiOutlineMagnifyingGlassPlus className="h-5 w-5" />
              </button>
              <button
                type="button"
                ref={closeButtonRef}
                onClick={closeImageModal}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-[#161b22]/90 text-gray-200 transition-colors hover:bg-[#1f242d]"
                aria-label="Close image preview"
              >
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </div>

            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-gray-700 bg-[#0d1117]/95 shadow-2xl">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[88vh] max-w-[92vw] object-contain transition-transform duration-150"
                style={{ transform: `scale(${imageZoom})` }}
              />
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-gray-700 bg-[#161b22]/90 px-3 py-1 text-xs font-mono text-gray-300">
              Zoom {Math.round(imageZoom * 100)}%
            </div>
          </div>
        </div>
      )}
      <Script
        src="https://passivealexis.com/60/ea/4d/60ea4d001a372055f8d40709adc7c421.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
