"use client";

import React, { useState } from "react";
import { CertificateItem } from "@/types/portfolio";
import { initialPortfolioData } from "@/lib/initialData";
import CertificateModal from "@/components/CertificateModal";
import {
  Award,
  Calendar,
  ExternalLink,
  Building,
  ShieldCheck,
  Eye,
  Filter,
  CheckCircle2,
  FileCheck,
  Sparkles,
} from "lucide-react";

export default function CertificationsPage() {
  const [certificates, setCertificates] = useState<CertificateItem[]>(
    initialPortfolioData.certificates.filter((c) => c.isPublished)
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalCert, setActiveModalCert] = useState<CertificateItem | null>(null);

  // Extract unique categories
  const categories = [
    "All",
    ...Array.from(new Set(certificates.map((c) => c.category))),
  ];

  const filteredCertificates =
    selectedCategory === "All"
      ? certificates
      : certificates.filter((c) => c.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Page Header */}
      <div className="border-b border-[#D9D2C5] dark:border-[#384F44] pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#F5F1E8] text-xs font-semibold mb-3 shadow-sm">
          <Award className="w-3.5 h-3.5 text-[#B18A5A]" />
          <span>Verified Credentials</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263B32] dark:text-[#F5F1E8] tracking-tight">
          Certifications & Accreditations
        </h1>
        <p className="text-xs sm:text-sm text-[#73786F] dark:text-[#A3ACA5] mt-2 max-w-2xl leading-relaxed">
          Verified academic certifications, practical simulations, and industry credentials with genuine supported skill evidence. Click any card to inspect full high-resolution documents.
        </p>
      </div>

      {/* Category Filter Pills */}
      {certificates.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          <span className="text-[#73786F] dark:text-[#A3ACA5] flex items-center gap-1 font-bold mr-1 text-[11px] uppercase tracking-wider">
            <Filter className="w-3 h-3 text-[#87947A]" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap text-xs ${
                selectedCategory === cat
                  ? "bg-[#263B32] text-[#F5F1E8] dark:bg-[#87947A] dark:text-[#18221D] shadow-sm"
                  : "bg-[#E6E0D2] dark:bg-[#263B32] text-[#73786F] dark:text-[#A3ACA5] hover:text-[#263B32] dark:hover:text-[#F5F1E8] border border-[#D9D2C5] dark:border-[#384F44]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* When certificates array is empty */}
      {certificates.length === 0 ? (
        <div className="portfolio-card p-12 md:p-16 text-center space-y-4 max-w-2xl mx-auto border-dashed border-[#D9D2C5] dark:border-[#384F44] bg-[#FFFFFF] dark:bg-[#263B32] rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#E6E0D2] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] flex items-center justify-center mx-auto text-[#87947A]">
            <Award className="w-8 h-8 opacity-80" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-[#263B32] dark:text-[#F5F1E8]">
              Certifications & Professional Learning
            </h2>
            <p className="text-sm text-[#73786F] dark:text-[#A3ACA5] max-w-md mx-auto">
              Certificates and professional learning records will be added here.
            </p>
          </div>
          <p className="text-xs text-[#73786F]/70 dark:text-[#A3ACA5]/70 pt-2">
            Upload certificates via the private owner interface to display verified records and skills.
          </p>
        </div>
      ) : (
        /* Dynamic Certificate Gallery */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              id={cert.id}
              onClick={() => setActiveModalCert(cert)}
              className="portfolio-card tilt-card flex flex-col justify-between overflow-hidden cursor-pointer group hover:border-[#87947A] transition-all bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] shadow-sm hover:shadow-md rounded-2xl"
            >
              {/* Certificate Image or Styled Preview Banner */}
              <div className="relative w-full h-48 bg-[#E6E0D2] dark:bg-[#18221D] overflow-hidden border-b border-[#D9D2C5] dark:border-[#384F44] flex items-center justify-center group-hover:brightness-105 transition duration-300">
                {cert.previewImageUrl ? (
                  <img
                    src={cert.previewImageUrl}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <FileCheck className="w-10 h-10 text-[#87947A] mx-auto opacity-70 group-hover:scale-110 transition duration-300" />
                    <span className="text-[11px] font-mono text-[#73786F] dark:text-[#A3ACA5] block">
                      Official Document Attached
                    </span>
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-semibold text-[#F5F1E8]">
                  <Eye className="w-4 h-4 text-[#87947A]" />
                  <span>Click to Inspect Document</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#FFFFFF]/90 dark:bg-[#18221D]/90 backdrop-blur-md text-[#263B32] dark:text-[#EAE3D5] border border-[#D9D2C5] dark:border-[#384F44]">
                    {cert.category}
                  </span>
                </div>
              </div>

              {/* Certificate Content Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#73786F] dark:text-[#A3ACA5]">
                    <span className="font-mono">{cert.issueDate}</span>
                    <span className="text-[10px] font-bold text-[#87947A] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#87947A]" /> Verified
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#263B32] dark:text-[#F5F1E8] group-hover:text-[#B18A5A] transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-[#B18A5A] font-bold flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 shrink-0" />
                    <span>{cert.issuingOrganization}</span>
                  </p>

                  <p className="text-xs text-[#73786F] dark:text-[#A3ACA5] line-clamp-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Supported Skills Badges */}
                <div className="pt-3 border-t border-[#E6E0D2] dark:border-[#384F44] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#73786F] dark:text-[#A3ACA5] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#87947A]" /> Supported Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsSupported.slice(0, 4).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#E6E0D2]/50 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#EAE3D5] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skillsSupported.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-[#73786F] dark:text-[#A3ACA5]">
                        +{cert.skillsSupported.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-5 py-3 border-t border-[#E6E0D2] dark:border-[#384F44] bg-[#E6E0D2]/30 dark:bg-[#1E2B23] flex items-center justify-between text-xs">
                <span className="text-[#263B32] dark:text-[#87947A] font-bold inline-flex items-center gap-1 group-hover:underline">
                  <Eye className="w-3.5 h-3.5" /> View Certificate
                </span>
                {cert.credentialUrl && (
                  <span className="text-[11px] text-[#73786F] dark:text-[#A3ACA5] flex items-center gap-0.5">
                    Online Verification <ExternalLink className="w-3 h-3 ml-0.5" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Modal */}
      <CertificateModal
        certificate={activeModalCert}
        onClose={() => setActiveModalCert(null)}
      />
    </div>
  );
}
