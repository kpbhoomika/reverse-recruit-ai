"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Sparkles, Cpu } from "lucide-react";

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
        scrolled ? "py-3 px-4 sm:px-6" : "py-5 px-6"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto transition-all duration-300 rounded-full px-6 h-13 flex items-center justify-between ${
          scrolled
            ? "bg-[#16070B]/95 backdrop-blur-md border border-white/10 shadow-2xl py-2 text-[#FAF7F2]"
            : "bg-[#16070B] text-[#FAF7F2] py-2.5 shadow-lg border border-white/5"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-7 w-7 rounded-lg bg-[#D91C44] flex items-center justify-center text-white font-bold text-xs shadow-sm">
            RR
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-sm tracking-tight text-white">
              ReverseRecruit<span className="text-[#D91C44]">.ai</span>
            </span>
            <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-widest text-[#FAF7F2]/70 px-1.5 py-0.2 rounded bg-white/5">
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
                    ? "text-white font-bold"
                    : "text-[#FAF7F2]/70 hover:text-white"
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
            className="text-xs font-mono text-[#FAF7F2]/70 hover:text-white transition-colors"
          >
            Cockpit
          </Link>
          <Link
            href="/onboarding"
            className="btn-crimson text-xs py-2 px-4 shadow-sm"
          >
            <span>Start Free</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-1"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-white" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-3 max-w-6xl mx-auto bg-[#16070B] text-white rounded-2xl p-6 border border-white/10 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-[#FAF7F2] py-1 border-b border-white/10"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-mono text-[#FAF7F2]/70 py-1 border-b border-white/10"
            >
              Agency Admin Cockpit
            </Link>
          </div>
          <Link
            href="/onboarding"
            onClick={() => setMobileOpen(false)}
            className="btn-crimson w-full text-center text-xs py-3 justify-center"
          >
            <span>Launch Career Engine ($20 / $99)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </header>
  );
}
