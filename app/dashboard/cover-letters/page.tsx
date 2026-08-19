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
  CheckCircle2,
  Building
} from "lucide-react";
import { CoverLetterResult } from "@/lib/types";

export default function CoverLettersPage() {
  const [candidateName, setCandidateName] = useState("Bhoomika K P");
  const [companyName, setCompanyName] = useState("Stripe");
  const [roleTitle, setRoleTitle] = useState("Full Stack Engineer — Developer Platform");
  const [jobDescription, setJobDescription] = useState(
    "Building developer APIs and high-throughput financial dashboards using React, TypeScript, Node.js, and PostgreSQL."
  );
  const [candidateSkills, setCandidateSkills] = useState(
    "React, Next.js, TypeScript, Node.js, PostgreSQL, AWS"
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
      console.error("Failed to generate cover letter", err);
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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Send className="h-3.5 w-3.5" />
            <span>Dual-Channel Outreach Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            High-Conversion Cover Letter &amp; Recruiter InMail
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Generate a targeted 3-paragraph ATS cover letter and a punchy 3-sentence direct InMail for the hiring manager.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Inputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name *</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Role Title *</label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Key Candidate Skills</label>
              <input
                type="text"
                value={candidateSkills}
                onChange={(e) => setCandidateSkills(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Job Description Snippet</label>
              <textarea
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white font-mono text-xs focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Drafting Cover Letter &amp; InMail...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Outreach Package</span>
                </>
              )}
            </button>
          </div>

          {/* Results */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            {result ? (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Recruiter 3-Sentence InMail */}
                <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Linkedin className="h-3.5 w-3.5" /> 3-Sentence Recruiter InMail
                    </span>
                    <button
                      onClick={() => copyText(result.recruiterInMailPitch, "inmail")}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                    >
                      {copiedType === "inmail" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedType === "inmail" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-900 p-3 rounded-lg border border-slate-800">
                    &quot;{result.recruiterInMailPitch}&quot;
                  </p>
                </div>

                {/* Email Subject Line */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 font-mono block">Subject Line:</span>
                    <span className="text-slate-200 font-semibold">{result.emailSubjectLine}</span>
                  </div>
                  <button
                    onClick={() => copyText(result.emailSubjectLine, "subject")}
                    className="text-slate-400 hover:text-white"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Full 3-Paragraph Cover Letter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-blue-400" /> Full Tailored Cover Letter
                    </span>
                    <button
                      onClick={() => copyText(result.fullLetter, "letter")}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
                    >
                      {copiedType === "letter" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedType === "letter" ? "Copied" : "Copy Full Letter"}</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed max-h-[300px] overflow-y-auto">
                    {result.fullLetter}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <Send className="h-10 w-10 text-slate-600 mb-3" />
                <p className="text-sm font-medium text-slate-400">Click &quot;Generate Outreach Package&quot;</p>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Produces a high-conversion 3-paragraph letter and an InMail cold pitch for the hiring manager.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
