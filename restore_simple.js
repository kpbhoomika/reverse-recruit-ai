const fs = require('fs');

let currentContent = fs.readFileSync('app/page.tsx', 'utf8');

const oldHero = `{/* Hero Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.05] mb-8">
            The Job Market Is Rigged.<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">We Help You Beat It.</span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-6 leading-relaxed font-normal">
            You are being rejected by algorithms, not humans. We bypass the ATS filters, automate hundreds of flawless applications while you sleep, and pitch hiring managers directly. You just show up to the interview.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold mb-10 text-sm sm:text-base">
            <ShieldCheck className="h-5 w-5" />
            <span>3 confirmed interview invitations or a full refund.</span>
          </div>

          {/* Hero CTA & Trust Indicators */}`;

currentContent = currentContent.replace(/\{\/\* Hero Headline \*\/\}.*?\{\/\* Hero CTA & Trust Indicators \*\/\}/s, oldHero);

const oldFeatures = `className={\`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-init \${featuresReveal.isVisible ? "reveal-visible" : ""}\`}
          >
            {/* Feature 1 */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl hover:border-blue-500/50 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">1. AI Matching Engine</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We scrape Greenhouse, Lever, and private remote boards daily to find the top 1% of jobs that fit your exact skills and salary requirements.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl hover:border-indigo-500/50 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <FileText className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">2. ATS Resume Tailoring</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                For every single application, our AI rewrites your resume using exact keywords from the job description so you score 90%+ in the ATS scanner.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl hover:border-purple-500/50 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                <Bot className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">3. Automated Bot Submit</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Our headless browser bots automatically navigate to the job post, fill out the complex forms, upload your tailored PDF, and submit it.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl hover:border-emerald-500/50 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Send className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">4. Recruiter Outreach</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Immediately after applying, the system drafts and sends a highly personalized cold-email pitch directly to the hiring manager to get you noticed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PRICING`;

currentContent = currentContent.replace(/className=\{\`flex flex-col gap-6 max-w-4xl mx-auto reveal-init \$\{featuresReveal\.isVisible \? "reveal-visible" : ""\}\`\}.*?\{\/\* ========================================================================= \*\/\}\s*\{\/\* 4\. PRICING/s, oldFeatures);

fs.writeFileSync('app/page.tsx', currentContent);
console.log("Restored successfully!");
