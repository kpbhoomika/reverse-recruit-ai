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
    <div className="bg-[#07090E] text-[#F1F5F9] overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO SECTION                                                */}
      {/* ========================================================================= */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 max-w-6xl mx-auto px-6 text-center">
        
        {/* Subtle background ambient optical beam */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div
          ref={heroReveal.ref}
          className={`reveal-init ${heroReveal.isVisible ? "reveal-visible" : ""}`}
        >
          {/* Scientific Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-100/90 border border-border-light text-cyan-300 text-xs font-mono tracking-widest uppercase mb-8 shadow-inner">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-bright animate-ping" />
            <span>Autonomous Career Operating System</span>
          </div>

          {/* Massive Display Headline */}
          <h1 className="text-display-hero font-semibold text-foreground max-w-5xl mx-auto mb-8 tracking-tighter">
            Stop Applying. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-slate-200 to-muted">
              Start Getting Recruited.
            </span>
          </h1>

          {/* Subhead Lead */}
          <p className="text-subhead-lead max-w-2xl mx-auto mb-12">
            The intelligent career engine that reverse-engineers ATS algorithms, tailors your experience with zero hallucinations, and guarantees a minimum of 5 tech interviews.
          </p>

          {/* High-Impact CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
            <Link
              href="/onboarding"
              className="btn-primary-glow w-full sm:w-auto text-base py-3.5 px-8"
            >
              <span>Build My Career Engine</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#intelligence-graph"
              className="btn-secondary-glass w-full sm:w-auto text-base py-3.5 px-7"
            >
              <span>See How It Works</span>
              <ChevronRight className="h-4 w-4 text-muted" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LIVING SYSTEM VISUALIZATION (Product Core Engine)                        */}
        {/* ========================================================================= */}
        <div id="intelligence-graph" className="pt-4">
          <CareerIntelligenceGraph />
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. PRODUCT STORYTELLING: ACT 1 — THE PROBLEM                             */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 hairline-t hairline-b bg-surface-50/40 relative">
        <div
          ref={narrativeReveal1.ref}
          className={`max-w-6xl mx-auto px-6 reveal-init ${narrativeReveal1.isVisible ? "reveal-visible" : ""}`}
        >
          <div className="max-w-3xl mb-16">
            <span className="text-eyebrow-telemetry block mb-3">01 / The Inefficiency Paradox</span>
            <h2 className="text-display-section text-foreground">
              You&apos;re not losing opportunities <br />
              <span className="text-muted font-normal">because you&apos;re unqualified.</span>
            </h2>
            <p className="text-subhead-lead mt-4 text-muted">
              Modern hiring uses keyword parsing bots and automated filters. When 400+ engineers apply to a single role, 98% of qualified candidates are filtered out before human eyes ever see their resume.
            </p>
          </div>

          {/* The Broken Funnel vs. ReverseRecruit Funnel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* The Manual Flawed Way */}
            <div className="p-8 rounded-3xl bg-surface-100/50 border border-border-subtle space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <span className="font-mono text-xs text-rose-400 font-semibold uppercase tracking-wider">
                  The Broken Status Quo
                </span>
                <span className="text-xs text-muted font-mono">&lt; 0.8% Conversion</span>
              </div>

              <div className="space-y-4 font-mono text-xs text-muted">
                <div className="p-3.5 rounded-xl bg-surface-200/50 border border-border-subtle flex items-center justify-between">
                  <span>1. 300+ Manual Applications</span>
                  <span className="text-rose-400">4 Hours/Day</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-200/50 border border-border-subtle flex items-center justify-between">
                  <span>2. Unaligned Static Resumes</span>
                  <span className="text-rose-400">ATS Rejected</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-200/50 border border-border-subtle flex items-center justify-between">
                  <span>3. No Direct Recruiter Contact</span>
                  <span className="text-rose-400">Portal Black Hole</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-200/50 border border-border-subtle flex items-center justify-between font-semibold text-rose-300">
                  <span>4. Outcome</span>
                  <span>0–1 Screenings</span>
                </div>
              </div>
            </div>

            {/* The ReverseRecruit Way */}
            <div className="p-8 rounded-3xl glass-surface-elevated border border-cyan-500/30 space-y-6 shadow-glow">
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <span className="font-mono text-xs text-cyan-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> ReverseRecruit Autonomous Engine
                </span>
                <span className="text-xs text-emerald-400 font-mono">14.2% Conversion</span>
              </div>

              <div className="space-y-4 font-mono text-xs text-foreground">
                <div className="p-3.5 rounded-xl bg-surface-200/90 border border-border-light flex items-center justify-between">
                  <span>1. Verified ATS Board Ingestion</span>
                  <span className="text-cyan-300">&lt; 48h Fresh</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-200/90 border border-border-light flex items-center justify-between">
                  <span>2. Dynamic XYZ Resume Realignment</span>
                  <span className="text-emerald-400">95%+ ATS Score</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-200/90 border border-border-light flex items-center justify-between">
                  <span>3. Dual-Channel Hiring Manager InMail</span>
                  <span className="text-cyan-300">Direct Delivery</span>
                </div>
                <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between font-semibold text-cyan-300">
                  <span>4. Guaranteed Outcome</span>
                  <span className="text-emerald-400 font-bold">5+ Tech Interviews</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PRODUCT STORYTELLING: ACT 2 & 3 — INTELLIGENCE & EXECUTION            */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 max-w-6xl mx-auto px-6">
        <div
          ref={narrativeReveal2.ref}
          className={`reveal-init ${narrativeReveal2.isVisible ? "reveal-visible" : ""}`}
        >
          <div className="max-w-3xl mb-16">
            <span className="text-eyebrow-telemetry block mb-3">02 / Algorithmic Execution</span>
            <h2 className="text-display-section text-foreground">
              ReverseRecruit understands what <br />
              <span className="text-cyan-300">recruiters actually scan for.</span>
            </h2>
            <p className="text-subhead-lead mt-4 text-muted">
              We deconstruct every job description into hard technical vectors, align your actual accomplishments using quantified metrics, and automate the outreach workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="glass-surface-interactive p-8 rounded-3xl border border-border-subtle flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono font-bold text-sm mb-6">
                  01
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Semantic ATS Parsing
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Extracts core requirements, framework weights, and architectural keywords from Greenhouse, Lever, and Ashby postings.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-border-subtle/60 text-xs font-mono text-cyan-300">
                Vector Similarity Engine
              </div>
            </div>

            <div className="glass-surface-interactive p-8 rounded-3xl border border-border-subtle flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm mb-6">
                  02
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Zero-Hallucination Tailoring
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Re-orders your real project bullet points using Google XYZ metrics to place highest-relevance skills in prime parser visual zones.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-border-subtle/60 text-xs font-mono text-emerald-400">
                100% Truthful Alignment
              </div>
            </div>

            <div className="glass-surface-interactive p-8 rounded-3xl border border-border-subtle flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-sm mb-6">
                  03
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Hiring Manager Warm InMail
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Sends high-converting 3-sentence introductions directly to hiring leads on LinkedIn while concurrently submitting through the portal.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-border-subtle/60 text-xs font-mono text-blue-300">
                Dual-Channel Delivery
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PRODUCT STORYTELLING: ACT 4 — THE RESULT                               */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 hairline-t hairline-b bg-surface-50/60 relative">
        <div
          ref={resultReveal.ref}
          className={`max-w-6xl mx-auto px-6 text-center reveal-init ${resultReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <span className="text-eyebrow-telemetry block mb-4">03 / The Output</span>
          <h2 className="text-display-hero text-foreground mb-6">
            Your goal isn&apos;t more applications. <br />
            <span className="text-cyan-300">It&apos;s more interviews.</span>
          </h2>
          <p className="text-subhead-lead max-w-2xl mx-auto mb-16 text-muted">
            The data behind an active candidate cycle. High precision beats blind spam every single time.
          </p>

          {/* Metric Telemetry Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            
            <div className="glass-surface-elevated p-8 rounded-3xl border border-border-light text-center">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-foreground block mb-2">
                {countApps}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-muted block mb-1">
                Targeted Applications
              </span>
              <span className="text-[11px] text-muted">Submitted on your behalf</span>
            </div>

            <div className="glass-surface-elevated p-8 rounded-3xl border border-border-light text-center">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-cyan-300 block mb-2">
                {countMatches}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-muted block mb-1">
                High-Fit Matches
              </span>
              <span className="text-[11px] text-muted">90%+ ATS Score threshold</span>
            </div>

            <div className="glass-surface-elevated p-8 rounded-3xl border border-border-light text-center">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-blue-400 block mb-2">
                {countResponses}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-muted block mb-1">
                Recruiter Inbound
              </span>
              <span className="text-[11px] text-muted">Direct manager responses</span>
            </div>

            <div className="glass-surface-elevated p-8 rounded-3xl border border-emerald-500/40 text-center bg-emerald-950/20 shadow-glow-emerald">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-400 block mb-2">
                {countInterviews}+
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 block mb-1">
                Confirmed Interviews
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold">100% Guaranteed</span>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LIVE ATS DIAGNOSTIC CENTER (Interactive Centerpiece)                  */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-eyebrow-telemetry block mb-3">Diagnostic Intelligence</span>
          <h2 className="text-display-section text-foreground">
            Test Your ATS Match Compatibility
          </h2>
          <p className="text-subhead-lead mt-3 text-muted">
            See real-time keyword scoring and automated XYZ metric injection.
          </p>
        </div>

        <LiveATSDiagnostic />
      </section>

      {/* ========================================================================= */}
      {/* 6. TRANSPARENT PRICING & ROI MATRIX                                      */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 hairline-t hairline-b bg-surface-50/40">
        <div
          ref={pricingReveal.ref}
          className={`max-w-6xl mx-auto px-6 reveal-init ${pricingReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-eyebrow-telemetry block mb-3">Transparent Investment</span>
            <h2 className="text-display-section text-foreground">
              Your first interview is the ROI.
            </h2>
            <p className="text-subhead-lead mt-3 text-muted">
              Backed by our 100% money-back guarantee if we do not secure 5 qualified interview milestones.
            </p>

            {/* Segmented Pill Switch */}
            <div className="inline-flex items-center p-1 rounded-full bg-surface-100 border border-border-light mt-8">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  billingCycle === "monthly"
                    ? "bg-foreground text-background font-bold shadow-md"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Monthly Autopilot
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  billingCycle === "annual"
                    ? "bg-foreground text-background font-bold shadow-md"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Quarterly (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Tier 1: Student / Fresher ($20) */}
            <div className="glass-surface p-8 sm:p-10 rounded-3xl border border-border-light flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-cyan-300 font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    Student &amp; Fresher Tier
                  </span>
                  <span className="text-xs font-mono text-muted">0–2 YOE</span>
                </div>

                <div className="flex items-baseline gap-2 my-6">
                  <span className="text-5xl sm:text-6xl font-extrabold font-mono text-foreground">
                    ${billingCycle === "monthly" ? "20" : "16"}
                  </span>
                  <span className="text-sm font-mono text-muted">/ month</span>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-8">
                  Engineered for university graduates and early-career software engineers breaking into the tough tech market.
                </p>

                <div className="space-y-3 text-xs font-mono text-foreground border-t border-border-subtle pt-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span><strong>150+ Verified Applications</strong> per month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span><strong>3 to 5 Guaranteed Interviews</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>Dynamic ATS Resume Keyword Rewrites</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>LinkedIn Recruiter SEO Upgrade</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>Live Pipeline Telemetry Dashboard</span>
                  </div>
                </div>
              </div>

              <div className="pt-10">
                <Link
                  href="/onboarding"
                  className="btn-secondary-glass w-full text-center text-xs py-3.5 justify-center"
                >
                  Launch Student Plan ($20)
                </Link>
              </div>
            </div>

            {/* Tier 2: IT Professional / Switcher ($99) */}
            <div className="glass-surface-elevated p-8 sm:p-10 rounded-3xl border border-cyan-500/40 flex flex-col justify-between relative shadow-glow">
              
              <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 text-background">
                Most Selected by Switchers
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-cyan-300 font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                    IT Professional Tier
                  </span>
                  <span className="text-xs font-mono text-muted">3+ YOE</span>
                </div>

                <div className="flex items-baseline gap-2 my-6">
                  <span className="text-5xl sm:text-6xl font-extrabold font-mono text-foreground">
                    ${billingCycle === "monthly" ? "99" : "79"}
                  </span>
                  <span className="text-sm font-mono text-muted">/ month</span>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-8">
                  For mid-level, senior engineers, and architects looking for $140k–$250k+ packages with compensation leverage.
                </p>

                <div className="space-y-3 text-xs font-mono text-foreground border-t border-border-subtle pt-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-cyan-bright shrink-0" />
                    <span><strong>250+ High-Fit Applications</strong> per month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-cyan-bright shrink-0" />
                    <span><strong>5+ Senior Tech Interviews Guaranteed</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-cyan-bright shrink-0" />
                    <span>Direct Hiring Manager InMail Outreach</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-cyan-bright shrink-0" />
                    <span>AI Offer Negotiation &amp; Equity Copilot</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-cyan-bright shrink-0" />
                    <span>Current Employer Blacklist Protection</span>
                  </div>
                </div>
              </div>

              <div className="pt-10">
                <Link
                  href="/onboarding"
                  className="btn-primary-glow w-full text-center text-xs py-3.5 justify-center"
                >
                  Launch Professional Plan ($99)
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. REALISTIC CANDIDATE TIMELINES (Social Proof)                           */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 max-w-6xl mx-auto px-6">
        <div
          ref={testimonialReveal.ref}
          className={`reveal-init ${testimonialReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <div className="max-w-3xl mb-16">
            <span className="text-eyebrow-telemetry block mb-3">Verified Candidate Cycles</span>
            <h2 className="text-display-section text-foreground">
              Real career trajectories. <br />
              <span className="text-muted font-normal">Measurable compensation shifts.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="glass-surface p-8 rounded-3xl border border-border-subtle space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-300 font-semibold">Timeline: 21 Days</span>
                <span className="font-mono text-xs text-emerald-400 font-bold">+$95k Package</span>
              </div>
              <p className="text-sm text-foreground font-semibold">
                Electrical Engineer $\to$ Associate SWE @ Datadog
              </p>
              <p className="text-xs text-muted leading-relaxed">
                &quot;Graduated in May 2026 with 300+ manual rejections. ReverseRecruit re-engineered my embedded projects into cloud backend metrics and secured 4 screenings within 3 weeks.&quot;
              </p>
              <div className="pt-4 border-t border-border-subtle text-xs font-mono text-muted">
                Alex Chen • University 2026 Grad
              </div>
            </div>

            <div className="glass-surface p-8 rounded-3xl border border-border-subtle space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-300 font-semibold">Timeline: 28 Days</span>
                <span className="font-mono text-xs text-emerald-400 font-bold">+$175k Comp</span>
              </div>
              <p className="text-sm text-foreground font-semibold">
                Mid SWE $\to$ Staff Platform Architect @ Stripe
              </p>
              <p className="text-xs text-muted leading-relaxed">
                &quot;The dual-channel InMail dispatch got me directly in front of the VP of Engineering. The negotiation copilot helped me bump the base salary by $24,000.&quot;
              </p>
              <div className="pt-4 border-t border-border-subtle text-xs font-mono text-muted">
                Marcus T. • 4 Years Experience
              </div>
            </div>

            <div className="glass-surface p-8 rounded-3xl border border-border-subtle space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-300 font-semibold">Timeline: 18 Days</span>
                <span className="font-mono text-xs text-emerald-400 font-bold">6 Interviews</span>
              </div>
              <p className="text-sm text-foreground font-semibold">
                Frontend Dev $\to$ Product Architect @ Linear
              </p>
              <p className="text-xs text-muted leading-relaxed">
                &quot;The LinkedIn SEO optimizer caused inbound recruiter inquiries to 4x within a week. I had multiple competing offers on the table.&quot;
              </p>
              <div className="pt-4 border-t border-border-subtle text-xs font-mono text-muted">
                Priya R. • Remote Global
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CONTRAST FINALE CALL TO ACTION                                         */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-36 relative overflow-hidden text-center hairline-t">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/30 via-transparent to-transparent pointer-events-none -z-10" />
        <div
          ref={finaleReveal.ref}
          className={`max-w-4xl mx-auto px-6 reveal-init ${finaleReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <span className="text-eyebrow-telemetry block mb-4">Ready for Departure</span>
          <h2 className="text-display-hero text-foreground mb-8">
            Your career engine is ready to deploy.
          </h2>
          <p className="text-subhead-lead max-w-xl mx-auto mb-12 text-muted">
            Join software engineers landing verified interviews at top tech companies. Backed by our 5-interview guarantee.
          </p>
          <Link
            href="/onboarding"
            className="btn-primary-glow text-base py-4 px-10"
          >
            <span>Activate My Career Engine ($20 / $99)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
