import RewriterXYZStudio from "@/components/tools/RewriterXYZStudio";

export const metadata = {
  title: "Google XYZ Bullet Point Rewriter | ReverseRecruit",
  description: "Transform weak resume bullet points into high-impact Google XYZ accomplishments (Accomplished X, measured by Y, by doing Z).",
};

export default function RewriterPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-36 lg:px-10">
      <RewriterXYZStudio />
    </div>
  );
}
