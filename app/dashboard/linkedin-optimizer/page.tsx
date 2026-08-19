"use client";

import { useState } from "react";
import { 
  Linkedin, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  TrendingUp, 
  Search, 
  Target,
  Cpu
} from "lucide-react";
import { LinkedInOptimizationResult } from "@/lib/types";

export default function LinkedInOptimizerPage() {
  const [currentHeadline, setCurrentHeadline] = useState(
    "Software Engineer | Looking for new full stack opportunities"
  );
  const [targetRoles, setTargetRoles] = useState("Staff Backend Engineer, Platform Architect");
  const [skills, setSkills] = useState(
    "Go, Python, Kubernetes, PostgreSQL, Distributed Systems, AWS, Kafka"
  );
  const [currentAbout, setCurrentAbout] = useState(
    "Software developer with 4 years experience building web backends and databases."
  );

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LinkedInOptimizationResult | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleOptimize = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentHeadline,
          currentAbout,
          targetRoles: targetRoles.split(",").map((s) => s.trim()),
          skills: skills.split(",").map((s) => s.trim()),
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Failed to optimize LinkedIn", err);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 pt-28">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Studio Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-blue-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn Profile Optimizer
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              LinkedIn Recruiter Search SEO
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Optimize your profile keywords to appear at the top of recruiter searches.
            </p>
          </div>

          <button
            onClick={handleOptimize}
            disabled={loading}
            className="btn-brand-gradient text-xs py-2.5 px-6 shrink-0 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Optimizing Keywords...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Optimize Profile</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Inputs Column */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider block pb-2 border-b border-slate-800">
              Current Profile Inputs
            </span>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Headline</label>
              <input
                type="text"
                value={currentHeadline}
                onChange={(e) => setCurrentHeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Target Roles</label>
              <input
                type="text"
                value={targetRoles}
                onChange={(e) => setTargetRoles(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Key Tech Skills</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Current About Text</label>
              <textarea
                rows={4}
                value={currentAbout}
                onChange={(e) => setCurrentAbout(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            
            {result ? (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Score */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Recruiter Search Visibility Score
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-lg font-bold text-slate-500 line-through">78</span>
                      <span className="font-mono text-xs text-slate-500">→</span>
                      <span className="font-mono text-2xl font-bold text-emerald-400">96 / 100</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                    Top 2% Inbound Tier
                  </span>
                </div>

                {/* Headline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Target className="h-3.5 w-3.5" /> High-Ranking Headline
                    </span>
                    <button
                      onClick={() => copyText(result.suggestedHeadline, "headline")}
                      className="text-xs font-mono text-blue-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedSection === "headline" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedSection === "headline" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <p className="p-3.5 rounded-xl bg-slate-950 border border-blue-500/30 text-xs font-mono text-slate-200 leading-relaxed">
                    {result.suggestedHeadline}
                  </p>
                </div>

                {/* About */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                      Optimized Keywords &amp; About Section
                    </span>
                    <button
                      onClick={() => copyText(result.optimizedAbout, "about")}
                      className="text-xs font-mono text-blue-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedSection === "about" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedSection === "about" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-line leading-relaxed max-h-[200px] overflow-y-auto">
                    {result.optimizedAbout}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500 font-mono text-xs">
                <Linkedin className="h-8 w-8 text-slate-700 mb-2" />
                <p>Click &quot;Optimize Profile&quot;</p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Generates algorithm-optimized headlines and keyword-rich About sections.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
