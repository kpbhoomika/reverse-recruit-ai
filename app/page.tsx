"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";
import { useScrollReveal, useCounter } from "@/lib/use-motion";

export default function LandingPage() {
  // ATS Scanner State
  const [targetRole, setTargetRole] = useState("Full Stack Engineer");
  const [sampleResume, setSampleResume] = useState(
    "Full Stack Developer with experience in React, TypeScript, Node.js, and PostgreSQL. Built web apps, integrated REST APIs, and managed Git repositories."
  );
  const [sampleJd, setSampleJd] = useState(
    "Looking for a Full Stack Engineer with experience in React, Next.js, TypeScript, PostgreSQL, and Docker. Microservices, high-traffic APIs, and CI/CD pipelines."
  );
  const [atsScore, setAtsScore] = useState<number>(74);
  const [isScanning, setIsScanning] = useState(false);

  // Pricing pill switch
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");

  // Scroll reveal hooks for each section
  const heroReveal = useScrollReveal({ threshold: 0.1 });
  const statReveal = useScrollReveal({ threshold: 0.2 });
  const systemReveal = useScrollReveal({ threshold: 0.15 });
  const scannerReveal = useScrollReveal({ threshold: 0.15 });
  const pricingReveal = useScrollReveal({ threshold: 0.15 });
  const finaleReveal = useScrollReveal({ threshold: 0.15 });

  // Animated stat counters (triggered once when statReveal is visible)
  const countInterviews = useCounter(5, statReveal.isVisible, 800);
  const countApps = useCounter(150, statReveal.isVisible, 800);
  const countPrice = useCounter(20, statReveal.isVisible, 800);
  const countAtsDisplay = useCounter(atsScore, scannerReveal.isVisible, 700);

  const runAtsScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setAtsScore(92);
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="bg-[#FFFFFF] text-[#1D1D1F]">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Clean, Typography-Led, Massive Whitespace) */}
      {/* ========================================================================= */}
      <section className="pt-24 pb-20 md:pt-36 md:pb-32 max-w-[1080px] mx-auto px-6 text-center">
        
        <div
          ref={heroReveal.ref}
          className={`reveal-init ${heroReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <p className="apple-eyebrow text-[#6E6E73] mb-4">
            ReverseRecruit Autopilot
          </p>

          <h1 className="text-[44px] sm:text-[68px] lg:text-[84px] font-semibold tracking-[-0.03em] leading-[1.04] text-[#1D1D1F] max-w-[960px] mx-auto mb-6">
            5 tech interviews. <br className="hidden sm:inline" />
            Guaranteed.
          </h1>

          <p className="text-[19px] sm:text-[24px] font-normal text-[#6E6E73] max-w-[700px] mx-auto leading-[1.38] mb-10">
            We find, tailor, and submit 150+ verified applications on your behalf. You just show up to the interviews.
          </p>

          {/* Apple CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
            <Link
              href="/onboarding"
              className="apple-btn-interactive w-full sm:w-auto bg-[#0071E3] hover:bg-[#0077ED] text-white px-7 py-3.5 rounded-full text-[17px] font-normal shadow-sm"
            >
              Get started from $20
            </Link>
            <a
              href="#scanner"
              className="apple-link text-[17px] font-normal inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded-md px-1"
            >
              <span>Test ATS match</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Minimalist Stat Strip (Animated Counter) */}
        <div
          ref={statReveal.ref}
          className={`pt-12 border-t border-[#D2D2D7]/60 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-[800px] mx-auto text-center reveal-init ${
            statReveal.isVisible ? "reveal-visible" : ""
          }`}
        >
          <div className="reveal-init delay-100">
            <span className="block text-[36px] sm:text-[44px] font-semibold tracking-tight text-[#1D1D1F]">
              {countInterviews}+
            </span>
            <span className="text-[14px] text-[#6E6E73]">
              Interviews guaranteed or 100% refund
            </span>
          </div>
          <div className="reveal-init delay-200">
            <span className="block text-[36px] sm:text-[44px] font-semibold tracking-tight text-[#1D1D1F]">
              {countApps}+
            </span>
            <span className="text-[14px] text-[#6E6E73]">
              Tailored applications per candidate
            </span>
          </div>
          <div className="reveal-init delay-300">
            <span className="block text-[36px] sm:text-[44px] font-semibold tracking-tight text-[#1D1D1F]">
              ${countPrice}
            </span>
            <span className="text-[14px] text-[#6E6E73]">
              Starting plan for students &amp; freshers
            </span>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. THE SYSTEM (Alternating #F5F5F7 Off-White Section) */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 bg-[#F5F5F7] border-y border-[#D2D2D7]/60">
        <div
          ref={systemReveal.ref}
          className="max-w-[1080px] mx-auto px-6"
        >
          
          <div className={`max-w-[700px] mb-16 md:mb-24 reveal-init ${systemReveal.isVisible ? "reveal-visible" : ""}`}>
            <p className="apple-eyebrow text-[#6E6E73] mb-2">
              Architecture
            </p>
            <h2 className="text-[34px] sm:text-[52px] font-semibold tracking-[-0.025em] leading-[1.1] text-[#1D1D1F]">
              Three layers. <br />
              One outcome.
            </h2>
            <p className="text-[19px] text-[#6E6E73] mt-4 leading-[1.45]">
              Traditional job boards rely on mass volume. We combine direct ATS board scraping with dynamic keyword tailoring and direct hiring manager outreach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div
              className={`apple-card-hover bg-[#FFFFFF] p-8 sm:p-10 rounded-[22px] border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between reveal-init delay-100 ${
                systemReveal.isVisible ? "reveal-visible" : ""
              }`}
            >
              <div>
                <span className="text-[13px] font-semibold tracking-wider text-[#6E6E73] uppercase mb-4 block">
                  01 / Sourcing
                </span>
                <h3 className="text-[24px] font-semibold text-[#1D1D1F] tracking-tight mb-3">
                  Direct ATS Feeds
                </h3>
                <p className="text-[15px] text-[#6E6E73] leading-[1.5]">
                  We scrape verified Greenhouse, Lever, and Ashby career portals within 48 hours of posting, filtering out stale third-party aggregator listings.
                </p>
              </div>
              <div className="pt-8 mt-8 border-t border-[#F5F5F7] text-[13px] text-[#1D1D1F] font-medium">
                &lt; 48-hour posting window
              </div>
            </div>

            {/* Card 2 */}
            <div
              className={`apple-card-hover bg-[#FFFFFF] p-8 sm:p-10 rounded-[22px] border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between reveal-init delay-200 ${
                systemReveal.isVisible ? "reveal-visible" : ""
              }`}
            >
              <div>
                <span className="text-[13px] font-semibold tracking-wider text-[#6E6E73] uppercase mb-4 block">
                  02 / Tailoring
                </span>
                <h3 className="text-[24px] font-semibold text-[#1D1D1F] tracking-tight mb-3">
                  Dynamic Keyword Alignment
                </h3>
                <p className="text-[15px] text-[#6E6E73] leading-[1.5]">
                  Every application is rewritten using the Google XYZ formula to match required ATS keywords without inventing fake qualifications.
                </p>
              </div>
              <div className="pt-8 mt-8 border-t border-[#F5F5F7] text-[13px] text-[#1D1D1F] font-medium">
                95%+ ATS compatibility
              </div>
            </div>

            {/* Card 3 */}
            <div
              className={`apple-card-hover bg-[#FFFFFF] p-8 sm:p-10 rounded-[22px] border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between reveal-init delay-300 ${
                systemReveal.isVisible ? "reveal-visible" : ""
              }`}
            >
              <div>
                <span className="text-[13px] font-semibold tracking-wider text-[#6E6E73] uppercase mb-4 block">
                  03 / Delivery
                </span>
                <h3 className="text-[24px] font-semibold text-[#1D1D1F] tracking-tight mb-3">
                  Dual-Channel Outreach
                </h3>
                <p className="text-[15px] text-[#6E6E73] leading-[1.5]">
                  We submit the application directly into the company portal and send a 3-sentence introduction to the hiring manager on LinkedIn.
                </p>
              </div>
              <div className="pt-8 mt-8 border-t border-[#F5F5F7] text-[13px] text-[#1D1D1F] font-medium">
                Direct recruiter visibility
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PRODUCT SHOWCASE: ATS SCORE ANALYZER */}
      {/* ========================================================================= */}
      <section id="scanner" className="py-24 md:py-36 max-w-[1080px] mx-auto px-6">
        
        <div
          ref={scannerReveal.ref}
          className={`reveal-init ${scannerReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <p className="apple-eyebrow text-[#6E6E73] mb-2">
              Intelligence Engine
            </p>
            <h2 className="text-[34px] sm:text-[52px] font-semibold tracking-[-0.025em] leading-[1.1] text-[#1D1D1F]">
              Precision matching in real time.
            </h2>
            <p className="text-[19px] text-[#6E6E73] mt-4">
              See how our engine evaluates candidate qualifications against live job requirements.
            </p>
          </div>

          {/* Minimalist Product UI Surface */}
          <div className="bg-[#F5F5F7] rounded-[24px] border border-[#D2D2D7]/80 p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
            
            {/* Top Window Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-[#D2D2D7]/60 mb-8">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#D2D2D7]" />
                <div className="h-3 w-3 rounded-full bg-[#D2D2D7]" />
                <div className="h-3 w-3 rounded-full bg-[#D2D2D7]" />
                <span className="text-[13px] text-[#6E6E73] font-mono ml-2">ATS Evaluation Tool</span>
              </div>
              <span className="text-[12px] text-[#6E6E73]">Live Preview</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Input Column */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <label className="block text-[13px] font-semibold text-[#1D1D1F] mb-1.5">
                    Target Role
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[12px] bg-[#FFFFFF] border border-[#D2D2D7] text-[14px] text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#1D1D1F] mb-1.5">
                    Candidate Summary
                  </label>
                  <textarea
                    rows={3}
                    value={sampleResume}
                    onChange={(e) => setSampleResume(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[12px] bg-[#FFFFFF] border border-[#D2D2D7] text-[13px] text-[#1D1D1F] leading-relaxed focus:outline-none focus:border-[#0071E3] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#1D1D1F] mb-1.5">
                    Target Job Description
                  </label>
                  <textarea
                    rows={3}
                    value={sampleJd}
                    onChange={(e) => setSampleJd(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[12px] bg-[#FFFFFF] border border-[#D2D2D7] text-[13px] text-[#1D1D1F] leading-relaxed focus:outline-none focus:border-[#0071E3] transition-colors"
                  />
                </div>

                <button
                  onClick={runAtsScan}
                  disabled={isScanning}
                  className="apple-btn-interactive w-full bg-[#1D1D1F] hover:bg-[#333336] text-white py-3 rounded-full text-[15px] font-normal shadow-sm"
                >
                  {isScanning ? "Evaluating parameters..." : "Evaluate Match Score"}
                </button>
              </div>

              {/* Spec Sheet Display Output */}
              <div className="lg:col-span-5 bg-[#FFFFFF] p-6 sm:p-8 rounded-[18px] border border-[#D2D2D7]/60 space-y-6">
                
                <div className="flex items-baseline justify-between border-b border-[#F5F5F7] pb-4">
                  <div>
                    <span className="text-[12px] uppercase font-semibold tracking-wider text-[#6E6E73] block">
                      ATS Score
                    </span>
                    <span className="text-[44px] font-semibold text-[#1D1D1F] leading-none">
                      {countAtsDisplay}%
                    </span>
                  </div>
                  <span className="text-[13px] text-[#0071E3] font-medium">
                    {atsScore > 85 ? "High Precision" : "Optimized"}
                  </span>
                </div>

                <div className="space-y-4 text-[13px]">
                  <div>
                    <span className="font-semibold text-[#1D1D1F] block mb-1.5">Matched Keywords:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["React", "TypeScript", "Node.js", "PostgreSQL", "REST APIs"].map((kw) => (
                        <span key={kw} className="px-2.5 py-1 rounded-md bg-[#F5F5F7] text-[#1D1D1F] text-[12px] font-mono">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-[#1D1D1F] block mb-1.5">Aligned Bullet Point:</span>
                    <p className="p-3 rounded-[10px] bg-[#F5F5F7] text-[#6E6E73] text-[12px] leading-relaxed">
                      &quot;Architected responsive React and TypeScript frontend modules integrated with PostgreSQL microservices, reducing API response times by 38%.&quot;
                    </p>
                  </div>
                </div>

                <Link
                  href="/onboarding"
                  className="apple-link text-[14px] font-medium pt-2 block"
                >
                  Apply with tailored resumes ›
                </Link>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. PRICING (Clean Apple Comparison Matrix with Pill Switch) */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 bg-[#F5F5F7] border-t border-[#D2D2D7]/60">
        <div
          ref={pricingReveal.ref}
          className="max-w-[1080px] mx-auto px-6"
        >
          
          <div className={`text-center max-w-[700px] mx-auto mb-12 reveal-init ${pricingReveal.isVisible ? "reveal-visible" : ""}`}>
            <p className="apple-eyebrow text-[#6E6E73] mb-2">
              Pricing
            </p>
            <h2 className="text-[34px] sm:text-[52px] font-semibold tracking-[-0.025em] leading-[1.1] text-[#1D1D1F]">
              Simple, transparent pricing.
            </h2>
            <p className="text-[19px] text-[#6E6E73] mt-4">
              All plans include the 5-interview guarantee or your money back.
            </p>

            {/* Apple Pill Switch */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#E5E5EA] mt-8">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-[#FFFFFF] text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                    : "text-[#6E6E73] hover:text-[#1D1D1F]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("quarterly")}
                className={`px-5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                  billingCycle === "quarterly"
                    ? "bg-[#FFFFFF] text-[#1D1D1F] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                    : "text-[#6E6E73] hover:text-[#1D1D1F]"
                }`}
              >
                Quarterly (Save 15%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[880px] mx-auto">
            
            {/* Plan 1: Students */}
            <div
              className={`apple-card-hover bg-[#FFFFFF] p-8 sm:p-12 rounded-[24px] border border-[#D2D2D7]/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between reveal-init delay-100 ${
                pricingReveal.isVisible ? "reveal-visible" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                    Student &amp; Fresher
                  </span>
                  <span className="text-[12px] text-[#86868B]">0–2 yrs exp</span>
                </div>

                <div className="flex items-baseline gap-1 my-6">
                  <span className="text-[52px] font-semibold text-[#1D1D1F] leading-none">
                    ${billingCycle === "monthly" ? "20" : "17"}
                  </span>
                  <span className="text-[15px] text-[#6E6E73]">/ month</span>
                </div>

                <p className="text-[15px] text-[#6E6E73] leading-[1.47] mb-8">
                  Built for university graduates, freshers, and early career engineers breaking into tech.
                </p>

                <div className="space-y-3.5 text-[14px] text-[#1D1D1F] border-t border-[#F5F5F7] pt-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#1D1D1F] shrink-0" />
                    <span><strong>150+ targeted applications</strong> submitted</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#1D1D1F] shrink-0" />
                    <span><strong>3 to 5 guaranteed interviews</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#1D1D1F] shrink-0" />
                    <span>Dynamic ATS resume tailoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#1D1D1F] shrink-0" />
                    <span>LinkedIn SEO &amp; headline upgrade</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#1D1D1F] shrink-0" />
                    <span>Live pipeline tracker</span>
                  </div>
                </div>
              </div>

              <div className="pt-10">
                <Link
                  href="/onboarding"
                  className="apple-btn-interactive block text-center w-full bg-[#1D1D1F] hover:bg-[#333336] text-white py-3.5 rounded-full text-[15px] font-normal shadow-sm"
                >
                  Choose Student Plan
                </Link>
              </div>
            </div>

            {/* Plan 2: IT Professionals */}
            <div
              className={`apple-card-hover bg-[#FFFFFF] p-8 sm:p-12 rounded-[24px] border border-[#D2D2D7]/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between reveal-init delay-200 ${
                pricingReveal.isVisible ? "reveal-visible" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                    IT Professional
                  </span>
                  <span className="text-[12px] text-[#0071E3] font-medium">Most popular</span>
                </div>

                <div className="flex items-baseline gap-1 my-6">
                  <span className="text-[52px] font-semibold text-[#1D1D1F] leading-none">
                    ${billingCycle === "monthly" ? "99" : "84"}
                  </span>
                  <span className="text-[15px] text-[#6E6E73]">/ month</span>
                </div>

                <p className="text-[15px] text-[#6E6E73] leading-[1.47] mb-8">
                  For mid-level, senior engineers, and architects looking for competitive comp packages.
                </p>

                <div className="space-y-3.5 text-[14px] text-[#1D1D1F] border-t border-[#F5F5F7] pt-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#1D1D1F] shrink-0" />
                    <span><strong>250+ targeted applications</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#1D1D1F] shrink-0" />
                    <span><strong>5+ guaranteed tech interviews</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#1D1D1F] shrink-0" />
                    <span>Direct recruiter InMail outreach</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#1D1D1F] shrink-0" />
                    <span>AI Offer negotiation copilot</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#1D1D1F] shrink-0" />
                    <span>Current employer blacklist protection</span>
                  </div>
                </div>
              </div>

              <div className="pt-10">
                <Link
                  href="/onboarding"
                  className="apple-btn-interactive block text-center w-full bg-[#0071E3] hover:bg-[#0077ED] text-white py-3.5 rounded-full text-[15px] font-normal shadow-sm"
                >
                  Choose Professional Plan
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CONTRAST BREAK: DARK APPLE FINALE SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 bg-[#000000] text-[#FFFFFF] text-center">
        <div
          ref={finaleReveal.ref}
          className={`max-w-[800px] mx-auto px-6 reveal-init ${finaleReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <p className="text-[14px] uppercase font-semibold tracking-wider text-[#A1A1A6] mb-3">
            Start Your Search
          </p>
          <h2 className="text-[40px] sm:text-[64px] font-semibold tracking-[-0.03em] leading-[1.06] mb-6">
            Your next role is waiting.
          </h2>
          <p className="text-[19px] sm:text-[21px] text-[#A1A1A6] max-w-[600px] mx-auto leading-[1.4] mb-10">
            Join candidates landing offers at Stripe, Linear, Vercel, and Datadog. Guaranteed 5 interviews.
          </p>
          <Link
            href="/onboarding"
            className="apple-btn-interactive inline-flex items-center justify-center bg-[#FFFFFF] hover:bg-[#F5F5F7] text-[#1D1D1F] px-8 py-3.5 rounded-full text-[17px] font-medium shadow-md"
          >
            Get started today
          </Link>
        </div>
      </section>

    </div>
  );
}
