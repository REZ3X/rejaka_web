"use client";

import React, { useRef, useEffect, useState, CSSProperties } from "react";
import { gsap } from "gsap";

interface PixelTransitionProps {
  isOpen: boolean;
  children: React.ReactNode;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  className?: string;
  style?: CSSProperties;
}

const PixelTransition: React.FC<PixelTransitionProps> = ({
  isOpen,
  children,
  gridSize = 10,
  pixelColor = "#00adb4",
  animationStepDuration = 0.4,
  className = "",
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pixelGridRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = "";

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel-transition-item");
        pixel.style.backgroundColor = pixelColor;
        pixel.style.position = "absolute";
        pixel.style.display = "none";

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;

        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    const contentEl = contentRef.current;
    if (!pixelGridEl || !contentEl) return;

    const pixels = pixelGridEl.querySelectorAll<HTMLDivElement>(
      ".pixel-transition-item"
    );
    if (!pixels.length) return;

    gsap.killTweensOf(pixels);
    gsap.killTweensOf(contentEl);
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
    }

    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    if (isOpen) {
      gsap.set(pixels, { display: "none" });

      if (!isVisible) {
        gsap.set(contentEl, { display: "none", opacity: 0 });
      }

      gsap.to(pixels, {
        display: "block",
        duration: 0,
        stagger: {
          each: staggerDuration,
          from: "random",
        },
      });

      delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
        setIsVisible(true);
        gsap.set(contentEl, { display: "block", opacity: 0 });
        gsap.to(contentEl, {
          opacity: 1,
          duration: 0.3,
        });
      });

      gsap.to(pixels, {
        display: "none",
        duration: 0,
        delay: animationStepDuration,
        stagger: {
          each: staggerDuration,
          from: "random",
        },
      });
    } else if (isVisible) {
      gsap.set(pixels, { display: "none" });

      gsap.to(pixels, {
        display: "block",
        duration: 0,
        stagger: {
          each: staggerDuration,
          from: "random",
        },
      });

      delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
        gsap.to(contentEl, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            gsap.set(contentEl, { display: "none" });
            setIsVisible(false);
          },
        });
      });

      gsap.to(pixels, {
        display: "none",
        duration: 0,
        delay: animationStepDuration + 0.2,
        stagger: {
          each: staggerDuration,
          from: "random",
        },
      });
    }
  }, [isOpen, animationStepDuration, isVisible]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      <div
        ref={contentRef}
        className="w-full h-full"
        style={{ display: "none", opacity: 0 }}
      >
        {children}
      </div>

      <div
        ref={pixelGridRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-50"
      />
    </div>
  );
};

export default PixelTransition;
