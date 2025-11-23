"use client";

import { useEffect, useState } from "react";
import Terminal from "@/components/Terminal";
import ApiTester from "@/components/ApiTester";
import ASCIIText from "@/components/ASCIIText";
import FaultyTerminal from "@/components/FaultyTerminal";
import CVSummary from "@/components/CVSummary";
import PixelTransition from "@/components/PixelTransition";

interface LogEntry {
  timestamp: string;
  level: "info" | "success" | "error" | "warn";
  message: string;
  data?: any;
}

export default function Home() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<"api" | "cv">("api");

  const formatDataForDisplay = (data: any): any => {
    if (!data) return data;

    if (typeof data === "string") return data;

    if (Array.isArray(data)) {
      if (data.length > 10) {
        return {
          type: "array",
          count: data.length,
          preview: data.slice(0, 3),
          message: `Array with ${data.length} items (showing first 3)`,
        };
      }
      return data.map((item) => formatDataForDisplay(item));
    }

    if (typeof data === "object") {
      const formatted: any = {};
      const keys = Object.keys(data);

      for (const key of keys) {
        const value = data[key];

        if (Array.isArray(value)) {
          if (value.length > 8) {
            formatted[key] = {
              _summary: `Array with ${value.length} items`,
              _preview: value.slice(0, 3),
              _note: "Showing first 3 items. Use specific endpoint to see all.",
            };
          } else {
            formatted[key] = value;
          }
        } else if (typeof value === "object" && value !== null) {
          const nestedKeys = Object.keys(value);
          if (nestedKeys.length > 10) {
            formatted[key] = `{Object: ${nestedKeys.length} keys}`;
          } else {
            formatted[key] = value;
          }
        } else {
          formatted[key] = value;
        }
      }

      return formatted;
    }

    return data;
  };

  const addLog = (level: LogEntry["level"], message: string, data?: any) => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
    });

    const formattedData = data ? formatDataForDisplay(data) : undefined;

    setLogs((prev) => [
      ...prev,
      { timestamp, level, message, data: formattedData },
    ]);
  };

  useEffect(() => {
    addLog("info", "System initialized");
    addLog("info", "Loading default data from /api/data/about...");
    handleRequest("/api/data/about");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequest = async (
    endpoint: string,
    params?: Record<string, string>
  ) => {
    setIsLoading(true);

    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

    const url = new URL(normalizedEndpoint, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const fullUrl = url.toString();
    const displayPath = url.pathname + url.search;
    addLog("info", `Starting request to ${displayPath}`);
    addLog("info", `Method: GET | URL: ${displayPath}`);

    const startTime = performance.now();

    try {
      const response = await fetch(fullUrl);
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);

      addLog("info", `Response received in ${duration}ms`);
      addLog("info", `Status: ${response.status} ${response.statusText}`);

      const data = await response.json();

      if (response.ok) {
        const summary = {
          success: data.success,
          timestamp: data.timestamp,
          dataKeys: data.data ? Object.keys(data.data) : [],
        };
        addLog("success", "Request completed successfully", summary);

        if (data.data) {
          const dataType = Array.isArray(data.data) ? "array" : "object";
          const count = Array.isArray(data.data)
            ? data.data.length
            : Object.keys(data.data).length;

          addLog(
            "info",
            `Response contains ${count} ${
              dataType === "array" ? "items" : "properties"
            }`,
            data.data
          );
        }
      } else {
        addLog("error", "Request failed", data);
      }
    } catch (error) {
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);
      addLog("error", `Request failed after ${duration}ms`);
      addLog("error", error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="text-center mb-3 sm:mb-4">
          <h1 className="sr-only">
            Rejaka Abimanyu Susanto - Full-Stack Developer Portfolio
          </h1>
          <div
            className="mb-2 hidden sm:block"
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
            className="mb-2 sm:hidden"
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
              API Request Terminal
            </h2>
            <Terminal logs={logs} isLoading={isLoading} />
          </section>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setActiveView("api")}
              className={`
                relative px-6 py-3 rounded-lg font-mono text-sm font-semibold
                transition-all duration-300 
                ${
                  activeView === "api"
                    ? "bg-[#00adb4] text-white shadow-lg shadow-[#00adb4]/50"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
                }
              `}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                API Request Builder
              </span>
              {activeView === "api" && (
                <div className="absolute inset-0 bg-white/10 rounded-lg animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveView("cv")}
              className={`
                relative px-6 py-3 rounded-lg font-mono text-sm font-semibold
                transition-all duration-300
                ${
                  activeView === "cv"
                    ? "bg-[#00adb4] text-white shadow-lg shadow-[#00adb4]/50"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
                }
              `}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Resume / CV
              </span>
              {activeView === "cv" && (
                <div className="absolute inset-0 bg-white/10 rounded-lg animate-pulse" />
              )}
            </button>
          </div>

          <section
            className="w-full relative"
            aria-labelledby="content-heading"
          >
            <h2 id="content-heading" className="sr-only">
              {activeView === "api"
                ? "Interactive API Tester"
                : "Resume Summary"}
            </h2>

            <div className="relative w-full">
              <PixelTransition
                isOpen={activeView === "api"}
                gridSize={12}
                pixelColor="#00adb4"
                animationStepDuration={0.5}
                className="w-full"
              >
                <ApiTester onRequest={handleRequest} isLoading={isLoading} />
              </PixelTransition>

              <PixelTransition
                isOpen={activeView === "cv"}
                gridSize={12}
                pixelColor="#00adb4"
                animationStepDuration={0.5}
                className="w-full absolute top-0 left-0"
              >
                <CVSummary />
              </PixelTransition>
            </div>
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
