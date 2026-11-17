import React from "react";
import Link from "next/link";
import { getPublicPortfolioData } from "@/lib/storage";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  FileDown,
  Sparkles,
  ExternalLink,
  Code2,
  GraduationCap,
  Briefcase,
  Layers,
  ChevronRight,
  ShieldCheck,
  Award,
} from "lucide-react";

export const revalidate = 0;

export default function HomePage() {
  const data = getPublicPortfolioData();
  const { profile, projects, education, experience, certificates } = data;

  return (
    <div className="relative overflow-hidden bg-[#F5F1E8] dark:bg-[#18221D] text-[#263B32] dark:text-[#F5F1E8] transition-colors">
      {/* Background Natural Ambient Lighting */}
      <div className="ambient-natural w-[550px] h-[550px] bg-[#87947A]/12 top-0 left-1/4 -translate-x-1/2 pointer-events-none"></div>
      <div className="ambient-natural w-[450px] h-[450px] bg-[#B18A5A]/10 top-96 right-0 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Column: Info & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#F5F1E8] text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#87947A] animate-pulse"></span>
              <span>{profile.academicLevel} • B.Tech AI & ML (2025–2029)</span>
            </div>

            {/* Name & Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#263B32] dark:text-[#F5F1E8]">
                Hi, I&apos;m{" "}
                <span className="text-[#263B32] dark:text-[#F5F1E8] underline decoration-[#B18A5A] decoration-wavy decoration-2">
                  {profile.displayName}
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-[#87947A] tracking-wide">
                {profile.headline}
              </p>
            </div>

            {/* Short Introduction */}
            <p className="text-[#73786F] dark:text-[#A3ACA5] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Second-year undergraduate specializing in Artificial Intelligence and Machine Learning at St. John College of Engineering and Management (SJCEM),
              Palghar. Building practical systems across Python, Java, SQL, and AI agents, backed by verified credentials and academic excellence.
            </p>

            {/* Career Positioning Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {profile.careerPositioning.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs rounded-lg bg-[#E6E0D2] dark:bg-[#202D26] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#F5F1E8] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#F5F1E8] bg-[#263B32] hover:bg-[#1D2F28] dark:bg-[#87947A] dark:text-[#18221D] dark:hover:bg-[#97A48A] transition-all shadow-md font-sans"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {profile.resumePublished && profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#263B32] dark:text-[#F5F1E8] bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] hover:border-[#87947A] transition-all shadow-sm"
                >
                  <FileDown className="w-4 h-4 text-[#B18A5A]" />
                  <span>Download Resume</span>
                </a>
              )}

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#263B32] dark:text-[#F5F1E8] bg-[#E6E0D2] dark:bg-[#202D26] border border-[#D9D2C5] dark:border-[#384F44] hover:border-[#87947A] transition-all"
              >
                <Mail className="w-4 h-4 text-[#87947A]" />
                <span>Contact Me</span>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-[#73786F] dark:text-[#A3ACA5]">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs hover:text-[#263B32] dark:hover:text-[#87947A] transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#87947A]" />
                <span>LinkedIn</span>
              </a>
              <span className="text-[#D9D2C5] dark:text-[#384F44]">•</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs hover:text-[#263B32] dark:hover:text-[#87947A] transition-colors"
              >
                <Github className="w-4 h-4 text-[#87947A]" />
                <span>GitHub</span>
              </a>
              <span className="text-[#D9D2C5] dark:text-[#384F44]">•</span>
              <span className="text-xs text-[#73786F] dark:text-[#A3ACA5]">Boisar, Maharashtra</span>
            </div>
          </div>

          {/* Hero Right Column: Profile Portrait with Subtle 3D Depth */}
          <div className="lg:col-span-5 flex justify-center perspective-container">
            <div className="relative group w-72 sm:w-80 md:w-88 tilt-card">
              {/* Subtle natural shadow backdrop */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#87947A]/25 to-[#B18A5A]/25 rounded-2xl blur-xl group-hover:blur-2xl transition duration-500 opacity-60"></div>

              <div className="relative bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl p-4 shadow-xl">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#E6E0D2] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] flex items-center justify-center">
                  <img
                    src={profile.avatarUrl || "/images/harsh-jha.jpg"}
                    alt={profile.displayName}
                    className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card footer details */}
                <div className="mt-4 pt-3 border-t border-[#E6E0D2] dark:border-[#384F44] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#263B32] dark:text-[#F5F1E8]">{profile.displayName}</p>
                    <p className="text-[11px] text-[#73786F] dark:text-[#A3ACA5]">B.Tech AI & ML (2025–2029)</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E6E0D2] dark:bg-[#18221D] text-[#263B32] dark:text-[#87947A] border border-[#D9D2C5] dark:border-[#384F44]">
                    SJCEM, Palghar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Projects Section (Case-Study Appearance + Subtle 3D Tilt) */}
      <section className="py-16 border-t border-[#D9D2C5] dark:border-[#384F44] bg-[#E6E0D2]/40 dark:bg-[#141A17]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#87947A] text-xs font-bold uppercase tracking-wider mb-1">
                <Code2 className="w-3.5 h-3.5 text-[#B18A5A]" />
                <span>Featured Engineering Work</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#263B32] dark:text-[#F5F1E8]">
                Selected Projects
              </h2>
              <p className="text-xs sm:text-sm text-[#73786F] dark:text-[#A3ACA5] mt-1">
                Exactly three verified projects reflecting backend architecture, AI integration, and core Python scripting.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#263B32] dark:text-[#87947A] hover:underline transition-colors"
            >
              <span>Explore all projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="portfolio-card tilt-card p-6 flex flex-col justify-between bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm hover:shadow-md transition-all group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#E6E0D2] dark:bg-[#18221D] text-[#263B32] dark:text-[#87947A] border border-[#D9D2C5] dark:border-[#384F44]">
                      {project.status}
                    </span>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#73786F] dark:text-[#A3ACA5] hover:text-[#263B32] dark:hover:text-[#87947A] transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>

                  <h3 className="text-base font-bold text-[#263B32] dark:text-[#F5F1E8] group-hover:text-[#B18A5A] transition-colors leading-snug">
                    <Link href={`/projects#${project.id}`}>{project.title}</Link>
                  </h3>

                  <p className="text-xs text-[#73786F] dark:text-[#A3ACA5] leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#E6E0D2]/70 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#F5F1E8] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-[#73786F] dark:text-[#A3ACA5]">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-[#E6E0D2] dark:border-[#384F44] flex items-center justify-between text-xs">
                  <Link
                    href={`/projects#${project.id}`}
                    className="text-[#263B32] dark:text-[#87947A] hover:underline font-bold inline-flex items-center gap-1"
                  >
                    Case Study <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#73786F] dark:text-[#A3ACA5] hover:text-[#263B32] dark:hover:text-[#F5F1E8] inline-flex items-center gap-1 font-medium"
                  >
                    Repo <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Credentials Highlights (Preview of actual uploaded certs) */}
      {certificates.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#D9D2C5] dark:border-[#384F44]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#87947A] text-xs font-bold uppercase tracking-wider mb-1">
                <Award className="w-3.5 h-3.5 text-[#B18A5A]" />
                <span>Verified Documentation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#263B32] dark:text-[#F5F1E8]">
                Verified Certifications
              </h2>
            </div>
            <Link
              href="/certifications"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#263B32] dark:text-[#87947A] hover:underline"
            >
              <span>View all ({certificates.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {certificates.slice(0, 3).map((cert) => (
              <Link
                key={cert.id}
                href="/certifications"
                className="portfolio-card p-5 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] hover:border-[#87947A] rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between text-xs text-[#73786F] dark:text-[#A3ACA5]">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#E6E0D2] dark:bg-[#18221D] text-[#263B32] dark:text-[#87947A]">
                    {cert.category}
                  </span>
                  <span className="font-mono">{cert.issueDate}</span>
                </div>
                <h3 className="text-sm font-bold text-[#263B32] dark:text-[#F5F1E8] group-hover:text-[#B18A5A] transition-colors line-clamp-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-[#B18A5A] font-medium truncate">{cert.issuingOrganization}</p>
                <div className="pt-2 border-t border-[#E6E0D2] dark:border-[#384F44] flex items-center justify-between text-xs text-[#263B32] dark:text-[#87947A] font-semibold">
                  <span>Inspect Document</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Education & Experience Preview Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#D9D2C5] dark:border-[#384F44]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Education Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#E6E0D2] dark:bg-[#263B32] text-[#263B32] dark:text-[#87947A]">
                  <GraduationCap className="w-4 h-4 text-[#B18A5A]" />
                </div>
                <h3 className="text-lg font-bold text-[#263B32] dark:text-[#F5F1E8]">Education Summary</h3>
              </div>
              <Link
                href="/education"
                className="text-xs font-bold text-[#263B32] dark:text-[#87947A] hover:underline flex items-center gap-1"
              >
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {education.slice(0, 2).map((item) => (
                <div key={item.id} className="portfolio-card p-4 space-y-1 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-xl shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-[#263B32] dark:text-[#F5F1E8]">
                      {item.title}
                    </h4>
                    <span className="text-xs font-mono font-bold text-[#263B32] dark:text-[#87947A] whitespace-nowrap bg-[#E6E0D2] dark:bg-[#18221D] px-2 py-0.5 rounded">
                      {item.score}
                    </span>
                  </div>
                  <p className="text-xs text-[#73786F] dark:text-[#A3ACA5]">{item.institution}</p>
                  <p className="text-[11px] text-[#73786F]/80 dark:text-[#A3ACA5]/80">{item.boardOrUniversity} • {item.yearEnd}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#E6E0D2] dark:bg-[#263B32] text-[#263B32] dark:text-[#87947A]">
                  <Briefcase className="w-4 h-4 text-[#B18A5A]" />
                </div>
                <h3 className="text-lg font-bold text-[#263B32] dark:text-[#F5F1E8]">Experience Preview</h3>
              </div>
              <Link
                href="/experience"
                className="text-xs font-bold text-[#263B32] dark:text-[#87947A] hover:underline flex items-center gap-1"
              >
                View details <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {experience.map((item) => (
                <div key={item.id} className="portfolio-card p-4 space-y-1 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-xl shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-[#263B32] dark:text-[#F5F1E8]">
                      {item.role}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#E6E0D2] dark:bg-[#18221D] text-[#73786F] dark:text-[#A3ACA5] font-medium border border-[#D9D2C5] dark:border-[#384F44]">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-xs text-[#87947A] font-semibold">
                    {item.organization} ({item.workMode})
                  </p>
                  <p className="text-xs text-[#73786F] dark:text-[#A3ACA5] line-clamp-2 pt-1 leading-relaxed">
                    {item.responsibilities[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-12 border-t border-[#D9D2C5] dark:border-[#384F44] bg-[#E6E0D2] dark:bg-[#141A17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#263B32] dark:text-[#F5F1E8]">
            Looking for an enthusiastic AI & ML engineering student?
          </h3>
          <p className="text-xs sm:text-sm text-[#73786F] dark:text-[#A3ACA5] max-w-xl mx-auto leading-relaxed">
            I am actively seeking practical internship and collaboration opportunities in AI/ML, data analytics, and software development.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#F5F1E8] bg-[#263B32] hover:bg-[#1D2F28] dark:bg-[#87947A] dark:text-[#18221D] dark:hover:bg-[#97A48A] transition-all shadow-md font-sans"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-[#263B32] dark:text-[#F5F1E8] bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] hover:border-[#87947A] transition-all shadow-sm"
            >
              <span>Read Full About Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
