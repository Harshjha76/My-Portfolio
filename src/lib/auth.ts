import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getOwnerAuth, saveOwnerAuth } from "./storage";

const JWT_SECRET = process.env.OWNER_JWT_SECRET || "harsh-jha-private-owner-jwt-key-2026-secure";
const COOKIE_NAME = "harsh_owner_token";
const DEFAULT_INITIAL_PASSWORD = "harshjha2026";

export function initializeOwnerPasswordIfNeeded(): void {
  const current = getOwnerAuth();
  if (!current) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(DEFAULT_INITIAL_PASSWORD, salt);
    saveOwnerAuth({
      passwordHash: hash,
      lastUpdated: new Date().toISOString(),
    });
  }
}

export async function verifyOwnerPassword(password: string): Promise<boolean> {
  initializeOwnerPasswordIfNeeded();
  const current = getOwnerAuth();
  if (!current) return false;
  return bcrypt.compare(password, current.passwordHash);
}

export async function setOwnerPassword(newPassword: string): Promise<boolean> {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);
  return saveOwnerAuth({
    passwordHash: hash,
    lastUpdated: new Date().toISOString(),
  });
}

export function createOwnerToken(): string {
  return jwt.sign({ role: "portfolio_owner", email: "harshjha101ab@gmail.com" }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyOwnerToken(token: string): boolean {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role: string };
    return payload && payload.role === "portfolio_owner";
  } catch {
    return false;
  }
}

export async function isOwnerAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = cookies();
    // handles synchronous or promise if Next version changes
    const resolvedStore = "then" in cookieStore ? await cookieStore : cookieStore;
    const token = resolvedStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifyOwnerToken(token);
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
