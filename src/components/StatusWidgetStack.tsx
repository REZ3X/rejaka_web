"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import DiscordWidget from "./DiscordWidget";
import WakaTimeWidget from "./WakaTimeWidget";

/**
 * Owns collapse/expand state for both status widgets and drives
 * WakaTime's vertical offset based on Discord's rendered height.
 *
 * Positioning rules:
 *   - Discord expanded  → WakaTime sits below the full Discord panel
 *   - Discord collapsed → WakaTime clears only the toggle-tab height
 *
 * localStorage keys:
 *   rejaka_discord_collapsed  "true" | "false"
 *   rejaka_waka_collapsed     "true" | "false"
 */

const TOP = 8; /* px from viewport top */
const GAP = 6; /* px gap between the two panels */

export default function StatusWidgetStack() {
  const pathname = usePathname();
  
  const [discordCollapsed, setDiscordCollapsed] = useState(false);
  const [wakaCollapsed, setWakaCollapsed] = useState(false);
  const [discordFullHeight, setDiscordFullHeight] = useState(0);
  const [discordTabHeight, setDiscordTabHeight] = useState(0);

  const discordWrapRef = useRef<HTMLDivElement>(null);

  /*
   * Read saved state from localStorage after mount.
   * useEffect is always client-side, so no SSR mismatch.
   * We intentionally do NOT guard the render with isMounted — that pattern
   * prevents the ResizeObserver from attaching to the real DOM elements.
   */
  useEffect(() => {
    const savedDiscord = localStorage.getItem("rejaka_discord_collapsed");
    if (savedDiscord !== null) setDiscordCollapsed(savedDiscord === "true");

    const savedWaka = localStorage.getItem("rejaka_waka_collapsed");
    if (savedWaka !== null) setWakaCollapsed(savedWaka === "true");
  }, []);

  /* Measure the Discord wrapper's full rendered height */
  useEffect(() => {
    const el = discordWrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setDiscordFullHeight(el.getBoundingClientRect().height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const wakaTop = discordCollapsed
    ? TOP + discordTabHeight + GAP
    : TOP + discordFullHeight + GAP;

  const discordSlide = discordCollapsed ? "calc(100% - 32px)" : "0%";
  const wakaSlide = wakaCollapsed ? "calc(100% - 32px)" : "0%";

  const toggleDiscord = useCallback(() => {
    setDiscordCollapsed((c) => {
      const next = !c;
      localStorage.setItem("rejaka_discord_collapsed", String(next));
      return next;
    });
  }, []);

  const toggleWaka = useCallback(() => {
    setWakaCollapsed((c) => {
      const next = !c;
      localStorage.setItem("rejaka_waka_collapsed", String(next));
      return next;
    });
  }, []);

  const handleDiscordTabHeight = useCallback(
    (h: number) => setDiscordTabHeight(h),
    []
  );

  if (pathname === "/resume") {
    return null;
  }

  return (
    <>
      <div
        ref={discordWrapRef}
        style={{
          position: "fixed",
          top: `${TOP}px`,
          right: "0",
          zIndex: 51,
          width: "252px",
          transform: `translateX(${discordSlide})`,
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          /*
           * "none" on the wrapper lets the translateX-shifted invisible area
           * pass clicks through. The widget component itself re-enables
           * pointer-events on its own root div.
           */
          pointerEvents: "none",
        }}
      >
        <DiscordWidget
          collapsed={discordCollapsed}
          onToggle={toggleDiscord}
          onTabHeightChange={handleDiscordTabHeight}
        />
      </div>

      <div
        style={{
          position: "fixed",
          top: `${wakaTop}px`,
          right: "0",
          zIndex: 50,
          width: "252px",
          transform: `translateX(${wakaSlide})`,
          transition:
            "top 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "none",
        }}
      >
        <WakaTimeWidget collapsed={wakaCollapsed} onToggle={toggleWaka} />
      </div>
    </>
  );
}
