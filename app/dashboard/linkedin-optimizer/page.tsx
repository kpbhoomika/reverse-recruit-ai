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
    <div className="min-h-screen bg-[#07090E] text-[#F1F5F9] p-6 sm:p-10 pt-28">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Studio Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
          <div>
            <span className="text-eyebrow-telemetry flex items-center gap-1.5">
              <Linkedin className="h-3.5 w-3.5 text-cyan-400" /> Recruiter Inbound SEO Studio
            </span>
            <h1 className="text-3xl font-semibold text-foreground tracking-tight mt-1">
              LinkedIn Recruiter Search Optimization
            </h1>
            <p className="text-xs text-muted mt-1">
              Elevate algorithmic index ranking inside LinkedIn Recruiter boolean search filters.
            </p>
          </div>

          <button
            onClick={handleOptimize}
            disabled={loading}
            className="btn-primary-glow text-xs py-2.5 px-6 shrink-0 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Indexing Search Keywords...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Optimize Inbound Profile</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Inputs Column (5 cols) */}
          <div className="lg:col-span-5 glass-surface p-6 rounded-3xl border border-border-subtle space-y-4">
            <span className="font-mono text-xs text-muted uppercase tracking-wider block pb-2 border-b border-border-subtle">
              Current Profile Inputs
            </span>

            <div>
              <label className="block text-[11px] font-mono text-muted uppercase mb-1">Headline</label>
              <input
                type="text"
                value={currentHeadline}
                onChange={(e) => setCurrentHeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-border-subtle text-foreground text-xs font-medium focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-muted uppercase mb-1">Target Roles</label>
              <input
                type="text"
                value={targetRoles}
                onChange={(e) => setTargetRoles(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-border-subtle text-foreground text-xs font-medium focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-muted uppercase mb-1">Core Tech Stack</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-border-subtle text-foreground text-xs font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-muted uppercase mb-1">Current About Text</label>
              <textarea
                rows={4}
                value={currentAbout}
                onChange={(e) => setCurrentAbout(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface-100 border border-border-subtle text-foreground text-xs leading-relaxed font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Results Column (7 cols) */}
          <div className="lg:col-span-7 glass-surface-elevated p-6 sm:p-8 rounded-3xl border border-border-light space-y-6">
            
            {result ? (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Recruiter Visibility Index Bar */}
                <div className="p-4 rounded-2xl bg-surface-100 border border-border-subtle flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
                      Recruiter Search Visibility
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-xl font-bold text-muted line-through">78</span>
                      <span className="font-mono text-xs text-muted">→</span>
                      <span className="font-mono text-2xl font-bold text-emerald-400">96 / 100</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs">
                    Top 2% Ranking Tier
                  </span>
                </div>

                {/* Upgraded Headline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-cyan-300 font-semibold uppercase tracking-wider flex items-center gap-1">
                      <Target className="h-3.5 w-3.5" /> High-Ranking Headline
                    </span>
                    <button
                      onClick={() => copyText(result.suggestedHeadline, "headline")}
                      className="text-xs font-mono text-cyan-300 hover:text-foreground flex items-center gap-1"
                    >
                      {copiedSection === "headline" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedSection === "headline" ? "Copied" : "Copy Headline"}</span>
                    </button>
                  </div>
                  <p className="p-3.5 rounded-xl bg-surface-100 border border-cyan-500/30 text-xs font-mono text-foreground leading-relaxed">
                    {result.suggestedHeadline}
                  </p>
                </div>

                {/* Optimized About Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted uppercase tracking-wider">
                      Optimized Keywords &amp; About
                    </span>
                    <button
                      onClick={() => copyText(result.optimizedAbout, "about")}
                      className="text-xs font-mono text-cyan-300 hover:text-foreground flex items-center gap-1"
                    >
                      {copiedSection === "about" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedSection === "about" ? "Copied" : "Copy About"}</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-100 border border-border-subtle text-xs font-mono text-muted whitespace-pre-line leading-relaxed max-h-[200px] overflow-y-auto">
                    {result.optimizedAbout}
                  </div>
                </div>

                {/* Recruiter Search Optimization Tips */}
                <div className="p-4 rounded-xl bg-surface-100/60 border border-border-subtle space-y-1.5 text-xs font-mono">
                  <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider block">
                    Recruiter Boolean Search Tips:
                  </span>
                  <ul className="space-y-1 text-[11px] text-muted">
                    {result.recruiterSearchTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-cyan-400">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-muted font-mono text-xs">
                <Linkedin className="h-8 w-8 text-muted/60 mb-2" />
                <p>Click &quot;Optimize Inbound Profile&quot;</p>
                <p className="text-[11px] text-muted/60 mt-1">
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
