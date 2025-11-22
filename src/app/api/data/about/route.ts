import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const about = {
    name: "Rejaka Abimanyu Susanto",
    nicknames: ["Abimanyu", "Abim", "Rejaka", "Reja"],
    onlineHandles: ["REZ3X", "Xi4N", "VI3LEN"],
    title: "Full-Stack Developer",
    focus: "Backend Development",
    bio: "Hi! My name is Rejaka Abimanyu Susanto, and people usually call me Abimanyu, Abim, Rejaka, or Reja. Online, I go by names like REZ3X, Xi4N, and VI3LEN. I'm a passionate full-stack developer with a strong focus on backend work. I specialize in building comprehensive, powerful, and reliable backend applications using efficient and modern tech stacks. I also work as a web developer, creating web applications that meet high-technology requirements, and I occasionally explore other types of software development, including mobile apps.",
    image: "/assets/rez3x.webp",
  };

  return NextResponse.json({ success: true, data: about });
}
