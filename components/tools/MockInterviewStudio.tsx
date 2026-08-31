"use client";

import { useState, useEffect } from "react";
import { 
  Sparkles, 
  RefreshCw, 
  UserCheck, 
  MessageSquare, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Send, 
  ChevronRight, 
  Flame, 
  Play, 
  Target,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Copy,
  Check
} from "lucide-react";
import { 
  InterviewPersona, 
  MockInterviewQuestion, 
  HiringManagerResult 
} from "@/lib/types";

const personaList: { id: InterviewPersona; name: string; title: string; avatarBg: string; description: string }[] = [
  {
    id: "faang_director",
    name: "Alex Vance",
    title: "FAANG Engineering Director",
    avatarBg: "from-blue-600 to-indigo-600",
    description: "Evaluates high-scale distributed systems, metric rigor, and executive presence."
  },
  {
    id: "bar_raiser",
    name: "Elena Rostova",
    title: "Principal Bar Raiser",
    avatarBg: "from-purple-600 to-rose-600",
    description: "Strict grader on STAR structure, customer obsession, and leadership ownership."
  },
  {
    id: "startup_founder",
    name: "Marcus Sterling",
    title: "Series B Startup CTO",
    avatarBg: "from-amber-600 to-orange-600",
    description: "Focused on execution speed, pragmatic trade-offs, and product intuition."
  },
  {
    id: "tech_lead",
    name: "David Chen",
    title: "Staff Technical Architect",
    avatarBg: "from-emerald-600 to-teal-600",
    description: "Drills into code maintainability, database concurrency, and system failure modes."
  }
];

const sampleAnswer = `In my previous role as Senior Backend Engineer, we experienced a critical performance degradation where our PostgreSQL payment service CPU utilization spiked to 92% during peak holiday checkout traffic, triggering elevated p99 latency alarms at 850ms.

My responsibility was to diagnose the root cause, prevent transaction timeouts, and optimize system capacity to handle 3x expected traffic volume without provisioning expensive oversized instances.

I immediately analyzed pg_stat_statements and slow query logs, discovering 2 unindexed sequential table scans on historical user ledger records. I implemented composite B-Tree indexes, added an asynchronous Redis cache layer with 15-minute write-through invalidation for static merchant configurations, and introduced connection pooling via PgBouncer.

As a result, we reduced p99 query latency from 850ms to 42ms (a 95% reduction), lowered database CPU utilization to 24%, and successfully processed over $4.2M in transactions during Black Friday with zero downtime.`;

export default function MockInterviewStudio({ initialEmbedded = false }: { initialEmbedded?: boolean }) {
  const [roleTitle, setRoleTitle] = useState("Staff Backend Engineer");
  const [persona, setPersona] = useState<InterviewPersona>("faang_director");
  const [questions, setQuestions] = useState<MockInterviewQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<MockInterviewQuestion | null>(null);
  const [candidateAnswer, setCandidateAnswer] = useState(sampleAnswer);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<HiringManagerResult | null>(null);
  const [copiedModel, setCopiedModel] = useState(false);

  // Load initial questions
  useEffect(() => {
    async function loadQuestions() {
      setLoadingQuestions(true);
      try {
        const res = await fetch(`/api/ai/mock-interview?roleTitle=${encodeURIComponent(roleTitle)}&persona=${persona}`);
        const data = await res.json();
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
          setSelectedQuestion(data.questions[0]);
        }
      } catch (e) {
        console.error("Failed to load questions:", e);
      } finally {
        setLoadingQuestions(false);
      }
    }
    loadQuestions();
  }, [persona]);

  const handleEvaluate = async () => {
    if (!selectedQuestion) return;
    setEvaluating(true);
    try {
      const res = await fetch("/api/ai/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleTitle,
          persona,
          question: selectedQuestion.question,
          candidateAnswer
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error("Evaluation error:", e);
    } finally {
      setEvaluating(false);
    }
  };

  const copyModelAnswer = () => {
    if (!result?.modelAnswer) return;
    navigator.clipboard.writeText(result.modelAnswer);
    setCopiedModel(true);
    setTimeout(() => setCopiedModel(false), 2000);
  };

  const activePersonaObj = personaList.find(p => p.id === persona) || personaList[0];

  return (
    <div className={`w-full ${initialEmbedded ? "" : "max-w-6xl mx-auto space-y-8"}`}>
      {/* Studio Header */}
      {!initialEmbedded && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-purple-400 uppercase font-bold tracking-wider flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                <UserCheck className="h-3.5 w-3.5 text-purple-400" /> AI Hiring Manager &amp; Interview Arena
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
              Mock Interview Arena &amp; STAR Answer Scorer
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Test your answers against elite interviewer personas, receive rigorous STAR rubric scores, hiring decisions, and 10/10 model answer upgrades.
            </p>
          </div>

          <button
            onClick={handleEvaluate}
            disabled={evaluating || !selectedQuestion}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:opacity-95 text-white font-bold text-xs tracking-wide shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            {evaluating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Interviewer is Scoring...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Score My Interview Answer</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Persona Selection Bar */}
      <div className="space-y-2">
        <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">
          Select Hiring Manager Persona
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {personaList.map((p) => {
            const isSelected = persona === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setPersona(p.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between gap-2 ${
                  isSelected
                    ? "bg-slate-900 border-purple-500 shadow-md shadow-purple-500/20 scale-[1.01]"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`h-8 w-8 rounded-xl bg-gradient-to-tr ${p.avatarBg} flex items-center justify-center text-white font-bold text-xs shrink-0 shadow`}>
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{p.name}</h4>
                    <span className="text-[10px] text-purple-400 font-mono block leading-none mt-0.5">{p.title}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Questions & Answer Input */}
        <div className={`${result ? "lg:col-span-5" : "lg:col-span-12"} space-y-4`}>
          <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            
            {/* Question Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Select Question ({questions.length})
                </span>
                <span className="text-[11px] font-mono text-purple-400">
                  {activePersonaObj.name}&apos;s Question Bank
                </span>
              </div>

              {loadingQuestions ? (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Loading tailored questions...</span>
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {questions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => setSelectedQuestion(q)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2 ${
                        selectedQuestion?.id === q.id
                          ? "bg-purple-950/30 border-purple-500/50 text-white font-medium shadow"
                          : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[9px] font-mono shrink-0 uppercase">
                        {q.category}
                      </span>
                      <span className="line-clamp-2 leading-relaxed">{q.question}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Active Question Box */}
            {selectedQuestion && (
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-purple-400 shrink-0" />
                  <span className="text-xs font-bold text-purple-300 font-mono uppercase">
                    Interviewer Prompt:
                  </span>
                </div>
                <p className="text-xs text-white font-medium leading-relaxed">
                  {selectedQuestion.question}
                </p>
                <div className="text-[11px] text-slate-400 font-mono pt-1">
                  <strong className="text-purple-400/80">Evaluation Focus: </strong>
                  {selectedQuestion.context}
                </div>
              </div>
            )}

            {/* Candidate Answer Box */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Your Answer (STAR Method)
                </label>
                <button
                  onClick={() => setCandidateAnswer(sampleAnswer)}
                  className="text-[11px] font-mono text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Load Sample Answer
                </button>
              </div>
              <textarea
                rows={initialEmbedded ? 6 : 9}
                value={candidateAnswer}
                onChange={(e) => setCandidateAnswer(e.target.value)}
                placeholder="State Situation -> Task -> Action -> Result with hard metrics..."
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-purple-500 transition-colors resize-y"
              />
            </div>

            <button
              onClick={handleEvaluate}
              disabled={evaluating || !selectedQuestion}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 transition-all cursor-pointer"
            >
              {evaluating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Grading STAR Rigor &amp; Technical Depth...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Submit Answer for AI Evaluation</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right Column: Score & Hiring Decision Rubric */}
        {result && (
          <div className="lg:col-span-7 space-y-6 animate-fadeIn">
            
            {/* Top Score Card */}
            <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl relative overflow-hidden space-y-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    Interviewer Scoring Verdict
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-4xl sm:text-5xl font-black font-mono text-white">
                      {result.overallScore}/100
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                      result.hiringDecision === "Strong Hire" || result.hiringDecision === "Hire"
                        ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                        : result.hiringDecision === "Lean Hire"
                        ? "bg-blue-500/10 text-blue-300 border border-blue-500/30"
                        : "bg-rose-500/10 text-rose-300 border border-rose-500/30"
                    }`}>
                      {result.hiringDecision}
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Evaluator</span>
                  <span className="text-xs font-bold text-white">{activePersonaObj.name}</span>
                  <span className="text-[10px] text-purple-400 font-mono block">{activePersonaObj.title}</span>
                </div>
              </div>

              {/* STAR Rubric Breakdown */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  STAR Method Score Breakdown
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400">Situation</span>
                      <span className="text-white font-bold">{result.starRubric.situation.score}%</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400">Task</span>
                      <span className="text-white font-bold">{result.starRubric.task.score}%</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400">Action</span>
                      <span className="text-purple-400 font-bold">{result.starRubric.action.score}%</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400">Result</span>
                      <span className="text-emerald-400 font-bold">{result.starRubric.result.score}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed 5-Point Rubric */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Detailed Competency Rubric
                </span>
                <div className="space-y-2">
                  {result.detailedRubric.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
                      <div className="flex items-center justify-between font-mono mb-1">
                        <span className="text-white font-medium">{item.name}</span>
                        <span className="text-purple-400 font-bold">{item.score}/100</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{item.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Improvement Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Key Strengths
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-rose-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Growth Opportunities
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {result.improvementAreas.map((imp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-400 mt-0.5">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 10/10 Model Answer Upgrade */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-purple-950/40 to-slate-950 border border-purple-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-purple-400" />
                    <span className="text-xs font-mono font-bold uppercase text-purple-300">
                      10/10 Staff-Level Model Answer Upgrade
                    </span>
                  </div>
                  <button
                    onClick={copyModelAnswer}
                    className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedModel ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Answer</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
                  {result.modelAnswer}
                </div>
              </div>

              {/* Follow-up Probing Question */}
              {result.followUpQuestion && (
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                    Interviewer Probing Follow-Up:
                  </span>
                  <p className="italic text-slate-200 font-serif text-[13px]">
                    &quot;{result.followUpQuestion}&quot;
                  </p>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
