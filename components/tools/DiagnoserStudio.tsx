"use client";

import { useState } from "react";
import { 
  Sparkles, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Copy, 
  Check, 
  Cpu, 
  FileText, 
  ShieldCheck, 
  Sliders, 
  ChevronRight,
  TrendingUp,
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { DiagnoserResult, IssueSeverity } from "@/lib/types";

const sampleResumePreset = `Hemanth Kumar
San Francisco, CA • (555) 234-5678 • hemanth.k@email.com • linkedin.com/in/hemanth-eng

SUMMARY
Software Engineer with 4+ years of experience in backend distributed systems, API architecture, and cloud infrastructure. Specialized in Go, Python, PostgreSQL, and Kubernetes.

WORK EXPERIENCE
Senior Backend Engineer — CloudScale Technologies (2022 - Present)
• Responsible for maintaining backend microservices and database queries.
• Built distributed caching layer that improved request throughput across 5 core services.
• Worked on deployment pipelines and container orchestration with Docker and AWS.
• Helped junior engineers with code reviews and bug debugging.

Software Engineer — DataFlow Systems (2020 - 2022)
• Developed REST APIs for analytics dashboard using Python and PostgreSQL.
• Assisted in migrating legacy monolithic endpoints into decoupled service modules.
• Monitored system health and participated in on-call rotation.

TECHNICAL SKILLS
Languages: Go (Golang), Python, TypeScript, SQL
Databases & Cache: PostgreSQL, Redis, DynamoDB
Infrastructure & Tools: Kubernetes, Docker, AWS (ECS, S3, RDS), Git, CI/CD

EDUCATION
B.S. in Computer Science — State University (2016 - 2020)`;

export default function DiagnoserStudio({ initialEmbedded = false }: { initialEmbedded?: boolean }) {
  const [targetRole, setTargetRole] = useState("Staff Backend Engineer");
  const [resumeText, setResumeText] = useState(sampleResumePreset);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnoserResult | null>(null);
  const [activeTab, setActiveTab] = useState<"issues" | "sections" | "metrics">("issues");
  const [filterSeverity, setFilterSeverity] = useState<"all" | IssueSeverity>("all");
  const [copiedFixId, setCopiedFixId] = useState<string | null>(null);

  const handleRunDiagnostic = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/diagnoser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, targetRole }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Diagnostic error:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyFix = (id: string, text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedFixId(id);
    setTimeout(() => setCopiedFixId(null), 2000);
  };

  const filteredIssues = result?.structuralIssues.filter(issue => {
    if (filterSeverity === "all") return true;
    return issue.severity === filterSeverity;
  }) || [];

  const criticalCount = result?.structuralIssues.filter(i => i.severity === "critical").length || 0;
  const warningCount = result?.structuralIssues.filter(i => i.severity === "warning").length || 0;
  const passedCount = result?.structuralIssues.filter(i => i.severity === "passed").length || 0;

  return (
    <div className={`w-full ${initialEmbedded ? "" : "max-w-6xl mx-auto space-y-8"}`}>
      {/* Header Banner */}
      {!initialEmbedded && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-rose-400 uppercase font-bold tracking-wider flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                <ShieldCheck className="h-3.5 w-3.5" /> ATS Structural Diagnoser
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
              ATS-Style Resume Diagnostic Scanner
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Exhaustive structural parser that flags formatting anomalies, OCR parsing hazards, missing sections, and weak action verbs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunDiagnostic}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:opacity-95 text-white font-bold text-xs tracking-wide shadow-lg shadow-rose-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Scanning ATS Vectors...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Run ATS Deep Scan</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Input Workspace */}
        <div className={`${result ? "lg:col-span-6" : "lg:col-span-12"} space-y-4`}>
          <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-rose-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                  Resume Content Input
                </span>
              </div>
              <button
                onClick={() => setResumeText(sampleResumePreset)}
                className="text-[11px] font-mono text-slate-400 hover:text-rose-300 transition-colors"
              >
                Load Sample Profile
              </button>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Target Role Specification</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Paste Master Resume Text</label>
              <textarea
                rows={initialEmbedded ? 8 : 14}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your plain text resume here..."
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-rose-500 transition-colors resize-y"
              />
            </div>

            <button
              onClick={handleRunDiagnostic}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Parsing Structural Hierarchy &amp; Action Density...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Diagnose Resume Structure Now</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Diagnostic Telemetry & Audits */}
        {result && (
          <div className="lg:col-span-6 space-y-6 animate-fadeIn">
            {/* Top Score Card */}
            <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    Structural ATS Health Index
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-4xl sm:text-5xl font-black font-mono text-white">
                      {result.overallScore}%
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full font-mono text-xs font-bold ${
                      result.grade === "A+" || result.grade === "A"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : result.grade === "B"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}>
                      Grade: {result.grade}
                    </span>
                  </div>
                </div>

                {/* Score Dial Mini */}
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-rose-400 font-mono">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>{criticalCount} Critical Flags</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    {result.stats.wordCount} words • {result.stats.bulletCount} bullets
                  </div>
                </div>
              </div>

              {/* Sub-Score Bars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-2">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-400 block">Formatting</span>
                  <span className="text-sm font-bold text-white font-mono">{result.metrics.formattingScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-400 block">Impact / Metrics</span>
                  <span className="text-sm font-bold text-rose-400 font-mono">{result.metrics.impactScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-400 block">ATS Readability</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">{result.metrics.atsReadabilityScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-400 block">Section Complete</span>
                  <span className="text-sm font-bold text-blue-400 font-mono">{result.metrics.sectionCompletenessScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 col-span-2 sm:col-span-2">
                  <span className="text-[10px] font-mono text-slate-400 block">Action Verb Density</span>
                  <span className="text-sm font-bold text-amber-400 font-mono">
                    {result.metrics.actionVerbDensityScore}% ({result.stats.actionVerbCount} active / {result.stats.weakVerbCount} weak)
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-2xl bg-rose-500/5 border border-rose-500/15 text-xs text-slate-300 leading-relaxed">
                <span className="text-rose-400 font-bold font-mono text-[10px] uppercase tracking-wider block mb-1">
                  Executive Summary
                </span>
                {result.summary}
              </div>
            </div>

            {/* Tabbed Inspector Navigation */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("issues")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "issues"
                      ? "bg-slate-800 text-white border border-slate-700"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Structural Flags ({result.structuralIssues.length})
                </button>
                <button
                  onClick={() => setActiveTab("sections")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "sections"
                      ? "bg-slate-800 text-white border border-slate-700"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Section Audit ({result.sectionAudit.length})
                </button>
              </div>

              {activeTab === "issues" && (
                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  <button
                    onClick={() => setFilterSeverity("all")}
                    className={`px-2 py-0.5 rounded ${filterSeverity === "all" ? "bg-slate-700 text-white" : "text-slate-400"}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterSeverity("critical")}
                    className={`px-2 py-0.5 rounded ${filterSeverity === "critical" ? "bg-rose-500/20 text-rose-300" : "text-rose-400/60"}`}
                  >
                    Critical ({criticalCount})
                  </button>
                  <button
                    onClick={() => setFilterSeverity("warning")}
                    className={`px-2 py-0.5 rounded ${filterSeverity === "warning" ? "bg-amber-500/20 text-amber-300" : "text-amber-400/60"}`}
                  >
                    Warnings ({warningCount})
                  </button>
                </div>
              )}
            </div>

            {/* Tab Content: Issues */}
            {activeTab === "issues" && (
              <div className="space-y-3">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      issue.severity === "critical"
                        ? "bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50"
                        : issue.severity === "warning"
                        ? "bg-amber-950/20 border-amber-500/30 hover:border-amber-500/50"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        {issue.severity === "critical" ? (
                          <XCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                        ) : issue.severity === "warning" ? (
                          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{issue.title}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                              {issue.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{issue.description}</p>
                          <div className="mt-2 text-xs text-slate-300 bg-black/30 p-2.5 rounded-xl border border-white/5">
                            <strong className="text-rose-300 font-mono text-[11px]">Recommendation: </strong>
                            {issue.recommendation}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Auto Fix Snippet */}
                    {issue.autoFixSnippet && (
                      <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                            Auto-Fix Template
                          </span>
                          <button
                            onClick={() => copyFix(issue.id, issue.autoFixSnippet)}
                            className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                          >
                            {copiedFixId === issue.id ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy Fix</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-[11px] text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap">
                          {issue.autoFixSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tab Content: Section Audit */}
            {activeTab === "sections" && (
              <div className="space-y-3">
                {result.sectionAudit.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{sec.section}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          sec.status === "complete"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : sec.status === "needs_work"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}>
                          {sec.status === "complete" ? "Complete" : sec.status === "needs_work" ? "Needs Work" : "Missing"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{sec.feedback}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
