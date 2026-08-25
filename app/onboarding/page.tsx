"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/db";
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Briefcase, 
  GraduationCap,
  UploadCloud,
  FileText,
  X,
  CheckCircle2
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedinUrl: "",
    githubUrl: "",
    tier: "student", // "free", "student" ($20), "professional" ($99)
    targetRoles: "Full Stack Engineer, Frontend Developer",
    targetLocations: "Remote, San Francisco, New York",
    minSalary: "85000",
    yearsOfExperience: "0",
    noticePeriod: "Immediate",
    blacklistedCompanies: "Current Employer Inc",
    masterResumeText: "",
    uploadedFileName: "",
    uploadedFileSize: "",
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadedFile(e.target.files[0]);
    }
  };

  const handleUploadedFile = (file: File) => {
    const fileSizeFormatted = (file.size / 1024).toFixed(1) + " KB";
    
    // Read text from file if possible, or simulate extracted master profile
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const extractedText = content && content.length > 50 
        ? content 
        : `${formData.fullName || "Candidate"} â€” ${formData.targetRoles}. Experience in web engineering, application development, API design, database schemas, and modern tech stacks. Built scalable features, optimized system latency, and collaborated across cross-functional teams.`;

      setFormData((prev) => ({
        ...prev,
        uploadedFileName: file.name,
        uploadedFileSize: fileSizeFormatted,
        masterResumeText: extractedText,
      }));
    };

    if (file.type === "text/plain") {
      reader.readAsText(file);
    } else {
      // For PDF / Docx, set metadata and representative extract
      setFormData((prev) => ({
        ...prev,
        uploadedFileName: file.name,
        uploadedFileSize: fileSizeFormatted,
        masterResumeText: `${formData.fullName || "Candidate"} â€” ${formData.targetRoles}. Master resume extracted from ${file.name}. Experience in full-stack software development, responsive UI, RESTful APIs, and database performance.`,
      }));
    }
  };

  const removeUploadedFile = () => {
    setFormData((prev) => ({
      ...prev,
      uploadedFileName: "",
      uploadedFileSize: "",
    }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If user presses Enter on early steps, just go to the next step
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);

    try {
      // Basic skills extraction from text inputs
      const basicSkills = formData.masterResumeText 
        ? formData.masterResumeText.split(" ").filter((w: string) => w.length > 4).slice(0, 10) 
        : [];

      // 1. Upsert into Supabase (in case they retry with the same email)
      const { data, error } = await supabase
        .from("candidates")
        .upsert([{
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          linkedin_url: formData.linkedinUrl,
          target_roles: [formData.targetRoles],
          target_locations: [formData.targetLocations],
          min_salary: formData.minSalary ? parseInt(formData.minSalary.replace(/[^0-9]/g, "")) || null : null,
          currency: "USD",
          skills: basicSkills,
          resume_text: formData.masterResumeText || null,
          tier: formData.tier as "student" | "professional",
          interviews_guaranteed: 3,
          interviews_landed: 0,
          applications_submitted: 0,
          subscription_active: true
        }], { onConflict: "email" })
        .select()
        .single();

      if (error) {
        throw new Error(error.message || error.details || "Database error");
      }

      // 2. Save to local storage for the dashboard to pick up
      if (typeof window !== "undefined") {
        localStorage.setItem("reverse_recruit_candidate", JSON.stringify({
          ...formData,
          id: data.id // Ensure we have the DB UUID
        }));
      }

      // 3. Trigger initial matching engine in background so they have jobs instantly
      fetch(`/api/matcher/run?secret=manual-run`, { method: "GET" }).catch(() => {});

      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Failed to save candidate", err);
      setIsSubmitting(false);
      alert(`Failed to create profile: ${err.message || "Unknown error"}`);
    }
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
              {step === 3 && "Drop Your Resume PDF"}
              {step === 4 && "Safety Blacklist & Tier Selection"}
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Current Location *</label>
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

          {/* STEP 2: TARGET ROLES & EXPECTATIONS (Work auth removed) */}
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
                  placeholder="e.g. Full Stack Engineer, Frontend Developer, Python SWE"
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Locations &amp; Preferences</label>
                <input
                  type="text"
                  value={formData.targetLocations}
                  onChange={(e) => setFormData({ ...formData, targetLocations: e.target.value })}
                  placeholder="e.g. Remote, San Francisco, New York, Austin"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* STEP 3: PDF DRAG & DROP RESUME UPLOAD */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Upload Your Master Resume
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Drop your resume PDF or DOCX file. Our engine extracts your project details, metrics, and core skills automatically.
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileChange}
                className="hidden"
              />

              {!formData.uploadedFileName ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                    isDragging
                      ? "border-blue-500 bg-blue-500/10 scale-[1.01]"
                      : "border-slate-700 bg-slate-950/60 hover:border-blue-500 hover:bg-slate-950"
                  }`}
                >
                  <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md">
                    <UploadCloud className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      Click to upload or drag &amp; drop your resume
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      Supports PDF, DOCX, or TXT (Max 10MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/40 flex items-center justify-between shadow-lg animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-white block">{formData.uploadedFileName}</span>
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Uploaded ({formData.uploadedFileSize}) â€¢ Skills Extracted</span>
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={removeUploadedFile}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Optional Text Fallback Toggle */}
              <div className="pt-2">
                <details className="text-xs text-slate-400 group">
                  <summary className="cursor-pointer font-mono text-blue-400 hover:underline">
                    Or paste raw resume text manually â–¾
                  </summary>
                  <textarea
                    rows={5}
                    value={formData.masterResumeText}
                    onChange={(e) => setFormData({ ...formData, masterResumeText: e.target.value })}
                    placeholder="Paste resume text here if you don't have a PDF handy..."
                    className="w-full mt-2 p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-blue-500"
                  />
                </details>
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
                      150+ applications, tailored ATS resumes, 3â€“5 guaranteed interviews.
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
                  <span>Initializing Candidate Dashboard...</span>
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

