"use client";

import { useEffect, useRef, useState } from "react";

interface TerminalProps {
  logs: LogEntry[];
  isLoading?: boolean;
}

interface LogEntry {
  timestamp: string;
  level: "info" | "success" | "error" | "warn";
  message: string;
  data?: any;
}

const linkifyJson = (jsonString: string): React.ReactNode[] => {
  const urlRegex = /(https?:\/\/[^\s"',}\]]+)/g;
  const imageRegex = /"(\/[^"]*\.(jpg|jpeg|png|gif|webp|svg))"/gi;
  const downloadRegex = /"(\/[^"]*\.(apk|zip|pdf|exe|dmg|deb|rpm))"/gi;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  const imageMatches: Array<{ index: number; length: number; path: string }> =
    [];
  let imageMatch;
  const imageRegexCopy = new RegExp(imageRegex);
  while ((imageMatch = imageRegexCopy.exec(jsonString)) !== null) {
    imageMatches.push({
      index: imageMatch.index,
      length: imageMatch[0].length,
      path: imageMatch[1],
    });
  }

  const downloadMatches: Array<{
    index: number;
    length: number;
    path: string;
  }> = [];
  let downloadMatch;
  const downloadRegexCopy = new RegExp(downloadRegex);
  while ((downloadMatch = downloadRegexCopy.exec(jsonString)) !== null) {
    downloadMatches.push({
      index: downloadMatch.index,
      length: downloadMatch[0].length,
      path: downloadMatch[1],
    });
  }

  const urlMatches: Array<{ index: number; length: number; url: string }> = [];
  let urlMatch: RegExpExecArray | null;
  while ((urlMatch = urlRegex.exec(jsonString)) !== null) {
    const isPartOfImage = imageMatches.some(
      (img) =>
        urlMatch!.index >= img.index && urlMatch!.index < img.index + img.length
    );
    const isPartOfDownload = downloadMatches.some(
      (dl) =>
        urlMatch!.index >= dl.index && urlMatch!.index < dl.index + dl.length
    );
    if (!isPartOfImage && !isPartOfDownload) {
      urlMatches.push({
        index: urlMatch.index,
        length: urlMatch[0].length,
        url: urlMatch[1],
      });
    }
  }

  const allMatches = [
    ...imageMatches.map((m) => ({ ...m, type: "image" as const })),
    ...downloadMatches.map((m) => ({ ...m, type: "download" as const })),
    ...urlMatches.map((m) => ({ ...m, type: "url" as const })),
  ].sort((a, b) => a.index - b.index);

  allMatches.forEach((match, idx) => {
    if (match.index > lastIndex) {
      parts.push(jsonString.substring(lastIndex, match.index));
    }

    if (match.type === "image") {
      const imagePath = (match as any).path;
      parts.push(
        <span key={`img-${idx}`} className="relative inline-block group">
          <span className="text-[#00adb4] hover:text-[#0f7f82] cursor-pointer underline decoration-dotted underline-offset-2">
            "{imagePath}"
          </span>
          <span className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-50 pointer-events-none">
            <img
              src={imagePath}
              alt="Preview"
              className="max-w-xs max-h-96 w-auto h-auto object-contain rounded-lg border-2 border-[#00adb4] shadow-2xl bg-gray-900/95"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </span>
        </span>
      );
    } else if (match.type === "download") {
      const downloadPath = (match as any).path;
      const fileName = downloadPath.split("/").pop() || "file";
      const fileExt = fileName.split(".").pop()?.toUpperCase() || "";
      parts.push(
        <a
          key={`dl-${idx}`}
          href={downloadPath}
          download={fileName}
          className="text-[#00adb4] hover:text-[#0f7f82] underline decoration-dotted underline-offset-2 transition-colors cursor-pointer inline-flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
          title={`Download ${fileName}`}
        >
          <span>"{downloadPath}"</span>
          <svg
            className="w-3 h-3 inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span className="text-[10px] text-gray-500">({fileExt})</span>
        </a>
      );
    } else {
      const url = (match as any).url;
      parts.push(
        <a
          key={`url-${idx}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00adb4] hover:text-[#0f7f82] underline decoration-dotted underline-offset-2 transition-colors cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {url}
        </a>
      );
    }

    lastIndex = match.index + match.length;
  });

  if (lastIndex < jsonString.length) {
    parts.push(jsonString.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [jsonString];
};

export default function Terminal({ logs, isLoading }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newHeight = Math.max(
          200,
          Math.min(e.clientY - rect.top, window.innerHeight - 150)
        );
        setHeight(newHeight);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isResizing && containerRef.current && e.touches[0]) {
        const rect = containerRef.current.getBoundingClientRect();
        const newHeight = Math.max(
          200,
          Math.min(e.touches[0].clientY - rect.top, window.innerHeight - 150)
        );
        setHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isResizing]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "info":
        return "text-blue-400";
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
      case "warn":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const getLevelSymbol = (level: string) => {
    switch (level) {
      case "info":
        return "[INFO]";
      case "success":
        return "[SUCCESS]";
      case "error":
        return "[ERROR]";
      case "warn":
        return "[WARN]";
      default:
        return "[LOG]";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-[#0d1117] rounded-lg overflow-hidden shadow-2xl border border-gray-800 ${
        isFullscreen ? "fixed inset-4 z-50" : ""
      }`}
      style={{
        height: isFullscreen ? "calc(100vh - 2rem)" : `${height}px`,
        boxShadow:
          "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0, 173, 180, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
        transform: isFullscreen ? "none" : "perspective(1000px) rotateX(1deg)",
        transformOrigin: "top",
        transition: isResizing ? "none" : "transform 0.3s ease",
      }}
    >
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#161b22] border-b border-gray-800 cursor-move select-none">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 sm:ml-3 text-xs text-gray-400 font-mono truncate">
            api-logger@rejaka.id ~ /api/data
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="animate-pulse w-2 h-2 rounded-full bg-[#00adb4]" />
              <span className="hidden sm:inline text-xs text-gray-400 font-mono">
                fetching...
              </span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span className="hidden sm:inline">Lines: {logs.length}</span>
            <span className="sm:hidden">{logs.length}</span>
          </div>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="h-[calc(100%-48px)] overflow-y-auto p-3 sm:p-4 font-mono text-xs sm:text-sm terminal-scrollbar"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#30363d #0d1117",
          background: "linear-gradient(180deg, #0d1117 0%, #010409 100%)",
        }}
      >
        {logs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-xs sm:text-sm">
            <div className="text-center">
              <div className="mb-2">$ waiting for requests...</div>
              <div className="animate-pulse">_</div>
            </div>
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className="mb-2 leading-relaxed hover:bg-gray-900/30 px-2 py-1 rounded transition-colors"
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-gray-500 text-[10px] sm:text-xs shrink-0">
                  {log.timestamp}
                </span>
                <span
                  className={`${getLevelColor(
                    log.level
                  )} font-semibold text-xs shrink-0`}
                >
                  {getLevelSymbol(log.level)}
                </span>
                <span className="text-gray-300 text-xs sm:text-sm break-all">
                  {log.message}
                </span>
              </div>
              {log.data && (
                <pre className="mt-2 ml-0 sm:ml-4 p-2 text-[10px] sm:text-xs text-gray-400 bg-black/30 rounded border border-gray-800 whitespace-pre-wrap break-words overflow-hidden">
                  {linkifyJson(JSON.stringify(log.data, null, 2))}
                </pre>
              )}
            </div>
          ))
        )}
      </div>

      {!isFullscreen && (
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className={`absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-[#00adb4] transition-all group ${
            isResizing ? "bg-[#00adb4] h-3" : "bg-gray-700/50"
          }`}
        >
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
            <div
              className={`flex gap-1 transition-opacity ${
                isResizing ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <div className="w-8 h-0.5 bg-gray-400 rounded-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
