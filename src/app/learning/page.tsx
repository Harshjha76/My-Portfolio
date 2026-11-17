import React from "react";
import { getPublicPortfolioData } from "@/lib/storage";
import { Compass, Sparkles, BookOpen } from "lucide-react";

export const revalidate = 0;

export default function CurrentLearningPage() {
  const data = getPublicPortfolioData();
  const { currentLearning } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 space-y-12">
      {/* Header */}
      <div className="border-b border-[#D9D2C5] dark:border-[#384F44] pb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#F5F1E8] text-xs font-semibold mb-3 shadow-sm">
          <Compass className="w-3.5 h-3.5 text-[#87947A]" />
          <span>Active Learning</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#263B32] dark:text-[#F5F1E8] tracking-tight">
          Current Learning
        </h1>
        <p className="text-sm sm:text-base text-[#73786F] dark:text-[#A3ACA5] mt-2">
          Technologies and domains I am actively learning right now.
        </p>
      </div>

      {/* Clean Minimalist Cards: Only Headings as requested */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentLearning.map((item) => (
          <div
            key={item.id}
            className="portfolio-card p-8 flex flex-col justify-between items-center text-center space-y-6 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm hover:shadow-md transition-all group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E6E0D2] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] flex items-center justify-center text-[#263B32] dark:text-[#87947A] group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-[#87947A]" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#E6E0D2]/70 dark:bg-[#18221D] text-[#263B32] dark:text-[#87947A] border border-[#D9D2C5] dark:border-[#384F44]">
                Currently Learning
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#263B32] dark:text-[#F5F1E8] group-hover:text-[#B18A5A] transition-colors pt-2">
                {item.topic}
              </h2>
            </div>

            <div className="w-8 h-0.5 rounded-full bg-[#87947A]/40 group-hover:w-16 group-hover:bg-[#87947A] transition-all"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
