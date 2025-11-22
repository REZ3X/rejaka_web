import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rejaka.id"),
  title: {
    template: "%s | Rejaka Abimanyu Susanto",
    default: "Rejaka Abimanyu Susanto | Full-Stack Developer",
  },
  description:
    "Full-stack developer portfolio by Rejaka Abimanyu Susanto. Interactive API dashboard with real-time terminal, tech stack explorer, and projects.",
  keywords: [
    "Rejaka Abimanyu Susanto",
    "Full Stack Web Developer Indonesia",
    "Next.js Developer Yogyakarta",
    "TypeScript React Developer",
    "MongoDB Database Engineer",
    "API Portfolio Dashboard",
    "Interactive Terminal Portfolio",
    "Real-time API Testing",

    "Next.js 16 App Router",
    "React 19 Developer",
    "Three.js WebGL Portfolio",
    "TypeScript Developer",
    "API Development Specialist",
    "Server-Side Rendering Expert",
    "Frontend Backend Developer",
    "Node.js Backend Engineer",
    "Tailwind CSS Expert",
    "Responsive Web Design",
    "WebAssembly Rust Developer",

    "Web Developer Yogyakarta",
    "Indonesia Software Engineer",
    "Yogyakarta Tech Professional",
    "Indonesian Full Stack Developer",

    "Portfolio API Explorer",
    "Interactive Developer Portfolio",
    "Terminal-based Portfolio",
    "RESTful API Showcase",
    "Modern Web Technologies",
    "WebSocket Real-time Apps",
    "Performance Optimization",
    "SEO Web Development",
    "Mobile-First Development",

    "Programming Competition Winner",
    "Digital Hero Competition",
    "Web Development Competition",
    "Tech Competition Finalist",

    "Slaviors Team Lead",
    "Open Source Contributor",
    "Tech Community Leader",
    "Freelance Web Developer",

    "rez3x developer",
    "REZ3X portfolio",
    "rejaka.id",
    "ghost chat developer",
    "rusted quotes creator",
  ],
  authors: [
    {
      name: "Rejaka Abimanyu Susanto",
      url: "https://rejaka.id",
    },
  ],
  creator: "Rejaka Abimanyu Susanto",
  publisher: "Rejaka Abimanyu Susanto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Technology",
  classification: "Portfolio Website",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Rejaka Abimanyu Susanto | Full-Stack Developer & Tech Innovator",
    description:
      "Interactive API portfolio dashboard of Rejaka Abimanyu Susanto - Full-stack web developer specializing in Next.js, React, TypeScript, Rust, and MongoDB. Award-winning developer and leader of the Slaviors development team.",
    url: "https://rejaka.id",
    siteName: "Rejaka Abimanyu Susanto - Developer Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/rez3x.webp",
        width: 1200,
        height: 630,
        alt: "Rejaka Abimanyu Susanto - Full-Stack Developer Portfolio",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rejaka",
    creator: "@rejaka",
    title: "Rejaka Abimanyu Susanto | Full-Stack Developer",
    description:
      "Award-winning full-stack developer from Yogyakarta. Specializing in Next.js, React, TypeScript, Rust, WebAssembly. Interactive API portfolio with real-time terminal logging.",
    images: {
      url: "/assets/rez3x.webp",
      alt: "Rejaka Abimanyu Susanto Portfolio Dashboard",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    other: {
      me: ["mailto:abim@rejaka.id", "https://rejaka.id"],
    },
  },
  alternates: {
    canonical: "https://rejaka.id",
    languages: {
      "en-US": "https://rejaka.id",
    },
  },
  applicationName: "Rejaka Portfolio API Dashboard",
  referrer: "origin-when-cross-origin",
  appLinks: {
    web: {
      url: "https://rejaka.id",
      should_fallback: true,
    },
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#00adb4",
    "msapplication-tap-highlight": "no",
    "theme-color": "#060910",
    "color-scheme": "dark",
    "content-type": "portfolio",
    "content-status": "live",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060910" },
    { media: "(prefers-color-scheme: light)", color: "#060910" },
  ],
  colorScheme: "dark",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {GA_ID && process.env.NODE_ENV === "production" && (
          <>
            <Script
              defer
              src="https://u.zxn.my.id/script.js"
              data-website-id="e3ef0132-7b9a-4654-8895-92239c28cb03"
            />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  content_group1: 'Portfolio',
                });
              `}
            </Script>
            <Script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3181855213430938"
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          </>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://rejaka.id/#person",
                  name: "Rejaka Abimanyu Susanto",
                  alternateName: [
                    "REZ3X",
                    "Xi4N",
                    "VI3LEN",
                    "Abimanyu",
                    "Abim",
                    "Rejaka",
                    "Reja",
                  ],
                  url: "https://rejaka.id",
                  image: {
                    "@type": "ImageObject",
                    url: "https://rejaka.id/assets/rez3x.webp",
                    width: 800,
                    height: 600,
                    caption:
                      "Rejaka Abimanyu Susanto - Full-Stack Web Developer",
                  },
                  sameAs: [
                    "https://github.com/REZ3X",
                    "https://linkedin.com/in/rejaka-me",
                  ],
                  jobTitle: "Full-Stack Web Developer",
                  description:
                    "Award-winning full-stack web developer, database engineer, and tech innovator specializing in modern web technologies including Next.js, React, TypeScript, Rust, and WebAssembly",
                  worksFor: {
                    "@type": "Organization",
                    name: "Slaviors Development Team",
                    url: "https://rejaka.id",
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Yogyakarta",
                    addressRegion: "Special Region of Yogyakarta",
                    addressCountry: "Indonesia",
                  },
                  knowsAbout: [
                    "Web Development",
                    "Full-Stack Development",
                    "Next.js",
                    "React",
                    "TypeScript",
                    "Rust",
                    "WebAssembly",
                    "MongoDB",
                    "Database Engineering",
                    "API Development",
                    "Three.js",
                    "WebGL",
                    "Node.js",
                    "JavaScript",
                    "Tailwind CSS",
                    "SEO Optimization",
                    "Performance Optimization",
                  ],
                  hasOccupation: {
                    "@type": "Occupation",
                    name: "Full-Stack Web Developer",
                    occupationLocation: {
                      "@type": "City",
                      name: "Yogyakarta, Indonesia",
                    },
                    skills: [
                      "Next.js Development",
                      "React Development",
                      "TypeScript Programming",
                      "Rust Programming",
                      "WebAssembly",
                      "MongoDB Database Design",
                      "API Development",
                      "Frontend Development",
                      "Backend Development",
                      "Three.js 3D Graphics",
                    ],
                  },
                  award: [
                    "1st Place National Digital Hero Competition 2024",
                    "Finalist Sagasitas Web Building Competition 2024",
                    "Top 10 ByProject Student Web Dev Competition 2025",
                    "Finalist Silogy Expo Web Development Competition 2025",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://rejaka.id/#website",
                  url: "https://rejaka.id",
                  name: "Rejaka Abimanyu Susanto Portfolio",
                  description:
                    "Interactive API portfolio dashboard with real-time terminal logging, project explorer, and tech stack visualization",
                  publisher: {
                    "@id": "https://rejaka.id/#person",
                  },
                  inLanguage: "en-US",
                },
                {
                  "@type": "WebApplication",
                  "@id": "https://rejaka.id/#webapp",
                  name: "Rejaka Portfolio API Dashboard",
                  description:
                    "Interactive portfolio dashboard featuring real-time API testing, terminal logging, and comprehensive project showcase",
                  url: "https://rejaka.id",
                  applicationCategory: "DeveloperApplication",
                  operatingSystem: "Any",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                  creator: {
                    "@id": "https://rejaka.id/#person",
                  },
                },
              ],
            }),
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />

        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        <link
          rel="preload"
          href="/assets/rez3x.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
