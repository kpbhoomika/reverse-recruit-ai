"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Clock, 
  ExternalLink, 
  FileText, 
  Send, 
  Linkedin, 
  DollarSign,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Building,
  Target
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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 pt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {candidate.fullName}
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                {candidate.tier === "student" ? "Student Autopilot ($20)" : "Pro IT Autopilot ($99)"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              {candidate.targetRoles.join(" • ")} • Min Comp: ${candidate.minSalary.toLocaleString()}/yr
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard/resume-tailor"
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5 text-blue-400" />
              <span>ATS Tailor</span>
            </Link>
            <Link
              href="/dashboard/cover-letters"
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Send className="h-3.5 w-3.5 text-emerald-400" />
              <span>Outreach</span>
            </Link>
            <Link
              href="/dashboard/offer-negotiator"
              className="px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <DollarSign className="h-3.5 w-3.5" />
              <span>Negotiator</span>
            </Link>
          </div>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Interviews Landed</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{candidate.interviewsLanded}</span>
              <span className="text-xs text-slate-400">/ {candidate.interviewsGuaranteed} goal</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${(candidate.interviewsLanded / candidate.interviewsGuaranteed) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Applications Dispatched</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{candidate.applicationsSubmitted}</span>
              <span className="text-xs font-semibold text-blue-400">+8 today</span>
            </div>
            <span className="text-[11px] text-slate-500 block">Greenhouse &amp; Lever feeds</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Average ATS Match</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-indigo-400">94.8%</span>
            </div>
            <span className="text-[11px] text-slate-500 block">0 hallucination keyword fit</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">InMail Replies</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-purple-400">11</span>
              <span className="text-xs font-semibold text-emerald-400">72% open rate</span>
            </div>
            <span className="text-[11px] text-slate-500 block">Direct hiring managers</span>
          </div>
        </div>

        {/* Pipeline Kanban */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Application Pipeline</h2>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              Live Sync Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map((stage) => {
              const items = applications.filter((a) => a.status === stage);
              return (
                <div
                  key={stage}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 min-h-[380px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                        {stage}
                      </span>
                      <span className="text-xs font-mono font-bold text-blue-400">
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
                            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                              isSelected
                                ? "bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-500/10"
                                : "bg-slate-950/80 border-slate-800/80 hover:border-slate-700"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-white">{app.companyName}</span>
                              <span className="font-mono text-[10px] font-bold text-blue-400">
                                {app.matchScore}% Match
                              </span>
                            </div>

                            <p className="text-xs text-slate-400 line-clamp-1">{app.roleTitle}</p>

                            {app.interviewDate && (
                              <div className="mt-2 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{new Date(app.interviewDate).toLocaleDateString()}</span>
                              </div>
                            )}

                            <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
                              <span>{app.atsPlatform}</span>
                              <span>{app.appliedDate}</span>
                            </div>
                          </div>
                        );
                      })}

                      {items.length === 0 && (
                        <div className="h-20 flex items-center justify-center font-mono text-xs text-slate-600">
                          No active applications
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Application Details */}
        {selectedApp && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase font-semibold">Application Details</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {selectedApp.roleTitle} @ {selectedApp.companyName}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedApp.location} • Via {selectedApp.atsPlatform} • Applied {selectedApp.appliedDate}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedApp.status}
                  onChange={(e) => updateStatus(selectedApp.id, e.target.value as ApplicationStatus)}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Offer Received">Offer Received</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <Link
                  href="/dashboard/resume-tailor"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
                >
                  Tailored Resume
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Hiring Manager Outreach:</span>
                <p className="text-slate-300 font-sans text-xs">
                  {selectedApp.outreachSent 
                    ? `✓ 3-sentence introduction sent to ${selectedApp.recruiterEmail || "Hiring Lead"}`
                    : "Queued for direct recruiter message"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Application Notes:</span>
                <p className="text-slate-300 font-sans text-xs">
                  {selectedApp.notes || "Auto-dispatched via direct ATS webhook integration."}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
