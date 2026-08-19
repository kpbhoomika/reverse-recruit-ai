"use client";

import { useState } from "react";
import { 
  FileText, 
  Cpu, 
  Target, 
  ShieldCheck, 
  Send, 
  UserCheck, 
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp
} from "lucide-react";

interface NodeData {
  id: string;
  label: string;
  stage: string;
  metric: string;
  status: "active" | "completed" | "standby";
  detail: string;
}

export default function CareerIntelligenceGraph() {
  const [activeNode, setActiveNode] = useState<string>("ats");

  const nodes: NodeData[] = [
    {
      id: "resume",
      label: "Master Profile",
      stage: "01 / Ingestion",
      metric: "48 Skills Extracted",
      status: "completed",
      detail: "Full repository and work history parsed into structured vector embeddings.",
    },
    {
      id: "matching",
      label: "JD Semantic Match",
      stage: "02 / Intelligence",
      metric: "Top 2.4% Tier",
      status: "completed",
      detail: "Direct Greenhouse/Lever/Ashby jobs filtered within 48h posting window.",
    },
    {
      id: "ats",
      label: "ATS Reverse-Engineered",
      stage: "03 / Optimization",
      metric: "96.2% Compatibility",
      status: "active",
      detail: "Google XYZ bullet point realignment with 0 hallucination guarantee.",
    },
    {
      id: "dispatch",
      label: "Dual-Channel Dispatch",
      stage: "04 / Execution",
      metric: "150+ Dispatched",
      status: "active",
      detail: "Autonomous portal submission + 3-sentence direct recruiter InMail pitch.",
    },
    {
      id: "interview",
      label: "Verified Interview",
      stage: "05 / Milestone",
      metric: "5+ Landed",
      status: "completed",
      detail: "Direct screening links synced to calendar with AI company briefing packet.",
    },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto my-8">
      {/* Background ambient container glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-blue-500/10 rounded-3xl blur-2xl -z-10" />

      <div className="glass-surface-elevated rounded-3xl p-6 sm:p-10 border border-border-light relative overflow-hidden">
        
        {/* Top Telemetry Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border-subtle gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-bright"></span>
            </div>
            <div>
              <span className="text-eyebrow-telemetry block">Autonomous Career Engine</span>
              <h3 className="text-sm font-semibold text-foreground">Real-Time Application Graph</h3>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <span className="px-2 py-0.5 rounded-full bg-surface-200 border border-border-subtle text-cyan-300">
              Live Pipeline Active
            </span>
            <span>Latency: 140ms</span>
          </div>
        </div>

        {/* The Node Network Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative z-10">
          {nodes.map((node, index) => {
            const isSelected = activeNode === node.id;
            return (
              <div
                key={node.id}
                onMouseEnter={() => setActiveNode(node.id)}
                onClick={() => setActiveNode(node.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "bg-surface-200/90 border-cyan-400/50 shadow-[0_0_30px_rgba(56,189,248,0.15)] scale-[1.02]"
                    : "bg-surface-100/60 border-border-subtle hover:border-border-light hover:bg-surface-200/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted mb-2">
                    <span>{node.stage}</span>
                    {node.status === "active" ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-bright animate-pulse" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    )}
                  </div>

                  <h4 className="text-sm font-semibold text-foreground tracking-tight mb-1">
                    {node.label}
                  </h4>

                  <span className="text-xs font-mono font-medium text-cyan-300 block">
                    {node.metric}
                  </span>
                </div>

                <div className="mt-4 pt-2 border-t border-border-subtle/50 flex items-center justify-between text-[10px] text-muted">
                  <span>Inspect node</span>
                  <ArrowRight className="h-3 w-3 text-cyan-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Telemetry Detail Banner */}
        <div className="mt-6 p-5 rounded-2xl bg-surface-100/80 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted block">
              Node Telemetry Analysis:
            </span>
            <p className="text-sm text-foreground font-medium">
              {nodes.find((n) => n.id === activeNode)?.detail}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-[10px] font-mono text-muted block">Target Goal</span>
              <span className="text-xs font-mono font-bold text-emerald-400">5 Interviews Minimum</span>
            </div>
            <div className="h-8 w-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
