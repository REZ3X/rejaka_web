"use client";

import Link from "next/link";
import ASCIIText from "@/components/ASCIIText";
import FaultyTerminal from "@/components/FaultyTerminal";
import TabTerminal from "@/components/TabTerminal";
import GUITerminal from "@/components/GUITerminal";
import { useViewMode } from "@/context/ViewModeContext";
import { HiCode, HiSparkles } from "react-icons/hi";

export default function Home() {
  const { viewMode, toggleViewMode } = useViewMode();
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

          <div className="relative z-30 mt-1 sm:mt-2 mb-8 sm:mb-6 flex justify-center gap-4 flex-wrap">
            <button
              onClick={toggleViewMode}
              className="relative z-30 inline-flex items-center gap-2 px-3 py-1 text-[#00adb4] hover:text-[#0f7f82] font-mono text-sm border border-[#00adb4]/50 hover:border-[#00adb4] rounded-lg transition-all hover:bg-[#00adb4]/10"
            >
              {viewMode === "gui" ? (
                <>
                  <HiCode className="w-4 h-4" />
                  <span>Trivia (for backend dev)</span>
                </>
              ) : (
                <>
                  <HiSparkles className="w-4 h-4" />
                  <span>Tired of the logs?</span>
                </>
              )}
            </button>

            {viewMode === "terminal" && (
              <Link
                href="/playground"
                className="inline-block relative z-30 px-3 py-1 text-[#00adb4] hover:text-[#0f7f82] font-mono text-sm underline underline-offset-4 decoration-2 transition-colors"
              >
                $ cd playground
              </Link>
            )}

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
              Award-winning full-stack web developer from Yogyakarta, Indonesia.
              Team Lead of Slaviors Development Team. Specializing in Next.js,
              React, TypeScript, MongoDB, and API development. 1st Place winner
              of the National Digital Hero Competition 2024.
            </p>
            <p>
              This interactive portfolio features a real-time API request
              dashboard and terminal-style interface for exploring projects,
              tech stack, experiences, and achievements.
            </p>
          </div>
        </header>

        <div className="space-y-3 sm:space-y-4 lg:space-y-5">
          <section className="w-full" aria-labelledby="terminal-heading">
            <h2 id="terminal-heading" className="sr-only">
              {viewMode === "gui"
                ? "Portfolio Showcase"
                : "Multi-Tab Terminal Sessions"}
            </h2>
            {viewMode === "gui" ? <GUITerminal /> : <TabTerminal />}
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
