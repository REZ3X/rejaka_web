"use client";

import { useEffect, useRef } from "react";
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

function recordMetric(update: Partial<MetricStore>) {
  if (typeof window === "undefined") {
    return;
  }

  window.__perfMetrics = { ...window.__perfMetrics, ...update };

  if (process.env.NODE_ENV === "development") {
    console.info("[perf]", update);
  }
}

const SAMPLE_RATE = 0.25;
const SEND_INTERVAL_MS = 15000;

export default function PerformanceMetrics() {
  const {
    metricsEnabled,
    performanceTier,
    performanceMode,
    dpr,
    isPageHidden,
  } = usePerformanceHints();
  const rafIdRef = useRef<number | null>(null);
  const sendTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!metricsEnabled || typeof window === "undefined") {
      return;
    }

    const observers: PerformanceObserver[] = [];

    if ("PerformanceObserver" in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (!entries.length) return;
          const total = entries.reduce((sum, entry) => sum + entry.duration, 0);
          recordMetric({ longTaskMs: Math.round(total) });
        });
        longTaskObserver.observe({ entryTypes: ["longtask"] });
        observers.push(longTaskObserver);
      } catch {
        // noop
      }

      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShift = entry as PerformanceEntry & {
              value?: number;
              hadRecentInput?: boolean;
            };
            if (layoutShift.hadRecentInput) continue;
            clsValue += layoutShift.value ?? 0;
            recordMetric({ cls: Number(clsValue.toFixed(3)) });
          }
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });
        observers.push(clsObserver);
      } catch {
        // noop
      }

      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const last = entries[entries.length - 1];
          if (last) {
            recordMetric({ lcpMs: Math.round(last.startTime) });
          }
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
        observers.push(lcpObserver);
      } catch {
        // noop
      }

      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === "first-contentful-paint") {
              recordMetric({ fcpMs: Math.round(entry.startTime) });
            }
          }
        });
        paintObserver.observe({ entryTypes: ["paint"] });
        observers.push(paintObserver);
      } catch {
        // noop
      }

      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entry = list.getEntries()[0] as PerformanceEntry & {
            processingStart?: number;
          };
          if (entry && entry.processingStart !== undefined) {
            const fid = entry.processingStart - entry.startTime;
            recordMetric({ fidMs: Math.round(fid) });
          }
        });
        fidObserver.observe({ entryTypes: ["first-input"] });
        observers.push(fidObserver);
      } catch {
        // noop
      }
    }

    let lastSampleTime = performance.now();
    let frames = 0;

    const sample = (time: number) => {
      frames += 1;
      if (time - lastSampleTime >= 2000) {
        const fps = Math.round((frames * 1000) / (time - lastSampleTime));
        recordMetric({ fps });
        frames = 0;
        lastSampleTime = time;
      }
      rafIdRef.current = requestAnimationFrame(sample);
    };

    rafIdRef.current = requestAnimationFrame(sample);

    const sendMetrics = () => {
      if (Math.random() > SAMPLE_RATE) {
        return;
      }

      const payload = {
        metrics: window.__perfMetrics ?? {},
        meta: {
          path: window.location.pathname,
          timestamp: new Date().toISOString(),
          tier: performanceTier,
          mode: performanceMode,
          dpr,
          hidden: isPageHidden,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
          },
          screen: {
            width: window.screen.width,
            height: window.screen.height,
          },
          connection:
            (navigator as Navigator & { connection?: NetworkInformation })
              .connection?.effectiveType ?? null,
        },
      };

      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], {
          type: "application/json",
        });
        navigator.sendBeacon("/api/metrics", blob);
        return;
      }

      fetch("/api/metrics", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // noop
      });
    };

    sendTimerRef.current = window.setInterval(sendMetrics, SEND_INTERVAL_MS);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (sendTimerRef.current !== null) {
        window.clearInterval(sendTimerRef.current);
      }
      observers.forEach((observer) => observer.disconnect());
    };
  }, [metricsEnabled, performanceTier, performanceMode, dpr, isPageHidden]);

  return null;
}
