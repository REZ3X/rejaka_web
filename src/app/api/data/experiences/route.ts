import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const experiences = [
    {
      title: "Freelance Web Developer",
      company: "Self-employed",
      period: "Dec 2023 – Present",
      responsibilities: [
        "Designed and delivered full-stack web solutions for clients",
        "Collaborated with designers on intuitive user interfaces",
        "Implemented responsive designs and optimized site performance",
        "Provided maintenance, updates, and enhancements post-launch",
      ],
    },
    {
      title: "Chief Information Technology Officer",
      company: "Slaviors",
      period: "Oct 2024 – Present",
      responsibilities: [
        "Lead the development of high-performance web applications using Next.js and MongoDB",
        "Design and implement API routes, database schemas, and scalable system architectures",
        "Conduct code reviews to ensure maintainability, quality, and adherence to best practices",
        "Oversee deployment processes, establish CI/CD pipelines, and manage release schedules",
      ],
    },
    {
      title: "Coordinator – Student Discipline Team",
      company: "SMKN 2 Depok Sleman",
      period: "September 2025 – November 2025",
      responsibilities: [
        "Led and coordinated volunteer security team activities",
        "Organized scheduling and communication among team members",
        "Acted as liaison between school administration and volunteers",
        "Mentored new volunteers on procedures and protocols",
      ],
    },
    {
      title: "Volunteer Security Personnel",
      company: "Student Discipline Team, SMKN 2 Depok Sleman",
      period: "September 2024 – November 2025",
      responsibilities: [
        "Monitored student activities and ensured school safety during events",
        "Assisted in crowd control and managed access during school functions",
        "Collaborated with disciplinarians to handle incidents efficiently",
        "Maintained order and enforced school regulations",
      ],
    },
    {
      title: "Web Developer – Karyasija (Volunteer)",
      company: "SMKN 2 Depok Sleman",
      period: "Jun 2025 – Oktober 2025",
      responsibilities: [
        "Contributed to development and maintenance of school website",
        "Implemented responsive layouts and backend logic",
        "Collaborated with faculty to update content and features",
        "Ensured site performance and accessibility standards",
      ],
    },
    {
      title: "Web Developer Apprenticeship",
      company: "PT. ITHO INDOSTOCK",
      period: "July 2024 – December 2024",
      responsibilities: [
        "Focused on frontend development in enterprise standards",
        "Built UI components and pages using React and Tailwind CSS",
        "Participated in chatbot integration for customer support",
        "Assisted with deployment and server-side configuration",
      ],
    },
  ];

  return NextResponse.json({ success: true, data: experiences });
}
