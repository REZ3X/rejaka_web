"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useViewMode } from "@/context/ViewModeContext";
import { usePerformanceHints } from "@/context/PerformanceContext";
import PixelTransition from "./PixelTransition";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { viewMode } = useViewMode();
  const { performanceTier, prefersReducedMotion } = usePerformanceHints();

  const [isTransitioning, setIsTransitioning] = useState(true);
  const [displayContent, setDisplayContent] = useState(children);

  const prevPathname = useRef(pathname);
  const prevTheme = useRef(viewMode);
  const isAnimating = useRef(false);

  const reduceMotion = prefersReducedMotion || performanceTier === "low";

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const hasChanged =
      prevPathname.current !== pathname || prevTheme.current !== viewMode;

    if (hasChanged && !isAnimating.current) {
      isAnimating.current = true;

      setIsTransitioning(false);

      const updateTimer = setTimeout(() => {
        setDisplayContent(children);
        prevPathname.current = pathname;
        prevTheme.current = viewMode;

        const revealTimer = setTimeout(() => {
          setIsTransitioning(true);
          isAnimating.current = false;
        }, 80);

        return () => clearTimeout(revealTimer);
      }, 400);

      return () => clearTimeout(updateTimer);
    }
  }, [pathname, viewMode, children, reduceMotion]);

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <PixelTransition
      isOpen={isTransitioning}
      gridSize={performanceTier === "balanced" ? 12 : 15}
      pixelColor="#00adb4"
      animationStepDuration={performanceTier === "balanced" ? 0.25 : 0.35}
      className="min-h-screen"
    >
      {displayContent}
    </PixelTransition>
  );
}
