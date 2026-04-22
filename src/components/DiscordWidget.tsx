"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useViewMode } from "@/context/ViewModeContext";

/* ─── Types ───────────────────────────────────────────────────────────────── */

interface SpotifyData {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  track_id: string;
  timestamps: { start: number; end: number };
}

interface Activity {
  id: string;
  name: string;
  type: number;
  details?: string;
  state?: string;
  timestamps?: { start?: number; end?: number };
  application_id?: string;
}

interface DiscordUser {
  id: string;
  username: string;
  global_name?: string;
  avatar?: string;
}

interface PresenceData {
  discord_user: DiscordUser;
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Activity[];
  spotify: SpotifyData | null;
}

/* ─── Constants ───────────────────────────────────────────────────────────── */

const STATUS_COLORS: Record<string, string> = {
  online: "#22c55e",
  idle: "#eab308",
  dnd: "#ef4444",
  offline: "#4b5563",
};

const STATUS_LABELS: Record<string, string> = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline",
};

function formatMs(ms: number): string {
  const s = Math.floor(Math.abs(ms) / 1000);
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}

/* ─── Icons ───────────────────────────────────────────────────────────────── */

function DiscordSVG({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#5865F2" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function SpotifyIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1db954" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function ActivityIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 12h4M8 10v4" />
      <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ChevronIcon({ collapsed, size = 10 }: { collapsed: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease",
        display: "block",
      }}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

/* ─── Component ───────────────────────────────────────────────────────────── */

interface DiscordWidgetProps {
  collapsed: boolean;
  onToggle: () => void;
  /** Reports toggle-button height so StatusWidgetStack can clear it when collapsed */
  onTabHeightChange?: (h: number) => void;
  onHeightChange?: (h: number) => void;
}

export default function DiscordWidget({ collapsed, onToggle, onTabHeightChange, onHeightChange }: DiscordWidgetProps) {
  const { viewMode } = useViewMode();
  const isGui = viewMode === "gui";

  const [presence, setPresence] = useState<PresenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const id = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const fetchPresence = useCallback(async () => {
    try {
      const res = await fetch("/api/status/discord");
      const json = await res.json();
      if (json.success && json.data) {
        setPresence(json.data);
        setError(false);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPresence();
    const id = setInterval(fetchPresence, 10_000);
    return () => clearInterval(id);
  }, [fetchPresence]);

  useEffect(() => {
    if (!onHeightChange) return;
    const el = panelRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => onHeightChange(el.getBoundingClientRect().height));
    ro.observe(el);
    return () => ro.disconnect();
  }, [onHeightChange]);

  useEffect(() => {
    if (!onTabHeightChange) return;
    const el = tabRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => onTabHeightChange(el.getBoundingClientRect().height));
    ro.observe(el);
    return () => ro.disconnect();
  }, [onTabHeightChange]);

  const discordUser = presence?.discord_user;
  const statusColor = STATUS_COLORS[presence?.discord_status ?? "offline"];
  const mainActivity = presence?.activities?.find((a) => a.type !== 4 && a.name !== "Spotify");
  const spotify = presence?.spotify;

  let spotifyProgress = 0;
  let currentPos = 0;
  let totalDur = 0;
  if (spotify?.timestamps) {
    const { start, end } = spotify.timestamps;
    totalDur = end - start;
    currentPos = currentTime - start;
    spotifyProgress = Math.min(Math.max((currentPos / totalDur) * 100, 0), 100);
  }

  const avatarUrl = discordUser?.avatar
    ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=64`
    : `https://cdn.discordapp.com/embed/avatars/${(parseInt(discordUser?.id ?? "0") >> 22) % 6}.png`;

  const panelBg = "#0d1117";
  const panelBorder = collapsed ? "#374151" : "#00adb4";
  const accent = "#00adb4";
  const textMuted = "#6b7280";
  const fontBody = isGui ? "var(--font-inter), system-ui, sans-serif" : "var(--font-jetbrains-mono), monospace";
  const fontMono = "var(--font-jetbrains-mono), monospace";

  return (
    <div
      ref={panelRef}
      style={{ position: "relative", display: "flex", flexDirection: "row", alignItems: "flex-start" }}
    >
      <button
        ref={tabRef}
        onClick={onToggle}
        title={collapsed ? "Expand Discord status" : "Collapse Discord status"}
        aria-label="Toggle Discord status widget"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          padding: "8px 5px",
          background: panelBg,
          border: `1px solid ${panelBorder}`,
          borderRight: collapsed ? undefined : "none",
          borderRadius: "8px 0 0 8px",
          cursor: "pointer",
          flexShrink: 0,
          width: "32px",
          transition: "border-color 0.3s ease",
        }}
      >
        <DiscordSVG size={15} />
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: loading ? "#374151" : statusColor,
            display: "block",
            boxShadow: loading ? "none" : `0 0 5px ${statusColor}80`,
            transition: "background 0.4s ease, box-shadow 0.4s ease",
          }}
        />
        <span style={{ color: accent, lineHeight: 1 }}>
          <ChevronIcon collapsed={!collapsed} size={9} />
        </span>
      </button>

      <div
        style={{
          width: "220px",
          background: panelBg,
          border: `1px solid ${panelBorder}`,
          borderLeft: "none",
          borderRadius: "0 0 8px 0",
          overflow: "hidden",
          maxHeight: "calc(100vh - 16px)",
          overflowY: "auto",
          scrollbarWidth: "none",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "border-color 0.3s ease",
        }}
      >
        <div
          style={{
            padding: "6px 10px",
            borderBottom: "1px solid #1c2128",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "#161b22",
          }}
        >
          <DiscordSVG size={12} />
          <span style={{ color: textMuted, fontSize: "10px", fontFamily: fontMono, letterSpacing: isGui ? "0" : "0.04em" }}>
            {isGui ? "discord — presence" : "$ discord --status"}
          </span>
          {!loading && !error && (
            <span
              style={{
                marginLeft: "auto",
                fontSize: "9px",
                fontFamily: fontMono,
                color: STATUS_COLORS[presence?.discord_status ?? "offline"],
                letterSpacing: "0.05em",
                fontWeight: 600,
              }}
            >
              {isGui
                ? STATUS_LABELS[presence?.discord_status ?? "offline"]
                : presence?.discord_status?.toUpperCase() ?? "OFFLINE"}
            </span>
          )}
        </div>

        <div style={{ padding: "10px" }}>
          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 0" }}>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid #1c2128",
                  borderTop: `2px solid ${accent}`,
                  borderRadius: "50%",
                  animation: "dc-spin 0.8s linear infinite",
                  flexShrink: 0,
                }}
              />
              <span style={{ color: textMuted, fontSize: "10px", fontFamily: fontMono }}>
                {isGui ? "Fetching presence..." : "$ fetching..."}
              </span>
            </div>
          )}

          {error && !loading && (
            <div style={{ padding: "8px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                </svg>
                <span style={{ color: "#ef4444", fontSize: "10px", fontFamily: fontMono }}>
                  {isGui ? "Not reachable" : "[ERROR] no signal"}
                </span>
              </div>
              <p style={{ color: textMuted, fontSize: "9px", fontFamily: fontMono, paddingLeft: "20px" }}>
                {isGui ? "Join discord.gg/lanyard to enable monitoring" : "hint: join discord.gg/lanyard"}
              </p>
            </div>
          )}

          {!loading && !error && presence && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <Image
                    src={avatarUrl}
                    alt={discordUser?.global_name ?? discordUser?.username ?? "Discord User"}
                    width={38}
                    height={38}
                    unoptimized
                    style={{ borderRadius: "50%", border: "2px solid #1c2128", display: "block" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      right: "-1px",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: statusColor,
                      border: "2px solid #0d1117",
                      display: "block",
                      boxShadow: `0 0 5px ${statusColor}80`,
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      color: "#e6edf3",
                      fontSize: "12px",
                      fontWeight: 600,
                      fontFamily: fontBody,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {discordUser?.global_name ?? discordUser?.username ?? "Unknown"}
                  </div>
                  {isGui ? (
                    <div style={{ color: textMuted, fontSize: "10px", fontFamily: fontBody }}>
                      @{discordUser?.username}
                    </div>
                  ) : (
                    <div style={{ color: textMuted, fontSize: "10px", fontFamily: fontMono }}>
                      user::{discordUser?.username}
                    </div>
                  )}
                </div>
              </div>

              {spotify && (
                <div style={{ borderTop: "1px solid #1c2128", paddingTop: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "7px" }}>
                    <SpotifyIcon size={11} />
                    <span
                      style={{
                        color: "#1db954",
                        fontSize: "10px",
                        fontWeight: 600,
                        fontFamily: fontMono,
                        letterSpacing: "0.05em",
                        textTransform: isGui ? "none" : "uppercase",
                      }}
                    >
                      {isGui ? "Listening to Spotify" : "SPOTIFY"}
                    </span>
                  </div>

                  {spotify.album_art_url && (
                    <div
                      style={{
                        marginBottom: "7px",
                        borderRadius: "4px",
                        overflow: "hidden",
                        border: "1px solid #1c2128",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={spotify.album_art_url}
                        alt={spotify.album}
                        width={200}
                        height={200}
                        unoptimized
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(13,17,23,0.6) 0%, transparent 60%)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  )}

                  <div
                    style={{
                      color: "#e6edf3",
                      fontSize: "11px",
                      fontWeight: 600,
                      fontFamily: fontBody,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {spotify.song}
                  </div>
                  <div
                    style={{
                      color: textMuted,
                      fontSize: "10px",
                      fontFamily: fontBody,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginTop: "2px",
                    }}
                  >
                    {isGui ? spotify.artist : `by ${spotify.artist}`}
                  </div>

                  {spotify.timestamps && (
                    <div style={{ marginTop: "7px" }}>
                      <div
                        style={{
                          height: "3px",
                          background: "#1c2128",
                          borderRadius: "2px",
                          overflow: "hidden",
                          marginBottom: "3px",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${spotifyProgress}%`,
                            background: "#1db954",
                            borderRadius: "2px",
                            transition: "width 1s linear",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          color: textMuted,
                          fontSize: "9px",
                          fontFamily: fontMono,
                        }}
                      >
                        <span>{formatMs(Math.max(currentPos, 0))}</span>
                        <span>{formatMs(totalDur)}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {mainActivity && (
                <div style={{ borderTop: "1px solid #1c2128", paddingTop: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "5px" }}>
                    <span style={{ color: accent }}>
                      <ActivityIcon size={12} />
                    </span>
                    <span
                      style={{
                        color: accent,
                        fontSize: "10px",
                        fontWeight: 600,
                        fontFamily: fontMono,
                        letterSpacing: "0.05em",
                        textTransform: isGui ? "none" : "uppercase",
                      }}
                    >
                      {isGui ? "Playing" : "ACTIVITY"}
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#e6edf3",
                      fontSize: "11px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontFamily: fontBody,
                    }}
                  >
                    {mainActivity.name}
                  </div>
                  {mainActivity.details && (
                    <div
                      style={{
                        color: textMuted,
                        fontSize: "10px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginTop: "2px",
                        fontFamily: fontBody,
                      }}
                    >
                      {mainActivity.details}
                    </div>
                  )}
                  {mainActivity.state && (
                    <div
                      style={{
                        color: textMuted,
                        fontSize: "9px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginTop: "1px",
                        fontFamily: fontMono,
                      }}
                    >
                      {mainActivity.state}
                    </div>
                  )}
                </div>
              )}

              {!spotify && !mainActivity && (
                <div
                  style={{
                    borderTop: "1px solid #1c2128",
                    paddingTop: "8px",
                    color: textMuted,
                    fontSize: "10px",
                    fontFamily: fontMono,
                  }}
                >
                  {isGui ? "Just chilling..." : "$ idle — no active session"}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes dc-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
