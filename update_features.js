const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const newFeatures = `
          {/* Feature Sequence */}
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-slate-950 border border-slate-800 p-8 sm:p-10 rounded-3xl hover:border-blue-500/50 transition-colors flex flex-col sm:flex-row gap-8 items-start">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-blue-500/10 flex items-center justify-center shadow-inner border border-blue-500/20">
                <span className="text-2xl font-black text-blue-500">1</span>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">The Right Jobs</h3>
                <p className="text-base text-slate-400 leading-relaxed">
                  We are picky so you don't have to be. We don't do blind spray-and-pray. Our Gemini engine cross-references every new listing against your salary floor, exact role fit, and blacklist. We only queue high-probability matches.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-950 border border-slate-800 p-8 sm:p-10 rounded-3xl hover:border-indigo-500/50 transition-colors flex flex-col sm:flex-row gap-8 items-start">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-indigo-500/10 flex items-center justify-center shadow-inner border border-indigo-500/20">
                <span className="text-2xl font-black text-indigo-500">2</span>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">The Right Application</h3>
                <p className="text-base text-slate-400 leading-relaxed">
                  Resumes and cover letters dynamically tailored to every single role. We rewrite your accomplishment bullets to seamlessly hit the exact ATS keywords the job description requires—written in your voice, without hallucinating fake experience.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-950 border border-slate-800 p-8 sm:p-10 rounded-3xl hover:border-purple-500/50 transition-colors flex flex-col sm:flex-row gap-8 items-start">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-purple-500/10 flex items-center justify-center shadow-inner border border-purple-500/20">
                <span className="text-2xl font-black text-purple-500">3</span>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">The Right Timing (Unfair Speed)</h3>
                <p className="text-base text-slate-400 leading-relaxed">
                  Speed is the ultimate unfair advantage. Our headless Playwright bots submit your tailored application forms the exact moment a high-match job is posted, guaranteeing you are seen before hundreds of other applicants pile in.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-950 border border-slate-800 p-8 sm:p-10 rounded-3xl hover:border-emerald-500/50 transition-colors flex flex-col sm:flex-row gap-8 items-start">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-emerald-500/10 flex items-center justify-center shadow-inner border border-emerald-500/20">
                <span className="text-2xl font-black text-emerald-500">4</span>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">The Autonomous Tracker</h3>
                <p className="text-base text-slate-400 leading-relaxed">
                  Every job you auto-apply to lands on your live candidate dashboard. But we don't stop there: our system immediately drafts and sends a highly personalized cold-email pitch directly to the hiring manager to force an interview.
                </p>
              </div>
            </div>
          </div>
`;

if (content.includes('grid-cols-1 md:grid-cols-2')) {
  const splitContent = content.split('{/* Feature Grid */}');
  const tailContent = splitContent[1].split('</section>')[1];
  
  const newFullContent = splitContent[0] + newFeatures + "\n        </div>\n      </section>" + tailContent;
  fs.writeFileSync('app/page.tsx', newFullContent);
  console.log("Successfully replaced feature grid!");
} else {
  console.log("Could not find feature grid structure.");
}
