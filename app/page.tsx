"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Send, 
  FileText, 
  Target, 
  Briefcase, 
  Award, 
  Users, 
  Bot, 
  ChevronRight,
  Star,
  DollarSign,
  Search,
  Building2,
  RefreshCw,
  Percent
} from "lucide-react";
import { initialJobs } from "@/lib/mock-data";

export default function LandingPage() {
  // ATS Scanner Lead Magnet State
  const [targetRole, setTargetRole] = useState("Full Stack Engineer");
  const [sampleResume, setSampleResume] = useState(
    "Full Stack Developer with experience in React, TypeScript, Node.js, and PostgreSQL. Built web apps, integrated REST APIs, and managed Git repositories."
  );
  const [sampleJd, setSampleJd] = useState(
    "Looking for a Full Stack Engineer with 2+ years experience in React, Next.js, TypeScript, PostgreSQL, and Docker. Experience with microservices, high-traffic APIs, and CI/CD pipelines preferred."
  );
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    matched: string[];
    missing: string[];
    summary: string;
  } | null>(null);

  // Pricing toggle (monthly vs quarterly discount)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");

  const runAtsScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setAtsScore(74);
      setScanResult({
        matched: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST APIs"],
        missing: ["Next.js", "Docker", "Microservices", "CI/CD Pipelines"],
        summary: "Your baseline resume matches 74% of keywords. With ReverseRecruit's AI tailoring, we will inject high-impact metric rewrites to push this match score to 95%+ before auto-dispatching.",
      });
      setIsScanning(false);
    }, 900);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Glow / Gradient Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[128px] animate-glow" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[128px] animate-glow delay-1000" />
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Floating Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md shadow-inner">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>The #1 Reverse Recruiting SaaS for Tech</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          Land <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">5+ Tech Interviews</span> on Autopilot. Guaranteed.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          The job market is brutal. Stop spending 4 hours a day applying into black-hole portals. We find, tailor, and apply to <span className="text-white font-semibold">150+ verified roles</span> on your behalf and message hiring managers directly until you land your dream job.
        </p>

        {/* Hero CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl hover:opacity-95 shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group"
          >
            <span>Start My Job Autopilot</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#ats-scanner"
            className="w-full sm:w-auto px-6 py-4 text-base font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Target className="h-4 w-4 text-blue-400" />
            <span>Try Free ATS Matcher</span>
          </a>
        </div>

        {/* Social Proof & Guarantee Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400 font-medium pt-4 border-t border-slate-800/60 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span><strong>5 Minimum Interviews</strong> or 100% Refund</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-400" />
            <span>Dual-Channel ATS + Direct InMail</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            <span>$20 Students / $99 Professionals</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HOW IT WORKS (3-STEP ENGINE) */}
      {/* ========================================================================= */}
      <section className="py-20 border-y border-slate-800/60 bg-slate-900/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 block">
              The Reverse Recruiting System
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How We Turn 150 Applications Into 5+ Finalist Interviews
            </h2>
            <p className="text-slate-400 mt-4 text-sm sm:text-base">
              Traditional spray-and-pray job boards convert at less than 1%. Our three-layer agency workflow guarantees high-impact conversion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800 relative hover:border-blue-500/40 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6 font-bold text-lg group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                JD-Aware ATS Sourcing
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                We monitor direct Greenhouse, Lever, and Ashby career feeds within 24 hours of posting, filtering out stale aggregator listings.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Only fresh roles (&lt; 48 hours old)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Work auth &amp; location filtered</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800 relative hover:border-indigo-500/40 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 font-bold text-lg group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                AI Resume Tailoring per Job
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                For every single application, Gemini AI rewrites your project bullets using the Google XYZ formula to match required ATS keywords with 0 hallucinations.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> 95%+ ATS keyword compatibility</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Tailored 3-paragraph cover letter</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800 relative hover:border-purple-500/40 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-6 font-bold text-lg group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Dual-Channel Dispatch &amp; Tracking
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                We submit the application directly into the ATS portal AND send a direct 3-sentence cold pitch to the hiring manager on LinkedIn.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Direct recruiter inbox connection</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Live Kanban status tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE LEAD MAGNET: FREE ATS SCANNER */}
      {/* ========================================================================= */}
      <section id="ats-scanner" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Bot className="h-3.5 w-3.5" />
              <span>Interactive Lead Magnet Tool</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Test Your Resume ATS Score Free
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              See how modern applicant tracking systems score your profile against actual job requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Input Side */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Role Title
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Full Stack Engineer, Cloud DevOps, AI Engineer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Current Resume Summary / Skills
                </label>
                <textarea
                  rows={4}
                  value={sampleResume}
                  onChange={(e) => setSampleResume(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Sample Target Job Description (JD)
                </label>
                <textarea
                  rows={4}
                  value={sampleJd}
                  onChange={(e) => setSampleJd(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={runAtsScan}
                disabled={isScanning}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Analyzing ATS Compatibility...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Calculate Live Match Score</span>
                  </>
                )}
              </button>
            </div>

            {/* Results Side */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800">
              {atsScore !== null && scanResult ? (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 font-medium">Estimated ATS Score</span>
                      <h4 className="text-2xl font-bold text-white">{targetRole}</h4>
                    </div>
                    <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col items-center justify-center">
                      <span className="text-2xl font-extrabold text-amber-400">{atsScore}%</span>
                      <span className="text-[10px] text-amber-300 font-semibold uppercase">Fair Match</span>
                    </div>
                  </div>

                  {/* Matched & Missing Keywords */}
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1.5">
                        ✓ Keywords Matched in Resume ({scanResult.matched.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {scanResult.matched.map((kw) => (
                          <span key={kw} className="px-2.5 py-1 text-xs rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block mb-1.5">
                        ✗ Missing Critical Keywords ({scanResult.missing.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {scanResult.missing.map((kw) => (
                          <span key={kw} className="px-2.5 py-1 text-xs rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <p className="font-medium text-slate-200 mb-1">💡 ReverseRecruit Optimization Action:</p>
                    {scanResult.summary}
                  </div>

                  <Link
                    href="/onboarding"
                    className="block text-center w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 shadow-md transition-opacity"
                  >
                    Unlock Autopilot Applications for $20 $\to$
                  </Link>
                </div>
              ) : (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 text-slate-500">
                  <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center mb-3 text-slate-400">
                    <Search className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-400">Click &quot;Calculate Live Match Score&quot; to test your profile</p>
                  <p className="text-xs text-slate-500 max-w-xs mt-1">
                    We will parse required vs. missing keywords and show how our agency boosts your interview conversion rate.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LIVE PIPELINE PREVIEW (KANBAN DEMO) */}
      {/* ========================================================================= */}
      <section className="py-20 border-t border-slate-800/60 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 block">
                Candidate Control Center
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Live Transparency at Every Step
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Watch applications move from ATS dispatch to scheduled interviews in real time with our live Kanban pipeline.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300"
            >
              <span>Explore Live Dashboard</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Kanban Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Column 1: Applied */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-bold uppercase text-blue-400">1. Applied (150+)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/10 text-blue-400 font-mono">Synced</span>
              </div>
              <div className="space-y-2.5">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Datadog</span>
                    <span className="text-[10px] text-emerald-400 font-mono">92% ATS</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Associate Software Engineer</p>
                  <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1">
                    <Building2 className="h-3 w-3" /> Lever Portal • 1-Click Dispatched
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Linear</span>
                    <span className="text-[10px] text-emerald-400 font-mono">96% ATS</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Frontend Architect</p>
                  <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1">
                    <Building2 className="h-3 w-3" /> Ashby Direct • Recruiter InMail Sent
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Screening */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-bold uppercase text-amber-400">2. Recruiter Screen</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-400 font-mono">Active</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-amber-500/30">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>Linear</span>
                  <span className="text-[10px] text-amber-400 font-mono">Thursday</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Phone Screen w/ Talent Lead</p>
                <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1">
                  ✓ AI Company Cheat Sheet Ready
                </div>
              </div>
            </div>

            {/* Column 3: Interview Scheduled */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-bold uppercase text-purple-400">3. Technical Round</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500/10 text-purple-400 font-mono">Confirmed</span>
              </div>
              <div className="space-y-2.5">
                <div className="p-3 rounded-lg bg-slate-950 border border-purple-500/30">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Stripe</span>
                    <span className="text-[10px] text-purple-400 font-mono">Aug 22</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Architecture &amp; System Design</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-purple-500/30">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Vercel</span>
                    <span className="text-[10px] text-purple-400 font-mono">Aug 24</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">AI Ecosystem Live Coding</p>
                </div>
              </div>
            </div>

            {/* Column 4: Offer Received */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 bg-emerald-950/10">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30 mb-3">
                <span className="text-xs font-bold uppercase text-emerald-400">4. Offer Secured 🎉</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">Offer</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-emerald-500/40">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>Retool</span>
                  <span className="text-[10px] text-emerald-400 font-mono">$165k Base</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Full Stack Engineer</p>
                <div className="mt-2 text-[10px] text-blue-400 font-medium">
                  → AI Negotiation Script Generated
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PRICING SECTION ($20 STUDENT vs $99 PROFESSIONAL) */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 block">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Accessible for Students. Powerful for Pros.
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            No hidden costs. 100% money-back guarantee if we do not land you a minimum of 5 qualified tech interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* TIER 1: STUDENT / FRESHER ($20) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Student &amp; Fresher Tier
                </span>
                <span className="text-xs text-slate-400 font-medium">0–2 Years Experience</span>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-extrabold text-white">$20</span>
                <span className="text-sm text-slate-400">/ month</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Tailored specifically for university students, recent 2024–2026 grads, and early-career switchers struggling to break into the tech market.
              </p>

              <div className="space-y-3 pt-6 border-t border-slate-800 mb-8 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                  <span><strong>150+ Verified Job Applications</strong> submitted per month</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                  <span><strong>Guaranteed 3 to 5 Tech Interviews</strong> or full refund</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                  <span><strong>Dynamic ATS Resume Tailoring</strong> with 0 hallucinations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                  <span><strong>LinkedIn Profile &amp; Headline SEO</strong> upgrade</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                  <span><strong>Live Kanban Application Dashboard</strong> &amp; email sync</span>
                </div>
              </div>
            </div>

            <Link
              href="/onboarding"
              className="w-full py-4 text-center text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 transition-all block"
            >
              Get Started for $20/mo
            </Link>
          </div>

          {/* TIER 2: IT PROFESSIONAL / SWITCHER ($99) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950/40 border-2 border-indigo-500/50 shadow-2xl shadow-indigo-500/10 flex flex-col justify-between relative">
            
            {/* Best Value Tag */}
            <div className="absolute -top-3.5 right-8 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md">
              Most Popular for Switchers
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  IT Professional &amp; Career Switcher
                </span>
                <span className="text-xs text-slate-400 font-medium">3+ Years Experience</span>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-extrabold text-white">$99</span>
                <span className="text-sm text-slate-400">/ month</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Designed for experienced engineers, team leads, and architects aiming for $120k–$250k+ salary packages without burning personal hours.
              </p>

              <div className="space-y-3 pt-6 border-t border-slate-800 mb-8 text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span><strong>250+ High-Fit Applications</strong> per month</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span><strong>Guaranteed 5+ Senior Tech Interviews</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span><strong>Direct Recruiter &amp; Hiring Manager InMail</strong> outreach</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span><strong>AI Offer Negotiation Copilot</strong> (aim for +$15k-$30k comp)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span><strong>Company Blacklist Protection</strong> (never applies to your employer)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span><strong>Priority Dedicated Reverse Recruiter</strong> review</span>
                </div>
              </div>
            </div>

            <Link
              href="/onboarding"
              className="w-full py-4 text-center text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:opacity-95 rounded-xl shadow-xl shadow-indigo-600/30 transition-all block"
            >
              Get Started for $99/mo
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. VERIFIED TESTIMONIALS */}
      {/* ========================================================================= */}
      <section className="py-20 border-t border-slate-800/60 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 block">
              Success Stories
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              From 0 Responses to Multiple Competing Offers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                &quot;I graduated in May 2026 and applied to over 300 jobs manually with zero calls. I joined the $20 Student plan, and within 3 weeks I had 4 screening calls and landed an Associate SWE offer at $95k!&quot;
              </p>
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Alex C.</p>
                  <p className="text-[11px] text-slate-400">New Grad SWE @ Datadog</p>
                </div>
                <span className="text-emerald-400 font-semibold font-mono">+$95k Offer</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                &quot;Working a 50-hour week as a senior engineer left me zero time to write custom cover letters or hunt Greenhouse boards. ReverseRecruit landed me 6 interviews and the negotiation copilot helped me bump my base by $22,000.&quot;
              </p>
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Marcus T.</p>
                  <p className="text-[11px] text-slate-400">Senior Full Stack @ Stripe</p>
                </div>
                <span className="text-emerald-400 font-semibold font-mono">+$175k Comp</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                &quot;The LinkedIn optimizer alone completely changed my profile views. Recruiters started messaging ME, and the automated applications covered all the top remote roles before they were flooded.&quot;
              </p>
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Priya R.</p>
                  <p className="text-[11px] text-slate-400">Frontend Engineer @ Linear</p>
                </div>
                <span className="text-emerald-400 font-semibold font-mono">5 Interviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. BOTTOM CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-blue-900/80 via-indigo-900/80 to-purple-900/80 border border-blue-500/30 shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
              Stop Applying Alone. Let Us Land Your Next 5 Interviews.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
              Join today for just $20 (Students) or $99 (IT Professionals). Zero risk with our 100% money-back interview guarantee.
            </p>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-xl transition-all hover:scale-105"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-4 w-4 text-slate-900" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
