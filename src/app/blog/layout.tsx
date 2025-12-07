import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Technical Articles & Tutorials | Rejaka Portfolio",
  description:
    "Explore technical articles, tutorials, and guides on web development, cybersecurity, databases, Linux, and more. Written by Rejaka Abimanyu Susanto - Full-Stack Developer.",
  keywords: [
    "programming blog",
    "web development tutorials",
    "cybersecurity articles",
    "database tutorials",
    "Linux guides",
    "Next.js tutorials",
    "React articles",
    "SQL guides",
    "tech blog",
    "developer resources",
    "coding tutorials",
    "ethical hacking",
    "full stack development",
  ],
  authors: [{ name: "Rejaka Abimanyu Susanto" }],
  openGraph: {
    title: "Blog - Technical Articles & Tutorials | Rejaka Portfolio",
    description:
      "Technical articles, tutorials, and guides on web development, cybersecurity, databases, and more by Rejaka Abimanyu Susanto.",
    url: "https://rejaka.id/blog",
    siteName: "Rejaka Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Technical Articles & Tutorials | Rejaka Portfolio",
    description:
      "Technical articles and tutorials on web development, cybersecurity, databases, and more.",
    creator: "@rejaka",
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
