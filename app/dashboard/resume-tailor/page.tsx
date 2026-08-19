"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Terminal,
  FileCode
} from "lucide-react";
import { ATSAnalysisResult } from "@/lib/types";

export default function ResumeTailorPage() {
  const [targetRole, setTargetRole] = useState("Staff Backend Engineer");
  const [jobDescription, setJobDescription] = useState(
    `We are seeking a Staff Backend Engineer to scale distributed transaction systems. Required: Go, Kubernetes, Kafka, PostgreSQL, gRPC, and high-throughput low-latency microservices architecture.`
  );
  const [resumeText, setResumeText] = useState(
    `Software Engineer with 4 years experience in Go, Python, PostgreSQL, and AWS. Built backend services, optimized database queries, integrated APIs, and deployed containers.`
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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 pt-28">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Studio Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-blue-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5" /> ATS Resume Tailor Studio
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Zero-Hallucination Keyword Tailor
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Split-view editor that realigns real project metrics to match job requirements using Google XYZ format.
            </p>
          </div>

          <button
            onClick={handleTailor}
            disabled={loading}
            className="btn-brand-gradient text-xs py-2.5 px-6 shrink-0 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Aligning Keywords...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Tailor Resume</span>
              </>
            )}
          </button>
        </div>

        {/* Input Parameters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
              Employer Job Description
            </label>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 text-xs leading-relaxed font-mono focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
              Target Role Title
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-blue-500 transition-colors mb-2"
            />
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>ATS Parser Mode: High-Concurrency Tier (Greenhouse &amp; Lever)</span>
            </div>
          </div>
        </div>

        {/* Split Screen AI Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Pane: Original Resume */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-bold">
                Original Experience Source
              </span>
              <span className="text-xs font-mono text-slate-500">Raw Text</span>
            </div>

            <textarea
              rows={12}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed font-mono focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Right Pane: AI-Optimized Realignment */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-mono text-xs text-blue-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Tailored Output
              </span>
              {result && (
                <span className="font-mono text-xs text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  {result.matchScore}% Match Index
                </span>
              )}
            </div>

            {result ? (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Tailored Executive Summary
                    </span>
                    <button
                      onClick={() => copyToClipboard(result.tailoredSummary)}
                      className="text-xs font-mono text-blue-400 hover:text-white flex items-center gap-1"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <p className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono">
                    {result.tailoredSummary}
                  </p>
                </div>

                {/* XYZ Bullet Points */}
                <div className="space-y-3">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Rewritten Metric Bullet Points (Google XYZ)
                  </span>

                  {result.tailoredBulletPoints.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-semibold text-emerald-400">
                          ✓ Aligned Metric {idx + 1}
                        </span>
                        <button
                          onClick={() => copyToClipboard(bullet.improved)}
                          className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                        >
                          <Copy className="h-3 w-3" /> Copy
                        </button>
                      </div>

                      <p className="text-slate-200 font-mono leading-relaxed">
                        {bullet.improved}
                      </p>

                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-0.5">
                        <span className="font-mono text-blue-400 font-semibold block">
                          Reasoning:
                        </span>
                        <p>{bullet.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500 font-mono text-xs">
                <FileCode className="h-8 w-8 text-slate-700 mb-2" />
                <p>Click &quot;Tailor Resume&quot; to parse keywords</p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Generates machine-validated bullet points aligned to job spec.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
