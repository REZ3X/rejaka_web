"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ASCIIText from "@/components/ASCIIText";
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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, selectedCategory, selectedTag]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/data/blog");
      const result = await response.json();
      if (result.success) {
        setPosts(result.data);
        setFilteredPosts(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (selectedTag !== "All") {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    setFilteredPosts(filtered);
  };

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category))),
  ];
  const allTags = ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags)))];

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <header className="text-center mb-4">
          <div
            className="hidden sm:block -mt-2 -mb-12"
            role="img"
            aria-label="Blog ASCII Art Title"
          >
            <ASCIIText
              text="BLOG"
              enableWaves={true}
              asciiFontSize={8}
              textFontSize={150}
              planeBaseHeight={8}
            />
          </div>

          <div
            className="sm:hidden -mt-1 -mb-8"
            role="img"
            aria-label="Blog ASCII Art Title"
          >
            <ASCIIText
              text="BLOG"
              enableWaves={true}
              asciiFontSize={6}
              textFontSize={80}
              planeBaseHeight={6}
            />
          </div>

          <div className="flex justify-center gap-4 mt-1 sm:mt-2 mb-4 sm:mb-6">
            <Link
              href="/"
              className="inline-block relative z-30 px-3 py-1 text-[#00adb4] hover:text-[#0f7f82] font-mono text-sm underline underline-offset-4 decoration-2 transition-colors"
            >
              $ cd ~
            </Link>
            <Link
              href="/playground"
              className="inline-block relative z-30 px-3 py-1 text-[#00adb4] hover:text-[#0f7f82] font-mono text-sm underline underline-offset-4 decoration-2 transition-colors"
            >
              $ cd playground
            </Link>
          </div>
        </header>

        <div className="bg-[#0d1117] border border-gray-800 rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-[#161b22] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-3 text-gray-400 font-mono text-sm">
                ~/blog
              </span>
            </div>
            <div className="text-gray-400 font-mono text-xs">
              {filteredPosts.length} posts
            </div>
          </div>

          <div className="p-4 border-b border-gray-800 space-y-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="$ search posts..."
              className="w-full bg-[#161b22] text-gray-300 border border-gray-700 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00adb4]"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 bg-[#161b22] text-gray-300 border border-gray-700 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00adb4]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat}
                  </option>
                ))}
              </select>

              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="flex-1 bg-[#161b22] text-gray-300 border border-gray-700 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00adb4]"
              >
                {allTags.slice(0, 20).map((tag) => (
                  <option key={tag} value={tag}>
                    Tag: {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-4 max-h-[600px] overflow-y-auto terminal-scrollbar">
            {isLoading ? (
              <div className="text-center py-12 text-gray-500 font-mono">
                Loading posts...
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12 text-gray-500 font-mono">
                No posts found.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block bg-[#161b22] border border-gray-700 hover:border-[#00adb4] rounded-lg p-4 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-[#00adb4] group-hover:text-[#0f7f82] font-mono font-semibold text-sm sm:text-base transition-colors">
                        {post.title}
                      </h3>
                      <span className="text-xs text-gray-500 font-mono whitespace-nowrap">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {post.readingTime} min
                      </span>
                      <span className="px-2 py-0.5 bg-[#00adb4]/10 text-[#00adb4] rounded">
                        {post.category}
                      </span>
                      <div className="flex-1 flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] text-gray-600">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
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
