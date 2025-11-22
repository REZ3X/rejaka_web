import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const achievements = [
    {
      title: "Finalist – Web Development, National Competition Silogy Expo",
      issuer:
        "Himpunan Mahasiswa Sistem Informasi, Universitas Singaperbangsa Karawang",
      year: "2025",
      description:
        "Selected as a finalist in the national-level Silogy Expo web development competition, highlighting innovation and frontend proficiency.",
      image: "/assets/silogy.jpeg",
    },
    {
      title: "Top 10 – ByProject Student Web Dev Competition",
      issuer: "Universitas Teknologi Yogyakarta",
      year: "2025",
      description:
        "Secured a position among the top ten student teams in the ByProject Web Development category, demonstrating strong coding and collaborative skills.",
      image: "/assets/pemrograman_by_project.jpeg",
    },
    {
      title: "Finalist – Sagasitas Web Building Competition",
      issuer: "Sagasitas Indonesia",
      year: "2024",
      description:
        "Led development of an accessibility‑focused web application, earning finalist status in the national Web Building competition.",
      image: "/assets/gss.png",
    },
    {
      title: "1st Place – National Digital Hero Competition",
      issuer: "PT. ITHO INDOSTOCK",
      year: "2024",
      description:
        "Awarded first place for deploying an AI‑powered solution addressing a real company problem in the National Digital Hero competition.",
      image: "/assets/kpdn.png",
    },
  ];

  return NextResponse.json({ success: true, data: achievements });
}
