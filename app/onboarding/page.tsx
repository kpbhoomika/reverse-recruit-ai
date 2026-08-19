"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, Check, GraduationCap, Briefcase } from "lucide-react";

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
    <div className="min-h-screen py-16 px-6 bg-[#F5F5F7] text-[#1D1D1F] flex flex-col justify-center items-center">
      
      {/* Container */}
      <div className="w-full max-w-[640px] bg-[#FFFFFF] border border-[#D2D2D7]/80 rounded-[24px] p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
        
        {/* Minimal Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-[12px] text-[#6E6E73] mb-2 font-medium">
            <span>Step {step} of 4</span>
            <span className="uppercase tracking-wider">
              {step === 1 && "Contact"}
              {step === 2 && "Parameters"}
              {step === 3 && "Experience"}
              {step === 4 && "Select Plan"}
            </span>
          </div>
          <div className="h-1 w-full bg-[#E5E5EA] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1D1D1F] transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* STEP 1: PERSONAL & CONTACT */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-[28px] sm:text-[34px] font-semibold text-[#1D1D1F] tracking-tight leading-[1.1] mb-2">
                  Personal Details
                </h2>
                <p className="text-[15px] text-[#6E6E73]">
                  Used to format verified application submissions on your behalf.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF] border border-[#D2D2D7] text-[15px] text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@gmail.com"
                      className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF] border border-[#D2D2D7] text-[15px] text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF] border border-[#D2D2D7] text-[15px] text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">City / Location</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Austin, TX / Remote"
                      className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF] border border-[#D2D2D7] text-[15px] text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      required
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF] border border-[#D2D2D7] text-[15px] text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TARGET ROLES & SALARY */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-[28px] sm:text-[34px] font-semibold text-[#1D1D1F] tracking-tight leading-[1.1] mb-2">
                  Target Criteria
                </h2>
                <p className="text-[15px] text-[#6E6E73]">
                  We only apply to roles that strictly match your parameters.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Target Job Titles (Comma-separated)</label>
                  <input
                    type="text"
                    required
                    value={formData.targetRoles}
                    onChange={(e) => setFormData({ ...formData, targetRoles: e.target.value })}
                    placeholder="Full Stack Engineer, Frontend Architect"
                    className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF] border border-[#D2D2D7] text-[15px] text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Experience Level</label>
                    <select
                      value={formData.yearsOfExperience}
                      onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                      className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF] border border-[#D2D2D7] text-[15px] text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] transition-colors"
                    >
                      <option value="0">0 Years (Fresher / New Grad)</option>
                      <option value="1">1–2 Years (Junior / Associate)</option>
                      <option value="3">3–5 Years (Mid-Level Engineer)</option>
                      <option value="6">6+ Years (Senior / Lead)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Min Base Salary ($/yr)</label>
                    <input
                      type="text"
                      value={formData.minSalary}
                      onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                      placeholder="$85,000"
                      className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF] border border-[#D2D2D7] text-[15px] text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Work Authorization</label>
                  <input
                    type="text"
                    required
                    value={formData.visaStatus}
                    onChange={(e) => setFormData({ ...formData, visaStatus: e.target.value })}
                    placeholder="US Citizen, Green Card, F1 OPT/CPT"
                    className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF] border border-[#D2D2D7] text-[15px] text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: MASTER RESUME */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-[28px] sm:text-[34px] font-semibold text-[#1D1D1F] tracking-tight leading-[1.1] mb-2">
                  Master Resume
                </h2>
                <p className="text-[15px] text-[#6E6E73]">
                  Paste your project details and experience. Our engine extracts skills and generates tailored versions per job.
                </p>
              </div>

              <div>
                <textarea
                  required
                  rows={8}
                  value={formData.masterResumeText}
                  onChange={(e) => setFormData({ ...formData, masterResumeText: e.target.value })}
                  placeholder="Paste your complete resume text..."
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF] border border-[#D2D2D7] text-[13px] text-[#1D1D1F] leading-relaxed font-mono focus:outline-none focus:border-[#0071E3] transition-colors"
                />
              </div>
            </div>
          )}

          {/* STEP 4: BLACKLIST & PLAN */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-[28px] sm:text-[34px] font-semibold text-[#1D1D1F] tracking-tight leading-[1.1] mb-2">
                  Safety &amp; Plan
                </h2>
                <p className="text-[15px] text-[#6E6E73]">
                  Specify companies to never apply to and select your guarantee tier.
                </p>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Company Blacklist</label>
                <input
                  type="text"
                  value={formData.blacklistedCompanies}
                  onChange={(e) => setFormData({ ...formData, blacklistedCompanies: e.target.value })}
                  placeholder="Current Employer Inc"
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFFF] border border-[#D2D2D7] text-[15px] text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div
                  onClick={() => setFormData({ ...formData, tier: "student" })}
                  className={`p-5 rounded-[18px] border cursor-pointer transition-all ${
                    formData.tier === "student"
                      ? "border-[#0071E3] bg-[#0071E3]/[0.03] shadow-sm"
                      : "border-[#D2D2D7] hover:border-[#86868B]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[15px] text-[#1D1D1F]">Student / Fresher</span>
                    <span className="text-[18px] font-semibold text-[#0071E3]">$20<span className="text-[12px] text-[#6E6E73] font-normal">/mo</span></span>
                  </div>
                  <p className="text-[13px] text-[#6E6E73]">150+ applications, 3–5 guaranteed interviews.</p>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, tier: "professional" })}
                  className={`p-5 rounded-[18px] border cursor-pointer transition-all ${
                    formData.tier === "professional"
                      ? "border-[#0071E3] bg-[#0071E3]/[0.03] shadow-sm"
                      : "border-[#D2D2D7] hover:border-[#86868B]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[15px] text-[#1D1D1F]">IT Professional</span>
                    <span className="text-[18px] font-semibold text-[#0071E3]">$99<span className="text-[12px] text-[#6E6E73] font-normal">/mo</span></span>
                  </div>
                  <p className="text-[13px] text-[#6E6E73]">250+ applications, InMails, negotiation copilot, 5+ interviews.</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="pt-6 border-t border-[#F5F5F7] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="text-[15px] text-[#6E6E73] hover:text-[#1D1D1F] flex items-center gap-1 font-medium transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="apple-btn-interactive bg-[#0071E3] hover:bg-[#0077ED] text-white px-6 py-2.5 rounded-full text-[15px] font-normal flex items-center gap-1 shadow-sm"
              >
                <span>Continue</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="apple-btn-interactive bg-[#1D1D1F] hover:bg-[#333336] text-white px-8 py-3 rounded-full text-[15px] font-normal shadow-sm"
              >
                {isSubmitting ? "Starting Autopilot..." : `Launch Autopilot (${formData.tier === "student" ? "$20" : "$99"})`}
              </button>
            )}
          </div>

        </form>

      </div>

    </div>
  );
}
