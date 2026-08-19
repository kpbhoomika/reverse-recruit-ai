"use client";

import { useState } from "react";
import { 
  Linkedin, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  RefreshCw, 
  TrendingUp, 
  Search,
  Zap,
  Target
} from "lucide-react";
import { LinkedInOptimizationResult } from "@/lib/types";

export default function LinkedInOptimizerPage() {
  const [currentHeadline, setCurrentHeadline] = useState(
    "Software Engineer | Looking for opportunities in tech"
  );
  const [targetRoles, setTargetRoles] = useState("Full Stack Engineer, Frontend Architect");
  const [skills, setSkills] = useState(
    "React, Next.js, TypeScript, Node.js, PostgreSQL, AWS, GraphQL"
  );
  const [currentAbout, setCurrentAbout] = useState(
    "Passionate software developer looking for full-time roles in software engineering."
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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Linkedin className="h-3.5 w-3.5" />
            <span>Recruiter SEO &amp; Algorithm Optimization</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            LinkedIn Profile &amp; Recruiter Inbound Optimizer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Re-engineer your LinkedIn Headline, About, and Skills matrix to rank at the top of LinkedIn Recruiter searches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Current LinkedIn Headline
              </label>
              <input
                type="text"
                value={currentHeadline}
                onChange={(e) => setCurrentHeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Role Titles (Comma-separated)
              </label>
              <input
                type="text"
                value={targetRoles}
                onChange={(e) => setTargetRoles(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Core Tech Stack &amp; Skills
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Current About / Summary
              </label>
              <textarea
                rows={5}
                value={currentAbout}
                onChange={(e) => setCurrentAbout(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white font-mono text-xs focus:outline-none focus:border-sky-500"
              />
            </div>

            <button
              onClick={handleOptimize}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Optimizing Profile Algorithm Ranking...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Optimize LinkedIn Profile</span>
                </>
              )}
            </button>
          </div>

          {/* Results */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            {result ? (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Headline Upgrade */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5" /> High-Ranking Headline
                    </span>
                    <button
                      onClick={() => copyText(result.suggestedHeadline, "headline")}
                      className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold"
                    >
                      {copiedSection === "headline" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedSection === "headline" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <p className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-semibold leading-relaxed">
                    {result.suggestedHeadline}
                  </p>
                </div>

                {/* Optimized About Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Target className="h-3.5 w-3.5 text-emerald-400" /> Recruiter SEO &quot;About&quot; Section
                    </span>
                    <button
                      onClick={() => copyText(result.optimizedAbout, "about")}
                      className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                    >
                      {copiedSection === "about" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedSection === "about" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed max-h-[220px] overflow-y-auto">
                    {result.optimizedAbout}
                  </div>
                </div>

                {/* Recruiter Search Optimization Tips */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Search className="h-3.5 w-3.5" /> Algorithm Optimization Tips
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {result.recruiterSearchTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <Linkedin className="h-10 w-10 text-slate-600 mb-3" />
                <p className="text-sm font-medium text-slate-400">Click &quot;Optimize LinkedIn Profile&quot;</p>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Generates an algorithm-optimized headline and About section with keyword density for recruiter search.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
