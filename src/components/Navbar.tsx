"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import {
  Sun,
  Moon,
  Menu,
  X,
  FileDown,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

interface NavbarProps {
  displayName?: string;
  resumeUrl?: string;
  resumePublished?: boolean;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Education", href: "/education" },
  { name: "Academics", href: "/academics" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Certifications", href: "/certifications" },
  { name: "Current Learning", href: "/learning" },
  { name: "Achievements", href: "/achievements" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar({
  displayName = "Harsh Jha",
  resumeUrl,
  resumePublished = false,
}: NavbarProps) {
  const pathname = usePathname();
  const { mode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    fetch("/api/owner/status")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) setIsOwner(true);
      })
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isOwnerRoute = pathname.startsWith("/owner");

  return (
    <>
      {/* If owner is currently logged in, show a discreet owner toolbar */}
      {isOwner && (
        <div className="bg-[#263B32] border-b border-[#384F44] text-[#F5F1E8] text-xs px-4 py-1.5 flex items-center justify-between z-50 relative">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#87947A] animate-pulse"></span>
            <span className="font-medium">Portfolio Owner Session Active</span>
          </div>
          <div className="flex items-center gap-4">
            {isOwnerRoute ? (
              <Link
                href="/"
                className="hover:underline flex items-center gap-1 text-[#F5F1E8]"
              >
                View Public Site <ExternalLink className="w-3 h-3" />
              </Link>
            ) : (
              <Link
                href="/owner"
                className="hover:underline flex items-center gap-1 font-semibold text-[#87947A]"
              >
                Open Portfolio Editor <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      )}

      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-[#F5F1E8]/95 dark:bg-[#18221D]/95 backdrop-blur-md border-b border-[#D9D2C5] dark:border-[#384F44] shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Monogram */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] group-hover:border-[#87947A] flex items-center justify-center transition-all shadow-sm">
                <span className="text-[#263B32] dark:text-[#87947A] font-bold text-sm tracking-wider">
                  HJ
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-wide text-[#263B32] dark:text-[#F5F1E8] group-hover:text-[#87947A] transition-colors uppercase">
                  {displayName}
                </span>
                <span className="text-[10px] text-[#73786F] dark:text-[#A3ACA5] tracking-wider uppercase">
                  AI & ML • B.Tech
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      isActive
                        ? "text-[#F5F1E8] bg-[#263B32] border border-[#263B32] dark:border-[#87947A]/40 shadow-sm"
                        : "text-[#73786F] dark:text-[#A3ACA5] hover:text-[#263B32] dark:hover:text-[#F5F1E8] hover:bg-[#E6E0D2]/70 dark:hover:bg-[#263B32]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Quick Actions (Theme & Resume) */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle color theme"
                className="p-2 rounded-xl text-[#73786F] dark:text-[#A3ACA5] hover:text-[#263B32] dark:hover:text-[#F5F1E8] bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] hover:border-[#87947A] transition-colors shadow-sm"
                title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
              >
                {mode === "dark" ? (
                  <Sun className="w-4 h-4 text-[#B18A5A]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#263B32]" />
                )}
              </button>

              {/* Public Download Resume Button */}
              {resumePublished && resumeUrl && (
                <a
                  href={resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#F5F1E8] bg-[#263B32] dark:bg-[#87947A] dark:text-[#18221D] hover:bg-[#1D2F28] dark:hover:bg-[#97A48A] rounded-xl shadow-sm transition-all font-sans"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </a>
              )}
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-xl text-[#73786F] dark:text-[#A3ACA5] bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44]"
              >
                {mode === "dark" ? (
                  <Sun className="w-4 h-4 text-[#B18A5A]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#263B32]" />
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#73786F] dark:text-[#A3ACA5] hover:text-[#263B32] dark:hover:text-[#F5F1E8] bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#87947A]" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#F5F1E8]/98 dark:bg-[#18221D]/98 border-b border-[#D9D2C5] dark:border-[#384F44] px-4 pt-2 pb-6 space-y-1 shadow-xl backdrop-blur-lg">
            <div className="grid grid-cols-2 gap-1 py-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      isActive
                        ? "text-[#F5F1E8] bg-[#263B32] border border-[#263B32] dark:border-[#87947A]/40"
                        : "text-[#73786F] dark:text-[#A3ACA5] hover:text-[#263B32] dark:hover:text-[#F5F1E8] hover:bg-[#E6E0D2]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {resumePublished && resumeUrl && (
              <div className="pt-2">
                <a
                  href={resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-[#F5F1E8] bg-[#263B32] dark:bg-[#87947A] dark:text-[#18221D] hover:bg-[#1D2F28] dark:hover:bg-[#97A48A] rounded-xl"
                >
                  <FileDown className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
}
