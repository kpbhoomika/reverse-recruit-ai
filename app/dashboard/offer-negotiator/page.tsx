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
    <div className="min-h-screen bg-[#F7F3EA] text-[#2B050E] p-6 sm:p-10 pt-28">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Studio Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#3D0814]/10">
          <div>
            <span className="text-xs font-mono text-[#D91C44] uppercase font-bold tracking-wider flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5" /> Compensation Intelligence Studio
            </span>
            <h1 className="text-3xl font-bold text-[#2B050E] tracking-tight mt-1">
              AI Offer Negotiation &amp; Equity Copilot
            </h1>
            <p className="text-xs text-[#706556] mt-1">
              Deconstruct compensation bands against market percentiles and generate data-backed counter-offers.
            </p>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="btn-crimson text-xs py-2.5 px-6 shrink-0 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Benchmarking Market Percentiles...</span>
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
          
          {/* Inputs Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-6 rounded-3xl border border-[#3D0814]/10 shadow-warm space-y-4">
            <span className="font-mono text-xs text-[#706556] font-bold uppercase tracking-wider block pb-2 border-b border-[#3D0814]/10">
              Compensation Vectors
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-[#706556] uppercase mb-1">Company</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-[#2B050E] text-xs font-medium focus:outline-none focus:border-[#D91C44]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-[#706556] uppercase mb-1">Role Title</label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-[#2B050E] text-xs font-medium focus:outline-none focus:border-[#D91C44]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-[#706556] uppercase mb-1">Base ($)</label>
                <input
                  type="number"
                  value={baseSalary}
                  onChange={(e) => setBaseSalary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-[#2B050E] text-xs font-mono focus:outline-none focus:border-[#D91C44]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-[#706556] uppercase mb-1">Bonus ($)</label>
                <input
                  type="number"
                  value={signingBonus}
                  onChange={(e) => setSigningBonus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-[#2B050E] text-xs font-mono focus:outline-none focus:border-[#D91C44]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-[#706556] uppercase mb-1">Equity/yr ($)</label>
                <input
                  type="number"
                  value={equityValueYear}
                  onChange={(e) => setEquityValueYear(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-[#2B050E] text-xs font-mono focus:outline-none focus:border-[#D91C44]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-[#706556] uppercase mb-1">YOE</label>
                <input
                  type="number"
                  value={yoe}
                  onChange={(e) => setYoe(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-[#2B050E] text-xs font-mono focus:outline-none focus:border-[#D91C44]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-[#706556] uppercase mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-[#2B050E] text-xs font-medium focus:outline-none focus:border-[#D91C44]"
                />
              </div>
            </div>
          </div>

          {/* Results Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#3D0814] text-[#FAF5EE] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-warm-lg space-y-6">
            
            {result ? (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Market Benchmark Tri-Panel */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-center font-mono">
                  <div>
                    <span className="text-[10px] text-[#FAF5EE]/70 uppercase block">Total Package</span>
                    <span className="text-lg font-bold text-white">${result.currentOfferTotal.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#FAF5EE]/70 uppercase block">Market Median</span>
                    <span className="text-lg font-bold text-[#D91C44]">${result.marketBenchmarkMedian.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#FAF5EE]/70 uppercase block">Top 15% Band</span>
                    <span className="text-lg font-bold text-emerald-400">${result.marketBenchmarkHigh.toLocaleString()}</span>
                  </div>
                </div>

                {/* Counter Targets Recommendations */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono space-y-1.5">
                  <span className="font-semibold text-[#D91C44] uppercase tracking-wider block">
                    🎯 Recommended Counter-Offer Anchors:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-white">
                    <div>• Target Base: <strong>${result.counterOfferRecommendation.baseSalaryTarget.toLocaleString()}</strong></div>
                    <div>• Signing Bonus: <strong>${result.counterOfferRecommendation.signingBonusTarget.toLocaleString()}</strong></div>
                  </div>
                  <p className="text-[11px] text-[#FAF5EE]/70 pt-1">
                    Equity: {result.counterOfferRecommendation.equityTarget}
                  </p>
                </div>

                {/* Counter-Offer Email Script */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#FAF5EE]/70 uppercase tracking-wider">
                      Executive Counter-Offer Script
                    </span>
                    <button
                      onClick={() => copyScript(result.negotiationEmailScript)}
                      className="text-xs font-mono text-[#D91C44] hover:text-white flex items-center gap-1"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copied ? "Copied" : "Copy Script"}</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-black/20 border border-white/10 text-xs font-mono text-white whitespace-pre-line leading-relaxed max-h-[180px] overflow-y-auto">
                    {result.negotiationEmailScript}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-[#FAF5EE]/70 font-mono text-xs">
                <DollarSign className="h-8 w-8 text-[#FAF5EE]/40 mb-2" />
                <p>Click &quot;Compute Leverage Strategy&quot;</p>
                <p className="text-[11px] text-[#FAF5EE]/50 mt-1">
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
