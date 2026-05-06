"use client";

import { useId } from "react";
import { usePerformanceHints } from "@/context/PerformanceContext";

export default function PerformanceModeToggle() {
  const selectId = useId();
  const metricsId = useId();
  const {
    performanceMode,
    setPerformanceMode,
    performanceTier,
    metricsEnabled,
    setMetricsEnabled,
  } = usePerformanceHints();

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex items-center gap-3 rounded-full border border-[#0f7f82]/50 bg-[#060910]/90 px-3 py-2 font-mono text-xs text-[#00adb4] shadow-lg backdrop-blur">
      <div className="flex items-center gap-2">
        <label htmlFor={selectId} className="text-[11px] uppercase">
          Perf
        </label>
        <select
          id={selectId}
          value={performanceMode}
          onChange={(event) =>
            setPerformanceMode(event.target.value as typeof performanceMode)
          }
          className="rounded-full border border-[#0f7f82]/50 bg-[#0d1117] px-2 py-1 text-[11px] text-gray-200"
          aria-label="Performance mode"
        >
          <option value="auto">Auto ({performanceTier})</option>
          <option value="quality">High Quality</option>
          <option value="performance">Performance</option>
        </select>
      </div>
      <div className="flex items-center gap-2 text-gray-300">
        <input
          id={metricsId}
          type="checkbox"
          checked={metricsEnabled}
          onChange={(event) => setMetricsEnabled(event.target.checked)}
          className="h-3 w-3 accent-[#00adb4]"
        />
        <label htmlFor={metricsId} className="text-[11px]">
          Metrics
        </label>
      </div>
    </div>
  );
}
