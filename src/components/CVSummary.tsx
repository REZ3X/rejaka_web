"use client";

import React from "react";
import { HiDocumentText, HiDownload } from "react-icons/hi";

const CVSummary: React.FC = () => {
  return (
    <div className="w-full bg-[#0d1117] rounded-lg overflow-hidden shadow-2xl border border-gray-800">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#161b22] border-b border-gray-800 select-none">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 sm:ml-3 text-xs text-gray-400 font-mono truncate">
            resume.pdf ~ Rejaka Abimanyu Susanto
          </span>
        </div>
      </div>

      <div
        className="p-6 sm:p-8 min-h-[300px] flex flex-col items-center justify-center text-center"
        style={{
          background: "linear-gradient(180deg, #0d1117 0%, #010409 100%)",
        }}
      >
        <div className="max-w-xl mx-auto space-y-6">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00adb4] to-[#0f7f82] flex items-center justify-center">
              <HiDocumentText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
              Resume / CV
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm">
              Rejaka Abimanyu Susanto
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-gradient-to-r from-[#00adb4] to-[#0f7f82] hover:from-[#0f7f82] hover:to-[#00adb4] text-white px-6 py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#00adb4]/50 hover:scale-105"
            >
              <HiDocumentText className="w-5 h-5" />
              <span>View Full Resume</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            </a>

            <a
              href="/assets/resume/Rejaka_Abimanyu_Susanto_Resume.pdf"
              download="Rejaka_Abimanyu_Susanto_Resume.pdf"
              className="group relative overflow-hidden bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-gray-700/50 hover:scale-105 border border-gray-700"
            >
              <HiDownload className="w-5 h-5" />
              <span>Download PDF</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVSummary;
