import { NextResponse } from "next/server";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  readingTime: number;
  tags: string[];
  category: string;
  lastModified: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "triggerDatabaseSQL",
    title: "Database Triggers Explained: Automatic SQL Execution Made Simple",
    date: "2025-09-19",
    excerpt:
      "Master database triggers - the automatic SQL code that runs when data changes. Learn BEFORE/AFTER triggers, practical examples, and best practices for maintaining data integrity and automation in MySQL and other databases.",
    coverImage: "",
    readingTime: 12,
    tags: [
      "Database Triggers",
      "SQL",
      "MySQL",
      "Database Automation",
      "Data Integrity",
      "Backend Development",
      "Database Management",
      "SQL Events",
      "Database Design",
      "Stored Procedures",
    ],
    category: "Tutorial",
    lastModified: "2025-09-19",
  },
  {
    slug: "ethicalHackingOne",
    title:
      "Introduction to Ethical Hacking: Essential Steps and Tools You Must Know",
    date: "2025-09-03",
    excerpt:
      "Complete beginner's guide to ethical hacking - covering the 5 fundamental phases, essential tools like Nmap, VM scanning practice, and best practices in penetration testing. Learn how to become a responsible white hat hacker.",
    coverImage: "",
    readingTime: 25,
    tags: [
      "Ethical Hacking",
      "Penetration Testing",
      "Cybersecurity",
      "Nmap",
      "Information Security",
      "White Hat Hacking",
      "Network Security",
      "Security Assessment",
      "Vulnerability Testing",
      "Reconnaissance",
      "Security Tools",
    ],
    category: "Tutorial",
    lastModified: "2025-09-03",
  },
  {
    slug: "hiddenServiceTutorial",
    title:
      "Deploy Hidden Service Web in Linux: The Complete Guide (with Vanity .onion Domains)",
    date: "2025-08-31",
    excerpt:
      "Complete tutorial for deploying web applications as Tor hidden services on Linux. Learn nginx reverse proxy setup, Tor configuration, and generating custom vanity .onion domains for professional anonymous web services.",
    coverImage: "/blog/posts/hiddenServiceTutorial/cover.webp",
    readingTime: 22,
    tags: [
      "Tor",
      "Hidden Service",
      "Privacy",
      "Linux",
      "Nginx",
      "Security",
      "Onion Service",
      "Anonymous Web",
      "Vanity Domain",
    ],
    category: "Tutorial",
    lastModified: "2025-08-31",
  },
  {
    slug: "CIA",
    title:
      "CIA Triad Explained: The Foundation of Cybersecurity (with Real Case Studies)",
    date: "2025-08-25",
    excerpt:
      "A comprehensive guide to understanding the CIA Triad - Confidentiality, Integrity, and Availability. Learn cybersecurity fundamentals with real-world case studies including the BSI ransomware attack analysis.",
    coverImage: "",
    readingTime: 15,
    tags: [
      "Cybersecurity",
      "CIA Triad",
      "Information Security",
      "Case Study",
      "Risk Management",
    ],
    category: "Guide",
    lastModified: "2025-08-25",
  },
  {
    slug: "DataFlowDiagram",
    title: "Data Flow Diagram (DFD) Explained with Examples",
    date: "2025-08-22",
    excerpt:
      "A comprehensive guide to understanding Data Flow Diagrams (DFD) for system analysis and design. Learn DFD symbols, levels, and how to create effective diagrams for inventory systems.",
    coverImage: "",
    readingTime: 12,
    tags: [
      "DFD",
      "System Analysis",
      "Data Flow",
      "System Design",
      "Documentation",
    ],
    category: "Guide",
    lastModified: "2025-08-22",
  },
  {
    slug: "databaseNormalization",
    title: "Database Normalization Explained (with Examples)",
    date: "2025-08-22",
    excerpt:
      "A comprehensive guide to understanding database normalization concepts, from 1NF to BCNF. Learn why organizing data properly matters and how to avoid common database design pitfalls.",
    coverImage: "",
    readingTime: 7,
    tags: [
      "Database",
      "Normalization",
      "SQL",
      "Data Structure",
      "Database Design",
    ],
    category: "Guide",
    lastModified: "2025-08-22",
  },
  {
    slug: "gvmInstall",
    title: "How to Install Go Version Manager (GVM) on Linux",
    date: "2025-08-19",
    excerpt:
      "Step-by-step guide to installing Go Version Manager (GVM) on Linux. Perfect for managing multiple Go versions.",
    coverImage: "/blog/posts/gvmInstall/cover.png",
    readingTime: 10,
    tags: ["Go", "GVM", "Linux", "Development"],
    category: "Tutorial",
    lastModified: "2025-08-19",
  },
  {
    slug: "nvmWindows",
    title: "Installing Node Version Manager (NVM) and Node.js on Windows",
    date: "2025-07-27",
    excerpt:
      "Step-by-step guide to installing Node Version Manager (NVM) and Node.js on Windows.",
    coverImage: "/blog/posts/nvmWindows/cover.webp",
    readingTime: 20,
    tags: ["Windows", "NVM", "Node.js", "Installation", "Tutorial"],
    category: "Tutorial",
    lastModified: "2025-07-27",
  },
  {
    slug: "laravelSetup",
    title: "Laravel Starter Kit, Composer, and PHP Setup on Linux Debian",
    date: "2025-07-26",
    excerpt:
      "Step-by-step guide to installing PHP, Composer, and Laravel Starter Kit on Linux Debian. Perfect for setting up your development environment.",
    coverImage: "/blog/posts/laravelSetup/cover.png",
    readingTime: 20,
    tags: [
      "Linux",
      "Debian",
      "PHP",
      "Composer",
      "Laravel",
      "Installation",
      "Tutorial",
      "Web Development",
      "Setup",
    ],
    category: "Tutorial",
    lastModified: "2025-07-26",
  },
  {
    slug: "windows10Tutorial",
    title:
      "Installing Windows 10 [error_encrypted_permission error] (Bonus: Installing Autodesk EAGLE)",
    date: "2025-07-20",
    excerpt:
      "Step-by-step guide to installing Windows 10, plus bonus tips for installing Autodesk EAGLE.",
    coverImage: "/blog/posts/windows10Tutorial/cover.jpeg",
    readingTime: 25,
    tags: [
      "Windows 10",
      "Installation",
      "Tutorial",
      "Permssion Error",
      "Autodesk EAGLE",
    ],
    category: "Tutorial",
    lastModified: "2025-07-20",
  },
  {
    slug: "digitalConfess",
    title: "Want to Confess Your Feeling? But Don't Know How?",
    date: "2025-07-10",
    excerpt: "Confessing your feeling through Lofess",
    coverImage: "/blog/posts/digitalConfess/cover.png",
    readingTime: 3,
    tags: ["Confession", "Lofess", "Feelings", "Relationships"],
    category: "Project",
    lastModified: "2025-07-10",
  },
  {
    slug: "freeDevServices",
    title: "Free Services Every Developer Should Know About",
    date: "2025-07-09",
    excerpt:
      "A curated list of free services and tools that can supercharge your development workflow without spending a dime.",
    coverImage: "/blog/posts/freeDevServices/tools.jpg",
    readingTime: 6,
    tags: [
      "Free Tools",
      "Developer Resources",
      "Web Development",
      "APIs",
      "Productivity",
    ],
    category: "Tools",
    lastModified: "2025-07-09",
  },
  {
    slug: "databaseSQL",
    title: "Working With SQL Databases",
    date: "2025-02-07",
    excerpt:
      "Learn how to set up and work with SQL databases for your web applications. Complete guide covering MySQL setup, table creation, and basic operations.",
    coverImage: "/blog/posts/databaseSQL/databases.png",
    readingTime: 6,
    tags: ["SQL", "Database", "MySQL", "Backend", "Tutorial"],
    category: "Tutorial",
    lastModified: "2025-02-07",
  },
  {
    slug: "dirAndFile",
    title: "Understanding Directories and Files in Linux",
    date: "2025-02-03",
    excerpt:
      "A comprehensive guide to working with directories and files in the Linux command line. Learn essential commands for file management.",
    coverImage: "/blog/posts/dirAndFile/cmd.png",
    readingTime: 5,
    tags: ["Linux", "Command Line", "File Management", "Terminal", "Tutorial"],
    category: "Tutorial",
    lastModified: "2025-02-03",
  },
  {
    slug: "nvmTutorial",
    title: "Node Version Manager (NVM) Tutorial Linux",
    date: "2025-02-03",
    excerpt:
      "How to manage multiple Node.js versions with NVM on Linux. Step-by-step installation and usage guide.",
    coverImage: "/blog/posts/nvmTutorial/nvm.png",
    readingTime: 6,
    tags: ["Node.js", "NVM", "Linux", "JavaScript", "Development Tools"],
    category: "Tutorial",
    lastModified: "2025-02-03",
  },
  {
    slug: "simpleCalculator",
    title: "Building a Simple Calculator with Next.js",
    date: "2025-02-05",
    excerpt:
      "Step-by-step guide to creating a functional calculator application with Next.js and React. Perfect for beginners learning React.",
    coverImage: "/blog/posts/simpleCalculator/calc.png",
    readingTime: 10,
    tags: ["Next.js", "React", "JavaScript", "Tutorial", "Web Development"],
    category: "Tutorial",
    lastModified: "2025-02-05",
  },
  {
    slug: "startingNextJS",
    title: "Getting Started with Next.js",
    date: "2025-02-03",
    excerpt:
      "Your first steps with Next.js: setup, configuration and building your first app. Complete beginner's guide to Next.js framework.",
    coverImage: "/blog/posts/startingNextJS/nextBannerTemplate.png",
    readingTime: 5,
    tags: ["Next.js", "React", "Web Development", "JavaScript", "Tutorial"],
    category: "Tutorial",
    lastModified: "2025-02-03",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: blogPosts,
    total: blogPosts.length,
  });
}
