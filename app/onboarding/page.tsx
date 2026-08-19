"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, Check, Sparkles, Cpu, ShieldCheck } from "lucide-react";

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
    targetRoles: "Staff Backend Engineer, Distributed Systems Architect",
    targetLocations: "Remote, San Francisco, New York",
    workModel: ["Remote", "Hybrid"],
    minSalary: "135000",
    yearsOfExperience: "3",
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
    <div className="min-h-screen py-20 px-6 bg-[#F7F3EA] text-[#2B050E] flex flex-col justify-center items-center pt-28">
      
      {/* Container */}
      <div className="w-full max-w-[680px] bg-[#FFFFFF] border border-[#3D0814]/10 rounded-3xl p-8 sm:p-12 shadow-warm-lg relative overflow-hidden">
        
        {/* Top Progress Telemetry */}
        <div className="mb-10">
          <div className="flex items-center justify-between text-xs font-mono text-[#706556] mb-2">
            <span>Phase {step} / 4</span>
            <span className="uppercase text-[#D91C44] tracking-wider font-bold">
              {step === 1 && "Identity & Contact Vector"}
              {step === 2 && "Target Criteria & Compensation"}
              {step === 3 && "Master Experience Ingestion"}
              {step === 4 && "Blacklist & Guarantee Tier"}
            </span>
          </div>
          <div className="h-1.5 w-full bg-[#F0E9DC] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D91C44] transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <span className="text-xs font-mono text-[#D91C44] uppercase font-bold tracking-wider block mb-1">01 / Candidate Identity</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2B050E] tracking-tight">
                  Personal Details
                </h2>
                <p className="text-xs text-[#706556] mt-1">
                  Used to format verified application submissions on your behalf.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#706556] uppercase mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-sm text-[#2B050E] focus:outline-none focus:border-[#D91C44] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#706556] uppercase mb-1">Primary Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@gmail.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-sm text-[#2B050E] focus:outline-none focus:border-[#D91C44] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#706556] uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-sm text-[#2B050E] focus:outline-none focus:border-[#D91C44] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#706556] uppercase mb-1">City / Location *</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Austin, TX / Remote"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-sm text-[#2B050E] focus:outline-none focus:border-[#D91C44] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#706556] uppercase mb-1">LinkedIn URL *</label>
                    <input
                      type="url"
                      required
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-sm text-[#2B050E] focus:outline-none focus:border-[#D91C44] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TARGET ROLES */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <span className="text-xs font-mono text-[#D91C44] uppercase font-bold tracking-wider block mb-1">02 / Match Parameters</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2B050E] tracking-tight">
                  Target Criteria
                </h2>
                <p className="text-xs text-[#706556] mt-1">
                  We only apply to roles that strictly match your parameters.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#706556] uppercase mb-1">Target Job Titles (Comma-separated) *</label>
                  <input
                    type="text"
                    required
                    value={formData.targetRoles}
                    onChange={(e) => setFormData({ ...formData, targetRoles: e.target.value })}
                    placeholder="Staff Backend Engineer, Platform Architect"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-sm text-[#2B050E] focus:outline-none focus:border-[#D91C44] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#706556] uppercase mb-1">Experience Level</label>
                    <select
                      value={formData.yearsOfExperience}
                      onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-sm text-[#2B050E] focus:outline-none focus:border-[#D91C44] transition-colors font-mono"
                    >
                      <option value="0">0 Years (Fresher / New Grad 2024-2026)</option>
                      <option value="1">1–2 Years (Junior / Associate)</option>
                      <option value="3">3–5 Years (Mid-Level Engineer)</option>
                      <option value="6">6+ Years (Senior / Staff / Lead)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#706556] uppercase mb-1">Min Base Salary ($/yr or LPA)</label>
                    <input
                      type="text"
                      value={formData.minSalary}
                      onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                      placeholder="$120,000"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-sm text-[#2B050E] focus:outline-none focus:border-[#D91C44] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#706556] uppercase mb-1">Work Authorization / Visa *</label>
                  <input
                    type="text"
                    required
                    value={formData.visaStatus}
                    onChange={(e) => setFormData({ ...formData, visaStatus: e.target.value })}
                    placeholder="US Citizen, Green Card, F1 OPT/CPT, H1B Transfer"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-sm text-[#2B050E] focus:outline-none focus:border-[#D91C44] transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: MASTER RESUME */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <span className="text-xs font-mono text-[#D91C44] uppercase font-bold tracking-wider block mb-1">03 / Experience Ingestion</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2B050E] tracking-tight">
                  Master Resume &amp; Repositories
                </h2>
                <p className="text-xs text-[#706556] mt-1">
                  Paste your complete experience text. Our Gemini engine extracts technical skills and metrics.
                </p>
              </div>

              <div>
                <textarea
                  required
                  rows={8}
                  value={formData.masterResumeText}
                  onChange={(e) => setFormData({ ...formData, masterResumeText: e.target.value })}
                  placeholder="Paste your complete resume or project history..."
                  className="w-full p-4 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-xs text-[#2B050E] font-mono leading-relaxed focus:outline-none focus:border-[#D91C44] transition-colors"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#D91C44]/10 border border-[#D91C44]/20 text-xs text-[#D91C44] font-mono flex items-center gap-2 font-semibold">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>AI will re-rank these bullets dynamically for every target company without hallucination.</span>
              </div>
            </div>
          )}

          {/* STEP 4: SAFETY BLACKLIST & PLAN */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <span className="text-xs font-mono text-[#D91C44] uppercase font-bold tracking-wider block mb-1">04 / Confirmation &amp; Plan</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2B050E] tracking-tight">
                  Safety Blacklist &amp; Plan Tier
                </h2>
                <p className="text-xs text-[#706556] mt-1">
                  Specify companies to never apply to and confirm your guaranteed interview plan.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#706556] uppercase mb-1">Employer Blacklist</label>
                <input
                  type="text"
                  value={formData.blacklistedCompanies}
                  onChange={(e) => setFormData({ ...formData, blacklistedCompanies: e.target.value })}
                  placeholder="Current Employer Inc, Subsidiary Co"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F3EA] border border-[#3D0814]/10 text-sm text-[#2B050E] focus:outline-none focus:border-[#D91C44] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div
                  onClick={() => setFormData({ ...formData, tier: "student" })}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    formData.tier === "student"
                      ? "bg-[#F0E9DC] border-[#D91C44] shadow-md"
                      : "bg-[#FFFFFF] border-[#3D0814]/10 hover:border-[#3D0814]/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#2B050E] uppercase">Student / Fresher</span>
                    <span className="font-mono text-lg font-bold text-[#D91C44]">$20<span className="text-xs text-[#706556] font-normal">/mo</span></span>
                  </div>
                  <p className="text-xs text-[#706556] leading-relaxed">
                    150+ applications, tailored ATS resumes, 3–5 guaranteed interviews.
                  </p>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, tier: "professional" })}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    formData.tier === "professional"
                      ? "bg-[#3D0814] text-white border-[#D91C44] shadow-md"
                      : "bg-[#FFFFFF] border-[#3D0814]/10 hover:border-[#3D0814]/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-xs font-bold uppercase ${formData.tier === "professional" ? "text-white" : "text-[#2B050E]"}`}>
                      IT Professional
                    </span>
                    <span className="font-mono text-lg font-bold text-[#D91C44]">$99<span className={`text-xs ${formData.tier === "professional" ? "text-[#FAF5EE]/70" : "text-[#706556]"} font-normal`}>/mo</span></span>
                  </div>
                  <p className={`text-xs ${formData.tier === "professional" ? "text-[#FAF5EE]/80" : "text-[#706556]"} leading-relaxed`}>
                    250+ applications, direct recruiter InMails, negotiation copilot, 5+ interviews.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="pt-6 border-t border-[#3D0814]/10 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="text-xs font-mono text-[#706556] hover:text-[#2B050E] flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous Phase</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-crimson text-xs py-2.5 px-6"
              >
                <span>Continue</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-crimson text-xs py-3 px-8"
              >
                {isSubmitting ? "Initializing Career Autopilot..." : `Launch Autopilot (${formData.tier === "student" ? "$20" : "$99"})`}
              </button>
            )}
          </div>

        </form>

      </div>

    </div>
  );
}
