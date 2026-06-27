import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Rejaka Abimanyu Susanto",
  description:
    "Professional CV and Resume of Rejaka Abimanyu Susanto. Fullstack Developer specializing in Next.js, React, Express, Axum, and Database Design.",
  keywords: [
    "Rejaka Abimanyu Susanto",
    "resume",
    "CV",
    "portfolio",
    "full-stack developer",
    "Next.js",
    "React",
    "Axum",
  ],
  authors: [{ name: "Rejaka Abimanyu Susanto" }],
  openGraph: {
    title: "Resume | Rejaka Abimanyu Susanto - Full-Stack Developer",
    description:
      "Explore the professional experience, skills, and educational background of Rejaka Abimanyu Susanto. Read online or print to PDF.",
    url: "https://rejaka.id/resume",
    siteName: "Rejaka Abimanyu Susanto Portfolio",
    images: [
      {
        url: "https://rejaka.id/assets/rez3x.png",
        width: 1200,
        height: 630,
        alt: "Rejaka Abimanyu Susanto - Resume Preview",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | Rejaka Abimanyu Susanto",
    description:
      "Explore the professional experience, skills, and educational background of Rejaka Abimanyu Susanto. Read online or print to PDF.",
    images: ["https://rejaka.id/assets/rez3x.png"],
    creator: "@rejaka",
  },
  alternates: {
    canonical: "https://rejaka.id/resume",
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

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
