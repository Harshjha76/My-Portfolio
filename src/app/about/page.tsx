import React from "react";
import Link from "next/link";
import { getPublicPortfolioData } from "@/lib/storage";
import {
  User,
  Brain,
  Code2,
  Languages,
  Compass,
  Heart,
  Briefcase,
  GraduationCap,
  Sparkles,
  Terminal,
  Database,
  Layers,
  Wrench,
  ShieldCheck,
  Award,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

export const revalidate = 0;

export default function AboutPage() {
  const data = getPublicPortfolioData();
  const { profile, about, skills } = data;

  const getEvidenceColor = (type: string) => {
    switch (type) {
      case "Certificate":
        return "bg-[#87947A]/15 text-[#263B32] dark:text-[#87947A] border-[#87947A]/40";
      case "Project":
        return "bg-[#B18A5A]/15 text-[#B18A5A] border-[#B18A5A]/40";
      case "Experience":
        return "bg-[#263B32]/10 dark:bg-[#202D26] text-[#263B32] dark:text-[#EAE3D5] border-[#D9D2C5] dark:border-[#384F44]";
      case "Academic":
        return "bg-[#E6E0D2] dark:bg-[#18221D] text-[#263B32] dark:text-[#F5F1E8] border-[#D9D2C5] dark:border-[#384F44]";
      default:
        return "bg-[#E6E0D2] text-[#73786F] border-[#D9D2C5]";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Page Header */}
      <div className="border-b border-[#D9D2C5] dark:border-[#384F44] pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#F5F1E8] text-xs font-semibold mb-3 shadow-sm">
          <User className="w-3.5 h-3.5 text-[#B18A5A]" />
          <span>About Me</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263B32] dark:text-[#F5F1E8] tracking-tight">
          Harsh Jha
        </h1>
        <p className="text-base text-[#87947A] font-medium mt-1">
          {profile.headline}
        </p>
        <p className="text-xs text-[#73786F] dark:text-[#A3ACA5] mt-2">
          {profile.college} • Class of {profile.expectedGraduation}
        </p>
      </div>

      {/* Professional Introduction & Background */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="portfolio-card p-6 md:p-8 space-y-4 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold text-[#263B32] dark:text-[#F5F1E8] flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#87947A]" />
              <span>Professional Introduction</span>
            </h2>
            <p className="text-sm sm:text-base text-[#263B32] dark:text-[#EAE3D5] leading-relaxed">
              {about.introduction}
            </p>
          </div>

          <div className="portfolio-card p-6 md:p-8 space-y-4 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold text-[#263B32] dark:text-[#F5F1E8] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#B18A5A]" />
              <span>Personal & Academic Background</span>
            </h2>
            <div className="text-xs sm:text-sm text-[#73786F] dark:text-[#A3ACA5] space-y-3 leading-relaxed">
              <p>
                Based in Dhanani Nagar, Boisar, Maharashtra, I completed my schooling from
                Shree Raghubir English High School and Junior College under the Maharashtra State Board,
                securing 87.60% in 10th standard (2023) and 83.17% in 12th standard (2025) with 184/200 in Computer Science.
              </p>
              <p>
                Currently in my second year of B.Tech in Artificial Intelligence and Machine Learning at
                St. John College of Engineering and Management (SJCEM), Palghar, I have maintained strong
                academic consistency across my semesters (Sem 1: 9.15 SGPI, Sem 2: 9.25 SGPI, Sem 3: 9.14 SGPI).
              </p>
              <p>
                Alongside my university curriculum, I independently tutor junior students and engineer practical software
                systems that solve real problems—from personal finance management and daily DSA tracking to AI-assisted
                career guidance.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Identity Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Portrait Photo Card */}
          <div className="portfolio-card p-4 space-y-3 text-center bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#E6E0D2] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] mx-auto max-w-[280px]">
              <img
                src={profile.avatarUrl || "/images/harsh-jha.jpg"}
                alt={profile.displayName}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="pt-1">
              <p className="font-bold text-sm text-[#263B32] dark:text-[#F5F1E8]">{profile.displayName}</p>
              <p className="text-[11px] text-[#87947A] font-semibold">B.Tech AI & ML Student</p>
              <p className="text-[10px] text-[#73786F] dark:text-[#A3ACA5]">Boisar, Maharashtra, India</p>
            </div>
          </div>

          {/* Spoken Languages */}
          <div className="portfolio-card p-6 space-y-3 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
            <h3 className="text-sm font-bold text-[#263B32] dark:text-[#F5F1E8] flex items-center gap-2">
              <Languages className="w-4 h-4 text-[#87947A]" />
              <span>Spoken Languages</span>
            </h3>
            <div className="space-y-2 pt-1">
              {about.spokenLanguages.map((lang, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#E6E0D2]/50 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-xs"
                >
                  <span className="font-bold text-[#263B32] dark:text-[#F5F1E8]">{lang.language}</span>
                  <span className="text-[11px] text-[#87947A] font-semibold">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Interests */}
          <div className="portfolio-card p-6 space-y-3 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
            <h3 className="text-sm font-bold text-[#263B32] dark:text-[#F5F1E8] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#B18A5A]" />
              <span>Career Interests</span>
            </h3>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {about.careerInterests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs rounded-md bg-[#E6E0D2]/60 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#EAE3D5] font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Personal Interests & Hobbies */}
          <div className="portfolio-card p-6 space-y-3 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
            <h3 className="text-sm font-bold text-[#263B32] dark:text-[#F5F1E8] flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#B18A5A]" />
              <span>Personal Interests</span>
            </h3>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {about.personalInterests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs rounded-md bg-[#E6E0D2]/60 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#EAE3D5] font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Focus Areas */}
      <div className="portfolio-card p-6 md:p-8 space-y-4 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
        <h2 className="text-lg font-bold text-[#263B32] dark:text-[#F5F1E8] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#87947A]" />
          <span>Technical Focus Areas</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
          {about.technicalInterests.map((tech, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-[#E6E0D2]/50 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-center flex flex-col items-center justify-center gap-1.5 hover:border-[#87947A] transition-colors"
            >
              <Terminal className="w-4 h-4 text-[#87947A]" />
              <span className="text-xs font-semibold text-[#263B32] dark:text-[#EAE3D5]">{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Based on Actual Evidence */}
      <div className="space-y-6 pt-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#87947A] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#B18A5A]" />
            <span>Grounded Competencies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#263B32] dark:text-[#F5F1E8] tracking-tight">
            Skills Supported by Genuine Evidence
          </h2>
          <p className="text-xs sm:text-sm text-[#73786F] dark:text-[#A3ACA5] mt-1 max-w-2xl leading-relaxed">
            Each skill is genuinely validated by official course certificates, runnable projects, internship deliverables, or verified academic transcripts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category) => (
            <div
              key={category.id}
              className="portfolio-card p-5 space-y-4 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] hover:border-[#87947A] rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-sm font-bold text-[#263B32] dark:text-[#F5F1E8] flex items-center justify-between border-b border-[#E6E0D2] dark:border-[#384F44] pb-2">
                <span>{category.name}</span>
                <span className="text-[10px] text-[#87947A] font-mono font-semibold">
                  {category.skills.length} skills
                </span>
              </h3>

              <div className="space-y-3 pt-1">
                {category.detailedSkills && category.detailedSkills.length > 0 ? (
                  category.detailedSkills.map((ds, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-lg bg-[#E6E0D2]/40 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#263B32] dark:text-[#F5F1E8]">{ds.name}</span>
                        <span className="text-[10px] text-[#73786F] dark:text-[#A3ACA5] font-mono">Verified</span>
                      </div>

                      {/* Evidence Badges */}
                      {ds.evidence && ds.evidence.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {ds.evidence.map((ev, eIdx) => {
                            const badge = (
                              <span
                                key={eIdx}
                                className={`text-[10px] px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${getEvidenceColor(
                                  ev.type
                                )}`}
                              >
                                <span className="font-semibold">{ev.type}:</span>
                                <span className="font-medium truncate max-w-[150px]">
                                  {ev.title}
                                </span>
                              </span>
                            );

                            return ev.link ? (
                              <Link
                                key={eIdx}
                                href={ev.link}
                                className="hover:opacity-80 transition-opacity"
                              >
                                {badge}
                              </Link>
                            ) : (
                              badge
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs rounded-md bg-[#E6E0D2]/50 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#EAE3D5] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
