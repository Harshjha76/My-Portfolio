import fs from "fs";
import path from "path";
import { PortfolioData, ContactMessage } from "@/types/portfolio";
import { initialPortfolioData } from "./initialData";

const DATA_DIR = path.join(process.cwd(), "data");
const PORTFOLIO_FILE = path.join(DATA_DIR, "portfolio-db.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const AUTH_FILE = path.join(DATA_DIR, "owner-auth.json");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getPortfolioData(): PortfolioData {
  ensureDirectoryExists();
  if (!fs.existsSync(PORTFOLIO_FILE)) {
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(initialPortfolioData, null, 2), "utf-8");
    return initialPortfolioData;
  }

  try {
    const raw = fs.readFileSync(PORTFOLIO_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return { ...initialPortfolioData, ...parsed };
  } catch (err) {
    console.error("Error reading portfolio-db.json, falling back to initial data:", err);
    return initialPortfolioData;
  }
}

export function savePortfolioData(data: PortfolioData): boolean {
  ensureDirectoryExists();
  try {
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving portfolio-db.json:", err);
    return false;
  }
}

export function getPublicPortfolioData(): PortfolioData {
  const data = getPortfolioData();
  // Filter out any unpublished records for public visitors
  return {
    ...data,
    education: data.education.filter((item) => item.isPublished),
    academicPerformance: data.academicPerformance
      .filter((sem) => sem.isPublished)
      .map((sem) => ({
        ...sem,
        // keep marksheet link only if exists
        marksheetUrl: sem.marksheetUrl || undefined,
      })),
    projects: data.projects.filter((proj) => proj.isPublished),
    experience: data.experience.filter((exp) => exp.isPublished),
    certificates: data.certificates.filter((cert) => cert.isPublished),
    currentLearning: data.currentLearning.filter((item) => item.isPublished),
    achievements: data.achievements.filter((ach) => ach.isPublished),
    profile: {
      ...data.profile,
      // If resume is not published, clear the URL for public visitors
      resumeUrl: data.profile.resumePublished ? data.profile.resumeUrl : "",
    },
  };
}

export function getContactMessages(): ContactMessage[] {
  ensureDirectoryExists();
  if (!fs.existsSync(MESSAGES_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(MESSAGES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading messages.json:", err);
    return [];
  }
}

export function saveContactMessage(message: Omit<ContactMessage, "id" | "createdAt" | "isRead">): ContactMessage {
  ensureDirectoryExists();
  const messages = getContactMessages();
  const newMessage: ContactMessage = {
    ...message,
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    isRead: false,
  };
  messages.unshift(newMessage);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
  return newMessage;
}

export function markMessageRead(id: string, isRead = true): boolean {
  ensureDirectoryExists();
  const messages = getContactMessages();
  const target = messages.find((m) => m.id === id);
  if (target) {
    target.isRead = isRead;
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
    return true;
  }
  return false;
}

export function deleteContactMessage(id: string): boolean {
  ensureDirectoryExists();
  const messages = getContactMessages();
  const filtered = messages.filter((m) => m.id !== id);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

export interface OwnerAuthRecord {
  passwordHash: string;
  lastUpdated: string;
}

export function getOwnerAuth(): OwnerAuthRecord | null {
  ensureDirectoryExists();
  if (!fs.existsSync(AUTH_FILE)) {
    return null;
  }
  try {
    const raw = fs.readFileSync(AUTH_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading owner-auth.json:", err);
    return null;
  }
}

export function saveOwnerAuth(authRecord: OwnerAuthRecord): boolean {
  ensureDirectoryExists();
  try {
    fs.writeFileSync(AUTH_FILE, JSON.stringify(authRecord, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving owner-auth.json:", err);
    return false;
  }
}
