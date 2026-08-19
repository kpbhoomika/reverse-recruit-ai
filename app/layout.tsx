import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ReverseRecruit AI — Intelligent Career Operating System",
  description: "Autonomous career infrastructure for software engineers. Reverse-engineered ATS algorithms, verified employer pipelines, and guaranteed 5+ interview milestones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#F7F3EA] text-[#2B050E] antialiased selection:bg-[#D91C44] selection:text-white">
      <body className="min-h-screen flex flex-col bg-[#F7F3EA] text-[#2B050E]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
