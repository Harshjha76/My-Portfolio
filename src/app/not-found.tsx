import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="portfolio-card p-10 text-center max-w-md space-y-4">
        <span className="text-4xl font-mono font-bold text-cyan-400">404</span>
        <h1 className="text-xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-xs text-muted leading-relaxed">
          The requested page could not be found. Please check the URL or return to the main portfolio.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-cyan-950 bg-cyan-400 hover:bg-cyan-300 transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Portfolio Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
