import React from "react";
import { getPublicPortfolioData } from "@/lib/storage";
import {
  Trophy,
  Calendar,
  Building,
  FileCheck,
  ExternalLink,
  Medal,
} from "lucide-react";

export const revalidate = 0;

export default function AchievementsPage() {
  const data = getPublicPortfolioData();
  const { achievements } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-[#D9D2C5] dark:border-[#384F44] pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#F5F1E8] text-xs font-semibold mb-3 shadow-sm">
          <Trophy className="w-3.5 h-3.5 text-[#B18A5A]" />
          <span>Honors & Recognitions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263B32] dark:text-[#F5F1E8] tracking-tight">
          Achievements & Milestones
        </h1>
        <p className="text-xs sm:text-sm text-[#73786F] dark:text-[#A3ACA5] mt-2 max-w-2xl leading-relaxed">
          Verified academic recognitions, hackathon participation, and competitive milestones.
        </p>
      </div>

      {/* Empty State */}
      {achievements.length === 0 ? (
        <div className="portfolio-card p-12 md:p-16 text-center space-y-4 max-w-2xl mx-auto border-dashed border-[#D9D2C5] dark:border-[#384F44] bg-[#FFFFFF] dark:bg-[#263B32] rounded-2xl shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#E6E0D2] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] flex items-center justify-center mx-auto text-[#87947A]">
            <Trophy className="w-8 h-8 opacity-80" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-[#263B32] dark:text-[#F5F1E8]">
              Achievements & Competition Milestones
            </h2>
            <p className="text-sm text-[#73786F] dark:text-[#A3ACA5] max-w-md mx-auto">
              Achievements and verified milestone recognitions will be presented here as they are reached.
            </p>
          </div>
          <p className="text-xs text-[#73786F]/70 dark:text-[#A3ACA5]/70 pt-2">
            Independent hackathon results, technical competition accolades, and college honors will be recorded upon publication.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="portfolio-card p-6 flex flex-col justify-between space-y-4 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] hover:border-[#87947A] transition-all rounded-2xl shadow-sm hover:shadow-md group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#E6E0D2] dark:bg-[#18221D] text-[#263B32] dark:text-[#87947A] border border-[#D9D2C5] dark:border-[#384F44]">
                    Recognized
                  </span>
                  <span className="text-xs text-[#73786F] dark:text-[#A3ACA5] font-mono font-medium">{item.date}</span>
                </div>

                <h3 className="text-base font-bold text-[#263B32] dark:text-[#F5F1E8] group-hover:text-[#B18A5A] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#B18A5A] font-bold flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.issuingOrganization}</span>
                </p>

                <p className="text-xs text-[#73786F] dark:text-[#A3ACA5] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.supportingDocUrl && (
                <div className="pt-4 border-t border-[#E6E0D2] dark:border-[#384F44]">
                  <a
                    href={item.supportingDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#263B32] dark:text-[#87947A] hover:underline inline-flex items-center gap-1.5 font-bold"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-[#B18A5A]" />
                    <span>View Supporting Document</span>
                    <ExternalLink className="w-3 h-3 text-[#73786F]" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
