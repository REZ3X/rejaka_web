"use client";

import Link from "next/link";
import ASCIIText from "@/components/ASCIIText";
import FaultyTerminal from "@/components/FaultyTerminal";

export default function NotFound() {
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div
            className="hidden sm:block overflow-hidden -mb-8"
            role="img"
            aria-label="404 Error ASCII Art"
            style={{ maxHeight: "450px" }}
          >
            <ASCIIText
              text="404"
              enableWaves={true}
              asciiFontSize={10}
              textFontSize={190}
              planeBaseHeight={8}
            />
          </div>

          <div
            className="sm:hidden overflow-hidden -mb-4"
            role="img"
            aria-label="404 Error ASCII Art"
            style={{ maxHeight: "320px" }}
          >
            <ASCIIText
              text="404"
              enableWaves={true}
              asciiFontSize={8}
              textFontSize={140}
              planeBaseHeight={6}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#00adb4] font-mono">
            PAGE NOT FOUND
          </h1>

          <Link
            href="/"
            className="inline-block text-[#00adb4] hover:text-[#0f7f82] font-mono text-lg underline underline-offset-4 decoration-2 transition-colors"
          >
            $ cd ~
          </Link>
        </div>
      </div>
    </div>
  );
}
