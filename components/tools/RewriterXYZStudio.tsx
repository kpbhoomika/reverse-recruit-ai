"use client";

import { useState } from "react";
import { 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Check, 
  Zap, 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  TrendingUp,
  Cpu,
  Flame,
  CheckCircle2
} from "lucide-react";
import { RewriterResult, XYZRewrittenBullet } from "@/lib/types";

const defaultBullets = `• Responsible for working on the backend APIs and maintaining databases.
• Helped the frontend team with new feature releases and bug fixes.
• Worked on unit testing and CI/CD pipelines to improve quality.`;

export default function RewriterXYZStudio({ initialEmbedded = false }: { initialEmbedded?: boolean }) {
  const [targetRole, setTargetRole] = useState("Staff Backend Engineer");
  const [bulletsText, setBulletsText] = useState(defaultBullets);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RewriterResult | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<Record<string, "standard" | "executive" | "technical" | "metricsHeavy">>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleRewrite = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/rewriter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bullets: bulletsText, targetRole }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Rewriter error:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyBullet = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`w-full ${initialEmbedded ? "" : "max-w-6xl mx-auto space-y-8"}`}>
      {/* Studio Header */}
      {!initialEmbedded && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-amber-400 uppercase font-bold tracking-wider flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Flame className="h-3.5 w-3.5 text-amber-400" /> Google XYZ Formula Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
              Bullet Point Rewriter (Accomplished X, measured by Y, by doing Z)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Transforms passive and vague resume bullets into high-converting, metric-backed Google XYZ accomplishments with before/after impact scores.
            </p>
          </div>

          <button
            onClick={handleRewrite}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:opacity-95 text-white font-bold text-xs tracking-wide shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Applying XYZ Formula...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Transform to Google XYZ</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Formula Explainer Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-emerald-950/40 to-purple-950/40 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2 font-mono">
          <span className="font-bold text-white uppercase text-[11px]">Formula Breakdown:</span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
            [Accomplished X]
          </span>
          <span className="text-slate-400">+</span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
            [Measured by Y (% / $ / Scale)]
          </span>
          <span className="text-slate-400">+</span>
          <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
            [By doing Z (Tech / Action)]
          </span>
        </div>

        <span className="text-[11px] text-slate-400 font-mono hidden lg:block">
          Used by Google, Meta &amp; Amazon hiring committees
        </span>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Input */}
        <div className={`${result ? "lg:col-span-5" : "lg:col-span-12"} space-y-4`}>
          <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                Target Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                Raw Resume Bullets (One per line)
              </label>
              <textarea
                rows={initialEmbedded ? 6 : 10}
                value={bulletsText}
                onChange={(e) => setBulletsText(e.target.value)}
                placeholder="Paste your raw, draft, or weak resume bullets here..."
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-amber-500 transition-colors resize-y"
              />
            </div>

            <button
              onClick={handleRewrite}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Synthesizing Metrics &amp; XYZ Clauses...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Rewrite with Google XYZ Formula</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output */}
        {result && (
          <div className="lg:col-span-7 space-y-6 animate-fadeIn">
            
            {/* Impact Metric Header */}
            <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-5 border border-slate-800 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                  Bullet Point Impact Benchmark
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-slate-400 font-mono">Before:</span>
                    <span className="text-xl font-bold font-mono text-slate-400">
                      {result.overallImpactScoreBefore}%
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-emerald-400" />
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-emerald-400 font-mono">After:</span>
                    <span className="text-2xl font-black font-mono text-emerald-400">
                      {result.overallImpactScoreAfter}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4" />
                <span>+{(result.overallImpactScoreAfter - result.overallImpactScoreBefore)}% Higher Recruiter Conversion</span>
              </div>
            </div>

            {/* Rewritten Bullet Cards */}
            <div className="space-y-4">
              {result.rewrittenBullets.map((bullet) => {
                const varType = selectedVariation[bullet.id] || "standard";
                const displayBullet = varType === "standard"
                  ? bullet.fullRewritten
                  : varType === "executive"
                  ? bullet.variations.executive
                  : varType === "technical"
                  ? bullet.variations.technical
                  : bullet.variations.metricsHeavy;

                return (
                  <div
                    key={bullet.id}
                    className="p-5 rounded-3xl bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-xl space-y-4 transition-all"
                  >
                    {/* Before/Original */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                          Original Draft
                        </span>
                        <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                          Impact: {bullet.impactScoreBefore}/100
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono italic bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                        &quot;{bullet.original}&quot;
                      </p>
                    </div>

                    {/* Formula Token Breakdown */}
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs">
                      <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                        Google XYZ Component Breakdown
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-2">
                          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px] uppercase font-bold shrink-0">
                            Accomplished [X]
                          </span>
                          <span className="text-slate-200 text-xs">{bullet.accomplishedX}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] uppercase font-bold shrink-0">
                            Measured by [Y]
                          </span>
                          <span className="text-emerald-200 text-xs font-semibold">{bullet.measuredByY}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px] uppercase font-bold shrink-0">
                            By doing [Z]
                          </span>
                          <span className="text-slate-200 text-xs">{bullet.byDoingZ}</span>
                        </div>
                      </div>
                    </div>

                    {/* Variation Selector Tabs */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono">
                          <button
                            onClick={() => setSelectedVariation(prev => ({ ...prev, [bullet.id]: "standard" }))}
                            className={`px-2.5 py-1 rounded-lg transition-colors ${
                              varType === "standard"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold"
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            Standard XYZ
                          </button>
                          <button
                            onClick={() => setSelectedVariation(prev => ({ ...prev, [bullet.id]: "executive" }))}
                            className={`px-2.5 py-1 rounded-lg transition-colors ${
                              varType === "executive"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold"
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            Executive
                          </button>
                          <button
                            onClick={() => setSelectedVariation(prev => ({ ...prev, [bullet.id]: "technical" }))}
                            className={`px-2.5 py-1 rounded-lg transition-colors ${
                              varType === "technical"
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold"
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            Technical
                          </button>
                          <button
                            onClick={() => setSelectedVariation(prev => ({ ...prev, [bullet.id]: "metricsHeavy" }))}
                            className={`px-2.5 py-1 rounded-lg transition-colors ${
                              varType === "metricsHeavy"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold"
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            Metrics-Heavy
                          </button>
                        </div>

                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          Impact: {bullet.impactScoreAfter}/100
                        </span>
                      </div>

                      {/* Displayed Rewritten Version */}
                      <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/20 text-xs text-white leading-relaxed font-sans flex items-start justify-between gap-3">
                        <span>&quot;{displayBullet}&quot;</span>
                        <button
                          onClick={() => copyBullet(bullet.id, displayBullet)}
                          className="shrink-0 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                          title="Copy this bullet"
                        >
                          {copiedId === bullet.id ? (
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Rationale Note */}
                    <p className="text-[11px] text-slate-400">
                      <strong className="text-amber-400/80 font-mono">Why this works: </strong>
                      {bullet.rationale}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
