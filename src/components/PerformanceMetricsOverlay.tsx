"use client";

import { useEffect, useState } from "react";
import { usePerformanceHints } from "@/context/PerformanceContext";

type MetricStore = {
  fps?: number;
  longTaskMs?: number;
  lcpMs?: number;
  cls?: number;
  fcpMs?: number;
  fidMs?: number;
};

declare global {
  interface Window {
    __perfMetrics?: MetricStore;
  }
}

const emptyMetrics: MetricStore = {};

export default function PerformanceMetricsOverlay() {
  const {
    metricsEnabled,
    performanceTier,
    performanceMode,
    dpr,
    isPageHidden,
  } = usePerformanceHints();
  const [metrics, setMetrics] = useState<MetricStore>(emptyMetrics);

  useEffect(() => {
    if (!metricsEnabled) {
      setMetrics(emptyMetrics);
      return;
    }

    const readMetrics = () => {
      setMetrics(window.__perfMetrics ?? emptyMetrics);
    };

    readMetrics();
    const timer = window.setInterval(readMetrics, 1000);

    return () => window.clearInterval(timer);
  }, [metricsEnabled]);

  if (!metricsEnabled) {
    return null;
  }

  const rows: Array<[string, string]> = [
    ["tier", performanceTier],
    ["mode", performanceMode],
    ["dpr", dpr.toFixed(2)],
    ["hidden", isPageHidden ? "yes" : "no"],
    ["fps", metrics.fps !== undefined ? String(metrics.fps) : "-"],
    [
      "longtask",
      metrics.longTaskMs !== undefined ? `${metrics.longTaskMs}ms` : "-",
    ],
    ["lcp", metrics.lcpMs !== undefined ? `${metrics.lcpMs}ms` : "-"],
    ["fcp", metrics.fcpMs !== undefined ? `${metrics.fcpMs}ms` : "-"],
    ["fid", metrics.fidMs !== undefined ? `${metrics.fidMs}ms` : "-"],
    ["cls", metrics.cls !== undefined ? metrics.cls.toFixed(3) : "-"],
  ];

  return (
    <div className="fixed bottom-16 right-4 z-[60] w-44 rounded-lg border border-[#0f7f82]/60 bg-[#060910]/95 p-3 font-mono text-[11px] text-gray-200 shadow-lg backdrop-blur">
      <div className="mb-2 text-[10px] uppercase tracking-wide text-[#00adb4]">
        Performance
      </div>
      <div className="space-y-1">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <span className="text-gray-400">{label}</span>
            <span className="text-gray-100">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
