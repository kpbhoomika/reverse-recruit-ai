"use client";

import { useState } from "react";
import { 
  DollarSign, 
  Sparkles, 
  TrendingUp, 
  Copy, 
  Check, 
  RefreshCw, 
  CheckCircle2, 
  ShieldCheck,
  Building2,
  Award
} from "lucide-react";
import { OfferNegotiationResult } from "@/lib/types";

export default function OfferNegotiatorPage() {
  const [companyName, setCompanyName] = useState("Retool");
  const [roleTitle, setRoleTitle] = useState("Full Stack Engineer");
  const [baseSalary, setBaseSalary] = useState("145000");
  const [signingBonus, setSigningBonus] = useState("15000");
  const [equityValueYear, setEquityValueYear] = useState("25000");
  const [yoe, setYoe] = useState("3");
  const [location, setLocation] = useState("San Francisco, CA / Remote");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OfferNegotiationResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/negotiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          roleTitle,
          baseSalary,
          signingBonus,
          equityValueYear,
          yoe,
          location,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Failed to analyze offer", err);
    } finally {
      setLoading(false);
    }
  };

  const copyScript = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <DollarSign className="h-3.5 w-3.5" />
            <span>AI Compensation Analyzer &amp; Counter-Offer Copilot</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Maximize Your Tech Job Offer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare compensation against real-world benchmarks and generate professional, high-leverage counter-offer scripts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Inputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Role Title</label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Base Salary ($)</label>
                <input
                  type="number"
                  value={baseSalary}
                  onChange={(e) => setBaseSalary(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Signing Bonus ($)</label>
                <input
                  type="number"
                  value={signingBonus}
                  onChange={(e) => setSigningBonus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Equity/yr ($)</label>
                <input
                  type="number"
                  value={equityValueYear}
                  onChange={(e) => setEquityValueYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Years of Experience (YOE)</label>
                <input
                  type="number"
                  value={yoe}
                  onChange={(e) => setYoe(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Location / Remote Policy</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Analyzing Market Benchmarks...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Analyze Offer &amp; Generate Counter Script</span>
                </>
              )}
            </button>
          </div>

          {/* Results */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            {result ? (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Market Benchmark Summary */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Offer</span>
                    <span className="text-lg font-bold text-white">${result.currentOfferTotal.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Market Median</span>
                    <span className="text-lg font-bold text-blue-400">${result.marketBenchmarkMedian.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Top 15% High</span>
                    <span className="text-lg font-bold text-emerald-400">${result.marketBenchmarkHigh.toLocaleString()}</span>
                  </div>
                </div>

                {/* Counter Targets */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2 text-xs">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider block">
                    🎯 Recommended Counter-Offer Targets:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-slate-200">
                    <div>• Target Base: <strong>${result.counterOfferRecommendation.baseSalaryTarget.toLocaleString()}</strong></div>
                    <div>• Signing Bonus: <strong>${result.counterOfferRecommendation.signingBonusTarget.toLocaleString()}</strong></div>
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Equity: {result.counterOfferRecommendation.equityTarget}
                  </p>
                </div>

                {/* Counter Email Script */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      AI Counter-Offer Email Script
                    </span>
                    <button
                      onClick={() => copyScript(result.negotiationEmailScript)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copied ? "Copied" : "Copy Email"}</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed max-h-[220px] overflow-y-auto">
                    {result.negotiationEmailScript}
                  </div>
                </div>

                {/* Tactical Talking Points */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                  <span className="font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Negotiation Playbook:
                  </span>
                  {result.talkingPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <DollarSign className="h-10 w-10 text-slate-600 mb-3" />
                <p className="text-sm font-medium text-slate-400">Click &quot;Analyze Offer &amp; Generate Counter Script&quot;</p>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Evaluates your compensation package against market bands and produces a high-leverage negotiation letter.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
