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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 pt-28">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Studio Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-blue-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
              <Send className="h-3.5 w-3.5" /> Recruiter Outreach Studio
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Recruiter InMail &amp; Cover Letter Pitch
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              3-sentence high-impact hiring manager messages and tailored narrative cover letters.
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-brand-gradient text-xs py-2.5 px-6 shrink-0 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Drafting Messages...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate Outreach</span>
              </>
            )}
          </button>
        </div>

        {/* 3-Column Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Job Intelligence Inputs */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider block pb-2 border-b border-slate-800">
              Job Target Inputs
            </span>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Company</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Role Title</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Key Skills</label>
              <input
                type="text"
                value={candidateSkills}
                onChange={(e) => setCandidateSkills(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Job Description Snippet</label>
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Right Column: Generated Artifacts */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            
            {result ? (
              <div className="space-y-6 animate-fadeIn">
                
                {/* InMail */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Linkedin className="h-3.5 w-3.5" /> 3-Sentence Hiring Manager InMail
                    </span>
                    <button
                      onClick={() => copyText(result.recruiterInMailPitch, "inmail")}
                      className="text-xs font-mono text-blue-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedType === "inmail" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedType === "inmail" ? "Copied" : "Copy InMail"}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-200 font-mono leading-relaxed p-3 rounded-xl bg-slate-900 border border-slate-800">
                    &quot;{result.recruiterInMailPitch}&quot;
                  </p>
                </div>

                {/* Cover Letter */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" /> Narrative Cover Letter
                    </span>
                    <button
                      onClick={() => copyText(result.fullLetter, "letter")}
                      className="text-xs font-mono text-blue-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedType === "letter" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedType === "letter" ? "Copied" : "Copy Letter"}</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed font-mono max-h-[240px] overflow-y-auto">
                    {result.fullLetter}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500 font-mono text-xs">
                <Send className="h-8 w-8 text-slate-700 mb-2" />
                <p>Click &quot;Generate Outreach&quot;</p>
                <p className="text-[11px] text-slate-600 mt-1">
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
