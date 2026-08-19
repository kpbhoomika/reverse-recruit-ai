"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Layers, 
  FileText, 
  Send, 
  Linkedin, 
  DollarSign, 
  ShieldCheck, 
  Briefcase
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Live Pipeline", href: "/dashboard", icon: Layers },
    { name: "ATS Resume Tailor", href: "/dashboard/resume-tailor", icon: FileText },
    { name: "Cover Letter & Pitch", href: "/dashboard/cover-letters", icon: Send },
    { name: "LinkedIn SEO", href: "/dashboard/linkedin-optimizer", icon: Linkedin },
    { name: "Offer Negotiator", href: "/dashboard/offer-negotiator", icon: DollarSign },
    { name: "Agency Cockpit", href: "/admin", icon: ShieldCheck },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6">
      <div
        className={`max-w-7xl mx-auto rounded-2xl px-5 sm:px-6 h-14 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-md border border-slate-800/80 shadow-2xl"
            : "bg-slate-900/80 backdrop-blur-md border border-slate-800/60"
        }`}
      >
        {/* Brand Logo & Guarantee Sub-badge */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
            <Briefcase className="h-4 w-4" />
          </div>
          <div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-white block leading-tight">
              ReverseRecruit<span className="text-blue-400">.ai</span>
            </span>
            <span className="hidden sm:block text-[9px] font-mono font-semibold uppercase tracking-wider text-emerald-400 leading-none">
              5 Interviews Guaranteed
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-medium tracking-wide flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? "text-blue-400 font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Launch Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/onboarding"
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl hover:opacity-95 shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            <span>Try 3 Free Apps</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-slate-300 hover:text-white p-1"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-2.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-slate-200 hover:text-white py-1 flex items-center gap-2"
                >
                  <Icon className="h-4 w-4 text-blue-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
          <Link
            href="/onboarding"
            onClick={() => setMobileOpen(false)}
            className="btn-brand-gradient w-full text-center text-xs py-3 flex items-center justify-center gap-2"
          >
            <span>Start Job Autopilot ($20 / $99)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
