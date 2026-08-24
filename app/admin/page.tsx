"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/db";
import { 
  RefreshCw, 
  ExternalLink, 
  Send, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Users, 
  DollarSign,
  Briefcase,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AgencyAdminCockpit() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"clients" | "jobs">("clients");
  const [isLoading, setIsLoading] = useState(true);
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchRealData();
  }, []);

  async function fetchRealData() {
    setIsLoading(true);
    // Fetch live candidates
    const { data: cData } = await supabase.from("candidates").select("*").order("created_at", { ascending: false });
    if (cData) setCandidates(cData);
    
    // Fetch live jobs
    const { data: jData } = await supabase.from("jobs").select("*").order("posted_date", { ascending: false }).limit(50);
    if (jData) setJobs(jData);
    
    setIsLoading(false);
  }

  const handleRunMatcher = async () => {
    setIsSyncing(true);
    setSyncMessage("Running AI Matching Engine...");
    try {
      const res = await fetch("/api/matcher/run?secret=manual-run");
      const json = await res.json();
      setSyncMessage(`Matched ${json.matchesCreated || 0} new jobs for ${json.candidatesProcessed || 0} candidates.`);
      fetchRealData();
    } catch (e) {
      setSyncMessage("Failed to run matcher.");
    }
    setIsSyncing(false);
    setTimeout(() => setSyncMessage(null), 5000);
  };

  const handleScrapeJobs = async () => {
    setIsSyncing(true);
    setSyncMessage("Triggering Live Scraper (RemoteOK/Remotive)...");
    try {
      const res = await fetch("/api/scraper/run?secret=manual-run");
      const json = await res.json();
      setSyncMessage(`Scraped ${json.totalInserted || 0} new jobs.`);
      fetchRealData();
    } catch (e) {
      setSyncMessage("Failed to scrape jobs.");
    }
    setIsSyncing(false);
    setTimeout(() => setSyncMessage(null), 5000);
  };

  const handleApplyBots = async () => {
    setIsSyncing(true);
    setSyncMessage("Deploying Playwright Application Bots...");
    try {
      const res = await fetch("/api/bots/apply?secret=manual-run", { method: "POST" });
      const json = await res.json();
      setSyncMessage(`Processed ${json.results?.length || 0} applications.`);
    } catch (e) {
      setSyncMessage("Failed to run apply bots.");
    }
    setIsSyncing(false);
    setTimeout(() => setSyncMessage(null), 5000);
  };

  const totalRevenue = candidates.reduce((acc, c) => acc + (c.tier === "student" ? 20 : 99), 0);
  const totalInterviewsGuaranteed = candidates.reduce((acc, c) => acc + (c.interviews_guaranteed || 0), 0);
  const totalInterviewsLanded = candidates.reduce((acc, c) => acc + (c.interviews_landed || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 px-4 pb-10 pt-28 sm:px-8 sm:pb-8 sm:pt-36">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Cpu className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Admin System Core</h1>
              <p className="text-sm text-slate-400 font-mono">Real-time Production Data</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleScrapeJobs}
              disabled={isSyncing}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center gap-2"
            >
              <Briefcase className="h-4 w-4 text-blue-400" />
              Scrape Jobs
            </button>
            <button
              onClick={handleRunMatcher}
              disabled={isSyncing}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 text-emerald-400 ${isSyncing ? "animate-spin" : ""}`} />
              Run Matcher
            </button>
            <button
              onClick={handleApplyBots}
              disabled={isSyncing}
              className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Run Auto-Apply Bots
            </button>
          </div>
        </div>

        {syncMessage && (
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-mono flex items-center gap-2">
            <Activity className="h-4 w-4 animate-pulse" />
            {syncMessage}
          </div>
        )}

        {/* Top KPI Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Users className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Active Clients</span>
            </div>
            <div className="text-2xl font-bold text-white">{candidates.length}</div>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider">MRR</span>
            </div>
            <div className="text-2xl font-bold text-emerald-400">${totalRevenue}/mo</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-wider">Guarantee Status</span>
            </div>
            <div className="text-2xl font-bold text-white">{totalInterviewsLanded} <span className="text-sm text-slate-500">/ {totalInterviewsGuaranteed}</span></div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Briefcase className="h-4 w-4 text-purple-400" />
              <span className="text-xs font-semibold uppercase tracking-wider">Jobs in DB</span>
            </div>
            <div className="text-2xl font-bold text-white">{jobs.length}+</div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col md:flex-row h-[600px]">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-slate-950/50 border-r border-slate-800 flex flex-col">
            <div className="p-4 border-b border-slate-800">
              <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-lg">
                <button
                  onClick={() => setActiveTab("clients")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                    activeTab === "clients" ? "bg-slate-800 text-white shadow" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Live Clients
                </button>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                    activeTab === "jobs" ? "bg-slate-800 text-white shadow" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Jobs DB
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {isLoading && <p className="text-xs text-slate-500 text-center mt-10">Loading real data...</p>}
              
              {activeTab === "clients" && candidates.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 cursor-pointer transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold text-white truncate pr-2">{c.full_name || c.email}</h3>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      c.tier === "professional" ? "bg-indigo-500/20 text-indigo-300" : "bg-blue-500/20 text-blue-300"
                    }`}>
                      ${c.tier === "professional" ? "99" : "20"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{c.email}</p>
                  {c.linkedin_url && (
                    <a href={c.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-400 hover:underline mt-2 inline-block">
                      View LinkedIn
                    </a>
                  )}
                </div>
              ))}

              {activeTab === "jobs" && jobs.map((j) => (
                <div key={j.id} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all">
                  <h3 className="text-xs font-bold text-white truncate">{j.role_title}</h3>
                  <p className="text-[10px] text-slate-400 truncate">{j.company_name} • {j.source}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Details Pane */}
          <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center text-center">
            <ShieldCheck className="h-16 w-16 text-slate-800 mb-4" />
            <h2 className="text-xl font-bold text-slate-300">Live Database Connected</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-sm">
              All mock data has been purged. You are now viewing real production candidates and jobs from your Supabase instance.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
