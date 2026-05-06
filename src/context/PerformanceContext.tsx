"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getCappedDpr,
  getPerformanceHints,
  type PerformanceHints,
  type PerformanceTier,
} from "@/lib/performanceHints";

export type PerformanceMode = "auto" | "quality" | "performance";

interface PerformanceContextValue {
  performanceTier: PerformanceTier;
  performanceMode: PerformanceMode;
  setPerformanceMode: (mode: PerformanceMode) => void;
  prefersReducedMotion: boolean;
  dpr: number;
  isLowSpec: boolean;
  isPageHidden: boolean;
  metricsEnabled: boolean;
  setMetricsEnabled: (enabled: boolean) => void;
}

const PerformanceContext = createContext<PerformanceContextValue | undefined>(
  undefined,
);

const MODE_STORAGE_KEY = "rejaka-performance-mode";
const METRICS_STORAGE_KEY = "rejaka-performance-metrics";

const DEFAULT_HINTS: PerformanceHints = {
  dpr: 1,
  prefersReducedMotion: false,
  performanceTier: "balanced",
};

export function PerformanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [performanceMode, setPerformanceModeState] =
    useState<PerformanceMode>("auto");
  const [metricsEnabled, setMetricsEnabledState] = useState(false);
  const [hints, setHints] = useState<PerformanceHints>(DEFAULT_HINTS);
  const [isPageHidden, setIsPageHidden] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem(MODE_STORAGE_KEY);
    if (
      storedMode === "auto" ||
      storedMode === "quality" ||
      storedMode === "performance"
    ) {
      setPerformanceModeState(storedMode);
    }

    const storedMetrics = localStorage.getItem(METRICS_STORAGE_KEY);
    if (storedMetrics === "true" || storedMetrics === "false") {
      setMetricsEnabledState(storedMetrics === "true");
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(MODE_STORAGE_KEY, performanceMode);
  }, [performanceMode, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(METRICS_STORAGE_KEY, String(metricsEnabled));
  }, [metricsEnabled, isHydrated]);

  useEffect(() => {
    const updateHints = () => {
      setHints(getPerformanceHints());
    };

    updateHints();

    const connection =
      (
        navigator as Navigator & {
          connection?: {
            effectiveType?: string;
            addEventListener?: (type: "change", listener: () => void) => void;
            removeEventListener?: (
              type: "change",
              listener: () => void,
            ) => void;
          };
        }
      ).connection ||
      (
        navigator as Navigator & {
          mozConnection?: {
            effectiveType?: string;
            addEventListener?: (type: "change", listener: () => void) => void;
            removeEventListener?: (
              type: "change",
              listener: () => void,
            ) => void;
          };
        }
      ).mozConnection ||
      (
        navigator as Navigator & {
          webkitConnection?: {
            effectiveType?: string;
            addEventListener?: (type: "change", listener: () => void) => void;
            removeEventListener?: (
              type: "change",
              listener: () => void,
            ) => void;
          };
        }
      ).webkitConnection;

    const prefersMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const handleVisibilityChange = () => {
      setIsPageHidden(document.visibilityState === "hidden");
    };

    const handleResize = () => updateHints();

    if (connection?.addEventListener) {
      connection.addEventListener("change", updateHints);
    }

    if (prefersMotionQuery.addEventListener) {
      prefersMotionQuery.addEventListener("change", updateHints);
    } else {
      prefersMotionQuery.addListener(updateHints);
    }
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    handleVisibilityChange();

    return () => {
      if (connection?.removeEventListener) {
        connection.removeEventListener("change", updateHints);
      }

      if (prefersMotionQuery.removeEventListener) {
        prefersMotionQuery.removeEventListener("change", updateHints);
      } else {
        prefersMotionQuery.removeListener(updateHints);
      }
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const performanceTier = useMemo<PerformanceTier>(() => {
    if (performanceMode === "quality") {
      return "high";
    }

    if (performanceMode === "performance") {
      return "low";
    }

    return hints.performanceTier;
  }, [hints.performanceTier, performanceMode]);

  const dpr = useMemo(
    () => getCappedDpr(performanceTier, hints.dpr),
    [performanceTier, hints.dpr],
  );

  const prefersReducedMotion =
    hints.prefersReducedMotion || performanceMode === "performance";

  const value = useMemo<PerformanceContextValue>(
    () => ({
      performanceTier,
      performanceMode,
      setPerformanceMode: setPerformanceModeState,
      prefersReducedMotion,
      dpr,
      isLowSpec: performanceTier === "low",
      isPageHidden,
      metricsEnabled,
      setMetricsEnabled: setMetricsEnabledState,
    }),
    [
      performanceTier,
      performanceMode,
      prefersReducedMotion,
      dpr,
      isPageHidden,
      metricsEnabled,
    ],
  );

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformanceHints() {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error(
      "usePerformanceHints must be used within PerformanceProvider",
    );
  }
  return context;
}
