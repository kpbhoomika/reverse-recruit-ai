"use client";

import { useState } from "react";
import { 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  Linkedin, 
  Mail, 
  RefreshCw, 
  Cpu, 
  Terminal,
  ArrowRight
} from "lucide-react";
import { CoverLetterResult } from "@/lib/types";

export default function CoverLettersPage() {
  const [candidateName, setCandidateName] = useState("Bhoomika K P");
  const [companyName, setCompanyName] = useState("Stripe");
  const [roleTitle, setRoleTitle] = useState("Staff Developer Platform Engineer");
  const [jobDescription, setJobDescription] = useState(
    "Building high-throughput financial developer APIs and distributed systems in TypeScript, Go, and PostgreSQL."
  );
  const [candidateSkills, setCandidateSkills] = useState(
    "Go, TypeScript, React, Next.js, PostgreSQL, Distributed Systems, AWS"
  );

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CoverLetterResult | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName,
          companyName,
          roleTitle,
          jobDescription,
          candidateSkills: candidateSkills.split(",").map((s) => s.trim()),
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Failed to generate outreach pitch", err);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-[#F1F5F9] p-6 sm:p-10 pt-28">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Studio Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
          <div>
            <span className="text-eyebrow-telemetry flex items-center gap-1.5">
              <Send className="h-3.5 w-3.5 text-cyan-400" /> Dual-Channel Outreach Studio
            </span>
            <h1 className="text-3xl font-semibold text-foreground tracking-tight mt-1">
              Recruiter InMail &amp; Cover Letter Engine
            </h1>
            <p className="text-xs text-muted mt-1">
              3-sentence high-impact hiring manager pitches + ATS narrative cover letters.
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-primary-glow text-xs py-2.5 px-6 shrink-0 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Synthesizing Outreach Package...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate Outreach Package</span>
              </>
            )}
          </button>
        </div>

        {/* 3-Column Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Job Intelligence Inputs (4 cols) */}
          <div className="lg:col-span-4 glass-surface p-6 rounded-3xl border border-border-subtle space-y-4">
            <span className="font-mono text-xs text-muted uppercase tracking-wider block pb-2 border-b border-border-subtle">
              Job Intelligence Vectors
            </span>

            <div>
              <label className="block text-[11px] font-mono text-muted uppercase mb-1">Company</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-border-subtle text-foreground text-xs font-medium focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-muted uppercase mb-1">Role Title</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-border-subtle text-foreground text-xs font-medium focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-muted uppercase mb-1">Key Skills</label>
              <input
                type="text"
                value={candidateSkills}
                onChange={(e) => setCandidateSkills(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-border-subtle text-foreground text-xs font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-muted uppercase mb-1">JD Excerpt</label>
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface-100 border border-border-subtle text-foreground text-xs leading-relaxed font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Center & Right Columns: Generated Artifacts & Reasoning (8 cols) */}
          <div className="lg:col-span-8 glass-surface-elevated p-6 sm:p-8 rounded-3xl border border-border-light space-y-6">
            
            {result ? (
              <div className="space-y-6 animate-fadeIn">
                
                {/* 3-Sentence Recruiter InMail Pitch */}
                <div className="p-5 rounded-2xl bg-surface-100 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-cyan-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <Linkedin className="h-3.5 w-3.5 text-cyan-400" /> 3-Sentence Hiring Manager InMail
                    </span>
                    <button
                      onClick={() => copyText(result.recruiterInMailPitch, "inmail")}
                      className="text-xs font-mono text-cyan-300 hover:text-foreground flex items-center gap-1"
                    >
                      {copiedType === "inmail" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedType === "inmail" ? "Copied" : "Copy InMail"}</span>
                    </button>
                  </div>
                  <p className="text-xs text-foreground font-mono leading-relaxed p-3 rounded-xl bg-surface-200/80 border border-border-subtle">
                    &quot;{result.recruiterInMailPitch}&quot;
                  </p>
                </div>

                {/* AI Reasoning Inspector */}
                <div className="p-4 rounded-xl bg-surface-100/60 border border-border-subtle text-xs space-y-1.5">
                  <span className="font-mono text-[11px] text-emerald-400 font-semibold uppercase tracking-wider block">
                    AI Strategic Reasoning:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-muted">
                    <div>• <strong>Recruiter Hook:</strong> Mentions scale metrics in first sentence.</div>
                    <div>• <strong>Relevance:</strong> Directly maps 2 hardest technical vectors.</div>
                    <div>• <strong>Low Friction CTA:</strong> Asks for a 5-minute exploratory sync.</div>
                  </div>
                </div>

                {/* Full ATS Cover Letter */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-muted" /> 3-Paragraph Narrative Letter
                    </span>
                    <button
                      onClick={() => copyText(result.fullLetter, "letter")}
                      className="text-xs font-mono text-cyan-300 hover:text-foreground flex items-center gap-1"
                    >
                      {copiedType === "letter" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedType === "letter" ? "Copied" : "Copy Letter"}</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-100 border border-border-subtle text-xs text-foreground whitespace-pre-line leading-relaxed font-mono max-h-[220px] overflow-y-auto">
                    {result.fullLetter}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-muted font-mono text-xs">
                <Send className="h-8 w-8 text-muted/60 mb-2" />
                <p>Click &quot;Generate Outreach Package&quot;</p>
                <p className="text-[11px] text-muted/60 mt-1">
                  Synthesizes direct hiring manager InMails and tailored ATS letters.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
