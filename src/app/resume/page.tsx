import React from "react";
import Link from "next/link";
import { getPublicPortfolioData } from "@/lib/storage";
import {
  FileText,
  FileDown,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Mail,
  GraduationCap,
} from "lucide-react";

export const revalidate = 0;

export default function ResumePage() {
  const data = getPublicPortfolioData();
  const { profile } = data;
  const isAvailable = profile.resumePublished && profile.resumeUrl;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      {/* Header */}
      <div className="border-b border-[#D9D2C5] dark:border-[#384F44] pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#F5F1E8] text-xs font-semibold mb-3 shadow-sm">
            <FileText className="w-3.5 h-3.5 text-[#B18A5A]" />
            <span>Curriculum Vitae</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263B32] dark:text-[#F5F1E8] tracking-tight">
            Harsh Jha — Resume
          </h1>
          <p className="text-xs sm:text-sm text-[#73786F] dark:text-[#A3ACA5] mt-2 max-w-2xl leading-relaxed">
            Official academic and technical resume reflecting completed coursework, engineering projects, and technical skills.
          </p>
        </div>

        {isAvailable && (
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={profile.resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#F5F1E8] bg-[#263B32] hover:bg-[#1D2F28] dark:bg-[#87947A] dark:text-[#18221D] dark:hover:bg-[#97A48A] transition-all shadow-md font-sans"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#263B32] dark:text-[#F5F1E8] bg-[#E6E0D2] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] hover:border-[#87947A] transition-all shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in New Tab</span>
            </a>
          </div>
        )}
      </div>

      {/* Resume Content / Viewer */}
      {isAvailable ? (
        <div className="portfolio-card p-4 sm:p-6 overflow-hidden bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
          <div className="w-full h-[800px] rounded-xl overflow-hidden bg-[#F5F1E8] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44]">
            <iframe
              src={`${profile.resumeUrl}#toolbar=0`}
              title="Harsh Jha Resume PDF Preview"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      ) : (
        <div className="portfolio-card p-12 md:p-16 text-center space-y-4 max-w-2xl mx-auto border-dashed border-[#D9D2C5] dark:border-[#384F44] bg-[#FFFFFF] dark:bg-[#263B32] rounded-2xl shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#E6E0D2] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] flex items-center justify-center mx-auto text-[#87947A]">
            <FileText className="w-8 h-8 opacity-80" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-[#263B32] dark:text-[#F5F1E8]">
              Official Resume Being Updated
            </h2>
            <p className="text-sm text-[#73786F] dark:text-[#A3ACA5] max-w-md mx-auto">
              The updated curriculum vitae is currently being revised with recent academic results and project milestones.
            </p>
          </div>
          <p className="text-xs text-[#73786F]/70 dark:text-[#A3ACA5]/70">
            To request an official copy or discuss opportunities directly, feel free to reach out.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#F5F1E8] bg-[#263B32] hover:bg-[#1D2F28] dark:bg-[#87947A] dark:text-[#18221D] dark:hover:bg-[#97A48A] transition-all font-sans shadow-md"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Harsh Jha</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
