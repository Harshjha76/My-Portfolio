"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PortfolioData, ThemeSettings, ContactMessage } from "@/types/portfolio";
import {
  Lock,
  LogOut,
  Save,
  Eye,
  CheckCircle2,
  AlertCircle,
  User,
  BookOpen,
  GraduationCap,
  Code2,
  Briefcase,
  Award,
  Compass,
  Trophy,
  Palette,
  Inbox,
  Shield,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  EyeOff,
  FileText,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { analyzeCertificateMetadata } from "@/lib/certificateAnalyzer";

export default function OwnerPage() {
  const { updateThemeSettings } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  // Portfolio Data State
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState<
    | "quick-add"
    | "profile"
    | "about"
    | "education"
    | "academics"
    | "projects"
    | "experience"
    | "skills"
    | "certificates"
    | "learning"
    | "achievements"
    | "resume"
    | "appearance"
    | "messages"
    | "security"
  >("quick-add");

  const [saveStatus, setSaveStatus] = useState<string>("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [uploadingCategory, setUploadingCategory] = useState<string | null>(null);

  // Manual Entry Form State (Matching Screenshot)
  const [manualEntry, setManualEntry] = useState({
    type: "certificate" as "certificate" | "achievement" | "both",
    title: "",
    issuer: "",
    dateEarned: "",
    descriptionOrLink: "",
    category: "Programming & Algorithms" as const,
    skillsInput: "",
    documentUrl: "",
    documentFilename: "",
    allowDownload: true,
    isPublished: true,
  });

  // Security password change state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  // Check login status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const res = await fetch("/api/owner/status");
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        fetchOwnerPortfolio();
        fetchMessages();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const fetchOwnerPortfolio = async () => {
    try {
      const res = await fetch("/api/portfolio?mode=owner");
      const result = await res.json();
      if (result.success) {
        setPortfolio(result.data);
      }
    } catch (err) {
      console.error("Failed to load owner portfolio data", err);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/owner/messages");
      const result = await res.json();
      if (result.success) {
        setMessages(result.messages || []);
      }
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const res = await fetch("/api/owner/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword("");
        fetchOwnerPortfolio();
        fetchMessages();
      } else {
        setLoginError(data.message || "Invalid password.");
      }
    } catch {
      setLoginError("Connection error during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/owner/logout", { method: "POST" });
    setIsAuthenticated(false);
    setPortfolio(null);
  };

  const handleSavePortfolio = async (updatedData?: PortfolioData) => {
    const dataToSave = updatedData || portfolio;
    if (!dataToSave) return;

    setSaveStatus("Saving changes...");
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setPortfolio(dataToSave);
        setSaveStatus("Changes saved & published successfully!");
        // sync theme context if theme changed
        if (dataToSave.theme) {
          updateThemeSettings(dataToSave.theme);
        }
        setTimeout(() => setSaveStatus(""), 3500);
      } else {
        setSaveStatus(`Failed to save: ${result.message || "Unknown error"}`);
      }
    } catch (err: any) {
      setSaveStatus(`Error saving: ${err.message}`);
    }
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    category: string,
    onSuccess: (url: string, filename: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCategory(category);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    try {
      const res = await fetch("/api/owner/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data.success) {
        onSuccess(data.url, data.filename);
        setSaveStatus(`File "${data.filename}" uploaded successfully!`);
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        alert(data.message || "File upload failed.");
      }
    } catch (err: any) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setUploadingCategory(null);
      e.target.value = "";
    }
  };

  const handleAddManualEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolio || !manualEntry.title.trim()) {
      alert("Please provide a title for the achievement / certificate.");
      return;
    }

    const updated = { ...portfolio };
    const idSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const isUrl =
      manualEntry.descriptionOrLink.trim().startsWith("http://") ||
      manualEntry.descriptionOrLink.trim().startsWith("https://");

    const parsedSkills = manualEntry.skillsInput
      ? manualEntry.skillsInput.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    if (manualEntry.type === "certificate" || manualEntry.type === "both") {
      const newCert = {
        id: `cert-${idSuffix}`,
        title: manualEntry.title.trim(),
        issuingOrganization: manualEntry.issuer.trim() || "Independent Organization",
        courseName: manualEntry.title.trim(),
        category: manualEntry.category,
        issueDate: manualEntry.dateEarned.trim() || new Date().getFullYear().toString(),
        description: isUrl ? "Verified certification credential." : manualEntry.descriptionOrLink.trim(),
        credentialUrl: isUrl ? manualEntry.descriptionOrLink.trim() : "",
        documentUrl: manualEntry.documentUrl,
        documentFilename: manualEntry.documentFilename,
        skillsSupported: parsedSkills,
        allowDownload: manualEntry.allowDownload,
        isPublished: manualEntry.isPublished,
      };
      updated.certificates = [newCert, ...updated.certificates];
    }

    if (manualEntry.type === "achievement" || manualEntry.type === "both") {
      const newAch = {
        id: `ach-${idSuffix}`,
        title: manualEntry.title.trim(),
        issuingOrganization: manualEntry.issuer.trim() || "Academic / Organization",
        date: manualEntry.dateEarned.trim() || new Date().getFullYear().toString(),
        description: manualEntry.descriptionOrLink.trim() || "Achievement milestone recognized.",
        supportingDocUrl: manualEntry.documentUrl,
        supportingDocFilename: manualEntry.documentFilename,
        isPublished: manualEntry.isPublished,
      };
      updated.achievements = [newAch, ...updated.achievements];
    }

    setPortfolio(updated);
    await handleSavePortfolio(updated);

    // Reset manual entry state
    setManualEntry({
      type: "certificate",
      title: "",
      issuer: "",
      dateEarned: "",
      descriptionOrLink: "",
      category: "Programming & Algorithms",
      skillsInput: "",
      documentUrl: "",
      documentFilename: "",
      allowDownload: true,
      isPublished: true,
    });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg("Updating...");
    try {
      const res = await fetch("/api/owner/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setPwMsg("Password updated successfully!");
        setCurrentPw("");
        setNewPw("");
      } else {
        setPwMsg(`Failed: ${result.message}`);
      }
    } catch (err: any) {
      setPwMsg(`Error: ${err.message}`);
    }
  };

  // If loading authentication state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#87947A]">
          <span className="w-5 h-5 border-2 border-[#87947A] border-t-transparent rounded-full animate-spin"></span>
          <span className="text-sm font-medium">Verifying owner credentials...</span>
        </div>
      </div>
    );
  }

  // If NOT authenticated, show the private owner login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="portfolio-card p-8 sm:p-10 max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#1D2721]/70 border border-[#87947A]/30 text-[#87947A] flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Portfolio Owner Login
            </h1>
            <p className="text-xs text-muted leading-relaxed">
              Private editing portal for Harsh Jha. Only the single portfolio owner can access this area.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-lg bg-rose-950/50 border border-rose-800/50 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="owner-password" className="text-xs font-semibold text-slate-300">
                Owner Access Password
              </label>
              <input
                id="owner-password"
                type="password"
                required
                autoFocus
                placeholder="Enter owner password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground placeholder:text-muted/50 focus:outline-none focus:border-[#87947A]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A] transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-cyan-950 border-t-transparent rounded-full animate-spin"></span>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authenticate as Owner</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-[#1F2530]">
            <Link
              href="/"
              className="text-xs text-muted hover:text-[#87947A] transition-colors"
            >
              ← Back to Public Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If Portfolio data is loading
  if (!portfolio) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#87947A]">
          <span className="w-5 h-5 border-2 border-[#87947A] border-t-transparent rounded-full animate-spin"></span>
          <span className="text-sm font-medium">Loading portfolio editing workspace...</span>
        </div>
      </div>
    );
  }

  // Screenshot-identical Manual Entry Card Render Helper
  const renderManualAchievementCertCard = (contextTitle?: string) => (
    <div className="portfolio-card p-6 md:p-8 space-y-6 border border-[#2A342D] bg-[#141A16] dark:bg-[#141A16] rounded-2xl shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#252E28] pb-4">
        <div>
          <h2 className="text-xl font-bold text-[#F5F1E8]">
            {contextTitle || "Add New Achievement / Certificate"}
          </h2>
          <p className="text-xs text-[#A4A58A] mt-0.5">
            Manually enter credentials, honors, or milestones and publish directly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#263B32] text-[#87947A] border border-[#87947A]/30">
            Manual Entry Form
          </span>
        </div>
      </div>

      <form onSubmit={handleAddManualEntry} className="space-y-5">
        {/* Target Type */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#EAE3D5]">
          <span className="text-[#A4A58A] uppercase tracking-wider text-[11px]">Save Record Under:</span>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="manualTarget"
              checked={manualEntry.type === "certificate"}
              onChange={() => setManualEntry({ ...manualEntry, type: "certificate" })}
              className="accent-[#87947A]"
            />
            <span>Certifications</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="manualTarget"
              checked={manualEntry.type === "achievement"}
              onChange={() => setManualEntry({ ...manualEntry, type: "achievement" })}
              className="accent-[#87947A]"
            />
            <span>Achievements</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="manualTarget"
              checked={manualEntry.type === "both"}
              onChange={() => setManualEntry({ ...manualEntry, type: "both" })}
              className="accent-[#87947A]"
            />
            <span>Both Sections</span>
          </label>
        </div>

        {/* TITLE (E.G. AWS CERTIFIED DEVELOPER) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-[#A4A58A] tracking-wider uppercase block">
            TITLE (E.G. AWS CERTIFIED DEVELOPER) <span className="text-[#87947A]">*</span>
          </label>
          <input
            type="text"
            required
            value={manualEntry.title}
            onChange={(e) => setManualEntry({ ...manualEntry, title: e.target.value })}
            placeholder="e.g. AWS Certified Developer / Machine Learning Specialization"
            className="w-full px-4 py-2.5 rounded-xl bg-[#0F1411] border border-[#252E28] text-xs sm:text-sm text-[#F5F1E8] placeholder:text-[#A4A58A]/50 focus:outline-none focus:border-[#87947A] transition-colors"
          />
        </div>

        {/* ISSUER / ORGANIZATION & DATE EARNED */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#A4A58A] tracking-wider uppercase block">
              ISSUER / ORGANIZATION
            </label>
            <input
              type="text"
              value={manualEntry.issuer}
              onChange={(e) => setManualEntry({ ...manualEntry, issuer: e.target.value })}
              placeholder="e.g. SJCEM / InAmigos / Forage / HackerRank"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0F1411] border border-[#252E28] text-xs sm:text-sm text-[#F5F1E8] placeholder:text-[#A4A58A]/50 focus:outline-none focus:border-[#87947A] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#A4A58A] tracking-wider uppercase block">
              DATE EARNED
            </label>
            <input
              type="text"
              value={manualEntry.dateEarned}
              onChange={(e) => setManualEntry({ ...manualEntry, dateEarned: e.target.value })}
              placeholder="Aug 2023"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0F1411] border border-[#252E28] text-xs sm:text-sm text-[#F5F1E8] placeholder:text-[#A4A58A]/50 focus:outline-none focus:border-[#87947A] transition-colors"
            />
          </div>
        </div>

        {/* DESCRIPTION / LINK */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-[#A4A58A] tracking-wider uppercase block">
            DESCRIPTION / LINK
          </label>
          <textarea
            rows={3}
            value={manualEntry.descriptionOrLink}
            onChange={(e) =>
              setManualEntry({ ...manualEntry, descriptionOrLink: e.target.value })
            }
            placeholder="Brief details or a verification link..."
            className="w-full px-4 py-2.5 rounded-xl bg-[#0F1411] border border-[#252E28] text-xs sm:text-sm text-[#F5F1E8] placeholder:text-[#A4A58A]/50 focus:outline-none focus:border-[#87947A] transition-colors leading-relaxed"
          />
        </div>

        {/* Category & Supported Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#A4A58A] tracking-wider uppercase block">
              CATEGORY
            </label>
            <select
              value={manualEntry.category}
              onChange={(e) =>
                setManualEntry({
                  ...manualEntry,
                  category: e.target.value as any,
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#0F1411] border border-[#252E28] text-xs sm:text-sm text-[#F5F1E8] focus:outline-none focus:border-[#87947A] transition-colors"
            >
              <option value="Programming & Algorithms">Programming & Algorithms</option>
              <option value="Data Analytics & Internships">Data Analytics & Internships</option>
              <option value="AI & Professional Development">AI & Professional Development</option>
              <option value="Academic Credentials">Academic Credentials</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#A4A58A] tracking-wider uppercase block">
              SUPPORTED SKILLS (COMMA-SEPARATED)
            </label>
            <input
              type="text"
              value={manualEntry.skillsInput}
              onChange={(e) => setManualEntry({ ...manualEntry, skillsInput: e.target.value })}
              placeholder="e.g. C, C++, Data Structures, Algorithms"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0F1411] border border-[#252E28] text-xs sm:text-sm text-[#F5F1E8] placeholder:text-[#A4A58A]/50 focus:outline-none focus:border-[#87947A] transition-colors"
            />
          </div>
        </div>

        {/* Document Proof & Publish Controls */}
        <div className="p-4 rounded-xl bg-[#0F1411] border border-[#252E28] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#18201B] border border-[#2C3830] hover:border-[#87947A] text-[#87947A] cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>
                {uploadingCategory === "manualDoc"
                  ? "Uploading & Analyzing..."
                  : manualEntry.documentUrl
                  ? `Attached: ${manualEntry.documentFilename || "Document"}`
                  : "Upload PDF or Image Proof"}
              </span>
              <input
                type="file"
                accept="application/pdf,image/*"
                className="hidden"
                onChange={(e) =>
                  handleFileUpload(e, "manualDoc", (url, filename) => {
                    const analysis = analyzeCertificateMetadata(filename);
                    setManualEntry((prev) => ({
                      ...prev,
                      documentUrl: url,
                      documentFilename: filename,
                      title: prev.title.trim() ? prev.title : analysis.title,
                      issuer: prev.issuer.trim() ? prev.issuer : analysis.issuingOrganization,
                      dateEarned: prev.dateEarned.trim() ? prev.dateEarned : analysis.issueDate,
                      descriptionOrLink:
                        prev.descriptionOrLink.trim()
                          ? prev.descriptionOrLink
                          : analysis.credentialUrl || analysis.description,
                      category: (analysis.category as any) || prev.category,
                      skillsInput:
                        prev.skillsInput.trim()
                          ? prev.skillsInput
                          : analysis.suggestedSkills.join(", "),
                    }));
                    setSaveStatus(`✨ Auto-extracted details from "${filename}"`);
                    setTimeout(() => setSaveStatus(""), 4000);
                  })
                }
              />
            </label>
            {manualEntry.documentUrl && (
              <button
                type="button"
                onClick={() =>
                  setManualEntry({
                    ...manualEntry,
                    documentUrl: "",
                    documentFilename: "",
                  })
                }
                className="text-[#A4A58A] hover:text-rose-400 underline"
              >
                Remove
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#EAE3D5] cursor-pointer">
              <input
                type="checkbox"
                checked={manualEntry.allowDownload}
                onChange={(e) =>
                  setManualEntry({ ...manualEntry, allowDownload: e.target.checked })
                }
                className="rounded w-4 h-4 accent-[#87947A]"
              />
              <span>Allow public download</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-[#EAE3D5] cursor-pointer">
              <input
                type="checkbox"
                checked={manualEntry.isPublished}
                onChange={(e) =>
                  setManualEntry({ ...manualEntry, isPublished: e.target.checked })
                }
                className="rounded w-4 h-4 accent-[#87947A]"
              />
              <span>Publish immediately</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A] transition-all shadow-md hover:shadow-[#87947A]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Save & Add Entry Manually</span>
          </button>
        </div>
      </form>
    </div>
  );

  // OWNER EDITING INTERFACE
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Owner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242933] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono font-semibold uppercase text-emerald-400 tracking-wider">
              Owner Editing Mode
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
            Harsh Jha — Portfolio Manager
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Privately manage and update your academic records, projects, certificates, learning topics, and appearance.
          </p>
        </div>

        {/* Global Save, Preview & Logout Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => handleSavePortfolio()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A] transition-all shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save All Changes</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-foreground bg-[#141820] border border-[#242933] hover:border-[#87947A]/50 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-[#87947A]" />
            <span>Preview Live Site</span>
            <ExternalLink className="w-3 h-3 text-muted ml-0.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-300 bg-rose-950/40 border border-rose-800/40 hover:bg-rose-900/50 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Save Notification Banner */}
      {saveStatus && (
        <div className="p-3.5 rounded-lg bg-[#1D2721]/80 border border-[#87947A]/30 text-[#EAE3D5] text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#87947A]" />
            <span>{saveStatus}</span>
          </div>
          <button
            onClick={() => setSaveStatus("")}
            className="text-[#87947A] hover:underline text-[11px]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Owner Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#222732] text-xs">
        {[
          { id: "quick-add", label: "Add Manually (+)", icon: Plus },
          { id: "profile", label: "Profile & Identity", icon: User },
          { id: "about", label: "About Page", icon: BookOpen },
          { id: "education", label: "Education", icon: GraduationCap },
          { id: "academics", label: "Academic SGPI & Marks", icon: Award },
          { id: "projects", label: "Approved Projects", icon: Code2 },
          { id: "experience", label: "Experience", icon: Briefcase },
          { id: "skills", label: "Technical Skills", icon: Code2 },
          { id: "certificates", label: "Certifications", icon: Award },
          { id: "learning", label: "Current Learning", icon: Compass },
          { id: "achievements", label: "Achievements", icon: Trophy },
          { id: "resume", label: "Resume Manager", icon: FileText },
          { id: "appearance", label: "Appearance & Theme", icon: Palette },
          { id: "messages", label: `Inbox (${messages.length})`, icon: Inbox },
          { id: "security", label: "Password Security", icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "bg-[#1D2721]/80 text-[#A4A58A] border border-[#87947A]/30 shadow-sm"
                  : "text-muted hover:text-foreground hover:bg-[#141820]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT AREAS */}

      {/* 0. QUICK ADD / MANUAL ENTRY TAB */}
      {activeTab === "quick-add" && (
        <div className="space-y-8">
          {renderManualAchievementCertCard()}
        </div>
      )}

      {/* 1. PROFILE & IDENTITY TAB */}
      {activeTab === "profile" && (
        <div className="portfolio-card p-6 md:p-8 space-y-6">
          <div className="border-b border-[#222732] pb-4">
            <h2 className="text-lg font-bold text-foreground">
              Personal Information & Headline
            </h2>
            <p className="text-xs text-muted">
              Update your confirmed personal details, professional headline, and default portrait.
            </p>
          </div>

          {/* Profile Photo Management */}
          <div className="p-4 rounded-xl bg-[#12151B] border border-[#222732] flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#0D0F12] border border-[#202530] shrink-0">
              <img
                src={portfolio.profile.avatarUrl || "/images/harsh-jha.jpg"}
                alt="Harsh Jha Portrait"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left flex-1">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Portfolio Portrait / Avatar
              </h3>
              <p className="text-xs text-muted">
                Upload your actual photo (JPEG, PNG, WEBP) to update your portrait across the portfolio.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A] cursor-pointer transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>
                    {uploadingCategory === "avatar" ? "Uploading..." : "Upload New Photo"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(e, "avatar", (url) => {
                        setPortfolio({
                          ...portfolio,
                          profile: { ...portfolio.profile, avatarUrl: url },
                        });
                      })
                    }
                  />
                </label>

                {portfolio.profile.avatarUrl !== "/images/harsh-jha.jpg" && (
                  <button
                    onClick={() =>
                      setPortfolio({
                        ...portfolio,
                        profile: {
                          ...portfolio.profile,
                          avatarUrl: "/images/harsh-jha.jpg",
                        },
                      })
                    }
                    className="text-xs text-muted hover:text-[#87947A] underline"
                  >
                    Reset to Harsh&apos;s Portrait
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Display Name</label>
              <input
                type="text"
                value={portfolio.profile.displayName}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    profile: { ...portfolio.profile, displayName: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Degree</label>
              <input
                type="text"
                value={portfolio.profile.degree}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    profile: { ...portfolio.profile, degree: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A]"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300">College / Institution</label>
              <input
                type="text"
                value={portfolio.profile.college}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    profile: { ...portfolio.profile, college: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A]"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Professional Headline</label>
              <input
                type="text"
                value={portfolio.profile.headline}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    profile: { ...portfolio.profile, headline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                value={portfolio.profile.email}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    profile: { ...portfolio.profile, email: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Phone Number</label>
              <input
                type="text"
                value={portfolio.profile.phone}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    profile: { ...portfolio.profile, phone: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A]"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Location</label>
              <input
                type="text"
                value={portfolio.profile.location}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    profile: { ...portfolio.profile, location: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">LinkedIn URL</label>
              <input
                type="text"
                value={portfolio.profile.linkedin}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    profile: { ...portfolio.profile, linkedin: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">GitHub URL</label>
              <input
                type="text"
                value={portfolio.profile.github}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    profile: { ...portfolio.profile, github: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => handleSavePortfolio()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. ABOUT PAGE TAB */}
      {activeTab === "about" && (
        <div className="portfolio-card p-6 md:p-8 space-y-6">
          <div className="border-b border-[#222732] pb-4">
            <h2 className="text-lg font-bold text-foreground">About Page Content</h2>
            <p className="text-xs text-muted">
              Edit the professional introduction, personal interests, technical focus areas, and spoken languages.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Professional Introduction
              </label>
              <textarea
                rows={5}
                value={portfolio.about.introduction}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    about: { ...portfolio.about, introduction: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A] leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Technical Focus Interests (comma-separated)
              </label>
              <input
                type="text"
                value={portfolio.about.technicalInterests.join(", ")}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    about: {
                      ...portfolio.about,
                      technicalInterests: e.target.value.split(",").map((s) => s.trim()),
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Career Interests (comma-separated)
              </label>
              <input
                type="text"
                value={portfolio.about.careerInterests.join(", ")}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    about: {
                      ...portfolio.about,
                      careerInterests: e.target.value.split(",").map((s) => s.trim()),
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Personal Interests & Hobbies (comma-separated)
              </label>
              <input
                type="text"
                value={portfolio.about.personalInterests.join(", ")}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    about: {
                      ...portfolio.about,
                      personalInterests: e.target.value.split(",").map((s) => s.trim()),
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A]"
              />
            </div>

            {/* Spoken Languages Editor */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Spoken Languages
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const langs = [...portfolio.about.spokenLanguages, { language: "", proficiency: "" }];
                    setPortfolio({
                      ...portfolio,
                      about: { ...portfolio.about, spokenLanguages: langs },
                    });
                  }}
                  className="text-xs text-[#87947A] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Language
                </button>
              </div>

              <div className="space-y-2">
                {portfolio.about.spokenLanguages.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Language name (e.g. Hindi)"
                      value={item.language}
                      onChange={(e) => {
                        const updated = [...portfolio.about.spokenLanguages];
                        updated[idx].language = e.target.value;
                        setPortfolio({
                          ...portfolio,
                          about: { ...portfolio.about, spokenLanguages: updated },
                        });
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground"
                    />
                    <input
                      type="text"
                      placeholder="Proficiency (e.g. Native / Fluent)"
                      value={item.proficiency}
                      onChange={(e) => {
                        const updated = [...portfolio.about.spokenLanguages];
                        updated[idx].proficiency = e.target.value;
                        setPortfolio({
                          ...portfolio,
                          about: { ...portfolio.about, spokenLanguages: updated },
                        });
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = portfolio.about.spokenLanguages.filter((_, i) => i !== idx);
                        setPortfolio({
                          ...portfolio,
                          about: { ...portfolio.about, spokenLanguages: updated },
                        });
                      }}
                      className="p-1.5 text-muted hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => handleSavePortfolio()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save About Page Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. EDUCATION TAB */}
      {activeTab === "education" && (
        <div className="portfolio-card p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#222732] pb-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">Education Records</h2>
              <p className="text-xs text-muted">
                Manage your 10th, 12th, and Undergraduate institutional degrees.
              </p>
            </div>
            <button
              onClick={() => {
                const newItem = {
                  id: `edu-${Date.now()}`,
                  level: "Other" as const,
                  title: "New Academic Qualification",
                  institution: "Institution Name",
                  boardOrUniversity: "Board / University",
                  yearEnd: new Date().getFullYear(),
                  scoreType: "Percentage" as const,
                  score: "0%",
                  status: "Completed",
                  isPublished: true,
                };
                setPortfolio({
                  ...portfolio,
                  education: [newItem, ...portfolio.education],
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Plus className="w-3 h-3" />
              <span>Add Education</span>
            </button>
          </div>

          <div className="space-y-4">
            {portfolio.education.map((item, idx) => (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-[#12151B] border border-[#222732] space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#1E232E] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#87947A] px-2 py-0.5 rounded bg-[#1D2721]/70 border border-[#87947A]/30">
                      {item.level}
                    </span>
                    <span className="text-sm font-bold text-foreground">{item.title}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.isPublished}
                        onChange={(e) => {
                          const updated = [...portfolio.education];
                          updated[idx].isPublished = e.target.checked;
                          setPortfolio({ ...portfolio, education: updated });
                        }}
                        className="rounded accent-[#87947A]"
                      />
                      <span>{item.isPublished ? "Published" : "Hidden"}</span>
                    </label>

                    <button
                      onClick={() => {
                        if (confirm(`Delete education record "${item.title}"?`)) {
                          const updated = portfolio.education.filter((_, i) => i !== idx);
                          setPortfolio({ ...portfolio, education: updated });
                        }
                      }}
                      className="p-1 text-muted hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-muted block mb-1">Degree / Qualification Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...portfolio.education];
                        updated[idx].title = e.target.value;
                        setPortfolio({ ...portfolio, education: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-muted block mb-1">Institution</label>
                    <input
                      type="text"
                      value={item.institution}
                      onChange={(e) => {
                        const updated = [...portfolio.education];
                        updated[idx].institution = e.target.value;
                        setPortfolio({ ...portfolio, education: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-muted block mb-1">Board / University</label>
                    <input
                      type="text"
                      value={item.boardOrUniversity}
                      onChange={(e) => {
                        const updated = [...portfolio.education];
                        updated[idx].boardOrUniversity = e.target.value;
                        setPortfolio({ ...portfolio, education: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-muted block mb-1">Year Completed / Target</label>
                    <input
                      type="number"
                      value={item.yearEnd}
                      onChange={(e) => {
                        const updated = [...portfolio.education];
                        updated[idx].yearEnd = Number(e.target.value);
                        setPortfolio({ ...portfolio, education: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-muted block mb-1">Score / Percentage / SGPI</label>
                    <input
                      type="text"
                      value={item.score}
                      onChange={(e) => {
                        const updated = [...portfolio.education];
                        updated[idx].score = e.target.value;
                        setPortfolio({ ...portfolio, education: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-muted block mb-1">Status</label>
                    <input
                      type="text"
                      value={item.status}
                      onChange={(e) => {
                        const updated = [...portfolio.education];
                        updated[idx].status = e.target.value;
                        setPortfolio({ ...portfolio, education: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => handleSavePortfolio()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Education Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. ACADEMICS SGPI & MARKS TAB */}
      {activeTab === "academics" && (
        <div className="portfolio-card p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#222732] pb-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Academic Performance & Marksheets
              </h2>
              <p className="text-xs text-muted">
                Add future semesters, update SGPI results, attach marksheet PDFs, and customize subject grades.
              </p>
            </div>

            <button
              onClick={() => {
                const nextSemNumber = portfolio.academicPerformance.length + 1;
                const newSem = {
                  id: `sem-${nextSemNumber}`,
                  semesterNumber: nextSemNumber,
                  semesterLabel: `Semester ${nextSemNumber}`,
                  academicYear: "2026-2027",
                  sgpi: 9.0,
                  subjects: [],
                  isPublished: true,
                };
                setPortfolio({
                  ...portfolio,
                  academicPerformance: [...portfolio.academicPerformance, newSem],
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Plus className="w-3 h-3" />
              <span>Add New Semester</span>
            </button>
          </div>

          <div className="space-y-6">
            {portfolio.academicPerformance.map((sem, sIdx) => (
              <div
                key={sem.id}
                className="p-5 rounded-xl bg-[#12151B] border border-[#222732] space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E232E] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-foreground">
                      {sem.semesterLabel}
                    </span>
                    <span className="text-xs text-[#87947A] font-mono font-semibold">
                      SGPI: {sem.sgpi.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sem.isPublished}
                        onChange={(e) => {
                          const updated = [...portfolio.academicPerformance];
                          updated[sIdx].isPublished = e.target.checked;
                          setPortfolio({ ...portfolio, academicPerformance: updated });
                        }}
                        className="rounded accent-[#87947A]"
                      />
                      <span>{sem.isPublished ? "Published" : "Hidden"}</span>
                    </label>

                    <button
                      onClick={() => {
                        if (confirm(`Delete ${sem.semesterLabel}?`)) {
                          const updated = portfolio.academicPerformance.filter((_, i) => i !== sIdx);
                          setPortfolio({ ...portfolio, academicPerformance: updated });
                        }
                      }}
                      className="text-xs text-muted hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-muted block mb-1">Semester Label</label>
                    <input
                      type="text"
                      value={sem.semesterLabel}
                      onChange={(e) => {
                        const updated = [...portfolio.academicPerformance];
                        updated[sIdx].semesterLabel = e.target.value;
                        setPortfolio({ ...portfolio, academicPerformance: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-muted block mb-1">Academic Year</label>
                    <input
                      type="text"
                      value={sem.academicYear}
                      onChange={(e) => {
                        const updated = [...portfolio.academicPerformance];
                        updated[sIdx].academicYear = e.target.value;
                        setPortfolio({ ...portfolio, academicPerformance: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-muted block mb-1">SGPI (0.00 – 10.00)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={sem.sgpi}
                      onChange={(e) => {
                        const updated = [...portfolio.academicPerformance];
                        updated[sIdx].sgpi = parseFloat(e.target.value) || 0;
                        setPortfolio({ ...portfolio, academicPerformance: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-[#87947A] font-mono font-bold"
                    />
                  </div>
                </div>

                {/* Marksheet Upload & Status */}
                <div className="p-3 rounded-lg bg-[#0E1014] border border-[#1A1F28] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#87947A]" />
                    <div>
                      <span className="font-semibold text-slate-200 block">
                        Official Marksheet Document (PDF / Image)
                      </span>
                      <span className="text-[11px] text-muted">
                        {sem.marksheetUrl
                          ? `Attached: ${sem.marksheetFilename || "Uploaded Document"}`
                          : "No marksheet uploaded yet"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {sem.marksheetUrl && (
                      <a
                        href={sem.marksheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#87947A] hover:underline inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" /> View
                      </a>
                    )}

                    <label className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#181D26] border border-[#252C39] hover:border-[#87947A]/50 text-slate-300 cursor-pointer">
                      <Upload className="w-3 h-3 text-[#87947A]" />
                      <span>{sem.marksheetUrl ? "Replace File" : "Upload Marksheet"}</span>
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, "marksheet", (url, filename) => {
                            const updated = [...portfolio.academicPerformance];
                            updated[sIdx].marksheetUrl = url;
                            updated[sIdx].marksheetFilename = filename;
                            setPortfolio({ ...portfolio, academicPerformance: updated });
                          })
                        }
                      />
                    </label>

                    {sem.marksheetUrl && (
                      <button
                        onClick={() => {
                          const updated = [...portfolio.academicPerformance];
                          delete updated[sIdx].marksheetUrl;
                          delete updated[sIdx].marksheetFilename;
                          setPortfolio({ ...portfolio, academicPerformance: updated });
                        }}
                        className="text-xs text-muted hover:text-rose-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {/* Subjects breakdown */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-muted">Subjects & Grades</span>
                    <button
                      onClick={() => {
                        const updated = [...portfolio.academicPerformance];
                        updated[sIdx].subjects = [
                          ...(updated[sIdx].subjects || []),
                          { code: "SUB101", name: "New Subject", credits: 3, grade: "A+" },
                        ];
                        setPortfolio({ ...portfolio, academicPerformance: updated });
                      }}
                      className="text-[#87947A] hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Subject
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {sem.subjects &&
                      sem.subjects.map((subj, subIdx) => (
                        <div key={subIdx} className="flex items-center gap-2 text-xs">
                          <input
                            type="text"
                            placeholder="Code"
                            value={subj.code}
                            onChange={(e) => {
                              const updated = [...portfolio.academicPerformance];
                              updated[sIdx].subjects[subIdx].code = e.target.value;
                              setPortfolio({ ...portfolio, academicPerformance: updated });
                            }}
                            className="w-20 px-2 py-1 rounded bg-[#0E1014] border border-[#1E232E] text-[#87947A] font-mono text-[11px]"
                          />
                          <input
                            type="text"
                            placeholder="Subject Name"
                            value={subj.name}
                            onChange={(e) => {
                              const updated = [...portfolio.academicPerformance];
                              updated[sIdx].subjects[subIdx].name = e.target.value;
                              setPortfolio({ ...portfolio, academicPerformance: updated });
                            }}
                            className="flex-1 px-2 py-1 rounded bg-[#0E1014] border border-[#1E232E] text-slate-200"
                          />
                          <input
                            type="text"
                            placeholder="Grade"
                            value={subj.grade}
                            onChange={(e) => {
                              const updated = [...portfolio.academicPerformance];
                              updated[sIdx].subjects[subIdx].grade = e.target.value;
                              setPortfolio({ ...portfolio, academicPerformance: updated });
                            }}
                            className="w-16 px-2 py-1 rounded bg-[#0E1014] border border-[#1E232E] text-emerald-400 font-mono font-bold text-center"
                          />
                          <button
                            onClick={() => {
                              const updated = [...portfolio.academicPerformance];
                              updated[sIdx].subjects = updated[sIdx].subjects.filter(
                                (_, i) => i !== subIdx
                              );
                              setPortfolio({ ...portfolio, academicPerformance: updated });
                            }}
                            className="p-1 text-muted hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => handleSavePortfolio()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Academic Records</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. APPROVED PROJECTS TAB */}
      {activeTab === "projects" && (
        <div className="portfolio-card p-6 md:p-8 space-y-6">
          <div className="border-b border-[#222732] pb-4">
            <h2 className="text-lg font-bold text-foreground">Approved Projects</h2>
            <p className="text-xs text-muted">
              Edit descriptions, problem statements, solutions, technologies, and upload screenshots for your 3 verified projects.
            </p>
          </div>

          <div className="space-y-6">
            {portfolio.projects.map((proj, pIdx) => (
              <div
                key={proj.id}
                className="p-5 rounded-xl bg-[#12151B] border border-[#222732] space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E232E] pb-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{proj.title}</h3>
                    <p className="text-xs text-[#87947A] font-mono">{proj.repoName}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={proj.isPublished}
                        onChange={(e) => {
                          const updated = [...portfolio.projects];
                          updated[pIdx].isPublished = e.target.checked;
                          setPortfolio({ ...portfolio, projects: updated });
                        }}
                        className="rounded accent-[#87947A]"
                      />
                      <span>{proj.isPublished ? "Published" : "Hidden"}</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-muted block mb-1">Project Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const updated = [...portfolio.projects];
                        updated[pIdx].title = e.target.value;
                        setPortfolio({ ...portfolio, projects: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-muted block mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={proj.githubUrl}
                      onChange={(e) => {
                        const updated = [...portfolio.projects];
                        updated[pIdx].githubUrl = e.target.value;
                        setPortfolio({ ...portfolio, projects: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-muted block mb-1">Short Description</label>
                    <input
                      type="text"
                      value={proj.shortDescription}
                      onChange={(e) => {
                        const updated = [...portfolio.projects];
                        updated[pIdx].shortDescription = e.target.value;
                        setPortfolio({ ...portfolio, projects: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-muted block mb-1">Full Description</label>
                    <textarea
                      rows={3}
                      value={proj.fullDescription}
                      onChange={(e) => {
                        const updated = [...portfolio.projects];
                        updated[pIdx].fullDescription = e.target.value;
                        setPortfolio({ ...portfolio, projects: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="text-muted block mb-1">Problem Statement</label>
                    <textarea
                      rows={3}
                      value={proj.problemStatement}
                      onChange={(e) => {
                        const updated = [...portfolio.projects];
                        updated[pIdx].problemStatement = e.target.value;
                        setPortfolio({ ...portfolio, projects: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-muted block mb-1">Solution</label>
                    <textarea
                      rows={3}
                      value={proj.solution}
                      onChange={(e) => {
                        const updated = [...portfolio.projects];
                        updated[pIdx].solution = e.target.value;
                        setPortfolio({ ...portfolio, projects: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-muted block mb-1">
                      Technologies (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={proj.technologies.join(", ")}
                      onChange={(e) => {
                        const updated = [...portfolio.projects];
                        updated[pIdx].technologies = e.target.value
                          .split(",")
                          .map((s) => s.trim());
                        setPortfolio({ ...portfolio, projects: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-[#A4A58A]"
                    />
                  </div>
                </div>

                {/* Screenshot Upload for Project */}
                <div className="p-3 rounded-lg bg-[#0E1014] border border-[#1E232E] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300">
                      Screenshots & Visuals
                    </span>
                    <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#181D26] border border-[#252C39] hover:border-[#87947A]/50 text-[#87947A] cursor-pointer">
                      <Upload className="w-3 h-3" />
                      <span>Upload Screenshot</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, "screenshot", (url) => {
                            const updated = [...portfolio.projects];
                            updated[pIdx].screenshots = [
                              ...(updated[pIdx].screenshots || []),
                              url,
                            ];
                            setPortfolio({ ...portfolio, projects: updated });
                          })
                        }
                      />
                    </label>
                  </div>

                  {proj.screenshots && proj.screenshots.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {proj.screenshots.map((shot, sIndex) => (
                        <div key={sIndex} className="relative group w-20 h-16 rounded overflow-hidden border border-[#242A36]">
                          <img src={shot} alt="Screenshot" className="w-full h-full object-cover" />
                          <button
                            onClick={() => {
                              const updated = [...portfolio.projects];
                              updated[pIdx].screenshots = updated[pIdx].screenshots.filter(
                                (_, i) => i !== sIndex
                              );
                              setPortfolio({ ...portfolio, projects: updated });
                            }}
                            className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-muted italic">No screenshots attached yet.</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => handleSavePortfolio()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Projects Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. EXPERIENCE TAB */}
      {activeTab === "experience" && (
        <div className="portfolio-card p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#222732] pb-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">Experience Entries</h2>
              <p className="text-xs text-muted">
                Manage your InAmigos Foundation internship and independent teaching engagements.
              </p>
            </div>
            <button
              onClick={() => {
                const newExp = {
                  id: `exp-${Date.now()}`,
                  role: "New Role",
                  organization: "Organization Name",
                  workMode: "Remote" as const,
                  duration: "2026",
                  responsibilities: ["Key responsibility description..."],
                  isCurrent: false,
                  isPublished: true,
                };
                setPortfolio({
                  ...portfolio,
                  experience: [...portfolio.experience, newExp],
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Plus className="w-3 h-3" />
              <span>Add Experience</span>
            </button>
          </div>

          <div className="space-y-4">
            {portfolio.experience.map((entry, idx) => (
              <div
                key={entry.id}
                className="p-5 rounded-xl bg-[#12151B] border border-[#222732] space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#1E232E] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-foreground">{entry.role}</span>
                    <span className="text-xs text-[#87947A] font-medium">
                      ({entry.organization})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={entry.isPublished}
                        onChange={(e) => {
                          const updated = [...portfolio.experience];
                          updated[idx].isPublished = e.target.checked;
                          setPortfolio({ ...portfolio, experience: updated });
                        }}
                        className="rounded accent-[#87947A]"
                      />
                      <span>{entry.isPublished ? "Published" : "Hidden"}</span>
                    </label>

                    <button
                      onClick={() => {
                        if (confirm(`Delete experience "${entry.role}"?`)) {
                          const updated = portfolio.experience.filter((_, i) => i !== idx);
                          setPortfolio({ ...portfolio, experience: updated });
                        }
                      }}
                      className="p-1 text-muted hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-muted block mb-1">Role Title</label>
                    <input
                      type="text"
                      value={entry.role}
                      onChange={(e) => {
                        const updated = [...portfolio.experience];
                        updated[idx].role = e.target.value;
                        setPortfolio({ ...portfolio, experience: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-muted block mb-1">Organization</label>
                    <input
                      type="text"
                      value={entry.organization}
                      onChange={(e) => {
                        const updated = [...portfolio.experience];
                        updated[idx].organization = e.target.value;
                        setPortfolio({ ...portfolio, experience: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-muted block mb-1">Date / Duration</label>
                    <input
                      type="text"
                      value={entry.duration}
                      onChange={(e) => {
                        const updated = [...portfolio.experience];
                        updated[idx].duration = e.target.value;
                        setPortfolio({ ...portfolio, experience: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-muted block mb-1">
                      Responsibilities (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={entry.responsibilities.join("\n")}
                      onChange={(e) => {
                        const updated = [...portfolio.experience];
                        updated[idx].responsibilities = e.target.value
                          .split("\n")
                          .filter((line) => line.trim().length > 0);
                        setPortfolio({ ...portfolio, experience: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => handleSavePortfolio()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Experience Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* 7. TECHNICAL SKILLS TAB */}
      {activeTab === "skills" && (
        <div className="portfolio-card p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#222732] pb-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">Technical Skills</h2>
              <p className="text-xs text-muted">
                Maintain your organized technical skills and categories without arbitrary proficiency bars.
              </p>
            </div>
            <button
              onClick={() => {
                const newCat = {
                  id: `skill-${Date.now()}`,
                  name: "New Category",
                  skills: ["Tool / Skill"],
                };
                setPortfolio({
                  ...portfolio,
                  skills: [...portfolio.skills, newCat],
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Plus className="w-3 h-3" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolio.skills.map((cat, idx) => (
              <div
                key={cat.id}
                className="p-4 rounded-xl bg-[#12151B] border border-[#222732] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={cat.name}
                    onChange={(e) => {
                      const updated = [...portfolio.skills];
                      updated[idx].name = e.target.value;
                      setPortfolio({ ...portfolio, skills: updated });
                    }}
                    className="font-bold text-xs bg-transparent text-foreground border-b border-[#242A36] focus:outline-none focus:border-[#87947A] pb-0.5"
                  />
                  <button
                    onClick={() => {
                      const updated = portfolio.skills.filter((_, i) => i !== idx);
                      setPortfolio({ ...portfolio, skills: updated });
                    }}
                    className="p-1 text-muted hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <textarea
                  rows={2}
                  placeholder="Comma-separated skills (e.g. Python, Java, C++)"
                  value={cat.skills.join(", ")}
                  onChange={(e) => {
                    const updated = [...portfolio.skills];
                    updated[idx].skills = e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean);
                    setPortfolio({ ...portfolio, skills: updated });
                  }}
                  className="w-full px-2.5 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-xs text-slate-300 focus:outline-none focus:border-[#87947A]"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => handleSavePortfolio()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Skills</span>
            </button>
          </div>
        </div>
      )}

      {/* 8. CERTIFICATIONS TAB (Empty Initial State Ready for Manual Upload) */}
      {activeTab === "certificates" && (
        <div className="space-y-8">
          {renderManualAchievementCertCard("Add New Certificate")}

          <div className="portfolio-card p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#222732] pb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Saved Certificates Gallery ({portfolio.certificates.length})
                </h2>
                <p className="text-xs text-muted">
                  View, edit, toggle visibility, and attach credential documents.
                </p>
              </div>
            </div>

          {portfolio.certificates.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-[#2A3140] rounded-xl space-y-2">
              <p className="text-xs text-slate-300">
                No certificate records added yet. Click &ldquo;Add New Certificate&rdquo; above to upload your first certificate.
              </p>
              <p className="text-[11px] text-muted">
                Unpublished certificates stay strictly private.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {portfolio.certificates.map((cert, cIdx) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-xl bg-[#12151B] border border-[#222732] space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#1E232E] pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{cert.title}</h3>
                      <p className="text-xs text-[#87947A]">{cert.issuingOrganization}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cert.isPublished}
                          onChange={(e) => {
                            const updated = [...portfolio.certificates];
                            updated[cIdx].isPublished = e.target.checked;
                            setPortfolio({ ...portfolio, certificates: updated });
                          }}
                          className="rounded accent-[#87947A]"
                        />
                        <span>{cert.isPublished ? "Published" : "Hidden (Private)"}</span>
                      </label>

                      <button
                        onClick={() => {
                          if (confirm(`Delete certificate "${cert.title}"?`)) {
                            const updated = portfolio.certificates.filter((_, i) => i !== cIdx);
                            setPortfolio({ ...portfolio, certificates: updated });
                          }
                        }}
                        className="p-1 text-muted hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-muted block mb-1">Certificate Title</label>
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => {
                          const updated = [...portfolio.certificates];
                          updated[cIdx].title = e.target.value;
                          setPortfolio({ ...portfolio, certificates: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                      />
                    </div>

                    <div>
                      <label className="text-muted block mb-1">Issuing Organization</label>
                      <input
                        type="text"
                        value={cert.issuingOrganization}
                        onChange={(e) => {
                          const updated = [...portfolio.certificates];
                          updated[cIdx].issuingOrganization = e.target.value;
                          setPortfolio({ ...portfolio, certificates: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                      />
                    </div>

                    <div>
                      <label className="text-muted block mb-1">Completion Date</label>
                      <input
                        type="text"
                        value={cert.issueDate}
                        onChange={(e) => {
                          const updated = [...portfolio.certificates];
                          updated[cIdx].issueDate = e.target.value;
                          setPortfolio({ ...portfolio, certificates: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                      />
                    </div>

                    <div>
                      <label className="text-[#A4A58A] block mb-1">Credential ID (Optional)</label>
                      <input
                        type="text"
                        value={cert.credentialId || ""}
                        onChange={(e) => {
                          const updated = [...portfolio.certificates];
                          updated[cIdx].credentialId = e.target.value;
                          setPortfolio({ ...portfolio, certificates: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0F1411] border border-[#252E28] text-[#F5F1E8]"
                      />
                    </div>

                    <div>
                      <label className="text-[#A4A58A] block mb-1">Verification URL (Optional)</label>
                      <input
                        type="text"
                        value={cert.credentialUrl || ""}
                        onChange={(e) => {
                          const updated = [...portfolio.certificates];
                          updated[cIdx].credentialUrl = e.target.value;
                          setPortfolio({ ...portfolio, certificates: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0F1411] border border-[#252E28] text-[#F5F1E8]"
                      />
                    </div>

                    <div>
                      <label className="text-[#A4A58A] block mb-1">Category</label>
                      <select
                        value={cert.category || "Programming & Algorithms"}
                        onChange={(e) => {
                          const updated = [...portfolio.certificates];
                          updated[cIdx].category = e.target.value as any;
                          setPortfolio({ ...portfolio, certificates: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0F1411] border border-[#252E28] text-[#F5F1E8]"
                      >
                        <option value="Programming & Algorithms">Programming & Algorithms</option>
                        <option value="Data Analytics & Internships">Data Analytics & Internships</option>
                        <option value="AI & Professional Development">AI & Professional Development</option>
                        <option value="Academic Credentials">Academic Credentials</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[#A4A58A] block mb-1">Skills Supported (Comma-separated)</label>
                      <input
                        type="text"
                        value={cert.skillsSupported?.join(", ") || ""}
                        placeholder="e.g. C, C++, Data Structures"
                        onChange={(e) => {
                          const updated = [...portfolio.certificates];
                          updated[cIdx].skillsSupported = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          setPortfolio({ ...portfolio, certificates: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0F1411] border border-[#252E28] text-[#F5F1E8]"
                      />
                    </div>

                    <div>
                      <label className="text-[#A4A58A] block mb-1">Certificate Document</label>
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#18201B] border border-[#2C3830] hover:border-[#87947A] text-[#87947A] cursor-pointer w-full justify-center">
                        <Upload className="w-3 h-3" />
                        <span>{cert.documentUrl ? "Replace PDF / Image" : "Upload File"}</span>
                        <input
                          type="file"
                          accept="application/pdf,image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, "certificate", (url, filename) => {
                              const analysis = analyzeCertificateMetadata(filename);
                              const updated = [...portfolio.certificates];
                              updated[cIdx].documentUrl = url;
                              updated[cIdx].documentFilename = filename;
                              if (analysis.title && !updated[cIdx].title) {
                                updated[cIdx].title = analysis.title;
                              }
                              if (analysis.suggestedSkills?.length && (!updated[cIdx].skillsSupported || updated[cIdx].skillsSupported.length === 0)) {
                                updated[cIdx].skillsSupported = analysis.suggestedSkills;
                              }
                              setPortfolio({ ...portfolio, certificates: updated });
                            })
                          }
                        />
                      </label>
                    </div>

                    <div className="sm:col-span-2 flex items-center gap-4 pt-2">
                      <label className="flex items-center gap-2 text-xs font-semibold text-[#EAE3D5] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cert.allowDownload ?? true}
                          onChange={(e) => {
                            const updated = [...portfolio.certificates];
                            updated[cIdx].allowDownload = e.target.checked;
                            setPortfolio({ ...portfolio, certificates: updated });
                          }}
                          className="rounded w-4 h-4 accent-[#87947A]"
                        />
                        <span>Allow public download of this certificate</span>
                      </label>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="text-[#A4A58A] block mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={cert.description}
                        onChange={(e) => {
                          const updated = [...portfolio.certificates];
                          updated[cIdx].description = e.target.value;
                          setPortfolio({ ...portfolio, certificates: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0F1411] border border-[#252E28] text-[#F5F1E8]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => handleSavePortfolio()}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A] transition-all shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Certifications</span>
            </button>
          </div>
        </div>
      </div>
      )}

      {/* 9. CURRENT LEARNING TAB (Empty Initial State Ready for Manual Entry) */}
      {activeTab === "learning" && (
        <div className="portfolio-card p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#222732] pb-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Current Learning Journey Manager
              </h2>
              <p className="text-xs text-muted">
                Add learning topics manually, track your progress percentage, add YouTube & doc resources, and set statuses.
              </p>
            </div>

            <button
              onClick={() => {
                const newItem = {
                  id: `learn-${Date.now()}`,
                  topic: "New Learning Subject",
                  description: "Description of concepts, algorithms or frameworks...",
                  category: "Core Computer Science",
                  startDate: new Date().toISOString().split("T")[0],
                  progressPercentage: 10,
                  status: "Learning" as const,
                  isPublished: false,
                };
                setPortfolio({
                  ...portfolio,
                  currentLearning: [newItem, ...portfolio.currentLearning],
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Plus className="w-3 h-3" />
              <span>Add Learning Topic</span>
            </button>
          </div>

          {portfolio.currentLearning.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-[#2A3140] rounded-xl space-y-2">
              <p className="text-xs text-slate-300">
                Current Learning section is currently empty as per initial specifications. Click &ldquo;Add Learning Topic&rdquo; above to record your current studies.
              </p>
              <p className="text-[11px] text-muted">
                Only explicitly published topics appear on the public website.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {portfolio.currentLearning.map((item, lIdx) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl bg-[#12151B] border border-[#222732] space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#1E232E] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-foreground">{item.topic}</span>
                      <span className="text-xs font-mono text-[#87947A] font-semibold">
                        {item.progressPercentage}%
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.isPublished}
                          onChange={(e) => {
                            const updated = [...portfolio.currentLearning];
                            updated[lIdx].isPublished = e.target.checked;
                            setPortfolio({ ...portfolio, currentLearning: updated });
                          }}
                          className="rounded accent-[#87947A]"
                        />
                        <span>{item.isPublished ? "Published" : "Hidden"}</span>
                      </label>

                      <button
                        onClick={() => {
                          const updated = portfolio.currentLearning.filter((_, i) => i !== lIdx);
                          setPortfolio({ ...portfolio, currentLearning: updated });
                        }}
                        className="p-1 text-muted hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-muted block mb-1">Topic Title</label>
                      <input
                        type="text"
                        value={item.topic}
                        onChange={(e) => {
                          const updated = [...portfolio.currentLearning];
                          updated[lIdx].topic = e.target.value;
                          setPortfolio({ ...portfolio, currentLearning: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                      />
                    </div>

                    <div>
                      <label className="text-muted block mb-1">Category</label>
                      <input
                        type="text"
                        value={item.category}
                        onChange={(e) => {
                          const updated = [...portfolio.currentLearning];
                          updated[lIdx].category = e.target.value;
                          setPortfolio({ ...portfolio, currentLearning: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                      />
                    </div>

                    <div>
                      <label className="text-muted block mb-1">Status</label>
                      <select
                        value={item.status}
                        onChange={(e) => {
                          const updated = [...portfolio.currentLearning];
                          updated[lIdx].status = e.target.value as any;
                          setPortfolio({ ...portfolio, currentLearning: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                      >
                        <option value="Planning">Planning</option>
                        <option value="Learning">Learning</option>
                        <option value="Practicing">Practicing</option>
                        <option value="Completed">Completed</option>
                        <option value="Paused">Paused</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-muted block mb-1">
                        Progress Percentage (0–100%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.progressPercentage}
                        onChange={(e) => {
                          const updated = [...portfolio.currentLearning];
                          updated[lIdx].progressPercentage = Number(e.target.value);
                          setPortfolio({ ...portfolio, currentLearning: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-[#87947A] font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-muted block mb-1">Documentation Link</label>
                      <input
                        type="text"
                        value={item.docsUrl || ""}
                        placeholder="https://..."
                        onChange={(e) => {
                          const updated = [...portfolio.currentLearning];
                          updated[lIdx].docsUrl = e.target.value;
                          setPortfolio({ ...portfolio, currentLearning: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                      />
                    </div>

                    <div>
                      <label className="text-muted block mb-1">YouTube / Tutorial Link</label>
                      <input
                        type="text"
                        value={item.youtubeUrl || ""}
                        placeholder="https://youtube.com/..."
                        onChange={(e) => {
                          const updated = [...portfolio.currentLearning];
                          updated[lIdx].youtubeUrl = e.target.value;
                          setPortfolio({ ...portfolio, currentLearning: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="text-muted block mb-1">Description & Notes</label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...portfolio.currentLearning];
                          updated[lIdx].description = e.target.value;
                          setPortfolio({ ...portfolio, currentLearning: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => handleSavePortfolio()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Current Learning</span>
            </button>
          </div>
        </div>
      )}

      {/* 10. ACHIEVEMENTS TAB */}
      {activeTab === "achievements" && (
        <div className="space-y-8">
          {renderManualAchievementCertCard("Add New Achievement")}

          <div className="portfolio-card p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#222732] pb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Saved Achievements ({portfolio.achievements.length})
                </h2>
                <p className="text-xs text-muted">
                  View, edit, and manage your competitive milestones and honors.
                </p>
              </div>
            </div>

          {portfolio.achievements.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-[#2A3140] rounded-xl space-y-2">
              <p className="text-xs text-slate-300">
                Achievements section is currently empty. Click &ldquo;Add Achievement&rdquo; above to record milestones.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {portfolio.achievements.map((ach, aIdx) => (
                <div
                  key={ach.id}
                  className="p-5 rounded-xl bg-[#12151B] border border-[#222732] space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#1E232E] pb-3">
                    <h3 className="text-sm font-bold text-foreground">{ach.title}</h3>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ach.isPublished}
                          onChange={(e) => {
                            const updated = [...portfolio.achievements];
                            updated[aIdx].isPublished = e.target.checked;
                            setPortfolio({ ...portfolio, achievements: updated });
                          }}
                          className="rounded accent-[#87947A]"
                        />
                        <span>{ach.isPublished ? "Published" : "Hidden"}</span>
                      </label>

                      <button
                        onClick={() => {
                          const updated = portfolio.achievements.filter((_, i) => i !== aIdx);
                          setPortfolio({ ...portfolio, achievements: updated });
                        }}
                        className="p-1 text-muted hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-muted block mb-1">Title</label>
                      <input
                        type="text"
                        value={ach.title}
                        onChange={(e) => {
                          const updated = [...portfolio.achievements];
                          updated[aIdx].title = e.target.value;
                          setPortfolio({ ...portfolio, achievements: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                      />
                    </div>

                    <div>
                      <label className="text-muted block mb-1">Issuing Body</label>
                      <input
                        type="text"
                        value={ach.issuingOrganization}
                        onChange={(e) => {
                          const updated = [...portfolio.achievements];
                          updated[aIdx].issuingOrganization = e.target.value;
                          setPortfolio({ ...portfolio, achievements: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                      />
                    </div>

                    <div>
                      <label className="text-muted block mb-1">Date</label>
                      <input
                        type="text"
                        value={ach.date}
                        onChange={(e) => {
                          const updated = [...portfolio.achievements];
                          updated[aIdx].date = e.target.value;
                          setPortfolio({ ...portfolio, achievements: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="text-muted block mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={ach.description}
                        onChange={(e) => {
                          const updated = [...portfolio.achievements];
                          updated[aIdx].description = e.target.value;
                          setPortfolio({ ...portfolio, achievements: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-[#0E1014] border border-[#1E232E] text-foreground"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => handleSavePortfolio()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Achievements</span>
            </button>
          </div>
        </div>
      </div>
      )}

      {/* 11. RESUME MANAGER TAB */}
      {activeTab === "resume" && (
        <div className="portfolio-card p-6 md:p-8 space-y-6">
          <div className="border-b border-[#222732] pb-4">
            <h2 className="text-lg font-bold text-foreground">Resume PDF Manager</h2>
            <p className="text-xs text-muted">
              Upload your official resume PDF, preview it, toggle public downloads, or replace it with an updated revision.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#12151B] border border-[#222732] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#1D2721]/70 border border-[#87947A]/30 text-[#87947A]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Current Resume Document
                  </h3>
                  <p className="text-xs text-muted">
                    {portfolio.profile.resumeUrl
                      ? `File: ${portfolio.profile.resumeFilename || "Harsh_Jha_Resume.pdf"}`
                      : "No resume PDF uploaded yet."}
                  </p>
                </div>
              </div>

              {/* Upload Button */}
              <div>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A] cursor-pointer transition-all">
                  <Upload className="w-4 h-4" />
                  <span>
                    {uploadingCategory === "resume" ? "Uploading..." : "Upload New Resume PDF"}
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(e, "resume", (url, filename) => {
                        setPortfolio({
                          ...portfolio,
                          profile: {
                            ...portfolio.profile,
                            resumeUrl: url,
                            resumeFilename: filename,
                            resumePublished: true, // Auto-publish on first upload or keep owner's control
                          },
                        });
                      })
                    }
                  />
                </label>
              </div>
            </div>

            {/* Visibility Toggle */}
            <div className="pt-4 border-t border-[#1E232E] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-foreground block">
                  Public Download Button Visibility
                </span>
                <span className="text-[11px] text-muted">
                  When enabled, visitors will see the &ldquo;Download Resume&rdquo; button in the header and home hero.
                </span>
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-[#87947A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={portfolio.profile.resumePublished}
                  onChange={(e) =>
                    setPortfolio({
                      ...portfolio,
                      profile: {
                        ...portfolio.profile,
                        resumePublished: e.target.checked,
                      },
                    })
                  }
                  className="rounded w-4 h-4 accent-[#87947A]"
                />
                <span>
                  {portfolio.profile.resumePublished ? "Visible to Visitors" : "Hidden"}
                </span>
              </label>
            </div>

            {/* Resume Preview */}
            {portfolio.profile.resumeUrl && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider block">
                  Live PDF Preview
                </span>
                <div className="w-full h-96 rounded-xl overflow-hidden border border-[#222732] bg-[#0E1014]">
                  <iframe
                    src={portfolio.profile.resumeUrl}
                    className="w-full h-full border-0"
                    title="Resume Preview"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => handleSavePortfolio()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Resume Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* 12. APPEARANCE & THEME CUSTOMIZER TAB */}
      {activeTab === "appearance" && (
        <div className="portfolio-card p-6 md:p-8 space-y-6">
          <div className="border-b border-[#222732] pb-4">
            <h2 className="text-lg font-bold text-foreground">
              Design & Appearance Customizer
            </h2>
            <p className="text-xs text-muted">
              Customize website accent color, typography, border radius, and section visibility with live preview.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Accent Picker */}
            <div className="p-4 rounded-xl bg-[#141A16] border border-[#252E28] space-y-3">
              <label className="text-xs font-semibold text-[#EAE3D5] block">
                Accent Color (Natural & Earthy Direction)
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { label: "Sage Green", hex: "#87947A" },
                  { label: "Subtle Bronze", hex: "#B18A5A" },
                  { label: "Deep Forest", hex: "#263B32" },
                  { label: "Muted Olive", hex: "#A4A58A" },
                  { label: "Earthy Terracotta", hex: "#C27D56" },
                  { label: "Warm Charcoal", hex: "#292D29" },
                ].map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => {
                      const updatedTheme = { ...portfolio.theme, accentColor: color.hex };
                      setPortfolio({ ...portfolio, theme: updatedTheme });
                      updateThemeSettings(updatedTheme);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      portfolio.theme.accentColor === color.hex
                        ? "border-[#87947A] text-[#F5F1E8] bg-[#263B32]/40 shadow-sm"
                        : "border-[#252E28] text-[#A4A58A] hover:text-[#EAE3D5]"
                    }`}
                  >
                    <span
                      style={{ backgroundColor: color.hex }}
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                    ></span>
                    <span>{color.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="p-4 rounded-xl bg-[#141A16] border border-[#252E28] space-y-3">
              <label className="text-xs font-semibold text-[#EAE3D5] block">
                Primary Font Family
              </label>
              <select
                value={portfolio.theme.fontBody}
                onChange={(e) => {
                  const updatedTheme = {
                    ...portfolio.theme,
                    fontBody: e.target.value,
                    fontHeading: e.target.value,
                  };
                  setPortfolio({ ...portfolio, theme: updatedTheme });
                  updateThemeSettings(updatedTheme);
                }}
                className="w-full px-3 py-2 rounded bg-[#0F1411] border border-[#252E28] text-xs text-[#F5F1E8]"
              >
                <option value="Inter">Inter (Clean, Modern Engineering Standard)</option>
                <option value="Geist">Geist (Minimalist Technical Typography)</option>
                <option value="Manrope">Manrope (Geometric Modern Display)</option>
              </select>
            </div>

            {/* Border Radius */}
            <div className="p-4 rounded-xl bg-[#141A16] border border-[#252E28] space-y-3">
              <label className="text-xs font-semibold text-[#EAE3D5] block">
                Card Border Radius
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Subtle (8px)", value: "0.5rem" },
                  { label: "Medium (12px)", value: "0.75rem" },
                  { label: "Rounded (16px)", value: "1rem" },
                  { label: "Smooth (20px)", value: "1.25rem" },
                ].map((rad) => (
                  <button
                    key={rad.value}
                    type="button"
                    onClick={() => {
                      const updatedTheme = { ...portfolio.theme, borderRadius: rad.value };
                      setPortfolio({ ...portfolio, theme: updatedTheme });
                      updateThemeSettings(updatedTheme);
                    }}
                    className={`py-2 text-[11px] font-medium rounded-lg border text-center transition-all ${
                      portfolio.theme.borderRadius === rad.value
                        ? "border-[#87947A] bg-[#263B32]/50 text-[#EAE3D5]"
                        : "border-[#252E28] text-[#A4A58A] hover:text-[#EAE3D5]"
                    }`}
                  >
                    {rad.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Default Theme Mode */}
            <div className="p-4 rounded-xl bg-[#141A16] border border-[#252E28] space-y-3">
              <label className="text-xs font-semibold text-[#EAE3D5] block">
                Default Nature Palette
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const updatedTheme = { ...portfolio.theme, mode: "dark" as const };
                    setPortfolio({ ...portfolio, theme: updatedTheme });
                    updateThemeSettings(updatedTheme);
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                    portfolio.theme.mode === "dark"
                      ? "border-[#87947A] bg-[#263B32] text-[#F5F1E8]"
                      : "border-[#252E28] text-[#A4A58A] hover:text-[#EAE3D5]"
                  }`}
                >
                  Dark Palette (Deep Forest #151916)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const updatedTheme = { ...portfolio.theme, mode: "light" as const };
                    setPortfolio({ ...portfolio, theme: updatedTheme });
                    updateThemeSettings(updatedTheme);
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                    portfolio.theme.mode === "light"
                      ? "border-[#87947A] bg-[#263B32] text-[#F5F1E8]"
                      : "border-[#252E28] text-[#A4A58A] hover:text-[#EAE3D5]"
                  }`}
                >
                  Light Palette (Warm Ivory #F5F1E8)
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => handleSavePortfolio()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Apply Appearance</span>
            </button>
          </div>
        </div>
      )}

      {/* 13. MESSAGES INBOX TAB */}
      {activeTab === "messages" && (
        <div className="portfolio-card p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#222732] pb-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Private Visitor Messages ({messages.length})
              </h2>
              <p className="text-xs text-muted">
                Messages submitted through the public contact form are delivered privately here.
              </p>
            </div>
            <button
              onClick={fetchMessages}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[#141820] border border-[#242933] text-muted hover:text-foreground"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Inbox</span>
            </button>
          </div>

          {messages.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-[#2A3140] rounded-xl space-y-2">
              <Inbox className="w-8 h-8 text-muted mx-auto opacity-40" />
              <p className="text-xs text-muted">
                No visitor inquiries received yet. When visitors fill the Contact form, their submissions will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-xl border transition-all space-y-3 ${
                    msg.isRead
                      ? "bg-[#12151B] border-[#222732]"
                      : "bg-[#141A24] border-[#87947A]/30 shadow-sm"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E232E] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        )}
                        <span className="font-bold text-sm text-foreground">
                          {msg.name}
                        </span>
                        <span className="text-xs text-[#87947A]/90 font-mono">
                          &lt;{msg.email}&gt;
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-300 mt-0.5">
                        Subject: {msg.subject}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-muted font-mono">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>

                      <button
                        onClick={async () => {
                          await fetch("/api/owner/messages", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: msg.id, isRead: !msg.isRead }),
                          });
                          fetchMessages();
                        }}
                        className="text-xs text-muted hover:text-[#87947A] underline"
                      >
                        {msg.isRead ? "Mark Unread" : "Mark Read"}
                      </button>

                      <button
                        onClick={async () => {
                          if (confirm("Delete this message?")) {
                            await fetch(`/api/owner/messages?id=${msg.id}`, {
                              method: "DELETE",
                            });
                            fetchMessages();
                          }
                        }}
                        className="p-1 text-muted hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 14. PASSWORD SECURITY TAB */}
      {activeTab === "security" && (
        <div className="portfolio-card p-6 md:p-8 space-y-6 max-w-xl">
          <div className="border-b border-[#222732] pb-4">
            <h2 className="text-lg font-bold text-foreground">
              Owner Password Security
            </h2>
            <p className="text-xs text-muted">
              Update the single private master password used to authenticate into this portfolio editor.
            </p>
          </div>

          {pwMsg && (
            <div className="p-3 rounded-lg bg-[#1D2721]/70 border border-[#87947A]/30 text-xs text-[#A4A58A]">
              {pwMsg}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                placeholder="Enter current password..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                New Password (Minimum 6 characters)
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="Enter strong new password..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#12151B] border border-[#222732] text-xs text-foreground focus:outline-none focus:border-[#87947A]"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-[#141A16] bg-[#87947A] hover:bg-[#97A48A]"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Update Owner Password</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
