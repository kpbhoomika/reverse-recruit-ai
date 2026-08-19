"use client";

import { useState } from "react";
import { RefreshCw, ExternalLink, Send } from "lucide-react";
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
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] p-6 sm:p-10">
      <div className="max-w-[1080px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-[#FFFFFF] p-8 rounded-[24px] border border-[#D2D2D7]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-[12px] uppercase font-semibold tracking-wider text-[#6E6E73] mb-1">
              Agency Operations
            </p>
            <h1 className="text-[28px] sm:text-[34px] font-semibold text-[#1D1D1F] tracking-tight">
              Reverse Recruiting Cockpit
            </h1>
            <p className="text-[14px] text-[#6E6E73]">
              Manage multi-client queues, review 1-click ATS matches, and track guarantee fulfillment.
            </p>
          </div>

          <button
            onClick={handleSyncJobs}
            disabled={isSyncing}
            className="apple-btn-interactive text-[13px] font-normal text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#E5E5EA] px-4 py-2 rounded-full border border-[#D2D2D7] flex items-center gap-2"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "Syncing..." : "Sync ATS Feeds"}</span>
          </button>
        </div>

        {/* 4 Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="apple-card-hover bg-[#FFFFFF] p-6 rounded-[20px] border border-[#D2D2D7]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <span className="text-[12px] uppercase font-semibold tracking-wider text-[#6E6E73] block mb-2">Monthly Revenue</span>
            <span className="text-[36px] font-semibold text-[#1D1D1F]">${totalRevenue}</span>
            <span className="text-[12px] text-[#6E6E73] block mt-1">1 Student ($20) • 2 Pros ($99)</span>
          </div>

          <div className="apple-card-hover bg-[#FFFFFF] p-6 rounded-[20px] border border-[#D2D2D7]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <span className="text-[12px] uppercase font-semibold tracking-wider text-[#6E6E73] block mb-2">Guarantee Goal</span>
            <span className="text-[36px] font-semibold text-[#1D1D1F]">{totalInterviewsLanded} <span className="text-[18px] text-[#6E6E73] font-normal">/ {totalInterviewsGuaranteed}</span></span>
            <span className="text-[12px] text-[#0071E3] block mt-1">60% Fulfillment rate</span>
          </div>

          <div className="apple-card-hover bg-[#FFFFFF] p-6 rounded-[20px] border border-[#D2D2D7]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <span className="text-[12px] uppercase font-semibold tracking-wider text-[#6E6E73] block mb-2">Total Dispatches</span>
            <span className="text-[36px] font-semibold text-[#1D1D1F]">{totalApplications}</span>
            <span className="text-[12px] text-[#6E6E73] block mt-1">+18 submitted today</span>
          </div>

          <div className="apple-card-hover bg-[#FFFFFF] p-6 rounded-[20px] border border-[#D2D2D7]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <span className="text-[12px] uppercase font-semibold tracking-wider text-[#6E6E73] block mb-2">Active Clients</span>
            <span className="text-[36px] font-semibold text-[#1D1D1F]">{candidates.length}</span>
            <span className="text-[12px] text-[#0071E3] block mt-1">100% Retained</span>
          </div>
        </div>

        {/* Tab Switch */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("clients")}
            className={`px-5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
              activeTab === "clients"
                ? "bg-[#1D1D1F] text-white shadow-sm"
                : "text-[#6E6E73] hover:text-[#1D1D1F] bg-[#FFFFFF] border border-[#D2D2D7]"
            }`}
          >
            Clients ({candidates.length})
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
              activeTab === "jobs"
                ? "bg-[#1D1D1F] text-white shadow-sm"
                : "text-[#6E6E73] hover:text-[#1D1D1F] bg-[#FFFFFF] border border-[#D2D2D7]"
            }`}
          >
            Job Pool ({jobs.length})
          </button>
        </div>

        {dispatchSuccess && (
          <div className="p-4 rounded-[14px] bg-[#FFFFFF] border border-[#0071E3]/40 text-[#0071E3] text-[13px] font-medium shadow-sm animate-fadeIn">
            ✓ {dispatchSuccess}
          </div>
        )}

        {/* TAB 1: CLIENT MANAGEMENT */}
        {activeTab === "clients" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Client List */}
            <div className="space-y-3 lg:col-span-1">
              <span className="text-[12px] uppercase font-semibold tracking-wider text-[#6E6E73] block">
                Active Candidates
              </span>
              {candidates.map((cand) => (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className={`p-5 rounded-[18px] border cursor-pointer transition-all ${
                    selectedCandidate.id === cand.id
                      ? "border-[#0071E3] bg-[#FFFFFF] shadow-md shadow-[#0071E3]/5"
                      : "border-[#D2D2D7]/80 bg-[#FFFFFF] hover:border-[#86868B]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[15px] text-[#1D1D1F]">{cand.fullName}</span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#F5F5F7] text-[#6E6E73]">
                      {cand.tier === "student" ? "$20 Student" : "$99 Pro"}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#6E6E73] line-clamp-1">{cand.targetRoles.join(", ")}</p>
                  <div className="mt-3 pt-3 border-t border-[#F5F5F7] flex items-center justify-between text-[12px]">
                    <span className="text-[#6E6E73]">{cand.applicationsSubmitted} Applied</span>
                    <span className="text-[#0071E3] font-medium">{cand.interviewsLanded}/{cand.interviewsGuaranteed} Interviews</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Client Operational Details */}
            <div className="lg:col-span-2 bg-[#FFFFFF] p-8 rounded-[24px] border border-[#D2D2D7]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#F5F5F7]">
                <div>
                  <h3 className="text-[24px] font-semibold text-[#1D1D1F]">{selectedCandidate.fullName}</h3>
                  <p className="text-[13px] text-[#6E6E73]">{selectedCandidate.email} • {selectedCandidate.phone} • {selectedCandidate.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[12px] text-[#6E6E73] block">Guaranteed Goal</span>
                  <span className="text-[20px] font-semibold text-[#1D1D1F]">
                    {selectedCandidate.interviewsLanded} / {selectedCandidate.interviewsGuaranteed} Landed
                  </span>
                </div>
              </div>

              {/* Data Rows (No grid lines, generous padding and hover state) */}
              <div className="space-y-3">
                <span className="text-[12px] uppercase font-semibold tracking-wider text-[#6E6E73] block">
                  Matched High-Yield Jobs Ready for Dispatch
                </span>

                <div className="space-y-2">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 rounded-[14px] bg-[#F5F5F7] hover:bg-[#EBEBEF] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[14px] text-[#1D1D1F]">{job.companyName}</span>
                          <span className="text-[12px] text-[#6E6E73]">• {job.location}</span>
                          <span className="text-[11px] font-mono text-[#0071E3] font-medium">{job.matchScore}% ATS Score</span>
                        </div>
                        <p className="text-[13px] text-[#1D1D1F] mt-0.5">{job.roleTitle}</p>
                        <p className="text-[11px] text-[#86868B]">{job.salaryRange || "Competitive"} • Via {job.atsPlatform}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={job.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-[#FFFFFF] text-[#6E6E73] hover:text-[#1D1D1F] border border-[#D2D2D7]"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                        <button
                          onClick={() => handleDispatch(job.roleTitle, job.companyName)}
                          className="apple-btn-interactive text-[12px] font-normal text-white bg-[#0071E3] hover:bg-[#0077ED] px-4 py-1.5 rounded-full"
                        >
                          1-Click Apply
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
              <div key={job.id} className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#D2D2D7]/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[12px] text-[#6E6E73]">{job.companyName}</span>
                    <h4 className="text-[16px] font-semibold text-[#1D1D1F]">{job.roleTitle}</h4>
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F5F5F7] text-[#6E6E73]">
                    {job.atsPlatform}
                  </span>
                </div>
                <p className="text-[13px] text-[#6E6E73] line-clamp-2">{job.description}</p>
                <div className="pt-3 border-t border-[#F5F5F7] flex items-center justify-between text-[12px]">
                  <span className="text-[#86868B]">{job.salaryRange || "Disclosed on screen"}</span>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apple-link text-[12px]"
                  >
                    View Board ›
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
