import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F7] text-[#6E6E73] border-t border-[#D2D2D7] text-[12px] leading-[1.33]">
      <div className="max-w-[1080px] mx-auto px-6 py-10 space-y-6">
        
        {/* Footnote disclaimer */}
        <div className="space-y-2 border-b border-[#D2D2D7]/80 pb-6 text-[#86868B] text-[11px] leading-[1.4]">
          <p>
            1. The 5-interview guarantee applies to active accounts matching minimum role and skill thresholds. If 5 qualified interviews are not secured within the service period, a full refund of the base service fee is granted.
          </p>
          <p>
            2. Dual-channel application automation submits verified application data directly to employer ATS endpoints and delivers tailored recruiter outreach.
          </p>
        </div>

        {/* Directory columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-4">
          
          <div className="space-y-2">
            <h4 className="font-semibold text-[#1D1D1F] text-[12px]">Platform</h4>
            <ul className="space-y-1.5 text-[#6E6E73]">
              <li><Link href="/dashboard" className="hover:text-[#1D1D1F] hover:underline">Pipeline Tracker</Link></li>
              <li><Link href="/dashboard/resume-tailor" className="hover:text-[#1D1D1F] hover:underline">ATS Resume Tailor</Link></li>
              <li><Link href="/dashboard/cover-letters" className="hover:text-[#1D1D1F] hover:underline">Outreach Pitch</Link></li>
              <li><Link href="/dashboard/linkedin-optimizer" className="hover:text-[#1D1D1F] hover:underline">LinkedIn SEO</Link></li>
              <li><Link href="/dashboard/offer-negotiator" className="hover:text-[#1D1D1F] hover:underline">Offer Negotiator</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-[#1D1D1F] text-[12px]">Tiers &amp; Pricing</h4>
            <ul className="space-y-1.5 text-[#6E6E73]">
              <li><Link href="/onboarding" className="hover:text-[#1D1D1F] hover:underline">Student Tier ($20/mo)</Link></li>
              <li><Link href="/onboarding" className="hover:text-[#1D1D1F] hover:underline">IT Professional ($99/mo)</Link></li>
              <li><Link href="/onboarding" className="hover:text-[#1D1D1F] hover:underline">Guarantee Terms</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-[#1D1D1F] text-[12px]">Operations</h4>
            <ul className="space-y-1.5 text-[#6E6E73]">
              <li><Link href="/admin" className="hover:text-[#1D1D1F] hover:underline">Agency Cockpit</Link></li>
              <li><span className="text-[#86868B]">Greenhouse &amp; Lever Feeds</span></li>
              <li><span className="text-[#86868B]">Ashby API Sync</span></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-[#1D1D1F] text-[12px]">GitHub &amp; Code</h4>
            <ul className="space-y-1.5 text-[#6E6E73]">
              <li>
                <a
                  href="https://github.com/kpbhoomika"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1D1D1F] hover:underline"
                >
                  kpbhoomika on GitHub
                </a>
              </li>
              <li><span className="text-[#86868B]">Daily Actions Cron</span></li>
            </ul>
          </div>

        </div>

        {/* Legal bar */}
        <div className="pt-4 border-t border-[#D2D2D7]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#86868B]">
          <p>Copyright © {new Date().getFullYear()} ReverseRecruit Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>|</span>
            <span className="hover:underline cursor-pointer">Terms of Use</span>
            <span>|</span>
            <span className="hover:underline cursor-pointer">Sales and Refunds</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
