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
  Award,
  Users,
  Briefcase,
  CheckCircle2,
  RefreshCw,
  Clock,
  ExternalLink
} from "lucide-react";
import { initialJobs } from "@/lib/mock-data";
import { useScrollReveal, useCounter } from "@/lib/use-motion";

export default function LandingPage() {
  // ATS Scanner State
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

  // Pricing toggle
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");

  const heroReveal = useScrollReveal({ threshold: 0.1 });
  const narrativeReveal = useScrollReveal({ threshold: 0.15 });
  const resultReveal = useScrollReveal({ threshold: 0.15 });
  const pricingReveal = useScrollReveal({ threshold: 0.15 });

  const runAtsScan = async () => {
    setIsScanning(true);

    try {
      // 1. Try calling the live AI backend
      const response = await fetch("/api/ai/tailor-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole,
          jobDescription: sampleJd,
          resumeText: sampleResume,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.matchedKeywords && data.missingKeywords) {
          setAtsScore(data.matchScore || 85);
          setScanResult({
            matched: data.matchedKeywords,
            missing: data.missingKeywords,
            summary: data.tailoredSummary || `Your baseline experience matches ${data.matchScore}% of core requirements for ${targetRole}. ReverseRecruit will inject tailored metrics before auto-dispatching.`,
          });
          setIsScanning(false);
          return;
        }
      }
    } catch (e) {
      console.log("Using dynamic client-side tokenizer fallback...");
    }

    // 2. Dynamic Real-time Client-Side Tokenizer Fallback
    const stopWords = new Set([
      "and", "the", "with", "for", "are", "you", "will", "have", "from", "that", "this",
      "looking", "seeking", "experience", "years", "preferred", "plus", "must", "work",
      "team", "role", "our", "their", "able", "skills", "knowledge", "required", "join"
    ]);

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const resumeTokens = sampleResume
      .toLowerCase()
      .replace(/[^a-z0-9+#.\s,-]/g, " ")
      .split(/[,\s]+/)
      .map(t => t.trim())
      .filter(t => t.length >= 3 && !stopWords.has(t));
    const resumeTokenSet = new Set<string>(resumeTokens);

    const jdTokens = sampleJd
      .toLowerCase()
      .replace(/[^a-z0-9+#.\s,-]/g, " ")
      .split(/[,\s]+/)
      .map(t => t.trim())
      .filter(t => t.length >= 3 && !stopWords.has(t));
    const uniqueJdTokens = Array.from(new Set(jdTokens));

    const matchedRaw = uniqueJdTokens.filter(t => {
      const regex = new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      return resumeTokenSet.has(t) || regex.test(sampleResume);
    });

    const missingRaw = uniqueJdTokens.filter(t => {
      const regex = new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      return !resumeTokenSet.has(t) && !regex.test(sampleResume);
    });

    const matched = matchedRaw.length > 0 
      ? matchedRaw.slice(0, 6).map(capitalize)
      : (resumeTokens.length > 0 ? resumeTokens.slice(0, 4).map(capitalize) : ["General Background"]);

    const missing = missingRaw.length > 0 
      ? missingRaw.slice(0, 6).map(capitalize)
      : [];

    const totalCount = Math.max(1, matched.length + missing.length);
    const calculatedScore = missing.length === 0 && matched.length > 0
      ? 98
      : Math.min(98, Math.max(35, Math.round((matched.length / totalCount) * 100)));

    setTimeout(() => {
      setAtsScore(calculatedScore);
      setScanResult({
        matched,
        missing,
        summary: `Your baseline experience matches ${calculatedScore}% of core requirements for ${targetRole || "this role"}. ${
          missing.length > 0
            ? `ReverseRecruit will tailor your bullet points to highlight ${missing.slice(0, 3).join(", ")} before submitting.`
            : "Strong baseline keyword fit! ReverseRecruit will optimize bullet metrics for maximum interview callback rate."
        }`,
      });
      setIsScanning(false);
    }, 400);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      
      {/* Background Subtle Gradient Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[128px]" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[128px]" />
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Exact layout & copy from screenshot)                    */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div
          ref={heroReveal.ref}
          className={`reveal-init ${heroReveal.isVisible ? "reveal-visible" : ""}`}
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md shadow-inner">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>The #1 Reverse Recruiting SaaS for Tech</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
            Land <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">5+ Tech Interviews on Autopilot.</span> Guaranteed.
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            The job market is brutal. Stop spending 4 hours a day applying into black-hole portals. We find, tailor, and apply to <span className="text-white font-semibold">150+ verified roles</span> on your behalf and message hiring managers directly until you land your dream job.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-12">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl hover:opacity-95 shadow-xl shadow-blue-600/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group"
            >
              <span>Try 3 Applications Free</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#ats-matcher"
              className="w-full sm:w-auto px-6 py-4 text-base font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Target className="h-4 w-4 text-blue-400" />
              <span>Free ATS Keyword Audit</span>
            </a>
          </div>

          {/* Social Proof & Guarantee Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400 font-medium pt-4 border-t border-slate-800/60 max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-400" />
              <span><strong>100% Free Test Drive</strong> (No Card Required)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span><strong>5 Interviews Guaranteed</strong> or Refund</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-400" />
              <span>$20 Students / $99 Professionals</span>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. THE REVERSE RECRUITING SYSTEM (4-Step Workflow)                       */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-slate-900/50 border-t border-b border-slate-800/80 relative">
        <div
          ref={narrativeReveal.ref}
          className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 reveal-init ${narrativeReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-widest block mb-2">
              The Reverse Recruiting System
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              How We Turn 150 Applications Into 5+ Final-Round Interviews
            </h2>
            <p className="text-slate-400 mt-4 text-base">
              A disciplined, multi-channel approach that bypasses black-hole job boards and gets your resume directly into hiring managers&apos; hands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Target Criteria Ingestion</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You set your desired job titles, minimum salary, locations, and blacklist. We only target roles matching 100% of your constraints.
              </p>
              <div className="pt-2 text-[11px] font-mono text-blue-400">Greenhouse &amp; Lever Feeds</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-white">ATS Keyword Realignment</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                For every job posting, we re-order your real project bullet points using Google XYZ metrics to push your match score to 95%+.
              </p>
              <div className="pt-2 text-[11px] font-mono text-indigo-400">0 Hallucination Guarantee</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Dual-Channel Dispatch</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We submit through the verified employer application portal and simultaneously send a 3-sentence intro pitch to the hiring manager on LinkedIn.
              </p>
              <div className="pt-2 text-[11px] font-mono text-purple-400">Direct Manager Outreach</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-4 shadow-lg shadow-emerald-500/5">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="text-lg font-bold text-white">5+ Guaranteed Interviews</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You get interview invites directly on your calendar. Our negotiation copilot helps you benchmark salary percentiles for max comp.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-400 font-bold">100% Refund Backed</div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE ATS COMPATIBILITY MATCHER                                  */}
      {/* ========================================================================= */}
      <section id="ats-matcher" className="py-20 md:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-widest block mb-2">
            Free Tool
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Test Your Resume Against Any Job Spec
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            See how recruiters and ATS filters score your resume keyword alignment in real-time.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Column */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Candidate Master Experience</label>
                <textarea
                  rows={3}
                  value={sampleResume}
                  onChange={(e) => setSampleResume(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Employer Job Specification</label>
                <textarea
                  rows={3}
                  value={sampleJd}
                  onChange={(e) => setSampleJd(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={runAtsScan}
                disabled={isScanning}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Analyzing Keyword Compatibility...</span>
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4" />
                    <span>Run Free ATS Diagnostic</span>
                  </>
                )}
              </button>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Diagnostic Result
                </span>
                <span className="text-xs font-mono font-bold text-blue-400">
                  {atsScore ? `${atsScore}% Match` : "Awaiting Scan"}
                </span>
              </div>

              {scanResult ? (
                <div className="space-y-4 animate-fadeIn text-xs">
                  <div>
                    <span className="font-semibold text-emerald-400 block mb-1.5">
                      ✓ Matched Core Vectors ({scanResult.matched.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {scanResult.matched.map((m) => (
                        <span key={m} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {scanResult.missing.length > 0 ? (
                    <div>
                      <span className="font-semibold text-rose-400 block mb-1.5">
                        ✕ Missing Critical Keywords ({scanResult.missing.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {scanResult.missing.map((m) => (
                          <span key={m} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                      <span>✓ 100% Keyword Coverage — Zero missing core requirements!</span>
                    </div>
                  )}

                  <p className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 leading-relaxed font-sans">
                    {scanResult.summary}
                  </p>
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center text-slate-500 font-mono text-xs">
                  <Target className="h-8 w-8 text-slate-700 mb-2" />
                  <p>Click &quot;Run Free ATS Diagnostic&quot; above</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TRANSPARENT PRICING & ROI MATRIX                                      */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-slate-900/50 border-t border-b border-slate-800/80">
        <div
          ref={pricingReveal.ref}
          className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 reveal-init ${pricingReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-widest block mb-2">
              Simple &amp; Transparent
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              One Interview Pays For The Whole Service
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              Backed by our 100% money-back guarantee if we do not secure minimum 5 qualified interviews.
            </p>

            {/* Pill switch */}
            <div className="inline-flex items-center p-1 rounded-full bg-slate-900 border border-slate-800 mt-8">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly Plan
              </button>
              <button
                onClick={() => setBillingCycle("quarterly")}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  billingCycle === "quarterly"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Quarterly (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Student Plan ($20) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-bold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                    Student &amp; Fresher Tier
                  </span>
                  <span className="text-xs text-slate-400">0–2 YOE</span>
                </div>

                <div className="flex items-baseline gap-2 my-6">
                  <span className="text-5xl font-extrabold text-white">
                    ${billingCycle === "monthly" ? "20" : "16"}
                  </span>
                  <span className="text-sm text-slate-400">/ month</span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-8">
                  Designed for recent graduates and early-career software engineers breaking into the tough tech market.
                </p>

                <div className="space-y-3 text-xs text-slate-200 border-t border-slate-800 pt-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-blue-400 shrink-0" />
                    <span><strong>150+ Verified Applications</strong> per month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-blue-400 shrink-0" />
                    <span><strong>3 to 5 Guaranteed Interviews</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>Dynamic ATS Resume Keyword Realignment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>LinkedIn Profile SEO Optimization</span>
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
                    IT Professional Tier
                  </span>
                  <span className="text-xs text-slate-400">3+ YOE</span>
                </div>

                <div className="flex items-baseline gap-2 my-6">
                  <span className="text-5xl font-extrabold text-white">
                    ${billingCycle === "monthly" ? "99" : "79"}
                  </span>
                  <span className="text-sm text-slate-400">/ month</span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-8">
                  For mid-level and senior engineers looking for $140k–$250k+ roles with compensation leverage.
                </p>

                <div className="space-y-3 text-xs text-slate-200 border-t border-slate-800 pt-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span><strong>250+ High-Fit Applications</strong> per month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span><strong>5+ Senior Tech Interviews Guaranteed</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Direct Hiring Manager InMail Outreach</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>AI Offer Negotiation &amp; Equity Copilot</span>
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
                  className="btn-brand-gradient w-full py-3.5 text-center block text-sm shadow-lg shadow-indigo-600/30"
                >
                  Start Professional Plan ($99)
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FINALE CALL TO ACTION                                                  */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Ready to Land Your Next Tech Role?
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-10 text-base">
          Join software engineers landing verified interviews at top tech companies. Backed by our 5-interview guarantee.
        </p>
        <Link
          href="/onboarding"
          className="btn-brand-gradient text-base py-4 px-10 inline-flex items-center gap-2"
        >
          <span>Launch Autopilot ($20 / $99)</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

    </div>
  );
}
