import React from "react";
import Image from "next/image";
import { ACHIEVEMENTS_DATA } from "../api/data/achievements/route";
import ResumeClientControls from "./ResumeClientControls";

export default function ResumePage() {
  return (
    <div
      className="resume-page-wrapper"
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#000000",
        fontFamily: "'Inter', sans-serif",
        lineHeight: 1.6,
        padding: "40px 20px",
      }}
    >
      {/* Client component for print button */}
      <ResumeClientControls />

      <div
        className="resume-container"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "40px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        {/* HEADER */}
        <header
          className="resume-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #000000",
            paddingBottom: "20px",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: 700,
                margin: "0 0 5px 0",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Rejaka <span style={{ fontWeight: 300 }}>Abimanyu Susanto</span>
            </h1>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#555555",
                margin: "0 0 15px 0",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              Fullstack Developer
            </h2>

            <div style={{ fontSize: "14px", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div>
                <strong>Email:</strong> abim@rejaka.id
              </div>
              <div>
                <strong>Phone:</strong> +62 831-0739-3837
              </div>
              <div>
                <strong>LinkedIn:</strong> linkedin.com/in/rejaka-me
              </div>
              <div>
                <strong>Web:</strong> www.rejaka.id
              </div>
              <div>
                <strong>Location:</strong> Yogyakarta, Indonesia
              </div>
            </div>
          </div>

          <div
            className="resume-header-image"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #000000",
              flexShrink: 0,
            }}
          >
            <Image
              src="/assets/rez3x.png"
              alt="Rejaka Abimanyu Susanto"
              width={120}
              height={120}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        </header>

        {/* ABOUT ME */}
        <section style={{ marginBottom: "30px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              textTransform: "uppercase",
              borderBottom: "1px solid #dddddd",
              paddingBottom: "5px",
              marginBottom: "15px",
              letterSpacing: "1px",
            }}
          >
            About Me
          </h3>
          <p style={{ fontSize: "14px", marginTop: 0 }}>
            I am a student of SMKN 2 Depok Sleman with a strong interest in fullstack development and team management.
            Experienced with modern tech stacks such as Next.js, React, and Axum, I am also passionate about system and
            database design. I actively lead and develop projects, learn quickly, and am eager to take on new challenges.
          </p>
        </section>

        {/* SKILLS */}
        <section style={{ marginBottom: "30px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              textTransform: "uppercase",
              borderBottom: "1px solid #dddddd",
              paddingBottom: "5px",
              marginBottom: "15px",
              letterSpacing: "1px",
            }}
          >
            Skills
          </h3>
          <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "14px" }}>
            <div>
              <strong>Web Development:</strong> Next.js, React, Tailwind CSS
            </div>
            <div>
              <strong>Backend Development:</strong> REST API, Express, Axum
            </div>
            <div>
              <strong>Database & System Design:</strong> ERD, Workflow Planning
            </div>
            <div>
              <strong>Core Competencies:</strong> Team Leadership, Quick Learner
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section style={{ marginBottom: "30px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              textTransform: "uppercase",
              borderBottom: "1px solid #dddddd",
              paddingBottom: "5px",
              marginBottom: "15px",
              letterSpacing: "1px",
            }}
          >
            Experience
          </h3>

          <div style={{ marginBottom: "20px" }} className="print-avoid-break">
            <div className="experience-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 5px 0" }}>Slaviors</h4>
              <span style={{ fontSize: "13px", color: "#555555", fontWeight: 600 }}>June 2025 - January 2026</span>
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#333333", marginBottom: "8px" }}>
              Freelance Fullstack Developer
            </div>
            <ul style={{ fontSize: "14px", margin: 0, paddingLeft: "20px" }}>
              <li>Database design (ERD) and workflow planning for system and client requirements.</li>
              <li>Building and managing systems used by clients, including frontend and backend integration.</li>
              <li>Leading the development team, distributing work scope, and ensuring optimal and efficient team performance.</li>
            </ul>
          </div>

          <div style={{ marginBottom: "20px" }} className="print-avoid-break">
            <div className="experience-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 5px 0" }}>Student Discipline Team</h4>
              <span style={{ fontSize: "13px", color: "#555555", fontWeight: 600 }}>October 2024 - November 2025</span>
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#333333", marginBottom: "8px" }}>
              Coordinator
            </div>
            <ul style={{ fontSize: "14px", margin: 0, paddingLeft: "20px" }}>
              <li>Led and coordinated 35 TaSis division members under the student council.</li>
              <li>Contributed to security and disciplinary operations at various school events.</li>
            </ul>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section style={{ marginBottom: "30px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              textTransform: "uppercase",
              borderBottom: "1px solid #dddddd",
              paddingBottom: "5px",
              marginBottom: "15px",
              letterSpacing: "1px",
            }}
          >
            Achievements
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {ACHIEVEMENTS_DATA.map((achievement, idx) => (
              <div key={idx} className="print-avoid-break">
                <div className="experience-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 3px 0" }}>{achievement.title}</h4>
                  <span style={{ fontSize: "13px", color: "#555555", fontWeight: 600 }}>{achievement.year}</span>
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#333333", marginBottom: "3px" }}>
                  {achievement.issuer}
                </div>
                <p style={{ fontSize: "13px", margin: 0 }}>{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              textTransform: "uppercase",
              borderBottom: "1px solid #dddddd",
              paddingBottom: "5px",
              marginBottom: "15px",
              letterSpacing: "1px",
            }}
          >
            Education
          </h3>

          <div style={{ marginBottom: "12px" }} className="print-avoid-break">
            <div className="experience-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h4 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 3px 0" }}>SMKN 2 DEPOK SLEMAN</h4>
              <span style={{ fontSize: "13px", color: "#555555", fontWeight: 600 }}>2023 - 2027</span>
            </div>
            <div style={{ fontSize: "14px" }}>Sistem Informasi Jaringan & Aplikasi (SIJA)</div>
          </div>

          <div style={{ marginBottom: "12px" }} className="print-avoid-break">
            <div className="experience-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h4 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 3px 0" }}>SMPN 6 YOGYAKARTA</h4>
              <span style={{ fontSize: "13px", color: "#555555", fontWeight: 600 }}>2020 - 2023</span>
            </div>
          </div>

          <div className="print-avoid-break">
            <div className="experience-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h4 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 3px 0" }}>SDN GLAGAH</h4>
              <span style={{ fontSize: "13px", color: "#555555", fontWeight: 600 }}>2014 - 2020</span>
            </div>
          </div>
        </section>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page { 
            size: A4 portrait;
            margin: 1.5cm; 
          }
          body { 
            background: #fff !important; 
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .resume-page-wrapper {
            background: #fff !important;
          }
          ::-webkit-scrollbar {
            display: none !important;
          }
          .resume-container {
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .print-avoid-break {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          h3 {
            page-break-after: avoid;
            break-after: avoid;
            margin-top: 15px;
          }
        }

        @media screen and (max-width: 768px) {
          .resume-page-wrapper {
            padding: 15px 10px !important;
          }
          .resume-container {
            padding: 20px !important;
          }
          .resume-header {
            flex-direction: column !important;
            text-align: center !important;
            gap: 20px !important;
          }
          .resume-header > div:first-child {
            order: 2;
          }
          .resume-header-image {
            order: 1;
            margin: 0 auto;
          }
          .skills-grid {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
          .experience-flex {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 2px !important;
          }
        }
      `,
        }}
      />
    </div>
  );
}
