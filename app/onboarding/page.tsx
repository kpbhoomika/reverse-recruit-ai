"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, Check, Sparkles, Cpu, ShieldCheck, Briefcase, GraduationCap } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedinUrl: "",
    githubUrl: "",
    tier: "student", // "student" ($20) or "professional" ($99)
    targetRoles: "Full Stack Engineer, Frontend Developer",
    targetLocations: "Remote, San Francisco, New York",
    workModel: ["Remote", "Hybrid"],
    minSalary: "85000",
    yearsOfExperience: "0",
    visaStatus: "US Citizen / Permanent Resident",
    noticePeriod: "Immediate",
    blacklistedCompanies: "Current Employer Inc",
    masterResumeText: "",
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 flex flex-col justify-center items-center pt-28">
      
      {/* Container */}
      <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span>Step {step} of 4</span>
            <span className="text-blue-400 font-bold uppercase tracking-wider">
              {step === 1 && "Personal & Contact Details"}
              {step === 2 && "Target Roles & Compensation"}
              {step === 3 && "Master Resume & Skills"}
              {step === 4 && "Blacklist & Select Tier"}
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* STEP 1: PERSONAL & CONTACT */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Let&apos;s build your candidate profile
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  This contact information will be used to submit verified applications on your behalf.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Current City / Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Austin, TX or Remote"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Profile URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub / Portfolio URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/username"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TARGET ROLES & SALARY */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Target Roles &amp; Expectations
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  We only apply to roles that strictly match your parameters.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Job Titles (Comma separated) *</label>
                <input
                  type="text"
                  required
                  value={formData.targetRoles}
                  onChange={(e) => setFormData({ ...formData, targetRoles: e.target.value })}
                  placeholder="e.g. Full Stack Engineer, Frontend Developer, Junior SWE"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Years of Experience (YOE)</label>
                  <select
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="0">0 Years (Fresher / New Grad 2024-2026)</option>
                    <option value="1">1-2 Years (Junior / Associate)</option>
                    <option value="3">3-5 Years (Mid-Level Engineer)</option>
                    <option value="6">6+ Years (Senior / Staff / Lead)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Minimum Desired Base Salary ($/yr or LPA)</label>
                  <input
                    type="text"
                    value={formData.minSalary}
                    onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                    placeholder="e.g. $85,000 or 12 LPA"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Work Authorization / Visa Status *</label>
                <input
                  type="text"
                  required
                  value={formData.visaStatus}
                  onChange={(e) => setFormData({ ...formData, visaStatus: e.target.value })}
                  placeholder="e.g. US Citizen, Green Card, F1-OPT/CPT, H1B Transfer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* STEP 3: MASTER RESUME */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Master Resume &amp; Experience
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Paste your full resume text. Our engine extracts your project details, metrics, and core tech stack.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Master Resume Text *
                </label>
                <textarea
                  required
                  rows={8}
                  value={formData.masterResumeText}
                  onChange={(e) => setFormData({ ...formData, masterResumeText: e.target.value })}
                  placeholder="Paste your complete resume text here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-blue-400" />
                <span>Our engine tailors bullet points for every target company with zero fake experience hallucination.</span>
              </div>
            </div>
          )}

          {/* STEP 4: BLACKLIST & SELECT TIER */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Safety Blacklist &amp; Plan Selection
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Prevent applications to current employers and confirm your monthly guarantee tier.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Company Blacklist (Companies we must NEVER apply to)
                </label>
                <input
                  type="text"
                  value={formData.blacklistedCompanies}
                  onChange={(e) => setFormData({ ...formData, blacklistedCompanies: e.target.value })}
                  placeholder="e.g. Current Employer Inc, Subsidiary Co"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-300 mb-2">Select Your Plan Tier *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Student Option */}
                  <div
                    onClick={() => setFormData({ ...formData, tier: "student" })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.tier === "student"
                        ? "bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-500/10"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                        <GraduationCap className="h-4 w-4 text-blue-400" />
                        <span>Student / Fresher</span>
                      </div>
                      <span className="text-lg font-extrabold text-blue-400">$20<span className="text-xs text-slate-400 font-normal">/mo</span></span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      150+ applications, tailored ATS resumes, 3–5 guaranteed interviews.
                    </p>
                  </div>

                  {/* Pro Option */}
                  <div
                    onClick={() => setFormData({ ...formData, tier: "professional" })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.tier === "professional"
                        ? "bg-indigo-600/15 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                        <Briefcase className="h-4 w-4 text-indigo-400" />
                        <span>IT Professional</span>
                      </div>
                      <span className="text-lg font-extrabold text-indigo-400">$99<span className="text-xs text-slate-400 font-normal">/mo</span></span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      250+ applications, direct recruiter InMails, offer negotiation copilot, 5+ guaranteed interviews.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-1.5"
              >
                Continue
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-xl hover:opacity-95 transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Initializing Candidate Autopilot...</span>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Launch Autopilot ({formData.tier === "student" ? "$20" : "$99"})</span>
                  </>
                )}
              </button>
            )}
          </div>

        </form>
      </div>

    </div>
  );
}
