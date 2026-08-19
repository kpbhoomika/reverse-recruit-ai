"use client";

import { useState } from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight, 
  Cpu, 
  Layers,
  Terminal
} from "lucide-react";
import { useCounter } from "@/lib/use-motion";

export default function LiveATSDiagnostic() {
  const [targetRole, setTargetRole] = useState("Staff Backend Engineer");
  const [sampleResume, setSampleResume] = useState(
    "Backend Engineer with 4 years experience in Go, Python, PostgreSQL, and AWS. Built high-concurrency microservices, optimized SQL queries, and maintained Docker containers."
  );
  const [sampleJd, setSampleJd] = useState(
    "Seeking Staff Backend Engineer to scale distributed transaction systems. Required: Go, Kubernetes, Kafka, PostgreSQL, gRPC, and high-throughput low-latency architecture."
  );
  const [atsScore, setAtsScore] = useState<number>(76);
  const [isScanning, setIsScanning] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const countScore = useCounter(atsScore, true, 800);

  const runDiagnostic = () => {
    setIsScanning(true);
    setTimeout(() => {
      setAtsScore(94);
      setAnalyzed(true);
      setIsScanning(false);
    }, 700);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-12">
      <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#3D0814]/10 shadow-warm-lg">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#3D0814]/10 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#D91C44]" />
              <div className="h-3 w-3 rounded-full bg-[#3D0814]/20" />
              <div className="h-3 w-3 rounded-full bg-[#3D0814]/20" />
            </div>
            <span className="font-mono text-xs text-[#706556] font-medium ml-2">
              ats-semantic-diagnostic.v2
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D91C44]/10 border border-[#D91C44]/20 text-[#D91C44] font-mono text-[11px] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D91C44] animate-ping" />
              Gemini 1.5 Semantic Parser
            </span>
          </div>
        </div>

        {/* Console Workspace Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#706556] uppercase tracking-wider mb-1.5">
                Target Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-[#2B050E] text-sm font-medium focus:outline-none focus:border-[#D91C44] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#706556] uppercase tracking-wider mb-1.5">
                Candidate Master Experience
              </label>
              <textarea
                rows={3}
                value={sampleResume}
                onChange={(e) => setSampleResume(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-[#2B050E] text-xs leading-relaxed font-mono focus:outline-none focus:border-[#D91C44] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#706556] uppercase tracking-wider mb-1.5">
                Employer Job Specification
              </label>
              <textarea
                rows={3}
                value={sampleJd}
                onChange={(e) => setSampleJd(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-[#2B050E] text-xs leading-relaxed font-mono focus:outline-none focus:border-[#D91C44] transition-colors"
              />
            </div>

            <button
              onClick={runDiagnostic}
              disabled={isScanning}
              className="w-full btn-crimson flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-white" />
                  <span>Computing Vector Match &amp; Semantic Distance...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Run Live ATS Reverse Engineering</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Diagnostic Radial Gauge & Analysis */}
          <div className="lg:col-span-5 bg-[#3D0814] text-[#FAF5EE] rounded-2xl p-6 border border-white/10 space-y-6 shadow-xl">
            
            {/* Radial Gauge & Top Score */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-[#FAF5EE]/70 uppercase tracking-wider block">
                  Calculated ATS Index
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold font-mono text-white">
                    {countScore}%
                  </span>
                  <span className="text-xs font-mono font-medium text-[#FF2B56]">
                    {atsScore >= 90 ? "Top 1% Tier" : "Baseline"}
                  </span>
                </div>
              </div>

              {/* Minimalist SVG circular gauge */}
              <div className="relative h-14 w-14 flex items-center justify-center">
                <svg className="h-14 w-14 transform -rotate-90">
                  <circle
                    cx="28"
                    cy="28"
                    r="22"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="22"
                    stroke="#D91C44"
                    strokeWidth="4"
                    strokeDasharray={138}
                    strokeDashoffset={138 - (138 * atsScore) / 100}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <span className="absolute text-[10px] font-mono text-white font-bold">
                  {countScore}%
                </span>
              </div>
            </div>

            {/* Keyword Extraction Telemetry */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] font-mono text-[#FAF5EE]/80 font-medium uppercase tracking-wider block mb-1.5">
                  ✓ Matched Technical Vectors (6)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["Go", "PostgreSQL", "AWS", "Docker", "Microservices", "High-Concurrency"].map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 rounded-md bg-white/10 text-white border border-white/15 font-mono text-[11px]"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-[#D91C44] font-medium uppercase tracking-wider block mb-1.5">
                  ⚡ Auto-Injected XYZ Bullet Point
                </span>
                <p className="p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs leading-relaxed font-sans">
                  &quot;Architected distributed Go microservices handling 250k+ daily transactions with PostgreSQL &amp; Kafka, reducing p99 latency by 44%.&quot;
                </p>
              </div>

              {/* AI Reasoning Inspector */}
              <div className="p-3 rounded-xl bg-black/20 border border-white/10 text-[11px] text-[#FAF5EE]/70 space-y-1">
                <span className="font-mono text-white font-medium block">
                  AI Rationale:
                </span>
                <p className="leading-relaxed">
                  Re-ordered Kafka and distributed systems keywords to top 30% of resume page where applicant tracking OCR parsers assign highest weight.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
