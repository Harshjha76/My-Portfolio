import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-main)",
        foreground: "var(--text-main)",
        muted: {
          DEFAULT: "var(--text-muted)",
          foreground: "var(--text-muted)",
        },
        surface: {
          DEFAULT: "var(--bg-card)",
          hover: "var(--bg-card-hover)",
          border: "var(--border-color)",
          secondary: "var(--bg-secondary)",
        },
        accent: {
          DEFAULT: "var(--accent-color)",
          hover: "var(--accent-hover)",
          glow: "var(--accent-glow)",
          muted: "var(--accent-muted)",
          green: "#87947A",
          highlight: "#B18A5A",
        },
        forest: {
          DEFAULT: "#263B32",
          hover: "#1D2F28",
          dark: "#18221D",
        },
        ivory: {
          DEFAULT: "#F5F1E8",
          secondary: "#E6E0D2",
        },
        sage: {
          DEFAULT: "#87947A",
          hover: "#97A48A",
          muted: "rgba(135, 148, 122, 0.15)",
        },
        bronze: {
          DEFAULT: "#B18A5A",
          hover: "#C29B6B",
        },
        secondaryText: "#73786F",
        earth: {
          ivory: "#F5F1E8",
          cream: "#E6E0D2",
          sage: "#87947A",
          forest: "#263B32",
          olive: "#73786F",
          charcoal: "#292D29",
          bronze: "#B18A5A",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["var(--font-heading)", "Inter", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        custom: "var(--border-radius)",
      },
      boxShadow: {
        natural: "0 8px 24px -4px rgba(26, 33, 29, 0.35)",
        "natural-lg": "0 16px 36px -6px rgba(26, 33, 29, 0.4)",
        "natural-hover": "0 20px 40px -8px rgba(38, 59, 50, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
