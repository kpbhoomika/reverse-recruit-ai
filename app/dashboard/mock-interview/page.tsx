import MockInterviewStudio from "@/components/tools/MockInterviewStudio";

export const metadata = {
  title: "AI Hiring Manager & Mock Interview Arena | ReverseRecruit",
  description: "Simulate rigorous technical & behavioral interviews with AI Hiring Managers. Get instant STAR rubric grading and model answers.",
};

export default function MockInterviewPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-36 lg:px-10">
      <MockInterviewStudio />
    </div>
  );
}
