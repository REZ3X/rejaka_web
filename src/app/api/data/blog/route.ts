import { NextResponse } from "next/server";
import { blogPosts } from "@/data/blogPosts";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: blogPosts,
    total: blogPosts.length,
  });
}
