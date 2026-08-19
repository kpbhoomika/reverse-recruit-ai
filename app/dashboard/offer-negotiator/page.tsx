"use client";

import { useState } from "react";
import { 
  DollarSign, 
  Sparkles, 
  TrendingUp, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck,
  Award,
  Layers,
  ArrowRight
} from "lucide-react";
import { OfferNegotiationResult } from "@/lib/types";

export default function OfferNegotiatorPage() {
  const [companyName, setCompanyName] = useState("Retool");
  const [roleTitle, setRoleTitle] = useState("Staff Distributed Systems Engineer");
  const [baseSalary, setBaseSalary] = useState("165000");
  const [signingBonus, setSigningBonus] = useState("20000");
  const [equityValueYear, setEquityValueYear] = useState("40000");
  const [yoe, setYoe] = useState("4");
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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 pt-28">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Studio Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5" /> Compensation Intelligence Studio
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Offer Negotiation &amp; Equity Copilot
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Benchmark compensation bands against market percentiles and generate data-backed counter-offers.
            </p>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="btn-brand-gradient text-xs py-2.5 px-6 shrink-0 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Analyzing Bands...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Compute Leverage Strategy</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Inputs Column */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider block pb-2 border-b border-slate-800">
              Offer Details
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Company</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Role Title</label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Base ($)</label>
                <input
                  type="number"
                  value={baseSalary}
                  onChange={(e) => setBaseSalary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Bonus ($)</label>
                <input
                  type="number"
                  value={signingBonus}
                  onChange={(e) => setSigningBonus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Equity/yr ($)</label>
                <input
                  type="number"
                  value={equityValueYear}
                  onChange={(e) => setEquityValueYear(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">YOE</label>
                <input
                  type="number"
                  value={yoe}
                  onChange={(e) => setYoe(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            
            {result ? (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Market Benchmark Tri-Panel */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Total Package</span>
                    <span className="text-lg font-bold text-white">${result.currentOfferTotal.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Market Median</span>
                    <span className="text-lg font-bold text-blue-400">${result.marketBenchmarkMedian.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Top 15% Band</span>
                    <span className="text-lg font-bold text-emerald-400">${result.marketBenchmarkHigh.toLocaleString()}</span>
                  </div>
                </div>

                {/* Counter Targets Recommendations */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs font-mono space-y-1.5">
                  <span className="font-semibold text-emerald-400 uppercase tracking-wider block">
                    🎯 Recommended Counter-Offer Targets:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-white">
                    <div>• Target Base: <strong>${result.counterOfferRecommendation.baseSalaryTarget.toLocaleString()}</strong></div>
                    <div>• Signing Bonus: <strong>${result.counterOfferRecommendation.signingBonusTarget.toLocaleString()}</strong></div>
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Equity: {result.counterOfferRecommendation.equityTarget}
                  </p>
                </div>

                {/* Email Script */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                      Counter-Offer Email Draft
                    </span>
                    <button
                      onClick={() => copyScript(result.negotiationEmailScript)}
                      className="text-xs font-mono text-blue-400 hover:text-white flex items-center gap-1"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copied ? "Copied" : "Copy Draft"}</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 whitespace-pre-line leading-relaxed max-h-[180px] overflow-y-auto">
                    {result.negotiationEmailScript}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500 font-mono text-xs">
                <DollarSign className="h-8 w-8 text-slate-700 mb-2" />
                <p>Click &quot;Compute Leverage Strategy&quot;</p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Evaluates compensation bands against market percentiles and drafts counter-offer scripts.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
