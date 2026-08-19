"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Briefcase, 
  FileText, 
  Send, 
  Linkedin, 
  DollarSign, 
  ShieldCheck, 
  UserCheck, 
  Sun, 
  Moon,
  Menu,
  X,
  ChevronRight
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Default to dark theme for modern developer aesthetic
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: "Live Pipeline", href: "/dashboard", icon: Briefcase },
    { name: "ATS Resume Tailor", href: "/dashboard/resume-tailor", icon: FileText },
    { name: "Cover Letter & Pitch", href: "/dashboard/cover-letters", icon: Send },
    { name: "LinkedIn SEO", href: "/dashboard/linkedin-optimizer", icon: Linkedin },
    { name: "Offer Negotiator", href: "/dashboard/offer-negotiator", icon: DollarSign },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-blue-900 to-indigo-900 dark:from-white dark:via-zinc-200 dark:to-zinc-400">
              ReverseRecruit<span className="text-blue-500">.ai</span>
            </span>
            <div className="flex items-center gap-1 -mt-1">
              <span className="text-[10px] font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">
                5 Interviews Guaranteed
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-900/80 p-1 rounded-full border border-border/50">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  isActive
                    ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Agency Admin Switcher */}
          <Link
            href="/admin"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              pathname === "/admin"
                ? "bg-purple-600/10 border-purple-500/40 text-purple-400"
                : "border-border/60 text-zinc-600 dark:text-zinc-400 hover:border-purple-500/30 hover:text-purple-400"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
            Agency Cockpit
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Start Onboarding CTA */}
          <Link
            href="/onboarding"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg hover:opacity-95 shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
          >
            <UserCheck className="h-3.5 w-3.5" />
            Start for $20
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-800"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-800"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 pt-2 pb-6 space-y-3">
          <div className="grid gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-zinc-300 hover:bg-zinc-800"
                >
                  <Icon className="h-4 w-4 text-blue-400" />
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-purple-400 hover:bg-purple-950/20"
            >
              <ShieldCheck className="h-4 w-4" />
              Agency Cockpit (Admin)
            </Link>
          </div>
          <Link
            href="/onboarding"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md"
          >
            Get Started ($20 Student / $99 Pro)
          </Link>
        </div>
      )}
    </header>
  );
}
