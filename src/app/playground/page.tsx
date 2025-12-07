"use client";

import { useState } from "react";
import Link from "next/link";
import ASCIIText from "@/components/ASCIIText";
import FaultyTerminal from "@/components/FaultyTerminal";

interface PlaygroundRoute {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  mockData: any;
}

interface LogEntry {
  timestamp: string;
  method: string;
  url: string;
  status: number;
  response: any;
}

const defaultRoutes: PlaygroundRoute[] = [
  {
    id: "about",
    method: "GET",
    path: "/api/data/about",
    description: "Get about information",
    mockData: null,
  },
  {
    id: "projects",
    method: "GET",
    path: "/api/data/projects",
    description: "Get all projects",
    mockData: null,
  },
  {
    id: "experiences",
    method: "GET",
    path: "/api/data/experiences",
    description: "Get work experiences",
    mockData: null,
  },
  {
    id: "achievements",
    method: "GET",
    path: "/api/data/achievements",
    description: "Get achievements",
    mockData: null,
  },
  {
    id: "techStacks",
    method: "GET",
    path: "/api/data/techStacks",
    description: "Get tech stacks",
    mockData: null,
  },
  {
    id: "socials",
    method: "GET",
    path: "/api/data/socials",
    description: "Get social links",
    mockData: null,
  },
];

export default function PlaygroundPage() {
  const [customRoutes, setCustomRoutes] = useState<PlaygroundRoute[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<
    "GET" | "POST" | "PUT" | "DELETE"
  >("GET");
  const [customPath, setCustomPath] = useState("");
  const [requestBody, setRequestBody] = useState("{}");
  const [isLoading, setIsLoading] = useState(false);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRoutePath, setNewRoutePath] = useState("");
  const [newRouteMethod, setNewRouteMethod] = useState<
    "GET" | "POST" | "PUT" | "DELETE"
  >("GET");
  const [newRouteDescription, setNewRouteDescription] = useState("");
  const [newRouteMockData, setNewRouteMockData] = useState("{}");

  const allRoutes = [...defaultRoutes, ...customRoutes];

  const addLog = (
    method: string,
    url: string,
    status: number,
    response: any
  ) => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
    });
    setLogs((prev) => [{ timestamp, method, url, status, response }, ...prev]);
  };

  const handleRequest = async () => {
    setIsLoading(true);
    const startTime = performance.now();

    try {
      const path = selectedRoute || customPath;
      const customRoute = customRoutes.find((r) => r.path === path);

      if (customRoute && customRoute.mockData) {
        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);

        const mockResponse = {
          success: true,
          data: customRoute.mockData,
          message: `Mock response from custom route (${duration}ms)`,
          playground: true,
        };

        addLog(selectedMethod, path, 200, mockResponse);
        setIsLoading(false);
        return;
      }

      const url = path.startsWith("http")
        ? path
        : `${window.location.origin}${path}`;

      const options: RequestInit = {
        method: selectedMethod,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (selectedMethod !== "GET" && requestBody) {
        try {
          options.body = requestBody;
        } catch (e) {
          throw new Error("Invalid JSON in request body");
        }
      }

      const response = await fetch(url, options);
      const data = await response.json();
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);

      addLog(selectedMethod, path, response.status, {
        ...data,
        _duration: `${duration}ms`,
      });
    } catch (error) {
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);
      addLog(selectedMethod, selectedRoute || customPath, 500, {
        error: error instanceof Error ? error.message : "Unknown error",
        _duration: `${duration}ms`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createCustomRoute = () => {
    if (!newRoutePath) return;

    try {
      const mockData = JSON.parse(newRouteMockData);
      const newRoute: PlaygroundRoute = {
        id: `custom-${Date.now()}`,
        method: newRouteMethod,
        path: newRoutePath,
        description: newRouteDescription || "Custom route",
        mockData,
      };

      setCustomRoutes((prev) => [...prev, newRoute]);
      setShowCreateForm(false);
      setNewRoutePath("");
      setNewRouteDescription("");
      setNewRouteMockData("{}");

      addLog("CREATE", newRoutePath, 201, {
        success: true,
        message: "Custom route created",
        route: newRoute,
      });
    } catch (e) {
      alert("Invalid JSON in mock data");
    }
  };

  const deleteCustomRoute = (id: string) => {
    const route = customRoutes.find((r) => r.id === id);
    setCustomRoutes((prev) => prev.filter((r) => r.id !== id));
    if (route) {
      addLog("DELETE", route.path, 200, {
        success: true,
        message: "Custom route deleted",
      });
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <header className="text-center mb-4">
          <div
            className="hidden sm:block -mt-2 -mb-12"
            role="img"
            aria-label="API Playground ASCII Art Title"
          >
            <ASCIIText
              text="API_PLAYGROUND"
              enableWaves={true}
              asciiFontSize={8}
              textFontSize={120}
              planeBaseHeight={8}
            />
          </div>

          <div
            className="sm:hidden -mt-1 -mb-8"
            role="img"
            aria-label="Playground ASCII Art Title"
          >
            <ASCIIText
              text="PLAYGROUND"
              enableWaves={true}
              asciiFontSize={6}
              textFontSize={70}
              planeBaseHeight={6}
            />
          </div>

          <div className="relative mt-1 sm:mt-2 mb-8 sm:mb-6">
            <Link
              href="/"
              className="inline-block relative z-30 px-3 py-1 text-[#00adb4] hover:text-[#0f7f82] font-mono text-sm underline underline-offset-4 decoration-2 transition-colors"
            >
              $ cd ~
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 shadow-2xl">
            <h2 className="text-[#00adb4] font-mono font-semibold mb-4 text-sm">
              REQUEST BUILDER
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-gray-400 font-mono text-xs mb-1">
                  Method
                </label>
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value as any)}
                  className="w-full bg-[#161b22] text-gray-300 border border-gray-700 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00adb4]"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 font-mono text-xs mb-1">
                  Select Route or Enter Custom
                </label>
                <select
                  value={selectedRoute}
                  onChange={(e) => {
                    setSelectedRoute(e.target.value);
                    setCustomPath("");
                  }}
                  className="w-full bg-[#161b22] text-gray-300 border border-gray-700 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00adb4] mb-2"
                >
                  <option value="">-- Select or enter custom --</option>
                  {allRoutes.map((route) => (
                    <option key={route.id} value={route.path}>
                      {route.method} {route.path}{" "}
                      {route.mockData ? "(Mock)" : ""}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={customPath}
                  onChange={(e) => {
                    setCustomPath(e.target.value);
                    setSelectedRoute("");
                  }}
                  placeholder="/api/custom/path"
                  className="w-full bg-[#161b22] text-gray-300 border border-gray-700 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00adb4]"
                />
              </div>

              {selectedMethod !== "GET" && (
                <div>
                  <label className="block text-gray-400 font-mono text-xs mb-1">
                    Request Body (JSON)
                  </label>
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    rows={6}
                    className="w-full bg-[#161b22] text-gray-300 border border-gray-700 rounded px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#00adb4]"
                    placeholder='{"key": "value"}'
                  />
                </div>
              )}

              <button
                onClick={handleRequest}
                disabled={isLoading || (!selectedRoute && !customPath)}
                className="w-full bg-[#00adb4] hover:bg-[#0f7f82] disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-mono font-semibold py-3 rounded-lg transition-colors"
              >
                {isLoading ? "Loading..." : "$ Send Request"}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#00adb4] font-mono font-semibold text-sm">
                  CUSTOM ROUTES ({customRoutes.length})
                </h3>
                <button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="text-xs text-gray-400 hover:text-[#00adb4] font-mono transition-colors"
                >
                  {showCreateForm ? "Cancel" : "+ Create"}
                </button>
              </div>

              {showCreateForm && (
                <div className="bg-[#161b22] border border-gray-700 rounded p-3 space-y-2 mb-3">
                  <input
                    type="text"
                    value={newRoutePath}
                    onChange={(e) => setNewRoutePath(e.target.value)}
                    placeholder="/api/custom/route"
                    className="w-full bg-[#0d1117] text-gray-300 border border-gray-700 rounded px-2 py-1 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#00adb4]"
                  />
                  <select
                    value={newRouteMethod}
                    onChange={(e) => setNewRouteMethod(e.target.value as any)}
                    className="w-full bg-[#0d1117] text-gray-300 border border-gray-700 rounded px-2 py-1 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#00adb4]"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                  <input
                    type="text"
                    value={newRouteDescription}
                    onChange={(e) => setNewRouteDescription(e.target.value)}
                    placeholder="Description (optional)"
                    className="w-full bg-[#0d1117] text-gray-300 border border-gray-700 rounded px-2 py-1 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#00adb4]"
                  />
                  <textarea
                    value={newRouteMockData}
                    onChange={(e) => setNewRouteMockData(e.target.value)}
                    rows={4}
                    placeholder='Mock data: {"key": "value"}'
                    className="w-full bg-[#0d1117] text-gray-300 border border-gray-700 rounded px-2 py-1 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#00adb4]"
                  />
                  <button
                    onClick={createCustomRoute}
                    className="w-full bg-[#00adb4] hover:bg-[#0f7f82] text-white font-mono text-xs py-2 rounded transition-colors"
                  >
                    Create Route
                  </button>
                </div>
              )}

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {customRoutes.map((route) => (
                  <div
                    key={route.id}
                    className="bg-[#161b22] border border-gray-700 rounded p-2 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="font-mono text-xs text-[#00adb4]">
                        {route.method} {route.path}
                      </div>
                      <div className="font-mono text-[10px] text-gray-500">
                        {route.description}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteCustomRoute(route.id)}
                      className="text-red-400 hover:text-red-300 text-xs ml-2"
                      title="Delete route"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {customRoutes.length === 0 && !showCreateForm && (
                  <div className="text-gray-500 text-xs font-mono text-center py-4">
                    No custom routes yet. Click + Create to add one.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#00adb4] font-mono font-semibold text-sm">
                REQUEST LOGS ({logs.length})
              </h2>
              {logs.length > 0 && (
                <button
                  onClick={() => setLogs([])}
                  className="text-xs text-gray-400 hover:text-[#00adb4] font-mono transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto font-mono text-xs">
              {logs.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                  No requests yet. Send a request to see logs here.
                </div>
              ) : (
                logs.map((log, index) => (
                  <div
                    key={index}
                    className="bg-[#161b22] border border-gray-700 rounded p-3"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500">{log.timestamp}</span>
                      <span
                        className={`font-semibold ${
                          log.method === "GET"
                            ? "text-blue-400"
                            : log.method === "POST"
                            ? "text-green-400"
                            : log.method === "PUT"
                            ? "text-yellow-400"
                            : log.method === "DELETE"
                            ? "text-red-400"
                            : "text-gray-400"
                        }`}
                      >
                        {log.method}
                      </span>
                      <span className="text-gray-400 truncate flex-1">
                        {log.url}
                      </span>
                      <span
                        className={`font-semibold ${
                          log.status >= 200 && log.status < 300
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {log.status}
                      </span>
                    </div>
                    <pre className="text-gray-400 text-[10px] overflow-x-auto bg-black/30 p-2 rounded">
                      {JSON.stringify(log.response, null, 2)}
                    </pre>
                  </div>
                ))
              )}
            </div>
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
