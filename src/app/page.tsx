"use client";

import { useEffect, useState } from "react";
import Terminal from "@/components/Terminal";
import ApiTester from "@/components/ApiTester";
import ASCIIText from "@/components/ASCIIText";
import FaultyTerminal from "@/components/FaultyTerminal";

interface LogEntry {
  timestamp: string;
  level: "info" | "success" | "error" | "warn";
  message: string;
  data?: any;
}

export default function Home() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatDataForDisplay = (data: any): any => {
    if (!data) return data;

    if (typeof data === "string") return data;

    if (Array.isArray(data)) {
      if (data.length > 10) {
        return {
          type: "array",
          count: data.length,
          preview: data.slice(0, 3),
          message: `Array with ${data.length} items (showing first 3)`,
        };
      }
      return data.map((item) => formatDataForDisplay(item));
    }

    if (typeof data === "object") {
      const formatted: any = {};
      const keys = Object.keys(data);

      for (const key of keys) {
        const value = data[key];

        if (Array.isArray(value)) {
          if (value.length > 5) {
            formatted[key] = `[Array: ${value.length} items]`;
          } else {
            formatted[key] = value;
          }
        } else if (typeof value === "object" && value !== null) {
          const nestedKeys = Object.keys(value);
          if (nestedKeys.length > 10) {
            formatted[key] = `{Object: ${nestedKeys.length} keys}`;
          } else {
            formatted[key] = value;
          }
        } else {
          formatted[key] = value;
        }
      }

      return formatted;
    }

    return data;
  };

  const addLog = (level: LogEntry["level"], message: string, data?: any) => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
    });

    const formattedData = data ? formatDataForDisplay(data) : undefined;

    setLogs((prev) => [
      ...prev,
      { timestamp, level, message, data: formattedData },
    ]);
  };

  useEffect(() => {
    addLog("info", "System initialized");
    addLog("info", "Loading default data from /api/data...");
    handleRequest("/api/data");
  }, []);

  const handleRequest = async (
    endpoint: string,
    params?: Record<string, string>
  ) => {
    setIsLoading(true);

    const url = new URL(endpoint, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const fullPath = url.pathname + url.search;
    addLog("info", `Starting request to ${fullPath}`);
    addLog("info", `Method: GET | URL: ${fullPath}`);

    const startTime = performance.now();

    try {
      const response = await fetch(fullPath);
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);

      addLog("info", `Response received in ${duration}ms`);
      addLog("info", `Status: ${response.status} ${response.statusText}`);

      const data = await response.json();

      if (response.ok) {
        const summary = {
          success: data.success,
          timestamp: data.timestamp,
          dataKeys: data.data ? Object.keys(data.data) : [],
        };
        addLog("success", "Request completed successfully", summary);

        if (data.data) {
          const dataType = Array.isArray(data.data) ? "array" : "object";
          const count = Array.isArray(data.data)
            ? data.data.length
            : Object.keys(data.data).length;

          addLog(
            "info",
            `Response contains ${count} ${
              dataType === "array" ? "items" : "properties"
            }`,
            data.data
          );
        }
      } else {
        addLog("error", "Request failed", data);
      }
    } catch (error) {
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);
      addLog("error", `Request failed after ${duration}ms`);
      addLog("error", error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative font-sans">
      <div className="fixed inset-0 z-0">
        <FaultyTerminal
          scale={1.2}
          gridMul={[2, 1]}
          digitSize={1.5}
          timeScale={0.2}
          scanlineIntensity={0.2}
          glitchAmount={0.8}
          flickerAmount={0.5}
          noiseAmp={0.8}
          chromaticAberration={0}
          dither={0.5}
          curvature={0.1}
          tint="#00adb4"
          mouseReact={true}
          mouseStrength={0.15}
          pageLoadAnimation={true}
          brightness={0.3}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <div className="mb-4">
            <ASCIIText
              text="REJAKA_PORTFOLIO"
              enableWaves={true}
              asciiFontSize={8}
              textFontSize={150}
              planeBaseHeight={8}
            />
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="w-full">
            <Terminal logs={logs} isLoading={isLoading} />
          </div>

          <div className="w-full">
            <ApiTester onRequest={handleRequest} isLoading={isLoading} />
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm border border-gray-700 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#00adb4] animate-pulse" />
            <span className="text-xs sm:text-sm text-gray-400 font-mono">
              Built with Passion • Rejaka Portfolio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
