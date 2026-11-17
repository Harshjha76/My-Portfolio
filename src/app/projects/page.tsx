import React from "react";
import { getPublicPortfolioData } from "@/lib/storage";
import {
  Code2,
  Github,
  ExternalLink,
  Layers,
  CheckCircle2,
  Sparkles,
  Info,
  ArrowUpRight,
  Workflow,
  ListPlus,
  Terminal,
} from "lucide-react";

export const revalidate = 0;

export default function ProjectsPage() {
  const data = getPublicPortfolioData();
  const { projects } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-[#D9D2C5] dark:border-[#384F44] pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#F5F1E8] text-xs font-semibold mb-3 shadow-sm">
          <Code2 className="w-3.5 h-3.5 text-[#B18A5A]" />
          <span>Verified Software Artifacts</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263B32] dark:text-[#F5F1E8] tracking-tight">
          Approved Projects
        </h1>
        <p className="text-xs sm:text-sm text-[#73786F] dark:text-[#A3ACA5] mt-2 max-w-2xl leading-relaxed">
          Curated portfolio of three verified engineering projects showcasing backend REST APIs, Gemini AI integrations, and object-oriented Python utilities presented with case-study rigor.
        </p>
      </div>

      {/* Projects Detailed List */}
      <div className="space-y-12">
        {projects.map((project, index) => (
          <article
            key={project.id}
            id={project.id}
            className="portfolio-card p-6 md:p-10 space-y-8 scroll-mt-24 transition-all bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] hover:border-[#87947A] shadow-sm hover:shadow-md rounded-2xl"
          >
            {/* Top Bar: Title, Status, and Repo links */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6E0D2] dark:border-[#384F44] pb-6">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#E6E0D2] dark:bg-[#18221D] text-[#263B32] dark:text-[#87947A] border border-[#D9D2C5] dark:border-[#384F44]">
                    Project 0{index + 1}
                  </span>
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#E6E0D2]/50 dark:bg-[#18221D] text-[#73786F] dark:text-[#A3ACA5] border border-[#D9D2C5] dark:border-[#384F44]">
                    Status: {project.status}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#263B32] dark:text-[#F5F1E8]">
                  {project.title}
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#263B32] dark:text-[#F5F1E8] bg-[#E6E0D2] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] hover:border-[#87947A] transition-all shadow-sm"
                >
                  <Github className="w-4 h-4 text-[#87947A]" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#73786F]" />
                </a>

                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#F5F1E8] bg-[#263B32] hover:bg-[#1D2F28] dark:bg-[#87947A] dark:text-[#18221D] dark:hover:bg-[#97A48A] transition-all shadow-sm font-sans"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Direct Source File</span>
                  </a>
                )}
              </div>
            </div>

            {/* Project Overview */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#87947A] uppercase tracking-wider">
                Case Study Overview
              </h3>
              <p className="text-sm sm:text-base text-[#263B32] dark:text-[#EAE3D5] leading-relaxed font-normal">
                {project.fullDescription}
              </p>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-[#E6E0D2]/50 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] space-y-2">
                <h4 className="text-xs font-bold text-[#B18A5A] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B18A5A]"></span>
                  Problem Statement
                </h4>
                <p className="text-xs sm:text-sm text-[#73786F] dark:text-[#A3ACA5] leading-relaxed">
                  {project.problemStatement}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#E6E0D2]/50 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] space-y-2">
                <h4 className="text-xs font-bold text-[#263B32] dark:text-[#87947A] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#87947A]"></span>
                  Solution & Approach
                </h4>
                <p className="text-xs sm:text-sm text-[#73786F] dark:text-[#A3ACA5] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Technologies Used */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#73786F] dark:text-[#A3ACA5] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#87947A]" />
                Technologies & Architecture
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#E6E0D2]/60 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#EAE3D5]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Main Features */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#73786F] dark:text-[#A3ACA5] uppercase tracking-wider flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5 text-[#87947A]" />
                Key Capabilities & Implemented Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.mainFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-[#E6E0D2]/40 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-xs text-[#263B32] dark:text-[#EAE3D5]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#87947A] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Improvements */}
            {project.futureImprovements && project.futureImprovements.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-[#73786F] dark:text-[#A3ACA5] uppercase tracking-wider flex items-center gap-1.5">
                  <ListPlus className="w-3.5 h-3.5 text-[#B18A5A]" />
                  Planned Roadmap & Future Enhancements
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.futureImprovements.map((imp, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs rounded-lg bg-[#E6E0D2]/40 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-[#73786F] dark:text-[#A3ACA5] font-medium"
                    >
                      • {imp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Verification Note */}
            {project.verifiedNote && (
              <div className="p-4 rounded-xl bg-[#E6E0D2]/70 dark:bg-[#202D26] border border-[#87947A]/40 text-xs text-[#263B32] dark:text-[#EAE3D5] flex items-start gap-2.5 shadow-sm">
                <Info className="w-4 h-4 text-[#87947A] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-[#263B32] dark:text-[#F5F1E8]">Verification Note:</strong>{" "}
                  {project.verifiedNote}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
