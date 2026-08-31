import RecruiterMatrixStudio from "@/components/tools/RecruiterMatrixStudio";

export const metadata = {
  title: "Recruiter Keyword Matrix & Boolean Sourcing | ReverseRecruit",
  description: "Cross-reference your resume against real job descriptions to reveal missing boolean keywords and recruiter ranking.",
};

export default function RecruiterPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-36 lg:px-10">
      <RecruiterMatrixStudio />
    </div>
  );
}
