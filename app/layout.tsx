import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReverseRecruit AI — Land 5+ Tech Interviews on Autopilot",
  description: "AI-Powered Reverse Recruiting SaaS & Job Application Concierge. We find, tailor, and apply to 150+ high-fit tech jobs on your behalf with guaranteed 5+ interviews.",
  keywords: [
    "Reverse recruiting",
    "Job application automation",
    "ATS resume tailor",
    "Fresher jobs",
    "Software engineer jobs",
    "LinkedIn optimizer",
    "Cover letter generator",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-blue-600 selection:text-white`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
