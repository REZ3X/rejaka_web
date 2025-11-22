import { NextResponse } from "next/server";
import { GET as getAbout } from "./about/route";
import { GET as getTechStacks } from "./techStacks/route";
import { GET as getProjects } from "./projects/route";
import { GET as getExperiences } from "./experiences/route";
import { GET as getAchievements } from "./achievements/route";
import { GET as getSocials } from "./socials/route";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const [
      aboutRes,
      techStacksRes,
      projectsRes,
      experiencesRes,
      achievementsRes,
      socialsRes,
    ] = await Promise.all([
      getAbout(),
      getTechStacks(new Request("http://localhost/api/data/techStacks")),
      getProjects(new Request("http://localhost/api/data/projects")),
      getExperiences(),
      getAchievements(),
      getSocials(),
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
    console.error("Error in /api/data:", error);
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
