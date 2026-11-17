import React from "react";
import Link from "next/link";
import { getPublicPortfolioData } from "@/lib/storage";
import {
  Briefcase,
  Calendar,
  Building,
  CheckCircle2,
  Users,
  Compass,
  FileCheck,
  ExternalLink,
} from "lucide-react";

export const revalidate = 0;

export default function ExperiencePage() {
  const data = getPublicPortfolioData();
  const { experience } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-[#D9D2C5] dark:border-[#384F44] pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#F5F1E8] text-xs font-semibold mb-3 shadow-sm">
          <Briefcase className="w-3.5 h-3.5 text-[#B18A5A]" />
          <span>Professional & Independent Work</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263B32] dark:text-[#F5F1E8] tracking-tight">
          Experience History
        </h1>
        <p className="text-xs sm:text-sm text-[#73786F] dark:text-[#A3ACA5] mt-2 max-w-2xl leading-relaxed">
          Internship deliverables and independent teaching engagements focusing on structured data aggregation, analysis, and personalized academic instruction.
        </p>
      </div>

      {/* Experience Entries */}
      <div className="space-y-8">
        {experience.map((entry) => (
          <div
            key={entry.id}
            className="portfolio-card p-6 md:p-8 space-y-6 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] hover:border-[#87947A] transition-all rounded-2xl shadow-sm hover:shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#E6E0D2] dark:border-[#384F44] pb-5">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E6E0D2] dark:bg-[#18221D] text-[#263B32] dark:text-[#87947A] border border-[#D9D2C5] dark:border-[#384F44]">
                    {entry.workMode}
                  </span>
                  {entry.isCurrent && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#87947A]/15 text-[#263B32] dark:text-[#87947A] border border-[#87947A]/30">
                      Active / Ongoing
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#263B32] dark:text-[#F5F1E8]">
                  {entry.role}
                </h2>
                <p className="text-sm font-bold text-[#87947A]">
                  {entry.organization}
                </p>
              </div>

              <div className="shrink-0 sm:text-right">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#73786F] dark:text-[#A3ACA5] bg-[#E6E0D2]/50 dark:bg-[#18221D] px-3 py-1 rounded-xl border border-[#D9D2C5] dark:border-[#384F44]">
                  <Calendar className="w-3.5 h-3.5 text-[#87947A]" />
                  {entry.duration}
                </span>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#73786F] dark:text-[#A3ACA5] uppercase tracking-wider">
                Key Responsibilities & Deliverables
              </h3>
              <div className="space-y-2.5">
                {entry.responsibilities.map((resp, rIdx) => (
                  <div
                    key={rIdx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-[#E6E0D2]/40 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-xs sm:text-sm text-[#263B32] dark:text-[#EAE3D5] leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#87947A] shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* InAmigos Internship Certificate Link if applicable */}
            {entry.id === "exp-inamigos" && (
              <div className="pt-2">
                <Link
                  href="/certifications#cert-inamigos"
                  className="inline-flex items-center gap-1.5 text-xs text-[#263B32] dark:text-[#87947A] hover:underline font-bold"
                >
                  <FileCheck className="w-3.5 h-3.5 text-[#B18A5A]" />
                  <span>View Verified InAmigos Certificate of Internship</span>
                  <ExternalLink className="w-3 h-3 text-[#73786F]" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
