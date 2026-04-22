"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useViewMode } from "@/context/ViewModeContext";

/* ─── Types ───────────────────────────────────────────────────────────────── */

interface WakaLanguage {
  name: string;
  percent: number;
  text: string;
}

interface WakaStats {
  languages: WakaLanguage[];
  range: string;
}

/* ─── Language colours ────────────────────────────────────────────────────── */

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f0db4f",
  Python: "#3572A5",
  Rust: "#ce422b",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  JSON: "#8b949e",
  YAML: "#cb171e",
  Markdown: "#083fa1",
  Go: "#00add8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
  Bash: "#89e051",
  SQL: "#e38c00",
  PHP: "#4f5d95",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00b4ab",
  Vue: "#42b883",
  TOML: "#9c4221",
  Other: "#374151",
};

function getLangColor(name: string): string {
  return LANG_COLORS[name] ?? LANG_COLORS["Other"];
}

/* ─── Icons ───────────────────────────────────────────────────────────────── */

function ClockCircleIcon({ size = 14, color = "#6b7280" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function CodeBracketsIcon({ size = 14, color = "#6b7280" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2h-1" />
      <path d="M12 11l-2 2 2 2M12 11l2 2-2 2" />
    </svg>
  );
}

function ChevronIcon({ collapsed, size = 9 }: { collapsed: boolean; size?: number }) {
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

export default function WakaTimeWidget({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const { viewMode } = useViewMode();
  const isGui = viewMode === "gui";

  const [stats, setStats] = useState<WakaStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/status/wakatime");
      const json = await res.json();
      if (json.success && json.data) {
        setStats(json.data);
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
    fetchStats();
    const id = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [fetchStats]);

  const accent = "#00adb4";
  const textMuted = "#6b7280";
  const fontBody = isGui ? "var(--font-inter), system-ui, sans-serif" : "var(--font-jetbrains-mono), monospace";
  const fontMono = "var(--font-jetbrains-mono), monospace";

  const panelBorder = collapsed ? "#374151" : accent;
  const topLangColor = stats?.languages?.[0] ? getLangColor(stats.languages[0].name) : accent;

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
      <button
        onClick={onToggle}
        title={collapsed ? "Expand WakaTime stats" : "Collapse WakaTime stats"}
        aria-label="Toggle WakaTime stats widget"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          padding: "8px 5px",
          background: "#0d1117",
          border: `1px solid ${panelBorder}`,
          borderRight: collapsed ? undefined : "none",
          borderRadius: "8px 0 0 8px",
          cursor: "pointer",
          flexShrink: 0,
          width: "32px",
          transition: "border-color 0.3s ease",
        }}
      >
        <ClockCircleIcon size={14} color={accent} />
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "2px",
            background: loading ? "#374151" : topLangColor,
            display: "block",
            boxShadow: loading ? "none" : `0 0 5px ${topLangColor}80`,
            transition: "background 0.4s ease",
          }}
        />
        <span style={{ color: accent, lineHeight: 1 }}>
          <ChevronIcon collapsed={!collapsed} size={9} />
        </span>
      </button>

      <div
        style={{
          width: "220px",
          background: "#0d1117",
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
          <ClockCircleIcon size={11} color={textMuted} />
          <span style={{ color: textMuted, fontSize: "10px", fontFamily: fontMono, letterSpacing: isGui ? "0" : "0.04em" }}>
            {isGui ? "wakatime — last 7 days" : "$ waka --week"}
          </span>
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
                  animation: "wk-spin 0.8s linear infinite",
                  flexShrink: 0,
                }}
              />
              <span style={{ color: textMuted, fontSize: "10px", fontFamily: fontMono }}>
                {isGui ? "Fetching stats..." : "$ fetching..."}
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
                  {isGui ? "Stats unavailable" : "[ERROR] api unreachable"}
                </span>
              </div>
              <p style={{ color: textMuted, fontSize: "9px", fontFamily: fontMono, paddingLeft: "20px" }}>
                {isGui ? "Set WAKATIME_JSON_URL in .env" : "hint: set WAKATIME_JSON_URL"}
              </p>
            </div>
          )}

          {!loading && !error && stats && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <CodeBracketsIcon size={12} color={accent} />
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
                  {isGui ? "Top Languages" : "LANG STATS"}
                </span>
                <span style={{ color: textMuted, fontSize: "9px", fontFamily: fontMono, marginLeft: "auto" }}>
                  {stats.range}
                </span>
              </div>

              <div style={{ display: "flex", height: "5px", borderRadius: "3px", overflow: "hidden", gap: "1px" }}>
                {stats.languages.slice(0, 6).map((lang) => (
                  <div
                    key={lang.name}
                    title={`${lang.name}: ${lang.percent.toFixed(1)}%`}
                    style={{ flex: `${lang.percent} 0 0`, background: getLangColor(lang.name), minWidth: "2px" }}
                  />
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {stats.languages.slice(0, 6).map((lang) => (
                  <div key={lang.name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "3px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <span
                          style={{
                            width: "7px",
                            height: "7px",
                            borderRadius: "2px",
                            background: getLangColor(lang.name),
                            display: "inline-block",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            color: "#e6edf3",
                            fontSize: "10px",
                            fontFamily: fontBody,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "100px",
                          }}
                        >
                          {lang.name}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ color: textMuted, fontSize: "9px", fontFamily: fontMono }}>{lang.text}</span>
                        <span style={{ color: accent, fontSize: "9px", fontFamily: fontMono, fontWeight: 600 }}>
                          {lang.percent.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <div style={{ height: "2px", background: "#1c2128", borderRadius: "1px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${lang.percent}%`,
                          background: getLangColor(lang.name),
                          borderRadius: "1px",
                          transition: "width 0.6s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes wk-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
