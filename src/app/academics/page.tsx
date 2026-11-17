import React from "react";
import { getPublicPortfolioData } from "@/lib/storage";
import {
  GraduationCap,
  TrendingUp,
  FileText,
  Calendar,
  CheckCircle,
  BookOpen,
  Award,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export const revalidate = 0;

export default function AcademicsPage() {
  const data = getPublicPortfolioData();
  const { academicPerformance } = data;

  const semesters = [...academicPerformance].sort(
    (a, b) => a.semesterNumber - b.semesterNumber
  );

  const highestSgpi = semesters.length > 0 ? Math.max(...semesters.map((s) => s.sgpi)) : 0;
  const latestSemester = semesters[semesters.length - 1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-[#D9D2C5] dark:border-[#384F44] pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#F5F1E8] text-xs font-semibold mb-3 shadow-sm">
          <GraduationCap className="w-3.5 h-3.5 text-[#B18A5A]" />
          <span>Academic Records</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263B32] dark:text-[#F5F1E8] tracking-tight">
          Academic Performance
        </h1>
        <p className="text-xs sm:text-sm text-[#73786F] dark:text-[#A3ACA5] mt-2 max-w-2xl leading-relaxed">
          Semester-wise University examination results, SGPI trajectory, and official grade card documentation for B.Tech in Artificial Intelligence and Machine Learning.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="portfolio-card p-6 space-y-2 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
          <span className="text-[11px] font-bold text-[#73786F] dark:text-[#A3ACA5] uppercase tracking-wider block">
            Completed Semesters
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-[#263B32] dark:text-[#F5F1E8] font-mono">
              {semesters.length}
            </span>
            <span className="text-xs text-[#87947A] font-bold">B.Tech Second Year</span>
          </div>
          <p className="text-[11px] text-[#73786F] dark:text-[#A3ACA5]">St. John College of Eng. & Mgmt.</p>
        </div>

        <div className="portfolio-card p-6 space-y-2 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
          <span className="text-[11px] font-bold text-[#73786F] dark:text-[#A3ACA5] uppercase tracking-wider block">
            Peak Semester SGPI
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-[#263B32] dark:text-[#87947A] font-mono">
              {highestSgpi.toFixed(2)}
            </span>
            <span className="text-xs text-[#B18A5A] font-bold">Semester 2 (Grade O)</span>
          </div>
          <p className="text-[11px] text-[#73786F] dark:text-[#A3ACA5]">Out of 10.0 scale</p>
        </div>

        <div className="portfolio-card p-6 space-y-2 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
          <span className="text-[11px] font-bold text-[#73786F] dark:text-[#A3ACA5] uppercase tracking-wider block">
            Latest Semester (Sem 3)
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-[#263B32] dark:text-[#F5F1E8] font-mono">
              {latestSemester ? latestSemester.sgpi.toFixed(2) : "N/A"}
            </span>
            <span className="text-xs text-[#87947A] font-bold">Academic Year 2026-2027</span>
          </div>
          <p className="text-[11px] text-[#73786F] dark:text-[#A3ACA5]">PRN: MU0341120250241691</p>
        </div>
      </div>

      {/* Natural Performance Visual Chart */}
      <div className="portfolio-card p-6 md:p-8 space-y-6 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E6E0D2] dark:border-[#384F44] pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#263B32] dark:text-[#F5F1E8] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#87947A]" />
              <span>Semester SGPI Trajectory</span>
            </h2>
            <p className="text-xs text-[#73786F] dark:text-[#A3ACA5] mt-0.5">
              Verified Semester Grade Performance Index across terms (Scale 0.0 – 10.0)
            </p>
          </div>
        </div>

        {/* Responsive SVG Chart */}
        <div className="w-full overflow-x-auto py-2">
          <div className="min-w-[500px]">
            <div className="relative h-48 flex items-end justify-between px-8 pt-8 pb-4 border-b border-l border-[#D9D2C5] dark:border-[#384F44]">
              {/* Background grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-[#D9D2C5] dark:border-[#384F44] w-full text-[10px] text-[#73786F] dark:text-[#A3ACA5] pl-1">10.0</div>
                <div className="border-b border-[#D9D2C5] dark:border-[#384F44] w-full text-[10px] text-[#73786F] dark:text-[#A3ACA5] pl-1">9.0</div>
                <div className="border-b border-[#D9D2C5] dark:border-[#384F44] w-full text-[10px] text-[#73786F] dark:text-[#A3ACA5] pl-1">8.0</div>
                <div className="w-full text-[10px] text-[#73786F] dark:text-[#A3ACA5] pl-1">0.0</div>
              </div>

              {/* Bars with Natural Palette */}
              {semesters.map((sem) => {
                const heightPercentage = Math.max(20, ((sem.sgpi - 7) / 3) * 100);
                return (
                  <div
                    key={sem.id}
                    className="flex-1 flex flex-col items-center gap-2 group z-10"
                  >
                    <span className="text-xs font-mono font-bold text-[#263B32] dark:text-[#87947A] group-hover:scale-110 transition-transform">
                      {sem.sgpi.toFixed(2)}
                    </span>
                    <div
                      style={{ height: `${heightPercentage}%` }}
                      className="w-14 sm:w-20 bg-[#263B32] dark:bg-[#87947A] rounded-t-xl transition-all group-hover:brightness-110 shadow-sm"
                    ></div>
                    <span className="text-xs font-bold text-[#263B32] dark:text-[#F5F1E8]">
                      {sem.semesterLabel}
                    </span>
                    <span className="text-[10px] text-[#73786F] dark:text-[#A3ACA5]">
                      {sem.academicYear}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Semester Cards with Subjects & Official Documents */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#263B32] dark:text-[#F5F1E8] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#87947A]" />
          <span>University Curriculum & Official Grade Cards</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {semesters.map((sem) => (
            <div
              key={sem.id}
              className="portfolio-card p-6 flex flex-col justify-between space-y-4 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] hover:border-[#87947A] shadow-sm hover:shadow-md transition-all rounded-2xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E6E0D2] dark:border-[#384F44] pb-3">
                  <div>
                    <h3 className="text-base font-bold text-[#263B32] dark:text-[#F5F1E8]">
                      {sem.semesterLabel}
                    </h3>
                    <p className="text-xs text-[#73786F] dark:text-[#A3ACA5]">{sem.academicYear}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-mono font-extrabold text-[#263B32] dark:text-[#87947A]">
                      {sem.sgpi.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-[#73786F] dark:text-[#A3ACA5] block uppercase font-bold">SGPI</span>
                  </div>
                </div>

                {/* Subject List */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#73786F] dark:text-[#A3ACA5] uppercase tracking-wider block">
                    Enrolled Courses & University Grades
                  </span>
                  <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                    {sem.subjects && sem.subjects.length > 0 ? (
                      sem.subjects.map((subj, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-lg bg-[#E6E0D2]/40 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-xs"
                        >
                          <div className="truncate mr-2">
                            <span className="text-[10px] font-mono text-[#87947A] mr-1.5 font-bold">
                              {subj.code}
                            </span>
                            <span className="text-[#263B32] dark:text-[#EAE3D5] font-medium">
                              {subj.name}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E6E0D2] dark:bg-[#263B32] text-[#263B32] dark:text-[#87947A] shrink-0 border border-[#D9D2C5] dark:border-[#87947A]/30">
                            {subj.grade}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-[#73786F] dark:text-[#A3ACA5] italic">
                        Subject marksheet details recorded in official academic dossier.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Official Grade Card Action */}
              {sem.marksheetUrl && (
                <div className="pt-3 border-t border-[#E6E0D2] dark:border-[#384F44]">
                  <a
                    href={sem.marksheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-bold rounded-xl bg-[#263B32] text-[#F5F1E8] hover:bg-[#1D2F28] dark:bg-[#18221D] dark:text-[#EAE3D5] dark:hover:bg-[#222E27] border border-[#263B32] dark:border-[#384F44] transition-colors shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#B18A5A]" />
                    <span>View Official Grade Card</span>
                    <ExternalLink className="w-3 h-3 ml-1 text-[#87947A]" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
