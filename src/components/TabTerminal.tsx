"use client";

import { useEffect, useRef, useState } from "react";

interface LogEntry {
  timestamp: string;
  level: "info" | "success" | "error" | "warn";
  message: string;
  data?: any;
}

interface TerminalTab {
  id: string;
  label: string;
  route: string;
  logs: LogEntry[];
  isLoading: boolean;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const linkifyJson = (jsonString: string): React.ReactNode[] => {
  const urlRegex = /(https?:\/\/[^\s"',}\]]+)/g;
  const imageRegex = /"(\/[^"]*\.(jpg|jpeg|png|gif|webp|svg))"/gi;
  const downloadRegex = /"(\/[^"]*\.(apk|zip|pdf|exe|dmg|deb|rpm))"/gi;
  const emailRegex = /"([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})"/g;
  const phoneRegex =
    /"(\+?\d{1,4}[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{4,})"/g;
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

  const emailMatches: Array<{
    index: number;
    length: number;
    email: string;
  }> = [];
  let emailMatch;
  const emailRegexCopy = new RegExp(emailRegex);
  while ((emailMatch = emailRegexCopy.exec(jsonString)) !== null) {
    emailMatches.push({
      index: emailMatch.index,
      length: emailMatch[0].length,
      email: emailMatch[1],
    });
  }

  const phoneMatches: Array<{
    index: number;
    length: number;
    phone: string;
  }> = [];
  let phoneMatch;
  const phoneRegexCopy = new RegExp(phoneRegex);
  while ((phoneMatch = phoneRegexCopy.exec(jsonString)) !== null) {
    phoneMatches.push({
      index: phoneMatch.index,
      length: phoneMatch[0].length,
      phone: phoneMatch[1],
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
    ...emailMatches.map((m) => ({ ...m, type: "email" as const })),
    ...phoneMatches.map((m) => ({ ...m, type: "phone" as const })),
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
          <a
            href={imagePath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00adb4] hover:text-[#0f7f82] cursor-pointer underline decoration-dotted underline-offset-2 md:pointer-events-none"
            onClick={(e) => {
              if (window.innerWidth >= 768) {
                e.preventDefault();
              }
            }}
          >
            "{imagePath}"
          </a>
          <span className="fixed hidden md:group-hover:block z-[100] pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src={imagePath}
              alt="Preview"
              className="max-w-[280px] max-h-64 w-auto h-auto object-contain rounded-lg border-2 border-[#00adb4] shadow-2xl bg-gray-900/95"
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
    } else if (match.type === "email") {
      const email = (match as any).email;
      parts.push(
        <a
          key={`email-${idx}`}
          href={`mailto:${email}`}
          className="text-[#00adb4] hover:text-[#0f7f82] underline underline-offset-2 transition-colors cursor-pointer"
          onClick={(e) => e.stopPropagation()}
          title={`Send email to ${email}`}
        >
          "{email}"
        </a>
      );
    } else if (match.type === "phone") {
      const phone = (match as any).phone;
      const cleanPhone = phone.replace(/[\s()\-+]/g, "");
      parts.push(
        <a
          key={`phone-${idx}`}
          href={`https://wa.me/${cleanPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00adb4] hover:text-[#0f7f82] underline underline-offset-2 transition-colors cursor-pointer"
          onClick={(e) => e.stopPropagation()}
          title={`Chat on WhatsApp: ${phone}`}
        >
          "{phone}"
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

export default function TabTerminal() {
  const [tabs, setTabs] = useState<TerminalTab[]>([
    {
      id: "about",
      label: "about",
      route: "/api/data/about",
      logs: [],
      isLoading: false,
    },
    {
      id: "projects",
      label: "projects",
      route: "/api/data/projects",
      logs: [],
      isLoading: false,
    },
    {
      id: "experiences",
      label: "experiences",
      route: "/api/data/experiences",
      logs: [],
      isLoading: false,
    },
    {
      id: "achievements",
      label: "achievements",
      route: "/api/data/achievements",
      logs: [],
      isLoading: false,
    },
    {
      id: "techStacks",
      label: "tech-stacks",
      route: "/api/data/techStacks",
      logs: [],
      isLoading: false,
    },
    {
      id: "socials",
      label: "socials",
      route: "/api/data/socials",
      logs: [],
      isLoading: false,
    },
    {
      id: "blog",
      label: "blog",
      route: "/api/data/blog",
      logs: [],
      isLoading: false,
    },
    {
      id: "resume",
      label: "resume",
      route: "/resume",
      logs: [],
      isLoading: false,
    },
    {
      id: "contact",
      label: "contact",
      route: "/contact",
      logs: [],
      isLoading: false,
    },
  ]);

  const [activeTabId, setActiveTabId] = useState("about");
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [height, setHeight] = useState(350);
  const [isResizing, setIsResizing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const terminalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const hasScrolledOnce = useRef<{ [key: string]: boolean }>({});

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  const formatDataForDisplay = (data: any, tabId?: string): any => {
    if (!data) return data;
    if (typeof data === "string") return data;

    if (Array.isArray(data)) {
      if (tabId === "projects") {
        return data.map((item) => formatDataForDisplay(item, tabId));
      }
      if (data.length > 10) {
        return {
          type: "array",
          count: data.length,
          preview: data.slice(0, 3),
          message: `Array with ${data.length} items (showing first 3)`,
        };
      }
      return data.map((item) => formatDataForDisplay(item, tabId));
    }

    if (typeof data === "object") {
      const formatted: any = {};
      const keys = Object.keys(data);

      for (const key of keys) {
        const value = data[key];
        if (Array.isArray(value)) {
          if (tabId === "projects") {
            formatted[key] = value;
          } else if (value.length > 8) {
            formatted[key] = {
              _summary: `Array with ${value.length} items`,
              _preview: value.slice(0, 3),
              _note: "Showing first 3 items. Use specific endpoint to see all.",
            };
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

  const addLog = (
    tabId: string,
    level: LogEntry["level"],
    message: string,
    data?: any
  ) => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
    });

    const formattedData = data ? formatDataForDisplay(data, tabId) : undefined;

    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              logs: [
                ...tab.logs,
                { timestamp, level, message, data: formattedData },
              ],
            }
          : tab
      )
    );
  };

  const fetchTabData = async (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (!tab) return;

    if (tabId === "blog") {
      addLog(tabId, "info", "$ ls -l blog/latest");
      addLog(tabId, "info", "═".repeat(60));
      addLog(tabId, "success", "LATEST BLOG POSTS");
      addLog(tabId, "info", "═".repeat(60));
      addLog(tabId, "info", "");

      try {
        const response = await fetch("/api/data/blog");
        const result = await response.json();

        if (result.success && result.data) {
          const latestPosts = result.data
            .sort(
              (a: any, b: any) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 3);

          latestPosts.forEach((post: any, index: number) => {
            const date = new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            addLog(tabId, "info", `${index + 1}. ${post.title}`);
            addLog(
              tabId,
              "info",
              `   📅 ${date} • ${post.readingTime} min read • ${post.category}`
            );
            addLog(tabId, "info", "");
          });

          addLog(tabId, "info", "");
          addLog(tabId, "info", "", {
            actions: [
              {
                type: "view",
                label: "View All Blog Posts",
                icon: "external",
                url: "/blog",
                description: "Go to blog page",
              },
            ],
          });
        }
      } catch (error) {
        addLog(tabId, "error", "Failed to fetch blog posts");
      }
      return;
    }

    if (tabId === "resume") {
      addLog(tabId, "info", "$ cat resume.info");
      addLog(tabId, "info", "═".repeat(60));
      addLog(tabId, "success", "RESUME/CV - Rejaka Abimanyu Susanto");
      addLog(tabId, "info", "Full-Stack Web Developer & Database Engineer");
      addLog(tabId, "info", "═".repeat(60));
      addLog(tabId, "info", "");
      addLog(tabId, "info", "Available Actions:");
      addLog(tabId, "info", "", {
        actions: [
          {
            type: "view",
            label: "View Resume Online",
            icon: "external",
            url: "https://rejaka.id/resume",
            description: "Open resume in new tab",
          },
          {
            type: "download",
            label: "Download PDF Resume",
            icon: "download",
            url: "/assets/resume/Rejaka_Abimanyu_Susanto_Resume.pdf",
            description: "Download resume as PDF",
          },
        ],
      });
      addLog(tabId, "info", "");
      addLog(tabId, "success", "Click on the links above to view or download");
      return;
    }

    if (tabId === "contact") {
      addLog(tabId, "info", "$ cat contact.form");
      addLog(tabId, "info", "═".repeat(60));
      addLog(tabId, "success", "CONTACT FORM");
      addLog(tabId, "info", "Fill out the form below to send me a message");
      addLog(tabId, "info", "═".repeat(60));
      addLog(tabId, "info", "");
      addLog(tabId, "info", "", {
        contactForm: true,
      });
      return;
    }

    setTabs((prevTabs) =>
      prevTabs.map((t) => (t.id === tabId ? { ...t, isLoading: true } : t))
    );

    addLog(tabId, "info", `$ curl ${tab.route}`);
    addLog(tabId, "info", `Connecting to rejaka.id...`);

    const startTime = performance.now();

    try {
      const response = await fetch(tab.route);
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);

      addLog(
        tabId,
        "info",
        `HTTP ${response.status} ${response.statusText} (${duration}ms)`
      );

      const data = await response.json();

      if (response.ok) {
        addLog(tabId, "success", "Data received successfully");

        if (data.data) {
          const dataType = Array.isArray(data.data) ? "array" : "object";
          const count = Array.isArray(data.data)
            ? data.data.length
            : Object.keys(data.data).length;

          addLog(
            tabId,
            "info",
            `Response: ${count} ${
              dataType === "array" ? "items" : "properties"
            }`
          );
          addLog(tabId, "info", "Data:", data.data);
        }
      } else {
        addLog(tabId, "error", "Request failed", data);
      }
    } catch (error) {
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);
      addLog(tabId, "error", `Request failed after ${duration}ms`);
      addLog(
        tabId,
        "error",
        error instanceof Error ? error.message : "Unknown error"
      );
    } finally {
      setTabs((prevTabs) =>
        prevTabs.map((t) => (t.id === tabId ? { ...t, isLoading: false } : t))
      );
    }
  };

  useEffect(() => {
    const tab = tabs.find((t) => t.id === activeTabId);
    if (tab && tab.logs.length === 0) {
      fetchTabData(activeTabId);
    }
  }, [activeTabId]);

  useEffect(() => {
    const scrollContainer = scrollRefs.current[activeTabId];
    if (scrollContainer && activeTab && activeTab.logs.length > 0) {
      const delay = hasScrolledOnce.current[activeTabId] ? 150 : 600;

      if (activeTabId === "resume" || activeTabId === "blog") {
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
          hasScrolledOnce.current[activeTabId] = true;
        }, delay);
      } else {
        const dataLogIndex = activeTab.logs.findIndex(
          (log) => log.data && !log.data.actions
        );
        if (dataLogIndex !== -1) {
          setTimeout(() => {
            const logElements = scrollContainer.querySelectorAll(".log-entry");
            if (logElements[dataLogIndex]) {
              logElements[dataLogIndex].scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              hasScrolledOnce.current[activeTabId] = true;
            }
          }, delay);
        }
      }
    }
  }, [activeTab?.logs, activeTabId]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
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

  const clearTabLogs = (tabId: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === tabId ? { ...tab, logs: [] } : tab))
    );
    setTimeout(() => fetchTabData(tabId), 100);
  };

  const handleContactFormChange = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tabId = "contact";

    if (!contactForm.name.trim()) {
      addLog(tabId, "error", "Name is required");
      return;
    }
    if (!contactForm.email.trim()) {
      addLog(tabId, "error", "Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      addLog(tabId, "error", "Please enter a valid email address");
      return;
    }
    if (!contactForm.subject.trim()) {
      addLog(tabId, "error", "Subject is required");
      return;
    }
    if (!contactForm.message.trim()) {
      addLog(tabId, "error", "Message is required");
      return;
    }

    setIsSubmittingContact(true);
    addLog(tabId, "info", "");
    addLog(tabId, "info", "$ curl -X POST https://formsubmit.co/[email]");
    addLog(tabId, "info", "Sending your message...");

    try {
      const formData = new FormData();
      formData.append("name", contactForm.name);
      formData.append("email", contactForm.email);
      formData.append("subject", contactForm.subject);
      formData.append("message", contactForm.message);
      formData.append("_captcha", "false");
      formData.append("_template", "table");
      formData.append(
        "_autoresponse",
        "Thank you for contacting me! I'll get back to you soon."
      );

      const response = await fetch(
        "https://formsubmit.co/abim@rejaka.id",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        addLog(tabId, "success", "Message sent successfully!");
        addLog(tabId, "info", "");
        addLog(
          tabId,
          "info",
          `From: ${contactForm.name} <${contactForm.email}>`
        );
        addLog(tabId, "info", `Subject: ${contactForm.subject}`);
        addLog(tabId, "info", `Sent at: ${new Date().toLocaleString()}`);
        addLog(tabId, "info", "");
        addLog(tabId, "success", "✓ I'll get back to you soon!");

        setContactForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        addLog(tabId, "error", "Failed to send message. Please try again.");
      }
    } catch (error) {
      addLog(tabId, "error", "Network error. Please try again later.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmittingContact(false);
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
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#161b22] border-b border-gray-800 select-none">
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
            rejaka@portfolio ~ {activeTab?.route || "/"}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {activeTab?.isLoading && (
            <div className="flex items-center gap-2">
              <div className="animate-pulse w-2 h-2 rounded-full bg-[#00adb4]" />
              <span className="hidden sm:inline text-xs text-gray-400 font-mono">
                loading...
              </span>
            </div>
          )}
          <button
            onClick={() => clearTabLogs(activeTabId)}
            className="text-xs text-gray-400 hover:text-[#00adb4] font-mono transition-colors"
            title="Clear and reload"
          >
            ↻
          </button>
        </div>
      </div>

      <div className="bg-[#0d1117] border-b border-gray-800 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="flex items-center min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`relative px-3 sm:px-4 py-2 text-xs font-mono border-r border-gray-800 transition-all ${
                tab.id === activeTabId
                  ? "bg-[#161b22] text-[#00adb4]"
                  : "bg-[#0d1117] text-gray-500 hover:text-gray-300 hover:bg-[#161b22]/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{tab.label}</span>
                {tab.isLoading && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00adb4] animate-pulse" />
                )}
                {tab.logs.length > 0 && (
                  <span className="text-[9px] opacity-50">
                    ({tab.logs.length})
                  </span>
                )}
              </div>
              {tab.id === activeTabId && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00adb4]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={(el) => {
          scrollRefs.current[activeTabId] = el;
        }}
        className="h-[calc(100%-96px)] overflow-y-auto p-3 sm:p-4 font-mono text-xs sm:text-sm terminal-scrollbar"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#30363d #0d1117",
          background: "linear-gradient(180deg, #0d1117 0%, #010409 100%)",
        }}
      >
        {!activeTab || activeTab.logs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-xs sm:text-sm">
            <div className="text-center">
              <div className="mb-2">$ loading {activeTab?.label}...</div>
              <div className="animate-pulse">_</div>
            </div>
          </div>
        ) : (
          activeTab.logs.map((log, index) => (
            <div
              key={index}
              className="log-entry mb-2 leading-relaxed hover:bg-gray-900/30 px-2 py-1 rounded transition-colors"
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
                <>
                  {log.data.contactForm ? (
                    <form
                      onSubmit={handleContactFormSubmit}
                      className="mt-3 ml-0 sm:ml-4 space-y-4 max-w-2xl"
                    >
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1.5 font-mono">
                            $ name --required
                          </label>
                          <input
                            type="text"
                            value={contactForm.name}
                            onChange={(e) =>
                              handleContactFormChange("name", e.target.value)
                            }
                            placeholder="Your Name"
                            disabled={isSubmittingContact}
                            className="w-full px-3 py-2 bg-black/30 border border-gray-700 focus:border-[#00adb4] rounded text-gray-300 text-sm outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-400 mb-1.5 font-mono">
                            $ email --required
                          </label>
                          <input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) =>
                              handleContactFormChange("email", e.target.value)
                            }
                            placeholder="your.email@example.com"
                            disabled={isSubmittingContact}
                            className="w-full px-3 py-2 bg-black/30 border border-gray-700 focus:border-[#00adb4] rounded text-gray-300 text-sm outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-400 mb-1.5 font-mono">
                            $ subject --required
                          </label>
                          <input
                            type="text"
                            value={contactForm.subject}
                            onChange={(e) =>
                              handleContactFormChange("subject", e.target.value)
                            }
                            placeholder="What's this about?"
                            disabled={isSubmittingContact}
                            className="w-full px-3 py-2 bg-black/30 border border-gray-700 focus:border-[#00adb4] rounded text-gray-300 text-sm outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-400 mb-1.5 font-mono">
                            $ message --required
                          </label>
                          <textarea
                            value={contactForm.message}
                            onChange={(e) =>
                              handleContactFormChange("message", e.target.value)
                            }
                            placeholder="Your message here..."
                            rows={6}
                            disabled={isSubmittingContact}
                            className="w-full px-3 py-2 bg-black/30 border border-gray-700 focus:border-[#00adb4] rounded text-gray-300 text-sm outline-none transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingContact}
                        className="group flex items-center gap-3 px-6 py-3 bg-[#00adb4] hover:bg-[#0f7f82] disabled:bg-gray-700 text-white font-mono text-sm rounded-lg transition-all disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isSubmittingContact ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              />
                            </svg>
                            <span>$ send --message</span>
                          </>
                        )}
                      </button>
                    </form>
                  ) : log.data.actions ? (
                    <div className="mt-3 ml-0 sm:ml-4 space-y-2">
                      {log.data.actions.map((action: any, idx: number) => (
                        <a
                          key={idx}
                          href={action.url}
                          target={action.type === "view" ? "_blank" : undefined}
                          rel={
                            action.type === "view"
                              ? "noopener noreferrer"
                              : undefined
                          }
                          download={
                            action.type === "download" ? true : undefined
                          }
                          className="group flex items-center gap-3 p-3 bg-gray-900/50 hover:bg-gray-800/70 border border-gray-700 hover:border-[#00adb4] rounded-lg transition-all cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="shrink-0">
                            <svg
                              className="w-6 h-6 text-gray-400 group-hover:text-[#00adb4] transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              {action.icon === "external" ? (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              ) : (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              )}
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-[#00adb4] group-hover:text-[#0f7f82] font-semibold text-sm">
                              {action.label}
                            </div>
                            <div className="text-gray-500 text-xs mt-0.5">
                              {action.description}
                            </div>
                          </div>
                          <svg
                            className="w-5 h-5 text-gray-500 group-hover:text-[#00adb4] transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {action.type === "view" ? (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            ) : (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            )}
                          </svg>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <pre className="mt-2 ml-0 sm:ml-4 p-2 text-[10px] sm:text-xs text-gray-400 bg-black/30 rounded border border-gray-800 whitespace-pre-wrap break-words overflow-hidden">
                      {linkifyJson(JSON.stringify(log.data, null, 2))}
                    </pre>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>

      {!isFullscreen && (
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className={`absolute bottom-0 left-0 right-0 h-3 cursor-ns-resize hover:bg-[#00adb4] transition-all group z-10 ${
            isResizing ? "bg-[#00adb4] h-4" : "bg-gray-700/50"
          }`}
        >
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
            <div
              className={`flex gap-1 transition-opacity ${
                isResizing ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
