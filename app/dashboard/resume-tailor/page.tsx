"use client";

import { useState } from "react";
import { 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  RefreshCw, 
  Download,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import { ATSAnalysisResult } from "@/lib/types";

export default function ResumeTailorPage() {
  const [targetRole, setTargetRole] = useState("Full Stack Software Engineer");
  const [jobDescription, setJobDescription] = useState(
    `We are seeking a Full Stack Software Engineer to build scalable microservices and customer-facing dashboards. Required: React, Next.js, TypeScript, Node.js, PostgreSQL, REST APIs. Preferred: Docker, Kubernetes, GraphQL, and AWS cloud deployment.`
  );
  const [resumeText, setResumeText] = useState(
    `Software Engineer with 3 years experience in React, TypeScript, Node.js, and PostgreSQL. Built frontend modules, integrated REST APIs, created backend SQL schemas, and improved performance.`
  );

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSAnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleTailor = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/tailor-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole, jobDescription, resumeText }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Failed to tailor resume", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Dynamic Resume Tailor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            100% ATS-Compliant Resume Optimizer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Align real experience with target job descriptions using Google XYZ metrics without hallucinating fake skills.
          </p>
        </div>

        {/* Input Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Role Title
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Job Description (Paste from Greenhouse / Lever / Ashby)
              </label>
              <textarea
                rows={6}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white font-mono text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Candidate Master Resume / Experience Summary
              </label>
              <textarea
                rows={6}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white font-mono text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleTailor}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Tailoring Resume &amp; Scoring ATS...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Tailor Resume for this Job</span>
                </>
              )}
            </button>
          </div>

          {/* Results Output */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            {result ? (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Score Header */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">ATS Match Score</span>
                    <h3 className="text-xl font-bold text-white">High Compatibility</h3>
                  </div>
                  <div className="h-14 w-14 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center">
                    <span className="text-xl font-extrabold text-emerald-400">{result.matchScore}%</span>
                  </div>
                </div>

                {/* Matched & Missing Keywords */}
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                      Matched ATS Keywords ({result.matchedKeywords.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.matchedKeywords.map((kw) => (
                        <span key={kw} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block mb-1">
                      Missing JD Keywords ({result.missingKeywords.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.missingKeywords.map((kw) => (
                        <span key={kw} className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs font-mono">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tailored Summary */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Tailored Executive Summary
                    </span>
                    <button
                      onClick={() => copyToClipboard(result.tailoredSummary)}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <p className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    {result.tailoredSummary}
                  </p>
                </div>

                {/* Tailored Bullet Points */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Tailored Accomplishment Bullets (XYZ Formula)
                  </span>
                  {result.tailoredBulletPoints.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-emerald-400">✓ Upgraded Bullet {idx + 1}</span>
                        <button
                          onClick={() => copyToClipboard(item.improved)}
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                        >
                          <Copy className="h-3 w-3" /> Copy
                        </button>
                      </div>
                      <p className="text-slate-200 font-medium leading-relaxed">{item.improved}</p>
                      <p className="text-[10px] text-slate-500 italic">Why: {item.reason}</p>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <FileText className="h-10 w-10 text-slate-600 mb-3" />
                <p className="text-sm font-medium text-slate-400">Click &quot;Tailor Resume for this Job&quot;</p>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Our AI will align your bullets with the job description for maximum ATS pass-through.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
