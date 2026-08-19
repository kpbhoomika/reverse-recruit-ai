"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  Sparkles, 
  Calendar, 
  Send, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Building2, 
  DollarSign, 
  Linkedin, 
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { initialApplications, initialCandidates } from "@/lib/mock-data";
import { ApplicationItem, ApplicationStatus } from "@/lib/types";
import { getStatusColor } from "@/lib/utils";

export default function CandidateDashboard() {
  const [candidate, setCandidate] = useState(initialCandidates[0]);
  const [applications, setApplications] = useState<ApplicationItem[]>(initialApplications);
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(initialApplications[0]);

  const columns: ApplicationStatus[] = [
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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Profile Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-extrabold shadow-lg shadow-blue-500/20">
              {candidate.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">{candidate.fullName}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {candidate.tier === "student" ? "Student Tier ($20)" : "Pro IT Tier ($99)"}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Autopilot Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Targeting: {candidate.targetRoles.join(" • ")} | Min Comp: ${candidate.minSalary.toLocaleString()}/yr
              </p>
            </div>
          </div>

          {/* Quick Action Hub */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard/resume-tailor"
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5 text-blue-400" />
              <span>ATS Tailor</span>
            </Link>
            <Link
              href="/dashboard/cover-letters"
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Send className="h-3.5 w-3.5 text-purple-400" />
              <span>Cover Pitch</span>
            </Link>
            <Link
              href="/dashboard/offer-negotiator"
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 transition-colors flex items-center gap-1.5"
            >
              <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
              <span>Negotiate Offer</span>
            </Link>
          </div>
        </div>

        {/* 4 Core Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Interviews Landed</span>
              <Calendar className="h-4 w-4 text-purple-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{candidate.interviewsLanded}</span>
              <span className="text-xs text-slate-400">/ {candidate.interviewsGuaranteed} Guaranteed</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${(candidate.interviewsLanded / candidate.interviewsGuaranteed) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Applications Dispatched</span>
              <Briefcase className="h-4 w-4 text-blue-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{candidate.applicationsSubmitted}</span>
              <span className="text-xs text-emerald-400 font-semibold">+8 today</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Greenhouse, Lever &amp; Ashby boards</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Average Match Score</span>
              <Sparkles className="h-4 w-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-400">93.4%</span>
              <span className="text-xs text-slate-400">High Precision</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">100% Zero-hallucination ATS match</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Recruiter InMails</span>
              <Linkedin className="h-4 w-4 text-sky-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">24</span>
              <span className="text-xs text-sky-400 font-semibold">18 Opened</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Direct hiring manager outreach</p>
          </div>

        </div>

        {/* ===================================================================== */}
        {/* MAIN APPLICATION PIPELINE (KANBAN) */}
        {/* ===================================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Live Application Tracker</h2>
              <p className="text-xs text-slate-400">Real-time status updates synced with candidate email webhook</p>
            </div>
            <span className="text-xs text-slate-500 font-mono">Auto-syncing every 3 hours</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {columns.map((column) => {
              const items = applications.filter((a) => a.status === column);
              return (
                <div key={column} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 min-h-[420px]">
                  
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      {column}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                      {items.length}
                    </span>
                  </div>

                  {/* Cards inside column */}
                  <div className="space-y-3">
                    {items.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedApp(app)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          selectedApp?.id === app.id
                            ? "bg-slate-800 border-blue-500/80 shadow-md shadow-blue-500/10"
                            : "bg-slate-950/80 border-slate-800/80 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">{app.companyName}</span>
                          <span className="text-[10px] font-bold text-emerald-400 font-mono">
                            {app.matchScore}% Match
                          </span>
                        </div>
                        
                        <p className="text-[11px] text-slate-300 font-medium line-clamp-1">{app.roleTitle}</p>
                        <p className="text-[10px] text-slate-500 mt-1">{app.location}</p>

                        {app.interviewDate && (
                          <div className="mt-2 p-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-300 font-medium flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Interview: {new Date(app.interviewDate).toLocaleDateString()}</span>
                          </div>
                        )}

                        <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                          <span>{app.atsPlatform}</span>
                          <span className="text-slate-500">{app.appliedDate}</span>
                        </div>
                      </div>
                    ))}

                    {items.length === 0 && (
                      <div className="h-24 flex items-center justify-center border border-dashed border-slate-800 rounded-xl text-xs text-slate-600">
                        No applications in this stage
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Application Details & Quick Actions Modal/Drawer */}
        {selectedApp && (
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Application Detail</span>
                <h3 className="text-xl font-bold text-white">{selectedApp.roleTitle} @ {selectedApp.companyName}</h3>
                <p className="text-xs text-slate-400">{selectedApp.location} • Via {selectedApp.atsPlatform} • Applied on {selectedApp.appliedDate}</p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedApp.status}
                  onChange={(e) => updateStatus(selectedApp.id, e.target.value as ApplicationStatus)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Offer Received">Offer Received</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <Link
                  href="/dashboard/resume-tailor"
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                >
                  View Tailored Resume
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="font-bold text-slate-300 block mb-1">Recruiter InMail Outreach:</span>
                <p className="text-slate-400 leading-relaxed">
                  {selectedApp.outreachSent 
                    ? `✓ Direct 3-sentence introduction sent to ${selectedApp.recruiterEmail || "Hiring Team"}`
                    : "Queued for direct recruiter message"}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="font-bold text-slate-300 block mb-1">Application Notes:</span>
                <p className="text-slate-400 leading-relaxed">
                  {selectedApp.notes || "Auto-submitted via Greenhouse API parser with tailored XYZ metrics."}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
