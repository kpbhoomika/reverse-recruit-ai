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
    <div className="min-h-screen bg-[#F7F3EA] text-[#2B050E] p-6 sm:p-10 pt-28">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header (Wine Burgundy) */}
        <div className="bg-[#3D0814] text-[#FAF5EE] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-warm-lg relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D91C44] flex items-center gap-1.5 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-[#D91C44] animate-pulse" />
                  CAREER ENGINE ● ACTIVE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-mono text-[#FAF5EE]/80">
                  {candidate.tier === "student" ? "Student Plan ($20)" : "Pro IT Plan ($99)"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Good evening, {candidate.fullName.split(" ")[0]}.
              </h1>
              <p className="text-sm text-[#FAF5EE]/80 max-w-xl leading-relaxed">
                Your autonomous engine is active across Greenhouse and Lever feeds. 3 new high-match roles ingested today.
              </p>
            </div>

            {/* Studio Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/dashboard/resume-tailor"
                className="btn-wine-outline text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <FileText className="h-3.5 w-3.5 text-[#D91C44]" />
                <span>ATS Tailor</span>
              </Link>
              <Link
                href="/dashboard/cover-letters"
                className="btn-wine-outline text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5 text-emerald-400" />
                <span>Outreach</span>
              </Link>
              <Link
                href="/dashboard/offer-negotiator"
                className="btn-crimson text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <DollarSign className="h-3.5 w-3.5" />
                <span>Negotiator</span>
              </Link>
            </div>
          </div>

          {/* Telemetry Stream Strip */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-5 gap-4 text-left font-mono">
            <div>
              <span className="text-[10px] text-[#FAF5EE]/70 uppercase tracking-wider block">Jobs Analyzed</span>
              <span className="text-2xl font-bold text-white">148</span>
            </div>
            <div>
              <span className="text-[10px] text-[#FAF5EE]/70 uppercase tracking-wider block">High-Match Tier</span>
              <span className="text-2xl font-bold text-[#D91C44]">32</span>
            </div>
            <div>
              <span className="text-[10px] text-[#FAF5EE]/70 uppercase tracking-wider block">Dispatched</span>
              <span className="text-2xl font-bold text-white">{candidate.applicationsSubmitted}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#FAF5EE]/70 uppercase tracking-wider block">InMail Replies</span>
              <span className="text-2xl font-bold text-emerald-400">11</span>
            </div>
            <div>
              <span className="text-[10px] text-[#FAF5EE]/70 uppercase tracking-wider block">Interviews Landed</span>
              <span className="text-2xl font-bold text-white">{candidate.interviewsLanded} / {candidate.interviewsGuaranteed}</span>
            </div>
          </div>
        </div>

        {/* Pipeline Stage Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#2B050E]">Application Pipeline Matrix</h2>
              <p className="text-xs text-[#706556]">Real-time status synced with employer webhook queues</p>
            </div>
            <span className="font-mono text-xs text-[#D91C44] font-semibold">Sync: Operational</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map((stage) => {
              const items = applications.filter((a) => a.status === stage);
              return (
                <div
                  key={stage}
                  className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#3D0814]/10 shadow-warm min-h-[380px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#3D0814]/10 mb-3">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#706556]">
                        {stage}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#D91C44]">
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
                                ? "bg-[#3D0814] text-white border-[#D91C44] shadow-md"
                                : "bg-[#F7F3EA] border-[#3D0814]/5 hover:border-[#3D0814]/20"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-bold ${isSelected ? "text-white" : "text-[#2B050E]"}`}>
                                {app.companyName}
                              </span>
                              <span className="font-mono text-[10px] font-bold text-[#D91C44]">
                                {app.matchScore}% Match
                              </span>
                            </div>

                            <p className={`text-xs ${isSelected ? "text-[#FAF5EE]/80" : "text-[#706556]"} line-clamp-1`}>
                              {app.roleTitle}
                            </p>

                            {app.interviewDate && (
                              <div className="mt-2.5 p-1.5 rounded-lg bg-[#D91C44]/15 border border-[#D91C44]/30 text-[10px] font-mono text-[#D91C44] flex items-center gap-1.5">
                                <Clock className="h-3 w-3" />
                                <span>{new Date(app.interviewDate).toLocaleDateString()}</span>
                              </div>
                            )}

                            <div className={`mt-2 pt-2 border-t ${isSelected ? "border-white/10 text-[#FAF5EE]/60" : "border-[#3D0814]/10 text-[#706556]"} flex items-center justify-between text-[10px] font-mono`}>
                              <span>{app.atsPlatform}</span>
                              <span>{app.appliedDate}</span>
                            </div>
                          </div>
                        );
                      })}

                      {items.length === 0 && (
                        <div className="h-24 flex items-center justify-center font-mono text-[11px] text-[#706556]/60 border border-dashed border-[#3D0814]/10 rounded-xl">
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

        {/* Selected Application Details */}
        {selectedApp && (
          <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#3D0814]/10 shadow-warm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#3D0814]/10">
              <div>
                <span className="text-xs font-mono text-[#D91C44] uppercase font-bold tracking-wider block mb-1">
                  Application Telemetry
                </span>
                <h3 className="text-2xl font-bold text-[#2B050E]">
                  {selectedApp.roleTitle} @ {selectedApp.companyName}
                </h3>
                <p className="text-xs text-[#706556] mt-1">
                  {selectedApp.location} • Via {selectedApp.atsPlatform} • Applied {selectedApp.appliedDate}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedApp.status}
                  onChange={(e) => updateStatus(selectedApp.id, e.target.value as ApplicationStatus)}
                  className="px-4 py-2 text-xs font-mono rounded-full bg-[#F7F3EA] border border-[#3D0814]/10 text-[#2B050E] focus:outline-none focus:border-[#D91C44]"
                >
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Offer Received">Offer Received</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <Link
                  href="/dashboard/resume-tailor"
                  className="btn-crimson text-xs py-2 px-4"
                >
                  Tailored Resume
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/5 space-y-1">
                <span className="text-[#D91C44] font-bold uppercase tracking-wider block">
                  Dual-Channel Outreach:
                </span>
                <p className="text-[#706556] leading-relaxed font-sans text-xs">
                  {selectedApp.outreachSent 
                    ? `✓ Direct 3-sentence introduction pitch delivered to ${selectedApp.recruiterEmail || "Hiring Lead"}`
                    : "Queued for recruiter warm-inbound"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/5 space-y-1">
                <span className="text-[#2B050E] font-bold uppercase tracking-wider block">
                  Optimization Notes:
                </span>
                <p className="text-[#706556] leading-relaxed font-sans text-xs">
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
