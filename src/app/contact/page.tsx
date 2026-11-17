"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-[#D9D2C5] dark:border-[#384F44] pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6E0D2] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] text-[#263B32] dark:text-[#F5F1E8] text-xs font-semibold mb-3 shadow-sm">
          <MessageSquare className="w-3.5 h-3.5 text-[#B18A5A]" />
          <span>Get In Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263B32] dark:text-[#F5F1E8] tracking-tight">
          Contact Harsh Jha
        </h1>
        <p className="text-xs sm:text-sm text-[#73786F] dark:text-[#A3ACA5] mt-2 max-w-2xl leading-relaxed">
          Interested in discussing internship opportunities, engineering collaborations, or academic inquiries? Feel free to reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Card Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="portfolio-card p-6 md:p-8 space-y-6 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold text-[#263B32] dark:text-[#F5F1E8]">
              Direct Contact Details
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#E6E0D2]/50 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44]">
                <div className="p-2.5 rounded-lg bg-[#E6E0D2] dark:bg-[#263B32] text-[#263B32] dark:text-[#87947A] shrink-0">
                  <Mail className="w-4 h-4 text-[#87947A]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#73786F] dark:text-[#A3ACA5] uppercase tracking-wider block">
                    Email Address
                  </span>
                  <a
                    href="mailto:harshjha101ab@gmail.com"
                    className="text-xs sm:text-sm text-[#263B32] dark:text-[#F5F1E8] hover:text-[#87947A] transition-colors font-bold break-all"
                  >
                    harshjha101ab@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#E6E0D2]/50 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44]">
                <div className="p-2.5 rounded-lg bg-[#E6E0D2] dark:bg-[#263B32] text-[#263B32] dark:text-[#87947A] shrink-0">
                  <Phone className="w-4 h-4 text-[#87947A]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#73786F] dark:text-[#A3ACA5] uppercase tracking-wider block">
                    Phone / WhatsApp
                  </span>
                  <a
                    href="tel:+917385246094"
                    className="text-xs sm:text-sm text-[#263B32] dark:text-[#F5F1E8] hover:text-[#87947A] transition-colors font-bold"
                  >
                    +91 7385246094
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#E6E0D2]/50 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44]">
                <div className="p-2.5 rounded-lg bg-[#E6E0D2] dark:bg-[#263B32] text-[#263B32] dark:text-[#87947A] shrink-0">
                  <MapPin className="w-4 h-4 text-[#87947A]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#73786F] dark:text-[#A3ACA5] uppercase tracking-wider block">
                    Residential Location
                  </span>
                  <p className="text-xs sm:text-sm text-[#263B32] dark:text-[#F5F1E8] font-medium">
                    Dhanani Nagar, Boisar, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-[#E6E0D2] dark:border-[#384F44] space-y-3">
              <span className="text-[11px] font-bold text-[#73786F] dark:text-[#A3ACA5] uppercase tracking-wider block">
                Professional Profiles
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://linkedin.com/in/harshjha18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-[#E6E0D2]/50 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-xs font-bold text-[#263B32] dark:text-[#EAE3D5] hover:text-[#87947A] hover:border-[#87947A] transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4 text-[#87947A]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/Harshjha76"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-[#E6E0D2]/50 dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-xs font-bold text-[#263B32] dark:text-[#EAE3D5] hover:text-[#87947A] hover:border-[#87947A] transition-all shadow-sm"
                >
                  <Github className="w-4 h-4 text-[#87947A]" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <div className="portfolio-card p-6 md:p-8 space-y-6 bg-[#FFFFFF] dark:bg-[#263B32] border border-[#D9D2C5] dark:border-[#384F44] rounded-2xl shadow-sm">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-[#263B32] dark:text-[#F5F1E8]">
                Send a Direct Message
              </h2>
              <p className="text-xs text-[#73786F] dark:text-[#A3ACA5]">
                Your message is stored securely and directly delivered to my private portfolio owner inbox.
              </p>
            </div>

            {status === "success" && (
              <div className="p-4 rounded-xl bg-[#E6E0D2] dark:bg-[#202D26] border border-[#87947A]/40 text-[#263B32] dark:text-[#EAE3D5] flex items-start gap-3 text-xs leading-relaxed shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#87947A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#263B32] dark:text-[#F5F1E8]">Message delivered successfully!</p>
                  <p className="text-[#73786F] dark:text-[#A3ACA5] mt-0.5">
                    Thank you for reaching out. I have received your message in my private owner inbox and will get back to you promptly.
                  </p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-[#3B2222] border border-rose-300 dark:border-rose-800/40 text-rose-800 dark:text-rose-200 flex items-start gap-3 text-xs leading-relaxed">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Submission Failed</p>
                  <p className="text-xs mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-[#73786F] dark:text-[#A3ACA5]">
                    Your Name <span className="text-[#87947A]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E8] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-xs sm:text-sm text-[#263B32] dark:text-[#F5F1E8] placeholder:text-[#73786F]/50 focus:outline-none focus:border-[#87947A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-[#73786F] dark:text-[#A3ACA5]">
                    Your Email <span className="text-[#87947A]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E8] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-xs sm:text-sm text-[#263B32] dark:text-[#F5F1E8] placeholder:text-[#73786F]/50 focus:outline-none focus:border-[#87947A]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-bold text-[#73786F] dark:text-[#A3ACA5]">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="e.g. AI / ML Internship Role"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E8] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-xs sm:text-sm text-[#263B32] dark:text-[#F5F1E8] placeholder:text-[#73786F]/50 focus:outline-none focus:border-[#87947A]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-bold text-[#73786F] dark:text-[#A3ACA5]">
                  Message <span className="text-[#87947A]">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E8] dark:bg-[#18221D] border border-[#D9D2C5] dark:border-[#384F44] text-xs sm:text-sm text-[#263B32] dark:text-[#F5F1E8] placeholder:text-[#73786F]/50 focus:outline-none focus:border-[#87947A] resize-y leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-[#F5F1E8] bg-[#263B32] hover:bg-[#1D2F28] dark:bg-[#87947A] dark:text-[#18221D] dark:hover:bg-[#97A48A] transition-all disabled:opacity-50 font-sans shadow-md"
              >
                {status === "submitting" ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Submitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
