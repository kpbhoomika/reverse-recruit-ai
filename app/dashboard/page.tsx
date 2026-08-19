"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Clock, ExternalLink } from "lucide-react";
import { initialApplications, initialCandidates } from "@/lib/mock-data";
import { ApplicationItem, ApplicationStatus } from "@/lib/types";

export default function CandidateDashboard() {
  const [candidate] = useState(initialCandidates[0]);
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
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] p-6 sm:p-10">
      <div className="max-w-[1080px] mx-auto space-y-10">
        
        {/* Header Profile Bar (Spec-Sheet Style) */}
        <div className="bg-[#FFFFFF] p-8 rounded-[24px] border border-[#D2D2D7]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-[28px] sm:text-[34px] font-semibold text-[#1D1D1F] tracking-tight">
                {candidate.fullName}
              </h1>
              <span className="text-[12px] font-medium px-2.5 py-0.5 rounded-full bg-[#F5F5F7] text-[#1D1D1F] border border-[#D2D2D7]">
                {candidate.tier === "student" ? "$20 Student" : "$99 Pro IT"}
              </span>
            </div>
            <p className="text-[14px] text-[#6E6E73]">
              {candidate.targetRoles.join(" • ")} • Min Comp: ${candidate.minSalary.toLocaleString()}/yr
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/resume-tailor"
              className="apple-btn-interactive text-[13px] font-normal text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#E5E5EA] px-4 py-2 rounded-full border border-[#D2D2D7]"
            >
              ATS Tailor
            </Link>
            <Link
              href="/dashboard/cover-letters"
              className="apple-btn-interactive text-[13px] font-normal text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#E5E5EA] px-4 py-2 rounded-full border border-[#D2D2D7]"
            >
              Outreach
            </Link>
            <Link
              href="/dashboard/offer-negotiator"
              className="apple-btn-interactive text-[13px] font-normal text-white bg-[#1D1D1F] hover:bg-[#333336] px-4 py-2 rounded-full shadow-sm"
            >
              Negotiator
            </Link>
          </div>
        </div>

        {/* 4 Spec Sheet Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="apple-card-hover bg-[#FFFFFF] p-6 rounded-[20px] border border-[#D2D2D7]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <span className="text-[12px] uppercase font-semibold tracking-wider text-[#6E6E73]">
              Interviews Landed
            </span>
            <div className="my-4">
              <span className="text-[44px] font-semibold text-[#1D1D1F] leading-none">
                {candidate.interviewsLanded}
              </span>
              <span className="text-[14px] text-[#6E6E73] ml-1">/ {candidate.interviewsGuaranteed} goal</span>
            </div>
            <div className="h-1 w-full bg-[#F5F5F7] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1D1D1F] rounded-full"
                style={{ width: `${(candidate.interviewsLanded / candidate.interviewsGuaranteed) * 100}%` }}
              />
            </div>
          </div>

          <div className="apple-card-hover bg-[#FFFFFF] p-6 rounded-[20px] border border-[#D2D2D7]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <span className="text-[12px] uppercase font-semibold tracking-wider text-[#6E6E73]">
              Applications
            </span>
            <div className="my-4">
              <span className="text-[44px] font-semibold text-[#1D1D1F] leading-none">
                {candidate.applicationsSubmitted}
              </span>
              <span className="text-[13px] text-[#0071E3] font-medium ml-2">+8 today</span>
            </div>
            <span className="text-[12px] text-[#86868B]">Greenhouse, Lever &amp; Ashby</span>
          </div>

          <div className="apple-card-hover bg-[#FFFFFF] p-6 rounded-[20px] border border-[#D2D2D7]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <span className="text-[12px] uppercase font-semibold tracking-wider text-[#6E6E73]">
              Avg Match Score
            </span>
            <div className="my-4">
              <span className="text-[44px] font-semibold text-[#1D1D1F] leading-none">
                93.4%
              </span>
            </div>
            <span className="text-[12px] text-[#86868B]">100% Truthful ATS match</span>
          </div>

          <div className="apple-card-hover bg-[#FFFFFF] p-6 rounded-[20px] border border-[#D2D2D7]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <span className="text-[12px] uppercase font-semibold tracking-wider text-[#6E6E73]">
              InMail Outreach
            </span>
            <div className="my-4">
              <span className="text-[44px] font-semibold text-[#1D1D1F] leading-none">
                24
              </span>
              <span className="text-[13px] text-[#0071E3] font-medium ml-2">18 read</span>
            </div>
            <span className="text-[12px] text-[#86868B]">Direct hiring managers</span>
          </div>

        </div>

        {/* Pipeline Tracker (Kanban) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[20px] font-semibold text-[#1D1D1F]">Application Pipeline</h2>
              <p className="text-[13px] text-[#6E6E73]">Real-time status synced with verified ATS endpoints.</p>
            </div>
            <span className="text-[12px] text-[#86868B]">Syncs every 3 hours</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {columns.map((column) => {
              const items = applications.filter((a) => a.status === column);
              const isActive = column === "Interview Scheduled" || column === "Offer Received";
              return (
                <div key={column} className="bg-[#FFFFFF] p-4 rounded-[18px] border border-[#D2D2D7]/80 min-h-[380px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#F5F5F7] mb-3">
                      <span className="text-[12px] font-semibold uppercase tracking-wider text-[#1D1D1F]">
                        {column}
                      </span>
                      <span className="text-[12px] text-[#6E6E73] font-medium">
                        {items.length}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {items.map((app) => (
                        <div
                          key={app.id}
                          onClick={() => setSelectedApp(app)}
                          className={`p-3 rounded-[12px] border cursor-pointer transition-all ${
                            selectedApp?.id === app.id
                              ? "border-[#0071E3] bg-[#0071E3]/[0.02] shadow-sm"
                              : "border-[#E5E5EA] hover:border-[#D2D2D7] bg-[#FFFFFF]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[13px] font-semibold text-[#1D1D1F]">{app.companyName}</span>
                            <span className="text-[11px] font-mono text-[#0071E3]">{app.matchScore}%</span>
                          </div>
                          <p className="text-[12px] text-[#6E6E73] line-clamp-1">{app.roleTitle}</p>

                          {app.interviewDate && (
                            <div className="mt-2 text-[11px] text-[#1D1D1F] font-medium flex items-center gap-1">
                              <Clock className="h-3 w-3 text-[#0071E3]" />
                              <span>{new Date(app.interviewDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      ))}

                      {items.length === 0 && (
                        <div className="h-20 flex items-center justify-center text-[12px] text-[#86868B]">
                          No applications
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
          <div className="bg-[#FFFFFF] p-8 rounded-[24px] border border-[#D2D2D7]/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F5F5F7]">
              <div>
                <span className="text-[12px] uppercase font-semibold text-[#6E6E73] tracking-wider">Application Detail</span>
                <h3 className="text-[24px] font-semibold text-[#1D1D1F] mt-0.5">{selectedApp.roleTitle} @ {selectedApp.companyName}</h3>
                <p className="text-[13px] text-[#6E6E73]">{selectedApp.location} • Applied via {selectedApp.atsPlatform} on {selectedApp.appliedDate}</p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedApp.status}
                  onChange={(e) => updateStatus(selectedApp.id, e.target.value as ApplicationStatus)}
                  className="px-4 py-2 text-[13px] font-medium rounded-full bg-[#F5F5F7] border border-[#D2D2D7] text-[#1D1D1F] focus:outline-none focus:border-[#0071E3]"
                >
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Offer Received">Offer Received</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <Link
                  href="/dashboard/resume-tailor"
                  className="apple-btn-interactive text-[13px] font-normal text-white bg-[#0071E3] hover:bg-[#0077ED] px-4 py-2 rounded-full"
                >
                  Tailored Resume
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
              <div className="p-4 rounded-[14px] bg-[#F5F5F7]">
                <span className="font-semibold text-[#1D1D1F] block mb-1">Recruiter InMail Outreach</span>
                <p className="text-[#6E6E73] leading-relaxed">
                  {selectedApp.outreachSent 
                    ? `✓ 3-Sentence intro sent to ${selectedApp.recruiterEmail || "Hiring Manager"}`
                    : "Queued for recruiter outreach"}
                </p>
              </div>
              <div className="p-4 rounded-[14px] bg-[#F5F5F7]">
                <span className="font-semibold text-[#1D1D1F] block mb-1">Application Notes</span>
                <p className="text-[#6E6E73] leading-relaxed">
                  {selectedApp.notes || "Submitted via direct ATS API feed."}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
