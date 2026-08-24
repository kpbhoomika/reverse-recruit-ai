"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth delay
    setTimeout(() => {
      // Set the "session" in local storage so the dashboard knows who is logged in
      localStorage.setItem("reverse_recruit_candidate", JSON.stringify({ email }));
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 selection:bg-blue-500/30 selection:text-white">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px]" />
      </div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl z-10 relative">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20 shadow-inner">
            <Lock className="h-5 w-5 text-blue-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">Welcome Back</h1>
          <p className="text-sm text-slate-400">Enter your email to access your live pipeline.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
              placeholder="kpbhoomika30@gmail.com"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-brand-gradient py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Secure Login <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-800 pt-6">
          <p className="text-xs text-slate-500">
            Don't have an account yet?{" "}
            <Link href="/onboarding" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Start your Auto-Apply Plan
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
