"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Building2, 
  Plus, 
  Search, 
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { initialCandidates, initialJobs } from "@/lib/mock-data";
import { CandidateProfile, JobPosting } from "@/lib/types";

export default function AgencyAdminCockpit() {
  const [candidates, setCandidates] = useState<CandidateProfile[]>(initialCandidates);
  const [jobs, setJobs] = useState<JobPosting[]>(initialJobs);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile>(initialCandidates[0]);
  const [activeTab, setActiveTab] = useState<"clients" | "jobs" | "dispatch">("clients");
  const [isSyncing, setIsSyncing] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState<string | null>(null);

  // Revenue computation
  const totalRevenue = candidates.reduce((acc, c) => acc + (c.tier === "student" ? 20 : 99), 0);
  const totalInterviewsGuaranteed = candidates.reduce((acc, c) => acc + c.interviewsGuaranteed, 0);
  const totalInterviewsLanded = candidates.reduce((acc, c) => acc + c.interviewsLanded, 0);
  const totalApplications = candidates.reduce((acc, c) => acc + c.applicationsSubmitted, 0);

  const handleSyncJobs = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1000);
  };

  const handleDispatch = (jobTitle: string, company: string) => {
    setDispatchSuccess(`Dispatched application for ${selectedCandidate.fullName} to ${company} (${jobTitle})`);
    // Update candidate count
    setCandidates(
      candidates.map((c) =>
        c.id === selectedCandidate.id
          ? { ...c, applicationsSubmitted: c.applicationsSubmitted + 1 }
          : c
      )
    );
    setTimeout(() => setDispatchSuccess(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Agency Admin Cockpit
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Reverse Recruiting Operations Command
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage client queues, dispatch tailored ATS applications, and track the 5-interview guarantee milestone.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSyncJobs}
              disabled={isSyncing}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-blue-400 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Syncing..." : "Sync Live ATS Feeds"}</span>
            </button>
          </div>
        </div>

        {/* Agency Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Agency MRR</span>
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-400">${totalRevenue}</span>
              <span className="text-xs text-slate-400">/ mo</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">1 Student ($20) • 2 Pros ($99)</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Guaranteed Interviews</span>
              <Calendar className="h-4 w-4 text-purple-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{totalInterviewsLanded}</span>
              <span className="text-xs text-slate-400">/ {totalInterviewsGuaranteed} target</span>
            </div>
            <p className="text-[11px] text-purple-400 font-medium mt-2">60% Guarantee Fulfillment Rate</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Dispatches</span>
              <Send className="h-4 w-4 text-blue-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{totalApplications}</span>
              <span className="text-xs text-blue-400 font-semibold">+18 today</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Greenhouse, Lever, Ashby</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Clients</span>
              <Users className="h-4 w-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{candidates.length}</span>
              <span className="text-xs text-emerald-400 font-semibold">100% Retained</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Zero refund requests</p>
          </div>

        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab("clients")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === "clients"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            Client Management Queue ({candidates.length})
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === "jobs"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            Live ATS Job Pool ({jobs.length})
          </button>
        </div>

        {dispatchSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{dispatchSuccess}</span>
          </div>
        )}

        {/* TAB 1: CLIENT MANAGEMENT QUEUE */}
        {activeTab === "clients" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Client List */}
            <div className="space-y-3 lg:col-span-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Select Candidate
              </span>
              {candidates.map((cand) => (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedCandidate.id === cand.id
                      ? "bg-slate-900 border-blue-500/80 shadow-md shadow-blue-500/10"
                      : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-white">{cand.fullName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      cand.tier === "student" ? "bg-blue-500/10 text-blue-400" : "bg-indigo-500/10 text-indigo-400"
                    }`}>
                      {cand.tier === "student" ? "$20 Student" : "$99 Pro"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-1">{cand.targetRoles.join(", ")}</p>
                  
                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">{cand.applicationsSubmitted} Applied</span>
                    <span className="text-purple-400 font-semibold">{cand.interviewsLanded}/{cand.interviewsGuaranteed} Interviews</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Client Operational Details */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedCandidate.fullName}</h3>
                  <p className="text-xs text-slate-400">{selectedCandidate.email} • {selectedCandidate.phone} • {selectedCandidate.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Guaranteed Goal</span>
                  <span className="text-lg font-extrabold text-purple-400">
                    {selectedCandidate.interviewsLanded} / {selectedCandidate.interviewsGuaranteed} Landed
                  </span>
                </div>
              </div>

              {/* Preferences Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Min Salary</span>
                  <span className="text-white font-bold">${selectedCandidate.minSalary.toLocaleString()}/yr</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Experience</span>
                  <span className="text-white font-bold">{selectedCandidate.yearsOfExperience} Years</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Visa Status</span>
                  <span className="text-white font-bold">{selectedCandidate.visaStatus}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Blacklist</span>
                  <span className="text-rose-400 font-bold">{selectedCandidate.blacklistedCompanies.join(", ") || "None"}</span>
                </div>
              </div>

              {/* Direct Job Match & 1-Click Dispatch Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-blue-400" /> Matched High-Yield Jobs Ready for Dispatch
                  </span>
                  <span className="text-xs text-slate-400">Showing top ATS matches</span>
                </div>

                <div className="space-y-2.5">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{job.companyName}</span>
                          <span className="text-xs text-slate-400">• {job.location}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 font-mono">
                            {job.matchScore}% ATS Score
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium mt-0.5">{job.roleTitle}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{job.salaryRange || "Competitive"} • Via {job.atsPlatform}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={job.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                          title="Open ATS Form"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleDispatch(job.roleTitle, job.companyName)}
                          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors"
                        >
                          <Send className="h-3 w-3" />
                          <span>1-Click Apply</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: LIVE ATS JOB POOL */}
        {activeTab === "jobs" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-medium">
                Active Job Boards Ingested: <strong>Greenhouse, Lever, Ashby</strong> (Updated daily at 6:00 AM UTC via GitHub Actions)
              </span>
              <span className="text-xs text-emerald-400 font-mono">5 Fresh Roles Ingested</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <div key={job.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 font-medium">{job.companyName}</span>
                      <h4 className="text-base font-bold text-white">{job.roleTitle}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-400 font-mono">
                      {job.atsPlatform}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{job.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {job.requiredSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 text-[10px] rounded-md bg-slate-800 text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{job.salaryRange || "Compensation disclosed on interview"}</span>
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
                    >
                      <span>View Career Board</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
