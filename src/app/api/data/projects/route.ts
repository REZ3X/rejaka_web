import { link } from "fs";
import { NextResponse } from "next/server";
import { title } from "process";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const category = searchParams.get("category");

  const projects = [
    {
      id: "blessedly",
      title: "Blessedly - AI-Powered Mental Health Companion (Alpha)",
      subtitle: "AI-powered mental health companion with journaling, mood tracking, and AI-driven emotional support",
      category: "web",
      description: [
        "Blessedly is a mental health companion platform that utilizes AI technology to provide emotional support and guidance to users. The platform offers a range of features designed to help users improve their mental well-being, including journaling, mood tracking, and AI-driven emotional support.",
      ],
      features: [
        "Healthy article: Provides healthy articles to help users improve their mental well-being",
        "Journaling: Users can journal their thoughts and feelings to improve their mental health",
        "Mood tracking: Users can track their mood to identify patterns and triggers",
        "AI-Powered Analysis: Utilizes advanced AI algorithms to analyze user's mental health",
        "Comprehensive Emotional Support: Provides detailed emotional support and guidance to users",
        "AI Agent Integration: Includes an AI agent to assist users in understanding and improving their mental health",
      ],
      year: 2026,
      links: [
        {
          label: "Backend API Repo",
          url: "https://github.com/REZ3X/bsdy_api",
          type: "url",
        }
      ],
    },
    {
      id: "roomet",
      title: "Roomet - Socialize by Chats",
      subtitle: "Chat rooms with XP progression, achievements, and end-to-end encryption. A social space designed for real connection",
      category: "web",
      description: [
        "Roomet is a chat room platform that combines social interaction with gamification elements. Users can join various chat rooms based on their interests and engage in conversations while earning XP and unlocking achievements.",
        "The platform emphasizes privacy and security, with end-to-end encryption to ensure that all conversations remain confidential.",
      ],
      features: [
        "Chat Rooms: Join and create chat rooms based on interests",
        "XP Progression: Earn XP for active participation and unlock achievements",
        "End-to-End Encryption: Ensures all conversations are secure and private",
      ],
      year: 2026,
      links: [
        {
          label: "Live Website",
          url: "https://roomet.rejaka.id",
          type: "url",
        },
      ],
    },
    {
      id: "venue_api",
      title: "VenuKit API (RESTfull)",
      subtitle: "Boilerplate. Manage event data, media, files, folders, into structured data",
      category: "web",
      description: [
        "VenuKit API is a boilerplate for event management that provides a structured way to manage event data, media, files, and folders.",
      ],
      features: [
        "Event Management: Manage event data, media, files, and folders",
        "Structured Data: Provides a structured way to manage event data",
        "RESTful API: Provides a RESTful API for event management",
      ],
      year: 2025,
      links: [
        {
          label: "Backend API Repo",
          url: "https://github.com/REZ3X/venue_api",
          type: "url",
        },
      ],
    },
    {
      id: "alimentify",
      title: "Alimentify - AI-Powered Meal Nutrition Analyzer",
      subtitle: "Analyze meal nutrition using AI technology, train your diet habits, ai agent included",
      category: "web",
      description: [
        "Alimentify is an AI-powered meal nutrition analyzer that helps users understand the nutritional content of their meals. By leveraging advanced AI technology, Alimentify provides detailed insights into calories, macronutrients, vitamins, and minerals present in various dishes.",
      ],
      // technologies: ["Next.js", "Axum", "Rust", "MongoDB", "TypeScript", "Tailwind CSS"],
      features: [
        "AI-Powered Analysis: Utilizes advanced AI algorithms to analyze meal nutrition",
        "Comprehensive Nutritional Insights: Provides detailed breakdowns of calories, macronutrients, vitamins, and minerals",
        "AI Agent Integration: Includes an AI agent to assist users in understanding and improving their diet habits",
      ],
      year: 2025,
      links: [
        // {
        //   Label: "Frontend Repo",
        //   url: "https://github.com/REZ3X/alimentify_frontend",
        //   type: "url",
        // },
        {
          Label: "Backend API Repo",
          url: "https://github.com/REZ3X/alimentify_backend",
          type: "url",
        }
      ],
    },
    {
      id: "snaplove_digital_photobooth",
      title: "Snaplove Digital Photobooth",
      subtitle: "A digital photobooth service for everyone",
      category: "web",
      description: [
        "Snaplove Digital Photobooth is a web-based application that allows users to capture and share memorable moments through a digital photobooth experience. The platform is designed to be user-friendly and accessible, making it easy for anyone to create fun and engaging photos.",
        "Sharing frames and effects to enhance the photobooth experience.",
      ],
      // technologies: ["Next.js", "MongoDB", "JavaScript", "Tailwind CSS"],
      features: [
        "Digital Photobooth: Capture photos using a web-based photobooth interface",
        "Customizable Frames and Effects: Enhance photos with a variety of frames and effects",
        "Frame Sharing: Easily upload and share customized frames with others",
        "AI Photo Partner: Utilize AI technology to bring your fictional photo partner to life",
        "Live Photo: Dynamic photo generation for a unique experience",
      ],
      year: 2025,
      links: [
        {
          label: "Live Website",
          url: "https://snaplove.pics",
          type: "url",
        },
      ],
    },
    {
      id: "nkpol_profile",
      title: "NKPol Profile Website",
      subtitle: "A profile website for NKPol event booth organizer",
      category: "web",
      description: [
        "NKPol is an event booth organizer that provides various services for event management and booth setup.",
      ],
      // technologies: ["Next.js", "MongoDB", "JavaScript", "Tailwind CSS"],
      features: [
        "Company showcase: Highlights NKPol events and services",
        "Responsive design: Optimized for both desktop and mobile devices",
      ],
      year: 2025,
      links: [
        {
          label: "Live Website",
          url: "https://nkpol.com",
          type: "url",
        },
      ],
    },
    // {
    //   id: "rustedquotes",
    //   title: "Rusted Quotes",
    //   subtitle: "Public quotes website powered by WebAssembly and Rust",
    //   category: "web",
    //   description: [
    //     "A high-performance public quotes web application built with WebAssembly and Rust, featuring fast loading times and seamless user experience through modern web technologies.",
    //     "The application leverages Rust's performance and safety features, combined with WebAssembly's ability to run code at near-native speed in the browser, to deliver a responsive and efficient platform for sharing and viewing quotes.",
    //     "Built with Trunk for asset management, Leptos for reactive UI components, and Axum for the backend API, ensuring a robust and scalable architecture.",
    //   ],
    //   technologies: ["Rust", "WebAssembly", "Trunk", "Leptos", "Axum"],
    //   features: [
    //     "High performance: Fast loading times and smooth interactions",
    //     "Responsive design: Optimized for both desktop and mobile devices",
    //     "User-friendly interface: Intuitive navigation and layout",
    //     "Secure backend: Robust API built with Axum",
    //   ],
    //   year: 2025,
    //   links: [
    //     {
    //       label: "Live Website",
    //       url: "https://rusted-quotes.rejaka.id/",
    //       type: "url",
    //     },
    //     {
    //       label: "GitHub Repo",
    //       url: "https://github.com/REZ3X/rusted_quotes",
    //       type: "url",
    //     },
    //   ],
    // },
    // {
    //   id: "ghostchat",
    //   title: "GhostChat - Anonymous Secure Messaging",
    //   subtitle: "Ephemeral, encrypted, anonymous chat rooms",
    //   category: "web",
    //   description: [
    //     "GhostChat is a secure messaging platform that allows users to create ephemeral chat rooms.",
    //     "All messages are end-to-end encrypted and can be set to self-destruct after a certain period.",
    //   ],
    //   technologies: ["Next.js", "Node.js", "Express", "WebSocket", "Redis"],
    //   features: [
    //     "Anonymous chat rooms: Users can join without revealing their identity",
    //     "Self-destructing messages: Set a timer for messages to disappear",
    //     "End-to-end encryption: Ensures only participants can read messages",
    //   ],
    //   year: 2025,
    //   links: [
    //     {
    //       label: "Live Website",
    //       url: "https://ghost.rejaka.id",
    //       type: "url",
    //     },
    //     {
    //       label: "Frontend Repo",
    //       url: "https://github.com/REZ3X/ghostchat_frontend",
    //       type: "url",
    //     },
    //     {
    //       label: "Backend Repo",
    //       url: "https://github.com/REZ3X/ghostchat_backend",
    //       type: "url",
    //     },
    //   ],
    // },
    {
      id: "fwbplus",
      title: "FWB+ Event Organizer",
      subtitle: "A company profile website for FWB+ event organizer",
      category: "web",
      description: [
        "FWB+ is a platform designed to facilitate event organization in a safe and supportive environment.",
      ],
      // technologies: ["Next.js", "MongoDB", "JavaScript", "Tailwind CSS"],
      features: [
        "Company showcase: Highlights FWB+ events and services",
        "Microsite integration: Connects with FWB+ microsites",
        "Responsive design: Optimized for both desktop and mobile devices",
      ],
      year: 2025,
      links: [
        {
          label: "Main Site",
          url: "https://fwbplus.id",
          type: "url",
        },
        {
          label: "Microsite",
          url: "https://links.fwbplus.id",
          type: "url",
        },
      ],
    },
    // {
    //   id: "lofess",
    //   title: "Lofess: Love Confession Platform",
    //   subtitle: "A platform for love confessions",
    //   category: "web",
    //   description: [
    //     "Lofess is a platform designed to facilitate love confessions in a safe and supportive environment.",
    //   ],
    //   technologies: ["Next.js", "MongoDB", "TypeScript", "Tailwind CSS"],
    //   features: [
    //     "Private and Temporary Confessions: Users can share their feelings without revealing their identity",
    //   ],
    //   year: 2025,
    //   links: [
    //     {
    //       label: "Live Website",
    //       url: "https://lfss.vercel.app",
    //       type: "url",
    //     },
    //   ],
    // },
    {
      id: "v0id-app",
      title: "V0ID ChatBot",
      subtitle: "A motherly girlfriend chatbot",
      category: "mobile",
      description: [
        "V0ID ChatBot is a mobile application designed to provide users with a unique and engaging chatbot experience. The app features a motherly girlfriend chatbot that interacts with users in a friendly and supportive manner.",
        "The chatbot is capable of holding natural conversations, providing emotional support, and offering personalized recommendations based on user preferences.",
      ],
      // technologies: [
      //   "Java",
      //   "Smali",
      //   "Next.js",
      //   "TypeScript",
      //   "MongoDB",
      //   "Tailwind CSS",
      // ],
      features: [
        "Personalized Conversations: Tailors responses based on user interactions",
        "Emotional Support: Provides comforting and encouraging messages",
        "Memory Feature: Remembers user preferences and past interactions",
        "User-Friendly Interface: Intuitive design for easy navigation",
      ],
      year: 2025,
      links: [
        {
          label: "Download APK",
          downloadPath: "/v0id_files/v0idApp-06.apk",
          type: "download",
        },
      ],
    },
    {
      id: "jamak",
      title: "JaMak: Jaringan Masyarakat (Community Network)",
      subtitle: "A community network project for rural areas",
      category: "web",
      description: [
        "JaMak is a community network project aimed at improving connectivity and access to information in rural areas. It leverages local resources and community engagement to create a sustainable network infrastructure.",
        "The project focuses on providing essential services such as education, healthcare, and agriculture support through digital platforms.",
      ],
      // technologies: [
      //   "Next.js",
      //   "ImageKit",
      //   "MongoDB",
      //   "TypeScript",
      //   "Tailwind CSS",
      // ],
      features: [
        "Community Engagement: Involves local communities in network management",
        "Digital Literacy: Provides training and resources for local users",
        "Sustainable Development: Supports local economies through digital initiatives",
      ],
      year: 2025,
      links: [
        {
          label: "Live Website",
          url: "https://jamak.web.id",
          type: "url",
        },
      ],
    },
    // {
    //   id: "voidboard",
    //   title: "VoidBoard - Anonymous Image Board",
    //   subtitle: "A platform for anonymous image sharing",
    //   category: "web",
    //   description: [
    //     "VoidBoard is an anonymous image board that allows users to share and discuss images without revealing their identities. The platform is designed to foster open communication and creativity while maintaining user privacy.",
    //     "Users can post images, comment on others' posts, and engage in discussions without the fear of being judged or identified.",
    //   ],
    //   // technologies: [
    //   //   "Next.js",
    //   //   "ImageKit",
    //   //   "MongoDB",
    //   //   "TypeScript",
    //   //   "Tailwind CSS",
    //   // ],
    //   features: [
    //     "Anonymous Posting: Users can share images without revealing their identity",
    //     "Discussion Threads: Engage in conversations around shared images",
    //     "User Privacy: Focus on maintaining user anonymity and security",
    //     "Responsive design: Optimized for both desktop and mobile devices",
    //   ],
    //   year: 2025,
    //   links: [
    //     {
    //       label: "Live Website",
    //       url: "https://void-board.vercel.app/",
    //       type: "url",
    //     },
    //   ],
    // },
    // {
    //   id: "wa-bots",
    //   title: "Void X Bot",
    //   subtitle: "A WhatsApp automation bot with AI integration",
    //   category: "bot",
    //   description: [
    //     "Void X Bot is a feature-rich WhatsApp bot built to automate various tasks and enhance group communication. It integrates with Google Gemini AI to provide intelligent responses and image generation capabilities.",
    //     "The bot offers over 30 commands for media processing, entertainment, utility functions, information retrieval, and file conversions - all accessible through a simple command interface.",
    //   ],
    //   technologies: [
    //     "Node.js",
    //     "Baileys",
    //     "Google Gemini API",
    //     "FFmpeg",
    //     "ImageMagick",
    //   ],
    //   features: [
    //     "Media Processing: Convert images to stickers and back",
    //     "AI Integration: Chat with AI, generate and edit images",
    //     "Entertainment: Truth or dare games, compatibility tests",
    //     "Utility: Weather updates, earthquake alerts, currency conversion",
    //     "Downloads: YouTube and TikTok video/audio retrieval",
    //     "File Conversion: Convert documents to various formats",
    //   ],
    //   year: 2025,
    //   links: [
    //     {
    //       label: "GitHub Repository",
    //       url: "https://github.com/REZ3X/whatsapp-bot",
    //       type: "url",
    //     },
    //   ],
    // },
    // {
    //   id: "archive",
    //   title: "ArcHive Cloud Notes",
    //   subtitle: "A cloud-based note-taking app, beta version",
    //   category: "web",
    //   description: [
    //     "ArcHive is a cloud-based note-taking application designed to help users organize and manage their notes efficiently. It offers features like real-time collaboration, rich text editing, and seamless synchronization across devices.",
    //     "The beta version focuses on core functionalities, with plans for additional features based on user feedback.",
    //   ],
    //   technologies: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    //   features: [
    //     "Cloud synchronization for notes",
    //     "Secure user authentication",
    //     "Fast and responsive UI",
    //   ],
    //   year: 2025,
    //   links: [
    //     {
    //       label: "Live Website",
    //       url: "https://archivenotes.rejaka.id",
    //       type: "url",
    //     },
    //   ],
    // },
    {
      id: "gachapon",
      title: "Gachapon Website",
      subtitle: "A tool for randomized item generation",
      category: "web",
      description: [
        "Gachapon is a web application that allows users to generate randomized items based on predefined categories. It is designed for gaming and entertainment purposes, providing users with a fun way to discover new items.",
        "The website features a user-friendly interface and customizable settings for generating items.",
      ],
      // technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PWA"],
      features: [
        "Randomized item generation",
        "User-friendly interface",
        "Customizable settings for item categories",
        "Progressive Web App (PWA) for offline access",
      ],
      year: 2025,
      links: [
        {
          label: "Live Website",
          url: "https://gachapon.rejaka.id",
          type: "url",
        },
      ],
    },
    // {
    //   id: "tasis",
    //   title: "TaSis Website",
    //   subtitle: "A website for school organization",
    //   category: "web",
    //   description: [
    //     "TaSis is a website developed for a school organization, providing information about the organization, its activities, and resources for students.",
    //     "The website features a clean design and easy navigation to enhance user experience.",
    //   ],
    //   technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    //   features: [
    //     "Profile and activity pages",
    //     "Responsive design for mobile and desktop",
    //     "Easy-to-use content management system",
    //   ],
    //   year: 2025,
    //   links: [
    //     {
    //       label: "Demo",
    //       url: "https://tasistemporary.rejaka.id",
    //       type: "url",
    //     },
    //   ],
    // },
    {
      id: "slaviors",
      title: "Slaviors Group",
      subtitle: "A comprehensive platform for team showcase and resources",
      category: "web",
      description: [
        "Slaviors is a comprehensive team profile that showcases team members and provides easy access to important resources. It serves as both a team profile website and a resource hub for the development team.",
        "The platform includes detailed team member profiles and a dedicated links portal for quick access to essential tools and resources.",
      ],
      // technologies: ["Next.js", "JavaScript", "Tailwind CSS"],
      features: [
        "Team member profiles with photos and bios",
        "Role-based categorization and team structure",
        "Resource hub with organized link collections",
        "Responsive design for mobile and desktop",
        "Clean navigation between main site and links portal",
      ],
      year: 2025,
      links: [
        {
          label: "Main Website",
          url: "https://slaviors.id",
          type: "url",
        },
        {
          label: "Links Portal",
          url: "https://links.slaviors.id",
          type: "url",
        },
      ],
    },
  ];

  if (id) {
    const project = projects.find((p) => p.id === id);
    if (project) {
      return NextResponse.json({ success: true, data: project });
    }
    return NextResponse.json(
      { success: false, error: "Project not found" },
      { status: 404 }
    );
  }

  if (category) {
    const filtered = projects.filter((p) => p.category === category);
    return NextResponse.json({
      success: true,
      data: filtered,
      filter: category,
    });
  }

  return NextResponse.json({ success: true, data: projects });
}
