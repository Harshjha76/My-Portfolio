"use client";

import React, { useState, useEffect } from "react";
import { CertificateItem } from "@/types/portfolio";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  ExternalLink,
  Award,
  Calendar,
  Building,
  FileText,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export default function CertificateModal({
  certificate,
  onClose,
}: CertificateModalProps) {
  const [zoom, setZoom] = useState<number>(1);
  const [activeView, setActiveView] = useState<"preview" | "pdf">("preview");

  useEffect(() => {
    setZoom(1);
    if (certificate?.previewImageUrl) {
      setActiveView("preview");
    } else {
      setActiveView("pdf");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [certificate, onClose]);

  if (!certificate) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleZoomReset = () => setZoom(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-[#FFFFFF] dark:bg-[#1E2522] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#F5F1E8] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-[#D9D2C5] dark:border-[#384F44] bg-[#E6E0D2] dark:bg-[#1A211D]">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FFFFFF] dark:bg-[#263B32] text-[#263B32] dark:text-[#EAE3D5] border border-[#D9D2C5] dark:border-[#384F44]">
                {certificate.category}
              </span>
              <span className="text-xs text-[#73786F] dark:text-[#A4A58A] flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#87947A]" />
                {certificate.issueDate}
              </span>
              {certificate.credentialId && (
                <span className="text-[10px] font-mono font-medium text-[#73786F] dark:text-[#A4A58A] bg-[#FFFFFF] dark:bg-[#242E28] px-2 py-0.5 rounded border border-[#D9D2C5] dark:border-[#384F44]">
                  ID: {certificate.credentialId}
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#263B32] dark:text-[#F5F1E8] tracking-tight">
              {certificate.title}
            </h2>
            <p className="text-xs text-[#87947A] font-bold flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#B18A5A]" />
              {certificate.issuingOrganization}
            </p>
          </div>

          {/* Top Actions: Close & View Switcher */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {certificate.previewImageUrl && certificate.documentUrl && (
              <div className="flex items-center rounded-lg bg-[#FFFFFF] dark:bg-[#242E28] p-1 border border-[#D9D2C5] dark:border-[#384F44] text-xs">
                <button
                  onClick={() => setActiveView("preview")}
                  className={`px-2.5 py-1 rounded font-bold transition-all ${
                    activeView === "preview"
                      ? "bg-[#263B32] text-[#F5F1E8] dark:bg-[#87947A] dark:text-[#18221D] shadow-sm"
                      : "text-[#73786F] dark:text-[#A4A58A] hover:text-[#263B32] dark:hover:text-[#F5F1E8]"
                  }`}
                >
                  Image
                </button>
                <button
                  onClick={() => setActiveView("pdf")}
                  className={`px-2.5 py-1 rounded font-bold transition-all ${
                    activeView === "pdf"
                      ? "bg-[#263B32] text-[#F5F1E8] dark:bg-[#87947A] dark:text-[#18221D] shadow-sm"
                      : "text-[#73786F] dark:text-[#A4A58A] hover:text-[#263B32] dark:hover:text-[#F5F1E8]"
                  }`}
                >
                  PDF Document
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-xl bg-[#FFFFFF] dark:bg-[#242E28] hover:bg-[#E6E0D2] dark:hover:bg-[#2F3B34] text-[#73786F] dark:text-[#A4A58A] hover:text-[#263B32] dark:hover:text-[#F5F1E8] transition-colors border border-[#D9D2C5] dark:border-[#384F44]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Viewer Main Area */}
        <div className="relative flex-1 min-h-[350px] sm:min-h-[460px] max-h-[58vh] overflow-auto bg-[#F5F1E8] dark:bg-[#141A17] p-4 flex items-center justify-center">
          {activeView === "preview" && certificate.previewImageUrl ? (
            <div className="overflow-auto max-w-full max-h-full flex items-center justify-center">
              <img
                src={certificate.previewImageUrl}
                alt={certificate.title}
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "center center",
                  transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="max-h-[54vh] max-w-full object-contain rounded-lg shadow-xl border border-[#D9D2C5] dark:border-[#384F44]"
              />
            </div>
          ) : certificate.documentUrl ? (
            <iframe
              src={`${certificate.documentUrl}#toolbar=0`}
              title={certificate.title}
              className="w-full h-full min-h-[460px] rounded-lg border border-[#D9D2C5] dark:border-[#384F44] bg-white"
            />
          ) : (
            <div className="text-center p-8 space-y-2 text-[#73786F] dark:text-[#A4A58A]">
              <FileText className="w-12 h-12 mx-auto text-[#87947A] opacity-60" />
              <p className="text-sm">Official document on file in academic records.</p>
            </div>
          )}

          {/* Floating Zoom Controls for Image Preview */}
          {activeView === "preview" && certificate.previewImageUrl && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF]/95 dark:bg-[#1A211D]/90 backdrop-blur-md border border-[#D9D2C5] dark:border-[#384F44] shadow-lg text-xs font-mono text-[#263B32] dark:text-[#F5F1E8]">
              <button
                onClick={handleZoomOut}
                aria-label="Zoom out"
                disabled={zoom <= 0.75}
                className="p-1.5 rounded-full hover:bg-[#E6E0D2] dark:hover:bg-[#2F3B34] disabled:opacity-30"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 min-w-[50px] text-center font-bold text-[#263B32] dark:text-[#87947A]">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                aria-label="Zoom in"
                disabled={zoom >= 2.5}
                className="p-1.5 rounded-full hover:bg-[#E6E0D2] dark:hover:bg-[#2F3B34] disabled:opacity-30"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomReset}
                aria-label="Reset zoom"
                className="p-1.5 rounded-full hover:bg-[#E6E0D2] dark:hover:bg-[#2F3B34] ml-1 text-[#73786F] dark:text-[#A4A58A] hover:text-[#263B32] dark:hover:text-[#F5F1E8]"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Details & Skills Bar */}
        <div className="p-4 sm:p-5 border-t border-[#D9D2C5] dark:border-[#384F44] bg-[#E6E0D2] dark:bg-[#1A211D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Skills Supported by Certificate */}
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#73786F] dark:text-[#A4A58A] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#87947A]" />
              Verified Supported Skills
            </span>
            <div className="flex flex-wrap gap-1.5">
              {certificate.skillsSupported && certificate.skillsSupported.length > 0 ? (
                certificate.skillsSupported.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#FFFFFF] dark:bg-[#242E28] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#EAE3D5]"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-[#73786F] dark:text-[#A4A58A] italic">
                  Course completion credential
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons: Download & Verify */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {certificate.credentialUrl && (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#263B32] dark:text-[#F5F1E8] bg-[#FFFFFF] dark:bg-[#242E28] border border-[#D9D2C5] dark:border-[#384F44] hover:border-[#87947A] transition-all shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#B18A5A]" />
                <span>Verify Credential</span>
              </a>
            )}

            {certificate.allowDownload && certificate.documentUrl && (
              <a
                href={certificate.documentUrl}
                download
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#F5F1E8] bg-[#263B32] hover:bg-[#1D2F28] dark:bg-[#87947A] dark:text-[#18221D] dark:hover:bg-[#97A48A] transition-all shadow-md font-sans"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
