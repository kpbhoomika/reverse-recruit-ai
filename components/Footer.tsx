import Link from "next/link";
import { Briefcase, ShieldCheck, Github, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        
        {/* Footnote telemetry disclaimer */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-[11px] leading-relaxed text-slate-400 space-y-2">
          <p>
            <span className="text-white font-semibold">1. Performance Guarantee:</span> The 5-interview guarantee applies to active accounts matching minimum role and skill parameters. If 5 qualified interview milestones are not verified within the monthly cycle, a 100% refund of the base plan fee is issued.
          </p>
          <p>
            <span className="text-white font-semibold">2. Autonomous Infrastructure:</span> All resume bullet re-ranking and semantic parsing are performed natively with verified job data and zero artificial hallucination of non-existent qualifications.
          </p>
        </div>

        {/* Directory columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-4">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs">
                RR
              </div>
              <span>ReverseRecruit</span>
            </div>
            <p className="text-[12px] text-slate-400 leading-relaxed">
              Reverse recruiting platform and career automation for software engineers, freshers, and career switchers.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>All Systems Active</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-mono uppercase tracking-wider text-[11px] text-white font-semibold">
              AI Career Intelligence Suite
            </h4>
            <ul className="space-y-2">
              <li><Link href="/dashboard/diagnoser" className="hover:text-white transition-colors">ATS Structural Diagnoser</Link></li>
              <li><Link href="/dashboard/recruiter" className="hover:text-white transition-colors">Recruiter Keyword Lens</Link></li>
              <li><Link href="/dashboard/rewriter" className="hover:text-white transition-colors">Google XYZ Bullet Rewriter</Link></li>
              <li><Link href="/dashboard/mock-interview" className="hover:text-white transition-colors">Mock Interview Arena</Link></li>
              <li><Link href="/dashboard/offer-negotiator" className="hover:text-white transition-colors">Offer Negotiation Copilot</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-mono uppercase tracking-wider text-[11px] text-white font-semibold">
              Plans &amp; Guarantee
            </h4>
            <ul className="space-y-2">
              <li><Link href="/onboarding" className="hover:text-white transition-colors">Student &amp; Fresher Tier ($20/mo)</Link></li>
              <li><Link href="/onboarding" className="hover:text-white transition-colors">IT Professional Tier ($99/mo)</Link></li>
              <li><Link href="/onboarding" className="hover:text-white transition-colors">Guarantee Fulfillment Terms</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Agency Operations Cockpit</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-mono uppercase tracking-wider text-[11px] text-white font-semibold">
              Engineering &amp; Code
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/kpbhoomika"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>github.com/kpbhoomika</span>
                  <ArrowUpRight className="h-3 w-3 text-slate-500" />
                </a>
              </li>
              <li><span className="font-mono text-[11px] text-slate-500">Daily Cron Sync: 06:00 UTC</span></li>
              <li><span className="font-mono text-[11px] text-slate-500">Direct ATS Feed Ingestion</span></li>
            </ul>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} ReverseRecruit AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Security</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
