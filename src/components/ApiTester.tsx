"use client";

import { useState } from "react";

interface ApiTesterProps {
  onRequest: (endpoint: string, params?: Record<string, string>) => void;
  isLoading: boolean;
}

interface RouteConfig {
  path: string;
  label: string;
  params?: Array<{
    name: string;
    type: "text" | "select";
    options?: string[];
    placeholder?: string;
  }>;
}

const routes: RouteConfig[] = [
  { path: "/api/data", label: "All Data" },
  { path: "/api/data/about", label: "About" },
  {
    path: "/api/data/techStacks",
    label: "Tech Stacks",
    params: [
      {
        name: "type",
        type: "select",
        options: [
          "",
          "frontend",
          "backend",
          "cloud",
          "devops",
          "language",
          "database",
        ],
        placeholder: "Filter by type",
      },
    ],
  },
  {
    path: "/api/data/projects",
    label: "Projects",
    params: [
      {
        name: "id",
        type: "text",
        placeholder: "Project ID (e.g., rustedquotes)",
      },
      {
        name: "category",
        type: "select",
        options: ["", "web", "mobile", "bot"],
        placeholder: "Filter by category",
      },
    ],
  },
  { path: "/api/data/experiences", label: "Experiences" },
  { path: "/api/data/achievements", label: "Achievements" },
  { path: "/api/data/socials", label: "Socials" },
];

export default function ApiTester({ onRequest, isLoading }: ApiTesterProps) {
  const [selectedRoute, setSelectedRoute] = useState(routes[1]); 
  const [params, setParams] = useState<Record<string, string>>({});

  const handleRequest = () => {
    const filteredParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    onRequest(selectedRoute.path, filteredParams);
  };

  const buildUrl = () => {
    if (typeof window === "undefined") {
      return selectedRoute.path;
    }
    const url = new URL(selectedRoute.path, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
    return url.pathname + url.search;
  };

  return (
    <div
      className="w-full bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden"
      style={{
        boxShadow:
          "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0, 173, 180, 0.1)",
      }}
    >
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-[#161b22] dark:to-[#0d1117] px-3 sm:px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00adb4] animate-pulse" />
            API Request Builder
          </h3>
          <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-mono">
            v1.0
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex items-center justify-center px-3 py-2 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 rounded-lg font-mono text-xs sm:text-sm font-bold text-green-600 dark:text-green-400 shadow-sm">
            GET
          </div>
          <div className="flex-1 flex items-center px-3 py-2 bg-gray-50 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-xs sm:text-sm text-gray-700 dark:text-gray-300 overflow-x-auto shadow-inner">
            <span className="whitespace-nowrap">{buildUrl()}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#00adb4] rounded-full" />
            Select Endpoint
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {routes.map((route) => (
              <button
                key={route.path}
                onClick={() => {
                  setSelectedRoute(route);
                  setParams({});
                }}
                className={`px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-medium rounded-lg transition-all transform active:scale-95 ${
                  selectedRoute.path === route.path
                    ? "bg-gradient-to-r from-[#00adb4] to-[#0f7f82] text-white shadow-lg shadow-[#00adb4]/30 ring-2 ring-[#00adb4]/50"
                    : "bg-gray-100 dark:bg-[#161b22] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#1c2128] border border-gray-200 dark:border-gray-700 hover:border-[#00adb4]/30"
                }`}
              >
                {route.label}
              </button>
            ))}
          </div>
        </div>

        {selectedRoute.params && selectedRoute.params.length > 0 && (
          <div className="bg-gray-50/50 dark:bg-black/20 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#00adb4] rounded-full" />
              Query Parameters
            </label>
            <div className="space-y-3">
              {selectedRoute.params.map((param) => (
                <div key={param.name} className="flex flex-col gap-2">
                  <span className="text-[10px] sm:text-xs font-mono font-semibold text-gray-600 dark:text-gray-400">
                    {param.name}
                  </span>
                  {param.type === "text" ? (
                    <input
                      type="text"
                      value={params[param.name] || ""}
                      onChange={(e) =>
                        setParams({ ...params, [param.name]: e.target.value })
                      }
                      placeholder={param.placeholder}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00adb4] focus:border-transparent text-gray-900 dark:text-gray-100 shadow-sm transition-all"
                    />
                  ) : (
                    <select
                      value={params[param.name] || ""}
                      onChange={(e) =>
                        setParams({ ...params, [param.name]: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00adb4] focus:border-transparent text-gray-900 dark:text-gray-100 shadow-sm transition-all"
                    >
                      {param.options?.map((option) => (
                        <option key={option} value={option}>
                          {option || "None"}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleRequest}
          disabled={isLoading}
          className="w-full px-4 py-3 bg-gradient-to-r from-[#00adb4] to-[#0f7f82] hover:from-[#0f7f82] hover:to-[#188d94] disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all transform active:scale-95 shadow-lg shadow-[#00adb4]/30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none text-sm sm:text-base"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              <span className="hidden sm:inline">Sending Request...</span>
              <span className="sm:hidden">Sending...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Send Request
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
