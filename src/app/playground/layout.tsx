import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Playground - Test & Build API Requests | Rejaka Portfolio",
  description:
    "Interactive API playground to test and experiment with REST API endpoints. Build custom routes, send HTTP requests (GET, POST, PUT, DELETE), and test API responses in real-time. Perfect for developers and API testing.",
  keywords: [
    "API playground",
    "API testing",
    "REST API tester",
    "HTTP request builder",
    "API development",
    "API request tool",
    "test API endpoints",
    "custom API routes",
    "API mock data",
    "developer tools",
    "API debugging",
    "Postman alternative",
    "API console",
    "HTTP client",
    "API experimentation",
  ],
  authors: [{ name: "Rejaka Abimanyu Susanto" }],
  openGraph: {
    title: "API Playground - Test & Build API Requests | Rejaka Portfolio",
    description:
      "Interactive API playground for testing REST endpoints, creating custom routes, and experimenting with HTTP requests. Build, test, and debug APIs in real-time.",
    url: "https://rejaka.id/playground",
    siteName: "Rejaka Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "API Playground - Test & Build API Requests | Rejaka Portfolio",
    description:
      "Interactive API playground for testing REST endpoints and building custom API requests. Perfect for developers and API testing.",
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

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
