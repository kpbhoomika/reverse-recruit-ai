"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  UserCheck, 
  Flame, 
  Award, 
  Sparkles, 
  ArrowRight,
  Zap,
  Layers,
  Cpu,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import DiagnoserStudio from "../tools/DiagnoserStudio";
import RecruiterMatrixStudio from "../tools/RecruiterMatrixStudio";
import RewriterXYZStudio from "../tools/RewriterXYZStudio";
import MockInterviewStudio from "../tools/MockInterviewStudio";

type PersonaTab = "diagnoser" | "recruiter" | "rewriter" | "hiring_manager";

export default function PersonaShowcase() {
  const [activeTab, setActiveTab] = useState<PersonaTab>("diagnoser");

  const tabs: {
    id: PersonaTab;
    name: string;
    role: string;
    tag: string;
    badge: string;
    color: string;
    activeBorder: string;
    activeGlow: string;
    icon: typeof ShieldCheck;
    headline: string;
    tagline: string;
  }[] = [
    {
      id: "diagnoser",
      name: "Diagnoser",
      role: "ATS Structural Scanner",
      tag: "Flags Parsing & Formatting Hazards",
      badge: "01 / Scanner",
      color: "from-rose-500 to-red-600",
      activeBorder: "border-rose-500/50",
      activeGlow: "shadow-rose-500/20",
      icon: ShieldCheck,
      headline: "Deep ATS Structural & Formatting Scanner",
      tagline: "Scans resume against enterprise applicant tracking parsers (Greenhouse, Workday, Lever), flags section hierarchy issues, contact parsing hazards, and weak verb structures.",
    },
    {
      id: "recruiter",
      name: "Recruiter",
      role: "Job Spec Cross-Referencer",
      tag: "Missing Keywords & Boolean Sourcing",
      badge: "02 / Keyword Lens",
      color: "from-indigo-500 to-blue-600",
      activeBorder: "border-indigo-500/50",
      activeGlow: "shadow-indigo-500/20",
      icon: UserCheck,
      headline: "Recruiter Keyword Matrix & Boolean Filter Sourcing",
      tagline: "Cross-references your resume against live job specs, identifies missing boolean keywords that cause instant auto-rejection, and calculates your applicant percentile.",
    },
    {
      id: "rewriter",
      name: "Rewriter",
      role: "Google XYZ Bullet Transformer",
      tag: "Accomplished X, measured by Y, doing Z",
      badge: "03 / Impact Formula",
      color: "from-amber-500 to-orange-600",
      activeBorder: "border-amber-500/50",
      activeGlow: "shadow-amber-500/20",
      icon: Flame,
      headline: "Google XYZ Formula Bullet Point Transformer",
      tagline: "Re-engineers weak bullets into executive, metric-heavy Google XYZ accomplishments (*Accomplished [X], measured by [Y], by doing [Z]*) with 95%+ impact scoring.",
    },
    {
      id: "hiring_manager",
      name: "Hiring Manager",
      role: "Mock Interview Persona",
      tag: "STAR Rubric & Answer Scorer",
      badge: "04 / Interview Arena",
      color: "from-purple-500 to-indigo-600",
      activeBorder: "border-purple-500/50",
      activeGlow: "shadow-purple-500/20",
      icon: Award,
      headline: "AI Hiring Manager Arena & STAR Answer Scorer",
      tagline: "Practice role-tailored interview questions against rigorous FAANG Director & Startup CTO personas. Get real-time STAR rubric scores, hiring decisions, and 10/10 model answers.",
    },
  ];

  const currentTabObj = tabs.find((t) => t.id === activeTab) || tabs[0];
  const Icon = currentTabObj.icon;

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-rose-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-slate-300 shadow-inner">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>4-in-1 Autonomous Career Suite</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Four Specialized AI Personas. <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-indigo-400 to-purple-400">
            One Unfair Career Advantage.
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Every stage of your job hunt is handled by a specialized intelligence engine—from structural ATS verification to real-time hiring manager answer scoring.
        </p>
      </div>

      {/* 4 Interactive Persona Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10 mb-8">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          const TabIcon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-5 rounded-3xl border text-left transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? `bg-slate-900 ${tab.activeBorder} shadow-xl ${tab.activeGlow} scale-[1.02]`
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80"
              }`}
            >
              {/* Active top line glow */}
              {isSelected && (
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tab.color}`} />
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                    {tab.badge}
                  </span>
                  <div
                    className={`h-8 w-8 rounded-xl bg-gradient-to-tr ${tab.color} flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110`}
                  >
                    <TabIcon className="h-4 w-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-white tracking-tight">
                    {tab.name}
                  </h3>
                  <span className="text-xs text-slate-300 font-medium block">
                    {tab.role}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="truncate pr-2">{tab.tag}</span>
                <ArrowRight className={`h-3 w-3 transition-transform ${isSelected ? "text-white translate-x-0.5" : "text-slate-500"}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Studio Live Showcase Container */}
      <div className="relative z-10 bg-slate-950/80 backdrop-blur-xl rounded-3xl border border-slate-800/80 p-6 sm:p-10 shadow-2xl space-y-8">
        
        {/* Studio Sub-Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-start gap-4">
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${currentTabObj.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase font-bold text-slate-400">
                  Active Live Studio
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                {currentTabObj.headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                {currentTabObj.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Persona Tool */}
        <div className="w-full">
          {activeTab === "diagnoser" && <DiagnoserStudio initialEmbedded={true} />}
          {activeTab === "recruiter" && <RecruiterMatrixStudio initialEmbedded={true} />}
          {activeTab === "rewriter" && <RewriterXYZStudio initialEmbedded={true} />}
          {activeTab === "hiring_manager" && <MockInterviewStudio initialEmbedded={true} />}
        </div>

      </div>

    </section>
  );
}
