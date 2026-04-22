"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ResumeSidebarButton() {
  const pathname = usePathname();

  // Hide the button if we're already on the resume page
  if (pathname === "/resume") {
    return null;
  }

  return (
    <Link
      href="/resume"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        top: "50%",
        left: "0",
        transform: "translateY(-50%)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
      }}
      aria-label="View Resume"
    >
      <div
        style={{
          backgroundColor: "#0d1117",
          color: "#00adb4",
          border: "1px solid #00adb4",
          borderLeft: "none",
          padding: "12px 6px",
          borderRadius: "0 6px 6px 0",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)", // Reads top-to-bottom
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          transition: "background-color 0.2s, color 0.2s, padding 0.2s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#00adb4";
          e.currentTarget.style.color = "#0d1117";
          e.currentTarget.style.padding = "12px 10px";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#0d1117";
          e.currentTarget.style.color = "#00adb4";
          e.currentTarget.style.padding = "12px 6px";
        }}
      >
        Resume
      </div>
    </Link>
  );
}
