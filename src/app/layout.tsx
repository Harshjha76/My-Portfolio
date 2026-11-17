import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublicPortfolioData } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Harsh Jha | B.Tech AI & ML Student & Software Developer",
  description:
    "Official personal portfolio of Harsh Jha, second-year B.Tech Artificial Intelligence and Machine Learning student at SJCEM, Palghar. Python, Java, Data Analytics, and AI Agents.",
  keywords: [
    "Harsh Jha",
    "Harsh Jha Portfolio",
    "B.Tech AI ML",
    "SJCEM Palghar",
    "Python Developer",
    "Java Developer",
    "Data Analytics",
    "AI Agents",
  ],
  authors: [{ name: "Harsh Jha" }],
  openGraph: {
    title: "Harsh Jha — Personal Portfolio Website",
    description:
      "B.Tech AI & ML Student | Python & Java | Data Analytics | AI Agents",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = getPublicPortfolioData();

  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#101114] text-[#F3F4F6] min-h-screen flex flex-col font-sans">
        <ThemeProvider initialTheme={data.theme}>
          <Navbar
            displayName={data.profile.displayName}
            resumeUrl={data.profile.resumeUrl}
            resumePublished={data.profile.resumePublished}
          />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
