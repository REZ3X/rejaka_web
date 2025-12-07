"use client";

import Link from "next/link";
import ASCIIText from "@/components/ASCIIText";
import FaultyTerminal from "@/components/FaultyTerminal";
import TabTerminal from "@/components/TabTerminal";

export default function Home() {
  return (
    <div className="min-h-screen relative font-sans">
      <div className="fixed inset-0 z-0">
        <FaultyTerminal
          scale={1.2}
          gridMul={[2, 1]}
          digitSize={1.5}
          timeScale={0.2}
          scanlineIntensity={0.2}
          glitchAmount={0.8}
          flickerAmount={0.5}
          noiseAmp={0.8}
          chromaticAberration={0}
          dither={0.5}
          curvature={0.1}
          tint="#00adb4"
          mouseReact={true}
          mouseStrength={0.15}
          pageLoadAnimation={true}
          brightness={0.3}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <header className="text-center mb-2">
          <h1 className="sr-only">
            Rejaka Abimanyu Susanto - Full-Stack Developer Portfolio
          </h1>
          <div
            className="hidden sm:block -mt-2 -mb-12"
            role="img"
            aria-label="Rejaka Portfolio ASCII Art Title"
          >
            <ASCIIText
              text="REJAKA_PORTFOLIO"
              enableWaves={true}
              asciiFontSize={8}
              textFontSize={150}
              planeBaseHeight={8}
            />
          </div>

          <div
            className="sm:hidden -mt-1 -mb-8"
            role="img"
            aria-label="Rejaka ASCII Art Title"
          >
            <ASCIIText
              text="REJAKA"
              enableWaves={true}
              asciiFontSize={6}
              textFontSize={80}
              planeBaseHeight={6}
            />
          </div>

          <div className="relative z-20 mt-1 sm:mt-2 mb-8 sm:mb-6 flex justify-center gap-4">
            <Link
              href="/playground"
              className="inline-block relative z-30 px-3 py-1 text-[#00adb4] hover:text-[#0f7f82] font-mono text-sm underline underline-offset-4 decoration-2 transition-colors"
            >
              $ cd playground
            </Link>
            <Link
              href="/blog"
              className="inline-block relative z-30 px-3 py-1 text-[#00adb4] hover:text-[#0f7f82] font-mono text-sm underline underline-offset-4 decoration-2 transition-colors"
            >
              $ cd blog
            </Link>
          </div>

          <div className="sr-only">
            <h2>About Rejaka Abimanyu Susanto</h2>
            <p>
              Rejaka Abimanyu Susanto is an award-winning full-stack developer
              from Yogyakarta, Indonesia, specializing in modern web
              technologies including Next.js, React, TypeScript, MongoDB, Rust,
              and WebAssembly. With a strong focus on backend development and
              database engineering, Rejaka creates comprehensive, powerful, and
              reliable web applications using efficient and modern tech stacks.
            </p>
            <h3>Professional Expertise</h3>
            <p>
              As a full-stack developer, Rejaka excels in both frontend and
              backend development. His expertise spans across multiple domains:
              API development and integration, database design and optimization
              using MongoDB, server-side rendering with Next.js App Router,
              real-time web applications with WebSocket technology, performance
              optimization and SEO implementation, and progressive web app
              development. He is also proficient in building interactive user
              interfaces with React 19 and Three.js for WebGL graphics.
            </p>
            <h3>Technical Skills and API Development</h3>
            <p>
              This portfolio showcases an interactive API request builder that
              demonstrates Rejaka's capabilities in API development. You can
              test various API endpoints in real-time, explore comprehensive
              apidata responses, and monitor request handling through the
              terminal logging system. The API request builder allows you to
              make GET requests to different endpoints including /api/data,
              /api/data/about, /api/data/projects, /api/data/experiences,
              /api/data/achievements, /api/data/techStacks, and
              /api/data/socials. Each API request displays detailed response
              data, status codes, and performance metrics.
            </p>
            <h3>Achievements and Recognition</h3>
            <p>
              Rejaka is a 1st Place winner of the National Digital Hero
              Competition 2024 organized by PT. ITHO INDOSTOCK, demonstrating
              his exceptional skills in web development. He has also been a
              finalist in multiple prestigious programming competitions
              including the Sagasitas Web Building Competition 2024, Top 10 in
              ByProject Student Web Dev Competition 2025, and Finalist in Silogy
              Expo Web Development Competition 2025. These achievements showcase
              his competitive programming abilities and dedication to excellence
              in software engineering.
            </p>
            <h3>Leadership and Experience</h3>
            <p>
              As the Team Lead of Slaviors Development Team, Rejaka manages a
              professional web development team focused on delivering
              high-quality web solutions. His experience includes working as a
              Web Developer Apprentice at PT. ITHO INDOSTOCK (July 2024 -
              December 2024), where he focused on frontend development using
              React and Tailwind CSS, participated in chatbot integration, and
              assisted with deployment and server-side configuration. He also
              contributed to the development and maintenance of school website
              at SMKN 2 Depok Sleman as an OSIS Coordinator and IT Development
              team member.
            </p>
            <h3>Projects and Portfolio</h3>
            <p>
              Rejaka has developed numerous web applications and projects that
              demonstrate his full-stack development capabilities. His projects
              include Ghost Chat, an anonymous real-time chat platform; JaMak
              (Jaringan Masyarakat), a community network project for rural
              areas; VoidBoard, an anonymous image board platform; Void X Bot, a
              WhatsApp automation bot with AI integration; and various profile
              websites and web applications for clients. Each project showcases
              his ability to build modern, responsive, and performant web
              applications using the latest technologies.
            </p>
            <h3>Education and Background</h3>
            <p>
              Rejaka graduated from SMKN 2 Depok Sleman (2022-2025) with a major
              in System Information Network Application (SIJA). During his
              vocational education, he gained hands-on experience in web
              development, database management, network systems, and software
              engineering principles. His education provided a strong foundation
              in both theoretical knowledge and practical skills in information
              technology.
            </p>
            <h3>Interactive Portfolio Features</h3>
            <p>
              This portfolio features an innovative design with a
              retro-futuristic terminal aesthetic. The interactive API request
              builder allows visitors to explore Rejaka's professional data
              dynamically. You can view his complete resume and CV, test API
              endpoints to retrieve project information, explore his
              comprehensive tech stack including programming languages,
              frameworks, and tools, and review his professional experiences and
              achievements. The real-time terminal logging system provides
              transparency in API request handling and response formatting.
            </p>
            <h3>Available for Opportunities</h3>
            <p>
              Rejaka is currently available for internship opportunities,
              entry-level full-stack developer positions, freelance web
              development projects, and contract-based software engineering
              roles. He is particularly interested in opportunities that involve
              working with modern web technologies, building scalable backend
              systems, and creating innovative user experiences. You can contact
              him at abim@rejaka.id or connect through his professional profiles
              on GitHub (github.com/REZ3X) and LinkedIn
              (linkedin.com/in/rejaka-me).
            </p>
          </div>
        </header>

        <div className="space-y-3 sm:space-y-4 lg:space-y-5">
          <section className="w-full" aria-labelledby="terminal-heading">
            <h2 id="terminal-heading" className="sr-only">
              Multi-Tab Terminal Sessions
            </h2>
            <TabTerminal />
          </section>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm border border-gray-700 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#00adb4] animate-pulse" />
            <span className="text-xs sm:text-sm text-gray-400 font-mono">
              Built with Passion • Rejaka Portfolio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
