"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Sparkles, Shield, Cpu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Live Engine", href: "/dashboard" },
    { name: "ATS Studio", href: "/dashboard/resume-tailor" },
    { name: "Outreach", href: "/dashboard/cover-letters" },
    { name: "LinkedIn SEO", href: "/dashboard/linkedin-optimizer" },
    { name: "Negotiator", href: "/dashboard/offer-negotiator" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 px-4 sm:px-6"
          : "py-5 px-6"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto transition-all duration-300 rounded-full px-5 sm:px-6 h-13 flex items-center justify-between ${
          scrolled
            ? "glass-surface-elevated border border-border-light shadow-2xl py-2"
            : "bg-surface-50/40 backdrop-blur-md border border-border-subtle py-2.5"
        }`}
      >
        {/* Brand Logo & Telemetry Indicator */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform">
            <Cpu className="h-4 w-4" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-sm tracking-tight text-foreground">
              ReverseRecruit<span className="text-cyan-400">.ai</span>
            </span>
            <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-widest text-emerald-400 px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20">
              v2.4
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-medium tracking-wide transition-colors ${
                  isActive
                    ? "text-cyan-300 font-semibold"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions & Launch Trigger */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/admin"
            className="text-xs font-mono text-muted hover:text-foreground transition-colors"
          >
            Cockpit
          </Link>
          <Link
            href="/onboarding"
            className="btn-primary-glow text-xs py-2 px-4 shadow-sm"
          >
            <span>Start My Engine</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-1"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-3 max-w-6xl mx-auto glass-surface-elevated rounded-2xl p-6 border border-border-light space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground py-1 border-b border-border-subtle"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-mono text-muted py-1 border-b border-border-subtle"
            >
              Agency Admin Cockpit
            </Link>
          </div>
          <Link
            href="/onboarding"
            onClick={() => setMobileOpen(false)}
            className="btn-primary-glow w-full text-center text-xs py-3 justify-center"
          >
            <span>Launch Career Engine ($20 / $99)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </header>
  );
}
