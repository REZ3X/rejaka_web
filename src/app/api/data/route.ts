import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const [
      aboutRes,
      techStacksRes,
      projectsRes,
      experiencesRes,
      achievementsRes,
      socialsRes,
    ] = await Promise.all([
      fetch(`${baseUrl}/api/data/about`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/data/techStacks`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/data/projects`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/data/experiences`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/data/achievements`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/data/socials`, { cache: "no-store" }),
    ]);

    const [about, techStacks, projects, experiences, achievements, socials] =
      await Promise.all([
        aboutRes.json(),
        techStacksRes.json(),
        projectsRes.json(),
        experiencesRes.json(),
        achievementsRes.json(),
        socialsRes.json(),
      ]);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        about: about.data,
        techStacks: techStacks.data,
        projects: projects.data,
        experiences: experiences.data,
        achievements: achievements.data,
        socials: socials.data,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
