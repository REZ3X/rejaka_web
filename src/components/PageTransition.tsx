"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import PixelTransition from "./PixelTransition";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [displayContent, setDisplayContent] = useState(children);
  const prevPathname = useRef(pathname);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (prevPathname.current !== pathname && !isAnimating.current) {
      isAnimating.current = true;

      setIsTransitioning(false);

      const updateTimer = setTimeout(() => {
        setDisplayContent(children);
        prevPathname.current = pathname;

        const revealTimer = setTimeout(() => {
          setIsTransitioning(true);
          isAnimating.current = false;
        }, 80);

        return () => clearTimeout(revealTimer);
      }, 400); 

      return () => clearTimeout(updateTimer);
    }
  }, [pathname, children]);

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
