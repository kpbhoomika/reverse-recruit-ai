import Link from "next/link";
import { Cpu, ShieldCheck, Github, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="hairline-t bg-[#05070A] text-muted text-xs">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        
        {/* Footnote telemetry disclaimer */}
        <div className="p-6 rounded-2xl bg-surface-50/80 border border-border-subtle text-[11px] leading-relaxed text-muted space-y-2">
          <p>
            <span className="text-foreground font-semibold">1. Performance Guarantee:</span> The 5-interview guarantee applies to active accounts matching minimum role and skill parameters. If 5 qualified interview milestones are not verified within the monthly cycle, a 100% refund of the base plan fee is issued.
          </p>
          <p>
            <span className="text-foreground font-semibold">2. Autonomous Infrastructure:</span> All resume bullet re-ranking and semantic parsing are performed natively via Gemini 1.5 with zero artificial hallucination of non-existent qualifications.
          </p>
        </div>

        {/* Directory columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-4">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <Cpu className="h-4 w-4 text-cyan-400" />
              <span>ReverseRecruit</span>
            </div>
            <p className="text-[12px] text-muted leading-relaxed">
              Intelligent career operating system for software engineers, freshers, and career switchers.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>All Systems Operational</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-mono uppercase tracking-wider text-[11px] text-foreground font-semibold">
              Platform Architecture
            </h4>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="hover:text-cyan-300 transition-colors">Pipeline Command Center</Link></li>
              <li><Link href="/dashboard/resume-tailor" className="hover:text-cyan-300 transition-colors">ATS Reverse Engineering Studio</Link></li>
              <li><Link href="/dashboard/cover-letters" className="hover:text-cyan-300 transition-colors">Dual-Channel Outreach Engine</Link></li>
              <li><Link href="/dashboard/linkedin-optimizer" className="hover:text-cyan-300 transition-colors">LinkedIn Recruiter Visibility SEO</Link></li>
              <li><Link href="/dashboard/offer-negotiator" className="hover:text-cyan-300 transition-colors">Offer &amp; Comp Negotiation Copilot</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-mono uppercase tracking-wider text-[11px] text-foreground font-semibold">
              Plans &amp; Guarantee
            </h4>
            <ul className="space-y-2">
              <li><Link href="/onboarding" className="hover:text-cyan-300 transition-colors">Student &amp; Fresher Tier ($20/mo)</Link></li>
              <li><Link href="/onboarding" className="hover:text-cyan-300 transition-colors">IT Professional Tier ($99/mo)</Link></li>
              <li><Link href="/onboarding" className="hover:text-cyan-300 transition-colors">Guarantee Fulfillment Terms</Link></li>
              <li><Link href="/admin" className="hover:text-cyan-300 transition-colors">Agency Operations Cockpit</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-mono uppercase tracking-wider text-[11px] text-foreground font-semibold">
              Engineering &amp; Code
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/kpbhoomika"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>github.com/kpbhoomika</span>
                  <ArrowUpRight className="h-3 w-3 text-muted" />
                </a>
              </li>
              <li><span className="font-mono text-[11px] text-muted">Daily Actions Cron: 06:00 UTC</span></li>
              <li><span className="font-mono text-[11px] text-muted">Direct ATS Feed Ingestion: 24h</span></li>
            </ul>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-muted font-mono">
          <p>© {new Date().getFullYear()} ReverseRecruit AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-foreground cursor-pointer transition-colors">Security &amp; Encryption</span>
            <span>•</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Protocol</span>
            <span>•</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
