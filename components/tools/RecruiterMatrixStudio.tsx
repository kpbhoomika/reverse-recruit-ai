"use client";

import { useState } from "react";
import { 
  Sparkles, 
  RefreshCw, 
  Search, 
  Check, 
  Copy, 
  UserCheck, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  Target, 
  ExternalLink,
  Zap,
  Tag,
  Briefcase
} from "lucide-react";
import { RecruiterKeywordResult } from "@/lib/types";

const defaultJobDescription = `We are seeking a Senior / Staff Backend Engineer to scale our distributed core platform.
Requirements:
• 5+ years building distributed backend services with Go (Golang) and microservices architecture.
• Strong experience with Kubernetes, Docker, and AWS cloud infrastructure.
• Production mastery of PostgreSQL, Redis caching, and Kafka or RabbitMQ event-driven messaging.
• Familiarity with gRPC, GraphQL, CI/CD automation, and high-concurrency rate limiting.
• Track record of scaling systems to millions of daily active users with 99.99% uptime.`;

const defaultResume = `Senior Backend Engineer with 4 years of experience specializing in Go, Python, and PostgreSQL. Built scalable REST APIs and managed Docker containers on AWS. Optimized SQL query indexes and reduced server response latency. Experience with Git, GitHub Actions, and Redis caching.`;

export default function RecruiterMatrixStudio({ initialEmbedded = false }: { initialEmbedded?: boolean }) {
  const [roleTitle, setRoleTitle] = useState("Staff Backend Engineer");
  const [jobDescription, setJobDescription] = useState(defaultJobDescription);
  const [resumeText, setResumeText] = useState(defaultResume);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecruiterKeywordResult | null>(null);
  const [copiedQuery, setCopiedQuery] = useState(false);

  const handleRunMatrix = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/recruiter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription, roleTitle }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Recruiter Matrix error:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyBooleanQuery = () => {
    if (!result?.booleanSearchQuery) return;
    navigator.clipboard.writeText(result.booleanSearchQuery);
    setCopiedQuery(true);
    setTimeout(() => setCopiedQuery(false), 2000);
  };

  return (
    <div className={`w-full ${initialEmbedded ? "" : "max-w-6xl mx-auto space-y-8"}`}>
      {/* Header Banner */}
      {!initialEmbedded && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-indigo-400 uppercase font-bold tracking-wider flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                <UserCheck className="h-3.5 w-3.5" /> Recruiter Cross-Reference Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
              Recruiter Keyword Matrix &amp; Boolean Sourcing Lens
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Cross-references candidate experience against real employer job specs to reveal missing boolean filters, keyword gaps, and recruiter rank.
            </p>
          </div>

          <button
            onClick={handleRunMatrix}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs tracking-wide shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Simulating Recruiter Sourcing...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>Run Recruiter Match</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Inputs */}
        <div className={`${result ? "lg:col-span-5" : "lg:col-span-12"} space-y-4`}>
          <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                Target Role
              </label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                Real Employer Job Description
              </label>
              <textarea
                rows={initialEmbedded ? 4 : 6}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-indigo-500 transition-colors resize-y"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                Candidate Resume / Master Experience
              </label>
              <textarea
                rows={initialEmbedded ? 4 : 6}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-indigo-500 transition-colors resize-y"
              />
            </div>

            <button
              onClick={handleRunMatrix}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Comparing Semantic Vectors &amp; Boolean Strings...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Cross-Reference Resume vs Job Spec</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output */}
        {result && (
          <div className="lg:col-span-7 space-y-6 animate-fadeIn">
            
            {/* Top Recruiter Telemetry Card */}
            <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl relative overflow-hidden space-y-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    Recruiter Sourcing Match
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-4xl sm:text-5xl font-black font-mono text-white">
                      {result.matchPercentage}%
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/25">
                      {result.recruiterVerdict}
                    </span>
                  </div>
                </div>

                <div className="text-right sm:text-right space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Candidate Pool Rank</span>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Zap className="h-3 w-3" />
                    <span>Top {100 - result.competitivePercentile}% of Applicants</span>
                  </div>
                </div>
              </div>

              {/* Boolean Sourcing Query Box */}
              <div className="p-4 rounded-2xl bg-black/40 border border-indigo-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Search className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="text-[11px] font-mono uppercase font-bold text-indigo-300">
                      Recruiter Boolean Search Query (ATS/LinkedIn)
                    </span>
                  </div>
                  <button
                    onClick={copyBooleanQuery}
                    className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedQuery ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Query</span>
                      </>
                    )}
                  </button>
                </div>
                <code className="block p-3 rounded-xl bg-slate-950 border border-white/5 text-[11px] text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {result.booleanSearchQuery}
                </code>
              </div>

              {/* Matched vs Missing Keywords Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Matched */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Matched Signals ({result.matchedKeywords.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchedKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono flex items-center gap-1"
                      >
                        <span>{kw.keyword}</span>
                        <span className="text-[9px] opacity-60">×{kw.frequencyInJob}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-rose-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase font-bold text-rose-400 flex items-center gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5" /> Missing Keywords ({result.missingKeywords.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1 ${
                          kw.importance === "critical"
                            ? "bg-rose-500/15 text-rose-300 border border-rose-500/30 font-bold"
                            : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                        }`}
                      >
                        <span>{kw.keyword}</span>
                        {kw.importance === "critical" && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-rose-500/30 text-rose-200 uppercase">
                            Required
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Recruiter Strategic Takeaways */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block">
                  Recruiter Scouting Notes &amp; Recommendations
                </span>
                <ul className="space-y-1.5">
                  {result.recruiterTakeaways.map((note, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
