"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Check, 
  ChevronRight, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Cpu, 
  Target, 
  Send, 
  Calendar,
  Zap,
  Terminal,
  Activity,
  Award
} from "lucide-react";
import CareerIntelligenceGraph from "@/components/visuals/CareerIntelligenceGraph";
import LiveATSDiagnostic from "@/components/visuals/LiveATSDiagnostic";
import { useScrollReveal, useCounter } from "@/lib/use-motion";

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const heroReveal = useScrollReveal({ threshold: 0.1 });
  const narrativeReveal1 = useScrollReveal({ threshold: 0.15 });
  const narrativeReveal2 = useScrollReveal({ threshold: 0.15 });
  const resultReveal = useScrollReveal({ threshold: 0.15 });
  const pricingReveal = useScrollReveal({ threshold: 0.15 });
  const testimonialReveal = useScrollReveal({ threshold: 0.15 });
  const finaleReveal = useScrollReveal({ threshold: 0.15 });

  // Result numbers animation
  const countApps = useCounter(147, resultReveal.isVisible, 900);
  const countMatches = useCounter(32, resultReveal.isVisible, 900);
  const countResponses = useCounter(11, resultReveal.isVisible, 900);
  const countInterviews = useCounter(6, resultReveal.isVisible, 900);

  return (
    <div className="bg-[#F7F3EA] text-[#2B050E] overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. DEEP WINE BURGUNDY HERO SECTION                                       */}
      {/* ========================================================================= */}
      <section className="bg-[#3D0814] text-[#FAF5EE] pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        
        {/* Subtle atmospheric ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D91C44]/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-6 text-center">
          
          <div
            ref={heroReveal.ref}
            className={`reveal-init ${heroReveal.isVisible ? "reveal-visible" : ""}`}
          >
            {/* Small Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#FAF5EE] text-xs font-mono tracking-widest uppercase mb-8 shadow-inner">
              <span className="h-2 w-2 rounded-full bg-[#D91C44] animate-ping" />
              <span>AI-Powered Reverse Recruiting</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white max-w-5xl mx-auto mb-6 tracking-tight leading-[1.08]">
              Experience smarter, faster <br />
              <span className="text-[#FAF5EE]/90 font-light italic font-serif">
                and more engaging career recruiting.
              </span>
            </h1>

            {/* Subhead Lead */}
            <p className="text-base sm:text-lg text-[#FAF5EE]/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              ReverseRecruit stands at the forefront of career automation — reverse-engineering ATS algorithms, tailoring verifiable resumes, and guaranteeing 5+ tech interviews.
            </p>

            {/* High-Impact CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/onboarding"
                className="btn-crimson w-full sm:w-auto text-base py-3.5 px-8"
              >
                <span>Build My Career Engine</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#intelligence-graph"
                className="btn-wine-outline w-full sm:w-auto text-base py-3.5 px-7"
              >
                <span>See How It Works</span>
                <ChevronRight className="h-4 w-4 text-[#FAF5EE]/70" />
              </a>
            </div>
          </div>

          {/* 4-Stat Metric Strip (Inspired directly by Reference Image Hero) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 pb-4 border-t border-white/10 max-w-4xl mx-auto font-mono text-center">
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white block mb-1">5+</span>
              <span className="text-xs text-[#FAF5EE]/70 uppercase tracking-wider">Guaranteed Interviews</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white block mb-1">150+</span>
              <span className="text-xs text-[#FAF5EE]/70 uppercase tracking-wider">Targeted Applications</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#D91C44] block mb-1">96%</span>
              <span className="text-xs text-[#FAF5EE]/70 uppercase tracking-wider">Average ATS Compatibility</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white block mb-1">$20</span>
              <span className="text-xs text-[#FAF5EE]/70 uppercase tracking-wider">Starting Student Plan</span>
            </div>
          </div>

        </div>

        {/* Career Intelligence Living Graph inside dark hero */}
        <div id="intelligence-graph" className="pt-10 max-w-6xl mx-auto px-6">
          <CareerIntelligenceGraph />
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. EDITORIAL STORYTELLING: ACT 1 — THE PROBLEM (Warm Cream Section)      */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 max-w-6xl mx-auto px-6">
        <div
          ref={narrativeReveal1.ref}
          className={`reveal-init ${narrativeReveal1.isVisible ? "reveal-visible" : ""}`}
        >
          <div className="max-w-3xl mb-16">
            <span className="section-badge-num block mb-2 font-mono">01.</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#2B050E] tracking-tight">
              You&apos;re not losing opportunities <br />
              <span className="text-[#706556] font-normal italic font-serif">because you&apos;re unqualified.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#706556] mt-4 leading-relaxed">
              When 400+ engineers apply to a single role, automated applicant tracking filters reject 98% of qualified candidates before any human ever reviews their work.
            </p>
          </div>

          {/* Broken Status Quo vs ReverseRecruit Engine Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* The Manual Flawed Way */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#3D0814]/10 shadow-warm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#3D0814]/10">
                <span className="font-mono text-xs text-[#706556] font-bold uppercase tracking-wider">
                  The Broken Manual Way
                </span>
                <span className="text-xs text-[#706556] font-mono">&lt; 0.8% Conversion</span>
              </div>

              <div className="space-y-3.5 font-mono text-xs text-[#706556]">
                <div className="p-3.5 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/5 flex items-center justify-between">
                  <span>1. 300+ Manual Form Fillings</span>
                  <span className="text-[#D91C44]">4 Hours/Day</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/5 flex items-center justify-between">
                  <span>2. Unaligned Static Resumes</span>
                  <span className="text-[#D91C44]">ATS Discarded</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/5 flex items-center justify-between">
                  <span>3. No Direct Recruiter InMail</span>
                  <span className="text-[#D91C44]">Portal Black Hole</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/5 flex items-center justify-between font-semibold text-[#2B050E]">
                  <span>4. Typical Outcome</span>
                  <span className="text-[#D91C44]">0–1 Screening</span>
                </div>
              </div>
            </div>

            {/* The ReverseRecruit Way */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#3D0814] text-[#FAF5EE] border border-white/10 shadow-warm-lg space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-mono text-xs text-[#D91C44] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> ReverseRecruit Autonomous Pipeline
                </span>
                <span className="text-xs text-emerald-400 font-mono">14.2% Conversion</span>
              </div>

              <div className="space-y-3.5 font-mono text-xs text-[#FAF5EE]">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span>1. Direct Greenhouse/Lever Ingestion</span>
                  <span className="text-[#D91C44]">&lt; 48h Fresh</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span>2. Dynamic XYZ Resume Realignment</span>
                  <span className="text-emerald-400">95%+ ATS Score</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span>3. Dual-Channel Hiring Manager InMail</span>
                  <span className="text-white">Direct Delivery</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#D91C44]/20 border border-[#D91C44]/40 flex items-center justify-between font-semibold text-white">
                  <span>4. Guaranteed Outcome</span>
                  <span className="text-emerald-300 font-bold">5+ Tech Interviews</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. EDITORIAL STORYTELLING: ACT 2 & 3 — THE EXECUTION (Cream Surface)      */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 bg-[#F0E9DC] border-t border-b border-[#3D0814]/10">
        <div
          ref={narrativeReveal2.ref}
          className={`max-w-6xl mx-auto px-6 reveal-init ${narrativeReveal2.isVisible ? "reveal-visible" : ""}`}
        >
          <div className="max-w-3xl mb-16">
            <span className="section-badge-num block mb-2 font-mono">02.</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#2B050E] tracking-tight">
              ReverseRecruit understands what <br />
              <span className="text-[#D91C44] italic font-serif">recruiters actually scan for.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#706556] mt-4 leading-relaxed">
              We deconstruct every job description into hard technical vectors, align your actual accomplishments using Google XYZ metrics, and automate the dual-channel outreach workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#3D0814]/10 shadow-warm flex flex-col justify-between hover:shadow-warm-lg transition-shadow">
              <div>
                <span className="font-mono text-xl font-bold text-[#D91C44] block mb-4">
                  01.
                </span>
                <h3 className="text-xl font-bold text-[#2B050E] mb-2">
                  Semantic ATS Parsing
                </h3>
                <p className="text-sm text-[#706556] leading-relaxed">
                  Extracts core requirements, framework weights, and architectural keywords directly from Greenhouse, Lever, and Ashby postings.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#3D0814]/10 text-xs font-mono text-[#D91C44] font-semibold">
                Vector Similarity Engine
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#3D0814]/10 shadow-warm flex flex-col justify-between hover:shadow-warm-lg transition-shadow">
              <div>
                <span className="font-mono text-xl font-bold text-[#D91C44] block mb-4">
                  02.
                </span>
                <h3 className="text-xl font-bold text-[#2B050E] mb-2">
                  Zero-Hallucination Tailoring
                </h3>
                <p className="text-sm text-[#706556] leading-relaxed">
                  Re-orders your real project bullet points using Google XYZ metrics to place highest-relevance skills in prime parser visual zones.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#3D0814]/10 text-xs font-mono text-[#2B050E] font-semibold">
                100% Truthful Alignment
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#3D0814]/10 shadow-warm flex flex-col justify-between hover:shadow-warm-lg transition-shadow">
              <div>
                <span className="font-mono text-xl font-bold text-[#D91C44] block mb-4">
                  03.
                </span>
                <h3 className="text-xl font-bold text-[#2B050E] mb-2">
                  Hiring Manager Warm InMail
                </h3>
                <p className="text-sm text-[#706556] leading-relaxed">
                  Sends high-converting 3-sentence introductions directly to hiring leads on LinkedIn while concurrently submitting through the portal.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#3D0814]/10 text-xs font-mono text-[#D91C44] font-semibold">
                Dual-Channel Delivery
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. EDITORIAL STORYTELLING: ACT 4 — THE RESULT                            */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 max-w-6xl mx-auto px-6 text-center">
        <div
          ref={resultReveal.ref}
          className={`reveal-init ${resultReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <span className="section-badge-num block mb-2 font-mono">03.</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#2B050E] mb-6 tracking-tight">
            Your goal isn&apos;t more applications. <br />
            <span className="text-[#D91C44] italic font-serif">It&apos;s more interviews.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#706556] max-w-2xl mx-auto mb-16">
            The data behind an active candidate cycle. High precision beats blind spam every single time.
          </p>

          {/* Metric Telemetry Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            
            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#3D0814]/10 shadow-warm text-center">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-[#2B050E] block mb-2">
                {countApps}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#706556] block mb-1">
                Targeted Applications
              </span>
              <span className="text-[11px] text-[#706556]">Submitted on your behalf</span>
            </div>

            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#3D0814]/10 shadow-warm text-center">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-[#D91C44] block mb-2">
                {countMatches}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#706556] block mb-1">
                High-Fit Matches
              </span>
              <span className="text-[11px] text-[#706556]">90%+ ATS Score threshold</span>
            </div>

            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#3D0814]/10 shadow-warm text-center">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-[#2B050E] block mb-2">
                {countResponses}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#706556] block mb-1">
                Recruiter Inbound
              </span>
              <span className="text-[11px] text-[#706556]">Direct manager responses</span>
            </div>

            <div className="bg-[#3D0814] text-white p-8 rounded-3xl border border-white/10 shadow-warm-lg text-center">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-[#D91C44] block mb-2">
                {countInterviews}+
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-white block mb-1 font-semibold">
                Confirmed Interviews
              </span>
              <span className="text-[11px] text-emerald-300 font-semibold">100% Guaranteed</span>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LIVE ATS DIAGNOSTIC CENTER                                            */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 bg-[#F0E9DC] border-t border-b border-[#3D0814]/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="section-badge-num block mb-2 font-mono">04.</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#2B050E] tracking-tight">
              Test Your ATS Match Compatibility
            </h2>
            <p className="text-base sm:text-lg text-[#706556] mt-3">
              See real-time keyword scoring and automated XYZ metric injection.
            </p>
          </div>

          <LiveATSDiagnostic />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TRANSPARENT PRICING & ROI MATRIX                                      */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 max-w-6xl mx-auto px-6">
        <div
          ref={pricingReveal.ref}
          className={`reveal-init ${pricingReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="section-badge-num block mb-2 font-mono">05.</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#2B050E] tracking-tight">
              Your first interview is the ROI.
            </h2>
            <p className="text-base sm:text-lg text-[#706556] mt-3">
              Backed by our 100% money-back guarantee if we do not secure 5 qualified interview milestones.
            </p>

            {/* Pill switch */}
            <div className="inline-flex items-center p-1.5 rounded-full bg-[#FFFFFF] border border-[#3D0814]/10 shadow-warm mt-8">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  billingCycle === "monthly"
                    ? "bg-[#3D0814] text-white font-bold shadow-sm"
                    : "text-[#706556] hover:text-[#2B050E]"
                }`}
              >
                Monthly Autopilot
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  billingCycle === "annual"
                    ? "bg-[#3D0814] text-white font-bold shadow-sm"
                    : "text-[#706556] hover:text-[#2B050E]"
                }`}
              >
                Quarterly (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Student Plan ($20) */}
            <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-3xl border border-[#3D0814]/10 shadow-warm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#D91C44] font-bold px-3 py-1 rounded-full bg-[#D91C44]/10">
                    Student &amp; Fresher Tier
                  </span>
                  <span className="text-xs font-mono text-[#706556]">0–2 YOE</span>
                </div>

                <div className="flex items-baseline gap-2 my-6">
                  <span className="text-5xl sm:text-6xl font-extrabold font-mono text-[#2B050E]">
                    ${billingCycle === "monthly" ? "20" : "16"}
                  </span>
                  <span className="text-sm font-mono text-[#706556]">/ month</span>
                </div>

                <p className="text-sm text-[#706556] leading-relaxed mb-8">
                  Engineered for university graduates and early-career software engineers breaking into the tough tech market.
                </p>

                <div className="space-y-3 text-xs font-mono text-[#2B050E] border-t border-[#3D0814]/10 pt-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#D91C44] shrink-0" />
                    <span><strong>150+ Verified Applications</strong> per month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#D91C44] shrink-0" />
                    <span><strong>3 to 5 Guaranteed Interviews</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#D91C44] shrink-0" />
                    <span>Dynamic ATS Resume Keyword Rewrites</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#D91C44] shrink-0" />
                    <span>LinkedIn Recruiter SEO Upgrade</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#D91C44] shrink-0" />
                    <span>Live Pipeline Telemetry Dashboard</span>
                  </div>
                </div>
              </div>

              <div className="pt-10">
                <Link
                  href="/onboarding"
                  className="btn-cream-dark w-full text-center text-xs py-3.5 justify-center"
                >
                  Launch Student Plan ($20)
                </Link>
              </div>
            </div>

            {/* IT Pro Plan ($99) */}
            <div className="bg-[#3D0814] text-[#FAF5EE] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-warm-lg flex flex-col justify-between relative">
              <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#D91C44] text-white">
                Most Selected by Switchers
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#D91C44] font-bold px-3 py-1 rounded-full bg-white/10">
                    IT Professional Tier
                  </span>
                  <span className="text-xs font-mono text-[#FAF5EE]/70">3+ YOE</span>
                </div>

                <div className="flex items-baseline gap-2 my-6">
                  <span className="text-5xl sm:text-6xl font-extrabold font-mono text-white">
                    ${billingCycle === "monthly" ? "99" : "79"}
                  </span>
                  <span className="text-sm font-mono text-[#FAF5EE]/70">/ month</span>
                </div>

                <p className="text-sm text-[#FAF5EE]/80 leading-relaxed mb-8">
                  For mid-level, senior engineers, and architects looking for $140k–$250k+ packages with compensation leverage.
                </p>

                <div className="space-y-3 text-xs font-mono text-white border-t border-white/10 pt-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#D91C44] shrink-0" />
                    <span><strong>250+ High-Fit Applications</strong> per month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#D91C44] shrink-0" />
                    <span><strong>5+ Senior Tech Interviews Guaranteed</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#D91C44] shrink-0" />
                    <span>Direct Hiring Manager InMail Outreach</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#D91C44] shrink-0" />
                    <span>AI Offer Negotiation &amp; Equity Copilot</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#D91C44] shrink-0" />
                    <span>Current Employer Blacklist Protection</span>
                  </div>
                </div>
              </div>

              <div className="pt-10">
                <Link
                  href="/onboarding"
                  className="btn-crimson w-full text-center text-xs py-3.5 justify-center"
                >
                  Launch Professional Plan ($99)
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. VERIFIED CANDIDATE TIMELINES (Social Proof)                           */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 bg-[#F0E9DC] border-t border-b border-[#3D0814]/10">
        <div
          ref={testimonialReveal.ref}
          className={`max-w-6xl mx-auto px-6 reveal-init ${testimonialReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <div className="max-w-3xl mb-16">
            <span className="section-badge-num block mb-2 font-mono">06.</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#2B050E] tracking-tight">
              Real career trajectories. <br />
              <span className="text-[#706556] font-normal italic font-serif">Measurable compensation shifts.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#3D0814]/10 shadow-warm space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#D91C44] font-bold">Timeline: 21 Days</span>
                <span className="font-mono text-xs text-emerald-600 font-bold">+$95k Package</span>
              </div>
              <p className="text-sm text-[#2B050E] font-bold">
                Electrical Engineer $\to$ Associate SWE @ Datadog
              </p>
              <p className="text-xs text-[#706556] leading-relaxed">
                &quot;Graduated in May 2026 with 300+ manual rejections. ReverseRecruit re-engineered my embedded projects into cloud backend metrics and secured 4 screenings within 3 weeks.&quot;
              </p>
              <div className="pt-4 border-t border-[#3D0814]/10 text-xs font-mono text-[#706556]">
                Alex Chen • University 2026 Grad
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#3D0814]/10 shadow-warm space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#D91C44] font-bold">Timeline: 28 Days</span>
                <span className="font-mono text-xs text-emerald-600 font-bold">+$175k Comp</span>
              </div>
              <p className="text-sm text-[#2B050E] font-bold">
                Mid SWE $\to$ Staff Platform Architect @ Stripe
              </p>
              <p className="text-xs text-[#706556] leading-relaxed">
                &quot;The dual-channel InMail dispatch got me directly in front of the VP of Engineering. The negotiation copilot helped me bump the base salary by $24,000.&quot;
              </p>
              <div className="pt-4 border-t border-[#3D0814]/10 text-xs font-mono text-[#706556]">
                Marcus T. • 4 Years Experience
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#3D0814]/10 shadow-warm space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#D91C44] font-bold">Timeline: 18 Days</span>
                <span className="font-mono text-xs text-emerald-600 font-bold">6 Interviews</span>
              </div>
              <p className="text-sm text-[#2B050E] font-bold">
                Frontend Dev $\to$ Product Architect @ Linear
              </p>
              <p className="text-xs text-[#706556] leading-relaxed">
                &quot;The LinkedIn SEO optimizer caused inbound recruiter inquiries to 4x within a week. I had multiple competing offers on the table.&quot;
              </p>
              <div className="pt-4 border-t border-[#3D0814]/10 text-xs font-mono text-[#706556]">
                Priya R. • Remote Global
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. DEEP WINE BURGUNDY FINALE SECTION                                     */}
      {/* ========================================================================= */}
      <section className="bg-[#3D0814] text-[#FAF5EE] py-24 md:py-36 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#D91C44]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div
          ref={finaleReveal.ref}
          className={`max-w-4xl mx-auto px-6 reveal-init ${finaleReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#D91C44] font-semibold block mb-4">
            Ready for Departure
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Streamline your career engine <br />
            <span className="text-[#FAF5EE]/90 italic font-serif">with ReverseRecruit.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#FAF5EE]/80 max-w-xl mx-auto mb-12">
            Join software engineers landing verified interviews at top tech companies. Backed by our 5-interview guarantee.
          </p>
          <Link
            href="/onboarding"
            className="btn-crimson text-base py-4 px-10"
          >
            <span>Activate My Career Engine ($20 / $99)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
