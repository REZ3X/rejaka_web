"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useViewMode } from "@/context/ViewModeContext";
import {
  HiUser,
  HiCode,
  HiBriefcase,
  HiStar,
  HiPhone,
  HiDocumentText,
  HiMail,
  HiLink,
  HiChat,
} from "react-icons/hi";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

interface AboutData {
  name: string;
  bio: string;
  image: string;
}

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string[];
  features: string[];
  year: number;
  links: { label: string; url: string; type: string }[];
}

interface ExperienceData {
  title: string;
  company: string;
  period: string;
}

interface AchievementData {
  title: string;
  issuer: string;
  year: string;
  description: string;
  image: string;
}

interface SocialData {
  contactInfo: { type: string; label: string; value: string }[];
  socialLinks: { type: string; label: string; value: string; url: string }[];
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

type TabId =
  | "about"
  | "projects"
  | "experiences"
  | "achievements"
  | "socials"
  | "blog"
  | "contact";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: "about", label: "About", icon: <HiUser className="w-4 h-4" /> },
  { id: "projects", label: "Projects", icon: <HiCode className="w-4 h-4" /> },
  {
    id: "experiences",
    label: "Experience",
    icon: <HiBriefcase className="w-4 h-4" />,
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: <HiStar className="w-4 h-4" />,
  },
  { id: "socials", label: "Socials", icon: <HiLink className="w-4 h-4" /> },
  { id: "blog", label: "Blog", icon: <HiDocumentText className="w-4 h-4" /> },
  { id: "contact", label: "Contact", icon: <HiMail className="w-4 h-4" /> },
];

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function GUITerminal() {
  const { activeTab: sharedActiveTab, setActiveTab: setSharedActiveTab } =
    useViewMode();

  const validTabs: TabId[] = [
    "about",
    "projects",
    "experiences",
    "achievements",
    "socials",
    "blog",
    "contact",
  ];
  const activeTab: TabId = validTabs.includes(sharedActiveTab as TabId)
    ? (sharedActiveTab as TabId)
    : "about";

  const setActiveTab = (tab: TabId) => {
    setSharedActiveTab(tab);
  };
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [achievements, setAchievements] = useState<AchievementData[]>([]);
  const [socials, setSocials] = useState<SocialData | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set()
  );
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactStatus, setContactStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [selectedAchievement, setSelectedAchievement] =
    useState<AchievementData | null>(null);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -8;
    const tiltY = ((x - centerX) / centerX) * 8;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        switch (activeTab) {
          case "about":
            if (!aboutData) {
              const res = await fetch("/api/data/about");
              const data = await res.json();
              if (data.success) setAboutData(data.data);
            }
            break;
          case "projects":
            if (projects.length === 0) {
              const res = await fetch("/api/data/projects");
              const data = await res.json();
              if (data.success) setProjects(data.data);
            }
            break;
          case "experiences":
            if (experiences.length === 0) {
              const res = await fetch("/api/data/experiences");
              const data = await res.json();
              if (data.success) setExperiences(data.data);
            }
            break;
          case "achievements":
            if (achievements.length === 0) {
              const res = await fetch("/api/data/achievements");
              const data = await res.json();
              if (data.success) setAchievements(data.data);
            }
            break;
          case "socials":
            if (!socials) {
              const res = await fetch("/api/data/socials");
              const data = await res.json();
              if (data.success) setSocials(data.data);
            }
            break;
          case "blog":
            if (blogPosts.length === 0) {
              const res = await fetch("/api/data/blog");
              const data = await res.json();
              if (data.success) setBlogPosts(data.data.slice(0, 6));
            }
            break;
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    activeTab,
    aboutData,
    projects.length,
    experiences.length,
    achievements.length,
    socials,
    blogPosts.length,
  ]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !contactForm.name.trim() ||
      !contactForm.email.trim() ||
      !contactForm.subject.trim() ||
      !contactForm.message.trim()
    ) {
      setContactStatus({ type: "error", message: "Please fill in all fields" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      setContactStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmittingContact(true);
    setContactStatus(null);

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

      const response = await fetch("https://formsubmit.co/abim@rejaka.id", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setContactStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setContactForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setContactStatus({
          type: "error",
          message: "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setContactStatus({
        type: "error",
        message: "Network error. Please try again later.",
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const renderAbout = () => {
    const renderBioWithLinks = (bio: string) => {
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let match;

      while ((match = linkRegex.exec(bio)) !== null) {
        if (match.index > lastIndex) {
          parts.push(bio.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={match.index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00adb4] hover:text-[#0f7f82] underline decoration-dotted underline-offset-2 transition-colors"
          >
            {match[1]}
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < bio.length) {
        parts.push(bio.substring(lastIndex));
      }
      return parts.length > 0 ? parts : bio;
    };

    return (
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start">
        <div
          ref={imageContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0 cursor-pointer"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition:
              tilt.x === 0 && tilt.y === 0
                ? "transform 0.3s ease-out"
                : "transform 0.1s ease-out",
          }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#00adb4] to-[#0f7f82] rounded-2xl"
            style={{
              transform: "rotate(3deg) translateZ(-10px)",
            }}
          />
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#00adb4]/50 shadow-lg shadow-[#00adb4]/20">
            {aboutData?.image && (
              <Image
                src={aboutData.image}
                alt={aboutData.name || "Profile"}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            {aboutData?.name || "Loading..."}
          </h2>
          <div className="inline-block px-3 py-1 bg-[#00adb4]/20 border border-[#00adb4]/50 rounded-full text-[#00adb4] text-sm mb-4">
            Web Developer
          </div>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {aboutData?.bio ? renderBioWithLinks(aboutData.bio) : "Loading..."}
          </p>
        </div>
      </div>
    );
  };

  const renderProjects = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {isLoading && projects.length === 0 ? (
        <div className="col-span-full text-center py-8 text-gray-400">
          Loading projects...
        </div>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="group bg-[#161b22] border border-gray-800 rounded-xl p-5 hover:border-[#00adb4]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#00adb4]/10"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white group-hover:text-[#00adb4] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{project.subtitle}</p>
              </div>
              <span className="text-xs px-2 py-1 bg-[#00adb4]/20 text-[#00adb4] rounded-full ml-2">
                {project.year}
              </span>
            </div>

            <div className="mb-4">
              <p
                className={`text-gray-300 text-sm ${
                  expandedProjects.has(project.id) ? "" : "line-clamp-2"
                }`}
              >
                {project.description.join(" ")}
              </p>
              {project.description.join(" ").length > 120 && (
                <button
                  onClick={() => {
                    setExpandedProjects((prev) => {
                      const newSet = new Set(prev);
                      if (newSet.has(project.id)) {
                        newSet.delete(project.id);
                      } else {
                        newSet.add(project.id);
                      }
                      return newSet;
                    });
                  }}
                  className="text-[#00adb4] text-xs underline underline-offset-2 hover:text-[#0f7f82] transition-colors mt-1"
                >
                  {expandedProjects.has(project.id) ? "See less" : "See more"}
                </button>
              )}
            </div>

            {project.features && project.features.length > 0 && (
              <div className="mb-4">
                <ul className="text-xs text-gray-400 space-y-1">
                  {project.features.slice(0, 2).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#00adb4] mt-0.5">▸</span>
                      <span className="line-clamp-1">
                        {feature.split(":")[0]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.links && project.links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-[#00adb4]/10 text-[#00adb4] rounded-lg hover:bg-[#00adb4]/20 transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );

  const renderExperiences = () => (
    <div className="space-y-4">
      {isLoading && experiences.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          Loading experiences...
        </div>
      ) : (
        experiences.map((exp, idx) => (
          <div
            key={idx}
            className="relative bg-[#161b22] border border-gray-800 rounded-xl p-5 hover:border-[#00adb4]/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00adb4] to-[#0f7f82] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {exp.company.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">
                  {exp.title}
                </h3>
                <p className="text-[#00adb4] text-sm">{exp.company}</p>
                <p className="text-gray-400 text-sm mt-1">{exp.period}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderAchievements = () => (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading && achievements.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-400">
            Loading achievements...
          </div>
        ) : (
          achievements.map((achievement, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedAchievement(achievement)}
              className="group bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden hover:border-[#00adb4]/50 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-42 bg-gradient-to-br from-[#00adb4]/20 to-[#0f7f82]/20">
                {achievement.image && (
                  <Image
                    src={achievement.image}
                    alt={achievement.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent" />
                <div className="absolute top-2 right-2 px-2 py-1 bg-[#00adb4] text-white text-xs rounded-full font-medium">
                  {achievement.year}
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 text-white/70 text-xs">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span>Click to view</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                  {achievement.title}
                </h3>
                <p className="text-[#00adb4] text-xs mb-2">
                  {achievement.issuer}
                </p>
                <p className="text-gray-400 text-xs line-clamp-3">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Achievement Image Modal */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#161b22] rounded-2xl overflow-hidden border border-gray-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative aspect-video bg-gradient-to-br from-[#00adb4]/20 to-[#0f7f82]/20">
              {selectedAchievement.image && (
                <Image
                  src={selectedAchievement.image}
                  alt={selectedAchievement.title}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-white font-semibold text-lg">
                  {selectedAchievement.title}
                </h3>
                <span className="flex-shrink-0 px-3 py-1 bg-[#00adb4] text-white text-xs rounded-full font-medium">
                  {selectedAchievement.year}
                </span>
              </div>
              <p className="text-[#00adb4] text-sm mb-3">
                {selectedAchievement.issuer}
              </p>
              <p className="text-gray-400 text-sm">
                {selectedAchievement.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const renderSocials = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <HiMail className="w-5 h-5 text-[#00adb4]" /> Contact Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socials?.contactInfo.map((contact, idx) => (
            <a
              key={idx}
              href={
                contact.type === "email"
                  ? `mailto:${contact.value}`
                  : `https://wa.me/${contact.value.replace(/[\s()\-+]/g, "")}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-[#161b22] border border-gray-800 rounded-xl hover:border-[#00adb4]/50 transition-all"
            >
              <div className="w-10 h-10 bg-[#00adb4]/20 rounded-lg flex items-center justify-center text-[#00adb4]">
                {contact.type === "email" ? (
                  <HiMail className="w-5 h-5" />
                ) : (
                  <FaWhatsapp className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-gray-400 text-xs">{contact.label}</p>
                <p className="text-white text-sm">{contact.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <HiLink className="w-5 h-5 text-[#00adb4]" /> Social Links
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {socials?.socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-[#161b22] border border-gray-800 rounded-xl hover:border-[#00adb4]/50 hover:bg-[#00adb4]/5 transition-all group"
            >
              <div className="w-10 h-10 bg-[#00adb4]/20 rounded-lg flex items-center justify-center text-[#00adb4] group-hover:bg-[#00adb4]/30 transition-colors">
                {social.label === "GitHub" && <FaGithub className="w-5 h-5" />}
                {social.label === "LinkedIn" && (
                  <FaLinkedin className="w-5 h-5" />
                )}
                {social.label === "Instagram" && (
                  <FaInstagram className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{social.label}</p>
                <p className="text-gray-400 text-xs">{social.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <HiChat className="w-5 h-5 text-[#00adb4]" /> Send a Message
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          Fill out the form below to send me a message. I&apos;ll get back to
          you as soon as possible.
        </p>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={contactForm.name}
              onChange={(e) =>
                setContactForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-3 bg-[#161b22] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00adb4] focus:outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={contactForm.email}
              onChange={(e) =>
                setContactForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-4 py-3 bg-[#161b22] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00adb4] focus:outline-none transition-colors"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            value={contactForm.subject}
            onChange={(e) =>
              setContactForm((prev) => ({ ...prev, subject: e.target.value }))
            }
            className="w-full px-4 py-3 bg-[#161b22] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00adb4] focus:outline-none transition-colors"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            value={contactForm.message}
            onChange={(e) =>
              setContactForm((prev) => ({ ...prev, message: e.target.value }))
            }
            className="w-full px-4 py-3 bg-[#161b22] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00adb4] focus:outline-none transition-colors resize-none"
          />
          {contactStatus && (
            <div
              className={`p-3 rounded-lg text-sm ${
                contactStatus.type === "success"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {contactStatus.message}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmittingContact}
            className="w-full sm:w-auto px-6 py-3 bg-[#00adb4] hover:bg-[#0f7f82] text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmittingContact ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="space-y-4">
      {isLoading && blogPosts.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          Loading blog posts...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-[#161b22] border border-gray-800 rounded-xl p-5 hover:border-[#00adb4]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#00adb4]/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-[#00adb4]/20 text-[#00adb4] rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-[#00adb4] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
                <p className="text-gray-500 text-xs mt-3">{post.date}</p>
              </Link>
            ))}
          </div>
          <div className="text-center pt-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#00adb4]/10 text-[#00adb4] rounded-lg hover:bg-[#00adb4]/20 transition-colors"
            >
              View all posts
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return renderAbout();
      case "projects":
        return renderProjects();
      case "experiences":
        return renderExperiences();
      case "achievements":
        return renderAchievements();
      case "socials":
        return renderSocials();
      case "blog":
        return renderBlog();
      case "contact":
        return renderContact();
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#0d1117] rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-400 text-sm font-mono">
          rejaka.id — portfolio
        </span>
        <div className="w-16" />
      </div>

      <div className="bg-[#0d1117] border-b border-gray-800 overflow-x-auto">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-[#00adb4] border-b-2 border-[#00adb4] bg-[#00adb4]/5"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 min-h-[400px] max-h-[600px] overflow-y-auto bg-gradient-to-b from-[#0d1117] to-[#010409]">
        {renderContent()}
      </div>
    </div>
  );
}
