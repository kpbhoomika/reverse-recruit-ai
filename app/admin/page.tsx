"use client";

import { useState } from "react";
import { RefreshCw, ExternalLink, Send, ShieldCheck, Activity, Cpu, Users, DollarSign } from "lucide-react";
import { initialCandidates, initialJobs } from "@/lib/mock-data";
import { CandidateProfile, JobPosting } from "@/lib/types";

export default function AgencyAdminCockpit() {
  const [candidates, setCandidates] = useState<CandidateProfile[]>(initialCandidates);
  const [jobs] = useState<JobPosting[]>(initialJobs);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile>(initialCandidates[0]);
  const [activeTab, setActiveTab] = useState<"clients" | "jobs">("clients");
  const [isSyncing, setIsSyncing] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState<string | null>(null);

  const totalRevenue = candidates.reduce((acc, c) => acc + (c.tier === "student" ? 20 : 99), 0);
  const totalInterviewsGuaranteed = candidates.reduce((acc, c) => acc + c.interviewsGuaranteed, 0);
  const totalInterviewsLanded = candidates.reduce((acc, c) => acc + c.interviewsLanded, 0);
  const totalApplications = candidates.reduce((acc, c) => acc + c.applicationsSubmitted, 0);

  const handleSyncJobs = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 800);
  };

  const handleDispatch = (jobTitle: string, company: string) => {
    setDispatchSuccess(`Dispatched application for ${selectedCandidate.fullName} to ${company} (${jobTitle})`);
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
    <div className="min-h-screen bg-[#F7F3EA] text-[#2B050E] p-6 sm:p-10 pt-28">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Telemetry Bar (Wine) */}
        <div className="bg-[#3D0814] text-[#FAF5EE] p-8 rounded-3xl border border-white/10 shadow-warm-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-[#D91C44] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Agency Operations Cockpit
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Reverse Recruiting Operations
            </h1>
            <p className="text-xs text-[#FAF5EE]/80 mt-1">
              Multi-candidate dispatch queue, guarantee fulfillment tracking, and ATS board ingestion feeds.
            </p>
          </div>

          <button
            onClick={handleSyncJobs}
            disabled={isSyncing}
            className="btn-wine-outline text-xs py-2.5 px-5 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin text-[#D91C44]" : ""}`} />
            <span>{isSyncing ? "Syncing ATS Feeds..." : "Sync Live ATS Feeds"}</span>
          </button>
        </div>

        {/* 4 Metrics Telemetry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#3D0814]/10 shadow-warm">
            <span className="text-[10px] text-[#706556] uppercase tracking-wider block mb-1">Monthly Agency MRR</span>
            <span className="text-3xl font-bold text-[#2B050E]">${totalRevenue}</span>
            <span className="text-[11px] text-[#706556] block mt-1">1 Student ($20) • 2 Pros ($99)</span>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#3D0814]/10 shadow-warm">
            <span className="text-[10px] text-[#706556] uppercase tracking-wider block mb-1">Guarantee Fulfillment</span>
            <span className="text-3xl font-bold text-[#D91C44]">{totalInterviewsLanded} <span className="text-sm text-[#706556] font-normal">/ {totalInterviewsGuaranteed}</span></span>
            <span className="text-[11px] text-[#706556] block mt-1">60% Fulfillment rate</span>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#3D0814]/10 shadow-warm">
            <span className="text-[10px] text-[#706556] uppercase tracking-wider block mb-1">Total Dispatches</span>
            <span className="text-3xl font-bold text-[#2B050E]">{totalApplications}</span>
            <span className="text-[11px] text-emerald-600 block mt-1">+18 submitted today</span>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#3D0814]/10 shadow-warm">
            <span className="text-[10px] text-[#706556] uppercase tracking-wider block mb-1">Active Clients</span>
            <span className="text-3xl font-bold text-[#2B050E]">{candidates.length}</span>
            <span className="text-[11px] text-emerald-600 block mt-1">100% Client Retention</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab("clients")}
            className={`px-5 py-2 rounded-full transition-all ${
              activeTab === "clients"
                ? "bg-[#3D0814] text-white font-bold shadow-sm"
                : "text-[#706556] hover:text-[#2B050E] bg-[#FFFFFF] border border-[#3D0814]/10"
            }`}
          >
            Candidate Queue ({candidates.length})
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-5 py-2 rounded-full transition-all ${
              activeTab === "jobs"
                ? "bg-[#3D0814] text-white font-bold shadow-sm"
                : "text-[#706556] hover:text-[#2B050E] bg-[#FFFFFF] border border-[#3D0814]/10"
            }`}
          >
            ATS Job Pool ({jobs.length})
          </button>
        </div>

        {dispatchSuccess && (
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#D91C44] text-[#D91C44] text-xs font-mono shadow-md animate-fadeIn font-semibold">
            ✓ {dispatchSuccess}
          </div>
        )}

        {/* TAB 1: CLIENT MANAGEMENT */}
        {activeTab === "clients" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Candidate List (1 col) */}
            <div className="space-y-3 lg:col-span-1">
              <span className="font-mono text-xs text-[#706556] uppercase tracking-wider block font-bold">
                Active Client Queue
              </span>
              {candidates.map((cand) => (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedCandidate.id === cand.id
                      ? "bg-[#3D0814] text-white border-[#D91C44] shadow-warm-lg"
                      : "bg-[#FFFFFF] border-[#3D0814]/10 hover:border-[#3D0814]/30 text-[#2B050E]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">{cand.fullName}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#D91C44] text-white">
                      {cand.tier === "student" ? "$20 Student" : "$99 Pro"}
                    </span>
                  </div>
                  <p className={`text-xs ${selectedCandidate.id === cand.id ? "text-[#FAF5EE]/80" : "text-[#706556]"} line-clamp-1`}>
                    {cand.targetRoles.join(", ")}
                  </p>
                  <div className={`mt-3 pt-2.5 border-t ${selectedCandidate.id === cand.id ? "border-white/10" : "border-[#3D0814]/10"} flex items-center justify-between font-mono text-[11px]`}>
                    <span className={selectedCandidate.id === cand.id ? "text-[#FAF5EE]/70" : "text-[#706556]"}>
                      {cand.applicationsSubmitted} Applied
                    </span>
                    <span className="text-[#D91C44] font-bold">
                      {cand.interviewsLanded}/{cand.interviewsGuaranteed} Landed
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Client Operational Details (2 cols) */}
            <div className="lg:col-span-2 bg-[#FFFFFF] p-8 rounded-3xl border border-[#3D0814]/10 shadow-warm space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#3D0814]/10">
                <div>
                  <h3 className="text-2xl font-bold text-[#2B050E]">{selectedCandidate.fullName}</h3>
                  <p className="text-xs text-[#706556] mt-0.5">{selectedCandidate.email} • {selectedCandidate.phone} • {selectedCandidate.location}</p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[10px] text-[#706556] uppercase block">Guaranteed Goal</span>
                  <span className="text-lg font-bold text-[#D91C44]">
                    {selectedCandidate.interviewsLanded} / {selectedCandidate.interviewsGuaranteed} Landed
                  </span>
                </div>
              </div>

              {/* Data Rows for 1-Click Dispatch */}
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#706556] uppercase tracking-wider block font-bold">
                  Matched High-Yield Jobs Ready for 1-Click Dispatch
                </span>

                <div className="space-y-2.5">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 hover:border-[#3D0814]/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#2B050E]">{job.companyName}</span>
                          <span className="text-xs text-[#706556]">• {job.location}</span>
                          <span className="font-mono text-[10px] text-[#D91C44] font-bold px-1.5 py-0.2 rounded bg-[#D91C44]/10">
                            {job.matchScore}% Match
                          </span>
                        </div>
                        <p className="text-xs text-[#2B050E] mt-0.5">{job.roleTitle}</p>
                        <p className="text-[11px] font-mono text-[#706556]">{job.salaryRange || "Competitive"} • Via {job.atsPlatform}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={job.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-[#FFFFFF] text-[#706556] hover:text-[#2B050E] border border-[#3D0814]/10"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                        <button
                          onClick={() => handleDispatch(job.roleTitle, job.companyName)}
                          className="btn-crimson text-xs py-1.5 px-4"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#3D0814]/10 shadow-warm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#706556] font-mono">{job.companyName}</span>
                    <h4 className="text-base font-bold text-[#2B050E]">{job.roleTitle}</h4>
                  </div>
                  <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#F7F3EA] border border-[#3D0814]/10 text-[#D91C44] font-bold">
                    {job.atsPlatform}
                  </span>
                </div>
                <p className="text-xs text-[#706556] line-clamp-2 leading-relaxed">{job.description}</p>
                <div className="pt-3 border-t border-[#3D0814]/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#706556]">{job.salaryRange || "Disclosed on screening"}</span>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D91C44] hover:underline inline-flex items-center gap-1 font-bold"
                  >
                    <span>View Career Board</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
