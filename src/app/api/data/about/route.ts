import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const about = {
    name: "Rejaka Abimanyu Susanto",
    // nicknames: ["Abimanyu", "Abim", "Rejaka", "Reja"],
    // onlineHandles: ["REZ3X", "Xi4N", "VI3LEN"],
    // title: "Full-Stack Developer",
    // focus: "Backend Development",
    bio: "Hi! My name is Rejaka Abimanyu Susanto. I'm a passionate developer and tech enthusiast with a strong focus on building web applications. I specialize in building comprehensive, powerful, and reliable systems, using efficient and modern tech stacks. I also have the opportunity to lead the technical and project sides of [Slaviors](https://slaviors.id), a team of developers who share the same goal to create innovative and impactful software solutions for business.",
    image: "/assets/rez3x.png",
  };

  return NextResponse.json({ success: true, data: about });
}
