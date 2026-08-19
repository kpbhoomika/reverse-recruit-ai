"use client";

import { useState, useEffect } from "react";
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
  Target,
  Sparkles,
  Check,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import { initialApplications, initialCandidates } from "@/lib/mock-data";
import { ApplicationItem, ApplicationStatus } from "@/lib/types";

export default function CandidateDashboard() {
  const [candidate, setCandidate] = useState(initialCandidates[0]);
  const [applications, setApplications] = useState<ApplicationItem[]>(initialApplications);
  const [activeFilter, setActiveFilter] = useState<"all" | ApplicationStatus>("all");
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(initialApplications[0]);

  // Load custom candidate data from localStorage if user completed onboarding
  useEffect(() => {
    try {
      const saved = localStorage.getItem("reverse_recruit_candidate");
      if (saved) {
        const parsed = JSON.parse(saved);
        setCandidate((prev) => ({
          ...prev,
          fullName: parsed.fullName || prev.fullName,
          email: parsed.email || prev.email,
          location: parsed.location || prev.location,
          tier: (parsed.tier as "student" | "professional") || prev.tier,
          targetRoles: parsed.targetRoles ? parsed.targetRoles.split(",").map((s: string) => s.trim()) : prev.targetRoles,
          minSalary: parsed.minSalary ? parseInt(parsed.minSalary.replace(/[^0-9]/g, "")) || prev.minSalary : prev.minSalary,
        }));
      }
    } catch (e) {
      console.log("Using default candidate profile...");
    }
  }, []);

  const updateStatus = (appId: string, newStatus: ApplicationStatus) => {
    setApplications(
      applications.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    );
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  const filteredApps = applications.filter((app) => {
    if (activeFilter === "all") return true;
    return app.status === activeFilter;
  });

  const interviewCount = applications.filter((a) => a.status === "Interview Scheduled").length;
  const screeningCount = applications.filter((a) => a.status === "Screening").length;
  const offerCount = applications.filter((a) => a.status === "Offer Received").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 lg:p-10 pt-28">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back, {candidate.fullName.split(" ")[0]}
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                {candidate.tier === "student" ? "Student Plan ($20/mo)" : "Pro Plan ($99/mo)"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Target: <span className="text-slate-200 font-medium">{candidate.targetRoles.join(", ")}</span> • {candidate.location}
            </p>
          </div>

          {/* Quick Tool Links */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard/resume-tailor"
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5 text-blue-400" />
              <span>ATS Tailor</span>
            </Link>
            <Link
              href="/dashboard/cover-letters"
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Send className="h-3.5 w-3.5 text-emerald-400" />
              <span>Outreach Pitch</span>
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

        {/* Guarantee Fulfillment Progress Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Main Guarantee Metric */}
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 space-y-3 shadow-lg shadow-emerald-500/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Interview Guarantee
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                100% Backed
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">
                {candidate.interviewsLanded} of {candidate.interviewsGuaranteed}
              </span>
              <span className="text-xs text-emerald-400 font-semibold">Interviews Secured</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${(candidate.interviewsLanded / candidate.interviewsGuaranteed) * 100}%` }}
              />
            </div>
          </div>

          {/* Total Dispatches */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Applications Dispatched
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">
                {candidate.applicationsSubmitted}
              </span>
              <span className="text-xs text-blue-400 font-semibold">+8 submitted today</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Greenhouse, Lever &amp; Ashby boards
            </p>
          </div>

          {/* Average ATS Match */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Average Match Index
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-indigo-400">
                94.6%
              </span>
              <span className="text-xs text-slate-400 font-medium">Top 2% Tier</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Google XYZ metric realignment active
            </p>
          </div>

        </div>

        {/* Accessible, Easy-to-Read Application Tracker */}
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Live Application Tracker</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Review your active job pipeline, scheduled interviews, and tailored dispatches.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-medium">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeFilter === "all" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                All ({applications.length})
              </button>
              <button
                onClick={() => setActiveFilter("Interview Scheduled")}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                  activeFilter === "Interview Scheduled" ? "bg-emerald-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Interviews</span>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">
                  {interviewCount}
                </span>
              </button>
              <button
                onClick={() => setActiveFilter("Screening")}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeFilter === "Screening" ? "bg-indigo-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Screening ({screeningCount})
              </button>
              <button
                onClick={() => setActiveFilter("Offer Received")}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeFilter === "Offer Received" ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Offers ({offerCount})
              </button>
            </div>
          </div>

          {/* Simple, Accessible List of Applications */}
          <div className="space-y-3">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 transition-all space-y-4 shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base sm:text-lg font-bold text-white">{app.companyName}</h3>
                      <span className="text-xs text-slate-400">• {app.location}</span>
                      <span className="font-mono text-[10px] font-bold text-blue-400 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20">
                        {app.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 font-medium">{app.roleTitle}</p>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value as ApplicationStatus)}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Screening">Screening</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Offer Received">Offer Received</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Interview Scheduled Highlight Banner */}
                {app.interviewDate && (
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold">
                      <Calendar className="h-4 w-4 text-emerald-400" />
                      <span>Interview Milestone: {new Date(app.interviewDate).toLocaleDateString()} at 3:00 PM</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 underline cursor-pointer">
                      Add to Calendar
                    </span>
                  </div>
                )}

                {/* Footer Details & Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
                    <span>Board: <strong>{app.atsPlatform}</strong></span>
                    <span>Applied: {app.appliedDate}</span>
                    {app.outreachSent && (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="h-3 w-3" /> InMail Pitch Sent
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/dashboard/resume-tailor"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium transition-colors"
                    >
                      View Tailored Resume
                    </Link>
                    <Link
                      href="/dashboard/cover-letters"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium transition-colors"
                    >
                      View Outreach Pitch
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
