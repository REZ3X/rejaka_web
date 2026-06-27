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
    bio: "Hi! My name is Rejaka Abimanyu Susanto. I'm a passionate developer and tech enthusiast with a strong focus on building web applications. I specialize in building comprehensive, powerful, and reliable systems, using efficient and modern tech stacks such as Next.js, React, and Axum. MTCNA Certified. Open for freelance works.",
    image: "/assets/rez3x.png",
  };

  return NextResponse.json({ success: true, data: about });
}
