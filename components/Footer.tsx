import Link from "next/link";
import { Sparkles, Shield, Heart, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-zinc-950 text-zinc-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                ReverseRecruit<span className="text-blue-500">.ai</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The high-conversion reverse recruiting SaaS and job search autopilot. We find, tailor, and apply to 150+ verified roles on your behalf until you land a minimum of 5 tech interviews.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Shield className="h-3.5 w-3.5" />
              <span>100% Interview Guarantee or Full Refund</span>
            </div>
          </div>

          {/* Col 2: Platform Tools */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">AI Platform Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Live Application Pipeline</Link></li>
              <li><Link href="/dashboard/resume-tailor" className="hover:text-white transition-colors">JD-Aware ATS Resume Tailor</Link></li>
              <li><Link href="/dashboard/cover-letters" className="hover:text-white transition-colors">3-Paragraph Cover Letter Generator</Link></li>
              <li><Link href="/dashboard/linkedin-optimizer" className="hover:text-white transition-colors">LinkedIn Recruiter SEO Optimizer</Link></li>
              <li><Link href="/dashboard/offer-negotiator" className="hover:text-white transition-colors">AI Offer Negotiation Copilot</Link></li>
            </ul>
          </div>

          {/* Col 3: Pricing & Audience */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Pricing & Tiers</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/onboarding" className="hover:text-white transition-colors">Student & Fresher Tier ($20/mo)</Link></li>
              <li><Link href="/onboarding" className="hover:text-white transition-colors">IT Professional Tier ($99/mo)</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Agency Operations Cockpit</Link></li>
              <li><span className="text-zinc-500">Dual-Channel ATS & Recruiter Dispatch</span></li>
            </ul>
          </div>

          {/* Col 4: GitHub & Tech */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Open Source & Community</h4>
            <p className="text-xs text-zinc-400 mb-3">
              Daily automated job aggregation workflows powered by GitHub Actions.
            </p>
            <a
              href="https://github.com/kpbhoomika"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-xs text-white border border-zinc-700 transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              <span>github.com/kpbhoomika</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} ReverseRecruit AI. All rights reserved.</p>
          <div className="flex items-center gap-1 text-zinc-400">
            <span>Built with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>for job seekers navigating the tech market.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
