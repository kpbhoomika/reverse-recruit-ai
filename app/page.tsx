"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowRight, 
  CheckCircle2, 
  Bot, 
  FileText, 
  Send, 
  Target,
  Sparkles,
  Check,
  ShieldCheck
} from "lucide-react";
import { useScrollReveal } from "@/lib/use-motion";

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const guaranteeReveal = useScrollReveal();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30 selection:text-white">
      
            {/* Navbar */}
      <nav className="absolute top-0 w-full z-50 px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between max-w-6xl mx-auto left-0 right-0">
        <div className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
          <Bot className="h-6 w-6 text-blue-500" />
          ReverseRecruit
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/onboarding" className="text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all border border-white/10">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[128px]" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[128px]" />
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-28 pb-20 md:pt-40 md:pb-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div
          ref={heroReveal.ref}
          className={`reveal-init ${heroReveal.isVisible ? "reveal-visible" : ""}`}
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md shadow-inner">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Fully Automated Reverse Recruiting</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.05] mb-8">
            The Job Market Is Rigged.<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">We Help You Beat It.</span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-6 leading-relaxed font-normal">
            You are being rejected by algorithms, not humans. We bypass the ATS filters, automate hundreds of flawless applications while you sleep, and pitch hiring managers directly. You just show up to the interview.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold mb-10 text-sm sm:text-base">
            <ShieldCheck className="h-5 w-5" />
            <span>5 confirmed interview invitations or a full refund.</span>
          </div>

          {/* Hero CTA & Trust Indicators */}
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/onboarding"
              className="btn-brand-gradient text-base sm:text-lg py-4 px-10 rounded-2xl inline-flex items-center gap-2"
            >
              <span>Try 3 Free Applications</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <div className="flex items-center gap-6 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Zero Manual Work</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Bypasses ATS Filters</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HOW IT WORKS (Features) */}
      {/* ========================================================================= */}
      <section className="relative py-20 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">How ReverseRecruit Automates Your Search</h2>
            <p className="text-slate-400">You fill out one form. Our bots do the rest while you sleep.</p>
          </div>

          <div 
            ref={featuresReveal.ref}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-init ${featuresReveal.isVisible ? "reveal-visible" : ""}`}
          >
            {/* Feature 1 */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl hover:border-blue-500/50 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">1. AI Matching Engine</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We scrape Greenhouse, Lever, and private remote boards daily to find the top 1% of jobs that fit your exact skills and salary requirements.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl hover:border-indigo-500/50 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <FileText className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">2. ATS Resume Tailoring</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                For every single application, our AI rewrites your resume using exact keywords from the job description so you score 90%+ in the ATS scanner.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl hover:border-purple-500/50 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                <Bot className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">3. Automated Bot Submit</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Our headless browser bots automatically navigate to the job post, fill out the complex forms, upload your tailored PDF, and submit it.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl hover:border-emerald-500/50 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Send className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">4. Recruiter Outreach</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Immediately after applying, the system drafts and sends a highly personalized cold-email pitch directly to the hiring manager to get you noticed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PRICING & GUARANTEE */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={guaranteeReveal.ref}
          className={`reveal-init ${guaranteeReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Pricing that guarantees results.</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              Stop wasting hours filling out forms. Let the AI do the heavy lifting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Student Plan ($20) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                    Student & Fresher
                  </span>
                </div>

                <div className="flex items-baseline gap-2 my-6">
                  <span className="text-5xl font-extrabold text-white">$20</span>
                  <span className="text-sm text-slate-400">/ month</span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-8">
                  Designed for recent graduates breaking into the tech market.
                </p>

                <div className="space-y-3 text-xs text-slate-200 border-t border-slate-800 pt-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-blue-400 shrink-0" />
                    <span><strong>150+ Verified Applications</strong> per month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-blue-400 shrink-0" />
                    <span><strong>3 Guaranteed Interviews</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>Dynamic ATS Resume Keyword Tailoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>Live Pipeline Telemetry Dashboard</span>
                  </div>
                </div>
              </div>

              <div className="pt-10">
                <Link
                  href="/onboarding"
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center block transition-colors"
                >
                  Start Student Plan ($20)
                </Link>
              </div>
            </div>

            {/* IT Pro Plan ($99) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-indigo-500/50 flex flex-col justify-between relative shadow-2xl shadow-indigo-500/10">
              <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                Most Popular
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-indigo-400 font-bold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                    Professional
                  </span>
                </div>

                <div className="flex items-baseline gap-2 my-6">
                  <span className="text-5xl font-extrabold text-white">$99</span>
                  <span className="text-sm text-slate-400">/ month</span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-8">
                  For experienced engineers. Includes our strict refund guarantee.
                </p>

                <div className="space-y-3 text-xs text-slate-200 border-t border-slate-800 pt-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span><strong>250+ High-Fit Applications</strong> per month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span><strong>5+ Interviews Guaranteed OR FULL REFUND</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Direct Hiring Manager Cold-Email Outreach</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Current Employer Blacklist Protection</span>
                  </div>
                </div>
              </div>

              <div className="pt-10">
                <Link
                  href="/onboarding"
                  className="btn-brand-gradient w-full py-3.5 rounded-xl text-center block text-sm font-bold shadow-lg shadow-indigo-600/30"
                >
                  Start Professional Plan ($99)
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FINALE CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Ready to Beat the Rigged Market?
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-10 text-base">
          Join software engineers landing verified interviews at top tech companies. Backed by our 5-interview guarantee.
        </p>
        <Link
          href="/onboarding"
          className="btn-brand-gradient text-base font-bold py-4 px-10 rounded-2xl inline-flex items-center gap-2 shadow-xl shadow-blue-600/20"
        >
          <span>Launch Autopilot</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>

    </div>
  );
}

