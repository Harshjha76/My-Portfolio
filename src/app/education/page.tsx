import React from "react";
import Link from "next/link";
import { getPublicPortfolioData } from "@/lib/storage";
import {
  GraduationCap,
  Calendar,
  Building2,
  Award,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  FileCheck,
  ExternalLink,
} from "lucide-react";

export const revalidate = 0;

export default function EducationPage() {
  const data = getPublicPortfolioData();
  const { education } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-[#D9D2C5] dark:border-[#384F44] pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#F5F1E8] text-xs font-semibold mb-3 shadow-sm">
          <GraduationCap className="w-3.5 h-3.5 text-[#B18A5A]" />
          <span>Academic Background</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263B32] dark:text-[#F5F1E8] tracking-tight">
          Education History
        </h1>
        <p className="text-xs sm:text-sm text-[#73786F] dark:text-[#A3ACA5] mt-2 max-w-2xl leading-relaxed">
          Formal academic progression from Secondary School Certificate to Higher Secondary and current B.Tech studies in Artificial Intelligence & Machine Learning, backed by official board marksheets.
        </p>
      </div>

      {/* Education Timeline Cards */}
      <div className="space-y-6">
        {education.map((item) => (
          <div
            key={item.id}
            className="portfolio-card p-6 md:p-8 relative overflow-hidden transition-all bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] hover:border-[#87947A] shadow-sm hover:shadow-md rounded-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E6E0D2] dark:bg-[#18221D] text-[#263B32] dark:text-[#87947A] border border-[#D9D2C5] dark:border-[#384F44]">
                    {item.level}
                  </span>
                  <span className="text-xs text-[#73786F] dark:text-[#A3ACA5] font-medium flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#87947A]" />
                    {item.yearStart ? `${item.yearStart} — ${item.yearEnd}` : item.yearEnd}
                  </span>
                  <span className="text-xs text-[#87947A] flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {item.status}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-[#263B32] dark:text-[#F5F1E8]">
                  {item.title}
                </h2>

                <div className="flex items-center gap-2 text-sm text-[#263B32] dark:text-[#EAE3D5] font-medium">
                  <Building2 className="w-4 h-4 text-[#87947A]" />
                  <span>{item.institution}</span>
                </div>

                <p className="text-xs text-[#73786F] dark:text-[#A3ACA5]">
                  Affiliation / Board: <span className="text-[#263B32] dark:text-[#EAE3D5] font-semibold">{item.boardOrUniversity}</span>
                </p>

                {item.semestersSummary && (
                  <div className="pt-2">
                    <div className="p-3 rounded-xl bg-[#E6E0D2]/50 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] flex items-center justify-between flex-wrap gap-2 text-xs">
                      <span className="text-[#73786F] dark:text-[#A3ACA5] font-medium">Subject Highlights:</span>
                      <span className="text-[#263B32] dark:text-[#87947A] font-mono font-bold">
                        {item.semestersSummary}
                      </span>
                    </div>
                  </div>
                )}

                {/* Marksheet button if present */}
                {item.marksheetUrl && (
                  <div className="pt-2">
                    <a
                      href={item.marksheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#E6E0D2] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-xs font-bold text-[#263B32] dark:text-[#EAE3D5] hover:border-[#87947A] transition-all shadow-sm"
                    >
                      <FileCheck className="w-3.5 h-3.5 text-[#B18A5A]" />
                      <span>View Official Statement of Marks</span>
                      <ExternalLink className="w-3 h-3 text-[#87947A]" />
                    </a>
                  </div>
                )}
              </div>

              {/* Score Badge */}
              <div className="md:text-right shrink-0">
                <div className="p-4 rounded-2xl bg-[#E6E0D2] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] inline-block min-w-[140px] text-center shadow-sm">
                  <span className="text-[11px] font-bold text-[#73786F] dark:text-[#A3ACA5] uppercase tracking-wider block">
                    {item.scoreType}
                  </span>
                  <span className="text-2xl font-extrabold text-[#263B32] dark:text-[#87947A] font-mono block mt-0.5">
                    {item.score}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cross link to Academic Performance */}
      <div className="portfolio-card p-6 md:p-8 bg-[#FFFFFF] dark:bg-[#263B32] flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-[#263B32] dark:text-[#F5F1E8] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#87947A]" />
            <span>Looking for semester-wise performance & grade cards?</span>
          </h3>
          <p className="text-xs text-[#73786F] dark:text-[#A3ACA5]">
            Inspect university examination SGPI records, course grades, and verified academic transcripts.
          </p>
        </div>
        <Link
          href="/academics"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#F5F1E8] bg-[#263B32] hover:bg-[#1D2F28] dark:bg-[#87947A] dark:text-[#18221D] dark:hover:bg-[#97A48A] transition-all shrink-0 font-sans shadow-md"
        >
          <span>Open Academic Performance</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
