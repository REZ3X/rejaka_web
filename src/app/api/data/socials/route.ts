import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const socials = {
    contactInfo: [
      {
        type: "email",
        label: "Email",
        value: "abim@rejaka.id",
      },
      {
        type: "phone",
        label: "Phone",
        value: "+62 (821) 4188-4664",
      },
    ],
    socialLinks: [
      {
        type: "social",
        label: "GitHub",
        value: "github.com/REZ3X",
        url: "https://github.com/REZ3X",
      },
      {
        type: "social",
        label: "LinkedIn",
        value: "linkedin.com/in/rejaka-me",
        url: "https://www.linkedin.com/in/rejaka-me/",
      },
      {
        type: "social",
        label: "Instagram",
        value: "@rejakasusanto",
        url: "https://instagram.com/rejakasusanto",
      },
    ],
  };

  return NextResponse.json({ success: true, data: socials });
}
