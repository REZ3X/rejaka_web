"use client";

import { usePathname } from "next/navigation";
import PerformanceModeToggle from "@/components/PerformanceModeToggle";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import PerformanceMetricsOverlay from "@/components/PerformanceMetricsOverlay";

export default function PerformanceWidgetsGate() {
  const pathname = usePathname();

  if (pathname === "/resume") {
    return null;
  }

  return (
    <>
      <PerformanceModeToggle />
      <PerformanceMetrics />
      <PerformanceMetricsOverlay />
    </>
  );
}
