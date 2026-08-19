"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Overview", href: "/dashboard" },
    { name: "ATS Tailor", href: "/dashboard/resume-tailor" },
    { name: "Outreach", href: "/dashboard/cover-letters" },
    { name: "LinkedIn SEO", href: "/dashboard/linkedin-optimizer" },
    { name: "Negotiator", href: "/dashboard/offer-negotiator" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#FFFFFF]/85 backdrop-blur-md border-b border-[#D2D2D7]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          : "bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      <div className="max-w-[1080px] mx-auto px-6 h-12 flex items-center justify-between">
        
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-[#1D1D1F] hover:opacity-75 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded-md px-1"
        >
          <span>ReverseRecruit</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[12px] tracking-normal transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded-md ${
                  isActive
                    ? "text-[#1D1D1F] font-medium"
                    : "text-[#6E6E73] hover:text-[#1D1D1F]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/admin"
            className="text-[12px] text-[#6E6E73] hover:text-[#1D1D1F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded-md px-1"
          >
            Cockpit
          </Link>
          <Link
            href="/onboarding"
            className="apple-btn-interactive text-[12px] text-white bg-[#0071E3] hover:bg-[#0077ED] px-3.5 py-1 rounded-full font-normal shadow-sm"
          >
            Apply for $20
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#1D1D1F] p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded-md"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FFFFFF]/95 backdrop-blur-xl border-b border-[#D2D2D7] px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[17px] text-[#1D1D1F] py-1 border-b border-[#F5F5F7]"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="text-[17px] text-[#6E6E73] py-1 border-b border-[#F5F5F7]"
            >
              Agency Cockpit
            </Link>
          </div>
          <Link
            href="/onboarding"
            onClick={() => setMobileOpen(false)}
            className="block text-center text-[15px] font-normal text-white bg-[#0071E3] py-2.5 rounded-full"
          >
            Get Started ($20 / $99)
          </Link>
        </div>
      )}
    </header>
  );
}
