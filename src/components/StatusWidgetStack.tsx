"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import DiscordWidget from "./DiscordWidget";
import WakaTimeWidget from "./WakaTimeWidget";

/**
 * Owns collapse/expand state for both status widgets and drives
 * WakaTime's vertical offset based on Discord's rendered height.
 *
 * Positioning rules:
 *   - Discord expanded  → WakaTime sits below the full Discord panel
 *   - Discord collapsed → WakaTime clears only the toggle-tab height
 */

const TOP = 8;  /* px from viewport top */
const GAP = 6;  /* px gap between the two panels */

export default function StatusWidgetStack() {
  const [discordCollapsed, setDiscordCollapsed] = useState(false);
  const [wakaCollapsed, setWakaCollapsed] = useState(false);
  const [discordFullHeight, setDiscordFullHeight] = useState(0);
  const [discordTabHeight, setDiscordTabHeight] = useState(0);

  const discordWrapRef = useRef<HTMLDivElement>(null);

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

  const toggleDiscord = useCallback(() => setDiscordCollapsed((c) => !c), []);
  const toggleWaka = useCallback(() => setWakaCollapsed((c) => !c), []);
  const handleDiscordTabHeight = useCallback((h: number) => setDiscordTabHeight(h), []);

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
          pointerEvents: "auto",
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
          transition: "top 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "auto",
        }}
      >
        <WakaTimeWidget collapsed={wakaCollapsed} onToggle={toggleWaka} />
      </div>
    </>
  );
}
