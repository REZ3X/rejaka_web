"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useViewMode } from "@/context/ViewModeContext";
import PixelTransition from "./PixelTransition";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { viewMode } = useViewMode();
  
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [displayContent, setDisplayContent] = useState(children);
  
  const prevPathname = useRef(pathname);
  const prevTheme = useRef(viewMode);
  const isAnimating = useRef(false);

  useEffect(() => {
    const hasChanged = prevPathname.current !== pathname || prevTheme.current !== viewMode;

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
  }, [pathname, viewMode, children]);

  return (
    <PixelTransition
      isOpen={isTransitioning}
      gridSize={15}
      pixelColor="#00adb4"
      animationStepDuration={0.35}
      className="min-h-screen"
    >
      {displayContent}
    </PixelTransition>
  );
}
