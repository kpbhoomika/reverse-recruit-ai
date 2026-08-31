import DiagnoserStudio from "@/components/tools/DiagnoserStudio";

export const metadata = {
  title: "ATS Structural Diagnoser | ReverseRecruit",
  description: "Diagnose and fix structural ATS parsing hazards, formatting errors, and action verb density in your resume.",
};

export default function DiagnoserPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-36 lg:px-10">
      <DiagnoserStudio />
    </div>
  );
}
