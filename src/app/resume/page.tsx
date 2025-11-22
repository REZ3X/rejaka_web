"use client";
import React, { useState, useEffect } from "react";
import { HiPrinter } from "react-icons/hi";

const ResumePage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900 font-resume">
        <div className="print:hidden fixed top-4 right-4 z-10">
          <button
            onClick={handlePrint}
            className="bg-black hover:bg-gray-800 text-white p-3 rounded-full font-medium shadow-lg transition-colors flex items-center justify-center"
            title="Print Resume"
            aria-label="Print Resume"
          >
            <HiPrinter className="w-5 h-5" />
          </button>
        </div>

        <div className="max-w-4xl mx-auto p-6 bg-white">
          <header className="text-center mb-4 pb-3 border-b border-gray-300">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Rejaka Abimanyu Susanto
            </h1>
            <p className="text-gray-600 text-sm mb-2">
              Full-Stack Web Developer
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600">
              <a
                href="mailto:abim@rejaka.id"
                className="hover:underline print:text-gray-600"
              >
                abim@rejaka.id
              </a>
              <span>•</span>
              <a
                href="https://rejaka.id"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline print:text-gray-600"
              >
                rejaka.id
              </a>
              <span>•</span>
              <a
                href="https://github.com/REZ3X"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline print:text-gray-600"
              >
                github.com/REZ3X
              </a>
              <span>•</span>
              <a
                href="https://linkedin.com/in/rejaka-me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline print:text-gray-600"
              >
                linkedin.com/in/rejaka-me
              </a>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-3">
              <section>
                <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                  Professional Summary
                </h2>
                <p className="text-gray-700 text-xs leading-relaxed">
                  <strong>Passionate Full-Stack Developer</strong> with a strong
                  focus on <em>backend development</em>. Specializing in
                  building comprehensive, powerful, and reliable backend
                  applications using efficient and modern tech stacks. Expert in{" "}
                  <em>Next.js, Express, and MongoDB</em>, creating scalable web
                  applications that meet high-technology requirements.{" "}
                  <strong>Award-winning developer</strong> with proven track
                  record in competitive programming and leadership experience.
                  Committed to delivering innovative solutions through clean,
                  efficient code and best practices.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                  Experience
                </h2>
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-xs">
                          Freelance Web Developer - Self-employed
                        </h3>
                        <span className="text-xs text-gray-500">
                          Dec 2023 - Present
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs mt-0.5">
                      • Designed and delivered full-stack web solutions for
                      clients
                      <br />
                      • Collaborated with designers on intuitive user interfaces
                      <br />
                      • Implemented responsive designs and optimized site
                      performance
                      <br />• Provided maintenance, updates, and enhancements
                      post-launch
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-xs">
                          Chief Information Technology Officer - Slaviors
                        </h3>
                        <span className="text-xs text-gray-500">
                          Oct 2024 - Present
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs mt-0.5">
                      • Lead development of high-performance web applications
                      using Next.js and MongoDB
                      <br />
                      • Design and implement API routes, database schemas, and
                      scalable system architectures
                      <br />
                      • Conduct code reviews to ensure maintainability, quality,
                      and adherence to best practices
                      <br />• Oversee deployment processes, establish CI/CD
                      pipelines, and manage release schedules
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-xs">
                          Coordinator - Student Discipline Team, SMKN 2 Depok
                          Sleman
                        </h3>
                        <span className="text-xs text-gray-500">
                          Sep 2025 - Nov 2025
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs mt-0.5">
                      • Led and coordinated volunteer security team activities
                      <br />
                      • Organized scheduling and communication among team
                      members
                      <br />
                      • Acted as liaison between school administration and
                      volunteers
                      <br />• Mentored new volunteers on procedures and
                      protocols
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-xs">
                          Volunteer Security Personnel - Student Discipline
                          Team, SMKN 2 Depok Sleman
                        </h3>
                        <span className="text-xs text-gray-500">
                          Sep 2024 - Nov 2025
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs mt-0.5">
                      • Monitored student activities and ensured school safety
                      during events
                      <br />
                      • Assisted in crowd control and managed access during
                      school functions
                      <br />• Collaborated with disciplinarians to handle
                      incidents efficiently
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-xs">
                          Web Developer - Karyasija (Volunteer), SMKN 2 Depok
                          Sleman
                        </h3>
                        <span className="text-xs text-gray-500">
                          Jun 2025 - Oct 2025
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs mt-0.5">
                      • Contributed to development and maintenance of school
                      website
                      <br />
                      • Implemented responsive layouts and backend logic
                      <br />• Collaborated with faculty to update content and
                      features
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-xs">
                          Web Developer Apprenticeship - PT. ITHO INDOSTOCK
                        </h3>
                        <span className="text-xs text-gray-500">
                          Jul 2024 - Dec 2024
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs mt-0.5">
                      • Focused on frontend development in enterprise standards
                      <br />
                      • Built UI components and pages using React and Tailwind
                      CSS
                      <br />
                      • Participated in chatbot integration for customer support
                      <br />• Assisted with deployment and server-side
                      configuration
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                  Education
                </h2>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-xs">
                      System Information Network and Application Engineering
                      (SIJA)
                    </h3>
                    <p className="text-gray-600 text-xs">
                      SMKN 2 Depok Sleman, Yogyakarta
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">2023 - 2027</span>
                </div>
              </section>
            </div>

            <div className="space-y-3">
              <section>
                <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                  Technical Skills
                </h2>
                <div className="text-xs text-gray-700 leading-relaxed">
                  <p className="mb-1">
                    <strong>Frontend:</strong> Next.js, React Native,
                    TailwindCSS, Expo
                  </p>
                  <p className="mb-1">
                    <strong>Backend:</strong> Express, Axum, Node.js
                  </p>
                  <p className="mb-1">
                    <strong>Database:</strong> MongoDB, Redis
                  </p>
                  <p className="mb-1">
                    <strong>Languages:</strong> JavaScript/TypeScript, C, Rust
                  </p>
                  <p className="mb-1">
                    <strong>Cloud:</strong> Vercel, Cloudflare
                  </p>
                  <p>
                    <strong>DevOps:</strong> Git, GitHub, GitLab, NGINX, PM2,
                    TOR Hidden Service
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                  Achievements
                </h2>
                <div className="space-y-1">
                  <div>
                    <h3 className="font-medium text-gray-800 text-xs">
                      Finalist - Web Development, National Competition Silogy
                      Expo
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Himpunan Mahasiswa Sistem Informasi, Universitas
                      Singaperbangsa Karawang - 2025
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 text-xs">
                      Top 10 - ByProject Student Web Dev Competition
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Universitas Teknologi Yogyakarta - 2025
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 text-xs">
                      Finalist - Sagasitas Web Building Competition
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Sagasitas Indonesia - 2024
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 text-xs">
                      1st Place - National Digital Hero Competition
                    </h3>
                    <p className="text-gray-600 text-xs">
                      PT. ITHO INDOSTOCK - 2024
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                  Languages
                </h2>
                <div className="space-y-0.5 text-xs">
                  <div className="flex justify-between">
                    <span>Indonesian</span>
                    <span className="text-gray-600">Native</span>
                  </div>
                  <div className="flex justify-between">
                    <span>English</span>
                    <span className="text-gray-600">Intermediate</span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <footer className="mt-3 pt-2 border-t border-gray-200 text-center text-gray-500 text-xs">
            <p>
              Available for internship and entry-level opportunities •{" "}
              {currentDate && `Generated ${currentDate}`}
            </p>
          </footer>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            box-sizing: border-box !important;
          }

          @page {
            size: A4;
            margin: 0.5in 0.75in;
          }

          body {
            font-family: "Merriweather", "Times New Roman", serif !important;
            font-size: 12px !important;
            line-height: 1.4 !important;
            color: black !important;
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .print\\:hidden {
            display: none !important;
          }

          .min-h-screen {
            min-height: auto !important;
            height: auto !important;
          }

          .max-w-4xl {
            max-width: 100% !important;
            margin: 0 auto !important;
            padding: 0 0.5in !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }

          .p-6 {
            padding: 0 !important;
          }

          header {
            text-align: center !important;
            margin-bottom: 16px !important;
            padding-bottom: 8px !important;
            border-bottom: 1px solid #333 !important;
          }

          h1 {
            font-size: 22px !important;
            font-weight: bold !important;
            margin-bottom: 4px !important;
            color: black !important;
          }

          h2 {
            font-size: 14px !important;
            font-weight: bold !important;
            margin-bottom: 8px !important;
            padding-bottom: 3px !important;
            border-bottom: 1px solid #666 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            color: black !important;
          }

          h3 {
            font-size: 12px !important;
            font-weight: 600 !important;
            margin-bottom: 2px !important;
            color: black !important;
          }

          p {
            font-size: 12px !important;
            line-height: 1.4 !important;
            margin: 0 !important;
            color: black !important;
          }

          .text-2xl {
            font-size: 22px !important;
          }

          .text-sm {
            font-size: 12px !important;
          }

          .text-xs {
            font-size: 11px !important;
          }

          .grid {
            display: grid !important;
          }

          .grid-cols-1 {
            grid-template-columns: 1fr !important;
          }

          .lg\\:grid-cols-3 {
            grid-template-columns: 2.2fr 1fr !important;
          }

          .lg\\:col-span-2 {
            grid-column: span 1 !important;
          }

          .gap-4 {
            gap: 16px !important;
          }

          .space-y-3 > * + * {
            margin-top: 12px !important;
          }

          .space-y-1\\.5 > * + * {
            margin-top: 6px !important;
          }

          .space-y-1 > * + * {
            margin-top: 4px !important;
          }

          .space-y-0\\.5 > * + * {
            margin-top: 2px !important;
          }

          .mb-4 {
            margin-bottom: 12px !important;
          }

          .mb-3 {
            margin-bottom: 8px !important;
          }

          .mb-2 {
            margin-bottom: 6px !important;
          }

          .mb-1 {
            margin-bottom: 4px !important;
          }

          .mt-3 {
            margin-top: 8px !important;
          }

          .mt-1 {
            margin-top: 4px !important;
          }

          .mt-0\\.5 {
            margin-top: 2px !important;
          }

          .pb-3 {
            padding-bottom: 8px !important;
          }

          .pb-1 {
            padding-bottom: 4px !important;
          }

          .pt-2 {
            padding-top: 6px !important;
          }

          .flex {
            display: flex !important;
          }

          .flex-wrap {
            flex-wrap: wrap !important;
          }

          .justify-center {
            justify-content: center !important;
          }

          .justify-between {
            justify-content: space-between !important;
          }

          .items-start {
            align-items: flex-start !important;
          }

          .gap-3 {
            gap: 8px !important;
          }

          .text-center {
            text-align: center !important;
          }

          .font-bold {
            font-weight: bold !important;
          }

          .font-semibold {
            font-weight: 600 !important;
          }

          .font-medium {
            font-weight: 500 !important;
          }

          .uppercase {
            text-transform: uppercase !important;
          }

          .tracking-wide {
            letter-spacing: 0.3px !important;
          }

          .leading-relaxed {
            line-height: 1.4 !important;
          }

          .text-gray-800,
          .text-gray-700,
          .text-gray-600,
          .text-gray-500 {
            color: black !important;
          }

          a {
            color: black !important;
            text-decoration: none !important;
          }

          .border-b {
            border-bottom: 1px solid #333 !important;
          }

          .border-t {
            border-top: 1px solid #333 !important;
          }

          .border-gray-300,
          .border-gray-200 {
            border-color: #333 !important;
          }

          section {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            margin-bottom: 10px !important;
          }

          footer {
            margin-top: 12px !important;
            padding-top: 6px !important;
            border-top: 1px solid #333 !important;
            text-align: center !important;
          }

          strong {
            font-weight: bold !important;
            color: black !important;
          }

          em {
            font-style: italic !important;
            color: black !important;
          }

          .space-y-1\\.5 > div {
            margin-bottom: 4px !important;
            padding: 2px 0 !important;
          }

          .space-y-1 > div {
            margin-bottom: 3px !important;
            padding: 1px 0 !important;
          }

          .text-xs.text-gray-700.leading-relaxed p {
            margin-bottom: 3px !important;
            line-height: 1.3 !important;
          }

          .space-y-0\\.5.text-xs > div {
            margin-bottom: 2px !important;
            padding: 1px 0 !important;
          }
        }
      `}</style>
    </>
  );
};

export default ResumePage;
