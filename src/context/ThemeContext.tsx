"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeSettings, ThemeMode } from "@/types/portfolio";

interface ThemeContextType {
  mode: ThemeMode;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
  borderRadius: string;
  toggleTheme: () => void;
  updateThemeSettings: (settings: Partial<ThemeSettings>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme?: Partial<ThemeSettings>;
}) {
  const [mode, setMode] = useState<ThemeMode>(initialTheme?.mode || "light");
  const [accentColor, setAccentColor] = useState<string>(initialTheme?.accentColor || "#263B32");
  const [fontHeading, setFontHeading] = useState<string>(initialTheme?.fontHeading || "Inter");
  const [fontBody, setFontBody] = useState<string>(initialTheme?.fontBody || "Inter");
  const [borderRadius, setBorderRadius] = useState<string>(initialTheme?.borderRadius || "0.85rem");

  // Load from localStorage or system preference on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("portfolio_theme_mode") as ThemeMode | null;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  // Apply CSS custom properties whenever settings change
  useEffect(() => {
    const root = document.documentElement;

    if (mode === "light") {
      root.classList.add("light");
      root.setAttribute("data-theme", "light");
    } else {
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");
    }

    root.style.setProperty("--accent-color", accentColor);
    root.style.setProperty("--accent-glow", `${accentColor}40`);
    root.style.setProperty("--accent-muted", `${accentColor}1A`);
    root.style.setProperty("--border-radius", borderRadius);

    if (fontBody) {
      root.style.setProperty("--font-sans", `'${fontBody}', sans-serif`);
    }
    if (fontHeading) {
      root.style.setProperty("--font-heading", `'${fontHeading}', sans-serif`);
    }
  }, [mode, accentColor, fontHeading, fontBody, borderRadius]);

  const toggleTheme = () => {
    const nextMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
    localStorage.setItem("portfolio_theme_mode", nextMode);
  };

  const updateThemeSettings = (settings: Partial<ThemeSettings>) => {
    if (settings.mode) {
      setMode(settings.mode);
      localStorage.setItem("portfolio_theme_mode", settings.mode);
    }
    if (settings.accentColor) setAccentColor(settings.accentColor);
    if (settings.fontHeading) setFontHeading(settings.fontHeading);
    if (settings.fontBody) setFontBody(settings.fontBody);
    if (settings.borderRadius) setBorderRadius(settings.borderRadius);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        accentColor,
        fontHeading,
        fontBody,
        borderRadius,
        toggleTheme,
        updateThemeSettings,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
