"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Clock, 
  ExternalLink, 
  Cpu, 
  Sparkles, 
  FileText, 
  Send, 
  Linkedin, 
  DollarSign,
  Activity,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";
import { initialApplications, initialCandidates } from "@/lib/mock-data";
import { ApplicationItem, ApplicationStatus } from "@/lib/types";

export default function CandidateDashboard() {
  const [candidate] = useState(initialCandidates[0]);
  const [applications, setApplications] = useState<ApplicationItem[]>(initialApplications);
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(initialApplications[0]);

  const stages: ApplicationStatus[] = [
    "Applied",
    "Screening",
    "Interview Scheduled",
    "Offer Received",
  ];

  const updateStatus = (appId: string, newStatus: ApplicationStatus) => {
    setApplications(
      applications.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    );
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-[#F1F5F9] p-6 sm:p-10 pt-28">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* ===================================================================== */}
        {/* CAREER COMMAND CENTER HEADER                                          */}
        {/* ===================================================================== */}
        <div className="glass-surface-elevated p-8 sm:p-10 rounded-3xl border border-border-light relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  CAREER ENGINE ● ACTIVE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-200 border border-border-subtle text-[11px] font-mono text-muted">
                  {candidate.tier === "student" ? "Student Plan ($20)" : "Pro IT Plan ($99)"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
                Good evening, {candidate.fullName.split(" ")[0]}.
              </h1>
              <p className="text-sm text-muted max-w-xl leading-relaxed">
                Your autonomous agent is monitoring Greenhouse and Lever career feeds. 3 new high-match roles ingested today.
              </p>
            </div>

            {/* Studio Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/dashboard/resume-tailor"
                className="btn-secondary-glass text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <FileText className="h-3.5 w-3.5 text-cyan-400" />
                <span>ATS Tailor</span>
              </Link>
              <Link
                href="/dashboard/cover-letters"
                className="btn-secondary-glass text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5 text-emerald-400" />
                <span>Outreach</span>
              </Link>
              <Link
                href="/dashboard/offer-negotiator"
                className="btn-primary-glow text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <DollarSign className="h-3.5 w-3.5" />
                <span>Negotiator</span>
              </Link>
            </div>
          </div>

          {/* Telemetry Stream Strip */}
          <div className="mt-8 pt-6 border-t border-border-subtle grid grid-cols-2 sm:grid-cols-5 gap-4 text-left font-mono">
            <div>
              <span className="text-[10px] text-muted uppercase tracking-wider block">Jobs Analyzed</span>
              <span className="text-xl font-bold text-foreground">148</span>
            </div>
            <div>
              <span className="text-[10px] text-muted uppercase tracking-wider block">High-Match Tier</span>
              <span className="text-xl font-bold text-cyan-300">32</span>
            </div>
            <div>
              <span className="text-[10px] text-muted uppercase tracking-wider block">Dispatched</span>
              <span className="text-xl font-bold text-foreground">{candidate.applicationsSubmitted}</span>
            </div>
            <div>
              <span className="text-[10px] text-muted uppercase tracking-wider block">InMail Replies</span>
              <span className="text-xl font-bold text-blue-400">11</span>
            </div>
            <div>
              <span className="text-[10px] text-muted uppercase tracking-wider block">Interviews Landed</span>
              <span className="text-xl font-bold text-emerald-400">{candidate.interviewsLanded} / {candidate.interviewsGuaranteed}</span>
            </div>
          </div>

        </div>

        {/* ===================================================================== */}
        {/* PIPELINE COMMAND MATRIX (STAGES)                                      */}
        {/* ===================================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Stage Pipeline Matrix</h2>
              <p className="text-xs text-muted">Real-time status synced with employer webhook queues</p>
            </div>
            <span className="font-mono text-xs text-cyan-400">Sync: Operational</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map((stage) => {
              const items = applications.filter((a) => a.status === stage);
              return (
                <div
                  key={stage}
                  className="glass-surface p-4 rounded-2xl border border-border-subtle min-h-[380px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-3">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
                        {stage}
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-300">
                        {items.length}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {items.map((app) => {
                        const isSelected = selectedApp?.id === app.id;
                        return (
                          <div
                            key={app.id}
                            onClick={() => setSelectedApp(app)}
                            className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? "bg-surface-200 border-cyan-400 shadow-glow"
                                : "bg-surface-100/70 border-border-subtle hover:border-border-light hover:bg-surface-200/50"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-foreground">{app.companyName}</span>
                              <span className="font-mono text-[10px] text-emerald-400 font-bold">
                                {app.matchScore}% Match
                              </span>
                            </div>

                            <p className="text-xs text-muted line-clamp-1">{app.roleTitle}</p>

                            {app.interviewDate && (
                              <div className="mt-2.5 p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300 flex items-center gap-1.5">
                                <Clock className="h-3 w-3 text-emerald-400" />
                                <span>{new Date(app.interviewDate).toLocaleDateString()}</span>
                              </div>
                            )}

                            <div className="mt-2 pt-2 border-t border-border-subtle/50 flex items-center justify-between text-[10px] font-mono text-muted">
                              <span>{app.atsPlatform}</span>
                              <span>{app.appliedDate}</span>
                            </div>
                          </div>
                        );
                      })}

                      {items.length === 0 && (
                        <div className="h-24 flex items-center justify-center font-mono text-[11px] text-muted/60 border border-dashed border-border-subtle rounded-xl">
                          No Active Jobs
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* SELECTED APPLICATION INSPECTION PANEL                                */}
        {/* ===================================================================== */}
        {selectedApp && (
          <div className="glass-surface-elevated p-8 rounded-3xl border border-border-light space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
              <div>
                <span className="text-eyebrow-telemetry block mb-1">Application Telemetry</span>
                <h3 className="text-2xl font-bold text-foreground">
                  {selectedApp.roleTitle} @ {selectedApp.companyName}
                </h3>
                <p className="text-xs text-muted mt-1">
                  {selectedApp.location} • Via {selectedApp.atsPlatform} • Applied {selectedApp.appliedDate}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedApp.status}
                  onChange={(e) => updateStatus(selectedApp.id, e.target.value as ApplicationStatus)}
                  className="px-4 py-2 text-xs font-mono rounded-full bg-surface-100 border border-border-light text-foreground focus:outline-none focus:border-cyan-400"
                >
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Offer Received">Offer Received</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <Link
                  href="/dashboard/resume-tailor"
                  className="btn-primary-glow text-xs py-2 px-4"
                >
                  Inspect Tailored Resume
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-surface-100 border border-border-subtle space-y-1">
                <span className="text-cyan-300 font-semibold uppercase tracking-wider block">
                  Dual-Channel Recruiter Outreach:
                </span>
                <p className="text-muted leading-relaxed font-sans text-xs">
                  {selectedApp.outreachSent 
                    ? `✓ Direct 3-sentence introduction pitch delivered to ${selectedApp.recruiterEmail || "Hiring Lead"}`
                    : "Queued for recruiter warm-inbound"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-100 border border-border-subtle space-y-1">
                <span className="text-emerald-400 font-semibold uppercase tracking-wider block">
                  Audit Notes &amp; Optimization:
                </span>
                <p className="text-muted leading-relaxed font-sans text-xs">
                  {selectedApp.notes || "Auto-dispatched via Greenhouse API parser with XYZ metric rewrites."}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
