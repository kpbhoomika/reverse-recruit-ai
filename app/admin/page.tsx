"use client";

import { useState } from "react";
import { 
  RefreshCw, 
  ExternalLink, 
  Send, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Users, 
  DollarSign,
  Linkedin,
  Search,
  Sparkles,
  Copy,
  Check,
  Target,
  ArrowUpRight,
  TrendingUp,
  UserPlus,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { initialCandidates, initialJobs, initialClientLeads } from "@/lib/mock-data";
import { CandidateProfile, JobPosting, ClientLead, LeadStatus } from "@/lib/types";

export default function AgencyAdminCockpit() {
  const [candidates, setCandidates] = useState<CandidateProfile[]>(initialCandidates);
  const [jobs] = useState<JobPosting[]>(initialJobs);
  const [leads, setLeads] = useState<ClientLead[]>(initialClientLeads);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile>(initialCandidates[0]);
  const [selectedLead, setSelectedLead] = useState<ClientLead>(initialClientLeads[0]);
  const [activeTab, setActiveTab] = useState<"clients" | "jobs" | "leads">("leads");
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState<string | null>(null);
  const [copiedDm, setCopiedDm] = useState(false);
  const [leadTierFilter, setLeadTierFilter] = useState<"all" | "student" | "professional">("all");

  const totalRevenue = candidates.reduce((acc, c) => acc + (c.tier === "student" ? 20 : 99), 0);
  const totalInterviewsGuaranteed = candidates.reduce((acc, c) => acc + c.interviewsGuaranteed, 0);
  const totalInterviewsLanded = candidates.reduce((acc, c) => acc + c.interviewsLanded, 0);
  const totalApplications = candidates.reduce((acc, c) => acc + c.applicationsSubmitted, 0);
  const convertedLeadsCount = leads.filter((l) => l.status.startsWith("Converted")).length;

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

  const updateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads(leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
    if (selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const getPersonalizedPitch = (lead: ClientLead) => {
    const firstName = lead.fullName.split(" ")[0];
    const isStudent = lead.suggestedTier === "student";
    const planPrice = isStudent ? "$20/mo" : "$99/mo";
    const guarantee = isStudent ? "3–5 guaranteed interviews" : "5+ senior tech interviews guaranteed";

    return `Hey ${firstName}, saw your #OpenToWork post looking for ${lead.targetRole} roles!

The current tech market is brutal — manual portal applications usually yield under a 1% response rate due to ATS filters.

I run ReverseRecruit.ai — we take over your entire application pipeline on autopilot:
• We tailor & apply to 150+ verified roles on your behalf with 95%+ ATS matching.
• We pitch hiring managers directly via InMail.
• Backed by our ${guarantee} or 100% money-back guarantee (only ${planPrice}).

Would love to send over a free ATS keyword scan of your profile if you'd like to see where your resume currently ranks!`;
  };

  const copyDmPitch = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDm(true);
    setTimeout(() => setCopiedDm(false), 2000);
  };

  const filteredLeads = leads.filter((l) => {
    if (leadTierFilter === "all") return true;
    return l.suggestedTier === leadTierFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 pt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Telemetry Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Agency Operations Cockpit
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Reverse Recruiting Operations &amp; Growth
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Client fulfillment queue, LinkedIn #OpenToWork client finder, and automated job dispatches.
            </p>
          </div>

          <button
            onClick={handleSyncJobs}
            disabled={isSyncing}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white flex items-center gap-2 shrink-0 transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin text-blue-400" : ""}`} />
            <span>{isSyncing ? "Syncing ATS Feeds..." : "Sync Live ATS Feeds"}</span>
          </button>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Monthly Agency MRR</span>
            <span className="text-3xl font-extrabold text-white">${totalRevenue}</span>
            <span className="text-[11px] text-slate-400 block mt-1">1 Student ($20) • 2 Pros ($99)</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Guarantee Fulfillment</span>
            <span className="text-3xl font-extrabold text-emerald-400">{totalInterviewsLanded} <span className="text-sm text-slate-400 font-normal">/ {totalInterviewsGuaranteed}</span></span>
            <span className="text-[11px] text-blue-400 block mt-1">60% Fulfillment rate</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Client Leads Sourced</span>
            <span className="text-3xl font-extrabold text-indigo-400">{leads.length}</span>
            <span className="text-[11px] text-emerald-400 block mt-1">{convertedLeadsCount} Converted to Paid</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Total Dispatches</span>
            <span className="text-3xl font-extrabold text-white">{totalApplications}</span>
            <span className="text-[11px] text-blue-400 block mt-1">+18 submitted today</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-5 py-2.5 rounded-xl transition-all font-semibold flex items-center gap-2 ${
              activeTab === "leads"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
            }`}
          >
            <Linkedin className="h-3.5 w-3.5 text-blue-400" />
            <span>LinkedIn #OpenToWork Lead Finder ({leads.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={`px-5 py-2.5 rounded-xl transition-all font-semibold ${
              activeTab === "clients"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
            }`}
          >
            Candidate Queue ({candidates.length})
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-5 py-2.5 rounded-xl transition-all font-semibold ${
              activeTab === "jobs"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
            }`}
          >
            ATS Job Pool ({jobs.length})
          </button>
        </div>

        {dispatchSuccess && (
          <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/50 text-emerald-400 text-xs font-mono shadow-md animate-fadeIn font-semibold">
            ✓ {dispatchSuccess}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 1: LINKEDIN #OPENTOWORK LEAD FINDER & OUTREACH                      */}
        {/* ========================================================================= */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            
            {/* Google X-Ray Search Shortcuts Banner */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Search className="h-4 w-4 text-blue-400" />
                  <span>Instant LinkedIn #OpenToWork X-Ray Search Triggers</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">100% Free • Opens Pre-Filtered Searches</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <a
                  href='https://www.google.com/search?q=site%3Alinkedin.com%2Fin%2F+%22Open+to+work%22+(%22Computer+Science%22+OR+%22New+Grad%22+OR+%222026%22)+%22Software+Engineer%22'
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-white block">Students &amp; Freshers ($20)</span>
                    <span className="text-[11px] text-slate-400 font-mono">CS Grads • 0–2 YOE</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-blue-400" />
                </a>

                <a
                  href='https://www.google.com/search?q=site%3Alinkedin.com%2Fin%2F+%22Open+to+work%22+(%22Senior+Software+Engineer%22+OR+%22Staff+Engineer%22)+%22Remote%22'
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-white block">Senior Software Engineers ($99)</span>
                    <span className="text-[11px] text-slate-400 font-mono">Staff/Senior SWE • 3+ YOE</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-indigo-400" />
                </a>

                <a
                  href='https://www.google.com/search?q=site%3Alinkedin.com%2Fin%2F+%22Open+to+work%22+(%22affected+by+layoffs%22+OR+%22open+to+new+opportunities%22)+%22Software+Engineer%22'
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-white block">Recent Layoffs (High Intent)</span>
                    <span className="text-[11px] text-slate-400 font-mono">Urgent active job seekers</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Split Screen Leads Manager & Outreach Generator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Sourced Candidates List */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider">
                    Sourced Candidates ({filteredLeads.length})
                  </span>

                  {/* Filter Switch */}
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    <button
                      onClick={() => setLeadTierFilter("all")}
                      className={`px-2 py-0.5 rounded ${leadTierFilter === "all" ? "bg-blue-600 text-white" : "text-slate-400"}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setLeadTierFilter("student")}
                      className={`px-2 py-0.5 rounded ${leadTierFilter === "student" ? "bg-blue-600 text-white" : "text-slate-400"}`}
                    >
                      $20
                    </button>
                    <button
                      onClick={() => setLeadTierFilter("professional")}
                      className={`px-2 py-0.5 rounded ${leadTierFilter === "professional" ? "bg-blue-600 text-white" : "text-slate-400"}`}
                    >
                      $99
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredLeads.map((lead) => {
                    const isSelected = selectedLead.id === lead.id;
                    return (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-500/10"
                            : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-white">{lead.fullName}</span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-blue-400 border border-slate-700">
                            {lead.suggestedTier === "student" ? "$20 Student" : "$99 Pro"}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-1 mb-2">{lead.headline}</p>

                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                          <span className="flex items-center gap-1 text-amber-400">
                            <Clock className="h-3 w-3" /> Looking {lead.daysLooking}d
                          </span>
                          <span className={lead.status.startsWith("Converted") ? "text-emerald-400 font-bold" : "text-blue-400"}>
                            {lead.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Lead Dossier & 1-Click Outreach Generator */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                
                {/* Dossier Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-mono text-emerald-400 font-semibold">#OpenToWork Lead Dossier</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mt-1">{selectedLead.fullName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{selectedLead.location} • Source: {selectedLead.source}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={selectedLead.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Linkedin className="h-3.5 w-3.5 text-blue-400" />
                      <span>Open LinkedIn</span>
                      <ArrowUpRight className="h-3 w-3 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* ATS Audit Score Gap */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block mb-1">Estimated Baseline ATS Score</span>
                    <span className="text-2xl font-bold text-rose-400">{selectedLead.estimatedAtsScore}%</span>
                    <p className="text-[11px] text-slate-500 mt-1">High rejection risk in portal queues</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block mb-1">Missing Critical Keywords</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedLead.missingSkills.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 1-Click DM Generator */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" /> 1-Click Personalized DM Pitch
                    </span>
                    <button
                      onClick={() => copyDmPitch(getPersonalizedPitch(selectedLead))}
                      className="text-xs font-mono text-blue-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      {copiedDm ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedDm ? "Copied to Clipboard!" : "Copy DM Pitch"}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/30 text-xs font-mono text-slate-200 whitespace-pre-line leading-relaxed">
                    {getPersonalizedPitch(selectedLead)}
                  </div>
                </div>

                {/* Lead Status Pipeline Controller */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-slate-400">Pipeline Status:</span>
                    <select
                      value={selectedLead.status}
                      onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as LeadStatus)}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold focus:outline-none focus:border-blue-500"
                    >
                      <option value="New Lead">New Lead</option>
                      <option value="DM Sent">DM Sent</option>
                      <option value="Audit Sent">Audit Sent</option>
                      <option value="Converted ($20)">Converted ($20 Student Plan)</option>
                      <option value="Converted ($99)">Converted ($99 Pro Plan)</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      copyDmPitch(getPersonalizedPitch(selectedLead));
                      updateLeadStatus(selectedLead.id, "DM Sent");
                    }}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Copy &amp; Mark as DM Sent</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CANDIDATE FULFILLMENT QUEUE                                       */}
        {/* ========================================================================= */}
        {activeTab === "clients" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Candidate List (1 col) */}
            <div className="space-y-3 lg:col-span-1">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block font-bold">
                Active Client Queue
              </span>
              {candidates.map((cand) => (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedCandidate.id === cand.id
                      ? "bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-500/10"
                      : "bg-slate-900/80 border-slate-800/80 hover:border-slate-700 text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">{cand.fullName}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-blue-400">
                      {cand.tier === "student" ? "$20 Student" : "$99 Pro"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {cand.targetRoles.join(", ")}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between font-mono text-[11px]">
                    <span className="text-slate-400">
                      {cand.applicationsSubmitted} Applied
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {cand.interviewsLanded}/{cand.interviewsGuaranteed} Landed
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Client Operational Details (2 cols) */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{selectedCandidate.fullName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedCandidate.email} • {selectedCandidate.phone} • {selectedCandidate.location}</p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[10px] text-slate-400 uppercase block">Guaranteed Goal</span>
                  <span className="text-lg font-bold text-emerald-400">
                    {selectedCandidate.interviewsLanded} / {selectedCandidate.interviewsGuaranteed} Landed
                  </span>
                </div>
              </div>

              {/* Data Rows for 1-Click Dispatch */}
              <div className="space-y-3">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block font-bold">
                  Matched High-Yield Jobs Ready for 1-Click Dispatch
                </span>

                <div className="space-y-2.5">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{job.companyName}</span>
                          <span className="text-xs text-slate-400">• {job.location}</span>
                          <span className="font-mono text-[10px] text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20">
                            {job.matchScore}% Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">{job.roleTitle}</p>
                        <p className="text-[11px] font-mono text-slate-500">{job.salaryRange || "Competitive"} • Via {job.atsPlatform}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={job.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                        <button
                          onClick={() => handleDispatch(job.roleTitle, job.companyName)}
                          className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors flex items-center gap-1"
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

        {/* ========================================================================= */}
        {/* TAB 3: LIVE ATS JOB POOL                                                 */}
        {/* ========================================================================= */}
        {activeTab === "jobs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-mono">{job.companyName}</span>
                    <h4 className="text-base font-bold text-white">{job.roleTitle}</h4>
                  </div>
                  <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-blue-400 font-bold">
                    {job.atsPlatform}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{job.description}</p>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">{job.salaryRange || "Disclosed on screening"}</span>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline inline-flex items-center gap-1 font-semibold"
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
