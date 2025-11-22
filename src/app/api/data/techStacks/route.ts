import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const techStacks = {
    frontend: [
      { name: "Next.js", category: "frontend" },
      { name: "React Native", category: "frontend" },
      { name: "TailwindCSS", category: "frontend" },
      { name: "Expo", category: "frontend" },
    ],
    backend: [
      { name: "Express", category: "backend" },
      { name: "Axum", category: "backend" },
      { name: "Node.js", category: "backend" },
    ],
    cloud: [
      { name: "Vercel", category: "cloud" },
      { name: "Cloudflare", category: "cloud" },
    ],
    devops: [
      { name: "Git", category: "devops" },
      { name: "GitHub", category: "devops" },
      { name: "GitLab", category: "devops" },
      { name: "NGINX", category: "devops" },
      { name: "PM2", category: "devops" },
      { name: "TOR Hidden Service", category: "devops" },
    ],
    language: [
      { name: "JavaScript/TypeScript", category: "language" },
      { name: "C", category: "language" },
      { name: "Rust", category: "language" },
    ],
    database: [
      { name: "MongoDB", category: "database" },
      { name: "Redis", category: "database" },
    ],
  };

  if (type && type in techStacks) {
    return NextResponse.json({
      success: true,
      data: techStacks[type as keyof typeof techStacks],
      filter: type,
    });
  }

  return NextResponse.json({ success: true, data: techStacks });
}
