export type PerformanceTier = "high" | "balanced" | "low";

export interface PerformanceHints {
  deviceMemory?: number;
  hardwareConcurrency?: number;
  effectiveType?: string;
  dpr: number;
  prefersReducedMotion: boolean;
  performanceTier: PerformanceTier;
}

const LOW_MEMORY_GB = 1.5;
const LOW_CORES = 2;
const HIGH_MEMORY_GB = 6;
const HIGH_CORES = 8;

const LOW_EFFECTIVE_TYPES = new Set(["slow-2g", "2g"]);

export function getPerformanceTierFromHints({
  deviceMemory,
  hardwareConcurrency,
  effectiveType,
}: {
  deviceMemory?: number;
  hardwareConcurrency?: number;
  effectiveType?: string;
}): PerformanceTier {
  if (effectiveType && LOW_EFFECTIVE_TYPES.has(effectiveType)) {
    return "low";
  }

  if (deviceMemory !== undefined && deviceMemory <= LOW_MEMORY_GB) {
    return "low";
  }

  if (hardwareConcurrency !== undefined && hardwareConcurrency <= LOW_CORES) {
    return "low";
  }

  if (
    deviceMemory !== undefined &&
    hardwareConcurrency !== undefined &&
    deviceMemory >= HIGH_MEMORY_GB &&
    hardwareConcurrency >= HIGH_CORES
  ) {
    return "high";
  }

  return "balanced";
}

export function getCappedDpr(tier: PerformanceTier, dpr: number) {
  const capped =
    tier === "low"
      ? Math.min(dpr, 0.75)
      : tier === "balanced"
        ? Math.min(dpr, 1)
        : Math.min(dpr, 1.5);

  return Math.max(0.5, capped);
}

export function getPerformanceHints(): PerformanceHints {
  if (typeof window === "undefined") {
    return {
      dpr: 1,
      prefersReducedMotion: false,
      performanceTier: "balanced",
    };
  }

  const connection =
    (navigator as Navigator & { connection?: { effectiveType?: string } })
      .connection ||
    (navigator as Navigator & { mozConnection?: { effectiveType?: string } })
      .mozConnection ||
    (navigator as Navigator & { webkitConnection?: { effectiveType?: string } })
      .webkitConnection;
  const effectiveType = connection?.effectiveType;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  const hardwareConcurrency = navigator.hardwareConcurrency;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const dpr = window.devicePixelRatio || 1;

  const performanceTier = getPerformanceTierFromHints({
    deviceMemory,
    hardwareConcurrency,
    effectiveType,
  });

  return {
    deviceMemory,
    hardwareConcurrency,
    effectiveType,
    dpr,
    prefersReducedMotion,
    performanceTier,
  };
}
