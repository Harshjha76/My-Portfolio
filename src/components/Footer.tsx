import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Phone, MapPin, Lock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#D9D2C5] dark:border-[#384F44] bg-[#E6E0D2] dark:bg-[#141A17] text-[#73786F] dark:text-[#A3ACA5] py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Identity */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#263B32] border border-[#87947A]/30 flex items-center justify-center shadow-sm">
              <span className="text-[#F5F1E8] dark:text-[#87947A] font-bold text-xs">HJ</span>
            </div>
            <span className="font-bold text-[#263B32] dark:text-[#F5F1E8] text-sm tracking-wide uppercase">
              HARSH JHA
            </span>
          </div>
          <p className="text-xs text-[#73786F] dark:text-[#A3ACA5] leading-relaxed max-w-md">
            Second-year B.Tech student specializing in Artificial Intelligence and
            Machine Learning at St. John College of Engineering and Management (SJCEM).
            Passionate about Python & Java engineering, data analytics, and intelligent AI agents.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com/Harshjha76"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-[#73786F] dark:text-[#A3ACA5] hover:text-[#263B32] dark:hover:text-[#87947A] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/harshjha18"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-[#73786F] dark:text-[#A3ACA5] hover:text-[#263B32] dark:hover:text-[#87947A] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:harshjha101ab@gmail.com"
              aria-label="Send Email"
              className="text-[#73786F] dark:text-[#A3ACA5] hover:text-[#263B32] dark:hover:text-[#87947A] transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#263B32] dark:text-[#F5F1E8] mb-3">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/about" className="hover:text-[#263B32] dark:hover:text-[#87947A] transition-colors">
                About & Interests
              </Link>
            </li>
            <li>
              <Link href="/education" className="hover:text-[#263B32] dark:hover:text-[#87947A] transition-colors">
                Education History
              </Link>
            </li>
            <li>
              <Link href="/academics" className="hover:text-[#263B32] dark:hover:text-[#87947A] transition-colors">
                Academic Performance
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-[#263B32] dark:hover:text-[#87947A] transition-colors">
                Verified Projects
              </Link>
            </li>
            <li>
              <Link href="/experience" className="hover:text-[#263B32] dark:hover:text-[#87947A] transition-colors">
                Experience
              </Link>
            </li>
            <li>
              <Link href="/certifications" className="hover:text-[#263B32] dark:hover:text-[#87947A] transition-colors">
                Certifications & Evidence
              </Link>
            </li>
            <li>
              <Link href="/learning" className="hover:text-[#263B32] dark:hover:text-[#87947A] transition-colors">
                Current Learning
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info & Discreet Owner Link */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#263B32] dark:text-[#F5F1E8] mb-3">
            Contact & Location
          </h4>
          <div className="flex items-start gap-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#87947A] mt-0.5 shrink-0" />
            <span>Dhanani Nagar, Boisar, Maharashtra, India</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Mail className="w-3.5 h-3.5 text-[#87947A] shrink-0" />
            <a
              href="mailto:harshjha101ab@gmail.com"
              className="hover:underline hover:text-[#263B32] dark:hover:text-[#F5F1E8]"
            >
              harshjha101ab@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Phone className="w-3.5 h-3.5 text-[#87947A] shrink-0" />
            <a
              href="tel:+917385246094"
              className="hover:underline hover:text-[#263B32] dark:hover:text-[#F5F1E8]"
            >
              +91 7385246094
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#D9D2C5] dark:border-[#384F44]/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#73786F] dark:text-[#A3ACA5]">
        <p>© {currentYear} Harsh Jha. Natural Forest & Warm Ivory Design System.</p>
        <div className="flex items-center gap-3 mt-3 sm:mt-0">
          <Link
            href="/owner"
            className="flex items-center gap-1 hover:text-[#263B32] dark:hover:text-[#F5F1E8] transition-colors opacity-50 hover:opacity-100"
            title="Private Owner Login"
          >
            <Lock className="w-3 h-3" />
            <span>Owner Access</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
