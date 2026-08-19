import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ReverseRecruit — Reverse Recruiting Autopilot for Software Engineers",
  description: "Land 5+ verified tech interviews on autopilot. We match, tailor, apply to 150+ jobs, and contact hiring managers directly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#020617] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      <body className="min-h-screen flex flex-col bg-[#020617] text-slate-100 hero-glow">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
