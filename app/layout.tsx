import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ReverseRecruit AI — Intelligent Career Operating System",
  description: "Autonomous career infrastructure for software engineers. Real-time ATS reverse engineering, verified employer pipeline dispatch, and guaranteed 5+ interview milestones.",
  keywords: [
    "Reverse recruiting",
    "Career operating system",
    "ATS reverse engineering",
    "Autonomous job application",
    "Software engineer jobs",
    "Offer negotiation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#07090E] text-[#F1F5F9] antialiased selection:bg-[#38BDF8] selection:text-[#07090E]">
      <body className="min-h-screen flex flex-col bg-[#07090E] text-[#F1F5F9] atmospheric-bg tech-grid">
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
