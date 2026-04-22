"use client";

import React from "react";

export default function ResumeClientControls() {
  return (
    <>
      <div className="resume-controls" style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 100 }}>
        <button
          onClick={() => window.print()}
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "50px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Print / Save PDF
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          .resume-controls {
            display: none !important;
          }
        }
      `,
        }}
      />
    </>
  );
}
